/* ============================================================
   RAÍCES SV — perfil-anim.js
   Animaciones GSAP puramente visuales. No contiene lógica de
   negocio: si GSAP no carga, la página sigue funcionando
   gracias a los estilos base de .reveal en global.css.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;

  const header   = document.querySelector('.perfil-header');
  const avatar   = document.querySelector('.avatar-zone');
  const cards    = gsap.utils.toArray('.perfil-card');

  // Estado inicial (evita el flash de contenido sin animar)
  gsap.set([header, avatar, ...cards], { opacity: 0, y: 28 });
  gsap.set(avatar, { scale: .9 });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to(header, { opacity: 1, y: 0, duration: .6 })
    .to(avatar, { opacity: 1, y: 0, scale: 1, duration: .7, ease: 'back.out(1.6)' }, '-=.35')
    .to(cards, { opacity: 1, y: 0, duration: .55, stagger: .12 }, '-=.3');

  // Ya se animó vía timeline: evita que el observer de .reveal en
  // script.js las vuelva a tocar (que además ya llegan opacity 1).
  [header, avatar, ...cards].forEach(el => el && el.classList.add('visible'));

  // ── Avatar: leve efecto magnético al pasar el mouse ──
  const dropzone = document.getElementById('avatarDropzone');
  if (dropzone) {
    dropzone.addEventListener('mousemove', (e) => {
      const r = dropzone.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) / 8;
      const y = (e.clientY - r.top - r.height / 2) / 8;
      gsap.to(dropzone, { x, y, duration: .3, ease: 'power2.out' });
    });
    dropzone.addEventListener('mouseleave', () => {
      gsap.to(dropzone, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1, .5)' });
    });
  }

  // ── Confirmación de guardado: pequeño "pop" en el botón al enviar ──
  document.querySelectorAll('.perfil-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      gsap.fromTo(btn, { scale: .94 }, { scale: 1, duration: .35, ease: 'back.out(3)' });
    });
  });

  // ── Modal eliminar cuenta: entrada con GSAP en vez de solo CSS ──
  const overlay = document.getElementById('deleteModalOverlay');
  const modal = overlay ? overlay.querySelector('.perfil-modal') : null;
  if (overlay && modal) {
    const openBtn = document.getElementById('openDeleteModal');
    if (openBtn) {
      openBtn.addEventListener('click', () => {
        gsap.fromTo(modal,
          { y: 24, scale: .95, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: .4, ease: 'back.out(1.7)' }
        );
      });
    }
  }

  // ── Toast: pequeño rebote en vez del ease lineal por defecto ──
  const toastEl = document.getElementById('perfil-toast');
  if (toastEl) {
    const observer = new MutationObserver(() => {
      if (toastEl.classList.contains('show')) {
        gsap.fromTo(toastEl,
          { y: -14, scale: .9 },
          { y: 0, scale: 1, duration: .45, ease: 'back.out(2.2)' }
        );
      }
    });
    observer.observe(toastEl, { attributes: true, attributeFilter: ['class'] });
  }
});