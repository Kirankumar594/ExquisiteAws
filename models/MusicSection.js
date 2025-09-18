
import mongoose from 'mongoose';

const musicSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true }, // thumbnail
    media: { type: String }, // audio/video file OR YouTube link
    type: { type: String, enum: ['audio', 'video', 'youtube'], required: true },
    musicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MusicName',
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('MusicSection', musicSectionSchema);
