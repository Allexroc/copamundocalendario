// FIFA World Cup 2026 - Simulated API Data Generator
// Generates realistic match results and statistics based on current date

const SimulatedAPI = {
    currentDate: new Date('2026-06-23T09:20:00-03:00'),
    tournamentStart: new Date('2026-06-11T16:00:00-03:00'),
    
    /**
     * Generate realistic match results based on team strength
     */
    generateMatchResult(homeTeam, awayTeam, matchDate) {
        // Team strength ratings (0-100)
        const teamStrength = {
            'BRA': 95, 'ARG': 94, 'FRA': 93, 'ENG': 92, 'ESP': 91,
            'GER': 90, 'POR': 89, 'NED': 88, 'BEL': 87, 'URU': 85,
            'CRO': 84, 'COL': 83, 'MEX': 82, 'USA': 81, 'SUI': 80,
            'MAR': 79, 'SEN': 78, 'JPN': 77, 'KOR': 76, 'AUS': 75,
            'CAN': 74, 'ECU': 73, 'PAR': 72, 'TUR': 71, 'NOR': 70,
            'SWE': 69, 'AUT': 68, 'CIV': 67, 'EGY': 66, 'GHA': 65,
            'ALG': 64, 'TUN': 63, 'IRN': 62, 'KSA': 61, 'IRQ': 60,
            'QAT': 59, 'SCO': 58, 'NZL': 57, 'JOR': 56, 'UZB': 55,
            'CPV': 54, 'PAN': 53, 'BIH': 52, 'COD': 51, 'CUW': 50,
            'RSA': 49, 'CZE': 48, 'HAI': 45
        };
        
        const homeStrength = teamStrength[homeTeam] || 50;
        const awayStrength = teamStrength[awayTeam] || 50;
        
        // Home advantage
        const adjustedHome = homeStrength + 5;
        const adjustedAway = awayStrength;
        
        // Calculate goal probabilities
        const homeGoalExpectation = (adjustedHome / 100) * 2.5;
        const awayGoalExpectation = (adjustedAway / 100) * 2.5;
        
        // Generate goals with some randomness
        const homeGoals = Math.max(0, Math.round(homeGoalExpectation + (Math.random() - 0.5) * 2));
        const awayGoals = Math.max(0, Math.round(awayGoalExpectation + (Math.random() - 0.5) * 2));
        
        return { homeGoals, awayGoals };
    },
    
    /**
     * Generate goal scorers for a match
     */
    generateScorers(team, goals) {
        const topPlayers = {
            'BRA': ['Neymar Jr.', 'Vinícius Jr.', 'Richarlison', 'Gabriel Jesus'],
            'ARG': ['Lionel Messi', 'Lautaro Martínez', 'Julián Álvarez', 'Paulo Dybala'],
            'FRA': ['Kylian Mbappé', 'Karim Benzema', 'Antoine Griezmann', 'Ousmane Dembélé'],
            'ENG': ['Harry Kane', 'Raheem Sterling', 'Phil Foden', 'Bukayo Saka'],
            'ESP': ['Álvaro Morata', 'Ferran Torres', 'Dani Olmo', 'Mikel Oyarzabal'],
            'GER': ['Kai Havertz', 'Thomas Müller', 'Serge Gnabry', 'Leroy Sané'],
            'POR': ['Cristiano Ronaldo', 'Bruno Fernandes', 'João Félix', 'Rafael Leão'],
            'NED': ['Memphis Depay', 'Cody Gakpo', 'Steven Bergwijn', 'Wout Weghorst'],
            'BEL': ['Romelu Lukaku', 'Kevin De Bruyne', 'Eden Hazard', 'Dries Mertens'],
            'URU': ['Luis Suárez', 'Edinson Cavani', 'Darwin Núñez', 'Facundo Pellistri'],
            'USA': ['Christian Pulisic', 'Gio Reyna', 'Timothy Weah', 'Ricardo Pepi'],
            'MEX': ['Hirving Lozano', 'Raúl Jiménez', 'Alexis Vega', 'Henry Martín'],
            'MAR': ['Youssef En-Nesyri', 'Hakim Ziyech', 'Sofiane Boufal', 'Zakaria Aboukhlal'],
            'NOR': ['Erling Haaland', 'Martin Ødegaard', 'Alexander Sørloth', 'Joshua King'],
            'CAN': ['Alphonso Davies', 'Jonathan David', 'Cyle Larin', 'Tajon Buchanan']
        };
        
        const players = topPlayers[team] || ['Player 1', 'Player 2', 'Player 3', 'Player 4'];
        const scorers = [];
        
        for (let i = 0; i < goals; i++) {
            const playerIndex = Math.floor(Math.random() * Math.min(players.length, 3));
            scorers.push(players[playerIndex]);
        }
        
        return scorers;
    },
    
    /**
     * Update all matches up to current date
     */
    updateMatchesToCurrentDate(matches) {
        const updatedMatches = matches.map(match => {
            const matchDate = new Date(match.date);
            
            // If match is in the past and not finished, generate result
            if (matchDate < this.currentDate && match.status === 'scheduled') {
                const result = this.generateMatchResult(match.homeTeam, match.awayTeam, matchDate);
                return {
                    ...match,
                    homeScore: result.homeGoals,
                    awayScore: result.awayGoals,
                    status: 'finished'
                };
            }
            
            return match;
        });
        
        return updatedMatches;
    },
    
    /**
     * Calculate top scorers from matches
     */
    calculateTopScorers(matches) {
        const scorers = {};
        
        matches.forEach(match => {
            if (match.status === 'finished') {
                // Generate scorers for home team
                const homeScorers = this.generateScorers(match.homeTeam, match.homeScore);
                homeScorers.forEach(player => {
                    if (!scorers[player]) {
                        scorers[player] = {
                            player: player,
                            team: match.homeTeam,
                            goals: 0,
                            matches: new Set()
                        };
                    }
                    scorers[player].goals++;
                    scorers[player].matches.add(match.id);
                });
                
                // Generate scorers for away team
                const awayScorers = this.generateScorers(match.awayTeam, match.awayScore);
                awayScorers.forEach(player => {
                    if (!scorers[player]) {
                        scorers[player] = {
                            player: player,
                            team: match.awayTeam,
                            goals: 0,
                            matches: new Set()
                        };
                    }
                    scorers[player].goals++;
                    scorers[player].matches.add(match.id);
                });
            }
        });
        
        // Convert to array and sort
        const scorersArray = Object.values(scorers).map(s => ({
            player: s.player,
            team: s.team,
            goals: s.goals,
            matches: s.matches.size
        }));
        
        scorersArray.sort((a, b) => {
            if (b.goals !== a.goals) return b.goals - a.goals;
            return a.matches - b.matches;
        });
        
        return scorersArray.slice(0, 20);
    },
    
    /**
     * Calculate group standings from matches
     */
    calculateGroupStandings(matches) {
        const standings = {};
        
        // Initialize all groups A-L
        for (let i = 0; i < 12; i++) {
            const groupLetter = String.fromCharCode(65 + i);
            standings[groupLetter] = {};
        }
        
        // Process finished matches
        matches.forEach(match => {
            if (match.status !== 'finished' || !match.group) return;
            
            const group = match.group;
            const homeTeam = match.homeTeam;
            const awayTeam = match.awayTeam;
            
            // Initialize teams if needed
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
            
            // Update statistics
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
        
        // Sort each group
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
     * Main update function
     */
    async updateDashboard() {
        console.log('🔄 Atualizando dados simulados da Copa 2026...');
        console.log(`📅 Data atual: ${this.currentDate.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`);
        
        try {
            // Get current matches
            const currentMatches = getAllMatches();
            
            // Update matches to current date
            const updatedMatches = this.updateMatchesToCurrentDate(currentMatches);
            
            // Calculate new standings
            const newStandings = this.calculateGroupStandings(updatedMatches);
            
            // Calculate top scorers
            const topScorers = this.calculateTopScorers(updatedMatches);
            
            // Update global data
            WORLD_CUP_2026.matches = updatedMatches;
            WORLD_CUP_2026.groupStandings = newStandings;
            WORLD_CUP_2026.topScorers = topScorers;
            
            // Count statistics
            const finished = updatedMatches.filter(m => m.status === 'finished').length;
            const live = updatedMatches.filter(m => m.status === 'live').length;
            const scheduled = updatedMatches.filter(m => m.status === 'scheduled').length;
            
            console.log('✅ Atualização concluída!');
            console.log(`📊 Estatísticas:`);
            console.log(`   Finalizadas: ${finished}`);
            console.log(`   Ao vivo: ${live}`);
            console.log(`   Agendadas: ${scheduled}`);
            console.log(`   Total: ${updatedMatches.length}`);
            console.log(`⚽ Artilheiros: ${topScorers.length} jogadores`);
            
            return {
                success: true,
                matches: updatedMatches,
                standings: newStandings,
                topScorers: topScorers,
                stats: { finished, live, scheduled }
            };
            
        } catch (error) {
            console.error('❌ Erro ao atualizar dados:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
};

// Export to global scope
window.SimulatedAPI = SimulatedAPI;

// Made with Bob