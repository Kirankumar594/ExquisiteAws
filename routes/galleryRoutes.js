const express = require('express');
const { createGallery, getAllGallery, updateGallery, deleteGallery,getGalleryById  } = require('../controllers/galleryController');
const multer = require('multer');

const router = express.Router();
const upload = multer();

// Use upload.any() middleware for the create and update routes
router.post('/', upload.any(), createGallery);
router.get('/', getAllGallery);
router.put('/:id', upload.any(), updateGallery);
router.delete('/:id', deleteGallery);
router.get('/:id', getGalleryById);

module.exports = router;
