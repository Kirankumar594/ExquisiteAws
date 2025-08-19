import Solution from '../models/SolutionModel.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { uploadFile2 } from '../middleware/aws.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Solution
export const createSolution = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file? await uploadFile2(req.file,"solution"):"";

    if (!name || !image) {
      return res.status(400).json({ message: 'Name and Image are required' });
    }

    const newSolution = new Solution({ name, image });
    await newSolution.save();
    res.status(201).json(newSolution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all solutions
export const getSolutions = async (req, res) => {
  try {
    const solutions = await Solution.find().sort({ createdAt: -1 });
    res.status(200).json(solutions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete solution
export const deleteSolution = async (req, res) => {
  try {
    const solution = await Solution.findByIdAndDelete(req.params.id);
    if (!solution) {
      return res.status(404).json({ message: 'Solution not found' });
    }



    res.status(200).json({ message: 'Solution deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Update solution
export const updateSolution = async (req, res) => {
  try {
    const { name } = req.body;
    const solution = await Solution.findById(req.params.id);

    if (!solution) {
      return res.status(404).json({ message: 'Solution not found' });
    }

    // If a new image is uploaded, delete the old one
    if (req.file) {
      
      solution.image = await uploadFile2(req.file,"solution")
    }

    solution.name = name || solution.name;

    await solution.save();
    res.status(200).json(solution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
