const db = require('../config/database.config');

const BASE_SELECT = `
    SELECT
        c.id_coment,
        c.id_user,
        c.id_publication,
        c.coment,
        c.created_at,
        c.is_flagged,
        c.flag_reason,
        u.name AS author_name,
        u.avatar_url AS author_avatar_url
    FROM coments c
    INNER JOIN users u ON u.id_user = c.id_user
`;

const findVisibleByPublication = (id_publication) => {
    return new Promise((resolve, reject) => {
        db.query(
            `${BASE_SELECT} WHERE c.id_publication = ? AND c.is_flagged = 0 ORDER BY c.created_at ASC, c.id_coment ASC`,
            [id_publication],
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

const findById = (id_coment) => {
    return new Promise((resolve, reject) => {
        db.query(
            `${BASE_SELECT} WHERE c.id_coment = ?`,
            [id_coment],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            }
        );
    });
};

const findFlagged = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT
                c.id_coment,
                c.id_user,
                c.id_publication,
                c.coment,
                c.created_at,
                c.flag_reason,
                u.name AS author_name,
                u.avatar_url AS author_avatar_url,
                p.title AS publication_title
            FROM coments c
            INNER JOIN users u ON u.id_user = c.id_user
            INNER JOIN publications p ON p.id_publication = c.id_publication
            WHERE c.is_flagged = 1
            ORDER BY c.created_at DESC, c.id_coment DESC`,
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

const countFlagged = () => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT COUNT(*) AS count FROM coments WHERE is_flagged = 1',
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0] ? Number(results[0].count) : 0);
            }
        );
    });
};

const create = (id_user, id_publication, coment, { isFlagged, flagReason } = {}) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO coments(id_user, id_publication, coment, is_flagged, flag_reason) VALUES (?, ?, ?, ?, ?)',
            [id_user, id_publication, coment, isFlagged ? 1 : 0, flagReason || null],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const unflagById = (id_coment) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE coments SET is_flagged = 0, flag_reason = NULL WHERE id_coment = ?',
            [id_coment],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const deleteById = (id_coment) => {
    return new Promise((resolve, reject) => {
        db.query(
            'DELETE FROM coments WHERE id_coment = ?',
            [id_coment],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

module.exports = {
    findVisibleByPublication,
    findById,
    findFlagged,
    countFlagged,
    create,
    unflagById,
    deleteById
};
