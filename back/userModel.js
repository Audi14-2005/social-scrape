const mongoose = require('mongoose');
const crypto = require('crypto'); // For hashing passwords

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true // Removes leading and trailing whitespace
  },
  age: {
    type: Number,
    required: false,
    min: 0 // Ensures the age is a positive number
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // Do not include the password field by default in queries
  },
  registered: {
    type: Boolean,
    required: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Hash the password before saving the user document
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Skip if the password is not modified
  try {
    
    this.password = crypto.createHash('sha256').update(this.password).digest('hex');
    next();
  } catch (err) {
    return next(err);
  }
});

// Compile and export the User model
module.exports = mongoose.model('users2', userSchema);
