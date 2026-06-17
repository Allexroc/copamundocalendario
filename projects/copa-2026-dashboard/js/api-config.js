// FIFA World Cup 2026 - API Configuration
// Configuração de APIs públicas para dados em tempo real

const API_CONFIG = {
    // APIs públicas disponíveis para dados de futebol
    apis: {
        // API-Football (RapidAPI) - Dados em tempo real
        apiFootball: {
            name: 'API-Football',
            baseUrl: 'https://api-football-v1.p.rapidapi.com/v3',
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
            polling: true,
            pollInterval: 30000,
            endpoints: {
                calendar: '/calendar/matches',
                live: '/live/football/now',
                standings: '/standings'
            },
            requiresAuth: false,
            free: true,
            documentation: 'https://www.fifa.com/api',
            note: 'API oficial da FIFA - disponível durante a Copa'
        }
    },

    // Configuração ativa (escolha uma das opções acima)
    active: 'backendProxy', // Opções: 'backendProxy', 'apiFootball', 'footballData', 'theSportsDB', 'fifaOfficial'

    backendProxy: {
        name: 'Backend Proxy',
        baseUrl: 'http://localhost:3001',
        endpoints: {
            dashboard: '/api/dashboard-data'
        },
        polling: true,
        pollInterval: 600000,
        requiresAuth: false,
        free: true,
        note: 'Proxy local para Football-Data.org'
    },

    // Configuração de dados estáticos (fallback)
    mock: {
        name: 'Static Data',
        polling: false,
        requiresAuth: false,
        free: true,
        note: 'Usa dados estáticos do arquivo data.js'
    }
};

// Função para obter configuração ativa
function getActiveAPIConfig() {
    const activeKey = API_CONFIG.active;
    if (activeKey === 'mock') {
        return API_CONFIG.mock;
    }

    if (activeKey === 'backendProxy') {
        return API_CONFIG.backendProxy;
    }

    return API_CONFIG.apis[activeKey];
}

function getAPIConfigByKey(apiKey) {
    if (apiKey === 'mock') {
        return API_CONFIG.mock;
    }

    if (apiKey === 'backendProxy') {
        return API_CONFIG.backendProxy;
    }

    return API_CONFIG.apis[apiKey] || null;
}

function getAPIProviderPriority() {
    const configuredProviders = [
        API_CONFIG.active,
        'backendProxy',
        'footballData',
        'theSportsDB',
        'apiFootball',
        'fifaOfficial',
        'mock'
    ];

    return [...new Set(configuredProviders)].filter(providerKey => getAPIConfigByKey(providerKey));
}

async function fetchDashboardDataFromProvider(providerKey) {
    const providerConfig = getAPIConfigByKey(providerKey);

    if (!providerConfig) {
        throw new Error(`Provider "${providerKey}" não está configurado.`);
    }

    if (providerKey === 'mock') {
        return {
            providerKey,
            providerName: providerConfig.name,
            data: {
                matches: [],
                standings: {},
                topScorers: [],
                topAssists: []
            },
            isFallback: true
        };
    }

    if (providerKey === 'backendProxy') {
        const data = await fetchBackendProxyDashboardData(providerConfig);
        return {
            providerKey,
            providerName: providerConfig.name,
            data,
            isFallback: false
        };
    }

    if (providerKey === 'apiFootball') {
        if (typeof apiFootballAdapter === 'undefined' || !apiFootballAdapter) {
            throw new Error('Adapter da API-Football indisponível.');
        }

        const data = await apiFootballAdapter.getDashboardData();
        return {
            providerKey,
            providerName: providerConfig.name,
            data,
            isFallback: false
        };
    }

    if (providerKey === 'footballData') {
        if (typeof window !== 'undefined' && window.location && window.location.protocol === 'file:') {
            throw new Error('Football-Data.org bloqueado por CORS em execução local via file://.');
        }

        const data = await fetchFootballDataDashboardData(providerConfig);
        return {
            providerKey,
            providerName: providerConfig.name,
            data,
            isFallback: false
        };
    }

    if (providerKey === 'theSportsDB') {
        const data = await fetchTheSportsDBDashboardData(providerConfig);
        return {
            providerKey,
            providerName: providerConfig.name,
            data,
            isFallback: true
        };
    }

    throw new Error(`Provider "${providerConfig.name}" ainda não possui adapter implementado.`);
}

