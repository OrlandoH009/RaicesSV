// ============================================================
// Imagen por defecto (cuando la receta no tiene imagen)
// ============================================================
const DEFAULT_RECIPE_IMAGE = '../assets/media/publications/default-publication.svg';

// ============================================================
// Cerrar la hoja de filtros (celular) al elegir una categoría o
// buscar una receta, para que se vea el resultado filtrado.
// ============================================================
function cerrarRecetasFiltersSheet() {
  document.getElementById('recipeFiltersSheet')?.classList.remove('is-open');
  document.getElementById('filtersSheetOverlay')?.classList.remove('is-open');
  document.getElementById('filtersFabBtn')?.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('filters-open');
  document.body.style.overflow = '';
}

// ============================================================
// Base de datos local de recetas (ESPAÑOL)
// ============================================================
const recetasData = {
  pupusas: {
    titulo: "Pupusas Revueltas",
    categoria: "Plato insignia",
    porciones: "4-6 personas",
    tiempo: "45 min",
    dificultad: "Media",
    imagen: "../assets/media/recetas/Pupusas-Revueltas.webp",
    ingredientes: [
      "2 tazas de masa de maíz (o arroz)",
      "1½ tazas de agua tibia",
      "1 taza de chicharrón molido salvadoreño",
      "1 taza de frijoles negros o rojos refritos",
      "1½ tazas de queso quesillo o mozzarella rallado",
      "Aceite vegetal para las manos"
    ],
    pasos: [
      "En un tazón, mezcle la masa de maíz con el agua tibia gradualmente hasta obtener una textura suave y moldeable.",
      "Combine el queso, el chicharrón y los frijoles en un recipiente para crear el relleno revuelto.",
      "Tome una bola de masa del tamaño de una pelota de golf y haga una cavidad en el centro en forma de cuenco.",
      "Coloque una cucharada generosa de relleno en la cavidad y cierre la masa envolviéndolo por completo.",
      "Palmee la masa suavemente de mano a mano, girándola para formar un disco plano sin que se salga el relleno.",
      "Cocine en un comal o sartén bien caliente durante 3-4 minutos por lado hasta que estén doradas."
    ]
  },
  yuca: {
    titulo: "Yuca Frita con Chicharrón",
    categoria: "Antojo callejero",
    porciones: "4 porciones",
    tiempo: "40 min",
    dificultad: "Fácil",
    imagen: "../assets/media/recetas/yuca-frita.webp",
    ingredientes: [
      "2 libras de yuca grande",
      "1 libra de chicharrón de cerdo crujiente",
      "Curtido salvadoreño preparado con repollo y vinagre",
      "Salsa de tomate casera",
      "Aceite abundante para freír",
      "Sal al gusto"
    ],
    pasos: [
      "Pele la yuca y córtela en trozos medianos removiendo la fibra del centro.",
      "Hierva la yuca en agua con sal hasta que esté suave pero firme.",
      "Escurra el agua por completo y deje enfriar los trozos.",
      "Caliente abundante aceite en una sartén profunda y fría la yuca hasta que adquiera un color dorado y exterior crujiente.",
      "Sirva una cama de yuca frita, añada una porción generosa de curtido encima.",
      "Corone el plato con los chicharrones calientes y bañe con salsa de tomate tradicional."
    ]
  },
  sopa: {
    titulo: "Sopa de Pata",
    categoria: "Plato de fin de semana",
    porciones: "6 porciones",
    tiempo: "3 horas",
    dificultad: "Alta",
    imagen: "../assets/media/recetas/Sopa de Pata.jpg",
    ingredientes: [
      "2 libras de pata de res limpia",
      "1 libra de tripa de res (mondongo)",
      "Yuca, güisquil, elote y plátano verde en trozos",
      "Hojas de chipilín fresco",
      "Cebolla, ajo, chile verde y achiote",
      "Limón y cilantro para servir"
    ],
    pasos: [
      "Ablande la pata y la tripa en una olla grande con suficiente agua, ajo y cebolla durante aproximadamente 2 horas.",
      "Cuando la carne esté suave, retire la tripa, córtela en trozos pequeños y regrésela al caldo.",
      "Incorpore el achiote para darle color junto con el elote y la yuca, que requieren más cocción.",
      "Pasados 15 minutos, añada el güisquil, el plátano verde y las ramitas de chipilín.",
      "Deje hervir a fuego lento hasta que todas las verduras estén completamente tiernas.",
      "Sirva caliente acompañado de cebolla picada, cilantro y unas gotas de limón."
    ]
  },
  gallinaindia: {
    titulo: "Sopa de Gallina India",
    categoria: "Plato de fin de semana",
    porciones: "6 porciones",
    tiempo: "2 horas",
    dificultad: "Media",
    imagen: "../assets/media/recetas/Sopa-de-Gallina-India.webp",
    ingredientes: [
      "1 gallina india entera (criolla), en piezas",
      "Papas y güisquil en trozos grandes",
      "Elote tierno partido en rodajas",
      "Cebolla, ajo, tomate y hierbabuena",
      "Achiote y consomé de gallina",
      "Arroz blanco para acompañar"
    ],
    pasos: [
      "Lave bien las piezas de gallina y cocínelas en una olla grande con agua, ajo y cebolla hasta que estén tiernas.",
      "Retire la espuma que suba a la superficie para lograr un caldo limpio y dorado.",
      "Licúe el tomate con un poco de achiote y agréguelo al caldo para darle color y sabor de fondo.",
      "Incorpore las papas y el elote, que necesitan más tiempo de cocción.",
      "Añada el güisquil y deje hervir hasta que todas las verduras estén suaves.",
      "Al final agregue hojas de hierbabuena fresca y sirva con arroz blanco aparte."
    ]
  },
  panesconpollo: {
    titulo: "Panes con Pollo",
    categoria: "Comida de celebración",
    porciones: "8 panes",
    tiempo: "1 hora 30 min",
    dificultad: "Media",
    imagen: "../assets/media/recetas/Panes-con-Pollo.webp",
    ingredientes: [
      "8 panes franceses salvadoreños (birote)",
      "1 gallina o pollo entero en piezas",
      "Recado rojo (achiote, especias)",
      "Verduras encurtidas: rábano, repollo, chile",
      "Tomate, cebolla, mostaza y mayonesa",
      "Lechuga y hojas de hierbabuena"
    ],
    pasos: [
      "Cocine el pollo con el recado rojo, ajo y cebolla hasta que la carne esté suave y jugosa.",
      "Desmenuce el pollo y resérvelo bañado en un poco de su propio caldo sazonado.",
      "Corte los panes por la mitad y unte generosamente con mostaza y mayonesa.",
      "Coloque una cama de lechuga y agregue rodajas de tomate fresco.",
      "Rellene con abundante pollo desmenuzado y su salsa de recado.",
      "Corone con verduras encurtidas y una ramita de hierbabuena antes de cerrar el pan."
    ]
  },
  tamales: {
    titulo: "Tamales Salvadoreños",
    categoria: "Tradición navideña",
    porciones: "12-15 tamales",
    tiempo: "2 horas",
    dificultad: "Alta",
    imagen: "../assets/media/recetas/tamales-de-pollo.webp",
    ingredientes: [
      "1 libra de masa de maíz nixtamalizado",
      "1 litro de caldo de pollo concentrado",
      "½ taza de manteca de cerdo o aceite",
      "Hojas de plátano previamente pasadas por agua hirviendo",
      "Pollo desmenuzado cocido en recaudo",
      "Papas, aceitunas y alcaparras para el adorno"
    ],
    pasos: [
      "Cocine la masa junto con el caldo de pollo y la manteca a fuego medio, moviendo constantemente hasta que espese uniformemente.",
      "Limpie y corte las hojas de plátano en rectángulos de aproximadamente 30x30 cm.",
      "Coloque una cucharada grande de masa caliente en el centro de la hoja.",
      "Agregue el pollo con recaudo, una tira de papa, una aceituna y alcaparras.",
      "Envuelva doblando los extremos firmemente para evitar filtraciones de agua.",
      "Cocine al vapor en una olla grande con base de hojas durante 1 hora y 15 minutos."
    ]
  },
  atol: {
    titulo: "Atol de Elote",
    categoria: "Bebida ancestral",
    porciones: "5 tazas",
    tiempo: "30 min",
    dificultad: "Fácil",
    imagen: "../assets/media/recetas/atol-elote.jpg",
    ingredientes: [
      "6 elotes maduros desgranados",
      "2 tazas de leche entera",
      "2 tazas de agua",
      "1 raja de canela entera",
      "¾ taza de azúcar",
      "Una pizca de sal"
    ],
    pasos: [
      "Licúe los granos de elote crudo junto con las tazas de agua hasta lograr una mezcla homogénea.",
      "Cuele muy bien la mezcla usando una manta fina para retirar todo el bagazo.",
      "Vierta el líquido extraído en una olla limpia, añada la canela y la pizca de sal.",
      "Cocine a fuego medio sin dejar de remover para evitar que se pegue al fondo.",
      "Cuando comience a espesar, incorpore la leche entera y el azúcar a su gusto.",
      "Deje hervir durante 5 minutos adicionales y sirva bien caliente en una taza de barro."
    ]
  },
  riguas: {
    titulo: "Riguas",
    categoria: "Antojo callejero",
    porciones: "10 riguas",
    tiempo: "40 min",
    dificultad: "Fácil",
    imagen: "../assets/media/recetas/riguas.webp",
    ingredientes: [
      "6 elotes tiernos desgranados",
      "2 cucharadas de azúcar",
      "1 cucharadita de sal",
      "2 cucharadas de mantequilla derretida",
      "Hojas de elote (tusa) para envolver",
      "Queso duro rallado (opcional)"
    ],
    pasos: [
      "Muela los granos de elote tierno en un procesador hasta lograr una masa espesa y ligeramente granulada.",
      "Mezcle la masa con el azúcar, la sal y la mantequilla derretida hasta integrar bien.",
      "Si lo desea, incorpore queso rallado a la mezcla para una versión más salada.",
      "Coloque una porción de la mezcla sobre una hoja de tusa y doble formando un paquete plano.",
      "Cocine las riguas en un comal caliente durante 6-8 minutos por cada lado.",
      "Sirva calientes, recién salidas del comal, solas o acompañadas de crema."
    ]
  },
  empanadasplatano: {
    titulo: "Empanadas de Plátano",
    categoria: "Postre tradicional",
    porciones: "8 empanadas",
    tiempo: "50 min",
    dificultad: "Media",
    imagen: "../assets/media/recetas/empanadas.webp",
    ingredientes: [
      "4 plátanos maduros grandes",
      "1 taza de frijoles refritos dulces o leche condensada",
      "2 cucharadas de harina de maíz o de trigo",
      "Azúcar al gusto",
      "Aceite para freír",
      "Canela en polvo para espolvorear"
    ],
    pasos: [
      "Cocine los plátanos con cáscara en agua hirviendo hasta que estén muy suaves.",
      "Pele los plátanos y hágalos puré, incorporando la harina poco a poco hasta lograr una masa manejable.",
      "Tome una porción de masa, aplánela en la palma de la mano y coloque relleno de frijol dulce o leche condensada en el centro.",
      "Cierre formando una empanada ovalada, sellando bien los bordes con los dedos húmedos.",
      "Fría las empanadas en aceite caliente hasta que doren uniformemente por ambos lados.",
      "Escurra el exceso de aceite y espolvoree con azúcar y canela antes de servir."
    ]
  },
  mariscada: {
    titulo: "Mariscada",
    categoria: "Plato costero",
    porciones: "6 porciones",
    tiempo: "1 hora",
    dificultad: "Media",
    imagen: "../assets/media/recetas/mariscada.webp",
    ingredientes: [
      "1 libra de camarones limpios",
      "1 libra de pescado en trozos firmes",
      "1 libra de mariscos variados (pulpo, calamar, conchas)",
      "Leche de coco",
      "Tomate, cebolla, chile dulce y culantro",
      "Yuca o plátano verde en trozos"
    ],
    pasos: [
      "Prepare un sofrito con cebolla, tomate y chile dulce picados finamente en aceite caliente.",
      "Agregue la leche de coco al sofrito y deje que hierva suavemente para que se integren los sabores.",
      "Incorpore la yuca o el plátano verde, que necesitan más tiempo para ablandarse.",
      "Añada el pescado y los mariscos más firmes primero, dejando los camarones para el final.",
      "Cocine los camarones apenas unos minutos para que no pierdan su textura jugosa.",
      "Finalice con culantro fresco picado y sirva caliente en un tazón hondo."
    ]
  },
  casamiento: {
    titulo: "Casamiento",
    categoria: "Plato de diario",
    porciones: "4 porciones",
    tiempo: "25 min",
    dificultad: "Fácil",
    imagen: "../assets/media/recetas/casamiento.webp",
    ingredientes: [
      "2 tazas de arroz blanco ya cocido",
      "2 tazas de frijoles rojos cocidos con su caldo",
      "2 cucharadas de aceite o margarina",
      "1 chile verde entero",
      "2 cucharadas de cebolla picada",
      "1 diente de ajo"
    ],
    pasos: [
      "Caliente el aceite o la margarina en una sartén grande y sofría la cebolla y el ajo hasta que estén transparentes.",
      "Agregue el chile verde entero y sofría un momento más para liberar su aroma.",
      "Incorpore los frijoles cocidos junto con un poco de su caldo, mezclando bien con el sofrito.",
      "Añada el arroz cocido y mezcle todo hasta integrar completamente los ingredientes.",
      "Cocine a fuego medio-bajo durante 10 minutos, revolviendo ocasionalmente hasta que los sabores se unan.",
      "Retire el chile y sirva caliente, tradicionalmente acompañado de crema y queso fresco."
    ]
  },
  enchiladas: {
    titulo: "Enchiladas Salvadoreñas",
    categoria: "Antojo callejero",
    porciones: "6 enchiladas",
    tiempo: "1 hora",
    dificultad: "Media",
    imagen: "../assets/media/recetas/enchiladas-salvadorenas.webp",
    ingredientes: [
      "6 tortillas de maíz fritas hasta quedar crujientes",
      "1 libra de carne molida de res",
      "Repollo encurtido (curtido)",
      "Salsa de tomate casera",
      "Remolacha cocida en rodajas",
      "Huevo duro y queso duro rallado"
    ],
    pasos: [
      "Fría las tortillas de maíz en aceite caliente hasta que queden completamente crujientes y doradas.",
      "Cocine la carne molida con cebolla, ajo y tomate hasta que esté bien sazonada y sin líquido.",
      "Prepare o tenga lista una porción generosa de curtido de repollo.",
      "Sobre cada tortilla crujiente, extienda una capa de carne molida.",
      "Cubra con abundante curtido, salsa de tomate y rodajas de remolacha.",
      "Termine con huevo duro picado y queso rallado antes de servir de inmediato."
    ]
  },
  nuegadosyuca: {
    titulo: "Nuégados de Yuca",
    categoria: "Postre tradicional",
    porciones: "20 nuégados",
    tiempo: "1 hora",
    dificultad: "Media",
    imagen: "../assets/media/recetas/Nuegados-de-Yuca.webp",
    ingredientes: [
      "2 libras de yuca rallada finamente",
      "2 cucharadas de harina de trigo",
      "Aceite abundante para freír",
      "2 tazas de dulce de panela (rapadura)",
      "1 raja de canela",
      "Clavos de olor (opcional)"
    ],
    pasos: [
      "Ralle la yuca finamente y exprima el exceso de agua con un paño limpio.",
      "Mezcle la yuca rallada con la harina hasta formar una masa que se pueda moldear.",
      "Forme bolitas pequeñas con la masa de yuca entre las palmas de las manos.",
      "Fría las bolitas en aceite caliente hasta que doren de manera uniforme y queden crujientes.",
      "Prepare la miel disolviendo la panela con agua, canela y clavos, dejando hervir hasta espesar.",
      "Bañe los nuégados fritos con la miel caliente justo antes de servir."
    ]
  },
  chilateconnuegados: {
    titulo: "Chilate con Nuégados",
    categoria: "Bebida ancestral",
    porciones: "6 tazas",
    tiempo: "1 hora",
    dificultad: "Media",
    imagen: "../assets/media/gastronomia/chilate-nuegado.jpg",
    ingredientes: [
      "1 libra de maíz blanco tostado y molido",
      "1 raja de canela y unos clavos de olor",
      "Jengibre en trozo pequeño",
      "Azúcar o panela al gusto",
      "Agua suficiente",
      "Nuégados de yuca ya preparados"
    ],
    pasos: [
      "Tueste el maíz en un comal seco hasta que adquiera un color dorado y aroma característico.",
      "Muela el maíz tostado hasta obtener un polvo fino, similar a una harina.",
      "Diluya la harina de maíz en agua fría, evitando que se formen grumos.",
      "Cocine a fuego medio junto con la canela, clavos y jengibre, revolviendo constantemente hasta que espese.",
      "Endulce al gusto con azúcar o panela y deje hervir unos minutos más.",
      "Sirva el chilate caliente en tazas de barro acompañado de nuégados de yuca bañados en miel."
    ]
  },
  torrejas: {
    titulo: "Torrejas",
    categoria: "Tradición de Semana Santa",
    porciones: "8 porciones",
    tiempo: "1 hora",
    dificultad: "Media",
    imagen: "../assets/media/recetas/Torreja.webp",
    ingredientes: [
      "1 pan francés o baguette del día anterior",
      "4 huevos batidos",
      "2 tazas de dulce de panela (rapadura)",
      "1 raja de canela y clavos de olor",
      "Aceite para freír",
      "Agua"
    ],
    pasos: [
      "Corte el pan en rebanadas gruesas y déjelas secar un poco para que absorban mejor el líquido.",
      "Bata los huevos y remoje cada rebanada de pan, cubriendo bien ambos lados.",
      "Fría las rebanadas de pan en aceite caliente hasta que doren por completo.",
      "Prepare la miel disolviendo la panela en agua junto con la canela y los clavos, hirviendo hasta espesar ligeramente.",
      "Sumerja las rebanadas fritas en la miel caliente, dejando que absorban el dulce por varios minutos.",
      "Sirva las torrejas tibias, bañadas en abundante miel de panela."
    ]
  }
};

