const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('./models/adminModel');

dotenv.config();
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const email = 'admin@example.com';
    const password = 'admin123';

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit();
    }

    const admin = new Admin({ email, password });
    await admin.save();
    console.log('Admin created:', admin);
    process.exit();
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });
