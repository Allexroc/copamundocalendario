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
     * Busca jogos diretamente na API Football-Data.org (sem proxy)
     * @returns {Promise<{matches, standings}>}
     */
    async fetchAndApply() {
        // 1. Tentar cache
        const cached = this._readCache();
        if (cached) {
            console.log('📦 DirectAPI: usando cache (< 5 min)');
            this._apply(cached);
            return { source: 'cache', ...cached };
        }

        // 2. Chamar API direta
        console.log('🌐 DirectAPI: chamando Football-Data.org diretamente...');
        const res = await fetch(`${this.BASE_URL}/competitions/WC/matches`, {
            headers: { 'X-Auth-Token': this.API_KEY }
        });

        if (!res.ok) {
            throw new Error(`HTTP ${res.status} ${res.statusText}`);
        }

        const json = await res.json();
        const matches = this._convert(json.matches || []);
        const standings = this._calcStandings(matches);
        const payload = { matches, standings };

        this._writeCache(payload);
        this._apply(payload);

        const finished  = matches.filter(m => m.status === 'finished').length;
        const live      = matches.filter(m => m.status === 'live').length;
        const scheduled = matches.filter(m => m.status === 'scheduled').length;
        console.log(`✅ DirectAPI: ${matches.length} jogos — ${finished} finalizados, ${live} ao vivo, ${scheduled} agendados`);

        return { source: 'api', matches, standings };
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
