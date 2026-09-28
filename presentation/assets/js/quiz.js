/* ============================================================
  Salvadorean Roots — quiz-mejorado.js (v2.0)
   Quiz por niveles con ANIMACIONES GSAP + 28 PREGUNTAS POR NIVEL
   ============================================================ */

/* ══════════════════════════════════════════════════════════
   BANCO DE PREGUNTAS EXPANDIDO — 28 PREGUNTAS POR NIVEL
   ══════════════════════════════════════════════════════════ */
const PREGUNTAS = [

  /* ═════════════════════════════════════════════════════════
     HISTORIA
     ═════════════════════════════════════════════════════════ */

  // FÁCIL — nuevas, básicas y comerciales (ver marcador de inserción más abajo)
  { cat: 'historia', nivel: 'facil', pregunta: '¿En qué fecha El Salvador declaró su independencia de España?', opciones: ['12 de octubre de 1821', '1 de enero de 1821', '15 de agosto de 1821', '15 de septiembre de 1821'], correcta: 3, explicacion: 'El Salvador se independizó de España el 15 de septiembre de 1821, junto con otros países de Centroamérica.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuál es la capital de El Salvador?', opciones: ['Sonsonate', 'San Salvador', 'San Miguel', 'Santa Ana'], correcta: 1, explicacion: 'San Salvador es la capital y la ciudad más grande de El Salvador, ubicada en el Valle de las Hamacas.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuál es la flor nacional de El Salvador?', opciones: ['Flor de Izote', 'Magnolia', 'Rosa Salvadoreña', 'Lirio Blanco'], correcta: 0, explicacion: 'La Flor de Izote (Yucca elephantipes) es la flor nacional de El Salvador desde hace muchas décadas.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuál es el pájaro nacional de El Salvador?', opciones: ['Quetzal', 'Torogoz', 'Loro Verde', 'Gavilán'], correcta: 1, explicacion: 'El Torogoz fue declarado pájaro nacional de El Salvador por Acuerdo Legislativo el 21 de octubre de 1999, simbolizando la unidad familiar.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuáles son los colores de la bandera de El Salvador?', opciones: ['Azul, amarillo y rojo', 'Rojo, blanco y azul', 'Verde, blanco y rojo', 'Azul, blanco y azul'], correcta: 3, explicacion: 'La bandera de El Salvador tiene tres franjas horizontales: azul, blanco y azul, representando el cielo, la paz y el océano.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuál fue el papel de Monseñor Óscar Arnulfo Romero en la historia de El Salvador?', opciones: ['Fue conquistador español', 'Fue guerrillero revolucionario', 'Fue Arzobispo que defendió los derechos humanos', 'Fue presidente de la república'], correcta: 2, explicacion: 'Monseñor Romero fue Arzobispo de San Salvador y fue asesinado en 1980 por su valiente defensa de los derechos humanos durante la guerra civil.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿En qué año terminó la Guerra Civil de El Salvador?', opciones: ['1992', '1988', '1990', '1995'], correcta: 0, explicacion: 'La Guerra Civil de El Salvador terminó en 1992 con los Acuerdos de Paz de Chapultepec, firmados el 16 de enero de 1992.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuál era el nombre del territorio salvadoreño en la época precolombina?', opciones: ['Quetzaltenango', 'Cuscatlán', 'Tikal', 'Copán'], correcta: 1, explicacion: 'Cuscatlán era el nombre del reino Pipil que ocupaba el territorio de El Salvador. En lengua Pipil significa "tierra de las joyas y riquezas".' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Quién fue Farabundo Martí en la historia salvadoreña?', opciones: ['Un conquistador español', 'Un presidente de la república', 'Un santo católico', 'Un líder revolucionario'], correcta: 3, explicacion: 'Farabundo Martí fue un líder revolucionario que participó en movimientos laborales y organizó un levantamiento de campesinos en 1932.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuándo fue asesinado Monseñor Óscar Arnulfo Romero?', opciones: ['1 de enero de 1980', '24 de marzo de 1980', '31 de julio de 1980', '15 de septiembre de 1980'], correcta: 1, explicacion: 'Monseñor Óscar Arnulfo Romero fue asesinado el 24 de marzo de 1980 mientras celebraba la misa en la capilla del Hospital Divina Providencia.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Qué significa el nombre "Cuscatlán" en lengua Pipil?', opciones: ['Tierra de las joyas y riquezas', 'Tierra de agua', 'Tierra de fuego', 'Tierra de los dioses'], correcta: 0, explicacion: 'Cuscatlán, en lengua Pipil, significa "tierra de las joyas y riquezas", reflejando la abundancia de los recursos naturales de la región.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Es El Salvador el país más pequeño de Centroamérica?', opciones: ['No, Honduras es más pequeño', 'No, Belice es más pequeño', 'Sí, es el más pequeño', 'No, Costa Rica es más pequeño'], correcta: 2, explicacion: 'El Salvador es el país más pequeño de Centroamérica por área territorial, con poco más de 21,000 kilómetros cuadrados.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuál es el árbol nacional de El Salvador?', opciones: ['Pino', 'Caoba', 'Roble', 'Maquilishauat'], correcta: 3, explicacion: 'El Maquilishauat ha sido considerado el árbol nacional de El Salvador desde 1940, junto con el árbol de Bálsamo.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuál es la moneda oficial de El Salvador desde 2001?', opciones: ['El lempira', 'El dólar estadounidense', 'El quetzal', 'El colón salvadoreño'], correcta: 1, explicacion: 'El Salvador adoptó el dólar estadounidense como moneda oficial el 1 de enero de 2001, reemplazando al colón salvadoreño.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuál es el volcán más alto de El Salvador (también conocido como Ilamatepec)?', opciones: ['Santa Ana', 'San Salvador', 'Izalco', 'San Vicente'], correcta: 0, explicacion: 'El volcán Santa Ana (también llamado Ilamatepec) es el volcán más alto de El Salvador con 2,381 metros de altitud.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Quién es el patrón santo de El Salvador?', opciones: ['San Salvador', 'Jesucristo (El Divino Salvador del Mundo)', 'San Miguel', 'San Cristóbal'], correcta: 1, explicacion: 'Jesucristo es el patrón santo de El Salvador bajo el título "El Divino Salvador del Mundo", de donde proviene el nombre oficial del país.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuál es el apodo por el que El Salvador es conocido mundialmente?', opciones: ['Corazón de América Central', 'Tierra de Volcanes', 'Perla del Pacífico', 'Pulgarcito de América'], correcta: 3, explicacion: '"Pulgarcito de América" (Pequeño Pulgar de América) es el apodo cariñoso de El Salvador por ser el país más pequeño del continente americano.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuál grupo indígena poblaba El Salvador antes de la conquista española?', opciones: ['Los Aztecas', 'Los Pipiles', 'Los Incas', 'Los Mayas'], correcta: 1, explicacion: 'Los Pipiles fueron el grupo indígena principal que habitaba el territorio de El Salvador antes de la llegada de los españoles en el siglo XVI.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuántos volcanes se representan en el escudo de armas de El Salvador?', opciones: ['2 volcanes', '3 volcanes', '5 volcanes', '7 volcanes'], correcta: 2, explicacion: 'El escudo de armas de El Salvador muestra 5 volcanes verdes que emergen del océano azul, simbolizando los cinco estados de la antigua República Federal de Centroamérica.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿En qué siglo fue conquistado El Salvador por los españoles?', opciones: ['En el siglo XVIII', 'En el siglo XV', 'En el siglo XVI', 'En el siglo XVII'], correcta: 2, explicacion: 'El Salvador fue conquistado por los españoles en el siglo XVI bajo el mando de Pedro de Alvarado, quien llegó desde Guatemala.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuál es la lengua oficial de El Salvador?', opciones: ['Inglés', 'Español', 'Nahua', 'Lengua Pipil'], correcta: 1, explicacion: 'El español es la lengua oficial de El Salvador y es hablada por la gran mayoría de la población salvadoreña.' },

  // MEDIO (22)
  { cat: 'historia', nivel: 'medio', pregunta: '¿Cómo se llamaba el territorio salvadoreño antes de la conquista española?', opciones: ['Quetzaltenango', 'Cuscatlán', 'Tikal', 'Copán'], correcta: 1, explicacion: 'El territorio era conocido como Cuscatlán, nombre Pipil que significa "lugar de las joyas y riquezas".' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Cuándo se proclamó la Independencia de Centroamérica?', opciones: ['15 de julio de 1821', '15 de septiembre de 1821', '4 de julio de 1821', '18 de febrero de 1841'], correcta: 1, explicacion: 'El 15 de septiembre de 1821 se proclamó la Independencia de Centroamérica del dominio español.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Qué pueblo indígena era el más numeroso en El Salvador al llegar los españoles?', opciones: ['Los Mayas', 'Los Lencas', 'Los Pipiles', 'Los Aztecas'], correcta: 2, explicacion: 'Los Pipiles, de origen nahua emparentados con los aztecas, eran el grupo indígena más numeroso del territorio.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿En qué año El Salvador se separó definitivamente de la Federación Centroamericana?', opciones: ['1821', '1823', '1838', '1841'], correcta: 3, explicacion: 'El Salvador se constituyó como estado soberano el 18 de febrero de 1841 al separarse de la federación.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Quién es conocido como el "Padre de la Patria Salvadoreña"?', opciones: ['Anastasio Aquino', 'Pedro de Alvarado', 'José Matías Delgado', 'Francisco Morazán'], correcta: 2, explicacion: 'El sacerdote José Matías Delgado lideró los primeros movimientos independentistas de 1811 y 1814.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Cuál es la capital de El Salvador?', opciones: ['Santa Ana', 'San Salvador', 'Sonsonate', 'La Libertad'], correcta: 1, explicacion: 'San Salvador es la capital y ciudad más importante de El Salvador.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿En qué siglo llegó Pedro de Alvarado al territorio de Cuscatlán?', opciones: ['Siglo XV', 'Siglo XVI', 'Siglo XVII', 'Siglo XVIII'], correcta: 1, explicacion: 'Pedro de Alvarado llegó en 1524 durante el siglo XVI para conquistar el territorio.' },
  { cat: 'historia', nivel: 'medio', pregunta: "¿Cuál era la religión principal de los pueblos indígenas salvadoreños?", opciones: ["Cristianismo antes de 1500", "Politeísmo con dioses nahuas", "Monoteísmo de un dios solar", "Budismo llegado por el mar"], correcta: 1, explicacion: "Los pueblos indígenas practicaban el politeísmo, adorando a dioses de origen nahua como Quetzalcóatl." },
  { cat: 'historia', nivel: 'medio', pregunta: "¿Qué significa la palabra Cuscatlán en idioma Pipil?", opciones: ["Tierra de fuego y ceniza", "Lugar de joyas y riquezas", "Valle sagrado de los dioses", "Agua de las altas montañas"], correcta: 1, explicacion: "Cuscatlán significa \"lugar de las joyas y riquezas\" en el idioma Pipil." },
  { cat: 'historia', nivel: 'medio', pregunta: '¿A qué virreinato pertenecía administrativamente la Capitanía General de Guatemala?', opciones: ['Perú', 'Nueva España', 'Nueva Granada', 'Río de la Plata'], correcta: 1, explicacion: 'La Capitanía General de Guatemala, que incluía El Salvador, dependía del Virreinato de Nueva España.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿En qué fecha se celebra la Independencia de El Salvador?', opciones: ['15 de febrero', '15 de septiembre', '1 de noviembre', '14 de diciembre'], correcta: 1, explicacion: 'El 15 de septiembre se conmemora la Independencia de Centroamérica, incluido El Salvador.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Cuántos departamentos tiene El Salvador?', opciones: ['12', '14', '16', '18'], correcta: 1, explicacion: 'El Salvador está dividido en 14 departamentos administrativos.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Qué conquistador fue herido en la batalla del Acajutla?', opciones: ['Cortés', 'Pizarro', 'Pedro de Alvarado', 'Diego de Almagro'], correcta: 2, explicacion: 'Pedro de Alvarado fue herido en la batalla contra los Pipiles en el Río Acajutla.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Cuál fue el primer grito de independencia en El Salvador?', opciones: ['1808', '1811', '1815', '1821'], correcta: 1, explicacion: 'El primer grito de independencia ocurrió el 5 de noviembre de 1811, liderado por José Matías Delgado.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Qué estableció la Constitución de 1841 de El Salvador?', opciones: ['La monarquía como forma de gobierno', 'A El Salvador como Estado libre, soberano e independiente', 'La reincorporación a México', 'El regreso al dominio español'], correcta: 1, explicacion: 'La Constitución de 1841 declaró a El Salvador un Estado libre, soberano e independiente, tras su separación definitiva de la Federación Centroamericana.' },
  { cat: 'historia', nivel: 'medio', pregunta: "¿Qué importancia tuvo el café en la economía salvadoreña del siglo XIX?", opciones: ["Ninguna importancia comercial", "Principal producto de exportación", "Solo exportación a Guatemala", "Solo consumo interno y ritual"], correcta: 1, explicacion: "El café se convirtió en el motor económico de El Salvador a partir de la década de 1850." },
  { cat: 'historia', nivel: 'medio', pregunta: '¿A qué grupo étnico pertenecían los Pipiles?', opciones: ['Mayas', 'Nahuas', 'Lencas', 'Pokomames'], correcta: 1, explicacion: 'Los Pipiles eran de origen nahua, emparentados con los pueblos del Valle de México.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Cuál era el idioma principal de los Pipiles?', opciones: ['Quiche', 'Nahua/Pipil', 'Lenca', 'Chorti'], correcta: 1, explicacion: 'Los Pipiles hablaban el idioma Pipil, una variante del Nahua.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿En cuánto tiempo aproximadamente se conquistó el territorio salvadoreño?', opciones: ['1 año', '3-5 años', '10 años', '20 años'], correcta: 1, explicacion: 'La conquista del territorio de Cuscatlán tomó aproximadamente 3-5 años, completándose alrededor de 1528.' },
  { cat: 'historia', nivel: 'medio', pregunta: "¿Cuál era la actividad económica principal de los pueblos indígenas pre-hispanicos?", opciones: ["Ganadería de vacunos", "Agricultura y comercio", "Minería de oro y plata", "Industria textil masiva"], correcta: 1, explicacion: "Los pueblos indígenas se basaban en la agricultura (maíz, frijol, cacao) y el comercio activo." },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Cuál era la capital prehispánica más importante del territorio?', opciones: ['Chalchuapa', 'Cuzcatlán', 'Cojutepeque', 'Sonsonate'], correcta: 1, explicacion: 'Cuzcatlán era la capital prehispánica más importante, ubicada en lo que es hoy La Libertad.' },
  { cat: 'historia', nivel: 'medio', pregunta: "¿Qué tipo de gobierno tenían los pueblos indígenas salvadoreños?", opciones: ["Monarquía absoluta heredada", "Señoríos regidos por caciques", "República democrática electa", "Teocracia pura de sacerdotes"], correcta: 1, explicacion: "El territorio estaba dividido en señoríos independientes, cada uno gobernado por su propio cacique o príncipe." },

  // DIFÍCIL (24)
  { cat: 'historia', nivel: 'dificil', pregunta: '¿En qué departamento se encuentra el sitio arqueológico de Tazumal, uno de los legados más importantes de la civilización Pipil?', opciones: ['Sonsonate', 'Santa Ana', 'Cuscatlán', 'La Paz'], correcta: 1, explicacion: 'Tazumal, uno de los sitios arqueológicos más importantes de El Salvador, se ubica en Chalchuapa, departamento de Santa Ana.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Qué cultivo fue la base de la economía colonial salvadoreña antes del café?', opciones: ['Cacao', 'Algodón', 'Añil', 'Caña de azúcar'], correcta: 2, explicacion: 'El añil (índigo), un tinte azul muy valorado en Europa, fue el principal producto de exportación colonial.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿En qué año se firmaron los Acuerdos de Paz de Chapultepec?', opciones: ['1989', '1990', '1992', '1994'], correcta: 2, explicacion: 'El 16 de enero de 1992 se firmaron los Acuerdos de Paz que pusieron fin a 12 años de conflicto armado.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Qué conquistador español intentó dominar Cuscatlán en 1524?', opciones: ['Hernán Cortés', 'Francisco Pizarro', 'Pedro de Alvarado', 'Diego de Almagro'], correcta: 2, explicacion: 'Pedro de Alvarado fue herido por los Pipiles en la batalla del Río Acajutla.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Cuántas víctimas se estima que dejó la Matanza de 1932?', opciones: ['Más de 5,000', 'Más de 10,000', 'Más de 20,000', 'Más de 30,000'], correcta: 3, explicacion: 'Se estima que más de 30,000 personas fueron masacradas en la rebelión de 1932.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Bajo qué virreinato perteneció El Salvador durante la época colonial?', opciones: ['Virreinato del Perú', 'Virreinato de Nueva España', 'Virreinato de Nueva Granada', 'Virreinato del Río de la Plata'], correcta: 1, explicacion: 'El Salvador fue parte de la Capitanía General de Guatemala, dependiente del Virreinato de Nueva España.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Cómo se llamó el sistema colonial que otorgaba a los españoles el derecho a exigir tributo y trabajo de los indígenas?', opciones: ['El repartimiento', 'La encomienda', 'El cabildo', 'El corregimiento'], correcta: 1, explicacion: 'La encomienda fue el sistema colonial que otorgaba a los españoles el derecho de recibir tributo y trabajo de los indígenas a cambio de "protegerlos" y evangelizarlos.' },
  { cat: 'historia', nivel: 'dificil', pregunta: "¿Quién fue Farabundo Martí?", opciones: ["Militar conservador de 1932", "Líder comunista revolucionario", "Empresario cafetalero rico", "General de la derecha militar"], correcta: 1, explicacion: "Farabundo Martí fue un líder comunista que lideró la rebelión campesina e indígena de 1932." },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿En qué año se libró la "Guerra del Fútbol" entre El Salvador y Honduras?', opciones: ['1965', '1967', '1969', '1971'], correcta: 2, explicacion: 'La Guerra del Fútbol ocurrió en 1969, originada tras enfrentamientos en partidos de fútbol y conflictos fronterizos.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Cuántos años duró la Guerra Civil Salvadoreña?', opciones: ['8 años', '10 años', '12 años', '15 años'], correcta: 2, explicacion: 'La Guerra Civil duró 12 años, de 1980 a 1992, hasta los Acuerdos de Paz de Chapultepec.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Qué presidente salvadoreño del siglo XIX impulsó la abolición de las tierras comunales (ejidos) para expandir el cultivo del café?', opciones: ['Rafael Zaldívar', 'Francisco Menéndez', 'Tomás Regalado', 'Carlos Ezeta'], correcta: 0, explicacion: 'El presidente Rafael Zaldívar decretó en 1881-1882 la abolición de las tierras comunales y ejidales para favorecer la expansión del cultivo del café.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿En qué año se estableció la moneda del dólar como oficial en El Salvador?', opciones: ['1999', '2000', '2001', '2002'], correcta: 2, explicacion: 'El Salvador adoptó el dólar estadounidense como moneda oficial el 1 de enero de 2001 con la "Ley de Integración Monetaria".' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Qué grupo derrocó al presidente Salvador Castaneda Castro el 14 de diciembre de 1948?', opciones: ['Un grupo de jóvenes oficiales militares', 'La FMLN', 'Los cafetaleros oligarcas', 'Tropas hondureñas invasoras'], correcta: 0, explicacion: 'El 14 de diciembre de 1948, un grupo de jóvenes oficiales militares derrocó al presidente Castaneda Castro, dando inicio a la llamada "Revolución del 48".' },
  { cat: 'historia', nivel: 'dificil', pregunta: "¿Quién fue Maximiliano Hernández Martínez?", opciones: ["Héroe nacional de la guerra", "Dictador militar del siglo XX", "Prócer de la independencia", "Conquistador español de 1524"], correcta: 1, explicacion: "Maximiliano Hernández Martínez fue un dictador militar que gobernó El Salvador entre 1931 y 1944." },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿En qué año se escindió la Federación Centroamericana por primera vez?', opciones: ['1838', '1839', '1840', '1841'], correcta: 0, explicacion: 'La Federación Centroamericana comenzó a desintegrarse en 1838, culminando con la salida de El Salvador.' },
  { cat: 'historia', nivel: 'dificil', pregunta: "¿Cuál fue la principal consecuencia de la Matanza de 1932?", opciones: ["Fin de la exportación de café", "Represión a indígenas y campesinos", "Unificación total de Centroamérica", "Democratización inmediata del país"], correcta: 1, explicacion: "La matanza resultó en una represión severa contra la población indígena y campesina por décadas." },
  { cat: 'historia', nivel: 'dificil', pregunta: "¿Qué fue el \"Tratado de Esquipulas\"?", opciones: ["Acuerdo comercial de aduanas", "Acuerdo de paz centroamericano", "Alianza militar contra Belice", "Tratado de límites marítimos"], correcta: 1, explicacion: "Los Acuerdos de Esquipulas II (1987) fueron un plan para la paz y la democratización de Centroamérica." },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿En qué año se fundó la FMLN?', opciones: ['1975', '1977', '1979', '1980'], correcta: 3, explicacion: 'El Frente Farabundo Martí para la Liberación Nacional (FMLN) fue fundado el 10 de octubre de 1980 como coalición guerrillera.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿En qué año lanzó el FMLN su "Ofensiva Final" contra la capital, San Salvador?', opciones: ['1986', '1987', '1989', '1991'], correcta: 2, explicacion: 'En noviembre de 1989, el FMLN lanzó su mayor ofensiva militar, llegando a combatir dentro de la capital, San Salvador.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Quién fue el presidente salvadoreño Gerardo Barrios, fusilado en 1865?', opciones: ['Un conquistador español', 'Un impulsor del cultivo del café', 'Un dictador del siglo XX', 'Un arzobispo mártir'], correcta: 1, explicacion: 'Gerardo Barrios, presidente de El Salvador (1859-1863), impulsó activamente el cultivo del café; fue derrocado y fusilado en 1865.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿En qué año entró en vigor la actual Constitución Política de El Salvador?', opciones: ['1962', '1972', '1983', '1994'], correcta: 2, explicacion: 'La Constitución de 1983, promulgada durante la Guerra Civil, sigue vigente hasta hoy con numerosas reformas.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Cuál fue el evento que precedió inmediatamente a la Guerra Civil de 1980?', opciones: ['Golpe de 1979', 'Elecciones de 1982', 'Crisis económica de 1970', 'Terremoto de 1976'], correcta: 0, explicacion: 'El golpe militar del 15 de octubre de 1979 desestabilizó el país y llevó al inicio de la Guerra Civil.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Cuántos signatarios había en los Acuerdos de Paz de Chapultepec?', opciones: ['FMLN y Gobierno', 'FMLN, Gobierno y ONU', 'FMLN, Gobierno, ONU e IDHUCA', 'FMLN, Gobierno y EE.UU.'], correcta: 1, explicacion: 'Los Acuerdos fueron suscritos por la FMLN, el Gobierno de El Salvador y la ONU como mediadora.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿En qué año se destituye al General Romero?', opciones: ['1977', '1979', '1980', '1982'], correcta: 1, explicacion: 'El General Carlos Humberto Romero fue derrocado en el golpe militar del 15 de octubre de 1979.' },

  // GUANACO (23)
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Cuál fue el nombre del cacique Pipil que lideró la resistencia contra Pedro de Alvarado?', opciones: ['Lempira', 'Atlacatl', 'Nicarao', 'Tezozomoc'], correcta: 1, explicacion: 'Atlacatl fue el legendario jefe guerrero Pipil que encabezó la resistencia indígena contra la conquista.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Quién lideró el levantamiento indígena de 1833 en Nonualco?', opciones: ['Farabundo Martí', 'Anastasio Aquino', 'Felipe Xicotencatl', 'Miguel Cabrera'], correcta: 1, explicacion: 'Anastasio Aquino, conocido como el "Rey de los Nonualcos", lideró una rebelión campesina e indígena en 1833.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿En qué fecha fue asesinado el Arzobispo Óscar Romero?', opciones: ['16 enero de 1980', '24 de marzo de 1980', '15 de octubre de 1979', '11 de noviembre de 1989'], correcta: 1, explicacion: 'Óscar Romero fue asesinado el 24 de marzo de 1980 mientras celebraba misa.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Cuál fue el primer grito de independencia salvadoreño y en qué fecha?', opciones: ['5 de noviembre de 1811', '15 de septiembre de 1821', '24 de febrero de 1814', '2 de noviembre de 1811'], correcta: 0, explicacion: 'El primer grito de independencia ocurrió el 5 de noviembre de 1811, liderado por José Matías Delgado.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: "¿Qué tratado internacional reconoció los límites de El Salvador con Honduras?", opciones: ["Tratado de Paz de Lima 1902", "Tratado de Washington de 1907", "Tratado General de Paz de 1980", "Tratado de Esquipulas de 1987"], correcta: 2, explicacion: "El Tratado General de Paz de 1980 estableció los límites territoriales entre El Salvador y Honduras." },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿En qué departamento se ubica la antigua capital prehispánica de Cuzcatlán?', opciones: ['San Salvador', 'La Libertad', 'Cuscatlán', 'Chalatenango'], correcta: 1, explicacion: 'La capital prehispánica se ubicaba en lo que hoy es Antiguo Cuscatlán, en el departamento de La Libertad.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Cuál fue el nombre del golpe de estado de 1979?', opciones: ['La Revolución de Abril', 'El Golpe de los Militares Jóvenes', 'La Proclama Cívico-Militar', 'El Pronunciamiento del 15 de octubre'], correcta: 3, explicacion: 'El 15 de octubre de 1979 ocurrió "El Pronunciamiento del 15 de octubre" que derrocó al general Romero.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Cómo se llama el sector que históricamente dominó la política salvadoreña?', opciones: ['El Círculo de Oro', 'Las 14 Familias', 'La Élite del Café', 'Los Señores de la Tierra'], correcta: 1, explicacion: 'Las "14 Familias" es el término popular para referirse a la oligarquía cafetalera del siglo XX.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Quién fue designado como presidente durante los Acuerdos de Paz?', opciones: ['Alfredo Cristiani', 'José Napoleón Duarte', 'Armando Calderón Sol', 'Mauricio Funes'], correcta: 0, explicacion: 'Alfredo Cristiani fue el presidente durante la firma de los Acuerdos de Paz de Chapultepec en 1992.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿En qué año fue fundada definitivamente la ciudad de San Salvador en el Valle de las Hamacas, su ubicación actual?', opciones: ['1524', '1525', '1528', '1533'], correcta: 2, explicacion: 'Tras un primer asentamiento fallido en 1525 cerca de Suchitoto, San Salvador fue refundada en 1528 en el Valle de las Hamacas, su emplazamiento definitivo.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: "¿Cuál era la estructura administrativa colonial de El Salvador?", opciones: ["Virreinato independiente de Cuscatlán", "Provincia de la Capitanía de Guatemala", "Gobernación autónoma bajo la Corona", "Alcaldía Mayor dependiente de Lima"], correcta: 1, explicacion: "El Salvador fue una Provincia de la Capitanía General de Guatemala durante la época colonial." },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Dónde y cuándo murió el presidente guatemalteco Justo Rufino Barrios al intentar reunificar Centroamérica por la fuerza?', opciones: ['Batalla de Chalchuapa, El Salvador, 1885', 'Batalla de Coatepeque, Guatemala, 1863', 'Batalla de Acajutla, El Salvador, 1524', 'Batalla de San Salvador, 1871'], correcta: 0, explicacion: 'Justo Rufino Barrios murió en la Batalla de Chalchuapa el 2 de abril de 1885, durante su intento de reunificación forzada de Centroamérica.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Cuántos comandantes guerrilleros principales lideraban la FMLN?', opciones: ['3', '4', '5', '6'], correcta: 2, explicacion: 'La FMLN estaba compuesta por 5 organizaciones guerrilleras con sus comandantes principales.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: "¿Qué acuerdo internacional patrocinó los Acuerdos de Paz?", opciones: ["Liga de las Naciones de 1919", "Organización de Naciones Unidas", "Organización de Países Americanos", "Unión Europea de los Estados"], correcta: 1, explicacion: "La Organización de Naciones Unidas (ONU) fue la mediadora oficial en los Acuerdos de Paz de 1992." },
  { cat: 'historia', nivel: 'guanaco', pregunta: "¿En qué época se produjo la mayor migración salvadoreña hacia Estados Unidos?", opciones: ["Década de 1950 y 1960", "Década de 1970 temprana", "Década de 1980 y 1990", "Década del 2000 al 2010"], correcta: 2, explicacion: "La Guerra Civil de 1980-1992 causó la mayor migración de salvadoreños hacia Estados Unidos." },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Cuál fue la primera villa fundada por los españoles en el territorio salvadoreño?', opciones: ['San Vicente', 'San Salvador', 'Sonsonate', 'Santa Ana'], correcta: 1, explicacion: 'San Salvador fue fundada en 1525 (cerca de la actual Suchitoto) y refundada en 1528 en su ubicación actual, siendo la primera villa española en el territorio.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Bajo el gobierno de qué presidente se promulgó la Constitución de 1886 de El Salvador?', opciones: ['Rafael Zaldívar', 'Francisco Menéndez', 'Carlos Ezeta', 'Tomás Regalado'], correcta: 1, explicacion: 'La Constitución de 1886, de tendencia liberal, fue promulgada durante el gobierno del general Francisco Menéndez, tras la "Revolución de los 44".' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿En qué año terminó oficialmente la presencia española en El Salvador?', opciones: ['1811', '1821', '1841', '1900'], correcta: 1, explicacion: 'Con la independencia centroamericana en 1821, terminó la presencia española en El Salvador.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: "¿Qué provocó la fractura de la Federación Centroamericana?", opciones: ["Un bloqueo comercial de Inglaterra", "Diferencias políticas y económicas", "Un terremoto que destruyó la capital", "Una epidemia de fiebre amarilla"], correcta: 1, explicacion: "Las diferencias políticas, conservador vs. liberal, y los intereses económicos divergentes causaron la desintegración." },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Qué ciudad fue la capital de El Salvador durante la época federal?', opciones: ['San Vicente', 'San Salvador', 'Santa Ana', 'La Libertad'], correcta: 1, explicacion: 'San Salvador fue la capital durante el período de la Federación Centroamericana.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: "¿Cuál fue la principal causa de la Guerra del Fútbol de 1969?", opciones: ["Únicamente la rivalidad deportiva", "Conflictos fronterizos y migratorios", "Disputa por los recursos mineros", "Una intervención estadounidense"], correcta: 1, explicacion: "La guerra fue resultado de conflictos fronterizos, deportivos y la migración salvadoreña en Honduras." },
  { cat: 'historia', nivel: 'guanaco', pregunta: "¿Qué institución moderaba el conflicto en los Acuerdos de Paz?", opciones: ["La Cruz Roja Internacional", "Organización de Naciones Unidas", "Organización de Estados Americanos", "La Liga Árabe con sede en Egipto"], correcta: 1, explicacion: "La ONU jugó un papel crucial como moderadora y verificadora de los Acuerdos de Paz." },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Cuántas constituciones políticas ha tenido El Salvador desde su independencia?', opciones: ['8', '10', '12', '13'], correcta: 3, explicacion: 'El Salvador ha tenido 13 constituciones políticas desde su independencia; la vigente, de 1983, es la de mayor duración en su historia.' },

  /* ═════════════════════════════════════════════════════════
     GASTRONOMÍA
     ═════════════════════════════════════════════════════════ */

  // FÁCIL — nuevas, básicas y comerciales (ver marcador de inserción más abajo)
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Cuál es el relleno más tradicional de las pupusas salvadoreñas?', opciones: ['Chocolate', 'Pollo con curry', 'Atún', 'Queso con frijol'], correcta: 3, explicacion: 'Las pupusas se rellenan tradicionalmente con queso fresco y frijoles refritos. Esta combinación es la más popular y auténtica en El Salvador.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Qué es el curtido en la gastronomía salvadoreña?', opciones: ['Un postre de chocolate', 'Una ensalada de repollo y zanahoria encurtidos', 'Una bebida fría', 'Un tipo de dulce'], correcta: 1, explicacion: 'El curtido es un acompañamiento típico salvadoreño hecho de repollo y zanahoria encurtidos en vinagre. Se sirve especialmente con pupusas.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Cuál es la bebida tradicional salvadoreña hecha a base de maíz?', opciones: ['Atol', 'Vino', 'Limonada', 'Cerveza'], correcta: 0, explicacion: 'El atol es una bebida espesa y caliente hecha de maíz tierno. Es muy popular en El Salvador, especialmente al desayuno y en las tardes.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿En qué instrumento se cocinan tradicionalmente las pupusas?', opciones: ['Microondas', 'Comal', 'Horno', 'Parrilla'], correcta: 1, explicacion: 'Las pupusas se cocinan en un comal, que es una plancha plana de barro o metal usada tradicionalmente en Centroamérica.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Qué es la horchata salvadoreña?', opciones: ['Un tipo de pan', 'Un platillo de carne', 'Un postre helado', 'Una bebida de arroz y canela'], correcta: 3, explicacion: 'La horchata es una bebida refrescante hecha de arroz molido, almendras y canela. Se sirve fría y es muy popular en El Salvador.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Cuál es la masa principal de una pupusa?', opciones: ['Masa de yuca', 'Masa de papa', 'Masa de maíz', 'Masa de trigo'], correcta: 2, explicacion: 'Las pupusas están hechas de masa de maíz cocida, similar a la masa que se usa para las tortillas.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Qué bebida típica salvadoreña se prepara con tamarindo?', opciones: ['Refresco de tamarindo', 'Agua de cebada', 'Jugo de naranja', 'Licuado de plátano'], correcta: 0, explicacion: 'El refresco de tamarindo es una bebida refrescante muy popular en El Salvador, hecha de la pulpa de tamarindo con agua y azúcar.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Cuál es un acompañamiento típico para las pupusas además del curtido?', opciones: ['Mayonesa', 'Salsa de tomate', 'Mostaza', 'Ketchup'], correcta: 1, explicacion: 'La salsa de tomate es un acompañamiento tradicional que se sirve junto con el curtido cuando se comen pupusas salvadoreñas.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Qué es "chicharrón" en la gastronomía salvadoreña?', opciones: ['Carne molida', 'Pollo asado', 'Pescado salado', 'Carne de cerdo frita'], correcta: 3, explicacion: 'El chicharrón es carne de cerdo frita y crujiente, un relleno común en las pupusas y otros platillos salvadoreños.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Cuál de estos platillos es típico del desayuno salvadoreño?', opciones: ['Tacos de mariscos', 'Pupusas', 'Sushi', 'Pizza'], correcta: 1, explicacion: 'Las pupusas son un desayuno muy típico en El Salvador. Se sirven acompañadas de curtido, salsa y una bebida caliente como el atol o café.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Qué bebida caliente es muy popular en El Salvador por las tardes?', opciones: ['Atol shuco', 'Leche helada', 'Café frío', 'Té de manzanilla'], correcta: 0, explicacion: 'El atol shuco es una bebida espesa y caliente preparada con masa de maíz. Es típica de las tardes salvadoreñas, especialmente en pupuserías.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Cuál es el nombre de la sopa típica salvadoreña con pollo y maíz?', opciones: ['Pozole', 'Gumbo', 'Sopa de pollo con maíz', 'Caldo de costilla'], correcta: 2, explicacion: 'La sopa de pollo con maíz es un caldo tradicional salvadoreño muy consumido, especialmente en desayunos y como comida reconfortante.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Qué acompañamiento hecho de vegetales encurtidos es esencial con las pupusas?', opciones: ['Pico de gallo', 'Guacamole', 'Cebolla morada', 'Curtido'], correcta: 3, explicacion: 'El curtido es el acompañamiento más importante con las pupusas. Está hecho de repollo, zanahoria y otras verduras encurtidas en vinagre.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Cuál es un platillo típico salvadoreño hecho de masa de maíz rellena?', opciones: ['Enchilada', 'Pupusa', 'Arepa', 'Tamale'], correcta: 1, explicacion: 'La pupusa es el platillo nacional de El Salvador, hecha de masa de maíz rellena de queso, frijoles, chicharrón u otras opciones.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Qué bebida tradicional salvadoreña se hace con harina de arroz y especias?', opciones: ['Horchata', 'Aguas frescas', 'Limonada', 'Té helado'], correcta: 0, explicacion: 'La horchata es una bebida preparada con harina de arroz, almendras, leche y canela. Es muy refrescante y popular en El Salvador.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Cuál es la bebida más representativa y popular de El Salvador?', opciones: ['Café', 'Atol', 'Horchata', 'Pulque'], correcta: 1, explicacion: 'El atol es la bebida más tradicional y representativa de El Salvador. Se consume especialmente en desayunos y tardes, en múltiples variedades.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Qué es "yuca frita" en la gastronomía salvadoreña?', opciones: ['Un postre de chocolate', 'Una bebida dulce', 'Un tipo de sopa', 'Raíz de yuca cortada y frita'], correcta: 3, explicacion: 'La yuca frita es la raíz de yuca (también llamada mandioca) cortada en tiras y frita. Es un acompañamiento común con comidas salvadoreñas.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Cuál es un platillo salvadoreño típico de comida callejera similar a la pupusa?', opciones: ['Quesadilla', 'Pastelito (empanada frita de carne)', 'Burrito', 'Elote loco'], correcta: 1, explicacion: 'El pastelito salvadoreño es una empanada de masa de maíz o trigo rellena de carne molida sazonada, que se fríe hasta quedar crujiente. Es un antojo callejero muy popular, similar en concepto a la pupusa.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Qué bebida salvadoreña tradicional es espesa, dulce y se sirve caliente?', opciones: ['Refresco gaseoso', 'Agua de arroz', 'Atol', 'Té de limón'], correcta: 2, explicacion: 'El atol es una bebida espesa, dulce y caliente muy popular en El Salvador. Se prepara con masa de maíz y se sirve especialmente en desayunos y tardes.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Cuál es el principal ingrediente de la masa de las pupusas?', opciones: ['Almidón de papa', 'Harina de trigo', 'Harina de maíz', 'Harina de arroz'], correcta: 2, explicacion: 'La masa de las pupusas está hecha de harina de maíz (masa de maíz preparada), que es similar a la masa usada para hacer tortillas.' },

  // MEDIO (21)
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Cuál es el plato nacional de El Salvador?', opciones: ['Las baleadas', 'Las pupusas', 'La sopa de pata', 'Los tamales'], correcta: 1, explicacion: 'Las pupusas son el plato nacional, declaradas Patrimonio Cultural Intangible.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: "¿Con qué siempre se acompañan las pupusas?", opciones: ["Con arroz y frijoles fritos", "Con curtido y salsa de tomate", "Con crema y queso fresco", "Con chimol y frijoles molidos"], correcta: 1, explicacion: "Las pupusas se sirven siempre con curtido y salsa de tomate casera." },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿De qué están hechas las pupusas de arroz?', opciones: ['Harina de trigo', 'Masa de arroz molido', 'Harina de maíz amarillo', 'Masa de yuca'], correcta: 1, explicacion: 'Las pupusas de arroz se elaboran con masa de arroz molido.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: "¿Cuál es el relleno tradicional más popular de las pupusas?", opciones: ["Solo queso duro rallado", "Queso con loroco fresco", "Solo frijoles molidos", "Camarones con verduras"], correcta: 1, explicacion: "El relleno de queso y loroco es el más popular y tradicional en El Salvador." },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Qué es el loroco?', opciones: ['Una fruta', 'Una flor comestible', 'Un tipo de frijol', 'Una hierba aromática'], correcta: 1, explicacion: 'El loroco es una flor comestible nativa de Centroamérica, muy usada en la gastronomía salvadoreña.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: "¿Qué bebida tradicional se prepara con maíz en El Salvador?", opciones: ["Té de manzanilla dulce", "Atol servido caliente", "Agua de avena con canela", "Jugo de caña con limón"], correcta: 1, explicacion: "El atol es una bebida tradicional hecha a base de maíz molido, muy consumida en desayunos." },
  { cat: 'gastronomia', nivel: 'medio', pregunta: "¿Cuáles son los tamales más típicos de El Salvador?", opciones: ["Tamales dulces de elote", "Tamales de pollo y verde", "Tamales de chile relleno", "Tamales de queso y crema"], correcta: 1, explicacion: "Los tamales de pollo y verde (maíz) son los más típicos de la gastronomía salvadoreña." },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Qué es la arepa?', opciones: ['Un postre', 'Un pan de maíz frito', 'Un tipo de sopa', 'Una bebida'], correcta: 1, explicacion: 'La arepa es un pan hecho de masa de maíz, redondo y frito, muy común en El Salvador.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: "¿Cuál es el postre más típico de las festividades en El Salvador?", opciones: ["Flan de caramelo casero", "Arroz con leche y canela", "Quesadilla salvadoreña", "Helado de sorbete casero"], correcta: 2, explicacion: "La quesadilla salvadoreña (de queso y ayote) es un postre tradicional especial en festividades." },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿En qué mes se celebra el Día Nacional de la Pupusa?', opciones: ['Octubre', 'Noviembre', 'Diciembre', 'Enero'], correcta: 1, explicacion: 'El Día Nacional de la Pupusa se celebra el segundo domingo de noviembre desde 2005.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Qué ingrediente básico no puede faltar en una pupusa?', opciones: ['Queso', 'Frijoles', 'Masa de maíz', 'Loroco'], correcta: 2, explicacion: 'La masa de maíz es el ingrediente fundamental de toda pupusa salvadoreña.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: "¿De dónde proviene originalmente la receta de las pupusas?", opciones: ["Comunidades mayas de México", "Pueblos indígenas pipiles", "Aldeas mayas de Guatemala", "Pueblos criollos de Nicaragua"], correcta: 1, explicacion: "Las pupusas tienen raíces en la gastronomía de los pueblos indígenas de El Salvador." },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Qué es el chimol?', opciones: ['Una salsa de tomate', 'Un condimento de maíz', 'Una bebida', 'Una verdura'], correcta: 0, explicacion: 'El chimol es una salsa hecha con tomate, cebolla, chile y otras especias salvadoreñas.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Cuál es la sopa más popular en El Salvador?', opciones: ['Sopa de pollo', 'Sopa de marisco', 'Sopa de pata', 'Caldo de camarón'], correcta: 2, explicacion: 'La sopa de pata es una sopa tradicional muy popular, especialmente en festejos y fines de semana.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Con qué se acompaña típicamente la sopa de pata?', opciones: ['Tortillas finas', 'Pan de elote', 'Plátano frito', 'Avena'], correcta: 0, explicacion: 'La sopa de pata se acompaña tradicionalmente con tortillas de maíz finas y crema.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Qué es el plátano preparado que es acompañamiento común?', opciones: ['Plátano crudo', 'Plátano frito', 'Plátano hervido', 'Plátano asado'], correcta: 1, explicacion: 'El plátano frito es un acompañamiento clásico en la comida salvadoreña, especialmente en el desayuno.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: "¿Cuál es la bebida típica con maíz tostado?", opciones: ["Pozol frío bien endulzado", "Agua de cebada con hielo", "Café de maíz con canela", "Atol de elote con leche"], correcta: 0, explicacion: "El pozol es una bebida tradicional hecha con maíz y otros ingredientes, muy consumida en verano." },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Qué significa "pupusa" etimológicamente?', opciones: ['Comida rellena', 'Algo hinchado o inflado', 'Comida horneada', 'Comida rápida'], correcta: 1, explicacion: 'Pupusa proviene del náhuat "pupushawa", que significa "algo hinchado o inflado", describiendo su forma abultada.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Qué municipio salvadoreño es popularmente conocido como la "cuna de la pupusa"?', opciones: ['Olocuilta, en el departamento de La Paz', 'Izalco, en el departamento de Sonsonate', 'Suchitoto, en el departamento de Cuscatlán', 'Chalchuapa, en el departamento de Santa Ana'], correcta: 0, explicacion: 'Olocuilta, en el departamento de La Paz (zona central), es reconocido popularmente como la "cuna de la pupusa" y es famoso por sus pupusas de arroz.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: "¿Qué tipo de maíz se usa tradicionalmente para hacer pupusas?", opciones: ["Maíz amarillo importado", "Maíz blanco criollo molido", "Maíz reventador tostado", "Maíz dulce de exportación"], correcta: 1, explicacion: "Se usa maíz blanco criollo que se muele en masa fresca para preparar las pupusas auténticas." },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Qué bebida se sirve comúnmente en desayunos con atol?', opciones: ['Café americano', 'Café tinto', 'Agua de horchata', 'Leche evaporada'], correcta: 1, explicacion: 'El café tinto (negro) es la bebida tradicional que acompaña al atol en los desayunos salvadoreños.' },

  // DIFÍCIL (20)
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "¿Qué variantes de pupusas rellenas existen en El Salvador?", opciones: ["Solo dos tipos: de queso y de frijol", "Queso, frijoles, loroco y chicharrón", "Solo de queso, sin ningún otro relleno", "Solo de verduras y hierbas silvestres"], correcta: 1, explicacion: "Existen múltiples variedades con diferentes rellenos según la región y creatividad." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "¿Cuál es la preparación correcta del curtido?", opciones: ["Repollo crudo picado con sal marina", "Repollo fermentado con vinagre y chile", "Repollo cocido al vapor con mantequilla", "Repollo encurtido en agua con azúcar"], correcta: 1, explicacion: "El curtido es repollo fermentado con zanahoria, cebolla, chile y vinagre en un proceso de encurtido." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "¿Qué método de cocción se usa para hacer pupusas auténticas?", opciones: ["Horno de leña caliente", "Comal o plancha caliente", "Sartén profunda con aceite", "Olla de barro bien tapada"], correcta: 1, explicacion: "Las pupusas se cuecen en un comal o plancha de barro/metal a fuego medio hasta dorarse." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "¿Cuál es la consistencia correcta de la masa para pupusas?", opciones: ["Muy suave y pegajosa", "Firme pero moldeable", "Muy dura y quebradiza", "Muy mojada y aguada"], correcta: 1, explicacion: "La masa debe estar firme y moldeable, ni muy suave ni muy dura, para poder rellenarla correctamente." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "¿A qué se conoce como \"pupusa revuelta\"?", opciones: ["Pupusa hecha sin ningún relleno", "Pupusa con mezcla de rellenos", "Pupusa que se rompe en el comal", "Pupusa pequeña de media porción"], correcta: 1, explicacion: "La pupusa revuelta lleva una mezcla de rellenos como queso, frijoles y chicharrón." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "¿Qué papel tiene el yuca en la gastronomía salvadoreña?", opciones: ["Solo especia seca para sopas", "Acompañamiento y base de postres", "Bebida fermentada de fiestas", "Raramente usado en la cocina"], correcta: 1, explicacion: "La yuca es un alimento versátil, usada como acompañamiento frito o en preparaciones variadas." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "¿Cuál es la diferencia entre pan de yuca y pupusa?", opciones: ["Ninguna, ambos son el mismo alimento", "Pan de yuca lleva yuca; pupusa, maíz", "Pan de yuca es más grande y grueso", "Igual preparación, distinto nombre"], correcta: 1, explicacion: "Pan de yuca se hace con harina de yuca rallada mientras que pupusa usa masa de maíz molido." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "¿Cómo es la \"enchilada\" salvadoreña, a diferencia de la enchilada mexicana enrollada?", opciones: ["Una tortilla frita y plana, cubierta con carne molida, curtido y salsa", "Una tortilla enrollada rellena de carne", "Una sopa espesa hecha con tortilla deshecha", "Un tamal envuelto en hoja de plátano"], correcta: 0, explicacion: "La enchilada salvadoreña es una tostada de tortilla frita y plana, cubierta con carne molida, curtido, salsa de tomate, queso y a veces huevo duro; no va enrollada como la mexicana." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "¿Qué hace diferente a la pupusa frente a otros platillos como los tamales o los panes con pollo, más asociados a ocasiones especiales?", opciones: ["Que solo se prepara una vez al año", "Que es una comida de consumo diario, no solo de fiestas", "Que nunca se come en reuniones familiares", "Que es una invención reciente de los años 2000"], correcta: 1, explicacion: "A diferencia de platillos como los tamales o los panes con pollo, más ligados a ocasiones especiales, la pupusa es sobre todo una comida de consumo diario en El Salvador, aunque también se disfruta en reuniones y celebraciones." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Cómo se hacen tradicionalmente las tortillas en El Salvador?', opciones: ['Con una prensa manual de madera', 'A mano, palmeando la masa, y se cocinan en comal', 'Con un rodillo de cocina', 'En un molino industrial'], correcta: 1, explicacion: 'Al igual que las pupusas, las tortillas salvadoreñas se hacen tradicionalmente a mano, palmeando la masa de maíz entre las palmas, y se cocinan sobre un comal o plancha caliente.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Cuál es el platillo infaltable en la cena navideña salvadoreña, hecho de pavo desmenuzado servido en pan francés?', opciones: ['Sopa de gallina india', 'Pan con pavo (pan con chumpe)', 'Pupusas revueltas', 'Enchiladas salvadoreñas'], correcta: 1, explicacion: 'El pan con pavo, también llamado pan con chumpe, es el platillo tradicional infaltable en la cena de Nochebuena salvadoreña: pavo desmenuzado y bañado en su propio jugo, servido en pan francés.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "¿Qué utilidad tiene el piloncillo en la cocina salvadoreña?", opciones: ["Solo como bebida caliente", "Endulzante y base de postres", "Raramente usado hoy en día", "Solo para endulzar el café"], correcta: 1, explicacion: "El piloncillo es un endulzante natural versátil, usado en bebidas, postres y alimentos salados." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "¿Cuáles son los ingredientes básicos del atol?", opciones: ["Harina de trigo, agua fría y sal", "Maíz molido, leche, azúcar, canela", "Solo maíz molido y agua hervida", "Arroz, leche y esencia de vainilla"], correcta: 1, explicacion: "El atol se prepara con maíz molido, leche (o agua), azúcar y se aromatiza con canela." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "¿Qué variante de atol es típica de los desayunos colados?", opciones: ["Atol de elote tierno dulce", "Atol blanco o atol de maíz", "Atol de plátano bien maduro", "Atol de frijol rojo molido"], correcta: 1, explicacion: "El atol blanco es el más común en desayunos, hecho con maíz blanco colado." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Cuánto tiempo se deja fermentar el curtido?', opciones: ['No se fermenta', '2-3 horas mínimo', 'Toda la noche', 'Una semana'], correcta: 1, explicacion: 'El curtido típicamente fermenta 2-3 horas o más para desarrollar su sabor característico.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "¿Cuál es la función del loroco en la gastronomía salvadoreña?", opciones: ["Solo decoración verde del platillo", "Sabor floral distintivo en pupusas", "Medicinal para dolor de estómago", "Relleno espeso sin sabor ni aroma"], correcta: 1, explicacion: "El loroco proporciona un sabor único y floral que es distintivo en la cocina salvadoreña." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "¿Qué diferencia hay entre pan de yuca y pupusa en textura?", opciones: ["Ninguna, ambas texturas son idénticas", "Pan de yuca crujiente; pupusa, suave", "La pupusa es crujiente y quebradiza", "Ambas tienen la misma textura suave"], correcta: 1, explicacion: "Pan de yuca es más crujiente y poroso, mientras que pupusa es suave y densa." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "¿Cuál es la bebida típica con cacao en El Salvador?", opciones: ["Café tinto con azúcar", "Chocolate salvadoreño", "Batido frío de cacao", "Agua de vainilla dulce"], correcta: 1, explicacion: "El chocolate salvadoreño, hecho con cacao local molido, es una bebida tradicional especial." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "¿Qué factor determina la autenticidad de una pupusa?", opciones: ["Solo el tamaño y el peso de la pupusa", "Ingredientes frescos y receta tradicional", "El tipo de plancha o comal utilizado", "La cantidad exacta de relleno que lleva"], correcta: 1, explicacion: "La autenticidad viene de usar ingredientes frescos y respetar la receta tradicional transmitida." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "¿En qué año la Asamblea Legislativa de El Salvador declaró la pupusa Plato Típico y Patrimonio Cultural de El Salvador?", opciones: ["2005", "2015", "2023", "1997"], correcta: 0, explicacion: "En 2005, la Asamblea Legislativa declaró la pupusa Plato Típico y Patrimonio Cultural de El Salvador, y creó el Día Nacional de la Pupusa (segundo domingo de noviembre). Es un reconocimiento salvadoreño; la pupusa no forma parte de la Lista Representativa del Patrimonio Cultural Inmaterial de la Humanidad de la UNESCO." },

  // GUANACO (19)
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "¿Qué dulce tradicional a base de ayote cocido en miel de panela se prepara en El Salvador para el Día de los Difuntos (2 de noviembre)?", opciones: ["Ayote en miel", "Nuégados de yuca", "Torrejas", "Arroz en leche"], correcta: 0, explicacion: "El ayote en miel (ayote cocido con panela y canela) es un dulce tradicional asociado al Día de los Difuntos en El Salvador." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "¿Cómo se llama el pan salado de corteza dura que se usa tradicionalmente para preparar los panes con pollo?", opciones: ["Baguette", "Birote", "Semita", "Torta"], correcta: 1, explicacion: "El birote es un pan salado de corteza dura, usado tradicionalmente para preparar los panes rellenos como los panes con pollo." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "¿De qué departamento es originario el marquesote, un bizcocho dulce tradicionalmente envuelto en hoja de plátano?", opciones: ["Ahuachapán", "Morazán", "Usulután", "La Unión"], correcta: 0, explicacion: "El marquesote, un bizcocho esponjoso horneado y envuelto en hoja de plátano, es una tradición repostera propia de Ahuachapán." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "¿Con qué ingrediente principal se elaboran los nuégados tradicionales salvadoreños?", opciones: ["Camote", "Yuca", "Plátano maduro", "Papa"], correcta: 1, explicacion: "Los nuégados salvadoreños se preparan friendo trozos de yuca y bañándolos en miel de panela." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Cómo se le llama popularmente en El Salvador al hielo raspado bañado en jarabes de colores que se vende en parques y afuera de las escuelas?', opciones: ['Raspado', 'Minuta', 'Granizado', 'Chamoyada'], correcta: 1, explicacion: 'En El Salvador este postre de hielo raspado con jarabe se conoce popularmente como "minuta".' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "¿Qué tipo de harina se usaba prehispánicamente para pupusas o alimentos similares?", opciones: ["Harina de trigo traída por españoles", "Maíz nixtamalizado molido en metate", "Harina de cebada tostada al comal", "Masa de yuca rallada y prensada"], correcta: 1, explicacion: "Los pueblos indígenas usaban piedras (metates) para moler maíz nixtamalizado en masa fresca." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "¿Qué parte de la planta de loroco es la que se cosecha y se come?", opciones: ["Las raíces subterráneas", "Los botones florales aún cerrados", "Las semillas maduras", "La corteza del tallo"], correcta: 1, explicacion: "Del loroco se aprovechan los botones florales, la flor todavía cerrada, que se cosechan a mano antes de que se abran." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "¿Qué plato a base de camarón seco molido y huevo se prepara tradicionalmente en Cuaresma y Semana Santa, cuando se evita la carne roja?", opciones: ["Ceviche de camarón", "Torta de camarón", "Sopa de camarón", "Camarones al mojo"], correcta: 1, explicacion: "La torta de camarón, hecha con camarón seco molido y huevo, es un plato tradicional de Cuaresma y Semana Santa en El Salvador." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "¿Cuál es el proceso de nixtamalización y su importancia?", opciones: ["Cocción simple en agua hirviendo", "Cocción en cal que libera niacina", "Fermentación del maíz con levadura", "Secado al sol durante varios días"], correcta: 1, explicacion: "La nixtamalización (cocción en hidróxido de calcio) hace el maíz más nutritivo y digestible." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "¿Qué variedad de loroco es específicamente salvadoreña?", opciones: ["Loroco púrpura (Echites floribunda)", "Loroco salvadoreño (Fernaldia pandurata)", "Loroco rojo (Mandevilla salvadorensis)", "Loroco dorado (Fernaldia guatemalteca)"], correcta: 1, explicacion: "El Fernaldia pandurata es la especie de loroco nativa y distintiva de El Salvador y Centroamérica." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "¿De qué está hecho el \"tamal pisque\", una variante tradicional salvadoreña?", opciones: ["De masa de frijol, sin relleno de carne", "De maíz dulce con canela", "De arroz con pollo desmenuzado", "De plátano maduro machacado"], correcta: 0, explicacion: "El tamal pisque se elabora con masa de frijol (no de maíz) y usualmente no lleva relleno de carne, siendo una variante tradicional distinta del tamal común." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿En qué municipio salvadoreño se celebra anualmente el tradicional Festival del Loroco?', opciones: ['San Lorenzo, Ahuachapán', 'Santa Rosa de Lima, La Unión', 'Ilobasco, Cabañas', 'La Palma, Chalatenango'], correcta: 0, explicacion: 'San Lorenzo, en el departamento de Ahuachapán, celebra cada año el Festival del Loroco, en reconocimiento a que es una de las principales zonas productoras del cultivo.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "¿Qué variedad de café, desarrollada en El Salvador en 1958, es reconocida internacionalmente por el gran tamaño de su grano?", opciones: ["Bourbon rojo", "Pacamara", "Arábica típica", "Robusta"], correcta: 1, explicacion: "El Pacamara es una variedad de café desarrollada en El Salvador en 1958, cruce entre Pacas y Maragogipe, apreciada mundialmente por el tamaño de su grano y su calidad en taza." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Qué diferencia hay entre el atol de elote y el atol shuco?', opciones: ['El de elote es de maíz tierno y dulce; el shuco es fermentado y agrio', 'Son exactamente la misma bebida con otro nombre', 'El atol shuco se hace solo con arroz', 'El atol de elote lleva carne de cerdo'], correcta: 0, explicacion: 'El atol de elote se prepara con maíz tierno y es dulce, mientras que el atol shuco es una variante fermentada y agria, tradicional del oriente de El Salvador.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "¿Qué ingrediente le da a la quesadilla salvadoreña su toque salado dentro de su masa dulce de arroz?", opciones: ["Tocino frito", "Queso duro rallado", "Aceituna picada", "Sal de mar"], correcta: 1, explicacion: "La quesadilla salvadoreña combina la dulzura de su masa de arroz con el sabor salado del queso duro rallado que lleva mezclado." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "A diferencia de la horchata mexicana (hecha de arroz), ¿con qué semilla se elabora tradicionalmente la horchata salvadoreña?", opciones: ["Semilla de morro (jícaro)", "Arroz blanco remojado", "Semilla de marañón", "Almendra molida"], correcta: 0, explicacion: "La horchata salvadoreña tradicional se prepara con semillas tostadas y molidas de morro (jícaro) mezcladas con especias, a diferencia de la horchata mexicana, que se hace con arroz." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "¿En qué pueblo de la Ruta de las Flores se celebra cada fin de semana la famosa Feria Gastronómica?", opciones: ["Concepción de Ataco", "Juayúa", "Nahuizalco", "Apaneca"], correcta: 1, explicacion: "Juayúa es conocido por su Feria Gastronómica de fin de semana, donde se ofrecen platillos típicos como conejo, iguana y mariscos." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "Además del café, ¿cuál es otro de los principales productos agrícolas de exportación de El Salvador?", opciones: ["Cacao amazónico", "Azúcar de caña", "Arroz basmati", "Aceite de oliva"], correcta: 1, explicacion: "El azúcar de caña es, junto al café, uno de los principales productos agrícolas de exportación de El Salvador." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "¿Cómo se le llama en El Salvador a la bebida fría hecha de trozos de fruta picada en almíbar, muy vendida en ferias patronales?", opciones: ["Refresco de frutas", "Ensalada", "Batido tropical", "Cóctel de frutas"], correcta: 1, explicacion: "En El Salvador, la 'ensalada' es una bebida fría a base de trozos de fruta picada (piña, papaya, sandía) en almíbar, muy popular en ferias y fiestas patronales." },

  /* ═════════════════════════════════════════════════════════
     SITIOS
     ═════════════════════════════════════════════════════════ */

  // FÁCIL — nuevas, básicas y comerciales (ver marcador de inserción más abajo)
  { cat: 'sitios', nivel: 'facil', pregunta: '¿Cuál es la capital de El Salvador?', opciones: ['La Libertad', 'Santa Ana', 'San Salvador', 'San Miguel'], correcta: 2, explicacion: 'San Salvador es la capital y la ciudad más grande de El Salvador, ubicada en el centro del país.' },
  { cat: 'sitios', nivel: 'facil', pregunta: '¿Cuál es la playa más famosa de El Salvador para surfistas?', opciones: ['Playa El Cuco', 'Playa Las Flores', 'El Tunco', 'El Sunzal'], correcta: 2, explicacion: 'El Tunco es la playa de surf más famosa de El Salvador, conocida mundialmente como un destino popular para surfistas y mochileros.' },
  { cat: 'sitios', nivel: 'facil', pregunta: '¿Dónde se encuentra el Monumento al Divino Salvador del Mundo?', opciones: ['Sonsonate', 'Apopa', 'San Salvador', 'Santa Ana'], correcta: 2, explicacion: 'El Monumento al Divino Salvador del Mundo está ubicado en San Salvador y es un símbolo icónico que representa a El Salvador en todo el mundo.' },
  { cat: 'sitios', nivel: 'facil', pregunta: '¿Cuál es la formación rocosa con vistas panorámicas ubicada al sur de San Salvador?', opciones: ['Puerta del Diablo', 'Cerro Verde', 'Volcán Izalco', 'El Boquerón'], correcta: 0, explicacion: 'La Puerta del Diablo es una formación rocosa natural de más de 1,100 metros de altura que ofrece vistas panorámicas del Lago Ilopango, volcanes y el océano Pacífico.' },
  { cat: 'sitios', nivel: 'facil', pregunta: '¿Cuál es la moneda oficial de El Salvador?', opciones: ['Dólar estadounidense', 'Quetzal', 'Peso mexicano', 'Colón salvadoreño'], correcta: 0, explicacion: 'El Salvador adoptó el dólar estadounidense como moneda oficial en 2001, reemplazando el colón salvadoreño.' },
  { cat: 'sitios', nivel: 'facil', pregunta: '¿Cuál es el volcán conocido como el "Faro del Pacífico"?', opciones: ['Volcán San Vicente', 'Volcán Cerro Verde', 'Volcán Santa Ana', 'Volcán Izalco'], correcta: 3, explicacion: 'El Volcán Izalco es conocido como el "Faro del Pacífico" porque sus erupciones constantes históricamente servían como punto de referencia para marineros en el océano.' },
  { cat: 'sitios', nivel: 'facil', pregunta: '¿Cuál es el lago más grande de El Salvador?', opciones: ['Lago de Güija', 'Lago Ilopango', 'Lago Coatepeque', 'Laguna Verde'], correcta: 1, explicacion: 'El Lago Ilopango es el lago más grande de El Salvador, ubicado en el centro del país con un área de aproximadamente 72 kilómetros cuadrados.' },
  { cat: 'sitios', nivel: 'facil', pregunta: '¿Cuáles son los dos países vecinos de El Salvador?', opciones: ['Honduras y Nicaragua', 'Guatemala y Belice', 'Guatemala y Honduras', 'Costa Rica y Belice'], correcta: 2, explicacion: 'Guatemala limita con El Salvador al oeste y Honduras limita al este. El país también tiene costas en el océano Pacífico y el Golfo de Fonseca.' },
  { cat: 'sitios', nivel: 'facil', pregunta: '¿Cómo se le conoce también al volcán Santa Ana, el más alto de El Salvador?', opciones: ['Ilamatepec', 'Chaparrastique', 'Quezaltepec', 'Cuscatlán'], correcta: 0, explicacion: 'El volcán Santa Ana también es conocido como Ilamatepec, nombre de origen náhuat, y es el volcán más alto de El Salvador con 2,381 metros de altitud.' },
  { cat: 'sitios', nivel: 'facil', pregunta: '¿Cuál volcán está ubicado en un cráter cerca de San Salvador?', opciones: ['Volcán Santa Ana', 'Volcán Izalco', 'Volcán San Vicente', 'Volcán El Boquerón'], correcta: 3, explicacion: 'El Boquerón es un cráter volcánico del Volcán de San Salvador, ubicado a solo 23 kilómetros del centro de la capital, ahora protegido como Parque Nacional.' },
  { cat: 'sitios', nivel: 'facil', pregunta: '¿Cuál es la ruta turística famosa en las tierras altas de El Salvador?', opciones: ['Ruta Costera', 'Ruta Centroamericana', 'Ruta de las Flores', 'Ruta de los Pueblos'], correcta: 2, explicacion: 'La Ruta de las Flores es una ruta turística de 35 kilómetros en las highlands del oeste salvadoreño, famosa por sus pueblos coloniales, flores silvestres (especialmente de noviembre a febrero) y cultura cafetalera.' },
  { cat: 'sitios', nivel: 'facil', pregunta: '¿En cuál departamento se encuentra la playa El Cuco?', opciones: ['San Miguel', 'Cabañas', 'La Libertad', 'Sonsonate'], correcta: 0, explicacion: 'La playa El Cuco se encuentra en el departamento de San Miguel, en la costa sureste de El Salvador, conocida por su arena negra y cultura surfista.' },
  { cat: 'sitios', nivel: 'facil', pregunta: '¿Cuántos departamentos administrativos tiene El Salvador?', opciones: ['16', '14', '18', '12'], correcta: 1, explicacion: 'El Salvador está dividido en 14 departamentos administrativos, que son las principales divisiones políticas del país.' },
  { cat: 'sitios', nivel: 'facil', pregunta: '¿Cuál es el parque nacional más grande de El Salvador?', opciones: ['Cerro Verde', 'Los Volcanes', 'El Imposible', 'Montecristo'], correcta: 2, explicacion: 'El Parque Nacional El Imposible es el parque nacional más grande de El Salvador, ubicado en el occidente del país en el departamento de Ahuachapán.' },
  { cat: 'sitios', nivel: 'facil', pregunta: '¿Cuál es la característica más conocida de la arena en la playa El Cuco?', opciones: ['Arena blanca fina', 'Arena gris', 'Arena dorada', 'Arena negra'], correcta: 3, explicacion: 'La playa El Cuco es famosa por su arena negra, formada por roca volcánica molida, que le da a la playa su distintivo color oscuro.' },

  // MEDIO (15)
  { cat: 'sitios', nivel: 'medio', pregunta: '¿En qué departamento se encuentra el sitio arqueológico Joya de Cerén?', opciones: ['La Libertad', 'Santa Ana', 'San Vicente', 'Cuscatlán'], correcta: 0, explicacion: 'Joya de Cerén está en el municipio de San Juan Opico, departamento de La Libertad.' },
  { cat: 'sitios', nivel: 'medio', pregunta: '¿Cómo se le conoce popularmente a Joya de Cerén por su extraordinario estado de conservación?', opciones: ['La Pompeya de América', 'El Machu Picchu salvadoreño', 'La Atlántida de Centroamérica', 'El Petén salvadoreño'], correcta: 0, explicacion: 'Se le llama "la Pompeya de América" porque, igual que la ciudad italiana, quedó sepultada bajo ceniza volcánica que conservó la vida cotidiana de sus habitantes.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'El sitio arqueológico Tazumal se ubica en el municipio de Chalchuapa, en el departamento de:', opciones: ['Santa Ana', 'Sonsonate', 'Ahuachapán', 'La Unión'], correcta: 0, explicacion: 'Tazumal está en Chalchuapa, departamento de Santa Ana, a unos 80 km al occidente de San Salvador.' },
  { cat: 'sitios', nivel: 'medio', pregunta: '¿Qué pueblo colonial es reconocido por su arquitectura, sus calles empedradas y su tradición del añil?', opciones: ['Suchitoto', 'Ilobasco', 'Nahuizalco', 'Berlín'], correcta: 0, explicacion: 'Suchitoto, en el departamento de Cuscatlán, es célebre por su arquitectura colonial, el lago Suchitlán y su historia ligada al cultivo del añil.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'La formación rocosa conocida como Puerta del Diablo se encuentra en Los Planes de Renderos, cerca de:', opciones: ['Panchimalco', 'Concepción de Ataco', 'Juayúa', 'Perquín'], correcta: 0, explicacion: 'Puerta del Diablo es un mirador natural ubicado en Los Planes de Renderos, muy cerca del pueblo de Panchimalco.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'La Ruta de las Flores atraviesa pueblos de los departamentos de Sonsonate y:', opciones: ['Ahuachapán', 'Morazán', 'Usulután', 'La Unión'], correcta: 0, explicacion: 'La Ruta de las Flores recorre pueblos como Nahuizalco, Juayúa y Apaneca en Sonsonate, y Concepción de Ataco y Tacuba en Ahuachapán.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'La Catedral Metropolitana de San Salvador es famosa por la fachada de mosaicos creada por el artista:', opciones: ['Fernando Llort', 'Salarrué', 'Roque Dalton', 'Claudia Lars'], correcta: 0, explicacion: 'El colorido mosaico de la fachada de la Catedral fue diseñado por el reconocido artista plástico salvadoreño Fernando Llort.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'El Parque Nacional El Boquerón corresponde al cráter de qué volcán?', opciones: ['Volcán de San Salvador', 'Volcán de Izalco', 'Volcán de San Vicente', 'Volcán de Santa Ana'], correcta: 0, explicacion: 'El Boquerón es el cráter del volcán de San Salvador, convertido en parque nacional.' },
  { cat: 'sitios', nivel: 'medio', pregunta: "¿Cómo se llama el museo en San Salvador dedicado a la arqueología y antropología del país?", opciones: ["Museo Nacional de Antropología", "Museo de Arte de El Salvador", "Museo de la Palabra y la Imagen", "Museo de los Niños Tin Marín"], correcta: 0, explicacion: "El MUNA (Museo Nacional de Antropología David J. Guzmán) resguarda piezas arqueológicas y etnográficas del país." },
  { cat: 'sitios', nivel: 'medio', pregunta: "El pueblo de Concepción de Ataco, en la Ruta de las Flores, es conocido especialmente por:", opciones: ["Sus coloridos murales callejeros", "Sus extensas playas de arena negra", "Su producción de cerámica pintada", "Su gran carnaval anual de disfraces"], correcta: 0, explicacion: "Concepción de Ataco destaca por los murales artísticos que decoran las fachadas de sus calles." },
  { cat: 'sitios', nivel: 'medio', pregunta: 'En la Catedral Metropolitana de San Salvador descansan los restos de:', opciones: ['Monseñor Óscar Arnulfo Romero', 'El presidente José Matías Delgado', 'El general Maximiliano Hernández Martínez', 'El poeta Francisco Gavidia'], correcta: 0, explicacion: 'La cripta de la Catedral Metropolitana alberga la tumba de Monseñor Óscar Arnulfo Romero.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'El Teatro Nacional de San Salvador es reconocido por ser:', opciones: ['El teatro más antiguo de Centroamérica', 'El teatro más grande de Latinoamérica', 'Una antigua fortaleza colonial', 'Una réplica del Teatro Colón'], correcta: 0, explicacion: 'El Teatro Nacional de San Salvador es considerado el teatro más antiguo de Centroamérica.' },
  { cat: 'sitios', nivel: 'medio', pregunta: '¿Qué tipo de sitio es Joya de Cerén, según los arqueólogos?', opciones: ['Una aldea agrícola maya', 'Un palacio real', 'Una fortaleza militar', 'Un centro ceremonial azteca'], correcta: 0, explicacion: 'Joya de Cerén fue una aldea agrícola maya del período Clásico, tributaria del centro político de San Andrés.' },
  { cat: 'sitios', nivel: 'medio', pregunta: "Panchimalco, cerca de San Salvador, es célebre por su festividad llamada:", opciones: ["Fiesta de las Flores y las Palmas", "Festival del Añil y las Artesanías", "Carnaval de San Miguel Arcángel", "Gran Feria de la Paz y la Cosecha"], correcta: 0, explicacion: "Panchimalco celebra cada año la tradicional Fiesta de las Flores y las Palmas, de raíz indígena." },
  { cat: 'sitios', nivel: 'medio', pregunta: 'El sitio arqueológico Tazumal forma parte de una zona arqueológica más amplia que también incluye:', opciones: ['Casa Blanca y El Trapiche', 'Copán y Tikal', 'Joya de Cerén y San Andrés', 'Cihuatán y Quelepa'], correcta: 0, explicacion: 'La zona arqueológica de Chalchuapa agrupa a Tazumal junto a otros sitios como Casa Blanca y El Trapiche.' },

  // DIFÍCIL (15)
  { cat: 'sitios', nivel: 'dificil', pregunta: '¿En qué año fue declarada Joya de Cerén Patrimonio de la Humanidad por la UNESCO?', opciones: ['1993', '1985', '2001', '1976'], correcta: 0, explicacion: 'Joya de Cerén fue declarada Patrimonio de la Humanidad por la UNESCO en 1993.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: '¿En qué año fueron descubiertas las estructuras de Joya de Cerén?', opciones: ['1976', '1960', '1993', '1950'], correcta: 0, explicacion: 'Fue descubierto accidentalmente en 1976, mientras se preparaba el terreno para construir silos de granos.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: '¿Qué volcán sepultó bajo su ceniza a la aldea de Joya de Cerén hace unos 1,400 años?', opciones: ['Volcán Loma Caldera', 'Volcán de Izalco', 'Volcán de San Miguel', 'Volcán Chaparrastique'], correcta: 0, explicacion: 'La erupción del volcán Loma Caldera, hacia el año 600 d.C., sepultó la aldea bajo varias capas de ceniza.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: '¿Qué arqueólogo estadounidense lideró las primeras investigaciones científicas en Joya de Cerén?', opciones: ['Payson Sheets', 'Stanley Boggs', 'John Longyear', 'William Fash'], correcta: 0, explicacion: 'El Dr. Payson Sheets, de la Universidad de Colorado en Boulder, dirigió las primeras investigaciones entre 1978 y 1980.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'La pirámide principal del sitio Tazumal alcanza una altura aproximada de:', opciones: ['24 metros', '10 metros', '40 metros', '60 metros'], correcta: 0, explicacion: 'La Estructura 1 de Tazumal, la más grande del sitio, alcanza unos 24 metros de altura.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: '¿Qué arqueólogo realizó las primeras excavaciones formales en Tazumal, a partir de 1940?', opciones: ['Stanley Boggs', 'Payson Sheets', 'Santiago Barberena', 'David Guzmán'], correcta: 0, explicacion: 'Stanley Boggs inició en 1940 las investigaciones formales de Tazumal, identificando 13 estructuras.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: "Según los especialistas, el nombre \"Tazumal\" significa aproximadamente:", opciones: ["Lugar donde se consumen las almas", "Lugar de las joyas más preciadas", "Valle de las flores del amanecer", "Ciudad de los dioses de la lluvia"], correcta: 0, explicacion: "En lengua nahua-quiché, \"Tazumal\" se traduce aproximadamente como \"lugar donde se consumen las almas\"." },
  { cat: 'sitios', nivel: 'dificil', pregunta: '¿Quién descubrió la estela conocida como "La Virgen de Tazumal" en 1892?', opciones: ['Santiago Barberena', 'Stanley Boggs', 'Payson Sheets', 'Jorge Lardé'], correcta: 0, explicacion: 'El historiador Santiago Barberena encontró esta estela en 1892 y la trasladó al Museo Nacional.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'El sitio arqueológico San Andrés, un antiguo centro político maya, se ubica en el valle de:', opciones: ['Zapotitán', 'Jiboa', 'Sensunapán', 'Lempa'], correcta: 0, explicacion: 'San Andrés se encuentra en el valle de Zapotitán, departamento de La Libertad, y dominó la región durante el Clásico tardío.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: '¿A qué sitio arqueológico estaba tributaria la aldea agrícola de Joya de Cerén?', opciones: ['San Andrés', 'Tazumal', 'Cihuatán', 'Casa Blanca'], correcta: 0, explicacion: 'Joya de Cerén era una aldea tributaria del centro político de San Andrés, que dominaba el valle de Zapotitán.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: '¿En qué departamento se localiza el pueblo colonial de Suchitoto?', opciones: ['Cuscatlán', 'La Paz', 'Chalatenango', 'San Vicente'], correcta: 0, explicacion: 'Suchitoto pertenece al departamento de Cuscatlán.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: '¿Cerca de qué lago se encuentra Suchitoto?', opciones: ['Lago Suchitlán', 'Lago de Coatepeque', 'Lago de Ilopango', 'Laguna de Alegría'], correcta: 0, explicacion: 'Suchitoto está a orillas del embalse conocido como lago Suchitlán.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'El monolito conocido como "La Piedra de las Victorias", hallado en Tazumal, muestra una clara influencia de la cultura:', opciones: ['Olmeca', 'Azteca', 'Inca', 'Maya clásica'], correcta: 0, explicacion: 'Este monolito con petrograbados en sus cuatro lados presenta un estilo típicamente olmeca.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: "¿Cuál era el propósito de los trabajos de tierra que llevaron al descubrimiento accidental de Joya de Cerén?", opciones: ["Construir silos para almacenar granos", "Construir una nueva carretera de acceso", "Ampliar el cementerio de la comunidad", "Preparar el terreno para sembrar café"], correcta: 0, explicacion: "Un tractor nivelaba terreno para construir silos de granos cuando reveló las primeras estructuras del sitio." },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'La zona arqueológica de Chalchuapa, donde se ubica Tazumal, tiene una extensión aproximada de:', opciones: ['10 km²', '1 km²', '50 km²', '100 km²'], correcta: 0, explicacion: 'La zona arqueológica de Chalchuapa abarca aproximadamente 10 km², con varios sitios además de Tazumal.' },

  // GUANACO (15)
  { cat: 'sitios', nivel: 'guanaco', pregunta: '¿En qué fecha exacta fue declarada Joya de Cerén Patrimonio de la Humanidad?', opciones: ['11 de diciembre de 1993', '5 de mayo de 1993', '19 de junio de 1993', '27 de noviembre de 1989'], correcta: 0, explicacion: 'La UNESCO declaró a Joya de Cerén Patrimonio de la Humanidad el 11 de diciembre de 1993.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: "¿A qué universidad pertenecía el arqueólogo Payson Sheets, quien lideró las primeras excavaciones en Joya de Cerén?", opciones: ["Universidad de Colorado en Boulder", "Universidad de Harvard en Cambridge", "Universidad de Yale en New Haven", "Universidad de Arizona en Tucson"], correcta: 0, explicacion: "Payson Sheets era profesor de antropología en la Universidad de Colorado en Boulder, Estados Unidos." },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'Las excavaciones en Joya de Cerén fueron interrumpidas por la guerra civil y retomadas en:', opciones: ['1989', '1980', '1996', '1976'], correcta: 0, explicacion: 'Los trabajos se retomaron en 1989 tras la interrupción por el conflicto armado, y continuaron hasta 1996.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: '¿Cuántas estructuras identificó Stanley Boggs en su investigación formal del sitio Tazumal?', opciones: ['13', '6', '20', '8'], correcta: 0, explicacion: 'Boggs identificó 13 estructuras en total, siete de las cuales fueron asignadas después al área de "Nuevo Tazumal".' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'La segunda pirámide de Tazumal, de estilo tolteca, tuvo un templo en su cima que se derrumbó en:', opciones: ['Octubre de 2004', 'Enero de 1990', 'Marzo de 2010', 'Julio de 1998'], correcta: 0, explicacion: 'El templo que coronaba la Estructura 2, de estilo tolteca, se derrumbó en octubre de 2004.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: '¿En qué año inició Stanley Boggs la primera de doce temporadas de investigación en Tazumal?', opciones: ['1942', '1950', '1960', '1935'], correcta: 0, explicacion: 'En 1942 comenzó la primera de las doce temporadas de investigación arqueológica de Boggs en el sitio.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'El museo de sitio de Tazumal lleva el nombre de su principal investigador y fue fundado el 16 de abril de:', opciones: ['1952', '1970', '1940', '1993'], correcta: 0, explicacion: 'El Museo Stanley Boggs, ubicado en Tazumal, fue fundado el 16 de abril de 1952.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'Aproximadamente, ¿desde qué año antes de Cristo muestra evidencia de ocupación humana continua la zona de Chalchuapa?', opciones: ['1200 a.C.', '500 a.C.', '300 d.C.', '2000 a.C.'], correcta: 0, explicacion: 'Chalchuapa es uno de los asentamientos más antiguos y continuos de El Salvador, con ocupación desde aproximadamente 1200 a.C.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'El sitio arqueológico Cihuatán, en el actual departamento de San Salvador, corresponde al período:', opciones: ['Posclásico', 'Preclásico', 'Clásico temprano', 'Colonial'], correcta: 0, explicacion: 'Cihuatán es un sitio del período Posclásico vinculado a la migración pipil, que fue destruido y quemado.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'La aldea de Joya de Cerén fue fundada poco después de la erupción del volcán:', opciones: ['Ilopango', 'Loma Caldera', 'Izalco', 'San Miguel'], correcta: 0, explicacion: 'Tras la erupción del volcán de Ilopango, el valle fue reocupado y ahí se fundó posteriormente Joya de Cerén, que luego fue sepultada por Loma Caldera.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: '¿Qué material de construcción, usado en la reconstrucción de Tazumal en los años 40, generó controversia entre arqueólogos?', opciones: ['Cemento', 'Adobe', 'Piedra caliza', 'Estuco de cal'], correcta: 0, explicacion: 'El uso de cemento moderno por Stanley Boggs en la reconstrucción de las estructuras fue muy criticado en su momento.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'La estructura principal de Tazumal fue construida en trece etapas distintas, entre los años:', opciones: ['100 y 800 d.C.', '1200 y 1500 d.C.', '400 a.C. y 100 d.C.', '900 y 1200 d.C.'], correcta: 0, explicacion: 'La Estructura 1 (B1-1) se construyó en trece etapas sucesivas entre los años 100 y 800 d.C.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'El decreto legislativo que declaró Monumento Nacional a Joya de Cerén data de:', opciones: ['31 de agosto de 1989', '11 de diciembre de 1993', '1 de enero de 1980', '5 de mayo de 1976'], correcta: 0, explicacion: 'El Decreto Legislativo N.º 320, del 31 de agosto de 1989, declaró a Joya de Cerén Monumento Nacional.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: "Hasta la actualidad, Joya de Cerén es:", opciones: ["El único Patrimonio Mundial del país", "Uno de cinco sitios con esa distinción", "El segundo sitio más visitado del país", "Parte de un conjunto binacional maya"], correcta: 0, explicacion: "Joya de Cerén sigue siendo, hasta el momento, el único sitio salvadoreño declarado Patrimonio Mundial por la UNESCO." },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'El área arqueológica de Chalchuapa incluye, además de Tazumal, sitios como El Trapiche y:', opciones: ['Casa Blanca', 'Cihuatán', 'San Andrés', 'Quelepa'], correcta: 0, explicacion: 'Casa Blanca es otro de los sitios que integran la zona arqueológica de Chalchuapa, junto con El Trapiche.' },

  /* ═════════════════════════════════════════════════════════
     LEYENDAS
     ═════════════════════════════════════════════════════════ */

  // FÁCIL — nuevas, básicas y comerciales (ver marcador de inserción más abajo)
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Cuál es la característica física más conocida del Cipitío?', opciones: ['Mide dos metros', 'Tiene tres ojos', 'Es invisible', 'Tiene los pies al revés'], correcta: 3, explicacion: 'El Cipitío es famoso porque tiene los pies al revés, lo que causa confusión en los caminos por donde anda.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿A quién asusta principalmente la Siguanaba?', opciones: ['A todo el mundo por igual', 'A los hombres trasnochadores', 'A los animales', 'A los niños'], correcta: 1, explicacion: 'La Siguanaba asusta especialmente a los hombres desprevenidos, especialmente a aquellos que trasnochan o son infieles.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Cuál es la comida favorita del Cipitío?', opciones: ['El guineo', 'La carne', 'El maíz', 'El pan'], correcta: 0, explicacion: 'El Cipitío tiene un alimento favorito bien conocido: el guineo (plátano). También le gusta la miel y las cenizas.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Quién es la madre del Cipitío?', opciones: ['La Patasola', 'La Siguanaba', 'La Carreta Bruja', 'La Llorona'], correcta: 1, explicacion: 'El Cipitío es el hijo de la Siguanaba según la tradición oral salvadoreña, y fue castigado a ser eternamente un niño.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Cuántos años tiene eternamente el Cipitío?', opciones: ['Trece años', 'Siete años', 'Quince años', 'Diez años'], correcta: 3, explicacion: 'El Cipitío es un niño eterno de diez años que nunca envejece, condenado a mantener esa edad por siempre.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Cuántos tipos principales de Cadejo existen?', opciones: ['Cuatro tipos diferentes', 'Solo uno: el negro', 'Dos: blanco y negro', 'Tres: blanco, negro y rojo'], correcta: 2, explicacion: 'En el folclore salvadoreño existen dos Cadejos: el blanco (benévolo y protector) y el negro (malévolo y peligroso).' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Cuál es la función del Cadejo blanco?', opciones: ['Proteger a los viajeros', 'Asustar a la gente', 'Causar confusión en los caminos', 'Robar ganado'], correcta: 0, explicacion: 'El Cadejo blanco es considerado benévolo y protector, especialmente de los viajeros solitarios.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿En qué se convierte el rostro de la Siguanaba cuando el hombre se acerca creyendo que es una mujer hermosa?', opciones: ['En el rostro de un caballo o una calavera', 'En una anciana arrugada', 'En un lobo feroz', 'En una serpiente'], correcta: 0, explicacion: 'De lejos, la Siguanaba parece una mujer hermosa, pero al acercarse voltea y muestra un rostro aterrador, similar al de un caballo o una calavera, que provoca terror o locura en el hombre.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Cuál es una característica del Cipitío en cuanto a su aspecto físico?', opciones: ['Es transparente', 'Es alto y delgado', 'Es gordo y rojo', 'Es chaparro y barrigón'], correcta: 3, explicacion: 'El Cipitío es descrito como chaparro (bajo) y barrigón (con un vientre prominente), características muy reconocibles.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Qué usa el Cipitío como accesorio característico?', opciones: ['Una bufanda roja', 'Un sombrero grande', 'Un cinturón de oro', 'Un par de anteojos'], correcta: 1, explicacion: 'El Cipitío lleva puesto un sombrero grande o conical que es parte de su apariencia más reconocible.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Por qué se dice que el Cipitío confunde a los viajeros?', opciones: ['Porque tiene los pies al revés', 'Porque hace sonar campanas', 'Porque es invisible', 'Porque habla en idiomas extraños'], correcta: 0, explicacion: 'Los pies al revés del Cipitío hacen que deje huellas confusas en los caminos, engañando a los viajeros.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿En dónde le gusta frecuentar al Cipitío?', opciones: ['En las iglesias', 'En los cementerios', 'En los trapiches de caña de azúcar', 'En los mercados'], correcta: 2, explicacion: 'Al Cipitío le gusta ir a los trapiches (molinos) de caña de azúcar donde hay miel de dedo y dulces.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿A quién le gusta seguir el Cadejo negro?', opciones: ['A los sacerdotes', 'A los niños en el día', 'A los animales de granja', 'A los viajeros solitarios por la noche'], correcta: 3, explicacion: 'El Cadejo negro es malévolo y acecha especialmente a los viajeros solitarios durante la noche.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Cuál es la característica más peligrosa de la Siguanaba?', opciones: ['Puede hablar todos los idiomas', 'Puede llevar a los hombres a la locura', 'Puede congelar el agua', 'Puede volar'], correcta: 1, explicacion: 'La Siguanaba tiene la capacidad de llevar a los hombres a la locura, además de causar miedo extremo con su apariencia.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Cómo se describe comúnmente la cabellera de la Siguanaba?', opciones: ['Larga y negra', 'Corta y roja', 'Inexistente', 'Rizada y blanca'], correcta: 0, explicacion: 'La Siguanaba es típicamente descrita como una mujer de larga cabellera negra y vestido blanco en su forma inicial.' },

  // MEDIO (15)
  { cat: 'leyendas', nivel: 'medio', pregunta: '¿Quién es la madre de El Cipitío, según la leyenda salvadoreña?', opciones: ['La Siguanaba', 'La Llorona', 'La Carreta Bruja', 'La Chancha'], correcta: 0, explicacion: 'El Cipitío es, según la tradición, hijo de La Siguanaba.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: '¿A qué edad quedó condenado El Cipitío a permanecer para siempre?', opciones: ['10 años', '5 años', '15 años', '7 años'], correcta: 0, explicacion: 'El Cipitío fue condenado a permanecer eternamente como un niño de 10 años.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'Según la leyenda, ¿cómo se muestra La Siguanaba a los hombres al principio?', opciones: ['Como una mujer hermosa', 'Como un anciano', 'Como un animal', 'Como una sombra sin rostro'], correcta: 0, explicacion: 'La Siguanaba se presenta de lejos como una mujer hermosa, pero al acercarse revela un rostro horrible.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: '¿En qué colores se presenta tradicionalmente El Cadejo?', opciones: ['Blanco y negro', 'Rojo y azul', 'Dorado y plateado', 'Verde y café'], correcta: 0, explicacion: 'El Cadejo tiene dos versiones: una blanca, protectora, y otra negra, maligna.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: "¿Cómo se llama la carreta fantasma que anuncia mala suerte o muerte en la tradición salvadoreña?", opciones: ["La Carreta Bruja o Chillona", "El Carro de Fuego Errante", "La Diligencia Negra Maldita", "El Tren Fantasma Nocturno"], correcta: 0, explicacion: "La Carreta Bruja, también llamada Carreta Chillona, recorre los caminos de noche como presagio de desgracia." },
  { cat: 'leyendas', nivel: 'medio', pregunta: "¿Qué le gusta hacer a El Cipitío, según la tradición popular?", opciones: ["Revolcarse entre las cenizas", "Nadar en el mar a medianoche", "Cazar animales en el monte", "Tocar la marimba en fiestas"], correcta: 0, explicacion: "Al Cipitío le encanta revolcarse y comer cenizas, dejando pequeñas huellas cerca de los hornos." },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'Los pasos de El Cadejo suenan de manera similar a las pisadas de:', opciones: ['Una cabra', 'Un caballo', 'Un perro grande', 'Un gato'], correcta: 0, explicacion: 'Sus pasos se asemejan al sonido de pezuñas de cabra.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: '¿Qué parte del cuerpo de El Cipitío aparece "al revés" en la leyenda?', opciones: ['Sus pies', 'Sus manos', 'Su cabeza', 'Sus orejas'], correcta: 0, explicacion: 'Sus pies están volteados hacia atrás, lo que confunde a quienes intentan seguir sus huellas.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: "¿En qué lugar de San Salvador se dice que aparece El Padre sin Cabeza?", opciones: ["En la Iglesia El Rosario", "En el Parque Cuscatlán", "En el Zócalo del centro", "En el Mercado Ex-Cuartel"], correcta: 0, explicacion: "Según la leyenda, el Padre sin Cabeza sale por las puertas de la Iglesia El Rosario los viernes a medianoche." },
  { cat: 'leyendas', nivel: 'medio', pregunta: '¿Qué figura de la mitología salvadoreña se aparece principalmente a hombres infieles o trasnochadores cerca de los ríos?', opciones: ['La Siguanaba', 'El Cipitío', 'El Cadejo blanco', 'El Justo Juez'], correcta: 0, explicacion: 'La Siguanaba busca engañar y asustar a los hombres mujeriegos o infieles que andan solos de noche.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: "¿Qué prenda característica usa El Cipitío en la cabeza, según las descripciones populares?", opciones: ["Un gran sombrero puntiagudo", "Una corona de flores blancas", "Un casco de guerrero pipil", "Un turbante de tela oscura"], correcta: 0, explicacion: "El Cipitío suele describirse con un gran sombrero de palma puntiagudo." },
  { cat: 'leyendas', nivel: 'medio', pregunta: "¿Cuál es el nombre del espíritu nocturno que, según la tradición, castiga a quienes rompen las normas de la noche?", opciones: ["El Justo Juez de la Noche", "El Cipitío de las cenizas", "La Carreta Bruja errante", "El Cadejo negro del monte"], correcta: 0, explicacion: "El Justo Juez de la Noche es un personaje que, según la leyenda, castiga las faltas cometidas durante la noche." },
  { cat: 'leyendas', nivel: 'medio', pregunta: '¿Qué creencia indígena pipil sostiene que ciertas personas pueden transformarse en animales protectores?', opciones: ['El nahualismo', 'El curanderismo', 'El totemismo azteca', 'El chamanismo maya'], correcta: 0, explicacion: 'El nahualismo era una creencia muy extendida entre los pueblos pipiles.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: '¿Qué flor mágica, según la leyenda, solo pueden ver y recoger las personas mudas?', opciones: ['La Flor de Amate', 'La Flor de Izote', 'La Rosa de Cuscatlán', 'La Flor de Loto'], correcta: 0, explicacion: 'La Flor de Amate es una flor legendaria asociada a la buena suerte, visible únicamente para personas mudas.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: '¿Cuál de estos personajes NO pertenece a las leyendas salvadoreñas?', opciones: ['El Minotauro', 'La Siguanaba', 'El Cipitío', 'El Cadejo'], correcta: 0, explicacion: 'El Minotauro pertenece a la mitología griega; los otros tres son personajes clásicos del folclore salvadoreño.' },

  // DIFÍCIL (15)
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'Antes de ser maldecida, ¿cómo se llamaba la mujer que se convertiría en La Siguanaba?', opciones: ['Sihuehuet', 'Zipitía', 'Xochitl', 'Ixchel'], correcta: 0, explicacion: '"Sihuehuet" significa "mujer hermosa" en náhuat, antes de recibir la maldición que la transformó en la Siguanaba.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: '¿Qué significa el nombre "Siguanaba" según la tradición?', opciones: ['Mujer horrible', 'Mujer sabia', 'Madre de la noche', 'Espíritu del agua'], correcta: 0, explicacion: 'Tras la maldición, su nuevo nombre pasó a significar "mujer horrible".' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: '¿Qué significa la palabra "Cipit" en idioma náhuat?', opciones: ['Niño', 'Fuego', 'Luna', 'Serpiente'], correcta: 0, explicacion: '"Cipit" significa simplemente "niño" en náhuat, origen del nombre del Cipitío.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'Según la regla popular sobre El Cadejo, si escuchas sus pasos muy cerca, en realidad significa que:', opciones: ['Está lejos', 'Está a punto de atacar', 'Está detrás de ti', 'Se ha ido'], correcta: 0, explicacion: 'La leyenda dice que si se escucha cerca, está lejos; y si se escucha lejos, está muy cerca.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: '¿Qué color de Cadejo se considera protector de los caminantes nocturnos de buen corazón?', opciones: ['El blanco', 'El negro', 'El gris', 'El rojo'], correcta: 0, explicacion: 'El Cadejo blanco es considerado un ser protector y guía de quienes caminan de noche con buenas intenciones.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'En la historia popular de la Carreta Bruja, ¿qué apodo recibía el hombre que se negó a bendecir su carreta?', opciones: ['Pedro el Malo', 'Juan sin Miedo', 'El Diablo Cojuelo', 'Concho el Bribón'], correcta: 0, explicacion: 'En una de las versiones más conocidas, el hombre castigado era apodado "Pedro el Malo".' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'La escena de la maldición de la Carreta Bruja ocurre, según una versión popular, durante la celebración de qué santo patrono?', opciones: ['San Isidro Labrador', 'San Miguel Arcángel', 'San Salvador del Mundo', 'Santa Ana'], correcta: 0, explicacion: 'La leyenda sitúa el episodio en la fiesta de San Isidro Labrador, cuando los carreteros llevaban sus carretas a bendecir.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'Según la leyenda, ¿en qué día de la semana aparece El Padre sin Cabeza cerca de la Iglesia El Rosario?', opciones: ['Los viernes', 'Los lunes', 'Los domingos', 'Los martes'], correcta: 0, explicacion: 'Se dice que aparece todos los viernes a la medianoche.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'En la creencia del nahualismo, ¿quién invocaba el espíritu animal protector de un recién nacido?', opciones: ['Un hechicero o chamán', 'El sacerdote católico del pueblo', 'El propio niño al crecer', 'El jefe militar de la región'], correcta: 0, explicacion: 'Un hechicero invocaba, al nacer el niño, un espíritu animal que se convertía en su nahual protector.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: '¿En qué región de El Salvador se ubica tradicionalmente la leyenda de El Cipitío, aunque puede transportarse a cualquier lugar?', opciones: ['San Vicente', 'Morazán', 'La Unión', 'Chalatenango'], correcta: 0, explicacion: 'La tradición sitúa a El Cipitío principalmente en el departamento de San Vicente.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: "¿Qué versión explica el origen de El Padre sin Cabeza relacionándolo con un conflicto social?", opciones: ["Fue decapitado por unirse a una revuelta campesina", "Murió luchando contra piratas ingleses en la costa", "Fue ejecutado por herejía durante la colonia", "Murió en un duelo por un amor prohibido en Izalco"], correcta: 0, explicacion: "Una de las versiones cuenta que el sacerdote fue decapitado por tomar parte en un levantamiento campesino." },
  { cat: 'leyendas', nivel: 'dificil', pregunta: '¿Qué característica corporal, además de sus pies al revés, suele destacarse en las descripciones de El Cipitío?', opciones: ['Su enorme barriga', 'Sus alas de murciélago', 'Su piel escamosa', 'Sus cuernos'], correcta: 0, explicacion: 'Se le describe con una gran barriga, resultado de su gusto por comer cenizas.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'Según algunas versiones, El Cipitío también frecuenta los trapiches de moliendas de caña porque le atrae:', opciones: ['La miel y el dulce de atado', 'El humo de los hornos', 'El sonido de las campanas', 'Las herramientas de los trabajadores'], correcta: 0, explicacion: 'Le atraen la miel de dedo y el dulce de atado que se producen en los trapiches.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: '¿Cuál es una de las razones por las que, según la leyenda, la Carreta Bruja visita ciertos pueblos?', opciones: ['Porque en ellos no hay amor ni armonía', 'Porque son los más ricos del país', 'Porque tienen iglesias abandonadas', 'Porque están cerca del mar'], correcta: 0, explicacion: 'Se dice que la carreta ronda los pueblos donde falta el amor y la armonía entre sus habitantes.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: "¿Qué tipo de espíritu es, en general, un \"nahual\" dentro de la tradición pipil?", opciones: ["Un espíritu animal protector dado al nacer", "Un fantasma vengativo de los caminos viejos", "Un dios menor de la lluvia y las cosechas", "Un objeto encantado heredado en familia"], correcta: 0, explicacion: "El nahual es un espíritu animal protector que, según la creencia, se asigna a la persona desde su nacimiento." },

  // GUANACO (15)
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'En una de las versiones, ¿quién es descrito como el "Dios de dioses" que lanza la maldición sobre la madre de El Cipitío?', opciones: ['Teotl', 'Tláloc', 'Itzamná', 'Quetzalcóatl'], correcta: 0, explicacion: 'En esta versión, Teotl, el "dios de los dioses", condena a la madre y a su hijo tras el romance ilícito.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'Según una versión detallada de la leyenda, la madre de El Cipitío tuvo un romance ilícito con:', opciones: ['Un lucero de la mañana', 'Un guerrero extranjero', 'Un sacerdote maya', 'Un espíritu del bosque'], correcta: 0, explicacion: 'En esta variante, Sihuehuet mantuvo un romance con un lucero de la mañana, lo que originó la maldición.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: '¿Con qué cerro se asocia tradicionalmente el hogar de La Siguanaba y su hijo El Cipitío?', opciones: ['El cerro Sihuatepeque', 'El volcán de Izalco', 'El cerro de Guazapa', 'El volcán Chaparrastique'], correcta: 0, explicacion: 'El cerro Sihuatepeque, que significa "cerro de la mujer", se asocia con la región de origen de estos personajes.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: "Según ciertas versiones, ¿qué debía hacer una muchacha para lograr que El Cipitío dejara de molestarla?", opciones: ["Descuidar su higiene por varios días", "Ofrecerle flores blancas del monte", "Recitar una oración especial al alba", "Regalarle dulce de atado y guineos"], correcta: 0, explicacion: "Se dice que al Cipitío le disgustan los malos hábitos de higiene, por lo que las jóvenes usaban esto como manera de ahuyentarlo." },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: "¿Qué elemento sonoro distintivo advierte, según la tradición, la cercanía de la Carreta Bruja?", opciones: ["Un chirrido de ruedas de madera", "Un canto de gallo a medianoche", "El tañido de campanas lejanas", "El aullido de perros callejeros"], correcta: 0, explicacion: "El terrible chirrido de sus ruedas de madera anuncia la llegada de la Carreta Bruja." },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: '¿En qué libro, publicado en 1919, recopiló y dio forma literaria Miguel Ángel Espino a las leyendas de La Siguanaba y El Cipitío?', opciones: ['Mitología de Cuscatlán', 'Cuentos de Barro', 'Leyendas de Guatemala', 'Relatos de Cuscatlán'], correcta: 0, explicacion: 'Miguel Ángel Espino publicó "Mitología de Cuscatlán" en 1919, dando una versión literaria a estas leyendas salvadoreñas.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: '¿Qué otros seres legendarios de forma animal se mencionan junto al Cadejo en la tradición salvadoreña?', opciones: ['El Mico Brujo y La Chancha', 'El Grifo y la Esfinge', 'El Unicornio y el Dragón', 'El Basilisco y la Hidra'], correcta: 0, explicacion: 'El Mico Brujo y La Chancha son otros personajes de forma animal presentes en el folclore salvadoreño.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'En algunas interpretaciones, el nombre "Cipit" se ha relacionado con una deidad mesoamericana llamada:', opciones: ['Xipe Tótec', 'Huitzilopochtli', 'Quetzalcóatl', 'Itzamná'], correcta: 0, explicacion: 'Algunas versiones relacionan el nombre del Cipitío con la deidad mesoamericana Xipe Tótec.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: "Según la leyenda, ¿qué dos versiones explican por qué El Padre sin Cabeza perdió la cabeza?", opciones: ["Murió sin confesarse, o fue decapitado en una revuelta", "Fue partido por un rayo o por una maldición gitana", "Murió en una batalla naval o en el incendio del puerto", "Fue ejecutado por el rey de España o por brujería"], correcta: 0, explicacion: "Existen dos versiones principales sobre su origen: una religiosa (pecado sin confesar) y otra social (participación en una revuelta)." },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: "¿Qué representan, en conjunto, los dos Cadejos (blanco y negro) dentro del imaginario popular?", opciones: ["La lucha entre el bien y el mal", "El paso del día y de la noche", "La riqueza y la pobreza rural", "El campo y la ciudad moderna"], correcta: 0, explicacion: "Ambos cadejos simbolizan la eterna lucha entre las fuerzas del bien y del mal." },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'Según la leyenda, tras salir de la Iglesia El Rosario, ¿hacia qué dirección se dice que camina El Padre sin Cabeza?', opciones: ['Hacia el norte', 'Hacia el sur', 'Hacia el oriente', 'Hacia el poniente'], correcta: 0, explicacion: 'Según los relatos, camina hacia el norte por la sexta avenida tras salir de la iglesia.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: "En la tradición popular, ¿qué función cumplía el nahual asignado a un recién nacido?", opciones: ["Ser el espíritu animal protector de por vida", "Determinar su oficio y su lugar en el pueblo", "Curar las enfermedades graves de la familia", "Proteger la cosecha y el ganado del pueblo"], correcta: 0, explicacion: "El nahual acompañaba y protegía a la persona durante toda su vida, según esta creencia pipil." },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'Según la tradición, ¿qué lleva en la mano El Padre sin Cabeza mientras camina por las calles pese a no tener cabeza?', opciones: ['Un rosario', 'Una vela encendida', 'Una cruz de madera', 'Una biblia abierta'], correcta: 0, explicacion: 'Se dice que el Padre sin Cabeza camina con un rosario en la mano, produciendo un frío paralizante a quien se le acerca.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'En una de las versiones sobre el origen de La Siguanaba, su verdadero nombre "Sihuehuet" está relacionado con qué significado?', opciones: ['Mujer hermosa', 'Madre de la luna', 'Guardiana del río', 'Hija del sol'], correcta: 0, explicacion: '"Sihuehuet" se traduce como "mujer hermosa" antes de que recayera sobre ella la maldición.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: "¿Qué come principalmente El Cipitío, además de cenizas, según ciertas versiones de la leyenda?", opciones: ["Guineo y dulce de atado", "Carne cruda de venado", "Insectos y hojas verdes", "Solo agua de los ríos"], correcta: 0, explicacion: "Según algunas versiones, su alimento favorito es el guineo y el dulce de atado, además de las cenizas." },


];

