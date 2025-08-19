import express from 'express';
import {
  createUpcomingMovie,
  getAllUpcomingMovies,
  getUpcomingMovieById,
  updateUpcomingMovie,
  deleteUpcomingMovie,
} from '../controllers/upcomingMovieControllers.js';
import multer from 'multer';

const router = express.Router();
const uploadUpcomingMovie=multer()
router.post('/', uploadUpcomingMovie.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
]), createUpcomingMovie);
router.get('/', getAllUpcomingMovies);
router.get('/:id', getUpcomingMovieById);
router.put('/:id', uploadUpcomingMovie.fields([
  { name: 'image', maxCount: 1 },
  { name: 'video', maxCount: 1 },
]), updateUpcomingMovie);
router.delete('/:id', deleteUpcomingMovie);

export default router;
