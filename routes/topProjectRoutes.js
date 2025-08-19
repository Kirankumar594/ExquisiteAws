import express from 'express';
import multer from 'multer';
import {
  createTopProject,
  getTopProjects,
  getTopProjectById,
  updateTopProject,
  deleteTopProject,
} from '../controllers/topProjectController.js';

const router = express.Router();

// Multer setup for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Make sure 'uploads' folder exists
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer();

// Routes
router.post('/', upload.single('image'), createTopProject);
router.get('/', getTopProjects);
router.get('/:id', getTopProjectById);
router.put('/:id', upload.single('image'), updateTopProject);
router.delete('/:id', deleteTopProject);

export default router;
