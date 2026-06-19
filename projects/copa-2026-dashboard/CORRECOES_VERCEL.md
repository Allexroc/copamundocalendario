# Correções para Problemas no Vercel

## Problemas Identificados

Baseado na URL: https://copamundocalendario-7gjrunixi-allexrocs-projects.vercel.app/

### Problema 1: Grupos não renderizam
**Causa:** Arquivos CSS/JS não estão sendo carregados corretamente em produção

### Problema 2: Logo do Bob não aparece
**Causa:** Caminho do SVG pode estar incorreto

## Soluções Aplicadas

### 1. Verificar estrutura de diretórios no Vercel
O `vercel.json` está configurado com:
```json
"outputDirectory": "projects/copa-2026-dashboard"
```

Isso significa que o Vercel serve os arquivos a partir de `projects/copa-2026-dashboard/` como raiz.

### 2. Caminhos dos arquivos
Todos os caminhos no `index.html` devem ser relativos:
- ✅ `css/styles.css` (correto)
- ✅ `js/data.js` (correto)
- ✅ `assets/logos/bob-ibm-logo.svg` (correto)

### 3. Cache do Vercel
O Vercel pode estar servindo versão antiga em cache. Soluções:
- Adicionar query string com timestamp nos arquivos JS/CSS
- Limpar cache do Vercel

### 4. Ordem de carregamento dos scripts
Os scripts devem ser carregados na ordem correta:
1. data.js (primeiro - contém WORLD_CUP_2026)
2. groups.js, matches.js, etc.
3. app.js (último - inicializa tudo)

## Próximos Passos

1. Verificar Console do navegador para erros específicos
2. Verificar Network tab para ver quais arquivos falharam (404)
3. Aplicar correções baseadas nos erros encontrados