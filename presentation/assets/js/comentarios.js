/* ============================================================
  Salvadorean Roots — comentarios.js
   Formulario de opiniones/sugerencias sobre la plataforma +
   historial de los comentarios que el usuario ya envió.
   ============================================================ */

function t(key, fallback) {
  if (!window.SRi18n) return fallback;
  const value = window.SRi18n.t(key, window.SRi18n.getLang());
  return value && value !== key ? value : fallback;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');
  if (!form) return;

  const toast = document.getElementById('comentarios-toast');
  const showToast = (message, type = 'success') => {
    if (window.showToast) return window.showToast(message, type);
    if (!toast) return;
    toast.textContent = message;
    toast.className = type;
    requestAnimationFrame(() => toast.classList.add('show'));
    clearTimeout(showToast.timeout);
    showToast.timeout = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  const statusEl = document.getElementById('feedbackStatus');
  const setStatus = (message, type = 'success') => {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = `save-status show save-status--${type}`;
    clearTimeout(setStatus.timeout);
    setStatus.timeout = setTimeout(() => statusEl.classList.remove('show'), 2600);
  };

  // ── Selector de estrellas ──
  const starRating = document.getElementById('starRating');
  const stars = starRating ? Array.from(starRating.querySelectorAll('.star-rating__star')) : [];
  let selectedRating = 0;

  const paintStars = (value) => {
    stars.forEach((star) => {
      const starValue = Number(star.dataset.value);
      star.classList.toggle('is-active', starValue <= value);
      star.setAttribute('aria-checked', starValue === selectedRating ? 'true' : 'false');
    });
  };

  stars.forEach((star) => {
    star.addEventListener('click', () => {
      const value = Number(star.dataset.value);
      selectedRating = selectedRating === value ? 0 : value;
      paintStars(selectedRating);
    });
    star.addEventListener('mouseenter', () => {
      const value = Number(star.dataset.value);
      stars.forEach((s) => s.classList.toggle('is-hover', Number(s.dataset.value) <= value));
    });
  });
  starRating?.addEventListener('mouseleave', () => {
    stars.forEach((s) => s.classList.remove('is-hover'));
  });

  // ── Contador de caracteres ──
  const messageInput = document.getElementById('feedbackMessage');
  const charCount = document.getElementById('feedbackCharCount');
  messageInput?.addEventListener('input', () => {
    if (!charCount) return;
    const length = messageInput.value.length;
    charCount.textContent = `${length} / 1000`;
    charCount.classList.toggle('limit-near', length > 900);
  });

  // ── Historial de comentarios propios ──
  const listEl = document.getElementById('myFeedbackList');
  const emptyEl = document.getElementById('myFeedbackEmpty');

  function renderStars(rating) {
    if (!rating) return '';
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }

  function formatDate(iso) {
    if (!iso) return '';
    const lang = window.SRi18n ? window.SRi18n.getLang() : 'es';
    const locale = lang === 'en' ? 'en-US' : 'es-SV';
    try {
      return new Date(iso).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch {
      return iso;
    }
  }

  async function loadMyFeedback() {
    if (!listEl) return;
    try {
      const response = await fetch('/api/feedback/mine', { credentials: 'same-origin' });
      if (!response.ok) return;
      const data = await response.json();
      const items = data.feedback || [];

      if (items.length === 0) {
        listEl.innerHTML = '';
        if (emptyEl) emptyEl.hidden = false;
        return;
      }
      if (emptyEl) emptyEl.hidden = true;

      listEl.innerHTML = items.map((item) => `
        <div class="my-feedback-item">
          <div class="my-feedback-item__meta">
            ${item.rating ? `<span class="my-feedback-item__stars">${renderStars(item.rating)}</span>` : '<span></span>'}
            <span class="my-feedback-item__status my-feedback-item__status--${item.reviewedAt ? 'reviewed' : 'pending'}">
              ${item.reviewedAt ? t('comentarios.mine.reviewed', 'Revisado') : t('comentarios.mine.pending', 'Pendiente')}
            </span>
          </div>
          <div class="my-feedback-item__text">${escapeHtml(item.message)}</div>
          <div class="my-feedback-item__date">${formatDate(item.createdAt)}</div>
        </div>
      `).join('');
    } catch (error) {
      console.error('No se pudo cargar tu historial de comentarios:', error);
    }
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
  }

  loadMyFeedback();

  // ── Envío del formulario ──
  const submitBtn = document.getElementById('feedbackSubmitBtn');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const message = messageInput?.value.trim() || '';
    if (!message) {
      setStatus(t('comentarios.error_message', 'Escribe tu comentario antes de enviarlo.'), 'error');
      return;
    }

    if (submitBtn) submitBtn.disabled = true;
    setStatus(t('comentarios.sending', 'Enviando…'));

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: selectedRating || null, message })
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.message || t('comentarios.error_generic', 'No se pudo enviar tu comentario.'));
      }

      setStatus('');
      showToast(t('comentarios.sent', '¡Gracias! Tu comentario fue enviado.'), 'success');
      form.reset();
      selectedRating = 0;
      paintStars(0);
      if (charCount) charCount.textContent = '0 / 1000';
      loadMyFeedback();
    } catch (error) {
      setStatus(error.message, 'error');
    } finally {
      if (submitBtn) submitBtn.disabled = false;
    }
  });
});
