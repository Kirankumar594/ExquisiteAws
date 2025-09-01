// import mongoose from 'mongoose';

// const gallerySchema = new mongoose.Schema({
//   image: {
//     type: String,
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     // enum: ['All', 'Residential Project', 'Interior', 'Wooden Carving'],
//     required: true,
//   },
// });

// const Gallery = mongoose.model('Gallery', gallerySchema);
// export default Gallery;

// models/galleryModel.js
import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
  images: [
    {
      type: String,
      required: true,
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
