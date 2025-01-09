const { uploadFileToS3 } = require('../config/s3');
const Vehicle = require('../models/Vehicle');

const uploadVehicleDetails = async (req, res) => {
  try {
    const { carName, carYear, perDayRate, transmission, fuel, seats, carFeatures } = req.body;

    if (!req.files || !req.files.images || !req.files.documents) {
      return res.status(400).json({ message: 'Car images and documents are required!' });
    }

    // Upload images to S3
    const imageUrls = await Promise.all(
      req.files.images.map((file) =>
        uploadFileToS3(file.buffer, file.originalname, file.mimetype)
      )
    );

    // Upload documents to S3
    const documentUrls = await Promise.all(
      req.files.documents.map((file) =>
        uploadFileToS3(file.buffer, file.originalname, file.mimetype)
      )
    );

    // Save vehicle details to MongoDB
    const vehicle = new Vehicle({
      carName,
      carYear,
      perDayRate,
      transmission,
      fuel,
      seats,
      carFeatures: carFeatures.split(','), // Split features into an array
      images: imageUrls,
      documents: documentUrls,
    });

    await vehicle.save();

    res.status(201).json({ message: 'Vehicle uploaded successfully!', data: vehicle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading vehicle details', error: error.message });
  }
};

module.exports = { uploadVehicleDetails };