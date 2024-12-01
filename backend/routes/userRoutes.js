const express = require('express');
const { registerUser, loginUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Protected route (only landlords can access)
router.get('/dashboard', protect, (req, res) => {
  if (req.user.role !== 'landlord') {
    return res.status(403).json({ message: 'Access denied, landlords only' });
  }

  res.json({ message: 'Welcome to the dashboard, Landlord!', userId: req.user.id });
});

module.exports = router;
