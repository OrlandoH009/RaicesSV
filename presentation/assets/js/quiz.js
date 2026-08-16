/* ============================================================
  Salvadorean Roots — quiz-mejorado.js (v2.0)
   Quiz por niveles con ANIMACIONES GSAP + 28 PREGUNTAS POR NIVEL
   ============================================================ */

/* ══════════════════════════════════════════════════════════
   BANCO DE PREGUNTAS EXPANDIDO — 28 PREGUNTAS POR NIVEL
   ══════════════════════════════════════════════════════════ */
const PREGUNTAS = [

  /* ═════════════════════════════════════════════════════════
     HISTORIA — 28 PREGUNTAS POR NIVEL
     ═════════════════════════════════════════════════════════ */

  // FÁCIL (28)
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cómo se llamaba el territorio salvadoreño antes de la conquista española?', opciones: ['Quetzaltenango', 'Cuscatlán', 'Tikal', 'Copán'], correcta: 1, explicacion: 'El territorio era conocido como Cuscatlán, nombre Pipil que significa "lugar de las joyas y riquezas".' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuándo se proclamó la Independencia de Centroamérica?', opciones: ['15 de julio de 1821', '15 de septiembre de 1821', '4 de julio de 1821', '18 de febrero de 1841'], correcta: 1, explicacion: 'El 15 de septiembre de 1821 se proclamó la Independencia de Centroamérica del dominio español.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Qué pueblo indígena era el más numeroso en El Salvador al llegar los españoles?', opciones: ['Los Mayas', 'Los Lencas', 'Los Pipiles', 'Los Aztecas'], correcta: 2, explicacion: 'Los Pipiles, de origen nahua emparentados con los aztecas, eran el grupo indígena más numeroso del territorio.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿En qué año El Salvador se separó definitivamente de la Federación Centroamericana?', opciones: ['1821', '1823', '1838', '1841'], correcta: 3, explicacion: 'El Salvador se constituyó como estado soberano el 18 de febrero de 1841 al separarse de la federación.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Quién es conocido como el "Padre de la Patria Salvadoreña"?', opciones: ['Anastasio Aquino', 'Pedro de Alvarado', 'José Matías Delgado', 'Francisco Morazán'], correcta: 2, explicacion: 'El sacerdote José Matías Delgado lideró los primeros movimientos independentistas de 1811 y 1814.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuál es la capital de El Salvador?', opciones: ['Santa Ana', 'San Salvador', 'Sonsonate', 'La Libertad'], correcta: 1, explicacion: 'San Salvador es la capital y ciudad más importante de El Salvador.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿En qué siglo llegó Pedro de Alvarado al territorio de Cuscatlán?', opciones: ['Siglo XV', 'Siglo XVI', 'Siglo XVII', 'Siglo XVIII'], correcta: 1, explicacion: 'Pedro de Alvarado llegó en 1524 durante el siglo XVI para conquistar el territorio.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuál era la religión principal de los pueblos indígenas salvadoreños?', opciones: ['Cristianismo', 'Politeísmo con dioses nahuas', 'Monoteísmo', 'Budismo'], correcta: 1, explicacion: 'Los pueblos indígenas practicaban el politeísmo, adorando a dioses de origen nahua como Quetzalcóatl.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Qué significa la palabra Cuscatlán en idioma Pipil?', opciones: ['Tierra de fuego', 'Lugar de las joyas y riquezas', 'Valle sagrado', 'Agua de las montañas'], correcta: 1, explicacion: 'Cuscatlán significa "lugar de las joyas y riquezas" en el idioma Pipil.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿A qué virreinato pertenecía administrativamente la Capitanía General de Guatemala?', opciones: ['Perú', 'Nueva España', 'Nueva Granada', 'Río de la Plata'], correcta: 1, explicacion: 'La Capitanía General de Guatemala, que incluía El Salvador, dependía del Virreinato de Nueva España.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿En qué fecha se celebra la Independencia de El Salvador?', opciones: ['15 de febrero', '15 de septiembre', '1 de noviembre', '14 de diciembre'], correcta: 1, explicacion: 'El 15 de septiembre se conmemora la Independencia de Centroamérica, incluido El Salvador.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuántos departamentos tiene El Salvador?', opciones: ['12', '14', '16', '18'], correcta: 1, explicacion: 'El Salvador está dividido en 14 departamentos administrativos.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Qué conquistador fue herido en la batalla del Acajutla?', opciones: ['Cortés', 'Pizarro', 'Pedro de Alvarado', 'Diego de Almagro'], correcta: 2, explicacion: 'Pedro de Alvarado fue herido en la batalla contra los Pipiles en el Río Acajutla.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuál fue el primer grito de independencia en El Salvador?', opciones: ['1808', '1811', '1815', '1821'], correcta: 1, explicacion: 'El primer grito de independencia ocurrió el 5 de noviembre de 1811, liderado por José Matías Delgado.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿En qué período se adoptó la Constitución de 1841?', opciones: ['Período de transición', 'Período independiente', 'Período federal', 'Período colonial'], correcta: 2, explicacion: 'Al separarse de la Federación, El Salvador adoptó su primera constitución como república independiente.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Qué importancia tuvo el café en la economía salvadoreña del siglo XIX?', opciones: ['Ninguna importante', 'Fue el principal producto de exportación', 'Solo exportación local', 'Solo consumo interno'], correcta: 1, explicacion: 'El café se convirtió en el motor económico de El Salvador a partir de la década de 1850.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿A qué grupo étnico pertenecían los Pipiles?', opciones: ['Mayas', 'Nahuas', 'Lencas', 'Pokomames'], correcta: 1, explicacion: 'Los Pipiles eran de origen nahua, emparentados con los pueblos del Valle de México.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuál era el idioma principal de los Pipiles?', opciones: ['Quiche', 'Nahua/Pipil', 'Lenca', 'Chorti'], correcta: 1, explicacion: 'Los Pipiles hablaban el idioma Pipil, una variante del Nahua.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿En cuánto tiempo aproximadamente se conquistó el territorio salvadoreño?', opciones: ['1 año', '3-5 años', '10 años', '20 años'], correcta: 1, explicacion: 'La conquista del territorio de Cuscatlán tomó aproximadamente 3-5 años, completándose alrededor de 1528.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuál era la actividad económica principal de los pueblos indígenas pre-hispanicos?', opciones: ['Ganadería', 'Agricultura y comercio', 'Minería', 'Industria textil'], correcta: 1, explicacion: 'Los pueblos indígenas se basaban en la agricultura (maíz, frijol, cacao) y el comercio activo.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Cuál era la capital prehispánica más importante del territorio?', opciones: ['Chalchuapa', 'Cuzcatlán', 'Cojutepeque', 'Sonsonate'], correcta: 1, explicacion: 'Cuzcatlán era la capital prehispánica más importante, ubicada en lo que es hoy La Libertad.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿Qué tipo de gobierno tenían los pueblos indígenas salvadoreños?', opciones: ['Monarquía absoluta', 'Señoríos independientes gobernados por caciques', 'República democrática', 'Teocracia pura'], correcta: 1, explicacion: 'El territorio estaba dividido en señoríos independientes, cada uno gobernado por su propio cacique o príncipe.' },
  { cat: 'historia', nivel: 'facil', pregunta: '¿En qué departamento actualmente existe la mayor evidencia de la civilización Pipil?', opciones: ['Chalatenango', 'Sonsonate', 'Cuscatlán', 'La Paz'], correcta: 2, explicacion: 'El departamento de Cuscatlán y sus alrededores conservan la mayor evidencia arqueológica de los Pipiles.' },

  // MEDIO (28)
  { cat: 'historia', nivel: 'medio', pregunta: '¿Qué cultivo fue la base de la economía colonial salvadoreña antes del café?', opciones: ['Cacao', 'Algodón', 'Añil', 'Caña de azúcar'], correcta: 2, explicacion: 'El añil (índigo), un tinte azul muy valorado en Europa, fue el principal producto de exportación colonial.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿En qué año se firmaron los Acuerdos de Paz de Chapultepec?', opciones: ['1989', '1990', '1992', '1994'], correcta: 2, explicacion: 'El 16 de enero de 1992 se firmaron los Acuerdos de Paz que pusieron fin a 12 años de conflicto armado.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Qué conquistador español intentó dominar Cuscatlán en 1524?', opciones: ['Hernán Cortés', 'Francisco Pizarro', 'Pedro de Alvarado', 'Diego de Almagro'], correcta: 2, explicacion: 'Pedro de Alvarado fue herido por los Pipiles en la batalla del Río Acajutla.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Cuántas víctimas se estima que dejó la Matanza de 1932?', opciones: ['Más de 5,000', 'Más de 10,000', 'Más de 20,000', 'Más de 30,000'], correcta: 3, explicacion: 'Se estima que más de 30,000 personas fueron masacradas en la rebelión de 1932.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Bajo qué virreinato perteneció El Salvador durante la época colonial?', opciones: ['Virreinato del Perú', 'Virreinato de Nueva España', 'Virreinato de Nueva Granada', 'Virreinato del Río de la Plata'], correcta: 1, explicacion: 'El Salvador fue parte de la Capitanía General de Guatemala, dependiente del Virreinato de Nueva España.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Cuál fue el nombre del pirata inglés que atacó San Salvador en 1667?', opciones: ['Henry Morgan', 'Bartholomew Roberts', 'Sir Francis Drake', 'John Hawkins'], correcta: 0, explicacion: 'Henry Morgan realizó varios ataques contra puertos y ciudades en Centroamérica, incluyendo San Salvador.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Quién fue Farabundo Martí?', opciones: ['Militar conservador', 'Líder comunista y revolucionario', 'Empresario cafetalero', 'Militar derechista'], correcta: 1, explicacion: 'Farabundo Martí fue un líder comunista que lideró la rebelión campesina e indígena de 1932.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿En qué año se libró la "Guerra del Fútbol" entre El Salvador y Honduras?', opciones: ['1965', '1967', '1969', '1971'], correcta: 2, explicacion: 'La Guerra del Fútbol ocurrió en 1969, originada tras enfrentamientos en partidos de fútbol y conflictos fronterizos.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Cuántos años duró la Guerra Civil Salvadoreña?', opciones: ['8 años', '10 años', '12 años', '15 años'], correcta: 2, explicacion: 'La Guerra Civil duró 12 años, de 1980 a 1992, hasta los Acuerdos de Paz de Chapultepec.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Quién fue Marcelino García Flamenco?', opciones: ['General victorioso', 'Presidente reformista', 'Poeta y periodista', 'Empresario minero'], correcta: 1, explicacion: 'García Flamenco fue presidente de El Salvador e impulsó reformas importantes en el siglo XIX.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿En qué año se estableció la moneda del dólar como oficial en El Salvador?', opciones: ['1999', '2000', '2001', '2002'], correcta: 2, explicacion: 'El Salvador adoptó el dólar estadounidense como moneda oficial el 1 de enero de 2001 con la "Ley de Integración Monetaria".' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Cuál fue el lema de la revolución de 1948 en El Salvador?', opciones: ['"Revolución de la Austeridad"', '"Revolución de Octubre"', '"Revolución de Diciembre"', '"Revolución de la Democracia"'], correcta: 1, explicacion: 'La Revolución de Octubre de 1948 derrocó al régimen militar precedente e impulsó cambios democráticos.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Quién fue Maximiliano Hernández Martínez?', opciones: ['Héroe nacional', 'Dictador militar del siglo XX', 'Prócer independentista', 'Conquistador español'], correcta: 1, explicacion: 'Maximiliano Hernández Martínez fue un dictador militar que gobernó El Salvador entre 1931 y 1944.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿En qué año se escindió la Federación Centroamericana por primera vez?', opciones: ['1838', '1839', '1840', '1841'], correcta: 0, explicacion: 'La Federación Centroamericana comenzó a desintegrarse en 1838, culminando con la salida de El Salvador.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Cuál fue la principal consecuencia de la Matanza de 1932?', opciones: ['Fin de la exportación de café', 'Represión contra indígenas y campesinos', 'Unificación de centroamérica', 'Democratización'], correcta: 1, explicacion: 'La matanza resultó en una represión severa contra la población indígena y campesina por décadas.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Qué fue el "Tratado de Esquipulas"?', opciones: ['Un acuerdo comercial', 'Un acuerdo de paz centroamericano de 1987', 'Una alianza militar', 'Un tratado territorial'], correcta: 1, explicacion: 'Los Acuerdos de Esquipulas II (1987) fueron un plan para la paz y la democratización de Centroamérica.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿En qué año se fundó la FMLN?', opciones: ['1975', '1977', '1979', '1980'], correcta: 1, explicacion: 'El Frente Farabundo Martí para la Liberación Nacional (FMLN) fue fundado en 1980 como coalición guerrillera.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Cuántos teatros de operaciones activos tuvo la Guerra Civil salvadoreña?', opciones: ['2', '3', '4', '5'], correcta: 2, explicacion: 'La guerra se desarrolló en múltiples teatros, principalmente en el norte, occidente y oriente del país.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Quién fue Prudencio Peralta Méndez?', opciones: ['Conquistador', 'Militar revolucionario', 'Empresario', 'Obispo'], correcta: 2, explicacion: 'Peralta fue un general que participó activamente en los conflictos salvadoreños del siglo XIX.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿En qué año se reforma la constitución para permitir reelección presidencial?', opciones: ['1950', '1962', '1983', '1994'], correcta: 1, explicacion: 'Se realizaron diversas reformas constitucionales en El Salvador, siendo 1962 un año de cambios significativos.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Cuál fue el evento que precedió inmediatamente a la Guerra Civil de 1980?', opciones: ['Golpe de 1979', 'Elecciones de 1982', 'Crisis económica de 1970', 'Terremoto de 1976'], correcta: 0, explicacion: 'El golpe militar del 15 de octubre de 1979 desestabilizó el país y llevó al inicio de la Guerra Civil.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿Cuántos signatarios había en los Acuerdos de Paz de Chapultepec?', opciones: ['FMLN y Gobierno', 'FMLN, Gobierno y ONU', 'FMLN, Gobierno, ONU e IDHUCA', 'FMLN, Gobierno y EE.UU.'], correcta: 1, explicacion: 'Los Acuerdos fueron suscritos por la FMLN, el Gobierno de El Salvador y la ONU como mediadora.' },
  { cat: 'historia', nivel: 'medio', pregunta: '¿En qué año se destituye al General Romero?', opciones: ['1977', '1979', '1980', '1982'], correcta: 1, explicacion: 'El General Carlos Humberto Romero fue derrocado en el golpe militar del 15 de octubre de 1979.' },

  // DIFÍCIL (28)
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Cuál fue el nombre del cacique Pipil que lideró la resistencia contra Pedro de Alvarado?', opciones: ['Lempira', 'Atlacatl', 'Nicarao', 'Tezozomoc'], correcta: 1, explicacion: 'Atlacatl fue el legendario jefe guerrero Pipil que encabezó la resistencia indígena contra la conquista.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Quién lideró el levantamiento indígena de 1833 en Nonualco?', opciones: ['Farabundo Martí', 'Anastasio Aquino', 'Felipe Xicotencatl', 'Miguel Cabrera'], correcta: 1, explicacion: 'Anastasio Aquino, conocido como el "Rey de los Nonualcos", lideró una rebelión campesina e indígena en 1833.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿En qué fecha fue asesinado el Arzobispo Óscar Romero?', opciones: ['16 enero de 1980', '24 de marzo de 1980', '15 de octubre de 1979', '11 de noviembre de 1989'], correcta: 1, explicacion: 'Óscar Romero fue asesinado el 24 de marzo de 1980 mientras celebraba misa.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Cuál fue el primer grito de independencia salvadoreño y en qué fecha?', opciones: ['5 de noviembre de 1811', '15 de septiembre de 1821', '24 de febrero de 1814', '2 de noviembre de 1811'], correcta: 0, explicacion: 'El primer grito de independencia ocurrió el 5 de noviembre de 1811, liderado por José Matías Delgado.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Qué tratado internacional reconoció los límites de El Salvador con Honduras?', opciones: ['Tratado de Paz de Lima', 'Tratado de Washington', 'Tratado General de Paz de 1980', 'Tratado de Esquipulas'], correcta: 2, explicacion: 'El Tratado General de Paz de 1980 estableció los límites territoriales entre El Salvador y Honduras.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿En qué departamento se ubica la antigua capital prehispánica de Cuzcatlán?', opciones: ['San Salvador', 'La Libertad', 'Cuscatlán', 'Chalatenango'], correcta: 1, explicacion: 'La capital prehispánica se ubicaba en lo que hoy es Antiguo Cuscatlán, en el departamento de La Libertad.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Cuál fue el nombre del golpe de estado de 1979?', opciones: ['La Revolución de Abril', 'El Golpe de los Militares Jóvenes', 'La Proclama Cívico-Militar', 'El Pronunciamiento del 15 de octubre'], correcta: 3, explicacion: 'El 15 de octubre de 1979 ocurrió "El Pronunciamiento del 15 de octubre" que derrocó al general Romero.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Cómo se llama el sector que históricamente dominó la política salvadoreña?', opciones: ['El Círculo de Oro', 'Las 14 Familias', 'La Élite del Café', 'Los Señores de la Tierra'], correcta: 1, explicacion: 'Las "14 Familias" es el término popular para referirse a la oligarquía cafetalera del siglo XX.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Quién fue designado como presidente durante los Acuerdos de Paz?', opciones: ['Alfredo Cristiani', 'José Napoleón Duarte', 'Cristiani', 'Funes'], correcta: 0, explicacion: 'Alfredo Cristiani fue el presidente durante la firma de los Acuerdos de Paz de Chapultepec en 1992.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿En qué batalla fueron derrotados definitivamente los Pipiles por los españoles?', opciones: ['Batalla del Acajutla', 'Batalla de San Salvador', 'Batalla de Cuzcatlán', 'Batalla de Chalchuapa'], correcta: 0, explicacion: 'Aunque Alvarado fue inicialmente herido, los españoles finalmente ganaron el control territorial.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Cuál era la estructura administrativa colonial de El Salvador?', opciones: ['Virreinato independiente', 'Provincia de la Capitanía General de Guatemala', 'Gobernación autónoma', 'Alcaldía Mayor directa'], correcta: 1, explicacion: 'El Salvador fue una Provincia de la Capitanía General de Guatemala durante la época colonial.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Qué reforma importante realizó Barrios en el siglo XIX?', opciones: ['Liberalización económica', 'Reforma agraria', 'Democratización', 'Nacionalización del café'], correcta: 0, explicacion: 'Justo Rufino Barrios impulsó reformas liberales que modernizaron Centroamérica en la década de 1870.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Cuántos comandantes guerrilleros principales lideraban la FMLN?', opciones: ['3', '4', '5', '6'], correcta: 2, explicacion: 'La FMLN estaba compuesta por 5 organizaciones guerrilleras con sus comandantes principales.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Qué acuerdo internacional patrocinó los Acuerdos de Paz?', opciones: ['Liga de Naciones', 'Organización de Naciones Unidas', 'Organización de Países Americanos', 'Unión Europeo'], correcta: 1, explicacion: 'La Organización de Naciones Unidas (ONU) fue la mediadora oficial en los Acuerdos de Paz de 1992.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿En qué época se produjo la mayor migración salvadoreña hacia Estados Unidos?', opciones: ['Década de 1950', 'Década de 1970', 'Década de 1980-1990', 'Década del 2000'], correcta: 2, explicacion: 'La Guerra Civil de 1980-1992 causó la mayor migración de salvadoreños hacia Estados Unidos.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Cuál fue la primera colonia establecida por los españoles en El Salvador?', opciones: ['San Vicente', 'San Salvador', 'Sonsonate', 'Santa Ana'], correcta: 2, explicacion: 'Sonsonate fue una de las primeras colonias españolas establecidas en el territorio salvadoreño.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Quién escribió la Constitución de 1886 de El Salvador?', opciones: ['Santiago González', 'Marcelino García Flamenco', 'Rafael Antonio Gutiérrez', 'Prudencio Peralta'], correcta: 2, explicacion: 'La Constitución de 1886 fue importante en la formación del estado salvadoreño moderno.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿En qué año terminó oficialmente la presencia española en El Salvador?', opciones: ['1811', '1821', '1841', '1900'], correcta: 1, explicacion: 'Con la independencia centroamericana en 1821, terminó la presencia española en El Salvador.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Qué provocó la fractura de la Federación Centroamericana?', opciones: ['Invasión inglesa', 'Diferencias políticas y económicas entre estados', 'Terremoto', 'Revolución francesa'], correcta: 1, explicacion: 'Las diferencias políticas, conservador vs. liberal, y los intereses económicos divergentes causaron la desintegración.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Qué ciudad fue la capital de El Salvador durante la época federal?', opciones: ['San Vicente', 'San Salvador', 'Santa Ana', 'La Libertad'], correcta: 1, explicacion: 'San Salvador fue la capital durante el período de la Federación Centroamericana.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Cuál fue la principal causa de la Guerra del Fútbol de 1969?', opciones: ['Solo rivalidad deportiva', 'Conflictos fronterizos y tensiones migratorias', 'Disputa por recursos mineros', 'Intervención estadounidense'], correcta: 1, explicacion: 'La guerra fue resultado de conflictos fronterizos, deportivos y la migración salvadoreña en Honduras.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Qué institución moderaba el conflicto en los Acuerdos de Paz?', opciones: ['Cruz Roja', 'Organización de Naciones Unidas', 'Organización de Estados Americanos', 'Liga Árabe'], correcta: 1, explicacion: 'La ONU jugó un papel crucial como moderadora y verificadora de los Acuerdos de Paz.' },
  { cat: 'historia', nivel: 'dificil', pregunta: '¿Cuántas constituciones ha tenido El Salvador en su historia?', opciones: ['5', '6', '7', '8'], correcta: 2, explicacion: 'El Salvador ha tenido varias constituciones, siendo la actual de 1983 con numerosas reformas.' },

  // 100% GUANACO (28)
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Cuál fue el símbolo heráldico del reino Pipil?', opciones: ['El águila imperial', 'El quetzal', 'El jaguar', 'La serpiente emplumada'], correcta: 3, explicacion: 'La serpiente emplumada (Quetzalcóatl) era un símbolo principal en la cosmogonía nahua.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿En qué río ocurrió la batalla más importante contra Pedro de Alvarado?', opciones: ['Río Lempa', 'Río Acajutla', 'Río Grande', 'Río Paz'], correcta: 1, explicacion: 'El Río Acajutla fue el sitio donde los Pipiles dieron su resistencia más feroz a Pedro de Alvarado.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Qué significa etimológicamente "Cuscatlán" en su sentido profundo?', opciones: ['Tierra de los dioses', 'Lugar de las joyas y riquezas abundantes', 'Valle sagrado de agua', 'Montaña del águila'], correcta: 1, explicacion: 'Cuscatlán del náhuatl "Cōzcatl" (joya) y "tlān" (lugar), significa literalmente "lugar de joyas".' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Cuál fue la moneda de cambio principal entre los Pipiles?', opciones: ['Oro en polvo', 'Cacao en grano', 'Sal', 'Plumas de quetzal'], correcta: 1, explicacion: 'El cacao era la principal moneda de cambio y símbolo de riqueza en las culturas mesoamericanas.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿A qué se llamaba "tlatoani" en la sociedad Pipil?', opciones: ['Guerrero legendario', 'Sacerdote máximo', 'Gobernante/Rey', 'Mercader principal'], correcta: 2, explicacion: 'Tlatoani significa "el que habla" y se refería al gobernante supremo en la sociedad nahua.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Qué cultivos principales proporcionaba tributo la región de Cuscatlán?', opciones: ['Trigo y cebada', 'Maíz, cacao y algodón', 'Café y plátano', 'Arroz y yuca'], correcta: 1, explicacion: 'Los tributos principales del territorio incluían maíz, cacao, algodón y otros productos valiosos.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Cuál fue la organización política más pequeña pero estratégica de los Pipiles?', opciones: ['El imperio', 'El señorío', 'La alianza tribal', 'El consejo'], correcta: 1, explicacion: 'Los señoríos eran entidades políticas independientes gobernadas por caciques o tlatoanis.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Qué deidad era considerada la más importante entre los Pipiles?', opciones: ['Tezcatlipoca', 'Quetzalcóatl', 'Tláloc', 'Huitzilopochtli'], correcta: 1, explicacion: 'Quetzalcóatl, la serpiente emplumada, era una de las deidades más veneradas.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Cuántos glifos aproximadamente componían el sistema de escritura Nahua?', opciones: ['500', '800', '1000', '1500'], correcta: 2, explicacion: 'El sistema de escritura nahua contaba con aproximadamente 1000 glifos ideográficos y fonéticos.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Qué era el "Xacatl" en la cosmología Pipil?', opciones: ['Un tipo de arma', 'Un calendario ceremonial', 'Una forma de tributo', 'Un dios de la lluvia'], correcta: 1, explicacion: 'El calendario mesoamericano funcionaba con ciclos de 52 años con importancia ceremonial profunda.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Cuál era la estructura social más opresiva para los no-nobles Pipiles?', opciones: ['Sistema de castas', 'Esclavitud ritual', 'Tributo y trabajo obligatorio (tequio)', 'Servidumbre'], correcta: 2, explicacion: 'El tequio era un sistema de trabajo obligatorio que pagaban los pueblos conquistados y sometidos.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Qué evento histórico marcó el fin de la Federación Centroamericana definitivamente?', opciones: ['Separación de Guatemala', 'Reforma de Barrios', 'Muerte de Morazán en 1842', 'Guerra con Estados Unidos'], correcta: 2, explicacion: 'La ejecución de Francisco Morazán en 1842 simbolizó el fin definitivo de los intentos federalistas.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Cuál fue la ideología predominante que llevó al golpe de 1979?', opciones: ['Socialismo', 'Militarismo progresista', 'Liberalismo', 'Comunismo'], correcta: 1, explicacion: 'Oficiales militares jóvenes con ideología progresista ejecutaron el golpe de 1979 contra el General Romero.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Qué organización internacional verificaba el cumplimiento de los Acuerdos de Paz?', opciones: ['ONUCA', 'CEPAL', 'ALCA', 'SICA'], correcta: 0, explicacion: 'La Misión de Observadores de Naciones Unidas en Centroamérica (ONUCA) verificaba los acuerdos.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Cuál fue el principal cambio geopolítico tras los Acuerdos de Paz?', opciones: ['Integración con México', 'Independencia militar de EE.UU.', 'Transición a democracia civil', 'Unificación centroamericana'], correcta: 2, explicacion: 'Los Acuerdos marcaron la transición de un régimen militar a la democracia civil salvadoreña.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Qué significado tiene "guanaco" en la cultura salvadoreña?', opciones: ['Guerrero valiente', 'Persona de origen salvadoreño auténtico', 'Animal sagrado', 'Jefe de aldea'], correcta: 1, explicacion: '"Guanaco" es un término afectuoso para referirse a una persona verdaderamente salvadoreña y auténtica.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Cuántas fases distintas tuvo la Guerra Civil salvadoreña?', opciones: ['2', '3', '4', '5'], correcta: 3, explicacion: 'La guerra pasó por fases de ofensiva guerrillera, contraofensiva militar, estancamiento y negociación.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Cuál fue la masacre más documentada durante la Guerra Civil?', opciones: ['El Mozote', 'La Rutilla', 'San Antonio Abad', 'Las Vueltas'], correcta: 0, explicacion: 'La masacre de El Mozote en 1981 es considerada la más grave, con cientos de civiles asesinados.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Qué significado histórico tuvo la toma de San Salvador en 1989?', opciones: ['Fin de la guerra', 'Demostración de capacidad militar guerrillera', 'Rendición de la FMLN', 'Intervención de EE.UU.'], correcta: 1, explicacion: 'La Ofensiva del 89 demostró que la FMLN tenía capacidad para atacar la capital y acelerar negociaciones.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Quién fue Monseñor Óscar Romero antes de ser Arzobispo?', opciones: ['Obispo de Cojutepeque', 'Obispo de Santiago de María', 'Sacerdote rural', 'Profesor de seminario'], correcta: 1, explicacion: 'Óscar Romero fue Obispo de Santiago de María antes de ser nombrado Arzobispo de San Salvador.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: '¿Cuál era la base ideológica de José Matías Delgado?', opciones: ['Iluminismo radical', 'Reformismo católico y seglar', 'Comunismo primitivo', 'Anarquismo'], correcta: 1, explicacion: 'Delgado era un sacerdote reformista influenciado por el pensamiento ilustrado del siglo XVIII.' },

  /* ═════════════════════════════════════════════════════════
     GASTRONOMÍA — 28 PREGUNTAS POR NIVEL (más compacto)
     ═════════════════════════════════════════════════════════ */
  
  // FÁCIL (10 del original + 18 nuevas = 28)
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Cuál es el plato nacional de El Salvador?', opciones: ['Las baleadas', 'Las pupusas', 'La sopa de pata', 'Los tamales'], correcta: 1, explicacion: 'Las pupusas son el plato nacional, declaradas Patrimonio Cultural Intangible.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Con qué siempre se acompañan las pupusas?', opciones: ['Con arroz y frijoles', 'Con curtido y salsa de tomate', 'Con crema y queso', 'Con chimol'], correcta: 1, explicacion: 'Las pupusas se sirven siempre con curtido y salsa de tomate casera.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿De qué están hechas las pupusas de arroz?', opciones: ['Harina de trigo', 'Masa de arroz molido', 'Harina de maíz amarillo', 'Masa de yuca'], correcta: 1, explicacion: 'Las pupusas de arroz se elaboran con masa de arroz molido.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Cuál es el relleno tradicional más popular de las pupusas?', opciones: ['Solo queso', 'Queso y loroco', 'Solo frijoles', 'Camarones'], correcta: 1, explicacion: 'El relleno de queso y loroco es el más popular y tradicional en El Salvador.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Qué es el loroco?', opciones: ['Una fruta', 'Una flor comestible', 'Un tipo de frijol', 'Una hierba aromática'], correcta: 1, explicacion: 'El loroco es una flor comestible nativa de Centroamérica, muy usada en la gastronomía salvadoreña.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Qué bebida tradicional se prepara con maíz en El Salvador?', opciones: ['Té de manzanilla', 'Atol', 'Agua de avena', 'Jugo de caña'], correcta: 1, explicacion: 'El atol es una bebida tradicional hecha a base de maíz molido, muy consumida en desayunos.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Cuáles son los tamales más típicos de El Salvador?', opciones: ['Tamales dulces', 'Tamales de pollo y verde', 'Tamales de chile', 'Tamales de queso'], correcta: 1, explicacion: 'Los tamales de pollo y verde (maíz) son los más típicos de la gastronomía salvadoreña.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Qué es la arepa?', opciones: ['Un postre', 'Un pan de maíz frito', 'Un tipo de sopa', 'Una bebida'], correcta: 1, explicacion: 'La arepa es un pan hecho de masa de maíz, redondo y frito, muy común en El Salvador.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Cuál es el postre más típico de las festividades en El Salvador?', opciones: ['Flan', 'Arroz con leche', 'Quesadilla salvadoreña', 'Helado'], correcta: 2, explicacion: 'La quesadilla salvadoreña (de queso y ayote) es un postre tradicional especial en festividades.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿En qué mes se celebra el Día Nacional de la Pupusa?', opciones: ['Octubre', 'Noviembre', 'Diciembre', 'Enero'], correcta: 1, explicacion: 'El Día Nacional de la Pupusa se celebra el segundo domingo de noviembre desde 2005.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Qué ingrediente básico no puede faltar en una pupusa?', opciones: ['Queso', 'Frijoles', 'Masa de maíz', 'Loroco'], correcta: 2, explicacion: 'La masa de maíz es el ingrediente fundamental de toda pupusa salvadoreña.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿De dónde proviene originalmente la receta de las pupusas?', opciones: ['México', 'Pueblos indígenas de El Salvador', 'Guatemala', 'Nicaragua'], correcta: 1, explicacion: 'Las pupusas tienen raíces en la gastronomía de los pueblos indígenas de El Salvador.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Qué es el chimol?', opciones: ['Una salsa de tomate', 'Un condimento de maíz', 'Una bebida', 'Una verdura'], correcta: 0, explicacion: 'El chimol es una salsa hecha con tomate, cebolla, chile y otras especias salvadoreñas.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Cuál es la sopa más popular en El Salvador?', opciones: ['Sopa de pollo', 'Sopa de marisco', 'Sopa de pata', 'Caldo de camarón'], correcta: 2, explicacion: 'La sopa de pata es una sopa tradicional muy popular, especialmente en festejos y fines de semana.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Con qué se acompaña típicamente la sopa de pata?', opciones: ['Tortillas finas', 'Pan de elote', 'Plátano frito', 'Avena'], correcta: 0, explicacion: 'La sopa de pata se acompaña tradicionalmente con tortillas de maíz finas y crema.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Qué es el plátano preparado que es acompañamiento común?', opciones: ['Plátano crudo', 'Plátano frito', 'Plátano hervido', 'Plátano asado'], correcta: 1, explicacion: 'El plátano frito es un acompañamiento clásico en la comida salvadoreña, especialmente en el desayuno.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Cuál es la bebida típica con maíz tostado?', opciones: ['Pozol', 'Agua de cebada', 'Café de maíz', 'Atol de elote'], correcta: 0, explicacion: 'El pozol es una bebida tradicional hecha con maíz y otros ingredientes, muy consumida en verano.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Qué significa "pupusa" etimológicamente?', opciones: ['Comida rellena', 'Pan inflado', 'Masa blanda', 'Comida rápida'], correcta: 2, explicacion: 'Pupusa proviene del pipil "pupuça" que significa "masa blanda" o "cosa inflada".' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿En cuál región de El Salvador se originan las pupusas?', opciones: ['Oriente', 'Centro', 'Occidente', 'Costa'], correcta: 2, explicacion: 'Las pupusas se originaron en la región occidental de El Salvador, especialmente en Ahuachapán y Sonsonate.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Qué tipo de maíz se usa tradicionalmente para hacer pupusas?', opciones: ['Maíz amarillo', 'Maíz blanco criollo', 'Maíz reventador', 'Maíz dulce'], correcta: 1, explicacion: 'Se usa maíz blanco criollo que se muele en masa fresca para preparar las pupusas auténticas.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: '¿Qué bebida se sirve comúnmente en desayunos con atol?', opciones: ['Café americano', 'Café tinto', 'Agua de horchata', 'Leche evaporada'], correcta: 1, explicacion: 'El café tinto (negro) es la bebida tradicional que acompaña al atol en los desayunos salvadoreños.' },

  // MEDIO (10 del original + 18 nuevas)
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Qué variantes de pupusas rellenas existen en El Salvador?', opciones: ['Solo 2 tipos', 'Queso, frijoles, loroco, chicharrón, camarón, y más', 'Solo de queso', 'Solo de verduras'], correcta: 1, explicacion: 'Existen múltiples variedades con diferentes rellenos según la región y creatividad.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Cuál es la preparación correcta del curtido?', opciones: ['Repollo crudo picado', 'Repollo fermentado con vinagre y especias', 'Repollo cocido', 'Repollo encurtido en agua'], correcta: 1, explicacion: 'El curtido es repollo fermentado con zanahoria, cebolla, chile y vinagre en un proceso de encurtido.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Qué método de cocción se usa para hacer pupusas auténticas?', opciones: ['Horno', 'Comal o plancha', 'Sartén profunda', 'Olla'], correcta: 1, explicacion: 'Las pupusas se cuecen en un comal o plancha de barro/metal a fuego medio hasta dorarse.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Cuál es la consistencia correcta de la masa para pupusas?', opciones: ['Muy suave', 'Firme pero moldeable', 'Muy dura', 'Muy mojada'], correcta: 1, explicacion: 'La masa debe estar firme y moldeable, ni muy suave ni muy dura, para poder rellenarla correctamente.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿A qué se conoce como "pupusa revuelta"?', opciones: ['Pupusa sin relleno', 'Pupusa con mezcla de varios rellenos', 'Pupusa rota', 'Pupusa pequeña'], correcta: 1, explicacion: 'La pupusa revuelta lleva una mezcla de rellenos como queso, frijoles y chicharrón.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Qué papel tiene el yuca en la gastronomía salvadoreña?', opciones: ['Solo especia', 'Acompañamiento y base de postres', 'Bebida', 'Raramente usado'], correcta: 1, explicacion: 'La yuca es un alimento versátil, usada como acompañamiento frito o en preparaciones variadas.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Cuál es la diferencia entre pan de yuca y pupusa?', opciones: ['Ninguna', 'Pan de yuca es harina de yuca, pupusa es masa de maíz', 'Pan de yuca es más grande', 'Igual preparación'], correcta: 1, explicacion: 'Pan de yuca se hace con harina de yuca rallada mientras que pupusa usa masa de maíz molido.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Qué es la "enchilada salvadoreña"?', opciones: ['Torta de maíz con salsa', 'Tortilla enrollada con carne y salsa picante', 'Pupusa rellena de chile', 'Arepa con chimol'], correcta: 1, explicacion: 'La enchilada salvadoreña es una tortilla de maíz enrollada con relleno de carne y salsa.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Cuál es la importancia cultural de las pupusas en las festividades?', opciones: ['Nula', 'Son elemento central en cumpleaños y celebraciones', 'Solo se comen solos', 'Reciente invención'], correcta: 1, explicacion: 'Las pupusas son elemento central en casi todas las festividades y celebraciones salvadoreñas.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Qué técnica se usa para hacer tortillas de harina en El Salvador?', opciones: ['Prensa manual', 'Molino de maíz', 'Mano sobre la masa', 'Rodillo'], correcta: 0, explicacion: 'Tradicionalmente se usa una prensa de madera o metal para hacer tortillas uniformes.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Cuál es la bebida típica navideña salvadoreña?', opciones: ['Champurrada', 'Ponche de frutas', 'Horchata', 'Agua de azafrán'], correcta: 0, explicacion: 'La champurrada es una bebida navideña típica hecha a base de maíz, piloncillo y especias.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Qué utilidad tiene el piloncillo en la cocina salvadoreña?', opciones: ['Solo como bebida', 'Endulzante y base de postres', 'Raramente usado', 'Solo para café'], correcta: 1, explicacion: 'El piloncillo es un endulzante natural versátil, usado en bebidas, postres y alimentos salados.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Cuáles son los ingredientes básicos del atol?', opciones: ['Harina, agua, sal', 'Maíz molido, leche, azúcar, canela', 'Solo maíz y agua', 'Arroz y leche'], correcta: 1, explicacion: 'El atol se prepara con maíz molido, leche (o agua), azúcar y se aromatiza con canela.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Qué variante de atol es típica de los desayunos colados?', opciones: ['Atol de elote', 'Atol blanco o atol de maíz', 'Atol de plátano', 'Atol de frijol'], correcta: 1, explicacion: 'El atol blanco es el más común en desayunos, hecho con maíz blanco colado.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Cuánto tiempo se deja fermentar el curtido?', opciones: ['No se fermenta', '2-3 horas mínimo', 'Toda la noche', 'Una semana'], correcta: 1, explicacion: 'El curtido típicamente fermenta 2-3 horas o más para desarrollar su sabor característico.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Cuál es la función del loroco en la gastronomía salvadoreña?', opciones: ['Solo decoración', 'Sabor único y distintivo en pupusas y comidas', 'Medicinal', 'Relleno sin sabor'], correcta: 1, explicacion: 'El loroco proporciona un sabor único y floral que es distintivo en la cocina salvadoreña.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Qué diferencia hay entre pan de yuca y pupusa en textura?', opciones: ['Ninguna', 'Pan de yuca es más crujiente, pupusa es suave', 'Pupusa es crujiente', 'Igual textura'], correcta: 1, explicacion: 'Pan de yuca es más crujiente y poroso, mientras que pupusa es suave y densa.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Cuál es la bebida típica con cacao en El Salvador?', opciones: ['Café tinto', 'Chocolate salvadoreño', 'Atol de cacao', 'Agua de vainilla'], correcta: 1, explicacion: 'El chocolate salvadoreño, hecho con cacao local molido, es una bebida tradicional especial.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: '¿Qué factor determina la autenticidad de una pupusa?', opciones: ['Solo el tamaño', 'Ingredientes frescos y preparación tradicional', 'El tipo de plancha', 'La cantidad de relleno'], correcta: 1, explicacion: 'La autenticidad viene de usar ingredientes frescos y respetar la receta tradicional transmitida.' },

  // DIFÍCIL (10 del original + 18 nuevas)
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Cuál es el origen exacto de la palabra "pupusa" según lingüistas?', opciones: ['Español colonial', 'Pipil prehispánico: pu (abultado) + puca (cosa blanca)', 'Portugués', 'Árabe'], correcta: 1, explicacion: 'Deriva del pipil: "pu" (inflado) y "puca" (cosa blanca), descripción exacta de la pupusa.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Cuál es la técnica culinaria exacta para lograr la "piel crocante" de la pupusa?', opciones: ['Altísima temperatura', 'Temperatura media con tiempo correcto y volteo preciso', 'Baja temperatura', 'Doble cocción'], correcta: 1, explicacion: 'Se requiere temperatura media y volteos precisos para dorar sin quemar, logrando la textura ideal.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Cuál es el proceso de fermentación exacto del curtido tradicional?', opciones: ['Encurtido químico', 'Fermentación láctica natural de 48-72 horas', 'Cocción al vinagre', 'Congelación'], correcta: 1, explicacion: 'El curtido genuino usa fermentación láctica durante 48-72 horas con microorganismos benéficos.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Qué enzimas están presentes en el proceso de molido del maíz nixtamalizado?', opciones: ['Amilasas', 'Proteasas y peptidasas que cambian propiedades', 'Lipasas', 'Glucosidasas'], correcta: 1, explicacion: 'La nixtamalización activa proteasas que hacen el maíz más nutritivo y digerible.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Cuál es el pH óptimo del curtido fermentado?', opciones: ['4.5-5.5', '6-7', '3.5-4', '7-8'], correcta: 2, explicacion: 'El pH ácido de 3.5-4 preserva el curtido y proporciona su sabor característico.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Qué tipo de harina se usaba prehispánicamente para pupusas o alimentos similares?', opciones: ['Harina de trigo', 'Maíz molido en metate', 'Harina de cebada', 'Masa de yuca'], correcta: 1, explicacion: 'Los pueblos indígenas usaban piedras (metates) para moler maíz nixtamalizado en masa fresca.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Cuál es la composición química exacta del loroco?', opciones: ['Solo proteína', 'Proteínas, fibra, vitaminas A y C principalmente', 'Solo carbohidratos', 'Principalmente grasas'], correcta: 1, explicacion: 'El loroco es rico en vitamina C, vitamina A, fibra y proteínas, además de compuestos aromáticos.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Qué diferencia nutricional existe entre atol de maíz blanco y amarillo?', opciones: ['Ninguna', 'Amarillo tiene más betacaroteno', 'Blanco tiene más proteína', 'Amarillo es más digerible'], correcta: 1, explicacion: 'El maíz amarillo contiene más betacaroteno (precursor de vitamina A) que el blanco.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Cuál es el proceso de nixtamalización y su importancia?', opciones: ['Cocción simple', 'Cocción en cal para liberar niacina e aumentar biodisponibilidad', 'Fermentación del maíz', 'Secado al sol'], correcta: 1, explicacion: 'La nixtamalización (cocción en hidróxido de calcio) hace el maíz más nutritivo y digestible.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Qué variedad de loroco es específicamente salvadoreña?', opciones: ['Loroco púrpura', 'Loroco salvadoreño (Fernaldia pandurata)', 'Loroco rojo', 'Loroco dorado'], correcta: 1, explicacion: 'El Fernaldia pandurata es la especie de loroco nativa y distintiva de El Salvador y Centroamérica.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Cuál era el papel del pulque en la cocina prehispánica salvadoreña?', opciones: ['No se usaba', 'Bebida ceremonial importante', 'Solo medicinal', 'Bebida diaria común'], correcta: 1, explicacion: 'El pulque tenía importancia ceremonial en contextos rituales prehispánicos.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿En qué departamento se cultiva el loroco más fino y aromático?', opciones: ['Santa Ana', 'Sonsonate', 'Cuscatlán', 'La Paz'], correcta: 1, explicacion: 'Sonsonate, especialmente en zonas de altura, produce el loroco más aromático y de mejor calidad.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Cuál es la bacteria principal responsable de la fermentación del curtido?', opciones: ['E. coli', 'Lactobacillus species', 'Salmonella', 'Staphylococcus'], correcta: 1, explicacion: 'Las bacterias Lactobacillus producen ácido láctico, creando el ambiente fermentativo.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Cuál es el rendimiento promedio de maíz a masa en la preparación de pupusas?', opciones: ['50%', '60-70%', '80-90%', '99%'], correcta: 1, explicacion: 'Aproximadamente 60-70% del peso del maíz se convierte en masa utilizable para pupusas.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Qué técnica de cocción minimiza la pérdida de nutrientes en el atol?', opciones: ['Hervir prolongadamente', 'Cocción suave y rápida sin exceso de calor', 'Freír el maíz', 'Horno'], correcta: 1, explicacion: 'La cocción moderada y rápida preserva mejor vitaminas termosensibles como la vitamina C.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Cuál es la relación correcta de maíz a agua en atol tradicional?', opciones: ['1:2', '1:3 a 1:5 dependiendo de consistencia deseada', '1:1', '1:10'], correcta: 1, explicacion: 'La proporción varía según si se desea atol más espeso (1:3) o más líquido (1:5).' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Qué microorganismo podría contaminar un curtido mal fermentado?', opciones: ['Solo bacterias benéficas', 'Mohos, levaduras patógenas y bacterias dañinas', 'Virus únicamente', 'Nada, es imposible'], correcta: 1, explicacion: 'Un curtido con mal proceso fermentativo puede contaminarse con mohos, Salmonella u otras patógenas.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Cuál es la importancia de la temperatura en la fermentación del curtido?', opciones: ['Irrelevante', 'Crítica: 18-25°C favorece Lactobacillus', 'Mayor temperatura es siempre mejor', 'Congelación es óptima'], correcta: 1, explicacion: 'Temperaturas de 18-25°C son óptimas para el crecimiento de bacterias lácticas beneficiosas.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: '¿Qué componentes químicos hacen al loroco aromático?', opciones: ['Solo agua y fibra', 'Aceites esenciales, aldehdos y compuestos volátiles', 'Glucosa simple', 'Proteína bruta'], correcta: 1, explicacion: 'Los aceites esenciales y compuestos aromáticos volátiles dan al loroco su aroma y sabor únicos.' },

  // 100% GUANACO GASTRONOMÍA (28)
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Cuál era la bebida ritual más importante en la ceremonia prehispánica del cacao?', opciones: ['Atol', 'Chocolate espumoso xocolatl', 'Pulque', 'Agua de cebada'], correcta: 1, explicacion: 'El xocolatl era una bebida ritual sagrada servida en ceremonias importantes de los pueblos nahuas.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Cuántos tipos exactos de chiles se usan en la gastronomía salvadoreña?', opciones: ['2', 'Más de 8 variedades regionales', '4', '6'], correcta: 1, explicacion: 'El Salvador usa chile mora, chile verde, chile rojo, chile macho y otras variedades regionales.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Cuál es la técnica ancestral de conservación de alimentos usada?', opciones: ['Refrigeración', 'Secado al sol y ahumado', 'Congelación', 'Enlatado'], correcta: 1, explicacion: 'Las técnicas ancestrales incluyen secado al sol, ahumado y fermentación para preservar alimentos.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Qué significado tiene la pupusa en la identidad cultural salvadoreña moderna?', opciones: ['Solo comida rápida', 'Símbolo de identidad nacional y patrimonio cultural vivo', 'Comida pobre', 'Invención reciente'], correcta: 1, explicacion: 'La pupusa representa la identidad salvadoreña, siendo declarada Patrimonio Cultural Inmaterial.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Cuál es el proceso de preparación del ayote para quesadillas?', opciones: ['Rallado crudo', 'Cocción, deshidratación y molido fino', 'Frito entero', 'Hervido solo'], correcta: 1, explicacion: 'El ayote se cocina, se deshidrata y se muele fino para hacer la mezcla de quesadilla.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Qué técnica ancestral se usa para tostar maíz para pozol?', opciones: ['Horno moderno', 'Comal sobre fuego directo con agitación constante', 'Sartén profunda', 'Agua hirviendo'], correcta: 1, explicacion: 'El maíz se tuesta en comal caliente con agitación para desarrollo de sabor característico.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Cuál es la composición exacta del chimol salvadoreño auténtico?', opciones: ['Solo tomate', 'Tomate, cebolla, chile, cilantro, comino en proporciones específicas', 'Solo cebolla y chile', 'Vinagre y tomate'], correcta: 1, explicacion: 'El chimol auténtico es una mezcla balanceada de tomate, cebolla, chile, cilantro y especias.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Qué tipo de agua se usa tradicionalmente para la masa de pupusas?', opciones: ['Agua corriente', 'Agua tibia para activar gluten de forma óptima', 'Agua fría', 'Agua hervida'], correcta: 1, explicacion: 'Agua tibia ayuda a desarrollar la estructura gluten-almidón óptima de la masa.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Cuáles son los cinco sabores fundamentales de la cocina salvadoreña?', opciones: ['5 sabores básicos universales', 'Salado, ácido, picante, dulce y umami regional', 'Solo salado y picante', 'Amargo y astringente'], correcta: 1, explicacion: 'La gastronomía salvadoreña equilibra salado, ácido (curtido), picante, dulce y umami (caldo).' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Qué función tiene el metabolismo de la fermentación en el curtido?', opciones: ['Destruir nutrientes', 'Aumentar probióticos y biodisponibilidad de minerales', 'Solo cambiar sabor', 'Reducir vitaminas'], correcta: 1, explicacion: 'La fermentación crea probióticos beneficiosos y mejora la absorción de calcio y hierro.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Cuál es el tiempo exacto óptimo para la fermentación del curtido?', opciones: ['Instantáneo', '48-72 horas a 20-22°C para sabor y seguridad óptimos', '2 semanas', 'Meses'], correcta: 1, explicacion: 'El rango óptimo es 48-72 horas, después comienza degradación enzimática excesiva.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Qué enfoque culinario caracteriza la cocina salvadoreña: local, regional o internacional?', opciones: ['Principalmente internacional', 'Profundamente arraigada en ingredientes y técnicas locales y regionales', 'Mayormente europea', 'Totalmente nómada'], correcta: 1, explicacion: 'La cocina salvadoreña es fundamentalmente local, usando ingredientes y técnicas ancestrales.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Cuál es la historia de la adopción del maíz en la dieta salvadoreña?', opciones: ['Reciente (siglos XIX-XX)', 'Central desde hace 3000+ años en la región mesoamericana', 'Nunca adoptado realmente', 'Desde la conquista'], correcta: 1, explicacion: 'El maíz ha sido central en la región mesoamericana desde hace más de 3000 años.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Qué papel tiene el cacao en la historia de El Salvador?', opciones: ['Ninguno importante', 'Cultivo valioso prehispánico, luego reemplazado por el café', 'Siempre fue igual importante que ahora', 'Introducción española pura'], correcta: 1, explicacion: 'El cacao era cultivo importante prehispánico que perdió relevancia con la introducción del café.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Cuál es la importancia cultural de comer en grupo (pupusadas)?', opciones: ['Solo economía', 'Refuerzo de identidad comunitaria y vínculos sociales', 'Moda reciente', 'Sin importancia'], correcta: 1, explicacion: 'Las pupusadas son encuentros sociales que refuerzan la identidad y solidaridad comunitaria.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Cuál es la relación entre clima y sabor en ingredientes salvadoreños?', opciones: ['Ninguna relación', 'Directa: clima tropical produce sabores intensos únicos', 'Solo afecta tamaño', 'Afecta solo precio'], correcta: 1, explicacion: 'El clima tropical salvadoreño concentra sabores en ingredientes, haciéndolos particularmente aromáticos.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Qué innovación reciente ha impactado la cocina salvadoreña tradicional?', opciones: ['Eliminación de tradiciones', 'Fusión creativa manteniendo raíces ancestrales', 'Globalización destructiva', 'Nada ha cambiado'], correcta: 1, explicacion: 'Chefs salvadoreños modernos fusionan técnicas contemporáneas con ingredientes y sabores ancestrales.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Cuál es la ciencia detrás del "dorado perfecto" de una pupusa?', opciones: ['Suerte', 'Reacción de Maillard entre proteínas y carbohidratos a 140-160°C', 'Solo cocción larga', 'Color natural del maíz'], correcta: 1, explicacion: 'La reacción de Maillard crea compuestos aromáticos que producen el dorado y sabor característico.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Qué hace que el curtido sea probiótico y beneficioso?', opciones: ['Vinagre añadido', 'Colonización de Lactobacillus durante fermentación anaeróbica controlada', 'Especias únicamente', 'Fermentación rápida'], correcta: 1, explicacion: 'Los Lactobacillus producen ácido láctico y crean ambiente probiótico beneficioso para digestión.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Cuál es el futuro de la gastronomía salvadoreña frente a globalización?', opciones: ['Desaparición total', 'Evolución dinámica preservando identidad mientras innova', 'Estancamiento', 'Adopción total de cocina internacional'], correcta: 1, explicacion: 'La cocina salvadoreña evoluciona manteniendo identidad profunda mientras explora técnicas modernas.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: '¿Qué certificación internacional recibió la pupusa?', opciones: ['Solo nacional', 'Patrimonio Cultural Inmaterial de la Humanidad por UNESCO', 'Marca registrada', 'Protección de patente'], correcta: 1, explicacion: 'Las pupusas fueron declaradas Patrimonio Cultural Inmaterial de la Humanidad por la UNESCO en 2005.' },

  /* ═════════════════════════════════════════════════════════
     SITIOS CULTURALES — 15 PREGUNTAS POR NIVEL
     ═════════════════════════════════════════════════════════ */

  // FÁCIL
  { cat: 'sitios', nivel: 'facil', pregunta: '¿En qué departamento se encuentra el sitio arqueológico Joya de Cerén?', opciones: ['La Libertad', 'Santa Ana', 'San Vicente', 'Cuscatlán'], correcta: 0, explicacion: 'Joya de Cerén está en el municipio de San Juan Opico, departamento de La Libertad.' },
  { cat: 'sitios', nivel: 'facil', pregunta: '¿Cómo se le conoce popularmente a Joya de Cerén por su extraordinario estado de conservación?', opciones: ['La Pompeya de América', 'El Machu Picchu salvadoreño', 'La Atlántida de Centroamérica', 'El Petén salvadoreño'], correcta: 0, explicacion: 'Se le llama "la Pompeya de América" porque, igual que la ciudad italiana, quedó sepultada bajo ceniza volcánica que conservó la vida cotidiana de sus habitantes.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'El sitio arqueológico Tazumal se ubica en el municipio de Chalchuapa, en el departamento de:', opciones: ['Santa Ana', 'Sonsonate', 'Ahuachapán', 'La Unión'], correcta: 0, explicacion: 'Tazumal está en Chalchuapa, departamento de Santa Ana, a unos 80 km al occidente de San Salvador.' },
  { cat: 'sitios', nivel: 'facil', pregunta: '¿Qué pueblo colonial es reconocido por su arquitectura, sus calles empedradas y su tradición del añil?', opciones: ['Suchitoto', 'Ilobasco', 'Nahuizalco', 'Berlín'], correcta: 0, explicacion: 'Suchitoto, en el departamento de Cuscatlán, es célebre por su arquitectura colonial, el lago Suchitlán y su historia ligada al cultivo del añil.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'La formación rocosa conocida como Puerta del Diablo se encuentra en Los Planes de Renderos, cerca de:', opciones: ['Panchimalco', 'Concepción de Ataco', 'Juayúa', 'Perquín'], correcta: 0, explicacion: 'Puerta del Diablo es un mirador natural ubicado en Los Planes de Renderos, muy cerca del pueblo de Panchimalco.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'La Ruta de las Flores atraviesa pueblos de los departamentos de Sonsonate y:', opciones: ['Ahuachapán', 'Morazán', 'Usulután', 'La Unión'], correcta: 0, explicacion: 'La Ruta de las Flores recorre pueblos como Nahuizalco, Juayúa y Apaneca en Sonsonate, y Concepción de Ataco y Tacuba en Ahuachapán.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'La Catedral Metropolitana de San Salvador es famosa por la fachada de mosaicos creada por el artista:', opciones: ['Fernando Llort', 'Salarrué', 'Roque Dalton', 'Claudia Lars'], correcta: 0, explicacion: 'El colorido mosaico de la fachada de la Catedral fue diseñado por el reconocido artista plástico salvadoreño Fernando Llort.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'El Parque Nacional El Boquerón corresponde al cráter de qué volcán?', opciones: ['Volcán de San Salvador', 'Volcán de Izalco', 'Volcán de San Vicente', 'Volcán de Santa Ana'], correcta: 0, explicacion: 'El Boquerón es el cráter del volcán de San Salvador, convertido en parque nacional.' },
  { cat: 'sitios', nivel: 'facil', pregunta: '¿Cómo se llama el museo en San Salvador dedicado a la arqueología y antropología del país?', opciones: ['Museo Nacional de Antropología David J. Guzmán', 'Museo de Arte de El Salvador', 'Museo de la Palabra y la Imagen', 'Museo Tin Marín'], correcta: 0, explicacion: 'El MUNA (Museo Nacional de Antropología David J. Guzmán) resguarda piezas arqueológicas y etnográficas del país.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'El pueblo de Concepción de Ataco, en la Ruta de las Flores, es conocido especialmente por:', opciones: ['Sus coloridos murales en las fachadas', 'Sus playas', 'Su producción de cerámica', 'Su carnaval anual'], correcta: 0, explicacion: 'Concepción de Ataco destaca por los murales artísticos que decoran las fachadas de sus calles.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'En la Catedral Metropolitana de San Salvador descansan los restos de:', opciones: ['Monseñor Óscar Arnulfo Romero', 'El presidente José Matías Delgado', 'El general Maximiliano Hernández Martínez', 'El poeta Francisco Gavidia'], correcta: 0, explicacion: 'La cripta de la Catedral Metropolitana alberga la tumba de Monseñor Óscar Arnulfo Romero.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'El Teatro Nacional de San Salvador es reconocido por ser:', opciones: ['El teatro más antiguo de Centroamérica', 'El teatro más grande de Latinoamérica', 'Una antigua fortaleza colonial', 'Una réplica del Teatro Colón'], correcta: 0, explicacion: 'El Teatro Nacional de San Salvador es considerado el teatro más antiguo de Centroamérica.' },
  { cat: 'sitios', nivel: 'facil', pregunta: '¿Qué tipo de sitio es Joya de Cerén, según los arqueólogos?', opciones: ['Una aldea agrícola maya', 'Un palacio real', 'Una fortaleza militar', 'Un centro ceremonial azteca'], correcta: 0, explicacion: 'Joya de Cerén fue una aldea agrícola maya del período Clásico, tributaria del centro político de San Andrés.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'Panchimalco, cerca de San Salvador, es célebre por su festividad llamada:', opciones: ['Fiesta de las Flores y las Palmas', 'Festival del Añil', 'Carnaval de San Miguel', 'Feria de la Paz'], correcta: 0, explicacion: 'Panchimalco celebra cada año la tradicional Fiesta de las Flores y las Palmas, de raíz indígena.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'El sitio arqueológico Tazumal forma parte de una zona arqueológica más amplia que también incluye:', opciones: ['Casa Blanca y El Trapiche', 'Copán y Tikal', 'Joya de Cerén y San Andrés', 'Cihuatán y Quelepa'], correcta: 0, explicacion: 'La zona arqueológica de Chalchuapa agrupa a Tazumal junto a otros sitios como Casa Blanca y El Trapiche.' },

  // MEDIO
  { cat: 'sitios', nivel: 'medio', pregunta: '¿En qué año fue declarada Joya de Cerén Patrimonio de la Humanidad por la UNESCO?', opciones: ['1993', '1985', '2001', '1976'], correcta: 0, explicacion: 'Joya de Cerén fue declarada Patrimonio de la Humanidad por la UNESCO en 1993.' },
  { cat: 'sitios', nivel: 'medio', pregunta: '¿En qué año fueron descubiertas las estructuras de Joya de Cerén?', opciones: ['1976', '1960', '1993', '1950'], correcta: 0, explicacion: 'Fue descubierto accidentalmente en 1976, mientras se preparaba el terreno para construir silos de granos.' },
  { cat: 'sitios', nivel: 'medio', pregunta: '¿Qué volcán sepultó bajo su ceniza a la aldea de Joya de Cerén hace unos 1,400 años?', opciones: ['Volcán Loma Caldera', 'Volcán de Izalco', 'Volcán de San Miguel', 'Volcán Chaparrastique'], correcta: 0, explicacion: 'La erupción del volcán Loma Caldera, hacia el año 600 d.C., sepultó la aldea bajo varias capas de ceniza.' },
  { cat: 'sitios', nivel: 'medio', pregunta: '¿Qué arqueólogo estadounidense lideró las primeras investigaciones científicas en Joya de Cerén?', opciones: ['Payson Sheets', 'Stanley Boggs', 'John Longyear', 'William Fash'], correcta: 0, explicacion: 'El Dr. Payson Sheets, de la Universidad de Colorado en Boulder, dirigió las primeras investigaciones entre 1978 y 1980.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'La pirámide principal del sitio Tazumal alcanza una altura aproximada de:', opciones: ['24 metros', '10 metros', '40 metros', '60 metros'], correcta: 0, explicacion: 'La Estructura 1 de Tazumal, la más grande del sitio, alcanza unos 24 metros de altura.' },
  { cat: 'sitios', nivel: 'medio', pregunta: '¿Qué arqueólogo realizó las primeras excavaciones formales en Tazumal, a partir de 1940?', opciones: ['Stanley Boggs', 'Payson Sheets', 'Santiago Barberena', 'David Guzmán'], correcta: 0, explicacion: 'Stanley Boggs inició en 1940 las investigaciones formales de Tazumal, identificando 13 estructuras.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'Según los especialistas, el nombre "Tazumal" significa aproximadamente:', opciones: ['Lugar donde se consumen las almas', 'Lugar de las joyas', 'Valle de las flores', 'Ciudad de los dioses'], correcta: 0, explicacion: 'En lengua nahua-quiché, "Tazumal" se traduce aproximadamente como "lugar donde se consumen las almas".' },
  { cat: 'sitios', nivel: 'medio', pregunta: '¿Quién descubrió la estela conocida como "La Virgen de Tazumal" en 1892?', opciones: ['Santiago Barberena', 'Stanley Boggs', 'Payson Sheets', 'Jorge Lardé'], correcta: 0, explicacion: 'El historiador Santiago Barberena encontró esta estela en 1892 y la trasladó al Museo Nacional.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'El sitio arqueológico San Andrés, un antiguo centro político maya, se ubica en el valle de:', opciones: ['Zapotitán', 'Jiboa', 'Sensunapán', 'Lempa'], correcta: 0, explicacion: 'San Andrés se encuentra en el valle de Zapotitán, departamento de La Libertad, y dominó la región durante el Clásico tardío.' },
  { cat: 'sitios', nivel: 'medio', pregunta: '¿A qué sitio arqueológico estaba tributaria la aldea agrícola de Joya de Cerén?', opciones: ['San Andrés', 'Tazumal', 'Cihuatán', 'Casa Blanca'], correcta: 0, explicacion: 'Joya de Cerén era una aldea tributaria del centro político de San Andrés, que dominaba el valle de Zapotitán.' },
  { cat: 'sitios', nivel: 'medio', pregunta: '¿En qué departamento se localiza el pueblo colonial de Suchitoto?', opciones: ['Cuscatlán', 'La Paz', 'Chalatenango', 'San Vicente'], correcta: 0, explicacion: 'Suchitoto pertenece al departamento de Cuscatlán.' },
  { cat: 'sitios', nivel: 'medio', pregunta: '¿Cerca de qué lago se encuentra Suchitoto?', opciones: ['Lago Suchitlán', 'Lago de Coatepeque', 'Lago de Ilopango', 'Laguna de Alegría'], correcta: 0, explicacion: 'Suchitoto está a orillas del embalse conocido como lago Suchitlán.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'El monolito conocido como "La Piedra de las Victorias", hallado en Tazumal, muestra una clara influencia de la cultura:', opciones: ['Olmeca', 'Azteca', 'Inca', 'Maya clásica'], correcta: 0, explicacion: 'Este monolito con petrograbados en sus cuatro lados presenta un estilo típicamente olmeca.' },
  { cat: 'sitios', nivel: 'medio', pregunta: '¿Cuál era el propósito de los trabajos de tierra que llevaron al descubrimiento accidental de Joya de Cerén?', opciones: ['Construir silos para almacenar granos', 'Construir una carretera', 'Ampliar un cementerio', 'Sembrar café'], correcta: 0, explicacion: 'Un tractor nivelaba terreno para construir silos de granos cuando reveló las primeras estructuras del sitio.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'La zona arqueológica de Chalchuapa, donde se ubica Tazumal, tiene una extensión aproximada de:', opciones: ['10 km²', '1 km²', '50 km²', '100 km²'], correcta: 0, explicacion: 'La zona arqueológica de Chalchuapa abarca aproximadamente 10 km², con varios sitios además de Tazumal.' },

  // DIFÍCIL
  { cat: 'sitios', nivel: 'dificil', pregunta: '¿En qué fecha exacta fue declarada Joya de Cerén Patrimonio de la Humanidad?', opciones: ['11 de diciembre de 1993', '5 de mayo de 1993', '19 de junio de 1993', '27 de noviembre de 1989'], correcta: 0, explicacion: 'La UNESCO declaró a Joya de Cerén Patrimonio de la Humanidad el 11 de diciembre de 1993.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: '¿A qué universidad pertenecía el arqueólogo Payson Sheets, quien lideró las primeras excavaciones en Joya de Cerén?', opciones: ['Universidad de Colorado en Boulder', 'Universidad de Harvard', 'Universidad de Yale', 'Universidad de Arizona'], correcta: 0, explicacion: 'Payson Sheets era profesor de antropología en la Universidad de Colorado en Boulder, Estados Unidos.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'Las excavaciones en Joya de Cerén fueron interrumpidas por la guerra civil y retomadas en:', opciones: ['1989', '1980', '1996', '1976'], correcta: 0, explicacion: 'Los trabajos se retomaron en 1989 tras la interrupción por el conflicto armado, y continuaron hasta 1996.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: '¿Cuántas estructuras identificó Stanley Boggs en su investigación formal del sitio Tazumal?', opciones: ['13', '6', '20', '8'], correcta: 0, explicacion: 'Boggs identificó 13 estructuras en total, siete de las cuales fueron asignadas después al área de "Nuevo Tazumal".' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'La segunda pirámide de Tazumal, de estilo tolteca, tuvo un templo en su cima que se derrumbó en:', opciones: ['Octubre de 2004', 'Enero de 1990', 'Marzo de 2010', 'Julio de 1998'], correcta: 0, explicacion: 'El templo que coronaba la Estructura 2, de estilo tolteca, se derrumbó en octubre de 2004.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: '¿En qué año inició Stanley Boggs la primera de doce temporadas de investigación en Tazumal?', opciones: ['1942', '1950', '1960', '1935'], correcta: 0, explicacion: 'En 1942 comenzó la primera de las doce temporadas de investigación arqueológica de Boggs en el sitio.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'El museo de sitio de Tazumal lleva el nombre de su principal investigador y fue fundado el 16 de abril de:', opciones: ['1952', '1970', '1940', '1993'], correcta: 0, explicacion: 'El Museo Stanley Boggs, ubicado en Tazumal, fue fundado el 16 de abril de 1952.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'Aproximadamente, ¿desde qué año antes de Cristo muestra evidencia de ocupación humana continua la zona de Chalchuapa?', opciones: ['1200 a.C.', '500 a.C.', '300 d.C.', '2000 a.C.'], correcta: 0, explicacion: 'Chalchuapa es uno de los asentamientos más antiguos y continuos de El Salvador, con ocupación desde aproximadamente 1200 a.C.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'El sitio arqueológico Cihuatán, en el actual departamento de San Salvador, corresponde al período:', opciones: ['Posclásico', 'Preclásico', 'Clásico temprano', 'Colonial'], correcta: 0, explicacion: 'Cihuatán es un sitio del período Posclásico vinculado a la migración pipil, que fue destruido y quemado.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'La aldea de Joya de Cerén fue fundada poco después de la erupción del volcán:', opciones: ['Ilopango', 'Loma Caldera', 'Izalco', 'San Miguel'], correcta: 0, explicacion: 'Tras la erupción del volcán de Ilopango, el valle fue reocupado y ahí se fundó posteriormente Joya de Cerén, que luego fue sepultada por Loma Caldera.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: '¿Qué material de construcción, usado en la reconstrucción de Tazumal en los años 40, generó controversia entre arqueólogos?', opciones: ['Cemento', 'Adobe', 'Piedra caliza', 'Estuco de cal'], correcta: 0, explicacion: 'El uso de cemento moderno por Stanley Boggs en la reconstrucción de las estructuras fue muy criticado en su momento.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'La estructura principal de Tazumal fue construida en trece etapas distintas, entre los años:', opciones: ['100 y 800 d.C.', '1200 y 1500 d.C.', '400 a.C. y 100 d.C.', '900 y 1200 d.C.'], correcta: 0, explicacion: 'La Estructura 1 (B1-1) se construyó en trece etapas sucesivas entre los años 100 y 800 d.C.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'El decreto legislativo que declaró Monumento Nacional a Joya de Cerén data de:', opciones: ['31 de agosto de 1989', '11 de diciembre de 1993', '1 de enero de 1980', '5 de mayo de 1976'], correcta: 0, explicacion: 'El Decreto Legislativo N.º 320, del 31 de agosto de 1989, declaró a Joya de Cerén Monumento Nacional.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'Hasta la actualidad, Joya de Cerén es:', opciones: ['El único sitio de El Salvador declarado Patrimonio de la Humanidad por la UNESCO', 'Uno de cinco sitios salvadoreños con esa distinción', 'El segundo sitio más visitado del país', 'Parte de un conjunto binacional con Honduras'], correcta: 0, explicacion: 'Joya de Cerén sigue siendo, hasta el momento, el único sitio salvadoreño declarado Patrimonio Mundial por la UNESCO.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'El área arqueológica de Chalchuapa incluye, además de Tazumal, sitios como El Trapiche y:', opciones: ['Casa Blanca', 'Cihuatán', 'San Andrés', 'Quelepa'], correcta: 0, explicacion: 'Casa Blanca es otro de los sitios que integran la zona arqueológica de Chalchuapa, junto con El Trapiche.' },

  // 100% GUANACO
  { cat: 'sitios', nivel: 'guanaco', pregunta: '¿Qué elemento permitió la excepcional conservación de las estructuras de Joya de Cerén pese a estar hechas de tierra compactada?', opciones: ['El sepultamiento bajo capas de ceniza volcánica a distintas temperaturas', 'La aplicación posterior de resinas sintéticas', 'Un microclima seco constante', 'El uso de piedra en vez de adobe'], correcta: 0, explicacion: 'La erupción de Loma Caldera cubrió la aldea con varias capas de ceniza a temperaturas entre 100 y 500°C, sellando y preservando las estructuras de tierra y los objetos cotidianos.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'En la tumba principal de la Estructura 1 de Tazumal se hallaron ofrendas que incluían más de:', opciones: ['116 vasijas', '20 vasijas', '500 vasijas', '50 vasijas'], correcta: 0, explicacion: 'Se hallaron tumbas con más de 116 vasijas, joyería de jade y espejos de pirita de hierro, entre otros objetos.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'La Estela de Tazumal, conocida popularmente como "la Virgen", mide aproximadamente:', opciones: ['2.65 metros de altura', '1 metro de altura', '5 metros de altura', '0.5 metros de altura'], correcta: 0, explicacion: 'La estela mide 2.65 metros de altura por 1.16 de ancho, y representa a un personaje con ricos atuendos sosteniendo un cetro.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'La Piedra de las Victorias, hallada cerca de Tazumal, presenta petrograbados en sus cuatro lados y se fecha aproximadamente en:', opciones: ['700 a.C.', '1200 d.C.', '300 d.C.', '1500 a.C.'], correcta: 0, explicacion: 'Este monolito de estilo olmeca, con grabados en sus cuatro caras, se fecha aproximadamente en el año 700 a.C.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'Antes de la fundación de Joya de Cerén, gran parte del centro y occidente de El Salvador quedó sepultada por ceniza del volcán de Ilopango, hecho ocurrido alrededor del año:', opciones: ['250 d.C.', '1000 d.C.', '600 a.C.', '1500 d.C.'], correcta: 0, explicacion: 'La erupción del Ilopango, hacia el año 250 d.C., sepultó gran parte de la región e interrumpió la ocupación por siglos.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'El grupo cerámico "Guazapa", común en contextos funerarios en Tazumal y otros sitios del centro del país, se caracteriza por:', opciones: ['Adornos de engobe raspado', 'Vidriado azul cobalto', 'Incrustaciones de oro', 'Pintura al fresco policromada'], correcta: 0, explicacion: 'La cerámica Guazapa se distingue por sus adornos de engobe raspado, encontrados en varios sitios del centro de El Salvador.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'Durante el período Clásico, tanto San Andrés como Joya de Cerén recibieron una notable influencia cultural proveniente de:', opciones: ['Copán', 'Teotihuacán', 'Tenochtitlán', 'Machu Picchu'], correcta: 0, explicacion: 'Ambos sitios del valle de Zapotitán muestran similitudes e influencia de la ciudad maya de Copán, en la actual Honduras.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'La reconstrucción de las Estructuras 1 y 2 de Tazumal en la década de 1940, realizada por Stanley Boggs, fue criticada porque:', opciones: ['Utilizó cemento moderno en un sitio prehispánico', 'Eliminó por completo las estructuras originales', 'Se hizo sin ningún tipo de registro', 'Se financió con fondos extranjeros sin autorización'], correcta: 0, explicacion: 'El uso de cemento en la reconstrucción fue muy criticado, aunque en ese momento se consideró necesario para evitar más destrucción del sitio.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'El volcán Loma Caldera, que sepultó Joya de Cerén, se ubica a una distancia del asentamiento de apenas:', opciones: ['Menos de 1 kilómetro', '20 kilómetros', '5 kilómetros', '50 kilómetros'], correcta: 0, explicacion: 'Loma Caldera está a menos de 1 km de Joya de Cerén, por lo que la erupción sepultó la aldea casi por completo.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'La ocupación arqueológica de Tazumal, considerando todas sus fases, abarca aproximadamente desde:', opciones: ['1200 a.C. hasta 1200 d.C.', '100 d.C. hasta 1500 d.C.', '500 a.C. hasta 500 d.C.', '800 d.C. hasta 1521 d.C.'], correcta: 0, explicacion: 'Tazumal fue ocupado de forma discontinua desde aproximadamente 1200 a.C. hasta su abandono definitivo hacia 1200 d.C.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'En Joya de Cerén se identificó una estructura de tipo temazcal, es decir:', opciones: ['Un baño de vapor ritual', 'Una bodega de granos', 'Un templo funerario', 'Una vivienda de un líder político'], correcta: 0, explicacion: 'La Estructura 9 del sitio corresponde a un temazcal, un baño de vapor usado con fines rituales y de higiene.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'El área total del Parque Arqueológico Joya de Cerén, entre zona de reserva y área administrativa, es de aproximadamente:', opciones: ['5 hectáreas', '1 hectárea', '20 hectáreas', '50 hectáreas'], correcta: 0, explicacion: 'El parque cuenta con unas 5 hectáreas distribuidas entre la reserva arqueológica y el área administrativa.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'Las fases cerámicas Xocco y Payu, identificadas en Joya de Cerén, corresponden respectivamente a los períodos:', opciones: ['400-600 d.C. y 600-900 d.C.', '100-300 d.C. y 300-500 d.C.', '900-1100 d.C. y 1100-1300 d.C.', '1200-1000 a.C. y 1000-800 a.C.'], correcta: 0, explicacion: 'La cultura material del sitio corresponde a la fase Xocco (400-600 d.C.) y a la fase Payu (600-900 d.C.).' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'En el Museo de sitio de Tazumal se exhibe, entre otras piezas, un objeto ritual mesoamericano conocido como:', opciones: ['Chac Mool', 'Trono jaguar', 'Disco solar de jade', 'Máscara de obsidiana'], correcta: 0, explicacion: 'Un Chac Mool fue encontrado en la zona conocida como Laguna Seca de Chalchuapa y forma parte de las piezas destacadas del sitio.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'Joya de Cerén reabrió al público tras una extensa remodelación auspiciada por Francia y El Salvador en:', opciones: ['Diciembre de 2021', 'Enero de 2015', 'Julio de 2018', 'Marzo de 2023'], correcta: 0, explicacion: 'Tras un año de trabajos de conservación auspiciados por el Gobierno de Francia y El Salvador, el sitio reabrió en diciembre de 2021.' },

  /* ═════════════════════════════════════════════════════════
     LEYENDAS — 15 PREGUNTAS POR NIVEL
     ═════════════════════════════════════════════════════════ */

  // FÁCIL
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Quién es la madre de El Cipitío, según la leyenda salvadoreña?', opciones: ['La Siguanaba', 'La Llorona', 'La Carreta Bruja', 'La Chancha'], correcta: 0, explicacion: 'El Cipitío es, según la tradición, hijo de La Siguanaba.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿A qué edad quedó condenado El Cipitío a permanecer para siempre?', opciones: ['10 años', '5 años', '15 años', '7 años'], correcta: 0, explicacion: 'El Cipitío fue condenado a permanecer eternamente como un niño de 10 años.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'Según la leyenda, ¿cómo se muestra La Siguanaba a los hombres al principio?', opciones: ['Como una mujer hermosa', 'Como un anciano', 'Como un animal', 'Como una sombra sin rostro'], correcta: 0, explicacion: 'La Siguanaba se presenta de lejos como una mujer hermosa, pero al acercarse revela un rostro horrible.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿En qué colores se presenta tradicionalmente El Cadejo?', opciones: ['Blanco y negro', 'Rojo y azul', 'Dorado y plateado', 'Verde y café'], correcta: 0, explicacion: 'El Cadejo tiene dos versiones: una blanca, protectora, y otra negra, maligna.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Cómo se llama la carreta fantasma que anuncia mala suerte o muerte en la tradición salvadoreña?', opciones: ['La Carreta Bruja (o Chillona)', 'El Carro de Fuego', 'La Diligencia Negra', 'El Tren Fantasma'], correcta: 0, explicacion: 'La Carreta Bruja, también llamada Carreta Chillona, recorre los caminos de noche como presagio de desgracia.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Qué le gusta hacer a El Cipitío, según la tradición popular?', opciones: ['Revolcarse entre las cenizas', 'Nadar en el mar', 'Cazar animales', 'Tocar la marimba'], correcta: 0, explicacion: 'Al Cipitío le encanta revolcarse y comer cenizas, dejando pequeñas huellas cerca de los hornos.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'Los pasos de El Cadejo suenan de manera similar a las pisadas de:', opciones: ['Una cabra', 'Un caballo', 'Un perro grande', 'Un gato'], correcta: 0, explicacion: 'Sus pasos se asemejan al sonido de pezuñas de cabra.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Qué parte del cuerpo de El Cipitío aparece "al revés" en la leyenda?', opciones: ['Sus pies', 'Sus manos', 'Su cabeza', 'Sus orejas'], correcta: 0, explicacion: 'Sus pies están volteados hacia atrás, lo que confunde a quienes intentan seguir sus huellas.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿En qué lugar de San Salvador se dice que aparece El Padre sin Cabeza?', opciones: ['Cerca de la Iglesia El Rosario', 'En el Parque Cuscatlán', 'En el Zócalo', 'En el Mercado Central'], correcta: 0, explicacion: 'Según la leyenda, el Padre sin Cabeza sale por las puertas de la Iglesia El Rosario los viernes a medianoche.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Qué figura de la mitología salvadoreña se aparece principalmente a hombres infieles o trasnochadores cerca de los ríos?', opciones: ['La Siguanaba', 'El Cipitío', 'El Cadejo blanco', 'El Justo Juez'], correcta: 0, explicacion: 'La Siguanaba busca engañar y asustar a los hombres mujeriegos o infieles que andan solos de noche.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Qué prenda característica usa El Cipitío en la cabeza, según las descripciones populares?', opciones: ['Un sombrero grande y puntiagudo', 'Una corona de flores', 'Un casco de guerrero', 'Un turbante'], correcta: 0, explicacion: 'El Cipitío suele describirse con un gran sombrero de palma puntiagudo.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Cuál es el nombre del espíritu nocturno que, según la tradición, castiga a quienes rompen las normas de la noche?', opciones: ['El Justo Juez de la Noche', 'El Cipitío', 'La Carreta Bruja', 'El Cadejo negro'], correcta: 0, explicacion: 'El Justo Juez de la Noche es un personaje que, según la leyenda, castiga las faltas cometidas durante la noche.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Qué creencia indígena pipil sostiene que ciertas personas pueden transformarse en animales protectores?', opciones: ['El nahualismo', 'El curanderismo', 'El totemismo azteca', 'El chamanismo maya'], correcta: 0, explicacion: 'El nahualismo era una creencia muy extendida entre los pueblos pipiles.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Qué flor mágica, según la leyenda, solo pueden ver y recoger las personas mudas?', opciones: ['La Flor de Amate', 'La Flor de Izote', 'La Rosa de Cuscatlán', 'La Flor de Loto'], correcta: 0, explicacion: 'La Flor de Amate es una flor legendaria asociada a la buena suerte, visible únicamente para personas mudas.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: '¿Cuál de estos personajes NO pertenece a las leyendas salvadoreñas?', opciones: ['El Minotauro', 'La Siguanaba', 'El Cipitío', 'El Cadejo'], correcta: 0, explicacion: 'El Minotauro pertenece a la mitología griega; los otros tres son personajes clásicos del folclore salvadoreño.' },

  // MEDIO
  { cat: 'leyendas', nivel: 'medio', pregunta: 'Antes de ser maldecida, ¿cómo se llamaba la mujer que se convertiría en La Siguanaba?', opciones: ['Sihuehuet', 'Zipitía', 'Xochitl', 'Ixchel'], correcta: 0, explicacion: '"Sihuehuet" significa "mujer hermosa" en náhuat, antes de recibir la maldición que la transformó en la Siguanaba.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: '¿Qué significa el nombre "Siguanaba" según la tradición?', opciones: ['Mujer horrible', 'Mujer sabia', 'Madre de la noche', 'Espíritu del agua'], correcta: 0, explicacion: 'Tras la maldición, su nuevo nombre pasó a significar "mujer horrible".' },
  { cat: 'leyendas', nivel: 'medio', pregunta: '¿Qué significa la palabra "Cipit" en idioma náhuat?', opciones: ['Niño', 'Fuego', 'Luna', 'Serpiente'], correcta: 0, explicacion: '"Cipit" significa simplemente "niño" en náhuat, origen del nombre del Cipitío.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'Según la regla popular sobre El Cadejo, si escuchas sus pasos muy cerca, en realidad significa que:', opciones: ['Está lejos', 'Está a punto de atacar', 'Está detrás de ti', 'Se ha ido'], correcta: 0, explicacion: 'La leyenda dice que si se escucha cerca, está lejos; y si se escucha lejos, está muy cerca.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: '¿Qué color de Cadejo se considera protector de los caminantes nocturnos de buen corazón?', opciones: ['El blanco', 'El negro', 'El gris', 'El rojo'], correcta: 0, explicacion: 'El Cadejo blanco es considerado un ser protector y guía de quienes caminan de noche con buenas intenciones.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'En la historia popular de la Carreta Bruja, ¿qué apodo recibía el hombre que se negó a bendecir su carreta?', opciones: ['Pedro el Malo', 'Juan sin Miedo', 'El Diablo Cojuelo', 'Concho el Bribón'], correcta: 0, explicacion: 'En una de las versiones más conocidas, el hombre castigado era apodado "Pedro el Malo".' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'La escena de la maldición de la Carreta Bruja ocurre, según una versión popular, durante la celebración de qué santo patrono?', opciones: ['San Isidro Labrador', 'San Miguel Arcángel', 'San Salvador del Mundo', 'Santa Ana'], correcta: 0, explicacion: 'La leyenda sitúa el episodio en la fiesta de San Isidro Labrador, cuando los carreteros llevaban sus carretas a bendecir.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'Según la leyenda, ¿en qué día de la semana aparece El Padre sin Cabeza cerca de la Iglesia El Rosario?', opciones: ['Los viernes', 'Los lunes', 'Los domingos', 'Los martes'], correcta: 0, explicacion: 'Se dice que aparece todos los viernes a la medianoche.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'En la creencia del nahualismo, ¿quién invocaba el espíritu animal protector de un recién nacido?', opciones: ['Un hechicero o chamán', 'El sacerdote católico del pueblo', 'El propio niño al crecer', 'El jefe militar de la región'], correcta: 0, explicacion: 'Un hechicero invocaba, al nacer el niño, un espíritu animal que se convertía en su nahual protector.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: '¿En qué región de El Salvador se ubica tradicionalmente la leyenda de El Cipitío, aunque puede transportarse a cualquier lugar?', opciones: ['San Vicente', 'Morazán', 'La Unión', 'Chalatenango'], correcta: 0, explicacion: 'La tradición sitúa a El Cipitío principalmente en el departamento de San Vicente.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: '¿Qué versión explica el origen de El Padre sin Cabeza relacionándolo con un conflicto social?', opciones: ['Fue decapitado por participar en una revuelta campesina', 'Murió luchando contra piratas', 'Fue ejecutado por herejía en la colonia', 'Murió en un duelo por amor'], correcta: 0, explicacion: 'Una de las versiones cuenta que el sacerdote fue decapitado por tomar parte en un levantamiento campesino.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: '¿Qué característica corporal, además de sus pies al revés, suele destacarse en las descripciones de El Cipitío?', opciones: ['Su enorme barriga', 'Sus alas de murciélago', 'Su piel escamosa', 'Sus cuernos'], correcta: 0, explicacion: 'Se le describe con una gran barriga, resultado de su gusto por comer cenizas.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'Según algunas versiones, El Cipitío también frecuenta los trapiches de moliendas de caña porque le atrae:', opciones: ['La miel y el dulce de atado', 'El humo de los hornos', 'El sonido de las campanas', 'Las herramientas de los trabajadores'], correcta: 0, explicacion: 'Le atraen la miel de dedo y el dulce de atado que se producen en los trapiches.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: '¿Cuál es una de las razones por las que, según la leyenda, la Carreta Bruja visita ciertos pueblos?', opciones: ['Porque en ellos no hay amor ni armonía', 'Porque son los más ricos del país', 'Porque tienen iglesias abandonadas', 'Porque están cerca del mar'], correcta: 0, explicacion: 'Se dice que la carreta ronda los pueblos donde falta el amor y la armonía entre sus habitantes.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: '¿Qué tipo de espíritu es, en general, un "nahual" dentro de la tradición pipil?', opciones: ['Un espíritu animal protector asignado al nacer', 'Un fantasma vengativo', 'Un dios menor de la lluvia', 'Un objeto encantado'], correcta: 0, explicacion: 'El nahual es un espíritu animal protector que, según la creencia, se asigna a la persona desde su nacimiento.' },

  // DIFÍCIL
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'En una de las versiones, ¿quién es descrito como el "Dios de dioses" que lanza la maldición sobre la madre de El Cipitío?', opciones: ['Teotl', 'Tláloc', 'Itzamná', 'Quetzalcóatl'], correcta: 0, explicacion: 'En esta versión, Teotl, el "dios de los dioses", condena a la madre y a su hijo tras el romance ilícito.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'Según una versión detallada de la leyenda, la madre de El Cipitío tuvo un romance ilícito con:', opciones: ['Un lucero de la mañana', 'Un guerrero extranjero', 'Un sacerdote maya', 'Un espíritu del bosque'], correcta: 0, explicacion: 'En esta variante, Sihuehuet mantuvo un romance con un lucero de la mañana, lo que originó la maldición.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: '¿Con qué cerro se asocia tradicionalmente el hogar de La Siguanaba y su hijo El Cipitío?', opciones: ['El cerro Sihuatepeque', 'El volcán de Izalco', 'El cerro de Guazapa', 'El volcán Chaparrastique'], correcta: 0, explicacion: 'El cerro Sihuatepeque, que significa "cerro de la mujer", se asocia con la región de origen de estos personajes.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'Según ciertas versiones, ¿qué debía hacer una muchacha para lograr que El Cipitío dejara de molestarla?', opciones: ['Descuidar su higiene por varios días', 'Ofrecerle flores blancas', 'Recitar una oración especial', 'Regalarle dulce de atado'], correcta: 0, explicacion: 'Se dice que al Cipitío le disgustan los malos hábitos de higiene, por lo que las jóvenes usaban esto como manera de ahuyentarlo.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: '¿Qué elemento sonoro distintivo advierte, según la tradición, la cercanía de la Carreta Bruja?', opciones: ['Un chirrido de ruedas de madera', 'Un canto de gallo', 'El tañido de campanas', 'El aullido de perros'], correcta: 0, explicacion: 'El terrible chirrido de sus ruedas de madera anuncia la llegada de la Carreta Bruja.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'Los folcloristas suelen clasificar las leyendas salvadoreñas en varias categorías; ¿cuál de las siguientes es una de ellas?', opciones: ['Leyendas etiológicas', 'Leyendas cósmicas', 'Leyendas bélicas', 'Leyendas marítimas'], correcta: 0, explicacion: 'Entre las categorías usadas están las etiológicas (origen de lugares), las indígenas, de seres extraordinarios, de fantasmas, de animales y de lugares encantados.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: '¿Qué otros seres legendarios de forma animal se mencionan junto al Cadejo en la tradición salvadoreña?', opciones: ['El Mico Brujo y La Chancha', 'El Grifo y la Esfinge', 'El Unicornio y el Dragón', 'El Basilisco y la Hidra'], correcta: 0, explicacion: 'El Mico Brujo y La Chancha son otros personajes de forma animal presentes en el folclore salvadoreño.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'En algunas interpretaciones, el nombre "Cipit" se ha relacionado con una deidad mesoamericana llamada:', opciones: ['Xipe Tótec', 'Huitzilopochtli', 'Quetzalcóatl', 'Itzamná'], correcta: 0, explicacion: 'Algunas versiones relacionan el nombre del Cipitío con la deidad mesoamericana Xipe Tótec.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'Según la leyenda, ¿qué dos versiones explican por qué El Padre sin Cabeza perdió la cabeza?', opciones: ['Murió en pecado mortal sin confesarse, o fue decapitado por unirse a una revuelta campesina', 'Fue decapitado por un rayo y por una maldición gitana', 'Murió en batalla naval y en un incendio', 'Fue ejecutado por el rey de España y por brujería'], correcta: 0, explicacion: 'Existen dos versiones principales sobre su origen: una religiosa (pecado sin confesar) y otra social (participación en una revuelta).' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: '¿Qué representan, en conjunto, los dos Cadejos (blanco y negro) dentro del imaginario popular?', opciones: ['La lucha entre el bien y el mal', 'El día y la noche', 'La riqueza y la pobreza', 'El campo y la ciudad'], correcta: 0, explicacion: 'Ambos cadejos simbolizan la eterna lucha entre las fuerzas del bien y del mal.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'Según la leyenda, tras salir de la Iglesia El Rosario, ¿hacia qué dirección se dice que camina El Padre sin Cabeza?', opciones: ['Hacia el norte', 'Hacia el sur', 'Hacia el oriente', 'Hacia el poniente'], correcta: 0, explicacion: 'Según los relatos, camina hacia el norte por la sexta avenida tras salir de la iglesia.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'En la tradición popular, ¿qué función cumplía el nahual asignado a un recién nacido?', opciones: ['Servir como espíritu animal protector de por vida', 'Determinar su oficio futuro', 'Curar enfermedades de la familia', 'Proteger la cosecha del pueblo'], correcta: 0, explicacion: 'El nahual acompañaba y protegía a la persona durante toda su vida, según esta creencia pipil.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: '¿Qué elemento hace que la leyenda de El Cipitío tenga un fuerte componente simbólico sobre la moral colonial/indígena?', opciones: ['Representa el castigo por el amor o romance ilícito', 'Representa la lucha por la independencia', 'Representa el conflicto entre pueblos indígenas', 'Representa la llegada de los españoles'], correcta: 0, explicacion: 'La maldición de la Siguanaba y su hijo simboliza el castigo social hacia el romance considerado ilícito.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'En una de las versiones sobre el origen de La Siguanaba, su verdadero nombre "Sihuehuet" está relacionado con qué significado?', opciones: ['Mujer hermosa', 'Madre de la luna', 'Guardiana del río', 'Hija del sol'], correcta: 0, explicacion: '"Sihuehuet" se traduce como "mujer hermosa" antes de que recayera sobre ella la maldición.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: '¿Qué come principalmente El Cipitío, además de cenizas, según ciertas versiones de la leyenda?', opciones: ['Guineo y dulce de atado', 'Carne cruda', 'Insectos', 'Solo agua de los ríos'], correcta: 0, explicacion: 'Según algunas versiones, su alimento favorito es el guineo y el dulce de atado, además de las cenizas.' },

  // 100% GUANACO
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'Desde una perspectiva antropológica, la dualidad del Cadejo blanco y negro suele interpretarse como:', opciones: ['Una representación del conflicto moral entre el bien y el mal en el imaginario colonial mestizo', 'Un vestigio directo de mitología griega llevada por los conquistadores', 'Una alegoría exclusiva sobre el clima tropical', 'Una crítica política moderna sin raíces coloniales'], correcta: 0, explicacion: 'Los folcloristas interpretan esta dualidad como una expresión simbólica del conflicto entre el bien y el mal, propia del sincretismo cultural colonial.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'La leyenda de La Siguanaba combina elementos de una deidad prehispánica con un discurso moralizante que castiga principalmente:', opciones: ['La infidelidad y el abandono de las responsabilidades maternas', 'El robo de tierras comunales', 'La resistencia armada indígena', 'El comercio ilegal de añil'], correcta: 0, explicacion: 'La narrativa castiga tanto la infidelidad masculina como el abandono de responsabilidades familiares por parte de la madre.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'El fenómeno acústico descrito en la leyenda del Cadejo, donde la cercanía del sonido indica lo contrario a la distancia real, funciona narrativamente como:', opciones: ['Un recurso de tensión que aumenta la incertidumbre del oyente nocturno', 'Una explicación científica real sobre el eco en zonas montañosas', 'Una referencia a instrumentos musicales prehispánicos', 'Un dato astronómico sobre las fases lunares'], correcta: 0, explicacion: 'Esta paradoja sonora funciona como un recurso narrativo que aumenta el suspenso y la incertidumbre del relato.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'La clasificación folclórica de "leyendas etiológicas" en El Salvador se refiere específicamente a relatos que explican:', opciones: ['El origen de lugares, cerros, volcanes o pueblos', 'El origen del universo entero', 'El origen de los apellidos salvadoreños', 'El origen de los idiomas indígenas'], correcta: 0, explicacion: 'Las leyendas etiológicas narran cómo se formaron determinados lugares, cerros, volcanes o pueblos.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'En la narrativa de la Carreta Bruja, la negativa de "Pedro el Malo" a bendecir su carreta durante la fiesta patronal simboliza:', opciones: ['El rechazo a la autoridad religiosa y la ruptura del orden comunitario', 'Una crítica al sistema colonial de impuestos', 'Un acto de rebeldía política contra la corona española', 'Una protesta por la propiedad de la tierra'], correcta: 0, explicacion: 'El gesto de rechazar la bendición representa simbólicamente la ruptura con el orden religioso y comunitario del pueblo.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'El personaje de El Cipitío, con pies invertidos que confunden a quienes intentan seguirlo, cumple narrativamente la función de:', opciones: ['Un espíritu burlón e inatrapable, ligado al desorden y la travesura', 'Un guardián estricto de la moral pública', 'Un mensajero de los dioses del inframundo', 'Un símbolo exclusivamente agrícola'], correcta: 0, explicacion: 'Sus pies al revés refuerzan su naturaleza de espíritu burlón e imposible de atrapar.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'Comparando las distintas versiones sobre el origen de El Cipitío, los folcloristas señalan que estas variaciones se deben principalmente a:', opciones: ['La transmisión oral y la diversidad regional del relato', 'La existencia de un texto único y oficial', 'Traducciones erróneas de crónicas coloniales', 'La censura de la Iglesia católica'], correcta: 0, explicacion: 'Al tratarse de tradición oral, cada región y narrador aporta variantes propias a la historia.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'En la tradición sobre el nahualismo pipil, el animal asignado como nahual protector se determinaba, según la creencia, mediante:', opciones: ['La invocación de un hechicero al momento del nacimiento', 'Un sorteo comunitario anual', 'La elección libre del niño al llegar a la adultez', 'La posición de las estrellas en el matrimonio de los padres'], correcta: 0, explicacion: 'Un hechicero invocaba el espíritu animal protector en el momento del nacimiento del niño.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'La figura de El Justo Juez de la Noche, dentro de la clasificación de "seres extraordinarios" salvadoreños, se distingue por:', opciones: ['Castigar a quienes rompen las normas sociales o rituales durante la noche', 'Proteger exclusivamente las cosechas de maíz', 'Guiar a los viajeros perdidos hacia sus hogares', 'Representar la justicia agraria del siglo XX'], correcta: 0, explicacion: 'Este personaje se distingue por castigar a quienes transgreden las normas nocturnas de la comunidad.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'El motivo de "la mujer hermosa de lejos, horrenda de cerca" en La Siguanaba se repite en otras mitologías mesoamericanas como una advertencia simbólica sobre:', opciones: ['Las apariencias engañosas y el castigo a la infidelidad masculina', 'El peligro de los ríos crecidos en época de lluvias', 'La prohibición de bañarse de noche por razones higiénicas', 'El respeto obligatorio a los ancianos del pueblo'], correcta: 0, explicacion: 'Este motivo funciona como advertencia moral sobre las apariencias engañosas y el castigo a la infidelidad.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'Las leyendas de "seres extraordinarios" como la Siguanaba y el Cipitío se diferencian de las "leyendas indígenas" salvadoreñas principalmente porque estas últimas:', opciones: ['Incorporan sucesos o personajes anteriores a la conquista española de forma más directa', 'Ocurren exclusivamente en la época colonial', 'Carecen de cualquier componente sobrenatural', 'Fueron creadas después de la independencia'], correcta: 0, explicacion: 'Las leyendas indígenas suelen narrar directamente sucesos o personajes del período previo a la conquista española.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'En algunas variantes, El Padre sin Cabeza recorre una ruta específica del centro histórico de San Salvador; este tipo de detalle geográfico concreto en una leyenda urbana cumple la función de:', opciones: ['Anclar el relato en un espacio reconocible que refuerza su credibilidad local', 'Servir como mapa turístico oficial de la ciudad', 'Sustituir registros históricos verificados', 'Anunciar una ruta de peregrinación religiosa oficial'], correcta: 0, explicacion: 'Los detalles geográficos concretos anclan la leyenda a un espacio real, reforzando su credibilidad entre quienes la escuchan.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'El uso recurrente de ríos y quebradas como escenario de La Siguanaba y El Cipitío responde, según los folcloristas, a que estos lugares:', opciones: ['Eran puntos de encuentro social nocturno y por tanto propicios para advertencias morales', 'Eran considerados territorios prohibidos por ley colonial', 'Solo existían en la zona oriental del país', 'Se asociaban exclusivamente con rituales agrícolas mayas'], correcta: 0, explicacion: 'Los ríos eran lugares comunes de encuentro nocturno (lavado de ropa, baño), lo que los volvía escenarios propicios para estas advertencias morales.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'La "Flor de Amate", visible solo para personas mudas según la leyenda, ejemplifica un recurso narrativo común en el folclore centroamericano conocido como:', opciones: ['El objeto mágico condicionado, accesible solo bajo una característica especial', 'La maldición hereditaria transmitida por sangre', 'El pacto explícito con seres sobrenaturales', 'La transformación física permanente del protagonista'], correcta: 0, explicacion: 'Este recurso narrativo condiciona el acceso a un objeto mágico a una característica particular del personaje.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'La pervivencia de leyendas como El Cipitío en productos culturales modernos, como series educativas infantiles, ilustra un proceso conocido como:', opciones: ['La resignificación y adaptación del folclore tradicional a nuevos medios', 'La desaparición total del relato oral original', 'La prohibición estatal de la tradición oral', 'La sustitución completa por mitología extranjera'], correcta: 0, explicacion: 'La adaptación de estas leyendas a medios modernos, como la televisión educativa, muestra cómo el folclore se resignifica sin perder su esencia.' },

];

/* ══════════════════════════════════════════════════════════
   BANCO DE PREGUNTAS — INGLÉS (traducción completa)
   ══════════════════════════════════════════════════════════ */
const PREGUNTAS_EN = [
  // ======== HISTORY ========
  // Easy
  { cat: 'historia', nivel: 'facil', pregunta: 'What was the name of the Salvadoran territory before the Spanish conquest?', opciones: ['Quetzaltenango', 'Cuscatlán', 'Tikal', 'Copán'], correcta: 1, explicacion: 'The territory was known as Cuscatlán, a Pipil name meaning "place of jewels and riches".' },
  { cat: 'historia', nivel: 'facil', pregunta: 'When was Central American Independence proclaimed?', opciones: ['July 15, 1821', 'September 15, 1821', 'July 4, 1821', 'February 18, 1841'], correcta: 1, explicacion: 'On September 15, 1821, Central American Independence from Spanish rule was proclaimed.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'Which indigenous people were the most numerous in El Salvador when the Spanish arrived?', opciones: ['The Maya', 'The Lenca', 'The Pipil', 'The Aztecs'], correcta: 2, explicacion: 'The Pipil, of Nahua origin related to the Aztecs, were the most numerous indigenous group in the territory.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'In what year did El Salvador definitively separate from the Central American Federation?', opciones: ['1821', '1823', '1838', '1841'], correcta: 3, explicacion: 'El Salvador became a sovereign state on February 18, 1841, when it left the federation.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'Who is known as the "Father of the Salvadoran Homeland"?', opciones: ['Anastasio Aquino', 'Pedro de Alvarado', 'José Matías Delgado', 'Francisco Morazán'], correcta: 2, explicacion: 'Priest José Matías Delgado led the first independence movements of 1811 and 1814.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What is the capital of El Salvador?', opciones: ['Santa Ana', 'San Salvador', 'Sonsonate', 'La Libertad'], correcta: 1, explicacion: 'San Salvador is the capital and most important city of El Salvador.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'In which century did Pedro de Alvarado arrive in the territory of Cuscatlán?', opciones: ['15th century', '16th century', '17th century', '18th century'], correcta: 1, explicacion: 'Pedro de Alvarado arrived in 1524 during the 16th century to conquer the territory.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What was the main religion of the indigenous peoples of El Salvador?', opciones: ['Christianity', 'Polytheism with Nahua gods', 'Monotheism', 'Buddhism'], correcta: 1, explicacion: 'Indigenous peoples practiced polytheism, worshipping Nahua-origin gods such as Quetzalcoatl.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What does the word Cuscatlán mean in the Pipil language?', opciones: ['Land of fire', 'Place of jewels and riches', 'Sacred valley', 'Water of the mountains'], correcta: 1, explicacion: 'Cuscatlán means "place of jewels and riches" in the Pipil language.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'To which viceroyalty did the Captaincy General of Guatemala administratively belong?', opciones: ['Peru', 'New Spain', 'New Granada', 'Río de la Plata'], correcta: 1, explicacion: 'The Captaincy General of Guatemala, which included El Salvador, depended on the Viceroyalty of New Spain.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'On what date is El Salvador\'s Independence celebrated?', opciones: ['February 15', 'September 15', 'November 1', 'December 14'], correcta: 1, explicacion: 'September 15 commemorates Central American Independence, including El Salvador.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'How many departments does El Salvador have?', opciones: ['12', '14', '16', '18'], correcta: 1, explicacion: 'El Salvador is divided into 14 administrative departments.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'Which conquistador was wounded in the Battle of Acajutla?', opciones: ['Cortés', 'Pizarro', 'Pedro de Alvarado', 'Diego de Almagro'], correcta: 2, explicacion: 'Pedro de Alvarado was wounded in the battle against the Pipil on the Acajutla River.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What was the first cry of independence in El Salvador?', opciones: ['1808', '1811', '1815', '1821'], correcta: 1, explicacion: 'The first cry of independence occurred on November 5, 1811, led by José Matías Delgado.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'In which period was the 1841 Constitution adopted?', opciones: ['Transition period', 'Independent period', 'Federal period', 'Colonial period'], correcta: 2, explicacion: 'Upon leaving the Federation, El Salvador adopted its first constitution as an independent republic.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What importance did coffee have in the 19th-century Salvadoran economy?', opciones: ['No importance', 'It was the main export product', 'Only local export', 'Only domestic consumption'], correcta: 1, explicacion: 'Coffee became the economic engine of El Salvador starting in the 1850s.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'To which ethnic group did the Pipil belong?', opciones: ['Mayas', 'Nahuas', 'Lencas', 'Pokomames'], correcta: 1, explicacion: 'The Pipil were of Nahua origin, related to the peoples of the Valley of Mexico.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What was the main language of the Pipil?', opciones: ['Quiche', 'Nahua/Pipil', 'Lenca', 'Chorti'], correcta: 1, explicacion: 'The Pipil spoke the Pipil language, a variant of Nahua.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'Approximately how long did it take to conquer the Salvadoran territory?', opciones: ['1 year', '3-5 years', '10 years', '20 years'], correcta: 1, explicacion: 'The conquest of Cuscatlán took approximately 3-5 years, completed around 1528.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What was the main economic activity of pre-Hispanic indigenous peoples?', opciones: ['Livestock', 'Agriculture and trade', 'Mining', 'Textile industry'], correcta: 1, explicacion: 'Indigenous peoples were based on agriculture (corn, beans, cacao) and active trade.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What was the most important pre-Hispanic capital of the territory?', opciones: ['Chalchuapa', 'Cuzcatlán', 'Cojutepeque', 'Sonsonate'], correcta: 1, explicacion: 'Cuzcatlán was the most important pre-Hispanic capital, located in what is now La Libertad.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'What type of government did the indigenous peoples of El Salvador have?', opciones: ['Absolute monarchy', 'Independent chiefdoms governed by caciques', 'Democratic republic', 'Pure theocracy'], correcta: 1, explicacion: 'The territory was divided into independent chiefdoms, each governed by its own cacique or prince.' },
  { cat: 'historia', nivel: 'facil', pregunta: 'In which department is the greatest evidence of the Pipil civilization found today?', opciones: ['Chalatenango', 'Sonsonate', 'Cuscatlán', 'La Paz'], correcta: 2, explicacion: 'Cuscatlán department and its surroundings preserve the greatest archaeological evidence of the Pipil.' },

  // Medium (28)
  { cat: 'historia', nivel: 'medio', pregunta: 'Which crop was the basis of the Salvadoran colonial economy before coffee?', opciones: ['Cacao', 'Cotton', 'Indigo', 'Sugar cane'], correcta: 2, explicacion: 'Indigo (añil), a blue dye highly valued in Europe, was the main colonial export product.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'In what year were the Chapultepec Peace Accords signed?', opciones: ['1989', '1990', '1992', '1994'], correcta: 2, explicacion: 'On January 16, 1992, the Peace Accords were signed, ending 12 years of armed conflict.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'Which Spanish conquistador tried to dominate Cuscatlán in 1524?', opciones: ['Hernán Cortés', 'Francisco Pizarro', 'Pedro de Alvarado', 'Diego de Almagro'], correcta: 2, explicacion: 'Pedro de Alvarado was wounded by the Pipil in the Battle of the Acajutla River.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'How many victims are estimated to have resulted from the 1932 Matanza?', opciones: ['More than 5,000', 'More than 10,000', 'More than 20,000', 'More than 30,000'], correcta: 3, explicacion: 'It is estimated that more than 30,000 people were massacred in the 1932 rebellion.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'Under which viceroyalty did El Salvador belong during colonial times?', opciones: ['Viceroyalty of Peru', 'Viceroyalty of New Spain', 'Viceroyalty of New Granada', 'Viceroyalty of Río de la Plata'], correcta: 1, explicacion: 'El Salvador was part of the Captaincy General of Guatemala, dependent on the Viceroyalty of New Spain.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'What was the name of the English pirate who attacked San Salvador in 1667?', opciones: ['Henry Morgan', 'Bartholomew Roberts', 'Sir Francis Drake', 'John Hawkins'], correcta: 0, explicacion: 'Henry Morgan carried out several attacks on ports and cities in Central America, including San Salvador.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'Who was Farabundo Martí?', opciones: ['Conservative military man', 'Communist and revolutionary leader', 'Coffee entrepreneur', 'Right-wing military man'], correcta: 1, explicacion: 'Farabundo Martí was a communist leader who led the peasant and indigenous rebellion of 1932.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'In what year did the "Football War" between El Salvador and Honduras take place?', opciones: ['1965', '1967', '1969', '1971'], correcta: 2, explicacion: 'The Football War occurred in 1969, originating from clashes in football matches and border conflicts.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'How many years did the Salvadoran Civil War last?', opciones: ['8 years', '10 years', '12 years', '15 years'], correcta: 2, explicacion: 'The Civil War lasted 12 years, from 1980 to 1992, until the Chapultepec Peace Accords.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'Who was Marcelino García Flamenco?', opciones: ['Victorious general', 'Reformist president', 'Poet and journalist', 'Mining entrepreneur'], correcta: 1, explicacion: 'García Flamenco was president of El Salvador and promoted important reforms in the 19th century.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'In what year was the dollar established as the official currency in El Salvador?', opciones: ['1999', '2000', '2001', '2002'], correcta: 2, explicacion: 'El Salvador adopted the U.S. dollar as its official currency on January 1, 2001, with the "Monetary Integration Law".' },
  { cat: 'historia', nivel: 'medio', pregunta: 'What was the motto of the 1948 revolution in El Salvador?', opciones: ['"Revolution of Austerity"', '"October Revolution"', '"December Revolution"', '"Revolution of Democracy"'], correcta: 1, explicacion: 'The October Revolution of 1948 overthrew the previous military regime and promoted democratic changes.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'Who was Maximiliano Hernández Martínez?', opciones: ['National hero', '20th-century military dictator', 'Independence leader', 'Spanish conquistador'], correcta: 1, explicacion: 'Maximiliano Hernández Martínez was a military dictator who ruled El Salvador between 1931 and 1944.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'In what year did the Central American Federation first split?', opciones: ['1838', '1839', '1840', '1841'], correcta: 0, explicacion: 'The Central American Federation began to disintegrate in 1838, culminating with El Salvador\'s departure.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'What was the main consequence of the 1932 Matanza?', opciones: ['End of coffee exports', 'Repression against indigenous people and peasants', 'Unification of Central America', 'Democratization'], correcta: 1, explicacion: 'The massacre resulted in severe repression against the indigenous and peasant population for decades.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'What was the "Esquipulas Treaty"?', opciones: ['A trade agreement', 'A 1987 Central American peace agreement', 'A military alliance', 'A territorial treaty'], correcta: 1, explicacion: 'The Esquipulas II Accords (1987) were a plan for peace and democratization in Central America.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'In what year was the FMLN founded?', opciones: ['1975', '1977', '1979', '1980'], correcta: 1, explicacion: 'The Farabundo Martí National Liberation Front (FMLN) was founded in 1980 as a guerrilla coalition.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'How many active theaters of operation did the Salvadoran Civil War have?', opciones: ['2', '3', '4', '5'], correcta: 2, explicacion: 'The war took place in multiple theaters, mainly in the north, west and east of the country.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'Who was Prudencio Peralta Méndez?', opciones: ['Conquistador', 'Revolutionary soldier', 'Entrepreneur', 'Bishop'], correcta: 2, explicacion: 'Peralta was a general who actively participated in 19th-century Salvadoran conflicts.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'In what year was the constitution reformed to allow presidential re-election?', opciones: ['1950', '1962', '1983', '1994'], correcta: 1, explicacion: 'Various constitutional reforms were made in El Salvador, with 1962 being a year of significant changes.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'What event immediately preceded the 1980 Civil War?', opciones: ['1979 coup', '1982 elections', '1970 economic crisis', '1976 earthquake'], correcta: 0, explicacion: 'The military coup of October 15, 1979 destabilized the country and led to the start of the Civil War.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'How many signatories were there in the Chapultepec Peace Accords?', opciones: ['FMLN and Government', 'FMLN, Government and UN', 'FMLN, Government, UN and IDHUCA', 'FMLN, Government and USA'], correcta: 1, explicacion: 'The Accords were signed by the FMLN, the Salvadoran Government and the UN as mediator.' },
  { cat: 'historia', nivel: 'medio', pregunta: 'In what year was General Romero removed from office?', opciones: ['1977', '1979', '1980', '1982'], correcta: 1, explicacion: 'General Carlos Humberto Romero was overthrown in the military coup of October 15, 1979.' },

  // Hard (28)
  { cat: 'historia', nivel: 'dificil', pregunta: 'What was the name of the Pipil chief who led the resistance against Pedro de Alvarado?', opciones: ['Lempira', 'Atlacatl', 'Nicarao', 'Tezozomoc'], correcta: 1, explicacion: 'Atlacatl was the legendary Pipil warrior chief who led indigenous resistance against the conquest.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'Who led the indigenous uprising of 1833 in Nonualco?', opciones: ['Farabundo Martí', 'Anastasio Aquino', 'Felipe Xicotencatl', 'Miguel Cabrera'], correcta: 1, explicacion: 'Anastasio Aquino, known as the "King of the Nonualcos," led a peasant and indigenous rebellion in 1833.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'On what date was Archbishop Óscar Romero assassinated?', opciones: ['January 16, 1980', 'March 24, 1980', 'October 15, 1979', 'November 11, 1989'], correcta: 1, explicacion: 'Óscar Romero was assassinated on March 24, 1980, while celebrating Mass.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'What was the first Salvadoran cry of independence and on what date?', opciones: ['November 5, 1811', 'September 15, 1821', 'February 24, 1814', 'November 2, 1811'], correcta: 0, explicacion: 'The first cry of independence occurred on November 5, 1811, led by José Matías Delgado.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'Which international treaty recognized El Salvador\'s borders with Honduras?', opciones: ['Lima Peace Treaty', 'Washington Treaty', '1980 General Peace Treaty', 'Esquipulas Treaty'], correcta: 2, explicacion: 'The 1980 General Peace Treaty established the territorial limits between El Salvador and Honduras.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'In which department is the ancient pre-Hispanic capital of Cuzcatlán located?', opciones: ['San Salvador', 'La Libertad', 'Cuscatlán', 'Chalatenango'], correcta: 1, explicacion: 'The pre-Hispanic capital was located in what is now Antiguo Cuscatlán, in La Libertad department.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'What was the name of the 1979 coup d\'état?', opciones: ['The April Revolution', 'The Young Military Coup', 'The Civic-Military Proclamation', 'The October 15 Pronouncement'], correcta: 3, explicacion: 'On October 15, 1979, the "October 15 Pronouncement" occurred, overthrowing General Romero.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'What is the name of the sector that historically dominated Salvadoran politics?', opciones: ['The Golden Circle', 'The 14 Families', 'The Coffee Elite', 'The Lords of the Land'], correcta: 1, explicacion: '"The 14 Families" is the popular term for the coffee oligarchy of the 20th century.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'Who was appointed president during the Peace Accords?', opciones: ['Alfredo Cristiani', 'José Napoleón Duarte', 'Cristiani', 'Funes'], correcta: 0, explicacion: 'Alfredo Cristiani was president during the signing of the Chapultepec Peace Accords in 1992.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'In which battle were the Pipil definitively defeated by the Spanish?', opciones: ['Battle of Acajutla', 'Battle of San Salvador', 'Battle of Cuzcatlán', 'Battle of Chalchuapa'], correcta: 0, explicacion: 'Although Alvarado was initially wounded, the Spanish eventually gained territorial control.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'What was the colonial administrative structure of El Salvador?', opciones: ['Independent viceroyalty', 'Province of the Captaincy General of Guatemala', 'Autonomous government', 'Direct mayoralty'], correcta: 1, explicacion: 'El Salvador was a Province of the Captaincy General of Guatemala during colonial times.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'What important reform did Barrios carry out in the 19th century?', opciones: ['Economic liberalization', 'Agrarian reform', 'Democratization', 'Nationalization of coffee'], correcta: 0, explicacion: 'Justo Rufino Barrios promoted liberal reforms that modernized Central America in the 1870s.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'How many main guerrilla commanders led the FMLN?', opciones: ['3', '4', '5', '6'], correcta: 2, explicacion: 'The FMLN was composed of 5 guerrilla organizations with their main commanders.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'Which international agreement sponsored the Peace Accords?', opciones: ['League of Nations', 'United Nations', 'Organization of American States', 'European Union'], correcta: 1, explicacion: 'The United Nations (UN) was the official mediator in the 1992 Peace Accords.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'In which period did the greatest Salvadoran migration to the United States occur?', opciones: ['1950s', '1970s', '1980s-1990s', '2000s'], correcta: 2, explicacion: 'The 1980-1992 Civil War caused the largest migration of Salvadorans to the United States.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'What was the first colony established by the Spanish in El Salvador?', opciones: ['San Vicente', 'San Salvador', 'Sonsonate', 'Santa Ana'], correcta: 2, explicacion: 'Sonsonate was one of the first Spanish colonies established in Salvadoran territory.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'Who wrote the 1886 Constitution of El Salvador?', opciones: ['Santiago González', 'Marcelino García Flamenco', 'Rafael Antonio Gutiérrez', 'Prudencio Peralta'], correcta: 2, explicacion: 'The 1886 Constitution was important in the formation of the modern Salvadoran state.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'In what year did Spanish presence in El Salvador officially end?', opciones: ['1811', '1821', '1841', '1900'], correcta: 1, explicacion: 'With Central American independence in 1821, Spanish presence in El Salvador ended.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'What caused the fracture of the Central American Federation?', opciones: ['English invasion', 'Political and economic differences between states', 'Earthquake', 'French Revolution'], correcta: 1, explicacion: 'Political differences, conservative vs. liberal, and divergent economic interests caused disintegration.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'Which city was the capital of El Salvador during the federal period?', opciones: ['San Vicente', 'San Salvador', 'Santa Ana', 'La Libertad'], correcta: 1, explicacion: 'San Salvador was the capital during the Central American Federation period.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'What was the main cause of the 1969 Football War?', opciones: ['Only sports rivalry', 'Border conflicts and migratory tensions', 'Dispute over mining resources', 'US intervention'], correcta: 1, explicacion: 'The war resulted from border conflicts, sporting tensions, and Salvadoran migration to Honduras.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'Which institution mediated the conflict in the Peace Accords?', opciones: ['Red Cross', 'United Nations', 'Organization of American States', 'Arab League'], correcta: 1, explicacion: 'The UN played a crucial role as mediator and verifier of the Peace Accords.' },
  { cat: 'historia', nivel: 'dificil', pregunta: 'How many constitutions has El Salvador had in its history?', opciones: ['5', '6', '7', '8'], correcta: 2, explicacion: 'El Salvador has had several constitutions, the current one being from 1983 with numerous reforms.' },

  // 100% GUANACO (28)
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What was the heraldic symbol of the Pipil kingdom?', opciones: ['The imperial eagle', 'The quetzal', 'The jaguar', 'The feathered serpent'], correcta: 3, explicacion: 'The feathered serpent (Quetzalcoatl) was a main symbol in Nahua cosmogony.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'On which river did the most important battle against Pedro de Alvarado occur?', opciones: ['Lempa River', 'Acajutla River', 'Grande River', 'Paz River'], correcta: 1, explicacion: 'The Acajutla River was the site where the Pipil put up their fiercest resistance to Pedro de Alvarado.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What does "Cuscatlán" mean etymologically in its deep sense?', opciones: ['Land of the gods', 'Place of abundant jewels and riches', 'Sacred valley of water', 'Eagle mountain'], correcta: 1, explicacion: 'Cuscatlán from Nahuatl "Cōzcatl" (jewel) and "tlān" (place), literally means "place of jewels".' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What was the main currency of exchange among the Pipil?', opciones: ['Gold dust', 'Cacao beans', 'Salt', 'Quetzal feathers'], correcta: 1, explicacion: 'Cacao was the main currency of exchange and symbol of wealth in Mesoamerican cultures.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What was called "tlatoani" in Pipil society?', opciones: ['Legendary warrior', 'High priest', 'Ruler/King', 'Chief merchant'], correcta: 2, explicacion: 'Tlatoani means "the one who speaks" and referred to the supreme ruler in Nahua society.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What main crops did the Cuscatlán region provide as tribute?', opciones: ['Wheat and barley', 'Corn, cacao and cotton', 'Coffee and plantain', 'Rice and yuca'], correcta: 1, explicacion: 'The main tributes of the territory included corn, cacao, cotton and other valuable products.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What was the smallest but most strategic political organization of the Pipil?', opciones: ['The empire', 'The chiefdom', 'The tribal alliance', 'The council'], correcta: 1, explicacion: 'Chiefdoms were independent political entities governed by caciques or tlatoanis.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'Which deity was considered the most important among the Pipil?', opciones: ['Tezcatlipoca', 'Quetzalcoatl', 'Tlaloc', 'Huitzilopochtli'], correcta: 1, explicacion: 'Quetzalcoatl, the feathered serpent, was one of the most venerated deities.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'Approximately how many glyphs made up the Nahua writing system?', opciones: ['500', '800', '1000', '1500'], correcta: 2, explicacion: 'The Nahua writing system had approximately 1000 ideographic and phonetic glyphs.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What was the "Xacatl" in Pipil cosmology?', opciones: ['A type of weapon', 'A ceremonial calendar', 'A form of tribute', 'A rain god'], correcta: 1, explicacion: 'The Mesoamerican calendar functioned with 52-year cycles of deep ceremonial importance.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What was the most oppressive social structure for non-noble Pipil people?', opciones: ['Caste system', 'Ritual slavery', 'Tribute and forced labor (tequio)', 'Serfdom'], correcta: 2, explicacion: 'Tequio was a system of compulsory labor paid by conquered and subjugated peoples.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What historical event definitively marked the end of the Central American Federation?', opciones: ['Separation of Guatemala', 'Barrios Reform', 'Death of Morazán in 1842', 'War with the United States'], correcta: 2, explicacion: 'The execution of Francisco Morazán in 1842 symbolized the definitive end of federalist attempts.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What was the predominant ideology that led to the 1979 coup?', opciones: ['Socialism', 'Progressive militarism', 'Liberalism', 'Communism'], correcta: 1, explicacion: 'Young military officers with progressive ideology executed the 1979 coup against General Romero.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'Which international organization verified compliance with the Peace Accords?', opciones: ['ONUCA', 'CEPAL', 'ALCA', 'SICA'], correcta: 0, explicacion: 'The United Nations Observer Mission in Central America (ONUCA) verified the agreements.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What was the main geopolitical change after the Peace Accords?', opciones: ['Integration with Mexico', 'Military independence from the USA', 'Transition to civil democracy', 'Central American unification'], correcta: 2, explicacion: 'The Accords marked the transition from a military regime to Salvadoran civil democracy.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What does "guanaco" mean in Salvadoran culture?', opciones: ['Brave warrior', 'Person of authentic Salvadoran origin', 'Sacred animal', 'Village chief'], correcta: 1, explicacion: '"Guanaco" is an affectionate term for a truly Salvadoran and authentic person.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'How many different phases did the Salvadoran Civil War have?', opciones: ['2', '3', '4', '5'], correcta: 3, explicacion: 'The war went through phases of guerrilla offensive, military counteroffensive, stalemate and negotiation.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What was the most documented massacre during the Civil War?', opciones: ['El Mozote', 'La Rutilla', 'San Antonio Abad', 'Las Vueltas'], correcta: 0, explicacion: 'The El Mozote massacre in 1981 is considered the most serious, with hundreds of civilians killed.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What historical significance did the taking of San Salvador in 1989 have?', opciones: ['End of the war', 'Demonstration of guerrilla military capability', 'Surrender of the FMLN', 'US intervention'], correcta: 1, explicacion: 'The 89 Offensive demonstrated that the FMLN had the capacity to attack the capital and accelerate negotiations.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'Who was Monsignor Óscar Romero before becoming Archbishop?', opciones: ['Bishop of Cojutepeque', 'Bishop of Santiago de María', 'Rural priest', 'Seminary professor'], correcta: 1, explicacion: 'Óscar Romero was Bishop of Santiago de María before being appointed Archbishop of San Salvador.' },
  { cat: 'historia', nivel: 'guanaco', pregunta: 'What was José Matías Delgado\'s ideological basis?', opciones: ['Radical Enlightenment', 'Catholic and secular reformism', 'Primitive communism', 'Anarchism'], correcta: 1, explicacion: 'Delgado was a reformist priest influenced by 18th-century Enlightenment thought.' },

  // ======== GASTRONOMY ========
  // Easy (28)
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is the national dish of El Salvador?', opciones: ['Baleadas', 'Pupusas', 'Sopa de Pata', 'Tamales'], correcta: 1, explicacion: 'Pupusas are the national dish, declared Intangible Cultural Heritage.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is always served with pupusas?', opciones: ['Rice and beans', 'Curtido and tomato sauce', 'Cream and cheese', 'Chimol'], correcta: 1, explicacion: 'Pupusas are always served with curtido and homemade tomato sauce.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What are rice pupusas made of?', opciones: ['Wheat flour', 'Ground rice masa', 'Yellow corn flour', 'Yuca masa'], correcta: 1, explicacion: 'Rice pupusas are made with ground rice masa.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is the most popular traditional filling for pupusas?', opciones: ['Only cheese', 'Cheese and loroco', 'Only beans', 'Shrimp'], correcta: 1, explicacion: 'Cheese and loroco filling is the most popular and traditional in El Salvador.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is loroco?', opciones: ['A fruit', 'An edible flower', 'A type of bean', 'An aromatic herb'], correcta: 1, explicacion: 'Loroco is an edible flower native to Central America, widely used in Salvadoran cuisine.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What traditional drink is made with corn in El Salvador?', opciones: ['Chamomile tea', 'Atol', 'Oat water', 'Sugar cane juice'], correcta: 1, explicacion: 'Atol is a traditional drink made from ground corn, very popular at breakfast.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What are the most typical tamales in El Salvador?', opciones: ['Sweet tamales', 'Chicken and green tamales', 'Chili tamales', 'Cheese tamales'], correcta: 1, explicacion: 'Chicken and green (corn) tamales are the most typical of Salvadoran cuisine.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is an arepa?', opciones: ['A dessert', 'A fried corn bread', 'A type of soup', 'A drink'], correcta: 1, explicacion: 'The arepa is a round, fried corn masa bread, very common in El Salvador.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is the most typical dessert for festivities in El Salvador?', opciones: ['Flan', 'Rice pudding', 'Salvadoran quesadilla', 'Ice cream'], correcta: 2, explicacion: 'The Salvadoran quesadilla (cheese and ayote) is a special traditional dessert for festivities.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'In which month is National Pupusa Day celebrated?', opciones: ['October', 'November', 'December', 'January'], correcta: 1, explicacion: 'National Pupusa Day is celebrated on the second Sunday of November since 2005.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What basic ingredient is essential in a pupusa?', opciones: ['Cheese', 'Beans', 'Corn masa', 'Loroco'], correcta: 2, explicacion: 'Corn masa is the fundamental ingredient of every Salvadoran pupusa.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'Where does the pupusa recipe originally come from?', opciones: ['Mexico', 'Indigenous peoples of El Salvador', 'Guatemala', 'Nicaragua'], correcta: 1, explicacion: 'Pupusas have roots in the gastronomy of the indigenous peoples of El Salvador.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is chimol?', opciones: ['A tomato sauce', 'A corn seasoning', 'A drink', 'A vegetable'], correcta: 0, explicacion: 'Chimol is a sauce made with tomato, onion, chili and other Salvadoran spices.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is the most popular soup in El Salvador?', opciones: ['Chicken soup', 'Seafood soup', 'Sopa de Pata', 'Shrimp broth'], correcta: 2, explicacion: 'Sopa de Pata is a very popular traditional soup, especially at celebrations and weekends.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is typically served with Sopa de Pata?', opciones: ['Thin tortillas', 'Corn bread', 'Fried plantain', 'Oatmeal'], correcta: 0, explicacion: 'Sopa de Pata is traditionally served with thin corn tortillas and cream.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is the prepared plantain that is a common side dish?', opciones: ['Raw plantain', 'Fried plantain', 'Boiled plantain', 'Roasted plantain'], correcta: 1, explicacion: 'Fried plantain is a classic side dish in Salvadoran food, especially at breakfast.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What is the typical drink made with toasted corn?', opciones: ['Pozol', 'Barley water', 'Corn coffee', 'Atol de elote'], correcta: 0, explicacion: 'Pozol is a traditional drink made with corn and other ingredients, very popular in summer.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What does "pupusa" mean etymologically?', opciones: ['Stuffed food', 'Inflated bread', 'Soft masa', 'Fast food'], correcta: 2, explicacion: 'Pupusa comes from the Pipil "pupuça" meaning "soft masa" or "inflated thing".' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'In which region of El Salvador did pupusas originate?', opciones: ['East', 'Center', 'West', 'Coast'], correcta: 2, explicacion: 'Pupusas originated in the western region of El Salvador, especially in Ahuachapán and Sonsonate.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What type of corn is traditionally used to make pupusas?', opciones: ['Yellow corn', 'White criollo corn', 'Popcorn', 'Sweet corn'], correcta: 1, explicacion: 'White criollo corn is used, ground into fresh masa to prepare authentic pupusas.' },
  { cat: 'gastronomia', nivel: 'facil', pregunta: 'What drink is commonly served at breakfast with atol?', opciones: ['American coffee', 'Black coffee', 'Horchata', 'Evaporated milk'], correcta: 1, explicacion: 'Black coffee is the traditional drink that accompanies atol in Salvadoran breakfasts.' },

  // Medium (28)
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What variants of stuffed pupusas exist in El Salvador?', opciones: ['Only 2 types', 'Cheese, beans, loroco, chicharrón, shrimp, and more', 'Only cheese', 'Only vegetables'], correcta: 1, explicacion: 'There are multiple varieties with different fillings depending on the region and creativity.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What is the correct preparation of curtido?', opciones: ['Shredded raw cabbage', 'Fermented cabbage with vinegar and spices', 'Cooked cabbage', 'Pickled cabbage in water'], correcta: 1, explicacion: 'Curtido is fermented cabbage with carrot, onion, chili and vinegar in a pickling process.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What cooking method is used to make authentic pupusas?', opciones: ['Oven', 'Comal or griddle', 'Deep pan', 'Pot'], correcta: 1, explicacion: 'Pupusas are cooked on a clay/metal comal or griddle over medium heat until golden.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What is the correct consistency of pupusa masa?', opciones: ['Very soft', 'Firm but moldable', 'Very hard', 'Very wet'], correcta: 1, explicacion: 'The masa should be firm and moldable, neither too soft nor too hard, to fill it correctly.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What is known as "pupusa revuelta"?', opciones: ['Pupusa without filling', 'Pupusa with a mix of several fillings', 'Broken pupusa', 'Small pupusa'], correcta: 1, explicacion: 'Pupusa revuelta contains a mix of fillings such as cheese, beans and chicharrón.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What role does yuca play in Salvadoran cuisine?', opciones: ['Only a spice', 'Side dish and dessert base', 'Drink', 'Rarely used'], correcta: 1, explicacion: 'Yuca is a versatile food, used as a fried side dish or in various preparations.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What is the difference between pan de yuca and pupusa?', opciones: ['None', 'Pan de yuca is yuca flour, pupusa is corn masa', 'Pan de yuca is larger', 'Same preparation'], correcta: 1, explicacion: 'Pan de yuca is made with grated yuca flour while pupusa uses ground corn masa.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What is the "Salvadoran enchilada"?', opciones: ['Corn cake with sauce', 'Rolled tortilla with meat and spicy sauce', 'Pupusa filled with chili', 'Arepa with chimol'], correcta: 1, explicacion: 'The Salvadoran enchilada is a rolled corn tortilla with meat filling and sauce.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What is the cultural importance of pupusas in festivities?', opciones: ['None', 'They are central to birthdays and celebrations', 'They are only eaten alone', 'Recent invention'], correcta: 1, explicacion: 'Pupusas are central to almost all Salvadoran festivities and celebrations.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What technique is used to make wheat tortillas in El Salvador?', opciones: ['Manual press', 'Corn mill', 'Hand on masa', 'Rolling pin'], correcta: 0, explicacion: 'Traditionally, a wooden or metal press is used to make uniform tortillas.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What is the typical Salvadoran Christmas drink?', opciones: ['Champurrada', 'Fruit punch', 'Horchata', 'Saffron water'], correcta: 0, explicacion: 'Champurrada is a typical Christmas drink made with corn, piloncillo and spices.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What is the use of piloncillo in Salvadoran cooking?', opciones: ['Only as a drink', 'Sweetener and dessert base', 'Rarely used', 'Only for coffee'], correcta: 1, explicacion: 'Piloncillo is a versatile natural sweetener, used in drinks, desserts and savory foods.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What are the basic ingredients of atol?', opciones: ['Flour, water, salt', 'Ground corn, milk, sugar, cinnamon', 'Only corn and water', 'Rice and milk'], correcta: 1, explicacion: 'Atol is made with ground corn, milk (or water), sugar and flavored with cinnamon.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'Which atol variant is typical for strained breakfasts?', opciones: ['Atol de elote', 'White atol or corn atol', 'Plantain atol', 'Bean atol'], correcta: 1, explicacion: 'White atol is the most common for breakfast, made with strained white corn.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'How long is curtido left to ferment?', opciones: ['It is not fermented', 'Minimum 2-3 hours', 'All night', 'One week'], correcta: 1, explicacion: 'Curtido typically ferments for 2-3 hours or more to develop its characteristic flavor.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What is the function of loroco in Salvadoran cuisine?', opciones: ['Only decoration', 'Unique and distinctive flavor in pupusas and dishes', 'Medicinal', 'Flavorless filling'], correcta: 1, explicacion: 'Loroco provides a unique, floral flavor that is distinctive in Salvadoran cooking.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What is the texture difference between pan de yuca and pupusa?', opciones: ['None', 'Pan de yuca is crispier, pupusa is soft', 'Pupusa is crispy', 'Same texture'], correcta: 1, explicacion: 'Pan de yuca is crispier and more porous, while pupusa is soft and dense.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What is the typical drink with cacao in El Salvador?', opciones: ['Black coffee', 'Salvadoran chocolate', 'Cacao atol', 'Vanilla water'], correcta: 1, explicacion: 'Salvadoran chocolate, made with locally ground cacao, is a special traditional drink.' },
  { cat: 'gastronomia', nivel: 'medio', pregunta: 'What factor determines the authenticity of a pupusa?', opciones: ['Only size', 'Fresh ingredients and traditional preparation', 'Type of griddle', 'Amount of filling'], correcta: 1, explicacion: 'Authenticity comes from using fresh ingredients and respecting the traditional recipe passed down.' },

  // Hard (28)
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'What is the exact origin of the word "pupusa" according to linguists?', opciones: ['Colonial Spanish', 'Pre-Hispanic Pipil: pu (bulging) + puca (white thing)', 'Portuguese', 'Arabic'], correcta: 1, explicacion: 'It derives from Pipil: "pu" (inflated) and "puca" (white thing), an exact description of the pupusa.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'What is the exact culinary technique to achieve the "crispy skin" of the pupusa?', opciones: ['Very high temperature', 'Medium temperature with correct timing and precise flipping', 'Low temperature', 'Double cooking'], correcta: 1, explicacion: 'Medium temperature and precise flips are needed to brown without burning, achieving the ideal texture.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'What is the exact fermentation process of traditional curtido?', opciones: ['Chemical pickling', 'Natural lactic fermentation of 48-72 hours', 'Vinegar cooking', 'Freezing'], correcta: 1, explicacion: 'Genuine curtido uses lactic fermentation for 48-72 hours with beneficial microorganisms.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'What enzymes are present in the grinding process of nixtamalized corn?', opciones: ['Amylases', 'Proteases and peptidases that change properties', 'Lipases', 'Glucosidases'], correcta: 1, explicacion: 'Nixtamalization activates proteases that make corn more nutritious and digestible.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'What is the optimal pH of fermented curtido?', opciones: ['4.5-5.5', '6-7', '3.5-4', '7-8'], correcta: 2, explicacion: 'The acidic pH of 3.5-4 preserves curtido and gives it its characteristic flavor.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'What type of flour was used pre-Hispanically for pupusas or similar foods?', opciones: ['Wheat flour', 'Corn ground on a metate', 'Barley flour', 'Yuca masa'], correcta: 1, explicacion: 'Indigenous peoples used stones (metates) to grind nixtamalized corn into fresh masa.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'What is the exact chemical composition of loroco?', opciones: ['Only protein', 'Proteins, fiber, vitamins A and C mainly', 'Only carbohydrates', 'Mainly fats'], correcta: 1, explicacion: 'Loroco is rich in vitamin C, vitamin A, fiber and proteins, plus aromatic compounds.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'What nutritional difference exists between white and yellow corn atol?', opciones: ['None', 'Yellow has more beta-carotene', 'White has more protein', 'Yellow is more digestible'], correcta: 1, explicacion: 'Yellow corn contains more beta-carotene (vitamin A precursor) than white corn.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'What is the nixtamalization process and its importance?', opciones: ['Simple cooking', 'Cooking in lime to release niacin and increase bioavailability', 'Corn fermentation', 'Sun drying'], correcta: 1, explicacion: 'Nixtamalization (cooking in calcium hydroxide) makes corn more nutritious and digestible.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'Which loroco variety is specifically Salvadoran?', opciones: ['Purple loroco', 'Salvadoran loroco (Fernaldia pandurata)', 'Red loroco', 'Golden loroco'], correcta: 1, explicacion: 'Fernaldia pandurata is the native and distinctive loroco species of El Salvador and Central America.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'What was the role of pulque in pre-Hispanic Salvadoran cuisine?', opciones: ['Not used', 'Important ceremonial drink', 'Only medicinal', 'Common daily drink'], correcta: 1, explicacion: 'Pulque had ceremonial importance in pre-Hispanic ritual contexts.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'In which department is the finest and most aromatic loroco grown?', opciones: ['Santa Ana', 'Sonsonate', 'Cuscatlán', 'La Paz'], correcta: 1, explicacion: 'Sonsonate, especially in highland areas, produces the most aromatic and highest-quality loroco.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'What is the main bacterium responsible for curtido fermentation?', opciones: ['E. coli', 'Lactobacillus species', 'Salmonella', 'Staphylococcus'], correcta: 1, explicacion: 'Lactobacillus bacteria produce lactic acid, creating the fermentative environment.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'What is the average yield of corn to masa in pupusa preparation?', opciones: ['50%', '60-70%', '80-90%', '99%'], correcta: 1, explicacion: 'Approximately 60-70% of the corn weight becomes usable masa for pupusas.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'What cooking technique minimizes nutrient loss in atol?', opciones: ['Prolonged boiling', 'Gentle and quick cooking without excess heat', 'Frying the corn', 'Oven'], correcta: 1, explicacion: 'Moderate and quick cooking better preserves heat-sensitive vitamins like vitamin C.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'What is the correct corn-to-water ratio in traditional atol?', opciones: ['1:2', '1:3 to 1:5 depending on desired consistency', '1:1', '1:10'], correcta: 1, explicacion: 'The ratio varies depending on whether you want thicker (1:3) or thinner (1:5) atol.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'What microorganism could contaminate poorly fermented curtido?', opciones: ['Only beneficial bacteria', 'Molds, pathogenic yeasts and harmful bacteria', 'Only viruses', 'Nothing, it is impossible'], correcta: 1, explicacion: 'A curtido with poor fermentation can be contaminated with molds, Salmonella or other pathogens.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'How important is temperature in curtido fermentation?', opciones: ['Irrelevant', 'Critical: 18-25°C favors Lactobacillus', 'Higher temperature is always better', 'Freezing is optimal'], correcta: 1, explicacion: 'Temperatures of 18-25°C are optimal for the growth of beneficial lactic acid bacteria.' },
  { cat: 'gastronomia', nivel: 'dificil', pregunta: 'What chemical components make loroco aromatic?', opciones: ['Only water and fiber', 'Essential oils, aldehydes and volatile compounds', 'Simple glucose', 'Crude protein'], correcta: 1, explicacion: 'Essential oils and volatile aromatic compounds give loroco its unique aroma and flavor.' },

  // 100% GUANACO GASTRONOMY (28)
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What was the most important ritual drink in the pre-Hispanic cacao ceremony?', opciones: ['Atol', 'Foamy chocolate xocolatl', 'Pulque', 'Barley water'], correcta: 1, explicacion: 'Xocolatl was a sacred ritual drink served at important ceremonies of the Nahua peoples.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'Exactly how many types of chili peppers are used in Salvadoran cuisine?', opciones: ['2', 'More than 8 regional varieties', '4', '6'], correcta: 1, explicacion: 'El Salvador uses chili mora, chili verde, chili rojo, chili macho and other regional varieties.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What ancestral food preservation technique was used?', opciones: ['Refrigeration', 'Sun drying and smoking', 'Freezing', 'Canning'], correcta: 1, explicacion: 'Ancestral techniques include sun drying, smoking and fermentation to preserve food.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What meaning does the pupusa have in modern Salvadoran cultural identity?', opciones: ['Only fast food', 'Symbol of national identity and living cultural heritage', 'Poor people\'s food', 'Recent invention'], correcta: 1, explicacion: 'The pupusa represents Salvadoran identity, being declared Intangible Cultural Heritage.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What is the preparation process of ayote for quesadillas?', opciones: ['Raw grating', 'Cooking, dehydration and fine grinding', 'Whole frying', 'Boiling only'], correcta: 1, explicacion: 'Ayote is cooked, dehydrated and finely ground to make the quesadilla mixture.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What ancestral technique is used to toast corn for pozol?', opciones: ['Modern oven', 'Comal over direct fire with constant stirring', 'Deep pan', 'Boiling water'], correcta: 1, explicacion: 'Corn is toasted on a hot comal with stirring to develop characteristic flavor.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What is the exact composition of authentic Salvadoran chimol?', opciones: ['Only tomato', 'Tomato, onion, chili, cilantro, cumin in specific proportions', 'Only onion and chili', 'Vinegar and tomato'], correcta: 1, explicacion: 'Authentic chimol is a balanced mixture of tomato, onion, chili, cilantro and spices.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What type of water is traditionally used for pupusa masa?', opciones: ['Tap water', 'Warm water to optimally activate gluten', 'Cold water', 'Boiled water'], correcta: 1, explicacion: 'Warm water helps develop the optimal gluten-starch structure of the masa.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What are the five fundamental flavors of Salvadoran cuisine?', opciones: ['5 basic universal flavors', 'Salty, sour, spicy, sweet and regional umami', 'Only salty and spicy', 'Bitter and astringent'], correcta: 1, explicacion: 'Salvadoran gastronomy balances salty, sour (curtido), spicy, sweet and umami (broth).' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What function does fermentation metabolism have in curtido?', opciones: ['Destroy nutrients', 'Increase probiotics and bioavailability of minerals', 'Only change flavor', 'Reduce vitamins'], correcta: 1, explicacion: 'Fermentation creates beneficial probiotics and improves calcium and iron absorption.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What is the exact optimal time for curtido fermentation?', opciones: ['Instant', '48-72 hours at 20-22°C for optimal flavor and safety', '2 weeks', 'Months'], correcta: 1, explicacion: 'The optimal range is 48-72 hours; after that, excessive enzymatic degradation begins.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What culinary approach characterizes Salvadoran cuisine: local, regional or international?', opciones: ['Mainly international', 'Deeply rooted in local and regional ingredients and techniques', 'Mostly European', 'Completely nomadic'], correcta: 1, explicacion: 'Salvadoran cuisine is fundamentally local, using ancestral ingredients and techniques.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What is the history of corn adoption in the Salvadoran diet?', opciones: ['Recent (19th-20th centuries)', 'Central for 3000+ years in the Mesoamerican region', 'Never really adopted', 'Since the conquest'], correcta: 1, explicacion: 'Corn has been central in the Mesoamerican region for over 3000 years.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What role did cacao play in the history of El Salvador?', opciones: ['Not important', 'Valuable pre-Hispanic crop, later replaced by coffee', 'Always as important as now', 'Pure Spanish introduction'], correcta: 1, explicacion: 'Cacao was an important pre-Hispanic crop that lost relevance with the introduction of coffee.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What is the cultural importance of eating in a group (pupusadas)?', opciones: ['Only economy', 'Reinforcement of community identity and social bonds', 'Recent trend', 'No importance'], correcta: 1, explicacion: 'Pupusadas are social gatherings that reinforce community identity and solidarity.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What is the relationship between climate and flavor in Salvadoran ingredients?', opciones: ['No relationship', 'Direct: tropical climate produces unique intense flavors', 'Only affects size', 'Only affects price'], correcta: 1, explicacion: 'Salvadoran tropical climate concentrates flavors in ingredients, making them particularly aromatic.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What recent innovation has impacted traditional Salvadoran cuisine?', opciones: ['Elimination of traditions', 'Creative fusion maintaining ancestral roots', 'Destructive globalization', 'Nothing has changed'], correcta: 1, explicacion: 'Modern Salvadoran chefs fuse contemporary techniques with ancestral ingredients and flavors.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What is the science behind the "perfect golden brown" of a pupusa?', opciones: ['Luck', 'Maillard reaction between proteins and carbohydrates at 140-160°C', 'Only long cooking', 'Natural color of corn'], correcta: 1, explicacion: 'The Maillard reaction creates aromatic compounds that produce the golden color and characteristic flavor.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What makes curtido probiotic and beneficial?', opciones: ['Added vinegar', 'Colonization by Lactobacillus during controlled anaerobic fermentation', 'Only spices', 'Fast fermentation'], correcta: 1, explicacion: 'Lactobacillus produce lactic acid and create a probiotic environment beneficial for digestion.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What is the future of Salvadoran gastronomy in the face of globalization?', opciones: ['Total disappearance', 'Dynamic evolution preserving identity while innovating', 'Stagnation', 'Total adoption of international cuisine'], correcta: 1, explicacion: 'Salvadoran cuisine evolves while maintaining deep identity and exploring modern techniques.' },
  { cat: 'gastronomia', nivel: 'guanaco', pregunta: 'What international certification did the pupusa receive?', opciones: ['Only national', 'UNESCO Intangible Cultural Heritage of Humanity', 'Registered trademark', 'Patent protection'], correcta: 1, explicacion: 'Pupusas were declared UNESCO Intangible Cultural Heritage of Humanity in 2005.' },

  // ======== CULTURAL SITES ========
  // Easy (15)
  { cat: 'sitios', nivel: 'facil', pregunta: 'In which department is the Joya de Cerén archaeological site located?', opciones: ['La Libertad', 'Santa Ana', 'San Vicente', 'Cuscatlán'], correcta: 0, explicacion: 'Joya de Cerén is in the municipality of San Juan Opico, La Libertad department.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'What is Joya de Cerén popularly known as due to its extraordinary state of preservation?', opciones: ['The Pompeii of the Americas', 'The Salvadoran Machu Picchu', 'The Atlantis of Central America', 'The Salvadoran Petén'], correcta: 0, explicacion: 'It is called "the Pompeii of the Americas" because, like the Italian city, it was buried under volcanic ash that preserved everyday life.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'The Tazumal archaeological site is located in the municipality of Chalchuapa, in the department of:', opciones: ['Santa Ana', 'Sonsonate', 'Ahuachapán', 'La Unión'], correcta: 0, explicacion: 'Tazumal is in Chalchuapa, Santa Ana department, about 80 km west of San Salvador.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'Which colonial town is recognized for its architecture, cobblestone streets, and indigo tradition?', opciones: ['Suchitoto', 'Ilobasco', 'Nahuizalco', 'Berlín'], correcta: 0, explicacion: 'Suchitoto, in Cuscatlán department, is famous for its colonial architecture, Lake Suchitlán, and its history linked to indigo cultivation.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'The rock formation known as Puerta del Diablo is located in Los Planes de Renderos, near:', opciones: ['Panchimalco', 'Concepción de Ataco', 'Juayúa', 'Perquín'], correcta: 0, explicacion: 'Puerta del Diablo is a natural viewpoint located in Los Planes de Renderos, very close to the town of Panchimalco.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'The Ruta de las Flores crosses towns in the departments of Sonsonate and:', opciones: ['Ahuachapán', 'Morazán', 'Usulután', 'La Unión'], correcta: 0, explicacion: 'Ruta de las Flores runs through towns such as Nahuizalco, Juayúa and Apaneca in Sonsonate, and Concepción de Ataco and Tacuba in Ahuachapán.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'The Metropolitan Cathedral of San Salvador is famous for the mosaic façade created by the artist:', opciones: ['Fernando Llort', 'Salarrué', 'Roque Dalton', 'Claudia Lars'], correcta: 0, explicacion: 'The colorful mosaic on the Cathedral\'s façade was designed by renowned Salvadoran artist Fernando Llort.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'El Boquerón National Park corresponds to the crater of which volcano?', opciones: ['San Salvador Volcano', 'Izalco Volcano', 'San Vicente Volcano', 'Santa Ana Volcano'], correcta: 0, explicacion: 'El Boquerón is the crater of the San Salvador volcano, turned into a national park.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'What is the museum in San Salvador dedicated to the country\'s archaeology and anthropology called?', opciones: ['National Museum of Anthropology David J. Guzmán', 'El Salvador Museum of Art', 'Museum of the Word and Image', 'Tin Marín Museum'], correcta: 0, explicacion: 'The MUNA (National Museum of Anthropology David J. Guzmán) safeguards archaeological and ethnographic pieces of the country.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'The town of Concepción de Ataco, on the Ruta de las Flores, is especially known for:', opciones: ['Its colorful murals on the facades', 'Its beaches', 'Its ceramic production', 'Its annual carnival'], correcta: 0, explicacion: 'Concepción de Ataco stands out for the artistic murals that decorate the facades of its streets.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'The remains of whom rest in the Metropolitan Cathedral of San Salvador?', opciones: ['Monsignor Óscar Arnulfo Romero', 'President José Matías Delgado', 'General Maximiliano Hernández Martínez', 'Poet Francisco Gavidia'], correcta: 0, explicacion: 'The crypt of the Metropolitan Cathedral holds the tomb of Monsignor Óscar Arnulfo Romero.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'The National Theater of San Salvador is recognized as:', opciones: ['The oldest theater in Central America', 'The largest theater in Latin America', 'An old colonial fortress', 'A replica of the Colón Theater'], correcta: 0, explicacion: 'The National Theater of San Salvador is considered the oldest theater in Central America.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'What type of site is Joya de Cerén, according to archaeologists?', opciones: ['A Mayan agricultural village', 'A royal palace', 'A military fortress', 'An Aztec ceremonial center'], correcta: 0, explicacion: 'Joya de Cerén was a Mayan agricultural village from the Classic period, tributary to the political center of San Andrés.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'Panchimalco, near San Salvador, is famous for its festival called:', opciones: ['Festival of Flowers and Palms', 'Indigo Festival', 'San Miguel Carnival', 'Peace Fair'], correcta: 0, explicacion: 'Panchimalco celebrates every year the traditional Festival of Flowers and Palms, of indigenous origin.' },
  { cat: 'sitios', nivel: 'facil', pregunta: 'The Tazumal archaeological site is part of a broader archaeological zone that also includes:', opciones: ['Casa Blanca and El Trapiche', 'Copán and Tikal', 'Joya de Cerén and San Andrés', 'Cihuatán and Quelepa'], correcta: 0, explicacion: 'The Chalchuapa archaeological zone groups Tazumal together with other sites such as Casa Blanca and El Trapiche.' },

  // Medium (15)
  { cat: 'sitios', nivel: 'medio', pregunta: 'In what year was Joya de Cerén declared a UNESCO World Heritage Site?', opciones: ['1993', '1985', '2001', '1976'], correcta: 0, explicacion: 'Joya de Cerén was declared a UNESCO World Heritage Site in 1993.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'In what year were the structures of Joya de Cerén discovered?', opciones: ['1976', '1960', '1993', '1950'], correcta: 0, explicacion: 'It was discovered accidentally in 1976 while preparing the land to build grain silos.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'Which volcano buried the village of Joya de Cerén under its ash about 1,400 years ago?', opciones: ['Loma Caldera Volcano', 'Izalco Volcano', 'San Miguel Volcano', 'Chaparrastique Volcano'], correcta: 0, explicacion: 'The eruption of the Loma Caldera volcano, around 600 AD, buried the village under several layers of ash.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'Which American archaeologist led the first scientific investigations at Joya de Cerén?', opciones: ['Payson Sheets', 'Stanley Boggs', 'John Longyear', 'William Fash'], correcta: 0, explicacion: 'Dr. Payson Sheets from the University of Colorado in Boulder directed the first investigations between 1978 and 1980.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'The main pyramid of the Tazumal site reaches an approximate height of:', opciones: ['24 meters', '10 meters', '40 meters', '60 meters'], correcta: 0, explicacion: 'Structure 1 of Tazumal, the largest at the site, reaches about 24 meters in height.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'Which archaeologist carried out the first formal excavations at Tazumal, starting in 1940?', opciones: ['Stanley Boggs', 'Payson Sheets', 'Santiago Barberena', 'David Guzmán'], correcta: 0, explicacion: 'Stanley Boggs began formal investigations at Tazumal in 1940, identifying 13 structures.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'According to specialists, the name "Tazumal" approximately means:', opciones: ['Place where souls are consumed', 'Place of jewels', 'Valley of flowers', 'City of the gods'], correcta: 0, explicacion: 'In the Nahua-Quiché language, "Tazumal" is roughly translated as "place where souls are consumed".' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'Who discovered the stela known as "La Virgen de Tazumal" in 1892?', opciones: ['Santiago Barberena', 'Stanley Boggs', 'Payson Sheets', 'Jorge Lardé'], correcta: 0, explicacion: 'Historian Santiago Barberena found this stela in 1892 and moved it to the National Museum.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'The San Andrés archaeological site, an ancient Mayan political center, is located in the valley of:', opciones: ['Zapotitán', 'Jiboa', 'Sensunapán', 'Lempa'], correcta: 0, explicacion: 'San Andrés is located in the Zapotitán valley, La Libertad department, and dominated the region during the Late Classic period.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'To which archaeological site was the agricultural village of Joya de Cerén tributary?', opciones: ['San Andrés', 'Tazumal', 'Cihuatán', 'Casa Blanca'], correcta: 0, explicacion: 'Joya de Cerén was a tributary village of the political center of San Andrés, which dominated the Zapotitán valley.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'In which department is the colonial town of Suchitoto located?', opciones: ['Cuscatlán', 'La Paz', 'Chalatenango', 'San Vicente'], correcta: 0, explicacion: 'Suchitoto belongs to the Cuscatlán department.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'Near which lake is Suchitoto located?', opciones: ['Lake Suchitlán', 'Lake Coatepeque', 'Lake Ilopango', 'Alegría Lagoon'], correcta: 0, explicacion: 'Suchitoto is on the shores of the reservoir known as Lake Suchitlán.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'The monolith known as "La Piedra de las Victorias", found at Tazumal, shows a clear influence of the culture:', opciones: ['Olmec', 'Aztec', 'Inca', 'Classic Maya'], correcta: 0, explicacion: 'This monolith with petroglyphs on its four sides features a typically Olmec style.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'What was the purpose of the earthworks that led to the accidental discovery of Joya de Cerén?', opciones: ['Building silos to store grain', 'Building a road', 'Expanding a cemetery', 'Planting coffee'], correcta: 0, explicacion: 'A tractor was leveling land to build grain silos when it revealed the first structures of the site.' },
  { cat: 'sitios', nivel: 'medio', pregunta: 'The Chalchuapa archaeological zone, where Tazumal is located, covers an approximate area of:', opciones: ['10 km²', '1 km²', '50 km²', '100 km²'], correcta: 0, explicacion: 'The Chalchuapa archaeological zone covers approximately 10 km², with several sites besides Tazumal.' },

  // Hard (15)
  { cat: 'sitios', nivel: 'dificil', pregunta: 'On what exact date was Joya de Cerén declared a World Heritage Site?', opciones: ['December 11, 1993', 'May 5, 1993', 'June 19, 1993', 'November 27, 1989'], correcta: 0, explicacion: 'UNESCO declared Joya de Cerén a World Heritage Site on December 11, 1993.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'To which university did archaeologist Payson Sheets belong, who led the first excavations at Joya de Cerén?', opciones: ['University of Colorado Boulder', 'Harvard University', 'Yale University', 'University of Arizona'], correcta: 0, explicacion: 'Payson Sheets was a professor of anthropology at the University of Colorado Boulder, USA.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'Excavations at Joya de Cerén were interrupted by the civil war and resumed in:', opciones: ['1989', '1980', '1996', '1976'], correcta: 0, explicacion: 'Work resumed in 1989 after the interruption due to the armed conflict, and continued until 1996.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'How many structures did Stanley Boggs identify in his formal investigation of the Tazumal site?', opciones: ['13', '6', '20', '8'], correcta: 0, explicacion: 'Boggs identified 13 structures in total, seven of which were later assigned to the "Nuevo Tazumal" area.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'The second pyramid of Tazumal, of Toltec style, had a temple on its summit that collapsed in:', opciones: ['October 2004', 'January 1990', 'March 2010', 'July 1998'], correcta: 0, explicacion: 'The temple that crowned Structure 2, of Toltec style, collapsed in October 2004.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'In what year did Stanley Boggs begin the first of twelve seasons of research at Tazumal?', opciones: ['1942', '1950', '1960', '1935'], correcta: 0, explicacion: 'In 1942, the first of twelve seasons of Boggs\' archaeological research at the site began.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'The Tazumal site museum bears the name of its principal researcher and was founded on April 16,:', opciones: ['1952', '1970', '1940', '1993'], correcta: 0, explicacion: 'The Stanley Boggs Museum, located at Tazumal, was founded on April 16, 1952.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'Approximately from what year BC does the Chalchuapa area show evidence of continuous human occupation?', opciones: ['1200 BC', '500 BC', '300 AD', '2000 BC'], correcta: 0, explicacion: 'Chalchuapa is one of El Salvador\'s oldest and most continuous settlements, with occupation from approximately 1200 BC.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'The Cihuatán archaeological site, in the current San Salvador department, corresponds to the period:', opciones: ['Postclassic', 'Preclassic', 'Early Classic', 'Colonial'], correcta: 0, explicacion: 'Cihuatán is a Postclassic period site linked to the Pipil migration, which was destroyed and burned.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'The village of Joya de Cerén was founded shortly after the eruption of the volcano:', opciones: ['Ilopango', 'Loma Caldera', 'Izalco', 'San Miguel'], correcta: 0, explicacion: 'After the eruption of the Ilopango volcano, the valley was reoccupied and there Joya de Cerén was later founded, which was then buried by Loma Caldera.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'What building material, used in the reconstruction of Tazumal in the 1940s, generated controversy among archaeologists?', opciones: ['Cement', 'Adobe', 'Limestone', 'Lime stucco'], correcta: 0, explicacion: 'The use of modern cement by Stanley Boggs in the reconstruction of the structures was heavily criticized at the time.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'The main structure of Tazumal was built in thirteen distinct stages, between the years:', opciones: ['100 and 800 AD', '1200 and 1500 AD', '400 BC and 100 AD', '900 and 1200 AD'], correcta: 0, explicacion: 'Structure 1 (B1-1) was built in thirteen successive stages between 100 and 800 AD.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'The legislative decree that declared Joya de Cerén a National Monument dates from:', opciones: ['August 31, 1989', 'December 11, 1993', 'January 1, 1980', 'May 5, 1976'], correcta: 0, explicacion: 'Legislative Decree No. 320, of August 31, 1989, declared Joya de Cerén a National Monument.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'To date, Joya de Cerén is:', opciones: ['The only site in El Salvador declared a UNESCO World Heritage Site', 'One of five Salvadoran sites with that distinction', 'The second most visited site in the country', 'Part of a binational complex with Honduras'], correcta: 0, explicacion: 'Joya de Cerén remains, to date, the only Salvadoran site declared a UNESCO World Heritage Site.' },
  { cat: 'sitios', nivel: 'dificil', pregunta: 'The Chalchuapa archaeological area includes, in addition to Tazumal, sites such as El Trapiche and:', opciones: ['Casa Blanca', 'Cihuatán', 'San Andrés', 'Quelepa'], correcta: 0, explicacion: 'Casa Blanca is another of the sites that make up the Chalchuapa archaeological zone, together with El Trapiche.' },

  // 100% GUANACO (15)
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'What element allowed the exceptional preservation of Joya de Cerén\'s structures despite being made of compacted earth?', opciones: ['Burial under layers of volcanic ash at different temperatures', 'Later application of synthetic resins', 'A constant dry microclimate', 'Use of stone instead of adobe'], correcta: 0, explicacion: 'The eruption of Loma Caldera covered the village with several layers of ash at temperatures between 100 and 500°C, sealing and preserving the earthen structures and everyday objects.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'In the main tomb of Structure 1 at Tazumal, offerings were found that included more than:', opciones: ['116 vessels', '20 vessels', '500 vessels', '50 vessels'], correcta: 0, explicacion: 'Tombs with more than 116 vessels, jade jewelry and iron pyrite mirrors were found, among other objects.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'The Tazumal Stela, popularly known as "La Virgen", measures approximately:', opciones: ['2.65 meters in height', '1 meter in height', '5 meters in height', '0.5 meters in height'], correcta: 0, explicacion: 'The stela measures 2.65 meters tall by 1.16 meters wide, depicting a character in rich attire holding a scepter.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'The Piedra de las Victorias, found near Tazumal, has petroglyphs on its four sides and dates approximately to:', opciones: ['700 BC', '1200 AD', '300 AD', '1500 BC'], correcta: 0, explicacion: 'This Olmec-style monolith, with engravings on its four faces, dates approximately to 700 BC.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'Before the founding of Joya de Cerén, much of central and western El Salvador was buried by ash from the Ilopango volcano, an event that occurred around the year:', opciones: ['250 AD', '1000 AD', '600 BC', '1500 AD'], correcta: 0, explicacion: 'The Ilopango eruption, around 250 AD, buried much of the region and interrupted occupation for centuries.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'The "Guazapa" ceramic group, common in funerary contexts at Tazumal and other sites in central El Salvador, is characterized by:', opciones: ['Scraped slip decorations', 'Cobalt blue glaze', 'Gold inlays', 'Polychrome fresco painting'], correcta: 0, explicacion: 'Guazapa ceramics are distinguished by their scraped slip decorations, found at several sites in central El Salvador.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'During the Classic period, both San Andrés and Joya de Cerén received notable cultural influence from:', opciones: ['Copán', 'Teotihuacan', 'Tenochtitlan', 'Machu Picchu'], correcta: 0, explicacion: 'Both sites in the Zapotitán valley show similarities and influence from the Mayan city of Copán, in present-day Honduras.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'The reconstruction of Structures 1 and 2 at Tazumal in the 1940s, carried out by Stanley Boggs, was criticized because:', opciones: ['It used modern cement at a pre-Hispanic site', 'It completely eliminated the original structures', 'It was done without any record', 'It was financed with foreign funds without authorization'], correcta: 0, explicacion: 'The use of cement in the reconstruction was highly criticized, although at the time it was considered necessary to avoid further destruction of the site.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'The Loma Caldera volcano, which buried Joya de Cerén, is located at a distance from the settlement of barely:', opciones: ['Less than 1 kilometer', '20 kilometers', '5 kilometers', '50 kilometers'], correcta: 0, explicacion: 'Loma Caldera is less than 1 km from Joya de Cerén, so the eruption buried the village almost completely.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'The archaeological occupation of Tazumal, considering all its phases, spans approximately from:', opciones: ['1200 BC to 1200 AD', '100 AD to 1500 AD', '500 BC to 500 AD', '800 AD to 1521 AD'], correcta: 0, explicacion: 'Tazumal was occupied discontinuously from approximately 1200 BC until its final abandonment around 1200 AD.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'At Joya de Cerén, a temazcal-type structure was identified, which means:', opciones: ['A ritual steam bath', 'A grain storage room', 'A funerary temple', 'A political leader\'s dwelling'], correcta: 0, explicacion: 'Structure 9 at the site corresponds to a temazcal, a steam bath used for ritual and hygiene purposes.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'The total area of the Joya de Cerén Archaeological Park, between the reserve zone and administrative area, is approximately:', opciones: ['5 hectares', '1 hectare', '20 hectares', '50 hectares'], correcta: 0, explicacion: 'The park covers about 5 hectares distributed between the archaeological reserve and the administrative area.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'The Xocco and Payu ceramic phases, identified at Joya de Cerén, correspond respectively to the periods:', opciones: ['400-600 AD and 600-900 AD', '100-300 AD and 300-500 AD', '900-1100 AD and 1100-1300 AD', '1200-1000 BC and 1000-800 BC'], correcta: 0, explicacion: 'The material culture of the site corresponds to the Xocco phase (400-600 AD) and the Payu phase (600-900 AD).' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'At the Tazumal site museum, among other pieces, a Mesoamerican ritual object known as a:', opciones: ['Chac Mool', 'Jaguar throne', 'Jade solar disk', 'Obsidian mask'], correcta: 0, explicacion: 'A Chac Mool was found in the area known as Laguna Seca de Chalchuapa and is part of the site\'s featured pieces.' },
  { cat: 'sitios', nivel: 'guanaco', pregunta: 'Joya de Cerén reopened to the public after an extensive renovation sponsored by France and El Salvador in:', opciones: ['December 2021', 'January 2015', 'July 2018', 'March 2023'], correcta: 0, explicacion: 'After a year of conservation work sponsored by the French and Salvadoran governments, the site reopened in December 2021.' },

  // ======== LEGENDS ========
  // Easy (15)
  { cat: 'leyendas', nivel: 'facil', pregunta: 'Who is the mother of El Cipitío, according to Salvadoran legend?', opciones: ['La Siguanaba', 'La Llorona', 'La Carreta Bruja', 'La Chancha'], correcta: 0, explicacion: 'El Cipitío is, according to tradition, the son of La Siguanaba.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'At what age was El Cipitío condemned to remain forever?', opciones: ['10 years', '5 years', '15 years', '7 years'], correcta: 0, explicacion: 'El Cipitío was condemned to remain eternally as a 10-year-old child.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'According to legend, how does La Siguanaba initially appear to men?', opciones: ['As a beautiful woman', 'As an old man', 'As an animal', 'As a faceless shadow'], correcta: 0, explicacion: 'La Siguanaba appears from afar as a beautiful woman, but upon closer approach reveals a horrible face.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'In what colors does El Cadejo traditionally appear?', opciones: ['White and black', 'Red and blue', 'Gold and silver', 'Green and brown'], correcta: 0, explicacion: 'El Cadejo has two versions: a white one, protective, and a black one, evil.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'What is the name of the ghostly cart that announces bad luck or death in Salvadoran tradition?', opciones: ['La Carreta Bruja (or Chillona)', 'El Carro de Fuego', 'La Diligencia Negra', 'El Tren Fantasma'], correcta: 0, explicacion: 'La Carreta Bruja, also called Carreta Chillona, travels the roads at night as an omen of misfortune.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'What does El Cipitío like to do, according to popular tradition?', opciones: ['Roll around in ashes', 'Swim in the sea', 'Hunt animals', 'Play the marimba'], correcta: 0, explicacion: 'El Cipitío loves to roll and eat ashes, leaving small footprints near ovens.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'The footsteps of El Cadejo sound similar to the steps of:', opciones: ['A goat', 'A horse', 'A large dog', 'A cat'], correcta: 0, explicacion: 'His steps resemble the sound of goat hooves.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'What part of El Cipitío\'s body appears "backwards" in the legend?', opciones: ['His feet', 'His hands', 'His head', 'His ears'], correcta: 0, explicacion: 'His feet are turned backwards, confusing anyone trying to follow his tracks.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'In what part of San Salvador is El Padre sin Cabeza said to appear?', opciones: ['Near El Rosario Church', 'In Cuscatlán Park', 'In the Zócalo', 'In the Central Market'], correcta: 0, explicacion: 'According to legend, El Padre sin Cabeza comes out through the doors of El Rosario Church on Fridays at midnight.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'Which figure of Salvadoran mythology appears mainly to unfaithful men or night owls near rivers?', opciones: ['La Siguanaba', 'El Cipitío', 'El Cadejo blanco', 'El Justo Juez'], correcta: 0, explicacion: 'La Siguanaba seeks to deceive and frighten womanizing or unfaithful men who walk alone at night.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'What characteristic headpiece does El Cipitío wear, according to popular descriptions?', opciones: ['A large pointed hat', 'A flower crown', 'A warrior helmet', 'A turban'], correcta: 0, explicacion: 'El Cipitío is usually described with a large pointed palm hat.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'What is the name of the night spirit that, according to tradition, punishes those who break the rules of the night?', opciones: ['El Justo Juez de la Noche', 'El Cipitío', 'La Carreta Bruja', 'El Cadejo negro'], correcta: 0, explicacion: 'El Justo Juez de la Noche is a character who, according to legend, punishes faults committed during the night.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'Which Pipil indigenous belief holds that certain people can transform into protective animals?', opciones: ['Nahualism', 'Curanderismo', 'Aztec totemism', 'Mayan shamanism'], correcta: 0, explicacion: 'Nahualism was a widespread belief among the Pipil peoples.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'What magical flower, according to legend, can only be seen and picked by mute people?', opciones: ['La Flor de Amate', 'La Flor de Izote', 'La Rosa de Cuscatlán', 'La Flor de Loto'], correcta: 0, explicacion: 'La Flor de Amate is a legendary flower associated with good luck, visible only to mute people.' },
  { cat: 'leyendas', nivel: 'facil', pregunta: 'Which of these characters does NOT belong to Salvadoran legends?', opciones: ['El Minotauro', 'La Siguanaba', 'El Cipitío', 'El Cadejo'], correcta: 0, explicacion: 'El Minotauro belongs to Greek mythology; the other three are classic characters of Salvadoran folklore.' },

  // Medium (15)
  { cat: 'leyendas', nivel: 'medio', pregunta: 'Before being cursed, what was the name of the woman who would become La Siguanaba?', opciones: ['Sihuehuet', 'Zipitía', 'Xochitl', 'Ixchel'], correcta: 0, explicacion: '"Sihuehuet" means "beautiful woman" in Náhuat, before receiving the curse that transformed her into La Siguanaba.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'What does the name "Siguanaba" mean according to tradition?', opciones: ['Horrible woman', 'Wise woman', 'Mother of the night', 'Spirit of the water'], correcta: 0, explicacion: 'After the curse, her new name came to mean "horrible woman".' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'What does the word "Cipit" mean in the Náhuat language?', opciones: ['Child', 'Fire', 'Moon', 'Serpent'], correcta: 0, explicacion: '"Cipit" simply means "child" in Náhuat, the origin of El Cipitío\'s name.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'According to the popular rule about El Cadejo, if you hear his steps very close, it actually means:', opciones: ['He is far away', 'He is about to attack', 'He is behind you', 'He has left'], correcta: 0, explicacion: 'Legend says that if you hear him close, he is far; and if you hear him far, he is very near.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'What color of Cadejo is considered a protector of good-hearted night walkers?', opciones: ['White', 'Black', 'Gray', 'Red'], correcta: 0, explicacion: 'The White Cadejo is considered a protective being and guide for those who walk at night with good intentions.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'In the popular story of La Carreta Bruja, what nickname did the man who refused to bless his cart have?', opciones: ['Pedro el Malo', 'Juan sin Miedo', 'El Diablo Cojuelo', 'Concho el Bribón'], correcta: 0, explicacion: 'In one of the best-known versions, the punished man was nicknamed "Pedro el Malo".' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'The scene of La Carreta Bruja\'s curse occurs, according to a popular version, during the celebration of which patron saint?', opciones: ['San Isidro Labrador', 'San Miguel Arcángel', 'San Salvador del Mundo', 'Santa Ana'], correcta: 0, explicacion: 'The legend places the episode at the feast of San Isidro Labrador, when carters brought their carts to be blessed.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'According to legend, on which day of the week does El Padre sin Cabeza appear near El Rosario Church?', opciones: ['Fridays', 'Mondays', 'Sundays', 'Tuesdays'], correcta: 0, explicacion: 'He is said to appear every Friday at midnight.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'In the belief of nahualism, who invoked the protective animal spirit of a newborn?', opciones: ['A witch doctor or shaman', 'The town Catholic priest', 'The child himself as he grew', 'The regional military chief'], correcta: 0, explicacion: 'A shaman invoked, at the child\'s birth, an animal spirit that became his protective nahual.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'In which region of El Salvador is the legend of El Cipitío traditionally located, although it can be transported anywhere?', opciones: ['San Vicente', 'Morazán', 'La Unión', 'Chalatenango'], correcta: 0, explicacion: 'Tradition places El Cipitío mainly in the San Vicente department.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'Which version explains the origin of El Padre sin Cabeza linking it to a social conflict?', opciones: ['He was beheaded for participating in a peasant revolt', 'He died fighting pirates', 'He was executed for heresy in the colony', 'He died in a duel for love'], correcta: 0, explicacion: 'One version tells that the priest was beheaded for taking part in a peasant uprising.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'What physical characteristic, besides his backward feet, is usually highlighted in descriptions of El Cipitío?', opciones: ['His enormous belly', 'His bat wings', 'His scaly skin', 'His horns'], correcta: 0, explicacion: 'He is described as having a large belly, a result of his taste for eating ashes.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'According to some versions, El Cipitío also frequents sugarcane mills because he is attracted to:', opciones: ['Honey and dulce de atado', 'The smoke from the ovens', 'The sound of bells', 'The workers\' tools'], correcta: 0, explicacion: 'He is attracted to the honey and dulce de atado produced in the mills.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'What is one of the reasons why, according to legend, La Carreta Bruja visits certain towns?', opciones: ['Because there is no love or harmony in them', 'Because they are the richest in the country', 'Because they have abandoned churches', 'Because they are near the sea'], correcta: 0, explicacion: 'It is said that the cart roams towns where there is a lack of love and harmony among its inhabitants.' },
  { cat: 'leyendas', nivel: 'medio', pregunta: 'What type of spirit is, in general, a "nahual" within Pipil tradition?', opciones: ['A protective animal spirit assigned at birth', 'A vengeful ghost', 'A minor rain god', 'An enchanted object'], correcta: 0, explicacion: 'The nahual is a protective animal spirit that, according to belief, is assigned to a person from birth.' },

  // Hard (15)
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'In one version, who is described as the "God of gods" who casts the curse upon El Cipitío\'s mother?', opciones: ['Teotl', 'Tlaloc', 'Itzamná', 'Quetzalcoatl'], correcta: 0, explicacion: 'In this version, Teotl, the "god of gods", condemns the mother and her son after the illicit romance.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'According to a detailed version of the legend, El Cipitío\'s mother had an illicit romance with:', opciones: ['A morning star', 'A foreign warrior', 'A Mayan priest', 'A forest spirit'], correcta: 0, explicacion: 'In this variant, Sihuehuet had a romance with a morning star, which originated the curse.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'With which hill is the home of La Siguanaba and her son El Cipitío traditionally associated?', opciones: ['Cerro Sihuatepeque', 'Izalco Volcano', 'Cerro de Guazapa', 'Chaparrastique Volcano'], correcta: 0, explicacion: 'Cerro Sihuatepeque, meaning "hill of the woman", is associated with the region of origin of these characters.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'According to certain versions, what did a girl have to do to get El Cipitío to stop bothering her?', opciones: ['Neglect her hygiene for several days', 'Offer him white flowers', 'Recite a special prayer', 'Give him dulce de atado'], correcta: 0, explicacion: 'It is said that El Cipitío dislikes poor hygiene habits, so young women used this to scare him away.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'What distinctive sound warns of the proximity of La Carreta Bruja, according to tradition?', opciones: ['A squeak of wooden wheels', 'A rooster crow', 'The tolling of bells', 'The howling of dogs'], correcta: 0, explicacion: 'The terrible squeak of its wooden wheels announces the arrival of La Carreta Bruja.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'Folklorists usually classify Salvadoran legends into several categories; which of the following is one of them?', opciones: ['Etiological legends', 'Cosmic legends', 'War legends', 'Maritime legends'], correcta: 0, explicacion: 'Among the categories used are etiological (origin of places), indigenous, extraordinary beings, ghosts, animals and enchanted places.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'What other legendary animal-like beings are mentioned alongside El Cadejo in Salvadoran tradition?', opciones: ['El Mico Brujo and La Chancha', 'The Griffin and the Sphinx', 'The Unicorn and the Dragon', 'The Basilisk and the Hydra'], correcta: 0, explicacion: 'El Mico Brujo and La Chancha are other animal-like characters present in Salvadoran folklore.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'In some interpretations, the name "Cipit" has been linked to a Mesoamerican deity called:', opciones: ['Xipe Tótec', 'Huitzilopochtli', 'Quetzalcoatl', 'Itzamná'], correcta: 0, explicacion: 'Some versions relate the name of El Cipitío to the Mesoamerican deity Xipe Tótec.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'According to legend, which two versions explain why El Padre sin Cabeza lost his head?', opciones: ['He died in mortal sin without confessing, or was beheaded for joining a peasant revolt', 'He was beheaded by lightning and a gypsy curse', 'He died in naval battle and in a fire', 'He was executed by the King of Spain and for witchcraft'], correcta: 0, explicacion: 'There are two main versions of his origin: one religious (sin without confession) and one social (participation in a revolt).' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'What do the two Cadejos (white and black) together represent in the popular imagination?', opciones: ['The struggle between good and evil', 'Day and night', 'Wealth and poverty', 'Country and city'], correcta: 0, explicacion: 'Both cadejos symbolize the eternal struggle between the forces of good and evil.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'According to legend, after leaving El Rosario Church, in which direction does El Padre sin Cabeza walk?', opciones: ['North', 'South', 'East', 'West'], correcta: 0, explicacion: 'According to the stories, he walks north along Sixth Avenue after leaving the church.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'In popular tradition, what function did the nahual assigned to a newborn serve?', opciones: ['Serve as a lifelong protective animal spirit', 'Determine his future trade', 'Heal the family\'s illnesses', 'Protect the village\'s harvest'], correcta: 0, explicacion: 'The nahual accompanied and protected the person throughout their life, according to this Pipil belief.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'What element makes the legend of El Cipitío have a strong symbolic component about colonial/indigenous morality?', opciones: ['It represents punishment for illicit love or romance', 'It represents the struggle for independence', 'It represents the conflict between indigenous peoples', 'It represents the arrival of the Spanish'], correcta: 0, explicacion: 'The curse of La Siguanaba and her son symbolizes social punishment for romance considered illicit.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'In one version of the origin of La Siguanaba, her true name "Sihuehuet" is related to what meaning?', opciones: ['Beautiful woman', 'Mother of the moon', 'Guardian of the river', 'Daughter of the sun'], correcta: 0, explicacion: '"Sihuehuet" translates as "beautiful woman" before the curse fell upon her.' },
  { cat: 'leyendas', nivel: 'dificil', pregunta: 'What does El Cipitío mainly eat, besides ashes, according to certain versions of the legend?', opciones: ['Plantains and dulce de atado', 'Raw meat', 'Insects', 'Only river water'], correcta: 0, explicacion: 'According to some versions, his favorite food is plantains and dulce de atado, in addition to ashes.' },

  // 100% GUANACO (15)
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'From an anthropological perspective, the duality of the White and Black Cadejo is often interpreted as:', opciones: ['A representation of the moral conflict between good and evil in the colonial mestizo imagination', 'A direct vestige of Greek mythology brought by the conquerors', 'An exclusive allegory about the tropical climate', 'A modern political critique without colonial roots'], correcta: 0, explicacion: 'Folklorists interpret this duality as a symbolic expression of the conflict between good and evil, characteristic of colonial cultural syncretism.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'The legend of La Siguanaba combines elements of a pre-Hispanic deity with a moralizing discourse that mainly punishes:', opciones: ['Infidelity and abandonment of maternal responsibilities', 'The theft of communal lands', 'Indigenous armed resistance', 'Illegal indigo trade'], correcta: 0, explicacion: 'The narrative punishes both male infidelity and the abandonment of family responsibilities by the mother.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'The acoustic phenomenon described in the legend of El Cadejo, where the closeness of the sound indicates the opposite of the real distance, functions narratively as:', opciones: ['A tension device that increases the night listener\'s uncertainty', 'A real scientific explanation of echo in mountainous areas', 'A reference to pre-Hispanic musical instruments', 'An astronomical fact about lunar phases'], correcta: 0, explicacion: 'This sound paradox functions as a narrative device that increases the suspense and uncertainty of the story.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'The folkloric classification of "etiological legends" in El Salvador specifically refers to stories that explain:', opciones: ['The origin of places, hills, volcanoes or towns', 'The origin of the entire universe', 'The origin of Salvadoran surnames', 'The origin of indigenous languages'], correcta: 0, explicacion: 'Etiological legends tell how certain places, hills, volcanoes or towns were formed.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'In the narrative of La Carreta Bruja, "Pedro el Malo"\'s refusal to bless his cart during the patron saint festival symbolizes:', opciones: ['Rejection of religious authority and the rupture of community order', 'A critique of the colonial tax system', 'An act of political rebellion against the Spanish crown', 'A protest over land ownership'], correcta: 0, explicacion: 'The gesture of rejecting the blessing symbolically represents the rupture with the religious and community order of the town.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'El Cipitío, with backward feet that confuse those who try to follow him, narratively fulfills the function of:', opciones: ['A mischievous and elusive spirit, linked to disorder and mischief', 'A strict guardian of public morality', 'A messenger of the gods of the underworld', 'An exclusively agricultural symbol'], correcta: 0, explicacion: 'His backward feet reinforce his nature as a mischievous and elusive spirit.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'Comparing the different versions of El Cipitío\'s origin, folklorists point out that these variations are mainly due to:', opciones: ['Oral transmission and regional diversity of the story', 'The existence of a unique and official text', 'Erroneous translations of colonial chronicles', 'Censorship by the Catholic Church'], correcta: 0, explicacion: 'Being an oral tradition, each region and narrator contributes their own variants to the story.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'In the tradition of Pipil nahualism, the animal assigned as a protective nahual was determined, according to belief, by:', opciones: ['The invocation of a shaman at the moment of birth', 'An annual community lottery', 'The free choice of the child upon reaching adulthood', 'The position of the stars in the parents\' marriage'], correcta: 0, explicacion: 'A shaman invoked the protective animal spirit at the moment of the child\'s birth.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'The figure of El Justo Juez de la Noche, within the classification of "extraordinary beings" in Salvadoran folklore, is distinguished by:', opciones: ['Punishing those who break social or ritual norms during the night', 'Protecting exclusively corn crops', 'Guiding lost travelers to their homes', 'Representing 20th-century agrarian justice'], correcta: 0, explicacion: 'This character is distinguished by punishing those who transgress the nocturnal norms of the community.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'The motif of "the beautiful woman from afar, hideous up close" in La Siguanaba is repeated in other Mesoamerican mythologies as a symbolic warning about:', opciones: ['Deceptive appearances and punishment for male infidelity', 'The danger of swollen rivers during rainy seasons', 'The prohibition of bathing at night for hygienic reasons', 'The mandatory respect for the elderly in the village'], correcta: 0, explicacion: 'This motif functions as a moral warning about deceptive appearances and punishment for infidelity.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'The legends of "extraordinary beings" like La Siguanaba and El Cipitío differ from Salvadoran "indigenous legends" mainly because the latter:', opciones: ['Incorporate events or characters from before the Spanish conquest more directly', 'Occur exclusively in the colonial period', 'Lack any supernatural component', 'Were created after independence'], correcta: 0, explicacion: 'Indigenous legends usually directly narrate events or characters from the period before the Spanish conquest.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'In some variants, El Padre sin Cabeza follows a specific route through the historic center of San Salvador; this type of concrete geographic detail in an urban legend serves the function of:', opciones: ['Anchoring the story in a recognizable space that reinforces its local credibility', 'Serving as an official tourist map of the city', 'Replacing verified historical records', 'Announcing an official religious pilgrimage route'], correcta: 0, explicacion: 'Concrete geographic details anchor the legend to a real space, reinforcing its credibility among listeners.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'The recurrent use of rivers and ravines as settings for La Siguanaba and El Cipitío responds, according to folklorists, to the fact that these places:', opciones: ['Were points of nocturnal social encounter and therefore conducive to moral warnings', 'Were considered forbidden territories by colonial law', 'Only existed in the eastern part of the country', 'Were exclusively associated with Mayan agricultural rituals'], correcta: 0, explicacion: 'Rivers were common places for nighttime encounters (washing clothes, bathing), making them suitable settings for these moral warnings.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'The "Flor de Amate", visible only to mute people according to legend, exemplifies a common narrative device in Central American folklore known as:', opciones: ['The magical object conditioned, accessible only under a special characteristic', 'The hereditary curse transmitted by blood', 'The explicit pact with supernatural beings', 'The permanent physical transformation of the protagonist'], correcta: 0, explicacion: 'This narrative device conditions access to a magical object on a particular characteristic of the character.' },
  { cat: 'leyendas', nivel: 'guanaco', pregunta: 'The survival of legends like El Cipitío in modern cultural products, such as educational children\'s series, illustrates a process known as:', opciones: ['The resignification and adaptation of traditional folklore to new media', 'The total disappearance of the original oral story', 'The state prohibition of oral tradition', 'The complete replacement by foreign mythology'], correcta: 0, explicacion: 'The adaptation of these legends to modern media, such as educational television, shows how folklore is resignified without losing its essence.' }
];

/* ══════════════════════════════════════════════════════════
   SELECCIÓN DE PREGUNTAS SEGÚN IDIOMA
   ══════════════════════════════════════════════════════════ */
function getPreguntasSegunIdioma() {
  if (typeof window.SRi18n === 'undefined') return PREGUNTAS_ES;
  const lang = window.SRi18n.getLang();
  return lang === 'en' ? PREGUNTAS_EN : PREGUNTAS_ES;
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

levelCards.forEach(card => {
  card.addEventListener('click', () => {
    levelCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    nivelSeleccionado = card.dataset.level;
    pulso(card);
    verificarListo();
  });
});

catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    categoriaSeleccionada = btn.dataset.cat;
    pulso(btn);
    verificarListo();
  });
});

amountBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    amountBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    cantidadSeleccionada = btn.dataset.amount;
    pulso(btn);
    verificarListo();
  });
});

