/* ============================================================
   RAÍCES SV — perfil-anim.js
   Animaciones GSAP puramente visuales. No contiene lógica de
   negocio: si GSAP no carga, la página sigue funcionando
   gracias a los estilos base de .reveal en global.css.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (typeof gsap === 'undefined') return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const header = document.querySelector('.perfil-header');
  const avatar = document.querySelector('.avatar-zone');
  const cards  = gsap.utils.toArray('.perfil-card');
  const allEntranceEls = [header, avatar, ...cards].filter(Boolean);

  if (prefersReducedMotion) {
    // Respeta la preferencia del sistema: solo un fundido corto, sin desplazamientos.
    gsap.set(allEntranceEls, { opacity: 0 });
    gsap.to(allEntranceEls, { opacity: 1, duration: .3, stagger: .05 });
    allEntranceEls.forEach(el => el.classList.add('visible'));
  } else {

    // ── Entrada de la página: fundido + desplazamiento sutil, sin rebote exagerado ──
    gsap.set(allEntranceEls, { opacity: 0, y: 22 });
    gsap.set(avatar, { scale: .96 });

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl.to(header, { opacity: 1, y: 0, duration: .55 })
      .to(avatar, { opacity: 1, y: 0, scale: 1, duration: .6, ease: 'power3.out' }, '-=.35')
      .to(cards, { opacity: 1, y: 0, duration: .5, stagger: .1, ease: 'power2.out' }, '-=.3');

    // Ya se animó vía timeline: evita que el observer de .reveal en
    // script.js las vuelva a tocar (que además ya llegan opacity 1).
    allEntranceEls.forEach(el => el.classList.add('visible'));

    // ── Avatar: efecto magnético suave al pasar el mouse ──
    const dropzone = document.getElementById('avatarDropzone');
    if (dropzone) {
      dropzone.addEventListener('mousemove', (e) => {
        const r = dropzone.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) / 10;
        const y = (e.clientY - r.top - r.height / 2) / 10;
        gsap.to(dropzone, { x, y, duration: .4, ease: 'power2.out' });
      });
      dropzone.addEventListener('mouseleave', () => {
        gsap.to(dropzone, { x: 0, y: 0, duration: .6, ease: 'power3.out' });
      });
    }

    // ── Tarjetas: leve elevación al pasar el mouse, sensación más "premium" ──
    cards.forEach((card) => {
      const enter = () => gsap.to(card, { y: -3, duration: .35, ease: 'power2.out' });
      const leave = () => gsap.to(card, { y: 0, duration: .45, ease: 'power2.out' });
      card.addEventListener('mouseenter', enter);
      card.addEventListener('mouseleave', leave);
    });

    // ── Inputs: pequeño realce de la etiqueta al enfocar, sensación más viva ──
    document.querySelectorAll('.perfil-card input, .perfil-card textarea').forEach((field) => {
      const label = field.closest('.form-group')?.querySelector('label');
      if (!label) return;
      field.addEventListener('focus', () => {
        gsap.to(label, { x: 3, color: '#e5c9a3', duration: .25, ease: 'power2.out' });
      });
      field.addEventListener('blur', () => {
        gsap.to(label, { x: 0, color: 'rgba(255,255,255,.55)', duration: .3, ease: 'power2.out' });
      });
    });
  }

  // ── Confirmación de guardado: "pop" contenido en el botón al enviar ──
  document.querySelectorAll('.perfil-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (prefersReducedMotion) return;
      gsap.fromTo(btn, { scale: .96 }, { scale: 1, duration: .3, ease: 'power3.out' });
    });
  });

  // ── Modal eliminar cuenta: entrada animada con GSAP ──
  // perfil.js sigue siendo el único dueño de cuándo se agrega/quita "is-visible";
  // aquí solo observamos ese cambio de clase para animar la entrada, igual que
  // con el toast más abajo. Así no hay dos scripts peleando por el mismo listener.
  const overlay = document.getElementById('deleteModalOverlay');
  const modal = overlay ? overlay.querySelector('.perfil-modal') : null;
  if (overlay && modal && !prefersReducedMotion) {
    let wasVisible = false;
    const modalObserver = new MutationObserver(() => {
      const isVisible = overlay.classList.contains('is-visible');
      if (isVisible && !wasVisible) {
        gsap.fromTo(modal,
          { y: 18, scale: .97, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, duration: .35, ease: 'power3.out' }
        );
      }
      wasVisible = isVisible;
    });
    modalObserver.observe(overlay, { attributes: true, attributeFilter: ['class'] });
  }

  // ── Toast: entrada suave, sin rebote exagerado ──
  const toastEl = document.getElementById('perfil-toast');
  if (toastEl && !prefersReducedMotion) {
    const observer = new MutationObserver(() => {
      if (toastEl.classList.contains('show')) {
        gsap.fromTo(toastEl,
          { y: -10, scale: .95 },
          { y: 0, scale: 1, duration: .35, ease: 'power3.out' }
        );
      }
    });
    observer.observe(toastEl, { attributes: true, attributeFilter: ['class'] });
  }
});