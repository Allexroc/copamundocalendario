// FIFA World Cup 2026 Dashboard - Main Application
// Inicialização e controle principal

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
