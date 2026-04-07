/* ============================================================
   RAÍCES SV — quiz.js
   Quiz interactivo de cultura salvadoreña
   ============================================================ */

// ── Base de preguntas por categoría ──────────────────────────
const PREGUNTAS = [
  // HISTORIA
  {
    cat: 'historia',
    pregunta: '¿Cómo se llamaba el territorio salvadoreño antes de la conquista española?',
    opciones: ['Quetzaltenango', 'Cuscatlán', 'Tikal', 'Copán'],
    correcta: 1,
    explicacion: 'El territorio salvadoreño era conocido como Cuscatlán, nombre Pipil que significa "lugar de las joyas y riquezas".'
  },
  {
    cat: 'historia',
    pregunta: '¿Quién lideró el primer grito de independencia en El Salvador en 1811?',
    opciones: ['Pedro de Alvarado', 'Atlacatl', 'José Matías Delgado', 'Anastasio Aquino'],
    correcta: 2,
    explicacion: 'El sacerdote José Matías Delgado, conocido como "Padre de la Patria Salvadoreña", lideró el primer grito junto a Manuel Aguilar.'
  },
  {
    cat: 'historia',
    pregunta: '¿En qué año se firmaron los Acuerdos de Paz que pusieron fin a la guerra civil salvadoreña?',
    opciones: ['1989', '1990', '1992', '1994'],
    correcta: 2,
    explicacion: 'El 16 de enero de 1992 se firmaron los Acuerdos de Paz de Chapultepec en México, poniendo fin a 12 años de conflicto.'
  },
  {
    cat: 'historia',
    pregunta: '¿Qué pueblo indígena era el más numeroso en El Salvador al llegar los españoles?',
    opciones: ['Los Mayas', 'Los Lencas', 'Los Pipiles', 'Los Aztecas'],
    correcta: 2,
    explicacion: 'Los Pipiles, de origen nahua emparentados con los aztecas, eran el grupo indígena más numeroso del territorio salvadoreño.'
  },
  {
    cat: 'historia',
    pregunta: '¿Qué cultivo fue la base de la economía colonial salvadoreña?',
    opciones: ['Café', 'Caña de azúcar', 'Añil', 'Cacao'],
    correcta: 2,
    explicacion: 'El añil (índigo), un tinte azul muy valorado en Europa, fue el principal producto de exportación durante la época colonial.'
  },
  {
    cat: 'historia',
    pregunta: '¿Cuándo se proclamó la Independencia de Centroamérica?',
    opciones: ['15 de julio de 1821', '15 de septiembre de 1821', '4 de julio de 1821', '18 de febrero de 1821'],
    correcta: 1,
    explicacion: 'El 15 de septiembre de 1821 se proclamó la Independencia de Centroamérica, fecha que se celebra como Día de la Independencia.'
  },
  {
    cat: 'historia',
    pregunta: '¿Quién fue el conquistador español que intentó dominar Cuscatlán en 1524?',
    opciones: ['Hernán Cortés', 'Francisco Pizarro', 'Pedro de Alvarado', 'Diego de Almagro'],
    correcta: 2,
    explicacion: 'Pedro de Alvarado, enviado por Hernán Cortés, lideró la conquista de Cuscatlán y fue herido por los Pipiles en la primera campaña.'
  },

  // GASTRONOMÍA
  {
    cat: 'gastronomia',
    pregunta: '¿Cuál es el plato nacional de El Salvador?',
    opciones: ['Las Baleadas', 'Las pupusas', 'La sopa de pata', 'El chumpe navideño'],
    correcta: 1,
    explicacion: 'Las pupusas son el plato nacional de El Salvador, declaradas Patrimonio Cultural Intangible por la UNESCO.'
  },
  {
    cat: 'gastronomia',
    pregunta: '¿Qué significa la palabra "pupusa" en náhuatl?',
    opciones: ['Tortilla rellena', 'Cosa inflada o abultada', 'Pan de maíz', 'Comida sagrada'],
    correcta: 1,
    explicacion: 'La palabra "pupusa" proviene del náhuatl "pupushawa", que significa "cosa inflada o abultada".'
  },
  {
    cat: 'gastronomia',
    pregunta: '¿En qué ciudad es famosa la Semita Papalona?',
    opciones: ['San Salvador', 'Santa Ana', 'Cojutepeque', 'San Miguel'],
    correcta: 2,
    explicacion: 'La Semita Papalona es originaria de Cojutepeque, Cuscatlán, donde se produce artesanalmente en hornos de leña.'
  },
  {
    cat: 'gastronomia',
    pregunta: '¿Con qué siempre se acompañan las pupusas?',
    opciones: ['Con arroz y frijoles', 'Con curtido y salsa de tomate', 'Con crema y queso', 'Con salsa verde'],
    correcta: 1,
    explicacion: 'Las pupusas se sirven siempre acompañadas de curtido (repollo encurtido) y salsa de tomate casera.'
  },
  {
    cat: 'gastronomia',
    pregunta: '¿Cuál es la bebida ancestral salvadoreña hecha de maíz tierno?',
    opciones: ['El horchata', 'El tamarindo', 'El atol de elote', 'El fresco de cebada'],
    correcta: 2,
    explicacion: 'El atol de elote es una bebida caliente de origen prehispánico elaborada con maíz tierno, leche, azúcar y canela.'
  },
  {
    cat: 'gastronomia',
    pregunta: '¿Qué se usa para envolver los tamales salvadoreños?',
    opciones: ['Hojas de maíz', 'Hojas de plátano', 'Papel aluminio', 'Hojas de maguey'],
    correcta: 1,
    explicacion: 'A diferencia de otros países, los tamales salvadoreños se envuelven en hojas de plátano, lo que les da un sabor y aroma únicos.'
  },

  // SITIOS CULTURALES
  {
    cat: 'sitios',
    pregunta: '¿Qué significa el nombre "Tazumal" en lengua quiché?',
    opciones: ['Lugar de las joyas', 'Lugar donde se quemaron las víctimas', 'Montaña sagrada', 'Templo del sol'],
    correcta: 1,
    explicacion: 'Tazumal significa "lugar donde se quemaron las víctimas" en lengua quiché.'
  },
  {
    cat: 'sitios',
    pregunta: '¿En qué año fue declarado Joya de Cerén Patrimonio de la Humanidad por la UNESCO?',
    opciones: ['1987', '1990', '1993', '1995'],
    correcta: 2,
    explicacion: 'Joya de Cerén fue declarado Patrimonio de la Humanidad por la UNESCO en 1993, siendo el único sitio salvadoreño con esta distinción.'
  },
  {
    cat: 'sitios',
    pregunta: '¿Qué volcán sepultó el asentamiento maya de Joya de Cerén?',
    opciones: ['Volcán Santa Ana', 'Volcán San Miguel', 'Volcán Loma Caldera', 'Volcán Izalco'],
    correcta: 2,
    explicacion: 'El volcán Loma Caldera sepultó el asentamiento de Joya de Cerén alrededor del año 590 d.C.'
  },
  {
    cat: 'sitios',
    pregunta: '¿Qué significa "Suchitoto" en náhuatl?',
    opciones: ['Lugar del agua', 'Lugar del pájaro flor', 'Ciudad de piedra', 'Valle verde'],
    correcta: 1,
    explicacion: 'Suchitoto significa "lugar del pájaro flor" en náhuatl (suchi = flor, toto = pájaro).'
  },
  {
    cat: 'sitios',
    pregunta: '¿Quién esculpió originalmente el monumento al Salvador del Mundo?',
    opciones: ['Fernando Llort', 'Miguel Martínez', 'Carlos Azócar', 'Benito Juárez'],
    correcta: 1,
    explicacion: 'La estatua original fue elaborada por el escultor español Miguel Martínez en madera de cedro, inaugurada en 1942.'
  },
  {
    cat: 'sitios',
    pregunta: '¿Cómo se llama popularmente a Joya de Cerén?',
    opciones: ['La Pompeya de América', 'El Machu Picchu salvadoreño', 'El Templo Maya', 'La Ciudad Perdida'],
    correcta: 0,
    explicacion: 'Joya de Cerén es conocida como "La Pompeya de América" por haber sido sepultada por ceniza volcánica similar a la ciudad italiana.'
  },

  // LEYENDAS
  {
    cat: 'leyendas',
    pregunta: '¿A quiénes persigue principalmente la Siguanaba?',
    opciones: ['A los niños desobedientes', 'A los hombres infieles', 'A las mujeres solteras', 'A los ladrones'],
    correcta: 1,
    explicacion: 'La Siguanaba persigue a los hombres infieles o irresponsables, haciéndolos caminar en círculos hasta enloquecerlos.'
  },
  {
    cat: 'leyendas',
    pregunta: '¿Cuál es la característica física más peculiar del Cipitío?',
    opciones: ['Tiene dos cabezas', 'Sus pies están al revés', 'Es completamente azul', 'No tiene sombra'],
    correcta: 1,
    explicacion: 'El Cipitío tiene los pies al revés: los talones hacia adelante y los dedos hacia atrás, por eso sus huellas son difíciles de rastrear.'
  },
  {
    cat: 'leyendas',
    pregunta: '¿Cuál es el Cadejo que protege a los caminantes nocturnos?',
    opciones: ['El Cadejo negro', 'El Cadejo rojo', 'El Cadejo blanco', 'El Cadejo gris'],
    correcta: 2,
    explicacion: 'El Cadejo blanco es el guardián que protege a los caminantes honestos, mientras el negro persigue a quienes andan haciendo el mal.'
  },
  {
    cat: 'leyendas',
    pregunta: '¿Qué castigo recibió la Siguanaba según la leyenda?',
    opciones: ['Fue transformada en árbol', 'Fue condenada a vagar eternamente sin ver su rostro', 'Fue encerrada en una cueva', 'Fue convertida en piedra'],
    correcta: 1,
    explicacion: 'El dios Tlaloc la condenó a vagar eternamente por bosques y ríos, sin poder ver su propio rostro, como castigo por abandonar a su hijo.'
  },
  {
    cat: 'leyendas',
    pregunta: '¿Dónde aparece con más frecuencia la Llorona?',
    opciones: ['En los mercados', 'A orillas de ríos y lagunas', 'En las iglesias', 'En los cementerios de día'],
    correcta: 1,
    explicacion: 'La Llorona aparece especialmente cerca de ríos y lagunas, donde lanza su llanto buscando a sus hijos ahogados.'
  },

  // EVENTOS
  {
    cat: 'eventos',
    pregunta: '¿Cuándo se celebran las Fiestas Agostinas en El Salvador?',
    opciones: ['En julio', 'Durante todo agosto', 'En septiembre', 'En diciembre'],
    correcta: 1,
    explicacion: 'Las Fiestas Agostinas se celebran durante todo el mes de agosto en honor al Divino Salvador del Mundo, patrón de la nación.'
  },
  {
    cat: 'eventos',
    pregunta: '¿Qué se celebra el 15 de septiembre en El Salvador?',
    opciones: ['El Día de la Madre', 'El Día de la Independencia', 'Las Fiestas Agostinas', 'El Día del Trabajador'],
    correcta: 1,
    explicacion: 'El 15 de septiembre se celebra el Día de la Independencia de Centroamérica, proclamada en 1821.'
  },
  {
    cat: 'eventos',
    pregunta: '¿Qué es "La Bajada del Salvador" durante las Fiestas Agostinas?',
    opciones: ['Un concurso de baile', 'Una procesión con la imagen del Salvador del Mundo', 'Un festival gastronómico', 'Una competencia deportiva'],
    correcta: 1,
    explicacion: 'La Bajada del Salvador es la procesión principal de las Fiestas Agostinas, que recorre las calles de San Salvador con la imagen del patrono.'
  },
  {
    cat: 'eventos',
    pregunta: '¿Qué comida es tradicional en el Día de los Difuntos en El Salvador?',
    opciones: ['Pupusas', 'Tamales', 'El fiambre', 'Sopa de pata'],
    correcta: 2,
    explicacion: 'El fiambre es la comida tradicional del Día de los Difuntos: una ensalada fría con embutidos, verduras, aceitunas y alcaparras.'
  },
  {
    cat: 'eventos',
    pregunta: '¿Del 16 al 24 de diciembre, ¿qué tradición navideña se celebra en El Salvador?',
    opciones: ['Los Aguinaldos', 'Las Posadas', 'La Bajada', 'Los Villancicos'],
    correcta: 1,
    explicacion: 'Las Posadas se celebran del 16 al 24 de diciembre y representan la búsqueda de José y María de alojamiento para el nacimiento de Jesús.'
  }
];

