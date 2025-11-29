const express = require('express');
const router = express.Router();

const { ContactMessage } = require('../models/ContactMessage');

// POST - Submit contact form
router.post('/contact', async (req, res) => {
  try {
    const newMessage = await ContactMessage.create(req.body);
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - Admin: View all messages
router.get('/admin/messages', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/admin/messages/:id', async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); 

// DELETE - Admin: Delete a message
router.delete('/admin/messages/:id', async (req, res) => {
  try {
    const deletedMessage = await ContactMessage.findByIdAndDelete(req.params.id);
    
    if (!deletedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }
    
    res.json({ 
      success: true,
      message: 'Message deleted successfully',
      deletedMessage
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

module.exports = router

