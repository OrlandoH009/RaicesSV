/* ============================================================
   RAÍCES SV — script.js   (compartido en todas las páginas)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 30);
    });
  }

  /* ── Drawer (menú hamburguesa lateral) ── */
  const burger   = document.getElementById('burger');
  const drawer   = document.getElementById('navDrawer');
  const overlay  = document.getElementById('navOverlay');

  const defaultAvatarSVG = `
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="avatar">
      <rect width="24" height="24" rx="6" fill="rgba(255,255,255,0.06)" />
      <path d="M12 12a3 3 0 100-6 3 3 0 000 6z" fill="#fff" />
      <path d="M4 20a8 8 0 0116 0" fill="#fff" opacity="0.9" />
    </svg>
  `;

  // Reconstruir el contenido del drawer para mantenerlo consistente
  // en todas las vistas. El grupo "Principales" (los mismos links del
  // navbar) solo se muestra en pantallas móviles vía CSS, ya que en
  // escritorio esos links ya están visibles en el navbar de arriba.
  // El bloque de perfil/autoridad lo rellena renderAuthMenu().
  if (drawer) {
    drawer.innerHTML = `
      <div class="nav-drawer__head"><span>Menú</span></div>
      <a href="../views/perfil.html" class="drawer-profile" id="drawerProfile">
        <div class="drawer-avatar" id="drawerAvatar" aria-hidden="true">
          ${defaultAvatarSVG}
        </div>
        <div class="drawer-username" id="drawerUsername">Invitado</div>
      </a>
      <div class="drawer-group--principales">
        <div class="drawer-section-label">Principales</div>
        <a href="../views/index.html" class="drawer-link">Inicio</a>
        <a href="../views/categorias.html" class="drawer-link">Categorías</a>
        <a href="../views/mapa.html" class="drawer-link">Mapa</a>
        <a href="../views/calendario.html" class="drawer-link">Calendario</a>
        <div class="drawer-divider"></div>
      </div>
      <div class="drawer-section-label drawer-label--extras">Extras</div>
      <a href="../views/quiz.html" class="drawer-link">Quiz Cultural</a>
      <a href="../views/juegos.html" class="drawer-link">Juegos interactivo</a>
      <a href="../views/recetas.html" class="drawer-link">Recetario</a>
      <a href="../views/publicaciones.html" class="drawer-link">Publicaciones</a>
      <div class="drawer-divider"></div>
      <div class="drawer-auth"></div>
    `;
  }

  function openDrawer() {
    drawer?.classList.add('open');
    overlay?.classList.add('open');
    burger?.classList.add('open');
    burger?.setAttribute('aria-label', 'Cerrar menú');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer?.classList.remove('open');
    overlay?.classList.remove('open');
    burger?.classList.remove('open');
    burger?.setAttribute('aria-label', 'Abrir menú');
    document.body.style.overflow = '';
  }

  burger?.addEventListener('click', () =>
    drawer?.classList.contains('open') ? closeDrawer() : openDrawer()
  );
  overlay?.addEventListener('click', closeDrawer);
  drawer?.addEventListener('click', (event) => {
    const target = event.target.closest('a, button');
    if (target && drawer.contains(target)) {
      closeDrawer();
    }
  });

  const authContainer = document.querySelector('.drawer-auth');
  const showNotice = (message) => {
    let toast = document.getElementById('raices-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'raices-toast';
      toast.style.cssText = 'position:fixed; right:1rem; top:1rem; z-index:9999; background:#1f4d3f; color:#fff; padding:0.8rem 1rem; border-radius:999px; box-shadow:0 8px 24px rgba(0,0,0,0.2); opacity:0; transform:translateY(-8px); transition:all .25s ease; pointer-events:none;';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    clearTimeout(showNotice.timeout);
    showNotice.timeout = setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-8px)';
    }, 2600);
  };

  const renderAuthMenu = async () => {
    if (!authContainer) return;

    const drawerUsername = document.getElementById('drawerUsername');
    const drawerAvatar = document.getElementById('drawerAvatar');

    try {
      const response = await fetch('/auth/status', { credentials: 'same-origin' });
      const data = await response.json();

      if (data.loggedIn) {
        // Mostrar nombre en el área de perfil
        if (drawerUsername) drawerUsername.textContent = data.user?.name || data.user?.email || 'Usuario';

        if (drawerAvatar) {
          drawerAvatar.innerHTML = data.user?.avatarUrl
            ? `<img src="${data.user.avatarUrl}" alt="Tu foto de perfil" style="width:100%;height:100%;object-fit:cover;border-radius:8px;" />`
            : defaultAvatarSVG;
        }

        authContainer.innerHTML = `
          <p class="drawer-auth-label">Conectado</p>
          <a href="../views/perfil.html" class="btn-login">Mi perfil</a>
          <button type="button" class="btn-logout" id="logout-link">Cerrar sesión</button>
        `;
      } else {
        if (drawerUsername) drawerUsername.textContent = 'Invitado';
        if (drawerAvatar) drawerAvatar.innerHTML = defaultAvatarSVG;

        authContainer.innerHTML = `
          <p class="drawer-auth-label">Mi cuenta</p>
          <a href="../views/login.html" class="btn-login">Iniciar Sesión</a>
          <a href="../views/registro.html" class="btn-register">Registrarse</a>
        `;
      }
    } catch (error) {
      console.error(error);
    }
  };

  renderAuthMenu();

  document.addEventListener('click', async (event) => {
    const logoutButton = event.target.closest('#logout-link, .btn-logout');
    if (!logoutButton) return;

    event.preventDefault();
    try {
      const response = await fetch('/logout', {
        method: 'POST',
        credentials: 'same-origin'
      });
      const data = await response.json().catch(() => ({}));
      showNotice(data.message || 'Sesión cerrada correctamente');
      window.location.href = data.redirect || '/login.html?loggedout=1';
    } catch (error) {
      showNotice('No se pudo cerrar la sesión');
    }
  });

  const params = new URLSearchParams(window.location.search);
  if (params.get('loggedout') === '1') {
    showNotice('Sesión cerrada correctamente');
  }
  if (params.get('cuentaEliminada') === '1') {
    showNotice('Tu cuenta fue eliminada correctamente');
  }

  /* ── Verificar protección de rutas ── */
  const protectedPages = ['mapa.html', 'mapa', '/mapa'];
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  if (protectedPages.some(p => window.location.href.includes(p))) {
    fetch('/auth/status', { credentials: 'same-origin' })
      .then(r => r.json())
      .then(data => {
        if (!data.loggedIn) {
          window.location.href = '/login.html?redirect=' + encodeURIComponent(window.location.pathname);
        }
      })
      .catch(() => {
        window.location.href = '/login.html';
      });
  }

  const redirectParam = params.get('redirect');
  if (redirectParam && params.get('loggedout') !== '1') {
    const checkRedirect = async () => {
      const response = await fetch('/auth/status', { credentials: 'same-origin' });
      const data = await response.json();
      if (data.loggedIn && !window.location.href.includes('redirect')) {
        window.location.href = decodeURIComponent(redirectParam);
      }
    };
    checkRedirect();
  }

  /* ── Active link ── */
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__links a, .drawer-link').forEach(a => {
    const href = a.getAttribute('href') || '';
    const hrefPage = href.split('/').pop();
    a.classList.toggle('active', hrefPage === page);
  });

  /* ── Scroll Reveal (se omite si la página usa animaciones GSAP propias) ── */
  if (!document.body.hasAttribute('data-gsap-reveal')) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

});

