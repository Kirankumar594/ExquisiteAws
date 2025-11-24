
import UpcomingMovie from '../models/upcomingMovieModel.js';
import fs from 'fs';

import { uploadFile2 } from '../middleware/aws.js';

// CREATE


export const createUpcomingMovie = async (req, res) => {
  try {
    const { title, description, isNew, type, youtubeLink } = req.body;

    let imageFile = null;
    let videoFile = null;

    // Upload image if provided
    if (req.files?.image?.[0]) {
      imageFile = await uploadFile2(req.files.image[0], "media");
    }

    // Upload video if provided
    if (req.files?.video?.[0]) {
      videoFile = await uploadFile2(req.files.video[0], "media");
    }

    // Validate required inputs
    if (
      !imageFile ||
      (type === "file" && !videoFile) ||
      (type === "youtube" && !youtubeLink)
    ) {
      return res.status(400).json({
        message:
          "Thumbnail image and either YouTube link or video file are required.",
      });
    }

    // Choose video source
    const videoSource = type === "youtube" ? youtubeLink : videoFile;

    // Create movie
    const newMovie = new UpcomingMovie({
      title,
      description,
      isNew: isNew === "true" || isNew === true,
      image: imageFile, // ✅ S3 URL
      video: videoSource, // ✅ S3 URL or YouTube link
      type,
    });

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// UPDATE
export const updateUpcomingMovie = async (req, res) => {
  try {
    const movie = await UpcomingMovie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    const { title, description, isNew, type, youtubeLink } = req.body;

    if (req.files?.image?.[0]) {
      if (fs.existsSync(movie.image)) fs.unlinkSync(movie.image);
      movie.image = await uploadFile2(req.files['image'][0],"media");
    }

    if (type === 'file' && req.files?.video?.[0]) {
      if (fs.existsSync(movie.video)) fs.unlinkSync(movie.video);
      movie.video = await uploadFile2(req.files['video'][0],"media");
    }

    movie.title = title ?? movie.title;
    movie.description = description ?? movie.description;
    movie.isNew = isNew === 'true' || isNew === true;
    movie.type = type;
    movie.video = type === 'youtube' ? youtubeLink : (req.files?.video?.[0]?.path ?? movie.video);

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

    if (fs.existsSync(movie.image)) fs.unlinkSync(movie.image);
    if (movie.type === 'file' && fs.existsSync(movie.video)) fs.unlinkSync(movie.video);

    await movie.deleteOne();
    res.json({ message: 'Movie deleted successfully' });
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
