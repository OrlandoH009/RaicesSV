const { PutObjectCommand } = require('@aws-sdk/client-s3');
const r2Client = require('../data/config/r2.config');

const BUCKET_NAME = process.env.R2_BUCKET_NAME;
const PUBLIC_URL = (process.env.R2_PUBLIC_URL || '').replace(/\/$/, '');

const EXTENSION_BY_MIME = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/webp': '.webp'
};

const uploadToR2 = (folder, prefix) => async (req, res, next) => {
    if (!req.file || !req.file.buffer) return next();

    try {
        const ext = EXTENSION_BY_MIME[req.file.mimetype] || '.jpg';
        const userId = req.session && req.session.user ? req.session.user.id : 'anon';
        const key = `${folder}/${prefix}-${userId}-${Date.now()}${ext}`;

        await r2Client.send(new PutObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        }));

        req.file.publicUrl = `${PUBLIC_URL}/${key}`;
        next();
    } catch (err) {
        console.error('Error subiendo archivo a Cloudflare R2:', err);
        res.status(500).send('No se pudo subir la imagen. Inténtalo de nuevo.');
    }
};

module.exports = uploadToR2;
