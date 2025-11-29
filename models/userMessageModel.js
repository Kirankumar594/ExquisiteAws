const mongoose = require('mongoose');

const userMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    },
    number: {
      type: String,
      required: [true, "Contact number is required"],
      trim: true,
      maxlength: [20, "Contact number cannot exceed 20 characters"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [1000, "Message cannot exceed 1000 characters"],
    },
  },
  {
    timestamps: true,
  },
)

const UserMessage = mongoose.model("UserMessage", userMessageSchema)
module.exports = UserMessage

