const authService = require('./auth.server');

const updateProfile = async (req, res) => {
    try {
        const { name, email, description, password, currentPassword } = req.body;

        const updated = await authService.updateProfile(req.session.user.id, {
            name,
            email,
            description,
            password,
            currentPassword
        });

        req.session.user = {
            id: updated.id,
            name: updated.name,
            email: updated.email,
            avatarUrl: updated.avatarUrl
        };

        req.session.save((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Se guardaron los cambios, pero no se pudo actualizar la sesión.');
            }

            res.status(200).json({ user: updated });
        });

    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo actualizar tu perfil. Inténtalo de nuevo.';

        console.error(error);
        res.status(400).send(safeMessage);
    }
};

module.exports = updateProfile;