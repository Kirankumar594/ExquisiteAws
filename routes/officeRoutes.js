import express from 'express'
const router = express.Router();
import {Office} from '../models/Office.js';
// import {upload} from '../middleware/officeUpload.js';
import path from 'path';

import multer from 'multer';
import { uploadFile2 } from '../middleware/aws.js';
const upload=multer();
// Add office (POST)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { city, address, phone } = req.body;
    const image = req.file ?await uploadFile2(req.file,"offer") : null;

    const newOffice = await Office.create({ city, address, phone, image });
    res.status(201).json({ success: true, office: newOffice });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all offices (GET)
router.get('/', async (req, res) => {
  try {
    const offices = await Office.find().sort({ createdAt: -1 });
    res.json({ success: true, offices });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete office by ID (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const office = await Office.findById(req.params.id);
    if (!office) return res.status(404).json({ success: false, message: 'Office not found' });


    await office.deleteOne();
    res.json({ success: true, message: 'Office deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router
