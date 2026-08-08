/* ============================================================
  Salvadorean Roots — quiz-waves.js
  Ondas concéntricas interactivas (SVG + GSAP) para el hero de
  bienvenida del Quiz. Reaccionan sutilmente al movimiento del
  mouse/touch y pulsan de forma ambiental cuando no hay interacción.
  Paleta añil/dorado/celeste — coherente con el resto del sitio.
  ============================================================ */

(function () {
  function initQuizWaves() {
    const host = document.getElementById('quizWelcomeWaves');
    if (!host) return;

    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'quiz-waves__svg');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');

    // Tres anillos concéntricos por "onda"; dos ondas ancladas en
    // esquinas opuestas para llenar el espacio sin saturar el centro
    // (donde vive el texto).
    const ringsConfig = [
      { cx: 12, cy: 15, colorVar: '--accent-indigo', baseR: 10 },
      { cx: 12, cy: 15, colorVar: '--gold',           baseR: 20 },
      { cx: 12, cy: 15, colorVar: '--accent-sky',     baseR: 30 },
      { cx: 90, cy: 88, colorVar: '--gold',           baseR: 9  },
      { cx: 90, cy: 88, colorVar: '--accent-indigo',  baseR: 18 },
      { cx: 90, cy: 88, colorVar: '--accent-sky',     baseR: 27 }
    ];

    const circles = ringsConfig.map(cfg => {
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('cx', cfg.cx);
      c.setAttribute('cy', cfg.cy);
      c.setAttribute('r', cfg.baseR);
      c.setAttribute('fill', 'none');
      c.setAttribute('stroke', `var(${cfg.colorVar})`);
      c.setAttribute('stroke-width', '0.6');
      c.setAttribute('vector-effect', 'non-scaling-stroke');
      svg.appendChild(c);
      return { el: c, cfg };
    });

    host.appendChild(svg);

    // ── Animación ambiental (siempre activa, sutil) ──
    if (typeof gsap !== 'undefined') {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!prefersReduced) {
        circles.forEach(({ el, cfg }, i) => {
          gsap.to(el, {
            attr: { r: cfg.baseR * 1.12 },
            opacity: 0.35,
            duration: 4 + i * 0.6,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.35
          });
        });

        // ── Interactividad: el anillo más externo de cada grupo
        // sigue levemente al puntero, dando sensación de "eco" que
        // responde a la presencia del usuario ──
        let px = 50, py = 50;
        let raf = null;
        function onPointerMove(e) {
          const rect = host.getBoundingClientRect();
          if (!rect.width || !rect.height) return;
          const x = e.touches ? e.touches[0].clientX : e.clientX;
          const y = e.touches ? e.touches[0].clientY : e.clientY;
          px = ((x - rect.left) / rect.width) * 100;
          py = ((y - rect.top) / rect.height) * 100;
          if (raf) return;
          raf = requestAnimationFrame(applyPointerInfluence);
        }
        function applyPointerInfluence() {
          raf = null;
          circles.forEach(({ el, cfg }) => {
            const dx = px - cfg.cx;
            const dy = py - cfg.cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            // Cuanto más cerca el puntero, más se "infla" el anillo
            const influence = Math.max(0, 1 - dist / 55);
            gsap.to(el, {
              attr: { r: cfg.baseR * (1 + influence * 0.28) },
              duration: 0.6,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          });
        }
        host.addEventListener('mousemove', onPointerMove);
        host.addEventListener('touchmove', onPointerMove, { passive: true });

        // ── Eco expansivo al hacer click/tap en la bienvenida ──
        host.parentElement?.addEventListener('click', (e) => {
          spawnClickEcho(e);
        });
      }
    }

    function spawnClickEcho(e) {
      const rect = host.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      const echo = document.createElementNS(NS, 'circle');
      echo.setAttribute('cx', x);
      echo.setAttribute('cy', y);
      echo.setAttribute('r', 1);
      echo.setAttribute('fill', 'none');
      echo.setAttribute('stroke', 'var(--gold)');
      echo.setAttribute('stroke-width', '0.5');
      echo.setAttribute('vector-effect', 'non-scaling-stroke');
      echo.setAttribute('opacity', '0.7');
      svg.appendChild(echo);

      if (typeof gsap !== 'undefined') {
        gsap.to(echo, {
          attr: { r: 34 },
          opacity: 0,
          duration: 1.1,
          ease: 'power2.out',
          onComplete: () => echo.remove()
        });
      } else {
        echo.remove();
      }
    }
  }

  document.addEventListener('DOMContentLoaded', initQuizWaves);
})();   