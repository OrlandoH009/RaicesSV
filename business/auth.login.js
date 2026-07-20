const authService = require('./auth.server');
const isSafeRedirect = (path) => {
    if (!path || typeof path !== 'string') return false;
    return path.startsWith('/') && !path.startsWith('//') && !path.includes('http');
}
const login = async (req, res) => {

    try {

        const { email, password, redirect } = req.body;
        const safeRedirect = isSafeRedirect(redirect) ? redirect : '/';

        const user = await authService.login(
            email,
            password
        );

        const sessionData = {
            id: user.id_user,
            name: user.name,
            email: user.email,
            avatarUrl: user.avatar_url || null
        };

        req.session.regenerate((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('No se pudo iniciar sesión. Inténtalo de nuevo.');
            }

            req.session.user = sessionData;

            req.session.save((saveErr) => {
                if (saveErr) {
                    console.error(saveErr);
                    return res.status(500).send('No se pudo iniciar sesión. Inténtalo de nuevo.');
                }

                res.redirect(safeRedirect);
            });
        });

    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo iniciar sesión. Inténtalo de nuevo.';

        console.error(error);
        res.status(400).send(safeMessage);
    }
};

module.exports = login;