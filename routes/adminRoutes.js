const express = require('express');
const { adminLogin, fetchUnapprovedVehicles, approveVehicle } = require('../controllers/adminController');
const verifyAdminToken = require('../middlewares/adminMiddleware');

const router = express.Router();

// POST /api/admin/login
router.post('/login', adminLogin);

router.get('/unapprovedVehicles', verifyAdminToken, fetchUnapprovedVehicles);

router.patch('/approveVehicle', verifyAdminToken, approveVehicle);


// Example: Protected admin-only route
router.get('/dashboard', verifyAdminToken, (req, res) => {
  res.status(200).json({ message: 'Welcome to the admin dashboard!' });
});

module.exports = router;