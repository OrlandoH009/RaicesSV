/* NAV: el comportamiento del drawer/nav es manejado globalmente por `presentation/assets/js/script.js`. */

/* ══════════════════════════════════════════════════════════
   DATOS DE LANDMARKS CULTURALES (ESTRUCTURA DE TEXTO DINÁMICO)
   ══════════════════════════════════════════════════════════ */
const LANDMARKS = [
  {
    id: 1, cat: 'cultural', emoji: '🏛️', color: '#be8e56',
    nombre: 'Tazumal',
    lugar: 'Chalchuapa, Santa Ana',
    coords: [13.9889, -89.6833]
  },
  {
    id: 2, cat: 'cultural', emoji: '🏛️', color: '#be8e56',
    nombre: 'Joya de Cerén',
    lugar: 'San Juan Opico, La Libertad',
    coords: [13.8167, -89.55]
  },
  {
    id: 3, cat: 'cultural', emoji: '🏛️', color: '#be8e56',
    nombre: 'Salvador del Mundo',
    lugar: 'San Salvador',
    coords: [13.7060, -89.2189]
  },
  {
    id: 4, cat: 'cultural', emoji: '🎨', color: '#be8e56',
    nombre: 'Suchitoto',
    lugar: 'Cuscatlán',
    coords: [14.0311, -89.0281]
  },
  {
    id: 5, cat: 'cultural', emoji: '⛪', color: '#be8e56',
    nombre: 'Catedral Metropolitana',
    lugar: 'Centro Histórico, San Salvador',
    coords: [13.6984, -89.1915]
  },
  {
    id: 6, cat: 'cultural', emoji: '🏺', color: '#be8e56',
    nombre: 'MUNA',
    lugar: 'San Salvador',
    coords: [13.7020, -89.2230]
  },
  {
    id: 7, cat: 'cultural', emoji: '🏛️', color: '#be8e56',
    nombre: 'Ruinas de San Andrés',
    lugar: 'Ciudad Arce, La Libertad',
    coords: [13.8044, -89.3939]
  },
  {
    id: 8, cat: 'gastronomia', emoji: '🫓', color: '#e05252',
    nombre: 'Pupusodromo El Triángulo',
    lugar: 'Olocuilta, La Paz',
    coords: [13.5682, -89.1195]
  },
  {
    id: 9, cat: 'gastronomia', emoji: '🍞', color: '#e05252',
    nombre: 'Semitas de Cojutepeque',
    lugar: 'Cojutepeque, Cuscatlán',
    coords: [13.7167, -88.9333]
  },
  {
    id: 10, cat: 'gastronomia', emoji: '🥣', color: '#e05252',
    nombre: 'Mercado Central',
    lugar: 'Centro Histórico, San Salvador',
    coords: [13.6965, -89.1935]
  },
  {
    id: 11, cat: 'gastronomia', emoji: '🌽', color: '#e05252',
    nombre: 'Nahuizalco — Mercado Nocturno',
    lugar: 'Nahuizalco, Sonsonate',
    coords: [13.7739, -89.7256]
  },
  {
    id: 12, cat: 'evento', emoji: '🎆', color: '#52a0e0',
    nombre: 'Plaza las Américas',
    lugar: 'San Salvador',
    coords: [13.6995, -89.2200]
  },
  {
    id: 13, cat: 'evento', emoji: '🥁', color: '#52a0e0',
    nombre: 'Panchimalco',
    lugar: 'Panchimalco, San Salvador',
    coords: [13.6158, -89.1797]
  },
  {
    id: 14, cat: 'evento', emoji: '🎭', color: '#52a0e0',
    nombre: 'Festival de Suchitoto',
    lugar: 'Suchitoto, Cuscatlán',
    coords: [14.0322, -89.0269]
  },
  {
    id: 15, cat: 'evento', emoji: '✝️', color: '#52a0e0',
    nombre: 'Catedral de Santa Ana',
    lugar: 'Santa Ana',
    coords: [13.9958, -89.5582]
  },
  {
    id: 16, cat: 'historia', emoji: '📜', color: '#7c52e0',
    nombre: 'Casa de la Cultura de Izalco',
    lugar: 'Izalco, Sonsonate',
    coords: [13.7500, -89.6692]
  },
  {
    id: 17, cat: 'historia', emoji: '🏛️', color: '#7c52e0',
    nombre: 'Ex-Casa Presidencial',
    lugar: 'San Jacinto, San Salvador',
    coords: [13.6868, -89.1932]
  },
  {
    id: 18, cat: 'historia', emoji: '⛪', color: '#7c52e0',
    nombre: 'Iglesia El Rosario',
    lugar: 'San Salvador',
    coords: [13.6972, -89.1905]
  },
  {
    id: 19, cat: 'leyenda', emoji: '👻', color: '#52c07c',
    nombre: 'Lago de Coatepeque',
    lugar: 'Santa Ana',
    coords: [13.8667, -89.5500]
  },
  {
    id: 20, cat: 'leyenda', emoji: '🌿', color: '#52c07c',
    nombre: 'Bosque El Imposible',
    lugar: 'Ahuachapán',
    coords: [13.8303, -89.9789]
  },
  {
    id: 21, cat: 'evento', emoji: '🇸🇻', color: '#52a0e0',
    nombre: 'Fiestas Agostinas',
    lugar: 'San Salvador, El Salvador',
    coords: [13.6929, -89.2182]
  },
  {
    id: 22, cat: 'evento', emoji: '🏮', color: '#52a0e0',
    nombre: 'Día de los Farolitos',
    lugar: 'Ahuachapán, El Salvador',
    coords: [13.9214, -89.845]
  },
  {
    id: 23, cat: 'evento', emoji: '👑', color: '#52a0e0',
    nombre: 'Fiestas Julias',
    lugar: 'Santa Ana, El Salvador',
    coords: [13.9942, -89.5597]
  },
  {
    id: 24, cat: 'evento', emoji: '🔔', color: '#52a0e0',
    nombre: 'Fiestas Patronales de San Vicente',
    lugar: 'San Vicente, El Salvador',
    coords: [13.6411, -88.7847]
  },
  {
    id: 25, cat: 'evento', emoji: '🌴', color: '#52a0e0',
    nombre: 'Festival de las Flores y Palmas',
    lugar: 'La Libertad, El Salvador',
    coords: [13.6769, -89.2797]
  },
  {
    id: 26, cat: 'evento', emoji: '🎷', color: '#52a0e0',
    nombre: 'Gran Carnaval de San Miguel',
    lugar: 'San Miguel, El Salvador',
    coords: [13.4833, -88.1833]
  },
  {
    id: 27, cat: 'evento', emoji: '⚔️', color: '#52a0e0',
    nombre: 'Fiestas de los Historiantes',
    lugar: 'Cuisnahuat, Sonsonate',
    coords: [13.6667, -89.7333]
  },
  {
    id: 28, cat: 'gastronomia', emoji: '🟢', color: '#e05252',
    nombre: 'Festival del Jocote Corona',
    lugar: 'Santa Ana, El Salvador',
    coords: [13.8494, -89.6309]
  },
  {
    id: 29, cat: 'evento', emoji: '💀', color: '#52a0e0',
    nombre: 'Día de la Calabiuza',
    lugar: 'Cuscatlán, El Salvador',
    coords: [13.7825, -89.2614]
  },
  {
    id: 30, cat: 'evento', emoji: '🔥', color: '#52a0e0',
    nombre: 'Día de los Canchules',
    lugar: 'Sensuntepeque, Cabañas',
    coords: [13.8765, -88.6312]
  },
  {
    id: 31, cat: 'evento', emoji: '✝️', color: '#52a0e0',
    nombre: 'Día de la Cruz',
    lugar: 'San Salvador, El Salvador',
    coords: [13.6945, -89.2165]
  },
  {
    id: 32, cat: 'gastronomia', emoji: '🌽', color: '#e05252',
    nombre: 'Festival del Maíz',
    lugar: 'Chalatenango, El Salvador',
    coords: [14.0333, -88.9333]
  },
  {
    id: 33, cat: 'evento', emoji: '🪵', color: '#52a0e0',
    nombre: 'Tradición del Bálsamo',
    lugar: 'Jayaque, La Libertad',
    coords: [13.6738, -89.4420]
  },
  {
    id: 34, cat: 'evento', emoji: '🎭', color: '#52a0e0',
    nombre: 'Tradición de los Encuentros',
    lugar: 'San Antonio del Monte, Sonsonate',
    coords: [13.7188, -89.7432]
  },
  {
    id: 35, cat: 'evento', emoji: '⛵', color: '#52a0e0',
    nombre: 'Fiestas Patronales de La Unión',
    lugar: 'La Unión, El Salvador',
    coords: [13.3372, -87.8447]
  },
  {
    id: 36, cat: 'gastronomia', emoji: '🏮', color: '#e05252',
    nombre: 'Festival de los Farolitos en Ataco',
    lugar: 'Ahuachapán, El Salvador',
    coords: [13.8722, -89.8494]
  },
  {
    id: 37, cat: 'gastronomia', emoji: '🍬', color: '#e05252',
    nombre: 'Festival de la Panela',
    lugar: 'Cuscatlán, El Salvador',
    coords: [13.7155, -88.9348]
  },
  {
    id: 38, cat: 'evento', emoji: '🏹', color: '#52a0e0',
    nombre: 'Fiestas del Rey Guajactial',
    lugar: 'Sonsonate, El Salvador',
    coords: [13.7512, -89.6678]
  },
  {
    id: 39, cat: 'gastronomia', emoji: '🦀', color: '#e05252',
    nombre: 'Festival del Cangrejo',
    lugar: 'La Paz, El Salvador',
    coords: [13.3333, -88.9167]
  },
  {
    id: 40, cat: 'evento', emoji: '🚶', color: '#52a0e0',
    nombre: 'Romería de Esquipulas',
    lugar: 'Chalatenango, El Salvador',
    coords: [14.1167, -88.9333]
  },
  {
    id: 41, cat: 'evento', emoji: '🏺', color: '#52a0e0',
    nombre: 'Festival del Barro',
    lugar: 'Cabañas, El Salvador',
    coords: [13.8422, -88.8508]
  },
  {
    id: 42, cat: 'gastronomia', emoji: '🍚', color: '#e05252',
    nombre: 'Fiestas del Arroz',
    lugar: 'San Vicente, El Salvador',
    coords: [13.7333, -88.75]
  },
  {
    id: 43, cat: 'evento', emoji: '🎭', color: '#52a0e0',
    nombre: 'Festival de las Juventudes',
    lugar: 'El Mozote, Morazán',
    coords: [13.7833, -88.15]
  },
  {
    id: 44, cat: 'gastronomia', emoji: '🍤', color: '#e05252',
    nombre: 'Feria del Marisco',
    lugar: 'Usulután, El Salvador',
    coords: [13.2833, -88.55]
  },
  {
    id: 45, cat: 'evento', emoji: '🌾', color: '#52a0e0',
    nombre: 'Primicia de la Cosecha',
    lugar: 'La Unión, El Salvador',
    coords: [13.3, -87.85]
  },
  {
    id: 46, cat: 'gastronomia', emoji: '🚜', color: '#e05252',
    nombre: 'Carnaval de la Panela',
    lugar: 'Verapaz, San Vicente',
    coords: [13.65, -88.85]
  },
  {
    id: 47, cat: 'gastronomia', emoji: '🌭', color: '#e05252',
    nombre: 'Fiestas de Cojutepeque',
    lugar: 'Cuscatlán, El Salvador',
    coords: [13.7179, -88.9318]
  },
  {
    id: 48, cat: 'evento', emoji: '👕', color: '#52a0e0',
    nombre: 'Festival del Añil',
    lugar: 'Cuscatlán, El Salvador',
    coords: [14.0298, -89.0295]
  },
  {
    id: 49, cat: 'evento', emoji: '🐎', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Gotera',
    lugar: 'Morazán, El Salvador',
    coords: [13.7, -88.1]
  },
  {
    id: 50, cat: 'gastronomia', emoji: '🐷', color: '#e05252',
    nombre: 'Festival del Chicharrón',
    lugar: 'La Libertad, El Salvador',
    coords: [13.6785, -89.2775]
  },
  {
    id: 51, cat: 'cultural', emoji: '🌋', color: '#be8e56',
    nombre: 'El Boquerón',
    lugar: 'Volcán de San Salvador',
    coords: [13.7358, -89.2822]
  },
  {
    id: 52, cat: 'leyenda', emoji: '🪨', color: '#52c07c',
    nombre: 'Puerta del Diablo',
    lugar: 'Los Planes de Renderos',
    coords: [13.6183, -89.1619]
  },
  {
    id: 53, cat: 'cultural', emoji: '🏺', color: '#be8e56',
    nombre: 'Casa Blanca',
    lugar: 'Chalchuapa, Santa Ana',
    coords: [13.9825, -89.6825]
  },
  {
    id: 54, cat: 'cultural', emoji: '🏛️', color: '#be8e56',
    nombre: 'Palacio Nacional',
    lugar: 'Centro Histórico, San Salvador',
    coords: [13.6989, -89.1912]
  },
  {
    id: 55, cat: 'cultural', emoji: '🎭', color: '#be8e56',
    nombre: 'Teatro Nacional',
    lugar: 'Centro Histórico, San Salvador',
    coords: [13.6976, -89.1923]
  },
  {
    id: 56, cat: 'cultural', emoji: '⛪', color: '#be8e56',
    nombre: 'Iglesia El Rosario',
    lugar: 'Centro Histórico, San Salvador',
    coords: [13.6968, -89.1895]
  },
  {
    id: 57, cat: 'evento', emoji: '🎚️', color: '#52a0e0',
    nombre: 'Semana Santa Nacional',
    lugar: 'Catedral Metropolitana',
    coords: [13.6980, -89.1901]
  },
  {
    id: 58, cat: 'evento', emoji: '🔥', color: '#52a0e0',
    nombre: 'Día de la Independencia',
    lugar: 'Plaza Cívica, San Salvador',
    coords: [13.7005, -89.1898]
  },
  {
    id: 59, cat: 'evento', emoji: '🌼', color: '#52a0e0',
    nombre: 'Día de los Difuntos',
    lugar: 'Cementerio General, San Salvador',
    coords: [13.6833, -89.1980]
  },
  {
    id: 60, cat: 'evento', emoji: '🎄', color: '#52a0e0',
    nombre: 'Navidad y Posadas',
    lugar: 'San Salvador',
    coords: [13.6910, -89.2200]
  },
  {
    id: 61, cat: 'historia', emoji: '📜', color: '#7c52e0',
    nombre: 'Monumento a los Próceres',
    lugar: 'Plaza Libertad, San Salvador',
    coords: [13.6960, -89.1885]
  },
  {
    id: 62, cat: 'historia', emoji: '🏛️', color: '#7c52e0',
    nombre: 'Cine Metro',
    lugar: 'Centro Histórico, San Salvador',
    coords: [13.6998, -89.1945]
  },
  {
    id: 63, cat: 'historia', emoji: '🚂', color: '#7c52e0',
    nombre: 'Plaza Ferroviaria',
    lugar: 'Sonsonate',
    coords: [13.7215, -89.7210]
  },
  {
    id: 64, cat: 'historia', emoji: '🎖️', color: '#7c52e0',
    nombre: 'Museo Militar',
    lugar: 'San Jacinto, San Salvador',
    coords: [13.6885, -89.1902]
  },
  {
    id: 65, cat: 'historia', emoji: '🛡️', color: '#7c52e0',
    nombre: 'Sitio Arqueológico Cihuatán',
    lugar: 'Aguilares, San Salvador',
    coords: [13.9612, -89.1685]
  },
  {
    id: 66, cat: 'leyenda', emoji: '💧', color: '#52c07c',
    nombre: 'Laguna de Alegría',
    lugar: 'Usulután',
    coords: [13.4930, -88.4945]
  },
  {
    id: 67, cat: 'leyenda', emoji: '👩', color: '#52c07c',
    nombre: 'Cuyancúa de Izalco',
    lugar: 'Izalco, Sonsonate',
    coords: [13.7485, -89.6720]
  },
  {
    id: 68, cat: 'leyenda', emoji: '🐾', color: '#52c07c',
    nombre: 'Cerro de las Pavas',
    lugar: 'Cojutepeque, Cuscatlán',
    coords: [13.7198, -88.9372]
  },
  {
    id: 69, cat: 'leyenda', emoji: '🏞️', color: '#52c07c',
    nombre: 'Río Sumpul',
    lugar: 'Chalatenango',
    coords: [14.0720, -88.9510]
  },
  {
    id: 70, cat: 'leyenda', emoji: '👺', color: '#52c07c',
    nombre: 'Llanos de Olocuilta',
    lugar: 'La Paz',
    coords: [13.5650, -89.1180]
  }
];

