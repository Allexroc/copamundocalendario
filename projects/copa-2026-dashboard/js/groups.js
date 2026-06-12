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
    const team = getTeamInfo(teamData.team);
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
    // Switch to calendar tab and filter by group
    const calendarTab = document.querySelector('[data-tab="calendar"]');
    if (calendarTab) {
        calendarTab.click();
        
        // Set group filter
        setTimeout(() => {
            const groupFilter = document.getElementById('groupFilter');
            if (groupFilter) {
                groupFilter.value = groupId;
                groupFilter.dispatchEvent(new Event('change'));
            }
        }, 100);
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
`;
document.head.appendChild(groupStyles);

console.log('✅ Groups module loaded');

// Made with Bob
