const express = require('express');
const { getHouses, addHouse, deleteHouse } = require('../controllers/houseController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// GET /api/houses?featured=true -> Fetch featured houses
// POST /api/houses -> Add new house (requires authentication)
router.route('/')
  .get((req, res, next) => {
    // Log the incoming query params for debugging
    console.log('Received GET request on /api/houses with query:', req.query);
    next();  // Continue to the getHouses function
  }, getHouses)
  .post(protect, addHouse);

// DELETE /api/houses/:id -> Delete a specific house (requires authentication)
router.route('/:id').delete(protect, deleteHouse);

module.exports = router;
