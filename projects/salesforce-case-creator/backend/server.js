const express = require('express');
const cors = require('cors');
require('dotenv').config();

const casesRouter = require('./routes/cases');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/cases', casesRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Salesforce Case Creator API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /api/cases/health',
      test: 'GET /api/cases/test',
      createCase: 'POST /api/cases'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('=================================');
  console.log('Salesforce Case Creator API');
  console.log('=================================');
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log('=================================');
  console.log('Available endpoints:');
  console.log(`  GET  http://localhost:${PORT}/`);
  console.log(`  GET  http://localhost:${PORT}/api/cases/health`);
  console.log(`  GET  http://localhost:${PORT}/api/cases/test`);
  console.log(`  POST http://localhost:${PORT}/api/cases`);
  console.log('=================================');
});

module.exports = app;

// Made with Bob
