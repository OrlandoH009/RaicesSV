const db = require('../config/database.config');

const findByEmail = (email) => {
    return new Promise((resolve, reject) => {

        db.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            (err, results) => {

                if (err) return reject(err);

                resolve(results[0]);
            }
        );

    });
};

const findByGoogleId = (googleId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM users WHERE google_id = ?',
            [googleId],
            (e, results) => {
                if (e) return reject(e);
                resolve(results[0]);
            }
        );
    });
};

const createGoogleUser = (name, email, googleId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO users(name, email, google_id, id_rol) VALUES (?,?,?, (SELECT id_rol FROM rols WHERE rol = "Usuario"))',
            [name, email, googleId],
            (e, result) => {
                if (e) return reject(e);
                resolve(result);
            }
        );
    });
};

const createUser = (name, email, password) => {
    return new Promise((resolve, reject) => {

        db.query(
            'INSERT INTO users(name, email, password, id_rol) VALUES (?, ?, ?, (SELECT id_rol FROM rols WHERE rol = "Usuario"))',
            [name, email, password],
            (err, result) => {

                if (err) return reject(err);

                resolve(result);
            }
        );

    });
};

const updatePassword = (id_user, newHash) => {
    return new Promise((resolve, reject) => {

        db.query(
            'UPDATE users SET password = ? WHERE id_user = ?',
            [newHash, id_user],
            (err, result) => {

                if (err) return reject(err);

                resolve(result);
            }
        );

    });
};

const linkGoogleId = (id_user, googleId) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE users SET google_id = ? WHERE id_user =?',
            [googleId, id_user],
            (e, result) => {
                if (e) return reject(e);
                resolve(result);
            }
        );
    });
};

// ── Nuevo: perfil ──

const findById = (id_user) => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT * FROM users WHERE id_user = ?',
            [id_user],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            }
        );
    });
};

const updateProfileInfo = (id_user, { name, email, description }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE users SET name = ?, email = ?, description = ? WHERE id_user = ?',
            [name, email, description ?? null, id_user],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const updateAvatar = (id_user, { avatar_url, avatar_source }) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE users SET avatar_url = ?, avatar_source = ? WHERE id_user = ?',
            [avatar_url, avatar_source, id_user],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const updateGoogleAvatarCache = (id_user, googleAvatarUrl) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE users
             SET google_avatar_url = ?,
                 avatar_url = COALESCE(avatar_url, ?),
                 avatar_source = COALESCE(avatar_source, 'google')
             WHERE id_user = ?`,
            [googleAvatarUrl, googleAvatarUrl, id_user],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const deleteComentsByUser = (id_user) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM coments WHERE id_user = ?', [id_user], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const deleteScoresByUser = (id_user) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM scores WHERE id_user = ?', [id_user], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const deleteUser = (id_user) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM users WHERE id_user = ?', [id_user], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};


module.exports = {
    findByEmail,
    findByGoogleId,
    createGoogleUser,
    createUser,
    updatePassword,
    linkGoogleId,
    findById,
    updateProfileInfo,
    updateAvatar,
    updateGoogleAvatarCache,
    deleteComentsByUser,
    deleteScoresByUser,
    deleteUser
};