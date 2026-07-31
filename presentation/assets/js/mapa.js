/* NAV: el comportamiento del drawer/nav es manejado globalmente por `presentation/assets/js/script.js`. */

/* ══════════════════════════════════════════════════════════
   DATOS DE LANDMARKS CULTURALES
   ══════════════════════════════════════════════════════════
   Para añadir nuevos puntos, copia uno de los objetos y
   ajusta: nombre, coords [lat, lng], cat, icono, desc, chips
   ══════════════════════════════════════════════════════════ */

const LANDMARKS = [
  /* ── SITIOS CULTURALES ── */
  {
    id: 1, cat: 'cultural', emoji: '🏛️', color: '#be8e56',
    nombre: 'Tazumal',
    lugar: 'Chalchuapa, Santa Ana',
    desc: 'El sitio arqueológico precolombino más importante de El Salvador, con una pirámide maya de 24 m de altura.',
    chips: ['Maya', '100–1200 d.C.', 'Museo incluido'],
    coords: [13.9889, -89.6833]
  },
  {
    id: 2, cat: 'cultural', emoji: '🏛️', color: '#be8e56',
    nombre: 'Joya de Cerén',
    lugar: 'San Juan Opico, La Libertad',
    desc: 'Sitio maya sepultado por ceniza volcánica en 590 d.C. Patrimonio de la Humanidad UNESCO 1993. "La Pompeya de América".',
    chips: ['UNESCO', '590 d.C.', 'Único en CA'],
    coords: [13.8167, -89.55]
  },
  {
    id: 3, cat: 'cultural', emoji: '🏛️', color: '#be8e56',
    nombre: 'Salvador del Mundo',
    lugar: 'San Salvador',
    desc: 'Monumento icónico inaugurado en 1942, símbolo del patrono de la nación. Centro de las Fiestas Agostinas cada agosto.',
    chips: ['Monumento', 'Acceso libre', 'Icono nacional'],
    coords: [13.7060, -89.2189]
  },
  {
    id: 4, cat: 'cultural', emoji: '🎨', color: '#be8e56',
    nombre: 'Suchitoto',
    lugar: 'Cuscatlán',
    desc: 'Capital cultural de El Salvador: calles adoquinadas, arte, teatro independiente y el lago Suchitlán.',
    chips: ['Pueblo colonial', 'Arte', 'Lago Suchitlán'],
    coords: [14.0311, -89.0281]
  },
  {
    id: 5, cat: 'cultural', emoji: '⛪', color: '#be8e56',
    nombre: 'Catedral Metropolitana',
    lugar: 'Centro Histórico, San Salvador',
    desc: 'Catedral de construcción centenaria que alberga los restos de San Óscar Romero, canonizado en 2018.',
    chips: ['San Romero', 'Neoclásica', 'Peregrinación'],
    coords: [13.6984, -89.1915]
  },
  {
    id: 6, cat: 'cultural', emoji: '🏺', color: '#be8e56',
    nombre: 'MUNA',
    lugar: 'San Salvador',
    desc: 'Museo Nacional de Antropología. Fundado en 1883, el repositorio más importante del patrimonio histórico salvadoreño.',
    chips: ['+3000 m² salas', 'Fundado 1883', 'Arqueología'],
    coords: [13.7020, -89.2230]
  },
  {
    id: 7, cat: 'cultural', emoji: '🏛️', color: '#be8e56',
    nombre: 'Ruinas de San Andrés',
    lugar: 'Ciudad Arce, La Libertad',
    desc: 'Segundo sitio arqueológico más grande del país, con estructuras mayas del período Clásico.',
    chips: ['Maya Clásico', 'La Libertad', 'Gratuito'],
    coords: [13.8044, -89.3939]
  },

  /* ── GASTRONOMÍA ── */
  {
    id: 8, cat: 'gastronomia', emoji: '🫓', color: '#e05252',
    nombre: 'Pupusodromo El Triángulo',
    lugar: 'Olocuilta, La Paz',
    desc: 'El lugar más emblemático del país para probar las auténticas pupusas de arroz cocinadas en comal de barro y leña.',
    chips: ['Pupusas de arroz', 'Mundial', 'Tradición'],
    coords: [13.5682, -89.1195] // Ubicación real en Olocuilta, desfasada de los Llanos (id: 70)
  },
  {
    id: 9, cat: 'gastronomia', emoji: '🍞', color: '#e05252',
    nombre: 'Semitas de Cojutepeque',
    lugar: 'Cojutepeque, Cuscatlán',
    desc: 'Ciudad famosa por la Semita Papalona, pan dulce artesanal elaborado en horno de leña con relleno de piña o mora.',
    chips: ['Semita Papalona', 'Horno de leña', 'Artesanal'],
    coords: [13.7167, -88.9333]
  },
  {
    id: 10, cat: 'gastronomia', emoji: '🥣', color: '#e05252',
    nombre: 'Mercado Central de San Salvador',
    lugar: 'Centro Histórico, San Salvador',
    desc: 'El mercado más grande del país, con cocinas tradicionales donde probar sopa de pata, atol, tamales y yuca frita.',
    chips: ['Sopa de pata', 'Atol de elote', 'Comida típica'],
    coords: [13.6965, -89.1935] // Desfasado del cúmulo central
  },
  {
    id: 11, cat: 'gastronomia', emoji: '🌽', color: '#e05252',
    nombre: 'Nahuizalco — Mercado Nocturno',
    lugar: 'Nahuizalco, Sonsonate',
    desc: 'Único mercado nocturno de artesanías y comida típica del país, con platillos indígenas y atol shuco.',
    chips: ['Nocturno', 'Artesanías', 'Atol shuco'],
    coords: [13.7739, -89.7256]
  },

  /* ── EVENTOS CULTURALES ── */
  {
    id: 12, cat: 'evento', emoji: '🎆', color: '#52a0e0',
    nombre: 'Plaza las Américas',
    lugar: 'San Salvador',
    desc: 'Sede principal de las Fiestas Agostinas cada agosto. Miles de salvadoreños se reúnen para la Bajada del Salvador.',
    chips: ['Fiestas Agostinas', 'Agosto', 'Procesión'],
    coords: [13.6995, -89.2200]
  },
  {
    id: 13, cat: 'evento', emoji: '🥁', color: '#52a0e0',
    nombre: 'Panchimalco',
    lugar: 'Panchimalco, San Salvador',
    desc: 'Municipio indígena famoso por la Procesión de las Palmas en agosto y sus danzas folclóricas tradicionales.',
    chips: ['Indígena', 'Procesión de Palmas', 'Danzas'],
    coords: [13.6158, -89.1797]
  },
  {
    id: 14, cat: 'evento', emoji: '🎭', color: '#52a0e0',
    nombre: 'Festival de Suchitoto',
    lugar: 'Suchitoto, Cuscatlán',
    desc: 'Festival Internacional de Arte y Cultura que convoca artistas de toda Latinoamérica anualmente.',
    chips: ['Festival Internacional', 'Arte', 'Música'],
    coords: [14.0322, -89.0269] // Desfasado de Suchitoto base (id: 4)
  },
  {
    id: 15, cat: 'evento', emoji: '✝️', color: '#52a0e0',
    nombre: 'Catedral de Santa Ana',
    lugar: 'Santa Ana',
    desc: 'Una de las catedrales más hermosas de Centroamérica y sede de las tradiciones de Semana Santa del occidente del país.',
    chips: ['Semana Santa', 'Neogótica', 'Alfombras'],
    coords: [13.9958, -89.5582] // Desfasado de Fiestas Julias (id: 23)
  },

  /* ── HISTORIA ── */
  {
    id: 16, cat: 'historia', emoji: '📜', color: '#7c52e0',
    nombre: 'Casa de la Cultura de Izalco',
    lugar: 'Izalco, Sonsonate',
    desc: 'Izalco fue escenario del levantamiento de 1932 y sede de la resistencia Pipil. Centro de memoria histórica.',
    chips: ['Levantamiento 1932', 'Pipil', 'Memoria'],
    coords: [13.7500, -89.6692]
  },
  {
    id: 17, cat: 'historia', emoji: '🏛️', color: '#7c52e0',
    nombre: 'Ex-Casa Presidencial',
    lugar: 'San Jacinto, San Salvador',
    desc: 'Sede del poder ejecutivo entre 1931 y 2001. Una joya neoclásica con salones emblemáticos que narran la historia política del siglo XX.',
    chips: ['Siglo XX', 'Neoclásico', 'San Jacinto'],
    coords: [13.6868, -89.1932] // Ubicación real en San Jacinto, desfasada del Museo Militar (id: 64)
  },
  {
    id: 18, cat: 'historia', emoji: '⛪', color: '#7c52e0',
    nombre: 'Iglesia El Rosario',
    lugar: 'San Salvador',
    desc: 'Moderna iglesia de 1971 donde descansan los restos de Padre Delgado. Su arquitectura única con vitrales de luz solar es notable.',
    chips: ['Padre Delgado', 'Vitrales únicos', '1971'],
    coords: [13.6972, -89.1905]
  },

  /* ── LEYENDAS ── */
  {
    id: 19, cat: 'leyenda', emoji: '👻', color: '#52c07c',
    nombre: 'Lago de Coatepeque',
    lugar: 'Santa Ana',
    desc: 'Hermoso lago volcánico donde, según la tradición oral, se escucha el llanto de La Llorona en las noches de luna llena.',
    chips: ['La Llorona', 'Lago volcánico', 'Leyenda viva'],
    coords: [13.8667, -89.5500]
  },
  {
    id: 20, cat: 'leyenda', emoji: '🌿', color: '#52c07c',
    nombre: 'Bosque El Imposible',
    lugar: 'Ahuachapán',
    desc: 'El bosque más extenso de El Salvador. Territorio mítico del Cipitío, el Cadejo y la Siguanaba según el folclore local.',
    chips: ['Cipitío', 'Siguanaba', 'Cadejo'],
    coords: [13.8303, -89.9789]
  },

  /* ── FESTIVIDADES DEL CALENDARIO ── */
  {
    id: 21, cat: 'evento', emoji: '🇸🇻', color: '#52a0e0',
    nombre: 'Fiestas Agostinas',
    lugar: 'San Salvador, El Salvador',
    desc: 'Celebración principal en honor al Divino Salvador del Mundo, con carrozas y el tradicional desfile de Correos.',
    chips: ['Fiesta Patronal', '5 de Agosto', 'San Salvador'],
    coords: [13.6929, -89.2182]
  },
  {
    id: 22, cat: 'evento', emoji: '🏮', color: '#52a0e0',
    nombre: 'Día de los Farolitos',
    lugar: 'Ahuachapán, El Salvador',
    desc: 'Hermosa tradición donde las calles se iluminan por completo con miles de faroles artesanales.',
    chips: ['Festival Cultural', '7 de Septiembre', 'Ahuachapán'],
    coords: [13.9214, -89.845]
  },
  {
    id: 23, cat: 'evento', emoji: '👑', color: '#52a0e0',
    nombre: 'Fiestas Julias',
    lugar: 'Santa Ana, El Salvador',
    desc: 'Grandes celebraciones culturales y religiosas en la Ciudad Heroica, realizadas en honor a Nuestra Señora Santa Ana.',
    chips: ['Fiesta Patronal', '26 de Julio', 'Santa Ana'],
    coords: [13.9942, -89.5597]
  },
  {
    id: 24, cat: 'evento', emoji: '🔔', color: '#52a0e0',
    nombre: 'Fiestas Patronales de San Vicente',
    lugar: 'San Vicente, El Salvador',
    desc: 'Celebraciones patronales dedicadas a San Vicente Abad y Mártir, llenas de actividades culturales bajo la histórica torre.',
    chips: ['Fiesta Patronal', '25 de Diciembre', 'San Vicente'],
    coords: [13.6411, -88.7847]
  },
  {
    id: 25, cat: 'evento', emoji: '🌴', color: '#52a0e0',
    nombre: 'Festival de las Flores y Palmas',
    lugar: 'La Libertad, El Salvador',
    desc: 'Tradición colorida en Panchimalco que marca el inicio de la época lluviosa con procesiones adornadas de palmas y flores silvestres.',
    chips: ['Festival Cultural', '10 de Mayo', 'La Libertad'],
    coords: [13.6769, -89.2797]
  },
  {
    id: 26, cat: 'evento', emoji: '🎷', color: '#52a0e0',
    nombre: 'Gran Carnaval de San Miguel',
    lugar: 'San Miguel, El Salvador',
    desc: 'El carnaval más grande de Centroamérica, celebrado en honor a la Virgen de la Paz con decenas de orquestas en vivo.',
    chips: ['Festividad Nacional', '28 de Noviembre', 'San Miguel'],
    coords: [13.4833, -88.1833]
  },
  {
    id: 27, cat: 'evento', emoji: '⚔️', color: '#52a0e0',
    nombre: 'Fiestas de los Historiantes de Cuisnahuat',
    lugar: 'Sonsonate, El Salvador',
    desc: 'Danza tradicional de Moros y Cristianos en honor a San Carlos Borromeo, preservando las raíces ancestrales indigenas.',
    chips: ['Celebración Religiosa', '24 de Noviembre', 'Sonsonate'],
    coords: [13.6667, -89.7333]
  },
  {
    id: 28, cat: 'gastronomia', emoji: '🟢', color: '#e05252',
    nombre: 'Festival del Jocote Corona',
    lugar: 'Santa Ana, El Salvador',
    desc: 'Feria gastronómica celebrada en el Cerro Verde dedicada a la comercialización y platillos derivados de este icónico fruto.',
    chips: ['Feria Municipal', '18 de Octubre', 'Santa Ana'],
    coords: [13.8494, -89.6309]
  },
  {
    id: 29, cat: 'evento', emoji: '💀', color: '#52a0e0',
    nombre: 'Día de la Calabiuza',
    lugar: 'Cuscatlán, El Salvador',
    desc: 'Desfile tradicional nocturno en Tonacatepeque donde cobran vida los personajes de las leyendas salvadoreñas como la Siguanaba.',
    chips: ['Festival Cultural', '1 de Noviembre', 'Cuscatlán'],
    coords: [13.7825, -89.2614]
  },
  {
    id: 30, cat: 'evento', emoji: '🔥', color: '#52a0e0',
    nombre: 'Día de los Canchules',
    lugar: 'Sensuntepeque, Cabañas',
    desc: 'Tradición única cada 4 de diciembre donde los habitantes crean altares con frutas y comida típica, repitiendo el dicho popular "¡Canchul, si no me das, te quiebro el candil!".',
    chips: ['Tradición Oral', '4 de Diciembre', 'Cabañas'],
    coords: [13.8765, -88.6312] // Coordenadas reales ajustadas en el casco urbano de Sensuntepeque
  },
  {
    id: 31, cat: 'evento', emoji: '✝️', color: '#52a0e0',
    nombre: 'Día de la Cruz',
    lugar: 'San Salvador, El Salvador',
    desc: 'Tradición nacional donde se adorna una cruz de árbol de jiote con frutas de la época para bendecir los hogares.',
    chips: ['Celebración Religiosa', '3 de Mayo', 'San Salvador'],
    coords: [13.6945, -89.2165] // Desfasado de Fiestas Agostinas
  },
  {
    id: 32, cat: 'gastronomia', emoji: '🌽', color: '#e05252',
    nombre: 'Festival del Maíz',
    lugar: 'Chalatenango, El Salvador',
    desc: 'Celebración popular en honor a la cosecha del maíz con venta de atol, riguas, tamales y artesanías de la zona.',
    chips: ['Feria Municipal', '28 de Agosto', 'Chalatenango'],
    coords: [14.0333, -88.9333]
  },
  {
    id: 33, cat: 'evento', emoji: '🪵', color: '#52a0e0',
    nombre: 'Tradición del Bálsamo en Jayaque',
    lugar: 'Jayaque, La Libertad',
    desc: 'Municipio cafetalero y productor de la Cordillera del Bálsamo, donde los artesanos locales preservan el proceso ancestral de extracción y purificación de la resina.',
    chips: ['Cultura Lenca', 'Tradición Viva', 'La Libertad'],
    coords: [13.6738, -89.4420] // Ubicado en Jayaque, limpio de Santa Tecla (id: 50) y San Andrés (id: 7)
  },
  {
    id: 34, cat: 'evento', emoji: '🎭', color: '#52a0e0',
    nombre: 'Tradición de los Encuentros',
    lugar: 'San Antonio del Monte, Sonsonate',
    desc: 'Centenaria festividad religiosa y cultural donde se encuentran las imágenes de los santos patronos de los pueblos vecinos, acompañada de danzas tradicionales como el Chinchintora.',
    chips: ['Danza Ancestral', 'Único en CA', 'Sonsonate'],
    coords: [13.7188, -89.7432] // Ubicación real en San Antonio del Monte, libre de los cúmulos del centro de Sonsonate
  },
  {
    id: 35, cat: 'evento', emoji: '⛵', color: '#52a0e0',
    nombre: 'Fiestas Patronales de La Unión',
    lugar: 'La Unión, El Salvador',
    desc: 'Celebradas en honor a la Inmaculada Concepción con desfiles, carrozas y actividades marítimas en el Golfo de Fonseca.',
    chips: ['Fiesta Patronal', '12 de Diciembre', 'La Unión'],
    coords: [13.3372, -87.8447]
  },
  {
    id: 36, cat: 'gastronomia', emoji: '🏮', color: '#e05252',
    nombre: 'Festival de los Farolitos en Ataco',
    lugar: 'Ahuachapán, El Salvador',
    desc: 'Concepción de Ataco se viste de luces, música folclórica y alta gastronomía para conmemorar el nacimiento de la Virgen María.',
    chips: ['Festival Cultural', '7 de Septiembre', 'Ahuachapán'],
    coords: [13.8722, -89.8494]
  },
  {
    id: 37, cat: 'gastronomia', emoji: '🍬', color: '#e05252',
    nombre: 'Festival de la Panela',
    lugar: 'Cuscatlán, El Salvador',
    desc: 'Celebrado en los moliendas de San Lorenzo, destacando la producción artesanal del dulce de panela y sus derivados derivados.',
    chips: ['Feria Municipal', '22 de Marzo', 'Cuscatlán'],
    coords: [13.7155, -88.9348] // Desfasado de Cojutepeque
  },
  {
    id: 38, cat: 'evento', emoji: '🏹', color: '#52a0e0',
    nombre: 'Fiestas del Rey Guajactial',
    lugar: 'Sonsonate, El Salvador',
    desc: 'Conmemoración histórica y rescate de la identidad pipil en Izalco, recordando el legado de los caciques ancestrales.',
    chips: ['Festival Cultural', '18 de Enero', 'Sonsonate'],
    coords: [13.7512, -89.6678] // Desfasado de Casa de la Cultura de Izalco (id: 16)
  },
  {
    id: 39, cat: 'gastronomia', emoji: '🦀', color: '#e05252',
    nombre: 'Festival del Cangrejo',
    lugar: 'La Paz, El Salvador',
    desc: 'Feria gastronómica marina en San Luis La Herradura, exaltando el turismo y el consumo sostenible del recurso costero.',
    chips: ['Feria Municipal', '15 de Junio', 'La Paz'],
    coords: [13.3333, -88.9167]
  },
  {
    id: 40, cat: 'evento', emoji: '🚶', color: '#52a0e0',
    nombre: 'Romería de Esquipulas',
    lugar: 'Chalateanago, El Salvador',
    desc: 'Peregrinación masiva en honor al Cristo Negro en Dulce Nombre de María, una de las devociones más antiguas del norte.',
    chips: ['Celebración Religiosa', '15 de Enero', 'Chalateanago'],
    coords: [14.1167, -88.9333]
  },
  {
    id: 41, cat: 'evento', emoji: '🏺', color: '#52a0e0',
    nombre: 'Festival del Barro',
    lugar: 'Cabañas, El Salvador',
    desc: 'Exposición artesanal en Ilobasco que rinde homenaje a los maestros alfareros y sus famosas figuras en miniatura.',
    chips: ['Festival Cultural', '8 de Noviembre', 'Cabañas'],
    coords: [13.8422, -88.8508]
  },
  {
    id: 42, cat: 'gastronomia', emoji: '🍚', color: '#e05252',
    nombre: 'Fiestas del Arroz',
    lugar: 'San Vicente, El Salvador',
    desc: 'Desarrollado en San Esteban Catarina, celebrando el procesamiento y soberanía alimentaria ligada al cultivo de arroz.',
    chips: ['Feria Municipal', '19 de Diciembre', 'San Vicente'],
    coords: [13.7333, -88.75]
  },
  {
    id: 43, cat: 'evento', emoji: '🎭', color: '#52a0e0',
    nombre: 'Festival de la Juventitudes Populares',
    lugar: 'Morazán, El Salvador',
    desc: 'Encuentro de arte, memoria histórica, música latinoamericana y talleres de teatro social en el municipio de El Mozote.',
    chips: ['Festival Cultural', '12 de Agosto', 'Morazán'],
    coords: [13.7833, -88.15]
  },
  {
    id: 44, cat: 'gastronomia', emoji: '🍤', color: '#e05252',
    nombre: 'Feria del Marisco',
    lugar: 'Usulután, El Salvador',
    desc: 'Evento gastronómico masivo en Puerto El Triunfo con degustación de cocteles, curiles y paseos en lancha por la Bahía de Jiquilisco.',
    chips: ['Feria Municipal', '5 de Abril', 'Usulután'],
    coords: [13.2833, -88.55]
  },
  {
    id: 45, cat: 'evento', emoji: '🌾', color: '#52a0e0',
    nombre: 'Fiesta de la Primicia de la Cosecha',
    lugar: 'La Unión, El Salvador',
    desc: 'Tradición agraria de los pueblos lencas en Conchagua, entregando las primeras mazorcas del año en acción de gracias.',
    chips: ['Celebración Religiosa', '29 de Septiembre', 'La Unión'],
    coords: [13.3, -87.85]
  },
  {
    id: 46, cat: 'gastronomia', emoji: '🚜', color: '#e05252',
    nombre: 'Carnaval de la Panela de Verapaz',
    lugar: 'San Vicente, El Salvador',
    desc: 'Desfile de carretas tradicionales decoradas con caña de azúcar y moliendas portátiles por las principales calles del municipio.',
    chips: ['Festival Cultural', '4 de Marzo', 'San Vicente'],
    coords: [13.65, -88.85]
  },
  {
    id: 47, cat: 'gastronomia', emoji: '🌭', color: '#e05252',
    nombre: 'Fiestas Patronales de Cojutepeque',
    lugar: 'Cuscatlán, El Salvador',
    desc: 'Celebración en honor a San Sebastián Mártir, conocida a nivel nacional por sus tradicionales e incomparables embutidos.',
    chips: ['Fiesta Patronal', '15 de Enero', 'Cuscatlán'],
    coords: [13.7179, -88.9318] // Separado de la Semita tradicional (id: 9)
  },
  {
    id: 48, cat: 'evento', emoji: '👕', color: '#52a0e0',
    nombre: 'Festival del Añil',
    lugar: 'Cuscatlán, El Salvador',
    desc: 'Celebración en Suchitoto dedicada al \'oro azul\', exponiendo técnicas prehispánicas de teñido artesanal e historia colonial.',
    chips: ['Festival Cultural', '4 de Octubre', 'Cuscatlán'],
    coords: [14.0298, -89.0295] // Separado de los demás de Suchitoto
  },
  {
    id: 49, cat: 'evento', emoji: '🐎', color: '#52a0e0',
    nombre: 'Fiestas Patronales de Gotera',
    lugar: 'Morazán, El Salvador',
    desc: 'Eventos dedicados a San Francisco de Asís en San Francisco Gotera, combinando fe, jaripeos populares y danzas de la región.',
    chips: ['Fiesta Patronal', '15 de Noviembre', 'Morazán'],
    coords: [13.7, -88.1]
  },
  {
    id: 50, cat: 'gastronomia', emoji: '🐷', color: '#e05252',
    nombre: 'Festival Internacional del Chicharrón',
    lugar: 'La Libertad, El Salvador',
    desc: 'Feria culinaria de gran afluencia turística en Santa Tecla, centrada en la preparación creativa de platillos a base de cerdo.',
    chips: ['Feria Municipal', '12 de Diciembre', 'La Libertad'],
    coords: [13.6785, -89.2775]
  },

  /* ── NUEVOS LUGARES ── */
  {
    id: 51, cat: 'cultural', emoji: '🌋', color: '#be8e56',
    nombre: 'El Boquerón',
    lugar: 'Volcán de San Salvador, San Salvador',
    desc: 'Cráter del volcán de San Salvador, con miradores y senderos para caminar por su borde con vista panorámica de la capital.',
    chips: ['Volcán', 'Senderismo', 'Mirador'],
    coords: [13.7358, -89.2822]
  },
  {
    id: 52, cat: 'leyenda', emoji: '🪨', color: '#52c07c',
    nombre: 'Puerta del Diablo',
    lugar: 'Los Planes de Renderos, Panchimalco',
    desc: 'Formación rocosa con vista al valle de San Salvador, envuelta en leyendas populares sobre un portal al inframundo.',
    chips: ['Leyenda', 'Mirador', 'Senderismo'],
    coords: [13.6183, -89.1619]
  },

  /* ── SITIOS CULTURALES ADICIONALES ── */
  {
    id: 53, cat: 'cultural', emoji: '🏺', color: '#be8e56',
    nombre: 'Casa Blanca',
    lugar: 'Chalchuapa, Santa Ana',
    desc: 'Sitio arqueológico maya-pipil junto a Tazumal, con un taller demostrativo de teñido con añil.',
    chips: ['Maya-Pipil', 'Taller de añil', 'Entrada con costo'],
    coords: [13.9825, -89.6825]
  },
  {
    id: 54, cat: 'cultural', emoji: '🏛️', color: '#be8e56',
    nombre: 'Palacio Nacional',
    lugar: 'Centro Histórico, San Salvador',
    desc: 'Antigua sede de los tres poderes del Estado, inaugurado en 1911, hoy funciona como museo de entrada libre.',
    chips: ['Inaugurado 1911', 'Neoclásico', 'Museo, entrada libre'],
    coords: [13.6989, -89.1912]
  },
  {
    id: 55, cat: 'cultural', emoji: '🎭', color: '#be8e56',
    nombre: 'Teatro Nacional',
    lugar: 'Centro Histórico, San Salvador',
    desc: 'El teatro más antiguo que sigue en funciones en Centroamérica, inaugurado en 1917 con estilo neoclásico francés.',
    chips: ['Inaugurado 1917', 'Neoclásico francés', 'Sede cultural'],
    coords: [13.6976, -89.1923] // Separado del Palacio
  },
  {
    id: 56, cat: 'cultural', emoji: '⛪', color: '#be8e56',
    nombre: 'Iglesia El Rosario',
    lugar: 'Centro Histórico, San Salvador',
    desc: 'Templo de arquitectura moderna en concreto expuesto, célebre por sus vitrales de colores que iluminan todo el interior.',
    chips: ['Construida en los 70s', 'Arquitectura moderna', 'Acceso libre'],
    coords: [13.6968, -89.1895] // Separado del id:18 duplicado
  },

  /* ── EVENTOS CULTURALES NACIONALES ── */
  {
    id: 57, cat: 'evento', emoji: '🎚️', color: '#52a0e0',
    nombre: 'Semana Santa Nacional',
    lugar: 'Catedral Metropolitana, San Salvador',
    desc: 'Procesiones, vía crucis y alfombras de aserrín se viven en todo el país durante la Semana Santa, del 29 de marzo al 5 de abril de 2026.',
    chips: ['29 marzo–5 abril 2026', 'Procesiones', 'Alfombras de aserrín'],
    coords: [13.6980, -89.1901] // Separado del centro exacto de la Catedral
  },
  {
    id: 58, cat: 'evento', emoji: '🔥', color: '#52a0e0',
    nombre: 'Día de la Independencia',
    lugar: 'Plaza Cívica, San Salvador',
    desc: 'El 15 de septiembre de 2026 se conmemora la Independencia de Centroamérica con desfiles escolares y la Carrera de la Antorcha.',
    chips: ['15 de septiembre 2026', 'Desfiles', 'Antorcha de la Libertad'],
    coords: [13.7005, -89.1898] // Separado del Palacio e Independencia histórica
  },
  {
    id: 59, cat: 'evento', emoji: '🌼', color: '#52a0e0',
    nombre: 'Día de los Difuntos',
    lugar: 'Cementerio General, San Salvador',
    desc: 'El 1 y 2 de noviembre de 2026 las familias visitan los cementerios del país para honrar a sus seres queridos con flores y el tradicional fiambre.',
    chips: ['1–2 noviembre 2026', 'Cementerios', 'Fiambre'],
    coords: [13.6833, -89.1980]
  },
  {
    id: 60, cat: 'evento', emoji: '🎄', color: '#52a0e0',
    nombre: 'Navidad y Posadas',
    lugar: 'San Salvador',
    desc: 'Del 16 al 24 de diciembre de 2026 se celebran las posadas en todo el país, culminando en la Nochebuena con cohetes, tamales y ponche.',
    chips: ['16–24 diciembre 2026', 'Posadas', 'Nochebuena'],
    coords: [13.6910, -89.2200] // Separado de Fiestas Agostinas
  },
  {
    id: 61, cat: 'historia', emoji: '📜', color: '#7c52e0',
    nombre: 'Monumento a los Próceres',
    lugar: 'Plaza Libertad, San Salvador',
    desc: 'Lugar exacto donde comenzó el Primer Grito de Independencia de Centroamérica en 1811. Estatua del Ángel de la Libertad.',
    chips: ['1811', 'Plaza Libertad', 'Centro Histórico'],
    coords: [13.6960, -89.1885] // Desfasado al sur-este del Rosario y Catedral
  },
  {
    id: 62, cat: 'historia', emoji: '🏛️', color: '#7c52e0',
    nombre: 'Cine Metro',
    lugar: 'Centro Histórico, San Salvador',
    desc: 'Icónico edificio de la época de oro del cine salvadoreño del siglo XX, joya arquitectónica del modernismo capitalino.',
    chips: ['Siglo XX', 'Arquitectura', 'Patrimonio'],
    coords: [13.6998, -89.1945] // Desfasado al oeste del Palacio Nacional
  },
  {
    id: 63, cat: 'historia', emoji: '🚂', color: '#7c52e0',
    nombre: 'Plaza Ferroviaria',
    lugar: 'Sonsonate',
    desc: 'Antigua estación del ferrocarril nacional, testigo del auge cafetalero y el desarrollo comercial de El Salvador.',
    chips: ['Ferrocarril', 'Sonsonate', 'Museo Vivo'],
    coords: [13.7215, -89.7210] // Cerca de Sonsonate pero sin chocar con Nahuizalco
  },
  {
    id: 64, cat: 'historia', emoji: '🎖️', color: '#7c52e0',
    nombre: 'Museo Militar de la Fuerza Armada',
    lugar: 'San Jacinto, San Salvador',
    desc: 'Ubicado en el antiguo Cuartel El Zapote, resguarda la historia militar del país y el Papa Móvil usado en 1983 y 1996.',
    chips: ['San Jacinto', 'Cuartel El Zapote', 'Museo'],
    coords: [13.6885, -89.1902] // Al sur del Centro Histórico
  },
  {
    id: 65, cat: 'historia', emoji: '🛡️', color: '#7c52e0',
    nombre: 'Sitio Arqueológico Cihuatán',
    lugar: 'Aguilares, San Salvador',
    desc: 'Una de las mayores ciudades prehispánicas del país, habitada tras el colapso maya y fuertemente influenciada por los toltecas.',
    chips: ['Postclásico', 'Tolteca', 'Centro Ceremonial'],
    coords: [13.9612, -89.1685] // Al norte, libre de congestión
  },

  /* ── 5 NUEVOS LUGARES EN LEYENDAS (Añadir al final del bloque de leyendas) ── */
  {
    id: 66, cat: 'leyenda', emoji: '💧', color: '#52c07c',
    nombre: 'Laguna de Alegría',
    lugar: 'Usulután',
    desc: 'El "Esmeralda de América". Laguna sulfúrica en el cráter de un volcán donde habita la mítica sirena que encanta a los viajeros.',
    chips: ['La Sirena', 'Volcán Tecapa', 'Turismo Verde'],
    coords: [13.4930, -88.4945] // En el oriente del país
  },
  {
    id: 67, cat: 'leyenda', emoji: '👩', color: '#52c07c',
    nombre: 'Cuyancúa de Izalco',
    lugar: 'Izalco, Sonsonate',
    desc: 'Manantial mítico donde los abuelos aseguran que se manifestaba la Cuyancúa, criatura mitad serpiente y mitad cerdo que anunciaba lluvias.',
    chips: ['Cuyancúa', 'Mitología Pipil', 'Tradición Oral'],
    coords: [13.7485, -89.6720] // Disperso respecto a las Fiestas del Rey Guajactial
  },
  {
    id: 68, cat: 'leyenda', emoji: '🐾', color: '#52c07c',
    nombre: 'Cerro de las Pavas',
    lugar: 'Cojutepeque, Cuscatlán',
    desc: 'Cerro cubierto de niebla donde las leyendas locales cuentan que el Cadejo Blanco protegía a los fieles que subían en las noches.',
    chips: ['El Cadejo', 'Mirador', 'Coatepeque'],
    coords: [13.7198, -88.9372] // Disperso en la zona alta de Cojutepeque
  },
  {
    id: 69, cat: 'leyenda', emoji: '🏞️', color: '#52c07c',
    nombre: 'Río Sumpul',
    lugar: 'Chalatenango',
    desc: 'Río montañoso cuyas corrientes frías guardan la historia de los duendes guardianes del bosque que esconden las pertenencias de los acampantes.',
    chips: ['Los Duendes', 'Naturaleza', 'Chalatenango'],
    coords: [14.0720, -88.9510] // Al norte, cerca de Chalatenango centro
  },
  {
    id: 70, cat: 'leyenda', emoji: '👺', color: '#52c07c',
    nombre: 'Llanos de Olocuilta',
    lugar: 'La Paz',
    desc: 'Zona de planicies históricas vinculada a los relatos nocturnos de la carreta chillona, que avanza sin bueyes cobrando almas.',
    chips: ['Carreta Chillona', 'La Paz', 'Folclore'],
    coords: [13.5650, -89.1180] // Hacia el sur, camino a la costa
  },
];

