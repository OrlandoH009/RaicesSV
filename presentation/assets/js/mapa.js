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
   INICIALIZACIÓN DEL MAPA CON LEAFLET
   ══════════════════════════════════════════════════════════ */
const mapa = L.map('mapa-leaflet', {
  center: [13.7, -88.95],
  zoom: 10.45,
  zoomControl: false,
  attributionControl: true
});

L.control.zoom({ position: 'bottomright' }).addTo(mapa);

L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=65f24655-4886-4f79-844c-b55cf976acd3', {
  maxZoom: 16.5,
  updateWhenZooming: false, 
  keepBuffer: 8,           
}).addTo(mapa);

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

/* ── IMAGEN DE REFERENCIA POR LUGAR ── */
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
    activeMarker._icon?.querySelector('.custom-marker')?.classList.remove('custom-marker--active');
  }
  activeMarker = marker;
  activeLandmark = lm;
  marker._icon?.querySelector('.custom-marker')?.classList.add('custom-marker--active');

  mapaSidebar.classList.add('open');
  mapaSidebar.setAttribute('aria-hidden', 'false');
  mapaSection.classList.add('sidebar-open');

  setTimeout(() => mapa.invalidateSize(), 380);
}

function cerrarSidebar() {
  mapaSidebar.classList.remove('open');
  mapaSidebar.setAttribute('aria-hidden', 'true');
  mapaSection.classList.remove('sidebar-open');
  if (activeMarker) {
    activeMarker._icon?.querySelector('.custom-marker')?.classList.remove('custom-marker--active');
  }
  activeMarker = null;
  activeLandmark = null;
  setTimeout(() => mapa.invalidateSize(), 380);
}

sidebarClose.addEventListener('click', cerrarSidebar);

sbCenter.addEventListener('click', () => {
  if (activeMarker) {
    mapa.setView(activeMarker.getLatLng(), 13.4, { animate: true });
  }
});

sbDirections.addEventListener('click', () => {
  if (!activeLandmark) return;
  const [lat, lng] = activeLandmark.coords;
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
});

/* ── Renderizar markers ── */
const markers = [];

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
  const marker = L.marker(lm.coords, { icon: icono }).addTo(mapa);

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
    mapa.setView(marker.getLatLng(), 13.4, { animate: true });
  });
  markers.push(marker);
});

/* ── Corrección de carga inicial asíncrona para i18n ── */
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
  }, 100); 
});

/* ── Escuchador global de cambio de idioma (i18n.js Sync) ── */
document.addEventListener("langchange", (e) => {
  const idiomaActual = e.detail.lang;

  if (activeLandmark) {
    abrirSidebar(activeLandmark, activeMarker, idiomaActual);
  }

  markers.forEach(m => {
    const lm = LANDMARKS.find(l => l.id === m._landmarkId);
    if (lm) {
      const nameTrad = window.SRi18n ? window.SRi18n.t(`mapa.puntos.${lm.id}.nombre`, idiomaActual) : lm.nombre;
      const nombreTooltip = (nameTrad && nameTrad !== `mapa.puntos.${lm.id}.nombre`) ? nameTrad : lm.nombre;

      let catTraducida = obtenerEtiquetaCategoria(lm.cat, idiomaActual);
      if (window.SRi18n) {
        const tradCat = window.SRi18n.t(`mapa.categorias.${lm.cat}`, idiomaActual);
        if (tradCat && tradCat !== `mapa.categorias.${lm.cat}`) {
          catTraducida = tradCat;
        }
      }

      const nuevoContenido = `
        <div class="marker-tooltip">
           <img src="${getImgUrl(lm)}" alt="${nombreTooltip}" loading="lazy" />
           <div class="marker-tooltip__info">
             <span class="marker-tooltip__cat" style="color:${CAT_COLORS[lm.cat]}">${lm.emoji} ${catTraducida}</span>
             <span class="marker-tooltip__name">${nombreTooltip}</span>
           </div>
         </div>`;

      m.setTooltipContent(nuevoContenido);

      if (m.isTooltipOpen && m.isTooltipOpen()) {
        const tooltip = m.getTooltip();
        if (tooltip) {
          tooltip.update();
        }
      }
    }
  });
});

