# 🌍 Guia de Conversão de Timezone - Copa 2026

## 📋 Resumo

Este documento descreve como o sistema converte automaticamente as datas e horários dos jogos da API (formato UTC) para o horário de Brasília (UTC-3).

## 🎯 Objetivo

Garantir que todos os horários dos jogos sejam exibidos no **horário de Brasília (America/Sao_Paulo, UTC-3)**, independentemente do timezone do servidor ou da API.

## 🔧 Implementação

### 1. Conversão na API Integration

**Arquivo:** [`js/api-integration.js`](js/api-integration.js:93-120)

A conversão acontece no método `convertAPIData()`:

```javascript
// Converter data UTC para horário de Brasília (UTC-3)
const utcDate = new Date(apiMatch.utcDate);

// Obter componentes da data em UTC
const utcYear = utcDate.getUTCFullYear();
const utcMonth = utcDate.getUTCMonth();
const utcDay = utcDate.getUTCDate();
const utcHours = utcDate.getUTCHours();
const utcMinutes = utcDate.getUTCMinutes();
const utcSeconds = utcDate.getUTCSeconds();

// Criar data em UTC e ajustar para Brasília (UTC-3)
const brasiliaDate = new Date(Date.UTC(utcYear, utcMonth, utcDay, utcHours, utcMinutes, utcSeconds));
brasiliaDate.setHours(brasiliaDate.getHours() - 3); // Ajustar para UTC-3

// Formatar como YYYY-MM-DDTHH:mm:ss-03:00
const year = brasiliaDate.getUTCFullYear();
const month = String(brasiliaDate.getUTCMonth() + 1).padStart(2, '0');
const day = String(brasiliaDate.getUTCDate()).padStart(2, '0');
const hours = String(brasiliaDate.getUTCHours()).padStart(2, '0');
const minutes = String(brasiliaDate.getUTCMinutes()).padStart(2, '0');
const seconds = String(brasiliaDate.getUTCSeconds()).padStart(2, '0');

const dateStr = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}-03:00`;
```

### 2. Exibição no Calendário

**Arquivo:** [`js/matches.js`](js/matches.js:66-70)

A exibição dos horários usa `toLocaleTimeString` com timezone de Brasília:

```javascript
const time = new Date(match.date).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo'
});
```

### 3. Formatação de Datas

**Arquivo:** [`js/matches.js`](js/matches.js:323-342)

A função `formatDate()` garante que as datas sejam exibidas no timezone correto:

```javascript
function formatDate(date) {
    const options = {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        timeZone: 'America/Sao_Paulo'
    };
    return date.toLocaleDateString('pt-BR', options);
}
```

## 📊 Exemplo de Conversão

### Entrada (API - UTC)
```
2026-06-11T18:00:00Z
```

### Processamento
1. Parse da data UTC: `2026-06-11 18:00:00 UTC`
2. Subtração de 3 horas: `2026-06-11 15:00:00`
3. Formatação com timezone: `2026-06-11T15:00:00-03:00`

### Saída (Dashboard - Brasília)
```
Data: 11/06/2026
Hora: 15:00
Timezone: America/Sao_Paulo (UTC-3)
```

## 🧪 Testes

### Teste Manual

Um arquivo de teste foi criado para verificar a conversão:

**Arquivo:** [`test-timezone-conversion.html`](test-timezone-conversion.html)

Para executar o teste:

1. Certifique-se de que o servidor está rodando:
   ```bash
   npx http-server -p 8000
   ```

2. Abra no navegador:
   ```
   http://localhost:8000/test-timezone-conversion.html
   ```

3. Clique em "Executar Teste Manual" para verificar a conversão
4. Clique em "Buscar Dados da API" para testar com dados reais

### Verificações Automáticas

O teste verifica:
- ✅ Conversão correta de UTC para Brasília (UTC-3)
- ✅ Formatação de data e hora em português brasileiro
- ✅ Consistência entre dados da API e exibição
- ✅ Timezone do navegador vs. timezone configurado

## 🔍 Pontos Importantes

### 1. Por que não usar `toLocaleString()` diretamente?

❌ **Problema:**
```javascript
// INCORRETO - pode causar problemas de timezone
const brasiliaDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
```

✅ **Solução:**
```javascript
// CORRETO - conversão manual garantida
const brasiliaDate = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
brasiliaDate.setHours(brasiliaDate.getHours() - 3);
```

### 2. Formato de Armazenamento

As datas são armazenadas no formato ISO 8601 com timezone:
```
YYYY-MM-DDTHH:mm:ss-03:00
```

Exemplo: `2026-06-11T15:00:00-03:00`

### 3. Exibição Consistente

Todas as funções de exibição usam:
- `timeZone: 'America/Sao_Paulo'`
- Locale: `'pt-BR'`

## 📝 Logs de Conversão

O sistema registra cada conversão no console:

```javascript
console.log(`🕐 Conversão: ${apiMatch.utcDate} (UTC) → ${dateStr} (Brasília)`);
```

Exemplo de log:
```
🕐 Conversão: 2026-06-11T18:00:00Z (UTC) → 2026-06-11T15:00:00-03:00 (Brasília)
```

## 🌐 Suporte a Diferentes Timezones

O sistema foi projetado para funcionar corretamente independentemente do timezone do:
- Servidor (pode estar em qualquer timezone)
- Navegador do usuário (pode estar em qualquer timezone)
- API (sempre retorna UTC)

**Resultado:** Todos os usuários veem os horários em **Brasília (UTC-3)**.

## 🔄 Atualização Automática

O sistema atualiza automaticamente os dados da API e mantém a conversão de timezone:

1. **Cache Local:** 5 minutos
2. **Atualização da API:** Sob demanda
3. **Conversão:** Automática em cada atualização

## 📱 Compatibilidade

A implementação é compatível com:
- ✅ Todos os navegadores modernos
- ✅ Dispositivos móveis (iOS, Android)
- ✅ Diferentes sistemas operacionais
- ✅ Diferentes configurações de timezone do usuário

## 🚀 Como Usar

### Para Desenvolvedores

1. **Buscar dados da API:**
   ```javascript
   const apiData = await APIIntegration.fetchMatches();
   ```

2. **Converter para formato do dashboard:**
   ```javascript
   const convertedData = APIIntegration.convertAPIData(apiData);
   ```

3. **As datas já estarão em horário de Brasília!**

### Para Usuários

Os horários são exibidos automaticamente em horário de Brasília em:
- 📅 Calendário de jogos
- 🏆 Resultados
- 📊 Estatísticas
- 🔴 Jogos ao vivo

## 🐛 Troubleshooting

### Problema: Horários incorretos

**Solução:**
1. Limpe o cache do navegador
2. Verifique se o proxy está rodando: `node proxy-server.js`
3. Verifique os logs no console do navegador

### Problema: Timezone diferente

**Solução:**
1. Verifique se o código usa `timeZone: 'America/Sao_Paulo'`
2. Não confie no timezone do sistema
3. Sempre use a conversão manual implementada

## 📚 Referências

- [MDN - Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [MDN - Intl.DateTimeFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)
- [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
- [IANA Time Zone Database](https://www.iana.org/time-zones)

## ✅ Checklist de Implementação

- [x] Conversão UTC → Brasília implementada
- [x] Formatação de data em português brasileiro
- [x] Formatação de hora em português brasileiro
- [x] Testes de conversão criados
- [x] Logs de conversão implementados
- [x] Documentação completa
- [x] Compatibilidade com todos os navegadores
- [x] Cache local implementado
- [x] Atualização automática funcionando

## 🎉 Conclusão

O sistema agora converte automaticamente todos os horários da API (UTC) para o horário de Brasília (UTC-3), garantindo que todos os usuários vejam os horários corretos dos jogos da Copa do Mundo 2026.

---

**Última atualização:** 23/06/2026
**Versão:** 1.0.0
**Autor:** Bob - IBM Assistant