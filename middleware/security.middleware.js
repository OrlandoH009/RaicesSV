/**
 * Middlewares de seguridad "sin dependencias extra":
 *  - securityHeaders: cabeceras HTTP básicas de protección.
 *  - rateLimit(name, opts): limita intentos por IP en memoria (útil contra fuerza bruta
 *    en /login y /register). Para producción con varias instancias, sustituir por un
 *    store compartido (Redis, etc.) o por el paquete "express-rate-limit".
 *  - verifyOrigin: rechaza peticiones POST/PUT/PATCH/DELETE cuyo Origin/Referer no
 *    coincida con el host de la app (mitigación CSRF básica, complementa a la cookie
 *    de sesión con SameSite=Lax).
 */

const securityHeaders = (req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');
    // No forzamos CSP estricta para no romper estilos/scripts inline existentes,
    // pero sí evitamos que el sitio sea embebido en iframes de terceros (clickjacking).
    res.setHeader('X-XSS-Protection', '0'); // obsoleta en navegadores modernos; X-Frame-Options/CSP la sustituyen
    next();
};

// Map<key, { count, firstAttempt }>
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

// Limpieza periódica para no acumular memoria indefinidamente
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

    // Si no hay Origin/Referer (algunos clientes no lo envían), no bloqueamos aquí:
    // la cookie de sesión con SameSite=Lax ya evita el caso típico de CSRF.
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
