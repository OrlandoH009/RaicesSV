/* ============================================================
   RAÍCES SV — interactive.js
   Mejoras dinámicas para Inicio y Categorías:
   - Barra de progreso de scroll
   - Tarjetas con efecto tilt 3D + spotlight
   - Contadores animados
   - Rotador de datos curiosos
   - Buscador y filtros de categorías
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Barra de progreso de scroll ── */
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);
  const updateProgress = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
    progress.style.width = pct + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ── Tarjetas con tilt 3D + spotlight ── */
  function initTiltCards(selector) {
    const cards = document.querySelectorAll(selector);
    cards.forEach(card => {
      // Spotlight dinámico
      const spotlight = document.createElement('span');
      spotlight.className = 'card-spotlight';
      card.appendChild(spotlight);

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        spotlight.style.setProperty('--mx', `${x}px`);
        spotlight.style.setProperty('--my', `${y}px`);

        if (!reduceMotion) {
          const cx = r.width / 2, cy = r.height / 2;
          const rotateX = ((y - cy) / cy) * -6;
          const rotateY = ((x - cx) / cx) * 6;
          card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }
  initTiltCards('.home-card');
  initTiltCards('.categoria-card');

  /* ── Contadores animados ── */
  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10) || 0;
    const dur = 1400;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(eased * target).toLocaleString('es-SV');
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString('es-SV') + (el.dataset.suffix || '');
    }
    requestAnimationFrame(tick);
  }
  if (!document.body.hasAttribute('data-gsap-counters')) {
    const counters = document.querySelectorAll('.stat__num');
    if (counters.length) {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(c => obs.observe(c));
    }
  }

  /* ── Rotador de datos curiosos ── */
  const facts = [
    'El Salvador es conocido como "Pulgarcito de América" por su tamaño territorial.',
    'La pupusa fue declarada Plato Típico y Patrimonio Cultural de El Salvador en 2005.',
    'Joya de Cerén, en La Libertad, es Patrimonio de la Humanidad: la "Pompeya de América".',
    'El país cuenta con más de veinte volcanes, entre activos e inactivos.',
    'La flor de izote, flor nacional, también se cocina en platillos tradicionales.',
    'El náhuat es uno de los idiomas indígenas que aún se conserva en algunas comunidades.',
    'Las Ruinas de Tazumal son uno de los sitios arqueológicos mayas más visitados del país.'
  ];
  const factEl = document.getElementById('factText');
  const factDots = document.getElementById('factDots');
  if (factEl) {
    let i = 0;
    if (factDots) {
      facts.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = 'fact-dot' + (idx === 0 ? ' active' : '');
        factDots.appendChild(dot);
      });
    }
    const showFact = (idx) => {
      factEl.style.opacity = 0;
      setTimeout(() => {
        factEl.textContent = facts[idx];
        factEl.style.opacity = 1;
        factDots?.querySelectorAll('.fact-dot').forEach((d, di) =>
          d.classList.toggle('active', di === idx));
      }, 350);
    };
    setInterval(() => {
      i = (i + 1) % facts.length;
      showFact(i);
    }, 5000);
  }

  /* ── Buscador y filtros (Categorías) — se omite si la página usa su propia versión GSAP ── */
  if (!document.body.hasAttribute('data-gsap-filters')) {
    const searchInput = document.getElementById('categoriaSearch');
    const filterChips = document.querySelectorAll('.filter-chip');
    const categoriaCards = document.querySelectorAll('.categoria-card');
    const emptyState = document.getElementById('emptyState');
    const resultsCount = document.getElementById('resultsCount');

    function applyFilters() {
      const term = (searchInput?.value || '').toLowerCase().trim();
      const activeChip = document.querySelector('.filter-chip.active');
      const tag = activeChip ? activeChip.dataset.tag : 'todos';
      let visible = 0;

      categoriaCards.forEach(card => {
        const label = card.querySelector('.categoria-card__label')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('.categoria-card__desc')?.textContent.toLowerCase() || '';
        const tags = (card.dataset.tags || '').toLowerCase();
        const matchesTerm = !term || label.includes(term) || desc.includes(term);
        const matchesTag = tag === 'todos' || tags.includes(tag);
        const show = matchesTerm && matchesTag;
        card.style.display = show ? '' : 'none';
        card.classList.toggle('reveal', false);
        if (show) visible++;
      });

      if (emptyState) emptyState.style.display = visible === 0 ? 'flex' : 'none';
      if (resultsCount) {
        resultsCount.textContent = term || tag !== 'todos'
          ? `${visible} resultado${visible === 1 ? '' : 's'}`
          : '';
      }
    }

    searchInput?.addEventListener('input', applyFilters);
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        applyFilters();
      });
    });
  }

});