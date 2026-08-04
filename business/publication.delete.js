const publicationService = require('./publication.server');

const deletePublication = async (req, res) => {
    try {
        const { id } = req.params;

        await publicationService.deletePublication(id, req.session.user);

        res.status(200).json({ ok: true });
    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo eliminar la publicación. Inténtalo de nuevo.';

        console.error(error);
        res.status(error && error.status ? error.status : 400).send(safeMessage);
    }
};

module.exports = deletePublication;