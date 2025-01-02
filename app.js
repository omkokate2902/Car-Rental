// app.js
require('dotenv').config(); // Load environment variables at the very top

const express = require('express');
const cors = require('cors'); // Require the cors package
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes'); // Import the profile routes
const cookieParser = require('cookie-parser'); // Import cookie-parser

connectDB();

const app = express();

app.use(cookieParser()); // Make sure this is before the routes


// Configure CORS to expose the Authorization header
app.use(cors({
  origin: '*', // Or replace with specific frontend URL
  exposedHeaders: ['Authorization'], // Expose the Authorization header
}));

app.use(express.json());

// Main route to confirm the server is working
app.get('/', (req, res) => {
  res.send('Welcome to the Car Rental API! Server is running.');
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Profile routes
app.use('/api/profile', profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));