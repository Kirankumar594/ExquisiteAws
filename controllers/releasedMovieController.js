import { uploadFile2 } from '../middleware/aws.js';
import ReleasedMovie from '../models/ReleasedMovie.js';
import fs from 'fs';

// Create
export const createReleasedMovie = async (req, res) => {
  try {
    const { title, isNew } = req.body;
    const image = req.files?.image?.[0]?.filename ? await uploadFile2(req.files?.image?.[0],"releasemovies"):"";
    const video = req.files?.video?.[0]?.filename ? await uploadFile2(req.files?.video?.[0],"releasemovies"):"";


    const newMovie = new ReleasedMovie({
      title,
      isNew,
      image,
      video,
    });

    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All
export const getAllReleasedMovies = async (req, res) => {
  try {
    const movies = await ReleasedMovie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
export const getReleasedMovieById = async (req, res) => {
  try {
    const movie = await ReleasedMovie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
export const updateReleasedMovie = async (req, res) => {
  try {
    const { title, isNew } = req.body;
    const movie = await ReleasedMovie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    if (req.files?.image?.[0]) {
     
      movie.image = await uploadFile2(req.files?.image?.[0],"releasemovies");
    }

    if (req.files?.video?.[0]) {
   
      movie.video = await uploadFile2(req.files?.video?.[0],"releasemovies")
    }

    movie.title = title || movie.title;
    movie.isNew = isNew !== undefined ? isNew : movie.isNew;

    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
export const deleteReleasedMovie = async (req, res) => {
  try {
    const movie = await ReleasedMovie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

 
    await movie.deleteOne();
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
