/* ============================================================
  Salvadorean Roots — historia-data.js
   Datos de la línea de tiempo histórica de El Salvador
   ============================================================ */

const HISTORIA_EVENTOS = [

  {
    id: "pipiles",
    era: "prehispanica",
    eraLabel: "Época Prehispánica",
    title: "Cuscatlán: el señorío pipil",
    date: "Siglo XI – 1524",
    img: "../assets/media/historia/tazumal2.jpg",
    text: [
      "Mucho antes de la llegada española, el territorio ya estaba habitado por civilizaciones agrícolas complejas. Hacia el siglo XI, un pueblo de origen náhuatl —emparentado con los aztecas— se asentó en el centro del territorio y fundó el señorío de Cuscatlán, que significa 'lugar de joyas y riquezas'.",
      "Los pipiles construyeron una sociedad organizada en nobles, sacerdotes, guerreros y agricultores. Cultivaban maíz, cacao y algodón, y mantenían rutas comerciales que llegaban hasta México y Costa Rica. Su capital se ubicaba cerca de lo que hoy es Antiguo Cuscatlán.",
      "Junto a los pipiles convivían otros pueblos originarios: los lencas en el oriente, los kakawiras en el norte y los mayas-chortís en el occidente, cada uno con lengua y organización propias. Sitios como Tazumal, Casa Blanca y San Andrés dan testimonio de esta época."
    ],
    location: { lat: 13.6736, lng: -89.2472, zoom: 10, caption: "Zona aproximada del antiguo señorío de Cuscatlán, cerca de Antiguo Cuscatlán y San Salvador." }
  },

  {
    id: "conquista",
    era: "colonia",
    eraLabel: "Colonia",
    title: "La conquista de Cuscatlán",
    date: "1524 – 1528",
    img: "../assets/media/historia/conquista.png",
    text: [
      "En 1524, Pedro de Alvarado —enviado por Hernán Cortés desde México— llegó al territorio pipil buscando someterlo a la Corona española. Se encontró con una resistencia feroz liderada por el cacique Atlacatl, que lo obligó a retirarse herido tras varias batallas.",
      "La conquista definitiva llegó en 1528, cuando Diego de Alvarado, hermano de Pedro, fundó la villa de San Salvador. El proceso fue devastador para los pueblos originarios, que perdieron tierras, autonomía y millones de vidas por la guerra y las enfermedades traídas de Europa.",
      "San Salvador pasó a depender de la Capitanía General de Guatemala, dentro del Virreinato de Nueva España, iniciando casi tres siglos de dominio colonial."
    ],
    location: { lat: 13.4948, lng: -89.5378, zoom: 11, caption: "Zona donde los pipiles resistieron el avance de Alvarado, cerca de Acajutla y la costa de Sonsonate." }
  },

  {
    id: "anil",
    era: "colonia",
    eraLabel: "Colonia",
    title: "La economía del añil",
    date: "1560 – 1800",
    img: "../assets/media/historia/eco-anil.png",
    text: [
      "Durante la Colonia, la economía salvadoreña giró en torno al añil (índigo), un tinte azul extraído de una planta local y muy codiciado en los talleres textiles de Europa. El añil convirtió a la provincia de San Salvador en una de las más prósperas de la región centroamericana.",
      "El cultivo se sostenía sobre haciendas que explotaban mano de obra indígena y, en menor medida, africana esclavizada. La riqueza generada por el añil sentó las bases de las primeras grandes fortunas familiares del territorio, antecesoras de la oligarquía que dominaría siglos después.",
      "El mestizaje biológico y cultural entre españoles, indígenas y africanos, junto con la imposición del idioma castellano y la religión católica, dio forma a la cultura criolla salvadoreña."
    ],
    location: { lat: 13.7942, lng: -88.8965, zoom: 10, caption: "Región de Chalatenango y el oriente, históricamente ligada al cultivo de añil colonial." }
  },

  {
    id: "independencia",
    era: "colonia",
    eraLabel: "Independencia",
    title: "Independencia de Centroamérica",
    date: "15 de septiembre de 1821",
    img: "../assets/media/historia/acta-independe.jpg",
    text: [
      "El 15 de septiembre de 1821, representantes de las provincias centroamericanas firmaron en Guatemala el Acta de Independencia, poniendo fin a tres siglos de dominio español. La noticia llegó a San Salvador días después.",
      "El Salvador vivió un período turbulento: primero fue anexado brevemente al Imperio Mexicano de Iturbide, y luego se integró a la República Federal de Centroamérica, un proyecto de unión regional que terminó fragmentándose por las tensiones entre liberales y conservadores.",
      "El 18 de febrero de 1841, El Salvador se constituyó como estado soberano e independiente al separarse definitivamente de la federación centroamericana."
    ],
    location: { lat: 13.6989, lng: -89.1914, zoom: 12, caption: "San Salvador, sede del poder político desde la época colonial." }
  },

  {
    id: "republica-cafe",
    era: "cafetalera",
    eraLabel: "República Cafetalera",
    title: "El auge del café",
    date: "1846 – 1900",
    img: "../assets/media/historia/auge-cafe.png",
    text: [
      "El café se introdujo en El Salvador en 1846, durante el gobierno de Eugenio Aguilar, pero fue con la presidencia de Gerardo Barrios (1859-1863) que su cultivo se impulsó como política de Estado, en sustitución del añil, cuyo precio caía por la aparición de tintes sintéticos.",
      "Las leyes de extinción de ejidos y tierras comunales, aprobadas entre 1881 y 1882, despojaron a comunidades indígenas y campesinas de sus tierras colectivas para concentrarlas en manos de un reducido grupo de familias cafetaleras.",
      "Hacia finales del siglo XIX, El Salvador se había transformado en una economía monoexportadora dependiente casi por completo del grano de oro, sentando las bases de una desigualdad social profunda y duradera."
    ],
    location: { lat: 13.9833, lng: -89.5597, zoom: 10, caption: "Las faldas del volcán de Santa Ana, una de las zonas cafetaleras más importantes del país." }
  },

  {
    id: "14-familias",
    era: "cafetalera",
    eraLabel: "República Cafetalera",
    title: "Las oligarquías cafetaleras",
    date: "1900 – 1930",
    img: "../assets/media/historia/oligarquia.png",
    text: [
      "A este puñado de familias que concentró la tierra, la exportación de café y el poder político se le conoció popularmente como 'las 14 familias' —un número más simbólico que exacto, evocando los catorce departamentos del país—. Apellidos como Dueñas, Regalado, Meléndez, Quiñónez, De Sola, Guirola, Álvarez y Hill dominaron la vida económica nacional.",
      "La familia Dueñas, cuyo patriarca Francisco Dueñas ocupó la presidencia varias veces en el siglo XIX, impulsó la privatización de tierras comunales y acumuló extensiones enormes de cafetales, como la histórica finca El Espino, hoy parte de Antiguo Cuscatlán y Santa Tecla.",
      "Entre 1913 y 1927, la dinastía Meléndez-Quiñónez gobernó el país de forma casi ininterrumpida, mezclando el poder político con los intereses cafetaleros de la élite. Mientras una pequeña minoría acumulaba haciendas y riqueza, la mayoría campesina vivía sin tierra propia y en pobreza extrema, una tensión social que estallaría pocos años después."
    ],
    location: { lat: 13.6769, lng: -89.2896, zoom: 12, caption: "Antiguo Cuscatlán y Santa Tecla, área de la histórica finca cafetalera El Espino." }
  },

  {
    id: "matanza-1932",
    era: "dictaduras",
    eraLabel: "Dictaduras Militares",
    title: "El levantamiento y La Matanza de 1932",
    date: "Enero de 1932",
    img: "../assets/media/Tazumal.webp",
    text: [
      "La caída del precio internacional del café tras la Gran Depresión hundió a miles de campesinos e indígenas del occidente del país en la miseria. El 22 de enero de 1932, un levantamiento campesino e indígena, con participación de dirigentes comunistas como Agustín Farabundo Martí y líderes indígenas como Feliciano Ama, tomó alcaldías y oficinas en Tacuba, Juayúa, Nahuizalco, Izalco, Sonsonate y otras localidades.",
      "El gobierno del general Maximiliano Hernández Martínez, que meses antes había llegado al poder tras el derrocamiento del presidente electo Arturo Araujo, respondió con una represión masiva conocida como La Matanza. En pocos días, decenas de miles de personas —mayoritariamente indígenas y campesinos del occidente— fueron ejecutadas.",
      "La Matanza marcó profundamente la identidad indígena salvadoreña: por temor a la represión, muchas comunidades abandonaron el traje tradicional y el idioma náhuat, acelerando su desaparición pública durante décadas."
    ],
    location: { lat: 13.7167, lng: -89.6833, zoom: 10, caption: "Izalco, Nahuizalco y Juayúa, epicentro del levantamiento y la represión de 1932." }
  },

  {
    id: "dictadura-martinez",
    era: "dictaduras",
    eraLabel: "Dictaduras Militares",
    title: "El régimen de Hernández Martínez",
    date: "1931 – 1944",
    img: "../assets/media/palacio-nacional.jpg",
    text: [
      "Tras consolidar el poder con la represión de 1932, el general Maximiliano Hernández Martínez inauguró trece años de gobierno autoritario, marcado por la censura de prensa, la vigilancia política y la ausencia de libertades civiles.",
      "Su gobierno favoreció directamente a los hacendados cafetaleros: condonó deudas agrarias y creó el Banco Hipotecario para financiar a los grandes propietarios de tierra, mientras reprimía cualquier forma de organización campesina u obrera.",
      "Hernández Martínez fue derrocado en mayo de 1944 tras una histórica 'huelga de brazos caídos' —una paralización cívica pacífica sin precedentes— pero su caída no puso fin al militarismo: dio inicio a una larga cadena de gobiernos militares que se prolongaría hasta 1979."
    ],
    location: { lat: 13.6989, lng: -89.1914, zoom: 12, caption: "Palacio Nacional en San Salvador, sede del poder ejecutivo durante este período." }
  },

  {
    id: "gobiernos-militares",
    era: "dictaduras",
    eraLabel: "Dictaduras Militares",
    title: "Casi medio siglo de gobiernos militares",
    date: "1944 – 1979",
    img: "../assets/media/MUNA.webp",
    text: [
      "Entre 1944 y 1979, El Salvador fue gobernado por una sucesión de oficiales del ejército que se turnaban el poder mediante elecciones frecuentemente fraudulentas, con el respaldo tácito o directo de la oligarquía terrateniente.",
      "Aunque hubo momentos de modernización económica e industrial en los años 50 y 60, la falta de una reforma agraria real y la represión constante contra sindicatos, estudiantes y organizaciones campesinas mantuvieron intacta la desigualdad estructural del país.",
      "Hacia finales de los años 70, la crisis del precio del café, la corrupción y el fraude electoral de 1972 y 1977 fueron erosionando la legitimidad del sistema, mientras crecían movimientos populares y las primeras organizaciones guerrilleras."
    ],
    location: { lat: 13.6989, lng: -89.1914, zoom: 11, caption: "San Salvador, centro del poder militar y político durante este período." }
  },

  {
    id: "golpe-1979",
    era: "guerra",
    eraLabel: "Guerra Civil",
    title: "El golpe de Estado de 1979",
    date: "15 de octubre de 1979",
    img: "../assets/media/Centro Historico.jpg",
    text: [
      "El 15 de octubre de 1979, un grupo de oficiales jóvenes liderados por el coronel Adolfo Majano derrocó al general Carlos Humberto Romero, poniendo fin a 48 años de gobiernos militares ininterrumpidos.",
      "Se formó una Junta Revolucionaria de Gobierno con la promesa de reformas democráticas y sociales, pero la violencia estatal y paramilitar no cesó: los llamados 'escuadrones de la muerte' intensificaron la persecución contra líderes sociales, sindicales y religiosos.",
      "Lejos de calmar la crisis, el golpe aceleró la polarización del país y el camino hacia una guerra civil abierta entre el gobierno y las fuerzas insurgentes de izquierda."
    ],
    location: { lat: 13.6989, lng: -89.1914, zoom: 12, caption: "San Salvador, donde se gestó el golpe de Estado que derrocó a Carlos Humberto Romero." }
  },

  {
    id: "inicio-guerra",
    era: "guerra",
    eraLabel: "Guerra Civil",
    title: "Estalla la guerra civil",
    date: "1980",
    img: "../assets/media/Suchitoto.webp",
    text: [
      "En 1980 se formó el Frente Farabundo Martí para la Liberación Nacional (FMLN), unificando a cinco organizaciones guerrilleras de izquierda. La guerra civil enfrentaría durante doce años al gobierno salvadoreño, con respaldo militar de Estados Unidos, contra la insurgencia del FMLN.",
      "El conflicto fue el desenlace de décadas de desigualdad extrema en la tenencia de la tierra, exclusión política y represión sistemática contra cualquier forma de disidencia u organización popular.",
      "Zonas rurales como Chalatenango, Morazán, Cuscatlán y Cabañas se convirtieron en escenarios centrales de la guerra, con comunidades enteras desplazadas por los combates y operativos militares de tierra arrasada."
    ],
    location: { lat: 14.0333, lng: -88.9333, zoom: 9, caption: "Chalatenango y Morazán, dos de los departamentos con mayor presencia guerrillera durante la guerra." }
  },

  {
    id: "romero",
    era: "guerra",
    eraLabel: "Guerra Civil",
    title: "El asesinato de Óscar Romero",
    date: "24 de marzo de 1980",
    img: "../assets/media/iglesia-rosario.jpg",
    text: [
      "El arzobispo de San Salvador, Óscar Arnulfo Romero, se convirtió en una de las voces más firmes contra la represión y la injusticia social, denunciando semana a semana los abusos del ejército y los escuadrones de la muerte desde la homilía dominical.",
      "Fue asesinado de un disparo el 24 de marzo de 1980 mientras oficiaba misa en la capilla del Hospital de la Divina Providencia, un día después de pedir públicamente a los soldados que dejaran de disparar contra su propio pueblo.",
      "Su muerte generó conmoción internacional y se convirtió en un símbolo de la lucha por los derechos humanos en América Latina. En 2018 fue canonizado como santo por la Iglesia católica."
    ],
    location: { lat: 13.6989, lng: -89.2242, zoom: 13, caption: "Zona de la Colonia Miramonte y el Hospital de la Divina Providencia, en San Salvador." }
  },

  {
    id: "jesuitas-uca",
    era: "guerra",
    eraLabel: "Guerra Civil",
    title: "La masacre de la UCA",
    date: "16 de noviembre de 1989",
    img: "../assets/media/MUNA.webp",
    text: [
      "En noviembre de 1989, el FMLN lanzó una gran ofensiva militar sobre San Salvador. En represalia, una unidad del ejército irrumpió en la Universidad Centroamericana José Simeón Cañas (UCA) y asesinó a seis sacerdotes jesuitas —entre ellos el rector Ignacio Ellacuría—, así como a su empleada doméstica y la hija de esta.",
      "El crimen, cometido contra intelectuales que habían impulsado el diálogo y la negociación de paz, generó una condena internacional que aceleró las gestiones diplomáticas para poner fin a la guerra.",
      "El caso se convirtió en uno de los símbolos más citados de la impunidad militar durante el conflicto armado salvadoreño."
    ],
    location: { lat: 13.6800, lng: -89.2350, zoom: 13, caption: "Campus de la Universidad Centroamericana (UCA), en San Salvador." }
  },

  {
    id: "acuerdos-paz",
    era: "guerra",
    eraLabel: "Guerra Civil",
    title: "Los Acuerdos de Paz de Chapultepec",
    date: "16 de enero de 1992",
    img: "../assets/media/casablanca.jpg",
    text: [
      "El 16 de enero de 1992, representantes del gobierno salvadoreño y del FMLN firmaron en el Castillo de Chapultepec, en Ciudad de México, los acuerdos que pusieron fin a doce años de guerra civil.",
      "El conflicto dejó un saldo estimado de más de 75,000 personas fallecidas y más de un millón de desplazados internos y refugiados, además de profundas heridas sociales que persisten hasta hoy.",
      "Los acuerdos incluyeron la reducción y depuración de la Fuerza Armada, la disolución de los cuerpos de seguridad más señalados por violaciones a derechos humanos, la creación de la Policía Nacional Civil y la reincorporación del FMLN a la vida política como partido legal."
    ],
    location: { lat: 19.4204, lng: -99.1822, zoom: 14, caption: "Castillo de Chapultepec, Ciudad de México, donde se firmó el fin de la guerra." }
  },

  {
    id: "posguerra",
    era: "actual",
    eraLabel: "El Salvador Actual",
    title: "Reconstrucción democrática",
    date: "1992 – 2019",
    img: "../assets/media/MUNA.webp",
    text: [
      "Tras la firma de la paz, El Salvador vivió casi tres décadas de alternancia democrática entre ARENA y el FMLN, los dos partidos surgidos directamente del conflicto armado. Se reconstruyeron instituciones, se realizaron elecciones competitivas y se consolidó una sociedad civil más activa.",
      "Sin embargo, la posguerra trajo también nuevos desafíos: la migración masiva hacia Estados Unidos —hoy una diáspora de más de dos millones de personas—, el auge de las pandillas y una violencia criminal que llegó a situar al país entre los más violentos del mundo en ciertos años.",
      "Las remesas enviadas por la diáspora salvadoreña se convirtieron en un pilar fundamental de la economía nacional, mientras la cultura, la literatura y las artes salvadoreñas ganaban reconocimiento internacional creciente."
    ],
    location: { lat: 13.6989, lng: -89.1914, zoom: 11, caption: "San Salvador, capital y centro de la reconstrucción institucional de posguerra." }
  },

  {
    id: "hoy",
    era: "actual",
    eraLabel: "El Salvador Actual",
    title: "Un nuevo capítulo",
    date: "2019 — hoy",
    img: "../assets/media/Catedral.jpg",
    text: [
      "En 2021, El Salvador se convirtió en el primer país del mundo en adoptar el Bitcoin como moneda de curso legal, un giro hacia la economía digital que generó tanto interés como debate a nivel internacional.",
      "El país ha vivido también una drástica reducción de los homicidios tras un régimen de excepción implementado desde 2022 contra las pandillas, una política ampliamente respaldada dentro del país pero cuestionada por organismos de derechos humanos por denuncias de detenciones arbitrarias.",
      "Con una población joven y una diáspora global que mantiene lazos culturales y económicos profundos con el país, El Salvador continúa escribiendo un capítulo marcado por la tensión entre la seguridad recuperada y los retos pendientes de su historia."
    ],
    location: { lat: 13.6989, lng: -89.1914, zoom: 12, caption: "Centro Histórico de San Salvador, corazón simbólico del país hoy." }
  }

];