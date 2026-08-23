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

  // Reconstruir el contenido del drawer (sin slider, porque lo ponemos en el navbar)
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

    if (window.SRi18n) {
      window.SRi18n.applyTranslations(window.SRi18n.getLang());
    }
  }

  // Sincroniza el interruptor visual con el tema guardado
  const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  applyTheme(currentTheme);

  const themeSwitch = document.getElementById('themeSwitch');
  themeSwitch?.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    applyTheme(isLight ? 'dark' : 'light');
  });

  // `overflow: hidden` en el body no basta para bloquear el scroll táctil
  // en varios navegadores móviles (Safari iOS en particular sigue dejando
  // "arrastrar" el fondo). Fijamos el body en su posición actual para que
  // ni la rueda ni el dedo puedan mover nada detrás del drawer, y al cerrar
  // restauramos exactamente el mismo scroll donde estaba.
  let scrollYAlAbrir = 0;

  function openDrawer() {
    drawer?.classList.add('open');
    overlay?.classList.add('open');
    burger?.classList.add('open');
    burger?.setAttribute('aria-expanded', 'true');
    const closeLabel = window.SRi18n ? window.SRi18n.t('nav.cerrarMenu', window.SRi18n.getLang()) : 'Cerrar menú';
    burger?.setAttribute('aria-label', closeLabel);
    scrollYAlAbrir = window.scrollY || window.pageYOffset || 0;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYAlAbrir}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    drawer?.classList.remove('open');
    overlay?.classList.remove('open');
    burger?.classList.remove('open');
    burger?.setAttribute('aria-expanded', 'false');
    const openLabel = window.SRi18n ? window.SRi18n.t('nav.abrirMenu', window.SRi18n.getLang()) : 'Abrir menú';
    burger?.setAttribute('aria-label', openLabel);
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, scrollYAlAbrir);
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

      if (!user) {
        const response = await fetch('/auth/status', { credentials: 'same-origin' });
        const data = await response.json();
        loggedIn = data.loggedIn;
        user = data.user;
      }

      if (loggedIn) {
        if (drawerUsername) {
          drawerUsername.removeAttribute('data-i18n');
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

  /* ═══════════════════════════════════════════════════════════
     MÚSICA DE FONDO GLOBAL (persiste entre páginas, en loop)
     ═══════════════════════════════════════════════════════════
     AHORA con control de volumen en el navbar (slider visible siempre)
  */
  (function initBackgroundMusic() {
    const MUSIC_SRC = '../assets/media/El Carbonero.mp3';
    const STORAGE_KEY = 'raices-bgmusic-state';

    const readState = () => {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      } catch {
        return {};
      }
    };
    const writeState = (partial) => {
      try {
        const current = readState();
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...partial }));
      } catch {}
    };

    const audio = new Audio(MUSIC_SRC);
    audio.loop = true;
    audio.preload = 'auto';

    const state = readState();
    const muted = state.muted === true;
    const volume = typeof state.volume === 'number' ? state.volume : 0.2;
    const savedTime = typeof state.time === 'number' ? state.time : 0;

    audio.volume = volume;
    audio.muted = muted;

    // ── Crear contenedor para controles de música en el navbar ──
    let musicControls = document.getElementById('musicControls');
    if (!musicControls) {
      musicControls = document.createElement('div');
      musicControls.id = 'musicControls';
      musicControls.className = 'music-controls';
      // Buscar donde insertarlo: al lado del botón hamburguesa o al final del navbar
      const burgerBtn = document.getElementById('burger');
      if (burgerBtn && burgerBtn.parentNode) {
        burgerBtn.parentNode.insertBefore(musicControls, burgerBtn);
      } else if (navbar) {
        navbar.appendChild(musicControls);
      }
    }

    // Limpiar controles previos (para evitar duplicados)
    musicControls.innerHTML = '';

    // Botón de silencio
    const musicToggle = document.createElement('button');
    musicToggle.type = 'button';
    musicToggle.className = 'music-toggle';
    musicToggle.id = 'musicToggle';
    const iconOn = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
    const iconOff = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/><line x1="3" y1="3" x2="21" y2="21"/></svg>';
    musicToggle.innerHTML = muted ? iconOff : iconOn;
    musicToggle.setAttribute('aria-label', muted ? 'Activar música de fondo' : 'Silenciar música de fondo');
    musicToggle.setAttribute('aria-pressed', muted ? 'false' : 'true');
    musicControls.appendChild(musicToggle);

    // Slider de volumen
    const volumeSlider = document.createElement('input');
    volumeSlider.type = 'range';
    volumeSlider.id = 'volumeSlider';
    volumeSlider.min = '0';
    volumeSlider.max = '1';
    volumeSlider.step = '0.01';
    volumeSlider.value = volume;
    volumeSlider.setAttribute('aria-label', 'Volumen de la música de fondo');
    volumeSlider.className = 'volume-slider';
    musicControls.appendChild(volumeSlider);

    function setMuted(next) {
      audio.muted = next;
      musicToggle.innerHTML = next ? iconOff : iconOn;
      musicToggle.setAttribute('aria-label', next ? 'Activar música de fondo' : 'Silenciar música de fondo');
      musicToggle.setAttribute('aria-pressed', next ? 'false' : 'true');
      writeState({ muted: next });

      // CORRECCIÓN: si se des-silencia y el audio está pausado, lo reanudamos
      if (!next && audio.paused) {
        audio.play().catch(() => {});
      }
    }

    musicToggle.addEventListener('click', () => setMuted(!audio.muted));

    // Evento del slider
    volumeSlider.addEventListener('input', () => {
      const val = parseFloat(volumeSlider.value);
      audio.volume = val;
      writeState({ volume: val });
    });

    // Retomar posición guardada
    audio.addEventListener('loadedmetadata', () => {
      if (savedTime > 0 && savedTime < audio.duration) {
        audio.currentTime = savedTime;
      }
    });

    // Autoplay (solo si no está silenciado)
    if (!muted) {
      audio.play().catch(() => {
        // En móvil/tablet los navegadores bloquean el autoplay hasta que
        // hay una interacción del usuario: un click, pero también un
        // deslizar (swipe/scroll táctil) cuenta como interacción válida.
        const resumeOnce = () => {
          audio.play().catch(() => {});
          document.removeEventListener('click', resumeOnce);
          document.removeEventListener('touchstart', resumeOnce);
          document.removeEventListener('touchmove', resumeOnce);
          document.removeEventListener('scroll', resumeOnce);
        };
        document.addEventListener('click', resumeOnce, { once: true });
        document.addEventListener('touchstart', resumeOnce, { once: true, passive: true });
        document.addEventListener('touchmove', resumeOnce, { once: true, passive: true });
        document.addEventListener('scroll', resumeOnce, { once: true, passive: true });
      });
    }

    // Guardar estado periódicamente y al salir
    setInterval(() => {
      if (!audio.paused) writeState({ time: audio.currentTime, volume: audio.volume });
    }, 2000);
    window.addEventListener('pagehide', () => {
      writeState({ time: audio.currentTime, volume: audio.volume, muted: audio.muted });
    });

    /* ── Pausar la música de fondo mientras suena "otro" audio/video ──
       Si un juego, un video de receta o una narración de leyenda empieza
       a sonar, la música de fondo global seguía sonando encima, mezclando
       las dos pistas. Con esto, en cuanto arranca cualquier <audio>/<video>
       del sitio (que no sea esta misma pista), la pausamos; cuando ese
       otro audio termina o se pausa, retomamos la música de fondo — pero
       solo si fuimos nosotros quienes la pausamos (si el usuario la había
       pausado/silenciado a propósito, la dejamos como estaba). */
    let bgMusicAutoPausada = false;
    let otrosMediaSonando = 0;

    function esOtroMedia(el) {
      return el && el !== audio && (el.tagName === 'AUDIO' || el.tagName === 'VIDEO');
    }

    document.addEventListener('play', (e) => {
      if (!esOtroMedia(e.target)) return;
      otrosMediaSonando++;
      if (!audio.paused) {
        audio.pause();
        bgMusicAutoPausada = true;
      }
    }, true);

    function alTerminarOtroMedia(e) {
      if (!esOtroMedia(e.target)) return;
      otrosMediaSonando = Math.max(0, otrosMediaSonando - 1);
      if (otrosMediaSonando === 0 && bgMusicAutoPausada && !audio.muted) {
        bgMusicAutoPausada = false;
        audio.play().catch(() => {});
      }
    }
    document.addEventListener('pause', alTerminarOtroMedia, true);
    document.addEventListener('ended', alTerminarOtroMedia, true);

    window.SRbgMusic = audio;
    // Expuesto para casos donde "el otro audio" no es un <audio>/<video>
    // del DOM (p. ej. narración de leyendas creada con `new Audio()` suelto,
    // o síntesis de voz del navegador), que no disparan estos eventos aquí.
    window.SRDuckBgMusic = {
      pause() {
        if (!audio.paused) {
          audio.pause();
          bgMusicAutoPausada = true;
        }
      },
      resume() {
        if (bgMusicAutoPausada && !audio.muted) {
          bgMusicAutoPausada = false;
          audio.play().catch(() => {});
        }
      }
    };
  })();

}); // Fin DOMContentLoaded

