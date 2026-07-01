const bcrypt = require('bcrypt');
const userRepository = require('../data/repositories/user.repository');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

// Mensaje genérico: nunca revelamos si falló por el correo o por la contraseña,
// para no permitir que alguien "adivine" qué correos están registrados.
const INVALID_CREDENTIALS_MSG = 'Correo o contraseña incorrectos';

const login = async (email, password) => {

    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
        const err = new Error(INVALID_CREDENTIALS_MSG); err.expose = true; throw err;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await userRepository.findByEmail(normalizedEmail);

    if (!user) {
        // Seguimos el mismo camino (incluyendo un hash "dummy") para que el tiempo de
        // respuesta no delate si el correo existe o no (mitiga ataques de timing).
        await bcrypt.compare(password, '$2b$10$C6UzMDM.H6dfI/f/IKcEeO2XQdlNZQ0Xw3n7q9Vz8v0S5b0S6b0S6');
        const err = new Error(INVALID_CREDENTIALS_MSG); err.expose = true; throw err;
    }

    let valid = false;

    if (user.password && typeof user.password === 'string') {
        if (user.password.startsWith('$2') && user.password.length > 50) {
            try {
                valid = await bcrypt.compare(password, user.password);
            } catch (error) {
                valid = false;
            }
        } else {
            // Compatibilidad con cuentas antiguas guardadas en texto plano.
            valid = user.password === password;

            if (valid) {
                // Auto-migración: en cuanto el usuario inicia sesión correctamente,
                // se re-guarda su contraseña ya hasheada con bcrypt.
                try {
                    const newHash = await bcrypt.hash(password, 10);
                    await userRepository.updatePassword(user.id_user, newHash);
                } catch (error) {
                    console.error('No se pudo migrar la contraseña a bcrypt:', error);
                }
            }
        }
    }

    if (!valid) {
        const err = new Error(INVALID_CREDENTIALS_MSG); err.expose = true; throw err;
    }

    return user;
};

const register = async (name, email, password) => {

    if (typeof name !== 'string' || !name.trim()) {
        const err = new Error('El nombre es obligatorio'); err.expose = true; throw err;
    }

    if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
        const err = new Error('El correo electrónico no es válido'); err.expose = true; throw err;
    }

    if (typeof password !== 'string' || password.length < MIN_PASSWORD_LENGTH) {
        const err = new Error(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`); err.expose = true; throw err;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existing = await userRepository.findByEmail(normalizedEmail);

    if (existing) {
        // No decimos "el correo ya existe" para no confirmar a un atacante que esa
        // cuenta está registrada; se usa el mismo mensaje sin importar la causa real.
        const err = new Error('No se pudo completar el registro con los datos proporcionados'); err.expose = true; throw err;
    }

    const hash = await bcrypt.hash(password, 10);

    try {
        await userRepository.createUser(
            name.trim(),
            normalizedEmail,
            hash
        );
    } catch (error) {
        // Cubre la condición de carrera (dos registros simultáneos con el mismo correo)
        // gracias a la restricción UNIQUE en la base de datos.
        if (error && error.code === 'ER_DUP_ENTRY') {
            const err = new Error('No se pudo completar el registro con los datos proporcionados'); err.expose = true; throw err;
        }
        throw error;
    }
};

module.exports = {
    login,
    register
};
