// Vercel Serverless Function — API Proxy
// Rota: /api/matches
// CommonJS format required for Vercel static/serverless projects (non-Next.js)

module.exports = async function handler(req, res) {
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
            return res.status(response.status).json({
                error: `API error: ${response.status}`,
                details: text.substring(0, 200)
            });
        }

        const data = await response.json();

        // CDN cache: 60s fresh, serve stale for up to 30s while revalidating
        res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=30');
        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: 'Internal server error', message: error.message });
    }
};
