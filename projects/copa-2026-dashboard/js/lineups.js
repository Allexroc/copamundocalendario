// FIFA World Cup 2026 - Team Lineups Data
// Starting XI for each team with formations and player details

const TEAM_LINEUPS = {
    // GROUP A
    "MEX": {
        formation: "4-3-3",
        coach: "Javier Aguirre",
        startingXI: [
            { number: 1, name: "Guillermo Ochoa", position: "GK" },
            { number: 3, name: "César Montes", position: "CB" },
            { number: 15, name: "Héctor Moreno", position: "CB" },
            { number: 23, name: "Jesús Gallardo", position: "LB" },
            { number: 2, name: "Jorge Sánchez", position: "RB" },
            { number: 4, name: "Edson Álvarez", position: "CDM" },
            { number: 18, name: "Andrés Guardado", position: "CM" },
            { number: 16, name: "Héctor Herrera", position: "CM" },
            { number: 22, name: "Hirving Lozano", position: "RW" },
            { number: 9, name: "Raúl Jiménez", position: "ST" },
            { number: 11, name: "Alexis Vega", position: "LW" }
        ]
    },
    "RSA": {
        formation: "4-2-3-1",
        coach: "Hugo Broos",
        startingXI: [
            { number: 16, name: "Ronwen Williams", position: "GK" },
            { number: 20, name: "Khuliso Mudau", position: "RB" },
            { number: 14, name: "Mothobi Mvala", position: "CB" },
            { number: 18, name: "Siyanda Xulu", position: "CB" },
            { number: 6, name: "Terrence Mashego", position: "LB" },
            { number: 13, name: "Teboho Mokoena", position: "CDM" },
            { number: 4, name: "Sphephelo Sithole", position: "CDM" },
            { number: 11, name: "Themba Zwane", position: "CAM" },
            { number: 17, name: "Evidence Makgopa", position: "RW" },
            { number: 10, name: "Percy Tau", position: "LW" },
            { number: 9, name: "Lyle Foster", position: "ST" }
        ]
    },
    "KOR": {
        formation: "4-2-3-1",
        coach: "Jürgen Klinsmann",
        startingXI: [
            { number: 21, name: "Kim Seung-gyu", position: "GK" },
            { number: 2, name: "Kim Moon-hwan", position: "RB" },
            { number: 19, name: "Kim Young-gwon", position: "CB" },
            { number: 4, name: "Kim Min-jae", position: "CB" },
            { number: 3, name: "Kim Jin-su", position: "LB" },
            { number: 5, name: "Jung Woo-young", position: "CDM" },
            { number: 6, name: "Hwang In-beom", position: "CDM" },
            { number: 18, name: "Lee Kang-in", position: "CAM" },
            { number: 16, name: "Hwang Hee-chan", position: "RW" },
            { number: 11, name: "Hwang Ui-jo", position: "LW" },
            { number: 7, name: "Son Heung-min", position: "ST" }
        ]
    },
    "CZE": {
        formation: "4-2-3-1",
        coach: "Ivan Hašek",
        startingXI: [
            { number: 1, name: "Jindřích Staněk", position: "GK" },
            { number: 5, name: "Vladimír Coufal", position: "RB" },
            { number: 6, name: "Tomáš Holeš", position: "CB" },
            { number: 3, name: "Ladislav Krejčí", position: "CB" },
            { number: 18, name: "Jan Bořil", position: "LB" },
            { number: 22, name: "Tomáš Souček", position: "CDM" },
            { number: 15, name: "Michal Sadílek", position: "CDM" },
            { number: 19, name: "Lukáš Provod", position: "CAM" },
            { number: 14, name: "Václav Černý", position: "RW" },
            { number: 11, name: "Mojmír Chytil", position: "LW" },
            { number: 10, name: "Patrik Schick", position: "ST" }
        ]
    },

    // GROUP B
    "CAN": {
        formation: "3-4-3",
        coach: "Jesse Marsch",
        startingXI: [
            { number: 18, name: "Maxime Crépeau", position: "GK" },
            { number: 4, name: "Kamal Miller", position: "CB" },
            { number: 5, name: "Steven Vitória", position: "CB" },
            { number: 15, name: "Derek Cornelius", position: "CB" },
            { number: 19, name: "Alphonso Davies", position: "LWB" },
            { number: 2, name: "Alistair Johnston", position: "RWB" },
            { number: 7, name: "Stephen Eustáquio", position: "CM" },
            { number: 13, name: "Atiba Hutchinson", position: "CM" },
            { number: 10, name: "Jonathan David", position: "ST" },
            { number: 9, name: "Cyle Larin", position: "ST" },
            { number: 17, name: "Tajon Buchanan", position: "RW" }
        ]
    },
    "BIH": {
        formation: "4-4-2",
        coach: "Sergej Barbarez",
        startingXI: [
            { number: 12, name: "Ibrahim Šehić", position: "GK" },
            { number: 15, name: "Siniša Saničanin", position: "RB" },
            { number: 6, name: "Dennis Hadžikadunić", position: "CB" },
            { number: 4, name: "Anel Ahmedhodžić", position: "CB" },
            { number: 3, name: "Eldar Ćivić", position: "LB" },
            { number: 10, name: "Miralem Pjanić", position: "CM" },
            { number: 13, name: "Gojko Cimirot", position: "CM" },
            { number: 7, name: "Amir Hadžiahmetović", position: "RM" },
            { number: 20, name: "Rade Krunić", position: "LM" },
            { number: 11, name: "Edin Džeko", position: "ST" },
            { number: 9, name: "Ermedin Demirović", position: "ST" }
        ]
    },
    "QAT": {
        formation: "5-3-2",
        coach: "Carlos Queiroz",
        startingXI: [
            { number: 1, name: "Meshaal Barsham", position: "GK" },
            { number: 2, name: "Pedro Miguel", position: "RWB" },
            { number: 16, name: "Boualem Khoukhi", position: "CB" },
            { number: 3, name: "Tarek Salman", position: "CB" },
            { number: 5, name: "Lucas Mendes", position: "CB" },
            { number: 14, name: "Homam Ahmed", position: "LWB" },
            { number: 12, name: "Karim Boudiaf", position: "CM" },
            { number: 6, name: "Abdulaziz Hatem", position: "CM" },
            { number: 20, name: "Mohammed Waad", position: "CM" },
            { number: 11, name: "Akram Afif", position: "ST" },
            { number: 19, name: "Almoez Ali", position: "ST" }
        ]
    },
    "SUI": {
        formation: "3-4-2-1",
        coach: "Murat Yakin",
        startingXI: [
            { number: 1, name: "Yann Sommer", position: "GK" },
            { number: 22, name: "Fabian Schär", position: "CB" },
            { number: 5, name: "Manuel Akanji", position: "CB" },
            { number: 13, name: "Ricardo Rodríguez", position: "CB" },
            { number: 3, name: "Silvan Widmer", position: "RWB" },
            { number: 10, name: "Granit Xhaka", position: "CM" },
            { number: 8, name: "Remo Freuler", position: "CM" },
            { number: 20, name: "Michel Aebischer", position: "LWB" },
            { number: 23, name: "Xherdan Shaqiri", position: "CAM" },
            { number: 15, name: "Djibril Sow", position: "CAM" },
            { number: 7, name: "Breel Embolo", position: "ST" }
        ]
    },

    // GROUP C
    "BRA": {
        formation: "4-3-3",
        coach: "Dorival Júnior",
        startingXI: [
            { number: 1, name: "Alisson", position: "GK" },
            { number: 2, name: "Danilo", position: "RB" },
            { number: 3, name: "Marquinhos", position: "CB" },
            { number: 4, name: "Gabriel Magalhães", position: "CB" },
            { number: 6, name: "Alex Sandro", position: "LB" },
            { number: 5, name: "Casemiro", position: "CDM" },
            { number: 8, name: "Bruno Guimarães", position: "CM" },
            { number: 7, name: "Lucas Paquetá", position: "CM" },
            { number: 11, name: "Raphinha", position: "RW" },
            { number: 9, name: "Richarlison", position: "ST" },
            { number: 10, name: "Vinícius Júnior", position: "LW" }
        ]
    },
    "MAR": {
        formation: "4-3-3",
        coach: "Walid Regragui",
        startingXI: [
            { number: 1, name: "Yassine Bounou", position: "GK" },
            { number: 2, name: "Achraf Hakimi", position: "RB" },
            { number: 5, name: "Nayef Aguerd", position: "CB" },
            { number: 6, name: "Romain Saïss", position: "CB" },
            { number: 25, name: "Yahia Attiyat Allah", position: "LB" },
            { number: 4, name: "Sofyan Amrabat", position: "CDM" },
            { number: 8, name: "Azzedine Ounahi", position: "CM" },
            { number: 15, name: "Selim Amallah", position: "CM" },
            { number: 7, name: "Hakim Ziyech", position: "RW" },
            { number: 19, name: "Youssef En-Nesyri", position: "ST" },
            { number: 17, name: "Sofiane Boufal", position: "LW" }
        ]
    },
    "HAI": {
        formation: "4-4-2",
        coach: "Gabriel Calderón Pellegrino",
        startingXI: [
            { number: 1, name: "Jhony Placide", position: "GK" },
            { number: 4, name: "Ricardo Adé", position: "RB" },
            { number: 5, name: "Carlens Arcus", position: "CB" },
            { number: 15, name: "Alex Christian", position: "CB" },
            { number: 3, name: "Jeppe Friborg", position: "LB" },
            { number: 6, name: "Stéphane Lambèse", position: "CM" },
            { number: 8, name: "Louicius Deedson", position: "CM" },
            { number: 10, name: "Duckens Nazon", position: "RM" },
            { number: 7, name: "Frantzdy Pierrot", position: "LM" },
            { number: 11, name: "Djimy Alexis", position: "ST" },
            { number: 9, name: "Don Louicius", position: "ST" }
        ]
    },
    "SCO": {
        formation: "3-5-2",
        coach: "Steve Clarke",
        startingXI: [
            { number: 1, name: "Angus Gunn", position: "GK" },
            { number: 5, name: "Grant Hanley", position: "CB" },
            { number: 13, name: "Scott McKenna", position: "CB" },
            { number: 6, name: "Kieran Tierney", position: "CB" },
            { number: 2, name: "Aaron Hickey", position: "RWB" },
            { number: 4, name: "Scott McTominay", position: "CM" },
            { number: 8, name: "Callum McGregor", position: "CM" },
            { number: 7, name: "John McGinn", position: "CM" },
            { number: 3, name: "Andrew Robertson", position: "LWB" },
            { number: 10, name: "Che Adams", position: "ST" },
            { number: 9, name: "Lyndon Dykes", position: "ST" }
        ]
    },

    // Add more teams with similar structure...
    // For brevity, I'll add a few more key teams

    // GROUP D
    "USA": {
        formation: "4-3-3",
        coach: "Gregg Berhalter",
        startingXI: [
            { number: 1, name: "Matt Turner", position: "GK" },
            { number: 2, name: "Sergiño Dest", position: "RB" },
            { number: 13, name: "Tim Ream", position: "CB" },
            { number: 3, name: "Walker Zimmerman", position: "CB" },
            { number: 5, name: "Antonee Robinson", position: "LB" },
            { number: 4, name: "Tyler Adams", position: "CDM" },
            { number: 8, name: "Weston McKennie", position: "CM" },
            { number: 6, name: "Yunus Musah", position: "CM" },
            { number: 21, name: "Timothy Weah", position: "RW" },
            { number: 9, name: "Folarin Balogun", position: "ST" },
            { number: 10, name: "Christian Pulisic", position: "LW" }
        ]
    },
    "PAR": {
        formation: "4-4-2",
        coach: "Daniel Garnero",
        startingXI: [
            { number: 1, name: "Carlos Coronel", position: "GK" },
            { number: 4, name: "Robert Rojas", position: "RB" },
            { number: 15, name: "Gustavo Gómez", position: "CB" },
            { number: 3, name: "Fabián Balbuena", position: "CB" },
            { number: 6, name: "Junior Alonso", position: "LB" },
            { number: 23, name: "Mathías Villasanti", position: "CM" },
            { number: 16, name: "Andrés Cubas", position: "CM" },
            { number: 8, name: "Richard Sánchez", position: "RM" },
            { number: 10, name: "Miguel Almirón", position: "LM" },
            { number: 9, name: "Antonio Sanabria", position: "ST" },
            { number: 11, name: "Julio Enciso", position: "ST" }
        ]
    },
    "AUS": {
        formation: "4-2-3-1",
        coach: "Graham Arnold",
        startingXI: [
            { number: 1, name: "Mathew Ryan", position: "GK" },
            { number: 19, name: "Nathaniel Atkinson", position: "RB" },
            { number: 4, name: "Kye Rowles", position: "CB" },
            { number: 20, name: "Harry Souttar", position: "CB" },
            { number: 16, name: "Aziz Behich", position: "LB" },
            { number: 22, name: "Jackson Irvine", position: "CDM" },
            { number: 13, name: "Aaron Mooy", position: "CDM" },
            { number: 23, name: "Connor Metcalfe", position: "CAM" },
            { number: 10, name: "Ajdin Hrustic", position: "RW" },
            { number: 15, name: "Mitchell Duke", position: "LW" },
            { number: 9, name: "Adam Taggart", position: "ST" }
        ]
    },
    "TUR": {
        formation: "4-2-3-1",
        coach: "Vincenzo Montella",
        startingXI: [
            { number: 1, name: "Uğurcan Çakır", position: "GK" },
            { number: 18, name: "Zeki Çelik", position: "RB" },
            { number: 4, name: "Çağlar Söyüncü", position: "CB" },
            { number: 3, name: "Merih Demiral", position: "CB" },
            { number: 20, name: "Ferdi Kadıoğlu", position: "LB" },
            { number: 5, name: "Okay Yokuşlu", position: "CDM" },
            { number: 15, name: "Orkun Kökçü", position: "CDM" },
            { number: 10, name: "Hakan Çalhanoğlu", position: "CAM" },
            { number: 7, name: "Kerem Aktürkoğlu", position: "RW" },
            { number: 17, name: "İrfan Can Kahveci", position: "LW" },
            { number: 9, name: "Cenk Tosun", position: "ST" }
        ]
    },

    // GROUP E
    "GER": {
        formation: "4-2-3-1",
        coach: "Julian Nagelsmann",
        startingXI: [
            { number: 1, name: "Manuel Neuer", position: "GK" },
            { number: 6, name: "Joshua Kimmich", position: "RB" },
            { number: 2, name: "Antonio Rüdiger", position: "CB" },
            { number: 4, name: "Jonathan Tah", position: "CB" },
            { number: 3, name: "David Raum", position: "LB" },
            { number: 8, name: "Toni Kroos", position: "CDM" },
            { number: 21, name: "İlkay Gündoğan", position: "CDM" },
            { number: 10, name: "Jamal Musiala", position: "CAM" },
            { number: 19, name: "Leroy Sané", position: "RW" },
            { number: 7, name: "Kai Havertz", position: "LW" },
            { number: 9, name: "Niclas Füllkrug", position: "ST" }
        ]
    },

    // GROUP J
    "ARG": {
        formation: "4-3-3",
        coach: "Lionel Scaloni",
        startingXI: [
            { number: 23, name: "Emiliano Martínez", position: "GK" },
            { number: 26, name: "Nahuel Molina", position: "RB" },
            { number: 13, name: "Cristian Romero", position: "CB" },
            { number: 19, name: "Nicolás Otamendi", position: "CB" },
            { number: 3, name: "Nicolás Tagliafico", position: "LB" },
            { number: 7, name: "Rodrigo De Paul", position: "CM" },
            { number: 20, name: "Alexis Mac Allister", position: "CM" },
            { number: 24, name: "Enzo Fernández", position: "CM" },
            { number: 11, name: "Ángel Di María", position: "RW" },
            { number: 9, name: "Julián Álvarez", position: "ST" },
            { number: 10, name: "Lionel Messi", position: "LW" }
        ]
    },

    // GROUP I
    "FRA": {
        formation: "4-3-3",
        coach: "Didier Deschamps",
        startingXI: [
            { number: 1, name: "Hugo Lloris", position: "GK" },
            { number: 5, name: "Jules Koundé", position: "RB" },
            { number: 4, name: "Raphaël Varane", position: "CB" },
            { number: 17, name: "William Saliba", position: "CB" },
            { number: 22, name: "Theo Hernández", position: "LB" },
            { number: 8, name: "Aurélien Tchouaméni", position: "CDM" },
            { number: 13, name: "Eduardo Camavinga", position: "CM" },
            { number: 14, name: "Adrien Rabiot", position: "CM" },
            { number: 11, name: "Ousmane Dembélé", position: "RW" },
            { number: 10, name: "Kylian Mbappé", position: "ST" },
            { number: 7, name: "Antoine Griezmann", position: "LW" }
        ]
    }
};

