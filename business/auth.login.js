const authService = require('./auth.server');

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await authService.login(
            email,
            password
        );

        req.session.user = {
            id: user.id_user,
            name: user.name,
            email: user.email
        };

        res.redirect('/');

    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = login;