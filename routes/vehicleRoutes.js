const express = require('express');
const vehicleUpload = require('../middlewares/multer');
const { uploadVehicleDetails, getApprovedVehicles } = require('../controllers/vehicleController');

const router = express.Router();

// POST /api/vehicles/upload
router.post('/upload', vehicleUpload, uploadVehicleDetails);

router.get('/approvedVehicles', getApprovedVehicles);

module.exports = router;