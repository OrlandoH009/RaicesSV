const hoyInicial = new Date();
const calendarState = {
  currentYear: hoyInicial.getFullYear(),
  currentMonth: hoyInicial.getMonth(), // 0 = Enero, 11 = Diciembre
  selectedDay: null,
  festividades: [] 
};

// Claves de traducción para los meses
const CLAVES_MESES = [
  "cal.months.ene", "cal.months.feb", "cal.months.mar", "cal.months.abr",
  "cal.months.may", "cal.months.jun", "cal.months.jul", "cal.months.ago",
  "cal.months.sep", "cal.months.oct", "cal.months.nov", "cal.months.dic"
];

// Nombres por defecto en español (Fallback)
const nombresMeses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Diccionario local de emergencia para evitar textos crudos como 'ev.panela.title'
const DICCIONARIO_FALLBACK = {
  "ev.panela.title": "Feria de la Panela",
  "ev.panela.desc": "Disfruta de la producción artesanal de dulce de panela, derivados de la caña de azúcar y gastronomía local típica salvadoreña.",
  "ev.cruz.title": "Día de la Cruz",
  "ev.cruz.desc": "Tradición religiosa y cultural donde se coloca una cruz de palo de jiote en los patios y se adorna con frutas de temporada.",
  "ev.julias.title": "Fiestas Julias",
  "ev.julias.desc": "Celebración patronal de Santa Ana con desfiles, ferias mecánicas y actividades religiosas en honor a Señora Santa Ana.",
  "ev.maiz.title": "Feria del Maíz",
  "ev.maiz.desc": "Festival gastronómico rindiendo tributo al maíz con variedad de platillos: tamales, rigoas, atol, elotes locos y más.",
  "ev.agostinas.title": "Fiestas Agostinas",
  "ev.agostinas.desc": "Fiestas patronales de San Salvador en honor al Divino Salvador del Mundo, con el tradicional desfile de Correos y Comercio.",
  "ev.jocote.title": "Feria del Jocote Corona",
  "ev.jocote.desc": "Celebración de la cosecha del jocote corona en el Cerro Verde con derivados gastronómicos culinarios innovadores."
};

// 1. FUNCIÓN AUXILIAR DE TRADUCCIÓN NATIVA E INTERNA CORREGIDA
function t(clave, textoPorDefecto = "") {
  // 1. Intentar obtener el idioma activo a través de SRi18n
  const idiomaActual = (window.SRi18n && typeof window.SRi18n.getLang === 'function') 
    ? window.SRi18n.getLang() 
    : "es"; 

  // 2. Si existe la función central corregida, la usamos pasándole los datos en orden correcto
  if (window.SRi18n && typeof window.SRi18n.t === 'function') {
    const traducido = window.SRi18n.t(clave, idiomaActual);
    
    // Si la traducción fue exitosa y no retornó la misma clave literal
    if (traducido && traducido !== clave) {
      return traducido;
    }
  }

  // 3. Fallback manual al diccionario de emergencia local plano
  if (typeof DICCIONARIO_FALLBACK !== 'undefined' && DICCIONARIO_FALLBACK[clave]) {
    return DICCIONARIO_FALLBACK[clave];
  }

  // 4. Limpieza estética de emergencia (ej: ev.panela.title -> Panela)
  if (clave && clave.startsWith("ev.")) {
    const partes = clave.split(".");
    if (partes.length >= 2) {
      return partes[1].charAt(0).toUpperCase() + partes[1].slice(1);
    }
  }

  return textoPorDefecto || clave;
}

