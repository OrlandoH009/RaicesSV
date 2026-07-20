const express = require('express');
const router = express.Router();
const passport = require('passport');
const login = require('../business/auth.login');
const register = require('../business/auth.register');
const googleCallback = require('../business/auth.google');

router.post('/login', login);
router.post('/register', register);
router.get('/auth/google', (req, res, next) => {
    const redirect = req.query.redirect;
    const isSafe = typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//') && !redirect.includes('http');
    req.session.postLoginRedirect = isSafe ? redirect: null;
    next();
}, passport.authenticate('google', {scope: ['profile', 'email'], session: false, prompt: 'select_account'}));

router.get('/auth/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login.html' }), googleCallback);

module.exports = router;