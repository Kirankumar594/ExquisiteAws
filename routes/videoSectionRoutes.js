import express from 'express';
import {
  createVideoSection,
  getAllVideoSections,
  getVideoSectionById,
  getVideoSectionsByPage,
  updateVideoSection,
  deleteVideoSection
} from '../controllers/videoSectionController.js';
import multer from 'multer';

// import { upload } from '../middleware/video.js';
const upload=multer();
const router = express.Router();
const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]);

router.post('/', uploadFields, createVideoSection);
router.get('/', getAllVideoSections);
router.get('/page/:pageId', getVideoSectionsByPage);
router.get('/:id', getVideoSectionById);
router.put('/:id', uploadFields, updateVideoSection);
router.delete('/:id', deleteVideoSection);

export default router;
