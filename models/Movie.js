
import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    rating: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['released', 'upcoming', 'post-production'],
      default: 'released',
    },
    genre: { type: [String], required: true },
    duration: { type: String, required: true },
    rating_score: { type: Number, min: 0, max: 10 },
    type: { type: String, enum: ['file', 'youtube'], required: true },
    image: { type: String, required: true },
    video: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Movie', movieSchema);
