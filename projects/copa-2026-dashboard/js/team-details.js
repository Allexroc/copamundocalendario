// FIFA World Cup 2026 - Team Details Module
// Handles detailed team information display

// Simulated team data with statistics, lineups, and match history
const TEAM_DETAILS_DATA = {
    "BRA": {
        statistics: {
            fifaRanking: 1,
            titles: 5,
            appearances: 22,
            topScorer: "Neymar Jr.",
            coach: "Dorival Júnior"
        },
        lineup: {
            formation: "4-3-3",
            goalkeeper: { name: "Alisson Becker", number: 1, club: "Liverpool" },
            defenders: [
                { name: "Danilo", number: 2, position: "LD", club: "Juventus" },
                { name: "Marquinhos", number: 3, position: "ZAG", club: "PSG" },
                { name: "Gabriel Magalhães", number: 4, position: "ZAG", club: "Arsenal" },
                { name: "Guilherme Arana", number: 6, position: "LE", club: "Atlético-MG" }
            ],
            midfielders: [
                { name: "Bruno Guimarães", number: 5, position: "VOL", club: "Newcastle" },
                { name: "Lucas Paquetá", number: 8, position: "MEI", club: "West Ham" },
                { name: "Raphinha", number: 11, position: "ATA", club: "Barcelona" }
            ],
            forwards: [
                { name: "Vinícius Jr.", number: 7, position: "PE", club: "Real Madrid" },
                { name: "Richarlison", number: 9, position: "CA", club: "Tottenham" },
                { name: "Rodrygo", number: 10, position: "PD", club: "Real Madrid" }
            ]
        }
    },
    "ARG": {
        statistics: {
            fifaRanking: 2,
            titles: 3,
            appearances: 18,
            topScorer: "Lionel Messi",
            coach: "Lionel Scaloni"
        },
        lineup: {
            formation: "4-4-2",
            goalkeeper: { name: "Emiliano Martínez", number: 23, club: "Aston Villa" },
            defenders: [
                { name: "Nahuel Molina", number: 26, position: "LD", club: "Atlético Madrid" },
                { name: "Cristian Romero", number: 13, position: "ZAG", club: "Tottenham" },
                { name: "Nicolás Otamendi", number: 19, position: "ZAG", club: "Benfica" },
                { name: "Nicolás Tagliafico", number: 3, position: "LE", club: "Lyon" }
            ],
            midfielders: [
                { name: "Rodrigo De Paul", number: 7, position: "MC", club: "Atlético Madrid" },
                { name: "Enzo Fernández", number: 24, position: "MC", club: "Chelsea" },
                { name: "Alexis Mac Allister", number: 20, position: "MC", club: "Liverpool" },
                { name: "Ángel Di María", number: 11, position: "ATA", club: "Benfica" }
            ],
            forwards: [
                { name: "Lionel Messi", number: 10, position: "CA", club: "Inter Miami" },
                { name: "Julián Álvarez", number: 9, position: "CA", club: "Manchester City" }
            ]
        }
    },
    // Add more teams as needed
};

