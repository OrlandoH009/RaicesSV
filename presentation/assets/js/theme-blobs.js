/* ============================================================
  Salvadorean Roots — theme-blobs.js
  Inyecta manchas de color ambientales (blobs) animadas con GSAP
  en secciones clave de CUALQUIER página, y anima con una
  transición de "onda" el cambio entre modo claro / oscuro.
  No requiere tocar el HTML de cada vista: se auto-inserta.
  ============================================================ */

(function () {
  // Se evita combinar 'sunset' (rojo-naranja) con 'jade' (verde) en el mismo
  // set de manchas, ya que juntas evocan la bandera de México en vez de la
  // identidad salvadoreña. La paleta prioriza añil/azul, celeste y dorado.
  const COLOR_VARIANTS = ['indigo', 'sky', 'gold', 'navy', 'sunset'];

  function makeBlob(variant, size, top, left, extra) {
    const span = document.createElement('span');
    span.className = `bg-blob bg-blob--${variant} bg-blob--${size}`;
    span.style.top = top;
    span.style.left = left;
    if (extra) Object.assign(span.style, extra);
    return span;
  }

  function injectBlobSet(container, count) {
    if (!container || container.querySelector(':scope > .bg-blobs')) return;
    const wrap = document.createElement('div');
    wrap.className = 'bg-blobs';
    wrap.setAttribute('aria-hidden', 'true');

    const positions = [
      { top: '-8%', left: '-6%' },
      { top: '55%', left: '85%' },
      { top: '78%', left: '8%' },
      { top: '-10%', left: '70%' },
      { top: '30%', left: '40%' }
    ];
    const sizes = ['lg', 'md', 'sm', 'md', 'sm'];

    for (let i = 0; i < count; i++) {
      const variant = COLOR_VARIANTS[i % COLOR_VARIANTS.length];
      const pos = positions[i % positions.length];
      wrap.appendChild(makeBlob(variant, sizes[i % sizes.length], pos.top, pos.left));
    }

    // El contenedor destino necesita position relative/absolute para que los blobs floten dentro
    const computedPos = window.getComputedStyle(container).position;
    if (computedPos === 'static') container.style.position = 'relative';

    container.insertBefore(wrap, container.firstChild);
    return wrap;
  }

  function animateBlobs(wrap) {
    if (typeof gsap === 'undefined' || !wrap) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    gsap.utils.toArray(wrap.querySelectorAll('.bg-blob')).forEach((blob, i) => {
      gsap.to(blob, {
        x: gsap.utils.random(-50, 50),
        y: gsap.utils.random(-40, 40),
        scale: gsap.utils.random(0.9, 1.15),
        duration: gsap.utils.random(9, 16),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.5
      });
    });
  }

  function initSectionBlobs() {
    // Secciones "hero"/bienvenida de cualquier página: más blobs, más vivos.
    // Nota: se excluye deliberadamente .info-content__hero porque se repite
    // por cada tarjeta/panel dinámico (sitios, gastronomía, eventos) y no es
    // la bienvenida principal de la página.
    const heroSelectors = ['.hero', '.hist-hero', '.leyenda-hero', '.page-hero'];
    heroSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        const wrap = injectBlobSet(el, 5);
        animateBlobs(wrap);
      });
    });

    // Secciones de contenido genéricas que se beneficien de un toque de color
    const sectionSelectors = ['.about', '.stats', '.home-grid', '.info-badge'];
    sectionSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (el.querySelector(':scope > .ambient-blob')) return; // ya tiene su propio sistema de blobs
        const wrap = injectBlobSet(el, 3);
        animateBlobs(wrap);
      });
    });
  }

  // La transición de tema tipo "onda" vive ahora en runThemeTransition
  // (script.js), que ya se encarga de todo el efecto al cambiar de tema.

  document.addEventListener('DOMContentLoaded', () => {
    initSectionBlobs();
  });
})();