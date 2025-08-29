import express from 'express';
import {
  createReleasedMovie,
  getAllReleasedMovies,
  getReleasedMovieById,
  updateReleasedMovie,
  deleteReleasedMovie,
} from '../controllers/releasedMovieControllers.js';
import multer from 'multer';
// import { uploadReleasedMovie } from '../middleware/RehdVodeo.js';
const uploadReleasedMovie=multer();
const router = express.Router();

router.post('/', uploadReleasedMovie.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]), createReleasedMovie);
router.get('/', getAllReleasedMovies);
router.get('/:id', getReleasedMovieById);
router.put('/:id', uploadReleasedMovie.fields([
    { name: 'image', maxCount: 1 },
    { name: 'video', maxCount: 1 },
  ]), updateReleasedMovie);
router.delete('/:id', deleteReleasedMovie);

export default router;
