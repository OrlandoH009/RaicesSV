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

// Función para inyectar la receta activa dinámicamente
function renderRecipe(key) {
  const data = recetasData[key];
  if (!data) return;

  const container = document.getElementById("recipe-dynamic-content");
  if (!container) return;

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

// Función para generar y descargar PDF con previsualización de Chrome
function generateAndDownloadPDF() {
  const btn = document.getElementById('download-pdf-btn');
  if (!btn) return;

  const originalText = btn.textContent;
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

    // Crear HTML limpio para impresión/PDF
    const printHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.titulo} - Raíces SV</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Lato', Arial, sans-serif;
      color: #1a1a1a;
      background: #ffffff;
      line-height: 1.6;
      padding: 20mm;
    }

    .recipe-container {
      max-width: 210mm;
      background: white;
      color: #1a1a1a;
    }

    .recipe-header {
      border-bottom: 4px solid #be8e56;
      padding-bottom: 16px;
      margin-bottom: 24px;
    }

    .recipe-title {
      color: #113068;
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 12px;
      font-family: 'Playfair Display', serif;
    }

    .recipe-meta {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      font-size: 14px;
      color: #444;
    }

    .recipe-meta div strong {
      color: #113068;
      display: block;
      margin-bottom: 4px;
    }

    .recipe-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 24px;
    }

    .recipe-section h3 {
      color: #be8e56;
      font-size: 16px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-bottom: 2px solid #be8e56;
      padding-bottom: 10px;
      margin-bottom: 14px;
    }

    .ingredients-list,
    .steps-list {
      padding-left: 22px;
    }

    .ingredients-list li,
    .steps-list li {
      margin-bottom: 10px;
      font-size: 13px;
      line-height: 1.6;
    }

    .ingredients-list li {
      list-style: disc;
    }

    .steps-list li {
      list-style: decimal;
    }

    .recipe-footer {
      border-top: 1px solid #e5dccb;
      padding-top: 14px;
      margin-top: 24px;
      font-size: 12px;
      color: #999;
      text-align: center;
    }

    .recipe-footer strong {
      color: #be8e56;
      font-weight: 700;
    }

    @media print {
      body {
        padding: 15mm;
      }

      .recipe-section {
        page-break-inside: avoid;
      }

      .recipe-header {
        page-break-after: avoid;
      }
    }

    @page {
      size: A4;
      margin: 15mm;
    }
  </style>
</head>
<body>
  <div class="recipe-container">
    <div class="recipe-header">
      <h1 class="recipe-title">${data.titulo}</h1>
      <div class="recipe-meta">
        <div>
          <strong>👥 Porciones</strong>
          ${data.porciones}
        </div>
        <div>
          <strong>⏱️ Tiempo</strong>
          ${data.tiempo}
        </div>
        <div>
          <strong>📊 Dificultad</strong>
          ${data.dificultad}
        </div>
      </div>
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
    window.addEventListener('load', () => {
      window.print();
    });
  </script>
</body>
</html>
    `;

    // Abrir ventana nueva con el contenido
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(printHTML);
    printWindow.document.close();

    // Cuando se cierre el diálogo de impresión/descarga
    printWindow.addEventListener('afterprint', () => {
      printWindow.close();
      btn.disabled = false;
      btn.textContent = originalText;
    });

    // Fallback si afterprint no funciona
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = originalText;
    }, 3000);

  } catch (error) {
    console.error('Error generando PDF:', error);
    btn.textContent = '❌ Error';
    setTimeout(() => {
      btn.disabled = false;
      btn.textContent = originalText;
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