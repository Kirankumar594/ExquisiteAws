import { uploadFile2 } from '../middleware/aws.js';
import UpcomingMovie from '../models/upcomingMovieModel.js';
import fs from 'fs';

// CREATE
export const createUpcomingMovie = async (req, res) => {
  try {
    const { title, isNew, description } = req.body;

    const imageFile = req.files?.image?.[0] ? await uploadFile2(req.files?.image?.[0],"upcoming"):"";
    const videoFile = req.files?.video?.[0] ? await uploadFile2(req.files?.video[0],"upcoming"):"";

    if (!imageFile || !videoFile) {
      return res.status(400).json({ message: 'Image and video are required.' });
    }

    const newMovie = new UpcomingMovie({
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
export const getAllUpcomingMovies = async (req, res) => {
  try {
    const movies = await UpcomingMovie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET BY ID
export const getUpcomingMovieById = async (req, res) => {
  try {
    const movie = await UpcomingMovie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
export const updateUpcomingMovie = async (req, res) => {
  try {
    const movie = await UpcomingMovie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const { title, isNew, description } = req.body;

    if (req.files?.image?.[0]) {
      // if (fs.existsSync(movie.image)) fs.unlinkSync(movie.image);
      movie.image = await uploadFile2(req.files?.image?.[0],"upcoming");
    }

    if (req.files?.video?.[0]) {
      // if (fs.existsSync(movie.video)) fs.unlinkSync(movie.video);
      movie.video = await uploadFile2(req.files?.video[0],"upcoming");
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
export const deleteUpcomingMovie = async (req, res) => {
  try {
    const movie = await UpcomingMovie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    // if (fs.existsSync(movie.image)) fs.unlinkSync(movie.image);
    // if (fs.existsSync(movie.video)) fs.unlinkSync(movie.video);

    await movie.deleteOne();
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
