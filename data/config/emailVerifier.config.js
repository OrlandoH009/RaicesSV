const dns = require('dns').promises;

const domainHasMailServer = async (email) => {
    const atIndex = email.lastIndexOf('@');
    if (atIndex === -1) return false;

    const domain = email.slice(atIndex + 1).trim().toLowerCase();
    if (!domain) return false;

    try {
        const mxRecords = await dns.resolveMx(domain);
        if (mxRecords && mxRecords.length > 0) {
            return true;
        }
    } catch (error) {}

    try {
        const addresses = await dns.resolve4(domain);
        if (addresses && addresses.length > 0) {
            return true;
        }
    } catch (error) {}

    try {
        const addresses = await dns.resolve6(domain);
        if (addresses && addresses.length > 0) {
            return true;
        }
    } catch (error) {}

    return false;
}

module.exports = { domainHasMailServer };