function showTeamDetails(teamCode) {
    const team = getTeamInfo(teamCode);
    if (!team) return;

    const teamData = TEAM_DETAILS_DATA[teamCode];
    const matches = getMatchesByTeam(teamCode);
    const pastMatches = matches.filter(m => m.status === 'finished');
    const upcomingMatches = matches.filter(m => m.status === 'scheduled');

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'team-details-modal';
    modal.innerHTML = `
        <div class="team-details-content">
            <div class="team-details-header">
                <div class="team-header-info">
                    <span class="team-header-flag">${(team || { flag: '🏳️' }).flag}</span>
                    <h2>${(team || { name: teamCode }).name}</h2>
                </div>
                <button class="close-modal" onclick="closeTeamDetailsModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="team-details-body">
                ${teamData ? createTeamStatistics(teamData.statistics) : '<p>Dados estatísticos não disponíveis</p>'}
                ${teamData ? createTeamLineup(teamData.lineup) : ''}
                ${pastMatches.length > 0 ? createPastMatches(pastMatches, teamCode) : ''}
                ${upcomingMatches.length > 0 ? createUpcomingMatches(upcomingMatches, teamCode) : ''}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

function createTeamStatistics(stats) {
    return `
        <div class="team-section">
            <h3><i class="fas fa-chart-line"></i> Estatísticas</h3>
            <div class="stats-grid">
                <div class="stat-card">
                    <i class="fas fa-trophy"></i>
                    <div class="stat-info">
                        <span class="stat-value">${stats.titles}</span>
                        <span class="stat-label">Títulos Mundiais</span>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-ranking-star"></i>
                    <div class="stat-info">
                        <span class="stat-value">#${stats.fifaRanking}</span>
                        <span class="stat-label">Ranking FIFA</span>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-calendar-check"></i>
                    <div class="stat-info">
                        <span class="stat-value">${stats.appearances}</span>
                        <span class="stat-label">Participações</span>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-futbol"></i>
                    <div class="stat-info">
                        <span class="stat-value">${stats.topScorer}</span>
                        <span class="stat-label">Artilheiro Histórico</span>
                    </div>
                </div>
                <div class="stat-card">
                    <i class="fas fa-user-tie"></i>
                    <div class="stat-info">
                        <span class="stat-value">${stats.coach}</span>
                        <span class="stat-label">Técnico</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createTeamLineup(lineup) {
    return `
        <div class="team-section">
            <h3><i class="fas fa-users"></i> Escalação Titular (${lineup.formation})</h3>
            <div class="lineup-container">
                <div class="lineup-group">
                    <h4>Goleiro</h4>
                    <div class="player-card">
                        <span class="player-number">${lineup.goalkeeper.number}</span>
                        <div class="player-info">
                            <span class="player-name">${lineup.goalkeeper.name}</span>
                            <span class="player-club">${lineup.goalkeeper.club}</span>
                        </div>
                    </div>
                </div>
                
                <div class="lineup-group">
                    <h4>Defensores</h4>
                    <div class="players-grid">
                        ${lineup.defenders.map(player => `
                            <div class="player-card">
                                <span class="player-number">${player.number}</span>
                                <div class="player-info">
                                    <span class="player-name">${player.name}</span>
                                    <span class="player-position">${player.position}</span>
                                    <span class="player-club">${player.club}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="lineup-group">
                    <h4>Meio-campistas</h4>
                    <div class="players-grid">
                        ${lineup.midfielders.map(player => `
                            <div class="player-card">
                                <span class="player-number">${player.number}</span>
                                <div class="player-info">
                                    <span class="player-name">${player.name}</span>
                                    <span class="player-position">${player.position}</span>
                                    <span class="player-club">${player.club}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="lineup-group">
                    <h4>Atacantes</h4>
                    <div class="players-grid">
                        ${lineup.forwards.map(player => `
                            <div class="player-card">
                                <span class="player-number">${player.number}</span>
                                <div class="player-info">
                                    <span class="player-name">${player.name}</span>
                                    <span class="player-position">${player.position}</span>
                                    <span class="player-club">${player.club}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function createPastMatches(matches, teamCode) {
    return `
        <div class="team-section">
            <h3><i class="fas fa-history"></i> Jogos Realizados</h3>
            <div class="matches-list">
                ${matches.map(match => {
                    const isHome = match.homeTeam === teamCode;
                    const opponent = (isHome ? getTeamInfo(match.awayTeam) : getTeamInfo(match.homeTeam)) || {
                        flag: '🏳️',
                        name: isHome ? match.awayTeam : match.homeTeam
                    };
                    const teamScore = isHome ? match.homeScore : match.awayScore;
                    const opponentScore = isHome ? match.awayScore : match.homeScore;
                    const result = teamScore > opponentScore ? 'win' : teamScore < opponentScore ? 'loss' : 'draw';
                    
                    return `
                        <div class="match-result-card ${result}">
                            <div class="match-result-badge">${result === 'win' ? 'V' : result === 'loss' ? 'D' : 'E'}</div>
                            <div class="match-result-info">
                                <div class="match-opponent">
                                    <span class="opponent-flag">${opponent.flag}</span>
                                    <span class="opponent-name">${opponent.name}</span>
                                </div>
                                <div class="match-score">${teamScore} × ${opponentScore}</div>
                                <div class="match-date">${new Date(match.date).toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: 'short',
                                    timeZone: 'America/Sao_Paulo'
                                })}</div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function createUpcomingMatches(matches, teamCode) {
    return `
        <div class="team-section">
            <h3><i class="fas fa-calendar-alt"></i> Próximos Jogos</h3>
            <div class="matches-list">
                ${matches.map(match => {
                    const isHome = match.homeTeam === teamCode;
                    const opponent = (isHome ? getTeamInfo(match.awayTeam) : getTeamInfo(match.homeTeam)) || {
                        flag: '🏳️',
                        name: isHome ? match.awayTeam : match.homeTeam
                    };
                    const matchDate = new Date(match.date);
                    
                    return `
                        <div class="upcoming-match-card">
                            <div class="match-datetime">
                                <i class="fas fa-clock"></i>
                                ${matchDate.toLocaleDateString('pt-BR', {
                                    day: '2-digit',
                                    month: 'short',
                                    timeZone: 'America/Sao_Paulo'
                                })} ${matchDate.toLocaleTimeString('pt-BR', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    timeZone: 'America/Sao_Paulo'
                                })}
                            </div>
                            <div class="match-opponent">
                                <span class="opponent-flag">${opponent.flag}</span>
                                <span class="opponent-name">${opponent.name}</span>
                                <span class="match-location">${isHome ? '(Casa)' : '(Fora)'}</span>
                            </div>
                            <div class="match-stadium">
                                <i class="fas fa-map-marker-alt"></i> ${match.stadium}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function closeTeamDetailsModal() {
    const modal = document.querySelector('.team-details-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Add styles for team details modal
const teamDetailsStyles = document.createElement('style');
teamDetailsStyles.textContent = `
    .team-details-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 20px;
        overflow-y: auto;
    }
    
    .team-details-modal.active {
        opacity: 1;
    }
    
    .team-details-content {
        background: white;
        border-radius: 16px;
        max-width: 1000px;
        width: 100%;
        max-height: 90vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .team-details-modal.active .team-details-content {
        transform: scale(1);
    }
    
    .team-details-header {
        padding: 24px;
        background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 3px solid #ffd700;
    }
    
    .team-header-info {
        display: flex;
        align-items: center;
        gap: 16px;
    }
    
    .team-header-flag {
        font-size: 48px;
    }
    
    .team-details-header h2 {
        margin: 0;
        font-size: 28px;
    }
    
    .team-details-body {
        padding: 24px;
        overflow-y: auto;
        flex: 1;
    }
    
    .team-section {
        margin-bottom: 32px;
    }
    
    .team-section:last-child {
        margin-bottom: 0;
    }
    
    .team-section h3 {
        margin: 0 0 20px 0;
        font-size: 20px;
        color: #1a237e;
        display: flex;
        align-items: center;
        gap: 10px;
        padding-bottom: 12px;
        border-bottom: 2px solid #e0e0e0;
    }
    
    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
    }
    
    .stat-card {
        background: #f5f5f5;
        padding: 20px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 16px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .stat-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .stat-card i {
        font-size: 32px;
        color: #1a237e;
    }
    
    .stat-info {
        display: flex;
        flex-direction: column;
    }
    
    .stat-value {
        font-size: 24px;
        font-weight: 700;
        color: #1a237e;
    }
    
    .stat-label {
        font-size: 12px;
        color: #666;
        text-transform: uppercase;
    }
    
    .lineup-container {
        display: flex;
        flex-direction: column;
        gap: 24px;
    }
    
    .lineup-group h4 {
        margin: 0 0 12px 0;
        font-size: 16px;
        color: #666;
        text-transform: uppercase;
    }
    
    .players-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 12px;
    }
    
    .player-card {
        background: #f9f9f9;
        padding: 12px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 12px;
        border-left: 3px solid #1a237e;
    }
    
    .player-number {
        font-size: 24px;
        font-weight: 700;
        color: #1a237e;
        min-width: 40px;
        text-align: center;
    }
    
    .player-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
    
    .player-name {
        font-weight: 600;
        color: #212121;
    }
    
    .player-position {
        font-size: 11px;
        color: #666;
        text-transform: uppercase;
    }
    
    .player-club {
        font-size: 12px;
        color: #999;
    }
    
    .matches-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    .match-result-card {
        background: #f9f9f9;
        padding: 16px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 16px;
        border-left: 4px solid #ccc;
    }
    
    .match-result-card.win {
        border-left-color: #4caf50;
        background: #e8f5e9;
    }
    
    .match-result-card.loss {
        border-left-color: #f44336;
        background: #ffebee;
    }
    
    .match-result-card.draw {
        border-left-color: #ff9800;
        background: #fff3e0;
    }
    
    .match-result-badge {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 18px;
        color: white;
        background: #ccc;
    }
    
    .match-result-card.win .match-result-badge {
        background: #4caf50;
    }
    
    .match-result-card.loss .match-result-badge {
        background: #f44336;
    }
    
    .match-result-card.draw .match-result-badge {
        background: #ff9800;
    }
    
    .match-result-info {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .match-opponent {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .opponent-flag {
        font-size: 24px;
    }
    
    .opponent-name {
        font-weight: 600;
        color: #212121;
    }
    
    .match-score {
        font-size: 20px;
        font-weight: 700;
        color: #1a237e;
    }
    
    .match-date {
        font-size: 12px;
        color: #666;
    }
    
    .upcoming-match-card {
        background: white;
        border: 2px solid #e0e0e0;
        padding: 16px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    .match-datetime {
        font-size: 13px;
        color: #1a237e;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    
    .match-location {
        font-size: 12px;
        color: #666;
        font-style: italic;
    }
    
    .match-stadium {
        font-size: 12px;
        color: #666;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    
    @media (max-width: 768px) {
        .team-details-modal {
            padding: 0;
        }
        
        .team-details-content {
            max-width: 100%;
            max-height: 100vh;
            border-radius: 0;
        }
        
        .team-header-flag {
            font-size: 36px;
        }
        
        .team-details-header h2 {
            font-size: 22px;
        }
        
        .stats-grid {
            grid-template-columns: 1fr;
        }
        
        .players-grid {
            grid-template-columns: 1fr;
        }
    }
`;
document.head.appendChild(teamDetailsStyles);

console.log('✅ Team Details module loaded');

// Made with Bob