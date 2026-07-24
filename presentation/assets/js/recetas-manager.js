// Base de datos local de recetas estructuradas con imágenes
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
    imagen: "../assets/media/recetas/chilate-con-nuegados.webp",
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

// Categorías para el filtro dinámico
function getCategorias() {
  const cats = new Set(Object.values(recetasData).map(r => r.categoria));
  return ["Todas", ...Array.from(cats)];
}

// Renderiza la grilla completa de tarjetas de recetas
function renderGrid(filtro = "Todas") {
  const grid = document.getElementById("recipes-grid");
  if (!grid) return;

  grid.innerHTML = Object.entries(recetasData)
    .filter(([key, data]) => filtro === "Todas" || data.categoria === filtro)
    .map(([key, data]) => `
      <article class="recipe-mini-card" data-key="${key}" tabindex="0">
        <div class="recipe-mini-card__img">
          <img src="${data.imagen}" alt="${data.titulo}" loading="lazy" />
          <span class="recipe-mini-card__badge">${data.categoria}</span>
        </div>
        <div class="recipe-mini-card__body">
          <h3>${data.titulo}</h3>
          <div class="recipe-mini-card__meta">
            <span>⏱ ${data.tiempo}</span>
            <span>📊 ${data.dificultad}</span>
          </div>
        </div>
      </article>
    `).join("");

  // Animación de entrada escalonada para las tarjetas
  const cards = grid.querySelectorAll(".recipe-mini-card");
  if (window.gsap) {
    gsap.killTweensOf(cards);
    gsap.fromTo(cards,
      { opacity: 0, y: 25, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.05, ease: "power2.out" }
    );
  }

  // Listeners para abrir la receta seleccionada en el modal flotante
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

// ===== Modal flotante de receta con animaciones GSAP =====
let modalScrollLocked = false;

function openRecipeModal() {
  const overlay = document.getElementById("recipeModalOverlay");
  const modal = document.getElementById("recipeModal");
  const scrollArea = document.getElementById("printable-recipe-area");
  if (!overlay || !modal) return;

  if (scrollArea) scrollArea.scrollTop = 0;

  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
  modalScrollLocked = true;

  if (window.gsap) {
    gsap.killTweensOf([overlay, modal]);
    gsap.set(overlay, { opacity: 0 });
    gsap.set(modal, { opacity: 0, scale: 0.85, y: 40 });
    gsap.to(overlay, { opacity: 1, duration: 0.3, ease: "power2.out" });
    gsap.to(modal, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.6)" });

    // Animar entrada del contenido de la receta
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

// Renderiza los botones de filtro por categoría
function renderFilters() {
  const wrap = document.getElementById("recipe-filters");
  if (!wrap) return;
  const cats = getCategorias();
  wrap.innerHTML = cats.map((c, i) => `<button class="filter-chip${i === 0 ? ' active' : ''}" data-filter="${c}">${c}</button>`).join("");

  wrap.querySelectorAll(".filter-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      wrap.querySelectorAll(".filter-chip").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderGrid(btn.getAttribute("data-filter"));
    });
  });
}

// Función para inyectar la receta activa dinámicamente
function renderRecipe(key) {
  const data = recetasData[key];
  if (!data) return;

  const container = document.getElementById("recipe-dynamic-content");
  if (!container) return;

  container.innerHTML = `
    <div class="recipe-card" data-current="${key}">
      <div class="recipe-image-container">
        <img src="${data.imagen}" alt="${data.titulo}" class="recipe-image" />
        <span class="recipe-card__badge">${data.categoria}</span>
      </div>
      <div class="recipe-content-wrapper">
        <div class="recipe-header">
          <h2 class="recipe-title">${data.titulo}</h2>
          <div class="recipe-meta">
            <span><strong>Porciones:</strong> ${data.porciones}</span>
            <span><strong>Tiempo:</strong> ${data.tiempo}</span>
            <span><strong>Dificultad:</strong> ${data.dificultad}</span>
          </div>
        </div>
        <div class="recipe-grid">
          <div class="recipe-section ingredients-section">
            <h3>📋 Ingredientes</h3>
            <ul class="ingredients-list">
              ${data.ingredientes.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
          </div>
          <div class="recipe-section steps-section">
            <h3>👨‍🍳 Preparación</h3>
            <ol class="steps-list">
              ${data.pasos.map(paso => `<li>${paso}</li>`).join('')}
            </ol>
          </div>
        </div>
      </div>
    </div>
  `;

  // Sincronizar tarjeta activa en el grid
  document.querySelectorAll(".recipe-mini-card").forEach(c => {
    c.classList.toggle("is-active", c.getAttribute("data-key") === key);
  });
}

