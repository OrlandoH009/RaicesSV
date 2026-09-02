const userRepository = require('../data/repositories/user.repository');

const requireAdminApiAuth = async (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Debes iniciar sesión' });
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
        
        if (user.role_name !== 'Admin' && user.role_name !== 'Fundador') {
            return res.status(403).json({ message: 'No tienes permisos para acceder a esta sección.' });
        }

        next(); 
    } catch (error) {
        console.error('Error verificando estado de usuario en requireAdminApiAuth:', error);
        next();
    }
};

module.exports = requireAdminApiAuth;