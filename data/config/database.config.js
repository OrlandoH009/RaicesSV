const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'raicessv'
});

const ensureProfileColumns = () => {
    const migrations = [
        { name: 'description', definition: 'VARCHAR(300) NULL' },
        { name: 'avatar_url', definition: 'VARCHAR(255) NULL' },
        { name: 'avatar_source', definition: "ENUM('local', 'google') NULL" },
        { name: 'google_avatar_url', definition: 'VARCHAR(255) NULL' }
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

    return Promise.all(migrations.map(runMigration));
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

db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('MySQL conectado');

    ensureProfileColumns()
        .then(() => {
            console.log('Migración de perfil verificada');
            return ensurePasswordResetsTable();
        })
        .then(() => {
            console.log('Tabla password_resets verificada');
        })
        .catch((error) => {
            console.error('Error al verificar la migración de perfil:', error);
        });
});

module.exports = db;