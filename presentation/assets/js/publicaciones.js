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
let lastPublications = [];

// ── Escapa texto/atributos antes de insertarlos vía innerHTML (previene XSS) ──
function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[c]));
}

// ── Función de traducción (i18n) ──
function t(key, replacements = {}) {
  if (typeof window.SRi18n === 'undefined') {
    console.warn('i18n no cargado, usando fallback');
    return key;
  }
  const lang = window.SRi18n.getLang();
  let text = window.SRi18n.t(key, lang) || key;
  for (const [k, v] of Object.entries(replacements)) {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  }
  return text;
}

// ════════════════════════════════════
// UBICACIÓN (buscador + mapa Leaflet, ver location-picker.js)
// ════════════════════════════════════
function getSelectedLocation() {
  return document.getElementById('pubLocation').value.trim();
}

function getSelectedCoords() {
  const lat = document.getElementById('pubLocationLat').value;
  const lng = document.getElementById('pubLocationLng').value;
  return {
    lat: lat !== '' ? lat : null,
    lng: lng !== '' ? lng : null
  };
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
    lastPublications = data.publications || [];
    renderPublications(lastPublications);
  } catch (error) {
    console.error(error);
    lastPublications = [];
    renderPublications([]);
  }
}

// ════════════════════════════════════
// RENDERIZAR PUBLICACIONES
// ════════════════════════════════════
function renderPublications(publications) {
  const grid = document.getElementById('publicationsGrid');
  const emptyState = document.getElementById('emptyState');
  const emptyTitle = document.getElementById('emptyStateTitle');

  if (publications.length === 0) {
    emptyState.style.display = 'block';
    grid.innerHTML = '';
    // Actualizar texto del empty state según filtro
    if (activeSiteSlug && SITE_SLUG_TO_LOCATION[activeSiteSlug]) {
      const name = SITE_SLUG_TO_LOCATION[activeSiteSlug];
      emptyTitle.textContent = t('pub.emptyTitleFiltered', { name });
    } else {
      emptyTitle.textContent = t('pub.emptyTitle');
    }
    return;
  }

  emptyState.style.display = 'none';
  grid.innerHTML = publications.map(pub => {
    const initial = escapeHtml((pub.author?.name || '?').trim().charAt(0).toUpperCase());
    const avatarHtml = pub.author?.avatarUrl
      ? `<img src="${escapeHtml(pub.author.avatarUrl)}" alt="">`
      : `<span>${initial}</span>`;
    return `
    <article class="publication-card" data-id="${escapeHtml(pub.id)}">
      <div class="publication-card__header">
        <div class="publication-card__avatar">${avatarHtml}</div>
        <span class="publication-card__username">${escapeHtml(pub.author?.name || '')}</span>
      </div>
      <div class="publication-image-container">
        <img src="${escapeHtml(pub.image)}" alt="${escapeHtml(pub.title)}" loading="lazy">
        <div class="publication-image-overlay">
          <span class="publication-image-overlay-text">${escapeHtml(pub.title)}</span>
        </div>
      </div>
      <div class="publication-card__footer">
        <button type="button" class="publication-like-btn${pub.isLiked ? ' is-liked' : ''}" data-id="${escapeHtml(pub.id)}" aria-label="${escapeHtml(t('pub.likeBtn'))}">
          <span class="publication-like-icon">${pub.isLiked ? '❤️' : '🤍'}</span>
          <span class="publication-like-count">${escapeHtml(pub.likeCount)}</span>
        </button>
      </div>
    </article>
  `;
  }).join('');

  document.querySelectorAll('.publication-card').forEach(card => {
    card.addEventListener('click', () => openPublicationDetail(card.dataset.id));
  });

  document.querySelectorAll('.publication-card .publication-like-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLike(btn.dataset.id);
    });
  });
}

// ════════════════════════════════════
// LIKES
// ════════════════════════════════════
function updateLikeUI(id) {
  const pub = lastPublications.find(p => String(p.id) === String(id));
  if (!pub) return;

  document.querySelectorAll(`.publication-like-btn[data-id="${CSS.escape(String(id))}"]`).forEach(btn => {
    btn.classList.toggle('is-liked', pub.isLiked);
    btn.querySelector('.publication-like-icon').textContent = pub.isLiked ? '❤️' : '🤍';
    btn.querySelector('.publication-like-count').textContent = pub.likeCount;
  });
}

