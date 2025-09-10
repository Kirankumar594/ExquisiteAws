import mongoose from 'mongoose';

const topProjectSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  // flat: {
  //   type: String, // e.g., '2bhk', '3bhk'
  //   required: true,
  //   trim: true,
  // },
  // amount: {
  //   type: String,
  //   required: true,
  // },
}, {
  timestamps: true,
});

const TopProject = mongoose.model('TopProject', topProjectSchema);

export default TopProject;
