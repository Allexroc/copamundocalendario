const fetch = require('node-fetch');

const API_KEY = '093dce6688974c83ad7a4adae69e5cfd';
const BASE_URL = 'https://api.football-data.org/v4';

async function testAPI() {
    console.log('🔍 Testing Football-Data.org API...\n');
    
    try {
        // Test 1: Get competitions
        console.log('1️⃣ Testing /competitions endpoint...');
        const competitionsResponse = await fetch(`${BASE_URL}/competitions`, {
            headers: { 'X-Auth-Token': API_KEY }
        });
        
        if (!competitionsResponse.ok) {
            console.log(`❌ Status: ${competitionsResponse.status} ${competitionsResponse.statusText}`);
            const errorText = await competitionsResponse.text();
            console.log(`Error: ${errorText}\n`);
        } else {
            const competitions = await competitionsResponse.json();
            console.log(`✅ Success! Found ${competitions.competitions?.length || 0} competitions`);
            console.log(`Available competitions:`, competitions.competitions?.slice(0, 5).map(c => c.name).join(', '));
            console.log('');
        }
        
        // Test 2: Try World Cup
        console.log('2️⃣ Testing /competitions/WC/matches endpoint...');
        const wcResponse = await fetch(`${BASE_URL}/competitions/WC/matches`, {
            headers: { 'X-Auth-Token': API_KEY }
        });
        
        if (!wcResponse.ok) {
            console.log(`❌ Status: ${wcResponse.status} ${wcResponse.statusText}`);
            const errorText = await wcResponse.text();
            console.log(`Error: ${errorText}`);
            console.log('ℹ️  World Cup 2026 data not available yet (tournament hasn\'t started)\n');
        } else {
            const wcData = await wcResponse.json();
            console.log(`✅ Success! Found ${wcData.matches?.length || 0} matches`);
            console.log('');
        }
        
        // Test 3: Try World Cup 2022 (FIFA code: 2000)
        console.log('3️⃣ Testing /competitions/2000 (World Cup 2022)...');
        const wc2022Response = await fetch(`${BASE_URL}/competitions/2000`, {
            headers: { 'X-Auth-Token': API_KEY }
        });
        
        if (!wc2022Response.ok) {
            console.log(`❌ Status: ${wc2022Response.status} ${wc2022Response.statusText}`);
        } else {
            const wc2022 = await wc2022Response.json();
            console.log(`✅ Success! Competition: ${wc2022.name}`);
            console.log(`   Season: ${wc2022.currentSeason?.startDate} to ${wc2022.currentSeason?.endDate}`);
        }
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

testAPI();

// Made with Bob
