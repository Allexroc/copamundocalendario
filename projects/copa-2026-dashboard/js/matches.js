// FIFA World Cup 2026 - Matches Management
// Handles calendar and results display

let currentView = 'list';
let filteredMatches = [];

function renderCalendar() {
    const container = document.getElementById('calendarContainer');
    if (!container) return;

    filteredMatches = getAllMatches();
    
    if (currentView === 'list') {
        renderListView(container);
    } else {
        renderGridView(container);
    }

    setupViewToggle();
}

function renderListView(container) {
    const matchesByDate = groupMatchesByDate(filteredMatches);
    
    container.innerHTML = '';
    
    Object.keys(matchesByDate).sort().forEach(date => {
        const dateSection = createDateSection(date, matchesByDate[date]);
        container.appendChild(dateSection);
    });
}

function renderGridView(container) {
    container.innerHTML = `
        <div class="matches-grid">
            ${filteredMatches.map(match => createMatchCard(match)).join('')}
        </div>
    `;
}

function createDateSection(date, matches) {
    const section = document.createElement('div');
    section.className = 'date-section';
    
    const dateObj = new Date(date);
    const formattedDate = formatDate(dateObj);
    
    section.innerHTML = `
        <div class="date-header">
            <i class="fas fa-calendar-day"></i>
            <h3>${formattedDate}</h3>
            <span class="match-count">${matches.length} ${matches.length === 1 ? 'jogo' : 'jogos'}</span>
        </div>
        <div class="matches-list">
            ${matches.map(match => createMatchCard(match)).join('')}
        </div>
    `;
    
    return section;
}

function createMatchCard(match) {
    const homeTeam = getTeamInfo(match.homeTeam);
    const awayTeam = getTeamInfo(match.awayTeam);
    const stadium = WORLD_CUP_2026.stadiums[match.stadium];
    const time = new Date(match.date).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    const statusClass = match.status === 'finished' ? 'finished' : match.status === 'live' ? 'live' : 'scheduled';
    const statusText = match.status === 'finished' ? 'Encerrado' : match.status === 'live' ? 'AO VIVO' : time;
    
    return `
        <div class="match-card ${statusClass}" data-match-id="${match.id}">
            <div class="match-header">
                <span class="match-group">Grupo ${match.group}</span>
                <span class="match-status ${statusClass}">${statusText}</span>
            </div>
            <div class="match-body">
                <div class="team home-team">
                    <span class="team-flag">${homeTeam.flag}</span>
                    <span class="team-name clickable-team" data-team="${match.homeTeam}" onclick="showLineupModal('${match.homeTeam}')" title="Ver escalação">${homeTeam.name}</span>
                </div>
                <div class="match-score">
                    ${match.status === 'finished' || match.status === 'live' ? `
                        <span class="score">${match.homeScore} - ${match.awayScore}</span>
                    ` : `
                        <span class="vs">VS</span>
                    `}
                </div>
                <div class="team away-team">
                    <span class="team-flag">${awayTeam.flag}</span>
                    <span class="team-name clickable-team" data-team="${match.awayTeam}" onclick="showLineupModal('${match.awayTeam}')" title="Ver escalação">${awayTeam.name}</span>
                </div>
            </div>
            <div class="match-footer">
                <div class="match-venue">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${match.stadium}</span>
                </div>
                <div class="match-location">
                    <i class="fas fa-city"></i>
                    <span>${stadium.city}, ${stadium.country}</span>
                </div>
            </div>
            ${match.status === 'finished' ? `
                <div class="match-details-link">
                    <button class="btn-match-details" onclick="showMatchDetails(${match.id})" title="Ver detalhes da partida">
                        <i class="fas fa-chart-line"></i> Ver Estatísticas
                    </button>
                </div>
            ` : ''}
        </div>
    `;
}

