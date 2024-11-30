const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware
const router = express.Router();

// Public routes (no authentication required)
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (authentication required)
router.get('/dashboard', protect, (req, res) => {
  // Check if the user is a landlord
  if (req.user.role !== 'landlord') {
    return res.status(403).json({ message: 'Access denied, landlords only' });
  }

  res.json({ message: 'Welcome to the dashboard, Landlord!', userId: req.user.id });
});

module.exports = router;
