const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); // Import the protect middleware
const router = express.Router();

// Public routes (no authentication required)
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected routes (authentication required)
router.get('/dashboard', protect, (req, res) => {
  // This route is protected and requires authentication
  res.json({ message: 'Welcome to the dashboard!', userId: req.user.id });
});

module.exports = router;
