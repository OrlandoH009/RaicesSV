// Base de datos local de recetas estructuradas
const recetasData = {
  pupusas: {
    titulo: "Pupusas Revueltas",
    porciones: "4-6 personas",
    tiempo: "45 min",
    dificultad: "Media",
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
  tamales: {
    titulo: "Tamales de Pollo",
    porciones: "12-15 tamales",
    tiempo: "2 horas",
    dificultad: "Alta",
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
  sopa: {
    titulo: "Sopa de Pata",
    porciones: "6 porciones",
    tiempo: "3 horas",
    dificultad: "Alta",
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
  yuca: {
    titulo: "Yuca Frita con Chicharrón",
    porciones: "4 porciones",
    tiempo: "40 min",
    dificultad: "Fácil",
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
  atol: {
    titulo: "Atol de Elote",
    porciones: "5 tazas",
    tiempo: "30 min",
    dificultad: "Fácil",
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
  semita: {
    titulo: "Semita de Piña",
    porciones: "8 porciones",
    tiempo: "1 hora",
    dificultad: "Media",
    ingredientes: [
      "3 tazas de harina de trigo",
      "1 taza de manteca vegetal o mantequilla",
      "½ taza de azúcar",
      "1 cucharadita de polvo de hornear",
      "1½ tazas de mermelada artesanal de piña",
      "Un huevo batido para barnizar"
    ],
    pasos: [
      "Mezcle la harina, el polvo de hornear, el azúcar y la manteca hasta lograr una textura arenosa.",
      "Agregue agua fría poco a poco hasta formar una masa suave. Divídala en dos partes (60% para la base, 40% para el diseño superior).",
      "Estire la base de la masa en un molde previamente engrasado.",
      "Distribuya uniformemente toda la mermelada de piña sobre la base de masa.",
      "Estire el resto de la masa, córtela en tiras y colóquelas cruzadas en forma de enrejado sobre la mermelada.",
      "Barnice con huevo batido, espolvoree azúcar encima y hornee a 180°C (350°F) durante 35 minutos."
    ]
  }
};

// Función para inyectar la receta activa dinámicamente con la estructura visual
function renderRecipe(key) {
  const data = recetasData[key];
  if (!data) return;

  const container = document.getElementById("recipe-dynamic-content");

  // Renderizado dinámico respetando tus clases de diseño
  container.innerHTML = `
    <div class="recipe-card" data-current="${key}">
      <div class="recipe-header">
        <h2 class="recipe-title">${data.titulo}</h2>
        <div class="recipe-meta">
          <span><strong>Porciones:</strong> ${data.porciones}</span>
          <span><strong>Tiempo:</strong> ${data.tiempo}</span>
          <span><strong>Dificultad:</strong> ${data.dificultad}</span>
        </div>
      </div>
      <div class="recipe-grid">
        <div class="recipe-section">
          <h3>Ingredientes</h3>
          <ul class="ingredients-list">
            ${data.ingredientes.map(ing => `<li>${ing}</li>`).join('')}
          </ul>
        </div>
        <div class="recipe-section">
          <h3>Preparación</h3>
          <ol class="steps-list">
            ${data.pasos.map(paso => `<li>${paso}</li>`).join('')}
          </ol>
        </div>
      </div>
    </div>
  `;
}

// Manejador de eventos para el cambio de pestañas (Tabs)
document.addEventListener("DOMContentLoaded", () => {
  // Inicializa con la receta de pupusas
  renderRecipe("pupusas");

  const tabButtons = document.querySelectorAll("[data-recipe]");
  tabButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      // Remover clase activa de los botones previos
      tabButtons.forEach(btn => btn.classList.remove("active"));
      // Agregar al actual
      e.target.classList.add("active");

      const recipeKey = e.target.getAttribute("data-recipe");
      renderRecipe(recipeKey);
    });
  });

  // ── Evento interactivo para compilar y descargar el PDF de forma dinámica ──
  document.getElementById("download-pdf-btn").addEventListener("click", () => {
    const element = document.getElementById("printable-recipe-area");
    const activeCard = element.querySelector(".recipe-card");
    const recipeKey = activeCard ? activeCard.getAttribute("data-current") : "receta";
    const data = recetasData[recipeKey];

    const opt = {
      margin:       [10, 10, 12, 10],
      filename:     `Raices_SV_Receta_${recipeKey}.pdf`,
      image:        { type: 'jpeg', quality: 1 },
      html2canvas:  {
        scale: 3,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        scrollX: 0,
        scrollY: 0
      },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['css', 'avoid-all'] }
    };

    // Contenedor blanco, fuera de pantalla, con ancho fijo tipo A4
    const pdfWrapper = document.createElement('div');
    pdfWrapper.style.position = 'fixed';
    pdfWrapper.style.top = '0';
    pdfWrapper.style.left = '-9999px';
    pdfWrapper.style.width = '190mm';
    pdfWrapper.style.padding = '6mm';
    pdfWrapper.style.background = '#ffffff';
    pdfWrapper.style.color = '#1a1a1a';
    pdfWrapper.style.fontFamily = "'Lato', Arial, sans-serif";

    const cloned = element.cloneNode(true);

    // Reset agresivo y RECURSIVO de estilos en TODOS los nodos clonados.
    // Esto evita el bug original: solo unas pocas clases tenían el fondo
    // forzado a blanco, y el resto se quedaba con el fondo oscuro del sitio
    // pero con texto ya forzado a negro -> texto invisible en el PDF.
    const allNodes = [cloned, ...cloned.querySelectorAll('*')];
    allNodes.forEach(node => {
      node.style.background = 'transparent';
      node.style.backgroundColor = 'transparent';
      node.style.backgroundImage = 'none';
      node.style.color = '#1a1a1a';
      node.style.boxShadow = 'none';
      node.style.textShadow = 'none';
      node.style.filter = 'none';
      node.style.backdropFilter = 'none';
      node.style.opacity = '1';
      node.style.transform = 'none';
      node.style.borderColor = '#d9c8ad';
    });

    // Estilos específicos de presentación, aplicados DESPUÉS del reset
    cloned.style.background = '#ffffff';
    cloned.style.border = 'none';
    cloned.style.borderRadius = '0';
    cloned.style.padding = '0';

    const header = cloned.querySelector('.recipe-header');
    if (header) {
      header.style.borderBottom = '3px solid #be8e56';
      header.style.paddingBottom = '10px';
      header.style.marginBottom = '16px';
    }

    const title = cloned.querySelector('.recipe-title');
    if (title) {
      title.style.color = '#113068';
      title.style.fontSize = '26px';
      title.style.fontWeight = '700';
      title.style.marginBottom = '8px';
    }

    const meta = cloned.querySelector('.recipe-meta');
    if (meta) {
      meta.style.display = 'flex';
      meta.style.gap = '18px';
      meta.style.flexWrap = 'wrap';
      meta.style.fontSize = '13px';
      meta.style.color = '#444444';
    }

    // El grid de 2 columnas se apila en 1 columna para que se lea
    // completo y ordenado en una hoja A4 vertical.
    const grid = cloned.querySelector('.recipe-grid');
    if (grid) {
      grid.style.display = 'block';
    }

    const sections = cloned.querySelectorAll('.recipe-section');
    sections.forEach(section => {
      section.style.marginBottom = '18px';
      section.style.breakInside = 'avoid';
      section.style.pageBreakInside = 'avoid';
      const heading = section.querySelector('h3');
      if (heading) {
        heading.style.color = '#be8e56';
        heading.style.fontSize = '16px';
        heading.style.fontWeight = '700';
        heading.style.textTransform = 'uppercase';
        heading.style.letterSpacing = '0.04em';
        heading.style.marginBottom = '8px';
        heading.style.borderBottom = '1px solid #e5dccb';
        heading.style.paddingBottom = '4px';
      }
    });

    cloned.querySelectorAll('.ingredients-list li, .steps-list li').forEach(li => {
      li.style.marginBottom = '7px';
      li.style.lineHeight = '1.5';
      li.style.fontSize = '13px';
      li.style.paddingLeft = '2px';
    });

    cloned.querySelectorAll('.ingredients-list').forEach(ul => {
      ul.style.listStyle = 'disc';
      ul.style.paddingLeft = '20px';
    });

    cloned.querySelectorAll('.steps-list').forEach(ol => {
      ol.style.listStyle = 'decimal';
      ol.style.paddingLeft = '20px';
    });

    // Pie de página con marca, para que se vea presentable/terminado
    const footer = document.createElement('div');
    footer.style.marginTop = '22px';
    footer.style.paddingTop = '10px';
    footer.style.borderTop = '1px solid #e5dccb';
    footer.style.fontSize = '11px';
    footer.style.color = '#888888';
    footer.style.textAlign = 'center';
    footer.textContent = 'Raíces SV — Nuestra herencia, nuestro orgullo · raicessv.com';

    pdfWrapper.appendChild(cloned);
    pdfWrapper.appendChild(footer);
    document.body.appendChild(pdfWrapper);

    const btn = document.getElementById('download-pdf-btn');
    const originalBtnText = btn ? btn.textContent : null;
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Generando PDF...';
    }

    html2pdf().set(opt).from(pdfWrapper).save().then(() => {
      document.body.removeChild(pdfWrapper);
      if (btn) { btn.disabled = false; btn.textContent = originalBtnText; }
    }).catch((err) => {
      console.error('Error generando PDF:', err);
      document.body.removeChild(pdfWrapper);
      if (btn) { btn.disabled = false; btn.textContent = originalBtnText; }
    });
  });
});