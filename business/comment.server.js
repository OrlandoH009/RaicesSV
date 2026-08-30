const commentRepository = require('../data/repositories/comment.repository');
const publicationRepository = require('../data/repositories/publication.repository');
const adminRepository = require('../data/repositories/admin.repository');
const { containsBadWords } = require('./comment.moderation');
const { sendMail, buildStyledEmailHtml, escapeHtml } = require('../data/config/mailer.config');

const MAX_COMMENT_LENGTH = 500;

const ROL_ADMIN = 'Admin';
const ROL_FUNDADOR = 'Fundador';

const sanitizeComment = (row, currentUser) => {
    const isOwner = Boolean(currentUser) && currentUser.id === row.id_user;
    const isAdmin = Boolean(currentUser) && (currentUser.role === ROL_ADMIN || currentUser.role === ROL_FUNDADOR);

    return {
        id: row.id_coment,
        text: row.coment,
        createdAt: row.created_at,
        author: {
            id: row.id_user,
            name: row.author_name,
            avatarUrl: row.author_avatar_url || null
        },
        canDelete: isOwner || isAdmin
    };
};

const listComments = async (id_publication, currentUser) => {
    const rows = await commentRepository.findVisibleByPublication(id_publication);
    return rows.map((row) => sanitizeComment(row, currentUser));
};

const notifyAdminsOfFlaggedComment = async ({ authorName, publicationTitle, text, matchedWord }) => {
    try {
        const admins = await adminRepository.findAdminEmails();
        if (!admins.length) return;

        const html = buildStyledEmailHtml({
            title: 'Comentario ofensivo detectado',
            preheader: 'Un comentario fue bloqueado automáticamente y necesita revisión.',
            greeting: 'Hola',
            content: `
                <p>Se bloqueó automáticamente un comentario por contener lenguaje inapropiado.</p>
                <p><strong>Autor:</strong> ${escapeHtml(authorName || 'Desconocido')}</p>
                <p><strong>Publicación:</strong> ${escapeHtml(publicationTitle || '')}</p>
                <p><strong>Palabra detectada:</strong> ${escapeHtml(matchedWord || '')}</p>
                <p><strong>Comentario:</strong> "${escapeHtml(text)}"</p>
                <p>Puedes revisarlo en el panel de administración, sección de comentarios reportados.</p>
            `,
            footerText: 'Este es un aviso automático del sistema de moderación.'
        });

        await Promise.all(admins.map((admin) => sendMail({
            to: admin.email,
            subject: 'Comentario ofensivo detectado — Salvadorean Roots',
            html,
            text: `Comentario bloqueado de ${authorName || 'Desconocido'} en "${publicationTitle || ''}": "${text}"`
        })));
    } catch (mailError) {
        console.error('No se pudo notificar a los administradores sobre el comentario reportado:', mailError);
    }
};

const createComment = async (id_publication, currentUser, text) => {
    if (typeof text !== 'string' || !text.trim()) {
        const err = new Error('El comentario no puede estar vacío.'); err.expose = true; throw err;
    }

    const trimmed = text.trim();

    if (trimmed.length > MAX_COMMENT_LENGTH) {
        const err = new Error(`El comentario no puede superar los ${MAX_COMMENT_LENGTH} caracteres.`); err.expose = true; throw err;
    }

    const publication = await publicationRepository.findById(id_publication);
    if (!publication) {
        const err = new Error('Publicación no encontrada.'); err.expose = true; throw err;
    }

    const { flagged, matchedWord } = containsBadWords(trimmed);

    if (flagged) {
        await commentRepository.create(currentUser.id, id_publication, trimmed, {
            isFlagged: true,
            flagReason: `Palabra detectada: ${matchedWord}`
        });

        await notifyAdminsOfFlaggedComment({
            authorName: currentUser.name,
            publicationTitle: publication.title,
            text: trimmed,
            matchedWord
        });

        const err = new Error('Tu comentario contiene lenguaje inapropiado y no fue publicado.');
        err.expose = true;
        throw err;
    }

    const result = await commentRepository.create(currentUser.id, id_publication, trimmed);
    const row = await commentRepository.findById(result.insertId);
    return sanitizeComment(row, currentUser);
};

const deleteComment = async (id_coment, requestingUser) => {
    const row = await commentRepository.findById(id_coment);

    if (!row) {
        const err = new Error('Comentario no encontrado.'); err.expose = true; throw err;
    }

    const isOwner = Boolean(requestingUser) && requestingUser.id === row.id_user;
    const isAdmin = Boolean(requestingUser) && (requestingUser.role === ROL_ADMIN || requestingUser.role === ROL_FUNDADOR);

    if (!isOwner && !isAdmin) {
        const err = new Error('No puedes eliminar comentarios de otros usuarios.'); err.expose = true; err.status = 403; throw err;
    }

    await commentRepository.deleteById(id_coment);
};

// ── Moderación (panel de administración) ──

const sanitizeFlaggedComment = (row) => ({
    id: row.id_coment,
    text: row.coment,
    createdAt: row.created_at,
    flagReason: row.flag_reason,
    author: {
        id: row.id_user,
        name: row.author_name,
        avatarUrl: row.author_avatar_url || null
    },
    publication: {
        id: row.id_publication,
        title: row.publication_title
    }
});

const listFlaggedComments = async () => {
    const rows = await commentRepository.findFlagged();
    return rows.map(sanitizeFlaggedComment);
};

const approveFlaggedComment = async (id_coment) => {
    const row = await commentRepository.findById(id_coment);
    if (!row) {
        const err = new Error('Comentario no encontrado.'); err.expose = true; throw err;
    }

    await commentRepository.unflagById(id_coment);
};

module.exports = {
    listComments,
    createComment,
    deleteComment,
    listFlaggedComments,
    approveFlaggedComment
};
