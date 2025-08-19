import Gallery from '../models/galleryModel.js';
import fs from 'fs';
import path from 'path';
import { uploadFile2 } from '../middleware/aws.js';

// Helper function to handle file paths consistently
const formatImagePath = (filePath) => {
  return filePath.replace(/\\/g, '/');
};

// Validate allowed image types
const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxFileSize = 5 * 1024 * 1024; // 5MB

export const createGallery = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: "No image file provided" 
      });
    }

    // Validate image type and size
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
   
      return res.status(400).json({
        success: false,
        message: "Only JPEG, PNG, and WebP images are allowed"
      });
    }

    if (req.file.size > maxFileSize) {
     
      return res.status(400).json({
        success: false,
        message: "Image size must be less than 5MB"
      });
    }

    const { title, category } = req.body;
    
    if (!title || !category) {
    
      return res.status(400).json({ 
        success: false,
        message: "Title and category are required" 
      });
    }

    const imagePath = await uploadFile2(req.file);
    const newItem = new Gallery({
      image: imagePath,
      title,
      category
    });

    await newItem.save();
    
    // Return the public URL for the image
    const publicUrl = `${imagePath}`;
    
    res.status(201).json({
      success: true,
      data: {
        ...newItem._doc,
        imageUrl: publicUrl
      }
    });

  } catch (error) {
    
    console.error('Create Gallery Error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getAllGallery = async (req, res) => {
  try {
    const galleryItems = await Gallery.find();
    
    // Map items to include full URLs
    const itemsWithUrls = galleryItems.map(item => ({
      ...item._doc,
      imageUrl: `${(item.image)}`
    }));

    res.status(200).json({
      success: true,
      count: itemsWithUrls.length,
      data: itemsWithUrls
    });
  } catch (error) {
    console.error('Fetch Gallery Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch gallery items'
    });
  }
};

export const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category } = req.body;
    
    // Find existing item first
    const existingItem = await Gallery.findById(id);
    if (!existingItem) {
     
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

    let updateData = { title, category };
    let oldImagePath = null;

    // Handle new image upload
    if (req.file) {
      // Validate new image
      if (!allowedMimeTypes.includes(req.file.mimetype)) {
      
        return res.status(400).json({
          success: false,
          message: "Only JPEG, PNG, and WebP images are allowed"
        });
      }

      if (req.file.size > maxFileSize) {
     
        return res.status(400).json({
          success: false,
          message: "Image size must be less than 5MB"
        });
      }

      updateData.image =await uploadFile2(req.file,"gallery");
      oldImagePath = existingItem.image;
    }

    const updatedItem = await Gallery.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    // Delete old image after successful update


    res.status(200).json({
      success: true,
      data: {
        ...updatedItem._doc,
        imageUrl: `${(updatedItem.image)}`
      }
    });

  } catch (error) {
  
    console.error('Update Gallery Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update gallery item'
    });
  }
};

export const deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const itemToDelete = await Gallery.findById(id);

    if (!itemToDelete) {
      return res.status(404).json({
        success: false,
        message: 'Gallery item not found'
      });
    }

  
    await Gallery.findByIdAndDelete(id);
    
    res.status(200).json({
      success: true,
      message: 'Gallery item deleted successfully'
    });

  } catch (error) {
    console.error('Delete Gallery Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete gallery item'
    });
  }
};