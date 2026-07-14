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

const loginOrRegisterWithGoogle = async (name, email, googleId, googlePhotoUrl) => {
    if (typeof name !== 'string' || typeof googleId !== 'string' || !googleId.trim()) {
        const e = new Error('No se logró terminar el incio de sesión con Google'); e.expose = true; throw e;
    }

    const existingByGoogle = await userRepository.findByGoogleId(googleId);

    if (existingByGoogle) {
        if (googlePhotoUrl) {
            await userRepository.updateGoogleAvatarCache(existingByGoogle.id_user, googlePhotoUrl);
        }
        return await userRepository.findByGoogleId(googleId);
    }
    const normalizedEmail = email.trim().toLowerCase();
    const existingByEmail = await userRepository.findByEmail(normalizedEmail);
    if (existingByEmail) {
        await userRepository.linkGoogleId(existingByEmail.id_user, googleId);
        if (googlePhotoUrl) {
            await userRepository.updateGoogleAvatarCache(existingByEmail.id_user, googlePhotoUrl);
        }
        return await userRepository.findById(existingByEmail.id_user);
    }
    await userRepository.createGoogleUser(name.trim(), normalizedEmail, googleId);
    const newUser = await userRepository.findByGoogleId(googleId);
    if (googlePhotoUrl) {
        await userRepository.updateGoogleAvatarCache(newUser.id_user, googlePhotoUrl);
    }
    return await userRepository.findById(newUser.id_user);
};

// ── Nuevo: helpers de perfil ──

const sanitizeUser = (user) => ({
    id: user.id_user,
    name: user.name,
    email: user.email,
    description: user.description || '',
    avatarUrl: user.avatar_url || null,
    avatarSource: user.avatar_source || null,
    hasGoogle: Boolean(user.google_id),
    googleAvatarUrl: user.google_avatar_url || null,
    hasPassword: Boolean(user.password)
});

const getProfile = async (id_user) => {
    const user = await userRepository.findById(id_user);
    if (!user) {
        const err = new Error('Usuario no encontrado.'); err.expose = true; throw err;
    }
    return sanitizeUser(user);
};

const updateProfile = async (id_user, { name, email, description, password, currentPassword }) => {
    const user = await userRepository.findById(id_user);
    if (!user) {
        const err = new Error('Usuario no encontrado.'); err.expose = true; throw err;
    }

    if (typeof name !== 'string' || !name.trim()) {
        const err = new Error('El nombre es obligatorio.'); err.expose = true; throw err;
    }

    if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
        const err = new Error('El correo electrónico no es válido.'); err.expose = true; throw err;
    }

    if (description && description.length > 300) {
        const err = new Error('La descripción no puede superar los 300 caracteres.'); err.expose = true; throw err;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedEmail !== user.email) {
        const existing = await userRepository.findByEmail(normalizedEmail);
        if (existing && existing.id_user !== id_user) {
            const err = new Error('Ese correo ya está en uso por otra cuenta.'); err.expose = true; throw err;
        }
    }

    await userRepository.updateProfileInfo(id_user, {
        name: name.trim(),
        email: normalizedEmail,
        description: (description || '').trim()
    });

    if (password) {
        if (password.length < MIN_PASSWORD_LENGTH) {
            const err = new Error(`La nueva contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`); err.expose = true; throw err;
        }

        if (user.password) {
            if (!currentPassword) {
                const err = new Error('Debes ingresar tu contraseña actual para cambiarla.'); err.expose = true; throw err;
            }
            const valid = await bcrypt.compare(currentPassword, user.password);
            if (!valid) {
                const err = new Error('Tu contraseña actual no es correcta.'); err.expose = true; throw err;
            }
        }

        const newHash = await bcrypt.hash(password, 10);
        await userRepository.updatePassword(id_user, newHash);
    }

    const updated = await userRepository.findById(id_user);
    return sanitizeUser(updated);
};

const setLocalAvatar = async (id_user, avatarUrl) => {
    await userRepository.updateAvatar(id_user, { avatar_url: avatarUrl, avatar_source: 'local' });
    const updated = await userRepository.findById(id_user);
    return sanitizeUser(updated);
};

const setGoogleAvatar = async (id_user) => {
    const user = await userRepository.findById(id_user);
    if (!user || !user.google_avatar_url) {
        const err = new Error('No hay una foto de Google vinculada a esta cuenta.'); err.expose = true; throw err;
    }
    await userRepository.updateAvatar(id_user, { avatar_url: user.google_avatar_url, avatar_source: 'google' });
    const updated = await userRepository.findById(id_user);
    return sanitizeUser(updated);
};

const deleteAccount = async (id_user, { currentPassword } = {}) => {
    const user = await userRepository.findById(id_user);
    if (!user) {
        const err = new Error('Usuario no encontrado.'); err.expose = true; throw err;
    }

    if (user.password) {
        if (!currentPassword) {
            const err = new Error('Debes confirmar tu contraseña para eliminar la cuenta.'); err.expose = true; throw err;
        }
        const valid = await bcrypt.compare(currentPassword, user.password);
        if (!valid) {
            const err = new Error('Tu contraseña no es correcta.'); err.expose = true; throw err;
        }
    }

    // Se eliminan primero los registros dependientes para respetar las FK.
    await userRepository.deleteComentsByUser(id_user);
    await userRepository.deleteScoresByUser(id_user);
    await userRepository.deleteUser(id_user);
};

module.exports = {
    login,
    register,
    loginOrRegisterWithGoogle,
    getProfile,
    updateProfile,
    setLocalAvatar,
    setGoogleAvatar,
    deleteAccount
};