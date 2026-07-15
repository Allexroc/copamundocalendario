/**
 * Copa 2026 Dashboard — Dev Server
 * Serve o dashboard em http://localhost:8080 e
 * faz proxy das chamadas à Football-Data.org API (resolve CORS).
 *
 * Uso: node serve.js
 * Sem dependências externas — usa apenas módulos built-in do Node.js.
 */

const http  = require('http');
const https = require('https');
const fs    = require('fs');
const path  = require('path');
const url   = require('url');

const PORT    = 8080;
const API_KEY = '093dce6688974c83ad7a4adae69e5cfd';
const ROOT    = __dirname;

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.js':   'application/javascript; charset=utf-8',
    '.css':  'text/css; charset=utf-8',
    '.json': 'application/json',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.svg':  'image/svg+xml',
    '.ico':  'image/x-icon',
    '.woff2':'font/woff2',
    '.woff': 'font/woff',
    '.ttf':  'font/ttf'
};

function cors(res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token');
}

const server = http.createServer((req, res) => {
    cors(res);

    if (req.method === 'OPTIONS') {
        res.writeHead(204); res.end(); return;
    }

    const parsed  = url.parse(req.url, true);
    const pathname = parsed.pathname;

    // ── API proxy ──────────────────────────────────────────────────────────
    if (pathname.startsWith('/api/')) {
        const apiPath = '/v4' + pathname.replace('/api', '');
        const opts = {
            hostname: 'api.football-data.org',
            path: apiPath,
            method: 'GET',
            headers: { 'X-Auth-Token': API_KEY, 'Accept': 'application/json' }
        };

        console.log(`  → proxy  GET https://api.football-data.org${apiPath}`);

        const proxyReq = https.request(opts, proxyRes => {
            res.writeHead(proxyRes.statusCode, {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            proxyRes.pipe(res);
        });
        proxyReq.on('error', e => {
            console.error('  ✗ proxy error:', e.message);
            res.writeHead(502, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: e.message }));
        });
        proxyReq.end();
        return;
    }

    // ── Static file server ─────────────────────────────────────────────────
    let filePath = path.join(ROOT, pathname === '/' ? 'index.html' : pathname);

    // Strip query string from file path (cache busting versions)
    filePath = filePath.split('?')[0];

    fs.stat(filePath, (err, stat) => {
        if (err || !stat.isFile()) {
            // Try index.html for directory requests
            const indexPath = path.join(filePath, 'index.html');
            fs.stat(indexPath, (err2, stat2) => {
                if (!err2 && stat2.isFile()) {
                    serveFile(indexPath, res);
                } else {
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end('404 Not Found: ' + pathname);
                }
            });
            return;
        }
        serveFile(filePath, res);
    });
});

function serveFile(filePath, res) {
    const ext  = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 Error reading file');
            return;
        }
        res.writeHead(200, { 'Content-Type': mime });
        res.end(data);
    });
}

server.listen(PORT, '127.0.0.1', () => {
    console.log('');
    console.log('╔══════════════════════════════════════════════════╗');
    console.log('║   🏆  Copa 2026 Dashboard — Dev Server           ║');
    console.log('╠══════════════════════════════════════════════════╣');
    console.log(`║   Dashboard: http://localhost:${PORT}                ║`);
    console.log(`║   API proxy: http://localhost:${PORT}/api/...        ║`);
    console.log('╠══════════════════════════════════════════════════╣');
    console.log('║   Ctrl+C para encerrar                           ║');
    console.log('╚══════════════════════════════════════════════════╝');
    console.log('');

    // Auto-open browser on Windows
    const { exec } = require('child_process');
    exec(`start http://localhost:${PORT}`, err => {
        if (!err) console.log('🌐 Browser aberto automaticamente.\n');
    });
});

server.on('error', e => {
    if (e.code === 'EADDRINUSE') {
        console.error(`❌ Porta ${PORT} já está em uso. Feche o processo e tente novamente.`);
    } else {
        console.error('❌ Erro:', e.message);
    }
    process.exit(1);
});

process.on('SIGINT', () => {
    console.log('\n🛑 Servidor encerrado.');
    process.exit(0);
});
