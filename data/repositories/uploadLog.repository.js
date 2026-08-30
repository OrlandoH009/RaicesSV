const db = require('../config/database.config');

const countRecent = (id_user, type, windowHours) => new Promise((resolve, reject) => {
    db.query(
        `SELECT COUNT(*) AS total FROM upload_logs
         WHERE id_user = ? AND type = ? AND created_at >= (NOW() - INTERVAL ? HOUR)`,
        [id_user, type, windowHours],
        (err, results) => {
            if (err) return reject(err);
            resolve(results[0] ? Number(results[0].total) : 0);
        }
    );
});

const create = (id_user, type) => new Promise((resolve, reject) => {
    db.query(
        'INSERT INTO upload_logs (id_user, type) VALUES (?, ?)',
        [id_user, type],
        (err, result) => {
            if (err) return reject(err);
            resolve(result);
        }
    );
});

module.exports = { countRecent, create };
