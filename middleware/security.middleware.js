/**
 * Middlewares de seguridad "sin dependencias extra":
 *  - securityHeaders: cabeceras HTTP básicas de protección.
 *  - rateLimit(name, opts): limita intentos por IP en memoria (útil contra fuerza bruta
 *    en /login y /register).
 *  - verifyOrigin: rechaza peticiones POST/PUT/PATCH/DELETE cuyo Origin/Referer no
 *    coincida con el host de la app (mitigación CSRF básica).
 */

// Fuentes externas realmente usadas por las vistas: GSAP/Chart.js/Matter.js/html2pdf
// (cdnjs, jsdelivr, unpkg), Leaflet (unpkg + tiles de OpenStreetMap), Google Fonts,
// y el iframe de YouTube embebido en recetas. No hay CSS-in-JS con nonce (las vistas
// son HTML estático), así que 'unsafe-inline' es necesario para los <script>/style
// inline existentes en las vistas.
const CSP = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://unpkg.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://unpkg.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self'",
    "frame-src https://www.youtube.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'"
].join('; ');

const securityHeaders = (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(self), camera=(), microphone=()');
    res.setHeader('X-XSS-Protection', '0');
    res.setHeader('Content-Security-Policy', CSP);
    next();
};

const buckets = new Map();

const rateLimit = ({ windowMs = 15 * 60 * 1000, max = 10, message = 'Demasiados intentos. Inténtalo de nuevo más tarde.' } = {}) => {
    return (req, res, next) => {
        const key = `${req.ip}:${req.baseUrl}${req.path}`;
        const now = Date.now();
        const entry = buckets.get(key);

        if (!entry || now - entry.firstAttempt > windowMs) {
            buckets.set(key, { count: 1, firstAttempt: now });
            return next();
        }

        entry.count += 1;

        if (entry.count > max) {
            const retryAfterSec = Math.ceil((entry.firstAttempt + windowMs - now) / 1000);
            res.setHeader('Retry-After', String(retryAfterSec));
            return res.status(429).send(message);
        }

        next();
    };
};

setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of buckets) {
        if (now - entry.firstAttempt > 60 * 60 * 1000) {
            buckets.delete(key);
        }
    }
}, 10 * 60 * 1000).unref();

const verifyOrigin = (req, res, next) => {
    const methodsToCheck = ['POST', 'PUT', 'PATCH', 'DELETE'];
    if (!methodsToCheck.includes(req.method)) {
        return next();
    }

    const origin = req.headers.origin || req.headers.referer;

    if (!origin) {
        return next();
    }

    let originHost;
    try {
        originHost = new URL(origin).host;
    } catch {
        return res.status(403).send('Origen no permitido.');
    }

    if (originHost !== req.headers.host) {
        return res.status(403).send('Origen no permitido.');
    }

    next();
};

module.exports = {
    securityHeaders,
    rateLimit,
    verifyOrigin
};