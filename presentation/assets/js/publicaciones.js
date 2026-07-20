// ════════════════════════════════════
// DATOS DE EJEMPLO DE PUBLICACIONES
// ════════════════════════════════════
const publicationsData = [
  {
    id: 1,
    title: "Ruinas de Tazumal",
    description: "Una vista espectacular de las pirámides antiguas al atardecer. El lugar es perfecto para aprender sobre la historia prehispánica de El Salvador.",
    location: "Tazumal",
    image: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?w=500&h=350&fit=crop",
    coordinates: { lat: 13.9286, lng: -89.6469 }
  },
  {
    id: 2,
    title: "Cascada en Joya de Cerén",
    description: "Una cascada hermosa en medio de la naturaleza salvadoreña. Ideal para una caminata refrescante y conectar con la naturaleza.",
    location: "Joya de Cerén",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=350&fit=crop",
    coordinates: { lat: 13.8238, lng: -89.3953 }
  },
  {
    id: 3,
    title: "Atardecer en Salvador del Mundo",
    description: "Vistas panorámicas de San Salvador desde la cima del cerro. Un lugar perfecto para contemplar la ciudad y fotografiar el atardecer.",
    location: "Salvador del Mundo",
    image: "https://images.unsplash.com/photo-1469022563149-aa64dbd37cf0?w=500&h=350&fit=crop",
    coordinates: { lat: 13.7029, lng: -89.2073 }
  },
  {
    id: 4,
    title: "Pueblo Mágico de Suchitoto",
    description: "Las calles coloniales de Suchitoto son un viaje al pasado. Casas antiguas, arte y cultura en cada rincón.",
    location: "Suchitoto",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=500&h=350&fit=crop",
    coordinates: { lat: 13.9417, lng: -88.7936 }
  },
  {
    id: 5,
    title: "Catedral Metropolitana",
    description: "La arquitectura religiosa más importante de El Salvador. Un lugar de paz y contemplación en el corazón de San Salvador.",
    location: "Catedral Metropolitana",
    image: "https://images.unsplash.com/photo-1485945371519-b21cc028cb2f?w=500&h=350&fit=crop",
    coordinates: { lat: 13.6929, lng: -89.2167 }
  },
  {
    id: 6,
    title: "Bosque El Imposible",
    description: "Una reserva natural con una biodiversidad increíble. Caminos entre árboles centenarios y aire puro de la naturaleza.",
    location: "Bosque El Imposible",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=350&fit=crop",
    coordinates: { lat: 13.8667, lng: -89.9333 }
  },
  {
    id: 7,
    title: "Salas del Museo Nacional de Antropología",
    description: "Recorrido por las salas del MUNA, con piezas arqueológicas y etnográficas que cuentan la historia de El Salvador.",
    location: "MUNA",
    image: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=500&h=350&fit=crop",
    coordinates: { lat: 13.7020, lng: -89.2230 }
  },
  {
    id: 8,
    title: "Acrópolis de las Ruinas de San Andrés",
    description: "La gran plaza ceremonial maya de San Andrés, rodeada de vegetación y con el volcán de fondo.",
    location: "Ruinas de San Andrés",
    image: "https://images.unsplash.com/photo-1518537774776-6d0c9de1efba?w=500&h=350&fit=crop",
    coordinates: { lat: 13.8044, lng: -89.3939 }
  },
  {
    id: 9,
    title: "Taller de añil en Casa Blanca",
    description: "Aprendiendo el proceso artesanal del teñido con añil en el taller demostrativo de Casa Blanca, Chalchuapa.",
    location: "Casa Blanca",
    image: "https://images.unsplash.com/photo-1528283260755-3a97f5e88af1?w=500&h=350&fit=crop",
    coordinates: { lat: 13.9825, lng: -89.6825 }
  },
  {
    id: 10,
    title: "Salones del Palacio Nacional",
    description: "Los salones Azul, Rojo y Amarillo del Palacio Nacional, con su mármol italiano y detalles neoclásicos.",
    location: "Palacio Nacional",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=500&h=350&fit=crop",
    coordinates: { lat: 13.6989, lng: -89.1912 }
  },
  {
    id: 11,
    title: "Noche de gala en el Teatro Nacional",
    description: "El teatro más antiguo de Centroamérica, con sus balcones dorados y terciopelo rojo, listo para una función.",
    location: "Teatro Nacional",
    image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=500&h=350&fit=crop",
    coordinates: { lat: 13.6980, lng: -89.1918 }
  },
  {
    id: 12,
    title: "Vitrales de la Iglesia El Rosario",
    description: "El arcoíris de luz que atraviesa los vitrales de la Iglesia El Rosario en el Centro Histórico de San Salvador.",
    location: "Iglesia El Rosario",
    image: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=500&h=350&fit=crop",
    coordinates: { lat: 13.6972, lng: -89.1905 }
  }
];

