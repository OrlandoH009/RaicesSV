const hoyInicial = new Date();
const calendarState = {
  currentYear: hoyInicial.getFullYear(),
  currentMonth: hoyInicial.getMonth(),
  selectedDay: null,
  festividades: []
};
// Se expone explícitamente en window: al cargarse como <script> normal (no
// type="module"), las declaraciones `const` de nivel superior NO cuelgan de
// `window`, así que los `if (window.calendarState)` repartidos en este mismo
// archivo nunca se cumplían y `festividades` se quedaba vacío para siempre.
window.calendarState = calendarState;

// Claves de traducción para los meses
const CLAVES_MESES = [
  "cal.months.ene", "cal.months.feb", "cal.months.mar", "cal.months.abr",
  "cal.months.may", "cal.months.jun", "cal.months.jul", "cal.months.ago",
  "cal.months.sep", "cal.months.oct", "cal.months.nov", "cal.months.dic"
];

const nombresMeses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Diccionario de fallback (solo los que faltan)
const DICCIONARIO_FALLBACK = {
  "ev.panela.title": "Feria de la Panela",
  "ev.panela.desc": "Disfruta de la producción artesanal de dulce de panela, derivados de la caña de azúcar y gastronomía local típica salvadoreña.",
  "ev.cruz.title": "Día de la Cruz",
  "ev.cruz.desc": "Tradición religiosa y cultural donde se coloca una cruz de palo de jiote en los patios y se adorna con frutas de temporada.",
  "ev.julias.title": "Fiestas Julias",
  "ev.julias.desc": "Celebración patronal de Santa Ana con desfiles, ferias mecánicas y actividades religiosas en honor a Señora Santa Ana.",
  "ev.agostinas.title": "Fiestas Agostinas",
  "ev.agostinas.desc": "Fiestas patronales de San Salvador en honor al Divino Salvador del Mundo, con el tradicional desfile de Correos y Comercio.",
  "ev.jocote.title": "Feria del Jocote Corona",
  "ev.jocote.desc": "Celebración de la cosecha del jocote corona en el Cerro Verde con derivados gastronómicos culinarios innovadores.",
  "ev.calabaza.title": "Fiesta de la Calabaza",
  "ev.calabaza.desc": "Tradición popular en Cojutepeque donde se exhiben calabazas decoradas y se realizan actividades culturales.",
  "ev.difuntos.title": "Día de los Difuntos",
  "ev.difuntos.desc": "Conmemoración a los fieles difuntos con visitas a cementerios y ofrendas florales en todo El Salvador.",
  "ev.anil.title": "Festival del Añil",
  "ev.anil.desc": "Celebración del añil, el tinte azul ancestral, con talleres, exposiciones y música en Suchitoto.",
  "ev.farolitos.title": "Día de los Farolitos",
  "ev.farolitos.desc": "Tradición de encender farolitos de papel en las calles de Ahuachapán en honor a la Virgen de la Asunción.",
  "ev.encuentros.title": "Danza de los Encuentros",
  "ev.encuentros.desc": "Danza ancestral que representa el encuentro entre españoles e indígenas, con vestuarios coloridos y música de tambor.",
  "ev.barro.title": "Festival del Barro",
  "ev.barro.desc": "Feria artesanal donde se exhiben y venden piezas de barro pintado a mano, con demostraciones en vivo.",
  "ev.gotera.title": "Fiestas Patronales de Gotera",
  "ev.gotera.desc": "Fiestas patronales en honor a San Francisco de Asís en la ciudad de Gotera, Morazán.",
  "ev.cuisnahuat.title": "Fiesta de San Miguel Arcángel",
  "ev.cuisnahuat.desc": "Celebración religiosa en Cuisnahuat, Sonsonate, con danzas y procesiones.",
  "ev.carnaval_2026.title": "Gran Carnaval de San Miguel",
  "ev.carnaval_2026.desc": "El carnaval más grande de El Salvador, con desfiles de carrozas, comparsas y música en San Miguel.",
  "ev.chicharron.title": "Festival del Chicharrón",
  "ev.chicharron.desc": "Feria gastronómica dedicada al chicharrón, con concursos de cocina y degustaciones en La Libertad.",
  "ev.launion.title": "Fiestas Patronales de La Unión",
  "ev.launion.desc": "Fiestas patronales en honor a la Virgen de la Candelaria en La Unión, con actividades religiosas y culturales.",
  "ev.navidad.title": "Navidad",
  "ev.navidad.desc": "Celebración de la Navidad con villancicos, pesebres y reuniones familiares en todo El Salvador.",
  "ev.posadas.title": "Posadas",
  "ev.posadas.desc": "Tradición de las posadas, donde se recrea el peregrinaje de María y José, con cantos, oraciones y piñatas.",
  "ev.arroz.title": "Feria del Arroz",
  "ev.arroz.desc": "Festival que celebra la cosecha del arroz en San Vicente, con platillos típicos y muestras culturales.",
  "ev.suchitotoFestival.title": "Festival de Suchitoto",
  "ev.suchitotoFestival.desc": "Festival de arte, cultura y música en la ciudad colonial de Suchitoto, con presentaciones de danza y teatro.",
  "ev.balsam.title": "Tradición del Bálsamo",
  "ev.balsam.desc": "Tradición popular en Jayaque donde se extrae y comercializa el bálsamo, un árbol medicinal nativo.",
  "ev.esquipulas.title": "Romería de Esquipulas",
  "ev.esquipulas.desc": "Peregrinación al santuario de Esquipulas en Chalatenango, con devoción y expresiones culturales.",
  "ev.guajactial.title": "Fiestas del Rey Guajactial",
  "ev.guajactial.desc": "Fiesta patronal en Sonsonate en honor al Rey Guajactial, con danzas y actividades religiosas.",
  "ev.juventudes.title": "Festival de las Juventudes",
  "ev.juventudes.desc": "Festival en El Mozote, Morazán, que promueve la participación juvenil y la memoria histórica.",
  "ev.primicia.title": "Primicia de la Cosecha",
  "ev.primicia.desc": "Tradición de ofrecer los primeros frutos de la cosecha en La Unión, con ceremonias y música.",
  "ev.semanaSanta.title": "Semana Santa Nacional",
  "ev.semanaSanta.desc": "Celebración de la Semana Santa en todo El Salvador, con procesiones y representaciones de la Pasión.",
  "ev.independencia.title": "Día de la Independencia",
  "ev.independencia.desc": "Fiestas patrias con desfiles cívicos, actos culturales y presentaciones artísticas el 15 de septiembre.",
  "ev.floresPalmas.title": "Festival de las Flores y Palmas",
  "ev.floresPalmas.desc": "Celebración en La Libertad donde se elaboran alfombras de flores y palmas para procesiones religiosas."
};

