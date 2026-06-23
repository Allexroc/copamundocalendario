// FIFA World Cup 2026 - WorldCup26.ir API Integration
// API: https://worldcup26.ir/get/games
// NOTA: API externa desabilitada - usando dados locais

const WorldCupAPI = {
    baseUrl: 'https://worldcup26.ir/get/games',
    updateInterval: 60 * 60 * 1000, // 60 minutos (1 hora)
    lastUpdate: null,
    isLoading: false,
    autoRefreshTimer: null,
    countdownTimer: null,
    nextUpdateTime: null,
    apiEnabled: false, // API externa desabilitada

    /**
     * Busca dados dos jogos da API
     * @returns {Promise<Object>} Dados dos jogos
     */
    async fetchGames() {
        if (this.isLoading) {
            console.warn('⚠️ Já existe uma requisição em andamento');
            return null;
        }

        this.isLoading = true;
        this.showLoading(true);

        try {
            console.log('🔄 Buscando dados da API WorldCup26.ir...');
            
            const response = await fetch(this.baseUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            this.lastUpdate = new Date();
            
            console.log('✅ Dados recebidos com sucesso');
            this.updateLastUpdateDisplay();
            
            return data;

        } catch (error) {
            console.error('❌ Erro ao buscar dados da API:', error);
            this.showError(error.message);
            throw error;

        } finally {
            this.isLoading = false;
            this.showLoading(false);
        }
    },

    /**
     * Converte dados da API para o formato interno
     * @param {Object} apiData - Dados da API
     * @returns {Object} Dados convertidos
     */
    convertAPIData(apiData) {
        if (!apiData || !Array.isArray(apiData.games)) {
            console.warn('⚠️ Formato de dados inválido');
            return { matches: [], standings: {}, topScorers: [], topAssists: [] };
        }

        const matches = apiData.games.map((game, index) => ({
            id: game.id || index + 1,
            date: game.date || new Date().toISOString(),
            group: this.extractGroup(game.group),
            homeTeam: this.normalizeTeamCode(game.homeTeam),
            awayTeam: this.normalizeTeamCode(game.awayTeam),
            homeScore: game.homeScore !== undefined ? game.homeScore : null,
            awayScore: game.awayScore !== undefined ? game.awayScore : null,
            stadium: game.stadium || 'Stadium TBD',
            status: this.convertStatus(game.status),
            phase: game.phase || 'group',
            round: game.round || 1,
            minute: game.minute || null,
            lastUpdated: new Date().toISOString()
        }));

        return {
            matches,
            standings: this.calculateStandings(matches),
            topScorers: apiData.topScorers || [],
            topAssists: apiData.topAssists || []
        };
    },

    /**
     * Extrai código do grupo
     * @param {string} groupName - Nome do grupo
     * @returns {string} Código do grupo (A-L)
     */
    extractGroup(groupName) {
        if (!groupName) return '';
        const match = groupName.match(/[A-L]/i);
        return match ? match[0].toUpperCase() : '';
    },

    /**
     * Normaliza código do time
     * @param {string} teamName - Nome do time
     * @returns {string} Código do time (3 letras)
     */
    normalizeTeamCode(teamName) {
        if (!teamName) return '';
        
        // Mapeamento de nomes para códigos
        const teamMap = {
            'Mexico': 'MEX', 'México': 'MEX',
            'South Africa': 'RSA', 'África do Sul': 'RSA',
            'South Korea': 'KOR', 'Coreia do Sul': 'KOR',
            'Czech Republic': 'CZE', 'Rep. Tcheca': 'CZE',
            'Canada': 'CAN', 'Canadá': 'CAN',
            'Bosnia': 'BIH', 'Bósnia': 'BIH',
            'Qatar': 'QAT',
            'Switzerland': 'SUI', 'Suíça': 'SUI',
            'Brazil': 'BRA', 'Brasil': 'BRA',
            'Morocco': 'MAR', 'Marrocos': 'MAR',
            'Haiti': 'HAI',
            'Scotland': 'SCO', 'Escócia': 'SCO',
            'USA': 'USA', 'United States': 'USA', 'Estados Unidos': 'USA',
            'Paraguay': 'PAR', 'Paraguai': 'PAR',
            'Australia': 'AUS', 'Austrália': 'AUS',
            'Turkey': 'TUR', 'Turquia': 'TUR',
            'Germany': 'GER', 'Alemanha': 'GER',
            'Curacao': 'CUW', 'Curaçao': 'CUW',
            'Ivory Coast': 'CIV', 'Costa do Marfim': 'CIV',
            'Ecuador': 'ECU', 'Equador': 'ECU',
            'Netherlands': 'NED', 'Holanda': 'NED',
            'Japan': 'JPN', 'Japão': 'JPN',
            'Sweden': 'SWE', 'Suécia': 'SWE',
            'Tunisia': 'TUN', 'Tunísia': 'TUN',
            'Belgium': 'BEL', 'Bélgica': 'BEL',
            'Egypt': 'EGY', 'Egito': 'EGY',
            'Iran': 'IRN', 'Irã': 'IRN',
            'New Zealand': 'NZL', 'Nova Zelândia': 'NZL',
            'Spain': 'ESP', 'Espanha': 'ESP',
            'Cape Verde': 'CPV', 'Cabo Verde': 'CPV',
            'Saudi Arabia': 'KSA', 'Arábia Saudita': 'KSA',
            'Uruguay': 'URU', 'Uruguai': 'URU',
            'France': 'FRA', 'França': 'FRA',
            'Senegal': 'SEN',
            'Iraq': 'IRQ', 'Iraque': 'IRQ',
            'Norway': 'NOR', 'Noruega': 'NOR',
            'Argentina': 'ARG',
            'Algeria': 'ALG', 'Argélia': 'ALG',
            'Austria': 'AUT', 'Áustria': 'AUT',
            'Jordan': 'JOR', 'Jordânia': 'JOR',
            'Portugal': 'POR',
            'DR Congo': 'COD', 'RD Congo': 'COD',
            'Uzbekistan': 'UZB', 'Uzbequistão': 'UZB',
            'Colombia': 'COL', 'Colômbia': 'COL',
            'England': 'ENG', 'Inglaterra': 'ENG',
            'Croatia': 'CRO', 'Croácia': 'CRO',
            'Ghana': 'GHA', 'Gana': 'GHA',
            'Panama': 'PAN', 'Panamá': 'PAN'
        };

        return teamMap[teamName] || teamName.substring(0, 3).toUpperCase();
    },

    /**
     * Converte status do jogo
     * @param {string} status - Status da API
     * @returns {string} Status interno
     */
    convertStatus(status) {
        if (!status) return 'scheduled';
        
        const statusMap = {
            'scheduled': 'scheduled',
            'live': 'live',
            'finished': 'finished',
            'ft': 'finished',
            'postponed': 'postponed',
            'cancelled': 'cancelled'
        };

        return statusMap[status.toLowerCase()] || 'scheduled';
    },

    /**
     * Calcula classificação dos grupos baseado nos jogos
     * @param {Array} matches - Lista de jogos
     * @returns {Object} Classificação por grupo
     */
    calculateStandings(matches) {
        const standings = {};
        const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

        groups.forEach(group => {
            // Buscar todos os jogos do grupo (finalizados e agendados)
            const allGroupMatches = matches.filter(m => m.group === group);
            const finishedMatches = allGroupMatches.filter(m => m.status === 'finished');
            const teams = {};

            // Inicializar todos os times do grupo (mesmo sem jogos finalizados)
            allGroupMatches.forEach(match => {
                if (!teams[match.homeTeam]) {
                    teams[match.homeTeam] = {
                        team: match.homeTeam,
                        played: 0,
                        won: 0,
                        drawn: 0,
                        lost: 0,
                        goalsFor: 0,
                        goalsAgainst: 0,
                        points: 0
                    };
                }
                if (!teams[match.awayTeam]) {
                    teams[match.awayTeam] = {
                        team: match.awayTeam,
                        played: 0,
                        won: 0,
                        drawn: 0,
                        lost: 0,
                        goalsFor: 0,
                        goalsAgainst: 0,
                        points: 0
                    };
                }
            });

            // Atualizar estatísticas apenas para jogos finalizados
            finishedMatches.forEach(match => {
                teams[match.homeTeam].played++;
                teams[match.awayTeam].played++;
                teams[match.homeTeam].goalsFor += match.homeScore || 0;
                teams[match.homeTeam].goalsAgainst += match.awayScore || 0;
                teams[match.awayTeam].goalsFor += match.awayScore || 0;
                teams[match.awayTeam].goalsAgainst += match.homeScore || 0;

                if (match.homeScore > match.awayScore) {
                    teams[match.homeTeam].won++;
                    teams[match.homeTeam].points += 3;
                    teams[match.awayTeam].lost++;
                } else if (match.homeScore < match.awayScore) {
                    teams[match.awayTeam].won++;
                    teams[match.awayTeam].points += 3;
                    teams[match.homeTeam].lost++;
                } else {
                    teams[match.homeTeam].drawn++;
                    teams[match.awayTeam].drawn++;
                    teams[match.homeTeam].points++;
                    teams[match.awayTeam].points++;
                }
            });

            // Ordenar times
            standings[group] = Object.values(teams).sort((a, b) => {
                if (b.points !== a.points) return b.points - a.points;
                const goalDiffA = a.goalsFor - a.goalsAgainst;
                const goalDiffB = b.goalsFor - b.goalsAgainst;
                if (goalDiffB !== goalDiffA) return goalDiffB - goalDiffA;
                return b.goalsFor - a.goalsFor;
            });
        });

        return standings;
    },

    /**
     * Atualiza dados no sistema
     * @param {boolean} manual - Se é atualização manual
     */
    async updateData(manual = false) {
        // Verificar se API está habilitada
        if (!this.apiEnabled) {
            console.log('ℹ️ API externa desabilitada - usando dados locais');
            this.showInfo('Atualização automática desabilitada. Os dados são atualizados manualmente no código.');
            return false;
        }

        try {
            const apiData = await this.fetchGames();
            if (!apiData) return false;

            const convertedData = this.convertAPIData(apiData);

            // Atualizar dados no sistema
            if (convertedData.matches.length > 0) {
                replaceAllMatches(convertedData.matches);
            }

            if (Object.keys(convertedData.standings).length > 0) {
                replaceGroupStandings(convertedData.standings);
            }

            if (convertedData.topScorers.length > 0) {
                updateTopScorers(convertedData.topScorers);
            }

            if (convertedData.topAssists.length > 0) {
                updateTopAssists(convertedData.topAssists);
            }

            // Atualizar interface
            if (typeof refreshAllViews === 'function') {
                refreshAllViews();
            }

            if (typeof updateSidebarInfo === 'function') {
                updateSidebarInfo();
            }

            this.showSuccess(manual ? 'Dados atualizados com sucesso!' : 'Sincronização automática concluída');
            return true;

        } catch (error) {
            console.error('❌ Erro ao atualizar dados:', error);
            this.showError('Falha ao atualizar dados: ' + error.message);
            return false;
        }
    },

    /**
     * Inicia atualização automática
     */
    startAutoRefresh() {
        if (!this.apiEnabled) {
            console.log('ℹ️ Atualização automática desabilitada - API externa não disponível');
            this.showInfo('Usando dados locais atualizados manualmente');
            return;
        }

        // Limpar timers existentes
        if (this.autoRefreshTimer) {
            clearInterval(this.autoRefreshTimer);
        }

        // Atualização inicial
        this.updateData(false);

        // Iniciar contador regressivo
        this.startCountdown();

        // Configurar atualização periódica
        this.autoRefreshTimer = setInterval(() => {
            console.log('🔄 Atualização automática iniciada...');
            this.updateData(false);
            this.startCountdown(); // Reiniciar contador após cada atualização
        }, this.updateInterval);

        console.log(`✅ Atualização automática configurada (${this.updateInterval / 60000} minutos)`);
    },

    /**
     * Para atualização automática
     */
    stopAutoRefresh() {
        if (this.autoRefreshTimer) {
            clearInterval(this.autoRefreshTimer);
            this.autoRefreshTimer = null;
            console.log('⏹️ Atualização automática parada');
        }
    },

    /**
     * Exibe indicador de loading
     * @param {boolean} show - Mostrar ou ocultar
     */
    showLoading(show) {
        const button = document.getElementById('refreshMatchesButton');
        const status = document.getElementById('refreshStatus');

        if (button) {
            button.disabled = show;
            button.classList.toggle('is-loading', show);
            button.innerHTML = show
                ? '<i class="fas fa-spinner fa-spin"></i> Atualizando...'
                : '<i class="fas fa-rotate-right"></i> Atualizar Agora';
        }

        if (status && show) {
            status.textContent = 'Buscando dados da API...';
            status.className = 'refresh-status loading';
        }
    },

    /**
     * Exibe mensagem de sucesso
     * @param {string} message - Mensagem
     */
    showSuccess(message) {
        const status = document.getElementById('refreshStatus');
        if (status) {
            status.textContent = message;
            status.className = 'refresh-status success';
        }
    },

    /**
     * Exibe mensagem de erro
     * @param {string} message - Mensagem de erro
     */
    showError(message) {
        const status = document.getElementById('refreshStatus');
        if (status) {
            status.textContent = `Erro: ${message}`;
            status.className = 'refresh-status error';
        }
    },

    /**
     * Exibe mensagem informativa
     * @param {string} message - Mensagem
     */
    showInfo(message) {
        const status = document.getElementById('refreshStatus');
        if (status) {
            status.textContent = message;
            status.className = 'refresh-status info';
        }
        
        // Desabilitar botão de atualização
        const button = document.getElementById('refreshMatchesButton');
        if (button) {
            button.disabled = true;
            button.title = 'Atualização automática desabilitada';
            button.innerHTML = '<i class="fas fa-info-circle"></i> Dados Locais';
        }
    },

    /**
     * Atualiza exibição da última atualização
     */
    updateLastUpdateDisplay() {
        const status = document.getElementById('refreshStatus');
        if (status && this.lastUpdate) {
            const timeStr = this.lastUpdate.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'America/Sao_Paulo'
            });
            const dateStr = this.lastUpdate.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                timeZone: 'America/Sao_Paulo'
            });
            status.textContent = `Última atualização: ${dateStr} às ${timeStr}`;
            status.className = 'refresh-status info';
        }
    },

    /**
     * Obtém tempo desde última atualização
     * @returns {string} Tempo formatado
     */
    getTimeSinceLastUpdate() {
        if (!this.lastUpdate) return 'Nunca';

        const now = new Date();
        const diff = now - this.lastUpdate;
        const minutes = Math.floor(diff / 60000);

        if (minutes < 1) return 'Agora mesmo';
        if (minutes === 1) return '1 minuto atrás';
        if (minutes < 60) return `${minutes} minutos atrás`;

        const hours = Math.floor(minutes / 60);
        if (hours === 1) return '1 hora atrás';
        return `${hours} horas atrás`;
    },

    /**
     * Converte data UTC para UTC-3 (Brasília)
     * @param {string} utcDateString - Data em formato UTC
     * @returns {Object} Objeto com data convertida e formatações
     */
    convertToUTC3(utcDateString) {
        const utcDate = new Date(utcDateString);
        
        return {
            date: utcDate,
            formatted: utcDate.toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'America/Sao_Paulo'
            }),
            time: utcDate.toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'America/Sao_Paulo'
            }),
            dateOnly: utcDate.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                timeZone: 'America/Sao_Paulo'
            })
        };
    },

    /**
     * Inicia contador regressivo para próxima atualização
     */
    startCountdown() {
        // Limpar contador existente
        if (this.countdownTimer) {
            clearInterval(this.countdownTimer);
        }

        // Definir próximo horário de atualização
        this.nextUpdateTime = new Date(Date.now() + this.updateInterval);

        // Atualizar contador a cada segundo
        this.countdownTimer = setInterval(() => {
            this.updateCountdownDisplay();
        }, 1000);

        // Atualizar imediatamente
        this.updateCountdownDisplay();
    },

    /**
     * Atualiza exibição do contador regressivo
     */
    updateCountdownDisplay() {
        const countdownElement = document.getElementById('nextUpdateTimer');
        if (!countdownElement || !this.nextUpdateTime) return;

        const now = new Date();
        const diff = this.nextUpdateTime - now;

        if (diff <= 0) {
            countdownElement.textContent = 'Atualizando...';
            return;
        }

        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);

        countdownElement.textContent = `Próxima atualização em: ${minutes}:${seconds.toString().padStart(2, '0')}`;
    },

    /**
     * Para contador regressivo
     */
    stopCountdown() {
        if (this.countdownTimer) {
            clearInterval(this.countdownTimer);
            this.countdownTimer = null;
        }
    },

    /**
     * Formata data de partida com labels especiais
     * @param {string} dateString - Data da partida
     * @returns {Object} Objeto com labels formatados
     */
    formatMatchDate(dateString) {
        const utc3 = this.convertToUTC3(dateString);
        const now = new Date();
        const matchDate = utc3.date;
        
        // Verificar se é hoje
        const isToday = matchDate.toDateString() === now.toDateString();
        
        // Verificar se é amanhã
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const isTomorrow = matchDate.toDateString() === tomorrow.toDateString();
        
        let dateLabel = '';
        if (isToday) {
            dateLabel = 'HOJE';
        } else if (isTomorrow) {
            dateLabel = 'AMANHÃ';
        } else {
            dateLabel = matchDate.toLocaleDateString('pt-BR', {
                weekday: 'short',
                day: '2-digit',
                month: '2-digit',
                timeZone: 'America/Sao_Paulo'
            }).toUpperCase();
        }
        
        return {
            label: dateLabel,
            time: utc3.time,
            full: utc3.formatted,
            dateOnly: utc3.dateOnly
        };
    },

    /**
     * Obtém label de status da partida
     * @param {string} status - Status da partida
     * @param {number} minute - Minuto do jogo (opcional)
     * @returns {string} HTML do badge de status
     */
    getStatusBadge(status, minute = null) {
        switch(status) {
            case 'live':
                return `<span class="live-badge">
                    <span class="live-dot"></span>
                    AO VIVO ${minute ? `- ${minute}'` : ''}
                </span>`;
            case 'finished':
                return '<span class="finished-badge">ENCERRADO</span>';
            case 'scheduled':
                return '<span class="scheduled-badge">AGENDADO</span>';
            case 'postponed':
                return '<span class="postponed-badge">ADIADO</span>';
            case 'cancelled':
                return '<span class="cancelled-badge">CANCELADO</span>';
            default:
                return '';
        }
    }
};

// Exportar para uso global
window.WorldCupAPI = WorldCupAPI;

console.log('✅ WorldCup API module loaded');

// Made with Bob
