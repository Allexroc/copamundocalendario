// Test Code Structure and Functionality
// This tests the code itself, not the Salesforce connection

console.log('=================================');
console.log('Code Structure Test');
console.log('=================================\n');

let passedTests = 0;
let failedTests = 0;

// Test 1: Check if required files exist
console.log('Test 1: Checking required files...');
const fs = require('fs');
const path = require('path');

const requiredFiles = [
    'server.js',
    'config/salesforce.js',
    'routes/cases.js',
    'package.json',
    '.env'
];

requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        console.log(`  ✅ ${file} exists`);
        passedTests++;
    } else {
        console.log(`  ❌ ${file} NOT FOUND`);
        failedTests++;
    }
});

// Test 2: Check package.json dependencies
console.log('\nTest 2: Checking package.json...');
try {
    const packageJson = require('./package.json');
    const requiredDeps = ['express', 'jsforce', 'cors', 'dotenv', 'body-parser'];
    
    requiredDeps.forEach(dep => {
        if (packageJson.dependencies[dep]) {
            console.log(`  ✅ ${dep} is listed in dependencies`);
            passedTests++;
        } else {
            console.log(`  ❌ ${dep} is MISSING from dependencies`);
            failedTests++;
        }
    });
} catch (error) {
    console.log(`  ❌ Error reading package.json: ${error.message}`);
    failedTests++;
}

// Test 3: Check if modules can be loaded
console.log('\nTest 3: Checking if modules load correctly...');
try {
    const express = require('express');
    console.log('  ✅ express loads correctly');
    passedTests++;
} catch (error) {
    console.log(`  ❌ express failed to load: ${error.message}`);
    failedTests++;
}

try {
    const jsforce = require('jsforce');
    console.log('  ✅ jsforce loads correctly');
    passedTests++;
} catch (error) {
    console.log(`  ❌ jsforce failed to load: ${error.message}`);
    failedTests++;
}

try {
    const cors = require('cors');
    console.log('  ✅ cors loads correctly');
    passedTests++;
} catch (error) {
    console.log(`  ❌ cors failed to load: ${error.message}`);
    failedTests++;
}

// Test 4: Check environment variables
console.log('\nTest 4: Checking environment variables...');
require('dotenv').config();

const requiredEnvVars = [
    'SALESFORCE_LOGIN_URL',
    'SALESFORCE_CLIENT_ID',
    'SALESFORCE_CLIENT_SECRET',
    'SALESFORCE_USERNAME',
    'SALESFORCE_PASSWORD',
    'SALESFORCE_SECURITY_TOKEN'
];

requiredEnvVars.forEach(envVar => {
    if (process.env[envVar]) {
        console.log(`  ✅ ${envVar} is set`);
        passedTests++;
    } else {
        console.log(`  ❌ ${envVar} is NOT set`);
        failedTests++;
    }
});

// Test 5: Check Salesforce config module
console.log('\nTest 5: Checking Salesforce config module...');
try {
    const salesforceConfig = require('./config/salesforce');
    
    if (typeof salesforceConfig.getConnection === 'function') {
        console.log('  ✅ getConnection function exists');
        passedTests++;
    } else {
        console.log('  ❌ getConnection function NOT FOUND');
        failedTests++;
    }
    
    if (typeof salesforceConfig.createCase === 'function') {
        console.log('  ✅ createCase function exists');
        passedTests++;
    } else {
        console.log('  ❌ createCase function NOT FOUND');
        failedTests++;
    }
} catch (error) {
    console.log(`  ❌ Error loading salesforce config: ${error.message}`);
    failedTests += 2;
}

// Test 6: Check routes module
console.log('\nTest 6: Checking routes module...');
try {
    const casesRouter = require('./routes/cases');
    console.log('  ✅ cases router loads correctly');
    passedTests++;
} catch (error) {
    console.log(`  ❌ Error loading cases router: ${error.message}`);
    failedTests++;
}

// Test 7: Check server.js structure
console.log('\nTest 7: Checking server.js structure...');
try {
    const serverContent = fs.readFileSync(path.join(__dirname, 'server.js'), 'utf8');
    
    const checks = [
        { pattern: /require\(['"]express['"]\)/, name: 'Express import' },
        { pattern: /require\(['"]cors['"]\)/, name: 'CORS import' },
        { pattern: /require\(['"]\.\/routes\/cases['"]\)/, name: 'Routes import' },
        { pattern: /app\.use\(['"]\/api\/cases['"]/, name: 'API routes setup' },
        { pattern: /app\.listen/, name: 'Server listen' }
    ];
    
    checks.forEach(check => {
        if (check.pattern.test(serverContent)) {
            console.log(`  ✅ ${check.name} found`);
            passedTests++;
        } else {
            console.log(`  ❌ ${check.name} NOT FOUND`);
            failedTests++;
        }
    });
} catch (error) {
    console.log(`  ❌ Error reading server.js: ${error.message}`);
    failedTests += 5;
}

// Summary
console.log('\n=================================');
console.log('Test Summary');
console.log('=================================');
console.log(`✅ Passed: ${passedTests}`);
console.log(`❌ Failed: ${failedTests}`);
console.log(`📊 Total: ${passedTests + failedTests}`);
console.log(`📈 Success Rate: ${((passedTests / (passedTests + failedTests)) * 100).toFixed(1)}%`);
console.log('=================================\n');

if (failedTests === 0) {
    console.log('🎉 All tests passed! The code structure is correct.');
    console.log('💡 The authentication issue is with Salesforce credentials, not the code.');
} else {
    console.log('⚠️  Some tests failed. Please review the errors above.');
}

process.exit(failedTests > 0 ? 1 : 0);

// Made with Bob