function t(clave, textoPorDefecto = "") {
  const idiomaActual = (window.SRi18n && typeof window.SRi18n.getLang === 'function')
    ? window.SRi18n.getLang()
    : "es";

  if (window.SRi18n && typeof window.SRi18n.t === 'function') {
    const traducido = window.SRi18n.t(clave, idiomaActual);
    if (traducido && traducido !== clave) return traducido;
  }

  if (DICCIONARIO_FALLBACK[clave]) return DICCIONARIO_FALLBACK[clave];

  if (clave && clave.startsWith("ev.")) {
    const partes = clave.split(".");
    if (partes.length >= 2) {
      return partes[1].charAt(0).toUpperCase() + partes[1].slice(1);
    }
  }

  return textoPorDefecto || clave;
}

// ============================================================
// TABLA DE RELACIÓN: EVENTO DEL CALENDARIO → LANDMARK REAL
// ============================================================
const TRADUCTOR_A_LANDMARK = {
  3: 46, 5: 31, 8: 23, 10: 21, 12: 28, 13: 47, 16: 59, 17: 48, 22: 22,
  24: 48, 25: 28, 26: 34, 28: 59, 29: 41, 30: 49, 31: 27, 32: 26,
  34: 50, 35: 35, 36: 60, 39: 4, 40: 33, 41: 40, 42: 38, 43: 43,
  44: 45, 45: 57, 46: 58, 47: 25,
  100: 60, 101: 60  // Navidad y Posadas (ambos apuntan al mismo landmark)
};

