const express = require('express');
const router = express.Router();

/**
 * Proxy de geocodificación (Nominatim / OpenStreetMap) para el buscador de
 * ubicaciones del formulario de publicaciones.
 *
 * Antes el navegador llamaba directo a nominatim.openstreetmap.org, pero la
 * política de seguridad (CSP) del sitio solo permite conexiones a 'self' -así
 * que el navegador bloqueaba esas peticiones en silencio. La búsqueda parecía
 * "no encontrar nada" incluso para lugares muy conocidos, cuando en realidad
 * la petición nunca llegaba a salir del navegador.
 *
 * Pasar la petición por nuestro servidor evita tener que abrir el CSP a un
 * dominio externo y además cumple mejor la política de uso de Nominatim
 * (identificarse con un User-Agent propio y no golpearlo sin límite desde
 * miles de navegadores distintos a la vez).
 */

const NOMINATIM_SEARCH_URL = 'https://nominatim.openstreetmap.org/search';
const NOMINATIM_REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse';
const USER_AGENT = 'RaicesSV/1.0 (+https://github.com/OrlandoH009/RaicesSV)';

// Límite liviano por IP: cada tecleo del buscador dispara como mucho una
// búsqueda (hay debounce en el cliente), pero esto evita que este proxy se
// use como puerta de entrada gratuita a Nominatim en volumen.
const VENTANA_MS = 10 * 1000;
const MAX_PETICIONES_POR_VENTANA = 15;
const conteoPorIp = new Map();

function limitarPorIp(req, res, next) {
    const ip = req.ip;
    const ahora = Date.now();
    const entrada = conteoPorIp.get(ip);

    if (!entrada || ahora - entrada.inicio > VENTANA_MS) {
        conteoPorIp.set(ip, { conteo: 1, inicio: ahora });
        return next();
    }

    entrada.conteo += 1;
    if (entrada.conteo > MAX_PETICIONES_POR_VENTANA) {
        return res.status(429).json({ error: 'Demasiadas búsquedas, esperá un momento.' });
    }
    next();
}

setInterval(() => {
    const ahora = Date.now();
    for (const [ip, entrada] of conteoPorIp) {
        if (ahora - entrada.inicio > VENTANA_MS * 6) {
            conteoPorIp.delete(ip);
        }
    }
}, 60 * 1000).unref();

function idiomaAceptado(req) {
    return req.query.lang === 'en' ? 'en' : 'es';
}

router.get('/api/geocode/search', limitarPorIp, async (req, res) => {
    const q = typeof req.query.q === 'string' ? req.query.q.trim().slice(0, 200) : '';
    if (!q) return res.status(200).json([]);

    try {
        const params = new URLSearchParams({
            q,
            format: 'jsonv2',
            addressdetails: '1',
            limit: '8',
            countrycodes: 'sv'
        });
        const upstreamRes = await fetch(`${NOMINATIM_SEARCH_URL}?${params.toString()}`, {
            headers: { 'User-Agent': USER_AGENT, 'Accept-Language': idiomaAceptado(req) }
        });

        if (!upstreamRes.ok) return res.status(502).json([]);

        const data = await upstreamRes.json();
        // Resultados de búsqueda de texto se pueden cachear un rato en el
        // borde: la misma consulta de dos usuarios distintos no necesita
        // pegarle a Nominatim dos veces.
        res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=3600, stale-while-revalidate=600');
        res.status(200).json(data);
    } catch (error) {
        console.error('Error buscando lugar en Nominatim:', error);
        res.status(502).json([]);
    }
});

router.get('/api/geocode/reverse', limitarPorIp, async (req, res) => {
    const lat = Number(req.query.lat);
    const lon = Number(req.query.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
        return res.status(400).json({ error: 'Coordenadas inválidas.' });
    }

    try {
        const params = new URLSearchParams({
            lat: String(lat), lon: String(lon), format: 'jsonv2', addressdetails: '1'
        });
        const upstreamRes = await fetch(`${NOMINATIM_REVERSE_URL}?${params.toString()}`, {
            headers: { 'User-Agent': USER_AGENT, 'Accept-Language': idiomaAceptado(req) }
        });

        if (!upstreamRes.ok) return res.status(502).json({});

        const data = await upstreamRes.json();
        res.status(200).json(data);
    } catch (error) {
        console.error('Error en reverse geocoding con Nominatim:', error);
        res.status(502).json({});
    }
});

module.exports = router;
