// FIFA World Cup 2026 - Groups Management
// Handles group standings display and logic

function renderGroups() {
    const container = document.getElementById('groupsContainer');
    if (!container) return;

    const groupIds = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    
    container.innerHTML = '';
    
    groupIds.forEach(groupId => {
        const groupCard = createGroupCard(groupId);
        container.appendChild(groupCard);
    });

    // Setup expand all button
    setupExpandAllButton();
}

function createGroupCard(groupId) {
    const standings = getGroupStandings(groupId);
    const groupColor = getGroupColor(groupId);
    
    const card = document.createElement('div');
    card.className = 'group-card';
    card.setAttribute('data-group', groupId);
    
    card.innerHTML = `
        <div class="group-header" style="background: linear-gradient(135deg, ${groupColor} 0%, ${adjustColor(groupColor, -20)} 100%);">
            <div class="group-title">
                <i class="fas fa-layer-group"></i>
                <h3>Grupo ${groupId}</h3>
            </div>
            <button class="group-toggle" aria-label="Toggle group">
                <i class="fas fa-chevron-down"></i>
            </button>
        </div>
        <div class="group-body">
            <table class="standings-table">
                <thead>
                    <tr>
                        <th class="pos-col">#</th>
                        <th class="team-col">Seleção</th>
                        <th class="stat-col" title="Jogos">J</th>
                        <th class="stat-col" title="Vitórias">V</th>
                        <th class="stat-col" title="Empates">E</th>
                        <th class="stat-col" title="Derrotas">D</th>
                        <th class="stat-col" title="Gols Pró">GP</th>
                        <th class="stat-col" title="Gols Contra">GC</th>
                        <th class="stat-col" title="Saldo de Gols">SG</th>
                        <th class="pts-col">Pts</th>
                    </tr>
                </thead>
                <tbody>
                    ${standings.map((team, index) => createTeamRow(team, index + 1)).join('')}
                </tbody>
            </table>
            <div class="group-footer">
                <button class="btn-view-matches" data-group="${groupId}">
                    <i class="fas fa-futbol"></i>
                    Ver Jogos do Grupo
                </button>
            </div>
        </div>
    `;
    
    // Add toggle functionality
    const header = card.querySelector('.group-header');
    const body = card.querySelector('.group-body');
    const toggleBtn = card.querySelector('.group-toggle');
    
    header.addEventListener('click', () => {
        body.classList.toggle('collapsed');
        toggleBtn.querySelector('i').classList.toggle('fa-chevron-down');
        toggleBtn.querySelector('i').classList.toggle('fa-chevron-up');
    });
    
    // Add view matches button functionality
    const viewMatchesBtn = card.querySelector('.btn-view-matches');
    viewMatchesBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        viewGroupMatches(groupId);
    });
    
    return card;
}

function createTeamRow(teamData, position) {
    const team = getTeamInfo(teamData.team) || { flag: '🏳️', name: teamData.team };
    const goalDifference = teamData.goalsFor - teamData.goalsAgainst;
    const positionClass = getPositionClass(position);
    
    return `
        <tr class="team-row ${positionClass}" data-team="${teamData.team}">
            <td class="pos-col">
                <span class="position-badge ${positionClass}">${position}</span>
            </td>
            <td class="team-col">
                <div class="team-info">
                    <span class="team-flag">${team.flag}</span>
                    <span class="team-name">${team.name}</span>
                </div>
            </td>
            <td class="stat-col">${teamData.played}</td>
            <td class="stat-col">${teamData.won}</td>
            <td class="stat-col">${teamData.drawn}</td>
            <td class="stat-col">${teamData.lost}</td>
            <td class="stat-col">${teamData.goalsFor}</td>
            <td class="stat-col">${teamData.goalsAgainst}</td>
            <td class="stat-col ${goalDifference > 0 ? 'positive' : goalDifference < 0 ? 'negative' : ''}">
                ${goalDifference > 0 ? '+' : ''}${goalDifference}
            </td>
            <td class="pts-col">
                <strong>${teamData.points}</strong>
            </td>
        </tr>
    `;
}

function getPositionClass(position) {
    if (position <= 2) return 'qualified';
    if (position === 3) return 'third-place';
    return 'eliminated';
}

function getGroupColor(groupId) {
    const colors = {
        'A': '#FF6B6B', 'B': '#4ECDC4', 'C': '#45B7D1', 'D': '#FFA07A',
        'E': '#98D8C8', 'F': '#F7DC6F', 'G': '#BB8FCE', 'H': '#85C1E2',
        'I': '#F8B739', 'J': '#52B788', 'K': '#E63946', 'L': '#457B9D'
    };
    return colors[groupId] || '#1a237e';
}

