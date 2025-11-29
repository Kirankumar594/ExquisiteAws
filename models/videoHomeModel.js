const mongoose = require('mongoose');

const videoHomeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    views: { type: Number, default: 0 },
    image: { type: String, required: true },
    video: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('VideoHome', videoHomeSchema);

