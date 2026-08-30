const multer = require('multer');

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const fileFilter = (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        const err = new Error('Tipo de archivo no permitido. Solo se permiten imágenes JPEG, PNG y WEBP.');
        err.expose = true;
        return cb(err);
    }
    cb(null, true);
};

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter,
    limits: { fileSize: 3 * 1024 * 1024 } // 3MB
});

module.exports = upload;
