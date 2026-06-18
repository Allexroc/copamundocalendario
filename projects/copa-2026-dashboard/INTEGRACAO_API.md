# Integração com WorldCup26.ir API

## 📋 Visão Geral

O dashboard foi reestruturado para integrar a API pública **https://worldcup26.ir/get/games**, que fornece dados em tempo real dos jogos da Copa do Mundo 2026.

## 🔧 Arquitetura

### Módulo Principal: `worldcup-api.js`

O novo módulo `worldcup-api.js` é responsável por:

- ✅ Buscar dados da API usando `fetch` com `async/await`
- ✅ Atualização automática a cada 10 minutos
- ✅ Botão "Atualizar Agora" para atualização manual
- ✅ Exibição de data/hora da última atualização
- ✅ Tratamento robusto de erros
- ✅ Indicador visual de loading
- ✅ Conversão de dados da API para formato interno
- ✅ Cálculo automático de classificações

## 🚀 Funcionalidades

### 1. Atualização Automática

```javascript
WorldCupAPI.startAutoRefresh();
```

- Atualiza dados automaticamente a cada **10 minutos**
- Primeira atualização ocorre imediatamente ao carregar a página
- Pode ser parada com `WorldCupAPI.stopAutoRefresh()`

### 2. Atualização Manual

```javascript
WorldCupAPI.updateData(true);
```

- Botão "Atualizar Agora" no header
- Feedback visual durante o carregamento
- Mensagem de sucesso/erro após conclusão

### 3. Exibição de Status

O sistema exibe:
- ⏳ "Buscando dados da API..." durante carregamento
- ✅ "Última atualização: DD/MM/YYYY às HH:MM:SS" após sucesso
- ❌ "Erro: [mensagem]" em caso de falha

### 4. Tratamento de Erros

```javascript
try {
    const data = await WorldCupAPI.fetchGames();
} catch (error) {
    // Erro tratado e exibido ao usuário
    console.error('Erro:', error);
}
```

Erros tratados:
- Falha de conexão
- Timeout
- Resposta HTTP inválida
- Dados malformados
- CORS issues

## 📊 Formato de Dados

### Entrada (API)

```json
{
  "games": [
    {
      "id": 1,
      "date": "2026-06-11T19:00:00",
      "group": "Group A",
      "homeTeam": "Mexico",
      "awayTeam": "South Africa",
      "homeScore": 2,
      "awayScore": 0,
      "stadium": "Estadio Azteca",
      "status": "finished",
      "phase": "group",
      "round": 1
    }
  ],
  "topScorers": [...],
  "topAssists": [...]
}
```

### Saída (Formato Interno)

```javascript
{
  matches: [
    {
      id: 1,
      date: "2026-06-11T19:00:00",
      group: "A",
      homeTeam: "MEX",
      awayTeam: "RSA",
      homeScore: 2,
      awayScore: 0,
      stadium: "Estadio Azteca",
      status: "finished",
      phase: "group",
      round: 1,
      minute: null,
      lastUpdated: "2026-06-18T19:00:00.000Z"
    }
  ],
  standings: {
    "A": [
      {
        team: "MEX",
        played: 1,
        won: 1,
        drawn: 0,
        lost: 0,
        goalsFor: 2,
        goalsAgainst: 0,
        points: 3
      }
    ]
  },
  topScorers: [...],
  topAssists: [...]
}
```

## 🔄 Conversão de Dados

### Normalização de Times

O sistema mapeia nomes de times para códigos de 3 letras:

```javascript
'Mexico' → 'MEX'
'Brazil' → 'BRA'
'United States' → 'USA'
// ... etc
```

### Status de Jogos

```javascript
'scheduled' → 'scheduled'
'live' → 'live'
'finished' / 'ft' → 'finished'
'postponed' → 'postponed'
'cancelled' → 'cancelled'
```

### Cálculo de Classificação

O sistema calcula automaticamente:
- Jogos disputados
- Vitórias, empates, derrotas
- Gols marcados e sofridos
- Pontos (3 por vitória, 1 por empate)
- Ordenação por: pontos → saldo de gols → gols marcados

