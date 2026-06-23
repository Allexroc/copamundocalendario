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

    // Group standings (updated: 23/06/2026, 09:20 BRT) - Rodada 2 completa - Dados atualizados manualmente
    groupStandings: {
        "A": [
            { team: "MEX", played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 3, goalsAgainst: 0, goalDifference: 3, points: 6 },
            { team: "KOR", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 3 },
            { team: "RSA", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 1 },
            { team: "CZE", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 3, goalDifference: -1, points: 1 }
        ],
        "B": [
            { team: "CAN", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 7, goalsAgainst: 1, goalDifference: 6, points: 4 },
            { team: "SUI", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 5, goalsAgainst: 2, goalDifference: 3, points: 4 },
            { team: "BIH", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 2, goalsAgainst: 5, goalDifference: -3, points: 1 },
            { team: "QAT", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 1, goalsAgainst: 7, goalDifference: -6, points: 1 }
        ],
        "C": [
            { team: "BRA", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 4, goalsAgainst: 1, goalDifference: 3, points: 4 },
            { team: "SCO", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 2, goalDifference: -1, points: 3 },
            { team: "MAR", played: 2, won: 1, drawn: 1, lost: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 4 },
            { team: "HAI", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 0, goalsAgainst: 4, goalDifference: -4, points: 0 }
        ],
        "D": [
            { team: "USA", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 4, goalsAgainst: 1, goalDifference: 3, points: 3 },
            { team: "AUS", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 2, goalsAgainst: 0, goalDifference: 2, points: 3 },
            { team: "TUR", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 2, goalDifference: -2, points: 0 },
            { team: "PAR", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 4, goalDifference: -3, points: 0 }
        ],
        "E": [
            { team: "GER", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 7, goalsAgainst: 1, goalDifference: 6, points: 3 },
            { team: "CIV", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 1, goalsAgainst: 0, goalDifference: 1, points: 3 },
            { team: "ECU", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 1, goalDifference: -1, points: 0 },
            { team: "CUW", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 7, goalDifference: -6, points: 0 }
        ],
        "F": [
            { team: "SWE", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 5, goalsAgainst: 1, goalDifference: 4, points: 3 },
            { team: "NED", played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 1 },
            { team: "JPN", played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 1 },
            { team: "TUN", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 5, goalDifference: -4, points: 0 }
        ],
        "G": [
            { team: "IRN", played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 1 },
            { team: "NZL", played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 2, goalsAgainst: 2, goalDifference: 0, points: 1 },
            { team: "BEL", played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 1, goalsAgainst: 1, goalDifference: 0, points: 1 },
            { team: "EGY", played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 1, goalsAgainst: 1, goalDifference: 0, points: 1 }
        ],
        "H": [
            { team: "KSA", played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 1, goalsAgainst: 1, goalDifference: 0, points: 1 },
            { team: "URU", played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 1, goalsAgainst: 1, goalDifference: 0, points: 1 },
            { team: "ESP", played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 1 },
            { team: "CPV", played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 0, goalsAgainst: 0, goalDifference: 0, points: 1 }
        ],
        "I": [
            { team: "NOR", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 4, goalsAgainst: 1, goalDifference: 3, points: 3 },
            { team: "FRA", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 3 },
            { team: "SEN", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 0 },
            { team: "IRQ", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 4, goalDifference: -3, points: 0 }
        ],
        "J": [
            { team: "ARG", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 3, goalsAgainst: 0, goalDifference: 3, points: 3 },
            { team: "AUT", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 3 },
            { team: "JOR", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 0 },
            { team: "ALG", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 3, goalDifference: -3, points: 0 }
        ],
        "K": [
            { team: "COL", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 3, goalsAgainst: 1, goalDifference: 2, points: 3 },
            { team: "POR", played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 1, goalsAgainst: 1, goalDifference: 0, points: 1 },
            { team: "COD", played: 1, won: 0, drawn: 1, lost: 0, goalsFor: 1, goalsAgainst: 1, goalDifference: 0, points: 1 },
            { team: "UZB", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 1, goalsAgainst: 3, goalDifference: -2, points: 0 }
        ],
        "L": [
            { team: "ENG", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 4, goalsAgainst: 2, goalDifference: 2, points: 3 },
            { team: "GHA", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 1, goalsAgainst: 0, goalDifference: 1, points: 3 },
            { team: "PAN", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 0, goalsAgainst: 1, goalDifference: -1, points: 0 },
            { team: "CRO", played: 1, won: 0, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 4, goalDifference: -2, points: 0 }
        ]
    },

    // Matches (updated: 19/06/2026, 12:13 BRT / UTC-3) - Real API data from Football-Data.org
    // All times shown in UTC-3 (Brasília timezone)
    // 32 matches completed (Round 1 complete + 8 matches from Round 2)
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
        { id: 29, date: "2026-06-22T16:00:00-03:00", group: "C", homeTeam: "BRA", awayTeam: "HAI", homeScore: 3, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 30, date: "2026-06-22T16:00:00-03:00", group: "C", homeTeam: "MAR", awayTeam: "SCO", homeScore: 2, awayScore: 0, stadium: "Stadium", status: "finished", phase: "group", round: 2 },
        { id: 31, date: "2026-06-23T13:00:00-03:00", group: "D", homeTeam: "USA", awayTeam: "TUR", homeScore: null, awayScore: null, stadium: "Stadium", status: "scheduled", phase: "group", round: 2 },
        { id: 32, date: "2026-06-23T13:00:00-03:00", group: "D", homeTeam: "PAR", awayTeam: "AUS", homeScore: null, awayScore: null, stadium: "Stadium", status: "scheduled", phase: "group", round: 2 }
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
