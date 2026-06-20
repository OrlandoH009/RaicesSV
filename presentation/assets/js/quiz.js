/* ============================================================
   RAÍCES SV — quiz.js
   Quiz por niveles: Fácil · Medio · Difícil · 100% Guanaco
   ============================================================ */

/* ══════════════════════════════════════════════════════════
   BANCO DE PREGUNTAS
   Cada pregunta tiene: cat, nivel, pregunta, opciones[4],
   correcta (índice 0-3), explicacion
   ══════════════════════════════════════════════════════════ */
const PREGUNTAS = [

  /* ─────────────────────────────────────────────────────────
     HISTORIA
     ───────────────────────────────────────────────────────── */

  // Fácil
  {
    cat: 'historia', nivel: 'facil',
    pregunta: '¿Cómo se llamaba el territorio salvadoreño antes de la conquista española?',
    opciones: ['Quetzaltenango', 'Cuscatlán', 'Tikal', 'Copán'],
    correcta: 1,
    explicacion: 'El territorio era conocido como Cuscatlán, nombre Pipil que significa "lugar de las joyas y riquezas".'
  },
  {
    cat: 'historia', nivel: 'facil',
    pregunta: '¿Cuándo se proclamó la Independencia de Centroamérica?',
    opciones: ['15 de julio de 1821', '15 de septiembre de 1821', '4 de julio de 1821', '18 de febrero de 1841'],
    correcta: 1,
    explicacion: 'El 15 de septiembre de 1821 se proclamó la Independencia de Centroamérica del dominio español.'
  },
  {
    cat: 'historia', nivel: 'facil',
    pregunta: '¿Qué pueblo indígena era el más numeroso en El Salvador al llegar los españoles?',
    opciones: ['Los Mayas', 'Los Lencas', 'Los Pipiles', 'Los Aztecas'],
    correcta: 2,
    explicacion: 'Los Pipiles, de origen nahua emparentados con los aztecas, eran el grupo indígena más numeroso del territorio.'
  },
  {
    cat: 'historia', nivel: 'facil',
    pregunta: '¿En qué año El Salvador se separó definitivamente de la Federación Centroamericana?',
    opciones: ['1821', '1823', '1838', '1841'],
    correcta: 3,
    explicacion: 'El Salvador se constituyó como estado soberano el 18 de febrero de 1841 al separarse de la federación.'
  },
  {
    cat: 'historia', nivel: 'facil',
    pregunta: '¿Quién es conocido como el "Padre de la Patria Salvadoreña"?',
    opciones: ['Anastasio Aquino', 'Pedro de Alvarado', 'José Matías Delgado', 'Francisco Morazán'],
    correcta: 2,
    explicacion: 'El sacerdote José Matías Delgado lideró los primeros movimientos independentistas de 1811 y 1814.'
  },

  // Medio
  {
    cat: 'historia', nivel: 'medio',
    pregunta: '¿Qué cultivo fue la base de la economía colonial salvadoreña antes del café?',
    opciones: ['Cacao', 'Algodón', 'Añil', 'Caña de azúcar'],
    correcta: 2,
    explicacion: 'El añil (índigo), un tinte azul muy valorado en Europa para teñir telas, fue el principal producto de exportación colonial.'
  },
  {
    cat: 'historia', nivel: 'medio',
    pregunta: '¿En qué año se firmaron los Acuerdos de Paz de Chapultepec?',
    opciones: ['1989', '1990', '1992', '1994'],
    correcta: 2,
    explicacion: 'El 16 de enero de 1992 en Ciudad de México se firmaron los Acuerdos de Paz que pusieron fin a 12 años de conflicto armado.'
  },
  {
    cat: 'historia', nivel: 'medio',
    pregunta: '¿Qué conquistador español intentó dominar Cuscatlán en 1524 y fue herido en combate?',
    opciones: ['Hernán Cortés', 'Francisco Pizarro', 'Pedro de Alvarado', 'Diego de Almagro'],
    correcta: 2,
    explicacion: 'Pedro de Alvarado fue herido por los Pipiles en la batalla del Río Acajutla. Debió retirarse y volver con más tropas.'
  },
  {
    cat: 'historia', nivel: 'medio',
    pregunta: '¿Cuántas víctimas se estima que dejó la Matanza de 1932?',
    opciones: ['Más de 5,000', 'Más de 10,000', 'Más de 20,000', 'Más de 30,000'],
    correcta: 3,
    explicacion: 'Se estima que más de 30,000 personas, en su mayoría campesinos e indígenas del occidente, fueron masacradas en pocos días.'
  },
  {
    cat: 'historia', nivel: 'medio',
    pregunta: '¿Bajo qué virreinato perteneció El Salvador durante la época colonial?',
    opciones: ['Virreinato del Perú', 'Virreinato de Nueva España', 'Virreinato de Nueva Granada', 'Virreinato del Río de la Plata'],
    correcta: 1,
    explicacion: 'El Salvador fue parte de la Capitanía General de Guatemala, dependiente del Virreinato de Nueva España (México actual).'
  },

  // Difícil
  {
    cat: 'historia', nivel: 'dificil',
    pregunta: '¿Cuál fue el nombre del cacique Pipil que lideró la resistencia contra Pedro de Alvarado en 1524?',
    opciones: ['Lempira', 'Atlacatl', 'Nicarao', 'Tezozomoc'],
    correcta: 1,
    explicacion: 'Atlacatl fue el legendario jefe guerrero Pipil que encabezó la resistencia indígena contra la conquista española en Cuscatlán.'
  },
  {
    cat: 'historia', nivel: 'dificil',
    pregunta: '¿Quién lideró el levantamiento indígena de 1833 en Nonualco?',
    opciones: ['Farabundo Martí', 'Anastasio Aquino', 'Felipe Xicotencatl', 'Miguel Cabrera'],
    correcta: 1,
    explicacion: 'Anastasio Aquino, conocido como el "Rey de los Nonualcos", lideró una rebelión campesina e indígena en 1833 en los Nonualcos de La Paz.'
  },
  {
    cat: 'historia', nivel: 'dificil',
    pregunta: '¿En qué fecha fue asesinado el Arzobispo Óscar Romero?',
    opciones: ['16 enero de 1980', '24 de marzo de 1980', '15 de octubre de 1979', '11 de noviembre de 1989'],
    correcta: 1,
    explicacion: 'Óscar Romero fue asesinado el 24 de marzo de 1980 mientras celebraba misa en la capilla del Hospital de la Divina Providencia en San Salvador.'
  },
  {
    cat: 'historia', nivel: 'dificil',
    pregunta: '¿Cuál fue el primer grito de independencia salvadoreño y en qué fecha ocurrió?',
    opciones: ['5 de noviembre de 1811', '15 de septiembre de 1821', '24 de febrero de 1814', '2 de noviembre de 1811'],
    correcta: 0,
    explicacion: 'El primer grito de independencia en El Salvador ocurrió el 5 de noviembre de 1811, liderado por José Matías Delgado y Manuel Aguilar en San Salvador.'
  },
  {
    cat: 'historia', nivel: 'dificil',
    pregunta: '¿Qué tratado internacional reconoció los límites de El Salvador con Honduras después de décadas de disputa?',
    opciones: ['Tratado de Paz de Lima', 'Tratado de Washington', 'Tratado General de Paz de 1980', 'Tratado de Esquipulas'],
    correcta: 2,
    explicacion: 'El Tratado General de Paz de 1980 puso fin a la Guerra del Fútbol de 1969 y estableció los límites territoriales entre El Salvador y Honduras.'
  },

  // 100% Guanaco
  {
    cat: 'historia', nivel: 'guanaco',
    pregunta: '¿En qué departamento se ubica la antigua capital Prehispánica de Cuscatlán, llamada Cuzcatlán por los conquistadores?',
    opciones: ['San Salvador', 'La Libertad', 'Cuscatlán', 'Chalatenango'],
    correcta: 1,
    explicacion: 'La capital prehispánica de Cuscatlán se ubicaba en lo que hoy es Antiguo Cuscatlán, en el departamento de La Libertad.'
  },
  {
    cat: 'historia', nivel: 'guanaco',
    pregunta: '¿Cuál fue el nombre del golpe de estado de 1979 que dio inicio al período previo a la guerra civil?',
    opciones: ['La Revolución de Abril', 'El Golpe de los Militares Jóvenes', 'La Proclama Cívico-Militar', 'El Pronunciamiento del 15 de octubre'],
    correcta: 3,
    explicacion: 'El 15 de octubre de 1979, jóvenes oficiales del ejército tomaron el poder en un golpe conocido como "El Pronunciamiento del 15 de octubre", destituyendo al general Romero.'
  },
  {
    cat: 'historia', nivel: 'guanaco',
    pregunta: '¿Cómo se llama el sector rico que históricamente dominó la política y economía salvadoreña en el siglo XX?',
    opciones: ['El Círculo de Oro', 'Las 14 Familias', 'La Élite del Café', 'Los Señores de la Tierra'],
    correcta: 1,
    explicacion: 'Las "14 Familias" es el término popular con el que se conoce a la oligarquía cafetalera que controló el poder económico y político de El Salvador durante el siglo XX.'
  },


  /* ─────────────────────────────────────────────────────────
     GASTRONOMÍA
     ───────────────────────────────────────────────────────── */

  // Fácil
  {
    cat: 'gastronomia', nivel: 'facil',
    pregunta: '¿Cuál es el plato nacional de El Salvador?',
    opciones: ['Las baleadas', 'Las pupusas', 'La sopa de pata', 'Los tamales'],
    correcta: 1,
    explicacion: 'Las pupusas son el plato nacional, declaradas Patrimonio Cultural Intangible. Se celebra el Día Nacional de la Pupusa cada segundo domingo de noviembre.'
  },
  {
    cat: 'gastronomia', nivel: 'facil',
    pregunta: '¿Con qué siempre se acompañan las pupusas?',
    opciones: ['Con arroz y frijoles', 'Con curtido y salsa de tomate', 'Con crema y queso', 'Con chimol'],
    correcta: 1,
    explicacion: 'Las pupusas se sirven siempre con curtido (repollo encurtido fermentado) y salsa de tomate casera.'
  },
  {
    cat: 'gastronomia', nivel: 'facil',
    pregunta: '¿De qué están hechas las pupusas de arroz?',
    opciones: ['Harina de trigo', 'Masa de arroz molido', 'Harina de maíz amarillo', 'Masa de yuca'],
    correcta: 1,
    explicacion: 'Las pupusas de arroz se elaboran con masa de arroz molido y tienen una textura más suave y un sabor diferente a las de maíz.'
  },
  {
    cat: 'gastronomia', nivel: 'facil',
    pregunta: '¿En qué ciudad es famosa la Semita Papalona?',
    opciones: ['San Salvador', 'Santa Ana', 'Cojutepeque', 'San Miguel'],
    correcta: 2,
    explicacion: 'La Semita Papalona es originaria de Cojutepeque, Cuscatlán, donde se produce artesanalmente en hornos de leña.'
  },
  {
    cat: 'gastronomia', nivel: 'facil',
    pregunta: '¿Qué bebida caliente de origen prehispánico se elabora con maíz tierno?',
    opciones: ['El horchata', 'El tamarindo', 'El atol de elote', 'El ponche'],
    correcta: 2,
    explicacion: 'El atol de elote se elabora con maíz tierno molido, leche, azúcar y canela. Su nombre viene del náhuatl "atolli".'
  },

  // Medio
  {
    cat: 'gastronomia', nivel: 'medio',
    pregunta: '¿Qué significa la palabra "pupusa" en náhuatl?',
    opciones: ['Tortilla rellena', 'Cosa inflada o abultada', 'Pan de maíz', 'Comida sagrada'],
    correcta: 1,
    explicacion: 'La palabra proviene del náhuatl "pupushawa", que significa "cosa inflada o abultada", haciendo referencia a su forma característica.'
  },
  {
    cat: 'gastronomia', nivel: 'medio',
    pregunta: '¿Qué hoja se usa para envolver los tamales salvadoreños?',
    opciones: ['Hoja de maíz', 'Hoja de plátano', 'Hoja de maguey', 'Hoja de ayote'],
    correcta: 1,
    explicacion: 'Los tamales salvadoreños se envuelven en hojas de plátano, lo que los diferencia de los de otros países y les da su aroma único.'
  },
  {
    cat: 'gastronomia', nivel: 'medio',
    pregunta: '¿Cuál es el ingrediente que le da el color rojizo a la sopa de pata?',
    opciones: ['Chile rojo', 'Tomate', 'Achiote', 'Pimiento morrón'],
    correcta: 2,
    explicacion: 'El achiote (Bixa orellana) es el colorante natural que le da el color rojizo-anaranjado característico a la sopa de pata salvadoreña.'
  },
  {
    cat: 'gastronomia', nivel: 'medio',
    pregunta: '¿Qué comida es tradicional preparar en las familias salvadoreñas el Día de los Difuntos?',
    opciones: ['Pupusas especiales', 'Tamales de elote', 'El fiambre', 'Sopa de pata'],
    correcta: 2,
    explicacion: 'El fiambre es una ensalada fría con embutidos, verduras cocidas, aceitunas y alcaparras, típica del 1 y 2 de noviembre.'
  },
  {
    cat: 'gastronomia', nivel: 'medio',
    pregunta: '¿Qué es el atol shuco y de dónde es típico?',
    opciones: ['Atol dulce de piña, típico del oriente', 'Atol fermentado de maíz negro, típico del occidente', 'Bebida de cacao, típica del centro', 'Atol de plátano, típico del norte'],
    correcta: 1,
    explicacion: 'El atol shuco es una bebida de maíz negro fermentado con sabor ácido, especialmente popular en Chalchuapa y la zona occidental del país.'
  },

  // Difícil
  {
    cat: 'gastronomia', nivel: 'dificil',
    pregunta: '¿Cuál es la hierba aromática local que se agrega a la sopa de pata y algunos tamales salvadoreños?',
    opciones: ['Epazote', 'Chipilín', 'Hierba santa', 'Culantro de monte'],
    correcta: 1,
    explicacion: 'El chipilín (Crotalaria longirostrata) es una planta leguminosa nativa de Mesoamérica, aromática y nutritiva, muy usada en la cocina salvadoreña.'
  },
  {
    cat: 'gastronomia', nivel: 'dificil',
    pregunta: '¿En qué consiste exactamente el "chicharrón" usado como relleno de pupusas?',
    opciones: ['Piel de cerdo frita', 'Carne de cerdo molida cocida con tomate y especias', 'Tocino ahumado', 'Costillas de cerdo trituradas'],
    correcta: 1,
    explicacion: 'El chicharrón para pupusas es carne de cerdo molida y cocida con tomate, chile verde y especias hasta obtener una pasta, muy diferente al chicharrón frito.'
  },
  {
    cat: 'gastronomia', nivel: 'dificil',
    pregunta: '¿Qué es el "marquesote" y en qué ocasiones se consume tradicionalmente?',
    opciones: ['Pan salado navideño', 'Bizcocho de arroz y huevo para fiestas y velorios', 'Tortilla dulce de maíz', 'Postre colonial de leche'],
    correcta: 1,
    explicacion: 'El marquesote es un bizcocho esponjoso de harina de arroz y huevo, de origen colonial, que se consume en fiestas patronales, velorios y celebraciones religiosas.'
  },
  {
    cat: 'gastronomia', nivel: 'dificil',
    pregunta: '¿Qué fruta es la base del "tiste", bebida prehispánica salvadoreña?',
    opciones: ['Jocote', 'Cacao', 'Maíz negro y cacao combinados', 'Zapote'],
    correcta: 2,
    explicacion: 'El tiste es una bebida fría de origen prehispánico elaborada con maíz negro tostado y cacao molidos juntos, endulzada con azúcar o panela.'
  },

  // 100% Guanaco
  {
    cat: 'gastronomia', nivel: 'guanaco',
    pregunta: '¿Cómo se llama el tamal salvadoreño relleno únicamente de frijoles molidos?',
    opciones: ['Tamal de elote', 'Tamal pisque', 'Tamal de chipilín', 'Tamal de rajas'],
    correcta: 1,
    explicacion: 'El tamal pisque es la variante más simple y tradicional: masa de maíz con frijoles refritos como único relleno, de origen humilde y campesino.'
  },
  {
    cat: 'gastronomia', nivel: 'guanaco',
    pregunta: '¿Qué es el "pepián" en la cocina salvadoreña?',
    opciones: ['Un chile seco importado', 'Una salsa espesa de semillas de calabaza tostadas', 'Una tortilla gruesa con pepitas', 'Un tamal de chile rojo'],
    correcta: 1,
    explicacion: 'El pepián es una salsa ancestral mesoamericana elaborada con semillas de calabaza (pepitoria) tostadas y molidas, usada para acompañar yuca, carnes y otros platillos.'
  },
  {
    cat: 'gastronomia', nivel: 'guanaco',
    pregunta: '¿En qué municipio del occidente salvadoreño se realiza el único mercado nocturno de artesanías y comida típica del país?',
    opciones: ['Izalco', 'Nahuizalco', 'Chalchuapa', 'Apaneca'],
    correcta: 1,
    explicacion: 'Nahuizalco, en Sonsonate, tiene el único mercado nocturno de El Salvador donde se venden artesanías y comida típica indígena, incluyendo platillos de la tradición nahua.'
  },


  /* ─────────────────────────────────────────────────────────
     SITIOS CULTURALES
     ───────────────────────────────────────────────────────── */

  // Fácil
  {
    cat: 'sitios', nivel: 'facil',
    pregunta: '¿En qué departamento se encuentra el sitio arqueológico Tazumal?',
    opciones: ['San Salvador', 'Sonsonate', 'Santa Ana', 'La Libertad'],
    correcta: 2,
    explicacion: 'Tazumal se encuentra en Chalchuapa, Santa Ana, a 78 km al occidente de San Salvador.'
  },
  {
    cat: 'sitios', nivel: 'facil',
    pregunta: '¿Cómo se llama popularmente a Joya de Cerén?',
    opciones: ['La Ciudad Perdida', 'La Pompeya de América', 'El Machu Picchu salvadoreño', 'La Atlántida Centroamericana'],
    correcta: 1,
    explicacion: 'Joya de Cerén es conocida como "La Pompeya de América" por haber sido sepultada por ceniza volcánica, similar a la ciudad italiana.'
  },
  {
    cat: 'sitios', nivel: 'facil',
    pregunta: '¿Qué país canonizó a Óscar Romero y cuyos restos descansan en la Catedral Metropolitana?',
    opciones: ['España', 'Italia (El Vaticano)', 'Estados Unidos', 'Argentina'],
    correcta: 1,
    explicacion: 'El Papa Francisco canonizó a Óscar Arnulfo Romero el 14 de octubre de 2018 en el Vaticano, Roma.'
  },
  {
    cat: 'sitios', nivel: 'facil',
    pregunta: '¿Qué significa "Suchitoto" en náhuatl?',
    opciones: ['Lugar del agua', 'Lugar del pájaro flor', 'Ciudad de piedra', 'Valle verde'],
    correcta: 1,
    explicacion: 'Suchitoto viene de "suchi" (flor) y "toto" (pájaro) en náhuatl, significando "lugar del pájaro flor".'
  },
  {
    cat: 'sitios', nivel: 'facil',
    pregunta: '¿Cuándo fue declarada Joya de Cerén Patrimonio de la Humanidad por la UNESCO?',
    opciones: ['1987', '1990', '1993', '1999'],
    correcta: 2,
    explicacion: 'Joya de Cerén fue declarado Patrimonio de la Humanidad por la UNESCO en 1993, siendo el único sitio salvadoreño con esta distinción.'
  },

  // Medio
  {
    cat: 'sitios', nivel: 'medio',
    pregunta: '¿Qué volcán sepultó el asentamiento maya de Joya de Cerén alrededor del año 590 d.C.?',
    opciones: ['Volcán Santa Ana', 'Volcán San Miguel', 'Volcán Loma Caldera', 'Volcán Izalco'],
    correcta: 2,
    explicacion: 'El volcán Loma Caldera, cercano al sitio, entró en erupción alrededor del 590 d.C. y sepultó el asentamiento bajo más de 5 metros de ceniza.'
  },
  {
    cat: 'sitios', nivel: 'medio',
    pregunta: '¿Qué significa el nombre "Tazumal" en lengua quiché?',
    opciones: ['Lugar de las joyas', 'Lugar donde se quemaron las víctimas', 'Montaña sagrada', 'Templo del sol'],
    correcta: 1,
    explicacion: 'Tazumal significa "lugar donde se quemaron las víctimas" en lengua quiché, haciendo referencia a rituales prehispánicos.'
  },
  {
    cat: 'sitios', nivel: 'medio',
    pregunta: '¿Qué artista salvadoreño pintó los murales interiores de la Catedral Metropolitana de San Salvador?',
    opciones: ['Roberto Galicia', 'Benjamin Cañas', 'Fernando Llort', 'Camilo Minero'],
    correcta: 2,
    explicacion: 'Fernando Llort, conocido por su estilo naïf con motivos campesinos y religiosos, pintó los célebres murales del interior de la Catedral Metropolitana.'
  },
  {
    cat: 'sitios', nivel: 'medio',
    pregunta: '¿En qué año fue inaugurado el monumento al Salvador del Mundo?',
    opciones: ['1930', '1942', '1953', '1960'],
    correcta: 1,
    explicacion: 'La estatua original de madera de cedro fue inaugurada en 1942. En 1953 fue sustituida por una réplica en aluminio más resistente al clima.'
  },
  {
    cat: 'sitios', nivel: 'medio',
    pregunta: '¿Cuál es el segundo sitio arqueológico más grande de El Salvador?',
    opciones: ['Cara Sucia', 'Ruinas de San Andrés', 'Cihuatán', 'El Trapiche'],
    correcta: 1,
    explicacion: 'Las Ruinas de San Andrés, en Ciudad Arce, La Libertad, son el segundo sitio arqueológico más grande del país, con estructuras del período Clásico maya.'
  },

  // Difícil
  {
    cat: 'sitios', nivel: 'dificil',
    pregunta: '¿Qué deidad azteca fue encontrada en Tazumal y hoy se exhibe en su museo?',
    opciones: ['Quetzalcóatl', 'Tlaloc', 'Xipe Tótec', 'Huitzilopochtli'],
    correcta: 2,
    explicacion: 'La estatua de Xipe Tótec, dios azteca de la fertilidad y la renovación, fue hallada en Tazumal por el arqueólogo Stanley Boggs y se exhibe en el museo del sitio.'
  },
  {
    cat: 'sitios', nivel: 'dificil',
    pregunta: '¿En cuántas etapas constructivas fue edificada la pirámide principal de Tazumal?',
    opciones: ['6', '9', '14', '18'],
    correcta: 2,
    explicacion: 'La pirámide principal de Tazumal fue construida en 14 etapas a lo largo de los siglos, lo que refleja la continuidad de ocupación del sitio.'
  },
  {
    cat: 'sitios', nivel: 'dificil',
    pregunta: '¿Quién realizó las primeras excavaciones sistemáticas en Joya de Cerén en 1978?',
    opciones: ['Stanley Boggs', 'Payson Sheets', 'William Sanders', 'Pedro Armillas'],
    correcta: 1,
    explicacion: 'El arqueólogo estadounidense Payson Sheets descubrió Joya de Cerén en 1978 mientras supervisaba proyectos de construcción de silos en la zona.'
  },
  {
    cat: 'sitios', nivel: 'dificil',
    pregunta: '¿Qué lago artificial creado en 1976 forma parte del paisaje de Suchitoto?',
    opciones: ['Lago de Güija', 'Lago de Coatepeque', 'Lago Suchitlán', 'Lago Alegría'],
    correcta: 2,
    explicacion: 'El lago Suchitlán fue creado en 1976 con la represa Cerrón Grande sobre el Río Lempa, y hoy forma parte del paisaje turístico de Suchitoto.'
  },

  // 100% Guanaco
  {
    cat: 'sitios', nivel: 'guanaco',
    pregunta: '¿Cuántos metros de altura tiene la pirámide principal de Tazumal?',
    opciones: ['18 metros', '24 metros', '30 metros', '36 metros'],
    correcta: 1,
    explicacion: 'La estructura principal de Tazumal tiene 24 metros de altura, siendo la pirámide precolombina más alta de El Salvador.'
  },
  {
    cat: 'sitios', nivel: 'guanaco',
    pregunta: '¿A cuántos kilómetros al occidente de San Salvador se ubica el sitio de Tazumal?',
    opciones: ['45 km', '60 km', '78 km', '95 km'],
    correcta: 2,
    explicacion: 'Tazumal está a 78 km de San Salvador, en el municipio de Chalchuapa, departamento de Santa Ana.'
  },
  {
    cat: 'sitios', nivel: 'guanaco',
    pregunta: '¿Cuántas estructuras arqueológicas se han descubierto bajo la ceniza volcánica en Joya de Cerén?',
    opciones: ['12 estructuras', '18 estructuras', '24 estructuras', '30 estructuras'],
    correcta: 1,
    explicacion: 'Se han excavado 18 estructuras en Joya de Cerén, incluyendo viviendas, cocinas, una sauna, una milpa y edificios comunales.'
  },


  /* ─────────────────────────────────────────────────────────
     LEYENDAS
     ───────────────────────────────────────────────────────── */

  // Fácil
  {
    cat: 'leyendas', nivel: 'facil',
    pregunta: '¿A quiénes persigue principalmente la Siguanaba?',
    opciones: ['A los niños desobedientes', 'A los hombres infieles', 'A las mujeres solteras', 'A los ladrones'],
    correcta: 1,
    explicacion: 'La Siguanaba persigue a los hombres infieles o irresponsables, haciéndolos caminar en círculos hasta enloquecerlos.'
  },
  {
    cat: 'leyendas', nivel: 'facil',
    pregunta: '¿Cuál es la característica física más peculiar del Cipitío?',
    opciones: ['Tiene dos cabezas', 'Sus pies están al revés', 'Es completamente azul', 'No tiene sombra'],
    correcta: 1,
    explicacion: 'El Cipitío tiene los talones hacia adelante y los dedos hacia atrás, razón por la que sus huellas son difíciles de rastrear.'
  },
  {
    cat: 'leyendas', nivel: 'facil',
    pregunta: '¿Cuál es el Cadejo que protege a los caminantes nocturnos honestos?',
    opciones: ['El Cadejo negro', 'El Cadejo rojo', 'El Cadejo blanco', 'El Cadejo gris'],
    correcta: 2,
    explicacion: 'El Cadejo blanco protege a los caminantes honestos, mientras que el negro persigue a quienes andan haciendo el mal.'
  },
  {
    cat: 'leyendas', nivel: 'facil',
    pregunta: '¿Dónde aparece con más frecuencia la Llorona según la tradición salvadoreña?',
    opciones: ['En los mercados', 'A orillas de ríos y lagunas', 'En las iglesias', 'En los cementerios de día'],
    correcta: 1,
    explicacion: 'La Llorona aparece cerca de ríos y lagunas, lanzando su llanto desgarrador buscando a sus hijos ahogados.'
  },
  {
    cat: 'leyendas', nivel: 'facil',
    pregunta: '¿Qué es la Descarnada en el folclore salvadoreño?',
    opciones: ['Un fantasma sin nombre', 'Una figura que representa a la muerte caminando entre los vivos', 'Una bruja anciana', 'Un animal mítico'],
    correcta: 1,
    explicacion: 'La Descarnada es una figura femenina esquelética que camina por las calles oscuras; verla se considera un presagio de muerte.'
  },

  // Medio
  {
    cat: 'leyendas', nivel: 'medio',
    pregunta: '¿Qué castigo recibió la Siguanaba según la leyenda por abandonar a su hijo?',
    opciones: ['Convertida en árbol', 'Condenada a vagar eternamente sin poder ver su rostro', 'Encerrada en una cueva', 'Convertida en serpiente'],
    correcta: 1,
    explicacion: 'El dios Tlaloc la condenó a vagar eternamente por bosques y ríos, sin poder ver su propio rostro, como castigo por abandonar a su hijo El Cipitío.'
  },
  {
    cat: 'leyendas', nivel: 'medio',
    pregunta: '¿Quién es el padre del Cipitío según la leyenda salvadoreña?',
    opciones: ['El dios Tlaloc', 'Un hombre mortal infiel', 'El Cadejo negro', 'No tiene padre conocido en la leyenda'],
    correcta: 3,
    explicacion: 'La leyenda no especifica un padre para el Cipitío. Es hijo de la Siguanaba y fue maldecido junto a ella como consecuencia de los pecados de su madre.'
  },
  {
    cat: 'leyendas', nivel: 'medio',
    pregunta: '¿Qué olor caracteriza al Cadejo blanco según la tradición popular?',
    opciones: ['Azufre y humo', 'Incienso y flores', 'Tierra mojada', 'Copal quemado'],
    correcta: 1,
    explicacion: 'El Cadejo blanco huele a incienso y flores, mientras que el negro exhala un fuerte olor a azufre, señal de su naturaleza maligna.'
  },
  {
    cat: 'leyendas', nivel: 'medio',
    pregunta: '¿Cómo se puede uno librar de la Siguanaba según la tradición popular salvadoreña?',
    opciones: ['Correr sin mirar atrás', 'Morder un machete o rezar en voz alta', 'Llorar y pedir perdón', 'Encender fuego'],
    correcta: 1,
    explicacion: 'Se dice que morder un machete, rezar en voz alta, llevar tijeras cruzadas o pronunciar el nombre de la propia madre libra al hombre de la Siguanaba.'
  },
  {
    cat: 'leyendas', nivel: 'medio',
    pregunta: '¿Qué función social cumple la leyenda del Duende en las zonas rurales según los estudiosos del folclore?',
    opciones: ['Enseñar a los niños a respetar a los mayores', 'Disuadir a las personas de adentrarse innecesariamente en los bosques', 'Explicar las tormentas', 'Proteger los cultivos de maíz'],
    correcta: 1,
    explicacion: 'El miedo a encontrarse con el Duende en bosques y quebradas ha disuadido históricamente a las personas de estos ecosistemas, contribuyendo a su preservación involuntaria.'
  },

  // Difícil
  {
    cat: 'leyendas', nivel: 'dificil',
    pregunta: '¿A qué niñas persigue específicamente el Duende según la variante más extendida de la leyenda?',
    opciones: ['A las de cabello rizado', 'A las de ojos claros y trenzas largas', 'A las que salen de noche', 'A las que van al río solas'],
    correcta: 1,
    explicacion: 'El Duende se enamora de las niñas de ojos claros y trenzas largas. Por eso, los padres cortaban el cabello de sus hijas para alejar al Duende.'
  },
  {
    cat: 'leyendas', nivel: 'dificil',
    pregunta: '¿Cuál es la interpretación antropológica más aceptada sobre el origen de la leyenda de la Siguanaba?',
    opciones: ['Es una adaptación de un mito griego', 'Es una codificación de valores morales sobre la infidelidad y el abandono familiar', 'Proviene de África traída por esclavos', 'Es una advertencia sobre los ríos peligrosos'],
    correcta: 1,
    explicacion: 'Los antropólogos señalan que la Siguanaba codifica valores morales: advierte sobre las consecuencias de la infidelidad y el abandono de la familia, transmitiéndolos a través del miedo.'
  },
  {
    cat: 'leyendas', nivel: 'dificil',
    pregunta: '¿Cuál es la condena específica del Cipitío que lo diferencia de la de su madre la Siguanaba?',
    opciones: ['Vagar sin recordar su nombre', 'No poder crecer ni envejecer jamás', 'No poder hablar con humanos', 'Ser invisible de día'],
    correcta: 1,
    explicacion: 'Mientras la Siguanaba debe vagar sin ver su rostro, el Cipitío está condenado a ser un niño para siempre, sin poder crecer ni envejecer, eternamente atrapado en la infancia.'
  },

  // 100% Guanaco
  {
    cat: 'leyendas', nivel: 'guanaco',
    pregunta: '¿En qué ríos o lagos salvadoreños la tradición oral ubica más frecuentemente los avistamientos de la Llorona?',
    opciones: ['Río Paz y Lago de Güija', 'Río Lempa, Lago de Coatepeque y Río Grande de San Miguel', 'Río Goascorán y Lago Olomega', 'Río Jiboa y Río Sucio'],
    correcta: 1,
    explicacion: 'La tradición oral salvadoreña ubica a la Llorona principalmente en el Río Lempa, el Lago de Coatepeque y el Río Grande de San Miguel.'
  },
  {
    cat: 'leyendas', nivel: 'guanaco',
    pregunta: '¿Cuál de los siguientes elementos NO es parte de la descripción tradicional del Cipitío en el folclore salvadoreño?',
    opciones: ['Gran sombrero de palma', 'Vientre abultado', 'Pies al revés', 'Cabello blanco de anciano'],
    correcta: 3,
    explicacion: 'El Cipitío se describe con gran sombrero de palma, vientre abultado y pies al revés. No tiene cabello blanco; se representa como un niño de apariencia graciosa y pícara.'
  },
  {
    cat: 'leyendas', nivel: 'guanaco',
    pregunta: '¿Con qué dios prehispánico se asocia el castigo de la Siguanaba en la versión más documentada de la leyenda salvadoreña?',
    opciones: ['Quetzalcóatl', 'Tlaloc', 'Xipe Tótec', 'Huitzilopochtli'],
    correcta: 1,
    explicacion: 'En la versión más extendida, es Tlaloc, dios nahua del agua y la lluvia, quien condena a la Siguanaba a vagar eternamente por bosques y ríos como castigo.'
  },


  /* ─────────────────────────────────────────────────────────
     EVENTOS CULTURALES
     ───────────────────────────────────────────────────────── */

  // Fácil
  {
    cat: 'eventos', nivel: 'facil',
    pregunta: '¿Cuándo se celebran las Fiestas Agostinas en El Salvador?',
    opciones: ['Durante todo julio', 'Durante todo agosto', 'Primera semana de septiembre', 'En diciembre'],
    correcta: 1,
    explicacion: 'Las Fiestas Agostinas se celebran durante todo el mes de agosto en honor al Divino Salvador del Mundo, patrón de la nación.'
  },
  {
    cat: 'eventos', nivel: 'facil',
    pregunta: '¿Qué se celebra el 15 de septiembre en El Salvador?',
    opciones: ['El Día de la Madre', 'El Día de la Independencia', 'Las Fiestas Agostinas', 'El Día del Trabajador'],
    correcta: 1,
    explicacion: 'El 15 de septiembre se celebra el Día de la Independencia de Centroamérica, proclamada en 1821.'
  },
  {
    cat: 'eventos', nivel: 'facil',
    pregunta: '¿Del 16 al 24 de diciembre, ¿qué tradición navideña se celebra en El Salvador?',
    opciones: ['Los Aguinaldos', 'Las Posadas', 'La Gritería', 'Los Villancicos'],
    correcta: 1,
    explicacion: 'Las Posadas representan la búsqueda de José y María de alojamiento; se celebran en casas diferentes cada noche del 16 al 24 de diciembre.'
  },
  {
    cat: 'eventos', nivel: 'facil',
    pregunta: '¿Cuándo se visitan los cementerios en El Salvador para honrar a los difuntos?',
    opciones: ['31 de octubre', '1 y 2 de noviembre', '15 de noviembre', '2 de octubre'],
    correcta: 1,
    explicacion: 'El Día de Todos los Santos (1 nov.) y el Día de los Difuntos (2 nov.) son los días en que las familias visitan y adornan las tumbas de sus seres queridos.'
  },
  {
    cat: 'eventos', nivel: 'facil',
    pregunta: '¿Cuál es la procesión más importante de las Fiestas Agostinas?',
    opciones: ['La Procesión del Corpus', 'La Bajada del Salvador', 'La Procesión de las Palmas', 'La Bajada de la Cruz'],
    correcta: 1,
    explicacion: 'La Bajada del Salvador es la procesión principal de agosto, que recorre las calles de San Salvador con la imagen del Divino Salvador del Mundo.'
  },

  // Medio
  {
    cat: 'eventos', nivel: 'medio',
    pregunta: '¿Qué municipio celebra la famosa "Procesión de las Palmas" con raíces indígenas en agosto?',
    opciones: ['Izalco', 'Nahuizalco', 'Panchimalco', 'Suchitoto'],
    correcta: 2,
    explicacion: 'Panchimalco celebra la Procesión de las Palmas en agosto, una tradición de raíz indígena pipil única en el país que se ha conservado por siglos.'
  },
  {
    cat: 'eventos', nivel: 'medio',
    pregunta: '¿Cómo se llama la tradición navideña en que la imagen del santo pasa de casa en casa antes de la fiesta patronal?',
    opciones: ['La Visita', 'Las Posadas', 'Las Pasadas', 'La Novena'],
    correcta: 2,
    explicacion: 'Las Pasadas son una costumbre donde grupos llevan la imagen del santo de casa en casa durante días previos a la fiesta, rezando y celebrando en comunidad.'
  },
  {
    cat: 'eventos', nivel: 'medio',
    pregunta: '¿Qué bebida es típicamente preparada durante las Posadas navideñas salvadoreñas?',
    opciones: ['Atol de elote', 'Ponche de frutas', 'Horchata fría', 'Refresco de chan'],
    correcta: 1,
    explicacion: 'El ponche de frutas caliente, preparado con frutas como manzana, membrillo, guayaba, caña de azúcar y canela, es la bebida infaltable de las Posadas navideñas.'
  },
  {
    cat: 'eventos', nivel: 'medio',
    pregunta: '¿Cuántos municipios tiene El Salvador y por tanto cuántas fiestas patronales diferentes se celebran al año?',
    opciones: ['214 municipios', '262 municipios', '289 municipios', '312 municipios'],
    correcta: 1,
    explicacion: 'El Salvador tiene 262 municipios, cada uno con su propia fiesta patronal, lo que genera una riqueza de celebraciones culturales únicas durante todo el año.'
  },
  {
    cat: 'eventos', nivel: 'medio',
    pregunta: '¿Cómo se llama el estado de ánimo festivo navideño salvadoreño favorecido por el clima fresco de diciembre?',
    opciones: ['El frescal de diciembre', 'El veranillo de San Miguel', 'La brisa navideña', 'El norte navideño'],
    correcta: 1,
    explicacion: 'El "veranillo de San Miguel" o simplemente el clima fresco de diciembre hace que el ambiente navideño en El Salvador se sienta especialmente agradable.'
  },

  // Difícil
  {
    cat: 'eventos', nivel: 'dificil',
    pregunta: '¿En qué estadio de San Salvador se celebran eventos populares durante las Fiestas Agostinas?',
    opciones: ['Estadio Cuscatlán', 'Estadio Mágico González', 'Estadio Las Delicias', 'Estadio Flor Blanca'],
    correcta: 1,
    explicacion: 'El Estadio Nacional Jorge "Mágico" González es sede de conciertos, corridas de toros y otros eventos populares durante las Fiestas Agostinas de agosto.'
  },
  {
    cat: 'eventos', nivel: 'dificil',
    pregunta: '¿Desde qué país parte la Carrera de la Antorcha de la Libertad que llega a El Salvador cada 14 de septiembre?',
    opciones: ['México', 'Honduras', 'Guatemala', 'Nicaragua'],
    correcta: 2,
    explicacion: 'La llama simbólica se enciende en Guatemala el 14 de septiembre y se transporta en carrera de relevo a través de todos los países centroamericanos hasta llegar a El Salvador.'
  },
  {
    cat: 'eventos', nivel: 'dificil',
    pregunta: '¿En qué municipio salvadoreño se celebra la Feria de Santiago Apóstol, famosa por sus eventos artesanales?',
    opciones: ['Suchitoto', 'Nahuizalco', 'Chalchuapa', 'Izalco'],
    correcta: 2,
    explicacion: 'Chalchuapa, en Santa Ana, celebra la Feria en honor a Santiago Apóstol, reconocida por su oferta artesanal, cultural y gastronómica.'
  },

  // 100% Guanaco
  {
    cat: 'eventos', nivel: 'guanaco',
    pregunta: '¿En qué fecha exacta es el Día Nacional de la Pupusa en El Salvador?',
    opciones: ['Primer domingo de noviembre', 'Segundo domingo de noviembre', 'Tercer domingo de octubre', '12 de noviembre'],
    correcta: 1,
    explicacion: 'El Día Nacional de la Pupusa se celebra cada segundo domingo de noviembre, fecha establecida por decreto legislativo en 2005.'
  },
  {
    cat: 'eventos', nivel: 'guanaco',
    pregunta: '¿En qué año se decretó oficialmente el 15 de noviembre como Día Nacional de la Pupusa?',
    opciones: ['1999', '2002', '2005', '2010'],
    correcta: 2,
    explicacion: 'La Asamblea Legislativa de El Salvador decretó en 2005 el segundo domingo de noviembre como Día Nacional de la Pupusa, en reconocimiento al plato nacional.'
  },
  {
    cat: 'eventos', nivel: 'guanaco',
    pregunta: '¿Cuántos días duran aproximadamente las fiestas patronales de la mayoría de los municipios salvadoreños?',
    opciones: ['1 a 2 días', '3 a 8 días', '10 a 15 días', 'Todo un mes'],
    correcta: 1,
    explicacion: 'Las fiestas patronales generalmente duran entre 3 y 8 días, incluyendo misas solemnes, procesiones, ferias, bailes populares y espectáculos culturales.'
  }
];