// ── Estado del quiz ────────────────────────────────────────
let preguntasActivas = [];
let indice = 0;
let puntaje = 0;
let respondida = false;
let categoriaSeleccionada = null;

// ── Elementos DOM ──────────────────────────────────────────
const catBtns    = document.querySelectorAll('.cat-btn');
const startBtn   = document.getElementById('startBtn');
const quizZone   = document.getElementById('quizZone');
const progFill   = document.getElementById('progressFill');
const qCounter   = document.getElementById('questionCounter');
const scoreLive  = document.getElementById('scoreLive');
const qCategory  = document.getElementById('qCategory');
const qText      = document.getElementById('qText');
const optionsDiv = document.getElementById('quizOptions');
const feedback   = document.getElementById('quizFeedback');
const nextBtn    = document.getElementById('nextBtn');
const results    = document.getElementById('quizResults');
const retryBtn   = document.getElementById('retryBtn');

// ── Selección de categoría ─────────────────────────────────
catBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    catBtns.forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    categoriaSeleccionada = btn.dataset.cat;
    startBtn.classList.add('visible');
  });
});

// ── Inicio del quiz ────────────────────────────────────────
startBtn.addEventListener('click', () => {
  // Filtrar preguntas por categoría
  let pool = categoriaSeleccionada === 'todas'
    ? [...PREGUNTAS]
    : PREGUNTAS.filter(p => p.cat === categoriaSeleccionada);

  // Mezclar y tomar hasta 10 preguntas
  pool = pool.sort(() => Math.random() - 0.5).slice(0, Math.min(10, pool.length));
  preguntasActivas = pool;
  indice = 0;
  puntaje = 0;

  // Ocultar selector y mostrar quiz
  document.querySelector('.quiz-category-section').style.display = 'none';
  quizZone.classList.add('active');
  results.classList.remove('show');
  nextBtn.classList.remove('show');

  mostrarPregunta();
});

