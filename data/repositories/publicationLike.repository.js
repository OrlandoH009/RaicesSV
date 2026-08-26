const db = require('../config/database.config');

const findLikedPublicationIds = (id_user) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT id_publication FROM publication_likes WHERE id_user = ?',
            [id_user],
            (err, results) => {
                if (err) return reject(err);
                resolve(results.map((row) => row.id_publication));
            }
        );
    });
};

const exists = (id_publication, id_user) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT id_like FROM publication_likes WHERE id_publication = ? AND id_user = ?',
            [id_publication, id_user],
            (err, results) => {
                if (err) return reject(err);
                resolve(Boolean(results[0]));
            }
        );
    });
};

const create = (id_publication, id_user) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO publication_likes(id_publication, id_user) VALUES (?, ?)',
            [id_publication, id_user],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const remove = (id_publication, id_user) => {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM publication_likes WHERE id_publication = ? AND id_user = ?',
            [id_publication, id_user],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const countByPublication = (id_publication) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT COUNT(*) AS count FROM publication_likes WHERE id_publication = ?',
            [id_publication],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0] ? Number(results[0].count) : 0);
            }
        );
    });
};

module.exports = {
    findLikedPublicationIds,
    exists,
    create,
    remove,
    countByPublication
};
