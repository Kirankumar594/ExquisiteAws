import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['Real Estate', 'Exterior'],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  images: {
    type: [String], // Array of image URLs or filenames
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  developer: {
    type: String,
    required: true,
  },
  units: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: String,
    required: true, // You can also use type: Date if you want to handle actual dates
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed'],
    required: true,
  }
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
