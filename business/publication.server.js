const publicationRepository = require('../data/repositories/publication.repository');

const MAX_TITLE_LENGTH = 125;
const MAX_LOCATION_LENGTH = 125;

const sanitizePublication = (row, currentUser) => {
    const isOwner = Boolean(currentUser) && currentUser.id === row.id_user;
    const isAdmin = Boolean(currentUser) && (currentUser.role === 'Admin' || currentUser.role === 'Fundador');

    return {
        id: row.id_publication,
        title: row.title,
        description: row.description,
        location: row.location,
        image: row.image,
        createdAt: row.created_at,
        author: {
            id: row.id_user,
            name: row.author_name,
            avatarUrl: row.author_avatar_url || null
        },
        canEdit: isOwner,
        canDelete: isOwner || isAdmin
    };
};

const listPublications = async (currentUser, { location } = {}) => {
    const rows = location
        ? await publicationRepository.findByLocation(location)
        : await publicationRepository.findAll();

    return rows.map((row) => sanitizePublication(row, currentUser));
};

const getPublication = async (id_publication, currentUser) => {
    const row = await publicationRepository.findById(id_publication);

    if (!row) {
        const err = new Error('Publicación no encontrada.'); err.expose = true; throw err;
    }

    return sanitizePublication(row, currentUser);
};

const createPublication = async (id_user, { title, description, location, image }) => {
    if (typeof title !== 'string' || !title.trim()) {
        const err = new Error('El título es obligatorio.'); err.expose = true; throw err;
    }

    if (title.trim().length > MAX_TITLE_LENGTH) {
        const err = new Error(`El título no puede superar los ${MAX_TITLE_LENGTH} caracteres.`); err.expose = true; throw err;
    }

    if (typeof description !== 'string' || !description.trim()) {
        const err = new Error('La descripción es obligatoria.'); err.expose = true; throw err;
    }

    if (typeof location !== 'string' || !location.trim()) {
        const err = new Error('La ubicación es obligatoria.'); err.expose = true; throw err;
    }

    if (location.trim().length > MAX_LOCATION_LENGTH) {
        const err = new Error(`La ubicación no puede superar los ${MAX_LOCATION_LENGTH} caracteres.`); err.expose = true; throw err;
    }

    if (typeof image !== 'string' || !image.trim()) {
        const err = new Error('La imagen es obligatoria para mejor visualización.'); err.expose = true; throw err;
    }

    const result = await publicationRepository.create(id_user, {
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        image: image.trim()
    });

    return getPublication(result.insertId, { id: id_user });
};

const updatePublication = async (id_publication, requestingUser, { title, description, location, image }) => {
    const row = await publicationRepository.findById(id_publication);

    if (!row) {
        const err = new Error('Publicación no encontrada.'); err.expose = true; throw err;
    }

    const isOwner = Boolean(requestingUser) && requestingUser.id === row.id_user;

    if (!isOwner) {
        const err = new Error('No puedes editar publicaciones de otros usuarios.'); err.expose = true; err.status = 403; throw err;
    }

    if (typeof title !== 'string' || !title.trim()) {
        const err = new Error('El título es obligatorio.'); err.expose = true; throw err;
    }

    if (title.trim().length > MAX_TITLE_LENGTH) {
        const err = new Error(`El título no puede superar los ${MAX_TITLE_LENGTH} caracteres.`); err.expose = true; throw err;
    }

    if (typeof description !== 'string' || !description.trim()) {
        const err = new Error('La descripción es obligatoria.'); err.expose = true; throw err;
    }

    if (typeof location !== 'string' || !location.trim()) {
        const err = new Error('La ubicación es obligatoria.'); err.expose = true; throw err;
    }

    if (location.trim().length > MAX_LOCATION_LENGTH) {
        const err = new Error(`La ubicación no puede superar los ${MAX_LOCATION_LENGTH} caracteres.`); err.expose = true; throw err;
    }

    const finalImage = (typeof image === 'string' && image.trim()) ? image.trim() : row.image;

    await publicationRepository.updateById(id_publication, {
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        image: finalImage
    });

    return getPublication(id_publication, requestingUser);
};

const deletePublication = async (id_publication, requestingUser) => {
    const row = await publicationRepository.findById(id_publication);

    if (!row) {
        const err = new Error('Publicación no encontrada.'); err.expose = true; throw err;
    }

    const isOwner = Boolean(requestingUser) && requestingUser.id === row.id_user;
    const isAdmin = Boolean(requestingUser) && (requestingUser.role === 'Admin' || requestingUser.role === 'Fundador');

    if (!isOwner && !isAdmin) {
        const err = new Error('No puedes eliminar publicaciones de otros usuarios.'); err.expose = true; err.status = 403; throw err;
    }

    await publicationRepository.deleteById(id_publication);
};

module.exports = {
    listPublications,
    getPublication,
    createPublication,
    updatePublication,
    deletePublication
};