const fs = require('fs');
const path = require('path');

console.log('🔄 Replacing data.js with API data...\n');

// Read dashboard update data
const dashboardData = JSON.parse(fs.readFileSync(path.join(__dirname, 'dashboard-update.json'), 'utf8'));

// Read current data.js
const dataJsPath = path.join(__dirname, '..', 'js', 'data.js');
let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

// Find the matches array section
const matchesStart = dataJsContent.indexOf('matches: [');
const matchesEnd = dataJsContent.indexOf('],', matchesStart) + 2;

if (matchesStart === -1 || matchesEnd === -1) {
    console.error('❌ Could not find matches array in data.js');
    process.exit(1);
}

// Convert matches to JavaScript format
const matchesJs = dashboardData.matches.map(m => {
    return `        { id: ${m.id}, date: "${m.date}", group: "${m.group}", homeTeam: "${m.homeTeam}", awayTeam: "${m.awayTeam}", homeScore: ${m.homeScore}, awayScore: ${m.awayScore}, stadium: "${m.stadium}", status: "${m.status}", phase: "${m.phase}", round: ${m.round} }`;
}).join(',\n');

// Build new matches section
const newMatchesSection = `matches: [\n${matchesJs}\n    ]`;

// Replace matches section
const newDataJsContent = dataJsContent.substring(0, matchesStart) + newMatchesSection + dataJsContent.substring(matchesEnd);

// Write back to file
fs.writeFileSync(dataJsPath, newDataJsContent, 'utf8');

console.log(`✅ Successfully replaced ${dashboardData.matches.length} matches in data.js`);
console.log('\n📊 Summary:');
console.log(`   - Total matches: ${dashboardData.matches.length}`);
console.log(`   - Finished: ${dashboardData.matches.filter(m => m.status === 'finished').length}`);
console.log(`   - File: ${dataJsPath}`);
console.log('\n✅ data.js updated successfully!');

// Made with Bob
