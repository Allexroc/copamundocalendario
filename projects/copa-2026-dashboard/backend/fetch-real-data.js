const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const API_KEY = '093dce6688974c83ad7a4adae69e5cfd';
const BASE_URL = 'https://api.football-data.org/v4';

async function fetchRealData() {
    console.log('🔄 Fetching real World Cup data from Football-Data.org...\n');
    
    try {
        // Fetch matches
        console.log('📥 Fetching matches...');
        const matchesResponse = await fetch(`${BASE_URL}/competitions/WC/matches`, {
            headers: { 'X-Auth-Token': API_KEY }
        });
        
        if (!matchesResponse.ok) {
            throw new Error(`Failed to fetch matches: ${matchesResponse.status}`);
        }
        
        const matchesData = await matchesResponse.json();
        console.log(`✅ Found ${matchesData.matches.length} matches\n`);
        
        // Show first 5 matches
        console.log('📋 Sample matches:');
        matchesData.matches.slice(0, 5).forEach((match, i) => {
            const status = match.status;
            const home = match.homeTeam.name;
            const away = match.awayTeam.name;
            const score = match.score.fullTime.home !== null 
                ? `${match.score.fullTime.home}-${match.score.fullTime.away}`
                : 'vs';
            const date = new Date(match.utcDate).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
            
            console.log(`${i+1}. [${status}] ${home} ${score} ${away} - ${date}`);
        });
        
        // Save to file
        const outputPath = path.join(__dirname, 'real-data.json');
        fs.writeFileSync(outputPath, JSON.stringify(matchesData, null, 2));
        console.log(`\n💾 Data saved to: ${outputPath}`);
        
        // Statistics
        const finished = matchesData.matches.filter(m => m.status === 'FINISHED').length;
        const scheduled = matchesData.matches.filter(m => m.status === 'SCHEDULED' || m.status === 'TIMED').length;
        const live = matchesData.matches.filter(m => m.status === 'IN_PLAY' || m.status === 'PAUSED').length;
        
        console.log('\n📊 Statistics:');
        console.log(`   Finished: ${finished}`);
        console.log(`   Live: ${live}`);
        console.log(`   Scheduled: ${scheduled}`);
        console.log(`   Total: ${matchesData.matches.length}`);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

fetchRealData();

// Made with Bob
