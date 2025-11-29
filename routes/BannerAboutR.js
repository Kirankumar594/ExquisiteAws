const express = require('express');
const multer = require('multer');
const { createBanner,
  getBanners,
  getBannerById,
  updateBanner,
  deleteBanner
 } = require('../controllers/BannerAboutCo');

const router = express.Router();
const upload = multer()
// Routes
router.post('/', upload.single('image'), createBanner);
router.get('/', getBanners);
router.get('/:id', getBannerById);
router.put('/:id', upload.single('image'), updateBanner);
router.delete('/:id', deleteBanner);

module.exports = router;
