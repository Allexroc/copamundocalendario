# 📋 Regras de Desenvolvimento - Copa 2026

## 🖥️ Ambiente

- **Sistema Operacional**: Windows
- **Shell**: PowerShell
- **Node.js**: v18+ (com suporte nativo a fetch, ou usar node-fetch para versões anteriores)

---

## 🌐 Comandos HTTP

### ❌ NUNCA use `curl` no PowerShell
O alias `curl` no PowerShell aponta para `Invoke-WebRequest` e pode causar problemas.

### ✅ Use sempre uma destas opções:

#### Opção 1: curl.exe (recomendado para testes rápidos)
```powershell
# Teste básico
curl.exe --max-time 10 http://localhost:3001/health

# Com informações detalhadas
curl.exe --max-time 10 http://localhost:3001/api/dashboard-data -s -o nul -w "Status: %{http_code}\nSize: %{size_download} bytes\nTime: %{time_total}s\n"

# Ver resposta completa
curl.exe --max-time 10 http://localhost:3001/health -v
```

#### Opção 2: Invoke-WebRequest (nativo do PowerShell)
```powershell
# Teste básico
Invoke-WebRequest -Uri http://localhost:3001/health -UseBasicParsing

# Ver apenas o conteúdo
Invoke-WebRequest -Uri http://localhost:3001/health -UseBasicParsing | Select-Object -ExpandProperty Content

# Ver status e tamanho
Invoke-WebRequest -Uri http://localhost:3001/api/dashboard-data -UseBasicParsing | Select-Object StatusCode, @{Name='ContentLength';Expression={$_.Content.Length}}
```

---

## 💻 Comandos de Terminal

### ✅ Sempre considere compatibilidade com Windows/PowerShell

#### Navegação de diretórios
```powershell
# Correto
cd projects/copa-2026-dashboard/backend

# Ou use o parâmetro -cwd em comandos
npm install
# com cwd: projects/copa-2026-dashboard/backend
```

#### Encadeamento de comandos
```powershell
# ❌ Errado (sintaxe Linux)
cd backend && npm install

# ✅ Correto (PowerShell)
cd backend; npm install

# Ou use comandos separados
```

#### Listagem de arquivos
```powershell
# PowerShell
Get-ChildItem
dir
ls  # (alias para Get-ChildItem)

# Recursivo
Get-ChildItem -Recurse
```

#### Processos e portas
```powershell
# Ver processos em uma porta
netstat -ano | findstr :3001

# Matar processo
taskkill /F /PID <PID>
```

---

## 🔧 Backend - Boas Práticas

### Instalação de dependências
```powershell
cd projects/copa-2026-dashboard/backend
npm install
```

### Iniciar servidor
```powershell
npm start
# ou
npm run dev
```

### Variáveis de ambiente
Sempre criar arquivo `.env` baseado em `.env.example`:
```env
PORT=3001
FOOTBALL_DATA_API_KEY=sua_chave_aqui
FOOTBALL_DATA_BASE_URL=https://api.football-data.org/v4
COMPETITION_CODE=WC
```

---

## 🧪 Testes

### Endpoints disponíveis
```
GET /health
GET /api/football-data/matches
GET /api/football-data/standings
GET /api/football-data/scorers
GET /api/dashboard-data
```

### Script de teste completo (PowerShell)
```powershell
# Teste de saúde
Write-Host "Testing /health..." -ForegroundColor Cyan
curl.exe --max-time 10 http://localhost:3001/health

# Teste de dados
Write-Host "`nTesting /api/dashboard-data..." -ForegroundColor Cyan
curl.exe --max-time 10 http://localhost:3001/api/dashboard-data -s -o nul -w "Status: %{http_code}\nSize: %{size_download} bytes\nTime: %{time_total}s\n"
```

---

## 🚨 Troubleshooting

### Porta em uso
```powershell
# 1. Encontrar processo
netstat -ano | findstr :3001

# 2. Matar processo
taskkill /F /PID <PID>

# 3. Reiniciar servidor
npm start
```

### Servidor congela
- ✅ Verificar se `node-fetch` está instalado
- ✅ Verificar se está importado no `server.js`
- ✅ Verificar logs do console

### Erro de módulo não encontrado
```powershell
# Reinstalar dependências
rm -r node_modules
rm package-lock.json
npm install
```

---

## 📝 Checklist de Desenvolvimento

- [ ] Usar `curl.exe` ou `Invoke-WebRequest` para testes HTTP
- [ ] Considerar sintaxe PowerShell em scripts
- [ ] Testar comandos no Windows antes de documentar
- [ ] Incluir timeout em requisições HTTP (`--max-time`)
- [ ] Documentar comandos específicos do Windows
- [ ] Verificar compatibilidade de paths (usar `/` ou `\`)

---

**Última atualização**: 2026-06-18  
**Mantido por**: Bob Development Team