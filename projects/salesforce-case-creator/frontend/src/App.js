import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    serialNumber: '',
    contactInfo: '',
    severity: '3',
    serviceDeliveryMethod: 'IBM onsite repair',
    machineSerialNumber: '',
    serviceType: 'Defect/BreakFix',
    machineType: 'SERV',
    machineModel: '001',
    country: 'Brazil',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    account: 'PROXXI TECNOLOGIA LTDA',
    subject: 'Atendimento Proxxi',
    description: '',
    clientReference: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.serialNumber.trim()) {
      newErrors.serialNumber = 'Serial number is required';
    }
    if (!formData.contactInfo.trim()) {
      newErrors.contactInfo = 'Contact information is required';
    }
    if (!formData.machineSerialNumber.trim()) {
      newErrors.machineSerialNumber = 'Machine serial number is required';
    }
    if (!formData.street.trim()) {
      newErrors.street = 'Street is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State/Province is required';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal code is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous alert
    setAlert(null);

    // Validate form
    if (!validateForm()) {
      setAlert({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fill in all required fields'
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('/api/cases', formData);

      if (response.data.success) {
        setAlert({
          type: 'success',
          title: 'Case Created Successfully!',
          message: `Case Number: ${response.data.caseNumber}`,
          caseNumber: response.data.caseNumber
        });

        // Reset form after successful submission
        setFormData({
          serialNumber: '',
          contactInfo: '',
          severity: '3',
          serviceDeliveryMethod: 'IBM onsite repair',
          machineSerialNumber: '',
          serviceType: 'Defect/BreakFix',
          machineType: 'SERV',
          machineModel: '001',
          country: 'Brazil',
          street: '',
          city: '',
          state: '',
          postalCode: '',
          account: 'PROXXI TECNOLOGIA LTDA',
          subject: 'Atendimento Proxxi',
          description: '',
          clientReference: ''
        });
      }
    } catch (error) {
      console.error('Error creating case:', error);
      
      let errorMessage = 'Failed to create case. Please try again.';
      
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.errors) {
        errorMessage = error.response.data.errors.map(e => e.message).join(', ');
      } else if (error.message) {
        errorMessage = error.message;
      }

      setAlert({
        type: 'error',
        title: 'Error Creating Case',
        message: errorMessage
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      serialNumber: '',
      contactInfo: '',
      severity: '3',
      serviceDeliveryMethod: 'IBM onsite repair',
      machineSerialNumber: '',
      serviceType: 'Defect/BreakFix',
      machineType: 'SERV',
      machineModel: '001',
      country: 'Brazil',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      account: 'PROXXI TECNOLOGIA LTDA',
      subject: 'Atendimento Proxxi',
      description: '',
      clientReference: ''
    });
    setErrors({});
    setAlert(null);
  };

  return (
    <div className="app">
      <div className="header">
        <h1>Salesforce Case Creator</h1>
        <p>Create cases automatically in Salesforce</p>
        <a 
          href="https://ibmsf.lightning.force.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="salesforce-link"
        >
          Open Salesforce Instance →
        </a>
      </div>

      <div className="card">
        {alert && (
          <div className={`alert alert-${alert.type}`}>
            <span className="alert-icon">
              {alert.type === 'success' ? '✓' : '✗'}
            </span>
            <div className="alert-content">
              <div className="alert-title">{alert.title}</div>
              <div className="alert-message">
                {alert.message}
                {alert.caseNumber && (
                  <span className="case-number"> {alert.caseNumber}</span>
                )}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Serial Number */}
            <div className="form-group">
              <label>
                Serial Number or Product or Client Asset ID
                <span className="required">*</span>
              </label>
              <input
                type="text"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                className={errors.serialNumber ? 'error' : ''}
                placeholder="Enter serial number"
              />
              {errors.serialNumber && (
                <span className="error-message">{errors.serialNumber}</span>
              )}
            </div>

            {/* Contact */}
            <div className="form-group">
              <label>
                Contact (Name, Email, or Phone)
                <span className="required">*</span>
              </label>
              <input
                type="text"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                className={errors.contactInfo ? 'error' : ''}
                placeholder="Enter contact name, email, or phone"
              />
              {errors.contactInfo && (
                <span className="error-message">{errors.contactInfo}</span>
              )}
            </div>

            {/* Case Severity */}
            <div className="form-group">
              <label>
                Case Severity
                <span className="required">*</span>
              </label>
              <select
                name="severity"
                value={formData.severity}
                onChange={handleChange}
              >
                <option value="1">1 - Critical</option>
                <option value="2">2 - High</option>
                <option value="3">3 - Medium</option>
                <option value="4">4 - Low</option>
              </select>
            </div>

            {/* Service Delivery Method */}
            <div className="form-group">
              <label>Requested Service Delivery Method</label>
              <input
                type="text"
                name="serviceDeliveryMethod"
                value={formData.serviceDeliveryMethod}
                onChange={handleChange}
                readOnly
              />
            </div>

            {/* Machine Serial Number */}
            <div className="form-group">
              <label>
                Machine Serial Number or Client Asset ID
                <span className="required">*</span>
              </label>
              <input
                type="text"
                name="machineSerialNumber"
                value={formData.machineSerialNumber}
                onChange={handleChange}
                className={errors.machineSerialNumber ? 'error' : ''}
                placeholder="Enter machine serial number"
              />
              {errors.machineSerialNumber && (
                <span className="error-message">{errors.machineSerialNumber}</span>
              )}
            </div>

            {/* Service Type */}
            <div className="form-group">
              <label>Service Type</label>
              <input
                type="text"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                readOnly
              />
            </div>

            {/* Machine Type */}
            <div className="form-group">
              <label>Machine Type</label>
              <input
                type="text"
                name="machineType"
                value={formData.machineType}
                onChange={handleChange}
                readOnly
              />
            </div>

            {/* Machine Model */}
            <div className="form-group">
              <label>Machine Model</label>
              <input
                type="text"
                name="machineModel"
                value={formData.machineModel}
                onChange={handleChange}
                readOnly
              />
            </div>

            {/* Country */}
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                readOnly
              />
            </div>

            {/* Street */}
            <div className="form-group">
              <label>
                Street
                <span className="required">*</span>
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                className={errors.street ? 'error' : ''}
                placeholder="Enter street address"
              />
              {errors.street && (
                <span className="error-message">{errors.street}</span>
              )}
            </div>

            {/* City */}
            <div className="form-group">
              <label>
                City
                <span className="required">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? 'error' : ''}
                placeholder="Enter city"
              />
              {errors.city && (
                <span className="error-message">{errors.city}</span>
              )}
            </div>

            {/* State/Province */}
            <div className="form-group">
              <label>
                Province/State
                <span className="required">*</span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? 'error' : ''}
                placeholder="Enter state or province"
              />
              {errors.state && (
                <span className="error-message">{errors.state}</span>
              )}
            </div>

            {/* Postal Code */}
            <div className="form-group">
              <label>
                Postal Code
                <span className="required">*</span>
              </label>
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className={errors.postalCode ? 'error' : ''}
                placeholder="Enter postal code"
              />
              {errors.postalCode && (
                <span className="error-message">{errors.postalCode}</span>
              )}
            </div>

            {/* Account */}
            <div className="form-group">
              <label>Account</label>
              <input
                type="text"
                name="account"
                value={formData.account}
                onChange={handleChange}
                readOnly
              />
            </div>

            {/* Subject */}
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                readOnly
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label>
                Description
                <span className="required">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={errors.description ? 'error' : ''}
                placeholder="Enter case description"
              />
              {errors.description && (
                <span className="error-message">{errors.description}</span>
              )}
            </div>

            {/* Client Reference Number */}
            <div className="form-group">
              <label>Client Reference Number</label>
              <input
                type="text"
                name="clientReference"
                value={formData.clientReference}
                onChange={handleChange}
                placeholder="Enter client reference (optional)"
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <span className="loading">
                  <span className="spinner"></span>
                  Creating Case...
                </span>
              ) : (
                'Create Case'
              )}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
              disabled={loading}
            >
              Reset Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;

// Made with Bob
