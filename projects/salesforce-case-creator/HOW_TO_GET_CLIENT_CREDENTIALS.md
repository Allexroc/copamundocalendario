# How to Get Salesforce Client ID and Client Secret

## Overview

The `SALESFORCE_CLIENT_ID` and `SALESFORCE_CLIENT_SECRET` are credentials from a **Salesforce Connected App**. These are required for OAuth authentication with the Salesforce API.

## ⚠️ Important: Admin Access Required

**You need Salesforce Administrator permissions to create a Connected App.** If you don't have admin access, you'll need to:

1. **Contact your Salesforce Administrator** and request they create a Connected App for you
2. Ask them to provide you with the Consumer Key (Client ID) and Consumer Secret (Client Secret)
3. Share this guide with them if needed

## Option 1: Create Connected App Yourself (If You Have Admin Access)

### Step-by-Step Instructions:

#### 1. Log in to Salesforce
- Go to your Salesforce instance: https://ibmsf.lightning.force.com
- Or use: https://login.salesforce.com (for production)
- Or use: https://test.salesforce.com (for sandbox)

#### 2. Navigate to Setup
- Click the **gear icon** (⚙️) in the top right corner
- Select **Setup**

#### 3. Open App Manager
- In the **Quick Find** box (left sidebar), type: `App Manager`
- Click on **App Manager** under Apps

#### 4. Create New Connected App
- Click the **New Connected App** button (top right)

#### 5. Fill in Basic Information
- **Connected App Name**: `Case Creator API` (or any name you prefer)
- **API Name**: `Case_Creator_API` (auto-generated, you can modify)
- **Contact Email**: Your email address

#### 6. Enable OAuth Settings
- Check the box: **Enable OAuth Settings** ✓
- **Callback URL**: Enter one of these:
  - `https://login.salesforce.com/services/oauth2/callback`
  - Or: `http://localhost:3001/oauth/callback` (for local development)
  - You can add multiple callback URLs separated by line breaks

#### 7. Select OAuth Scopes
Move these scopes from "Available OAuth Scopes" to "Selected OAuth Scopes":
- ✓ **Access and manage your data (api)**
- ✓ **Perform requests on your behalf at any time (refresh_token, offline_access)**
- ✓ **Full access (full)** (optional, but recommended for development)

#### 8. Save the Connected App
- Click **Save**
- Click **Continue** on the confirmation page
- **Important**: Wait 2-10 minutes for the Connected App to be fully activated

#### 9. Get Your Client ID and Client Secret

After saving, you'll see the Connected App details page:

1. Click **Manage Consumer Details** button
2. You may need to verify your identity (enter verification code sent to your email)
3. You'll see:
   - **Consumer Key** → This is your `SALESFORCE_CLIENT_ID`
   - **Consumer Secret** → This is your `SALESFORCE_CLIENT_SECRET`
4. **Copy both values** and save them securely

#### 10. Update Your .env File

```env
SALESFORCE_CLIENT_ID=3MVG9...your_consumer_key_here...
SALESFORCE_CLIENT_SECRET=1234567890ABCDEF...your_consumer_secret_here...
```

## Option 2: Request from Your Salesforce Administrator

If you **don't have admin access**, send this request to your Salesforce Administrator:

---

**Subject**: Request for Salesforce Connected App Credentials

**Message**:

Hi [Admin Name],

I need to integrate with Salesforce API for a case creation application. Could you please create a Connected App with the following specifications?

**Connected App Details:**
- **Name**: Case Creator API
- **Contact Email**: [your-email@company.com]
- **Enable OAuth Settings**: Yes
- **Callback URL**: https://login.salesforce.com/services/oauth2/callback
- **OAuth Scopes Required**:
  - Access and manage your data (api)
  - Perform requests on your behalf at any time (refresh_token, offline_access)
  - Full access (full)

**What I need from you:**
1. Consumer Key (Client ID)
2. Consumer Secret (Client Secret)

