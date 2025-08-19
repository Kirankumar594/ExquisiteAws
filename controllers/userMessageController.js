import UserMessage from "../models/userMessageModel.js"

// CREATE
export const createUserMessage = async (req, res) => {
  try {
    const { name, email, number, message } = req.body

    // Validate input
    const errors = []
    if (!name?.trim()) errors.push("Name is required")
    if (!email?.trim()) errors.push("Email is required")
    if (!number?.trim()) errors.push("Contact number is required")
    if (!message?.trim()) errors.push("Message is required")

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.push("Please enter a valid email address")
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors,
      })
    }

    const newMessage = new UserMessage({
      name: name.trim(),
      email: email.trim(),
      number: number.trim(),
      message: message.trim(),
    })

    await newMessage.save()

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    })
  } catch (error) {
    console.error("User Message Error:", error)

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message)
      return res.status(400).json({
        success: false,
        errors,
      })
    }

    res.status(500).json({
      success: false,
      message: "Server error",
      errors: ["Something went wrong. Please try again."],
    })
  }
}

// GET ALL MESSAGES
export const getAllMessages = async (req, res) => {
  try {
    const messages = await UserMessage.find().sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      data: messages,
    })
  } catch (error) {
    console.error("Fetch Messages Error:", error)
    res.status(500).json({
      success: false,
      message: "Server error",
    })
  }
}
