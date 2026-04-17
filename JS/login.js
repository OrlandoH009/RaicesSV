// Login handling using localStorage (contraseña en texto plano)
// Usage: included from `login.html` — binds to the page form automatically
//Archivos temporales mientras se crea el controlador de php
function getUsers() {
	try {
		return JSON.parse(localStorage.getItem('rs_users') || '[]');
	} catch (e) {
		return [];
	}
}

function saveUsers(users) {
	localStorage.setItem('rs_users', JSON.stringify(users));
}

function findUserByEmail(email) {
	const users = getUsers();
	return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

function setSession(user) {
	const session = { email: user.email, nombre: user.nombre, ts: Date.now() };
	localStorage.setItem('rs_session', JSON.stringify(session));
}

function getSession() {
	try { return JSON.parse(localStorage.getItem('rs_session')); } catch { return null; }
}

function logout() {
	localStorage.removeItem('rs_session');
	location.href = 'index.html';
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
	const emailInput = document.getElementById('email');
	const passwordInput = document.getElementById('password');

	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const email = emailInput.value.trim();
		const password = passwordInput.value;
		const msg = ensureMessageContainer(card);

		if (!email || !password) {
			msg.textContent = 'Por favor completa todos los campos.';
			msg.style.color = 'crimson';
			return;
		}

		const user = findUserByEmail(email);
		if (!user) {
			msg.textContent = 'Usuario no encontrado. Verifica el correo o regístrate.';
			msg.style.color = 'crimson';
			return;
		}

	    if (password !== user.password) {
	      msg.textContent = 'Contraseña incorrecta.';
	      msg.style.color = 'crimson';
	      return;
	    }

		setSession(user);
		msg.textContent = 'Inicio de sesión exitoso. Redirigiendo...';
		msg.style.color = 'green';
		setTimeout(() => { location.href = 'index.html'; }, 800);
	});
});

// Expose helpers for other scripts/pages
window.rsAuth = { getSession, logout, getUsers, findUserByEmail };
