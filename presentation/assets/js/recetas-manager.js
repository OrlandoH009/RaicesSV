// Base de datos local de recetas estructuradas con imágenes
const recetasData = {
  pupusas: {
    titulo: "Pupusas Revueltas",
    porciones: "4-6 personas",
    tiempo: "45 min",
    dificultad: "Media",
    imagen: "../assets/media/recetas/Pupusas-Revueltas.webp", // Ruta a tu imagen de pupusas
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
    imagen: "../assets/media/recetas/tamales.webp", // Ruta a tu imagen de tamales
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
    imagen: "../assets/media/recetas/sopa-de-pata.webp", // Ruta a tu imagen de sopa de pata
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
    imagen: "../assets/media/recetas/yuca-frita.webp", // Ruta a tu imagen de yuca frita
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
    imagen: "../assets/media/recetas/atol-de-elote.webp", // Ruta a tu imagen de atol de elote
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
    imagen: "../assets/media/recetas/semita.webp", // Ruta a tu imagen de semita
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
  // Inicializar con receta de pupusas
  renderRecipe("pupusas");

  // Event listeners para tabs de recetas
  const tabButtons = document.querySelectorAll("[data-recipe]");
  tabButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      tabButtons.forEach(btn => btn.classList.remove("active"));
      e.target.classList.add("active");

      const recipeKey = e.target.getAttribute("data-recipe");
      renderRecipe(recipeKey);
    });
  });

  // Event listener para botón descargar PDF
  const downloadBtn = document.getElementById("download-pdf-btn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", generateAndDownloadPDF);
  }
});