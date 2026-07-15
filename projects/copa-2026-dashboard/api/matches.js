// Vercel Serverless Function — API Proxy
// Rota: /api/matches
// Faz proxy seguro para football-data.org sem expor CORS ao browser
// Roda no servidor da Vercel — funciona em qualquer origem (browser, mobile, etc.)

export default async function handler(req, res) {
    // Permitir qualquer origem (o código roda no servidor, não no browser)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(204).end();
        return;
    }

    if (req.method !== 'GET') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const apiUrl = 'https://api.football-data.org/v4/competitions/WC/matches';
        const apiKey = process.env.FOOTBALL_DATA_API_KEY || '093dce6688974c83ad7a4adae69e5cfd';

        const response = await fetch(apiUrl, {
            headers: {
                'X-Auth-Token': apiKey,
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const text = await response.text();
            res.status(response.status).json({
                error: `API error: ${response.status}`,
                details: text.substring(0, 200)
            });
            return;
        }

        const data = await response.json();

        // Cache na CDN da Vercel por 60 segundos (atualização automática eficiente)
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
        res.status(200).json(data);

    } catch (error) {
        res.status(500).json({ error: 'Internal server error', message: error.message });
    }
}
