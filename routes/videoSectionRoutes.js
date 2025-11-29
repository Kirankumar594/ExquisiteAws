const express = require('express');
const { createVideoSection,
  getAllVideoSections,
  getVideoSectionById,
  getVideoSectionsByPage,
  updateVideoSection,
  deleteVideoSection
 } = require('../controllers/videoSectionController');
const multer = require('multer');

// const { upload  } = require('../middleware/video');
const upload=multer();
const router = express.Router();
const uploadFields = upload;

router.post('/', uploadFields.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]), createVideoSection);
router.get('/', getAllVideoSections);
router.get('/page/:pageId', getVideoSectionsByPage);
router.get('/:id', getVideoSectionById);
router.put('/:id', uploadFields.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]), updateVideoSection);
router.delete('/:id', deleteVideoSection);

module.exports = router;

