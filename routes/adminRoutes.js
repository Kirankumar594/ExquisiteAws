import express from 'express';
import { registerAdmin, loginAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.post('/register', registerAdmin);  // optional, disable after first admin
router.post('/login', loginAdmin);

export default router;
