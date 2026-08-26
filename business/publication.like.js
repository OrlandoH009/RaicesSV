const publicationService = require('./publication.server');

const toggleLike = async (req, res) => {
    try {
        const currentUser = req.session.user;
        const { id } = req.params;

        const result = await publicationService.toggleLike(id, currentUser);

        res.status(200).json(result);
    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo registrar el like. Inténtalo de nuevo.';

        console.error(error);
        res.status(error && error.status ? error.status : 400).send(safeMessage);
    }
};

module.exports = toggleLike;
