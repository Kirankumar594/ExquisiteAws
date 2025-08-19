import express from 'express';
// import {upload} from '../middleware/upload.js';
import {
  createExperience,
  getAllExperiences,
  updateExperience,
  deleteExperience
} from '../controllers/experienceController.js';
import multer from 'multer';

const router = express.Router();
const upload =multer();

router.post('/', upload.single('image'), createExperience);
router.get('/', getAllExperiences);
router.put('/:id', upload.single('image'), updateExperience);
router.delete('/:id', deleteExperience);

export default router;
