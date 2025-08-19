import express from 'express';
// import {upload} from '../middleware/upload.js';
import {
  createSolution,
  getSolutions,
  deleteSolution,
  updateSolution
} from '../controllers/solutionController.js';
import multer from 'multer';

const router = express.Router();
const upload=multer();
router.post('/', upload.single('image'), createSolution);
router.get('/', getSolutions);
router.delete('/:id', deleteSolution);
router.put('/:id', upload.single('image'), updateSolution)

export default router;
