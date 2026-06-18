require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Mapeamento de códigos de times da API para códigos do dashboard
const teamMapping = {
    'MEX': 'MEX', 'RSA': 'RSA', 'KOR': 'KOR', 'CZE': 'CZE',
    'CAN': 'CAN', 'BIH': 'BIH', 'QAT': 'QAT', 'SUI': 'SUI',
    'BRA': 'BRA', 'MAR': 'MAR', 'HAI': 'HAI', 'SCO': 'SCO',
    'USA': 'USA', 'PAR': 'PAR', 'AUS': 'AUS', 'TUR': 'TUR',
    'GER': 'GER', 'CUW': 'CUW', 'CIV': 'CIV', 'ECU': 'ECU',
    'NED': 'NED', 'JPN': 'JPN', 'SWE': 'SWE', 'TUN': 'TUN',
    'BEL': 'BEL', 'EGY': 'EGY', 'IRN': 'IRN', 'NZL': 'NZL',
    'ESP': 'ESP', 'CPV': 'CPV', 'KSA': 'KSA', 'URU': 'URU',
    'FRA': 'FRA', 'SEN': 'SEN', 'IRQ': 'IRQ', 'NOR': 'NOR',
    'ARG': 'ARG', 'ALG': 'ALG', 'AUT': 'AUT', 'JOR': 'JOR',
    'POR': 'POR', 'COD': 'COD', 'UZB': 'UZB', 'COL': 'COL',
    'ENG': 'ENG', 'CRO': 'CRO', 'GHA': 'GHA', 'PAN': 'PAN'
};

// Mapeamento de grupos da API para o dashboard
const groupMapping = {
    'GROUP_A': 'A', 'GROUP_B': 'B', 'GROUP_C': 'C', 'GROUP_D': 'D',
    'GROUP_E': 'E', 'GROUP_F': 'F', 'GROUP_G': 'G', 'GROUP_H': 'H',
    'GROUP_I': 'I', 'GROUP_J': 'J', 'GROUP_K': 'K', 'GROUP_L': 'L'
};

function calculateGroupStandings(matches) {
    const standings = {};
    
    // Inicializar grupos A-L
    for (let i = 0; i < 12; i++) {
        const groupLetter = String.fromCharCode(65 + i); // A=65, B=66, etc.
        standings[groupLetter] = {};
    }
    
    // Processar cada jogo finalizado
    matches.forEach(match => {
        if (match.status !== 'finished') return;
        
        const group = match.group;
        const homeTeam = match.homeTeam;
        const awayTeam = match.awayTeam;
        
        // Inicializar times se não existirem
        if (!standings[group][homeTeam]) {
            standings[group][homeTeam] = {
                team: homeTeam,
                played: 0,
                won: 0,
                drawn: 0,
                lost: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                goalDifference: 0,
                points: 0
            };
        }
        if (!standings[group][awayTeam]) {
            standings[group][awayTeam] = {
                team: awayTeam,
                played: 0,
                won: 0,
                drawn: 0,
                lost: 0,
                goalsFor: 0,
                goalsAgainst: 0,
                goalDifference: 0,
                points: 0
            };
        }
        
        // Atualizar estatísticas
        const homeStats = standings[group][homeTeam];
        const awayStats = standings[group][awayTeam];
        
        homeStats.played++;
        awayStats.played++;
        
        homeStats.goalsFor += match.homeScore;
        homeStats.goalsAgainst += match.awayScore;
        awayStats.goalsFor += match.awayScore;
        awayStats.goalsAgainst += match.homeScore;
        
        if (match.homeScore > match.awayScore) {
            homeStats.won++;
            homeStats.points += 3;
            awayStats.lost++;
        } else if (match.homeScore < match.awayScore) {
            awayStats.won++;
            awayStats.points += 3;
            homeStats.lost++;
        } else {
            homeStats.drawn++;
            awayStats.drawn++;
            homeStats.points++;
            awayStats.points++;
        }
        
        homeStats.goalDifference = homeStats.goalsFor - homeStats.goalsAgainst;
        awayStats.goalDifference = awayStats.goalsFor - awayStats.goalsAgainst;
    });
    
    // Ordenar cada grupo
    Object.keys(standings).forEach(group => {
        standings[group] = Object.values(standings[group]).sort((a, b) => {
            if (b.points !== a.points) return b.points - a.points;
            if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
            if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
            return 0;
        });
    });
    
    return standings;
}

