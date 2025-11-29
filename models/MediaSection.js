const mongoose = require('mongoose');

const mediaSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true }, // thumbnail
    media: { type: String }, // video/audio file OR YouTube link
    type: { type: String, enum: ['audio', 'video', 'youtube'], required: true },
    pageId: { type: mongoose.Schema.Types.ObjectId, ref: "PageName", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MediaSection', mediaSectionSchema);