/* ============================================================
   MODAL DE BLOQUEO — contenido exclusivo para usuarios registrados
   (Bloque agregado, no modifica nada existente)
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const lockPages = ['mapa.html', 'calendario.html', 'eventos.html', 'gastronomia.html', 'historia.html', 'leyendas.html', 'quiz.html', 'recetas.html', 'sitios-culturales.html', 'juegos.html'];

  const lockModalHTML = `
    <div class="lock-modal-overlay" id="lockModalOverlay">
      <div class="lock-modal" id="lockModal" role="dialog" aria-modal="true" aria-labelledby="lockModalTitle">
        <button class="lock-modal__close" id="lockModalClose" aria-label="Cerrar">&times;</button>
        <div class="lock-modal__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="10" width="16" height="10" rx="2"/>
            <path d="M8 10V7a4 4 0 0 1 8 0v3"/>
          </svg>
        </div>
        <h3 class="lock-modal__title" id="lockModalTitle">¡Un momento!</h3>
        <p class="lock-modal__text">
          Perdona, debes registrarte para poder seguir disfrutando de nuestra información.
          Es rápido y gratis.
        </p>
        <div class="lock-modal__actions">
          <a href="/registro.html" class="lock-modal__btn lock-modal__btn--primary" id="lockModalRegister">Registrarme</a>
          <a href="/login.html" class="lock-modal__btn lock-modal__btn--secondary" id="lockModalLogin">Ya tengo cuenta</a>
        </div>
      </div>
    </div>
  `;

  if (!document.getElementById('lockModalOverlay')) {
    document.body.insertAdjacentHTML('beforeend', lockModalHTML);
  }

  const lockOverlay = document.getElementById('lockModalOverlay');
  const lockClose = document.getElementById('lockModalClose');
  const lockRegisterBtn = document.getElementById('lockModalRegister');
  const lockLoginBtn = document.getElementById('lockModalLogin');

  const openLockModal = (destinationPath) => {
    const redirectTo = destinationPath ? '?redirect=' + encodeURIComponent(destinationPath) : '';
    if (lockRegisterBtn) lockRegisterBtn.href = '/registro.html' + redirectTo;
    if (lockLoginBtn) lockLoginBtn.href = '/login.html' + redirectTo;

    lockOverlay?.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  };

  const closeLockModal = () => {
    lockOverlay?.classList.remove('is-visible');
    document.body.style.overflow = '';
  };

  lockClose?.addEventListener('click', closeLockModal);
  lockOverlay?.addEventListener('click', (event) => {
    if (event.target === lockOverlay) closeLockModal();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lockOverlay?.classList.contains('is-visible')) closeLockModal();
  });

  // Interceptar cualquier click sobre un enlace que apunte a una vista protegida.
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href') || '';
    const fileName = href.split('/').pop().split('?')[0].split('#')[0];

    if (!lockPages.includes(fileName)) return;

    event.preventDefault();

    fetch('/auth/status', { credentials: 'same-origin' })
      .then(r => r.json())
      .then(data => {
        if (!data.loggedIn) {
          const destUrl = new URL(link.href, window.location.origin);
          openLockModal(destUrl.pathname + destUrl.search);
        } else {
          window.location.href = link.href;
        }
      })
      .catch(() => {
        window.location.href = link.href;
      });
  });
});