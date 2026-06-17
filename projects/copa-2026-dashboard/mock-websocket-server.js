// Mock WebSocket Server for Testing Copa 2026 Dashboard
// This simulates real-time updates for development and testing

const WebSocket = require('ws');

const PORT = 8080;
const wss = new WebSocket.Server({ port: PORT });

console.log(`🚀 Mock WebSocket Server started on ws://localhost:${PORT}`);

// Store connected clients
const clients = new Set();

// Sample data for simulating updates
const sampleMatches = [
    { id: 5, homeTeam: 'BRA', awayTeam: 'MAR', group: 'C' },
    { id: 7, homeTeam: 'USA', awayTeam: 'PAR', group: 'D' },
    { id: 9, homeTeam: 'GER', awayTeam: 'CUW', group: 'E' }
];

wss.on('connection', (ws) => {
    console.log('✅ New client connected');
    clients.add(ws);
    
    // Send welcome message
    ws.send(JSON.stringify({
        type: 'connection',
        payload: {
            message: 'Connected to Copa 2026 Mock WebSocket Server',
            timestamp: new Date().toISOString()
        }
    }));
    
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            console.log('📨 Received:', data);
            
            // Handle different message types
            switch (data.type) {
                case 'ping':
                    ws.send(JSON.stringify({ type: 'heartbeat', timestamp: new Date().toISOString() }));
                    break;
                case 'subscribe':
                    console.log(`📡 Client subscribed to: ${data.channel}`);
                    ws.send(JSON.stringify({
                        type: 'subscribed',
                        channel: data.channel,
                        timestamp: new Date().toISOString()
                    }));
                    break;
                case 'unsubscribe':
                    console.log(`📡 Client unsubscribed from: ${data.channel}`);
                    break;
            }
        } catch (error) {
            console.error('❌ Error parsing message:', error);
        }
    });
    
    ws.on('close', () => {
        console.log('👋 Client disconnected');
        clients.delete(ws);
    });
    
    ws.on('error', (error) => {
        console.error('❌ WebSocket error:', error);
    });
});

// Broadcast to all connected clients
function broadcast(data) {
    const message = JSON.stringify(data);
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

// Simulate live match updates
function simulateLiveMatch() {
    const match = sampleMatches[Math.floor(Math.random() * sampleMatches.length)];
    const homeScore = Math.floor(Math.random() * 4);
    const awayScore = Math.floor(Math.random() * 4);
    const minute = Math.floor(Math.random() * 90) + 1;
    
    console.log(`⚽ Simulating live score: Match ${match.id} - ${homeScore}:${awayScore} (${minute}')`);
    
    broadcast({
        type: 'live_score',
        payload: {
            matchId: match.id,
            homeScore: homeScore,
            awayScore: awayScore,
            minute: minute,
            status: 'live',
            timestamp: new Date().toISOString()
        }
    });
}

// Simulate match events (goals, cards, etc.)
function simulateMatchEvent() {
    const match = sampleMatches[Math.floor(Math.random() * sampleMatches.length)];
    const events = [
        { type: 'goal', icon: '⚽', description: 'GOOOL!' },
        { type: 'yellow_card', icon: '🟨', description: 'Cartão amarelo' },
        { type: 'red_card', icon: '🟥', description: 'Cartão vermelho!' },
        { type: 'substitution', icon: '🔄', description: 'Substituição' }
    ];
    
    const event = events[Math.floor(Math.random() * events.length)];
    const minute = Math.floor(Math.random() * 90) + 1;
    
    console.log(`⚡ Simulating event: ${event.type} at ${minute}'`);
    
    broadcast({
        type: 'match_event',
        payload: {
            matchId: match.id,
            eventType: event.type,
            minute: minute,
            description: `${event.icon} ${event.description} - ${minute}'`,
            timestamp: new Date().toISOString()
        }
    });
}

// Simulate standings update
function simulateStandingsUpdate() {
    const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
    const group = groups[Math.floor(Math.random() * groups.length)];
    
    console.log(`📊 Simulating standings update for Group ${group}`);
    
    broadcast({
        type: 'standings_update',
        payload: {
            group: group,
            standings: [
                { team: 'TEAM1', played: 2, won: 2, drawn: 0, lost: 0, goalsFor: 5, goalsAgainst: 1, points: 6 },
                { team: 'TEAM2', played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 3, goalsAgainst: 3, points: 3 },
                { team: 'TEAM3', played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 2, goalsAgainst: 3, points: 3 },
                { team: 'TEAM4', played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 1, goalsAgainst: 4, points: 0 }
            ],
            timestamp: new Date().toISOString()
        }
    });
}

// Simulate statistics update
function simulateStatisticsUpdate() {
    console.log('📈 Simulating statistics update');
    
    broadcast({
        type: 'statistics_update',
        payload: {
            topScorers: [
                { player: 'Neymar Jr.', team: 'BRA', goals: 5, matches: 3 },
                { player: 'Kylian Mbappé', team: 'FRA', goals: 4, matches: 3 },
                { player: 'Lionel Messi', team: 'ARG', goals: 4, matches: 3 }
            ],
            topAssists: [
                { player: 'Kevin De Bruyne', team: 'BEL', assists: 3, matches: 3 },
                { player: 'Bruno Fernandes', team: 'POR', assists: 2, matches: 3 }
            ],
            timestamp: new Date().toISOString()
        }
    });
}

// Simulate match completion
function simulateMatchCompletion() {
    const match = sampleMatches[Math.floor(Math.random() * sampleMatches.length)];
    const homeScore = Math.floor(Math.random() * 4);
    const awayScore = Math.floor(Math.random() * 4);
    
    console.log(`🏁 Simulating match completion: Match ${match.id} - ${homeScore}:${awayScore}`);
    
    broadcast({
        type: 'match_update',
        payload: {
            matchId: match.id,
            data: {
                homeScore: homeScore,
                awayScore: awayScore,
                status: 'finished',
                minute: 90
            },
            timestamp: new Date().toISOString()
        }
    });
}

// Start simulation intervals
console.log('🎮 Starting simulation intervals...');

// Send heartbeat every 5 seconds
setInterval(() => {
    broadcast({ type: 'heartbeat', timestamp: new Date().toISOString() });
}, 5000);

// Simulate live score updates every 15 seconds
setInterval(() => {
    if (clients.size > 0) {
        simulateLiveMatch();
    }
}, 15000);

// Simulate match events every 20 seconds
setInterval(() => {
    if (clients.size > 0) {
        simulateMatchEvent();
    }
}, 20000);

// Simulate standings update every 45 seconds
setInterval(() => {
    if (clients.size > 0) {
        simulateStandingsUpdate();
    }
}, 45000);

// Simulate statistics update every 60 seconds
setInterval(() => {
    if (clients.size > 0) {
        simulateStatisticsUpdate();
    }
}, 60000);

// Simulate match completion every 90 seconds
setInterval(() => {
    if (clients.size > 0) {
        simulateMatchCompletion();
    }
}, 90000);

console.log('✅ Mock server ready to simulate Copa 2026 updates!');
console.log('📡 Connect your dashboard to: ws://localhost:8080');
console.log('');
console.log('Simulation schedule:');
console.log('  - Heartbeat: every 5s');
console.log('  - Live scores: every 15s');
console.log('  - Match events: every 20s');
console.log('  - Standings: every 45s');
console.log('  - Statistics: every 60s');
console.log('  - Match completion: every 90s');

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n👋 Shutting down mock server...');
    wss.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

// Made with Bob