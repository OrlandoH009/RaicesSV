/* ════════════════════════════════════════════════════════════
   LOCATION PICKER — Buscador de lugares (estilo Google Maps)
   + mini-mapa Leaflet con pin arrastrable, para el formulario
   de publicaciones. Incluye modo "mapa ampliado" para ajustar
   el pin con más precisión.

   Usa Nominatim (OpenStreetMap) para geocodificar texto → coords,
   la misma familia de tiles/API que ya usa mapa.js del proyecto.

   Al seleccionar un lugar (por búsqueda, clic en el mapa o
   arrastrando el pin) se rellenan los inputs ocultos:
     #pubLocation      -> nombre del lugar (texto)
     #pubLocationLat   -> latitud
     #pubLocationLng   -> longitud
   ════════════════════════════════════════════════════════════ */

(function () {
  "use strict";

  const EL_SALVADOR_CENTER = [13.7, -88.95];
  const EL_SALVADOR_BOUNDS = [
    [12.9, -90.2],   // suroeste
    [14.6, -87.5]    // noreste
  ];
  const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";
  const NOMINATIM_REVERSE_URL = "https://nominatim.openstreetmap.org/reverse";

  // Mapa mini (siempre visible en el formulario)
  let map = null;
  let marker = null;

  // Mapa ampliado (dentro del overlay, se crea la primera vez que se abre)
  let mapExpanded = null;
  let markerExpanded = null;

  let currentLat = null;
  let currentLng = null;

  let searchTimeout = null;
  let lastSearchController = null;

  function t(key, fallback) {
    if (window.SRi18n) {
      const val = window.SRi18n.t(key, window.SRi18n.getLang());
      if (val && val !== key) return val;
    }
    return fallback;
  }

  function crearIconoPicker() {
    return L.divIcon({
      className: "",
      html: `<div class="location-picker-marker">📍</div>`,
      iconSize: [38, 38],
      iconAnchor: [19, 36],
      popupAnchor: [0, -30]
    });
  }

  function crearMapaBase(container) {
    const m = L.map(container, {
      center: EL_SALVADOR_CENTER,
      zoom: 9,
      minZoom: 7,
      maxBounds: EL_SALVADOR_BOUNDS,
      maxBoundsViscosity: 0.6,
      zoomControl: true
    });

    L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=65f24655-4886-4f79-844c-b55cf976acd3", {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap &copy; Stadia Maps'
    }).addTo(m);

    return m;
  }

  // ── Mapa mini ──
  function initMap() {
    const container = document.getElementById("pubLocationMap");
    if (!container || typeof L === "undefined") return;

    map = crearMapaBase(container);

    map.on("click", (e) => {
      placeMarker(e.latlng.lat, e.latlng.lng);
      reverseGeocode(e.latlng.lat, e.latlng.lng);
    });

    setTimeout(() => map.invalidateSize(), 200);
  }

  // ── Mapa ampliado (se crea la primera vez que se abre el overlay) ──
  function initMapExpanded() {
    const container = document.getElementById("pubLocationMapExpanded");
    if (!container || typeof L === "undefined" || mapExpanded) return;

    mapExpanded = crearMapaBase(container);

    mapExpanded.on("click", (e) => {
      placeMarker(e.latlng.lat, e.latlng.lng);
      reverseGeocode(e.latlng.lat, e.latlng.lng);
    });
  }

  function placeMarker(lat, lng) {
    currentLat = lat;
    currentLng = lng;
    const latlng = [lat, lng];

    if (map) {
      if (marker) {
        marker.setLatLng(latlng);
      } else {
        marker = L.marker(latlng, { icon: crearIconoPicker(), draggable: true }).addTo(map);
        marker.on("dragend", () => {
          const pos = marker.getLatLng();
          placeMarker(pos.lat, pos.lng);
          reverseGeocode(pos.lat, pos.lng);
        });
      }
      map.setView(latlng, Math.max(map.getZoom(), 14), { animate: true });
      setTimeout(() => map.invalidateSize(), 150);
    }

    if (mapExpanded) {
      if (markerExpanded) {
        markerExpanded.setLatLng(latlng);
      } else {
        markerExpanded = L.marker(latlng, { icon: crearIconoPicker(), draggable: true }).addTo(mapExpanded);
        markerExpanded.on("dragend", () => {
          const pos = markerExpanded.getLatLng();
          placeMarker(pos.lat, pos.lng);
          reverseGeocode(pos.lat, pos.lng);
        });
      }
      mapExpanded.setView(latlng, Math.max(mapExpanded.getZoom(), 15), { animate: true });
      setTimeout(() => mapExpanded.invalidateSize(), 150);
    }

    toggleMapHint(false);
  }

  function toggleMapHint(show) {
    const hint = document.getElementById("pubLocationMapHint");
    if (hint) hint.classList.toggle("is-hidden", !show);
  }

  function closeResultsList() {
    const list = document.getElementById("pubLocationResults");
    const picker = document.getElementById("locationPicker");
    if (list) list.style.display = "none";
    picker?.classList.remove("is-searching");
  }

  function setSelectedLocation(name, lat, lng) {
    document.getElementById("pubLocation").value = name || "";
    document.getElementById("pubLocationLat").value = lat ?? "";
    document.getElementById("pubLocationLng").value = lng ?? "";

    const selectedBox = document.getElementById("pubLocationSelected");
    const selectedText = document.getElementById("pubLocationSelectedText");
    if (name && selectedBox && selectedText) {
      selectedText.textContent = name;
      selectedBox.style.display = "flex";
    } else if (selectedBox) {
      selectedBox.style.display = "none";
    }

    // Réplica del texto seleccionado dentro del overlay ampliado
    const expandedText = document.getElementById("pubLocationExpandedSelectedText");
    if (expandedText) {
      expandedText.textContent = name ? `📍 ${name}` : t("pub.fieldLocationExpandedEmpty", "Toca el mapa para marcar el lugar");
    }
  }

  // ── Búsqueda (autocompletar tipo Google Maps) ──
  async function searchPlaces(query) {
    if (lastSearchController) lastSearchController.abort();
    lastSearchController = new AbortController();

    const params = new URLSearchParams({
      q: query,
      format: "jsonv2",
      addressdetails: "1",
      limit: "6",
      countrycodes: "sv"
    });

    try {
      const response = await fetch(`${NOMINATIM_URL}?${params.toString()}`, {
        signal: lastSearchController.signal,
        headers: { "Accept-Language": window.SRi18n ? window.SRi18n.getLang() : "es" }
      });
      if (!response.ok) throw new Error("Nominatim error");
      return await response.json();
    } catch (error) {
      if (error.name !== "AbortError") console.error("Error buscando lugar:", error);
      return [];
    }
  }

  function renderResults(results) {
    const list = document.getElementById("pubLocationResults");
    const picker = document.getElementById("locationPicker");
    if (!list) return;

    if (!results.length) {
      list.innerHTML = `<li class="location-picker__empty">${t("pub.fieldLocationNoResults", "No se encontraron lugares")}</li>`;
      list.style.display = "block";
      picker?.classList.add("is-searching");
      return;
    }

    list.innerHTML = results.map((r, i) => `
      <li data-index="${i}">
        <span class="location-picker__result-icon">📍</span>
        <span class="location-picker__result-text">${r.display_name}</span>
      </li>
    `).join("");
    list.style.display = "block";
    picker?.classList.add("is-searching");

    list.querySelectorAll("li[data-index]").forEach((li) => {
      li.addEventListener("click", () => {
        const r = results[Number(li.dataset.index)];
        selectResult(r);
      });
    });
  }

  function selectResult(r) {
    const lat = parseFloat(r.lat);
    const lng = parseFloat(r.lon);
    const shortName = buildShortName(r);

    document.getElementById("pubLocationSearch").value = shortName;
    setSelectedLocation(shortName, lat, lng);
    placeMarker(lat, lng);

    closeResultsList();
  }

  function buildShortName(r) {
    // Prioriza nombre corto (lugar/edificio) + municipio si existe
    if (r.address) {
      const a = r.address;
      const nombre = r.name || a.tourism || a.attraction || a.building || a.amenity;
      const lugar = a.city || a.town || a.village || a.municipality || a.county;
      if (nombre && lugar && nombre !== lugar) return `${nombre} (${lugar})`;
      if (nombre) return nombre;
      if (lugar) return lugar;
    }
    // display_name suele ser largo, se recortan los primeros 2 segmentos
    return r.display_name.split(",").slice(0, 2).join(",").trim();
  }

  async function reverseGeocode(lat, lng) {
    const searchInput = document.getElementById("pubLocationSearch");
    try {
      const params = new URLSearchParams({
        lat, lon: lng, format: "jsonv2", addressdetails: "1"
      });
      const response = await fetch(`${NOMINATIM_REVERSE_URL}?${params.toString()}`, {
        headers: { "Accept-Language": window.SRi18n ? window.SRi18n.getLang() : "es" }
      });
      const data = await response.json();
      const shortName = data && data.display_name ? buildShortName(data) : `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      if (searchInput) searchInput.value = shortName;
      setSelectedLocation(shortName, lat, lng);
    } catch (error) {
      console.error("Error en reverse geocoding:", error);
      const fallbackName = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
      if (searchInput) searchInput.value = fallbackName;
      setSelectedLocation(fallbackName, lat, lng);
    }
  }

  // ── Geolocalización del navegador ──
  function useMyLocation() {
    if (!navigator.geolocation) {
      alert(t("pub.fieldLocationGeoUnsupported", "Tu navegador no soporta geolocalización."));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        placeMarker(latitude, longitude);
        reverseGeocode(latitude, longitude);
      },
      () => {
        alert(t("pub.fieldLocationGeoError", "No se pudo obtener tu ubicación."));
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  // ── Reset público (para resetPublicationForm en publicaciones.js) ──
  function resetPicker() {
    setSelectedLocation("", "", "");
    currentLat = null;
    currentLng = null;

    const searchInput = document.getElementById("pubLocationSearch");
    if (searchInput) searchInput.value = "";
    closeResultsList();

    if (marker && map) {
      map.removeLayer(marker);
      marker = null;
    }
    if (map) map.setView(EL_SALVADOR_CENTER, 9);

    if (markerExpanded && mapExpanded) {
      mapExpanded.removeLayer(markerExpanded);
      markerExpanded = null;
    }
    if (mapExpanded) mapExpanded.setView(EL_SALVADOR_CENTER, 9);

    toggleMapHint(true);
  }

  // ── Cargar una ubicación ya existente (modo edición) ──
  function loadExistingLocation(name, lat, lng) {
    const searchInput = document.getElementById("pubLocationSearch");
    if (searchInput) searchInput.value = name || "";
    setSelectedLocation(name, lat, lng);
    if (lat !== null && lat !== undefined && lat !== "" && lng !== null && lng !== undefined && lng !== "") {
      placeMarker(parseFloat(lat), parseFloat(lng));
    } else {
      toggleMapHint(true);
    }
  }

  // ── Abrir / cerrar el mapa ampliado ──
  function openExpandedMap() {
    const overlay = document.getElementById("pubLocationExpandedOverlay");
    if (!overlay) return;

    overlay.classList.add("is-open");
    document.body.style.overflow = "hidden";

    initMapExpanded();

    // Sincroniza el pin actual (o el centro por defecto) al abrir
    setTimeout(() => {
      if (mapExpanded) mapExpanded.invalidateSize();
      if (currentLat !== null && currentLng !== null) {
        if (mapExpanded) mapExpanded.setView([currentLat, currentLng], 15);
        if (markerExpanded) {
          markerExpanded.setLatLng([currentLat, currentLng]);
        } else if (mapExpanded) {
          markerExpanded = L.marker([currentLat, currentLng], { icon: crearIconoPicker(), draggable: true }).addTo(mapExpanded);
          markerExpanded.on("dragend", () => {
            const pos = markerExpanded.getLatLng();
            placeMarker(pos.lat, pos.lng);
            reverseGeocode(pos.lat, pos.lng);
          });
        }
      }
    }, 100);
  }

  function closeExpandedMap() {
    const overlay = document.getElementById("pubLocationExpandedOverlay");
    if (!overlay) return;
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function initSearchInput() {
    const searchInput = document.getElementById("pubLocationSearch");
    const geoBtn = document.getElementById("pubLocationGeoBtn");
    const resultsList = document.getElementById("pubLocationResults");
    if (!searchInput) return;

    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim();

      // Si el usuario edita el texto manualmente, invalida la selección previa
      setSelectedLocation("", "", "");

      clearTimeout(searchTimeout);
      if (query.length < 3) {
        closeResultsList();
        return;
      }
      searchTimeout = setTimeout(async () => {
        const results = await searchPlaces(query);
        renderResults(results);
      }, 400);
    });

    searchInput.addEventListener("focus", () => {
      if (resultsList && resultsList.innerHTML.trim()) {
        resultsList.style.display = "block";
        document.getElementById("locationPicker")?.classList.add("is-searching");
      }
    });

    document.addEventListener("click", (e) => {
      const picker = document.getElementById("locationPicker");
      if (picker && !picker.contains(e.target)) {
        closeResultsList();
      }
    });

    geoBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      useMyLocation();
    });
  }

  function initExpandControls() {
    const expandBtn = document.getElementById("pubLocationExpandBtn");
    const collapseBtn = document.getElementById("pubLocationCollapseBtn");
    const confirmBtn = document.getElementById("pubLocationConfirmBtn");
    const overlay = document.getElementById("pubLocationExpandedOverlay");

    expandBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      openExpandedMap();
    });

    collapseBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      closeExpandedMap();
    });

    confirmBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      closeExpandedMap();
    });

    // Cerrar al hacer clic fuera del panel
    overlay?.addEventListener("click", (e) => {
      if (e.target === overlay) closeExpandedMap();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && overlay?.classList.contains("is-open")) {
        closeExpandedMap();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!document.getElementById("pubLocationMap")) return; // solo en publicaciones.html
    initMap();
    initSearchInput();
    initExpandControls();
  });

  // Exponer API mínima para publicaciones.js
  window.LocationPicker = {
    reset: resetPicker,
    loadExisting: loadExistingLocation
  };
})();