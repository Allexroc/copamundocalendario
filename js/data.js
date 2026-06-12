// FIFA World Cup 2026 - Complete Tournament Data
// Data structure for 48 teams, 12 groups, 104 matches

const WORLD_CUP_2026 = {
    tournament: {
        name: "FIFA World Cup 2026",
        startDate: "2026-06-11",
        endDate: "2026-07-19",
        hosts: ["USA", "Canada", "Mexico"],
        totalTeams: 48,
        totalGroups: 12,
        totalMatches: 104
    },

    // All 48 teams organized by groups
    teams: {
        "MEX": { name: "México", flag: "🇲🇽", group: "A", code: "MEX" },
        "URU": { name: "Uruguai", flag: "🇺🇾", group: "A", code: "URU" },
        "JAM": { name: "Jamaica", flag: "🇯🇲", group: "A", code: "JAM" },
        "VEN": { name: "Venezuela", flag: "🇻🇪", group: "A", code: "VEN" },
        
        "USA": { name: "Estados Unidos", flag: "🇺🇸", group: "B", code: "USA" },
        "CHI": { name: "Chile", flag: "🇨🇱", group: "B", code: "CHI" },
        "PAN": { name: "Panamá", flag: "🇵🇦", group: "B", code: "PAN" },
        "BOL": { name: "Bolívia", flag: "🇧🇴", group: "B", code: "BOL" },
        
        "CAN": { name: "Canadá", flag: "🇨🇦", group: "C", code: "CAN" },
        "COL": { name: "Colômbia", flag: "🇨🇴", group: "C", code: "COL" },
        "CRC": { name: "Costa Rica", flag: "🇨🇷", group: "C", code: "CRC" },
        "PAR": { name: "Paraguai", flag: "🇵🇾", group: "C", code: "PAR" },
        
        "BRA": { name: "Brasil", flag: "🇧🇷", group: "D", code: "BRA" },
        "ARG": { name: "Argentina", flag: "🇦🇷", group: "D", code: "ARG" },
        "ECU": { name: "Equador", flag: "🇪🇨", group: "D", code: "ECU" },
        "PER": { name: "Peru", flag: "🇵🇪", group: "D", code: "PER" },
        
        "FRA": { name: "França", flag: "🇫🇷", group: "E", code: "FRA" },
        "GER": { name: "Alemanha", flag: "🇩🇪", group: "E", code: "GER" },
        "DEN": { name: "Dinamarca", flag: "🇩🇰", group: "E", code: "DEN" },
        "SWE": { name: "Suécia", flag: "🇸🇪", group: "E", code: "SWE" },
        
        "ESP": { name: "Espanha", flag: "🇪🇸", group: "F", code: "ESP" },
        "POR": { name: "Portugal", flag: "🇵🇹", group: "F", code: "POR" },
        "NED": { name: "Holanda", flag: "🇳🇱", group: "F", code: "NED" },
        "BEL": { name: "Bélgica", flag: "🇧🇪", group: "F", code: "BEL" },
        
        "ITA": { name: "Itália", flag: "🇮🇹", group: "G", code: "ITA" },
        "CRO": { name: "Croácia", flag: "🇭🇷", group: "G", code: "CRO" },
        "SUI": { name: "Suíça", flag: "🇨🇭", group: "G", code: "SUI" },
        "AUT": { name: "Áustria", flag: "🇦🇹", group: "G", code: "AUT" },
        
        "ENG": { name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "H", code: "ENG" },
        "UKR": { name: "Ucrânia", flag: "🇺🇦", group: "H", code: "UKR" },
        "POL": { name: "Polônia", flag: "🇵🇱", group: "H", code: "POL" },
        "SRB": { name: "Sérvia", flag: "🇷🇸", group: "H", code: "SRB" },
        
        "JPN": { name: "Japão", flag: "🇯🇵", group: "I", code: "JPN" },
        "KOR": { name: "Coreia do Sul", flag: "🇰🇷", group: "I", code: "KOR" },
        "AUS": { name: "Austrália", flag: "🇦🇺", group: "I", code: "AUS" },
        "KSA": { name: "Arábia Saudita", flag: "🇸🇦", group: "I", code: "KSA" },
        
        "SEN": { name: "Senegal", flag: "🇸🇳", group: "J", code: "SEN" },
        "MAR": { name: "Marrocos", flag: "🇲🇦", group: "J", code: "MAR" },
        "CMR": { name: "Camarões", flag: "🇨🇲", group: "J", code: "CMR" },
        "GHA": { name: "Gana", flag: "🇬🇭", group: "J", code: "GHA" },
        
        "NGA": { name: "Nigéria", flag: "🇳🇬", group: "K", code: "NGA" },
        "EGY": { name: "Egito", flag: "🇪🇬", group: "K", code: "EGY" },
        "TUN": { name: "Tunísia", flag: "🇹🇳", group: "K", code: "TUN" },
        "ALG": { name: "Argélia", flag: "🇩🇿", group: "K", code: "ALG" },
        
        "IRN": { name: "Irã", flag: "🇮🇷", group: "L", code: "IRN" },
        "QAT": { name: "Catar", flag: "🇶🇦", group: "L", code: "QAT" },
        "IRQ": { name: "Iraque", flag: "🇮🇶", group: "L", code: "IRQ" },
        "UAE": { name: "Emirados Árabes", flag: "🇦🇪", group: "L", code: "UAE" }
    },

    // Stadium information
    stadiums: {
        "Estadio Azteca": { city: "Cidade do México", country: "México", capacity: 87523 },
        "Estadio BBVA": { city: "Monterrey", country: "México", capacity: 53500 },
        "Estadio Akron": { city: "Guadalajara", country: "México", capacity: 48071 },
        "BMO Field": { city: "Toronto", country: "Canadá", capacity: 45500 },
        "BC Place": { city: "Vancouver", country: "Canadá", capacity: 54500 },
        "MetLife Stadium": { city: "East Rutherford", country: "EUA", capacity: 82500 },
        "SoFi Stadium": { city: "Los Angeles", country: "EUA", capacity: 70240 },
        "AT&T Stadium": { city: "Arlington", country: "EUA", capacity: 80000 },
        "NRG Stadium": { city: "Houston", country: "EUA", capacity: 72220 },
        "Mercedes-Benz Stadium": { city: "Atlanta", country: "EUA", capacity: 71000 },
        "Lincoln Financial Field": { city: "Philadelphia", country: "EUA", capacity: 69176 },
        "Levi's Stadium": { city: "Santa Clara", country: "EUA", capacity: 68500 },
        "Arrowhead Stadium": { city: "Kansas City", country: "EUA", capacity: 76416 },
        "Hard Rock Stadium": { city: "Miami", country: "EUA", capacity: 65326 },
        "Gillette Stadium": { city: "Foxborough", country: "EUA", capacity: 65878 },
        "Lumen Field": { city: "Seattle", country: "EUA", capacity: 69000 }
    },

    // Group standings (simulated current state)
    groupStandings: {
        "A": [
            { team: "MEX", played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 5, goalsAgainst: 1, points: 6 },
            { team: "URU", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 3, goalsAgainst: 3, points: 3 },
            { team: "JAM", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 3, points: 3 },
            { team: "VEN", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 4, points: 0 }
        ],
        "B": [
            { team: "USA", played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 6, goalsAgainst: 2, points: 6 },
            { team: "CHI", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 4, goalsAgainst: 3, points: 4 },
            { team: "PAN", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 4, points: 1 },
            { team: "BOL", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 4, points: 0 }
        ],
        "C": [
            { team: "COL", played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 5, goalsAgainst: 1, points: 6 },
            { team: "CAN", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 3, goalsAgainst: 3, points: 3 },
            { team: "CRC", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 3, points: 3 },
            { team: "PAR", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 4, points: 0 }
        ],
        "D": [
            { team: "BRA", played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 7, goalsAgainst: 2, points: 6 },
            { team: "ARG", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 5, goalsAgainst: 3, points: 4 },
            { team: "ECU", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 5, points: 1 },
            { team: "PER", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 2, goalsAgainst: 7, points: 0 }
        ],
        "E": [
            { team: "FRA", played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 6, goalsAgainst: 1, points: 6 },
            { team: "GER", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 4, goalsAgainst: 4, points: 3 },
            { team: "DEN", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 3, goalsAgainst: 4, points: 3 },
            { team: "SWE", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 2, goalsAgainst: 6, points: 0 }
        ],
        "F": [
            { team: "ESP", played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 5, goalsAgainst: 1, points: 6 },
            { team: "POR", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 4, goalsAgainst: 2, points: 4 },
            { team: "NED", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 4, points: 1 },
            { team: "BEL", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 5, points: 0 }
        ],
        "G": [
            { team: "ITA", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 4, goalsAgainst: 2, points: 4 },
            { team: "CRO", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 3, goalsAgainst: 2, points: 4 },
            { team: "SUI", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 3, goalsAgainst: 3, points: 3 },
            { team: "AUT", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 4, points: 0 }
        ],
        "H": [
            { team: "ENG", played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 6, goalsAgainst: 1, points: 6 },
            { team: "UKR", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 3, goalsAgainst: 3, points: 3 },
            { team: "POL", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 4, points: 3 },
            { team: "SRB", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 2, goalsAgainst: 5, points: 0 }
        ],
        "I": [
            { team: "JPN", played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 5, goalsAgainst: 2, points: 6 },
            { team: "KOR", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 4, goalsAgainst: 3, points: 3 },
            { team: "AUS", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 3, goalsAgainst: 4, points: 3 },
            { team: "KSA", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 2, goalsAgainst: 5, points: 0 }
        ],
        "J": [
            { team: "SEN", played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 4, goalsAgainst: 1, points: 6 },
            { team: "MAR", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 3, goalsAgainst: 2, points: 3 },
            { team: "CMR", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 3, points: 3 },
            { team: "GHA", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 4, points: 0 }
        ],
        "K": [
            { team: "NGA", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 4, goalsAgainst: 2, points: 4 },
            { team: "EGY", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 3, goalsAgainst: 2, points: 4 },
            { team: "TUN", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 3, points: 1 },
            { team: "ALG", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 4, points: 1 }
        ],
        "L": [
            { team: "IRN", played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 4, goalsAgainst: 1, points: 6 },
            { team: "QAT", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 3, goalsAgainst: 3, points: 3 },
            { team: "IRQ", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 3, points: 3 },
            { team: "UAE", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 3, points: 0 }
        ]
    },

    // Sample matches (first round of group stage)
    matches: [
        // Group A
        { id: 1, date: "2026-06-11T19:00:00", group: "A", homeTeam: "MEX", awayTeam: "URU", homeScore: 2, awayScore: 1, stadium: "Estadio Azteca", status: "finished", phase: "group", round: 1 },
        { id: 2, date: "2026-06-11T16:00:00", group: "A", homeTeam: "JAM", awayTeam: "VEN", homeScore: 1, awayScore: 0, stadium: "Estadio BBVA", status: "finished", phase: "group", round: 1 },
        { id: 13, date: "2026-06-15T19:00:00", group: "A", homeTeam: "MEX", awayTeam: "JAM", homeScore: 3, awayScore: 1, stadium: "Estadio Azteca", status: "finished", phase: "group", round: 2 },
        { id: 14, date: "2026-06-15T16:00:00", group: "A", homeTeam: "URU", awayTeam: "VEN", homeScore: 2, awayScore: 1, stadium: "Estadio Akron", status: "finished", phase: "group", round: 2 },
        
        // Group B
        { id: 3, date: "2026-06-11T22:00:00", group: "B", homeTeam: "USA", awayTeam: "CHI", homeScore: 3, awayScore: 2, stadium: "SoFi Stadium", status: "finished", phase: "group", round: 1 },
        { id: 4, date: "2026-06-12T19:00:00", group: "B", homeTeam: "PAN", awayTeam: "BOL", homeScore: 1, awayScore: 0, stadium: "Hard Rock Stadium", status: "finished", phase: "group", round: 1 },
        { id: 15, date: "2026-06-16T19:00:00", group: "B", homeTeam: "USA", awayTeam: "PAN", homeScore: 3, awayScore: 1, stadium: "AT&T Stadium", status: "finished", phase: "group", round: 2 },
        { id: 16, date: "2026-06-16T16:00:00", group: "B", homeTeam: "CHI", awayTeam: "BOL", homeScore: 2, awayScore: 1, stadium: "NRG Stadium", status: "finished", phase: "group", round: 2 },
        
        // Group C
        { id: 5, date: "2026-06-12T16:00:00", group: "C", homeTeam: "CAN", awayTeam: "COL", homeScore: 1, awayScore: 2, stadium: "BMO Field", status: "finished", phase: "group", round: 1 },
        { id: 6, date: "2026-06-12T19:00:00", group: "C", homeTeam: "CRC", awayTeam: "PAR", homeScore: 1, awayScore: 0, stadium: "BC Place", status: "finished", phase: "group", round: 1 },
        { id: 17, date: "2026-06-16T19:00:00", group: "C", homeTeam: "COL", awayTeam: "CRC", homeScore: 3, awayScore: 1, stadium: "Lumen Field", status: "finished", phase: "group", round: 2 },
        { id: 18, date: "2026-06-16T16:00:00", group: "C", homeTeam: "CAN", awayTeam: "PAR", homeScore: 2, awayScore: 1, stadium: "BMO Field", status: "finished", phase: "group", round: 2 },
        
        // Group D
        { id: 7, date: "2026-06-12T22:00:00", group: "D", homeTeam: "BRA", awayTeam: "ARG", homeScore: 3, awayScore: 3, stadium: "MetLife Stadium", status: "finished", phase: "group", round: 1 },
        { id: 8, date: "2026-06-13T16:00:00", group: "D", homeTeam: "ECU", awayTeam: "PER", homeScore: 2, awayScore: 1, stadium: "Arrowhead Stadium", status: "finished", phase: "group", round: 1 },
        { id: 19, date: "2026-06-17T19:00:00", group: "D", homeTeam: "BRA", awayTeam: "ECU", homeScore: 4, awayScore: 1, stadium: "SoFi Stadium", status: "finished", phase: "group", round: 2 },
        { id: 20, date: "2026-06-17T19:00:00", group: "D", homeTeam: "ARG", awayTeam: "PER", homeScore: 2, awayScore: 1, stadium: "Mercedes-Benz Stadium", status: "finished", phase: "group", round: 2 },
        
        // Group E
        { id: 9, date: "2026-06-12T19:00:00", group: "E", homeTeam: "FRA", awayTeam: "GER", homeScore: 3, awayScore: 2, stadium: "AT&T Stadium", status: "finished", phase: "group", round: 1 },
        { id: 10, date: "2026-06-13T16:00:00", group: "E", homeTeam: "DEN", awayTeam: "SWE", homeScore: 2, awayScore: 1, stadium: "Lincoln Financial Field", status: "finished", phase: "group", round: 1 },
        { id: 21, date: "2026-06-17T16:00:00", group: "E", homeTeam: "FRA", awayTeam: "DEN", homeScore: 3, awayScore: 1, stadium: "Hard Rock Stadium", status: "finished", phase: "group", round: 2 },
        { id: 22, date: "2026-06-17T16:00:00", group: "E", homeTeam: "GER", awayTeam: "SWE", homeScore: 2, awayScore: 1, stadium: "Gillette Stadium", status: "finished", phase: "group", round: 2 },
        
        // Group F
        { id: 11, date: "2026-06-13T19:00:00", group: "F", homeTeam: "ESP", awayTeam: "POR", homeScore: 2, awayScore: 2, stadium: "Hard Rock Stadium", status: "finished", phase: "group", round: 1 },
        { id: 12, date: "2026-06-13T16:00:00", group: "F", homeTeam: "NED", awayTeam: "BEL", homeScore: 1, awayScore: 0, stadium: "Levi's Stadium", status: "finished", phase: "group", round: 1 },
        { id: 23, date: "2026-06-18T19:00:00", group: "F", homeTeam: "ESP", awayTeam: "NED", homeScore: 3, awayScore: 1, stadium: "MetLife Stadium", status: "finished", phase: "group", round: 2 },
        { id: 24, date: "2026-06-18T19:00:00", group: "F", homeTeam: "POR", awayTeam: "BEL", homeScore: 2, awayScore: 1, stadium: "AT&T Stadium", status: "finished", phase: "group", round: 2 }
    ],

    // Top scorers (simulated)
    topScorers: [
        { player: "Kylian Mbappé", team: "FRA", goals: 5, matches: 2 },
        { player: "Harry Kane", team: "ENG", goals: 4, matches: 2 },
        { player: "Vinícius Jr", team: "BRA", goals: 4, matches: 2 },
        { player: "Lionel Messi", team: "ARG", goals: 3, matches: 2 },
        { player: "Cristiano Ronaldo", team: "POR", goals: 3, matches: 2 },
        { player: "Erling Haaland", team: "NOR", goals: 3, matches: 2 },
        { player: "Lautaro Martínez", team: "ARG", goals: 2, matches: 2 },
        { player: "Álvaro Morata", team: "ESP", goals: 2, matches: 2 },
        { player: "Christian Pulisic", team: "USA", goals: 2, matches: 2 },
        { player: "Son Heung-min", team: "KOR", goals: 2, matches: 2 }
    ],

    // Top assists
    topAssists: [
        { player: "Kevin De Bruyne", team: "BEL", assists: 4, matches: 2 },
        { player: "Bruno Fernandes", team: "POR", assists: 3, matches: 2 },
        { player: "Neymar Jr", team: "BRA", assists: 3, matches: 2 },
        { player: "Luka Modrić", team: "CRO", assists: 2, matches: 2 },
        { player: "Toni Kroos", team: "GER", assists: 2, matches: 2 }
    ]
};

// Helper functions
function getTeamInfo(teamCode) {
    return WORLD_CUP_2026.teams[teamCode] || null;
}

function getGroupStandings(groupId) {
    return WORLD_CUP_2026.groupStandings[groupId] || [];
}

function getAllMatches() {
    return WORLD_CUP_2026.matches;
}

function getMatchesByGroup(groupId) {
    return WORLD_CUP_2026.matches.filter(m => m.group === groupId);
}

function getMatchesByTeam(teamCode) {
    return WORLD_CUP_2026.matches.filter(m => 
        m.homeTeam === teamCode || m.awayTeam === teamCode
    );
}

function getTopScorers(limit = 10) {
    return WORLD_CUP_2026.topScorers.slice(0, limit);
}

function getTopAssists(limit = 5) {
    return WORLD_CUP_2026.topAssists.slice(0, limit);
}

console.log('✅ Data module loaded - Copa 2026 data ready');

// Made with Bob
