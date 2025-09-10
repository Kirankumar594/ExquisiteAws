import express from 'express';
import { createGallery, getAllGallery, updateGallery, deleteGallery,getGalleryById } from '../controllers/galleryController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer();

// Use upload.any() middleware for the create and update routes
router.post('/', upload.any(), createGallery);
router.get('/', getAllGallery);
router.put('/:id', upload.any(), updateGallery);
router.delete('/:id', deleteGallery);
router.get('/:id', getGalleryById);

export default router;