import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default mongoose.model('ExperienceCenter', experienceSchema);
