const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PORT = 5000;

function getApiKey() {
  try {
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(/EXPO_PUBLIC_GEMINI_API_KEY=(.*)/);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  } catch (e) {}
  return process.env.EXPO_PUBLIC_GEMINI_API_KEY || '';
}

const BASE_SYSTEM_INSTRUCTION =
  'You are AgriMind, a standalone agricultural expert for Indian farming. Answer ONLY questions related to agriculture, crops, seasonal weather suitability, planting months, soil types, fertilizers, crop medicines/pesticides, irrigation, and typical Indian market (mandi) price ranges in ₹ per quintal. Politely refuse any non-farming questions. Structure every answer clearly with short bullet points covering: (1) Season & Sowing Months, (2) Fertilizers & Nutrients, (3) Pest/Disease Medicine (with a reminder to verify exact dosage at a local Krishi Vigyan Kendra), and (4) Typical Market Price Range. Do not ask for or collect personal user information.';

const LANG_MAP = {
  kn: { name: 'Kannada', native: 'ಕನ್ನಡ' },
  te: { name: 'Telugu', native: 'తెలుగు' },
  ta: { name: 'Tamil', native: 'தமிழ்' },
  ml: { name: 'Malayalam', native: 'മലയാളം' },
  hi: { name: 'Hindi', native: 'हिंदी' },
  en: { name: 'English', native: 'English' }
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Serve background images
  if (req.url === '/farming-bg.jpg' || req.url === '/agricultural-land-bg.jpg') {
    const imgFile = req.url.includes('agricultural') ? 'agricultural-land-bg.jpg' : 'farming-bg.jpg';
    const imgPath = path.join(__dirname, imgFile);
    fs.readFile(imgPath, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'image/jpeg' });
        res.end(data);
      }
    });
    return;
  }

  // Serve AgriMind APK download directly to mobile devices
  if (req.url === '/AgriMind-AI.apk' || req.url === '/download-apk') {
    const apkPath = path.join(__dirname, '..', 'AgriMind-AI.apk');
    if (!fs.existsSync(apkPath)) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('APK not found on server');
      return;
    }
    const stat = fs.statSync(apkPath);
    res.writeHead(200, {
      'Content-Type': 'application/vnd.android.package-archive',
      'Content-Length': stat.size,
      'Content-Disposition': 'attachment; filename="AgriMind-AI.apk"'
    });
    fs.createReadStream(apkPath).pipe(res);
    return;
  }

  // API Chat Endpoint
  if (req.url === '/api/chat' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { prompt, context, language = 'en' } = JSON.parse(body);
        const apiKey = getApiKey();

        if (!apiKey || apiKey === 'your_gemini_api_key_here') {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            error: 'Missing Gemini API key. Please check your .env file.'
          }));
          return;
        }

        const langData = LANG_MAP[language] || LANG_MAP.en;
        let finalSystemInstruction = BASE_SYSTEM_INSTRUCTION;

        if (language !== 'en') {
          finalSystemInstruction += `\n\nCRITICAL LANGUAGE REQUIREMENT: You MUST answer the user entirely in ${langData.name} (${langData.native}) script. Use authentic rural agricultural vocabulary so it is directly understandable for farmers.`;
        }

        // Build context prefix
        let fullPrompt = prompt;
        const contextParts = [];
        if (context?.season) contextParts.push(`Season: ${context.season}`);
        if (context?.soil) contextParts.push(`Soil Type: ${context.soil}`);
        if (language !== 'en') contextParts.push(`Response Language: ${langData.name} (${langData.native})`);

        if (contextParts.length > 0) {
          fullPrompt = `[Context: ${contextParts.join(' | ')}]\n\nFarmer Query: ${prompt.trim()}`;
        }

        const payload = Buffer.from(JSON.stringify({
          systemInstruction: {
            parts: [{ text: finalSystemInstruction }]
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: fullPrompt }]
            }
          ],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 1200
          }
        }), 'utf8');

        const callModel = (modelName) => {
          return new Promise((resolve, reject) => {
            const options = {
              hostname: 'generativelanguage.googleapis.com',
              path: `/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': payload.length
              }
            };

            const gReq = https.request(options, (gRes) => {
              let gData = '';
              gRes.setEncoding('utf8');
              gRes.on('data', d => { gData += d; });
              gRes.on('end', () => {
                if (gRes.statusCode >= 200 && gRes.statusCode < 300) {
                  try {
                    const parsed = JSON.parse(gData);
                    const reply = parsed.candidates?.[0]?.content?.parts?.[0]?.text;
                    resolve(reply || 'No response returned from Gemini.');
                  } catch (e) {
                    reject(e);
                  }
                } else {
                  reject(new Error(`Status ${gRes.statusCode}: ${gData}`));
                }
              });
            });

            gReq.on('error', reject);
            gReq.write(payload);
            gReq.end();
          });
        };

        callModel('gemini-3.5-flash-lite')
          .catch(() => callModel('gemini-flash-lite-latest'))
          .catch(() => callModel('gemini-3.6-flash'))
          .catch(() => callModel('gemini-3.8-flash'))
          .then(reply => {
            res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
            res.end(JSON.stringify({ reply }));
          })
          .catch(err => {
            try {
              const { testEngine } = require('./engine.js');
              const reply = testEngine(prompt, context, language);
              res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
              res.end(JSON.stringify({ reply }));
            } catch (fallbackErr) {
              res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
              res.end(JSON.stringify({ error: err.message }));
            }
          });

      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON request' }));
      }
    });
    return;
  }

  // Serve index.html
  if (req.url === '/' || req.url === '/index.html') {
    const indexPath = path.join(__dirname, 'index.html');
    fs.readFile(indexPath, (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading index.html');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(data);
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n========================================`);
  console.log(`🌾 AgriMind AI Multilingual Server Running!`);
  console.log(`👉 Open in your browser: http://localhost:${PORT}`);
  console.log(`========================================\n`);
});
