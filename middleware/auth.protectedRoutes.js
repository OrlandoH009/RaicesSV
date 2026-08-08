const userRepository = require('../data/repositories/user.repository');

async function protectRoute(req, res, next) {
    if (!req.session || !req.session.user) {
        const originalUrl = req.originalUrl || req.url;
        return res.redirect(`/login.html?redirect=${encodeURIComponent(originalUrl)}`);
    }

    try {
        const user = await userRepository.findById(req.session.user.id);

        if (!user) {
            req.session.destroy(() => {
                res.clearCookie('raices.sid');
                res.redirect('/login.html');
            });
            return;
        }

        if (user.status_name === 'Suspendido') {
            return res.redirect('/?suspendido=1');
        }

        return next();
    } catch (error) {
        console.error('Error verificando el estado de la cuenta del usuario en protectRoutes:', error);
        return next();
    }
}

module.exports = protectRoute;