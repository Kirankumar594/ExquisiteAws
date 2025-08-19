import express from "express"
import { createUserMessage, getAllMessages } from "../controllers/userMessageController.js"

const router = express.Router()

// POST /api/user - Create new message
router.post("/", createUserMessage)

// GET /api/user - Get all messages (for admin)
router.get("/", getAllMessages)

export default router
