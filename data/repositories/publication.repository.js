const db = require('../config/database.config');

const BASE_SELECT = `
    SELECT
        p.id_publication,
        p.id_user,
        p.title,
        p.description,
        p.location,
        p.lat,
        p.lng,
        p.image,
        p.created_at,
        u.name AS author_name,
        u.avatar_url AS author_avatar_url,
        u.id_rol AS author_id_rol,
        (SELECT COUNT(*) FROM publication_likes pl WHERE pl.id_publication = p.id_publication) AS like_count,
        (SELECT COUNT(*) FROM coments c WHERE c.id_publication = p.id_publication AND c.is_flagged = 0) AS comment_count
    FROM publications p
    INNER JOIN users u ON u.id_user = p.id_user
`;

const findAll = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `${BASE_SELECT} ORDER BY p.created_at DESC, p.id_publication DESC`,
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

const findByLocation = (location) => {
    return new Promise((resolve, reject) => {
        db.query(
            `${BASE_SELECT} WHERE p.location = ? ORDER BY p.created_at DESC, p.id_publication DESC`,
            [location],
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

const findById = (id_publication) => {
    return new Promise((resolve, reject) => {
        db.query(
            `${BASE_SELECT} WHERE p.id_publication = ?`,
            [id_publication],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            }
        );
    });
};

const create = (id_user, { title, description, location, lat, lng, image }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO publications(id_user, title, description, location, lat, lng, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [id_user, title, description, location, lat, lng, image],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const updateById = (id_publication, { title, description, location, lat, lng, image }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE publications SET title = ?, description = ?, location = ?, lat = ?, lng = ?, image = ? WHERE id_publication = ?',
            [title, description, location, lat, lng, image, id_publication],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const deleteById = (id_publication) => {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM publications WHERE id_publication = ?',
            [id_publication],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

module.exports = {
    findAll,
    findByLocation,
    findById,
    create,
    updateById,
    deleteById
};