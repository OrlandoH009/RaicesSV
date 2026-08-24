/* ============================================================
  Salvadorean Roots — global-search.js
   Índice de búsqueda entre categorías: permite que el buscador de
   Categorías encuentre contenido específico (leyendas, platillos,
   sitios, eventos, hechos históricos) dentro de las demás páginas
   y enlace directo al lugar exacto donde está esa información.
   ============================================================ */

(function () {
  const PANEL_PAGES = [
    { url: '../views/sitios-culturales.html', category: 'sitios', badgeKey: 'cards.sitios', badgeFallback: 'Sitios Culturales', param: 'tab' },
    { url: '../views/gastronomia.html', category: 'gastronomia', badgeKey: 'cards.gastronomia', badgeFallback: 'Gastronomía', param: 'tab' },
    { url: '../views/eventos.html', category: 'eventos', badgeKey: 'cards.eventos', badgeFallback: 'Eventos Culturales', param: 'tab' }
  ];

  let index = [];
  let ready = false;
  let readyPromise = null;

  function normalize(str) {
    return (str || '')
      .toString()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '');
  }

  function tt(key, fallback) {
    if (window.SRi18n && typeof window.SRi18n.t === 'function') {
      const val = window.SRi18n.t(key, window.SRi18n.getLang());
      if (val) return val;
    }
    return fallback;
  }

  function fromPanelsHTML(html, page) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const items = [];
    doc.querySelectorAll('.tab-btn[data-tab]').forEach((btn) => {
      const id = btn.dataset.tab;
      const panel = doc.getElementById('tab-' + id);
      if (!panel) return;
      const title = panel.querySelector('.info-content__hero-title')?.textContent.trim()
        || btn.textContent.trim();
      const snippet = panel.querySelector('.info-content__hero-sub')?.textContent.trim() || '';
      items.push({
        category: page.category,
        badge: tt(page.badgeKey, page.badgeFallback),
        title,
        snippet,
        url: `${page.url}?${page.param}=${id}`
      });
    });
    return items;
  }

  function fromLeyendas() {
    if (typeof LEYENDAS_DATA === 'undefined') return [];
    return LEYENDAS_DATA.map((l) => ({
      category: 'leyendas',
      badge: tt('cards.leyendas', 'Leyendas'),
      title: tt(l.tituloKey, l.titulo),
      snippet: tt(l.subKey, l.sub),
      url: `../views/leyendas.html?leyenda=${l.id}`
    }));
  }

  function fromHistoria() {
    if (typeof getHistoriaEventos !== 'function') return [];
    return getHistoriaEventos().map((ev) => ({
      category: 'historia',
      badge: tt('cards.historia', 'Historia'),
      title: ev.title,
      snippet: (ev.text && ev.text[0]) ? ev.text[0].slice(0, 140).trim() + (ev.text[0].length > 140 ? '…' : '') : '',
      url: `../views/historia.html?item=${ev.id}`
    }));
  }

  function buildIndex() {
    if (readyPromise) return readyPromise;

    readyPromise = Promise.all(
      PANEL_PAGES.map((page) =>
        fetch(page.url)
          .then((res) => res.text())
          .then((html) => fromPanelsHTML(html, page))
          .catch(() => [])
      )
    ).then((panelResults) => {
      index = [].concat(...panelResults, fromLeyendas(), fromHistoria());
      ready = true;
      return index;
    });

    return readyPromise;
  }

  function search(term, limit) {
    const q = normalize(term).trim();
    if (!q) return [];
    const matches = index.filter((item) =>
      normalize(item.title).includes(q) || normalize(item.snippet).includes(q)
    );
    return typeof limit === 'number' ? matches.slice(0, limit) : matches;
  }

  window.SRGlobalSearch = {
    init: buildIndex,
    search,
    isReady: () => ready
  };
})();
