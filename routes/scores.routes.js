// routes/scores.routes.js
const express = require('express');
const router = express.Router();
const protectRoute = require('../middleware/auth.protectedRoutes');
const {
    guardarScoreQuiz,
    obtenerMejorScoreQuiz,
    guardarScore,
    obtenerMejorScore,
} = require('../business/scores.business');

/* ───────────── Quiz (categoría + nivel) ───────────── */

// Guarda el puntaje de una partida de quiz recién terminada.
// body: { categoria: 'historia' | 'todas' | ..., nivel: 'facil' | 'medio' | 'dificil' | 'guanaco', puntaje: number }
router.post('/api/scores', protectRoute, async (req, res) => {
    try {
        const { categoria, nivel, puntaje } = req.body;
        const idUser = req.session.user.id;

        await guardarScoreQuiz(idUser, categoria, nivel, puntaje);

        res.json({ success: true, message: 'Puntaje guardado correctamente.' });
    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo guardar el puntaje.';
        console.error(error);
        res.status(400).json({ success: false, message: safeMessage });
    }
});

// Devuelve el mejor puntaje histórico del usuario logueado para una
// combinación exacta de categoría + nivel del quiz.
// query: ?categoria=historia&nivel=facil
router.get('/api/scores/best', protectRoute, async (req, res) => {
    try {
        const idUser = req.session.user.id;
        const { categoria, nivel } = req.query;

        const best = await obtenerMejorScoreQuiz(idUser, categoria, nivel);

        res.json({ success: true, best });
    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo obtener el récord.';
        console.error(error);
        res.status(400).json({ success: false, message: safeMessage });
    }
});

/* ───────────── Juegos interactivos (juegos.html) ─────────────
   game_name se arma en el cliente combinando el identificador del juego
   con su dificultad/modo/distancia (ej. "pupusa-easy", "trompos-pvp"),
   y se valida contra la lista blanca GAME_NAMES_VALIDOS en el backend. */

// Guarda el puntaje de una partida de juegos.html recién terminada.
// body: { gameName: 'pupusa-easy' | 'trompos-pvp' | ..., puntaje: number }
router.post('/api/scores/game', protectRoute, async (req, res) => {
    try {
        const { gameName, puntaje } = req.body;
        const idUser = req.session.user.id;

        await guardarScore(idUser, gameName, puntaje);

        res.json({ success: true, message: 'Puntaje guardado correctamente.' });
    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo guardar el puntaje.';
        console.error(error);
        res.status(400).json({ success: false, message: safeMessage });
    }
});

// Devuelve el mejor puntaje histórico del usuario para un game_name exacto.
// query: ?gameName=pupusa-easy
router.get('/api/scores/game/best', protectRoute, async (req, res) => {
    try {
        const idUser = req.session.user.id;
        const { gameName } = req.query;

        const best = await obtenerMejorScore(idUser, gameName);

        res.json({ success: true, best });
    } catch (error) {
        const safeMessage = error && error.expose === true
            ? error.message
            : 'No se pudo obtener el récord.';
        console.error(error);
        res.status(400).json({ success: false, message: safeMessage });
    }
});

module.exports = router;