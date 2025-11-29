

const express = require('express');
const { createVideoGridHome,
  getAllVideoGridHome,
  getVideoGridHomeById,
  updateVideoGridHome,
  deleteVideoGridHome,
 } = require('../controllers/videoGridHomeController');
const { uploadVideoGridHome  } = require('../middleware/videoGridUpload');

const router = express.Router();

router.post('/', uploadVideoGridHome, createVideoGridHome);
router.get('/', getAllVideoGridHome);
router.get('/:id', getVideoGridHomeById);
router.put('/:id', uploadVideoGridHome, updateVideoGridHome);
router.delete('/:id', deleteVideoGridHome);

module.exports = router;

