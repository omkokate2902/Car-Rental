const { clientAuthInstance } = require('../services/firebaseService');
const { signInWithEmailAndPassword } = require('firebase/auth');
const User = require('../models/User');
const Vehicle = require('../models/Vehicle');

// Admin Login Function
exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Sign in with email and password using Firebase
    const userCredential = await signInWithEmailAndPassword(clientAuthInstance, email, password);

    // Check if the user exists in the database using Firebase UID
    const user = await User.findOne({ firebaseUserId: userCredential.user.uid });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user has admin role
    if (!user.roles.includes('admin')) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    // Update isVerified status in MongoDB if not already updated
    if (!user.isVerified) {
      user.isVerified = true;
      await user.save();
    }

    // Get Firebase ID token for further use
    const token = await userCredential.user.getIdToken();

    // Send the token in response headers
    res.setHeader('Authorization', `Bearer ${token}`);
    res.status(200).json({ message: 'Admin login successful' });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Fetch all unapproved vehicles
exports.fetchUnapprovedVehicles = async (req, res) => {
  try {
    const unapprovedVehicles = await Vehicle.find({ approved: false });

    if (!unapprovedVehicles || unapprovedVehicles.length === 0) {
      return res.status(404).json({ message: 'No unapproved vehicles found.' });
    }

    res.status(200).json({
      message: 'Unapproved vehicles retrieved successfully',
      data: unapprovedVehicles,
    });
  } catch (error) {
    console.error('Error fetching unapproved vehicles:', error);
    res.status(500).json({
      message: 'Error fetching unapproved vehicles',
      error: error.message,
    });
  }
};

// Approve a vehicle
exports.approveVehicle = async (req, res) => {
    const { vehicleId } = req.body; // Get vehicleId from the request body
  
    try {
      const vehicle = await Vehicle.findById(vehicleId);
  
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  
      // Approve the vehicle
      vehicle.approved = true;
      await vehicle.save();
  
      res.status(200).json({
        message: 'Vehicle approved successfully',
        data: vehicle,
      });
    } catch (error) {
      console.error('Error approving vehicle:', error);
      res.status(500).json({
        message: 'Error approving vehicle',
        error: error.message,
      });
    }
  };