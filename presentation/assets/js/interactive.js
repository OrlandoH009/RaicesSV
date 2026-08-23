/* ============================================================
  Salvadorean Roots — interactive.js
   Mejoras dinámicas para Inicio y Categorías:
   - Barra de progreso de scroll
   - Tarjetas con spotlight (mismo scale del CSS en :hover)
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

  /* ── Tarjetas con spotlight (sin tilt 3D: el tilt inline pisaba el
     scale(1.018) del :hover en CSS y, por el cálculo de perspective()
     aplicado en el propio elemento, hacía que la card pareciera
     "bajar/hundirse" al mover el mouse. El scale del hover ya lo
     maneja el CSS, aquí solo movemos el spotlight.) ── */
  function initTiltCards(selector) {
    const cards = document.querySelectorAll(selector);
    cards.forEach(card => {
      // Spotlight dinámico
      const spotlight = document.createElement('span');
      spotlight.className = 'card-spotlight';
      card.appendChild(spotlight);

      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left;
        const y = e.clientY - r.top;
        spotlight.style.setProperty('--mx', `${x}px`);
        spotlight.style.setProperty('--my', `${y}px`);
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
  const FACT_KEYS = ['fact.text1', 'fact.text2', 'fact.text3', 'fact.text4', 'fact.text5', 'fact.text6', 'fact.text7'];
  const factEl = document.getElementById('factText');
  const factDots = document.getElementById('factDots');
  const factPrev = document.getElementById('factPrev');
  const factNext = document.getElementById('factNext');
  if (factEl) {
    let i = 0;
    let timer = null;

    const currentFacts = () => {
      const lang = (window.SRi18n && window.SRi18n.getLang()) || 'es';
      return FACT_KEYS.map(key => (window.SRi18n ? window.SRi18n.t(key, lang) : key));
    };

    if (factDots) {
      FACT_KEYS.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = 'fact-dot' + (idx === 0 ? ' active' : '');
        factDots.appendChild(dot);
      });
    }

    const showFact = (idx) => {
      const facts = currentFacts();
      factEl.style.opacity = 0;
      setTimeout(() => {
        factEl.textContent = facts[idx];
        factEl.style.opacity = 1;
        factDots?.querySelectorAll('.fact-dot').forEach((d, di) =>
          d.classList.toggle('active', di === idx));
      }, 350);
    };

    const restartAutoplay = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        i = (i + 1) % FACT_KEYS.length;
        showFact(i);
      }, 5000);
    };

    const goTo = (idx) => {
      i = (idx + FACT_KEYS.length) % FACT_KEYS.length;
      showFact(i);
      restartAutoplay();
    };

    factPrev?.addEventListener('click', () => goTo(i - 1));
    factNext?.addEventListener('click', () => goTo(i + 1));

    document.addEventListener('langchange', () => showFact(i));

    restartAutoplay();
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