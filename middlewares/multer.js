const multer = require('multer');

// Configure multer for in-memory file storage
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDF documents are allowed!'), false);
    }
  },
});

// Middleware to handle multiple fields
const vehicleUpload = upload.fields([
  { name: 'images', maxCount: 5 }, // Up to 5 images
  { name: 'documents', maxCount: 3 }, // Up to 3 documents
]);

module.exports = vehicleUpload;