function adjustColor(color, amount) {
    const num = parseInt(color.replace('#', ''), 16);
    const r = Math.max(0, Math.min(255, (num >> 16) + amount));
    const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
    const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
    return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

function setupExpandAllButton() {
    const expandBtn = document.getElementById('expandAllGroups');
    if (!expandBtn) return;
    
    let allExpanded = true;
    
    expandBtn.addEventListener('click', () => {
        const allBodies = document.querySelectorAll('.group-body');
        const allToggles = document.querySelectorAll('.group-toggle i');
        
        allBodies.forEach(body => {
            if (allExpanded) {
                body.classList.add('collapsed');
            } else {
                body.classList.remove('collapsed');
            }
        });
        
        allToggles.forEach(icon => {
            if (allExpanded) {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            } else {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            }
        });
        
        allExpanded = !allExpanded;
        expandBtn.innerHTML = allExpanded ? 
            '<i class="fas fa-expand-alt"></i> Expandir Todos' : 
            '<i class="fas fa-compress-alt"></i> Recolher Todos';
    });
}

function viewGroupMatches(groupId) {
    // Get all matches for this group
    const groupMatches = WORLD_CUP_2026.matches.filter(m => m.group === groupId);
    const finishedMatches = groupMatches.filter(m => m.status === 'finished');
    const scheduledMatches = groupMatches.filter(m => m.status === 'scheduled');
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'group-matches-modal';
    modal.innerHTML = `
        <div class="group-matches-content">
            <div class="group-matches-header">
                <h2><i class="fas fa-futbol"></i> Jogos do Grupo ${groupId}</h2>
                <button class="close-modal" onclick="closeGroupMatchesModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="group-matches-body">
                ${finishedMatches.length > 0 ? `
                    <div class="matches-section">
                        <h3><i class="fas fa-check-circle"></i> Partidas Realizadas (${finishedMatches.length})</h3>
                        <div class="matches-summary">
                            ${finishedMatches.map(match => createMatchSummaryCard(match)).join('')}
                        </div>
                    </div>
                ` : ''}
                ${scheduledMatches.length > 0 ? `
                    <div class="matches-section">
                        <h3><i class="fas fa-calendar-alt"></i> Próximas Partidas (${scheduledMatches.length})</h3>
                        <div class="matches-list">
                            ${scheduledMatches.map(match => createScheduledMatchCard(match)).join('')}
                        </div>
                    </div>
                ` : ''}
                ${finishedMatches.length === 0 && scheduledMatches.length === 0 ? `
                    <div class="no-matches">
                        <i class="fas fa-info-circle"></i>
                        <p>Nenhuma partida encontrada para este grupo.</p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

function createMatchSummaryCard(match) {
    const homeTeam = getTeamInfo(match.homeTeam);
    const awayTeam = getTeamInfo(match.awayTeam);
    
    // Handle case where team info is not found
    if (!homeTeam || !awayTeam) {
        return '';
    }
    
    const matchDate = new Date(match.date);
    const dateStr = matchDate.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    const homeWon = match.homeScore > match.awayScore;
    const awayWon = match.awayScore > match.homeScore;
    const draw = match.homeScore === match.awayScore;
    
    return `
        <div class="match-summary-card">
            <div class="match-date">${dateStr}</div>
            <div class="match-result">
                <div class="team-result ${homeWon ? 'winner' : draw ? 'draw' : ''}">
                    <span class="team-flag">${homeTeam.flag}</span>
                    <span class="team-name">${homeTeam.name}</span>
                    <span class="team-score">${match.homeScore}</span>
                </div>
                <div class="vs-separator">×</div>
                <div class="team-result ${awayWon ? 'winner' : draw ? 'draw' : ''}">
                    <span class="team-score">${match.awayScore}</span>
                    <span class="team-name">${awayTeam.name}</span>
                    <span class="team-flag">${awayTeam.flag}</span>
                </div>
            </div>
            <div class="match-stadium">
                <i class="fas fa-map-marker-alt"></i> ${match.stadium}
            </div>
        </div>
    `;
}

function createScheduledMatchCard(match) {
    const homeTeam = getTeamInfo(match.homeTeam);
    const awayTeam = getTeamInfo(match.awayTeam);
    
    // Handle case where team info is not found
    if (!homeTeam || !awayTeam) {
        return '';
    }
    
    const matchDate = new Date(match.date);
    const dateStr = matchDate.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    return `
        <div class="scheduled-match-card">
            <div class="match-datetime">
                <i class="fas fa-clock"></i> ${dateStr}
            </div>
            <div class="match-teams">
                <div class="team-info">
                    <span class="team-flag">${homeTeam.flag}</span>
                    <span class="team-name">${homeTeam.name}</span>
                </div>
                <span class="vs">vs</span>
                <div class="team-info">
                    <span class="team-flag">${awayTeam.flag}</span>
                    <span class="team-name">${awayTeam.name}</span>
                </div>
            </div>
            <div class="match-venue">
                <i class="fas fa-map-marker-alt"></i> ${match.stadium}
            </div>
        </div>
    `;
}

function closeGroupMatchesModal() {
    const modal = document.querySelector('.group-matches-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Add styles for groups
const groupStyles = document.createElement('style');
groupStyles.textContent = `
    .groups-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 20px;
        padding: 20px 0;
    }
    
    .group-card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        overflow: hidden;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .group-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    }
    
    .group-header {
        padding: 16px 20px;
        color: white;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        user-select: none;
    }
    
    .group-title {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .group-title h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 700;
    }
    
    .group-toggle {
        background: rgba(255,255,255,0.2);
        border: none;
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
    }
    
    .group-toggle:hover {
        background: rgba(255,255,255,0.3);
    }
    
    .group-body {
        max-height: 500px;
        overflow: hidden;
        transition: max-height 0.3s ease;
    }
    
    .group-body.collapsed {
        max-height: 0;
    }
    
    .standings-table {
        width: 100%;
        border-collapse: collapse;
    }
    
    .standings-table thead {
        background: #f5f5f5;
    }
    
    .standings-table th {
        padding: 12px 8px;
        text-align: center;
        font-size: 12px;
        font-weight: 600;
        color: #666;
        text-transform: uppercase;
    }
    
    .standings-table th.team-col {
        text-align: left;
        padding-left: 16px;
    }
    
    .standings-table td {
        padding: 12px 8px;
        text-align: center;
        font-size: 14px;
        border-bottom: 1px solid #f0f0f0;
    }
    
    .team-row {
        transition: background 0.2s ease;
    }
    
    .team-row:hover {
        background: #f9f9f9;
    }
    
    .team-row.qualified {
        border-left: 4px solid #4caf50;
    }
    
    .team-row.third-place {
        border-left: 4px solid #ff9800;
    }
    
    .team-row.eliminated {
        border-left: 4px solid #f44336;
    }
    
    .pos-col {
        width: 50px;
    }
    
    .position-badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        font-weight: 700;
        font-size: 13px;
    }
    
    .position-badge.qualified {
        background: #e8f5e9;
        color: #2e7d32;
    }
    
    .position-badge.third-place {
        background: #fff3e0;
        color: #e65100;
    }
    
    .position-badge.eliminated {
        background: #ffebee;
        color: #c62828;
    }
    
    .team-col {
        text-align: left !important;
        padding-left: 16px !important;
    }
    
    .team-info {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .team-flag {
        font-size: 24px;
    }
    
    .team-name {
        font-weight: 500;
        color: #212121;
    }
    
    .stat-col {
        width: 40px;
        color: #666;
    }
    
    .stat-col.positive {
        color: #4caf50;
        font-weight: 600;
    }
    
    .stat-col.negative {
        color: #f44336;
        font-weight: 600;
    }
    
    .pts-col {
        width: 60px;
        font-size: 16px;
        color: #1a237e;
    }
    
    .group-footer {
        padding: 16px;
        background: #f9f9f9;
        border-top: 1px solid #e0e0e0;
    }
    
    .btn-view-matches {
        width: 100%;
        padding: 10px 16px;
        background: #1a237e;
        color: white;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        transition: background 0.3s ease;
    }
    
    .btn-view-matches:hover {
        background: #0d47a1;
    }
    
    @media (max-width: 768px) {
        .groups-container {
            grid-template-columns: 1fr;
        }
        
        .standings-table th,
        .standings-table td {
            padding: 8px 4px;
            font-size: 11px;
        }
        
        .team-flag {
            font-size: 20px;
        }
        
        .team-name {
            font-size: 13px;
        }
    }
    
    /* Group Matches Modal Styles */
    .group-matches-modal {
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
    }
    
    .group-matches-modal.active {
        opacity: 1;
    }
    
    .group-matches-content {
        background: white;
        border-radius: 16px;
        max-width: 800px;
        width: 100%;
        max-height: 90vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }
    
    .group-matches-modal.active .group-matches-content {
        transform: scale(1);
    }
    
    .group-matches-header {
        padding: 24px;
        background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
        color: white;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 3px solid #ffd700;
    }
    
    .group-matches-header h2 {
        margin: 0;
        font-size: 24px;
        display: flex;
        align-items: center;
        gap: 12px;
    }
    
    .close-modal {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        transition: background 0.3s ease;
    }
    
    .close-modal:hover {
        background: rgba(255, 255, 255, 0.3);
    }
    
    .group-matches-body {
        padding: 24px;
        overflow-y: auto;
        flex: 1;
    }
    
    .matches-section {
        margin-bottom: 32px;
    }
    
    .matches-section:last-child {
        margin-bottom: 0;
    }
    
    .matches-section h3 {
        margin: 0 0 16px 0;
        font-size: 18px;
        color: #1a237e;
        display: flex;
        align-items: center;
        gap: 8px;
        padding-bottom: 12px;
        border-bottom: 2px solid #e0e0e0;
    }
    
    .matches-summary {
        display: grid;
        gap: 16px;
    }
    
    .match-summary-card {
        background: #f9f9f9;
        border-radius: 12px;
        padding: 16px;
        border-left: 4px solid #1a237e;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
    }
    
    .match-summary-card:hover {
        transform: translateX(4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    .match-date {
        font-size: 12px;
        color: #666;
        text-transform: uppercase;
        font-weight: 600;
        margin-bottom: 12px;
    }
    
    .match-result {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 12px;
    }
    
    .team-result {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
        padding: 8px;
        border-radius: 8px;
        transition: background 0.2s ease;
    }
    
    .team-result.winner {
        background: #e8f5e9;
        font-weight: 600;
    }
    
    .team-result.draw {
        background: #fff3e0;
    }
    
    .team-result .team-flag {
        font-size: 28px;
    }
    
    .team-result .team-name {
        flex: 1;
        font-size: 15px;
        color: #212121;
    }
    
    .team-result .team-score {
        font-size: 24px;
        font-weight: 700;
        color: #1a237e;
        min-width: 32px;
        text-align: center;
    }
    
    .vs-separator {
        font-size: 14px;
        color: #999;
        font-weight: 600;
    }
    
    .match-stadium {
        font-size: 13px;
        color: #666;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    
    .matches-list {
        display: grid;
        gap: 12px;
    }
    
    .scheduled-match-card {
        background: white;
        border: 2px solid #e0e0e0;
        border-radius: 10px;
        padding: 16px;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
    }
    
    .scheduled-match-card:hover {
        border-color: #1a237e;
        box-shadow: 0 2px 8px rgba(26, 35, 126, 0.1);
    }
    
    .match-datetime {
        font-size: 13px;
        color: #1a237e;
        font-weight: 600;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    
    .match-teams {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 12px;
    }
    
    .match-teams .team-info {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .match-teams .team-flag {
        font-size: 24px;
    }
    
    .match-teams .team-name {
        font-size: 14px;
        font-weight: 500;
        color: #212121;
    }
    
    .match-teams .vs {
        font-size: 12px;
        color: #999;
        font-weight: 600;
    }
    
    .match-venue {
        font-size: 12px;
        color: #666;
        display: flex;
        align-items: center;
        gap: 6px;
    }
    
    .no-matches {
        text-align: center;
        padding: 40px 20px;
        color: #999;
    }
    
    .no-matches i {
        font-size: 48px;
        margin-bottom: 16px;
        opacity: 0.5;
    }
    
    .no-matches p {
        margin: 0;
        font-size: 16px;
    }
    
    @media (max-width: 768px) {
        .group-matches-modal {
            padding: 0;
        }
        
        .group-matches-content {
            max-width: 100%;
            max-height: 100vh;
            border-radius: 0;
        }
        
        .group-matches-header h2 {
            font-size: 20px;
        }
        
        .match-result {
            flex-direction: column;
            gap: 8px;
        }
        
        .team-result {
            width: 100%;
        }
        
        .vs-separator {
            transform: rotate(90deg);
        }
        
        .match-teams {
            flex-direction: column;
            gap: 12px;
        }
        
        .match-teams .team-info {
            width: 100%;
            justify-content: center;
        }
    }
`;
document.head.appendChild(groupStyles);

console.log('✅ Groups module loaded');

// Made with Bob
