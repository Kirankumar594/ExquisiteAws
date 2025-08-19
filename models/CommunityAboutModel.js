// models/CommunityAboutModel.js
import mongoose from "mongoose"

const communityAboutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      // Renamed from 'subscription' to 'description' for clarity, matching your controller
      type: String,
      required: true,
    },
    images: {
      type: [String], // Array of image paths
      required: true,
    },
  },
  { timestamps: true },
)

const CommunityAbout = mongoose.model("CommunityAbout", communityAboutSchema)
export default CommunityAbout
