const mongoose = require('mongoose');

const investmentPortfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  roi: {
    type: String,
    required: true,
  },
  risk: {
    type: String,
    enum: ['Low', 'Medium', 'Medium-Low', 'Medium-High', 'High'],
    required: true,
  },
}, {
  timestamps: true,
});

const Investment= mongoose.model('InvestmentPortfolio', investmentPortfolioSchema);