// ════════════════════════════════════
// MAPA DE SLUGS DE SITIO (usados en las URLs con ?sitio=slug)
// Debe mantenerse alineado con SLUG_TO_LANDMARK_ID en mapa.js
// ════════════════════════════════════
const SITE_SLUG_TO_LOCATION = {
  salvador: 'Salvador del Mundo',
  tazumal: 'Tazumal',
  joya: 'Joya de Cerén',
  suchitoto: 'Suchitoto',
  catedral: 'Catedral Metropolitana',
  muna: 'MUNA',
  sanandres: 'Ruinas de San Andrés',
  casablanca: 'Casa Blanca',
  palacionacional: 'Palacio Nacional',
  teatronacional: 'Teatro Nacional',
  elrosario: 'Iglesia El Rosario'
};

// Slug actualmente activo como filtro (null = mostrar todas)
let activeSiteSlug = null;

// Variable global para controlar si el usuario está logeado o no
let isUserLoggedIn = false;

// ════════════════════════════════════
// RENDERIZAR PUBLICACIONES
// ════════════════════════════════════
function renderPublications() {
  const grid = document.getElementById('publicationsGrid');
  const emptyState = document.getElementById('emptyState');

  const filtered = activeSiteSlug
    ? publicationsData.filter(pub => pub.location === SITE_SLUG_TO_LOCATION[activeSiteSlug])
    : publicationsData;

  if (filtered.length === 0) {
    emptyState.style.display = 'block';
    grid.innerHTML = '';
    return;
  }

  emptyState.style.display = 'none';
  grid.innerHTML = filtered.map(pub => `
    <article class="publication-card" data-location="${pub.location}" data-lat="${pub.coordinates.lat}" data-lng="${pub.coordinates.lng}">
      <div class="publication-image-container">
        <img src="${pub.image}" alt="${pub.title}" loading="lazy">
        <div class="publication-image-overlay">
          <span class="publication-image-overlay-text">Ver en mapa</span>
        </div>
      </div>
      <div class="publication-content">
        <h3 class="publication-title">${pub.title}</h3>
        <p class="publication-description">${pub.description}</p>
        <div class="publication-location">
          <div class="publication-location-icon">📍</div>
          <div class="publication-location-text">${pub.location}</div>
        </div>
        <div class="publication-action">
          <button class="publication-btn">Ir al Mapa</button>
        </div>
      </div>
    </article>
  `).join('');

  // Agregar event listeners a las tarjetas
  document.querySelectorAll('.publication-card').forEach(card => {
    card.addEventListener('click', handleCardClick);
  });
}

// ════════════════════════════════════
// MOSTRAR MODAL DE INVITACIÓN (GSAP)
// ════════════════════════════════════
function showGuestModal() {
  const overlay = document.getElementById('guestModalOverlay');
  const modal = document.getElementById('guestModal');

  if (overlay && modal) {
    // 1. Cambiamos los textos para orientarlos a la sección de mapas
    const modalTitle = modal.querySelector('.guest-modal__title');
    const modalText = modal.querySelector('.guest-modal__text');

    if (modalTitle) modalTitle.textContent = "¡Únete a Raíces SV! 🗺️";
    if (modalText) modalText.textContent = "Necesitas una cuenta registrada para poder explorar nuestro mapa interactivo y descubrir la ubicación exacta de estos lugares increíbles.";

    // 2. Hacer visible el overlay
    overlay.classList.add('is-visible');

    // 3. Ejecutar la animación suave utilizando GSAP
    if (window.gsap) {
      gsap.set(modal, { opacity: 0, y: 30, scale: 0.9 });
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to(modal, { opacity: 1, y: 0, scale: 1, duration: 0.5 })
        .from(modal.querySelectorAll('.guest-modal__icon, .guest-modal__title, .guest-modal__text, .guest-modal__btn, .guest-modal__skip'), {
          opacity: 0,
          y: 12,
          duration: 0.35,
          stagger: 0.06
        }, '-=0.25');

      gsap.to(modal.querySelector('.guest-modal__icon'), {
        rotate: 8,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1
      });
    }

    // 4. Configurar eventos para cerrar el modal
    const closeBtn = document.getElementById('guestModalClose');
    const skipBtn = document.getElementById('guestModalSkip');

    const closeModal = () => {
      if (window.gsap) {
        gsap.to(modal, {
          opacity: 0,
          y: 20,
          scale: 0.94,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => overlay.classList.remove('is-visible')
        });
      } else {
        overlay.classList.remove('is-visible');
      }
    };

    closeBtn?.addEventListener('click', closeModal, { once: true });
    skipBtn?.addEventListener('click', closeModal, { once: true });
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) closeModal();
    }, { once: true });
  }
}