(function manejarPublicacionDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  const location = params.get('location');
  const latParam = params.get('lat');
  const lngParam = params.get('lng');

  if (!location || !latParam || !lngParam) return;

  const lat = parseFloat(latParam);
  const lng = parseFloat(lngParam);

  if (Number.isNaN(lat) || Number.isNaN(lng)) return;

  const marker = L.marker([lat, lng], {
    icon: crearIcono('📍', '#be8e56')
  }).addTo(mapa);

  marker.bindPopup(`<b>${location}</b><br>Publicación seleccionada`).openPopup();
  mapa.setView([lat, lng], 13.9, { animate: true });
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
  3: 46, 5: 31, 8: 23, 9: 32, 10: 21, 12: 28, 13: 47, 14: 30, 
  16: 59, 17: 48, 18: 26, 20: 60, 21: 30, 22: 22, 23: 29, 24: 48, 
  25: 28, 26: 34, 27: 29, 28: 59, 29: 41, 30: 49, 31: 27, 32: 26, 
  33: 30, 34: 50, 35: 35, 36: 60, 37: 42, 38: 24
};

(function resaltarLandmarkDesdeURL() {
  window.addEventListener('load', () => {
    const params = new URLSearchParams(window.location.search);
    const latParam = params.get('lat');
    const lngParam = params.get('lng');
    const nombreEventoParam = params.get('nombreEvento');
    const eventoIdParam = params.get('eventoId');
    const descParam = params.get('desc');
    const deptoParam = params.get('depto');
    const sitioParam = params.get('sitio');

    if (latParam && lngParam) {
      const lat = parseFloat(latParam);
      const lng = parseFloat(lngParam);
      const idEvento = eventoIdParam ? parseInt(eventoIdParam, 10) : null;

      if (!isNaN(lat) && !isNaN(lng)) {
        const idLandmarkReal = idEvento ? TRADUCTOR_A_LANDMARK[idEvento] : null;
        const landmarkReal = idLandmarkReal ? LANDMARKS.find(l => l.id === idLandmarkReal) : null;

        let lmEvento;
        if (landmarkReal) {
          lmEvento = landmarkReal;
        } else {
          const nombreMostrar = nombreEventoParam ? decodeURIComponent(nombreEventoParam) : 'Evento del calendario';
          const descMostrar = descParam ? decodeURIComponent(descParam) : 'Festividad cultural del calendario de RaicesSV.';
          const deptoMostrar = deptoParam ? decodeURIComponent(deptoParam) : 'El Salvador';

          lmEvento = {
            id: idEvento,
            cat: 'evento',
            emoji: '🎉',
            color: CAT_COLORS.evento,
            nombre: nombreMostrar,
            lugar: deptoMostrar,
            desc: descMostrar,
            chips: ['Evento del calendario'],
            coords: [lat, lng]
          };
        }

        let targetMarker = markers.find(m => m._landmarkId === lmEvento.id && lmEvento.id !== null);

        if (!targetMarker) {
          const iconoNuevo = L.divIcon({
            className: '',
            html: `
              <div class="custom-marker custom-marker--highlight" style="background:${lmEvento.color};">
                ${lmEvento.emoji}
                <span class="marker-pulse-ring"></span>
              </div>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17],
            popupAnchor: [0, -20]
          });

          targetMarker = L.marker(lmEvento.coords, { icon: iconoNuevo }).addTo(mapa);
          targetMarker._landmarkCat = lmEvento.cat;
          targetMarker._landmarkId  = lmEvento.id;

          targetMarker.bindTooltip(
            `<div class="marker-tooltip">
               <img src="${getImgUrl(lmEvento)}" alt="${lmEvento.nombre}" loading="lazy" />
               <div class="marker-tooltip__info">
                 <span class="marker-tooltip__cat" style="color:${CAT_COLORS[lmEvento.cat]}">${lmEvento.emoji} ${obtenerEtiquetaCategoria(lmEvento.cat)}</span>
                 <span class="marker-tooltip__name">${lmEvento.nombre}</span>
               </div>
             </div>`,
            { direction: 'top', offset: [0, -16], opacity: 1, className: 'marker-tooltip-wrap', sticky: false }
          );

          targetMarker.on('click', () => {
            abrirSidebar(lmEvento, targetMarker);
            mapa.panTo(targetMarker.getLatLng(), { animate: true, duration: 0.8 });
          });

          markers.push(targetMarker);
        } else {
          const iconoDestacado = L.divIcon({
            className: '',
            html: `
              <div class="custom-marker custom-marker--highlight" style="background:${lmEvento.color};">
                ${lmEvento.emoji}
                <span class="marker-pulse-ring"></span>
              </div>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17],
            popupAnchor: [0, -20]
          });
          targetMarker.setIcon(iconoDestacado);
        }

        targetMarker.setZIndexOffset(1000);
        mapa.setView(targetMarker.getLatLng(), 14, { animate: true });
        abrirSidebar(lmEvento, targetMarker);
      }
      return;
    }

    if (sitioParam && typeof SLUG_TO_LANDMARK_ID !== 'undefined') {
      const idDestinoMapa = SLUG_TO_LANDMARK_ID[sitioParam];
      if (!idDestinoMapa) return;

      const lm = LANDMARKS.find(l => l.id === idDestinoMapa);
      if (!lm) return;

      const targetMarker = markers.find(m => m._landmarkId === lm.id);
      if (!targetMarker) return;

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
  });
}

/* ══════════════════════════════════════════════════════════
   FILTROS INTERACTIVOS
   ══════════════════════════════════════════════════════════ */
let catActiva = 'todas';
const countEl = document.getElementById('visibleCount');

function actualizarFiltro(cat) {
  catActiva = cat;
  let visible = 0;

  markers.forEach(m => {
    if (cat === 'todas' || m._landmarkCat === cat) {
      m.addTo(mapa);
      visible++;
    } else {
      mapa.removeLayer(m);
    }
  });

  if (countEl) countEl.textContent = visible;
}

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    actualizarFiltro(btn.dataset.cat);
  });
});

