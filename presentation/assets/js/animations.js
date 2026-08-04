/* ============================================================
  Salvadorean Roots — animations.js
   Animaciones GSAP para sitios-culturales, gastronomia y eventos.
   Requiere gsap (CDN) cargado ANTES de este script:
   <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP no está cargado. Agrega el <script> de GSAP antes de animations.js');
    return;
  }

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return; // respeta accesibilidad, no anima

  /* ---------- 1. Entrada del badge del título ---------- */
  gsap.fromTo('.page-badge__inner',
    { y: -18, opacity: 0, scale: .96 },
    {
      y: 0, opacity: 1, scale: 1,
      duration: .7,
      ease: 'back.out(1.6)',
      clearProps: 'opacity,transform'
    }
  );

  /* ---------- 2. Tabs: aparición escalonada ---------- */
  gsap.fromTo('.tab-btn',
    { y: 10, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: .45,
      stagger: .035,
      delay: .25,
      ease: 'power2.out',
      clearProps: 'opacity,transform',
      onComplete: function () {
        document.querySelectorAll('.tab-btn').forEach(el => {
          el.style.opacity = '';
          el.style.transform = '';
        });
      }
    }
  );

  /* ---------- 3. Tarjetas de grid (sitios / gastro): entrada en cascada ---------- */
  const cards = document.querySelectorAll('.sitio-card, .gastro-card');
  gsap.from(cards, {
    y: 34,
    opacity: 0,
    duration: .75,
    stagger: .12,
    delay: .15,
    ease: 'power3.out'
  });

  /* ---------- 4. Hover interactivo en tarjetas: parallax + glow + label ---------- */
  cards.forEach(card => {
    const img   = card.querySelector('img');
    const label = card.querySelector('.sitio-card__label, .gastro-card__label');
    const pin   = card.querySelector('.sitio-card__pin');
    const tag   = card.querySelector('.gastro-card__tag');

    const tl = gsap.timeline({ paused: true });
    tl.to(card, { y: -8, scale: 1.02, boxShadow: '0 24px 48px rgba(0,0,0,.65), 0 0 44px rgba(17,48,104,.3)', duration: .4, ease: 'power2.out' }, 0)
      .to(img,  { scale: 1.08, opacity: .85, duration: .5, ease: 'power2.out' }, 0);
    if (label) tl.to(label, { y: -5, duration: .4, ease: 'power2.out' }, 0);
    if (pin)   tl.to(pin,   { scale: 1.25, duration: .35, ease: 'back.out(2)' }, 0);
    if (tag)   tl.to(tag,   { y: -2, duration: .35, ease: 'power2.out' }, 0);

    card.addEventListener('mouseenter', () => tl.play());
    card.addEventListener('mouseleave', () => tl.reverse());

    // parallax leve al mover el mouse dentro de la tarjeta
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - .5;
      const relY = (e.clientY - rect.top) / rect.height - .5;
      gsap.to(img, { x: relX * 14, y: relY * 14, duration: .6, ease: 'power2.out', overwrite: 'auto' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(img, { x: 0, y: 0, duration: .6, ease: 'power2.out' });
    });
  });

  /* ---------- 5. Reveal del contenido del panel activo ---------- */
  function animatePanelIn(panel) {
    if (!panel) return;
    const hero   = panel.querySelector('.info-content__hero-title, h2');
    const sub    = panel.querySelector('.info-content__hero-sub, .info-content__hero p');
    const dateTag = panel.querySelector('.info-content__hero-date');
    const chips  = panel.querySelectorAll('.info-chip');
    const blocks = panel.querySelectorAll('.info-content__body h3, .info-content__body p, .sitio-actions, .info-gallery__item');

    const tl = gsap.timeline();
    if (dateTag) tl.from(dateTag, { opacity: 0, y: -8, duration: .4, ease: 'power2.out', clearProps: 'opacity,transform' }, 0);
    if (hero)    tl.from(hero,   { opacity: 0, y: 18, duration: .55, ease: 'power3.out', clearProps: 'opacity,transform' }, .05);
    if (sub)     tl.from(sub,    { opacity: 0, y: 14, duration: .5, ease: 'power3.out', clearProps: 'opacity,transform' }, .16);
    if (chips.length) tl.from(chips, { opacity: 0, x: -8, duration: .35, stagger: .05, ease: 'power2.out', clearProps: 'opacity,transform' }, .3);
    if (blocks.length) tl.from(blocks, { opacity: 0, y: 16, duration: .5, stagger: .06, ease: 'power2.out', clearProps: 'opacity,transform' }, .35);

    // Failsafe: si por cualquier motivo el timeline no llega a completar
    // (pestaña en segundo plano, cambio de tab a mitad de animación, etc.),
    // nos aseguramos de que el contenido quede visible igual.
    tl.eventCallback('onComplete', () => {
      [dateTag, hero, sub, ...chips, ...blocks].forEach(el => {
        if (el) { el.style.opacity = ''; el.style.transform = ''; }
      });
    });
  }

  // Panel activo al cargar
  animatePanelIn(document.querySelector('.info-panel.active'));

  // Re-animar cuando tabs.js active un nuevo panel
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      // esperar al frame en que tabs.js ya puso .active
      requestAnimationFrame(() => {
        const panel = document.getElementById(`tab-${target}`);
        animatePanelIn(panel);
      });
    });
  });

  /* ---------- 6. Micro-interacción en botones de acción (mapa / publicaciones) ---------- */
  document.querySelectorAll('.sitio-map-link, .sitio-pub-link, .evento-actions__btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { y: -3, duration: .25, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { y: 0, duration: .25, ease: 'power2.out' });
    });
  });

  /* ---------- 7. Failsafe global ----------
     Si el navegador pausa las animaciones (pestaña en segundo plano,
     cambio de tab a mitad de un tween, etc.) algunos elementos animados
     con gsap.from(...) pueden quedar con opacity:0 inline de forma
     permanente. Este chequeo, tras un breve margen, limpia cualquier
     opacity/transform inline que haya quedado atascado en 0. */
  setTimeout(() => {
    document.querySelectorAll('.info-content__body p, .info-content__body h3, .info-chip, .info-content__hero-title, .info-content__hero-sub').forEach(el => {
      const opacity = window.getComputedStyle(el).opacity;
      if (parseFloat(opacity) < 0.05) {
        el.style.opacity = '';
        el.style.transform = '';
      }
    });
  }, 1500);
}); 