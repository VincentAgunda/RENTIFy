const express = require('express');
const { getHouses, addHouse, deleteHouse } = require('../controllers/houseController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const path = require('path');

// Initialize the router
const router = express.Router();

// Create a GridFS storage engine for image uploads
const storage = new GridFsStorage({
  url: process.env.MONGO_URI, // MongoDB URI from environment variables
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // Specify file information to be saved in GridFS
      const fileInfo = {
        bucketName: 'photos', // Use 'photos' as the GridFS bucket for storing images
        filename: `${Date.now()}${path.extname(file.originalname)}`, // Ensure each file has a unique name
      };
      resolve(fileInfo); // Resolve the promise with file information
    });
  },
});

// Initialize multer with GridFS storage engine
const upload = multer({ storage });

// @route GET /api/houses
// @desc Get all houses, with optional filtering by featured status
// @access Public
router.route('/').get(getHouses);

// @route POST /api/houses
// @desc Add a new house with image uploads
// @access Private (protected by middleware)
// Uploads up to 10 images
router.route('/').post(protect, upload.array('images', 10), addHouse);

// @route DELETE /api/houses/:id
// @desc Delete a specific house by ID (requires authentication)
// @access Private
router.route('/:id').delete(protect, deleteHouse);

module.exports = router;
