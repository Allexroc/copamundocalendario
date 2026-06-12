// FIFA World Cup 2026 - Knockout Stage Management
// Handles elimination bracket visualization

let bracketZoom = 1;

function renderKnockout() {
    const container = document.getElementById('knockoutContainer');
    if (!container) return;

    container.innerHTML = `
        <div class="bracket-wrapper" id="bracketWrapper">
            <div class="bracket-container" id="bracketContainer" style="transform: scale(${bracketZoom})">
                ${createBracket()}
            </div>
        </div>
        <div class="bracket-legend">
            <div class="legend-item">
                <span class="legend-badge qualified">Classificado</span>
                <span class="legend-text">Times confirmados</span>
            </div>
            <div class="legend-item">
                <span class="legend-badge pending">Pendente</span>
                <span class="legend-text">Aguardando definição</span>
            </div>
        </div>
    `;

    setupZoomControls();
}

function createBracket() {
    return `
        <div class="bracket">
            <!-- Round of 16 -->
            <div class="bracket-round round-16">
                <h4 class="round-title">Oitavas de Final</h4>
                ${createRound16Matches()}
            </div>
            
            <!-- Quarter Finals -->
            <div class="bracket-round quarter-finals">
                <h4 class="round-title">Quartas de Final</h4>
                ${createQuarterFinalsMatches()}
            </div>
            
            <!-- Semi Finals -->
            <div class="bracket-round semi-finals">
                <h4 class="round-title">Semifinais</h4>
                ${createSemiFinalsMatches()}
            </div>
            
            <!-- Final -->
            <div class="bracket-round final">
                <h4 class="round-title">Final</h4>
                ${createFinalMatch()}
            </div>
            
            <!-- Champion -->
            <div class="bracket-round champion">
                <h4 class="round-title">Campeão</h4>
                ${createChampionSlot()}
            </div>
        </div>
        
        <!-- Third Place Match -->
        <div class="third-place-section">
            <h4 class="round-title">Disputa de 3º Lugar</h4>
            ${createThirdPlaceMatch()}
        </div>
    `;
}

function createRound16Matches() {
    const matches = [
        { id: 'R16-1', team1: '1º A', team2: '3º C/D/E', date: '25 Jun' },
        { id: 'R16-2', team1: '2º A', team2: '2º B', date: '25 Jun' },
        { id: 'R16-3', team1: '1º B', team2: '3º A/C/D', date: '26 Jun' },
        { id: 'R16-4', team1: '1º C', team2: '3º D/E/F', date: '26 Jun' },
        { id: 'R16-5', team1: '1º D', team2: '3º E/F/G', date: '27 Jun' },
        { id: 'R16-6', team1: '2º D', team2: '2º C', date: '27 Jun' },
        { id: 'R16-7', team1: '1º E', team2: '3º F/G/H', date: '28 Jun' },
        { id: 'R16-8', team1: '2º E', team2: '2º F', date: '28 Jun' }
    ];
    
    return matches.map(match => createKnockoutMatch(match, 'pending')).join('');
}

function createQuarterFinalsMatches() {
    const matches = [
        { id: 'QF-1', team1: 'Vencedor R16-1', team2: 'Vencedor R16-2', date: '1 Jul' },
        { id: 'QF-2', team1: 'Vencedor R16-3', team2: 'Vencedor R16-4', date: '1 Jul' },
        { id: 'QF-3', team1: 'Vencedor R16-5', team2: 'Vencedor R16-6', date: '2 Jul' },
        { id: 'QF-4', team1: 'Vencedor R16-7', team2: 'Vencedor R16-8', date: '3 Jul' }
    ];
    
    return matches.map(match => createKnockoutMatch(match, 'pending')).join('');
}

function createSemiFinalsMatches() {
    const matches = [
        { id: 'SF-1', team1: 'Vencedor QF-1', team2: 'Vencedor QF-2', date: '7 Jul' },
        { id: 'SF-2', team1: 'Vencedor QF-3', team2: 'Vencedor QF-4', date: '8 Jul' }
    ];
    
    return matches.map(match => createKnockoutMatch(match, 'pending')).join('');
}

