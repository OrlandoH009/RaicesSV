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
            'INSERT INTO users(name,email,password) VALUES (?,?,?)',
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

module.exports = {
    findByEmail,
    findByGoogleId,
    createGoogleUser,
    createUser,
    updatePassword
};