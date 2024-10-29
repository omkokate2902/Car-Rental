const express = require('express');
const cors = require('cors'); // Import the cors package
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Simple route to confirm the app is running
app.get('/', (req, res) => {
  res.send('Dev branch works! 🎊🎉');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});