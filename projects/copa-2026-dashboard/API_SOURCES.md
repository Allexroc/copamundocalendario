# 📡 Fontes de Dados - Copa 2026

## 🎯 Resumo das Opções

O dashboard suporta **múltiplas fontes de dados** via APIs HTTP. Você pode escolher entre:

1. **Dados Estáticos** (Desenvolvimento/Testes) ✅ PADRÃO
2. **APIs Públicas HTTP** (Produção)

## 🔧 Configuração Atual

### Opção Ativa: **Dados Estáticos**

```javascript
// Em js/api-config.js
API_CONFIG.active = 'mock'
```

**Como funciona:**
- Dados simulados armazenados localmente
- Não requer servidor backend
- Ideal para desenvolvimento e testes
- **Não requer API keys ou autenticação**

**Como usar:**
```bash
# Simplesmente abra o index.html no navegador
# Ou use um servidor local como Live Server
```

---

## 📊 APIs Públicas Disponíveis

### 1. API-Football (RapidAPI) ⭐ RECOMENDADO

**Melhor para:** Dados profissionais e completos

```javascript
// Configurar em js/api-config.js
API_CONFIG.active = 'apiFootball'
```

**Características:**
- ✅ Dados em tempo real via HTTP polling
- ✅ Cobertura completa de competições
- ✅ Estatísticas detalhadas
- ⚠️ Requer API key (plano gratuito limitado)
- 📚 [Documentação](https://www.api-football.com/documentation-v3)

**Setup:**
1. Criar conta em [RapidAPI](https://rapidapi.com/)
2. Inscrever-se em [API-Football](https://rapidapi.com/api-sports/api/api-football)
3. Copiar API key
4. Editar `js/api-config.js`:
```javascript
apiFootball: {
    headers: {
        'X-RapidAPI-Key': 'SUA_API_KEY_AQUI',
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
}
```

**Limites do Plano Gratuito:**
- 100 requisições/dia
- Atualização a cada 30 segundos

---

### 2. Football-Data.org 🆓 GRATUITO

**Melhor para:** Projetos pessoais e educacionais

```javascript
API_CONFIG.active = 'footballData'
```

**Características:**
- ✅ Totalmente gratuito
- ✅ Sem limite de requisições (com rate limit)
- ✅ Dados confiáveis
- ⚠️ Cobertura limitada de competições
- 📚 [Documentação](https://www.football-data.org/documentation/quickstart)

**Setup:**
1. Criar conta em [Football-Data.org](https://www.football-data.org/)
2. Obter API token gratuito
3. Editar `js/api-config.js`:
```javascript
footballData: {
    headers: {
        'X-Auth-Token': 'SEU_TOKEN_AQUI'
    }
}
```

**Limites:**
- 10 requisições/minuto
- Atualização a cada 60 segundos

---

### 3. TheSportsDB 🎮 TESTE GRATUITO

**Melhor para:** Testes rápidos sem cadastro

```javascript
API_CONFIG.active = 'theSportsDB'
```

**Características:**
- ✅ Chave de teste pública disponível
- ✅ Sem necessidade de cadastro inicial
- ✅ Fácil de começar
- ⚠️ Dados podem estar desatualizados
- 📚 [Documentação](https://www.thesportsdb.com/api.php)

**Setup:**
```javascript
// Usar chave de teste (limitada)
theSportsDB: {
    apiKey: '3' // Chave de teste pública
}
```

**Para produção:**
1. Criar conta em [TheSportsDB](https://www.thesportsdb.com/)
2. Obter API key premium
3. Atualizar `apiKey` no config

---

### 4. FIFA Official API 🏆 OFICIAL

**Melhor para:** Dados oficiais durante a Copa

```javascript
API_CONFIG.active = 'fifaOfficial'
```

**Características:**
- ✅ Dados oficiais da FIFA
- ✅ API HTTP
- ✅ Gratuito
- ⚠️ Disponível apenas durante competições oficiais
- 📚 [Site FIFA](https://www.fifa.com/)

**Nota:** Esta API é ativada pela FIFA durante eventos oficiais. Em 2026, durante a Copa do Mundo, estará disponível automaticamente.

---

## 🔌 WebSocket Dedicado (Produção)

### Opção: Criar Seu Próprio Servidor

**Para produção profissional**, recomendamos criar um servidor WebSocket próprio:

**Tecnologias sugeridas:**
- **Node.js + Socket.io**
- **Python + websockets**
- **Go + gorilla/websocket**

**Exemplo básico (Node.js):**
```javascript
// server.js
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    // Conectar a APIs externas
    // Processar dados
    // Enviar para clientes
    ws.send(JSON.stringify({
        type: 'live_score',
        payload: { /* dados */ }
    }));
});
```

**Configurar no dashboard:**
```javascript
// js/api-config.js
API_CONFIG.active = 'custom'
API_CONFIG.apis.custom = {
    name: 'Meu Servidor',
    websocket: 'wss://meu-servidor.com/ws'
}
```

---

## 🔄 Como Funciona o Polling HTTP

Quando uma API não tem WebSocket, usamos **HTTP Polling**:

```
Dashboard → API (a cada 30-60s)
    ↓
Recebe dados
    ↓
Atualiza interface
```

**Vantagens:**
- ✅ Funciona com qualquer API REST
- ✅ Mais simples de implementar
- ✅ Compatível com planos gratuitos

**Desvantagens:**
- ⚠️ Não é instantâneo (delay de 30-60s)
- ⚠️ Consome mais requisições

---

## 🚀 Recomendações por Caso de Uso

### Desenvolvimento/Testes
```javascript
API_CONFIG.active = 'mock'
```
✅ Servidor mock local
✅ Sem custos
✅ Dados simulados

### Projeto Pessoal/Educacional
```javascript
API_CONFIG.active = 'footballData'
```
✅ Gratuito
✅ Dados reais
✅ Fácil setup

### Projeto Profissional
```javascript
API_CONFIG.active = 'apiFootball'
```
✅ Dados completos
✅ Alta confiabilidade
💰 Plano pago recomendado

### Durante a Copa 2026
```javascript
API_CONFIG.active = 'fifaOfficial'
```
✅ Dados oficiais
✅ API HTTP
✅ Gratuito

---

## 📝 Configuração Passo a Passo

### 1. Escolher Fonte de Dados

Edite `js/api-config.js`:
```javascript
API_CONFIG.active = 'footballData' // ou outra opção
```

### 2. Configurar Credenciais (se necessário)

```javascript
footballData: {
    headers: {
        'X-Auth-Token': 'SUA_API_KEY_AQUI'
    }
}
```

### 3. Testar Conexão

Abra o console do navegador (F12):
```javascript
console.log(worldCupWS.getConnectionState());
```

### 4. Verificar Logs

```
✅ API Configuration loaded
📡 Active API: footballData
🔄 Starting HTTP polling every 60000ms
```

---

## 🔍 Troubleshooting

### Problema: "API não responde"

**Solução:** Verifique se `API_CONFIG.active` está configurado corretamente.

### Problema: "401 Unauthorized"

**Solução:** Verifique suas credenciais de API.

### Problema: "Rate limit exceeded"

**Solução:** Aumente o `pollInterval` ou faça upgrade do plano.

### Problema: Dados não atualizam

**Solução:** 
1. Verifique console do navegador
2. Confirme que a API está respondendo
3. Verifique se o polling está ativo

---

## 💡 Dicas de Otimização

### 1. Cache de Dados
```javascript
// Evitar requisições desnecessárias
const cache = new Map();
const CACHE_TTL = 30000; // 30 segundos
```

### 2. Polling Inteligente
```javascript
// Polling mais frequente durante jogos ao vivo
const interval = hasLiveMatches ? 15000 : 60000;
```

### 3. Fallback Automático
```javascript
// Se API principal falhar, usar backup
if (primaryAPI.failed) {
    API_CONFIG.active = 'backup';
}
```

---

## 📚 Recursos Adicionais

- [SETUP_API_FOOTBALL.md](SETUP_API_FOOTBALL.md) - Configuração de API
- [README.md](README.md) - Visão geral do projeto
- [COMO_EXECUTAR.md](COMO_EXECUTAR.md) - Como executar

---

## 🤝 Contribuindo

Conhece outra API boa para dados de futebol? Contribua adicionando em `js/api-config.js`!

---

**Made with Bob** 🤖

Última atualização: 2026-06-17