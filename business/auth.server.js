const bcrypt = require('bcrypt');
const userRepository = require('../data/repositories/user.repository');

const login = async (email, password) => {

    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new Error('Correo incorrecto');
    }

    const valid = await bcrypt.compare(
        password,
        user.password
    );

    if (!valid) {
        throw new Error('Contraseña incorrecta');
    }

    return user;
};

const register = async (name, email, password) => {

    const user = await userRepository.findByEmail(email);

    if (user) {
        throw new Error('El correo ya existe');
    }

    const hash = await bcrypt.hash(password, 10);

    await userRepository.createUser(
        name,
        email,
        hash
    );
};

module.exports = {
    login,
    register
};