# Arquitetura do Dashboard Copa 2026

## 🏗️ Diagrama de Componentes

```mermaid
graph TB
    subgraph Frontend
        A[index.html] --> B[Header]
        A --> C[Navigation]
        A --> D[Main Content Area]
        A --> E[Footer]
        
        B --> B1[Logo]
        B --> B2[Search Bar]
        B --> B3[Language Selector]
        
        C --> C1[Groups Tab]
        C --> C2[Calendar Tab]
        C --> C3[Results Tab]
        C --> C4[Knockout Tab]
        C --> C5[Stats Tab]
        
        D --> D1[Dynamic Content Container]
    end
    
    subgraph Styles
        F[styles.css] --> F1[Layout]
        F[styles.css] --> F2[Components]
        F[styles.css] --> F3[Typography]
        G[responsive.css] --> G1[Mobile]
        G[responsive.css] --> G2[Tablet]
        G[responsive.css] --> G3[Desktop]
        H[animations.css] --> H1[Transitions]
        H[animations.css] --> H2[Keyframes]
    end
    
    subgraph JavaScript
        I[app.js] --> J[Initialization]
        I --> K[Event Handlers]
        I --> L[State Management]
        
        M[data.js] --> M1[Teams Data]
        M[data.js] --> M2[Matches Data]
        M[data.js] --> M3[Stadiums Data]
        
        N[groups.js] --> N1[Render Groups]
        N[groups.js] --> N2[Calculate Standings]
        
        O[matches.js] --> O1[Render Calendar]
        O[matches.js] --> O2[Update Scores]
        
        P[knockout.js] --> P1[Generate Bracket]
        P[knockout.js] --> P2[Update Bracket]
        
        Q[stats.js] --> Q1[Top Scorers]
        Q[stats.js] --> Q2[Team Stats]
        
        R[filters.js] --> R1[Apply Filters]
        R[filters.js] --> R2[Search Function]
        
        S[charts.js] --> S1[Create Charts]
        S[charts.js] --> S2[Update Charts]
    end
    
    I --> M
    I --> N
    I --> O
    I --> P
    I --> Q
    I --> R
    I --> S
```

## 📊 Fluxo de Dados

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant App
    participant Data
    participant Renderer
    
    User->>UI: Acessa Dashboard
    UI->>App: Inicializa
    App->>Data: Carrega dados
    Data-->>App: Retorna dados
    App->>Renderer: Renderiza grupos
    Renderer-->>UI: Exibe tabelas
    
    User->>UI: Seleciona filtro
    UI->>App: Evento de filtro
    App->>Data: Filtra dados
    Data-->>App: Dados filtrados
    App->>Renderer: Re-renderiza
    Renderer-->>UI: Atualiza view
    
    User->>UI: Atualiza resultado
    UI->>App: Novo placar
    App->>Data: Atualiza dados
    Data-->>App: Recalcula classificação
    App->>Renderer: Atualiza tabelas
    Renderer-->>UI: Exibe mudanças
```

## 🎯 Estrutura de Módulos JavaScript

```mermaid
graph LR
    A[app.js] --> B[data.js]
    A --> C[groups.js]
    A --> D[matches.js]
    A --> E[knockout.js]
    A --> F[stats.js]
    A --> G[filters.js]
    A --> H[charts.js]
    
    C --> B
    D --> B
    E --> B
    F --> B
    G --> B
    H --> B
    
    C --> I[DOM Manipulation]
    D --> I
    E --> I
    F --> I
    H --> I
