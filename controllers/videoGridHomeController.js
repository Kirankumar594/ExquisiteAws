
import VideoGridHome from '../models/videoGridHomeModel.js';
import fs from 'fs';

// CREATE
export const createVideoGridHome = async (req, res) => {
  try {
    const { title, views, type, youtubeLink } = req.body;

    const imageFile = req.files?.image?.[0];
    const videoFile = req.files?.video?.[0];

    if (!imageFile || (type === 'file' && !videoFile) || (type === 'youtube' && !youtubeLink)) {
      return res.status(400).json({ message: 'Image and video (file or YouTube link) are required.' });
    }

    const videoSource = type === 'youtube' ? youtubeLink : videoFile.path;

    const newEntry = new VideoGridHome({
      title,
      views: views || 0,
      image: imageFile.path,
      video: videoSource,
      type,
    });

    const saved = await newEntry.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
export const getAllVideoGridHome = async (req, res) => {
  try {
    const list = await VideoGridHome.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET BY ID
export const getVideoGridHomeById = async (req, res) => {
  try {
    const item = await VideoGridHome.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateVideoGridHome = async (req, res) => {
  try {
    const item = await VideoGridHome.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    const { title, views, type, youtubeLink } = req.body;

    if (req.files?.image?.[0]) {
      if (fs.existsSync(item.image)) fs.unlinkSync(item.image);
      item.image = req.files.image[0].path;
    }

    if (type === 'file' && req.files?.video?.[0]) {
      if (fs.existsSync(item.video)) fs.unlinkSync(item.video);
      item.video = req.files.video[0].path;
    }

    item.title = title ?? item.title;
    item.views = views ?? item.views;
    item.type = type;
    item.video = type === 'youtube' ? youtubeLink : (req.files?.video?.[0]?.path ?? item.video);

    const updated = await item.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteVideoGridHome = async (req, res) => {
  try {
    const item = await VideoGridHome.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    if (fs.existsSync(item.image)) fs.unlinkSync(item.image);
    if (item.type === 'file' && fs.existsSync(item.video)) fs.unlinkSync(item.video);

    await item.deleteOne();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