// ============================================================
// Base de datos local de recetas (INGLÉS)
// ============================================================
const recetasDataEN = {
  pupusas: {
    titulo: "Stuffed Pupusas",
    categoria: "Signature dish",
    porciones: "4-6 people",
    tiempo: "45 min",
    dificultad: "Medium",
    imagen: "../assets/media/recetas/Pupusas-Revueltas.webp",
    ingredientes: [
      "2 cups of corn masa (or rice flour)",
      "1½ cups of warm water",
      "1 cup of ground Salvadoran chicharrón",
      "1 cup of refried black or red beans",
      "1½ cups of grated quesillo or mozzarella cheese",
      "Vegetable oil for your hands"
    ],
    pasos: [
      "In a bowl, gradually mix the masa with warm water until you get a smooth, pliable dough.",
      "Combine the cheese, chicharrón, and beans in a separate bowl to make the mixed filling.",
      "Take a golf-ball-sized piece of dough and form a cavity in the center like a small bowl.",
      "Place a generous spoonful of filling into the cavity and close the dough completely around it.",
      "Gently pat the dough from hand to hand, turning it to form a flat disc without letting the filling escape.",
      "Cook on a hot comal or skillet for 3–4 minutes per side until golden brown."
    ]
  },
  yuca: {
    titulo: "Fried Yuca with Chicharrón",
    categoria: "Street snack",
    porciones: "4 servings",
    tiempo: "40 min",
    dificultad: "Easy",
    imagen: "../assets/media/recetas/yuca-frita.webp",
    ingredientes: [
      "2 lbs of large yuca (cassava)",
      "1 lb of crispy pork chicharrón",
      "Salvadoran curtido (pickled cabbage)",
      "Homemade tomato sauce",
      "Plenty of oil for frying",
      "Salt to taste"
    ],
    pasos: [
      "Peel the yuca and cut into medium pieces, removing the fibrous center.",
      "Boil the yuca in salted water until soft but firm.",
      "Drain completely and let the pieces cool.",
      "Heat plenty of oil in a deep skillet and fry the yuca until golden and crispy on the outside.",
      "Serve a bed of fried yuca, top with a generous portion of curtido.",
      "Finish with hot chicharrón pieces and drizzle with traditional tomato sauce."
    ]
  },
  sopa: {
    titulo: "Sopa de Pata (Beef Feet Soup)",
    categoria: "Weekend dish",
    porciones: "6 servings",
    tiempo: "3 hours",
    dificultad: "High",
    imagen: "../assets/media/recetas/Sopa de Pata.jpg",
    ingredientes: [
      "2 lbs of clean beef feet",
      "1 lb of beef tripe (mondongo)",
      "Yuca, güisquil, corn and green plantain in chunks",
      "Fresh chipilín leaves",
      "Onion, garlic, green chile and achiote",
      "Lime and cilantro for serving"
    ],
    pasos: [
      "Tenderize the beef feet and tripe in a large pot with enough water, garlic and onion for about 2 hours.",
      "When the meat is tender, remove the tripe, cut into small pieces and return to the broth.",
      "Add the achiote for color along with the corn and yuca, which need longer cooking time.",
      "After 15 minutes, add the güisquil, green plantain and chipilín sprigs.",
      "Simmer until all vegetables are completely tender.",
      "Serve hot with chopped onion, cilantro and a squeeze of lime."
    ]
  },
  gallinaindia: {
    titulo: "Sopa de Gallina India (Free-range Hen Soup)",
    categoria: "Weekend dish",
    porciones: "6 servings",
    tiempo: "2 hours",
    dificultad: "Medium",
    imagen: "../assets/media/recetas/Sopa-de-Gallina-India.webp",
    ingredientes: [
      "1 whole free-range hen, cut into pieces",
      "Potatoes and güisquil in large chunks",
      "Tender corn cut into slices",
      "Onion, garlic, tomato and mint",
      "Achiote and hen bouillon",
      "White rice to serve"
    ],
    pasos: [
      "Wash the hen pieces well and cook in a large pot with water, garlic and onion until tender.",
      "Skim off any foam that rises to the surface to achieve a clean, golden broth.",
      "Blend the tomato with a little achiote and add to the broth for color and flavor.",
      "Add the potatoes and corn, which need longer cooking.",
      "Add the güisquil and simmer until all vegetables are soft.",
      "Finally add fresh mint leaves and serve with white rice on the side."
    ]
  },
  panesconpollo: {
    titulo: "Panes con Pollo (Chicken Sandwiches)",
    categoria: "Celebration food",
    porciones: "8 sandwiches",
    tiempo: "1 hour 30 min",
    dificultad: "Medium",
    imagen: "../assets/media/recetas/Panes-con-Pollo.webp",
    ingredientes: [
      "8 Salvadoran French rolls (birote)",
      "1 whole hen or chicken in pieces",
      "Red recado (achiote, spices)",
      "Pickled vegetables: radish, cabbage, chili",
      "Tomato, onion, mustard and mayonnaise",
      "Lettuce and mint leaves"
    ],
    pasos: [
      "Cook the chicken with red recado, garlic and onion until the meat is tender and juicy.",
      "Shred the chicken and set aside, moistened with a little of its own seasoned broth.",
      "Cut the rolls in half and spread generously with mustard and mayonnaise.",
      "Place a bed of lettuce and add slices of fresh tomato.",
      "Fill with plenty of shredded chicken and its recado sauce.",
      "Top with pickled vegetables and a sprig of mint before closing the sandwich."
    ]
  },
  tamales: {
    titulo: "Salvadoran Tamales",
    categoria: "Christmas tradition",
    porciones: "12-15 tamales",
    tiempo: "2 hours",
    dificultad: "High",
    imagen: "../assets/media/recetas/tamales-de-pollo.webp",
    ingredientes: [
      "1 lb of nixtamalized corn masa",
      "1 liter of concentrated chicken broth",
      "½ cup of lard or oil",
      "Plantain leaves previously passed through boiling water",
      "Shredded chicken cooked in recado",
      "Potatoes, olives and capers for garnish"
    ],
    pasos: [
      "Cook the masa with the chicken broth and lard over medium heat, stirring constantly until it thickens evenly.",
      "Clean and cut the plantain leaves into rectangles about 30x30 cm.",
      "Place a large spoonful of hot masa in the center of the leaf.",
      "Add the chicken with recado, a strip of potato, an olive and capers.",
      "Wrap by folding the ends firmly to prevent water leakage.",
      "Steam in a large pot with a leaf base for 1 hour and 15 minutes."
    ]
  },
  atol: {
    titulo: "Atol de Elote (Sweet Corn Drink)",
    categoria: "Ancestral drink",
    porciones: "5 cups",
    tiempo: "30 min",
    dificultad: "Easy",
    imagen: "../assets/media/recetas/atol-elote.jpg",
    ingredientes: [
      "6 ripe ears of corn, kernels removed",
      "2 cups of whole milk",
      "2 cups of water",
      "1 whole cinnamon stick",
      "¾ cup of sugar",
      "A pinch of salt"
    ],
    pasos: [
      "Blend the raw corn kernels with the water until smooth.",
      "Strain well using a fine cloth to remove all the pulp.",
      "Pour the extracted liquid into a clean pot, add the cinnamon and salt.",
      "Cook over medium heat, stirring constantly to prevent sticking.",
      "When it begins to thicken, add the milk and sugar to taste.",
      "Boil for 5 more minutes and serve hot in a clay cup."
    ]
  },
  riguas: {
    titulo: "Riguas (Corn Cakes)",
    categoria: "Street snack",
    porciones: "10 riguas",
    tiempo: "40 min",
    dificultad: "Easy",
    imagen: "../assets/media/recetas/riguas.webp",
    ingredientes: [
      "6 tender ears of corn, kernels removed",
      "2 tablespoons of sugar",
      "1 teaspoon of salt",
      "2 tablespoons of melted butter",
      "Corn husks (tusa) for wrapping",
      "Grated hard cheese (optional)"
    ],
    pasos: [
      "Grind the tender corn kernels in a food processor until you get a thick, slightly grainy dough.",
      "Mix the dough with the sugar, salt and melted butter until well combined.",
      "If desired, add grated cheese to make a savory version.",
      "Place a portion of the mixture on a corn husk and fold into a flat packet.",
      "Cook the riguas on a hot comal for 6-8 minutes per side.",
      "Serve hot, fresh off the comal, plain or with sour cream."
    ]
  },
  empanadasplatano: {
    titulo: "Plantain Empanadas",
    categoria: "Traditional dessert",
    porciones: "8 empanadas",
    tiempo: "50 min",
    dificultad: "Medium",
    imagen: "../assets/media/recetas/empanadas.webp",
    ingredientes: [
      "4 large ripe plantains",
      "1 cup of sweet refried beans or condensed milk",
      "2 tablespoons of corn or wheat flour",
      "Sugar to taste",
      "Oil for frying",
      "Ground cinnamon for sprinkling"
    ],
    pasos: [
      "Cook the plantains with their skins on in boiling water until very soft.",
      "Peel the plantains and mash them, gradually incorporating the flour until you have a manageable dough.",
      "Take a portion of dough, flatten it in your palm and place sweet bean filling or condensed milk in the center.",
      "Close to form an oval empanada, sealing the edges well with wet fingers.",
      "Fry in hot oil until golden and crisp on both sides.",
      "Drain excess oil and sprinkle with sugar and cinnamon before serving."
    ]
  },
  mariscada: {
    titulo: "Mariscada (Seafood Stew)",
    categoria: "Coastal dish",
    porciones: "6 servings",
    tiempo: "1 hour",
    dificultad: "Medium",
    imagen: "../assets/media/recetas/mariscada.webp",
    ingredientes: [
      "1 lb of cleaned shrimp",
      "1 lb of firm fish in chunks",
      "1 lb of mixed seafood (octopus, squid, shellfish)",
      "Coconut milk",
      "Tomato, onion, sweet pepper and culantro",
      "Yuca or green plantain in chunks"
    ],
    pasos: [
      "Sauté onion, tomato and sweet pepper finely chopped in hot oil.",
      "Add coconut milk to the sauté and let it simmer gently to blend flavors.",
      "Add the yuca or green plantain, which need more time to soften.",
      "Add the fish and firmer seafood first, leaving the shrimp for last.",
      "Cook the shrimp just a few minutes so they stay juicy.",
      "Finish with fresh chopped culantro and serve hot in a deep bowl."
    ]
  },
  casamiento: {
    titulo: "Casamiento (Rice and Beans)",
    categoria: "Everyday dish",
    porciones: "4 servings",
    tiempo: "25 min",
    dificultad: "Easy",
    imagen: "../assets/media/recetas/casamiento.webp",
    ingredientes: [
      "2 cups of cooked white rice",
      "2 cups of cooked red beans with their broth",
      "2 tablespoons of oil or margarine",
      "1 whole green chili",
      "2 tablespoons of chopped onion",
      "1 clove of garlic"
    ],
    pasos: [
      "Heat the oil or margarine in a large skillet and sauté the onion and garlic until translucent.",
      "Add the whole green chili and sauté a little more to release its aroma.",
      "Add the cooked beans with a little of their broth, mixing well with the sauté.",
      "Add the cooked rice and mix everything until the ingredients are fully combined.",
      "Cook over medium-low heat for 10 minutes, stirring occasionally until flavors meld.",
      "Remove the chili and serve hot, traditionally with sour cream and fresh cheese."
    ]
  },
  enchiladas: {
    titulo: "Salvadoran Enchiladas",
    categoria: "Street snack",
    porciones: "6 enchiladas",
    tiempo: "1 hour",
    dificultad: "Medium",
    imagen: "../assets/media/recetas/enchiladas-salvadorenas.webp",
    ingredientes: [
      "6 corn tortillas, fried until crispy",
      "1 lb of ground beef",
      "Pickled cabbage (curtido)",
      "Homemade tomato sauce",
      "Cooked beet in slices",
      "Hard-boiled egg and grated hard cheese"
    ],
    pasos: [
      "Fry the corn tortillas in hot oil until completely crispy and golden.",
      "Cook the ground beef with onion, garlic and tomato until well seasoned and dry.",
      "Prepare or have ready a generous portion of cabbage curtido.",
      "Spread a layer of ground beef over each crispy tortilla.",
      "Top with plenty of curtido, tomato sauce and beet slices.",
      "Finish with chopped hard-boiled egg and grated cheese before serving immediately."
    ]
  },
  nuegadosyuca: {
    titulo: "Yuca Nuégados",
    categoria: "Traditional dessert",
    porciones: "20 nuégados",
    tiempo: "1 hour",
    dificultad: "Medium",
    imagen: "../assets/media/recetas/Nuegados-de-Yuca.webp",
    ingredientes: [
      "2 lbs of finely grated yuca",
      "2 tablespoons of wheat flour",
      "Plenty of oil for frying",
      "2 cups of panela (rapadura) sugar",
      "1 cinnamon stick",
      "Cloves (optional)"
    ],
    pasos: [
      "Grate the yuca finely and squeeze out excess water with a clean cloth.",
      "Mix the grated yuca with the flour until a moldable dough forms.",
      "Form small balls with the yuca dough between your palms.",
      "Fry the balls in hot oil until they are evenly golden and crispy.",
      "Prepare the honey by dissolving the panela with water, cinnamon and cloves, simmering until thickened.",
      "Drench the fried nuégados with the hot honey just before serving."
    ]
  },
  chilateconnuegados: {
    titulo: "Chilate with Nuégados",
    categoria: "Ancestral drink",
    porciones: "6 cups",
    tiempo: "1 hour",
    dificultad: "Medium",
    imagen: "../assets/media/gastronomia/chilate-nuegado.jpg",
    ingredientes: [
      "1 lb of toasted white corn, ground",
      "1 cinnamon stick and a few cloves",
      "A small piece of ginger",
      "Sugar or panela to taste",
      "Enough water",
      "Prepared yuca nuégados"
    ],
    pasos: [
      "Toast the corn on a dry comal until golden and aromatic.",
      "Grind the toasted corn to a fine powder, like flour.",
      "Dissolve the corn flour in cold water, avoiding lumps.",
      "Cook over medium heat with the cinnamon, cloves and ginger, stirring constantly until it thickens.",
      "Sweeten to taste with sugar or panela and boil for a few more minutes.",
      "Serve the chilate hot in clay cups, accompanied by yuca nuégados bathed in honey."
    ]
  },
  torrejas: {
    titulo: "Torrejas (Fried Bread in Honey)",
    categoria: "Holy Week tradition",
    porciones: "8 servings",
    tiempo: "1 hour",
    dificultad: "Medium",
    imagen: "../assets/media/recetas/Torreja.webp",
    ingredientes: [
      "1 day-old French bread or baguette",
      "4 beaten eggs",
      "2 cups of panela (rapadura) sugar",
      "1 cinnamon stick and cloves",
      "Oil for frying",
      "Water"
    ],
    pasos: [
      "Cut the bread into thick slices and let them dry slightly so they absorb the liquid better.",
      "Beat the eggs and soak each slice of bread, covering both sides well.",
      "Fry the bread slices in hot oil until golden all over.",
      "Prepare the honey by dissolving the panela in water with the cinnamon and cloves, simmering until slightly thickened.",
      "Submerge the fried slices in the hot honey, letting them absorb the sweetness for several minutes.",
      "Serve the torrejas warm, drenched in plenty of panela honey."
    ]
  }
};

