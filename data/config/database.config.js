const mysql = require('mysql2');
const dotenv = require('dotenv');

// Por si este módulo se carga antes que server.js llame a dotenv.config().
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'raicessv'
});

db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('MySQL conectado');
});

module.exports = db;
