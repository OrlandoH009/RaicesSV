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
  document.addEventListener('DOMContentLoaded', () => {
    const backBtn = document.getElementById('infoBackBtn');
    if (!backBtn) return;

    const labelEl = document.getElementById('infoBackBtnLabel');
    const params = new URLSearchParams(window.location.search);
    const from = params.get('from');

    const etiquetas = {
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

    const esRutaSegura = from && /^[a-zA-Z0-9_\-]+\.html$/.test(from);
    const destino = esRutaSegura ? from : 'categorias.html';

    if (labelEl) labelEl.textContent = etiquetas[destino] || 'Volver a categorías';
    backBtn.setAttribute('href', destino);

    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = destino;
    });
  });
})();