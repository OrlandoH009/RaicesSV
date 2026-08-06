/* ============================================================
   Salvadorean Roots — i18n.js
   Librería ligera de traducción ES / EN
   ============================================================
   Uso:
   1) Incluir este script en cada página (antes de </body>, junto
      a los demás scripts).
   2) Marcar los textos a traducir con el atributo data-i18n="clave".
      - Para texto interno:      <h1 data-i18n="home.title">...</h1>
      - Para atributos (placeholder, alt, title, aria-label):
        data-i18n-attr="attr1:clave1,attr2:clave2"
        Ejemplo: <img data-i18n-attr="alt:home.logoAlt" ...>
   3) Agregar el botón de idioma en el navbar/drawer con
      id="langToggle" (ver ejemplo en index.html).
   4) Todas las claves nuevas de cada página se agregan al objeto
      TRANSLATIONS de abajo, dentro de "es" y "en".
   ============================================================ */

(function () {
  "use strict";

  const STORAGE_KEY = "sr_lang";
  const DEFAULT_LANG = "es";

  /* ── Diccionario central ──
     Agrega aquí las claves de cada página nueva. */
  const TRANSLATIONS = {
    es: {
      "meta.title": "Salvadorean Roots — Inicio",
      "meta.description": "Salvadorean Roots — Descubre la esencia de El Salvador.",

      "nav.inicio": "Inicio",
      "nav.categorias": "Categorías",
      "nav.mapa": "Mapa",
      "nav.calendario": "Calendario",
      "nav.menu": "Menú",
      "nav.principal": "Principal",
      "nav.explorar": "Explorar",
      "nav.miCuenta": "Mi cuenta",
      "nav.iniciarSesion": "Iniciar Sesión",
      "nav.registrarse": "Registrarse",
      "nav.abrirMenu": "Abrir menú",
      "nav.cerrarMenu": "Cerrar menú",
      "nav.recetario": "Recetario",
      "nav.quiz": "Quiz Cultural",
      "nav.cerrar": "Cerrar",
      "nav.principales": "Principales",
      "nav.publicaciones": "Publicaciones",
      "nav.juegos": "Juegos Interactivos",
      "nav.invitado": "Invitado",
      "nav.iniciarSesionCaption": "Iniciar sesión",
      "nav.verPerfil": "Ver mi perfil",
      "nav.conectado": "Conectado",
      "nav.miPerfil": "Mi perfil",
      "nav.cerrarSesion": "Cerrar sesión",

      "hero.title": "Bienvenid@ a Salvadorean Roots",
      "hero.subtitle": "Nuestra herencia, nuestro orgullo.",
      "hero.cta": "Explorar Culturas",
      "hero.scroll": "Desliza",

      "home.logoAlt": "Logo Salvadorean Roots",

      "about.title": "¿Qué es Salvadorean Roots?",
      "about.text": "Salvadorean Roots es un espacio digital que conecta a las personas con la escencia de El Salvador, permitiéndoles descubrir, aprender y compartir su cultura a través de una experiencia interactiva.",

      "stats.categorias": "Categorías culturales",
      "stats.departamentos": "Departamentos representados",
      "stats.anios": "Años de historia",
      "stats.leyendas": "Leyendas y tradiciones",

      "fact.eyebrow": "¿Sabías que...?",
      "fact.text1": "El Salvador es conocido como \"Pulgarcito de América\" por su tamaño territorial.",

      "badge.title": "Información para ti",

      "cards.sitios": "Sitios Culturales",
      "cards.gastronomia": "Gastronomía",
      "cards.eventos": "Eventos Culturales",
      "cards.historia": "Historia",
      "cards.leyendas": "Leyendas",
      "cards.explorar": "Explorar",

      "footer.copy": "© 2026 Salvadorean Roots — Nuestra herencia, nuestro orgullo.",
      "footer.juegos": "Juegos",

      "lang.switchTo": "EN",
      "lang.label": "Idioma",

      /* ── Página: Juegos Interactivos ── */
      "jue.meta.title": "Salvadorean Roots — Juegos Interactivos",
      "jue.meta.description": "Salvadorean Roots — Poné a prueba tus reflejos y destreza con juegos inspirados en la cultura salvadoreña.",

      "jue.hero.eyebrow": "Aprender jugando",
      "jue.hero.title": "Juegos Interactivos",
      "jue.hero.subtitle": "Poné a prueba tus reflejos y destreza con juegos inspirados en la cultura salvadoreña.",
      "jue.footnote": "Juegos de la cultura salvadoreña — ¡Desafía tus habilidades!",

      "jue.modal.close": "Cerrar juego",
      "jue.card.play": "⚡ Jugar Ahora",

      "jue.pause.tag": "Pausa",
      "jue.pause.title": "Juego en pausa",
      "jue.pause.resume": "Reanudar",
      "jue.pause.menu": "Menú",

      "jue.card1.tag": "Ruta 01 — Reflejos",
      "jue.card1.tagModal": "Ruta 01",
      "jue.card1.title": "Atrapa la Pupusa",
      "jue.card1.desc": "Mové el comal rápidamente y atrapá las pupusas calientes antes de que caigan al suelo. ¡Cuidado con las chanclas y los obstáculos!",
      "jue.card1.pauseText": "Presioná reanudar para volver a atrapar pupusas.",

      "jue.card2.tag": "Ruta 02 — Estrategia",
      "jue.card2.tagModal": "Ruta 02",
      "jue.card2.title": "Batalla de Trompos",
      "jue.card2.desc": "Prepárate para el choque de tu vida. Controla la física de tu trompo de madera y saca a tu rival de la pista en un duelo dinámico.",
      "jue.card2.pauseTitle": "Batalla en pausa",
      "jue.card2.pauseText": "Presioná reanudar para continuar la batalla o vuelve a configurar.",

      "jue.card3.tag": "Ruta 03 — Adrenalina",
      "jue.card3.tagModal": "Ruta 03 — Adrenalina",
      "jue.card3.title": "Guerra de Coasters",
      "jue.card3.titleModal": "Guerra de Coasters: ¡Pelea por el Pasaje!",
      "jue.card3.desc": "Pilotea tu bus, recoge pasajeros en el camino y gánale el \"mandado\" al bot rival en una carrera frenética por las calles de San Salvador. ¡Cuidado con los baches!",
      "jue.card3.pauseTitle": "Carrera en Pausa",
      "jue.card3.pauseText": "¡No dejes que la competencia te gane el pasaje! Presiona reanudar.",

      "jue.card4.tag": "Ruta 04 — Memoria",
      "jue.card4.tagModal": "Ruta 04 — Memoria",
      "jue.card4.title": "Escondelero",
      "jue.card4.desc": "Vos sos el que la trae. Tus amigos se van a escapar corriendo hacia el bote en cualquier momento: movete rápido por el patio e interceptalos antes de que lleguen y se salven. ¡No dejes que se te escapen muchos!",
      "jue.card4.pauseText": "Presioná reanudar para seguir buscando a tus amigos.",

      "jue.card5.tag": "Ruta 05 — Recreo",
      "jue.card5.tagModal": "Ruta 05 — Recreo",
      "jue.card5.title": "Elotes y Olé",
      "jue.card5.desc": "Corré por el patio de la escuela recogiendo elotes locos, mangos y minutas, mientras esquivás los pupitres y las pelotas perdidas del recreo. ¡Sumá combos y no perdás el ritmo!",
      "jue.card5.pauseTitle": "Recreo en pausa",
      "jue.card5.pauseText": "Presioná reanudar para seguir la carrera de sabores.",

      /* ── Juegos: pantallas dinámicas generadas por juegos.js ── */
      "jue.card1.diff.easyDesc": "Caída lenta, ritmo tranquilo",
      "jue.card1.diff.hardDesc": "Caída más rápida y seguida",
      "jue.card1.diff.sub": "Elegí qué tan rápido caen las pupusas y los demás ingredientes.",
      "jue.card1.diff.title": "🎮 Selecciona Nivel",
      "jue.card1.end.high": "🏆 ¡Sos toda una maestra pupusera de El Salvador!",
      "jue.card1.end.low": "👍 Buen intento, ¡seguí practicando para no quemar las pupusas!",
      "jue.card1.end.mid": "🌟 Excelente, ya casi cocinás como las expertas de Olocuilta.",
      "jue.card1.intro": "Mové el comal de un lado a otro con el mouse (o el dedo) para atrapar lo que cae del cielo.",
      "jue.card1.ruleBad": "Evitá <strong>🩴 chanclas</strong>, <strong>🪨 piedras</strong> y <strong>🦴 huesos</strong> — te quitan una vida.",
      "jue.card1.ruleGood": "Atrapá <strong>🫓 pupusas</strong>, <strong>🧀 quesillo</strong> y <strong>🌽 elotes</strong> — suman puntos.",
      "jue.card2.bestOf3": "Best of 3",
      "jue.card2.bestOf5": "Best of 5",
      "jue.card2.chooseDiffTag": "Elige Dificultad",
      "jue.card2.configTag": "Configuración",
      "jue.card2.controlsP1": "Jugador 1: teclas <strong>WASD</strong> para mover el trompo.",
      "jue.card2.controlsP2": "Jugador 2 (o NPC): teclas de <strong>flechas</strong> ⬅️⬆️➡️⬇️.",
      "jue.card2.diff.easyDesc": "NPC lento y predecible",
      "jue.card2.diff.hardDesc": "NPC experto (Modo Imposible)",
      "jue.card2.diff.medDesc": "NPC rápido y certero",
      "jue.card2.diff.sub": "Elige el nivel de agilidad que tendrá la IA.",
      "jue.card2.diff.title": "🎮 Selecciona tu Desafío",
      "jue.card2.end.loseNpc": "🔴 El NPC salvadoreño te ha ganado ({r} - {p})",
      "jue.card2.end.losePvp": "🔴 ¡Jugador 2 gana el duelo! ({r} - {p})",
      "jue.card2.end.rematch": "¿Listo para una revancha?",
      "jue.card2.end.tag": "Fin de la Batalla",
      "jue.card2.end.win": "🟢 ¡Felicidades! Has ganado el duelo ({p} - {r})",
      "jue.card2.intro": "Empujá tu trompo contra el de tu oponente para sacarlo del círculo. El primero en caer o salirse pierde la ronda.",
      "jue.card2.mode.pve": "🤖 vs NPC",
      "jue.card2.mode.pveDesc": "Enfrenta la IA de práctica",
      "jue.card2.mode.pvp": "👥 2 Jugadores",
      "jue.card2.mode.pvpDesc": "Compite localmente",
      "jue.card2.mode.sub": "¿Cómo quieres jugar?",
      "jue.card2.nextRound": "Siguiente Ronda",
      "jue.card2.npcEasy": "🟢 NPC - Fácil",
      "jue.card2.npcHard": "🔴 NPC - Experto",
      "jue.card2.npcMedium": "🟡 NPC - Normal",
      "jue.card2.p1Short": "J1",
      "jue.card2.player1": "🟢 Jugador 1",
      "jue.card2.player2": "🔴 Jugador 2",
      "jue.card2.prepareBattle": "Preparar Batalla",
      "jue.card2.rivalShort": "Riv",
      "jue.card2.rivalShort2": "Rival",
      "jue.card2.rivalTag": "🔴 Rival",
      "jue.card2.round1": "1 Ronda",
      "jue.card2.roundEndTag": "Fin de Ronda",
      "jue.card2.roundEndTitle": "Ronda {n} finalizada",
      "jue.card2.rounds.sub": "El primero en ganar la mitad más uno de las rondas seleccionadas se lleva la victoria.",
      "jue.card2.rounds.title": "🏁 ¿A cuántas rondas jugamos?",
      "jue.card2.scoreLabel": "Marcador",
      "jue.card2.selectModeTag": "Selecciona Modo",
      "jue.card2.titleModal": "Batalla de Trompos SV",
      "jue.card2.winnerLabel": "Ganador",
      "jue.card3.controlsAccel": "<strong>W</strong> o flecha arriba: acelerar. <strong>S</strong> o flecha abajo: frenar.",
      "jue.card3.controlsLane": "<strong>A</strong>/<strong>D</strong> o flechas ⬅️➡️: cambiar de carril.",
      "jue.card3.diff.easy": "🟢 Tranquilo",
      "jue.card3.diff.easyDesc": "Va despacio",
      "jue.card3.diff.hard": "🔴 Hora Pico",
      "jue.card3.diff.hardDesc": "Maneja a lo loco",
      "jue.card3.diff.medDesc": "Busca rebasarte",
      "jue.card3.diff.medium": "🟡 Apurado",
      "jue.card3.diff.sub": "Ajusta el nivel del motorista oponente.",
      "jue.card3.diff.title": "🚦 ¿Qué tan veloz es tu rival?",
      "jue.card3.distCoast": "Costa a Costa (5000m)",
      "jue.card3.distExpress": "Express (1000m)",
      "jue.card3.distNormal": "Normal (2500m)",
      "jue.card3.distance.sub": "¿Qué tan largo será el trayecto?",
      "jue.card3.distance.title": "🏁 Elige la Distancia",
      "jue.card3.end.loseMsg": "La 101-D llegó primero esta vez. ¡Cuidado con los baches en la próxima!",
      "jue.card3.end.loseTitle": "🏁 Te ganaron el pasaje...",
      "jue.card3.end.tag": "Fin de la Carrera",
      "jue.card3.end.winMsg": "¡La Ruta 44 llegó primero! Recogiste a <b>{n}</b> pasajeros en el camino.",
      "jue.card3.end.winTitle": "🏆 ¡VICTORIA TOTAL!",
      "jue.card3.intro": "Manejá tu bus para llegar antes que la Ruta 101-D. Esquivá baches y recogé pasajeros en el camino.",
      "jue.card3.prepareMotorTag": "Preparar Motor",
      "jue.card3.routeBot": "🚍 Ruta 101-D (Bot)",
      "jue.card3.routePlayer": "🚌 Ruta 44 (Tú)",
      "jue.card3.titleModal2": "Guerra de Coasters SV",
      "jue.card4.baseLabel": "¡BOTE!",
      "jue.card4.caught": "Atrapados",
      "jue.card4.diff.easyDesc": "Atrapá 6 amigos, corren despacio",
      "jue.card4.diff.hardDesc": "Atrapá 10 amigos, casi no hay respiro",
      "jue.card4.diff.medDesc": "Atrapá 8 amigos, corren más seguido",
      "jue.card4.diff.sub": "Más difícil significa que corren más rápido al bote y tenés menos escapes permitidos.",
      "jue.card4.diff.title": "🏃 ¿Qué tan rápidos son tus amigos?",
      "jue.card4.end.caughtOf": "Atrapaste {c} de {t} amigos.",
      "jue.card4.end.high": "🌟 Sos el mejor \"trayendola\" del barrio, nadie se te escapa.",
      "jue.card4.end.low": "Seguí practicando tus reflejos para la próxima ronda de encantados.",
      "jue.card4.end.mid": "👍 Buena persecución, ¡ya casi los atrapás a todos!",
      "jue.card4.end.tag": "Fin del Juego",
      "jue.card4.end.timeUp": "⏰ ¡Se acabó el tiempo!",
      "jue.card4.end.tooMany": "🏁 ¡Se te escaparon demasiados!",
      "jue.card4.end.win": "🏆 ¡Los atrapaste a todos antes del bote!",
      "jue.card4.escaped": "Se salvaron",
      "jue.card4.intro": "Vos sos \"el que la trae\". Tus amigos están escondidos por todo el patio y de repente van a salir corriendo hacia el bote para salvarse. Movete con las teclas <strong>WASD</strong> o las <strong>flechas</strong> del teclado e interceptalos antes de que lleguen.",
      "jue.card4.ruleBad": "Si un amigo llega al bote, se salva y perdés puntos. Si se te escapan demasiados, perdés la partida.",
      "jue.card4.ruleGood": "Tocá a los amigos que van corriendo antes de que lleguen al bote — cada atrapada suma puntos.",
      "jue.card5.diff.easyDesc": "Recreo tranquilo",
      "jue.card5.diff.hardDesc": "Recreo a toda velocidad",
      "jue.card5.diff.sub": "¿Qué tan movido va a estar el recreo hoy?",
      "jue.card5.diff.title": "Selecciona Nivel",
      "jue.card5.end.high": "🏆 ¡Sos el campeón del recreo, nadie te gana un elote!",
      "jue.card5.end.low": "👍 Buen intento, ¡seguí practicando para el próximo recreo!",
      "jue.card5.end.mid": "🌟 ¡Buen ritmo! Ya casi te comés todo el recreo.",
      "jue.card5.end.title": "¡Sonó la campana!",
      "jue.card5.intro": "Movete entre los 3 carriles del patio con las teclas <strong>A</strong>/<strong>D</strong>, las flechas ⬅️➡️, o tocando a los lados de la pantalla en el celular. Recogé lo rico del recreo y esquivá lo que te estorba.",
      "jue.card5.ruleBad": "Evitá <strong>🪑 pupitres</strong>, <strong>⚽ pelotas perdidas</strong> y <strong>🧹 la escoba del conserje</strong> — te quitan una vida y el combo.",
      "jue.card5.ruleGood": "Recogé <strong>🌽 elotes locos</strong>, <strong>🥭 mangos</strong>, <strong>🍧 minutas</strong> y <strong>🍬 dulces</strong> — suman puntos y combo.",
      "jue.continue": "Continuar",
      "jue.controls.title": "Controles",
      "jue.diff.chooseTag": "Elegí tu dificultad",
      "jue.diff.easy": "🟢 Fácil",
      "jue.diff.easyTag": "🟢 Nivel Fácil",
      "jue.diff.hard": "🔴 Difícil",
      "jue.diff.hardTag": "🔴 Nivel Difícil",
      "jue.diff.medium": "🟡 Normal",
      "jue.diff.tag": "Dificultad",
      "jue.end.playAgain": "Jugar de nuevo",
      "jue.end.playAgain2": "Volver a Jugar",
      "jue.end.title": "¡Fin del juego!",
      "jue.hud.combo": "Combo",
      "jue.hud.level": "Nivel",
      "jue.hud.lives": "Vidas",
      "jue.hud.passengers": "Pasajeros",
      "jue.hud.points": "Puntos",
      "jue.hud.round": "Ronda",
      "jue.hud.time": "Tiempo",
      "jue.next": "Siguiente",
      "jue.rematch": "Revancha",
      "jue.rules.title": "Reglas del juego",

      /* ── Página: Eventos Culturales ── */
      "evp.welcome.eyebrow": "Salvadorean Roots — Eventos Culturales",
      "evp.welcome.title": "Fiesta y Tradición",
      "evp.welcome.sub": "Un calendario vivo de celebraciones que laten en el corazón salvadoreño durante todo el año",
      "evp.welcome.stat1": "Celebraciones",
      "evp.welcome.stat2": "Meses del año",
      "evp.welcome.stat3": "Municipios que celebran",
      "evp.welcome.factLabel": "¿Sabías qué?",
      "evp.welcome.cta": "Ver celebraciones →",
      "evp.welcome.hint": "o presiona <kbd>Esc</kbd> para saltar",
      "evp.fact.0": "Las Fiestas Agostinas reúnen a miles de personas cada agosto en honor al Divino Salvador del Mundo.",
      "evp.fact.1": "Durante Semana Santa se elaboran alfombras de aserrín que pueden tardar días en completarse.",
      "evp.fact.2": "La Calabiuza de Tonacatepeque recrea leyendas salvadoreñas con máscaras y desfiles nocturnos.",
      "evp.fact.3": "El Día de los Farolitos ilumina las calles de Ciudad Barrios con miles de faroles hechos a mano.",
      "evp.fact.4": "El Festival del Añil en Suchitoto celebra el tinte que dio fama internacional a El Salvador.",
      "evp.tabsLabel": "¿Qué evento quieres conocer? (15 celebraciones de El Salvador, 2026)",
      "evp.tabsPrev": "Anterior",
      "evp.tabsNext": "Siguiente",
      "evp.verMapa": "Ver en mapa",
      "evp.verPublicaciones": "Ver publicaciones",
      "evp.revisarCalendario": "Revisar el calendario",

      "ev.agostinas.title": "Fiestas Agostinas",
      "ev.agostinas.sub": "1–6 de Agosto de 2026 — Las fiestas más grandes del país",
      "ev.agostinas.chip1": "1–6 agosto 2026",
      "ev.agostinas.chip2": "San Salvador y todo el país",
      "ev.agostinas.chip3": "Procesiones, feria y cultura",
      "ev.agostinas.p1": "Las Fiestas Agostinas son las celebraciones patronales de San Salvador y una de las festividades más importantes de El Salvador. Se realizan cada año del 1 al 6 de agosto en honor al Divino Salvador del Mundo, patrono de la capital y de la República, reuniendo a miles de salvadoreños y visitantes nacionales e internacionales.",
      "ev.agostinas.p2": "El acto central de las fiestas es la tradicional Transfiguración del Divino Salvador del Mundo, celebrada el 5 de agosto frente a la Catedral Metropolitana. Esta ceremonia religiosa representa la transformación de Jesucristo en el Monte Tabor y constituye uno de los momentos más solemnes y esperados de toda la festividad, acompañado por procesiones, misas y actividades de fe.",
      "ev.agostinas.p3": "Además de las celebraciones religiosas, las Fiestas Agostinas ofrecen conciertos, espectáculos culturales, desfiles, presentaciones artísticas, juegos mecánicos y una amplia feria popular. En el Parque de Diversiones SívarLand y sus alrededores los visitantes disfrutan de atracciones, artesanías y una gran variedad de gastronomía típica salvadoreña, como pupusas, elotes locos, riguas, yuca frita, tamales y dulces tradicionales.",
      "ev.agostinas.p4": "Durante esta semana también se desarrollan eventos deportivos, actividades recreativas y expresiones culturales que fortalecen la identidad nacional. Las Fiestas Agostinas representan una combinación de fe, tradición, cultura y convivencia familiar, consolidándose como una de las celebraciones más emblemáticas y representativas de El Salvador.",

      "ev.semanaSanta.title": "Semana Santa",
      "ev.semanaSanta.sub": "29 de Marzo – 5 de Abril de 2026 — Fe y tradición en cada calle",
      "ev.semanaSanta.chip1": "29 marzo–5 abril 2026",
      "ev.semanaSanta.chip2": "Procesiones",
      "ev.semanaSanta.chip3": "Alfombras de aserrín",
      "ev.semanaSanta.p1": "La Semana Santa es una de las celebraciones religiosas y culturales más importantes de El Salvador. Durante estos días, miles de fieles participan en procesiones, misas y representaciones de la Pasión, Muerte y Resurrección de Jesucristo, manteniendo vivas tradiciones que se han transmitido de generación en generación.",
      "ev.semanaSanta.p2": "Una de las manifestaciones más representativas es la elaboración de alfombras artesanales hechas con aserrín teñido, flores, sal, frutas y otros materiales naturales. Estas coloridas obras de arte adornan las calles por donde pasan las procesiones y son especialmente reconocidas en municipios como Nahuizalco, Sonsonate, Izalco, Panchimalco y otros lugares del país.",
      "ev.semanaSanta.p3": "Las procesiones del Domingo de Ramos, Jueves Santo, Viernes Santo y Domingo de Resurrección reúnen a miles de personas que acompañan las imágenes religiosas entre cantos, incienso y música sacra. Paralelamente, muchas familias aprovechan el período vacacional para visitar playas, montañas y pueblos turísticos, convirtiendo la Semana Santa en una época de fe, descanso y convivencia familiar.",
      "ev.semanaSanta.p4": "Durante esta temporada también es tradición disfrutar de la gastronomía típica de Cuaresma, con platillos como pescado, torrejas, riguas, jocotes en miel, mangos en miel y otros dulces artesanales. La Semana Santa representa una oportunidad para fortalecer la fe, preservar las costumbres religiosas y valorar el patrimonio cultural que distingue a El Salvador.",

      "ev.independencia.title": "Día de la Independencia",
      "ev.independencia.tabTitle": "Independencia",
      "ev.independencia.sub": "15 de Septiembre de 2026 — Orgullo nacional",
      "ev.independencia.chip1": "15 de septiembre 2026",
      "ev.independencia.chip2": "Desfiles escolares",
      "ev.independencia.chip3": "Antorcha de la Libertad",
      "ev.independencia.p1": "El 15 de septiembre es una de las fechas cívicas más importantes de El Salvador, ya que conmemora la Independencia de Centroamérica, proclamada en 1821. En todo el país se realizan actos patrióticos que fortalecen el sentido de identidad nacional y recuerdan la historia compartida de las naciones centroamericanas.",
      "ev.independencia.p2": "Una de las tradiciones más representativas es el recorrido de la Antorcha Centroamericana de la Libertad, símbolo de la independencia y la unión regional. La llama recorre los países centroamericanos en relevos organizados por estudiantes, deportistas e instituciones, llegando a El Salvador como parte de las celebraciones patrias.",
      "ev.independencia.p3": "Las calles de ciudades y municipios se llenan de color con desfiles estudiantiles, bandas de paz, cachiporristas, palillonas, batallones cívicos y presentaciones artísticas. Miles de personas se reúnen para disfrutar de los actos cívicos mientras los edificios públicos, escuelas y hogares se decoran con la bandera nacional y otros símbolos patrios.",
      "ev.independencia.p4": "Durante esta fecha también se realizan ceremonias oficiales, izadas de bandera, interpretaciones del Himno Nacional y actividades culturales que resaltan la historia, los valores cívicos y el orgullo de ser salvadoreño. Esta celebración fortalece el respeto por la patria y transmite a las nuevas generaciones la importancia de preservar la identidad nacional.",

      "ev.diaMuertos.title": "Día de los Difuntos",
      "ev.diaMuertos.sub": "1 y 2 de Noviembre de 2026 — Recordando a los que se fueron",
      "ev.diaMuertos.chip1": "1–2 noviembre 2026",
      "ev.diaMuertos.chip2": "Cementerios",
      "ev.diaMuertos.chip3": "Ofrendas florales",
      "ev.diaMuertos.p1": "El Día de Todos los Santos, celebrado el 1 de noviembre, y el Día de los Difuntos, el 2 de noviembre, son fechas de gran significado para las familias salvadoreñas. Durante estos días es tradición visitar los cementerios para recordar a los seres queridos, limpiar y decorar sus tumbas con flores naturales, coronas, velas y arreglos especiales.",
      "ev.diaMuertos.p2": "En numerosos municipios del país también se celebran misas, oraciones y actos religiosos en honor a los fallecidos. Los cementerios se llenan de familias que comparten momentos de recuerdo y reflexión, creando un ambiente de respeto, unión y esperanza donde la memoria de los seres queridos permanece viva.",
      "ev.diaMuertos.p3": "Muchas familias aprovechan la ocasión para reunirse y compartir alimentos tradicionales después de la visita al cementerio. Además, en algunos lugares se organizan actividades culturales, presentaciones musicales y expresiones artísticas relacionadas con las tradiciones populares, fortaleciendo el sentido de comunidad y el respeto por las costumbres salvadoreñas.",
      "ev.diaMuertos.p4": "Esta conmemoración representa uno de los momentos más importantes del calendario religioso y cultural de El Salvador, ya que promueve la conservación de las tradiciones familiares, el homenaje a quienes ya partieron y la transmisión de estos valores a las nuevas generaciones.",

      "ev.navidad.title": "Navidad y Posadas",
      "ev.navidad.sub": "Diciembre de 2026 — La época más mágica del año",
      "ev.navidad.chip1": "16–24 diciembre 2026",
      "ev.navidad.chip2": "Posadas y nacimientos",
      "ev.navidad.chip3": "Tamales navideños",
      "ev.navidad.p1": "La Navidad en El Salvador es una de las celebraciones familiares y religiosas más importantes del año. Desde los primeros días de diciembre, hogares, iglesias y comunidades se adornan con luces, árboles, nacimientos y otros elementos que crean un ambiente lleno de alegría, unión y esperanza.",
      "ev.navidad.p2": "Entre el 16 y el 24 de diciembre se celebran las tradicionales posadas, que representan el recorrido de José y María en busca de un lugar donde hospedarse antes del nacimiento de Jesús. Durante estas reuniones se rezan novenas, se cantan villancicos, se realizan procesiones con imágenes religiosas y se comparten alimentos típicos entre vecinos y familiares.",
      "ev.navidad.p3": "La Nochebuena, el 24 de diciembre, es el momento más esperado de la celebración. Las familias se reúnen para compartir una cena especial en la que destacan los tamales de gallina, pavo, panes con pollo, ponche de frutas, chocolate caliente y una gran variedad de dulces tradicionales. A la medianoche es común el encendido de fuegos artificiales y los abrazos para celebrar el nacimiento del Niño Jesús.",
      "ev.navidad.p4": "Durante toda la temporada también se organizan conciertos navideños, festivales, ferias, actividades comunitarias y representaciones del nacimiento de Jesús. Estas tradiciones fortalecen la convivencia familiar, la fe y la identidad cultural salvadoreña, convirtiendo la Navidad en una de las épocas más esperadas y significativas del país.",

      "ev.fiestasJulias.title": "Fiestas Julias de Santa Ana",
      "ev.fiestasJulias.sub": "26 de Julio de 2026 — La Ciudad Heroica en fiesta",
      "ev.fiestasJulias.chip1": "26 de julio 2026",
      "ev.fiestasJulias.chip2": "Santa Ana",
      "ev.fiestasJulias.chip3": "Fiesta patronal",
      "ev.fiestasJulias.p1": "Las Fiestas Julias son las celebraciones patronales de la ciudad de Santa Ana y se realizan en honor a Nuestra Señora Santa Ana, patrona del municipio. Durante varios días, la Ciudad Heroica se llena de actividades religiosas, culturales y recreativas que reúnen a miles de visitantes provenientes de todo el país.",
      "ev.fiestasJulias.p2": "Entre las actividades más destacadas se encuentran las solemnes procesiones, misas, desfiles del correo, carrozas alegóricas, elección y coronación de la reina de las fiestas, conciertos, juegos mecánicos y presentaciones artísticas. Además, el campo de la feria ofrece espacios para el entretenimiento familiar, mientras que los parques y plazas albergan exposiciones artesanales y una variada muestra de gastronomía típica salvadoreña.",
      "ev.fiestasJulias.p3": "Las Fiestas Julias también permiten apreciar el importante patrimonio arquitectónico de Santa Ana, como su imponente Catedral de estilo neogótico, el Teatro Nacional de Santa Ana y el Palacio Municipal, edificios que se convierten en el escenario de diversas actividades culturales durante la celebración.",
      "ev.fiestasJulias.p4": "Consideradas una de las fiestas patronales más importantes de El Salvador, las Fiestas Julias fortalecen la identidad cultural de los santanecos, impulsan el turismo y contribuyen al desarrollo económico de la ciudad mediante el comercio, la gastronomía y las expresiones artísticas tradicionales.",

      "ev.carnavalSm.title": "Gran Carnaval de San Miguel",
      "ev.carnavalSm.sub": "Último sábado de noviembre — El carnaval más grande de Centroamérica",
      "ev.carnavalSm.chip1": "28 de noviembre 2026",
      "ev.carnavalSm.chip2": "San Miguel",
      "ev.carnavalSm.chip3": "Orquestas en vivo",
      "ev.carnavalSm.p1": "El Gran Carnaval de San Miguel es la celebración más importante de las fiestas patronales dedicadas a Nuestra Señora de la Paz, patrona de la ciudad. Considerado el carnaval más grande de Centroamérica, reúne cada año a cientos de miles de personas que disfrutan de una noche llena de música, baile y tradición en las principales calles de San Miguel.",
      "ev.carnavalSm.p2": "Durante el carnaval, decenas de orquestas nacionales e internacionales, grupos musicales, DJs y artistas de distintos géneros se presentan en múltiples escenarios distribuidos por toda la ciudad. Además, comparsas, carrozas alegóricas, bandas de paz, espectáculos de luces y desfiles llenan las calles de color y alegría, convirtiendo el evento en una de las mayores expresiones culturales del país.",
      "ev.carnavalSm.p3": "La celebración también destaca por su variada oferta gastronómica, donde los visitantes pueden degustar pupusas, yuca frita con chicharrón, elotes locos, riguas, atol de elote, minutas y muchas otras comidas típicas. Artesanos y emprendedores aprovechan la ocasión para exhibir y comercializar productos elaborados en diferentes regiones de El Salvador.",
      "ev.carnavalSm.p4": "El Gran Carnaval de San Miguel representa un importante impulso para el turismo y la economía local, atrayendo visitantes nacionales y extranjeros. Más allá de la fiesta, simboliza la identidad, hospitalidad y espíritu alegre del pueblo migueleño, consolidándose como uno de los eventos culturales más emblemáticos de El Salvador.",

      "ev.maizSuchitoto.title": "Festival del Maíz de Suchitoto",
      "ev.maizSuchitoto.sub": "Agosto — Tradición, gastronomía y cultura salvadoreña",
      "ev.maizSuchitoto.chip1": "Festival Gastronómico",
      "ev.maizSuchitoto.chip2": "Suchitoto, Cuscatlán",
      "ev.maizSuchitoto.chip3": "Tradición Salvadoreña",
      "ev.maizSuchitoto.p1": "El <strong>Festival del Maíz de Suchitoto</strong> es una de las celebraciones gastronómicas y culturales más representativas del municipio. Cada año reúne a cientos de visitantes nacionales y extranjeros para rendir homenaje al maíz, considerado desde tiempos ancestrales el alimento base de la identidad y la cultura mesoamericana.",
      "ev.maizSuchitoto.p2": "Durante el festival, las calles y plazas del centro histórico se llenan de color con ventas de comidas típicas elaboradas a base de maíz. Los asistentes pueden degustar una gran variedad de platillos tradicionales como pupusas, riguas, atol de elote, tamales, ticucos, elotes locos, enchiladas, torrejas, atol shuco, chilate y muchas otras recetas que forman parte del patrimonio culinario salvadoreño.",
      "ev.maizSuchitoto.p3": "Además de la oferta gastronómica, el evento incluye presentaciones artísticas, música en vivo, bailes folclóricos, grupos de danza, artesanías locales, actividades para toda la familia, concursos de cocina tradicional y espacios donde productores y emprendedores exhiben productos derivados del maíz y otros alimentos elaborados en la zona.",
      "ev.maizSuchitoto.p4": "El festival también busca preservar las tradiciones agrícolas y fortalecer la economía local, brindando una oportunidad para que artesanos, agricultores y pequeños comerciantes compartan con los visitantes la riqueza cultural de Suchitoto, uno de los pueblos con mayor valor histórico y turístico de El Salvador.",

      "ev.calabiuza.title": "Día de la Calabiuza",
      "ev.calabiuza.sub": "1 de Noviembre de 2026 — Las leyendas cobran vida",
      "ev.calabiuza.chip1": "1 de noviembre 2026",
      "ev.calabiuza.chip2": "Tonacatepeque, San Salvador",
      "ev.calabiuza.chip3": "Desfile nocturno",
      "ev.calabiuza.p1": "El Día de la Calabiuza es una de las celebraciones más emblemáticas del folclore salvadoreño. Cada 1 de noviembre las calles de Tonacatepeque se llenan de personajes inspirados en las leyendas nacionales, como la Siguanaba, el Cadejo, el Cipitío, la Carreta Chillona y otros seres tradicionales que desfilan entre música, antorchas y coloridos disfraces.",
      "ev.calabiuza.p2": "La festividad nació como una iniciativa para rescatar las leyendas populares y las costumbres relacionadas con el Día de los Difuntos. Su nombre proviene de la \"calabiuza\", una calabaza tallada e iluminada con velas que antiguamente los niños utilizaban para recorrer las calles pidiendo ayote en miel y otras golosinas tradicionales.",
      "ev.calabiuza.p3": "Durante la celebración también se realizan presentaciones artísticas, música en vivo, teatro, venta de artesanías y una amplia muestra de gastronomía típica salvadoreña. Miles de visitantes nacionales y extranjeros participan cada año, convirtiendo este evento en uno de los festivales culturales más importantes de El Salvador y en un espacio para preservar la identidad y las tradiciones del país.",

      "ev.farolitos.title": "Día de los Farolitos",
      "ev.farolitos.sub": "7 de Septiembre de 2026 — Ataco se ilumina",
      "ev.farolitos.chip1": "7 de septiembre 2026",
      "ev.farolitos.chip2": "Concepción de Ataco, Ahuachapán Centro",
      "ev.farolitos.chip3": "Faroles artesanales",
      "ev.farolitos.p1": "El Día de los Farolitos es una de las tradiciones más representativas de El Salvador y se celebra cada 7 de septiembre en honor al nacimiento de la Virgen María. Concepción de Ataco, uno de los pueblos más emblemáticos de la Ruta de las Flores, se convierte en el escenario principal de esta festividad al iluminar sus calles con miles de faroles artesanales.",
      "ev.farolitos.p2": "Familias enteras, comercios, escuelas y comunidades elaboran faroles de papel de colores, madera y otros materiales, decorándolos con figuras tradicionales, flores y símbolos religiosos. Al caer la noche, los faroles son encendidos al mismo tiempo, creando un ambiente lleno de luz, color y un profundo significado espiritual y cultural.",
      "ev.farolitos.p3": "Además del espectáculo de luces, la celebración incluye desfiles, presentaciones de música y danza folclórica, actividades religiosas, exposiciones de artesanías y una variada oferta de gastronomía típica salvadoreña. Entre los platillos más populares destacan las pupusas, elotes locos, riguas, atol de elote y dulces tradicionales elaborados por emprendedores locales.",
      "ev.farolitos.p4": "Con el paso de los años, el Día de los Farolitos se ha convertido en uno de los eventos turísticos más importantes del país, atrayendo a miles de visitantes nacionales y extranjeros que buscan conocer una tradición que refleja la fe, la creatividad y la identidad cultural de los salvadoreños.",

      "ev.festivalAnil.title": "Festival del Añil",
      "ev.festivalAnil.sub": "4 de Octubre de 2026 — El oro azul de Suchitoto",
      "ev.festivalAnil.chip1": "4 de octubre 2026",
      "ev.festivalAnil.chip2": "Suchitoto, Cuscatlán",
      "ev.festivalAnil.chip3": "Teñido artesanal",
      "ev.festivalAnil.p1": "El Festival del Añil, celebrado en Suchitoto, rinde homenaje al \"oro azul\", el añil que durante los siglos XVII, XVIII y XIX fue uno de los principales productos de exportación de El Salvador y un pilar fundamental de su economía. Esta celebración busca preservar la historia y promover el conocimiento sobre una tradición que marcó el desarrollo del país.",
      "ev.festivalAnil.p2": "Durante el festival, artesanos y especialistas realizan demostraciones del proceso tradicional de extracción y teñido con añil, desde la fermentación de la planta hasta la obtención del característico pigmento azul. Los visitantes también pueden participar en talleres donde elaboran pañuelos, camisetas y otras piezas teñidas de forma artesanal.",
      "ev.festivalAnil.p3": "El evento incluye exposiciones de textiles, artesanías, recorridos por antiguos obrajes de añil, conferencias históricas y presentaciones artísticas que muestran la importancia cultural de este cultivo. Además, emprendedores locales ofrecen productos elaborados con tintes naturales y diversas creaciones inspiradas en el patrimonio añilero de Suchitoto.",
      "ev.festivalAnil.p4": "La celebración se complementa con música en vivo, danza folclórica, gastronomía típica salvadoreña y actividades familiares, convirtiéndose en una experiencia que une historia, arte, turismo y tradición. Gracias a este festival, Suchitoto continúa preservando el legado del añil y promoviendo una de las expresiones culturales más representativas de El Salvador.",

      "ev.festivalBarro.title": "Festival del Barro",
      "ev.festivalBarro.sub": "8 de Noviembre de 2026 — La tradición alfarera de Ilobasco",
      "ev.festivalBarro.chip1": "8 de noviembre 2026",
      "ev.festivalBarro.chip2": "Ilobasco, Cabañas",
      "ev.festivalBarro.chip3": "Miniaturas de barro",
      "ev.festivalBarro.p1": "El Festival del Barro es una de las celebraciones artesanales más importantes de Ilobasco y rinde homenaje a los maestros alfareros que, durante generaciones, han preservado el arte de trabajar el barro. Este municipio es reconocido dentro y fuera de El Salvador por la elaboración de las famosas miniaturas conocidas como \"sorpresas\", piezas que esconden pequeñas escenas de la vida cotidiana en su interior.",
      "ev.festivalBarro.p2": "Durante el festival, los visitantes pueden recorrer talleres familiares donde observan cada etapa del proceso artesanal, desde la preparación del barro y el moldeado de las figuras hasta el secado, la cocción en hornos tradicionales de leña y la pintura realizada completamente a mano. Muchos artesanos también ofrecen talleres para que niños y adultos experimenten esta técnica ancestral.",
      "ev.festivalBarro.p3": "La celebración incluye concursos de alfarería, exposiciones de piezas tradicionales y contemporáneas, ferias de artesanías, música en vivo, danzas folclóricas y una amplia muestra de gastronomía típica salvadoreña. Además, representa una importante oportunidad para que los artesanos comercialicen directamente sus creaciones y promuevan el patrimonio cultural de Ilobasco.",
      "ev.festivalBarro.p4": "Gracias a la calidad y originalidad de sus obras, la alfarería de Ilobasco se ha convertido en uno de los símbolos más representativos de la artesanía salvadoreña. El Festival del Barro contribuye a preservar este legado, fortalecer la economía local y acercar a las nuevas generaciones a una tradición que forma parte de la identidad cultural de El Salvador.",

      "ev.floresPalmas.title": "Festival de las Flores y Palmas",
      "ev.floresPalmas.sub": "10 de Mayo de 2026 — El inicio de la época lluviosa",
      "ev.floresPalmas.chip1": "10 de mayo 2026",
      "ev.floresPalmas.chip2": "Panchimalco, San Salvador",
      "ev.floresPalmas.chip3": "Procesión de las Palmas",
      "ev.floresPalmas.p1": "El Festival de las Flores y Palmas es una de las tradiciones más antiguas y representativas de Panchimalco. Cada año reúne a cientos de habitantes y visitantes para celebrar una festividad que combina la fe católica con las costumbres indígenas heredadas del pueblo nahua-pipil, convirtiéndose en una expresión única del patrimonio cultural salvadoreño.",
      "ev.floresPalmas.p2": "La tradicional Procesión de las Palmas recorre las principales calles del municipio hasta llegar a la histórica iglesia colonial de Santa Cruz de Roma. Los participantes portan palmas decoradas con flores silvestres, hojas, frutos y coloridos adornos elaborados artesanalmente, como símbolo de agradecimiento por las cosechas y de esperanza por el inicio de la temporada lluviosa.",
      "ev.floresPalmas.p3": "Durante la celebración también se realizan presentaciones de danza folclórica, música tradicional, ceremonias religiosas, exposiciones de artesanías y una feria gastronómica donde los visitantes pueden degustar platillos típicos salvadoreños preparados por los habitantes del municipio. Estas actividades fortalecen el turismo y permiten conservar las tradiciones que han caracterizado a Panchimalco durante generaciones.",
      "ev.floresPalmas.p4": "Gracias a su riqueza cultural e histórica, este festival es considerado una de las manifestaciones más importantes de la identidad indígena de El Salvador. La combinación de elementos religiosos, costumbres ancestrales y participación comunitaria convierte a esta celebración en una experiencia que refleja la diversidad y el legado cultural del país.",

      "ev.chicharron.title": "Festival Internacional del Chicharrón",
      "ev.chicharron.sub": "12 de Diciembre de 2026 — Sabor y tradición en Santa Tecla",
      "ev.chicharron.chip1": "12 de diciembre 2026",
      "ev.chicharron.chip2": "Santa Tecla, La Libertad",
      "ev.chicharron.chip3": "Feria gastronómica",
      "ev.chicharron.p1": "El Festival Internacional del Chicharrón es uno de los eventos gastronómicos más populares de Santa Tecla y reúne cada año a miles de visitantes para celebrar uno de los platillos más representativos de la cocina salvadoreña. El festival busca promover la gastronomía nacional, fortalecer el turismo y apoyar a emprendedores y restaurantes locales.",
      "ev.chicharron.p2": "Durante la celebración, cocineros y comerciantes presentan una gran variedad de platillos preparados con chicharrón, desde la receta tradicional hasta innovadoras propuestas acompañadas de yuca frita, pupusas, tacos, hamburguesas, nachos y otros platillos típicos. Los asistentes también pueden degustar bebidas tradicionales y postres elaborados por productores nacionales.",
      "ev.chicharron.p3": "Además de la feria gastronómica, el evento ofrece música en vivo, presentaciones artísticas, espectáculos culturales, actividades infantiles, concursos culinarios y espacios dedicados al emprendimiento local. Estas actividades convierten al festival en un ambiente familiar que atrae tanto a turistas nacionales como extranjeros.",
      "ev.chicharron.p4": "Con el paso de los años, el Festival Internacional del Chicharrón se ha consolidado como una de las principales celebraciones gastronómicas de El Salvador. Su combinación de tradición, innovación culinaria y entretenimiento fortalece la identidad cultural de Santa Tecla y contribuye al desarrollo económico de la ciudad mediante el turismo y el comercio local.",

      "ev.jocote.title": "Festival del Jocote Corona",
      "ev.jocote.sub": "18 de Octubre de 2026 — El fruto emblemático del Cerro Verde",
      "ev.jocote.chip1": "18 de octubre 2026",
      "ev.jocote.chip2": "Cerro Verde, Santa Ana",
      "ev.jocote.chip3": "Feria gastronómica",
      "ev.jocote.p1": "El Festival del Jocote Corona es una de las celebraciones gastronómicas más representativas de la zona del Cerro Verde y rinde homenaje a esta variedad de jocote, reconocida por su gran tamaño, sabor dulce y excelente calidad. Cada año reúne a productores, emprendedores y visitantes para promover uno de los frutos más emblemáticos del occidente de El Salvador.",
      "ev.jocote.p2": "Durante el festival, los asistentes pueden degustar jocotes frescos y una amplia variedad de productos derivados como jocotes en miel, mermeladas, jaleas, encurtidos, refrescos, postres y otras recetas tradicionales elaboradas por productores locales. También se realizan degustaciones, concursos gastronómicos y exhibiciones sobre el cultivo y la cosecha de esta fruta.",
      "ev.jocote.p3": "La celebración se complementa con presentaciones artísticas, música en vivo, danzas folclóricas, ferias de artesanías y actividades recreativas para toda la familia. Además, ofrece a los visitantes la oportunidad de disfrutar de los paisajes naturales del Parque Nacional Cerro Verde y conocer la riqueza agrícola y turística de la región.",
      "ev.jocote.p4": "El Festival del Jocote Corona fortalece la economía de los pequeños productores, impulsa el turismo interno y contribuye a preservar las tradiciones agrícolas salvadoreñas. Gracias a esta celebración, el jocote corona continúa siendo uno de los productos más representativos de la zona occidental y un símbolo de la riqueza natural y gastronómica de El Salvador.",

      /* ── Página: Gastronomía ── */
      "gap.welcome.eyebrow": "Salvadorean Roots — Gastronomía",
      "gap.welcome.title": "Sabores de El Salvador",
      "gap.welcome.sub": "16 platillos, bebidas y postres que cuentan la historia del país en cada bocado",
      "gap.welcome.stat1": "Platillos",
      "gap.welcome.stat2": "Patrimonio UNESCO",
      "gap.welcome.stat3": "Años de tradición",
      "gap.welcome.factLabel": "¿Sabías qué?",
      "gap.welcome.cta": "Descubrir platillos →",
      "gap.welcome.hint": "o presiona <kbd>Esc</kbd> para saltar",
      "gap.fact.0": "La palabra \"pupusa\" viene del náhuatl <em>pupushawa</em>, que significa \"cosa inflada\".",
      "gap.fact.1": "Cada segundo domingo de noviembre se celebra el Día Nacional de la Pupusa.",
      "gap.fact.2": "Los tamales salvadoreños se envuelven en hoja de plátano, no de maíz.",
      "gap.fact.3": "El chilate conserva técnicas de tueste prehispánicas que aún se usan hoy.",
      "gap.fact.4": "La pupusa fue declarada Patrimonio Cultural Inmaterial por la UNESCO.",
      "gap.tabsLabel": "¿Qué platillo quieres conocer?",
      "gap.verReceta": "Ver la receta",

      "gas.pupusas.title": "Pupusas",
      "gas.pupusas.sub": "El plato nacional de El Salvador",
      "gas.pupusas.chip1": "Masa de maíz o arroz",
      "gas.pupusas.chip2": "Relleno variado",
      "gas.pupusas.chip3": "Con curtido y salsa",
      "gas.pupusas.chip4": "Patrimonio Cultural UNESCO",
      "gas.pupusas.h1": "El orgullo gastronómico",
      "gas.pupusas.p1": "La pupusa es el plato nacional de El Salvador y uno de los alimentos más emblemáticos de la gastronomía centroamericana. Esta tortilla gruesa de masa de maíz o arroz con relleno fue declarada Patrimonio Cultural Intangible por la UNESCO. Cada segundo domingo de noviembre se celebra el Día Nacional de la Pupusa.",
      "gas.pupusas.p2": "Sus orígenes se remontan a la cultura Pipil, quienes elaboraban estas tortillas rellenas mucho antes de la llegada de los españoles. La palabra \"pupusa\" proviene del náhuatl <em>pupushawa</em>, que significa \"cosa inflada o abultada\".",
      "gas.pupusas.h2": "Tipos de pupusas",
      "gas.pupusas.p3": "Las pupusas más tradicionales son: de queso (el relleno clásico), de chicharrón (carne de cerdo molida con especias), de frijoles refritos, y la revuelta (combinación de queso, chicharrón y frijoles). También existen variaciones modernas con loroco, jalapeño, mariscos y vegetales.",
      "gas.pupusas.p4": "La pupusa de arroz tiene una textura más suave y es especialmente popular en la zona central del país. Se sirven siempre acompañadas de curtido (repollo encurtido) y salsa de tomate casera.",
      "gas.pupusas.h3": "Cómo se hacen",
      "gas.pupusas.p5": "La elaboración requiere maestría: se toma una porción de masa, se forma una bola, se aplana en la palma, se coloca el relleno en el centro y se cierra sellando los bordes. Luego se aplana en forma circular y se cocina en un comal a fuego medio-alto durante aproximadamente 3 minutos por lado.",

      "gas.tamales.title": "Tamales",
      "gas.tamales.sub": "Tradición festiva salvadoreña",
      "gas.tamales.chip1": "Masa de maíz",
      "gas.tamales.chip2": "Envueltos en hoja",
      "gas.tamales.chip3": "Navidad y fiestas",
      "gas.tamales.chip4": "Tradición familiar",
      "gas.tamales.h1": "El tamal salvadoreño",
      "gas.tamales.p1": "Los tamales salvadoreños son diferentes a los de otros países centroamericanos. Se envuelven en hojas de plátano (no en hojas de maíz) lo que les da un sabor y aroma característico. La masa se prepara con maíz cocido en cal (nixtamal), y el relleno tradicional incluye carne de cerdo o pollo con chile, aceitunas, alcaparras y papas.",
      "gas.tamales.p2": "La preparación de tamales es un ritual familiar que generalmente involucra a toda la familia. Las abuelas transmiten sus recetas secretas de generación en generación, haciendo que cada familia tenga sus propios tamales únicos.",
      "gas.tamales.h2": "Tipos de tamales",
      "gas.tamales.p3": "El tamal de elote es una variante dulce hecha con maíz tierno, azúcar, mantequilla y a veces relleno de crema. Se consume especialmente en agosto durante las fiestas agostinas. También existe el tamal pisque, relleno solo de frijoles, y el tamal de chipilín, que incluye esta hierba aromática en la masa.",
      "gas.tamales.h3": "Temporada navideña",
      "gas.tamales.p4": "La elaboración de tamales alcanza su punto máximo durante la Navidad. Es tradición que las familias se reúnan días antes del 24 de diciembre para elaborar los tamales que se compartirán en la cena navideña. Esta práctica comunitaria llamada \"tamalada\" es un símbolo de unión familiar.",

      "gas.sopa.title": "Sopa de Pata",
      "gas.sopa.sub": "El sabor más auténtico de El Salvador",
      "gas.sopa.chip1": "Pata de res",
      "gas.sopa.chip2": "Con verduras tropicales",
      "gas.sopa.chip3": "Caldo reconfortante",
      "gas.sopa.chip4": "Plato de tradición",
      "gas.sopa.h1": "El caldo más salvadoreño",
      "gas.sopa.p1": "La sopa de pata es considerada uno de los platos más representativos y auténticos de la cocina salvadoreña. Se prepara con patas de res (pezuñas y rodillas) cocinadas durante horas hasta obtener un caldo gelatinoso y rico en colágeno, al que se añaden verduras como güisquil, elote, yuca, plátano verde y chipilín.",
      "gas.sopa.p2": "Su preparación es laboriosa y requiere horas de cocción lenta. El resultado es un caldo espeso, reconfortante y nutritivo que los salvadoreños consumen especialmente los fines de semana o en ocasiones especiales.",
      "gas.sopa.h2": "Ingredientes típicos",
      "gas.sopa.p3": "Además de la pata de res, la sopa lleva: maíz tierno en trozos, yuca, plátano verde, güisquil (chayote), ejotes (judías verdes), chipilín (hierba local aromática), tomate, cebolla, ajo y culantro (cilantro). Se sazona con achiote para darle el color rojizo característico.",
      "gas.sopa.h3": "Dónde probarla",
      "gas.sopa.p4": "La sopa de pata se puede encontrar en los mercados municipales de todo el país, especialmente los domingos en la mañana. En San Salvador, el Mercado Central y el Mercado de Artesanías son buenos lugares para probar versiones auténticas preparadas por cocineras tradicionales.",

      "gas.yuca.title": "Yuca Frita con Chicharrón",
      "gas.yuca.tabTitle": "Yuca Frita",
      "gas.yuca.sub": "El antojo más popular de las calles salvadoreñas",
      "gas.yuca.chip1": "Frita o hervida",
      "gas.yuca.chip2": "Con chicharrón",
      "gas.yuca.chip3": "Con curtido",
      "gas.yuca.chip4": "Comida callejera",
      "gas.yuca.h1": "La yuca en la cultura salvadoreña",
      "gas.yuca.p1": "La yuca (mandioca) es un tubérculo de origen americano que los pueblos indígenas de El Salvador cultivaban desde antes de la colonización. En El Salvador se consume principalmente frita o hervida, acompañada de chicharrón (cerdo frito crujiente), curtido de repollo y salsa de tomate.",
      "gas.yuca.p2": "Es uno de los antojos más comunes en las ferias, mercados y puestos callejeros del país. Su textura cremosa por dentro y crujiente por fuera, combinada con el sabor del chicharrón, la convierten en una combinación irresistible.",
      "gas.yuca.h2": "Preparación tradicional",
      "gas.yuca.p3": "La yuca se pela, se corta en trozos y se hierve en agua con sal hasta que esté tierna. Luego se fríe en aceite caliente hasta dorar. El chicharrón se prepara friendo trozos de carne de cerdo con grasa en su jugo hasta que queden dorados y crujientes.",
      "gas.yuca.h3": "Variaciones",
      "gas.yuca.p4": "También existe la yuca en caldillo, preparada en un caldo de tomate y hierbas. En algunas regiones del país se acompaña con pepián (salsa de semillas de calabaza), que añade un sabor más complejo y terroso al plato.",

      "gas.atol.title": "Atol de Elote",
      "gas.atol.sub": "La bebida ancestral de los pueblos originarios",
      "gas.atol.chip1": "Maíz tierno",
      "gas.atol.chip2": "Leche y azúcar",
      "gas.atol.chip3": "Bebida caliente",
      "gas.atol.chip4": "Origen prehispánico",
      "gas.atol.h1": "Bebida ancestral",
      "gas.atol.p1": "El atol de elote es una bebida caliente espesa de origen prehispánico, elaborada con maíz tierno (elote) molido, leche, azúcar y canela. Su nombre viene del náhuatl <em>atolli</em>, que significa \"aguado\" o \"bebida de maíz\". Es una de las bebidas más antiguas y arraigadas en la cultura salvadoreña.",
      "gas.atol.p2": "Históricamente fue un alimento fundamental para los pueblos indígenas mesoamericanos, quienes lo consumían tanto en la vida cotidiana como en ceremonias religiosas y rituales.",
      "gas.atol.h2": "Tipos de atol",
      "gas.atol.p3": "El atol shuco es una variante fermentada, elaborada con maíz negro molido, frijoles y agua. Tiene un sabor ácido característico y es especialmente popular en la zona occidental del país. También existe el atol de piña, de tamarindo y el chuco de semilla de ayote, cada uno con su propia personalidad de sabor.",
      "gas.atol.h3": "Dónde tomarlo",
      "gas.atol.p4": "El atol de elote se encuentra en los mercados municipales, pupuserías y puestos callejeros de todo el país. Es particularmente popular en las mañanas frías y durante las fiestas patronales. En muchos hogares se prepara los domingos como parte del desayuno familiar.",

      "gas.semita.title": "Semita",
      "gas.semita.sub": "El pan más famoso de El Salvador",
      "gas.semita.chip1": "Pan artesanal",
      "gas.semita.chip2": "Relleno de piña o mora",
      "gas.semita.chip3": "Tradición de Cojutepeque",
      "gas.semita.chip4": "Ideal con café",
      "gas.semita.h1": "El pan de la identidad",
      "gas.semita.p1": "La semita papalona es un pan dulce artesanal originario de Cojutepeque, Cuscatlán, y se ha convertido en uno de los dulces más representativos de la panadería salvadoreña. Es un pan de masa blanda relleno de mermelada de piña o mora, cubierto con una capa crujiente de azúcar caramelizada.",
      "gas.semita.p2": "Su nombre viene de la mezcla de \"semita\" (pan dulce de origen árabe introducido por los españoles) y \"papalona\" (término local que hace referencia a su forma abultada y esponjosa).",
      "gas.semita.h2": "Tradición panadera",
      "gas.semita.p3": "La elaboración de semitas es un arte que se transmite de generación en generación en Cojutepeque. Las panaderías familiares del municipio producen este pan de manera artesanal usando horno de leña, lo que le da un sabor y textura únicos que no se pueden replicar con hornos modernos.",
      "gas.semita.p4": "Es costumbre que los viajeros que pasan por la carretera Panamericana a la altura de Cojutepeque se detengan a comprar semitas para llevar de regalo a familiares y amigos.",
      "gas.semita.h3": "Pan en la cultura",
      "gas.semita.p5": "El Salvador tiene una rica tradición panadera influenciada por la cultura española y árabe. El pan francés (birote) es el acompañante inseparable del café salvadoreño, y la gran variedad de panes dulces artesanales forma parte esencial de las fiestas patronales y celebraciones familiares de todo el país.",

      "gas.gallinaIndia.title": "Sopa de Gallina India",
      "gas.gallinaIndia.tabTitle": "Gallina India",
      "gas.gallinaIndia.sub": "El caldo dominical de las familias salvadoreñas",
      "gas.gallinaIndia.chip1": "Gallina criolla",
      "gas.gallinaIndia.chip2": "Caldo dorado con achiote",
      "gas.gallinaIndia.chip3": "Papa, güisquil y elote",
      "gas.gallinaIndia.chip4": "Plato de domingo",
      "gas.gallinaIndia.h1": "Un caldo de raíces campesinas",
      "gas.gallinaIndia.p1": "La sopa de gallina india se prepara con gallinas criollas de patio, más magras y sabrosas que el pollo de granja. Su caldo se cocina lentamente con verduras de la milpa, logrando un sabor profundo característico de la cocina rural salvadoreña.",
      "gas.gallinaIndia.h2": "Ingredientes de la milpa",
      "gas.gallinaIndia.p2": "Papa, güisquil y elote tierno son la base vegetal, sazonados con achiote para el color dorado y hierbabuena fresca al final para el aroma. Se sirve acompañada de arroz blanco y tortillas recién hechas.",
      "gas.gallinaIndia.h3": "Tradición dominical",
      "gas.gallinaIndia.p3": "Es común que las familias salvadoreñas preparen este plato los domingos, reuniendo a varias generaciones alrededor de la mesa para disfrutar de un almuerzo largo y compartido.",

      "gas.panesConPollo.title": "Panes con Pollo",
      "gas.panesConPollo.sub": "El sándwich festivo de las celebraciones salvadoreñas",
      "gas.panesConPollo.chip1": "Pollo en recado rojo",
      "gas.panesConPollo.chip2": "Pan francés (birote)",
      "gas.panesConPollo.chip3": "Verduras encurtidas",
      "gas.panesConPollo.chip4": "Fiestas y cumpleaños",
      "gas.panesConPollo.h1": "El sándwich de las fiestas",
      "gas.panesConPollo.p1": "Los panes con pollo son protagonistas indiscutibles de cumpleaños, bodas y celebraciones familiares en El Salvador. El pollo se cocina en un recado rojo aromático a base de achiote, tomate y especias, luego se desmenuza y se coloca en pan francés untado con mostaza y mayonesa.",
      "gas.panesConPollo.h2": "El toque encurtido",
      "gas.panesConPollo.p2": "Se corona con vegetales encurtidos como rábano, repollo y chile, además de hojas de hierbabuena que aportan frescura. Cada familia guarda su propia receta de recado, transmitida de generación en generación.",
      "gas.panesConPollo.h3": "Presencia en toda ocasión especial",
      "gas.panesConPollo.p3": "Es habitual encontrar mesas repletas de panes con pollo en celebraciones grandes, ya que se preparan en cantidad y se sirven como plato principal para invitados de todas las edades.",

      "gas.riguas.title": "Riguas",
      "gas.riguas.sub": "Tortitas de elote envueltas en su propia hoja",
      "gas.riguas.chip1": "Elote tierno molido",
      "gas.riguas.chip2": "Envueltas en tusa",
      "gas.riguas.chip3": "Dulces o saladas",
      "gas.riguas.chip4": "Antojo de comal",
      "gas.riguas.h1": "Un antojo sencillo y ancestral",
      "gas.riguas.p1": "Las riguas son pequeñas tortitas hechas de elote tierno molido, envueltas en la propia hoja del elote (tusa) y cocinadas sobre comal. Su preparación evoca las técnicas de cocina mesoamericana de aprovechar cada parte de la planta de maíz.",
      "gas.riguas.h2": "Versiones dulces y saladas",
      "gas.riguas.p2": "Se pueden preparar dulces, con un poco de azúcar y mantequilla, o saladas, añadiendo queso rallado a la masa. Ambas versiones se disfrutan recién salidas del comal, calientes y con un ligero aroma a hoja tostada.",
      "gas.riguas.h3": "Comida de mercados y ferias",
      "gas.riguas.p3": "Son comunes en mercados municipales y ferias patronales, donde se venden como antojito rápido y económico, perfecto para acompañar un café o un atol.",

      "gas.empanadasPlatano.title": "Empanadas de Plátano",
      "gas.empanadasPlatano.sub": "Dulce callejero con corazón de plátano maduro",
      "gas.empanadasPlatano.chip1": "Plátano maduro",
      "gas.empanadasPlatano.chip2": "Relleno de frijol dulce",
      "gas.empanadasPlatano.chip3": "Fritas y crujientes",
      "gas.empanadasPlatano.chip4": "Postre callejero",
      "gas.empanadasPlatano.h1": "Dulzura envuelta en plátano",
      "gas.empanadasPlatano.p1": "Las empanadas de plátano se elaboran con puré de plátano maduro que envuelve un relleno de frijoles refritos dulces o leche condensada. Se fríen hasta dorar y se espolvorean con azúcar y canela.",
      "gas.empanadasPlatano.h2": "Contraste de sabores",
      "gas.empanadasPlatano.p2": "El contraste entre la dulzura del plátano y el relleno cremoso las convierte en un postre muy popular, vendido en las calles y mercados, especialmente por las tardes como merienda.",
      "gas.empanadasPlatano.h3": "Una receta de aprovechamiento",
      "gas.empanadasPlatano.p3": "Su origen está ligado a la costumbre de aprovechar plátanos muy maduros, transformándolos en un dulce sencillo pero muy apreciado en los hogares salvadoreños.",

      "gas.mariscada.title": "Mariscada",
      "gas.mariscada.sub": "El sabor del Pacífico salvadoreño en un solo plato",
      "gas.mariscada.chip1": "Camarones y pescado",
      "gas.mariscada.chip2": "Leche de coco",
      "gas.mariscada.chip3": "Sabor costero",
      "gas.mariscada.chip4": "Zonas de playa",
      "gas.mariscada.h1": "Tesoro de la costa",
      "gas.mariscada.p1": "La mariscada es un guiso abundante de mariscos variados —camarones, pescado, pulpo y calamar— cocinados en un caldo cremoso de leche de coco, tomate y chile dulce. Es un plato típico de las zonas costeras de El Salvador, como La Libertad y la costa del Bálsamo.",
      "gas.mariscada.h2": "Sabor tropical",
      "gas.mariscada.p2": "La leche de coco aporta una textura suave y un sabor tropical que combina perfectamente con el frescor de los mariscos recién pescados. Se sirve acompañada de yuca o plátano verde.",
      "gas.mariscada.h3": "Plato de fin de semana en la playa",
      "gas.mariscada.p3": "Es habitual disfrutarla los fines de semana en restaurantes de playa, donde se prepara con mariscos del día, siendo uno de los platos más solicitados por turistas y locales.",

      "gas.casamiento.title": "Casamiento",
      "gas.casamiento.sub": "La unión perfecta entre el arroz y el frijol",
      "gas.casamiento.chip1": "Arroz y frijol",
      "gas.casamiento.chip2": "Desayuno típico",
      "gas.casamiento.chip3": "Económico y nutritivo",
      "gas.casamiento.chip4": "Plato de diario",
      "gas.casamiento.h1": "El nombre de la unión",
      "gas.casamiento.p1": "El casamiento debe su nombre a la combinación de arroz y frijoles sofritos juntos, una \"unión\" de dos ingredientes básicos de la dieta salvadoreña. Es un plato sencillo, económico y muy nutritivo, presente en la mesa de casi todos los hogares.",
      "gas.casamiento.h2": "Versátil en cualquier comida",
      "gas.casamiento.p2": "Se disfruta en el desayuno acompañado de huevos revueltos, plátano frito y queso, o en el almuerzo y la cena junto a una proteína como carne o pollo. Es un acompañamiento tan versátil como reconfortante.",
      "gas.casamiento.h3": "Presente en toda Centroamérica",
      "gas.casamiento.p3": "Platos similares existen en otros países bajo distintos nombres, pero en El Salvador el casamiento conserva su sazón particular gracias al sofrito de cebolla, ajo y chile verde.",

      "gas.enchiladas.title": "Enchiladas Salvadoreñas",
      "gas.enchiladas.tabTitle": "Enchiladas",
      "gas.enchiladas.sub": "Nada que ver con las enchiladas mexicanas",
      "gas.enchiladas.chip1": "Tortilla crujiente",
      "gas.enchiladas.chip2": "Carne molida y curtido",
      "gas.enchiladas.chip3": "Remolacha y huevo duro",
      "gas.enchiladas.chip4": "Antojo de feria",
      "gas.enchiladas.h1": "Una versión muy distinta",
      "gas.enchiladas.p1": "A diferencia de las enchiladas mexicanas, las salvadoreñas son tortillas de maíz fritas hasta quedar crujientes, cubiertas con carne molida sazonada, curtido de repollo, salsa de tomate, remolacha y huevo duro picado.",
      "gas.enchiladas.h2": "Capas de sabor y textura",
      "gas.enchiladas.p2": "El contraste entre la base crujiente y los ingredientes frescos las convierte en un antojo muy popular en ferias patronales y puestos callejeros de todo el país.",
      "gas.enchiladas.h3": "Comida para compartir en familia",
      "gas.enchiladas.p3": "Suelen prepararse en grandes cantidades para reuniones familiares, ya que cada quien arma su propia enchilada al gusto, añadiendo más o menos curtido y salsa.",

      "gas.nuegadosYuca.title": "Nuégados de Yuca",
      "gas.nuegadosYuca.sub": "Bolitas doradas bañadas en miel de panela",
      "gas.nuegadosYuca.chip1": "Yuca rallada",
      "gas.nuegadosYuca.chip2": "Miel de panela",
      "gas.nuegadosYuca.chip3": "Fritos y crujientes",
      "gas.nuegadosYuca.chip4": "Postre de mercado",
      "gas.nuegadosYuca.h1": "Dulce tradicional de yuca",
      "gas.nuegadosYuca.p1": "Los nuégados de yuca son pequeñas bolitas fritas hechas de yuca rallada, bañadas generosamente en miel de dulce de panela con canela. Su textura crujiente por fuera y suave por dentro los hace irresistibles.",
      "gas.nuegadosYuca.h2": "Compañero del chilate",
      "gas.nuegadosYuca.p2": "Tradicionalmente se sirven junto al chilate, una bebida de maíz tostado, formando el dúo dulce más querido de las tardes salvadoreñas.",
      "gas.nuegadosYuca.h3": "Presencia en mercados y fiestas",
      "gas.nuegadosYuca.p3": "Se encuentran fácilmente en mercados municipales y durante fiestas patronales, vendidos por generaciones de familias reposteras que mantienen viva la receta tradicional.",

      "gas.chilate.title": "Chilate con Nuégados",
      "gas.chilate.sub": "La bebida de maíz tostado más querida del país",
      "gas.chilate.chip1": "Maíz tostado",
      "gas.chilate.chip2": "Canela y jengibre",
      "gas.chilate.chip3": "Bebida caliente",
      "gas.chilate.chip4": "Tradición de tarde",
      "gas.chilate.h1": "El maíz tostado como protagonista",
      "gas.chilate.p1": "El chilate es una bebida caliente hecha de maíz blanco tostado y molido, cocinado con agua, canela, clavo de olor y jengibre. Su sabor tostado y ligeramente picante lo distingue de otras bebidas de maíz como el atol.",
      "gas.chilate.h2": "Inseparable de los nuégados",
      "gas.chilate.p2": "Se sirve tradicionalmente acompañado de nuégados de yuca bañados en miel, creando una combinación de sabores tostados y dulces muy apreciada en las tardes frías.",
      "gas.chilate.h3": "Bebida de raíces indígenas",
      "gas.chilate.p3": "Su preparación conserva técnicas prehispánicas de tueste y molienda del maíz, siendo una de las bebidas más antiguas que aún se preparan en los hogares salvadoreños.",

      "gas.torrejas.title": "Torrejas",
      "gas.torrejas.sub": "El dulce infaltable de la Semana Santa salvadoreña",
      "gas.torrejas.chip1": "Pan bañado en huevo",
      "gas.torrejas.chip2": "Miel de panela",
      "gas.torrejas.chip3": "Semana Santa",
      "gas.torrejas.chip4": "Postre familiar",
      "gas.torrejas.h1": "Un dulce de tradición religiosa",
      "gas.torrejas.p1": "Las torrejas son rebanadas de pan francés remojadas en huevo batido, fritas y luego bañadas en miel de panela con canela y clavo de olor. Es uno de los postres más representativos de la Semana Santa en El Salvador.",
      "gas.torrejas.h2": "Aprovechamiento y dulzura",
      "gas.torrejas.p2": "Tradicionalmente se preparan con pan del día anterior, aprovechando su textura firme para absorber mejor el huevo y la miel, dando como resultado un postre húmedo y aromático.",
      "gas.torrejas.h3": "Reunión familiar en Cuaresma",
      "gas.torrejas.p3": "Durante la Cuaresma y Semana Santa, muchas familias salvadoreñas se reúnen para prepararlas junto a otros dulces tradicionales como el ayote en miel, marcando el inicio de las celebraciones religiosas.",

      /* ── Página: Categorías ── */
      "cat.meta.title": "Salvadorean Roots — Categorías",
      "cat.meta.description": "Salvadorean Roots — Elige la categoría de información cultural que deseas explorar.",
      "cat.hero.title": "Explora Nuestras Categorías",
      "cat.hero.subtitle": "Descubre la riqueza cultural de El Salvador a través de nuestras secciones especializadas.",
      "cat.search.placeholder": "Buscar una categoría... (ej. comida, mitos, sitios)",
      "cat.filter.todas": "Todas",
      "cat.filter.patrimonio": "Patrimonio",
      "cat.filter.gastronomia": "Gastronomía",
      "cat.filter.festividades": "Festividades",
      "cat.filter.pasado": "Pasado",
      "cat.filter.mitologia": "Mitología",
      "cat.card.sitios.desc": "Explora los lugares históricos y arqueológicos que definen nuestra identidad.",
      "cat.card.gastronomia.desc": "Saborea los sabores tradicionales que cuentan historias de nuestro pueblo.",
      "cat.card.eventos.desc": "Vive las celebraciones y tradiciones que unen a nuestra comunidad.",
      "cat.card.historia.desc": "Conoce el pasado que ha forjado el presente de El Salvador.",
      "cat.card.leyendas.desc": "Sumérgete en las historias míticas que han sido transmitidas de generación en generación.",
      "cat.emptyState": "No encontramos categorías que coincidan con tu búsqueda.",
      "cat.modal.title": "¡Qué bueno tenerte por aquí! 👋",
      "cat.modal.text": "Puedes seguir explorando las categorías con toda libertad, pero si te registras vas a disfrutar mucho más de todo lo que Salvadorean Roots tiene para ti.",
      "cat.modal.crearCuenta": "Crear mi cuenta",
      "cat.modal.yaTengoCuenta": "Ya tengo cuenta",
      "cat.modal.seguirSinCuenta": "Seguir explorando sin cuenta",

      "nav.sitios": "Sitios Culturales",
      "nav.gastronomia": "Gastronomía",
      "nav.eventos": "Eventos",
      "nav.historia": "Historia",
      "nav.leyendas": "Leyendas",

      /* ── Página: Calendario ── */
      "cal.meta.title": "Calendario de Festividades – Salvadorean Roots",
      "cal.hero.eyebrow": "Descubre El Salvador",
      "cal.hero.title": "Calendario de Festividades",
      "cal.hero.desc": "Fiestas patronales, ferias y celebraciones emblemáticas de los 14 departamentos — organizadas mes a mes para que no pierdas ninguna.",
      "cal.exploreDate": "Explorar por fecha",
      "cal.title": "Calendario",
      "cal.prevYear": "Año anterior",
      "cal.loading": "Cargando…",
      "cal.nextYear": "Año siguiente",
      "cal.days.lun": "Lun",
      "cal.days.mar": "Mar",
      "cal.days.mie": "Mié",
      "cal.days.jue": "Jue",
      "cal.days.vie": "Vie",
      "cal.days.sab": "Sáb",
      "cal.days.dom": "Dom",
      "cal.filter.searchTitle": "Buscar festividades",
      "cal.filter.title": "Filtrar eventos",
      "cal.filter.dept": "Departamento",
      "cal.filter.allDepts": "Todos los departamentos",
      "cal.filter.month": "Mes",
      "cal.filter.allMonths": "Todos los meses",
      "cal.filter.type": "Tipo de evento",
      "cal.filter.allTypes": "Todos los tipos",
      "cal.filter.searchName": "Buscar por nombre",
      "cal.filter.placeholder": "Ej. Semana Santa, San Juan…",
      "cal.filter.apply": "Aplicar filtros",
      "cal.filter.clear": "Limpiar",
      "cal.catalog.label": "Festividades de El Salvador",
      "cal.catalog.title": "Catálogo de celebraciones",
      "cal.catalog.foundText": "festividades encontradas",
      "cal.catalog.loadMore": "Mostrar más celebraciones",
      "cal.view.grid": "Vista grilla",
      "cal.view.list": "Vista lista",
      "cal.modal.defaultTitle": "Nombre del evento",
      "cal.months.ene": "Enero", "cal.months.feb": "Febrero", "cal.months.mar": "Marzo", "cal.months.abr": "Abril",
      "cal.months.may": "Mayo", "cal.months.jun": "Junio", "cal.months.jul": "Julio", "cal.months.ago": "Agosto",
      "cal.months.sep": "Septiembre", "cal.months.oct": "Octubre", "cal.months.nov": "Noviembre", "cal.months.dic": "Diciembre",
      "cal.types.patronal": "Fiesta Patronal", "cal.types.municipal": "Feria Municipal", "cal.types.cultural": "Festival Cultural",
      "cal.types.religiosa": "Celebración Religiosa", "cal.types.nacional": "Festividad Nacional",

      /* ── Página: Mapa ── */
      "map.meta.title": "Salvadorean Roots — Mapa Cultural",
      "map.sidebar.close": "Cerrar información",
      "map.sidebar.desc": "Descripción",
      "map.sidebar.details": "Detalles",
      "map.sidebar.directions": "Cómo llegar",
      "map.sidebar.center": "Centrar",
      "map.backBtn": "Volver",
      "map.filters.toggle": "Ocultar filtros",
      "map.filters.all": "Todos",
      "map.geo.label": "Centrar en mi ubicación",

      // Agrega esto dentro del objeto "es" en tu i18n.js
      "cal": {
        "noEventsToday": "No hay ningún evento cultural para este día",
        "months": {
          "ene": "Enero", "feb": "Febrero", "mar": "Marzo", "abr": "Abril",
          "may": "Mayo", "jun": "Junio", "jul": "Julio", "ago": "Agosto",
          "sep": "Septiembre", "oct": "Octubre", "nov": "Noviembre", "dic": "Diciembre"
        },
        "modal": {
          "dept": "Departamento",
          "date": "Fecha",
          "viewMap": "Ver en mapa interactivo",
          "location": "Ubicación",
          "eventType": "Tipo de Evento",
          "dateCelebration": "Fecha de Celebración",
          "description": "Descripción",
          "exploreMap": "Explorar en Mapa Interactivo",
          "of": "de"
        }
      },
      "ev": {
        "panela": {
          "title": "Feria de la Panela",
          "desc": "Molienda tradicional en Verapaz, donde se elabora dulce de atado, alfeñiques y variedad de derivados de la caña de azúcar."
        },
        "cruz": {
          "title": "Día de la Cruz",
          "desc": "Tradición nacional donde se coloca una cruz de árbol de jiote en los patios, adornada con frutas de estación y cortinas de papel picado."
        },
        "julias": {
          "title": "Fiestas Julias",
          "desc": "La celebración más grande de Occidente en honor a Señora Santa Ana, destacando el desfile del correo, juegos mecánicos y misas solemnes."
        },
        "maiz": {
          "title": "Festival del Maíz",
          "desc": "Celebración en San Juan Opico dedicada a los derivados del maíz: riguas, tamales, atol, chicha y elotes locos."
        },
        "agostinas": {
          "title": "Fiestas Agostinas",
          "desc": "Celebración capitalina en honor al Divino Salvador del Mundo, famosa por la Bajada (transfiguración) frente a la Catedral Metropolitana."
        },
        "jocote": {
          "title": "Festival del Jocote Corona",
          "desc": "Celebración en el Parque Nacional Cerro Verde, promoviendo el consumo y emprendimientos basados en esta fruta exótica de altura."
        },
        "calabaza": {
          "title": "Fiestas de la Calabaza",
          "desc": "En Cojutepeque se preparan ayotes en miel y se realizan desfiles infantiles rescatando personajes de la mitología cuzcatleca."
        },
        "canchules": {
          "title": "Día de los Canchules",
          "desc": "Tradición única en Nahuizalco donde los niños van de casa en casa pidiendo comida preparada para los altares de los difuntos al grito de 'ángeles somos'."
        },
        "difuntos": {
          "title": "Día de los Difuntos",
          "desc": "Fecha de respeto nacional donde las familias visitan los cementerios para enforlar, pintar tumbas y recordar a sus seres queridos."
        },
        "anil": {
          "title": "Festival del Añil",
          "desc": "Celebración en Suchitoto dedicada al 'oro azul', exponiendo técnicas prehispánicas de teñido artesanal e historia colonial."
        },
        "carnaval": {
          "title": "Carnaval de San Miguel",
          "desc": "La fiesta popular más grande de Centroamérica en honor a la Virgen de la Paz, con decenas de orquestas en las calles principales."
        },
        "guadalupe": {
          "title": "Día de la Virgen de Guadalupe",
          "desc": "Peregrinación hacia la Basílica de Guadalupe (La Ceiba) donde los niños son vestidos con trajes tradicionales indígenas en agradecimiento por milagros."
        },
        "canchules_nahu": {
          "title": "Los Canchules de Nahuizalco",
          "desc": "Versión focalizada del altar de muertos en Nahuizalco, donde se exhiben altares en las calles y se comparte comida típica."
        },
        "farolitos": {
          "title": "Día de los Farolitos",
          "desc": "Conmemoración del nacimiento de la Virgen María en Ahuachapán y Concepción de Ataco, iluminando calles y estructuras con miles de faroles artesanales de papel."
        },
        "calabiuza": {
          "title": "La Calabiuza",
          "desc": "Desfile nocturno en Tonacatepeque donde los jóvenes se disfrazan de personajes de la mitología salvadoreña (Ciguanaba, Cipitío) acompañados de carretas chillonas."
        },
        "anil_oct": {
          "title": "Festival del Añil (Octubre)",
          "desc": "Celebración en Suchitoto dedicada al 'oro azul', exponiendo técnicas prehispánicas de teñido artesanal e historia colonial."
        },
        "jocote_2026": {
          "title": "Festival del Jocote Corona 2026",
          "desc": "Feria gastronómica celebrada en el Cerro Verde dedicada a la comercialización y platillos derivados de este icónico fruto."
        },
        "encuentros": {
          "title": "Tradición de los Encuentros",
          "desc": "Centenaria festividad religiosa y cultural donde se encuentran las imágenes de los santos patronos de los pueblos vecinos, acompañada de danzas tradicionales como el Chinchintora."
        },
        "calabiuza_2026": {
          "title": "Día de la Calabiuza 2026",
          "desc": "Desfile tradicional nocturno en Tonacatepeque donde cobran vida los personajes de las leyendas salvadoreñas como la Siguanaba."
        },
        "difuntos_2026": {
          "title": "Día de los Difuntos 2026",
          "desc": "El 1 y 2 de noviembre las familias visitan los cementerios del país para honrar a sus seres queridos con flores y el tradicional fiambre."
        },
        "barro": {
          "title": "Festival del Barro",
          "desc": "Exposición artesanal en Ilobasco que rinde homenaje a los maestros alfareros y sus famosas figuras en miniatura."
        },
        "gotera": {
          "title": "Fiestas Patronales de Gotera",
          "desc": "Eventos dedicados a San Francisco de Asís en San Francisco Gotera, combinando fe, jaripeos populares y danzas de la región."
        },
        "cuisnahuat": {
          "title": "Fiestas de los Historiantes de Cuisnahuat",
          "desc": "Danza tradicional de Moros y Cristianos en honor a San Carlos Borromeo, preservando las raíces ancestrales indígenas."
        },
        "carnaval_2026": {
          "title": "Gran Carnaval de San Miguel 2026",
          "desc": "El carnaval más grande de Centroamérica, celebrado en honor a la Virgen de la Paz con decenas de orquestas en vivo."
        },
        "canchules_cab": {
          "title": "Día de los Canchules (Cabañas)",
          "desc": "Tradición única cada 4 de diciembre donde los habitantes crean altares con frutas y comida típica, repitiendo el dicho popular \"¡Canchul, si no me das, te quiebro el candil!\"."
        },
        "chicharron": {
          "title": "Festival Internacional del Chicharrón",
          "desc": "Feria culinaria de gran afluencia turística en Santa Tecla, centrada en la preparación creativa de platillos a base de cerdo."
        },
        "launion": {
          "title": "Fiestas Patronales de La Unión",
          "desc": "Celebradas en honor a la Inmaculada Concepción con desfiles, carrozas y actividades marítimas en el Golfo de Fonseca."
        },
        "navidad": {
          "title": "Navidad y Posadas",
          "desc": "Del 16 al 24 de diciembre se celebran las posadas en todo el país, culminando en la Nochebuena con cohetes, tamales y ponche."
        },
        "arroz": {
          "title": "Fiestas del Arroz",
          "desc": "Desarrollado en San Esteban Catarina, celebrando el procesamiento y soberanía alimentaria ligada al cultivo de arroz."
        },
        "svicente": {
          "title": "Fiestas Patronales de San Vicente",
          "desc": "Celebraciones patronales dedicadas a San Vicente Abad y Mártir, llenas de actividades culturales bajo la histórica torre."
        }
      
      },
      "Todos": "Todos",
      "Celebración Religiosa": "Celebración Religiosa",
      "Feria Gastronómica": "Feria Gastronómica",
      "Fiesta Patronal": "Fiesta Patronal",
      "Tradición Popular": "Tradición Popular",
      "Conmemoración": "Conmemoración",
      "Festival Cultural": "Festival Cultural",
      "Celebración Tradicional": "Celebración Tradicional",
      "Desfile Tradicional": "Desfile Tradicional",
      "Feria Municipal": "Feria Municipal",
      "Danza Ancestral": "Danza Ancestral",
      "Tradición Oral": "Tradición Oral",
      "Festividad Nacional": "Festividad Nacional",
      "Evento Cultural": "Evento Cultural",
      "Ver en mapa": "Ver en mapa",
      "festividades encontradas": "festividades encontradas",
      "cal.modal.of": "de",
     mapa: {
      puntos: {
        1: { nombre: "Tazumal", lugar: "Chalchuapa, Santa Ana", desc: "Sitio arqueológico maya que alberga la pirámide más alta de El Salvador, testigo del esplendor prehispánico.", chips: ["Arqueología", "Historia", "Cultura"] },
        2: { nombre: "Joya de Cerén", lugar: "San Juan Opico, La Libertad", desc: "Conocida como la Pompeya de América, es una aldea agrícola prehispánica sepultada por una erupción volcánica.", chips: ["Patrimonio UNESCO", "Arqueología"] },
        3: { nombre: "Salvador del Mundo", lugar: "San Salvador", desc: "Monumento icónico de la capital que simboliza la fe y la identidad del pueblo salvadoreño.", chips: ["Monumento", "Plaza Cívica"] },
        4: { nombre: "Suchitoto", lugar: "Cuscatlán", desc: "Pueblo colonial con calles empedradas, iglesias históricas y una vibrante vida cultural frente al Lago de Suchitlán.", chips: ["Colonial", "Arte", "Pueblo Vivo"] },
        5: { nombre: "Catedral Metropolitana", lugar: "Centro Histórico, San Salvador", desc: "El principal templo católico de la capital, lugar de descanso de San Óscar Arnulfo Romero.", chips: ["Religión", "Arquitectura"] },
        6: { nombre: "MUNA", lugar: "San Salvador", desc: "Museo Nacional de Antropología Dr. David J. Guzmán, resguardo de la memoria histórica y piezas prehispánicas.", chips: ["Museo", "Antropología"] },
        7: { nombre: "Ruinas de San Andrés", lugar: "Ciudad Arce, La Libertad", desc: "Antiguo centro ceremonial y político del valle de Zapotitán con estructuras piramidales accesibles.", chips: ["Arqueología", "Cultura Maya"] },
        8: { nombre: "Pupusodromo El Triángulo", lugar: "Olocuilta, La Paz", desc: "Famoso punto gastronómico cuna de las pupusas de arroz, cocinadas tradicionalmente en comal de barro.", chips: ["Comida Típica", "Pupusas", "Tradición"] },
        9: { nombre: "Semitas de Cojutepeque", lugar: "Cojutepeque, Cuscatlán", desc: "Tradición panadera famosa por sus semitas de alta calidad y embutidos locales reconocidos en todo el país.", chips: ["Gastronomía", "Panadería"] },
        10: { nombre: "Mercado Central", lugar: "Centro Histórico, San Salvador", desc: "El epicentro del comercio popular donde se encuentran ingredientes tradicionales e identidad gastronómica urbana.", chips: ["Mercado", "Cultura Popular"] },
        11: { nombre: "Nahuizalco — Mercado Nocturno", lugar: "Nahuizalco, Sonsonate", desc: "Mercado iluminado con velas donde se venden artesanías de mimbre, tule y platillos ancestrales indígenas.", chips: ["Indígena", "Artesanías", "Nocturno"] },
        12: { nombre: "Plaza las Américas", lugar: "San Salvador", desc: "Punto de encuentro para magnas celebraciones populares, desfiles tradicionales y eventos cívicos del país.", chips: ["Eventos", "Cívico"] },
        13: { nombre: "Panchimalco", lugar: "Panchimalco, San Salvador", desc: "Pueblo de raíces prehispánicas famoso por su iglesia colonial y la colorida procesión de las Palmas y Flores.", chips: ["Tradición Anual", "Cultura Viva"] },
        14: { nombre: "Festival de Suchitoto", lugar: "Suchitoto, Cuscatlán", desc: "Festival internacional de arte y cultura que reúne cine, música y teatro en escenarios coloniales históricos.", chips: ["Cultura", "Teatro", "Música"] },
        15: { nombre: "Catedral de Santa Ana", lugar: "Santa Ana", desc: "Majestuosa edificación de estilo neogótico bizantino que enmarca las celebraciones de las Fiestas Julias.", chips: ["Arquitectura", "Religión"] },
        16: { nombre: "Casa de la Cultura de Izalco", lugar: "Izalco, Sonsonate", desc: "Espacio dedicado a la preservación de la memoria histórica de los pueblos originarios y la insurrección de 1932.", chips: ["Memoria", "Indígena"] },
        17: { nombre: "Ex-Casa Presidencial", lugar: "San Jacinto, San Salvador", desc: "Antigua sede del órgano ejecutivo, joya arquitectónica art nouveau que guarda importantes pasajes políticos.", chips: ["Historia", "Arquitectura"] },
        18: { nombre: "Iglesia El Rosario", lugar: "San Salvador", desc: "Joya arquitectónica moderna con un diseño único de vitrales que crea un espectro de luz impresionante.", chips: ["Arquitectura", "Arte Moderno"] },
        19: { nombre: "Lago de Coatepeque", lugar: "Santa Ana", desc: "Hermoso lago de origen volcánico rodeado de mitos sobre el Tabudo, el espíritu protector de sus aguas.", chips: ["Mitos", "Leyendas", "Naturaleza"] },
        20: { nombre: "Bosque El Imposible", lugar: "Ahuachapán", desc: "Parque nacional con una biodiversidad inmensa y senderos mágicos envueltos en antiguas leyendas de aparecidos.", chips: ["Naturaleza", "Misterio"] },
        21: { nombre: "Fiestas Agostinas", lugar: "San Salvador, El Salvador", desc: "Celebraciones patronales en honor al Divino Salvador del Mundo, marcadas por el tradicional desfile del Correo.", chips: ["Tradición", "Feria"] },
        22: { nombre: "Día de los Farolitos", lugar: "Ahuachapán, El Salvador", desc: "Tradición centenaria donde las calles se iluminan con miles de faroles artesanales en honor a la Virgen María.", chips: ["Luces", "Patrimonio"] },
        23: { nombre: "Fiestas Julias", lugar: "Santa Ana, El Salvador", desc: "Celebración en honor a Señora Santa Ana con ferias, carrozas tradicionales y solemnes actividades religiosas.", chips: ["Feria", "Cultura"] },
        24: { nombre: "Fiestas Patronales de San Vicente", lugar: "San Vicente, El Salvador", desc: "Festividad celebrada en honor a San Vicente Abad y Mártir, con desfiles y danzas tradicionales de la región.", chips: ["Tradición", "Pueblo"] },
        25: { nombre: "Festival de las Flores y Palmas", lugar: "La Libertad, El Salvador", desc: "Colorida festividad mariana donde los habitantes decoran palmas con flores de temporada en un hermoso desfile.", chips: ["Flores", "Religión"] },
        26: { nombre: "Gran Carnaval de San Miguel", lugar: "San Miguel, El Salvador", desc: "La fiesta popular más grande de Centroamérica, llena de orquestas, desfiles de carrozas y música en las calles.", chips: ["Carnaval", "Música"] },
        27: { nombre: "Fiestas de los Historiantes", lugar: "Cuisnahuat, Sonsonate", desc: "Danza folclórica ancestral que recrea las batallas históricas entre moros y cristianos con vestuarios coloridos.", chips: ["Danza Tradicional", "Cultura"] },
        28: { nombre: "Festival del Jocote Corona", lugar: "Santa Ana, El Salvador", desc: "Celebración agrícola en el Cerro Verde dedicada a este fruto icónico, ofreciendo innovaciones gastronómicas.", chips: ["Gastronomía", "Frutas"] },
        29: { nombre: "Día de la Calabiuza", lugar: "Cuscatlán, El Salvador", desc: "Tradición en Tonacatepeque donde los jóvenes se disfrazan de personajes de leyendas salvadoreñas pidiendo ayote.", chips: ["Mitos", "Identidad"] },
        30: { nombre: "Día de los Canchules", lugar: "Sensuntepeque, Cabañas", desc: "Tradición única del día de muertos donde se confeccionan altares y se pide comida al grito de '¡Ángeles somos!'", chips: ["Tradición", "Altares"] },
        31: { nombre: "Día de la Cruz", lugar: "San Salvador, El Salvador", desc: "Festividad religiosa y sincrética donde se adorna una cruz de jiote con frutas de temporada para alejar al diablo.", chips: ["Religión", "Frutas"] },
        32: { nombre: "Festival del Maíz", lugar: "Chalatenango, El Salvador", desc: "Feria que rinde tributo al grano sagrado americano con atoles, tamales, rigüitas y trajes típicos artesanales.", chips: ["Gastronomía", "Maíz"] },
        33: { nombre: "Tradición del Bálsamo", lugar: "Jayaque, La Libertad", desc: "Encuentro cultural y religioso enfocado en la extracción ancestral del bálsamo y hermandad entre pueblos.", chips: ["Ancestral", "Cultura"] },
        34: { nombre: "Tradición de los Encuentros", lugar: "San Antonio del Monte, Sonsonate", desc: "Acto de hermandad religiosa entre imágenes de santos de pueblos vecinos, con raíces coloniales profundas.", chips: ["Religión", "Hermandad"] },
        35: { nombre: "Fiestas Patronales de La Unión", lugar: "La Unión, El Salvador", desc: "Celebración costera en honor a la Inmaculada Concepción con actividades marítimas y desfiles tradicionales.", chips: ["Feria", "Costa"] },
        36: { nombre: "Festival de los Farolitos en Ataco", lugar: "Ahuachapán, El Salvador", desc: "Concepción de Ataco se viste de gala iluminando sus calles empedradas con espectaculares diseños de luces.", chips: ["Luces", "Turismo"] },
        37: { nombre: "Festival de la Panela", lugar: "Cuscatlán, El Salvador", desc: "Feria en los trapiches tradicionales de San Lorenzo dedicada a los derivados de la caña de azúcar.", chips: ["Dulces", "Tradición"] },
        38: { nombre: "Fiestas del Rey Guajactial", lugar: "Sonsonate, El Salvador", desc: "Conmemoración histórica e indígena que rescata la dignidad y liderazgo de los caciques nahua-pipiles.", chips: ["Indígena", "Historia"] },
        39: { nombre: "Festival del Cangrejo", lugar: "La Paz, El Salvador", desc: "Celebración gastronómica marina enfocada en platillos derivados del cangrejo y la conservación del manglar.", chips: ["Mariscos", "Gastronomía"] },
        40: { nombre: "Romería de Esquipulas", lugar: "Chalatenango, El Salvador", desc: "Peregrinación tradicional y religiosa de fe en devoción al milagroso Cristo Negro de Esquipulas.", chips: ["Fe", "Peregrinación"] },
        41: { nombre: "Festival del Barro", lugar: "Cabañas, El Salvador", desc: "Feria artesanal en Ilobasco que celebra la maestría del modelado en arcilla y las famosas sorpresas de barro.", chips: ["Artesanías", "Barro"] },
        42: { nombre: "Fiestas del Arroz", lugar: "San Vicente, El Salvador", desc: "Celebración en El Tránsito dedicada a la producción arrocera con desfiles de maquinaria y platillos típicos.", chips: ["Cosecha", "Tradición"] },
        43: { nombre: "Festival de las Juventudes", lugar: "El Mozote, Morazán", desc: "Encuentro cultural por la paz y la memoria histórica a través de expresiones artísticas juveniles.", chips: ["Paz", "Juventud"] },
        44: { nombre: "Feria del Marisco", lugar: "Usulután, El Salvador", desc: "Gran exhibición culinaria en Puerto El Triunfo con la mejor pesca fresca de la Bahía de Jiquilisco.", chips: ["Mariscos", "Costa"] },
        45: { nombre: "Primicia de la Cosecha", lugar: "La Unión, El Salvador", desc: "Tradición agrícola de agradecimiento por las primeras cosechas de granos básicos de la temporada de lluvias.", chips: ["Agricultura", "Tradición"] },
        46: { nombre: "Carnaval de la Panela", lugar: "Verapaz, San Vicente", desc: "Colorida fiesta dedicada a la molienda de caña en los tradicionales trapiches de la falda del volcán.", chips: ["Feria", "Dulces"] },
        47: { nombre: "Fiestas de Cojutepeque", lugar: "Cuscatlán, El Salvador", desc: "Famosa feria del azúcar y los embutidos con desfiles de carrozas típicas y reinas de la localidad.", chips: ["Feria", "Embutidos"] },
        48: { nombre: "Festival del Añil", lugar: "Cuscatlán, El Salvador", desc: "Celebración en Suchitoto dedicada a la planta del 'oro azul' y las técnicas de teñido ancestrales.", chips: ["Artesanal", "Historia"] },
        49: { nombre: "Fiestas Patronales de Gotera", lugar: "Morazán, El Salvador", desc: "Celebración en San Francisco Gotera con cabalgatas, jaripeos y noches culturales del oriente del país.", chips: ["Feria", "Tradición"] },
        50: { nombre: "Festival del Chicharrón", lugar: "La Libertad, El Salvador", desc: "Feria gastronómica en Antiguo Cuscatlán dedicada a los mejores platillos derivados del chicharrón.", chips: ["Gastronomía", "Comida"] },
        51: { nombre: "El Boquerón", lugar: "Volcán de San Salvador", desc: "Parque nacional en el cráter del volcán, mirador natural con leyendas sobre antiguas erupciones.", chips: ["Naturaleza", "Vistas"] },
        52: { nombre: "Puerta del Diablo", lugar: "Los Planes de Renderos", desc: "Formación rocosa icónica envuelta en la leyenda colonial de un terrateniente y el mismísimo demonio.", chips: ["Mitos", "Leyendas"] },
        53: { nombre: "Casa Blanca", lugar: "Chalchuapa, Santa Ana", desc: "Sitio arqueológico con estructuras piramidales y un taller interactivo de teñido con añil natural.", chips: ["Arqueología", "Añil"] },
        54: { nombre: "Palacio Nacional", lugar: "Centro Histórico, San Salvador", desc: "Edificio centenario con salones majestuosos que representan el esplendor arquitectónico republicano.", chips: ["Arquitectura", "Historia"] },
        55: { nombre: "Teatro Nacional", lugar: "Centro Histórico, San Salvador", desc: "El teatro más antiguo de Centroamérica, joya del renacimiento francés en el corazón de la capital.", chips: ["Teatro", "Arte"] },
        56: { nombre: "Iglesia El Rosario", lugar: "Centro Histórico, San Salvador", desc: "Arquitectura vanguardista y única sin columnas, joya del arte sacro moderno latinoamericano.", chips: ["Arquitectura", "Vanguardia"] },
        57: { nombre: "Semana Santa Nacional", lugar: "Catedral Metropolitana", desc: "Solemnes conmemoraciones de pasión caracterizadas por las alfombras artísticas de sal en las calles.", chips: ["Religión", "Alfombras"] },
        58: { nombre: "Día de la Independencia", lugar: "Plaza Cívica, San Salvador", desc: "Gran desfile nacional cívico y militar con bandas de paz conmemorando la emancipación patria.", chips: ["Cívico", "Desfile"] },
        59: { nombre: "Día de los Difuntos", lugar: "Cementerio General, San Salvador", desc: "Tradición popular de coronar y pintar las tumbas de los seres queridos el dos de noviembre.", chips: ["Tradición", "Identidad"] },
        60: { nombre: "Navidad y Posadas", lugar: "San Salvador", desc: "Celebraciones decembrinas llenas de luces, pólvora tradicional y las posadas en los barrios históricos.", chips: ["Navidad", "Luces"] },
        61: { nombre: "Monumento a los Próceres", lugar: "Plaza Libertad, San Salvador", desc: "Estructura central que conmemora el Primer Grito de Independencia de Centroamérica en 1811.", chips: ["Historia", "Monumento"] },
        62: { nombre: "Cine Metro", lugar: "Centro Histórico, San Salvador", desc: "Referente del entretenimiento urbano del siglo XX, hoy pieza clave de la memoria arquitectónica capitalina.", chips: ["Memoria Urbana", "Cine"] },
        63: { nombre: "Plaza Ferroviaria", lugar: "Sonsonate", desc: "Museo al aire libre que conserva las antiguas locomotoras de vapor que impulsaron la economía cafetalera.", chips: ["Trenes", "Historia"] },
        64: { nombre: "Museo Militar", lugar: "San Jacinto, San Salvador", desc: "El cuartel El Zapote resguarda objetos, armas e historia del desarrollo de las fuerzas armadas.", chips: ["Militar", "Museo"] },
        65: { nombre: "Sitio Arqueológico Cihuatán", lugar: "Aguilares, San Salvador", desc: "Uno de los centros urbanos prehispánicos más extensos del país, con vestigios de un juego de pelota.", chips: ["Arqueología", "Cultura"] },
        66: { nombre: "Laguna de Alegría", lugar: "Usulután", desc: "Conocida como la Esmeralda de América, sus aguas azufradas cambian de color bajo mitos de una sirena.", chips: ["Leyendas", "Volcanes"] },
        67: { nombre: "Cuyancúa de Izalco", lugar: "Izalco, Sonsonate", desc: "Lugar de la mítica criatura mitad serpiente y mitad cerdo que anuncia lluvias y ríos subterráneos.", chips: ["Mitos", "Nahua"] },
        68: { nombre: "Cerro de las Pavas", lugar: "Cojutepeque, Cuscatlán", desc: "Mirador natural y santuario mariano envuelto en relatos sobre apariciones y milagros locales.", chips: ["Fe", "Leyendas"] },
        69: { nombre: "Río Sumpul", lugar: "Chalatenango", desc: "Escenario de sucesos históricos trágicos y mitos rurales sobre espíritus protectores de las aguas altas.", chips: ["Historia", "Naturaleza"] },
        70: { nombre: "Llanos de Olocuilta", lugar: "La Paz", desc: "Valles históricos rodeados de historias coloniales de carretas chillonas y duendes caminantes.", chips: ["Mitos", "Tradición"] }
      }
      },
      // Sección Leyendas (Navegación & Hero)
      "ley.meta.title": "Raíces Salvadoreñas — Leyendas",
      "ley.hero.eyebrow": "Raíces Salvadoreñas te da la bienvenida",
      "ley.hero.title": "Cuando cae la noche, El Salvador cuenta historias",
      "ley.hero.desc": "Ríos que murmuran, caminos con trampa, sombras que velan por los niños. Descubre 16 leyendas que nuestros abuelos contaron por generaciones.",
      "ley.hero.cta": "Explorar las leyendas",

      // Tarjetas conceptuales
      "ley.concept.card1.title": "¿Qué es una leyenda?",
      "ley.concept.card1.hint": "Toca para descubrir",
      "ley.concept.card1.back": "Un relato que mezcla lo real con lo sobrenatural para explicar lo inexplicable: un ruido en la quebrada, un viajero perdido, el miedo a la noche.",

      "ley.concept.card2.title": "Raíces mestizas",
      "ley.concept.card2.hint": "Toca para descubrir",
      "ley.concept.card2.back": "Nacidas del choque entre las cosmovisiones náhuat-pipil y lenca con la fe católica traída en la época colonial. Dioses antiguos conviven con rezos cristianos.",

      "ley.concept.card3.title": "De boca en boca",
      "ley.concept.card3.hint": "Toca para descubrir",
      "ley.concept.card3.back": "Viven a través de la palabra. Cada pueblo, cada abuela las cuenta distinto — por eso casi ninguna tiene una versión única.",

      // Biblioteca & Modal
      "ley.library.eyebrow": "La biblioteca",
      "ley.library.title": "16 leyendas y mitos de El Salvador",
      "ley.modal.listen": "Escuchar leyenda",
      "ley.modal.close": "Cerrar",
      "ley.modal.origin": "Origen aproximado",

      /* ── Página: Leyendas ── */
      "ley.modal.image_placeholder": "Espacio para imagen<br>de esta leyenda",

      /* La Siguanaba */
      "ley.data.siguanaba.title": "La Siguanaba",
      "ley.data.siguanaba.sub": "El espíritu que extravía a los infieles",
      "ley.data.siguanaba.tag": "Espíritu · Ríos",
      "ley.data.siguanaba.chip1": "Espíritu femenino",
      "ley.data.siguanaba.chip2": "Aparece de noche",
      "ley.data.siguanaba.chip3": "Ríos y quebradas",
      "ley.data.siguanaba.chip4": "Enloquece a hombres",
      "ley.data.siguanaba.origin": "Tradición náhuat-pipil, extendida por todo El Salvador. Recogida por Miguel Ángel Espino en \"Mitología de Cuscatlán\".",
      "ley.data.siguanaba.relato": "Cuentan los abuelos que hace muchísimo tiempo, cuando los dioses todavía caminaban cerca de los hombres, vivía una mujer llamada Sihuehuet, cuyo nombre en náhuat significa \"mujer hermosa\". Era, en efecto, la más bella de su pueblo: piel dorada, cabellera negra y larga como la noche, y una risa que hacía voltear a cualquiera. Estaba casada, pero su corazón inquieto la llevó a enamorarse del Lucero de la Mañana, un dios que bajaba del cielo para verla junto al río.\n\nCuando Tlaloc, el poderoso dios de las aguas y de las lluvias, descubrió la traición, no perdonó. La maldijo para siempre: le arrebató su nombre y su belleza verdadera, y la condenó a vagar eternamente por ríos, quebradas y caminos oscuros, convertida ahora en la Siguanaba, que quiere decir \"mujer horrible\". Desde entonces solo puede mostrar su hermosura como un engaño, una trampa que tiende a los hombres que, como ella hizo, traicionan a quien los ama.\n\nAsí, cualquier noche, un hombre que camina solo por un paraje solitario —de vuelta de una cantina, escapando de su casa para ver a otra mujer, o simplemente por no hacer caso a los consejos de los mayores— puede toparse con ella. Aparece bañándose en el río o lavando ropa con un guacal de oro, y lo llama con dulzura, con una voz que promete todo lo que ese hombre ha estado buscando en otros brazos. Él la sigue, hipnotizado, internándose cada vez más en el monte, sin darse cuenta de que se aleja del camino de regreso.\n\nY entonces, cuando ya está bien lejos de cualquier ayuda, ella voltea el rostro. Donde había una sonrisa, ahora hay una calavera; donde había ojos brillantes, hay cuencas vacías, o el hocico alargado y los dientes de una yegua. El grito del hombre se pierde en la noche mientras la Siguanaba ríe y desaparece, dejándolo perdido, temblando, muchas veces con fiebre durante días, y para siempre marcado por el miedo.\n\nLos viejos del pueblo dicen que hay formas de librarse de ella si uno la encuentra: morder con fuerza el filo de un machete, rezar en voz alta sin detenerse, cruzar unas tijeras o llevar agujas de coser en la bolsa, o gritar tres veces el nombre de la propia madre —porque dicen que eso le recuerda su propia traición y la hace huir. Algunos aseguran que si el hombre logra mirarle el rostro antes de que ella se lo muestre, queda libre para siempre de su maldición. Pero la lección de fondo, la que toda madre le repite a su hijo antes de dejarlo salir de noche, es siempre la misma: cuídate de seguir a la belleza que aparece sola en la oscuridad, porque detrás de ella puede estar esperándote la Siguanaba.",

      /* El Cipitío */
      "ley.data.cipitio.title": "El Cipitío",
      "ley.data.cipitio.sub": "El niño eterno que nunca crece",
      "ley.data.cipitio.tag": "Espíritu · Bosques",
      "ley.data.cipitio.chip1": "Niño eterno",
      "ley.data.cipitio.chip2": "Pies al revés",
      "ley.data.cipitio.chip3": "Hijo de la Siguanaba",
      "ley.data.cipitio.chip4": "Enamora doncellas",
      "ley.data.cipitio.origin": "Mitología pipil-náhuat de todo el país; se le vincula con el mito de la Siguanaba como su hijo maldito.",
      "ley.data.cipitio.relato": "Antes de convertirse en la Siguanaba, Sihuehuet tuvo un hijo con un dios: un niño de mejillas redondas y ombligo saltón al que llamaron Cipitío. Pero cuando ella se marchó siguiendo sus amoríos prohibidos, abandonó también a su pequeño, dejándolo solo en el monte. Los dioses, furiosos con la madre, decidieron castigar también al hijo, aunque él no tuviera culpa alguna: lo condenaron a quedarse para siempre con el cuerpo de un niño de unos diez años, sin poder crecer jamás, vagando eternamente entre los ríos y los cañaverales donde alguna vez vivió con ella.\n\nDesde entonces, el Cipitío es un espíritu pequeño, moreno, de panza redonda como un pequeño Buda, que usa un sombrero de petate tan grande que casi le tapa la cara. Lo más curioso es que sus pies están volteados al revés: los dedos apuntan hacia atrás, de modo que cualquiera que intente seguir sus huellas en la tierra terminará caminando exactamente en la dirección contraria a la que él realmente fue.\n\nA diferencia de su madre, el Cipitío no busca hacer daño. Es juguetón, curioso y, sobre todo, enamoradizo: le encanta aparecerse cerca de los ríos donde las muchachas jóvenes van a lavar ropa, especialmente si son bonitas y de ojos claros. Se esconde entre los matorrales y les lanza piedritas pequeñas para llamar su atención, o les silba desde lejos, aunque nunca se deja ver del todo. Cuando una joven se enoja o se asusta, él se ríe entre dientes y desaparece corriendo, dejando solo el eco de sus pasos.\n\nOtra de sus travesuras favoritas es meterse en las cocinas de las casas rurales durante la noche para revolcarse en la ceniza tibia de los fogones apagados, dejando huellas pequeñas y desordenadas por todo el piso a la mañana siguiente. Las abuelas, al encontrar esas marcas, sonríen y dicen sin sorpresa: \"otra vez vino el Cipitío a jugar con la ceniza.\"\n\nCon el tiempo, el Cipitío se ha convertido en uno de los personajes más queridos del folclore salvadoreño, no como una amenaza sino como un recordatorio tierno y un poco travieso: el de un niño que nunca tuvo la oportunidad de crecer, condenado por un error que no cometió, y que a pesar de todo sigue buscando, entre risas y travesuras, un poco de cariño y compañía en los ríos donde una vez vivió junto a su madre.",

      /* El Cadejo */
      "ley.data.cadejo.title": "El Cadejo",
      "ley.data.cadejo.sub": "El guardián de dos caras: blanco y negro",
      "ley.data.cadejo.tag": "Criatura · Caminos",
      "ley.data.cadejo.chip1": "Cadejo blanco",
      "ley.data.cadejo.chip2": "Cadejo negro",
      "ley.data.cadejo.chip3": "Ojos brillantes",
      "ley.data.cadejo.chip4": "Lucha eterna",
      "ley.data.cadejo.origin": "Difundida en toda Centroamérica; en El Salvador se cuenta especialmente en caminos rurales y veredas nocturnas.",
      "ley.data.cadejo.relato": "Se cuenta que hace generaciones, en algún cañaveral o vereda olvidada, nacieron dos hermanos con forma de perro grande, de pelaje largo y enredado, pero con un destino completamente distinto el uno del otro. Uno de ellos creció bueno y protector: se convirtió en el Cadejo blanco, guardián de los caminantes nocturnos que van de vuelta a casa con el corazón limpio. El otro se entregó a la oscuridad, y se transformó en el Cadejo negro, una bestia que ronda los caminos buscando a quienes salen de noche con malas intenciones —a robar, a engañar a su esposa, o a hacer daño a alguien.\n\nQuien camina solo por un sendero rural después de cierta hora puede sentir, de pronto, un olor a incienso y flores frescas mezclándose con el aire de la noche: es señal de que el Cadejo blanco camina cerca, silencioso, cuidando sus pasos desde la sombra de los árboles, con sus ojos azules brillando apenas entre la maleza. Su presencia trae calma, y muchos aseguran haber llegado sanos y salvos a casa gracias a que él los acompañó sin que se dieran cuenta.\n\nPero si en cambio el aire se llena de un olor pesado, como a azufre quemado, y se escucha un ruido de cadenas o el golpe seco de pezuñas contra la tierra, hay que empezar a rezar: es el Cadejo negro que se acerca, con sus ojos rojos encendidos como brasas, buscando a alguien a quien asustar hasta la locura, o algo peor.\n\nLa leyenda cuenta que, de vez en cuando, los dos hermanos se encuentran en la oscuridad y libran una batalla feroz, una lucha eterna entre el bien y el mal que ninguno de los dos puede ganar del todo. Quien tiene la desgracia de escuchar esa pelea —gruñidos, cadenas arrastrándose, aullidos que parecen desgarar la noche— debe quedarse quieto, sin moverse, y esperar en silencio a que termine. Meterse en medio de esa batalla, aunque sea sin querer, puede significar quedar atrapado entre las dos fuerzas: y de ahí, aseguran los que cuentan la historia, pocos salen con la cabeza en su sitio.\n\nPor eso, en los pueblos donde esta historia se transmite de generación en generación, los padres advierten a sus hijos que eviten salir solos de noche, y sobre todo que eviten hacerlo con malas intenciones, porque nunca se sabe cuál de los dos hermanos anda cerca esa noche, esperando para acompañar... o para castigar.",

      /* La Llorona */
      "ley.data.llorona.title": "La Llorona",
      "ley.data.llorona.sub": "El lamento eterno de una madre",
      "ley.data.llorona.tag": "Espíritu · Aguas",
      "ley.data.llorona.chip1": "Llanto eterno",
      "ley.data.llorona.chip2": "Ríos y lagunas",
      "ley.data.llorona.chip3": "Medianoche",
      "ley.data.llorona.chip4": "Busca a sus hijos",
      "ley.data.llorona.origin": "Presente en toda Latinoamérica; la versión salvadoreña se asocia con el Río Lempa y el Lago de Coatepeque.",
      "ley.data.llorona.relato": "Dicen que hace muchos años vivía, cerca del Río Lempa, una mujer joven y bella que se enamoró perdidamente de un hombre que nunca le correspondió del todo. Tuvieron hijos juntos, pero él la abandonó, dejándola sola con la vergüenza y el dolor de una promesa rota. Cuentan que, cegada por la desesperación y la locura de sentirse traicionada, una noche llevó a sus propios hijos hasta la orilla del río y los ahogó en sus aguas oscuras, para arrepentirse al instante siguiente, cuando ya era demasiado tarde.\n\nDesde ese momento, su alma no encontró descanso. Fue condemned a vagar eternamente por ríos y lagunas, buscando entre la niebla a los hijos que ella misma se llevó, lanzando al viento un llanto desgarrador que se puede escuchar hasta hoy en las noches más silenciosas: \"¡Ay, mis hijos! ¡Ay, mis hijos!\", un lamento que parece venir de todas partes y de ninguna a la vez, que eriza la piel y detiene el corazón de quien lo escucha.\n\nEn El Salvador se le ha visto —o mejor dicho, se le ha escuchado— especialmente cerca del Río Lempa, del Lago de Coatepeque y del Río Grande de San Miguel, siempre después de la medianoche, siempre vestida de blanco, con el cabello suelto y mojado cayéndole sobre un rostro que algunos describen hermoso todavía, y que otros aseguran que es un rostro deforme, marcado para siempre por el dolor y el arrepentimiento eterno.\n\nLos que dicen haberla visto de cerca cuentan que camina despacio por la orilla del agua, mirando hacia la corriente, como si aún esperara encontrar a sus hijos flotando entre las piedras. Si alguien se acerca demasiado, ella voltea de golpe, y quien la mira a los ojos queda paralizado de terror, incapaz de moverse durante largos minutos, mientras su llanto retumba cada vez más cerca.\n\nPor generaciones, esta ha sido una de las advertencias más poderosas para los niños salvadoreños: no acercarse solos a los ríos de noche, no jugar cerca del agua después de cierta hora, porque ahí, entre la neblina y el sonido de la corriente, puede estar esperando la Llorona, cargando para siempre el peso de una tragedia que ella misma provocó y que ahora no puede deshacer.",

      /* La Descarnada */
      "ley.data.descarnada.title": "La Descarnada",
      "ley.data.descarnada.sub": "La muerte que camina entre los vivos",
      "ley.data.descarnada.tag": "Presagio · Pueblos",
      "ley.data.descarnada.chip1": "Esqueleto viviente",
      "ley.data.descarnada.chip2": "Calles nocturnas",
      "ley.data.descarnada.chip3": "Presagio de muerte",
      "ley.data.descarnada.chip4": "Camina entre humanos",
      "ley.data.descarnada.origin": "Frecuente en los pueblos del interior del país, sobre todo en zonas con cementerios y caminos rurales solitarios.",
      "ley.data.descarnada.relato": "En los pueblos más antiguos del interior de El Salvador, donde las calles todavía son de tierra y el cementerio queda apenas a las afueras, se cuenta la historia de una figura que no persigue, no grita, ni asusta con intención: simplemente camina. Le llaman la Descarnada, y quien la ve sabe, sin que nadie se lo tenga que explicar, que la muerte anda cerca.\n\nSe le describe como una mujer altísima y delgada hasta los huesos, cubierta apenas por una sábana blanca deshilachada o un vestido raído que el viento nocturno mueve de un lado a otro. Cuando la tela se agita, se alcanzan a ver, entre los pliegues, los huesos desnudos de su cuerpo, como si no le quedara ni un gramo de carne. Camina despacio, sin prisa, por las calles solitarias de los pueblos, por los caminos que bordean los cementerios, o por los senderos rurales que casi nadie transita después de cierta hora.\n\nA diferencia de otras figuras del folclore salvadoreño, la Descarnada no busca engañar a nadie, ni seducir, ni hacer travesuras. No corre detrás de quien la ve, no habla, no amenaza. Solamente sigue su camino, con un sonido seco y hueco de huesos entrechocando a cada paso, como si caminara con el esqueleto suelto bajo la tela raída. Y esa indiferencia, esa calma inquietante, es quizás lo más aterrador de todo: uno sabe que ella no viene por ti directamente, pero verla significa que la muerte, de alguna forma, ha puesto su mirada sobre tu casa, tu familia o tú mismo.\n\nNumerosas personas en distintos pueblos del país aseguran haberla visto, casi siempre de madrugada, caminando lentamente por calles empedradas o por veredas que llevan al panteón local. Algunos dicen haberla encontrado de frente en una esquina oscura, quedándose paralizados mientras ella pasaba de largo sin siquiera voltear a verlos, dejando tras de sí un frío que tardaba horas en desaparecer del cuerpo.\n\nLa creencia popular asegura que quien se topa con la Descarnada, o alguien de su familia cercana, no tardará en enfrentar una muerte próxima. Por eso, en las noches donde se rumora que ha sido vista rondando, los pueblos enteros se quedan más callados de lo normal, con las puertas bien cerradas, mientras los mayores recuerdan a los más jóvenes que la muerte, en El Salvador, no siempre llega de improviso: a veces, antes, se deja ver caminando entre los vivos.",

      /* El Duende */
      "ley.data.duende.title": "El Duende",
      "ley.data.duende.sub": "El pequeño guardián de los bosques",
      "ley.data.duende.tag": "Criatura · Bosques",
      "ley.data.duende.chip1": "Guardián del bosque",
      "ley.data.duende.chip2": "Toca música",
      "ley.data.duende.chip3": "Sombrero grande",
      "ley.data.duende.chip4": "Travieso pero inofensivo",
      "ley.data.duende.origin": "Zonas rurales y boscosas de todo el país; muy popular en cantones alejados de los cascos urbanos.",
      "ley.data.duende.relato": "En los cantones más alejados, donde el bosque todavía es espeso y las quebradas corren escondidas entre la maleza, los campesinos hablan de un pequeño ser que vive entre los árboles desde tiempos que nadie recuerda con exactitud: el Duende. No mide más de sesenta centímetros de alto, pero tiene la cara arrugada de un anciano sabio o, según quien lo cuente, el rostro travieso de un niño eterno. Viste ropa colorida y luce siempre un sombrero de paja tan grande que parece flotar solo sobre sus hombros diminutos.\n\nA diferencia de otras criaturas del folclore salvadoreño que inspiran verdadero terror, el Duende no es maligno por naturaleza. Es curioso, juguetón y, sobre todo, un maestro del engaño inofensivo: le encanta esconder las herramientas de trabajo de los campesinos justo cuando más las necesitan, cambiar de lugar los objetos de la casa durante la noche, o asustar sin motivo a las gallinas y a los animales domésticos, solo para divertirse con el alboroto que provoca.\n\nSu fama más grande, sin embargo, viene de la música. Por las noches, quien se adentra en el monte puede escuchar el sonido lejano de una marimba, una guitarra o una flauta tocando melodías que nadie reconoce, melodías que parecen venir de todas direcciones a la vez. Es el Duende, tocando para sí mismo entre los árboles. Algunos, atraídos por esa música misteriosa, se han internado en el bosque siguiendo el sonido, solo para descubrir, horas después, que estaban completamente perdidos: el Duende también puede imitar voces humanas, llamando por su nombre a quienes busca confundir, guiándolos cada vez más lejos del camino de regreso.\n\nExiste además una variante muy conocida de esta leyenda, quizás la más repetida entre las familias rurales: se dice que el Duende se enamora perdidamente de las niñas pequeñas de ojos claros y trenzas largas. Cuando esto sucede, comienza a aparecerse por las noches cerca de la casa de la niña, jalándole suavemente las trenzas mientras duerme, escondiéndole sus juguetes favoritos, o siguiéndola de manera brought insistente cuando camina sola. Por generaciones, muchas madres y abuelas optaron por cortarle el cabello a sus hijas pequeñas específicamente para alejar al Duende y evitar que se encariñara demasiado con ellas.\n\nCon el paso del tiempo, esta leyenda ha cumplido, sin proponérselo, una función que va más allá del simple susto: el miedo a toparse con el Duende ha hecho que generaciones de niños y adultos eviten adentrarse innecesariamente en los bosques y quebradas más profundos, ayudando —de manera indirecta pero real— a proteger estos ecosistemas de la deforestación y el abandono.",

      /* La Carreta Bruja */
      "ley.data.carreta_bruja.title": "La Carreta Bruja",
      "ley.data.carreta_bruja.sub": "El carruaje sin bueyes que recoge almas",
      "ley.data.carreta_bruja.tag": "Presagio · Caminos rurales",
      "ley.data.carreta_bruja.chip1": "Carreta fantasma",
      "ley.data.carreta_bruja.chip2": "Ruido de cadenas",
      "ley.data.carreta_bruja.chip3": "Recoge almas",
      "ley.data.carreta_bruja.chip4": "Viernes de noche",
      "ley.data.carreta_bruja.origin": "Tradición oral de zonas rurales, especialmente relatada en pueblos del oriente y centro del país.",
      "ley.data.carreta_bruja.relato": "Hace ya muchos años, cuentan los más viejos del pueblo, vivía un hombre que se había entregado en cuerpo y alma al diablo, cambiando su vida por riquezas y poder. Una noche, cegado por la maldad que llevaba dentro, intentó obligar a sus propios bueyes a entrar por la fuerza a la iglesia del pueblo, con intenciones oscuras que nadie se atrevió jamás a repetir en voz alta. Pero los bueyes, sintiendo el mal que los rodeaba, se resistieron con todas sus fuerzas: reventaron las coyundas que los ataban a la carreta y escaparon despavoridos hacia el monte, dejando al hombre maldito y a su carreta solos, en medio de la noche.\n\nDesde entonces, dicen que esa misma carreta rueda sola por los caminos rurales, sin ningún animal que la jale, advancing lentamente entre chirridos de madera vieja y el tintineo metálico de cadenas oxidadas. En la punta de sus trinquetes cuelgan calaveras que se balancean con cada movimiento, y quienes se atreven a mirar dentro de ella aseguran haber visto los cuerpos de personas que ya no reconocían, apilados en un silencio que da más miedo que cualquier grito.\n\nDetrás de la carreta, cuentan algunos testigos, avanzan seres extraños con cabeza de zacate seco, como espantapájaros vivientes, siguiendo el mismo camino sin apartarse jamás de su ruta fija. Nadie sabe bien a dónde se dirigen, pero todos coinciden en algo: hay que apartarse del camino y quedarse muy quieto cuando se escucha acercarse el sonido inconfundible de sus ruedas de madera contra la tierra.\n\nUno de los relatos más recordados es el de un hombre que, volviendo tarde a su casa, sintió que algo se aproximaba en la oscuridad. Al voltear, vio la carreta desvencijada advancing hacia él lentamente, sin bueyes, cargada de calaveras y de aquellos seres de zacate que la seguían de cerca. El miedo lo paralizó por completo; no recuerda cómo llegó esa noche a su casa, solo que pasó los siguientes tres días con una fiebre altísima, y que desde entonces nunca más se dejó sorprender por la noche, mucho menos si era viernes.\n\nPorque según cuenta la tradición, es precisamente los viernes de noche cuando la Carreta Bruja sale con más fuerza a recorrer los caminos, recogiendo —dicen algunos— las almas de quienes han llevado una vida de maldad, mientras que otros aseguran que simplemente arrastra su condena eterna, sin un destino claro, como recordatorio permanente de lo que puede pasar cuando alguien decide entregarse al mal.",

      /* La Cuyancúa */
      "ley.data.cuyancua.title": "La Cuyancúa",
      "ley.data.cuyancua.sub": "La bestia mitad serpiente, mitad cerdo",
      "ley.data.cuyancua.tag": "Criatura · Sonsonate",
      "ley.data.cuyancua.chip1": "Mitad culebra",
      "ley.data.cuyancua.chip2": "Mitad cerdo",
      "ley.data.cuyancua.chip3": "Anuncia temporales",
      "ley.data.cuyancua.chip4": "Cañales de Izalco",
      "ley.data.cuyancua.origin": "Zona de Izalco, departamento de Sonsonate; documentada por Leonhard Schultze-Jena en sus estudios sobre los pipiles de Izalco.",
      "ley.data.cuyancua.relato": "En los extensos cañaverales que rodean Izalco, en el departamento de Sonsonate, los pobladores más antiguos hablan con respeto y algo de temor de una criatura que pocos han visto de cerca, pero que muchos aseguran haber escuchado: la Cuyancúa. Es descrita como un ser híbrido y perturbador, con el cuerpo de una serpiente enroscada en su parte trasera, y la cabeza, las patas y el gruñido de un cerdo en su parte delantera. Su tamaño, dicen quienes la han visto de lejos entre la maleza, es similar al de una vaca pequeña, lo suficientemente grande como para hacer temblar los cañales a su paso.\n\nLo que más ha alimentado esta leyenda a través de los años no es tanto su apariencia, sino el sonido que emite: un chillido agudo y penetrante, muy parecido al de un cerdo asustado, que se escucha especialmente en horas de la madrugada o justo antes de que se aproxime un temporal fuerte. Algunos ancianos de la zona explican que ese chillido lo produce cuando se le eriza todo el pelaje del lomo, como si presintiera la tormenta antes que nadie más en el pueblo.\n\nLos lugareños de los cañales de San Ramón, cerca de Izalco, cuentan que no se trata de una sola Cuyancúa, sino de varias, que emergen de tanto en tanto de entre los surcos de caña recién cortada, especialmente en las noches húmedas que anteceden a las lluvias más fuertes de la temporada. El propio investigador alemán Leonhard Schultze-Jena, que estudió a fondo la mitología de los pipiles de Izalco a inicios del siglo veinte, recogió y confirmó por escrito la existencia de este mito entre los pobladores de la región, dándole un lugar permanente dentro del folclore salvadoreño.\n\nAdemás de anunciar tormentas, a la Cuyancúa se le atribuye cierto dominio sobre los ríos y quebradas cercanas a los cañaverales, como si fuera una guardiana silenciosa de esas aguas. Por eso, cuando los agricultores escuchan su chillido característico resonando entre los cañales al anochecer, saben que es momento de asegurar bien sus casas, guardar los animales y prepararse: la lluvia, casi siempre, no tarda en llegar después de que la Cuyancúa se ha dejado escuchar.",

      /* El Tabudo */
      "ley.data.tabudo.title": "El Tabudo",
      "ley.data.tabudo.sub": "El lagarto gigante de los volcanes",
      "ley.data.tabudo.tag": "Criatura · Volcanes",
      "ley.data.tabudo.chip1": "Lagarto enorme",
      "ley.data.tabudo.chip2": "Vive en volcanes activos",
      "ley.data.tabudo.chip3": "Guardián del fuego",
      "ley.data.tabudo.chip4": "Itzqueye",
      "ley.data.tabudo.origin": "Asociado a las zonas volcánicas del país; vinculado en algunas versiones con Itzqueye, diosa pipil del agua dulce.",
      "ley.data.tabudo.relato": "En las faldas de los volcanes activos de El Salvador, donde el vapor de azufre sube entre las rocas y el suelo a veces retumba con un calor que viene de muy adentro, se cuenta la existencia de una criatura tan antigua como las propias montañas de fuego: el Tabudo, un lagarto de proporciones descomunales que, según la tradición, habita en las entrañas mismas de los volcanes, custodiando los pasajes que llevan hacia el fuego interior de la tierra.\n\nNadie ha podido describir con exactitud su tamaño real, porque casi nadie que se ha acercado demasiado ha regresado para contarlo con detalle. Se dice que su piel es tan oscura y áspera como la roca volcánica, y que se mueve despacio entre las cuevas y pozas de aguas termales que rodean los cráteres, como si el calor no le afectara en absoluto, como si él mismo fuera parte del volcán.\n\nUno de los relatos más conocidos sobre el Tabudo habla de un hombre que, por curiosidad o por descuido, se acercó demasiado a una de las pozas volcánicas cercanas a un cráter activo. De pronto, sin ninguna advertencia, una corriente subacuática sorpresiva y misteriosa lo arrastró hacia el fondo, llevándolo —según cuenta la leyenda— directamente hasta los dominios de Itzqueye, la diosa pipil del agua dulce, guardiana de esas aguas ocultas bajo la montaña. El hombre desapareció por completo, y nadie volvió a saber de él.\n\nAlgunas versiones de la historia relacionan directamente al Tabudo con Itzqueye, sugiriendo que el lagarto gigante es en realidad su guardián personal, encargado de proteger sus dominios acuáticos escondidos entre el fuego del volcán, castigando con la desaparición a quien se atreve a curiosear demasiado cerca de sus aguas sagradas.\n\nPor generaciones, esta leyenda ha servido como una advertencia práctica y muy necesaria: los volcanes de El Salvador son hermosos, pero también peligrosos, llenos de pozas ocultas, corrientes traicioneras y terreno inestable. El miedo a toparse con el Tabudo ha mantenido a muchas personas alejadas de zonas volcánicas realmente riesgosas, recordándoles que algunas cosas, en las profundidades de la montaña, es mejor no ir a buscarlas.",

      /* La Giganta de Jocoro */
      "ley.data.giganta_jocoro.title": "La Giganta de Jocoro",
      "ley.data.giganta_jocoro.sub": "El icono gigante de las fiestas patronales",
      "ley.data.giganta_jocoro.tag": "Tradición · Morazán",
      "ley.data.giganta_jocoro.chip1": "Figura gigante",
      "ley.data.giganta_jocoro.chip2": "Fiestas patronales",
      "ley.data.giganta_jocoro.chip3": "Tradición Lenca",
      "ley.data.giganta_jocoro.chip4": "Icono de Jocoro",
      "ley.data.giganta_jocoro.origin": "Municipio de Jocoro, departamento de Morazán; vinculada a la tradición Lenca y a los megalitos de Corinto.",
      "ley.data.giganta_jocoro.relato": "En el municipio de Jocoro, en el departamento de Morazán, se cuenta una historia distinta a la mayoría de las leyendas salvadoreñas: no habla de un espíritu vengativo ni de una criatura temida en la oscuridad, sino de una figura gigante que, lejos de asustar, se ha convertido en el orgullo más grande de todo el pueblo. Le llaman la Giganta de Jocoro, y cada año, durante las fiestas patronales, sale a recorrer las calles acompañada de toda su familia gigante y de una alegre corte de personajes enmascarados que bailan a su alrededor.\n\nEl origen de esta tradición se remonta a las creencias ancestrales del pueblo Lenca, que habitó gran parte del oriente de El Salvador desde tiempos muy antiguos. Según esa cosmovisión, existieron efectivamente gigantes en el territorio, seres de gran tamaño y fuerza sobrehumana que, según cuentan algunos, fueron los verdaderos autores de la formación y la decoración de los enormes megalitos que todavía hoy se pueden encontrar en Corinto, también en el departamento de Morazán, como testimonio de piedra de un pasado que se resiste a desaparecer del todo.\n\nCon el paso de los siglos, esa creencia ancestral se transformó poco a poco en una celebración comunitaria: la Giganta dejó de ser solo un recuerdo mitológico para convertirse en un personaje central de las fiestas patronales de Jocoro, con su propia familia de gigantes y su comitiva de acompañantes enmascarados, todos ellos construidos con gran cuidado por artesanos locales que mantienen viva esta tradición año tras año.\n\nHoy, ver desfilar a la Giganta de Jocoro por las calles del pueblo es, para muchos morazánicos, un motivo de identidad tan fuerte como puede serlo la Siguanaba o el Cipitío para el resto del país. Niños y adultos se agolpan en las aceras para verla pasar, celebrando no un miedo ancestral, sino un vínculo directo con sus raíces Lencas, recordando que en algún momento de la historia, en esa misma tierra oriental, se habló en serio de la existencia de gigantes.",

      /* El Sisimite */
      "ley.data.sisimite.title": "El Sisimite",
      "ley.data.sisimite.sub": "El hombre salvaje de los cerros",
      "ley.data.sisimite.tag": "Criatura · Montañas",
      "ley.data.sisimite.chip1": "Cubierto de pelo",
      "ley.data.sisimite.chip2": "Pies al revés",
      "ley.data.sisimite.chip3": "Vive en cuevas",
      "ley.data.sisimite.chip4": "Rapta viajeros",
      "ley.data.sisimite.origin": "Zonas montañosas y boscosas de El Salvador y otros países centroamericanos; comparte raíces con relatos mesoamericanos del hombre salvaje.",
      "ley.data.sisimite.relato": "En los cerros más apartados de El Salvador, donde la neblina cubre las cuevas y los senderos apenas son visibles entre la vegetación cerrada, se habla desde hace generaciones de un ser que habita en lo más profundo de la montaña: el Sisimite, un humanoide gigantesco, cubierto de pies a cabeza por un pelaje espeso y enmarañado, que vive completamente aislado de los pueblos, en cuevas que muy pocos se atreven a buscar.\n\nAl igual que el Cipitío, el Sisimite tiene una particularidad que lo hace todavía más temido: sus pies están colocados al revés, con los dedos apuntando hacia atrás. Esto significa que cualquier cazador o viajero que se pierda en la montaña y trate de seguir sus huellas para encontrar el camino de regreso, terminará caminando exactamente en la dirección opuesta a la que el Sisimite realmente tomó, adentrándose todavía más en terreno desconocido en lugar de salir de él.\n\nLos relatos más antiguos hablan de su fuerza sobrehumana, capaz de arrancar árboles de raíz y mover rocas enormes como si no pesaran nada. Se dice que ronda los senderos más solitarios durante la noche, y que ha llegado a raptar a viajeros descuidados —sobre todo mujeres jóvenes que se aventuran solas por la montaña— llevándoselos a sus cuevas profundas, de las cuales muy pocos, según cuenta la tradición oral, han logrado escapar con vida para contarlo.\n\nSu presencia se siente antes de verlo: un silencio extraño se apodera del bosque, los pájaros dejan de cantar de golpe, y un olor fuerte a tierra húmeda y animal salvaje se cuela entre los árboles. Quienes aseguran haberlo visto de lejos describen una silueta enorme, encorvada, moviéndose entre las sombras con una agilidad que no debería ser posible para un ser de ese tamaño.\n\nEsta leyenda, compartida con matices similares en otros países de Centroamérica, ha cumplido durante generaciones una función muy práctica: mantener alejadas a las personas, especialmente a las mujeres y los niños, de las zonas montañosas más remotas y peligrosas del país, donde los verdaderos riesgos —despeñaderos, animales salvajes, y la posibilidad real de perderse sin remedio— son tan grandes como los que se le atribuyen al propio Sisimite.",

      /* El Justo Juez de la Noche */
      "ley.data.justo_juez.title": "El Justo Juez de la Noche",
      "ley.data.justo_juez.sub": "El jinete que juzga a los pecadores",
      "ley.data.justo_juez.tag": "Presagio · Caminos",
      "ley.data.justo_juez.chip1": "Jinete nocturno",
      "ley.data.justo_juez.chip2": "Reza el Justo Juez",
      "ley.data.justo_juez.chip3": "Persigue infieles",
      "ley.data.justo_juez.chip4": "Oración protectora",
      "ley.data.justo_juez.origin": "Tradición oral extendida en pueblos rurales; se relaciona con la oración popular católica conocida como \"el Justo Juez\".",
      "ley.data.justo_juez.relato": "En los caminos rurales de El Salvador, donde la fe católica se mezcla con el miedo ancestral a la oscuridad, se cuenta la historia de un jinete que aparece únicamente ante quienes llevan sobre su conciencia el peso de una vida deshonesta: hombres infieles, borrachos que maltratan a su familia, o personas que han hecho daño sin arrepentimiento. Le llaman el Justo Juez de la Noche, y su sola aparición se siente como una sentencia silenciosa que cae sobre quien la merece.\n\nNadie describe con claridad su rostro, oculto siempre bajo la sombra de un sombrero o entre la oscuridad de la noche cerrada. Monta un caballo negro que no hace ruido al galopar, como si sus cascos apenas rozaran el suelo, y avanza por los caminos solitarios sin decir una sola palabra, sin necesidad de gritar ni amenazar: su presencia por sí sola basta para desatar el pánico.\n\nQuienes lo han encontrado en su camino cuentan que, apenas se acerca, los caballos propios se agitan nerviosos, relinchando sin motivo aparente, mientras los perros del vecindario aúllan al unísono como si percibieran algo que los humanos apenas alcanzan a sentir: una opresión pesada en el pecho, un frío que sube desde los pies, la certeza absoluta de que ese jinete sabe exactamente quién es uno y qué ha hecho mal en la vida.\n\nLa tradición asegura que existe una única forma de librarse de su presencia: rezar en voz alta, con fe verdadera, la oración popular conocida como \"el Justo Juez\", una plegaria transmitida de generación en generación precisamente para estos momentos de peligro nocturno. Se dice que en cuanto las primeras palabras de la oración salen de la boca del viajero asustado, el jinete se detiene, observa un instante más, y luego se aleja despacio hacia la oscuridad de donde vino, sin insistir, como si su única misión hubiera sido recordarle a esa persona que la noche también puede traer justicia.\n\nMás que un simple espanto, esta figura cumple una función moral muy clara dentro de la tradición salvadoreña: recuerda a quien anda por caminos oscuros —literal y metafóricamente— que una vida de vicios, infidelidades y maltratos tiene consecuencias, y que la fe, representada en esa oración protectora, sigue siendo el refugio más seguro frente al miedo de la noche.",

      /* El Padre sin Cabeza */
      "ley.data.padre_sin_cabeza.title": "El Padre sin Cabeza",
      "ley.data.padre_sin_cabeza.sub": "El sacerdote que vaga sin descanso",
      "ley.data.padre_sin_cabeza.tag": "Espíritu · Pueblos coloniales",
      "ley.data.padre_sin_cabeza.chip1": "Sacerdote decapitado",
      "ley.data.padre_sin_cabeza.chip2": "Monta un caballo negro",
      "ley.data.padre_sin_cabeza.chip3": "Cascos coloniales",
      "ley.data.padre_sin_cabeza.chip4": "Penitencia eterna",
      "ley.data.padre_sin_cabeza.origin": "Pueblos con fuerte herencia colonial, como Suchitoto y otros cascos históricos del país.",
      "ley.data.padre_sin_cabeza.relato": "En los pueblos con más historia colonial de El Salvador, como Suchitoto, donde las calles todavía conservan sus adoquines de piedra y las iglesias centenarias dominan la plaza principal, se cuenta la historia de un sacerdote que, hace siglos, cometió una falta tan grave que ni la muerte pudo darle descanso. Le conocen como el Padre sin Cabeza, y su condena es vagar eternamente, montado sobre un caballo negro que galopa sin hacer ningún ruido, por las mismas calles que una vez recorrió con vida.\n\nNadie en el pueblo sabe con certeza qué fue exactamente lo que hizo aquel sacerdote para merecer semejante castigo: algunos hablan de un pecado imperdonable cometido dentro de la propia iglesia, otros de una traición a su fe o a alguien que confiaba en él. Lo que todos coinciden en contar es el castigo: perdió su cabeza para siempre, y desde entonces recorre las calles empedradas sin ella, vestido con su sotana oscura, mientras el caballo avanza silencioso bajo la luz de la luna.\n\nSu aparición trae consigo un frío intenso e inexplicable que se siente en el aire incluso en las noches más calurosas del verano salvadoreño. Los pocos que aseguran haberlo visto describen la silueta inconfundible de un jinete sin cabeza recorriendo la plaza principal o las callejuelas cercanas a la iglesia justo después de la medianoche, sin detenerse jamás, sin mirar a nadie, cumpliendo un recorrido que parece repetirse noche tras noche desde hace generaciones.\n\nExisten distintas versiones sobre el propósito de su eterno peregrinar: algunos cuentan que busca desesperadamente una confesión que nunca pudo hacer en vida, otros aseguran que simplemente cumple su penitencia en silencio, sin posibilidad alguna de comunicarse con los vivos que se cruzan en su camino, condenado a repetir el mismo trayecto sin final.\n\nEsta leyenda refleja algo muy propio de los pueblos coloniales salvadoreños: el peso enorme que tuvo la Iglesia en la vida cotidiana durante siglos, y sirve como un recordatorio simbólico muy directo: ninguna falta, ni siquiera la cometida por una autoridad religiosa respetada, queda sin consecuencia, aunque esa consecuencia tenga que perseguir a su culpable durante toda la eternidad.",

      /* El Sombrerón */
      "ley.data.sombreron.title": "El Sombrerón",
      "ley.data.sombreron.sub": "El pequeño jinete de sombrero enorme",
      "ley.data.sombreron.tag": "Criatura · Caminos nocturnos",
      "ley.data.sombreron.chip1": "Sombrero descomunal",
      "ley.data.sombreron.chip2": "Trenza los caballos",
      "ley.data.sombreron.chip3": "Ronda las calles",
      "ley.data.sombreron.chip4": "Asusta animales",
      "ley.data.sombreron.origin": "Leyenda compartida con otros países de Centroamérica, adaptada en la tradición oral salvadoreña de pueblos y caseríos.",
      "ley.data.sombreron.relato": "En los caseríos y pueblos pequeños de El Salvador, donde todavía hay corrales con caballos y las calles se quedan completamente a oscuras después de cierta hora, se cuenta la historia de un hombre pequeño y silencioso, vestido enteramente de negro, cuyo sombrero de ala tan ancha le cubre casi todo el rostro, dejando ver apenas la sombra de sus ojos. Le llaman el Sombrerón, y su presencia se asocia siempre con la noche y, sobre todo, con los caballos.\n\nLos dueños de fincas y corrales cuentan que, de vez en cuando, amanecen sus caballos con las crines completamente trenzadas, en nudos tan complicados y perfectos que parecen imposibles de hacer con prisa o en la oscuridad. Nadie ha visto directamente al Sombrerón haciendo este trabajo minucioso durante la noche, pero todos en el pueblo saben perfectamente a quién atribuirle esas trenzas imposibles de deshacer al día siguiente.\n\nMás inquietante todavía resulta lo que cuentan los viajeros nocturnos que caminan solos por las calles del caserío: aseguran sentir, de pronto, unos pasos detrás de ellos, siempre a la misma distancia, sin acercarse ni alejarse. Al voltear, encuentran la figura silenciosa del Sombrerón, siguiéndolos de cerca sin decir una palabra, sin hacer ademán de atacar, únicamente observando desde la sombra de su enorme sombrero. Esa persecución silenciosa, sin motivo aparente ni final claro, es quizás lo que más terror provoca entre quienes se topan con él.\n\nAunque comparte similitudes con leyendas parecidas de otros países centroamericanos, en El Salvador el Sombrerón se ha adaptado a la vida rural y ganadera de los pueblos pequeños, convirtiéndose en la explicación popular perfecta para esos nudos extraños en las crines de los caballos y para el comportamiento nervioso que a veces muestran los animales de las fincas sin ninguna razón visible.\n\nCon el tiempo, esta figura ha servido también como una advertencia más para no caminar solo por las calles oscuras del caserío después de cierta hora: porque nunca se sabe si esos pasos silenciosos que uno cree escuchar detrás son solo el eco de los propios, o si en realidad el Sombrerón ha decidido seguirte esa noche, con su sombrero enorme y su silencio inquietante, hasta la puerta misma de tu casa.",

      /* El Cuco de los Sueños */
      "ley.data.cuco_de_los_suenos.title": "El Cuco de los Sueños",
      "ley.data.cuco_de_los_suenos.sub": "El ser que se lleva a los niños desobedientes",
      "ley.data.cuco_de_los_suenos.tag": "Advertencia · Hogar",
      "ley.data.cuco_de_los_suenos.chip1": "Figura sin forma fija",
      "ley.data.cuco_de_los_suenos.chip2": "Aparece de noche",
      "ley.data.cuco_de_los_suenos.chip3": "Vigila a los niños",
      "ley.data.cuco_de_los_suenos.chip4": "Tradición oral familiar",
      "ley.data.cuco_de_los_suenos.origin": "Tradición doméstica transmitida de madres y abuelas a los niños en todo El Salvador, sin un origen geográfico único.",
      "ley.data.cuco_de_los_suenos.relato": "A diferencia de otras leyendas que se cuentan alrededor de un río, un volcán o un pueblo específico, el Cuco no tiene un lugar fijo donde vive, ni una historia de origen clara como la Siguanaba o el Cipitío. Vive, en realidad, en la imaginación de cada familia salvadoreña, y cada abuela, cada madre, lo describe un poco distinto según lo que ella misma escuchó de niña.\n\nPara algunos es una sombra alargada que se estira por las paredes del cuarto justo cuando se apaga la luz. Para otros, es un anciano encorvado que ronda las casas de noche, mirando por las ventanas para ver qué niño sigue despierto pasada su hora de dormir. Hay quienes lo imaginan sin forma definida en absoluto, como una presencia que simplemente se siente, un frío repentino en la habitación, un crujido en el techo justo cuando el niño ha decidido no obedecer a sus padres.\n\nLo único que se mantiene igual en cada versión de la historia es su propósito: el Cuco existe para que los niños se porten bien, se duerman a la hora que les corresponde, y no le hagan travesuras a sus padres. \"Pórtate bien o te lleva el Cuco\" es una frase que casi cualquier salvadoreño escuchó de pequeño, susurrada justo antes de apagar la luz, con esa mezcla exacta de cariño y advertencia que solo una madre o una abuela saben transmitir.\n\nA diferencia de figuras como la Siguanaba o el Cadejo, que castigan comportamientos de adultos —la infidelidad, la mala vida, los vicios—, el Cuco cumple una función exclusivamente dentro del hogar: es el guardián invisible del buen comportamiento infantil, el recordatorio nocturno de que hay reglas que cumplir y horarios que respetar, incluso cuando los padres ya no están repitiéndolo en voz alta.\n\nAunque ha perdido fuerza frente a otras historias más elaboradas del folclore salvadoreño, el Cuco sigue vivo en el anecdotario familiar de muchísimas casas del país. Todavía hoy, en noches donde un niño se resiste a dormir, alguna abuela sonríe con complicidad y repite la misma advertencia que ella escuchó de pequeña: que ahí afuera, en la oscuridad del cuarto, el Cuco anda esperando a los que no se portan bien.",
    },

    en: {
      "meta.title": "Salvadorean Roots — Home",
      "meta.description": "Salvadorean Roots — Discover the essence of El Salvador.",

      "nav.inicio": "Home",
      "nav.categorias": "Categories",
      "nav.mapa": "Map",
      "nav.calendario": "Calendar",
      "nav.menu": "Menu",
      "nav.principal": "Main",
      "nav.explorar": "Explore",
      "nav.miCuenta": "My account",
      "nav.iniciarSesion": "Log In",
      "nav.registrarse": "Sign Up",
      "nav.abrirMenu": "Open menu",
      "nav.cerrarMenu": "Close menu",
      "nav.recetario": "Recipes",
      "nav.quiz": "Cultural Quiz",
      "nav.cerrar": "Close",
      "nav.principales": "Main",
      "nav.publicaciones": "Posts",
      "nav.juegos": "Interactive Games",
      "nav.invitado": "Guest",
      "nav.iniciarSesionCaption": "Log in",
      "nav.verPerfil": "View my profile",
      "nav.conectado": "Signed in",
      "nav.miPerfil": "My profile",
      "nav.cerrarSesion": "Log out",

      "hero.title": "Welcome to Salvadorean Roots",
      "hero.subtitle": "Our heritage, our pride.",
      "hero.cta": "Explore Cultures",
      "hero.scroll": "Scroll",

      "home.logoAlt": "Salvadorean Roots Logo",

      "about.title": "What is Salvadorean Roots?",
      "about.text": "Salvadorean Roots is a digital space that connects people with the essence of El Salvador, allowing them to discover, learn, and share its culture through an interactive experience.",

      "stats.categorias": "Cultural categories",
      "stats.departamentos": "Departments represented",
      "stats.anios": "Years of history",
      "stats.leyendas": "Legends and traditions",

      "fact.eyebrow": "Did you know...?",
      "fact.text1": "El Salvador is known as the \"Tom Thumb of the Americas\" because of its small territorial size.",

      "badge.title": "Information for you",

      "cards.sitios": "Cultural Sites",
      "cards.gastronomia": "Gastronomy",
      "cards.eventos": "Cultural Events",
      "cards.historia": "History",
      "cards.leyendas": "Legends",
      "cards.explorar": "Explore",

      "footer.copy": "© 2026 Salvadorean Roots — Our heritage, our pride.",
      "footer.juegos": "Games",

      "lang.switchTo": "ES",
      "lang.label": "Language",

      /* ── Page: Interactive Games ── */
      "jue.meta.title": "Salvadorean Roots — Interactive Games",
      "jue.meta.description": "Salvadorean Roots — Put your reflexes and skill to the test with games inspired by Salvadoran culture.",

      "jue.hero.eyebrow": "Learn by playing",
      "jue.hero.title": "Interactive Games",
      "jue.hero.subtitle": "Put your reflexes and skill to the test with games inspired by Salvadoran culture.",
      "jue.footnote": "Games from Salvadoran culture — Challenge your skills!",

      "jue.modal.close": "Close game",
      "jue.card.play": "⚡ Play Now",

      "jue.pause.tag": "Paused",
      "jue.pause.title": "Game paused",
      "jue.pause.resume": "Resume",
      "jue.pause.menu": "Menu",

      "jue.card1.tag": "Route 01 — Reflexes",
      "jue.card1.tagModal": "Route 01",
      "jue.card1.title": "Catch the Pupusa",
      "jue.card1.desc": "Move the comal quickly and catch the hot pupusas before they hit the ground. Watch out for sandals and other obstacles!",
      "jue.card1.pauseText": "Press resume to go back to catching pupusas.",

      "jue.card2.tag": "Route 02 — Strategy",
      "jue.card2.tagModal": "Route 02",
      "jue.card2.title": "Battle of the Spinning Tops",
      "jue.card2.desc": "Get ready for the clash of your life. Control your wooden top's physics and knock your rival out of the ring in a dynamic duel.",
      "jue.card2.pauseTitle": "Battle paused",
      "jue.card2.pauseText": "Press resume to continue the battle, or set up a new one.",

      "jue.card3.tag": "Route 03 — Adrenaline",
      "jue.card3.tagModal": "Route 03 — Adrenaline",
      "jue.card3.title": "Bus Coaster War",
      "jue.card3.titleModal": "Bus Coaster War: Fight for the Fare!",
      "jue.card3.desc": "Drive your bus, pick up passengers along the way, and beat the rival bot in a frantic race through the streets of San Salvador. Watch out for potholes!",
      "jue.card3.pauseTitle": "Race Paused",
      "jue.card3.pauseText": "Don't let the competition beat you to the fare! Press resume.",

      "jue.card4.tag": "Route 04 — Memory",
      "jue.card4.tagModal": "Route 04 — Memory",
      "jue.card4.title": "Hide-and-Seek Runner",
      "jue.card4.desc": "You're \"it.\" Your friends will make a run for the base at any moment: move fast around the yard and intercept them before they reach it and get away. Don't let too many escape!",
      "jue.card4.pauseText": "Press resume to keep looking for your friends.",

      "jue.card5.tag": "Route 05 — Recess",
      "jue.card5.tagModal": "Route 05 — Recess",
      "jue.card5.title": "Corn on the Cob Run",
      "jue.card5.desc": "Run through the schoolyard grabbing corn on the cob, mangoes, and shaved ice, while dodging desks and stray balls at recess. Rack up combos and keep the rhythm going!",
      "jue.card5.pauseTitle": "Recess paused",
      "jue.card5.pauseText": "Press resume to keep the flavor race going.",

      /* ── Games: dynamic screens generated by juegos.js ── */
      "jue.card1.diff.easyDesc": "Slow fall, relaxed pace",
      "jue.card1.diff.hardDesc": "Faster, more frequent falls",
      "jue.card1.diff.sub": "Choose how fast the pupusas and other ingredients fall.",
      "jue.card1.diff.title": "🎮 Select Level",
      "jue.card1.end.high": "🏆 You're a true Salvadoran pupusa master!",
      "jue.card1.end.low": "👍 Good try, keep practicing so you don't burn the pupusas!",
      "jue.card1.end.mid": "🌟 Excellent, you're almost cooking like the experts from Olocuilta.",
      "jue.card1.intro": "Move the comal side to side with the mouse (or your finger) to catch what falls from the sky.",
      "jue.card1.ruleBad": "Avoid <strong>🩴 sandals</strong>, <strong>🪨 rocks</strong>, and <strong>🦴 bones</strong> — they cost you a life.",
      "jue.card1.ruleGood": "Catch <strong>🫓 pupusas</strong>, <strong>🧀 quesillo</strong>, and <strong>🌽 corn</strong> — they add points.",
      "jue.card2.bestOf3": "Best of 3",
      "jue.card2.bestOf5": "Best of 5",
      "jue.card2.chooseDiffTag": "Choose Difficulty",
      "jue.card2.configTag": "Setup",
      "jue.card2.controlsP1": "Player 1: <strong>WASD</strong> keys to move the top.",
      "jue.card2.controlsP2": "Player 2 (or NPC): <strong>arrow</strong> keys ⬅️⬆️➡️⬇️.",
      "jue.card2.diff.easyDesc": "Slow, predictable NPC",
      "jue.card2.diff.hardDesc": "Expert NPC (Impossible Mode)",
      "jue.card2.diff.medDesc": "Fast and precise NPC",
      "jue.card2.diff.sub": "Choose how sharp the AI's reflexes will be.",
      "jue.card2.diff.title": "🎮 Select Your Challenge",
      "jue.card2.end.loseNpc": "🔴 The Salvadoran NPC has beaten you ({r} - {p})",
      "jue.card2.end.losePvp": "🔴 Player 2 wins the duel! ({r} - {p})",
      "jue.card2.end.rematch": "Ready for a rematch?",
      "jue.card2.end.tag": "End of Battle",
      "jue.card2.end.win": "🟢 Congratulations! You've won the duel ({p} - {r})",
      "jue.card2.intro": "Push your top against your rival's to knock it out of the ring. The first one to fall or get knocked out loses the round.",
      "jue.card2.mode.pve": "🤖 vs NPC",
      "jue.card2.mode.pveDesc": "Face the practice AI",
      "jue.card2.mode.pvp": "👥 2 Players",
      "jue.card2.mode.pvpDesc": "Compete locally",
      "jue.card2.mode.sub": "How do you want to play?",
      "jue.card2.nextRound": "Next Round",
      "jue.card2.npcEasy": "🟢 NPC - Easy",
      "jue.card2.npcHard": "🔴 NPC - Expert",
      "jue.card2.npcMedium": "🟡 NPC - Normal",
      "jue.card2.p1Short": "P1",
      "jue.card2.player1": "🟢 Player 1",
      "jue.card2.player2": "🔴 Player 2",
      "jue.card2.prepareBattle": "Prepare Battle",
      "jue.card2.rivalShort": "Riv",
      "jue.card2.rivalShort2": "Rival",
      "jue.card2.rivalTag": "🔴 Rival",
      "jue.card2.round1": "1 Round",
      "jue.card2.roundEndTag": "Round Over",
      "jue.card2.roundEndTitle": "Round {n} finished",
      "jue.card2.rounds.sub": "The first to win more than half of the selected rounds takes the victory.",
      "jue.card2.rounds.title": "🏁 How many rounds should we play?",
      "jue.card2.scoreLabel": "Score",
      "jue.card2.selectModeTag": "Select Mode",
      "jue.card2.titleModal": "Battle of the Spinning Tops SV",
      "jue.card2.winnerLabel": "Winner",
      "jue.card3.controlsAccel": "<strong>W</strong> or up arrow: accelerate. <strong>S</strong> or down arrow: brake.",
      "jue.card3.controlsLane": "<strong>A</strong>/<strong>D</strong> or arrows ⬅️➡️: change lanes.",
      "jue.card3.diff.easy": "🟢 Calm",
      "jue.card3.diff.easyDesc": "Goes slow",
      "jue.card3.diff.hard": "🔴 Rush Hour",
      "jue.card3.diff.hardDesc": "Drives like crazy",
      "jue.card3.diff.medDesc": "Tries to overtake you",
      "jue.card3.diff.medium": "🟡 In a Hurry",
      "jue.card3.diff.sub": "Adjust the rival driver's skill level.",
      "jue.card3.diff.title": "🚦 How fast is your rival?",
      "jue.card3.distCoast": "Coast to Coast (5000m)",
      "jue.card3.distExpress": "Express (1000m)",
      "jue.card3.distNormal": "Normal (2500m)",
      "jue.card3.distance.sub": "How long should the route be?",
      "jue.card3.distance.title": "🏁 Choose the Distance",
      "jue.card3.end.loseMsg": "The 101-D got there first this time. Watch out for potholes next time!",
      "jue.card3.end.loseTitle": "🏁 They beat you to the fare...",
      "jue.card3.end.tag": "End of the Race",
      "jue.card3.end.winMsg": "The Route 44 got there first! You picked up <b>{n}</b> passengers along the way.",
      "jue.card3.end.winTitle": "🏆 TOTAL VICTORY!",
      "jue.card3.intro": "Drive your bus to get there before the Route 101-D. Dodge potholes and pick up passengers along the way.",
      "jue.card3.prepareMotorTag": "Start the Engine",
      "jue.card3.routeBot": "🚍 Route 101-D (Bot)",
      "jue.card3.routePlayer": "🚌 Route 44 (You)",
      "jue.card3.titleModal2": "Bus Coaster War SV",
      "jue.card4.baseLabel": "BASE!",
      "jue.card4.caught": "Caught",
      "jue.card4.diff.easyDesc": "Catch 6 friends, they run slow",
      "jue.card4.diff.hardDesc": "Catch 10 friends, barely any breathing room",
      "jue.card4.diff.medDesc": "Catch 8 friends, they run more often",
      "jue.card4.diff.sub": "Harder means they run to the base faster and you get fewer allowed escapes.",
      "jue.card4.diff.title": "🏃 How fast are your friends?",
      "jue.card4.end.caughtOf": "You caught {c} of {t} friends.",
      "jue.card4.end.high": "🌟 You're the best \"it\" in the neighborhood, nobody gets away from you.",
      "jue.card4.end.low": "Keep practicing your reflexes for the next round of hide-and-seek.",
      "jue.card4.end.mid": "👍 Good chase, you almost caught them all!",
      "jue.card4.end.tag": "End of Game",
      "jue.card4.end.timeUp": "⏰ Time's up!",
      "jue.card4.end.tooMany": "🏁 Too many got away!",
      "jue.card4.end.win": "🏆 You caught them all before they reached base!",
      "jue.card4.escaped": "Got away",
      "jue.card4.intro": "You're \"it.\" Your friends are hiding all over the yard and at any moment they'll make a run for the base to save themselves. Move with the <strong>WASD</strong> keys or the <strong>arrow keys</strong> and intercept them before they get there.",
      "jue.card4.ruleBad": "If a friend reaches the base, they're safe and you lose points. If too many get away, you lose the game.",
      "jue.card4.ruleGood": "Touch the friends who are running before they reach the base — every catch adds points.",
      "jue.card5.diff.easyDesc": "Calm recess",
      "jue.card5.diff.hardDesc": "Full-speed recess",
      "jue.card5.diff.sub": "How busy will recess be today?",
      "jue.card5.diff.title": "Select Level",
      "jue.card5.end.high": "🏆 You're the recess champion, nobody beats you at corn on the cob!",
      "jue.card5.end.low": "👍 Good try, keep practicing for the next recess!",
      "jue.card5.end.mid": "🌟 Nice rhythm! You're almost through the whole recess.",
      "jue.card5.end.title": "The bell just rang!",
      "jue.card5.intro": "Move between the yard's 3 lanes with the <strong>A</strong>/<strong>D</strong> keys, the arrows ⬅️➡️, or tapping the sides of the screen on your phone. Grab the good stuff from recess and dodge what gets in your way.",
      "jue.card5.ruleBad": "Avoid <strong>🪑 desks</strong>, <strong>⚽ stray balls</strong>, and <strong>🧹 the janitor's broom</strong> — they cost you a life and your combo.",
      "jue.card5.ruleGood": "Grab <strong>🌽 corn on the cob</strong>, <strong>🥭 mangoes</strong>, <strong>🍧 shaved ice</strong>, and <strong>🍬 candy</strong> — they add points and combo.",
      "jue.continue": "Continue",
      "jue.controls.title": "Controls",
      "jue.diff.chooseTag": "Choose your difficulty",
      "jue.diff.easy": "🟢 Easy",
      "jue.diff.easyTag": "🟢 Easy Level",
      "jue.diff.hard": "🔴 Hard",
      "jue.diff.hardTag": "🔴 Hard Level",
      "jue.diff.medium": "🟡 Normal",
      "jue.diff.tag": "Difficulty",
      "jue.end.playAgain": "Play Again",
      "jue.end.playAgain2": "Play Again",
      "jue.end.title": "Game over!",
      "jue.hud.combo": "Combo",
      "jue.hud.level": "Level",
      "jue.hud.lives": "Lives",
      "jue.hud.passengers": "Passengers",
      "jue.hud.points": "Points",
      "jue.hud.round": "Round",
      "jue.hud.time": "Time",
      "jue.next": "Next",
      "jue.rematch": "Rematch",
      "jue.rules.title": "Game rules",

      /* ── Page: Cultural Events ── */
      "evp.welcome.eyebrow": "Salvadorean Roots — Cultural Events",
      "evp.welcome.title": "Celebration and Tradition",
      "evp.welcome.sub": "A living calendar of celebrations that beat in the Salvadoran heart all year long",
      "evp.welcome.stat1": "Celebrations",
      "evp.welcome.stat2": "Months of the year",
      "evp.welcome.stat3": "Municipalities that celebrate",
      "evp.welcome.factLabel": "Did you know?",
      "evp.welcome.cta": "See celebrations →",
      "evp.welcome.hint": "or press <kbd>Esc</kbd> to skip",
      "evp.fact.0": "The Agostinas Festivities gather thousands of people every August in honor of the Divine Savior of the World.",
      "evp.fact.1": "During Holy Week, sawdust carpets are made that can take days to complete.",
      "evp.fact.2": "Tonacatepeque's Calabiuza recreates Salvadoran legends with masks and night parades.",
      "evp.fact.3": "The Day of the Little Lanterns lights up the streets of Ciudad Barrios with thousands of handmade lanterns.",
      "evp.fact.4": "The Indigo Festival in Suchitoto celebrates the dye that gave El Salvador international fame.",
      "evp.tabsLabel": "Which event would you like to learn about? (15 celebrations across El Salvador, 2026)",
      "evp.tabsPrev": "Previous",
      "evp.tabsNext": "Next",
      "evp.verMapa": "View on map",
      "evp.verPublicaciones": "View posts",
      "evp.revisarCalendario": "Check the calendar",

      "ev.agostinas.title": "Agostinas Festivities",
      "ev.agostinas.sub": "August 1–6, 2026 — The country's biggest festivities",
      "ev.agostinas.chip1": "Aug 1–6, 2026",
      "ev.agostinas.chip2": "San Salvador and the whole country",
      "ev.agostinas.chip3": "Processions, fair and culture",
      "ev.agostinas.p1": "The Agostinas Festivities are San Salvador's patron saint celebrations and one of El Salvador's most important festivities. They take place every year from August 1 to 6 in honor of the Divine Savior of the World, patron of the capital and of the Republic, bringing together thousands of Salvadorans and national and international visitors.",
      "ev.agostinas.p2": "The central act of the festivities is the traditional Transfiguration of the Divine Savior of the World, celebrated on August 5 in front of the Metropolitan Cathedral. This religious ceremony represents the transformation of Jesus Christ on Mount Tabor and is one of the most solemn and anticipated moments of the entire festivity, accompanied by processions, masses and acts of faith.",
      "ev.agostinas.p3": "Besides the religious celebrations, the Agostinas Festivities offer concerts, cultural shows, parades, artistic performances, carnival rides and a large popular fair. In and around the SívarLand amusement park, visitors enjoy attractions, crafts and a wide variety of traditional Salvadoran food, such as pupusas, elotes locos, riguas, fried yuca, tamales and traditional sweets.",
      "ev.agostinas.p4": "During this week, sports events, recreational activities and cultural expressions that strengthen national identity also take place. The Agostinas Festivities represent a combination of faith, tradition, culture and family togetherness, establishing themselves as one of El Salvador's most emblematic and representative celebrations.",

      "ev.semanaSanta.title": "Holy Week",
      "ev.semanaSanta.sub": "March 29 – April 5, 2026 — Faith and tradition on every street",
      "ev.semanaSanta.chip1": "Mar 29–Apr 5, 2026",
      "ev.semanaSanta.chip2": "Processions",
      "ev.semanaSanta.chip3": "Sawdust carpets",
      "ev.semanaSanta.p1": "Holy Week is one of El Salvador's most important religious and cultural celebrations. During these days, thousands of the faithful take part in processions, masses and reenactments of the Passion, Death and Resurrection of Jesus Christ, keeping alive traditions passed down from generation to generation.",
      "ev.semanaSanta.p2": "One of the most representative expressions is the making of handcrafted carpets from dyed sawdust, flowers, salt, fruit and other natural materials. These colorful works of art decorate the streets the processions pass through and are especially renowned in towns such as Nahuizalco, Sonsonate, Izalco, Panchimalco and other parts of the country.",
      "ev.semanaSanta.p3": "The Palm Sunday, Holy Thursday, Good Friday and Easter Sunday processions gather thousands of people who accompany the religious images amid chants, incense and sacred music. At the same time, many families take advantage of the holiday period to visit beaches, mountains and tourist towns, turning Holy Week into a time of faith, rest and family togetherness.",
      "ev.semanaSanta.p4": "During this season it is also traditional to enjoy typical Lenten food, with dishes such as fish, torrejas, riguas, jocotes in honey, mangoes in honey and other handmade sweets. Holy Week is an opportunity to strengthen faith, preserve religious customs and value the cultural heritage that sets El Salvador apart.",

      "ev.independencia.title": "Independence Day",
      "ev.independencia.tabTitle": "Independence",
      "ev.independencia.sub": "September 15, 2026 — National pride",
      "ev.independencia.chip1": "Sept 15, 2026",
      "ev.independencia.chip2": "School parades",
      "ev.independencia.chip3": "Torch of Freedom",
      "ev.independencia.p1": "September 15 is one of El Salvador's most important civic dates, as it commemorates Central America's Independence, proclaimed in 1821. Patriotic acts take place throughout the country that strengthen the sense of national identity and recall the shared history of the Central American nations.",
      "ev.independencia.p2": "One of the most representative traditions is the route of the Central American Torch of Freedom, a symbol of independence and regional unity. The flame travels through the Central American countries in relays organized by students, athletes and institutions, arriving in El Salvador as part of the national celebrations.",
      "ev.independencia.p3": "The streets of cities and towns fill with color with student parades, peace bands, majorettes, baton twirlers, civic battalions and artistic performances. Thousands of people gather to enjoy the civic acts while public buildings, schools and homes are decorated with the national flag and other patriotic symbols.",
      "ev.independencia.p4": "On this date, official ceremonies, flag raisings, renditions of the National Anthem and cultural activities highlighting history, civic values and pride in being Salvadoran also take place. This celebration strengthens respect for the homeland and passes on to new generations the importance of preserving national identity.",

      "ev.diaMuertos.title": "Day of the Dead",
      "ev.diaMuertos.sub": "November 1–2, 2026 — Remembering those who are gone",
      "ev.diaMuertos.chip1": "Nov 1–2, 2026",
      "ev.diaMuertos.chip2": "Cemeteries",
      "ev.diaMuertos.chip3": "Floral offerings",
      "ev.diaMuertos.p1": "All Saints' Day, celebrated on November 1, and the Day of the Dead, on November 2, are dates of great significance for Salvadoran families. During these days it is traditional to visit cemeteries to remember loved ones, cleaning and decorating their graves with fresh flowers, wreaths, candles and special arrangements.",
      "ev.diaMuertos.p2": "In many towns across the country, masses, prayers and religious acts are also held in honor of the deceased. Cemeteries fill with families sharing moments of remembrance and reflection, creating an atmosphere of respect, togetherness and hope where the memory of loved ones stays alive.",
      "ev.diaMuertos.p3": "Many families take the occasion to gather and share traditional food after visiting the cemetery. In addition, some places organize cultural activities, musical performances and artistic expressions related to popular traditions, strengthening the sense of community and respect for Salvadoran customs.",
      "ev.diaMuertos.p4": "This commemoration is one of the most important moments in El Salvador's religious and cultural calendar, as it promotes the preservation of family traditions, tribute to those who have passed and the transmission of these values to new generations.",

      "ev.navidad.title": "Christmas and Posadas",
      "ev.navidad.sub": "December 2026 — The most magical time of the year",
      "ev.navidad.chip1": "Dec 16–24, 2026",
      "ev.navidad.chip2": "Posadas and nativity scenes",
      "ev.navidad.chip3": "Christmas tamales",
      "ev.navidad.p1": "Christmas in El Salvador is one of the year's most important family and religious celebrations. From the first days of December, homes, churches and communities are decked out with lights, trees, nativity scenes and other elements that create an atmosphere full of joy, togetherness and hope.",
      "ev.navidad.p2": "Between December 16 and 24 the traditional posadas are celebrated, representing Joseph and Mary's journey in search of a place to stay before the birth of Jesus. During these gatherings, novenas are prayed, carols are sung, processions with religious images take place, and typical food is shared among neighbors and family.",
      "ev.navidad.p3": "Christmas Eve, December 24, is the most anticipated moment of the celebration. Families gather to share a special dinner featuring chicken tamales, turkey, panes con pollo, fruit punch, hot chocolate and a wide variety of traditional sweets. At midnight it is common to light fireworks and share hugs to celebrate the birth of Baby Jesus.",
      "ev.navidad.p4": "Throughout the season, Christmas concerts, festivals, fairs, community activities and nativity reenactments are also organized. These traditions strengthen family togetherness, faith and Salvadoran cultural identity, making Christmas one of the country's most anticipated and meaningful times of year.",

      "ev.fiestasJulias.title": "Santa Ana's July Festivities",
      "ev.fiestasJulias.sub": "July 26, 2026 — The Heroic City celebrates",
      "ev.fiestasJulias.chip1": "July 26, 2026",
      "ev.fiestasJulias.chip2": "Santa Ana",
      "ev.fiestasJulias.chip3": "Patron saint festivity",
      "ev.fiestasJulias.p1": "The July Festivities are Santa Ana's patron saint celebrations, held in honor of Our Lady Saint Ann, patroness of the municipality. For several days, the Heroic City fills with religious, cultural and recreational activities that bring together thousands of visitors from all over the country.",
      "ev.fiestasJulias.p2": "Among the most notable activities are solemn processions, masses, mail parades, allegorical floats, the election and coronation of the festival queen, concerts, carnival rides and artistic performances. In addition, the fairgrounds offer spaces for family entertainment, while parks and plazas host craft exhibitions and a varied showcase of traditional Salvadoran food.",
      "ev.fiestasJulias.p3": "The July Festivities also showcase Santa Ana's important architectural heritage, such as its imposing neo-Gothic Cathedral, the Santa Ana National Theater and the Municipal Palace, buildings that become the setting for various cultural activities during the celebration.",
      "ev.fiestasJulias.p4": "Considered one of El Salvador's most important patron saint festivities, the July Festivities strengthen the cultural identity of the people of Santa Ana, boost tourism and contribute to the city's economic development through trade, gastronomy and traditional artistic expressions.",

      "ev.carnavalSm.title": "Great Carnival of San Miguel",
      "ev.carnavalSm.sub": "Last Saturday of November — Central America's biggest carnival",
      "ev.carnavalSm.chip1": "Nov 28, 2026",
      "ev.carnavalSm.chip2": "San Miguel",
      "ev.carnavalSm.chip3": "Live orchestras",
      "ev.carnavalSm.p1": "The Great Carnival of San Miguel is the most important celebration of the patron saint festivities dedicated to Our Lady of Peace, patroness of the city. Considered Central America's biggest carnival, it brings together hundreds of thousands of people every year who enjoy a night full of music, dancing and tradition on San Miguel's main streets.",
      "ev.carnavalSm.p2": "During the carnival, dozens of national and international orchestras, musical groups, DJs and artists from different genres perform on multiple stages throughout the city. In addition, dance troupes, allegorical floats, peace bands, light shows and parades fill the streets with color and joy, making the event one of the country's greatest cultural expressions.",
      "ev.carnavalSm.p3": "The celebration also stands out for its varied food offerings, where visitors can enjoy pupusas, fried yuca with chicharrón, elotes locos, riguas, atol de elote, minutas and many other typical foods. Artisans and entrepreneurs take the occasion to display and sell products made in different regions of El Salvador.",
      "ev.carnavalSm.p4": "The Great Carnival of San Miguel is an important boost for tourism and the local economy, attracting national and foreign visitors. Beyond the party, it symbolizes the identity, hospitality and cheerful spirit of the people of San Miguel, establishing itself as one of El Salvador's most emblematic cultural events.",

      "ev.maizSuchitoto.title": "Suchitoto Corn Festival",
      "ev.maizSuchitoto.sub": "August — Tradition, gastronomy and Salvadoran culture",
      "ev.maizSuchitoto.chip1": "Food Festival",
      "ev.maizSuchitoto.chip2": "Suchitoto, Cuscatlán",
      "ev.maizSuchitoto.chip3": "Salvadoran Tradition",
      "ev.maizSuchitoto.p1": "The <strong>Suchitoto Corn Festival</strong> is one of the municipality's most representative food and cultural celebrations. Every year it brings together hundreds of national and foreign visitors to pay tribute to corn, regarded since ancient times as the staple food of Mesoamerican identity and culture.",
      "ev.maizSuchitoto.p2": "During the festival, the streets and squares of the historic center fill with color from stalls selling traditional corn-based food. Attendees can sample a wide variety of traditional dishes such as pupusas, riguas, atol de elote, tamales, ticucos, elotes locos, enchiladas, torrejas, atol shuco, chilate and many other recipes that are part of Salvadoran culinary heritage.",
      "ev.maizSuchitoto.p3": "Besides the food offerings, the event includes artistic performances, live music, folk dancing, dance groups, local crafts, activities for the whole family, traditional cooking contests and spaces where producers and entrepreneurs showcase corn-based products and other food made in the area.",
      "ev.maizSuchitoto.p4": "The festival also seeks to preserve agricultural traditions and strengthen the local economy, giving artisans, farmers and small merchants an opportunity to share with visitors the cultural richness of Suchitoto, one of the towns with the greatest historical and tourist value in El Salvador.",

      "ev.calabiuza.title": "Day of the Calabiuza",
      "ev.calabiuza.sub": "November 1, 2026 — The legends come to life",
      "ev.calabiuza.chip1": "Nov 1, 2026",
      "ev.calabiuza.chip2": "Tonacatepeque, San Salvador",
      "ev.calabiuza.chip3": "Night parade",
      "ev.calabiuza.p1": "The Day of the Calabiuza is one of the most emblematic celebrations of Salvadoran folklore. Every November 1, the streets of Tonacatepeque fill with characters inspired by national legends, such as la Siguanaba, el Cadejo, el Cipitío, la Carreta Chillona and other traditional beings who parade amid music, torches and colorful costumes.",
      "ev.calabiuza.p2": "The festivity began as an initiative to rescue popular legends and the customs related to the Day of the Dead. Its name comes from the \"calabiuza,\" a carved pumpkin lit with candles that children once used to go door to door asking for ayote in honey and other traditional treats.",
      "ev.calabiuza.p3": "During the celebration there are also artistic performances, live music, theater, craft sales and a wide showcase of traditional Salvadoran food. Thousands of national and foreign visitors take part every year, making this event one of El Salvador's most important cultural festivals and a space for preserving the country's identity and traditions.",

      "ev.farolitos.title": "Day of the Little Lanterns",
      "ev.farolitos.sub": "September 7, 2026 — Ataco lights up",
      "ev.farolitos.chip1": "Sept 7, 2026",
      "ev.farolitos.chip2": "Concepción de Ataco, Central Ahuachapán",
      "ev.farolitos.chip3": "Handmade lanterns",
      "ev.farolitos.p1": "The Day of the Little Lanterns is one of El Salvador's most representative traditions, celebrated every September 7 in honor of the birth of the Virgin Mary. Concepción de Ataco, one of the most emblematic towns on the Flower Route, becomes the main stage for this festivity, lighting up its streets with thousands of handmade lanterns.",
      "ev.farolitos.p2": "Entire families, businesses, schools and communities craft colorful paper, wood and other material lanterns, decorating them with traditional figures, flowers and religious symbols. As night falls, the lanterns are lit all at once, creating an atmosphere full of light, color and deep spiritual and cultural meaning.",
      "ev.farolitos.p3": "Besides the light show, the celebration includes parades, music and folk dance performances, religious activities, craft exhibitions and a varied offering of traditional Salvadoran food. Among the most popular dishes are pupusas, elotes locos, riguas, atol de elote and traditional sweets made by local entrepreneurs.",
      "ev.farolitos.p4": "Over the years, the Day of the Little Lanterns has become one of the country's most important tourist events, drawing thousands of national and foreign visitors who want to experience a tradition that reflects the faith, creativity and cultural identity of Salvadorans.",

      "ev.festivalAnil.title": "Indigo Festival",
      "ev.festivalAnil.sub": "October 4, 2026 — Suchitoto's blue gold",
      "ev.festivalAnil.chip1": "Oct 4, 2026",
      "ev.festivalAnil.chip2": "Suchitoto, Cuscatlán",
      "ev.festivalAnil.chip3": "Handcrafted dyeing",
      "ev.festivalAnil.p1": "The Indigo Festival, held in Suchitoto, pays tribute to \"blue gold,\" the indigo that during the 17th, 18th and 19th centuries was one of El Salvador's main export products and a fundamental pillar of its economy. This celebration seeks to preserve the history and promote knowledge of a tradition that shaped the country's development.",
      "ev.festivalAnil.p2": "During the festival, artisans and specialists give demonstrations of the traditional indigo extraction and dyeing process, from fermenting the plant to obtaining its characteristic blue pigment. Visitors can also take part in workshops making handkerchiefs, T-shirts and other handcrafted dyed pieces.",
      "ev.festivalAnil.p3": "The event includes textile and craft exhibitions, tours of old indigo workshops, historical talks and artistic performances showcasing the cultural importance of this crop. In addition, local entrepreneurs offer products made with natural dyes and various creations inspired by Suchitoto's indigo heritage.",
      "ev.festivalAnil.p4": "The celebration is rounded out with live music, folk dance, traditional Salvadoran food and family activities, becoming an experience that brings together history, art, tourism and tradition. Thanks to this festival, Suchitoto continues preserving indigo's legacy and promoting one of El Salvador's most representative cultural expressions.",

      "ev.festivalBarro.title": "Clay Festival",
      "ev.festivalBarro.sub": "November 8, 2026 — Ilobasco's pottery tradition",
      "ev.festivalBarro.chip1": "Nov 8, 2026",
      "ev.festivalBarro.chip2": "Ilobasco, Cabañas",
      "ev.festivalBarro.chip3": "Clay miniatures",
      "ev.festivalBarro.p1": "The Clay Festival is one of Ilobasco's most important craft celebrations and pays tribute to the master potters who, for generations, have preserved the art of working with clay. This municipality is known both within and outside El Salvador for making the famous miniatures known as \"sorpresas,\" pieces that hide small scenes of everyday life inside.",
      "ev.festivalBarro.p2": "During the festival, visitors can tour family workshops observing every stage of the craft process, from preparing the clay and molding the figures to drying, firing in traditional wood-fired kilns and hand painting. Many artisans also offer workshops for children and adults to try this ancestral technique.",
      "ev.festivalBarro.p3": "The celebration includes pottery contests, exhibitions of traditional and contemporary pieces, craft fairs, live music, folk dances and a wide showcase of traditional Salvadoran food. It's also an important opportunity for artisans to sell their creations directly and promote Ilobasco's cultural heritage.",
      "ev.festivalBarro.p4": "Thanks to the quality and originality of their work, Ilobasco's pottery has become one of the most representative symbols of Salvadoran craftsmanship. The Clay Festival helps preserve this legacy, strengthen the local economy and connect new generations with a tradition that is part of El Salvador's cultural identity.",

      "ev.floresPalmas.title": "Festival of Flowers and Palms",
      "ev.floresPalmas.sub": "May 10, 2026 — The start of the rainy season",
      "ev.floresPalmas.chip1": "May 10, 2026",
      "ev.floresPalmas.chip2": "Panchimalco, San Salvador",
      "ev.floresPalmas.chip3": "Procession of the Palms",
      "ev.floresPalmas.p1": "The Festival of Flowers and Palms is one of Panchimalco's oldest and most representative traditions. Every year it brings together hundreds of residents and visitors to celebrate a festivity that combines the Catholic faith with indigenous customs inherited from the Nahua-Pipil people, becoming a unique expression of Salvadoran cultural heritage.",
      "ev.floresPalmas.p2": "The traditional Procession of the Palms travels the town's main streets to the historic colonial church of Santa Cruz de Roma. Participants carry palms decorated with wildflowers, leaves, fruits and colorful handcrafted ornaments, as a symbol of gratitude for the harvests and hope for the start of the rainy season.",
      "ev.floresPalmas.p3": "During the celebration there are also folk dance performances, traditional music, religious ceremonies, craft exhibitions and a food fair where visitors can sample typical Salvadoran dishes prepared by the town's residents. These activities boost tourism and help preserve the traditions that have characterized Panchimalco for generations.",
      "ev.floresPalmas.p4": "Thanks to its cultural and historical richness, this festival is considered one of the most important expressions of El Salvador's indigenous identity. The combination of religious elements, ancestral customs and community participation makes this celebration an experience that reflects the country's diversity and cultural legacy.",

      "ev.chicharron.title": "International Chicharrón Festival",
      "ev.chicharron.sub": "December 12, 2026 — Flavor and tradition in Santa Tecla",
      "ev.chicharron.chip1": "Dec 12, 2026",
      "ev.chicharron.chip2": "Santa Tecla, La Libertad",
      "ev.chicharron.chip3": "Food fair",
      "ev.chicharron.p1": "The International Chicharrón Festival is one of Santa Tecla's most popular food events and brings together thousands of visitors every year to celebrate one of the most representative dishes of Salvadoran cuisine. The festival seeks to promote national gastronomy, boost tourism and support local entrepreneurs and restaurants.",
      "ev.chicharron.p2": "During the celebration, cooks and vendors present a wide variety of dishes made with chicharrón, from the traditional recipe to innovative proposals served with fried yuca, pupusas, tacos, burgers, nachos and other typical dishes. Attendees can also sample traditional drinks and desserts made by national producers.",
      "ev.chicharron.p3": "Besides the food fair, the event offers live music, artistic performances, cultural shows, children's activities, cooking contests and spaces dedicated to local entrepreneurship. These activities make the festival a family-friendly setting that draws both national and foreign tourists.",
      "ev.chicharron.p4": "Over the years, the International Chicharrón Festival has become one of El Salvador's leading food celebrations. Its combination of tradition, culinary innovation and entertainment strengthens Santa Tecla's cultural identity and contributes to the city's economic development through tourism and local trade.",

      "ev.jocote.title": "Jocote Corona Festival",
      "ev.jocote.sub": "October 18, 2026 — Cerro Verde's emblematic fruit",
      "ev.jocote.chip1": "Oct 18, 2026",
      "ev.jocote.chip2": "Cerro Verde, Santa Ana",
      "ev.jocote.chip3": "Food fair",
      "ev.jocote.p1": "The Jocote Corona Festival is one of the most representative food celebrations of the Cerro Verde area and pays tribute to this variety of jocote, prized for its large size, sweet flavor and excellent quality. Every year it brings together producers, entrepreneurs and visitors to promote one of western El Salvador's most emblematic fruits.",
      "ev.jocote.p2": "During the festival, attendees can sample fresh jocotes and a wide variety of related products such as jocotes in honey, jams, jellies, pickles, soft drinks, desserts and other traditional recipes made by local producers. There are also tastings, food contests and exhibitions on growing and harvesting this fruit.",
      "ev.jocote.p3": "The celebration is rounded out with artistic performances, live music, folk dances, craft fairs and recreational activities for the whole family. It also gives visitors the chance to enjoy the natural scenery of Cerro Verde National Park and learn about the region's agricultural and tourist richness.",
      "ev.jocote.p4": "The Jocote Corona Festival strengthens the economy of small producers, boosts domestic tourism and helps preserve Salvadoran agricultural traditions. Thanks to this celebration, the jocote corona remains one of the most representative products of the western region and a symbol of El Salvador's natural and culinary richness.",

      /* ── Page: Gastronomy ── */
      "gap.welcome.eyebrow": "Salvadorean Roots — Gastronomy",
      "gap.welcome.title": "Flavors of El Salvador",
      "gap.welcome.sub": "16 dishes, drinks and desserts that tell the country's story in every bite",
      "gap.welcome.stat1": "Dishes",
      "gap.welcome.stat2": "UNESCO Heritage",
      "gap.welcome.stat3": "Years of tradition",
      "gap.welcome.factLabel": "Did you know?",
      "gap.welcome.cta": "Discover the dishes →",
      "gap.welcome.hint": "or press <kbd>Esc</kbd> to skip",
      "gap.fact.0": "The word \"pupusa\" comes from the Nahuatl <em>pupushawa</em>, meaning \"inflated thing.\"",
      "gap.fact.1": "National Pupusa Day is celebrated every second Sunday of November.",
      "gap.fact.2": "Salvadoran tamales are wrapped in plantain leaves, not corn husks.",
      "gap.fact.3": "Chilate preserves pre-Hispanic toasting techniques still used today.",
      "gap.fact.4": "The pupusa was declared Intangible Cultural Heritage by UNESCO.",
      "gap.tabsLabel": "Which dish would you like to learn about?",
      "gap.verReceta": "View the recipe",

      "gas.pupusas.title": "Pupusas",
      "gas.pupusas.sub": "El Salvador's national dish",
      "gas.pupusas.chip1": "Corn or rice masa",
      "gas.pupusas.chip2": "Varied fillings",
      "gas.pupusas.chip3": "With curtido and salsa",
      "gas.pupusas.chip4": "UNESCO Cultural Heritage",
      "gas.pupusas.h1": "A source of culinary pride",
      "gas.pupusas.p1": "The pupusa is El Salvador's national dish and one of the most emblematic foods of Central American cuisine. This thick stuffed corn or rice masa flatbread was declared Intangible Cultural Heritage by UNESCO. National Pupusa Day is celebrated every second Sunday of November.",
      "gas.pupusas.p2": "Its origins date back to the Pipil culture, who made these stuffed flatbreads long before the Spanish arrived. The word \"pupusa\" comes from the Nahuatl <em>pupushawa</em>, meaning \"inflated or swollen thing.\"",
      "gas.pupusas.h2": "Types of pupusas",
      "gas.pupusas.p3": "The most traditional pupusas are: cheese (the classic filling), chicharrón (seasoned ground pork), refried beans, and revuelta (a mix of cheese, chicharrón and beans). Modern variations with loroco, jalapeño, seafood and vegetables also exist.",
      "gas.pupusas.p4": "Rice pupusas have a softer texture and are especially popular in the central part of the country. They are always served with curtido (pickled cabbage slaw) and homemade tomato sauce.",
      "gas.pupusas.h3": "How they're made",
      "gas.pupusas.p5": "Making them takes skill: a portion of masa is taken, formed into a ball, flattened in the palm, filled in the center and sealed at the edges. It is then flattened into a circle and cooked on a comal over medium-high heat for about 3 minutes per side.",

      "gas.tamales.title": "Tamales",
      "gas.tamales.sub": "Festive Salvadoran tradition",
      "gas.tamales.chip1": "Corn masa",
      "gas.tamales.chip2": "Wrapped in leaf",
      "gas.tamales.chip3": "Christmas and holidays",
      "gas.tamales.chip4": "Family tradition",
      "gas.tamales.h1": "The Salvadoran tamale",
      "gas.tamales.p1": "Salvadoran tamales are different from those of other Central American countries. They are wrapped in plantain leaves (not corn husks), which gives them a distinctive flavor and aroma. The masa is made from corn cooked in lime (nixtamal), and the traditional filling includes pork or chicken with chile, olives, capers and potatoes.",
      "gas.tamales.p2": "Making tamales is a family ritual that usually involves the whole family. Grandmothers pass down their secret recipes from generation to generation, so each family has its own unique tamales.",
      "gas.tamales.h2": "Types of tamales",
      "gas.tamales.p3": "The tamal de elote is a sweet variant made with tender corn, sugar, butter and sometimes a cream filling. It's especially eaten in August during the Agostinas festivities. There is also the tamal pisque, filled only with beans, and the tamal de chipilín, which includes this aromatic herb in the masa.",
      "gas.tamales.h3": "Christmas season",
      "gas.tamales.p4": "Tamale-making reaches its peak during Christmas. It is traditional for families to gather a few days before December 24 to make the tamales that will be shared at the Christmas dinner. This communal practice, called \"tamalada,\" is a symbol of family unity.",

      "gas.sopa.title": "Sopa de Pata",
      "gas.sopa.sub": "El Salvador's most authentic flavor",
      "gas.sopa.chip1": "Beef feet",
      "gas.sopa.chip2": "With tropical vegetables",
      "gas.sopa.chip3": "Comforting broth",
      "gas.sopa.chip4": "Traditional dish",
      "gas.sopa.h1": "The most Salvadoran broth",
      "gas.sopa.p1": "Sopa de pata is considered one of the most representative and authentic dishes of Salvadoran cuisine. It's made with beef feet (hooves and knees) cooked for hours until a gelatinous, collagen-rich broth is obtained, to which vegetables such as güisquil, corn, yuca, green plantain and chipilín are added.",
      "gas.sopa.p2": "Its preparation is laborious and requires hours of slow cooking. The result is a thick, comforting, nutritious broth that Salvadorans eat especially on weekends or on special occasions.",
      "gas.sopa.h2": "Typical ingredients",
      "gas.sopa.p3": "Besides beef feet, the soup includes: chunks of tender corn, yuca, green plantain, güisquil (chayote), ejotes (green beans), chipilín (a local aromatic herb), tomato, onion, garlic and culantro (cilantro). It's seasoned with achiote to give it its characteristic reddish color.",
      "gas.sopa.h3": "Where to try it",
      "gas.sopa.p4": "Sopa de pata can be found in municipal markets all over the country, especially on Sunday mornings. In San Salvador, the Central Market and the Craft Market are good places to try authentic versions made by traditional cooks.",

      "gas.yuca.title": "Fried Yuca with Chicharrón",
      "gas.yuca.tabTitle": "Fried Yuca",
      "gas.yuca.sub": "The most popular street snack in El Salvador",
      "gas.yuca.chip1": "Fried or boiled",
      "gas.yuca.chip2": "With chicharrón",
      "gas.yuca.chip3": "With curtido",
      "gas.yuca.chip4": "Street food",
      "gas.yuca.h1": "Yuca in Salvadoran culture",
      "gas.yuca.p1": "Yuca (cassava) is a tuber of American origin that El Salvador's indigenous peoples grew long before colonization. In El Salvador it is mainly eaten fried or boiled, served with chicharrón (crispy fried pork), pickled cabbage curtido and tomato sauce.",
      "gas.yuca.p2": "It's one of the most common snacks at fairs, markets and street stalls across the country. Its creamy interior and crispy exterior, combined with the flavor of chicharrón, make it an irresistible combination.",
      "gas.yuca.h2": "Traditional preparation",
      "gas.yuca.p3": "The yuca is peeled, cut into pieces and boiled in salted water until tender. It is then fried in hot oil until golden. The chicharrón is made by frying pieces of pork with fat in its own juices until golden and crispy.",
      "gas.yuca.h3": "Variations",
      "gas.yuca.p4": "There's also yuca en caldillo, prepared in a tomato and herb broth. In some regions of the country it's served with pepián (pumpkin seed sauce), which adds a more complex, earthy flavor to the dish.",

      "gas.atol.title": "Atol de Elote",
      "gas.atol.sub": "The ancestral drink of the original peoples",
      "gas.atol.chip1": "Tender corn",
      "gas.atol.chip2": "Milk and sugar",
      "gas.atol.chip3": "Hot drink",
      "gas.atol.chip4": "Pre-Hispanic origin",
      "gas.atol.h1": "An ancestral drink",
      "gas.atol.p1": "Atol de elote is a thick, hot, pre-Hispanic drink made with ground tender corn, milk, sugar and cinnamon. Its name comes from the Nahuatl <em>atolli</em>, meaning \"watery\" or \"corn drink.\" It's one of the oldest and most deeply rooted drinks in Salvadoran culture.",
      "gas.atol.p2": "Historically it was a staple food for Mesoamerican indigenous peoples, who consumed it both in everyday life and in religious ceremonies and rituals.",
      "gas.atol.h2": "Types of atol",
      "gas.atol.p3": "Atol shuco is a fermented variant made with ground black corn, beans and water. It has a distinctive sour flavor and is especially popular in the western part of the country. There is also pineapple atol, tamarind atol and chuco de semilla de ayote, each with its own flavor personality.",
      "gas.atol.h3": "Where to drink it",
      "gas.atol.p4": "Atol de elote is found in municipal markets, pupuserías and street stalls all over the country. It's especially popular on cold mornings and during patron saint festivities. In many households it's prepared on Sundays as part of the family breakfast.",

      "gas.semita.title": "Semita",
      "gas.semita.sub": "El Salvador's most famous bread",
      "gas.semita.chip1": "Handmade bread",
      "gas.semita.chip2": "Pineapple or blackberry filling",
      "gas.semita.chip3": "Cojutepeque tradition",
      "gas.semita.chip4": "Perfect with coffee",
      "gas.semita.h1": "The bread of identity",
      "gas.semita.p1": "Semita papalona is a handmade sweet bread originally from Cojutepeque, Cuscatlán, and has become one of the most representative sweets of Salvadoran bakeries. It's a soft dough bread filled with pineapple or blackberry jam, topped with a crunchy layer of caramelized sugar.",
      "gas.semita.p2": "Its name comes from the combination of \"semita\" (a sweet bread of Arab origin introduced by the Spanish) and \"papalona\" (a local term referring to its plump, puffy shape).",
      "gas.semita.h2": "Baking tradition",
      "gas.semita.p3": "Making semitas is an art passed down from generation to generation in Cojutepeque. The town's family bakeries produce this bread by hand using wood-fired ovens, which gives it a unique flavor and texture that can't be replicated with modern ovens.",
      "gas.semita.p4": "It's customary for travelers passing through Cojutepeque on the Pan-American Highway to stop and buy semitas to take home as gifts for family and friends.",
      "gas.semita.h3": "Bread in the culture",
      "gas.semita.p5": "El Salvador has a rich bread-baking tradition influenced by Spanish and Arab culture. French bread (birote) is the inseparable companion of Salvadoran coffee, and the wide variety of handmade sweet breads is an essential part of patron saint festivities and family celebrations across the country.",

      "gas.gallinaIndia.title": "Sopa de Gallina India",
      "gas.gallinaIndia.tabTitle": "Gallina India",
      "gas.gallinaIndia.sub": "Salvadoran families' Sunday broth",
      "gas.gallinaIndia.chip1": "Free-range hen",
      "gas.gallinaIndia.chip2": "Golden broth with achiote",
      "gas.gallinaIndia.chip3": "Potato, güisquil and corn",
      "gas.gallinaIndia.chip4": "Sunday dish",
      "gas.gallinaIndia.h1": "A broth with rural roots",
      "gas.gallinaIndia.p1": "Sopa de gallina india is made with free-range farm hens, leaner and more flavorful than factory-farmed chicken. Its broth is slow-cooked with vegetables from the milpa, achieving a deep flavor characteristic of Salvadoran rural cooking.",
      "gas.gallinaIndia.h2": "Ingredients from the milpa",
      "gas.gallinaIndia.p2": "Potato, güisquil and tender corn are the vegetable base, seasoned with achiote for the golden color and fresh mint at the end for aroma. It's served with white rice and freshly made tortillas.",
      "gas.gallinaIndia.h3": "Sunday tradition",
      "gas.gallinaIndia.p3": "It's common for Salvadoran families to make this dish on Sundays, gathering several generations around the table to enjoy a long, shared meal.",

      "gas.panesConPollo.title": "Panes con Pollo",
      "gas.panesConPollo.sub": "The festive sandwich of Salvadoran celebrations",
      "gas.panesConPollo.chip1": "Chicken in red recado",
      "gas.panesConPollo.chip2": "French bread (birote)",
      "gas.panesConPollo.chip3": "Pickled vegetables",
      "gas.panesConPollo.chip4": "Parties and birthdays",
      "gas.panesConPollo.h1": "The sandwich of celebrations",
      "gas.panesConPollo.p1": "Panes con pollo are the undisputed stars of birthdays, weddings and family celebrations in El Salvador. The chicken is cooked in an aromatic red recado made with achiote, tomato and spices, then shredded and placed in French bread spread with mustard and mayonnaise.",
      "gas.panesConPollo.h2": "The pickled touch",
      "gas.panesConPollo.p2": "It's topped with pickled vegetables such as radish, cabbage and chile, plus mint leaves that add freshness. Each family keeps its own recado recipe, passed down from generation to generation.",
      "gas.panesConPollo.h3": "Present at every special occasion",
      "gas.panesConPollo.p3": "It's common to find tables full of panes con pollo at big celebrations, since they're made in large quantities and served as the main dish for guests of all ages.",

      "gas.riguas.title": "Riguas",
      "gas.riguas.sub": "Corn cakes wrapped in their own husk",
      "gas.riguas.chip1": "Ground tender corn",
      "gas.riguas.chip2": "Wrapped in husk",
      "gas.riguas.chip3": "Sweet or savory",
      "gas.riguas.chip4": "Comal snack",
      "gas.riguas.h1": "A simple, ancestral snack",
      "gas.riguas.p1": "Riguas are small cakes made of ground tender corn, wrapped in the corn's own husk (tusa) and cooked on a comal. Their preparation echoes Mesoamerican cooking techniques of using every part of the corn plant.",
      "gas.riguas.h2": "Sweet and savory versions",
      "gas.riguas.p2": "They can be made sweet, with a bit of sugar and butter, or savory, adding grated cheese to the masa. Both versions are enjoyed fresh off the comal, hot, with a light toasted-husk aroma.",
      "gas.riguas.h3": "Market and fair food",
      "gas.riguas.p3": "They're common at municipal markets and patron saint fairs, where they're sold as a quick, inexpensive snack, perfect alongside coffee or atol.",

      "gas.empanadasPlatano.title": "Plantain Empanadas",
      "gas.empanadasPlatano.sub": "A street sweet with a ripe plantain heart",
      "gas.empanadasPlatano.chip1": "Ripe plantain",
      "gas.empanadasPlatano.chip2": "Sweet bean filling",
      "gas.empanadasPlatano.chip3": "Fried and crispy",
      "gas.empanadasPlatano.chip4": "Street dessert",
      "gas.empanadasPlatano.h1": "Sweetness wrapped in plantain",
      "gas.empanadasPlatano.p1": "Plantain empanadas are made with ripe plantain purée wrapped around a filling of sweet refried beans or condensed milk. They're fried until golden and dusted with sugar and cinnamon.",
      "gas.empanadasPlatano.h2": "A contrast of flavors",
      "gas.empanadasPlatano.p2": "The contrast between the sweetness of the plantain and the creamy filling makes them a very popular dessert, sold on streets and in markets, especially in the afternoons as a snack.",
      "gas.empanadasPlatano.h3": "A recipe born of thrift",
      "gas.empanadasPlatano.p3": "Its origin is linked to the custom of making good use of very ripe plantains, turning them into a simple but well-loved sweet in Salvadoran homes.",

      "gas.mariscada.title": "Mariscada",
      "gas.mariscada.sub": "The flavor of the Salvadoran Pacific in a single dish",
      "gas.mariscada.chip1": "Shrimp and fish",
      "gas.mariscada.chip2": "Coconut milk",
      "gas.mariscada.chip3": "Coastal flavor",
      "gas.mariscada.chip4": "Beach areas",
      "gas.mariscada.h1": "A treasure from the coast",
      "gas.mariscada.p1": "Mariscada is a hearty stew of mixed seafood —shrimp, fish, octopus and squid— cooked in a creamy broth of coconut milk, tomato and sweet chile. It's a typical dish of El Salvador's coastal areas, such as La Libertad and the Bálsamo coast.",
      "gas.mariscada.h2": "Tropical flavor",
      "gas.mariscada.p2": "Coconut milk gives it a smooth texture and tropical flavor that pairs perfectly with the freshness of just-caught seafood. It's served with yuca or green plantain.",
      "gas.mariscada.h3": "A weekend beach dish",
      "gas.mariscada.p3": "It's commonly enjoyed on weekends at beach restaurants, where it's made with the day's catch, making it one of the most requested dishes by tourists and locals alike.",

      "gas.casamiento.title": "Casamiento",
      "gas.casamiento.sub": "The perfect union of rice and beans",
      "gas.casamiento.chip1": "Rice and beans",
      "gas.casamiento.chip2": "Typical breakfast",
      "gas.casamiento.chip3": "Affordable and nutritious",
      "gas.casamiento.chip4": "Everyday dish",
      "gas.casamiento.h1": "The name of the union",
      "gas.casamiento.p1": "Casamiento (\"marriage\") owes its name to the combination of rice and beans sautéed together, a \"union\" of two staple ingredients of the Salvadoran diet. It's a simple, affordable and very nutritious dish, found on the table of almost every home.",
      "gas.casamiento.h2": "Versatile at any meal",
      "gas.casamiento.p2": "It's enjoyed at breakfast with scrambled eggs, fried plantain and cheese, or at lunch and dinner alongside a protein such as meat or chicken. It's as versatile a side dish as it is comforting.",
      "gas.casamiento.h3": "Found across Central America",
      "gas.casamiento.p3": "Similar dishes exist in other countries under different names, but in El Salvador casamiento keeps its distinctive seasoning thanks to the onion, garlic and green chile sauté.",

      "gas.enchiladas.title": "Salvadoran Enchiladas",
      "gas.enchiladas.tabTitle": "Enchiladas",
      "gas.enchiladas.sub": "Nothing like Mexican enchiladas",
      "gas.enchiladas.chip1": "Crispy tortilla",
      "gas.enchiladas.chip2": "Ground beef and curtido",
      "gas.enchiladas.chip3": "Beet and hard-boiled egg",
      "gas.enchiladas.chip4": "Fair snack",
      "gas.enchiladas.h1": "A very different version",
      "gas.enchiladas.p1": "Unlike Mexican enchiladas, the Salvadoran version is fried corn tortillas until crispy, topped with seasoned ground beef, pickled cabbage curtido, tomato sauce, beet and chopped hard-boiled egg.",
      "gas.enchiladas.h2": "Layers of flavor and texture",
      "gas.enchiladas.p2": "The contrast between the crispy base and the fresh ingredients makes them a very popular snack at patron saint fairs and street stalls across the country.",
      "gas.enchiladas.h3": "Food to share as a family",
      "gas.enchiladas.p3": "They're usually made in large batches for family gatherings, since everyone builds their own enchilada to taste, adding more or less curtido and sauce.",

      "gas.nuegadosYuca.title": "Yuca Nuégados",
      "gas.nuegadosYuca.sub": "Golden balls bathed in panela honey",
      "gas.nuegadosYuca.chip1": "Grated yuca",
      "gas.nuegadosYuca.chip2": "Panela honey",
      "gas.nuegadosYuca.chip3": "Fried and crispy",
      "gas.nuegadosYuca.chip4": "Market dessert",
      "gas.nuegadosYuca.h1": "A traditional yuca sweet",
      "gas.nuegadosYuca.p1": "Yuca nuégados are small fried balls made of grated yuca, generously bathed in panela honey with cinnamon. Their crispy exterior and soft interior make them irresistible.",
      "gas.nuegadosYuca.h2": "Chilate's companion",
      "gas.nuegadosYuca.p2": "They're traditionally served alongside chilate, a toasted corn drink, forming the most beloved sweet duo of Salvadoran afternoons.",
      "gas.nuegadosYuca.h3": "Found at markets and fairs",
      "gas.nuegadosYuca.p3": "They're easily found at municipal markets and during patron saint festivities, sold by generations of pastry-making families who keep the traditional recipe alive.",

      "gas.chilate.title": "Chilate with Nuégados",
      "gas.chilate.sub": "The country's most beloved toasted corn drink",
      "gas.chilate.chip1": "Toasted corn",
      "gas.chilate.chip2": "Cinnamon and ginger",
      "gas.chilate.chip3": "Hot drink",
      "gas.chilate.chip4": "Afternoon tradition",
      "gas.chilate.h1": "Toasted corn takes the lead",
      "gas.chilate.p1": "Chilate is a hot drink made from toasted, ground white corn, cooked with water, cinnamon, clove and ginger. Its toasted, slightly spicy flavor sets it apart from other corn drinks like atol.",
      "gas.chilate.h2": "Inseparable from nuégados",
      "gas.chilate.p2": "It's traditionally served alongside yuca nuégados bathed in honey, creating a combination of toasted and sweet flavors much loved on cold afternoons.",
      "gas.chilate.h3": "A drink with indigenous roots",
      "gas.chilate.p3": "Its preparation preserves pre-Hispanic corn toasting and grinding techniques, making it one of the oldest drinks still made in Salvadoran homes.",

      "gas.torrejas.title": "Torrejas",
      "gas.torrejas.sub": "The essential sweet of Salvadoran Holy Week",
      "gas.torrejas.chip1": "Egg-dipped bread",
      "gas.torrejas.chip2": "Panela honey",
      "gas.torrejas.chip3": "Holy Week",
      "gas.torrejas.chip4": "Family dessert",
      "gas.torrejas.h1": "A sweet of religious tradition",
      "gas.torrejas.p1": "Torrejas are slices of French bread soaked in beaten egg, fried and then bathed in panela honey with cinnamon and clove. It's one of the most representative desserts of Holy Week in El Salvador.",
      "gas.torrejas.h2": "Thrift and sweetness",
      "gas.torrejas.p2": "They're traditionally made with day-old bread, making the most of its firm texture to better absorb the egg and honey, resulting in a moist, aromatic dessert.",
      "gas.torrejas.h3": "A family gathering during Lent",
      "gas.torrejas.p3": "During Lent and Holy Week, many Salvadoran families gather to make them along with other traditional sweets such as ayote en miel, marking the start of the religious celebrations.",

      /* ── Page: Categories ── */
      "cat.meta.title": "Salvadorean Roots — Categories",
      "cat.meta.description": "Salvadorean Roots — Choose the cultural category you want to explore.",
      "cat.hero.title": "Explore Our Categories",
      "cat.hero.subtitle": "Discover the cultural richness of El Salvador through our specialized sections.",
      "cat.search.placeholder": "Search a category... (e.g. food, myths, sites)",
      "cat.filter.todas": "All",
      "cat.filter.patrimonio": "Heritage",
      "cat.filter.gastronomia": "Gastronomy",
      "cat.filter.festividades": "Festivities",
      "cat.filter.pasado": "Past",
      "cat.filter.mitologia": "Mythology",
      "cat.card.sitios.desc": "Explore the historical and archaeological sites that define our identity.",
      "cat.card.gastronomia.desc": "Savor the traditional flavors that tell the stories of our people.",
      "cat.card.eventos.desc": "Experience the celebrations and traditions that unite our community.",
      "cat.card.historia.desc": "Learn about the past that has shaped El Salvador's present.",
      "cat.card.leyendas.desc": "Dive into the mythical stories passed down from generation to generation.",
      "cat.emptyState": "We couldn't find any categories matching your search.",
      "cat.modal.title": "Great to have you here! 👋",
      "cat.modal.text": "You can keep exploring the categories freely, but if you sign up you'll enjoy everything Salvadorean Roots has for you even more.",
      "cat.modal.crearCuenta": "Create my account",
      "cat.modal.yaTengoCuenta": "I already have an account",
      "cat.modal.seguirSinCuenta": "Keep exploring without an account",
      "nav.sitios": "Cultural Sites",
      "nav.gastronomia": "Gastronomy",
      "nav.eventos": "Events",
      "nav.historia": "History",
      "nav.leyendas": "Legends",

      /* ── Page: Calendar ── */
      "cal.meta.title": "Festivities Calendar – Salvadorean Roots",
      "cal.hero.eyebrow": "Discover El Salvador",
      "cal.hero.title": "Festivities Calendar",
      "cal.hero.desc": "Patronal festivals, fairs, and iconic celebrations across all 14 departments — organized month by month so you don't miss any.",
      "cal.exploreDate": "Explore by date",
      "cal.title": "Calendar",
      "cal.prevYear": "Previous year",
      "cal.loading": "Loading…",
      "cal.nextYear": "Next year",
      "cal.days.lun": "Mon",
      "cal.days.mar": "Tue",
      "cal.days.mie": "Wed",
      "cal.days.jue": "Thu",
      "cal.days.vie": "Fri",
      "cal.days.sab": "Sat",
      "cal.days.dom": "Sun",
      "cal.filter.searchTitle": "Search festivities",
      "cal.filter.title": "Filter events",
      "cal.filter.dept": "Department",
      "cal.filter.allDepts": "All departments",
      "cal.filter.month": "Month",
      "cal.filter.allMonths": "All months",
      "cal.filter.type": "Event type",
      "cal.filter.allTypes": "All types",
      "cal.filter.searchName": "Search by name",
      "cal.filter.placeholder": "E.g., Holy Week, San Juan…",
      "cal.filter.apply": "Apply filters",
      "cal.filter.clear": "Clear",
      "cal.catalog.label": "Festivities of El Salvador",
      "cal.catalog.title": "Celebrations Catalog",
      "cal.catalog.foundText": "festivities found",
      "cal.catalog.loadMore": "Show more celebrations",
      "cal.view.grid": "Grid view",
      "cal.view.list": "List view",
      "cal.modal.defaultTitle": "Event Name",
      "cal.months.ene": "January", "cal.months.feb": "February", "cal.months.mar": "March", "cal.months.abr": "April",
      "cal.months.may": "May", "cal.months.jun": "June", "cal.months.jul": "July", "cal.months.ago": "August",
      "cal.months.sep": "September", "cal.months.oct": "October", "cal.months.nov": "November", "cal.months.dic": "December",
      "cal.types.patronal": "Patronal Festival", "cal.types.municipal": "Municipal Fair", "cal.types.cultural": "Cultural Festival",
      "cal.types.religiosa": "Religious Celebration", "cal.types.nacional": "National Holiday",

      /* ── Page: Map ── */
      "map.meta.title": "Salvadorean Roots — Cultural Map",
      "map.sidebar.close": "Close information",
      "map.sidebar.desc": "Description",
      "map.sidebar.details": "Details",
      "map.sidebar.directions": "Get Directions",
      "map.sidebar.center": "Center View",
      "map.backBtn": "Back",
      "map.filters.toggle": "Hide filters",
      "map.filters.all": "All",
      "map.geo.label": "Center on my location",

      // Agrega esto dentro del objeto "en" en tu i18n.js
      "cal": {
        "noEventsToday": "There are no cultural events for this day",
        "months": {
          "ene": "January", "feb": "February", "mar": "March", "abr": "April",
          "may": "May", "jun": "June", "jul": "July", "ago": "August",
          "sep": "September", "oct": "October", "nov": "November", "dic": "December"
        },
        "modal": {
          "dept": "Department",
          "date": "Date",
          "viewMap": "View on interactive map",
          "location": "Location", 
          "eventType": "Event Type",
          "dateCelebration": "Date of Celebration",
          "description": "Description",
          "exploreMap": "Explore on Interactive Map",
          "of": "of"
        }
      },
      "ev": {
        "panela": {
          "title": "Panela Fair",
          "desc": "Traditional milling in Verapaz, where 'dulce de atado', alfeñiques, and a variety of sugar cane derivatives are crafted."
        },
        "cruz": {
          "title": "Day of the Cross",
          "desc": "National tradition where a jiote tree cross is placed in courtyards, decorated with seasonal fruits and colorful shredded paper streamers."
        },
        "julias": {
          "title": "Julias Festivities",
          "desc": "The largest celebration in Western El Salvador honoring Saint Anne, featuring the mail parade, mechanical rides, and solemn masses."
        },
        "maiz": {
          "title": "Corn Festival",
          "desc": "Celebration in San Juan Opico dedicated to corn derivatives: riguas, tamales, atol, chicha, and elotes locos."
        },
        "agostinas": {
          "title": "August Festivities",
          "desc": "Capital city celebration honoring the Divine Savior of the World, famous for 'La Bajada' (transfiguration) in front of the Metropolitan Cathedral."
        },
        "jocote": {
          "title": "Jocote Corona Festival",
          "desc": "Celebration at Cerro Verde National Park, promoting the consumption and entrepreneurship based on this exotic mountain fruit."
        },
        "calabaza": {
          "title": "Pumpkin Festivities",
          "desc": "In Cojutepeque, pumpkins in honey are prepared alongside children's parades rescuing characters from Cuzcatlec mythology."
        },
        "canchules": {
          "title": "Canchules Day",
          "desc": "Unique tradition in Nahuizalco where children go from house to house asking for food prepared for the altars of the deceased, shouting 'we are angels'."
        },
        "difuntos": {
          "title": "Day of the Dead",
          "desc": "National day of remembrance where families visit cemeteries to decorate with flowers, paint graves, and remember their loved ones."
        },
        "anil": {
          "title": "Indigo Festival",
          "desc": "Celebration in Suchitoto dedicated to the 'blue gold', showcasing pre-Hispanic artisan dyeing techniques and colonial history."
        },
        "carnaval": {
          "title": "San Miguel Carnival",
          "desc": "The largest popular festival in Central America in honor of the Virgin of Peace, with dozens of musical orchestras performing on the main streets."
        },
        "guadalupe": {
          "title": "Day of the Virgin of Guadalupe",
          "desc": "Pilgrimage to the Basilica of Guadalupe (La Ceiba) where children are dressed in traditional indigenous clothing in gratitude for miracles."
        },
        "canchules_nahu": {
          "title": "The Canchules of Nahuizalco",
          "desc": "Focused version of the altar of the dead in Nahuizalco, featuring street altar displays and sharing of typical food."
        },
        "farolitos": {
          "title": "Little Lanterns Day",
          "desc": "Commemoration of the birth of the Virgin Mary in Ahuachapán and Concepción de Ataco, illuminating streets and structures with thousands of handmade paper lanterns."
        },
        "calabiuza": {
          "title": "La Calabiuza",
          "desc": "Night parade in Tonacatepeque where youth dress up as characters from Salvadoran mythology (Ciguanaba, Cipitío) accompanied by loud creaking wagons."
        },
        "anil_oct": {
          "title": "Indigo Festival (October)",
          "desc": "Celebration in Suchitoto dedicated to the 'blue gold', showcasing pre-Hispanic artisan dyeing techniques and colonial history."
        },
        "jocote_2026": {
          "title": "Jocote Corona Festival 2026",
          "desc": "Gastronomic fair celebrated in Cerro Verde dedicated to the marketing and dishes derived from this iconic fruit."
        },
        "encuentros": {
          "title": "Tradition of the Encounters",
          "desc": "Centuries-old religious and cultural festivity where images of patron saints from neighboring towns meet, accompanied by traditional dances like Chinchintora."
        },
        "calabiuza_2026": {
          "title": "La Calabiuza Day 2026",
          "desc": "Traditional night parade in Tonacatepeque where characters from Salvadoran legends like the Siguanaba come to life."
        },
        "difuntos_2026": {
          "title": "Day of the Dead 2026",
          "desc": "On November 1st and 2nd, families visit the country's cemeteries to honor their loved ones with flowers and traditional fiambre."
        },
        "barro": {
          "title": "Clay Festival",
          "desc": "Artisan exhibition in Ilobasco paying tribute to master potters and their famous miniature clay figures."
        },
        "gotera": {
          "title": "Gotera Patronal Festivities",
          "desc": "Events dedicated to Saint Francis of Assisi in San Francisco Gotera, combining faith, popular rodeos, and regional dances."
        },
        "cuisnahuat": {
          "title": "Cuisnahuat Historantes Festivities",
          "desc": "Traditional dance of Moors and Christians in honor of Saint Charles Borromeo, preserving ancestral indigenous roots."
        },
        "carnaval_2026": {
          "title": "Great San Miguel Carnival 2026",
          "desc": "The largest carnival in Central America, celebrated in honor of the Virgin of Peace with dozens of live orchestras."
        },
        "canchules_cab": {
          "title": "Canchules Day (Cabañas)",
          "desc": "Unique tradition every December 4th where residents create altars with fruits and typical food, repeating the popular saying 'Canchul, if you don't give me, I'll break your lamp!'."
        },
        "chicharron": {
          "title": "International Pork Rind Festival",
          "desc": "Culinary fair with huge tourist crowds in Santa Tecla, focused on the creative preparation of pork-based dishes."
        },
        "launion": {
          "title": "La Unión Patronal Festivities",
          "desc": "Celebrated in honor of the Immaculate Conception with parades, floats, and maritime activities in the Gulf of Fonseca."
        },
        "navidad": {
          "title": "Christmas and Posadas",
          "desc": "From December 16th to 24th, 'posadas' are celebrated throughout the country, culminating on Christmas Eve with fireworks, tamales, and punch."
        },
        "arroz": {
          "title": "Rice Festivities",
          "desc": "Developed in San Esteban Catarina, celebrating the processing and food sovereignty linked to rice cultivation."
        },
        "svicente": {
          "title": "San Vicente Patronal Festivities",
          "desc": "Patronal celebrations dedicated to Saint Vincent Abbot and Martyr, filled with cultural activities under the historic clock tower."
        }
      },
      "Todos": "Everywhere",
      "Celebración Religiosa": "Religious Celebration",
      "Feria Gastronómica": "Gastronomic Fair",
      "Fiesta Patronal": "Patronal Festival",
      "Tradición Popular": "Popular Tradition",
      "Conmemoración": "Commemoration",
      "Festival Cultural": "Cultural Festival",
      "Celebración Tradicional": "Traditional Celebration",
      "Desfile Tradicional": "Traditional Parade",
      "Feria Municipal": "Municipal Fair",
      "Danza Ancestral": "Ancestral Dance",
      "Tradición Oral": "Oral Tradition",
      "Festividad Nacional": "National Festivity",
      "Evento Cultural": "Cultural Event",
      "Ver en mapa": "View on map",
      "festividades encontradas": "festivities found",
      "cal.modal.of": "of",
      mapa: {
      puntos: {
        1: { nombre: "Tazumal", lugar: "Chalchuapa, Santa Ana", desc: "Mayan archaeological site housing the tallest pyramid in El Salvador, a testament to pre-Hispanic splendor.", chips: ["Archaeology", "History", "Culture"] },
        2: { nombre: "Joya de Cerén", lugar: "San Juan Opico, La Libertad", desc: "Known as the Pompeii of America, it is a pre-Hispanic agricultural village buried by a volcanic eruption.", chips: ["UNESCO Heritage", "Archaeology"] },
        3: { nombre: "Salvador del Mundo", lugar: "San Salvador", desc: "Iconic monument of the capital symbolizing the faith and identity of the Salvadoran people.", chips: ["Monument", "Civic Plaza"] },
        4: { nombre: "Suchitoto", lugar: "Cuscatlán", desc: "Colonial town with cobblestone streets, historic churches, and a vibrant cultural life facing Lake Suchitlán.", chips: ["Colonial", "Art", "Living Town"] },
        5: { nombre: "Metropolitan Cathedral", lugar: "Historic Center, San Salvador", desc: "The main Catholic temple of the capital, resting place of Saint Óscar Arnulfo Romero.", chips: ["Religion", "Architecture"] },
        6: { nombre: "MUNA", lugar: "San Salvador", desc: "Dr. David J. Guzmán National Museum of Anthropology, guardian of historical memory and pre-Hispanic artifacts.", chips: ["Museum", "Anthropology"] },
        7: { nombre: "San Andrés Ruins", lugar: "Ciudad Arce, La Libertad", desc: "Ancient ceremonial and political center of the Zapotitán valley featuring accessible pyramid structures.", chips: ["Archaeology", "Mayan Culture"] },
        8: { nombre: "El Triángulo Pupusodromo", lugar: "Olocuilta, La Paz", desc: "Famous gastronomic hub, birthplace of rice pupusas traditionally cooked on clay comals.", chips: ["Typical Food", "Pupusas", "Tradition"] },
        9: { nombre: "Cojutepeque Semitas", lugar: "Cojutepeque, Cuscatlán", desc: "Baking tradition famous for its premium semitas and nationally recognized local sausages.", chips: ["Gastronomy", "Bakery"] },
        10: { nombre: "Central Market", lugar: "Historic Center, San Salvador", desc: "The epicenter of popular trade where traditional ingredients and urban gastronomic identity meet.", chips: ["Market", "Popular Culture"] },
        11: { nombre: "Nahuizalco — Night Market", lugar: "Nahuizalco, Sonsonate", desc: "Candlelit market selling wicker crafts, tule items, and ancestral indigenous dishes.", chips: ["Indigenous", "Crafts", "Night Market"] },
        12: { nombre: "Plaza las Américas", lugar: "San Salvador", desc: "Meeting point for grand popular celebrations, traditional parades, and national civic events.", chips: ["Events", "Civic"] },
        13: { nombre: "Panchimalco", lugar: "Panchimalco, San Salvador", desc: "Town with pre-Hispanic roots famous for its colonial church and the colorful Palms and Flowers procession.", chips: ["Annual Tradition", "Living Culture"] },
        14: { nombre: "Suchitoto Festival", lugar: "Suchitoto, Cuscatlán", desc: "International festival of art and culture gathering cinema, music, and theater in historic colonial settings.", chips: ["Culture", "Theater", "Music"] },
        15: { nombre: "Santa Ana Cathedral", lugar: "Santa Ana", desc: "Majestic Neo-Gothic Byzantine style building that frames the Fiestas Julias celebrations.", chips: ["Architecture", "Religion"] },
        16: { nombre: "Izalco House of Culture", lugar: "Izalco, Sonsonate", desc: "Space dedicated to preserving the historical memory of native peoples and the 1932 uprising.", chips: ["Memory", "Indigenous"] },
        17: { nombre: "Former Presidential House", lugar: "San Jacinto, San Salvador", desc: "Former seat of the executive branch, an Art Nouveau architectural gem holding key political chapters.", chips: ["History", "Architecture"] },
        18: { nombre: "El Rosario Church", lugar: "San Salvador", desc: "Modern architectural masterpiece with a unique stained-glass design creating an impressive light spectrum.", chips: ["Architecture", "Modern Art"] },
        19: { nombre: "Coatepeque Lake", lugar: "Santa Ana", desc: "Beautiful volcanic lake surrounded by myths about El Tabudo, the guardian spirit of its waters.", chips: ["Myths", "Legends", "Nature"] },
        20: { nombre: "El Imposible Forest", lugar: "Ahuachapán", desc: "National park boasting immense biodiversity and magical trails shrouded in ancient ghost legends.", chips: ["Nature", "Mystery"] },
        21: { nombre: "August Festivities", lugar: "San Salvador, El Salvador", desc: "Patron saint celebrations honoring the Divine Savior of the World, marked by the traditional Mail Parade.", chips: ["Tradition", "Fair"] },
        22: { nombre: "Day of the Lanterns", lugar: "Ahuachapán, El Salvador", desc: "Centuries-old tradition where streets light up with thousands of handmade lanterns honoring the Virgin Mary.", chips: ["Lights", "Heritage"] },
        23: { nombre: "Fiestas Julias", lugar: "Santa Ana, El Salvador", desc: "Celebration honoring Patron Saint Anne featuring fairs, traditional floats, and solemn religious activities.", chips: ["Fair", "Culture"] },
        24: { nombre: "San Vicente Patron Saint Fiestas", lugar: "San Vicente, El Salvador", desc: "Festivity celebrated in honor of Saint Vincent Abbot and Martyr, with parades and local traditional dances.", chips: ["Tradition", "Town"] },
        25: { nombre: "Flowers and Palms Festival", lugar: "La Libertad, El Salvador", desc: "Colorful Marian festivity where locals decorate palms with seasonal flowers in a beautiful parade.", chips: ["Flowers", "Religion"] },
        26: { nombre: "San Miguel Great Carnival", lugar: "San Miguel, El Salvador", desc: "The largest popular party in Central America, filled with live orchestras, float parades, and street music.", chips: ["Carnival", "Music"] },
        27: { nombre: "Historiantes Festivities", lugar: "Cuisnahuat, Sonsonate", desc: "Ancestral folk dance recreating historical battles between Moors and Christians in colorful costumes.", chips: ["Traditional Dance", "Culture"] },
        28: { nombre: "Jocote Corona Festival", lugar: "Santa Ana, El Salvador", desc: "Agricultural celebration at Cerro Verde dedicated to this iconic fruit, offering culinary innovations.", chips: ["Gastronomy", "Fruits"] },
        29: { nombre: "Calabiuza Day", lugar: "Cuscatlán, El Salvador", desc: "Tonacatepeque tradition where youth dress as Salvadoran legend characters asking for sweetened squash.", chips: ["Myths", "Identity"] },
        30: { nombre: "Canchules Day", lugar: "Sensuntepeque, Cabañas", desc: "Unique Day of the Dead tradition featuring alters where food is requested shouting 'We are angels!'", chips: ["Tradition", "Altars"] },
        31: { nombre: "Day of the Cross", lugar: "San Salvador, El Salvador", desc: "Religious syncretic festivity where a jiote cross is decorated with seasonal fruits to ward off the devil.", chips: ["Religion", "Fruits"] },
        32: { nombre: "Maize Festival", lugar: "Chalatenango, El Salvador", desc: "Fair paying tribute to the sacred American grain with atoles, tamales, rigüitas, and handmade typical outfits.", chips: ["Gastronomy", "Corn"] },
        33: { nombre: "Balsam Tradition", lugar: "Jayaque, La Libertad", desc: "Cultural and religious gathering focused on ancestral balsam extraction and sisterhood between towns.", chips: ["Ancestral", "Culture"] },
        34: { nombre: "Encounters Tradition", lugar: "San Antonio del Monte, Sonsonate", desc: "Act of religious sisterhood between saint images from neighboring towns, with deep colonial roots.", chips: ["Religion", "Sisterhood"] },
        35: { nombre: "La Unión Patron Saint Fiestas", lugar: "La Unión, El Salvador", desc: "Coastal celebration honoring the Immaculate Conception with maritime activities and traditional parades.", chips: ["Fair", "Coast"] },
        36: { nombre: "Lanterns Festival in Ataco", lugar: "Ahuachapán, El Salvador", desc: "Concepción de Ataco dresses up, illuminating its cobblestone streets with spectacular light designs.", chips: ["Lights", "Tourism"] },
        37: { nombre: "Panela Festival", lugar: "Cuscatlán, El Salvador", desc: "Fair at the traditional sugar mills of San Lorenzo dedicated to sugarcane derivatives.", chips: ["Sweets", "Tradition"] },
        38: { nombre: "King Guajactial Fiestas", lugar: "Sonsonate, El Salvador", desc: "Historical and indigenous commemoration rescuing the dignity and leadership of Nahua-Pipil chiefs.", chips: ["Indigenous", "History"] },
        39: { nombre: "Crab Festival", lugar: "La Paz, El Salvador", desc: "Marine gastronomic celebration focused on crab dishes and mangrove conservation.", chips: ["Seafood", "Gastronomy"] },
        40: { nombre: "Esquipulas Pilgrimage", lugar: "Chalatenango, El Salvador", desc: "Traditional and religious pilgrimage of faith devoted to the miraculous Black Christ of Esquipulas.", chips: ["Faith", "Pilgrimage"] },
        41: { nombre: "Clay Festival", lugar: "Cabañas, El Salvador", desc: "Craft fair in Ilobasco celebrating clay modeling mastery and the famous miniature pottery surprises.", chips: ["Crafts", "Clay"] },
        42: { nombre: "Rice Fiestas", lugar: "San Vicente, El Salvador", desc: "El Tránsito celebration dedicated to rice production featuring machinery parades and typical dishes.", chips: ["Harvest", "Tradition"] },
        43: { nombre: "Youths Festival", lugar: "El Mozote, Morazán", desc: "Cultural gathering for peace and historical memory through youth artistic expressions.", chips: ["Peace", "Youth"] },
        44: { nombre: "Seafood Fair", lugar: "Usulután, El Salvador", desc: "Grand culinary exhibition in Puerto El Triunfo featuring the finest fresh catch from Jiquilisco Bay.", chips: ["Seafood", "Coast"] },
        45: { nombre: "First Fruits Harvest", lugar: "La Unión, El Salvador", desc: "Agricultural tradition thanking for the season's first basic grain harvests during the rainy period.", chips: ["Agriculture", "Tradition"] },
        46: { nombre: "Panela Carnival", lugar: "Verapaz, San Vicente", desc: "Colorful festival dedicated to cane grinding in traditional mills on the volcano's slopes.", chips: ["Fair", "Sweets"] },
        47: { nombre: "Cojutepeque Fiestas", lugar: "Cuscatlán, El Salvador", desc: "Famous sugar and sausage fair with parades of traditional floats and local beauty queens.", chips: ["Fair", "Sausages"] },
        48: { nombre: "Indigo Festival", lugar: "Cuscatlán, El Salvador", desc: "Suchitoto celebration dedicated to the 'blue gold' plant and ancestral dyeing techniques.", chips: ["Crafts", "History"] },
        49: { nombre: "Gotera Patron Saint Fiestas", lugar: "Morazán, El Salvador", desc: "San Francisco Gotera celebration featuring horse riding, rodeos, and cultural nights from eastern El Salvador.", chips: ["Fair", "Tradition"] },
        50: { nombre: "Chicharrón Festival", lugar: "La Libertad, El Salvador", desc: "Gastronomic fair in Antiguo Cuscatlán dedicated to the finest dishes derived from pork cracklings.", chips: ["Gastronomy", "Food"] },
        51: { nombre: "El Boquerón", lugar: "San Salvador Volcano", desc: "National park in the volcano's crater, a natural viewpoint with legends about ancient eruptions.", chips: ["Nature", "Views"] },
        52: { nombre: "Devil's Door", lugar: "Los Planes de Renderos", desc: "Iconic rock formation wrapped in a colonial legend involving a landowner and the devil himself.", chips: ["Myths", "Legends"] },
        53: { nombre: "Casa Blanca", lugar: "Chalchuapa, Santa Ana", desc: "Archaeological site with pyramid structures and an interactive workshop for natural indigo dyeing.", chips: ["Archaeology", "Indigo"] },
        54: { nombre: "National Palace", lugar: "Historic Center, San Salvador", desc: "Centuries-old building with majestic halls representing republican architectural splendor.", chips: ["Architecture", "History"] },
        55: { nombre: "National Theatre", lugar: "Historic Center, San Salvador", desc: "The oldest theater in Central America, a French Renaissance gem in the heart of the capital.", chips: ["Theater", "Art"] },
        56: { nombre: "El Rosario Church", lugar: "Historic Center, San Salvador", desc: "Unique column-less avant-garde architecture, a jewel of modern Latin American sacred art.", chips: ["Architecture", "Avant-garde"] },
        57: { nombre: "National Holy Week", lugar: "Metropolitan Cathedral", desc: "Solemn passion commemorations characterized by artistic colored salt carpets on the streets.", chips: ["Religion", "Carpets"] },
        58: { nombre: "Independence Day", lugar: "Plaza Cívica, San Salvador", desc: "Grand civic and military national parade featuring peace bands commemorating homeland emancipation.", chips: ["Civic", "Parade"] },
        59: { nombre: "All Souls' Day", lugar: "General Cemetery, San Salvador", desc: "Popular tradition of decorating and painting the graves of loved ones every November second.", chips: ["Tradition", "Identity"] },
        60: { nombre: "Christmas and Posadas", lugar: "San Salvador", desc: "December celebrations full of lights, traditional fireworks, and posadas in historic neighborhoods.", chips: ["Christmas", "Lights"] },
        61: { nombre: "Proceres Monument", lugar: "Plaza Libertad, San Salvador", desc: "Central structure commemorating Central America's First Cry of Independence in 1811.", chips: ["History", "Monument"] },
        62: { nombre: "Metro Cinema", lugar: "Historic Center, San Salvador", desc: "Icon of 20th-century urban entertainment, now a key piece of the capital's architectural memory.", chips: ["Urban Memory", "Cinema"] },
        63: { nombre: "Railway Plaza", lugar: "Sonsonate", desc: "Open-air museum preserving the old steam locomotives that powered the coffee boom economy.", chips: ["Trains", "History"] },
        64: { nombre: "Military Museum", lugar: "San Jacinto, San Salvador", desc: "The El Zapote garrison guards artifacts, weapons, and history of the armed forces' development.", chips: ["Military", "Museum"] },
        65: { nombre: "Cihuatán Archaeological Site", lugar: "Aguilares, San Salvador", desc: "One of the most extensive pre-Hispanic urban centers in the country, with ball game remains.", chips: ["Archaeology", "Culture"] },
        66: { nombre: "Alegría Lagoon", lugar: "Usulután", desc: "Known as the Emerald of America, its sulfurous waters change color under myths of a resident mermaid.", chips: ["Legends", "Volcanoes"] },
        67: { nombre: "Cuyancúa of Izalco", lugar: "Izalco, Sonsonate", desc: "Home of the mythical creature half-snake and half-pig that predicts rains and underground rivers.", chips: ["Myths", "Nahua"] },
        68: { nombre: "Cerro de las Pavas", lugar: "Cojutepeque, Cuscatlán", desc: "Natural viewpoint and Marian shrine wrapped in accounts of local apparitions and miracles.", chips: ["Faith", "Legends"] },
        69: { nombre: "Sumpul River", lugar: "Chalatenango", desc: "Setting for tragic historical events and rural myths about protective spirits of the high waters.", chips: ["History", "Nature"] },
        70: { nombre: "Llanos de Olocuilta", lugar: "La Paz", desc: "Historic valleys surrounded by colonial stories of rattling wagons and wandering goblins.", chips: ["Myths", "Tradition"] }
      }
      },
      // Sección Leyendas (Navegación & Hero)
      "ley.meta.title": "Salvadorean Roots — Legends",
      "ley.hero.eyebrow": "Salvadorean Roots welcomes you",
      "ley.hero.title": "When night falls,   El Salvador tells stories",
      "ley.hero.desc": "Whispering rivers, tricking paths, shadows watching over children. Discover 16 legends that our grandparents told for generations.",
      "ley.hero.cta": "Explore the legends",

      // Tarjetas conceptuales
      "ley.concept.card1.title": "What is a legend?",
      "ley.concept.card1.hint": "Tap to discover",
      "ley.concept.card1.back": "A story that blends the real with the supernatural to explain the inexplicable: a noise in the ravine, a lost traveler, the fear of the night.",

      "ley.concept.card2.title": "Mestizo roots",
      "ley.concept.card2.hint": "Tap to discover",
      "ley.concept.card2.back": "Born from the clash between the Náhuat-Pipil and Lenca cosmovisions and the Catholic faith brought during colonial times. Ancient gods coexist with Christian prayers.",

      "ley.concept.card3.title": "Told, not written",
      "ley.concept.card3.hint": "Tap to discover",
      "ley.concept.card3.back": "They live by word of mouth. Every town, every grandmother tells them differently — that's why almost none has a single version.",

      // Biblioteca & Modal
      "ley.library.eyebrow": "The library",
      "ley.library.title": "16 legends and myths of El Salvador",
      "ley.modal.listen": "Listen to legend",
      "ley.modal.close": "Close",
      "ley.modal.origin": "Approximate origin",

      /* ── Página: Leyendas ── */
      "ley.modal.image_placeholder": "Space for image<br>of this legend",

      /* La Siguanaba */
      "ley.data.siguanaba.title": "La Siguanaba",
      "ley.data.siguanaba.sub": "The spirit that leads unfaithful men astray",
      "ley.data.siguanaba.tag": "Spirit · Rivers",
      "ley.data.siguanaba.chip1": "Female spirit",
      "ley.data.siguanaba.chip2": "Appears at night",
      "ley.data.siguanaba.chip3": "Rivers and ravines",
      "ley.data.siguanaba.chip4": "Drives men mad",
      "ley.data.siguanaba.origin": "Náhuat-Pipil tradition, widespread across El Salvador. Collected by Miguel Ángel Espino in \"Mitología de Cuscatlán\".",
      "ley.data.siguanaba.relato": "The elders say that a very long time ago, when the gods still walked among men, there lived a woman named Sihuehuet, whose name in Náhuat means \"beautiful woman.\" She was indeed the fairest in her town: golden skin, black hair as long as the night, and a laugh that turned every head. She was married, but her restless heart led her to fall in love with the Morning Star, a god who descended from the heavens to meet her by the river.\n\nWhen Tlaloc, the powerful god of waters and rains, discovered her betrayal, he showed no mercy. He cursed her forever: stripped away her name and true beauty, condemning her to wander eternally through rivers, ravines, and dark paths as La Siguanaba, which means \"hideous woman.\" From then on, she could only use her beauty as a lure, a trap set for men who, like her, betray those who love them.\n\nThus, on any given night, a man walking alone down a deserted trail—returning from a tavern, sneaking away from home to see another woman, or simply ignoring his elders' advice—might run into her. She appears bathing in the river or washing clothes with a golden bowl, calling out sweetly with a voice that promises everything he has been searching for in other arms. He follows her, hypnotized, straying deeper into the wilderness without realizing how far he gets from the way back.\n\nAnd then, when he is far away from any help, she turns her head. Where a smile used to be, now lies a skull; where bright eyes shone, empty sockets stare back, or the elongated snout and teeth of a mare. The man's scream gets lost in the night while La Siguanaba laughs and disappears, leaving him lost, trembling, often burning with fever for days, and forever scarred by fear.\n\nThe town elders say there are ways to escape her if encountered: bite hard on the edge of a machete, pray out loud without stopping, cross a pair of scissors or carry sewing needles in your pocket, or yell your mother's name three times—because they say it reminds her of her own betrayal and makes her flee. Some claim that if a man manages to look at her face before she reveals it, he is freed from her curse forever. But the core lesson every mother repeats to her son before letting him out at night remains the same: beware of following beauty that appears alone in the dark, for behind it, La Siguanaba may be waiting for you.",

      /* El Cipitío */
      "ley.data.cipitio.title": "El Cipitío",
      "ley.data.cipitio.sub": "The eternal child who never grows up",
      "ley.data.cipitio.tag": "Spirit · Forests",
      "ley.data.cipitio.chip1": "Eternal child",
      "ley.data.cipitio.chip2": "Backward feet",
      "ley.data.cipitio.chip3": "Son of La Siguanaba",
      "ley.data.cipitio.chip4": "Charms young maidens",
      "ley.data.cipitio.origin": "Pipil-Náhuat mythology nationwide; linked to the myth of La Siguanaba as her cursed son.",
      "ley.data.cipitio.relato": "Before turning into La Siguanaba, Sihuehuet had a son with a god: a round-cheeked boy with a protruding belly button whom they called Cipitío. But when she left following her forbidden love affairs, she abandoned her child, leaving him alone in the wild. The gods, furious with the mother, decided to punish the son as well, even though he was blameless: they condemned him to remain forever in the body of a ten-year-old boy, unable to grow up, wandering eternally among the rivers and sugarcane fields where he once lived with her.\n\nSince then, El Cipitío has been a small, dark-skinned spirit with a round belly like a little Buddha, wearing a straw hat so huge it nearly covers his face. The oddest detail is that his feet are turned backward: his toes point behind him, so anyone trying to follow his tracks in the dirt ends up walking in the exact opposite direction of where he actually went.\n\nUnlike his mother, El Cipitío does not seek to do harm. He is playful, curious, and above all, romantic: he loves appearing near rivers where young women wash clothes, especially if they are pretty with light eyes. He hides in the bushes and throws tiny pebbles to get their attention, or whistles from afar, though he never lets himself be fully seen. When a young maiden gets angry or frightened, he giggles and runs away, leaving only the echo of his footsteps.\n\nAnother of his favorite pranks is sneaking into rural kitchens at night to roll around in the warm ash of extinguished stoves, leaving small, messy footprints all over the floor by morning. Upon finding those marks, grandmothers smile and say without surprise: \"Cipitío came to play with the ashes again.\"\n\nOver time, El Cipitío has become one of the most beloved figures of Salvadoran folklore—not as a threat, but as a tender and mischievous reminder of a child who never had the chance to grow up, condemned by a mistake he did not commit, and who despite everything continues to seek warmth and company through laughter and pranks along the rivers.",

      /* El Cadejo */
      "ley.data.cadejo.title": "El Cadejo",
      "ley.data.cadejo.sub": "The two-faced guardian: white and black",
      "ley.data.cadejo.tag": "Creature · Roads",
      "ley.data.cadejo.chip1": "White Cadejo",
      "ley.data.cadejo.chip2": "Black Cadejo",
      "ley.data.cadejo.chip3": "Glowing eyes",
      "ley.data.cadejo.chip4": "Eternal struggle",
      "ley.data.cadejo.origin": "Widespread across Central America; told in El Salvador especially along rural roads and night trails.",
      "ley.data.cadejo.relato": "It is said that generations ago, in some forgotten sugarcane field or trail, two brothers were born in the form of large dogs with long, tangled fur, but with entirely different fates. One grew up good and protective: he became the White Cadejo, guardian of night travelers returning home with a clean heart. The other gave himself over to darkness, transforming into the Black Cadejo, a beast that haunts the roads searching for those who venture out at night with bad intentions—to steal, to betray their spouse, or to harm someone.\n\nAnyone walking alone down a rural path after a certain hour might suddenly catch the scent of incense and fresh flowers mixing with the night air: a sign that the White Cadejo is walking nearby, quietly guarding their steps from the shadow of the trees, his blue eyes barely gleaming among the brush. His presence brings calm, and many swear they arrived home safe and sound because he accompanied them unnoticed.\n\nIf, on the other hand, the air fills with a heavy smell of burning sulfur and the sound of dragging chains or hooves striking the dirt is heard, one must begin to pray: the Black Cadejo approaches, eyes burning red like hot coals, seeking someone to terrify into madness or worse.\n\nLegend says that every so often, the two brothers meet in the dark and wage a fierce battle, an eternal struggle between good and evil that neither can truly win. Whoever has the misfortune of hearing that fight—snarls, rattling chains, howls that seem to tear the night apart—must stay completely still and wait in silence until it ends. Getting caught in the middle of that battle, even by accident, can mean becoming trapped between two forces; and from that, those who tell the story claim, few leave with their minds intact.\n\nThat is why, in towns where this story is passed down through generations, parents warn their children to avoid walking alone at night—and above all, to avoid doing so with bad intentions—because one never knows which of the two brothers is wandering near that night, waiting to accompany... or to punish.",

      /* La Llorona */
      "ley.data.llorona.title": "La Llorona",
      "ley.data.llorona.sub": "The eternal wail of a mother",
      "ley.data.llorona.tag": "Spirit · Waters",
      "ley.data.llorona.chip1": "Eternal weeping",
      "ley.data.llorona.chip2": "Rivers and lakes",
      "ley.data.llorona.chip3": "Midnight",
      "ley.data.llorona.chip4": "Searches for her children",
      "ley.data.llorona.origin": "Present throughout Latin America; the Salvadoran version is associated with the Lempa River and Lake Coatepeque.",
      "ley.data.llorona.relato": "They say that many years ago, near the Lempa River, lived a young and beautiful woman who fell madly in love with a man who never fully returned her affection. They had children together, but he abandoned her, leaving her alone with shame and the pain of a broken promise. Blinded by despair and the madness of feeling betrayed, she took her children to the riverbank one night and drowned them in its dark waters, only to repent the very next instant when it was already too late.\n\nFrom that moment on, her soul found no rest. She was condemned to wander eternally by rivers and lakes, searching through the fog for the children she took, casting a gut-wrenching cry to the wind that can still be heard on the quietest nights: \"Oh, my children! Oh, my children!\"—a wail that seems to come from everywhere and nowhere at once, chilling the skin and stopping the heart of whoever hears it.\n\nIn El Salvador she has been seen—or rather, heard—especially near the Lempa River, Lake Coatepeque, and the Grande River of San Miguel, always past midnight, dressed in white, her wet hair falling over a face that some describe as still beautiful, while others claim is deformed, forever marked by pain and endless remorse.\n\nThose who claim to have seen her up close say she walks slowly along the water's edge, gazing into the current as if still expecting to find her children floating among the stones. If someone draws too near, she turns abruptly, and whoever looks into her eyes becomes paralyzed with terror, unable to move for long minutes while her wailing echoes closer and closer.\n\nFor generations, this has been one of the most powerful warnings for Salvadoran children: never go near rivers alone at night, nor play near the water past a certain hour, because there, among the mist and the sound of the stream, La Llorona may be waiting, forever carrying the weight of a tragedy she caused and can never undo.",

      /* La Descarnada */
      "ley.data.descarnada.title": "La Descarnada",
      "ley.data.descarnada.sub": "Death walking among the living",
      "ley.data.descarnada.tag": "Omen · Towns",
      "ley.data.descarnada.chip1": "Living skeleton",
      "ley.data.descarnada.chip2": "Night streets",
      "ley.data.descarnada.chip3": "Omen of death",
      "ley.data.descarnada.chip4": "Walks among humans",
      "ley.data.descarnada.origin": "Common in towns across the country's interior, especially around cemeteries and lonely roads.",
      "ley.data.descarnada.relato": "In the oldest towns of interior El Salvador, where dirt streets remain and the cemetery lies just outside, people tell the story of a figure that does not chase, scream, or intentionally terrify: she simply walks. They call her La Descarnada, and whoever sees her knows, without explanation, that death is near.\n\nShe is described as a tall woman, thin down to the bone, barely covered by a frayed white sheet or ragged dress that the night wind sways back and forth. When the cloth shifts, bare bones are revealed between the folds, as if not a single ounce of flesh remained. She walks slowly, unhurriedly, down the quiet streets of small towns, along paths bordering cemeteries, or down rural trails that almost no one travels after dark.\n\nUnlike other figures of Salvadoran folklore, La Descarnada does not seek to trick, seduce, or play pranks. She does not run after those who spot her, nor speak, nor threaten. She simply continues on her path with a dry, hollow clatter of bones knocking against each other with every step, as if walking with an unattached skeleton beneath the tattered cloth. That eerily calm indifference is perhaps the most terrifying part of all: one knows she is not coming directly for them, but seeing her means death has somehow cast its sight upon your home, your family, or yourself.\n\nNumerous people in different towns across the country claim to have seen her, almost always during the early morning hours, walking slowly down cobbled streets or paths leading to the local cemetery. Some say they met her head-on at a dark corner, standing frozen while she passed right by without even turning to look, leaving behind a cold chill that took hours to fade.\n\nPopular belief holds that whoever encounters La Descarnada, or someone close in their family, will soon face an impending death. That is why on nights when rumors spread that she has been spotted roaming, entire towns grow quieter than usual, doors stay tightly locked, while elders remind youth that death in El Salvador does not always arrive unexpectedly: sometimes, beforehand, it lets itself be seen walking among the living.",

      /* El Duende */
      "ley.data.duende.title": "El Duende",
      "ley.data.duende.sub": "The tiny guardian of the forests",
      "ley.data.duende.tag": "Creature · Forests",
      "ley.data.duende.chip1": "Forest guardian",
      "ley.data.duende.chip2": "Plays music",
      "ley.data.duende.chip3": "Large straw hat",
      "ley.data.duende.chip4": "Playful but harmless",
      "ley.data.duende.origin": "Rural and forested areas nationwide; highly popular in remote villages.",
      "ley.data.duende.relato": "In remote villages where the forest is still dense and streams run hidden beneath brush, farmers speak of a small creature living among trees since time immemorial: El Duende. Standing no taller than two feet, he bears the wrinkled face of a wise elder or the playful face of an eternal child. He wears colorful clothes and a straw hat so massive it seems to float on his tiny shoulders.\n\nUnlike other figures in Salvadoran folklore that inspire true terror, El Duende is not evil by nature. He is curious, playful, and a master of harmless trickery: he loves hiding farmers' work tools right when needed most, rearranging household objects overnight, or frightening chickens and pets just to enjoy the commotion.\n\nHis greatest fame, however, comes from music. At night, anyone venturing into the woods can hear the distant sounds of a marimba, guitar, or flute playing unfamiliar melodies that seem to come from everywhere at once. It is El Duende playing for himself among the trees. Drawn by the mysterious music, some have ventured deep into the woods following the sound, only to realize hours later that they were completely lost: El Duende can also imitate human voices, calling targets by name to guide them further from the path home.\n\nThere is also a well-known variation of this legend: El Duende falls hopelessly in love with young girls with light eyes and long braids. When this happens, he appears at night near the girl's house, gently tugging her braids while she sleeps, hiding her favorite toys, or persistently following her when she walks alone. For generations, many mothers cut their young daughters' hair specifically to keep El Duende away.\n\nOver time, this legend has served a practical function beyond simple scares: the fear of encountering El Duende kept generations of children and adults from wandering unnecessarily into deep forests and ravines, helping preserve these ecosystems.",

      /* La Carreta Bruja */
      "ley.data.carreta_bruja.title": "La Carreta Bruja",
      "ley.data.carreta_bruja.sub": "The driverless cart that collects souls",
      "ley.data.carreta_bruja.tag": "Omen · Rural roads",
      "ley.data.carreta_bruja.chip1": "Ghost cart",
      "ley.data.carreta_bruja.chip2": "Rattling chains",
      "ley.data.carreta_bruja.chip3": "Collects souls",
      "ley.data.carreta_bruja.chip4": "Friday nights",
      "ley.data.carreta_bruja.origin": "Oral tradition in rural areas, especially told in eastern and central towns.",
      "ley.data.carreta_bruja.relato": "Many years ago, town elders say, lived a man who surrendered his soul to the devil in exchange for wealth and power. One night, blinded by inner malice, he attempted to force his own oxen into the town church for dark purposes. Feeling the evil around them, the oxen resisted, broke their yokes, and fled into the woods, leaving the cursed man and his cart alone in the night.\n\nSince then, that same cart rolls down rural roads on its own without any animals pulling it, creaking with old wood and the clinking of rusty chains. Skulls sway from its stakes, and those daring to look inside claim to have seen stacked bodies of unrecognized people in terrifying silence.\n\nBehind the cart, witnesses say, strange creatures with dry grass heads follow like living scarecrows. Nobody knows where they head, but all agree: one must step off the path and stay still when hearing those wooden wheels against the dirt.\n\nOne remembered story tells of a man returning late who heard something approaching. Turning around, he saw the dilapidated cart moving without oxen, loaded with skulls and followed by grass-headed beings. Paralysed by fear, he spent three days with a high fever and never let night catch him outdoors again, especially on Fridays.\n\nAccording to tradition, Friday nights are when La Carreta Bruja travels roads most actively, collecting souls of the wicked or dragging its eternal curse as a reminder of the price of evil.",

      /* La Cuyancúa */
      "ley.data.cuyancua.title": "La Cuyancúa",
      "ley.data.cuyancua.sub": "The beast half-snake, half-pig",
      "ley.data.cuyancua.tag": "Creature · Sonsonate",
      "ley.data.cuyancua.chip1": "Half snake",
      "ley.data.cuyancua.chip2": "Half pig",
      "ley.data.cuyancua.chip3": "Foretells storms",
      "ley.data.cuyancua.chip4": "Sugarcane fields of Izalco",
      "ley.data.cuyancua.origin": "Izalco region, Sonsonate department; documented by Leonhard Schultze-Jena.",
      "ley.data.cuyancua.relato": "In the vast sugarcane fields around Izalco, Sonsonate, older residents speak with respect and fear of a creature few have seen up close but many have heard: La Cuyancúa. It is described as a disturbing hybrid with the coiled body of a serpent behind and the head, legs, and grunt of a pig in front, similar in size to a small cow.\n\nWhat has fueled this legend is the sound it emits: a sharp, piercing squeal similar to a frightened pig, heard during early morning hours or right before severe storms. Elders explain that this squeal occurs when its back bristles up, sensing rain before anyone else in town.\n\nLocals near San Ramón report that multiple Cuyancúas exist, emerging periodically from cut sugarcane rows on humid nights before heavy rains. German researcher Leonhard Schultze-Jena documented this Pipil myth in the early 20th century, cementing its place in Salvadoran folklore.\n\nBesides forecasting rain, La Cuyancúa is believed to rule over nearby rivers and streams. When farmers hear its squeal echoing through sugarcane fields at dusk, they secure their homes and prepare, knowing heavy rain will soon follow.",

      /* El Tabudo */
      "ley.data.tabudo.title": "El Tabudo",
      "ley.data.tabudo.sub": "The giant lizard of the volcanoes",
      "ley.data.tabudo.tag": "Creature · Volcanoes",
      "ley.data.tabudo.chip1": "Enormous lizard",
      "ley.data.tabudo.chip2": "Lives in active volcanoes",
      "ley.data.tabudo.chip3": "Guardian of fire",
      "ley.data.tabudo.chip4": "Itzqueye",
      "ley.data.tabudo.origin": "Associated with volcanic areas; linked to Itzqueye, Pipil goddess of fresh water.",
      "ley.data.tabudo.relato": "On the slopes of El Salvador's active volcanoes, where sulfur vapors rise between rocks, lives a creature as old as the mountains: El Tabudo, a giant lizard guarding underground passages leading to the earth's inner fire.\n\nIts exact size is unknown because few who get close return with details. Its skin is as dark and rough as volcanic rock, moving slowly among thermal pools around craters as if unaffected by heat.\n\nOne account tells of a man who ventured too close to a volcanic pool near an active crater. An underwater current dragged him to the depths, into the domain of Itzqueye, Pipil goddess of fresh water. The man vanished completely.\n\nSome versions link El Tabudo directly to Itzqueye as her personal guardian protecting hidden aquatic realms beneath volcanic fire, punishing curious onlookers with disappearance. For generations, this legend served as a practical warning about real volcanic dangers.",

      /* La Giganta de Jocoro */
      "ley.data.giganta_jocoro.title": "La Giganta de Jocoro",
      "ley.data.giganta_jocoro.sub": "The giant icon of local patron saint festivals",
      "ley.data.giganta_jocoro.tag": "Tradition · Morazán",
      "ley.data.giganta_jocoro.chip1": "Giant figure",
      "ley.data.giganta_jocoro.chip2": "Patron festivities",
      "ley.data.giganta_jocoro.chip3": "Lenca tradition",
      "ley.data.giganta_jocoro.chip4": "Icon of Jocoro",
      "ley.data.giganta_jocoro.origin": "Jocoro, Morazán; tied to Lenca tradition and the megaliths of Corinto.",
      "ley.data.giganta_jocoro.relato": "In Jocoro, Morazán, storytellers tell a tale unlike most Salvadoran legends: it speaks not of revengeful spirits, but of a beloved giant figure. Known as La Giganta de Jocoro, she parades through town streets during annual festivals alongside giant family figures and masked dancers.\n\nThis tradition traces back to ancestral beliefs of the Lenca people who inhabited eastern El Salvador. According to their worldview, giants of great strength once lived in the territory, creating the massive megaliths found in Corinto, Morazán.\n\nOver centuries, this belief transformed into a community celebration. Crafted by local artisans, La Giganta became a central festival icon rather than just a mythological memory.\n\nToday, watching La Giganta parade through town brings local pride and connects residents directly to their Lenca heritage, celebrating ancestral roots rather than fear.",

      /* El Sisimite */
      "ley.data.sisimite.title": "El Sisimite",
      "ley.data.sisimite.sub": "The wild man of the hills",
      "ley.data.sisimite.tag": "Creature · Mountains",
      "ley.data.sisimite.chip1": "Covered in fur",
      "ley.data.sisimite.chip2": "Backward feet",
      "ley.data.sisimite.chip3": "Lives in caves",
      "ley.data.sisimite.chip4": "Abducts travelers",
      "ley.data.sisimite.origin": "Mountainous regions; shares roots with Mesoamerican wild man tales.",
      "ley.data.sisimite.relato": "In remote Salvadoran hills where fog covers caves, tales speak of El Sisimite: a giant humanoid covered in thick fur who lives isolated in deep mountain caves.\n\nLike El Cipitío, his feet face backward. Anyone trying to track him end up walking away from his real location, getting lost deeper in unknown terrain.\n\nOld stories tell of his immense strength, capable of uprooting trees and moving massive rocks. He roams lonely trails at night, allegedly abducting careless travelers—especially young women—bringing them to deep caves.\n\nHis presence is felt before he is seen: forest silence falls, birds stop singing, and a smell of wild animal fills the air. Sightings describe a large, hunched silhouette moving with surprising agility.\n\nThis legend kept people away from dangerous highland areas, where real risks like cliffs and wild animals posed genuine danger.",

      /* El Justo Juez de la Noche */
      "ley.data.justo_juez.title": "El Justo Juez de la Noche",
      "ley.data.justo_juez.sub": "The rider who judges sinners",
      "ley.data.justo_juez.tag": "Omen · Roads",
      "ley.data.justo_juez.chip1": "Night horseman",
      "ley.data.justo_juez.chip2": "Justo Juez prayer",
      "ley.data.justo_juez.chip3": "Pursues unfaithful men",
      "ley.data.justo_juez.chip4": "Protective prayer",
      "ley.data.justo_juez.origin": "Oral tradition in rural towns; linked to the Catholic prayer \"El Justo Juez\".",
      "ley.data.justo_juez.relato": "Along rural roads where Catholic faith mixes with night fears, a rider appears before those carrying guilt for dishonest lives: unfaithful men, abusive husbands, or unrepentant wrongdoers. Known as El Justo Juez de la Noche, his appearance feels like a silent sentence.\n\nHis face remains hidden under a broad hat or night shadows. Riding a silent black steed whose hooves barely touch dirt, he travels without uttering words; his presence alone induces panic.\n\nThose who encounter him report nearby horses acting agitated and dogs howling in unison. Travelers feel heavy chest oppression and coldness, knowing the rider recognizes their misdeeds.\n\nTradition states the only escape is reciting the traditional \"Justo Juez\" prayer with genuine faith. Upon hearing the prayer, the rider stops, observes briefly, and rides back into darkness.\n\nThis figure serves a moral purpose in Salvadoran tradition, reminding people that dishonest actions carry consequences while faith offers protection.",

      /* El Padre sin Cabeza */
      "ley.data.padre_sin_cabeza.title": "El Padre sin Cabeza",
      "ley.data.padre_sin_cabeza.sub": "The priest who wanders without rest",
      "ley.data.padre_sin_cabeza.tag": "Spirit · Colonial towns",
      "ley.data.padre_sin_cabeza.chip1": "Headless priest",
      "ley.data.padre_sin_cabeza.chip2": "Rides a black horse",
      "ley.data.padre_sin_cabeza.chip3": "Colonial cobblestones",
      "ley.data.padre_sin_cabeza.chip4": "Eternal penance",
      "ley.data.padre_sin_cabeza.origin": "Colonial towns like Suchitoto and historical centers across the country.",
      "ley.data.padre_sin_cabeza.relato": "In historic colonial towns like Suchitoto, stories tell of a priest who committed a grave sin centuries ago. Known as El Padre sin Cabeza, his soul wanders eternally, riding a noiseless black horse along cobbled streets past midnight.\n\nAccounts vary regarding his crime: some mention an unforgivable sin inside the church, while others talk of betrayal. His punishment was losing his head, condemned to ride in dark robes under moonlight without rest.\n\nHis appearance brings intense coldness even on hot summer nights. Few witnesses describe a headless rider passing central plazas or church streets, never stopping or speaking.\n\nSome believe he seeks an unmade confession, while others view him doing quiet penance. This legend reflects historical religious influence in colonial towns, serving as a reminder that severe misdeeds bring eternal consequences.",

      /* El Sombrerón */
      "ley.data.sombreron.title": "El Sombrerón",
      "ley.data.sombreron.sub": "The small rider with a massive hat",
      "ley.data.sombreron.tag": "Creature · Night roads",
      "ley.data.sombreron.chip1": "Huge hat",
      "ley.data.sombreron.chip2": "Braids horse manes",
      "ley.data.sombreron.chip3": "Prowls the streets",
      "ley.data.sombreron.chip4": "Spooks animals",
      "ley.data.sombreron.origin": "Widespread in Central American folklore, adapted to Salvadoran rural life.",
      "ley.data.sombreron.relato": "In small Salvadoran villages, a short, silent man dressed in black wearing a broad hat prowls dark streets. Known as El Sombrerón, his presence centers around night paths and livestock corrals.\n\nFarm owners report finding horses with intricate braids in their manes by morning, knots too complex to make quickly or in pitch darkness. Locals attribute these mysterious braids directly to El Sombrerón.\n\nNight travelers report feeling steps behind them at a fixed distance. Turning around reveals the silent figure of El Sombrerón following closely without speaking or attacking, simply watching from under his hat.\n\nIn El Salvador, this figure adapted to rural cattle life, explaining knotted horse manes and skittish farm animals while serving as a warning against walking lonely paths late at night.",

      /* El Cuco de los Sueños */
      "ley.data.cuco_de_los_suenos.title": "El Cuco de los Sueños",
      "ley.data.cuco_de_los_suenos.sub": "The shadow that takes disobedient children",
      "ley.data.cuco_de_los_suenos.tag": "Warning · Home",
      "ley.data.cuco_de_los_suenos.chip1": "Shapeless figure",
      "ley.data.cuco_de_los_suenos.chip2": "Appears at night",
      "ley.data.cuco_de_los_suenos.chip3": "Watches over kids",
      "ley.data.cuco_de_los_suenos.chip4": "Family oral tradition",
      "ley.data.cuco_de_los_suenos.origin": "Domestic tradition passed down by grandmothers across El Salvador.",
      "ley.data.cuco_de_los_suenos.relato": "Unlike legends tied to rivers or mountains, El Cuco has no fixed location. He lives in family imagination, described slightly differently by each grandmother and mother.\n\nSome view him as a long shadow stretching across bedroom walls when lights go out, while others describe an old man looking through windows past bedtime. Others imagine a shapeless presence felt through sudden room chills or creaking roofs.\n\nHis purpose remains constant: encouraging children to behave, sleep on time, and obey parents. \"Behave or El Cuco will take you\" is a familiar phrase whispered before bedtime with a mix of care and warning.\n\nEl Cuco functions within the household as an invisible guardian of childhood behavior, maintaining family tradition across generations as a gentle nighttime warning.",
    }
  };

  /* ── Utilidades ── */
  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function t(key, lang) {
    const dict = TRANSLATIONS[lang] || TRANSLATIONS[DEFAULT_LANG];
    
    // 1. Si la clave existe de forma directa en el primer nivel
    if (dict[key] !== undefined) return dict[key];
    
    // 2. Si usa notación de puntos ("mapa.puntos.1.nombre")
    try {
      const valor = key.split('.').reduce((obj, i) => {
        return (obj && obj[i] !== undefined) ? obj[i] : undefined;
      }, dict);
      
      // Si no encuentra nada, devuelve la clave original como fallback
      return valor !== undefined ? valor : key;
    } catch (e) {
      return key;
    }
  }

  // Bandera a mostrar según el idioma actualmente activo
  const FLAGS = { es: "🇸🇻", en: "🇺🇸" };

  /* ── Aplica las traducciones (contenido) al DOM, sin animación.
     Usada en la carga inicial de la página. ── */
  function applyTranslations(lang) {
    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "es");

    // Texto interno
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      el.textContent = t(key, lang);
    });

    // Atributos (alt, placeholder, title, aria-label, content, etc.)
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const pairs = el.getAttribute("data-i18n-attr").split(",");
      pairs.forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        if (attr && key) el.setAttribute(attr, t(key, lang));
      });
    });

    // <title> y <meta name="description">
    const titleKey = document.body.getAttribute("data-i18n-title");
    if (titleKey) document.title = t(titleKey, lang);

    const descKey = document.body.getAttribute("data-i18n-desc");
    if (descKey) {
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute("content", t(descKey, lang));
    }

    // Botón(es) de idioma: solo muestra la bandera del idioma ACTIVO
    document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
      const flagEl = btn.querySelector("[data-lang-toggle-flag]");
      if (flagEl) flagEl.textContent = FLAGS[lang] || FLAGS.es;
      btn.setAttribute("aria-label", t("lang.label", lang));
      btn.setAttribute("data-current-lang", lang);
    });
  }

  /* ── Cambia el idioma con una transición suave:
     1) fade-out del texto de la página
     2) reemplaza el contenido (ya invisible, sin salto brusco)
     3) fade-in + pequeña animación "flip" en el botón de idioma ── */
  function toggleLang() {
    const current = getLang();
    const next = current === "es" ? "en" : "es";

    const toggles = document.querySelectorAll("[data-lang-toggle]");
    toggles.forEach((btn) => btn.classList.add("is-switching"));

    document.body.classList.add("i18n-fading");

    window.setTimeout(() => {
      setLang(next);
      applyTranslations(next);
      document.body.classList.remove("i18n-fading");
    }, 160); // coincide con la transición de opacidad definida en CSS

    window.setTimeout(() => {
      toggles.forEach((btn) => btn.classList.remove("is-switching"));
    }, 550);

    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: next } }));
  }

  /* ── Inicialización ── */
  function init() {
    applyTranslations(getLang());
    document.querySelectorAll("[data-lang-toggle]").forEach((btn) => {
      btn.addEventListener("click", toggleLang);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expuesto por si otro script necesita traducir contenido dinámico
  window.SRi18n = { t, getLang, setLang, applyTranslations, toggleLang };

})();