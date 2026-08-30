const publicationService = require('./publication.server');

const updatePublication = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, location, lat, lng } = req.body;

        const imagePath = req.file ? req.file.publicUrl : undefined;

        const publication = await publicationService.updatePublication(id, req.session.user, {
            title,
            description,
            location,
            lat,
            lng,
            image: imagePath
        });

        res.status(200).json({ publication });
    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo actualizar la publicación. Inténtalo de nuevo.';

        console.error(error);
        res.status(error && error.status ? error.status : 400).send(safeMessage);
    }
};

module.exports = updatePublication;