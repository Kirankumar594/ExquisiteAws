import Gallery from '../models/galleryModel.js';
import { uploadFile2 } from '../middleware/aws.js';

// Helper function: validate file
const validateFile = (file) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const maxFileSize = 5 * 1024 * 1024; // 5MB

  if (!allowedMimeTypes.includes(file.mimetype)) {
    throw new Error("Only JPEG, PNG, and WebP images are allowed");
  }
  if (file.size > maxFileSize) {
    throw new Error("Image size must be less than 5MB");
  }
};

export const createGallery = async (req, res) => {
  try {
    const { title, category, description } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required",
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one image file is required",
      });
    }

    // Handle description - it can be a string or array of strings
    let descArray = [];
    if (description) {
      // If description is already an array (from frontend), use it directly
      if (Array.isArray(description)) {
        descArray = description;
      } 
      // If it's a string that might be JSON, try to parse it
      else if (typeof description === 'string') {
        try {
          // Check if it looks like JSON (starts with [ and ends with ])
          if (description.trim().startsWith('[') && description.trim().endsWith(']')) {
            descArray = JSON.parse(description);
          } else {
            // If it's just a single string, wrap it in an array
            descArray = [description];
          }
        } catch (error) {
          console.error("Error parsing description:", error);
          // If parsing fails, treat it as a single description
          descArray = [description];
        }
      }
    }

    // Validate + upload each file
    const uploadedImages = [];
    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      validateFile(file);
      const imagePath = await uploadFile2(file, "gallery");
      
      uploadedImages.push({
        url: imagePath,
        description: descArray[i] || ""
      });
    }

    const newItem = new Gallery({
      title,
      category,
      images: uploadedImages,
    });

    await newItem.save();

    res.status(201).json({
      success: true,
      data: newItem,
    });
  } catch (error) {
    console.error("Create Gallery Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const getAllGallery = async (req, res) => {
  try {
    const galleryItems = await Gallery.find();

    res.status(200).json({
      success: true,
      count: galleryItems.length,
      data: galleryItems,
    });
  } catch (error) {
    console.error("Fetch Gallery Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery items",
    });
  }
};

export const updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, description } = req.body;

    const existingItem = await Gallery.findById(id);
    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    let updateData = { title, category };

    if (req.files && req.files.length > 0) {
      // Handle description similar to createGallery
      let descArray = [];
      if (description) {
        if (Array.isArray(description)) {
          descArray = description;
        } else if (typeof description === 'string') {
          try {
            if (description.trim().startsWith('[') && description.trim().endsWith(']')) {
              descArray = JSON.parse(description);
            } else {
              descArray = [description];
            }
          } catch (error) {
            console.error("Error parsing description:", error);
            descArray = [description];
          }
        }
      }
      
      const uploadedImages = [];
      for (let i = 0; i < req.files.length; i++) {
        const file = req.files[i];
        validateFile(file);
        const imagePath = await uploadFile2(file, "gallery");
        
        uploadedImages.push({
          url: imagePath,
          description: descArray[i] || ""
        });
      }
      updateData.images = uploadedImages;
    } else if (description) {
      // Handle description updates without new images
      let descArray = [];
      if (Array.isArray(description)) {
        descArray = description;
      } else if (typeof description === 'string') {
        try {
          if (description.trim().startsWith('[') && description.trim().endsWith(']')) {
            descArray = JSON.parse(description);
          } else {
            descArray = [description];
          }
        } catch (error) {
          console.error("Error parsing description:", error);
          descArray = [description];
        }
      }
      
      updateData.images = existingItem.images.map((img, index) => ({
        url: img.url,
        description: descArray[index] !== undefined ? descArray[index] : img.description
      }));
    }

    const updatedItem = await Gallery.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: updatedItem,
    });
  } catch (error) {
    console.error("Update Gallery Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to update gallery item",
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
        message: "Gallery item not found",
      });
    }

    await Gallery.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (error) {
    console.error("Delete Gallery Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete gallery item",
    });
  }
};

export const getGalleryById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate that the ID is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Gallery item ID is required",
      });
    }

    // Find the gallery item by ID
    const galleryItem = await Gallery.findById(id);

    // Check if the item exists
    if (!galleryItem) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: galleryItem,
    });
  } catch (error) {
    console.error("Get Gallery By ID Error:", error);
    
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: "Invalid gallery item ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery item",
    });
  }
};