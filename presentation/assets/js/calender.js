const hoyInicial = new Date();
const calendarState = {
  currentYear: hoyInicial.getFullYear(),
  currentMonth: hoyInicial.getMonth(), // 0 = Enero, 11 = Diciembre
  selectedDay: null,
  festividades: [] 
};

const nombresMeses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Base de datos expandida de festividades (30 Eventos de los 14 departamentos)
const EVENTOS_CALENDARIO = [
  { id: 3, nombre: "Feria de la Panela", dia: 15, mes: 2, depto: "San Vicente", tipo: "Feria Gastronómica", desc: "Molienda tradicional en Verapaz, donde se elabora dulce de atado, alfeñiques y variedad de derivados de la caña de azúcar.", lat: 13.6167, lng: -88.85 },
  { id: 5, nombre: "Día de la Cruz", dia: 3, mes: 5, depto: "Todos", tipo: "Celebración Religiosa", desc: "Tradición nacional donde se coloca una cruz de árbol de jiote en los patios, adornada con frutas de estación y cortinas de papel picado.", lat: 13.6929, lng: -89.2182 },
  { id: 8, nombre: "Fiestas Julias", dia: 26, mes: 7, depto: "Santa Ana", tipo: "Fiesta Patronal", desc: "La celebración más grande de Occidente en honor a Señora Santa Ana, destacando el desfile del correo, juegos mecánicos y misas solemnes.", lat: 13.9942, lng: -89.5597 },
  { id: 9, nombre: "Festival del Maíz", dia: 1, mes: 8, depto: "La Libertad", tipo: "Feria Gastronómica", desc: "Celebración en San Juan Opico dedicada a los derivados del maíz: riguas, tamales, atol, chicha y elotes locos.", lat: 13.8167, lng: -89.55 },
  { id: 10, nombre: "Fiestas Agostinas", dia: 5, mes: 8, depto: "San Salvador", tipo: "Fiesta Patronal", desc: "Celebración capitalina en honor al Divino Salvador del Mundo, famosa por la Bajada (transfiguración) frente a la Catedral Metropolitana.", lat: 13.6984, lng: -89.1915 },
  { id: 12, nombre: "Festival del Jocote Corona", dia: 15, mes: 10, depto: "Santa Ana", tipo: "Feria Gastronómica", desc: "Celebración en el Parque Nacional Cerro Verde, promoviendo el consumo y emprendimientos basados en esta fruta exótica de altura.", lat: 13.8494, lng: -89.6314 },
  { id: 13, nombre: "Fiestas de la Calabaza", dia: 1, mes: 11, depto: "Cuscatlán", tipo: "Tradición Popular", desc: "En Cojutepeque se preparan ayotes en miel y se realizan desfiles infantiles rescatando personajes de la mitología cuzcatleca.", lat: 13.7167, lng: -88.9333 },
  { id: 14, nombre: "Día de los Canchules", dia: 1, mes: 11, depto: "Ahuachapán", tipo: "Tradición Popular", desc: "Tradición única en Nahuizalco donde los niños van de casa en casa pidiendo comida preparada para los altares de los difuntos al grito de 'ángeles somos'.", lat: 13.7739, lng: -89.7256 },
  { id: 16, nombre: "Día de los Difuntos", dia: 2, mes: 11, depto: "Todos", tipo: "Conmemoración", desc: "Fecha de respeto nacional donde las familias visitan los cementerios para enforlar, pintar tumbas y recordar a sus seres queridos.", lat: 13.6929, lng: -89.2182 },
  { id: 17, nombre: "Festival del Añil", dia: 4, mes: 11, depto: "Cuscatlán", tipo: "Festival Cultural", desc: "Celebración en Suchitoto dedicada al 'oro azul', exponiendo técnicas prehispánicas de teñido artesanal e historia colonial.", lat: 14.0311, lng: -89.0281 },
  { id: 18, nombre: "Carnaval de San Miguel", dia: 28, mes: 11, depto: "San Miguel", tipo: "Fiesta Patronal", desc: "La fiesta popular más grande de Centroamérica en honor a la Virgen de la Paz, con decenas de orquestas en las calles principales.", lat: 13.4833, lng: -88.1833 },
  { id: 20, nombre: "Día de la Virgen de Guadalupe", dia: 12, mes: 12, depto: "San Salvador", tipo: "Celebración Religiosa", desc: "Peregrinación hacia la Basílica de Guadalupe (La Ceiba) donde los niños son vestidos con trajes tradicionales indígenas en agradecimiento por milagros.", lat: 13.7008, lng: -89.2100 },
  { id: 21, nombre: "Los Canchules de Nahuizalco", dia: 1, mes: 11, depto: "Sonsonate", tipo: "Tradición Popular", desc: "Versión focalizada del altar de muertos en Nahuizalco, donde se exhiben altares en las calles y se comparte comida típica.", lat: 13.7739, lng: -89.7256 },
  { id: 22, nombre: "Día de los Farolitos", dia: 7, mes: 9, depto: "Ahuachapán", tipo: "Celebración Tradicional", desc: "Conmemoración del nacimiento de la Virgen María en Ahuachapán y Concepción de Ataco, iluminando calles y estructuras con miles de faroles artesanales de papel.", lat: 13.9214, lng: -89.845 },
  { id: 23, nombre: "La Calabiuza", dia: 1, mes: 11, depto: "Cuscatlán", tipo: "Desfile Tradicional", desc: "Desfile nocturno en Tonacatepeque donde los jóvenes se disfrazan de personajes de la mitología salvadoreña (Ciguanaba, Cipitío) acompañados de carretas chillonas.", lat: 13.7089, lng: -89.0958 },
  { id: 24, nombre: "Festival del Añil", dia: 4, mes: 10, depto: "Cuscatlán", tipo: "Festival Cultural", desc: "Celebración en Suchitoto dedicada al 'oro azul', exponiendo técnicas prehispánicas de teñido artesanal e historia colonial.", lat: 14.0311, lng: -89.0281 },
  { id: 25, nombre: "Festival del Jocote Corona", dia: 18, mes: 10, anio: 2026, depto: "Santa Ana", tipo: "Feria Municipal", desc: "Feria gastronómica celebrada en el Cerro Verde dedicada a la comercialización y platillos derivados de este icónico fruto.", lat: 13.8494, lng: -89.6314 },
  { id: 26, nombre: "Tradición de los Encuentros", dia: 24, mes: 10, anio: 2026, depto: "Sonsonate", tipo: "Danza Ancestral", desc: "Centenaria festividad religiosa y cultural donde se encuentran las imágenes de los santos patronos de los pueblos vecinos, acompañada de danzas tradicionales como el Chinchintora.", lat: 13.7186, lng: -89.7244 },
  { id: 27, nombre: "Día de la Calabiuza", dia: 1, mes: 11, anio: 2026, depto: "Cuscatlán", tipo: "Festival Cultural", desc: "Desfile tradicional nocturno en Tonacatepeque donde cobran vida los personajes de las leyendas salvadoreñas como la Siguanaba.", lat: 13.7089, lng: -89.0958 },
  { id: 28, nombre: "Día de los Difuntos", dia: 1, mes: 11, anio: 2026, depto: "San Salvador", tipo: "Festival Cultural", desc: "El 1 y 2 de noviembre de 2026 las familias visitan los cementerios del país para honrar a sus seres queridos con flores y el tradicional fiambre.", lat: 13.6929, lng: -89.2182 },
  { id: 29, nombre: "Festival del Barro", dia: 8, mes: 11, anio: 2026, depto: "Cabañas", tipo: "Festival Cultural", desc: "Exposición artesanal en Ilobasco que rinde homenaje a los maestros alfareros y sus famosas figuras en miniatura.", lat: 13.8422, lng: -88.8508 },
  { id: 30, nombre: "Fiestas Patronales de Gotera", dia: 15, mes: 11, anio: 2026, depto: "Morazán", tipo: "Fiesta Patronal", desc: "Eventos dedicados a San Francisco de Asís en San Francisco Gotera, combinando fe, jaripeos populares y danzas de la región.", lat: 13.7, lng: -88.1 },
  { id: 31, nombre: "Fiestas de los Historiantes de Cuisnahuat", dia: 24, mes: 11, anio: 2026, depto: "Sonsonate", tipo: "Celebración Religiosa", desc: "Danza tradicional de Moros y Cristianos en honor a San Carlos Borromeo, preservando las raíces ancestrales indigenas.", lat: 13.6167, lng: -89.6667 },
  { id: 32, nombre: "Gran Carnaval de San Miguel", dia: 28, mes: 11, anio: 2026, depto: "San Miguel", tipo: "Festividad Nacional", desc: "El carnaval más grande de Centroamérica, celebrado en honor a la Virgen de la Paz con decenas de orquestas en vivo.", lat: 13.4833, lng: -88.1833 },
  { id: 33, nombre: "Día de los Canchules", dia: 4, mes: 12, anio: 2026, depto: "Cabañas", tipo: "Tradición Oral", desc: "Tradición única cada 4 de diciembre donde los habitantes crean altares con frutas y comida típica, repitiendo el dicho popular \"¡Canchul, si no me das, te quiebro el candil!\".", lat: 13.8422, lng: -88.8508 },
  { id: 34, nombre: "Festival Internacional del Chicharrón", dia: 12, mes: 12, anio: 2026, depto: "La Libertad", tipo: "Feria Municipal", desc: "Feria culinaria de gran afluencia turística en Santa Tecla, centrada en la preparación creativa de platillos a base de cerdo.", lat: 13.6769, lng: -89.2797 },
  { id: 35, nombre: "Fiestas Patronales de La Unión", dia: 12, mes: 12, anio: 2026, depto: "La Unión", tipo: "Fiesta Patronal", desc: "Celebradas en honor a la Inmaculada Concepción con desfiles, carrozas y actividades marítimas en el Golfo de Fonseca.", lat: 13.3369, lng: -87.8442 },
  { id: 36, nombre: "Navidad y Posadas", dia: 16, mes: 12, anio: 2026, depto: "San Salvador", tipo: "Evento Cultural", desc: "Del 16 al 24 de diciembre de 2026 se celebran las posadas en todo el país, culminando en la Nochebuena con cohetes, tamales y ponche.", lat: 13.6929, lng: -89.2182 },
  { id: 37, nombre: "Fiestas del Arroz", dia: 19, mes: 12, anio: 2026, depto: "San Vicente", tipo: "Feria Municipal", desc: "Desarrollado en San Esteban Catarina, celebrando el procesamiento y soberanía alimentaria ligada al cultivo de arroz.", lat: 13.6167, lng: -88.85 },
  { id: 38, nombre: "Fiestas Patronales de San Vicente", dia: 25, mes: 12, anio: 2026, depto: "San Vicente", tipo: "Fiesta Patronal", desc: "Celebraciones patronales dedicadas a San Vicente Abad y Mártir, llenas de actividades culturales bajo la histórica torre.", lat: 13.6411, lng: -88.7856 }
];ñ

