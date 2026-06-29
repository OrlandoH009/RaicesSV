const authService = require('./auth.service');

const register = async (req, res) => {

    try {

        const {
            name,
            email,
            password
        } = req.body;

        await authService.register(
            name,
            email,
            password
        );

        res.redirect('/login.html');

    } catch (error) {
        res.status(400).send(error.message);
    }
};

module.exports = register;