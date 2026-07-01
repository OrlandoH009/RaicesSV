const bcrypt = require('bcrypt');
const userRepository = require('../data/repositories/user.repository');

const login = async (email, password) => {

    const user = await userRepository.findByEmail(email);

    if (!user) {
        throw new Error('Correo o contraseña incorrecta');
    }

    let valid = false;

    if (user.password && typeof user.password === 'string') {
        if (user.password.startsWith('$2') && user.password.length > 50) {
            try {
                valid = await bcrypt.compare(password, user.password);
            } catch (error) {
                valid = false;
            }
        } else {
            valid = user.password === password;
        }
    }

    if (!valid) {
        throw new Error('Correo o contraseña incorrecta');
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