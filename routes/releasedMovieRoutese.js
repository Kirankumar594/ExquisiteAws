
const express = require('express');
const { createReleasedMovie,
  getAllReleasedMovies,
  getReleasedMovieById,
  updateReleasedMovie,
  deleteReleasedMovie,
 } = require('../controllers/releasedMovieControllers');
const { uploadReleasedMovie  } = require('../middleware/RehdVodeo');

const router = express.Router();

router.post('/', uploadReleasedMovie, createReleasedMovie);
router.get('/', getAllReleasedMovies);
router.get('/:id', getReleasedMovieById);
router.put('/:id', uploadReleasedMovie, updateReleasedMovie);
router.delete('/:id', deleteReleasedMovie);

module.exports = router;
