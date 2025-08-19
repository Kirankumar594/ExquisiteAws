import Banner from '../models/BannerModel.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current module's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a new banner
export const createBanner = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? await uploadFile2(req.file,"banner"):"";

    if (!image || !title) {
      return res.status(400).json({ message: 'Image and Title are required' });
    }

    const newBanner = new Banner({ image, title, description });
    await newBanner.save();
    res.status(201).json(newBanner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all banners
export const getBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).json(banners);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single banner
export const getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update banner
export const updateBanner = async (req, res) => {
  try {
    const { title, description } = req.body;
    const banner = await Banner.findById(req.params.id);
    
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // Multer automatically handles the new file upload
    if (req.file) {
      banner.image =  await uploadFile2(req.file,"banner");
    }

    banner.title = title || banner.title;
    banner.description = description || banner.description;

    await banner.save();
    res.status(200).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Then use it in your deleteBanner function
// controllers/bannerController.js
export const deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    
    if (!banner) {
      return res.status(404).json({ message: 'Banner not found' });
    }

    // No explicit file deletion - handled by storage engine or separate cleanup
    res.status(200).json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to delete banner'
    });
  }
};