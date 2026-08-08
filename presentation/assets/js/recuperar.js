document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('forgot-form');
  const messageBox = document.getElementById('form-message');

  /* ── Animaciones GSAP (mismo patrón que login.js) ── */
  if (window.gsap) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const card = document.querySelector('.auth-card');

    if (card) {
      card.classList.remove('reveal');
      const logoImg = card.querySelector('.auth-card__logo img');
      const rest = Array.from(card.querySelectorAll(
        'h1, .auth-card__sub, .form-group, .auth-submit, .auth-footer-link'
      ));

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          // Red de seguridad: ver comentario equivalente en login.js.
          // Limpia cualquier opacity/transform inline que GSAP haya dejado.
          gsap.set([card, logoImg, ...rest].filter(Boolean), { clearProps: 'opacity,transform' });
        }
      });
      tl.from(card, { opacity: 0, y: 55, scale: 0.92, duration: 0.85 });
      if (logoImg) {
        tl.from(logoImg, { scale: 0, rotate: -200, opacity: 0, duration: 0.65, ease: 'back.out(1.8)' }, '-=0.5');
      }
      tl.from(rest, { opacity: 0, y: 22, duration: 0.55, stagger: 0.08 }, '-=0.35');

      // Red de seguridad independiente de GSAP: garantiza que el contenido
      // de la tarjeta quede visible aunque la timeline nunca complete.
      window.setTimeout(() => {
        [card, logoImg, ...rest].filter(Boolean).forEach((el) => {
          el.style.opacity = '';
          el.style.transform = '';
        });
      }, 2000);

      if (logoImg && !reduceMotion) {
        tl.add(() => {
          gsap.to(logoImg, { y: -6, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        });
      }
    }
  }

  if (!form) return;

  const showMessage = (message, isError = true) => {
    if (!messageBox) return;
    messageBox.textContent = message;
    messageBox.style.color = isError ? '#d9534f' : '#2e7d32';
    messageBox.style.display = 'block';
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const submitBtn = form.querySelector('.auth-submit');

    if (submitBtn) submitBtn.disabled = true;

    try {
      const response = await fetch('/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.get('email') })
      });

      const data = await response.json().catch(() => ({}));

      // El backend siempre responde con un mensaje genérico (no revela
      // si el correo existe o no), así que mostramos exactamente eso.
      showMessage(
        data.message || window.SRi18n.t('forgot.success_message', window.SRi18n.getLang()),
        false
      );
      form.reset();
    } catch (error) {
      showMessage(window.SRi18n.t('forgot.error_server', window.SRi18n.getLang()));
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});