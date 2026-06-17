# 🔌 Guia de WebSocket - Copa do Mundo 2026

## 📋 Visão Geral

O Dashboard da Copa do Mundo 2026 agora suporta atualizações em tempo real via WebSocket! Este guia explica como configurar e usar o sistema de atualizações ao vivo.

## ✨ Funcionalidades

### Atualizações em Tempo Real
- ⚽ **Placares ao vivo** - Atualizações instantâneas de gols e resultados
- 📊 **Classificações** - Tabelas de grupos atualizadas automaticamente
- 📈 **Estatísticas** - Artilharia e assistências em tempo real
- ⚡ **Eventos de partida** - Gols, cartões, substituições
- 🔔 **Notificações** - Alertas visuais para eventos importantes

### Recursos Técnicos
- 🔄 **Reconexão automática** - Até 5 tentativas com delay progressivo
- 💓 **Heartbeat** - Monitoramento de conexão a cada 10 segundos
- 🎯 **Auto-refresh** - Atualização automática de partidas ao vivo a cada 30s
- 📡 **Status de conexão** - Indicador visual do estado da conexão
- 🔔 **Sistema de notificações** - Alertas não-intrusivos para eventos

## 🚀 Configuração Rápida

### Opção 1: Servidor Mock (Desenvolvimento)

Para testar localmente com dados simulados:

1. **Instalar dependências:**
```bash
cd projects/copa-2026-dashboard
npm install ws
```

2. **Iniciar o servidor mock:**
```bash
node mock-websocket-server.js
```

3. **Atualizar URL do WebSocket:**

Edite `js/websocket-service.js` linha ~18:
```javascript
getWebSocketUrl() {
    // Para desenvolvimento local
    return 'ws://localhost:8080';
}
```

4. **Abrir o dashboard:**
```bash
# Abra index.html no navegador ou use um servidor local
python -m http.server 8000
# Acesse: http://localhost:8000
```

### Opção 2: Servidor de Produção

Para conectar a um servidor WebSocket real:

1. **Configure a URL do servidor:**

Edite `js/websocket-service.js`:
```javascript
getWebSocketUrl() {
    // URL do seu servidor WebSocket de produção
    return 'wss://seu-servidor.com/ws/worldcup2026';
}
```

2. **Variáveis de ambiente (opcional):**

Você pode usar variáveis de ambiente:
```javascript
getWebSocketUrl() {
    return process.env.WS_URL || 'wss://seu-servidor.com/ws/worldcup2026';
}
```

## 📡 Protocolo de Mensagens

### Mensagens do Cliente para Servidor

#### Ping (Heartbeat)
```json
{
  "type": "ping"
}
```

#### Inscrição em Canal
```json
{
  "type": "subscribe",
  "channel": "matches"
}
```

Canais disponíveis:
- `matches` - Atualizações de partidas
- `standings` - Classificações dos grupos
- `statistics` - Estatísticas gerais

#### Cancelar Inscrição
```json
{
  "type": "unsubscribe",
  "channel": "matches"
}
```

### Mensagens do Servidor para Cliente

#### Heartbeat
```json
{
  "type": "heartbeat",
  "timestamp": "2026-06-17T13:00:00.000Z"
}
```

#### Placar ao Vivo
```json
{
  "type": "live_score",
  "payload": {
    "matchId": 5,
    "homeScore": 2,
    "awayScore": 1,
    "minute": 67,
    "status": "live",
    "timestamp": "2026-06-17T13:00:00.000Z"
  }
}
```

#### Atualização de Partida
```json
{
  "type": "match_update",
  "payload": {
    "matchId": 5,
    "data": {
      "homeScore": 3,
      "awayScore": 1,
      "status": "finished",
      "minute": 90
    },
    "timestamp": "2026-06-17T13:00:00.000Z"
  }
}
```

#### Evento de Partida
```json
{
  "type": "match_event",
  "payload": {
    "matchId": 5,
    "eventType": "goal",
    "minute": 67,
    "description": "⚽ GOOOL! - 67'",
    "timestamp": "2026-06-17T13:00:00.000Z"
  }
}
```

Tipos de eventos:
- `goal` - Gol
- `yellow_card` - Cartão amarelo
- `red_card` - Cartão vermelho
- `penalty` - Pênalti
- `substitution` - Substituição

#### Atualização de Classificação
```json
{
  "type": "standings_update",
  "payload": {
    "group": "C",
    "standings": [
      {
        "team": "BRA",
        "played": 2,
        "won": 2,
        "drawn": 0,
        "lost": 0,
        "goalsFor": 5,
        "goalsAgainst": 1,
        "points": 6
      }
    ],
    "timestamp": "2026-06-17T13:00:00.000Z"
  }
}
```

#### Atualização de Estatísticas
```json
{
  "type": "statistics_update",
  "payload": {
    "topScorers": [
      {
        "player": "Neymar Jr.",
        "team": "BRA",
        "goals": 5,
        "matches": 3
      }
    ],
    "topAssists": [
      {
        "player": "Kevin De Bruyne",
        "team": "BEL",
        "assists": 3,
        "matches": 3
      }
    ],
    "timestamp": "2026-06-17T13:00:00.000Z"
  }
}
```

## 🔧 API JavaScript

### Instância Global

```javascript
// Instância global disponível
worldCupWS
```

### Métodos Principais

#### Conectar
```javascript
worldCupWS.connect();
```

#### Desconectar
```javascript
worldCupWS.disconnect();
```

#### Inscrever em Canal
```javascript
worldCupWS.subscribe('matches');
```

#### Cancelar Inscrição
```javascript
worldCupWS.unsubscribe('matches');
```