// 2. BASE DE DATOS DE FESTIVIDADES ACTUALIZADA
// Nota: Se han cambiado los meses al índice base 0 estándar de JavaScript para evitar desfases (+1 / -1)
const EVENTOS_CALENDARIO = [
  { id: 3, keyNombre: "ev.panela.title", keyDesc: "ev.panela.desc", dia: 15, mes: 2, depto: "San Vicente", tipo: "Feria Gastronómica", lat: 13.6167, lng: -88.85 },
  { id: 5, keyNombre: "ev.cruz.title", keyDesc: "ev.cruz.desc", dia: 3, mes: 4, depto: "Todos", tipo: "Celebración Religiosa", lat: 13.6929, lng: -89.2182 },
  { id: 8, keyNombre: "ev.julias.title", keyDesc: "ev.julias.desc", dia: 26, mes: 6, depto: "Santa Ana", tipo: "Fiesta Patronal", lat: 13.9942, lng: -89.5597 },
  { id: 9, keyNombre: "ev.maiz.title", keyDesc: "ev.maiz.desc", dia: 1, mes: 7, depto: "La Libertad", tipo: "Feria Gastronómica", lat: 13.8167, lng: -89.55 },
  { id: 10, keyNombre: "ev.agostinas.title", keyDesc: "ev.agostinas.desc", dia: 5, mes: 7, depto: "San Salvador", tipo: "Fiesta Patronal", lat: 13.6984, lng: -89.1915 },
  { id: 12, keyNombre: "ev.jocote.title", keyDesc: "ev.jocote.desc", dia: 15, mes: 9, depto: "Santa Ana", tipo: "Feria Gastronómica", lat: 13.8494, lng: -89.6314 },
  { id: 13, keyNombre: "ev.calabaza.title", keyDesc: "ev.calabaza.desc", dia: 1, mes: 10, depto: "Cuscatlán", tipo: "Tradición Popular", lat: 13.7167, lng: -88.9333 },
  { id: 14, keyNombre: "ev.canchules.title", keyDesc: "ev.canchules.desc", dia: 1, mes: 10, depto: "Ahuachapán", tipo: "Tradición Popular", lat: 13.7739, lng: -89.7256 },
  { id: 16, keyNombre: "ev.difuntos.title", keyDesc: "ev.difuntos.desc", dia: 2, mes: 10, depto: "Todos", tipo: "Conmemoración", lat: 13.6929, lng: -89.2182 },
  { id: 17, keyNombre: "ev.anil.title", keyDesc: "ev.anil.desc", dia: 4, mes: 10, depto: "Cuscatlán", tipo: "Festival Cultural", lat: 14.0311, lng: -89.0281 },
  { id: 18, keyNombre: "ev.carnaval.title", keyDesc: "ev.carnaval.desc", dia: 28, mes: 10, depto: "San Miguel", tipo: "Fiesta Patronal", lat: 13.4833, lng: -88.1833 },
  { id: 20, keyNombre: "ev.guadalupe.title", keyDesc: "ev.guadalupe.desc", dia: 12, mes: 11, depto: "San Salvador", tipo: "Celebración Religiosa", lat: 13.7008, lng: -89.2100 },
  { id: 21, keyNombre: "ev.canchules_nahu.title", keyDesc: "ev.canchules_nahu.desc", dia: 1, mes: 10, depto: "Sonsonate", tipo: "Tradición Popular", lat: 13.7739, lng: -89.7256 },
  { id: 22, keyNombre: "ev.farolitos.title", keyDesc: "ev.farolitos.desc", dia: 7, mes: 8, depto: "Ahuachapán", tipo: "Celebración Tradicional", lat: 13.9214, lng: -89.845 },
  { id: 23, keyNombre: "ev.calabiuza.title", keyDesc: "ev.calabiuza.desc", dia: 1, mes: 10, depto: "Cuscatlán", tipo: "Desfile Tradicional", lat: 13.7089, lng: -89.0958 },
  { id: 24, keyNombre: "ev.anil_oct.title", keyDesc: "ev.anil_oct.desc", dia: 4, mes: 9, depto: "Cuscatlán", tipo: "Festival Cultural", lat: 14.0311, lng: -89.0281 },
  { id: 25, keyNombre: "ev.jocote_2026.title", keyDesc: "ev.jocote_2026.desc", dia: 18, mes: 9, anio: 2026, depto: "Santa Ana", tipo: "Feria Municipal", lat: 13.8494, lng: -89.6314 },
  { id: 26, keyNombre: "ev.encuentros.title", keyDesc: "ev.encuentros.desc", dia: 24, mes: 9, anio: 2026, depto: "Sonsonate", tipo: "Danza Ancestral", lat: 13.7186, lng: -89.7244 },
  { id: 27, keyNombre: "ev.calabiuza_2026.title", keyDesc: "ev.calabiuza_2026.desc", dia: 1, mes: 10, anio: 2026, depto: "Cuscatlán", tipo: "Festival Cultural", lat: 13.7089, lng: -89.0958 },
  { id: 28, keyNombre: "ev.difuntos_2026.title", keyDesc: "ev.difuntos_2026.desc", dia: 1, mes: 10, anio: 2026, depto: "San Salvador", tipo: "Festival Cultural", lat: 13.6929, lng: -89.2182 },
  { id: 29, keyNombre: "ev.barro.title", keyDesc: "ev.barro.desc", dia: 8, mes: 10, anio: 2026, depto: "Cabañas", tipo: "Festival Cultural", lat: 13.8422, lng: -88.8508 },
  { id: 30, keyNombre: "ev.gotera.title", keyDesc: "ev.gotera.desc", dia: 15, mes: 10, anio: 2026, depto: "Morazán", tipo: "Fiesta Patronal", lat: 13.7, lng: -88.1 },
  { id: 31, keyNombre: "ev.cuisnahuat.title", keyDesc: "ev.cuisnahuat.desc", dia: 24, mes: 10, anio: 2026, depto: "Sonsonate", tipo: "Celebración Religiosa", lat: 13.6167, lng: -89.6667 },
  { id: 32, keyNombre: "ev.carnaval_2026.title", keyDesc: "ev.carnaval_2026.desc", dia: 28, mes: 10, anio: 2026, depto: "San Miguel", tipo: "Festividad Nacional", lat: 13.4833, lng: -88.1833 },
  { id: 33, keyNombre: "ev.canchules_cab.title", keyDesc: "ev.canchules_cab.desc", dia: 4, mes: 11, anio: 2026, depto: "Cabañas", tipo: "Tradición Oral", lat: 13.8422, lng: -88.8508 },
  { id: 34, keyNombre: "ev.chicharron.title", keyDesc: "ev.chicharron.desc", dia: 12, mes: 11, anio: 2026, depto: "La Libertad", tipo: "Feria Municipal", lat: 13.6769, lng: -89.2797 },
  { id: 35, keyNombre: "ev.launion.title", keyDesc: "ev.launion.desc", dia: 12, mes: 11, anio: 2026, depto: "La Unión", tipo: "Fiesta Patronal", lat: 13.3369, lng: -87.8442 },
  { id: 36, keyNombre: "ev.navidad.title", keyDesc: "ev.navidad.desc", dia: 16, mes: 11, anio: 2026, depto: "San Salvador", tipo: "Evento Cultural", lat: 13.6929, lng: -89.2182 },
  { id: 37, keyNombre: "ev.arroz.title", keyDesc: "ev.arroz.desc", dia: 19, mes: 11, anio: 2026, depto: "San Vicente", tipo: "Feria Municipal", lat: 13.6167, lng: -88.85 },
  { id: 38, keyNombre: "ev.svicente.title", keyDesc: "ev.svicente.desc", dia: 25, mes: 11, anio: 2026, depto: "San Vicente", tipo: "Fiesta Patronal", lat: 13.6411, lng: -88.7856 }
];

