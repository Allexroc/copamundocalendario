// API-Football Adapter for Copa 2026
// Converte dados da API-Football para o formato interno do dashboard

class APIFootballAdapter {
    constructor(config) {
        this.config = config;
        this.baseUrl = config.baseUrl;
        this.headers = config.headers;
        this.leagueId = 1; // World Cup ID (será atualizado para 2026)
        this.season = 2026;
    }

    // Fazer requisição à API
    async fetch(endpoint, params = {}) {
        const url = new URL(`${this.baseUrl}${endpoint}`);
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: this.headers
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('❌ API-Football fetch error:', error);
            throw error;
        }
    }

    // Buscar partidas ao vivo
    async getLiveMatches() {
        try {
            const data = await this.fetch('/fixtures', {
                live: 'all',
                league: this.leagueId,
                season: this.season
            });

            return this.convertFixturesToMatches(data.response);
        } catch (error) {
            console.error('❌ Error fetching live matches:', error);
            return [];
        }
    }

    // Buscar próximas partidas
    async getUpcomingMatches(limit = 10) {
        try {
            const data = await this.fetch('/fixtures', {
                league: this.leagueId,
                season: this.season,
                next: limit
            });

            return this.convertFixturesToMatches(data.response);
        } catch (error) {
            console.error('❌ Error fetching upcoming matches:', error);
            return [];
        }
    }

    // Buscar resultados recentes
    async getRecentResults(limit = 10) {
        try {
            const data = await this.fetch('/fixtures', {
                league: this.leagueId,
                season: this.season,
                last: limit
            });

            return this.convertFixturesToMatches(data.response);
        } catch (error) {
            console.error('❌ Error fetching recent results:', error);
            return [];
        }
    }

    // Buscar classificações
    async getStandings() {
        try {
            const data = await this.fetch('/standings', {
                league: this.leagueId,
                season: this.season
            });

            return this.convertStandings(data.response);
        } catch (error) {
            console.error('❌ Error fetching standings:', error);
            return {};
        }
    }

    // Buscar artilheiros
    async getTopScorers(limit = 10) {
        try {
            const data = await this.fetch('/players/topscorers', {
                league: this.leagueId,
                season: this.season
            });

            return this.convertTopScorers(data.response, limit);
        } catch (error) {
            console.error('❌ Error fetching top scorers:', error);
            return [];
        }
    }

    // Buscar assistências
    async getTopAssists(limit = 5) {
        try {
            const data = await this.fetch('/players/topassists', {
                league: this.leagueId,
                season: this.season
            });

            return this.convertTopAssists(data.response, limit);
        } catch (error) {
            console.error('❌ Error fetching top assists:', error);
            return [];
        }
    }

    // Converter fixtures da API para formato interno
    convertFixturesToMatches(fixtures) {
        return fixtures.map(fixture => {
            const homeTeam = this.getTeamCode(fixture.teams.home.name);
            const awayTeam = this.getTeamCode(fixture.teams.away.name);

            return {
                id: fixture.fixture.id,
                date: fixture.fixture.date,
                group: this.extractGroup(fixture),
                homeTeam: homeTeam,
                awayTeam: awayTeam,
                homeScore: fixture.goals.home,
                awayScore: fixture.goals.away,
                stadium: fixture.fixture.venue.name,
                status: this.convertStatus(fixture.fixture.status.short),
                phase: this.extractPhase(fixture),
                round: this.extractRound(fixture),
                minute: fixture.fixture.status.elapsed,
                lastUpdated: new Date().toISOString()
            };
        });
    }

    // Converter classificações
    convertStandings(standings) {
        const groupStandings = {};

        standings.forEach(standing => {
            standing.league.standings.forEach((group, index) => {
                const groupLetter = String.fromCharCode(65 + index); // A, B, C, etc.
                
                groupStandings[groupLetter] = group.map(team => ({
                    team: this.getTeamCode(team.team.name),
                    played: team.all.played,
                    won: team.all.win,
                    drawn: team.all.draw,
                    lost: team.all.lose,
                    goalsFor: team.all.goals.for,
                    goalsAgainst: team.all.goals.against,
                    points: team.points
                }));
            });
        });

        return groupStandings;
    }

    // Converter artilheiros
    convertTopScorers(players, limit) {
        return players.slice(0, limit).map(player => ({
            player: player.player.name,
            team: this.getTeamCode(player.statistics[0].team.name),
            goals: player.statistics[0].goals.total,
            matches: player.statistics[0].games.appearences
        }));
    }

    // Converter assistências
    convertTopAssists(players, limit) {
        return players.slice(0, limit).map(player => ({
            player: player.player.name,
            team: this.getTeamCode(player.statistics[0].team.name),
            assists: player.statistics[0].goals.assists,
            matches: player.statistics[0].games.appearences
        }));
    }

    // Mapear nome do time para código
    getTeamCode(teamName) {
        const teamMap = {
            'Mexico': 'MEX',
            'South Africa': 'RSA',
            'South Korea': 'KOR',
            'Czech Republic': 'CZE',
            'Canada': 'CAN',
            'Bosnia': 'BIH',
            'Qatar': 'QAT',
            'Switzerland': 'SUI',
            'Brazil': 'BRA',
            'Morocco': 'MAR',
            'Haiti': 'HAI',
            'Scotland': 'SCO',
            'United States': 'USA',
            'USA': 'USA',
            'Paraguay': 'PAR',
            'Australia': 'AUS',
            'Turkey': 'TUR',
            'Germany': 'GER',
            'Curacao': 'CUW',
            'Ivory Coast': 'CIV',
            'Ecuador': 'ECU',
            'Netherlands': 'NED',
            'Japan': 'JPN',
            'Sweden': 'SWE',
            'Tunisia': 'TUN',
            'Belgium': 'BEL',
            'Egypt': 'EGY',
            'Iran': 'IRN',
            'New Zealand': 'NZL',
            'Spain': 'ESP',
            'Cape Verde': 'CPV',
            'Saudi Arabia': 'KSA',
            'Uruguay': 'URU',
            'France': 'FRA',
            'Senegal': 'SEN',
            'Iraq': 'IRQ',
            'Norway': 'NOR',
            'Argentina': 'ARG',
            'Algeria': 'ALG',
            'Austria': 'AUT',
            'Jordan': 'JOR',
            'Portugal': 'POR',
            'DR Congo': 'COD',
            'Uzbekistan': 'UZB',
            'Colombia': 'COL',
            'England': 'ENG',
            'Croatia': 'CRO',
            'Ghana': 'GHA',
            'Panama': 'PAN'
        };

        return teamMap[teamName] || teamName.substring(0, 3).toUpperCase();
    }

    // Converter status da API para formato interno
    convertStatus(apiStatus) {
        const statusMap = {
            'TBD': 'scheduled',
            'NS': 'scheduled',
            '1H': 'live',
            'HT': 'live',
            '2H': 'live',
            'ET': 'live',
            'P': 'live',
            'FT': 'finished',
            'AET': 'finished',
            'PEN': 'finished',
            'PST': 'postponed',
            'CANC': 'cancelled',
            'ABD': 'abandoned'
        };

        return statusMap[apiStatus] || 'scheduled';
    }

    // Extrair grupo da partida
    extractGroup(fixture) {
        const round = fixture.league.round;
        if (round && round.includes('Group')) {
            const match = round.match(/Group ([A-L])/);
            return match ? match[1] : null;
        }
        return null;
    }

    // Extrair fase da partida
    extractPhase(fixture) {
        const round = fixture.league.round;
        if (round.includes('Group')) return 'group';
        if (round.includes('Round of 16')) return 'round16';
        if (round.includes('Quarter')) return 'quarter';
        if (round.includes('Semi')) return 'semi';
        if (round.includes('Final')) return 'final';
        return 'group';
    }

    // Extrair rodada
    extractRound(fixture) {
        const round = fixture.league.round;
        const match = round.match(/(\d+)/);
        return match ? parseInt(match[1]) : 1;
    }
}

// Criar instância global
let apiFootballAdapter = null;

// Inicializar adapter quando configuração estiver disponível
if (typeof API_CONFIG !== 'undefined') {
    const config = API_CONFIG.apis.apiFootball;
    if (config) {
        apiFootballAdapter = new APIFootballAdapter(config);
        console.log('✅ API-Football Adapter initialized');
    }
}

console.log('✅ API-Football Adapter module loaded');

// Made with Bob