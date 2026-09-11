const publicationService = require('./publication.server');

// Autocompletado de ubicaciones ya usadas en publicaciones existentes.
// Se combina en el cliente con la búsqueda de Nominatim para que lugares
// que no están en OpenStreetMap (negocios pequeños, restaurantes locales)
// también se puedan encontrar por nombre una vez que alguien los publicó.
const searchPublicationLocations = async (req, res) => {
    try {
        const { q } = req.query;
        const locations = await publicationService.searchLocations(q);
        res.status(200).json({ locations });
    } catch (error) {
        console.error(error);
        res.status(400).send('No se pudieron buscar ubicaciones.');
    }
};

module.exports = searchPublicationLocations;