/* ══════════════════════════════════════════════════════════
   TABLA DE TRADUCCIÓN: SLUG DE SITIO CULTURAL → ID DE LANDMARK
   ══════════════════════════════════════════════════════════ */
const SLUG_TO_LANDMARK_ID = {
  tazumal: 1,
  joya: 2,
  salvador: 3,
  suchitoto: 4,
  catedral: 5,
  muna: 6,
  sanandres: 7,
  casablanca: 53,
  palacionacional: 54,
  teatronacional: 55,
  elrosario: 56
};

/* ══════════════════════════════════════════════════════════
   INICIALIZACIÓN DEL MAPA CON LEAFLET (OPTIMIZADO)
   ══════════════════════════════════════════════════════════ */
const mapa = L.map('mapa-leaflet', {
  center: [13.7, -88.95],
  zoom: 10.45,
  zoomControl: false,
  attributionControl: true,
  fadeAnimation: true,
  zoomAnimation: true,
  markerZoomAnimation: true,
  inertia: true,
  inertiaDeceleration: 3000,
  inertiaMaxSpeed: 1500
});

L.control.zoom({ position: 'bottomright' }).addTo(mapa);

// Capa de tiles optimizada
const tileLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=65f24655-4886-4f79-844c-b55cf976acd3', {
  maxZoom: 16.5,
  updateWhenZooming: false,
  updateWhenIdle: true,
  keepBuffer: 4,
  crossOrigin: true,
  errorTileUrl: '',
  opacity: 1,
  zIndex: 1
}).addTo(mapa);

