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
const quizWelcome  = document.getElementById('quizWelcome');
const startQuizBtn = document.getElementById('startQuizBtn');
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
const quizCardEl   = document.getElementById('quizCard');
const quizBackdrop = document.getElementById('quizBackdrop');
const closeQuizBtn = document.getElementById('closeQuizBtn');
const quizConfirmOverlay = document.getElementById('quizConfirmOverlay');
const confirmExitBtn = document.getElementById('confirmExitBtn');
const cancelExitBtn  = document.getElementById('cancelExitBtn');

/* ══════════════════════════════════════════════════════════
   MODAL DEL QUIZ: abrir, cerrar y confirmar salida
   ══════════════════════════════════════════════════════════ */

function abrirModalQuiz() {
  quizBackdrop.classList.add('show');
  quizZone.classList.add('active');
  document.body.classList.add('quiz-modal-open');
}

function cerrarModalQuiz() {
  const limpiar = () => {
    quizZone.classList.remove('active');
    quizBackdrop.classList.remove('show');
    document.body.classList.remove('quiz-modal-open');

    // Restaurar visibilidad de elementos por si veníamos de la pantalla de resultados
    document.getElementById('quizCard').style.display = '';
    optionsDiv.style.display = '';
    feedback.style.display = '';
    nextBtn.style.display = '';
    results.classList.remove('show');

    quizSetup.style.display = 'block';
  };

  if (typeof gsap !== 'undefined') {
    gsap.to(quizZone, { opacity: 0, scale: 0.95, duration: 0.25, ease: 'power1.in' });
    gsap.to(quizBackdrop, { opacity: 0, duration: 0.25, onComplete: () => {
      gsap.set(quizZone, { clearProps: 'opacity,scale' });
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

// Tecla Escape también pide confirmación para salir
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && quizZone.classList.contains('active')) {
    quizConfirmOverlay.classList.add('show');
  }
});

/* ══════════════════════════════════════════════════════════
   EVENT LISTENERS Y LÓGICA
   ══════════════════════════════════════════════════════════ */

// Mostrar pantalla de setup al hacer click en botón de bienvenida
if (startQuizBtn) {
  startQuizBtn.addEventListener('click', () => {
    if (typeof gsap !== 'undefined') {
      gsap.to(quizWelcome, {
        opacity: 0, y: -20, scale: 0.97, duration: 0.4, ease: 'power2.in',
        onComplete: () => {
          quizWelcome.style.display = 'none';
          quizSetup.style.display = 'block';
          gsap.fromTo(quizSetup,
            { opacity: 0, y: 25 },
            { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }
          );
        }
      });
    } else {
      quizWelcome.style.display = 'none';
      quizSetup.style.display = 'block';
    }
  });
}
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

  const NIVEL_LABELS = { facil: 'Fácil', medio: 'Medio', dificil: 'Difícil', guanaco: '100% Guanaco' };
  levelBadge.textContent = NIVEL_LABELS[nivelSeleccionado];
  levelBadge.className = `quiz-level-badge ${nivelSeleccionado}`;

  const activar = () => {
    quizSetup.style.display = 'none';
    abrirModalQuiz();
    results.classList.remove('show');
    mostrarPregunta();
  };

  if (typeof gsap !== 'undefined') {
    gsap.to(quizSetup, {
      opacity: 0, y: -15, duration: 0.35, ease: 'power2.in',
      onComplete: activar
    });
  } else {
    activar();
  }
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
    sitios: 'Sitios Culturales', leyendas: 'Leyendas'
  };
  qCategory.textContent = CAT_LABELS[q.cat] || q.cat;
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

  // ANIMACIÓN GSAP: entrada de la tarjeta y de las opciones en cascada
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

function seleccionar(btn, newIdx, correctaMezclada, q) {
  if (respondida) return;
  respondida = true;

  const opts = optionsDiv.querySelectorAll('.quiz-option');
  opts.forEach(o => o.disabled = true);

  const esCorrecta = newIdx === correctaMezclada;

  // ANIMACIÓN GSAP para el acierto (el error ya se anima por CSS con .wrong)
  if (typeof gsap !== 'undefined' && esCorrecta) {
    gsap.fromTo(btn, { scale: 1 }, {
      scale: 1.04, duration: 0.3, ease: 'back.out(2)',
      onComplete: () => gsap.set(btn, { clearProps: 'transform' })
    });
  }

  if (esCorrecta) {
    btn.classList.add('correct');
    puntaje += nivelPuntos();
    feedback.className = 'quiz-feedback show correct-fb';
    feedback.innerHTML = `<strong>Correcto — +${nivelPuntos()} puntos</strong><p>${q.explicacion}</p>`;
  } else {
    btn.classList.add('wrong');
    opts[correctaMezclada].classList.add('correct');
    feedback.className = 'quiz-feedback show wrong-fb';
    feedback.innerHTML = `<strong>Incorrecto</strong><p>${q.explicacion}</p>`;
  }

  scoreLive.textContent = `Puntos: ${puntaje}`;
  nextBtn.classList.add('show');
  nextBtn.textContent = indice + 1 < preguntasActivas.length ? 'Siguiente pregunta' : 'Ver resultados';
}

function nivelPuntos() {
  return { facil: 5, medio: 10, dificil: 15, guanaco: 20 }[nivelSeleccionado] || 10;
}

nextBtn.addEventListener('click', () => {
  const avanzar = () => {
    indice++;
    indice < preguntasActivas.length ? mostrarPregunta() : mostrarResultados();
  };

  if (typeof gsap !== 'undefined') {
    gsap.to([quizCardEl, optionsDiv, feedback], {
      opacity: 0, y: -12, duration: 0.25, ease: 'power1.in',
      onComplete: avanzar
    });
  } else {
    avanzar();
  }
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
    { min: 100, titulo: 'Perfecto', msg: 'Dominio absoluto de las Raíces SV. Eres un referente de la cultura salvadoreña.' },
    { min: 80, titulo: 'Excelente', msg: 'Conoces muy bien la cultura de El Salvador. Estás al nivel de un guanaco de corazón.' },
    { min: 60, titulo: 'Buen trabajo', msg: 'Buen conocimiento de las Raíces SV. Repasa para mejorar tu desempeño.' },
    { min: 40, titulo: 'Sigue aprendiendo', msg: 'Hay mucho por descubrir. Explora las secciones informativas y vuelve a intentarlo.' },
    { min: 0, titulo: 'Comenzando', msg: 'El Salvador tiene una cultura riquísima. Explora y vuelve a intentarlo.' }
  ];

  const { titulo, msg } = MENSAJES.find(m => porcentaje >= m.min);

  const resultsScoreEl = document.getElementById('resultsScore');

  document.getElementById('resultsRank').textContent = `Nivel — ${levelBadge.textContent}`;
  document.getElementById('resultsTitle').textContent = titulo;
  document.getElementById('resultsMessage').textContent = msg;

  const pctFill = document.getElementById('resultsPctFill');
  results.classList.add('show');

  if (typeof gsap !== 'undefined') {
    resultsScoreEl.textContent = `0 / ${maximo} pts`;

    gsap.fromTo(results,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)' }
    );

    // Revelado en cascada de los elementos de resultado
    gsap.fromTo(
      ['#resultsRank', '#resultsTitle', '#resultsScore', '.quiz-results__pct-bar', '#resultsMessage', '.quiz-results__actions'],
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.45, stagger: 0.1, delay: 0.15, ease: 'power2.out' }
    );

    // Barra de porcentaje
    gsap.fromTo(pctFill, { width: '0%' }, { width: porcentaje + '%', duration: 1.4, delay: 0.35, ease: 'power2.out' });

    // Contador de puntaje animado
    const contador = { val: 0 };
    gsap.to(contador, {
      val: puntaje,
      duration: 1.3,
      delay: 0.3,
      ease: 'power1.out',
      onUpdate: () => { resultsScoreEl.textContent = `${Math.round(contador.val)} / ${maximo} pts`; },
      onComplete: () => { resultsScoreEl.textContent = `${puntaje} / ${maximo} pts`; }
    });

    // Confeti para buenos resultados
    if (porcentaje >= 60) {
      setTimeout(lanzarConfeti, 200);
    }
  } else {
    resultsScoreEl.textContent = `${puntaje} / ${maximo} pts`;
    pctFill.style.width = porcentaje + '%';
  }
}

/* ══════════════════════════════════════════════════════════
   CONFETI DE CELEBRACIÓN (solo cuando el resultado es bueno)
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

retryBtn.addEventListener('click', () => {
  document.getElementById('quizCard').style.display = '';
  optionsDiv.style.display = '';
  feedback.style.display = '';
  nextBtn.style.display = '';
  results.classList.remove('show');

  quizSetup.style.display = '';
  quizZone.classList.remove('active');
  quizBackdrop.classList.remove('show');
  document.body.classList.remove('quiz-modal-open');

  // Mostrar bienvenida de nuevo
  if (quizWelcome) {
    quizWelcome.style.display = 'block';
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(quizWelcome, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }

  levelCards.forEach(c => c.classList.remove('selected'));
  catBtns.forEach(b => b.classList.remove('selected'));
  startBtn.classList.remove('visible');
  nivelSeleccionado = null;
  categoriaSeleccionada = null;
});