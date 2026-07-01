/* ============================================================
   RAÍCES SV — routes/chat.routes.js
   Router de Express para el proxy de chat hacia OpenRouter
   ============================================================ */

const express = require('express');
const router = express.Router();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const MODEL = 'nvidia/nemotron-3-ultra-550b-a55b:free';
const MAX_TOKENS = 2000;
const TIMEOUT_MS = 60000;

router.post('/chat-proxy', async (req, res) => {
  if (!OPENROUTER_API_KEY) {
    return res.status(500).json({ error: 'API key no configurada en el servidor' });
  }

  const { system: systemPrompt, messages } = req.body || {};

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  const formattedMessages = [];

  if (systemPrompt) {
    formattedMessages.push({ role: 'system', content: systemPrompt });
  }

  for (const msg of messages) {
    formattedMessages.push({
      role: msg.role || 'user',
      content: msg.content || '',
    });
  }

  const payload = {
    model: MODEL,
    messages: formattedMessages,
    max_tokens: MAX_TOKENS,
  };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'http://localhost/RaicesSV',
        'X-Title': 'Raices SV',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const httpCode = response.status;
    const raw = await response.text();

    // Log para debug — revisa la consola donde corre "node server.js"
    console.log('OpenRouter response:', raw);

    let responseData;
    try {
      responseData = JSON.parse(raw);
    } catch (parseErr) {
      return res.status(502).json({ error: 'Respuesta inválida de OpenRouter', raw });
    }

    if (responseData.error) {
      return res.status(httpCode >= 400 ? httpCode : 500).json({ error: responseData.error });
    }

    const text = responseData?.choices?.[0]?.message?.content;

    if (!text) {
      return res.status(500).json({ error: 'Respuesta vacía del modelo', debug: responseData });
    }

    return res.status(200).json({
      content: [{ type: 'text', text }],
    });

  } catch (err) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'Timeout esperando respuesta de OpenRouter' });
    }
    return res.status(500).json({ error: 'Error de red: ' + err.message });
  }
});

module.exports = router;
