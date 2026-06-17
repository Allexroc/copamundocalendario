// FIFA World Cup 2026 - Charts and Visualizations
// Handles Chart.js visualizations

let chartInstances = {};

function createGroupChart(groupId, canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    const standings = getGroupStandings(groupId);

    const labels = standings.map(team => {
        const teamInfo = getTeamInfo(team.team);
        return teamInfo.name;
    });

    const points = standings.map(team => team.points);
    const colors = ['#4caf50', '#8bc34a', '#ff9800', '#f44336'];

    // Destroy existing chart if it exists
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Pontos',
                data: points,
                backgroundColor: colors,
                borderColor: colors.map(c => c),
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: `Grupo ${groupId} - Classificação`,
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });

    return chartInstances[canvasId];
}

function createGoalsChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    const scorers = getTopScorers(5);

    const labels = scorers.map(s => s.player);
    const goals = scorers.map(s => s.goals);

    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Gols',
                data: goals,
                backgroundColor: [
                    '#ffd700',
                    '#c0c0c0',
                    '#cd7f32',
                    '#1a237e',
                    '#0d47a1'
                ],
                borderWidth: 0
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Top 5 Artilheiros',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });

    return chartInstances[canvasId];
}

function createGoalsByGroupChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

    const goalsData = groups.map(group => {
        const standings = getGroupStandings(group);
        return standings.reduce((sum, team) => sum + team.goalsFor, 0);
    });

    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: groups.map(g => `Grupo ${g}`),
            datasets: [{
                label: 'Gols Marcados',
                data: goalsData,
                borderColor: '#1a237e',
                backgroundColor: 'rgba(26, 35, 126, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Gols por Grupo',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 2
                    }
                }
            }
        }
    });

    return chartInstances[canvasId];
}

function createMatchesStatusChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    const matches = getAllMatches();

    const finished = matches.filter(m => m.status === 'finished').length;
    const scheduled = matches.filter(m => m.status === 'scheduled').length;
    const live = matches.filter(m => m.status === 'live').length;

    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Finalizados', 'Agendados', 'Ao Vivo'],
            datasets: [{
                data: [finished, scheduled, live],
                backgroundColor: [
                    '#4caf50',
                    '#2196f3',
                    '#f44336'
                ],
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Status dos Jogos',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            }
        }
    });

    return chartInstances[canvasId];
}

function createTeamPerformanceChart(teamCode, canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    const team = getTeamInfo(teamCode);
    const matches = getMatchesByTeam(teamCode).filter(m => m.status === 'finished');

    const labels = matches.map((m, i) => `Jogo ${i + 1}`);
    const goalsFor = matches.map(m => 
        m.homeTeam === teamCode ? m.homeScore : m.awayScore
    );
    const goalsAgainst = matches.map(m => 
        m.homeTeam === teamCode ? m.awayScore : m.homeScore
    );

    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Gols Marcados',
                    data: goalsFor,
                    borderColor: '#4caf50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    borderWidth: 2,
                    fill: true
                },
                {
                    label: 'Gols Sofridos',
                    data: goalsAgainst,
                    borderColor: '#f44336',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    borderWidth: 2,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: `${(team || { flag: '🏳️', name: 'Seleção' }).flag} ${(team || { flag: '🏳️', name: 'Seleção' }).name} - Desempenho`,
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });

    return chartInstances[canvasId];
}

function createAttendanceChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    
    const stadiums = [
        { name: 'Estadio Azteca', attendance: 87523 },
        { name: 'MetLife Stadium', attendance: 82500 },
        { name: 'AT&T Stadium', attendance: 80000 },
        { name: 'Arrowhead Stadium', attendance: 76416 },
        { name: 'NRG Stadium', attendance: 72220 },
        { name: 'Mercedes-Benz', attendance: 71000 }
    ];

    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: stadiums.map(s => s.name),
            datasets: [{
                label: 'Capacidade',
                data: stadiums.map(s => s.attendance),
                backgroundColor: '#1a237e',
                borderColor: '#0d47a1',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Capacidade dos Principais Estádios',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString('pt-BR');
                        }
                    }
                }
            }
        }
    });

    return chartInstances[canvasId];
}

function createGroupComparisonChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return null;

    const ctx = canvas.getContext('2d');
    const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

    const avgPoints = groups.map(group => {
        const standings = getGroupStandings(group);
        const totalPoints = standings.reduce((sum, team) => sum + team.points, 0);
        return (totalPoints / standings.length).toFixed(1);
    });

    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
    }

    chartInstances[canvasId] = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: groups.map(g => `Grupo ${g}`),
            datasets: [{
                label: 'Média de Pontos',
                data: avgPoints,
                backgroundColor: 'rgba(26, 35, 126, 0.2)',
                borderColor: '#1a237e',
                borderWidth: 2,
                pointBackgroundColor: '#1a237e',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#1a237e'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: 'Comparação de Grupos - Média de Pontos',
                    font: {
                        size: 16,
                        weight: 'bold'
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 6
                }
            }
        }
    });

    return chartInstances[canvasId];
}

function destroyChart(canvasId) {
    if (chartInstances[canvasId]) {
        chartInstances[canvasId].destroy();
        delete chartInstances[canvasId];
    }
}

function destroyAllCharts() {
    Object.keys(chartInstances).forEach(canvasId => {
        destroyChart(canvasId);
    });
}

// Helper function to create a chart container
function createChartContainer(id, title, height = '300px') {
    return `
        <div class="chart-container" style="height: ${height}; margin-bottom: 30px;">
            <canvas id="${id}"></canvas>
        </div>
    `;
}

// Export functions for use in other modules
window.ChartManager = {
    createGroupChart,
    createGoalsChart,
    createGoalsByGroupChart,
    createMatchesStatusChart,
    createTeamPerformanceChart,
    createAttendanceChart,
    createGroupComparisonChart,
    destroyChart,
    destroyAllCharts,
    createChartContainer
};

console.log('✅ Charts module loaded');

// Made with Bob
