/* ============================================================
  Salvadorean Roots — script.js   (compartido en todas las páginas)
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
      <div class="nav-drawer__head"><span data-i18n="nav.menu">Menú</span></div>
      <div class="theme-switch-row">
        <span class="theme-switch-label" id="themeSwitchLabel">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
          <span id="themeSwitchText">Modo oscuro</span>
        </span>
        <button type="button" class="theme-switch" id="themeSwitch" role="switch" aria-checked="false" aria-label="Cambiar entre modo claro y oscuro">
          <span class="theme-switch__thumb">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" id="themeSwitchIcon"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
          </span>
        </button>
      </div>
      <a href="../views/perfil.html" class="drawer-profile" id="drawerProfile">
        <div class="drawer-avatar" id="drawerAvatar">
          ${defaultAvatarSVG}
        </div>
        <div>
          <div class="drawer-username" id="drawerUsername" data-i18n="nav.invitado">Invitado</div>
          <span class="drawer-profile-caption" id="drawerProfileCaption" data-i18n="nav.iniciarSesionCaption">Iniciar sesión</span>
        </div>
      </a>
      <div class="drawer-group--principales">
        <div class="drawer-section-label" data-i18n="nav.principales">Principales</div>
        <a href="../views/index.html" class="drawer-link" data-i18n="nav.inicio">Inicio</a>
        <a href="../views/categorias.html" class="drawer-link" data-i18n="nav.categorias">Categorías</a>
        <a href="../views/mapa.html" class="drawer-link" data-i18n="nav.mapa">Mapa</a>
        <a href="../views/calendario.html" class="drawer-link" data-i18n="nav.calendario">Calendario</a>
        <div class="drawer-divider"></div>
      </div>
      <div class="drawer-section-label drawer-label--extras" data-i18n="nav.explorar">Explorar</div>
      <a href="../views/quiz.html" class="drawer-link" data-i18n="nav.quiz">Quiz Cultural</a>
      <a href="../views/publicaciones.html" class="drawer-link" data-i18n="nav.publicaciones">Publicaciones</a>
      <a href="../views/juegos.html" class="drawer-link" data-i18n="nav.juegos">Juegos Interactivos</a>
      <a href="../views/recetas.html" class="drawer-link" data-i18n="nav.recetario">Recetario</a>
      <div class="drawer-divider"></div>
      <div class="drawer-auth"></div>
    `;

    // El drawer se acaba de reconstruir por completo. En vez de traducir
    // solo el drawer, se vuelve a aplicar la traducción a TODO el documento:
    // así se cubre también cualquier nodo dinámico creado por otros scripts
    // (por ejemplo, el botón de mostrar/ocultar contraseña en login.js y
    // registro.js) sin importar el orden de carga entre scripts.
    if (window.SRi18n) {
      window.SRi18n.applyTranslations(window.SRi18n.getLang());
    }
  }
  // Sincroniza el interruptor visual con el tema guardado, ya que el drawer se reconstruye por JS en cada carga de página.
  const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyTheme(currentTheme);

  const themeSwitch = document.getElementById('themeSwitch');
  themeSwitch?.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    applyTheme(isLight ? 'dark' : 'light');
  });

  function openDrawer() {
    drawer?.classList.add('open');
    overlay?.classList.add('open');
    burger?.classList.add('open');
    const closeLabel = window.SRi18n ? window.SRi18n.t('nav.cerrarMenu', window.SRi18n.getLang()) : 'Cerrar menú';
    burger?.setAttribute('aria-label', closeLabel);
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer?.classList.remove('open');
    overlay?.classList.remove('open');
    burger?.classList.remove('open');
    const openLabel = window.SRi18n ? window.SRi18n.t('nav.abrirMenu', window.SRi18n.getLang()) : 'Abrir menú';
    burger?.setAttribute('aria-label', openLabel);
    document.body.style.overflow = '';
  }

  burger?.addEventListener('click', () =>
    drawer?.classList.contains('open') ? closeDrawer() : openDrawer()
  );
  overlay?.addEventListener('click', closeDrawer);
  drawer?.addEventListener('click', (event) => {
    if (event.target.closest('#themeSwitch')) return;
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

  const renderAuthMenu = async (overrideUser) => {
    if (!authContainer) return;

    const drawerUsername = document.getElementById('drawerUsername');
    const drawerAvatar = document.getElementById('drawerAvatar');
    const drawerProfileCaption = document.getElementById('drawerProfileCaption');
    const drawerProfileLink = document.getElementById('drawerProfile');

    try {
      let loggedIn = true;
      let user = overrideUser;

      // Si no nos pasan datos ya frescos (ej. justo tras guardar el perfil),
      // se consulta el estado de sesión como antes.
      if (!user) {
        const response = await fetch('/auth/status', { credentials: 'same-origin' });
        const data = await response.json();
        loggedIn = data.loggedIn;
        user = data.user;
      }

      if (loggedIn) {
        // Mostrar nombre en el área de perfil y remover la clave de traducción de "Invitado"
        if (drawerUsername) {
          drawerUsername.removeAttribute('data-i18n'); // <-- AGREGAR ESTA LÍNEA
          drawerUsername.textContent = user?.name || user?.email || 'Usuario';
        }
        if (drawerProfileCaption) drawerProfileCaption.setAttribute('data-i18n', 'nav.verPerfil');
        if (drawerProfileCaption) drawerProfileCaption.textContent = window.SRi18n
          ? window.SRi18n.t('nav.verPerfil', window.SRi18n.getLang())
          : 'Ver mi perfil';
        if (drawerProfileLink) drawerProfileLink.setAttribute('href', '../views/perfil.html');

        if (drawerAvatar) {
          drawerAvatar.innerHTML = user?.avatarUrl
            ? `<img src="${user.avatarUrl}" alt="Tu foto de perfil" style="width:100%;height:100%;object-fit:cover;" />`
            : defaultAvatarSVG;
        }

        const isAdminRole = user?.role === 'Admin' || user?.role === 'Fundador';
        const adminLinkHtml = isAdminRole
          ? `<a href="/admin" class="btn-login">Panel de administración</a>`
          : '';

        authContainer.innerHTML = `
          <p class="drawer-auth-label" data-i18n="nav.conectado">Conectado</p>
          <a href="../views/perfil.html" class="btn-login" data-i18n="nav.miPerfil">Mi perfil</a>
          ${adminLinkHtml}
          <button type="button" class="btn-logout" id="logout-link" data-i18n="nav.cerrarSesion">Cerrar sesión</button>
        `;
      } else {
        if (drawerUsername) drawerUsername.setAttribute('data-i18n', 'nav.invitado');
        if (drawerUsername) drawerUsername.textContent = window.SRi18n
          ? window.SRi18n.t('nav.invitado', window.SRi18n.getLang())
          : 'Invitado';
        if (drawerProfileCaption) drawerProfileCaption.setAttribute('data-i18n', 'nav.iniciarSesionCaption');
        if (drawerProfileCaption) drawerProfileCaption.textContent = window.SRi18n
          ? window.SRi18n.t('nav.iniciarSesionCaption', window.SRi18n.getLang())
          : 'Iniciar sesión';
        if (drawerProfileLink) drawerProfileLink.setAttribute('href', '../views/login.html');
        if (drawerAvatar) drawerAvatar.innerHTML = defaultAvatarSVG;

        authContainer.innerHTML = `
          <p class="drawer-auth-label" data-i18n="nav.miCuenta">Mi cuenta</p>
          <a href="../views/login.html" class="btn-login" data-i18n="nav.iniciarSesion">Iniciar Sesión</a>
          <a href="../views/registro.html" class="btn-register" data-i18n="nav.registrarse">Registrarse</a>
        `;
      }
    } catch (error) {
      console.error(error);
    }

    // Este bloque también se reconstruyó; reaplicar traducción activa.
    if (window.SRi18n) {
      window.SRi18n.applyTranslations(window.SRi18n.getLang());
    }
  };

  renderAuthMenu();

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href*="login.html"], a[href*="registro.html"]');
    if (!link) return;
    if (link.href.includes('redirect=')) return;

    event.preventDefault();

    const url = new URL(link.href, window.location.origin);
    url.searchParams.set('redirect', window.location.pathname);
    window.location.href = url.toString();
  });

  // Permite que otras páginas (ej. perfil.js tras guardar cambios) actualicen
  // el nombre/avatar del menú hamburguesa al instante, sin recargar la página.
  // Se usa un evento en window porque script.js y perfil.js son módulos
  // independientes y no comparten estado directamente.
  window.addEventListener('raices:profile-updated', (event) => {
    renderAuthMenu(event.detail);
  });

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
  if (params.get('suspendido') === '1') {
    showNotice('Tu cuenta ha sido suspendida. Contacta a un administrador.');
  }

  /* ── Verificar protección de rutas ── */
  const protectedPages = ['mapa.html', 'mapa', '/mapa'];
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  if (protectedPages.includes(currentPage)) {
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
/* ── Tema claro / oscuro ── */
(function initTheme() {
  const THEME_KEY = 'raices-theme';
  const saved = localStorage.getItem(THEME_KEY);
  const theme = saved === 'light' ? 'light' : 'dark';
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }
})();

