const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUserId: { type: String, required: true, unique: true }, // Firebase UID
  email: { type: String, required: true, unique: true }, // Unique email
  name: { type: String, required: true },
  phone: { type: String },
  isVerified: { type: Boolean, default: false }, // Email verification status
  roles: { 
    type: [String], 
    default: ["customer"], 
    enum: ["customer", "owner", "admin"] 
  },
  profile: {
    address: { type: String },
    photo_url: { type: String },
    bio: { type: String },
    rating: { type: Number } // Only for owners
  },
  booking_history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }], // For customers
  car_listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }], // For owners
}, { timestamps: true }); // Automatic createdAt and updatedAt

const User = mongoose.model('User', userSchema);
module.exports = User;