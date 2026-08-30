const publicationRepository = require('../data/repositories/publication.repository');
const publicationLikeRepository = require('../data/repositories/publicationLike.repository');

const MAX_TITLE_LENGTH = 125;
const MAX_LOCATION_LENGTH = 125;

// Coordenadas válidas para El Salvador (con margen) — evita guardar basura si el picker falla
const LAT_MIN = 12.5;
const LAT_MAX = 15.2;
const LNG_MIN = -90.5;
const LNG_MAX = -87.4;

const parseCoordinate = (value) => {
    if (value === undefined || value === null || value === '') return null;
    const num = Number(value);
    return Number.isFinite(num) ? num : NaN;
};

const sanitizePublication = (row, currentUser, likedPublicationIds) => {
    const isOwner = Boolean(currentUser) && currentUser.id === row.id_user;
    const isAdmin = Boolean(currentUser) && (currentUser.role === 'Admin' || currentUser.role === 'Fundador');

    return {
        id: row.id_publication,
        title: row.title,
        description: row.description,
        location: row.location,
        lat: row.lat !== null && row.lat !== undefined ? Number(row.lat) : null,
        lng: row.lng !== null && row.lng !== undefined ? Number(row.lng) : null,
        image: row.image,
        createdAt: row.created_at,
        author: {
            id: row.id_user,
            name: row.author_name,
            avatarUrl: row.author_avatar_url || null
        },
        likeCount: Number(row.like_count) || 0,
        commentCount: Number(row.comment_count) || 0,
        isLiked: Boolean(likedPublicationIds) && likedPublicationIds.has(row.id_publication),
        canEdit: isOwner,
        canDelete: isOwner || isAdmin
    };
};

const listPublications = async (currentUser, { location } = {}) => {
    const rows = location
        ? await publicationRepository.findByLocation(location)
        : await publicationRepository.findAll();

    const likedPublicationIds = currentUser
        ? new Set(await publicationLikeRepository.findLikedPublicationIds(currentUser.id))
        : new Set();

    return rows.map((row) => sanitizePublication(row, currentUser, likedPublicationIds));
};

const getPublication = async (id_publication, currentUser) => {
    const row = await publicationRepository.findById(id_publication);

    if (!row) {
        const err = new Error('Publicación no encontrada.'); err.expose = true; throw err;
    }

    const likedPublicationIds = currentUser
        ? new Set(await publicationLikeRepository.findLikedPublicationIds(currentUser.id))
        : new Set();

    return sanitizePublication(row, currentUser, likedPublicationIds);
};

const toggleLike = async (id_publication, currentUser) => {
    const row = await publicationRepository.findById(id_publication);

    if (!row) {
        const err = new Error('Publicación no encontrada.'); err.expose = true; throw err;
    }

    const alreadyLiked = await publicationLikeRepository.exists(id_publication, currentUser.id);

    if (alreadyLiked) {
        await publicationLikeRepository.remove(id_publication, currentUser.id);
    } else {
        await publicationLikeRepository.create(id_publication, currentUser.id);
    }

    const likeCount = await publicationLikeRepository.countByPublication(id_publication);

    return { liked: !alreadyLiked, likeCount };
};

const createPublication = async (id_user, { title, description, location, lat, lng, image }) => {
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

    const parsedLat = parseCoordinate(lat);
    const parsedLng = parseCoordinate(lng);

    if (Number.isNaN(parsedLat) || Number.isNaN(parsedLng)) {
        const err = new Error('Las coordenadas de la ubicación no son válidas.'); err.expose = true; throw err;
    }

    if (parsedLat !== null && (parsedLat < LAT_MIN || parsedLat > LAT_MAX || parsedLng < LNG_MIN || parsedLng > LNG_MAX)) {
        const err = new Error('La ubicación seleccionada está fuera de El Salvador.'); err.expose = true; throw err;
    }

    const result = await publicationRepository.create(id_user, {
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        lat: parsedLat,
        lng: parsedLng,
        image: image.trim()
    });

    return getPublication(result.insertId, { id: id_user });
};

const updatePublication = async (id_publication, requestingUser, { title, description, location, lat, lng, image }) => {
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

    const parsedLat = lat !== undefined ? parseCoordinate(lat) : Number(row.lat);
    const parsedLng = lng !== undefined ? parseCoordinate(lng) : Number(row.lng);

    if (Number.isNaN(parsedLat) || Number.isNaN(parsedLng)) {
        const err = new Error('Las coordenadas de la ubicación no son válidas.'); err.expose = true; throw err;
    }

    if (parsedLat !== null && (parsedLat < LAT_MIN || parsedLat > LAT_MAX || parsedLng < LNG_MIN || parsedLng > LNG_MAX)) {
        const err = new Error('La ubicación seleccionada está fuera de El Salvador.'); err.expose = true; throw err;
    }

    const finalImage = (typeof image === 'string' && image.trim()) ? image.trim() : row.image;

    await publicationRepository.updateById(id_publication, {
        title: title.trim(),
        description: description.trim(),
        location: location.trim(),
        lat: parsedLat,
        lng: parsedLng,
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
    deletePublication,
    toggleLike
};