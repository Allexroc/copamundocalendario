# How to Get Your Salesforce Security Token

## What is a Security Token?

A Salesforce Security Token is an automatically generated key that you must append to your password when logging in to Salesforce from an untrusted network (like API integrations). It's a security feature that helps protect your account.

## Method 1: Reset Your Security Token (Recommended)

### Step-by-Step Instructions:

1. **Log in to Salesforce**
   - Go to your Salesforce instance (e.g., https://login.salesforce.com)
   - Use your username and password

2. **Navigate to Personal Settings**
   - Click on your **profile icon** (top right corner)
   - Select **Settings** from the dropdown menu

3. **Access Security Token Settings**
   - In the left sidebar, under **Personal Setup**, find **My Personal Information**
   - Click on **Reset My Security Token**

4. **Reset the Token**
   - Click the **Reset Security Token** button
   - Salesforce will send your new security token to your registered email address

5. **Check Your Email**
   - Open the email from Salesforce (subject: "Your new Salesforce security token")
   - Copy the security token from the email
   - **Important**: Save this token securely - you'll need it for the `.env` file

## Method 2: If You Can't Find the Reset Option

If you don't see the "Reset My Security Token" option, it might be because:

### Option A: Your IP is Trusted
If your organization has added your IP address to the trusted IP ranges, you might not need a security token at all.

**To check:**
1. Try leaving `SALESFORCE_SECURITY_TOKEN` empty in your `.env` file
2. Use only your password (without appending the token)

### Option B: Use OAuth 2.0 (Alternative Method)

Instead of using username/password/token authentication, you can use OAuth 2.0 with a Connected App:

1. **Create a Connected App** (if not already done):
   - Setup → App Manager → New Connected App
   - Enable OAuth Settings
   - Add required OAuth scopes
   - Get your Client ID and Client Secret

2. **Update your configuration** to use OAuth flow instead

## Method 3: Contact Your Salesforce Administrator

If you still can't access the security token:

1. **Contact your Salesforce Administrator**
   - They can reset your security token for you
   - They can check if your profile has the necessary permissions
   - They can verify if IP restrictions are in place

2. **Required Permission**
   - Your user profile needs the "API Enabled" permission
   - Ask your admin to verify this setting

## Using the Security Token

Once you have your security token:

1. **Create your `.env` file**:
   ```bash
   cp backend/.env.example backend/.env
   ```

2. **Edit the `.env` file** and add your credentials:
   ```env
   SALESFORCE_USERNAME=your.email@company.com
   SALESFORCE_PASSWORD=YourPassword
   SALESFORCE_SECURITY_TOKEN=YourSecurityTokenHere
   ```

3. **Important**: When using the password in API calls, you typically need to append the security token to your password:
   - If your password is: `MyPassword123`
   - And your token is: `AbCdEfGhIjKlMnOp`
   - The combined password would be: `MyPassword123AbCdEfGhIjKlMnOp`

   **Note**: The code in this project handles this automatically - you just need to provide them separately in the `.env` file.

## Troubleshooting

### "Invalid username, password, security token" Error

1. **Verify your credentials**:
   - Username is correct (usually your email)
   - Password is correct
   - Security token is the latest one (old tokens become invalid after reset)

2. **Check for extra spaces**:
   - Make sure there are no spaces before or after your credentials in the `.env` file

3. **Verify API Access**:
   - Your user must have "API Enabled" permission
   - Check with your Salesforce administrator

### Security Token Not Received via Email

1. **Check spam/junk folder**
2. **Verify your email address** in Salesforce settings
3. **Wait a few minutes** - sometimes there's a delay
4. **Try resetting again** - you can reset multiple times

### "Reset My Security Token" Option Not Visible

This usually means:
- Your IP is in the trusted IP range (token not required)
- Your profile doesn't have API access
- Your organization uses SSO (Single Sign-On)

**Solution**: Contact your Salesforce administrator

## Security Best Practices

1. **Never share your security token** with others
2. **Don't commit the `.env` file** to version control (it's in `.gitignore`)
3. **Reset your token** if you suspect it's been compromised
4. **Store tokens securely** - use environment variables or secure vaults in production

## Alternative: Using OAuth 2.0 JWT Flow

For production environments, consider using OAuth 2.0 JWT Bearer Flow instead of username/password/token:

**Benefits**:
- More secure
- No need for security tokens
- Better for automated processes
- Supports certificate-based authentication

**Setup** (requires Salesforce administrator):
1. Create a Connected App with JWT Bearer Flow
2. Generate a certificate
3. Configure the Connected App with the certificate
4. Use the JWT flow in your application

## Need More Help?

- **Salesforce Help**: https://help.salesforce.com/
- **Trailhead**: https://trailhead.salesforce.com/
- **Developer Documentation**: https://developer.salesforce.com/docs

## Quick Reference

```env
# Your .env file should look like this:
SALESFORCE_LOGIN_URL=https://login.salesforce.com
SALESFORCE_CLIENT_ID=your_connected_app_client_id
SALESFORCE_CLIENT_SECRET=your_connected_app_client_secret
SALESFORCE_USERNAME=your.email@company.com
SALESFORCE_PASSWORD=YourActualPassword
SALESFORCE_SECURITY_TOKEN=YourSecurityToken
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Remember**: The security token is separate from your password. Don't include it in the password field - put it in the `SALESFORCE_SECURITY_TOKEN` field.