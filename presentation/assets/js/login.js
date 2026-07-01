document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('login-form');
  const messageBox = document.getElementById('form-message');
  const passwordInput = document.querySelector('input[name="password"]');

  if (passwordInput) {
    const formGroup = passwordInput.closest('.form-group');
    if (formGroup) {
      const toggleButton = document.createElement('button');
      toggleButton.type = 'button';
      toggleButton.className = 'password-toggle';
      toggleButton.setAttribute('aria-label', 'Mostrar contraseña');
      toggleButton.innerHTML = '👁';
      formGroup.appendChild(toggleButton);
      toggleButton.addEventListener('click', () => {
        const isHidden = passwordInput.type === 'password';
        passwordInput.type = isHidden ? 'text' : 'password';
        toggleButton.innerHTML = isHidden ? '🙈' : '👁';
        toggleButton.setAttribute('aria-label', isHidden ? 'Ocultar contraseña' : 'Mostrar contraseña');
      });
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
    const payload = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const text = await response.text();

      if (response.ok || response.redirected) {
        window.location.href = response.url || '/';
        return;
      }

      showMessage(text || 'No se pudo iniciar sesión.');
    } catch (error) {
      showMessage('No se pudo conectar con el servidor.');
    }
  });
});
