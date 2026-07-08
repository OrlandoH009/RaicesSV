/* ============================================================
   RAÍCES SV — quiz-mejorado.js (v2.0)
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
];

/* ══════════════════════════════════════════════════════════
   SISTEMA DE GUARDADO Y LEADERBOARD
   ══════════════════════════════════════════════════════════ */

const STORAGE_KEY = 'raices-quiz-scores';
const MAX_SCORES = 50;

function guardarPuntaje(nivel, categoria, puntaje, maximo) {
  const ahora = new Date().toISOString();
  const score = { nivel, categoria, puntaje, maximo, fecha: ahora };
  
  let scores = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  scores.push(score);
  
  // Mantener solo últimos 50
  if (scores.length > MAX_SCORES) {
    scores = scores.slice(-MAX_SCORES);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

function obtenerLeaderboard(nivel) {
  const scores = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  return scores
    .filter(s => s.nivel === nivel)
    .sort((a, b) => (b.puntaje / b.maximo) - (a.puntaje / a.maximo))
    .slice(0, 10);
}

/* ══════════════════════════════════════════════════════════
   VARIABLES Y DOM
   ══════════════════════════════════════════════════════════ */

let nivelSeleccionado = null;
let categoriaSeleccionada = null;
let preguntasActivas = [];
let indice = 0;
let puntaje = 0;
let respondida = false;

const quizSetup    = document.getElementById('quizSetup');
const quizZone     = document.getElementById('quizZone');
const levelCards   = document.querySelectorAll('.level-card');
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

/* ══════════════════════════════════════════════════════════
   EVENT LISTENERS Y LÓGICA
   ══════════════════════════════════════════════════════════ */

levelCards.forEach(card => {
  card.addEventListener('click', () => {
    levelCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    nivelSeleccionado = card.dataset.level;
    verificarListo();
  });
});

catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    categoriaSeleccionada = btn.dataset.cat;
    verificarListo();
  });
});

function verificarListo() {
  if (nivelSeleccionado && categoriaSeleccionada) {
    startBtn.classList.add('visible');
  }
}

startBtn.addEventListener('click', () => {
  let pool = PREGUNTAS.filter(p => p.nivel === nivelSeleccionado);
  if (categoriaSeleccionada !== 'todas') {
    pool = pool.filter(p => p.cat === categoriaSeleccionada);
  }

  if (pool.length === 0) {
    alert('No hay preguntas disponibles para esa combinación.');
    return;
  }

  pool = pool.sort(() => Math.random() - 0.5).slice(0, Math.min(28, pool.length));
  preguntasActivas = pool;
  indice = 0;
  puntaje = 0;

  quizSetup.style.display = 'none';
  quizZone.classList.add('active');
  results.classList.remove('show');

  const NIVEL_LABELS = { facil: 'Fácil', medio: 'Medio', dificil: 'Difícil', guanaco: '100% Guanaco' };
  levelBadge.textContent = NIVEL_LABELS[nivelSeleccionado];
  levelBadge.className = `quiz-level-badge ${nivelSeleccionado}`;

  // ANIMACIÓN GSAP
  if (typeof gsap !== 'undefined') {
    gsap.fromTo('.quiz-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' });
  }

  mostrarPregunta();
});

function mostrarPregunta() {
  respondida = false;
  feedback.classList.remove('show', 'correct-fb', 'wrong-fb');
  nextBtn.classList.remove('show');

  const total = preguntasActivas.length;
  const q = preguntasActivas[indice];

  progFill.style.width = `${(indice / total) * 100}%`;
  qCounter.textContent = `Pregunta ${indice + 1} de ${total}`;
  scoreLive.textContent = `Puntos: ${puntaje}`;

  const CAT_LABELS = {
    historia: 'Historia', gastronomia: 'Gastronomía',
    sitios: 'Sitios Culturales', leyendas: 'Leyendas', eventos: 'Eventos'
  };
  qCategory.textContent = CAT_LABELS[q.cat] || q.cat;
  qText.textContent = q.pregunta;

  optionsDiv.innerHTML = '';
  const indices = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  const correctaMezclada = indices.indexOf(q.correcta);

  // ANIMACIÓN GSAP para opciones
  if (typeof gsap !== 'undefined') {
    gsap.set('.quiz-option', { opacity: 0, x: -20 });
  }

  indices.forEach((origIdx, newIdx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = q.opciones[origIdx];
    btn.addEventListener('click', () => seleccionar(btn, newIdx, correctaMezclada, q));
    optionsDiv.appendChild(btn);

    // Animar entrada
    if (typeof gsap !== 'undefined') {
      gsap.to(btn, { opacity: 1, x: 0, duration: 0.4, delay: newIdx * 0.05, ease: 'power2.out' });
    }
  });
}

