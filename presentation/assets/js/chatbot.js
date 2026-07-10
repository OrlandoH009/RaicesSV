/* ============================================================
   RAÍCES SV — chatbot.js
   Chatbot flotante de asistencia cultural
   ============================================================ */
(function () {

  // Lugares verificados en el mapa interactivo (mapa.html) de El Salvador.
  const RAICES_LANDMARKS_INFO = `
SITIOS CULTURALES: Tazumal (Chalchuapa, Santa Ana), Joya de Cerén (San Juan Opico, La Libertad), Salvador del Mundo (San Salvador), Suchitoto (Cuscatlán), Catedral Metropolitana (San Salvador), MUNA (San Salvador), Ruinas de San Andrés (Ciudad Arce, La Libertad), El Boquerón (Volcán de San Salvador, San Salvador).
GASTRONOMÍA: Pupusería El Caserío (Santa Ana), Semitas de Cojutepeque (Cuscatlán), Mercado Central de San Salvador (San Salvador), Nahuizalco - Mercado Nocturno (Sonsonate).
EVENTOS Y FESTIVIDADES: Plaza las Américas (San Salvador), Panchimalco (San Salvador), Festival de Suchitoto (Cuscatlán), Catedral de Santa Ana (Santa Ana), Fiestas Agostinas (San Salvador), Día de los Farolitos (Ahuachapán), Fiestas Julias (Santa Ana), Fiestas Patronales de San Vicente (San Vicente), Festival de las Flores y Palmas (La Libertad), Gran Carnaval de San Miguel (San Miguel), Fiestas de los Historiantes de Cuisnahuat (Sonsonate), Festival del Jocote Corona (Santa Ana), Día de la Calabiuza (Cuscatlán), Festival de los Canastos (Cabañas), Día de la Cruz (San Salvador), Festival del Maíz (Chalatenango), Fiestas del Bálsamo (La Libertad), Feria del Membrillo (Morazán), Fiestas Patronales de La Unión (La Unión), Festival de los Farolitos en Ataco (Ahuachapán), Festival de la Panela (Cuscatlán), Fiestas del Rey Guajactial (Sonsonate), Festival del Cangrejo (La Paz), Romería de Esquipulas (Chalatenango), Festival del Barro (Cabañas), Fiestas del Arroz (San Vicente), Festival de la Juventudes Populares (Morazán), Feria del Marisco (Usulután), Fiesta de la Primicia de la Cosecha (La Unión), Carnaval de la Panela de Verapaz (San Vicente), Fiestas Patronales de Cojutepeque (Cuscatlán), Festival del Añil (Cuscatlán), Fiestas Patronales de Gotera (Morazán), Festival Internacional del Chicharrón (La Libertad).
HISTORIA: Casa de la Cultura de Izalco (Sonsonate), Casa de la Independencia (San Salvador), Iglesia El Rosario (San Salvador).
LEYENDAS: Lago de Coatepeque (Santa Ana), Bosque El Imposible (Ahuachapán), Puerta del Diablo (Los Planes de Renderos, Panchimalco).
  `.trim();

  const SYSTEM_PROMPT = `Eres "Pupusita", asistente de Raíces SV. Responde SIEMPRE en español, incluso si te preguntan en otro idioma. Solo hablas sobre cultura, historia, gastronomía, turismo y leyendas de El Salvador (Año actual: 2026).

REGLAS CRÍTICAS DE RESPUESTA:
1. Idioma obligatorio: Habla única y exclusivamente en español salvadoreño/estándar.
2. Ultra corto: Ve directo al punto en la primera frase. Máximo 2-3 líneas (30-50 palabras). Sin rodeos.
3. Formato: Resalta en **negrita** el tema principal la primera vez que lo nombres.
4. Preguntas relacionadas con el Salvador tambien son validas , ya sea de su territorio, presidentes y noticias de actualidad. No respondas preguntas de otros paises, ni de politica internacional.
5. Nombres exactos: Si citas lugares de esta lista, escríbelos EXACTAMENTE igual para activar el mapa interactivo. No inventes sitios.
${RAICES_LANDMARKS_INFO}
6. Filtro: Si te saludan, sé cálido y preséntate brevemente. Si insultan, modera con una frase. Si es ajeno a El Salvador, responde ÚNICAMENTE: "No tengo respuesta a temas no relacionados al sitio."`;

  const PLANNER_SYSTEM_PROMPT = `Eres "Pupusita" en modo "Planificador de salidas". Responde SIEMPRE en español. Crea itinerarios turísticos rápidos y reales en El Salvador usando dólares ($ USD).

REGLAS CRÍTICAS DEL PLAN:
1. Idioma obligatorio: Todo el plan y los textos deben estar en español.
2. Formato: No escribas párrafos. Responde solo con una lista numerada de actividades muy breves (1 línea por actividad).
3. Costos: Pon el precio estimado al lado de cada actividad y el total al final.
4. Nombres exactos: Prioriza y escribe EXACTAMENTE igual los nombres de esta lista para activar el mapa interactivo:
${RAICES_LANDMARKS_INFO}
5. Cierre: Termina con un solo tip práctico de una línea.`;


  const PROXY_URL = '/chat-proxy';

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

    #rs-planner-toggle {
      display: flex;
      align-items: center;
      gap: 5px;
      background: rgba(255,255,255,.08);
      border: 1.5px solid rgba(190,142,86,.5);
      color: rgba(255,255,255,.85);
      font-family: 'Playfair Display', serif;
      font-weight: 600;
      font-size: 10.5px;
      padding: 6px 10px;
      border-radius: 16px;
      cursor: pointer;
      flex-shrink: 0;
      transition: background .2s, border-color .2s, color .2s;
      white-space: nowrap;
    }
    #rs-planner-toggle svg { width: 13px; height: 13px; fill: currentColor; flex-shrink: 0; }
    #rs-planner-toggle:hover { background: rgba(190,142,86,.2); }
    #rs-planner-toggle.active {
      background: #be8e56;
      border-color: #be8e56;
      color: #113068;
    }
    #rs-planner-toggle.active:hover { background: #a87a42; }

    .rs-planner-btn {
      color: #113068;
      background: #be8e56;
      border-color: #be8e56;
      font-weight: 700;
    }
    .rs-planner-btn:hover { background: #a87a42; }
    .rs-cancel-btn {
      color: rgba(255,255,255,.55);
      border-color: rgba(255,255,255,.2);
      background: transparent;
    }
    .rs-cancel-btn:hover { background: rgba(255,255,255,.08); }

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
    .rs-msg-bubble { padding: 9px 12px; border-radius: 14px; font-size: 12.5px; line-height: 1.5; }
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
      font-size: 12.5px;
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

    .rs-map-btn {
      color: #7fc3f0;
      background: rgba(82,160,224,.12);
      border-color: rgba(82,160,224,.4);
      text-decoration: none;
    }
    .rs-map-btn:hover { background: rgba(82,160,224,.22); }

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

  // Mismos id + nombre que el array LANDMARKS de mapa.html.
  // Si agregas/editas landmarks allá, actualiza esta lista también para que los botones de mapa sigan funcionando.
  const LANDMARKS_MINI = [
    { id: 1,  nombre: 'Tazumal' },
    { id: 2,  nombre: 'Joya de Cerén' },
    { id: 3,  nombre: 'Salvador del Mundo' },
    { id: 4,  nombre: 'Suchitoto' },
    { id: 5,  nombre: 'Catedral Metropolitana' },
    { id: 6,  nombre: 'MUNA' },
    { id: 7,  nombre: 'Ruinas de San Andrés' },
    { id: 8,  nombre: 'Pupusería El Caserío' },
    { id: 9,  nombre: 'Semitas de Cojutepeque' },
    { id: 10, nombre: 'Mercado Central de San Salvador' },
    { id: 11, nombre: 'Nahuizalco — Mercado Nocturno' },
    { id: 12, nombre: 'Plaza las Américas' },
    { id: 13, nombre: 'Panchimalco' },
    { id: 14, nombre: 'Festival de Suchitoto' },
    { id: 15, nombre: 'Catedral de Santa Ana' },
    { id: 16, nombre: 'Casa de la Cultura de Izalco' },
    { id: 17, nombre: 'Casa de la Independencia' },
    { id: 18, nombre: 'Iglesia El Rosario' },
    { id: 19, nombre: 'Lago de Coatepeque' },
    { id: 20, nombre: 'Bosque El Imposible' },
    { id: 21, nombre: 'Fiestas Agostinas' },
    { id: 22, nombre: 'Día de los Farolitos' },
    { id: 23, nombre: 'Fiestas Julias' },
    { id: 24, nombre: 'Fiestas Patronales de San Vicente' },
    { id: 25, nombre: 'Festival de las Flores y Palmas' },
    { id: 26, nombre: 'Gran Carnaval de San Miguel' },
    { id: 27, nombre: 'Fiestas de los Historiantes de Cuisnahuat' },
    { id: 28, nombre: 'Festival del Jocote Corona' },
    { id: 29, nombre: 'Día de la Calabiuza' },
    { id: 30, nombre: 'Festival de los Canastos' },
    { id: 31, nombre: 'Día de la Cruz' },
    { id: 32, nombre: 'Festival del Maíz' },
    { id: 33, nombre: 'Fiestas del Bálsamo' },
    { id: 34, nombre: 'Feria del Membrillo' },
    { id: 35, nombre: 'Fiestas Patronales de La Unión' },
    { id: 36, nombre: 'Festival de los Farolitos en Ataco' },
    { id: 37, nombre: 'Festival de la Panela' },
    { id: 38, nombre: 'Fiestas del Rey Guajactial' },
    { id: 39, nombre: 'Festival del Cangrejo' },
    { id: 40, nombre: 'Romería de Esquipulas' },
    { id: 41, nombre: 'Festival del Barro' },
    { id: 42, nombre: 'Fiestas del Arroz' },
    { id: 43, nombre: 'Festival de la Juventudes Populares' },
    { id: 44, nombre: 'Feria del Marisco' },
    { id: 45, nombre: 'Fiesta de la Primicia de la Cosecha' },
    { id: 46, nombre: 'Carnaval de la Panela de Verapaz' },
    { id: 47, nombre: 'Fiestas Patronales de Cojutepeque' },
    { id: 48, nombre: 'Festival del Añil' },
    { id: 49, nombre: 'Fiestas Patronales de Gotera' },
    { id: 50, nombre: 'Festival Internacional del Chicharrón' },
    { id: 51, nombre: 'El Boquerón' },
    { id: 52, nombre: 'Puerta del Diablo' },
  ];

  let conversationHistory = [];
  let isOpen      = false;
  let isLoading   = false;
  let bubbleHidden = false;

  // --- Estado del planificador de salidas ---
  let plannerMode = false;   // true = interruptor activado
  let plannerStep = null;    // 'activity' | 'budget' | 'duration' | 'details' | 'generating' | 'done' | null
  let plannerData = {};
  let pendingButtonsWrap = null; // referencia a botones de opción pendientes en el chat

  const PLANNER_ACTIVITY_OPTIONS = [
    { id: 'food',    label: '🍲 Gastronomía',        value: 'gastronomía típica salvadoreña (pupusas, mercados, comida local)' },
    { id: 'history', label: '🏛️ Historia y sitios',  value: 'sitios históricos y arqueológicos (ruinas, museos, iglesias coloniales)' },
    { id: 'events',  label: '🎉 Eventos y fiestas',  value: 'eventos y fiestas patronales o culturales' },
    { id: 'legends', label: '👻 Leyendas',           value: 'lugares y rutas relacionadas con leyendas salvadoreñas' },
    { id: 'mixed',   label: '🌄 Un poco de todo',    value: 'una mezcla de gastronomía, historia y cultura general' },
  ];

  const PLANNER_BUDGET_OPTIONS = [
    { label: '💵 Económico ($5–$15)', value: 'un presupuesto económico, entre $5 y $15 dólares' },
    { label: '💰 Moderado ($15–$40)', value: 'un presupuesto moderado, entre $15 y $40 dólares' },
    { label: '💎 Alto ($40+)',        value: 'un presupuesto alto, de más de $40 dólares' },
  ];

  const PLANNER_TIME_OPTIONS = [
    { label: '⏱️ Medio día',   value: 'medio día (aproximadamente 3-4 horas)' },
    { label: '🌞 Día completo', value: 'un día completo' },
    { label: '📅 Fin de semana', value: 'un fin de semana completo' },
  ];

  // Pregunta de seguimiento según la actividad elegida, para afinar el plan
  const PLANNER_DETAIL_QUESTIONS = {
    food:    '¿Hay algún platillo o tipo de comida que te encante o quieras probar sí o sí? (ej. pupusas revueltas, mariscos, algo dulce, comida típica de algún departamento en especial...)',
    history: '¿Te interesa más algún periodo en particular (prehispánico, colonial, siglo XX) o algún sitio específico que ya tengas en mente?',
    events:  '¿Tienes una fecha aproximada en mente, o algún tipo de evento que prefieras (fiestas patronales, religiosas, más folclóricas)?',
    legends: '¿Hay alguna leyenda que te llame especialmente la atención (Siguanaba, Cipitío, Cadejo, etc.) o prefieres que te sorprenda?',
    mixed:   '¿Hay algo específico que no te quiera perder —comida, un lugar, una leyenda— para incluirlo en el plan?',
  };
  const PLANNER_DETAIL_FALLBACK = '¿Hay algo específico que te gustaría incluir en tu plan (comida favorita, tipo de lugar, algo que no te quieras perder)?';

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
          <div class="rs-name">Pupusita — Asistente</div>
          <div class="rs-status"><span class="rs-dot"></span>En línea</div>
        </div>
        <button id="rs-planner-toggle" aria-pressed="false" title="Activar planificador de salidas">
          <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>
          <span>Planificar</span>
        </button>
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
    document.getElementById('rs-planner-toggle').addEventListener('click', togglePlannerMode);

    setTimeout(() => {
      if (!isOpen && !bubbleHidden) {
        const b = document.getElementById('rs-chat-bubble');
        if (b) { b.style.opacity = '0'; setTimeout(() => b.remove(), 300); }
        bubbleHidden = true;
      }
    }, 6000);

    addBotMessage("¡Hola! Soy **Pupusita**, tu guía cultural de Raíces SV. 🌿\n\nPuedo ayudarte con información sobre la historia, gastronomía, leyendas, sitios culturales y eventos de El Salvador. ¿Qué deseas saber?\n\n💡 Tip: activa el botón **Planificar** de arriba y te ayudo a armar una salida según lo que quieras hacer y tu presupuesto.", true);
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

  // Convierte Markdown simple (negrita, saltos de línea) a HTML seguro para las burbujas del chat.
  function formatMessageText(text) {
    return escapeHtml(text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  // Reutiliza el link "Mapa" que ya existe en el navbar de la página actual,
  // así el botón siempre apunta a la ruta relativa correcta sin importar en qué página esté el chatbot.
  function getMapaUrl() {
    const navLink = document.querySelector('a[href$="mapa.html"], a[href*="mapa.html"]');
    if (navLink) return navLink.getAttribute('href');
    return 'mapa.html'; // fallback si no se encuentra el link en la página
  }

  // Busca en el texto de la respuesta del bot nombres de landmarks reales del mapa,
  // para poder ofrecer un botón "Ver en el mapa" por cada uno (máximo 4 para no saturar el chat).
  function findMentionedLandmarks(text) {
    if (!text) return [];
    const found = [];
    let workingText = text;
    const sorted = [...LANDMARKS_MINI].sort((a, b) => b.nombre.length - a.nombre.length);
    sorted.forEach(lm => {
      const escapedName = lm.nombre.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(escapedName, 'i');
      if (re.test(workingText)) {
        found.push(lm);
        // Se quita del texto de trabajo para que un nombre corto (ej. "Suchitoto")
        // no se detecte doble dentro de uno más largo (ej. "Festival de Suchitoto").
        workingText = workingText.replace(re, '');
      }
    });
    return found.slice(0, 4);
  }

  function addBotMessage(text, withQuick = false, mapLandmarks = []) {
    const msgs = document.getElementById('rs-chat-messages');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = 'rs-msg bot';
    const formatted = formatMessageText(text);
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
    if (mapLandmarks && mapLandmarks.length) {
      const mapWrap = document.createElement('div');
      mapWrap.className = 'rs-quick-btns';
      const mapaUrl = getMapaUrl();
      mapLandmarks.forEach(lm => {
        const a = document.createElement('a');
        a.className = 'rs-quick-btn rs-map-btn';
        a.href = `${mapaUrl}${mapaUrl.includes('?') ? '&' : '?'}evento=${lm.id}`;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = `📍 Ver ${lm.nombre} en el mapa`;
        mapWrap.appendChild(a);
      });
      div.appendChild(mapWrap);
    }
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function addBotMessageWithButtons(text, buttons, includeCancel) {
    const msgs = document.getElementById('rs-chat-messages');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = 'rs-msg bot';
    const formatted = formatMessageText(text);
    div.innerHTML = `<div class="rs-msg-bubble">${formatted}</div>`;

    const qWrap = document.createElement('div');
    qWrap.className = 'rs-quick-btns';
    buttons.forEach(opt => {
      const b = document.createElement('button');
      b.className = 'rs-quick-btn rs-planner-btn';
      b.textContent = opt.label;
      b.addEventListener('click', () => {
        qWrap.remove();
        if (pendingButtonsWrap === qWrap) pendingButtonsWrap = null;
        opt.onClick();
      });
      qWrap.appendChild(b);
    });
    if (includeCancel) {
      const cancelBtn = document.createElement('button');
      cancelBtn.className = 'rs-quick-btn rs-cancel-btn';
      cancelBtn.textContent = '✖ Cancelar planificador';
      cancelBtn.addEventListener('click', () => {
        qWrap.remove();
        if (pendingButtonsWrap === qWrap) pendingButtonsWrap = null;
        setPlannerToggle(false);
        cancelPlannerFlow();
      });
      qWrap.appendChild(cancelBtn);
    }
    div.appendChild(qWrap);
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
    pendingButtonsWrap = qWrap;
  }

  function setInputEnabled(enabled, placeholder) {
    const input   = document.getElementById('rs-chat-input');
    const sendBtn = document.getElementById('rs-chat-send');
    if (!input) return;
    input.disabled = !enabled;
    if (sendBtn) sendBtn.disabled = !enabled || isLoading;
    input.placeholder = placeholder || 'Escribe tu pregunta...';
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

  // --- Lógica del planificador de salidas ---

  function setPlannerToggle(active) {
    plannerMode = active;
    const toggleBtn = document.getElementById('rs-planner-toggle');
    if (!toggleBtn) return;
    toggleBtn.classList.toggle('active', active);
    toggleBtn.setAttribute('aria-pressed', active ? 'true' : 'false');
  }

  function togglePlannerMode() {
    if (isLoading) return;
    if (!plannerMode) {
      setPlannerToggle(true);
      startPlannerFlow();
    } else {
      setPlannerToggle(false);
      cancelPlannerFlow();
    }
  }

  function startPlannerFlow() {
    plannerStep = 'activity';
    plannerData = {};
    setInputEnabled(false, 'Selecciona una opción arriba...');
    addBotMessageWithButtons(
      '¡Perfecto! Activaste el **Planificador de salidas**. 🧭\n\nVamos a armar tu plan ideal por El Salvador. Primero, ¿qué te gustaría hacer?',
      PLANNER_ACTIVITY_OPTIONS.map(opt => ({ label: opt.label, onClick: () => handlePlannerActivity(opt) })),
      true
    );
  }

  function handlePlannerActivity(opt) {
    plannerData.activity   = opt.value;
    plannerData.activityId = opt.id;
    addUserMessage(opt.label);
    plannerStep = 'budget';
    addBotMessageWithButtons(
      'Genial. ¿Cuál es tu presupuesto aproximado para esta salida?',
      PLANNER_BUDGET_OPTIONS.map(opt => ({ label: opt.label, onClick: () => handlePlannerBudget(opt) })),
      true
    );
  }

  function handlePlannerBudget(opt) {
    plannerData.budget = opt.value;
    addUserMessage(opt.label);
    plannerStep = 'duration';
    addBotMessageWithButtons(
      'Perfecto. ¿Cuánto tiempo tienes disponible para tu salida?',
      PLANNER_TIME_OPTIONS.map(opt => ({ label: opt.label, onClick: () => handlePlannerDuration(opt) })),
      true
    );
  }

  function handlePlannerDuration(opt) {
    plannerData.duration = opt.value;
    addUserMessage(opt.label);
    askPlannerDetails();
  }

  // Pregunta de seguimiento libre, según la actividad elegida, antes de generar el plan
  function askPlannerDetails() {
    plannerStep = 'details';
    const question = PLANNER_DETAIL_QUESTIONS[plannerData.activityId] || PLANNER_DETAIL_FALLBACK;

    addBotMessageWithButtons(
      `Una última cosa para personalizar tu plan 🙂\n\n${question}\n\nPuedes escribir tu respuesta abajo, o si prefieres, omite este paso.`,
      [
        {
          label: '⏭️ Omitir, ya tengo suficiente',
          onClick: () => {
            plannerData.details = '';
            plannerStep = 'generating';
            generatePlan();
          }
        }
      ],
      true
    );

    setInputEnabled(true, 'Escribe tu respuesta aquí...');
    document.getElementById('rs-chat-input')?.focus();
  }

  async function generatePlan() {
    setInputEnabled(false, 'Generando tu plan...');
    showTyping();

    const userPrompt = `Planifícame una salida con estas preferencias:
- Actividad deseada: ${plannerData.activity}
- Presupuesto: ${plannerData.budget}
- Tiempo disponible: ${plannerData.duration}${plannerData.details ? `\n- Preferencias específicas del usuario: ${plannerData.details}` : ''}

Dame un plan concreto y realista dentro de El Salvador, con lugares específicos a visitar, un orden sugerido y un estimado de gasto total dentro del presupuesto indicado.${plannerData.details ? ' Toma en cuenta especialmente la preferencia específica que indicó el usuario.' : ''}`;

    try {
      const response = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system:   PLANNER_SYSTEM_PROMPT,
          messages: [{ role: 'user', content: userPrompt }]
        })
      });

      const data = await response.json();
      hideTyping();

      const reply = data?.content?.[0]?.text || 'No pude generar tu plan en este momento. Intenta de nuevo.';
      addBotMessage(reply, false, findMentionedLandmarks(reply));
      plannerStep = 'done';

      addBotMessageWithButtons('¿Quieres planificar otra salida o volver al chat normal?', [
        { label: '🔁 Planificar otra salida', onClick: startPlannerFlow },
        { label: '✅ Volver al chat normal', onClick: () => { setPlannerToggle(false); cancelPlannerFlow(true); } },
      ], false);

    } catch (err) {
      hideTyping();
      addBotMessage('Hubo un problema generando tu plan. Por favor intenta de nuevo.');
      console.error('Planner error:', err);
      plannerStep = 'done';
    }

    setInputEnabled(true);
  }

  function cancelPlannerFlow(silent) {
    plannerStep = null;
    plannerData = {};
    setInputEnabled(true);
    if (!silent) addBotMessage('Planificador desactivado. Puedes seguir chateando normalmente. 😊');
  }

  function sendMessage() {
    const input = document.getElementById('rs-chat-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text || isLoading) return;

    // Si estamos esperando la respuesta libre de detalles del planificador,
    // la capturamos aquí en vez de mandarla al chat normal.
    if (plannerStep === 'details') {
      pendingButtonsWrap?.remove();
      pendingButtonsWrap = null;
      input.value = '';
      addUserMessage(text);
      plannerData.details = text;
      plannerStep = 'generating';
      generatePlan();
      return;
    }

    if (plannerStep && plannerStep !== 'done') return;
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
      addBotMessage(reply, false, findMentionedLandmarks(reply));

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