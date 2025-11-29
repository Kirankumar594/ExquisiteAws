const VideoHome = require('../models/videoHomeModel');
const fs = require('fs');

const createVideoHome = async (req, res) => {
  try {
    const { title, views } = req.body;
   const image = req.files && req.files.image && req.files.image[0] ? await uploadFile2(req.files && req.files.image && req.files.image[0],"upcoming"):"";
         const video = req.files && req.files.video && req.files.video[0] ? await uploadFile2(req.files && req.files.video[0],"upcoming"):"";

    if (!image || !video) return res.status(400).json({ message: 'Image and video required' });

    const newEntry = await VideoHome.create({ title, views, image, video });
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllVideoHomes = async (req, res) => {
  try {
    const data = await VideoHome.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getVideoHomeById = async (req, res) => {
  try {
    const data = await VideoHome.findById(req.params.id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateVideoHome = async (req, res) => {
  try {
    const { title, views } = req.body;
    const existing = await VideoHome.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Not found' });

    // Delete old files if new ones uploaded
    if (req.files && req.files.image && req.files.image[0]) {
      // fs.unlinkSync(existing.image);
      existing.image = await uploadFile2(req.files && req.files.image && req.files.image[0],"upcoming")
    }
    if (req.files && req.files.video && req.files.video[0]) {
      // fs.unlinkSync(existing.video);
      existing.video = await uploadFile2(req.files && req.files.video[0],"upcoming")
    }

    existing.title = title;
    existing.views = views;
    const updated = await existing.save();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteVideoHome = async (req, res) => {
  try {
    const existing = await VideoHome.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Not found' });

    // fs.unlinkSync(existing.image);
    // fs.unlinkSync(existing.video);

    await existing.deleteOne();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createVideoHome, getAllVideoHomes, getVideoHomeById, updateVideoHome, deleteVideoHome };




