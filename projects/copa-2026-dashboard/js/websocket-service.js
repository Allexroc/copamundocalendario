// FIFA World Cup 2026 - WebSocket Service for Real-Time Updates
// Handles live match data, scores, and statistics updates

class WorldCupWebSocketService {
    constructor() {
        this.ws = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 3000;
        this.isConnected = false;
        this.listeners = new Map();
        this.heartbeatInterval = null;
        this.lastHeartbeat = null;
        
        // WebSocket server URL - can be configured
        this.wsUrl = this.getWebSocketUrl();
    }
    
    getWebSocketUrl() {
        // Usar configuração de API se disponível
        if (typeof API_CONFIG !== 'undefined') {
            const activeConfig = getActiveAPIConfig();
            
            if (activeConfig.websocket) {
                console.log(`📡 Using ${activeConfig.name} WebSocket: ${activeConfig.websocket}`);
                return activeConfig.websocket;
            }
            
            // Se a API usa polling HTTP em vez de WebSocket
            if (activeConfig.polling) {
                console.log(`🔄 ${activeConfig.name} uses HTTP polling instead of WebSocket`);
                this.usePolling = true;
                this.pollingService = new HTTPPollingService(activeConfig);
                return null;
            }
        }
        
        // Fallback: tentar servidor local
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const host = window.location.host;
        
        // Se estiver rodando localmente, usar servidor mock
        if (host.includes('localhost') || host.includes('127.0.0.1')) {
            console.log('📡 Using local mock WebSocket server');
            return 'ws://localhost:8080';
        }
        
        // Default para produção
        return `${protocol}//${host}/ws/worldcup2026`;
    }
    
    connect() {
        // Se usar polling HTTP em vez de WebSocket
        if (this.usePolling && this.pollingService) {
            console.log('🔄 Starting HTTP polling service');
            this.pollingService.start();
            this.isConnected = true;
            this.updateConnectionStatus('connected');
            
            // Configurar listeners do polling
            this.pollingService.addEventListener('live_matches', (data) => {
                this.handleLiveMatchesFromAPI(data);
            });
            
            this.pollingService.addEventListener('standings', (data) => {
                this.handleStandingsFromAPI(data);
            });
            
            this.pollingService.addEventListener('top_scorers', (data) => {
                this.handleScorersFromAPI(data);
            });
            
            return;
        }
        
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            console.log('⚠️ WebSocket already connected');
            return;
        }
        
        if (!this.wsUrl) {
            console.error('❌ No WebSocket URL configured');
            return;
        }
        
