// routes/authRoutes.js
const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/admin/login', authController.adminLogin); // New admin login route
router.post('/forgot-password', authController.forgotPassword);

module.exports = router;