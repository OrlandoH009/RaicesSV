const { S3Client } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');

dotenv.config();

const accountId = process.env.R2_ACCOUNT_ID;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error('Faltan variables de entorno de Cloudflare R2 (R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY).');
}

const r2Client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: { accessKeyId, secretAccessKey }
});

module.exports = r2Client;