// ── Mostrar pregunta ───────────────────────────────────────
function mostrarPregunta() {
  respondida = false;
  feedback.classList.remove('show', 'correct-fb', 'wrong-fb');
  nextBtn.classList.remove('show');

  const total = preguntasActivas.length;
  const q = preguntasActivas[indice];

  // Progreso
  const pct = (indice / total) * 100;
  progFill.style.width = pct + '%';
  qCounter.textContent = `Pregunta ${indice + 1} de ${total}`;
  scoreLive.textContent = `Puntos: ${puntaje}`;

  // Etiqueta de categoría
  const catLabels = {
    historia: '📜 Historia',
    gastronomia: '🍽 Gastronomía',
    sitios: '🏛 Sitios Culturales',
    leyendas: '👻 Leyendas',
    eventos: '🎉 Eventos'
  };
  qCategory.textContent = catLabels[q.cat] || q.cat;
  qText.textContent = q.pregunta;

  // Generar opciones
  optionsDiv.innerHTML = '';
  // Mezclar opciones manteniendo referencia a correcta
  const indices = [0, 1, 2, 3].sort(() => Math.random() - 0.5);
  const correctaMezclada = indices.indexOf(q.correcta);

  indices.forEach((origIdx, newIdx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = q.opciones[origIdx];
    btn.dataset.original = origIdx;
    btn.dataset.new = newIdx;
    btn.addEventListener('click', () => seleccionarRespuesta(btn, newIdx, correctaMezclada, q));
    optionsDiv.appendChild(btn);
  });
}