async function toggleLike(id) {
  if (!isUserLoggedIn) {
    showGuestModal();
    return;
  }

  try {
    const response = await fetch(`/api/publications/${id}/like`, { method: 'POST' });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || t('pub.alertErrorLike'));
    }

    const data = await response.json();
    const pub = lastPublications.find(p => String(p.id) === String(id));
    if (pub) {
      pub.isLiked = data.liked;
      pub.likeCount = data.likeCount;
    }
    updateLikeUI(id);
  } catch (error) {
    console.error(error);
    alert(error.message || t('pub.alertErrorLike'));
  }
}

// ════════════════════════════════════
// MODAL DE DETALLE (imagen, autor, descripción y mini-mapa)
// ════════════════════════════════════
let pubDetailMap = null;
let pubDetailMarker = null;

function openPublicationDetail(id) {
  const pub = lastPublications.find(p => String(p.id) === String(id));
  if (!pub) return;

  const overlay = document.getElementById('pubDetailOverlay');
  const modal = document.getElementById('pubDetailModal');

  document.getElementById('pubDetailImage').src = pub.image;
  document.getElementById('pubDetailImage').alt = pub.title;
  document.getElementById('pubDetailTitle').textContent = pub.title;
  document.getElementById('pubDetailDescription').textContent = pub.description;
  document.getElementById('pubDetailLocationText').textContent = pub.location;
  document.getElementById('pubDetailAuthorName').textContent = pub.author?.name || '';

  const avatarImg = document.getElementById('pubDetailAvatar');
  const avatarInitial = document.getElementById('pubDetailAvatarInitial');
  if (pub.author?.avatarUrl) {
    avatarImg.src = pub.author.avatarUrl;
    avatarImg.style.display = 'block';
    avatarInitial.style.display = 'none';
  } else {
    avatarImg.style.display = 'none';
    avatarInitial.style.display = 'block';
    avatarInitial.textContent = (pub.author?.name || '?').trim().charAt(0).toUpperCase();
  }

  const actionsWrap = document.getElementById('pubDetailActions');
  actionsWrap.innerHTML = `
    <button type="button" class="publication-like-btn${pub.isLiked ? ' is-liked' : ''}" data-id="${escapeHtml(pub.id)}" aria-label="${escapeHtml(t('pub.likeBtn'))}">
      <span class="publication-like-icon">${pub.isLiked ? '❤️' : '🤍'}</span>
      <span class="publication-like-count">${escapeHtml(pub.likeCount)}</span>
    </button>
    ${pub.canEdit ? `<button type="button" class="publication-edit-btn" data-id="${escapeHtml(pub.id)}">${escapeHtml(t('pub.editBtn'))}</button>` : ''}
    ${pub.canDelete ? `<button type="button" class="publication-delete-btn" data-id="${escapeHtml(pub.id)}">${escapeHtml(t('pub.deleteBtn'))}</button>` : ''}
  `;
  actionsWrap.querySelector('.publication-like-btn')?.addEventListener('click', () => {
    toggleLike(pub.id);
  });
  actionsWrap.querySelector('.publication-edit-btn')?.addEventListener('click', () => {
    closePublicationDetail();
    startEditPublication(pub.id);
  });
  actionsWrap.querySelector('.publication-delete-btn')?.addEventListener('click', () => {
    closePublicationDetail();
    confirmDeletePublication(pub.id);
  });

  const mapLink = document.getElementById('pubDetailMapLink');
  if (pub.lat && pub.lng) {
    mapLink.href = `mapa.html?pub=${encodeURIComponent(pub.id)}&lat=${encodeURIComponent(pub.lat)}&lng=${encodeURIComponent(pub.lng)}`;
    mapLink.style.display = 'inline';
  } else {
    mapLink.style.display = 'none';
  }

  const mapEl = document.getElementById('pubDetailMap');
  if (pub.lat && pub.lng && window.L) {
    mapEl.style.display = 'block';
    const lat = Number(pub.lat), lng = Number(pub.lng);
    setTimeout(() => {
      if (!pubDetailMap) {
        pubDetailMap = L.map(mapEl, { zoomControl: false, attributionControl: false, scrollWheelZoom: false }).setView([lat, lng], 14);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(pubDetailMap);
        pubDetailMarker = L.marker([lat, lng]).addTo(pubDetailMap);
      } else {
        pubDetailMap.setView([lat, lng], 14);
        pubDetailMarker.setLatLng([lat, lng]);
      }
      pubDetailMap.invalidateSize();
    }, 60);
  } else {
    mapEl.style.display = 'none';
  }

  overlay.classList.add('is-open');
  document.body.style.overflow = 'hidden';
}

