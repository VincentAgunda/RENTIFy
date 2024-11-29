const House = require('../models/House');

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
    res.status(500).json({ message: error.message });
  }
};

// @desc Add a new house
// @route POST /api/houses
// @access Private
const addHouse = async (req, res) => {
  const { name, location, price, description, featured, images } = req.body;

  try {
    const newHouse = await House.create({
      name,
      location,
      price,
      description,
      featured,
      images,
      user: req.user._id,  // Link house to the authenticated user
    });

    res.status(201).json(newHouse);
  } catch (error) {
    res.status(400).json({ message: 'Error creating house listing' });
  }
};

// @desc Delete a house
// @route DELETE /api/houses/:id
// @access Private
const deleteHouse = async (req, res) => {
  const { id } = req.params;

  try {
    const house = await House.findById(id);

    if (!house) {
      return res.status(404).json({ message: 'House not found' });
    }

    // Check if the user owns the house
    if (house.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await house.remove();
    res.status(200).json({ message: 'House removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHouses, addHouse, deleteHouse };
