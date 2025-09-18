
import Movie from '../models/Movie.js';
import fs from 'fs';

// CREATE
export const createMovie = async (req, res) => {
  try {
    const {
      title,
      rating,
      releaseDate,
      status,
      genre,
      duration,
      rating_score,
      description,
      type,
      youtubeLink,
    } = req.body;

    const image = req.files?.image?.[0]?.path.replace(/\\/g, '/');

    let video = "";
    if (type === 'file') {
      if (!req.files?.video?.[0]) return res.status(400).json({ error: "Type and video source are required" });
      video = req.files.video[0].path.replace(/\\/g, '/');
    } else if (type === 'youtube') {
      if (!youtubeLink) return res.status(400).json({ error: "Type and video source are required" });
      video = youtubeLink;
    }

    if (!title || !image || !video) return res.status(400).json({ error: "Type and video source are required" });

    const movie = new Movie({
      title,
      rating,
      releaseDate,
      status,
      genre: genre.split(','),
      duration,
      rating_score,
      type,
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

// GET ALL
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET BY ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });

    const {
      title,
      rating,
      releaseDate,
      status,
      genre,
      duration,
      rating_score,
      description,
      type,
      youtubeLink,
    } = req.body;

    if (req.files?.image?.[0]) {
      if (fs.existsSync(movie.image)) fs.unlinkSync(movie.image);
      movie.image = req.files.image[0].path.replace(/\\/g, '/');
    }

    if (type === 'file') {
      if (req.files?.video?.[0]) {
        if (movie.video && fs.existsSync(movie.video)) fs.unlinkSync(movie.video);
        movie.video = req.files.video[0].path.replace(/\\/g, '/');
      }
    } else if (type === 'youtube') {
      movie.video = youtubeLink;
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
      type,
    });

    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: 'Movie not found' });

    if (fs.existsSync(movie.image)) fs.unlinkSync(movie.image);
    if (movie.type === 'file' && fs.existsSync(movie.video)) fs.unlinkSync(movie.video);

    await movie.deleteOne();
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
