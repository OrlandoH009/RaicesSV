const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const authRoutes = require('./routes/auth.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'raices-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'presentation')));

app.get('/estado', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor funcionando' });
});

app.use(authRoutes);

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});