// ── Preloader y optimización de carga ──
(function initMapOptimizations() {
  const mapContainer = document.getElementById('mapa-leaflet');
  if (!mapContainer) return;

  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'mapa-loading';
  loadingDiv.textContent = 'Cargando mapa...';
  mapContainer.appendChild(loadingDiv);

  let tileLoadCount = 0;
  const totalTilesExpected = 20;

  tileLayer.on('loading', () => {
    loadingDiv.style.display = 'flex';
  });

  tileLayer.on('load', () => {
    tileLoadCount++;
    if (tileLoadCount > 1) {
      loadingDiv.style.display = 'none';
    }
  });

  setTimeout(() => {
    loadingDiv.style.display = 'none';
  }, 5000);

  mapa.on('zoomend moveend', () => {
    loadingDiv.style.display = 'none';
  });

  mapa.whenReady(() => {
    setTimeout(() => invalidateMapSize(), 300);
  });
})();

function invalidateMapSize() {
  if (mapa) {
    requestAnimationFrame(() => {
      mapa.invalidateSize({ animate: true, duration: 0.3 });
    });
  }
}

/* ── Crear ícono personalizado con emoji ── */
function crearIcono(emoji, color) {
  return L.divIcon({
    className: '',
    html: `<div class="custom-marker" style="background:${color};">${emoji}</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17],
    popupAnchor: [0, -20]
  });
}

const CAT_COLORS = {
  cultural:   '#be8e56',
  gastronomia:'#e05252',
  evento:     '#52a0e0',
  historia:   '#7c52e0',
  leyenda:    '#52c07c'
};

/* ── INTERNACIONALIZACIÓN DE ETIQUETAS Y CATEGORÍAS ── */
function obtenerEtiquetaCategoria(cat, forcedLang = null) {
  const lang = forcedLang || (window.SRi18n ? window.SRi18n.getLang() : 'es');
  const claves = {
    cultural: 'cards.sitios',
    gastronomia: 'cards.gastronomia',
    evento: 'nav.eventos',
    historia: 'cards.historia',
    leyenda: 'cards.leyendas'
  };
  return window.SRi18n ? window.SRi18n.t(claves[cat], lang) : cat;
}

function getImgUrl(lm) {
  if (!lm || !lm.id) return '../assets/media/mapa/default.webp';
  return `../assets/media/mapa/${lm.id}.webp?v=1.0.0`;
}

/* ══════════════════════════════════════════════════════════
   SIDEBAR ESTILO GOOGLE MAPS
   ══════════════════════════════════════════════════════════ */
const mapaSection   = document.getElementById('mapaSection');
const mapaSidebar   = document.getElementById('mapaSidebar');
const sidebarClose  = document.getElementById('sidebarClose');
const sbImage       = document.getElementById('sbImage');
const sbEmojiBadge  = document.getElementById('sbEmojiBadge');
const sbCat         = document.getElementById('sbCat');
const sbTitle       = document.getElementById('sbTitle');
const sbPlace       = document.getElementById('sbPlace');
const sbDesc        = document.getElementById('sbDesc');
const sbChips       = document.getElementById('sbChips');
const sbDirections  = document.getElementById('sbDirections');
const sbCenter      = document.getElementById('sbCenter');

let activeMarker = null;
let activeLandmark = null;

/* ══════════════════════════════════════════════════════════
   ABRIR / CERRAR SIDEBAR CON ANIMACIÓN Y PULSO GSAP
   ══════════════════════════════════════════════════════════ */
function abrirSidebar(lm, marker, forcedLang = null) {
  const lang = forcedLang || (window.SRi18n ? window.SRi18n.getLang() : 'es');

  sbImage.src = getImgUrl(lm);
  sbImage.alt = lm.nombre;
  sbEmojiBadge.textContent = lm.emoji;
  sbEmojiBadge.style.background = lm.color;
  sbCat.textContent = `${lm.emoji} ${obtenerEtiquetaCategoria(lm.cat, lang)}`;
  sbCat.style.color = CAT_COLORS[lm.cat];

  let tituloTraducido = lm.nombre;
  if (window.SRi18n && lm.id) {
    const tradNombre = window.SRi18n.t(`mapa.puntos.${lm.id}.nombre`, lang);
    if (tradNombre && tradNombre !== `mapa.puntos.${lm.id}.nombre`) {
      tituloTraducido = tradNombre;
    }
  }
  sbTitle.textContent = tituloTraducido;

  let lugarTraducido = lm.lugar;
  if (window.SRi18n && lm.id) {
    const tradLugar = window.SRi18n.t(`mapa.puntos.${lm.id}.lugar`, lang);
    if (tradLugar && tradLugar !== `mapa.puntos.${lm.id}.lugar`) {
      lugarTraducido = tradLugar;
    }
  }
  sbPlace.textContent = lugarTraducido;

  let descFinal = '';
  if (window.SRi18n && lm.id) {
    const tradEv = window.SRi18n.t(`ev.${lm.id}.desc`, lang);
    const tradMapa = window.SRi18n.t(`mapa.puntos.${lm.id}.desc`, lang);
    if (tradEv && tradEv !== `ev.${lm.id}.desc`) {
      descFinal = tradEv;
    } else if (tradMapa && tradMapa !== `mapa.puntos.${lm.id}.desc`) {
      descFinal = tradMapa;
    }
  }
  sbDesc.textContent = descFinal || lm.desc || (lang === 'en' ? 'Description available soon.' : 'Descripción disponible próximamente.');

  let chipsFinales = lm.chips || [];
  if (window.SRi18n && lm.id) {
    const chipsTraducidos = window.SRi18n.t(`mapa.puntos.${lm.id}.chips`, lang);
    if (Array.isArray(chipsTraducidos)) {
      chipsFinales = chipsTraducidos;
    }
  }
  if (chipsFinales.length === 0) {
    chipsFinales = [obtenerEtiquetaCategoria(lm.cat, lang)];
  }
  sbChips.innerHTML = chipsFinales.map(c => `<span class="popup-chip">${c}</span>`).join('');

  if (activeMarker && activeMarker !== marker) {
    if (activeMarker._pulseAnim) {
      activeMarker._pulseAnim.kill();
      activeMarker._pulseAnim = null;
      const oldIcon = activeMarker._icon?.querySelector('.custom-marker');
      if (oldIcon && window.gsap) {
        gsap.set(oldIcon, { scale: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.6)' });
      }
    }
    activeMarker._icon?.querySelector('.custom-marker')?.classList.remove('custom-marker--active');
  }
  activeMarker = marker;
  activeLandmark = lm;
  const iconEl = marker._icon?.querySelector('.custom-marker');
  if (iconEl) {
    iconEl.classList.add('custom-marker--active');
    if (window.gsap) {
      if (marker._pulseAnim) {
        marker._pulseAnim.kill();
        marker._pulseAnim = null;
      }
      gsap.set(iconEl, { scale: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.6)' });
      marker._pulseAnim = gsap.to(iconEl, {
        scale: 1.15,
        boxShadow: '0 0 25px rgba(190,142,86,0.6), 0 0 50px rgba(190,142,86,0.3)',
        duration: 0.8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut'
      });
    }
  }

  mapaSidebar.classList.add('open');
  mapaSidebar.setAttribute('aria-hidden', 'false');
  mapaSection.classList.add('sidebar-open');

  if (window.gsap) {
    gsap.killTweensOf(mapaSidebar);
    gsap.to(mapaSidebar, {
      translateX: 0,
      duration: 0.5,
      ease: 'power3.out',
      onComplete: () => invalidateMapSize()
    });
    const innerContent = mapaSidebar.querySelector('.mapa-sidebar__hero, .mapa-sidebar__body');
    if (innerContent) {
      gsap.fromTo(innerContent,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, delay: 0.15, ease: 'power2.out' }
      );
    }
  } else {
    mapaSidebar.style.transform = 'translateX(0)';
    setTimeout(invalidateMapSize, 350);
  }
}

function cerrarSidebar() {
  if (activeMarker && activeMarker._pulseAnim) {
    activeMarker._pulseAnim.kill();
    activeMarker._pulseAnim = null;
    const iconEl = activeMarker._icon?.querySelector('.custom-marker');
    if (iconEl && window.gsap) {
      gsap.set(iconEl, { scale: 1, boxShadow: '0 4px 12px rgba(0,0,0,0.6)' });
    }
  }

  if (window.gsap) {
    gsap.killTweensOf(mapaSidebar);
    gsap.to(mapaSidebar, {
      translateX: '-100%',
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        mapaSidebar.classList.remove('open');
        mapaSidebar.setAttribute('aria-hidden', 'true');
        mapaSection.classList.remove('sidebar-open');
        if (activeMarker) {
          activeMarker._icon?.querySelector('.custom-marker')?.classList.remove('custom-marker--active');
        }
        activeMarker = null;
        activeLandmark = null;
        setTimeout(invalidateMapSize, 350);
      }
    });
  } else {
    mapaSidebar.classList.remove('open');
    mapaSidebar.setAttribute('aria-hidden', 'true');
    mapaSection.classList.remove('sidebar-open');
    if (activeMarker) {
      activeMarker._icon?.querySelector('.custom-marker')?.classList.remove('custom-marker--active');
    }
    activeMarker = null;
    activeLandmark = null;
    setTimeout(invalidateMapSize, 350);
  }
}

sidebarClose.addEventListener('click', cerrarSidebar);

sbCenter.addEventListener('click', () => {
  if (activeMarker) {
    mapa.flyTo(activeMarker.getLatLng(), 13.6, { animate: true, duration: 1 });
    setTimeout(invalidateMapSize, 500);
  }
});

sbDirections.addEventListener('click', () => {
  if (!activeLandmark) return;
  const [lat, lng] = activeLandmark.coords;
  let url = 'https://www.google.com/maps/dir/?api=1';
  if (miUbicacionActual) {
    const [latOrigen, lngOrigen] = miUbicacionActual;
    url += `&origin=${latOrigen},${lngOrigen}`;
  } else {
    url += '&origin=current';
  }
  url += `&destination=${lat},${lng}`;
  url += '&travelmode=driving';
  window.open(url, '_blank');
});

/* ══════════════════════════════════════════════════════════
   RENDERIZAR MARKERS CON LAYERGROUPS POR CATEGORÍA
   ══════════════════════════════════════════════════════════ */
const markers = [];
const gruposCategoria = {
  cultural: L.layerGroup().addTo(mapa),
  gastronomia: L.layerGroup().addTo(mapa),
  evento: L.layerGroup().addTo(mapa),
  historia: L.layerGroup().addTo(mapa),
  leyenda: L.layerGroup().addTo(mapa)
};

function generarHtmlTooltip(lm, lang) {
  const nameTrad = window.SRi18n ? window.SRi18n.t(`mapa.puntos.${lm.id}.nombre`, lang) : lm.nombre;
  const nombreTooltip = (nameTrad && nameTrad !== `mapa.puntos.${lm.id}.nombre`) ? nameTrad : lm.nombre;

  let catTraducida = obtenerEtiquetaCategoria(lm.cat, lang);
  if (window.SRi18n) {
    const tradCat = window.SRi18n.t(`mapa.categorias.${lm.cat}`, lang);
    if (tradCat && tradCat !== `mapa.categorias.${lm.cat}`) {
      catTraducida = tradCat;
    }
  }

  return `
    <div class="marker-tooltip">
       <img src="${getImgUrl(lm)}" alt="${nombreTooltip}" loading="lazy" />
       <div class="marker-tooltip__info">
         <span class="marker-tooltip__cat" style="color:${CAT_COLORS[lm.cat]}">${lm.emoji} ${catTraducida}</span>
         <span class="marker-tooltip__name">${nombreTooltip}</span>
       </div>
     </div>`;
}

LANDMARKS.forEach(lm => {
  const icono = crearIcono(lm.emoji, lm.color);
  const marker = L.marker(lm.coords, { icon: icono });

  marker._landmarkCat = lm.cat;
  marker._landmarkId  = lm.id;

  const lang = window.SRi18n ? window.SRi18n.getLang() : 'es';
  const htmlInicial = generarHtmlTooltip(lm, lang);

  marker.bindTooltip(htmlInicial, {
    direction: 'top',
    offset: [0, -16],
    opacity: 1,
    className: 'marker-tooltip-wrap',
    sticky: false
  });

  marker.on('click', () => {
    abrirSidebar(lm, marker);
    mapa.flyTo(marker.getLatLng(), 13.6, { animate: true, duration: 1 });
    setTimeout(invalidateMapSize, 500);
  });

  if (gruposCategoria[lm.cat]) {
    gruposCategoria[lm.cat].addLayer(marker);
  } else {
    mapa.addLayer(marker);
  }

  markers.push(marker);
});

let categoriaActiva = 'todas';

function aplicarFiltro(categoria) {
  categoriaActiva = categoria;
  Object.values(gruposCategoria).forEach(grupo => {
    if (mapa.hasLayer(grupo)) {
      mapa.removeLayer(grupo);
    }
  });

  if (categoria === 'todas') {
    Object.values(gruposCategoria).forEach(grupo => {
      mapa.addLayer(grupo);
    });
  } else {
    if (gruposCategoria[categoria]) {
      mapa.addLayer(gruposCategoria[categoria]);
    }
  }

  const searchQuery = document.getElementById('mapSearchInput')?.value?.toLowerCase().trim() || '';
  if (searchQuery) {
    actualizarListaResultados(categoria, searchQuery);
  } else {
    const container = document.getElementById('searchResultsContainer');
    if (container) container.style.display = 'none';
  }
  actualizarContador(categoria);
  setTimeout(invalidateMapSize, 200);
}

function actualizarListaResultados(categoria, query) {
  const lang = window.SRi18n ? window.SRi18n.getLang() : 'es';
  const container = document.getElementById('searchResultsContainer');
  const list = document.getElementById('searchResultsList');
  if (!container || !list) return;

  let resultados = [];
  LANDMARKS.forEach(lm => {
    let nombre = lm.nombre;
    if (window.SRi18n && lm.id) {
      const trad = window.SRi18n.t(`mapa.puntos.${lm.id}.nombre`, lang);
      if (trad && trad !== `mapa.puntos.${lm.id}.nombre`) {
        nombre = trad;
      }
    }
    const matchCat = categoria === 'todas' || lm.cat === categoria;
    const matchSearch = !query || nombre.toLowerCase().includes(query);
    if (matchCat && matchSearch) {
      const marker = markers.find(m => m._landmarkId === lm.id);
      resultados.push({ landmark: lm, marker, nombre });
    }
  });

  if (query && resultados.length > 0) {
    container.style.display = 'block';
    list.innerHTML = resultados.map(r => `
      <li data-landmark-id="${r.landmark.id}">
        <span class="result-emoji">${r.landmark.emoji}</span>
        <span class="result-name">${r.nombre}</span>
        <span class="result-category">${obtenerEtiquetaCategoria(r.landmark.cat, lang)}</span>
      </li>
    `).join('');
    list.querySelectorAll('li').forEach(li => {
      li.addEventListener('click', function() {
        const id = parseInt(this.dataset.landmarkId);
        const lm = LANDMARKS.find(l => l.id === id);
        const marker = markers.find(m => m._landmarkId === id);
        if (lm && marker) {
          container.style.display = 'none';
          mapa.flyTo(marker.getLatLng(), 14, { animate: true, duration: 1 });
          abrirSidebar(lm, marker);
          setTimeout(invalidateMapSize, 500);
        }
      });
    });
  } else if (query && resultados.length === 0) {
    container.style.display = 'block';
    list.innerHTML = `<li class="search-results-empty">No se encontraron lugares con "${query}"</li>`;
  } else {
    container.style.display = 'none';
  }
}

function actualizarContador(categoria) {
  const countEl = document.getElementById('visibleCount');
  if (!countEl) return;
  let total = 0;
  if (categoria === 'todas') {
    total = LANDMARKS.length;
  } else {
    total = LANDMARKS.filter(lm => lm.cat === categoria).length;
  }
  countEl.textContent = total;
}

function actualizarFiltro(cat) {
  aplicarFiltro(cat);
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    actualizarFiltro(btn.dataset.cat);
  });
});

/* ══════════════════════════════════════════════════════════
   BUSCADOR
   ══════════════════════════════════════════════════════════ */
(function initSearch() {
  const searchInput = document.getElementById('mapSearchInput');
  const searchClear = document.getElementById('mapSearchClear');
  if (!searchInput) return;

  let searchTimeout = null;

  function onSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (searchClear) {
      searchClear.style.display = query.length > 0 ? 'block' : 'none';
    }
    const activeCatBtn = document.querySelector('.filter-btn.active');
    const cat = activeCatBtn ? activeCatBtn.dataset.cat : 'todas';
    if (query) {
      actualizarListaResultados(cat, query);
    } else {
      const container = document.getElementById('searchResultsContainer');
      if (container) container.style.display = 'none';
    }
  }

  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(onSearch, 300);
  });

  if (searchClear) {
    searchClear.addEventListener('click', function() {
      searchInput.value = '';
      onSearch();
      searchInput.focus();
    });
  }

  document.addEventListener('langchange', () => {
    if (searchInput.value.trim().length > 0) {
      onSearch();
    }
  });

  actualizarContador('todas');
})();

document.addEventListener('click', function(e) {
  const container = document.getElementById('searchResultsContainer');
  const searchWrapper = document.querySelector('.search-wrapper');
  const filtersFloat = document.getElementById('mapaFiltersFloat');
  if (!container) return;
  if (!container.contains(e.target) && !searchWrapper?.contains(e.target) && !filtersFloat?.contains(e.target)) {
    container.style.display = 'none';
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const container = document.getElementById('searchResultsContainer');
    if (container) container.style.display = 'none';
    document.getElementById('mapSearchInput')?.blur();
  }
});

/* ══════════════════════════════════════════════════════════
   CORRECCIÓN DE CARGA INICIAL ASÍNCRONA PARA I18N
   ══════════════════════════════════════════════════════════ */
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (window.SRi18n) {
      const idiomaDefinitivo = window.SRi18n.getLang();
      if (idiomaDefinitivo !== 'es') {
        markers.forEach(m => {
          const lm = LANDMARKS.find(l => l.id === m._landmarkId);
          if (lm) {
            m.setTooltipContent(generarHtmlTooltip(lm, idiomaDefinitivo));
          }
        });
        if (activeLandmark) {
          abrirSidebar(activeLandmark, activeMarker, idiomaDefinitivo);
        }
      }
    }
    invalidateMapSize();
  }, 200);
});

document.addEventListener("langchange", (e) => {
  const idiomaActual = e.detail.lang;
  if (activeLandmark) {
    abrirSidebar(activeLandmark, activeMarker, idiomaActual);
  }

  markers.forEach(m => {
    const lm = LANDMARKS.find(l => l.id === m._landmarkId);
    if (lm) {
      const nuevoContenido = generarHtmlTooltip(lm, idiomaActual);
      m.setTooltipContent(nuevoContenido);
      if (m.isTooltipOpen && m.isTooltipOpen()) {
        const tooltip = m.getTooltip();
        if (tooltip) tooltip.update();
      }
    }
  });

  const searchInput = document.getElementById('mapSearchInput');
  if (searchInput && searchInput.value.trim().length > 0) {
    const activeCatBtn = document.querySelector('.filter-btn.active');
    const cat = activeCatBtn ? activeCatBtn.dataset.cat : 'todas';
    actualizarListaResultados(cat, searchInput.value.trim().toLowerCase());
  }
  setTimeout(invalidateMapSize, 300);
});

/* ══════════════════════════════════════════════════════════
   PUBLICACIONES DE USUARIOS COMO PINES EN EL MAPA
   Carga todas las publicaciones que tengan lat/lng y las
   muestra con un pin + popup (imagen, título, ubicación,
   autor y link a la publicación). Si la URL trae ?pub=ID,
   centra el mapa y abre esa publicación automáticamente.
   ══════════════════════════════════════════════════════════ */
(function cargarPublicacionesEnMapa() {
  const params = new URLSearchParams(window.location.search);
  const focusPubId = params.get('pub');
  const fallbackLat = parseFloat(params.get('lat'));
  const fallbackLng = parseFloat(params.get('lng'));

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function construirPopupPublicacion(pub) {
    const imagenHtml = pub.image
      ? `<img class="popup-pub-image" src="${escapeHtml(pub.image)}" alt="${escapeHtml(pub.title)}" loading="lazy">`
      : '';

    return `
      ${imagenHtml}
      <div class="popup-inner">
        <p class="popup-cat" style="color: var(--gold);">📍 ${escapeHtml(pub.location)}</p>
        <h3 class="popup-title">${escapeHtml(pub.title)}</h3>
        <p class="popup-desc">${escapeHtml(pub.description)}</p>
        <p class="popup-pub-author">Por ${escapeHtml(pub.author?.name || 'Usuario')}</p>
        <a class="popup-pub-link" href="publicaciones.html" target="_self">Ver todas las publicaciones →</a>
      </div>
    `;
  }

  fetch('/api/publications')
    .then((res) => res.ok ? res.json() : { publications: [] })
    .then((data) => {
      const publicaciones = (data.publications || []).filter(
        (pub) => pub.lat !== null && pub.lat !== undefined && pub.lng !== null && pub.lng !== undefined
      );

      let markerAAbrir = null;

      publicaciones.forEach((pub) => {
        const marker = L.marker([pub.lat, pub.lng], {
          icon: crearIcono('📍', '#be8e56')
        }).addTo(mapa);

        marker.bindPopup(construirPopupPublicacion(pub), { maxWidth: 300 });

        if (focusPubId && String(pub.id) === String(focusPubId)) {
          markerAAbrir = marker;
        }
      });

      if (markerAAbrir) {
        mapa.setView(markerAAbrir.getLatLng(), 14.5, { animate: true });
        setTimeout(() => markerAAbrir.openPopup(), 400);
      } else if (!Number.isNaN(fallbackLat) && !Number.isNaN(fallbackLng)) {
        // Publicación no encontrada por id, pero venían coordenadas en la URL:
        // se centra ahí igualmente para no perder el contexto del enlace.
        mapa.setView([fallbackLat, fallbackLng], 13.9, { animate: true });
      }

      setTimeout(invalidateMapSize, 500);
    })
    .catch((error) => {
      console.error('No se pudieron cargar las publicaciones en el mapa:', error);
    });
})();

/* ══════════════════════════════════════════════════════════
   BOTÓN "VOLVER"
   ══════════════════════════════════════════════════════════ */
(function configurarBotonVolver() {
  const params = new URLSearchParams(window.location.search);
  const from = params.get('from');
  const backBtn = document.getElementById('mapaBackBtn');
  const backBtnLabel = document.getElementById('mapaBackBtnLabel');
  if (!from || !backBtn) return;
  const esRutaSegura = /^[a-zA-Z0-9_\-]+\.html$/.test(from);
  if (!esRutaSegura) return;
  const etiquetas = {
    'calendario.html': 'Volver al calendario',
    'sitios-culturales.html': 'Volver a sitios culturales',
    'gastronomia.html': 'Volver a gastronomía',
    'eventos.html': 'Volver a eventos',
    'historia.html': 'Volver a historia',
    'leyendas.html': 'Volver a leyendas'
  };
  backBtnLabel.textContent = etiquetas[from] || 'Volver';
  backBtn.style.display = 'flex';
  backBtn.addEventListener('click', () => {
    window.location.href = from;
  });
})();

/* ══════════════════════════════════════════════════════════
   TABLA DE TRADUCCIÓN: EVENTO DEL CALENDARIO → LANDMARK REAL
   ══════════════════════════════════════════════════════════ */
const TRADUCTOR_A_LANDMARK = {
  3: 46, 5: 31, 8: 23, 10: 21, 12: 28, 13: 47, 16: 59, 17: 48, 22: 22,
  24: 48, 25: 28, 26: 34, 28: 59, 29: 41, 30: 49, 31: 27, 32: 26,
  34: 50, 35: 35, 36: 60, 39: 4, 40: 33, 41: 40, 42: 38, 43: 43,
  44: 45, 45: 57, 46: 58, 47: 25
};

/* ══════════════════════════════════════════════════════════
   RESALTAR LANDMARK DESDE URL
   ══════════════════════════════════════════════════════════ */
(function resaltarLandmarkDesdeURL() {
  window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    const latParam = params.get('lat');
    const lngParam = params.get('lng');
    const eventoParam = params.get('evento');
    const sitioParam = params.get('sitio');

    if (eventoParam && !latParam) {
      const idLandmarkDirecto = parseInt(eventoParam, 10);
      const lmDirecto = LANDMARKS.find(l => l.id === idLandmarkDirecto);
      if (lmDirecto) {
        const targetMarker = markers.find(m => m._landmarkId === lmDirecto.id);
        if (targetMarker) {
          const iconoDestacado = L.divIcon({
            className: '',
            html: `
              <div class="custom-marker custom-marker--highlight" style="background:${lmDirecto.color};">
                ${lmDirecto.emoji}
                <span class="marker-pulse-ring"></span>
              </div>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17],
            popupAnchor: [0, -20]
          });
          targetMarker.setIcon(iconoDestacado);
          targetMarker.setZIndexOffset(1000);
          mapa.setView(targetMarker.getLatLng(), 14, { animate: true });
          abrirSidebar(lmDirecto, targetMarker);
          setTimeout(invalidateMapSize, 500);
        }
      }
      return;
    }

    if (latParam && lngParam) {
      const lat = parseFloat(latParam);
      const lng = parseFloat(lngParam);
      if (!isNaN(lat) && !isNaN(lng)) {
        let lmCercano = null;
        let minDist = 0.02;
        LANDMARKS.forEach(l => {
          const dist = Math.sqrt(Math.pow(l.coords[0] - lat, 2) + Math.pow(l.coords[1] - lng, 2));
          if (dist < minDist) {
            minDist = dist;
            lmCercano = l;
          }
        });
        if (lmCercano) {
          const targetMarker = markers.find(m => m._landmarkId === lmCercano.id);
          if (targetMarker) {
            const iconoDestacado = L.divIcon({
              className: '',
              html: `
                <div class="custom-marker custom-marker--highlight" style="background:${lmCercano.color};">
                  ${lmCercano.emoji}
                  <span class="marker-pulse-ring"></span>
                </div>`,
              iconSize: [34, 34],
              iconAnchor: [17, 17],
              popupAnchor: [0, -20]
            });
            targetMarker.setIcon(iconoDestacado);
            targetMarker.setZIndexOffset(1000);
            mapa.setView(targetMarker.getLatLng(), 14, { animate: true });
            abrirSidebar(lmCercano, targetMarker);
            setTimeout(invalidateMapSize, 500);
          }
        }
      }
    }

    if (sitioParam && typeof SLUG_TO_LANDMARK_ID !== 'undefined') {
      const idDestino = SLUG_TO_LANDMARK_ID[sitioParam];
      if (idDestino) {
        const lm = LANDMARKS.find(l => l.id === idDestino);
        if (lm) {
          const targetMarker = markers.find(m => m._landmarkId === lm.id);
          if (targetMarker) {
            const iconoDestacado = L.divIcon({
              className: '',
              html: `
                <div class="custom-marker custom-marker--highlight" style="background:${lm.color};">
                  ${lm.emoji}
                  <span class="marker-pulse-ring"></span>
                </div>`,
              iconSize: [34, 34],
              iconAnchor: [17, 17],
              popupAnchor: [0, -20]
            });
            targetMarker.setIcon(iconoDestacado);
            targetMarker.setZIndexOffset(1000);
            mapa.setView(targetMarker.getLatLng(), 14, { animate: true });
            abrirSidebar(lm, targetMarker);
            setTimeout(invalidateMapSize, 500);
          }
        }
      }
    }
  });
})();

