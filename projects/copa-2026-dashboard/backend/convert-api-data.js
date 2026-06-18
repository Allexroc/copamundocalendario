require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Mapeamento de códigos de times da API para códigos do dashboard
const teamMapping = {
    'MEX': 'MEX', 'RSA': 'RSA', 'KOR': 'KOR', 'CZE': 'CZE',
    'CAN': 'CAN', 'BIH': 'BIH', 'QAT': 'QAT', 'SUI': 'SUI',
    'BRA': 'BRA', 'MAR': 'MAR', 'HAI': 'HAI', 'SCO': 'SCO',
    'USA': 'USA', 'PAR': 'PAR', 'COL': 'COL', 'NGA': 'NGA',
    'ARG': 'ARG', 'PER': 'PER', 'JPN': 'JPN', 'SEN': 'SEN',
    'ENG': 'ENG', 'CRC': 'CRC', 'URU': 'URU', 'TUN': 'TUN',
    'FRA': 'FRA', 'AUS': 'AUS', 'DEN': 'DEN', 'NZL': 'NZL',
    'ESP': 'ESP', 'NED': 'NED', 'CRO': 'CRO', 'BEL': 'BEL',
    'GER': 'GER', 'POL': 'POL', 'POR': 'POR', 'ITA': 'ITA'
};

// Mapeamento de grupos da API para o dashboard
const groupMapping = {
    'GROUP_A': 'A', 'GROUP_B': 'B', 'GROUP_C': 'C', 'GROUP_D': 'D',
    'GROUP_E': 'E', 'GROUP_F': 'F', 'GROUP_G': 'G', 'GROUP_H': 'H'
};

// Mapeamento de estádios (simplificado)
const stadiumMapping = {
    'Estadio Azteca': 'Estadio Azteca',
    'BC Place': 'BC Place',
    'MetLife Stadium': 'MetLife Stadium',
    'Mercedes-Benz Stadium': 'Mercedes-Benz Stadium',
    'AT&T Stadium': 'AT&T Stadium',
    'Arrowhead Stadium': 'Arrowhead Stadium',
    'Lincoln Financial Field': 'Lincoln Financial Field',
    'Hard Rock Stadium': 'Hard Rock Stadium',
    'NRG Stadium': 'NRG Stadium',
    'Levi\'s Stadium': 'Levi\'s Stadium',
    'SoFi Stadium': 'SoFi Stadium',
    'BMO Field': 'BMO Field'
};

function convertApiDataToDashboard() {
    console.log('🔄 Converting API data to dashboard format...\n');

    // Ler dados da API
    const apiDataPath = path.join(__dirname, 'real-data.json');
    const apiData = JSON.parse(fs.readFileSync(apiDataPath, 'utf8'));

    // Ler dados atuais do dashboard
    const dashboardDataPath = path.join(__dirname, '..', 'js', 'data.js');
    let dashboardContent = fs.readFileSync(dashboardDataPath, 'utf8');

    // Extrair apenas jogos finalizados da API
    const finishedMatches = apiData.matches.filter(m => m.status === 'FINISHED');
    console.log(`📊 Found ${finishedMatches.length} finished matches in API\n`);

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
        const group = groupMapping[apiMatch.group] || apiMatch.group;

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
            stadium: 'Stadium', // API não fornece estádio específico
            status: 'finished',
            phase: 'group',
            round: round
        };

        convertedMatches.push(match);
        
        console.log(`✅ Match ${match.id}: ${homeTeam} ${match.homeScore}-${match.awayScore} ${awayTeam} (Group ${group}, Round ${round})`);
    });

    console.log(`\n📝 Total converted matches: ${convertedMatches.length}`);
    console.log('\n💡 Next step: Update data.js with these results');
    
    // Salvar dados convertidos para referência
    const outputPath = path.join(__dirname, 'converted-matches.json');
    fs.writeFileSync(outputPath, JSON.stringify(convertedMatches, null, 2));
    console.log(`\n💾 Converted data saved to: ${outputPath}`);

    return convertedMatches;
}

// Executar conversão
try {
    const matches = convertApiDataToDashboard();
    console.log('\n✅ Conversion completed successfully!');
} catch (error) {
    console.error('❌ Error converting data:', error.message);
    process.exit(1);
}

// Made with Bob