function renderResults() {
    const container = document.getElementById('resultsContainer');
    if (!container) return;

    const finishedMatches = getAllMatches().filter(m => m.status === 'finished');
    
    if (finishedMatches.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-futbol" style="font-size: 48px; color: #ccc;"></i>
                <h3>Nenhum resultado disponível</h3>
                <p>Os resultados dos jogos aparecerão aqui após serem finalizados.</p>
            </div>
        `;
        return;
    }

    // Create summary section
    const summaryHTML = createResultsSummary(finishedMatches);
    
    const matchesByDate = groupMatchesByDate(finishedMatches);
    
    container.innerHTML = summaryHTML;
    
    // Add detailed results
    Object.keys(matchesByDate).sort().reverse().forEach(date => {
        const dateSection = createResultsDateSection(date, matchesByDate[date]);
        container.appendChild(dateSection);
    });
}

function createResultsSummary(matches) {
    // Get last 5 matches
    const recentMatches = matches
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
    
    // Calculate statistics
    let totalGoals = 0;
    let highestScore = 0;
    let biggestWin = { match: null, difference: 0 };
    
    matches.forEach(match => {
        const goals = match.homeScore + match.awayScore;
        totalGoals += goals;
        
        if (goals > highestScore) {
            highestScore = goals;
        }
        
        const difference = Math.abs(match.homeScore - match.awayScore);
        if (difference > biggestWin.difference) {
            biggestWin = { match, difference };
        }
    });
    
    const avgGoals = (totalGoals / matches.length).toFixed(1);
    
    return `
        <div class="results-summary">
            <div class="summary-header">
                <h3><i class="fas fa-chart-line"></i> Resumo dos Resultados</h3>
            </div>
            
            <div class="summary-stats">
                <div class="summary-stat-card">
                    <i class="fas fa-futbol"></i>
                    <div class="summary-stat-info">
                        <span class="summary-stat-value">${matches.length}</span>
                        <span class="summary-stat-label">Jogos Finalizados</span>
                    </div>
                </div>
                <div class="summary-stat-card">
                    <i class="fas fa-bullseye"></i>
                    <div class="summary-stat-info">
                        <span class="summary-stat-value">${totalGoals}</span>
                        <span class="summary-stat-label">Gols Marcados</span>
                    </div>
                </div>
                <div class="summary-stat-card">
                    <i class="fas fa-chart-bar"></i>
                    <div class="summary-stat-info">
                        <span class="summary-stat-value">${avgGoals}</span>
                        <span class="summary-stat-label">Média de Gols/Jogo</span>
                    </div>
                </div>
                <div class="summary-stat-card">
                    <i class="fas fa-fire"></i>
                    <div class="summary-stat-info">
                        <span class="summary-stat-value">${highestScore}</span>
                        <span class="summary-stat-label">Mais Gols em um Jogo</span>
                    </div>
                </div>
            </div>
            
            <div class="recent-matches-section">
                <h4><i class="fas fa-clock"></i> Últimos Resultados</h4>
                <div class="recent-matches-grid">
                    ${recentMatches.map(match => createCompactResultCard(match)).join('')}
                </div>
            </div>
        </div>
    `;
}

function createCompactResultCard(match) {
    const homeTeam = getTeamInfo(match.homeTeam);
    const awayTeam = getTeamInfo(match.awayTeam);
    const homeWon = match.homeScore > match.awayScore;
    const awayWon = match.awayScore > match.homeScore;
    const matchDate = new Date(match.date);
    const dateStr = matchDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    
    return `
        <div class="compact-result-card">
            <div class="compact-result-date">${dateStr} - Grupo ${match.group}</div>
            <div class="compact-result-teams">
                <div class="compact-team ${homeWon ? 'winner' : ''}">
                    <span class="compact-flag">${homeTeam.flag}</span>
                    <span class="compact-name">${homeTeam.name}</span>
                    <span class="compact-score">${match.homeScore}</span>
                </div>
                <div class="compact-team ${awayWon ? 'winner' : ''}">
                    <span class="compact-flag">${awayTeam.flag}</span>
                    <span class="compact-name">${awayTeam.name}</span>
                    <span class="compact-score">${match.awayScore}</span>
                </div>
            </div>
        </div>
    `;
}

function createResultsDateSection(date, matches) {
    const section = document.createElement('div');
    section.className = 'results-date-section';
    
    const dateObj = new Date(date);
    const formattedDate = formatDate(dateObj);
    
    section.innerHTML = `
        <div class="results-date-header">
            <h3>${formattedDate}</h3>
        </div>
        <div class="results-grid">
            ${matches.map(match => createResultCard(match)).join('')}
        </div>
    `;
    
    return section;
}

function createResultCard(match) {
    const homeTeam = getTeamInfo(match.homeTeam);
    const awayTeam = getTeamInfo(match.awayTeam);
    const homeWon = match.homeScore > match.awayScore;
    const awayWon = match.awayScore > match.homeScore;
    const draw = match.homeScore === match.awayScore;
    
    return `
        <div class="result-card" data-match-id="${match.id}">
            <div class="result-header">
                <span class="result-group">Grupo ${match.group}</span>
                <span class="result-stadium">${match.stadium}</span>
            </div>
            <div class="result-body">
                <div class="result-team ${homeWon ? 'winner' : ''}">
                    <span class="team-flag">${homeTeam.flag}</span>
                    <span class="team-name">${homeTeam.name}</span>
                    <span class="team-score">${match.homeScore}</span>
                </div>
                <div class="result-separator"></div>
                <div class="result-team ${awayWon ? 'winner' : ''}">
                    <span class="team-flag">${awayTeam.flag}</span>
                    <span class="team-name">${awayTeam.name}</span>
                    <span class="team-score">${match.awayScore}</span>
                </div>
            </div>
            ${draw ? '<div class="result-draw-badge">Empate</div>' : ''}
        </div>
    `;
}

function groupMatchesByDate(matches) {
    const grouped = {};
    
    matches.forEach(match => {
        const date = match.date.split('T')[0];
        if (!grouped[date]) {
            grouped[date] = [];
        }
        grouped[date].push(match);
    });
    
    return grouped;
}

function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
}

function setupViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            currentView = view;
            
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            renderCalendar();
        });
    });
}

// Add styles for matches
const matchStyles = document.createElement('style');
matchStyles.textContent = `
    .calendar-container, .results-container {
        padding: 20px 0;
    }
    
    .date-section {
        margin-bottom: 30px;
    }
    
    .date-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
        background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
        color: white;
        border-radius: 8px;
        margin-bottom: 16px;
    }
    
    .date-header h3 {
        margin: 0;
        font-size: 18px;
        flex: 1;
        text-transform: capitalize;
    }
    
    .match-count {
        background: rgba(255,255,255,0.2);
        padding: 4px 12px;
        border-radius: 12px;
        font-size: 13px;
        font-weight: 500;
    }
    
    .matches-list {
        display: grid;
        gap: 16px;
    }
    
    .matches-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 20px;
    }
    
    .match-card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .match-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .match-card.live {
        border: 2px solid #f44336;
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { box-shadow: 0 2px 8px rgba(244, 67, 54, 0.3); }
        50% { box-shadow: 0 4px 16px rgba(244, 67, 54, 0.6); }
    }
    
    .match-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: #f5f5f5;
        border-bottom: 1px solid #e0e0e0;
    }
    
    .match-group {
        font-size: 13px;
        font-weight: 600;
        color: #1a237e;
    }
    
    .match-status {
        font-size: 12px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 12px;
    }
    
    .match-status.finished {
        background: #e8f5e9;
        color: #2e7d32;
    }
    
    .match-status.live {
        background: #f44336;
        color: white;
        animation: blink 1.5s infinite;
    }
    
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.7; }
    }
    
    .match-status.scheduled {
        background: #e3f2fd;
        color: #1565c0;
    }
    
    .match-body {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
        gap: 16px;
        padding: 24px 16px;
    }
    
    .team {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }
    
    .team-flag {
        font-size: 40px;
    }
    
    .team-name {
        font-size: 14px;
        font-weight: 600;
        color: #212121;
        text-align: center;
    }
    
    .match-score {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .score {
        font-size: 32px;
        font-weight: 700;
        color: #1a237e;
        font-family: 'Roboto Mono', monospace;
    }
    
    .vs {
        font-size: 18px;
        font-weight: 600;
        color: #999;
    }
    
    .match-footer {
        padding: 12px 16px;
        background: #fafafa;
        border-top: 1px solid #e0e0e0;
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    
    .match-venue, .match-location {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        color: #666;
    }
    
    .match-venue i, .match-location i {
        color: #1a237e;
        width: 16px;
    }
    
    .results-date-section {
        margin-bottom: 30px;
    }
    
    .results-date-header {
        padding: 12px 20px;
        background: #f5f5f5;
        border-left: 4px solid #1a237e;
        margin-bottom: 16px;
    }
    
    .results-date-header h3 {
        margin: 0;
        font-size: 16px;
        color: #1a237e;
        text-transform: capitalize;
    }
    
    .results-grid {
        display: grid;
        gap: 16px;
    }
    
    .result-card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        overflow: hidden;
        transition: transform 0.3s ease;
    }
    
    .result-card:hover {
        transform: translateX(4px);
    }
    
    .result-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 16px;
        background: #f9f9f9;
        border-bottom: 1px solid #e0e0e0;
    }
    
    .result-group {
        font-size: 13px;
        font-weight: 600;
        color: #1a237e;
    }
    
    .result-stadium {
        font-size: 12px;
        color: #666;
    }
    
    .result-body {
        padding: 20px 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    
    .result-team {
        display: grid;
        grid-template-columns: 40px 1fr auto;
        align-items: center;
        gap: 12px;
        padding: 8px;
        border-radius: 6px;
        transition: background 0.2s ease;
    }
    
    .result-team.winner {
        background: #e8f5e9;
    }
    
    .result-team .team-score {
        font-size: 24px;
        font-weight: 700;
        color: #1a237e;
        font-family: 'Roboto Mono', monospace;
    }
    
    .result-team.winner .team-score {
        color: #2e7d32;
    }
    
    .result-separator {
        height: 1px;
        background: #e0e0e0;
        margin: 0 8px;
    }
    
    .result-draw-badge {
        text-align: center;
        padding: 8px;
        background: #fff3e0;
        color: #e65100;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .empty-state {
        text-align: center;
        padding: 60px 20px;
        color: #999;
    }
    
    .empty-state h3 {
        margin: 20px 0 10px;
        color: #666;
    }
    
    .view-toggle {
        display: flex;
        gap: 8px;
        background: #f5f5f5;
        padding: 4px;
        border-radius: 8px;
    }
    
    .view-btn {
        padding: 8px 16px;
        background: transparent;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        color: #666;
        transition: all 0.3s ease;
    }
    
    .view-btn:hover {
        background: rgba(26, 35, 126, 0.1);
        color: #1a237e;
    }
    
    .view-btn.active {
        background: #1a237e;
        color: white;
    }
    
    @media (max-width: 768px) {
        .matches-grid {
            grid-template-columns: 1fr;
        }
        
        .match-body {
            padding: 16px 12px;
        }
        
        .team-flag {
            font-size: 32px;
        }
        
        .team-name {
            font-size: 12px;
        }
        
        .score {
            font-size: 24px;
        }
    }
    
    .results-summary {
        background: white;
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 30px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .summary-header {
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 2px solid #1a237e;
    }
    
    .summary-header h3 {
        margin: 0;
        color: #1a237e;
        font-size: 22px;
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .summary-stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
        margin-bottom: 30px;
    }
    
    .summary-stat-card {
        background: linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%);
        padding: 20px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 16px;
        transition: transform 0.3s ease;
    }
    
    .summary-stat-card:hover {
        transform: translateY(-4px);
    }
    
    .summary-stat-card i {
        font-size: 32px;
        color: #1a237e;
    }
    
    .summary-stat-info {
        display: flex;
        flex-direction: column;
    }
    
    .summary-stat-value {
        font-size: 28px;
        font-weight: 700;
        color: #1a237e;
    }
    
    .summary-stat-label {
        font-size: 12px;
        color: #666;
        font-weight: 600;
    }
    
    .recent-matches-section h4 {
        margin: 0 0 16px 0;
        color: #1a237e;
        font-size: 18px;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .recent-matches-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 16px;
    }
    
    .compact-result-card {
        background: #f9f9f9;
        border-radius: 8px;
        padding: 16px;
        border-left: 4px solid #1a237e;
        transition: transform 0.2s ease;
    }
    
    .compact-result-card:hover {
        transform: translateX(4px);
        background: #f0f0f0;
    }
    
    .compact-result-date {
        font-size: 11px;
        color: #666;
        font-weight: 600;
        margin-bottom: 12px;
        text-transform: uppercase;
    }
    
    .compact-result-teams {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .compact-team {
        display: grid;
        grid-template-columns: 32px 1fr auto;
        align-items: center;
        gap: 10px;
        padding: 8px;
        border-radius: 6px;
        transition: background 0.2s ease;
    }
    
    .compact-team.winner {
        background: #e8f5e9;
        font-weight: 600;
    }
    
    .compact-flag {
        font-size: 24px;
    }
    
    .compact-name {
        font-size: 14px;
        color: #212121;
    }
    
    .compact-score {
        font-size: 20px;
        font-weight: 700;
        color: #1a237e;
        font-family: 'Roboto Mono', monospace;
    }
    
    .compact-team.winner .compact-score {
        color: #2e7d32;
    }
    
    @media (max-width: 768px) {
        .summary-stats {
            grid-template-columns: repeat(2, 1fr);
        }
        
        .recent-matches-grid {
            grid-template-columns: 1fr;
        }
    }
    .clickable-team {
        cursor: pointer;
        transition: all 0.3s ease;
        padding: 4px 8px;
        border-radius: 4px;
    }
    
    .clickable-team:hover {
        background: rgba(26, 35, 126, 0.1);
        color: #1a237e;
        transform: scale(1.05);
    }
    
    .match-details-link {
        padding: 12px 16px;
        background: #f5f5f5;
        border-top: 1px solid #e0e0e0;
        text-align: center;
    }
    
    .btn-match-details {
        background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 600;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 8px;
    }
    
    .btn-match-details:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(26, 35, 126, 0.3);
    }
    
    .btn-match-details i {
        font-size: 16px;
    }
`;
document.head.appendChild(matchStyles);

// Function to show detailed match statistics
function showMatchDetails(matchId) {
    const match = getAllMatches().find(m => m.id === matchId);
    if (!match || match.status !== 'finished') {
        alert('Estatísticas disponíveis apenas para jogos finalizados.');
        return;
    }
    
    const homeTeam = getTeamInfo(match.homeTeam);
    const awayTeam = getTeamInfo(match.awayTeam);
    const homeLineup = getTeamLineup(match.homeTeam);
    const awayLineup = getTeamLineup(match.awayTeam);
    
    // Generate realistic match statistics
    const stats = generateMatchStatistics(match);
    
    const modal = document.createElement('div');
    modal.className = 'match-details-modal';
    modal.innerHTML = `
        <div class="match-details-overlay" onclick="closeMatchDetailsModal()"></div>
        <div class="match-details-content">
            <div class="match-details-header">
                <h2><i class="fas fa-chart-line"></i> Estatísticas da Partida</h2>
                <button class="match-details-close" onclick="closeMatchDetailsModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="match-details-score">
                <div class="match-details-team">
                    <span class="team-flag-large">${homeTeam.flag}</span>
                    <h3>${homeTeam.name}</h3>
                </div>
                <div class="match-details-result">
                    <span class="final-score">${match.homeScore} - ${match.awayScore}</span>
                    <span class="match-date">${new Date(match.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div class="match-details-team">
                    <span class="team-flag-large">${awayTeam.flag}</span>
                    <h3>${awayTeam.name}</h3>
                </div>
            </div>
            
            <div class="match-details-body">
                <div class="stats-comparison">
                    <h3><i class="fas fa-chart-bar"></i> Estatísticas do Jogo</h3>
                    ${createStatComparison('Posse de Bola', stats.possession.home, stats.possession.away, '%')}
                    ${createStatComparison('Finalizações', stats.shots.home, stats.shots.away)}
                    ${createStatComparison('Chutes no Gol', stats.shotsOnTarget.home, stats.shotsOnTarget.away)}
                    ${createStatComparison('Escanteios', stats.corners.home, stats.corners.away)}
                    ${createStatComparison('Faltas', stats.fouls.home, stats.fouls.away)}
                    ${createStatComparison('Cartões Amarelos', stats.yellowCards.home, stats.yellowCards.away)}
                    ${createStatComparison('Cartões Vermelhos', stats.redCards.home, stats.redCards.away)}
                    ${createStatComparison('Passes Certos', stats.passes.home, stats.passes.away)}
                </div>
                
                <div class="lineups-section">
                    <h3><i class="fas fa-users"></i> Escalações</h3>
                    <div class="lineups-grid">
                        <div class="lineup-column">
                            <h4>${homeTeam.flag} ${homeTeam.name}</h4>
                            <p class="formation-text"><i class="fas fa-chess-board"></i> ${homeLineup ? homeLineup.formation : '4-3-3'}</p>
                            <div class="lineup-list">
                                ${homeLineup ? homeLineup.startingXI.map(p => `
                                    <div class="lineup-item">
                                        <span class="player-number">${p.number}</span>
                                        <span class="player-name">${p.name}</span>
                                        <span class="player-pos">${p.position}</span>
                                    </div>
                                `).join('') : '<p>Escalação não disponível</p>'}
                            </div>
                        </div>
                        <div class="lineup-column">
                            <h4>${awayTeam.flag} ${awayTeam.name}</h4>
                            <p class="formation-text"><i class="fas fa-chess-board"></i> ${awayLineup ? awayLineup.formation : '4-3-3'}</p>
                            <div class="lineup-list">
                                ${awayLineup ? awayLineup.startingXI.map(p => `
                                    <div class="lineup-item">
                                        <span class="player-number">${p.number}</span>
                                        <span class="player-name">${p.name}</span>
                                        <span class="player-pos">${p.position}</span>
                                    </div>
                                `).join('') : '<p>Escalação não disponível</p>'}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="match-events">
                    <h3><i class="fas fa-clock"></i> Eventos da Partida</h3>
                    <div class="events-timeline">
                        ${generateMatchEvents(match, stats).map(event => `
                            <div class="event-item ${event.type}">
                                <span class="event-time">${event.minute}'</span>
                                <span class="event-icon">${event.icon}</span>
                                <span class="event-description">${event.description}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeMatchDetailsModal() {
    const modal = document.querySelector('.match-details-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

function createStatComparison(label, homeValue, awayValue, suffix = '') {
    const total = homeValue + awayValue;
    const homePercent = total > 0 ? (homeValue / total) * 100 : 50;
    const awayPercent = total > 0 ? (awayValue / total) * 100 : 50;
    
    return `
        <div class="stat-row">
            <span class="stat-value home">${homeValue}${suffix}</span>
            <div class="stat-bar-container">
                <div class="stat-label">${label}</div>
                <div class="stat-bar">
                    <div class="stat-bar-fill home" style="width: ${homePercent}%"></div>
                    <div class="stat-bar-fill away" style="width: ${awayPercent}%"></div>
                </div>
            </div>
            <span class="stat-value away">${awayValue}${suffix}</span>
        </div>
    `;
}

function generateMatchStatistics(match) {
    // Generate realistic statistics based on match result
    const homeWon = match.homeScore > match.awayScore;
    const awayWon = match.awayScore > match.homeScore;
    const draw = match.homeScore === match.awayScore;
    
    // Base possession on result
    let homePossession, awayPossession;
    if (homeWon) {
        homePossession = 52 + Math.floor(Math.random() * 13);
    } else if (awayWon) {
        homePossession = 35 + Math.floor(Math.random() * 13);
    } else {
        homePossession = 48 + Math.floor(Math.random() * 5);
    }
    awayPossession = 100 - homePossession;
    
    return {
        possession: { home: homePossession, away: awayPossession },
        shots: {
            home: match.homeScore * 3 + Math.floor(Math.random() * 8) + 2,
            away: match.awayScore * 3 + Math.floor(Math.random() * 8) + 2
        },
        shotsOnTarget: {
            home: match.homeScore + Math.floor(Math.random() * 4) + 1,
            away: match.awayScore + Math.floor(Math.random() * 4) + 1
        },
        corners: {
            home: Math.floor(Math.random() * 8) + 2,
            away: Math.floor(Math.random() * 8) + 2
        },
        fouls: {
            home: Math.floor(Math.random() * 10) + 8,
            away: Math.floor(Math.random() * 10) + 8
        },
        yellowCards: {
            home: Math.floor(Math.random() * 3),
            away: Math.floor(Math.random() * 3)
        },
        redCards: {
            home: Math.random() > 0.9 ? 1 : 0,
            away: Math.random() > 0.9 ? 1 : 0
        },
        passes: {
            home: Math.floor(homePossession * 5) + Math.floor(Math.random() * 50),
            away: Math.floor(awayPossession * 5) + Math.floor(Math.random() * 50)
        }
    };
}

function generateMatchEvents(match, stats) {
    const events = [];
    const homeTeam = getTeamInfo(match.homeTeam);
    const awayTeam = getTeamInfo(match.awayTeam);
    
    // Add goals
    for (let i = 0; i < match.homeScore; i++) {
        const minute = Math.floor(Math.random() * 85) + 5;
        events.push({
            minute,
            type: 'goal',
            icon: '⚽',
            description: `GOL! ${homeTeam.name} marca`
        });
    }
    
    for (let i = 0; i < match.awayScore; i++) {
        const minute = Math.floor(Math.random() * 85) + 5;
        events.push({
            minute,
            type: 'goal',
            icon: '⚽',
            description: `GOL! ${awayTeam.name} marca`
        });
    }
    
    // Add yellow cards
    for (let i = 0; i < stats.yellowCards.home; i++) {
        const minute = Math.floor(Math.random() * 85) + 5;
        events.push({
            minute,
            type: 'yellow-card',
            icon: '🟨',
            description: `Cartão amarelo para ${homeTeam.name}`
        });
    }
    
    for (let i = 0; i < stats.yellowCards.away; i++) {
        const minute = Math.floor(Math.random() * 85) + 5;
        events.push({
            minute,
            type: 'yellow-card',
            icon: '🟨',
            description: `Cartão amarelo para ${awayTeam.name}`
        });
    }
    
    // Add red cards
    if (stats.redCards.home > 0) {
        const minute = Math.floor(Math.random() * 70) + 20;
        events.push({
            minute,
            type: 'red-card',
            icon: '🟥',
            description: `Cartão vermelho para ${homeTeam.name}`
        });
    }
    
    if (stats.redCards.away > 0) {
        const minute = Math.floor(Math.random() * 70) + 20;
        events.push({
            minute,
            type: 'red-card',
            icon: '🟥',
            description: `Cartão vermelho para ${awayTeam.name}`
        });
    }
    
    // Sort by minute
    events.sort((a, b) => a.minute - b.minute);
    
    return events;
}

console.log('✅ Matches module loaded');

// Made with Bob
