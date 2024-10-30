// controllers/authController.js
const { clientAuthInstance } = require('../services/firebaseService');
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, sendEmailVerification } = require('firebase/auth');
const User = require('../models/User');

// Register User with Email Verification
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Register user in Firebase
    const userCredential = await createUserWithEmailAndPassword(clientAuthInstance, email, password);
    
    // Send verification email
    await sendEmailVerification(userCredential.user);
    
    // Save user to MongoDB with Firebase user ID
    const newUser = new User({
      email,
      firebaseUserId: userCredential.user.uid, // Save Firebase user ID
      isVerified: false,
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully. Verification email sent.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User with Email Verification Check
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(clientAuthInstance, email, password);

    // Check if email is verified
    if (!userCredential.user.emailVerified) {
      return res.status(403).json({ message: 'Email not verified. Please verify your email.' });
    }

    // Update isVerified status in MongoDB if not already updated
    await User.findOneAndUpdate({ firebaseUserId: userCredential.user.uid }, { isVerified: true });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    await sendPasswordResetEmail(clientAuthInstance, email);
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};