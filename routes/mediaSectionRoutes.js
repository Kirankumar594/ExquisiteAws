import express from 'express';
// import { upload } from '../middleware/video.js';
import {
  createMediaSection,
  getAllMediaSections,
  getMediaSectionById,
  getMediaSectionsByPageId,
  updateMediaSection,
  deleteMediaSection
} from '../controllers/mediaSectionController.js';
import multer from 'multer';

const upload = multer();  

const router = express.Router();


const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'media', maxCount: 1 }
]);

router.post('/', uploadFields, createMediaSection);
router.get('/', getAllMediaSections);
router.get('/page/:pageId', getMediaSectionsByPageId);
router.get('/:id', getMediaSectionById);
router.put('/:id', uploadFields, updateMediaSection);
router.delete('/:id', deleteMediaSection);

export default router;
