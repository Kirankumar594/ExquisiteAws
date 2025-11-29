const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Stat = mongoose.model('Stat', statSchema);

module.exports = Stat;  // Changed to default export
