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

        const safeRedirect = isSafeRedirect(redirect) ? redirect : '/';

        await authService.register(
            name,
            email,
            password
        );

        const loginUrl = '/login.html' + (safeRedirect !== '/' ? '?redirect=' + encodeURIComponent(safeRedirect) : '');

        res.json({
            success: true,
            message: 'Cuenta creada correctamente',
            redirect: loginUrl
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