document.addEventListener("DOMContentLoaded", () => {
  // POBLAR Y NORMALIZAR LOS EVENTOS ANTES DE INICIALIZAR EL CALENDARIO
  calendarState.festividades = EVENTOS_CALENDARIO.map(evento => ({
    ...evento,
    // Si el evento no trae año, le asignamos el año actual por defecto
    anio: evento.anio || calendarState.currentYear 
  }));

  initCalendar();
  setupCalendarEvents();
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
    yearTitle.textContent = calendarState.currentYear;
  }
}

function renderMonthPills() {
  const pillsContainer = document.getElementById("monthPills");
  if (!pillsContainer) return;

  pillsContainer.innerHTML = "";

  nombresMeses.forEach((mes, index) => {
    const pill = document.createElement("button");
    pill.classList.add("month-pill");
    pill.textContent = mes;

    // Verificar si el mes tiene eventos para agregar indicador visual
    const tieneEventos = calendarState.festividades.some(f => f.mes === (index + 1) && f.anio === calendarState.currentYear);
    if (tieneEventos) {
      pill.classList.add("has-events");
    }

    if (index === calendarState.currentMonth) {
      pill.classList.add("active");
    }

    pill.addEventListener("click", () => {
      document.querySelectorAll(".month-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      calendarState.currentMonth = index;
      
      triggerGridAnimation();
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

  // Obtener primer día del mes (0 = Domingo, 1 = Lunes...)
  let primerDiaIndex = new Date(año, mes, 1).getDay();
  // Ajustar para que comience en Lunes (Lun=0, Dom=6) como tu cabecera HTML
  primerDiaIndex = primerDiaIndex === 0 ? 6 : primerDiaIndex - 1;

  const totalDiasMes = new Date(año, mes + 1, 0).getDate();
  const totalDiasMesAnterior = new Date(año, mes, 0).getDate();

  // 1. Días del mes anterior (relleno)
  for (let i = primerDiaIndex - 1; i >= 0; i--) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("cal-day", "other-month");
    dayDiv.innerHTML = `<span class="day-num">${totalDiasMesAnterior - i}</span>`;
    calGrid.appendChild(dayDiv);
  }

  // 2. Días del mes actual
  for (let dia = 1; dia <= totalDiasMes; dia++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("cal-day");
    
    // Evaluar si es el día de hoy real
    const hoy = new Date();
    if (hoy.getDate() === dia && hoy.getMonth() === mes && hoy.getFullYear() === año) {
      dayDiv.classList.add("today");
    }

    let htmlContent = `<span class="day-num">${dia}</span>`;

    // Buscar eventos para este día específico
    const eventosDia = calendarState.festividades.filter(f => f.dia === dia && f.mes === (mes + 1) && f.anio === año);

    if (eventosDia.length > 0) {
      dayDiv.classList.add("has-event");
      htmlContent += `<div class="day-dots">`;
      eventosDia.forEach(() => {
        htmlContent += `<span class="day-dot"></span>`;
      });
      htmlContent += `</div>`;
      
      // Mostrar el nombre del primer evento como etiqueta fija
      htmlContent += `<p class="day-label">${eventosDia[0].nombre}</p>`;

      // Evento click para abrir detalles
      dayDiv.addEventListener("click", () => {
        // Remover selección previa
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

  // 3. Días del mes siguiente para completar la grilla (múltiplo de 7)
  const celdasTotales = calGrid.children.length;
  const celdasRestantes = celdasTotales % 7 === 0 ? 0 : 7 - (celdasTotales % 7);
  
  for (let i = 1; i <= celdasRestantes; i++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("cal-day", "other-month");
    dayDiv.innerHTML = `<span class="day-num">${i}</span>`;
    calGrid.appendChild(dayDiv);
  }
}

// Control de la animación CSS dinámica
function triggerGridAnimation() {
  const calGrid = document.getElementById("calGrid");
  if (calGrid) {
    calGrid.classList.remove("fade-transition");
    void calGrid.offsetWidth; // Forzar reflow para reiniciar ciclo de animación CSS
    calGrid.classList.add("fade-transition");
  }
}

// Muestra en el panel superior si hay algún evento cultural para el día de hoy real
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
    titleEl.textContent = eventosHoy.length === 1
      ? eventosHoy[0].nombre
      : `${eventosHoy[0].nombre} y ${eventosHoy.length - 1} más`;

    panel.style.cursor = "pointer";
    panel.onclick = () => {
      if (typeof window.abrirDetallesEvento === "function") {
        window.abrirDetallesEvento(eventosHoy[0]);
      }
    };
  } else {
    panel.classList.add("no-event");
    titleEl.textContent = "No hay ningún evento cultural para este día";
    panel.style.cursor = "default";
    panel.onclick = null;
  }
}

/* ══════════════════════════════════════════════════════════
   FUNCIÓN: ABRIR DETALLES DEL EVENTO (MODAL Y REDIRECCIÓN)
   ══════════════════════════════════════════════════════════ */
window.abrirDetallesEvento = function(evento) {
  // 1. Intentar obtener el contenedor del modal existente o crear uno dinámicamente
  let modal = document.getElementById("calEventModal");
  
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "calEventModal";
    modal.className = "cal-modal-overlay"; // Asegúrate de darle estilos CSS a esta clase
    document.body.appendChild(modal);
  }

  // 2. Construir la URL codificada correctamente para el mapa interactivo
  const urlMapa = `mapa.html?lat=${evento.lat}&lng=${evento.lng}&nombreEvento=${encodeURIComponent(evento.nombre)}&from=calendario.html`;

  // 3. Insertar la estructura interna del modal con la información del evento
  modal.innerHTML = `
    <div class="cal-modal-content">
      <button class="cal-modal-close" onclick="document.getElementById('calEventModal').remove()">&times;</button>
      
      <span class="cal-modal-badge">${evento.tipo}</span>
      <h2 class="cal-modal-title">${evento.nombre}</h2>
      
      <div class="cal-modal-meta">
        <p><strong>📍 Departamento:</strong> ${evento.depto}</p>
        <p><strong>📅 Fecha:</strong> ${evento.dia} de ${nombresMeses[evento.mes - 1]} de ${evento.anio}</p>
      </div>
      
      <p class="cal-modal-desc">${evento.desc}</p>
      
      <div class="cal-modal-actions">
        <a href="${urlMapa}" class="btn-ver-mapa">🗺️ Ver en mapa interactivo</a>
      </div>
    </div>
  `;

  // 4. Mostrar el modal (puedes manejar la visibilidad agregando una clase activa)
  modal.classList.add("is-active");

  // Opcional: Cerrar el modal haciendo clic fuera de la caja de contenido
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
};