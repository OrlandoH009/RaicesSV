/* ============================================================
   RAÍCES SV — recetas-videos.js
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
    id: 'Bm9pcy9BF-g',
    titulo: 'Cómo hacer Pupusas',
    caption: 'Aprende la técnica tradicional para palmear y rellenar pupusas como en El Salvador.'
  },
  tamales: {
    id: 'VsO66Jixc9o',
    titulo: 'Cómo hacer Tamales Salvadoreños',
    caption: 'La receta auténtica paso a paso, envueltos en hoja de plátano como manda la tradición.'
  },
  sopa: {
    id: 'j9e19nkY1D8',
    titulo: 'Cómo hacer Sopa de Pata',
    caption: 'El caldo más representativo de la cocina salvadoreña, explicado de principio a fin.'
  },
  yuca: {
    id: '1K0BcYSkPzY',
    titulo: 'Yuca Frita con Chicharrón',
    caption: 'El antojo callejero favorito de El Salvador, con su curtido y salsa casera.'
  },
  atol: {
    id: 'az19xws_li0',
    titulo: 'Atol de Elote Salvadoreño',
    caption: 'El secreto para un atol espeso y sin grumos, tal como se prepara en casa.'
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
    caption: 'El caldo dominical de las familias salvadoreñas, con verduras de la milpa.'
  },
  panesconpollo: {
    id: 'zrfPoutMmDM',
    titulo: 'Panes con Pollo Salvadoreños',
    caption: 'El sándwich festivo infaltable en cumpleaños y celebraciones familiares.'
  },
  riguas: {
    id: 'dVDxdoVDpdE',
    titulo: 'Riguas Salvadoreñas',
    caption: 'Tortitas de elote tierno cocinadas sobre comal, un antojo sencillo y ancestral.'
  },
  empanadasplatano: {
    id: 'g6rj_RO0ZRE',
    titulo: 'Empanadas de Plátano',
    caption: 'El postre callejero de plátano maduro con relleno de leche, dorado y crujiente.'
  },
  mariscada: {
    id: 'gI3vr18NhsE',
    titulo: 'Mariscada Salvadoreña',
    caption: 'El sabor del Pacífico salvadoreño en un caldo cremoso lleno de mariscos frescos.'
  },
  casamiento: {
    id: 'RYhzrOUGEo8',
    titulo: 'Casamiento (Arroz con Frijoles)',
    caption: 'La unión perfecta entre el arroz y el frijol, un clásico de cada mesa salvadoreña.'
  },
  enchiladas: {
    id: '59iiL_jWWAQ',
    titulo: 'Enchiladas Salvadoreñas',
    caption: 'Tortillas fritas y crujientes con carne, curtido y huevo duro — nada que ver con las mexicanas.'
  },
  nuegadosyuca: {
    id: 'I6UFOiSyimU',
    titulo: 'Nuégados de Yuca y Chilate',
    caption: 'Bolitas doradas de yuca bañadas en miel de panela, el postre compañero del chilate.'
  },
  chilateconnuegados: {
    id: 'I6UFOiSyimU',
    titulo: 'Chilate con Nuégados',
    caption: 'La bebida de maíz tostado más querida del país, siempre acompañada de nuégados.'
  },
  torrejas: {
    id: 'Bi9hncOmFKo',
    titulo: 'Torrejas Salvadoreñas',
    caption: 'El dulce infaltable de la Semana Santa, pan bañado en huevo y miel de panela.'
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

  container.style.display = '';
  if (iframe) iframe.src = `https://www.youtube.com/embed/${data.id}`;
  if (caption) caption.textContent = data.caption;
  if (label) label.textContent = `🎥 Video Tutorial: ${data.titulo}`;
}