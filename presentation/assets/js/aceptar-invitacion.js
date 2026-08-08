// Vista de aceptar invitación a administrador.
// Lee el token de la URL, valida contraseñas, y llama al endpoint público
// /api/admin/invitations/accept.

document.addEventListener('DOMContentLoaded', () => {

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const form = document.getElementById('inviteForm');
  const statusEl = document.getElementById('inviteStatus');
  const submitBtn = document.getElementById('inviteSubmitBtn');
  const expiredBox = document.getElementById('inviteExpired');
  const seal = document.getElementById('inviteSeal');

  // Animación de entrada: el sello se "estampa" con un pop de escala
  if (window.gsap) {
    const card = document.querySelector('.invite-card');
    const rest = card ? Array.from(card.querySelectorAll('.invite-eyebrow, h1, .invite-sub, .invite-form')) : [];

    if (reduceMotion) {
      gsap.set([seal, ...rest], { opacity: 1 });
    } else {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from(card, { opacity: 0, y: 40, duration: .6 });
      if (seal) {
        tl.from(seal, { scale: 0, rotate: -30, opacity: 0, duration: .55, ease: 'back.out(2.2)' }, '-=.3');
      }
      tl.from(rest, { opacity: 0, y: 14, duration: .45, stagger: .08 }, '-=.2');
    }
  }

  function setStatus(message, kind) {
    if (!statusEl) return;
    statusEl.textContent = message;
    if (kind) statusEl.setAttribute('data-kind', kind);
    else statusEl.removeAttribute('data-kind');
  }

  const token = new URLSearchParams(window.location.search).get('token');

  if (!token) {
    if (form) form.hidden = true;
    if (expiredBox) expiredBox.hidden = false;
    return;
  }

  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newPassword = document.getElementById('newPassword')?.value || '';
    const confirmPassword = document.getElementById('confirmPassword')?.value || '';

    if (newPassword.length < 8) {
      setStatus('La contraseña debe tener al menos 8 caracteres.', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus('Las contraseñas no coinciden.', 'error');
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    setStatus('Procesando…');

    try {
      const response = await fetch('/api/admin/invitations/accept', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: newPassword })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'No se pudo completar la invitación.');
      }

      setStatus('¡Listo! Ahora eres administrador. Redirigiendo…', 'success');
      setTimeout(() => {
        window.location.href = '/login.html';
      }, 1600);

    } catch (error) {
      if (submitBtn) submitBtn.disabled = false;
      setStatus(error.message, 'error');

      if (/inválido|expiró/i.test(error.message)) {
        form.hidden = true;
        if (expiredBox) expiredBox.hidden = false;
      }
    }
  });

});