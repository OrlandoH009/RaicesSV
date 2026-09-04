const express = require('express');
const router = express.Router();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const MODEL = 'meta-llama/llama-3.1-8b-instruct';
const TIMEOUT_MS = 30000;

// Sin requireApiAuth: la skill de Alexa (Lambda) llama a esta ruta como
// servidor a servidor, sin sesión de navegador con la que autenticarse, así
// que exigir login la dejaba siempre en 401.
router.post('/chat-proxy', async (req, res) => {
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

  // Determinar el límite de tokens según el tipo de petición.
  // Para traducciones se respeta el max_tokens que envía el cliente (que
  // reintenta con presupuestos más altos si la traducción se trunca),
  // con un techo de seguridad para no disparar el consumo indefinidamente.
  const isTranslation = systemPrompt && systemPrompt.includes('translator');
  const TRANSLATION_TOKEN_CAP = 16000;
  const tokenLimit = isTranslation
    ? Math.min(max_tokens || 2000, TRANSLATION_TOKEN_CAP)
    : (max_tokens || 800);

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

module.exports = router;