// ── Seleccionar respuesta ──────────────────────────────────
function seleccionarRespuesta(btn, newIdx, correctaMezclada, q) {
  if (respondida) return;
  respondida = true;

  const opciones = optionsDiv.querySelectorAll('.quiz-option');
  opciones.forEach(o => o.disabled = true);

  const esCorrecta = newIdx === correctaMezclada;

  if (esCorrecta) {
    btn.classList.add('correct');
    puntaje += 10;
    feedback.className = 'quiz-feedback show correct-fb';
    feedback.innerHTML = `<strong>✅ ¡Correcto! +10 puntos</strong>${q.explicacion}`;
  } else {
    btn.classList.add('wrong');
    opciones[correctaMezclada].classList.add('correct');
    feedback.className = 'quiz-feedback show wrong-fb';
    feedback.innerHTML = `<strong>❌ Incorrecto</strong>${q.explicacion}`;
  }

  scoreLive.textContent = `Puntos: ${puntaje}`;
  nextBtn.classList.add('show');
  nextBtn.textContent = indice + 1 < preguntasActivas.length ? 'Siguiente pregunta →' : '🏆 Ver resultados';
}

// ── Siguiente pregunta ────────────────────────────────────
nextBtn.addEventListener('click', () => {
  indice++;
  if (indice < preguntasActivas.length) {
    mostrarPregunta();
  } else {
    mostrarResultados();
  }
});

