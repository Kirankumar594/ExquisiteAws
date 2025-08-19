import mongoose from 'mongoose';

const musicNameSchema = new mongoose.Schema(

  {
    title: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('MusicName', musicNameSchema);
