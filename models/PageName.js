import mongoose from 'mongoose';

const pageNameSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

export default mongoose.model('PageName', pageNameSchema);
