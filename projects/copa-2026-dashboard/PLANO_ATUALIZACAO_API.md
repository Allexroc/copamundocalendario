# 🔄 Plano de Atualização Automática - Copa 2026 Dashboard

## 📋 Objetivo

Implementar sistema de atualização automática a cada **60 minutos** com dados reais da API, exibindo todos os horários em **UTC-3 (Brasília)**.

## 🎯 Requisitos

### 1. Atualização Automática
- ✅ Atualizar dados a cada 60 minutos (atualmente: 10 minutos)
- ✅ Primeira atualização ao carregar a página
- ✅ Indicador visual de última atualização
- ✅ Botão de atualização manual
- ✅ Contador regressivo até próxima atualização

### 2. Horários em UTC-3 (Brasília)
- ✅ Converter todos os horários da API para UTC-3
- ✅ Exibir formato: "DD/MM/YYYY às HH:MM"
- ✅ Indicar fuso horário: "Horário de Brasília (UTC-3)"
- ✅ Atualizar relógios em tempo real

### 3. Dados da API
- ✅ Classificação dos grupos (pontos, vitórias, empates, derrotas)
- ✅ Resultados das partidas realizadas
- ✅ Calendário de partidas futuras
- ✅ Estatísticas (gols, cartões, artilharia)
- ✅ Status ao vivo (live, finished, scheduled)

## 🔧 Implementação

### Fase 1: Ajustar Intervalo de Atualização ✅

**Arquivo:** `js/worldcup-api.js` ou `js/api-integration.js`

```javascript
// Mudar de 10 minutos para 60 minutos
const AUTO_REFRESH_INTERVAL = 60 * 60 * 1000; // 60 minutos em ms
```

**Adicionar contador regressivo:**

```javascript
let nextUpdateCountdown = AUTO_REFRESH_INTERVAL;

function updateCountdown() {
    nextUpdateCountdown -= 1000;
    if (nextUpdateCountdown <= 0) {
        nextUpdateCountdown = AUTO_REFRESH_INTERVAL;
    }
    
    const minutes = Math.floor(nextUpdateCountdown / 60000);
    const seconds = Math.floor((nextUpdateCountdown % 60000) / 1000);
    
    document.getElementById('nextUpdateTimer').textContent = 
        `Próxima atualização em: ${minutes}:${seconds.toString().padStart(2, '0')}`;
}

setInterval(updateCountdown, 1000);
```

### Fase 2: Conversão de Horários para UTC-3 ✅

**Função de conversão:**

```javascript
function convertToUTC3(utcDateString) {
    const utcDate = new Date(utcDateString);
    const utc3Date = new Date(utcDate.getTime() - (3 * 60 * 60 * 1000));
    
    return {
        date: utc3Date,
        formatted: utc3Date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Sao_Paulo'
        }),
        time: utc3Date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'America/Sao_Paulo'
        })
    };
}
```

**Aplicar em todas as datas:**

```javascript
// Ao processar partidas da API
matches.forEach(match => {
    const utc3 = convertToUTC3(match.utcDate);
    match.displayDate = utc3.formatted;
    match.displayTime = utc3.time;
    match.localDate = utc3.date;
});
```

### Fase 3: Interface de Atualização Aprimorada

**HTML adicional no header:**

```html
<div class="api-status-bar">
    <div class="status-item">
        <i class="fas fa-clock"></i>
        <span id="lastUpdateTime">Carregando...</span>
    </div>
    <div class="status-item">
        <i class="fas fa-hourglass-half"></i>
        <span id="nextUpdateTimer">--:--</span>
    </div>
    <div class="status-item">
        <i class="fas fa-globe-americas"></i>
        <span>Horário de Brasília (UTC-3)</span>
    </div>
    <button class="btn-refresh" id="manualRefreshBtn">
        <i class="fas fa-sync-alt"></i>
        Atualizar Agora
    </button>
</div>
```

**CSS para barra de status:**

```css
.api-status-bar {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 10px 20px;
    background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
    color: white;
    font-size: 0.9rem;
}

.status-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.status-item i {
    color: #ffd700;
}

.btn-refresh {
    margin-left: auto;
    padding: 8px 16px;
    background: #ffd700;
    color: #1a237e;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.btn-refresh:hover {
    background: #ffed4e;
    transform: translateY(-2px);
}

.btn-refresh.loading {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-refresh.loading i {
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
```

### Fase 4: Melhorias na Exibição de Dados

**Formato de data nas partidas:**

```javascript
function formatMatchDate(match) {
    const utc3 = convertToUTC3(match.date);
    const now = new Date();
    const matchDate = utc3.date;
    
    // Verificar se é hoje
    const isToday = matchDate.toDateString() === now.toDateString();
    
    // Verificar se é amanhã
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const isTomorrow = matchDate.toDateString() === tomorrow.toDateString();
    
    let dateLabel = '';
    if (isToday) {
        dateLabel = 'HOJE';
    } else if (isTomorrow) {
        dateLabel = 'AMANHÃ';
    } else {
        dateLabel = matchDate.toLocaleDateString('pt-BR', {
            weekday: 'short',
            day: '2-digit',
            month: '2-digit'
        }).toUpperCase();
    }
    
    return {
        label: dateLabel,
        time: utc3.time,
        full: utc3.formatted
    };
}
```

**Template de partida atualizado:**

```html
<div class="match-card">
    <div class="match-date">
        <span class="date-label">${dateInfo.label}</span>
        <span class="time-label">${dateInfo.time}</span>
        <span class="timezone-label">Brasília</span>
    </div>
    <div class="match-teams">
        <!-- times e placar -->
    </div>
    <div class="match-status ${match.status}">
        ${getStatusLabel(match.status)}
    </div>
</div>
```

