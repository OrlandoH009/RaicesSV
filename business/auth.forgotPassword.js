const authService = require('./auth.server');

const GENERIC_MESSAGE = 'Si el correo existe en nuestro sistema, te hemos enviado un enlace para restablecer tu contraseña.';

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        // Base URL de la app para construir el link del correo (respeta proxies como ngrok).
        const appBaseUrl = `${req.protocol}://${req.get('host')}`;

        await authService.requestPasswordReset(email, appBaseUrl);

        // Respuesta SIEMPRE genérica: no revelamos si el correo existe o no,
        // para evitar que alguien use este endpoint para enumerar usuarios.
        res.json({ success: true, message: GENERIC_MESSAGE });
    } catch (error) {
        console.error(error);
        // Incluso ante un error interno, devolvemos el mismo mensaje genérico.
        res.json({ success: true, message: GENERIC_MESSAGE });
    }
};

module.exports = forgotPassword;