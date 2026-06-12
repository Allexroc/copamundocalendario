# Installation Guide - Salesforce Case Creator

Complete step-by-step guide to set up and run the Salesforce Case Creator application.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Salesforce account with admin access
- Git (optional)

## Part 1: Salesforce Setup

### 1.1 Create a Connected App

1. Log in to your Salesforce instance: https://ibmsf.lightning.force.com
2. Navigate to **Setup** (gear icon in top right)
3. In Quick Find, search for **App Manager**
4. Click **New Connected App**
5. Fill in the following details:
   - **Connected App Name**: Case Creator API
   - **API Name**: Case_Creator_API
   - **Contact Email**: your-email@example.com
   - **Enable OAuth Settings**: ✓ Check this box
   - **Callback URL**: `https://login.salesforce.com/services/oauth2/callback`
   - **Selected OAuth Scopes**: Add these scopes:
     - Full access (full)
     - Perform requests on your behalf at any time (refresh_token, offline_access)
     - Access and manage your data (api)
6. Click **Save**
7. Click **Continue**
8. Wait 2-10 minutes for the Connected App to be activated

### 1.2 Get Consumer Key and Secret

1. Go back to **App Manager**
2. Find your **Case Creator API** app
3. Click the dropdown arrow → **View**
4. Click **Manage Consumer Details**
5. Verify your identity (you may need to enter a verification code)
6. Copy the **Consumer Key** (this is your CLIENT_ID)
7. Copy the **Consumer Secret** (this is your CLIENT_SECRET)
8. **Save these values** - you'll need them for the `.env` file

### 1.3 Get Security Token

1. Click on your profile icon (top right)
2. Select **Settings**
3. In Quick Find, search for **Reset My Security Token**
4. Click **Reset Security Token**
5. Check your email for the new security token
6. **Save this token** - you'll need it for the `.env` file

### 1.4 Verify Custom Fields (Important!)

The application uses custom fields on the Case object. You need to verify these exist or create them:

1. Go to **Setup** → **Object Manager** → **Case**
2. Click **Fields & Relationships**
3. Verify or create these custom fields:

| Field Label | API Name | Type |
|-------------|----------|------|
| Asset Serial Number | Asset_Serial_Number__c | Text(255) |
| Service Delivery Method | Service_Delivery_Method__c | Text(255) |
| Machine Serial Number | Machine_Serial_Number__c | Text(255) |
| Service Type | Service_Type__c | Text(255) |
| Machine Type | Machine_Type__c | Text(255) |
| Machine Model | Machine_Model__c | Text(255) |
| Country | Country__c | Text(255) |
| Street | Street__c | Text(255) |
| City | City__c | Text(255) |
| State | State__c | Text(255) |
| Postal Code | Postal_Code__c | Text(255) |
| Client Reference Number | Client_Reference_Number__c | Text(255) |

**Note**: If these fields don't exist, you'll need to create them or modify the field API names in [`backend/config/salesforce.js`](backend/config/salesforce.js:115-127) to match your existing fields.

## Part 2: Backend Setup

### 2.1 Install Backend Dependencies

```bash
cd projects/salesforce-case-creator/backend
npm install
```

### 2.2 Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit the `.env` file with your Salesforce credentials:
```env
# Salesforce Configuration
SALESFORCE_LOGIN_URL=https://login.salesforce.com
SALESFORCE_CLIENT_ID=your_consumer_key_from_step_1.2
SALESFORCE_CLIENT_SECRET=your_consumer_secret_from_step_1.2
SALESFORCE_USERNAME=your_salesforce_username
SALESFORCE_PASSWORD=your_salesforce_password
SALESFORCE_SECURITY_TOKEN=your_security_token_from_step_1.3

# Server Configuration
PORT=3001
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

**Important Notes**:
- Use your actual Salesforce username (email)
- The password should be your Salesforce password only
- The security token is appended automatically in the code
- For production, use `https://login.salesforce.com`
- For sandbox, use `https://test.salesforce.com`

### 2.3 Test Backend Connection

```bash
npm start
```

You should see:
```
=================================
Salesforce Case Creator API
=================================
Server running on port 3001
Environment: development
Frontend URL: http://localhost:3000
=================================
```

Test the Salesforce connection:
```bash
curl http://localhost:3001/api/cases/test
```

Expected response:
```json
{
  "success": true,
  "message": "Salesforce connection successful",
  "details": {
    "username": "your-email@example.com",
    "organizationId": "00D...",
    "userId": "005..."
  }
}
```

If you see an error, check:
- Your credentials in `.env`
- Your security token is correct
- Your Connected App is activated (wait 10 minutes after creation)
- Your IP is not restricted in Salesforce

## Part 3: Frontend Setup

### 3.1 Install Frontend Dependencies

Open a new terminal window:

```bash
cd projects/salesforce-case-creator/frontend
npm install
```

### 3.2 Start Frontend Development Server

```bash
npm start
```

The application will open automatically at `http://localhost:3000`

## Part 4: Testing the Application

### 4.1 Verify the Form Loads

1. Open `http://localhost:3000` in your browser
2. You should see the "Salesforce Case Creator" form
3. All fields should be visible and editable

### 4.2 Create a Test Case

1. Fill in the required fields:
   - **Serial Number**: TEST-12345
   - **Contact**: Use an existing contact's email from your Salesforce
   - **Case Severity**: Select any severity
   - **Machine Serial Number**: MACHINE-12345
   - **Street**: 123 Test Street
   - **City**: São Paulo
   - **State**: SP
   - **Postal Code**: 01234-567
   - **Description**: This is a test case

2. Click **Create Case**

3. You should see a success message with the Case Number

4. Verify in Salesforce:
   - Go to https://ibmsf.lightning.force.com
   - Navigate to **Cases**
   - Find your newly created case
   - Verify all fields are populated correctly

### 4.3 Common Issues and Solutions

#### Issue: "Contact not found"
**Solution**: Make sure you're using an existing contact's email, name, or phone from your Salesforce instance.

#### Issue: "Account not found: PROXXI TECNOLOGIA LTDA"
**Solution**: Either create this account in Salesforce or change the account name in the form to match an existing account.

#### Issue: "Authentication failed"
**Solution**: 
- Verify your credentials in `.env`
- Reset your security token
- Wait 10 minutes after creating the Connected App
- Check if your IP is whitelisted in Salesforce

#### Issue: "Field does not exist"
**Solution**: The custom fields need to be created in Salesforce (see Part 1.4) or update the field API names in the code.

## Part 5: Production Deployment

### 5.1 Backend Deployment

1. Set environment variables on your hosting platform
2. Change `NODE_ENV=production`
3. Update `FRONTEND_URL` to your production frontend URL
4. Deploy the backend folder

### 5.2 Frontend Deployment

1. Update the API endpoint in [`frontend/package.json`](frontend/package.json:36) if needed
2. Build the production version:
```bash
cd frontend
npm run build
```
3. Deploy the `build` folder to your hosting platform

### 5.3 Security Recommendations

- Never commit `.env` files to version control
- Use environment variables for all sensitive data
- Enable HTTPS in production
- Implement rate limiting on the API
- Add authentication/authorization if needed
- Restrict CORS to your frontend domain only

## Support

If you encounter issues:

1. Check the backend console for error messages
2. Check the browser console for frontend errors
3. Verify all Salesforce credentials are correct
4. Ensure custom fields exist in Salesforce
5. Test the `/api/cases/test` endpoint

## Next Steps

- Customize the form fields as needed
- Add additional validation rules
- Implement user authentication
- Add case status tracking
- Create email notifications
- Add file upload functionality