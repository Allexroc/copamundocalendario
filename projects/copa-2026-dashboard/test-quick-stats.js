// Test script to calculate and display Quick Stats
// Run this in browser console or as a Node.js script

// Simulate the data structure
const matches = [
    // Group A - Round 1
    { id: 1, homeTeam: "MEX", awayTeam: "RSA", homeScore: 2, awayScore: 0, status: "finished" },
    { id: 2, homeTeam: "KOR", awayTeam: "CZE", homeScore: 2, awayScore: 1, status: "finished" },
    
    // Group B - Round 1
    { id: 3, homeTeam: "CAN", awayTeam: "SUI", homeScore: 2, awayScore: 1, status: "finished" },
    { id: 4, homeTeam: "BIH", awayTeam: "QAT", homeScore: 1, awayScore: 1, status: "finished" },
    
    // Group C - Round 1
    { id: 5, homeTeam: "BRA", awayTeam: "MAR", homeScore: 1, awayScore: 1, status: "finished" },
    { id: 6, homeTeam: "HAI", awayTeam: "SCO", homeScore: 0, awayScore: 1, status: "finished" },
    
    // Group D - Round 1
    { id: 7, homeTeam: "USA", awayTeam: "PAR", homeScore: 4, awayScore: 1, status: "finished" },
    { id: 8, homeTeam: "AUS", awayTeam: "TUR", homeScore: 2, awayScore: 0, status: "finished" },
    
    // Group E - Round 1
    { id: 9, homeTeam: "GER", awayTeam: "CUW", homeScore: 7, awayScore: 1, status: "finished" },
    { id: 10, homeTeam: "CIV", awayTeam: "ECU", homeScore: 1, awayScore: 0, status: "finished" },
    
    // Group F - Round 1
    { id: 11, homeTeam: "NED", awayTeam: "JPN", homeScore: 2, awayScore: 2, status: "finished" },
    { id: 12, homeTeam: "SWE", awayTeam: "TUN", homeScore: 5, awayScore: 1, status: "finished" },
    
    // Group G - Round 1
    { id: 13, homeTeam: "BEL", awayTeam: "EGY", homeScore: 1, awayScore: 1, status: "finished" },
    { id: 14, homeTeam: "IRN", awayTeam: "NZL", homeScore: 2, awayScore: 2, status: "finished" },
    
    // Group H - Round 1
    { id: 15, homeTeam: "ESP", awayTeam: "CPV", homeScore: 0, awayScore: 0, status: "finished" },
    { id: 16, homeTeam: "KSA", awayTeam: "URU", homeScore: 1, awayScore: 1, status: "finished" },
    
    // Group I - Round 1
    { id: 17, homeTeam: "FRA", awayTeam: "SEN", homeScore: 3, awayScore: 1, status: "finished" },
    { id: 18, homeTeam: "IRQ", awayTeam: "NOR", homeScore: 1, awayScore: 4, status: "finished" },
    
    // Group J - Round 1
    { id: 19, homeTeam: "ARG", awayTeam: "ALG", homeScore: 3, awayScore: 0, status: "finished" },
    { id: 20, homeTeam: "AUT", awayTeam: "JOR", homeScore: 3, awayScore: 1, status: "finished" },
    
    // Group K - Round 1
    { id: 21, homeTeam: "POR", awayTeam: "COD", homeScore: 1, awayScore: 1, status: "finished" },
    { id: 22, homeTeam: "UZB", awayTeam: "COL", homeScore: 1, awayScore: 3, status: "finished" },
    
    // Group L - Round 1
    { id: 23, homeTeam: "ENG", awayTeam: "CRO", homeScore: 4, awayScore: 2, status: "finished" },
    { id: 24, homeTeam: "GHA", awayTeam: "PAN", homeScore: 1, awayScore: 0, status: "finished" }
];

// Calculate statistics
const finishedMatches = matches.filter(m => m.status === 'finished');

let totalGoals = 0;
let biggestWin = { homeTeam: '', awayTeam: '', homeScore: 0, awayScore: 0, difference: 0 };

finishedMatches.forEach(match => {
    const matchGoals = match.homeScore + match.awayScore;
    totalGoals += matchGoals;
    
    const difference = Math.abs(match.homeScore - match.awayScore);
    if (difference > biggestWin.difference) {
        biggestWin = {
            homeTeam: match.homeTeam,
            awayTeam: match.awayTeam,
            homeScore: match.homeScore,
            awayScore: match.awayScore,
            difference: difference
        };
    }
});

const matchesPlayed = finishedMatches.length;
const averageGoals = (totalGoals / matchesPlayed).toFixed(2);

console.log('=== ESTATÍSTICAS RÁPIDAS CORRETAS ===\n');
console.log(`📊 Jogos Realizados: ${matchesPlayed}`);
console.log(`⚽ Gols Marcados: ${totalGoals}`);
console.log(`📈 Média de Gols/Jogo: ${averageGoals}`);
console.log(`🔥 Maior Goleada: ${biggestWin.homeTeam} ${biggestWin.homeScore}-${biggestWin.awayScore} ${biggestWin.awayTeam}`);
console.log('\n=== DETALHES ===');
console.log(`Diferença da maior goleada: ${biggestWin.difference} gols`);

// List all matches with goals
console.log('\n=== TODOS OS JOGOS (Rodada 1) ===');
finishedMatches.forEach((match, index) => {
    const goals = match.homeScore + match.awayScore;
    console.log(`${index + 1}. ${match.homeTeam} ${match.homeScore}-${match.awayScore} ${match.awayTeam} (${goals} gols)`);
});

// Made with Bob
