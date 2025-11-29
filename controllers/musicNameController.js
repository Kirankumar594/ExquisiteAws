const MusicName = require('../models/MusicNameModel');

// CREATE
const createMusicName = async (req, res) => {
  try {
    const { title } = req.body;
    const newMusic = new MusicName({ title });
    await newMusic.save();
    res.status(201).json(newMusic);
  } catch (error) {
    res.status(500).json({ message: 'Error creating Music name', error });
  }
};

// GET ALL
const getAllMusicNames = async (req, res) => {
  try {
    const Musics = await MusicName.find().sort({ createdAt: -1 });
    res.status(200).json(Musics);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Music names', error });
  }
};

// GET BY ID
const getMusicNameById = async (req, res) => {
  try {
    const Music = await MusicName.findById(req.params.id);
    if (!Music) {
      return res.status(404).json({ message: 'Music not found' });
    }
    res.status(200).json(Music);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching Music name', error });
  }
};

// UPDATE
const updateMusicName = async (req, res) => {
  try {
    const { title } = req.body;
    const updatedMusic = await MusicName.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );
    if (!updatedMusic) {
      return res.status(404).json({ message: 'Music not found' });
    }
    res.status(200).json(updatedMusic);
  } catch (error) {
    res.status(500).json({ message: 'Error updating Music name', error });
  }
};

// DELETE
const deleteMusicName = async (req, res) => {
  try {
    const deleted = await MusicName.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Music not found' });
    }
    res.status(200).json({ message: 'Music deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting Music name', error });
  }
};

module.exports = { createMusicName, getAllMusicNames, getMusicNameById, updateMusicName, deleteMusicName };




