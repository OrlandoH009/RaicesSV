// business/auth.status.js
function getAuthStatus(req, res) {
    if (req.session && req.session.user) {
        return res.json({
            authenticated: true,
            user: {
                id: req.session.user.id,
                name: req.session.user.name,
                email: req.session.user.email,
                role: req.session.user.role
            },
            authState: 'autenticado'
        });
    } else {
        return res.json({
            authenticated: false,
            authState: 'invitado'
        });
    }
}

module.exports = getAuthStatus;