function verificarListo() {
  if (nivelSeleccionado && categoriaSeleccionada && cantidadSeleccionada) {
    startBtn.classList.add('visible');
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

  abrirModalQuiz();
  results.classList.remove('show');
  mostrarPregunta();
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
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
    );
    gsap.set(optionsDiv.children, { opacity: 0, y: 14 });
    gsap.to(optionsDiv.children, {
      opacity: 1, y: 0, duration: 0.4, stagger: 0.07, delay: 0.12, ease: 'power2.out'
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

  if (typeof gsap !== 'undefined' && respuestaCorrecta) {
    gsap.fromTo(btn, { scale: 1 }, {
      scale: 1.04, duration: 0.3, ease: 'back.out(2)',
      onComplete: () => gsap.set(btn, { clearProps: 'transform' })
    });
  }

  if (respuestaCorrecta) {
    btn.classList.add('correct');
    puntaje += nivelPuntos();
    feedback.className = 'quiz-feedback show correct-fb';
    const points = nivelPuntos();
    feedback.innerHTML = `
      <strong>${t('quiz.correctPoints', { points: points })}</strong>
      <p>${q.explicacion}</p>
    `;
  } else {
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
      ['#resultsRank', '#resultsTitle', '#resultsScore', '.quiz-results__pct-bar', '#resultsMessage', '.quiz-results__actions'],
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
   CONFETI (sin cambios)
   ══════════════════════════════════════════════════════════ */
function lanzarConfeti() {
  if (typeof gsap === 'undefined') return;
  const colores = ['#be8e56', '#d4af37', '#e5eaff', '#10b981', '#ffffff'];
  const contenedor = document.createElement('div');
  contenedor.className = 'confetti-container';
  document.body.appendChild(contenedor);

  const totalPiezas = 46;
  for (let i = 0; i < totalPiezas; i++) {
    const pieza = document.createElement('div');
    pieza.className = 'confetti-piece';
    pieza.style.background = colores[Math.floor(Math.random() * colores.length)];
    pieza.style.left = `${Math.random() * 100}vw`;
    const tam = 6 + Math.random() * 6;
    pieza.style.width = `${tam}px`;
    pieza.style.height = `${tam * 0.4}px`;
    contenedor.appendChild(pieza);

    gsap.set(pieza, { y: -20, opacity: 1, rotation: Math.random() * 360 });
    gsap.to(pieza, {
      y: '100vh',
      x: (Math.random() - 0.5) * 220,
      rotation: `+=${360 + Math.random() * 360}`,
      opacity: 0,
      duration: 2 + Math.random() * 1.5,
      delay: Math.random() * 0.35,
      ease: 'power1.in',
      onComplete: () => pieza.remove()
    });
  }
  setTimeout(() => contenedor.remove(), 4200);
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