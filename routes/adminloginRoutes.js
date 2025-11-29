const express = require('express');
const router = express.Router();

const loginAdmin = require('../controllers/adminloginController');
const Admin = require('../models/adminModel');

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.create({ email, password });
  res.status(201).json(admin);
});

router.post('/login', loginAdmin); 


// check
module.exports = router;
