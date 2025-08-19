import express from 'express'
const router = express.Router();
import {TeamMember} from '../models/TeamMember.js';
import multer from 'multer';
import { uploadFile2 } from '../middleware/aws.js';
// import {upload} from '../middleware/upload.js';

const upload=multer();
// POST - Create a team member (with image)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, title, role, description, linkedin, twitter } = req.body;
    const image = req.file ? await uploadFile2(req.file,"team") : '';

    const newMember = await TeamMember.create({
      name,
      title,
      role,
      description,
      image
    });

    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - List all team members
router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET - Get a single team member by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await TeamMember.findById(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT - Update a team member
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, title, role, description, linkedin, twitter } = req.body;
    const updateData = {
      name,
      title,
      role,
      description
    };

    // If a new image was uploaded, add it to the update data
    if (req.file) {
      updateData.image = await uploadFile2(req.file,"team");
    }

    const updatedMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true } // Return the updated document
    );

    if (!updatedMember) {
      return res.status(404).json({ message: 'Member not found' });
    }

    res.json(updatedMember);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE - Delete a team member
router.delete('/:id', async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team member deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router