// ============================================================
// LISTA DE EVENTOS (ANUALES) - CON FECHAS CORREGIDAS
// ============================================================
const EVENTOS_CALENDARIO_ORIGINAL = [
  // Feria de la Panela - 15 de febrero
  { id: 3, keyNombre: "ev.panela.title", keyDesc: "ev.panela.desc", dia: 15, mes: 2, depto: "San Vicente", tipo: "Feria Gastronómica", lat: 13.6167, lng: -88.85 },
  // Día de la Cruz - 3 de mayo (corregido: 5)
  { id: 5, keyNombre: "ev.cruz.title", keyDesc: "ev.cruz.desc", dia: 3, mes: 5, depto: "Todos", tipo: "Celebración Religiosa", lat: 13.6929, lng: -89.2182 },
  // Fiestas Julias - 26 de julio (corregido: 7)
  { id: 8, keyNombre: "ev.julias.title", keyDesc: "ev.julias.desc", dia: 26, mes: 7, depto: "Santa Ana", tipo: "Fiesta Patronal", lat: 13.9942, lng: -89.5597 },
  // Fiestas Agostinas - 5 de agosto (corregido: 8)
  { id: 10, keyNombre: "ev.agostinas.title", keyDesc: "ev.agostinas.desc", dia: 5, mes: 8, depto: "San Salvador", tipo: "Fiesta Patronal", lat: 13.6984, lng: -89.1915 },
  // Feria del Jocote Corona - 15 de septiembre
  { id: 12, keyNombre: "ev.jocote.title", keyDesc: "ev.jocote.desc", dia: 15, mes: 9, depto: "Santa Ana", tipo: "Feria Gastronómica", lat: 13.8494, lng: -89.6314 },
  // Fiesta de la Calabaza - 1 de octubre
  { id: 13, keyNombre: "ev.calabaza.title", keyDesc: "ev.calabaza.desc", dia: 1, mes: 10, depto: "Cuscatlán", tipo: "Tradición Popular", lat: 13.7167, lng: -88.9333 },
  // Día de los Difuntos - 2 de noviembre (corregido: 11)
  { id: 16, keyNombre: "ev.difuntos.title", keyDesc: "ev.difuntos.desc", dia: 2, mes: 11, depto: "Todos", tipo: "Conmemoración", lat: 13.6929, lng: -89.2182 },
  // Festival del Añil - 4 de octubre
  { id: 17, keyNombre: "ev.anil.title", keyDesc: "ev.anil.desc", dia: 4, mes: 10, depto: "Cuscatlán", tipo: "Festival Cultural", lat: 14.0311, lng: -89.0281 },
  // Día de los Farolitos - 7 de septiembre (corregido: 9)
  { id: 22, keyNombre: "ev.farolitos.title", keyDesc: "ev.farolitos.desc", dia: 7, mes: 9, depto: "Ahuachapán", tipo: "Celebración Tradicional", lat: 13.9214, lng: -89.845 },
  // Danza de los Encuentros - 24 de septiembre
  { id: 26, keyNombre: "ev.encuentros.title", keyDesc: "ev.encuentros.desc", dia: 24, mes: 9, depto: "Sonsonate", tipo: "Danza Ancestral", lat: 13.7186, lng: -89.7244 },
  // Festival del Barro - 8 de octubre
  { id: 29, keyNombre: "ev.barro.title", keyDesc: "ev.barro.desc", dia: 8, mes: 10, depto: "Cabañas", tipo: "Festival Cultural", lat: 13.8422, lng: -88.8508 },
  // Fiestas Patronales de Gotera - 15 de octubre
  { id: 30, keyNombre: "ev.gotera.title", keyDesc: "ev.gotera.desc", dia: 15, mes: 10, depto: "Morazán", tipo: "Fiesta Patronal", lat: 13.7, lng: -88.1 },
  // Fiesta de San Miguel Arcángel - 24 de octubre
  { id: 31, keyNombre: "ev.cuisnahuat.title", keyDesc: "ev.cuisnahuat.desc", dia: 24, mes: 10, depto: "Sonsonate", tipo: "Celebración Religiosa", lat: 13.6167, lng: -89.6667 },
  // Gran Carnaval de San Miguel - 28 de octubre
  { id: 32, keyNombre: "ev.carnaval_2026.title", keyDesc: "ev.carnaval_2026.desc", dia: 28, mes: 10, depto: "San Miguel", tipo: "Festividad Nacional", lat: 13.4833, lng: -88.1833 },
  // Festival del Chicharrón - 12 de noviembre
  { id: 34, keyNombre: "ev.chicharron.title", keyDesc: "ev.chicharron.desc", dia: 12, mes: 11, depto: "La Libertad", tipo: "Feria Municipal", lat: 13.6769, lng: -89.2797 },
  // Fiestas Patronales de La Unión - 12 de noviembre
  { id: 35, keyNombre: "ev.launion.title", keyDesc: "ev.launion.desc", dia: 12, mes: 11, depto: "La Unión", tipo: "Fiesta Patronal", lat: 13.3369, lng: -87.8442 },
  // Navidad - 24 de diciembre
  { id: 36, keyNombre: "ev.navidad.title", keyDesc: "ev.navidad.desc", dia: 24, mes: 12, depto: "San Salvador", tipo: "Celebración Religiosa", lat: 13.6929, lng: -89.2182 },
  // Posadas - 16 de noviembre (corregido: 11)
  { id: 101, keyNombre: "ev.posadas.title", keyDesc: "ev.posadas.desc", dia: 16, mes: 11, depto: "San Salvador", tipo: "Celebración Religiosa", lat: 13.6929, lng: -89.2182 },
  // Festival de Suchitoto - 15 de enero
  { id: 39, keyNombre: "ev.suchitotoFestival.title", keyDesc: "ev.suchitotoFestival.desc", dia: 15, mes: 1, depto: "Cuscatlán", tipo: "Festival Cultural", lat: 14.0311, lng: -89.0281 },
  // Tradición del Bálsamo - 15 de septiembre
  { id: 40, keyNombre: "ev.balsam.title", keyDesc: "ev.balsam.desc", dia: 15, mes: 9, depto: "La Libertad", tipo: "Tradición Popular", lat: 13.6738, lng: -89.4420 },
  // Romería de Esquipulas - 15 de enero (corregido: 1)
  { id: 41, keyNombre: "ev.esquipulas.title", keyDesc: "ev.esquipulas.desc", dia: 15, mes: 1, depto: "Chalatenango", tipo: "Celebración Religiosa", lat: 14.1167, lng: -88.9333 },
  // Fiestas del Rey Guajactial - 15 de agosto
  { id: 42, keyNombre: "ev.guajactial.title", keyDesc: "ev.guajactial.desc", dia: 15, mes: 8, depto: "Sonsonate", tipo: "Fiesta Patronal", lat: 13.7512, lng: -89.6678 },
  // Festival de las Juventudes - 15 de junio
  { id: 43, keyNombre: "ev.juventudes.title", keyDesc: "ev.juventudes.desc", dia: 15, mes: 6, depto: "Morazán", tipo: "Festival Cultural", lat: 13.7833, lng: -88.15 },
  // Primicia de la Cosecha - 15 de julio
  { id: 44, keyNombre: "ev.primicia.title", keyDesc: "ev.primicia.desc", dia: 15, mes: 7, depto: "La Unión", tipo: "Tradición Popular", lat: 13.3, lng: -87.85 },
  // Semana Santa Nacional - 3 de abril (corregido: 4)
  { id: 45, keyNombre: "ev.semanaSanta.title", keyDesc: "ev.semanaSanta.desc", dia: 3, mes: 4, depto: "Todos", tipo: "Celebración Religiosa", lat: 13.6980, lng: -89.1901 },
  // Día de la Independencia - 15 de septiembre (corregido: 9)
  { id: 46, keyNombre: "ev.independencia.title", keyDesc: "ev.independencia.desc", dia: 15, mes: 9, depto: "Todos", tipo: "Festividad Nacional", lat: 13.7005, lng: -89.1898 },
  // Festival de las Flores y Palmas - 10 de abril
  { id: 47, keyNombre: "ev.floresPalmas.title", keyDesc: "ev.floresPalmas.desc", dia: 10, mes: 4, depto: "La Libertad", tipo: "Celebración Tradicional", lat: 13.6769, lng: -89.2797 }
];

