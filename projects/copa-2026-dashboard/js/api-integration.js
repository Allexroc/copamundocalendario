// FIFA World Cup 2026 - API REST Integration
// Integração com Football-Data.org API

const APIIntegration = {
    apiKey: '093dce6688974c83ad7a4adae69e5cfd',
    baseUrl: 'https://api.football-data.org/v4',
    lastUpdate: null,
    isLoading: false,
    
    // Mapeamento de códigos de times
    teamMapping: {
        'MEX': 'MEX', 'RSA': 'RSA', 'KOR': 'KOR', 'CZE': 'CZE',
        'CAN': 'CAN', 'BIH': 'BIH', 'QAT': 'QAT', 'SUI': 'SUI',
        'BRA': 'BRA', 'MAR': 'MAR', 'HAI': 'HAI', 'SCO': 'SCO',
        'USA': 'USA', 'PAR': 'PAR', 'AUS': 'AUS', 'TUR': 'TUR',
        'GER': 'GER', 'CUW': 'CUW', 'CIV': 'CIV', 'ECU': 'ECU',
        'NED': 'NED', 'JPN': 'JPN', 'SWE': 'SWE', 'TUN': 'TUN',
        'BEL': 'BEL', 'EGY': 'EGY', 'IRN': 'IRN', 'NZL': 'NZL',
        'ESP': 'ESP', 'CPV': 'CPV', 'KSA': 'KSA', 'URU': 'URU',
        'FRA': 'FRA', 'SEN': 'SEN', 'IRQ': 'IRQ', 'NOR': 'NOR',
        'ARG': 'ARG', 'ALG': 'ALG', 'AUT': 'AUT', 'JOR': 'JOR',
        'POR': 'POR', 'COD': 'COD', 'UZB': 'UZB', 'COL': 'COL',
        'ENG': 'ENG', 'CRO': 'CRO', 'GHA': 'GHA', 'PAN': 'PAN'
    },
    
    // Mapeamento de grupos
    groupMapping: {
        'GROUP_A': 'A', 'GROUP_B': 'B', 'GROUP_C': 'C', 'GROUP_D': 'D',
        'GROUP_E': 'E', 'GROUP_F': 'F', 'GROUP_G': 'G', 'GROUP_H': 'H',
        'GROUP_I': 'I', 'GROUP_J': 'J', 'GROUP_K': 'K', 'GROUP_L': 'L'
    },

    /**
     * Busca dados da API Football-Data.org
     */
    async fetchMatches() {
        if (this.isLoading) {
            console.warn('⚠️ Requisição já em andamento');
            return null;
        }

        this.isLoading = true;
        
        try {
            console.log('🔄 Buscando dados da API Football-Data.org...');
            
            const response = await fetch(`${this.baseUrl}/competitions/WC/matches`, {
                method: 'GET',
                headers: {
                    'X-Auth-Token': this.apiKey,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            this.lastUpdate = new Date();
            
            console.log(`✅ ${data.matches.length} partidas recebidas`);
            
            return data;

        } catch (error) {
            console.error('❌ Erro ao buscar dados da API:', error);
            throw error;
        } finally {
            this.isLoading = false;
        }
    },

    /**
     * Converte dados da API para formato do dashboard
     */
    convertAPIData(apiData) {
        if (!apiData || !Array.isArray(apiData.matches)) {
            console.warn('⚠️ Formato de dados inválido');
            return { matches: [], standings: {} };
        }

        const matches = [];
        let matchId = 1;

        apiData.matches.forEach(apiMatch => {
            // Converter data UTC para UTC-3 (Brasília)
            const utcDate = new Date(apiMatch.utcDate);
            const brasiliaDate = new Date(utcDate.getTime() - (3 * 60 * 60 * 1000));
            const dateStr = brasiliaDate.toISOString().slice(0, 19) + '-03:00';

            // Mapear códigos de times
            const homeTeam = this.teamMapping[apiMatch.homeTeam.tla] || apiMatch.homeTeam.tla;
            const awayTeam = this.teamMapping[apiMatch.awayTeam.tla] || apiMatch.awayTeam.tla;

            // Mapear grupo
            const group = this.groupMapping[apiMatch.group] || apiMatch.group?.replace('GROUP_', '') || 'A';

            // Determinar status
            let status = 'scheduled';
            if (apiMatch.status === 'FINISHED') status = 'finished';
            else if (apiMatch.status === 'IN_PLAY' || apiMatch.status === 'PAUSED') status = 'live';

            const match = {
                id: matchId++,
                date: dateStr,
                group: group,
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                homeScore: apiMatch.score.fullTime.home ?? null,
                awayScore: apiMatch.score.fullTime.away ?? null,
                stadium: 'Stadium',
                status: status,
                phase: 'group',
                round: apiMatch.matchday || 1,
                minute: apiMatch.minute || null
            };

            matches.push(match);
        });

        // Calcular classificações
        const standings = this.calculateStandings(matches);

        return {
            matches,
            standings,
            lastUpdate: this.lastUpdate.toISOString()
        };
    },

    /**
     * Calcula classificações dos grupos
     */
    calculateStandings(matches) {
        const standings = {};
        
        // Inicializar grupos A-L
        for (let i = 0; i < 12; i++) {
            const groupLetter = String.fromCharCode(65 + i);
            standings[groupLetter] = {};
        }
        
        // Processar cada jogo finalizado
        matches.forEach(match => {
            if (match.status !== 'finished') return;
            
            const group = match.group;
            const homeTeam = match.homeTeam;
            const awayTeam = match.awayTeam;
            
            // Inicializar times se não existirem
            if (!standings[group][homeTeam]) {
                standings[group][homeTeam] = {
                    team: homeTeam,
                    played: 0,
                    won: 0,
                    drawn: 0,
                    lost: 0,
                    goalsFor: 0,
                    goalsAgainst: 0,
                    goalDifference: 0,
                    points: 0
                };
            }
            if (!standings[group][awayTeam]) {
                standings[group][awayTeam] = {
                    team: awayTeam,
                    played: 0,
                    won: 0,
                    drawn: 0,
                    lost: 0,
                    goalsFor: 0,
                    goalsAgainst: 0,
                    goalDifference: 0,
                    points: 0
                };
            }
            
            // Atualizar estatísticas
            const homeStats = standings[group][homeTeam];
            const awayStats = standings[group][awayTeam];
            
            homeStats.played++;
            awayStats.played++;
            
            homeStats.goalsFor += match.homeScore;
            homeStats.goalsAgainst += match.awayScore;
            awayStats.goalsFor += match.awayScore;
            awayStats.goalsAgainst += match.homeScore;
            
            if (match.homeScore > match.awayScore) {
                homeStats.won++;
                homeStats.points += 3;
                awayStats.lost++;
            } else if (match.homeScore < match.awayScore) {
                awayStats.won++;
                awayStats.points += 3;
                homeStats.lost++;
            } else {
                homeStats.drawn++;
                awayStats.drawn++;
                homeStats.points++;
                awayStats.points++;
            }
            
            homeStats.goalDifference = homeStats.goalsFor - homeStats.goalsAgainst;
            awayStats.goalDifference = awayStats.goalsFor - awayStats.goalsAgainst;
        });
        
        // Ordenar cada grupo
        Object.keys(standings).forEach(group => {
            standings[group] = Object.values(standings[group]).sort((a, b) => {
                if (b.points !== a.points) return b.points - a.points;
                if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
                if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
                return 0;
            });
        });
        
        return standings;
    },

    /**
     * Atualiza dados do dashboard com dados da API
     */
    async updateDashboard() {
        try {
            // Buscar dados da API
            const apiData = await this.fetchMatches();
            if (!apiData) return false;

            // Converter para formato do dashboard
            const convertedData = this.convertAPIData(apiData);

            // Atualizar dados globais
            if (typeof WORLD_CUP_2026 !== 'undefined') {
                // Atualizar classificações
                WORLD_CUP_2026.groupStandings = convertedData.standings;

                // Atualizar partidas (mesclar com dados existentes)
                this.mergeMatches(convertedData.matches);
            }

            // Estatísticas
            const finished = convertedData.matches.filter(m => m.status === 'finished').length;
            const live = convertedData.matches.filter(m => m.status === 'live').length;
            const scheduled = convertedData.matches.filter(m => m.status === 'scheduled').length;

            console.log('📊 Estatísticas da atualização:');
            console.log(`   Finalizadas: ${finished}`);
            console.log(`   Ao vivo: ${live}`);
            console.log(`   Agendadas: ${scheduled}`);
            console.log(`   Total: ${convertedData.matches.length}`);

            return true;

        } catch (error) {
            console.error('❌ Erro ao atualizar dashboard:', error);
            return false;
        }
    },

    /**
     * Mescla partidas da API com dados existentes
     */
    mergeMatches(apiMatches) {
        if (typeof WORLD_CUP_2026 === 'undefined' || !WORLD_CUP_2026.matches) {
            return;
        }

        // Criar mapa de partidas da API
        const apiMatchesMap = {};
        apiMatches.forEach(match => {
            const key = `${match.group}-${match.homeTeam}-${match.awayTeam}-R${match.round}`;
            apiMatchesMap[key] = match;
        });

        // Atualizar partidas existentes
        WORLD_CUP_2026.matches.forEach((match, index) => {
            const key = `${match.group}-${match.homeTeam}-${match.awayTeam}-R${match.round}`;
            const apiMatch = apiMatchesMap[key];
            
            if (apiMatch) {
                // Atualizar com dados da API
                WORLD_CUP_2026.matches[index] = {
                    ...match,
                    homeScore: apiMatch.homeScore,
                    awayScore: apiMatch.awayScore,
                    status: apiMatch.status,
                    date: apiMatch.date,
                    minute: apiMatch.minute
                };
            }
        });
    },

    /**
     * Obtém informações de status da API
     */
    getAPIStatus() {
        return {
            lastUpdate: this.lastUpdate,
            isLoading: this.isLoading,
            hasData: this.lastUpdate !== null
        };
    }
};

// Exportar para uso global
window.APIIntegration = APIIntegration;

// Made with Bob
