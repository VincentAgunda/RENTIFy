const mongoose = require('mongoose');

const houseSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String }, // Optional field for description
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
  { timestamps: true } // Automatically adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model('House', houseSchema);