// FILTRAR EVENTOS: solo aquellos que tienen mapeo en TRADUCTOR_A_LANDMARK
const EVENTOS_CALENDARIO = EVENTOS_CALENDARIO_ORIGINAL
  .filter(e => TRADUCTOR_A_LANDMARK.hasOwnProperty(e.id))
  .map(e => ({
    ...e,
    landmarkId: TRADUCTOR_A_LANDMARK[e.id]
  }));

// ============================================================
// INICIALIZACIÓN
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
  calendarState.festividades = EVENTOS_CALENDARIO.map(e => ({ ...e }));

  initCalendar();
  setupCalendarEvents();
  initCatalogAndFilters();
  setupModalEvents();

  abrirEventoDesdeURL();

  document.addEventListener("langchange", () => {
    setTimeout(() => {
      initCalendar();
      if (typeof renderCatalogo === "function") {
        renderCatalogo(listaEventosFiltrados);
      }
    }, 150);
  });
});

// ============================================================
// CALENDARIO
// ============================================================
function initCalendar() {
  renderYearTitle();
  renderMonthPills();
  renderCalendarGrid();
  renderTodayEvent();
}

function setupCalendarEvents() {
  const prevYearBtn = document.getElementById("prevYear");
  const nextYearBtn = document.getElementById("nextYear");

  if (prevYearBtn) {
    prevYearBtn.addEventListener("click", () => {
      calendarState.currentYear--;
      triggerGridAnimation();
      renderYearTitle();
      renderCalendarGrid();
    });
  }

  if (nextYearBtn) {
    nextYearBtn.addEventListener("click", () => {
      calendarState.currentYear++;
      triggerGridAnimation();
      renderYearTitle();
      renderCalendarGrid();
    });
  }
}

function renderYearTitle() {
  const yearTitle = document.getElementById("calYearTitle");
  if (yearTitle) {
    yearTitle.textContent = `${calendarState.currentYear}`;
  }
}