// 3. ESCUCHA ACTIVA DEL CAMBIO DE IDIOMA GLOBAL
document.addEventListener("DOMContentLoaded", () => {
  if (window.calendarState) {
    calendarState.festividades = EVENTOS_CALENDARIO.map(evento => ({
      ...evento,
      anio: evento.anio || calendarState.currentYear 
    }));
  }

  // Inicialización del Calendario
  if (typeof initCalendar === "function") initCalendar();
  if (typeof setupCalendarEvents === "function") setupCalendarEvents();

  // Re-renderizar dinámicamente todo el calendario cuando cambie el idioma
  document.addEventListener("langchange", () => {
    setTimeout(() => { 
      if (typeof initCalendar === "function") initCalendar(); 
      // Si estás en la vista de tarjetas/catálogo, también se actualiza
      if (typeof listaEventosFiltrados !== 'undefined' && typeof renderCatalogo === "function") {
        renderCatalogo(listaEventosFiltrados);
      }
    }, 150);
  });
});

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
    const mesTraducido = t(CLAVES_MESES[calendarState.currentMonth], nombresMeses[calendarState.currentMonth]);
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

    const tieneEventos = calendarState.festividades.some(f => f.mes === (index + 1) && f.anio === calendarState.currentYear);
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
    const eventosDia = calendarState.festividades.filter(f => f.dia === dia && f.mes === (mes + 1) && f.anio === año);

    if (eventosDia.length > 0) {
      dayDiv.classList.add("has-event");
      htmlContent += `<div class="day-dots">`;
      eventosDia.forEach(() => { htmlContent += `<span class="day-dot"></span>`; });
      htmlContent += `</div>`;
      
      const nombreTraducido = t(eventosDia[0].keyNombre, "Evento");
      htmlContent += `<p class="day-label">${nombreTraducido}</p>`;

      dayDiv.addEventListener("click", () => {
        document.querySelectorAll(".cal-day").forEach(d => d.classList.remove("selected"));
        dayDiv.classList.add("selected");
        if (typeof window.abrirDetallesEvento === "function") {
          window.abrirDetallesEvento(eventosDia[0]);
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
    f => f.dia === hoy.getDate() && f.mes === (hoy.getMonth() + 1) && f.anio === hoy.getFullYear()
  );

  panel.classList.remove("has-event", "no-event");

  if (eventosHoy.length > 0) {
    panel.classList.add("has-event");
    const primerNombre = t(eventosHoy[0].keyNombre, "Evento");
    titleEl.textContent = eventosHoy.length === 1 ? primerNombre : `${primerNombre} y ${eventosHoy.length - 1} más`;
    panel.style.cursor = "pointer";
    panel.onclick = () => {
      if (typeof window.abrirDetallesEvento === "function") window.abrirDetallesEvento(eventosHoy[0]);
    };
  } else {
    panel.classList.add("no-event");
    titleEl.textContent = t("cal.noEventsToday", "No hay ningún evento cultural para este día");
    panel.style.cursor = "default";
    panel.onclick = null;
  }
}

window.abrirDetallesEvento = function(evento) {
  let modal = document.getElementById("calEventModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "calEventModal";
    modal.className = "cal-modal-overlay"; 
    document.body.appendChild(modal);
  }

  const nombreTraducido = t(evento.keyNombre, "Evento");
  const descTraducida = t(evento.keyDesc, "Sin descripción.");
  const mesTexto = t(CLAVES_MESES[evento.mes - 1], nombresMeses[evento.mes - 1]);
  const urlMapa = `mapa.html?lat=${evento.lat}&lng=${evento.lng}&nombreEvento=${encodeURIComponent(nombreTraducido)}&from=calendario.html`;

  modal.innerHTML = `
    <div class="cal-modal-content">
      <button class="cal-modal-close" onclick="document.getElementById('calEventModal').remove()">&times;</button>
      <span class="cal-modal-badge">${t(evento.tipo, evento.tipo)}</span>
      <h2 class="cal-modal-title">${nombreTraducido}</h2>
      <div class="cal-modal-meta">
        <p><strong>📍 ${t("cal.modal.dept", "Departamento")}:</strong> ${evento.depto}</p>
        <p><strong>📅 ${t("cal.modal.date", "Fecha")}:</strong> ${evento.dia} de ${mesTexto} de ${evento.anio}</p>
      </div>
      <p class="cal-modal-desc">${descTraducida}</p>
      <div class="cal-modal-actions">
        <a href="${urlMapa}" class="btn-ver-mapa">🗺️ ${t("cal.modal.viewMap", "Ver en mapa interactivo")}</a>
      </div>
    </div>
  `;
  modal.classList.add("is-active");
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.remove(); });
};

