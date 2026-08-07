const publicationService = require('./publication.server');

const getPublication = async (req, res) => {
    try {
        const currentUser = req.session && req.session.user ? req.session.user : null;
        const { id } = req.params;

        const publication = await publicationService.getPublication(id, currentUser);

        res.status(200).json({ publication });
    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo cargar la publicación. Inténtalo de nuevo.';

            console.error(error);
        res.status(error && error.status ? error.status : 400).send(safeMessage);
    }
};

module.exports = getPublication;