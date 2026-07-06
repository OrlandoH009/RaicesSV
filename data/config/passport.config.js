const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authService = require('../../business/auth.server');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    const name = profile.displayName;
    const email = profile.emails[0].value;
    const googleId = profile.id;

    try {
        const user = await authService.loginOrRegisterWithGoogle(name, email, googleId);
        done(null, user);
    } catch (e) {
        done(e);
    }
}));