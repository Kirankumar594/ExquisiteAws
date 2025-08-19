import express from 'express';
import {
  createVideoHome,
  getAllVideoHomes,
  getVideoHomeById,
  updateVideoHome,
  deleteVideoHome,
} from '../controllers/videoHomeController.js';
import multer from 'multer';

// import { upload } from '../middleware/homeVideo.js';

const router = express.Router();
const upload=multer()
// Upload fields
const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
]);

router.post('/', uploadFields, createVideoHome);
router.get('/', getAllVideoHomes);
router.get('/:id', getVideoHomeById);
router.put('/:id', uploadFields, updateVideoHome);
router.delete('/:id', deleteVideoHome);

export default router;
