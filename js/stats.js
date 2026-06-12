// FIFA World Cup 2026 - Statistics Management
// Handles statistics display and calculations

let currentStatsCategory = 'scorers';

function renderStats() {
    const container = document.getElementById('statsContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="stats-grid">
            <div class="stats-main">
                <div id="statsContent"></div>
            </div>
            <div class="stats-sidebar">
                ${createQuickStats()}
            </div>
        </div>
    `;

    loadStatsCategory(currentStatsCategory);
    setupStatsCategorySelector();
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
    const scorers = getTopScorers(10);
    
    return `
        <div class="stats-section">
            <div class="stats-header">
                <h3><i class="fas fa-futbol"></i> Artilharia</h3>
                <span class="stats-subtitle">Top 10 Goleadores</span>
            </div>
            <div class="stats-table-wrapper">
                <table class="stats-table">
                    <thead>
                        <tr>
                            <th class="rank-col">#</th>
                            <th class="player-col">Jogador</th>
                            <th class="team-col">Seleção</th>
                            <th class="stat-col">Gols</th>
                            <th class="stat-col">Jogos</th>
                            <th class="stat-col">Média</th>
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
    const team = getTeamInfo(scorer.team);
    const average = (scorer.goals / scorer.matches).toFixed(2);
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
            <td class="stat-col">${scorer.matches}</td>
            <td class="stat-col">${average}</td>
        </tr>
    `;
}

function createAssistsTable() {
    const assists = getTopAssists(10);
    
    return `
        <div class="stats-section">
            <div class="stats-header">
                <h3><i class="fas fa-hands-helping"></i> Assistências</h3>
                <span class="stats-subtitle">Top 10 Garçons</span>
            </div>
            <div class="stats-table-wrapper">
                <table class="stats-table">
                    <thead>
                        <tr>
                            <th class="rank-col">#</th>
                            <th class="player-col">Jogador</th>
                            <th class="team-col">Seleção</th>
                            <th class="stat-col">Assistências</th>
                            <th class="stat-col">Jogos</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${assists.map((assist, index) => createAssistRow(assist, index + 1)).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function createAssistRow(assist, rank) {
    const team = getTeamInfo(assist.team);
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
    return `
        <div class="quick-stats">
            <h4>Estatísticas Rápidas</h4>
            <div class="quick-stat-item">
                <i class="fas fa-futbol"></i>
                <div class="quick-stat-info">
                    <span class="quick-stat-value">127</span>
                    <span class="quick-stat-label">Gols Marcados</span>
                </div>
            </div>
            <div class="quick-stat-item">
                <i class="fas fa-chart-line"></i>
                <div class="quick-stat-info">
                    <span class="quick-stat-value">5.29</span>
                    <span class="quick-stat-label">Média de Gols/Jogo</span>
                </div>
            </div>
            <div class="quick-stat-item">
                <i class="fas fa-clock"></i>
                <div class="quick-stat-info">
                    <span class="quick-stat-value">24</span>
                    <span class="quick-stat-label">Jogos Realizados</span>
                </div>
            </div>
            <div class="quick-stat-item">
                <i class="fas fa-fire"></i>
                <div class="quick-stat-info">
                    <span class="quick-stat-value">7-1</span>
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
    
    @media (max-width: 1024px) {
        .stats-grid {
            grid-template-columns: 1fr;
        }
        
        .attendance-grid {
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
