function requireAdmin(req, res, next) {
    if (!req.session || !req.session.user) {
        const originalUrl = req.originalUrl || req.url;
        return res.redirect (`/login.html?redirect=${encodeURIComponent(originalUrl)}`);
    }

    const role = req.session.user.role;

    if (role !== 'Admin' && role !== 'Fundador') {
        return res.redirect('/');
    }

    return next();

}

module.exports = requireAdmin;