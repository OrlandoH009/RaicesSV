document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('reset-form');
  const messageBox = document.getElementById('form-message');
  const tokenInput = document.getElementById('token-input');

  // El token viaja en la URL (?token=...) tal como se envió en el correo.
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  const showMessage = (message, isError = true) => {
    if (!messageBox) return;
    messageBox.textContent = message;
    messageBox.style.color = isError ? '#d9534f' : '#2e7d32';
    messageBox.style.display = 'block';
  };

  if (!token) {
    showMessage('El enlace de recuperación no es válido o está incompleto.');
    if (form) {
      Array.from(form.elements).forEach((el) => { el.disabled = true; });
    }
  } else if (tokenInput) {
    tokenInput.value = token;
  }

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

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(card, { opacity: 0, y: 55, scale: 0.92, duration: 0.85 });
      if (logoImg) {
        tl.from(logoImg, { scale: 0, rotate: -200, opacity: 0, duration: 0.65, ease: 'back.out(1.8)' }, '-=0.5');
      }
      tl.from(rest, { opacity: 0, y: 22, duration: 0.55, stagger: 0.08 }, '-=0.35');

      if (logoImg && !reduceMotion) {
        tl.add(() => {
          gsap.to(logoImg, { y: -6, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        });
      }
    }
  }

  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const password = formData.get('password');
    const password2 = formData.get('password2');

    if (password !== password2) {
      showMessage('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 8) {
      showMessage('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    const submitBtn = form.querySelector('.auth-submit');
    if (submitBtn) submitBtn.disabled = true;

    try {
      const response = await fetch('/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: formData.get('token'), password })
      });

      if (response.ok) {
        const data = await response.json();
        showMessage(data.message || 'Contraseña actualizada correctamente.', false);
        setTimeout(() => {
          window.location.href = data.redirect || '/login.html?passwordReset=1';
        }, 1200);
        return;
      }

      const text = await response.text();
      showMessage(text || 'No se pudo restablecer la contraseña.');
    } catch (error) {
      showMessage('No se pudo conectar con el servidor.');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});