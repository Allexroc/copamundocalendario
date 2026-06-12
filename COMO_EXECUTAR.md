# 🚀 Como Executar o Projeto da Copa 2026

## ✅ Status Atual do Projeto

- ✅ **HTML**: Completo e funcional ([`index.html`](index.html))
- ✅ **CSS**: Todos os arquivos criados (styles, responsive, animations)
- ⚠️ **JavaScript**: Arquivos precisam ser criados

## 📋 Opções para Executar

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