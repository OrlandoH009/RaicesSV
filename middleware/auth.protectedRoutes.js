const protectRoute = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.redirect('/login.html?redirect=' + encodeURIComponent(req.originalUrl));
    }
    next();
};

module.exports = protectRoute;
