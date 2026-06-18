// FIFA World Cup 2026 Dashboard - Main Application
// Inicialização e controle principal

const MATCH_REFRESH_INTERVAL = 10 * 60 * 1000;
let matchRefreshIntervalId = null;
let isRefreshingMatches = false;

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏆 Copa do Mundo 2026 - Dashboard Iniciado');
    
    // Inicializar componentes
    initializeApp();
    setupEventListeners();
    showWelcomeMessage();
});

function initializeApp() {
    // Remover overlay de loading
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    }, 1000);
    
    // Carregar conteúdo inicial
    renderGroups();
    
    // Initialize filters and search
    if (typeof initializeFilters === 'function') {
        initializeFilters();
    }

    initializeTheme();
    initializeLanguageSelector();
    updateSidebarInfo();
}

function setupEventListeners() {
    // Menu Toggle (Mobile)
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    // Navegação entre abas
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tab = item.getAttribute('data-tab');
            switchTab(tab);
            
            // Atualizar item ativo
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Fechar sidebar no mobile
            if (window.innerWidth < 768) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Busca
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Filtros
    setupFilters();

    const refreshButton = document.getElementById('refreshMatchesButton');
    if (refreshButton) {
        refreshButton.addEventListener('click', async () => {
            await refreshMatchData({ manual: true });
        });
    }

    // Auto-refresh for live matches
    startAutoRefresh();
    initializeMatchAutoRefresh();
}


function startAutoRefresh() {
    // Refresh live matches every 30 seconds
    setInterval(() => {
        const liveMatches = getLiveMatches();
        if (liveMatches.length > 0) {
            console.log('🔄 Auto-refresh: Updating live matches');
            refreshCurrentView();
        }
    }, 30000);
    
    // Update sidebar info every minute
    setInterval(() => {
        updateSidebarInfo();
    }, 60000);
}

function initializeMatchAutoRefresh() {
    refreshMatchData({ silent: false });

    if (matchRefreshIntervalId) {
        clearInterval(matchRefreshIntervalId);
    }

    matchRefreshIntervalId = setInterval(() => {
        refreshMatchData({ silent: true });
    }, MATCH_REFRESH_INTERVAL);
}

async function refreshMatchData(options = {}) {
    const { manual = false, silent = false } = options;

    if (isRefreshingMatches) {
        updateRefreshStatus('Uma atualização já está em andamento.', 'loading');
        return false;
    }

    if (typeof fetchDashboardDataWithFallback !== 'function') {
        updateRefreshStatus('Serviço de atualização indisponível no momento.', 'error');
        return false;
    }

    isRefreshingMatches = true;
    setRefreshButtonState(true, manual);
    updateRefreshStatus(manual ? 'Atualizando dados dos jogos...' : 'Sincronizando dados da API...', silent ? 'info' : 'loading');

    try {
        const providerResult = await fetchDashboardDataWithFallback();
        const dashboardData = providerResult.data;

        if (dashboardData.matches.length > 0) {
            mergeMatchData(dashboardData.matches);
        }

        if (Object.keys(dashboardData.standings).length > 0) {
            replaceGroupStandings(dashboardData.standings);
        }

        if (dashboardData.topScorers.length > 0) {
            updateTopScorers(dashboardData.topScorers);
        }

        if (dashboardData.topAssists.length > 0) {
            updateTopAssists(dashboardData.topAssists);
        }

        refreshAllViews();
        updateSidebarInfo();

        const providerLabel = providerResult.providerName ? ` via ${providerResult.providerName}` : '';
        const fallbackLabel = providerResult.isFallback ? ' (fallback)' : '';
        updateRefreshStatus(
            `Dados atualizados${providerLabel}${fallbackLabel} em ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}.`,
            'success'
        );
        return true;
    } catch (error) {
        console.error('❌ Error refreshing match data:', error);
        updateRefreshStatus(error.message || 'Não foi possível atualizar os dados.', 'error');
        return false;
    } finally {
        isRefreshingMatches = false;
        setRefreshButtonState(false, manual);
    }
}

function setRefreshButtonState(isLoading, manual = false) {
    const refreshButton = document.getElementById('refreshMatchesButton');
    if (!refreshButton) return;

    refreshButton.disabled = isLoading;
    refreshButton.classList.toggle('is-loading', isLoading);
    refreshButton.innerHTML = isLoading
        ? `<i class="fas fa-spinner fa-spin"></i> ${manual ? 'Atualizando...' : 'Sincronizando...'}`
        : '<i class="fas fa-rotate-right"></i> Atualizar Agora';
}

