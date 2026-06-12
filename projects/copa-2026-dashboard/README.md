# 🏆 Dashboard Copa do Mundo FIFA 2026

Dashboard web interativo e completo para acompanhamento da Copa do Mundo FIFA 2026, que será realizada nos Estados Unidos, Canadá e México.

## 📋 Visão Geral

Este projeto consiste em um dashboard web moderno e responsivo que permite acompanhar todos os aspectos da Copa do Mundo 2026:

- ✅ **48 seleções** divididas em **12 grupos**
- ✅ **104 jogos** com calendário completo
- ✅ Tabelas de classificação em tempo real
- ✅ Fase eliminatória com chaveamento visual
- ✅ Estatísticas detalhadas (artilharia, assistências, cartões)
- ✅ Sistema de busca e filtros avançados
- ✅ Gráficos e visualizações interativas
- ✅ Design responsivo (mobile, tablet, desktop)

## 🎯 Funcionalidades Principais

### 1. Tabelas de Grupos
- Visualização dos 12 grupos (A-L)
- Classificação automática por pontos, saldo de gols
- Indicadores visuais de classificação
- Atualização em tempo real

### 2. Calendário de Jogos
- Lista completa de todos os 104 jogos
- Filtros por data, grupo, seleção, estádio
- Visualização de jogos passados, em andamento e futuros
- Informações detalhadas de cada partida

### 3. Resultados
- Placares atualizados
- Estatísticas dos jogos (posse, finalizações, escanteios)
- Destaques (gols, cartões, substituições)

### 4. Fase Eliminatória
- Chaveamento visual completo
- Oitavas, quartas, semifinais e final
- Atualização automática conforme resultados

### 5. Estatísticas
- Top 10 artilheiros
- Maiores assistentes
- Cartões por seleção
- Público por estádio
- Gráficos de desempenho

### 6. Busca e Filtros
- Busca global por seleção, jogador, estádio
- Filtros combinados
- Ordenação customizável

## 🏗️ Estrutura do Projeto

```
copa-2026-dashboard/
├── index.html              # Página principal
├── css/
│   ├── styles.css         # Estilos principais
│   ├── responsive.css     # Media queries
│   └── animations.css     # Animações
├── js/
│   ├── data.js           # Dados da Copa
│   ├── app.js            # Lógica principal
│   ├── groups.js         # Gerenciamento de grupos
│   ├── matches.js        # Gerenciamento de jogos
│   ├── knockout.js       # Fase eliminatória
│   ├── stats.js          # Estatísticas
│   ├── filters.js        # Sistema de filtros
│   └── charts.js         # Gráficos
├── assets/
│   ├── flags/            # Bandeiras das seleções
│   ├── logos/            # Logos de estádios
│   └── icons/            # Ícones do sistema
├── PLANO_COPA_2026.md    # Plano técnico detalhado
├── ARQUITETURA.md        # Diagramas de arquitetura
├── DADOS_COPA_2026.md    # Dados estruturados
└── README.md             # Este arquivo
```

## 🚀 Tecnologias

- **HTML5**: Estrutura semântica
- **CSS3**: Flexbox, Grid, variáveis CSS, animações
- **JavaScript (ES6+)**: Vanilla JS para máxima performance
- **Chart.js**: Gráficos e visualizações (via CDN)
- **Font Awesome**: Ícones (via CDN)

## 📱 Responsividade

O dashboard é totalmente responsivo e se adapta a diferentes tamanhos de tela:

- **Desktop** (> 1024px): Layout completo com sidebar fixa
- **Tablet** (768px - 1024px): Layout adaptado com sidebar colapsável
- **Mobile** (< 768px): Layout vertical com menu hambúrguer

## 🎨 Design (FIFA Oficial)

### Paleta de Cores
- **Primária**: #1a237e (Azul escuro FIFA)
- **Secundária**: #00bcd4 (Ciano vibrante)
- **Acento**: #ffd700 (Dourado troféu)
- **Sucesso**: #4caf50 (Verde campo)
- **Alerta**: #ff9800 (Laranja)
- **Erro**: #f44336 (Vermelho cartão)
- **Background**: #f5f5f5 (Cinza claro)
- **Cards**: #ffffff (Branco)
- **Texto**: #212121 (Preto suave)

### Tipografia
- **Títulos**: Roboto Bold, 24-48px
- **Subtítulos**: Roboto Medium, 18-24px
- **Corpo**: Roboto Regular, 14-16px
- **Números/Placares**: Roboto Mono Bold, 20-32px

### Características do Design
- Visual profissional e corporativo
- Cores oficiais da FIFA
- Excelente legibilidade
- Header fixo com gradiente azul
- Cards com sombras suaves
- Bordas arredondadas (8px)
- Espaçamento generoso

## 📊 Dados

Os dados incluem:
- 48 seleções classificadas
- 16 estádios (11 EUA, 3 México, 2 Canadá)
- 104 jogos programados
- Estatísticas completas

**Nota**: Os dados são simulados para desenvolvimento. Devem ser atualizados conforme os jogos acontecem.

## 🔄 Próximos Passos

### Fase 1: Estrutura Base ✅
- [x] Planejamento e arquitetura
- [x] Definição de dados
- [ ] Criação de arquivos HTML/CSS/JS

### Fase 2: Implementação Core
- [ ] Estrutura HTML completa
- [ ] Estilos CSS responsivos
- [ ] Dados JavaScript estruturados
- [ ] Renderização de grupos e calendário

### Fase 3: Funcionalidades Avançadas
- [ ] Sistema de filtros e busca
- [ ] Fase eliminatória visual
- [ ] Estatísticas e gráficos
- [ ] Animações e transições

### Fase 4: Testes e Otimização
- [ ] Testes de responsividade
- [ ] Otimizações de performance
- [ ] Acessibilidade
- [ ] Documentação final

## 💡 Diferenciais

- ✨ Interface moderna e intuitiva
- ⚡ Performance otimizada
- 📱 Totalmente responsivo
- 🎯 Sem dependências de backend
- 🔍 Sistema de busca poderoso
- 📊 Visualizações ricas
- 🎨 Design profissional

## 📝 Documentação Adicional

- [`PLANO_COPA_2026.md`](PLANO_COPA_2026.md) - Plano técnico completo
- [`ARQUITETURA.md`](ARQUITETURA.md) - Diagramas e arquitetura
- [`DADOS_COPA_2026.md`](DADOS_COPA_2026.md) - Estrutura de dados

## 🤝 Como Usar

1. Clone ou baixe o projeto
2. Abra `index.html` em um navegador moderno
3. Navegue pelas diferentes seções usando as abas
4. Use filtros e busca para encontrar informações específicas
5. Atualize resultados conforme os jogos acontecem

## 📄 Licença

Este é um projeto educacional/demonstrativo para acompanhamento da Copa do Mundo 2026.

---

**Desenvolvido com ⚽ para a Copa do Mundo FIFA 2026**