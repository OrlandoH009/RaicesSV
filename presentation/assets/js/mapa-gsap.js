/* ============================================================
  Salvadorean Roots — mapa-gsap.js
   Animaciones GSAP exclusivas del Mapa:
   - Barra de filtros: indicador deslizante ("pill") detrás del
     filtro activo + entrada escalonada al cargar la página.
   - Pequeño "pulso" al pulsar un filtro o el botón de colapsar.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return; // fallback silencioso si el CDN no cargó

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const filtersFloat = document.getElementById('mapaFiltersFloat');
  const filtersList = document.getElementById('filtersList');
  const filtersToggle = document.getElementById('mapaFiltersFab');
  const buttons = Array.from(document.querySelectorAll('.filter-btn'));

  /* ── Indicador deslizante detrás del filtro activo ── */
  if (filtersList && buttons.length) {
    const pill = document.createElement('span');
    pill.className = 'filter-pill';
    filtersList.insertBefore(pill, filtersList.firstChild);

    const movePill = (btn, animate = true) => {
      if (!btn) return;
      // offsetLeft/offsetTop (no getBoundingClientRect) porque la barra de
      // filtros hace scroll horizontal en móvil: con el rect del viewport
      // el offset de scroll se contaba dos veces (el pill scrollea junto
      // con los botones, al ser hijo del mismo contenedor).
      const props = {
        x: btn.offsetLeft,
        y: btn.offsetTop,
        width: btn.offsetWidth,
        height: btn.offsetHeight
      };
      if (animate) gsap.to(pill, { ...props, duration: .45, ease: 'power3.out' });
      else gsap.set(pill, props);
    };

    const initialActive = document.querySelector('.filter-btn.active') || buttons[0];
    requestAnimationFrame(() => {
      movePill(initialActive, false);
      filtersList.classList.add('filter-pill-ready');
    });

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        movePill(btn);
        if (!prefersReducedMotion) {
          // clearProps al terminar: .filter-btn usa transform (translateY) en
          // :hover vía CSS — un transform inline de GSAP lo dejaría sin efecto.
          gsap.fromTo(btn, { scale: .92 }, {
            scale: 1, duration: .35, ease: 'back.out(3)',
            onComplete: () => gsap.set(btn, { clearProps: 'transform' })
          });
        }
      });
    });

    // Reacomodar el pill cuando cambia el layout (resize, colapsar/expandir, idioma)
    window.addEventListener('resize', () => {
      movePill(document.querySelector('.filter-btn.active'), false);
    });
    if (filtersToggle) {
      filtersToggle.addEventListener('click', () => {
        setTimeout(() => movePill(document.querySelector('.filter-btn.active'), false), 380);
      });
    }
    document.addEventListener('langchange', () => {
      setTimeout(() => movePill(document.querySelector('.filter-btn.active'), false), 60);
    });
  }

  /* ── Entrada del botón de filtros al cargar ── */
  /* El panel (filtersFloat) ahora es una hoja modal oculta por defecto
     (CSS controla su opacity/transform vía .is-open), así que sólo se
     anima el botón flotante que la abre — animar el panel oculto dejaría
     estilos inline de GSAP que taparían la clase .is-open al abrirlo. */
  if (!prefersReducedMotion && filtersToggle) {
    gsap.from(filtersToggle, {
      opacity: 0, y: -18, duration: .5, ease: 'power2.out',
      onComplete: () => gsap.set(filtersToggle, { clearProps: 'transform' })
    });
  }

  /* ── Pulso sutil en el botón de colapsar filtros ── */
  if (filtersToggle && !prefersReducedMotion) {
    filtersToggle.addEventListener('click', () => {
      gsap.fromTo(filtersToggle, { scale: .85 }, {
        scale: 1, duration: .35, ease: 'back.out(3)',
        onComplete: () => gsap.set(filtersToggle, { clearProps: 'transform' })
      });
    });
  }
});
