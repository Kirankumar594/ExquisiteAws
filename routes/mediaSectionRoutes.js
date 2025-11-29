const express = require('express');
// const { upload  } = require('../middleware/video');
const { createMediaSection,
  getAllMediaSections,
  getMediaSectionById,
  getMediaSectionsByPageId,
  updateMediaSection,
  deleteMediaSection
 } = require('../controllers/mediaSectionController');
const multer = require('multer');

const upload = multer();  

const router = express.Router();


const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'media', maxCount: 1 }
]);

router.post('/', uploadFields, createMediaSection);
router.get('/', getAllMediaSections);
router.get('/page/:pageId', getMediaSectionsByPageId);
router.get('/:id', getMediaSectionById);
router.put('/:id', uploadFields, updateMediaSection);
router.delete('/:id', deleteMediaSection);

module.exports = router;

