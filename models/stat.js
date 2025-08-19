import mongoose from 'mongoose';

const statSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Stat = mongoose.model('Stat', statSchema);

export default Stat;  // Changed to default export