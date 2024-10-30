// app.js
require('dotenv').config(); // Load environment variables at the very top

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');

connectDB();

const app = express();
app.use(express.json());

// Main route to confirm the server is working
app.get('/', (req, res) => {
  res.send('Welcome to the Car Rental API! Server is running.');
});

// Authentication routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));