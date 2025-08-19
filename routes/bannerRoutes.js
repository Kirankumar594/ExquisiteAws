import express from 'express';
import multer from 'multer';
import {
  createBanner,
  getBanners,
  getBannerById,
  updateBanner,
  deleteBanner
} from '../controllers/bannerController.js';

const router = express.Router();
const upload =multer()
// Routes
router.post('/', upload.single('image'), createBanner);
router.get('/', getBanners);
router.get('/:id', getBannerById);
router.put('/:id', upload.single('image'), updateBanner);
router.delete('/:id', deleteBanner);

export default router;
