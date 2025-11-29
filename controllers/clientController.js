const ClientModel = require('../models/ClientModel');
const { uploadSingle } = require('../middleware/uplodes'); 
const fs = require('fs');
const path = require('path');
const { uploadFile2  } = require('../middleware/aws');

const createClient = async (req, res) => {
  // Use multer middleware
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message })
    }

    try {
      const { name, title, description, category } = req.body

      if (!name || !title || !description || !category) {
        return res.status(400).json({ message: "All fields are required" })
      }

      if (!req.file) {
        return res.status(400).json({ message: "Image is required" })
      }
      const image=await uploadFile2(req.file,"client")
      const newClient = new ClientModel({
        image: image, // Store just the filename
        name,
        title,
        description,
        category,
      })

      await newClient.save()
      res.status(201).json(newClient)
    } catch (error) {
      console.error("Create Client Error:", error)
      res.status(500).json({ message: "Server error" })
    }
  })
}

const getClients = async (req, res) => {
  try {
    const clients = await ClientModel.find().sort({ createdAt: -1 })
    res.status(200).json(clients)
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch clients" })
  }
}

const updateClient = async (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message })
    }

    try {
      const { id } = req.params
      const { name, title, description, category } = req.body

      if (!name || !title || !description || !category) {
        return res.status(400).json({ message: "All fields are required" })
      }

      const updateData = { name, title, description, category }

      // If new image is uploaded, update image path
      if (req.file) {
        updateData.image = await uploadFile2(req.file,"client")

        // Delete old image file
        const oldClient = await ClientModel.findById(id)
        if (oldClient && oldClient.image) {
          // Use path.join with process.cwd() for consistency with app.js static serving
          const oldImagePath = path.join(process.cwd(), "uploads", oldClient.image)
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath)
          }
        }
      }

      const updatedClient = await ClientModel.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      })

      if (!updatedClient) {
        return res.status(404).json({ message: "Client not found" })
      }

      res.status(200).json(updatedClient)
    } catch (error) {
      console.error("Update Client Error:", error)
      res.status(500).json({ message: "Server error" })
    }
  })
}

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params

    const client = await ClientModel.findById(id)
    if (!client) {
      return res.status(404).json({ message: "Client not found" })
    }

    // Delete image file
    if (client.image) {
      // Use path.join with process.cwd() for consistency with app.js static serving
      const imagePath = path.join(process.cwd(), "uploads", client.image)
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
    }

    await ClientModel.findByIdAndDelete(id)
    res.status(200).json({ message: "Client deleted successfully" })
  } catch (error) {
    console.error("Delete Client Error:", error)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = { createClient, getClients, updateClient, deleteClient };




