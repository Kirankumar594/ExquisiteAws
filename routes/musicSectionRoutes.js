
const express = require('express');
const { createMusicSection,
  getAllMusicSections,
  getMusicSectionById,
  getMusicSectionsByMusicId,
  updateMusicSection,
  deleteMusicSection
 } = require('../controllers/musicSectionController');

// const { upload  } = require('../middleware/music'); // Assuming you already have multer setup
const multer = require('multer');
const upload=multer();

const router = express.Router();

const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'media', maxCount: 1 }
]);

router.post('/', uploadFields, createMusicSection);
router.get('/', getAllMusicSections);
router.get('/music/:musicId', getMusicSectionsByMusicId);
router.get('/:id', getMusicSectionById);
router.put('/:id', uploadFields, updateMusicSection);
router.delete('/:id', deleteMusicSection);

module.exports = router;