function renderMonthPills() {
  const pillsContainer = document.getElementById("monthPills");
  if (!pillsContainer) return;
  pillsContainer.innerHTML = "";

  CLAVES_MESES.forEach((clave, index) => {
    const pill = document.createElement("button");
    pill.classList.add("month-pill");
    pill.textContent = t(clave, nombresMeses[index]);
    pill.setAttribute("data-i18n", clave);

    const tieneEventos = calendarState.festividades.some(f => f.mes === (index + 1));
    if (tieneEventos) pill.classList.add("has-events");

    if (index === calendarState.currentMonth) pill.classList.add("active");

    pill.addEventListener("click", () => {
      document.querySelectorAll(".month-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      calendarState.currentMonth = index;
      triggerGridAnimation();
      renderYearTitle();
      renderCalendarGrid();
    });

    pillsContainer.appendChild(pill);
  });
}

function renderCalendarGrid() {
  const calGrid = document.getElementById("calGrid");
  if (!calGrid) return;
  calGrid.innerHTML = "";

  const año = calendarState.currentYear;
  const mes = calendarState.currentMonth;

  let primerDiaIndex = new Date(año, mes, 1).getDay();
  primerDiaIndex = primerDiaIndex === 0 ? 6 : primerDiaIndex - 1;

  const totalDiasMes = new Date(año, mes + 1, 0).getDate();
  const totalDiasMesAnterior = new Date(año, mes, 0).getDate();

  for (let i = primerDiaIndex - 1; i >= 0; i--) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("cal-day", "other-month");
    dayDiv.innerHTML = `<span class="day-num">${totalDiasMesAnterior - i}</span>`;
    calGrid.appendChild(dayDiv);
  }

  for (let dia = 1; dia <= totalDiasMes; dia++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("cal-day");

    const hoy = new Date();
    if (hoy.getDate() === dia && hoy.getMonth() === mes && hoy.getFullYear() === año) {
      dayDiv.classList.add("today");
    }

    let htmlContent = `<span class="day-num">${dia}</span>`;

    const eventosDia = calendarState.festividades.filter(f =>
      f.dia === dia &&
      f.mes === (mes + 1) &&
      (f.anio === undefined || f.anio === null || f.anio === año)
    );

    if (eventosDia.length > 0) {
      dayDiv.classList.add("has-event");
      htmlContent += `<div class="day-dots">`;
      eventosDia.forEach(() => { htmlContent += `<span class="day-dot"></span>`; });
      htmlContent += `</div>`;

      const nombreTraducido = t(eventosDia[0].keyNombre, "Evento");
      htmlContent += `<p class="day-label">${nombreTraducido}${eventosDia.length > 1 ? ' +' + (eventosDia.length - 1) : ''}</p>`;

      dayDiv.addEventListener("click", () => {
        document.querySelectorAll(".cal-day").forEach(d => d.classList.remove("selected"));
        dayDiv.classList.add("selected");
        if (eventosDia.length === 1) {
          if (typeof window.abrirDetallesEvento === "function") {
            window.abrirDetallesEvento(eventosDia[0]);
          }
        } else {
          mostrarSelectorEventos(eventosDia);
        }
      });
    }

    dayDiv.innerHTML = htmlContent;
    calGrid.appendChild(dayDiv);
  }

  const celdasTotales = calGrid.children.length;
  const celdasRestantes = celdasTotales % 7 === 0 ? 0 : 7 - (celdasTotales % 7);
  for (let i = 1; i <= celdasRestantes; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("cal-day", "other-month");
    dayDiv.innerHTML = `<span class="day-num">${i}</span>`;
    calGrid.appendChild(dayDiv);
  }
}

