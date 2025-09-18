import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  images: [
    {
      url: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        default: "",
      }
    }
  ],
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Gallery = mongoose.model('Gallery', gallerySchema);
export default Gallery;