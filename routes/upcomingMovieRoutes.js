
const express = require('express');
const { createUpcomingMovie,
  getAllUpcomingMovies,
  getUpcomingMovieById,
  updateUpcomingMovie,
  deleteUpcomingMovie,
 } = require('../controllers/upcomingMovieControllers');
const { uploadUpcomingMovie  } = require('../middleware/upcomingVideoUpload');

const router = express.Router();

router.post('/', uploadUpcomingMovie, createUpcomingMovie);
router.get('/', getAllUpcomingMovies);
router.get('/:id', getUpcomingMovieById);
router.put('/:id', uploadUpcomingMovie, updateUpcomingMovie);
router.delete('/:id', deleteUpcomingMovie);

module.exports = router;