/**
 * RaicesSV — Calendario de Festividades (Tarjetas e Interacción)
 * assets/js/funcalen.js
 */

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
  if (evento && typeof window.abrirDetallesEvento === "function") {
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
        currentLimit = 30;
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

  if (window.calendarState && calendarState.festividades) {
    listaEventosFiltrados = [...calendarState.festividades];
  } else if (typeof EVENTOS_CALENDARIO !== 'undefined') {
    listaEventosFiltrados = [...EVENTOS_CALENDARIO];
  }
  renderCatalogo(listaEventosFiltrados);
}

function renderCatalogo(eventos) {
  const catalogGrid = document.getElementById("catalogGrid");
  const resultsCount = document.getElementById("resultsCount");
  const loadMoreContainer = document.getElementById("loadMoreContainer");
  
  if (!catalogGrid) return;
  catalogGrid.innerHTML = "";

  // 1. Traducción del contador superior
  if (resultsCount) {
    resultsCount.innerHTML = `<strong>${eventos.length}</strong> ${t("festividades encontradas", "festividades encontradas")}`;
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

    // ⬇️ CORRECCIÓN AQUÍ: Si es "Todos", lo traduce a "Everywhere". Si es un departamento real, lo deja igual.
    const deptoTraducido = evento.depto === "Todos" ? t("Todos", "Todos") : evento.depto;

    card.innerHTML = `
      <div class="fest-card-banner"></div>
      <div class="fest-card-body">
        <div class="fest-card-meta">
          <!-- Ahora el badge mostrará "EVERYWHERE" en inglés o "TODOS" en español -->
          <span class="badge badge-dept" style="text-transform: uppercase;">${deptoTraducido}</span>
          <span class="badge badge-type">${tipoTraducido}</span>
        </div>
        <h3>${nombreTraducido}</h3>
        <p>${descTraducida}</p>
        <p class="fest-date"><strong>${t("cal.modal.date", "Fecha")}:</strong> ${evento.dia} ${conectorDe} ${mesTraducido}</p>
      </div>
      <div class="fest-card-footer">
        <!-- El texto inferior ahora dirá "Everywhere, El Salvador" en inglés -->
        <span class="fest-location">${deptoTraducido}, El Salvador</span>
        <a href="mapa.html?lat=${evento.lat}&lng=${evento.lng}&nombreEvento=${encodeURIComponent(nombreTraducido)}&eventoId=${evento.id}&desc=${encodeURIComponent(descTraducida)}&depto=${encodeURIComponent(evento.depto)}&from=calendario.html" class="map-link">${t("Ver en mapa", "Ver en mapa")}</a>
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
  const searchVal = document.getElementById("f-search").value.toLowerCase();
  const origen = (window.calendarState && calendarState.festividades.length > 0) ? calendarState.festividades : EVENTOS_CALENDARIO;

  listaEventosFiltrados = origen.filter(evento => {
    const matchDept = deptVal === "" || evento.depto === deptVal;
    const matchMonth = monthVal === "" || evento.mes.toString() === monthVal;
    const matchType = typeVal === "" || evento.tipo === typeVal;
    
    const nombreTraducido = t(evento.keyNombre, "").toLowerCase();
    const descTraducida = t(evento.keyDesc, "").toLowerCase();
    const matchSearch = searchVal === "" || nombreTraducido.includes(searchVal) || descTraducida.includes(searchVal);

    return matchDept && matchMonth && matchType && matchSearch;
  });

  triggerCatalogAnimation();
  renderCatalogo(listaEventosFiltrados);
}

function setupModalEvents() {
  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");

  if (modalClose && modalOverlay) {
    modalClose.addEventListener("click", () => modalOverlay.classList.remove("open"));
    modalOverlay.addEventListener("click", (e) => { if (e.target === modalOverlay) modalOverlay.classList.remove("open"); });
  }

  window.abrirDetallesEvento = (evento) => {
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    if (!modalOverlay || !modalTitle || !modalBody) return;

    // 1. Traducciones de contenido dinámico
    const nombreTraducido = t(evento.keyNombre, "Festividad");
    const descTraducida = t(evento.keyDesc, "Sin descripción.");
    const mesTraducido = t(CLAVES_MESES[evento.mes - 1], nombresMeses[evento.mes - 1]);
    
    // Traducción del departamento y tipo (si existen claves en el diccionario, si no usa fallback)
    const deptoTraducido = t(evento.depto, evento.depto); 
    const tipoTraducido = t(evento.tipo, evento.tipo);
    
    // Evitar el 'undefined' del año obteniéndolo de forma segura
    const anioSeguro = evento.anio || (window.calendarState ? calendarState.currentYear : 2026);

    // 2. Confección del conector "de" u "of" según el idioma
    const conectorDe = t("cal.modal.of", "de");

    modalTitle.textContent = nombreTraducido;
    
    // 3. Renderizado del HTML con todas las etiquetas preparadas para i18n
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
          <p class="val">${evento.dia} ${conectorDe} ${mesTraducido} ${conectorDe} ${anioSeguro}</p>
        </div>
      </div>
      <div class="modal-row">
        <div>
          <p class="lbl">${t("cal.modal.description", "Descripción")}</p>
          <p class="val">${descTraducida}</p>
        </div>
      </div>
      <a href="mapa.html?lat=${evento.lat}&lng=${evento.lng}&nombreEvento=${encodeURIComponent(nombreTraducido)}&eventoId=${evento.id}&desc=${encodeURIComponent(descTraducida)}&depto=${encodeURIComponent(evento.depto)}&from=calendario.html" class="modal-map-btn">
        ${t("cal.modal.exploreMap", "Explorar en Mapa Interactivo")}
      </a>
    `;
    
    eventoActivoModalId = evento.id;
    modalOverlay.classList.add("open");
  };
}

