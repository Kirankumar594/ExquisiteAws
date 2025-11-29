const fs = require('fs');
const path = require('path');
const BannerAbout = require('../models/BannerAbout');
const { uploadFile2  } = require('../middleware/aws');

// Create new banner
const createBanner = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? await uploadFile2(req.file,"banner"):"";
     

    if (!image || !title) {
      // Remove uploaded file if validation fails
      
      return res.status(400).json({ 
        success: false,
        message: 'Image and Title are required',
        banners: []
      });
    }

    const newBanner = new BannerAbout({ image, title, description });
    await newBanner.save();
    
    res.status(201).json({
      success: true,
      banner: newBanner,
      banners: await BannerAbout.find().sort({ createdAt: -1 })
    });
  } catch (error) {
    console.error('Create banner error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message,
      banners: []
    });
  }
};

// Get all banners
const getBanners = async (req, res) => {
  try {
    const banners = await BannerAbout.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      banners: banners || []
    });
  } catch (error) {
    console.error('Get banners error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message,
      banners: []
    });
  }
};

// Get single banner
const getBannerById = async (req, res) => {
  try {
    const banner = await BannerAbout.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ 
        success: false,
        message: 'Banner not found',
        banners: []
      });
    }
    res.status(200).json({
      success: true,
      banner
    });
  } catch (error) {
    console.error('Get banner by ID error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message,
      banners: []
    });
  }
};

// Update banner
const updateBanner = async (req, res) => {
  try {
    const { title, description } = req.body;
    const banner = await BannerAbout.findById(req.params.id);
    
    if (!banner) {
      return res.status(404).json({ 
        success: false,
        message: 'Banner not found',
        banners: []
      });
    }

    // Handle image update
    if (req.file) {
      // Delete old image if exists
      
      banner.image = await uploadFile2(req.file,"banner")
    }

    banner.title = title || banner.title;
    banner.description = description || banner.description;

    await banner.save();
    
    res.status(200).json({
      success: true,
      banner,
      banners: await BannerAbout.find().sort({ createdAt: -1 })
    });
  } catch (error) {
    console.error('Update banner error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message,
      banners: []
    });
  }
};

// Delete banner
const deleteBanner = async (req, res) => {
  try {
    const banner = await BannerAbout.findByIdAndDelete(req.params.id);
    
    if (!banner) {
      return res.status(404).json({ 
        success: false,
        message: 'Banner not found',
        banners: []
      });
    }

    // Delete associated image file
    if (banner.image) {
      const imagePath = path.join(__dirname, '../uploads', banner.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      success: true,
      message: 'Banner deleted successfully',
      banners: await BannerAbout.find().sort({ createdAt: -1 })
    });
  } catch (error) {
    console.error('Delete banner error:', error);
    res.status(500).json({ 
      success: false,
      message: error.message || 'Failed to delete banner',
      banners: []
    });
  }
};

module.exports = { createBanner, getBanners, getBannerById, updateBanner, deleteBanner };




