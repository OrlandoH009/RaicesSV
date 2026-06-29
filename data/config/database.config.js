const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'raicessv'
});

db.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log('MySQL conectado');
});

module.exports = db;