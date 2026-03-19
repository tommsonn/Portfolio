import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Submit contact form
router.post('/submit', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    const contact = new Contact({
      name,
      email,
      subject,
      message,
      read: false
    });

    await contact.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Message sent successfully', 
      contact 
    });
  } catch (error) {
    console.error('Error saving contact:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error sending message' 
    });
  }
});

// Get all contact messages
router.get('/list', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching messages' 
    });
  }
});

// Get unread count
router.get('/unread-count', async (req, res) => {
  try {
    const count = await Contact.countDocuments({ read: false });
    res.json({ count });
  } catch (error) {
    console.error('Error counting unread messages:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error counting messages' 
    });
  }
});

// Mark message as read
router.patch('/:id/read', async (req, res) => {
  try {
    console.log('Attempting to mark message as read. ID:', req.params.id);
    
    const contact = await Contact.findById(req.params.id);
    
    if (!contact) {
      console.log('Message not found with ID:', req.params.id);
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    
    console.log('Message marked as read successfully:', updatedContact);
    
    res.json({ 
      success: true, 
      message: 'Marked as read', 
      contact: updatedContact 
    });
  } catch (error) {
    console.error('Error updating message:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid message ID format' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Error updating message'
    });
  }
});

// Delete message
router.delete('/:id', async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({ 
        success: false, 
        message: 'Message not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Message deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    
    if (error.name === 'CastError') {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid message ID format' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting message' 
    });
  }
});

export default router;