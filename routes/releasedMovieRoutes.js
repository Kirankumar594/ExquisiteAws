const express = require('express');
const { createReleasedMovie,
  getAllReleasedMovies,
  getReleasedMovieById,
  updateReleasedMovie,
  deleteReleasedMovie,
 } = require('../controllers/releasedMovieController');
const multer = require('multer');
// const { uploadReleasedMovie  } = require('../middleware/ReMoves');

const router = express.Router();
const uploadReleasedMovie=multer()
// ⬇️ Use `.fields()` to accept both image and video files
router.post(
  '/',
  uploadReleasedMovie.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  createReleasedMovie
);

router.get('/', getAllReleasedMovies);
router.get('/:id', getReleasedMovieById);

router.put(
  '/:id',
  uploadReleasedMovie.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  updateReleasedMovie
);

router.delete('/:id', deleteReleasedMovie);

module.exports = router;

