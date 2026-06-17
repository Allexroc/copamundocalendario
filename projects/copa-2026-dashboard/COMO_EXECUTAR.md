# 🚀 Como Executar o Projeto da Copa 2026

## ✅ Status Atual do Projeto

- ✅ **HTML**: Completo e funcional ([`index.html`](index.html))
- ✅ **CSS**: Todos os arquivos criados (styles, responsive, animations)
- ⚠️ **JavaScript**: Arquivos precisam ser criados

## 📋 Opções para Executar

## 🔌 Novo modo recomendado: frontend + backend proxy

Para atualizar os dados reais da Copa sem problemas de CORS, o dashboard agora pode usar um backend local em [`backend/server.js`](backend/server.js), que faz o proxy seguro para a API [`Football-Data.org`](README.md).

### 1. Configurar o backend

Entre na pasta [`backend`](backend/) e instale as dependências:

```bash
cd backend
npm install
```

Crie um arquivo `.env` com base em [`backend/.env.example`](backend/.env.example):

```env
PORT=3001
FOOTBALL_DATA_API_KEY=SUA_CHAVE_AQUI
FOOTBALL_DATA_BASE_URL=https://api.football-data.org/v4
COMPETITION_CODE=WC
```

### 2. Iniciar o backend

Ainda dentro da pasta [`backend`](backend/), execute:

```bash
npm start
```

O proxy ficará disponível em `http://localhost:3001` e expõe:
- `GET /health`
- `GET /api/football-data/matches`
- `GET /api/football-data/standings`
- `GET /api/football-data/scorers`
- `GET /api/dashboard-data`

### 3. Iniciar o frontend

Depois, abra o frontend com servidor local, preferencialmente usando uma destas opções:
- [`Live Server`](index.html)
- `python -m http.server 8000`
- `http-server -p 8000`

Evite abrir apenas o arquivo [`index.html`](index.html) com duplo clique quando estiver testando integração completa.

### 4. Como o frontend consome os dados

O frontend agora prioriza o provider [`backendProxy`](js/api-config.js), apontando para `http://localhost:3001/api/dashboard-data`.

Se o backend estiver no ar e a chave da API estiver válida:
- o botão de atualização manual buscará dados reais
- a atualização automática continuará funcionando
- o frontend deixará de depender de chamadas diretas bloqueadas por CORS

### Opção 1: Execução Rápida (Recomendado)

Abra o arquivo [`index.html`](index.html) diretamente no navegador:

**Windows:**
1. Navegue até a pasta do projeto no Windows Explorer
2. Clique com botão direito em `index.html`
3. Selecione "Abrir com" → Escolha seu navegador (Chrome, Edge, Firefox)

**Ou simplesmente:**
- Dê duplo clique no arquivo `index.html`

### Opção 2: Usando VS Code Live Server (Melhor para Desenvolvimento)

1. Instale a extensão "Live Server" no VS Code
2. Clique com botão direito em `index.html`
3. Selecione "Open with Live Server"
4. O projeto abrirá automaticamente em `http://localhost:5500`

**Vantagens:**
- ✅ Atualização automática ao salvar arquivos
- ✅ Melhor para desenvolvimento
- ✅ Simula servidor web real

### Opção 3: Servidor Python (Se tiver Python instalado)

```bash
# Python 3
python -m http.server 8000

# Depois abra: http://localhost:8000
```

### Opção 4: Servidor Node.js (Se tiver Node instalado)

```bash
# Instalar http-server globalmente
npm install -g http-server

# Executar
http-server -p 8000

# Depois abra: http://localhost:8000
```

## ⚠️ Arquivos JavaScript Necessários

O projeto precisa dos seguintes arquivos JavaScript na pasta `js/`:

1. **`data.js`** - Dados da Copa (seleções, grupos, jogos)
2. **`app.js`** - Lógica principal e inicialização
3. **`groups.js`** - Gerenciamento de grupos
4. **`matches.js`** - Gerenciamento de jogos
5. **`knockout.js`** - Fase eliminatória
6. **`stats.js`** - Estatísticas
7. **`filters.js`** - Sistema de filtros
8. **`charts.js`** - Gráficos

## 🔧 Próximos Passos

### Para Testar Agora (Versão Básica)

Vou criar um arquivo JavaScript básico para você testar a estrutura:

1. Execute o projeto usando qualquer opção acima
2. Você verá a estrutura HTML/CSS funcionando
3. Os dados serão carregados dinamicamente quando os arquivos JS forem criados

### Para Desenvolvimento Completo

Se você quiser que eu crie todos os arquivos JavaScript necessários, me avise e eu posso:

1. Criar o arquivo `data.js` com todos os dados da Copa 2026
2. Criar os arquivos de lógica (`app.js`, `groups.js`, etc.)
3. Implementar todas as funcionalidades (filtros, busca, gráficos)

## 🌐 Requisitos do Navegador

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+

## 📱 Testando Responsividade

Para testar em diferentes dispositivos:

1. Abra o projeto no navegador
2. Pressione `F12` para abrir DevTools
3. Clique no ícone de dispositivo móvel (ou `Ctrl+Shift+M`)
4. Teste em diferentes resoluções

## 🐛 Resolução de Problemas

### Problema: Página em branco
**Solução:** Verifique o console do navegador (F12) para erros JavaScript

### Problema: Estilos não carregam
**Solução:** Verifique se os arquivos CSS estão na pasta `css/`

### Problema: Imagens não aparecem
**Solução:** As bandeiras e ícones precisam estar na pasta `assets/`

## 📞 Precisa de Ajuda?

Me avise se você quer que eu:
- ✅ Crie todos os arquivos JavaScript
- ✅ Adicione funcionalidades específicas
- ✅ Corrija algum problema
- ✅ Explique alguma parte do código

---

**Desenvolvido com ⚽ para a Copa do Mundo FIFA 2026**