// FIFA World Cup 2026 — Direct API Integration
// Busca dados da Football-Data.org sem depender do proxy antigo.
//
// Estratégia de chamada (em ordem):
//   1. /api/competitions/WC/matches  → serve.js (proxy local, sem CORS)
//   2. https://api.football-data.org  → direto (funciona em http://localhost)
//
// Se ambos falharem exibe mensagem de orientação ao usuário.

const DirectAPI = {
    API_KEY:   '093dce6688974c83ad7a4adae69e5cfd',
    DIRECT_URL: 'https://api.football-data.org/v4/competitions/WC/matches',
    LOCAL_URL:  '/api/competitions/WC/matches', // serve.js proxy
    CACHE_KEY:  'wc2026_direct_cache',
    CACHE_TTL:  5 * 60 * 1000, // 5 minutos

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

    // ── Conversão ────────────────────────────────────────────────────────────

    _toBRT(utcStr) {
        const d = new Date(new Date(utcStr).getTime() - 3 * 60 * 60 * 1000);
        const p = n => String(n).padStart(2, '0');
        return `${d.getUTCFullYear()}-${p(d.getUTCMonth()+1)}-${p(d.getUTCDate())}` +
               `T${p(d.getUTCHours())}:${p(d.getUTCMinutes())}:00-03:00`;
    },

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

    _calcStandings(matches) {
        const standings = {};
        'ABCDEFGHIJKL'.split('').forEach(g => { standings[g] = {}; });

        matches
            .filter(m => m.phase === 'group' && m.status === 'finished' && m.homeTeam && m.awayTeam)
            .forEach(m => {
                const g = m.group; if (!g) return;
                [m.homeTeam, m.awayTeam].forEach(t => {
                    if (!standings[g][t]) standings[g][t] = {
                        team:t, played:0, won:0, drawn:0, lost:0,
                        goalsFor:0, goalsAgainst:0, goalDifference:0, points:0
                    };
                });
                const h = standings[g][m.homeTeam], a = standings[g][m.awayTeam];
                h.played++; a.played++;
                h.goalsFor += m.homeScore; h.goalsAgainst += m.awayScore;
                a.goalsFor += m.awayScore; a.goalsAgainst += m.homeScore;
                if      (m.homeScore > m.awayScore) { h.won++; h.points += 3; a.lost++; }
                else if (m.homeScore < m.awayScore) { a.won++; a.points += 3; h.lost++; }
                else                                { h.drawn++; a.drawn++; h.points++; a.points++; }
                h.goalDifference = h.goalsFor - h.goalsAgainst;
                a.goalDifference = a.goalsFor - a.goalsAgainst;
            });

        const sorted = {};
        Object.keys(standings).forEach(g => {
            sorted[g] = Object.values(standings[g]).sort((a, b) =>
                b.points !== a.points          ? b.points - a.points :
                b.goalDifference !== a.goalDifference ? b.goalDifference - a.goalDifference :
                b.goalsFor - a.goalsFor
            );
        });
        return sorted;
    },

    // ── Cache ─────────────────────────────────────────────────────────────────

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
        try { localStorage.setItem(this.CACHE_KEY, JSON.stringify({ ts: Date.now(), data })); } catch (_) {}
    },
    clearCache() {
        try { localStorage.removeItem(this.CACHE_KEY); } catch (_) {}
    },

    // ── Fetch ─────────────────────────────────────────────────────────────────

    async _tryFetch(fetchUrl, headers) {
        const res = await fetch(fetchUrl, { headers });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    },

    /**
     * Busca e aplica dados da API.
     * @param {boolean} forceRefresh  true = ignora cache (clique manual)
     */
    async fetchAndApply(forceRefresh = false) {
        // 1. Cache (skip se forceRefresh)
        if (!forceRefresh) {
            const cached = this._readCache();
            if (cached) {
                console.log('📦 DirectAPI: usando cache local (< 5 min)');
                this._apply(cached);
                return { source: 'cache', ...cached };
            }
        }

        const headers = { 'X-Auth-Token': this.API_KEY };
        let json   = null;
        let source = '';

        // 2. Tentar proxy local do serve.js (sem CORS, mais confiável)
        try {
            console.log('🔌 DirectAPI: tentando proxy local (serve.js)...');
            json   = await this._tryFetch(this.LOCAL_URL, headers);
            source = 'local-proxy';
            console.log('✅ DirectAPI: proxy local OK');
        } catch (_) {
            // 3. Tentar chamada direta (funciona em http://localhost)
            try {
                console.log('🌐 DirectAPI: tentando chamada direta...');
                json   = await this._tryFetch(this.DIRECT_URL, headers);
                source = 'direct';
                console.log('✅ DirectAPI: chamada direta OK');
            } catch (directErr) {
                // Ambos falharam — provavelmente aberto como file://
                const isFile = location.protocol === 'file:';
                const msg = isFile
                    ? 'CORS bloqueado (file://). Execute: node serve.js — e acesse http://localhost:8080'
                    : directErr.message;
                throw new Error(msg);
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

    // ── Apply ─────────────────────────────────────────────────────────────────

    _apply({ matches, standings }) {
        if (typeof WORLD_CUP_2026 === 'undefined') return;
        WORLD_CUP_2026.matches = matches;
        WORLD_CUP_2026.groupStandings = standings;
        console.log('✅ DirectAPI: WORLD_CUP_2026 atualizado');
    }
};

window.DirectAPI = DirectAPI;

// Made with Bob