function applyTheme(theme) {
  const THEME_KEY = 'raices-theme';
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  localStorage.setItem(THEME_KEY, theme);

  const themeSwitch = document.getElementById('themeSwitch');
  const themeText = document.getElementById('themeSwitchText');

  if (themeSwitch) {
    themeSwitch.setAttribute('aria-checked', theme === 'light' ? 'true' : 'false');
  }

  if (themeText) {
    // Obtener la clave de traducción según el tema
    const key = theme === 'light' ? 'nav.modoClaro' : 'nav.modoOscuro';
    // Usar la traducción si está disponible, o un fallback en español
    if (window.SRi18n) {
      themeText.textContent = window.SRi18n.t(key, window.SRi18n.getLang());
    } else {
      themeText.textContent = theme === 'light' ? 'Modo claro' : 'Modo oscuro';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  /* ── Navbar scroll effect ── */
  const lockPages = ['mapa.html', 'calendario.html', 'eventos.html', 'gastronomia.html', 'historia.html', 'leyendas.html', 'quiz.html', 'recetas.html', 'sitios-culturales.html', 'juegos.html'];

  const lockModalHTML = `
  <div class="lock-modal-overlay" id="lockModalOverlay">
    <div class="lock-modal" id="lockModal" role="dialog" aria-modal="true" aria-labelledby="lockModalTitle">
      <button class="lock-modal__close" id="lockModalClose" data-i18n-attr="aria-label:lock.close">&times;</button>
      <div class="lock-modal__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="10" width="16" height="10" rx="2"/>
          <path d="M8 10V7a4 4 0 0 1 8 0v3"/>
        </svg>
      </div>
      <h3 class="lock-modal__title" id="lockModalTitle" data-i18n="lock.title">¡Un momento!</h3>
      <p class="lock-modal__text" data-i18n="lock.text">
        Perdona, debes registrarte para poder seguir disfrutando de nuestra información.
        Es rápido y gratis.
      </p>
      <div class="lock-modal__actions">
        <a href="/registro.html" class="lock-modal__btn lock-modal__btn--primary" id="lockModalRegister" data-i18n="lock.register">Registrarme</a>
        <a href="/login.html" class="lock-modal__btn lock-modal__btn--secondary" id="lockModalLogin" data-i18n="lock.login">Ya tengo cuenta</a>
      </div>
    </div>
  </div>
`;

  if (!document.getElementById('lockModalOverlay')) {
    document.body.insertAdjacentHTML('beforeend', lockModalHTML);
  }
  // Aplicar traducciones al modal recién insertado
  if (window.SRi18n) {
    window.SRi18n.applyTranslations(window.SRi18n.getLang());
  }

  // Actualizar el texto del modo oscuro/claro cuando cambia el idioma
  document.addEventListener('langchange', (event) => {
    const themeText = document.getElementById('themeSwitchText');
    if (themeText && window.SRi18n) {
      const newLang = event.detail ? event.detail.lang : window.SRi18n.getLang();
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const key = isLight ? 'nav.modoClaro' : 'nav.modoOscuro';
      themeText.textContent = window.SRi18n.t(key, newLang);
    }
  });

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

/* ============================================================
   Blindaje contra el botón "atrás/adelante" del navegador
   (BFCache) tras iniciar o cerrar sesión.
   ============================================================
   El servidor ya envía Cache-Control: no-store en las vistas, pero
   algunos navegadores igual restauran una versión visual desde el
   BFCache al navegar con las flechas. El evento "pageshow" con
   event.persisted === true detecta justamente ese caso: se vuelve
   a verificar el estado real de sesión contra el servidor y, si no
   coincide con lo que se ve en pantalla, se fuerza una recarga para
   que el usuario nunca vea una vista protegida "fantasma" después de
   cerrar sesión, ni una página de login ya autenticada. */
window.addEventListener('pageshow', (event) => {
  if (!event.persisted) return; // navegación normal, no vino del BFCache

  const path = window.location.pathname;
  const isAuthPage = /\/(login|registro|recuperar|restablecer)\.html$/.test(path);

  fetch('/auth/status', { credentials: 'same-origin', cache: 'no-store' })
    .then((r) => r.json())
    .then((data) => {
      if (isAuthPage && data.loggedIn) {
        // El usuario ya inició sesión pero el navegador restauró la
        // pantalla de login/registro desde caché: recargamos para que
        // el servidor lo redirija a donde corresponde.
        window.location.reload();
      } else if (!isAuthPage && !data.loggedIn) {
        // El usuario cerró sesión pero el navegador restauró una vista
        // protegida desde caché: recargamos para que el servidor la
        // bloquee y mande a login.
        window.location.reload();
      }
    })
    .catch(() => {
      // Ante la duda (p. ej. sin red), recargar es más seguro que
      // dejar una vista potencialmente desactualizada en pantalla.
      window.location.reload();
    });
});