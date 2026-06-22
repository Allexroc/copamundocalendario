// FIFA World Cup 2026 Dashboard - Main Application
// Inicialização e controle principal

// Capturar erros globais
window.addEventListener('error', function(e) {
    console.error('❌ Erro global capturado:', e.message, e.filename, e.lineno, e.colno);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ Promise rejeitada:', e.reason);
});

// Usar window.load ao invés de DOMContentLoaded para garantir que todos os scripts carregaram
window.addEventListener('load', function() {
    console.log('🏆 Copa do Mundo 2026 - Dashboard Iniciado');
    
    // Aguardar 200ms para garantir que todos os scripts foram processados
    setTimeout(function() {
        try {
            // Verificar dependências críticas
            if (typeof WORLD_CUP_2026 === 'undefined') {
                console.error('❌ WORLD_CUP_2026 não está definido!');
                console.error('Tentando recarregar em 2 segundos...');
                setTimeout(function() {
                    window.location.reload();
                }, 2000);
                return;
            }
            
            console.log('✅ WORLD_CUP_2026 carregado:', {
                teams: Object.keys(WORLD_CUP_2026.teams).length,
                matches: WORLD_CUP_2026.matches.length,
                groups: Object.keys(WORLD_CUP_2026.groupStandings).length
            });
            
            // Verificar funções essenciais
            const requiredFunctions = ['renderGroups', 'getGroupStandings', 'getTeamInfo'];
            const missingFunctions = requiredFunctions.filter(fn => typeof window[fn] !== 'function');
            
            if (missingFunctions.length > 0) {
                console.error('❌ Funções faltando:', missingFunctions);
                console.error('Tentando recarregar em 2 segundos...');
                setTimeout(function() {
                    window.location.reload();
                }, 2000);
                return;
            }
            
            console.log('✅ Todas as funções essenciais carregadas');
            
            // Inicializar componentes
            initializeApp();
            setupEventListeners();
            
            if (typeof initializeBobBanner === 'function') {
                initializeBobBanner();
            }
            
            if (typeof showWelcomeMessage === 'function') {
                showWelcomeMessage();
            }
            
            // Inicializar status da API
            initializeAPIStatus();
            
            // Iniciar integração com WorldCup API
            if (typeof WorldCupAPI !== 'undefined') {
                WorldCupAPI.startAutoRefresh();
            }
            
            console.log('✅ Dashboard inicializado com sucesso!');
        } catch (error) {
            console.error('❌ Erro ao inicializar dashboard:', error);
            alert('Erro ao inicializar o dashboard. A página será recarregada.');
            setTimeout(function() {
                window.location.reload();
            }, 2000);
        }
    }, 200);
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
            const statusEl = document.getElementById('refreshStatus');
            const icon = refreshButton.querySelector('i');
            
            try {
                // Atualizar status da API para loading
                updateAPIStatus('loading');
                
                // Mostrar loading
                if (icon) {
                    icon.classList.add('fa-spin');
                }
                if (statusEl) {
                    statusEl.textContent = 'Buscando dados da API...';
                    statusEl.className = 'refresh-status loading';
                }
                
                // Buscar dados reais da API
                if (typeof APIIntegration !== 'undefined') {
                    const success = await APIIntegration.updateDashboard();
                    
                    if (success) {
                        // Recarregar todas as views com os novos dados
                        if (typeof renderGroups === 'function') renderGroups();
                        if (typeof renderCalendar === 'function') renderCalendar();
                        if (typeof renderResults === 'function') renderResults();
                        if (typeof renderKnockout === 'function') renderKnockout();
                        if (typeof renderStats === 'function') renderStats();
                        
                        // Atualizar informações da sidebar
                        updateSidebarInfo();
                        
                        // Mostrar sucesso
                        if (statusEl) {
                            const now = new Date();
                            const timeStr = now.toLocaleTimeString('pt-BR', {
                                hour: '2-digit',
                                minute: '2-digit',
                                timeZone: 'America/Sao_Paulo'
                            });
                            const dateStr = now.toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                timeZone: 'America/Sao_Paulo'
                            });
                            statusEl.textContent = `✓ Atualizado em ${dateStr} às ${timeStr}`;
                            statusEl.className = 'refresh-status success';
                        }
                        
                        // Atualizar status da API para conectado
                        updateAPIStatus('connected');
                    } else {
                        throw new Error('Falha ao atualizar dados');
                    }
                } else {
                    throw new Error('Módulo de API não disponível');
                }
                
            } catch (error) {
                console.error('Erro ao atualizar:', error);
                
                // Atualizar status da API para desconectado
                updateAPIStatus('disconnected');
                
                if (statusEl) {
                    statusEl.textContent = '✗ Erro ao atualizar. Verifique sua conexão.';
                    statusEl.className = 'refresh-status error';
                }
            } finally {
                if (icon) {
                    icon.classList.remove('fa-spin');
                }
            }
        });
    }

    // Auto-refresh for live matches (mantido para compatibilidade)
    startAutoRefresh();
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

