const express = require('express');
const router = express.Router();
const passport = require('passport');
const login = require('../business/auth.login');
const register = require('../business/auth.register');
const googleCallback = require('../business/auth.google');

router.post('/login', login);
router.post('/register', register);
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email'], session: false, prompt: 'select_account'}));
router.get('/auth/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login.html' }), googleCallback);

module.exports = router;