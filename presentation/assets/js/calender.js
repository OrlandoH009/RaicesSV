/* ════════════════════════════════════════
   RaicesSV — Datos de festividades
   js/data.js
   Agrega o edita entradas en el array
   FESTIVIDADES para ampliar el catálogo.
════════════════════════════════════════ */

const FESTIVIDADES = [
  {
    id: 1,
    nombre: "Fiestas Agostinas del Salvador del Mundo",
    departamento: "San Salvador",
    municipio: "San Salvador",
    mes: 7, dia: 6,
    tipo: "Festividad Nacional",
    descripcion: "La celebración más importante del país en honor al Divino Salvador del Mundo, patrono de la nación. Incluye el Desfile del Sol, ferias, conciertos, Hipódromo y la tradicional Bajada de El Salvador. Una explosión de cultura, identidad y devoción que reúne a todos los salvadoreños.",
    mapUrl: "https://maps.google.com/?q=Plaza+El+Salvador+del+Mundo,+San+Salvador"
  },
  {
    id: 2,
    nombre: "Semana Santa de Sonsonate",
    departamento: "Sonsonate",
    municipio: "Sonsonate",
    mes: 3, dia: 18,
    tipo: "Celebración Religiosa",
    descripcion: "Reconocida como una de las procesiones más solemnes y vistosas de Centroamérica. Las alfombras de aserrín de colores, flores y vegetales adornan las calles durante días. Las imágenes recorren el casco histórico en procesiones que conservan tradiciones coloniales.",
    mapUrl: "https://maps.google.com/?q=Parroquia+Asuncion+Sonsonate,+El+Salvador"
  },
  {
    id: 3,
    nombre: "Feria de las Flores y las Palmas — Panchimalco",
    departamento: "San Salvador",
    municipio: "Panchimalco",
    mes: 4, dia: 1,
    tipo: "Festival Cultural",
    descripcion: "Tradición pipil que se celebra el primer domingo de mayo. Las mujeres de Panchimalco desfilan ataviadas con trajes típicos y elaboradas palmas decoradas con flores. Es un testimonio vivo de la herencia indígena del municipio.",
    mapUrl: "https://maps.google.com/?q=Panchimalco,+San+Salvador,+El+Salvador"
  },
  {
    id: 4,
    nombre: "Fiestas Patronales de Santa Ana",
    departamento: "Santa Ana",
    municipio: "Santa Ana",
    mes: 6, dia: 26,
    tipo: "Fiesta Patronal",
    descripcion: "En honor a Santa Ana, madre de la Virgen María. La segunda ciudad del país se viste de gala con desfiles hípicos, corridas de toros, ferias de artesanías, gastronomía típica y noches de carnaval frente al Parque Libertad.",
    mapUrl: "https://maps.google.com/?q=Parque+Libertad+Santa+Ana,+El+Salvador"
  },
  {
    id: 5,
    nombre: "Festival del Maíz — Izalco",
    departamento: "Sonsonate",
    municipio: "Izalco",
    mes: 7, dia: 25,
    tipo: "Festival Cultural",
    descripcion: "Celebración agrícola y cultural que rinde homenaje al maíz como elemento central de la identidad mesoamericana. Concursos de platillos típicos a base de maíz, danzas folclóricas y muestras artesanales con raíces nahuat.",
    mapUrl: "https://maps.google.com/?q=Izalco,+Sonsonate,+El+Salvador"
  },
  {
    id: 6,
    nombre: "Fiestas Patronales de San Miguel",
    departamento: "San Miguel",
    municipio: "San Miguel",
    mes: 10, dia: 29,
    tipo: "Fiesta Patronal",
    descripcion: "El Carnaval de San Miguel es el más grande de Centroamérica, celebrado en noviembre en honor a la Virgen de la Paz. Coloridas carrozas, bandas de música, bailes y una multitud que llega de toda la región hacen de este evento un ícono nacional.",
    mapUrl: "https://maps.google.com/?q=San+Miguel,+El+Salvador"
  },
  {
    id: 7,
    nombre: "Feria del Jute — Cacaopera",
    departamento: "Morazán",
    municipio: "Cacaopera",
    mes: 11, dia: 8,
    tipo: "Feria Municipal",
    descripcion: "En esta localidad de raíces lencas, el jute (caracol de río) es protagonista gastronómico y cultural. La feria rescata tradiciones culinarias ancestrales, artesanías en barro y la música de tambor y pito característica de los pueblos lencas del oriente.",
    mapUrl: "https://maps.google.com/?q=Cacaopera,+Morazán,+El+Salvador"
  },
  {
    id: 8,
    nombre: "Festival Internacional de Arte y Cultura — La Palma",
    departamento: "Chalatenango",
    municipio: "La Palma",
    mes: 9, dia: 12,
    tipo: "Festival Cultural",
    descripcion: "La Palma es conocida mundialmente por el arte naïf inspirado por Fernando Llort. Este festival reúne artesanos, pintores y músicos de toda la región en un mercado de arte al aire libre, talleres y exposiciones en el pueblo más pintoresco del norte salvadoreño.",
    mapUrl: "https://maps.google.com/?q=La+Palma,+Chalatenango,+El+Salvador"
  },
  {
    id: 9,
    nombre: "Fiestas Patronales de Ahuachapán",
    departamento: "Ahuachapán",
    municipio: "Ahuachapán",
    mes: 1, dia: 2,
    tipo: "Fiesta Patronal",
    descripcion: "En honor a la Candelaria, la ciudad de los ausoles festeja con corridas de toros, exposición ganadera, jaripeos, ferias gastronómicas con tamales pisques y yuca frita. El frío característico de la zona añade un ambiente especial a las noches de carnaval.",
    mapUrl: "https://maps.google.com/?q=Ahuachapán,+El+Salvador"
  },
  {
    id: 10,
    nombre: "Festival de Invierno — Juayúa",
    departamento: "Sonsonate",
    municipio: "Juayúa",
    mes: 0, dia: 1,
    tipo: "Feria Municipal",
    descripcion: "El famoso Festival Gastronómico de Juayúa se celebra cada fin de semana del año, pero su edición especial de enero atrae visitantes internacionales. Más de cien platillos típicos, exóticos y gourmet de El Salvador en la plaza del Cristo Negro.",
    mapUrl: "https://maps.google.com/?q=Juayúa,+Sonsonate,+El+Salvador"
  },
  {
    id: 11,
    nombre: "Fiestas Patronales de Cojutepeque",
    departamento: "Cuscatlán",
    municipio: "Cojutepeque",
    mes: 7, dia: 19,
    tipo: "Fiesta Patronal",
    descripcion: "La ciudad de las chorizos celebra a su patrona la Virgen de Fátima. Las celebraciones incluyen procesiones al cerro Pavas, donde se encuentra el santuario, además de bailes típicos, gastronomía local y el tradicional mercado artesanal.",
    mapUrl: "https://maps.google.com/?q=Cojutepeque,+Cuscatlán,+El+Salvador"
  },
  {
    id: 12,
    nombre: "Fiestas Navideñas — Ilobasco",
    departamento: "Cabañas",
    municipio: "Ilobasco",
    mes: 11, dia: 24,
    tipo: "Celebración Religiosa",
    descripcion: "Ilobasco, capital de la cerámica salvadoreña, vive la Navidad con una feria de arte en miniatura, los famosos 'sorpresas' de barro pintado a mano, posadas tradicionales, nacimientos elaborados con figuras artesanales y noches de aguinaldo.",
    mapUrl: "https://maps.google.com/?q=Ilobasco,+Cabañas,+El+Salvador"
  }
];