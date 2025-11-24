
import express from 'express';
import {
  createUpcomingMovie,
  getAllUpcomingMovies,
  getUpcomingMovieById,
  updateUpcomingMovie,
  deleteUpcomingMovie,
} from '../controllers/upcomingMovieControllers.js';
import { uploadUpcomingMovie } from '../middleware/upcomingVideoUpload.js';

const router = express.Router();

router.post('/', uploadUpcomingMovie, createUpcomingMovie);
router.get('/', getAllUpcomingMovies);
router.get('/:id', getUpcomingMovieById);
router.put('/:id', uploadUpcomingMovie, updateUpcomingMovie);
router.delete('/:id', deleteUpcomingMovie);

export default router;