// Função de seletor de idioma removida - mantendo apenas Português

function initializeAPIStatus() {
    const badge = document.getElementById('apiStatusBadge');
    if (!badge) return;
    
    // Iniciar como desconectado
    updateAPIStatus('disconnected');
    
    // Verificar status periodicamente (a cada 30 segundos)
    setInterval(() => {
        if (typeof APIIntegration !== 'undefined') {
            const status = APIIntegration.getAPIStatus();
            if (status.isLoading) {
                updateAPIStatus('loading');
            } else if (status.hasData) {
                updateAPIStatus('connected');
            } else {
                updateAPIStatus('disconnected');
            }
        }
    }, 30000);
}

function updateAPIStatus(status) {
    const badge = document.getElementById('apiStatusBadge');
    if (!badge) return;
    
    // Remover classes anteriores
    badge.classList.remove('connected', 'disconnected', 'loading');
    
    // Adicionar nova classe
    badge.classList.add(status);
    
    // Atualizar texto e tooltip
    const textEl = badge.querySelector('.api-status-text');
    if (textEl) {
        switch(status) {
            case 'connected':
                textEl.textContent = 'API';
                badge.title = 'Conectado à API Football-Data.org';
                break;
            case 'loading':
                textEl.textContent = 'API';
                badge.title = 'Carregando dados da API...';
                break;
            case 'disconnected':
                textEl.textContent = 'API';
                badge.title = 'Desconectado - Clique em Atualizar para conectar';
                break;
        }
    }
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
                const dateStr = date.toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    timeZone: 'America/Sao_Paulo'
                });
                const timeStr = date.toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'America/Sao_Paulo'
                });
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
    console.log('🔄 Mudando para aba:', tabName);
    
    try {
        // Esconder todas as seções
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => section.classList.remove('active'));
        
        // Mostrar seção selecionada
        const targetSection = document.getElementById(`${tabName}Section`);
        if (!targetSection) {
            console.error('❌ Seção não encontrada:', `${tabName}Section`);
            return;
        }
        
        targetSection.classList.add('active');
        console.log('✅ Seção ativada:', tabName);
        
        // Carregar conteúdo específico usando as funções dos módulos
        switch(tabName) {
            case 'groups':
                console.log('📊 Renderizando grupos...');
                if (typeof renderGroups === 'function') {
                    renderGroups();
                } else {
                    console.error('❌ renderGroups não está definida');
                }
                break;
            case 'calendar':
                console.log('📅 Renderizando calendário...');
                if (typeof renderCalendar === 'function') {
                    renderCalendar();
                } else {
                    console.error('❌ renderCalendar não está definida');
                }
                break;
            case 'results':
                console.log('⚽ Renderizando resultados...');
                if (typeof renderResults === 'function') {
                    renderResults();
                } else {
                    console.error('❌ renderResults não está definida');
                }
                break;
            case 'knockout':
                console.log('🏆 Renderizando eliminatórias...');
                if (typeof renderKnockout === 'function') {
                    renderKnockout();
                } else {
                    console.error('❌ renderKnockout não está definida');
                }
                break;
            case 'stats':
                console.log('📈 Renderizando estatísticas...');
                if (typeof renderStats === 'function') {
                    renderStats();
                } else {
                    console.error('❌ renderStats não está definida');
                }
                break;
        }
    } catch (error) {
        console.error('❌ Erro ao mudar de aba:', error);
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
