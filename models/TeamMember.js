import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
  name: String,
  title: String,
  role: String, // Example: 'CIO'
  description: String,
  image: String, // File path or URL
}, { timestamps: true });

export const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