function triggerCatalogAnimation() {
  const catalogGrid = document.getElementById("catalogGrid");
  if (catalogGrid) {
    catalogGrid.classList.remove("fade-transition");
    void catalogGrid.offsetWidth; 
    catalogGrid.classList.add("fade-transition");
  }
}

const RAICESSV_RETURN_KEY = "raicessv_calendario_return";

function guardarEstadoCalendario(eventoId) {
  const estado = {
    scrollY: window.scrollY,
    filtros: {
      dept: document.getElementById("f-dept")?.value || "",
      month: document.getElementById("f-month")?.value || "",
      type: document.getElementById("f-type")?.value || "",
      search: document.getElementById("f-search")?.value || ""
    },
    vista: document.getElementById("catalogGrid")?.classList.contains("list-view") ? "list" : "grid",
    limite: currentLimit,
    eventoId: eventoId || null
  };
  try { sessionStorage.setItem(RAICESSV_RETURN_KEY, JSON.stringify(estado)); } catch (e) {}
}

document.addEventListener("click", (e) => {
  const link = e.target.closest(".map-link, .modal-map-btn");
  if (!link) return;
  const tarjeta = link.closest(".fest-card");
  const eventoId = tarjeta ? tarjeta.dataset.eventId : eventoActivoModalId;
  guardarEstadoCalendario(eventoId);
});

function restaurarEstadoCalendario() {
  let raw;
  try { raw = sessionStorage.getItem(RAICESSV_RETURN_KEY); } catch (e) { return; }
  if (!raw) return;
  sessionStorage.removeItem(RAICESSV_RETURN_KEY);

  let estado;
  try { estado = JSON.parse(raw); } catch (e) { return; }

  const fDept = document.getElementById("f-dept");
  const fMonth = document.getElementById("f-month");
  const fType = document.getElementById("f-type");
  const fSearch = document.getElementById("f-search");
  const catalogGrid = document.getElementById("catalogGrid");
  const gridViewBtn = document.getElementById("gridViewBtn");
  const listViewBtn = document.getElementById("listViewBtn");

  if (fDept) fDept.value = estado.filtros?.dept || "";
  if (fMonth) fMonth.value = estado.filtros?.month || "";
  if (fType) fType.value = estado.filtros?.type || "";
  if (fSearch) fSearch.value = estado.filtros?.search || "";

  if (estado.vista === "list" && catalogGrid) {
    catalogGrid.classList.add("list-view");
    listViewBtn?.classList.add("active");
    gridViewBtn?.classList.remove("active");
  }

  currentLimit = estado.limite === 30 ? 30 : 6;
  filtrarFestividades();
}