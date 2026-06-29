const express = require('express');
const dotenv = require('dotenv');
const pool = require('./data/config/connection');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

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

app.listen(port, () => {
    console.log(`El server esta funcionando en http://localhost:${port}`);
})

