// const express = require('express');
// const upload = require('../middleware/upload');
// const { //   createProduction,
//   getAllProductions,
//   getProductionById,
//   updateProduction,
//   deleteProduction,
//  } = require('../controllers/productionController');

// const router = express.Router();

// router.post('/', upload.array('images', 10), createProduction);
// router.get('/', getAllProductions);
// router.get('/:id', getProductionById);
// router.put('/:id', upload.array('images', 10), updateProduction);
// router.delete('/:id', deleteProduction);

// module.exports = router;
const express = require('express');
const multer = require('multer');
const { createProduction,
  getAllProductions,
  getProductionById,
  updateProduction,
  deleteProduction,
 } = require('../controllers/productionController');

const upload = multer(); // memory storage (good for S3)
const router = express.Router();

router.post('/', upload.array('image', 10), createProduction);
router.get('/', getAllProductions);
router.get('/:id', getProductionById);
router.put('/:id', upload.array('image', 10), updateProduction);
router.delete('/:id', deleteProduction);

module.exports = router;

