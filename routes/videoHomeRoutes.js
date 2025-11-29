const express = require('express');
const { createVideoHome,
  getAllVideoHomes,
  getVideoHomeById,
  updateVideoHome,
  deleteVideoHome,
 } = require('../controllers/videoHomeController');
const multer = require('multer');

// const { upload  } = require('../middleware/homeVideo');

const router = express.Router();
const upload=multer()
// Upload fields
const uploadFields = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
]);

router.post('/', uploadFields, createVideoHome);
router.get('/', getAllVideoHomes);
router.get('/:id', getVideoHomeById);
router.put('/:id', uploadFields, updateVideoHome);
router.delete('/:id', deleteVideoHome);

module.exports = router;