```

## 🔄 Ciclo de Vida da Aplicação

```mermaid
stateDiagram-v2
    [*] --> Loading
    Loading --> Initialized: Data Loaded
    Initialized --> DisplayingGroups: Default View
    
    DisplayingGroups --> DisplayingCalendar: Tab Change
    DisplayingGroups --> DisplayingResults: Tab Change
    DisplayingGroups --> DisplayingKnockout: Tab Change
    DisplayingGroups --> DisplayingStats: Tab Change
    
    DisplayingCalendar --> DisplayingGroups: Tab Change
    DisplayingResults --> DisplayingGroups: Tab Change
    DisplayingKnockout --> DisplayingGroups: Tab Change
    DisplayingStats --> DisplayingGroups: Tab Change
    
    DisplayingGroups --> Filtering: Apply Filter
    DisplayingCalendar --> Filtering: Apply Filter
    DisplayingResults --> Filtering: Apply Filter
    
    Filtering --> DisplayingGroups: Filter Applied
    Filtering --> DisplayingCalendar: Filter Applied
    Filtering --> DisplayingResults: Filter Applied
    
    DisplayingGroups --> Updating: Score Update
    DisplayingCalendar --> Updating: Score Update
    DisplayingResults --> Updating: Score Update
    
    Updating --> DisplayingGroups: Update Complete
    Updating --> DisplayingCalendar: Update Complete
    Updating --> DisplayingResults: Update Complete
```

## 📱 Responsividade

```mermaid
graph TD
    A[Viewport Detection] --> B{Screen Size}
    B -->|< 768px| C[Mobile Layout]
    B -->|768px - 1024px| D[Tablet Layout]
    B -->|> 1024px| E[Desktop Layout]
    
    C --> C1[Single Column]
    C --> C2[Hamburger Menu]
    C --> C3[Stacked Cards]
    
    D --> D1[Two Columns]
    D --> D2[Collapsible Sidebar]
    D --> D3[Grid Layout]
    
    E --> E1[Three Columns]
    E --> E2[Fixed Sidebar]
    E --> E3[Full Grid]
```

## 🎨 Sistema de Temas

```mermaid
graph LR
    A[CSS Variables] --> B[Light Theme]
    A --> C[Dark Theme]
    
    B --> B1[Primary Colors]
    B --> B2[Background]
    B --> B3[Text Colors]
    
    C --> C1[Primary Colors]
    C --> C2[Background]
    C --> C3[Text Colors]
    
    D[Theme Toggle] --> E{User Preference}
    E -->|Light| B
    E -->|Dark| C
```

## 🔍 Sistema de Busca e Filtros

```mermaid
graph TD
    A[User Input] --> B{Input Type}
    B -->|Search Text| C[Search Engine]
    B -->|Filter Selection| D[Filter Engine]
    
    C --> E[Search in Teams]
    C --> F[Search in Stadiums]
    C --> G[Search in Matches]
    
    D --> H[Filter by Group]
    D --> I[Filter by Date]
    D --> J[Filter by Phase]
    D --> K[Filter by Team]
    
    E --> L[Results Array]
    F --> L
    G --> L
    H --> L
    I --> L
    J --> L
    K --> L
    
    L --> M[Render Filtered Results]
```

## 📈 Gerenciamento de Estado

```javascript
// Estado Global da Aplicação
const AppState = {
  currentView: 'groups',        // groups, calendar, results, knockout, stats
  selectedGroup: null,          // A-L ou null para todos
  selectedTeam: null,           // Código do time ou null
  selectedDate: null,           // Data específica ou null
  selectedPhase: 'all',         // all, group, round16, quarter, semi, final
  searchQuery: '',              // Texto de busca
  matches: [],                  // Array de jogos
  teams: [],                    // Array de seleções
  groups: [],                   // Array de grupos
  standings: [],                // Classificação calculada
  topScorers: [],              // Artilheiros
  filters: {
    active: false,
    criteria: {}
  }
}
```

## 🎯 Prioridades de Implementação

### Fase 1: Core (Essencial)
1. Estrutura HTML básica
2. CSS para layout responsivo
3. Dados estáticos (grupos, seleções, jogos)
4. Renderização de tabelas de grupos
5. Calendário de jogos

### Fase 2: Interatividade
6. Sistema de navegação por abas
7. Filtros básicos (grupo, data)
8. Busca por seleção
9. Atualização de resultados

### Fase 3: Avançado
10. Fase eliminatória visual
11. Estatísticas detalhadas
12. Gráficos com Chart.js
13. Animações e transições

### Fase 4: Polimento
14. Otimizações de performance
15. Testes de responsividade
16. Acessibilidade (ARIA labels)
17. PWA features (opcional)

---

**Próximo Passo**: Iniciar implementação com o modo Code para criar os arquivos do dashboard.