/* ══════════════════════════════════════════════════════════
   MOSTRAR / OCULTAR BARRA DE FILTROS
   ══════════════════════════════════════════════════════════ */
const filtersToggle = document.getElementById('filtersToggle');
const mapaFiltersFloat = document.getElementById('mapaFiltersFloat');
if (filtersToggle && mapaFiltersFloat) {
  filtersToggle.addEventListener('click', () => {
    const isCollapsed = mapaFiltersFloat.classList.toggle('collapsed');
    filtersToggle.setAttribute('aria-expanded', String(!isCollapsed));
    filtersToggle.setAttribute('aria-label', isCollapsed ? 'Mostrar filtros' : 'Ocultar filtros');
    setTimeout(invalidateMapSize, 300);
  });
}
/* ══════════════════════════════════════════════════════════
   GEOLOCALIZACIÓN Y GESTIÓN RECURRENTE DE PERMISOS
   ══════════════════════════════════════════════════════════ */
let miUbicacionActual = null;
let marcadorUbicacion = null;
let watchId = null;
let toastTimeout = null;

const btnCentrar = document.getElementById('btn-mi-ubicacion');

// ── Inyectar estilos (marcador, banner y modal) ──
(function injectUserMarkerStyles() {
  if (!document.getElementById('user-marker-styles')) {
    const style = document.createElement('style');
    style.id = 'user-marker-styles';
    style.textContent = `
      .user-location-marker { background: none; border: none; }
      .user-pulse {
        width: 20px; height: 20px;
        background: #be8e56; border-radius: 50%;
        box-shadow: 0 0 0 0 rgba(190, 142, 86, 0.7);
        animation: userPulse 1.5s infinite;
      }
      @keyframes userPulse {
        0% { box-shadow: 0 0 0 0 rgba(190, 142, 86, 0.7); }
        70% { box-shadow: 0 0 0 15px rgba(190, 142, 86, 0); }
        100% { box-shadow: 0 0 0 0 rgba(190, 142, 86, 0); }
      }
      .geo-floating-banner {
        position: absolute;
        bottom: 30px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1000;
        background: rgba(30, 30, 42, 0.95);
        color: #fff;
        padding: 8px 16px;
        border-radius: 30px;
        border: 1px solid rgba(190, 142, 86, 0.4);
        display: flex;
        align-items: center;
        gap: 12px;
        box-shadow: 0 6px 20px rgba(0,0,0,0.5);
        backdrop-filter: blur(8px);
        font-size: 0.88rem;
      }
      .geo-floating-banner button {
        background: #be8e56;
        color: #fff;
        border: none;
        padding: 6px 14px;
        border-radius: 20px;
        font-weight: 600;
        cursor: pointer;
        transition: transform 0.2s, background 0.2s;
      }
      .geo-floating-banner button:hover {
        background: #a67848;
        transform: scale(1.04);
      }
      .geo-consent-modal {
        position: fixed;
        top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.75);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        backdrop-filter: blur(4px);
      }
      .geo-consent-modal-content {
        background: #1e1e2a;
        color: #fff;
        padding: 2rem;
        border-radius: 16px;
        max-width: 420px;
        width: 90%;
        text-align: center;
        box-shadow: 0 10px 40px rgba(0,0,0,0.6);
        border: 1px solid rgba(255,255,255,0.08);
      }
      .geo-consent-modal-content h3 { margin-top: 0; font-size: 1.3rem; color: #f0e6d3; }
      .geo-consent-buttons { display: flex; gap: 0.8rem; justify-content: center; }
      .geo-consent-btn {
        padding: 0.6rem 1.4rem; border: none; border-radius: 40px;
        font-size: 0.95rem; font-weight: 600; cursor: pointer;
        transition: transform 0.2s, background 0.2s;
      }
      .geo-consent-btn.allow { background: #be8e56; color: #fff; }
      .geo-consent-btn.allow:hover { background: #a67848; transform: scale(1.03); }
      .geo-consent-btn.deny { background: #3a3a4a; color: #ccc; }
      .geo-consent-btn.deny:hover { background: #4a4a5a; transform: scale(1.03); }
    `;
    document.head.appendChild(style);
  }
})();

