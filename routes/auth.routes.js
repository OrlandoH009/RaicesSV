// auth.routes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const login = require('../business/auth.login');
const register = require('../business/auth.register');
const googleCallback = require('../business/auth.google');
const forgotPassword = require('../business/auth.forgotPassword');
const resetPassword = require('../business/auth.resetPassword');
const { rateLimit } = require('../middleware/security.middleware');
 
router.post('/login', rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.' }), login);
router.post('/register', rateLimit({ windowMs: 15 * 60 * 1000, max: 5, message: 'Demasiados intentos de registro. Espera unos minutos e inténtalo de nuevo.' }), register);
router.post('/forgot-password', rateLimit({ windowMs: 15 * 60 * 1000, max: 5, message: 'Demasiadas solicitudes. Espera unos minutos e inténtalo de nuevo.' }), forgotPassword);
router.post('/reset-password', rateLimit({ windowMs: 15 * 60 * 1000, max: 10, message: 'Demasiados intentos. Espera unos minutos e inténtalo de nuevo.' }), resetPassword);
router.get('/auth/google', (req, res, next) => {
    const redirect = req.query.redirect;
    const isSafe = typeof redirect === 'string' && redirect.startsWith('/') && !redirect.startsWith('//') && !redirect.includes('http');
    req.session.postLoginRedirect = isSafe ? redirect : null;
    next();
}, passport.authenticate('google', {scope: ['profile', 'email'], session: false, prompt: 'select_account'}));
 
router.get('/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', { session: false }, (err, user) => {
        if (err || !user) {
            const isSuspended = err && /suspendida/i.test(err.message);
            return res.redirect(isSuspended ? '/login.html?suspendido=1' : '/login.html');
        }
        req.user = user;
        next();
    })(req, res, next);
}, googleCallback);
 
module.exports = router;