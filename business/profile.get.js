const authService = require('./auth.server');

const getProfile = async (req, res) => {
    try {
        const profile = await authService.getProfile(req.session.user.id);
        res.status(200).json({ user: profile });
    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo cargar tu perfil. Inténtalo de nuevo.';

        console.error(error);
        res.status(400).send(safeMessage);
    }
};

module.exports = getProfile;