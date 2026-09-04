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
    id: 12, cat: 'cultural', emoji: '⛲', color: '#be8e56',
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
    id: 15, cat: 'cultural', emoji: '✝️', color: '#be8e56',
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
    lugar: 'Panchimalco, San Salvador',
    coords: [13.6158, -89.1797]
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
    lugar: 'Tonacatepeque, San Salvador',
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
    id: 36, cat: 'evento', emoji: '🏮', color: '#52a0e0',
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
    id: 65, cat: 'cultural', emoji: '🛡️', color: '#be8e56',
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
  },
  {
    id: 71, cat: 'evento', emoji: '☕', color: '#52a0e0',
    nombre: 'Festival de Invierno de Perquín',
    lugar: 'Perquín, Morazán',
    desc: 'Festival de cuatro días en las montañas de Morazán con danzas folclóricas, feria del café, artesanías, caminatas y gastronomía típica. Se celebra la primera semana de agosto.',
    coords: [13.9667, -88.1667]
  },
  {
    id: 72, cat: 'evento', emoji: '🪢', color: '#52a0e0',
    nombre: 'Feria de la Hamaca',
    lugar: 'San Sebastián, San Vicente',
    desc: 'Feria en el pueblo cuna de las hamacas tejidas a mano de El Salvador, con exhibiciones de tejedores artesanales y venta de textiles tradicionales.',
    coords: [13.8500, -88.8167]
  },
  {
    id: 73, cat: 'evento', emoji: '🔥', color: '#52a0e0',
    nombre: 'Bolas de Fuego de Nejapa',
    lugar: 'Nejapa, San Salvador',
    desc: 'Tradición declarada Bien Cultural que conmemora la erupción del volcán de 1658, con una batalla nocturna de bolas de trapo encendidas entre los "boleros" del distrito de Nejapa.',
    coords: [13.7864, -89.2508]
  },
  {
    id: 74, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Santa Tecla',
    lugar: 'Santa Tecla, La Libertad',
    coords: [13.6769, -89.2797]
  },
  {
    id: 75, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Antiguo Cuscatlán',
    lugar: 'Antiguo Cuscatlán, La Libertad',
    coords: [13.6725, -89.2436]
  },
  {
    id: 76, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Cojutepeque',
    lugar: 'Cojutepeque, Cuscatlán',
    coords: [13.7167, -88.9333]
  },
  {
    id: 78, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Ilopango',
    lugar: 'Ilopango, San Salvador',
    coords: [13.7017, -89.1097]
  },
  {
    id: 79, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Soyapango',
    lugar: 'Soyapango, San Salvador',
    coords: [13.7089, -89.1400]
  },
  {
    id: 80, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Suchitoto',
    lugar: 'Suchitoto, Cuscatlán',
    coords: [14.0311, -89.0281]
  },
  {
    id: 81, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Zacatecoluca',
    lugar: 'Zacatecoluca, La Paz',
    coords: [13.5058, -88.8667]
  },
  {
    id: 82, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Sensuntepeque',
    lugar: 'Sensuntepeque, Cabañas',
    coords: [13.8756, -88.6353]
  },
  {
    id: 83, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Usulután',
    lugar: 'Usulután, Usulután',
    coords: [13.3500, -88.4500]
  },
  {
    id: 84, cat: 'gastronomia', emoji: '🫓', color: '#e05252',
    nombre: 'Día Nacional de la Pupusa',
    lugar: 'Olocuilta, La Paz',
    coords: [13.5686, -89.1197]
  },
  {
    id: 86, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Ahuachapán',
    lugar: 'Ahuachapán, Ahuachapán',
    coords: [13.9214, -89.8450]
  },
  {
    id: 87, cat: 'evento', emoji: '🎭', color: '#52a0e0',
    nombre: 'Carnaval Candelareño',
    lugar: 'Sonsonate, Sonsonate',
    coords: [13.7186, -89.7244]
  },
  {
    id: 88, cat: 'evento', emoji: '🐎', color: '#52a0e0',
    nombre: 'Fiestas Metapanecas',
    lugar: 'Metapán, Santa Ana',
    coords: [14.3333, -89.4500]
  },
  {
    id: 89, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de San Miguel',
    lugar: 'San Miguel, San Miguel',
    coords: [13.4833, -88.1833]
  },
  {
    id: 90, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Chinameca',
    lugar: 'Chinameca, San Miguel',
    coords: [13.5044, -88.3494]
  },
  {
    id: 91, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de San Jorge',
    lugar: 'San Jorge, San Miguel',
    coords: [13.4696, -88.1794]
  },
  {
    id: 92, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Moncagua',
    lugar: 'Moncagua, San Miguel',
    coords: [13.5333, -88.2667]
  },
  {
    id: 93, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Chirilagua',
    lugar: 'Chirilagua, San Miguel',
    coords: [13.2333, -88.1333]
  },
  {
    id: 94, cat: 'evento', emoji: '🏺', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Guatajiagua',
    lugar: 'Guatajiagua, Morazán',
    coords: [13.6833, -88.3333]
  },
  {
    id: 95, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Perquín',
    lugar: 'Perquín, Morazán',
    coords: [13.9667, -88.1667]
  },
  {
    id: 96, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Corinto',
    lugar: 'Corinto, Morazán',
    coords: [13.7833, -87.9667]
  },
  {
    id: 97, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Cacaopera',
    lugar: 'Cacaopera, Morazán',
    coords: [13.7333, -88.2333]
  },
  {
    id: 98, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de San Alejo',
    lugar: 'San Alejo, La Unión',
    coords: [13.4167, -87.7500]
  },
  {
    id: 99, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Conchagua',
    lugar: 'Conchagua, La Unión',
    coords: [13.2833, -87.7500]
  },
  {
    id: 100, cat: 'evento', emoji: '🎉', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Intipucá',
    lugar: 'Intipucá, La Unión',
    coords: [13.1975, -88.0578]
  },
  {
    id: 101, cat: 'gastronomia', emoji: '🌽', color: '#e05252',
    nombre: 'Festival del Maíz de Suchitoto',
    lugar: 'Suchitoto, Cuscatlán',
    desc: 'Tradición de más de 30 años que agradece la cosecha del maíz con desfile de carrozas, coronación de la Reina del Maíz, marimba y comida típica.',
    coords: [14.0311, -89.0281]
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
// En móvil/tablet reducimos animaciones y buffer de tiles para que el
// primer render sea más rápido y no sature dispositivos de gama baja.
const esDispositivoMovil = window.matchMedia('(max-width: 900px)').matches || ('ontouchstart' in window);

// Nivel de zoom único al enfocar un lugar (marcador, búsqueda, enlace directo
// o publicación), para que la sensación de acercamiento sea siempre la misma.
const FOCUS_ZOOM = 14;

// Límites geográficos del mapa (El Salvador + margen). Sin esto se puede
// alejar el zoom hasta ver medio continente: además de no tener sentido
// para un mapa cultural de un solo país, deja visibles a la vez todos los
// marcadores (que están agrupados en un área pequeña) formando un arco
// que parece un bug, y hace que el flyTo al hacer clic en uno tenga que
// recorrer una distancia de zoom enorme y "vuele" de forma exagerada.
const EL_SALVADOR_BOUNDS = [
  [12.3, -91.0],  // suroeste
  [15.2, -87.0]   // noreste
];

const mapa = L.map('mapa-leaflet', {
  center: [13.7, -88.95],
  // Zoom entero: con un zoom fraccionario Leaflet no tiene tiles nativos
  // para ese nivel exacto, así que agranda con CSS los del entero más
  // cercano y el mapa arranca borroso/pixelado. Un entero se ve nítido.
  zoom: 10,
  minZoom: 8,
  maxBounds: EL_SALVADOR_BOUNDS,
  maxBoundsViscosity: 0.7,
  zoomControl: false,
  attributionControl: true,
  preferCanvas: true,
  fadeAnimation: !esDispositivoMovil,
  zoomAnimation: true,
  markerZoomAnimation: true,
  inertia: true,
  inertiaDeceleration: 3000,
  inertiaMaxSpeed: 1500
});

L.control.zoom({ position: 'bottomright' }).addTo(mapa);

// Capa de tiles optimizada. Se pide a través de nuestro propio servidor
// (routes/tiles.routes.js), que agrega la API key de Stadia Maps server-side
// -así nunca queda expuesta en el JS del cliente ni en las peticiones que
// hace el navegador.
const tileLayer = L.tileLayer('/api/tiles/{z}/{x}/{y}{r}.png', {
  maxZoom: 16.5,
  // Pide la imagen @2x en pantallas de alta densidad (la mayoría de
  // celulares/laptops actuales) en vez de estirar la de 1x con CSS.
  detectRetina: true,
  updateWhenZooming: false,
  updateWhenIdle: true,
  keepBuffer: esDispositivoMovil ? 2 : 4,
  crossOrigin: true,
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

/* ── Vigilancia robusta del tamaño del contenedor ──
   El bug de "mapa en blanco" en móvil/tablet ocurre porque Leaflet solo
   se entera de que su contenedor cambió de tamaño si se lo decimos
   explícitamente. Eventos como mostrar/ocultar la barra de direcciones,
   rotar el dispositivo, volver de otra pestaña o restaurar la página
   desde el caché de retroceso (bfcache) cambian el tamaño real sin
   disparar 'resize' de forma confiable en todos los navegadores. Un
   ResizeObserver sobre el propio contenedor cubre todos esos casos de
   una sola vez. */
(function vigilarTamanoMapa() {
  const contenedor = document.getElementById('mapa-leaflet');
  if (!contenedor) return;

  if ('ResizeObserver' in window) {
    let pendiente = false;
    const ro = new ResizeObserver(() => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        mapa.invalidateSize({ animate: false });
        pendiente = false;
      });
    });
    ro.observe(contenedor);
  }

  // Vuelta desde otra pestaña o desde el caché de retroceso (iOS Safari
  // suele dejar el mapa congelado en blanco tras este tipo de regreso).
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') invalidateMapSize();
  });
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) invalidateMapSize();
  });
  window.addEventListener('orientationchange', () => {
    setTimeout(invalidateMapSize, 250);
  });
  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
      setTimeout(invalidateMapSize, 100);
    });
  }
})();

