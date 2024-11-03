const { adminAuth } = require('../services/firebaseService'); // Ensure this points to your Firebase admin setup

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided.' });
    }

    try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        req.user = { uid: decodedToken.uid }; // Store user ID for later use
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports = authMiddleware;