const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUserId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false }, // Field for email verification status
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);