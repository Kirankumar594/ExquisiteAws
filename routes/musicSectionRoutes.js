import express from 'express';
import {
  createMusicSection,
  getAllMusicSections,
  getMusicSectionById,
  getMusicSectionsByMusicId,
  updateMusicSection,
  deleteMusicSection
} from '../controllers/musicSectionController.js';

import multer from 'multer';
const upload=multer();
const router = express.Router();

const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'media', maxCount: 1 }
]);

router.post('/', uploadFields, createMusicSection);
router.get('/', getAllMusicSections);
router.get('/music/:musicId', getMusicSectionsByMusicId);
router.get('/:id', getMusicSectionById);
router.put('/:id', uploadFields, updateMusicSection);
router.delete('/:id', deleteMusicSection);

export default router;
