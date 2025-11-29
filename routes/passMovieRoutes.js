

const express = require('express');
const { createPassMovie,
  getAllPassMovies,
  getPassMovieById,
  updatePassMovie,
  deletePassMovie,
 } = require('../controllers/passMovieControllers');
const { uploadPassMovie  } = require('../middleware/passMovieUpload');

const router = express.Router();

router.post('/', uploadPassMovie, createPassMovie);
router.get('/', getAllPassMovies);
router.get('/:id', getPassMovieById);
router.put('/:id', uploadPassMovie, updatePassMovie);
router.delete('/:id', deletePassMovie);

module.exports = router;

