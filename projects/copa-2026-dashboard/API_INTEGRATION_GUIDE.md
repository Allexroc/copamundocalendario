# Guia de Integração com API REST - Dashboard Copa 2026

## Visão Geral

O dashboard agora está totalmente integrado com a API REST do Football-Data.org para obter dados em tempo real da Copa do Mundo FIFA 2026.

---

## 🔌 Componentes da Integração

### 1. Módulo de Integração (`js/api-integration.js`)

Módulo principal que gerencia toda a comunicação com a API REST.

**Funcionalidades:**
- ✅ Busca dados da API Football-Data.org
- ✅ Converte dados da API para formato do dashboard
- ✅ Calcula classificações dos grupos automaticamente
- ✅ Mescla dados da API com dados locais
- ✅ Gerencia estado de conexão e loading

**Configuração:**
```javascript
const APIIntegration = {
    apiKey: '093dce6688974c83ad7a4adae69e5cfd',
    baseUrl: 'https://api.football-data.org/v4',
    // ...
}
```

---

## 🎯 Funcionalidades Implementadas

### 1. Botão "Atualizar" com API Real

**Localização:** Cabeçalho do dashboard

**Comportamento:**
1. Usuário clica no botão "Atualizar"
2. Sistema mostra status "Buscando dados da API..."
3. Faz requisição para `https://api.football-data.org/v4/competitions/WC/matches`
4. Converte dados para formato do dashboard
5. Atualiza todas as views automaticamente
6. Exibe mensagem de sucesso com horário da atualização

**Código:**
```javascript
// Em app.js
refreshButton.addEventListener('click', async () => {
    const success = await APIIntegration.updateDashboard();
    if (success) {
        // Recarrega todas as views
        renderGroups();
        renderCalendar();
        renderResults();
        // ...
    }
});
```

---

### 2. Badge de Status da API

**Localização:** Cabeçalho do dashboard (ao lado do botão Atualizar)

**Estados:**
- 🟢 **Conectado** (verde) - API respondendo normalmente
- 🔴 **Desconectado** (vermelho) - Sem conexão com a API
- 🟡 **Carregando** (amarelo) - Buscando dados da API

**Atualização Automática:**
- Verifica status a cada 30 segundos
- Atualiza automaticamente durante operações de refresh

---

### 3. Conversão de Dados da API

**Mapeamento de Times:**
```javascript
teamMapping: {
    'MEX': 'MEX', 'RSA': 'RSA', 'KOR': 'KOR', 'CZE': 'CZE',
    'CAN': 'CAN', 'BIH': 'BIH', 'QAT': 'QAT', 'SUI': 'SUI',
    // ... todos os 48 times
}
```

**Mapeamento de Grupos:**
```javascript
groupMapping: {
    'GROUP_A': 'A', 'GROUP_B': 'B', 'GROUP_C': 'C', 'GROUP_D': 'D',
    'GROUP_E': 'E', 'GROUP_F': 'F', 'GROUP_G': 'G', 'GROUP_H': 'H',
    'GROUP_I': 'I', 'GROUP_J': 'J', 'GROUP_K': 'K', 'GROUP_L': 'L'
}
```

**Conversão de Status:**
- `FINISHED` → `finished`
- `IN_PLAY` / `PAUSED` → `live`
- `SCHEDULED` / `TIMED` → `scheduled`

---

### 4. Cálculo Automático de Classificações

O sistema calcula automaticamente as classificações dos grupos baseado nos resultados:

**Critérios de Ordenação:**
1. Pontos (vitória = 3, empate = 1, derrota = 0)
2. Saldo de gols
3. Gols marcados

**Estatísticas Calculadas:**
- Jogos disputados
- Vitórias, empates, derrotas
- Gols marcados e sofridos
- Saldo de gols
- Pontos totais

---

## 📊 Dados Exibidos no Frontend

### Informações Atualizadas Automaticamente:

1. **Classificação dos Grupos**
   - Posição de cada time
   - Estatísticas completas
   - Atualização em tempo real

2. **Partidas**
   - Resultados finalizados
   - Jogos ao vivo (com minuto)
   - Próximos jogos agendados

3. **Datas e Horários**
   - Formato: DD/MM/YYYY
   - Timezone: UTC-3 (Brasília)
   - Conversão automática de UTC

4. **Status da Partida**
   - Finalizado
   - Ao vivo (com minuto do jogo)
   - Agendado

