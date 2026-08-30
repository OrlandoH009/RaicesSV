/* ============================================================
  Salvadorean Roots — categorias-gsap.js
   Animaciones GSAP exclusivas de Categorías:
   - Hero con título partido en letras + partículas + parallax
   - Buscador con anillo de brillo animado
   - Filtros con indicador deslizante (pill)
   - Tarjetas: entrada "caen y se acomodan" + filtrado animado
   - Glow de cursor + contador de resultados animado
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return; // fallback silencioso si el CDN no cargó

  gsap.registerPlugin(ScrollTrigger);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Hero: partir el título en letras ── */
  const heroTitle = document.querySelector('.hero__title');
  if (heroTitle) {
    const original = heroTitle.textContent.trim();
    heroTitle.setAttribute('aria-label', original);
    heroTitle.innerHTML = '';
    [...original].forEach((ch) => {
      const span = document.createElement('span');
      span.className = 'char';
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      heroTitle.appendChild(span);
    });
  }

  /* ── Hero: partículas doradas flotantes ── */
  const particleWrap = document.getElementById('heroParticles');
  if (particleWrap && !prefersReducedMotion) {
    const total = window.innerWidth < 600 ? 8 : 16;
    for (let i = 0; i < total; i++) {
      const p = document.createElement('span');
      p.className = 'hero-particle';
      const size = gsap.utils.random(4, 11);
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.left = gsap.utils.random(0, 100) + '%';
      particleWrap.appendChild(p);

      gsap.fromTo(p,
        { y: 20, opacity: 0 },
        {
          y: -window.innerHeight * gsap.utils.random(0.5, 0.85),
          x: gsap.utils.random(-50, 50),
          opacity: gsap.utils.random(.4, .8),
          duration: gsap.utils.random(7, 13),
          delay: gsap.utils.random(0, 9),
          repeat: -1,
          ease: 'none',
          onRepeat: () => { p.style.left = gsap.utils.random(0, 100) + '%'; }
        }
      );
    }
  }

  /* ── Timeline de entrada del Hero ── */
  gsap.set('.hero__title .char', { y: 36 });
  const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
  heroTl
    .fromTo('.hero__bg', { scale: 1.16 }, { scale: 1.05, duration: 2.4, ease: 'power2.out' }, 0)
    .to('.hero__title-wrap', { opacity: 1, duration: .5 }, .2)
    .to('.hero__title .char', { opacity: 1, y: 0, duration: .75, stagger: .028, ease: 'back.out(1.7)' }, .3)
    .add(() => document.querySelector('.hero__title-wrap')?.classList.add('shine'), .4)
    .to('.hero__subtitle', { opacity: 1, y: 0, duration: .7 }, '-=0.3');

  gsap.set('.hero__subtitle', { y: 16 });

  if (!prefersReducedMotion) {
    gsap.to('.hero__bg', {
      yPercent: 14,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  /* ── Buscador: anillo de brillo al enfocar ── */
  const searchWrap = document.querySelector('.categoria-search-wrap');
  const searchInput = document.getElementById('categoriaSearch');
  searchInput?.addEventListener('focus', () => searchWrap?.classList.add('focused'));
  searchInput?.addEventListener('blur', () => searchWrap?.classList.remove('focused'));

  /* ── Filtros: pill deslizante detrás del chip activo ── */
  const chipsWrap = document.querySelector('.filter-chips');
  const chips = gsap.utils.toArray('.filter-chip');
  let pill = null;
  if (chipsWrap && chips.length) {
    pill = document.createElement('span');
    pill.className = 'filter-chip-pill';
    chipsWrap.insertBefore(pill, chipsWrap.firstChild);

    const movePill = (chip, animate = true) => {
      if (!chip) return;
      const wrapRect = chipsWrap.getBoundingClientRect();
      const chipRect = chip.getBoundingClientRect();
      const props = {
        x: chipRect.left - wrapRect.left,
        y: chipRect.top - wrapRect.top,
        width: chipRect.width,
        height: chipRect.height
      };
      if (animate) gsap.to(pill, { ...props, duration: .45, ease: 'power3.out' });
      else gsap.set(pill, props);
    };

    const initialActive = document.querySelector('.filter-chip.active') || chips[0];
    requestAnimationFrame(() => movePill(initialActive, false));

    chips.forEach((chip) => {
      chip.addEventListener('click', () => movePill(chip));
    });
    window.addEventListener('resize', () => {
      movePill(document.querySelector('.filter-chip.active'), false);
    });
  }

  /* ── Tarjetas: entrada "caen y se acomodan" ── */
  const cards = gsap.utils.toArray('.categoria-card');
  if (cards.length) {
    gsap.set(cards, { autoAlpha: 0, y: -46, scale: .96 });
    ScrollTrigger.batch(cards, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) => {
        gsap.to(batch, { autoAlpha: 1, y: 0, scale: 1, duration: .9, ease: 'power3.out', stagger: .1 });
      }
    });
  }

  /* ── Panel de filtros en celular: botón flotante + hoja deslizante ── */
  const filtersPanel = document.getElementById('categoriasTools');
  const filtersFab = document.getElementById('filtersFabBtn');
  const filtersOverlay = document.getElementById('filtersSheetOverlay');
  const filtersClose = document.getElementById('filtersSheetClose');

  function openFiltersSheet() {
    filtersPanel?.classList.add('is-open');
    filtersOverlay?.classList.add('is-open');
    filtersFab?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('filters-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('categoriaSearch')?.focus(), 320);
  }
  function closeFiltersSheet() {
    filtersPanel?.classList.remove('is-open');
    filtersOverlay?.classList.remove('is-open');
    filtersFab?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('filters-open');
    document.body.style.overflow = '';
  }
  filtersFab?.addEventListener('click', openFiltersSheet);
  filtersClose?.addEventListener('click', closeFiltersSheet);
  filtersOverlay?.addEventListener('click', closeFiltersSheet);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && filtersPanel?.classList.contains('is-open')) closeFiltersSheet();
  });

  /* ── Búsqueda global: encuentra contenido dentro de otras categorías ── */
  const globalResultsWrap = document.getElementById('globalSearchResults');
  if (window.SRGlobalSearch) window.SRGlobalSearch.init();

  function renderGlobalResults(term) {
    if (!globalResultsWrap) return;
    if (!term || !window.SRGlobalSearch) {
      globalResultsWrap.innerHTML = '';
      return;
    }
    const matches = window.SRGlobalSearch.search(term, 6);
    if (!matches.length) {
      globalResultsWrap.innerHTML = '';
      return;
    }
    globalResultsWrap.innerHTML = matches.map((m) => `
      <a class="global-result" href="${m.url}">
        <div class="global-result__body">
          <span class="global-result__badge">${m.badge}</span>
          <p class="global-result__title">${m.title}</p>
          <p class="global-result__snippet">${m.snippet}</p>
        </div>
        <svg class="global-result__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
      </a>
    `).join('');
  }

  /* ── Filtrado animado (búsqueda + chips) ── */
  const filterChips = document.querySelectorAll('.filter-chip');
  const emptyState = document.getElementById('emptyState');
  const resultsCount = document.getElementById('resultsCount');
  const countObj = { val: 0 };

  function setCount(n) {
    gsap.to(countObj, {
      val: n, duration: .4, ease: 'power1.out', snap: 'val',
      onUpdate: () => {
        const term = (searchInput?.value || '').trim();
        const tag = document.querySelector('.filter-chip.active')?.dataset.tag || 'todos';
        if (resultsCount) {
          resultsCount.textContent = (term || tag !== 'todos')
            ? `${Math.round(countObj.val)} resultado${Math.round(countObj.val) === 1 ? '' : 's'}`
            : '';
        }
      }
    });
  }

  function applyFiltersAnimated() {
    const term = (searchInput?.value || '').toLowerCase().trim();
    const activeChip = document.querySelector('.filter-chip.active');
    const tag = activeChip ? activeChip.dataset.tag : 'todos';
    let visible = 0;
    const toShow = [];
    const toHide = [];

    cards.forEach((card) => {
      const label = card.querySelector('.categoria-card__label')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.categoria-card__desc')?.textContent.toLowerCase() || '';
      const tags = (card.dataset.tags || '').toLowerCase();
      const matchesTerm = !term || label.includes(term) || desc.includes(term);
      const matchesTag = tag === 'todos' || tags.includes(tag);
      const show = matchesTerm && matchesTag;
      if (show) { visible++; toShow.push(card); } else { toHide.push(card); }
    });

    if (toHide.length) {
      gsap.to(toHide, {
        autoAlpha: 0, y: -14, scale: .92, duration: .3, ease: 'power2.in', stagger: .02,
        onComplete: () => toHide.forEach((c) => { c.style.display = 'none'; })
      });
    }
    if (toShow.length) {
      toShow.forEach((c) => { c.style.display = ''; });
      gsap.to(toShow, {
        autoAlpha: 1, y: 0, scale: 1, duration: .4, ease: 'power2.out', stagger: .03, delay: toHide.length ? .15 : 0
      });
    }

    if (emptyState) {
      if (visible === 0) {
        emptyState.style.display = 'flex';
        gsap.fromTo(emptyState, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: .4 });
      } else {
        emptyState.style.display = 'none';
      }
    }
    setCount(visible);
    renderGlobalResults(term);
  }

  searchInput?.addEventListener('input', applyFiltersAnimated);
  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      filterChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      applyFiltersAnimated();
      // Cerrar la hoja de filtros (celular) para que se vea el resultado filtrado
      if (filtersPanel?.classList.contains('is-open')) closeFiltersSheet();
    });
  });

  ScrollTrigger.refresh();

  // Refresco tardío: las imágenes de las tarjetas todavía no cargaron cuando
  // se calculó lo anterior, así que las posiciones de disparo del scroll
  // quedan desactualizadas y las animaciones tardan en aparecer.
  window.addEventListener('load', () => ScrollTrigger.refresh());
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
});