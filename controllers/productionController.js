import ProductionSection from '../models/ProductionSection.js';
import fs from 'fs';
import path from 'path';

// CREATE
export const createProduction = async (req, res) => {
  try {
    const { title, subtitle, description } = req.body;
    const imagePaths = req.files.map(file => file.path);

    const newItem = new ProductionSection({
      title,
      subtitle,
      description,
      images: imagePaths
    });

    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create', error: err.message });
  }
};

// GET ALL
export const getAllProductions = async (req, res) => {
  try {
    const data = await ProductionSection.find().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch', error: err.message });
  }
};

// GET BY ID
export const getProductionById = async (req, res) => {
  try {
    const item = await ProductionSection.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching by ID', error: err.message });
  }
};

// UPDATE
export const updateProduction = async (req, res) => {
  try {
    const { title, subtitle, description } = req.body;
    const item = await ProductionSection.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    // Delete old images if new images uploaded
    if (req.files.length > 0) {
      item.images.forEach(imgPath => {
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      });
    }

    const newImages = req.files.map(file => file.path);
    item.title = title;
    item.subtitle = subtitle;
    item.description = description;
    item.images = newImages.length > 0 ? newImages : item.images;

    const updated = await item.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update', error: err.message });
  }
};

// DELETE
export const deleteProduction = async (req, res) => {
  try {
    const item = await ProductionSection.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });

    item.images.forEach(imgPath => {
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    });

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete', error: err.message });
  }
};
