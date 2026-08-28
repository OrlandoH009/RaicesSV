/* ══════════════════════════════════════════════════════════
   BOTÓN "VOLVER" — compartido entre eventos, historia,
   sitios-culturales, gastronomía, leyendas, recetas,
   calendario y publicaciones.

   Comportamiento:
   - Si la URL trae ?from=pagina.html, el botón regresa ahí
     (y muestra la etiqueta correspondiente, ej. "Volver a gastronomía").
   - Si no trae "from", el botón por defecto regresa a categorias.html.
   ══════════════════════════════════════════════════════════ */
(function configurarBotonVolverInfo() {
  const claves = {
    'categorias.html': 'backNav.categorias',
    'calendario.html': 'backNav.calendario',
    'sitios-culturales.html': 'backNav.sitios-culturales',
    'gastronomia.html': 'backNav.gastronomia',
    'recetas.html': 'backNav.recetas',
    'eventos.html': 'backNav.eventos',
    'historia.html': 'backNav.historia',
    'leyendas.html': 'backNav.leyendas',
    'mapa.html': 'backNav.mapa',
    'publicaciones.html': 'backNav.publicaciones'
  };

  const etiquetasFallback = {
    'categorias.html': 'Volver a categorías',
    'calendario.html': 'Volver al calendario',
    'sitios-culturales.html': 'Volver a sitios culturales',
    'gastronomia.html': 'Volver a gastronomía',
    'recetas.html': 'Volver al recetario',
    'eventos.html': 'Volver a eventos',
    'historia.html': 'Volver a historia',
    'leyendas.html': 'Volver a leyendas',
    'mapa.html': 'Volver al mapa',
    'publicaciones.html': 'Volver a publicaciones'
  };

  function traducir(clave, fallback) {
    if (window.SRi18n && typeof window.SRi18n.t === 'function') {
      const lang = window.SRi18n.getLang ? window.SRi18n.getLang() : 'es';
      const traducido = window.SRi18n.t(clave, lang);
      if (traducido && traducido !== clave) return traducido;
    }
    return fallback;
  }

  let destinoActual = 'categorias.html';

  function actualizarEtiqueta() {
    const labelEl = document.getElementById('infoBackBtnLabel');
    if (labelEl) labelEl.textContent = traducir(claves[destinoActual], etiquetasFallback[destinoActual]);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('infoBackBtn');
    if (!backBtn) return;

    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');

    const esRutaSegura = from && /^[a-zA-Z0-9_\-]+\.html$/.test(from);
    destinoActual = (esRutaSegura && claves[from]) ? from : 'categorias.html';

    actualizarEtiqueta();
    backBtn.setAttribute('href', destinoActual);

    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = destinoActual;
    });

    // El texto del botón depende del idioma actual; cuando el usuario cambia
    // de idioma desde el navbar, i18n.js dispara "langchange" mucho después
    // de este DOMContentLoaded, así que hay que volver a traducirlo entonces.
    document.addEventListener('langchange', actualizarEtiqueta);
  });
})();