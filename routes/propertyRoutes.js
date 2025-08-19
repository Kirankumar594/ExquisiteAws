import express from 'express';
// import {upload} from '../middleware/upload.js';
import {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
} from '../controllers/propertyController.js';
import multer from 'multer';

const router = express.Router();
const upload=multer();
// Routes
router.post('/', upload.single('image'), createProperty);
router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.put('/:id', upload.single('image'), updateProperty);
router.delete('/:id', deleteProperty);

export default router;