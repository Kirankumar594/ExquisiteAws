const InteriorBanner = require('../models/InteriorBannerModel');
const fs = require('fs');
const path = require('path');
const { uploadFile2  } = require('../middleware/aws');

// Create Interior Banner
const createInteriorBanner = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = await uploadFile2(req.file);

    if (!image || !title) {
      return res.status(400).json({ message: 'Image and Title are required' });
    }

    const newBanner = new InteriorBanner({ image, title, description });
    await newBanner.save();
    res.status(201).json(newBanner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Interior Banners
const getInteriorBanners = async (req, res) => {
  try {
    const banners = await InteriorBanner.find().sort({ createdAt: -1 });
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Interior Banner
const deleteInteriorBanner = async (req, res) => {
  try {
    const banner = await InteriorBanner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Delete the file


    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const updateInteriorBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const banner = await InteriorBanner.findById(id);

    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    if (req.file) {
    
      banner.image = await uploadFile2(req.file);
    }

    if (title !== undefined) banner.title = title;
    if (description !== undefined) banner.description = description;

    const updatedBanner = await banner.save();
    res.status(200).json(updatedBanner);
  } catch (error) {
    console.error('Error updating banner:', error);
    res.status(500).json({ 
      message: 'Failed to update banner',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = { createInteriorBanner, getInteriorBanners, deleteInteriorBanner, updateInteriorBanner };