## 🎨 Interface do Usuário

### Botão de Atualização

```html
<button class="refresh-btn" id="refreshMatchesButton">
    <i class="fas fa-rotate-right"></i>
    Atualizar Agora
</button>
```

Estados:
- Normal: Ícone de refresh + "Atualizar Agora"
- Loading: Spinner + "Atualizando..."
- Desabilitado durante carregamento

### Status de Atualização

```html
<span class="refresh-status" id="refreshStatus">
    Última atualização: 18/06/2026 às 16:30:45
</span>
```

Classes CSS:
- `.refresh-status.loading` - Azul (carregando)
- `.refresh-status.success` - Verde (sucesso)
- `.refresh-status.error` - Vermelho (erro)
- `.refresh-status.info` - Cinza (informação)

## 🔌 Integração com Sistema Existente

### Funções Utilizadas

O módulo se integra com as funções existentes:

```javascript
// De data.js
replaceAllMatches(matches)
replaceGroupStandings(standings)
updateTopScorers(scorers)
updateTopAssists(assists)

// De app.js
refreshAllViews()
updateSidebarInfo()
```

### Inicialização

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // ... outras inicializações
    
    if (typeof WorldCupAPI !== 'undefined') {
        WorldCupAPI.startAutoRefresh();
    }
});
```

## 🧪 Testando a Integração

### 1. Teste Manual

1. Abra o dashboard no navegador
2. Observe a mensagem "Buscando dados da API..."
3. Aguarde a conclusão (deve mostrar "Última atualização: ...")
4. Clique em "Atualizar Agora"
5. Verifique se os dados são atualizados

### 2. Teste de Erro

1. Desconecte a internet
2. Clique em "Atualizar Agora"
3. Deve exibir mensagem de erro
4. Reconecte e tente novamente

### 3. Console do Navegador

```javascript
// Verificar última atualização
WorldCupAPI.lastUpdate

// Tempo desde última atualização
WorldCupAPI.getTimeSinceLastUpdate()

// Forçar atualização
WorldCupAPI.updateData(true)

// Parar atualização automática
WorldCupAPI.stopAutoRefresh()

// Reiniciar atualização automática
WorldCupAPI.startAutoRefresh()
```

## 📝 Logs

O sistema registra logs detalhados no console:

```
✅ WorldCup API module loaded
🔄 Buscando dados da API WorldCup26.ir...
✅ Dados recebidos com sucesso
✅ Atualização automática configurada (10 minutos)
🔄 Atualização automática iniciada...
```

## 🚨 Troubleshooting

### Problema: Dados não atualizam

**Solução:**
1. Verifique o console do navegador
2. Confirme que `worldcup-api.js` está carregado
3. Verifique se há erros de CORS
4. Teste a API diretamente: https://worldcup26.ir/get/games

### Problema: Erro de CORS

**Solução:**
- A API deve ter CORS habilitado
- Se necessário, use um proxy local
- Verifique headers da requisição

### Problema: Atualização automática não funciona

**Solução:**
```javascript
// No console do navegador
WorldCupAPI.stopAutoRefresh()
WorldCupAPI.startAutoRefresh()
```

## 🔐 Segurança

- ✅ Não requer autenticação
- ✅ API pública e gratuita
- ✅ Sem armazenamento de dados sensíveis
- ✅ Requisições HTTPS

## 📦 Arquivos Modificados

1. **Criado:** `js/worldcup-api.js` - Novo módulo de integração
2. **Modificado:** `js/app.js` - Integração com novo módulo
3. **Modificado:** `index.html` - Inclusão do novo script
4. **Mantido:** `js/data.js` - Estrutura de dados preservada

## 🎯 Próximos Passos

- [ ] Adicionar cache local (localStorage)
- [ ] Implementar retry automático em caso de falha
- [ ] Adicionar métricas de performance
- [ ] Criar testes automatizados
- [ ] Adicionar suporte a WebSocket (se disponível)

## 📚 Referências

- API: https://worldcup26.ir/get/games
- Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- Async/Await: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

---

**Última atualização:** 18/06/2026
**Versão:** 2.0.0
**Autor:** Bob