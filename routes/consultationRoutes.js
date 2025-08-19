// routes/consultationRoutes.js
import express from 'express'
const router = express.Router();
import {Consultation} from '../models/Consultation.js';

// POST - Save new consultation
router.post('/', async (req, res) => {
  try {
    const consultation = await Consultation.create(req.body);
    res.status(201).json(consultation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Get all consultations (for admin)
router.get('/', async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    res.json(consultations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ GET - Get specific consultation by ID 
router.get('/:id', async (req, res) => {
  try {
    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    res.json(consultation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE - Delete consultation by ID
router.delete('/:id', async (req, res) => {
  try {
    await Consultation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Consultation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
