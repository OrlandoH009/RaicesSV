const express = require('express');
const router = express.Router();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const MODEL = 'meta-llama/llama-3.1-8b-instruct'; // O el ID exacto de Llama que uses
const MAX_TOKENS = 800;   // Protege tu presupuesto manteniendo las respuestas al grano
const TIMEOUT_MS = 25000;

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
    max_tokens: MAX_TOKENS, // Súper directo
    temperature: 0.3, // Rápido y preciso
    stream: true // <--- HABILITA EL STREAMING EN OPENROUTER
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

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Error en OpenRouter' });
    }

    // Cabeceras HTTP para indicarle al navegador que enviaremos texto en partes
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop(); 

      for (const line of lines) {
        const cleanedLine = line.trim();
        if (!cleanedLine || cleanedLine === 'data: [DONE]') continue;

        if (cleanedLine.startsWith('data: ')) {
          try {
            const parsed = JSON.parse(cleanedLine.replace(/^data:\s*/, ''));
            const textChunk = parsed?.choices?.[0]?.delta?.content || '';
            if (textChunk) {
              res.write(textChunk); // Envía la palabra al frontend inmediatamente
            }
          } catch (e) {}
        }
      }
    }
    res.end();

  } catch (err) {
    clearTimeout(timeout);
    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'Timeout esperando respuesta de OpenRouter' });
    }
    return res.status(500).json({ error: 'Error de red: ' + err.message });
  }
});

module.exports = router;