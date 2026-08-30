const authService = require('./auth.server');

const syncSessionAvatar = (req, avatarUrl) => {
    req.session.user = { ...req.session.user, avatarUrl };
};

const uploadAvatar = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No se recibió ninguna imagen.');
        }

        const avatarUrl = req.file.publicUrl;
        const updated = await authService.setLocalAvatar(req.session.user.id, avatarUrl);

        syncSessionAvatar(req, updated.avatarUrl);

        req.session.save((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('La foto se guardó, pero no se pudo actualizar la sesión.');
            }
            res.status(200).json({ user: updated });
        });

    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo subir tu foto de perfil. Inténtalo de nuevo.';

        console.error(error);
        res.status(400).send(safeMessage);
    }
};

const useGoogleAvatar = async (req, res) => {
    try {
        const updated = await authService.setGoogleAvatar(req.session.user.id);

        syncSessionAvatar(req, updated.avatarUrl);

        req.session.save((err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Se actualizó la foto, pero no se pudo refrescar la sesión.');
            }
            res.status(200).json({ user: updated });
        });

    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo usar tu foto de Google. Inténtalo de nuevo.';

        console.error(error);
        res.status(400).send(safeMessage);
    }
};

module.exports = { uploadAvatar, useGoogleAvatar };