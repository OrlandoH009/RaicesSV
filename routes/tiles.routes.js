const express = require('express');
const router = express.Router();

/**
 * Proxy de tiles del mapa cultural (Stadia Maps).
 *
 * La API key de Stadia vivía antes en el JS del cliente, visible para
 * cualquiera que abriera el código fuente. Cualquiera podía copiarla y
 * usarla fuera de este sitio, agotando la cuota gratuita del proveedor -y
 * si eso pasa, todos los tiles del mapa fallan a la vez. Aquí la petición
 * pasa primero por nuestro servidor, que agrega la key server-side antes
 * de reenviarla a Stadia; el cliente nunca la ve.
 */

const STADIA_BASE_URL = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark';

// Límite liviano por IP: una sola sesión de mapa dispara decenas de tiles
// en pocos segundos al hacer zoom/pan, así que el límite es alto, pero
// sigue evitando que alguien use este proxy como llave gratuita para bajar
// tiles de Stadia Maps en volumen fuera del mapa.
const VENTANA_MS = 10 * 1000;
const MAX_TILES_POR_VENTANA = 400;
const conteoPorIp = new Map();

function limitarTilesPorIp(req, res, next) {
    const ip = req.ip;
    const ahora = Date.now();
    const entrada = conteoPorIp.get(ip);

    if (!entrada || ahora - entrada.inicio > VENTANA_MS) {
        conteoPorIp.set(ip, { conteo: 1, inicio: ahora });
        return next();
    }

    entrada.conteo += 1;
    if (entrada.conteo > MAX_TILES_POR_VENTANA) {
        return res.status(429).end();
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

const Z_RE = /^\d{1,3}$/;
const X_RE = /^\d{1,10}$/;
const Y_RE = /^\d{1,10}(@2x)?\.png$/;

router.get('/api/tiles/:z/:x/:y', limitarTilesPorIp, async (req, res) => {
    const apiKey = process.env.STADIA_API_KEY;
    if (!apiKey) {
        console.error('Falta STADIA_API_KEY en el archivo .env: no se pueden servir los tiles del mapa.');
        return res.status(503).end();
    }

    const { z, x, y } = req.params;
    if (!Z_RE.test(z) || !X_RE.test(x) || !Y_RE.test(y)) {
        return res.status(400).end();
    }

    try {
        const upstreamUrl = `${STADIA_BASE_URL}/${z}/${x}/${y}?api_key=${apiKey}`;
        const upstreamRes = await fetch(upstreamUrl);

        if (!upstreamRes.ok) {
            return res.status(upstreamRes.status).end();
        }

        res.setHeader('Content-Type', upstreamRes.headers.get('content-type') || 'image/png');
        res.setHeader('Cache-Control', upstreamRes.headers.get('cache-control') || 'public, max-age=21600');

        const buffer = Buffer.from(await upstreamRes.arrayBuffer());
        res.end(buffer);
    } catch (error) {
        console.error('Error obteniendo un tile de Stadia Maps:', error);
        res.status(502).end();
    }
});

module.exports = router;
