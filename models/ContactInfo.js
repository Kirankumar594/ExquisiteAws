import mongoose from 'mongoose';

const contactInfoSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

export default mongoose.model('ContactInfo', contactInfoSchema);
