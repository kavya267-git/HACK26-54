const express = require('express');
const router = express.Router();

// Simple test route
router.get('/test', (req, res) => {
  res.json({ message: 'Officers route working' });
});

// Get officers by district
router.get('/:district', (req, res) => {
  const { district } = req.params;
  
  // Mock data
  res.json({
    district: district,
    collector: {
      name: 'Test Officer',
      phone: '1234567890'
    }
  });
});

module.exports = router;