/* ══════════════════════════════════════════════════════════
   BANCO DE PREGUNTAS — INGLÉS (traducción completa)
   ══════════════════════════════════════════════════════════ */
const PREGUNTAS_EN = [

  /* ═════════════════════════════════════════════════════════
     HISTORIA
     ═════════════════════════════════════════════════════════ */

  // FÁCIL — nuevas, básicas y comerciales (ver marcador de inserción más abajo)
  { cat: 'historia', nivel: 'facil', pregunta: 'What date did El Salvador declare its independence from Spain?', opciones: ['October 12, 1821', 'January 1, 1821', 'August 15, 1821', 'September 15, 1821'], correcta: 3, explicacion: 'El Salvador declared independence from Spain on September 15, 1821, along with other Central American countries.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What is the capital of El Salvador?', opciones: ['Sonsonate', 'San Salvador', 'San Miguel', 'Santa Ana'], correcta: 1, explicacion: 'San Salvador is the capital and largest city of El Salvador, located in the Valley of the Hammocks.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What is the national flower of El Salvador?', opciones: ['Flor de Izote', 'Magnolia', 'Salvadoran Rose', 'White Lily'], correcta: 0, explicacion: 'The Flor de Izote (Yucca elephantipes) has been the national flower of El Salvador for many decades.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What is the national bird of El Salvador?', opciones: ['Quetzal', 'Torogoz', 'Green Parrot', 'Hawk'], correcta: 1, explicacion: 'The Torogoz was declared the national bird of El Salvador by Legislative Agreement on October 21, 1999, symbolizing family unity.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What are the colors of the El Salvador flag?', opciones: ['Blue, yellow, and red', 'Red, white, and blue', 'Green, white, and red', 'Blue, white, and blue'], correcta: 3, explicacion: 'The El Salvador flag has three horizontal stripes: blue, white, and blue, representing the sky, peace, and the ocean.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What was Monsignor Óscar Arnulfo Romero\'s role in El Salvador\'s history?', opciones: ['A Spanish conquistador', 'A revolutionary guerrilla leader', 'An Archbishop who defended human rights', 'President of the republic'], correcta: 2, explicacion: 'Monsignor Romero was an Archbishop of San Salvador and was assassinated in 1980 for his courageous defense of human rights during the civil war.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What year did the El Salvador Civil War end?', opciones: ['1992', '1988', '1990', '1995'], correcta: 0, explicacion: 'The El Salvador Civil War ended in 1992 with the Chapultepec Peace Accords, signed on January 16, 1992.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What was the name of the Salvadoran territory during pre-Columbian times?', opciones: ['Quetzaltenango', 'Cuscatlán', 'Tikal', 'Copán'], correcta: 1, explicacion: 'Cuscatlán was the name of the Pipil kingdom that occupied the territory of present-day El Salvador. In Pipil language it means "land of jewels and riches."' },
  { cat: 'historia', nivel: 'facil', pregunta: 'Who was Farabundo Martí in Salvadoran history?', opciones: ['A Spanish conquistador', 'A president of the republic', 'A Catholic saint', 'A revolutionary leader'], correcta: 3, explicacion: 'Farabundo Martí was a revolutionary leader who participated in labor movements and organized a peasant uprising in 1932.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'When was Monsignor Óscar Arnulfo Romero assassinated?', opciones: ['January 1, 1980', 'March 24, 1980', 'July 31, 1980', 'September 15, 1980'], correcta: 1, explicacion: 'Monsignor Óscar Arnulfo Romero was assassinated on March 24, 1980, while celebrating Mass at the Divine Providence Hospital chapel.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What does the name "Cuscatlán" mean in the Pipil language?', opciones: ['Land of jewels and riches', 'Land of water', 'Land of fire', 'Land of the gods'], correcta: 0, explicacion: 'Cuscatlán in the Pipil language means "land of jewels and riches," reflecting the abundance of natural resources in the region.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'Is El Salvador the smallest country in Central America?', opciones: ['No, Honduras is smaller', 'No, Belize is smaller', 'Yes, it is the smallest', 'No, Costa Rica is smaller'], correcta: 2, explicacion: 'El Salvador is the smallest country in Central America by land area, with just over 21,000 square kilometers.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What is the national tree of El Salvador?', opciones: ['Pine', 'Mahogany', 'Oak', 'Maquilishauat'], correcta: 3, explicacion: 'The Maquilishauat has been considered the national tree of El Salvador since 1940, along with the Bálsamo tree.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What is the official currency of El Salvador since 2001?', opciones: ['The lempira', 'The United States dollar', 'The quetzal', 'The Salvadoran colón'], correcta: 1, explicacion: 'El Salvador adopted the United States dollar as its official currency on January 1, 2001, replacing the Salvadoran colón.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What is the highest volcano in El Salvador (also known as Ilamatepec)?', opciones: ['Santa Ana', 'San Salvador', 'Izalco', 'San Vicente'], correcta: 0, explicacion: 'Santa Ana volcano (also called Ilamatepec) is the highest volcano in El Salvador at 2,381 meters above sea level.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'Who is the patron saint of El Salvador?', opciones: ['Saint Salvador', 'Jesus Christ (The Divine Savior of the World)', 'Saint Michael', 'Saint Christopher'], correcta: 1, explicacion: 'Jesus Christ is the patron saint of El Salvador under the title "The Divine Savior of the World," from which the official name of the country derives.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What is the nickname by which El Salvador is known worldwide?', opciones: ['Heart of Central America', 'Land of Volcanoes', 'Pearl of the Pacific', 'The Little Thumb of America'], correcta: 3, explicacion: '"The Little Thumb of America" (Pulgarcito de América) is the affectionate nickname for El Salvador because it is the smallest country on the American continent.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What indigenous group inhabited El Salvador before Spanish conquest?', opciones: ['The Aztecs', 'The Pipiles', 'The Incas', 'The Mayans'], correcta: 1, explicacion: 'The Pipiles were the main indigenous group that inhabited the territory of El Salvador before the arrival of the Spanish in the sixteenth century.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'How many volcanoes are represented on El Salvador\'s coat of arms?', opciones: ['2 volcanoes', '3 volcanoes', '5 volcanoes', '7 volcanoes'], correcta: 2, explicacion: 'El Salvador\'s coat of arms displays 5 green volcanoes emerging from the blue ocean, symbolizing the five states of the former Federal Republic of Central America.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'In what century was El Salvador conquered by the Spanish?', opciones: ['In the eighteenth century', 'In the fifteenth century', 'In the sixteenth century', 'In the seventeenth century'], correcta: 2, explicacion: 'El Salvador was conquered by the Spanish in the sixteenth century under the command of Pedro de Alvarado, who arrived from Guatemala.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What is the official language of El Salvador?', opciones: ['English', 'Spanish', 'Nahua', 'Pipil language'], correcta: 1, explicacion: 'Spanish is the official language of El Salvador and is spoken by the vast majority of the Salvadoran population.' },

  // MEDIO (22)
  { cat: 'historia', nivel: 'medio', pregunta: 'What was the name of the Salvadoran territory before the Spanish conquest?', opciones: ['Quetzaltenango', 'Cuscatlán', 'Tikal', 'Copán'], correcta: 1, explicacion: 'The territory was known as Cuscatlán, a Pipil name meaning "place of jewels and riches".' },
  { cat: 'historia', nivel: 'medio', pregunta: 'When was Central American Independence proclaimed?', opciones: ['July 15, 1821', 'September 15, 1821', 'July 4, 1821', 'February 18, 1841'], correcta: 1, explicacion: 'On September 15, 1821, Central American Independence from Spanish rule was proclaimed.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'Which indigenous people were the most numerous in El Salvador when the Spanish arrived?', opciones: ['The Maya', 'The Lenca', 'The Pipil', 'The Aztecs'], correcta: 2, explicacion: 'The Pipil, of Nahua origin related to the Aztecs, were the most numerous indigenous group in the territory.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'In what year did El Salvador definitively separate from the Central American Federation?', opciones: ['1821', '1823', '1838', '1841'], correcta: 3, explicacion: 'El Salvador became a sovereign state on February 18, 1841, when it left the federation.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'Who is known as the "Father of the Salvadoran Homeland"?', opciones: ['Anastasio Aquino', 'Pedro de Alvarado', 'José Matías Delgado', 'Francisco Morazán'], correcta: 2, explicacion: 'Priest José Matías Delgado led the first independence movements of 1811 and 1814.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'What is the capital of El Salvador?', opciones: ['Santa Ana', 'San Salvador', 'Sonsonate', 'La Libertad'], correcta: 1, explicacion: 'San Salvador is the capital and most important city of El Salvador.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'In which century did Pedro de Alvarado arrive in the territory of Cuscatlán?', opciones: ['15th century', '16th century', '17th century', '18th century'], correcta: 1, explicacion: 'Pedro de Alvarado arrived in 1524 during the 16th century to conquer the territory.' },
  { cat: 'historia', nivel: 'medio', pregunta: "What was the main religion of the indigenous peoples of El Salvador?", opciones: ["Christianity before 1500", "Polytheism with Nahua gods", "Monotheism of one sun god", "Buddhism arrived by sea"], correcta: 1, explicacion: "Indigenous peoples practiced polytheism, worshipping Nahua-origin gods such as Quetzalcoatl." },
  { cat: 'historia', nivel: 'medio', pregunta: "What does the word Cuscatlán mean in the Pipil language?", opciones: ["Land of fire and gray ash", "Place of jewels and riches", "Sacred valley of the gods", "Water of the high mountains"], correcta: 1, explicacion: "Cuscatlán means \"place of jewels and riches\" in the Pipil language." },
  { cat: 'historia', nivel: 'medio', pregunta: 'To which viceroyalty did the Captaincy General of Guatemala administratively belong?', opciones: ['Peru', 'New Spain', 'New Granada', 'Río de la Plata'], correcta: 1, explicacion: 'The Captaincy General of Guatemala, which included El Salvador, depended on the Viceroyalty of New Spain.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'On what date is El Salvador\'s Independence celebrated?', opciones: ['February 15', 'September 15', 'November 1', 'December 14'], correcta: 1, explicacion: 'September 15 commemorates Central American Independence, including El Salvador.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'How many departments does El Salvador have?', opciones: ['12', '14', '16', '18'], correcta: 1, explicacion: 'El Salvador is divided into 14 administrative departments.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'Which conquistador was wounded in the Battle of Acajutla?', opciones: ['Cortés', 'Pizarro', 'Pedro de Alvarado', 'Diego de Almagro'], correcta: 2, explicacion: 'Pedro de Alvarado was wounded in the battle against the Pipil on the Acajutla River.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'What was the first cry of independence in El Salvador?', opciones: ['1808', '1811', '1815', '1821'], correcta: 1, explicacion: 'The first cry of independence occurred on November 5, 1811, led by José Matías Delgado.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'What did El Salvador\'s 1841 Constitution establish?', opciones: ['A monarchy as the form of government', 'El Salvador as a free, sovereign, and independent State', 'Reincorporation into Mexico', 'A return to Spanish rule'], correcta: 1, explicacion: 'The 1841 Constitution declared El Salvador a free, sovereign, and independent State after its definitive separation from the Central American Federation.' },
  { cat: 'historia', nivel: 'medio', pregunta: "What importance did coffee have in the 19th-century Salvadoran economy?", opciones: ["No commercial importance", "The main export product", "Only exports to Guatemala", "Only domestic ritual use"], correcta: 1, explicacion: "Coffee became the economic engine of El Salvador starting in the 1850s." },
  { cat: 'historia', nivel: 'medio', pregunta: 'To which ethnic group did the Pipil belong?', opciones: ['Mayas', 'Nahuas', 'Lencas', 'Pokomames'], correcta: 1, explicacion: 'The Pipil were of Nahua origin, related to the peoples of the Valley of Mexico.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'What was the main language of the Pipil?', opciones: ['Quiche', 'Nahua/Pipil', 'Lenca', 'Chorti'], correcta: 1, explicacion: 'The Pipil spoke the Pipil language, a variant of Nahua.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'Approximately how long did it take to conquer the Salvadoran territory?', opciones: ['1 year', '3-5 years', '10 years', '20 years'], correcta: 1, explicacion: 'The conquest of Cuscatlán took approximately 3-5 years, completed around 1528.' },
  { cat: 'historia', nivel: 'medio', pregunta: "What was the main economic activity of pre-Hispanic indigenous peoples?", opciones: ["Cattle and sheep herding", "Agriculture and trade", "Gold and silver mining", "Textile manufacturing"], correcta: 1, explicacion: "Indigenous peoples were based on agriculture (corn, beans, cacao) and active trade." },
  { cat: 'historia', nivel: 'medio', pregunta: 'What was the most important pre-Hispanic capital of the territory?', opciones: ['Chalchuapa', 'Cuzcatlán', 'Cojutepeque', 'Sonsonate'], correcta: 1, explicacion: 'Cuzcatlán was the most important pre-Hispanic capital, located in what is now La Libertad.' },
  { cat: 'historia', nivel: 'medio', pregunta: "What type of government did the indigenous peoples of El Salvador have?", opciones: ["Inherited absolute monarchy", "Chiefdoms ruled by caciques", "Elected democratic republic", "Pure priestly theocracy"], correcta: 1, explicacion: "The territory was divided into independent chiefdoms, each governed by its own cacique or prince." },

  // DIFÍCIL (24)
  { cat: 'historia', nivel: 'dificil', pregunta: 'In which department is the Tazumal archaeological site, one of the most important legacies of the Pipil civilization, located?', opciones: ['Sonsonate', 'Santa Ana', 'Cuscatlán', 'La Paz'], correcta: 1, explicacion: 'Tazumal, one of El Salvador\'s most important archaeological sites, is located in Chalchuapa, Santa Ana department.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'Which crop was the basis of the Salvadoran colonial economy before coffee?', opciones: ['Cacao', 'Cotton', 'Indigo', 'Sugar cane'], correcta: 2, explicacion: 'Indigo (añil), a blue dye highly valued in Europe, was the main colonial export product.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'In what year were the Chapultepec Peace Accords signed?', opciones: ['1989', '1990', '1992', '1994'], correcta: 2, explicacion: 'On January 16, 1992, the Peace Accords were signed, ending 12 years of armed conflict.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'Which Spanish conquistador tried to dominate Cuscatlán in 1524?', opciones: ['Hernán Cortés', 'Francisco Pizarro', 'Pedro de Alvarado', 'Diego de Almagro'], correcta: 2, explicacion: 'Pedro de Alvarado was wounded by the Pipil in the Battle of the Acajutla River.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'How many victims are estimated to have resulted from the 1932 Matanza?', opciones: ['More than 5,000', 'More than 10,000', 'More than 20,000', 'More than 30,000'], correcta: 3, explicacion: 'It is estimated that more than 30,000 people were massacred in the 1932 rebellion.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'Under which viceroyalty did El Salvador belong during colonial times?', opciones: ['Viceroyalty of Peru', 'Viceroyalty of New Spain', 'Viceroyalty of New Granada', 'Viceroyalty of Río de la Plata'], correcta: 1, explicacion: 'El Salvador was part of the Captaincy General of Guatemala, dependent on the Viceroyalty of New Spain.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'What was the colonial system called that granted Spaniards the right to demand tribute and labor from indigenous people?', opciones: ['The repartimiento', 'The encomienda', 'The cabildo', 'The corregimiento'], correcta: 1, explicacion: 'The encomienda was the colonial system that granted Spaniards the right to receive tribute and labor from indigenous people in exchange for "protecting" and evangelizing them.' },
  { cat: 'historia', nivel: 'dificil', pregunta: "Who was Farabundo Martí?", opciones: ["Conservative military officer", "Communist revolutionary leader", "Wealthy coffee entrepreneur", "Right-wing army commander"], correcta: 1, explicacion: "Farabundo Martí was a communist leader who led the peasant and indigenous rebellion of 1932." },
  { cat: 'historia', nivel: 'dificil', pregunta: 'In what year did the "Football War" between El Salvador and Honduras take place?', opciones: ['1965', '1967', '1969', '1971'], correcta: 2, explicacion: 'The Football War occurred in 1969, originating from clashes in football matches and border conflicts.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'How many years did the Salvadoran Civil War last?', opciones: ['8 years', '10 years', '12 years', '15 years'], correcta: 2, explicacion: 'The Civil War lasted 12 years, from 1980 to 1992, until the Chapultepec Peace Accords.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'Which 19th-century Salvadoran president drove the abolition of communal lands (ejidos) to expand coffee cultivation?', opciones: ['Rafael Zaldívar', 'Francisco Menéndez', 'Tomás Regalado', 'Carlos Ezeta'], correcta: 0, explicacion: 'President Rafael Zaldívar decreed in 1881-1882 the abolition of communal and ejido lands to favor the expansion of coffee cultivation.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'In what year was the dollar established as the official currency in El Salvador?', opciones: ['1999', '2000', '2001', '2002'], correcta: 2, explicacion: 'El Salvador adopted the U.S. dollar as its official currency on January 1, 2001, with the "Monetary Integration Law".' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'Which group overthrew President Salvador Castaneda Castro on December 14, 1948?', opciones: ['A group of young military officers', 'The FMLN', 'Coffee-growing oligarchs', 'Invading Honduran troops'], correcta: 0, explicacion: 'On December 14, 1948, a group of young military officers overthrew President Castaneda Castro, beginning what became known as the "Revolution of 48".' },
  { cat: 'historia', nivel: 'dificil', pregunta: "Who was Maximiliano Hernández Martínez?", opciones: ["National hero of the war", "20th-century military dictator", "Leader of the independence", "Spanish conquistador of 1524"], correcta: 1, explicacion: "Maximiliano Hernández Martínez was a military dictator who ruled El Salvador between 1931 and 1944." },
  { cat: 'historia', nivel: 'dificil', pregunta: 'In what year did the Central American Federation first split?', opciones: ['1838', '1839', '1840', '1841'], correcta: 0, explicacion: 'The Central American Federation began to disintegrate in 1838, culminating with El Salvador\'s departure.' },
  { cat: 'historia', nivel: 'dificil', pregunta: "What was the main consequence of the 1932 Matanza?", opciones: ["End of all coffee exportation", "Repression of indigenous peoples", "Full unification of Central America", "Immediate national democratization"], correcta: 1, explicacion: "The massacre resulted in severe repression against the indigenous and peasant population for decades." },
  { cat: 'historia', nivel: 'dificil', pregunta: "What was the \"Esquipulas Treaty\"?", opciones: ["A customs trade agreement", "A Central American peace deal", "A military alliance vs Belize", "A maritime boundary treaty"], correcta: 1, explicacion: "The Esquipulas II Accords (1987) were a plan for peace and democratization in Central America." },
  { cat: 'historia', nivel: 'dificil', pregunta: 'In what year was the FMLN founded?', opciones: ['1975', '1977', '1979', '1980'], correcta: 3, explicacion: 'The Farabundo Martí National Liberation Front (FMLN) was founded on October 10, 1980 as a guerrilla coalition.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'In what year did the FMLN launch its "Final Offensive" against the capital, San Salvador?', opciones: ['1986', '1987', '1989', '1991'], correcta: 2, explicacion: 'In November 1989, the FMLN launched its largest military offensive, reaching combat inside the capital, San Salvador.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'Who was Salvadoran President Gerardo Barrios, executed by firing squad in 1865?', opciones: ['A Spanish conquistador', 'A promoter of coffee cultivation', 'A 20th-century dictator', 'A martyred archbishop'], correcta: 1, explicacion: 'Gerardo Barrios, president of El Salvador (1859-1863), actively promoted coffee cultivation; he was overthrown and executed by firing squad in 1865.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'In what year did El Salvador\'s current Political Constitution take effect?', opciones: ['1962', '1972', '1983', '1994'], correcta: 2, explicacion: 'The 1983 Constitution, promulgated during the Civil War, remains in effect today with numerous reforms.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'What event immediately preceded the 1980 Civil War?', opciones: ['1979 coup', '1982 elections', '1970 economic crisis', '1976 earthquake'], correcta: 0, explicacion: 'The military coup of October 15, 1979 destabilized the country and led to the start of the Civil War.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'How many signatories were there in the Chapultepec Peace Accords?', opciones: ['FMLN and Government', 'FMLN, Government and UN', 'FMLN, Government, UN and IDHUCA', 'FMLN, Government and USA'], correcta: 1, explicacion: 'The Accords were signed by the FMLN, the Salvadoran Government and the UN as mediator.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'In what year was General Romero removed from office?', opciones: ['1977', '1979', '1980', '1982'], correcta: 1, explicacion: 'General Carlos Humberto Romero was overthrown in the military coup of October 15, 1979.' },

  // GUANACO (23)
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What was the name of the Pipil chief who led the resistance against Pedro de Alvarado?', opciones: ['Lempira', 'Atlacatl', 'Nicarao', 'Tezozomoc'], correcta: 1, explicacion: 'Atlacatl was the legendary Pipil warrior chief who led indigenous resistance against the conquest.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'Who led the indigenous uprising of 1833 in Nonualco?', opciones: ['Farabundo Martí', 'Anastasio Aquino', 'Felipe Xicotencatl', 'Miguel Cabrera'], correcta: 1, explicacion: 'Anastasio Aquino, known as the "King of the Nonualcos," led a peasant and indigenous rebellion in 1833.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'On what date was Archbishop Óscar Romero assassinated?', opciones: ['January 16, 1980', 'March 24, 1980', 'October 15, 1979', 'November 11, 1989'], correcta: 1, explicacion: 'Óscar Romero was assassinated on March 24, 1980, while celebrating Mass.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What was the first Salvadoran cry of independence and on what date?', opciones: ['November 5, 1811', 'September 15, 1821', 'February 24, 1814', 'November 2, 1811'], correcta: 0, explicacion: 'The first cry of independence occurred on November 5, 1811, led by José Matías Delgado.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: "Which international treaty recognized El Salvador's borders with Honduras?", opciones: ["1902 Lima Peace Treaty", "1907 Washington Treaty", "1980 General Peace Treaty", "1987 Esquipulas Treaty"], correcta: 2, explicacion: "The 1980 General Peace Treaty established the territorial limits between El Salvador and Honduras." },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'In which department is the ancient pre-Hispanic capital of Cuzcatlán located?', opciones: ['San Salvador', 'La Libertad', 'Cuscatlán', 'Chalatenango'], correcta: 1, explicacion: 'The pre-Hispanic capital was located in what is now Antiguo Cuscatlán, in La Libertad department.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What was the name of the 1979 coup d\'état?', opciones: ['The April Revolution', 'The Young Military Coup', 'The Civic-Military Proclamation', 'The October 15 Pronouncement'], correcta: 3, explicacion: 'On October 15, 1979, the "October 15 Pronouncement" occurred, overthrowing General Romero.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What is the name of the sector that historically dominated Salvadoran politics?', opciones: ['The Golden Circle', 'The 14 Families', 'The Coffee Elite', 'The Lords of the Land'], correcta: 1, explicacion: '"The 14 Families" is the popular term for the coffee oligarchy of the 20th century.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'Who was appointed president during the Peace Accords?', opciones: ['Alfredo Cristiani', 'José Napoleón Duarte', 'Armando Calderón Sol', 'Mauricio Funes'], correcta: 0, explicacion: 'Alfredo Cristiani was president during the signing of the Chapultepec Peace Accords in 1992.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'In what year was the city of San Salvador definitively founded in the Valley of the Hammocks, its current location?', opciones: ['1524', '1525', '1528', '1533'], correcta: 2, explicacion: 'After a failed first settlement in 1525 near Suchitoto, San Salvador was refounded in 1528 in the Valley of the Hammocks, its definitive location.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: "What was the colonial administrative structure of El Salvador?", opciones: ["Independent viceroyalty of Cuscatlan", "Province of the Captaincy of Guatemala", "Autonomous government under the Crown", "Direct mayoralty reporting to Lima"], correcta: 1, explicacion: "El Salvador was a Province of the Captaincy General of Guatemala during colonial times." },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'Where and when did Guatemalan President Justo Rufino Barrios die while trying to forcibly reunify Central America?', opciones: ['Battle of Chalchuapa, El Salvador, 1885', 'Battle of Coatepeque, Guatemala, 1863', 'Battle of Acajutla, El Salvador, 1524', 'Battle of San Salvador, 1871'], correcta: 0, explicacion: 'Justo Rufino Barrios died at the Battle of Chalchuapa on April 2, 1885, during his attempt to forcibly reunify Central America.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'How many main guerrilla commanders led the FMLN?', opciones: ['3', '4', '5', '6'], correcta: 2, explicacion: 'The FMLN was composed of 5 guerrilla organizations with their main commanders.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: "Which international agreement sponsored the Peace Accords?", opciones: ["League of Nations of 1919", "United Nations Organization", "Union of American Countries", "European Union of States"], correcta: 1, explicacion: "The United Nations (UN) was the official mediator in the 1992 Peace Accords." },
  { cat: 'historia', nivel: 'guanaco', pregunta: "In which period did the greatest Salvadoran migration to the United States occur?", opciones: ["The 1950s and 1960s", "The early 1970s only", "The 1980s and 1990s", "The 2000s to 2010s"], correcta: 2, explicacion: "The 1980-1992 Civil War caused the largest migration of Salvadorans to the United States." },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'Which was the first town founded by the Spanish in Salvadoran territory?', opciones: ['San Vicente', 'San Salvador', 'Sonsonate', 'Santa Ana'], correcta: 1, explicacion: 'San Salvador was founded in 1525 (near present-day Suchitoto) and refounded in 1528 at its current location, making it the first Spanish town in the territory.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: "Under which president's government was El Salvador's 1886 Constitution promulgated?", opciones: ['Rafael Zaldívar', 'Francisco Menéndez', 'Carlos Ezeta', 'Tomás Regalado'], correcta: 1, explicacion: 'The liberal-leaning 1886 Constitution was promulgated under the government of General Francisco Menéndez, following the "Revolution of the 44".' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'In what year did Spanish presence in El Salvador officially end?', opciones: ['1811', '1821', '1841', '1900'], correcta: 1, explicacion: 'With Central American independence in 1821, Spanish presence in El Salvador ended.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: "What caused the fracture of the Central American Federation?", opciones: ["An English commercial blockade", "Political and economic differences", "An earthquake that razed the capital", "A yellow fever epidemic outbreak"], correcta: 1, explicacion: "Political differences, conservative vs. liberal, and divergent economic interests caused disintegration." },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'Which city was the capital of El Salvador during the federal period?', opciones: ['San Vicente', 'San Salvador', 'Santa Ana', 'La Libertad'], correcta: 1, explicacion: 'San Salvador was the capital during the Central American Federation period.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: "What was the main cause of the 1969 Football War?", opciones: ["Purely the sporting rivalry", "Border and migration conflicts", "Dispute over mining resources", "A direct US intervention"], correcta: 1, explicacion: "The war resulted from border conflicts, sporting tensions, and Salvadoran migration to Honduras." },
  { cat: 'historia', nivel: 'guanaco', pregunta: "Which institution mediated the conflict in the Peace Accords?", opciones: ["The International Red Cross", "The United Nations Organization", "Organization of American States", "The Arab League based in Cairo"], correcta: 1, explicacion: "The UN played a crucial role as mediator and verifier of the Peace Accords." },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'How many political constitutions has El Salvador had since its independence?', opciones: ['8', '10', '12', '13'], correcta: 3, explicacion: 'El Salvador has had 13 political constitutions since independence; the current one, from 1983, is the longest-lasting in its history.' },

  /* ═════════════════════════════════════════════════════════
     GASTRONOMÍA
     ═════════════════════════════════════════════════════════ */

  // FÁCIL — nuevas, básicas y comerciales (ver marcador de inserción más abajo)
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is the most traditional filling for Salvadoran pupusas?', opciones: ['Chocolate', 'Chicken with curry', 'Tuna', 'Cheese with beans'], correcta: 3, explicacion: 'Pupusas are traditionally filled with fresh cheese and refried beans. This combination is the most popular and authentic in El Salvador.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is curtido in Salvadoran cuisine?', opciones: ['A chocolate dessert', 'A salad of pickled cabbage and carrots', 'A cold beverage', 'A type of sweet'], correcta: 1, explicacion: 'Curtido is a typical Salvadoran side dish made of cabbage and carrots pickled in vinegar. It is served especially with pupusas.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is the traditional Salvadoran beverage made from corn?', opciones: ['Atol', 'Wine', 'Lemonade', 'Beer'], correcta: 0, explicacion: 'Atol is a thick, hot beverage made from fresh corn. It is very popular in El Salvador, especially at breakfast and in the afternoons.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'On what instrument are pupusas traditionally cooked?', opciones: ['Microwave', 'Comal', 'Oven', 'Grill'], correcta: 1, explicacion: 'Pupusas are cooked on a comal, which is a flat griddle traditionally made of clay or metal used in Central America.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is Salvadoran horchata?', opciones: ['A type of bread', 'A meat dish', 'A frozen dessert', 'A beverage made with rice and cinnamon'], correcta: 3, explicacion: 'Horchata is a refreshing beverage made from ground rice, almonds, and cinnamon. It is served cold and is very popular in El Salvador.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is the main dough for a pupusa?', opciones: ['Yuca dough', 'Potato dough', 'Corn dough', 'Wheat dough'], correcta: 2, explicacion: 'Pupusas are made with corn dough, similar to the dough used to make tortillas.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What typical Salvadoran beverage is made with tamarind?', opciones: ['Tamarind refreshment', 'Barley water', 'Orange juice', 'Banana smoothie'], correcta: 0, explicacion: 'Tamarind refreshment is a very popular refreshing beverage in El Salvador, made from tamarind pulp with water and sugar.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is a typical side dish for pupusas besides curtido?', opciones: ['Mayonnaise', 'Tomato sauce', 'Mustard', 'Ketchup'], correcta: 1, explicacion: 'Tomato sauce is a traditional condiment served with curtido when eating Salvadoran pupusas.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is "chicharrón" in Salvadoran cuisine?', opciones: ['Ground meat', 'Roasted chicken', 'Salted fish', 'Fried pork meat'], correcta: 3, explicacion: 'Chicharrón is fried, crispy pork meat, a common filling in pupusas and other Salvadoran dishes.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'Which of these dishes is typical of a Salvadoran breakfast?', opciones: ['Seafood tacos', 'Pupusas', 'Sushi', 'Pizza'], correcta: 1, explicacion: 'Pupusas are a very typical breakfast in El Salvador. They are served with curtido, sauce, and a hot beverage like atol or coffee.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What hot beverage is very popular in El Salvador in the afternoons?', opciones: ['Atol shuco', 'Cold milk', 'Cold coffee', 'Chamomile tea'], correcta: 0, explicacion: 'Atol shuco is a thick, hot beverage prepared with corn dough. It is typical of Salvadoran afternoons, especially at pupuserías.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is the name of the typical Salvadoran soup with chicken and corn?', opciones: ['Pozole', 'Gumbo', 'Chicken soup with corn', 'Beef broth'], correcta: 2, explicacion: 'Chicken soup with corn is a traditional Salvadoran broth very consumed, especially at breakfast and as comfort food.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What pickled vegetable side dish is essential with pupusas?', opciones: ['Pico de gallo', 'Guacamole', 'Purple onion', 'Curtido'], correcta: 3, explicacion: 'Curtido is the most important side dish with pupusas. It is made of cabbage, carrots, and other vegetables pickled in vinegar.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is a typical Salvadoran dish made with filled corn dough?', opciones: ['Enchilada', 'Pupusa', 'Arepa', 'Tamale'], correcta: 1, explicacion: 'The pupusa is the national dish of El Salvador, made with corn dough filled with cheese, beans, chicharrón, or other options.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What traditional Salvadoran beverage is made with rice flour and spices?', opciones: ['Horchata', 'Fresh water beverages', 'Lemonade', 'Iced tea'], correcta: 0, explicacion: 'Horchata is a beverage made with rice flour, almonds, milk, and cinnamon. It is very refreshing and popular in El Salvador.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is the most representative and popular beverage of El Salvador?', opciones: ['Coffee', 'Atol', 'Horchata', 'Pulque'], correcta: 1, explicacion: 'Atol is the most traditional and representative beverage of El Salvador. It is consumed especially at breakfast and in the afternoons, in multiple varieties.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is "fried yuca" in Salvadoran cuisine?', opciones: ['A chocolate dessert', 'A sweet beverage', 'A type of soup', 'Yuca root cut and fried'], correcta: 3, explicacion: 'Fried yuca is the yuca root (also called cassava) cut into strips and fried. It is a common side dish with Salvadoran meals.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is a typical Salvadoran street food dish similar to a pupusa?', opciones: ['Quesadilla', 'Pastelito (fried meat turnover)', 'Burrito', 'Elote loco'], correcta: 1, explicacion: 'The Salvadoran pastelito is a turnover made of corn or wheat dough filled with seasoned ground meat and fried until crispy. It is a very popular street snack, similar in concept to the pupusa.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What Salvadoran traditional beverage is thick, sweet, and served hot?', opciones: ['Soft drink', 'Rice water', 'Atol', 'Lemon tea'], correcta: 2, explicacion: 'Atol is a thick, sweet, hot beverage very popular in El Salvador. It is prepared with corn dough and served especially at breakfast and in the afternoons.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is the main ingredient in pupusa dough?', opciones: ['Potato starch', 'Wheat flour', 'Corn flour', 'Rice flour'], correcta: 2, explicacion: 'Pupusa dough is made with corn flour (prepared corn dough), which is similar to the dough used to make tortillas.' },

  // MEDIO (21)
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What is the national dish of El Salvador?', opciones: ['Baleadas', 'Pupusas', 'Sopa de Pata', 'Tamales'], correcta: 1, explicacion: 'Pupusas are the national dish, declared Intangible Cultural Heritage.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: "What is always served with pupusas?", opciones: ["With rice and fried beans", "With curtido and tomato sauce", "With cream and fresh cheese", "With chimol and mashed beans"], correcta: 1, explicacion: "Pupusas are always served with curtido and homemade tomato sauce." },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What are rice pupusas made of?', opciones: ['Wheat flour', 'Ground rice masa', 'Yellow corn flour', 'Yuca masa'], correcta: 1, explicacion: 'Rice pupusas are made with ground rice masa.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: "What is the most popular traditional filling for pupusas?", opciones: ["Only grated hard cheese", "Cheese with fresh loroco", "Only refried mashed beans", "Shrimp with vegetables"], correcta: 1, explicacion: "Cheese and loroco filling is the most popular and traditional in El Salvador." },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What is loroco?', opciones: ['A fruit', 'An edible flower', 'A type of bean', 'An aromatic herb'], correcta: 1, explicacion: 'Loroco is an edible flower native to Central America, widely used in Salvadoran cuisine.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: "What traditional drink is made with corn in El Salvador?", opciones: ["Sweet chamomile herbal tea", "Atol served steaming hot", "Oat water with cinnamon", "Sugar cane juice with lime"], correcta: 1, explicacion: "Atol is a traditional drink made from ground corn, very popular at breakfast." },
  { cat: 'gastronomia', nivel: 'medio', pregunta: "What are the most typical tamales in El Salvador?", opciones: ["Sweet tamales with raisins", "Chicken and green tamales", "Stuffed chili pepper tamales", "Cheese and cream tamales"], correcta: 1, explicacion: "Chicken and green (corn) tamales are the most typical of Salvadoran cuisine." },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What is an arepa?', opciones: ['A dessert', 'A fried corn bread', 'A type of soup', 'A drink'], correcta: 1, explicacion: 'The arepa is a round, fried corn masa bread, very common in El Salvador.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: "What is the most typical dessert for festivities in El Salvador?", opciones: ["Homemade caramel flan", "Rice pudding with cinnamon", "Salvadoran quesadilla", "Homemade sorbet ice cream"], correcta: 2, explicacion: "The Salvadoran quesadilla (cheese and ayote) is a special traditional dessert for festivities." },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'In which month is National Pupusa Day celebrated?', opciones: ['October', 'November', 'December', 'January'], correcta: 1, explicacion: 'National Pupusa Day is celebrated on the second Sunday of November since 2005.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What basic ingredient is essential in a pupusa?', opciones: ['Cheese', 'Beans', 'Corn masa', 'Loroco'], correcta: 2, explicacion: 'Corn masa is the fundamental ingredient of every Salvadoran pupusa.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: "Where does the pupusa recipe originally come from?", opciones: ["Mayan communities in Mexico", "Indigenous Pipil peoples", "Mayan villages in Guatemala", "Creole towns of Nicaragua"], correcta: 1, explicacion: "Pupusas have roots in the gastronomy of the indigenous peoples of El Salvador." },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What is chimol?', opciones: ['A tomato sauce', 'A corn seasoning', 'A drink', 'A vegetable'], correcta: 0, explicacion: 'Chimol is a sauce made with tomato, onion, chili and other Salvadoran spices.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What is the most popular soup in El Salvador?', opciones: ['Chicken soup', 'Seafood soup', 'Sopa de Pata', 'Shrimp broth'], correcta: 2, explicacion: 'Sopa de Pata is a very popular traditional soup, especially at celebrations and weekends.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What is typically served with Sopa de Pata?', opciones: ['Thin tortillas', 'Corn bread', 'Fried plantain', 'Oatmeal'], correcta: 0, explicacion: 'Sopa de Pata is traditionally served with thin corn tortillas and cream.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What is the prepared plantain that is a common side dish?', opciones: ['Raw plantain', 'Fried plantain', 'Boiled plantain', 'Roasted plantain'], correcta: 1, explicacion: 'Fried plantain is a classic side dish in Salvadoran food, especially at breakfast.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: "What is the typical drink made with toasted corn?", opciones: ["Cold sweetened pozol drink", "Chilled barley water drink", "Corn coffee with cinnamon", "Atol de elote with milk"], correcta: 0, explicacion: "Pozol is a traditional drink made with corn and other ingredients, very popular in summer." },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What does "pupusa" mean etymologically?', opciones: ['Stuffed food', 'Something swollen or puffed up', 'Baked food', 'Fast food'], correcta: 1, explicacion: 'Pupusa comes from the Nahuat word "pupushawa", meaning "something swollen or puffed up", describing its round, plump shape.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'Which Salvadoran town is popularly known as the "birthplace of the pupusa"?', opciones: ['Olocuilta, in the department of La Paz', 'Izalco, in the department of Sonsonate', 'Suchitoto, in the department of Cuscatlán', 'Chalchuapa, in the department of Santa Ana'], correcta: 0, explicacion: 'Olocuilta, in the department of La Paz (central region), is popularly known as the "birthplace of the pupusa" and is famous for its rice pupusas.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: "What type of corn is traditionally used to make pupusas?", opciones: ["Imported yellow field corn", "Ground white criollo corn", "Toasted popcorn kernels", "Sweet corn for export"], correcta: 1, explicacion: "White criollo corn is used, ground into fresh masa to prepare authentic pupusas." },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What drink is commonly served at breakfast with atol?', opciones: ['American coffee', 'Black coffee', 'Horchata', 'Evaporated milk'], correcta: 1, explicacion: 'Black coffee is the traditional drink that accompanies atol in Salvadoran breakfasts.' },

  // DIFÍCIL (20)
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "What variants of stuffed pupusas exist in El Salvador?", opciones: ["Only two types: plain cheese and beans", "Cheese, beans, loroco and chicharrón", "Only cheese, with no other fillings", "Only vegetables and local wild herbs"], correcta: 1, explicacion: "There are multiple varieties with different fillings depending on the region and creativity." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "What is the correct preparation of curtido?", opciones: ["Raw shredded cabbage with plain salt", "Fermented cabbage with vinegar, chili", "Cabbage steamed with melted butter", "Cabbage pickled in water with sugar"], correcta: 1, explicacion: "Curtido is fermented cabbage with carrot, onion, chili and vinegar in a pickling process." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "What cooking method is used to make authentic pupusas?", opciones: ["Wood-fired clay oven", "Hot comal or griddle", "Deep pan with hot oil", "Covered clay cooking pot"], correcta: 1, explicacion: "Pupusas are cooked on a clay/metal comal or griddle over medium heat until golden." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "What is the correct consistency of pupusa masa?", opciones: ["Very soft and sticky", "Firm but moldable", "Very hard and crumbly", "Very wet and runny"], correcta: 1, explicacion: "The masa should be firm and moldable, neither too soft nor too hard, to fill it correctly." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "What is known as \"pupusa revuelta\"?", opciones: ["Pupusa made without any filling", "Pupusa with a mix of fillings", "Pupusa that breaks on the comal", "Small pupusa of half a portion"], correcta: 1, explicacion: "Pupusa revuelta contains a mix of fillings such as cheese, beans and chicharrón." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "What role does yuca play in Salvadoran cuisine?", opciones: ["Only a dried spice for soups", "Side dish and base for desserts", "Fermented drink for festivals", "Rarely used in home cooking"], correcta: 1, explicacion: "Yuca is a versatile food, used as a fried side dish or in various preparations." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "What is the difference between pan de yuca and pupusa?", opciones: ["None, they are the same food item", "Pan de yuca uses yuca; pupusa, corn", "Pan de yuca is bigger and thicker", "Same preparation, different name"], correcta: 1, explicacion: "Pan de yuca is made with grated yuca flour while pupusa uses ground corn masa." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "What is the Salvadoran \"enchilada\", unlike the rolled Mexican enchilada?", opciones: ["A flat fried tortilla topped with ground beef, curtido and sauce", "A rolled tortilla filled with meat", "A thick soup made from broken-up tortilla", "A tamale wrapped in a plantain leaf"], correcta: 0, explicacion: "The Salvadoran enchilada is a flat, fried tortilla (tostada) topped with ground beef, curtido, tomato sauce, cheese and sometimes hard-boiled egg — not rolled like the Mexican version." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "What makes the pupusa different from dishes like tamales or panes con pollo, which are more tied to special occasions?", opciones: ["It is only made once a year", "It is an everyday food, not just for parties", "It is never eaten at family gatherings", "It is a recent invention from the year 2000"], correcta: 1, explicacion: "Unlike dishes such as tamales or panes con pollo, which are more tied to special occasions, the pupusa is above all an everyday food in El Salvador, though it is also enjoyed at gatherings and celebrations." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'How are tortillas traditionally made in El Salvador?', opciones: ['With a manual wooden press', 'By hand, patting the masa, then cooked on a comal', 'With a kitchen rolling pin', 'In an industrial mill'], correcta: 1, explicacion: 'Just like pupusas, Salvadoran tortillas are traditionally made by hand, patting the corn masa between the palms, and cooked on a hot comal or griddle.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'What is the essential dish at a Salvadoran Christmas dinner, made of shredded turkey served on French bread?', opciones: ['Sopa de gallina india', 'Pan con pavo (turkey sandwich)', 'Pupusas revueltas', 'Salvadoran enchiladas'], correcta: 1, explicacion: 'Pan con pavo, also called pan con chumpe, is the essential traditional dish at Salvadoran Christmas Eve dinner: shredded turkey bathed in its own juice, served on French bread.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "What is the use of piloncillo in Salvadoran cooking?", opciones: ["Only as a hot spiced drink", "Sweetener and dessert base", "Rarely used nowadays at home", "Only for sweetening coffee"], correcta: 1, explicacion: "Piloncillo is a versatile natural sweetener, used in drinks, desserts and savory foods." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "What are the basic ingredients of atol?", opciones: ["Wheat flour, cold water and salt", "Ground corn, milk, sugar, cinnamon", "Only ground corn and boiled water", "Rice, milk and vanilla essence"], correcta: 1, explicacion: "Atol is made with ground corn, milk (or water), sugar and flavored with cinnamon." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "Which atol variant is typical for strained breakfasts?", opciones: ["Sweet young elote atol", "White atol or corn atol", "Very ripe plantain atol", "Atol of ground red beans"], correcta: 1, explicacion: "White atol is the most common for breakfast, made with strained white corn." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'How long is curtido left to ferment?', opciones: ['It is not fermented', 'Minimum 2-3 hours', 'All night', 'One week'], correcta: 1, explicacion: 'Curtido typically ferments for 2-3 hours or more to develop its characteristic flavor.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "What is the function of loroco in Salvadoran cuisine?", opciones: ["Only a green garnish on the plate", "Unique floral flavor in pupusas", "Medicinal use for stomach aches", "Thick filling with no taste or aroma"], correcta: 1, explicacion: "Loroco provides a unique, floral flavor that is distinctive in Salvadoran cooking." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "What is the texture difference between pan de yuca and pupusa?", opciones: ["None, both textures are identical", "Pan de yuca is crispy; pupusa, soft", "The pupusa is crispy and brittle", "Both have the same soft texture"], correcta: 1, explicacion: "Pan de yuca is crispier and more porous, while pupusa is soft and dense." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "What is the typical drink with cacao in El Salvador?", opciones: ["Black coffee with sugar", "Salvadoran chocolate", "Cold cacao smoothie", "Sweet vanilla water"], correcta: 1, explicacion: "Salvadoran chocolate, made with locally ground cacao, is a special traditional drink." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "What factor determines the authenticity of a pupusa?", opciones: ["Only the size and weight of the pupusa", "Fresh ingredients and traditional recipe", "The type of griddle or hot comal used", "The exact amount of filling it holds"], correcta: 1, explicacion: "Authenticity comes from using fresh ingredients and respecting the traditional recipe passed down." },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: "In what year did El Salvador's Legislative Assembly declare the pupusa a National Dish and Cultural Heritage of El Salvador?", opciones: ["2005", "2015", "2023", "1997"], correcta: 0, explicacion: "In 2005, the Legislative Assembly declared the pupusa a National Dish and Cultural Heritage of El Salvador, and created National Pupusa Day (second Sunday of November). This is a Salvadoran national recognition; the pupusa is not on UNESCO's Representative List of the Intangible Cultural Heritage of Humanity." },

  // GUANACO (19)
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "What traditional dessert of ayote (squash) cooked in panela syrup is prepared in El Salvador for the Día de los Difuntos (November 2)?", opciones: ["Ayote en miel", "Yuca nuégados", "Torrejas", "Rice pudding"], correcta: 0, explicacion: "Ayote en miel (squash cooked with panela and cinnamon) is a traditional sweet associated with the Día de los Difuntos in El Salvador." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "What is the name of the hard-crusted savory bread traditionally used to make panes con pollo?", opciones: ["Baguette", "Birote", "Semita", "Torta"], correcta: 1, explicacion: "Birote is a hard-crusted savory bread traditionally used to make filled sandwiches like panes con pollo." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "Which department is home to marquesote, a sweet sponge cake traditionally wrapped in a banana leaf?", opciones: ["Ahuachapán", "Morazán", "Usulután", "La Unión"], correcta: 0, explicacion: "Marquesote, a spongy baked cake wrapped in a banana leaf, is a baking tradition native to Ahuachapán." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "What is the main ingredient of traditional Salvadoran nuégados?", opciones: ["Sweet potato", "Yuca", "Ripe plantain", "Potato"], correcta: 1, explicacion: "Salvadoran nuégados are made by frying pieces of yuca and bathing them in panela syrup." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What is the popular Salvadoran name for shaved ice topped with colorful syrups, sold in parks and outside schools?', opciones: ['Raspado', 'Minuta', 'Granizado', 'Chamoyada'], correcta: 1, explicacion: 'In El Salvador this shaved-ice dessert with syrup is popularly known as "minuta".' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "What type of flour was used pre-Hispanically for pupusas or similar foods?", opciones: ["Wheat flour brought by the Spanish", "Nixtamalized corn ground on a metate", "Barley flour toasted on the griddle", "Yuca masa grated and pressed dry"], correcta: 1, explicacion: "Indigenous peoples used stones (metates) to grind nixtamalized corn into fresh masa." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "Which part of the loroco plant is harvested and eaten?", opciones: ["The underground roots", "The still-closed flower buds", "The ripe seeds", "The bark of the stem"], correcta: 1, explicacion: "What is harvested from loroco are the flower buds, the still-closed flower, picked by hand before they open." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "What dish made of ground dried shrimp and egg is traditionally prepared during Lent and Holy Week, when red meat is avoided?", opciones: ["Shrimp ceviche", "Torta de camarón", "Shrimp soup", "Garlic shrimp"], correcta: 1, explicacion: "Torta de camarón, made with ground dried shrimp and egg, is a traditional dish for Lent and Holy Week in El Salvador." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "What is the nixtamalization process and its importance?", opciones: ["Simple cooking in boiling water", "Lime cooking that releases niacin", "Corn fermentation with added yeast", "Sun drying over several long days"], correcta: 1, explicacion: "Nixtamalization (cooking in calcium hydroxide) makes corn more nutritious and digestible." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "Which loroco variety is specifically Salvadoran?", opciones: ["Purple loroco (Echites floribunda)", "Salvadoran loroco (Fernaldia pandurata)", "Red loroco (Mandevilla salvadorensis)", "Golden loroco (Fernaldia guatemalteca)"], correcta: 1, explicacion: "Fernaldia pandurata is the native and distinctive loroco species of El Salvador and Central America." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "What is the \"tamal pisque\", a traditional Salvadoran variant, made of?", opciones: ["Bean masa, with no meat filling", "Sweet corn with cinnamon", "Rice with shredded chicken", "Mashed ripe plantain"], correcta: 0, explicacion: "The tamal pisque is made with bean masa (not corn masa) and usually has no meat filling, making it a distinct traditional variant of the tamale." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'In which Salvadoran town is the traditional Loroco Festival held every year?', opciones: ['San Lorenzo, Ahuachapán', 'Santa Rosa de Lima, La Unión', 'Ilobasco, Cabañas', 'La Palma, Chalatenango'], correcta: 0, explicacion: 'San Lorenzo, in the department of Ahuachapán, holds the annual Loroco Festival, as it is one of the crop\'s main growing areas.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "Which coffee variety, developed in El Salvador in 1958, is internationally known for its large bean size?", opciones: ["Red Bourbon", "Pacamara", "Typica Arabica", "Robusta"], correcta: 1, explicacion: "Pacamara is a coffee variety developed in El Salvador in 1958, a cross between Pacas and Maragogipe, prized worldwide for its bean size and cup quality." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What is the difference between atol de elote and atol shuco?', opciones: ['Atol de elote is made from sweet young corn; atol shuco is fermented and sour', 'They are exactly the same drink with a different name', 'Atol shuco is made only with rice', 'Atol de elote is made with pork'], correcta: 0, explicacion: 'Atol de elote is made from young sweet corn, while atol shuco is a fermented, sour variant traditional to eastern El Salvador.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "What ingredient gives Salvadoran quesadilla (a sweet rice cake, not the Mexican dish) its salty touch within its sweet batter?", opciones: ["Fried bacon", "Grated hard cheese", "Chopped olive", "Sea salt"], correcta: 1, explicacion: "Salvadoran quesadilla combines the sweetness of its rice batter with the salty flavor of the grated hard cheese mixed into it." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "Unlike Mexican horchata (made from rice), what seed is traditional Salvadoran horchata made from?", opciones: ["Morro (jícaro) seed", "Soaked white rice", "Cashew seed", "Ground almond"], correcta: 0, explicacion: "Traditional Salvadoran horchata is made from toasted, ground morro (jícaro) seeds mixed with spices, unlike Mexican horchata, which is made from rice." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "In which town on the Ruta de las Flores is the famous weekend Food Festival held?", opciones: ["Concepción de Ataco", "Juayúa", "Nahuizalco", "Apaneca"], correcta: 1, explicacion: "Juayúa is known for its weekend Food Festival, offering typical dishes such as rabbit, iguana and seafood." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "Besides coffee, what is another major agricultural export product of El Salvador?", opciones: ["Amazonian cacao", "Cane sugar", "Basmati rice", "Olive oil"], correcta: 1, explicacion: "Cane sugar is, alongside coffee, one of El Salvador's main agricultural export products." },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: "What is the cold drink made of chopped fruit in syrup, widely sold at Salvadoran patron saint festivals, called?", opciones: ["Fruit refresco", "Ensalada", "Tropical batido", "Fruit cocktail"], correcta: 1, explicacion: "In El Salvador, 'ensalada' is a cold drink made of chopped fruit (pineapple, papaya, watermelon) in syrup, very popular at fairs and patron saint festivals." },

  /* ═════════════════════════════════════════════════════════
     SITIOS
     ═════════════════════════════════════════════════════════ */

  // FÁCIL — nuevas, básicas y comerciales (ver marcador de inserción más abajo)
  { cat: 'sitios', nivel: 'facil', pregunta: 'What is the capital of El Salvador?', opciones: ['La Libertad', 'Santa Ana', 'San Salvador', 'San Miguel'], correcta: 2, explicacion: 'San Salvador is the capital and largest city of El Salvador, located in the center of the country.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'What is the most famous beach in El Salvador for surfers?', opciones: ['Playa El Cuco', 'Playa Las Flores', 'El Tunco', 'El Sunzal'], correcta: 2, explicacion: 'El Tunco is the most famous surf beach in El Salvador, known worldwide as a popular destination for surfers and backpackers.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'Where is the Monument to the Divine Savior of the World located?', opciones: ['Sonsonate', 'Apopa', 'San Salvador', 'Santa Ana'], correcta: 2, explicacion: 'The Monument to the Divine Savior of the World is located in San Salvador and is an iconic symbol that represents El Salvador to the world.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'What is the rock formation with panoramic views located south of San Salvador?', opciones: ['Puerta del Diablo', 'Cerro Verde', 'Volcán Izalco', 'El Boquerón'], correcta: 0, explicacion: 'Puerta del Diablo (Devil\'s Door) is a natural rock formation over 1,100 meters high that offers panoramic views of Lake Ilopango, volcanoes, and the Pacific Ocean.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'What is the official currency of El Salvador?', opciones: ['U.S. Dollar', 'Quetzal', 'Mexican Peso', 'Salvadoran Colón'], correcta: 0, explicacion: 'El Salvador officially adopted the U.S. Dollar as its currency in 2001, replacing the Salvadoran Colón.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'What is the volcano known as the "Lighthouse of the Pacific"?', opciones: ['Volcán San Vicente', 'Volcán Cerro Verde', 'Volcán Santa Ana', 'Volcán Izalco'], correcta: 3, explicacion: 'Volcán Izalco is known as the "Lighthouse of the Pacific" because its constant historical eruptions served as a reference point for sailors in the ocean.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'What is the largest lake in El Salvador?', opciones: ['Lake Güija', 'Lake Ilopango', 'Lake Coatepeque', 'Laguna Verde'], correcta: 1, explicacion: 'Lake Ilopango is the largest lake in El Salvador, located in the center of the country with an area of approximately 72 square kilometers.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'Which two countries are neighbors to El Salvador?', opciones: ['Honduras and Nicaragua', 'Guatemala and Belize', 'Guatemala and Honduras', 'Costa Rica and Belize'], correcta: 2, explicacion: 'Guatemala borders El Salvador to the west and Honduras borders to the east. The country also has coasts on the Pacific Ocean and the Gulf of Fonseca.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'What is Santa Ana volcano, the highest in El Salvador, also known as?', opciones: ['Ilamatepec', 'Chaparrastique', 'Quezaltepec', 'Cuscatlán'], correcta: 0, explicacion: 'Santa Ana volcano is also known as Ilamatepec, a name of Náhuat origin, and it is the highest volcano in El Salvador at 2,381 meters above sea level.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'Which volcano is located within a crater near San Salvador?', opciones: ['Volcán Santa Ana', 'Volcán Izalco', 'Volcán San Vicente', 'Volcán El Boquerón'], correcta: 3, explicacion: 'El Boquerón is a volcanic crater of the San Salvador Volcano, located just 23 kilometers from the center of the capital, now protected as a National Park.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'What is the famous tourist route in El Salvador\'s highlands?', opciones: ['Coastal Route', 'Central American Route', 'Flower Route', 'Towns Route'], correcta: 2, explicacion: 'The Ruta de las Flores (Flower Route) is a 35-kilometer tourist route in western El Salvador\'s highlands, famous for its colonial towns, wildflowers (especially November to February), and coffee culture.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'In which department is Playa El Cuco located?', opciones: ['San Miguel', 'Cabañas', 'La Libertad', 'Sonsonate'], correcta: 0, explicacion: 'Playa El Cuco is located in the San Miguel department on El Salvador\'s southeast coast, known for its black sand and surf culture.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'How many administrative departments does El Salvador have?', opciones: ['16', '14', '18', '12'], correcta: 1, explicacion: 'El Salvador is divided into 14 administrative departments, which are the country\'s main political divisions.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'What is the largest national park in El Salvador?', opciones: ['Cerro Verde', 'Los Volcanes', 'El Imposible', 'Montecristo'], correcta: 2, explicacion: 'Parque Nacional El Imposible is the largest national park in El Salvador, located in the western region in the Ahuachapán department.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'What is the most distinctive characteristic of the sand at Playa El Cuco?', opciones: ['Fine white sand', 'Gray sand', 'Golden sand', 'Black sand'], correcta: 3, explicacion: 'Playa El Cuco is famous for its black sand, formed from ground volcanic rock, which gives the beach its distinctive dark color.' },

  // MEDIO (15)
  { cat: 'sitios', nivel: 'medio', pregunta: 'In which department is the Joya de Cerén archaeological site located?', opciones: ['La Libertad', 'Santa Ana', 'San Vicente', 'Cuscatlán'], correcta: 0, explicacion: 'Joya de Cerén is in the municipality of San Juan Opico, La Libertad department.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'What is Joya de Cerén popularly known as due to its extraordinary state of preservation?', opciones: ['The Pompeii of the Americas', 'The Salvadoran Machu Picchu', 'The Atlantis of Central America', 'The Salvadoran Petén'], correcta: 0, explicacion: 'It is called "the Pompeii of the Americas" because, like the Italian city, it was buried under volcanic ash that preserved everyday life.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'The Tazumal archaeological site is located in the municipality of Chalchuapa, in the department of:', opciones: ['Santa Ana', 'Sonsonate', 'Ahuachapán', 'La Unión'], correcta: 0, explicacion: 'Tazumal is in Chalchuapa, Santa Ana department, about 80 km west of San Salvador.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'Which colonial town is recognized for its architecture, cobblestone streets, and indigo tradition?', opciones: ['Suchitoto', 'Ilobasco', 'Nahuizalco', 'Berlín'], correcta: 0, explicacion: 'Suchitoto, in Cuscatlán department, is famous for its colonial architecture, Lake Suchitlán, and its history linked to indigo cultivation.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'The rock formation known as Puerta del Diablo is located in Los Planes de Renderos, near:', opciones: ['Panchimalco', 'Concepción de Ataco', 'Juayúa', 'Perquín'], correcta: 0, explicacion: 'Puerta del Diablo is a natural viewpoint located in Los Planes de Renderos, very close to the town of Panchimalco.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'The Ruta de las Flores crosses towns in the departments of Sonsonate and:', opciones: ['Ahuachapán', 'Morazán', 'Usulután', 'La Unión'], correcta: 0, explicacion: 'Ruta de las Flores runs through towns such as Nahuizalco, Juayúa and Apaneca in Sonsonate, and Concepción de Ataco and Tacuba in Ahuachapán.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'The Catedral Metropolitana of San Salvador is famous for the mosaic façade created by the artist:', opciones: ['Fernando Llort', 'Salarrué', 'Roque Dalton', 'Claudia Lars'], correcta: 0, explicacion: 'The colorful mosaic on the Cathedral\'s façade was designed by renowned Salvadoran artist Fernando Llort.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'El Boquerón National Park corresponds to the crater of which volcano?', opciones: ['San Salvador Volcano', 'Izalco Volcano', 'San Vicente Volcano', 'Santa Ana Volcano'], correcta: 0, explicacion: 'El Boquerón is the crater of the San Salvador volcano, turned into a national park.' },
  { cat: 'sitios', nivel: 'medio', pregunta: "What is the museum in San Salvador dedicated to the country's archaeology and anthropology called?", opciones: ["National Museum of Anthropology", "The El Salvador Museum of Art", "Museum of the Word and Image", "Tin Marín Children's Museum"], correcta: 0, explicacion: "The MUNA (National Museum of Anthropology David J. Guzmán) safeguards archaeological and ethnographic pieces of the country." },
  { cat: 'sitios', nivel: 'medio', pregunta: "The town of Concepción de Ataco, on the Ruta de las Flores, is especially known for:", opciones: ["Its colorful murals on the facades", "Its extensive black sand beaches", "Its production of painted ceramics", "Its large annual costume carnival"], correcta: 0, explicacion: "Concepción de Ataco stands out for the artistic murals that decorate the facades of its streets." },
  { cat: 'sitios', nivel: 'medio', pregunta: 'The remains of whom rest in the Catedral Metropolitana of San Salvador?', opciones: ['Monsignor Óscar Arnulfo Romero', 'President José Matías Delgado', 'General Maximiliano Hernández Martínez', 'Poet Francisco Gavidia'], correcta: 0, explicacion: 'The crypt of the Catedral Metropolitana holds the tomb of Monsignor Óscar Arnulfo Romero.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'The Teatro Nacional of San Salvador is recognized as:', opciones: ['The oldest theater in Central America', 'The largest theater in Latin America', 'An old colonial fortress', 'A replica of the Colón Theater'], correcta: 0, explicacion: 'The Teatro Nacional of San Salvador is considered the oldest theater in Central America.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'What type of site is Joya de Cerén, according to archaeologists?', opciones: ['A Mayan agricultural village', 'A royal palace', 'A military fortress', 'An Aztec ceremonial center'], correcta: 0, explicacion: 'Joya de Cerén was a Mayan agricultural village from the Classic period, tributary to the political center of San Andrés.' },
  { cat: 'sitios', nivel: 'medio', pregunta: "Panchimalco, near San Salvador, is famous for its festival called:", opciones: ["Festival of Flowers and Palms", "Festival of Indigo and Crafts", "Carnival of San Miguel Arcángel", "Grand Fair of Peace and Harvest"], correcta: 0, explicacion: "Panchimalco celebrates every year the traditional Festival of Flowers and Palms, of indigenous origin." },
  { cat: 'sitios', nivel: 'medio', pregunta: 'The Tazumal archaeological site is part of a broader archaeological zone that also includes:', opciones: ['Casa Blanca and El Trapiche', 'Copán and Tikal', 'Joya de Cerén and San Andrés', 'Cihuatán and Quelepa'], correcta: 0, explicacion: 'The Chalchuapa archaeological zone groups Tazumal together with other sites such as Casa Blanca and El Trapiche.' },

  // DIFÍCIL (15)
  { cat: 'sitios', nivel: 'dificil', pregunta: 'In what year was Joya de Cerén declared a UNESCO World Heritage Site?', opciones: ['1993', '1985', '2001', '1976'], correcta: 0, explicacion: 'Joya de Cerén was declared a UNESCO World Heritage Site in 1993.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'In what year were the structures of Joya de Cerén discovered?', opciones: ['1976', '1960', '1993', '1950'], correcta: 0, explicacion: 'It was discovered accidentally in 1976 while preparing the land to build grain silos.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'Which volcano buried the village of Joya de Cerén under its ash about 1,400 years ago?', opciones: ['Loma Caldera Volcano', 'Izalco Volcano', 'San Miguel Volcano', 'Chaparrastique Volcano'], correcta: 0, explicacion: 'The eruption of the Loma Caldera volcano, around 600 AD, buried the village under several layers of ash.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'Which American archaeologist led the first scientific investigations at Joya de Cerén?', opciones: ['Payson Sheets', 'Stanley Boggs', 'John Longyear', 'William Fash'], correcta: 0, explicacion: 'Dr. Payson Sheets from the University of Colorado in Boulder directed the first investigations between 1978 and 1980.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'The main pyramid of the Tazumal site reaches an approximate height of:', opciones: ['24 meters', '10 meters', '40 meters', '60 meters'], correcta: 0, explicacion: 'Structure 1 of Tazumal, the largest at the site, reaches about 24 meters in height.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'Which archaeologist carried out the first formal excavations at Tazumal, starting in 1940?', opciones: ['Stanley Boggs', 'Payson Sheets', 'Santiago Barberena', 'David Guzmán'], correcta: 0, explicacion: 'Stanley Boggs began formal investigations at Tazumal in 1940, identifying 13 structures.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: "According to specialists, the name \"Tazumal\" approximately means:", opciones: ["Place where souls are consumed", "Place of the most prized jewels", "Valley of the flowers of dawn", "City of the gods of the rain"], correcta: 0, explicacion: "In the Nahua-Quiché language, \"Tazumal\" is roughly translated as \"place where souls are consumed\"." },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'Who discovered the stela known as "La Virgen de Tazumal" in 1892?', opciones: ['Santiago Barberena', 'Stanley Boggs', 'Payson Sheets', 'Jorge Lardé'], correcta: 0, explicacion: 'Historian Santiago Barberena found this stela in 1892 and moved it to the National Museum.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'The San Andrés archaeological site, an ancient Mayan political center, is located in the valley of:', opciones: ['Zapotitán', 'Jiboa', 'Sensunapán', 'Lempa'], correcta: 0, explicacion: 'San Andrés is located in the Zapotitán valley, La Libertad department, and dominated the region during the Late Classic period.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'To which archaeological site was the agricultural village of Joya de Cerén tributary?', opciones: ['San Andrés', 'Tazumal', 'Cihuatán', 'Casa Blanca'], correcta: 0, explicacion: 'Joya de Cerén was a tributary village of the political center of San Andrés, which dominated the Zapotitán valley.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'In which department is the colonial town of Suchitoto located?', opciones: ['Cuscatlán', 'La Paz', 'Chalatenango', 'San Vicente'], correcta: 0, explicacion: 'Suchitoto belongs to the Cuscatlán department.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'Near which lake is Suchitoto located?', opciones: ['Lake Suchitlán', 'Lake Coatepeque', 'Lake Ilopango', 'Alegría Lagoon'], correcta: 0, explicacion: 'Suchitoto is on the shores of the reservoir known as Lake Suchitlán.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'The monolith known as "La Piedra de las Victorias", found at Tazumal, shows a clear influence of the culture:', opciones: ['Olmec', 'Aztec', 'Inca', 'Classic Maya'], correcta: 0, explicacion: 'This monolith with petroglyphs on its four sides features a typically Olmec style.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: "What was the purpose of the earthworks that led to the accidental discovery of Joya de Cerén?", opciones: ["Building silos to store grain", "Building a new dirt access road", "Expanding the community cemetery", "Clearing land to plant coffee"], correcta: 0, explicacion: "A tractor was leveling land to build grain silos when it revealed the first structures of the site." },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'The Chalchuapa archaeological zone, where Tazumal is located, covers an approximate area of:', opciones: ['10 km²', '1 km²', '50 km²', '100 km²'], correcta: 0, explicacion: 'The Chalchuapa archaeological zone covers approximately 10 km², with several sites besides Tazumal.' },

  // GUANACO (15)
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'On what exact date was Joya de Cerén declared a World Heritage Site?', opciones: ['December 11, 1993', 'May 5, 1993', 'June 19, 1993', 'November 27, 1989'], correcta: 0, explicacion: 'UNESCO declared Joya de Cerén a World Heritage Site on December 11, 1993.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: "To which university did archaeologist Payson Sheets belong, who led the first excavations at Joya de Cerén?", opciones: ["University of Colorado Boulder", "Harvard University in Cambridge", "Yale University in New Haven", "University of Arizona in Tucson"], correcta: 0, explicacion: "Payson Sheets was a professor of anthropology at the University of Colorado Boulder, USA." },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'Excavations at Joya de Cerén were interrupted by the civil war and resumed in:', opciones: ['1989', '1980', '1996', '1976'], correcta: 0, explicacion: 'Work resumed in 1989 after the interruption due to the armed conflict, and continued until 1996.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'How many structures did Stanley Boggs identify in his formal investigation of the Tazumal site?', opciones: ['13', '6', '20', '8'], correcta: 0, explicacion: 'Boggs identified 13 structures in total, seven of which were later assigned to the "Nuevo Tazumal" area.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'The second pyramid of Tazumal, of Toltec style, had a temple on its summit that collapsed in:', opciones: ['October 2004', 'January 1990', 'March 2010', 'July 1998'], correcta: 0, explicacion: 'The temple that crowned Structure 2, of Toltec style, collapsed in October 2004.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'In what year did Stanley Boggs begin the first of twelve seasons of research at Tazumal?', opciones: ['1942', '1950', '1960', '1935'], correcta: 0, explicacion: 'In 1942, the first of twelve seasons of Boggs\' archaeological research at the site began.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'The Tazumal site museum bears the name of its principal researcher and was founded on April 16,:', opciones: ['1952', '1970', '1940', '1993'], correcta: 0, explicacion: 'The Stanley Boggs Museum, located at Tazumal, was founded on April 16, 1952.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'Approximately from what year BC does the Chalchuapa area show evidence of continuous human occupation?', opciones: ['1200 BC', '500 BC', '300 AD', '2000 BC'], correcta: 0, explicacion: 'Chalchuapa is one of El Salvador\'s oldest and most continuous settlements, with occupation from approximately 1200 BC.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'The Cihuatán archaeological site, in the current San Salvador department, corresponds to the period:', opciones: ['Postclassic', 'Preclassic', 'Early Classic', 'Colonial'], correcta: 0, explicacion: 'Cihuatán is a Postclassic period site linked to the Pipil migration, which was destroyed and burned.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'The village of Joya de Cerén was founded shortly after the eruption of the volcano:', opciones: ['Ilopango', 'Loma Caldera', 'Izalco', 'San Miguel'], correcta: 0, explicacion: 'After the eruption of the Ilopango volcano, the valley was reoccupied and there Joya de Cerén was later founded, which was then buried by Loma Caldera.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'What building material, used in the reconstruction of Tazumal in the 1940s, generated controversy among archaeologists?', opciones: ['Cement', 'Adobe', 'Limestone', 'Lime stucco'], correcta: 0, explicacion: 'The use of modern cement by Stanley Boggs in the reconstruction of the structures was heavily criticized at the time.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'The main structure of Tazumal was built in thirteen distinct stages, between the years:', opciones: ['100 and 800 AD', '1200 and 1500 AD', '400 BC and 100 AD', '900 and 1200 AD'], correcta: 0, explicacion: 'Structure 1 (B1-1) was built in thirteen successive stages between 100 and 800 AD.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'The legislative decree that declared Joya de Cerén a National Monument dates from:', opciones: ['August 31, 1989', 'December 11, 1993', 'January 1, 1980', 'May 5, 1976'], correcta: 0, explicacion: 'Legislative Decree No. 320, of August 31, 1989, declared Joya de Cerén a National Monument.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: "To date, Joya de Cerén is:", opciones: ["The country's only World Heritage Site", "One of five Salvadoran sites so listed", "The second most visited site nationwide", "Part of a Mayan binational site complex"], correcta: 0, explicacion: "Joya de Cerén remains, to date, the only Salvadoran site declared a UNESCO World Heritage Site." },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'The Chalchuapa archaeological area includes, in addition to Tazumal, sites such as El Trapiche and:', opciones: ['Casa Blanca', 'Cihuatán', 'San Andrés', 'Quelepa'], correcta: 0, explicacion: 'Casa Blanca is another of the sites that make up the Chalchuapa archaeological zone, together with El Trapiche.' },

  /* ═════════════════════════════════════════════════════════
     LEYENDAS
     ═════════════════════════════════════════════════════════ */

  // FÁCIL — nuevas, básicas y comerciales (ver marcador de inserción más abajo)
  { cat: 'leyendas', nivel: 'facil', pregunta: 'What is the most famous physical characteristic of El Cipitío?', opciones: ['He is two meters tall', 'He has three eyes', 'He is invisible', 'His feet are reversed'], correcta: 3, explicacion: 'El Cipitío is famous because his feet are reversed, which causes confusion on the roads where he walks.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'Who does La Siguanaba mainly frighten?', opciones: ['Everyone equally', 'Men who are out late at night', 'Animals', 'Children'], correcta: 1, explicacion: 'La Siguanaba especially frightens unwary men, particularly those who are out late or unfaithful.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'What is El Cipitío\'s favorite food?', opciones: ['Bananas', 'Meat', 'Corn', 'Bread'], correcta: 0, explicacion: 'El Cipitío has a well-known favorite food: bananas (guineo). He also likes honey and ashes.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'Who is El Cipitío\'s mother?', opciones: ['La Patasola', 'La Siguanaba', 'La Carreta Bruja', 'La Llorona'], correcta: 1, explicacion: 'El Cipitío is the son of La Siguanaba according to Salvadoran oral tradition, and was cursed to be eternally a child.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'How old is El Cipitío eternally?', opciones: ['Thirteen years old', 'Seven years old', 'Fifteen years old', 'Ten years old'], correcta: 3, explicacion: 'El Cipitío is an eternal ten-year-old child who never ages, condemned to remain that age forever.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'How many main types of Cadejo exist?', opciones: ['Four different types', 'Only one: the black', 'Two: white and black', 'Three: white, black, and red'], correcta: 2, explicacion: 'In Salvadoran folklore there are two Cadejos: the white one (benevolent and protective) and the black one (malevolent and dangerous).' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'What is the role of the white Cadejo?', opciones: ['To protect travelers', 'To frighten people', 'To cause confusion on roads', 'To steal livestock'], correcta: 0, explicacion: 'The white Cadejo is considered benevolent and protective, especially of solitary travelers.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: "What does La Siguanaba's face turn into when a man gets close, thinking she is a beautiful woman?", opciones: ["A horse's face or a skull", 'A wrinkled old woman', 'A fierce wolf', 'A snake'], correcta: 0, explicacion: "From afar, La Siguanaba looks like a beautiful woman, but up close she turns and reveals a terrifying face, similar to a horse's or a skull's, driving the man to terror or madness." },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'What is a characteristic of El Cipitío\'s physical appearance?', opciones: ['He is transparent', 'He is tall and thin', 'He is fat and red', 'He is short and has a big belly'], correcta: 3, explicacion: 'El Cipitío is described as short (chaparro) and pot-bellied (barrigón), very recognizable characteristics.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'What does El Cipitío wear as a characteristic accessory?', opciones: ['A red scarf', 'A large hat', 'A gold belt', 'A pair of glasses'], correcta: 1, explicacion: 'El Cipitío wears a large conical hat that is part of his most recognizable appearance.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'Why is it said that El Cipitío confuses travelers?', opciones: ['Because his feet are reversed', 'Because he rings bells', 'Because he is invisible', 'Because he speaks strange languages'], correcta: 0, explicacion: 'El Cipitío\'s reversed feet leave confusing footprints on the roads, deceiving travelers.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'Where does El Cipitío like to frequent?', opciones: ['In churches', 'In cemeteries', 'In sugar cane mills', 'In markets'], correcta: 2, explicacion: 'El Cipitío likes to go to sugar cane mills (trapiches) where there is honey and sweets.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'Who does the black Cadejo like to follow?', opciones: ['Priests', 'Children during the day', 'Farm animals', 'Solitary travelers at night'], correcta: 3, explicacion: 'The black Cadejo is malevolent and especially haunts solitary travelers during the night.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'What is the most dangerous characteristic of La Siguanaba?', opciones: ['She can speak all languages', 'She can drive men to madness', 'She can freeze water', 'She can fly'], correcta: 1, explicacion: 'La Siguanaba has the ability to drive men to madness, in addition to causing extreme fear with her appearance.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'How is La Siguanaba\'s hair commonly described?', opciones: ['Long and black', 'Short and red', 'Non-existent', 'Curly and white'], correcta: 0, explicacion: 'La Siguanaba is typically described as a woman with long black hair and a white dress in her initial form.' },

  // MEDIO (15)
  { cat: 'leyendas', nivel: 'medio', pregunta: 'Who is the mother of El Cipitío, according to Salvadoran legend?', opciones: ['La Siguanaba', 'La Llorona', 'La Carreta Bruja', 'La Chancha'], correcta: 0, explicacion: 'El Cipitío is, according to tradition, the son of La Siguanaba.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'At what age was El Cipitío condemned to remain forever?', opciones: ['10 years', '5 years', '15 years', '7 years'], correcta: 0, explicacion: 'El Cipitío was condemned to remain eternally as a 10-year-old child.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'According to legend, how does La Siguanaba initially appear to men?', opciones: ['As a beautiful woman', 'As an old man', 'As an animal', 'As a faceless shadow'], correcta: 0, explicacion: 'La Siguanaba appears from afar as a beautiful woman, but upon closer approach reveals a horrible face.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'In what colors does El Cadejo traditionally appear?', opciones: ['White and black', 'Red and blue', 'Gold and silver', 'Green and brown'], correcta: 0, explicacion: 'El Cadejo has two versions: a white one, protective, and a black one, evil.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: "What is the name of the ghostly cart that announces bad luck or death in Salvadoran tradition?", opciones: ["La Carreta Bruja or Chillona", "El Carro de Fuego Errante", "La Diligencia Negra Maldita", "El Tren Fantasma Nocturno"], correcta: 0, explicacion: "La Carreta Bruja, also called Carreta Chillona, travels the roads at night as an omen of misfortune." },
  { cat: 'leyendas', nivel: 'medio', pregunta: "What does El Cipitío like to do, according to popular tradition?", opciones: ["Roll around in the ashes", "Swim in the sea at night", "Hunt animals in the woods", "Play the marimba at parties"], correcta: 0, explicacion: "El Cipitío loves to roll and eat ashes, leaving small footprints near ovens." },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'The footsteps of El Cadejo sound similar to the steps of:', opciones: ['A goat', 'A horse', 'A large dog', 'A cat'], correcta: 0, explicacion: 'His steps resemble the sound of goat hooves.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'What part of El Cipitío\'s body appears "backwards" in the legend?', opciones: ['His feet', 'His hands', 'His head', 'His ears'], correcta: 0, explicacion: 'His feet are turned backwards, confusing anyone trying to follow his tracks.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: "In what part of San Salvador is El Padre sin Cabeza said to appear?", opciones: ["At Iglesia El Rosario", "At the Cuscatlán Park", "At the downtown Zócalo", "At the Ex-Cuartel Market"], correcta: 0, explicacion: "According to legend, El Padre sin Cabeza comes out through the doors of Iglesia El Rosario on Fridays at midnight." },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'Which figure of Salvadoran mythology appears mainly to unfaithful men or night owls near rivers?', opciones: ['La Siguanaba', 'El Cipitío', 'El Cadejo blanco', 'El Justo Juez'], correcta: 0, explicacion: 'La Siguanaba seeks to deceive and frighten womanizing or unfaithful men who walk alone at night.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: "What characteristic headpiece does El Cipitío wear, according to popular descriptions?", opciones: ["A large pointed palm hat", "A crown of white flowers", "A Pipil warrior helmet", "A turban of dark cloth"], correcta: 0, explicacion: "El Cipitío is usually described with a large pointed palm hat." },
  { cat: 'leyendas', nivel: 'medio', pregunta: "What is the name of the night spirit that, according to tradition, punishes those who break the rules of the night?", opciones: ["El Justo Juez de la Noche", "El Cipitío de las cenizas", "La Carreta Bruja errante", "El Cadejo negro del monte"], correcta: 0, explicacion: "El Justo Juez de la Noche is a character who, according to legend, punishes faults committed during the night." },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'Which Pipil indigenous belief holds that certain people can transform into protective animals?', opciones: ['Nahualism', 'Curanderismo', 'Aztec totemism', 'Mayan shamanism'], correcta: 0, explicacion: 'Nahualism was a widespread belief among the Pipil peoples.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'What magical flower, according to legend, can only be seen and picked by mute people?', opciones: ['La Flor de Amate', 'La Flor de Izote', 'La Rosa de Cuscatlán', 'La Flor de Loto'], correcta: 0, explicacion: 'La Flor de Amate is a legendary flower associated with good luck, visible only to mute people.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'Which of these characters does NOT belong to Salvadoran legends?', opciones: ['El Minotauro', 'La Siguanaba', 'El Cipitío', 'El Cadejo'], correcta: 0, explicacion: 'El Minotauro belongs to Greek mythology; the other three are classic characters of Salvadoran folklore.' },

  // DIFÍCIL (15)
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'Before being cursed, what was the name of the woman who would become La Siguanaba?', opciones: ['Sihuehuet', 'Zipitía', 'Xochitl', 'Ixchel'], correcta: 0, explicacion: '"Sihuehuet" means "beautiful woman" in Náhuat, before receiving the curse that transformed her into La Siguanaba.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'What does the name "Siguanaba" mean according to tradition?', opciones: ['Horrible woman', 'Wise woman', 'Mother of the night', 'Spirit of the water'], correcta: 0, explicacion: 'After the curse, her new name came to mean "horrible woman".' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'What does the word "Cipit" mean in the Náhuat language?', opciones: ['Child', 'Fire', 'Moon', 'Serpent'], correcta: 0, explicacion: '"Cipit" simply means "child" in Náhuat, the origin of El Cipitío\'s name.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'According to the popular rule about El Cadejo, if you hear his steps very close, it actually means:', opciones: ['He is far away', 'He is about to attack', 'He is behind you', 'He has left'], correcta: 0, explicacion: 'Legend says that if you hear him close, he is far; and if you hear him far, he is very near.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'What color of Cadejo is considered a protector of good-hearted night walkers?', opciones: ['White', 'Black', 'Gray', 'Red'], correcta: 0, explicacion: 'The White Cadejo is considered a protective being and guide for those who walk at night with good intentions.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'In the popular story of La Carreta Bruja, what nickname did the man who refused to bless his cart have?', opciones: ['Pedro el Malo', 'Juan sin Miedo', 'El Diablo Cojuelo', 'Concho el Bribón'], correcta: 0, explicacion: 'In one of the best-known versions, the punished man was nicknamed "Pedro el Malo".' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'The scene of La Carreta Bruja\'s curse occurs, according to a popular version, during the celebration of which patron saint?', opciones: ['San Isidro Labrador', 'San Miguel Arcángel', 'San Salvador del Mundo', 'Santa Ana'], correcta: 0, explicacion: 'The legend places the episode at the feast of San Isidro Labrador, when carters brought their carts to be blessed.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'According to legend, on which day of the week does El Padre sin Cabeza appear near Iglesia El Rosario?', opciones: ['Fridays', 'Mondays', 'Sundays', 'Tuesdays'], correcta: 0, explicacion: 'He is said to appear every Friday at midnight.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'In the belief of nahualism, who invoked the protective animal spirit of a newborn?', opciones: ['A witch doctor or shaman', 'The town Catholic priest', 'The child himself as he grew', 'The regional military chief'], correcta: 0, explicacion: 'A shaman invoked, at the child\'s birth, an animal spirit that became his protective nahual.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'In which region of El Salvador is the legend of El Cipitío traditionally located, although it can be transported anywhere?', opciones: ['San Vicente', 'Morazán', 'La Unión', 'Chalatenango'], correcta: 0, explicacion: 'Tradition places El Cipitío mainly in the San Vicente department.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: "Which version explains the origin of El Padre sin Cabeza linking it to a social conflict?", opciones: ["He was beheaded for joining a peasant revolt", "He died fighting English pirates on the coast", "He was executed for heresy during the colony", "He died in a duel over a forbidden love in Izalco"], correcta: 0, explicacion: "One version tells that the priest was beheaded for taking part in a peasant uprising." },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'What physical characteristic, besides his backward feet, is usually highlighted in descriptions of El Cipitío?', opciones: ['His enormous belly', 'His bat wings', 'His scaly skin', 'His horns'], correcta: 0, explicacion: 'He is described as having a large belly, a result of his taste for eating ashes.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'According to some versions, El Cipitío also frequents sugarcane mills because he is attracted to:', opciones: ['Honey and dulce de atado', 'The smoke from the ovens', 'The sound of bells', 'The workers\' tools'], correcta: 0, explicacion: 'He is attracted to the honey and dulce de atado produced in the mills.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'What is one of the reasons why, according to legend, La Carreta Bruja visits certain towns?', opciones: ['Because there is no love or harmony in them', 'Because they are the richest in the country', 'Because they have abandoned churches', 'Because they are near the sea'], correcta: 0, explicacion: 'It is said that the cart roams towns where there is a lack of love and harmony among its inhabitants.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: "What type of spirit is, in general, a \"nahual\" within Pipil tradition?", opciones: ["A protective animal spirit given at birth", "A vengeful ghost that haunts old roads", "A minor god of the rains and harvests", "An enchanted object passed down in families"], correcta: 0, explicacion: "The nahual is a protective animal spirit that, according to belief, is assigned to a person from birth." },

  // GUANACO (15)
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'In one version, who is described as the "God of gods" who casts the curse upon El Cipitío\'s mother?', opciones: ['Teotl', 'Tlaloc', 'Itzamná', 'Quetzalcoatl'], correcta: 0, explicacion: 'In this version, Teotl, the "god of gods", condemns the mother and her son after the illicit romance.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'According to a detailed version of the legend, El Cipitío\'s mother had an illicit romance with:', opciones: ['A morning star', 'A foreign warrior', 'A Mayan priest', 'A forest spirit'], correcta: 0, explicacion: 'In this variant, Sihuehuet had a romance with a morning star, which originated the curse.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'With which hill is the home of La Siguanaba and her son El Cipitío traditionally associated?', opciones: ['Cerro Sihuatepeque', 'Izalco Volcano', 'Cerro de Guazapa', 'Chaparrastique Volcano'], correcta: 0, explicacion: 'Cerro Sihuatepeque, meaning "hill of the woman", is associated with the region of origin of these characters.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: "According to certain versions, what did a girl have to do to get El Cipitío to stop bothering her?", opciones: ["Neglect her hygiene for several days", "Offer him white flowers from the hills", "Recite a special prayer at every dawn", "Give him dulce de atado and bananas"], correcta: 0, explicacion: "It is said that El Cipitío dislikes poor hygiene habits, so young women used this to scare him away." },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: "What distinctive sound warns of the proximity of La Carreta Bruja, according to tradition?", opciones: ["A squeak of old wooden wheels", "A rooster crowing at midnight", "The tolling of distant bells", "The howling of many stray dogs"], correcta: 0, explicacion: "The terrible squeak of its wooden wheels announces the arrival of La Carreta Bruja." },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'In which book, published in 1919, did Miguel Ángel Espino compile and give literary form to the legends of La Siguanaba and El Cipitío?', opciones: ['Mitología de Cuscatlán', 'Cuentos de Barro', 'Leyendas de Guatemala', 'Relatos de Cuscatlán'], correcta: 0, explicacion: 'Miguel Ángel Espino published "Mitología de Cuscatlán" in 1919, giving a literary version to these Salvadoran legends.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'What other legendary animal-like beings are mentioned alongside El Cadejo in Salvadoran tradition?', opciones: ['El Mico Brujo and La Chancha', 'The Griffin and the Sphinx', 'The Unicorn and the Dragon', 'The Basilisk and the Hydra'], correcta: 0, explicacion: 'El Mico Brujo and La Chancha are other animal-like characters present in Salvadoran folklore.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'In some interpretations, the name "Cipit" has been linked to a Mesoamerican deity called:', opciones: ['Xipe Tótec', 'Huitzilopochtli', 'Quetzalcoatl', 'Itzamná'], correcta: 0, explicacion: 'Some versions relate the name of El Cipitío to the Mesoamerican deity Xipe Tótec.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: "According to legend, which two versions explain why El Padre sin Cabeza lost his head?", opciones: ["He died in mortal sin, or was beheaded in a revolt", "He was struck by lightning or by a gypsy curse", "He died in a naval battle or in a great port fire", "He was executed by Spain's king or for witchcraft"], correcta: 0, explicacion: "There are two main versions of his origin: one religious (sin without confession) and one social (participation in a revolt)." },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: "What do the two Cadejos (white and black) together represent in the popular imagination?", opciones: ["The fight between good and evil", "The passing of the day and night", "Wealth and poverty in the towns", "The countryside and the modern city"], correcta: 0, explicacion: "Both cadejos symbolize the eternal struggle between the forces of good and evil." },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'According to legend, after leaving Iglesia El Rosario, in which direction does El Padre sin Cabeza walk?', opciones: ['North', 'South', 'East', 'West'], correcta: 0, explicacion: 'According to the stories, he walks north along Sixth Avenue after leaving the church.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: "In popular tradition, what function did the nahual assigned to a newborn serve?", opciones: ["Be the lifelong protective animal spirit", "Determine his future trade in the village", "Heal the serious illnesses of the family", "Protect the village's harvest and cattle"], correcta: 0, explicacion: "The nahual accompanied and protected the person throughout their life, according to this Pipil belief." },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'According to tradition, what does El Padre sin Cabeza carry in his hand as he walks the streets, despite having no head?', opciones: ['A rosary', 'A lit candle', 'A wooden cross', 'An open bible'], correcta: 0, explicacion: 'It is said that El Padre sin Cabeza walks holding a rosary in his hand, causing a paralyzing cold in anyone who approaches him.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'In one version of the origin of La Siguanaba, her true name "Sihuehuet" is related to what meaning?', opciones: ['Beautiful woman', 'Mother of the moon', 'Guardian of the river', 'Daughter of the sun'], correcta: 0, explicacion: '"Sihuehuet" translates as "beautiful woman" before the curse fell upon her.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: "What does El Cipitío mainly eat, besides ashes, according to certain versions of the legend?", opciones: ["Bananas and dulce de atado", "Raw meat from young deer", "Insects and green leaves", "Only water from the rivers"], correcta: 0, explicacion: "According to some versions, his favorite food is plantains and dulce de atado, in addition to ashes." },


];

