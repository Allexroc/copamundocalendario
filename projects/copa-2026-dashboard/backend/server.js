const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT || 3001);
const FOOTBALL_DATA_API_KEY = process.env.FOOTBALL_DATA_API_KEY || '';
const FOOTBALL_DATA_BASE_URL = process.env.FOOTBALL_DATA_BASE_URL || 'https://api.football-data.org/v4';
const COMPETITION_CODE = process.env.COMPETITION_CODE || 'WC';

app.use(cors());
app.use(express.json());

function getFootballDataHeaders() {
    const headers = {
        'Content-Type': 'application/json'
    };

    if (FOOTBALL_DATA_API_KEY) {
        headers['X-Auth-Token'] = FOOTBALL_DATA_API_KEY;
    }

    return headers;
}

async function fetchFootballData(endpoint) {
    const response = await fetch(`${FOOTBALL_DATA_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: getFootballDataHeaders()
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Football-Data.org ${response.status}: ${errorText || response.statusText}`);
    }

    return response.json();
}

app.get('/health', (req, res) => {
    res.json({
        ok: true,
        service: 'copa-2026-dashboard-backend',
        competitionCode: COMPETITION_CODE
    });
});

app.get('/api/football-data/matches', async (req, res) => {
    try {
        const data = await fetchFootballData(`/competitions/${COMPETITION_CODE}/matches`);
        res.json(data);
    } catch (error) {
        res.status(502).json({
            error: 'Failed to fetch matches from Football-Data.org',
            details: error.message
        });
    }
});

app.get('/api/football-data/standings', async (req, res) => {
    try {
        const data = await fetchFootballData(`/competitions/${COMPETITION_CODE}/standings`);
        res.json(data);
    } catch (error) {
        res.status(502).json({
            error: 'Failed to fetch standings from Football-Data.org',
            details: error.message
        });
    }
});

app.get('/api/football-data/scorers', async (req, res) => {
    try {
        const data = await fetchFootballData(`/competitions/${COMPETITION_CODE}/scorers`);
        res.json(data);
    } catch (error) {
        res.status(502).json({
            error: 'Failed to fetch scorers from Football-Data.org',
            details: error.message
        });
    }
});

app.get('/api/dashboard-data', async (req, res) => {
    const [matchesResult, standingsResult, scorersResult] = await Promise.allSettled([
        fetchFootballData(`/competitions/${COMPETITION_CODE}/matches`),
        fetchFootballData(`/competitions/${COMPETITION_CODE}/standings`),
        fetchFootballData(`/competitions/${COMPETITION_CODE}/scorers`)
    ]);

    const response = {
        source: 'football-data.org',
        competitionCode: COMPETITION_CODE,
        matches: matchesResult.status === 'fulfilled' ? matchesResult.value.matches || [] : [],
        standings: standingsResult.status === 'fulfilled' ? standingsResult.value.standings || [] : [],
        scorers: scorersResult.status === 'fulfilled' ? scorersResult.value.scorers || [] : [],
        errors: []
    };

    if (matchesResult.status === 'rejected') {
        response.errors.push({
            resource: 'matches',
            message: matchesResult.reason.message
        });
    }

    if (standingsResult.status === 'rejected') {
        response.errors.push({
            resource: 'standings',
            message: standingsResult.reason.message
        });
    }

    if (scorersResult.status === 'rejected') {
        response.errors.push({
            resource: 'scorers',
            message: scorersResult.reason.message
        });
    }

    const hasAnyData = response.matches.length > 0 || response.standings.length > 0 || response.scorers.length > 0;

    if (!hasAnyData) {
        return res.status(502).json({
            error: 'Failed to fetch dashboard data from Football-Data.org',
            details: response.errors
        });
    }

    return res.json(response);
});

app.listen(PORT, () => {
    console.log(`✅ Backend proxy running at http://localhost:${PORT}`);
});

// Made with Bob
