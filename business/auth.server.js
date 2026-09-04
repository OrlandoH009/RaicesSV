const bcrypt = require('bcrypt');
const crypto = require('crypto');
const userRepository = require('../data/repositories/user.repository');
const { sendMail, buildStyledEmailHtml, escapeHtml } = require('../data/config/mailer.config');
const {domainHasMailServer} = require('../data/config/emailVerifier.config');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

const INVALID_CREDENTIALS_MSG = 'Correo o contraseña incorrectos';

const RESET_TOKEN_BYTES = 32;
const RESET_TOKEN_TTL_MINUTES = 30;

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

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

    if (user.status_name === 'Suspendido') {
        const err = new Error('Tu cuenta ha sido suspendida. Contacta a un administrador.'); err.expose = true; throw err;
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

    const domainIsReal = await domainHasMailServer(normalizedEmail);
    if (!domainIsReal) {
        const err = new Error('Su dominio de correo electrónico no existe o no recibe correos');
        err.expose = true
        throw err;
    }

    const existing = await userRepository.findByEmail(normalizedEmail);

    if (existing) {
        const err = new Error('No se pudo completar el registro con los datos proporcionados'); err.expose = true; throw err;
    }

    const hash = await bcrypt.hash(password, 10);

    let result; 
    try {
        result = await userRepository.createUser(
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

    return await userRepository.findById(result.insertId);
};
const loginOrRegisterWithGoogle = async (name, email, googleId, googlePhotoUrl) => {
    if (typeof name !== 'string' || typeof googleId !== 'string' || !googleId.trim()) {
        const e = new Error('No se logró terminar el incio de sesión con Google'); e.expose = true; throw e;
    }

    const existingByGoogle = await userRepository.findByGoogleId(googleId);

    if (existingByGoogle) {
        if (existingByGoogle.status_name === 'Suspendido') {
            const err = new Error('Tu cuenta ha sido suspendida. Contacta a un administrador.'); err.expose = true; throw err;
        }
        if (googlePhotoUrl) {
            await userRepository.updateGoogleAvatarCache(existingByGoogle.id_user, googlePhotoUrl);
        }
        return await userRepository.findByGoogleId(googleId);
    }
    const normalizedEmail = email.trim().toLowerCase();
    const existingByEmail = await userRepository.findByEmail(normalizedEmail);
    if (existingByEmail) {
        if (existingByEmail.status_name === 'Suspendido') {
            const err = new Error('Tu cuenta ha sido suspendida. Contacta a un administrador.'); err.expose = true; throw err;
        }
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

// ── Nuevo: recuperación de contraseña ──

/**
 * Genera (si aplica) un token de recuperación y envía el correo.
 * Por seguridad, esta función NUNCA revela si el correo existe o no:
 * el controlador siempre responde el mismo mensaje genérico, exista o
 * no la cuenta, para evitar enumeración de usuarios.
 */
const requestPasswordReset = async (email, appBaseUrl) => {
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
        return;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await userRepository.findByEmail(normalizedEmail);

    if (!user) return;

    // Las cuentas creadas solo con Google no tienen contraseña local que resetear.
    if (!user.password) return;

    // Invalida cualquier token anterior sin usar, para que solo el más reciente sirva.
    await userRepository.invalidateUserPasswordResets(user.id_user);

    const rawToken = crypto.randomBytes(RESET_TOKEN_BYTES).toString('hex');
    const tokenHash = hashToken(rawToken);
    const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MINUTES * 60 * 1000);

    // Formato MySQL DATETIME
    const expiresAtSql = expiresAt.toISOString().slice(0, 19).replace('T', ' ');

    await userRepository.createPasswordReset(user.id_user, tokenHash, expiresAtSql);

    const resetLink = `${appBaseUrl}/restablecer.html?token=${rawToken}`;
    const userName = escapeHtml(user.name || '');

    const html = buildStyledEmailHtml({
        title: 'Recupera tu contraseña',
        preheader: 'Haz clic aquí para crear una nueva contraseña y recuperar el acceso a tu cuenta.',
        greeting: `Hola ${userName}`,
        content: `
            <p>Recibimos una solicitud para restablecer la contraseña de tu cuenta en Salvadorean Roots.</p>
            <p>Para continuar, usa el botón que aparece a continuación. Este enlace es válido por ${RESET_TOKEN_TTL_MINUTES} minutos.</p>
        `,
        ctaText: 'Restablecer contraseña',
        ctaUrl: resetLink,
        footerText: 'Si tú no solicitaste este cambio, puedes ignorar este correo; tu contraseña seguirá siendo la misma.'
    });

    await sendMail({
        to: user.email,
        subject: 'Recupera tu contraseña — Salvadorean Roots',
        html,
        text: `Recupera tu contraseña en Salvadorean Roots: ${resetLink} (válido por ${RESET_TOKEN_TTL_MINUTES} minutos)`
    });
};

/**
 * Valida el token recibido (comparando su hash) y, si es válido y no expiró,
 * actualiza la contraseña e invalida el token para que no pueda reutilizarse.
 */
const resetPassword = async (rawToken, newPassword) => {
    if (typeof rawToken !== 'string' || !rawToken.trim()) {
        const err = new Error('El enlace de recuperación no es válido o ya expiró.'); err.expose = true; throw err;
    }

    if (typeof newPassword !== 'string' || newPassword.length < MIN_PASSWORD_LENGTH) {
        const err = new Error(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres`); err.expose = true; throw err;
    }

    const tokenHash = hashToken(rawToken.trim());
    const resetRecord = await userRepository.findValidPasswordReset(tokenHash);

    if (!resetRecord) {
        const err = new Error('El enlace de recuperación no es válido o ya expiró.'); err.expose = true; throw err;
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await userRepository.updatePassword(resetRecord.id_user, newHash);
    await userRepository.markPasswordResetUsed(resetRecord.id_reset);
};

module.exports = {
    login,
    register,
    loginOrRegisterWithGoogle,
    getProfile,
    updateProfile,
    setLocalAvatar,
    setGoogleAvatar,
    deleteAccount,
    requestPasswordReset,
    resetPassword
};