/* ══════════════════════════════════════════════════════════
   ESTADO DEL QUIZ
   ══════════════════════════════════════════════════════════ */
let preguntasActivas = [];
let indice           = 0;
let puntaje          = 0;
let respondida       = false;
let nivelSeleccionado    = null;
let categoriaSeleccionada = null;

/* ── DOM ── */
const quizSetup   = document.getElementById('quizSetup');
const quizZone    = document.getElementById('quizZone');
const levelCards  = document.querySelectorAll('.level-card');
const catBtns     = document.querySelectorAll('.cat-btn');
const startBtn    = document.getElementById('startBtn');
const progFill    = document.getElementById('progressFill');
const qCounter    = document.getElementById('questionCounter');
const scoreLive   = document.getElementById('scoreLive');
const qCategory   = document.getElementById('qCategory');
const qText       = document.getElementById('qText');
const optionsDiv  = document.getElementById('quizOptions');
const feedback    = document.getElementById('quizFeedback');
const nextBtn     = document.getElementById('nextBtn');
const results     = document.getElementById('quizResults');
const retryBtn    = document.getElementById('retryBtn');
const levelBadge  = document.getElementById('levelBadge');

/* ── Selección de nivel ── */
levelCards.forEach(card => {
  card.addEventListener('click', () => {
    levelCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    nivelSeleccionado = card.dataset.level;
    verificarListo();
  });
});

