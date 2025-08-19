import express from 'express'
const router = express.Router();
import  {Investment}  from '../models/InvestmentPortfolio.js';

// GET all
router.get('/', async (req, res) => {
  try {
    const items = await Investment.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST create
router.post('/', async (req, res) => {
  const { title, description, roi, risk } = req.body;

  if (!title || !description || !roi || !risk) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newItem = await Investment.create({ title, description, roi, risk });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ message: 'Error creating item' });
  }
});

// PUT update
router.put('/:id', async (req, res) => {
  const { title, description, roi, risk } = req.body;
  try {
    const updatedItem = await Investment.findByIdAndUpdate(
      req.params.id,
      { title, description, roi, risk },
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: 'Not found' });
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: 'Error updating item' });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    const deletedItem = await Investment.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting item' });
  }
});

export default router
