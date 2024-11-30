const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @desc Register a user
// @route POST /api/users/register
// @access Public
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate inputs
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Please provide all required fields: name, email, password, and role.' });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists with that email' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role, // Save the role passed in the request body
    });

    if (user) {
      // Respond with user info and generated JWT token
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,  // Send the role in the response
        token: generateToken(user.id), // Include the token in the response
      });
    } else {
      res.status(400).json({ message: 'User registration failed. Invalid data.' });
    }
  } catch (error) {
    console.error('Error during registration:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// @desc Authenticate a user (Login)
// @route POST /api/users/login
// @access Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate inputs
  if (!email || !password) {
    return res.status(400).json({ message: 'Please provide both email and password' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials, user not found' });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials, password mismatch' });
    }

    // Respond with user info and JWT token
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,  // Include the user's role
      token: generateToken(user.id), // Generate and send token
    });
  } catch (error) {
    console.error('Error during login:', error); // Log the error for debugging
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Helper function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',  // Set token expiration time (30 days)
  });
};

module.exports = { registerUser, loginUser };
