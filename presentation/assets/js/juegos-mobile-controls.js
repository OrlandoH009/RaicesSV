/* ============================================================
  Salvadorean Roots — juegos-mobile-controls.js
   El control de volumen (icono + barra, uso normal con el dedo/mouse)
   se reubica según el contexto, en vez de vivir siempre en la esquina
   de canvas-controls.

   En escritorio/con mouse se guarda dentro del botón de pausa: una
   insignia de bocina sobre el botón despliega el control como ventana
   emergente.

   En celular no se usa esa insignia (para que tocar pausa siempre
   pause "normal", sin nada más encima). En su lugar el control de
   volumen se reubica solo, siguiendo el estado del juego:
     - Mientras se ve la pantalla de instrucciones/selección/fin de
       juego: flota centrado arriba de esa tarjeta.
     - Mientras el juego está en pausa: vive dentro de la propia
       tarjeta de pausa, junto a "Reanudar"/"Menú".
     - Jugando de verdad (sin overlays): se oculta, para no estorbar.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.canvas-controls').forEach((controls) => {
    const pauseBtn = controls.querySelector('.icon-btn:not(.fullscreen-btn)');
    const volumeGroup = controls.querySelector('.volume-group');
    const slider = volumeGroup?.querySelector('input[type="range"]');
    if (!pauseBtn || !volumeGroup || !slider) return;

    const esTactil = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

    if (!esTactil) {
      // ── Escritorio: insignia sobre el botón de pausa + ventana emergente ──
      volumeGroup.classList.add('volume-popover');

      const badge = document.createElement('span');
      badge.className = 'pause-volume-badge';
      badge.setAttribute('aria-label', 'Volumen de la música');
      badge.setAttribute('role', 'button');
      badge.textContent = '🔊';
      pauseBtn.appendChild(badge);

      const closePopover = () => volumeGroup.classList.remove('is-open');

      badge.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        volumeGroup.classList.toggle('is-open');
      });

      document.addEventListener('click', (e) => {
        if (!volumeGroup.classList.contains('is-open')) return;
        if (volumeGroup.contains(e.target) || badge.contains(e.target)) return;
        closePopover();
      });

      // Al pausar/reanudar desde el propio botón, cerramos el popover
      // para no dejarlo abierto tapando el juego.
      pauseBtn.addEventListener('click', closePopover);
      return;
    }

    // ── Celular: reubicar el control según el contexto del juego ──
    const gameId = pauseBtn.id.replace('pauseBtn-', '');
    const wrap = controls.closest('.canvas-wrap');
    const overlay = document.getElementById(`overlay-${gameId}`);
    const hud = document.getElementById(`hud-${gameId}`);
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

    // El HUD (puntos/vidas/nivel/etc.) vive en la esquina superior y en
    // celular llega a ocupar casi todo el ancho del canvas (ver
    // .hud--overlay en juegos.css). El control flotante usaba un `top`
    // fijo en CSS pensado para cuando no había nada arriba, así que en
    // pantallas angostas terminaba dibujándose encima del HUD en vez de
    // arriba de la tarjeta. Acá se calcula su posición real debajo del
    // HUD (si existe y tiene contenido) en vez de un valor fijo.
    const positionFloating = () => {
      if (!hud || !isShown(hud)) { volumeGroup.style.top = ''; return; }
      const hudRect = hud.getBoundingClientRect();
      const overlayRect = overlay.getBoundingClientRect();
      // Se lo deja siempre debajo del HUD (nunca encima): en pantallas muy
      // bajitas puede terminar pegado al borde superior de la tarjeta de
      // instrucciones, pero eso es preferible a tapar los datos en vivo
      // del HUD (puntos/vidas/tiempo), que es lo que se ve mientras se
      // juega de verdad.
      volumeGroup.style.top = Math.max(0, hudRect.bottom - overlayRect.top + 8) + 'px';
    };

    let currentSpot = 'home';
    const setSpot = (spot) => {
      if (spot === currentSpot) {
        if (spot === 'floating') positionFloating();
        return;
      }
      currentSpot = spot;
      volumeGroup.classList.remove('volume-floating', 'volume-inline-pause', 'volume-hidden');
      volumeGroup.style.top = '';
      if (spot === 'floating') {
        volumeGroup.classList.add('volume-floating');
        overlay.appendChild(volumeGroup);
        positionFloating();
      } else if (spot === 'pause' && pauseCard) {
        volumeGroup.classList.add('volume-inline-pause');
        pauseCard.appendChild(volumeGroup);
      } else {
        volumeGroup.classList.add('volume-hidden');
        homeParent.insertBefore(volumeGroup, homeNextSibling);
      }
    };

    const sync = () => {
      if (wrap.classList.contains('is-paused') && isShown(pauseOverlay)) {
        setSpot('pause');
      } else if (isShown(overlay)) {
        setSpot('floating');
      } else {
        setSpot('home');
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