// ── Selector de eventos (modal) ──
function mostrarSelectorEventos(eventos) {
  const modalOverlay = document.getElementById("modalOverlay");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  if (!modalOverlay || !modalTitle || !modalBody) return;

  const titulo = t("Selecciona un evento", "Selecciona un evento");
  modalTitle.textContent = titulo;

  let html = `<ul class="event-selector-list">`;
  eventos.forEach(evento => {
    const nombre = t(evento.keyNombre, "Evento");
    html += `
      <li class="event-selector-item" data-event-id="${evento.id}">
        <span class="event-selector-emoji">📅</span>
        <span class="event-selector-name">${nombre}</span>
        <span class="event-selector-arrow">→</span>
      </li>
    `;
  });
  html += `</ul>`;

  modalBody.innerHTML = html;

  const styleId = 'event-selector-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .event-selector-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .event-selector-item {
        display: flex;
        align-items: center;
        gap: 0.8rem;
        padding: 0.8rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: background 0.2s ease;
        border-bottom: 1px solid rgba(255,255,255,0.05);
      }
      .event-selector-item:hover {
        background: rgba(255,255,255,0.05);
      }
      .event-selector-item:last-child {
        border-bottom: none;
      }
      .event-selector-emoji {
        font-size: 1.3rem;
        width: 2rem;
        text-align: center;
      }
      .event-selector-name {
        flex: 1;
        font-weight: 500;
      }
      .event-selector-arrow {
        color: #be8e56;
        font-size: 1.2rem;
      }
    `;
    document.head.appendChild(style);
  }

  modalBody.querySelectorAll('.event-selector-item').forEach(item => {
    item.addEventListener('click', function() {
      const id = parseInt(this.dataset.eventId);
      const evento = eventos.find(e => e.id === id);
      if (evento && typeof window.abrirDetallesEvento === 'function') {
        modalOverlay.classList.remove('open');
        setTimeout(() => {
          window.abrirDetallesEvento(evento);
        }, 200);
      }
    });
  });

  modalOverlay.classList.add('open');
}

function triggerGridAnimation() {
  const calGrid = document.getElementById("calGrid");
  if (calGrid) {
    calGrid.classList.remove("fade-transition");
    void calGrid.offsetWidth;
    calGrid.classList.add("fade-transition");
  }
}

function renderTodayEvent() {
  const panel = document.getElementById("todayEventPanel");
  const titleEl = document.getElementById("todayEventTitle");
  if (!panel || !titleEl) return;

  const hoy = new Date();
  const eventosHoy = calendarState.festividades.filter(
    f => f.dia === hoy.getDate() && f.mes === (hoy.getMonth() + 1)
  );

  panel.classList.remove("has-event", "no-event");

  if (eventosHoy.length > 0) {
    panel.classList.add("has-event");
    const primerNombre = t(eventosHoy[0].keyNombre, "Evento");
    titleEl.textContent = eventosHoy.length === 1 ? primerNombre : `${primerNombre} y ${eventosHoy.length - 1} más`;
    panel.style.cursor = "pointer";
    panel.onclick = () => {
      if (eventosHoy.length === 1) {
        if (typeof window.abrirDetallesEvento === "function") window.abrirDetallesEvento(eventosHoy[0]);
      } else {
        mostrarSelectorEventos(eventosHoy);
      }
    };
  } else {
    panel.classList.add("no-event");
    titleEl.textContent = t("cal.noEventsToday", "No hay ningún evento cultural para este día");
    panel.style.cursor = "default";
    panel.onclick = null;
  }
}

// ============================================================
// CATÁLOGO
// ============================================================
let listaEventosFiltrados = [];
let currentLimit = 6; 
let eventoActivoModalId = null; 

document.addEventListener("DOMContentLoaded", () => {
  // Retrasamos levemente el render inicial para dar tiempo a la carga del DOM de traducción
  setTimeout(() => {
    initCatalogAndFilters();
    setupModalEvents();
    restaurarEstadoCalendario();
    abrirEventoDesdeURL();
  }, 100);

  // Escucha el evento global i18n
  document.addEventListener("langchange", () => {
    setTimeout(() => { 
      if (typeof renderCatalogo === "function") {
        renderCatalogo(listaEventosFiltrados);
      }
    }, 100);
  });
});

function abrirEventoDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get("id");
  if (!idParam) return;

  const evento = calendarState.festividades.find(f => f.id === Number(idParam));
  if (!evento) return;

  // Navega el calendario visual al mes/año del evento y re-renderiza la grilla
  calendarState.currentMonth = evento.mes - 1;
  calendarState.currentYear = evento.anio || calendarState.currentYear;
  if (typeof renderYearTitle === "function") renderYearTitle();
  if (typeof renderMonthPills === "function") renderMonthPills();
  if (typeof renderCalendarGrid === "function") renderCalendarGrid();

  // Resalta el día del evento en la grilla recién renderizada
  const calGrid = document.getElementById("calGrid");
  if (calGrid) {
    const diasCelda = Array.from(calGrid.querySelectorAll(".cal-day:not(.other-month)"));
    const celdaEvento = diasCelda.find(d => {
      const numEl = d.querySelector(".day-num");
      return numEl && Number(numEl.textContent) === evento.dia;
    });
    if (celdaEvento) {
      document.querySelectorAll(".cal-day").forEach(d => d.classList.remove("selected"));
      celdaEvento.classList.add("selected");
      celdaEvento.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  if (typeof window.abrirDetallesEvento === "function") {
    window.abrirDetallesEvento(evento);
  }
}

function initCatalogAndFilters() {
  const gridViewBtn = document.getElementById("gridViewBtn");
  const listViewBtn = document.getElementById("listViewBtn");
  const catalogGrid = document.getElementById("catalogGrid");
  const applyFilter = document.getElementById("applyFilter");
  const clearFilter = document.getElementById("clearFilter");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  if (loadMoreBtn) loadMoreBtn.style.display = "block";

  if (gridViewBtn && listViewBtn && catalogGrid) {
    gridViewBtn.addEventListener("click", () => {
      gridViewBtn.classList.add("active");
      listViewBtn.classList.remove("active");
      catalogGrid.classList.remove("list-view");
      triggerCatalogAnimation();
    });

    listViewBtn.addEventListener("click", () => {
      listViewBtn.classList.add("active");
      gridViewBtn.classList.remove("active");
      catalogGrid.classList.add("list-view");
      triggerCatalogAnimation();
    });
  }

  if (applyFilter) {
    applyFilter.addEventListener("click", () => {
      currentLimit = 6;
      if (loadMoreBtn) loadMoreBtn.textContent = "Mostrar más celebraciones";
      filtrarFestividades();
    });
  }

  if (clearFilter) {
    clearFilter.addEventListener("click", () => {
      document.getElementById("f-dept").value = "";
      document.getElementById("f-month").value = "";
      document.getElementById("f-type").value = "";
      document.getElementById("f-search").value = "";
      currentLimit = 6;
      if (loadMoreBtn) loadMoreBtn.textContent = "Mostrar más celebraciones";
      filtrarFestividades();
    });
  }

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      const tarjetas = document.querySelectorAll(".fest-card");

      if (currentLimit === 6) {
        currentLimit = 999;
        loadMoreBtn.textContent = "Mostrar menos";
        renderCatalogo(listaEventosFiltrados);
      } else {
        tarjetas.forEach((tarjeta, index) => {
          if (index >= 6) {
            tarjeta.style.transition = "all 0.3s ease";
            tarjeta.style.opacity = "0";
            tarjeta.style.transform = "translateY(10px)";
          }
        });

        setTimeout(() => {
          currentLimit = 6;
          loadMoreBtn.textContent = "Mostrar más celebraciones";
          renderCatalogo(listaEventosFiltrados);
          document.getElementById("resultsCount")?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    });
  }

  listaEventosFiltrados = [...calendarState.festividades];
  renderCatalogo(listaEventosFiltrados);

  const searchInput = document.getElementById("f-search");
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      clearTimeout(searchInput._timer);
      searchInput._timer = setTimeout(() => {
        currentLimit = 6;
        const loadMoreBtn = document.getElementById("loadMoreBtn");
        if (loadMoreBtn) loadMoreBtn.textContent = "Mostrar más celebraciones";
        filtrarFestividades();
      }, 300);
    });
  }
}

function renderCatalogo(eventos) {
  const catalogGrid = document.getElementById("catalogGrid");
  const resultsCount = document.getElementById("resultsCount");
  const loadMoreContainer = document.getElementById("loadMoreContainer");

  if (!catalogGrid) return;
  catalogGrid.innerHTML = "";

  if (resultsCount) {
    resultsCount.innerHTML = `<strong>${eventos.length}</strong> ${t("cal.catalog.foundText", "festividades encontradas")}`;
  }

  if (eventos.length === 0) {
    catalogGrid.innerHTML = `<div class="empty-state"><p>No se encontraron celebraciones.</p></div>`;
    if (loadMoreContainer) loadMoreContainer.style.display = "none";
    return;
  }

  const eventosVisibles = eventos.slice(0, currentLimit);

  eventosVisibles.forEach((evento, index) => {
    const card = document.createElement("div");
    card.classList.add("fest-card");
    if (index >= 6) card.style.animationDelay = `${(index - 6) * 0.02}s`;
    card.dataset.eventId = evento.id;

    const nombreTraducido = t(evento.keyNombre, "Festividad");
    const descTraducida = t(evento.keyDesc, "Sin descripción.");
    const mesTraducido = t(CLAVES_MESES[evento.mes - 1], nombresMeses[evento.mes - 1]);

    const tipoTraducido = t(evento.tipo, evento.tipo);
    const conectorDe = t("cal.modal.of", "de");
    const deptoTraducido = evento.depto === "Todos" ? t("Todos", "Todos") : evento.depto;
    const anioMostrar = evento.anio || calendarState.currentYear;

    const landmarkId = evento.landmarkId;
    const urlMapa = landmarkId ? `mapa.html?evento=${landmarkId}&from=calendario.html` : '#';

    card.innerHTML = `
      <div class="fest-card-banner"></div>
      <div class="fest-card-body">
        <div class="fest-card-meta">
          <span class="badge badge-dept" style="text-transform: uppercase;">${deptoTraducido}</span>
          <span class="badge badge-type">${tipoTraducido}</span>
        </div>
        <h3>${nombreTraducido}</h3>
        <p>${descTraducida}</p>
        <p class="fest-date"><strong>${t("cal.modal.date", "Fecha")}:</strong> ${evento.dia} ${conectorDe} ${mesTraducido} ${conectorDe} ${anioMostrar}</p>
      </div>
      <div class="fest-card-footer">
        <span class="fest-location">${deptoTraducido}, El Salvador</span>
        <a href="${urlMapa}" class="map-link">${t("Ver en mapa", "Ver en mapa")}</a>
      </div>
    `;

    card.querySelector(".fest-card-body").addEventListener("click", () => {
      window.abrirDetallesEvento(evento);
    });

    catalogGrid.appendChild(card);
  });

  if (loadMoreContainer) {
    loadMoreContainer.style.display = eventos.length > 6 ? "block" : "none";
  }
}

function filtrarFestividades() {
  const deptVal = document.getElementById("f-dept").value;
  const monthVal = document.getElementById("f-month").value;
  const typeVal = document.getElementById("f-type").value;
  const searchVal = document.getElementById("f-search").value.toLowerCase().trim();
  const origen = calendarState.festividades.length > 0 ? calendarState.festividades : EVENTOS_CALENDARIO;

  listaEventosFiltrados = origen.filter(evento => {
    const matchDept = deptVal === "" || evento.depto === deptVal;
    const matchMonth = monthVal === "" || evento.mes.toString() === monthVal;
    const matchType = typeVal === "" || evento.tipo === typeVal;

    let nombreTraducido = t(evento.keyNombre, "").toLowerCase();
    let descTraducida = t(evento.keyDesc, "").toLowerCase();

    if (nombreTraducido === evento.keyNombre.toLowerCase()) {
      const partes = evento.keyNombre.split('.');
      if (partes.length > 1) {
        nombreTraducido = partes[partes.length - 1].replace('title', '').replace(/[^a-z0-9]/g, ' ').trim().toLowerCase();
      } else {
        nombreTraducido = evento.keyNombre.toLowerCase();
      }
    }
    if (descTraducida === evento.keyDesc.toLowerCase()) {
      descTraducida = '';
    }

    const matchSearch = searchVal === "" || nombreTraducido.includes(searchVal) || descTraducida.includes(searchVal);

    return matchDept && matchMonth && matchType && matchSearch;
  });

  triggerCatalogAnimation();
  renderCatalogo(listaEventosFiltrados);
}

function triggerCatalogAnimation() {
  const catalogGrid = document.getElementById("catalogGrid");
  if (catalogGrid) {
    catalogGrid.classList.remove("fade-transition");
    void catalogGrid.offsetWidth;
    catalogGrid.classList.add("fade-transition");
  }
}

// ============================================================
// MODAL (detalle de evento)
// ============================================================
function setupModalEvents() {
  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");

  if (modalClose && modalOverlay) {
    modalClose.addEventListener("click", () => modalOverlay.classList.remove("open"));
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove("open");
    });
  }

  window.abrirDetallesEvento = (evento) => {
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    if (!modalOverlay || !modalTitle || !modalBody) return;

    const nombreTraducido = t(evento.keyNombre, "Festividad");
    const descTraducida = t(evento.keyDesc, "Sin descripción.");
    const mesTraducido = t(CLAVES_MESES[evento.mes - 1], nombresMeses[evento.mes - 1]);

    const deptoTraducido = evento.depto === "Todos" ? t("Todos", "Todos") : evento.depto;
    const tipoTraducido = t(evento.tipo, evento.tipo);
    const anioMostrar = evento.anio || calendarState.currentYear;
    const conectorDe = t("cal.modal.of", "de");

    const landmarkId = evento.landmarkId;
    const urlMapa = landmarkId ? `mapa.html?evento=${landmarkId}&from=calendario.html` : '#';

    modalTitle.textContent = nombreTraducido;

    modalBody.innerHTML = `
      <div class="modal-row">
        <div>
          <p class="lbl">${t("cal.modal.location", "Ubicación")}</p>
          <p class="val">${deptoTraducido}, El Salvador</p>
        </div>
      </div>
      <div class="modal-row">
        <div>
          <p class="lbl">${t("cal.modal.eventType", "Tipo de Evento")}</p>
          <p class="val">${tipoTraducido}</p>
        </div>
      </div>
      <div class="modal-row">
        <div>
          <p class="lbl">${t("cal.modal.dateCelebration", "Fecha de Celebración")}</p>
          <p class="val">${evento.dia} ${conectorDe} ${mesTraducido} ${conectorDe} ${anioMostrar}</p>
        </div>
      </div>
      <div class="modal-row">
        <div>
          <p class="lbl">${t("cal.modal.description", "Descripción")}</p>
          <p class="val">${descTraducida}</p>
        </div>
      </div>
      <a href="${urlMapa}" class="modal-map-btn">
        ${t("cal.modal.exploreMap", "Explorar en Mapa Interactivo")}
      </a>
    `;

    eventoActivoModalId = evento.id;
    modalOverlay.classList.add("open");
  };
}

// ============================================================
// URL (abrir evento desde parámetro ?id=)
// ============================================================
function abrirEventoDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get("id");
  if (!idParam) return;

  const evento = calendarState.festividades.find(f => f.id === Number(idParam));
  if (!evento) return;

  if (evento.landmarkId) {
    window.location.href = `mapa.html?evento=${evento.landmarkId}&from=calendario.html`;
    return;
  }

  calendarState.currentMonth = evento.mes - 1;
  if (evento.anio) {
    calendarState.currentYear = evento.anio;
  }

  if (typeof renderYearTitle === "function") renderYearTitle();
  if (typeof renderMonthPills === "function") renderMonthPills();
  if (typeof renderCalendarGrid === "function") renderCalendarGrid();

  const calGrid = document.getElementById("calGrid");
  if (calGrid) {
    const diasCelda = Array.from(calGrid.querySelectorAll(".cal-day:not(.other-month)"));
    const celdaEvento = diasCelda.find(d => {
      const numEl = d.querySelector(".day-num");
      return numEl && Number(numEl.textContent) === evento.dia;
    });
    if (celdaEvento) {
      document.querySelectorAll(".cal-day").forEach(d => d.classList.remove("selected"));
      celdaEvento.classList.add("selected");
      celdaEvento.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  if (typeof window.abrirDetallesEvento === "function") {
    window.abrirDetallesEvento(evento);
  }
}

// Exponer funciones globales
window.initCalendar = initCalendar;
window.renderCatalogo = renderCatalogo;
window.filtrarFestividades = filtrarFestividades;