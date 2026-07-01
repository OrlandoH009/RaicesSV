/**
 * RaicesSV — Calendario de Festividades
 * assets/js/funcalen.js
 */

// Variables de control de renderizado local
let listaEventosFiltrados = [];
let currentLimit = 6; // Límite base estricto

document.addEventListener("DOMContentLoaded", () => {
  initCatalogAndFilters();
  setupModalEvents();
});

function initCatalogAndFilters() {
  const gridViewBtn = document.getElementById("gridViewBtn");
  const listViewBtn = document.getElementById("listViewBtn");
  const catalogGrid = document.getElementById("catalogGrid");
  const applyFilter = document.getElementById("applyFilter");
  const clearFilter = document.getElementById("clearFilter");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  // Toggle de vistas (Grilla / Lista)
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

  // Filtrado de eventos
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

  // Evento interactivo con doble estado (Mostrar más / Mostrar menos) y animación
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      const tarjetas = document.querySelectorAll(".fest-card");

      if (currentLimit === 6) {
        // ACCIÓN: Abrir / Mostrar más
        currentLimit = 30;
        loadMoreBtn.textContent = "Mostrar menos";
        renderCatalogo(listaEventosFiltrados);
      } else {
        // ACCIÓN: Cerrar / Mostrar menos con animación de salida previa
        tarjetas.forEach((tarjeta, index) => {
          if (index >= 6) {
            tarjeta.style.transition = "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
            tarjeta.style.opacity = "0";
            tarjeta.style.transform = "translateY(15px)";
          }
        });

        // Esperar a que la animación de salida termine antes de remover del DOM
        setTimeout(() => {
          currentLimit = 6;
          loadMoreBtn.textContent = "Mostrar más celebraciones";
          renderCatalogo(listaEventosFiltrados);
          
          // Desplazamiento suave para devolver al usuario al inicio del catálogo
          document.getElementById("resultsCount").scrollIntoView({ behavior: "smooth" });
        }, 350);
      }
    });
  }

  // Inicialización primaria
  listaEventosFiltrados = [...calendarState.festividades];
  renderCatalogo(listaEventosFiltrados);
}

function renderCatalogo(eventos) {
  const catalogGrid = document.getElementById("catalogGrid");
  const resultsCount = document.getElementById("resultsCount");
  const loadMoreContainer = document.getElementById("loadMoreContainer");
  
  if (!catalogGrid) return;
  catalogGrid.innerHTML = "";

  if (resultsCount) {
    resultsCount.innerHTML = `<strong>${eventos.length}</strong> festividades encontradas`;
  }

  if (eventos.length === 0) {
    catalogGrid.innerHTML = `
      <div class="empty-state">
        <p>No se encontraron celebraciones con los filtros seleccionados.</p>
      </div>
    `;
    if (loadMoreContainer) loadMoreContainer.style.display = "none";
    return;
  }

  // Segmentación por software del arreglo
  const eventosVisibles = eventos.slice(0, currentLimit);

  eventosVisibles.forEach((evento, index) => {
    const card = document.createElement("div");
    card.classList.add("fest-card");

    // Si estamos mostrando más de 6, aplicamos retrasos de animación progresivos a las nuevas tarjetas
    if (index >= 6) {
      card.style.animationDelay = `${(index - 6) * 0.03}s`;
    }

    card.innerHTML = `
      <div class="fest-card-banner"></div>
      <div class="fest-card-body">
        <div class="fest-card-meta">
          <span class="badge badge-dept">${evento.depto}</span>
          <span class="badge badge-type">${evento.tipo}</span>
        </div>
        <h3>${evento.nombre}</h3>
        <p>${evento.desc}</p>
        <p class="fest-date"><strong>Fecha:</strong> ${evento.dia} de ${nombresMeses[evento.mes]}</p>
      </div>
      <div class="fest-card-footer">
        <span class="fest-location">${evento.depto}, El Salvador</span>
        <a href="mapa.html?evento=${20 + evento.id}" class="map-link">Ver en mapa</a>
      </div>
    `;

    card.querySelector(".fest-card-body").addEventListener("click", () => {
      window.abrirDetallesEvento(evento);
    });

    catalogGrid.appendChild(card);
  });

  // Visibilidad del botón controlador
  if (loadMoreContainer) {
    if (eventos.length > 6) {
      loadMoreContainer.style.display = "block";
    } else {
      loadMoreContainer.style.display = "none";
    }
  }
}

function filtrarFestividades() {
  const deptVal = document.getElementById("f-dept").value;
  const monthVal = document.getElementById("f-month").value;
  const typeVal = document.getElementById("f-type").value;
  const searchVal = document.getElementById("f-search").value.toLowerCase();

  listaEventosFiltrados = calendarState.festividades.filter(evento => {
    const matchDept = deptVal === "" || evento.depto === deptVal;
    const matchMonth = monthVal === "" || evento.mes.toString() === monthVal;
    const matchType = typeVal === "" || evento.tipo === typeVal;
    const matchSearch = searchVal === "" || evento.nombre.toLowerCase().includes(searchVal) || evento.desc.toLowerCase().includes(searchVal);

    return matchDept && matchMonth && matchType && matchSearch;
  });

  triggerCatalogAnimation();
  renderCatalogo(listaEventosFiltrados);
}

function setupModalEvents() {
  const modalOverlay = document.getElementById("modalOverlay");
  const modalClose = document.getElementById("modalClose");

  if (modalClose && modalOverlay) {
    modalClose.addEventListener("click", () => {
      modalOverlay.classList.remove("open");
    });

    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove("open");
      }
    });
  }

  window.abrirDetallesEvento = (evento) => {
    const modalTitle = document.getElementById("modalTitle");
    const modalBody = document.getElementById("modalBody");
    
    if (!modalOverlay || !modalTitle || !modalBody) return;

    modalTitle.textContent = evento.nombre;
    modalBody.innerHTML = `
      <div class="modal-row">
        <div>
          <p class="lbl">Ubicación</p>
          <p class="val">${evento.depto}, El Salvador</p>
        </div>
      </div>
      <div class="modal-row">
        <div>
          <p class="lbl">Tipo de Evento</p>
          <p class="val">${evento.tipo}</p>
        </div>
      </div>
      <div class="modal-row">
        <div>
          <p class="lbl">Fecha de Celebración</p>
          <p class="val">${evento.dia} de ${nombresMeses[evento.mes]} de ${evento.anio}</p>
        </div>
      </div>
      <div class="modal-row">
        <div>
          <p class="lbl">Descripción</p>
          <p class="val">${evento.desc}</p>
        </div>
      </div>
      <a href="mapa.html?evento=${20 + evento.id}" class="modal-map-btn">Explorar en Mapa Interactivo</a>
    `;

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