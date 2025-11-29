const mongoose = require('mongoose');

const contactBlockSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      enum: ['Phone', 'Email', 'Headquarters']
    },
    icon: {
      type: String,
      required: true // e.g. "phone", "email", "location"
    },
    lines: {
      type: [String],
      required: true
    }
  },
  { timestamps: true }
);

const ContactBlock = mongoose.model('ContactBlock', contactBlockSchema);

module.exports = { ContactBlock };
