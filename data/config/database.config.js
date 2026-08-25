const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const dbUrl = process.env.DB_URL;

if (!dbUrl) {
    throw new Error('Falta la variable de entorno DB_URL');
}

const isAiven = dbUrl.includes('aivencloud.com');

const dbUrlWithoutSslMode = dbUrl.replace(/[?&]ssl-mode=[^&]*/i, '');

const db = mysql.createPool({
    uri: dbUrlWithoutSslMode,
    ssl: isAiven ? { rejectUnauthorized: false } : undefined,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
});

db.on('error', (err) => {
    console.error('Error inesperado en el pool de MySQL:', err);
});

const ensureUserStatusTable = () => new Promise((resolve) => {
    db.query(
        `CREATE TABLE IF NOT EXISTS user_status(
            id_status INT AUTO_INCREMENT PRIMARY KEY,
            status VARCHAR(50) NOT NULL UNIQUE
        )`,
        (err) => {
            if (err) {
                console.error('No se pudo verificar/crear la tabla user_status:', err);
                    return resolve();
            }
            db.query(
                `INSERT IGNORE INTO user_status(id_status, status) VALUES (1, 'Activo'), (2, 'Suspendido')`,
                (insertErr) => {
                    if (insertErr) {
                        console.error('No se pudo inicializar user_status:', insertErr);
                    }
                    resolve();
                }
            );
        }
    );
});

const ensureProfileColumns = () => {
    const migrations = [
        { name: 'description', definition: 'VARCHAR(300) NULL' },
        { name: 'avatar_url', definition: 'VARCHAR(255) NULL' },
        { name: 'avatar_source', definition: "ENUM('local', 'google') NULL" },
        { name: 'google_avatar_url', definition: 'VARCHAR(255) NULL' },
        { name: 'id_status', definition: 'INT NOT NULL DEFAULT 1' },
        { name: 'created_at', definition: 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP' }
    ];

    const runMigration = ({ name, definition }) => new Promise((resolve) => {
        db.query('SHOW COLUMNS FROM users LIKE ?', [name], (err, results) => {
            if (err) {
                console.error(`No se pudo verificar la columna ${name}:`, err);
                return resolve();
            }

            if (results && results.length > 0) {
                return resolve();
            }

            db.query(`ALTER TABLE users ADD COLUMN ${name} ${definition}`, (alterErr) => {
                if (alterErr && !/duplicate column|already exists/i.test(alterErr.message)) {
                    console.error(`No se pudo agregar la columna ${name}:`, alterErr);
                }
                resolve();
            });
        });
    });

    return ensureUserStatusTable().then(()=>
        Promise.all(migrations.map(runMigration))
    );
};

const ensurePasswordResetsTable = () => new Promise((resolve) => {
    db.query(
        `CREATE TABLE IF NOT EXISTS password_resets (
            id_reset INT AUTO_INCREMENT PRIMARY KEY,
            id_user INT NOT NULL,
            token_hash CHAR(64) NOT NULL,
            expires_at DATETIME NOT NULL,
            used_at DATETIME NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
            INDEX idx_password_resets_token_hash (token_hash),
            INDEX idx_password_resets_user (id_user)
        )`,
        (err) => {
            if (err) {
                console.error('No se pudo verificar/crear la tabla password_resets:', err);
            }
            resolve();
        }
    );
});

const ensureAdminInvitationsTable = () => new Promise((resolve) => {
    db.query(
        `CREATE TABLE IF NOT EXISTS admin_invitations (
            id_invitation INT AUTO_INCREMENT PRIMARY KEY,
            id_user INT NOT NULL,
            invited_by INT NOT NULL,
            token_hash CHAR(64) NOT NULL,
            expires_at DATETIME NOT NULL,
            used_at DATETIME NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
            FOREIGN KEY (invited_by) REFERENCES users(id_user) ON DELETE CASCADE,
            INDEX idx_admin_invitations_token_hash (token_hash),
            INDEX idx_admin_invitations_user (id_user)
        )`,
        (err) => {
            if (err) {
                console.error('No se pudo verificar/crear la tabla admin_invitations:', err);
            }
            resolve();
        }
    );
});

const ensureUserSuspensionsTable = () => new Promise((resolve) => {
    db.query(
        `CREATE TABLE IF NOT EXISTS user_suspensions (
            id_suspension INT AUTO_INCREMENT PRIMARY KEY,
            id_user INT NOT NULL,
            suspended_by INT NOT NULL,
            reason VARCHAR(500) NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
            FOREIGN KEY (suspended_by) REFERENCES users(id_user) ON DELETE CASCADE,
            INDEX idx_user_suspensions_user (id_user)
        )`,
        (err) => {
            if (err) {
                console.error('No se pudo verificar/crear la tabla user_suspensions:', err);
            }
            resolve();
        }
    );
});

const ensureAppealsTable = () => new Promise((resolve) => {
    db.query(
        `CREATE TABLE IF NOT EXISTS appeals (
            id_appeal INT AUTO_INCREMENT PRIMARY KEY,
            id_user INT NULL,
            email VARCHAR(125) NOT NULL,
            message VARCHAR(1000) NOT NULL,
            is_valid BOOLEAN NOT NULL DEFAULT TRUE,
            reviewed_at TIMESTAMP NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE,
            INDEX idx_appeals_user (id_user),
            INDEX idx_appeals_reviewed (reviewed_at)
        )`,
        (err) => {
            if (err) {
                console.error('No se pudo verificar/crear la tabla appeals:', err);
            }
            resolve();
        }
    );
});

const ensurePublicationLocationColumns = () => {
    const migrations = [
        { name: 'lat', definition: 'DECIMAL(10, 7) NULL' },
        { name: 'lng', definition: 'DECIMAL(10, 7) NULL' }
    ];

    const runMigration = ({ name, definition }) => new Promise((resolve) => {
        db.query('SHOW COLUMNS FROM publications LIKE ?', [name], (err, results) => {
            if (err) {
                console.error(`No se pudo verificar la columna ${name} en publications:`, err);
                return resolve();
            }

            if (results && results.length > 0) {
                return resolve();
            }

            db.query(`ALTER TABLE publications ADD COLUMN ${name} ${definition}`, (alterErr) => {
                if (alterErr && !/duplicate column|already exists/i.test(alterErr.message)) {
                    console.error(`No se pudo agregar la columna ${name} en publications:`, alterErr);
                }
                resolve();
            });
        });
    });

    return Promise.all(migrations.map(runMigration));
};

db.getConnection((err, connection) => {
    if (err) {
        console.error('No se pudo conectar a MySQL:', err);
        return;
    }

    connection.release();
    console.log('MySQL conectado');

    ensureProfileColumns()
        .then(() => {
            console.log('Migración de perfil verificada');
            return ensurePasswordResetsTable();
        })
        .then(() => {
            console.log('Tabla de reseteo de contraseñas verificada');
            return ensureAdminInvitationsTable();
        })
        .then(() => {
            console.log('Tabla de invitaciones de administrador verificada');
            return ensureUserSuspensionsTable();
        })
        .then(() => {
            console.log('Tabla de historial de suspensiones verificada');
            return ensureAppealsTable();
        })
        .then(() => {
            console.log('Tabla de apelaciones verificada');
            return ensurePublicationLocationColumns();
        })
        .then(() => {
            console.log('Columnas de ubicación (lat/lng) de publicaciones verificadas');
        })
        .catch((error) => {
            console.error('Error al verificar la migración de perfil:', error);
        });
});

module.exports = db;