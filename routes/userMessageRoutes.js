const express = require('express');
const { createUserMessage, getAllMessages  } = require('../controllers/userMessageController');

const router = express.Router()

// POST /api/user - Create new message
router.post("/", createUserMessage)

// GET /api/user - Get all messages (for admin)
router.get("/", getAllMessages)

module.exports = router

