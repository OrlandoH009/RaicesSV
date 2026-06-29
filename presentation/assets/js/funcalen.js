/* ════════════════════════════════════════
   RaicesSV — Calendario
   js/calendario.js
   Depende de: js/data.js (cargado antes)
════════════════════════════════════════ */

const MONTHS = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'
];

/* ── Estado global ── */
let state = {
  year:    new Date().getFullYear(),
  month:   new Date().getMonth(),
  filtered: [...FESTIVIDADES],
  viewList: false,
  activeFilters: { dept: '', month: '', type: '', search: '' }
};

/* ════════════════════════════════════════
   CALENDARIO
════════════════════════════════════════ */
function renderMonthPills() {
  const pills = document.getElementById('monthPills');
  pills.innerHTML = MONTHS.map((m, i) => {
    const hasEvt = FESTIVIDADES.some(f => f.mes === i);
    const active = i === state.month ? 'active' : '';
    const hasCls = hasEvt ? 'has-events' : '';
    return `<button class="month-pill ${active} ${hasCls}" data-m="${i}">${m}</button>`;
  }).join('');

  pills.querySelectorAll('.month-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      state.month = +btn.dataset.m;
      renderCalendar();
      renderMonthPills();
    });
  });
}

function renderCalendar() {
  document.getElementById('calYearTitle').textContent =
    `${MONTHS[state.month]} ${state.year}`;

  const grid = document.getElementById('calGrid');
  const today = new Date();

  // Primer día del mes (lunes = 0)
  const firstDay   = new Date(state.year, state.month, 1);
  const startDow   = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(state.year, state.month + 1, 0).getDate();
  const daysInPrev  = new Date(state.year, state.month, 0).getDate();

  const cells = [];

  // Días del mes anterior (relleno)
  for (let i = startDow - 1; i >= 0; i--)
    cells.push({ d: daysInPrev - i, cur: false });

  // Días del mes actual
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ d, cur: true });

  // Días del mes siguiente (relleno hasta 42 celdas)
  const rem = 42 - cells.length;
  for (let d = 1; d <= rem; d++)
    cells.push({ d, cur: false });

  grid.innerHTML = cells.map(({ d, cur }) => {
    const isToday = cur
      && d === today.getDate()
      && state.month === today.getMonth()
      && state.year  === today.getFullYear();

    const events = cur
      ? FESTIVIDADES.filter(f => f.mes === state.month && f.dia === d)
      : [];

    const hasEv = events.length > 0;
    const dots  = events.map(() => `<div class="day-dot"></div>`).join('');
    const label = events.length === 1
      ? `<div class="day-label">${events[0].nombre}</div>`
      : events.length > 1
        ? `<div class="day-label">${events.length} eventos</div>`
        : '';

    return `
      <div class="cal-day ${cur ? '' : 'other-month'} ${isToday ? 'today' : ''} ${hasEv ? 'has-event' : ''}"
           ${hasEv ? `data-evids="${events.map(e => e.id).join(',')}"` : ''}>
        <div class="day-num">${d}</div>
        ${hasEv ? `<div class="day-dots">${dots}</div>${label}` : ''}
      </div>`;
  }).join('');

  // Click en día con eventos → abre modal del primero
  grid.querySelectorAll('.cal-day.has-event').forEach(cell => {
    cell.addEventListener('click', () => {
      const ids = cell.dataset.evids.split(',').map(Number);
      openModal(FESTIVIDADES.find(f => f.id === ids[0]));
    });
  });
}

/* ════════════════════════════════════════
   CATÁLOGO
════════════════════════════════════════ */
function applyFilters() {
  const dept   = document.getElementById('f-dept').value;
  const month  = document.getElementById('f-month').value;
  const type   = document.getElementById('f-type').value;
  const search = document.getElementById('f-search').value.toLowerCase();

  state.filtered = FESTIVIDADES.filter(f => {
    if (dept   && f.departamento !== dept)        return false;
    if (month !== '' && f.mes !== +month)          return false;
    if (type   && f.tipo !== type)                 return false;
    if (search && !f.nombre.toLowerCase().includes(search)
               && !f.descripcion.toLowerCase().includes(search)) return false;
    return true;
  });

  renderCatalog();
}