// ── Toast Notificador ──
function mostrarToast(mensaje, tipo = 'info') {
  const existente = document.querySelector('.geo-toast');
  if (existente) existente.remove();
  const toast = document.createElement('div');
  toast.className = `geo-toast geo-toast--${tipo}`;
  toast.innerHTML = `<span class="geo-toast__icon">${tipo === 'error' ? '⚠️' : 'ℹ️'}</span><span class="geo-toast__msg">${mensaje}</span>`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('geo-toast--visible'));
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('geo-toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, 6000);
}

// ── Banner Flotante ──
function mostrarBannerGeo(esDenegado = false) {
  let banner = document.getElementById('geoFloatingBanner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'geoFloatingBanner';
    banner.className = 'geo-floating-banner';
    const mapSection = document.getElementById('mapaSection') || document.body;
    mapSection.appendChild(banner);
  }
  
  banner.innerHTML = `
    <span>📍 ${esDenegado ? 'Ubicación deshabilitada' : 'Activa tu ubicación para ver sitios cercanos'}</span>
    <button id="btnGeoBannerActivar" type="button">${esDenegado ? '¿Cómo activar?' : 'Habilitar ubicación'}</button>
  `;
  banner.style.display = 'flex';

  const btnActivar = document.getElementById('btnGeoBannerActivar');
  if (btnActivar) {
    btnActivar.onclick = (e) => {
      e.preventDefault();
      solicitarUbicacionConVerificacion(true);
    };
  }
}

