
import express from 'express';
// import upload from '../middleware/upload.js';
import {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from '../controllers/movieController.js';
import multer from 'multer';
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

export default router;
