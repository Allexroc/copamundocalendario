# 🧪 Como Testar o Dashboard

## Método 1: Limpar Cache do Navegador (RECOMENDADO)

### Google Chrome / Microsoft Edge:
1. Pressione `Ctrl + Shift + Delete`
2. Selecione "Imagens e arquivos em cache"
3. Clique em "Limpar dados"
4. Feche e abra o navegador novamente
5. Acesse o dashboard

### Ou use Hard Reload:
1. Abra o dashboard
2. Pressione `Ctrl + F5` (Windows) ou `Cmd + Shift + R` (Mac)
3. Isso força o navegador a recarregar tudo

## Método 2: Modo Anônimo/Privado

### Chrome:
1. Pressione `Ctrl + Shift + N`
2. Abra o dashboard no modo anônimo
3. Não há cache, então verá a versão mais recente

### Edge:
1. Pressione `Ctrl + Shift + P`
2. Abra o dashboard no modo InPrivate

### Firefox:
1. Pressione `Ctrl + Shift + P`
2. Abra o dashboard no modo privado

## Método 3: Verificar Erros no Console

1. Abra o dashboard
2. Pressione `F12` para abrir DevTools
3. Clique na aba "Console"
4. Procure por mensagens em vermelho (erros)
5. Me envie uma captura de tela dos erros

## Método 4: Teste Rápido (Arquivo de Teste)

1. Abra o arquivo: `projects/copa-2026-dashboard/test-data.html`
2. Arraste para o navegador OU
3. Clique com botão direito > "Abrir com" > Navegador
4. Veja se os dados aparecem

## ✅ O Que Deve Aparecer

### Página Principal:
- ✅ 12 grupos (A até L)
- ✅ Cada grupo com tabela de classificação
- ✅ Logotipo do Bob IBM no header
- ✅ Menu lateral funcionando

### Grupo C Especificamente:
- ✅ 4 times: Brasil, Marrocos, Haiti, Escócia
- ✅ 2 jogos em 13/06:
  - BRA 1-1 MAR (19:00)
  - HAI 0-1 SCO (22:00)
- ❌ NÃO deve ter jogo MAR vs HAI em 17/06

## 🆘 Se Ainda Não Funcionar

Me envie:
1. Captura de tela da página
2. Captura de tela do Console (F12)
3. Qual navegador está usando
4. Se testou em modo anônimo

## 📱 Acesso Rápido

Se estiver usando um servidor local:
- `http://localhost:3000` (ou porta configurada)
- `http://localhost:5500` (Live Server do VS Code)
- `http://127.0.0.1:porta`

Se abriu direto do arquivo:
- `file:///C:/Users/.../projects/copa-2026-dashboard/index.html`