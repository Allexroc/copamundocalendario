# 🚀 Configuração Rápida - API-Football

## 📋 Passo a Passo

### 1. Criar Conta no RapidAPI

1. Acesse [RapidAPI](https://rapidapi.com/)
2. Clique em "Sign Up" (canto superior direito)
3. Crie sua conta (pode usar Google/GitHub)

### 2. Inscrever-se na API-Football

1. Acesse [API-Football no RapidAPI](https://rapidapi.com/api-sports/api/api-football)
2. Clique em "Subscribe to Test"
3. Escolha um plano:
   - **Basic (Gratuito)**: 100 requisições/dia
   - **Pro**: 1.000 requisições/dia
   - **Ultra**: 10.000 requisições/dia
   - **Mega**: Ilimitado

### 3. Obter sua API Key

1. Após se inscrever, você verá sua API Key na página
2. Copie o valor de `X-RapidAPI-Key`

Exemplo:
```
X-RapidAPI-Key: abc123def456ghi789jkl012mno345pqr
```

### 4. Configurar no Dashboard

Edite o arquivo [`js/api-config.js`](js/api-config.js):

```javascript
// Linha 16 - Cole sua API Key aqui
apiFootball: {
    name: 'API-Football',
    baseUrl: 'https://api-football-v1.p.rapidapi.com/v3',
    polling: true,
    pollInterval: 30000, // 30 segundos
    endpoints: {
        fixtures: '/fixtures',
        standings: '/standings',
        topScorers: '/players/topscorers',
        liveMatches: '/fixtures?live=all'
    },
    headers: {
        'X-RapidAPI-Key': 'COLE_SUA_API_KEY_AQUI', // <-- AQUI!
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    },
    requiresAuth: true,
    free: false,
    documentation: 'https://www.api-football.com/documentation-v3'
}
```

### 5. Verificar Configuração

Abra o arquivo [`js/api-config.js`](js/api-config.js) e confirme:

```javascript
// Linha 88 - Deve estar assim:
API_CONFIG.active = 'apiFootball'
```

### 6. Testar

1. Abra `index.html` no navegador
2. Abra o Console (F12)
3. Você deve ver:

```
✅ API Configuration loaded
📡 Active API: apiFootball
✅ API-Football Adapter initialized
🔄 Starting HTTP polling every 30000ms
🔄 Fetching data from API...
```

## 🔍 Verificar se Está Funcionando

### Console do Navegador

Abra o console (F12) e execute:

```javascript
// Verificar configuração
console.log(API_CONFIG.active);
// Deve mostrar: "apiFootball"

// Verificar adapter
console.log(apiFootballAdapter);
// Deve mostrar o objeto do adapter

// Testar busca manual
apiFootballAdapter.getLiveMatches().then(matches => {
    console.log('Partidas ao vivo:', matches);
});
```

### Logs Esperados

```
✅ API Configuration loaded
📡 Active API: apiFootball
✅ API-Football Adapter initialized
🔄 API-Football uses HTTP polling
🔄 Starting HTTP polling service
🔄 Fetching data from API...
⚽ 3 live matches found
📊 Standings updated for 12 groups
🏆 10 top scorers updated
🎯 5 top assists updated
```

## ⚠️ Troubleshooting

### Erro: "401 Unauthorized"

**Problema**: API Key inválida ou não configurada

**Solução**:
1. Verifique se copiou a API Key corretamente
2. Confirme que está inscrito na API-Football
3. Verifique se não há espaços extras na key

### Erro: "429 Too Many Requests"

**Problema**: Limite de requisições excedido

**Solução**:
1. Plano gratuito: 100 req/dia
2. Aumente o `pollInterval` para 60000 (60 segundos)
3. Ou faça upgrade do plano

```javascript
// Em api-config.js, linha 20
pollInterval: 60000, // Aumentar para 60 segundos
```

### Erro: "Network Error" ou "CORS"

**Problema**: Bloqueio de CORS ou rede

**Solução**:
1. Use um servidor local (não abra direto do arquivo)
2. Exemplo com Python:
```bash
python -m http.server 8000
# Acesse: http://localhost:8000
```

### Nenhum Dado Aparece

**Problema**: API pode não ter dados da Copa 2026 ainda

**Solução**:
1. A Copa 2026 ainda não começou
2. Use o servidor mock para testes:

```javascript
// Em api-config.js, linha 88
API_CONFIG.active = 'mock'
```

3. Inicie o servidor mock:
```bash
# Não é mais necessário - use apenas dados estáticos ou API HTTP
```

## 📊 Limites do Plano Gratuito

| Recurso | Limite |
|---------|--------|
| Requisições/dia | 100 |
| Requisições/segundo | 10 |
| Endpoints | Todos |
| Suporte | Comunidade |

**Cálculo de Uso:**
- Polling a cada 30s = 2 req/min
- 2 req/min × 60 min = 120 req/hora
- **Limite atingido em ~50 minutos**

**Recomendação**: Aumente o intervalo para 60s ou mais:

```javascript
pollInterval: 60000, // 60 segundos = 1440 req/dia
```

## 🎯 Otimizações

### 1. Polling Inteligente

Edite [`js/app.js`](js/app.js):

```javascript
function startAutoRefresh() {
    // Polling mais frequente durante jogos ao vivo
    const liveMatches = getLiveMatches();
    const interval = liveMatches.length > 0 ? 30000 : 120000;
    
    setInterval(() => {
        const live = getLiveMatches();
        if (live.length > 0) {
            refreshCurrentView();
        }
    }, interval);
}
```

### 2. Cache de Dados

```javascript
// Evitar requisições desnecessárias
const cache = {
    standings: null,
    lastUpdate: null,
    ttl: 300000 // 5 minutos
};

if (cache.standings && Date.now() - cache.lastUpdate < cache.ttl) {
    return cache.standings;
}
```

### 3. Fallback para Mock

```javascript
// Se API falhar, usar mock
try {
    const data = await apiFootballAdapter.getLiveMatches();
} catch (error) {
    console.warn('API failed, using mock data');
    API_CONFIG.active = 'mock';
}
```

## 📚 Recursos Adicionais

- [Documentação API-Football](https://www.api-football.com/documentation-v3)
- [RapidAPI Dashboard](https://rapidapi.com/developer/dashboard)
- [API_SOURCES.md](API_SOURCES.md) - Outras opções de API
- [WEBSOCKET_GUIDE.md](WEBSOCKET_GUIDE.md) - Guia técnico completo

## 💡 Dicas

1. **Desenvolvimento**: Use o servidor mock
2. **Testes**: Use plano gratuito com polling de 60s
3. **Produção**: Considere plano pago para polling de 30s
4. **Economia**: Implemente cache e polling inteligente

## 🆘 Suporte

Se tiver problemas:

1. Verifique o console do navegador (F12)
2. Consulte [API_SOURCES.md](API_SOURCES.md)
3. Teste com servidor mock primeiro
4. Verifique sua cota no [RapidAPI Dashboard](https://rapidapi.com/developer/dashboard)

---

**Made with Bob** 🤖

Última atualização: 2026-06-17