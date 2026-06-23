# 🧪 Guia de Testes - Dashboard Copa 2026

## 📋 Objetivo

Testar todas as funcionalidades do dashboard, especialmente:
- Atualização automática a cada 60 minutos
- Conversão de horários para UTC-3 (Brasília)
- Exibição de resultados e classificações
- Contador regressivo

## 🚀 Como Executar os Testes

### Pré-requisitos

1. Navegador moderno (Chrome, Firefox, Edge, Safari)
2. Servidor local ou acesso ao dashboard hospedado
3. Console do navegador aberto (F12)

### Iniciar o Dashboard

**Opção 1: Servidor Local Simples**
```bash
# No diretório do projeto
cd projects/copa-2026-dashboard

# Python 3
python -m http.server 8000

# Ou Python 2
python -m SimpleHTTPServer 8000

# Ou Node.js (se tiver http-server instalado)
npx http-server -p 8000
```

**Opção 2: Live Server (VS Code)**
- Instalar extensão "Live Server"
- Clicar com botão direito em `index.html`
- Selecionar "Open with Live Server"

**Opção 3: Abrir Diretamente**
- Abrir `index.html` no navegador
- Nota: Algumas funcionalidades podem não funcionar devido a restrições CORS

### Acessar o Dashboard

Abrir no navegador: `http://localhost:8000`

## ✅ Checklist de Testes

### 1. Carregamento Inicial

- [ ] Página carrega sem erros no console
- [ ] Header exibe logo e título "FIFA World Cup 2026"
- [ ] Sidebar aparece com navegação e filtros
- [ ] Conteúdo principal exibe grupos ou calendário
- [ ] Footer aparece na parte inferior

**Como verificar:**
```javascript
// No console do navegador
console.log('WorldCupAPI carregado:', typeof WorldCupAPI !== 'undefined');
console.log('Dados carregados:', typeof WORLD_CUP_2026 !== 'undefined');
```

### 2. Atualização Automática (60 minutos)

- [ ] Intervalo configurado para 60 minutos
- [ ] Mensagem no console: "Atualização automática configurada (60 minutos)"
- [ ] Botão "Atualizar Agora" visível e funcional

**Como verificar:**
```javascript
// Verificar intervalo
console.log('Intervalo:', WorldCupAPI.updateInterval / 60000, 'minutos');
// Deve exibir: 60

// Verificar se auto-refresh está ativo
console.log('Timer ativo:', WorldCupAPI.autoRefreshTimer !== null);
```

### 3. Contador Regressivo

- [ ] Elemento com ID `nextUpdateTimer` existe
- [ ] Contador atualiza a cada segundo
- [ ] Formato: "Próxima atualização em: MM:SS"
- [ ] Contador reinicia após atualização

**Como verificar:**
```javascript
// Verificar elemento
const timer = document.getElementById('nextUpdateTimer');
console.log('Timer encontrado:', timer !== null);
console.log('Texto atual:', timer?.textContent);

// Forçar atualização do contador
WorldCupAPI.updateCountdownDisplay();
```

### 4. Conversão de Horários UTC-3

- [ ] Todos os horários exibidos em formato brasileiro
- [ ] Formato: "DD/MM/YYYY às HH:MM"
- [ ] Indicação de fuso horário visível
- [ ] Horários corretos para Brasília (UTC-3)

**Como testar:**
```javascript
// Testar conversão
const testDate = "2026-06-22T20:00:00Z";
const converted = WorldCupAPI.convertToUTC3(testDate);
console.log('Data original (UTC):', testDate);
console.log('Data convertida (UTC-3):', converted.formatted);
console.log('Apenas hora:', converted.time);
```

### 5. Formatação de Datas de Partidas

- [ ] Partidas de hoje mostram "HOJE"
- [ ] Partidas de amanhã mostram "AMANHÃ"
- [ ] Outras datas mostram dia da semana
- [ ] Horário sempre visível

**Como testar:**
```javascript
// Testar com data de hoje
const today = new Date().toISOString();
const formatted = WorldCupAPI.formatMatchDate(today);
console.log('Label:', formatted.label); // Deve ser "HOJE"
console.log('Hora:', formatted.time);

// Testar com data de amanhã
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const formatted2 = WorldCupAPI.formatMatchDate(tomorrow.toISOString());
console.log('Label:', formatted2.label); // Deve ser "AMANHÃ"
```

### 6. Badges de Status

- [ ] Badge "AO VIVO" aparece para jogos em andamento
- [ ] Badge "ENCERRADO" aparece para jogos finalizados
- [ ] Badge "AGENDADO" aparece para jogos futuros
- [ ] Cores corretas (vermelho, verde, azul)

**Como testar:**
```javascript
// Testar badges
console.log('Live:', WorldCupAPI.getStatusBadge('live', 45));
console.log('Finished:', WorldCupAPI.getStatusBadge('finished'));
console.log('Scheduled:', WorldCupAPI.getStatusBadge('scheduled'));
```

