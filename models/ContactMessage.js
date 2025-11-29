const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    consent: Boolean
  },
  { timestamps: true }
);

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);


module.exports = { ContactMessage };
