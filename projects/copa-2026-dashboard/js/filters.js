// FIFA World Cup 2026 - Filters Management
// Handles filtering and search functionality

let activeFilters = {
    group: 'all',
    team: 'all',
    date: '',
    phase: 'all'
};

function initializeFilters() {
    setupFilterListeners();
    populateTeamFilter();
    updateNextMatchInfo();
    updateTopScorerInfo();
}

function setupFilterListeners() {
    // Group filter
    const groupFilter = document.getElementById('groupFilter');
    if (groupFilter) {
        groupFilter.addEventListener('change', (e) => {
            activeFilters.group = e.target.value;
            applyFilters();
        });
    }

    // Team filter
    const teamFilter = document.getElementById('teamFilter');
    if (teamFilter) {
        teamFilter.addEventListener('change', (e) => {
            activeFilters.team = e.target.value;
            applyFilters();
        });
    }

    // Date filter
    const dateFilter = document.getElementById('dateFilter');
    if (dateFilter) {
        dateFilter.addEventListener('change', (e) => {
            activeFilters.date = e.target.value;
            applyFilters();
        });
    }

    // Phase filter
    const phaseFilter = document.getElementById('phaseFilter');
    if (phaseFilter) {
        phaseFilter.addEventListener('change', (e) => {
            activeFilters.phase = e.target.value;
            applyFilters();
        });
    }

    // Reset filters button
    const resetBtn = document.getElementById('resetFilters');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetFilters);
    }

    // Results date filter
    const resultsDateFilter = document.getElementById('resultsDateFilter');
    if (resultsDateFilter) {
        resultsDateFilter.addEventListener('change', (e) => {
            filterResultsByDate(e.target.value);
        });
    }
}

function populateTeamFilter() {
    const teamFilter = document.getElementById('teamFilter');
    if (!teamFilter) return;

    const teams = Object.values(WORLD_CUP_2026.teams).sort((a, b) => 
        a.name.localeCompare(b.name)
    );

    teamFilter.innerHTML = '<option value="all">Todas as Seleções</option>';
    
    teams.forEach(team => {
        const option = document.createElement('option');
        option.value = team.code;
        option.textContent = `${team.flag} ${team.name}`;
        teamFilter.appendChild(option);
    });
}

function applyFilters() {
    // Get current active tab
    const activeSection = document.querySelector('.content-section.active');
    if (!activeSection) return;

    const sectionId = activeSection.id;

    // Apply filters based on active section
    if (sectionId === 'groupsSection') {
        filterGroups();
    } else if (sectionId === 'calendarSection') {
        filterCalendar();
    } else if (sectionId === 'resultsSection') {
        filterResults();
    }
}

function filterGroups() {
    const groupCards = document.querySelectorAll('.group-card');
    
    groupCards.forEach(card => {
        const groupId = card.getAttribute('data-group');
        const shouldShow = activeFilters.group === 'all' || activeFilters.group === groupId;
        
        if (shouldShow && activeFilters.team !== 'all') {
            // Check if team is in this group
            const standings = getGroupStandings(groupId);
            const hasTeam = standings.some(t => t.team === activeFilters.team);
            card.style.display = hasTeam ? 'block' : 'none';
        } else {
            card.style.display = shouldShow ? 'block' : 'none';
        }
    });
}

function filterCalendar() {
    let matches = getAllMatches();

    // Apply group filter
    if (activeFilters.group !== 'all') {
        matches = matches.filter(m => m.group === activeFilters.group);
    }

    // Apply team filter
    if (activeFilters.team !== 'all') {
        matches = matches.filter(m => 
            m.homeTeam === activeFilters.team || m.awayTeam === activeFilters.team
        );
    }

    // Apply date filter
    if (activeFilters.date) {
        matches = matches.filter(m => m.date.startsWith(activeFilters.date));
    }

    // Apply phase filter
    if (activeFilters.phase !== 'all') {
        matches = matches.filter(m => m.phase === activeFilters.phase);
    }

    // Update filtered matches and re-render
    filteredMatches = matches;
    
    const container = document.getElementById('calendarContainer');
    if (container) {
        if (currentView === 'list') {
            renderListView(container);
        } else {
            renderGridView(container);
        }
    }
}