#### Adicionar Event Listener
```javascript
worldCupWS.addEventListener('live_score', (data) => {
  console.log('Novo placar:', data);
});
```

#### Remover Event Listener
```javascript
const callback = (data) => console.log(data);
worldCupWS.addEventListener('match_update', callback);
worldCupWS.removeEventListener('match_update', callback);
```

#### Verificar Estado da Conexão
```javascript
const state = worldCupWS.getConnectionState();
console.log(state);
// {
//   isConnected: true,
//   reconnectAttempts: 0,
//   lastHeartbeat: 1718632800000
// }
```

### Eventos Disponíveis

- `connection` - Mudança no estado da conexão
- `match_update` - Atualização de partida
- `live_score` - Placar ao vivo
- `match_event` - Evento de partida
- `standings_update` - Atualização de classificação
- `statistics_update` - Atualização de estatísticas

## 🎨 Personalização

### Modificar Intervalo de Auto-Refresh

Edite `js/app.js`:
```javascript
function startAutoRefresh() {
    // Altere 30000 (30s) para o intervalo desejado
    setInterval(() => {
        const liveMatches = getLiveMatches();
        if (liveMatches.length > 0) {
            refreshCurrentView();
        }
    }, 30000); // <-- Altere aqui
}
```

### Personalizar Notificações

Edite `js/websocket-service.js`:
```javascript
showNotification(title, message, type = 'info') {
    // Personalize o HTML e estilos das notificações
    const notification = document.createElement('div');
    notification.className = `ws-notification ws-notification-${type}`;
    // ... seu código personalizado
}
```

### Modificar Tentativas de Reconexão

Edite `js/websocket-service.js`:
```javascript
constructor() {
    this.maxReconnectAttempts = 5; // <-- Altere aqui
    this.reconnectDelay = 3000; // <-- Delay inicial em ms
}
```

## 🐛 Troubleshooting

### Problema: WebSocket não conecta

**Solução:**
1. Verifique se o servidor WebSocket está rodando
2. Confirme a URL no console do navegador
3. Verifique se há bloqueios de CORS ou firewall

```javascript
// Abra o console do navegador (F12) e verifique:
console.log(worldCupWS.getConnectionState());
```

### Problema: Reconexões constantes

**Solução:**
1. Verifique a estabilidade da rede
2. Aumente o intervalo de heartbeat
3. Verifique logs do servidor

### Problema: Notificações não aparecem

**Solução:**
1. Verifique se o CSS foi carregado corretamente
2. Confirme que não há conflitos de z-index
3. Verifique o console para erros JavaScript

### Problema: Dados não atualizam

**Solução:**
1. Verifique se os listeners estão registrados
2. Confirme que o servidor está enviando mensagens
3. Verifique se a estrutura de dados está correta

```javascript
// Debug: Adicione logs aos listeners
worldCupWS.addEventListener('match_update', (data) => {
  console.log('Match update received:', data);
});
```

## 📊 Servidor Mock - Detalhes

O servidor mock simula atualizações com os seguintes intervalos:

| Tipo | Intervalo | Descrição |
|------|-----------|-----------|
| Heartbeat | 5s | Ping de conexão |
| Placares ao vivo | 15s | Atualizações de score |
| Eventos de partida | 20s | Gols, cartões, etc. |
| Classificações | 45s | Tabelas de grupos |
| Estatísticas | 60s | Artilharia e assistências |
| Conclusão de partida | 90s | Partidas finalizadas |

### Iniciar Servidor Mock

```bash
node mock-websocket-server.js
```

### Logs do Servidor Mock

```
🚀 Mock WebSocket Server started on ws://localhost:8080
✅ New client connected
📨 Received: {"type":"subscribe","channel":"matches"}
⚽ Simulating live score: Match 5 - 2:1 (67')
```

## 🔒 Segurança

### Recomendações para Produção

1. **Use WSS (WebSocket Secure):**
```javascript
return 'wss://seu-servidor.com/ws/worldcup2026';
```

2. **Implemente autenticação:**
```javascript
connect(token) {
    this.ws = new WebSocket(`${this.wsUrl}?token=${token}`);
}
```

3. **Valide mensagens:**
```javascript
onMessage(event) {
    const data = JSON.parse(event.data);
    if (!this.validateMessage(data)) {
        console.error('Invalid message format');
        return;
    }
    // ... processar mensagem
}
```

4. **Rate limiting no servidor**
5. **Sanitize dados recebidos**
6. **Use HTTPS para servir o dashboard**

## 📚 Recursos Adicionais

### Documentação Relacionada
- [COMO_EXECUTAR.md](COMO_EXECUTAR.md) - Guia de execução do projeto
- [README.md](README.md) - Visão geral do projeto
- [GUIA_SLACK.md](GUIA_SLACK.md) - Integração com Slack

### Tecnologias Utilizadas
- **WebSocket API** - Comunicação bidirecional
- **JavaScript ES6+** - Código moderno
- **Chart.js** - Gráficos e visualizações
- **CSS3** - Animações e estilos

## 🤝 Contribuindo

Para contribuir com melhorias no sistema WebSocket:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Implemente e teste suas mudanças
4. Envie um Pull Request

## 📝 Changelog

### v1.0.0 (2026-06-17)
- ✨ Implementação inicial do WebSocket
- 🔄 Sistema de reconexão automática
- 🔔 Sistema de notificações
- 📡 Indicador de status de conexão
- 🎮 Servidor mock para testes
- 📚 Documentação completa

## 📄 Licença

Este projeto é parte do Dashboard Copa do Mundo 2026.

---

**Made with Bob** 🤖

Para suporte ou dúvidas, consulte a documentação ou abra uma issue no repositório.