/* ── Selección de categoría ── */
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

/* ── Iniciar quiz ── */
startBtn.addEventListener('click', () => {
  let pool = PREGUNTAS.filter(p => p.nivel === nivelSeleccionado);
  if (categoriaSeleccionada !== 'todas') {
    pool = pool.filter(p => p.cat === categoriaSeleccionada);
  }

  if (pool.length === 0) {
    alert('No hay preguntas disponibles para esa combinación. Prueba otra categoría o nivel.');
    return;
  }

  pool     = pool.sort(() => Math.random() - 0.5).slice(0, Math.min(10, pool.length));
  preguntasActivas = pool;
  indice   = 0;
  puntaje  = 0;

  quizSetup.style.display = 'none';
  quizZone.classList.add('active');
  results.classList.remove('show');

  // Badge de nivel
  const NIVEL_LABELS = { facil: 'Fácil', medio: 'Medio', dificil: 'Difícil', guanaco: '100% Guanaco' };
  levelBadge.textContent  = NIVEL_LABELS[nivelSeleccionado];
  levelBadge.className    = `quiz-level-badge ${nivelSeleccionado}`;

  mostrarPregunta();
});

/* ── Mostrar pregunta ── */
function mostrarPregunta() {
  respondida = false;
  feedback.classList.remove('show', 'correct-fb', 'wrong-fb');
  nextBtn.classList.remove('show');

  const total = preguntasActivas.length;
  const q     = preguntasActivas[indice];

  progFill.style.width   = `${(indice / total) * 100}%`;
  qCounter.textContent   = `Pregunta ${indice + 1} de ${total}`;
  scoreLive.textContent  = `Puntos: ${puntaje}`;

  const CAT_LABELS = {
    historia: 'Historia', gastronomia: 'Gastronomía',
    sitios: 'Sitios Culturales', leyendas: 'Leyendas', eventos: 'Eventos'
  };
  qCategory.textContent = CAT_LABELS[q.cat] || q.cat;
  qText.textContent     = q.pregunta;

  optionsDiv.innerHTML  = '';
  const indices         = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  const correctaMezclada = indices.indexOf(q.correcta);

  indices.forEach((origIdx, newIdx) => {
    const btn = document.createElement('button');
    btn.className   = 'quiz-option';
    btn.textContent = q.opciones[origIdx];
    btn.addEventListener('click', () => seleccionar(btn, newIdx, correctaMezclada, q));
    optionsDiv.appendChild(btn);
  });
}