// Function to get team lineup
function getTeamLineup(teamCode) {
    return TEAM_LINEUPS[teamCode] || null;
}

// Function to display lineup in a modal
function showLineupModal(teamCode) {
    const lineup = getTeamLineup(teamCode);
    const teamInfo = getTeamInfo(teamCode);
    
    if (!lineup || !teamInfo) {
        console.error('Lineup or team info not found for:', teamCode);
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'lineup-modal';
    modal.innerHTML = `
        <div class="lineup-modal-overlay" onclick="closeLineupModal()"></div>
        <div class="lineup-modal-content">
            <div class="lineup-modal-header">
                <div class="lineup-team-info">
                    <span class="lineup-team-flag">${teamInfo.flag}</span>
                    <h2>${teamInfo.name}</h2>
                </div>
                <button class="lineup-modal-close" onclick="closeLineupModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="lineup-modal-body">
                <div class="lineup-info">
                    <div class="lineup-info-item">
                        <i class="fas fa-user-tie"></i>
                        <span><strong>Técnico:</strong> ${lineup.coach}</span>
                    </div>
                    <div class="lineup-info-item">
                        <i class="fas fa-chess-board"></i>
                        <span><strong>Formação:</strong> ${lineup.formation}</span>
                    </div>
                </div>
                <div class="lineup-field">
                    <h3><i class="fas fa-users"></i> Escalação Titular</h3>
                    <div class="lineup-players">
                        ${lineup.startingXI.map(player => `
                            <div class="lineup-player">
                                <div class="lineup-player-number">${player.number}</div>
                                <div class="lineup-player-info">
                                    <div class="lineup-player-name">${player.name}</div>
                                    <div class="lineup-player-position">${player.position}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

function closeLineupModal() {
    const modal = document.querySelector('.lineup-modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

console.log('✅ Lineups module loaded');

// Made with Bob
