const bcrypt = require('bcrypt');
const adminRepository = require('../data/repositories/admin.repository');
const userRepository = require('../data/repositories/user.repository');
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const ID_STATUS_ACTIVO = 1;
const ID_STATUS_SUSPENDIDO = 2;
const ROL_FUNDADOR = 'Fundador';
const ROL_ADMIN = 'Admin';
const ROL_USUARIO = 'Usuario';

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

const setUserStatus = async (id_user, requestingUser, { status }) => {
    const idUserNum = Number(id_user);
    if (!Number.isInteger(idUserNum)) {
        const err = new Error('Usuario inválido.'); err.expose = true; throw err;
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
    const id_status = status === 'activo' ? ID_STATUS_ACTIVO : ID_STATUS_SUSPENDIDO;
    await adminRepository.updateUserStatus(idUserNum, id_status);
    const updated = await userRepository.findById(idUserNum);
    return sanitizeUserRow(updated);
};

const promoteToAdmin = async (id_user, requestingUser) => {
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
    if (!target.password) {
        const err = new Error('Este usuario no tiene contraseña propia (solo inició sesión con Google). Debe establecer una contraseña antes de ser administrador.'); err.expose = true; err.status = 409; throw err;
    }
    await adminRepository.updateUserRoleByName(idUserNum, ROL_ADMIN);
    const updated = await userRepository.findById(idUserNum);
    return sanitizeUserRow(updated);
};

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

module.exports = {
    listUsers,
    getDashboardMetrics,
    setUserStatus,
    promoteToAdmin,
    demoteAdminToUser,
    deleteAdmin,
    createAdmin
};
