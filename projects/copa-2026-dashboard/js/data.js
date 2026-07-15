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

    // Group standings (updated: 14/07/2026 - Fase de grupos completa - dados reais via Football-Data.org API)
    groupStandings: {
        "A": [
            { team: "MEX", played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 6, goalsAgainst: 0, goalDifference: 6, points: 9 },
            { team: "RSA", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 3, goalDifference: -1, points: 4 },
            { team: "KOR", played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 2, goalsAgainst: 3, goalDifference: -1, points: 3 },
            { team: "CZE", played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 6, goalDifference: -4, points: 1 }
        ],
        "B": [
            { team: "SUI", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 7, goalsAgainst: 3, goalDifference: 4, points: 7 },
            { team: "CAN", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 8, goalsAgainst: 3, goalDifference: 5, points: 4 },
            { team: "BIH", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 5, goalsAgainst: 6, goalDifference: -1, points: 4 },
            { team: "QAT", played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 2, goalsAgainst: 10, goalDifference: -8, points: 1 }
        ],
        "C": [
            { team: "BRA", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 7, goalsAgainst: 1, goalDifference: 6, points: 7 },
            { team: "MAR", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 6, goalsAgainst: 3, goalDifference: 3, points: 7 },
            { team: "SCO", played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 4, goalDifference: -3, points: 3 },
            { team: "HAI", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 2, goalsAgainst: 8, goalDifference: -6, points: 0 }
        ],
        "D": [
            { team: "USA", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 8, goalsAgainst: 4, goalDifference: 4, points: 6 },
            { team: "AUS", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 4 },
            { team: "PAR", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 4, goalDifference: -2, points: 4 },
            { team: "TUR", played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 3, goalsAgainst: 5, goalDifference: -2, points: 3 }
        ],
        "E": [
            { team: "GER", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 10, goalsAgainst: 4, goalDifference: 6, points: 6 },
            { team: "CIV", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 4, goalsAgainst: 2, goalDifference: 2, points: 6 },
            { team: "ECU", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 4 },
            { team: "CUW", played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 1, goalsAgainst: 9, goalDifference: -8, points: 1 }
        ],
        "F": [
            { team: "NED", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 10, goalsAgainst: 4, goalDifference: 6, points: 7 },
            { team: "JPN", played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 7, goalsAgainst: 3, goalDifference: 4, points: 5 },
            { team: "SWE", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 7, goalsAgainst: 7, goalDifference: 0, points: 4 },
            { team: "TUN", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 2, goalsAgainst: 12, goalDifference: -10, points: 0 }
        ],
        "G": [
            { team: "BEL", played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 6, goalsAgainst: 2, goalDifference: 4, points: 5 },
            { team: "EGY", played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 5, goalsAgainst: 3, goalDifference: 2, points: 5 },
            { team: "IRN", played: 3, won: 0, drawn: 3, lost: 0, goalsFor: 3, goalsAgainst: 3, goalDifference: 0, points: 3 },
            { team: "NZL", played: 3, won: 0, drawn: 1, lost: 2, goalsFor: 4, goalsAgainst: 10, goalDifference: -6, points: 1 }
        ],
        "H": [
            { team: "ESP", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 5, goalsAgainst: 0, goalDifference: 5, points: 7 },
            { team: "CPV", played: 3, won: 0, drawn: 3, lost: 0, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 3 },
            { team: "URU", played: 3, won: 0, drawn: 2, lost: 1, goalsFor: 3, goalsAgainst: 4, goalDifference: -1, points: 2 },
            { team: "KSA", played: 3, won: 0, drawn: 2, lost: 1, goalsFor: 1, goalsAgainst: 5, goalDifference: -4, points: 2 }
        ],
        "I": [
            { team: "FRA", played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 10, goalsAgainst: 2, goalDifference: 8, points: 9 },
            { team: "NOR", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 8, goalsAgainst: 7, goalDifference: 1, points: 6 },
            { team: "SEN", played: 3, won: 1, drawn: 0, lost: 2, goalsFor: 8, goalsAgainst: 6, goalDifference: 2, points: 3 },
            { team: "IRQ", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 1, goalsAgainst: 12, goalDifference: -11, points: 0 }
        ],
        "J": [
            { team: "ARG", played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 8, goalsAgainst: 1, goalDifference: 7, points: 9 },
            { team: "AUT", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 6, goalsAgainst: 6, goalDifference: 0, points: 4 },
            { team: "ALG", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 5, goalsAgainst: 7, goalDifference: -2, points: 4 },
            { team: "JOR", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 3, goalsAgainst: 8, goalDifference: -5, points: 0 }
        ],
        "K": [
            { team: "COL", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 4, goalsAgainst: 1, goalDifference: 3, points: 7 },
            { team: "POR", played: 3, won: 1, drawn: 2, lost: 0, goalsFor: 6, goalsAgainst: 1, goalDifference: 5, points: 5 },
            { team: "COD", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 4, goalsAgainst: 3, goalDifference: 1, points: 4 },
            { team: "UZB", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 2, goalsAgainst: 11, goalDifference: -9, points: 0 }
        ],
        "L": [
            { team: "ENG", played: 3, won: 2, drawn: 1, lost: 0, goalsFor: 6, goalsAgainst: 2, goalDifference: 4, points: 7 },
            { team: "CRO", played: 3, won: 2, drawn: 0, lost: 1, goalsFor: 5, goalsAgainst: 5, goalDifference: 0, points: 6 },
            { team: "GHA", played: 3, won: 1, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 4 },
            { team: "PAN", played: 3, won: 0, drawn: 0, lost: 3, goalsFor: 0, goalsAgainst: 4, goalDifference: -4, points: 0 }
        ]
    },

    // Matches (updated: 14/07/2026 - dados reais via Football-Data.org API - 100 finalizados, 4 agendados)
    // All times shown in UTC-3 (Brasília timezone)
    matches: [
        { id: 1, date: "2026-06-11T16:00:00-03:00", group: "A", homeTeam: "MEX", awayTeam: "RSA", homeScore: 2, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 2, date: "2026-06-11T23:00:00-03:00", group: "A", homeTeam: "KOR", awayTeam: "CZE", homeScore: 2, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 3, date: "2026-06-12T16:00:00-03:00", group: "B", homeTeam: "CAN", awayTeam: "BIH", homeScore: 1, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 4, date: "2026-06-12T22:00:00-03:00", group: "D", homeTeam: "USA", awayTeam: "PAR", homeScore: 4, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 5, date: "2026-06-13T16:00:00-03:00", group: "B", homeTeam: "QAT", awayTeam: "SUI", homeScore: 1, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 6, date: "2026-06-13T19:00:00-03:00", group: "C", homeTeam: "BRA", awayTeam: "MAR", homeScore: 1, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 7, date: "2026-06-13T22:00:00-03:00", group: "C", homeTeam: "HAI", awayTeam: "SCO", homeScore: 0, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 8, date: "2026-06-14T01:00:00-03:00", group: "D", homeTeam: "AUS", awayTeam: "TUR", homeScore: 2, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 9, date: "2026-06-14T14:00:00-03:00", group: "E", homeTeam: "GER", awayTeam: "CUW", homeScore: 7, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 10, date: "2026-06-14T17:00:00-03:00", group: "F", homeTeam: "NED", awayTeam: "JPN", homeScore: 2, awayScore: 2, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 11, date: "2026-06-14T20:00:00-03:00", group: "E", homeTeam: "CIV", awayTeam: "ECU", homeScore: 1, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 12, date: "2026-06-14T23:00:00-03:00", group: "F", homeTeam: "SWE", awayTeam: "TUN", homeScore: 5, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 13, date: "2026-06-15T13:00:00-03:00", group: "H", homeTeam: "ESP", awayTeam: "CPV", homeScore: 0, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 14, date: "2026-06-15T16:00:00-03:00", group: "G", homeTeam: "BEL", awayTeam: "EGY", homeScore: 1, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 15, date: "2026-06-15T19:00:00-03:00", group: "H", homeTeam: "KSA", awayTeam: "URU", homeScore: 1, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 16, date: "2026-06-15T22:00:00-03:00", group: "G", homeTeam: "IRN", awayTeam: "NZL", homeScore: 2, awayScore: 2, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 17, date: "2026-06-16T16:00:00-03:00", group: "I", homeTeam: "FRA", awayTeam: "SEN", homeScore: 3, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 18, date: "2026-06-16T19:00:00-03:00", group: "I", homeTeam: "IRQ", awayTeam: "NOR", homeScore: 1, awayScore: 4, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 19, date: "2026-06-16T22:00:00-03:00", group: "J", homeTeam: "ARG", awayTeam: "ALG", homeScore: 3, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 20, date: "2026-06-17T01:00:00-03:00", group: "J", homeTeam: "AUT", awayTeam: "JOR", homeScore: 3, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 21, date: "2026-06-17T14:00:00-03:00", group: "K", homeTeam: "POR", awayTeam: "COD", homeScore: 1, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 22, date: "2026-06-17T17:00:00-03:00", group: "L", homeTeam: "ENG", awayTeam: "CRO", homeScore: 4, awayScore: 2, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 23, date: "2026-06-17T20:00:00-03:00", group: "L", homeTeam: "GHA", awayTeam: "PAN", homeScore: 1, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 24, date: "2026-06-17T23:00:00-03:00", group: "K", homeTeam: "UZB", awayTeam: "COL", homeScore: 1, awayScore: 3, stadium: "Stadium", status: "finished", phase: "group", round: 1 },
        { id: 25, date: "2026-06-18T13:00:00-03:00", group: "A", homeTeam: "CZE", awayTeam: "RSA", homeScore: 1, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 26, date: "2026-06-18T16:00:00-03:00", group: "B", homeTeam: "SUI", awayTeam: "BIH", homeScore: 4, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 27, date: "2026-06-18T19:00:00-03:00", group: "B", homeTeam: "CAN", awayTeam: "QAT", homeScore: 6, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 28, date: "2026-06-18T22:00:00-03:00", group: "A", homeTeam: "MEX", awayTeam: "KOR", homeScore: 1, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 29, date: "2026-06-19T16:00:00-03:00", group: "D", homeTeam: "USA", awayTeam: "AUS", homeScore: 2, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 30, date: "2026-06-19T19:00:00-03:00", group: "C", homeTeam: "SCO", awayTeam: "MAR", homeScore: 0, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 31, date: "2026-06-19T21:30:00-03:00", group: "C", homeTeam: "BRA", awayTeam: "HAI", homeScore: 3, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 32, date: "2026-06-20T00:00:00-03:00", group: "D", homeTeam: "TUR", awayTeam: "PAR", homeScore: 0, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 33, date: "2026-06-20T14:00:00-03:00", group: "F", homeTeam: "NED", awayTeam: "SWE", homeScore: 5, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 34, date: "2026-06-20T17:00:00-03:00", group: "E", homeTeam: "GER", awayTeam: "CIV", homeScore: 2, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 35, date: "2026-06-20T21:00:00-03:00", group: "E", homeTeam: "ECU", awayTeam: "CUW", homeScore: 0, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 36, date: "2026-06-21T01:00:00-03:00", group: "F", homeTeam: "TUN", awayTeam: "JPN", homeScore: 0, awayScore: 4, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 37, date: "2026-06-21T13:00:00-03:00", group: "H", homeTeam: "ESP", awayTeam: "KSA", homeScore: 4, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 38, date: "2026-06-21T16:00:00-03:00", group: "G", homeTeam: "BEL", awayTeam: "IRN", homeScore: 0, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 39, date: "2026-06-21T19:00:00-03:00", group: "H", homeTeam: "URU", awayTeam: "CPV", homeScore: 2, awayScore: 2, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 40, date: "2026-06-21T22:00:00-03:00", group: "G", homeTeam: "NZL", awayTeam: "EGY", homeScore: 1, awayScore: 3, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 41, date: "2026-06-22T14:00:00-03:00", group: "J", homeTeam: "ARG", awayTeam: "AUT", homeScore: 2, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 42, date: "2026-06-22T18:00:00-03:00", group: "I", homeTeam: "FRA", awayTeam: "IRQ", homeScore: 3, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 43, date: "2026-06-22T21:00:00-03:00", group: "I", homeTeam: "NOR", awayTeam: "SEN", homeScore: 3, awayScore: 2, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 44, date: "2026-06-23T00:00:00-03:00", group: "J", homeTeam: "JOR", awayTeam: "ALG", homeScore: 1, awayScore: 2, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 45, date: "2026-06-23T14:00:00-03:00", group: "K", homeTeam: "POR", awayTeam: "UZB", homeScore: 5, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 46, date: "2026-06-23T17:00:00-03:00", group: "L", homeTeam: "ENG", awayTeam: "GHA", homeScore: 0, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 47, date: "2026-06-23T20:00:00-03:00", group: "L", homeTeam: "PAN", awayTeam: "CRO", homeScore: 0, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 48, date: "2026-06-23T23:00:00-03:00", group: "K", homeTeam: "COL", awayTeam: "COD", homeScore: 1, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 49, date: "2026-06-24T16:00:00-03:00", group: "B", homeTeam: "SUI", awayTeam: "CAN", homeScore: 2, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 50, date: "2026-06-24T16:00:00-03:00", group: "B", homeTeam: "BIH", awayTeam: "QAT", homeScore: 3, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 51, date: "2026-06-24T19:00:00-03:00", group: "C", homeTeam: "MAR", awayTeam: "HAI", homeScore: 4, awayScore: 2, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 52, date: "2026-06-24T19:00:00-03:00", group: "C", homeTeam: "SCO", awayTeam: "BRA", homeScore: 0, awayScore: 3, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 53, date: "2026-06-24T22:00:00-03:00", group: "A", homeTeam: "CZE", awayTeam: "MEX", homeScore: 0, awayScore: 3, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 54, date: "2026-06-24T22:00:00-03:00", group: "A", homeTeam: "RSA", awayTeam: "KOR", homeScore: 1, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 55, date: "2026-06-25T17:00:00-03:00", group: "E", homeTeam: "ECU", awayTeam: "GER", homeScore: 2, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 56, date: "2026-06-25T17:00:00-03:00", group: "E", homeTeam: "CUW", awayTeam: "CIV", homeScore: 0, awayScore: 2, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 57, date: "2026-06-25T20:00:00-03:00", group: "F", homeTeam: "TUN", awayTeam: "NED", homeScore: 1, awayScore: 3, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 58, date: "2026-06-25T20:00:00-03:00", group: "F", homeTeam: "JPN", awayTeam: "SWE", homeScore: 1, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 59, date: "2026-06-25T23:00:00-03:00", group: "D", homeTeam: "TUR", awayTeam: "USA", homeScore: 3, awayScore: 2, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 60, date: "2026-06-25T23:00:00-03:00", group: "D", homeTeam: "PAR", awayTeam: "AUS", homeScore: 0, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 61, date: "2026-06-26T16:00:00-03:00", group: "I", homeTeam: "NOR", awayTeam: "FRA", homeScore: 1, awayScore: 4, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 62, date: "2026-06-26T16:00:00-03:00", group: "I", homeTeam: "SEN", awayTeam: "IRQ", homeScore: 5, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 63, date: "2026-06-26T21:00:00-03:00", group: "H", homeTeam: "URU", awayTeam: "ESP", homeScore: 0, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 64, date: "2026-06-26T21:00:00-03:00", group: "H", homeTeam: "CPV", awayTeam: "KSA", homeScore: 0, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 65, date: "2026-06-27T00:00:00-03:00", group: "G", homeTeam: "NZL", awayTeam: "BEL", homeScore: 1, awayScore: 5, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 66, date: "2026-06-27T00:00:00-03:00", group: "G", homeTeam: "EGY", awayTeam: "IRN", homeScore: 1, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 67, date: "2026-06-27T18:00:00-03:00", group: "L", homeTeam: "PAN", awayTeam: "ENG", homeScore: 0, awayScore: 2, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 68, date: "2026-06-27T18:00:00-03:00", group: "L", homeTeam: "CRO", awayTeam: "GHA", homeScore: 2, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 69, date: "2026-06-27T20:30:00-03:00", group: "K", homeTeam: "COL", awayTeam: "POR", homeScore: 0, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 70, date: "2026-06-27T20:30:00-03:00", group: "K", homeTeam: "COD", awayTeam: "UZB", homeScore: 3, awayScore: 1, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 71, date: "2026-06-27T23:00:00-03:00", group: "J", homeTeam: "JOR", awayTeam: "ARG", homeScore: 1, awayScore: 3, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 72, date: "2026-06-27T23:00:00-03:00", group: "J", homeTeam: "ALG", awayTeam: "AUT", homeScore: 3, awayScore: 3, stadium: "Stadium", status: "finished", phase: "group", round: 3 },
        { id: 73, date: "2026-06-28T16:00:00-03:00", group: null, homeTeam: "RSA", awayTeam: "CAN", homeScore: 0, awayScore: 1, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 74, date: "2026-06-29T14:00:00-03:00", group: null, homeTeam: "BRA", awayTeam: "JPN", homeScore: 2, awayScore: 1, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 75, date: "2026-06-29T17:30:00-03:00", group: null, homeTeam: "GER", awayTeam: "PAR", homeScore: 4, awayScore: 5, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 76, date: "2026-06-29T22:00:00-03:00", group: null, homeTeam: "NED", awayTeam: "MAR", homeScore: 3, awayScore: 4, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 77, date: "2026-06-30T14:00:00-03:00", group: null, homeTeam: "CIV", awayTeam: "NOR", homeScore: 1, awayScore: 2, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 78, date: "2026-06-30T18:00:00-03:00", group: null, homeTeam: "FRA", awayTeam: "SWE", homeScore: 3, awayScore: 0, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 79, date: "2026-06-30T23:00:00-03:00", group: null, homeTeam: "MEX", awayTeam: "ECU", homeScore: 2, awayScore: 0, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 80, date: "2026-07-01T13:00:00-03:00", group: null, homeTeam: "ENG", awayTeam: "COD", homeScore: 2, awayScore: 1, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 81, date: "2026-07-01T17:00:00-03:00", group: null, homeTeam: "BEL", awayTeam: "SEN", homeScore: 3, awayScore: 2, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 82, date: "2026-07-01T21:00:00-03:00", group: null, homeTeam: "USA", awayTeam: "BIH", homeScore: 2, awayScore: 0, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 83, date: "2026-07-02T16:00:00-03:00", group: null, homeTeam: "ESP", awayTeam: "AUT", homeScore: 3, awayScore: 0, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 84, date: "2026-07-02T20:00:00-03:00", group: null, homeTeam: "POR", awayTeam: "CRO", homeScore: 2, awayScore: 1, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 85, date: "2026-07-03T00:00:00-03:00", group: null, homeTeam: "SUI", awayTeam: "ALG", homeScore: 2, awayScore: 0, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 86, date: "2026-07-03T15:00:00-03:00", group: null, homeTeam: "AUS", awayTeam: "EGY", homeScore: 3, awayScore: 5, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 87, date: "2026-07-03T19:00:00-03:00", group: null, homeTeam: "ARG", awayTeam: "CPV", homeScore: 3, awayScore: 2, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 88, date: "2026-07-03T22:30:00-03:00", group: null, homeTeam: "COL", awayTeam: "GHA", homeScore: 1, awayScore: 0, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 89, date: "2026-07-04T14:00:00-03:00", group: null, homeTeam: "CAN", awayTeam: "MAR", homeScore: 0, awayScore: 3, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 90, date: "2026-07-04T18:00:00-03:00", group: null, homeTeam: "PAR", awayTeam: "FRA", homeScore: 0, awayScore: 1, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 91, date: "2026-07-05T17:00:00-03:00", group: null, homeTeam: "BRA", awayTeam: "NOR", homeScore: 1, awayScore: 2, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 92, date: "2026-07-05T22:00:00-03:00", group: null, homeTeam: "MEX", awayTeam: "ENG", homeScore: 2, awayScore: 3, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 93, date: "2026-07-06T16:00:00-03:00", group: null, homeTeam: "POR", awayTeam: "ESP", homeScore: 0, awayScore: 1, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 94, date: "2026-07-06T21:00:00-03:00", group: null, homeTeam: "USA", awayTeam: "BEL", homeScore: 1, awayScore: 4, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 95, date: "2026-07-07T13:00:00-03:00", group: null, homeTeam: "ARG", awayTeam: "EGY", homeScore: 3, awayScore: 2, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 96, date: "2026-07-07T17:00:00-03:00", group: null, homeTeam: "SUI", awayTeam: "COL", homeScore: 4, awayScore: 3, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 97, date: "2026-07-09T17:00:00-03:00", group: null, homeTeam: "FRA", awayTeam: "MAR", homeScore: 2, awayScore: 0, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 98, date: "2026-07-10T16:00:00-03:00", group: null, homeTeam: "ESP", awayTeam: "BEL", homeScore: 2, awayScore: 1, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 99, date: "2026-07-11T18:00:00-03:00", group: null, homeTeam: "NOR", awayTeam: "ENG", homeScore: 1, awayScore: 2, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 100, date: "2026-07-11T22:00:00-03:00", group: null, homeTeam: "ARG", awayTeam: "SUI", homeScore: 3, awayScore: 1, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 101, date: "2026-07-14T16:00:00-03:00", group: null, homeTeam: "FRA", awayTeam: "ESP", homeScore: 0, awayScore: 2, stadium: "Stadium", status: "finished", phase: "knockout", round: null },
        { id: 102, date: "2026-07-15T16:00:00-03:00", group: null, homeTeam: "ENG", awayTeam: "ARG", homeScore: null, awayScore: null, stadium: "Stadium", status: "scheduled", phase: "knockout", round: null },
        { id: 103, date: "2026-07-18T18:00:00-03:00", group: null, homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, stadium: "Stadium", status: "scheduled", phase: "knockout", round: null },
        { id: 104, date: "2026-07-19T16:00:00-03:00", group: null, homeTeam: null, awayTeam: null, homeScore: null, awayScore: null, stadium: "Stadium", status: "scheduled", phase: "knockout", round: null }
    ],

    // Artilheiros e assistências: endpoint não disponível no plano gratuito da football-data.org
    topScorers: [],
    topAssists: []
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
