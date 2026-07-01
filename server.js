const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require('./routes/auth.routes');
const protectRoute = require('./middleware/auth.protectedRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'raices-secret',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'presentation')));

app.get(['/', '/index', '/index.html'], (req, res) => {
    const filePath = path.join(__dirname, 'presentation', 'views', 'index.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error(err);
            res.status(404).send('No se encontró index.html');
        }
    });
});

app.get('/views', (req, res) => {
    res.redirect('/');
});

app.get(['/login.html', '/views/login.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'presentation', 'views', 'login.html'));
});

app.get(['/registro.html', '/views/registro.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'presentation', 'views', 'registro.html'));
});

app.get('/estado', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor funcionando' });
});

app.get('/auth/status', (req, res) => {
    if (req.session && req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'No se pudo cerrar la sesión' });
        }

        res.json({ message: 'Sesión cerrada correctamente', redirect: '/login.html?loggedout=1' });
    });
});

app.get('/views/mapa.html', protectRoute, (req, res) => {
    res.sendFile(path.join(__dirname, 'presentation', 'views', 'mapa.html'));
});

app.get(['/mapa', '/mapa.html'], protectRoute, (req, res) => {
    res.sendFile(path.join(__dirname, 'presentation', 'views', 'mapa.html'));
});

app.use(authRoutes);

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});