// ════════════════════════════════════
// MANEJAR CLIC EN TARJETA
// ════════════════════════════════════
function handleCardClick(e) {
  // Si el usuario no ha iniciado sesión, evitamos la redirección y mostramos tu modal
  if (!isUserLoggedIn) {
    e.preventDefault();
    e.stopPropagation();
    showGuestModal();
    return;
  }

  // Si está logeado, continúa su flujo hacia el mapa normalmente
  const card = e.currentTarget;
  const location = card.dataset.location;
  const lat = parseFloat(card.dataset.lat);
  const lng = parseFloat(card.dataset.lng);

  if (!location || Number.isNaN(lat) || Number.isNaN(lng)) return;

  const params = new URLSearchParams({
    location,
    lat: lat.toString(),
    lng: lng.toString()
  });

  window.location.href = `/views/mapa.html?${params.toString()}`;
}

// ════════════════════════════════════
// CONTROL DE ACCESOS PARA SUBIDA
// ════════════════════════════════════
function checkGuestFormAccess() {
  const formSection = document.querySelector('.create-publication-section');
  if (!formSection) return;

  // Si no está logeado, agregamos el overlay bloqueador al formulario
  if (!isUserLoggedIn) {
    formSection.classList.add('is-guest');

    // Creamos dinámicamente la capa de bloqueo del formulario de creación
    const overlay = document.createElement('div');
    overlay.className = 'guest-blocker-overlay';
    overlay.innerHTML = `
      <div class="blocker-content">
        <div class="blocker-icon">🔒</div>
        <h3 class="blocker-title">¿Quieres compartir un lugar?</h3>
        <p class="blocker-text">Inicia sesión o regístrate en la plataforma para poder subir tus propias fotos de El Salvador.</p>
        <button class="blocker-btn" onclick="window.location.href='/views/login.html'">Iniciar Sesión / Registrarse</button>
      </div>
    `;
    formSection.appendChild(overlay);

    // Deshabilitar todos los controles dentro del formulario para seguridad extra
    const inputs = formSection.querySelectorAll('input, textarea, select, button');
    inputs.forEach(input => {
      input.disabled = true;
      input.tabIndex = -1; // Evita enfocar con la tecla TAB
    });
  }
}

// ════════════════════════════════════
// MANEJAR FORMULARIO
// ════════════════════════════════════
document.getElementById('publicationForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Bloqueo de seguridad extra para invitados maliciosos
  if (!isUserLoggedIn) {
    showGuestModal();
    return;
  }

  const title = document.getElementById('pubTitle').value;
  const description = document.getElementById('pubDescription').value;
  const location = document.getElementById('pubLocation').value;
  const imageFile = document.getElementById('pubImage').files[0];

  if (!imageFile) {
    alert('Por favor sube una imagen');
    return;
  }

  const imageUrl = URL.createObjectURL(imageFile);

  const locationData = {
    'Tazumal': { lat: 13.9286, lng: -89.6469 },
    'Joya de Cerén': { lat: 13.8238, lng: -89.3953 },
    'Salvador del Mundo': { lat: 13.7029, lng: -89.2073 },
    'Suchitoto': { lat: 13.9417, lng: -88.7936 },
    'Catedral Metropolitana': { lat: 13.6929, lng: -89.2167 },
    'MUNA': { lat: 13.6952, lng: -89.2233 },
    'Ruinas de San Andrés': { lat: 13.8639, lng: -89.4317 },
    'Casa Blanca': { lat: 13.9825, lng: -89.6825 },
    'Palacio Nacional': { lat: 13.6989, lng: -89.1912 },
    'Teatro Nacional': { lat: 13.6980, lng: -89.1918 },
    'Iglesia El Rosario': { lat: 13.6972, lng: -89.1905 },
    'El Boquerón': { lat: 13.6844, lng: -89.2272 },
    'Lago de Coatepeque': { lat: 13.8753, lng: -89.5417 },
    'Bosque El Imposible': { lat: 13.8667, lng: -89.9333 },
    'Puerta del Diablo': { lat: 13.6486, lng: -89.1403 }
  };

  const coords = locationData[location] || { lat: 13.6929, lng: -89.2167 };

  const newPublication = {
    id: publicationsData.length + 1,
    title,
    description,
    location,
    image: imageUrl,
    coordinates: coords
  };

  publicationsData.unshift(newPublication);

  renderPublications();

  this.reset();
  document.getElementById('imagePreview').classList.remove('show');

  document.querySelector('.publications-section').scrollIntoView({ behavior: 'smooth' });

  alert('✅ ¡Publicación creada exitosamente!');
});

