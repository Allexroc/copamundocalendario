// Proxy Server para Football-Data.org API
// Resolve problemas de CORS permitindo requisições do frontend

const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 3002;
const API_KEY = '093dce6688974c83ad7a4adae69e5cfd';
const API_BASE = 'api.football-data.org';

console.log('🚀 Iniciando Proxy Server para Football-Data.org API...');
console.log(`📡 Porta: ${PORT}`);
console.log(`🔑 API Key configurada`);
console.log('');

const server = http.createServer((req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // Only allow GET requests
    if (req.method !== 'GET') {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method not allowed' }));
        return;
    }
    
    // Parse URL
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    
    console.log(`📥 Requisição recebida: ${path}`);
    
    // Proxy request to Football-Data.org
    const options = {
        hostname: API_BASE,
        path: `/v4${path}`,
        method: 'GET',
        headers: {
            'X-Auth-Token': API_KEY,
            'Accept': 'application/json'
        }
    };
    
    const proxyReq = https.request(options, (proxyRes) => {
        console.log(`✅ Resposta da API: ${proxyRes.statusCode}`);
        
        // Forward status code
        res.writeHead(proxyRes.statusCode, {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        });
        
        // Forward response data
        proxyRes.pipe(res);
    });
    
    proxyReq.on('error', (error) => {
        console.error(`❌ Erro no proxy: ${error.message}`);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Proxy error', message: error.message }));
    });
    
    proxyReq.end();
});

server.listen(PORT, () => {
    console.log(`✅ Proxy Server rodando em http://localhost:${PORT}`);
    console.log(`📊 Endpoint: http://localhost:${PORT}/competitions/WC/matches`);
    console.log('');
    console.log('💡 Use este servidor para fazer requisições à API sem problemas de CORS');
    console.log('');
});

// Handle server errors
server.on('error', (error) => {
    console.error(`❌ Erro no servidor: ${error.message}`);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Encerrando Proxy Server...');
    server.close(() => {
        console.log('✅ Servidor encerrado');
        process.exit(0);
    });
});

// Made with Bob
