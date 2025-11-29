const mongoose = require('mongoose');

const SolutionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Solution = mongoose.model('Solution', SolutionSchema);
module.exports = Solution;

