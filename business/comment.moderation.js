const BAD_WORDS = require('../data/moderation/badWords.list');

const DIACRITICS_REGEX = new RegExp('[̀-ͯ]', 'g');

// Sustituciones típicas de "leetspeak" usadas para evadir el filtro (p4ndejo, put0, etc.)
const LEET_MAP = { '0': 'o', '1': 'i', '3': 'e', '4': 'a', '5': 's', '7': 't', '@': 'a', '$': 's' };

const normalize = (text) => {
    return text
        .toLowerCase()
        .normalize('NFD').replace(DIACRITICS_REGEX, '') // quita tildes
        .replace(/[013457@$]/g, (c) => LEET_MAP[c] || c)
        .replace(/(.)\1{2,}/g, '$1$1'); // "hollaaaaa" -> "hollaa"
};

// Coincidencia por palabra completa (\b) para evitar falsos positivos como
// "diputado" o "computadora", que contienen "puta" como subcadena pero no como palabra.
const containsBadWords = (text) => {
    if (typeof text !== 'string' || !text.trim()) return { flagged: false };

    const normalized = normalize(text);

    for (const word of BAD_WORDS) {
        const regex = new RegExp(`\\b${word}\\w*`, 'i');
        if (regex.test(normalized)) {
            return { flagged: true, matchedWord: word };
        }
    }

    return { flagged: false };
};

module.exports = { containsBadWords };
