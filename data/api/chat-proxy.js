/* ============================================================
   RAÍCES SV — chat-proxy.js
   Proxy Node.js/Express para OpenRouter (equivalente a chat-proxy.php)
   ============================================================

   Requisitos:
     npm install express cors dotenv

   Ejecutar:
     node chat-proxy.js
   (por defecto en el puerto 3000, configurable con la variable PORT)

   Variable de entorno requerida:
     OPENROUTER_API_KEY=sk-or-v1-tu_key_completa
============================================================ */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// --- Config ---
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const MODEL = 'cohere/north-mini-code:free'; // modelo rápido y gratuito, sin necesidad de reasoning extra
const MAX_TOKENS = 800;   // vuelve a 800, este modelo no necesita el margen extra de reasoning
const TIMEOUT_MS = 30000; // 30s, más que suficiente para un modelo rápido

app.use(cors({ origin: '*', methods: ['POST', 'OPTIONS'] }));
app.use(express.json());

app.post('/chat-proxy', async (req, res) => {
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

    // Log para debug — revisa la consola/logs del proceso Node
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

app.listen(PORT, () => {
  console.log(`Proxy escuchando en http://localhost:${PORT}/chat-proxy`);
});