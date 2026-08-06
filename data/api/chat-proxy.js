require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const MODEL = 'meta-llama/llama-3.1-8b-instruct';
const TIMEOUT_MS = 30000;

app.use(cors({ origin: '*', methods: ['POST', 'OPTIONS'] }));
app.use(express.json());

app.post('/chat-proxy', async (req, res) => {
  if (!OPENROUTER_API_KEY) {
    return res.status(500).json({ error: 'API key no configurada en el servidor' });
  }

  const { system: systemPrompt, messages, max_tokens } = req.body || {};

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

  // Detectar si es una traducción para ajustar tokens
  const isTranslation = systemPrompt && systemPrompt.toLowerCase().includes('translator');
  const tokenLimit = isTranslation ? 2000 : (max_tokens || 800);

  const payload = {
    model: MODEL,
    messages: formattedMessages,
    max_tokens: tokenLimit,
    temperature: isTranslation ? 0.1 : 0.3,
    stream: true,
    providers: {
      order: ["Cloudflare", "DeepInfra"],
      allow_fallbacks: false
    }
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

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

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
              res.write(textChunk);
            }
          } catch (e) {
            // Ignorar errores de parseo
          }
        }
      }
    }
    res.end();

  } catch (err) {
    clearTimeout(timeout);
    
    if (res.headersSent) {
      console.error('Error durante el streaming:', err);
      return res.end();
    }

    if (err.name === 'AbortError') {
      return res.status(504).json({ error: 'Timeout esperando respuesta de OpenRouter' });
    }
    return res.status(500).json({ error: 'Error de red: ' + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy escuchando en http://localhost:${PORT}/chat-proxy`);
});