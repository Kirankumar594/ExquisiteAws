// import express from 'express';
// import upload from '../middleware/upload.js';
// import {
//   createProduction,
//   getAllProductions,
//   getProductionById,
//   updateProduction,
//   deleteProduction,
// } from '../controllers/productionController.js';

// const router = express.Router();

// router.post('/', upload.array('images', 10), createProduction);
// router.get('/', getAllProductions);
// router.get('/:id', getProductionById);
// router.put('/:id', upload.array('images', 10), updateProduction);
// router.delete('/:id', deleteProduction);

// export default router;
import express from 'express';
import multer from 'multer';
import {
  createProduction,
  getAllProductions,
  getProductionById,
  updateProduction,
  deleteProduction,
} from '../controllers/productionController.js';

const upload = multer(); // memory storage (good for S3)
const router = express.Router();

router.post('/', upload.array('image', 10), createProduction);
router.get('/', getAllProductions);
router.get('/:id', getProductionById);
router.put('/:id', upload.array('image', 10), updateProduction);
router.delete('/:id', deleteProduction);

export default router;
