# Salesforce Case Creator

Complete application to automatically create Cases in Salesforce.

## Features

- **Frontend Form**: User-friendly interface with all required fields
- **Backend API**: Node.js/Express server with validation
- **Salesforce Integration**: OAuth 2.0 authentication and Case creation
- **Auto-fill Fields**: Origin = "Web", Status = "New"
- **Error Handling**: Comprehensive validation and error messages

## Project Structure

```
salesforce-case-creator/
├── frontend/           # React frontend application
├── backend/            # Node.js/Express API
├── .env.example        # Environment variables template
└── README.md           # This file
```

## Required Environment Variables

Create a `.env` file in the backend directory:

```
SALESFORCE_LOGIN_URL=https://login.salesforce.com
SALESFORCE_CLIENT_ID=your_connected_app_client_id
SALESFORCE_CLIENT_SECRET=your_connected_app_client_secret
SALESFORCE_USERNAME=your_salesforce_username
SALESFORCE_PASSWORD=your_salesforce_password
SALESFORCE_SECURITY_TOKEN=your_security_token
PORT=3001
```

## Salesforce Setup

1. Create a Connected App in Salesforce:
   - Setup → App Manager → New Connected App
   - Enable OAuth Settings
   - Selected OAuth Scopes: `api`, `refresh_token`, `offline_access`
   - Callback URL: `https://login.salesforce.com/services/oauth2/callback`

2. Get your Security Token:
   - Settings → Reset My Security Token
   - Check your email for the token

## Installation

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Salesforce credentials
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

## Usage

1. Fill in all required fields in the form
2. Click "Create Case"
3. Receive confirmation with Case Number

## Field Mapping

| Form Field | Salesforce Field | Auto-fill |
|------------|------------------|-----------|
| Serial Number | Asset Serial Number | - |
| Contact | Contact lookup | - |
| Case Severity | Severity | - |
| Service Delivery Method | Service_Delivery_Method__c | - |
| Machine Serial Number | Machine_Serial_Number__c | - |
| Service Type | Service_Type__c | - |
| Machine Type | Machine_Type__c | - |
| Machine Model | Machine_Model__c | - |
| Country | Country__c | - |
| Street | Street__c | - |
| City | City__c | - |
| Province/State | State__c | - |
| Postal Code | Postal_Code__c | - |
| Account | Account lookup | - |
| Subject | Subject | - |
| Description | Description | - |
| Client Reference | Client_Reference_Number__c | - |
| - | Origin | "Web" |
| - | Status | "New" |

## API Endpoints

### POST /api/cases
Creates a new Case in Salesforce

**Request Body:**
```json
{
  "serialNumber": "string",
  "contactInfo": "string",
  "severity": "1|2|3|4",
  "serviceDeliveryMethod": "IBM onsite repair",
  "machineSerialNumber": "string",
  "serviceType": "Defect/BreakFix",
  "machineType": "SERV",
  "machineModel": "001",
  "country": "Brazil",
  "street": "string",
  "city": "string",
  "state": "string",
  "postalCode": "string",
  "account": "PROXXI TECNOLOGIA LTDA",
  "subject": "Atendimento Proxxi",
  "description": "string",
  "clientReference": "string"
}
```

**Response:**
```json
{
  "success": true,
  "caseNumber": "00001234",
  "caseId": "5001234567890ABC"
}
```

## Error Handling

- Field validation errors
- Salesforce authentication errors
- Network errors
- Case creation errors

All errors return appropriate HTTP status codes and user-friendly messages.