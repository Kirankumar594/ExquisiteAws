
const mongoose = require('mongoose');

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

const Consultation = mongoose.model('Consultation', ConsultationSchema);


module.exports = { Consultation };
