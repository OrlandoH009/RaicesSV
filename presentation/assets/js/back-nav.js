/* ══════════════════════════════════════════════════════════
   BOTÓN "VOLVER" — compartido en todo el sitio (categorías,
   calendario, eventos, historia, sitios-culturales, gastronomía,
   leyendas, recetas, mapa, publicaciones, quiz, juegos).

   Comportamiento:
   - Si la URL trae ?from=pagina.html (una de las páginas conocidas),
     el botón regresa ahí.
   - Si no trae "from", el botón por defecto regresa a categorias.html.
   - La etiqueta es siempre la palabra "Volver", sin importar el
     destino — solo cambia a dónde te lleva el clic.
   ══════════════════════════════════════════════════════════ */
(function configurarBotonVolverInfo() {
  const destinosConocidos = [
    'categorias.html',
    'calendario.html',
    'sitios-culturales.html',
    'gastronomia.html',
    'recetas.html',
    'eventos.html',
    'historia.html',
    'leyendas.html',
    'mapa.html',
    'publicaciones.html',
    'quiz.html',
    'juegos.html'
  ];

  function traducir(clave, fallback) {
    if (window.SRi18n && typeof window.SRi18n.t === 'function') {
      const lang = window.SRi18n.getLang ? window.SRi18n.getLang() : 'es';
      const traducido = window.SRi18n.t(clave, lang);
      if (traducido && traducido !== clave) return traducido;
    }
    return fallback;
  }

  function actualizarEtiqueta() {
    const labelEl = document.getElementById('infoBackBtnLabel');
    if (labelEl) labelEl.textContent = traducir('backNav.volver', 'Volver');
  }

  document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('infoBackBtn');
    if (!backBtn) return;

    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');

    const esRutaSegura = from && /^[a-zA-Z0-9_\-]+\.html$/.test(from);
    const destino = (esRutaSegura && destinosConocidos.includes(from)) ? from : 'categorias.html';

    actualizarEtiqueta();
    backBtn.setAttribute('href', destino);

    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = destino;
    });

    // El texto del botón depende del idioma actual; cuando el usuario cambia
    // de idioma desde el navbar, i18n.js dispara "langchange" mucho después
    // de este DOMContentLoaded, así que hay que volver a traducirlo entonces.
    document.addEventListener('langchange', actualizarEtiqueta);
  });
})();