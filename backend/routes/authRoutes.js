import express from 'express';

const router = express.Router();

// Simple admin login route
router.post('/login', (req, res) => {
  const { password } = req.body;
  
  // You should use environment variable for password
  if (password === process.env.ADMIN_PASSWORD || 'admin123') {
    res.json({ 
      success: true, 
      message: 'Login successful',
      token: 'dummy-token' // In production, use JWT
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid password' 
    });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out' });
});

// Verify token route
router.get('/verify', (req, res) => {
  // Simple verification - in production, verify JWT
  res.json({ success: true, valid: true });
});

export default router;