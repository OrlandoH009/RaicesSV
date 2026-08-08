// A diferencia de auth.protectedRoutes.js (que redirige a /login.html porque
// protege VISTAS HTML), este middleware protege endpoints de API: si no hay
// sesión, responde 401 en JSON para que el fetch del frontend lo maneje.
const userRepository = require('../data/repositories/user.repository');

const requireApiAuth = async(req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Debes iniciar sesión.' });
    }

    try {
        const user = await userRepository.findById(req.session.user.id);

        if (!user) {
            req.session.destroy(() => {
                res.clearCookie('raices.sid');
                res.status(401).json({ message: 'Debes iniciar sesión.' });
            });
            return;
        }

        if (user.status_name === 'Suspendido') {
            return res.status(403).json({ message: 'Tu cuenta ha sido suspendida.', suspended: true });
        }

        next();
    } catch (error) {
        console.error('Error verificando estado de usuario en requireApiAuth:', error);
        next();
    }
};
module.exports = requireApiAuth;