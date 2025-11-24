import mongoose from 'mongoose';

const releasedMovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    isNew: { type: Boolean, default: false },
    video: { type: String, required: false },

    
  },
  { timestamps: true, suppressReservedKeysWarning: true }
);

export default mongoose.model('ReleasedMovie', releasedMovieSchema);
