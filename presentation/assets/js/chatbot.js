/* ============================================================
  Salvadorean Roots — chatbot.js
   Chatbot flotante de asistencia cultural (Bilingüe ES/EN con GSAP)
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

  function getSystemPrompt(lang) {
    if (lang === 'en') {
      return `You are "Pupusita", assistant for Salvadorean Roots. ALWAYS respond in English. Only talk about culture, history, gastronomy, tourism, and legends of El Salvador (Current year: 2026).
CRITICAL RESPONSE RULES:
1. Ultra direct and minimalist: Respond in telegraphic style. Forbidden to use introductions ("Hello!", "Sure thing", "Gladly"). Go straight to the data in the very first word.
2. Maximum length: Strict limit of 1 to 2 short sentences (max 25 words total).
3. Formatting: Bold **the main topic** the first time you mention it.
4. Coverage: Valid questions about Salvadorean territory, presidents, and current local news. Do not respond about other countries or international politics.
5. Exact names: If you cite places from the verified list, write them EXACTLY the same way to trigger the interactive map.
${RAICES_LANDMARKS_INFO}
6. Filter: If greeted, say only: "Hello, I am Pupusita. What info are you looking for?". If insulted, moderate with a phrase. If unrelated to El Salvador, respond ONLY: "I don't have answers for topics unrelated to the site."`;
    }
    return `Eres "Pupusita", asistente de Salvadorean Roots. Responde SIEMPRE en español. Solo hablas sobre cultura, historia, gastronomía, turismo y leyendas de El Salvador (Año actual: 2026).
REGLAS CRÍTICAS DE RESPUESTA:
1. Ultra directo y minimalist: Responde con estilo telegráfico. Prohibido usar introducciones ("¡Hola!", "Claro que sí", "Con gusto te explico"). Ve directo al dato en la primera palabra.
2. Extensión máxima: Límite estricto de 1 a 2 frases cortas (máximo 25 palabras en total).
3. Formato: Resalta en **negrita** el tema principal la primera vez que lo nombres.
4. Cobertura: Válidas preguntas sobre territorio salvadoreño, presidentes y noticias locales actuales. No respondas sobre otros países ni política internacional.
5. Nombres exactos: Si citas lugares de la lista verificada, escríbelos EXACTAMENTE igual para activar el mapa interactivo.
${RAICES_LANDMARKS_INFO}
6. Filtro: Si te saludan, di solo: "Hola, soy Pupusita. ¿Qué dato buscas?". Si insultan, modera con una frase. Si es ajeno a El Salvador, responde ÚNICAMENTE: "No tengo respuesta a temas no relacionados al sitio."`;
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
5. Closure: No farewells or recommendations. End immediately right after the total.`;
    }
    return `Eres "Pupusita" en modo "Planificador de salidas". Responde SIEMPRE en español. Crea itinerarios rápidos y reales en El Salvador usando dólares ($ USD).
REGLAS CRÍTICAS DEL PLAN:
1. Formato estricto: Cero párrafos, cero textos introductorios. Responde DIRECTAMENTE con la lista numerada.
2. Brevedad radical: Máximo 3 actividades por plan más el apartado de transporte. Cada línea debe ser corta.
3. Costos: Escribe el precio al lado de cada actividad y detalla una línea específica para el costo estimado de **Transporte**. Pon el total general al final.
4. Nombres exactos: Usa EXACTAMENTE los nombres de esta lista si los incluyes:
${RAICES_LANDMARKS_INFO}
5. Cierre: Sin despedidas ni recomendaciones. Termina inmediatamente tras el total.`;
  }

  const PROXY_URL = '/chat-proxy';

  const TRANSLATABLE_TEXTS = {
    es: {
      welcomeBubble: '¡Hola! ¿Tienes dudas sobre El Salvador?',
      headerTitle: 'Pupusita — Asistente',
      headerStatus: 'En línea',
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
      plannerStart: "¡Perfecto! Activaste el **Planificador de salidas**. 🧭\n\nVamos a armar tu plan ideal por El Salvador. Primero, **¿qué tipo de actividad te gustaría hacer?** (Puedes escribir: *gastronomía, historia, leyendas, playas o un poco de todo*).",
      errValidation: "❌ **Esa no es la información que he solicitado.** Por favor, sigue las indicaciones descritas.",
      plannerLocationPrompt: "Entendido. Ahora, **¿desde qué ciudad o municipio vas a iniciar tu salida?** (Esto me servirá para calcular las rutas y el costo aproximado del transporte).",
      plannerBudgetPrompt: "Anotado tu punto de partida. **¿Cuál es tu presupuesto aproximado en dólares ($ USD) para esta salida?**",
      plannerDurationPrompt: "Perfecto. **¿Cuánto tiempo tienes disponible para tu salida?** (ej. *medio día, un día completo o todo el fin de semana*).",
      plannerDetailsPrompt: "Una última cosa 🙂: **¿Hay algún platillo, lugar específico o preferencia que quieras incluir sí o sí?** Si no, escribe *\"omitir\"*.",
      plannerSuccess: "¡Tu plan ha sido generado con éxito! El planificador se ha desactivado automáticamente. Puedes seguir haciéndome preguntas normales sobre El Salvador o volver a presionar **Planificar** si deseas armar otra ruta.",
      errGeneric: "Hubo un problema. Por favor intenta de nuevo.",
      quickQuestions: ['¿Qué son las pupusas?', '¿Qué es Joya de Cerén?', '¿Quién es la Siguanaba?', '¿Cuándo son las Fiestas Agostinas?']
    },
    en: {
      welcomeBubble: 'Hello! Questions about El Salvador?',
      headerTitle: 'Pupusita — Assistant',
      headerStatus: 'Online',
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
      plannerStart: "Perfect! You activated the **Trip Planner**. 🧭\n\nLet's plan your ideal trip around El Salvador. First, **what kind of activity would you like to do?** (You can type: *gastronomy, history, legends, beaches, or a bit of everything*).",
      errValidation: "❌ **That is not the information I requested.** Please follow the instructions provided.",
      plannerLocationPrompt: "Understood. Now, **from which city or town will you start your trip?** (This will help me calculate routes and approximate transport costs).",
      plannerBudgetPrompt: "Starting point noted. **What is your approximate budget in dollars ($ USD) for this trip?**",
      plannerDurationPrompt: "Perfect. **How much time do you have available for your trip?** (e.g., *half day, a full day, or the whole weekend*).",
      plannerDetailsPrompt: "One last thing 🙂: **Is there any specific dish, place, or preference you want to include no matter what?** If not, write *\"skip\"*.",
      plannerSuccess: "Your plan has been generated successfully! The planner has turned off automatically. You can keep asking me regular questions about El Salvador or press **Plan Trip** again to create another route.",
      errGeneric: "There was a problem. Please try again.",
      quickQuestions: ['What are pupusas?', 'What is Joya de Cerén?', 'Who is the Siguanaba?', 'When are the August Festivals?']
    }
  };

  let currentLang = 'es'; 

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
      box-shadow: 0 8px 24px rgba(17, 48, 104, 0.35);
      opacity: 0;
      transform: scale(0.5);
    }
    #rs-chat-btn svg { width: 26px; height: 26px; fill: #fff; }
    #rs-chat-btn .rs-close-icon { display: none; }
    #rs-chat-btn.open .rs-chat-icon { display: none; }
    #rs-chat-btn.open .rs-close-icon { block: block; }

    #rs-chat-bubble {
      position: fixed;
      bottom: 100px;
      left: 28px;
      background: #113068;
      color: #fff;
      font-family: 'Lato', sans-serif;
      font-size: 13px;
      font-weight: 500;
      padding: 10px 16px;
      border-radius: 16px 16px 16px 4px;
      border: 1.5px solid #be8e56;
      z-index: 9998;
      white-space: nowrap;
      box-shadow: 0 6px 20px rgba(0,0,0,0.15);
      cursor: pointer;
      opacity: 0;
    }
    #rs-chat-bubble::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 12px;
      border: 5px solid transparent;
      border-top-color: #be8e56;
    }

    #rs-chat-window {
      position: fixed;
      bottom: 100px;
      left: 28px;
      width: clamp(320px, 24vw, 480px);
      height: clamp(460px, 62vh, 680px);
      background: #18181b; 
      border: 1.5px solid rgba(190, 142, 86, 0.5);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      z-index: 9998;
      overflow: hidden;
      box-shadow: 0 16px 40px rgba(0,0,0,0.6);
      opacity: 0;
      transform: translateY(30px) scale(0.95);
      transform-origin: bottom left;
    }

    #rs-chat-header {
      background: #113068;
      padding: 14px 18px; 
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1.5px solid rgba(190, 142, 86, 0.4);
      flex-shrink: 0;
    }

    /* Contenedor del Avatar SVG */
    #rs-chat-header .rs-avatar {
      width: 42px; height: 42px;
      border-radius: 50%;
      background: #be8e56;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      overflow: visible; /* Importante para que la animación no se corte */
      position: relative;
      border: 2px solid transparent;
      transition: all 0.3s ease;
    }

    /* Estilos base del SVG de la Pupusa */
    #rs-chat-header .rs-avatar svg {
      width: 110%; height: 110%; /* Ligeramente más grande que el contenedor */
      transform-origin: center bottom;
      transition: transform 0.2s ease-in-out;
    }

    /* Animación de Pestañeo Constante */
    @keyframes rs-blink {
      0%, 90%, 100% { transform: scaleY(1); }
      95% { transform: scaleY(0.1); }
    }
    #rs-pupusa-clip-eye-l, #rs-pupusa-clip-eye-r {
      animation: rs-blink 5s infinite;
      transform-origin: center;
    }

    /* ===================================================
       ESTADOS DE ANIMACIÓN DE HABLA (Se activan vía JS)
       =================================================== */
    
    /* 1. La boca se abre y cierra rápido */
    @keyframes rs-mouth-speak {
      0%, 100% { transform: scaleY(1); }
      50% { transform: scaleY(0.3); } /* Se encoge verticalmente simulando apertura */
    }

    /* 2. El cuerpo se balancea sutilmente */
    @keyframes rs-body-speak {
      0%, 100% { transform: rotate(0deg) scale(1); }
      25% { transform: rotate(-3deg) scale(1.02); }
      75% { transform: rotate(3deg) scale(1.02); }
    }

    /* Clase que aplica JS cuando el bot responde */
    #rs-chat-header .rs-avatar.talking {
      border-color: #be8e56;
      box-shadow: 0 0 15px rgba(190, 142, 86, 0.7);
    }

    #rs-chat-header .rs-avatar.talking svg {
      animation: rs-body-speak 0.4s infinite ease-in-out;
    }

    #rs-chat-header .rs-avatar.talking #rs-pupusa-mouth {
      animation: rs-mouth-speak 0.2s infinite ease-in-out;
      transform-origin: center; /* La boca se abre desde su centro */
    }

    #rs-chat-header .rs-header-info { flex: 1; }
    #rs-chat-header .rs-name {
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: clamp(14px, 0.9vw, 17px); 
      color: #fff;
      letter-spacing: 0.3px;
    }
    #rs-chat-header .rs-status { font-size: 11px; color: rgba(255,255,255,.65); margin-top: 2px; display: flex; align-items: center; }
    #rs-chat-header .rs-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: #22c55e; display: inline-block; margin-right: 5px;
      box-shadow: 0 0 8px #22c55e;
    }

    #rs-lang-selector {
      background: rgba(255,255,255,.1);
      border: 1px solid rgba(190,142,86,.4);
      color: #fff;
      padding: 4px 6px;
      border-radius: 12px;
      cursor: pointer;
      font-size: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background .2s;
    }
    #rs-lang-selector:hover { background: rgba(255,255,255,.2); }

    #rs-planner-toggle {
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(255,255,255,.06);
      border: 1px solid rgba(190,142,86,.4);
      color: rgba(255,255,255,.9);
      font-family: 'Lato', sans-serif;
      font-weight: 600;
      font-size: clamp(10px, 0.7vw, 12px);
      padding: 5px 10px;
      border-radius: 20px;
      cursor: pointer;
      flex-shrink: 0;
      transition: all .2s ease;
      white-space: nowrap;
    }
    #rs-planner-toggle svg { width: 13px; height: 13px; fill: currentColor; flex-shrink: 0; }
    #rs-planner-toggle:hover { background: rgba(190,142,86,.15); border-color: #be8e56; }
    #rs-planner-toggle.active {
      background: #be8e56;
      border-color: #be8e56;
      color: #113068;
      box-shadow: 0 2px 10px rgba(190,142,86,0.3);
    }

    .rs-planner-btn {
      color: #113068 !important;
      background: #be8e56 !important;
      border-color: #be8e56 !important;
      font-weight: 600;
    }
    .rs-cancel-btn {
      color: rgba(255,255,255,.6) !important;
      border-color: rgba(255,255,255,.15) !important;
      background: transparent !important;
    }

    #rs-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px 20px; 
      display: flex;
      flex-direction: column;
      gap: 14px;
      background: #18181b;
      scrollbar-width: thin;
      scrollbar-color: rgba(190,142,86,.3) transparent;
    }
    #rs-chat-messages::-webkit-scrollbar { width: 4px; }
    #rs-chat-messages::-webkit-scrollbar-thumb { background: rgba(190,142,86,.3); border-radius: 4px; }

    .rs-msg { display: flex; flex-direction: column; max-width: 85%; opacity: 0; transform: translateY(12px); }
    .rs-msg.bot  { align-self: flex-start; margin-right: 8px; } 
    .rs-msg.user { align-self: flex-end; margin-left: 8px; }  
    
    .rs-msg-bubble { 
      padding: 10px 14px; 
      border-radius: 16px; 
      font-size: clamp(12.5px, 0.85vw, 15.5px); 
      line-height: 1.45; 
      letter-spacing: 0.1px; 
    }
    
    .rs-msg.bot  .rs-msg-bubble {
      background: #27272a; 
      border: 1px solid rgba(255,255,255,0.05);
      color: #f4f4f5;
      border-radius: 4px 16px 16px 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .rs-msg.user .rs-msg-bubble {
      background: #113068;
      border: 1px solid rgba(190,142,86,.2);
      color: #fff;
      border-radius: 16px 16px 4px 16px;
      box-shadow: 0 2px 8px rgba(17,48,104,0.2);
    }

    .rs-typing {
      display: flex; gap: 6px; align-items: center;
      padding: 10px 14px;
      background: #27272a;
      border-radius: 4px 16px 16px 16px;
      align-self: flex-start;
      max-width: 65px;
      margin-left: 8px;
    }
    .rs-typing span {
      width: 5px; height: 5px; border-radius: 50%;
      background: #be8e56;
      animation: rs-bounce .9s infinite;
    }
    .rs-typing span:nth-child(2) { animation-delay: .15s; }
    .rs-typing span:nth-child(3) { animation-delay: .3s; }
    @keyframes rs-bounce {
      0%,80%,100% { transform: translateY(0); opacity: .3; }
      40%          { transform: translateY(-4px); opacity: 1; }
    }

    #rs-chat-footer {
      padding: 14px 18px; 
      border-top: 1px solid rgba(255,255,255,0.05);
      display: flex;
      gap: 10px;
      flex-shrink: 0;
      background: #202023;
      align-items: center;
    }
    #rs-chat-input {
      flex: 1;
      background: #27272a;
      border: 1.5px solid rgba(190,142,86,.25);
      border-radius: 22px;
      padding: 8px 16px;
      color: #fff;
      font-size: clamp(12px, 0.8vw, 14.5px);
      outline: none;
      transition: all .2s ease;
      height: 38px;
    }
    #rs-chat-input:focus { border-color: #be8e56; background: #3f3f46; box-shadow: 0 0 0 3px rgba(190,142,86,0.15); }
    #rs-chat-input::placeholder { color: rgba(255,255,255,.4); }
    
    #rs-chat-send {
      width: 38px; height: 38px; flex-shrink: 0;
      background: #be8e56;
      border: none; border-radius: 50%;
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      box-shadow: 0 2px 6px rgba(190,142,86,0.2);
    }
    #rs-chat-send svg { width: 16px; height: 16px; fill: #fff; margin-left: 2px; }

    .rs-quick-btns { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; width: 100%; opacity: 0; }
    .rs-quick-btn {
      font-size: clamp(11px, 0.75vw, 13px);
      font-family: 'Lato', sans-serif;
      font-weight: 500;
      color: #be8e56;
      background: rgba(190,142,86,.08);
      border: 1px solid rgba(190,142,86,.3);
      border-radius: 20px;
      padding: 5px 12px;
      cursor: pointer;
      white-space: normal;
      text-align: left;
    }

    .rs-map-btn {
      color: #7fc3f0;
      background: rgba(82,160,224,.1);
      border-color: rgba(82,160,224,.35);
      text-decoration: none;
      display: inline-flex;
      align-items: center;
    }

    @media (max-width: 420px) {
      #rs-chat-window { width: calc(100vw - 24px); left: 12px; bottom: 92px; height: 75vh; max-height: 75vh; }
      #rs-chat-btn    { left: 16px; bottom: 16px; }
    }
  `;

  const LANDMARKS_MINI = [
    { id: 1,  nombre: 'Tazumal' }, { id: 2,  nombre: 'Joya de Cerén' }, { id: 3,  nombre: 'Salvador del Mundo' },
    { id: 4,  nombre: 'Suchitoto' }, { id: 5,  nombre: 'Catedral Metropolitana' }, { id: 6,  nombre: 'MUNA' },
    { id: 7,  nombre: 'Ruinas de San Andrés' }, { id: 8,  nombre: 'Pupusería El Caserío' }, { id: 9,  nombre: 'Semitas de Cojutepeque' },
    { id: 10, nombre: 'Mercado Central de San Salvador' }, { id: 11, nombre: 'Nahuizalco — Mercado Nocturno' },
    { id: 12, nombre: 'Plaza las Américas' }, { id: 13, nombre: 'Panchimalco' }, { id: 14, nombre: 'Festival de Suchitoto' },
    { id: 15, nombre: 'Catedral de Santa Ana' }, { id: 16, nombre: 'Casa de la Cultura de Izalco' },
    { id: 17, nombre: 'Casa de la Independencia' }, { id: 18, nombre: 'Iglesia El Rosario' }, { id: 19, nombre: 'Lago de Coatepeque' },
    { id: 20, nombre: 'Bosque El Imposible' }, { id: 21, nombre: 'Fiestas Agostinas' }, { id: 22, nombre: 'Día de los Farolitos' },
    { id: 23, nombre: 'Fiestas Julias' }, { id: 24, nombre: 'Fiestas Patronales de San Vicente' },
    { id: 25, nombre: 'Festival de las Flores y Palmas' }, { id: 26, nombre: 'Gran Carnaval de San Miguel' },
    { id: 27, nombre: 'Fiestas de los Historiantes de Cuisnahuat' }, { id: 28, nombre: 'Festival del Jocote Corona' },
    { id: 29, nombre: 'Día de la Calabiuza' }, { id: 30, nombre: 'Festival de los Canastos' }, { id: 31, nombre: 'Día de la Cruz' },
    { id: 32, nombre: 'Festival del Maíz' }, { id: 33, nombre: 'Fiestas del Bálsamo' }, { id: 34, nombre: 'Feria del Membrillo' },
    { id: 35, nombre: 'Fiestas Patronales de La Unión' }, { id: 36, nombre: 'Festival de los Farolitos en Ataco' },
    { id: 37, nombre: 'Festival de la Panela' }, { id: 38, nombre: 'Fiestas del Rey Guajactial' }, { id: 39, nombre: 'Festival del Cangrejo' },
    { id: 40, nombre: 'Romería de Esquipulas' }, { id: 41, nombre: 'Festival del Barro' }, { id: 42, nombre: 'Fiestas del Arroz' },
    { id: 43, nombre: 'Festival de la Juventudes Populares' }, { id: 44, nombre: 'Feria del Marisco' },
    { id: 45, nombre: 'Fiesta de la Primicia de la Cosecha' }, { id: 46, nombre: 'Carnaval de la Panela de Verapaz' },
    { id: 47, nombre: 'Fiestas Patronales de Cojutepeque' }, { id: 48, nombre: 'Festival del Añil' },
    { id: 49, nombre: 'Fiestas Patronales de Gotera' }, { id: 50, nombre: 'Festival Internacional del Chicharrón' },
    { id: 51, nombre: 'El Boquerón' }, { id: 52, nombre: 'Puerta del Diablo' },
  ];

  let conversationHistory = [];
  let isOpen      = false;
  let isLoading   = false;
  let bubbleHidden = false;

  let plannerMode = false;   
  let plannerStep = null;    
  let plannerData = {};

  // Carga e inyección dinámica de GSAP si no se encuentra en el entorno global
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

  function init() {
    const styleEl = document.createElement('style');
    styleEl.textContent = STYLES;
    document.head.appendChild(styleEl);

    const wrap = document.createElement('div');
    wrap.id = 'rs-chat-widget';

    const bubble = document.createElement('div');
    bubble.id = 'rs-chat-bubble';
    bubble.textContent = TRANSLATABLE_TEXTS[currentLang].welcomeBubble;
    bubble.addEventListener('click', toggleChat);

    const btn = document.createElement('button');
    btn.id = 'rs-chat-btn';
    btn.setAttribute('aria-label', 'Abrir asistente de Salvadorean Roots');
    btn.innerHTML = `
      <svg class="rs-chat-icon" viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2zm-8 10H8V10h4v2zm4-4H8V6h8v2z"/></svg>
      <svg class="rs-close-icon" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
    `;
    btn.addEventListener('click', toggleChat);

    // ============================================================
    // DISEÑO DEL PERSONAJE SVG (PUPUSA ANIMADA)
    // Se inserta directamente en el HTML del header
    // ============================================================
    const svgPupusaAvatar = `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <!-- Cuerpo de la Pupusa (Círculo base tostado) -->
        <circle cx="50" cy="50" r="48" fill="#F3D598" stroke="#be8e56" stroke-width="2"/>
        <!-- Manchas de tostado sutiles -->
        <circle cx="30" cy="30" r="5" fill="#E4C17D" opacity="0.6"/>
        <circle cx="70" cy="40" r="7" fill="#E4C17D" opacity="0.5"/>
        <circle cx="45" cy="75" r="6" fill="#E4C17D" opacity="0.7"/>

        <!-- Cara del personaje -->
        <g id="rs-pupusa-face">
          <!-- Ojos (Negros con brillo) -->
          <g id="rs-pupusa-eyes">
            <ellipse cx="35" cy="45" rx="5" ry="7" fill="#18181b"/>
            <ellipse cx="65" cy="45" rx="5" ry="7" fill="#18181b"/>
            <!-- Brillos de ojos -->
            <circle cx="33" cy="42" r="2" fill="white"/>
            <circle cx="63" cy="42" r="2" fill="white"/>
          </g>
          
          <!-- Boca (Curva sonriente base) -->
          <path id="rs-pupusa-mouth" d="M 35 65 Q 50 75, 65 65" stroke="#18181b" stroke-width="3" fill="none" stroke-linecap="round"/>
          
          <!-- Mejillas sonrosadas -->
          <circle cx="25" cy="60" r="5" fill="#EEA0A0" opacity="0.7"/>
          <circle cx="75" cy="60" r="5" fill="#EEA0A0" opacity="0.7"/>
        </g>
      </svg>
    `;

    const win = document.createElement('div');
    win.id = 'rs-chat-window';
    win.style.display = 'none';
    win.innerHTML = `
      <div id="rs-chat-header">
        <!-- Contenedor del Avatar modificado -->
        <div class="rs-avatar" id="rs-bot-avatar">
          ${svgPupusaAvatar}
        </div>
        <div class="rs-header-info">
          <div class="rs-name" id="rs-header-name">${TRANSLATABLE_TEXTS[currentLang].headerTitle}</div>
          <div class="rs-status"><span class="rs-dot"></span><span id="rs-header-status">${TRANSLATABLE_TEXTS[currentLang].headerStatus}</span></div>
        </div>
        <button id="rs-lang-selector" title="Change Language / Cambiar Idioma">🇪🇸</button>
        <button id="rs-planner-toggle" aria-pressed="false">
          <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>
          <span id="rs-planner-text">${TRANSLATABLE_TEXTS[currentLang].btnPlanner}</span>
        </button>
      </div>
      <div id="rs-chat-messages"></div>
      <div id="rs-chat-footer">
        <input type="text" id="rs-chat-input" placeholder="${TRANSLATABLE_TEXTS[currentLang].inputPlaceholder}" maxlength="400" />
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
    document.getElementById('rs-lang-selector').addEventListener('click', toggleLanguage);

    setupGSAPHoverEffects();

    // Animación de entrada inicial del Widget
    gsap.to(btn, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)", delay: 0.5 });
    gsap.to(bubble, { opacity: 1, duration: 0.4, delay: 1.2 });

    setTimeout(() => {
      if (!isOpen && !bubbleHidden) {
        hideBubble();
      }
    }, 7000);

    addBotMessage(TRANSLATABLE_TEXTS[currentLang].welcomeMessage, true);
  }

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
    triggerHover('#rs-lang-selector', 1.1);
  }

  function hideBubble() {
    const bubble = document.getElementById('rs-chat-bubble');
    if (bubble) {
      gsap.to(bubble, { opacity: 0, y: -10, duration: 0.3, onComplete: () => { bubble.remove(); } });
      bubbleHidden = true;
    }
  }

  async function toggleLanguage() {
    if (isLoading) return;
    
    const msgsContainer = document.getElementById('rs-chat-messages');
    const langBtn = document.getElementById('rs-lang-selector');
    
    // 1. Cambiar estado del idioma
    currentLang = currentLang === 'es' ? 'en' : 'es';
    
    // Animación del botón de idioma
    gsap.to(langBtn, { scale: 0.4, rotation: 90, duration: 0.15, onComplete: () => {
      langBtn.textContent = currentLang === 'es' ? '🇪🇸' : '🇬🇧';
      gsap.to(langBtn, { scale: 1, rotation: 0, duration: 0.2, ease: "back.out(2)" });
    }});
    
    // 2. Traducir textos estáticos de la interfaz
    document.getElementById('rs-header-name').textContent = TRANSLATABLE_TEXTS[currentLang].headerTitle;
    document.getElementById('rs-header-status').textContent = TRANSLATABLE_TEXTS[currentLang].headerStatus;
    document.getElementById('rs-planner-text').textContent = TRANSLATABLE_TEXTS[currentLang].btnPlanner;
    
    const input = document.getElementById('rs-chat-input');
    if (input && !plannerMode) {
      input.placeholder = TRANSLATABLE_TEXTS[currentLang].inputPlaceholder;
    }

    if (plannerMode) {
      setPlannerToggle(false);
      plannerStep = null;
      plannerData = {};
    }

    // 3. Traducir el historial activo si existen mensajes del usuario
    const hasUserMessages = conversationHistory.some(m => m.role === 'user');
    
    if (!hasUserMessages) {
      // Si solo estaba el saludo inicial, lo reiniciamos al nuevo idioma de forma limpia
      if (msgsContainer) msgsContainer.innerHTML = '';
      addBotMessage(TRANSLATABLE_TEXTS[currentLang].welcomeMessage, true);
    } else {
      // Si ya hay una conversación real, traducimos todo el bloque con GSAP
      isLoading = true;
      setInputEnabled(false, currentLang === 'es' ? 'Traduciendo chat...' : 'Translating chat...');
      showTyping();

      // Animación de salida (fade out) de los mensajes actuales
      const currentBubbles = msgsContainer.querySelectorAll('.rs-msg');
      await gsap.to(currentBubbles, { opacity: 0, y: -10, duration: 0.2, stagger: 0.05 });

      await translateExistingMessages();

      hideTyping();
      isLoading = false;
      setInputEnabled(true, TRANSLATABLE_TEXTS[currentLang].inputPlaceholder);
    }
  }

  async function translateExistingMessages() {
    const msgsContainer = document.getElementById('rs-chat-messages');
    if (!msgsContainer) return;

    const targetLangName = currentLang === 'es' ? 'Spanish' : 'English';
    
    // Le explicamos detalladamente el formato exacto que necesitamos
    const translationPrompt = `Translate the following JSON array of chat messages into ${targetLangName}.
Return ONLY the final translated JSON array. Do not wrap it in markdown code blocks, do not add explanations.
Format example: [{"role": "user", "content": "..."}]

Array to translate:
${JSON.stringify(conversationHistory)}`;

    try {
      const response = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: `You are a translation assistant. You ONLY output a valid JSON array containing the translated chat messages. Never include markdown blocks like \`\`\`json, never add introductory text, and never write JavaScript code.`,
          messages: [{ role: 'user', content: translationPrompt }]
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

      // --- LIMPIEZA A PRUEBA DE BALAS ---
      let cleanJson = rawReply.trim();
      
      // Si el modelo metió el JSON dentro de bloques de código markdown, los extraemos
      if (cleanJson.includes('[')) {
        const firstBracket = cleanJson.indexOf('[');
        const lastBracket = cleanJson.lastIndexOf(']');
        if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
          cleanJson = cleanJson.substring(firstBracket, lastBracket + 1);
        }
      }

      let translatedHistory;
      try {
        translatedHistory = JSON.parse(cleanJson);
      } catch (e) {
        console.error("Respuesta cruda del servidor que falló al parsear:", rawReply);
        throw new Error("El modelo no devolvió una estructura JSON válida.");
      }

      if (Array.isArray(translatedHistory) && translatedHistory.length > 0) {
        // Guardamos el nuevo historial traducido
        conversationHistory = translatedHistory;
        msgsContainer.innerHTML = '';
        
        conversationHistory.forEach((msg) => {
          const div = document.createElement('div');
          div.className = `rs-msg ${msg.role === 'user' ? 'user' : 'bot'}`;
          
          if (msg.role === 'user') {
            div.innerHTML = `<div class="rs-msg-bubble">${escapeHtml(msg.content)}</div>`;
          } else {
            const formatted = formatMessageText(msg.content);
            div.innerHTML = `<div class="rs-msg-bubble">${formatted}</div>`;
          }
          
          if (msg.role === 'assistant') {
            const landmarks = findMentionedLandmarks(msg.content);
            if (landmarks && landmarks.length) {
              const mapWrap = document.createElement('div');
              mapWrap.className = 'rs-quick-btns';
              mapWrap.style.opacity = '0';
              const mapaUrl = getMapaUrl();
              landmarks.forEach(lm => {
                const a = document.createElement('a');
                a.className = 'rs-quick-btn rs-map-btn';
                a.href = `${mapaUrl}${mapaUrl.includes('?') ? '&' : '?'}evento=${lm.id}`;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = TRANSLATABLE_TEXTS[currentLang].mapLinkText.replace('{name}', lm.nombre);
                mapWrap.appendChild(a);
              });
              div.appendChild(mapWrap);
            }
          }

          msgsContainer.appendChild(div);
        });

        // Animación de entrada
        const newBubbles = msgsContainer.querySelectorAll('.rs-msg');
        const mapButtons = msgsContainer.querySelectorAll('.rs-quick-btns');
        
        gsap.fromTo(newBubbles, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.3, stagger: 0.05 });
        if (mapButtons.length) {
          gsap.to(mapButtons, { opacity: 1, y: 0, duration: 0.2, delay: 0.2 });
        }
        
        msgsContainer.scrollTop = msgsContainer.scrollHeight;
      }
    } catch (err) {
      console.error("Error detallado en translateExistingMessages:", err);
      // Si falla, devolvemos la opacidad a los mensajes originales para que el chat siga operativo
      const currentBubbles = msgsContainer.querySelectorAll('.rs-msg');
      gsap.to(currentBubbles, { opacity: 1, y: 0, duration: 0.2 });
    }
  }

  function toggleChat() {
    isOpen = !isOpen;
    const win    = document.getElementById('rs-chat-window');
    const btn    = document.getElementById('rs-chat-btn');
    const chatIcon  = btn.querySelector('.rs-chat-icon');
    const closeIcon = btn.querySelector('.rs-close-icon');
    
    // Animación de rotación del botón al hacer click
    gsap.to(btn, { rotation: isOpen ? 90 : 0, duration: 0.3, ease: "power2.inOut" });

    if (isOpen) {
      hideBubble();
      win.style.display = 'flex';
      
      // Intercambio de iconos: oculta chat, muestra X
      chatIcon.style.display = 'none';
      closeIcon.style.display = 'block';
      btn.setAttribute('aria-label', 'Cerrar asistente');
      
      gsap.fromTo(win, 
        { opacity: 0, y: 35, scale: 0.92 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power4.out" }
      );
      setTimeout(() => document.getElementById('rs-chat-input')?.focus(), 100);
    } else {
      // Intercambio de iconos: muestra chat, oculta X
      chatIcon.style.display = 'block';
      closeIcon.style.display = 'none';
      btn.setAttribute('aria-label', 'Abrir asistente de Salvadorean Roots');
      
      gsap.to(win, { opacity: 0, y: 25, scale: 0.95, duration: 0.25, ease: "power2.in", onComplete: () => {
        win.style.display = 'none';
      }});
    }
  }

  function formatMessageText(text) {
    return escapeHtml(text)
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
  }

  function getMapaUrl() {
    const navLink = document.querySelector('a[href$="mapa.html"], a[href*="mapa.html"]');
    if (navLink) return navLink.getAttribute('href');
    return 'mapa.html'; 
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
    const formatted = formatMessageText(text);
    div.innerHTML = `<div class="rs-msg-bubble">${formatted}</div>`;
    
    let elementsToFade = [];

    if (withQuick) {
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
        a.rel = 'noopener noreferrer';
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
    const input   = document.getElementById('rs-chat-input');
    const sendBtn = document.getElementById('rs-chat-send');
    if (!input) return;
    input.disabled = !enabled;
    if (sendBtn) sendBtn.disabled = !enabled || isLoading;
    input.placeholder = placeholder || TRANSLATABLE_TEXTS[currentLang].inputPlaceholder;
  }

  function addUserMessage(text) {
    const msgs = document.getElementById('rs-chat-messages');
    if (!msgs) return;
    const div = document.createElement('div');
    div.className = 'rs-msg user';
    div.innerHTML = `<div class="rs-msg-bubble">${escapeHtml(text)}</div>`;
    msgs.appendChild(div);
    animateMessageNode(div);
    msgs.scrollTop = msgs.scrollHeight;
  }

  // ============================================================
  // CONTROL DE ANIMACIÓN DE HABLA DEL BOT
  // Se integra en showTyping y hideTyping
  // ============================================================
  function showTyping() {
    // Activar animación en el avatar del header
    const avatar = document.getElementById('rs-bot-avatar');
    if (avatar) avatar.classList.add('talking');

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
    // Desactivar animación en el avatar del header
    const avatar = document.getElementById('rs-bot-avatar');
    if (avatar) avatar.classList.remove('talking');

    const indicator = document.getElementById('rs-typing-indicator');
    if (indicator) {
      gsap.to(indicator, { opacity: 0, duration: 0.15, onComplete: () => indicator.remove() });
    }
  }

  function escapeHtml(t) {
    return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  // --- Planificador ---
  function setPlannerToggle(active) {
    plannerMode = active;
    const toggleBtn = document.getElementById('rs-planner-toggle');
    if (!toggleBtn) return;
    toggleBtn.classList.toggle('active', active);
    toggleBtn.setAttribute('aria-pressed', active ? 'true' : 'false');
    
    gsap.fromTo(toggleBtn, { scale: 0.9 }, { scale: 1, duration: 0.2, ease: "back.out(3)" });
  }

  function togglePlannerMode() {
    if (isLoading) return;
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

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  
  async function generatePlan() {
    setInputEnabled(false, TRANSLATABLE_TEXTS[currentLang].inputPlaceholderGenerating);
    showTyping();

    const isEn = currentLang === 'en';
    const userPrompt = isEn ? 
`Plan a trip with these preferences:
- Starting Location: ${plannerData.startLocation}
- Desired Activity: ${plannerData.activity}
- Total Budget: ${plannerData.budget}
- Time Available: ${plannerData.duration}${plannerData.details ? `\n- Specific Preferences: ${plannerData.details}` : ''}
Provide a concrete and realistic plan inside El Salvador. It is MANDATORY to include an estimated transportation cost starting from ${plannerData.startLocation} to the places to visit. Show a short numbered itinerary (max 3 activities), the breakdown of costs, and the estimated general total.` 
: 
`Planifícame una salida con estas preferences:
- Punto de inicio/Ciudad origen: ${plannerData.startLocation}
- Actividad deseada: ${plannerData.activity}
- Presupuesto total: ${plannerData.budget}
- Tiempo disponible: ${plannerData.duration}${plannerData.details ? `\n- Preferencias específicas: ${plannerData.details}` : ''}
Dame un plan concreto y realista dentro de El Salvador. Es OBLIGATORIO que incluyas una estimación de costo de transporte partiendo desde ${plannerData.startLocation} hacia los lugares a visitar. Muestra el itinerario numerado corto (máximo 3 actividades), el desglose del costo de transporte y actividades, y el gasto total estimado.`;

    try {
      const response = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system:   getPlannerSystemPrompt(currentLang),
          messages: [{ role: 'user', content: userPrompt }]
        })
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

      // Al iniciar el tipado progresivo de la respuesta del planificador
      // También activamos la animación de habla de la pupusa
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

      // Detener animación al terminar
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
          a.rel = 'noopener noreferrer';
          a.textContent = TRANSLATABLE_TEXTS[currentLang].mapLinkText.replace('{name}', lm.nombre);
          mapWrap.appendChild(a);
        });
        div.appendChild(mapWrap);
        gsap.to(mapWrap, { opacity: 1, y: 0, duration: 0.3 });
        msgs.scrollTop = msgs.scrollHeight;
      }

      plannerStep = null;
      setPlannerToggle(false);
      setInputEnabled(true, TRANSLATABLE_TEXTS[currentLang].inputPlaceholder);
      addBotMessage(TRANSLATABLE_TEXTS[currentLang].plannerSuccess);

    } catch (err) {
      hideTyping();
      addBotMessage(TRANSLATABLE_TEXTS[currentLang].errGeneric);
      console.error('Planner error:', err);
      plannerStep = null;
      setPlannerToggle(false);
      setInputEnabled(true, TRANSLATABLE_TEXTS[currentLang].inputPlaceholder);
    }
  }

  function sendMessage() {
    const input = document.getElementById('rs-chat-input');
    if (!input) return;
    const text = input.value.trim();
    if (!text || isLoading) return;

    // Animación de click en el botón enviar
    gsap.fromTo("#rs-chat-send", { scale: 0.8 }, { scale: 1, duration: 0.2, ease: "back.out(3)" });

    if (plannerMode && plannerStep) {
      input.value = '';
      addUserMessage(text);
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

  async function sendUserText(text) {
    if (isLoading) return;
    const sendBtn = document.getElementById('rs-chat-send');
    const msgs = document.getElementById('rs-chat-messages');
    isLoading = true;
    if (sendBtn) sendBtn.disabled = true;

    addUserMessage(text);
    conversationHistory.push({ role: 'user', content: text });
  
    if (conversationHistory.length > 4) {
      conversationHistory = conversationHistory.slice(-4);
      if (conversationHistory.length > 0 && conversationHistory[0].role === 'assistant') {
        conversationHistory.shift();
      }
    }
    
    // Muestra indicador "escribiendo..." y ACTIVA animación de pupusa
    showTyping();

    try {
      const response = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system:   getSystemPrompt(currentLang),
          messages: conversationHistory
        })
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);
      
      // Oculta indicador "escribiendo..."
      // Nota: hideTyping() DESACTIVA la animación de la pupusa,
      // pero la volveremos a activar manualmente para el tipeado progresivo a continuación.
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

      // ACTIVA animación de pupusa mientras se tipea el texto progresivamente
      const avatar = document.getElementById('rs-bot-avatar');
      if (avatar) avatar.classList.add('talking');

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        for (let i = 0; i < chunk.length; i++) {
          replyText += chunk[i];
          bubble.innerHTML = formatMessageText(replyText);
          msgs.scrollTop = msgs.scrollHeight;
          await sleep(18); // Simulación de tipeado
        }
      }

      // DESACTIVA animación al terminar de tipear el mensaje
      if (avatar) avatar.classList.remove('talking');

      conversationHistory.push({ role: 'assistant', content: replyText });
      
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
          a.rel = 'noopener noreferrer';
          a.textContent = TRANSLATABLE_TEXTS[currentLang].mapLinkText.replace('{name}', lm.nombre);
          mapWrap.appendChild(a);
        });
        div.appendChild(mapWrap);
        gsap.to(mapWrap, { opacity: 1, y: 0, duration: 0.3 });
        msgs.scrollTop = msgs.scrollHeight;
      }

    } catch (err) {
      // En caso de error, asegurarnos de apagar la animación
      const avatar = document.getElementById('rs-bot-avatar');
      if (avatar) avatar.classList.remove('talking');
      hideTyping();
      addBotMessage(TRANSLATABLE_TEXTS[currentLang].errGeneric);
      console.error('Chatbot error:', err);
    }

    isLoading = false;
    if (sendBtn) sendBtn.disabled = false;
    document.getElementById('rs-chat-input')?.focus();
  }

  // Carga asíncrona segura de GSAP antes de inicializar la interfaz
  loadGSAP(() => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  });

})();