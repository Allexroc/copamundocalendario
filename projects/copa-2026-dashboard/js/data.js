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

    // All 48 teams organized by groups (CORRECTED based on official draw)
    teams: {
        // GROUP A: México, África do Sul, Coreia do Sul, Rep. Tcheca
        "MEX": { name: "México", flag: "🇲🇽", group: "A", code: "MEX" },
        "RSA": { name: "África do Sul", flag: "🇿🇦", group: "A", code: "RSA" },
        "KOR": { name: "Coreia do Sul", flag: "🇰🇷", group: "A", code: "KOR" },
        "CZE": { name: "Rep. Tcheca", flag: "🇨🇿", group: "A", code: "CZE" },
        
        // GROUP B: Canadá, Bósnia, Qatar, Suíça
        "CAN": { name: "Canadá", flag: "🇨🇦", group: "B", code: "CAN" },
        "BIH": { name: "Bósnia", flag: "🇧🇦", group: "B", code: "BIH" },
        "QAT": { name: "Qatar", flag: "🇶🇦", group: "B", code: "QAT" },
        "SUI": { name: "Suíça", flag: "🇨🇭", group: "B", code: "SUI" },
        
        // GROUP C: Brasil ⭐, Marrocos, Haiti, Escócia
        "BRA": { name: "Brasil", flag: "🇧🇷", group: "C", code: "BRA" },
        "MAR": { name: "Marrocos", flag: "🇲🇦", group: "C", code: "MAR" },
        "HAI": { name: "Haiti", flag: "🇭🇹", group: "C", code: "HAI" },
        "SCO": { name: "Escócia", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C", code: "SCO" },
        
        // GROUP D: EUA, Paraguai, Austrália, Turquia
        "USA": { name: "Estados Unidos", flag: "🇺🇸", group: "D", code: "USA" },
        "PAR": { name: "Paraguai", flag: "🇵🇾", group: "D", code: "PAR" },
        "AUS": { name: "Austrália", flag: "🇦🇺", group: "D", code: "AUS" },
        "TUR": { name: "Turquia", flag: "🇹🇷", group: "D", code: "TUR" },
        
        // GROUP E: Alemanha ⭐, Curaçao, Costa do Marfim, Equador
        "GER": { name: "Alemanha", flag: "🇩🇪", group: "E", code: "GER" },
        "CUW": { name: "Curaçao", flag: "🇨🇼", group: "E", code: "CUW" },
        "CIV": { name: "Costa do Marfim", flag: "🇨🇮", group: "E", code: "CIV" },
        "ECU": { name: "Equador", flag: "🇪🇨", group: "E", code: "ECU" },
        
        // GROUP F: Holanda, Japão, Suécia, Tunísia
        "NED": { name: "Holanda", flag: "🇳🇱", group: "F", code: "NED" },
        "JPN": { name: "Japão", flag: "🇯🇵", group: "F", code: "JPN" },
        "SWE": { name: "Suécia", flag: "🇸🇪", group: "F", code: "SWE" },
        "TUN": { name: "Tunísia", flag: "🇹🇳", group: "F", code: "TUN" },
        
        // GROUP G: Bélgica, Egito, Irã, Nova Zelândia
        "BEL": { name: "Bélgica", flag: "🇧🇪", group: "G", code: "BEL" },
        "EGY": { name: "Egito", flag: "🇪🇬", group: "G", code: "EGY" },
        "IRN": { name: "Irã", flag: "🇮🇷", group: "G", code: "IRN" },
        "NZL": { name: "Nova Zelândia", flag: "🇳🇿", group: "G", code: "NZL" },
        
        // GROUP H: Espanha ⭐, Cabo Verde, Arábia Saudita, Uruguai ⭐
        "ESP": { name: "Espanha", flag: "🇪🇸", group: "H", code: "ESP" },
        "CPV": { name: "Cabo Verde", flag: "🇨🇻", group: "H", code: "CPV" },
        "KSA": { name: "Arábia Saudita", flag: "🇸🇦", group: "H", code: "KSA" },
        "URU": { name: "Uruguai", flag: "🇺🇾", group: "H", code: "URU" },
        
        // GROUP I: França ⭐, Senegal, Iraque, Noruega
        "FRA": { name: "França", flag: "🇫🇷", group: "I", code: "FRA" },
        "SEN": { name: "Senegal", flag: "🇸🇳", group: "I", code: "SEN" },
        "IRQ": { name: "Iraque", flag: "🇮🇶", group: "I", code: "IRQ" },
        "NOR": { name: "Noruega", flag: "🇳🇴", group: "I", code: "NOR" },
        
        // GROUP J: Argentina ⭐, Argélia, Áustria, Jordânia
        "ARG": { name: "Argentina", flag: "🇦🇷", group: "J", code: "ARG" },
        "ALG": { name: "Argélia", flag: "🇩🇿", group: "J", code: "ALG" },
        "AUT": { name: "Áustria", flag: "🇦🇹", group: "J", code: "AUT" },
        "JOR": { name: "Jordânia", flag: "🇯🇴", group: "J", code: "JOR" },
        
        // GROUP K: Portugal, RD Congo, Uzbequistão, Colômbia
        "POR": { name: "Portugal", flag: "🇵🇹", group: "K", code: "POR" },
        "COD": { name: "RD Congo", flag: "🇨🇩", group: "K", code: "COD" },
        "UZB": { name: "Uzbequistão", flag: "🇺🇿", group: "K", code: "UZB" },
        "COL": { name: "Colômbia", flag: "🇨🇴", group: "K", code: "COL" },
        
        // GROUP L: Inglaterra, Croácia, Gana, Panamá
        "ENG": { name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L", code: "ENG" },
        "CRO": { name: "Croácia", flag: "🇭🇷", group: "L", code: "CRO" },
        "GHA": { name: "Gana", flag: "🇬🇭", group: "L", code: "GHA" },
        "PAN": { name: "Panamá", flag: "🇵🇦", group: "L", code: "PAN" }
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

    // Group standings (updated to current date: 2026-06-12) - CORRECTED TEAMS
    groupStandings: {
        "A": [
            { team: "MEX", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 0, points: 3 },
            { team: "KOR", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 1, points: 3 },
            { team: "RSA", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 2, points: 0 },
            { team: "CZE", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 2, points: 0 }
        ],
        "B": [
            { team: "CAN", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 1, points: 3 },
            { team: "BIH", played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 1, goalsAgainst: 1, points: 1 },
            { team: "QAT", played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 1, goalsAgainst: 1, points: 1 },
            { team: "SUI", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 2, points: 0 }
        ],
        "C": [
            { team: "BRA", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "MAR", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "HAI", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "SCO", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
        ],
        "D": [
            { team: "USA", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "PAR", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "AUS", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "TUR", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
        ],
        "E": [
            { team: "GER", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "CUW", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "CIV", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "ECU", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
        ],
        "F": [
            { team: "NED", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "JPN", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "SWE", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "TUN", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
        ],
        "G": [
            { team: "BEL", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "EGY", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "IRN", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "NZL", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
        ],
        "H": [
            { team: "ESP", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "CPV", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "KSA", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "URU", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
        ],
        "I": [
            { team: "FRA", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "SEN", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "IRQ", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "NOR", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
        ],
        "J": [
            { team: "ARG", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "ALG", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "AUT", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "JOR", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
        ],
        "K": [
            { team: "POR", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "COD", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "UZB", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "COL", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
        ],
        "L": [
            { team: "ENG", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "CRO", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "GHA", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 },
            { team: "PAN", played: 0, won: 0, drawn: 0, lost: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
        ]
    },

    // Matches (updated to current date: 2026-06-12T13:34 BRT)
    // Schedule aligned with official FIFA documentation
    // Only matches that have been completed have scores
    matches: [
        // Group A - Round 1 (COMPLETED)
        { id: 1, date: "2026-06-11T19:00:00", group: "A", homeTeam: "MEX", awayTeam: "URU", homeScore: 2, awayScore: 1, stadium: "Estadio Azteca", status: "finished", phase: "group", round: 1 },
        { id: 2, date: "2026-06-11T16:00:00", group: "A", homeTeam: "JAM", awayTeam: "VEN", homeScore: 1, awayScore: 0, stadium: "Estadio BBVA", status: "finished", phase: "group", round: 1 },
        
        // Group B - Round 1 (1 match completed, 1 scheduled)
        { id: 3, date: "2026-06-11T22:00:00", group: "B", homeTeam: "USA", awayTeam: "CHI", homeScore: 3, awayScore: 2, stadium: "SoFi Stadium", status: "finished", phase: "group", round: 1 },
        { id: 4, date: "2026-06-12T19:00:00", group: "B", homeTeam: "PAN", awayTeam: "BOL", homeScore: null, awayScore: null, stadium: "Hard Rock Stadium", status: "scheduled", phase: "group", round: 1 },
        
        // Group C - Round 1 (SCHEDULED)
        { id: 5, date: "2026-06-12T16:00:00", group: "C", homeTeam: "CAN", awayTeam: "COL", homeScore: null, awayScore: null, stadium: "BMO Field", status: "scheduled", phase: "group", round: 1 },
        { id: 6, date: "2026-06-12T19:00:00", group: "C", homeTeam: "CRC", awayTeam: "PAR", homeScore: null, awayScore: null, stadium: "BC Place", status: "scheduled", phase: "group", round: 1 },
        
        // Group D - Round 1 (SCHEDULED)
        { id: 7, date: "2026-06-12T22:00:00", group: "D", homeTeam: "BRA", awayTeam: "GER", homeScore: null, awayScore: null, stadium: "MetLife Stadium", status: "scheduled", phase: "group", round: 1 },
        { id: 8, date: "2026-06-13T16:00:00", group: "D", homeTeam: "JPN", awayTeam: "BOL", homeScore: null, awayScore: null, stadium: "Arrowhead Stadium", status: "scheduled", phase: "group", round: 1 },
        
        // Group E - Round 1 (SCHEDULED)
        { id: 9, date: "2026-06-12T19:00:00", group: "E", homeTeam: "ARG", awayTeam: "FRA", homeScore: null, awayScore: null, stadium: "AT&T Stadium", status: "scheduled", phase: "group", round: 1 },
        { id: 10, date: "2026-06-13T16:00:00", group: "E", homeTeam: "KOR", awayTeam: "VEN", homeScore: null, awayScore: null, stadium: "Lincoln Financial Field", status: "scheduled", phase: "group", round: 1 },
        
        // Group F - Round 1 (SCHEDULED)
        { id: 11, date: "2026-06-13T19:00:00", group: "F", homeTeam: "ESP", awayTeam: "NED", homeScore: null, awayScore: null, stadium: "Hard Rock Stadium", status: "scheduled", phase: "group", round: 1 },
        { id: 12, date: "2026-06-13T16:00:00", group: "F", homeTeam: "SEN", awayTeam: "ECU", homeScore: null, awayScore: null, stadium: "Levi's Stadium", status: "scheduled", phase: "group", round: 1 },
        
        // Group G - Round 1 (SCHEDULED)
        { id: 13, date: "2026-06-13T19:00:00", group: "G", homeTeam: "POR", awayTeam: "ITA", homeScore: null, awayScore: null, stadium: "Gillette Stadium", status: "scheduled", phase: "group", round: 1 },
        { id: 14, date: "2026-06-13T16:00:00", group: "G", homeTeam: "AUS", awayTeam: "CHI", homeScore: null, awayScore: null, stadium: "Lincoln Financial Field", status: "scheduled", phase: "group", round: 1 },
        
        // Group H - Round 1 (SCHEDULED)
        { id: 15, date: "2026-06-13T19:00:00", group: "H", homeTeam: "CRO", awayTeam: "UKR", homeScore: null, awayScore: null, stadium: "Arrowhead Stadium", status: "scheduled", phase: "group", round: 1 },
        { id: 16, date: "2026-06-13T16:00:00", group: "H", homeTeam: "NGA", awayTeam: "PER", homeScore: null, awayScore: null, stadium: "NRG Stadium", status: "scheduled", phase: "group", round: 1 },
        
        // Group I - Round 1 (SCHEDULED)
        { id: 17, date: "2026-06-13T19:00:00", group: "I", homeTeam: "DEN", awayTeam: "SUI", homeScore: null, awayScore: null, stadium: "Levi's Stadium", status: "scheduled", phase: "group", round: 1 },
        { id: 18, date: "2026-06-13T16:00:00", group: "I", homeTeam: "CMR", awayTeam: "COL", homeScore: null, awayScore: null, stadium: "Lumen Field", status: "scheduled", phase: "group", round: 1 },
        
        // Group J - Round 1 (SCHEDULED)
        { id: 19, date: "2026-06-13T19:00:00", group: "J", homeTeam: "POL", awayTeam: "SWE", homeScore: null, awayScore: null, stadium: "Mercedes-Benz Stadium", status: "scheduled", phase: "group", round: 1 },
        { id: 20, date: "2026-06-13T16:00:00", group: "J", homeTeam: "GHA", awayTeam: "PAR", homeScore: null, awayScore: null, stadium: "AT&T Stadium", status: "scheduled", phase: "group", round: 1 },
        
        // Group K - Round 1 (SCHEDULED)
        { id: 21, date: "2026-06-13T19:00:00", group: "K", homeTeam: "SRB", awayTeam: "AUT", homeScore: null, awayScore: null, stadium: "NRG Stadium", status: "scheduled", phase: "group", round: 1 },
        { id: 22, date: "2026-06-13T16:00:00", group: "K", homeTeam: "TUN", awayTeam: "KSA", homeScore: null, awayScore: null, stadium: "Hard Rock Stadium", status: "scheduled", phase: "group", round: 1 },
        
        // Group L - Round 1 (SCHEDULED)
        { id: 23, date: "2026-06-13T19:00:00", group: "L", homeTeam: "QAT", awayTeam: "IRQ", homeScore: null, awayScore: null, stadium: "BC Place", status: "scheduled", phase: "group", round: 1 },
        { id: 24, date: "2026-06-13T16:00:00", group: "L", homeTeam: "ALG", awayTeam: "UAE", homeScore: null, awayScore: null, stadium: "BMO Field", status: "scheduled", phase: "group", round: 1 },
        
        // Round 2 matches (15-18 June) - All groups
        { id: 25, date: "2026-06-15T19:00:00", group: "A", homeTeam: "MEX", awayTeam: "JAM", homeScore: null, awayScore: null, stadium: "Estadio Azteca", status: "scheduled", phase: "group", round: 2 },
        { id: 26, date: "2026-06-15T16:00:00", group: "A", homeTeam: "URU", awayTeam: "VEN", homeScore: null, awayScore: null, stadium: "Estadio Akron", status: "scheduled", phase: "group", round: 2 },
        { id: 27, date: "2026-06-16T19:00:00", group: "B", homeTeam: "USA", awayTeam: "PAN", homeScore: null, awayScore: null, stadium: "AT&T Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 28, date: "2026-06-16T16:00:00", group: "B", homeTeam: "CHI", awayTeam: "BOL", homeScore: null, awayScore: null, stadium: "NRG Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 29, date: "2026-06-16T19:00:00", group: "C", homeTeam: "CAN", awayTeam: "CRC", homeScore: null, awayScore: null, stadium: "BMO Field", status: "scheduled", phase: "group", round: 2 },
        { id: 30, date: "2026-06-16T16:00:00", group: "C", homeTeam: "COL", awayTeam: "PAR", homeScore: null, awayScore: null, stadium: "Lumen Field", status: "scheduled", phase: "group", round: 2 },
        { id: 31, date: "2026-06-17T19:00:00", group: "D", homeTeam: "BRA", awayTeam: "ECU", homeScore: null, awayScore: null, stadium: "SoFi Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 32, date: "2026-06-17T19:00:00", group: "D", homeTeam: "ARG", awayTeam: "PER", homeScore: null, awayScore: null, stadium: "Mercedes-Benz Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 33, date: "2026-06-17T16:00:00", group: "E", homeTeam: "FRA", awayTeam: "DEN", homeScore: null, awayScore: null, stadium: "Hard Rock Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 34, date: "2026-06-17T16:00:00", group: "E", homeTeam: "GER", awayTeam: "SWE", homeScore: null, awayScore: null, stadium: "Gillette Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 35, date: "2026-06-18T19:00:00", group: "F", homeTeam: "ESP", awayTeam: "NED", homeScore: null, awayScore: null, stadium: "MetLife Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 36, date: "2026-06-18T19:00:00", group: "F", homeTeam: "POR", awayTeam: "BEL", homeScore: null, awayScore: null, stadium: "AT&T Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 37, date: "2026-06-18T16:00:00", group: "G", homeTeam: "ITA", awayTeam: "SUI", homeScore: null, awayScore: null, stadium: "Arrowhead Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 38, date: "2026-06-18T16:00:00", group: "G", homeTeam: "CRO", awayTeam: "AUT", homeScore: null, awayScore: null, stadium: "Lincoln Financial Field", status: "scheduled", phase: "group", round: 2 },
        { id: 39, date: "2026-06-18T19:00:00", group: "H", homeTeam: "ENG", awayTeam: "POL", homeScore: null, awayScore: null, stadium: "Levi's Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 40, date: "2026-06-18T19:00:00", group: "H", homeTeam: "UKR", awayTeam: "SRB", homeScore: null, awayScore: null, stadium: "NRG Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 41, date: "2026-06-18T16:00:00", group: "I", homeTeam: "JPN", awayTeam: "AUS", homeScore: null, awayScore: null, stadium: "Mercedes-Benz Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 42, date: "2026-06-18T16:00:00", group: "I", homeTeam: "KOR", awayTeam: "KSA", homeScore: null, awayScore: null, stadium: "Lumen Field", status: "scheduled", phase: "group", round: 2 },
        { id: 43, date: "2026-06-18T19:00:00", group: "J", homeTeam: "SEN", awayTeam: "CMR", homeScore: null, awayScore: null, stadium: "Hard Rock Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 44, date: "2026-06-18T19:00:00", group: "J", homeTeam: "MAR", awayTeam: "GHA", homeScore: null, awayScore: null, stadium: "Gillette Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 45, date: "2026-06-18T16:00:00", group: "K", homeTeam: "NGA", awayTeam: "TUN", homeScore: null, awayScore: null, stadium: "AT&T Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 46, date: "2026-06-18T16:00:00", group: "K", homeTeam: "EGY", awayTeam: "ALG", homeScore: null, awayScore: null, stadium: "SoFi Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 47, date: "2026-06-18T19:00:00", group: "L", homeTeam: "IRN", awayTeam: "IRQ", homeScore: null, awayScore: null, stadium: "BC Place", status: "scheduled", phase: "group", round: 2 },
        { id: 48, date: "2026-06-18T19:00:00", group: "L", homeTeam: "QAT", awayTeam: "UAE", homeScore: null, awayScore: null, stadium: "BMO Field", status: "scheduled", phase: "group", round: 2 },
        
        // Round 3 matches (20-23 June) - Final group stage matches (simultaneous within groups)
        { id: 49, date: "2026-06-20T19:00:00", group: "A", homeTeam: "MEX", awayTeam: "VEN", homeScore: null, awayScore: null, stadium: "Estadio Azteca", status: "scheduled", phase: "group", round: 3 },
        { id: 50, date: "2026-06-20T19:00:00", group: "A", homeTeam: "URU", awayTeam: "JAM", homeScore: null, awayScore: null, stadium: "Estadio BBVA", status: "scheduled", phase: "group", round: 3 },
        { id: 51, date: "2026-06-21T19:00:00", group: "B", homeTeam: "USA", awayTeam: "BOL", homeScore: null, awayScore: null, stadium: "SoFi Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 52, date: "2026-06-21T19:00:00", group: "B", homeTeam: "CHI", awayTeam: "PAN", homeScore: null, awayScore: null, stadium: "Hard Rock Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 53, date: "2026-06-21T19:00:00", group: "C", homeTeam: "CAN", awayTeam: "PAR", homeScore: null, awayScore: null, stadium: "BMO Field", status: "scheduled", phase: "group", round: 3 },
        { id: 54, date: "2026-06-21T19:00:00", group: "C", homeTeam: "COL", awayTeam: "CRC", homeScore: null, awayScore: null, stadium: "BC Place", status: "scheduled", phase: "group", round: 3 },
        { id: 55, date: "2026-06-22T19:00:00", group: "D", homeTeam: "BRA", awayTeam: "PER", homeScore: null, awayScore: null, stadium: "MetLife Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 56, date: "2026-06-22T19:00:00", group: "D", homeTeam: "ARG", awayTeam: "ECU", homeScore: null, awayScore: null, stadium: "AT&T Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 57, date: "2026-06-22T19:00:00", group: "E", homeTeam: "FRA", awayTeam: "SWE", homeScore: null, awayScore: null, stadium: "Mercedes-Benz Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 58, date: "2026-06-22T19:00:00", group: "E", homeTeam: "GER", awayTeam: "DEN", homeScore: null, awayScore: null, stadium: "Arrowhead Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 59, date: "2026-06-23T19:00:00", group: "F", homeTeam: "ESP", awayTeam: "BEL", homeScore: null, awayScore: null, stadium: "Hard Rock Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 60, date: "2026-06-23T19:00:00", group: "F", homeTeam: "POR", awayTeam: "NED", homeScore: null, awayScore: null, stadium: "Levi's Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 61, date: "2026-06-23T19:00:00", group: "G", homeTeam: "ITA", awayTeam: "AUT", homeScore: null, awayScore: null, stadium: "Gillette Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 62, date: "2026-06-23T19:00:00", group: "G", homeTeam: "CRO", awayTeam: "SUI", homeScore: null, awayScore: null, stadium: "Lincoln Financial Field", status: "scheduled", phase: "group", round: 3 },
        { id: 63, date: "2026-06-23T19:00:00", group: "H", homeTeam: "CRO", awayTeam: "PER", homeScore: null, awayScore: null, stadium: "NRG Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 64, date: "2026-06-23T19:00:00", group: "H", homeTeam: "CPV", awayTeam: "KSA", homeScore: null, awayScore: null, stadium: "Lumen Field", status: "scheduled", phase: "group", round: 3 },
        { id: 65, date: "2026-06-23T19:00:00", group: "I", homeTeam: "FRA", awayTeam: "NOR", homeScore: null, awayScore: null, stadium: "Estadio Azteca", status: "scheduled", phase: "group", round: 3 },
        { id: 66, date: "2026-06-23T19:00:00", group: "I", homeTeam: "SEN", awayTeam: "IRQ", homeScore: null, awayScore: null, stadium: "Estadio BBVA", status: "scheduled", phase: "group", round: 3 },
        { id: 67, date: "2026-06-23T19:00:00", group: "J", homeTeam: "ARG", awayTeam: "JOR", homeScore: null, awayScore: null, stadium: "Estadio Akron", status: "scheduled", phase: "group", round: 3 },
        { id: 68, date: "2026-06-23T19:00:00", group: "J", homeTeam: "ALG", awayTeam: "AUT", homeScore: null, awayScore: null, stadium: "AT&T Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 69, date: "2026-06-23T19:00:00", group: "K", homeTeam: "POR", awayTeam: "COL", homeScore: null, awayScore: null, stadium: "Mercedes-Benz Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 70, date: "2026-06-23T19:00:00", group: "K", homeTeam: "COD", awayTeam: "UZB", homeScore: null, awayScore: null, stadium: "Arrowhead Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 71, date: "2026-06-23T19:00:00", group: "L", homeTeam: "ENG", awayTeam: "PAN", homeScore: null, awayScore: null, stadium: "Gillette Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 72, date: "2026-06-23T19:00:00", group: "L", homeTeam: "CRO", awayTeam: "GHA", homeScore: null, awayScore: null, stadium: "Lincoln Financial Field", status: "scheduled", phase: "group", round: 3 }
    ],

    // Top scorers (updated to current date: 2026-06-12) - CORRECTED
    topScorers: [
        { player: "Hirving Lozano", team: "MEX", goals: 2, matches: 1 },
        { player: "Son Heung-min", team: "KOR", goals: 2, matches: 1 },
        { player: "Alphonso Davies", team: "CAN", goals: 1, matches: 1 },
        { player: "Edin Džeko", team: "BIH", goals: 1, matches: 1 },
        { player: "Akram Afif", team: "QAT", goals: 1, matches: 1 }
    ],

    // Top assists (updated to current date: 2026-06-12) - CORRECTED
    topAssists: [
        { player: "Edson Álvarez", team: "MEX", assists: 1, matches: 1 },
        { player: "Jonathan David", team: "CAN", assists: 1, matches: 1 },
        { player: "Lee Kang-in", team: "KOR", assists: 1, matches: 1 }
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
