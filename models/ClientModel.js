import mongoose from "mongoose"

const clientSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      // Expanded enum to match frontend categories
      enum: [
        "Interior Design",
        "Real Estate",
        "Real Estate + Design",
        "Renovation",
        "Architecture",
        "Commercial",
        "Residential",
        "Consultation",
        "Other",
      ],
    },
  },
  {
    timestamps: true,
  },
)

const ClientModel = mongoose.model("Client", clientSchema)
export default ClientModel
