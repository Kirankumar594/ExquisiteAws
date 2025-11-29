const express = require('express');
// const { upload } = require('../middleware/upload');
const { createExperience,
  getAllExperiences,
  updateExperience,
  deleteExperience
 } = require('../controllers/experienceController');
const multer = require('multer');

const router = express.Router();
const upload =multer();

router.post('/', upload.single('image'), createExperience);
router.get('/', getAllExperiences);
router.put('/:id', upload.single('image'), updateExperience);
router.delete('/:id', deleteExperience);

module.exports = router;

