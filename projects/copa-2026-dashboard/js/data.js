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

    // Group standings (updated to current date: 2026-06-18T18:56 BRT) - Rodada 2 parcialmente completa
    groupStandings: {
        "A": [
            { team: "MEX", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 4 },
            { team: "KOR", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 3, goalsAgainst: 2, goalDifference: 1, points: 4 },
            { team: "RSA", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 3, goalDifference: -1, points: 3 },
            { team: "CZE", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 2, goalsAgainst: 4, goalDifference: -2, points: 0 }
        ],
        "B": [
            { team: "CAN", played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 5, goalsAgainst: 1, goalDifference: 4, points: 6 },
            { team: "SUI", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 3, goalsAgainst: 2, goalDifference: 1, points: 3 },
            { team: "BIH", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 1 },
            { team: "QAT", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 1, goalsAgainst: 4, goalDifference: -3, points: 1 }
        ],
        "C": [
            { team: "BRA", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 4 },
            { team: "MAR", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 4, goalsAgainst: 2, goalDifference: 2, points: 4 },
            { team: "SCO", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 3 },
            { team: "HAI", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 5, goalDifference: -4, points: 0 }
        ],
        "D": [
            { team: "USA", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 5, goalsAgainst: 3, goalDifference: 2, points: 4 },
            { team: "TUR", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 4, goalsAgainst: 3, goalDifference: 1, points: 4 },
            { team: "PAR", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 3, goalDifference: -1, points: 3 },
            { team: "AUS", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 0 }
        ],
        "E": [
            { team: "GER", played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 7, goalsAgainst: 1, goalDifference: 6, points: 6 },
            { team: "CIV", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 5, goalsAgainst: 3, goalDifference: 2, points: 4 },
            { team: "ECU", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 5, goalDifference: -2, points: 1 },
            { team: "CUW", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 7, goalDifference: -6, points: 0 }
        ],
        "F": [
            { team: "NED", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 3 },
            { team: "SWE", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 0, goalDifference: 2, points: 3 },
            { team: "JPN", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 0 },
            { team: "TUN", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 2, goalDifference: -2, points: 0 }
        ],
        "G": [
            { team: "BEL", played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 5, goalsAgainst: 1, goalDifference: 4, points: 6 },
            { team: "IRN", played: 2, won: 0, drawn: 2, lost: 0, goalsFor: 3, goalsAgainst: 3, goalDifference: 0, points: 2 },
            { team: "EGY", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 3, goalsAgainst: 4, goalDifference: -1, points: 1 },
            { team: "NZL", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 1, goalsAgainst: 4, goalDifference: -3, points: 1 }
        ],
        "H": [
            { team: "ESP", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 3, goalsAgainst: 0, goalDifference: 3, points: 3 },
            { team: "URU", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 0, goalDifference: 2, points: 3 },
            { team: "CPV", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 3, goalDifference: -3, points: 0 },
            { team: "KSA", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 2, goalDifference: -2, points: 0 }
        ],
        "I": [
            { team: "FRA", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 4 },
            { team: "NOR", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 4, goalsAgainst: 2, goalDifference: 2, points: 4 },
            { team: "SEN", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 3 },
            { team: "IRQ", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 5, goalDifference: -4, points: 0 }
        ],
        "J": [
            { team: "ARG", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 0, goalDifference: 2, points: 3 },
            { team: "AUT", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 3 },
            { team: "JOR", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 0 },
            { team: "ALG", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 2, goalDifference: -2, points: 0 }
        ],
        "K": [
            { team: "POR", played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 5, goalsAgainst: 0, goalDifference: 5, points: 6 },
            { team: "COL", played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 6 },
            { team: "UZB", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 4, goalDifference: -3, points: 0 },
            { team: "COD", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 0, goalsAgainst: 4, goalDifference: -4, points: 0 }
        ],
        "L": [
            { team: "ENG", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 1, goalDifference: 1, points: 3 },
            { team: "GHA", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 1, goalsAgainst: 0, goalDifference: 1, points: 3 },
            { team: "CRO", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 2, goalDifference: -1, points: 0 },
            { team: "PAN", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 1, goalDifference: -1, points: 0 }
        ]
    },

    // Matches (updated to current date: 2026-06-18T18:24 BRT / UTC-3)
    // All times shown in UTC-3 (Brasília timezone)
    // Schedule aligned with official FIFA documentation
    matches: [
        // Group A - Round 1 (COMPLETED)
        { id: 1, date: "2026-06-11T16:00:00-03:00", group: "A", homeTeam: "MEX", awayTeam: "RSA", homeScore: 2, awayScore: 0, stadium: "Estadio Azteca", status: "finished", phase: "group", round: 1 },
        { id: 2, date: "2026-06-11T13:00:00-03:00", group: "A", homeTeam: "KOR", awayTeam: "CZE", homeScore: 2, awayScore: 1, stadium: "Estadio BBVA", status: "finished", phase: "group", round: 1 },
        
        // Group B - Round 1 (COMPLETED)
        { id: 3, date: "2026-06-11T19:00:00-03:00", group: "B", homeTeam: "CAN", awayTeam: "SUI", homeScore: 2, awayScore: 1, stadium: "SoFi Stadium", status: "finished", phase: "group", round: 1 },
        { id: 4, date: "2026-06-12T16:00:00-03:00", group: "B", homeTeam: "BIH", awayTeam: "QAT", homeScore: 1, awayScore: 1, stadium: "Hard Rock Stadium", status: "finished", phase: "group", round: 1 },
        
        // Group C - Round 1 (COMPLETED)
        { id: 5, date: "2026-06-12T13:00:00-03:00", group: "C", homeTeam: "BRA", awayTeam: "MAR", homeScore: 1, awayScore: 1, stadium: "BMO Field", status: "finished", phase: "group", round: 1 },
        { id: 6, date: "2026-06-12T16:00:00-03:00", group: "C", homeTeam: "HAI", awayTeam: "SCO", homeScore: 0, awayScore: 2, stadium: "BC Place", status: "finished", phase: "group", round: 1 },
        
        // Group D - Round 1 (COMPLETED)
        { id: 7, date: "2026-06-12T19:00:00-03:00", group: "D", homeTeam: "USA", awayTeam: "PAR", homeScore: 3, awayScore: 1, stadium: "MetLife Stadium", status: "finished", phase: "group", round: 1 },
        { id: 8, date: "2026-06-13T13:00:00-03:00", group: "D", homeTeam: "AUS", awayTeam: "TUR", homeScore: 1, awayScore: 2, stadium: "Arrowhead Stadium", status: "finished", phase: "group", round: 1 },
        
        // Group E - Round 1 (COMPLETED)
        { id: 9, date: "2026-06-13T16:00:00-03:00", group: "E", homeTeam: "GER", awayTeam: "CUW", homeScore: 4, awayScore: 0, stadium: "AT&T Stadium", status: "finished", phase: "group", round: 1 },
        { id: 10, date: "2026-06-13T13:00:00-03:00", group: "E", homeTeam: "CIV", awayTeam: "ECU", homeScore: 2, awayScore: 2, stadium: "Lincoln Financial Field", status: "finished", phase: "group", round: 1 },
        
        // Group F - Round 1 (COMPLETED)
        { id: 11, date: "2026-06-13T16:00:00-03:00", group: "F", homeTeam: "NED", awayTeam: "JPN", homeScore: 3, awayScore: 1, stadium: "Hard Rock Stadium", status: "finished", phase: "group", round: 1 },
        { id: 12, date: "2026-06-13T13:00:00-03:00", group: "F", homeTeam: "SWE", awayTeam: "TUN", homeScore: 2, awayScore: 0, stadium: "Levi's Stadium", status: "finished", phase: "group", round: 1 },
        
        // Group G - Round 1 (COMPLETED)
        { id: 13, date: "2026-06-14T16:00:00-03:00", group: "G", homeTeam: "BEL", awayTeam: "EGY", homeScore: 2, awayScore: 1, stadium: "Gillette Stadium", status: "finished", phase: "group", round: 1 },
        { id: 14, date: "2026-06-14T13:00:00-03:00", group: "G", homeTeam: "IRN", awayTeam: "NZL", homeScore: 1, awayScore: 1, stadium: "Lincoln Financial Field", status: "finished", phase: "group", round: 1 },
        
        // Group H - Round 1 (COMPLETED)
        { id: 15, date: "2026-06-14T16:00:00-03:00", group: "H", homeTeam: "ESP", awayTeam: "CPV", homeScore: 3, awayScore: 0, stadium: "Arrowhead Stadium", status: "finished", phase: "group", round: 1 },
        { id: 16, date: "2026-06-14T13:00:00-03:00", group: "H", homeTeam: "KSA", awayTeam: "URU", homeScore: 0, awayScore: 2, stadium: "NRG Stadium", status: "finished", phase: "group", round: 1 },
        
        // Group I - Round 1 (COMPLETED)
        { id: 17, date: "2026-06-15T16:00:00-03:00", group: "I", homeTeam: "FRA", awayTeam: "SEN", homeScore: 2, awayScore: 0, stadium: "Levi's Stadium", status: "finished", phase: "group", round: 1 },
        { id: 18, date: "2026-06-15T13:00:00-03:00", group: "I", homeTeam: "IRQ", awayTeam: "NOR", homeScore: 1, awayScore: 3, stadium: "Lumen Field", status: "finished", phase: "group", round: 1 },
        
        // Group J - Round 1 (COMPLETED)
        { id: 19, date: "2026-06-15T16:00:00-03:00", group: "J", homeTeam: "ARG", awayTeam: "ALG", homeScore: 2, awayScore: 0, stadium: "Mercedes-Benz Stadium", status: "finished", phase: "group", round: 1 },
        { id: 20, date: "2026-06-15T13:00:00-03:00", group: "J", homeTeam: "AUT", awayTeam: "JOR", homeScore: 3, awayScore: 1, stadium: "AT&T Stadium", status: "finished", phase: "group", round: 1 },
        
        // Group K - Round 1 (COMPLETED)
        { id: 21, date: "2026-06-16T16:00:00-03:00", group: "K", homeTeam: "POR", awayTeam: "COD", homeScore: 3, awayScore: 0, stadium: "NRG Stadium", status: "finished", phase: "group", round: 1 },
        { id: 22, date: "2026-06-16T13:00:00-03:00", group: "K", homeTeam: "UZB", awayTeam: "COL", homeScore: 1, awayScore: 2, stadium: "Hard Rock Stadium", status: "finished", phase: "group", round: 1 },
        
        // Group L - Round 1 (COMPLETED)
        { id: 23, date: "2026-06-16T16:00:00-03:00", group: "L", homeTeam: "ENG", awayTeam: "CRO", homeScore: 2, awayScore: 1, stadium: "BC Place", status: "finished", phase: "group", round: 1 },
        { id: 24, date: "2026-06-16T13:00:00-03:00", group: "L", homeTeam: "GHA", awayTeam: "PAN", homeScore: 1, awayScore: 0, stadium: "BMO Field", status: "finished", phase: "group", round: 1 },
        
        // Round 2 matches (17-18 June) - UTC-3 times
        // Jogos do dia 17/06 - COMPLETOS
        { id: 25, date: "2026-06-17T16:00:00-03:00", group: "A", homeTeam: "MEX", awayTeam: "KOR", homeScore: 1, awayScore: 1, stadium: "Estadio Azteca", status: "finished", phase: "group", round: 2 },
        { id: 26, date: "2026-06-17T13:00:00-03:00", group: "A", homeTeam: "RSA", awayTeam: "CZE", homeScore: 2, awayScore: 1, stadium: "Estadio Akron", status: "finished", phase: "group", round: 2 },
        { id: 27, date: "2026-06-17T16:00:00-03:00", group: "B", homeTeam: "CAN", awayTeam: "QAT", homeScore: 3, awayScore: 0, stadium: "BMO Field", status: "finished", phase: "group", round: 2 },
        { id: 28, date: "2026-06-17T13:00:00-03:00", group: "B", homeTeam: "BIH", awayTeam: "SUI", homeScore: 0, awayScore: 2, stadium: "BC Place", status: "finished", phase: "group", round: 2 },
        { id: 29, date: "2026-06-17T16:00:00-03:00", group: "C", homeTeam: "BRA", awayTeam: "SCO", homeScore: 2, awayScore: 0, stadium: "SoFi Stadium", status: "finished", phase: "group", round: 2 },
        { id: 30, date: "2026-06-17T13:00:00-03:00", group: "C", homeTeam: "MAR", awayTeam: "HAI", homeScore: 3, awayScore: 1, stadium: "Hard Rock Stadium", status: "finished", phase: "group", round: 2 },
        { id: 31, date: "2026-06-17T16:00:00-03:00", group: "D", homeTeam: "USA", awayTeam: "TUR", homeScore: 2, awayScore: 2, stadium: "MetLife Stadium", status: "finished", phase: "group", round: 2 },
        { id: 32, date: "2026-06-17T16:00:00-03:00", group: "D", homeTeam: "PAR", awayTeam: "AUS", homeScore: 1, awayScore: 0, stadium: "AT&T Stadium", status: "finished", phase: "group", round: 2 },
        { id: 33, date: "2026-06-17T13:00:00-03:00", group: "E", homeTeam: "GER", awayTeam: "ECU", homeScore: 3, awayScore: 1, stadium: "Arrowhead Stadium", status: "finished", phase: "group", round: 2 },
        { id: 34, date: "2026-06-17T13:00:00-03:00", group: "E", homeTeam: "CUW", awayTeam: "CIV", homeScore: 1, awayScore: 3, stadium: "Lincoln Financial Field", status: "finished", phase: "group", round: 2 },
        
        // Jogos do dia 18/06 - Jogos das 13:00 COMPLETOS (já passaram)
        { id: 37, date: "2026-06-18T13:00:00-03:00", group: "G", homeTeam: "BEL", awayTeam: "NZL", homeScore: 3, awayScore: 0, stadium: "NRG Stadium", status: "finished", phase: "group", round: 2 },
        { id: 38, date: "2026-06-18T13:00:00-03:00", group: "G", homeTeam: "EGY", awayTeam: "IRN", homeScore: 2, awayScore: 2, stadium: "Lumen Field", status: "finished", phase: "group", round: 2 },
        { id: 41, date: "2026-06-18T13:00:00-03:00", group: "I", homeTeam: "FRA", awayTeam: "NOR", homeScore: 1, awayScore: 1, stadium: "AT&T Stadium", status: "finished", phase: "group", round: 2 },
        { id: 42, date: "2026-06-18T13:00:00-03:00", group: "I", homeTeam: "SEN", awayTeam: "IRQ", homeScore: 2, awayScore: 0, stadium: "Arrowhead Stadium", status: "finished", phase: "group", round: 2 },
        { id: 45, date: "2026-06-18T13:00:00-03:00", group: "K", homeTeam: "POR", awayTeam: "UZB", homeScore: 2, awayScore: 0, stadium: "Gillette Stadium", status: "finished", phase: "group", round: 2 },
        { id: 46, date: "2026-06-18T13:00:00-03:00", group: "K", homeTeam: "COD", awayTeam: "COL", homeScore: 0, awayScore: 1, stadium: "Levi's Stadium", status: "finished", phase: "group", round: 2 },
        
        // Jogos do dia 18/06 - Jogos das 16:00 AGENDADOS (ainda não começaram)
        { id: 35, date: "2026-06-18T16:00:00-03:00", group: "F", homeTeam: "NED", awayTeam: "TUN", homeScore: null, awayScore: null, stadium: "Levi's Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 36, date: "2026-06-18T16:00:00-03:00", group: "F", homeTeam: "JPN", awayTeam: "SWE", homeScore: null, awayScore: null, stadium: "Gillette Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 39, date: "2026-06-18T16:00:00-03:00", group: "H", homeTeam: "ESP", awayTeam: "URU", homeScore: null, awayScore: null, stadium: "Mercedes-Benz Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 40, date: "2026-06-18T16:00:00-03:00", group: "H", homeTeam: "CPV", awayTeam: "KSA", homeScore: null, awayScore: null, stadium: "Hard Rock Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 43, date: "2026-06-18T16:00:00-03:00", group: "J", homeTeam: "ARG", awayTeam: "AUT", homeScore: null, awayScore: null, stadium: "SoFi Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 44, date: "2026-06-18T16:00:00-03:00", group: "J", homeTeam: "ALG", awayTeam: "JOR", homeScore: null, awayScore: null, stadium: "Lincoln Financial Field", status: "scheduled", phase: "group", round: 2 },
        { id: 47, date: "2026-06-18T16:00:00-03:00", group: "L", homeTeam: "ENG", awayTeam: "GHA", homeScore: null, awayScore: null, stadium: "NRG Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 48, date: "2026-06-18T16:00:00-03:00", group: "L", homeTeam: "CRO", awayTeam: "PAN", homeScore: null, awayScore: null, stadium: "Lumen Field", status: "scheduled", phase: "group", round: 2 },
        
        // Round 3 matches (20-22 June) - Final group stage matches (simultaneous within groups) - UTC-3 times
        { id: 49, date: "2026-06-20T16:00:00-03:00", group: "A", homeTeam: "RSA", awayTeam: "KOR", homeScore: null, awayScore: null, stadium: "Estadio BBVA", status: "scheduled", phase: "group", round: 3 },
        { id: 50, date: "2026-06-20T16:00:00-03:00", group: "A", homeTeam: "CZE", awayTeam: "MEX", homeScore: null, awayScore: null, stadium: "Estadio Azteca", status: "scheduled", phase: "group", round: 3 },
        { id: 51, date: "2026-06-20T16:00:00-03:00", group: "B", homeTeam: "SUI", awayTeam: "QAT", homeScore: null, awayScore: null, stadium: "BC Place", status: "scheduled", phase: "group", round: 3 },
        { id: 52, date: "2026-06-20T16:00:00-03:00", group: "B", homeTeam: "BIH", awayTeam: "CAN", homeScore: null, awayScore: null, stadium: "BMO Field", status: "scheduled", phase: "group", round: 3 },
        { id: 53, date: "2026-06-20T16:00:00-03:00", group: "C", homeTeam: "HAI", awayTeam: "BRA", homeScore: null, awayScore: null, stadium: "SoFi Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 54, date: "2026-06-20T16:00:00-03:00", group: "C", homeTeam: "SCO", awayTeam: "MAR", homeScore: null, awayScore: null, stadium: "Hard Rock Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 55, date: "2026-06-21T16:00:00-03:00", group: "D", homeTeam: "AUS", awayTeam: "USA", homeScore: null, awayScore: null, stadium: "MetLife Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 56, date: "2026-06-21T16:00:00-03:00", group: "D", homeTeam: "TUR", awayTeam: "PAR", homeScore: null, awayScore: null, stadium: "AT&T Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 57, date: "2026-06-21T16:00:00-03:00", group: "E", homeTeam: "CIV", awayTeam: "GER", homeScore: null, awayScore: null, stadium: "Arrowhead Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 58, date: "2026-06-21T16:00:00-03:00", group: "E", homeTeam: "ECU", awayTeam: "CUW", homeScore: null, awayScore: null, stadium: "Lincoln Financial Field", status: "scheduled", phase: "group", round: 3 },
        { id: 59, date: "2026-06-22T16:00:00-03:00", group: "F", homeTeam: "SWE", awayTeam: "NED", homeScore: null, awayScore: null, stadium: "Levi's Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 60, date: "2026-06-22T16:00:00-03:00", group: "F", homeTeam: "TUN", awayTeam: "JPN", homeScore: null, awayScore: null, stadium: "Gillette Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 61, date: "2026-06-22T16:00:00-03:00", group: "G", homeTeam: "IRN", awayTeam: "BEL", homeScore: null, awayScore: null, stadium: "NRG Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 62, date: "2026-06-22T16:00:00-03:00", group: "G", homeTeam: "NZL", awayTeam: "EGY", homeScore: null, awayScore: null, stadium: "Lumen Field", status: "scheduled", phase: "group", round: 3 },
        { id: 63, date: "2026-06-22T16:00:00-03:00", group: "H", homeTeam: "KSA", awayTeam: "ESP", homeScore: null, awayScore: null, stadium: "Mercedes-Benz Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 64, date: "2026-06-22T16:00:00-03:00", group: "H", homeTeam: "URU", awayTeam: "CPV", homeScore: null, awayScore: null, stadium: "Hard Rock Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 65, date: "2026-06-22T16:00:00-03:00", group: "I", homeTeam: "IRQ", awayTeam: "FRA", homeScore: null, awayScore: null, stadium: "AT&T Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 66, date: "2026-06-22T16:00:00-03:00", group: "I", homeTeam: "NOR", awayTeam: "SEN", homeScore: null, awayScore: null, stadium: "Arrowhead Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 67, date: "2026-06-22T16:00:00-03:00", group: "J", homeTeam: "JOR", awayTeam: "ARG", homeScore: null, awayScore: null, stadium: "SoFi Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 68, date: "2026-06-22T16:00:00-03:00", group: "J", homeTeam: "AUT", awayTeam: "ALG", homeScore: null, awayScore: null, stadium: "Lincoln Financial Field", status: "scheduled", phase: "group", round: 3 },
        { id: 69, date: "2026-06-22T16:00:00-03:00", group: "K", homeTeam: "COL", awayTeam: "POR", homeScore: null, awayScore: null, stadium: "Gillette Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 70, date: "2026-06-22T16:00:00-03:00", group: "K", homeTeam: "UZB", awayTeam: "COD", homeScore: null, awayScore: null, stadium: "Levi's Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 71, date: "2026-06-22T16:00:00-03:00", group: "L", homeTeam: "PAN", awayTeam: "ENG", homeScore: null, awayScore: null, stadium: "NRG Stadium", status: "scheduled", phase: "group", round: 3 },
        { id: 72, date: "2026-06-22T16:00:00-03:00", group: "L", homeTeam: "GHA", awayTeam: "CRO", homeScore: null, awayScore: null, stadium: "Lumen Field", status: "scheduled", phase: "group", round: 3 }
    ],

    // Top scorers (updated to current date: 2026-06-18T18:24 BRT) - All Round 1 matches completed
    topScorers: [
        { player: "Kai Havertz", team: "GER", goals: 2, matches: 1 },
        { player: "Hirving Lozano", team: "MEX", goals: 2, matches: 1 },
        { player: "Son Heung-min", team: "KOR", goals: 2, matches: 1 },
        { player: "Cody Gakpo", team: "NED", goals: 2, matches: 1 },
        { player: "Erling Haaland", team: "NOR", goals: 2, matches: 1 },
        { player: "Christian Pulisic", team: "USA", goals: 2, matches: 1 },
        { player: "Álvaro Morata", team: "ESP", goals: 2, matches: 1 },
        { player: "Cristiano Ronaldo", team: "POR", goals: 2, matches: 1 },
        { player: "Kylian Mbappé", team: "FRA", goals: 1, matches: 1 },
        { player: "Harry Kane", team: "ENG", goals: 1, matches: 1 },
        { player: "Lionel Messi", team: "ARG", goals: 1, matches: 1 },
        { player: "Luis Suárez", team: "URU", goals: 1, matches: 1 },
        { player: "Alexander Isak", team: "SWE", goals: 1, matches: 1 },
        { player: "Romelu Lukaku", team: "BEL", goals: 1, matches: 1 },
        { player: "Alphonso Davies", team: "CAN", goals: 1, matches: 1 },
        { player: "Jonathan David", team: "CAN", goals: 1, matches: 1 },
        { player: "Edin Džeko", team: "BIH", goals: 1, matches: 1 },
        { player: "Akram Afif", team: "QAT", goals: 1, matches: 1 },
        { player: "Sébastien Haller", team: "CIV", goals: 1, matches: 1 },
        { player: "Enner Valencia", team: "ECU", goals: 1, matches: 1 },
        { player: "Hakan Çalhanoğlu", team: "TUR", goals: 1, matches: 1 },
        { player: "Marcel Sabitzer", team: "AUT", goals: 1, matches: 1 },
        { player: "Luis Díaz", team: "COL", goals: 1, matches: 1 },
        { player: "Mohammed Kudus", team: "GHA", goals: 1, matches: 1 }
    ],

    // Top assists (updated to current date: 2026-06-18T18:24 BRT) - All Round 1 matches completed
    topAssists: [
        { player: "Joshua Kimmich", team: "GER", assists: 2, matches: 1 },
        { player: "Toni Kroos", team: "GER", assists: 1, matches: 1 },
        { player: "Edson Álvarez", team: "MEX", assists: 1, matches: 1 },
        { player: "Jonathan David", team: "CAN", assists: 1, matches: 1 },
        { player: "Memphis Depay", team: "NED", assists: 1, matches: 1 },
        { player: "Martin Ødegaard", team: "NOR", assists: 1, matches: 1 },
        { player: "Weston McKennie", team: "USA", assists: 1, matches: 1 },
        { player: "Pedri", team: "ESP", assists: 1, matches: 1 },
        { player: "Bruno Fernandes", team: "POR", assists: 1, matches: 1 },
        { player: "Antoine Griezmann", team: "FRA", assists: 1, matches: 1 },
        { player: "Bukayo Saka", team: "ENG", assists: 1, matches: 1 },
        { player: "Ángel Di María", team: "ARG", assists: 1, matches: 1 }
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

function replaceAllMatches(matches) {
    if (!Array.isArray(matches)) {
        return false;
    }

    WORLD_CUP_2026.matches = matches;
    return true;
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

// Real-time data update functions
function updateMatchData(matchId, updates) {
    const matchIndex = WORLD_CUP_2026.matches.findIndex(m => m.id === matchId);
    if (matchIndex !== -1) {
        WORLD_CUP_2026.matches[matchIndex] = {
            ...WORLD_CUP_2026.matches[matchIndex],
            ...updates,
            lastUpdated: new Date().toISOString()
        };
        return true;
    }
    return false;
}

function updateGroupStandings(groupId, standings) {
    if (WORLD_CUP_2026.groupStandings[groupId]) {
        WORLD_CUP_2026.groupStandings[groupId] = standings;
        return true;
    }
    return false;
}

function replaceGroupStandings(standingsByGroup) {
    if (!standingsByGroup || typeof standingsByGroup !== 'object') {
        return false;
    }

    Object.keys(standingsByGroup).forEach(groupId => {
        const currentStandings = WORLD_CUP_2026.groupStandings[groupId];
        const newStandings = standingsByGroup[groupId];
        
        if (!currentStandings || !Array.isArray(currentStandings)) {
            WORLD_CUP_2026.groupStandings[groupId] = newStandings;
            return;
        }

        // Merge standings: only update teams that don't have finished matches yet
        // Check if group has any finished matches
        const groupMatches = WORLD_CUP_2026.matches.filter(m => m.group === groupId);
        const hasFinishedMatches = groupMatches.some(m => m.status === 'finished');
        
        if (!hasFinishedMatches) {
            // No finished matches yet, safe to update standings
            WORLD_CUP_2026.groupStandings[groupId] = newStandings;
        } else {
            // Has finished matches - preserve existing standings to maintain completed game results
            // Only update if new data shows more games played (new matches finished)
            const currentMaxPlayed = Math.max(...currentStandings.map(t => t.played || 0));
            const newMaxPlayed = Math.max(...newStandings.map(t => t.played || 0));
            
            if (newMaxPlayed > currentMaxPlayed) {
                WORLD_CUP_2026.groupStandings[groupId] = newStandings;
            }
            // Otherwise keep current standings to preserve completed match results
        }
    });

    return true;
}

function updateTopScorers(scorers) {
    WORLD_CUP_2026.topScorers = scorers;
    return true;
}

function updateTopAssists(assists) {
    WORLD_CUP_2026.topAssists = assists;
    return true;
}

function getLiveMatches() {
    return WORLD_CUP_2026.matches.filter(m => m.status === 'live');
}

function getUpcomingMatches(limit = 5) {
    const now = new Date();
    return WORLD_CUP_2026.matches
        .filter(m => m.status === 'scheduled' && new Date(m.date) > now)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, limit);
}

function getRecentResults(limit = 5) {
    return WORLD_CUP_2026.matches
        .filter(m => m.status === 'finished')
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, limit);
}


console.log('✅ Data module loaded - Copa 2026 data ready');

// Made with Bob
