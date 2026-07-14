// A diferencia de auth.protectedRoutes.js (que redirige a /login.html porque
// protege VISTAS HTML), este middleware protege endpoints de API: si no hay
// sesión, responde 401 en JSON para que el fetch del frontend lo maneje.
const requireApiAuth = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Debes iniciar sesión.' });
    }
    next();
};

module.exports = requireApiAuth;