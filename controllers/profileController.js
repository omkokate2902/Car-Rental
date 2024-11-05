// controllers/profileController.js
const User = require('../models/User');

exports.getProfile = async (req, res) => {
    try {
      const user = await User.findOne({ firebaseUserId: req.user.uid }).select('email name roles');
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.updateProfile = async (req, res) => {
  const { name, profile } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { firebaseUserId: req.user.uid },
      { name, profile }, // Only allow name and profile fields to be updated
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};