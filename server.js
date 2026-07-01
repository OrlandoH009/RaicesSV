const express = require('express');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction && !process.env.SESSION_SECRET) {
    console.error('FALTA SESSION_SECRET en el archivo .env. No se debe usar el valor por defecto en producción.');
    process.exit(1);
}

const authRoutes = require('./routes/auth.routes');
const protectRoute = require('./middleware/auth.protectedRoutes');
const { securityHeaders, rateLimit, verifyOrigin } = require('./middleware/security.middleware');

app.set('trust proxy', 1);

app.use(securityHeaders);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    name: 'raices.sid',
    secret: process.env.SESSION_SECRET || 'raices-secret-dev-only',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: isProduction,
        maxAge: 1000 * 60 * 60 * 4 // 4 horas
    }
}));

app.use(verifyOrigin);

// Solo se sirven como estáticos los recursos públicos (css/js/imágenes/favicons).
// Las vistas HTML NUNCA se sirven aquí.
app.use('/assets', express.static(path.join(__dirname, 'presentation', 'assets')));

const viewsDir = path.join(__dirname, 'presentation', 'views');
const sendView = (name) => (req, res) => {
    res.sendFile(path.join(viewsDir, name), (err) => {
        if (err) {
            console.error(err);
            if (!res.headersSent) {
                res.status(404).send('No se encontró la página solicitada.');
            }
        }
    });
};

/* ───────────── Páginas públicas ───────────── */

app.get(['/', '/index', '/index.html', '/views/index.html'], sendView('index.html'));

app.get(['/login.html', '/views/login.html'], (req, res) => {
    if (req.session && req.session.user) {
        return res.redirect('/');
    }
    sendView('login.html')(req, res);
});

app.get(['/registro.html', '/views/registro.html'], (req, res) => {
    if (req.session && req.session.user) {
        return res.redirect('/');
    }
    sendView('registro.html')(req, res);
});

app.get('/views', (req, res) => {
    res.redirect('/');
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

app.post('/logout', rateLimit({ windowMs: 15 * 60 * 1000, max: 30 }), (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: 'No se pudo cerrar la sesión' });
        }

        res.clearCookie('raices.sid');
        res.json({ message: 'Sesión cerrada correctamente', redirect: '/login.html?loggedout=1' });
    });
});

/* ───────────── Páginas protegidas (requieren sesión) ───────────── */

const protectedViews = [
    'mapa.html',
    'categorias.html',
    'calendario.html',
    'eventos.html',
    'gastronomia.html',
    'historia.html',
    'leyendas.html',
    'quiz.html',
    'recetas.html',
    'sitios-culturales.html'
];

protectedViews.forEach((fileName) => {
    const base = fileName.replace(/\.html$/, '');
    app.get(
        [`/${fileName}`, `/${base}`, `/views/${fileName}`],
        protectRoute,
        sendView(fileName)
    );
});

/* ───────────── Rutas de autenticación (con límite de intentos) ───────────── */

app.use(
    ['/login', '/register'],
    rateLimit({ windowMs: 15 * 60 * 1000, max: 15, message: 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.' })
);

app.use(authRoutes);

app.use((req, res) => {
    res.status(404).send('Página no encontrada.');
});

app.use((err, req, res, next) => {
    console.error(err);
    if (res.headersSent) return next(err);
    res.status(500).send('Ocurrió un error inesperado. Inténtalo de nuevo más tarde.');
});

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});