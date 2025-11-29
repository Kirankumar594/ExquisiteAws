const {ContactBlock } = require('../models/ContactBlock');

// GET all
const getAllContactBlocks = async (req, res) => {
  try {
    const blocks = await ContactBlock.find();
    res.json(blocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createContactBlock = async (req, res) => {
  const { title, icon, lines } = req.body;

  try {
    const block = new ContactBlock({ title, icon, lines });
    await block.save();
    res.status(201).json(block);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
const updateContactBlock = async (req, res) => {
  const { id } = req.params;
  const { title, icon, lines } = req.body;

  try {
    const updated = await ContactBlock.findByIdAndUpdate(
      id,
      { title, icon, lines },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
const deleteContactBlock = async (req, res) => {
  const { id } = req.params;
  try {
    await ContactBlock.findByIdAndDelete(id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { getAllContactBlocks, createContactBlock, updateContactBlock, deleteContactBlock };




