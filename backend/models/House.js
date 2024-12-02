const mongoose = require('mongoose');

const houseSchema = mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, 'Name is required'], // Adding custom error message
    },
    location: { 
      type: String, 
      required: [true, 'Location is required'], // Adding custom error message
    },
    price: { 
      type: Number, 
      required: [true, 'Price is required'], // Adding custom error message
      min: [0, 'Price must be a positive number'], // Ensure price is positive
    },
    description: { 
      type: String, 
      maxlength: [500, 'Description must be less than 500 characters'], // Optional with length constraint
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Links the house to the user who posted it
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'fs.files', // Refers to files stored in GridFS ('fs.files' collection)
      },
    ],
  },
  { 
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model('House', houseSchema);
