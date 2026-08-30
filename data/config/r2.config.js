const { S3Client } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');

dotenv.config();

// El cliente se construye de forma perezosa (al primer uso real) para que
// simplemente requerir este módulo no tumbe el servidor cuando R2 no está
// configurado (por ejemplo, en desarrollo local sin subida de imágenes).
let r2Client = null;

function getR2Client() {
    if (r2Client) return r2Client;

    const accountId = process.env.R2_ACCOUNT_ID;
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

    if (!accountId || !accessKeyId || !secretAccessKey) {
        throw new Error('Faltan variables de entorno de Cloudflare R2 (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY).');
    }

    r2Client = new S3Client({
        region: 'auto',
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: { accessKeyId, secretAccessKey }
    });
    return r2Client;
}

module.exports = {
    send: (...args) => getR2Client().send(...args)
};