// Función para generar y descargar PDF con previsualización de Chrome
function generateAndDownloadPDF() {
  const btn = document.getElementById('download-pdf-btn');
  if (!btn) return;

  const originalText = btn.innerHTML;
  btn.disabled = true;
  btn.textContent = '⏳ Abriendo previsualización...';

  try {
    // Obtener contenedor y receta actual
    const container = document.getElementById("recipe-dynamic-content");
    const activeCard = container ? container.querySelector(".recipe-card") : null;
    const recipeKey = activeCard ? activeCard.getAttribute("data-current") : "receta";
    const data = recetasData[recipeKey];

    if (!data) {
      throw new Error('Receta no encontrada');
    }

    // Convertir la imagen relativa a absoluta para que html2pdf la cargue
    const tempImg = new Image();
    tempImg.src = data.imagen;
    const absoluteImgSrc = tempImg.src;

    // Crear HTML limpio para impresión/PDF
    const printHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.titulo} - Raíces SV</title>
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

    .pdf-container {
      max-width: 210mm; /* A4 width */
      margin: 0 auto;
    }

    .recipe-header {
      border-bottom: 3px solid #be8e56;
      padding-bottom: 10px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .recipe-title-group {
      flex: 1;
    }

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

    .recipe-meta-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .recipe-meta-item strong {
      color: #113068;
    }

    .main-image-container {
      width: 100%;
      height: 180px; /* Reducido para que quepa todo */
      overflow: hidden;
      border-radius: 8px;
      margin-bottom: 15px;
      border: 2px solid #be8e56;
    }

    .main-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

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

    .ingredients-list, .steps-list {
      padding-left: 18px;
    }

    .ingredients-list li, .steps-list li {
      margin-bottom: 5px;
      font-size: 11px;
      color: #333;
    }

    .ingredients-list li {
      list-style: disc;
    }

    .steps-list li {
      list-style: decimal;
    }

    .recipe-footer {
      border-top: 1px solid #e5dccb;
      padding-top: 10px;
      margin-top: 20px;
      font-size: 10px;
      color: #999;
      text-align: center;
    }

    .recipe-footer strong {
      color: #be8e56;
      font-weight: 700;
    }

    @media print {
      body { padding: 10mm; }
      .main-image-container { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }

    @page {
      size: A4;
      margin: 10mm;
    }
  </style>
</head>
<body>
  <div class="pdf-container">
    <div class="recipe-header">
      <div class="recipe-title-group">
        <h1 class="recipe-title">${data.titulo}</h1>
        <div class="recipe-meta">
          <div class="recipe-meta-item">
            <strong>👥 Porciones:</strong> ${data.porciones}
          </div>
          <div class="recipe-meta-item">
            <strong>⏱️ Tiempo:</strong> ${data.tiempo}
          </div>
          <div class="recipe-meta-item">
            <strong>📊 Dificultad:</strong> ${data.dificultad}
          </div>
        </div>
      </div>
    </div>

    <div class="main-image-container">
      <img src="${absoluteImgSrc}" alt="${data.titulo}" class="main-image" />
    </div>

    <div class="recipe-grid">
      <div class="recipe-section">
        <h3>📋 Ingredientes</h3>
        <ul class="ingredients-list">
          ${data.ingredientes.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>

      <div class="recipe-section">
        <h3>👨‍🍳 Preparación</h3>
        <ol class="steps-list">
          ${data.pasos.map(paso => `<li>${paso}</li>`).join('')}
        </ol>
      </div>
    </div>

    <div class="recipe-footer">
      <strong>Raíces SV</strong> — Nuestra herencia, nuestro orgullo<br>
      <small>Receta de la cocina salvadoreña tradicional</small>
    </div>
  </div>

  <script>
    // Esperar a que la imagen se cargue completamente antes de imprimir
    window.addEventListener('load', () => {
      // Un pequeño retraso adicional asegura que todo esté renderizado
      setTimeout(() => {
        window.print();
      }, 500);
    });
  </script>
</body>
</html>
    `;

    // Abrir ventana nueva con el contenido
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('No se pudo abrir la ventana de impresión. Por favor, permite los pop-ups para este sitio.');
    }
    printWindow.document.write(printHTML);
    printWindow.document.close();

    // Cuando se cierre el diálogo de impresión/descarga (o si se cancela)
    printWindow.addEventListener('afterprint', () => {
      printWindow.close();
      btn.disabled = false;
      btn.innerHTML = originalText;
    });

    // Fallback por si afterprint no funciona (algunos navegadores)
    // Usamos focus para detectar cuando el usuario vuelve a la pestaña original
    window.addEventListener('focus', function windowFocusHandler() {
      if (printWindow.closed || !printWindow.document) {
        btn.disabled = false;
        btn.innerHTML = originalText;
        window.removeEventListener('focus', windowFocusHandler);
      }
    }, { once: true });

  } catch (error) {
    console.error('Error generando PDF:', error);
    btn.textContent = '❌ Error';
    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }, 2000);
  }
}

// Inicialización cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  // Construir filtros y grilla dinámica
  renderFilters();
  renderGrid("Todas");

  // Event listener para botón descargar PDF
  const downloadBtn = document.getElementById("download-pdf-btn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", generateAndDownloadPDF);
  }

  // Cerrar modal: botón X, click en overlay, tecla Escape
  const overlay = document.getElementById("recipeModalOverlay");
  const modal = document.getElementById("recipeModal");
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
});