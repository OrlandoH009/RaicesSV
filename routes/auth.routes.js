const express = require('express');
const router = express.Router();

const login = require('../business/auth.login');
const register = require('../business/auth.register');

router.post('/login', login);
router.post('/register', register);

module.exports = router;