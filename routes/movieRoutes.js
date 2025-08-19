// routes/movieRoutes.js
import express from 'express';
// import upload from '../middleware/MovisHome.js';
import {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} from '../controllers/movieController.js';

const router = express.Router();
import multer from 'multer';
const upload=multer();

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
