import mongoose from 'mongoose';

const InteriorPortfolioSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true });

const InteriorPortfolio = mongoose.model('InteriorPortfolio', InteriorPortfolioSchema);
export default InteriorPortfolio;
