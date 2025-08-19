import express from 'express';
// import {upload} from '../middleware/upload.js'; // your multer config
import {
  createInteriorBanner,
  getInteriorBanners,
  updateInteriorBanner,
  deleteInteriorBanner
} from '../controllers/InteriorBannerController.js';
import multer from 'multer';

const router = express.Router();
const upload=multer();
router.post('/', upload.single('image'), createInteriorBanner);
router.get('/', getInteriorBanners);
router.delete('/:id', deleteInteriorBanner);
router.patch('/:id', upload.single('image'), updateInteriorBanner);

export default router;