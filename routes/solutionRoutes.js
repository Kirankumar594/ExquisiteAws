const express = require('express');
// const { upload } = require('../middleware/upload');
const { createSolution,
  getSolutions,
  deleteSolution,
  updateSolution
 } = require('../controllers/solutionController');
const multer = require('multer');

const router = express.Router();
const upload=multer();
router.post('/', upload.single('image'), createSolution);
router.get('/', getSolutions);
router.delete('/:id', deleteSolution);
router.put('/:id', upload.single('image'), updateSolution)

module.exports = router;

