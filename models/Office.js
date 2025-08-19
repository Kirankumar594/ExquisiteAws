import mongoose from 'mongoose';

const officeSchema = new mongoose.Schema({
  city: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String, required: true }, // image filename or URL
}, { timestamps: true });

export const Office = mongoose.model('Office', officeSchema);
