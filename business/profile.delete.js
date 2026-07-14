const authService = require('./auth.server');

const deleteProfile = async (req, res) => {
    try {
        const { currentPassword } = req.body;

        await authService.deleteAccount(req.session.user.id, { currentPassword });

        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Tu cuenta se eliminó, pero no se pudo cerrar la sesión.');
            }

            res.clearCookie('raices.sid');
            res.status(200).json({ ok: true, redirect: '/index.html?cuentaEliminada=1' });
        });

    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo eliminar tu cuenta. Inténtalo de nuevo.';

        console.error(error);
        res.status(400).send(safeMessage);
    }
};

module.exports = deleteProfile;