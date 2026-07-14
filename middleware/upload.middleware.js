const multer = require('multer');
const path = require('path');
const fs = require('fs');

const AVATARS_DIR = path.join(__dirname, '..', 'presentation', 'assets', 'media', 'avatars');

// Se asegura de que la carpeta exista (multer no la crea sola).
fs.mkdirSync(AVATARS_DIR, { recursive: true });

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, AVATARS_DIR);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
        const userId = req.session && req.session.user ? req.session.user.id : 'anon';
        cb(null, `avatar-${userId}-${Date.now()}${ext}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        const err = new Error('Solo se permiten imágenes JPG, PNG o WEBP.');
        err.expose = true;
        return cb(err);
    }
    cb(null, true);
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 3 * 1024 * 1024 } // 3 MB
});

module.exports = upload;