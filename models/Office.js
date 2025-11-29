const mongoose = require('mongoose');

const officeSchema = new mongoose.Schema({
  city: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String, required: true }, // image filename or URL
}, { timestamps: true });

const Office = mongoose.model('Office', officeSchema);