function seleccionar(btn, newIdx, correctaMezclada, q) {
  if (respondida) return;
  respondida = true;

  const opts = optionsDiv.querySelectorAll('.quiz-option');
  opts.forEach(o => o.disabled = true);

  const esCorrecta = newIdx === correctaMezclada;

  // ANIMACIÓN GSAP para respuesta
  if (typeof gsap !== 'undefined') {
    if (esCorrecta) {
      gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'back.out' });
    } else {
      gsap.to(btn, { x: -10, duration: 0.1, yoyo: true, repeat: 3 });
    }
  }

  if (esCorrecta) {
    btn.classList.add('correct');
    puntaje += nivelPuntos();
    feedback.className = 'quiz-feedback show correct-fb';
    feedback.innerHTML = `<strong>✓ Correcto — +${nivelPuntos()} puntos</strong><p>${q.explicacion}</p>`;
  } else {
    btn.classList.add('wrong');
    opts[correctaMezclada].classList.add('correct');
    feedback.className = 'quiz-feedback show wrong-fb';
    feedback.innerHTML = `<strong>✗ Incorrecto</strong><p>${q.explicacion}</p>`;
  }

  scoreLive.textContent = `Puntos: ${puntaje}`;
  nextBtn.classList.add('show');
  nextBtn.textContent = indice + 1 < preguntasActivas.length ? 'Siguiente pregunta' : 'Ver resultados';
}

function nivelPuntos() {
  return { facil: 5, medio: 10, dificil: 15, guanaco: 20 }[nivelSeleccionado] || 10;
}

nextBtn.addEventListener('click', () => {
  indice++;
  indice < preguntasActivas.length ? mostrarPregunta() : mostrarResultados();
});

function mostrarResultados() {
  progFill.style.width = '100%';
  document.getElementById('quizCard').style.display = 'none';
  optionsDiv.style.display = 'none';
  feedback.style.display = 'none';
  nextBtn.style.display = 'none';

  const total = preguntasActivas.length;
  const maximo = total * nivelPuntos();
  const porcentaje = Math.round((puntaje / maximo) * 100);

  // Guardar puntaje
  guardarPuntaje(nivelSeleccionado, categoriaSeleccionada, puntaje, maximo);

  const MENSAJES = [
    { min: 100, titulo: '🎯 Perfecto', msg: 'Dominio absoluto de las Raíces SV. Eres un referente de la cultura salvadoreña.' },
    { min: 80, titulo: '⭐ Excelente', msg: 'Conoces muy bien la cultura de El Salvador. Estás al nivel de un guanaco de corazón.' },
    { min: 60, titulo: '👍 Buen trabajo', msg: 'Buen conocimiento de las Raíces SV. Repasa para mejorar tu desempeño.' },
    { min: 40, titulo: '📚 Sigue aprendiendo', msg: 'Hay mucho por descubrir. Explora las secciones informativas y reinten.' },
    { min: 0, titulo: '🌱 Comenzando', msg: 'El Salvador tiene una cultura riquísima. Explora y vuelve a intentarlo.' }
  ];

  const { titulo, msg } = MENSAJES.find(m => porcentaje >= m.min);

  document.getElementById('resultsRank').textContent = `Nivel — ${levelBadge.textContent}`;
  document.getElementById('resultsTitle').textContent = titulo;
  document.getElementById('resultsScore').textContent = `${puntaje} / ${maximo} pts`;
  document.getElementById('resultsMessage').textContent = msg;

  const pctFill = document.getElementById('resultsPctFill');
  results.classList.add('show');
  
  // ANIMACIÓN GSAP para barra de porcentaje
  if (typeof gsap !== 'undefined') {
    gsap.fromTo(pctFill, { width: '0%' }, { width: porcentaje + '%', duration: 1.5, ease: 'power2.out' });
    gsap.fromTo(results, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out' });
  }
}

retryBtn.addEventListener('click', () => {
  document.getElementById('quizCard').style.display = '';
  optionsDiv.style.display = '';
  feedback.style.display = '';
  nextBtn.style.display = '';
  results.classList.remove('show');

  quizSetup.style.display = '';
  quizZone.classList.remove('active');

  levelCards.forEach(c => c.classList.remove('selected'));
  catBtns.forEach(b => b.classList.remove('selected'));
  startBtn.classList.remove('visible');
  nivelSeleccionado = null;
  categoriaSeleccionada = null;
});