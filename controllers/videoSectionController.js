import VideoSection from '../models/VideoSection.js';
import fs from 'fs';
import path from 'path';
import { uploadFile2 } from '../middleware/aws.js';

const deleteFile = (filename) => {
  const filePath = path.join('uploads/videos', filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

// CREATE
export const createVideoSection = async (req, res) => {
  try {
    const { title, pageId } = req.body;
    const image = req.files['image']?.filename ? await uploadFile2(req.files['image'],"videosection"):"";
    const video = req.files['video']?.filename ? await uploadFile2(req.files['video'],"videosection"):"";

    if (!title || !pageId || !image || !video) {
      return res.status(400).json({ message: 'All fields are required' });
    }
      
    const newSection = new VideoSection({ title, pageId, image, video });
    await newSection.save();
    res.status(201).json(newSection);
  } catch (error) {
    res.status(500).json({ message: 'Error creating section', error });
  }
};

// GET ALL
export const getAllVideoSections = async (req, res) => {
  try {
    const sections = await VideoSection.find().populate('pageId', 'title');
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Fetch failed', error });
  }
};

// GET BY ID
export const getVideoSectionById = async (req, res) => {
  try {
    const section = await VideoSection.findById(req.params.id).populate('pageId', 'title');
    if (!section) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching by ID', error });
  }
};

// GET BY PAGE ID
export const getVideoSectionsByPage = async (req, res) => {
  try {
    const { pageId } = req.params;
    const sections = await VideoSection.find({ pageId }).populate('pageId', 'title');
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching by page', error });
  }
};

// UPDATE
export const updateVideoSection = async (req, res) => {
  try {
    const { title, pageId } = req.body;
    const section = await VideoSection.findById(req.params.id);
    if (!section) return res.status(404).json({ message: 'Not found' });

      const image = req.files['image']?.filename ? await uploadFile2(req.files['image']?.[0],"videosection"):"";
    const video = req.files['video']?.filename ? await uploadFile2(req.files['video'][0],"videosection"):"";

    // if (image && section.image) deleteFile(section.image);
    // if (video && section.video) deleteFile(section.video);

    section.title = title || section.title;
    section.pageId = pageId || section.pageId;
    if (image) section.image = image;
    if (video) section.video = video;

    await section.save();
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: 'Error updating section', error });
  }
};

// DELETE
export const deleteVideoSection = async (req, res) => {
  try {
    const section = await VideoSection.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).json({ message: 'Not found' });

    // deleteFile(section.image);
    // deleteFile(section.video);

    res.status(200).json({ message: 'Section deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting section', error });
  }
};