// ============================================================
// Funciones de ayuda para idioma
// ============================================================
function getRecetasData(lang) {
  return lang === 'en' ? recetasDataEN : recetasData;
}

function getCategorias(lang) {
  const data = getRecetasData(lang);
  const cats = new Set(Object.values(data).map(r => r.categoria));
  const allLabel = lang === 'en' ? 'All' : 'Todas';
  return [allLabel, ...Array.from(cats)];
}

// ============================================================
// Renderizado de la grilla y filtros
// ============================================================
function renderGrid(filtro = "Todas", langOverride = null, searchTerm = null) {
  const grid = document.getElementById("recipes-grid");
  if (!grid) return;
  const lang = langOverride || (window.SRi18n ? window.SRi18n.getLang() : 'es');
  const data = getRecetasData(lang);
  const term = (searchTerm !== null ? searchTerm : (document.getElementById('recipeSearch')?.value || '')).toLowerCase().trim();

  const entradas = Object.entries(data).filter(([key, receta]) => {
    const matchesCat = filtro === (lang === 'en' ? 'All' : 'Todas') || receta.categoria === filtro;
    const matchesSearch = !term || receta.titulo.toLowerCase().includes(term);
    return matchesCat && matchesSearch;
  });

  const emptyState = document.getElementById('recipesEmpty');
  if (emptyState) emptyState.style.display = entradas.length === 0 ? 'block' : 'none';

  grid.innerHTML = entradas
    .map(([key, receta]) => `
      <article class="recipe-mini-card" data-key="${key}" tabindex="0">
        <div class="recipe-mini-card__img">
          <img src="${receta.imagen || DEFAULT_RECIPE_IMAGE}" alt="${receta.titulo}" loading="lazy" />
          <span class="recipe-mini-card__badge">${receta.categoria}</span>
        </div>
        <div class="recipe-mini-card__body">
          <h3>${receta.titulo}</h3>
          <div class="recipe-mini-card__meta">
            <span>⏱ ${receta.tiempo}</span>
            <span>📊 ${receta.dificultad}</span>
          </div>
        </div>
      </article>
    `).join("");

  // Animación (sin cambios)
  const cards = grid.querySelectorAll(".recipe-mini-card");
  if (window.gsap) {
    gsap.killTweensOf(cards);
    gsap.fromTo(cards,
      { opacity: 0, y: 25, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.05, ease: "power2.out" }
    );
  }

  grid.querySelectorAll(".recipe-mini-card").forEach(card => {
    const open = () => {
      const key = card.getAttribute("data-key");
      renderRecipe(key);
      openRecipeModal();
    };
    card.addEventListener("click", open);
    card.addEventListener("keypress", (e) => { if (e.key === "Enter") open(); });
  });
}