function ocultarBannerGeo() {
  const banner = document.getElementById('geoFloatingBanner');
  if (banner) banner.style.display = 'none';
}

// ── Modal de Instrucciones para Permisos Bloqueados ──
function mostrarModalInstrucciones() {
  let modal = document.getElementById('geoConsentModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'geoConsentModal';
    modal.className = 'geo-consent-modal';
    document.body.appendChild(modal);
  }
  
  modal.innerHTML = `
    <div class="geo-consent-modal-content">
      <h3>🔒 Habilitar permisos del navegador</h3>
      <p style="text-align: left; font-size: 0.9rem; margin-bottom: 0.8rem; color: #d0c8b8;">
        Los permisos están bloqueados en tu navegador. Sigue estos pasos para activarlos:
      </p>
      <ol style="text-align: left; font-size: 0.85rem; color: #d0c8b8; padding-left: 1.2rem; line-height: 1.6; margin-bottom: 1.2rem;">
        <li>Haz clic en el icono de <b>candado 🔒</b> o ajustes junto a la URL arriba.</li>
        <li>Busca <b>Permisos del sitio</b> o <b>Ubicación</b>.</li>
        <li>Cambia la opción a <b>Permitir</b>.</li>
      </ol>
      <div class="geo-consent-buttons">
        <button id="geoRetryBtn" class="geo-consent-btn allow" type="button">Probar de nuevo</button>
        <button id="geoCloseInst" class="geo-consent-btn deny" type="button">Cerrar</button>
      </div>
    </div>
  `;
  modal.style.display = 'flex';

  document.getElementById('geoRetryBtn').onclick = () => {
    modal.style.display = 'none';
    solicitarUbicacionConVerificacion(true);
  };

  document.getElementById('geoCloseInst').onclick = () => {
    modal.style.display = 'none';
  };
}

