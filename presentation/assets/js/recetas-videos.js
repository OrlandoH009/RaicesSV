/* ============================================================
  Salvadorean Roots — recetas-videos.js
   Mapa de video-tutoriales de YouTube por platillo.
   Se usa en recetas.html para actualizar el video del tutorial
   según la receta que el usuario seleccione en el modal.

   Cómo usarlo (ver integración en recetas-manager.js):
     const data = RECETAS_VIDEOS[slug];
     iframe.src = `https://www.youtube.com/embed/${data.id}`;
     titulo.textContent = data.titulo;
     caption.textContent = data.caption;

   El "slug" es el mismo id que usan las tarjetas/tabs, p.ej.
   "pupusas", "tamales", "sopa", "yuca", etc.
   ============================================================ */

const RECETAS_VIDEOS = {
  pupusas: {
    id: 'CIi9gnXlJWs',
    titulo: 'Cómo hacer Pupusas',
    caption: 'Aprende la técnica tradicional para palmear y rellenar pupusas como en El Salvador.',
    tituloEn: 'How to Make Pupusas',
    captionEn: 'Learn the traditional technique for shaping and filling pupusas just like in El Salvador.'
  },
  tamales: {
    id: 'VsO66Jixc9o',
    titulo: 'Cómo hacer Tamales Salvadoreños',
    caption: 'La receta auténtica paso a paso, envueltos en hoja de plátano como manda la tradición.',
    tituloEn: 'How to Make Salvadoran Tamales',
    captionEn: 'The authentic step-by-step recipe, wrapped in banana leaves the traditional way.'
  },
  sopa: {
    id: 'j9e19nkY1D8',
    titulo: 'Cómo hacer Sopa de Pata',
    caption: 'El caldo más representativo de la cocina salvadoreña, explicado de principio a fin.',
    tituloEn: 'How to Make Sopa de Pata',
    captionEn: 'The most iconic soup of Salvadoran cuisine, explained from start to finish.'
  },
  yuca: {
    id: '1K0BcYSkPzY',
    titulo: 'Yuca Frita con Chicharrón',
    caption: 'El antojo callejero favorito de El Salvador, con su curtido y salsa casera.',
    tituloEn: 'Fried Yuca with Chicharrón',
    captionEn: "El Salvador's favorite street snack, with curtido and homemade sauce."
  },
  atol: {
    id: 'az19xws_li0',
    titulo: 'Atol de Elote Salvadoreño',
    caption: 'El secreto para un atol espeso y sin grumos, tal como se prepara en casa.',
    tituloEn: 'Salvadoran Atol de Elote',
    captionEn: 'The secret to a thick, lump-free atol, just like it is made at home.'
  },
  /* "semita" no tiene receta correspondiente en recetas-manager.js todavía.
     Si se agrega esa receta al objeto recetasData, descomenta esto: */
  // semita: {
  //   id: 'XZs0mcqYTyk',
  //   titulo: 'Semita Alta Salvadoreña',
  //   caption: 'El pan dulce más querido del país, con su relleno tradicional de dulce de panela.'
  // },
  gallinaindia: {
    id: 'vg5RIu_BSmA',
    titulo: 'Sopa de Gallina India',
    caption: 'El caldo dominical de las familias salvadoreñas, con verduras de la milpa.',
    tituloEn: 'Sopa de Gallina India (Free-range Hen Soup)',
    captionEn: 'The Sunday soup of Salvadoran families, made with vegetables from the milpa.'
  },
  panesconpollo: {
    id: 'zrfPoutMmDM',
    titulo: 'Panes con Pollo Salvadoreños',
    caption: 'El sándwich festivo infaltable en cumpleaños y celebraciones familiares.',
    tituloEn: 'Salvadoran Panes con Pollo',
    captionEn: 'The festive sandwich that never misses a birthday or family celebration.'
  },
  riguas: {
    id: 'dVDxdoVDpdE',
    titulo: 'Riguas Salvadoreñas',
    caption: 'Tortitas de elote tierno cocinadas sobre comal, un antojo sencillo y ancestral.',
    tituloEn: 'Salvadoran Riguas',
    captionEn: 'Tender sweet-corn patties cooked on a comal, a simple and ancestral treat.'
  },
  empanadasplatano: {
    id: 'g6rj_RO0ZRE',
    titulo: 'Empanadas de Plátano',
    caption: 'El postre callejero de plátano maduro con relleno de leche, dorado y crujiente.',
    tituloEn: 'Plantain Empanadas',
    captionEn: 'The ripe plantain street dessert with a milk filling, golden and crispy.'
  },
  mariscada: {
    id: 'gI3vr18NhsE',
    titulo: 'Mariscada Salvadoreña',
    caption: 'El sabor del Pacífico salvadoreño en un caldo cremoso lleno de mariscos frescos.',
    tituloEn: 'Salvadoran Mariscada',
    captionEn: 'The taste of the Salvadoran Pacific in a creamy broth full of fresh seafood.'
  },
  casamiento: {
    id: 'RYhzrOUGEo8',
    titulo: 'Casamiento (Arroz con Frijoles)',
    caption: 'La unión perfecta entre el arroz y el frijol, un clásico de cada mesa salvadoreña.',
    tituloEn: 'Casamiento (Rice and Beans)',
    captionEn: 'The perfect union of rice and beans, a classic on every Salvadoran table.'
  },
  enchiladas: {
    id: '59iiL_jWWAQ',
    titulo: 'Enchiladas Salvadoreñas',
    caption: 'Tortillas fritas y crujientes con carne, curtido y huevo duro — nada que ver con las mexicanas.',
    tituloEn: 'Salvadoran Enchiladas',
    captionEn: 'Crispy fried tortillas topped with meat, curtido and hard-boiled egg — nothing like the Mexican ones.'
  },
  nuegadosyuca: {
    id: 'I6UFOiSyimU',
    titulo: 'Nuégados de Yuca y Chilate',
    caption: 'Bolitas doradas de yuca bañadas en miel de panela, el postre compañero del chilate.',
    tituloEn: 'Yuca Nuégados and Chilate',
    captionEn: 'Golden yuca fritters bathed in panela honey, the perfect companion to chilate.'
  },
  chilateconnuegados: {
    id: 'I6UFOiSyimU',
    titulo: 'Chilate con Nuégados',
    caption: 'La bebida de maíz tostado más querida del país, siempre acompañada de nuégados.',
    tituloEn: 'Chilate with Nuégados',
    captionEn: "The country's most beloved toasted-corn drink, always served with nuégados."
  },
  torrejas: {
    id: 'Bi9hncOmFKo',
    titulo: 'Torrejas Salvadoreñas',
    caption: 'El dulce infaltable de la Semana Santa, pan bañado en huevo y miel de panela.',
    tituloEn: 'Salvadoran Torrejas',
    captionEn: 'The must-have Holy Week sweet: bread dipped in egg and bathed in panela honey.'
  }
};

/* Utilidad para actualizar el bloque de video dentro del modal de receta.
   `container` es el elemento que envuelve .recipe-video__frame iframe, título y caption. */
function actualizarVideoReceta(slug, container) {
  const data = RECETAS_VIDEOS[slug];
  if (!container) return;

  const iframe = container.querySelector('iframe');
  const caption = container.querySelector('.recipe-video__caption');
  const label = container.querySelector('.recipe-video__label');

  if (!data) {
    // No hay video para este platillo: ocultar el bloque en vez de mostrar uno incorrecto
    container.style.display = 'none';
    return;
  }

  const isEnglish = window.SRi18n && window.SRi18n.getLang() === 'en';
  const titulo = isEnglish ? data.tituloEn : data.titulo;
  const texto = isEnglish ? data.captionEn : data.caption;

  container.style.display = '';
  const src = `https://www.youtube.com/embed/${data.id}`;
  if (iframe && iframe.src !== src) iframe.src = src;
  if (caption) caption.textContent = texto;
  if (label) label.textContent = `🎥 ${isEnglish ? 'Video Tutorial' : 'Video tutorial'}: ${titulo}`;
}
