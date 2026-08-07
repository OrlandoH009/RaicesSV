const userRepository = require('../data/repositories/user.repository');

async function protectRoute(req, res, next) {
    if (!req.session || !req.session.user) {
        const originalUrl = req.originalUrl || req.url;
        return res.redirect(`/login.html?redirect=${encodeURIComponent(originalUrl)}`);
    }

    try {
        const user = await userRepository.findById(req.session.user.id);

        if (!user || user.status_name === 'Suspendido') {
            req.session.destroy(() => {
                res.clearCookie('raices.sid');
                res.redirect('/login.html?suspendido=1');
            });
            return;
        }

        return next();
    } catch (error) {
        console.error('Error verificando estado de usuario en protectRoute:', error);
        return next(); // ante un error de BD, no bloqueamos al usuario por un problema ajeno a él
    }
}

module.exports = protectRoute;