/* ============================================================
   MODAL DE BLOQUEO — contenido exclusivo para usuarios registrados
   ============================================================ */
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
    const key = theme === 'light' ? 'nav.modoClaro' : 'nav.modoOscuro';
    if (window.SRi18n) {
      themeText.textContent = window.SRi18n.t(key, window.SRi18n.getLang());
    } else {
      themeText.textContent = theme === 'light' ? 'Modo claro' : 'Modo oscuro';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  /* ── Modal de bloqueo ── */
  const lockPages = ['mapa.html', 'calendario.html', 'eventos.html', 'gastronomia.html', 'historia.html', 'leyendas.html', 'quiz.html', 'recetas.html', 'sitios-culturales.html', 'juegos.html'];

  const lockModalHTML = `
  <div class="lock-modal-overlay" id="lockModalOverlay">
    <div class="lock-modal" id="lockModal" role="dialog" aria-modal="true" aria-labelledby="lockModalTitle">
      <button class="lock-modal__close" id="lockModalClose" title="Cerrar (Esc)" data-i18n-attr="aria-label:lock.close,title:common.tooltip.closeEsc">&times;</button>
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
  if (window.SRi18n) {
    window.SRi18n.applyTranslations(window.SRi18n.getLang());
  }

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
   Blindaje contra el botón "atrás/adelante" del navegador (BFCache)
   ============================================================ */
window.addEventListener('pageshow', (event) => {
  if (!event.persisted) return;

  const path = window.location.pathname;
  const isAuthPage = /\/(login|registro|recuperar|restablecer)\.html$/.test(path);

  fetch('/auth/status', { credentials: 'same-origin', cache: 'no-store' })
    .then((r) => r.json())
    .then((data) => {
      if (isAuthPage && data.loggedIn) {
        window.location.reload();
      } else if (!isAuthPage && !data.loggedIn) {
        window.location.reload();
      }
    })
    .catch(() => {
      window.location.reload();
    });
});

/* ============================================================
   Bloqueo de scroll de fondo con flechas cuando hay un modal
   o un juego abierto (los juegos usan las flechas para moverse,
   y sin esto el navegador desplazaba la página detrás del modal)
   ============================================================ */
(function blockArrowScrollBehindOverlays() {
  const ARROW_KEYS = new Set(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

  function isEditableTarget(el) {
    if (!el) return false;
    const tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
  }

  // Comprueba visibilidad real subiendo por los ancestros: un modal puede
  // estar oculto por su propio estilo o por el de un contenedor padre
  // (p. ej. .game-modal__content hereda la opacidad 0 de .game-modal).
  function isActuallyVisible(el) {
    let node = el;
    while (node && node.nodeType === 1) {
      const style = window.getComputedStyle(node);
      if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) === 0) return false;
      node = node.parentElement;
    }
    return true;
  }

  function isOverlayOpen() {
    if (document.body.style.overflow === 'hidden') return true;
    if (document.documentElement.classList.contains('quiz-modal-open')) return true;
    if (document.body.classList.contains('modal-lock')) return true;

    // Heurística general: cualquier elemento cuyo nombre de clase incluya
    // "modal" (usado en todo el sitio para modales y juegos) y que esté
    // visible en pantalla cuenta como una superposición abierta. Se agregan
    // aparte un par de overlays que no siguen esa convención de nombre.
    const candidates = document.querySelectorAll('[class*="modal"], .admin-drawer-overlay, .quiz-confirm-overlay');
    for (const el of candidates) {
      if (isActuallyVisible(el)) return true;
    }
    return false;
  }

  window.addEventListener('keydown', (e) => {
    if (!ARROW_KEYS.has(e.key)) return;
    if (isEditableTarget(document.activeElement)) return;
    if (isOverlayOpen()) e.preventDefault();
  }, { passive: false });
})();