const mongoose = require('mongoose');

const mapEmbedSchema = new mongoose.Schema({
  embedUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("MapEmbed", mapEmbedSchema);

