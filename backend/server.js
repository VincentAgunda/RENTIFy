require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./config/db'); // Ensure path is correct

// Import routes
const userRoutes = require('./routes/userRoutes');
const houseRoutes = require('./routes/houseRoutes');

// Initialize app
const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // CORS for React frontend
app.use(helmet()); // Security headers
app.use(express.json());

// Connect to MongoDB
connectDB();

// Base route (optional)
app.get('/', (req, res) => {
  res.send('API is running...');
});

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
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  app.close(() => {
    process.exit(1);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
