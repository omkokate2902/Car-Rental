const { clientAuthInstance } = require('../services/firebaseService');
const admin = require('firebase-admin'); // Firebase Admin SDK

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Extract token from cookies

    if (!token) {
      return res.status(401).json({ message: 'Access denied, no token provided.' });
    }

    // Verify the token with Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach decoded token payload to req.user

    next(); // Proceed to the next middleware/controller
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = authMiddleware;