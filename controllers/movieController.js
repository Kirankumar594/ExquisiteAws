// controllers/movieController.js
import { uploadFile2 } from '../middleware/aws.js';
import Movie from '../models/Movie.js';
import fs from 'fs';

export const createMovie = async (req, res) => {
  try {
    const { title, rating, releaseDate, status, genre, duration, rating_score, description } = req.body;
  const image =   await uploadFile2(req.files?.image?.[0],"movies");

    const video =   await uploadFile2(req.files?.video?.[0],"movies"); ;

    const movie = new Movie({
      title,
      rating,
      releaseDate,
      status,
      genre: genre.split(','),
      duration,
      rating_score,
      image,
      video,
      description,
    });

    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });

    const { title, rating, releaseDate, status, genre, duration, rating_score, description } = req.body;

    if (req.files?.image?.[0]) {
     
      movie.image = await uploadFile2(req.files?.image?.[0],"movies");
    }

    if (req.files?.video?.[0]) {

      movie.video = await uploadFile2(req.files?.video?.[0],"movies");
    }

    Object.assign(movie, {
      title,
      rating,
      releaseDate,
      status,
      genre: genre.split(','),
      duration,
      rating_score,
      description,
    });

    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });

 
    await movie.deleteOne();
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
