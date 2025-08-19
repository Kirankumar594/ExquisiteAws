import mongoose from 'mongoose';

const productionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    description: { type: String, required: true },
    images: [{ type: String, required: true }]
  },
  { timestamps: true }
);

export default mongoose.model('ProductionSection', productionSchema);
