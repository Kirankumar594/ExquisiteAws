import mongoose from 'mongoose';

const videoSectionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    video: { type: String, required: false },
    pageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PageName',
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('VideoSection', videoSectionSchema);
