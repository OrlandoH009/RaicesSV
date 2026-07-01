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

    try {
      const response = await fetch('/auth/status', { credentials: 'same-origin' });
      const data = await response.json();

      if (data.loggedIn) {
        authContainer.innerHTML = `
          <p class="drawer-auth-label">Hola, ${data.user?.name || data.user?.email || 'Usuario'}</p>
          <button type="button" class="btn-logout" id="logout-link">Cerrar sesión</button>
        `;
      } else {
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
    a.classList.toggle('active', a.getAttribute('href') === page);
  });

  /* ── Scroll Reveal ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

});
