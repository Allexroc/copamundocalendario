// FIFA World Cup 2026 - API Configuration
// Configuração de APIs públicas para dados em tempo real

const API_CONFIG = {
    // APIs públicas disponíveis para dados de futebol
    apis: {
        // API-Football (RapidAPI) - Dados em tempo real
        apiFootball: {
            name: 'API-Football',
            baseUrl: 'https://api-football-v1.p.rapidapi.com/v3',
            websocket: null, // Não tem WebSocket direto
            polling: true, // Usa polling HTTP
            pollInterval: 30000, // 30 segundos
            endpoints: {
                fixtures: '/fixtures',
                standings: '/standings',
                topScorers: '/players/topscorers',
                liveMatches: '/fixtures?live=all'
            },
            headers: {
                'X-RapidAPI-Key': 'YOUR_API_KEY_HERE',
                'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
            },
            requiresAuth: true,
            free: false, // Tem plano gratuito limitado
            documentation: 'https://www.api-football.com/documentation-v3'
        },

        // Football-Data.org - API gratuita
        footballData: {
            name: 'Football-Data.org',
            baseUrl: 'https://api.football-data.org/v4',
            websocket: null,
            polling: true,
            pollInterval: 60000, // 60 segundos (limite free tier)
            endpoints: {
                competitions: '/competitions',
                matches: '/matches',
                standings: '/standings',
                scorers: '/scorers'
            },
            headers: {
                'X-Auth-Token': 'YOUR_API_KEY_HERE'
            },
            requiresAuth: true,
            free: true, // Plano gratuito disponível
            documentation: 'https://www.football-data.org/documentation/quickstart'
        },

        // TheSportsDB - API gratuita
        theSportsDB: {
            name: 'TheSportsDB',
            baseUrl: 'https://www.thesportsdb.com/api/v1/json',
            apiKey: 'YOUR_API_KEY_HERE', // ou use '3' para teste
            websocket: null,
            polling: true,
            pollInterval: 60000,
            endpoints: {
                events: '/eventslive.php',
                nextEvents: '/eventsnext.php',
                results: '/eventspastleague.php',
                standings: '/lookuptable.php'
            },
            requiresAuth: false, // Pode usar chave de teste
            free: true,
            documentation: 'https://www.thesportsdb.com/api.php'
        },

        // FIFA Official API (quando disponível)
        fifaOfficial: {
            name: 'FIFA Official',
            baseUrl: 'https://api.fifa.com/api/v3',
            websocket: 'wss://live.fifa.com/ws',
            polling: false,
            endpoints: {
                calendar: '/calendar/matches',
                live: '/live/football/now',
                standings: '/standings'
            },
            requiresAuth: false,
            free: true,
            documentation: 'https://www.fifa.com/api',
            note: 'API oficial da FIFA - disponível durante a Copa'
        },

        // Pusher (WebSocket as a Service)
        pusher: {
            name: 'Pusher',
            websocket: 'wss://ws-us2.pusher.com',
            appKey: 'YOUR_PUSHER_APP_KEY',
            cluster: 'us2',
            channels: {
                matches: 'worldcup-matches',
                scores: 'worldcup-scores',
                events: 'worldcup-events'
            },
            requiresAuth: true,
            free: true, // Plano gratuito disponível
            documentation: 'https://pusher.com/docs'
        },

        // Ably (WebSocket alternativo)
        ably: {
            name: 'Ably',
            websocket: 'wss://realtime.ably.io',
            apiKey: 'YOUR_ABLY_API_KEY',
            channels: {
                matches: 'worldcup:matches',
                scores: 'worldcup:scores'
            },
            requiresAuth: true,
            free: true,
            documentation: 'https://ably.com/docs'
        }
    },

    // Configuração ativa (escolha uma das opções acima)
    active: 'apiFootball', // Opções: 'mock', 'apiFootball', 'footballData', 'theSportsDB', 'fifaOfficial', 'pusher', 'ably'

    // Configuração do servidor mock local
    mock: {
        name: 'Mock Server',
        websocket: 'ws://localhost:8080',
        polling: false,
        requiresAuth: false,
        free: true
    }
};

// Função para obter configuração ativa
function getActiveAPIConfig() {
    const activeKey = API_CONFIG.active;
    if (activeKey === 'mock') {
        return API_CONFIG.mock;
    }
    return API_CONFIG.apis[activeKey];
}

// Função para polling HTTP (quando WebSocket não está disponível)
class HTTPPollingService {
    constructor(config) {
        this.config = config;
        this.intervalId = null;
        this.listeners = new Map();
    }

    start() {
        if (this.intervalId) {
            console.warn('⚠️ Polling already started');
            return;
        }

        console.log(`🔄 Starting HTTP polling every ${this.config.pollInterval}ms`);
        
        // Primeira chamada imediata
        this.fetchData();
        
        // Polling periódico
        this.intervalId = setInterval(() => {
            this.fetchData();
        }, this.config.pollInterval);
    }

    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            console.log('⏹️ HTTP polling stopped');
        }
    }

    async fetchData() {
        try {
            console.log('🔄 Fetching data from API...');
            
            // Usar adapter se disponível (API-Football)
            if (typeof apiFootballAdapter !== 'undefined' && apiFootballAdapter) {
                await this.fetchWithAdapter();
                return;
            }

            // Fallback para outras APIs
            await this.fetchGeneric();

        } catch (error) {
            console.error('❌ Error fetching data:', error);
        }
    }

    async fetchWithAdapter() {
        try {
            // Buscar partidas ao vivo
            const liveMatches = await apiFootballAdapter.getLiveMatches();
            if (liveMatches && liveMatches.length > 0) {
                console.log(`⚽ ${liveMatches.length} live matches found`);
                liveMatches.forEach(match => {
                    this.notifyListeners('match_update', {
                        type: 'live_score',
                        payload: match
                    });
                });
            }

            // Buscar classificações
            const standings = await apiFootballAdapter.getStandings();
            if (standings && Object.keys(standings).length > 0) {
                console.log(`📊 Standings updated for ${Object.keys(standings).length} groups`);
                Object.keys(standings).forEach(group => {
                    this.notifyListeners('standings_update', {
                        group: group,
                        standings: standings[group]
                    });
                });
            }

            // Buscar artilheiros
            const scorers = await apiFootballAdapter.getTopScorers(10);
            if (scorers && scorers.length > 0) {
                console.log(`🏆 ${scorers.length} top scorers updated`);
                this.notifyListeners('statistics_update', {
                    topScorers: scorers
                });
            }

            // Buscar assistências
            const assists = await apiFootballAdapter.getTopAssists(5);
            if (assists && assists.length > 0) {
                console.log(`🎯 ${assists.length} top assists updated`);
                this.notifyListeners('statistics_update', {
                    topAssists: assists
                });
            }

        } catch (error) {
            console.error('❌ Error in adapter fetch:', error);
        }
    }

    async fetchGeneric() {
        // Implementação genérica para outras APIs
        const config = this.config;
        
        if (config.name === 'TheSportsDB') {
            try {
                const response = await fetch(
                    `${config.baseUrl}/${config.apiKey}${config.endpoints.events}`
                );
                const data = await response.json();
                this.notifyListeners('live_matches', data);
            } catch (error) {
                console.error('❌ TheSportsDB error:', error);
            }
        }
    }

    addEventListener(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    notifyListeners(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in listener for ${event}:`, error);
                }
            });
        }
    }
}

// Exportar configuração
console.log('✅ API Configuration loaded');
console.log(`📡 Active API: ${API_CONFIG.active}`);

// Made with Bob