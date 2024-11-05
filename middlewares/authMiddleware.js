// middlewares/authMiddleware.js
const { clientAuthInstance } = require('../services/firebaseService');
const admin = require('firebase-admin'); // Firebase Admin SDK

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied, no token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <TOKEN>"

    // Verify the token with Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach decoded token payload to req.user

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;