const express = require('express');
const router = express.Router();

router.post('/recognize', (req, res) => {
  res.json({ text: 'Test voice recognition' });
});

module.exports = router;