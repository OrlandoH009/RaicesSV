const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authService = require('../../business/auth.server');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const name = profile.displayName;
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        const googleId = profile.id;
        const googlePhotoUrl = profile.photos && profile.photos[0] ? profile.photos[0].value : null;

        if (!email) {
            const e = new Error('No se pudo obtener tu correo de Google. Verifica los permisos otorgados e inténtalo de nuevo.');
            e.expose = true;
            throw e;
        }

        const user = await authService.loginOrRegisterWithGoogle(name, email, googleId, googlePhotoUrl);
        done(null, user);
    } catch (e) {
        done(e);
    }
}));