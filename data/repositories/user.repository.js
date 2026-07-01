const db = require('../config/database.config');

const findByEmail = async (email) => {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    return rows[0];
};

const createUser = async (name, email, password) => {
    const [result] = await db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password]
    );
    return result;
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
    createUser
};