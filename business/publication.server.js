const publicationRepository = require('../data/repositories/publication.repository');

const MAX_TITLE_LENGTH = 125;
const MAX_LOCATION_LENGTH = 125;

const sanitizePublication = (row, currentUser) => {
    const isOwner = Boolean(currentUser) && currentUser.id === row.id_user;
    const isAdmin = Boolean(currentUser) && currentUser.role === 'Admin';

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
    }
}