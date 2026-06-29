const express = require('express');
const dotenv = require('dotenv');
const pool = require('./data/config/connection');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'presentation')));

app.get('/estado', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor funcionando' });
});

app.get('/test-db', async (req, res) => {
try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    res.json({db: true, result: rows[0].result});
} catch (e) {
        res.status(500).json({db: false, error: e.message});
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'presentation', 'views', 'index.html'));
});

app.listen(port, () => {
    console.log(`El server esta funcionando en http://localhost:${port}`);
})