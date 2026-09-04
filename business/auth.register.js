const authService = require('./auth.server');

const isSafeRedirect = (path) => {
    if (!path || typeof path !== 'string') return false;
    return path.startsWith('/') && !path.startsWith('//') && !path.includes('http');
}

const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            redirect
        } = req.body;
        
        const user = await authService.register(
            name,
            email,
            password
        );

        const sessionData = {
            id: user.id_user,
            name: user.name,
            email: user.email,
            avatarUrl: user.avatar_url || null,
            role: user.role_name
        };

        const isAdminRole = sessionData.role === 'Admin' || sessionData.role === 'Fundador';
        const defaultRedirect = isAdminRole ? '/admin' : '/';
        const safeRedirect = isSafeRedirect(redirect) ? redirect : defaultRedirect;

        req.session.regenerate((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('La cuenta se creó, pero no se pudo iniciar sesión. Inténtalo de nuevo.');
            }

            req.session.user = sessionData;

            req.session.save((saveErr) => {
                if (saveErr) {
                    console.error(saveErr);
                    return res.status(500).send('La cuenta se creó, pero no se pudo iniciar sesión. Inténtalo de nuevo.');
                }

                res.json({
                    success: true,
                    message: 'Cuenta creada correctamente',
                    redirect: safeRedirect
                });
            });
        });

    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo crear la cuenta. Inténtalo de nuevo.';

        console.error(error);
        res.status(400).send(safeMessage);
    }
};

module.exports = register;