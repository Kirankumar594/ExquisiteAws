import mongoose from 'mongoose';

const InteriorBannerSchema = new mongoose.Schema({
  image: {
    type: String,           // Stores filename (image or PDF)
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
}, { timestamps: true });

const InteriorBanner = mongoose.model('InteriorBanner', InteriorBannerSchema);
export default InteriorBanner;
