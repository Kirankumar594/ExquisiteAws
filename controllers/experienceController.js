import ExperienceCenter from '../models/experienceModel.js';
import fs from 'fs';
import path from 'path';
import { uploadFile2 } from '../middleware/aws.js';

// CREATE
export const createExperience = async (req, res) => {
  try {
    const { name, address, timing, experience } = req.body;
    const image = req.file ? await uploadFile2(req.file,"experience"):"";

    if (!name || !address || !timing || !experience || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newCenter = new ExperienceCenter({ name, address, timing, experience, image });
    await newCenter.save();

    res.status(201).json(newCenter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET
export const getAllExperiences = async (req, res) => {
  try {
    const data = await ExperienceCenter.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteExperience = async (req, res) => {
  try {
    const id = req.params.id;
    const center = await ExperienceCenter.findById(id);

    if (!center) return res.status(404).json({ message: 'Center not found' });


    await ExperienceCenter.findByIdAndDelete(id);
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// UPDATE
export const updateExperience = async (req, res) => {
  try {
    const { name, address, timing, experience } = req.body;
    const id = req.params.id;

    const existing = await ExperienceCenter.findById(id);
    if (!existing) return res.status(404).json({ message: 'Experience Center not found' });

    // Check if new image uploaded
    let updatedImage = existing.image;
    if (req.file) {
      // Delete old image
   
      updatedImage = await uploadFile2(req.file,"experience");
    }

    const updated = await ExperienceCenter.findByIdAndUpdate(
      id,
      { name, address, timing, experience, image: updatedImage },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
