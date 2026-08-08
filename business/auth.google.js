const googleCallback = (req, res) => {
    const user = req.user;

    const sessionData = {
        id: user.id_user,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatar_url || null,
        role: user.role_name
    };

    const isAdminRole = sessionData.role === 'Admin' || sessionData.role === 'Fundador';
    const defaultRedirect = isAdminRole ? '/admin' : '/';
    const redirectAfterLogin = req.session.postLoginRedirect || defaultRedirect;

    req.session.regenerate((regenErr) => {
        if (regenErr) {
            console.error(regenErr);
            return res.status(500).send('No se pudo iniciar sesión. Intentelo de nuevo más tarde.');
        }
        req.session.user = sessionData;
        req.session.save((saveErr) => {
            if (saveErr) {
                console.error(saveErr);
                return res.status(500).send('No se pudo iniciar sesión. Intentelo de nuevo más tarde.');
            }

            res.redirect(redirectAfterLogin);
        });
    });
}
module.exports = googleCallback;