These credentials will be stored securely in environment variables and used only for API authentication.

Thank you!

---

## Option 3: Check If Connected App Already Exists

Your organization might already have a Connected App you can use:

1. Go to **Setup** → **App Manager**
2. Look for existing Connected Apps
3. If you find one that's suitable, click the dropdown → **View**
4. Click **Manage Consumer Details** to get the credentials
5. **Note**: You may need permission to view consumer details

## Verifying Your Credentials

Once you have the credentials, test them:

### 1. Update your `.env` file:
```env
SALESFORCE_LOGIN_URL=https://login.salesforce.com
SALESFORCE_CLIENT_ID=your_consumer_key_here
SALESFORCE_CLIENT_SECRET=your_consumer_secret_here
SALESFORCE_USERNAME=your.email@company.com
SALESFORCE_PASSWORD=your_password
SALESFORCE_SECURITY_TOKEN=your_security_token
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 2. Test the connection:
```bash
cd projects/salesforce-case-creator/backend
npm start
```

### 3. In another terminal, test the API:
```bash
curl http://localhost:3001/api/cases/test
```

### Expected Success Response:
```json
{
  "success": true,
  "message": "Salesforce connection successful",
  "details": {
    "username": "your-email@company.com",
    "organizationId": "00D...",
    "userId": "005..."
  }
}
```

## Common Issues

### Issue: "Invalid client credentials"
**Cause**: Wrong Client ID or Client Secret
**Solution**: 
- Double-check you copied the entire Consumer Key and Secret
- Make sure there are no extra spaces
- Verify the Connected App is activated (wait 10 minutes after creation)

### Issue: "redirect_uri_mismatch"
**Cause**: Callback URL doesn't match
**Solution**: 
- Add the correct callback URL in the Connected App settings
- Use `https://login.salesforce.com/services/oauth2/callback`

### Issue: "Can't see 'Manage Consumer Details' button"
**Cause**: Insufficient permissions
**Solution**: 
- You need "View Setup and Configuration" permission
- Contact your Salesforce Administrator

### Issue: Connected App not appearing in App Manager
**Cause**: Insufficient permissions
**Solution**: 
- You need "Customize Application" permission
- Contact your Salesforce Administrator

## Security Best Practices

1. **Never share** your Client Secret publicly
2. **Don't commit** the `.env` file to version control (it's in `.gitignore`)
3. **Rotate credentials** periodically
4. **Use different credentials** for development and production
5. **Restrict IP ranges** in the Connected App settings if possible
6. **Monitor API usage** in Salesforce Setup → API Usage

## Alternative: Use Existing Credentials

If you're working in a team, ask your colleagues if they already have Connected App credentials you can use for development. Just make sure to:
- Use them only in your local `.env` file
- Never commit them to version control
- Get permission before using them

## Need More Help?

- **Salesforce Help**: https://help.salesforce.com/s/articleView?id=sf.connected_app_create.htm
- **Trailhead Module**: https://trailhead.salesforce.com/content/learn/modules/api_basics
- **Developer Docs**: https://developer.salesforce.com/docs/atlas.en-us.api_rest.meta/api_rest/intro_oauth_and_connected_apps.htm

## Summary Checklist

- [ ] I have Salesforce Administrator access OR
- [ ] I have contacted my Salesforce Administrator
- [ ] Connected App has been created
- [ ] I have copied the Consumer Key (Client ID)
- [ ] I have copied the Consumer Secret (Client Secret)
- [ ] I have updated my `.env` file
- [ ] I have tested the connection successfully
- [ ] My credentials are stored securely

## What's Next?

After obtaining your credentials:
1. See [`INSTALLATION.md`](INSTALLATION.md) for complete setup instructions
2. See [`HOW_TO_GET_SECURITY_TOKEN.md`](HOW_TO_GET_SECURITY_TOKEN.md) for security token instructions
3. See [`QUICK_START.md`](QUICK_START.md) for a quick setup guide