function filterResults() {
    let matches = getAllMatches().filter(m => m.status === 'finished');

    // Apply group filter
    if (activeFilters.group !== 'all') {
        matches = matches.filter(m => m.group === activeFilters.group);
    }

    // Apply team filter
    if (activeFilters.team !== 'all') {
        matches = matches.filter(m => 
            m.homeTeam === activeFilters.team || m.awayTeam === activeFilters.team
        );
    }

    // Apply date filter
    if (activeFilters.date) {
        matches = matches.filter(m => m.date.startsWith(activeFilters.date));
    }

    // Re-render results
    const container = document.getElementById('resultsContainer');
    if (!container) return;

    if (matches.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-filter" style="font-size: 48px; color: #ccc;"></i>
                <h3>Nenhum resultado encontrado</h3>
                <p>Tente ajustar os filtros para ver mais resultados.</p>
            </div>
        `;
        return;
    }

    const matchesByDate = groupMatchesByDate(matches);
    container.innerHTML = '';
    
    Object.keys(matchesByDate).sort().reverse().forEach(date => {
        const dateSection = createResultsDateSection(date, matchesByDate[date]);
        container.appendChild(dateSection);
    });
}

function filterResultsByDate(filter) {
    const today = new Date();
    let matches = getAllMatches().filter(m => m.status === 'finished');

    switch(filter) {
        case 'today':
            const todayStr = today.toISOString().split('T')[0];
            matches = matches.filter(m => m.date.startsWith(todayStr));
            break;
        case 'yesterday':
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = yesterday.toISOString().split('T')[0];
            matches = matches.filter(m => m.date.startsWith(yesterdayStr));
            break;
        case 'week':
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            matches = matches.filter(m => {
                const matchDate = new Date(m.date);
                return matchDate >= weekAgo && matchDate <= today;
            });
            break;
    }

    // Re-render results
    const container = document.getElementById('resultsContainer');
    if (!container) return;

    if (matches.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-calendar-times" style="font-size: 48px; color: #ccc;"></i>
                <h3>Nenhum resultado neste período</h3>
                <p>Não há jogos finalizados no período selecionado.</p>
            </div>
        `;
        return;
    }

    const matchesByDate = groupMatchesByDate(matches);
    container.innerHTML = '';
    
    Object.keys(matchesByDate).sort().reverse().forEach(date => {
        const dateSection = createResultsDateSection(date, matchesByDate[date]);
        container.appendChild(dateSection);
    });
}

function resetFilters() {
    activeFilters = {
        group: 'all',
        team: 'all',
        date: '',
        phase: 'all'
    };

    // Reset filter inputs
    document.getElementById('groupFilter').value = 'all';
    document.getElementById('teamFilter').value = 'all';
    document.getElementById('dateFilter').value = '';
    document.getElementById('phaseFilter').value = 'all';

    // Reapply filters (which will show all)
    applyFilters();
}

function updateNextMatchInfo() {
    const nextMatchEl = document.getElementById('nextMatch');
    if (!nextMatchEl) return;

    const now = new Date();
    const upcomingMatches = getAllMatches()
        .filter(m => m.status === 'scheduled' && new Date(m.date) > now)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (upcomingMatches.length > 0) {
        const nextMatch = upcomingMatches[0];
        const homeTeam = getTeamInfo(nextMatch.homeTeam);
        const awayTeam = getTeamInfo(nextMatch.awayTeam);
        const matchDate = new Date(nextMatch.date);
        const dateStr = matchDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        const timeStr = matchDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        
        nextMatchEl.innerHTML = `
            <div style="font-size: 11px; color: #666;">${dateStr} às ${timeStr}</div>
            <div style="font-size: 12px; font-weight: 600; margin-top: 4px;">
                ${homeTeam.flag} ${homeTeam.name} vs ${awayTeam.flag} ${awayTeam.name}
            </div>
        `;
    } else {
        nextMatchEl.textContent = 'Nenhum jogo agendado';
    }
}

function updateTopScorerInfo() {
    const topScorerEl = document.getElementById('topScorer');
    if (!topScorerEl) return;

    const scorers = getTopScorers(1);
    if (scorers.length > 0) {
        const topScorer = scorers[0];
        const team = getTeamInfo(topScorer.team);
        
        topScorerEl.innerHTML = `
            <div style="font-size: 12px; font-weight: 600;">
                ${topScorer.player}
            </div>
            <div style="font-size: 11px; color: #666; margin-top: 4px;">
                ${team.flag} ${team.name} - ${topScorer.goals} gols
            </div>
        `;
    } else {
        topScorerEl.textContent = 'Aguardando dados';
    }
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            performSearch(e.target.value);
        }, 300);
    });
}

