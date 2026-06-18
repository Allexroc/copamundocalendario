# 🔑 How to Configure API Key for Real-Time Updates

This guide explains how to get a valid API subscription key and configure it to enable real-time FIFA World Cup 2026 data updates using the "Atualizar Agora" button.

---

## 📋 Overview

The Copa 2026 Dashboard uses the **Football-Data.org API** to fetch real-time match results, standings, and statistics. To use this feature, you need:

1. A valid API key from Football-Data.org
2. Proper configuration in the backend `.env` file
3. The backend server running

---

## 🌐 Step 1: Get Your API Key from Football-Data.org

### Option A: Free Tier (Recommended for Testing)

1. **Visit:** https://www.football-data.org/
2. **Click:** "Get your free API key" or "Register"
3. **Sign up** with your email address
4. **Verify** your email
5. **Login** to your account
6. **Navigate to:** Dashboard or API Keys section
7. **Copy** your API key (it looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

### Free Tier Limitations:
- ✅ 10 requests per minute
- ✅ Access to major competitions
- ✅ Match data, standings, scorers
- ❌ Limited to certain competitions

### Option B: Paid Tier (For Production)

1. **Visit:** https://www.football-data.org/pricing
2. **Choose** a plan that fits your needs
3. **Subscribe** and get your premium API key
4. Premium keys have higher rate limits and more features

---

## ⚙️ Step 2: Configure the API Key

### Method 1: Edit the .env file directly

1. **Open** the file: `projects/copa-2026-dashboard/backend/.env`

2. **Replace** the placeholder with your actual API key:

```env
PORT=3001
FOOTBALL_DATA_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
FOOTBALL_DATA_BASE_URL=https://api.football-data.org/v4
COMPETITION_CODE=WC
```

3. **Save** the file

### Method 2: Use PowerShell to update (Windows)

```powershell
cd projects/copa-2026-dashboard/backend
$apiKey = "YOUR_ACTUAL_API_KEY_HERE"
(Get-Content .env) -replace 'YOUR_FOOTBALL_DATA_API_KEY_HERE', $apiKey | Set-Content .env
```

### Method 3: Use Command Line (Linux/Mac)

```bash
cd projects/copa-2026-dashboard/backend
sed -i 's/YOUR_FOOTBALL_DATA_API_KEY_HERE/your_actual_api_key_here/g' .env
```

---

## 🚀 Step 3: Start/Restart the Backend Server

### If server is NOT running:

```powershell
cd projects/copa-2026-dashboard/backend
npm start
```

### If server IS already running:

1. **Stop** the current server (Ctrl+C in the terminal)
2. **Start** it again:

```powershell
npm start
```

You should see:
```
✅ Copa 2026 Dashboard Backend running on port 3001
🔑 API Key configured: a1b2c3...p6 (first 7 chars shown)
📡 Ready to fetch data from Football-Data.org
```

---

## 🧪 Step 4: Test the API Connection

### Test 1: Health Check

```powershell
curl http://localhost:3001/health
```

**Expected Response:**
```json
{
  "ok": true,
  "service": "copa-2026-dashboard-backend",
  "competitionCode": "WC"
}
```

### Test 2: Fetch Dashboard Data

```powershell
curl http://localhost:3001/api/dashboard-data
```

**Expected Response (if API key is valid):**
```json
{
  "matches": [...],
  "standings": {...},
  "topScorers": [...],
  "topAssists": [...]
}
```

**Error Response (if API key is invalid):**
```json
{
  "error": "Failed to fetch dashboard data from Football-Data.org",
  "details": [...]
}
```

---

## 🖱️ Step 5: Use the "Atualizar Agora" Button

1. **Open** the dashboard in your browser:
   - File: `projects/copa-2026-dashboard/index.html`
   - Or: http://localhost:3001 (if using a web server)

2. **Click** the "Atualizar Agora" button in the sidebar

3. **Watch** the status message:
   - 🔄 "Atualizando dados dos jogos..."
   - ✅ "Dados atualizados via Football-Data.org em HH:MM"
   - ❌ "Não foi possível atualizar os dados" (if error)

4. **Verify** that:
   - Match scores are updated
   - Group standings reflect new results
   - Top scorers list is current
   - Statistics are accurate

---

## 🔧 Troubleshooting

### Problem: "403 Forbidden" Error

**Cause:** Invalid or missing API key

**Solution:**
1. Verify your API key is correct
2. Check if you copied the entire key (no spaces)
3. Ensure you're using the correct API endpoint
4. Verify your subscription is active

### Problem: "429 Too Many Requests"

**Cause:** Exceeded rate limit (10 requests/minute on free tier)

**Solution:**
1. Wait 1 minute before trying again
2. Reduce update frequency
3. Consider upgrading to a paid plan

### Problem: "Server not responding"

**Cause:** Backend server not running

**Solution:**
```powershell
cd projects/copa-2026-dashboard/backend
npm start
```

### Problem: "CORS Error"

**Cause:** Browser security blocking requests

**Solution:**
- The backend already has CORS enabled
- Make sure you're accessing via the correct URL
- Check browser console for specific error

---

## 📊 How the Real-Time Update Works

### 1. User clicks "Atualizar Agora"
```javascript
// In app.js
refreshButton.addEventListener('click', async () => {
    await refreshMatchData({ manual: true });
});
```

### 2. Frontend calls backend API
```javascript
// In api-config.js
const response = await fetch('http://localhost:3001/api/dashboard-data');
const data = await response.json();
```

### 3. Backend fetches from Football-Data.org
```javascript
// In server.js
const response = await fetch(
    'https://api.football-data.org/v4/competitions/WC/matches',
    {
        headers: {
            'X-Auth-Token': process.env.FOOTBALL_DATA_API_KEY
        }
    }
);
```

### 4. Data is processed and returned
```javascript
// Backend transforms and returns data
return {
    matches: transformedMatches,
    standings: transformedStandings,
    topScorers: transformedScorers
};
```

### 5. Frontend updates the display
```javascript
// In app.js
mergeMatchData(dashboardData.matches);
replaceGroupStandings(dashboardData.standings);
refreshAllViews();
```

---

## 🔒 Data Protection

The system has built-in protection to preserve completed match results:

### Finished Matches Protection
```javascript
// In app.js - line 266
if (match.status === 'finished') {
    return match; // Don't update finished matches
}
```

### Group Standings Protection
```javascript
// In data.js - line 370
if (hasFinishedMatches) {
    // Only update if more games have been played
    if (newMaxPlayed > currentMaxPlayed) {
        WORLD_CUP_2026.groupStandings[groupId] = newStandings;
    }
}
```

---

## 📝 Configuration File Reference

### backend/.env
```env
# Server Configuration
PORT=3001

# Football-Data.org API Configuration
FOOTBALL_DATA_API_KEY=your_actual_api_key_here
FOOTBALL_DATA_BASE_URL=https://api.football-data.org/v4

# Competition Code (WC = World Cup)
COMPETITION_CODE=WC
```

### Supported Competition Codes:
- `WC` - FIFA World Cup
- `CL` - UEFA Champions League
- `PL` - Premier League
- `PD` - La Liga
- `BL1` - Bundesliga
- `SA` - Serie A
- `FL1` - Ligue 1

---

## 🎯 Best Practices

1. **Never commit your API key** to version control
   - The `.env` file is in `.gitignore`
   - Always use `.env.example` as a template

2. **Rotate your API key** periodically for security

3. **Monitor your usage** on Football-Data.org dashboard

4. **Use manual updates** sparingly to avoid rate limits

5. **Enable auto-refresh** only during live matches

6. **Cache data** when possible to reduce API calls

---

## 📞 Support

### Football-Data.org Support:
- **Website:** https://www.football-data.org/
- **Documentation:** https://www.football-data.org/documentation/quickstart
- **Email:** support@football-data.org

### Dashboard Issues:
- Check the browser console for errors
- Review backend logs in the terminal
- Verify all files are in place
- Ensure Node.js and npm are installed

---

## ✅ Quick Checklist

- [ ] Registered at Football-Data.org
- [ ] Obtained API key
- [ ] Updated `backend/.env` file
- [ ] Restarted backend server
- [ ] Tested API connection
- [ ] Verified "Atualizar Agora" button works
- [ ] Confirmed data updates correctly
- [ ] Checked that finished matches are protected

---

**Last Updated:** June 18, 2026  
**Status:** Ready for real-time FIFA World Cup 2026 data! ⚽🏆