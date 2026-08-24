// business/scores.business.js
const db = require('../data/config/database.config');

// mysql2 (modo callback) expone .promise() para poder usar async/await
// sin reescribir el pool existente ni abrir una segunda conexión a MySQL.
const pool = db.promise();

// La tabla scores solo tiene game_name (sin columnas separadas para
// dificultad, modo, o distancia), así que cada actividad combina sus
// propios identificadores en un mismo valor de game_name con guiones:
//   quiz:       "categoria-nivel"        (ej. "historia-facil")
//   pupusa:     "pupusa-dificultad"      (ej. "pupusa-easy")
//   trompos:    "trompos-modo"           (ej. "trompos-pvp")
//   coasters:   "coasters-distancia"     (ej. "coasters-express")
//   encantados: "encantados-duracion"     (ej. "encantados-40s")
//   elotes:     "elotes-dificultad"      (ej. "elotes-hard")
//
// GAME_NAMES_VALIDOS es la lista blanca completa de valores permitidos.
// Se valida contra esta lista (en vez de aceptar cualquier string) para
// que nadie pueda insertar valores arbitrarios en game_name desde el
// cliente. Al agregar un juego o una dificultad nueva, hay que sumar aquí
// sus combinaciones válidas.
const GAME_NAMES_VALIDOS = new Set([
    // Quiz: categoría x nivel
    ...['todas', 'historia', 'gastronomia', 'sitios', 'leyendas'].flatMap((cat) =>
        ['facil', 'medio', 'dificil', 'guanaco'].map((niv) => `${cat}-${niv}`)
    ),
    // Juegos interactivos
    'pupusa-easy', 'pupusa-hard',
    'trompos-pvp', 'trompos-pve',
    'coasters-express', 'coasters-normal', 'coasters-costaacosta',
    // Mica (id interno "encantados") no tiene selector de dificultad, sino
    // de duración de la ronda (20/40/60 segundos) — la lista blanca debe
    // reflejar exactamente lo que manda el cliente en juegos.js.
    'encantados-20s', 'encantados-40s', 'encantados-60s',
    'elotes-easy', 'elotes-hard',
    ...['easy', 'hard'].flatMap((dif) =>
        ['corta', 'media', 'larga'].map((dist) => `torito-${dif}-${dist}`)
    ),
]);

/**
 * Guarda un puntaje de partida terminada para el usuario dado.
 * gameName debe ser uno de los valores de GAME_NAMES_VALIDOS.
 */
async function guardarScore(idUser, gameName, puntaje) {
    if (!idUser) {
        const err = new Error('Usuario no identificado.');
        err.expose = true;
        throw err;
    }
    if (!GAME_NAMES_VALIDOS.has(gameName)) {
        const err = new Error('Juego o dificultad inválidos.');
        err.expose = true;
        throw err;
    }
    if (!Number.isFinite(puntaje) || puntaje < 0) {
        const err = new Error('Puntaje inválido.');
        err.expose = true;
        throw err;
    }

    await pool.query(
        'INSERT INTO scores (id_user, score, game_name, game_date) VALUES (?, ?, ?, NOW())',
        [idUser, puntaje, gameName]
    );
}

/**
 * Devuelve el mejor puntaje histórico del usuario para un game_name exacto
 * (ej. "historia-facil", "pupusa-hard"). El récord solo tiene sentido
 * comparado dentro de la misma combinación de juego + dificultad/modo,
 * ya que el puntaje máximo posible varía mucho entre unas y otras.
 */
async function obtenerMejorScore(idUser, gameName) {
    if (!idUser) {
        const err = new Error('Usuario no identificado.');
        err.expose = true;
        throw err;
    }

    const params = [idUser];
    let sql = 'SELECT score, game_name, game_date FROM scores WHERE id_user = ?';

    if (gameName && GAME_NAMES_VALIDOS.has(gameName)) {
        sql += ' AND game_name = ?';
        params.push(gameName);
    }

    sql += ' ORDER BY score DESC LIMIT 1';

    const [rows] = await pool.query(sql, params);
    return rows[0] || null;
}

// --- Helpers específicos del quiz, para no tener que armar el game_name
// a mano en cada llamada desde quiz.js ---
const CATEGORIAS_VALIDAS = ['todas', 'historia', 'gastronomia', 'sitios', 'leyendas'];
const NIVELES_VALIDOS = ['facil', 'medio', 'dificil', 'guanaco'];

function armarGameNameQuiz(categoria, nivel) {
    return `${categoria}-${nivel}`;
}

async function guardarScoreQuiz(idUser, categoria, nivel, puntaje) {
    if (!CATEGORIAS_VALIDAS.includes(categoria)) {
        const err = new Error('Categoría inválida.');
        err.expose = true;
        throw err;
    }
    if (!NIVELES_VALIDOS.includes(nivel)) {
        const err = new Error('Nivel inválido.');
        err.expose = true;
        throw err;
    }
    return guardarScore(idUser, armarGameNameQuiz(categoria, nivel), puntaje);
}

async function obtenerMejorScoreQuiz(idUser, categoria, nivel) {
    if (!categoria || !nivel) return obtenerMejorScore(idUser, null);
    return obtenerMejorScore(idUser, armarGameNameQuiz(categoria, nivel));
}

module.exports = {
    guardarScore,
    obtenerMejorScore,
    guardarScoreQuiz,
    obtenerMejorScoreQuiz,
    GAME_NAMES_VALIDOS,
    CATEGORIAS_VALIDAS,
    NIVELES_VALIDOS,
};