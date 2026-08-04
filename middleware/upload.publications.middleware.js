const multer = require('multer');
const path = require('path');
const fs = require('fs');

const PUBLICATIONS_DIR = path.join(__dirname, '..', 'presentation', 'assets', 'media', 'publications');

fs.mkdirSync(PUBLICATIONS_DIR, { recursive: true });

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, PUBLICATIONS_DIR);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
        const userId = req.session && req.session.user ? req.session.user.id : 'anon';
         cb(null, `pub-${userId}-${Date.now()}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        const err = new Error('Tipo de archivo no permitido. Solo se permiten imágenes JPEG, PNG y WEBP.');
        err.expose = true;
        return cb(err);
    }
    cb (null,true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = upload;