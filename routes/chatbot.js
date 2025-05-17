const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

// POST /api/chatbot
router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const geminiRes = await axios.post(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + process.env.GOOGLE_API_KEY,
      {
        contents: [
          { role: 'user', parts: [{ text: message }] }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    // Gemini's response format
    const aiReply = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.';
    res.json({ reply: aiReply });
  } catch (err) {
    console.error('Gemini API error:', err.response?.data || err.message);
    res.status(500).json({ error: 'AI service unavailable' });
  }
});

module.exports = router; 