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

const updateUserRoleByName = (id_user, roleName) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE users SET id_rol = (SELECT id_rol FROM rols WHERE rol = ?) WHERE id_user = ?',
            [roleName, id_user],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const countUsersByRoleName = (roleName) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT COUNT(*) AS total
            FROM users u
            INNER JOIN rols r ON r.id_rol = u.id_rol
            WHERE r.rol = ?`,
            [roleName],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0].total);
            }
        );
    });
};

const deleteUserById = (id_user) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM users WHERE id_user = ?', [id_user], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
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

const createSuspensionRecord = (id_user, suspended_by, reason) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO user_suspensions(id_user, suspended_by, reason) VALUES (?, ?, ?)',
            [id_user, suspended_by, reason],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        )
    })
}

const createAppeal = (id_user, email, message, is_valid) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO appeals(id_user, email, message, is_valid) VALUES (?, ?, ?, ?)',
            [id_user, email, message, is_valid],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const findValidAppeals = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT a.*, u.name AS user_name, u.avatar_url AS user_avatar_url
            FROM appeals a
            LEFT JOIN users u ON u.id_user = a.id_user
            WHERE a.is_valid = TRUE
            ORDER BY a.reviewed_at IS NULL DESC, a.created_at DESC`,
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

const findInvalidAppeals = () => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM appeals
            WHERE is_valid = FALSE
            ORDER BY created_at DESC`,
            (err, results) => {
                if (err) return reject(err);
                resolve(results);
            }
        );
    });
};

const findAppealById = (id_appeal) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT a.*, u.name AS user_name, u.avatar_url AS user_avatar_url
            FROM appeals a
            LEFT JOIN users u ON u.id_user = a.id_user
            WHERE a.id_appeal = ?`,
            [id_appeal],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            }
        );
    });
};

const markAppealReviewed = (id_appeal) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE appeals SET reviewed_at = NOW() WHERE id_appeal = ? AND reviewed_at IS NULL',
            [id_appeal],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const countUnreviewedAppeals = () => {
    return new Promise((resolve, reject) => {
        db.query(
            'SELECT COUNT(*) AS total FROM appeals WHERE is_valid = TRUE AND reviewed_at IS NULL',
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0].total);
            }
        );
    });
};

const createAdminInvitation = (id_user, invited_by, tokenHash, expiresAt) => {
    return new Promise((resolve, reject) => {
        db.query(
            'INSERT INTO admin_invitations(id_user, invited_by, token_hash, expires_at) VALUES (?, ?, ?, ?)',
            [id_user, invited_by, tokenHash, expiresAt],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const findValidAdminInvitation = (tokenHash) => {
    return new Promise((resolve, reject) => {
        db.query(
            `SELECT * FROM admin_invitations
             WHERE token_hash = ? AND used_at IS NULL AND expires_at > NOW()
             ORDER BY id_invitation DESC LIMIT 1`,
            [tokenHash],
            (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            }
        );
    });
};

const markAdminInvitationUsed = (id_invitation) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE admin_invitations SET used_at = NOW() WHERE id_invitation = ?',
            [id_invitation],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};

const invalidateUserAdminInvitations = (id_user) => {
    return new Promise((resolve, reject) => {
        db.query(
            'UPDATE admin_invitations SET used_at = NOW() WHERE id_user = ? AND used_at IS NULL',
            [id_user],
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
    updateUserRoleByName,
    countUsersByRoleName,
    deleteUserById,
    createAdminUser,
    createSuspensionRecord,
    createAppeal,
    findValidAppeals,
    findInvalidAppeals,
    findAppealById,
    markAppealReviewed,
    countUnreviewedAppeals,
    createAdminInvitation,
    findValidAdminInvitation,
    markAdminInvitationUsed,
    invalidateUserAdminInvitations,
    countPublicationsTotal,
    countPublicationsByMonth
};