        try {
            console.log(`🔌 Connecting to WebSocket: ${this.wsUrl}`);
            this.ws = new WebSocket(this.wsUrl);
            
            this.ws.onopen = this.onOpen.bind(this);
            this.ws.onmessage = this.onMessage.bind(this);
            this.ws.onerror = this.onError.bind(this);
            this.ws.onclose = this.onClose.bind(this);
            
        } catch (error) {
            console.error('❌ WebSocket connection error:', error);
            this.scheduleReconnect();
        }
    }
    
    onOpen(event) {
        console.log('✅ WebSocket connected successfully');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.updateConnectionStatus('connected');
        
        // Start heartbeat
        this.startHeartbeat();
        
        // Subscribe to all updates
        this.subscribe('matches');
        this.subscribe('standings');
        this.subscribe('statistics');
        
        // Notify listeners
        this.notifyListeners('connection', { status: 'connected' });
    }
    
    onMessage(event) {
        try {
            const data = JSON.parse(event.data);
            console.log('📨 WebSocket message received:', data.type);
            
            // Update last heartbeat
            if (data.type === 'heartbeat') {
                this.lastHeartbeat = Date.now();
                return;
            }
            
            // Handle different message types
            switch (data.type) {
                case 'match_update':
                    this.handleMatchUpdate(data.payload);
                    break;
                case 'standings_update':
                    this.handleStandingsUpdate(data.payload);
                    break;
                case 'statistics_update':
                    this.handleStatisticsUpdate(data.payload);
                    break;
                case 'live_score':
                    this.handleLiveScore(data.payload);
                    break;
                case 'match_event':
                    this.handleMatchEvent(data.payload);
                    break;
                default:
                    console.warn('Unknown message type:', data.type);
            }
            
        } catch (error) {
            console.error('❌ Error parsing WebSocket message:', error);
        }
    }
    
    onError(error) {
        console.error('❌ WebSocket error:', error);
        this.updateConnectionStatus('error');
    }
    
    onClose(event) {
        console.log('🔌 WebSocket disconnected:', event.code, event.reason);
        this.isConnected = false;
        this.stopHeartbeat();
        this.updateConnectionStatus('disconnected');
        
        // Notify listeners
        this.notifyListeners('connection', { status: 'disconnected' });
        
        // Attempt to reconnect
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.scheduleReconnect();
        } else {
            console.error('❌ Max reconnection attempts reached');
            this.updateConnectionStatus('failed');
        }
    }
    
    scheduleReconnect() {
        this.reconnectAttempts++;
        const delay = this.reconnectDelay * this.reconnectAttempts;
        
        console.log(`🔄 Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
        this.updateConnectionStatus('reconnecting');
        
        setTimeout(() => {
            this.connect();
        }, delay);
    }
    
    startHeartbeat() {
        this.lastHeartbeat = Date.now();
        this.heartbeatInterval = setInterval(() => {
            if (this.isConnected) {
                this.send({ type: 'ping' });
                
                // Check if we've received a heartbeat recently
                const timeSinceLastHeartbeat = Date.now() - this.lastHeartbeat;
                if (timeSinceLastHeartbeat > 30000) {
                    console.warn('⚠️ No heartbeat received, reconnecting...');
                    this.ws.close();
                }
            }
        }, 10000); // Send ping every 10 seconds
    }
    
    stopHeartbeat() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
            this.heartbeatInterval = null;
        }
    }
    
    send(data) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        } else {
            console.warn('⚠️ WebSocket not connected, cannot send message');
        }
    }
    
    subscribe(channel) {
        this.send({
            type: 'subscribe',
            channel: channel
        });
        console.log(`📡 Subscribed to channel: ${channel}`);
    }
    
    unsubscribe(channel) {
        this.send({
            type: 'unsubscribe',
            channel: channel
        });
        console.log(`📡 Unsubscribed from channel: ${channel}`);
    }
    
    // Event handlers for different update types
    handleMatchUpdate(payload) {
        console.log('⚽ Match update received:', payload);
        
        // Update match in WORLD_CUP_2026 data
        if (typeof WORLD_CUP_2026 !== 'undefined') {
            const matchIndex = WORLD_CUP_2026.matches.findIndex(m => m.id === payload.matchId);
            if (matchIndex !== -1) {
                // Merge update with existing match data
                WORLD_CUP_2026.matches[matchIndex] = {
                    ...WORLD_CUP_2026.matches[matchIndex],
                    ...payload.data,
                    lastUpdated: new Date().toISOString()
                };
                
                // Notify listeners
                this.notifyListeners('match_update', payload);
                
                // Trigger UI refresh
                this.refreshMatchDisplay(payload.matchId);
            }
        }
    }
    
    handleStandingsUpdate(payload) {
        console.log('📊 Standings update received:', payload);
        
        // Update group standings
        if (typeof WORLD_CUP_2026 !== 'undefined' && payload.group) {
            WORLD_CUP_2026.groupStandings[payload.group] = payload.standings;
            
            // Notify listeners
            this.notifyListeners('standings_update', payload);
            
            // Trigger UI refresh
            this.refreshGroupDisplay(payload.group);
        }
    }
    
    handleStatisticsUpdate(payload) {
        console.log('📈 Statistics update received:', payload);
        
        // Update statistics
        if (typeof WORLD_CUP_2026 !== 'undefined') {
            if (payload.topScorers) {
                WORLD_CUP_2026.topScorers = payload.topScorers;
            }
            if (payload.topAssists) {
                WORLD_CUP_2026.topAssists = payload.topAssists;
            }
            
            // Notify listeners
            this.notifyListeners('statistics_update', payload);
            
            // Trigger UI refresh
            this.refreshStatsDisplay();
        }
    }
    
    handleLiveScore(payload) {
        console.log('🔴 LIVE: Score update:', payload);
        
        // Update live match score
        if (typeof WORLD_CUP_2026 !== 'undefined') {
            const matchIndex = WORLD_CUP_2026.matches.findIndex(m => m.id === payload.matchId);
            if (matchIndex !== -1) {
                WORLD_CUP_2026.matches[matchIndex].homeScore = payload.homeScore;
                WORLD_CUP_2026.matches[matchIndex].awayScore = payload.awayScore;
                WORLD_CUP_2026.matches[matchIndex].status = payload.status || 'live';
                WORLD_CUP_2026.matches[matchIndex].minute = payload.minute;
                
                // Notify listeners
                this.notifyListeners('live_score', payload);
                
                // Show notification
                this.showScoreNotification(payload);
                
                // Trigger UI refresh
                this.refreshMatchDisplay(payload.matchId);
            }
        }
    }
    
    handleMatchEvent(payload) {
        console.log('⚡ Match event:', payload);
        
        // Handle match events (goals, cards, substitutions)
        this.notifyListeners('match_event', payload);
        
        // Show notification for important events
        if (['goal', 'red_card', 'penalty'].includes(payload.eventType)) {
            this.showEventNotification(payload);
        }
    }
    
    // UI refresh methods
    refreshMatchDisplay(matchId) {
        // Refresh match card if visible
        const matchCard = document.querySelector(`[data-match-id="${matchId}"]`);
        if (matchCard) {
            // Trigger re-render of specific match
            if (typeof renderCalendar === 'function') {
                renderCalendar();
            }
            if (typeof renderResults === 'function') {
                renderResults();
            }
        }
    }
    
    refreshGroupDisplay(groupId) {
        // Refresh group standings if visible
        if (typeof renderGroups === 'function') {
            renderGroups();
        }
    }
    
    refreshStatsDisplay() {
        // Refresh statistics if visible
        if (typeof renderStats === 'function') {
            renderStats();
        }
    }
    
    // Notification methods
    showScoreNotification(payload) {
        const match = WORLD_CUP_2026.matches.find(m => m.id === payload.matchId);
        if (!match) return;
        
        const homeTeam = WORLD_CUP_2026.teams[match.homeTeam];
        const awayTeam = WORLD_CUP_2026.teams[match.awayTeam];
        
        this.showNotification(
            '⚽ GOOOL!',
            `${homeTeam.flag} ${homeTeam.name} ${payload.homeScore} x ${payload.awayScore} ${awayTeam.name} ${awayTeam.flag}`,
            'score'
        );
    }
    
    showEventNotification(payload) {
        const icons = {
            goal: '⚽',
            red_card: '🟥',
            yellow_card: '🟨',
            penalty: '🎯',
            substitution: '🔄'
        };
        
        const icon = icons[payload.eventType] || '⚡';
        this.showNotification(
            `${icon} ${payload.eventType.toUpperCase()}`,
            payload.description,
            'event'
        );
    }
    
    showNotification(title, message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `ws-notification ws-notification-${type}`;
        notification.innerHTML = `
            <div class="ws-notification-content">
                <strong>${title}</strong>
                <p>${message}</p>
            </div>
            <button class="ws-notification-close">&times;</button>
        `;
        
        // Add to page
        let container = document.getElementById('wsNotifications');
        if (!container) {
            container = document.createElement('div');
            container.id = 'wsNotifications';
            container.className = 'ws-notifications-container';
            document.body.appendChild(container);
        }
        
        container.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.classList.add('ws-notification-fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Close button
        notification.querySelector('.ws-notification-close').addEventListener('click', () => {
            notification.classList.add('ws-notification-fade-out');
            setTimeout(() => notification.remove(), 300);
        });
    }
    
    // Connection status indicator
    updateConnectionStatus(status) {
        let indicator = document.getElementById('wsConnectionStatus');
        if (!indicator) {
            indicator = document.createElement('div');
            indicator.id = 'wsConnectionStatus';
            indicator.className = 'ws-connection-status';
            document.body.appendChild(indicator);
        }
        
        const statusConfig = {
            connected: { icon: '🟢', text: 'Conectado', class: 'connected' },
            disconnected: { icon: '🔴', text: 'Desconectado', class: 'disconnected' },
            reconnecting: { icon: '🟡', text: 'Reconectando...', class: 'reconnecting' },
            error: { icon: '🔴', text: 'Erro', class: 'error' },
            failed: { icon: '🔴', text: 'Falha na conexão', class: 'failed' }
        };
        
        const config = statusConfig[status] || statusConfig.disconnected;
        indicator.className = `ws-connection-status ws-status-${config.class}`;
        indicator.innerHTML = `
            <span class="ws-status-icon">${config.icon}</span>
            <span class="ws-status-text">${config.text}</span>
        `;
    }
    
    // Event listener management
    addEventListener(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }
    
    removeEventListener(event, callback) {
        if (this.listeners.has(event)) {
            const callbacks = this.listeners.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }
    
    notifyListeners(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in listener for ${event}:`, error);
                }
            });
        }
    }
    
    disconnect() {
        console.log('🔌 Disconnecting WebSocket...');
        this.stopHeartbeat();
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.isConnected = false;
        this.updateConnectionStatus('disconnected');
    }
    
    getConnectionState() {
        return {
            isConnected: this.isConnected,
            reconnectAttempts: this.reconnectAttempts,
            lastHeartbeat: this.lastHeartbeat
        };
    }
}