/* ── Seleccionar respuesta ── */
function seleccionar(btn, newIdx, correctaMezclada, q) {
  if (respondida) return;
  respondida = true;

  const opts = optionsDiv.querySelectorAll('.quiz-option');
  opts.forEach(o => o.disabled = true);

  const esCorrecta = newIdx === correctaMezclada;

  if (esCorrecta) {
    btn.classList.add('correct');
    puntaje += nivelPuntos();
    feedback.className = 'quiz-feedback show correct-fb';
    feedback.innerHTML = `<strong>Correcto — +${nivelPuntos()} puntos</strong>${q.explicacion}`;
  } else {
    btn.classList.add('wrong');
    opts[correctaMezclada].classList.add('correct');
    feedback.className = 'quiz-feedback show wrong-fb';
    feedback.innerHTML = `<strong>Incorrecto</strong>${q.explicacion}`;
  }

  scoreLive.textContent = `Puntos: ${puntaje}`;
  nextBtn.classList.add('show');
  nextBtn.textContent   = indice + 1 < preguntasActivas.length ? 'Siguiente pregunta' : 'Ver resultados';
}

/* Puntos según dificultad */
function nivelPuntos() {
  return { facil: 5, medio: 10, dificil: 15, guanaco: 20 }[nivelSeleccionado] || 10;
}

