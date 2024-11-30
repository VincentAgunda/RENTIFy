require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import CORS
const connectDB = require('./config/db');

// Import routes
const userRoutes = require('./routes/userRoutes');
const houseRoutes = require('./routes/houseRoutes');

// Initialize app
const app = express();

// Middleware
app.use(cors());  // Use CORS middleware to allow cross-origin requests
app.use(express.json()); // Body parser to parse JSON requests

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/houses', houseRoutes);

// Handle undefined routes (404)
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
