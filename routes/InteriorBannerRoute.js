const express = require('express');
// const { upload } = require('../middleware/upload'); // your multer config
const { createInteriorBanner,
  getInteriorBanners,
  updateInteriorBanner,
  deleteInteriorBanner
 } = require('../controllers/InteriorBannerController');
const multer = require('multer');

const router = express.Router();
const upload=multer();
router.post('/', upload.single('image'), createInteriorBanner);
router.get('/', getInteriorBanners);
router.delete('/:id', deleteInteriorBanner);
router.patch('/:id', upload.single('image'), updateInteriorBanner);

module.exports = router;
