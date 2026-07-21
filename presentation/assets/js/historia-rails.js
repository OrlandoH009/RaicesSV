/* ============================================================
   RAÍCES SV — historia-rails.js
   Entrada suave de los rieles laterales decorativos (GSAP)
   ============================================================ */

(function () {
  if (typeof gsap === 'undefined') return; // fallback silencioso si el CDN no cargó

  gsap.from('.hist-rail--left', {
    opacity: 0,
    x: -20,
    duration: 1.2,
    ease: 'power2.out',
    delay: .3,
  });
  gsap.from('.hist-rail--right', {
    opacity: 0,
    x: 20,
    duration: 1.2,
    ease: 'power2.out',
    delay: .3,
  });
})();