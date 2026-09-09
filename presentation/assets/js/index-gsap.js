/* ============================================================
  Salvadorean Roots — index-gsap.js
   Animaciones GSAP exclusivas del Inicio:
   - Hero con título partido en letras + partículas culturales (ascuas volcánicas, estrellas, glifos) + parallax
   - 3D Parallax y Tilt interactivo con el puntero
   - Marquee cultural infinito con control de velocidad en hover
   - Revelado de secciones con ScrollTrigger
   - Contadores numéricos con destello de finalización
   - Rotador dinámico de Datos Curiosos con barra de progreso GSAP
   - Tarjetas Bento con 3D Tilt suave y reflejo de luz
   - Botones magnéticos + glow pulsante
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return; // fallback silencioso si el CDN no cargó

  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 2. Hero: partir el título en letras ──
     Ojo: i18n reescribe el innerHTML de todo lo que tenga data-i18n (y
     script.js vuelve a llamarlo al armar el drawer), lo que borra las
     letras. Por eso el corte se rehace solo cuando eso pasa. ── */
  const heroTitle = document.getElementById('heroTitle');
  let titleObserver = null;
  // Marca si el timeline de entrada ya reveló el título
  let heroEntranceDone = false;

  const splitHeroTitle = () => {
    if (!heroTitle) return;
    const original = (heroTitle.getAttribute('data-raw') || heroTitle.textContent).trim();
    if (titleObserver) titleObserver.disconnect();
    heroTitle.setAttribute('data-raw', original);
    heroTitle.setAttribute('aria-label', original);
    heroTitle.innerHTML = '';
    original.split(' ').forEach((word, wi, words) => {
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
    if (titleObserver) titleObserver.observe(heroTitle, { childList: true });
  };

  const revealChars = (animate) => {
    const chars = heroTitle ? heroTitle.querySelectorAll('.char') : [];
    if (!chars.length) return;
    if (animate && !prefersReducedMotion) {
      gsap.fromTo(chars,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: .6, stagger: .025, ease: 'back.out(1.7)' }
      );
    } else {
      gsap.set(chars, { opacity: 1, y: 0, rotate: 0 });
    }
  };

  splitHeroTitle();

  if (heroTitle && 'MutationObserver' in window) {
    titleObserver = new MutationObserver(() => {
      // El título quedó como texto plano: alguien reaplicó las traducciones
      if (heroTitle.querySelector('.char')) return;
      const fresh = heroTitle.textContent.trim();
      if (fresh) heroTitle.setAttribute('data-raw', fresh);
      splitHeroTitle();
      // Si la entrada ya terminó, se muestran sin volver a animar
      revealChars(!heroEntranceDone);
    });
    titleObserver.observe(heroTitle, { childList: true });
  }

  /* ── 3. Hero: partículas temáticas flotantes (doradas, ascuas de volcán y glifos) ── */
  const particleWrap = document.getElementById('heroParticles');
  if (particleWrap && !prefersReducedMotion) {
    const total = window.innerWidth < 600 ? 18 : 38;
    const types = ['', 'hero-particle--ember', 'hero-particle--star', 'hero-particle--glyph'];

    for (let i = 0; i < total; i++) {
      const p = document.createElement('span');
      const type = types[i % types.length];
      p.className = 'hero-particle ' + type;

      const size = type === 'hero-particle--glyph' ? gsap.utils.random(8, 14) : gsap.utils.random(3, 11);
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = gsap.utils.random(0, 100) + '%';
      particleWrap.appendChild(p);

      const maxOpacity = gsap.utils.random(.45, .95);

      gsap.fromTo(p,
        { y: 40, opacity: 0, rotation: gsap.utils.random(0, 180) },
        {
          y: -window.innerHeight * gsap.utils.random(0.75, 1.15),
          x: gsap.utils.random(-80, 80),
          rotation: `+=${gsap.utils.random(90, 360)}`,
          opacity: maxOpacity,
          duration: gsap.utils.random(8, 16),
          delay: gsap.utils.random(0, 10),
          repeat: -1,
          ease: 'none',
          onRepeat: () => {
            p.style.left = gsap.utils.random(0, 100) + '%';
          }
        }
      );

      // Titileo: las estrellas y ascuas parpadean mientras suben
      if (type === 'hero-particle--star' || type === 'hero-particle--ember') {
        gsap.to(p, {
          scale: gsap.utils.random(.5, 1.5),
          duration: gsap.utils.random(1.1, 2.4),
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: gsap.utils.random(0, 3)
        });
      }
    }
  }

  /* ── 4. Timeline de entrada del Hero ── */
  gsap.set('.hero__overlay', { opacity: 0 });
  gsap.set('.hero__eyebrow', { y: -14, scale: .9 });
  gsap.set('.hero__subtitle', { y: 18, filter: 'blur(6px)' });
  gsap.set('.hero__rotator', { y: 14 });
  gsap.set('.hero__cta, .hero__cta-ghost', { y: 18, scale: .92 });
  gsap.set('.hero__scroll-cue', { y: -8 });
  gsap.set('.hero__title .char', { y: 40, rotate: 6 });
  gsap.set('.hero__aurora, .hero__rays', { opacity: 0 });

  const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  heroTl
    .fromTo('.hero__bg', { scale: 1.25 }, { scale: 1.06, duration: 2.8, ease: 'power2.out' }, 0)
    .to('.hero__overlay', { opacity: 1, duration: 1.1, ease: 'power2.out' }, 0)
    .to('.hero__aurora', { opacity: .75, duration: 1.8, ease: 'power1.out' }, .2)
    .to('.hero__rays', { opacity: .55, duration: 2.2, ease: 'power1.out' }, .4)
    .to('.hero__eyebrow', { opacity: 1, y: 0, scale: 1, duration: .7, ease: 'back.out(2)' }, .15)
    .to('.hero__title-wrap', { opacity: 1, duration: .5 }, .3)
    .to('.hero__title .char', {
      opacity: 1, y: 0, rotate: 0, duration: .8, stagger: .035,
      ease: 'back.out(1.7)'
    }, .4)
    .add(() => {
      document.querySelector('.hero__title-wrap')?.classList.add('shine');
      heroEntranceDone = true;
    }, .5)
    .to('.hero__subtitle', { opacity: 1, y: 0, filter: 'blur(0px)', duration: .8 }, '-=0.35')
    .to('.hero__rotator', { opacity: 1, y: 0, duration: .6 }, '-=0.45')
    .to('.hero__cta', { opacity: 1, y: 0, scale: 1, duration: .65, ease: 'back.out(2.2)' }, '-=0.3')
    .to('.hero__cta-ghost', { opacity: 1, y: 0, scale: 1, duration: .6, ease: 'back.out(2.2)' }, '-=0.45')
    .to('.hero__scroll-cue', { opacity: .85, y: 0, duration: .6 }, '-=0.2');

  // Ken Burns: el fondo nunca se queda quieto, sigue acercándose y paneando
  if (!prefersReducedMotion) {
    heroTl.add(() => {
      gsap.to('.hero__bg', {
        scale: 1.16,
        xPercent: 2.5,
        duration: 20,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });
  }

  /* ── 4b. Rotador de palabras del hero ── */
  const rotator = document.getElementById('heroRotator');
  const rotatorSrc = document.querySelector('.hero__rotator-src');
  if (rotator && rotatorSrc) {
    let rotatorTl = null;

    const buildRotator = () => {
      if (rotatorTl) { rotatorTl.kill(); rotatorTl = null; }
      const words = rotatorSrc.textContent.split('|').map((w) => w.trim()).filter(Boolean);
      if (!words.length) return;

      rotator.innerHTML = '';
      // Se repite la primera palabra al final para que el ciclo cierre sin salto
      [...words, words[0]].forEach((w) => {
        const span = document.createElement('span');
        span.className = 'hero__rotator-word';
        span.textContent = w;
        rotator.appendChild(span);
      });
      gsap.set(rotator, { yPercent: 0 });

      if (prefersReducedMotion) return;

      const step = 100 / (words.length + 1);
      rotatorTl = gsap.timeline({ repeat: -1, delay: 1.6 });
      for (let i = 1; i <= words.length; i++) {
        rotatorTl
          .to(rotator, { yPercent: -step * i, duration: .55, ease: 'power3.inOut' })
          .to({}, { duration: 1.7 });
      }
      rotatorTl.set(rotator, { yPercent: 0 });
    };

    buildRotator();
    document.addEventListener('langchange', () => {
      // i18n ya reescribió los textos: se rearma el título y el rotador
      heroTitle?.removeAttribute('data-raw');
      splitHeroTitle();
      revealChars(true);
      buildRotator();
    });
  }

  // Rebote continuo del cursor de scroll
  if (!prefersReducedMotion) {
    gsap.to('.hero__scroll-cue', { y: 8, duration: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2.2 });
  }

  // Tocar/clickear "Desliza"
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

    // El contenido se aleja y se desvanece más rápido que el fondo al bajar
    gsap.to('.hero__content', {
      yPercent: -18,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: '70% top', scrub: true }
    });
  }

  /* ── 5. Marquee cultural infinito con desaceleración interactiva ── */
  const track = document.getElementById('marqueeTrack');
  const marqueeSection = document.querySelector('.marquee');
  if (track) {
    const original = track.querySelector('.marquee__group');
    if (original) {
      const clone = original.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    }
    const marqueeTween = gsap.to(track, { xPercent: -50, duration: 24, ease: 'none', repeat: -1 });

    if (marqueeSection && !prefersReducedMotion) {
      marqueeSection.addEventListener('mouseenter', () => {
        gsap.to(marqueeTween, { timeScale: 0.35, duration: 0.6 });
      });
      marqueeSection.addEventListener('mouseleave', () => {
        gsap.to(marqueeTween, { timeScale: 1, duration: 0.6 });
      });
    }
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

  /* ── 6b. Título "Información para ti": entrada palabra por palabra ── */
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

  /* ── 7. Estadísticas: stagger + contador numérico + destello al finalizar ── */
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
    const parentStat = el.closest('.stat');

    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(counter, {
          val: target, duration: 1.7, ease: 'power2.out',
          onUpdate: () => { el.textContent = Math.floor(counter.val).toLocaleString('es-SV') + suffix; },
          onComplete: () => {
            el.textContent = target.toLocaleString('es-SV') + suffix;
            if (parentStat && !prefersReducedMotion) {
              gsap.fromTo(parentStat,
                { boxShadow: '0 0 25px rgba(190,142,86,0.6)' },
                { boxShadow: '0 14px 30px rgba(190,142,86,.18)', duration: 0.8, ease: 'power2.out' }
              );
            }
          }
        });
      }
    });
  });

  /* ── 7b. Rotador de Datos Curiosos con GSAP y barra de progreso ── */
  const factEl = document.getElementById('factText');
  const factProgressBar = document.getElementById('factProgressBar');
  const factBox = document.querySelector('.fact-box');
  const FACT_KEYS = ['fact.text1', 'fact.text2', 'fact.text3', 'fact.text4', 'fact.text5', 'fact.text6', 'fact.text7'];

  if (factEl && factBox) {
    let factIdx = 0;
    let progressTween = null;

    const getFactText = (idx) => {
      const lang = (window.SRi18n && window.SRi18n.getLang()) || 'es';
      const key = FACT_KEYS[idx];
      return window.SRi18n ? window.SRi18n.t(key, lang) : key;
    };

    const animateFactChange = (nextIdx, direction = 1) => {
      factIdx = (nextIdx + FACT_KEYS.length) % FACT_KEYS.length;

      // Animar salida del texto anterior
      gsap.to(factEl, {
        opacity: 0,
        y: -14 * direction,
        scale: 0.96,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          factEl.textContent = getFactText(factIdx);
          document.querySelectorAll('.fact-dot').forEach((d, di) => {
            d.classList.toggle('active', di === factIdx);
          });

          // Animar entrada del nuevo texto
          gsap.fromTo(factEl,
            { opacity: 0, y: 14 * direction, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.5)' }
          );
        }
      });

      startProgressBar();
    };

    const startProgressBar = () => {
      if (progressTween) progressTween.kill();
      if (!factProgressBar || prefersReducedMotion) return;

      gsap.set(factProgressBar, { width: '0%' });
      progressTween = gsap.to(factProgressBar, {
        width: '100%',
        duration: 5.5,
        ease: 'none',
        onComplete: () => {
          animateFactChange(factIdx + 1, 1);
        }
      });
    };

    const prevBtn = document.getElementById('factPrev');
    const nextBtn = document.getElementById('factNext');
    if (prevBtn) prevBtn.addEventListener('click', () => animateFactChange(factIdx - 1, -1));
    if (nextBtn) nextBtn.addEventListener('click', () => animateFactChange(factIdx + 1, 1));

    document.querySelectorAll('.fact-dot').forEach((dot, dotIdx) => {
      dot.addEventListener('click', () => {
        if (dotIdx !== factIdx) animateFactChange(dotIdx, dotIdx > factIdx ? 1 : -1);
      });
    });

    factBox.addEventListener('mouseenter', () => {
      if (progressTween) progressTween.pause();
    });
    factBox.addEventListener('mouseleave', () => {
      if (progressTween) progressTween.resume();
    });

    document.addEventListener('langchange', () => {
      factEl.textContent = getFactText(factIdx);
    });

    startProgressBar();
  }

  /* ── 8. Tarjetas del grid principal: 3D Tilt suave + entrada cinemática ── */
  const homeCards = gsap.utils.toArray('.home-card');
  if (homeCards.length) {
    gsap.set(homeCards, { autoAlpha: 0, y: 24, scale: .96 });

    ScrollTrigger.batch(homeCards, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, {
          autoAlpha: 1, y: 0, scale: 1,
          duration: .8, ease: 'power3.out', stagger: .15
        });
      }
    });

    // 3D Tilt en las tarjetas Bento
    if (!prefersReducedMotion) {
      homeCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width - 0.5;
          const y = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(card, {
            rotateY: x * 8,
            rotateX: -y * 8,
            duration: 0.35,
            ease: 'power2.out',
            transformPerspective: 800
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.65,
            ease: 'elastic.out(1, 0.4)'
          });
        });
      });
    }
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
  document.querySelectorAll('.hero__cta, .home-cta-final .btn-primary, .fact-nav').forEach((el) => magnetize(el));

  /* ── 9b. Enredaderas decorativas: mismo arte (liana + hojas) del hero de
     Categorías, inyectado como acento de esquina en las secciones del
     inicio en vez de las manchas de color de fondo. ── */
  const VINE_PATH = 'M-10,-10 C60,40 40,120 120,150 C200,180 180,260 260,300';
  const VINE_LEAVES = [
    { t: 'translate(48,34) rotate(35)',   d: 'M0,0 C7,-11 20,-11 27,0 C20,11 7,11 0,0 Z' },
    { t: 'translate(108,146) rotate(-20)', d: 'M0,0 C7,-11 20,-11 27,0 C20,11 7,11 0,0 Z' },
    { t: 'translate(172,258) rotate(50)',  d: 'M0,0 C7,-11 20,-11 27,0 C20,11 7,11 0,0 Z' },
    { t: 'translate(248,296) rotate(-10)', d: 'M0,0 C6,-9 17,-9 23,0 C17,9 6,9 0,0 Z' }
  ];
  function vineSVG(corner) {
    const leaves = VINE_LEAVES.map(l => `<path transform="${l.t}" d="${l.d}" />`).join('');
    const inner = `<path d="${VINE_PATH}" fill="none" stroke="var(--accent-jade)" stroke-width="3" stroke-linecap="round" opacity=".45" /><g fill="var(--accent-jade)" opacity=".5">${leaves}</g>`;
    const body = corner === 'br' ? `<g transform="translate(300,300) scale(-1,-1)">${inner}</g>` : inner;
    return `<svg class="section-vine section-vine--${corner}" viewBox="0 0 300 300" aria-hidden="true" focusable="false">${body}</svg>`;
  }
  document.querySelectorAll('.about, .stats, .fact-wrap, .info-badge, .home-grid').forEach(section => {
    if (getComputedStyle(section).position === 'static') section.style.position = 'relative';
    section.insertAdjacentHTML('afterbegin', vineSVG('tl') + vineSVG('br'));
  });

  /* ── 10. Enredaderas decorativas: vaivén sutil ── */
  if (!prefersReducedMotion) {
    gsap.utils.toArray('.section-vine').forEach((vine, i) => {
      gsap.to(vine, {
        rotate: 'random(-2, 2)',
        duration: gsap.utils.random(6, 9),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * .5
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

  window.addEventListener('load', () => ScrollTrigger.refresh());
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
});