# Troubleshooting Guide

## Authentication Error: "INVALID_LOGIN: Invalid username, password, security token; or user locked out"

This error occurs when Salesforce cannot authenticate your credentials. Follow these steps to resolve:

### Step 1: Reset Your Security Token

**This is the most common cause of authentication failures.**

1. Log into Salesforce
2. Click on your profile picture (top right) → **Settings**
3. In the left sidebar, go to **My Personal Information** → **Reset My Security Token**
4. Click **Reset Security Token**
5. Check your email for the new security token
6. Update your `.env` file with the new token:
   ```
   SALESFORCE_SECURITY_TOKEN=your_new_token_here
   ```

### Step 2: Verify Your Password

1. Try logging into Salesforce web interface with your password
2. If you can't log in, reset your password
3. Update your `.env` file with the correct password:
   ```
   SALESFORCE_PASSWORD=your_correct_password
   ```

### Step 3: Check Login URL

Determine if you're using a **Production** or **Sandbox** environment:

- **Production**: `https://login.salesforce.com`
- **Sandbox**: `https://test.salesforce.com`

Update your `.env` file accordingly:
```
SALESFORCE_LOGIN_URL=https://login.salesforce.com  # or https://test.salesforce.com
```

### Step 4: Verify Account Status

1. Contact your Salesforce administrator
2. Ask them to check if your account is:
   - Active (not locked)
   - Has API access enabled
   - Not restricted by login hours

### Step 5: Check IP Whitelisting

If your organization restricts API access by IP address:

1. Go to **Setup** → **Security** → **Network Access**
2. Add your IP address to the trusted IP ranges
3. Or ask your administrator to do this

### Step 6: Verify API Access

1. Go to **Setup** → **Users** → **Profiles**
2. Find your profile
3. Ensure **API Enabled** permission is checked

### Step 7: Test Authentication

Run the diagnostic script to test your credentials:

```bash
cd backend
node test-auth.js
```

This will test multiple authentication scenarios and provide specific feedback.

### Step 8: Check for Special Characters

If your password contains special characters, ensure they are properly escaped in the `.env` file:

- Don't use quotes around the password
- Special characters like `$`, `!`, `@` should work as-is
- If issues persist, try changing your password to one without special characters

### Step 9: Restart the Backend Server

After updating your `.env` file:

1. Stop the backend server (Ctrl+C)
2. Start it again:
   ```bash
   cd backend
   npm start
   ```

### Step 10: Enable Debug Logging

Add this to your `.env` file to see detailed authentication logs:

```
DEBUG=jsforce:*
```

Then restart the server and check the console output.

## Common Mistakes

❌ **Using quotes around credentials**
```
SALESFORCE_PASSWORD="mypassword"  # WRONG
```

✅ **Correct format**
```
SALESFORCE_PASSWORD=mypassword  # CORRECT
```

❌ **Forgetting to concatenate password + security token**
The code automatically concatenates them, so just provide them separately:
```
SALESFORCE_PASSWORD=mypassword
SALESFORCE_SECURITY_TOKEN=mytoken
```

❌ **Using old security token**
Security tokens expire when:
- You reset your password
- An administrator resets it
- You manually reset it

## Still Having Issues?

1. **Check Salesforce Login History**:
   - Go to **Setup** → **Login History**
   - Look for failed login attempts
   - Check the error messages

2. **Review API Usage**:
   - Go to **Setup** → **System Overview**
   - Check if you've exceeded API limits

3. **Contact Support**:
   - Provide the exact error message
   - Include your Salesforce edition (Enterprise, Professional, etc.)
   - Mention if you're using a sandbox or production org

## Quick Fix Checklist

- [ ] Reset security token in Salesforce
- [ ] Update `.env` file with new token
- [ ] Verify password is correct
- [ ] Check login URL (production vs sandbox)
- [ ] Restart backend server
- [ ] Test with `node test-auth.js`
- [ ] Check account is not locked
- [ ] Verify API access is enabled
- [ ] Check IP whitelisting settings

## Need Help?

If you've tried all the above steps and still can't authenticate, please provide:

1. The exact error message from the console
2. Your Salesforce edition
3. Whether you're using production or sandbox
4. Output from `node test-auth.js`
5. Any relevant logs from the backend server