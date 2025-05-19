const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

const GEMINI_MODEL = "gemini-1.5-pro"; // or "gemini-1.5-pro-002"
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/${GEMINI_MODEL}:generateContent?key=${process.env.GOOGLE_API_KEY}`;

router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    const geminiRes = await axios.post(
      GEMINI_URL,
      {
        contents: [{ role: "user", parts: [{ text: message }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const aiReply =
      geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini.";
    res.json({ reply: aiReply });
  } catch (err) {
    console.error("Gemini API error:", err.response?.data || err.message);
    res.status(500).json({ error: "AI service unavailable" });
  }
});

module.exports = router;
