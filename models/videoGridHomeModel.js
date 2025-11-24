
import mongoose from 'mongoose';

const videoGridHomeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    views: { type: Number, default: 0 },
    image: { type: String, required: true },
    video: { type: String, required: true }, // File path or YouTube link
    type: { type: String, enum: ['file', 'youtube'], required: true }, // New field
  },
  { timestamps: true }
);

export default mongoose.model('VideoGridHome', videoGridHomeSchema);
