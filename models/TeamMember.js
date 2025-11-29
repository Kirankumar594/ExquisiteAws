const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: String,
  title: String,
  role: String, // Example: 'CIO'
  description: String,
  image: String, // File path or URL
}, { timestamps: true });

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);


module.exports = { TeamMember };