function renderFilters(langOverride = null) {
  const wrap = document.getElementById("recipe-filters");
  if (!wrap) return;
  const lang = langOverride || (window.SRi18n ? window.SRi18n.getLang() : 'es');
  const cats = getCategorias(lang);
  wrap.innerHTML = cats.map((c, i) => `<button class="filter-chip${i === 0 ? ' active' : ''}" data-filter="${c}">${c}</button>`).join("");

  wrap.querySelectorAll(".filter-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      wrap.querySelectorAll(".filter-chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      // Al hacer clic en un filtro, usar el idioma actual
      const currentLang = window.SRi18n ? window.SRi18n.getLang() : 'es';
      renderGrid(btn.getAttribute("data-filter"), currentLang);
      cerrarRecetasFiltersSheet();
    });
  });
}

// ============================================================
// Modal y renderizado de receta activa
// ============================================================
let modalScrollLocked = false;

function openRecipeModal() {
  const overlay = document.getElementById("recipeModalOverlay");
  const modal = document.getElementById("recipeModal");
  const scrollArea = document.getElementById("printable-recipe-area");
  if (!overlay || !modal) return;

  if (scrollArea) scrollArea.scrollTop = 0;

  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
  document.body.classList.add("recipe-modal-open");
  modalScrollLocked = true;

  if (window.gsap) {
    gsap.killTweensOf([overlay, modal]);
    gsap.set(overlay, { opacity: 0 });
    gsap.set(modal, { opacity: 0, scale: 0.85, y: 40 });
    gsap.to(overlay, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.to(modal, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.6)" });

    const card = modal.querySelector(".recipe-card");
    if (card) {
      gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, delay: 0.15, ease: "power2.out" });
    }
  } else {
    overlay.style.opacity = "1";
  }
}