function closePublicationDetail() {
  document.getElementById('pubDetailOverlay')?.classList.remove('is-open');
  document.body.style.overflow = '';
}

document.getElementById('pubDetailClose')?.addEventListener('click', closePublicationDetail);
document.getElementById('pubDetailOverlay')?.addEventListener('click', (e) => {
  if (e.target.id === 'pubDetailOverlay') closePublicationDetail();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.getElementById('pubDetailOverlay')?.classList.contains('is-open')) {
    closePublicationDetail();
  }
});

// ════════════════════════════════════
// MOSTRAR MODAL DE INVITACIÓN (GSAP)
// ════════════════════════════════════
function showGuestModal() {
  const overlay = document.getElementById('guestModalOverlay');
  const modal = document.getElementById('guestModal');

  if (overlay && modal) {
    const modalTitle = modal.querySelector('.guest-modal__title');
    const modalText = modal.querySelector('.guest-modal__text');

    if (modalTitle) modalTitle.textContent = t('pub.modalTitle');
    if (modalText) modalText.textContent = t('pub.modalText');

    overlay.classList.add('is-visible');

    if (window.gsap) {
      gsap.set(modal, { opacity: 0, y: 30, scale: 0.9 });
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to(modal, { opacity: 1, y: 0, scale: 1, duration: 0.5 })
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
// CONTROL DE ACCESOS PARA SUBIDA
// ════════════════════════════════════
function checkGuestFormAccess() {
  const formSection = document.querySelector('.create-publication-section');
  if (!formSection) return;

  if (!isUserLoggedIn) {
    formSection.classList.add('is-guest');

    const overlay = document.createElement('div');
    overlay.className = 'guest-blocker-overlay';
    overlay.innerHTML = `
      <div class="blocker-content" style="position: relative; z-index: 20;">
        <div class="blocker-icon">🔒</div>
        <h3 class="blocker-title">${t('pub.guestBlockerTitle')}</h3>
        <p class="blocker-text">${t('pub.guestBlockerText')}</p>
        <button class="blocker-btn" id="goToLoginBtn" type="button" style="pointer-events: auto; cursor: pointer;">${t('pub.guestBlockerBtn')}</button>
      </div>
    `;
    formSection.appendChild(overlay);

    const loginBtn = document.getElementById('goToLoginBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = '/login.html?redirect=' + encodeURIComponent(window.location.pathname);
      });
    }

    const originalForm = document.getElementById('publicationForm');
    if (originalForm) {
      const inputs = originalForm.querySelectorAll('input, textarea, select, button');
      inputs.forEach(input => {
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
document.getElementById('publicationForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  if (!isUserLoggedIn) {
    showGuestModal();
    return;
  }

  const title = document.getElementById('pubTitle').value.trim();
  const description = document.getElementById('pubDescription').value.trim();
  const location = getSelectedLocation();
  const { lat, lng } = getSelectedCoords();
  const imageFile = document.getElementById('pubImage').files[0];

  if (!location) {
    alert(t('pub.alertNoLocation'));
    return;
  }

  if (!lat || !lng) {
    alert(t('pub.alertNoCoords'));
    return;
  }

  if (!editingPublicationId && !imageFile) {
    alert(t('pub.alertNoImage'));
    return;
  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('location', location);
  formData.append('lat', lat);
  formData.append('lng', lng);
  if (imageFile) {
    formData.append('image', imageFile);
  }

  const isEditing = Boolean(editingPublicationId);
  const url = isEditing ? `/api/publications/${editingPublicationId}` : '/api/publications';
  const method = isEditing ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, { method, body: formData });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || t('pub.alertError'));
    }

    resetPublicationForm();
    await fetchPublications();

    document.querySelector('.publications-section').scrollIntoView({ behavior: 'smooth' });
    alert(isEditing ? t('pub.alertUpdateSuccess') : t('pub.alertCreateSuccess'));
  } catch (error) {
    console.error(error);
    alert(error.message || t('pub.alertError'));
  }
});

function resetPublicationForm() {
  const form = document.getElementById('publicationForm');
  form.reset();
  document.getElementById('imagePreview').classList.remove('show');
  window.LocationPicker?.reset();
  editingPublicationId = null;
  document.getElementById('publicationFormTitle').textContent = t('pub.formTitle');
  document.getElementById('publicationSubmitBtn').textContent = t('pub.submitBtn');
  document.getElementById('publicationCancelEditBtn').style.display = 'none';
}

document.getElementById('publicationCancelEditBtn').addEventListener('click', () => {
  resetPublicationForm();
});

// ═══════════════════════════════════════════
// EDITAR PUBLICACIÓN QUE EL USUARIO PUBLIQUE
// ════════════════════════════════════════════

async function startEditPublication(id) {
  try {
    const response = await fetch(`/api/publications/${id}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || t('pub.alertErrorLoad'));
    }

    const data = await response.json();
    const pub = data.publication;

    editingPublicationId = pub.id;

    document.getElementById('pubTitle').value = pub.title;
    document.getElementById('pubDescription').value = pub.description;

    window.LocationPicker?.loadExisting(pub.location, pub.lat, pub.lng);

    document.getElementById('pubImage').value = '';
    document.getElementById('previewImg').src = pub.image;
    document.getElementById('imagePreview').classList.add('show');

    document.getElementById('publicationFormTitle').textContent = t('pub.formTitleEdit');
    document.getElementById('publicationSubmitBtn').textContent = t('pub.submitBtn');
    document.getElementById('publicationCancelEditBtn').style.display = 'inline-block';

    document.querySelector('.create-publication-section').scrollIntoView({ behavior: 'smooth' });
  } catch (error) {
    console.error(error);
    alert(error.message || t('pub.alertErrorLoad'));
  }
}

// ════════════════════════════════════
// ELIMINAR PUBLICACIÓN
// ════════════════════════════════════

async function confirmDeletePublication(id) {
  const confirmed = window.confirm(t('pub.alertDeleteConfirm'));
  if (!confirmed) return;

  try {
    const response = await fetch(`/api/publications/${id}`, { method: 'DELETE' });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || t('pub.alertErrorDelete'));
    }

    if (editingPublicationId === id) {
      resetPublicationForm();
    }

    await fetchPublications();
    alert(t('pub.alertDeleteSuccess'));
  } catch (error) {
    console.error(error);
    alert(error.message || t('pub.alertErrorDelete'));
  }
}

// ════════════════════════════════════
// MANEJAR SUBIDA DE IMAGEN
// ════════════════════════════════════
document.getElementById('pubImage').addEventListener('change', function(e) {
  if (!isUserLoggedIn) return;
  const file = e.target.files[0];
  if (file) {
    // Validaciones básicas (opcional, pero se pueden mostrar mensajes traducidos)
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert(t('pub.alertImageFormat'));
      this.value = '';
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      alert(t('pub.alertImageSize'));
      this.value = '';
      return;
    }
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
  const titulo = emptyState.querySelector('#emptyStateTitle');
  if (!titulo) return;
  if (activeSiteSlug) {
    const nombre = SITE_SLUG_TO_LOCATION[activeSiteSlug];
    titulo.textContent = t('pub.emptyTitleFiltered', { name: nombre });
  } else {
    titulo.textContent = t('pub.emptyTitle');
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
  fetchPublications();
}

function inicializarFiltroDesdeURL() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get('sitio');
  aplicarFiltroSitio(slug);
}

document.getElementById('publicationsFilterClear')?.addEventListener('click', () => {
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

fetch('/auth/status')
  .then((response) => response.json())
  .then((data) => {
    isUserLoggedIn = !!data.loggedIn;
    currentUserId = data.user ? data.user.id : null;
    checkGuestFormAccess();
    // Si el usuario está logueado, quitar el bloqueo y habilitar el formulario
    if (isUserLoggedIn) {
      const formSection = document.querySelector('.create-publication-section');
      const blocker = formSection?.querySelector('.guest-blocker-overlay');
      if (blocker) blocker.remove();
      const form = document.getElementById('publicationForm');
      if (form) {
        const inputs = form.querySelectorAll('input, textarea, select, button');
        inputs.forEach(input => {
          input.disabled = false;
          input.tabIndex = 0;
        });
      }
    }
  })
  .catch(() => {
    isUserLoggedIn = false;
    currentUserId = null;
    checkGuestFormAccess();
  });

// ════════════════════════════════════
// ESCUCHAR CAMBIOS DE IDIOMA
// ════════════════════════════════════
document.addEventListener('langchange', () => {
  renderPublications(lastPublications);
  actualizarEmptyStateTexto();
});