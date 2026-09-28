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
  // MAX_HISTORY: cuántos mensajes se guardan, muestran y traducen (todo el chat visible).
  const MAX_HISTORY = 60;
  // MAX_CONTEXT_MESSAGES: cuántos mensajes recientes se envían al modelo como contexto
  // en cada pregunta normal, para no disparar el costo/latencia de cada llamada.
  const MAX_CONTEXT_MESSAGES = 10;

  // ==========================================
  // 2. DETECCIÓN DE IDIOMA
  // ==========================================
  // IMPORTANTE: todos los nombres de esta lista deben existir EXACTAMENTE igual
  // en el dataset del mapa (presentation/assets/js/mapa.js). Si se agrega o
  // renombra un lugar aquí, debe reflejarse también en LANDMARKS_MINI más abajo
  // para que el enlace "Ver en el mapa" funcione.
  const RAICES_LANDMARKS_INFO = `SITIOS CULTURALES: Tazumal (Chalchuapa, Santa Ana), Joya de Cerén (San Juan Opico, La Libertad), Salvador del Mundo (San Salvador), Suchitoto (Cuscatlán), Catedral Metropolitana (San Salvador), MUNA (San Salvador), Ruinas de San Andrés (Ciudad Arce, La Libertad), El Boquerón (Volcán de San Salvador), Casa Blanca (Chalchuapa, Santa Ana), Palacio Nacional (Centro Histórico, San Salvador), Teatro Nacional (Centro Histórico, San Salvador), Ilobasco (Cabañas), Parque Ecológico Cinquera (Cabañas).
GASTRONOMÍA: Pupusodromo El Triángulo (Olocuilta, La Paz), Semitas de Cojutepeque (Cuscatlán), Mercado Central (Centro Histórico, San Salvador), Nahuizalco — Mercado Nocturno (Sonsonate), Día Nacional de la Pupusa (Olocuilta, La Paz).
EVENTOS Y FESTIVIDADES: Plaza las Américas (San Salvador), Panchimalco (San Salvador), Festival de Suchitoto (Cuscatlán), Catedral de Santa Ana (Santa Ana), Fiestas Agostinas (San Salvador), Día de los Farolitos (Ahuachapán), Fiestas Julias (Santa Ana), Fiestas Patronales de San Vicente (San Vicente), Festival de las Flores y Palmas (La Libertad), Gran Carnaval de San Miguel (San Miguel), Fiestas de los Historiantes (Cuisnahuat, Sonsonate), Festival del Jocote Corona (Santa Ana), Día de la Calabiuza (Cuscatlán), Día de la Cruz (San Salvador), Festival del Maíz (Chalatenango), Tradición del Bálsamo (Jayaque, La Libertad), Fiestas Patronales de La Unión (La Unión), Festival de los Farolitos en Ataco (Ahuachapán), Festival de la Panela (Cuscatlán), Fiestas del Rey Guajactial (Sonsonate), Festival del Cangrejo (La Paz), Romería de Esquipulas (Chalatenango), Festival del Barro (Cabañas), Fiestas del Arroz (San Vicente), Festival de las Juventudes (El Mozote, Morazán), Feria del Marisco (Usulután), Primicia de la Cosecha (La Unión), Carnaval de la Panela (Verapaz, San Vicente), Fiestas Patronales de Cojutepeque (Cuscatlán), Festival del Añil (Cuscatlán), Fiestas Patronales de Gotera (Morazán), Festival del Chicharrón (La Libertad), Día de la Independencia (Plaza Cívica, San Salvador), Bolas de Fuego de Nejapa (Nejapa, San Salvador), Feria de la Hamaca (San Sebastián, San Vicente).
HISTORIA: Casa de la Cultura de Izalco (Izalco, Sonsonate), Iglesia El Rosario (San Salvador), Museo Militar (San Jacinto, San Salvador), Sitio Arqueológico Cihuatán (Aguilares, San Salvador), Playa y Puerto de Acajutla (Sonsonate), Memorial de El Mozote (Meanguera, Morazán).
LEYENDAS: Lago de Coatepeque (Santa Ana), Bosque El Imposible (Ahuachapán), Puerta del Diablo (Los Planes de Renderos, Panchimalco), Laguna de Alegría (Usulután).`.trim();

  // Base de datos de descripciones verificadas por lugar/evento (misma id que
  // LANDMARKS_MINI/mapa.js), usada para inyectar contexto ESPECÍFICO al LLM
  // solo cuando el mensaje del usuario menciona ese lugar, en vez de mandarle
  // siempre la lista completa. Evita que el modelo "adivine" datos genéricos.
  const LUGARES_INFO = {
    1: { keywords: ['tazumal', 'chalchuapa'], descripcion: 'Sitio arqueológico maya de 2400 años en Chalchuapa. Pirámide principal de 24m de altura con 12 plataformas. Centro de intercambio de cacao, obsidiana y cerámica durante el Período Clásico. Museo con artefactos incluidos vasos decorados y joyas de jade.' },
    2: { keywords: ['joya de ceren', 'joya de cerén', 'pompeya'], descripcion: 'Patrimonio UNESCO: aldea maya enterrada por erupción volcánica hacia 650 d.C. Conserva estructuras y objetos domésticos intactos, como Pompeya. Única evidencia arqueológica de vida cotidiana precolombina en Centroamérica. Abre martes-domingo 9am-4pm.' },
    3: { keywords: ['salvador del mundo', 'monumento'], descripcion: 'Monumento icónico de San Salvador con escultura de Jesús que domina la ciudad. Construido en 1942 como símbolo del Divino Salvador del Mundo. Sitio de encuentro y referencia turística principal con vistas panorámicas de la capital.' },
    4: { keywords: ['suchitoto', 'cuscatlan', 'pueblo colonial'], descripcion: 'Pueblo colonial declarado Conjunto Histórico en 1997. Ubicado en Lago Suchitlán con arquitectura antigua, Catedral de Santa Lucía (1853) y Teatro Alejandro Cotto. Famoso por cerámica en barro negro, textiles de añil y festival del indigo anual.' },
    5: { keywords: ['catedral metropolitana', 'san salvador', 'iglesia'], descripcion: 'Catedral principal construida 1888-1999, ubicada en Plaza Barrios. Alberga tumba del Arzobispo Óscar Romero. Visitada por Papa Juan Pablo II. Arquitectura ecléctica con cúpula de 45m y torres de 50m. Entrada gratuita, acceso diario.' },
    6: { keywords: ['muna', 'museo nacional antropologia', 'museo'], descripcion: 'Museo desde 1883 con colecciones arqueológicas y etnográficas. Seis salas temáticas: Migración, Agricultura, Artesanía, Religión, Entierros Prehispánicos. Ubicado en San Benito, San Salvador. Presenta herencia cultural desde periodos precolombinos hasta presente.' },
    7: { keywords: ['ruinas san andres', 'ciudad arce', 'arqueologia'], descripcion: 'Centro maya clásico tardío (600-900 d.C.) que fue capital regional. Acrópolis con estructuras elevadas donde se realizaban actividades de élite. Ubicado a 32km de San Salvador, cerca de Joya de Cerén. Abre martes-domingo 9am-4pm, $1-5 entrada.' },
    8: { keywords: ['pupusodromo triangulo', 'olocuilta', 'pupusas'], descripcion: 'Centro gastronómico con 20+ pupuserías artesanales en Olocuilta. Pupusas cocinadas en comal sobre fuego de leña desde hace 70 años. Sede del Día Nacional de Pupusa (segundo domingo noviembre). Variedad de sabores: queso, frijol, loroco, chicharrón.' },
    9: { keywords: ['semitas', 'cojutepeque', 'dulce pan'], descripcion: 'Postre tradicional de Cojutepeque: dos capas de pan esponjoso relleno de dulce de piña y panela. Postre seco con decoraciones geométricas. Acompaña bebidas calientes. Disponible en panaderías locales, parte de herencia repostera colonial.' },
    10: { keywords: ['mercado central', 'san salvador', 'compras'], descripcion: 'Mercado principal del Centro Histórico con miles de puestos. Venta de artesanías, textiles, cerámica, alimentos locales y comida salvadoreña típica. Hub cultural donde convergen tradiciones culinarias y artesanales del país.' },
    11: { keywords: ['nahuizalco', 'mercado nocturno', 'sonsonate'], descripcion: 'Pueblo indígena conocido por mercado nocturno de artesanía. Ubicado en Sonsonate. Venta de textiles, cerámica, sombreros de palma y artículos típicos salvadoreños. Experiencia nocturna única con música folklórica y gastronomía local.' },
    12: { keywords: ['plaza americas', 'monumento salvador mundo', 'san salvador'], descripcion: 'Plaza pública con Monumento al Salvador del Mundo. Centro urbano de convergencia, comercio y encuentro. Punto de referencia en San Salvador para turismo, compras y actividades culturales.' },
    13: { keywords: ['panchimalco', 'flores palmas', 'festival'], descripcion: 'Pueblo declarado Patrimonio Intangible UNESCO. Festival Flores y Palmas el primer domingo mayo: procesiones con palmas adornadas con flores. Celebra Día de la Cruz. Antiguas tradiciones indígenas sincretizadas con catolicismo. Participan delegaciones internacionales.' },
    14: { keywords: ['festival suchitoto', 'cuscatlan', 'arte culture'], descripcion: 'Festival cultural anual en pueblo colonial de Suchitoto. Exhibiciones de arte, gastronomía, música viva y danzas folclóricas. Celebra identidad cultural de Cuscatlán. Atrae artistas y turistas nacionales e internacionales.' },
    15: { keywords: ['catedral santa ana', 'santa ana', 'iglesia'], descripcion: 'Catedral principal de Santa Ana con arquitectura religiosa representativa. Centro de fiestas patronales Julias (julio 17-26). Declarada sitio de importancia cultural. Muestra sincretismo de fe indígena y española.' },
    16: { keywords: ['casa cultura izalco', 'izalco', 'sonsonate'], descripcion: 'Centro cultural que preserva tradiciones indígenas Izalco. Exposiciones sobre historia prehispánica y colonial de Sonsonate. Ubicado en municipio de Izalco. Promueve identidad cultural maya-pipil del occidente salvadoreño.' },
    18: { keywords: ['iglesia rosario', 'san salvador', 'arquitectura'], descripcion: 'Iglesia de 1964-1971 con arquitectura Brutalist revolucionaria. Sin columnas interiores, diseñada como puente. Vitrales de colores traídos de Francia crean efecto arcoíris. Patrimonio Cultural 2015. Obra maestra de arquitecto Rubén Martínez.' },
    19: { keywords: ['lago coatepeque', 'santa ana', 'laguna'], descripcion: 'Lago volcánico azul turquesa a 18km de Santa Ana. Profundidad 115m, formado hace 57,000-72,000 años. Ideal kayak, jet ski, buceo. Isla Teopán, ecohoteles, restaurantes locales. Acceso desde CA-1 a 60km de San Salvador.' },
    20: { keywords: ['bosque imposible', 'ahuachapan', 'parque nacional'], descripcion: 'Parque Nacional de 5,000 hectáreas (4,000 de bosque). Última selva tropical seca de El Salvador con 250+ especies de aves. Nombre del peligroso desfiladero histórico. Ocho ríos originan en él. Senderos y ecoturismo, camping, guías comunitarios.' },
    21: { keywords: ['fiestas agostinas', 'san salvador', 'agosto'], descripcion: 'Fiesta patronal en honor Divino Salvador del Mundo, agosto 5-6. Procesión "La Bajada" con imagen de Jesús en púrpura a Catedral. Cambio simbólico a vestiduras blancas. Misa solemne cierra festividades. Tradición vinculada al nombre del país.' },
    22: { keywords: ['dia farolitos', 'ahuachapan', 'septiembre'], descripcion: 'Tradición del 7 septiembre (víspera Virgen María) en Ahuachapán. Iluminación con farolitos artesanales desde 1989. Ofrenda después terremoto 1850. Patrimonio Cultural Intangible 2014. Ahuachapán designada Capital un día en su honor.' },
    23: { keywords: ['fiestas julias', 'santa ana', 'julio'], descripcion: 'Festividades julio 17-26 en honor Santa Ana patrona. Desfile Correo, feria ganadera, jaripeos, conciertos, concursos de marimba. Incluye actos religiosos, culturales y deportivos. Culmina 26 julio con mañanitas y procesión tradicional en Campo Feria.' },
    24: { keywords: ['fiestas patronales san vicente', 'san vicente', 'diciembre'], descripcion: 'Festividades diciembre en honor San Vicente Abad y Mártir. Desfiles de correo, música, danza folclórica. Actividades en barrios y gremios. Celebración religiosa y comunitaria con raíces coloniales. Festividad extendida hasta fin de año.' },
    25: { keywords: ['flores palmas', 'panchimalco', 'mayo'], descripcion: 'Festival Flores y Palmas en Panchimalco el primer domingo mayo. Celebra Día de la Cruz sincretismo maya-católico. Palmas decoradas con flores frescas, procesiones, danza folclórica. Patrimonio UNESCO. Participación de delegaciones Ecuador, México, Colombia.' },
    26: { keywords: ['carnaval san miguel', 'san miguel', 'noviembre'], descripcion: 'Gran Carnaval último sábado noviembre en honor Virgen Paz. Desfiles de carrozas, música, danzas callejeras, ferias gastronómicas. Cierre con conciertos internacionales. Celebración de 25+ eventos octubre-noviembre. Atrae cientos de miles participantes.' },
    27: { keywords: ['historiantes', 'cuisnahuat', 'sonsonate'], descripcion: 'Encuentro de Cumpas entre Jayaque (La Libertad) y Cuisnahuat (Sonsonate). Tradición de danzas ancestrales cuando pueblos se visitan en fiestas patronales. Saludo ritual "topa de manos y frentes". Preserva danzas pipiles documentadas en festividades.' },
    28: { keywords: ['jocote corona', 'santa ana', 'cerro verde'], descripcion: 'Festival octubre (4-5) en Parque Cerro Verde. Celebra fruta jocote corona cultivada en Volcán Santa Ana. Septiembre-octubre cosecha. Artesanos ofrecen productos: atoles, jaleas, dulces, artesanía, joyas. Participa 35+ emprendedores.' },
    29: { keywords: ['calabiuza', 'tonacatepeque', 'noviembre'], descripcion: 'Festival 1 noviembre en Tonacatepeque. Alternativa salvadoreña a Halloween: celebra mitología Cuscatlán (Siguanaba, Cipitío, Cadejo). Personajes folklóricos recorren calles. Grupos transportan carros con personajes mitológicos. Sincretismo indígena-católico post-Día Muertos.' },
    31: { keywords: ['dia cruz', 'mayo', 'tradicion'], descripcion: 'Tradición 3 mayo: altares con cruces en patios adornados con frutas (mangos, jocotes, coyoles). Marca inicio temporada de lluvias. Bendición de cosechas. Sincretismo de veneración católica a Santa Cruz e indígena a madre tierra Xipe Totec.' },
    32: { keywords: ['maiz', 'chalatenango', 'festival'], descripcion: 'Festivales agosto en Chalatenango (especialmente Dulce Nombre María). Celebra cosecha maíz con danzas, reina de festival, vestidos de vainas maíz. Platos típicos: elote asado, atole, rigua, tamales. Hermandad comunitaria agrícola ancestral.' },
    33: { keywords: ['balsamo', 'jayaque', 'libertad'], descripcion: 'Tradición en Cordillera Bálsamo (Jayaque, La Libertad). Árbol nacional declarado junto maquilishuat 1939. Resina medicinal usada cosméticos, medicinas, lacas. Árboles de Jayaque usan en producción café y tours ecológicos. Nombre náhuatl "ushit" (ungüento).' },
    35: { keywords: ['fiestas patronales union', 'la union', 'union'], descripcion: 'Festividades en La Unión en honor patronal del departamento. Celebración religiosa y cultural con procesiones, ferias, música. Punto de entrada a Golfo de Fonseca. Tradición colonial conservada en municipio puerto.' },
    36: { keywords: ['farolitos ataco', 'ataco', 'ahuachapan'], descripcion: 'Festival de Farolitos en Concepción Ataco, Ahuachapán. Celebración paralela a tradición de Ahuachapán (7 septiembre). Pueblo mágico con iluminación artesanal. Parte de ruta flores Ahuachapán con gastronomía y artesanía local.' },
    37: { keywords: ['panela', 'cuscatlan', 'festival'], descripcion: 'Festival de Panela en Cuscatlán. Celebra caña de azúcar y dulce tradicional. Demostraciones de fabricación artesanal de panela en trapiches. Gastronomía con panela: atoles, dulces, bebidas. Sincretismo agrícola indígena-colonial salvadoreño.' },
    38: { keywords: ['guajactial', 'sonsonate'], descripcion: 'Fiestas regionales en Sonsonate vinculadas a figura mitológica/histórica Rey Guajactial. Celebración local con tradiciones pipiles del occidente. Festividades comunitarias con raíces prehispánicas sincretizadas.' },
    39: { keywords: ['cangrejo', 'tecoluca', 'san vicente'], descripcion: 'Festival mayo en La Pita, Tecoluca (San Vicente). Celebra gastronomía de cangrejo del Bajo Lempa. Platos: cangrejo gigante, sopa, cremoso. Música folclórica, danzas, deportes acuáticos como escalada de palo encebado. Reconoce área Ramsar del Lempa.' },
    40: { keywords: ['romeria esquipulas', 'chalatenango', 'peregrinacion'], descripcion: 'Peregrinación religiosa a santuario en Chalatenango. Romería de fe para devotos del Cristo Negro de Esquipulas. Tradición católica con raíces indígenas de veneración sagrada. Participación comunitaria anual.' },
    41: { keywords: ['barro', 'ilobasco', 'cabanas'], descripcion: 'Festival julio (25-26) en Ilobasco. Celebra cerámica artesanal: miniaturas y "sorpresas" de barro desde siglo XIX. Talleres, exhibiciones, demostraciones vivas. Ilobasco cuna de alfarería salvadoreña. Transmisión de técnicas ancestrales documentadas.' },
    42: { keywords: ['arroz', 'san vicente', 'fiestas'], descripcion: 'Festividades en San Vicente celebrando cosecha y producción de arroz. Ferias gastronómicas con platos arroceros. Tradición agrícola comunitaria. Marca identidad productiva del departamento costero salvadoreño.' },
    43: { keywords: ['juventudes', 'mozote', 'morazan'], descripcion: 'Festival en El Mozote, Morazán celebrando vitalidad y participación de jóvenes. Actividades culturales, deportivas y artísticas. Pueblo con importante historia comunitaria post-conflicto. Reconstrucción de tejido social y cultural local.' },
    44: { keywords: ['marisco', 'usulutan', 'feria'], descripcion: 'Feria en Usulután celebrando riqueza gastronómica marina. Mariscos frescos: camarones, cangrejos, langostas, moluscos. Platos típicos del litoral. Promoción de turismo costero y tradición pesquera salvadoreña.' },
    45: { keywords: ['primicia cosecha', 'union'], descripcion: 'Celebración de primeras cosechas en La Unión. Ofrenda y agradecimiento por frutos de tierra. Tradición indígena sincretizada con celebraciones católicas de acción de gracias. Culmina ciclo agrícola comunitario.' },
    46: { keywords: ['panela', 'verapaz', 'san vicente'], descripcion: 'Carnaval de Panela en Verapaz, San Vicente. Celebración lúdica alrededor del dulce tradicional. Desfiles, carrozas con temas paneleros. Gastronomía con panela. Sincretismo agrícola con festividad del carnaval católico.' },
    48: { keywords: ['anil', 'suchitoto', 'festival'], descripcion: 'Festival septiembre (26-27) en Suchitoto. Tributo al añil ("oro azul") que marcó economía colonial. Pasarelas moda con tintes naturales, talleres de teñido, exhibiciones de arte. Día Nacional Índigo 6 septiembre.' },
    49: { keywords: ['gotera', 'morazan', 'fiestas patronales'], descripcion: 'Festividades octubre 1-5 en San Francisco Gotera (capital Morazán). Honor a San Francisco de Asís. Desfile Correo, bandas, mascaradas, reinas. Celebración religiosa con raíces franciscanas coloniales. Gastronomía y esparcimiento comunitario.' },
    50: { keywords: ['chicharron', 'libertad', 'festival'], descripcion: 'Festival celebrando chicharrón (cuero de cerdo frito). Gastronomía salvadoreña icónica. Demostraciones de preparación tradicional. Música y danza folclórica. Transmisión de técnicas culinarias ancestrales campesinas.' },
    51: { keywords: ['boqueron', 'volcan san salvador'], descripcion: 'Parque Nacional en cráter Volcán San Salvador a 1800m altura. Cráter 1.5km diámetro, 558m profundo. Senderos 20-25 min a miradores. Última erupción 1917 mató 1000+ personas. Flora y fauna diversas. Acceso desde San Salvador cercano.' },
    52: { keywords: ['puerta diablo', 'planes renderos', 'leyenda'], descripcion: 'Dos rocas gigantes a modo portal en Cerro El Chulo, Panchimalco. Mirador a 1131m: vista de Lago Ilopango, Volcán San Vicente, Océano Pacífico. Leyenda colonial: demonio escapó perforando acantilado. Sitio de historia oscura pero ahora reclamado por turismo.' },
    53: { keywords: ['casa blanca', 'chalchuapa', 'arqueologia'], descripcion: 'Sitio maya en zona Chalchuapa, Preclásico-Clásico (200 a.C.-250 d.C.). Dos pirámides restauradas. Museo con cerámica maya. 6 hectáreas de complejo mayor destruido por crecimiento urbano. Influencias Olmeca y Teotihuacan. Adquisición estatal 1977.' },
    54: { keywords: ['palacio nacional', 'san salvador', 'centro historico'], descripcion: 'Palacio neoclásico 1905-1911 de "Palacio Café": financiado con colones de exportación cafetera. Estructura antisísmica alemana. 101 salas, cuatro salones históricos. Estatuas de Isabel Católica y Colón (1924). Museo cultural en Centro Histórico.' },
    55: { keywords: ['teatro nacional', 'san salvador', 'centro historico'], descripcion: 'Teatro francés 1911-1917, arquitecto Daniel Beylard. Estilo Renacimiento Francés con elementos Art Nouveau. Gran sala elegante, cúpula interior, detalles decorativos. Declarado Monumento Nacional 1979. Icono cultural frente Plaza Morazán.' },
    58: { keywords: ['independencia', 'septiembre', '15 de septiembre'], descripcion: 'Día Nacional 15 septiembre: conmemoración Independencia 1821 de España. Himno Nacional en escuelas, desfiles cívicos, actos comunitarios. Ceremonia del Presidente en Plaza Libertad. Celebración de identidad y soberanía centroamericana compartida.' },
    64: { keywords: ['museo militar', 'san jacinto', 'san salvador'], descripcion: 'Museo especializado en historia militar de El Salvador. Ubicado en San Jacinto. Artefactos, documentos, uniformes de diferentes épocas. Preservación de memoria histórica de conflictos y defensa nacional. Educación sobre trayectoria militar del país.' },
    65: { keywords: ['cihuatan', 'aguilares', 'arqueologia'], descripcion: 'Sitio arqueológico 900-1200 d.C., uno de los mayores de Centroamérica. Capital regional de 3km² con arquitectura conectada a Veracruz-Puebla. Ocupación Preclásica, abandono por erupción de Ilopango, reocupación en el Clásico Tardío. Museo, senderos, área de picnic, abre martes-domingo.' },
    66: { keywords: ['laguna alegria', 'usulutan', 'sirena'], descripcion: 'Laguna de cráter volcánico en Alegría, Usulután. Aguas azul-turquesa por azufre volcánico. Leyenda indígena: Sirena Xiri (estrella en lenca), sacrificada en lava, lloró formando la laguna. Mito: la sirena enamora hombres guapos y los sumerge. Geología e identidad cultural lenca.' },
    72: { keywords: ['hamaca', 'san sebastian', 'vicente'], descripcion: 'Feria en agosto en San Sebastián, San Vicente. Celebra tejidos artesanales en telares ancestrales. Artesanas fabrican hamacas, manteles, sábanas. Declarada Patrimonio Cultural 2019. Desfiles, batucada, concurso de reina, arte vivo.' },
    73: { keywords: ['fuego', 'nejapa', 'agosto'], descripcion: 'Tradición del 31 agosto en Nejapa honrando a San Jerónimo. Boleros lanzan bolas de fuego durante 2 horas, hechas de trapo empapado en gasolina. Representa la lucha ritual del bien contra el mal. Participantes se mojan por seguridad. Patrimonio Cultural 2019, más de 100 años de tradición.' },
    76: { keywords: ['cojutepeque', 'fiestas patronales', 'cuscatlan'], descripcion: 'Festividades en Cojutepeque en honor a sus patronos. Celebración religiosa y cultural. Gastronomía típica: semitas, salchichas. Mercado central con dulces tradicionales de repostería colonial. Participación comunitaria con raíces históricas.' },
    84: { keywords: ['pupusa', 'nacional', 'noviembre'], descripcion: 'Día Nacional de la Pupusa: segundo domingo de noviembre. Decreto 665 (2005) declara la pupusa plato nacional. Celebración gastronómica en Olocuilta y pupusodromos nacionales. Honra una tradición precolombina evolucionada con el tiempo.' },
    102: { keywords: ['ilobasco', 'cabanas', 'sorpresas', 'alfareria', 'ceramica'], descripcion: 'Ilobasco, Cabañas: pueblo artesano famoso por su alfarería de barro, en especial las "sorpresas", diminutas escenas de la vida cotidiana escondidas dentro de un cascarón de huevo. Talleres familiares visitables a lo largo de la calle principal.' },
    103: { keywords: ['cinquera', 'cabanas', 'parque ecologico'], descripcion: 'Parque Ecológico Cinquera, Cabañas: bosque en regeneración tras la guerra civil, con senderos, cascadas, tirolesa y un museo de la memoria histórica del conflicto armado. Combina ecoturismo con historia reciente del país.' },
    104: { keywords: ['acajutla', 'sonsonate', 'batalla', 'alvarado'], descripcion: 'Playa y Puerto de Acajutla, Sonsonate: en estas costas se libró en 1524 la batalla de Acajutla, primer gran enfrentamiento entre los conquistadores de Pedro de Alvarado y los guerreros Pipiles, quienes lo hirieron con una flecha. Hoy es un puerto y playa activos.' },
    105: { keywords: ['mozote', 'morazan', 'memorial', 'masacre'], descripcion: 'Memorial de El Mozote, Meanguera, Morazán: sitio de memoria en honor a las víctimas de la masacre de 1981 durante la Guerra Civil salvadoreña. Hoy es un espacio de recuerdo y de compromiso con la paz.' },
  };

  // Preguntas frecuentes típicas de visitantes/usuarios del sitio, con
  // respuesta corta ya verificada, para que el chatbot no tenga que
  // improvisar en temas sensibles (migración, seguridad, moneda, etc.).
  const FAQ_INFO = [
    { keywords: ['pupusa', 'pupusas', 'son pupusas'], pregunta: '¿Qué son las pupusas?', respuesta: 'Tortilla artesanal de maíz nixtamalizado rellena de queso, frijoles, chicharrón o loroco. Cocida en comal, origen precolombino. Plato nacional desde 2005. Acompañar con curtido y salsa de tomate.' },
    { keywords: ['siguanaba', 'leyenda'], pregunta: '¿Quién es la Siguanaba?', respuesta: 'Entidad mitológica salvadoreña: mujer hermosa que se transforma en un rostro horrible (facciones de caballo). Atrae a hombres infieles cerca de ríos. Leyenda indígena de castigo por infidelidad.' },
    { keywords: ['cipitio', 'leyenda'], pregunta: '¿Quién es el Cipitío?', respuesta: 'Entidad mitológica salvadoreña: niño eternamente de 10 años, barriga prominente y sombrero cónico grande. Hijo de la Siguanaba. Personaje travieso de la mitología pipil.' },
    { keywords: ['cadejo', 'leyenda'], pregunta: '¿Qué es el Cadejo?', respuesta: 'Criatura sobrenatural salvadoreña: perro mítico blanco (protector) o negro (maligno) que aparece de noche en caminos rurales. Leyenda indígena con raíces en Cuscatlán.' },
    { keywords: ['documentos', 'viajar', 'pasaporte', 'visa'], pregunta: '¿Qué documentos necesito para entrar a El Salvador?', respuesta: 'Pasaporte válido con al menos 6 meses de vigencia. Muchos países no requieren visa para turismo (90 días); ciudadanos del CA-4 (Guatemala, Honduras, Nicaragua) solo necesitan su DUI/carnet. Verifica siempre con Migración.' },
    { keywords: ['moneda', 'dolar', 'colones'], pregunta: '¿Cuál es la moneda de El Salvador?', respuesta: 'Dólar estadounidense (USD), oficial desde 2001. El antiguo colón quedó con tipo de cambio fijo de 8.75 por dólar. Tarjetas aceptadas en ciudades; en zonas rurales conviene llevar efectivo.' },
    { keywords: ['seguro', 'seguridad', 'delincuencia', 'peligro'], pregunta: '¿Es seguro viajar a El Salvador?', respuesta: 'La percepción de seguridad mejoró mucho en los últimos años y el turismo ha crecido. Aun así, toma las precauciones normales de cualquier destino: viaja organizado, evita exhibir objetos de valor y zonas desconocidas de noche.' },
    { keywords: ['clima', 'mejor mes', 'lluvia', 'estacion'], pregunta: '¿Cuál es la mejor época para visitar El Salvador?', respuesta: 'Estación seca (noviembre-abril) es la más recomendada, con clima soleado ideal para volcanes y sitios arqueológicos. Mayo-octubre es temporada de lluvias, con paisajes más verdes.' },
    { keywords: ['ca-4', 'migracion', 'centroamerica'], pregunta: '¿Qué es el CA-4?', respuesta: 'Acuerdo migratorio entre Guatemala, Honduras, Nicaragua y El Salvador que permite circular entre esos países hasta 90 días sin trámite migratorio adicional.' },
    { keywords: ['yuca frita', 'platillo', 'comida'], pregunta: '¿Qué otra comida típica hay además de las pupusas?', respuesta: 'Yuca frita con chicharrón y curtido, sopa de pata, atol de elote y tamales son clásicos. Cada región tiene sus propias especialidades.' },
    { keywords: ['horchata', 'chaparro', 'bebida'], pregunta: '¿Qué bebidas típicas hay?', respuesta: 'Horchata de morro/semillas, chaparro (bebida fermentada de maíz), agua de cebada y el café salvadoreño, reconocido internacionalmente.' },
    { keywords: ['surf', 'playas', 'oceano'], pregunta: '¿Cuál es la mejor playa para surf en El Salvador?', respuesta: 'La Libertad, El Tunco y El Zonte son las más conocidas para surfear, con olas consistentes casi todo el año y escuelas de surf locales.' },
    { keywords: ['cuscatlan', 'significado', 'nombre'], pregunta: '¿Qué significa "Cuscatlán"?', respuesta: 'Del náhuat: "tierra de joyas/collares". Era el nombre del antiguo señorío pipil que dominaba gran parte del territorio salvadoreño antes de la conquista.' },
    { keywords: ['artesania', 'comprar', 'que llevar'], pregunta: '¿Qué artesanía típica debo llevar de El Salvador?', respuesta: 'Textiles teñidos de añil y cerámica de barro negro de Suchitoto, miniaturas de barro de Ilobasco, hamacas de San Sebastián y sombreros de palma de Nahuizalco.' },
    { keywords: ['calendario', 'festividad', 'cuando'], pregunta: '¿Cuándo son los festivales principales?', respuesta: 'Mayo: Flores y Palmas (Panchimalco). Julio: Fiestas Julias (Santa Ana). Agosto: Fiestas Agostinas y Bolas de Fuego (Nejapa). Septiembre: Independencia y Farolitos (Ahuachapán). Noviembre: Día de la Pupusa y Carnaval de San Miguel.' },
    { keywords: ['museo', 'arqueologia', 'arte'], pregunta: '¿Qué museos debo visitar?', respuesta: 'El MUNA (Museo Nacional de Antropología) en San Salvador, y los museos de sitio de Tazumal, Joya de Cerén y Cihuatán para ver piezas arqueológicas originales.' },
    { keywords: ['volcan', 'senderismo', 'aventura'], pregunta: '¿Cuáles son los volcanes principales de El Salvador?', respuesta: 'El Boquerón (Volcán de San Salvador), el Volcán de Santa Ana (el más alto), el Volcán de San Vicente y el Izalco, históricamente activo. Mejor visitarlos en estación seca.' },
    { keywords: ['gastronomia', 'tour', 'comida experiencia'], pregunta: '¿Dónde puedo probar gastronomía auténtica?', respuesta: 'El Pupusodromo El Triángulo en Olocuilta y el Mercado Central de San Salvador son los puntos más recomendados para comida típica auténtica.' },
    { keywords: ['transporte', 'autobus', 'taxi'], pregunta: '¿Cómo me desplazo en El Salvador?', respuesta: 'Buses urbanos e interurbanos económicos, taxis y apps de transporte en las ciudades principales. Para turismo, lo más seguro es contratar tours organizados o transporte privado.' },
    { keywords: ['familia', 'ninos', 'actividades'], pregunta: '¿Qué puedo hacer en familia con niños?', respuesta: 'Lago de Coatepeque para nadar y kayak, El Boquerón para una caminata corta y accesible, el MUNA con salas didácticas, y los pueblos coloniales para pasear y comer.' },
  ];

  function normalizarTexto(str) {
    return (str || '').toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  // Busca en la pregunta del usuario coincidencias con lugares/eventos y con
  // FAQ típicas, y arma un bloque de "datos verificados" para inyectar al
  // prompt SOLO cuando aplica (así no se infla cada request con las ~60
  // descripciones completas). Esto es lo que le da al chatbot respuestas
  // específicas en vez de que el modelo invente detalles por su cuenta.
  function buscarContextoEspecifico(mensaje) {
    const texto = normalizarTexto(mensaje);
    if (!texto) return '';

    const datos = [];
    Object.values(LUGARES_INFO).forEach(item => {
      if (datos.length >= 3) return;
      if (item.keywords.some(kw => texto.includes(normalizarTexto(kw)))) {
        datos.push(item.descripcion);
      }
    });

    const faqs = [];
    FAQ_INFO.forEach(item => {
      if (faqs.length >= 2) return;
      if (item.keywords.some(kw => texto.includes(normalizarTexto(kw)))) {
        faqs.push(`${item.pregunta} ${item.respuesta}`);
      }
    });

    const partes = [...datos, ...faqs];
    if (!partes.length) return '';
    return '\nDATOS VERIFICADOS RELEVANTES A LA PREGUNTA (tómalos como fuente de verdad, no los contradigas ni los ignores):\n' + partes.map(p => '- ' + p).join('\n');
  }

  // El modelo (Llama 3.1 8B) es poco fiable siguiendo reglas numéricas del
  // prompt (probado: con $15 para 10 personas generó un plan de $220 sin
  // avisar nada). Por eso el chequeo de presupuesto imposible se hace acá,
  // en JS, de forma determinística, en vez de confiar en que la IA lo calcule.
  const MIN_USD_POR_PERSONA = 5; // piso aproximado: transporte + comida básica de medio día

  function parseNumeroDolares(str) {
    if (!str) return null;
    const match = String(str).replace(/,/g, '').match(/(\d+(?:\.\d+)?)/);
    return match ? parseFloat(match[1]) : null;
  }

  function parseNumeroPersonas(str) {
    if (!str) return null;
    const match = String(str).match(/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  }

  function getPresupuestoInsuficienteMsg(lang, presupuesto, personas) {
    const minimoRecomendado = personas * MIN_USD_POR_PERSONA;
    const personasQueSiAlcanzan = Math.max(1, Math.floor(presupuesto / MIN_USD_POR_PERSONA));
    if (lang === 'en') {
      return `⚠️ **Adjusted budget:** $${presupuesto} isn't enough for **${personas} people** on this trip (roughly $${MIN_USD_POR_PERSONA}/person minimum for transport + basic food).\n\n- Realistic minimum for ${personas} people: **$${minimoRecomendado}+**\n- Or keep this budget with **${personasQueSiAlcanzan} people** instead\n- Or ask for a shorter plan with just one nearby stop\n\nUse the **Modify plan** button below (or just tell me the change) to try again.`;
    }
    return `⚠️ **Presupuesto ajustado:** $${presupuesto} no alcanza para **${personas} personas** en esta salida (mínimo aproximado de $${MIN_USD_POR_PERSONA}/persona para transporte + comida básica).\n\n- Presupuesto mínimo realista para ${personas} personas: **$${minimoRecomendado}+**\n- O manten este presupuesto con **${personasQueSiAlcanzan} personas** en vez de ${personas}\n- O pide un plan más corto, con una sola parada cercana\n\nUsa el botón **Modificar plan** de abajo (o solo dime el cambio) para intentarlo de nuevo.`;
  }

  // El modelo tampoco es fiable respetando el presupuesto dentro de un plan
  // "normal" (probado: pidiendo $60 igual devolvió Total del grupo: $80).
  // Este chequeo post-hoc parsea el total que realmente devolvió y avisa si
  // se pasó, en vez de dejar pasar un plan que no cuadra con lo pedido.
  function pareceMencionarPresupuesto(texto) {
    if (!texto) return false;
    const t = normalizarTexto(texto);
    return texto.includes('$') || t.includes('presupuesto') || t.includes('budget');
  }

  function parseTotalGrupoDeTexto(texto) {
    const match = (texto || '').match(/total del grupo\**\s*:?\s*\$?\s*([\d,.]+)/i);
    return match ? parseFloat(match[1].replace(/,/g, '')) : null;
  }

  function getPlanSobrePresupuestoMsg(lang, totalGenerado, presupuesto) {
    if (lang === 'en') {
      return `⚠️ **Heads up:** this plan came out to **$${totalGenerado}**, over your **$${presupuesto}** budget. Use the **Modify plan** button to remove an activity, reduce the group size, or raise the budget.`;
    }
    return `⚠️ **Aviso:** este plan salió en **$${totalGenerado}**, por encima de tu presupuesto de **$${presupuesto}**. Usa el botón **Modificar plan** para quitar una actividad, reducir personas, o subir el presupuesto.`;
  }

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
  let plannerLastPlan = '';
  let isTranslating = false;
  let pendingTranslationLang = null;
  let historyLang = currentLang;

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
      inputPlaceholderPeople: 'Ej. 2 personas, 5 (toda la familia)...',
      inputPlaceholderBudget: 'Ej. $20, económico...',
      inputPlaceholderDuration: 'Ej. 4 horas, medio día...',
      inputPlaceholderDetails: 'Escribe detalles o escribe "omitir"...',
      inputPlaceholderGenerating: 'Generando tu plan...',
      inputPlaceholderModify: 'Describe qué deseas cambiar del plan...',
      mapLinkText: '📍 Ver {name} en el mapa',
      welcomeMessage: "¡Hola! Soy **Pupusita**, tu guía cultural de Salvadorean Roots. 🌿\n\nPuedo ayudarte con información sobre la historia, gastronomía, leyendas, sitios culturales y eventos de El Salvador. ¿Qué deseas saber?\n\n💡 Tip: activa el botón **Planificar** de arriba y te ayudo a armar una salida según lo que quieras hacer y tu presupuesto.",
      lockedMessage: "🔒 **Acceso restringido**\n\nPara usar el asistente Pupusita, necesitas **iniciar sesión** en Salvadorean Roots.\n\n¡Regístrate o inicia sesión para descubrir toda la cultura salvadoreña! 🇸🇻",
      loginButton: 'Iniciar sesión',
      registerButton: 'Registrarse',
      plannerStart: "¡Perfecto! Activaste el **Planificador de salidas**. 🧭\n\nVamos a armar tu plan ideal por El Salvador. Primero, **¿qué tipo de actividad te gustaría hacer?** (Puedes escribir: *gastronomía, historia, leyendas, playas o un poco de todo*).",
      errValidation: "❌ **Esa no es la información que he solicitado.** Por favor, sigue las indicaciones descritas.",
      plannerLocationPrompt: "Entendido. Ahora, **¿desde qué ciudad o municipio vas a iniciar tu salida?**",
      plannerPeoplePrompt: "Genial. **¿Cuántas personas van a participar en la salida?** Así calculo bien los costos de transporte y comida para el grupo.",
      plannerBudgetPrompt: "Anotado. **¿Cuál es tu presupuesto aproximado en dólares ($ USD) para toda la salida (grupo completo)?**",
      plannerDurationPrompt: "Perfecto. **¿Cuánto tiempo tienes disponible para tu salida?**",
      plannerDetailsPrompt: "Una última cosa 🙂: **¿Hay algún platillo, lugar específico o preferencia que quieras incluir sí o sí?** Si no, escribe *\"omitir\"*.",
      plannerSuccess: "¡Tu plan ha sido generado con éxito! El planificador se ha desactivado automáticamente. Puedes seguir haciéndome preguntas normales.",
      plannerModifyOffer: "¿Quieres ajustar algo del plan? Puedo cambiar actividades, el presupuesto, el transporte o cualquier detalle.",
      modifyPlanBtn: '✏️ Modificar plan',
      plannerModifyPrompt: "Cuéntame qué te gustaría cambiar del plan (por ejemplo: cambiar una actividad, ajustar el presupuesto, el número de personas o agregar un lugar) y lo actualizo.",
      plannerModifySuccess: "¡Listo! Actualicé tu plan según lo que pediste.",
      errGeneric: "Hubo un problema. Por favor intenta de nuevo.",
      quickQuestions: ['¿Qué son las pupusas?', '¿Qué es Joya de Cerén?', '¿Quién es la Siguanaba?', '¿Cuándo son las Fiestas Agostinas?'],
      sharePlan: '📤 Compartir plan',
      planImageAlt: 'Itinerario de Salvadorean Roots',
      chatTranslated: 'Chat traducido',
      ariaOpen: 'Abrir asistente de Salvadorean Roots',
      ariaClose: 'Cerrar asistente',
      ariaSend: 'Enviar'
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
      inputPlaceholderPeople: 'E.g., 2 people, 5 (whole family)...',
      inputPlaceholderBudget: 'E.g., $20, budget...',
      inputPlaceholderDuration: 'E.g., 4 hours, half day...',
      inputPlaceholderDetails: 'Type details or write "skip"...',
      inputPlaceholderGenerating: 'Generating your plan...',
      inputPlaceholderModify: 'Describe what you want to change about the plan...',
      mapLinkText: '📍 See {name} on the map',
      welcomeMessage: "Hello! I am **Pupusita**, your cultural guide from Salvadorean Roots. 🌿\n\nI can help you with information about history, gastronomy, legends, cultural sites, and events in El Salvador. What do you want to know?\n\n💡 Tip: activate the **Plan Trip** button above and I will help you build an itinerary based on your preferences and budget.",
      lockedMessage: "🔒 **Access restricted**\n\nTo use the Pupusita assistant, you need to **log in** to Salvadorean Roots.\n\nSign up or log in to discover all Salvadoran culture! 🇸🇻",
      loginButton: 'Log in',
      registerButton: 'Sign up',
      plannerStart: "Perfect! You activated the **Trip Planner**. 🧭\n\nLet's plan your ideal trip around El Salvador. First, **what kind of activity would you like to do?**",
      errValidation: "❌ **That is not the information I requested.** Please follow the instructions provided.",
      plannerLocationPrompt: "Understood. Now, **from which city or town will you start your trip?**",
      plannerPeoplePrompt: "Great. **How many people will be going on the trip?** That way I can calculate transport and food costs for the whole group.",
      plannerBudgetPrompt: "Noted. **What is your approximate budget in dollars ($ USD) for the whole trip (entire group)?**",
      plannerDurationPrompt: "Perfect. **How much time do you have available for your trip?**",
      plannerDetailsPrompt: "One last thing 🙂: **Is there any specific dish, place, or preference you want to include no matter what?** If not, write *\"skip\"*.",
      plannerSuccess: "Your plan has been generated successfully! The planner has turned off automatically. You can keep asking me regular questions.",
      plannerModifyOffer: "Want to tweak anything about the plan? I can change activities, budget, transport, or any detail.",
      modifyPlanBtn: '✏️ Modify plan',
      plannerModifyPrompt: "Tell me what you'd like to change about the plan (e.g., swap an activity, adjust the budget, the number of people, or add a place) and I'll update it.",
      plannerModifySuccess: "Done! I updated your plan based on your request.",
      errGeneric: "There was a problem. Please try again.",
      quickQuestions: ['What are pupusas?', 'What is Joya de Cerén?', 'Who is the Siguanaba?', 'When are the August Festivals?'],
      sharePlan: '📤 Share plan',
      planImageAlt: 'Salvadorean Roots Itinerary',
      chatTranslated: 'Chat translated',
      ariaOpen: 'Open the Salvadorean Roots assistant',
      ariaClose: 'Close assistant',
      ariaSend: 'Send'
    }
  };

  // ==========================================
  // 4. SISTEMA DE PROMPTS
  // ==========================================
  function getCurrentDateInfo(lang) {
    const now = new Date();
    const locale = lang === 'en' ? 'en-US' : 'es-SV';
    const formatted = now.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return { formatted, year: now.getFullYear() };
  }

  function getSystemPrompt(lang, userMessage) {
    const { formatted: todayStr, year } = getCurrentDateInfo(lang);
    const contextoEspecifico = buscarContextoEspecifico(userMessage);
    const basePrompt = lang === 'en' ?
      `You are "Pupusita", assistant for Salvadorean Roots. ALWAYS respond in English. Only talk about culture, history, gastronomy, tourism, and legends of El Salvador (Current date: ${todayStr}).
CRITICAL RESPONSE RULES:
1. Ultra direct and minimalist: Respond in telegraphic style. Forbidden to use introductions. Go straight to the data in the very first word.
2. Maximum length: Strict limit of 1 to 2 short sentences (max 25 words total).
3. Formatting: Bold **the main topic** the first time you mention it.
4. Coverage: Valid questions about Salvadorean territory, presidents, and current local news. Do not respond about other countries.
5. Exact names: If you cite places from the verified list, write them EXACTLY the same way.
${RAICES_LANDMARKS_INFO}
6. Filter: If greeted, say only: "Hello, I am Pupusita. What info are you looking for?". If unrelated to El Salvador, respond ONLY: "I don't have answers for topics unrelated to the site."
7. Language: ALWAYS respond in the same language the user writes to you.
8. Dates: Today is ${todayStr}. If asked about festivals, fairs, or patron saint celebrations "coming up" or "soon", only mention ones whose date is on or after today in the ${year} calendar; if one already happened this year, say so and mention it happens again next year instead of presenting it as upcoming.` :
      `Eres "Pupusita", asistente de Salvadorean Roots. Responde SIEMPRE en español. Solo hablas sobre cultura, historia, gastronomía, turismo y leyendas de El Salvador (Fecha actual: ${todayStr}).
REGLAS CRÍTICAS DE RESPUESTA:
1. Ultra directo y minimalist: Responde con estilo telegráfico. Prohibido usar introducciones. Ve directo al dato en la primera palabra.
2. Extensión máxima: Límite estricto de 1 a 2 frases cortas (máximo 25 palabras en total).
3. Formato: Resalta en **negrita** el tema principal la primera vez que lo normales.
4. Cobertura: Válidas preguntas sobre territorio salvadoreño, presidentes y noticias locales actuales. No respondas sobre otros países.
5. Nombres exactos: Si citas lugares de la lista verificada, escríbelos EXACTAMENTE igual.
${RAICES_LANDMARKS_INFO}
6. Filtro: Si te saludan, di solo: "Hola, soy Pupusita. ¿Qué dato buscas?". Si es ajeno a El Salvador, responde ÚNICAMENTE: "No tengo respuesta a temas no relacionados al sitio."
7. Idioma: Responde SIEMPRE en el mismo idioma en el que el usuario te escriba.
8. Fechas: Hoy es ${todayStr}. Si te preguntan por festivales, ferias o fiestas patronales "próximas" o "que se acercan", menciona solo las que caen en o después de hoy dentro del calendario ${year}; si una ya pasó este año, acláralo y di que se celebra de nuevo el próximo año en vez de presentarla como próxima.`;

    return basePrompt + contextoEspecifico;
  }

  function getPlannerSystemPrompt(lang, userMessage) {
    const { formatted: todayStr, year } = getCurrentDateInfo(lang);
    const contextoEspecifico = buscarContextoEspecifico(userMessage);
    if (lang === 'en') {
      return `You are "Pupusita" in "Trip Planner" mode. ALWAYS respond in English. Create detailed, realistic itineraries in El Salvador using dollars ($ USD), based on the group size given by the user. Today's date is ${todayStr}.
CRITICAL PLAN RULES:
1. Strict format: Zero paragraphs, zero introductory texts. Respond DIRECTLY with the numbered list.
2. Detail level: 3 to 4 concrete activities/stops, each with a one-line description of what to do there and its cost (TOTAL for the whole group, based on the number of people given).
3. Costs breakdown: After the activities, include separate itemized lines for **🚗 Transporte** (estimated for the whole group, considering distance from the starting point and group size) and **🍽️ Comida** (estimated per meal for the whole group). If food is already covered inside an activity, do not duplicate it in this line.
4. Totals: End with **Total del grupo** and **Total por persona**. These MUST be mathematically correct: **Total del grupo** = the exact sum of every cost listed above (each activity's cost plus Transporte and Comida), added digit by digit, not estimated. **Total por persona** = Total del grupo divided by the number of people, rounded to the nearest dollar. Double-check the arithmetic before answering; a wrong sum is a critical failure. **Total del grupo** must NEVER be greater than the budget the user gave you: if your planned activities would add up to more than that budget, remove or downgrade activities until the total fits, instead of silently going over.
5. MANDATORY budget check, do this BEFORE writing anything else: compute minBudget = number of people × $5 (rough floor for basic transport + food on a half-day trip). If the budget given by the user is less than minBudget, this is an INSUFFICIENT BUDGET case: skip rules 1-4 and follow rule 11 instead of a normal plan. Otherwise continue normally with rules 1-4.
6. Exact names: Use EXACTLY the names from this list if included:
${RAICES_LANDMARKS_INFO}
7. Closure: No farewells or recommendations. End immediately right after the per-person total. (Does not apply when rule 11 is used.)
8. Language: ALWAYS respond in the same language the user writes to you.
9. Modifications: If the user asks to modify a previously generated plan, keep the same format and rules above, apply ONLY the requested change, and keep the rest of the plan consistent (people count, budget, location) unless the change says otherwise.
10. Dates: Only include a seasonal festival/fair/patron-saint event in the plan if it is realistically happening on or around today (${todayStr}, ${year}) or the trip is explicitly planned around it; do not suggest an event that already passed this year as if it were happening now.
11. Insufficient budget response (only used when rule 5 detected it — never refuse and never reply with a plain apology): reply with EXACTLY these parts in this order, nothing else: (a) 1 to 2 very cheap activities/stops that genuinely fit inside the given budget, each with its real cost; (b) **Total del grupo** and **Total por persona** for that short list only — these totals MUST be less than or equal to the budget the user gave, never higher; (c) a line starting with "⚠️ Adjusted budget:" explaining in one short sentence that the given budget does not cover a full itinerary for this group size/duration; (d) 2 to 3 short bullet points with concrete fixes (a realistic minimum $ budget for this group size, fewer people, or a cheaper/shorter plan); (e) end with exactly: "Use the Modify plan button to apply one of these changes." Rule 7 (closure) does not apply to this case.` + contextoEspecifico;
    }
    return `Eres "Pupusita" en modo "Planificador de salidas". Responde SIEMPRE en español. Crea itinerarios detallados y realistas en El Salvador usando dólares ($ USD), basados en la cantidad de personas indicada por el usuario. La fecha de hoy es ${todayStr}.
REGLAS CRÍTICAS DEL PLAN:
1. Formato estricto: Cero párrafos, cero textos introductorios. Responde DIRECTAMENTE con la lista numerada.
2. Nivel de detalle: De 3 a 4 actividades/paradas concretas, cada una con una línea describiendo qué hacer ahí y su costo (TOTAL para todo el grupo, según el número de personas indicado).
3. Desglose de costos: Después de las actividades, incluye líneas separadas para **🚗 Transporte** (estimado para todo el grupo, considerando la distancia desde el punto de partida y el número de personas) y **🍽️ Comida** (estimado por comida para todo el grupo). Si la comida ya está incluida en una actividad, no la dupliques en esta línea.
4. Totales: Termina con **Total del grupo** y **Total por persona**. Deben ser matemáticamente correctos: **Total del grupo** = la suma exacta de cada costo mencionado arriba (cada actividad más Transporte y Comida), sumada cifra por cifra, no estimada. **Total por persona** = Total del grupo dividido entre el número de personas, redondeado al dólar más cercano. Verifica la suma antes de responder; una suma incorrecta es una falla crítica. **Total del grupo** NUNCA debe ser mayor que el presupuesto que dio el usuario: si tus actividades suman más que ese presupuesto, quita o cambia actividades hasta que el total quepa, en vez de pasarte en silencio.
5. Verificación OBLIGATORIA de presupuesto, hazla ANTES de escribir cualquier otra cosa: calcula minimoPresupuesto = número de personas × $5 (piso aproximado para transporte + comida básica en una salida de medio día). Si el presupuesto que dio el usuario es MENOR que minimoPresupuesto, este es un caso de PRESUPUESTO INSUFICIENTE: sáltate las reglas 1-4 y sigue la regla 11 en vez de un plan normal. Si no, continúa normal con las reglas 1-4.
6. Nombres exactos: Usa EXACTAMENTE los nombres de esta lista si los incluyes:
${RAICES_LANDMARKS_INFO}
7. Cierre: Sin despedidas ni recomendaciones. Termina inmediatamente tras el total por persona. (No aplica cuando se usa la regla 11.)
8. Idioma: Responde SIEMPRE en el mismo idioma en el que el usuario te escriba.
9. Modificaciones: Si el usuario pide modificar un plan ya generado, mantén el mismo formato y reglas anteriores, aplica SOLO el cambio pedido y conserva el resto del plan consistente (número de personas, presupuesto, ubicación) salvo que el cambio indique lo contrario.
10. Fechas: Solo incluye una festividad, feria o fiesta patronal de temporada en el plan si realmente ocurre en o cerca de hoy (${todayStr}, ${year}) o si la salida se está planificando explícitamente alrededor de ella; no sugieras como vigente un evento que ya pasó este año.
11. Respuesta de presupuesto insuficiente (solo cuando la regla 5 lo detectó — nunca te niegues ni respondas solo con una disculpa): responde con EXACTAMENTE estas partes en este orden, nada más: (a) 1 a 2 actividades/paradas muy económicas que sí quepan de verdad en el presupuesto dado, cada una con su costo real; (b) **Total del grupo** y **Total por persona** de esa lista corta únicamente — estos totales DEBEN ser menores o iguales al presupuesto que dio el usuario, nunca mayores; (c) una línea que empiece con "⚠️ Presupuesto ajustado:" explicando en una frase corta que el presupuesto dado no alcanza para un itinerario completo con ese número de personas/duración; (d) de 2 a 3 viñetas cortas con soluciones concretas (un presupuesto mínimo realista en $ para ese número de personas, menos personas, o un plan más corto/económico); (e) termina exactamente con: "Usa el botón Modificar plan para aplicar alguno de estos cambios." La regla 7 (cierre) no aplica en este caso.` + contextoEspecifico;
  }

  // ==========================================
  // 5. MANEJO DEL HISTORIAL (SOLO 4 MENSAJES)
  // ==========================================
  function loadSavedHistory() {
    if (!isAuthenticated()) return;
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
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
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(conversationHistory));
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

  // Debe cubrir TODOS los nombres listados en RAICES_LANDMARKS_INFO, con el
  // mismo id que usa presentation/assets/js/mapa.js, para que el enlace
  // "Ver en el mapa" siempre apunte a un lugar que sí existe ahí.
  const LANDMARKS_MINI = [
    { id: 1,  nombre: 'Tazumal' }, { id: 2,  nombre: 'Joya de Cerén' }, { id: 3,  nombre: 'Salvador del Mundo' },
    { id: 4,  nombre: 'Suchitoto' }, { id: 5,  nombre: 'Catedral Metropolitana' }, { id: 6,  nombre: 'MUNA' },
    { id: 7,  nombre: 'Ruinas de San Andrés' }, { id: 8,  nombre: 'Pupusodromo El Triángulo' }, { id: 9,  nombre: 'Semitas de Cojutepeque' },
    { id: 10, nombre: 'Mercado Central' }, { id: 11, nombre: 'Nahuizalco — Mercado Nocturno' },
    { id: 12, nombre: 'Plaza las Américas' }, { id: 13, nombre: 'Panchimalco' }, { id: 14, nombre: 'Festival de Suchitoto' },
    { id: 15, nombre: 'Catedral de Santa Ana' }, { id: 16, nombre: 'Casa de la Cultura de Izalco' }, { id: 18, nombre: 'Iglesia El Rosario' },
    { id: 19, nombre: 'Lago de Coatepeque' }, { id: 20, nombre: 'Bosque El Imposible' }, { id: 21, nombre: 'Fiestas Agostinas' },
    { id: 22, nombre: 'Día de los Farolitos' }, { id: 23, nombre: 'Fiestas Julias' }, { id: 24, nombre: 'Fiestas Patronales de San Vicente' },
    { id: 25, nombre: 'Festival de las Flores y Palmas' }, { id: 26, nombre: 'Gran Carnaval de San Miguel' }, { id: 27, nombre: 'Fiestas de los Historiantes' },
    { id: 28, nombre: 'Festival del Jocote Corona' }, { id: 29, nombre: 'Día de la Calabiuza' }, { id: 31, nombre: 'Día de la Cruz' },
    { id: 32, nombre: 'Festival del Maíz' }, { id: 33, nombre: 'Tradición del Bálsamo' }, { id: 35, nombre: 'Fiestas Patronales de La Unión' },
    { id: 36, nombre: 'Festival de los Farolitos en Ataco' }, { id: 37, nombre: 'Festival de la Panela' }, { id: 38, nombre: 'Fiestas del Rey Guajactial' },
    { id: 39, nombre: 'Festival del Cangrejo' }, { id: 40, nombre: 'Romería de Esquipulas' }, { id: 41, nombre: 'Festival del Barro' },
    { id: 42, nombre: 'Fiestas del Arroz' }, { id: 43, nombre: 'Festival de las Juventudes' }, { id: 44, nombre: 'Feria del Marisco' },
    { id: 45, nombre: 'Primicia de la Cosecha' }, { id: 46, nombre: 'Carnaval de la Panela' }, { id: 48, nombre: 'Festival del Añil' },
    { id: 49, nombre: 'Fiestas Patronales de Gotera' }, { id: 50, nombre: 'Festival del Chicharrón' }, { id: 51, nombre: 'El Boquerón' },
    { id: 52, nombre: 'Puerta del Diablo' }, { id: 53, nombre: 'Casa Blanca' }, { id: 54, nombre: 'Palacio Nacional' },
    { id: 55, nombre: 'Teatro Nacional' }, { id: 58, nombre: 'Día de la Independencia' }, { id: 64, nombre: 'Museo Militar' },
    { id: 65, nombre: 'Sitio Arqueológico Cihuatán' }, { id: 66, nombre: 'Laguna de Alegría' }, { id: 72, nombre: 'Feria de la Hamaca' },
    { id: 73, nombre: 'Bolas de Fuego de Nejapa' }, { id: 76, nombre: 'Fiestas Patronales de Cojutepeque' }, { id: 84, nombre: 'Día Nacional de la Pupusa' },
    { id: 102, nombre: 'Ilobasco' }, { id: 103, nombre: 'Parque Ecológico Cinquera' },
    { id: 104, nombre: 'Playa y Puerto de Acajutla' }, { id: 105, nombre: 'Memorial de El Mozote' },
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
      position: fixed; bottom: calc(28px + var(--rs-footer-lift, 0px)); left: 28px; width: 60px; height: 60px; border-radius: 50%;
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
      position: fixed; bottom: calc(100px + var(--rs-footer-lift, 0px)); left: 28px; background: #113068; color: #fff;
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

    .rs-translate-spinner { display: flex; align-items: center; justify-content: center; flex: 1; width: 100%; height: 100%; min-height: 120px; }
    .rs-spinner { width: 34px; height: 34px; border-radius: 50%; border: 3px solid rgba(190,142,86,0.25); border-top-color: #be8e56; animation: rs-spin 0.8s linear infinite; }
    @keyframes rs-spin { to { transform: rotate(360deg); } }
    
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
    [data-theme="light"] .rs-spinner { border-color: rgba(17,48,104,0.15); border-top-color: #be8e56; }
    [data-theme="light"] #rs-share-plan { background: rgba(190,142,86,0.1); color: #8b6b3a; }
    [data-theme="light"] .rs-login-overlay { background: rgba(255,253,248,0.92); backdrop-filter: blur(4px); }
    [data-theme="light"] .rs-login-overlay .rs-lock-title { color: #113068; }
    [data-theme="light"] .rs-login-overlay .rs-lock-desc { color: rgba(44,38,32,0.7); }

    /* Celular en horizontal: la ventana usaba el mismo alto pensado para
       vertical (hasta 80% de la pantalla), así que en un celular acostado
       (poca altura real) tapaba casi toda la pantalla. Acá se vuelve más
       ancha que alta: aprovecha el ancho disponible y se achica en alto
       para dejar ver más de lo que hay detrás. */
    @media (max-height: 480px) and (orientation: landscape) {
      #rs-chat-window {
        width: clamp(320px, 92vw, 640px);
        height: clamp(220px, 78vh, 360px);
      }
    }

    /* Celular en vertical: 80% de la pantalla (el alto pensado para
       escritorio, donde la ventana flota chica en una esquina) es
       demasiado en un celular normal — la ventana queda pegada casi de
       punta a punta, incómoda para leer y, sobre todo, para escribir
       (el teclado le come todavía más espacio visible). Se baja a un
       alto más manejable y se acerca al borde inferior para dejar ver
       algo de la página detrás. */
    @media (max-width: 600px) and (orientation: portrait) {
      #rs-chat-window {
        bottom: 84px;
        height: min(64vh, 520px);
      }
    }
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
    plannerStep = 'people';
    setInputEnabled(true, TRANSLATABLE_TEXTS[currentLang].inputPlaceholderPeople);
    addBotMessage(TRANSLATABLE_TEXTS[currentLang].plannerPeoplePrompt);
  }

  function procesarPasoPersonas(text) {
    const match = text.match(/\d+/);
    const count = match ? parseInt(match[0], 10) : NaN;
    if (!count || count < 1 || count > 100) {
      addBotMessage(TRANSLATABLE_TEXTS[currentLang].errValidation);
      return;
    }
    plannerData.people = count;
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
    generatePlan(false);
  }

  function procesarPasoModificar(text) {
    if (text.trim().length < 3) {
      addBotMessage(TRANSLATABLE_TEXTS[currentLang].errValidation);
      return;
    }
    plannerData.modification = text;
    plannerStep = 'generating';
    generatePlan(true);
  }

  function startModifyFlow() {
    if (!isAuthenticated() || isLoading) return;
    plannerMode = true;
    setPlannerToggle(true);
    plannerStep = 'modify';
    setInputEnabled(true, TRANSLATABLE_TEXTS[currentLang].inputPlaceholderModify);
    addBotMessage(TRANSLATABLE_TEXTS[currentLang].plannerModifyPrompt);
    document.getElementById('rs-chat-input')?.focus();
  }

  function addModifyOfferMessage() {
    const msgs = document.getElementById('rs-chat-messages');
    if (!msgs || !isAuthenticated()) return;
    const div = document.createElement('div');
    div.className = 'rs-msg bot';
    div.innerHTML = `<div class="rs-msg-bubble">${formatMessageText(TRANSLATABLE_TEXTS[currentLang].plannerModifyOffer)}</div>`;
    const qWrap = document.createElement('div');
    qWrap.className = 'rs-quick-btns';
    const b = document.createElement('button');
    b.className = 'rs-quick-btn';
    b.textContent = TRANSLATABLE_TEXTS[currentLang].modifyPlanBtn;
    b.addEventListener('click', () => startModifyFlow());
    qWrap.appendChild(b);
    div.appendChild(qWrap);
    msgs.appendChild(div);
    animateMessageNode(div);
    gsap.to(qWrap, { opacity: 1, y: 0, duration: 0.3, delay: 0.15 });
    msgs.scrollTop = msgs.scrollHeight;
  }

  async function generatePlan(isModification) {
    if (!isAuthenticated()) return;
    setInputEnabled(false, TRANSLATABLE_TEXTS[currentLang].inputPlaceholderGenerating);
    showTyping();

    // Chequeo determinístico de presupuesto imposible (ver nota en
    // getPresupuestoInsuficienteMsg): solo aplica a la generación inicial,
    // porque en una modificación el presupuesto/personas pueden venir
    // descritos en texto libre dentro de plannerData.modification.
    if (!isModification) {
      const presupuestoNum = parseNumeroDolares(plannerData.budget);
      const personasNum = parseNumeroPersonas(plannerData.people);
      if (presupuestoNum != null && personasNum != null && presupuestoNum < personasNum * MIN_USD_POR_PERSONA) {
        hideTyping();
        addBotMessage(getPresupuestoInsuficienteMsg(currentLang, presupuestoNum, personasNum));
        plannerStep = null;
        setPlannerToggle(false);
        setInputEnabled(true, TRANSLATABLE_TEXTS[currentLang].inputPlaceholder);
        addModifyOfferMessage();
        return;
      }
    }

    const isEn = currentLang === 'en';
    const basePrompt = isEn ?
`Plan a trip with these preferences:
- Starting Location: ${plannerData.startLocation}
- Number of people: ${plannerData.people}
- Desired Activity: ${plannerData.activity}
- Total Budget (for the whole group): ${plannerData.budget}
- Time Available: ${plannerData.duration}${plannerData.details ? `\n- Specific Preferences: ${plannerData.details}` : ''}
Provide a concrete, detailed and realistic plan inside El Salvador for this group size.`
:
`Planifícame una salida con estas preferencias:
- Punto de inicio/Ciudad origen: ${plannerData.startLocation}
- Número de personas: ${plannerData.people}
- Actividad deseada: ${plannerData.activity}
- Presupuesto total (para todo el grupo): ${plannerData.budget}
- Tiempo disponible: ${plannerData.duration}${plannerData.details ? `\n- Preferencias específicas: ${plannerData.details}` : ''}
Dame un plan concreto, detallado y realista dentro de El Salvador para este número de personas.`;

    const userPrompt = isModification
      ? (isEn
          ? `Here is the previously generated plan:\n${plannerLastPlan}\n\nOriginal preferences:\n${basePrompt}\n\nRequested change: ${plannerData.modification}\n\nReturn the FULL updated plan (same format), applying only the requested change.`
          : `Este es el plan generado anteriormente:\n${plannerLastPlan}\n\nPreferencias originales:\n${basePrompt}\n\nCambio solicitado: ${plannerData.modification}\n\nDevuelve el plan COMPLETO actualizado (mismo formato), aplicando solo el cambio solicitado.`)
      : basePrompt;

    try {
      const response = await fetch(PROXY_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ system: getPlannerSystemPrompt(currentLang, `${plannerData.activity || ''} ${plannerData.details || ''}`), messages: [{ role: 'user', content: userPrompt }], max_tokens: 900 })
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

      const budgetFromModification = (isModification && pareceMencionarPresupuesto(plannerData.modification))
        ? parseNumeroDolares(plannerData.modification)
        : null;
      const presupuestoComparar = budgetFromModification != null ? budgetFromModification : parseNumeroDolares(plannerData.budget);
      const totalGrupoNum = parseTotalGrupoDeTexto(replyText);
      const sePasoDelPresupuesto = presupuestoComparar != null && totalGrupoNum != null && totalGrupoNum > presupuestoComparar * 1.1;

      plannerLastPlan = replyText;
      if (budgetFromModification != null) plannerData.budget = `$${budgetFromModification}`;
      plannerData.modification = '';
      plannerStep = null;
      setPlannerToggle(false);
      setInputEnabled(true, TRANSLATABLE_TEXTS[currentLang].inputPlaceholder);
      addBotMessage(isModification ? TRANSLATABLE_TEXTS[currentLang].plannerModifySuccess : TRANSLATABLE_TEXTS[currentLang].plannerSuccess);
      if (sePasoDelPresupuesto) {
        addBotMessage(getPlanSobrePresupuestoMsg(currentLang, totalGrupoNum, presupuestoComparar));
      }
      addModifyOfferMessage();

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
          system: getSystemPrompt(currentLang, text),
          messages: conversationHistory.slice(-MAX_CONTEXT_MESSAGES)
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

  const FOOTER_GAP_MIN_TOP = 120;
  let footerLiftFrame = null;

  function updateFooterLift(animate = false) {
    footerLiftFrame = null;
    const wrap = document.getElementById('rs-chat-widget');
    if (!wrap) return;

    let lift = 0;
    const footer = document.querySelector('footer');
    if (footer && !isOpen) {
      const overlap = window.innerHeight - footer.getBoundingClientRect().top;
      lift = Math.max(0, Math.min(overlap, window.innerHeight - FOOTER_GAP_MIN_TOP));
    }

    ['rs-chat-btn', 'rs-chat-bubble'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.style.transition = animate ? 'bottom 0.3s ease' : '';
    });
    wrap.style.setProperty('--rs-footer-lift', `${Math.round(lift)}px`);
  }

  function scheduleFooterLift() {
    if (footerLiftFrame === null) {
      footerLiftFrame = requestAnimationFrame(() => updateFooterLift());
    }
  }

  function toggleChat() {
    isOpen = !isOpen;
    updateFooterLift(true);
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
      btn.setAttribute('aria-label', TRANSLATABLE_TEXTS[currentLang].ariaClose);

      gsap.fromTo(win, { opacity: 0, y: 35, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power4.out" });
      setTimeout(() => document.getElementById('rs-chat-input')?.focus(), 100);

      if (pendingTranslationLang && pendingTranslationLang !== historyLang) {
        const lang = pendingTranslationLang;
        pendingTranslationLang = null;
        translateChatHistory(lang);
      }
    } else {
      chatIcon.style.display = 'block';
      closeIcon.style.display = 'none';
      btn.setAttribute('aria-label', TRANSLATABLE_TEXTS[currentLang].ariaOpen);

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
      else if (plannerStep === 'people') procesarPasoPersonas(text);
      else if (plannerStep === 'budget') procesarPasoPresupuesto(text);
      else if (plannerStep === 'duration') procesarPasoDuracion(text);
      else if (plannerStep === 'details') procesarPasoDetalles(text);
      else if (plannerStep === 'modify') procesarPasoModificar(text);
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

      // Habilitar elementos
      input?.removeAttribute('disabled');
      sendBtn?.removeAttribute('disabled');
      plannerBtn?.classList.remove('locked');

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
  function showTranslateSpinner() {
    const msgs = document.getElementById('rs-chat-messages');
    if (!msgs) return;
    msgs.innerHTML = '';
    const spinner = document.createElement('div');
    spinner.id = 'rs-translate-spinner';
    spinner.className = 'rs-translate-spinner';
    spinner.innerHTML = '<div class="rs-spinner"></div>';
    msgs.appendChild(spinner);
  }

  function hideTranslateSpinner() {
    const spinner = document.getElementById('rs-translate-spinner');
    if (spinner) spinner.remove();
  }

  async function translateChatHistory(targetLang) {
    // Si no hay historial o ya se esta traduciendo, salir
    if (conversationHistory.length === 0) return;
    if (isTranslating) return;
    if (!isAuthenticated()) return;

    isTranslating = true;
    showTranslateSpinner();

    // Se traduce TODO el historial guardado (no solo un par de mensajes),
    // dividido en bloques pequeños para que cada peticion sea rapida y no
    // se trunque, sin importar cuan largo sea el chat.
    const CHUNK_SIZE = 8;
    // Si la respuesta de un bloque viene truncada (JSON incompleto) o falla
    // el parseo, reintentamos ese bloque con mas presupuesto de tokens.
    const tokenBudgets = [3000, 6000, 12000];
    const targetLangName = targetLang === 'es' ? 'Spanish' : 'English';
    const translatedHistory = [];
    let anySuccess = false;

    for (let start = 0; start < conversationHistory.length; start += CHUNK_SIZE) {
      const chunk = conversationHistory.slice(start, start + CHUNK_SIZE);
      let chunkTranslated = null;

      for (let i = 0; i < tokenBudgets.length && !chunkTranslated; i++) {
        try {
        const translationPrompt = `Translate the following JSON array of chat messages into ${targetLangName}.
Return ONLY valid JSON array with the same structure and the same number of items (${chunk.length}).
IMPORTANT: Keep all markdown formatting like **bold** and emojis.
Only translate the text content, not the structure.

${JSON.stringify(chunk)}`;

        const response = await fetch(PROXY_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system: `You are a translator. ONLY output a valid JSON array. Never add extra text.`,
            messages: [{ role: 'user', content: translationPrompt }],
            max_tokens: tokenBudgets[i]
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
        if (firstBracket === -1 || lastBracket === -1 || lastBracket <= firstBracket) {
          // No hay un array completo: probablemente la respuesta se trunco
          // por falta de tokens. Reintentamos con mas presupuesto.
          throw new Error('Respuesta truncada o sin JSON valido (posible limite de tokens)');
        }
        cleanJson = cleanJson.substring(firstBracket, lastBracket + 1);

        // Intentar parsear con manejo de errores
        let parsed;
        try {
          parsed = JSON.parse(cleanJson);
        } catch (parseError) {
          // Si falla, intentar limpiar caracteres no validos
          cleanJson = cleanJson.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
          parsed = JSON.parse(cleanJson);
        }

        if (!Array.isArray(parsed) || parsed.length !== chunk.length) {
          throw new Error('La traduccion no devolvio un array valido o completo');
        }

        chunkTranslated = parsed;
      } catch (err) {
        console.error(`Error traduciendo bloque ${start}-${start + chunk.length} (intento ${i + 1}/${tokenBudgets.length}, max_tokens=${tokenBudgets[i]}):`, err);
        // Si quedan reintentos, el bucle sigue con mas tokens para este bloque.
      }
      }

      if (chunkTranslated) {
        anySuccess = true;
        translatedHistory.push.apply(translatedHistory, chunkTranslated);
      } else {
        // Si un bloque falla tras todos los reintentos, se conserva tal cual
        // para no perder ese fragmento de la conversacion.
        translatedHistory.push.apply(translatedHistory, chunk);
      }
    }

    if (anySuccess) {
      conversationHistory = translatedHistory;
      saveHistory();
      historyLang = targetLang;
    }

    hideTranslateSpinner();
    // Re-renderizar la UI (traducida si tuvo exito, original si fallaron todos los intentos)
    renderSavedHistoryUI();
    isTranslating = false;
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

    const shareBtn = document.getElementById('rs-share-plan');
    if (shareBtn) shareBtn.textContent = TRANSLATABLE_TEXTS[newLang].sharePlan;

    const chatBtn = document.getElementById('rs-chat-btn');
    if (chatBtn) chatBtn.setAttribute('aria-label', isOpen ? TRANSLATABLE_TEXTS[newLang].ariaClose : TRANSLATABLE_TEXTS[newLang].ariaOpen);
    const sendBtnEl = document.getElementById('rs-chat-send');
    if (sendBtnEl) sendBtnEl.setAttribute('aria-label', TRANSLATABLE_TEXTS[newLang].ariaSend);

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

    // TRADUCIR EL HISTORIAL DE MENSAJES AL NUEVO IDIOMA
    // Si el chat está abierto, traducir de inmediato (ocultando mensajes con un loader).
    // Si está cerrado, dejar pendiente y traducir cuando el usuario lo abra.
    if (conversationHistory.length > 0 && newLang !== historyLang) {
      if (isOpen) {
        pendingTranslationLang = null;
        translateChatHistory(newLang);
      } else {
        pendingTranslationLang = newLang;
      }
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
    historyLang = currentLang;

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
    btn.setAttribute('aria-label', TRANSLATABLE_TEXTS[currentLang].ariaOpen);
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
        <button id="rs-chat-send" aria-label="${TRANSLATABLE_TEXTS[currentLang].ariaSend}" class="${!isAuthenticated() ? 'locked' : ''}" ${!isAuthenticated() ? 'disabled' : ''}>
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

    updateFooterLift();
    window.addEventListener('scroll', scheduleFooterLift, { passive: true });
    window.addEventListener('resize', scheduleFooterLift);
    window.addEventListener('load', scheduleFooterLift);

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