async function fetchDashboardDataWithFallback() {
    const providers = getAPIProviderPriority();
    const errors = [];

    for (const providerKey of providers) {
        try {
            const result = await fetchDashboardDataFromProvider(providerKey);
            const hasUsefulData =
                result.providerKey === 'mock' ||
                result.data.matches.length > 0 ||
                Object.keys(result.data.standings).length > 0 ||
                result.data.topScorers.length > 0 ||
                result.data.topAssists.length > 0;

            if (!hasUsefulData) {
                throw new Error('O provedor respondeu sem dados utilizáveis.');
            }

            return result;
        } catch (error) {
            console.warn(`⚠️ Provider ${providerKey} failed:`, error);
            errors.push(`${providerKey}: ${error.message}`);
        }
    }

    throw new Error(`Nenhuma API disponível respondeu com sucesso. ${errors.join(' | ')}`);
}

async function fetchBackendProxyDashboardData(config) {
    try {
        const response = await fetch(`${config.baseUrl}${config.endpoints.dashboard}`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }

        const payload = await response.json();

        return {
            matches: convertFootballDataMatches(payload.matches || []),
            standings: convertFootballDataStandings(payload.standings || []),
            topScorers: convertFootballDataScorers(payload.scorers || []),
            topAssists: []
        };
    } catch (error) {
        console.error('❌ Backend proxy fetch error:', error);
        throw new Error(`Falha ao buscar dados no backend local: ${error.message}`);
    }
}

async function fetchFootballDataDashboardData(config) {
    const competitionCode = 'WC';
    const headers = config.headers && config.headers['X-Auth-Token'] !== 'YOUR_API_KEY_HERE'
        ? config.headers
        : {};

    const [matchesResult, standingsResult, scorersResult] = await Promise.allSettled([
        fetchFootballDataJson(`${config.baseUrl}/competitions/${competitionCode}/matches`, headers),
        fetchFootballDataJson(`${config.baseUrl}/competitions/${competitionCode}/standings`, headers),
        fetchFootballDataJson(`${config.baseUrl}/competitions/${competitionCode}/scorers`, headers)
    ]);

    const matchesPayload = matchesResult.status === 'fulfilled' ? matchesResult.value : null;
    const standingsPayload = standingsResult.status === 'fulfilled' ? standingsResult.value : null;
    const scorersPayload = scorersResult.status === 'fulfilled' ? scorersResult.value : null;

    return {
        matches: convertFootballDataMatches(matchesPayload?.matches || []),
        standings: convertFootballDataStandings(standingsPayload?.standings || []),
        topScorers: convertFootballDataScorers(scorersPayload?.scorers || []),
        topAssists: []
    };
}

async function fetchFootballDataJson(url, headers = {}) {
    try {
        const response = await fetch(url, { headers });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('❌ Football-Data fetch error:', error);
        throw new Error(`Falha ao buscar dados no Football-Data.org: ${error.message}`);
    }
}

function convertFootballDataMatches(matches) {
    return matches.map(match => ({
        id: match.id,
        date: match.utcDate,
        group: extractFootballDataGroup(match.stage, match.group),
        homeTeam: normalizeTeamCode(match.homeTeam?.name),
        awayTeam: normalizeTeamCode(match.awayTeam?.name),
        homeScore: match.score?.fullTime?.home ?? match.score?.halfTime?.home ?? null,
        awayScore: match.score?.fullTime?.away ?? match.score?.halfTime?.away ?? null,
        stadium: match.venue || 'Stadium TBD',
        status: convertFootballDataStatus(match.status),
        phase: extractFootballDataPhase(match.stage),
        round: match.matchday || '',
        minute: null,
        lastUpdated: new Date().toISOString()
    })).filter(match => match.homeTeam && match.awayTeam);
}

function convertFootballDataStandings(standings) {
    const groupedStandings = {};

    standings
        .filter(table => table.type === 'TOTAL' || table.type === 'GROUP')
        .forEach(table => {
            const groupKey = extractFootballDataGroup(table.stage, table.group);

            if (!groupKey) {
                return;
            }

            groupedStandings[groupKey] = (table.table || []).map(team => ({
                team: normalizeTeamCode(team.team?.name),
                played: team.playedGames ?? 0,
                won: team.won ?? 0,
                drawn: team.draw ?? 0,
                lost: team.lost ?? 0,
                goalsFor: team.goalsFor ?? 0,
                goalsAgainst: team.goalsAgainst ?? 0,
                points: team.points ?? 0
            }));
        });

    return groupedStandings;
}