function updateRefreshStatus(message, status = 'info') {
    const statusElement = document.getElementById('refreshStatus');
    if (!statusElement) return;

    statusElement.textContent = message;
    statusElement.className = `refresh-status ${status}`;
}

function refreshCurrentView() {
    const activeSection = document.querySelector('.content-section.active');
    if (!activeSection) return;
    
    const sectionId = activeSection.id;
    const tabName = sectionId.replace('Section', '');
    
    // Refresh the current view
    switch(tabName) {
        case 'groups':
            if (typeof renderGroups === 'function') {
                renderGroups();
            }
            break;
        case 'calendar':
            if (typeof renderCalendar === 'function') {
                renderCalendar();
            }
            break;
        case 'results':
            if (typeof renderResults === 'function') {
                renderResults();
            }
            break;
        case 'knockout':
            if (typeof renderKnockout === 'function') {
                renderKnockout();
            }
            break;
        case 'stats':
            if (typeof renderStats === 'function') {
                renderStats();
            }
            break;
    }
}

function refreshAllViews() {
    if (typeof renderGroups === 'function') {
        renderGroups();
    }

    if (typeof renderCalendar === 'function') {
        renderCalendar();
    }

    if (typeof renderResults === 'function') {
        renderResults();
    }

    if (typeof renderKnockout === 'function') {
        renderKnockout();
    }

    if (typeof renderStats === 'function') {
        renderStats();
    }

    if (typeof applyFilters === 'function') {
        applyFilters();
    }
}

function mergeMatchData(apiMatches) {
    const currentMatches = getAllMatches();
    const mergedMatches = currentMatches.map(match => {
        // DO NOT update matches that are already finished - preserve completed game results
        if (match.status === 'finished') {
            return match;
        }

        const apiMatch = apiMatches.find(candidate => isSameMatch(candidate, match));

        if (!apiMatch) {
            return match;
        }

        return {
            ...match,
            ...apiMatch,
            id: match.id,
            stadium: apiMatch.stadium || match.stadium,
            group: apiMatch.group || match.group,
            phase: apiMatch.phase || match.phase,
            round: apiMatch.round || match.round
        };
    });

    const additionalApiMatches = apiMatches.filter(apiMatch =>
        !mergedMatches.some(match => isSameMatch(apiMatch, match))
    );

    replaceAllMatches([...mergedMatches, ...additionalApiMatches]);
}