// ════════════════════════════════════
// MANEJAR SUBIDA DE IMAGEN
// ════════════════════════════════════
document.getElementById('pubImage').addEventListener('change', function(e) {
  if (!isUserLoggedIn) return;
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      document.getElementById('previewImg').src = event.target.result;
      document.getElementById('imagePreview').classList.add('show');
    };
    reader.readAsDataURL(file);
  }
});

// Botón para eliminar imagen
document.getElementById('removeImage').addEventListener('click', function(e) {
  e.preventDefault();
  document.getElementById('pubImage').value = '';
  document.getElementById('imagePreview').classList.remove('show');
});

// ════════════════════════════════════
// DRAG & DROP PARA IMAGEN
// ════════════════════════════════════
const fileLabel = document.querySelector('.form-file-label');

if (fileLabel) {
  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    fileLabel.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    fileLabel.addEventListener(eventName, () => {
      if (isUserLoggedIn) {
        fileLabel.style.background = 'linear-gradient(135deg, rgba(190, 142, 86, 0.35) 0%, rgba(17, 48, 104, 0.35) 100%)';
        fileLabel.style.borderColor = '#a87a42';
      }
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    fileLabel.addEventListener(eventName, () => {
      if (isUserLoggedIn) {
        fileLabel.style.background = 'linear-gradient(135deg, rgba(190, 142, 86, 0.15) 0%, rgba(17, 48, 104, 0.15) 100%)';
        fileLabel.style.borderColor = '#be8e56';
      }
    });
  });

  fileLabel.addEventListener('drop', (e) => {
    if (!isUserLoggedIn) return;
    const dt = e.dataTransfer;
    const files = dt.files;
    document.getElementById('pubImage').files = files;
    document.getElementById('pubImage').dispatchEvent(new Event('change', { bubbles: true }));
  });
}

// ════════════════════════════════════
// FILTRO POR SITIO (desde el botón "Ver publicaciones" de sitios-culturales.html)
// ════════════════════════════════════
function actualizarEmptyStateTexto() {
  const emptyState = document.getElementById('emptyState');
  if (!emptyState) return;
  const titulo = emptyState.querySelector('p');
  if (!titulo) return;
  if (activeSiteSlug) {
    const nombre = SITE_SLUG_TO_LOCATION[activeSiteSlug];
    titulo.textContent = `Aún no hay publicaciones de ${nombre}`;
  } else {
    titulo.textContent = 'No hay publicaciones aún';
  }
}

function aplicarFiltroSitio(slug) {
  activeSiteSlug = slug;

  const filterBar = document.getElementById('publicationsFilter');
  const filterName = document.getElementById('publicationsFilterName');

  if (slug && SITE_SLUG_TO_LOCATION[slug]) {
    filterBar?.classList.add('is-active');
    if (filterName) filterName.textContent = SITE_SLUG_TO_LOCATION[slug];
  } else {
    activeSiteSlug = null;
    filterBar?.classList.remove('is-active');
  }

  actualizarEmptyStateTexto();
  renderPublications();
}

function inicializarFiltroDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('sitio');
  aplicarFiltroSitio(slug);
}

document.getElementById('publicationsFilterClear')?.addEventListener('click', () => {
  // Limpiamos el filtro y también el parámetro de la URL, sin recargar la página
  const url = new URL(window.location.href);
  url.searchParams.delete('sitio');
  window.history.replaceState({}, '', url);
  aplicarFiltroSitio(null);
  document.querySelector('.publications-section')?.scrollIntoView({ behavior: 'smooth' });
});

// ════════════════════════════════════
// INICIALIZAR Y COMPROBAR AUTENTICACIÓN
// ════════════════════════════════════
inicializarFiltroDesdeURL();

// Consultamos al backend/servidor si el usuario está logeado (tal como lo haces en categorias.html)
fetch('/auth/status')
  .then((response) => response.json())
  .then((data) => {
    isUserLoggedIn = !!data.loggedIn;
    checkGuestFormAccess();
  })
  .catch(() => {
    // Si falla la consulta o estás probando de forma local (offline),
    // asumimos que el usuario no está logeado para proteger el formulario y las tarjetas
    isUserLoggedIn = false;
    checkGuestFormAccess();
  });