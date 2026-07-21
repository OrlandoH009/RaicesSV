/* ============================================================
   RAÍCES SV — historia-timeline.js
   Construye la línea de tiempo y maneja el modal de eventos
   ============================================================ */

(function () {
  const listEl = document.getElementById('timelineList');
  const filtersWrap = document.getElementById('eraFilters');

  let leafletMap = null;
  let leafletMarker = null;

  // ---------- Construir nodos de la línea de tiempo ----------
  function buildTimeline(filter) {
    listEl.innerHTML = '';
    HISTORIA_EVENTOS.forEach((ev, i) => {
      if (filter !== 'all' && ev.era !== filter) return;

      const li = document.createElement('li');
      li.className = 'tl-node era-' + ev.era;
      li.dataset.id = ev.id;
      li.style.setProperty('--delay', (i % 8) * 0.06 + 's');

      li.innerHTML = `
        <button class="tl-node__dot" aria-label="Ver detalle: ${ev.title}">
          <span class="tl-node__ring"></span>
          <span class="tl-node__core"></span>
        </button>
        <div class="tl-node__card">
          <span class="tl-node__era-tag">${ev.eraLabel}</span>
          <p class="tl-node__date">${ev.date}</p>
          <h3 class="tl-node__title">${ev.title}</h3>
          <span class="tl-node__hint">Toca para leer más</span>
        </div>
      `;

      li.addEventListener('click', () => openModal(ev));
      listEl.appendChild(li);
    });

    // Reveal animation
    requestAnimationFrame(() => {
      document.querySelectorAll('.tl-node').forEach(n => n.classList.add('visible'));
    });
  }

  // ---------- Filtros de era ----------
  filtersWrap.addEventListener('click', (e) => {
    const btn = e.target.closest('.era-chip');
    if (!btn) return;
    filtersWrap.querySelectorAll('.era-chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    buildTimeline(btn.dataset.era);
  });

  // ---------- Modal ----------
  const modal = document.getElementById('eventModal');
  const modalImg = document.getElementById('modalImg');
  const modalEra = document.getElementById('modalEra');
  const modalTitle = document.getElementById('modalTitle');
  const modalDate = document.getElementById('modalDate');
  const modalText = document.getElementById('modalText');
  const modalMapCaption = document.getElementById('modalMapCaption');
  const closeBtn = document.getElementById('eventClose');
  const backdrop = document.getElementById('eventBackdrop');

  function openModal(ev) {
    modalImg.src = ev.img;
    modalImg.alt = ev.title;
    modalEra.textContent = ev.eraLabel;
    modalTitle.textContent = ev.title;
    modalDate.textContent = ev.date;
    modalText.innerHTML = ev.text.map(p => `<p>${p}</p>`).join('');
    modalMapCaption.textContent = ev.location.caption;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Inicializar / actualizar mapa Leaflet tras el render del modal
    setTimeout(() => initMap(ev.location), 60);
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  function initMap(loc) {
    const container = document.getElementById('modalMap');
    if (!leafletMap) {
      leafletMap = L.map(container, {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
      }).setView([loc.lat, loc.lng], loc.zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(leafletMap);

      leafletMarker = L.circle([loc.lat, loc.lng], {
        radius: 6000,
        color: '#be8e56',
        fillColor: '#be8e56',
        fillOpacity: 0.35,
        weight: 2,
      }).addTo(leafletMap);
    } else {
      leafletMap.setView([loc.lat, loc.lng], loc.zoom);
      leafletMarker.setLatLng([loc.lat, loc.lng]);
    }
    setTimeout(() => leafletMap.invalidateSize(), 100);
  }

  // ---------- Init ----------
  buildTimeline('all');
})();