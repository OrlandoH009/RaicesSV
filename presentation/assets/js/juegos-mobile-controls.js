/* ============================================================
  Salvadorean Roots — juegos-mobile-controls.js
   Dos ajustes de runtime para la esquina de controles del canvas
   (pausa/pantalla completa/volumen) que no se pueden resolver solo con
   CSS fijo, porque dependen del tamaño real de la tarjeta de
   instrucciones/selección en cada momento: evitar que esa tarjeta quede
   tapada por los controles (ver evitarSolapeConControles, corre siempre,
   escritorio y celular), y reubicar el control de volumen en celular
   según el contexto del juego (descrito abajo).

   El control de volumen (icono + barra, uso normal con el dedo/mouse)
   se reubica según el contexto, en vez de vivir siempre en la esquina
   de canvas-controls.

   En escritorio/con mouse queda tal cual está en el HTML: un control
   más, siempre visible, junto a pausa y pantalla completa (antes se
   escondía detrás de una insignia sobre el botón de pausa y se abría
   como ventana emergente, pero esa ventana se dibujaba más ancha que
   el propio canvas-wrap —que recorta su contenido con overflow:hidden—
   así que la mitad del control quedaba cortado feo contra el borde).

   En celular no se usa ninguna insignia (para que tocar pausa siempre
   pause "normal", sin nada más encima). En su lugar el control de
   volumen se reubica solo, siguiendo el estado del juego:
     - Mientras se ve la pantalla de instrucciones/selección/fin de
       juego: se queda junto a pausa/pantalla completa (igual que en
       escritorio) en vez de flotar centrado sobre la tarjeta — antes
       flotaba a una altura calculada a partir del HUD, pero en tarjetas
       altas (instrucciones largas, selectores) terminaba superpuesto
       encima del propio contenido de la tarjeta en vez de arriba de
       ella. Junto a pausa/pantalla completa nunca se solapa con la
       tarjeta, que siempre queda debajo de esa franja de controles.
     - Mientras el juego está en pausa: vive dentro de la propia
       tarjeta de pausa, junto a "Reanudar"/"Menú".
     - Jugando de verdad (sin overlays): se oculta, para no estorbar.
   ============================================================ */

/* Pausa/pantalla completa/volumen viven fijos en la esquina del canvas
   (position:absolute, por encima de todo con z-index 20) mientras que la
   tarjeta de instrucciones/selección se centra con flexbox dentro de
   .overlay. Cuando la tarjeta es alta (la de instrucciones con el
   diagrama animado, sobre todo) su borde superior termina metiéndose
   debajo de esos controles — no es un problema solo de celular, pasa
   también en escritorio con una ventana angosta. Se corrige en runtime,
   comparando el rectángulo real de ambos: si se solaparían, se saca la
   tarjeta del centrado (align-self: flex-start) y se le pone un
   margin-top exacto para que arranque justo debajo de los controles. */
function evitarSolapeConControles(overlayCard, controls) {
  if (!overlayCard || !controls) return;
  const overlayEl = overlayCard.parentElement;
  if (!overlayEl) return;

  overlayCard.style.alignSelf = '';
  overlayCard.style.marginTop = '';

  const controlsRect = controls.getBoundingClientRect();
  const cardRect = overlayCard.getBoundingClientRect();
  // Si el propio overlay está oculto (display:none) los rects vienen en 0;
  // no hay nada que corregir todavía.
  if (cardRect.width === 0 && cardRect.height === 0) return;

  const gap = 10;
  if (cardRect.top < controlsRect.bottom + gap) {
    const overlayRect = overlayEl.getBoundingClientRect();
    overlayCard.style.alignSelf = 'flex-start';
    overlayCard.style.marginTop = Math.max(0, Math.round(controlsRect.bottom - overlayRect.top + gap)) + 'px';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.canvas-controls').forEach((controls) => {
    const pauseBtn = controls.querySelector('.icon-btn:not(.fullscreen-btn)');
    const volumeGroup = controls.querySelector('.volume-group');
    const slider = volumeGroup?.querySelector('input[type="range"]');
    if (!pauseBtn || !volumeGroup || !slider) return;

    const gameId = pauseBtn.id.replace('pauseBtn-', '');
    const wrap = controls.closest('.canvas-wrap');
    const overlay = document.getElementById(`overlay-${gameId}`);
    const overlayCard = document.getElementById(`overlay-card-${gameId}`);

    // El anti-solape corre siempre (escritorio y celular): las tarjetas de
    // instrucciones/selección cambian de contenido seguido (páginas,
    // dificultad, etc.), así que se re-chequea cada rato en vez de una
    // sola vez. Barato: son 6 juegos como mucho.
    if (overlayCard) {
      setInterval(() => evitarSolapeConControles(overlayCard, controls), 300);
    }

    const esTactil = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

    // ── Escritorio: el control de volumen se deja como está en el HTML,
    // visible siempre dentro de la barra de controles (junto a pausa y
    // pantalla completa), como cualquier otro botón del menú. ──
    if (!esTactil) return;

    // ── Celular: reubicar el control según el contexto del juego ──
    const pauseOverlay = document.getElementById(`pauseOverlay-${gameId}`);
    const pauseCard = pauseOverlay?.querySelector('.overlay-card--pause');
    if (!wrap || !overlay) return;

    const homeParent = controls;
    const homeNextSibling = volumeGroup.nextSibling;

    const isShown = (el) => {
      if (!el || el.classList.contains('hidden')) return false;
      const cs = getComputedStyle(el);
      return cs.display !== 'none' && parseFloat(cs.opacity || '1') > 0.4;
    };

    let currentSpot = 'home-hidden';
    const setSpot = (spot) => {
      if (spot === currentSpot) return;
      currentSpot = spot;
      volumeGroup.classList.remove('volume-inline-pause', 'volume-hidden');
      if (spot === 'pause' && pauseCard) {
        volumeGroup.classList.add('volume-inline-pause');
        pauseCard.appendChild(volumeGroup);
      } else {
        if (spot === 'home-hidden') volumeGroup.classList.add('volume-hidden');
        homeParent.insertBefore(volumeGroup, homeNextSibling);
      }
    };

    const sync = () => {
      if (wrap.classList.contains('is-paused') && isShown(pauseOverlay)) {
        setSpot('pause');
      } else if (isShown(overlay)) {
        // Instrucciones/selección/fin de juego a la vista: se queda
        // visible junto a pausa/pantalla completa (nunca se solapa con
        // la tarjeta, que empieza más abajo).
        setSpot('home-visible');
      } else {
        // Jugando de verdad: se oculta para no restar espacio al HUD.
        setSpot('home-hidden');
      }
    };

    sync();
    // Los overlays de este sitio se muestran/ocultan con animaciones GSAP
    // (opacity/visibility van cambiando de a poco), así que en vez de
    // depender de un único evento puntual, se revisa el estado cada rato:
    // es barato (son 6 juegos como mucho) y cubre cualquier transición.
    setInterval(sync, 250);
  });
});
