import express from 'express';
// import {upload} from '../middleware/upload.js';
import {
  createProduction,
  getAllProductions,
  getProductionById,
  updateProduction,
  deleteProduction,
} from '../controllers/productionController.js';
import multer from 'multer';

const router = express.Router();
const upload=multer();

router.post('/', upload.array('images', 10), createProduction);
router.get('/', getAllProductions);
router.get('/:id', getProductionById);
router.put('/:id', upload.array('images', 10), updateProduction);
router.delete('/:id', deleteProduction);

export default router;
