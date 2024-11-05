// controllers/profileController.js
const User = require('../models/User');

exports.getProfile = async (req, res) => {
    try {
      const user = await User.findOne({ firebaseUserId: req.user.uid });
      
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Determine which fields to return based on roles
      let responseData = {
        email: user.email,
        name: user.name,
        roles: user.roles,
      };
  
      // If user is an owner, include profile information
      if (user.roles.includes('owner')) {
        responseData.profile = user.profile;
      }
  
      res.status(200).json(responseData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.updateProfile = async (req, res) => {
    const { name, profile } = req.body;
  
    try {
      // Find the user in MongoDB
      const user = await User.findOne({ firebaseUserId: req.user.uid });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Check roles to determine what fields can be updated
      let updateData = {};
  
      if (user.roles.includes('customer') && user.roles.length === 1) {
        // Only allow name update if the user is a customer only
        updateData.name = name;
      } else if (user.roles.includes('customer') && user.roles.includes('owner')) {
        // Allow both name and profile update if the user is both customer and owner
        updateData = { name, profile };
      } else {
        return res.status(403).json({ message: 'Insufficient permissions to update profile.' });
      }
  
      // Update user in MongoDB
      const updatedUser = await User.findOneAndUpdate(
        { firebaseUserId: req.user.uid },
        updateData,
        { new: true }
      );
  
      res.status(200).json("Profile Upated for user "+ user.roles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Add Owner Role API
exports.addOwnerRole = async (req, res) => {
    try {
      const user = await User.findOne({ firebaseUserId: req.user.uid });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Check if user already has the 'owner' role
      if (user.roles.includes('owner')) {
        return res.status(400).json({ message: 'User already has the owner role' });
      }
  
      // Add 'owner' role to the user's roles array
      user.roles.push('owner');
      await user.save();
  
      res.status(200).json({ message: 'Owner role added successfully', roles: user.roles });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // Remove Owner Role API
  exports.removeOwnerRole = async (req, res) => {
    try {
      const user = await User.findOne({ firebaseUserId: req.user.uid });
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Check if user has the 'owner' role
      if (!user.roles.includes('owner')) {
        return res.status(400).json({ message: 'User does not have the owner role' });
      }
  
      // Remove 'owner' role from the user's roles array
      user.roles = user.roles.filter(role => role !== 'owner');
      await user.save();
  
      res.status(200).json({ message: 'Owner role removed successfully', roles: user.roles });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };