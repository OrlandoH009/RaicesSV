/* ============================================================
  Salvadorean Roots — chatbot.js
  Chatbot flotante con detección dinámica de autenticación
  y traducción automática del historial al cambiar de idioma
   ============================================================ */

(function() {
    // Intentar recuperar estado guardado
    const savedState = localStorage.getItem('userAuthState');
    if (savedState === 'autenticado' || savedState === 'usuario') {
        window.USER_AUTH_STATE = savedState;
    }
    
    // Si sigue sin definirse, poner 'invitado'
    if (!window.USER_AUTH_STATE) {
        window.USER_AUTH_STATE = 'invitado';
    }

  // ==========================================
  // 1. CONFIGURACIÓN DE CONTENEDOR Y SESIÓN
  // ==========================================
  const TARGET_CONTAINER_ID = 'mi-contenedor-chatbot';

  function getAuthState() {
    return window.USER_AUTH_STATE || 'invitado';
  }

  function isAuthenticated() {
    const state = getAuthState();
    return state !== 'invitado' && state !== 'desconectado';
  }

  const PROXY_URL = '/chat-proxy';
  const STORAGE_KEY = 'rs_chat_history';
  const MAX_HISTORY = 4;

  // ==========================================
  // 2. DETECCIÓN DE IDIOMA
  // ==========================================
  const RAICES_LANDMARKS_INFO = `SITIOS CULTURALES: Tazumal (Chalchuapa, Santa Ana), Joya de Cerén (San Juan Opico, La Libertad), Salvador del Mundo (San Salvador), Suchitoto (Cuscatlán), Catedral Metropolitana (San Salvador), MUNA (San Salvador), Ruinas de San Andrés (Ciudad Arce, La Libertad), El Boquerón (Volcán de San Salvador, San Salvador).
GASTRONOMÍA: Pupusería El Caserío (Santa Ana), Semitas de Cojutepeque (Cuscatlán), Mercado Central de San Salvador (San Salvador), Nahuizalco - Mercado Nocturno (Sonsonate).
EVENTOS Y FESTIVIDADES: Plaza las Américas (San Salvador), Panchimalco (San Salvador), Festival de Suchitoto (Cuscatlán), Catedral de Santa Ana (Santa Ana), Fiestas Agostinas (San Salvador), Día de los Farolitos (Ahuachapán), Fiestas Julias (Santa Ana), Fiestas Patronales de San Vicente (San Vicente), Festival de las Flores y Palmas (La Libertad), Gran Carnaval de San Miguel (San Miguel), Fiestas de los Historiantes de Cuisnahuat (Sonsonate), Festival del Jocote Corona (Santa Ana), Día de la Calabiuza (Cuscatlán), Festival de los Canastos (Cabañas), Día de la Cruz (San Salvador), Festival del Maíz (Chalatenango), Fiestas del Bálsamo (La Libertad), Feria del Membrillo (Morazán), Fiestas Patronales de La Unión (La Unión), Festival de los Farolitos en Ataco (Ahuachapán), Festival de la Panela (Cuscatlán), Fiestas del Rey Guajactial (Sonsonate), Festival del Cangrejo (La Paz), Romería de Esquipulas (Chalatenango), Festival del Barro (Cabañas), Fiestas del Arroz (San Vicente), Festival de la Juventudes Populares (Morazán), Feria del Marisco (Usulután), Fiesta de la Primicia de la Cosecha (La Unión), Carnaval de la Panela de Verapaz (San Vicente), Fiestas Patronales de Cojutepeque (Cuscatlán), Festival del Añil (Cuscatlán), Fiestas Patronales de Gotera (Morazán), Festival Internacional del Chicharrón (La Libertad).
HISTORIA: Casa de la Cultura de Izalco (Sonsonate), Casa de la Independencia (San Salvador), Iglesia El Rosario (San Salvador).
LEYENDAS: Lago de Coatepeque (Santa Ana), Bosque El Imposible (Ahuachapán), Puerta del Diablo (Los Planes de Renderos, Panchimalco).`.trim();

  function detectLanguage() {
    if (window.SRi18n && typeof window.SRi18n.getLang === 'function') {
      const lang = window.SRi18n.getLang();
      if (lang) return lang;
    }
    const htmlLang = (document.documentElement.lang || '').toLowerCase();
    const urlPath = window.location.pathname.toLowerCase();
    if (htmlLang.startsWith('en') || urlPath.includes('/en') || urlPath.includes('_en') || urlPath.includes('en.')) {
      return 'en';
    }
    return 'es';
  }

  let currentLang = detectLanguage(); 
  let conversationHistory = [];
  let isOpen = false;
  let isLoading = false;
  let bubbleHidden = false;
  let plannerMode = false;   
  let plannerStep = null;    
  let plannerData = {};
  let isColoquialMode = false;
  let isTranslating = false;

  // ==========================================
  // 3. TEXTOS DE LA UI
  // ==========================================
  const TRANSLATABLE_TEXTS = {
    es: {
      welcomeBubble: '¡Hola! ¿Tienes dudas sobre El Salvador?',
      headerTitle: 'Pupusita — Asistente',
      headerStatus: 'En línea',
      headerLocked: '🔒 Bloqueado',
      btnPlanner: 'Planificar',
      btnPlannerCancel: '✖ Cancelar planificador',
      inputPlaceholder: 'Escribe tu pregunta...',
      inputPlaceholderPlanner: 'Ej. Gastronomía, historia, museos...',
      inputPlaceholderLocation: 'Ej. San Salvador, Santa Ana...',
      inputPlaceholderBudget: 'Ej. $20, económico...',
      inputPlaceholderDuration: 'Ej. 4 horas, medio día...',
      inputPlaceholderDetails: 'Escribe detalles o escribe "omitir"...',
      inputPlaceholderGenerating: 'Generando tu plan...',
      mapLinkText: '📍 Ver {name} en el mapa',
      welcomeMessage: "¡Hola! Soy **Pupusita**, tu guía cultural de Salvadorean Roots. 🌿\n\nPuedo ayudarte con información sobre la historia, gastronomía, leyendas, sitios culturales y eventos de El Salvador. ¿Qué deseas saber?\n\n💡 Tip: activa el botón **Planificar** de arriba y te ayudo a armar una salida según lo que quieras hacer y tu presupuesto.",
      lockedMessage: "🔒 **Acceso restringido**\n\nPara usar el asistente Pupusita, necesitas **iniciar sesión** en Salvadorean Roots.\n\n¡Regístrate o inicia sesión para descubrir toda la cultura salvadoreña! 🇸🇻",
      loginButton: 'Iniciar sesión',
      registerButton: 'Registrarse',
      plannerStart: "¡Perfecto! Activaste el **Planificador de salidas**. 🧭\n\nVamos a armar tu plan ideal por El Salvador. Primero, **¿qué tipo de actividad te gustaría hacer?** (Puedes escribir: *gastronomía, historia, leyendas, playas o un poco de todo*).",
      errValidation: "❌ **Esa no es la información que he solicitado.** Por favor, sigue las indicaciones descritas.",
      plannerLocationPrompt: "Entendido. Ahora, **¿desde qué ciudad o municipio vas a iniciar tu salida?**",
      plannerBudgetPrompt: "Anotado tu punto de partida. **¿Cuál es tu presupuesto aproximado en dólares ($ USD) para esta salida?**",
      plannerDurationPrompt: "Perfecto. **¿Cuánto tiempo tienes disponible para tu salida?**",
      plannerDetailsPrompt: "Una última cosa 🙂: **¿Hay algún platillo, lugar específico o preferencia que quieras incluir sí o sí?** Si no, escribe *\"omitir\"*.",
      plannerSuccess: "¡Tu plan ha sido generado con éxito! El planificador se ha desactivado automáticamente. Puedes seguir haciéndome preguntas normales.",
      errGeneric: "Hubo un problema. Por favor intenta de nuevo.",
      quickQuestions: ['¿Qué son las pupusas?', '¿Qué es Joya de Cerén?', '¿Quién es la Siguanaba?', '¿Cuándo son las Fiestas Agostinas?'],
      coloquialMode: '🇸🇻 Modo cipote',
      coloquialOn: 'Activado',
      coloquialOff: 'Desactivado',
      sharePlan: '📤 Compartir plan',
      planImageAlt: 'Itinerario de Salvadorean Roots',
      chatTranslated: 'Chat traducido'
    },
    en: {
      welcomeBubble: 'Hello! Do you have any questions about El Salvador?',
      headerTitle: 'Pupusita — Assistant',
      headerStatus: 'Online',
      headerLocked: '🔒 Locked',
      btnPlanner: 'Plan Trip',
      btnPlannerCancel: '✖ Cancel planner',
      inputPlaceholder: 'Type your question...',
      inputPlaceholderPlanner: 'E.g., Food, history, museums...',
      inputPlaceholderLocation: 'E.g., San Salvador, Santa Ana...',
      inputPlaceholderBudget: 'E.g., $20, budget...',
      inputPlaceholderDuration: 'E.g., 4 hours, half day...',
      inputPlaceholderDetails: 'Type details or write "skip"...',
      inputPlaceholderGenerating: 'Generating your plan...',
      mapLinkText: '📍 See {name} on the map',
      welcomeMessage: "Hello! I am **Pupusita**, your cultural guide from Salvadorean Roots. 🌿\n\nI can help you with information about history, gastronomy, legends, cultural sites, and events in El Salvador. What do you want to know?\n\n💡 Tip: activate the **Plan Trip** button above and I will help you build an itinerary based on your preferences and budget.",
      lockedMessage: "🔒 **Access restricted**\n\nTo use the Pupusita assistant, you need to **log in** to Salvadorean Roots.\n\nSign up or log in to discover all Salvadoran culture! 🇸🇻",
      loginButton: 'Log in',
      registerButton: 'Sign up',
      plannerStart: "Perfect! You activated the **Trip Planner**. 🧭\n\nLet's plan your ideal trip around El Salvador. First, **what kind of activity would you like to do?**",
      errValidation: "❌ **That is not the information I requested.** Please follow the instructions provided.",
      plannerLocationPrompt: "Understood. Now, **from which city or town will you start your trip?**",
      plannerBudgetPrompt: "Starting point noted. **What is your approximate budget in dollars ($ USD) for this trip?**",
      plannerDurationPrompt: "Perfect. **How much time do you have available for your trip?**",
      plannerDetailsPrompt: "One last thing 🙂: **Is there any specific dish, place, or preference you want to include no matter what?** If not, write *\"skip\"*.",
      plannerSuccess: "Your plan has been generated successfully! The planner has turned off automatically. You can keep asking me regular questions.",
      errGeneric: "There was a problem. Please try again.",
      quickQuestions: ['What are pupusas?', 'What is Joya de Cerén?', 'Who is the Siguanaba?', 'When are the August Festivals?'],
      coloquialMode: '🇸🇻 Slang mode',
      coloquialOn: 'On',
      coloquialOff: 'Off',
      sharePlan: '📤 Share plan',
      planImageAlt: 'Salvadorean Roots Itinerary',
      chatTranslated: 'Chat translated'
    }
  };

  // ==========================================
  // 4. SISTEMA DE PROMPTS
  // ==========================================
  function getSystemPrompt(lang) {
    const basePrompt = lang === 'en' ? 
      `You are "Pupusita", assistant for Salvadorean Roots. ALWAYS respond in English. Only talk about culture, history, gastronomy, tourism, and legends of El Salvador (Current year: 2026).
CRITICAL RESPONSE RULES:
1. Ultra direct and minimalist: Respond in telegraphic style. Forbidden to use introductions. Go straight to the data in the very first word.
2. Maximum length: Strict limit of 1 to 2 short sentences (max 25 words total).
3. Formatting: Bold **the main topic** the first time you mention it.
4. Coverage: Valid questions about Salvadorean territory, presidents, and current local news. Do not respond about other countries.
5. Exact names: If you cite places from the verified list, write them EXACTLY the same way.
${RAICES_LANDMARKS_INFO}
6. Filter: If greeted, say only: "Hello, I am Pupusita. What info are you looking for?". If unrelated to El Salvador, respond ONLY: "I don't have answers for topics unrelated to the site."
7. Language: ALWAYS respond in the same language the user writes to you.` :
      `Eres "Pupusita", asistente de Salvadorean Roots. Responde SIEMPRE en español. Solo hablas sobre cultura, historia, gastronomía, turismo y leyendas de El Salvador (Año actual: 2026).
REGLAS CRÍTICAS DE RESPUESTA:
1. Ultra directo y minimalist: Responde con estilo telegráfico. Prohibido usar introducciones. Ve directo al dato en la primera palabra.
2. Extensión máxima: Límite estricto de 1 a 2 frases cortas (máximo 25 palabras en total).
3. Formato: Resalta en **negrita** el tema principal la primera vez que lo normales.
4. Cobertura: Válidas preguntas sobre territorio salvadoreño, presidentes y noticias locales actuales. No respondas sobre otros países.
5. Nombres exactos: Si citas lugares de la lista verificada, escríbelos EXACTAMENTE igual.
${RAICES_LANDMARKS_INFO}
6. Filtro: Si te saludan, di solo: "Hola, soy Pupusita. ¿Qué dato buscas?". Si es ajeno a El Salvador, responde ÚNICAMENTE: "No tengo respuesta a temas no relacionados al sitio."
7. Idioma: Responde SIEMPRE en el mismo idioma en el que el usuario te escriba.`;

    if (isColoquialMode && lang === 'es') {
      return basePrompt + `
8. ESTILO COLOQUIAL SALVADOREÑO: Usa expresiones típicas como "¡Mirá, vos!", "¡Qué chivo!", "¡Pucha!", "¡Ahí te voy contando!", "¡Bien, pues!", "¡Dale!".
Incorpora modismos salvadoreños de forma natural. No abuses, solo para dar sabor cultural.`;
    } else if (isColoquialMode && lang === 'en') {
      return basePrompt + `
8. COLLOQUIAL SALVADOREAN STYLE: Use expressions like "¡Mirá, vos!", "¡Qué chivo!", "¡Pucha!", "¡Ahí te voy contando!", "¡Bien, pues!", "¡Dale!".
Incorporate Salvadoran idioms naturally. Don't overuse, just for cultural flavor.`;
    }
    
    return basePrompt;
  }

  function getPlannerSystemPrompt(lang) {
    if (lang === 'en') {
      return `You are "Pupusita" in "Trip Planner" mode. ALWAYS respond in English. Create quick and real itineraries in El Salvador using dollars ($ USD).
CRITICAL PLAN RULES:
1. Strict format: Zero paragraphs, zero introductory texts. Respond DIRECTLY with the numbered list.
2. Radical brevity: Max 3 activities per plan plus the transport section. Each line must be short.
3. Costs: Write the price next to each activity and detail a specific line for estimated **Transport** cost. Put the general total at the end.
4. Exact names: Use EXACTLY the names from this list if included:
${RAICES_LANDMARKS_INFO}
5. Closure: No farewells or recommendations. End immediately right after the total.
6. Language: ALWAYS respond in the same language the user writes to you.`;
    }
    return `Eres "Pupusita" en modo "Planificador de salidas". Responde SIEMPRE en español. Crea itinerarios rápidos y reales en El Salvador usando dólares ($ USD).
REGLAS CRÍTICAS DEL PLAN:
1. Formato estricto: Cero párrafos, cero textos introductorios. Responde DIRECTAMENTE con la lista numerada.
2. Brevedad radical: Máximo 3 actividades por plan más el apartado de transporte. Cada línea debe ser corta.
3. Costos: Escribe el precio al lado de cada actividad y detalla una línea específica para el costo estimado de **Transporte**. Pon el total general al final.
4. Nombres exactos: Usa EXACTAMENTE los nombres de esta lista si los incluyes:
${RAICES_LANDMARKS_INFO}
5. Cierre: Sin despedidas ni recomendaciones. Termina inmediatamente tras el total.
6. Idioma: Responde SIEMPRE en el mismo idioma en el que el usuario te escriba.`;
  }

  // ==========================================
  // 5. MANEJO DEL HISTORIAL (SOLO 4 MENSAJES)
  // ==========================================
  function loadSavedHistory() {
    if (!isAuthenticated()) return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          conversationHistory = parsed.slice(-MAX_HISTORY);
        }
      }
    } catch (e) {
      conversationHistory = [];
    }
  }

  function saveHistory() {
    if (!isAuthenticated()) return;
    try {
      if (conversationHistory.length > MAX_HISTORY) {
        conversationHistory = conversationHistory.slice(-MAX_HISTORY);
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(conversationHistory));
    } catch (e) {}
  }

  function addToHistory(role, content) {
    if (!isAuthenticated()) return;
    conversationHistory.push({ role, content });
    if (conversationHistory.length > MAX_HISTORY) {
      conversationHistory = conversationHistory.slice(-MAX_HISTORY);
    }
    saveHistory();
  }

  const LANDMARKS_MINI = [
    { id: 1,  nombre: 'Tazumal' }, { id: 2,  nombre: 'Joya de Cerén' }, { id: 3,  nombre: 'Salvador del Mundo' },
    { id: 4,  nombre: 'Suchitoto' }, { id: 5,  nombre: 'Catedral Metropolitana' }, { id: 6,  nombre: 'MUNA' },
    { id: 7,  nombre: 'Ruinas de San Andrés' }, { id: 8,  nombre: 'Pupusería El Caserío' }, { id: 9,  nombre: 'Semitas de Cojutepeque' },
    { id: 10, nombre: 'Mercado Central de San Salvador' }, { id: 11, nombre: 'Nahuizalco — Mercado Nocturno' },
    { id: 12, nombre: 'Plaza las Américas' }, { id: 51, nombre: 'El Boquerón' }, { id: 52, nombre: 'Puerta del Diablo' },
  ];

  // ==========================================
  // 6. ESTILOS CSS (igual que antes)
  // ==========================================
  const STYLES = `
    #rs-chat-widget {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 99999;
    }
    #rs-chat-widget * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Lato', sans-serif; pointer-events: auto; }
    #rs-chat-btn {
      position: fixed; bottom: 28px; left: 28px; width: 60px; height: 60px; border-radius: 50%;
      background: #113068; border: 3px solid #be8e56; cursor: pointer; display: flex;
      align-items: center; justify-content: center; z-index: 99999;
      box-shadow: 0 8px 24px rgba(17, 48, 104, 0.35); opacity: 0; transform: scale(0.5); overflow: hidden; padding: 4px;
    }
    #rs-chat-btn.locked { opacity: 0.7; border-color: #888; }
    #rs-chat-btn.locked .rs-chat-icon { filter: grayscale(0.5); }
    #rs-chat-btn svg.rs-chat-icon { width: 100%; height: 100%; }
    #rs-chat-btn svg.rs-close-icon { width: 26px; height: 26px; fill: #fff; display: none; }
    #rs-chat-btn.open .rs-chat-icon { display: none; }
    #rs-chat-btn.open .rs-close-icon { display: block; }
    #rs-chat-bubble {
      position: fixed; bottom: 100px; left: 28px; background: #113068; color: #fff;
      font-size: 13px; font-weight: 500; padding: 10px 16px; border-radius: 16px 16px 16px 4px;
      border: 1.5px solid #be8e56; z-index: 99998; white-space: nowrap; box-shadow: 0 6px 20px rgba(0,0,0,0.15);
      cursor: pointer; opacity: 0;
    }
    #rs-chat-bubble.locked { border-color: #888; opacity: 0.7; cursor: not-allowed; }
    #rs-chat-bubble::after {
      content: ''; position: absolute; bottom: -8px; left: 12px; border: 5px solid transparent; border-top-color: #be8e56;
    }
    #rs-chat-bubble.locked::after { border-top-color: #888; }
    #rs-chat-window {
      position: fixed; bottom: 100px; left: 28px; width: clamp(320px, 100%, 480px);
      max-width: calc(100% - 56px); height: clamp(400px, 80%, 680px); background: #18181b;
      border: 1.5px solid rgba(190, 142, 86, 0.5); border-radius: 20px; display: flex;
      flex-direction: column; z-index: 99998; overflow: hidden; box-shadow: 0 16px 40px rgba(0,0,0,0.6);
      opacity: 0; transform: translateY(30px) scale(0.95); transform-origin: bottom left;
    }
    #rs-chat-window.locked { border-color: #555; }
    #rs-chat-header {
      background: #113068; padding: 14px 18px; display: flex; align-items: center; gap: 12px;
      border-bottom: 1.5px solid rgba(190, 142, 86, 0.4); flex-shrink: 0;
      position: relative;
      z-index: 1;
    }
    #rs-chat-header.locked { opacity: 0.7; border-bottom-color: #555; }
    #rs-chat-header .rs-avatar {
      width: 42px; height: 42px; border-radius: 50%; background: #be8e56; display: flex;
      align-items: center; justify-content: center; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      overflow: visible; position: relative; border: 2px solid #113068; transition: all 0.3s ease;
    }
    #rs-chat-header .rs-avatar svg {
      width: 110%; height: 110%; transform-origin: center bottom; transition: transform 0.2s ease-in-out;
    }
    #rs-chat-header .rs-avatar .rs-lock-overlay {
      position: absolute;
      top: -4px;
      right: -4px;
      width: 20px;
      height: 20px;
      background: #e74c3c;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      border: 2px solid #18181b;
    }
    @keyframes rs-blink { 0%, 90%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0.1); } }
    #rs-pupusa-clip-eye-l, #rs-pupusa-clip-eye-r { animation: rs-blink 5s infinite; transform-origin: center; }
    
    @keyframes rs-talk-open { 0%, 100% { opacity: 0; } 50% { opacity: 1; } }
    @keyframes rs-talk-closed { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
    @keyframes rs-body-speak { 0%, 100% { transform: rotate(0deg) scale(1); } 25% { transform: rotate(-3deg) scale(1.02); } 75% { transform: rotate(3deg) scale(1.02); } }
    
    #rs-chat-header .rs-avatar.talking { border-color: #be8e56; box-shadow: 0 0 15px rgba(190, 142, 86, 0.7); }
    #rs-chat-header .rs-avatar.talking svg { animation: rs-body-speak 0.4s infinite ease-in-out; }
    #rs-chat-header .rs-avatar.talking #rs-pupusa-mouth-open { animation: rs-talk-open 0.3s infinite step-start; }
    #rs-chat-header .rs-avatar.talking #rs-pupusa-mouth-closed { animation: rs-talk-closed 0.3s infinite step-start; }
    
    #rs-chat-header .rs-header-info { flex: 1; }
    #rs-chat-header .rs-name { font-family: 'Playfair Display', serif; font-weight: 700; font-size: clamp(14px, 0.9vw, 17px); color: #fff; letter-spacing: 0.3px; }
    #rs-chat-header .rs-status { font-size: 11px; color: rgba(255,255,255,.65); margin-top: 2px; display: flex; align-items: center; }
    #rs-chat-header .rs-status .rs-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 5px; }
    #rs-chat-header .rs-status .rs-dot.online { background: #22c55e; box-shadow: 0 0 8px #22c55e; }
    #rs-chat-header .rs-status .rs-dot.locked { background: #e74c3c; box-shadow: 0 0 8px #e74c3c; }
    
    #rs-planner-toggle { display: flex; align-items: center; gap: 6px; background: rgba(255,255,255,.06); border: 1px solid rgba(190,142,86,.4); color: rgba(255,255,255,.9); font-weight: 600; font-size: clamp(10px, 0.7vw, 12px); padding: 5px 10px; border-radius: 20px; cursor: pointer; flex-shrink: 0; transition: all .2s ease; white-space: nowrap; }
    #rs-planner-toggle svg { width: 13px; height: 13px; fill: currentColor; flex-shrink: 0; }
    #rs-planner-toggle:hover { background: rgba(190,142,86,.15); border-color: #be8e56; }
    #rs-planner-toggle.active { background: #be8e56; border-color: #be8e56; color: #113068; box-shadow: 0 2px 10px rgba(190,142,86,0.3); }
    #rs-planner-toggle.locked { opacity: 0.5; cursor: not-allowed; border-color: #555; }
    #rs-planner-toggle.locked:hover { background: rgba(255,255,255,.06); border-color: #555; }
    
    #rs-coloquial-toggle {
      display: flex;
      align-items: center;
      gap: 4px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(190,142,86,0.3);
      color: rgba(255,255,255,0.7);
      font-weight: 600;
      font-size: 10px;
      padding: 4px 8px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
      flex-shrink: 0;
    }
    #rs-coloquial-toggle:hover {
      background: rgba(190,142,86,0.15);
      border-color: #be8e56;
    }
    #rs-coloquial-toggle.active {
      background: #be8e56;
      border-color: #be8e56;
      color: #113068;
    }
    #rs-coloquial-toggle.locked { opacity: 0.5; cursor: not-allowed; border-color: #555; }
    #rs-coloquial-toggle.locked:hover { background: rgba(255,255,255,0.06); border-color: #555; }
    
    #rs-share-plan {
      display: none;
      align-items: center;
      gap: 4px;
      background: rgba(190,142,86,0.12);
      border: 1px solid rgba(190,142,86,0.3);
      color: #be8e56;
      font-weight: 600;
      font-size: 10px;
      padding: 4px 10px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }
    #rs-share-plan:hover {
      background: rgba(190,142,86,0.25);
    }
    #rs-share-plan.visible {
      display: flex;
    }
    
    #rs-chat-messages { flex: 1; overflow-y: auto; padding: 16px 20px; display: flex; flex-direction: column; gap: 14px; background: #18181b; scrollbar-width: thin; scrollbar-color: rgba(190,142,86,.3) transparent; position: relative; z-index: 1; }
    #rs-chat-messages::-webkit-scrollbar { width: 4px; }
    #rs-chat-messages::-webkit-scrollbar-thumb { background: rgba(190,142,86,.3); border-radius: 4px; }
    #rs-chat-messages.locked { opacity: 0.7; filter: blur(0.5px); }
    .rs-msg { display: flex; flex-direction: column; max-width: 85%; opacity: 0; transform: translateY(12px); position: relative; z-index: 2; }
    .rs-msg.bot { align-self: flex-start; margin-right: 8px; } 
    .rs-msg.user { align-self: flex-end; margin-left: 8px; }  
    .rs-msg-bubble { padding: 10px 14px; border-radius: 16px; font-size: clamp(12.5px, 0.85vw, 15.5px); line-height: 1.45; letter-spacing: 0.1px; }
    .rs-msg.bot .rs-msg-bubble { background: #27272a; border: 1px solid rgba(255,255,255,0.05); color: #f4f4f5; border-radius: 4px 16px 16px 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
    .rs-msg.user .rs-msg-bubble { background: #113068; border: 1px solid rgba(190, 142, 86, .2); color: #fff; border-radius: 16px 16px 4px 16px; box-shadow: 0 2px 8px rgba(17,48,104,0.2); }
    .rs-typing { display: flex; gap: 6px; align-items: center; padding: 10px 14px; background: #27272a; border-radius: 4px 16px 16px 16px; align-self: flex-start; max-width: 65px; margin-left: 8px; }
    .rs-typing span { width: 5px; height: 5px; border-radius: 50%; background: #be8e56; animation: rs-bounce .9s infinite; }
    .rs-typing span:nth-child(2) { animation-delay: .15s; }
    .rs-typing span:nth-child(3) { animation-delay: .3s; }
    @keyframes rs-bounce { 0%,80%,100% { transform: translateY(0); opacity: .3; } 40% { transform: translateY(-4px); opacity: 1; } }
    
    .rs-mini-map {
      width: 100%;
      height: 120px;
      border-radius: 8px;
      margin-top: 8px;
      overflow: hidden;
      background: #1a1a2e;
      position: relative;
      border: 1px solid rgba(190,142,86,0.3);
    }
    .rs-mini-map .leaflet-control-zoom { display: none !important; }
    .rs-mini-map .leaflet-control-attribution { display: none !important; }
    
    #rs-chat-footer { padding: 14px 18px; border-top: 1px solid rgba(255,255,255,0.05); display: flex; gap: 10px; flex-shrink: 0; background: #202023; align-items: center; position: relative; z-index: 1; }
    #rs-chat-footer.locked { opacity: 0.5; }
    #rs-chat-input { flex: 1; background: #27272a; border: 1.5px solid rgba(190, 142, 86, 0.25); border-radius: 22px; padding: 8px 16px; color: #fff; font-size: clamp(12px, 0.8vw, 14.5px); outline: none; transition: all .2s ease; height: 38px; }
    #rs-chat-input:focus { border-color: #be8e56; background: #3f3f46; box-shadow: 0 0 0 3px rgba(190,142,86,0.15); }
    #rs-chat-input::placeholder { color: rgba(255,255,255,.4); }
    #rs-chat-input.locked { cursor: not-allowed; border-color: #555; }
    #rs-chat-input.locked:focus { border-color: #555; box-shadow: none; background: #27272a; }
    #rs-chat-send { width: 38px; height: 38px; flex-shrink: 0; background: #be8e56; border: none; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(190,142,86,0.2); }
    #rs-chat-send.locked { opacity: 0.4; cursor: not-allowed; }
    #rs-chat-send svg { width: 16px; height: 16px; fill: #fff; margin-left: 2px; }
    .rs-quick-btns { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; width: 100%; opacity: 0; }
    .rs-quick-btn { font-size: clamp(11px, 0.75vw, 13px); font-weight: 500; color: #be8e56; background: rgba(190,142,86,.08); border: 1px solid rgba(190,142,86,.3); border-radius: 20px; padding: 5px 12px; cursor: pointer; text-align: left; }
    .rs-quick-btn.locked { opacity: 0.4; cursor: not-allowed; }
    .rs-map-btn { color: #7fc3f0; background: rgba(82,160,224,.1); border-color: rgba(82,160,224,.35); text-decoration: none; display: inline-flex; align-items: center; }
    
    /* Login overlay */
    .rs-login-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.75);
      backdrop-filter: blur(4px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      z-index: 10;
      padding: 30px;
      text-align: center;
      border-radius: 20px;
    }
    .rs-login-overlay .rs-lock-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }
    .rs-login-overlay .rs-lock-title {
      color: #fff;
      font-size: 20px;
      font-weight: 700;
      font-family: 'Playfair Display', serif;
      margin-bottom: 8px;
    }
    .rs-login-overlay .rs-lock-desc {
      color: rgba(255,255,255,0.7);
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 20px;
      max-width: 300px;
    }
    .rs-login-overlay .rs-lock-buttons {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: center;
    }
    .rs-login-overlay .rs-lock-btn {
      padding: 8px 24px;
      border-radius: 30px;
      border: none;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      font-family: 'Lato', sans-serif;
    }
    .rs-login-overlay .rs-lock-btn-primary {
      background: #be8e56;
      color: #113068;
    }
    .rs-login-overlay .rs-lock-btn-primary:hover {
      background: #d4a86a;
      transform: scale(1.05);
    }
    .rs-login-overlay .rs-lock-btn-secondary {
      background: rgba(255,255,255,0.1);
      color: #fff;
      border: 1px solid rgba(255,255,255,0.2);
    }
    .rs-login-overlay .rs-lock-btn-secondary:hover {
      background: rgba(255,255,255,0.2);
      transform: scale(1.05);
    }
    
    /* Tema claro */
    [data-theme="light"] #rs-chat-window { background: #fffdf8; border-color: rgba(190,142,86,.6); box-shadow: 0 16px 40px rgba(17,48,104,.22); }
    [data-theme="light"] #rs-chat-messages { background: #fffdf8; }
    [data-theme="light"] .rs-msg.bot .rs-msg-bubble { background: #f3ecdd; border-color: rgba(17,48,104,.1); color: #2c2620; }
    [data-theme="light"] .rs-typing { background: #f3ecdd; }
    [data-theme="light"] #rs-chat-footer { background: #fbf1e0; border-top-color: rgba(17,48,104,.08); }
    [data-theme="light"] #rs-chat-input { background: #ffffff; border-color: rgba(190,142,86,.35); color: #2c2620; }
    [data-theme="light"] #rs-chat-input:focus { background: #fffaf0; }
    [data-theme="light"] #rs-chat-input::placeholder { color: rgba(44,38,32,.4); }
    [data-theme="light"] #rs-planner-toggle { background: rgba(17,48,104,.05); color: rgba(44,38,32,.85); }
    [data-theme="light"] #rs-coloquial-toggle { background: rgba(17,48,104,0.05); color: rgba(44,38,32,0.7); }
    [data-theme="light"] #rs-coloquial-toggle.active { background: #be8e56; color: #fff; }
    [data-theme="light"] #rs-share-plan { background: rgba(190,142,86,0.1); color: #8b6b3a; }
    [data-theme="light"] .rs-login-overlay { background: rgba(255,253,248,0.92); backdrop-filter: blur(4px); }
    [data-theme="light"] .rs-login-overlay .rs-lock-title { color: #113068; }
    [data-theme="light"] .rs-login-overlay .rs-lock-desc { color: rgba(44,38,32,0.7); }
  `;

  // ==========================================
  // 7. FUNCIONES DE UI
  // ==========================================
  function loadGSAP(callback) {
    if (window.gsap) {
      callback();
    } else {
      const script = document.createElement('script');
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
      script.onload = callback;
      document.head.appendChild(script);
    }
  }

  function renderSavedHistoryUI() {
    const msgsContainer = document.getElementById('rs-chat-messages');
    if (!msgsContainer) return;
    msgsContainer.innerHTML = '';
    
    conversationHistory.forEach(msg => {
      if (msg.role === 'user') {
        addUserMessageUI(msg.content);
      } else {
        const landmarks = findMentionedLandmarks(msg.content);
        addBotMessage(msg.content, false, landmarks);
      }
    });
  }

  function formatMessageText(text) {
    return escapeHtml(text).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
  }

  function getMapaUrl() {
    const navLink = document.querySelector('a[href$="mapa.html"], a[href*="mapa.html"]');
    return navLink ? navLink.getAttribute('href') : 'mapa.html'; 
  }

  function findMentionedLandmarks(text) {
    if (!text) return [];
    const found = [];
    let workingText = text;
    const sorted = [...LANDMARKS_MINI].sort((a, b) => b.nombre.length - a.nombre.length);
    
    sorted.forEach(lm => {
      const escapedName = lm.nombre.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(escapedName, 'i');
      if (re.test(workingText) && !found.some(f => f.id === lm.id)) {
        found.push(lm);
        workingText = workingText.replace(re, '');
      }
    });
    return found.slice(0, 4);
  }

  function animateMessageNode(node) {
    gsap.to(node, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" });
  }

  function addBotMessage(text, withQuick = false, mapLandmarks = []) {
    const msgs = document.getElementById('rs-chat-messages');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = 'rs-msg bot';
    div.innerHTML = `<div class="rs-msg-bubble">${formatMessageText(text)}</div>`;
    
    let elementsToFade = [];

    if (withQuick && isAuthenticated()) {
      const qWrap = document.createElement('div');
      qWrap.className = 'rs-quick-btns';
      TRANSLATABLE_TEXTS[currentLang].quickQuestions.forEach(q => {
        const b = document.createElement('button');
        b.className = 'rs-quick-btn';
        b.textContent = q;
        b.addEventListener('click', () => sendUserText(q));
        qWrap.appendChild(b);
      });
      div.appendChild(qWrap);
      elementsToFade.push(qWrap);
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
        a.textContent = TRANSLATABLE_TEXTS[currentLang].mapLinkText.replace('{name}', lm.nombre);
        mapWrap.appendChild(a);
      });
      div.appendChild(mapWrap);
      elementsToFade.push(mapWrap);
    }
    msgs.appendChild(div);
    animateMessageNode(div);
    
    if(elementsToFade.length > 0) {
      gsap.to(elementsToFade, { opacity: 1, y: 0, stagger: 0.1, duration: 0.3, delay: 0.2 });
    }
    msgs.scrollTop = msgs.scrollHeight;
  }

  function setInputEnabled(enabled, placeholder) {
    const input = document.getElementById('rs-chat-input');
    const sendBtn = document.getElementById('rs-chat-send');
    if (!input) return;
    const auth = isAuthenticated();
    input.disabled = !enabled || !auth;
    if (sendBtn) sendBtn.disabled = !enabled || isLoading || !auth;
    input.placeholder = placeholder || TRANSLATABLE_TEXTS[currentLang].inputPlaceholder;
  }

  function addUserMessageUI(text) {
    const msgs = document.getElementById('rs-chat-messages');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = 'rs-msg user';
    div.innerHTML = `<div class="rs-msg-bubble">${escapeHtml(text)}</div>`;
    msgs.appendChild(div);
    animateMessageNode(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function showTyping() {
    if (!isAuthenticated()) return;
    const msgs = document.getElementById('rs-chat-messages');
    if (!msgs) return;
    const div = document.createElement('div');
    div.id = 'rs-typing-indicator';
    div.className = 'rs-typing';
    div.style.opacity = 0;
    div.innerHTML = '<span></span><span></span><span></span>';
    msgs.appendChild(div);
    gsap.to(div, { opacity: 1, duration: 0.2 });
    msgs.scrollTop = msgs.scrollHeight;
  }

  function hideTyping() {
    const indicator = document.getElementById('rs-typing-indicator');
    if (indicator) {
      gsap.to(indicator, { opacity: 0, duration: 0.15, onComplete: () => indicator.remove() });
    }
  }

  function escapeHtml(t) {
    return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function setPlannerToggle(active) {
    if (!isAuthenticated()) return;
    plannerMode = active;
    const toggleBtn = document.getElementById('rs-planner-toggle');
    if (!toggleBtn) return;
    toggleBtn.classList.toggle('active', active);
    toggleBtn.setAttribute('aria-pressed', active ? 'true' : 'false');
    gsap.fromTo(toggleBtn, { scale: 0.9 }, { scale: 1, duration: 0.2, ease: "back.out(3)" });
  }

  function toggleColoquialMode() {
    if (!isAuthenticated()) return;
    isColoquialMode = !isColoquialMode;
    const btn = document.getElementById('rs-coloquial-toggle');
    const status = document.getElementById('rs-coloquial-status');
    if (btn) {
      btn.classList.toggle('active', isColoquialMode);
    }
    if (status) {
      status.textContent = isColoquialMode 
        ? TRANSLATABLE_TEXTS[currentLang].coloquialOn 
        : TRANSLATABLE_TEXTS[currentLang].coloquialOff;
    }
    
    const msg = isColoquialMode 
      ? (currentLang === 'es' ? '🇸🇻 ¡Modo cipote activado! Ahora hablo más a la salvadoreña.' : '🇸🇻 Slang mode activated! I\'ll speak more Salvadoran.')
      : (currentLang === 'es' ? 'Modo formal activado.' : 'Formal mode activated.');
    addBotMessage(msg);
  }

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  // ==========================================
  // 8. FUNCIONES DE PLANIFICADOR
  // ==========================================
  function togglePlannerMode() {
    if (!isAuthenticated() || isLoading) return;
    if (!plannerMode) {
      setPlannerToggle(true);
      startPlannerFlow();
    } else {
      setPlannerToggle(false);
      plannerStep = null;
      setInputEnabled(true, TRANSLATABLE_TEXTS[currentLang].inputPlaceholder);
    }
  }

  function startPlannerFlow() {
    plannerStep = 'activity';
    plannerData = {};
    setInputEnabled(true, TRANSLATABLE_TEXTS[currentLang].inputPlaceholderPlanner);
    addBotMessage(TRANSLATABLE_TEXTS[currentLang].plannerStart);
    document.getElementById('rs-chat-input')?.focus();
  }

  function procesarPasoActividad(text) {
    if (text.toLowerCase().length < 3) {
      addBotMessage(TRANSLATABLE_TEXTS[currentLang].errValidation);
      return;
    }
    plannerData.activity = text;
    plannerStep = 'startLocation'; 
    setInputEnabled(true, TRANSLATABLE_TEXTS[currentLang].inputPlaceholderLocation);
    addBotMessage(TRANSLATABLE_TEXTS[currentLang].plannerLocationPrompt);
  }

  function procesarPasoUbicacion(text) {
    const t = text.toLowerCase().trim();
    if (t.length < 3 || /^\d+$/.test(t)) {
      addBotMessage(TRANSLATABLE_TEXTS[currentLang].errValidation);
      return;
    }
    plannerData.startLocation = text;
    plannerStep = 'budget';
    setInputEnabled(true, TRANSLATABLE_TEXTS[currentLang].inputPlaceholderBudget);
    addBotMessage(TRANSLATABLE_TEXTS[currentLang].plannerBudgetPrompt);
  }

  function procesarPasoPresupuesto(text) {
    if (text.trim().length < 2) {
      addBotMessage(TRANSLATABLE_TEXTS[currentLang].errValidation);
      return;
    }
    plannerData.budget = text;
    plannerStep = 'duration';
    setInputEnabled(true, TRANSLATABLE_TEXTS[currentLang].inputPlaceholderDuration);
    addBotMessage(TRANSLATABLE_TEXTS[currentLang].plannerDurationPrompt);
  }

  function procesarPasoDuracion(text) {
    if (text.trim().length < 2) {
      addBotMessage(TRANSLATABLE_TEXTS[currentLang].errValidation);
      return;
    }
    plannerData.duration = text;
    plannerStep = 'details';
    setInputEnabled(true, TRANSLATABLE_TEXTS[currentLang].inputPlaceholderDetails);
    addBotMessage(TRANSLATABLE_TEXTS[currentLang].plannerDetailsPrompt);
  }

  function procesarPasoDetalles(text) {
    const t = text.toLowerCase().trim();
    if (t === 'omitir' || t === 'no' || t === 'skip') {
      plannerData.details = '';
    } else {
      plannerData.details = text;
    }
    plannerStep = 'generating';
    generatePlan();
  }

  async function generatePlan() {
    if (!isAuthenticated()) return;
    setInputEnabled(false, TRANSLATABLE_TEXTS[currentLang].inputPlaceholderGenerating);
    showTyping();

    const isEn = currentLang === 'en';
    const userPrompt = isEn ? 
`Plan a trip with these preferences:
- Starting Location: ${plannerData.startLocation}
- Desired Activity: ${plannerData.activity}
- Total Budget: ${plannerData.budget}
- Time Available: ${plannerData.duration}${plannerData.details ? `\n- Specific Preferences: ${plannerData.details}` : ''}
Provide a concrete and realistic plan inside El Salvador.` 
: 
`Planifícame una salida con estas preferencias:
- Punto de inicio/Ciudad origen: ${plannerData.startLocation}
- Actividad deseada: ${plannerData.activity}
- Presupuesto total: ${plannerData.budget}
- Tiempo disponible: ${plannerData.duration}${plannerData.details ? `\n- Preferencias específicas: ${plannerData.details}` : ''}
Dame un plan concreto y realista dentro de El Salvador.`;

    try {
      const response = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: getPlannerSystemPrompt(currentLang), messages: [{ role: 'user', content: userPrompt }] })
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      hideTyping();

      const msgs = document.getElementById('rs-chat-messages');
      const div = document.createElement('div');
      div.className = 'rs-msg bot';
      const bubble = document.createElement('div');
      bubble.className = 'rs-msg-bubble';
      div.appendChild(bubble);
      msgs.appendChild(div);
      animateMessageNode(div);

      const avatar = document.getElementById('rs-bot-avatar');
      if (avatar) avatar.classList.add('talking');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let replyText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        replyText += chunk;
        bubble.innerHTML = formatMessageText(replyText);
        msgs.scrollTop = msgs.scrollHeight;
      }

      if (avatar) avatar.classList.remove('talking');

      const landmarks = findMentionedLandmarks(replyText);
      if (landmarks && landmarks.length) {
        const mapWrap = document.createElement('div');
        mapWrap.className = 'rs-quick-btns';
        const mapaUrl = getMapaUrl();
        landmarks.forEach(lm => {
          const a = document.createElement('a');
          a.className = 'rs-quick-btn rs-map-btn';
          a.href = `${mapaUrl}${mapaUrl.includes('?') ? '&' : '?'}evento=${lm.id}`;
          a.target = '_blank';
          a.textContent = TRANSLATABLE_TEXTS[currentLang].mapLinkText.replace('{name}', lm.nombre);
          mapWrap.appendChild(a);
        });
        div.appendChild(mapWrap);
        gsap.to(mapWrap, { opacity: 1, y: 0, duration: 0.3 });
        msgs.scrollTop = msgs.scrollHeight;
      }

      const shareBtn = document.getElementById('rs-share-plan');
      if (shareBtn) {
        shareBtn.classList.add('visible');
        shareBtn.style.display = 'flex';
        shareBtn.onclick = () => sharePlan(replyText);
      }

      plannerStep = null;
      setPlannerToggle(false);
      setInputEnabled(true, TRANSLATABLE_TEXTS[currentLang].inputPlaceholder);
      addBotMessage(TRANSLATABLE_TEXTS[currentLang].plannerSuccess);

    } catch (err) {
      hideTyping();
      const avatar = document.getElementById('rs-bot-avatar');
      if (avatar) avatar.classList.remove('talking');
      addBotMessage(TRANSLATABLE_TEXTS[currentLang].errGeneric);
      plannerStep = null;
      setPlannerToggle(false);
      setInputEnabled(true, TRANSLATABLE_TEXTS[currentLang].inputPlaceholder);
    }
  }

  // ==========================================
  // 9. COMPARTIR ITINERARIO
  // ==========================================
  function sharePlan(text) {
    if (!text || text.length < 10 || !isAuthenticated()) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#113068');
    gradient.addColorStop(0.5, '#1a3a6a');
    gradient.addColorStop(1, '#be8e56');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#be8e56';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);
    
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px "Playfair Display", serif';
    ctx.textAlign = 'center';
    ctx.fillText('🇸🇻 Salvadorean Roots', canvas.width/2, 80);
    
    ctx.font = '20px "Lato", sans-serif';
    ctx.fillStyle = '#be8e56';
    ctx.fillText('Itinerario Cultural', canvas.width/2, 120);
    
    ctx.strokeStyle = '#be8e56';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(canvas.width/2 - 100, 140);
    ctx.lineTo(canvas.width/2 + 100, 140);
    ctx.stroke();
    
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    let y = 190;
    ctx.fillStyle = '#f4f4f5';
    ctx.font = '16px "Lato", sans-serif';
    ctx.textAlign = 'left';
    
    lines.forEach(line => {
      if (y > canvas.height - 80) {
        ctx.fillStyle = '#be8e56';
        ctx.textAlign = 'center';
        ctx.font = '14px "Lato", sans-serif';
        ctx.fillText('... y más', canvas.width/2, y);
        return;
      }
      ctx.fillStyle = '#f4f4f5';
      ctx.textAlign = 'left';
      ctx.font = '16px "Lato", sans-serif';
      const cleanLine = line.replace(/\*\*(.*?)\*\*/g, '$1');
      ctx.fillText(cleanLine, 60, y);
      y += 32;
    });
    
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '12px "Lato", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Generado por Salvadorean Roots · Tu guía cultural de El Salvador', canvas.width/2, canvas.height - 40);
    
    const link = document.createElement('a');
    link.download = `salvadorean-roots-plan-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    
    addBotMessage('📤 ¡Plan compartido! Se ha descargado una imagen con tu itinerario.');
  }

  // ==========================================
  // 10. FUNCIÓN PRINCIPAL DE ENVÍO DE MENSAJES
  // ==========================================
  async function sendUserText(text) {
    if (!isAuthenticated() || isLoading) return;
    const sendBtn = document.getElementById('rs-chat-send');
    const msgs = document.getElementById('rs-chat-messages');
    isLoading = true;
    if (sendBtn) sendBtn.disabled = true;

    addUserMessageUI(text);
    addToHistory('user', text);
    
    showTyping();

    try {
      const response = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          system: getSystemPrompt(currentLang), 
          messages: conversationHistory
        })
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      hideTyping();

      const div = document.createElement('div');
      div.className = 'rs-msg bot';
      const bubble = document.createElement('div');
      bubble.className = 'rs-msg-bubble';
      div.appendChild(bubble);
      msgs.appendChild(div);
      animateMessageNode(div);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let replyText = "";

      const avatar = document.getElementById('rs-bot-avatar');
      if (avatar) avatar.classList.add('talking');

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        
        for (const char of chunk) {
          replyText += char;
          bubble.innerHTML = formatMessageText(replyText);
          msgs.scrollTop = msgs.scrollHeight;
          await sleep(18);
        }
      }

      if (avatar) avatar.classList.remove('talking');

      addToHistory('assistant', replyText);
      
      const landmarks = findMentionedLandmarks(replyText);
      if (landmarks && landmarks.length) {
        const mapWrap = document.createElement('div');
        mapWrap.className = 'rs-quick-btns';
        const mapaUrl = getMapaUrl();
        landmarks.forEach(lm => {
          const a = document.createElement('a');
          a.className = 'rs-quick-btn rs-map-btn';
          a.href = `${mapaUrl}${mapaUrl.includes('?') ? '&' : '?'}evento=${lm.id}`;
          a.target = '_blank';
          a.textContent = TRANSLATABLE_TEXTS[currentLang].mapLinkText.replace('{name}', lm.nombre);
          mapWrap.appendChild(a);
        });
        div.appendChild(mapWrap);
        gsap.to(mapWrap, { opacity: 1, y: 0, duration: 0.3 });
        msgs.scrollTop = msgs.scrollHeight;
      }
      
      const shareBtn = document.getElementById('rs-share-plan');
      if (shareBtn) {
        shareBtn.classList.remove('visible');
        shareBtn.style.display = 'none';
      }
      
    } catch (err) {
      const avatar = document.getElementById('rs-bot-avatar');
      if (avatar) avatar.classList.remove('talking');
      hideTyping();
      addBotMessage(TRANSLATABLE_TEXTS[currentLang].errGeneric);
    }

    isLoading = false;
    if (sendBtn) sendBtn.disabled = false;
    document.getElementById('rs-chat-input')?.focus();
  }

  // ==========================================
  // 11. FUNCIONES DE UI Y NAVEGACIÓN
  // ==========================================
  function setupGSAPHoverEffects() {
    const triggerHover = (selector, scaleFactor = 1.05) => {
      document.addEventListener('mouseenter', (e) => {
        if (e.target.closest && e.target.closest(selector)) {
          gsap.to(e.target.closest(selector), { scale: scaleFactor, duration: 0.2, ease: "power1.out" });
        }
      }, true);
      document.addEventListener('mouseleave', (e) => {
        if (e.target.closest && e.target.closest(selector)) {
          gsap.to(e.target.closest(selector), { scale: 1, duration: 0.2, ease: "power1.inOut" });
        }
      }, true);
    };
    triggerHover('#rs-chat-btn', 1.08);
    triggerHover('#rs-chat-send', 1.08);
    triggerHover('.rs-quick-btn', 1.03);
  }

  function hideBubble() {
    const bubble = document.getElementById('rs-chat-bubble');
    if (bubble && !bubbleHidden) {
      bubbleHidden = true;
      gsap.to(bubble, { opacity: 0, y: -10, duration: 0.3, onComplete: () => { bubble.remove(); } });
    }
  }

  function toggleChat() {
    isOpen = !isOpen;
    const win = document.getElementById('rs-chat-window');
    const btn = document.getElementById('rs-chat-btn');
    const chatIcon = btn.querySelector('.rs-chat-icon');
    const closeIcon = btn.querySelector('.rs-close-icon');
    
    gsap.to(btn, { rotation: isOpen ? 90 : 0, duration: 0.3, ease: "power2.inOut" });

    if (isOpen) {
      hideBubble();
      win.style.display = 'flex';
      chatIcon.style.display = 'none';
      closeIcon.style.display = 'block';
      btn.setAttribute('aria-label', 'Cerrar asistente');
      
      gsap.fromTo(win, { opacity: 0, y: 35, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power4.out" });
      setTimeout(() => document.getElementById('rs-chat-input')?.focus(), 100);
    } else {
      chatIcon.style.display = 'block';
      closeIcon.style.display = 'none';
      btn.setAttribute('aria-label', 'Abrir asistente de Salvadorean Roots');
      
      gsap.to(win, { opacity: 0, y: 25, scale: 0.95, duration: 0.25, ease: "power2.in", onComplete: () => { win.style.display = 'none'; }});
    }
  }

  function sendMessage() {
    const input = document.getElementById('rs-chat-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text || isLoading) return;

    gsap.fromTo("#rs-chat-send", { scale: 0.8 }, { scale: 1, duration: 0.2, ease: "back.out(3)" });

    if (plannerMode && plannerStep) {
      input.value = '';
      addUserMessageUI(text);
      if (plannerStep === 'activity') procesarPasoActividad(text);
      else if (plannerStep === 'startLocation') procesarPasoUbicacion(text);
      else if (plannerStep === 'budget') procesarPasoPresupuesto(text);
      else if (plannerStep === 'duration') procesarPasoDuracion(text);
      else if (plannerStep === 'details') procesarPasoDetalles(text);
      return;
    }

    input.value = '';
    sendUserText(text);
  }

  // ==========================================
  // 12. FUNCIÓN PARA CREAR OVERLAY DE BLOQUEO
  // ==========================================
  function createLockOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'rs-login-overlay';
    
    const isEn = currentLang === 'en';
    
    overlay.innerHTML = `
      <div class="rs-lock-icon">🔒</div>
      <div class="rs-lock-title">${isEn ? 'Access Restricted' : 'Acceso Restringido'}</div>
      <div class="rs-lock-desc">${isEn ? 'Sign in to use Pupusita, your cultural guide to El Salvador.' : 'Inicia sesión para usar Pupusita, tu guía cultural de El Salvador.'}</div>
      <div class="rs-lock-buttons">
        <a href="../views/login.html" class="rs-lock-btn rs-lock-btn-primary">${isEn ? 'Log in' : 'Iniciar sesión'}</a>
        <a href="../views/registro.html" class="rs-lock-btn rs-lock-btn-secondary">${isEn ? 'Sign up' : 'Registrarse'}</a>
      </div>
    `;
    
    return overlay;
  }

  // ==========================================
  // 13. ACTUALIZAR ESTADO DE AUTENTICACIÓN
  // ==========================================
  function updateAuthState() {
    const authenticated = isAuthenticated();
    
    const bubble = document.getElementById('rs-chat-bubble');
    const btn = document.getElementById('rs-chat-btn');
    const win = document.getElementById('rs-chat-window');
    const header = document.getElementById('rs-chat-header');
    const messages = document.getElementById('rs-chat-messages');
    const footer = document.getElementById('rs-chat-footer');
    const input = document.getElementById('rs-chat-input');
    const sendBtn = document.getElementById('rs-chat-send');
    const plannerBtn = document.getElementById('rs-planner-toggle');
    const coloquialBtn = document.getElementById('rs-coloquial-toggle');
    const statusText = document.getElementById('rs-header-status');
    const statusDot = document.querySelector('.rs-dot');
    const avatar = document.getElementById('rs-bot-avatar');

    if (authenticated) {
      // Quitar clases de bloqueo
      bubble?.classList.remove('locked');
      btn?.classList.remove('locked');
      win?.classList.remove('locked');
      header?.classList.remove('locked');
      messages?.classList.remove('locked');
      footer?.classList.remove('locked');
      input?.classList.remove('locked');
      sendBtn?.classList.remove('locked');
      plannerBtn?.classList.remove('locked');
      coloquialBtn?.classList.remove('locked');

      // Habilitar elementos
      input?.removeAttribute('disabled');
      sendBtn?.removeAttribute('disabled');
      plannerBtn?.classList.remove('locked');
      coloquialBtn?.classList.remove('locked');

      // Actualizar estado visual
      if (statusDot) {
        statusDot.className = 'rs-dot online';
      }
      if (statusText) {
        statusText.textContent = TRANSLATABLE_TEXTS[currentLang].headerStatus;
      }

      // Eliminar overlay de bloqueo si existe
      const overlay = win?.querySelector('.rs-login-overlay');
      if (overlay) overlay.remove();

      // Si no hay historial, mostrar mensaje de bienvenida
      if (conversationHistory.length === 0) {
        addBotMessage(TRANSLATABLE_TEXTS[currentLang].welcomeMessage, true);
      }

      // Recargar historial desde localStorage
      loadSavedHistory();
      renderSavedHistoryUI();

    } else {
      // Aplicar clases de bloqueo
      bubble?.classList.add('locked');
      btn?.classList.add('locked');
      win?.classList.add('locked');
      header?.classList.add('locked');
      messages?.classList.add('locked');
      footer?.classList.add('locked');
      input?.classList.add('locked');
      sendBtn?.classList.add('locked');
      plannerBtn?.classList.add('locked');
      coloquialBtn?.classList.add('locked');

      // Deshabilitar elementos
      input?.setAttribute('disabled', 'true');
      sendBtn?.setAttribute('disabled', 'true');

      // Actualizar estado visual
      if (statusDot) {
        statusDot.className = 'rs-dot locked';
      }
      if (statusText) {
        statusText.textContent = TRANSLATABLE_TEXTS[currentLang].headerLocked;
      }

      // Si no existe overlay, crearlo
      if (!win?.querySelector('.rs-login-overlay')) {
        const overlay = createLockOverlay();
        win?.appendChild(overlay);
      }
    }
  }

  // ==========================================
  // NUEVA FUNCIÓN: TRADUCIR HISTORIAL DEL CHAT (CORREGIDA)
  // ==========================================
  async function translateChatHistory(targetLang) {
    // Si no hay historial o ya se está traduciendo, salir
    if (conversationHistory.length === 0) return;
    if (isTranslating) return;
    if (!isAuthenticated()) return;

    isTranslating = true;
    showTyping();

    try {
      const targetLangName = targetLang === 'es' ? 'Spanish' : 'English';
      const translationPrompt = `Translate the following JSON array of chat messages into ${targetLangName}. 
Return ONLY valid JSON array with the same structure.
IMPORTANT: Keep all markdown formatting like **bold** and emojis.
Only translate the text content, not the structure.

${JSON.stringify(conversationHistory)}`;

      const response = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: `You are a translator. ONLY output a valid JSON array. Never add extra text.`,
          messages: [{ role: 'user', content: translationPrompt }],
          max_tokens: 4000 // Aumentado para traducciones largas
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let rawReply = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        rawReply += decoder.decode(value, { stream: true });
      }

      // Limpiar y parsear el JSON
      let cleanJson = rawReply.trim();
      const firstBracket = cleanJson.indexOf('[');
      const lastBracket = cleanJson.lastIndexOf(']');
      if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
        cleanJson = cleanJson.substring(firstBracket, lastBracket + 1);
      }

      // Intentar parsear con manejo de errores
      let translatedHistory;
      try {
        translatedHistory = JSON.parse(cleanJson);
      } catch (parseError) {
        // Si falla, intentar limpiar caracteres no válidos
        cleanJson = cleanJson.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
        translatedHistory = JSON.parse(cleanJson);
      }

      if (Array.isArray(translatedHistory) && translatedHistory.length > 0) {
        // Mantener solo los últimos MAX_HISTORY mensajes
        conversationHistory = translatedHistory.slice(-MAX_HISTORY);
        saveHistory();
        
        // Re-renderizar la UI con los mensajes traducidos
        renderSavedHistoryUI();
        
        // Mostrar mensaje de confirmación
        addBotMessage(`🌐 ${TRANSLATABLE_TEXTS[targetLang].chatTranslated}`);
      } else {
        throw new Error('La traducción no devolvió un array válido');
      }
    } catch (err) {
      console.error("Error en traducción del historial:", err);
      // No mostrar error al usuario para no interrumpir la experiencia
    } finally {
      hideTyping();
      isTranslating = false;
    }
  }

  // ==========================================
  // 14. SISTEMA DE ACTUALIZACIÓN DE IDIOMA
  // ==========================================
  function updateChatbotLanguage(newLang) {
    if (newLang === currentLang) return;
    
    const oldLang = currentLang;
    currentLang = newLang;
    
    // Actualizar textos de la UI
    const headerName = document.getElementById('rs-header-name');
    const headerStatus = document.getElementById('rs-header-status');
    const plannerText = document.getElementById('rs-planner-text');
    const input = document.getElementById('rs-chat-input');
    const bubble = document.getElementById('rs-chat-bubble');
    const coloquialStatus = document.getElementById('rs-coloquial-status');
    const coloquialBtn = document.getElementById('rs-coloquial-toggle');
    const statusDot = document.querySelector('.rs-dot');
    
    if (headerName) headerName.textContent = TRANSLATABLE_TEXTS[newLang].headerTitle;
    if (headerStatus) {
      headerStatus.textContent = isAuthenticated() 
        ? TRANSLATABLE_TEXTS[newLang].headerStatus 
        : TRANSLATABLE_TEXTS[newLang].headerLocked;
    }
    if (statusDot) {
      statusDot.className = `rs-dot ${isAuthenticated() ? 'online' : 'locked'}`;
    }
    if (plannerText) plannerText.textContent = TRANSLATABLE_TEXTS[newLang].btnPlanner;
    if (input && !plannerMode) {
      input.placeholder = TRANSLATABLE_TEXTS[newLang].inputPlaceholder;
    }
    if (bubble) bubble.textContent = TRANSLATABLE_TEXTS[newLang].welcomeBubble;
    if (coloquialStatus) {
      coloquialStatus.textContent = isColoquialMode 
        ? TRANSLATABLE_TEXTS[newLang].coloquialOn 
        : TRANSLATABLE_TEXTS[newLang].coloquialOff;
    }
    if (coloquialBtn) {
      coloquialBtn.innerHTML = `${TRANSLATABLE_TEXTS[newLang].coloquialMode} <span id="rs-coloquial-status">${isColoquialMode ? TRANSLATABLE_TEXTS[newLang].coloquialOn : TRANSLATABLE_TEXTS[newLang].coloquialOff}</span>`;
    }
    
    const shareBtn = document.getElementById('rs-share-plan');
    if (shareBtn) shareBtn.textContent = TRANSLATABLE_TEXTS[newLang].sharePlan;
    
    document.querySelectorAll('.rs-quick-btn').forEach((btn, index) => {
      if (index < 4 && TRANSLATABLE_TEXTS[newLang].quickQuestions[index]) {
        btn.textContent = TRANSLATABLE_TEXTS[newLang].quickQuestions[index];
      }
    });
    
    // Actualizar overlay de bloqueo si existe
    const existingOverlay = document.querySelector('.rs-login-overlay');
    if (existingOverlay && !isAuthenticated()) {
      const newOverlay = createLockOverlay();
      existingOverlay.replaceWith(newOverlay);
    }

    // 🔥 TRADUCIR EL HISTORIAL DE MENSAJES AL NUEVO IDIOMA
    // Solo si hay mensajes y el idioma cambió realmente
    if (conversationHistory.length > 0) {
      // Esperar un momento para que la UI se actualice
      setTimeout(() => {
        translateChatHistory(newLang);
      }, 300);
    }
  }

  function startPageLanguageObserver() {
    // Observer para cambios en el atributo lang del HTML
    const observer = new MutationObserver(() => {
      const newLang = detectLanguage();
      if (newLang !== currentLang) {
        updateChatbotLanguage(newLang);
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    
    // Escuchar evento personalizado de i18n
    document.addEventListener('langchange', (e) => {
      const newLang = e.detail?.lang || detectLanguage();
      if (newLang !== currentLang) {
        updateChatbotLanguage(newLang);
      }
    });
  }

  // ==========================================
  // 15. INICIALIZACIÓN PRINCIPAL
  // ==========================================
  function init() {
    currentLang = detectLanguage();
    
    if (isAuthenticated()) {
      loadSavedHistory();
    }

    const styleEl = document.createElement('style');
    styleEl.textContent = STYLES;
    document.head.appendChild(styleEl);

    let targetContainer = document.getElementById(TARGET_CONTAINER_ID);
    if (!targetContainer) {
      targetContainer = document.body;
    } else {
      if (window.getComputedStyle(targetContainer).position === 'static') {
        targetContainer.style.position = 'relative';
      }
    }

    const wrap = document.createElement('div');
    wrap.id = 'rs-chat-widget';

    const bubble = document.createElement('div');
    bubble.id = 'rs-chat-bubble';
    bubble.textContent = TRANSLATABLE_TEXTS[currentLang].welcomeBubble;
    if (!isAuthenticated()) {
      bubble.classList.add('locked');
    }
    bubble.addEventListener('click', toggleChat);

    const svgPupusaFace = `
      <svg class="rs-chat-icon" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#F3D598" stroke="#be8e56" stroke-width="3"/>
        <circle cx="30" cy="30" r="5" fill="#E4C17D" opacity="0.6"/>
        <circle cx="70" cy="40" r="7" fill="#E4C17D" opacity="0.5"/>
        <circle cx="45" cy="75" r="6" fill="#E4C17D" opacity="0.7"/>
        <g id="rs-btn-pupusa-face">
          <ellipse cx="35" cy="45" rx="5" ry="7" fill="#18181b"/>
          <ellipse cx="65" cy="45" rx="5" ry="7" fill="#18181b"/>
          <circle cx="33" cy="42" r="2" fill="white"/>
          <circle cx="63" cy="42" r="2" fill="white"/>
          <path d="M 35 65 Q 50 75, 65 65" stroke="#18181b" stroke-width="3.5" fill="none" stroke-linecap="round"/>
          <circle cx="25" cy="60" r="5" fill="#EEA0A0" opacity="0.7"/>
          <circle cx="75" cy="60" r="5" fill="#EEA0A0" opacity="0.7"/>
        </g>
      </svg>
    `;

    const btn = document.createElement('button');
    btn.id = 'rs-chat-btn';
    btn.setAttribute('aria-label', 'Abrir asistente de Salvadorean Roots');
    if (!isAuthenticated()) {
      btn.classList.add('locked');
    }
    btn.innerHTML = `
      ${svgPupusaFace}
      <svg class="rs-close-icon" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    `;
    btn.addEventListener('click', toggleChat);

    const svgPupusaAvatar = `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="48" fill="#F3D598" stroke="#be8e56" stroke-width="2"/>
        <circle cx="30" cy="30" r="5" fill="#E4C17D" opacity="0.6"/>
        <circle cx="70" cy="40" r="7" fill="#E4C17D" opacity="0.5"/>
        <circle cx="45" cy="75" r="6" fill="#E4C17D" opacity="0.7"/>
        <g id="rs-pupusa-face">
          <g id="rs-pupusa-eyes">
            <ellipse cx="35" cy="45" rx="5" ry="7" fill="#18181b"/>
            <ellipse cx="65" cy="45" rx="5" ry="7" fill="#18181b"/>
            <circle cx="33" cy="42" r="2" fill="white"/>
            <circle cx="63" cy="42" r="2" fill="white"/>
          </g>
          <g id="rs-pupusa-mouth-group">
            <path id="rs-pupusa-mouth-closed" d="M 38 65 Q 50 73, 62 65" stroke="#18181b" stroke-width="3.5" fill="none" stroke-linecap="round"/>
            <path id="rs-pupusa-mouth-open" d="M 38 65 Q 50 68, 62 65 Q 50 80, 38 65" fill="#18181b" opacity="0"/>
          </g>
          <circle cx="25" cy="60" r="5" fill="#EEA0A0" opacity="0.7"/>
          <circle cx="75" cy="60" r="5" fill="#EEA0A0" opacity="0.7"/>
        </g>
      </svg>
    `;

    const win = document.createElement('div');
    win.id = 'rs-chat-window';
    win.style.display = 'none';
    if (!isAuthenticated()) {
      win.classList.add('locked');
    }
    win.innerHTML = `
      <div id="rs-chat-header" class="${!isAuthenticated() ? 'locked' : ''}">
        <div class="rs-avatar" id="rs-bot-avatar">
          ${svgPupusaAvatar}
          ${!isAuthenticated() ? '<div class="rs-lock-overlay">🔒</div>' : ''}
        </div>
        <div class="rs-header-info">
          <div class="rs-name" id="rs-header-name">${TRANSLATABLE_TEXTS[currentLang].headerTitle}</div>
          <div class="rs-status">
            <span class="rs-dot ${isAuthenticated() ? 'online' : 'locked'}"></span>
            <span id="rs-header-status">${isAuthenticated() ? TRANSLATABLE_TEXTS[currentLang].headerStatus : TRANSLATABLE_TEXTS[currentLang].headerLocked}</span>
          </div>
        </div>
        <button id="rs-planner-toggle" aria-pressed="false" class="${!isAuthenticated() ? 'locked' : ''}">
          <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>
          <span id="rs-planner-text">${TRANSLATABLE_TEXTS[currentLang].btnPlanner}</span>
        </button>
      </div>
      <div id="rs-chat-messages" class="${!isAuthenticated() ? 'locked' : ''}"></div>
      <div id="rs-chat-footer" class="${!isAuthenticated() ? 'locked' : ''}">
        <input type="text" id="rs-chat-input" placeholder="${TRANSLATABLE_TEXTS[currentLang].inputPlaceholder}" maxlength="400" class="${!isAuthenticated() ? 'locked' : ''}" ${!isAuthenticated() ? 'disabled' : ''} />
        <button id="rs-chat-send" aria-label="Enviar" class="${!isAuthenticated() ? 'locked' : ''}" ${!isAuthenticated() ? 'disabled' : ''}>
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    `;

    // Si es invitado, añadir overlay de bloqueo
    if (!isAuthenticated()) {
      const overlay = createLockOverlay();
      win.appendChild(overlay);
    }

    wrap.appendChild(bubble);
    wrap.appendChild(win);
    wrap.appendChild(btn);
    targetContainer.appendChild(wrap);

    document.getElementById('rs-chat-send').addEventListener('click', sendMessage);
    document.getElementById('rs-chat-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey && isAuthenticated()) { 
        e.preventDefault(); 
        sendMessage(); 
      }
    });
    document.getElementById('rs-planner-toggle').addEventListener('click', togglePlannerMode);

    setupGSAPHoverEffects();

    // Agregar botones al header (solo para autenticados)
    const header = document.getElementById('rs-chat-header');
    if (header && isAuthenticated()) {
      const plannerBtn = document.getElementById('rs-planner-toggle');
      
      const coloquialBtn = document.createElement('button');
      coloquialBtn.id = 'rs-coloquial-toggle';
      coloquialBtn.innerHTML = `${TRANSLATABLE_TEXTS[currentLang].coloquialMode} <span id="rs-coloquial-status">${TRANSLATABLE_TEXTS[currentLang].coloquialOff}</span>`;
      coloquialBtn.addEventListener('click', toggleColoquialMode);
      
      if (plannerBtn) {
        header.insertBefore(coloquialBtn, plannerBtn);
      } else {
        header.appendChild(coloquialBtn);
      }
      
      const shareBtn = document.createElement('button');
      shareBtn.id = 'rs-share-plan';
      shareBtn.textContent = TRANSLATABLE_TEXTS[currentLang].sharePlan;
      shareBtn.style.display = 'none';
      
      if (plannerBtn) {
        header.insertBefore(shareBtn, plannerBtn);
      } else {
        header.appendChild(shareBtn);
      }
    }

    gsap.to(btn, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)", delay: 0.5 });
    gsap.to(bubble, { opacity: 1, duration: 0.4, delay: 1.2 });

    setTimeout(() => {
      if (!isOpen && !bubbleHidden) {
        hideBubble();
      }
    }, 7000);

    if (isAuthenticated() && conversationHistory.length > 0) {
      renderSavedHistoryUI();
    } else if (isAuthenticated()) {
      addBotMessage(TRANSLATABLE_TEXTS[currentLang].welcomeMessage, true);
    }
    
    startPageLanguageObserver();

    // ==========================================
    // ESCUCHAR CAMBIOS DE AUTENTICACIÓN
    // ==========================================
    document.addEventListener('authchange', () => {
      updateAuthState();
    });

    // También escuchar cambios en localStorage (por si guardas el estado allí)
    window.addEventListener('storage', (e) => {
      if (e.key === 'userAuthState' || e.key === 'token' || e.key === 'auth') {
        updateAuthState();
      }
    });
  }

  // ==========================================
  // 16. CARGA Y EJECUCIÓN
  // ==========================================
  loadGSAP(() => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  });

})();