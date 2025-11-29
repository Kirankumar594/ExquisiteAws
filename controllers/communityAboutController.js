const CommunityAbout = require('../models/CommunityAboutModel');
const fs = require('fs');
const path = require('path');
const { uploadFile2  } = require('../middleware/aws');

// Helper to clean up uploaded files
const cleanupUploadedFiles = (files) => {
  if (files) {
    console.log(
      "Cleaning up uploaded files:",
      files.map((f) => f.filename),
    )
    files.forEach((file) => {
      const filePath = path.join(__dirname, "../uploads", file.filename)
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath)
          console.log(`Deleted file: ${filePath}`)
        } catch (unlinkError) {
          console.error(`Error deleting file ${filePath}:`, unlinkError)
        }
      } else {
        console.warn(`File not found for deletion: ${filePath}`)
      }
    })
  }
}

const createCommunityAbout = async (req, res) => {
  console.log("--- createCommunityAbout START ---")
  console.log("Request Body:", req.body)
  console.log("Request Files:", req.files)

  try {
    const { title, description } = req.body
   const imagePaths = req.files ? await Promise.all(req.files.map(async (file) => uploadFile2(file, "community"))) : [];

    if (!title || !description) {
  
      console.log("Validation Error: Title or description missing.")
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
        data: null,
      })
    }

    if (imagePaths.length !== 3) {
   
      console.log(`Validation Error: Expected 3 images, got ${imagePaths.length}.`)
      return res.status(400).json({
        success: false,
        message: "Exactly 3 images are required",
        data: null,
      })
    }

    const entry = new CommunityAbout({
      title,
      description,
      images: imagePaths,
    })

    console.log("Saving new entry:", entry)
    await entry.save()
    console.log("Entry saved successfully.")
    res.status(201).json({
      success: true,
      message: "Community About created successfully",
      data: entry,
    })
  } catch (error) {

    console.error("Error in createCommunityAbout:", error.message)
    res.status(500).json({
      success: false,
      message: "Server error during creation",
      error: error.message,
      data: null,
    })
  } finally {
    console.log("--- createCommunityAbout END ---")
  }
}

const getCommunityAbout = async (req, res) => {
  try {
    const data = await CommunityAbout.find().sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data,
    })
  } catch (error) {
    console.error("Error in getCommunityAbout:", error.message)
    res.status(500).json({
      success: false,
      message: "Error fetching data",
      error: error.message,
      data: null,
    })
  }
}

const updateCommunityAbout = async (req, res) => {
  console.log("--- updateCommunityAbout START ---")
  console.log("Request Params ID:", req.params.id)
  console.log("Request Body (raw):", req.body)
  console.log("Request Files:", req.files)

  try {
    const { id } = req.params
    const { title, description } = req.body

    let existingImages = []
    // if (req.body.existingImages) {
    //   try {
    //     // Parse existingImages as JSON string
    //     existingImages = JSON.parse(req.body.existingImages)
    //     if (!Array.isArray(existingImages)) {
    //       throw new Error("existingImages is not an array after parsing.")
    //     }
    //   } catch (parseError) {
    //     console.error("Error parsing existingImages:", parseError.message)
      
    //     return res.status(400).json({
    //       success: false,
    //       message: "Invalid format for existingImages. Must be a JSON array string.",
    //       data: null,
    //     })
    //   }
    // }
    console.log("Parsed existingImages:", existingImages)

    const newImagePaths = req.files ? await Promise.all(req.files.map(async (file) => uploadFile2(file, "community"))) : []
    console.log("New Image Paths from upload:", newImagePaths)

    const existingEntry = await CommunityAbout.findById(id)
    if (!existingEntry) {

      console.log("Entry not found for ID:", id)
      return res.status(404).json({
        success: false,
        message: "Entry not found",
        data: null,
      })
    }
    console.log("Found existing entry:", existingEntry)

    // Combine existing images to keep with newly uploaded images
    const updatedImages = [...existingImages, ...newImagePaths]
    console.log("Combined updatedImages:", updatedImages)

    // Validate that the total number of images is exactly 3
    if (updatedImages.length !== 3) {

      console.log(`Validation Error: Expected 3 images, got ${updatedImages.length}.`)
      return res.status(400).json({
        success: false,
        message: "Exactly 3 images are required for update. Please ensure you send all 3 images (existing and new).",
        data: null,
      })
    }

    // Identify and delete old images that are no longer in the updated set
   

    // Update fields
    existingEntry.title = title || existingEntry.title // Allow partial updates for title/description
    existingEntry.description = description || existingEntry.description
    existingEntry.images = updatedImages

    console.log("Saving updated entry:", existingEntry)
    await existingEntry.save()
    console.log("Entry updated successfully.")

    res.status(200).json({
      success: true,
      message: "CommunityAbout updated successfully",
      data: existingEntry,
    })
  } catch (error) {

    console.error("Error in updateCommunityAbout:", error.message)
    res.status(500).json({
      success: false,
      message: "Update failed",
      error: error.message,
      data: null,
    })
  } finally {
    console.log("--- updateCommunityAbout END ---")
  }
}

const deleteCommunityAbout = async (req, res) => {
  console.log("--- deleteCommunityAbout START ---")
  console.log("Request Params ID:", req.params.id)
  try {
    const { id } = req.params
    const entry = await CommunityAbout.findByIdAndDelete(id)

    if (!entry) {
      console.log("Entry not found for deletion ID:", id)
      return res.status(404).json({
        success: false,
        message: "Entry not found",
        data: null,
      })
    }
    console.log("Found entry for deletion:", entry)

    // Delete associated image files
    entry.images.forEach((imagePath) => {
      const filename = imagePath.split("/").pop()
      const filePath = path.join(__dirname, "../uploads", filename)
      console.log(`Checking image for deletion: ${filePath}`)
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath)
          console.log(`Deleted file: ${filePath}`)
        } catch (unlinkError) {
          console.error(`Error deleting file ${filePath}:`, unlinkError)
        }
      } else {
        console.warn(`File not found for deletion: ${filePath}`)
      }
    })

    console.log("Entry and associated images deleted successfully.")
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
      data: null,
    })
  } catch (error) {
    console.error("Error in deleteCommunityAbout:", error.message)
    res.status(500).json({
      success: false,
      message: "Delete error",
      error: error.message,
      data: null,
    })
  } finally {
    console.log("--- deleteCommunityAbout END ---")
  }
}

module.exports = { createCommunityAbout, getCommunityAbout, updateCommunityAbout, deleteCommunityAbout };




