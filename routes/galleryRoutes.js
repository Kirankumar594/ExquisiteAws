import express from 'express';
// import { uploadSingle } from '../path/to/your/multerConfig.js';
// import {upload} from "../middleware/upload.js"
import { createGallery, getAllGallery, updateGallery, deleteGallery } from '../controllers/galleryController.js';
import multer from 'multer';

const router = express.Router();
const upload=multer();
// Use uploadSingle middleware for the create route
router.post('/', upload.single('image'), createGallery);
router.get('/', getAllGallery);
router.put('/:id', upload.single('image'),updateGallery);
router.delete('/:id', deleteGallery);

export default router;