const express = require('express');
const router = express.Router();

// Simple GET route
router.get('/', (req, res) => {
  res.json([
    { id: 1, name: 'PM-Kisan', description: 'Farmer scheme' },
    { id: 2, name: 'Ayushman Bharat', description: 'Health scheme' }
  ]);
});

module.exports = router;