function isSameMatch(apiMatch, localMatch) {
    if (!apiMatch || !localMatch) {
        return false;
    }

    const sameTeams =
        apiMatch.homeTeam === localMatch.homeTeam &&
        apiMatch.awayTeam === localMatch.awayTeam;

    const sameGroupAndRound =
        apiMatch.group &&
        localMatch.group &&
        apiMatch.group === localMatch.group &&
        apiMatch.round === localMatch.round;

    const apiDate = apiMatch.date ? new Date(apiMatch.date).getTime() : null;
    const localDate = localMatch.date ? new Date(localMatch.date).getTime() : null;
    const closeDate = apiDate && localDate ? Math.abs(apiDate - localDate) <= 24 * 60 * 60 * 1000 : false;

    return sameTeams && (sameGroupAndRound || closeDate);
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('dashboard-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }

    syncThemeIcon();
}

function syncThemeIcon() {
    const icon = document.querySelector('#themeToggle i');
    if (!icon) return;

    const isDark = document.body.classList.contains('dark-theme');
    icon.classList.toggle('fa-moon', !isDark);
    icon.classList.toggle('fa-sun', isDark);
}

function initializeLanguageSelector() {
    const langButtons = document.querySelectorAll('.lang-btn');
    const savedLanguage = localStorage.getItem('dashboard-language') || 'PT';

    langButtons.forEach(button => {
        const isActive = button.textContent.trim() === savedLanguage;
        button.classList.toggle('active', isActive);

        button.addEventListener('click', () => {
            const selectedLanguage = button.textContent.trim();
            langButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            localStorage.setItem('dashboard-language', selectedLanguage);
            updateRefreshStatus(`Idioma alterado para ${selectedLanguage}.`, 'success');
        });
    });
}

function updateSidebarInfo() {
    // Update next match info
    const nextMatchEl = document.getElementById('nextMatch');
    if (nextMatchEl && typeof getUpcomingMatches === 'function') {
        const upcoming = getUpcomingMatches(1);
        if (upcoming.length > 0) {
            const match = upcoming[0];
            const homeTeam = WORLD_CUP_2026.teams[match.homeTeam];
            const awayTeam = WORLD_CUP_2026.teams[match.awayTeam];

            if (homeTeam && awayTeam) {
                const date = new Date(match.date);
                const dateStr = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
                const timeStr = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
                nextMatchEl.textContent = `${homeTeam.flag} vs ${awayTeam.flag} - ${dateStr} ${timeStr}`;
            } else {
                nextMatchEl.textContent = 'Próximo jogo disponível';
            }
        } else {
            nextMatchEl.textContent = 'Nenhum jogo agendado';
        }
    }
    
    // Update top scorer info
    const topScorerEl = document.getElementById('topScorer');
    if (topScorerEl && typeof getTopScorers === 'function') {
        const scorers = getTopScorers(1);
        if (scorers.length > 0) {
            const scorer = scorers[0];
            const team = WORLD_CUP_2026.teams[scorer.team];
            topScorerEl.textContent = team
                ? `${scorer.player} ${team.flag} - ${scorer.goals} gols`
                : `${scorer.player} - ${scorer.goals} gols`;
        } else {
            topScorerEl.textContent = 'Aguardando dados';
        }
    }
}

function switchTab(tabName) {
    // Esconder todas as seções
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Mostrar seção selecionada
    const targetSection = document.getElementById(`${tabName}Section`);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Carregar conteúdo específico usando as funções dos módulos
        switch(tabName) {
            case 'groups':
                if (typeof renderGroups === 'function') {
                    renderGroups();
                }
                break;
            case 'calendar':
                if (typeof renderCalendar === 'function') {
                    renderCalendar();
                }
                break;
            case 'results':
                if (typeof renderResults === 'function') {
                    renderResults();
                }
                break;
            case 'knockout':
                if (typeof renderKnockout === 'function') {
                    renderKnockout();
                }
                break;
            case 'stats':
                if (typeof renderStats === 'function') {
                    renderStats();
                }
                break;
        }
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const icon = document.querySelector('#themeToggle i');
    if (icon) {
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    }
}

function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    // Search is now handled by filters.js module
    if (typeof performSearch === 'function') {
        performSearch(searchTerm);
    }
}

function setupFilters() {
    // Filters are now handled by filters.js module
    // This function is kept for compatibility
}

function showWelcomeMessage() {
    console.log(`
    ╔═══════════════════════════════════════════════════════╗
    ║                                                       ║
    ║        🏆 FIFA WORLD CUP 2026 DASHBOARD 🏆          ║
    ║                                                       ║
    ║  Estados Unidos • Canadá • México                    ║
    ║  11 de junho - 19 de julho de 2026                   ║
    ║                                                       ║
    ║  ✅ HTML: Completo                                   ║
    ║  ✅ CSS: Completo                                    ║
    ║  ✅ JavaScript: Completo e Funcional                 ║
    ║  ✅ Dados: 48 seleções, 12 grupos, 104 jogos         ║
    ║                                                       ║
    ║  📊 Módulos Carregados:                              ║
    ║     • data.js - Dados da Copa                        ║
    ║     • groups.js - Tabelas de Grupos                  ║
    ║     • matches.js - Calendário e Resultados           ║
    ║     • knockout.js - Fase Eliminatória                ║
    ║     • stats.js - Estatísticas                        ║
    ║     • filters.js - Filtros e Busca                   ║
    ║     • charts.js - Gráficos                           ║
    ║                                                       ║
    ║  🎉 Dashboard 100% Funcional!                        ║
    ║                                                       ║
    ╚═══════════════════════════════════════════════════════╝
    `);
}

// Estilos adicionais para os cards de placeholder
const style = document.createElement('style');
style.textContent = `
    .welcome-card, .placeholder-card {
        background: white;
        border-radius: 12px;
        padding: 40px;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        animation: fadeIn 0.5s ease-in;
    }
    
    .welcome-card h2 {
        color: #1a237e;
        margin: 20px 0;
        font-size: 28px;
    }
    
    .welcome-card p, .placeholder-card p {
        color: #666;
        font-size: 16px;
        line-height: 1.6;
        margin: 10px 0;
    }
    
    .info-box {
        background: #f5f5f5;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
    }
    
    .info-box h3 {
        color: #1a237e;
        margin: 15px 0 5px 0;
        font-size: 20px;
    }
    
    .info-box p {
        color: #666;
        font-size: 14px;
        margin: 0;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Made with Bob
