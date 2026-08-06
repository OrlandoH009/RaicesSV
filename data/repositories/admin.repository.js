const db = require('../config/database.config');

// ── Usuarios ──

const findAllUsers = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT
                u.id_user,
                u.name,
                u.email,
                u.avatar_url,
                u.created_at,
                r.id_rol,
                r.rol AS role_name,
                s.id_status,
                s.status AS status_name
            FROM users u
            INNER JOIN rols r ON r.id_rol = u.id_rol
            INNER JOIN user_status s ON s.id_status = u.id_status
            ORDER BY u.id_user ASC`,
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

const countUsersByStatus = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT s.status AS status_name, COUNT(u.id_user) AS total
            FROM user_status s
            LEFT JOIN users u ON u.id_status = s.id_status
            GROUP BY s.id_status, s.status`,
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

const countUsersByRole = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT r.rol AS role_name, COUNT(u.id_user) AS total
            FROM rols r
            LEFT JOIN users u ON u.id_rol = r.id_rol
            GROUP BY r.id_rol, r.rol`,
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

const countUsersByMonth = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT
                DATE_FORMAT(created_at, '%Y-%m') AS month,
                COUNT(*) AS total
            FROM users
            WHERE created_at >= (CURDATE() - INTERVAL 11 MONTH)
            GROUP BY month
            ORDER BY month ASC`,
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

const updateUserStatus = (id_user, id_status) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE users SET id_status = ? WHERE id_user = ?',
            [id_status, id_user],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const updateUserRole = (id_user, id_rol) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE users SET id_rol = ? WHERE id_user = ?',
            [id_rol, id_user],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const createAdminUser = (name, email, passwordHash) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO users(name, email, password, id_rol, id_status)
             VALUES (?, ?, ?, (SELECT id_rol FROM rols WHERE rol = 'Admin'), 1)`,
            [name, email, passwordHash],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

// ── Publicaciones (para métricas del dashboard) ──

const countPublicationsTotal = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT COUNT(*) AS total FROM publications', (err, results) => {
            if (err) return reject(err);
            resolve(results[0].total);
        });
    });
};

const countPublicationsByMonth = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT
                DATE_FORMAT(created_at, '%Y-%m') AS month,
                COUNT(*) AS total
            FROM publications
            WHERE created_at >= (CURDATE() - INTERVAL 11 MONTH)
            GROUP BY month
            ORDER BY month ASC`,
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

module.exports = {
    findAllUsers,
    countUsersByStatus,
    countUsersByRole,
    countUsersByMonth,
    updateUserStatus,
    updateUserRole,
    createAdminUser,
    countPublicationsTotal,
    countPublicationsByMonth
};