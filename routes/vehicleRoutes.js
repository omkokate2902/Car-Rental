const express = require('express');
const vehicleUpload = require('../middlewares/multer');
const { uploadVehicleDetails } = require('../controllers/vehicleController');

const router = express.Router();

// POST /api/vehicles/upload
router.post('/upload', vehicleUpload, uploadVehicleDetails);

module.exports = router;