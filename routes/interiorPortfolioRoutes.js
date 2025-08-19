import express from 'express';

import {
  createPortfolio,
  getPortfolios,
  updatePortfolio,
  deletePortfolio
} from '../controllers/interiorPortfolioController.js';
import multer from 'multer';
const upload=multer();
const router = express.Router();

router.post('/', upload.single('image'), createPortfolio);
router.get('/', getPortfolios);
router.put('/:id', upload.single('image'), updatePortfolio);
router.delete('/:id', deletePortfolio);

export default router;
