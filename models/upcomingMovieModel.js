
import mongoose from 'mongoose';

const upcomingMovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    isNew: { type: Boolean, default: false },
    video: { type: String, required: true }, // File path or YouTube link
    type: { type: String, enum: ['file', 'youtube'], required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('UpcomingMovie', upcomingMovieSchema);
