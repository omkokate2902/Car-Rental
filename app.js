// app.js
require('dotenv').config(); // Load environment variables at the very top

const express = require('express');
const cors = require('cors'); // Require the cors package
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

connectDB();

const app = express();

// Use CORS middleware
app.use(cors()); // Enable all CORS requests

app.use(express.json());

// Main route to confirm the server is working
app.get('/', (req, res) => {
  res.send('Welcome to the Car Rental API! Server is running.');
});

// Authentication routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));