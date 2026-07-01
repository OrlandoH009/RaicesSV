document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  const messageBox = document.getElementById('form-message');

  ['input[name="password"]', 'input[name="password2"]'].forEach((selector) => {
    const input = document.querySelector(selector);
    if (!input) return;

    const formGroup = input.closest('.form-group');
    if (!formGroup) return;

    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className = 'password-toggle';
    toggleButton.setAttribute('aria-label', 'Mostrar contraseña');
    toggleButton.innerHTML = '👁';
    formGroup.appendChild(toggleButton);

    toggleButton.addEventListener('click', () => {
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      toggleButton.innerHTML = isHidden ? '🙈' : '👁';
      toggleButton.setAttribute('aria-label', isHidden ? 'Ocultar contraseña' : 'Mostrar contraseña');
    });
  });

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
    const password = formData.get('password');
    const password2 = formData.get('password2');

    if (password !== password2) {
      showMessage('Las contraseñas no coinciden.');
      return;
    }

    const name = [formData.get('nombre'), formData.get('apellido')]
      .filter(Boolean)
      .join(' ')
      .trim();

    if (!name) {
      showMessage('Debes indicar tu nombre.');
      return;
    }

    const payload = {
      name,
      email: formData.get('email'),
      password
    };

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const text = await response.text();

      if (response.ok || response.redirected) {
        window.location.href = response.url || '/login.html';
        return;
      }

      showMessage(text || 'No se pudo crear la cuenta.');
    } catch (error) {
      showMessage('No se pudo conectar con el servidor.');
    }
  });
});
