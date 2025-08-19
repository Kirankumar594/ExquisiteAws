import mongoose from 'mongoose';

const bannerAboutSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Image is required']
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});


const BannerAbout = mongoose.model('BannerAbout', bannerAboutSchema);
export default BannerAbout;