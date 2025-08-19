
import mongoose from 'mongoose';

const ConsultationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  investmentAmount: {
    type: String,
    required: true,
  },
  interests: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

export const Consultation = mongoose.model('Consultation', ConsultationSchema);
