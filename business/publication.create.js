const publicationService = require('./publication.server');

const createPublication = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('Debes subir una imagen.');
        }

        const { title, description, location, lat, lng } = req.body;
        const imagePath = `/assets/media/publications/${req.file.filename}`;

        const publication = await publicationService.createPublication(req.session.user.id, {
            title,
            description,
            location,
            lat,
            lng,
            image: imagePath
        });

        res.status(201).json({ publication });
    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo crear la publicación. Inténtalo de nuevo.';

        console.error(error);
        res.status(error && error.status ? error.status : 400).send(safeMessage);
    }
};

module.exports = createPublication;