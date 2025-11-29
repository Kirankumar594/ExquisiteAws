
const express = require('express');
// const upload = require('../middleware/upload');
const { createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
 } = require('../controllers/movieController');
const multer = require('multer');
const upload=multer();

const router = express.Router();

router.post(
  '/',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  createMovie
);

router.get('/', getAllMovies);
router.get('/:id', getMovieById);

router.put(
  '/:id',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]),
  updateMovie
);

router.delete('/:id', deleteMovie);

module.exports = router;

