const dns = require('dns').promises;
const DNS_TIMEOUT_MS = 4000;
const withTimeout = (promise, ms) => {
    return Promise.race([
        promise,
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error('DNS_TIMEOUT')), ms)
        )
    ]);
};
const KNOWN_EMAIL_DOMAINS = new Set([
        'gmail.com',
        'hotmail.com',
        'outlook.com',
        'yahoo.com',
        'yahoo.es',
        'icloud.com',
        'live.com',
        'aol.com',
        'cdb.edu.sv',
        'clases.edu.sv'
]);

const isInconclusiveDnsError = (error) => {
    if (!error) return false;
    if (error.message === 'DNS_TIMEOUT') return true;
    const inconclusiveCodes = new Set(['ESERVFAIL', 'ETIMEOUT', 'ECONNREFUSED', 'EREFUSED', 'ECANCELLED']);
    return inconclusiveCodes.has(error.code);
};

const domainHasMailServer = async (email) => {
    const atIndex = email.lastIndexOf('@');
    if (atIndex === -1) return false;

    const domain = email.slice(atIndex + 1).trim().toLowerCase();
    if (!domain) return false;

    if (KNOWN_EMAIL_DOMAINS.has(domain)) {
        return true;
    }

    let inconclusive = false;

    try {
        const mxRecords = await withTimeout(dns.resolveMx(domain), DNS_TIMEOUT_MS);
        if (mxRecords && mxRecords.length > 0) {
            return true;
        }
    } catch (error) {
        if (isInconclusiveDnsError(error)) inconclusive = true;
    }

    try {
        const addresses = await withTimeout(dns.resolve4(domain), DNS_TIMEOUT_MS);
        if (addresses && addresses.length > 0) {
            return true;
        }
    } catch (error) {
        if (isInconclusiveDnsError(error)) inconclusive = true;
    }

    try {
        const addresses = await withTimeout(dns.resolve6(domain), DNS_TIMEOUT_MS);
        if (addresses && addresses.length > 0) {
            return true;
        }
    } catch (error) {
        if (isInconclusiveDnsError(error)) inconclusive = true;
    }

    if (inconclusive) {
        console.warn(`No se pudo verificar el dominio "${domain}" por un problema de red/DNS; se permite el registro, pero con precaución`);
        return true;
    }

    return false;
}

module.exports = { domainHasMailServer };