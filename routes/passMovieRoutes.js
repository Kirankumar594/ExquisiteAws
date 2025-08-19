import express from 'express';
import {
  createPassMovie,
  getAllPassMovies,
  getPassMovieById,
  updatePassMovie,
  deletePassMovie,
} from '../controllers/passMovieControllers.js';
import { uploadPassMovie } from '../middleware/passMovieUpload.js';

const router = express.Router();

router.post('/', uploadPassMovie, createPassMovie);
router.get('/', getAllPassMovies);
router.get('/:id', getPassMovieById);
router.put('/:id', uploadPassMovie, updatePassMovie);
router.delete('/:id', deletePassMovie);

export default router;
