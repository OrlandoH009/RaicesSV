/* ============================================================
  Salvadorean Roots — juegos-mobile-controls.js
   En celular, el control de volumen se "guarda" dentro del botón de
   pausa: se agrega una pequeña insignia de bocina sobre el botón y,
   al tocarla, se despliega la barra de volumen como ventana emergente
   en vez de mostrarla siempre junto a los demás controles.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.canvas-controls').forEach((controls) => {
    const pauseBtn = controls.querySelector('.icon-btn:not(.fullscreen-btn)');
    const volumeGroup = controls.querySelector('.volume-group');
    if (!pauseBtn || !volumeGroup) return;

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
  });
});
