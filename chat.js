const handler = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: 'API key not configured on server' });

  const { contents, model = 'gemini-2.5-flash' } = req.body || {};
  if (!contents) return res.status(400).json({ error: 'Missing contents' });

  const trimmed = contents.slice(-20);

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: trimmed }),
      }
    );

    const data = await geminiRes.json();
    if (!geminiRes.ok) return res.status(geminiRes.status).json({ error: data.error?.message || 'Gemini API error' });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = handler;
