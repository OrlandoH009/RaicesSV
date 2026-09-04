const userRepository = require('../data/repositories/user.repository');

async function requireAdmin(req, res, next) {
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

        if (user.role_name !== 'Admin' && user.role_name !== 'Fundador') {
            return res.redirect('/');
        }

        req.session.user.role = user.role_name;

        return next();
    } catch (error) {
        console.error('Error verificando estado de usuario en requireAdmin:', error);
        return next();
    }
}

module.exports = requireAdmin;