/* ══════════════════════════════════════════════════════════
   GEOLOCALIZACIÓN AUTOMÁTICA Y BOTÓN DE CENTRADO
   ══════════════════════════════════════════════════════════ */
let miUbicacionActual = null;

function mostrarToastGeo(mensaje, tipo = 'info') {
  const existente = document.querySelector('.geo-toast');
  if (existente) existente.remove();

  const toast = document.createElement('div');
  toast.className = `geo-toast geo-toast--${tipo}`;
  toast.innerHTML = `
    <span class="geo-toast__icon">${tipo === 'error' ? '📍' : 'ℹ️'}</span>
    <span class="geo-toast__msg">${mensaje}</span>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('geo-toast--visible'));

  setTimeout(() => {
    toast.classList.remove('geo-toast--visible');
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

function obtenerYCentrarUbicacion(debeCentrar = false) {
  const params = new URLSearchParams(window.location.search);
  const tieneDestino = params.has('evento') || params.has('sitio') || params.has('nombre')
    || params.has('eventoId') || (params.has('lat') && params.has('lng'));

  if (tieneDestino && !debeCentrar) {
    console.log("Geolocalización en segundo plano: Omitiendo centrado para preservar destino URL.");
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        miUbicacionActual = [userLat, userLng];

        const userMarkerIcon = L.divIcon({
          className: 'user-location-marker',
          html: '<div class="user-pulse"></div>',
          iconSize: [20, 20],
          iconAnchor: [10, 10]
        });

        L.marker(miUbicacionActual, { icon: userMarkerIcon })
          .addTo(mapa)
          .bindPopup('<b style="color:#be8e56;">¡Estás aquí!</b>');

        if (debeCentrar || !tieneDestino) {
          mapa.flyTo(miUbicacionActual, 13.9, { animate: true, duration: 1.5 });
        }
      },
      (error) => {
        console.warn("Geolocalización no disponible.", error);
        let mensaje = 'No pudimos obtener tu ubicación.';
        if (error.code === error.PERMISSION_DENIED) {
          mensaje = 'No se pudo acceder a tu ubicación porque el permiso fue denegado.';
        }
        
        if (!tieneDestino || debeCentrar) {
          mostrarToastGeo(mensaje, 'error');
        }
      },
      { enableHighAccuracy: true, timeout: 6000, maximumAge: 0 }
    );
  } else if (!tieneDestino || debeCentrar) {
    mostrarToastGeo('Tu navegador no soporta geolocalización.', 'error');
  }
}

// Inicialización
obtenerYCentrarUbicacion(false);

const btnMiUbicacion = document.getElementById('btn-mi-ubicacion');
if (btnMiUbicacion) {
  btnMiUbicacion.addEventListener('click', () => {
    if (miUbicacionActual) {
      mapa.flyTo(miUbicacionActual, 14, { animate: true, duration: 1.2 });
    } else {
      mostrarToastGeo('Buscando tu ubicación exacta...', 'info');
      obtenerYCentrarUbicacion(true);
    }
  });
}

/* ══════════════════════════════════════════════════════════
   INTEGRACIÓN CON CHATBOT
   ══════════════════════════════════════════════════════════ */
(function integrarConChatbot() {
  document.addEventListener('rs-chat-location', (e) => {
    const { lat, lng, nombre } = e.detail;
    if (!lat || !lng) return;
    
    let lm = LANDMARKS.find(l => 
      Math.abs(l.coords[0] - lat) < 0.01 && 
      Math.abs(l.coords[1] - lng) < 0.01
    );
    
    if (!lm) {
      lm = {
        id: Date.now(),
        cat: 'cultural',
        emoji: '📍',
        color: '#be8e56',
        nombre: nombre || 'Lugar destacado',
        lugar: 'El Salvador',
        coords: [lat, lng],
        desc: 'Lugar recomendado por Pupusita.',
        chips: ['Recomendado por Pupusita']
      };
    }
    
    let marker = markers.find(m => m._landmarkId === lm.id);
    if (!marker) {
      const icono = crearIcono(lm.emoji, lm.color);
      marker = L.marker(lm.coords, { icon: icono }).addTo(mapa);
      marker._landmarkCat = lm.cat;
      marker._landmarkId = lm.id;
      
      const lang = window.SRi18n ? window.SRi18n.getLang() : 'es';
      marker.bindTooltip(
        `<div class="marker-tooltip">
           <div class="marker-tooltip__info">
             <span class="marker-tooltip__cat" style="color:${lm.color}">${lm.emoji} ${lm.cat}</span>
             <span class="marker-tooltip__name">${lm.nombre}</span>
           </div>
         </div>`,
        { direction: 'top', offset: [0, -16], opacity: 1, className: 'marker-tooltip-wrap', sticky: false }
      );
      
      marker.on('click', () => {
        abrirSidebar(lm, marker);
        mapa.setView(marker.getLatLng(), 13.4, { animate: true });
      });
      
      markers.push(marker);
    }
    
    if (marker) {
      mapa.setView([lat, lng], 13.4, { animate: true, duration: 1 });
      setTimeout(() => {
        abrirSidebar(lm, marker);
        marker._icon?.querySelector('.custom-marker')?.classList.add('custom-marker--highlight');
        setTimeout(() => {
          marker._icon?.querySelector('.custom-marker')?.classList.remove('custom-marker--highlight');
        }, 3000);
      }, 500);
    }
  });
})();