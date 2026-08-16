/* ============================================================
  Salvadorean Roots — perfil.js (con i18n)
   ============================================================ */

// Función de traducción con idioma actual
function t(key, replacements = {}) {
  if (typeof window.SRi18n === 'undefined') {
    console.warn('i18n no cargado, usando fallback');
    return key;
  }
  const lang = window.SRi18n.getLang();
  let text = window.SRi18n.t(key, lang) || key;
  for (const [k, v] of Object.entries(replacements)) {
    text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
  }
  return text;
}

document.addEventListener('DOMContentLoaded', () => {

  const toast = document.getElementById('perfil-toast');
  const showToast = (messageKey, type = 'success', replacements = {}) => {
    const message = t(messageKey, replacements);
    toast.textContent = message;
    toast.className = type;
    requestAnimationFrame(() => toast.classList.add('show'));
    clearTimeout(showToast.timeout);
    showToast.timeout = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  const setStatus = (el, messageKey, type = 'success', replacements = {}) => {
    const message = t(messageKey, replacements);
    el.textContent = message;
    el.className = `save-status show save-status--${type}`;
    clearTimeout(setStatus[el.id]);
    setStatus[el.id] = setTimeout(() => el.classList.remove('show'), 2600);
  };

  // ── Elementos ──
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const descriptionInput = document.getElementById('description');
  const charCount = document.getElementById('charCount');

  const avatarDropzone = document.getElementById('avatarDropzone');
  const avatarPlaceholder = document.getElementById('avatarPlaceholder');
  const avatarInput = document.getElementById('avatarInput');
  const uploadAvatarBtn = document.getElementById('uploadAvatarBtn');
  const googleAvatarBtn = document.getElementById('googleAvatarBtn');

  const currentPasswordGroup = document.getElementById('currentPasswordGroup');
  const passwordDesc = document.getElementById('passwordDesc');

  let profileState = null;

  const notifyDrawer = () => {
    window.dispatchEvent(new CustomEvent('raices:profile-updated', { detail: profileState }));
  };

  const renderAvatar = (avatarUrl) => {
    const existingImg = avatarDropzone.querySelector('img');
    if (avatarUrl) {
      if (existingImg) {
        existingImg.src = avatarUrl;
      } else {
        avatarPlaceholder.style.display = 'none';
        const img = document.createElement('img');
        img.src = avatarUrl;
        img.alt = 'Tu foto de perfil';
        avatarDropzone.prepend(img);
      }
    } else if (existingImg) {
      existingImg.remove();
      avatarPlaceholder.style.display = 'block';
    }
  };

  // ── Cargar perfil actual ──
  const loadProfile = async () => {
    try {
      const res = await fetch('/api/profile', { credentials: 'same-origin' });

      if (res.status === 401) {
        window.location.href = '../views/login.html?redirect=' + encodeURIComponent('/views/perfil.html');
        return;
      }

      const data = await res.json();
      profileState = data.user;

      nameInput.value = profileState.name || '';
      emailInput.value = profileState.email || '';
      descriptionInput.value = profileState.description || '';
      charCount.textContent = t('perfil.datos.charCount', { current: descriptionInput.value.length, max: 300 });

      avatarPlaceholder.textContent = (profileState.name || '?').trim().charAt(0).toUpperCase();
      renderAvatar(profileState.avatarUrl);

      if (profileState.hasGoogle && profileState.googleAvatarUrl) {
        googleAvatarBtn.style.display = 'inline-flex';
      }

      if (!profileState.hasPassword) {
        currentPasswordGroup.style.display = 'none';
        passwordDesc.textContent = t('perfil.security.descGoogle');
        passwordDesc.dataset.i18n = 'perfil.security.descGoogle';
      } else {
        passwordDesc.textContent = t('perfil.security.desc');
        passwordDesc.dataset.i18n = 'perfil.security.desc';
      }

    } catch (err) {
      console.error(err);
      showToast('perfil.toast.loadError', 'error');
    }
  };

  descriptionInput.addEventListener('input', () => {
    const len = descriptionInput.value.length;
    charCount.textContent = t('perfil.datos.charCount', { current: len, max: 300 });
    charCount.classList.toggle('limit-near', len > 270);
  });

  // ── Guardar datos personales ──
  document.getElementById('profileForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const statusEl = document.getElementById('profileStatus');

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          description: descriptionInput.value.trim()
        })
      });

      if (!res.ok) {
        const text = await res.text();
        setStatus(statusEl, 'perfil.status.saveError', 'error', { message: text || t('perfil.status.saveError') });
        return;
      }

      const data = await res.json();
      profileState = { ...profileState, ...data.user };
      setStatus(statusEl, 'perfil.status.changesSaved', 'success');
      showToast('perfil.toast.saveSuccess');
      notifyDrawer();

    } catch (err) {
      console.error(err);
      setStatus(statusEl, 'perfil.status.connectionError', 'error');
    }
  });

  // ── Cambiar contraseña ──
  document.getElementById('passwordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const statusEl = document.getElementById('passwordStatus');
    const newPassword = document.getElementById('newPassword').value;
    const currentPassword = document.getElementById('currentPassword').value;

    if (!newPassword) {
      setStatus(statusEl, 'perfil.status.enterNewPassword', 'error');
      return;
    }

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          description: descriptionInput.value.trim(),
          password: newPassword,
          currentPassword
        })
      });

      if (!res.ok) {
        const text = await res.text();
        setStatus(statusEl, 'perfil.status.passwordError', 'error', { message: text || t('perfil.status.passwordError') });
        return;
      }

      document.getElementById('newPassword').value = '';
      document.getElementById('currentPassword').value = '';
      setStatus(statusEl, 'perfil.status.passwordUpdated', 'success');
      showToast('perfil.toast.passwordSuccess');

      currentPasswordGroup.style.display = 'block';
      passwordDesc.textContent = t('perfil.security.desc');
      passwordDesc.dataset.i18n = 'perfil.security.desc';

    } catch (err) {
      console.error(err);
      setStatus(statusEl, 'perfil.status.connectionError', 'error');
    }
  });

  // ── Subir foto local ──
  const openFilePicker = () => avatarInput.click();
  avatarDropzone.addEventListener('click', openFilePicker);
  avatarDropzone.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openFilePicker(); }
  });
  uploadAvatarBtn.addEventListener('click', openFilePicker);

  const uploadFile = async (file) => {
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      showToast('perfil.toast.formatError', 'error');
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      showToast('perfil.toast.sizeError', 'error');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    renderAvatar(previewUrl);

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const res = await fetch('/api/profile/avatar', {
        method: 'POST',
        credentials: 'same-origin',
        body: formData
      });

      if (!res.ok) {
        const text = await res.text();
        showToast('perfil.toast.avatarError', 'error', { message: text || t('perfil.toast.avatarError') });
        renderAvatar(profileState?.avatarUrl || null);
        return;
      }

      const data = await res.json();
      profileState = { ...profileState, ...data.user };
      renderAvatar(profileState.avatarUrl);
      showToast('perfil.toast.avatarSuccess');
      notifyDrawer();

    } catch (err) {
      console.error(err);
      showToast('perfil.toast.connectionError', 'error');
      renderAvatar(profileState?.avatarUrl || null);
    } finally {
      URL.revokeObjectURL(previewUrl);
    }
  };

  avatarInput.addEventListener('change', () => {
    uploadFile(avatarInput.files[0]);
    avatarInput.value = '';
  });

  ['dragenter', 'dragover'].forEach(evt => {
    avatarDropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      avatarDropzone.classList.add('dragging');
    });
  });
  ['dragleave', 'drop'].forEach(evt => {
    avatarDropzone.addEventListener(evt, (e) => {
      e.preventDefault();
      avatarDropzone.classList.remove('dragging');
    });
  });
  avatarDropzone.addEventListener('drop', (e) => {
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    uploadFile(file);
  });

  // ── Usar foto de Google ──
  googleAvatarBtn.addEventListener('click', async () => {
    try {
      const res = await fetch('/api/profile/avatar/google', {
        method: 'POST',
        credentials: 'same-origin'
      });

      if (!res.ok) {
        const text = await res.text();
        showToast('perfil.toast.avatarError', 'error', { message: text || t('perfil.toast.avatarError') });
        return;
      }

      const data = await res.json();
      profileState = { ...profileState, ...data.user };
      renderAvatar(profileState.avatarUrl);
      showToast('perfil.toast.avatarGoogleSuccess');
      notifyDrawer();

    } catch (err) {
      console.error(err);
      showToast('perfil.toast.connectionError', 'error');
    }
  });

  // ── Eliminar cuenta ──
  const deleteOverlay = document.getElementById('deleteModalOverlay');
  const deleteCurrentPasswordGroup = document.getElementById('deleteCurrentPasswordGroup');
  const deleteCurrentPasswordInput = document.getElementById('deleteCurrentPassword');

  document.getElementById('openDeleteModal').addEventListener('click', () => {
    if (profileState && !profileState.hasPassword) {
      deleteCurrentPasswordGroup.style.display = 'none';
    }
    deleteOverlay.classList.add('is-visible');
  });
  document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
    deleteOverlay.classList.remove('is-visible');
    deleteCurrentPasswordInput.value = '';
  });
  deleteOverlay.addEventListener('click', (e) => {
    if (e.target === deleteOverlay) deleteOverlay.classList.remove('is-visible');
  });

  document.getElementById('confirmDeleteBtn').addEventListener('click', async () => {
    try {
      const res = await fetch('/api/profile', {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: deleteCurrentPasswordInput.value })
      });

      if (!res.ok) {
        const text = await res.text();
        showToast('perfil.toast.deleteError', 'error', { message: text || t('perfil.toast.deleteError') });
        return;
      }

      const data = await res.json();
      window.location.href = data.redirect || '../views/index.html';

    } catch (err) {
      console.error(err);
      showToast('perfil.toast.connectionError', 'error');
    }
  });

  loadProfile();
});