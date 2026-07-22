const authService = require('./auth.server');

const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        await authService.resetPassword(token, password);

        res.json({
            success: true,
            message: 'Tu contraseña se actualizó correctamente. Ya puedes iniciar sesión.',
            redirect: '/login.html?passwordReset=1'
        });
    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo restablecer la contraseña. Inténtalo de nuevo.';

        console.error(error);
        res.status(400).send(safeMessage);
    }
};

module.exports = resetPassword;