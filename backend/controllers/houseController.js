const House = require('../api/House');
const mongoose = require('mongoose');

// @desc Get houses
// @route GET /api/houses
// @access Public (with optional query params for filtering)
const getHouses = async (req, res) => {
  const { featured } = req.query;

  try {
    // If 'featured' query is passed, filter by featured houses
    const houses = featured
      ? await House.find({ featured: true })
      : await House.find();

    res.status(200).json(houses);
  } catch (error) {
    console.error('Error fetching houses:', error);
    res.status(500).json({ message: 'Error fetching houses. Please try again later.' });
  }
};

// @desc Add a new house
// @route POST /api/houses
// @access Private
const addHouse = async (req, res) => {
  const { name, location, price, description, featured } = req.body;

  // Input validation
  if (!name || !location || !price || !description) {
    return res.status(400).json({ message: 'All fields are required: name, location, price, description.' });
  }

  // Log the files for debugging purposes
  console.log("Uploaded files:", req.files);

  // Ensure files exist before attempting to process them
  const imageIds = req.files ? req.files.map(file => file.id) : [];
  console.log("Image IDs:", imageIds);

  try {
    // Create the new house document with the file IDs in the 'images' field
    const newHouse = await House.create({
      name,
      location,
      price,
      description,
      featured,
      images: imageIds, // Store the GridFS file IDs in the database
      user: req.user._id, // Link house to the authenticated user
    });

    res.status(201).json(newHouse);
  } catch (error) {
    console.error('Error creating house listing:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// @desc Delete a house
// @route DELETE /api/houses/:id
// @access Private
const deleteHouse = async (req, res) => {
  const { id } = req.params;

  try {
    const house = await House.findById(id);
    if (!house) return res.status(404).json({ message: 'House not found' });

    // Check if the user owns the house
    if (house.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Delete images from GridFS if they exist
    if (house.images && house.images.length > 0) {
      const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: 'photos' });
      await Promise.all(house.images.map(async (fileId) => {
        await gfs.delete(mongoose.Types.ObjectId(fileId)); // Delete file from GridFS
      }));
    }

    // Remove house document
    await house.remove();
    res.status(200).json({ message: 'House and associated files removed successfully' });
  } catch (error) {
    console.error('Error deleting house:', error);
    res.status(500).json({ message: 'Error deleting house. Please try again later.' });
  }
};

module.exports = { getHouses, addHouse, deleteHouse };
