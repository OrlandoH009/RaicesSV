const bcrypt = require('bcrypt');
const userRepository = require('../data/repositories/user.repository');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

const INVALID_CREDENTIALS_MSG = 'Correo o contraseña incorrectos';

const login = async (email, password) => {

    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
        const err = new Error(INVALID_CREDENTIALS_MSG); err.expose = true; throw err;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await userRepository.findByEmail(normalizedEmail);

    if (!user) {
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
            valid = user.password === password;

            if (valid) {
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
        if (error && error.code === 'ER_DUP_ENTRY') {
            const err = new Error('No se pudo completar el registro con los datos proporcionados'); err.expose = true; throw err;
        }
        throw error;
    }
};

const loginOrRegisterWithGoogle = async (name, email, googleId) => {
    if (typeof name !== 'string' || typeof googleId !=='string' || !googleId.trim()) {
        const e = new Error('No se logró terminar el incio de sesión con Google'); e.expose = true; throw e;
    }

    const existingByGoogle = await userRepository.findByGoogleId(googleId);

    if (existingByGoogle) {
        return existingByGoogle;
    }
    const normalizedEmail = email.trim().toLowerCase();
    const existingByEmail = await userRepository.findByEmail(normalizedEmail);
    if (existingByEmail) {
        await userRepository.linkGoogleId(existingByEmail.id_user, googleId);
        return existingByEmail;
    }
   await userRepository.createGoogleUser(name.trim(), normalizedEmail, googleId);
   const newUser = await userRepository.findByGoogleId(googleId);
   return newUser;
};

module.exports = {
    login,
    register,
    loginOrRegisterWithGoogle
};