/* ============================================================
   RAÍCES SV — perfil.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const toast = document.getElementById('perfil-toast');
  const showToast = (message, type = 'success') => {
    toast.textContent = message;
    toast.className = type;
    requestAnimationFrame(() => toast.classList.add('show'));
    clearTimeout(showToast.timeout);
    showToast.timeout = setTimeout(() => toast.classList.remove('show'), 3200);
  };

  const setStatus = (el, message, type) => {
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
      charCount.textContent = `${descriptionInput.value.length} / 300`;

      avatarPlaceholder.textContent = (profileState.name || '?').trim().charAt(0).toUpperCase();
      renderAvatar(profileState.avatarUrl);

      if (profileState.hasGoogle && profileState.googleAvatarUrl) {
        googleAvatarBtn.style.display = 'inline-flex';
      }

      if (!profileState.hasPassword) {
        // Cuenta creada solo con Google: no pide contraseña actual todavía.
        currentPasswordGroup.style.display = 'none';
        passwordDesc.textContent = 'Aún no tienes una contraseña (ingresaste con Google). Crea una para poder iniciar sesión también con correo.';
      }

    } catch (err) {
      console.error(err);
      showToast('No se pudo cargar tu perfil.', 'error');
    }
  };

  descriptionInput.addEventListener('input', () => {
    const len = descriptionInput.value.length;
    charCount.textContent = `${len} / 300`;
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
        setStatus(statusEl, text || 'No se pudo guardar.', 'error');
        return;
      }

      const data = await res.json();
      profileState = { ...profileState, ...data.user };
      setStatus(statusEl, 'Cambios guardados', 'success');
      showToast('Tu perfil se actualizó correctamente.');

    } catch (err) {
      console.error(err);
      setStatus(statusEl, 'Error de conexión.', 'error');
    }
  });

  // ── Cambiar contraseña ──
  document.getElementById('passwordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const statusEl = document.getElementById('passwordStatus');
    const newPassword = document.getElementById('newPassword').value;
    const currentPassword = document.getElementById('currentPassword').value;

    if (!newPassword) {
      setStatus(statusEl, 'Escribe una nueva contraseña.', 'error');
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
        setStatus(statusEl, text || 'No se pudo actualizar.', 'error');
        return;
      }

      document.getElementById('newPassword').value = '';
      document.getElementById('currentPassword').value = '';
      setStatus(statusEl, 'Contraseña actualizada', 'success');
      showToast('Tu contraseña se actualizó correctamente.');

      // Si antes no tenía contraseña (solo Google), ahora sí -> pedirla en el futuro.
      currentPasswordGroup.style.display = 'block';
      passwordDesc.textContent = 'Cambia tu contraseña cuando quieras.';

    } catch (err) {
      console.error(err);
      setStatus(statusEl, 'Error de conexión.', 'error');
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
      showToast('Formato no soportado. Usa JPG, PNG o WEBP.', 'error');
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      showToast('La imagen no puede pesar más de 3 MB.', 'error');
      return;
    }

    // Preview optimista
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
        showToast(text || 'No se pudo subir la foto.', 'error');
        renderAvatar(profileState?.avatarUrl || null);
        return;
      }

      const data = await res.json();
      profileState = { ...profileState, ...data.user };
      renderAvatar(profileState.avatarUrl);
      showToast('Foto de perfil actualizada.');

    } catch (err) {
      console.error(err);
      showToast('Error de conexión al subir la foto.', 'error');
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
        showToast(text || 'No se pudo usar la foto de Google.', 'error');
        return;
      }

      const data = await res.json();
      profileState = { ...profileState, ...data.user };
      renderAvatar(profileState.avatarUrl);
      showToast('Ahora usas tu foto de Google.');

    } catch (err) {
      console.error(err);
      showToast('Error de conexión.', 'error');
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
        showToast(text || 'No se pudo eliminar la cuenta.', 'error');
        return;
      }

      const data = await res.json();
      window.location.href = data.redirect || '../views/index.html';

    } catch (err) {
      console.error(err);
      showToast('Error de conexión.', 'error');
    }
  });

  loadProfile();
});