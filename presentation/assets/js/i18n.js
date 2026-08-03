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
      "cat.modal.seguirSinCuenta": "Seguir explorando sin cuenta"
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
      "cat.modal.seguirSinCuenta": "Keep exploring without an account"
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
    return dict[key] !== undefined ? dict[key] : key;
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