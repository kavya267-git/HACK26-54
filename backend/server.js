const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const schemesRoutes = require('./routes/schemes');
const pdfRoutes = require('./routes/pdf');
const voiceRoutes = require('./routes/voice');
const eligibilityRoutes = require('./routes/eligibility');
const officersRoutes = require('./routes/officers');

// Use routes
app.use('/api/schemes', schemesRoutes);
app.use('/api/pdf', pdfRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/eligibility', eligibilityRoutes);
app.use('/api/officers', officersRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: '✅ Server is running' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log('Routes loaded:');
  console.log('  - /api/schemes');
  console.log('  - /api/pdf');
  console.log('  - /api/voice');
  console.log('  - /api/eligibility');
  console.log('  - /api/officers');
});