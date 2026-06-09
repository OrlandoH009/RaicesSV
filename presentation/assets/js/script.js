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
  drawer?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

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
