/* ============================================================
   RAÍCES SV — chatbot.js
   Chatbot flotante de asistencia cultural
   ============================================================ */

(function () {

  const SYSTEM_PROMPT = `Eres el asistente virtual de Raíces SV, una plataforma web dedicada a la cultura, historia y tradiciones de El Salvador. Tu nombre es "Raíz".

Solo puedes responder preguntas relacionadas con los siguientes temas del sitio:
- Sitios culturales de El Salvador (Tazumal, Joya de Cerén, Suchitoto, Catedral Metropolitana, Salvador del Mundo, MUNA)
- Gastronomía salvadoreña (pupusas, tamales, sopa de pata, yuca frita, atol de elote, semita)
- Eventos culturales (Fiestas Agostinas, fiestas patronales, Semana Santa, Día de Independencia, Día de los Difuntos, Navidad)
- Historia de El Salvador (época prehispánica, colonia, independencia, siglo XX, conflicto armado, El Salvador hoy)
- Leyendas salvadoreñas (Siguanaba, Cipitío, Cadejo, Llorona, Descarnada, Duende)
- Cualquier tema cultural, histórico o turístico de El Salvador

Si te preguntan algo que no tiene relación con El Salvador, su cultura, historia, gastronomía, tradiciones o el sitio Raíces SV, responde exactamente: "No tengo respuesta a temas no relacionados al sitio."

Responde siempre en español, de forma amable, concisa y educativa. Usa un tono cálido y cercano que refleje el orgullo por la cultura salvadoreña.`;

  const PROXY_URL = '../../data/api/chat-proxy.php';

  const STYLES = `
    #rs-chat-widget * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Lato', sans-serif; }

    #rs-chat-btn {
      position: fixed;
      bottom: 28px;
      left: 28px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #113068;
      border: 3px solid #be8e56;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      box-shadow: 0 4px 20px rgba(0,0,0,0.4);
      transition: transform .25s, box-shadow .25s;
    }
    #rs-chat-btn:hover { transform: scale(1.08); box-shadow: 0 6px 28px rgba(0,0,0,0.5); }
    #rs-chat-btn svg { width: 28px; height: 28px; fill: #fff; }
    #rs-chat-btn .rs-close-icon { display: none; }
    #rs-chat-btn.open .rs-chat-icon { display: none; }
    #rs-chat-btn.open .rs-close-icon { display: block; }

    #rs-chat-bubble {
      position: fixed;
      bottom: 100px;
      left: 28px;
      background: #113068;
      color: #fff;
      font-family: 'Playfair Display', serif;
      font-size: 13px;
      font-weight: 600;
      padding: 8px 14px;
      border-radius: 12px 12px 12px 0;
      border: 1.5px solid #be8e56;
      z-index: 9998;
      white-space: nowrap;
      animation: rs-bubble-in .4s ease both;
      cursor: pointer;
    }
    #rs-chat-bubble::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 16px;
      border: 4px solid transparent;
      border-top-color: #be8e56;
    }
    @keyframes rs-bubble-in {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    #rs-chat-window {
      position: fixed;
      bottom: 100px;
      left: 28px;
      width: 340px;
      max-height: 520px;
      background: #000;
      border: 1.5px solid #be8e56;
      border-radius: 16px;
      display: flex;
      flex-direction: column;
      z-index: 9998;
      overflow: hidden;
      box-shadow: 0 12px 48px rgba(0,0,0,.7);
      animation: rs-window-in .3s cubic-bezier(.4,0,.2,1) both;
    }
    @keyframes rs-window-in {
      from { opacity: 0; transform: translateY(20px) scale(.96); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    #rs-chat-header {
      background: #113068;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      border-bottom: 1.5px solid #be8e56;
      flex-shrink: 0;
    }
    #rs-chat-header .rs-avatar {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: #be8e56;
      display: flex; align-items: center; justify-content: center;
      font-family: 'Playfair Display', serif;
      font-weight: 700; font-size: 16px; color: #fff;
      flex-shrink: 0;
    }
    #rs-chat-header .rs-header-info { flex: 1; }
    #rs-chat-header .rs-name {
      font-family: 'Playfair Display', serif;
      font-weight: 700; font-size: 15px; color: #fff;
    }
    #rs-chat-header .rs-status { font-size: 11px; color: rgba(255,255,255,.6); margin-top: 2px; }
    #rs-chat-header .rs-dot {
      width: 7px; height: 7px; border-radius: 50%;
      background: #22c55e; display: inline-block; margin-right: 4px;
    }

    #rs-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      scrollbar-width: thin;
      scrollbar-color: #be8e56 #111;
    }
    #rs-chat-messages::-webkit-scrollbar { width: 4px; }
    #rs-chat-messages::-webkit-scrollbar-track { background: #111; }
    #rs-chat-messages::-webkit-scrollbar-thumb { background: #be8e56; border-radius: 2px; }

    .rs-msg { display: flex; flex-direction: column; max-width: 82%; }
    .rs-msg.bot  { align-self: flex-start; }
    .rs-msg.user { align-self: flex-end; }
    .rs-msg-bubble { padding: 10px 13px; border-radius: 14px; font-size: 13.5px; line-height: 1.55; }
    .rs-msg.bot  .rs-msg-bubble {
      background: #0d0d0d;
      border: 1px solid rgba(190,142,86,.25);
      color: rgba(255,255,255,.88);
      border-radius: 4px 14px 14px 14px;
    }
    .rs-msg.user .rs-msg-bubble {
      background: #113068;
      color: #fff;
      border-radius: 14px 14px 4px 14px;
    }

    .rs-typing {
      display: flex; gap: 5px; align-items: center;
      padding: 12px 14px;
      background: #0d0d0d;
      border: 1px solid rgba(190,142,86,.25);
      border-radius: 4px 14px 14px 14px;
      align-self: flex-start;
      max-width: 70px;
    }
    .rs-typing span {
      width: 7px; height: 7px; border-radius: 50%;
      background: #be8e56;
      animation: rs-bounce .9s infinite;
    }
    .rs-typing span:nth-child(2) { animation-delay: .15s; }
    .rs-typing span:nth-child(3) { animation-delay: .3s; }
    @keyframes rs-bounce {
      0%,80%,100% { transform: translateY(0); opacity: .4; }
      40%          { transform: translateY(-6px); opacity: 1; }
    }

    #rs-chat-footer {
      padding: 12px 14px;
      border-top: 1px solid rgba(190,142,86,.2);
      display: flex;
      gap: 8px;
      flex-shrink: 0;
      background: #080808;
    }
    #rs-chat-input {
      flex: 1;
      background: #111;
      border: 1.5px solid rgba(190,142,86,.3);
      border-radius: 20px;
      padding: 9px 14px;
      color: #fff;
      font-size: 13.5px;
      outline: none;
      transition: border-color .2s;
      font-family: 'Lato', sans-serif;
      height: 38px;
    }
    #rs-chat-input:focus { border-color: #be8e56; }
    #rs-chat-input::placeholder { color: rgba(255,255,255,.3); }
    #rs-chat-send {
      width: 38px; height: 38px; flex-shrink: 0;
      background: #be8e56;
      border: none; border-radius: 50%;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background .2s, transform .15s;
    }
    #rs-chat-send:hover { background: #a87a42; transform: scale(1.07); }
    #rs-chat-send:disabled { background: #555; cursor: default; transform: none; }
    #rs-chat-send svg { width: 17px; height: 17px; fill: #fff; }

    .rs-quick-btns { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
    .rs-quick-btn {
      font-size: 11.5px;
      font-family: 'Playfair Display', serif;
      font-weight: 600;
      color: #be8e56;
      background: rgba(190,142,86,.1);
      border: 1px solid rgba(190,142,86,.3);
      border-radius: 20px;
      padding: 4px 10px;
      cursor: pointer;
      transition: background .2s;
      white-space: nowrap;
    }
    .rs-quick-btn:hover { background: rgba(190,142,86,.22); }

    @media (max-width: 420px) {
      #rs-chat-window { width: calc(100vw - 24px); left: 12px; bottom: 90px; }
      #rs-chat-btn    { left: 16px; bottom: 16px; }
    }
  `;

  const QUICK_QUESTIONS = [
    '¿Qué son las pupusas?',
    '¿Qué es Joya de Cerén?',
    '¿Quién es la Siguanaba?',
    '¿Cuándo son las Fiestas Agostinas?',
  ];

  let conversationHistory = [];
  let isOpen      = false;
  let isLoading   = false;
  let bubbleHidden = false;

  function init() {
    const styleEl = document.createElement('style');
    styleEl.textContent = STYLES;
    document.head.appendChild(styleEl);

    const wrap = document.createElement('div');
    wrap.id = 'rs-chat-widget';

    const bubble = document.createElement('div');
    bubble.id = 'rs-chat-bubble';
    bubble.textContent = '¡Hola! ¿Tienes dudas sobre El Salvador?';
    bubble.addEventListener('click', toggleChat);

    const btn = document.createElement('button');
    btn.id = 'rs-chat-btn';
    btn.setAttribute('aria-label', 'Abrir asistente de Raíces SV');
    btn.innerHTML = `
      <svg class="rs-chat-icon" viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2zm-8 10H8V10h4v2zm4-4H8V6h8v2z"/></svg>
      <svg class="rs-close-icon" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    `;
    btn.addEventListener('click', toggleChat);

    const win = document.createElement('div');
    win.id = 'rs-chat-window';
    win.style.display = 'none';
    win.innerHTML = `
      <div id="rs-chat-header">
        <div class="rs-avatar">R</div>
        <div class="rs-header-info">
          <div class="rs-name">Raíz — Asistente</div>
          <div class="rs-status"><span class="rs-dot"></span>En línea</div>
        </div>
      </div>
      <div id="rs-chat-messages"></div>
      <div id="rs-chat-footer">
        <input type="text" id="rs-chat-input" placeholder="Escribe tu pregunta..." maxlength="400" />
        <button id="rs-chat-send" aria-label="Enviar">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    `;

    wrap.appendChild(bubble);
    wrap.appendChild(win);
    wrap.appendChild(btn);
    document.body.appendChild(wrap);

    document.getElementById('rs-chat-send').addEventListener('click', sendMessage);
    document.getElementById('rs-chat-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });

    setTimeout(() => {
      if (!isOpen && !bubbleHidden) {
        const b = document.getElementById('rs-chat-bubble');
        if (b) { b.style.opacity = '0'; setTimeout(() => b.remove(), 300); }
        bubbleHidden = true;
      }
    }, 6000);

    addBotMessage("¡Hola! Soy **Raíz**, tu guía cultural de Raíces SV. 🌿\n\nPuedo ayudarte con información sobre la historia, gastronomía, leyendas, sitios culturales y eventos de El Salvador. ¿Qué deseas saber?", true);
  }

  function toggleChat() {
    isOpen = !isOpen;
    const win    = document.getElementById('rs-chat-window');
    const btn    = document.getElementById('rs-chat-btn');
    const bubble = document.getElementById('rs-chat-bubble');

    if (isOpen) {
      win.style.display = 'flex';
      btn.classList.add('open');
      btn.setAttribute('aria-label', 'Cerrar asistente');
      if (bubble) { bubble.style.opacity = '0'; setTimeout(() => bubble.remove(), 200); bubbleHidden = true; }
      setTimeout(() => document.getElementById('rs-chat-input')?.focus(), 100);
    } else {
      win.style.display = 'none';
      btn.classList.remove('open');
      btn.setAttribute('aria-label', 'Abrir asistente de Raíces SV');
    }
  }

  function addBotMessage(text, withQuick = false) {
    const msgs = document.getElementById('rs-chat-messages');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = 'rs-msg bot';
    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    div.innerHTML = `<div class="rs-msg-bubble">${formatted}</div>`;
    if (withQuick) {
      const qWrap = document.createElement('div');
      qWrap.className = 'rs-quick-btns';
      QUICK_QUESTIONS.forEach(q => {
        const b = document.createElement('button');
        b.className = 'rs-quick-btn';
        b.textContent = q;
        b.addEventListener('click', () => sendUserText(q));
        qWrap.appendChild(b);
      });
      div.appendChild(qWrap);
    }
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addUserMessage(text) {
    const msgs = document.getElementById('rs-chat-messages');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = 'rs-msg user';
    div.innerHTML = `<div class="rs-msg-bubble">${escapeHtml(text)}</div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    const msgs = document.getElementById('rs-chat-messages');
    if (!msgs) return;
    const div = document.createElement('div');
    div.id = 'rs-typing-indicator';
    div.className = 'rs-typing';
    div.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function hideTyping() {
    document.getElementById('rs-typing-indicator')?.remove();
  }

  function escapeHtml(t) {
    return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function sendMessage() {
    const input = document.getElementById('rs-chat-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text || isLoading) return;
    input.value = '';
    sendUserText(text);
  }

  async function sendUserText(text) {
    if (isLoading) return;
    const sendBtn = document.getElementById('rs-chat-send');
    isLoading = true;
    if (sendBtn) sendBtn.disabled = true;

    addUserMessage(text);
    conversationHistory.push({ role: 'user', content: text });
    showTyping();

    try {
      const response = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system:   SYSTEM_PROMPT,
          messages: conversationHistory
        })
      });

      const data = await response.json();
      hideTyping();

      const reply = data?.content?.[0]?.text || 'Lo siento, hubo un problema. Intenta de nuevo.';
      conversationHistory.push({ role: 'assistant', content: reply });
      addBotMessage(reply);

    } catch (err) {
      hideTyping();
      addBotMessage('Hubo un problema de conexión. Por favor intenta de nuevo.');
      console.error('Chatbot error:', err);
    }

    isLoading = false;
    if (sendBtn) sendBtn.disabled = false;
    document.getElementById('rs-chat-input')?.focus();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
