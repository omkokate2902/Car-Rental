// /middlewares/adminMiddleware.js

const jwt = require('jsonwebtoken'); // Import the jsonwebtoken package
const User = require('../models/User'); // Import the User model

const adminMiddleware = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from "Bearer token"

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Decode the token to extract user ID (no verification)
    const decodedToken = jwt.decode(token);

    if (!decodedToken) {
      return res.status(400).json({ message: 'Invalid token format.' });
    }

    // Extract user ID from decoded token
    const userId = decodedToken.user_id;

    // Find the user in MongoDB by Firebase user ID
    const user = await User.findOne({ firebaseUserId: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has the 'admin' role
    if (!user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Attach the user object to the request for further use in routes
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error decoding token or finding user:', error);
    res.status(500).json({ message: 'Server error. Token decoding or user lookup failed.' });
  }
};

module.exports = adminMiddleware;