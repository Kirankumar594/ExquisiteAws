const Project = require('../models/projectModel');
const fs = require('fs');
const path = require('path');
const { uploadFile2  } = require('../middleware/aws');

const createProject = async (req, res) => {
  try {
    const {
      category,
      title,
      location,
      developer,
      units,
      launchDate,
      description,
      status,
    } = req.body;

    const imageFiles = req.files;

    if (!imageFiles || imageFiles.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }
    const images = await Promise.all(
      imageFiles.map(async (file) => {
        return await uploadFile2(file, "project");
      })
    );
    // Store relative paths for database
    // const images = imageFiles.map((file) => file.filename)

    const newProject = new Project({
      category,
      title,
      images,
      location,
      developer,
      units: Number.parseInt(units) || 0,
      launchDate,
      description,
      status,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET All Projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Fetch Projects Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      category,
      title,
      location,
      developer,
      units,
      launchDate,
      description,
      status,
      existingImages,
    } = req.body;

    // Find the existing project
    const existingProject = await Project.findById(id);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    const imageFiles = req.files;
    let finalImages = [];

    // Handle existing images
    if (existingImages) {
      try {
        const parsedExistingImages = JSON.parse(existingImages);
        finalImages = [...parsedExistingImages];
      } catch (e) {
        console.error("Error parsing existing images:", e);
      }
    }

    // Add new images
    if (imageFiles && imageFiles.length > 0) {
      const newImages = await Promise.all(
      imageFiles.map(async (file) => {
        return await uploadFile2(file, "project");
      })
    );
      finalImages = [...finalImages, ...newImages];
    }

    // Ensure we have at least one image
    if (finalImages.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one image is required" });
    }

    const updateFields = {
      category,
      title,
      location,
      developer,
      units: Number.parseInt(units) || 0,
      launchDate,
      description,
      status,
      images: finalImages,
    };

    const updatedProject = await Project.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Update Project Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE Project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Optionally delete associated image files
    // if (deletedProject.images && deletedProject.images.length > 0) {
    //   deletedProject.images.forEach((imagePath) => {
    //     const fullPath = path.join(process.cwd(), "uploads", imagePath);
    //     fs.unlink(fullPath, (err) => {
    //       if (err) console.error("Error deleting image file:", err);
    //     });
    //   });
    // }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error("Delete Project Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createProject, getAllProjects, updateProject, deleteProject };




