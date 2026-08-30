const uploadLogRepository = require('../data/repositories/uploadLog.repository');

const rateLimitUploads = (type, maxUploads, windowHours) => async (req, res, next) => {
    if (!req.file) return next();

    if (!req.session || !req.session.user) {
        return res.status(401).send('Debes iniciar sesión.');
    }

    try {
        const recentCount = await uploadLogRepository.countRecent(req.session.user.id, type, windowHours);

        if (recentCount >= maxUploads) {
            return res.status(429).send(`Has alcanzado el límite de ${maxUploads} subidas por ${windowHours}h. Inténtalo más tarde.`);
        }

        await uploadLogRepository.create(req.session.user.id, type);
        next();
    } catch (err) {
        console.error('Error verificando el límite de subidas:', err);
        res.status(500).send('No se pudo procesar la subida. Inténtalo de nuevo.');
    }
};

module.exports = rateLimitUploads;
