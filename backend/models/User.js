const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ['client', 'landlord'], // Define roles as 'client' or 'landlord'
      default: 'client', // Default role is 'client'
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
