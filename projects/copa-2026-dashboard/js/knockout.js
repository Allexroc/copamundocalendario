// FIFA World Cup 2026 - Knockout Stage Management
// Handles elimination bracket visualization using real match data

let bracketZoom = 1;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function _knockoutMatches() {
    return (WORLD_CUP_2026.matches || []).filter(m => m.phase === 'knockout');
}

function _formatKnockoutDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit',
        timeZone: 'America/Sao_Paulo'
    }) + ' ' + d.toLocaleTimeString('pt-BR', {
        hour: '2-digit', minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
    });
}

// Group knockout matches by stage based on their sequential position
// API returns them ordered: LAST_32 (16), LAST_16 (8), QF (4), SF (2), THIRD (1), FINAL (1)
function _matchesByStage() {
    const all = _knockoutMatches();
    const last32   = all.filter((_, i) => i < 16);
    const last16   = all.filter((_, i) => i >= 16 && i < 24);
    const qf       = all.filter((_, i) => i >= 24 && i < 28);
    const sf       = all.filter((_, i) => i >= 28 && i < 30);
    const third    = all.filter((_, i) => i === 30);
    const final_   = all.filter((_, i) => i === 31);
    return { last32, last16, qf, sf, third, final: final_ };
}

// ─── Render entry point ───────────────────────────────────────────────────────

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
                <span class="legend-badge qualified">Finalizado</span>
                <span class="legend-text">Resultado confirmado</span>
            </div>
            <div class="legend-item">
                <span class="legend-badge live-badge">Ao Vivo</span>
                <span class="legend-text">Em andamento</span>
            </div>
            <div class="legend-item">
                <span class="legend-badge pending">Agendado</span>
                <span class="legend-text">Aguardando jogo</span>
            </div>
        </div>
    `;

    setupZoomControls();
}

// ─── Bracket structure ────────────────────────────────────────────────────────

function createBracket() {
    const { last32, last16, qf, sf, third, final: finalM } = _matchesByStage();
    return `
        <div class="bracket">
            <!-- 32 avos -->
            <div class="bracket-round round-32">
                <h4 class="round-title">32 avos de Final</h4>
                ${last32.map(m => createKnockoutMatchCard(m)).join('')}
            </div>

            <!-- Oitavas -->
            <div class="bracket-round round-16">
                <h4 class="round-title">Oitavas de Final</h4>
                ${last16.map(m => createKnockoutMatchCard(m)).join('')}
            </div>

            <!-- Quartas -->
            <div class="bracket-round quarter-finals">
                <h4 class="round-title">Quartas de Final</h4>
                ${qf.map(m => createKnockoutMatchCard(m)).join('')}
            </div>

            <!-- Semis -->
            <div class="bracket-round semi-finals">
                <h4 class="round-title">Semifinais</h4>
                ${sf.map(m => createKnockoutMatchCard(m)).join('')}
            </div>

            <!-- Final -->
            <div class="bracket-round final">
                <h4 class="round-title">Final</h4>
                ${finalM.map(m => createKnockoutMatchCard(m, true)).join('')}
                ${createChampionSlot(finalM[0])}
            </div>
        </div>

        <!-- 3º Lugar -->
        <div class="third-place-section">
            <h4 class="round-title">Disputa de 3º Lugar</h4>
            ${third.map(m => createKnockoutMatchCard(m)).join('')}
        </div>
    `;
}

// ─── Match card ───────────────────────────────────────────────────────────────

function createKnockoutMatchCard(match, isFinal = false) {
    if (!match) return '';

    const homeInfo = match.homeTeam ? (getTeamInfo(match.homeTeam) || { flag: '🏳️', name: match.homeTeam }) : null;
    const awayInfo = match.awayTeam ? (getTeamInfo(match.awayTeam) || { flag: '🏳️', name: match.awayTeam }) : null;

    const isFinished = match.status === 'finished';
    const isLive     = match.status === 'live';
    const isPending  = !isFinished && !isLive;

    const homeWon = isFinished && match.homeScore > match.awayScore;
    const awayWon = isFinished && match.awayScore > match.homeScore;

    const statusClass = isFinished ? 'finished' : isLive ? 'live' : 'pending';
    const dateLabel   = _formatKnockoutDate(match.date);

    const homeBlock = homeInfo
        ? `<span class="team-flag">${homeInfo.flag}</span>
           <span class="team-name">${homeInfo.name}</span>`
        : `<span class="team-placeholder">A definir</span>`;

    const awayBlock = awayInfo
        ? `<span class="team-flag">${awayInfo.flag}</span>
           <span class="team-name">${awayInfo.name}</span>`
        : `<span class="team-placeholder">A definir</span>`;

    const homeScore = isFinished || isLive
        ? `<span class="team-score ${homeWon ? 'score-winner' : ''}">${match.homeScore ?? 0}</span>`
        : '';
    const awayScore = isFinished || isLive
        ? `<span class="team-score ${awayWon ? 'score-winner' : ''}">${match.awayScore ?? 0}</span>`
        : '';

    return `
        <div class="knockout-match ${statusClass} ${isFinal ? 'final-match' : ''}" data-match-id="${match.id}">
            <div class="match-date">${dateLabel}</div>
            <div class="knockout-team ${homeWon ? 'winner' : ''}">
                ${homeBlock}${homeScore}
            </div>
            <div class="match-divider"></div>
            <div class="knockout-team ${awayWon ? 'winner' : ''}">
                ${awayBlock}${awayScore}
            </div>
            ${isLive ? `<div class="live-indicator">🔴 AO VIVO${match.minute ? ' ' + match.minute + "'" : ''}</div>` : ''}
        </div>
    `;
}

// ─── Champion slot ────────────────────────────────────────────────────────────

function createChampionSlot(finalMatch) {
    let championName = 'A definir';
    let championFlag = '';

    if (finalMatch && finalMatch.status === 'finished') {
        const winnerCode = finalMatch.homeScore > finalMatch.awayScore
            ? finalMatch.homeTeam
            : finalMatch.awayTeam;
        const info = getTeamInfo(winnerCode);
        if (info) {
            championFlag = info.flag + ' ';
            championName = info.name;
        }
    }

    return `
        <div class="champion-slot">
            <div class="trophy-icon"><i class="fas fa-trophy"></i></div>
            <div class="champion-team">
                <span class="champion-label">Campeão Mundial</span>
                <span class="champion-name">${championFlag}${championName}</span>
            </div>
        </div>
    `;
}

// ─── Zoom controls ────────────────────────────────────────────────────────────

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

// ─── Styles ───────────────────────────────────────────────────────────────────

const knockoutStyles = document.createElement('style');
knockoutStyles.textContent = `
    .knockout-container { padding: 20px; overflow-x: auto; }

    .bracket-wrapper { overflow-x: auto; overflow-y: hidden; padding: 20px; background: #f9f9f9; border-radius: 12px; }

    .bracket-container { transform-origin: top left; transition: transform 0.3s ease; min-width: 1400px; }

    .bracket { display: flex; gap: 24px; padding: 20px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); align-items: flex-start; }

    .bracket-round { display: flex; flex-direction: column; gap: 12px; min-width: 190px; }

    .round-title { text-align: center; color: #1a237e; font-size: 13px; font-weight: 700; text-transform: uppercase; margin: 0 0 16px 0; padding-bottom: 8px; border-bottom: 2px solid #1a237e; }

    .knockout-match { background: white; border: 2px solid #e0e0e0; border-radius: 8px; padding: 10px 12px; min-width: 175px; transition: border-color 0.2s ease; }
    .knockout-match:hover { border-color: #1a237e; box-shadow: 0 2px 8px rgba(26,35,126,0.15); }
    .knockout-match.finished { border-color: #4caf50; }
    .knockout-match.live { border-color: #f44336; animation: pulse-border 1.5s infinite; }
    .knockout-match.pending { background: #fafafa; }
    .knockout-match.final-match { border-width: 3px; border-color: #ffd700; background: linear-gradient(135deg, #fff9e6 0%, #ffffff 100%); }

    @keyframes pulse-border { 0%,100% { border-color: #f44336; } 50% { border-color: #ff8a80; } }

    .match-date { text-align: center; font-size: 10px; font-weight: 600; color: #888; margin-bottom: 8px; text-transform: uppercase; }

    .knockout-team { display: flex; align-items: center; gap: 6px; padding: 6px 4px; border-radius: 4px; }
    .knockout-team.winner { background: #e8f5e9; }

    .knockout-team .team-flag { font-size: 18px; flex-shrink: 0; }
    .knockout-team .team-name { flex: 1; font-size: 12px; color: #212121; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .knockout-team .team-placeholder { flex: 1; font-size: 11px; color: #bbb; font-style: italic; }
    .knockout-team .team-score { font-size: 17px; font-weight: 700; color: #1a237e; font-family: 'Roboto Mono', monospace; min-width: 22px; text-align: right; }
    .knockout-team .team-score.score-winner { color: #2e7d32; }

    .match-divider { height: 1px; background: #e0e0e0; margin: 2px 0; }

    .live-indicator { text-align: center; font-size: 10px; font-weight: 700; color: #f44336; margin-top: 6px; }

    .champion-slot { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 20px 16px; background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%); border-radius: 12px; border: 3px solid #f9a825; box-shadow: 0 4px 16px rgba(249,168,37,0.4); margin-top: 16px; }
    .trophy-icon { font-size: 40px; color: #f57f17; animation: float 3s ease-in-out infinite; }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
    .champion-team { display: flex; flex-direction: column; align-items: center; gap: 4px; }
    .champion-label { font-size: 11px; font-weight: 700; color: #f57f17; text-transform: uppercase; }
    .champion-name { font-size: 15px; font-weight: 700; color: #212121; }

    .third-place-section { margin-top: 24px; padding: 20px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }

    .bracket-legend { display: flex; gap: 20px; margin-top: 16px; padding: 12px 20px; background: white; border-radius: 8px; flex-wrap: wrap; }
    .legend-item { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #666; }
    .legend-badge { padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 600; }
    .legend-badge.qualified { background: #e8f5e9; color: #2e7d32; border: 1px solid #4caf50; }
    .legend-badge.live-badge { background: #ffebee; color: #c62828; border: 1px solid #f44336; }
    .legend-badge.pending { background: #f5f5f5; color: #757575; border: 1px solid #e0e0e0; }
`;
document.head.appendChild(knockoutStyles);

// Made with Bob
