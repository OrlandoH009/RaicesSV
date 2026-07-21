function protectRoute(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    // CAPTURAR la ruta a la que intentaba acceder (ej: /gastronomia)
    const originalUrl = req.originalUrl || req.url;
    // Pasarla como parámetro de redirección encodeado
    res.redirect(`/login.html?redirect=${encodeURIComponent(originalUrl)}`);
}

module.exports = protectRoute;