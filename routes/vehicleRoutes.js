const express = require('express');
const upload = require('../middlewares/multer');
const { uploadVehicleImage } = require('../controllers/vehicleController');

const router = express.Router();

// POST /api/vehicles/upload
router.post('/upload', upload.single('image'), uploadVehicleImage);

module.exports = router;