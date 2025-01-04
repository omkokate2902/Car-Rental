const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true }, // S3 URL of the image
});

module.exports = mongoose.model('Vehicle', vehicleSchema);