// ── Mostrar resultados ─────────────────────────────────────
function mostrarResultados() {
  progFill.style.width = '100%';
  document.getElementById('quizCard').style.display = 'none';
  optionsDiv.style.display = 'none';
  feedback.style.display = 'none';
  nextBtn.style.display = 'none';

  const total = preguntasActivas.length;
  const maximo = total * 10;
  const porcentaje = Math.round((puntaje / maximo) * 100);

  let emoji, titulo, mensaje;
  if (porcentaje === 100) {
    emoji = '🏆'; titulo = '¡Perfecto!'; mensaje = 'Eres un verdadero experto en la cultura salvadoreña. ¡Extraordinario dominio de las Raíces SV!';
  } else if (porcentaje >= 80) {
    emoji = '🌟'; titulo = '¡Excelente!'; mensaje = 'Conoces muy bien la cultura de El Salvador. ¡Sigue explorando para llegar al 100%!';
  } else if (porcentaje >= 60) {
    emoji = '👍'; titulo = '¡Bien hecho!'; mensaje = 'Tienes buen conocimiento de las Raíces SV. Te recomendamos explorar más las secciones informativas.';
  } else if (porcentaje >= 40) {
    emoji = '📚'; titulo = 'Sigue aprendiendo'; mensaje = 'Hay mucho más por descubrir. Visita las páginas de Historia, Leyendas y Gastronomía para mejorar.';
  } else {
    emoji = '🌱'; titulo = '¡Apenas empezando!'; mensaje = 'El Salvador tiene una cultura riquísima por descubrir. ¡Explora todas nuestras secciones y vuelve a intentarlo!';
  }

  document.getElementById('resultsEmoji').textContent = emoji;
  document.getElementById('resultsTitle').textContent = titulo;
  document.getElementById('resultsScore').textContent = `${puntaje} / ${maximo} pts (${porcentaje}%)`;
  document.getElementById('resultsMessage').textContent = mensaje;
  results.classList.add('show');
}

// ── Reintentar ─────────────────────────────────────────────
retryBtn.addEventListener('click', () => {
  // Resetear UI
  document.getElementById('quizCard').style.display = '';
  optionsDiv.style.display = '';
  feedback.style.display = '';
  results.classList.remove('show');
  document.querySelector('.quiz-category-section').style.display = '';
  quizZone.classList.remove('active');
  catBtns.forEach(b => b.classList.remove('selected'));
  startBtn.classList.remove('visible');
  categoriaSeleccionada = null;
});
