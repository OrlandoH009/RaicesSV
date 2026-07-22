const nodemailer = require('nodemailer');

let transporter = null;
let warned = false;

/**
 * Crea (una sola vez) el transporter de Nodemailer usando SMTP/Gmail.
 * Variables esperadas en .env:
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE ("true"/"false"), SMTP_USER, SMTP_PASS
 *   MAIL_FROM (opcional, por defecto usa SMTP_USER)
 *
 * Para Gmail: SMTP_HOST=smtp.gmail.com, SMTP_PORT=465, SMTP_SECURE=true,
 * SMTP_USER=tu_correo@gmail.com, SMTP_PASS=contraseña de aplicación (no la normal).
 */
const getTransporter = () => {
    if (transporter) return transporter;

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        if (!warned) {
            console.warn(
                '[mailer] Faltan variables SMTP_HOST/SMTP_USER/SMTP_PASS en .env. ' +
                'El envío de correos (recuperación de contraseña) no funcionará hasta configurarlas.'
            );
            warned = true;
        }
        return null;
    }

    transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: Number(SMTP_PORT) || 587,
        secure: String(process.env.SMTP_SECURE).toLowerCase() === 'true',
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS
        }
    });

    return transporter;
};

const sendMail = async ({ to, subject, html, text }) => {
    const t = getTransporter();

    if (!t) {
        // En desarrollo local sin SMTP configurado, no rompemos el flujo:
        // dejamos constancia en consola para que se pueda seguir probando.
        console.log('--- [mailer] SMTP no configurado. Contenido del correo que se habría enviado ---');
        console.log('Para:', to);
        console.log('Asunto:', subject);
        console.log(text || html);
        console.log('--- fin del correo simulado ---');
        return { simulated: true };
    }

    const from = process.env.MAIL_FROM || process.env.SMTP_USER;

    return t.sendMail({ from, to, subject, html, text });
};

module.exports = { sendMail };