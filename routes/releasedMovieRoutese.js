
import express from 'express';
import {
  createReleasedMovie,
  getAllReleasedMovies,
  getReleasedMovieById,
  updateReleasedMovie,
  deleteReleasedMovie,
} from '../controllers/releasedMovieControllers.js';
import { uploadReleasedMovie } from '../middleware/RehdVodeo.js';

const router = express.Router();

router.post('/', uploadReleasedMovie, createReleasedMovie);
router.get('/', getAllReleasedMovies);
router.get('/:id', getReleasedMovieById);
router.put('/:id', uploadReleasedMovie, updateReleasedMovie);
router.delete('/:id', deleteReleasedMovie);

export default router;