const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

let transporter = null;
let warned = false;

const SITE_COLORS = {
    navy: '#113068',
    gold: '#be8e56',
    cream: '#e5eaff',
    white: '#ffffff',
    text: '#24211d',
    muted: '#6b7280',
    background: '#faf6ee'
};

const escapeHtml = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const getSiteLogoAttachment = () => {
    const logoPath = path.join(__dirname, '..', '..', 'presentation', 'assets', 'media', 'Logo de Salvadorean Roots (Sin Fondo).png');

    if (!fs.existsSync(logoPath)) return null;

    return {
        filename: 'logo-salvadorean-roots.png',
        path: logoPath,
        cid: 'site-logo'
    };
};

const buildStyledEmailHtml = ({ title, preheader, greeting, content, ctaText, ctaUrl, footerText }) => {
    const safeTitle = escapeHtml(title || 'Notificación');
    const safePreheader = escapeHtml(preheader || '');
    const safeGreeting = escapeHtml(greeting || 'Hola');
    const safeContent = content || '';
    const safeCtaText = escapeHtml(ctaText || 'Ver más');
    const safeCtaUrl = escapeHtml(ctaUrl || '#');
    const safeFooterText = escapeHtml(footerText || '');

    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${safeTitle}</title>
</head>
<body style="margin:0;padding:0;background-color:${SITE_COLORS.background};font-family:Arial, Helvetica, sans-serif;color:${SITE_COLORS.text};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${safePreheader}</div>
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:${SITE_COLORS.background};padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;width:100%;background-color:${SITE_COLORS.white};border-radius:20px;overflow:hidden;box-shadow:0 14px 34px rgba(17,48,104,0.14);">
          <tr>
            <td style="background:linear-gradient(135deg, ${SITE_COLORS.navy} 0%, ${SITE_COLORS.gold} 100%);padding:34px 24px 30px;text-align:center;border-bottom:1px solid rgba(255,255,255,0.16);position:relative;">
              <div style="position:absolute;left:0;right:0;top:0;bottom:0;background:radial-gradient(circle at top center, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 62%);pointer-events:none;"></div>
              <div style="position:relative;z-index:1;">
                <img src="cid:site-logo" alt="Salvadorean Roots" style="width:142px;max-width:100%;height:auto;display:block;margin:0 auto 16px;" />
                <h1 style="margin:0;font-size:24px;line-height:1.3;color:${SITE_COLORS.white};font-weight:bold;letter-spacing:0.2px;">${safeTitle}</h1>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding:30px 24px 24px;">
              <p style="margin:0 0 12px;font-size:16px;line-height:1.75;color:${SITE_COLORS.text};">${safeGreeting},</p>
              <div style="font-size:15px;line-height:1.85;color:#4b5563;">${safeContent}</div>
              ${ctaUrl ? `<div style="margin:28px 0 8px;"><a href="${safeCtaUrl}" style="display:inline-block;background:linear-gradient(135deg, ${SITE_COLORS.gold} 0%, #d4a766 100%);color:${SITE_COLORS.white};text-decoration:none;padding:12px 24px;border-radius:999px;font-weight:bold;box-shadow:0 6px 14px rgba(190,142,86,0.28);">${safeCtaText}</a></div>` : ''}
            </td>
          </tr>
          <tr>
            <td style="padding:0 24px 24px;font-size:12px;line-height:1.8;color:${SITE_COLORS.muted};border-top:1px solid #eef2f7;">
              ${safeFooterText ? `<p style="margin:10px 0 0;">${safeFooterText}</p>` : ''}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

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
    const attachments = [];
    const logoAttachment = getSiteLogoAttachment();

    if (logoAttachment) {
        attachments.push(logoAttachment);
    }

    return t.sendMail({ from, to, subject, html, text, attachments });
};

module.exports = { sendMail, buildStyledEmailHtml, escapeHtml };