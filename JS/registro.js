function getUsers() {
  try { return JSON.parse(localStorage.getItem('rs_users') || '[]'); } catch { return []; }
}

function saveUsers(users) { localStorage.setItem('rs_users', JSON.stringify(users)); }

function findUserByEmail(email) {
  const users = getUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

function ensureMessageContainer(card) {
  let msg = card.querySelector('.auth-message');
  if (!msg) {
    msg = document.createElement('div');
    msg.className = 'auth-message';
    msg.style.margin = '10px 0';
    card.insertBefore(msg, card.firstChild);
  }
  return msg;
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  if (!form) return;
  const card = document.querySelector('.auth-card') || document.body;

  const nombre = document.getElementById('nombre');
  const apellido = document.getElementById('apellido');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const password2 = document.getElementById('password2');
  const terms = document.getElementById('terms');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const msg = ensureMessageContainer(card);

    const n = nombre.value.trim();
    const a = apellido.value.trim();
    const em = email.value.trim();
    const p = password.value;
    const p2 = password2.value;

    if (!n || !a || !em || !p || !p2) {
      msg.textContent = 'Completa todos los campos.';
      msg.style.color = 'crimson';
      return;
    }

    if (!terms.checked) {
      msg.textContent = 'Debes aceptar los términos y condiciones.';
      msg.style.color = 'crimson';
      return;
    }

    if (p.length < 8) {
      msg.textContent = 'La contraseña debe tener al menos 8 caracteres.';
      msg.style.color = 'crimson';
      return;
    }

    if (p !== p2) {
      msg.textContent = 'Las contraseñas no coinciden.';
      msg.style.color = 'crimson';
      return;
    }

    if (findUserByEmail(em)) {
      msg.textContent = 'Ya existe una cuenta con ese correo.';
      msg.style.color = 'crimson';
      return;
    }

    const users = getUsers();
    const newUser = { id: Date.now(), nombre: n, apellido: a, email: em, password: p };
    users.push(newUser);
    saveUsers(users);

    msg.textContent = 'Cuenta creada correctamente. Redirigiendo a inicio de sesión...';
    msg.style.color = 'green';
    setTimeout(() => { location.href = 'login.html'; }, 900);
  });
});