### 7. Classificação dos Grupos

- [ ] 12 grupos exibidos (A-L)
- [ ] Cada grupo mostra 4 seleções
- [ ] Pontos calculados corretamente
- [ ] Ordenação por: pontos → saldo → gols marcados
- [ ] Indicadores visuais de classificação

**Como verificar:**
```javascript
// Verificar classificações
if (typeof WORLD_CUP_2026 !== 'undefined') {
    console.log('Grupos disponíveis:', Object.keys(WORLD_CUP_2026.groupStandings));
    console.log('Grupo A:', WORLD_CUP_2026.groupStandings.A);
}
```

### 8. Calendário de Jogos

- [ ] Lista de jogos exibida
- [ ] Filtros funcionando (grupo, data, seleção)
- [ ] Jogos ordenados por data
- [ ] Informações completas (times, placar, estádio)

**Como verificar:**
```javascript
// Verificar jogos
if (typeof WORLD_CUP_2026 !== 'undefined') {
    console.log('Total de jogos:', WORLD_CUP_2026.matches.length);
    console.log('Primeiro jogo:', WORLD_CUP_2026.matches[0]);
}
```

### 9. Estatísticas

- [ ] Artilharia exibida
- [ ] Assistências exibidas
- [ ] Cartões contabilizados
- [ ] Gráficos renderizados (se aplicável)

### 10. Atualização Manual

- [ ] Botão "Atualizar Agora" funciona
- [ ] Loading aparece durante atualização
- [ ] Mensagem de sucesso/erro exibida
- [ ] Dados atualizados na interface

**Como testar:**
```javascript
// Forçar atualização manual
WorldCupAPI.updateData(true);
```

### 11. Responsividade

- [ ] Layout adapta em tela pequena (< 768px)
- [ ] Menu hambúrguer funciona em mobile
- [ ] Sidebar colapsável em tablet
- [ ] Todos os elementos visíveis e acessíveis

**Como testar:**
- Redimensionar janela do navegador
- Usar DevTools para simular dispositivos móveis
- Testar em dispositivo real

### 12. Performance

- [ ] Página carrega em < 3 segundos
- [ ] Sem travamentos ao navegar
- [ ] Animações suaves
- [ ] Sem memory leaks

**Como verificar:**
```javascript
// Verificar performance
console.log('Performance:', performance.now(), 'ms');

// Verificar memória (Chrome)
console.memory && console.log('Memória usada:', 
    (console.memory.usedJSHeapSize / 1048576).toFixed(2), 'MB');
```

## 🐛 Problemas Comuns e Soluções

### Problema 1: "WorldCupAPI is not defined"

**Solução:**
- Verificar se `worldcup-api.js` está carregado
- Verificar ordem dos scripts no HTML
- Abrir console e verificar erros

### Problema 2: Horários incorretos

**Solução:**
```javascript
// Verificar fuso horário do navegador
console.log('Fuso horário:', Intl.DateTimeFormat().resolvedOptions().timeZone);

// Deve ser: America/Sao_Paulo ou similar
```

### Problema 3: Contador não atualiza

**Solução:**
```javascript
// Verificar se timer está rodando
console.log('Countdown timer:', WorldCupAPI.countdownTimer);

// Reiniciar contador
WorldCupAPI.stopCountdown();
WorldCupAPI.startCountdown();
```

### Problema 4: Dados não atualizam

**Solução:**
- Verificar se API está habilitada: `WorldCupAPI.apiEnabled`
- Se false, está usando dados locais (esperado)
- Para habilitar API: `WorldCupAPI.apiEnabled = true`

### Problema 5: Erro de CORS

**Solução:**
- Usar servidor local (não abrir arquivo diretamente)
- Ou configurar CORS no servidor
- Ou usar proxy

## 📊 Relatório de Testes

Após executar todos os testes, preencher:

```
Data do Teste: __/__/____
Navegador: ________________
Versão: ___________________

Testes Passados: __ / 12
Testes Falhados: __ / 12

Problemas Encontrados:
1. _______________________
2. _______________________
3. _______________________

Observações:
_____________________________
_____________________________
```

## 🎯 Testes Automatizados (Futuro)

Para implementar testes automatizados:

```javascript
// Exemplo com Jest
describe('WorldCupAPI', () => {
    test('deve converter UTC para UTC-3', () => {
        const result = WorldCupAPI.convertToUTC3('2026-06-22T20:00:00Z');
        expect(result.time).toBe('17:00');
    });

    test('deve formatar data de hoje como "HOJE"', () => {
        const today = new Date().toISOString();
        const result = WorldCupAPI.formatMatchDate(today);
        expect(result.label).toBe('HOJE');
    });
});
```

## ✅ Conclusão

Após completar todos os testes:

1. Documentar resultados
2. Reportar bugs encontrados
3. Sugerir melhorias
4. Atualizar documentação

---

**Última atualização:** 22/06/2026  
**Versão:** 1.0.0  
**Autor:** Bob