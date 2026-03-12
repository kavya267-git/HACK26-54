const express = require('express');
const router = express.Router();

// Simple GET route
router.get('/test', (req, res) => {
  res.json({ message: 'PDF route working' });
});

module.exports = router;