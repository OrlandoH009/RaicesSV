/* ============================================================
  Salvadorean Roots — index-gsap.js
   Animaciones GSAP exclusivas del Inicio:
   - Hero con título partido en letras + partículas + parallax
   - Marquee cultural infinito
   - Revelado de secciones con ScrollTrigger
   - Contadores animados con GSAP
   - Botones magnéticos + glow de cursor
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return; // fallback silencioso si el CDN no cargó

  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 2. Hero: partir el título en letras ── */
  const heroTitle = document.getElementById('heroTitle');
  if (heroTitle) {
    const original = heroTitle.textContent.trim();
    heroTitle.setAttribute('aria-label', original);
    heroTitle.innerHTML = '';
    const words = original.split(' ');
    words.forEach((word, wi) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'word';
      [...word].forEach((ch) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = ch;
        wordSpan.appendChild(span);
      });
      heroTitle.appendChild(wordSpan);
      if (wi < words.length - 1) heroTitle.appendChild(document.createTextNode(' '));
    });
  }

  /* ── 3. Hero: partículas doradas flotantes ── */
  const particleWrap = document.getElementById('heroParticles');
  if (particleWrap && !prefersReducedMotion) {
    const total = window.innerWidth < 600 ? 10 : 20;
    for (let i = 0; i < total; i++) {
      const p = document.createElement('span');
      p.className = 'hero-particle';
      const size = gsap.utils.random(4, 12);
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = gsap.utils.random(0, 100) + '%';
      particleWrap.appendChild(p);

      gsap.fromTo(p,
        { y: 30, opacity: 0 },
        {
          y: -window.innerHeight * gsap.utils.random(0.7, 1.1),
          x: gsap.utils.random(-60, 60),
          opacity: gsap.utils.random(.4, .85),
          duration: gsap.utils.random(7, 14),
          delay: gsap.utils.random(0, 10),
          repeat: -1,
          ease: 'none',
          onRepeat: () => { p.style.left = gsap.utils.random(0, 100) + '%'; }
        }
      );
    }
  }

  /* ── 4. Timeline de entrada del Hero ── */
  gsap.set('.hero__overlay', { opacity: 0 });
  gsap.set('.hero__subtitle', { y: 18, filter: 'blur(6px)' });
  gsap.set('.hero__cta', { y: 18, scale: .92 });
  gsap.set('.hero__scroll-cue', { y: -8 });
  gsap.set('.hero__title .char', { y: 40, rotate: 6 });

  const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  heroTl
    .fromTo('.hero__bg', { scale: 1.18 }, { scale: 1.05, duration: 2.6, ease: 'power2.out' }, 0)
    .to('.hero__overlay', { opacity: 1, duration: 1.1, ease: 'power2.out' }, 0)
    .to('.hero__title-wrap', { opacity: 1, duration: .5 }, .25)
    .to('.hero__title .char', {
      opacity: 1, y: 0, rotate: 0, duration: .8, stagger: .035,
      ease: 'back.out(1.7)'
    }, .35)
    .add(() => document.querySelector('.hero__title-wrap')?.classList.add('shine'), .45)
    .to('.hero__subtitle', { opacity: 1, y: 0, filter: 'blur(0px)', duration: .8 }, '-=0.35')
    .to('.hero__cta', { opacity: 1, y: 0, scale: 1, duration: .65, ease: 'back.out(2.2)' }, '-=0.3')
    .to('.hero__scroll-cue', { opacity: .85, y: 0, duration: .6 }, '-=0.2');

  // Rebote continuo del cursor de scroll
  if (!prefersReducedMotion) {
    gsap.to('.hero__scroll-cue', { y: 8, duration: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.2 });
  }

  // Tocar/clickear "Desliza": un movimiento sutil de confirmación y baja
  // suavemente hasta "¿Qué es Salvadorean Roots?", para que la gente siga
  // bajando y vea las demás secciones.
  const scrollCue = document.getElementById('heroScrollCue');
  const aboutSection = document.getElementById('about');
  if (scrollCue && aboutSection) {
    const goToAbout = () => {
      gsap.fromTo(scrollCue,
        { scale: 1 },
        { scale: .82, y: 6, duration: .12, ease: 'power1.out', yoyo: true, repeat: 1 }
      );
      aboutSection.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
    };
    scrollCue.addEventListener('click', goToAbout);
    scrollCue.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goToAbout(); }
    });
  }

  // Parallax del fondo del hero al hacer scroll
  if (!prefersReducedMotion) {
    gsap.to('.hero__bg', {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  /* ── 5. Marquee cultural infinito ── */
  const track = document.getElementById('marqueeTrack');
  if (track) {
    const original = track.querySelector('.marquee__group');
    if (original) {
      const clone = original.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    }
    gsap.to(track, { xPercent: -50, duration: 24, ease: 'none', repeat: -1 });
  }

  /* ── 6. Revelado de secciones (.reveal) con ScrollTrigger ── */
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.fromTo(el,
      { autoAlpha: 0, y: 46, scale: .97 },
      {
        autoAlpha: 1, y: 0, scale: 1, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 87%' }
      }
    );
  });

  /* ── 6b. Título "Información para ti": entrada palabra por palabra ──
     Antes usaba el mismo fundido genérico que el resto de secciones
     (.reveal). Para que se vea más animado lo partimos en palabras
     (igual que el título del hero, con espacios de verdad entre ellas
     para que siga envolviendo bien en celular) y cada una entra con un
     rebote, mientras el degradado dorado del texto sigue brillando
     como ya lo hacía. */
  const infoBadgeTitle = document.getElementById('infoBadgeTitle');
  if (infoBadgeTitle) {
    const original = infoBadgeTitle.textContent.trim();
    infoBadgeTitle.setAttribute('aria-label', original);
    infoBadgeTitle.innerHTML = '';
    original.split(' ').forEach((word, wi, arr) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'badge-word';
      wordSpan.textContent = word;
      infoBadgeTitle.appendChild(wordSpan);
      if (wi < arr.length - 1) infoBadgeTitle.appendChild(document.createTextNode(' '));
    });

    gsap.set('.badge-word', { y: 34, opacity: 0, scale: .7, rotate: -8 });
    gsap.to('.badge-word', {
      y: 0, opacity: 1, scale: 1, rotate: 0,
      duration: .7, ease: 'back.out(2.4)', stagger: .12,
      scrollTrigger: { trigger: '.info-badge__inner', start: 'top 88%' }
    });
  }

  /* ── 7. Estadísticas: stagger + contador numérico ── */
  gsap.utils.toArray('.stat').forEach((stat, i) => {
    gsap.fromTo(stat,
      { autoAlpha: 0, y: 45, rotateX: -20, transformPerspective: 700 },
      {
        autoAlpha: 1, y: 0, rotateX: 0, duration: .8, delay: i * .08, ease: 'back.out(1.6)',
        scrollTrigger: { trigger: '.stats__grid', start: 'top 82%' }
      }
    );
  });

  document.querySelectorAll('.stat__num').forEach((el) => {
    const target = parseFloat(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '';
    const counter = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: target, duration: 1.7, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.floor(counter.val).toLocaleString('es-SV') + suffix; },
          onComplete: () => { el.textContent = target.toLocaleString('es-SV') + suffix; }
        });
      }
    });
  });

  /* ── 8. Tarjetas del grid principal: caen y se acomodan en su lugar ──
     Las tarjetas viven en un CSS grid con celdas fijas: un transform no
     reordena el layout, solo desplaza el "dibujo" de la tarjeta por
     encima de lo que haya alrededor. Con un salto de -46px y apenas
     10-14px de espacio real entre celdas (menos aún en celular, donde
     además quedan apiladas en una sola columna), cada tarjeta terminaba
     pintándose encima de la de arriba mientras caía. Ahora el salto es
     más corto que el espacio real entre celdas (ver gap ampliado en
     index.css) y el stagger es más lento, así caen una por una, con
     lugar de sobra, sin pisarse entre ellas. */
  const homeCards = gsap.utils.toArray('.home-card');
  if (homeCards.length) {
    gsap.set(homeCards, { autoAlpha: 0, y: -16, scale: .96 });

    ScrollTrigger.batch(homeCards, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          autoAlpha: 1, y: 0, scale: 1,
          duration: .8, ease: 'power3.out', stagger: .18
        });
      }
    });
  }

  /* ── 9. Botones magnéticos ── */
  function magnetize(el, strength = 16) {
    if (prefersReducedMotion) return;
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      gsap.to(el, { x: (x / r.width) * strength, y: (y / r.height) * strength, duration: .3, ease: 'power2.out' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1, 0.4)' });
    });
  }
  document.querySelectorAll('.hero__cta, .home-cta-final .btn-primary').forEach((el) => magnetize(el));

  /* ── 10. Ambient blobs: deriva lenta tipo "onda" ── */
  if (!prefersReducedMotion) {
    gsap.utils.toArray('.ambient-blob').forEach((blob, i) => {
      gsap.to(blob, {
        x: gsap.utils.random(-40, 40),
        y: gsap.utils.random(-30, 30),
        scale: gsap.utils.random(0.92, 1.12),
        rotate: gsap.utils.random(-15, 15),
        duration: gsap.utils.random(8, 14),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * .4
      });
    });
  }

  /* ── 11. Pulso sutil de color en el CTA principal (glow "vivo") ── */
  if (!prefersReducedMotion) {
    gsap.to('.hero__cta', {
      boxShadow: '0 8px 32px rgba(190,142,86,.55)',
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2.5
    });
  }

  ScrollTrigger.refresh();

  // Las posiciones de disparo (.reveal, .stat, .home-card, etc.) se calculan
  // aquí con el layout que hay en DOMContentLoaded, pero las imágenes de las
  // secciones de abajo todavía no cargan y empujan el alto de la página. Sin
  // este refresco tardío, ScrollTrigger se queda con posiciones "viejas" y
  // las animaciones tardan en dispararse (hay que scrollear de más).
  window.addEventListener('load', () => ScrollTrigger.refresh());
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
});