### Fase 5: Indicadores de Status ao Vivo

**Para partidas ao vivo:**

```javascript
function getStatusLabel(status, minute) {
    switch(status) {
        case 'live':
            return `<span class="live-badge">
                <span class="live-dot"></span>
                AO VIVO ${minute ? `- ${minute}'` : ''}
            </span>`;
        case 'finished':
            return '<span class="finished-badge">ENCERRADO</span>';
        case 'scheduled':
            return '<span class="scheduled-badge">AGENDADO</span>';
        case 'postponed':
            return '<span class="postponed-badge">ADIADO</span>';
        default:
            return '';
    }
}
```

**CSS para badges:**

```css
.live-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    background: #f44336;
    color: white;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.85rem;
    animation: pulse 2s infinite;
}

.live-dot {
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    animation: blink 1s infinite;
}

@keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
}

.finished-badge {
    padding: 4px 12px;
    background: #4caf50;
    color: white;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.85rem;
}

.scheduled-badge {
    padding: 4px 12px;
    background: #2196f3;
    color: white;
    border-radius: 12px;
    font-weight: 600;
    font-size: 0.85rem;
}
```

### Fase 6: Notificações de Atualização

**Sistema de notificações:**

```javascript
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${getIconForType(type)}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function getIconForType(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Usar ao atualizar
APIIntegration.updateDashboard().then(success => {
    if (success) {
        showNotification('Dados atualizados com sucesso!', 'success');
    } else {
        showNotification('Erro ao atualizar dados', 'error');
    }
});
```

## 📊 Dados a Exibir

### Classificação dos Grupos
```javascript
{
    group: "A",
    teams: [
        {
            position: 1,
            team: "MEX",
            name: "México",
            flag: "🇲🇽",
            played: 2,
            won: 2,
            drawn: 0,
            lost: 0,
            goalsFor: 5,
            goalsAgainst: 1,
            goalDifference: 4,
            points: 6
        }
    ]
}
```

### Partidas
```javascript
{
    id: 1,
    date: "2026-06-11T19:00:00-03:00",
    displayDate: "11/06/2026 às 19:00",
    group: "A",
    round: 1,
    homeTeam: "MEX",
    awayTeam: "RSA",
    homeScore: 2,
    awayScore: 0,
    status: "finished",
    stadium: "Estadio Azteca",
    city: "Cidade do México",
    attendance: 87000,
    minute: null
}
```

### Estatísticas
```javascript
{
    topScorers: [
        {
            player: "Kylian Mbappé",
            team: "FRA",
            goals: 5,
            assists: 2
        }
    ],
    totalGoals: 78,
    averageGoals: 3.25,
    yellowCards: 45,
    redCards: 2,
    penalties: 8
}
```

## 🧪 Testes

### Checklist de Testes

- [ ] Atualização automática funciona a cada 60 minutos
- [ ] Contador regressivo atualiza corretamente
- [ ] Botão de atualização manual funciona
- [ ] Horários exibidos em UTC-3 (Brasília)
- [ ] Classificações calculadas corretamente
- [ ] Partidas ao vivo mostram badge "AO VIVO"
- [ ] Partidas finalizadas mostram placar correto
- [ ] Partidas agendadas mostram data/hora futura
- [ ] Notificações aparecem após atualização
- [ ] Indicador de loading funciona
- [ ] Tratamento de erros funciona
- [ ] Dados persistem entre atualizações

## 📝 Arquivos a Modificar

1. **js/api-integration.js** ou **js/worldcup-api.js**
   - Mudar intervalo para 60 minutos
   - Adicionar contador regressivo
   - Melhorar conversão de horários

2. **index.html**
   - Adicionar barra de status da API
   - Adicionar contador regressivo
   - Adicionar indicador de fuso horário

3. **css/styles.css**
   - Estilos para barra de status
   - Estilos para badges de status
   - Estilos para notificações

4. **js/app.js**
   - Integrar sistema de notificações
   - Atualizar formatação de datas
   - Adicionar listeners para atualização manual

## 🚀 Implementação Passo a Passo

### Passo 1: Atualizar Intervalo (5 min)
```javascript
// Em api-integration.js
const AUTO_REFRESH_INTERVAL = 60 * 60 * 1000; // 60 minutos
```

### Passo 2: Adicionar Contador (10 min)
- Criar função updateCountdown()
- Adicionar elemento HTML para exibir
- Iniciar setInterval

### Passo 3: Melhorar Conversão de Horários (15 min)
- Criar função convertToUTC3()
- Aplicar em todas as datas
- Atualizar templates de exibição

### Passo 4: Adicionar Barra de Status (10 min)
- Criar HTML da barra
- Adicionar CSS
- Conectar com dados da API

### Passo 5: Implementar Notificações (10 min)
- Criar função showNotification()
- Adicionar CSS para notificações
- Integrar com eventos de atualização

### Passo 6: Testar Tudo (20 min)
- Testar atualização automática
- Testar atualização manual
- Verificar horários
- Testar em diferentes navegadores

**Tempo total estimado: 70 minutos**

## ✅ Resultado Esperado

Após implementação, o dashboard terá:

1. ✅ Atualização automática a cada 60 minutos
2. ✅ Contador regressivo até próxima atualização
3. ✅ Todos os horários em UTC-3 (Brasília)
4. ✅ Indicadores visuais de status (ao vivo, finalizado, agendado)
5. ✅ Notificações de sucesso/erro
6. ✅ Botão de atualização manual
7. ✅ Dados sempre atualizados da API
8. ✅ Interface profissional e informativa

---

**Pronto para implementar?** 🚀