// ── Solicitud y Verificación en Tiempo Real ──
function solicitarUbicacionConVerificacion(centrar = true) {
  if (!navigator.geolocation) {
    mostrarToast('Tu navegador no soporta geolocalización.', 'error');
    return;
  }

  if (navigator.permissions && navigator.permissions.query) {
    navigator.permissions.query({ name: 'geolocation' }).then((perm) => {
      if (perm.state === 'denied') {
        mostrarBannerGeo(true);
        mostrarModalInstrucciones();
      } else {
        ejecutarGeolocalizacion(centrar);
      }
    }).catch(() => {
      ejecutarGeolocalizacion(centrar);
    });
  } else {
    ejecutarGeolocalizacion(centrar);
  }
}

function ejecutarGeolocalizacion(centrar = true) {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      miUbicacionActual = [userLat, userLng];

      if (marcadorUbicacion) mapa.removeLayer(marcadorUbicacion);
      ocultarBannerGeo();

      const userMarkerIcon = L.divIcon({
        className: 'user-location-marker',
        html: '<div class="user-pulse"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      marcadorUbicacion = L.marker(miUbicacionActual, { icon: userMarkerIcon })
        .addTo(mapa)
        .bindPopup('<b style="color:#be8e56;">¡Estás aquí!</b>');

      if (centrar) {
        mapa.flyTo(miUbicacionActual, 14, { animate: true, duration: 1.5 });
        setTimeout(invalidateMapSize, 800);
      }

      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          miUbicacionActual = [pos.coords.latitude, pos.coords.longitude];
          if (marcadorUbicacion) marcadorUbicacion.setLatLng(miUbicacionActual);
        },
        null,
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );

      mostrarToast('Ubicación activada correctamente.', 'info');
    },
    (err) => {
      console.warn('Error al obtener geolocalización:', err);
      mostrarBannerGeo(true);
      if (err.code === err.PERMISSION_DENIED) {
        mostrarModalInstrucciones();
      } else {
        mostrarToast('No se pudo obtener tu posición actual.', 'error');
      }
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 }
  );
}

// ── Escuchar cambios nativos del navegador ──
if (navigator.permissions && navigator.permissions.query) {
  navigator.permissions.query({ name: 'geolocation' }).then((perm) => {
    perm.onchange = () => {
      if (perm.state === 'granted') {
        solicitarUbicacionConVerificacion(false);
      } else if (perm.state === 'denied') {
        mostrarBannerGeo(true);
      } else {
        mostrarBannerGeo(false);
      }
    };
  }).catch(() => {});
}

// ── Botón Diana ──
if (btnCentrar) {
  btnCentrar.addEventListener('click', () => {
    if (miUbicacionActual) {
      mapa.flyTo(miUbicacionActual, 14, { animate: true, duration: 1.2 });
      setTimeout(invalidateMapSize, 500);
    } else {
      solicitarUbicacionConVerificacion(true);
    }
  });
}

// ── Carga Inicial ──
solicitarUbicacionConVerificacion(false);

// ── Redimensionar ──
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    invalidateMapSize();
  }, 200);
});

console.log('mapa.js cargado correctamente - Geolocalización dinámica ajustada');