async function updateDashboardData() {
    console.log('🔄 Updating dashboard with real API data...\n');

    // Ler dados da API
    const apiDataPath = path.join(__dirname, 'real-data.json');
    const apiData = JSON.parse(fs.readFileSync(apiDataPath, 'utf8'));

    // Ler dados atuais do dashboard
    const dashboardDataPath = path.join(__dirname, '..', 'js', 'data.js');
    let dashboardContent = fs.readFileSync(dashboardDataPath, 'utf8');

    // Extrair jogos finalizados da API
    const finishedMatches = apiData.matches.filter(m => m.status === 'FINISHED');
    console.log(`📊 Found ${finishedMatches.length} finished matches\n`);

    // Converter jogos da API para formato do dashboard
    const convertedMatches = [];
    let matchId = 1;

    finishedMatches.forEach(apiMatch => {
        // Converter data UTC para UTC-3 (Brasília)
        const utcDate = new Date(apiMatch.utcDate);
        const brasiliaDate = new Date(utcDate.getTime() - (3 * 60 * 60 * 1000));
        const dateStr = brasiliaDate.toISOString().slice(0, 19) + '-03:00';

        // Mapear códigos de times
        const homeTeam = teamMapping[apiMatch.homeTeam.tla] || apiMatch.homeTeam.tla;
        const awayTeam = teamMapping[apiMatch.awayTeam.tla] || apiMatch.awayTeam.tla;

        // Mapear grupo
        const group = groupMapping[apiMatch.group] || apiMatch.group.replace('GROUP_', '');

        // Determinar rodada baseado no matchday
        const round = apiMatch.matchday;

        const match = {
            id: matchId++,
            date: dateStr,
            group: group,
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            homeScore: apiMatch.score.fullTime.home,
            awayScore: apiMatch.score.fullTime.away,
            stadium: 'Stadium',
            status: 'finished',
            phase: 'group',
            round: round
        };

        convertedMatches.push(match);
        
        const dateObj = new Date(dateStr);
        const formattedDate = dateObj.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: '2-digit',
            timeZone: 'America/Sao_Paulo'
        });
        const formattedTime = dateObj.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZone: 'America/Sao_Paulo'
        });
        
        console.log(`✅ ${formattedDate} ${formattedTime} | Grupo ${group} R${round} | ${homeTeam} ${match.homeScore}-${match.awayScore} ${awayTeam}`);
    });

    // Calcular classificações dos grupos
    console.log('\n📊 Calculating group standings...\n');
    const standings = calculateGroupStandings(convertedMatches);
    
    // Exibir classificações
    Object.keys(standings).sort().forEach(group => {
        if (standings[group].length > 0) {
            console.log(`\n🏆 GRUPO ${group}:`);
            standings[group].forEach((team, index) => {
                console.log(`   ${index + 1}. ${team.team.padEnd(4)} - ${team.points}pts (${team.played}J ${team.won}V ${team.drawn}E ${team.lost}D | ${team.goalsFor}:${team.goalsAgainst} SG:${team.goalDifference})`);
            });
        }
    });

    console.log('\n\n💾 Saving updated data...');
    
    // Salvar dados convertidos
    const outputPath = path.join(__dirname, 'dashboard-update.json');
    fs.writeFileSync(outputPath, JSON.stringify({
        matches: convertedMatches,
        standings: standings,
        lastUpdate: new Date().toISOString()
    }, null, 2));
    
    console.log(`✅ Data saved to: ${outputPath}`);
    console.log('\n📝 Next: Manually update js/data.js with these results');
    console.log('   Or use the generated JSON to update programmatically');
}

// Executar atualização
updateDashboardData().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
});

// Made with Bob
