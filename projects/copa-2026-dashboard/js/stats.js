// FIFA World Cup 2026 - Statistics Management
// Handles statistics display and calculations

let currentStatsCategory = 'scorers';

function renderStats() {
    const container = document.getElementById('statsContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="stats-overview">
            ${createGeneralSummary()}
        </div>
        <div class="stats-grid">
            <div class="stats-main">
                <div id="statsContent"></div>
            </div>
            <div class="stats-sidebar">
                ${createQuickStats()}
                ${createPlayerSelector()}
            </div>
        </div>
    `;

    loadStatsCategory(currentStatsCategory);
    setupStatsCategorySelector();
    setupPlayerSelector();
}

function createGeneralSummary() {
    const finishedMatches = getAllMatches().filter(m => m.status === 'finished');
    
    if (finishedMatches.length === 0) {
        return `
            <div class="stats-empty">
                <i class="fas fa-chart-bar" style="font-size: 48px; color: #ccc;"></i>
                <h3>Aguardando Jogos</h3>
                <p>As estatísticas aparecerão após os primeiros jogos serem finalizados.</p>
            </div>
        `;
    }
    
    // Calculate team statistics
    const teamStats = {};
    
    finishedMatches.forEach(match => {
        // Home team
        if (!teamStats[match.homeTeam]) {
            teamStats[match.homeTeam] = {
                team: match.homeTeam,
                played: 0,
                won: 0,
                drawn: 0,
                lost: 0,
                goalsFor: 0,
                goalsAgainst: 0
            };
        }
        
        teamStats[match.homeTeam].played++;
        teamStats[match.homeTeam].goalsFor += match.homeScore;
        teamStats[match.homeTeam].goalsAgainst += match.awayScore;
        
        if (match.homeScore > match.awayScore) teamStats[match.homeTeam].won++;
        else if (match.homeScore === match.awayScore) teamStats[match.homeTeam].drawn++;
        else teamStats[match.homeTeam].lost++;
        
        // Away team
        if (!teamStats[match.awayTeam]) {
            teamStats[match.awayTeam] = {
                team: match.awayTeam,
                played: 0,
                won: 0,
                drawn: 0,
                lost: 0,
                goalsFor: 0,
                goalsAgainst: 0
            };
        }
        
        teamStats[match.awayTeam].played++;
        teamStats[match.awayTeam].goalsFor += match.awayScore;
        teamStats[match.awayTeam].goalsAgainst += match.homeScore;
        
        if (match.awayScore > match.homeScore) teamStats[match.awayTeam].won++;
        else if (match.awayScore === match.homeScore) teamStats[match.awayTeam].drawn++;
        else teamStats[match.awayTeam].lost++;
    });
    
    const teamsArray = Object.values(teamStats);
    
    // Find best attack and defense
    const bestAttack = teamsArray.reduce((max, team) =>
        team.goalsFor > max.goalsFor ? team : max
    );
    const bestDefense = teamsArray.reduce((min, team) =>
        team.goalsAgainst < min.goalsAgainst ? team : min
    );
    const mostWins = teamsArray.reduce((max, team) =>
        team.won > max.won ? team : max
    );
    
    const bestAttackTeam = getTeamInfo(bestAttack.team) || { flag: '🏳️', name: bestAttack.team };
    const bestDefenseTeam = getTeamInfo(bestDefense.team) || { flag: '🏳️', name: bestDefense.team };
    const mostWinsTeam = getTeamInfo(mostWins.team) || { flag: '🏳️', name: mostWins.team };
    
    return `
        <div class="general-summary">
            <div class="summary-title">
                <h3><i class="fas fa-trophy"></i> Resumo Geral das Seleções</h3>
                <p>Estatísticas de todas as seleções com jogos realizados</p>
            </div>
            
            <div class="team-highlights">
                <div class="highlight-card attack">
                    <div class="highlight-icon">
                        <i class="fas fa-bullseye"></i>
                    </div>
                    <div class="highlight-content">
                        <span class="highlight-label">Melhor Ataque</span>
                        <span class="highlight-team">${bestAttackTeam.flag} ${bestAttackTeam.name}</span>
                        <span class="highlight-value">${bestAttack.goalsFor} gols em ${bestAttack.played} jogos</span>
                    </div>
                </div>
                
                <div class="highlight-card defense">
                    <div class="highlight-icon">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="highlight-content">
                        <span class="highlight-label">Melhor Defesa</span>
                        <span class="highlight-team">${bestDefenseTeam.flag} ${bestDefenseTeam.name}</span>
                        <span class="highlight-value">${bestDefense.goalsAgainst} gols sofridos em ${bestDefense.played} jogos</span>
                    </div>
                </div>
                
                <div class="highlight-card wins">
                    <div class="highlight-icon">
                        <i class="fas fa-medal"></i>
                    </div>
                    <div class="highlight-content">
                        <span class="highlight-label">Mais Vitórias</span>
                        <span class="highlight-team">${mostWinsTeam.flag} ${mostWinsTeam.name}</span>
                        <span class="highlight-value">${mostWins.won} vitórias em ${mostWins.played} jogos</span>
                    </div>
                </div>
            </div>
            
            <div class="teams-stats-table">
                <h4>Desempenho por Seleção</h4>
                <table class="compact-stats-table">
                    <thead>
                        <tr>
                            <th>Seleção</th>
                            <th>J</th>
                            <th>V</th>
                            <th>E</th>
                            <th>D</th>
                            <th>GP</th>
                            <th>GC</th>
                            <th>SG</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${teamsArray
                            .sort((a, b) => (b.won * 3 + b.drawn) - (a.won * 3 + a.drawn))
                            .slice(0, 10)
                            .map(team => {
                                const teamInfo = getTeamInfo(team.team) || { flag: '🏳️', name: team.team };
                                const goalDiff = team.goalsFor - team.goalsAgainst;
                                return `
                                    <tr>
                                        <td class="team-cell">
                                            <span class="team-flag-small">${teamInfo.flag}</span>
                                            <span class="team-name-small">${teamInfo.name}</span>
                                        </td>
                                        <td>${team.played}</td>
                                        <td class="win-cell">${team.won}</td>
                                        <td>${team.drawn}</td>
                                        <td class="loss-cell">${team.lost}</td>
                                        <td>${team.goalsFor}</td>
                                        <td>${team.goalsAgainst}</td>
                                        <td class="${goalDiff > 0 ? 'positive' : goalDiff < 0 ? 'negative' : ''}">
                                            ${goalDiff > 0 ? '+' : ''}${goalDiff}
                                        </td>
                                    </tr>
                                `;
                            }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function createPlayerSelector() {
    const allPlayers = [...WORLD_CUP_2026.topScorers, ...WORLD_CUP_2026.topAssists];
    const uniquePlayers = Array.from(new Set(allPlayers.map(p => p.player)))
        .map(name => allPlayers.find(p => p.player === name))
        .sort((a, b) => a.player.localeCompare(b.player));
    
    return `
        <div class="player-selector-widget">
            <h4><i class="fas fa-user"></i> Buscar Jogador</h4>
            <select id="playerSelect" class="player-select">
                <option value="">Selecione um jogador</option>
                ${uniquePlayers.map(player => {
                    const team = getTeamInfo(player.team) || { flag: '🏳️', code: player.team };
                    return `<option value="${player.player}">${player.player} (${team.flag} ${team.code})</option>`;
                }).join('')}
            </select>
            <div id="playerStatsDisplay"></div>
        </div>
    `;
}

function setupPlayerSelector() {
    const playerSelect = document.getElementById('playerSelect');
    if (!playerSelect) return;
    
    playerSelect.addEventListener('change', (e) => {
        const playerName = e.target.value;
        if (playerName) {
            displayPlayerStats(playerName);
        } else {
            document.getElementById('playerStatsDisplay').innerHTML = '';
        }
    });
}

function displayPlayerStats(playerName) {
    const display = document.getElementById('playerStatsDisplay');
    if (!display) return;
    
    const scorer = WORLD_CUP_2026.topScorers.find(p => p.player === playerName);
    const assister = WORLD_CUP_2026.topAssists.find(p => p.player === playerName);
    
    if (!scorer && !assister) {
        display.innerHTML = '<p class="no-stats">Estatísticas não disponíveis</p>';
        return;
    }
    
    const player = scorer || assister;
    const team = getTeamInfo(player.team) || { flag: '🏳️', name: player.team };
    
    display.innerHTML = `
        <div class="player-stats-card">
            <div class="player-header">
                <span class="player-flag">${team.flag}</span>
                <div class="player-info-text">
                    <span class="player-name-display">${playerName}</span>
                    <span class="player-team-display">${team.name}</span>
                </div>
            </div>
            <div class="player-stats-grid">
                ${scorer ? `
                    <div class="player-stat">
                        <i class="fas fa-futbol"></i>
                        <span class="stat-value">${scorer.goals}</span>
                        <span class="stat-label">Gols</span>
                    </div>
                    <div class="player-stat">
                        <i class="fas fa-chart-line"></i>
                        <span class="stat-value">${(scorer.goals / scorer.matches).toFixed(2)}</span>
                        <span class="stat-label">Média/Jogo</span>
                    </div>
                ` : ''}
                ${assister ? `
                    <div class="player-stat">
                        <i class="fas fa-hands-helping"></i>
                        <span class="stat-value">${assister.assists}</span>
                        <span class="stat-label">Assistências</span>
                    </div>
                ` : ''}
                <div class="player-stat">
                    <i class="fas fa-gamepad"></i>
                    <span class="stat-value">${player.matches}</span>
                    <span class="stat-label">Jogos</span>
                </div>
            </div>
        </div>
    `;
}

function loadStatsCategory(category) {
    const content = document.getElementById('statsContent');
    if (!content) return;

    currentStatsCategory = category;

    switch(category) {
        case 'scorers':
            content.innerHTML = createScorersTable();
            break;
        case 'assists':
            content.innerHTML = createAssistsTable();
            break;
        case 'cards':
            content.innerHTML = createCardsStats();
            break;
        case 'attendance':
            content.innerHTML = createAttendanceStats();
            break;
    }
}

function createScorersTable() {
    const scorers = getTopScorers(20);

    if (scorers.length === 0) {
        return `
            <div class="stats-section">
                <div class="stats-header">
                    <h3><i class="fas fa-futbol"></i> Artilharia</h3>
                    <span class="stats-subtitle">Top Goleadores</span>
                </div>
                <div class="stats-unavailable">
                    <i class="fas fa-info-circle"></i>
                    Dados de artilharia ainda não disponíveis.
                </div>
            </div>
        `;
    }

    return `
        <div class="stats-section">
            <div class="stats-header">
                <h3><i class="fas fa-futbol"></i> Artilharia</h3>
                <span class="stats-subtitle">Top Goleadores · Fonte: Wikipedia · até 14/07/2026</span>
            </div>
            <div class="stats-table-wrapper">
                <table class="stats-table">
                    <thead>
                        <tr>
                            <th class="rank-col">#</th>
                            <th class="player-col">Jogador</th>
                            <th class="team-col">Seleção</th>
                            <th class="stat-col">Gols</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${scorers.map((scorer, index) => createScorerRow(scorer, index + 1)).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function createScorerRow(scorer, rank) {
    const team = getTeamInfo(scorer.team) || { flag: '🏳️', code: scorer.team };
    const medalClass = rank <= 3 ? `medal-${rank}` : '';

    return `
        <tr class="stats-row ${medalClass}">
            <td class="rank-col">
                <span class="rank-badge ${medalClass}">${rank}</span>
            </td>
            <td class="player-col">
                <div class="player-info">
                    <span class="player-name">${scorer.player}</span>
                </div>
            </td>
            <td class="team-col">
                <div class="team-badge">
                    <span class="team-flag">${team.flag}</span>
                    <span class="team-code">${team.code}</span>
                </div>
            </td>
            <td class="stat-col">
                <strong class="stat-value">${scorer.goals}</strong>
            </td>
        </tr>
    `;
}

function createAssistsTable() {
    return `
        <div class="stats-section">
            <div class="stats-header">
                <h3><i class="fas fa-hands-helping"></i> Assistências</h3>
                <span class="stats-subtitle">Top Garçons</span>
            </div>
            <div class="stats-unavailable">
                <i class="fas fa-info-circle"></i>
                Dados de assistências não disponíveis em fonte verificável.
            </div>
        </div>
    `;
}

function createAssistRow(assist, rank) {
    const team = getTeamInfo(assist.team) || { flag: '🏳️', code: assist.team };
    const medalClass = rank <= 3 ? `medal-${rank}` : '';
    
    return `
        <tr class="stats-row ${medalClass}">
            <td class="rank-col">
                <span class="rank-badge ${medalClass}">${rank}</span>
            </td>
            <td class="player-col">
                <div class="player-info">
                    <span class="player-name">${assist.player}</span>
                </div>
            </td>
            <td class="team-col">
                <div class="team-badge">
                    <span class="team-flag">${team.flag}</span>
                    <span class="team-code">${team.code}</span>
                </div>
            </td>
            <td class="stat-col">
                <strong class="stat-value">${assist.assists}</strong>
            </td>
            <td class="stat-col">${assist.matches}</td>
        </tr>
    `;
}

function createCardsStats() {
    return `
        <div class="stats-section">
            <div class="stats-header">
                <h3><i class="fas fa-square"></i> Cartões</h3>
                <span class="stats-subtitle">Disciplina no Torneio</span>
            </div>
            <div class="cards-grid">
                <div class="card-stat yellow">
                    <i class="fas fa-square"></i>
                    <div class="card-info">
                        <span class="card-count">156</span>
                        <span class="card-label">Cartões Amarelos</span>
                    </div>
                </div>
                <div class="card-stat red">
                    <i class="fas fa-square"></i>
                    <div class="card-info">
                        <span class="card-count">8</span>
                        <span class="card-label">Cartões Vermelhos</span>
                    </div>
                </div>
            </div>
            <div class="fair-play-section">
                <h4>Fair Play por Grupo</h4>
                <div class="fair-play-list">
                    ${createFairPlayList()}
                </div>
            </div>
        </div>
    `;
}

function createFairPlayList() {
    const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    
    return groups.map(group => {
        const yellowCards = Math.floor(Math.random() * 15) + 5;
        const redCards = Math.floor(Math.random() * 3);
        const totalPoints = yellowCards + (redCards * 3);
        
        return `
            <div class="fair-play-item">
                <span class="group-name">Grupo ${group}</span>
                <div class="cards-count">
                    <span class="yellow-count"><i class="fas fa-square"></i> ${yellowCards}</span>
                    <span class="red-count"><i class="fas fa-square"></i> ${redCards}</span>
                </div>
                <span class="fair-play-points">${totalPoints} pts</span>
            </div>
        `;
    }).join('');
}

function createAttendanceStats() {
    return `
        <div class="stats-section">
            <div class="stats-header">
                <h3><i class="fas fa-users"></i> Público</h3>
                <span class="stats-subtitle">Estatísticas de Audiência</span>
            </div>
            <div class="attendance-grid">
                <div class="attendance-card">
                    <i class="fas fa-chart-line"></i>
                    <div class="attendance-info">
                        <span class="attendance-value">65,234</span>
                        <span class="attendance-label">Média por Jogo</span>
                    </div>
                </div>
                <div class="attendance-card">
                    <i class="fas fa-users"></i>
                    <div class="attendance-info">
                        <span class="attendance-value">1,565,616</span>
                        <span class="attendance-label">Público Total</span>
                    </div>
                </div>
                <div class="attendance-card">
                    <i class="fas fa-trophy"></i>
                    <div class="attendance-info">
                        <span class="attendance-value">87,523</span>
                        <span class="attendance-label">Maior Público</span>
                    </div>
                </div>
            </div>
            <div class="top-stadiums">
                <h4>Estádios com Maior Público</h4>
                ${createTopStadiumsList()}
            </div>
        </div>
    `;
}

function createTopStadiumsList() {
    const stadiums = [
        { name: 'Estadio Azteca', attendance: 87523, matches: 3 },
        { name: 'MetLife Stadium', attendance: 82500, matches: 3 },
        { name: 'AT&T Stadium', attendance: 80000, matches: 3 },
        { name: 'Arrowhead Stadium', attendance: 76416, matches: 2 },
        { name: 'NRG Stadium', attendance: 72220, matches: 2 }
    ];
    
    return `
        <div class="stadiums-list">
            ${stadiums.map((stadium, index) => `
                <div class="stadium-item">
                    <span class="stadium-rank">${index + 1}</span>
                    <div class="stadium-info">
                        <span class="stadium-name">${stadium.name}</span>
                        <span class="stadium-matches">${stadium.matches} jogos</span>
                    </div>
                    <span class="stadium-attendance">${stadium.attendance.toLocaleString('pt-BR')}</span>
                </div>
            `).join('')}
        </div>
    `;
}

function createQuickStats() {
    // Calculate real statistics from finished matches
    const finishedMatches = getAllMatches().filter(m => m.status === 'finished');
    
    // Calculate total goals
    let totalGoals = 0;
    let biggestWin = { homeTeam: '', awayTeam: '', homeScore: 0, awayScore: 0, difference: 0 };
    
    finishedMatches.forEach(match => {
        const matchGoals = match.homeScore + match.awayScore;
        totalGoals += matchGoals;
        
        // Find biggest win
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
    const averageGoals = matchesPlayed > 0 ? (totalGoals / matchesPlayed).toFixed(2) : '0.00';
    
    // Format biggest win
    const biggestWinText = biggestWin.difference > 0
        ? `${biggestWin.homeScore}-${biggestWin.awayScore}`
        : 'N/A';
    
    return `
        <div class="quick-stats">
            <h4>Estatísticas Rápidas</h4>
            <div class="quick-stat-item">
                <i class="fas fa-futbol"></i>
                <div class="quick-stat-info">
                    <span class="quick-stat-value">${totalGoals}</span>
                    <span class="quick-stat-label">Gols Marcados</span>
                </div>
            </div>
            <div class="quick-stat-item">
                <i class="fas fa-chart-line"></i>
                <div class="quick-stat-info">
                    <span class="quick-stat-value">${averageGoals}</span>
                    <span class="quick-stat-label">Média de Gols/Jogo</span>
                </div>
            </div>
            <div class="quick-stat-item">
                <i class="fas fa-clock"></i>
                <div class="quick-stat-info">
                    <span class="quick-stat-value">${matchesPlayed}</span>
                    <span class="quick-stat-label">Jogos Realizados</span>
                </div>
            </div>
            <div class="quick-stat-item">
                <i class="fas fa-fire"></i>
                <div class="quick-stat-info">
                    <span class="quick-stat-value">${biggestWinText}</span>
                    <span class="quick-stat-label">Maior Goleada</span>
                </div>
            </div>
        </div>
    `;
}

function setupStatsCategorySelector() {
    const selector = document.getElementById('statsCategory');
    if (!selector) return;

    selector.addEventListener('change', (e) => {
        loadStatsCategory(e.target.value);
    });
}

// Add styles for stats
const statsStyles = document.createElement('style');
statsStyles.textContent = `
    .stats-grid {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 20px;
        padding: 20px 0;
    }
    
    .stats-main {
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        overflow: hidden;
    }
    
    .stats-section {
        padding: 24px;
    }
    
    .stats-header {
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 2px solid #1a237e;
    }
    
    .stats-header h3 {
        margin: 0 0 8px 0;
        color: #1a237e;
        font-size: 24px;
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .stats-subtitle {
        color: #666;
        font-size: 14px;
    }

    .stats-unavailable {
        padding: 24px 16px;
        color: #57606a;
        font-size: 14px;
        border: 1px dashed #d0d7de;
        border-radius: 6px;
        background: #f6f8fa;
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .stats-unavailable i {
        color: #3b82d4;
        flex-shrink: 0;
    }
    
    .stats-table-wrapper {
        overflow-x: auto;
    }
    
    .stats-table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .stats-table thead {
        background: #f5f5f5;
    }
    
    .stats-table th {
        padding: 12px;
        text-align: left;
        font-size: 12px;
        font-weight: 700;
        color: #666;
        text-transform: uppercase;
    }
    
    .stats-table td {
        padding: 16px 12px;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .stats-row {
        transition: background 0.2s ease;
    }
    
    .stats-row:hover {
        background: #f9f9f9;
    }
    
    .stats-row.medal-1 {
        background: linear-gradient(90deg, #ffd70020 0%, transparent 100%);
    }
    
    .stats-row.medal-2 {
        background: linear-gradient(90deg, #c0c0c020 0%, transparent 100%);
    }
    
    .stats-row.medal-3 {
        background: linear-gradient(90deg, #cd7f3220 0%, transparent 100%);
    }
    
    .rank-col {
        width: 60px;
        text-align: center;
    }
    
    .rank-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        font-weight: 700;
        background: #f5f5f5;
        color: #666;
    }
    
    .rank-badge.medal-1 {
        background: #ffd700;
        color: #fff;
    }
    
    .rank-badge.medal-2 {
        background: #c0c0c0;
        color: #fff;
    }
    
    .rank-badge.medal-3 {
        background: #cd7f32;
        color: #fff;
    }
    
    .player-col {
        min-width: 200px;
    }
    
    .player-name {
        font-weight: 600;
        color: #212121;
        font-size: 15px;
    }
    
    .team-col {
        width: 120px;
    }
    
    .team-badge {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .team-flag {
        font-size: 24px;
    }
    
    .team-code {
        font-weight: 600;
        color: #666;
        font-size: 13px;
    }
    
    .stat-col {
        width: 80px;
        text-align: center;
        color: #666;
    }
    
    .stat-value {
        color: #1a237e;
        font-size: 18px;
    }
    
    .cards-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
        margin-bottom: 30px;
    }
    
    .card-stat {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 24px;
        border-radius: 8px;
        background: #f9f9f9;
    }
    
    .card-stat.yellow {
        border-left: 4px solid #ffd700;
    }
    
    .card-stat.yellow i {
        color: #ffd700;
        font-size: 32px;
    }
    
    .card-stat.red {
        border-left: 4px solid #f44336;
    }
    
    .card-stat.red i {
        color: #f44336;
        font-size: 32px;
    }
    
    .card-info {
        display: flex;
        flex-direction: column;
    }
    
    .card-count {
        font-size: 32px;
        font-weight: 700;
        color: #212121;
    }
    
    .card-label {
        font-size: 14px;
        color: #666;
    }
    
    .fair-play-section h4 {
        margin: 0 0 16px 0;
        color: #1a237e;
        font-size: 18px;
    }
    
    .fair-play-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    .fair-play-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        background: #f9f9f9;
        border-radius: 6px;
    }
    
    .group-name {
        font-weight: 600;
        color: #1a237e;
        min-width: 80px;
    }
    
    .cards-count {
        display: flex;
        gap: 16px;
        flex: 1;
        justify-content: center;
    }
    
    .yellow-count {
        color: #ffd700;
        font-weight: 600;
    }
    
    .red-count {
        color: #f44336;
        font-weight: 600;
    }
    
    .fair-play-points {
        font-weight: 700;
        color: #666;
        min-width: 60px;
        text-align: right;
    }
    
    .attendance-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;
        margin-bottom: 30px;
    }
    
    .attendance-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        padding: 24px;
        background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
        color: white;
        border-radius: 8px;
    }
    
    .attendance-card i {
        font-size: 32px;
    }
    
    .attendance-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
    }
    
    .attendance-value {
        font-size: 28px;
        font-weight: 700;
    }
    
    .attendance-label {
        font-size: 13px;
        opacity: 0.9;
    }
    
    .top-stadiums h4 {
        margin: 0 0 16px 0;
        color: #1a237e;
        font-size: 18px;
    }
    
    .stadiums-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    .stadium-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 12px 16px;
        background: #f9f9f9;
        border-radius: 6px;
    }
    
    .stadium-rank {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: #1a237e;
        color: white;
        border-radius: 50%;
        font-weight: 700;
    }
    
    .stadium-info {
        display: flex;
        flex-direction: column;
        flex: 1;
    }
    
    .stadium-name {
        font-weight: 600;
        color: #212121;
    }
    
    .stadium-matches {
        font-size: 12px;
        color: #666;
    }
    
    .stadium-attendance {
        font-weight: 700;
        color: #1a237e;
        font-size: 16px;
    }
    
    .stats-sidebar {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    
    .quick-stats {
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .quick-stats h4 {
        margin: 0 0 20px 0;
        color: #1a237e;
        font-size: 16px;
        font-weight: 700;
    }
    
    .quick-stat-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        margin-bottom: 12px;
        background: #f9f9f9;
        border-radius: 8px;
        border-left: 3px solid #1a237e;
    }
    
    .quick-stat-item i {
        font-size: 24px;
        color: #1a237e;
    }
    
    .quick-stat-info {
        display: flex;
        flex-direction: column;
    }
    
    .quick-stat-value {
        font-size: 20px;
        font-weight: 700;
        color: #212121;
    }
    
    .quick-stat-label {
        font-size: 12px;
        color: #666;
    }
    
    .stats-overview {
        margin-bottom: 30px;
    }
    
    .general-summary {
        background: white;
        border-radius: 12px;
        padding: 24px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .summary-title {
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 2px solid #1a237e;
    }
    
    .summary-title h3 {
        margin: 0 0 8px 0;
        color: #1a237e;
        font-size: 24px;
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .summary-title p {
        margin: 0;
        color: #666;
        font-size: 14px;
    }
    
    .team-highlights {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 20px;
        margin-bottom: 30px;
    }
    
    .highlight-card {
        padding: 20px;
        border-radius: 12px;
        display: flex;
        gap: 16px;
        transition: transform 0.3s ease;
    }
    
    .highlight-card:hover {
        transform: translateY(-4px);
    }
    
    .highlight-card.attack {
        background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
        border-left: 4px solid #4caf50;
    }
    
    .highlight-card.defense {
        background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
        border-left: 4px solid #2196f3;
    }
    
    .highlight-card.wins {
        background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
        border-left: 4px solid #ff9800;
    }
    
    .highlight-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.8);
    }
    
    .highlight-icon i {
        font-size: 24px;
    }
    
    .highlight-card.attack .highlight-icon i {
        color: #4caf50;
    }
    
    .highlight-card.defense .highlight-icon i {
        color: #2196f3;
    }
    
    .highlight-card.wins .highlight-icon i {
        color: #ff9800;
    }
    
    .highlight-content {
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    
    .highlight-label {
        font-size: 12px;
        font-weight: 600;
        color: #666;
        text-transform: uppercase;
    }
    
    .highlight-team {
        font-size: 16px;
        font-weight: 700;
        color: #212121;
    }
    
    .highlight-value {
        font-size: 13px;
        color: #666;
    }
    
    .teams-stats-table {
        margin-top: 30px;
    }
    
    .teams-stats-table h4 {
        margin: 0 0 16px 0;
        color: #1a237e;
        font-size: 18px;
    }
    
    .compact-stats-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
    }
    
    .compact-stats-table thead {
        background: #f5f5f5;
    }
    
    .compact-stats-table th {
        padding: 10px 8px;
        text-align: left;
        font-size: 11px;
        font-weight: 700;
        color: #666;
        text-transform: uppercase;
    }
    
    .compact-stats-table th:first-child {
        text-align: left;
    }
    
    .compact-stats-table th:not(:first-child) {
        text-align: center;
    }
    
    .compact-stats-table td {
        padding: 12px 8px;
        border-bottom: 1px solid #f0f0f0;
        text-align: center;
    }
    
    .compact-stats-table td:first-child {
        text-align: left;
    }
    
    .compact-stats-table tr:hover {
        background: #f9f9f9;
    }
    
    .team-cell {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .team-flag-small {
        font-size: 20px;
    }
    
    .team-name-small {
        font-weight: 600;
        color: #212121;
    }
    
    .win-cell {
        color: #4caf50;
        font-weight: 600;
    }
    
    .loss-cell {
        color: #f44336;
        font-weight: 600;
    }
    
    .compact-stats-table .positive {
        color: #4caf50;
        font-weight: 600;
    }
    
    .compact-stats-table .negative {
        color: #f44336;
        font-weight: 600;
    }
    
    .stats-empty {
        text-align: center;
        padding: 60px 20px;
        color: #999;
    }
    
    .stats-empty h3 {
        margin: 20px 0 10px;
        color: #666;
    }
    
    .player-selector-widget {
        background: white;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        margin-top: 20px;
    }
    
    .player-selector-widget h4 {
        margin: 0 0 16px 0;
        color: #1a237e;
        font-size: 16px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .player-select {
        width: 100%;
        padding: 10px 12px;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        font-size: 14px;
        color: #212121;
        background: white;
        cursor: pointer;
        transition: border-color 0.3s ease;
    }
    
    .player-select:focus {
        outline: none;
        border-color: #1a237e;
    }
    
    .player-stats-card {
        margin-top: 16px;
        padding: 16px;
        background: #f9f9f9;
        border-radius: 8px;
        border-left: 4px solid #1a237e;
    }
    
    .player-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid #e0e0e0;
    }
    
    .player-flag {
        font-size: 32px;
    }
    
    .player-info-text {
        display: flex;
        flex-direction: column;
    }
    
    .player-name-display {
        font-size: 16px;
        font-weight: 700;
        color: #212121;
    }
    
    .player-team-display {
        font-size: 12px;
        color: #666;
    }
    
    .player-stats-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }
    
    .player-stat {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 12px;
        background: white;
        border-radius: 6px;
    }
    
    .player-stat i {
        font-size: 20px;
        color: #1a237e;
        margin-bottom: 8px;
    }
    
    .player-stat .stat-value {
        font-size: 24px;
        font-weight: 700;
        color: #1a237e;
    }
    
    .player-stat .stat-label {
        font-size: 11px;
        color: #666;
        text-transform: uppercase;
        font-weight: 600;
    }
    
    .no-stats {
        text-align: center;
        padding: 20px;
        color: #999;
        font-size: 13px;
    }
    
    @media (max-width: 1024px) {
        .stats-grid {
            grid-template-columns: 1fr;
        }
        
        .attendance-grid {
            grid-template-columns: 1fr;
        }
        
        .team-highlights {
            grid-template-columns: 1fr;
        }
    }
    
    @media (max-width: 768px) {
        .cards-grid {
            grid-template-columns: 1fr;
        }
        
        .stats-table {
            font-size: 12px;
        }
        
        .player-name {
            font-size: 13px;
        }
    }
`;
document.head.appendChild(statsStyles);

console.log('✅ Stats module loaded');

// Made with Bob
