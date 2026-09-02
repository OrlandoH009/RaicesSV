const bcrypt = require('bcrypt');
const crypto = require('crypto');
const adminRepository = require('../data/repositories/admin.repository');
const userRepository = require('../data/repositories/user.repository');
const { sendMail, buildStyledEmailHtml, escapeHtml } = require('../data/config/mailer.config');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;

const ID_STATUS_ACTIVO = 1;
const ID_STATUS_SUSPENDIDO = 2;

const ROL_FUNDADOR = 'Fundador';
const ROL_ADMIN = 'Admin';
const ROL_USUARIO = 'Usuario';

const INVITATION_TOKEN_BYTES = 32;
const INVITATION_TTL_MINUTES = 60 * 24; // 24 horas para aceptar la invitación

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

//Sanitización de datos

const sanitizeUserRow = (row) => ({
    id: row.id_user,
    name: row.name,
    email: row.email,
    avatarUrl: row.avatar_url || null,
    createdAt: row.created_at,
    role: row.role_name,
    idRol: row.id_rol,
    status: row.status_name,
    idStatus: row.id_status,
    hasGoogle: Boolean(row.google_id)
});

//Listas y métricas para el dashboard

const listUsers = async () => {
    const rows = await adminRepository.findAllUsers();
    return rows.map(sanitizeUserRow);
};

const getDashboardMetrics = async () => {
    const [usersByStatus, usersByRole, usersByMonth, publicationsByMonth, publicationsTotal] = await Promise.all([
        adminRepository.countUsersByStatus(),
        adminRepository.countUsersByRole(),
        adminRepository.countUsersByMonth(),
        adminRepository.countPublicationsByMonth(),
        adminRepository.countPublicationsTotal()
    ]);

    const totalUsers = usersByStatus.reduce((sum, row) => sum + Number(row.total), 0);

    return {
        totalUsers,
        totalPublications: publicationsTotal,
        usersByStatus: usersByStatus.map((row) => ({ status: row.status_name, total: Number(row.total) })),
        usersByRole: usersByRole.map((row) => ({ role: row.role_name, total: Number(row.total) })),
        usersByMonth: usersByMonth.map((row) => ({ month: row.month, total: Number(row.total) })),
        publicationsByMonth: publicationsByMonth.map((row) => ({ month: row.month, total: Number(row.total) }))
    };
};

//Banear o desbanear un usuario

