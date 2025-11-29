const { uploadFile2  } = require('../middleware/aws');
const ReleasedMovie = require('../models/ReleasedMovie');
const fs = require('fs');

// Create
const createReleasedMovie = async (req, res) => {
  try {
    const { title, isNew } = req.body;
    const image = req.files && req.files.image && req.files.image[0] && req.files.video[0].filename ? await uploadFile2(req.files && req.files.image && req.files.image[0],"releasemovies"):"";
    const video = req.files && req.files.video && req.files.video[0] && req.files.video[0].filename ? await uploadFile2(req.files && req.files.video && req.files.video[0],"releasemovies"):"";


    const newMovie = new ReleasedMovie({
      title,
      isNewFlag: isNew === 'true' || isNew === true,
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
const getAllReleasedMovies = async (req, res) => {
  try {
    const movies = await ReleasedMovie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get by ID
const getReleasedMovieById = async (req, res) => {
  try {
    const movie = await ReleasedMovie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
const updateReleasedMovie = async (req, res) => {
  try {
    const { title, isNew } = req.body;
    const movie = await ReleasedMovie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

    if (req.files && req.files.image && req.files.image[0]) {
     
      movie.image = await uploadFile2(req.files && req.files.image && req.files.image[0],"releasemovies");
    }

    if (req.files && req.files.video && req.files.video[0]) {
   
      movie.video = await uploadFile2(req.files && req.files.video && req.files.video[0],"releasemovies")
    }

    movie.title = title || movie.title;
    if (isNew !== undefined) {
      movie.isNewFlag = isNew === 'true' || isNew === true;
    }

    await movie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete
const deleteReleasedMovie = async (req, res) => {
  try {
    const movie = await ReleasedMovie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });

 
    await movie.deleteOne();
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createReleasedMovie, getAllReleasedMovies, getReleasedMovieById, updateReleasedMovie, deleteReleasedMovie };




