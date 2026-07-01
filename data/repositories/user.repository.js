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
    createUser,
    updatePassword
};