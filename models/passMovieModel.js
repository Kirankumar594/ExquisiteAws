

import mongoose from 'mongoose';

const passMovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    isNew: { type: Boolean, default: false },
    video: { type: String, required: true }, // Either file path or YouTube link
    type: { type: String, enum: ['file', 'youtube'], required: true }, // New field to track type
    description: { type: String, required: true },
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

export default mongoose.model('PassMovie', passMovieSchema);
