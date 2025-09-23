import MediaSection from '../models/MediaSection.js';
import fs from 'fs';
import path from 'path';
import { uploadFile2 } from '../middleware/aws.js';

const deleteFile = (filename) => {
  if (!filename) return;
  const filePath = path.join('uploads/media', filename);
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
};

// CREATE
export const createMediaSection = async (req, res) => {
  try {
    const { title, pageId, type, youtubeLink } = req.body;
   const image = req.files && req.files['image'] 
  ? await uploadFile2(req.files['image'][0], "media") 
  : "";

const media = req.files && req.files['media'] 
  ? await uploadFile2(req.files['media'][0], "media") 
  : "";


    if (!title || !pageId || !type || !image || (!media && !youtubeLink)) {
      return res.status(400).json({ message: 'All required fields are not provided' });
    }

    const mediaSource = type === 'youtube' ? youtubeLink : media;

    const newSection = new MediaSection({ title, pageId, type, image, media: mediaSource });
    await newSection.save();
    await newSection.populate('pageId', 'title');
    res.status(201).json(newSection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating section', error });
  }
};

// GET all
export const getAllMediaSections = async (_req, res) => {
  try {
    const sections = await MediaSection.find().populate('pageId', 'title');
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Fetch failed', error });
  }
};

// GET by ID
export const getMediaSectionById = async (req, res) => {
  try {
    const section = await MediaSection.findById(req.params.id).populate('pageId', 'title');
    if (!section) return res.status(404).json({ message: 'Section not found' });
    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching section', error });
  }
};

// GET by pageId
export const getMediaSectionsByPageId = async (req, res) => {
  try {
    const { pageId } = req.params;
    const sections = await MediaSection.find({ pageId }).populate('pageId', 'title');
    res.status(200).json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sections', error });
  }
};

// UPDATE
// export const updateMediaSection = async (req, res) => {
//   try {
//     const { title, pageId, type, youtubeLink } = req.body;
//     const section = await MediaSection.findById(req.params.id);
//     if (!section) return res.status(404).json({ message: 'Section not found' });

//     const image = req.files ? await uploadFile2(req.files['image'][0],"media") : section.image;
//     const media = req.files ? await uploadFile2(req.files['media'][0],"media") : section.media;

//     if (image && section.image) deleteFile(section.image);
//     if (media && section.media && section.type !== 'youtube') deleteFile(section.media);

//     section.title = title || section.title;
//     section.pageId = pageId || section.pageId;
//     section.type = type || section.type;
//     if (image) section.image = image;
//     section.media = type === 'youtube' ? youtubeLink : (media || section.media);

//     await section.save();
//     await section.populate('pageId', 'title');
//     res.status(200).json(section);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating section', error });
//   }
// };

export const updateMediaSection = async (req, res) => {
  try {
    const { title, pageId, type, youtubeLink } = req.body;
    const section = await MediaSection.findById(req.params.id);
    if (!section) return res.status(404).json({ message: "Section not found" });

    // Upload new files (if any)
    const image = req.files?.image ? await uploadFile2(req.files["image"][0], "media") : null;
    const media = req.files?.media ? await uploadFile2(req.files["media"][0], "media") : null;

    // Delete old files if replaced
    if (image && section.image) deleteFile(section.image);
    if (media && section.media && section.type !== "youtube") deleteFile(section.media);

    // Update fields
    if (title) section.title = title;
    if (pageId) section.pageId = pageId;
    if (type) section.type = type;

    if (image) section.image = image;

    if (type === "youtube") {
      section.youtubeLink = youtubeLink;
      // Clear old video if existed
      if (section.media && section.type !== "youtube") {
        deleteFile(section.media);
      }
      section.media = null;
    } else if (type === "video") {
      if (media) section.media = media;
      section.youtubeLink = null; // clear old youtube link
    }

    await section.save();
    await section.populate("pageId", "title");

    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: "Error updating section", error });
  }
};


// DELETE
export const deleteMediaSection = async (req, res) => {
  try {
    const section = await MediaSection.findByIdAndDelete(req.params.id);
    if (!section) return res.status(404).json({ message: 'Section not found' });

    deleteFile(section.image);
    if (section.type !== 'youtube') deleteFile(section.media);

    res.status(200).json({ message: 'Section deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting section', error });
  }
};
