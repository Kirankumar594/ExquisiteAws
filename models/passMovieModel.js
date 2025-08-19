import mongoose from 'mongoose';

const passMovieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    isNew: { type: Boolean, default: false },
    video: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('PassMovie', passMovieSchema);
