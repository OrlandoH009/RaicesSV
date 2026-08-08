document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const form = document.getElementById('appealForm');
  const statusEl = document.getElementById('appealStatus');
  const submitBtn = document.getElementById('appealSubmitBtn');
  const sentBox = document.getElementById('appealSent');

   if (window.gsap && !reduceMotion) {
    const card = document.querySelector('.appeal-card');
    if (card) {
      gsap.from(card, { opacity: 0, y: 24, duration: .5, ease: 'power2.out' });
    }
  }
  
  function setStatus(message, kind) {
    if (!statusEl) return;
    statusEl.textContent = message;
    if (kind) statusEl.setAttribute('data-kind', kind);
    else statusEl.removeAttribute('data-kind');
  }
  
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('appealEmail')?.value.trim() || '';
    const message = document.getElementById('appealMessage')?.value.trim() || '';

    if (!email) {
      setStatus('Debes indicar tu correo.', 'error');
      return;
    }

    if (!message) {
      setStatus('Debes escribir tu apelación.', 'error');
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    setStatus('Enviando…');

    try {
      const response = await fetch('/api/appeals', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || 'No se pudo enviar tu apelación.');
      }

      form.hidden = true;
      if (sentBox) sentBox.hidden = false;

    } catch (error) {
      if (submitBtn) submitBtn.disabled = false;
      setStatus(error.message, 'error');
    }
  });

});