/* ══════════════════════════════════════════════════════════
   SELECCIÓN DE PREGUNTAS SEGÚN IDIOMA
   ══════════════════════════════════════════════════════════ */
function getPreguntasSegunIdioma() {
  if (typeof window.SRi18n === 'undefined') return PREGUNTAS;   // ← antes: PREGUNTAS_ES
  const lang = window.SRi18n.getLang();
  return lang === 'en' ? PREGUNTAS_EN : PREGUNTAS;              // ← antes: PREGUNTAS_ES
}

/* ══════════════════════════════════════════════════════════
   SISTEMA DE GUARDADO DE PUNTAJES (backend)
   ══════════════════════════════════════════════════════════ */
async function guardarPuntaje(categoria, nivel, puntaje) {
  try {
    const response = await fetch('/api/scores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categoria, nivel, puntaje })
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      console.error('No se pudo guardar el puntaje:', data.message || response.statusText);
    }
  } catch (error) {
    console.error('No se pudo guardar el puntaje:', error);
  }
}

async function obtenerMejorPuntaje(categoria, nivel) {
  try {
    const params = new URLSearchParams({ categoria, nivel });
    const response = await fetch(`/api/scores/best?${params.toString()}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.best || null;
  } catch (error) {
    console.error('No se pudo obtener el récord personal:', error);
    return null;
  }
}

/* ══════════════════════════════════════════════════════════
   VARIABLES Y DOM
   ══════════════════════════════════════════════════════════ */
let nivelSeleccionado = null;
let categoriaSeleccionada = null;
let cantidadSeleccionada = null;
let preguntasActivas = [];
let indicesOriginales = []; // guarda los índices originales de las preguntas seleccionadas
let indice = 0;
let puntaje = 0;
let respondida = false;
let preguntaActual = null;
let respuestaCorrecta = false;

const CANTIDAD_PREGUNTAS = { express: 8, normal: 15, extenso: Infinity };

const quizSetup    = document.getElementById('quizSetup');
const quizZone     = document.getElementById('quizZone');
const quizWelcome  = document.getElementById('quizWelcome');
const scrollHint   = document.getElementById('quizScrollHint');
const levelCards   = document.querySelectorAll('.level-card');
const amountBtns   = document.querySelectorAll('.amount-btn');
const catBtns      = document.querySelectorAll('.cat-btn');
const startBtn     = document.getElementById('startBtn');
const qCategory    = document.getElementById('qCategory');
const qText        = document.getElementById('qText');
const qCounter     = document.getElementById('questionCounter');
const scoreLive    = document.getElementById('scoreLive');
const progFill     = document.getElementById('progressFill');
const optionsDiv   = document.getElementById('quizOptions');
const feedback     = document.getElementById('quizFeedback');
const nextBtn      = document.getElementById('nextBtn');
const results      = document.getElementById('quizResults');
const retryBtn     = document.getElementById('retryBtn');
const levelBadge   = document.getElementById('levelBadge');
const quizCardEl   = document.getElementById('quizCard');
const quizBackdrop = document.getElementById('quizBackdrop');
const closeQuizBtn = document.getElementById('closeQuizBtn');
const quizConfirmOverlay = document.getElementById('quizConfirmOverlay');
const confirmExitBtn = document.getElementById('confirmExitBtn');
const cancelExitBtn  = document.getElementById('cancelExitBtn');

/* ── Función de traducción (UI) con idioma actual ── */
function t(key, replacements = {}) {
  if (typeof window.SRi18n === 'undefined') {
    console.warn('i18n no cargado, usando fallback');
    return key;
  }
  const lang = window.SRi18n.getLang();
  let text = window.SRi18n.t(key, lang) || key;
  for (const [k, v] of Object.entries(replacements)) {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  }
  return text;
}

/* ── Obtener nombre de nivel traducido ── */
function getLevelName(level) {
  const map = {
    facil: 'quiz.levelFacil',
    medio: 'quiz.levelMedio',
    dificil: 'quiz.levelDificil',
    guanaco: 'quiz.levelGuanaco'
  };
  return t(map[level] || level);
}

/* ── Obtener nombre de categoría traducido ── */
function getCatName(cat) {
  const map = {
    historia: 'quiz.catLabelHistoria',
    gastronomia: 'quiz.catLabelGastronomia',
    sitios: 'quiz.catLabelSitios',
    leyendas: 'quiz.catLabelLeyendas'
  };
  return t(map[cat] || cat);
}

/* ══════════════════════════════════════════════════════════
   INDICADOR "DESLIZA ↓" (sin cambios)
   ══════════════════════════════════════════════════════════ */
if (scrollHint && typeof gsap !== 'undefined') {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    gsap.to(scrollHint, {
      y: 10,
      duration: 0.9,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
  scrollHint.addEventListener('click', () => {
    quizSetup.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  let hintOculto = false;
  const ocultarHint = () => {
    if (hintOculto) return;
    hintOculto = true;
    gsap.to(scrollHint, { opacity: 0, duration: 0.4, ease: 'power1.out' });
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          ocultarHint();
          observer.disconnect();
        }
      });
    }, { threshold: 0.15 });
    observer.observe(quizSetup);
  }
}

// Mover modales al body
document.body.appendChild(quizBackdrop);
document.body.appendChild(quizZone);
document.body.appendChild(quizConfirmOverlay);

/* ══════════════════════════════════════════════════════════
   MODAL DEL QUIZ
   ══════════════════════════════════════════════════════════ */
let scrollAntesDelModal = 0;

function abrirModalQuiz() {
  scrollAntesDelModal = window.scrollY;
  if (typeof gsap !== 'undefined') {
    gsap.set([quizZone, quizBackdrop], { clearProps: 'opacity,scale,transform' });
  } else {
    quizZone.style.opacity = '';
    quizZone.style.transform = '';
    quizBackdrop.style.opacity = '';
  }
  quizBackdrop.classList.add('show');
  quizZone.classList.add('active');
  document.body.classList.add('quiz-modal-open');
  document.documentElement.classList.add('quiz-modal-open');
}

function cerrarModalQuiz() {
  const limpiar = () => {
    quizZone.classList.remove('active');
    quizBackdrop.classList.remove('show');
    document.body.classList.remove('quiz-modal-open');
    document.documentElement.classList.remove('quiz-modal-open');
    window.scrollTo({ top: scrollAntesDelModal });
    document.getElementById('quizCard').style.display = '';
    optionsDiv.style.display = '';
    feedback.style.display = '';
    nextBtn.style.display = '';
    results.classList.remove('show');
  };

  if (typeof gsap !== 'undefined') {
    gsap.to(quizZone, { opacity: 0, scale: 0.95, duration: 0.25, ease: 'power1.in' });
    gsap.to(quizBackdrop, { opacity: 0, duration: 0.25, onComplete: () => {
      gsap.set([quizZone, quizBackdrop], { clearProps: 'opacity,scale' });
      limpiar();
    }});
  } else {
    limpiar();
  }
}

if (closeQuizBtn) {
  closeQuizBtn.addEventListener('click', () => {
    quizConfirmOverlay.classList.add('show');
  });
}
if (cancelExitBtn) {
  cancelExitBtn.addEventListener('click', () => {
    quizConfirmOverlay.classList.remove('show');
  });
}
if (confirmExitBtn) {
  confirmExitBtn.addEventListener('click', () => {
    quizConfirmOverlay.classList.remove('show');
    cerrarModalQuiz();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && quizZone.classList.contains('active')) {
    quizConfirmOverlay.classList.add('show');
  }
});

/* ══════════════════════════════════════════════════════════
   CONFIGURACIÓN INICIAL (selección)
   ══════════════════════════════════════════════════════════ */
function pulso(el) {
  if (typeof gsap === 'undefined') return;
  gsap.fromTo(el, { scale: 0.94 }, {
    scale: 1.04, duration: 0.22, ease: 'back.out(3)',
    onComplete: () => gsap.set(el, { clearProps: 'transform' })
  });
}

function esMovilQuiz() {
  return window.innerWidth <= 768;
}

/* ══════════════════════════════════════════════════════════
   ASISTENTE PASO A PASO: nivel → cantidad → categoría
   Antes se mostraban las tres cosas juntas. Ahora se muestra un paso a
   la vez: al elegir una opción se espera un momento (para que se note
   la selección) y luego aparece el siguiente paso con una animación
   suave. Un botón "Regresar" arriba permite volver a cambiar una
   elección anterior.
   ══════════════════════════════════════════════════════════ */
const setupBackBtn  = document.getElementById('setupBackBtn');
const quizStartWrap = document.getElementById('quizStartWrap');
const quizLoadingOverlay = document.getElementById('quizLoadingOverlay');

/* ── Stepper visual del asistente ── */
const stepperSteps = document.querySelectorAll('.quiz-stepper__step');
const stepperLine1 = document.getElementById('stepperLine1');
const stepperLine2 = document.getElementById('stepperLine2');
const streakBadge  = document.getElementById('streakBadge');
const streakCount  = document.getElementById('streakCount');

let rachaActual = 0;
let mejorRacha = 0;

function actualizarStepper(paso) {
  stepperSteps.forEach((s, idx) => {
    s.classList.toggle('active', idx === paso);
  });
  if (stepperLine1) stepperLine1.classList.toggle('filled', paso >= 1);
  if (stepperLine2) stepperLine2.classList.toggle('filled', paso >= 2);
}

// Navegación clickeable en el stepper
stepperSteps.forEach((stepEl) => {
  stepEl.addEventListener('click', () => {
    const target = parseInt(stepEl.dataset.stepTarget, 10);
    if (!isNaN(target) && target < pasoActual) {
      limpiarSeleccionDesde(target + 1);
      irAPaso(target);
    }
  });
});

/* ── Animación de estadísticas de bienvenida al cargar ── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.quiz-stat__number').forEach((el) => {
    const count = parseFloat(el.dataset.count) || 0;
    const suffix = el.dataset.suffix || '';
    const counter = { val: 0 };
    if (typeof gsap !== 'undefined') {
      gsap.to(counter, {
        val: count,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => { el.textContent = Math.floor(counter.val) + suffix; },
        onComplete: () => { el.textContent = count + suffix; }
      });
    }
  });
});

const PASOS = ['nivel', 'cantidad', 'categoria'];
const ID_PASO = { nivel: 'stepNivel', cantidad: 'stepCantidad', categoria: 'stepCategoria' };
let pasoActual = 0;

function elPaso(nombre) {
  return document.getElementById(ID_PASO[nombre]);
}

function irAPaso(destino) {
  const anterior = elPaso(PASOS[pasoActual]);
  const siguiente = elPaso(PASOS[destino]);
  pasoActual = destino;
  actualizarStepper(destino);
  if (setupBackBtn) setupBackBtn.style.display = destino > 0 ? 'flex' : 'none';

  const mostrarSiguiente = () => {
    siguiente.classList.add('active');
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(siguiente, { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.45, ease: 'power2.out',
        onComplete: () => gsap.set(siguiente, { clearProps: 'opacity,transform' })
      });
    }
    if (esMovilQuiz()) siguiente.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (typeof gsap === 'undefined') {
    anterior.classList.remove('active');
    mostrarSiguiente();
    return;
  }

  gsap.to(anterior, {
    opacity: 0, y: -12, duration: 0.25, ease: 'power1.in',
    onComplete: () => {
      anterior.classList.remove('active');
      gsap.set(anterior, { clearProps: 'opacity,transform' });
      mostrarSiguiente();
    }
  });
}

/* Limpia la selección del paso `desde` en adelante (se usa al ir hacia
   atrás, para no dejar pasos posteriores con una elección "fantasma"). */
function limpiarSeleccionDesde(desde) {
  if (desde <= 2) {
    catBtns.forEach(b => b.classList.remove('selected'));
    categoriaSeleccionada = null;
    startBtn.classList.remove('visible');
  }
  if (desde <= 1) {
    amountBtns.forEach(b => b.classList.remove('selected'));
    cantidadSeleccionada = null;
  }
  if (desde <= 0) {
    levelCards.forEach(c => c.classList.remove('selected'));
    nivelSeleccionado = null;
  }
}

function reiniciarAsistente() {
  document.querySelectorAll('.quiz-step').forEach(s => {
    s.classList.remove('active');
    if (typeof gsap !== 'undefined') gsap.set(s, { clearProps: 'opacity,transform' });
  });
  elPaso('nivel').classList.add('active');
  pasoActual = 0;
  actualizarStepper(0);
  rachaActual = 0;
  mejorRacha = 0;
  if (streakBadge) streakBadge.style.display = 'none';
  if (setupBackBtn) setupBackBtn.style.display = 'none';
}

if (setupBackBtn) {
  setupBackBtn.addEventListener('click', () => {
    if (pasoActual === 0) return;
    const destino = pasoActual - 1;
    limpiarSeleccionDesde(destino + 1);
    irAPaso(destino);
  });
}

const ESPERA_ANTES_DE_AVANZAR_MS = 1000;

levelCards.forEach(card => {
  card.addEventListener('click', () => {
    if (pasoActual !== 0) return;
    levelCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    nivelSeleccionado = card.dataset.level;
    pulso(card);
    setTimeout(() => irAPaso(1), ESPERA_ANTES_DE_AVANZAR_MS);
  });
});

amountBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (pasoActual !== 1) return;
    amountBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    cantidadSeleccionada = btn.dataset.amount;
    pulso(btn);
    setTimeout(() => irAPaso(2), ESPERA_ANTES_DE_AVANZAR_MS);
  });
});

catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    if (pasoActual !== 2) return;
    catBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    categoriaSeleccionada = btn.dataset.cat;
    pulso(btn);
    verificarListo();
  });
});

function verificarListo() {
  if (nivelSeleccionado && categoriaSeleccionada && cantidadSeleccionada) {
    setTimeout(() => {
      startBtn.classList.add('visible');
      if (esMovilQuiz()) {
        startBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, ESPERA_ANTES_DE_AVANZAR_MS);
  }
}

/* ── INICIAR QUIZ ── */
startBtn.addEventListener('click', () => {
  const poolCompleto = getPreguntasSegunIdioma();
  let pool = poolCompleto.filter(p => p.nivel === nivelSeleccionado);
  if (categoriaSeleccionada !== 'todas') {
    pool = pool.filter(p => p.cat === categoriaSeleccionada);
  }

  if (pool.length === 0) {
    alert(t('quiz.noQuestions'));
    return;
  }

  const limite = CANTIDAD_PREGUNTAS[cantidadSeleccionada] ?? pool.length;
  // Barajar y seleccionar, pero guardar los índices originales en el array completo
  const shuffled = pool.sort(() => Math.random() - 0.5);
  const seleccionadas = shuffled.slice(0, Math.min(limite, shuffled.length));
  // Guardamos los índices originales (posición en el pool completo)
  indicesOriginales = seleccionadas.map(p => poolCompleto.indexOf(p));
  // Guardamos también las preguntas actuales (para acceso rápido)
  preguntasActivas = seleccionadas;

  indice = 0;
  puntaje = 0;
  respondida = false;
  preguntaActual = null;
  respuestaCorrecta = false;

  levelBadge.textContent = getLevelName(nivelSeleccionado);
  levelBadge.className = `quiz-level-badge ${nivelSeleccionado}`;

  // Modal de carga: un pequeño respiro (~3s) con el logo antes de que
  // aparezca la primera pregunta ya montada en su propio modal.
  if (quizLoadingOverlay) quizLoadingOverlay.classList.add('show');
  setTimeout(() => {
    if (quizLoadingOverlay) quizLoadingOverlay.classList.remove('show');
    abrirModalQuiz();
    results.classList.remove('show');
    mostrarPregunta();
  }, 3000);
});

/* ══════════════════════════════════════════════════════════
   MOSTRAR PREGUNTA (usa preguntasActivas)
   ══════════════════════════════════════════════════════════ */
function mostrarPregunta() {
  respondida = false;
  feedback.classList.remove('show', 'correct-fb', 'wrong-fb');
  nextBtn.classList.remove('show');

  const total = preguntasActivas.length;
  const q = preguntasActivas[indice];
  preguntaActual = q;

  progFill.style.width = `${(indice / total) * 100}%`;

  actualizarContadorYScore();

  qCategory.textContent = getCatName(q.cat);
  qText.textContent = q.pregunta;

  optionsDiv.innerHTML = '';
  const indices = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  const correctaMezclada = indices.indexOf(q.correcta);

  indices.forEach((origIdx, newIdx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = q.opciones[origIdx];
    btn.addEventListener('click', () => seleccionar(btn, newIdx, correctaMezclada, q));
    optionsDiv.appendChild(btn);
  });

  if (typeof gsap !== 'undefined') {
    gsap.set([quizCardEl, optionsDiv, feedback], { opacity: 1, y: 0 });
    gsap.fromTo(quizCardEl,
      { opacity: 0, y: 22, rotateX: -10, transformPerspective: 800 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.45, ease: 'power2.out' }
    );
    gsap.set(optionsDiv.children, { opacity: 0, y: 14, scale: 0.96 });
    gsap.to(optionsDiv.children, {
      opacity: 1, y: 0, scale: 1, duration: 0.38, stagger: 0.06, delay: 0.1, ease: 'back.out(1.5)'
    });
  }
}

function actualizarContadorYScore() {
  const total = preguntasActivas.length;
  qCounter.textContent = t('quiz.questionCounter', { current: indice + 1, total: total });
  scoreLive.textContent = t('quiz.scoreLive', { points: puntaje });
}

/* ══════════════════════════════════════════════════════════
   SELECCIONAR OPCIÓN
   ══════════════════════════════════════════════════════════ */
function seleccionar(btn, newIdx, correctaMezclada, q) {
  if (respondida) return;
  respondida = true;
  respuestaCorrecta = (newIdx === correctaMezclada);

  const opts = optionsDiv.querySelectorAll('.quiz-option');
  opts.forEach(o => o.disabled = true);

  if (respuestaCorrecta) {
    rachaActual++;
    if (rachaActual > mejorRacha) mejorRacha = rachaActual;

    // Mostrar badge de racha
    if (rachaActual >= 2 && streakBadge) {
      streakBadge.style.display = 'inline-flex';
      if (streakCount) streakCount.textContent = rachaActual;
      if (typeof gsap !== 'undefined') {
        gsap.fromTo(streakBadge,
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2.2)' }
        );
      }
    }

    btn.classList.add('correct');
    const points = nivelPuntos();
    puntaje += points;

    // Crear burbuja de puntaje flotante (+pts)
    const scorePop = document.createElement('span');
    scorePop.className = 'score-pop';
    scorePop.textContent = `+${points}`;
    scorePop.style.left = `${btn.offsetWidth / 2 - 16}px`;
    scorePop.style.top = `-8px`;
    btn.style.position = 'relative';
    btn.appendChild(scorePop);

    if (typeof gsap !== 'undefined') {
      gsap.to(scorePop, {
        y: -36, opacity: 0, duration: 0.85, ease: 'power1.out',
        onComplete: () => scorePop.remove()
      });
      gsap.fromTo(scoreLive,
        { scale: 1.3, color: '#10b981' },
        { scale: 1, color: '', duration: 0.4, ease: 'back.out(2)' }
      );
      gsap.fromTo(btn, { scale: 1 }, {
        scale: 1.04, duration: 0.3, ease: 'back.out(2)',
        onComplete: () => gsap.set(btn, { clearProps: 'transform' })
      });
    }

    feedback.className = 'quiz-feedback show correct-fb';
    feedback.innerHTML = `
      <strong>${t('quiz.correctPoints', { points: points })}</strong>
      <p>${q.explicacion}</p>
    `;
  } else {
    rachaActual = 0;
    if (streakBadge) {
      if (typeof gsap !== 'undefined') {
        gsap.to(streakBadge, {
          opacity: 0, scale: 0.8, duration: 0.2,
          onComplete: () => { streakBadge.style.display = 'none'; }
        });
      } else {
        streakBadge.style.display = 'none';
      }
    }

    btn.classList.add('wrong');
    opts[correctaMezclada].classList.add('correct');
    feedback.className = 'quiz-feedback show wrong-fb';
    feedback.innerHTML = `
      <strong>${t('quiz.incorrect')}</strong>
      <p>${q.explicacion}</p>
    `;
  }

  actualizarContadorYScore();
  nextBtn.classList.add('show');
  const esUltima = (indice + 1 >= preguntasActivas.length);
  nextBtn.textContent = esUltima ? t('quiz.resultsBtn') : t('quiz.nextBtn');
}

function nivelPuntos() {
  return { facil: 5, medio: 10, dificil: 15, guanaco: 20 }[nivelSeleccionado] || 10;
}

/* ══════════════════════════════════════════════════════════
   SIGUIENTE PREGUNTA
   ══════════════════════════════════════════════════════════ */
nextBtn.addEventListener('click', () => {
  const avanzar = () => {
    indice++;
    if (indice < preguntasActivas.length) {
      mostrarPregunta();
    } else {
      mostrarResultados();
    }
  };

  if (typeof gsap !== 'undefined') {
    gsap.to([quizCardEl, optionsDiv, feedback], {
      opacity: 0, y: -12, duration: 0.25, ease: 'power1.in',
      onComplete: () => {
        gsap.set([quizCardEl, optionsDiv, feedback], { clearProps: 'opacity,transform' });
        avanzar();
      }
    });
  } else {
    avanzar();
  }
});

/* ══════════════════════════════════════════════════════════
   RESULTADOS
   ══════════════════════════════════════════════════════════ */
function mostrarResultados() {
  progFill.style.width = '100%';
  document.getElementById('quizCard').style.display = 'none';
  optionsDiv.style.display = 'none';
  feedback.style.display = 'none';
  nextBtn.style.display = 'none';

  const total = preguntasActivas.length;
  const maximo = total * nivelPuntos();
  const porcentaje = Math.round((puntaje / maximo) * 100);

  const bestScoreEl = document.getElementById('resultsBestScore');
  if (bestScoreEl) bestScoreEl.textContent = '';

  guardarPuntaje(categoriaSeleccionada, nivelSeleccionado, puntaje).then(() => {
    obtenerMejorPuntaje(categoriaSeleccionada, nivelSeleccionado).then((best) => {
      if (!bestScoreEl) return;
      if (best) {
        bestScoreEl.textContent = t('quiz.resultsBestScore', { best: best.score });
      } else {
        bestScoreEl.textContent = '';
      }
    });
  });

  let tituloKey, msgKey;
  if (porcentaje >= 100) { tituloKey = 'quiz.resultsPerfect'; msgKey = 'quiz.resultsPerfectMsg'; }
  else if (porcentaje >= 80) { tituloKey = 'quiz.resultsExcellent'; msgKey = 'quiz.resultsExcellentMsg'; }
  else if (porcentaje >= 60) { tituloKey = 'quiz.resultsGood'; msgKey = 'quiz.resultsGoodMsg'; }
  else if (porcentaje >= 40) { tituloKey = 'quiz.resultsKeepLearning'; msgKey = 'quiz.resultsKeepLearningMsg'; }
  else { tituloKey = 'quiz.resultsStarting'; msgKey = 'quiz.resultsStartingMsg'; }

  const levelName = getLevelName(nivelSeleccionado);
  document.getElementById('resultsRank').textContent = t('quiz.resultsRank', { level: levelName });
  document.getElementById('resultsTitle').textContent = t(tituloKey);
  document.getElementById('resultsMessage').textContent = t(msgKey);

  const resultsScoreEl = document.getElementById('resultsScore');
  const pctFill = document.getElementById('resultsPctFill');
  results.classList.add('show');

  if (typeof gsap !== 'undefined') {
    resultsScoreEl.textContent = t('quiz.resultsScore', { score: 0, max: maximo });

    gsap.fromTo(results,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)' }
    );

    gsap.fromTo(
      ['#resultsTrophy', '#resultsRank', '#resultsTitle', '#resultsScore', '.quiz-results__pct-bar', '#resultsMessage', '.quiz-results__actions'],
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.1, delay: 0.15, ease: 'power2.out' }
    );

    gsap.fromTo(pctFill, { width: '0%' }, { width: porcentaje + '%', duration: 1.4, delay: 0.35, ease: 'power2.out' });

    const contador = { val: 0 };
    gsap.to(contador, {
      val: puntaje,
      duration: 1.3,
      delay: 0.3,
      ease: 'power1.out',
      onUpdate: () => {
        resultsScoreEl.textContent = t('quiz.resultsScore', { score: Math.round(contador.val), max: maximo });
      },
      onComplete: () => {
        resultsScoreEl.textContent = t('quiz.resultsScore', { score: puntaje, max: maximo });
      }
    });

    if (porcentaje >= 60) {
      setTimeout(lanzarConfeti, 200);
    }
  } else {
    resultsScoreEl.textContent = t('quiz.resultsScore', { score: puntaje, max: maximo });
    pctFill.style.width = porcentaje + '%';
  }
}

/* ══════════════════════════════════════════════════════════
   CONFETI CON PALETA SALVADOREÑA (Añil, Dorado, Volcán, Jade)
   ══════════════════════════════════════════════════════════ */
function lanzarConfeti() {
  if (typeof gsap === 'undefined') return;
  const colores = ['#be8e56', '#d4af37', '#3d4fa0', '#3aa6c9', '#e8734a', '#10b981', '#ffffff'];
  const contenedor = document.createElement('div');
  contenedor.className = 'confetti-container';
  document.body.appendChild(contenedor);

  const totalPiezas = 52;
  for (let i = 0; i < totalPiezas; i++) {
    const pieza = document.createElement('div');
    pieza.className = 'confetti-piece';
    pieza.style.background = colores[Math.floor(Math.random() * colores.length)];
    pieza.style.left = `${Math.random() * 100}vw`;
    const tam = 6 + Math.random() * 7;
    pieza.style.width = `${tam}px`;
    pieza.style.height = `${tam * 0.45}px`;
    contenedor.appendChild(pieza);

    gsap.set(pieza, { y: -20, opacity: 1, rotation: Math.random() * 360 });
    gsap.to(pieza, {
      y: '100vh',
      x: (Math.random() - 0.5) * 260,
      rotation: `+=${360 + Math.random() * 360}`,
      opacity: 0,
      duration: 2 + Math.random() * 1.6,
      delay: Math.random() * 0.35,
      ease: 'power1.in',
      onComplete: () => pieza.remove()
    });
  }
  setTimeout(() => contenedor.remove(), 4500);
}

/* ══════════════════════════════════════════════════════════
   REINICIAR (Jugar de nuevo)
   ══════════════════════════════════════════════════════════ */
retryBtn.addEventListener('click', () => {
  document.getElementById('quizCard').style.display = '';
  optionsDiv.style.display = '';
  feedback.style.display = '';
  nextBtn.style.display = '';
  results.classList.remove('show');

  quizZone.classList.remove('active');
  quizBackdrop.classList.remove('show');

  if (typeof gsap !== 'undefined') {
    gsap.set([quizZone, quizBackdrop], { clearProps: 'opacity,scale,transform' });
  } else {
    quizZone.style.opacity = '';
    quizZone.style.transform = '';
    quizBackdrop.style.opacity = '';
  }

  document.body.classList.remove('quiz-modal-open');
  document.documentElement.classList.remove('quiz-modal-open');
  window.scrollTo({ top: scrollAntesDelModal });

  levelCards.forEach(c => c.classList.remove('selected'));
  catBtns.forEach(b => b.classList.remove('selected'));
  amountBtns.forEach(b => b.classList.remove('selected'));
  startBtn.classList.remove('visible');
  nivelSeleccionado = null;
  categoriaSeleccionada = null;
  cantidadSeleccionada = null;
  reiniciarAsistente();
  preguntasActivas = [];
  indicesOriginales = [];
  indice = 0;
  puntaje = 0;
  respondida = false;
  preguntaActual = null;
});

/* ══════════════════════════════════════════════════════════
   ACTUALIZACIÓN AL CAMBIAR IDIOMA (MANTIENE PROGRESO)
   ══════════════════════════════════════════════════════════ */
function actualizarPreguntaActualConIdioma() {
  // Si no hay pregunta actual o el quiz no está activo, salir
  if (!quizZone.classList.contains('active') || preguntasActivas.length === 0) return;

  // Si estamos en resultados, actualizar solo la UI de resultados
  if (results.classList.contains('show')) {
    actualizarResultadosCompletos();
    return;
  }

  // Obtener el nuevo array según el idioma actual
  const nuevoPool = getPreguntasSegunIdioma();

  // Retraducir TODAS las preguntas de la sesión (no solo la actual), para que
  // "Siguiente" también muestre las preguntas ya en el nuevo idioma.
  for (let i = 0; i < indicesOriginales.length; i++) {
    const idx = indicesOriginales[i];
    const traducida = nuevoPool[idx];
    if (traducida) preguntasActivas[i] = traducida;
  }

  // Si el índice original existe, buscar la pregunta correspondiente en el nuevo pool
  if (indicesOriginales.length > indice) {
    const idxOriginal = indicesOriginales[indice];
    // Buscar en el nuevo pool la pregunta con el mismo índice (posición) que la original
    // Pero como el pool puede tener diferentes tamaños? No, los arrays son idénticos en número y orden.
    const nuevaPregunta = nuevoPool[idxOriginal];
    if (nuevaPregunta) {
      // Reemplazar la pregunta actual en preguntasActivas
      preguntasActivas[indice] = nuevaPregunta;
      preguntaActual = nuevaPregunta;
      // Actualizar el texto de la pregunta y opciones en la UI
      qCategory.textContent = getCatName(nuevaPregunta.cat);
      qText.textContent = nuevaPregunta.pregunta;
      // Actualizar opciones (mantener el orden mezclado? mejor regenerar todas)
      // Para simplificar, regeneramos las opciones con el nuevo texto pero manteniendo el estado de respuesta
      // Sin embargo, si ya se respondió, debemos mantener la opción seleccionada y el feedback.
      // Para no complicar, si ya se respondió, actualizamos solo el texto de las opciones,
      // manteniendo las clases correct/ wrong y el estado disabled.
      const opts = optionsDiv.querySelectorAll('.quiz-option');
      if (opts.length > 0) {
        // Asumimos que el orden de las opciones en el DOM es el mismo que el nuevo array de opciones
        // pero la mezcla aleatoria original se perdió. Podemos reconstruir las opciones.
        // Lo más sencillo: regenerar las opciones y volver a aplicar el estado de respuesta si respondida.
        // Para eso, guardamos la respuesta correcta y si respondió.
        const estabaRespondida = respondida;
        const eraCorrecta = respuestaCorrecta;
        const respuestaSeleccionada = estabaRespondida ? (respuestaCorrecta ? 'correct' : 'wrong') : null;
        // Regenerar opciones
        optionsDiv.innerHTML = '';
        const indices = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
        const correctaMezclada = indices.indexOf(nuevaPregunta.correcta);
        indices.forEach((origIdx, newIdx) => {
          const btn = document.createElement('button');
          btn.className = 'quiz-option';
          btn.textContent = nuevaPregunta.opciones[origIdx];
          btn.addEventListener('click', () => seleccionar(btn, newIdx, correctaMezclada, nuevaPregunta));
          if (estabaRespondida) {
            btn.disabled = true;
            // Marcar la correcta
            if (origIdx === nuevaPregunta.correcta) {
              btn.classList.add('correct');
            }
            // Marcar la seleccionada si era wrong
            if (!eraCorrecta && origIdx === nuevaPregunta.correcta) {
              // La correcta ya tiene 'correct', la wrong se marcará abajo
            }
          }
          optionsDiv.appendChild(btn);
        });
        if (estabaRespondida) {
          // Reconstruir feedback
          if (eraCorrecta) {
            const points = nivelPuntos();
            feedback.innerHTML = `
              <strong>${t('quiz.correctPoints', { points: points })}</strong>
              <p>${nuevaPregunta.explicacion}</p>
            `;
            feedback.className = 'quiz-feedback show correct-fb';
          } else {
            feedback.innerHTML = `
              <strong>${t('quiz.incorrect')}</strong>
              <p>${nuevaPregunta.explicacion}</p>
            `;
            feedback.className = 'quiz-feedback show wrong-fb';
          }
        }
      } else {
        // No hay opciones (caso raro), simplemente mostrar la pregunta
        mostrarPregunta();
      }
    }
  }
  // Actualizar contador y puntuación (ya están en el idioma correcto)
  actualizarContadorYScore();
  // Actualizar badge de nivel
  if (nivelSeleccionado) {
    levelBadge.textContent = getLevelName(nivelSeleccionado);
    levelBadge.className = `quiz-level-badge ${nivelSeleccionado}`;
  }
  // Actualizar botón siguiente
  if (nextBtn.classList.contains('show')) {
    const esUltima = (indice + 1 >= preguntasActivas.length);
    nextBtn.textContent = esUltima ? t('quiz.resultsBtn') : t('quiz.nextBtn');
  }
}

function actualizarResultadosCompletos() {
  const total = preguntasActivas.length;
  const maximo = total * nivelPuntos();
  const porcentaje = Math.round((puntaje / maximo) * 100);

  let tituloKey, msgKey;
  if (porcentaje >= 100) { tituloKey = 'quiz.resultsPerfect'; msgKey = 'quiz.resultsPerfectMsg'; }
  else if (porcentaje >= 80) { tituloKey = 'quiz.resultsExcellent'; msgKey = 'quiz.resultsExcellentMsg'; }
  else if (porcentaje >= 60) { tituloKey = 'quiz.resultsGood'; msgKey = 'quiz.resultsGoodMsg'; }
  else if (porcentaje >= 40) { tituloKey = 'quiz.resultsKeepLearning'; msgKey = 'quiz.resultsKeepLearningMsg'; }
  else { tituloKey = 'quiz.resultsStarting'; msgKey = 'quiz.resultsStartingMsg'; }

  const levelName = getLevelName(nivelSeleccionado);
  document.getElementById('resultsRank').textContent = t('quiz.resultsRank', { level: levelName });
  document.getElementById('resultsTitle').textContent = t(tituloKey);
  document.getElementById('resultsMessage').textContent = t(msgKey);

  const resultsScoreEl = document.getElementById('resultsScore');
  resultsScoreEl.textContent = t('quiz.resultsScore', { score: puntaje, max: maximo });

  const bestScoreEl = document.getElementById('resultsBestScore');
  obtenerMejorPuntaje(categoriaSeleccionada, nivelSeleccionado).then((best) => {
    if (!bestScoreEl) return;
    if (best) {
      bestScoreEl.textContent = t('quiz.resultsBestScore', { best: best.score });
    } else {
      bestScoreEl.textContent = '';
    }
  });
}

// Escuchar el evento de cambio de idioma
document.addEventListener('langchange', (e) => {
  actualizarPreguntaActualConIdioma();
});

/* ══════════════════════════════════════════════════════════
   RED DE SEGURIDAD GLOBAL CONTRA OPACITY/TRANSFORM COLGADOS
   ══════════════════════════════════════════════════════════ */
setInterval(() => {
  const candidatos = [quizZone, quizBackdrop, quizCardEl, optionsDiv, feedback, results];
  candidatos.forEach((el) => {
    if (!el) return;
    const debeEstarVisible =
      (el === quizZone && quizZone.classList.contains('active')) ||
      (el === quizBackdrop && quizBackdrop.classList.contains('show')) ||
      (el === results && results.classList.contains('show')) ||
      (el !== quizZone && el !== quizBackdrop && el !== results && el.style.display !== 'none');

    if (!debeEstarVisible) return;
    const opacity = window.getComputedStyle(el).opacity;
    if (parseFloat(opacity) < 0.05) {
      el.style.opacity = '';
      el.style.transform = '';
    }
  });
}, 1000);