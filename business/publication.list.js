const publicationService = require('./publication.server');

const listPublications = async (req, res) => {
    try {
        const currentUser = req.session && req.session.user ? req.session.user : null;
        const { location } = req.query;

        const publications = await publicationService.listPublications(currentUser, { location });

        // Se pide en cada carga del mapa; un caché corto en el borde de
        // Vercel evita golpear la base de datos por cada visita sin que se
        // note desactualizado (a los usuarios logueados igual les cachea su
        // propia respuesta -incluye si dieron like- así que el valor es bajo).
        if (!currentUser) {
            res.setHeader('Cache-Control', 'public, max-age=30, s-maxage=60, stale-while-revalidate=120');
        }
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