const express = require('express');
const { body, validationResult } = require('express-validator');
const salesforceService = require('../config/salesforce');

const router = express.Router();

/**
 * Validation rules for case creation
 */
const caseValidationRules = [
  body('serialNumber').notEmpty().withMessage('Serial number is required'),
  body('contactInfo').notEmpty().withMessage('Contact information is required'),
  body('severity').isIn(['1', '2', '3', '4']).withMessage('Severity must be 1, 2, 3, or 4'),
  body('serviceDeliveryMethod').notEmpty().withMessage('Service delivery method is required'),
  body('machineSerialNumber').notEmpty().withMessage('Machine serial number is required'),
  body('serviceType').notEmpty().withMessage('Service type is required'),
  body('machineType').notEmpty().withMessage('Machine type is required'),
  body('machineModel').notEmpty().withMessage('Machine model is required'),
  body('country').notEmpty().withMessage('Country is required'),
  body('street').notEmpty().withMessage('Street is required'),
  body('city').notEmpty().withMessage('City is required'),
  body('state').notEmpty().withMessage('State/Province is required'),
  body('postalCode').notEmpty().withMessage('Postal code is required'),
  body('account').notEmpty().withMessage('Account is required'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('clientReference').optional()
];

/**
 * POST /api/cases
 * Create a new Case in Salesforce
 */
router.post('/', caseValidationRules, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
          field: err.path,
          message: err.msg
        }))
      });
    }

    // Extract case data from request body
    const caseData = {
      serialNumber: req.body.serialNumber,
      contactInfo: req.body.contactInfo,
      severity: req.body.severity,
      serviceDeliveryMethod: req.body.serviceDeliveryMethod,
      machineSerialNumber: req.body.machineSerialNumber,
      serviceType: req.body.serviceType,
      machineType: req.body.machineType,
      machineModel: req.body.machineModel,
      country: req.body.country,
      street: req.body.street,
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode,
      account: req.body.account,
      subject: req.body.subject,
      description: req.body.description,
      clientReference: req.body.clientReference || ''
    };

    console.log('Creating case with data:', {
      ...caseData,
      description: caseData.description.substring(0, 50) + '...'
    });

    // Create case in Salesforce
    const result = await salesforceService.createCase(caseData);

    // Return success response
    res.status(201).json({
      success: true,
      caseId: result.caseId,
      caseNumber: result.caseNumber,
      message: `Case ${result.caseNumber} created successfully`
    });

  } catch (error) {
    console.error('Error creating case:', error);
    
    // Return error response
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to create case',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

/**
 * GET /api/cases/test
 * Test Salesforce connection
 */
router.get('/test', async (req, res) => {
  try {
    const result = await salesforceService.testConnection();
    
    if (result.success) {
      res.json({
        success: true,
        message: 'Salesforce connection successful',
        details: {
          username: result.username,
          organizationId: result.organizationId,
          userId: result.userId
        }
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Salesforce connection failed',
        error: result.error
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error testing connection',
      error: error.message
    });
  }
});

/**
 * GET /api/cases/health
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

module.exports = router;

// Made with Bob
