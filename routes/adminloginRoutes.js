import express from 'express';
const router = express.Router();

import  loginAdmin  from '../controllers/adminloginController.js';
import Admin from '../models/adminModel.js'

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.create({ email, password });
  res.status(201).json(admin);
});

router.post('/login', loginAdmin);

export default router;