// Create global instance
const worldCupWS = new WorldCupWebSocketService();

// Auto-connect on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        worldCupWS.connect();
    });
} else {
    worldCupWS.connect();
}

// Add styles for notifications and status indicator
const wsStyles = document.createElement('style');
wsStyles.textContent = `
    .ws-notifications-container {
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 10000;
        max-width: 400px;
    }
    
    .ws-notification {
        background: white;
        border-radius: 8px;
        padding: 16px;
        margin-bottom: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: flex;
        align-items: flex-start;
        gap: 12px;
        animation: slideInRight 0.3s ease-out;
        border-left: 4px solid #1a237e;
    }
    
    .ws-notification-score {
        border-left-color: #4caf50;
    }
    
    .ws-notification-event {
        border-left-color: #ff9800;
    }
    
    .ws-notification-content {
        flex: 1;
    }
    
    .ws-notification-content strong {
        display: block;
        color: #1a237e;
        margin-bottom: 4px;
        font-size: 14px;
    }
    
    .ws-notification-content p {
        margin: 0;
        color: #666;
        font-size: 13px;
    }
    
    .ws-notification-close {
        background: none;
        border: none;
        font-size: 20px;
        color: #999;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        transition: all 0.2s;
    }
    
    .ws-notification-close:hover {
        background: #f5f5f5;
        color: #333;
    }
    
    .ws-notification-fade-out {
        animation: slideOutRight 0.3s ease-out forwards;
    }
    
    .ws-connection-status {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: white;
        border-radius: 20px;
        padding: 8px 16px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        z-index: 9999;
        transition: all 0.3s;
    }
    
    .ws-connection-status:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .ws-status-icon {
        font-size: 12px;
    }
    
    .ws-status-text {
        color: #666;
        font-weight: 500;
    }
    
    .ws-status-connected .ws-status-text {
        color: #4caf50;
    }
    
    .ws-status-reconnecting .ws-status-text {
        color: #ff9800;
    }
    
    .ws-status-disconnected .ws-status-text,
    .ws-status-error .ws-status-text,
    .ws-status-failed .ws-status-text {
        color: #f44336;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    @media (max-width: 768px) {
        .ws-notifications-container {
            right: 10px;
            left: 10px;
            max-width: none;
        }
        
        .ws-connection-status {
            bottom: 10px;
            right: 10px;
            font-size: 12px;
            padding: 6px 12px;
        }
    }
`;
document.head.appendChild(wsStyles);

console.log('✅ WebSocket service module loaded');

// Made with Bob