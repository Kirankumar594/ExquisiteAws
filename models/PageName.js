const mongoose = require('mongoose');

const pageNameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PageName', pageNameSchema);

