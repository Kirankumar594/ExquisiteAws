const express = require('express');
// const { upload } = require('../middleware/upload');
const { createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
 } = require('../controllers/propertyController');
const multer = require('multer');

const router = express.Router();
const upload=multer();
// Routes
router.post('/', upload.single('image'), createProperty);
router.get('/', getProperties);
router.get('/:id', getPropertyById);
router.put('/:id', upload.single('image'), updateProperty);
router.delete('/:id', deleteProperty);

module.exports = router;
