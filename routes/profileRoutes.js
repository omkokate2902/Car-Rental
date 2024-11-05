// routes/profileRoutes.js
const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware'); // Ensure this path is correct
const profileController = require('../controllers/profileController');

const router = express.Router();

// Protect the profile routes with authentication middleware
router.get('/', authMiddleware, profileController.getProfile);
router.put('/', authMiddleware, profileController.updateProfile);
router.post('/addOwner', authMiddleware, profileController.addOwnerRole);
router.post('/removeOwner', authMiddleware, profileController.removeOwnerRole);

module.exports = router;