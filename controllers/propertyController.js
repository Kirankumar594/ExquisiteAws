const { uploadFile2  } = require('../middleware/aws');
const Property = require('../models/PropertyModel');

// Create new property
const createProperty = async (req, res) => {
  try {
    const { title } = req.body;
    const image = req.file? await uploadFile2(req.file,"property"):""

    if (!title || !image) {
      return res.status(400).json({ message: 'Title and image are required' });
    }

    const newProperty = new Property({ title, image });
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all properties
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single property
const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update property
const updateProperty = async (req, res) => {
  try {
    const { title } = req.body;
    const property = await Property.findById(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    if (req.file) {
      property.image = await uploadFile2(req.file,"property")
    }

    property.title = title || property.title;
    await property.save();
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ 
      message: error.message || 'Failed to delete property'
    });
  }
};

module.exports = { createProperty, getProperties, getPropertyById, updateProperty, deleteProperty };




