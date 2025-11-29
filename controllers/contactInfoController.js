const ContactInfo = require('../models/ContactInfo');

// Create
const createContactInfo = async (req, res) => {
  try {
    const newInfo = new ContactInfo(req.body);
    await newInfo.save();
    res.status(201).json(newInfo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All
const getAllContactInfo = async (req, res) => {
  try {
    const info = await ContactInfo.find().sort({ createdAt: -1 });
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get by ID
const getContactInfoById = async (req, res) => {
  try {
    const info = await ContactInfo.findById(req.params.id);
    if (!info) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
const updateContactInfo = async (req, res) => {
  try {
    const updated = await ContactInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
const deleteContactInfo = async (req, res) => {
  try {
    const deleted = await ContactInfo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createContactInfo, getAllContactInfo, getContactInfoById, updateContactInfo, deleteContactInfo };