function closeRecipeModal() {
  const overlay = document.getElementById("recipeModalOverlay");
  const modal = document.getElementById("recipeModal");
  if (!overlay || !modal) return;

  const finish = () => {
    overlay.classList.remove("is-open");
    document.body.style.overflow = "";
    document.body.classList.remove("recipe-modal-open");
    modalScrollLocked = false;
  };

  if (window.gsap) {
    gsap.killTweensOf([overlay, modal]);
    gsap.to(modal, { opacity: 0, scale: 0.9, y: 30, duration: 0.3, ease: "power2.in" });
    gsap.to(overlay, { opacity: 0, duration: 0.3, ease: "power2.in", onComplete: finish });
  } else {
    finish();
  }
}

function renderRecipe(key) {
  const lang = window.SRi18n ? window.SRi18n.getLang() : 'es';
  const data = getRecetasData(lang);
  const receta = data[key];
  if (!receta) return;

  const container = document.getElementById("recipe-dynamic-content");
  if (!container) return;

  container.innerHTML = `
    <div class="recipe-card" data-current="${key}">
      <div class="recipe-image-container">
        <img src="${receta.imagen || DEFAULT_RECIPE_IMAGE}" alt="${receta.titulo}" class="recipe-image" />
        <span class="recipe-card__badge">${receta.categoria}</span>
      </div>
      <div class="recipe-content-wrapper">
        <div class="recipe-header">
          <h2 class="recipe-title">${receta.titulo}</h2>
          <div class="recipe-meta">
            <span><strong>${lang === 'en' ? 'Servings' : 'Porciones'}:</strong> ${receta.porciones}</span>
            <span><strong>${lang === 'en' ? 'Time' : 'Tiempo'}:</strong> ${receta.tiempo}</span>
            <span><strong>${lang === 'en' ? 'Difficulty' : 'Dificultad'}:</strong> ${receta.dificultad}</span>
          </div>
        </div>
        <div class="recipe-grid">
          <div class="recipe-section ingredients-section">
            <h3>${lang === 'en' ? '📋 Ingredients' : '📋 Ingredientes'}</h3>
            <ul class="ingredients-list">
              ${receta.ingredientes.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
          </div>
          <div class="recipe-section steps-section">
            <h3>${lang === 'en' ? '👨‍🍳 Preparation' : '👨‍🍳 Preparación'}</h3>
            <ol class="steps-list">
              ${receta.pasos.map(paso => `<li>${paso}</li>`).join('')}
            </ol>
          </div>
        </div>
      </div>
    </div>
  `;

  document.querySelectorAll(".recipe-mini-card").forEach(c => {
    c.classList.toggle("is-active", c.getAttribute("data-key") === key);
  });

  if (typeof actualizarVideoReceta === "function") {
    actualizarVideoReceta(key, document.getElementById("recipe-video-block"));
  }
}