const setUserStatus = async (id_user, requestingUser, { status, reason, appBaseUrl }) => {
    const idUserNum = Number(id_user);

    if (!Number.isInteger(idUserNum)) {
        const err = new Error('Usuario inválido'); err.expose = true; throw err;
    }

     if (status !== 'activo' && status !== 'suspendido') {
        const err = new Error('El estado debe ser "activo" o "suspendido".'); err.expose = true; throw err;
    }

    if (requestingUser && requestingUser.id === idUserNum) {
        const err = new Error('No puedes cambiar tu propio estado.'); err.expose = true; err.status = 403; throw err;
    }

    const target = await userRepository.findById(idUserNum);
    if (!target) {
        const err = new Error('Usuario no encontrado.'); err.expose = true; throw err;
    }

     if (target.role_name === ROL_FUNDADOR && status === 'suspendido') {
        const err = new Error('El Fundador del sitio no puede ser suspendido.'); err.expose = true; err.status = 403; throw err;
    }

    if (target.role_name === ROL_ADMIN && requestingUser.role !== ROL_FUNDADOR) {
        const err = new Error('Solo el fundador puede suspender a un administrador'); err.expose = true; err.status = 403; throw err;
    }

    const currentStatus = target.status_name === 'Suspendido' ? 'suspendido' : 'activo';
    if (currentStatus === status) {
        const err = new Error(status === 'suspendido' ? 'Este usuario ya está suspendido.' : 'Este usuario ya está activo.'); err.expose = true; throw err;
    }

    if (status === 'suspendido' && (typeof reason !== 'string' || !reason.trim())) {
        const err = new Error('Debes indicar el motivo de la suspensión.'); err.expose = true; throw err;
    }

    if (status === 'suspendido') {
        await adminRepository.createSuspensionRecord(idUserNum, requestingUser.id, reason.trim());
    }
    
    const id_status = status === 'activo' ? ID_STATUS_ACTIVO : ID_STATUS_SUSPENDIDO;
    await adminRepository.updateUserStatus(idUserNum, id_status);

    try {
        if (status === 'suspendido') {
            const appealLink = `${appBaseUrl}/apelar.html`;
            const userName = escapeHtml(target.name || '');
            const safeReason = escapeHtml(reason.trim());

            const html = buildStyledEmailHtml({
                title: 'Tu cuenta ha sido suspendida',
                preheader: 'Conoce el motivo de la suspensión y cómo apelar la decisión.',
                greeting: `Hola ${userName}`,
                content: `
                    <p>Tu cuenta en Salvadorean Roots ha sido suspendida por un administrador.</p>
                    <p><strong>Motivo:</strong> ${safeReason}</p>
                    <p>Si consideras que esto es un error, puedes apelar esta decisión aquí:</p>
                `,
                ctaText: 'Apelar decisión',
                ctaUrl: appealLink,
                footerText: 'Si no realizaste esta acción, puedes ignorar este mensaje.'
            });

            await sendMail({
                to: target.email,
                subject: 'Tu cuenta ha sido suspendida — Salvadorean Roots',
                html,
                text: `Tu cuenta en Salvadorean Roots ha sido suspendida. Motivo: ${reason.trim()}. Puedes apelar aquí: ${appealLink}`
            });
        } else {
            const userName = escapeHtml(target.name || '');
            const html = buildStyledEmailHtml({
                title: 'Tu cuenta ha sido reactivada',
                preheader: 'Ya puedes volver a iniciar sesión y disfrutar de la plataforma.',
                greeting: `Hola ${userName}`,
                content: '<p>Tu cuenta en Salvadorean Roots ha sido reactivada. Ya puedes volver a iniciar sesión con normalidad.</p>',
                footerText: 'Gracias por seguir formando parte de la comunidad.'
            });

            await sendMail({
                to: target.email,
                subject: 'Tu cuenta ha sido reactivada — Salvadorean Roots',
                html,
                text: 'Tu cuenta en Salvadorean Roots ha sido reactivada. Ya puedes volver a iniciar sesión con normalidad.'
            });
        }
    } catch (mailError) {
        console.error('No se pudo enviar el correo de aviso de cambio de estado:', mailError);
    }

    const updated = await userRepository.findById(idUserNum);
    return sanitizeUserRow(updated);
};

// Convertir un usuario a un admin

const promoteToAdmin = async (id_user, requestingUser, { appBaseUrl } = {}) => {
    const idUserNum = Number(id_user);

    if (!Number.isInteger(idUserNum)) {
        const err = new Error('Usuario inválido.'); err.expose = true; throw err;
    }

    if (requestingUser && requestingUser.id === idUserNum) {
        const err = new Error('No puedes cambiar tu propio rol.'); err.expose = true; err.status = 403; throw err;
    }

    const target = await userRepository.findById(idUserNum);
    if (!target) {
        const err = new Error('Usuario no encontrado.'); err.expose = true; throw err;
    }

    if (target.role_name !== ROL_USUARIO) {
        const err = new Error('Solo se puede ascender a un Usuario normal.'); err.expose = true; throw err;
    }

    //Esto es si el usuario si tenia contraseña aunque iniciara con google
    if (target.password) {
        await adminRepository.updateUserRoleByName(idUserNum, ROL_ADMIN);
        const updated = await userRepository.findById(idUserNum);
        return { pending: false, user: sanitizeUserRow(updated) };
    }

    //Este solo funciona si el usuario no tenia una contraseña y solo se logueo con google
    await adminRepository.invalidateUserAdminInvitations(idUserNum);

    const rawToken = crypto.randomBytes(INVITATION_TOKEN_BYTES).toString('hex');
    const tokenHash = hashToken(rawToken);

    await adminRepository.createAdminInvitation(idUserNum, requestingUser.id, tokenHash, INVITATION_TTL_MINUTES);

    const invitationLink = `${appBaseUrl}/aceptar-invitacion.html?token=${rawToken}`;
    const targetName = escapeHtml(target.name || '');
    const requesterName = escapeHtml(requestingUser.name || 'Un administrador');

    const html = buildStyledEmailHtml({
        title: 'Invitación a administrador',
        preheader: 'Completa tu registro y define una contraseña para acceder como administrador.',
        greeting: `Hola ${targetName}`,
        content: `
            <p>${requesterName} te invitó a ser administrador de Salvadorean Roots.</p>
            <p>Para completar el proceso, establece una contraseña para tu cuenta:</p>
        `,
        ctaText: 'Aceptar invitación',
        ctaUrl: invitationLink,
        footerText: 'Este enlace es válido por 24 horas. Si no esperabas esta invitación, puedes ignorar este correo.'
    });

    await sendMail({
        to: target.email,
        subject: 'Invitación a administrador — Salvadorean Roots',
        html,
        text: `Fuiste invitado a ser administrador de Salvadorean Roots. Completa tu registro aquí: ${invitationLink} (válido por 24 horas)`
    });

    return { pending: true, user: sanitizeUserRow(target) };
};

