const jsforce = require('jsforce');
require('dotenv').config();

class SalesforceService {
  constructor() {
    this.conn = null;
    this.isAuthenticated = false;
  }

  /**
   * Authenticate with Salesforce using OAuth 2.0 Username-Password flow
   */
  async authenticate() {
    try {
      // Create connection
      this.conn = new jsforce.Connection({
        loginUrl: process.env.SALESFORCE_LOGIN_URL || 'https://login.salesforce.com'
      });

      // Login with username, password, and security token
      const userInfo = await this.conn.login(
        process.env.SALESFORCE_USERNAME,
        process.env.SALESFORCE_PASSWORD + process.env.SALESFORCE_SECURITY_TOKEN
      );

      this.isAuthenticated = true;
      console.log('✓ Salesforce authentication successful');
      console.log('User ID:', userInfo.id);
      console.log('Org ID:', userInfo.organizationId);

      return {
        success: true,
        userId: userInfo.id,
        orgId: userInfo.organizationId
      };
    } catch (error) {
      this.isAuthenticated = false;
      console.error('✗ Salesforce authentication failed:', error.message);
      throw new Error(`Salesforce authentication failed: ${error.message}`);
    }
  }

  /**
   * Ensure connection is authenticated
   */
  async ensureAuthenticated() {
    if (!this.isAuthenticated || !this.conn) {
      await this.authenticate();
    }
    return this.conn;
  }

  /**
   * Find Contact by Name, Email, or Phone
   */
  async findContact(contactInfo) {
    const conn = await this.ensureAuthenticated();

    try {
      // Try to find by email first (most reliable)
      if (contactInfo.includes('@')) {
        const result = await conn.sobject('Contact').find({ Email: contactInfo }).limit(1);
        if (result.length > 0) return result[0].Id;
      }

      // Try to find by phone
      if (/^\+?[\d\s\-()]+$/.test(contactInfo)) {
        const cleanPhone = contactInfo.replace(/[\s\-()]/g, '');
        const result = await conn.sobject('Contact').find({ Phone: { $like: `%${cleanPhone}%` } }).limit(1);
        if (result.length > 0) return result[0].Id;
      }

      // Try to find by name
      const result = await conn.sobject('Contact').find({ Name: { $like: `%${contactInfo}%` } }).limit(1);
      if (result.length > 0) return result[0].Id;

      throw new Error(`Contact not found: ${contactInfo}`);
    } catch (error) {
      throw new Error(`Error finding contact: ${error.message}`);
    }
  }

  /**
   * Find Account by Name
   */
  async findAccount(accountName) {
    const conn = await this.ensureAuthenticated();

    try {
      const result = await conn.sobject('Account').find({ Name: accountName }).limit(1);
      
      if (result.length === 0) {
        throw new Error(`Account not found: ${accountName}`);
      }

      return result[0].Id;
    } catch (error) {
      throw new Error(`Error finding account: ${error.message}`);
    }
  }

  /**
   * Create a Case in Salesforce
   */
  async createCase(caseData) {
    const conn = await this.ensureAuthenticated();

    try {
      // Find Contact ID
      const contactId = await this.findContact(caseData.contactInfo);

      // Find Account ID
      const accountId = await this.findAccount(caseData.account);

      // Prepare Case object
      const caseObject = {
        // Required fields from form
        Subject: caseData.subject,
        Description: caseData.description,
        ContactId: contactId,
        AccountId: accountId,
        
        // Severity mapping (1=Critical, 2=High, 3=Medium, 4=Low)
        Priority: this.mapSeverityToPriority(caseData.severity),
        
        // Auto-fill fields
        Origin: 'Web',
        Status: 'New',
        
        // Custom fields (adjust field API names as needed)
        Asset_Serial_Number__c: caseData.serialNumber,
        Service_Delivery_Method__c: caseData.serviceDeliveryMethod,
        Machine_Serial_Number__c: caseData.machineSerialNumber,
        Service_Type__c: caseData.serviceType,
        Machine_Type__c: caseData.machineType,
        Machine_Model__c: caseData.machineModel,
        Country__c: caseData.country,
        Street__c: caseData.street,
        City__c: caseData.city,
        State__c: caseData.state,
        Postal_Code__c: caseData.postalCode,
        Client_Reference_Number__c: caseData.clientReference
      };

      // Create the Case
      const result = await conn.sobject('Case').create(caseObject);

      if (!result.success) {
        throw new Error('Failed to create case in Salesforce');
      }

      // Retrieve the created Case to get the Case Number
      const createdCase = await conn.sobject('Case').retrieve(result.id);

      console.log('✓ Case created successfully:', createdCase.CaseNumber);

      return {
        success: true,
        caseId: result.id,
        caseNumber: createdCase.CaseNumber,
        message: 'Case created successfully'
      };
    } catch (error) {
      console.error('✗ Error creating case:', error.message);
      throw new Error(`Failed to create case: ${error.message}`);
    }
  }

  /**
   * Map severity to Salesforce Priority
   */
  mapSeverityToPriority(severity) {
    const severityMap = {
      '1': 'Critical',
      '2': 'High',
      '3': 'Medium',
      '4': 'Low'
    };
    return severityMap[severity] || 'Medium';
  }

  /**
   * Test connection
   */
  async testConnection() {
    try {
      await this.authenticate();
      const conn = await this.ensureAuthenticated();
      const identity = await conn.identity();
      
      return {
        success: true,
        username: identity.username,
        organizationId: identity.organization_id,
        userId: identity.user_id
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Export singleton instance
module.exports = new SalesforceService();

// Made with Bob
