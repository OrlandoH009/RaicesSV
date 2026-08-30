const sharp = require('sharp');

sharp.cache(false);

const MAX_WIDTH = 1600;
const JPEG_QUALITY = 78;
const WEBP_QUALITY = 78;
const PNG_QUALITY = 85;

const compressImage = () => async (req, res, next) => {
    if (!req.file || !req.file.buffer) return next();

    const mimetype = req.file.mimetype;
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(mimetype)) return next();

    try {
        const inputBuffer = req.file.buffer;
        const image = sharp(inputBuffer, { limitInputPixels: false });
        const metadata = await image.metadata();

        let pipeline = image.rotate();
        if (metadata.width && metadata.width > MAX_WIDTH) {
            pipeline = pipeline.resize({ width: MAX_WIDTH });
        }

        if (mimetype === 'image/png') {
            pipeline = pipeline.png({ compressionLevel: 9, palette: true, quality: PNG_QUALITY });
        } else if (mimetype === 'image/jpeg') {
            pipeline = pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });
        } else if (mimetype === 'image/webp') {
            pipeline = pipeline.webp({ quality: WEBP_QUALITY });
        }

        const outputBuffer = await pipeline.toBuffer();

        if (outputBuffer.length < inputBuffer.length) {
            req.file.buffer = outputBuffer;
            req.file.size = outputBuffer.length;
        }
    } catch (err) {
        console.error('No se pudo comprimir la imagen subida:', err);
    }

    next();
};

module.exports = compressImage;
