// ════════════════════════════════════
// MAPA DE SLUGS DE SITIO (usados en las URLs con ?sitio=slug)
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
  elrosario: 'Iglesia El Rosario',

  // Eventos Culturales
  agostinas: 'Fiestas Agostinas',
  semanasanta: 'Semana Santa Nacional',
  independencia: 'Día de la Independencia',
  difuntos: 'Día de los Difuntos',
  navidad: 'Navidad y Posadas',
  fiestasjulias: 'Fiestas Julias',
  carnavalsm: 'Gran Carnaval de San Miguel',
  festivalsuchitoto: 'Festival de Suchitoto',
  calabiuza: 'Día de la Calabiuza',
  farolitosataco: 'Día de los Farolitos',
  festivalanil: 'Festival del Añil',
  festivalbarro: 'Festival del Barro',
  flores: 'Festival de las Flores y Palmas',
  chicharron: 'Festival Internacional del Chicharrón',
  jocote: 'Festival del Jocote Corona'
};

// Slug actualmente activo como filtro (null = mostrar todas)
let activeSiteSlug = null;

// Variable global para controlar si el usuario está logeado o no
let isUserLoggedIn = false;
let currentUserId = null;
let editingPublicationId = null;

// ════════════════════════════════════
// MANEJO DEL SELECT "OTRO" DE UBICACIÓN
// ════════════════════════════════════
const locationSelect = document.getElementById('pubLocation');
const locationOtherInput = document.getElementById('pubLocationOther');

locationSelect.addEventListener('change', () => {
  if (locationSelect.value === '__otro__') {
    locationOtherInput.style.display = 'block';
    locationOtherInput.focus();
  } else {
    locationOtherInput.style.display = 'none';
    locationOtherInput.value = '';
  }
});

function getSelectedLocation() {
  if (locationSelect.value === '__otro__') {
    return locationOtherInput.value.trim();
  }
  return locationSelect.value;
}

// ════════════════════════════════════
// TRAER PUBLICACIONES DESDE EL SERVIDOR
// ════════════════════════════════════
async function fetchPublications() {
  const params = new URLSearchParams();
  if (activeSiteSlug && SITE_SLUG_TO_LOCATION[activeSiteSlug]) {
    params.set('location', SITE_SLUG_TO_LOCATION[activeSiteSlug]);
  }

  const url = params.toString() ? `/api/publications?${params.toString()}` : '/api/publications';

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('No se pudieron cargar las publicaciones');
    }
    const data = await response.json();
    renderPublications(data.publications || []);
  } catch (error) {
    console.error(error);
    renderPublications([]);
  }
}

// ════════════════════════════════════
// RENDERIZAR PUBLICACIONES
// ════════════════════════════════════
function renderPublications(publications) {
  const grid = document.getElementById('publicationsGrid');
  const emptyState = document.getElementById('emptyState');

  if (publications.length === 0) {
    emptyState.style.display = 'block';
    grid.innerHTML = '';
    return;
  }

  emptyState.style.display = 'none';
  grid.innerHTML = publications.map(pub => `
    <article class="publication-card" data-id="${pub.id}">
      <div class="publication-image-container">
        <img src="${pub.image}" alt="${pub.title}" loading="lazy">
      </div>
      <div class="publication-content">
        <h3 class="publication-title">${pub.title}</h3>
        <p class="publication-description">${pub.description}</p>
        <div class="publication-location">
          <div class="publication-location-icon">📍</div>
          <div class="publication-location-text">${pub.location}</div>
        </div>
        <div class="publication-author">
          <span>Por ${pub.author.name}</span>
        </div>
        ${(pub.canEdit || pub.canDelete) ? `
          <div class="publication-owner-actions">
            ${pub.canEdit ? `<button type="button" class="publication-edit-btn" data-id="${pub.id}">Editar</button>` : ''}
            ${pub.canDelete ? `<button type="button" class="publication-delete-btn" data-id="${pub.id}">Eliminar</button>` : ''}
          </div>
        ` : ''}
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.publication-edit-btn').forEach(btn => {
    btn.addEventListener('click', () => startEditPublication(btn.dataset.id));
  });

  document.querySelectorAll('.publication-delete-btn').forEach(btn => {
    btn.addEventListener('click', () => confirmDeletePublication(btn.dataset.id));
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

    if (modalTitle) modalTitle.textContent = "¡Únete a Salvadorean Roots! 🗺️";
    if (modalText) modalText.textContent = "Necesitas una cuenta registrada para poder explorar nuestro mapa interactivo y descubrir la ubicación exacta de estos lugares increíbles.";

    // 2. Hacer visible el overlay
    overlay.classList.add('is-visible');


    // 3. Ejecutar la animación suave utilizando GSAP
    if (window.gsap) {
      gsap.set(modal, { opacity: 0, y: 30, scale: 0.9 });
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to(modal, { opacity: 1, y: 0, scale: 1, duration: 0.5 })
        // 👇 CAMBIAMOS '.guest-modal__btn' POR '.guest-modal__actions' AQUÍ ABAJO:
        .from(modal.querySelectorAll('.guest-modal__icon, .guest-modal__title, .guest-modal__text, .guest-modal__actions, .guest-modal__skip'), {
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
// ════════════════════════════════════
// MANEJAR CLIC EN TARJETA (Corregido)
// ════════════════════════════════════
function handleCardClick(e) {
  // Prevenir cualquier comportamiento extraño y detener propagación
  e.preventDefault();
  e.stopPropagation();

  // Si el usuario no ha iniciado sesión, mostramos tu modal de invitación
  if (!isUserLoggedIn) {
    showGuestModal();
    return;
  }

  // Si está logeado, obtenemos los datos de la tarjeta contenedora
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
// CONTROL DE ACCESOS PARA SUBIDA (Corregido con Event Listener Directo)
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
      <div class="blocker-content" style="position: relative; z-index: 20;">
        <div class="blocker-icon">🔒</div>
        <h3 class="blocker-title">¿Quieres compartir un lugar?</h3>
        <p class="blocker-text">Inicia sesión o regístrate en la plataforma para poder subir tus propias fotos de El Salvador.</p>
        <button class="blocker-btn" id="goToLoginBtn" type="button" style="pointer-events: auto; cursor: pointer;">Iniciar Sesión / Registrarse</button>
      </div>
    `;
    formSection.appendChild(overlay);

    // Asignamos el evento de redirección directamente con JavaScript
    const loginBtn = document.getElementById('goToLoginBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = 'login.html';
      });
    }

    // Deshabilitar únicamente los elementos originales del formulario interno
    const originalForm = document.getElementById('publicationForm');
    if (originalForm) {
      const inputs = originalForm.querySelectorAll('input, textarea, select, button');
      inputs.forEach(input => {
        // Evitamos deshabilitar nuestro nuevo botón de login por accidente
        if (input.id !== 'goToLoginBtn') {
          input.disabled = true;
          input.tabIndex = -1;
        }
      });
    }
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