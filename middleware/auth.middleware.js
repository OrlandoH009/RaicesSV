// Este archivo se mantiene por compatibilidad, pero la lógica real vive en
// auth.protectedRoutes.js para no tener dos middlewares de auth divergentes.
module.exports = require('./auth.protectedRoutes');