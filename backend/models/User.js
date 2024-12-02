const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'], // Custom error message
    },
    email: {
      type: String,
      required: [true, 'Email is required'], // Custom error message
      unique: true,
      match: [/\S+@\S+\.\S+/, 'Email is not valid'], // Email format validation
    },
    password: {
      type: String,
      required: [true, 'Password is required'], // Custom error message
      minlength: [6, 'Password must be at least 6 characters long'], // Password length validation
    },
    role: {
      type: String,
      required: [true, 'Role is required'], // Custom error message
      enum: {
        values: ['client', 'landlord'],
        message: 'Role must be either "client" or "landlord"', // Enum validation with custom message
      },
      default: 'client', // Default role is 'client'
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model('User', userSchema);