// ============================================================
// Descarga de PDF (traducido)
// ============================================================
function generateAndDownloadPDF() {
  const btn = document.getElementById('download-pdf-btn');
  if (!btn) return;

  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.textContent = '⏳ Generando PDF...';

  try {
    const container = document.getElementById("recipe-dynamic-content");
    const activeCard = container ? container.querySelector(".recipe-card") : null;
    const recipeKey = activeCard ? activeCard.getAttribute("data-current") : "receta";
    const lang = window.SRi18n ? window.SRi18n.getLang() : 'es';
    const data = getRecetasData(lang);
    const receta = data[recipeKey];

    if (!receta) {
      throw new Error('Recipe not found');
    }

    if (typeof html2pdf === "undefined") {
      throw new Error('No se pudo cargar el generador de PDF.');
    }

    const tempImg = new Image();
    tempImg.crossOrigin = "anonymous";
    tempImg.src = receta.imagen || DEFAULT_RECIPE_IMAGE;
    const absoluteImgSrc = tempImg.src;

    const printHTML = `
<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${receta.titulo} - Salvadorean Roots</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Lato', Arial, sans-serif;
      color: #1a1a1a;
      background: #ffffff;
      line-height: 1.5;
      padding: 10mm;
      font-size: 12px;
    }
    .pdf-container { max-width: 210mm; margin: 0 auto; }
    .recipe-header {
      border-bottom: 3px solid #be8e56;
      padding-bottom: 10px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 15px;
    }
    .recipe-title-group { flex: 1; }
    .recipe-title {
      color: #113068;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 5px;
      font-family: 'Playfair Display', serif;
    }
    .recipe-meta {
      display: flex;
      gap: 15px;
      font-size: 11px;
      color: #555;
    }
    .recipe-meta-item { display: flex; align-items: center; gap: 4px; }
    .recipe-meta-item strong { color: #113068; }
    .main-image-container {
      width: 100%;
      height: 180px;
      overflow: hidden;
      border-radius: 8px;
      margin-bottom: 15px;
      border: 2px solid #be8e56;
    }
    .main-image { width: 100%; height: 100%; object-fit: cover; }
    .recipe-grid {
      display: grid;
      grid-template-columns: 1fr 1.6fr;
      gap: 20px;
    }
    .recipe-section h3 {
      color: #be8e56;
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .ingredients-list, .steps-list { padding-left: 18px; }
    .ingredients-list li, .steps-list li {
      margin-bottom: 5px;
      font-size: 11px;
      color: #333;
    }
    .ingredients-list li { list-style: disc; }
    .steps-list li { list-style: decimal; }
    .recipe-footer {
      border-top: 1px solid #e5dccb;
      padding-top: 10px;
      margin-top: 20px;
      font-size: 10px;
      color: #999;
      text-align: center;
    }
    .recipe-footer strong { color: #be8e56; font-weight: 700; }
    @media print {
      body { padding: 10mm; }
      .main-image-container { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
    @page { size: A4; margin: 10mm; }
  </style>
</head>
<body>
  <div class="pdf-container">
    <div class="recipe-header">
      <div class="recipe-title-group">
        <h1 class="recipe-title">${receta.titulo}</h1>
        <div class="recipe-meta">
          <div class="recipe-meta-item">
            <strong>${lang === 'en' ? '👥 Servings:' : '👥 Porciones:'}</strong> ${receta.porciones}
          </div>
          <div class="recipe-meta-item">
            <strong>⏱️ ${lang === 'en' ? 'Time:' : 'Tiempo:'}</strong> ${receta.tiempo}
          </div>
          <div class="recipe-meta-item">
            <strong>📊 ${lang === 'en' ? 'Difficulty:' : 'Dificultad:'}</strong> ${receta.dificultad}
          </div>
        </div>
      </div>
    </div>

    <div class="main-image-container">
      <img src="${absoluteImgSrc}" alt="${receta.titulo}" class="main-image" />
    </div>

    <div class="recipe-grid">
      <div class="recipe-section">
        <h3>${lang === 'en' ? '📋 Ingredients' : '📋 Ingredientes'}</h3>
        <ul class="ingredients-list">
          ${receta.ingredientes.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>

      <div class="recipe-section">
        <h3>${lang === 'en' ? '👨‍🍳 Preparation' : '👨‍🍳 Preparación'}</h3>
        <ol class="steps-list">
          ${receta.pasos.map(paso => `<li>${paso}</li>`).join('')}
        </ol>
      </div>
    </div>

    <div class="recipe-footer">
      <strong>Salvadorean Roots</strong> — ${lang === 'en' ? 'Our heritage, our pride.' : 'Nuestra herencia, nuestro orgullo.'}<br>
      <small>${lang === 'en' ? 'Recipe from traditional Salvadoran cuisine' : 'Receta de la cocina salvadoreña tradicional'}</small>
    </div>
  </div>

</body>
</html>
    `;

    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.left = '-99999px';
    wrapper.style.top = '0';
    wrapper.innerHTML = printHTML;
    document.body.appendChild(wrapper);

    const fileName = `${(receta.titulo || 'receta').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-')}.pdf`;

    const cleanup = () => {
      wrapper.remove();
      btn.disabled = false;
      btn.innerHTML = originalText;
    };

    html2pdf()
      .set({
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.95 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      })
      .from(wrapper.querySelector('.pdf-container'))
      .save()
      .then(cleanup)
      .catch((error) => {
        console.error('Error generando PDF:', error);
        btn.textContent = '❌ Error';
        setTimeout(cleanup, 2000);
      });

  } catch (error) {
    console.error('Error generando PDF:', error);
    btn.textContent = '❌ Error';
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }, 2000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = window.SRi18n ? window.SRi18n.getLang() : 'es';
  
  renderFilters(lang);
  const initialFilter = lang === 'en' ? 'All' : 'Todas';
  renderGrid(initialFilter, lang);
  
  // Marcar el botón "All" o "Todas" como activo
  const allBtn = document.querySelector(`.filter-chip[data-filter="${initialFilter}"]`);
  if (allBtn) {
    document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
    allBtn.classList.add('active');
  }

  // ── Panel de filtros en celular (mismo patrón que Categorías) ──
  const filtersPanel = document.getElementById('recipeFiltersSheet');
  const filtersFab = document.getElementById('filtersFabBtn');
  const filtersOverlay = document.getElementById('filtersSheetOverlay');
  const filtersClose = document.getElementById('filtersSheetClose');

  function openFiltersSheet() {
    filtersPanel?.classList.add('is-open');
    filtersOverlay?.classList.add('is-open');
    filtersFab?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('filters-open');
    document.body.style.overflow = 'hidden';
  }
  filtersFab?.addEventListener('click', openFiltersSheet);
  filtersClose?.addEventListener('click', cerrarRecetasFiltersSheet);
  filtersOverlay?.addEventListener('click', cerrarRecetasFiltersSheet);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && filtersPanel?.classList.contains('is-open')) cerrarRecetasFiltersSheet();
  });

  // Buscador de recetas (mismo patrón que Categorías): filtra la
  // cuadrícula en vivo, combinado con la categoría activa.
  document.getElementById('recipeSearch')?.addEventListener('input', () => {
    const activeChip = document.querySelector('.filter-chip.active');
    const currentLang = window.SRi18n ? window.SRi18n.getLang() : 'es';
    const filtro = activeChip ? activeChip.getAttribute('data-filter') : (currentLang === 'en' ? 'All' : 'Todas');
    renderGrid(filtro, currentLang);
  });
  // Al buscar y presionar Enter, cerrar el panel para ver el resultado
  document.getElementById('recipeSearch')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') cerrarRecetasFiltersSheet();
  });

  // Botón de descarga PDF
  const downloadBtn = document.getElementById("download-pdf-btn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", generateAndDownloadPDF);
  }

  // Cerrar modal
  const overlay = document.getElementById("recipeModalOverlay");
  const closeBtn = document.getElementById("recipeModalClose");

  if (closeBtn) closeBtn.addEventListener("click", closeRecipeModal);

  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeRecipeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay && overlay.classList.contains("is-open")) {
      closeRecipeModal();
    }
  });

  // Abrir receta desde URL (?receta=slug)
  const params = new URLSearchParams(window.location.search);
  const slugDesdeURL = params.get("receta");
  if (slugDesdeURL) {
    const data = getRecetasData(lang);
    if (data[slugDesdeURL]) {
      setTimeout(() => {
        renderRecipe(slugDesdeURL);
        openRecipeModal();
      }, 200);
    }
  }
});

