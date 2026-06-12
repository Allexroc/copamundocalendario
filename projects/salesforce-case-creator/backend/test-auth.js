const jsforce = require('jsforce');
require('dotenv').config();

async function testAuthentication() {
  console.log('=================================');
  console.log('Salesforce Authentication Test');
  console.log('=================================\n');

  console.log('Configuration:');
  console.log('Login URL:', process.env.SALESFORCE_LOGIN_URL);
  console.log('Username:', process.env.SALESFORCE_USERNAME);
  console.log('Password:', process.env.SALESFORCE_PASSWORD ? '***' + process.env.SALESFORCE_PASSWORD.slice(-3) : 'NOT SET');
  console.log('Security Token:', process.env.SALESFORCE_SECURITY_TOKEN ? '***' + process.env.SALESFORCE_SECURITY_TOKEN.slice(-3) : 'NOT SET');
  console.log('\n=================================\n');

  // Test 1: Standard login URL
  console.log('Test 1: Attempting login with https://login.salesforce.com...');
  try {
    const conn1 = new jsforce.Connection({
      loginUrl: 'https://login.salesforce.com'
    });
    
    const userInfo1 = await conn1.login(
      process.env.SALESFORCE_USERNAME,
      process.env.SALESFORCE_PASSWORD + process.env.SALESFORCE_SECURITY_TOKEN
    );
    
    console.log('✓ SUCCESS with login.salesforce.com');
    console.log('User ID:', userInfo1.id);
    console.log('Org ID:', userInfo1.organizationId);
    process.exit(0);
  } catch (error1) {
    console.log('✗ FAILED with login.salesforce.com');
    console.log('Error:', error1.message);
  }

  // Test 2: Sandbox login URL
  console.log('\nTest 2: Attempting login with https://test.salesforce.com...');
  try {
    const conn2 = new jsforce.Connection({
      loginUrl: 'https://test.salesforce.com'
    });
    
    const userInfo2 = await conn2.login(
      process.env.SALESFORCE_USERNAME,
      process.env.SALESFORCE_PASSWORD + process.env.SALESFORCE_SECURITY_TOKEN
    );
    
    console.log('✓ SUCCESS with test.salesforce.com (Sandbox)');
    console.log('User ID:', userInfo2.id);
    console.log('Org ID:', userInfo2.organizationId);
    console.log('\n⚠️  UPDATE YOUR .env FILE:');
    console.log('SALESFORCE_LOGIN_URL=https://test.salesforce.com');
    process.exit(0);
  } catch (error2) {
    console.log('✗ FAILED with test.salesforce.com');
    console.log('Error:', error2.message);
  }

  // Test 3: Without security token (in case it's not needed)
  console.log('\nTest 3: Attempting login without security token...');
  try {
    const conn3 = new jsforce.Connection({
      loginUrl: 'https://login.salesforce.com'
    });
    
    const userInfo3 = await conn3.login(
      process.env.SALESFORCE_USERNAME,
      process.env.SALESFORCE_PASSWORD
    );
    
    console.log('✓ SUCCESS without security token');
    console.log('User ID:', userInfo3.id);
    console.log('Org ID:', userInfo3.organizationId);
    console.log('\n⚠️  Security token not needed - remove it from password concatenation');
    process.exit(0);
  } catch (error3) {
    console.log('✗ FAILED without security token');
    console.log('Error:', error3.message);
  }

  console.log('\n=================================');
  console.log('All authentication attempts failed!');
  console.log('=================================\n');
  console.log('Possible solutions:');
  console.log('1. Reset your security token in Salesforce:');
  console.log('   - Go to Setup → My Personal Information → Reset My Security Token');
  console.log('   - Check your email for the new token');
  console.log('   - Update SALESFORCE_SECURITY_TOKEN in .env file');
  console.log('\n2. Verify your password is correct');
  console.log('\n3. Check if your account is locked:');
  console.log('   - Contact your Salesforce administrator');
  console.log('\n4. Verify you\'re using the correct login URL:');
  console.log('   - Production: https://login.salesforce.com');
  console.log('   - Sandbox: https://test.salesforce.com');
  console.log('\n5. Check if your IP is whitelisted in Salesforce');
  
  process.exit(1);
}

testAuthentication();

// Made with Bob
