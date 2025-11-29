const express = require('express');
const { registerAdmin, loginAdmin  } = require('../controllers/adminController');

const router = express.Router();

router.post('/register', registerAdmin); // optional, only first admin
router.post('/login', loginAdmin);

module.exports = router;

