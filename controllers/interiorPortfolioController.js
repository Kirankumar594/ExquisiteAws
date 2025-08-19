import InteriorPortfolio from '../models/InteriorPortfolioModel.js';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { uploadFile2 } from '../middleware/aws.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create Portfolio
export const createPortfolio = async (req, res) => {
  try {
    const { category, title, description } = req.body;
    const image = await uploadFile2(req.file,"interior");

    if (!category || !title || !image) {
      return res.status(400).json({ message: 'Category, Title, and Image are required' });
    }

    const newPortfolio = new InteriorPortfolio({ category, title, description, image });
    await newPortfolio.save();
    res.status(201).json(newPortfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all portfolios
export const getPortfolios = async (req, res) => {
  try {
    const portfolios = await InteriorPortfolio.find().sort({ createdAt: -1 });
    res.status(200).json(portfolios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Portfolio
export const updatePortfolio = async (req, res) => {
  try {
    const { category, title, description } = req.body;
    const portfolio = await InteriorPortfolio.findById(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    if (req.file) {

      portfolio.image = await uploadFile2(req.file,"interior");
    }

    portfolio.category = category || portfolio.category;
    portfolio.title = title || portfolio.title;
    portfolio.description = description || portfolio.description;

    await portfolio.save();
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Portfolio
export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await InteriorPortfolio.findByIdAndDelete(req.params.id);
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

   
    res.status(200).json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