/* ══════════════════════════════════════════════════════════
   INICIALIZACIÓN DEL MAPA CON LEAFLET
   (OpenStreetMap — completamente gratuito, sin API key)
   ══════════════════════════════════════════════════════════ */
const mapa = L.map('mapa-leaflet', {
  center: [13.7, -88.95],
  zoom: 10.45,
  zoomControl: false,
  attributionControl: true
});

L.control.zoom({ position: 'bottomright' }).addTo(mapa);

/* Tu mapa original de Stadia Maps funcionando con tu API Key */
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=65f24655-4886-4f79-844c-b55cf976acd3', {
  maxZoom: 16.5,
  updateWhenZooming: false, 
  keepBuffer: 8,           
}).addTo(mapa);
  

/* ══════════════════════════════════════════════════════════
   GEOLOCALIZACIÓN AUTOMÁTICA DEL USUARIO
   ══════════════════════════════════════════════════════════ */

/* ── Toast simple para avisos de geolocalización ── */
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

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;
      const userCoords = [userLat, userLng];

      // Creamos el icono del punto azul con pulso
      const userMarkerIcon = L.divIcon({
        className: 'user-location-marker',
        html: '<div class="user-pulse"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      // Añadimos el marcador de "Estás aquí" al mapa
      L.marker(userCoords, { icon: userMarkerIcon })
        .addTo(mapa)
        .bindPopup('<b style="color:#be8e56;">¡Estás aquí!</b><br><span style="color:#ccc; font-size:12px;">Descubre lo que tienes cerca.</span>');

      // CORRECCIÓN: Solo hacemos flyTo (paneo fluido) si NO venimos buscando un evento en la URL
      // CORRECCIÓN COMPLETA: Solo hacemos flyTo si NO venimos buscando un evento ni un sitio en la URL
      const params = new URLSearchParams(window.location.search);
      const tieneDestino = params.has('evento') || params.has('sitio') || params.has('nombre');
      
      if (!tieneDestino) {
        mapa.flyTo(userCoords, 13.9, {
          animate: true,
          duration: 1.5
        });
      }
    },
    (error) => {
      console.warn("Geolocalización rechazada o no disponible. Usando vista por defecto.", error);

      let mensaje;
      switch (error.code) {
        case error.PERMISSION_DENIED:
          mensaje = 'No se pudo acceder a tu ubicación porque el permiso fue denegado. Mostrando vista general de El Salvador.';
          break;
        case error.POSITION_UNAVAILABLE:
          mensaje = 'Tu ubicación no está disponible en este momento. Mostrando vista general de El Salvador.';
          break;
        case error.TIMEOUT:
          mensaje = 'Tardamos demasiado en obtener tu ubicación. Mostrando vista general de El Salvador.';
          break;
        default:
          mensaje = 'No pudimos obtener tu ubicación. Mostrando vista general de El Salvador.';
      }
      // Solo mostramos el toast de error si no venimos buscando un evento específico
      const params = new URLSearchParams(window.location.search);
      if (!params.has('evento') && !params.has('sitio') && !params.has('nombre')) {
        mostrarToastGeo(mensaje, 'error');
      }
    },
    {
      enableHighAccuracy: true,
      timeout: 6000,
      maximumAge: 0
    }
  );
} else {
  console.log("El navegador no soporta la geolocalización nativa.");
  const params = new URLSearchParams(window.location.search);
  if (!params.has('evento') && !params.has('sitio') && !params.has('nombre')) {
    mostrarToastGeo('Tu navegador no soporta geolocalización. Mostrando vista general de El Salvador.', 'error');
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

/* ── Colores de categoría para el texto del popup ── */
const CAT_COLORS = {
  cultural:   '#be8e56',
  gastronomia:'#e05252',
  evento:     '#52a0e0',
  historia:   '#7c52e0',
  leyenda:    '#52c07c'
};
const CAT_LABELS = {
  cultural:   'Sitio Cultural',
  gastronomia:'Gastronomía',
  evento:     'Evento Cultural',
  historia:   'Historia',
  leyenda:    'Leyenda'
};

/* ══════════════════════════════════════════════════════════
   IMAGEN DE REFERENCIA POR LUGAR
   ══════════════════════════════════════════════════════════ */
function getImgUrl(lm) {
  // El "../" sube un nivel de carpeta antes de buscar
  return `../assets/media/mapa/${lm.id}.webp?v=${new Date().getTime()}`;
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

function abrirSidebar(lm, marker) {
  sbImage.src = getImgUrl(lm);
  sbImage.alt = lm.nombre;
  sbEmojiBadge.textContent = lm.emoji;
  sbEmojiBadge.style.background = lm.color;
  sbCat.textContent = `${lm.emoji} ${CAT_LABELS[lm.cat]}`;
  sbCat.style.color = CAT_COLORS[lm.cat];
  sbTitle.textContent = lm.nombre;
  sbPlace.textContent = lm.lugar;
  sbDesc.textContent = lm.desc;
  sbChips.innerHTML = lm.chips.map(c => `<span class="popup-chip">${c}</span>`).join('');

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
    mapa.panTo(activeMarker.getLatLng(), { animate: true, duration: 0.8 });
  }
});

sbDirections.addEventListener('click', () => {
  if (!activeLandmark) return;
  const [lat, lng] = activeLandmark.coords;
  window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
});

/* ── Renderizar markers ── */
const markers = [];

/* CAMBIO EN LA RENDERIZACIÓN DE MARKERS */
LANDMARKS.forEach(lm => {
  const icono = crearIcono(lm.emoji, lm.color);
  const marker = L.marker(lm.coords, { icon: icono }).addTo(mapa);

  marker._landmarkCat = lm.cat;
  marker._landmarkId  = lm.id;

  // CORRECCIÓN: Agrega loading="lazy" (que ya tenías pero Leaflet a veces ignora si no se abre)
  // O mejor aún, genera el contenido dinámicamente en el evento 'tooltipopen'
  marker.bindTooltip(
    `<div class="marker-tooltip">
       <!-- loading="lazy" obliga al navegador a esperar -->
       <img src="${getImgUrl(lm)}" alt="${lm.nombre}" loading="lazy" />
       <div class="marker-tooltip__info">
         <span class="marker-tooltip__cat" style="color:${CAT_COLORS[lm.cat]}">${lm.emoji} ${CAT_LABELS[lm.cat]}</span>
         <span class="marker-tooltip__name">${lm.nombre}</span>
       </div>
     </div>`,
    { direction: 'top', offset: [0, -16], opacity: 1, className: 'marker-tooltip-wrap', sticky: false }
  );
marker.on('click', () => {
    abrirSidebar(lm, marker);
    // Centrado suave manteniendo el zoom actual
    mapa.panTo(marker.getLatLng(), { animate: true, duration: 0.8 });
  });
  markers.push(marker);
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
   MAPA DE SLUGS → ID DE LANDMARK
   (usado por el botón "Ver en mapa" de sitios-culturales.html,
   que enlaza con ?sitio=slug en vez de ?evento=id)
   ══════════════════════════════════════════════════════════ */
/* ══════════════════════════════════════════════════════════
   TABLA DE TRADUCCIÓN: EVENTO DEL CALENDARIO → LANDMARK REAL
   Cuando el evento del calendario tiene un landmark propio en
   LANDMARKS, usamos SU foto, descripción y chips reales.
   ══════════════════════════════════════════════════════════ */
const TRADUCTOR_A_LANDMARK = {
  3: 46,   // Feria de la Panela            -> Carnaval de la Panela de Verapaz
  5: 31,   // Día de la Cruz                -> Día de la Cruz
  8: 23,   // Fiestas Julias                -> Fiestas Julias
  9: 32,   // Festival del Maíz             -> Festival del Maíz
  10: 21,  // Fiestas Agostinas             -> Fiestas Agostinas
  12: 28,  // Festival del Jocote Corona    -> Festival del Jocote Corona
  13: 47,  // Fiestas de la Calabaza        -> Fiestas Patronales de Cojutepeque
  14: 30,  // Día de los Canchules          -> Día de los Canchules
  16: 59,  // Día de los Difuntos           -> Día de los Difuntos
  17: 48,  // Festival del Añil             -> Festival del Añil
  18: 26,  // Carnaval de San Miguel        -> Gran Carnaval de San Miguel
  20: 60,  // Día de la Virgen de Guadalupe -> Navidad y Posadas (referencia diciembre)
  21: 30,  // Los Canchules de Nahuizalco   -> Día de los Canchules
  22: 22,  // Día de los Farolitos          -> Día de los Farolitos
  23: 29,  // La Calabiuza                  -> Día de la Calabiuza
  24: 48,  // Festival del Añil             -> Festival del Añil
  25: 28,  // Festival del Jocote Corona    -> Festival del Jocote Corona
  26: 34,  // Tradición de los Encuentros   -> Tradición de los Encuentros
  27: 29,  // Día de la Calabiuza           -> Día de la Calabiuza
  28: 59,  // Día de los Difuntos           -> Día de los Difuntos
  29: 41,  // Festival del Barro            -> Festival del Barro
  30: 49,  // Fiestas Patronales de Gotera  -> Fiestas Patronales de Gotera
  31: 27,  // Historiantes de Cuisnahuat    -> Fiestas de los Historiantes de Cuisnahuat
  32: 26,  // Gran Carnaval de San Miguel   -> Gran Carnaval de San Miguel
  33: 30,  // Día de los Canchules          -> Día de los Canchules
  34: 50,  // Festival Internacional Chich. -> Festival Internacional del Chicharrón
  35: 35,  // Fiestas Patronales La Unión   -> Fiestas Patronales de La Unión
  36: 60,  // Navidad y Posadas             -> Navidad y Posadas
  37: 42,  // Fiestas del Arroz             -> Fiestas del Arroz
  38: 24   // Fiestas Patronales San Vte.   -> Fiestas Patronales de San Vicente
  // Los eventos no listados aquí (1,2,4,6,7,11,15,19) no tienen
  // landmark propio todavía: usan sus coords + datos del calendario.
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

  // CASO 1: El calendario mandó coordenadas + eventoId
  if (latParam && lngParam) {
    const lat = parseFloat(latParam);
    const lng = parseFloat(lngParam);
    const idEvento = eventoIdParam ? parseInt(eventoIdParam, 10) : null;

    if (!isNaN(lat) && !isNaN(lng)) {
      const idLandmarkReal = idEvento ? TRADUCTOR_A_LANDMARK[idEvento] : null;
      const landmarkReal = idLandmarkReal ? LANDMARKS.find(l => l.id === idLandmarkReal) : null;

      let lmEvento;

      if (landmarkReal) {
        // ✅ Existe landmark real: usamos SU foto, desc y chips tal cual
        lmEvento = landmarkReal;
      } else {
        // Respaldo: no hay landmark propio, usamos los datos del calendario
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

      // Si ya existe un marker de LANDMARKS para este lugar, lo reutilizamos
      let targetMarker = markers.find(m => m._landmarkId === lmEvento.id);

      if (!targetMarker) {
        // No existe marker todavía (evento sin landmark previo): lo creamos
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
               <span class="marker-tooltip__cat" style="color:${CAT_COLORS[lmEvento.cat]}">${lmEvento.emoji} ${CAT_LABELS[lmEvento.cat]}</span>
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
        // Ya existe: solo lo resaltamos con el ícono de highlight
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

  // CASO 2: Respaldo — búsqueda por slug (sitios culturales fijos del mapa)
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

  countEl.textContent = visible;
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

// Variable global para guardar la ubicación del usuario
let miUbicacionActual = null;

/* ── Toast simple para avisos de geolocalización ── */
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

// Función encargada de obtener la posición actual
function obtenerYCentrarUbicacion(debeCentrar = false) {
  // NUEVA VALIDACIÓN: Si venimos buscando un destino específico y NO se ha pulsado el botón de centrar manualmente, cancelamos el movimiento a la ubicación del usuario.
  const params = new URLSearchParams(window.location.search);
  const tieneDestino = params.has('evento') || params.has('sitio') || params.has('nombre');
  
  if (tieneDestino && !debeCentrar) {
    console.log("Geolocalización en segundo plano: Se omite el centrado automático para no perder el destino de la URL.");
    // Opcional: puedes dejar que obtenga la posición para pintar el punto azul, pero sin mover la cámara.
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

        L.marker(miUbicacionActual, { icon: userMarkerIcon }).addTo(mapa);

        // SOLO movemos la cámara si explícitamente se apretó el botón O si la URL está limpia de destinos
        if (debeCentrar || !tieneDestino) {
          mapa.flyTo(miUbicacionActual, 13.9, {
            animate: true,
            duration: 1.5
          });
        }
      },
      (error) => {
        console.warn("Geolocalización rechazada o no disponible.", error);

        let mensaje;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            mensaje = 'No se pudo acceder a tu ubicación porque el permiso fue denegado.';
            break;
          case error.POSITION_UNAVAILABLE:
            mensaje = 'Tu ubicación no está disponible en este momento.';
            break;
          case error.TIMEOUT:
            mensaje = 'Tardamos demasiado en obtener tu ubicación.';
            break;
          default:
            mensaje = 'No pudimos obtener tu ubicación.';
        }
        mostrarToastGeo(mensaje, 'error');
      },
      {
        enableHighAccuracy: true,
        timeout: 6000,
        maximumAge: 0
      }
    );
  } else {
    mostrarToastGeo('Tu navegador no soporta geolocalización.', 'error');
  }
}

// 1. Ejecución inicial automática al cargar la app
obtenerYCentrarUbicacion(false);

// 2. Evento del botón para re-centrar cuando el usuario se pierda
const btnMiUbicacion = document.getElementById('btn-mi-ubicacion');
if (btnMiUbicacion) {
  btnMiUbicacion.addEventListener('click', () => {
    if (miUbicacionActual) {
      // Si ya conocemos su ubicación, vamos directo fluidamente
      mapa.flyTo(miUbicacionActual, 14, {
        animate: true,
        duration: 1.2
      });
    } else {
      // Si falló antes o es primera vez, volvemos a solicitarla y forzamos el centrado
      mostrarToastGeo('Buscando tu ubicación exacta...', 'info');
      obtenerYCentrarUbicacion(true);
    }
  });
}