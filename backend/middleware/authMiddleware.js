const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes with token-based authentication
const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token from the "Authorization" header
      token = req.headers.authorization.split(' ')[1];

      // Verify token using JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by ID, excluding the password from the response
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next(); // Proceed to the next middleware or route
    } catch (error) {
      console.error('Token verification error:', error.message);

      // Handle specific JWT errors for clarity
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired. Please login again.' });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token. Authorization denied.' });
      }

      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, token missing' });
  }
};

module.exports = { protect };
