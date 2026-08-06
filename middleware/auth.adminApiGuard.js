const requireAdminApiAuth = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({ message: 'Debes iniciar sesión' });
    }

    const role = req.session.user.role

    if (role !== 'Admin' && role !=='Fundador') {
        return res.status(403).json({ message: 'No tienes permisos para acceder a esta sección.' });
    }

    next();
};

module.exports = requireAdminApiAuth;