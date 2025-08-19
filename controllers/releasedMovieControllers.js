import { uploadFile2 } from '../middleware/aws.js';
import ReleasedMovie from '../models/releasedMovieModel.js';
import fs from 'fs';

// CREATE
export const createReleasedMovie = async (req, res) => {
  try {
    const { title, isNew, description } = req.body;


    const imageFile = req.files?.image?.[0]?.filename ? await uploadFile2(req.files?.image?.[0],"releasemovies"):"";
    const videoFile = req.files?.video?.[0]?.filename ? await uploadFile2(req.files?.video?.[0],"releasemovies"):"";

    if (!imageFile || !videoFile) {
      return res.status(400).json({ message: 'Image and video are required.' });
    }

    const newMovie = new ReleasedMovie({
      title,
      description,

      isNew: isNew === 'true' || isNew === true,
      image: imageFile,
      video: videoFile,
    });

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
export const getAllReleasedMovies = async (req, res) => {
  try {
    const movies = await ReleasedMovie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET BY ID
export const getReleasedMovieById = async (req, res) => {
  try {
    const movie = await ReleasedMovie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateReleasedMovie = async (req, res) => {
  try {
    const movie = await ReleasedMovie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const { title, isNew, description } = req.body;

    if (req.files?.image?.[0]) {
      // Delete old image
    
      movie.image = req.files?.image?.[0]?.filename ? await uploadFile2(req.files?.image?.[0],"releasemovies"):"";
    }

    if (req.files?.video?.[0]) {
      // Delete old video
    
      movie.video = req.files?.video?.[0]?.filename ? await uploadFile2(req.files?.video?.[0],"releasemovies"):"";
    }

    movie.title = title ?? movie.title;
    movie.description = description ?? movie.description;
    movie.isNew = isNew === 'true' || isNew === true;

    const updated = await movie.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
export const deleteReleasedMovie = async (req, res) => {
  try {
    const movie = await ReleasedMovie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

 
    await movie.deleteOne();
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
