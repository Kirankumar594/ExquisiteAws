const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if first admin already exists
    const count = await Admin.countDocuments();
    if (count > 0) return res.status(403).json({ msg: 'Registration disabled' });

    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password required' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashed });

    await newAdmin.save().catch(err => {
      if (err.code === 11000) {
        return res.status(400).json({ msg: 'Admin already exists' });
      }
      throw err;
    });

    res.status(201).json({ msg: 'Admin created successfully', username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password required' });
    }

    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, id: admin._id, username: admin.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerAdmin, loginAdmin };