function performSearch(query) {
    if (!query || query.length < 2) {
        // Clear search results
        return;
    }

    query = query.toLowerCase();
    const results = {
        teams: [],
        players: [],
        stadiums: []
    };

    // Search teams
    Object.values(WORLD_CUP_2026.teams).forEach(team => {
        if (team.name.toLowerCase().includes(query) || 
            team.code.toLowerCase().includes(query)) {
            results.teams.push(team);
        }
    });

    // Search players
    const allPlayers = [...WORLD_CUP_2026.topScorers, ...WORLD_CUP_2026.topAssists];
    allPlayers.forEach(player => {
        if (player.player.toLowerCase().includes(query)) {
            results.players.push(player);
        }
    });

    // Search stadiums
    Object.keys(WORLD_CUP_2026.stadiums).forEach(stadium => {
        if (stadium.toLowerCase().includes(query)) {
            results.stadiums.push({
                name: stadium,
                ...WORLD_CUP_2026.stadiums[stadium]
            });
        }
    });

    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    // Create or get search results container
    let resultsContainer = document.getElementById('searchResults');
    
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.id = 'searchResults';
        resultsContainer.className = 'search-results';
        
        const searchBar = document.querySelector('.search-bar');
        if (searchBar) {
            searchBar.appendChild(resultsContainer);
        }
    }

    const totalResults = results.teams.length + results.players.length + results.stadiums.length;

    if (totalResults === 0) {
        resultsContainer.innerHTML = `
            <div class="search-empty">
                <i class="fas fa-search"></i>
                <p>Nenhum resultado para "${query}"</p>
            </div>
        `;
        resultsContainer.style.display = 'block';
        return;
    }

    let html = '<div class="search-results-content">';

    if (results.teams.length > 0) {
        html += '<div class="search-category"><h4>Seleções</h4>';
        results.teams.slice(0, 5).forEach(team => {
            html += `
                <div class="search-item" data-type="team" data-code="${team.code}">
                    <span class="search-flag">${team.flag}</span>
                    <span class="search-name">${team.name}</span>
                    <span class="search-badge">Grupo ${team.group}</span>
                </div>
            `;
        });
        html += '</div>';
    }

    if (results.players.length > 0) {
        html += '<div class="search-category"><h4>Jogadores</h4>';
        results.players.slice(0, 5).forEach(player => {
            const team = getTeamInfo(player.team);
            html += `
                <div class="search-item" data-type="player">
                    <span class="search-name">${player.player}</span>
                    <span class="search-team">${team.flag} ${team.name}</span>
                </div>
            `;
        });
        html += '</div>';
    }

    if (results.stadiums.length > 0) {
        html += '<div class="search-category"><h4>Estádios</h4>';
        results.stadiums.slice(0, 5).forEach(stadium => {
            html += `
                <div class="search-item" data-type="stadium">
                    <i class="fas fa-map-marker-alt"></i>
                    <span class="search-name">${stadium.name}</span>
                    <span class="search-location">${stadium.city}, ${stadium.country}</span>
                </div>
            `;
        });
        html += '</div>';
    }

    html += '</div>';
    resultsContainer.innerHTML = html;
    resultsContainer.style.display = 'block';

    // Add click handlers
    resultsContainer.querySelectorAll('.search-item').forEach(item => {
        item.addEventListener('click', () => {
            handleSearchItemClick(item);
            resultsContainer.style.display = 'none';
            document.getElementById('searchInput').value = '';
        });
    });
}

function handleSearchItemClick(item) {
    const type = item.getAttribute('data-type');
    
    if (type === 'team') {
        const teamCode = item.getAttribute('data-code');
        const team = getTeamInfo(teamCode);
        
        // Switch to groups tab and filter by team
        document.querySelector('[data-tab="groups"]').click();
        setTimeout(() => {
            document.getElementById('teamFilter').value = teamCode;
            document.getElementById('teamFilter').dispatchEvent(new Event('change'));
        }, 100);
    }
}

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    const searchBar = document.querySelector('.search-bar');
    const resultsContainer = document.getElementById('searchResults');
    
    if (resultsContainer && !searchBar.contains(e.target)) {
        resultsContainer.style.display = 'none';
    }
});

// Add styles for search
const searchStyles = document.createElement('style');
searchStyles.textContent = `
    .search-results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin-top: 8px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        max-height: 400px;
        overflow-y: auto;
        z-index: 1000;
        display: none;
    }
    
    .search-results-content {
        padding: 12px;
    }
    
    .search-category {
        margin-bottom: 16px;
    }
    
    .search-category:last-child {
        margin-bottom: 0;
    }
    
    .search-category h4 {
        margin: 0 0 8px 0;
        padding: 8px 12px;
        background: #f5f5f5;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 700;
        color: #666;
        text-transform: uppercase;
    }
    
    .search-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-radius: 6px;
        cursor: pointer;
        transition: background 0.2s ease;
    }
    
    .search-item:hover {
        background: #f5f5f5;
    }
    
    .search-flag {
        font-size: 24px;
    }
    
    .search-name {
        flex: 1;
        font-weight: 600;
        color: #212121;
    }
    
    .search-badge {
        padding: 4px 8px;
        background: #e3f2fd;
        color: #1565c0;
        border-radius: 4px;
        font-size: 11px;
        font-weight: 600;
    }
    
    .search-team, .search-location {
        font-size: 12px;
        color: #666;
    }
    
    .search-empty {
        padding: 40px 20px;
        text-align: center;
        color: #999;
    }
    
    .search-empty i {
        font-size: 32px;
        margin-bottom: 12px;
    }
    
    .search-empty p {
        margin: 0;
        font-size: 14px;
    }
`;
document.head.appendChild(searchStyles);

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initializeFilters();
    setupSearch();
});

console.log('✅ Filters module loaded');

// Made with Bob
