// FIFA World Cup 2026 — Direct API Integration
// Chama Football-Data.org diretamente do browser (sem proxy local)
// CORS é suportado pela API com X-Auth-Token no header

const DirectAPI = {
    API_KEY: '093dce6688974c83ad7a4adae69e5cfd',
    BASE_URL: 'https://api.football-data.org/v4',
    CACHE_KEY: 'wc2026_direct_cache',
    CACHE_TTL: 5 * 60 * 1000, // 5 minutos

    GROUP_MAP: {
        'GROUP_A':'A','GROUP_B':'B','GROUP_C':'C','GROUP_D':'D',
        'GROUP_E':'E','GROUP_F':'F','GROUP_G':'G','GROUP_H':'H',
        'GROUP_I':'I','GROUP_J':'J','GROUP_K':'K','GROUP_L':'L'
    },
    PHASE_MAP: {
        GROUP_STAGE:'group', LAST_32:'knockout', LAST_16:'knockout',
        QUARTER_FINALS:'knockout', SEMI_FINALS:'knockout',
        THIRD_PLACE:'knockout', FINAL:'knockout'
    },
    STATUS_MAP: {
        TIMED:'scheduled', SCHEDULED:'scheduled',
        IN_PLAY:'live', PAUSED:'live', FINISHED:'finished'
    },

    // Converte UTC string para ISO BRT (-03:00)
    _toBRT(utcStr) {
        const d = new Date(new Date(utcStr).getTime() - 3 * 60 * 60 * 1000);
        const p = n => String(n).padStart(2, '0');
        return `${d.getUTCFullYear()}-${p(d.getUTCMonth()+1)}-${p(d.getUTCDate())}` +
               `T${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:00-03:00`;
    },

    // Converte resposta da API para formato do dashboard
    _convert(apiMatches) {
        return apiMatches.map((m, i) => ({
            id: i + 1,
            date: this._toBRT(m.utcDate),
            group: this.GROUP_MAP[m.group] || null,
            homeTeam: m.homeTeam?.tla || null,
            awayTeam: m.awayTeam?.tla || null,
            homeScore: m.score?.fullTime?.home ?? null,
            awayScore: m.score?.fullTime?.away ?? null,
            stadium: m.venue || 'Stadium',
            status: this.STATUS_MAP[m.status] || 'scheduled',
            phase: this.PHASE_MAP[m.stage] || 'group',
            round: m.matchday || null
        }));
    },

    // Calcula standings dos grupos a partir dos jogos finalizados
    _calcStandings(matches) {
        const standings = {};
        'ABCDEFGHIJKL'.split('').forEach(g => { standings[g] = {}; });

        matches
            .filter(m => m.phase === 'group' && m.status === 'finished' && m.homeTeam && m.awayTeam)
            .forEach(m => {
                const g = m.group;
                if (!g) return;
                [m.homeTeam, m.awayTeam].forEach(t => {
                    if (!standings[g][t]) {
                        standings[g][t] = { team:t, played:0, won:0, drawn:0, lost:0,
                                            goalsFor:0, goalsAgainst:0, goalDifference:0, points:0 };
                    }
                });
                const h = standings[g][m.homeTeam];
                const a = standings[g][m.awayTeam];
                h.played++; a.played++;
                h.goalsFor += m.homeScore; h.goalsAgainst += m.awayScore;
                a.goalsFor += m.awayScore; a.goalsAgainst += m.homeScore;
                if (m.homeScore > m.awayScore)      { h.won++; h.points += 3; a.lost++; }
                else if (m.homeScore < m.awayScore) { a.won++; a.points += 3; h.lost++; }
                else                                { h.drawn++; a.drawn++; h.points++; a.points++; }
                h.goalDifference = h.goalsFor - h.goalsAgainst;
                a.goalDifference = a.goalsFor - a.goalsAgainst;
            });

        const sorted = {};
        Object.keys(standings).forEach(g => {
            sorted[g] = Object.values(standings[g]).sort((a, b) =>
                b.points !== a.points ? b.points - a.points :
                b.goalDifference !== a.goalDifference ? b.goalDifference - a.goalDifference :
                b.goalsFor - a.goalsFor
            );
        });
        return sorted;
    },

    // Lê/escreve cache no localStorage
    _readCache() {
        try {
            const raw = localStorage.getItem(this.CACHE_KEY);
            if (!raw) return null;
            const { ts, data } = JSON.parse(raw);
            if (Date.now() - ts < this.CACHE_TTL) return data;
        } catch (_) {}
        return null;
    },
    _writeCache(data) {
        try {
            localStorage.setItem(this.CACHE_KEY, JSON.stringify({ ts: Date.now(), data }));
        } catch (_) {}
    },

    /**
     * Tenta fetch com uma URL. Rejeita se o status não for OK.
     */
    async _tryFetch(url, headers) {
        const res = await fetch(url, { headers });
        if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
        return res.json();
    },

    /**
     * Busca jogos da API Football-Data.org.
     * Tenta primeiro chamada direta; se bloqueada por CORS (file://),
     * usa corsproxy.io como fallback transparente.
     * @returns {Promise<{matches, standings}>}
     */
    async fetchAndApply(forceRefresh = false) {
        // 1. Tentar cache (skip se forceRefresh)
        if (!forceRefresh) {
            const cached = this._readCache();
            if (cached) {
                console.log('📦 DirectAPI: usando cache (< 5 min)');
                this._apply(cached);
                return { source: 'cache', ...cached };
            }
        }

        const endpoint = `/competitions/WC/matches`;
        const directUrl = `${this.BASE_URL}${endpoint}`;
        const proxyUrl  = `https://corsproxy.io/?url=${encodeURIComponent(directUrl)}`;
        const headers   = { 'X-Auth-Token': this.API_KEY };

        let json = null;
        let source = 'api-direct';

        // 2. Tentar chamada direta (funciona quando servido por http://localhost)
        try {
            console.log('🌐 DirectAPI: tentando chamada direta...');
            json = await this._tryFetch(directUrl, headers);
            console.log('✅ DirectAPI: chamada direta OK');
        } catch (directErr) {
            // 3. Fallback via corsproxy.io (necessário quando aberto como file://)
            console.warn('⚠️ DirectAPI: chamada direta bloqueada (' + directErr.message + '), usando corsproxy.io...');
            try {
                json = await this._tryFetch(proxyUrl, headers);
                source = 'api-proxy';
                console.log('✅ DirectAPI: corsproxy.io OK');
            } catch (proxyErr) {
                throw new Error(`Direto: ${directErr.message} | Proxy: ${proxyErr.message}`);
            }
        }

        const matches   = this._convert(json.matches || []);
        const standings = this._calcStandings(matches);
        const payload   = { matches, standings };

        this._writeCache(payload);
        this._apply(payload);

        const finished  = matches.filter(m => m.status === 'finished').length;
        const live      = matches.filter(m => m.status === 'live').length;
        const scheduled = matches.filter(m => m.status === 'scheduled').length;
        console.log(`✅ DirectAPI [${source}]: ${matches.length} jogos — ${finished} fin, ${live} live, ${scheduled} agend`);

        return { source, matches, standings };
    },

    /**
     * Limpa o cache forçando nova busca na próxima chamada
     */
    clearCache() {
        try { localStorage.removeItem(this.CACHE_KEY); } catch (_) {}
    },

    // Aplica dados ao objeto global WORLD_CUP_2026
    _apply({ matches, standings }) {
        if (typeof WORLD_CUP_2026 === 'undefined') return;
        WORLD_CUP_2026.matches = matches;
        WORLD_CUP_2026.groupStandings = standings;
        console.log('✅ DirectAPI: WORLD_CUP_2026 atualizado');
    }
};

window.DirectAPI = DirectAPI;

// Made with Bob
