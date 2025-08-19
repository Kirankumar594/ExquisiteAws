import express from 'express';
import {
  createVideoGridHome,
  getAllVideoGridHome,
  getVideoGridHomeById,
  updateVideoGridHome,
  deleteVideoGridHome,
} from '../controllers/videoGridHomeController.js';
import { uploadVideoGridHome } from '../middleware/videoGridUpload.js';

const router = express.Router();

router.post('/', uploadVideoGridHome, createVideoGridHome);
router.get('/', getAllVideoGridHome);
router.get('/:id', getVideoGridHomeById);
router.put('/:id', uploadVideoGridHome, updateVideoGridHome);
router.delete('/:id', deleteVideoGridHome);

export default router;
