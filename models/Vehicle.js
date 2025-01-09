const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  carName: { type: String, required: true },
  carYear: { type: Number, required: true },
  perDayRate: { type: Number, required: true },
  transmission: { type: String, required: true },
  fuel: { type: String, required: true },
  seats: { type: Number, required: true },
  carFeatures: [{ type: String }], // Array of features
  images: [{ type: String, required: true }], // Array of S3 URLs for images
  documents: [{ type: String, required: true }], // Array of S3 URLs for documents
});

module.exports = mongoose.model('Vehicle', vehicleSchema);