const express = require('express');

const { createPortfolio,
  getPortfolios,
  updatePortfolio,
  deletePortfolio
 } = require('../controllers/interiorPortfolioController');
const multer = require('multer');
const upload=multer();
const router = express.Router();

router.post('/', upload.single('image'), createPortfolio);
router.get('/', getPortfolios);
router.put('/:id', upload.single('image'), updatePortfolio);
router.delete('/:id', deletePortfolio);

module.exports = router;

