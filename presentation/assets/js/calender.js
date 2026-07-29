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
calendarState.festividades = [
  { id: 1, nombre: "Fiestas del Rey Guajactial", dia: 18, mes: 1, anio: 2026, depto: "Sonsonate", tipo: "Festival Cultural", desc: "Conmemoración histórica y rescate de la identidad pipil en Izalco, recordando el legado de los caciques ancestrales." },
  { id: 2, nombre: "Romería de Esquipulas", dia: 15, mes: 1, anio: 2026, depto: "Chalatenango", tipo: "Celebración Religiosa", desc: "Peregrinación masiva en honor al Cristo Negro en Dulce Nombre de María, una de las devociones más antiguas del norte." },
  { id: 3, nombre: "Fiestas Patronales de Cojutepeque", dia: 15, mes: 1, anio: 2026, depto: "Cuscatlán", tipo: "Fiesta Patronal", desc: "Celebración en honor a San Sebastián Mártir, conocida a nivel nacional por sus tradicionales e incomparables embutidos." },
  { id: 4, nombre: "Tradición del Bálsamo en Jayaque", dia: 18, mes: 1, anio: 2026, depto: "La Libertad", tipo: "Tradición Viva", desc: "Municipio cafetalero y productor de la Cordillera del Bálsamo, donde los artesanos locales preservan el proceso ancestral de extracción y purificación de la resina." },
  { id: 5, nombre: "Carnaval de la Panela de Verapaz", dia: 4, mes: 3, anio: 2026, depto: "San Vicente", tipo: "Festival Cultural", desc: "Desfile de carretas tradicionales decoradas con caña de azúcar y moliendas portátiles por las principales calles del municipio." },
  { id: 6, nombre: "Festival de la Panela", dia: 22, mes: 3, anio: 2026, depto: "Cuscatlán", tipo: "Feria Municipal", desc: "Celebrado en los moliendas de San Lorenzo, destacando la producción artesanal del dulce de panela y sus derivados derivados." },
  { id: 7, nombre: "Semana Santa Nacional", dia: 29, mes: 3, anio: 2026, depto: "San Salvador", tipo: "Celebración Religiosa", desc: "Procesiones, vía crucis y alfombras de aserrín se viven en todo el país durante la Semana Santa, del 29 de marzo al 5 de abril de 2026." },
  { id: 8, nombre: "Catedral de Santa Ana", dia: 5, mes: 4, anio: 2026, depto: "Santa Ana", tipo: "Evento Cultural", desc: "Una de las catedrales más hermosas de Centroamérica y sede de las tradiciones de Semana Santa del occidente del país." },
  { id: 9, nombre: "Feria del Marisco", dia: 5, mes: 4, anio: 2026, depto: "Usulután", tipo: "Feria Municipal", desc: "Evento gastronómico masivo en Puerto El Triunfo con degustación de cocteles, curiles y paseos en lancha por la Bahía de Jiquilisco." },
  { id: 10, nombre: "Día de la Cruz", dia: 3, mes: 5, anio: 2026, depto: "San Salvador", tipo: "Celebración Religiosa", desc: "Tradición nacional donde se adorna una cruz de árbol de jiote con frutas de la época para bendecir los hogares." },
  { id: 11, nombre: "Festival de las Flores y Palmas", dia: 10, mes: 5, anio: 2026, depto: "La Libertad", tipo: "Festival Cultural", desc: "Tradición colorida en Panchimalco que marca el inicio de la época lluviosa con procesiones adornadas de palmas y flores silvestres." },
  { id: 12, nombre: "Festival del Cangrejo", dia: 15, mes: 6, anio: 2026, depto: "La Paz", tipo: "Feria Municipal", desc: "Feria gastronómica marina en San Luis La Herradura, exaltando el turismo y el consumo sostenible del recurso costero." },
  { id: 13, nombre: "Fiestas Julias", dia: 26, mes: 7, anio: 2026, depto: "Santa Ana", tipo: "Fiesta Patronal", desc: "Grandes celebraciones culturales y religiosas en la Ciudad Heroica, realizadas en honor a Nuestra Señora Santa Ana." },
  { id: 14, nombre: "Fiestas Agostinas", dia: 5, mes: 8, anio: 2026, depto: "San Salvador", tipo: "Fiesta Patronal", desc: "Celebración principal en honor al Divino Salvador del Mundo, con carrozas y el tradicional desfile de Correos." },
  { id: 15, nombre: "Plaza las Américas", dia: 5, mes: 8, anio: 2026, depto: "San Salvador", tipo: "Evento Cultural", desc: "Sede principal de las Fiestas Agostinas cada agosto. Miles de salvadoreños se reúnen para la Bajada del Salvador." },
  { id: 16, nombre: "Panchimalco", dia: 10, mes: 8, anio: 2026, depto: "San Salvador", tipo: "Evento Cultural", desc: "Municipio indígena famoso por la Procesión de las Palmas en agosto y sus danzas folclóricas tradicionales." },
  { id: 17, nombre: "Festival de la Juventitudes Populares", dia: 12, mes: 8, anio: 2026, depto: "Morazán", tipo: "Festival Cultural", desc: "Encuentro de arte, memoria histórica, música latinoamericana y talleres de teatro social en el municipio de El Mozote." },
  { id: 18, nombre: "Festival del Maíz", dia: 28, mes: 8, anio: 2026, depto: "Chalatenango", tipo: "Feria Municipal", desc: "Celebración popular en honor a la cosecha del maíz con venta de atol, riguas, tamales y artesanías de la zona." },
  { id: 19, nombre: "Día de los Farolitos", dia: 7, mes: 9, anio: 2026, depto: "Ahuachapán", tipo: "Festival Cultural", desc: "Hermosa tradición donde las calles se iluminan por completo con miles de faroles artesanales." },
  { id: 20, nombre: "Festival de los Farolitos en Ataco", dia: 7, mes: 9, anio: 2026, depto: "Ahuachapán", tipo: "Festival Cultural", desc: "Concepción de Ataco se viste de luces, música folclórica y alta gastronomía para conmemorar el nacimiento de la Virgen María." },
  { id: 21, nombre: "Festival de Suchitoto", dia: 4, mes: 9, anio: 2026, depto: "Cuscatlán", tipo: "Evento Cultural", desc: "Festival Internacional de Arte y Cultura que convoca artistas de toda Latinoamérica anualmente." },
  { id: 22, nombre: "Día de la Independencia", dia: 15, mes: 9, anio: 2026, depto: "San Salvador", tipo: "Festividad Nacional", desc: "El 15 de septiembre de 2026 se conmemora la Independencia de Centroamérica con desfiles escolares y la Carrera de la Antorcha." },
  { id: 23, nombre: "Fiesta de la Primicia de la Cosecha", dia: 29, mes: 9, anio: 2026, depto: "La Unión", tipo: "Celebración Religiosa", desc: "Tradición agraria de los pueblos lencas en Conchagua, entregando las primeras mazorcas del año en acción de gracias." },
  { id: 24, month: "Festival del Añil", dia: 4, mes: 10, anio: 2026, depto: "Cuscatlán", tipo: "Festival Cultural", desc: "Celebración en Suchitoto dedicada al 'oro azul', exponiendo técnicas prehispánicas de teñido artesanal e historia colonial." },
  { id: 25, nombre: "Festival del Jocote Corona", dia: 18, mes: 10, anio: 2026, depto: "Santa Ana", tipo: "Feria Municipal", desc: "Feria gastronómica celebrada en el Cerro Verde dedicada a la comercialización y platillos derivados de este icónico fruto." },
  { id: 26, nombre: "Tradición de los Encuentros", dia: 24, mes: 10, anio: 2026, depto: "Sonsonate", tipo: "Danza Ancestral", desc: "Centenaria festividad religiosa y cultural donde se encuentran las imágenes de los santos patronos de los pueblos vecinos, acompañada de danzas tradicionales como el Chinchintora." },
  { id: 27, nombre: "Día de la Calabiuza", dia: 1, mes: 11, anio: 2026, depto: "Cuscatlán", tipo: "Festival Cultural", desc: "Desfile tradicional nocturno en Tonacatepeque donde cobran vida los personajes de las leyendas salvadoreñas como la Siguanaba." },
  { id: 28, nombre: "Día de los Difuntos", dia: 1, mes: 11, anio: 2026, depto: "San Salvador", tipo: "Festival Cultural", desc: "El 1 y 2 de noviembre de 2026 las familias visitan los cementerios del país para honrar a sus seres queridos con flores y el tradicional fiambre." },
  { id: 29, nombre: "Festival del Barro", dia: 8, mes: 11, anio: 2026, depto: "Cabañas", tipo: "Festival Cultural", desc: "Exposición artesanal en Ilobasco que rinde homenaje a los maestros alfareros y sus famosas figuras en miniatura." },
  { id: 30, nombre: "Fiestas Patronales de Gotera", dia: 15, mes: 11, anio: 2026, depto: "Morazán", tipo: "Fiesta Patronal", desc: "Eventos dedicados a San Francisco de Asís en San Francisco Gotera, combinando fe, jaripeos populares y danzas de la región." },
  { id: 31, nombre: "Fiestas de los Historiantes de Cuisnahuat", dia: 24, mes: 11, anio: 2026, depto: "Sonsonate", tipo: "Celebración Religiosa", desc: "Danza tradicional de Moros y Cristianos en honor a San Carlos Borromeo, preservando las raíces ancestrales indigenas." },
  { id: 32, nombre: "Gran Carnaval de San Miguel", dia: 28, mes: 11, anio: 2026, depto: "San Miguel", tipo: "Festividad Nacional", desc: "El carnaval más grande de Centroamérica, celebrado en honor a la Virgen de la Paz con decenas de orquestas en vivo." },
  { id: 33, nombre: "Día de los Canchules", dia: 4, mes: 12, anio: 2026, depto: "Cabañas", tipo: "Tradición Oral", desc: "Tradición única cada 4 de diciembre donde los habitantes crean altares con frutas y comida típica, repitiendo el dicho popular \"¡Canchul, si no me das, te quiebro el candil!\"." },
  { id: 34, nombre: "Festival Internacional del Chicharrón", dia: 12, mes: 12, anio: 2026, depto: "La Libertad", tipo: "Feria Municipal", desc: "Feria culinaria de gran afluencia turística en Santa Tecla, centrada en la preparación creativa de platillos a base de cerdo." },
  { id: 35, nombre: "Fiestas Patronales de La Unión", dia: 12, mes: 12, anio: 2026, depto: "La Unión", tipo: "Fiesta Patronal", desc: "Celebradas en honor a la Inmaculada Concepción con desfiles, carrozas y actividades marítimas en el Golfo de Fonseca." },
  { id: 36, nombre: "Navidad y Posadas", dia: 16, mes: 12, anio: 2026, depto: "San Salvador", tipo: "Evento Cultural", desc: "Del 16 al 24 de diciembre de 2026 se celebran las posadas en todo el país, culminando en la Nochebuena con cohetes, tamales y ponche." },
  { id: 37, nombre: "Fiestas del Arroz", dia: 19, mes: 12, anio: 2026, depto: "San Vicente", tipo: "Feria Municipal", desc: "Desarrollado en San Esteban Catarina, celebrando el procesamiento y soberanía alimentaria ligada al cultivo de arroz." },
  { id: 38, nombre: "Fiestas Patronales de San Vicente", dia: 25, mes: 12, anio: 2026, depto: "San Vicente", tipo: "Fiesta Patronal", desc: "Celebraciones patronales dedicadas a San Vicente Abad y Mártir, llenas de actividades culturales bajo la histórica torre." }
];

document.addEventListener("DOMContentLoaded", () => {
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
    const tieneEventos = calendarState.festividades.some(f => f.mes === index && f.anio === calendarState.currentYear);
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
    const eventosDia = calendarState.festividades.filter(f => f.dia === dia && f.mes === mes && f.anio === año);

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
    f => f.dia === hoy.getDate() && f.mes === hoy.getMonth() && f.anio === hoy.getFullYear()
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