// ============================================================
// Escuchar cambios de idioma (CORREGIDO)
// ============================================================
document.addEventListener('langchange', (event) => {
  const newLang = event.detail ? event.detail.lang : 'es';
  
  // Obtener el filtro actual
  const currentFilterBtn = document.querySelector('.filter-chip.active');
  let currentFilter = currentFilterBtn ? currentFilterBtn.getAttribute('data-filter') : null;
  
  // Convertir filtro al equivalente en el nuevo idioma
  if (newLang === 'en' && currentFilter === 'Todas') {
    currentFilter = 'All';
  } else if (newLang === 'es' && currentFilter === 'All') {
    currentFilter = 'Todas';
  }
  
  // Validar que el filtro exista en el nuevo idioma
  const data = getRecetasData(newLang);
  const validCategories = Object.values(data).map(r => r.categoria);
  if (!currentFilter || (currentFilter !== 'All' && currentFilter !== 'Todas' && !validCategories.includes(currentFilter))) {
    currentFilter = newLang === 'en' ? 'All' : 'Todas';
  }
  
  // Re-renderizar filtros con el nuevo idioma
  renderFilters(newLang);
  
  // Marcar el botón correspondiente como activo
  const newFilterBtn = document.querySelector(`.filter-chip[data-filter="${currentFilter}"]`);
  if (newFilterBtn) {
    document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
    newFilterBtn.classList.add('active');
  }
  
  // Renderizar el grid con el filtro y el idioma forzado
  renderGrid(currentFilter, newLang);
  
  // Si el modal está abierto, actualizar su contenido
  const overlayModal = document.getElementById("recipeModalOverlay");
  if (overlayModal && overlayModal.classList.contains('is-open')) {
    const activeCard = document.querySelector('.recipe-mini-card.is-active');
    if (activeCard) {
      const key = activeCard.getAttribute('data-key');
      renderRecipe(key);
    }
  }
});