function renderCatalog() {
  const grid = document.getElementById('catalogGrid');
  const n    = state.filtered.length;

  document.getElementById('resultsCount').innerHTML =
    `<strong>${n}</strong> festividad${n !== 1 ? 'es' : ''} encontrada${n !== 1 ? 's' : ''}`;

  if (n === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <h3 style="color:#444;font-family:'Playfair Display',serif;font-size:1.1rem;">Sin resultados</h3>
        <p>Intenta ajustar los filtros para encontrar más festividades.</p>
      </div>`;
    return;
  }

  grid.innerHTML = state.filtered.map(f => `
    <div class="fest-card" data-id="${f.id}">
      <div class="fest-card-banner"></div>
      <div class="fest-card-body">
        <div class="fest-card-meta">
          <span class="badge badge-dept">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            </svg>
            ${f.departamento}
          </span>
          <span class="badge badge-month">${MONTHS[f.mes]}</span>
          <span class="badge badge-type">${f.tipo}</span>
        </div>
        <div class="fest-date">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8"  y1="2" x2="8"  y2="6"/>
            <line x1="3"  y1="10" x2="21" y2="10"/>
          </svg>
          ${f.dia} de ${MONTHS[f.mes]}
        </div>
        <h3>${f.nombre}</h3>
        <p>${f.descripcion.slice(0, 130)}…</p>
      </div>
      <div class="fest-card-footer">
        <div class="fest-location">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${f.municipio}, ${f.departamento}
        </div>
        <a class="map-link" href="${f.mapUrl}" target="_blank" rel="noopener">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polygon points="3 11 22 2 13 21 11 13 3 11"/>
          </svg>
          Ver en mapa
        </a>
      </div>
    </div>`
  ).join('');

  // Click en cuerpo de tarjeta → modal
  grid.querySelectorAll('.fest-card').forEach(card => {
    card.querySelector('.fest-card-body').addEventListener('click', () => {
      const f = FESTIVIDADES.find(f => f.id === +card.dataset.id);
      openModal(f);
    });
  });
}

/* ════════════════════════════════════════
   MODAL
════════════════════════════════════════ */
function openModal(f) {
  if (!f) return;

  document.getElementById('modalTitle').textContent = f.nombre;
  document.getElementById('modalBody').innerHTML = `
    <div class="modal-row">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8"  y1="2" x2="8"  y2="6"/>
        <line x1="3"  y1="10" x2="21" y2="10"/>
      </svg>
      <div>
        <div class="lbl">Fecha</div>
        <div class="val">${f.dia} de ${MONTHS[f.mes]}</div>
      </div>
    </div>
    <div class="modal-row">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
      <div>
        <div class="lbl">Ubicación</div>
        <div class="val">${f.municipio}, ${f.departamento}</div>
      </div>
    </div>
    <div class="modal-row">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M12 8v4l3 3"/>
      </svg>
      <div>
        <div class="lbl">Tipo</div>
        <div class="val">${f.tipo}</div>
      </div>
    </div>
    <div class="modal-row" style="margin-bottom:1.25rem">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
      <div>
        <div class="lbl">Descripción</div>
        <div class="val">${f.descripcion}</div>
      </div>
    </div>
    <a class="modal-map-btn" href="${f.mapUrl}" target="_blank" rel="noopener">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <polygon points="3 11 22 2 13 21 11 13 3 11"/>
      </svg>
      Ver ubicación en Google Maps
    </a>`;

  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}

/* ════════════════════════════════════════
   EVENT LISTENERS
════════════════════════════════════════ */
document.getElementById('prevYear').addEventListener('click', () => {
  state.year--;
  renderCalendar();
});

document.getElementById('nextYear').addEventListener('click', () => {
  state.year++;
  renderCalendar();
});

document.getElementById('applyFilter').addEventListener('click', applyFilters);

document.getElementById('clearFilter').addEventListener('click', () => {
  document.getElementById('f-dept').value  = '';
  document.getElementById('f-month').value = '';
  document.getElementById('f-type').value  = '';
  document.getElementById('f-search').value = '';
  state.filtered = [...FESTIVIDADES];
  renderCatalog();
});

document.getElementById('f-search').addEventListener('keydown', e => {
  if (e.key === 'Enter') applyFilters();
});

document.getElementById('modalClose').addEventListener('click', closeModal);

document.getElementById('modalOverlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});

document.getElementById('gridViewBtn').addEventListener('click', () => {
  state.viewList = false;
  document.getElementById('catalogGrid').classList.remove('list-view');
  document.getElementById('gridViewBtn').classList.add('active');
  document.getElementById('listViewBtn').classList.remove('active');
});

document.getElementById('listViewBtn').addEventListener('click', () => {
  state.viewList = true;
  document.getElementById('catalogGrid').classList.add('list-view');
  document.getElementById('listViewBtn').classList.add('active');
  document.getElementById('gridViewBtn').classList.remove('active');
});

/* ════════════════════════════════════════
   INIT
════════════════════════════════════════ */
renderMonthPills();
renderCalendar();
renderCatalog();