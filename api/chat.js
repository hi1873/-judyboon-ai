const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: 'API key not configured' });

  const { contents } = req.body || {};
  if (!contents) return res.status(400).json({ error: 'Missing contents' });

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const trimmed = contents.slice(-20);

    // แปลง contents format เป็น chat history
    const history = trimmed.slice(0, -1).map(c => ({
      role: c.role === 'model' ? 'model' : 'user',
      parts: c.parts
    }));

    const lastMessage = trimmed[trimmed.length - 1];

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.parts);
    const text = result.response.text();

    return res.status(200).json({
      candidates: [{ content: { parts: [{ text }] } }]
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
