const multer = require('multer');
const path = require('path');
const GridFsStorage = require('multer-gridfs-storage');
const mongoose = require('mongoose');

// MongoDB URI
const mongoURI = 'mongodb://localhost:27017/yourDatabase'; // Change this to your DB URI

// Create a GridFS storage engine instance
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    // Store files in GridFS with original name and timestamp to avoid name conflicts
    return {
      bucketName: 'photos', // Choose bucket name (optional)
      filename: Date.now() + path.extname(file.originalname), // Append timestamp to avoid conflicts
    };
  },
});

// Define file filter for image files only
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true); // Accept file
  } else {
    cb(new Error('Invalid file type. Only images are allowed.'));
  }
};

// Set up multer upload configuration
const upload = multer({
  storage, // Use GridFS storage
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter,
});

module.exports = upload;