function createFinalMatch() {
    const match = {
        id: 'FINAL',
        team1: 'Vencedor SF-1',
        team2: 'Vencedor SF-2',
        date: '19 Jul',
        stadium: 'MetLife Stadium'
    };
    
    return createKnockoutMatch(match, 'pending', true);
}

function createThirdPlaceMatch() {
    const match = {
        id: 'THIRD',
        team1: 'Perdedor SF-1',
        team2: 'Perdedor SF-2',
        date: '14 Jul'
    };
    
    return createKnockoutMatch(match, 'pending');
}

function createChampionSlot() {
    return `
        <div class="champion-slot">
            <div class="trophy-icon">
                <i class="fas fa-trophy"></i>
            </div>
            <div class="champion-team">
                <span class="champion-label">Campeão Mundial</span>
                <span class="champion-name">A definir</span>
            </div>
        </div>
    `;
}

function createKnockoutMatch(match, status = 'pending', isFinal = false) {
    const team1Info = match.team1.includes('º') ? null : getTeamInfo(match.team1);
    const team2Info = match.team2.includes('º') ? null : getTeamInfo(match.team2);
    
    return `
        <div class="knockout-match ${status} ${isFinal ? 'final-match' : ''}" data-match-id="${match.id}">
            <div class="match-date">${match.date}</div>
            ${match.stadium ? `<div class="match-stadium">${match.stadium}</div>` : ''}
            <div class="knockout-team ${status === 'finished' && match.winner === 1 ? 'winner' : ''}">
                ${team1Info ? `
                    <span class="team-flag">${team1Info.flag}</span>
                    <span class="team-name">${team1Info.name}</span>
                ` : `
                    <span class="team-placeholder">${match.team1}</span>
                `}
                ${status === 'finished' ? `<span class="team-score">${match.score1 || 0}</span>` : ''}
            </div>
            <div class="match-divider"></div>
            <div class="knockout-team ${status === 'finished' && match.winner === 2 ? 'winner' : ''}">
                ${team2Info ? `
                    <span class="team-flag">${team2Info.flag}</span>
                    <span class="team-name">${team2Info.name}</span>
                ` : `
                    <span class="team-placeholder">${match.team2}</span>
                `}
                ${status === 'finished' ? `<span class="team-score">${match.score2 || 0}</span>` : ''}
            </div>
        </div>
    `;
}

function setupZoomControls() {
    const zoomInBtn = document.getElementById('zoomInBracket');
    const zoomOutBtn = document.getElementById('zoomOutBracket');
    const bracketContainer = document.getElementById('bracketContainer');
    
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => {
            bracketZoom = Math.min(bracketZoom + 0.1, 1.5);
            bracketContainer.style.transform = `scale(${bracketZoom})`;
        });
    }
    
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => {
            bracketZoom = Math.max(bracketZoom - 0.1, 0.5);
            bracketContainer.style.transform = `scale(${bracketZoom})`;
        });
    }
}

