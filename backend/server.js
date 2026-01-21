const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for cross-origin requests
app.use(cors());

// Parse incoming JSON requests
app.use(bodyParser.json());

// Parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// Health check route to verify server status
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'M-Pesa API Server Running'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
