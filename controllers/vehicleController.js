// vehicleController.js
const { uploadFileToS3 } = require('../config/s3');
const Vehicle = require('../models/Vehicle');

const uploadVehicleImage = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No image uploaded!' });
    }

    // Upload image to S3
    const fileUrl = await uploadFileToS3(file.buffer, file.originalname, file.mimetype);

    // Save URL to MongoDB
    const vehicle = new Vehicle({ imageUrl: fileUrl });
    await vehicle.save();

    res.status(201).json({ message: 'Image uploaded successfully!', data: vehicle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
};

module.exports = { uploadVehicleImage };