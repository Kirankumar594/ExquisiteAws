const mongoose = require('mongoose');

const productionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('ProductionSection', productionSchema);

