const authService = require('./auth.server');

const register = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        await authService.register(
            name,
            email,
            password
        );

        res.redirect('/login.html');

    } catch (error) {
        // Solo se muestran al usuario los mensajes controlados que lanza auth.server.js.
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo crear la cuenta. Inténtalo de nuevo.';

        console.error(error);
        res.status(400).send(safeMessage);
    }
};

module.exports = register;