/* ── Crear ícono personalizado con emoji ── */
function crearIcono(emoji, color) {
  return L.divIcon({
    className: '',
    // El wrapper .custom-marker-shift existe solo para el desplazamiento de
    // "despliegue" (ver declutterMarkers más abajo): así el transform que usa
    // para separar marcadores solapados no pisa el transform de escala que
    // usan GSAP y .custom-marker--active sobre .custom-marker.
    html: `<div class="custom-marker-shift"><div class="custom-marker" style="background:${color};">${emoji}</div></div>`,
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
  if (!lm || !lm.id) return '../assets/media/publications/default-publication.svg';
  return `../assets/media/mapa/${lm.id}.webp?v=1.1.0`;
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
// Vista (centro + zoom) justo antes de seleccionar el primer lugar de esta
// "sesión" de exploración; al cerrar la ficha volvemos aquí. Se guarda solo
// una vez (no en cada cambio de lugar mientras la ficha sigue abierta) y se
// limpia al cerrar, para no pisarla con el zoom de acercamiento.
let vistaAntesDeSeleccion = null;

/* ══════════════════════════════════════════════════════════
   ABRIR / CERRAR SIDEBAR CON ANIMACIÓN Y PULSO GSAP
   ══════════════════════════════════════════════════════════ */
function abrirSidebar(lm, marker, forcedLang = null, volar = true) {
  const lang = forcedLang || (window.SRi18n ? window.SRi18n.getLang() : 'es');

  if (volar && !activeMarker) {
    vistaAntesDeSeleccion = { center: mapa.getCenter(), zoom: mapa.getZoom() };
  }

  sbImage.onerror = () => {
    sbImage.onerror = null;
    sbImage.src = '../assets/media/publications/default-publication.svg';
  };
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

  // Volamos al lugar ANTES de animar la ficha, usando ya el punto elevado
  // en móvil (calculado con el alto real de la ficha, que en este punto ya
  // tiene el contenido de este lugar). Así el mapa se mueve una sola vez,
  // directo al destino final, en vez de centrar el marcador primero y
  // luego corregirlo hacia arriba en un segundo salto.
  if (volar) {
    volarAMarcador(marker.getLatLng(), FOCUS_ZOOM);
  }

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
    activeMarker.setZIndexOffset(0);
  }
  activeMarker = marker;
  activeLandmark = lm;

  // Atenuar el resto de marcadores y traer al frente el seleccionado, para
  // que se distinga claramente de los demás en vez de mezclarse con ellos.
  markers.forEach(m => {
    m.setOpacity(m === marker ? 1 : 0.35);
  });
  marker.setZIndexOffset(1000);

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
    // En móvil (≤600px) el CSS convierte la sidebar en una "ficha" que se
    // desliza desde abajo (translateY); en pantallas más grandes es un panel
    // lateral que entra desde la izquierda (translateX). Si siempre animamos
    // translateX, en móvil el panel nunca sale de su escondite vertical.
    const esMovil = window.matchMedia('(max-width: 600px)').matches;
    gsap.killTweensOf(mapaSidebar);
    // Limpiamos cualquier transform inline previo para que el punto de partida
    // vuelva a ser el que define el CSS del breakpoint actual.
    gsap.set(mapaSidebar, { clearProps: 'transform' });
    gsap.to(mapaSidebar, {
      [esMovil ? 'y' : 'x']: 0,
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
    // Sin GSAP: dejamos que la regla CSS `.mapa-sidebar.open` (translateX en
    // escritorio, translateY en el diseño de ficha inferior de móvil) sea la
    // que controle la posición, en vez de forzar un eje fijo por inline style.
    mapaSidebar.style.transform = '';
    setTimeout(invalidateMapSize, 350);
  }
}

/* La sidebar tapa parte del mapa: en móvil es una ficha que sube desde
   abajo (tapa la parte de abajo), en PC es un panel fijo a la izquierda
   (tapa la parte de la izquierda). Si voláramos directo al lugar
   (centrándolo en el mapa completo) y luego corrigiéramos la vista para
   destaparlo de la sidebar, se vería como un doble salto. Esta función
   calcula de una vez el centro correcto -el punto que, al centrar el mapa
   en él, deja el marcador bien ubicado en el espacio libre que sí se ve-
   para volar ahí directamente en un solo movimiento.

   Se basa en las coordenadas reales del lugar (con project/unproject) en
   vez de desplazar la vista actual de forma relativa, para que llamarla
   más de una vez (p. ej. al cambiar de idioma, que cambia el alto/ancho de
   la ficha) siempre converja al mismo lugar en vez de acumular saltos. */
function calcularCentroElevado(latlng, zoom) {
  const esMovil = window.matchMedia('(max-width: 600px)').matches;
  const alturaMapa = mapa.getSize().y;
  const anchoMapa = mapa.getSize().x;
  const puntoLugar = mapa.project(latlng, zoom);
  let offsetX = 0;
  let offsetY = 0;

  if (esMovil) {
    // Ficha inferior: subimos el marcador bien por encima de su borde.
    const alturaFicha = mapaSidebar.getBoundingClientRect().height;
    if (alturaFicha > 0 && alturaMapa > 0) {
      const alturaLibre = Math.max(alturaMapa - alturaFicha, 0);
      const posicionDeseada = Math.min(alturaLibre * 0.2 + 160, alturaLibre);
      offsetY = (alturaMapa / 2) - posicionDeseada;
    }
  } else {
    // Panel lateral izquierdo: centramos el marcador en el ancho libre
    // que queda a la derecha del panel, sin que quede tapado ni a medias.
    const anchoFicha = mapaSidebar.getBoundingClientRect().width;
    if (anchoFicha > 0 && anchoMapa > 0) {
      const anchoLibre = Math.max(anchoMapa - anchoFicha, 0);
      const posicionXDeseada = anchoFicha + (anchoLibre / 2);
      offsetX = (anchoMapa / 2) - posicionXDeseada;
    }
  }

  if (offsetX === 0 && offsetY === 0) return latlng;
  const puntoCentroDeseado = L.point(puntoLugar.x + offsetX, puntoLugar.y + offsetY);
  return mapa.unproject(puntoCentroDeseado, zoom);
}

function volarAMarcador(latlng, zoom, opciones = { animate: true, duration: 1 }) {
  mapa.flyTo(calcularCentroElevado(latlng, zoom), zoom, opciones);
}

// Reajuste sin vuelo: para cuando el contenido de la ficha ya abierta
// cambia de alto (p. ej. al cambiar de idioma) y solo hace falta corregir
// un poco la posición, sin repetir la animación completa de acercamiento.
function centrarMarcadorSobreFichaMovil() {
  if (!mapaSidebar.classList.contains('open') || !activeMarker) return;
  mapa.panTo(calcularCentroElevado(activeMarker.getLatLng(), mapa.getZoom()), { animate: true, duration: 0.4 });
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

  markers.forEach(m => m.setOpacity(1));
  if (activeMarker) activeMarker.setZIndexOffset(0);

  if (vistaAntesDeSeleccion) {
    mapa.flyTo(vistaAntesDeSeleccion.center, vistaAntesDeSeleccion.zoom, { animate: true, duration: 1 });
    vistaAntesDeSeleccion = null;
  }

  if (window.gsap) {
    const esMovil = window.matchMedia('(max-width: 600px)').matches;
    gsap.killTweensOf(mapaSidebar);
    gsap.to(mapaSidebar, {
      [esMovil ? 'y' : 'x']: esMovil ? '100%' : '-100%',
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
    volarAMarcador(activeMarker.getLatLng(), FOCUS_ZOOM);
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
       <img src="${getImgUrl(lm)}" alt="${nombreTooltip}" loading="lazy" onerror="this.onerror=null;this.src='../assets/media/publications/default-publication.svg';" />
       <div class="marker-tooltip__info">
         <span class="marker-tooltip__cat" style="color:${CAT_COLORS[lm.cat]}">${lm.emoji} ${catTraducida}</span>
         <span class="marker-tooltip__name">${nombreTooltip}</span>
       </div>
     </div>`;
}

function crearMarker(lm) {
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

  // El tooltip de Leaflet se posiciona según la coordenada real del marcador,
  // no según el desplazamiento visual que aplica declutterMarkers() para
  // separar marcadores solapados. Si el marcador está desplazado, corregimos
  // el tooltip con el mismo offset para que aparezca sobre el ícono visible.
  marker.on('tooltipopen', () => {
    const off = marker._declutterOffset;
    const tip = marker.getTooltip()?.getElement();
    if (off && tip) {
      tip.style.transform += ` translate(${off.dx}px, ${off.dy}px)`;
    }
  });

  marker.on('click', () => {
    abrirSidebar(lm, marker);
    setTimeout(invalidateMapSize, 500);
  });

  if (gruposCategoria[lm.cat]) {
    gruposCategoria[lm.cat].addLayer(marker);
  } else {
    mapa.addLayer(marker);
  }

  markers.push(marker);
}

/* ── Creación de marcadores por lotes ──
   Crear los ~70 marcadores (con su ícono, tooltip y listeners) de golpe
   bloquea el hilo principal justo cuando el mapa recién se está pintando,
   lo que en tablets/celulares de gama baja se percibe como una pantalla
   en blanco/congelada por un instante. Repartir el trabajo en lotes
   pequeños entre frames deja que el primer paint (tiles + UI) ocurra
   antes, y el resultado final es idéntico. */
window.srMarkersReady = false;
(function crearMarkersEnLotes(lista) {
  const LOTE = 12;
  let i = 0;
  function procesarLote() {
    const fin = Math.min(i + LOTE, lista.length);
    for (; i < fin; i++) crearMarker(lista[i]);
    if (i < lista.length) {
      (window.requestIdleCallback || window.requestAnimationFrame)(procesarLote);
    } else {
      window.srMarkersReady = true;
      window.dispatchEvent(new Event('srMarkersReady'));
      declutterMarkers();
    }
  }
  procesarLote();
})(LANDMARKS);

/* ══════════════════════════════════════════════════════════
   SEPARAR MARCADORES SOLAPADOS ("despliegue" en abanico)
   ══════════════════════════════════════════════════════════
   Varios lugares/eventos comparten coordenadas iguales o muy cercanas
   (ej. varias fiestas patronales del mismo pueblo). A un zoom en el que
   el usuario puede tocar un marcador, esos puntos caen literalmente unos
   encima de otros y el de más arriba tapa a los demás, haciendo imposible
   abrir su ficha. Para arreglarlo, agrupamos por cercanía en PANTALLA
   (no en coordenadas, porque la distancia en píxeles entre dos puntos fijos
   cambia con el zoom) y separamos cada grupo en un pequeño abanico/círculo
   mediante un transform CSS puramente visual: la posición geográfica real
   del marcador (y por tanto a dónde vuela el mapa al abrir su ficha) no
   cambia, solo su dibujo en pantalla. */
const DECLUTTER_PIXEL_THRESHOLD = 32; // si dos marcadores caen a menos de esto, se consideran solapados
const DECLUTTER_RADIUS = 16;          // px de radio del desplazamiento, siempre el mismo
// Ángulo de oro: separa bien ids consecutivos (no los deja casi pegados como
// pasaría con una fracción simple de 2π) sin tener que saber cuántos vecinos
// tiene cada marcador.
const DECLUTTER_GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

function declutterMarkers() {
  if (!mapa) return;

  // Solo tiene sentido separar marcadores que están realmente visibles
  // (capa de su categoría activa en el mapa).
  const visibles = markers.filter(m => {
    const grupo = gruposCategoria[m._landmarkCat];
    return grupo ? mapa.hasLayer(grupo) : mapa.hasLayer(m);
  });

  const puntos = visibles.map(m => ({ marker: m, pt: mapa.latLngToContainerPoint(m.getLatLng()) }));

  // Un marcador necesita desplazarse si cae a menos de DECLUTTER_PIXEL_THRESHOLD
  // de CUALQUIER otro marcador visible -sin agruparlos ni depender de cuántos
  // vecinos tiene, que es justo lo que antes hacía que el desplazamiento
  // cambiara (y el marcador "saltara") cada vez que el zoom cambiaba el
  // tamaño de esos grupos. Con este criterio, el desplazamiento de un
  // marcador es siempre el mismo (fijo por su id): solo se prende o apaga
  // según si en ese momento tiene un vecino encima, nunca gira ni crece.
  puntos.forEach((punto, i) => {
    const solapado = puntos.some((otro, j) => j !== i && punto.pt.distanceTo(otro.pt) <= DECLUTTER_PIXEL_THRESHOLD);
    const marker = punto.marker;
    const shiftEl = marker._icon?.querySelector('.custom-marker-shift');
    if (!shiftEl) return;
    if (!solapado) {
      shiftEl.style.transform = '';
      marker._declutterOffset = null;
      return;
    }
    const angulo = (marker._landmarkId * DECLUTTER_GOLDEN_ANGLE) % (2 * Math.PI);
    const dx = Math.round(Math.cos(angulo) * DECLUTTER_RADIUS);
    const dy = Math.round(Math.sin(angulo) * DECLUTTER_RADIUS);
    shiftEl.style.transform = `translate(${dx}px, ${dy}px)`;
    marker._declutterOffset = { dx, dy };
  });
}

// La distancia en píxeles entre dos coordenadas fijas cambia con el zoom
// (más separación visual al acercarse), así que hay que recalcular ahí.
// No hace falta en 'move' puro: paneo sin cambiar zoom no altera esa distancia.
mapa.on('zoomend', declutterMarkers);

let categoriaActiva = 'todas';

function aplicarFiltro(categoria) {
  categoriaActiva = categoria;
  Object.values(gruposCategoria).forEach(grupo => {
    if (mapa.hasLayer(grupo)) {
      mapa.removeLayer(grupo);
    }
  });

  const gruposVisibles = categoria === 'todas'
    ? Object.values(gruposCategoria)
    : (gruposCategoria[categoria] ? [gruposCategoria[categoria]] : []);

  gruposVisibles.forEach(grupo => mapa.addLayer(grupo));
  animarAparicionMarcadores(gruposVisibles);

  const searchQuery = document.getElementById('mapSearchInput')?.value?.toLowerCase().trim() || '';
  if (searchQuery) {
    actualizarListaResultados(categoria, searchQuery);
  } else {
    const container = document.getElementById('searchResultsContainer');
    if (container) container.style.display = 'none';
  }
  actualizarContador(categoria);
  setTimeout(invalidateMapSize, 200);
  if (window.srMarkersReady) declutterMarkers();
}

// Pequeño "pop" escalonado en los marcadores que quedan visibles tras
// aplicar un filtro, para que el cambio se sienta dinámico en vez de
// un simple aparecer/desaparecer instantáneo.
function animarAparicionMarcadores(grupos) {
  if (typeof gsap === 'undefined') return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const puntos = [];
  grupos.forEach(grupo => {
    grupo.eachLayer(m => {
      const punto = m._icon?.querySelector('.custom-marker');
      if (punto) puntos.push(punto);
    });
  });
  if (!puntos.length) return;

  // clearProps al terminar: los marcadores usan su propio transform (CSS)
  // para el estado "activo" (scale 1.25 en .custom-marker--active); si dejamos
  // un transform inline de GSAP, ese estado dejaría de funcionar después.
  gsap.fromTo(puntos,
    { scale: 0, opacity: 0 },
    {
      scale: 1, opacity: 1, duration: .4, stagger: { each: .012, from: 'center' }, ease: 'back.out(2)',
      onComplete: () => gsap.set(puntos, { clearProps: 'transform' })
    }
  );
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
          cerrarFiltrosSheet();
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
    cerrarFiltrosSheet();
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
          abrirSidebar(activeLandmark, activeMarker, idiomaDefinitivo, false);
          centrarMarcadorSobreFichaMovil();
        }
      }
    }
    invalidateMapSize();
  }, 200);
});

document.addEventListener("langchange", (e) => {
  const idiomaActual = e.detail.lang;
  if (activeLandmark) {
    abrirSidebar(activeLandmark, activeMarker, idiomaActual, false);
    centrarMarcadorSobreFichaMovil();
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
    const imagenHtml = `<img class="popup-pub-image" src="${escapeHtml(pub.image || '/assets/media/publications/default-publication.svg')}" alt="${escapeHtml(pub.title)}" loading="lazy">`;

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
        mapa.flyTo(markerAAbrir.getLatLng(), FOCUS_ZOOM, { animate: true, duration: 1 });
        setTimeout(() => markerAAbrir.openPopup(), 400);
      } else if (!Number.isNaN(fallbackLat) && !Number.isNaN(fallbackLng)) {
        // Publicación no encontrada por id, pero venían coordenadas en la URL:
        // se centra ahí igualmente para no perder el contexto del enlace.
        mapa.flyTo([fallbackLat, fallbackLng], FOCUS_ZOOM, { animate: true, duration: 1 });
      }

      setTimeout(invalidateMapSize, 500);
    })
    .catch((error) => {
      console.error('No se pudieron cargar las publicaciones en el mapa:', error);
    });
})();

/* El botón "Volver" de esta página es el mismo #infoBackBtn compartido con
   el resto del sitio (categorías, calendario, eventos, etc.), configurado
   por assets/js/back-nav.js según el "?from=" de la URL. Mapa solía tener
   además su propio botón "mapaBackBtn" con la misma función, lo que hacía
   aparecer dos flechas de volver a la vez — se eliminó para quedar
   consistente con el resto de páginas. */

/* ══════════════════════════════════════════════════════════
   RESALTAR LANDMARK DESDE URL
   ══════════════════════════════════════════════════════════ */
(function resaltarLandmarkDesdeURL() {
  function ejecutarCuandoListo(cb) {
    if (window.srMarkersReady) {
      cb();
    } else {
      window.addEventListener('srMarkersReady', cb, { once: true });
    }
  }

  window.addEventListener('load', () => ejecutarCuandoListo(() => {
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
            abrirSidebar(lm, targetMarker);
            setTimeout(invalidateMapSize, 500);
          }
        }
      }
    }
  }));
})();

/* ══════════════════════════════════════════════════════════
   PANEL DE FILTROS/BÚSQUEDA COMO HOJA MODAL (botón flotante +
   overlay), igual en PC y en celular.
   ══════════════════════════════════════════════════════════ */
const mapaFiltersFab = document.getElementById('mapaFiltersFab');
const mapaFiltersFloat = document.getElementById('mapaFiltersFloat');
const mapaFiltersOverlay = document.getElementById('mapaFiltersSheetOverlay');
const mapaFiltersClose = document.getElementById('mapaFiltersClose');

function abrirFiltrosSheet() {
  mapaFiltersFloat?.classList.add('is-open');
  mapaFiltersOverlay?.classList.add('is-open');
  mapaFiltersFab?.setAttribute('aria-expanded', 'true');
  setTimeout(() => document.getElementById('mapSearchInput')?.focus(), 320);
}
function cerrarFiltrosSheet() {
  mapaFiltersFloat?.classList.remove('is-open');
  mapaFiltersOverlay?.classList.remove('is-open');
  mapaFiltersFab?.setAttribute('aria-expanded', 'false');
}
if (mapaFiltersFab && mapaFiltersFloat) {
  mapaFiltersFab.addEventListener('click', () => {
    if (mapaFiltersFloat.classList.contains('is-open')) {
      cerrarFiltrosSheet();
    } else {
      abrirFiltrosSheet();
    }
  });
  mapaFiltersClose?.addEventListener('click', cerrarFiltrosSheet);
  mapaFiltersOverlay?.addEventListener('click', cerrarFiltrosSheet);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mapaFiltersFloat.classList.contains('is-open')) cerrarFiltrosSheet();
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
        mapa.flyTo(miUbicacionActual, FOCUS_ZOOM, { animate: true, duration: 1 });
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
    // Cerrar cualquier panel abierto (sidebar de un lugar o la hoja de
    // filtros) para que se vea el mapa al centrar en la ubicación.
    cerrarSidebar();
    cerrarFiltrosSheet();
    if (miUbicacionActual) {
      mapa.flyTo(miUbicacionActual, FOCUS_ZOOM, { animate: true, duration: 1 });
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