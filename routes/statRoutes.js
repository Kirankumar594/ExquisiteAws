import express from 'express';
const router = express.Router();
import  Stat  from '../models/stat.js';  
import  isAdmin  from '../middleware/authloginMiddleware.js';  

// GET all stats (public)
router.get('/', async (req, res) => {
  try {
    const stats = await Stat.find();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// CREATE a new stat (admin)
router.post('/', isAdmin, async (req, res) => {
  const { value, description } = req.body;
  try {
    const newStat = new Stat({ value, description });
    await newStat.save();
    res.status(201).json(newStat);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create stat' });
  }
});

// UPDATE a stat (admin)
router.put('/:id', isAdmin, async (req, res) => {
  const { value, description } = req.body;
  try {
    const updatedStat = await Stat.findByIdAndUpdate(
      req.params.id,
      { value, description },
      { new: true }
    );
    res.json(updatedStat);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update stat' });
  }
});

// DELETE a stat (admin)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    await Stat.findByIdAndDelete(req.params.id);
    res.json({ message: 'Stat deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete stat' });
  }
});

export default router;