//Completar la invitación a ser admin

const completeAdminInvitation = async (rawToken, newPassword) => {
    if (typeof rawToken !== 'string' || !rawToken.trim()) {
        const err = new Error('El enlace de invitación no es válido o ya expiró.'); err.expose = true; throw err;
    }

    if (typeof newPassword !== 'string' || newPassword.length < MIN_PASSWORD_LENGTH) {
        const err = new Error(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`); err.expose = true; throw err;
    }

    const tokenHash = hashToken(rawToken.trim());
    const invitation = await adminRepository.findValidAdminInvitation(tokenHash);

    if (!invitation) {
        const err = new Error('El enlace de invitación no es válido o ya expiró.'); err.expose = true; throw err;
    }

    const target = await userRepository.findById(invitation.id_user);
    if (!target) {
        const err = new Error('Usuario no encontrado.'); err.expose = true; throw err;
    }

    if (target.role_name !== ROL_USUARIO) {
        const err = new Error('Este usuario ya no está pendiente de ascenso.'); err.expose = true; throw err;
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await userRepository.updatePassword(invitation.id_user, newHash);
    await adminRepository.updateUserRoleByName(invitation.id_user, ROL_ADMIN);
    await adminRepository.markAdminInvitationUsed(invitation.id_invitation);

    const updated = await userRepository.findById(invitation.id_user);
    return sanitizeUserRow(updated);
};

//Degradar un admin a usuario y eliminar admin

const demoteAdminToUser = async (id_user, requestingUser) => {
    const idUserNum = Number(id_user);

    if (requestingUser.role !== ROL_FUNDADOR) {
        const err = new Error('Solo el Fundador puede degradar administradores.'); err.expose = true; err.status = 403; throw err;
    }

    if (requestingUser.id === idUserNum) {
        const err = new Error('No puedes cambiar tu propio rol.'); err.expose = true; err.status = 403; throw err;
    }

    const target = await userRepository.findById(idUserNum);
    if (!target) {
        const err = new Error('Usuario no encontrado.'); err.expose = true; throw err;
    }

    if (target.role_name === ROL_FUNDADOR) {
        const err = new Error('El Fundador no puede ser degradado.'); err.expose = true; err.status = 403; throw err;
    }

    if (target.role_name !== ROL_ADMIN) {
        const err = new Error('Este usuario no es administrador.'); err.expose = true; throw err;
    }

    await adminRepository.updateUserRoleByName(idUserNum, ROL_USUARIO);

    const updated = await userRepository.findById(idUserNum);
    return sanitizeUserRow(updated);
};

const deleteAdmin = async (id_user, requestingUser) => {
    const idUserNum = Number(id_user);

    if (requestingUser.role !== ROL_FUNDADOR) {
        const err = new Error('Solo el Fundador puede eliminar administradores.'); err.expose = true; err.status = 403; throw err;
    }

    if (requestingUser.id === idUserNum) {
        const err = new Error('No puedes eliminarte a ti mismo.'); err.expose = true; err.status = 403; throw err;
    }

    const target = await userRepository.findById(idUserNum);
    if (!target) {
        const err = new Error('Usuario no encontrado.'); err.expose = true; throw err;
    }

    if (target.role_name === ROL_FUNDADOR) {
        const err = new Error('El Fundador no puede ser eliminado.'); err.expose = true; err.status = 403; throw err;
    }

    if (target.role_name !== ROL_ADMIN) {
        const err = new Error('Esta acción solo aplica a administradores.'); err.expose = true; throw err;
    }

    await adminRepository.deleteUserById(idUserNum);
};

// Creación de un nuevo administrador

const createAdmin = async (name, email, password) => {
    if (typeof name !== 'string' || !name.trim()) {
        const err = new Error('El nombre es obligatorio.'); err.expose = true; throw err;
    }

    if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
        const err = new Error('El correo electrónico no es válido.'); err.expose = true; throw err;
    }

    if (typeof password !== 'string' || password.length < MIN_PASSWORD_LENGTH) {
        const err = new Error(`La contraseña debe tener al menos ${MIN_PASSWORD_LENGTH} caracteres.`); err.expose = true; throw err;
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existing = await userRepository.findByEmail(normalizedEmail);
    if (existing) {
        const err = new Error('Ya existe una cuenta con ese correo electrónico.'); err.expose = true; throw err;
    }

    const hash = await bcrypt.hash(password, 10);

    const result = await adminRepository.createAdminUser(name.trim(), normalizedEmail, hash);

    const created = await userRepository.findById(result.insertId);
    return sanitizeUserRow(created);
};

const MAX_APPEAL_MESSAGE_LENGTH = 1000;

const sanitizeAppealRow = (row) => ({
    id: row.id_appeal,
    userId: row.id_user,
    userName: row.user_name || null,
    userAvatarUrl: row.user_avatar_url || null,
    email: row.email,
    message: row.message,
    isValid: Boolean(row.is_valid),
    reviewedAt: row.reviewed_at,
    createdAt: row.created_at
});

const submitAppeal = async (email, message) => {
    if (typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
        const err = new Error('El correo electrónico no es válido.'); err.expose = true; throw err;
    }

    if (typeof message !== 'string' || !message.trim()) {
        const err = new Error('Debes escribir tu apelación.'); err.expose = true; throw err;
    }

    if (message.trim().length > MAX_APPEAL_MESSAGE_LENGTH) {
        const err = new Error(`La apelación no puede superar los ${MAX_APPEAL_MESSAGE_LENGTH} caracteres.`); err.expose = true; throw err;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const suspendedUser = await adminRepository.findSuspendedUserByEmail(normalizedEmail);

    const isValid = Boolean(suspendedUser);
    const idUser = suspendedUser ? suspendedUser.id_user : null;

    await adminRepository.createAppeal(idUser, normalizedEmail, message.trim(), isValid);
};

const getAppeals = async () => {
    const [validRows, invalidRows] = await Promise.all([
        adminRepository.findValidAppeals(),
        adminRepository.findInvalidAppeals()
    ]);

    return {
        valid: validRows.map(sanitizeAppealRow),
        invalid: invalidRows.map(sanitizeAppealRow)
    };
};


const markAppealAsReviewed = async (id_appeal) => {
    const idAppealNum = Number(id_appeal);
    if (!Number.isInteger(idAppealNum)) {
        const err = new Error('Apelación inválida.'); err.expose = true; throw err;
    }

    const appeal = await adminRepository.findAppealById(idAppealNum);
    if (!appeal) {
        const err = new Error('Apelación no encontrada.'); err.expose = true; throw err;
    }

    await adminRepository.markAppealReviewed(idAppealNum);

    const updated = await adminRepository.findAppealById(idAppealNum);
    return sanitizeAppealRow(updated);
};

module.exports = {
    listUsers,
    getDashboardMetrics,
    setUserStatus,
    promoteToAdmin,
    completeAdminInvitation,
    demoteAdminToUser,
    deleteAdmin,
    createAdmin,
    submitAppeal,
    getAppeals,
    markAppealAsReviewed
};