/* ── Siguiente pregunta ── */
nextBtn.addEventListener('click', () => {
  indice++;
  indice < preguntasActivas.length ? mostrarPregunta() : mostrarResultados();
});

/* ── Resultados ── */
function mostrarResultados() {
  progFill.style.width = '100%';
  document.getElementById('quizCard').style.display = 'none';
  optionsDiv.style.display   = 'none';
  feedback.style.display     = 'none';
  nextBtn.style.display      = 'none';

  const total      = preguntasActivas.length;
  const maximo     = total * nivelPuntos();
  const porcentaje = Math.round((puntaje / maximo) * 100);

  const MENSAJES = [
    { min: 100, titulo: 'Perfecto', msg: 'Dominio total de las Raíces SV. Eres un referente de la cultura salvadoreña.' },
    { min: 80,  titulo: 'Excelente', msg: 'Conoces muy bien la cultura de El Salvador. Estás muy cerca del nivel máximo.' },
    { min: 60,  titulo: 'Buen trabajo', msg: 'Buen conocimiento de las Raíces SV. Repasa las secciones informativas para subir de nivel.' },
    { min: 40,  titulo: 'Sigue aprendiendo', msg: 'Hay mucho más por descubrir. Visita las páginas de Historia, Leyendas y Gastronomía.' },
    { min: 0,   titulo: 'Apenas comenzando', msg: 'El Salvador tiene una cultura riquísima por descubrir. Explora el sitio y vuelve a intentarlo.' }
  ];

  const { titulo, msg } = MENSAJES.find(m => porcentaje >= m.min);

  document.getElementById('resultsRank').textContent    = `Nivel — ${levelBadge.textContent}`;
  document.getElementById('resultsTitle').textContent   = titulo;
  document.getElementById('resultsScore').textContent   = `${puntaje} / ${maximo} pts`;
  document.getElementById('resultsMessage').textContent = msg;

  const pctFill = document.getElementById('resultsPctFill');
  results.classList.add('show');
  setTimeout(() => { pctFill.style.width = porcentaje + '%'; }, 100);
}

/* ── Reintentar ── */
retryBtn.addEventListener('click', () => {
  document.getElementById('quizCard').style.display = '';
  optionsDiv.style.display   = '';
  feedback.style.display     = '';
  nextBtn.style.display      = '';
  results.classList.remove('show');

  quizSetup.style.display = '';
  quizZone.classList.remove('active');

  levelCards.forEach(c => c.classList.remove('selected'));
  catBtns.forEach(b    => b.classList.remove('selected'));
  startBtn.classList.remove('visible');
  nivelSeleccionado     = null;
  categoriaSeleccionada = null;
});
