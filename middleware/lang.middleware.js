const { translateMessage } = require('../data/config/serverMessages.config');

const LANG_COOKIE_REGEX = /(?:^|;\s*)sr_lang=(en|es)(?:;|$)/;

const getRequestLang = (req) => {
    const match = LANG_COOKIE_REGEX.exec(req.headers.cookie || '');
    return match ? match[1] : 'es';
};

const translateResponses = (req, res, next) => {
    const lang = getRequestLang(req);
    req.lang = lang;

    if (lang === 'es') return next();

    const originalJson = res.json.bind(res);
    const originalSend = res.send.bind(res);

    res.json = (body) => {
        if (body && typeof body === 'object' && !Array.isArray(body)) {
            const translated = { ...body };
            if (typeof translated.message === 'string') translated.message = translateMessage(translated.message, lang);
            if (typeof translated.error === 'string') translated.error = translateMessage(translated.error, lang);
            return originalJson(translated);
        }
        return originalJson(body);
    };

    res.send = (body) => {
        if (typeof body === 'string') return originalSend(translateMessage(body, lang));
        return originalSend(body);
    };

    next();
};

module.exports = { translateResponses, getRequestLang };
