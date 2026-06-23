// Test Football-Data.org API
const https = require('https');

const options = {
    hostname: 'api.football-data.org',
    path: '/v4/competitions/WC/matches',
    method: 'GET',
    headers: {
        'X-Auth-Token': '093dce6688974c83ad7a4adae69e5cfd'
    }
};

console.log('🔄 Testando acesso à API Football-Data.org...');
console.log('📅 Data atual: 23/06/2026');
console.log('🏆 Competição: FIFA World Cup 2026');
console.log('');

const req = https.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers, null, 2)}`);
    console.log('');
    
    let data = '';
    
    res.on('data', (chunk) => {
        data += chunk;
    });
    
    res.on('end', () => {
        try {
            const jsonData = JSON.parse(data);
            console.log('✅ Resposta da API:');
            console.log(JSON.stringify(jsonData, null, 2));
            
            if (jsonData.matches && jsonData.matches.length > 0) {
                console.log('');
                console.log(`📊 Total de partidas: ${jsonData.matches.length}`);
                console.log('');
                console.log('Primeiras 3 partidas:');
                jsonData.matches.slice(0, 3).forEach((match, i) => {
                    console.log(`${i + 1}. ${match.homeTeam.name} vs ${match.awayTeam.name}`);
                    console.log(`   Data: ${match.utcDate}`);
                    console.log(`   Status: ${match.status}`);
                    console.log(`   Placar: ${match.score.fullTime.home} - ${match.score.fullTime.away}`);
                });
            } else {
                console.log('⚠️ Nenhuma partida encontrada');
            }
        } catch (e) {
            console.error('❌ Erro ao parsear JSON:', e.message);
            console.log('Resposta raw:', data);
        }
    });
});

req.on('error', (e) => {
    console.error(`❌ Erro na requisição: ${e.message}`);
});

req.end();

// Made with Bob
