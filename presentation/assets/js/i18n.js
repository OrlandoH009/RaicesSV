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

      "lang.switchTo": "EN",
      "lang.label": "Idioma",

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
}
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

      "lang.switchTo": "ES",
      "lang.label": "Language",

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
}
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