---

## 🔄 Fluxo de Atualização

```
┌─────────────────┐
│ Usuário clica   │
│ em "Atualizar"  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Badge: Loading  │
│ Status: Buscando│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ API Request     │
│ Football-Data   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Converter Dados │
│ Calcular Tabelas│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Atualizar Views │
│ - Grupos        │
│ - Calendário    │
│ - Resultados    │
│ - Estatísticas  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Badge: Connected│
│ Status: ✓ Hora  │
└─────────────────┘
```

---

## 🎨 Indicadores Visuais

### Badge de Status da API

**CSS Classes:**
```css
.api-status-badge.connected {
    background: rgba(76, 175, 80, 0.2);
    color: #4CAF50;
}

.api-status-badge.disconnected {
    background: rgba(244, 67, 54, 0.2);
    color: #f44336;
}

.api-status-badge.loading {
    background: rgba(255, 193, 7, 0.2);
    color: #FFC107;
}
```

### Status de Atualização

**Estados:**
- `loading` - Amarelo, ícone girando
- `success` - Verde, com horário
- `error` - Vermelho, mensagem de erro

---

## 🔧 Configuração da API

### Chave da API
```javascript
apiKey: '093dce6688974c83ad7a4adae69e5cfd'
```

### Endpoint Base
```javascript
baseUrl: 'https://api.football-data.org/v4'
```

### Endpoint de Partidas
```
GET /competitions/WC/matches
Headers: {
    'X-Auth-Token': 'sua-chave-aqui',
    'Accept': 'application/json'
}
```

---

## 📱 Responsividade

Todos os componentes da API são responsivos:
- Badge de status adapta-se a telas pequenas
- Botão de atualização mantém funcionalidade em mobile
- Mensagens de status são legíveis em todos os tamanhos

---

## 🐛 Tratamento de Erros

### Erros Capturados:

1. **Erro de Rede**
   - Mensagem: "✗ Erro ao atualizar. Verifique sua conexão."
   - Badge: Desconectado (vermelho)

2. **Erro de API**
   - Log no console com detalhes
   - Mensagem amigável ao usuário
   - Badge atualizado para desconectado

3. **Timeout**
   - Requisição com timeout padrão do fetch
   - Tratamento automático de falhas

---

## 📈 Estatísticas Exibidas

Após cada atualização, o console mostra:
```
📊 Estatísticas da atualização:
   Finalizadas: 22
   Ao vivo: 0
   Agendadas: 82
   Total: 104
```

---

## 🔐 Segurança

- ✅ Chave da API no frontend (pública)
- ✅ CORS habilitado pela API
- ✅ HTTPS obrigatório
- ✅ Validação de dados recebidos

**Nota:** Para produção, considere mover a chave da API para variáveis de ambiente e usar um backend proxy.

---

## 🚀 Como Usar

### 1. Abrir o Dashboard
```bash
# Abra o index.html no navegador
open index.html
```

### 2. Atualizar Dados
- Clique no botão "Atualizar" no cabeçalho
- Aguarde a mensagem de sucesso
- Dados serão atualizados automaticamente

### 3. Verificar Status
- Observe o badge "API" no cabeçalho
- Verde = Conectado
- Vermelho = Desconectado
- Amarelo = Carregando

---

## 📝 Arquivos Modificados

1. **Novos Arquivos:**
   - `js/api-integration.js` - Módulo de integração com API

2. **Arquivos Modificados:**
   - `index.html` - Adicionado badge de status e script
   - `js/app.js` - Integração com API no botão atualizar
   - `css/styles.css` - Estilos do badge de status

---

## 🎯 Próximos Passos (Opcional)

1. **Auto-refresh**
   - Atualização automática a cada X minutos
   - Configurável pelo usuário

2. **Notificações**
   - Alertas de novos resultados
   - Notificações de jogos ao vivo

3. **Cache**
   - Armazenar dados localmente
   - Reduzir chamadas à API

4. **Backend Proxy**
   - Proteger chave da API
   - Rate limiting
   - Cache server-side

---

## 📞 Suporte

Para problemas com a API:
- Documentação: https://www.football-data.org/documentation/quickstart
- Limites: 10 requisições/minuto (plano gratuito)
- Suporte: https://www.football-data.org/support

---

*Última atualização: 18/06/2026 às 20:12 BRT*