// Add styles for knockout bracket
const knockoutStyles = document.createElement('style');
knockoutStyles.textContent = `
    .knockout-container {
        padding: 20px;
        overflow-x: auto;
    }
    
    .bracket-wrapper {
        overflow-x: auto;
        overflow-y: hidden;
        padding: 20px;
        background: #f9f9f9;
        border-radius: 12px;
    }
    
    .bracket-container {
        transform-origin: top left;
        transition: transform 0.3s ease;
        min-width: 1200px;
    }
    
    .bracket {
        display: flex;
        gap: 40px;
        padding: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .bracket-round {
        display: flex;
        flex-direction: column;
        gap: 20px;
        min-width: 200px;
    }
    
    .round-title {
        text-align: center;
        color: #1a237e;
        font-size: 14px;
        font-weight: 700;
        text-transform: uppercase;
        margin: 0 0 20px 0;
        padding-bottom: 10px;
        border-bottom: 2px solid #1a237e;
    }
    
    .round-16 {
        justify-content: space-around;
    }
    
    .quarter-finals {
        justify-content: space-around;
    }
    
    .semi-finals {
        justify-content: space-around;
    }
    
    .final {
        justify-content: center;
    }
    
    .champion {
        justify-content: center;
    }
    
    .knockout-match {
        background: white;
        border: 2px solid #e0e0e0;
        border-radius: 8px;
        padding: 12px;
        min-width: 180px;
        transition: all 0.3s ease;
    }
    
    .knockout-match:hover {
        border-color: #1a237e;
        box-shadow: 0 4px 12px rgba(26, 35, 126, 0.2);
    }
    
    .knockout-match.pending {
        background: #fafafa;
    }
    
    .knockout-match.finished {
        border-color: #4caf50;
    }
    
    .knockout-match.final-match {
        border-width: 3px;
        border-color: #ffd700;
        background: linear-gradient(135deg, #fff9e6 0%, #ffffff 100%);
    }
    
    .match-date {
        text-align: center;
        font-size: 11px;
        font-weight: 600;
        color: #666;
        margin-bottom: 8px;
        text-transform: uppercase;
    }
    
    .match-stadium {
        text-align: center;
        font-size: 10px;
        color: #999;
        margin-bottom: 8px;
    }
    
    .knockout-team {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        border-radius: 4px;
        transition: background 0.2s ease;
    }
    
    .knockout-team.winner {
        background: #e8f5e9;
        font-weight: 700;
    }
    
    .knockout-team .team-flag {
        font-size: 20px;
    }
    
    .knockout-team .team-name {
        flex: 1;
        font-size: 13px;
        color: #212121;
    }
    
    .knockout-team .team-placeholder {
        flex: 1;
        font-size: 11px;
        color: #999;
        font-style: italic;
    }
    
    .knockout-team .team-score {
        font-size: 18px;
        font-weight: 700;
        color: #1a237e;
        font-family: 'Roboto Mono', monospace;
        min-width: 24px;
        text-align: center;
    }
    
    .match-divider {
        height: 1px;
        background: #e0e0e0;
        margin: 4px 0;
    }
    
    .champion-slot {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        padding: 24px;
        background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
        border-radius: 12px;
        border: 3px solid #f9a825;
        box-shadow: 0 4px 16px rgba(249, 168, 37, 0.4);
    }
    
    .trophy-icon {
        font-size: 48px;
        color: #f57f17;
        animation: float 3s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    .champion-team {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
    }
    
    .champion-label {
        font-size: 12px;
        font-weight: 700;
        color: #f57f17;
        text-transform: uppercase;
    }
    
    .champion-name {
        font-size: 16px;
        font-weight: 700;
        color: #212121;
    }
    
    .third-place-section {
        margin-top: 30px;
        padding: 20px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .third-place-section .round-title {
        text-align: center;
        color: #ff9800;
        margin-bottom: 20px;
    }
    
    .third-place-section .knockout-match {
        max-width: 300px;
        margin: 0 auto;
        border-color: #ff9800;
    }
    
    .bracket-legend {
        display: flex;
        justify-content: center;
        gap: 24px;
        margin-top: 20px;
        padding: 16px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .legend-badge {
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
    }
    
    .legend-badge.qualified {
        background: #e8f5e9;
        color: #2e7d32;
        border: 1px solid #4caf50;
    }
    
    .legend-badge.pending {
        background: #fafafa;
        color: #666;
        border: 1px solid #e0e0e0;
    }
    
    .legend-text {
        font-size: 13px;
        color: #666;
    }
    
    @media (max-width: 1024px) {
        .bracket {
            gap: 20px;
        }
        
        .bracket-round {
            min-width: 160px;
        }
        
        .knockout-match {
            min-width: 150px;
            padding: 10px;
        }
        
        .knockout-team .team-name {
            font-size: 11px;
        }
    }
    
    @media (max-width: 768px) {
        .bracket-wrapper {
            padding: 10px;
        }
        
        .bracket {
            gap: 15px;
            padding: 15px;
        }
        
        .bracket-round {
            min-width: 140px;
        }
        
        .knockout-match {
            min-width: 130px;
            padding: 8px;
        }
        
        .round-title {
            font-size: 11px;
        }
    }
`;
document.head.appendChild(knockoutStyles);

console.log('✅ Knockout module loaded');

// Made with Bob
