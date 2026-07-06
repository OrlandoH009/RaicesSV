const googleCallback = (req, res) => {
    const user = req.user;

    const sessionData = {
        id: user.id_user,
        name: user.name,
        email: user.email
    };
    
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

            res.redirect('/');
        });
    });

}

module.exports = googleCallback;