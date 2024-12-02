const express = require('express');
const { getHouses, addHouse, deleteHouse } = require('../controllers/houseController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage'); // Updated import
const path = require('path');

// Initialize the router
const router = express.Router();

// Create a GridFS storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,  // MongoDB connection URI (stored in environment variables)
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      // Define file information for storage in GridFS
      const fileInfo = {
        bucketName: 'photos',  // GridFS bucket name for images
        filename: Date.now() + path.extname(file.originalname), // Unique filename using timestamp
      };
      resolve(fileInfo);  // Resolve with file info to proceed with the upload
    });
  },
});

// Initialize multer with GridFS storage
const upload = multer({ storage });

// @route GET /api/houses -> Fetch all houses
router.route('/').get(getHouses);

// @route POST /api/houses -> Add new house (requires authentication)
// Use multer to handle image uploads (up to 10 images)
router.route('/').post(protect, upload.array('images', 10), addHouse);

// @route DELETE /api/houses/:id -> Delete a specific house (requires authentication)
router.route('/:id').delete(protect, deleteHouse);

module.exports = router;
