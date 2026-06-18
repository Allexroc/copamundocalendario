require('dotenv').config();
const fs = require('fs');
const path = require('path');

// Ler dados da API processados
const updateDataPath = path.join(__dirname, 'dashboard-update.json');
const updateData = JSON.parse(fs.readFileSync(updateDataPath, 'utf8'));

// Ler arquivo data.js atual
const dataJsPath = path.join(__dirname, '..', 'js', 'data.js');
let dataJsContent = fs.readFileSync(dataJsPath, 'utf8');

console.log('🔄 Updating data.js with real API data...\n');

// 1. Atualizar classificações dos grupos
console.log('📊 Updating group standings...');
const standingsStr = JSON.stringify(updateData.standings, null, 8)
    .replace(/"([^"]+)":/g, '"$1":') // Manter aspas nas chaves
    .replace(/^/gm, '    '); // Adicionar indentação

// Encontrar e substituir groupStandings
const standingsRegex = /groupStandings:\s*{[\s\S]*?},\n\n/;
const newStandings = `groupStandings: ${standingsStr},\n\n`;
dataJsContent = dataJsContent.replace(standingsRegex, newStandings);

// 2. Atualizar jogos (apenas os finalizados da Rodada 1 e 2)
console.log('⚽ Updating finished matches...');

// Criar mapa de jogos da API por chave única
const apiMatchesMap = {};
updateData.matches.forEach(match => {
    const key = `${match.group}-${match.homeTeam}-${match.awayTeam}-R${match.round}`;
    apiMatchesMap[key] = match;
});

// Atualizar jogos no data.js usando uma abordagem mais eficiente
let updatedCount = 0;

// Usar um regex mais simples e processar linha por linha
const lines = dataJsContent.split('\n');
const processedLines = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detectar linhas que contêm objetos de match
    if (line.includes('id:') && line.includes('homeTeam:') && line.includes('awayTeam:')) {
        // Extrair informações usando regex mais simples
        const idMatch = line.match(/id:\s*(\d+)/);
        const groupMatch = line.match(/group:\s*"([^"]+)"/);
        const homeTeamMatch = line.match(/homeTeam:\s*"([^"]+)"/);
        const awayTeamMatch = line.match(/awayTeam:\s*"([^"]+)"/);
        const roundMatch = line.match(/round:\s*(\d+)/);
        
        if (idMatch && groupMatch && homeTeamMatch && awayTeamMatch && roundMatch) {
            const id = idMatch[1];
            const group = groupMatch[1];
            const homeTeam = homeTeamMatch[1];
            const awayTeam = awayTeamMatch[1];
            const round = roundMatch[1];
            
            const key = `${group}-${homeTeam}-${awayTeam}-R${round}`;
            const apiMatch = apiMatchesMap[key];
            
            if (apiMatch && apiMatch.status === 'finished') {
                // Extrair outros campos que não mudam
                const dateMatch = line.match(/date:\s*"([^"]+)"/);
                const stadiumMatch = line.match(/stadium:\s*"([^"]+)"/);
                const phaseMatch = line.match(/phase:\s*"([^"]+)"/);
                
                const stadium = stadiumMatch ? stadiumMatch[1] : 'Stadium';
                const phase = phaseMatch ? phaseMatch[1] : 'group';
                
                // Reconstruir a linha com os novos scores
                const updatedLine = line
                    .replace(/homeScore:\s*[^,]+/, `homeScore: ${apiMatch.homeScore}`)
                    .replace(/awayScore:\s*[^,]+/, `awayScore: ${apiMatch.awayScore}`)
                    .replace(/status:\s*"[^"]+"/, `status: "finished"`)
                    .replace(/date:\s*"[^"]+"/, `date: "${apiMatch.date}"`);
                
                processedLines.push(updatedLine);
                updatedCount++;
                continue;
            }
        }
    }
    
    processedLines.push(line);
}

dataJsContent = processedLines.join('\n');

console.log(`✅ Updated ${updatedCount} matches with real results\n`);

// 3. Atualizar comentário de data/hora
const now = new Date();
const brTime = now.toLocaleString('pt-BR', { 
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
});

dataJsContent = dataJsContent.replace(
    /\/\/ Group standings \(updated to current date:.*?\)/,
    `// Group standings (updated to current date: ${brTime} BRT) - Real API data`
);

dataJsContent = dataJsContent.replace(
    /\/\/ Matches \(updated to current date:.*?\)/,
    `// Matches (updated to current date: ${brTime} BRT / UTC-3) - Real API data`
);

// Salvar arquivo atualizado
fs.writeFileSync(dataJsPath, dataJsContent, 'utf8');

console.log('💾 File saved successfully!');
console.log(`📍 Location: ${dataJsPath}`);
console.log('\n✅ Dashboard data updated with real API results!');
console.log('\n📊 Summary:');
console.log(`   - ${updatedCount} matches updated`);
console.log(`   - 12 group standings updated`);
console.log(`   - Last update: ${brTime} BRT`);
console.log('\n🌐 Refresh your browser to see the changes!');

// Made with Bob