function convertFootballDataScorers(scorers) {
    return scorers.slice(0, 10).map(player => ({
        player: player.player?.name || 'Jogador',
        team: normalizeTeamCode(player.team?.name),
        goals: player.goals ?? 0,
        matches: player.playedMatches ?? 0
    })).filter(player => player.team);
}

function extractFootballDataGroup(stage, groupName) {
    if (groupName && /^GROUP_[A-Z]$/i.test(groupName)) {
        return groupName.split('_')[1].toUpperCase();
    }

    if (typeof groupName === 'string' && /group\s+[a-z]/i.test(groupName)) {
        return groupName.trim().slice(-1).toUpperCase();
    }

    if (stage === 'GROUP_STAGE') {
        return '';
    }

    return '';
}

function extractFootballDataPhase(stage) {
    const phaseMap = {
        GROUP_STAGE: 'group',
        LAST_16: 'knockout',
        QUARTER_FINALS: 'knockout',
        SEMI_FINALS: 'knockout',
        THIRD_PLACE: 'knockout',
        FINAL: 'knockout'
    };

    return phaseMap[stage] || 'group';
}

function convertFootballDataStatus(status) {
    const statusMap = {
        TIMED: 'scheduled',
        SCHEDULED: 'scheduled',
        IN_PLAY: 'live',
        PAUSED: 'live',
        FINISHED: 'finished',
        POSTPONED: 'postponed',
        SUSPENDED: 'abandoned',
        CANCELLED: 'cancelled'
    };

    return statusMap[status] || 'scheduled';
}

async function fetchTheSportsDBDashboardData(config) {
    const apiKey = config.apiKey && config.apiKey !== 'YOUR_API_KEY_HERE' ? config.apiKey : '3';
    const liveUrl = `${config.baseUrl}/${apiKey}/eventspastleague.php?id=4328`;

    try {
        const response = await fetch(liveUrl);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
        }

        const payload = await response.json();
        const events = Array.isArray(payload?.events) ? payload.events : [];

        return {
            matches: convertTheSportsDBEventsToMatches(events),
            standings: {},
            topScorers: [],
            topAssists: []
        };
    } catch (error) {
        console.error('❌ TheSportsDB dashboard fetch error:', error);
        throw new Error(`Falha ao buscar dados no TheSportsDB: ${error.message}`);
    }
}

function convertTheSportsDBEventsToMatches(events) {
    return events
        .map((event, index) => {
            const homeTeam = normalizeTeamCode(event.strHomeTeam);
            const awayTeam = normalizeTeamCode(event.strAwayTeam);

            if (!homeTeam || !awayTeam) {
                return null;
            }

            const eventDateTime = buildEventDateTime(event.dateEvent, event.strTime);

            return {
                id: event.idEvent || `thesportsdb-${index}`,
                date: eventDateTime,
                group: '',
                homeTeam,
                awayTeam,
                homeScore: parseNullableScore(event.intHomeScore),
                awayScore: parseNullableScore(event.intAwayScore),
                stadium: event.strVenue || 'Stadium TBD',
                status: convertTheSportsDBStatus(event.strStatus, event.intHomeScore, event.intAwayScore),
                phase: 'group',
                round: event.strRound || '',
                minute: parseNullableScore(event.intTime),
                lastUpdated: new Date().toISOString()
            };
        })
        .filter(Boolean);
}

function normalizeTeamCode(teamName) {
    if (!teamName || typeof teamName !== 'string') {
        return null;
    }

    if (typeof apiFootballAdapter !== 'undefined' && apiFootballAdapter && typeof apiFootballAdapter.getTeamCode === 'function') {
        return apiFootballAdapter.getTeamCode(teamName);
    }

    return teamName.substring(0, 3).toUpperCase();
}

function parseNullableScore(value) {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
}

function buildEventDateTime(dateValue, timeValue) {
    if (!dateValue) {
        return new Date().toISOString();
    }

    if (!timeValue) {
        return `${dateValue}T00:00:00Z`;
    }

    return `${dateValue}T${timeValue}`;
}

function convertTheSportsDBStatus(status, homeScore, awayScore) {
    const normalizedStatus = (status || '').toLowerCase();

    if (normalizedStatus.includes('live') || normalizedStatus.includes('in progress')) {
        return 'live';
    }

    if (normalizedStatus.includes('finished') || normalizedStatus.includes('ft')) {
        return 'finished';
    }

    if (homeScore !== null && awayScore !== null) {
        return 'finished';
    }

    return 'scheduled';
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