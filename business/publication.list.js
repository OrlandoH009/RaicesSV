const publicationService = require('./publication.server');

const listPublications = async (req, res) => {
    try {
        const currentUser = req.session && req.session.user ? req.session.user : null;
        const { location } = req.query;

        const publications = await publicationService.listPublications(currentUser, { location });

        res.status(200).json({ publications });
    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudieron cargar las publicaciones. Inténtalo de nuevo.';

        console.error(error);
        res.status(error && error.status ? error.status : 400).send(safeMessage);
    }
};

module.exports = listPublications;