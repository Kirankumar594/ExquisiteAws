const { uploadFile2  } = require('../middleware/aws');
const TopProject = require('../models/TopProject');

// Create new TopProject
const createTopProject = async (req, res) => {
  try {
    const { name, location } = req.body;
    const image = req.file ? await uploadFile2(req.file,"project"): null;

    if (!name || !location || !image) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newProject = new TopProject({
      image,
      name,
      location,
      // flat,
      // amount,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all TopProjects
const getTopProjects = async (req, res) => {
  try {
    const projects = await TopProject.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get TopProject by ID
const getTopProjectById = async (req, res) => {
  try {
    const project = await TopProject.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'TopProject not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update TopProject by ID
const updateTopProject = async (req, res) => {
  try {
    const { name, location } = req.body;
    const image = req.file ?  await uploadFile2(req.file,"project"):undefined

    const updateData = {};
    if (name) updateData.name = name;
    if (location) updateData.location = location;
    // if (flat) updateData.flat = flat;
    // if (amount) updateData.amount = amount;
    if (image) updateData.image = image;

    const updatedProject = await TopProject.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedProject) return res.status(404).json({ message: 'TopProject not found' });

    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete TopProject by ID
const deleteTopProject = async (req, res) => {
  try {
    const deletedProject = await TopProject.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: 'TopProject not found' });
    res.json({ message: 'TopProject deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTopProject, getTopProjects, getTopProjectById, updateTopProject, deleteTopProject };




