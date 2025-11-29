const PageName = require('../models/PageName');

// CREATE
const createPageName = async (req, res) => {
  try {
    const { title } = req.body;
    const newPage = new PageName({ title });
    await newPage.save();
    res.status(201).json(newPage);
  } catch (error) {
    res.status(500).json({ message: 'Error creating page name', error });
  }
};

// GET ALL
const getAllPageNames = async (req, res) => {
  try {
    const pages = await PageName.find().sort({ createdAt: -1 });
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching page names', error });
  }
};

// GET BY ID
const getPageNameById = async (req, res) => {
  try {
    const page = await PageName.findById(req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching page name', error });
  }
};

// UPDATE
const updatePageName = async (req, res) => {
  try {
    const { title } = req.body;
    const updatedPage = await PageName.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );
    if (!updatedPage) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.status(200).json(updatedPage);
  } catch (error) {
    res.status(500).json({ message: 'Error updating page name', error });
  }
};

// DELETE
const deletePageName = async (req, res) => {
  try {
    const deleted = await PageName.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Page not found' });
    }
    res.status(200).json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting page name', error });
  }
};

module.exports = { createPageName, getAllPageNames, getPageNameById, updatePageName, deletePageName };




