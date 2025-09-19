
import MusicSection from '../models/MusicSection.js';
import fs from 'fs';
import path from 'path';
import { uploadFile2 } from '../middleware/aws.js';


const deleteFile = (filename) => {
  const filePath = path.join('uploads/music', filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

// CREATE
export const createMusicSection = async (req, res) => {
  try {
    const { title, musicId, type, youtubeLink } = req.body;
    const image = req.files && req.files['image'] 
  ? await uploadFile2(req.files['image'][0], "media") 
  : "";

const media = req.files && req.files['media'] 
  ? await uploadFile2(req.files['media'][0], "media") 
  : "";

    if (!title || !musicId || !type || !image || (!media && !youtubeLink)) {
      return res.status(400).json({ message: 'All required fields are not provided' });
    }

    if (!['audio', 'video', 'youtube'].includes(type)) {
      return res.status(400).json({ message: 'Invalid type, must be audio, video, or youtube' });
    }

    const mediaSource = type === 'youtube' ? youtubeLink : media;

    const newSection = new MusicSection({
      title,
      musicId,
      type,
      image,
      media: mediaSource
    });

    await newSection.save();
    res.status(201).json(newSection);
  } catch (error) {
    res.status(500).json({ message: 'Error creating section', error });
  }
};

// GET ALL
export const getAllMusicSections = async (req, res) => {
  try {
    const sections = await MusicSection.find().populate('musicId', 'title');
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Fetch failed', error });
  }
};

// GET BY ID
export const getMusicSectionById = async (req, res) => {
  try {
    const section = await MusicSection.findById(req.params.id).populate('musicId', 'title');
    if (!section) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching by ID', error });
  }
};

// GET BY MUSIC ID
export const getMusicSectionsByMusicId = async (req, res) => {
  try {
    const { musicId } = req.params;
    const sections = await MusicSection.find({ musicId }).populate('musicId', 'title');
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching by musicId', error });
  }
};

// UPDATE
export const updateMusicSection = async (req, res) => {
  try {
    const { title, musicId, type, youtubeLink } = req.body;
    const section = await MusicSection.findById(req.params.id);
    if (!section) return res.status(404).json({ message: 'Not found' });

      const image = req.files && req.files['image'] 
  ? await uploadFile2(req.files['image'][0], "media") 
  : "";

const media = req.files && req.files['media'] 
  ? await uploadFile2(req.files['media'][0], "media") 
  : "";

    if (image && section.image) deleteFile(section.image);
    if (media && section.media && section.type !== 'youtube') deleteFile(section.media);
    if (image) section.image = image;
    if (media) section.media = media;

    section.title = title || section.title;
    section.musicId = musicId || section.musicId;
    section.type = type || section.type;
    if (image) section.image = image;
    section.media = type === 'youtube' ? youtubeLink : (media || section.media);

    await section.save();
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: 'Error updating section', error });
  }
};

// DELETE
export const deleteMusicSection = async (req, res) => {
  try {
    const section = await MusicSection.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).json({ message: 'Not found' });

    deleteFile(section.image);
    if (section.type !== 'youtube') deleteFile(section.media);

    res.status(200).json({ message: 'Section deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting section', error });
  }
};
