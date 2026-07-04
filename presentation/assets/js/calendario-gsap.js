/* ============================================================
   RAÍCES SV — calendario-gsap.js
   Animaciones GSAP del Calendario de Festividades:
   - Entrada escalonada del hero
   - Revelado de secciones al hacer scroll
   - Grilla de días y pills de mes con stagger dinámico
   - "Flip" del año al navegar
   - Catálogo de tarjetas con entrada animada
   - Apertura suave del modal de evento
   - Glow de cursor
   No modifica la lógica de calender.js / funcalen.js: envuelve sus
   funciones existentes para añadir animación sin romper nada.
   ============================================================ */

(function () {
  if (typeof gsap === 'undefined') return; // fallback silencioso si el CDN no cargó

  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Glow de cursor (solo dispositivos con hover) ── */
  if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);
    gsap.set(cursor, { xPercent: -50, yPercent: -50, opacity: 0 });
    window.addEventListener('mousemove', (e) => {
      gsap.to(cursor, { x: e.clientX, y: e.clientY, opacity: 1, duration: .6, ease: 'power3.out' });
    });
  }

  /* ── Grilla del calendario: entrada escalonada cada vez que se redibuja ── */
  if (typeof window.renderCalendarGrid === 'function') {
    const _renderCalendarGrid = window.renderCalendarGrid;
    window.renderCalendarGrid = function (...args) {
      _renderCalendarGrid.apply(this, args);
      if (prefersReducedMotion) return;
      const calGrid = document.getElementById('calGrid');
      if (calGrid && calGrid.children.length) {
        gsap.fromTo(calGrid.children,
          { opacity: 0, y: 14, scale: .93 },
          { opacity: 1, y: 0, scale: 1, duration: .5, ease: 'power3.out', stagger: { each: .012, from: 'start' } }
        );
      }
    };
  }

  /* ── Pills de mes: entrada escalonada + "pop" al hacer clic ── */
  if (typeof window.renderMonthPills === 'function') {
    const _renderMonthPills = window.renderMonthPills;
    window.renderMonthPills = function (...args) {
      _renderMonthPills.apply(this, args);
      const pills = document.querySelectorAll('.month-pill');
      if (!pills.length) return;

      if (!prefersReducedMotion) {
        gsap.fromTo(pills,
          { opacity: 0, y: 10, scale: .82 },
          { opacity: 1, y: 0, scale: 1, duration: .4, ease: 'back.out(1.7)', stagger: .025 }
        );
      }

      pills.forEach((pill) => {
        pill.addEventListener('click', () => {
          if (prefersReducedMotion) return;
          gsap.fromTo(pill,
            { scale: .86 },
            { scale: 1, duration: .5, ease: 'elastic.out(1, .5)' }
          );
        });
      });
    };
  }

  /* ── Catálogo de tarjetas: entrada animada cada vez que se redibuja ── */
  if (typeof window.renderCatalogo === 'function') {
    const _renderCatalogo = window.renderCatalogo;
    window.renderCatalogo = function (...args) {
      _renderCatalogo.apply(this, args);
      if (prefersReducedMotion) return;
      const cards = document.querySelectorAll('.fest-card');
      if (cards.length) {
        gsap.fromTo(cards,
          { opacity: 0, y: 24, scale: .96 },
          { opacity: 1, y: 0, scale: 1, duration: .55, ease: 'power3.out', stagger: .05 }
        );
      }
    };
  }

  /* ── Panel de "evento de hoy": entrada + pulso al confirmarse ── */
  if (typeof window.renderTodayEvent === 'function') {
    const _renderTodayEvent = window.renderTodayEvent;
    window.renderTodayEvent = function (...args) {
      _renderTodayEvent.apply(this, args);
      if (prefersReducedMotion) return;
      const panel = document.getElementById('todayEventPanel');
      if (panel) {
        gsap.fromTo(panel,
          { opacity: 0, y: -14, scale: .97 },
          { opacity: 1, y: 0, scale: 1, duration: .6, ease: 'power3.out' }
        );
        if (panel.classList.contains('has-event')) {
          gsap.fromTo(panel,
            { boxShadow: '0 0 0 rgba(200,154,59,0)' },
            { boxShadow: '0 0 22px rgba(200,154,59,.35)', duration: .8, ease: 'sine.inOut', yoyo: true, repeat: 1, delay: .4 }
          );
        }
      }
    };
  }

  document.addEventListener('DOMContentLoaded', () => {

    /* ── Entrada del hero ── */
    const heroEyebrow = document.querySelector('.page-hero-eyebrow');
    const heroTitle = document.querySelector('.page-hero h1');
    const heroText = document.querySelector('.page-hero p');
    const heroEls = [heroEyebrow, heroTitle, heroText].filter(Boolean);
    if (heroEls.length) {
      gsap.set(heroEls, { opacity: 0, y: 24 });
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to(heroEyebrow, { opacity: 1, y: 0, duration: .5 }, .1)
        .to(heroTitle, { opacity: 1, y: 0, duration: .7 }, .25)
        .to(heroText, { opacity: 1, y: 0, duration: .6 }, .45);
    }

    /* ── "Flip" del título del año al navegar ── */
    const yearTitle = document.getElementById('calYearTitle');
    ['prevYear', 'nextYear'].forEach((id) => {
      document.getElementById(id)?.addEventListener('click', () => {
        if (!yearTitle || prefersReducedMotion) return;
        gsap.fromTo(yearTitle,
          { rotateX: -90, opacity: 0 },
          { rotateX: 0, opacity: 1, duration: .45, ease: 'power2.out', delay: .04 }
        );
      });
    });
    if (yearTitle) yearTitle.style.transformOrigin = '50% 100%';
    if (yearTitle) yearTitle.style.display = 'inline-block';

    /* ── Revelado de secciones al hacer scroll ── */
    if (typeof ScrollTrigger !== 'undefined' && !prefersReducedMotion) {
      const revealTargets = ['.cal-controls', '.month-pills', '.calendar-wrap', '.filter-section', '.results-bar'];
      revealTargets.forEach((sel) => {
        const el = document.querySelector(sel);
        if (!el) return;
        gsap.set(el, { autoAlpha: 0, y: 36 });
        ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          once: true,
          onEnter: () => gsap.to(el, { autoAlpha: 1, y: 0, duration: .8, ease: 'power3.out' })
        });
      });
    }

    /* ── Botones de filtro: pequeño "punch" al hacer clic ── */
    ['applyFilter', 'clearFilter', 'loadMoreBtn'].forEach((id) => {
      const btn = document.getElementById(id);
      btn?.addEventListener('click', () => {
        if (prefersReducedMotion) return;
        gsap.fromTo(btn, { scale: .94 }, { scale: 1, duration: .35, ease: 'back.out(2)' });
      });
    });

    /* ── Apertura animada del modal de evento ── */
    if (typeof window.abrirDetallesEvento === 'function') {
      const _abrirDetallesEvento = window.abrirDetallesEvento;
      window.abrirDetallesEvento = function (evento) {
        _abrirDetallesEvento(evento);
        if (prefersReducedMotion) return;
        const modal = document.getElementById('modal');
        if (modal) {
          gsap.fromTo(modal,
            { opacity: 0, y: 40, scale: .92 },
            { opacity: 1, y: 0, scale: 1, duration: .45, ease: 'back.out(1.5)' }
          );
        }
      };
    }

    if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
  });
})();
