# Quick Start Guide

Get the Salesforce Case Creator running in 5 minutes!

## Prerequisites

- Node.js installed
- Salesforce credentials ready

## Step 1: Backend Setup (2 minutes)

```bash
# Navigate to backend
cd projects/salesforce-case-creator/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `.env` with your Salesforce credentials:
```env
SALESFORCE_LOGIN_URL=https://login.salesforce.com
SALESFORCE_CLIENT_ID=your_consumer_key
SALESFORCE_CLIENT_SECRET=your_consumer_secret
SALESFORCE_USERNAME=your_email@example.com
SALESFORCE_PASSWORD=your_password
SALESFORCE_SECURITY_TOKEN=your_token
PORT=3001
```

```bash
# Start backend
npm start
```

## Step 2: Frontend Setup (2 minutes)

Open a new terminal:

```bash
# Navigate to frontend
cd projects/salesforce-case-creator/frontend

# Install dependencies
npm install

# Start frontend
npm start
```

## Step 3: Test (1 minute)

1. Open http://localhost:3000
2. Fill in the form with test data
3. Click "Create Case"
4. Check Salesforce for the new case!

## Need Help?

See [`INSTALLATION.md`](INSTALLATION.md) for detailed setup instructions including:
- How to create a Salesforce Connected App
- How to get your Security Token
- How to create custom fields
- Troubleshooting common issues

## API Endpoints

- Health Check: `GET http://localhost:3001/api/cases/health`
- Test Connection: `GET http://localhost:3001/api/cases/test`
- Create Case: `POST http://localhost:3001/api/cases`

## Default Values

The form includes these pre-filled values:
- Service Delivery Method: IBM onsite repair
- Service Type: Defect/BreakFix
- Machine Type: SERV
- Machine Model: 001
- Country: Brazil
- Account: PROXXI TECNOLOGIA LTDA
- Subject: Atendimento Proxxi

You can modify these in [`frontend/src/App.js`](frontend/src/App.js:6-23).