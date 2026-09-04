/* ============================================================
  Salvadorean Roots — juegos.js (SÚPER NÍTIDO, 85% ANCHO, DIFICULTAD EXTRA)
   Registro global de estado de juegos + lógica de overlays
   ============================================================ */

/* Registro global de estado de cada juego (usado por el sistema de modales
   y por los atajos de teclado globales para pausar/reanudar/detener) */
(function initGameStateRegistry(){
  window.gameStates = {};
  window.switchGameState = function(gameId, state) {
    window.gameStates[gameId] = state;
  };
})();

/* Detección de dispositivo táctil, compartida por todos los juegos: se usa
   para adaptar controles (p. ej. auto-acelerar en vez de exigir mantener
   una tecla) y para mostrar instrucciones de celular en vez de teclado. */
const esTactilJuegos = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

/* Helper de traducción para los juegos: usa el sistema i18n del sitio si está
   cargado (window.SRi18n), con fallback seguro al texto en español si no lo está. */
function jt(key, fallback) {
  if (window.SRi18n && typeof window.SRi18n.t === 'function') {
    const lang = window.SRi18n.getLang ? window.SRi18n.getLang() : 'es';
    const val = window.SRi18n.t(key, lang);
    return (val && val !== key) ? val : fallback;
  }
  return fallback;
}

/* Joystick virtual compartido: antes varios juegos movían al jugador hacia
   el punto exacto donde tocabas la pantalla (sentía "click a donde quiero
   ir" en vez de un control continuo). Este joystick se ancla donde tocás
   y devuelve un vector normalizado (-1..1 en cada eje) mientras arrastrás,
   igual que el stick analógico de un control — así el jugador no necesita
   ver dónde está su personaje para saber a dónde tocar. */
function createVirtualJoystick(canvas, canvasWrap, options = {}) {
  if (!canvas || !canvasWrap) return { getVector: () => ({ x: 0, y: 0 }), isActive: () => false };

  // Modo "fijo": en vez de aparecer donde tocás, el joystick vive anclado
  // siempre abajo a la izquierda (como el stick de un control físico), así
  // el jugador puede apoyar el pulgar ahí sin tener que mirar la pantalla.
  const fixed = !!options.fixed;

  const base = document.createElement('div');
  base.className = fixed ? 'virtual-joystick virtual-joystick--fixed' : 'virtual-joystick';
  const knob = document.createElement('div');
  knob.className = 'virtual-joystick__knob';
  base.appendChild(knob);
  canvasWrap.appendChild(base);

  const maxRadius = 34;
  // Radio de "agarre": en modo fijo, cualquier toque que empiece dentro de
  // este radio alrededor del centro del joystick lo activa (más grande que
  // el círculo visual para que sea fácil de encontrar con el pulgar sin
  // mirar).
  const catchRadius = 62;
  let dragging = false;
  let originX = 0, originY = 0;
  let vec = { x: 0, y: 0 };
  let activeTouchId = null;

  function setKnob(dx, dy) {
    knob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
  }

  function pointFromEvent(e) {
    if (e.touches && e.touches.length) {
      if (activeTouchId != null) {
        for (let i = 0; i < e.touches.length; i++) {
          if (e.touches[i].identifier === activeTouchId) return e.touches[i];
        }
      }
      return e.touches[0];
    }
    return e;
  }

  function withinFixedZone(clientX, clientY) {
    const r = base.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    const dx = clientX - cx, dy = clientY - cy;
    return Math.sqrt(dx * dx + dy * dy) <= catchRadius;
  }

  function onDown(e) {
    const pt0 = e.changedTouches ? e.changedTouches[0] : (e.touches && e.touches[0]) || e;
    if (fixed && !withinFixedZone(pt0.clientX, pt0.clientY)) return;
    e.preventDefault();
    dragging = true;
    if (e.changedTouches) activeTouchId = e.changedTouches[0].identifier;
    base.classList.add('is-active');
    const r = canvasWrap.getBoundingClientRect();
    if (fixed) {
      const br = base.getBoundingClientRect();
      originX = br.left - r.left + br.width / 2;
      originY = br.top - r.top + br.height / 2;
    } else {
      const pt = pointFromEvent(e);
      originX = pt.clientX - r.left;
      originY = pt.clientY - r.top;
      base.style.left = originX + 'px';
      base.style.top = originY + 'px';
    }
    onMove(e);
  }

  function onMove(e) {
    if (!dragging) return;
    e.preventDefault();
    const pt = pointFromEvent(e);
    const r = canvasWrap.getBoundingClientRect();
    let dx = (pt.clientX - r.left) - originX;
    let dy = (pt.clientY - r.top) - originY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > maxRadius) {
      dx = (dx / dist) * maxRadius;
      dy = (dy / dist) * maxRadius;
    }
    setKnob(dx, dy);
    vec = { x: dx / maxRadius, y: dy / maxRadius };
  }

  function onUp(e) {
    if (dragging && fixed && e && e.changedTouches && activeTouchId != null) {
      const stillTouching = e.touches && Array.from(e.touches).some(t => t.identifier === activeTouchId);
      if (stillTouching) return;
    }
    dragging = false;
    activeTouchId = null;
    base.classList.remove('is-active');
    if (!fixed) {
      base.style.left = '';
      base.style.top = '';
    }
    setKnob(0, 0);
    vec = { x: 0, y: 0 };
  }

  // En modo fijo el joystick tiene su propia zona (abajo-izquierda) y debe
  // seguir recibiendo touchmove/touchend aunque el dedo se arrastre fuera
  // del canvas, así que escuchamos en window en vez de solo en el canvas.
  const moveTarget = fixed ? window : canvas;
  const upTarget = fixed ? window : canvas;
  const downTarget = fixed ? canvasWrap : canvas;

  downTarget.addEventListener('touchstart', onDown, { passive: false });
  moveTarget.addEventListener('touchmove', onMove, { passive: false });
  upTarget.addEventListener('touchend', onUp, { passive: false });
  upTarget.addEventListener('touchcancel', onUp, { passive: false });
  downTarget.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);

  return { getVector: () => vec, isActive: () => dragging, el: base };
}

/* ══════════════════════════════════════════════════════════
   GUARDADO DE PUNTAJES EN LA BASE DE DATOS (tabla scores)
   ══════════════════════════════════════════════════════════ */
async function guardarPuntajeJuego(gameName, puntaje) {
  try {
    const response = await fetch('/api/scores/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gameName, puntaje })
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      console.error('No se pudo guardar el puntaje:', data.message || response.statusText);
    }
  } catch (error) {
    console.error('No se pudo guardar el puntaje:', error);
  }
}

async function obtenerMejorPuntajeJuego(gameName) {
  try {
    const response = await fetch(`/api/scores/game/best?gameName=${encodeURIComponent(gameName)}`);
    if (!response.ok) return null;
    const data = await response.json();
    return data.best || null;
  } catch (error) {
    console.error('No se pudo obtener el récord personal:', error);
    return null;
  }
}

/* En móvil, cuando la barra de direcciones del navegador se
   muestra/oculta (al hacer scroll) o el teclado aparece, el alto visible
   real cambia pero algunos navegadores no disparan un 'resize' normal de
   window de forma confiable. Cada juego ya escucha 'resize' para
   recalcular el tamaño de su canvas, así que reenviamos ese evento
   cuando cambia el viewport visual — sin esto el canvas podía quedar con
   un tamaño o recorte incorrecto al usar el juego en celular/tablet. */
if (window.visualViewport) {
  window.visualViewport.addEventListener('resize', () => {
    window.dispatchEvent(new Event('resize'));
  });
}

/* Reveal on scroll */
(function initReveal(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: .15 });
  items.forEach(el=> io.observe(el));
})();

/* ---------------------------------------------------------
   JUEGO 1: ATRAPA LA PUPUSA (OPTIMIZADO ANTI-BLUR)
--------------------------------------------------------- */
(function initGamePupusa(){
  const canvas = document.getElementById('canvas-pupusa');
  if(!canvas || typeof Matter === 'undefined') return;

  const canvasWrap = canvas.closest('.canvas-wrap');

  // Antes, al entrar en pantalla completa se reusaba la resolución chica de
  // la ventana normal y el navegador solo la estiraba (se veía borrosa/pixelada).
  // Ahora medimos siempre el tamaño real del canvas, así que en fullscreen el
  // juego dibuja a la resolución completa de la pantalla.
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  document.addEventListener('fullscreenchange', () => setTimeout(resizeCanvas, 100));
  document.addEventListener('webkitfullscreenchange', () => setTimeout(resizeCanvas, 100));

  const fsBtnPupusa = canvasWrap?.querySelector('.fullscreen-btn');
  if (fsBtnPupusa) {
    fsBtnPupusa.addEventListener('click', () => {
      const isCurrent = document.fullscreenElement === canvasWrap || document.webkitFullscreenElement === canvasWrap;
      if (!isCurrent) {
        const req = canvasWrap.requestFullscreen || canvasWrap.webkitRequestFullscreen || canvasWrap.msRequestFullscreen;
        req?.call(canvasWrap);
      } else {
        const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
        exit?.call(document);
      }
    });
  }

  const { Engine, World, Bodies, Body, Events } = Matter;
  const ctx = canvas.getContext('2d');

  const hud = document.getElementById('hud-pupusa');
  const overlay = document.getElementById('overlay-pupusa');
  const overlayCard = document.getElementById('overlay-card-pupusa');
  const gameContent = document.getElementById('modal-pupusa');

  let gameDifficulty = null;
  let gameConfig = {
    easy: { gravity: 0.6, spawnIntervalMin: 1200, spawnIntervalMax: 2000, timeLimit: 30, initialLives: 4 },
    hard: { gravity: 0.9, spawnIntervalMin: 700, spawnIntervalMax: 1300, timeLimit: 30, initialLives: 3 }
  };

  function showOverlay(html){
    overlayCard.innerHTML = html;
    overlay.classList.remove('hidden');
    overlay.style.backdropFilter = 'none';
    overlay.style.webkitBackdropFilter = 'none';

    if(window.gsap){
      gsap.fromTo(overlayCard,
        { autoAlpha: 0, y: 18, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.5)' }
      );
      gsap.fromTo(overlay,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: 'power1.out' }
      );
    }
  }
  function hideOverlay(){
    if(window.gsap){
      overlay.style.pointerEvents = 'none';
      gsap.to(overlayCard, { autoAlpha: 0, y: -12, scale: 0.97, duration: 0.25, ease: 'power1.in' });
      gsap.to(overlay, { autoAlpha: 0, duration: 0.25, ease: 'power1.in', onComplete: () => { overlay.classList.add('hidden'); overlay.style.pointerEvents = ''; } });
    } else {
      overlay.classList.add('hidden');
    }
  }
  function clearCanvas(){ ctx.clearRect(0, 0, canvas.width, canvas.height); }
  
  function drawEmoji(emoji, x, y, size, angle){
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(angle||0);
    ctx.font = size+'px sans-serif';
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    ctx.fillText(emoji,0,0);
    ctx.restore();
  }

  let rafId = null;
  let totalLives = 3;
  let isGameVisible = true;
  let tutorialMode = false;

  hud.innerHTML = `
    <div class="hud-item">
      <span>${jt('jue.hud.points', 'Puntos')}</span>
      <b id="p-score">0</b>
    </div>
    <div class="hud-item lives">
      <span>${jt('jue.hud.lives', 'Vidas')}</span>
      <b id="p-lives">${renderLives(3)}</b>
    </div>
    <div class="hud-item">
      <span>${jt('jue.hud.level', 'Nivel')}</span>
      <b id="p-level">-</b>
    </div>
    <div class="hud-item">
      <span>${jt('jue.hud.time', 'Tiempo')}</span>
      <b id="p-time">30</b>
    </div>`;

  function renderLives(count){
    if(tutorialMode) return `<span class="heart">❤️♾️</span>`;
    const hearts = [];
    for(let i = 0; i < totalLives; i++){
      const active = i < count;
      hearts.push(`<span class="heart${active ? '' : ' broken'}">${active ? '❤️' : '💔'}</span>`);
    }
    return hearts.join('');
  }

  function updateHud(){
    const scoreEl = document.getElementById('p-score');
    const livesEl = document.getElementById('p-lives');
    const timeEl = document.getElementById('p-time');
    const levelEl = document.getElementById('p-level');
    if(scoreEl) scoreEl.textContent = score;
    if(livesEl) livesEl.innerHTML = renderLives(lives);
    if(timeEl) timeEl.textContent = tutorialMode ? '∞' : Math.max(0, timeLeft);
    if(levelEl) levelEl.textContent = gameDifficulty === 'easy' ? jt('jue.diff.easy', '🟢 Fácil') : jt('jue.diff.hard', '🔴 Difícil');
  }

  const engine = Engine.create();
  engine.gravity.y = 0.6;
  const world = engine.world;

  const paddleY = canvas.height - 60;
  const COMAL_HALF_WIDTH = 55; // ancho visual/físico del comal (antes 75, radio de la elipse dibujada)
  const paddle = Bodies.rectangle(canvas.width/2, paddleY, COMAL_HALF_WIDTH*2, 18, { isStatic:true, label:'comal' });
  World.add(world, paddle);

  let mouseX = canvas.width/2;
  canvas.addEventListener('mousemove', e=>{
    const r = canvas.getBoundingClientRect();
    mouseX = (e.clientX - r.left) * (canvas.width/r.width);
    notifyTutorial('move');
  });
  canvas.addEventListener('touchmove', e=>{
    const r = canvas.getBoundingClientRect();
    mouseX = (e.touches[0].clientX - r.left) * (canvas.width/r.width);
    e.preventDefault();
    notifyTutorial('move');
  }, {passive:false});

  const GOOD = [
    {emoji:'🫓', pts:10},
    {emoji:'🧀', pts:11},
    {emoji:'🌽', pts:9}
  ];
  const BAD = [
    {emoji:'🩴', pts:-1},
    {emoji:'🪨', pts:-1},
    {emoji:'🦴', pts:-1}
  ];

  /* ── Bolsa de aparición con proporción fija ──
     Antes cada objeto era bueno/malo con Math.random() < 0.32 de forma
     independiente: en muestras cortas eso a veces tiraba rachas de puros
     objetos malos (o puros buenos) porque la probabilidad no garantiza
     nada sobre la cantidad real. Con una "bolsa" que siempre contiene la
     misma proporción (barajada) y se recarga al vaciarse, la cantidad de
     buenos vs. malos es consistente partida tras partida. */
  const SPAWN_BAG_SIZE = 25;
  const SPAWN_BAG_BAD_COUNT = 8; // 8 de 25 ≈ 32% malos, igual que antes pero fijo
  let spawnBag = [];
  function refillSpawnBag(){
    spawnBag = [];
    for(let i=0;i<SPAWN_BAG_SIZE;i++) spawnBag.push(i < SPAWN_BAG_BAD_COUNT ? 'bad' : 'good');
    for(let i=spawnBag.length-1;i>0;i--){
      const j = Math.floor(Math.random()*(i+1));
      [spawnBag[i], spawnBag[j]] = [spawnBag[j], spawnBag[i]];
    }
  }
  function nextSpawnType(){
    if(spawnBag.length===0) refillSpawnBag();
    return spawnBag.pop();
  }

  let score = 0, lives = 3, timeLeft = 30, running = false, paused = false;
  let lastTime = null, lastDelta = 1000/60, spawnAccum = 0, clockAccum = 0, nextSpawnIn = randomSpawnInterval();

  function randomSpawnInterval(){
    if(!gameDifficulty) return 1500;
    const config = gameConfig[gameDifficulty];
    return config.spawnIntervalMin + Math.random() * (config.spawnIntervalMax - config.spawnIntervalMin);
  }

  // ================= MODO TUTORIAL =================
  let tutorialStep = -1;
  let tutorialWaiting = false;
  const tutorialSteps = [
    { action: 'move', text: () => esTactilJuegos
        ? jt('jue.tutorial.pupusa.move.tap', 'Deslizá el dedo sobre la calle para mover el comal. ¡Probalo!')
        : jt('jue.tutorial.pupusa.move.key', 'Mové el mouse de un lado a otro para mover el comal. ¡Probalo!') },
    { action: 'catch', text: () => jt('jue.tutorial.pupusa.catch', 'Ahora atrapá la pupusa que va a caer, poniendo el comal justo debajo.') }
  ];

  function tutorialBubble(html) {
    let el = canvasWrap?.querySelector('.tutorial-bubble');
    if (!el && canvasWrap) {
      el = document.createElement('div');
      el.className = 'tutorial-bubble';
      canvasWrap.appendChild(el);
    }
    if (el) el.innerHTML = html;
  }
  function hideTutorialBubble() { canvasWrap?.querySelector('.tutorial-bubble')?.remove(); }

  function showTutorialStep(i) {
    tutorialStep = i;
    if (i >= tutorialSteps.length) { finishTutorial(); return; }
    tutorialWaiting = true;
    const n = i + 1, total = tutorialSteps.length;
    tutorialBubble(`
      <span class="tutorial-bubble__tag">🎓 ${jt('jue.tutorial.tag', 'Tutorial')} ${n}/${total}</span>
      <p>${tutorialSteps[i].text()}<span class="tutorial-pulse"></span></p>
    `);
    if (tutorialSteps[i].action === 'catch') {
      const body = Bodies.circle(canvas.width / 2, -20, 18, {
        restitution: 0.1, friction: 0.6, frictionAir: 0.01, label: 'good'
      });
      body.foodEmoji = '🫓';
      body.points = 10;
      World.add(world, body);
    }
  }

  function notifyTutorial(action) {
    if (!tutorialMode || !tutorialWaiting) return;
    if (tutorialSteps[tutorialStep].action !== action) return;
    tutorialWaiting = false;
    tutorialBubble(`<span class="tutorial-bubble__tag good">✅ ${jt('jue.tutorial.good', '¡Bien hecho!')}</span>`);
    setTimeout(() => { if (tutorialMode) showTutorialStep(tutorialStep + 1); }, 1000);
  }

  function finishTutorial() {
    tutorialMode = false;
    hideTutorialBubble();
    running = false;
    cancelAnimationFrame(rafId);
    showOverlay(`
      <span class="overlay-tag">🎉 ${jt('jue.tutorial.doneTag', 'Tutorial completo')}</span>
      <h3>${jt('jue.tutorial.doneTitle', '¡Ya sabés atrapar pupusas!')}</h3>
      <p>${jt('jue.tutorial.doneText', 'Ahora vamos a la partida de verdad: elegí la dificultad.')}</p>
      <button class="btn-primary" id="btn-tutorial-done-pupusa">🫓 ${jt('jue.tutorial.playReal', 'Jugar de verdad')}</button>
    `);
    document.getElementById('btn-tutorial-done-pupusa').onclick = showDifficultySelector;
  }

  function startTutorial() {
    gameDifficulty = 'easy';
    totalLives = 999;
    engine.gravity.y = gameConfig.easy.gravity * 0.6;
    start();
    tutorialMode = true;
    timeLeft = 999;
    showTutorialStep(0);
  }

  const bgMusic = document.getElementById('bgMusic-pupusa');
  const volumeSlider = document.getElementById('volumeSlider-pupusa');
  const volumeIcon = document.getElementById('volumeIcon-pupusa');
  const damageOverlay = document.getElementById('damageOverlay-pupusa');
  let volume = Number(volumeSlider?.value || 0.25);
  let savedVolume = volume;

  function updateVolumeIcon(value){
    if(!volumeIcon) return;
    volumeIcon.textContent = value <= 0 ? '🔇' : value < 0.35 ? '🔉' : '🔊';
  }

  if(bgMusic){
    bgMusic.volume = volume;
    bgMusic.muted = false;
  }
  updateVolumeIcon(volume);

  volumeSlider?.addEventListener('input', (event)=>{
    const value = Number(event.target.value);
    volume = value;
    if(bgMusic){
      bgMusic.volume = value;
      bgMusic.muted = value <= 0;
    }
    updateVolumeIcon(value);
  });

  function playMusic(){
    if(!bgMusic) return;
    bgMusic.muted = false;
    bgMusic.volume = volume;
    bgMusic.play().catch(()=>{});
  }

  function stopMusic(){
    if(!bgMusic) return;
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }

  function flashDamage(){
    if(!damageOverlay) return;
    if(window.gsap){
      gsap.fromTo(damageOverlay,
        { opacity: 0.5 },
        { opacity: 0, duration: 0.45, ease: 'power1.out' }
      );
    }
  }

  const pauseBtn = document.getElementById('pauseBtn-pupusa');
  const pauseIcon = document.getElementById('pauseIcon-pupusa');
  const pauseOverlay = document.getElementById('pauseOverlay-pupusa');
  const resumeBtn = document.getElementById('resumeBtn-pupusa');
  const menuBtn = document.getElementById('menuBtn-pupusa');

  function pauseGame(){
    if(!running) return;
    running = false;
    paused = true;
    cancelAnimationFrame(rafId);
    if (bgMusic) {
      savedVolume = bgMusic.volume;
      bgMusic.volume = 0.1;
    }
    canvasWrap?.classList.add('is-paused');
    pauseOverlay?.classList.remove('hidden');
    if(pauseIcon) pauseIcon.textContent = '▶️';
    if (tutorialMode) hideTutorialBubble();
  }

  function resumeGame(){
    if(!paused) return;
    paused = false;
    running = true;
    lastTime = null;
    lastDelta = 1000/60;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    if (bgMusic) {
      bgMusic.volume = savedVolume || volume;
      if (volume > 0) bgMusic.play().catch(()=>{});
    }
    if (tutorialMode && tutorialStep >= 0) showTutorialStep(tutorialStep);
    rafId = requestAnimationFrame(step);
  }

  function returnToMenu(){
    running = false;
    paused = false;
    tutorialMode = false;
    hideTutorialBubble();
    cancelAnimationFrame(rafId);
    // stopMusic();  // ELIMINADO para que la música no se detenga
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    for(const b of [...world.bodies]) if(b.label==='good'||b.label==='bad') World.remove(world,b);
    showDifficultySelector();
  }

  pauseBtn?.addEventListener('click', ()=>{
    if(!running && !paused) return;
    if(paused) resumeGame();
    else pauseGame();
  });
  resumeBtn?.addEventListener('click', resumeGame);
  menuBtn?.addEventListener('click', returnToMenu);

  function spawn(){
    const isBad = nextSpawnType() === 'bad';
    const set = isBad ? BAD : GOOD;
    const item = set[Math.floor(Math.random()*set.length)];
    const x = 40 + Math.random()*(canvas.width-80);
    const body = Bodies.circle(x, -20, 18, {
      restitution:0.1, friction:0.6, frictionAir: 0.01, label: isBad ? 'bad' : 'good'
    });
    body.foodEmoji = item.emoji;
    body.points = item.pts;
    Body.setAngularVelocity(body, (Math.random()-0.5)*0.1);
    World.add(world, body);
  }

  Events.on(engine, 'collisionStart', (evt)=>{
    for(const pair of evt.pairs){
      const bodies = [pair.bodyA, pair.bodyB];
      const paddleHit = bodies.find(b=>b.label==='comal');
      const item = bodies.find(b=>b.label==='good'||b.label==='bad');
      if(paddleHit && item && !item.caught){
        item.caught = true;
        score += item.points;
        if(item.points < 0 && !tutorialMode){
          lives -= 1;
          updateHud();
          flashDamage();
        }
        if(item.label === 'good') notifyTutorial('catch');
        World.remove(world, item);
      }
    }
  });

  function step(timestamp){
    if(!running || !isGameVisible) return;
    if(lastTime === null) lastTime = timestamp;
    // dt para la física: recortado a 100ms para que un frame lento no haga
    // "saltar" a los objetos ni desestabilice la simulación.
    const dt = Math.min(Math.max(timestamp - lastTime, 1), 100);
    // dtReloj: el tiempo real transcurrido, sin ese recorte (solo protegido
    // contra saltos absurdos si la pestaña estuvo en segundo plano). Si el
    // reloj usara el mismo dt recortado que la física, cada frame lento
    // "perdería" tiempo real sin descontarlo del cronómetro, y la ronda
    // terminaría durando más de los segundos configurados. Con esto el
    // cronómetro siempre cumple el 100% del tiempo predispuesto, ni más
    // ni menos, sin importar caídas de framerate.
    const dtReloj = Math.min(Math.max(timestamp - lastTime, 0), 2000);
    lastTime = timestamp;

    const correction = dt / lastDelta;
    Engine.update(engine, dt, correction);
    lastDelta = dt;

    for(const b of [...world.bodies]){
      if(b.label==='good' || b.label==='bad'){
        if(b.position.y > canvas.height+40){
          World.remove(world, b);
          if(b.label==='good' && !tutorialMode){
            lives -= 1;
            updateHud();
            flashDamage();
          }
        }
      }
    }

    spawnAccum += dt;
    if(spawnAccum >= nextSpawnIn){
      spawnAccum = 0;
      nextSpawnIn = randomSpawnInterval();
      if (!(tutorialMode && tutorialWaiting)) spawn();
    }

    clockAccum += dtReloj;
    while(!tutorialMode && clockAccum >= 1000 && timeLeft > 0){
      clockAccum -= 1000;
      timeLeft -= 1;
    }
    document.getElementById('p-time').textContent = Math.max(0, timeLeft);

    Body.setPosition(paddle, { x: Math.max(COMAL_HALF_WIDTH, Math.min(canvas.width-COMAL_HALF_WIDTH, mouseX)), y: canvas.height-60 });
    updateHud();

    if(lives <= 0 || timeLeft <= 0){
      running = false;
      endGame();
      return;
    }

    clearCanvas();
    ctx.fillStyle = '#5a4634';
    ctx.fillRect(0, canvas.height-20, canvas.width, 20);
    for(const b of world.bodies){
      if(b.label==='comal'){
        drawComal(b.position.x, b.position.y);
      } else {
        drawEmoji(b.foodEmoji, b.position.x, b.position.y, 25, b.angle);
      }
    }
    rafId = requestAnimationFrame(step);
  }

  // Comal de barro tradicional: elipse con degradado (más clara al centro,
  // oscura hacia el borde, como el barro cocido), un aro de reflejo tenue
  // y tres "piedras de fogón" debajo que lo sostienen sobre el fuego.
  function drawComal(x, y){
    ctx.save();
    ctx.translate(x, y);

    // Piedras del fogón
    ctx.fillStyle = '#4a4238';
    [[-38, 10], [0, 14], [38, 10]].forEach(([dx, dy]) => {
      ctx.beginPath();
      ctx.ellipse(dx, dy, 9, 6, 0, 0, Math.PI*2);
      ctx.fill();
    });

    // Cuerpo del comal con degradado radial (simula el barro cocido)
    const grad = ctx.createRadialGradient(-14, -5, 4, 0, 0, 58);
    grad.addColorStop(0, '#6b5643');
    grad.addColorStop(0.55, '#4a3b2d');
    grad.addColorStop(1, '#2c231a');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(0, 0, COMAL_HALF_WIDTH, 9, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = '#1b140d';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Reflejo/brillo tenue de uso (superficie curtida por el fuego)
    ctx.strokeStyle = 'rgba(255,214,158,.35)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.ellipse(0, -1, COMAL_HALF_WIDTH-6, 5, 0, Math.PI*1.1, Math.PI*1.9);
    ctx.stroke();

    ctx.restore();
  }

  function endGame(){
    paused = false;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    
    let text = score >= 120 ? jt('jue.card1.end.high', '🏆 ¡Sos toda una maestra pupusera de El Salvador!') :
               score >= 60 ? jt('jue.card1.end.mid', '🌟 Excelente, ya casi cocinás como las expertas de Olocuilta.') :
               jt('jue.card1.end.low', '👍 Buen intento, ¡seguí practicando para no quemar las pupusas!');
    
    const difficultyLabel = gameDifficulty === 'easy' ? jt('jue.diff.easyTag', '🟢 Nivel Fácil') : jt('jue.diff.hardTag', '🔴 Nivel Difícil');
    const gameName = `pupusa-${gameDifficulty}`;

    showOverlay(`
      <span class="overlay-tag">${difficultyLabel}</span>
      <h3>${jt('jue.end.title', '¡Fin del juego!')}</h3>
      <div class="overlay-score">${score} pts</div>
      <p>${text}</p>
      <p class="overlay-best-score" id="p-best-score"></p>
      <button class="btn-primary" id="p-restart">${jt('jue.end.playAgain', 'Jugar de nuevo')}</button>`);
    document.getElementById('p-restart').onclick = showDifficultySelector;

    guardarPuntajeJuego(gameName, score).then(() => {
      obtenerMejorPuntajeJuego(gameName).then((best) => {
        const el = document.getElementById('p-best-score');
        if (el && best) el.textContent = `${jt('jue.bestScore', 'Tu récord en este nivel')}: ${best.score} pts`;
      });
    });
  }

  function start(){
    resizeCanvas();
    for(const b of [...world.bodies]) if(b.label==='good'||b.label==='bad') World.remove(world,b);
    score=0; lives=totalLives; timeLeft=gameConfig[gameDifficulty].timeLimit; running=true; paused=false;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    lastTime = null; lastDelta = 1000/60; spawnAccum = 0; clockAccum = 0; nextSpawnIn = randomSpawnInterval();
    refillSpawnBag();
    updateHud();
    hideOverlay();
    cancelAnimationFrame(rafId);
    playMusic();
    
    rafId = requestAnimationFrame(step);
  }

  function showDifficultySelector(){
    showOverlay(`
      <span class="overlay-tag">${jt('jue.diff.chooseTag', 'Elegí tu dificultad')}</span>
      <h3>${jt('jue.card1.diff.title', '🎮 Selecciona Nivel')}</h3>
      <p>${jt('jue.card1.diff.sub', 'Elegí qué tan rápido caen las pupusas y los demás ingredientes.')}</p>
      <div class="difficulty-buttons">
        <button class="difficulty-btn easy" id="btn-easy">
          ${jt('jue.diff.easy', '🟢 Fácil')}
          <div class="difficulty-desc">${jt('jue.card1.diff.easyDesc', 'Caída lenta, ritmo tranquilo')}</div>
        </button>
        <button class="difficulty-btn hard" id="btn-hard">
          ${jt('jue.diff.hard', '🔴 Difícil')}
          <div class="difficulty-desc">${jt('jue.card1.diff.hardDesc', 'Caída más rápida y seguida')}</div>
        </button>
      </div>
      <button class="btn-tutorial" id="btn-tutorial-pupusa">🎓 ${jt('jue.tutorial.start', 'Tutorial (practicar primero)')}</button>`);

    document.getElementById('btn-tutorial-pupusa').onclick = startTutorial;
    document.getElementById('btn-easy').onclick = ()=>{
      gameDifficulty = 'easy';
      totalLives = gameConfig.easy.initialLives;
      engine.gravity.y = gameConfig.easy.gravity;
      setTimeout(()=>{ start(); }, 100);
    };
    
    document.getElementById('btn-hard').onclick = ()=>{
      gameDifficulty = 'hard';
      totalLives = gameConfig.hard.initialLives;
      engine.gravity.y = gameConfig.hard.gravity;
      setTimeout(()=>{ start(); }, 100);
    };
  }

  showOverlay(`
    <span class="overlay-tag">${jt('jue.card1.tagModal', 'Ruta 01')}</span>
    <h3>🫓 ${jt('jue.card1.title', 'Atrapa la Pupusa')}</h3>
    <p>${jt('jue.card1.intro', 'Mové el comal de un lado a otro con el mouse (o el dedo) para atrapar lo que cae del cielo.')}</p>
    <p class="rules-title">${jt('jue.rules.title', 'Reglas del juego')}</p>
    <ul class="rules-list">
      <li class="rule-good"><span class="rule-icon">✅</span> ${jt('jue.card1.ruleGood', 'Atrapá <strong>🫓 pupusas</strong>, <strong>🧀 quesillo</strong> y <strong>🌽 elotes</strong> — suman puntos.')}</li>
      <li class="rule-bad"><span class="rule-icon">❌</span> ${jt('jue.card1.ruleBad', 'Evitá <strong>🩴 chanclas</strong>, <strong>🪨 piedras</strong> y <strong>🦴 huesos</strong> — te quitan una vida.')}</li>
    </ul>
    <button class="btn-primary" id="p-start">${jt('jue.continue', 'Continuar')}</button>`);
  
  document.getElementById('p-start').onclick = showDifficultySelector;

  clearCanvas();
  ctx.fillStyle = '#5a4634';
  ctx.fillRect(0, canvas.height-20, canvas.width, 20);

  gameContent?.addEventListener('gameVisible', (e) => {
    if(e.detail.gameId === 'pupusa') {
      isGameVisible = true;
      resizeCanvas();
      playMusic();
      if(paused && running) {
        resumeGame();
      } else if(running) {
        rafId = requestAnimationFrame(step);
      }
    }
  });

  const observer = new MutationObserver(() => {
    isGameVisible = gameContent?.classList.contains('active') || false;
    if(isGameVisible) resizeCanvas();
  });

  if(gameContent) {
    observer.observe(gameContent, { attributes: true, attributeFilter: ['class'] });
  }

  window.switchGameState('pupusa', {
    pause: pauseGame,
    resume: resumeGame,
    stop: stopMusic,
    running: () => running,
    paused: () => paused,
    setVisible: (visible) => { isGameVisible = visible; },
    reloadMenu: showDifficultySelector
  });
})();

/* ---------------------------------------------------------
   JUEGO 2: BATALLA DE TROMPOS (SELECCIÓN DE RONDAS Y BALANCES)
   - Tamaño reducido (radio 24)
   - Velocidades reducidas (jugador 4, IA 0.9/1.6/2.6)
   - Pausa solo baja el volumen (no detiene la música)
--------------------------------------------------------- */

(function initGameTrompos(){
  const canvas = document.getElementById('canvas-trompos');
  if(!canvas || typeof Matter === 'undefined') return;

  const canvasWrap = canvas.closest('.canvas-wrap');

  // Antes, al entrar en pantalla completa se reusaba la resolución chica de
  // la ventana normal y el navegador solo la estiraba (se veía borrosa/pixelada).
  // Ahora medimos siempre el tamaño real del canvas; como cambiar el tamaño
  // implica reconstruir las paredes de la arena, eso se hace en el listener
  // de fullscreenchange con setupWalls().
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  document.addEventListener('fullscreenchange', () => setTimeout(() => { resizeCanvas(); setupWalls(); }, 100));
  document.addEventListener('webkitfullscreenchange', () => setTimeout(() => { resizeCanvas(); setupWalls(); }, 100));

  const fsBtnTrompos = canvasWrap?.querySelector('.fullscreen-btn');
  if (fsBtnTrompos) {
    fsBtnTrompos.addEventListener('click', () => {
      const isCurrent = document.fullscreenElement === canvasWrap || document.webkitFullscreenElement === canvasWrap;
      if (!isCurrent) {
        const req = canvasWrap.requestFullscreen || canvasWrap.webkitRequestFullscreen || canvasWrap.msRequestFullscreen;
        req?.call(canvasWrap);
      } else {
        const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
        exit?.call(document);
      }
    });
  }

  const { Engine, World, Bodies, Body, Events } = Matter;
  const ctx = canvas.getContext('2d');

  const hud = document.getElementById('hud-trompos');
  const overlay = document.getElementById('overlay-trompos');
  const overlayCard = document.getElementById('overlay-card-trompos');
  const gameContent = document.getElementById('modal-trompos');

  let gameMode = null;
  let npcDifficulty = null;
  let isGameVisible = true;
  
  let maxRounds = 3;
  let currentRound = 1;
  let playerWins = 0;
  let rivalWins = 0;

  let gameConfig = {
    npc: {
      easy: { speed: 0.9, precision: 0.15, reaction: 850, moveChance: 0.3 },
      medium: { speed: 1.6, precision: 0.35, reaction: 550, moveChance: 0.5 },
      hard: { speed: 2.6, precision: 0.6, reaction: 350, moveChance: 0.75 }
    }
  };

  // ================= MODO TUTORIAL =================
  let tutorialMode = false;
  let tutorialStep = -1;
  let tutorialWaiting = false;
  const tutorialSteps = [
    { action: 'move', text: () => esTactilJuegos
        ? jt('jue.tutorial.trompos.move.tap', 'Arrastrá el dedo por la calle para mover tu trompo. ¡Probalo!')
        : jt('jue.tutorial.trompos.move.key', 'Usá WASD para mover tu trompo. ¡Probalo!') },
    { action: 'hit', text: () => jt('jue.tutorial.trompos.hit', 'El rival está quieto. Empujá tu trompo contra el suyo para golpearlo.') }
  ];

  function tutorialBubble(html) {
    let el = canvasWrap?.querySelector('.tutorial-bubble');
    if (!el && canvasWrap) {
      el = document.createElement('div');
      el.className = 'tutorial-bubble';
      canvasWrap.appendChild(el);
    }
    if (el) el.innerHTML = html;
  }
  function hideTutorialBubble() { canvasWrap?.querySelector('.tutorial-bubble')?.remove(); }

  function showTutorialStep(i) {
    tutorialStep = i;
    if (i >= tutorialSteps.length) { finishTutorial(); return; }
    tutorialWaiting = true;
    const n = i + 1, total = tutorialSteps.length;
    tutorialBubble(`
      <span class="tutorial-bubble__tag">🎓 ${jt('jue.tutorial.tag', 'Tutorial')} ${n}/${total}</span>
      <p>${tutorialSteps[i].text()}<span class="tutorial-pulse"></span></p>
    `);
  }

  function notifyTutorial(action) {
    if (!tutorialMode || !tutorialWaiting) return;
    if (tutorialSteps[tutorialStep].action !== action) return;
    tutorialWaiting = false;
    tutorialBubble(`<span class="tutorial-bubble__tag good">✅ ${jt('jue.tutorial.good', '¡Bien hecho!')}</span>`);
    setTimeout(() => { if (tutorialMode) showTutorialStep(tutorialStep + 1); }, 1000);
  }

  function finishTutorial() {
    tutorialMode = false;
    hideTutorialBubble();
    running = false;
    cancelAnimationFrame(rafId);
    showOverlay(`
      <span class="overlay-tag">🎉 ${jt('jue.tutorial.doneTag', 'Tutorial completo')}</span>
      <h3>${jt('jue.tutorial.doneTitle', '¡Ya sabés pelear con el trompo!')}</h3>
      <p>${jt('jue.tutorial.doneText', 'Ahora vamos a la batalla de verdad: elegí el modo de juego.')}</p>
      <button class="btn-primary" id="btn-tutorial-done-trompos">⚡ ${jt('jue.tutorial.playReal', 'Jugar de verdad')}</button>
    `);
    document.getElementById('btn-tutorial-done-trompos').onclick = showModeSelector;
  }

  function startTutorial() {
    gameMode = 'pve';
    npcDifficulty = 'easy';
    maxRounds = 1;
    currentRound = 1;
    playerWins = 0;
    rivalWins = 0;
    start();
    tutorialMode = true;
    showTutorialStep(0);
  }

  function showOverlay(html){
    overlayCard.innerHTML = html;
    overlay.classList.remove('hidden');
    overlay.style.backdropFilter = 'none';
    overlay.style.webkitBackdropFilter = 'none';

    if(window.gsap){
      gsap.fromTo(overlayCard,
        { autoAlpha: 0, y: 18, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.5)' }
      );
      gsap.fromTo(overlay,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: 'power1.out' }
      );
    }
  }
  function hideOverlay(){
    if(window.gsap){
      overlay.style.pointerEvents = 'none';
      gsap.to(overlayCard, { autoAlpha: 0, y: -12, scale: 0.97, duration: 0.25, ease: 'power1.in' });
      gsap.to(overlay, { autoAlpha: 0, duration: 0.25, ease: 'power1.in', onComplete: () => { overlay.classList.add('hidden'); overlay.style.pointerEvents = ''; } });
    } else {
      overlay.classList.add('hidden');
    }
  }
  function clearCanvas(){ ctx.clearRect(0, 0, canvas.width, canvas.height); }

  let rafId = null;

  hud.innerHTML = `
    <div class="hud-item player1">
      <span>${jt('jue.card2.player1', '🟢 Jugador 1')}</span>
      <b id="p1-energy">100%</b>
    </div>
    <div class="hud-item player2">
      <span id="p2-label">${jt('jue.card2.player2', '🔴 Jugador 2')}</span>
      <b id="p2-energy">100%</b>
    </div>
    <div class="hud-item">
      <span>${jt('jue.hud.round', 'Ronda')}</span>
      <b id="round-val">1/3</b>
    </div>`;

  function updateHud(){
    const p1El = document.getElementById('p1-energy');
    const p2El = document.getElementById('p2-energy');
    const roundEl = document.getElementById('round-val');
    if(p1El) p1El.textContent = Math.max(0, Math.round(top.energy)) + '%';
    if(p2El) p2El.textContent = Math.max(0, Math.round(bottom.energy)) + '%';
    if(roundEl) roundEl.textContent = `${currentRound}/${maxRounds} (${jt('jue.card2.p1Short', 'J1')}: ${playerWins} - ${jt('jue.card2.rivalShort', 'Riv')}: ${rivalWins})`;
  }

  function triggerHudDamageFlash(playerKey) {
    const elId = playerKey === 'top' ? 'p1-energy' : 'p2-energy';
    const element = document.getElementById(elId);
    if (element) {
      element.classList.remove('damage-flash');
      void element.offsetWidth;
      element.classList.add('damage-flash');
      setTimeout(() => element.classList.remove('damage-flash'), 500);
    }
  }

  const engine = Engine.create();
  engine.gravity.y = 0;
  engine.enableSleeping = false;
  const world = engine.world;

  let walls = [];
  function setupWalls() {
    if(walls.length) World.remove(world, walls);
    const wallThickness = 40;
    
    const mapWidth = canvas.width * 0.85;
    const mapHeight = canvas.height * 0.85;
    const offsetX = (canvas.width - mapWidth) / 2;
    const offsetY = (canvas.height - mapHeight) / 2;

    walls = [
      Bodies.rectangle(canvas.width/2, offsetY - wallThickness/2, mapWidth + 100, wallThickness, { isStatic: true, label: 'wall' }),
      Bodies.rectangle(canvas.width/2, canvas.height - offsetY + wallThickness/2, mapWidth + 100, wallThickness, { isStatic: true, label: 'wall' }),
      Bodies.rectangle(offsetX - wallThickness/2, canvas.height/2, wallThickness, mapHeight, { isStatic: true, label: 'wall' }),
      Bodies.rectangle(canvas.width - offsetX + wallThickness/2, canvas.height/2, wallThickness, mapHeight, { isStatic: true, label: 'wall' })
    ];
    World.add(world, walls);
  }

  const top = {
    body: Bodies.circle(canvas.width/2, 140, 24, { restitution: 0.85, friction: 0.02, frictionAir: 0.008, label: 'trompo1' }),
    energy: 100,
    maxEnergy: 100,
    angle: 0,
    color: '#D4A373'
  };

  const bottom = {
    body: Bodies.circle(canvas.width/2, canvas.height - 140, 24, { restitution: 0.85, friction: 0.02, frictionAir: 0.008, label: 'trompo2' }),
    energy: 100,
    maxEnergy: 100,
    angle: 0,
    color: '#A26967'
  };

  World.add(world, [top.body, bottom.body]);

  let keys = {};
  window.addEventListener('keydown', e => {
    keys[e.key.toLowerCase()] = true;
    if (['w','a','s','d'].includes(e.key.toLowerCase())) notifyTutorial('move');
  });
  window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

  // Joystick virtual para el jugador 1 (celular): antes tocar cualquier
  // punto de la pantalla mandaba el trompo directo hacia ahí (como un
  // click). Ahora el joystick aparece donde tocás y funciona como un stick
  // analógico — dirección y distancia respecto al centro controlan el
  // movimiento, sin importar dónde esté el trompo en pantalla.
  const joystick = createVirtualJoystick(canvas, canvasWrap);

  let npcLastAction = 0;
  let lastCollisionTime = 0;
  const COLLISION_COOLDOWN = 180;

  const bgMusicTrompos = document.getElementById('bgMusic-trompos');
  const volumeSliderTrompos = document.getElementById('volumeSlider-trompos');
  const volumeIconTrompos = document.getElementById('volumeIcon-trompos');
  const damageOverlay = document.getElementById('damageOverlay-trompos');
  let volume = Number(volumeSliderTrompos?.value || 0.25);
  let savedVolume = volume;

  function updateVolumeIcon(value){
    if(!volumeIconTrompos) return;
    volumeIconTrompos.textContent = value <= 0 ? '🔇' : value < 0.35 ? '🔉' : '🔊';
  }

  if(bgMusicTrompos){
    bgMusicTrompos.volume = volume;
    bgMusicTrompos.muted = false;
  }
  updateVolumeIcon(volume);

  volumeSliderTrompos?.addEventListener('input', (event)=>{
    const value = Number(event.target.value);
    volume = value;
    if(bgMusicTrompos){
      bgMusicTrompos.volume = value;
      bgMusicTrompos.muted = value <= 0;
    }
    updateVolumeIcon(value);
  });

  function playMusic(){
    if(!bgMusicTrompos) return;
    bgMusicTrompos.muted = false;
    bgMusicTrompos.volume = volume;
    bgMusicTrompos.play().catch(()=>{});
  }

  function stopMusic(){
    if(!bgMusicTrompos) return;
    bgMusicTrompos.pause();
    bgMusicTrompos.currentTime = 0;
  }

  function flashDamage(){
    if(!damageOverlay) return;
    if(window.gsap){
      gsap.fromTo(damageOverlay,
        { opacity: 0.45 },
        { opacity: 0, duration: 0.3, ease: 'power1.out' }
      );
    }
  }

  function updateNPC(timestamp){
    if(gameMode !== 'pve') return;
    
    const now = timestamp || Date.now();
    const config = gameConfig.npc[npcDifficulty];
    
    if(now - npcLastAction > config.reaction){
      npcLastAction = now;
      
      const distX = top.body.position.x - bottom.body.position.x;
      const distY = top.body.position.y - bottom.body.position.y;
      const distance = Math.sqrt(distX*distX + distY*distY);
      
      if(Math.random() > config.moveChance) return;
      
      if(distance > 70){
        const targetX = bottom.body.position.x + (distX * config.precision);
        const targetY = bottom.body.position.y + (distY * config.precision);
        
        const moveX = (targetX - bottom.body.position.x) * 0.08;
        const moveY = (targetY - bottom.body.position.y) * 0.08;
        
        Body.setVelocity(bottom.body, { x: moveX * config.speed, y: moveY * config.speed });
      } else {
        const angle = Math.random() * Math.PI * 2;
        Body.setVelocity(bottom.body, {
          x: Math.cos(angle) * config.speed * 1.1,
          y: Math.sin(angle) * config.speed * 1.1
        });
      }
    }
  }

  Events.on(engine, 'collisionStart', (evt)=>{
    const now = Date.now();
    for(const pair of evt.pairs){
      const { bodyA, bodyB } = pair;
      if((bodyA.label === 'trompo1' && bodyB.label === 'trompo2') ||
         (bodyA.label === 'trompo2' && bodyB.label === 'trompo1')){
        
        if(now - lastCollisionTime > COLLISION_COOLDOWN){
          lastCollisionTime = now;

          const vel1 = top.body.velocity;
          const vel2 = bottom.body.velocity;
          
          const speed1 = Math.sqrt(vel1.x * vel1.x + vel1.y * vel1.y);
          const speed2 = Math.sqrt(vel2.x * vel2.x + vel2.y * vel2.y);
          
          const impactForce = Math.sqrt(Math.pow(vel1.x - vel2.x, 2) + Math.pow(vel1.y - vel2.y, 2));
          const damage = Math.min(35, Math.max(8, Math.round(impactForce * 2.8)));

          flashDamage();
          notifyTutorial('hit');

          if (speed1 > speed2 + 0.3) {
            bottom.energy = Math.max(0, bottom.energy - damage);
            triggerHudDamageFlash('bottom');
          } else if (speed2 > speed1 + 0.3) {
            top.energy = Math.max(0, top.energy - damage);
            triggerHudDamageFlash('top');
          } else {
            const splitDamage = Math.round(damage / 1.6);
            top.energy = Math.max(0, top.energy - splitDamage);
            bottom.energy = Math.max(0, bottom.energy - splitDamage);
            triggerHudDamageFlash('top');
            triggerHudDamageFlash('bottom');
          }
        }
      }
    }
  });

  let lastTime = null;
  function step(timestamp){
    if(!running || !isGameVisible) return;

    // Antes se avanzaba la física una cantidad fija (1000/60) por cada
    // frame, asumiendo 60fps. En pantallas de 90/120/144Hz requestAnimationFrame
    // dispara más seguido, así que los trompos terminaban moviéndose mucho
    // más rápido de lo esperado. Usamos el tiempo real transcurrido (topado
    // para evitar saltos tras una pausa larga) para que la velocidad sea
    // siempre la misma sin importar el dispositivo.
    if (lastTime === null) lastTime = timestamp;
    const dt = Math.min(Math.max(timestamp - lastTime, 1), 100);
    lastTime = timestamp;
    Engine.update(engine, dt);

    const moveX1 = (keys['d'] ? 1 : 0) - (keys['a'] ? 1 : 0);
    const moveY1 = (keys['s'] ? 1 : 0) - (keys['w'] ? 1 : 0);
    if(moveX1 !== 0 || moveY1 !== 0){
      Body.setVelocity(top.body, { x: moveX1 * 4, y: moveY1 * 4 });
    } else if (joystick.isActive()) {
      const vec = joystick.getVector();
      const len = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
      if (len > 0.15) {
        Body.setVelocity(top.body, { x: (vec.x / len) * 4 * Math.min(1, len), y: (vec.y / len) * 4 * Math.min(1, len) });
        notifyTutorial('move');
      }
    }
    
    if(gameMode === 'pvp'){
      const moveX2 = (keys['arrowright'] ? 1 : 0) - (keys['arrowleft'] ? 1 : 0);
      const moveY2 = (keys['arrowdown'] ? 1 : 0) - (keys['arrowup'] ? 1 : 0);
      if(moveX2 !== 0 || moveY2 !== 0){
        Body.setVelocity(bottom.body, { x: moveX2 * 4, y: moveY2 * 4 });
      }
    } else if (!tutorialMode) {
      // El rival queda quieto durante el tutorial para que sea fácil
      // acertarle a propósito mientras se practica.
      updateNPC(timestamp);
    }

    const p1Speed = Math.sqrt(top.body.velocity.x**2 + top.body.velocity.y**2);
    const p2Speed = Math.sqrt(bottom.body.velocity.x**2 + bottom.body.velocity.y**2);
    top.angle += p1Speed * 0.12;
    bottom.angle += p2Speed * 0.12;

    const maxV = 10;
    if(Math.abs(top.body.velocity.x) > maxV) 
      Body.setVelocity(top.body, { x: Math.sign(top.body.velocity.x) * maxV, y: top.body.velocity.y });
    if(Math.abs(top.body.velocity.y) > maxV) 
      Body.setVelocity(top.body, { x: top.body.velocity.x, y: Math.sign(top.body.velocity.y) * maxV });
    if(Math.abs(bottom.body.velocity.x) > maxV) 
      Body.setVelocity(bottom.body, { x: Math.sign(bottom.body.velocity.x) * maxV, y: bottom.body.velocity.y });
    if(Math.abs(bottom.body.velocity.y) > maxV) 
      Body.setVelocity(bottom.body, { x: bottom.body.velocity.x, y: Math.sign(bottom.body.velocity.y) * maxV });

    const mapWidth = canvas.width * 0.85;
    const mapHeight = canvas.height * 0.85;
    const offsetX = (canvas.width - mapWidth) / 2;
    const offsetY = (canvas.height - mapHeight) / 2;

    if(!tutorialMode && (top.energy <= 0 || top.body.position.y > canvas.height - offsetY + 40 || top.body.position.x > canvas.width - offsetX + 40 || top.body.position.x < offsetX - 40)){
      running = false;
      handleRoundEnd('bottom');
      return;
    }
    if(!tutorialMode && (bottom.energy <= 0 || bottom.body.position.y > canvas.height - offsetY + 40 || bottom.body.position.x > canvas.width - offsetX + 40 || bottom.body.position.x < offsetX - 40)){
      running = false;
      handleRoundEnd('top');
      return;
    }

    updateHud();
    clearCanvas();
    
    ctx.fillStyle = '#E4D5C3'; 
    ctx.fillRect(offsetX, offsetY, mapWidth, mapHeight);
    
    ctx.strokeStyle = '#8E7355';
    ctx.lineWidth = 6;
    ctx.strokeRect(offsetX, offsetY, mapWidth, mapHeight);
    
    ctx.strokeStyle = 'rgba(142, 115, 85, 0.2)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(offsetX, canvas.height/2);
    ctx.lineTo(canvas.width - offsetX, canvas.height/2);
    ctx.stroke();
    ctx.setLineDash([]);

    drawTrompo(top.body, top.angle, top.color, '#2D6A4F');
    drawTrompo(bottom.body, bottom.angle, bottom.color, '#9B2226');

    drawEnergyBar(top.body.position.x, top.body.position.y - 38, top.energy, '#2D6A4F');
    drawEnergyBar(bottom.body.position.x, bottom.body.position.y - 38, bottom.energy, '#9B2226');

    rafId = requestAnimationFrame(step);
  }

  function drawTrompo(body, angle, bodyColor, lineDecorColor){
    ctx.save();
    ctx.translate(body.position.x, body.position.y);
    ctx.rotate(angle);

    const radius = 24;

    ctx.fillStyle = 'rgba(0,0,0,0.18)';
    ctx.beginPath();
    ctx.ellipse(5, 5, radius * 0.9, radius * 0.6, 0.2, 0, Math.PI*2);
    ctx.fill();

    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.7, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.45, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = lineDecorColor;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.6, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([4, 6]);
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.28, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#495057';
    ctx.beginPath();
    ctx.arc(0, 0, 7, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(-2, -2, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawEnergyBar(x, y, energy, color){
    const barWidth = 64;
    const barHeight = 8;
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(x - barWidth/2, y, barWidth, barHeight);
    ctx.fillStyle = color;
    ctx.fillRect(x - barWidth/2, y, (barWidth * energy) / 100, barHeight);
  }

  function handleRoundEnd(winner) {
    if (winner === 'top') {
      playerWins++;
    } else {
      rivalWins++;
    }

    const neededToWin = Math.ceil(maxRounds / 2);

    if (playerWins >= neededToWin || rivalWins >= neededToWin || currentRound >= maxRounds) {
      const finalWinner = playerWins > rivalWins ? 'top' : 'bottom';
      endGame(finalWinner);
    } else {
      currentRound++;
      showOverlay(`
        <span class="overlay-tag">${jt('jue.card2.roundEndTag', 'Fin de Ronda')}</span>
        <h3>${jt('jue.card2.roundEndTitle', 'Ronda {n} finalizada').replace('{n}', currentRound - 1)}</h3>
        <p>${jt('jue.card2.winnerLabel', 'Ganador')}: ${winner === 'top' ? jt('jue.card2.player1', '🟢 Jugador 1') : jt('jue.card2.rivalTag', '🔴 Rival')}</p>
        <div style="font-size: 1.2rem; font-weight: bold; margin: 15px 0;">
          ${jt('jue.card2.scoreLabel', 'Marcador')}: ${jt('jue.card2.p1Short', 'J1')} ${playerWins} - ${rivalWins} ${jt('jue.card2.rivalShort2', 'Rival')}
        </div>
        <button class="btn-primary" id="btn-next-round">${jt('jue.card2.nextRound', 'Siguiente Ronda')}</button>
      `);
      document.getElementById('btn-next-round').onclick = startNextRound;
    }
  }

  function startNextRound() {
    hideOverlay();
    resetPositions();
    running = true;
    updateHud();
    playMusic();
    rafId = requestAnimationFrame(step);
  }

  function resetPositions() {
    const mapHeight = canvas.height * 0.85;
    const offsetY = (canvas.height - mapHeight) / 2;

    Body.setPosition(top.body, { x: canvas.width/2, y: offsetY + 100 });
    Body.setPosition(bottom.body, { x: canvas.width/2, y: canvas.height - offsetY - 100 });
    Body.setVelocity(top.body, { x: 0, y: 0 });
    Body.setVelocity(bottom.body, { x: 0, y: 0 });
    
    top.energy = 100;
    bottom.energy = 100;
  }

  function endGame(winner){
    paused = false;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';

    let message = winner === 'top' 
      ? jt('jue.card2.end.win', '🟢 ¡Felicidades! Has ganado el duelo ({p} - {r})').replace('{p}', playerWins).replace('{r}', rivalWins)
      : gameMode === 'pvp'
        ? jt('jue.card2.end.losePvp', '🔴 ¡Jugador 2 gana el duelo! ({r} - {p})').replace('{r}', rivalWins).replace('{p}', playerWins)
        : jt('jue.card2.end.loseNpc', '🔴 El NPC salvadoreño te ha ganado ({r} - {p})').replace('{r}', rivalWins).replace('{p}', playerWins);

    const gameName = `trompos-${gameMode}`;

    showOverlay(`
      <span class="overlay-tag">${jt('jue.card2.end.tag', 'Fin de la Batalla')}</span>
      <h3>${message}</h3>
      <p>${jt('jue.card2.end.rematch', '¿Listo para una revancha?')}</p>
      <p class="overlay-best-score" id="p-best-score-trompos"></p>
      <button class="btn-primary" id="p-restart">${jt('jue.end.playAgain2', 'Volver a Jugar')}</button>`);
    
    document.getElementById('p-restart').onclick = showModeSelector;

    guardarPuntajeJuego(gameName, playerWins).then(() => {
      obtenerMejorPuntajeJuego(gameName).then((best) => {
        const el = document.getElementById('p-best-score-trompos');
        if (el && best) el.textContent = `${jt('jue.bestScore.rounds', 'Tu récord de rondas ganadas')}: ${best.score}`;
      });
    });
  }

  const pauseBtn = document.getElementById('pauseBtn-trompos');
  const pauseIcon = document.getElementById('pauseIcon-trompos');
  const pauseOverlay = document.getElementById('pauseOverlay-trompos');
  const resumeBtn = document.getElementById('resumeBtn-trompos');
  const menuBtn = document.getElementById('menuBtn-trompos');

  let running = false, paused = false;

  function pauseGame(){
    if(!running) return;
    running = false;
    paused = true;
    cancelAnimationFrame(rafId);
    if (bgMusicTrompos) {
      savedVolume = bgMusicTrompos.volume;
      bgMusicTrompos.volume = 0.1;
    }
    canvasWrap?.classList.add('is-paused');
    pauseOverlay?.classList.remove('hidden');
    if(pauseIcon) pauseIcon.textContent = '▶️';
    if (tutorialMode) hideTutorialBubble();
  }

  function resumeGame(){
    if(!paused) return;
    paused = false;
    running = true;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    if (bgMusicTrompos) {
      bgMusicTrompos.volume = savedVolume || volume;
      if (volume > 0) bgMusicTrompos.play().catch(()=>{});
    }
    if (tutorialMode && tutorialStep >= 0) showTutorialStep(tutorialStep);
    rafId = requestAnimationFrame(step);
  }

  function returnToMenu(){
    running = false;
    paused = false;
    tutorialMode = false;
    hideTutorialBubble();
    cancelAnimationFrame(rafId);
    // stopMusic();  // ELIMINADO
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';

    Body.setVelocity(top.body, { x: 0, y: 0 });
    Body.setVelocity(bottom.body, { x: 0, y: 0 });

    showModeSelector();
  }

  pauseBtn?.addEventListener('click', ()=>{
    if(!running && !paused) return;
    if(paused) resumeGame();
    else pauseGame();
  });
  
  resumeBtn?.addEventListener('click', resumeGame);
  menuBtn?.addEventListener('click', returnToMenu);

  function start(){
    resizeCanvas();
    setupWalls();
    resetPositions();
    
    running = true;
    paused = false;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    
    updateHud();
    hideOverlay();
    cancelAnimationFrame(rafId);
    playMusic();

    rafId = requestAnimationFrame(step);
  }

  function showDifficultySelector(){
    showOverlay(`
      <button type="button" class="btn-back-selector" id="btn-back-diff-trompos">${jt('jue.back', '← Atrás')}</button>
      <span class="overlay-tag">${jt('jue.card2.chooseDiffTag', 'Elige Dificultad')}</span>
      <h3>${jt('jue.card2.diff.title', '🎮 Selecciona tu Desafío')}</h3>
      <p>${jt('jue.card2.diff.sub', 'Elige el nivel de agilidad que tendrá la IA.')}</p>
      <div class="difficulty-buttons">
        <button class="difficulty-btn easy" id="btn-easy-trompos">
          ${jt('jue.diff.easy', '🟢 Fácil')}
          <div class="difficulty-desc">${jt('jue.card2.diff.easyDesc', 'NPC lento y predecible')}</div>
        </button>
        <button class="difficulty-btn medium" id="btn-medium-trompos">
          ${jt('jue.diff.medium', '🟡 Normal')}
          <div class="difficulty-desc">${jt('jue.card2.diff.medDesc', 'NPC rápido y certero')}</div>
        </button>
        <button class="difficulty-btn hard" id="btn-hard-trompos">
          ${jt('jue.diff.hard', '🔴 Difícil')}
          <div class="difficulty-desc">${jt('jue.card2.diff.hardDesc', 'NPC experto (Modo Imposible)')}</div>
        </button>
      </div>`);

    document.getElementById('btn-back-diff-trompos').onclick = showRoundSelector;
    document.getElementById('btn-easy-trompos').onclick = ()=>{
      npcDifficulty = 'easy';
      document.getElementById('p2-label').textContent = jt('jue.card2.npcEasy', '🟢 NPC - Fácil');
      setTimeout(()=>{ start(); }, 100);
    };
    
    document.getElementById('btn-medium-trompos').onclick = ()=>{
      npcDifficulty = 'medium';
      document.getElementById('p2-label').textContent = jt('jue.card2.npcMedium', '🟡 NPC - Normal');
      setTimeout(()=>{ start(); }, 100);
    };
    
    document.getElementById('btn-hard-trompos').onclick = ()=>{
      npcDifficulty = 'hard';
      document.getElementById('p2-label').textContent = jt('jue.card2.npcHard', '🔴 NPC - Experto');
      setTimeout(()=>{ start(); }, 100);
    };
  }

  function showRoundSelector(){
    showOverlay(`
      <button type="button" class="btn-back-selector" id="btn-back-rounds-trompos">${jt('jue.back', '← Atrás')}</button>
      <span class="overlay-tag">${jt('jue.card2.configTag', 'Configuración')}</span>
      <h3>${jt('jue.card2.rounds.title', '🏁 ¿A cuántas rondas jugamos?')}</h3>
      <p>${jt('jue.card2.rounds.sub', 'El primero en ganar la mitad más uno de las rondas seleccionadas se lleva la victoria.')}</p>
      <div class="difficulty-buttons" style="display: flex; gap: 15px; margin-top: 15px;">
        <button class="btn-primary" id="rounds-1" style="flex: 1;">${jt('jue.card2.round1', '1 Ronda')}</button>
        <button class="btn-primary" id="rounds-3" style="flex: 1;">${jt('jue.card2.bestOf3', 'Best of 3')}</button>
        <button class="btn-primary" id="rounds-5" style="flex: 1;">${jt('jue.card2.bestOf5', 'Best of 5')}</button>
      </div>
    `);

    document.getElementById('btn-back-rounds-trompos').onclick = showModeSelector;
    document.getElementById('rounds-1').onclick = () => { selectRounds(1); };
    document.getElementById('rounds-3').onclick = () => { selectRounds(3); };
    document.getElementById('rounds-5').onclick = () => { selectRounds(5); };
  }

  function selectRounds(ronds) {
    maxRounds = ronds;
    currentRound = 1;
    playerWins = 0;
    rivalWins = 0;
    
    if (gameMode === 'pvp') {
      start();
    } else {
      showDifficultySelector();
    }
  }

  function showModeSelector(){
    showOverlay(`
      <span class="overlay-tag">${jt('jue.card2.selectModeTag', 'Selecciona Modo')}</span>
      <h3>⚡ ${jt('jue.card2.titleModal', 'Batalla de Trompos SV')}</h3>
      <p>${jt('jue.card2.mode.sub', '¿Cómo quieres jugar?')}</p>
      <div class="mode-buttons">
        <button class="mode-btn pvp" id="btn-pvp-trompos">
          ${jt('jue.card2.mode.pvp', '👥 2 Jugadores')}
          <div class="difficulty-desc">${jt('jue.card2.mode.pvpDesc', 'Compite localmente')}</div>
        </button>
        <button class="mode-btn pve" id="btn-pve-trompos">
          ${jt('jue.card2.mode.pve', '🤖 vs NPC')}
          <div class="difficulty-desc">${jt('jue.card2.mode.pveDesc', 'Enfrenta la IA de práctica')}</div>
        </button>
      </div>
      <button class="btn-tutorial" id="btn-tutorial-trompos">🎓 ${jt('jue.tutorial.start', 'Tutorial (practicar primero)')}</button>`);

    document.getElementById('btn-tutorial-trompos').onclick = startTutorial;
    document.getElementById('btn-pvp-trompos').onclick = ()=>{
      gameMode = 'pvp';
      document.getElementById('p2-label').textContent = jt('jue.card2.player2', '🔴 Jugador 2');
      setTimeout(()=>{ showRoundSelector(); }, 100);
    };
    
    document.getElementById('btn-pve-trompos').onclick = ()=>{
      gameMode = 'pve';
      setTimeout(()=>{ showRoundSelector(); }, 100);
    };
  }

  showOverlay(`
    <span class="overlay-tag">${jt('jue.card2.tagModal', 'Ruta 02')}</span>
    <h3>⚡ ${jt('jue.card2.title', 'Batalla de Trompos')}</h3>
    <p>${jt('jue.card2.intro', 'Empujá tu trompo contra el de tu oponente para sacarlo del círculo. El primero en caer o salirse pierde la ronda.')}</p>
    <p class="rules-title">${jt('jue.controls.title', 'Controles')}</p>
    <ul class="rules-list">
      <li class="rule-good"><span class="rule-icon">🎮</span> ${jt('jue.card2.controlsP1', 'Jugador 1: teclas <strong>WASD</strong> para mover el trompo.')}</li>
      <li class="rule-good"><span class="rule-icon">🎮</span> ${jt('jue.card2.controlsP2', 'Jugador 2 (o NPC): teclas de <strong>flechas</strong> ⬅️⬆️➡️⬇️.')}</li>
    </ul>
    <button class="btn-primary" id="p-start-trompos">${jt('jue.card2.prepareBattle', 'Preparar Batalla')}</button>`);
  
  document.getElementById('p-start-trompos').onclick = showModeSelector;

  gameContent?.addEventListener('gameVisible', (e) => {
    if(e.detail.gameId === 'trompos') {
      isGameVisible = true;
      resizeCanvas();
      setupWalls();
      playMusic();
      if(paused && running) {
        resumeGame();
      } else if(running) {
        rafId = requestAnimationFrame(step);
      }
    }
  });

  const observer = new MutationObserver(() => {
    isGameVisible = gameContent?.classList.contains('active') || false;
    if(isGameVisible) {
      resizeCanvas();
      setupWalls();
    }
  });

  if(gameContent) {
    observer.observe(gameContent, { attributes: true, attributeFilter: ['class'] });
  }

  window.switchGameState('trompos', {
    pause: pauseGame,
    resume: resumeGame,
    stop: stopMusic,
    running: () => running,
    paused: () => paused,
    setVisible: (visible) => { isGameVisible = visible; },
    reloadMenu: showModeSelector
  });
})();

/* ============================================================
   SISTEMA DE MODALES Y COMPORTAMIENTO DE JUEGOS FLOTANTES
   ============================================================ */
(function initGameModals() {
  const triggers = document.querySelectorAll('[data-open-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');

  // `overflow: hidden` en el body no basta para bloquear el scroll táctil
  // del fondo en varios navegadores móviles (Safari iOS sigue dejando
  // "arrastrar" lo que está detrás del modal). Fijamos el body en su
  // posición actual mientras el juego está abierto, igual que se hace con
  // el menú hamburguesa, y lo restauramos exactamente igual al cerrar.
  let scrollYAlAbrirJuego = 0;
  function lockBackgroundScroll() {
    scrollYAlAbrirJuego = window.scrollY || window.pageYOffset || 0;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollYAlAbrirJuego}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  }
  function unlockBackgroundScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, scrollYAlAbrirJuego);
  }

  if(window.gsap){
    document.querySelectorAll('.game-modal, .game-modal__content').forEach(el => {
      el.style.transition = 'none';
    });
  }

  function closeModal(gameId) {
    const modal = document.getElementById(`modal-${gameId}`);
    if (!modal) return;

    // Detener música del juego
    if (window.gameStates && window.gameStates[gameId]) {
      if (window.gameStates[gameId].stop) window.gameStates[gameId].stop();
      if (window.gameStates[gameId].pause) window.gameStates[gameId].pause();
      if (window.gameStates[gameId].setVisible) window.gameStates[gameId].setVisible(false);
    }

    // Forzar detención de audios dentro del modal
    const audioElements = modal.querySelectorAll('audio');
    audioElements.forEach(audio => {
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 0;
    });

    const content = modal.querySelector('.game-modal__content');
    if (window.gsap && content) {
      gsap.to(content, {
        scale: 0.9, y: 16, autoAlpha: 0, duration: 0.3, ease: 'power1.in',
        onComplete: () => {
          modal.classList.remove('active');
          unlockBackgroundScroll();
          gsap.set(modal, { clearProps: 'opacity,visibility' });
          gsap.set(content, { clearProps: 'all' });
        }
      });
    } else {
      modal.classList.remove('active');
      unlockBackgroundScroll();
      // Limpiar los estilos inline de respaldo que pusimos al abrir sin GSAP
      modal.style.opacity = '';
      modal.style.visibility = '';
      if (content) {
        content.style.opacity = '';
        content.style.visibility = '';
        content.style.transform = '';
      }
    }
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const gameId = btn.dataset.openModal;
      const modal = document.getElementById(`modal-${gameId}`);
      if (modal) {
        modal.classList.add('active');
        lockBackgroundScroll();

        const content = modal.querySelector('.game-modal__content');
        // Los canvas de cada juego escuchan el evento 'resize' de window para
        // recalcular su resolución interna a partir de su tamaño real en pantalla.
        // Si se calcula mientras el modal todavía está animando su escala de apertura
        // (scale 0.85 → 1), el canvas queda con una resolución más chica que su
        // tamaño visual final: se ve borroso y los clics/touches quedan desalineados.
        // Por eso disparamos el resize solo cuando la animación ya terminó.
        if(window.gsap && content){
          gsap.set(modal, { autoAlpha: 1 });
          gsap.fromTo(content,
            { scale: 0.85, y: 24, autoAlpha: 0 },
            { scale: 1, y: 0, autoAlpha: 1, duration: 0.5, ease: 'back.out(1.6)',
              onComplete: () => window.dispatchEvent(new Event('resize'))
            }
          );
        } else {
          // Sin GSAP: forzamos visibilidad directa por estilos inline,
          // ya que el CSS base deja el modal en opacity/visibility 0
          // hasta que algo (normalmente GSAP) lo muestre.
          modal.style.opacity = '1';
          modal.style.visibility = 'visible';
          if (content) {
            content.style.opacity = '1';
            content.style.visibility = 'visible';
            content.style.transform = 'none';
          }
          window.dispatchEvent(new Event('resize'));
        }

        modal.dispatchEvent(new CustomEvent('gameVisible', { detail: { gameId: gameId } }));

        const audioEl = modal.querySelector('audio');
        if (audioEl) {
          const retryPlay = () => {
            if (audioEl.paused && window.gameStates?.[gameId]?.running?.() === false && window.gameStates?.[gameId]?.paused?.() === false) {
              audioEl.play().catch(() => {});
            }
          };
          content?.addEventListener('click', retryPlay, { once: true });
        }

        const state = window.gameStates && window.gameStates[gameId];
        if (state) {
          const isRunning = state.running ? state.running() : false;
          const isPaused = state.paused ? state.paused() : false;
          if (!isRunning && !isPaused && state.reloadMenu) {
            state.reloadMenu();
          }
        }
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // El botón ✕ vive dentro de `.game-modal__content`, que tiene un
      // listener `retryPlay` (para reintentar la música bloqueada por
      // autoplay en móvil) armado con el mismo clic que abre el juego.
      // Sin este stopPropagation, cerrar el juego con su primer clic
      // dentro del modal hacía burbujear este mismo evento hasta ese
      // listener, que volvía a reproducir la música del juego justo
      // cuando se estaba pausando al cerrar — y como esa música "seguía
      // sonando", la música de fondo global (Mi Pais) nunca
      // recuperaba el turno para reanudarse.
      e.stopPropagation();
      const gameId = btn.dataset.closeModal;
      closeModal(gameId);
    });
  });

  document.querySelectorAll('.game-modal').forEach(modal => {
    const gameId = modal.id.replace('modal-', '');
    // El overlay oscuro es un hijo posicionado sobre todo el modal, así que
    // un toque "afuera" del juego cae sobre él (no sobre .game-modal en sí);
    // por eso el cierre se engancha en el overlay y no en el contenedor.
    const overlayEl = modal.querySelector('.game-modal__overlay');
    overlayEl?.addEventListener('click', () => closeModal(gameId));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(gameId);
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModal = document.querySelector('.game-modal.active');
      if (activeModal) {
        const gameId = activeModal.id.replace('modal-', '');
        closeModal(gameId);
      }
    }
  });

  window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key !== 'p' && key !== 'f') return;

    const activeModal = document.querySelector('.game-modal.active');
    if (!activeModal) return;
    const gameId = activeModal.id.replace('modal-', '');

    if (key === 'p') {
      const state = window.gameStates && window.gameStates[gameId];
      if (!state) return;
      const isRunning = state.running ? state.running() : false;
      const isPaused = state.paused ? state.paused() : false;
      if (!isRunning && !isPaused) return;
      if (isPaused) {
        if (state.resume) state.resume();
      } else if (isRunning) {
        if (state.pause) state.pause();
      }
    }

    if (key === 'f') {
      const canvasWrap = document.getElementById(`${gameId}-canvas-wrap`) || activeModal.querySelector('.canvas-wrap');
      if (!canvasWrap) return;
      const isCurrent = document.fullscreenElement === canvasWrap || document.webkitFullscreenElement === canvasWrap;
      if (!isCurrent) {
        const req = canvasWrap.requestFullscreen || canvasWrap.webkitRequestFullscreen || canvasWrap.msRequestFullscreen;
        req?.call(canvasWrap);
      } else {
        const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
        exit?.call(document);
      }
    }
  });

  document.addEventListener('langchange', () => {
    const activeModal = document.querySelector('.game-modal.active');
    if (!activeModal) return;
    const gameId = activeModal.id.replace('modal-', '');
    const state = window.gameStates && window.gameStates[gameId];
    if (!state) return;
    const isRunning = state.running ? state.running() : false;
    const isPaused = state.paused ? state.paused() : false;
    if (isRunning || isPaused) return;
    if (state.reloadMenu) state.reloadMenu();
  });
})();

/* ---------------------------------------------------------
   JUEGO 3: GUERRA DE COASTERS (CARRERA ARCADE) - CORREGIDO
--------------------------------------------------------- */
(function initGameCoasters(){
  const canvas = document.getElementById('canvas-coasters');
  if(!canvas || typeof Matter === 'undefined') return;

  const ctx = canvas.getContext('2d');
  const hud = document.getElementById('hud-coasters');
  const overlay = document.getElementById('overlay-coasters');
  const overlayCard = document.getElementById('overlay-card-coasters');
  const gameContent = document.getElementById('modal-coasters');
  const canvasWrap = document.getElementById('coasters-canvas-wrap');
  const { Engine, World, Bodies, Body, Events, Composite } = Matter;

  let isGameVisible = false;
  let running = false;
  let paused = false;
  let rafId = null;

  // Al llegar a la meta, en vez de cortar directo al resultado, se muestra
  // una breve escena de la terminal de buses mientras el bus del ganador
  // entra a parquearse.
  let arriving = false;
  let arrivalTimer = 0;
  let arrivalWinner = null;
  const ARRIVAL_DURATION = 1900; // ms

  let botDifficulty = 'easy';
  let targetDistance = 2000;

  // En celular el bus acelera solo (no hay forma natural de "mantener
  // presionada" una tecla), y la misma velocidad en píxeles se siente
  // mucho más frenética en una pantalla chica que en una de escritorio.
  // Bajamos el techo de velocidad de ambos buses para que el scroll del
  // camino (que depende directo de player.speed) se vea más manejable.
  const COASTERS_SPEED_MULT = esTactilJuegos ? 0.68 : 1;

  let player = { x: 0, y: 0, speed: 0, maxSpeed: 8 * COASTERS_SPEED_MULT, lane: 1, targetX: 0, distance: 0, passengers: 0 };
  let bot = { x: 0, y: 0, speed: 0, maxSpeed: 5.5 * COASTERS_SPEED_MULT, lane: 2, targetX: 0, distance: 0 };

  const lanesCount = 4;
  let laneWidth = 0;
  let roadY = 0;
  const lanePositions = [];

  let passengers = [];

  // Buses y obstáculos más grandes, usan más espacio del carril (afecta
  // tanto el dibujo como el tamaño real de colisión de cada entidad).
  const ENTITY_SCALE = 1.35;

  // ================= IMPACTO DINÁMICO (chispas + sacudida + sonido) =================
  // Antes un choque solo restaba velocidad y hacía un flash rojo en la
  // pantalla: se sentía plano. Ahora cada choque lanza chispas/escombros
  // desde el punto exacto del golpe, sacude la cámara según la fuerza del
  // impacto, y suena un golpe sintetizado con Web Audio.
  let impactParticles = [];
  let shakeTime = 0;
  let shakeMag = 0;

  function spawnImpact(x, y, power = 1, color = '#ffcc33') {
    const count = Math.round(10 + power * 6);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = (1.5 + Math.random() * 3.5) * power;
      impactParticles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        life: 22 + Math.random() * 16,
        maxLife: 22 + Math.random() * 16,
        size: 2 + Math.random() * 3,
        color
      });
    }
  }

  function triggerShake(power = 1) {
    shakeTime = Math.max(shakeTime, 14 * power);
    shakeMag = Math.max(shakeMag, 5 * power);
  }

  function stepImpactParticles() {
    impactParticles = impactParticles.filter(p => p.life > 0);
    impactParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.18; // gravedad leve
      p.vx *= 0.96;
      p.life--;
    });
    if (shakeTime > 0) { shakeTime--; shakeMag *= 0.9; } else { shakeMag = 0; }
  }

  function drawImpactParticles() {
    impactParticles.forEach(p => {
      const alpha = Math.max(0, p.life / p.maxLife);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  let crashAudioCtx = null;
  function playCrashSound(power = 1) {
    if (volume <= 0) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!crashAudioCtx && AudioCtx) crashAudioCtx = new AudioCtx();
      if (!crashAudioCtx) return;
      if (crashAudioCtx.state === 'suspended') crashAudioCtx.resume();
      const t = crashAudioCtx.currentTime;
      const bufferSize = Math.floor(crashAudioCtx.sampleRate * 0.18);
      const buffer = crashAudioCtx.createBuffer(1, bufferSize, crashAudioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      const noise = crashAudioCtx.createBufferSource();
      noise.buffer = buffer;
      const filter = crashAudioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400 * power, t);
      const gain = crashAudioCtx.createGain();
      gain.gain.setValueAtTime(0.35 * volume * power, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(crashAudioCtx.destination);
      noise.start(t);
    } catch (e) {}
  }

  // ================= MODO TUTORIAL =================
  let tutorialMode = false;
  let tutorialStep = -1;
  let tutorialWaiting = false;
  const tutorialSteps = [
    { action: 'lane', text: () => esTactilJuegos
        ? jt('jue.tutorial.coasters.lane.tap', 'El bus acelera solo. Tocá cualquier carril de la calle para moverte hacia ahí. ¡Probalo!')
        : jt('jue.tutorial.coasters.lane.key', 'Usá A/D o las flechas ⬅️➡️ para cambiar de carril. ¡Probalo!') },
    { action: 'lane', text: () => jt('jue.tutorial.coasters.lane2', '¡Bien! Cambiá una vez más para esquivar como en la calle de verdad.') },
    { action: 'passenger', text: () => jt('jue.tutorial.coasters.passenger', 'Cuando aparezca un pasajero brillante en el borde de la calle, metete a ese carril para recogerlo.') }
  ];

  function tutorialBubble(html) {
    let el = canvasWrap?.querySelector('.tutorial-bubble');
    if (!el && canvasWrap) {
      el = document.createElement('div');
      el.className = 'tutorial-bubble';
      canvasWrap.appendChild(el);
    }
    if (el) el.innerHTML = html;
  }
  function hideTutorialBubble() { canvasWrap?.querySelector('.tutorial-bubble')?.remove(); }

  function showTutorialStep(i) {
    tutorialStep = i;
    if (i >= tutorialSteps.length) { finishTutorial(); return; }
    tutorialWaiting = true;
    const n = i + 1, total = tutorialSteps.length;
    tutorialBubble(`
      <span class="tutorial-bubble__tag">🎓 ${jt('jue.tutorial.tag', 'Tutorial')} ${n}/${total}</span>
      <p>${tutorialSteps[i].text()}<span class="tutorial-pulse"></span></p>
    `);
    if (tutorialSteps[i].action === 'passenger' && passengers.length === 0) {
      const onLeft = Math.random() > 0.5;
      passengers.push({ x: onLeft ? 15 : canvas.width - 15, y: -50, collected: false });
    }
  }

  function notifyTutorial(action) {
    if (!tutorialMode || !tutorialWaiting) return;
    if (tutorialSteps[tutorialStep].action !== action) return;
    tutorialWaiting = false;
    tutorialBubble(`<span class="tutorial-bubble__tag good">✅ ${jt('jue.tutorial.good', '¡Bien hecho!')}</span>`);
    setTimeout(() => { if (tutorialMode) showTutorialStep(tutorialStep + 1); }, 1000);
  }

  function finishTutorial() {
    tutorialMode = false;
    hideTutorialBubble();
    running = false;
    cancelAnimationFrame(rafId);
    showOverlay(`
      <span class="overlay-tag">🎉 ${jt('jue.tutorial.doneTag', 'Tutorial completo')}</span>
      <h3>${jt('jue.tutorial.doneTitle', '¡Ya sabés manejar el bus!')}</h3>
      <p>${jt('jue.tutorial.doneText', 'Ahora vamos a la carrera de verdad: elegí la distancia y la dificultad del rival.')}</p>
      <button class="btn-primary" id="btn-tutorial-done-coasters">🚌 ${jt('jue.tutorial.playReal', 'Jugar de verdad')}</button>
    `);
    document.getElementById('btn-tutorial-done-coasters').onclick = showDistanceSelector;
  }

  function startTutorial() {
    botDifficulty = 'easy';
    targetDistance = 999999;
    resetGame();
    hideOverlay();
    cancelAnimationFrame(rafId);
    tutorialMode = true;
    running = true;
    paused = false;
    playMusic();
    lastTime = null;
    physicsAccum = 0;
    rafId = requestAnimationFrame(step);
    showTutorialStep(0);
  }

  const engine = Engine.create();
  engine.gravity.y = 0;
  const world = engine.world;

  let wallLeft = Bodies.rectangle(-10, 0, 20, 10, { isStatic: true, label: 'wall' });
  let wallRight = Bodies.rectangle(-10, 0, 20, 10, { isStatic: true, label: 'wall' });
  World.add(world, [wallLeft, wallRight]);

  const playerBody = Bodies.rectangle(0, 0, 26 * ENTITY_SCALE, 60 * ENTITY_SCALE, { isStatic: true, label: 'busPlayer' });
  const botBody = Bodies.rectangle(0, 0, 26 * ENTITY_SCALE, 60 * ENTITY_SCALE, { isStatic: true, label: 'busBot' });
  World.add(world, [playerBody, botBody]);

  // Antes, al entrar en pantalla completa se reusaba la resolución chica de
  // la ventana normal y el navegador solo la estiraba (se veía borrosa/pixelada).
  // Ahora medimos siempre el tamaño real del canvas, y como esta función ya
  // reconstruye carriles y paredes, el fullscreen queda nítido automáticamente.
  function resizeCanvas() {
    const wrap = canvasWrap || canvas.closest('.canvas-wrap');
    const rect = wrap ? wrap.getBoundingClientRect() : canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    laneWidth = canvas.width / lanesCount;
    for(let i = 0; i < lanesCount; i++){
      lanePositions[i] = (i * laneWidth) + (laneWidth / 2);
    }

    player.y = canvas.height - 120;
    bot.y = canvas.height - 120;
    player.targetX = lanePositions[player.lane];
    bot.targetX = lanePositions[bot.lane];

    Composite.remove(world, wallLeft);
    Composite.remove(world, wallRight);
    wallLeft = Bodies.rectangle(-10, canvas.height/2, 20, canvas.height * 2, { isStatic: true, label: 'wall' });
    wallRight = Bodies.rectangle(canvas.width + 10, canvas.height/2, 20, canvas.height * 2, { isStatic: true, label: 'wall' });
    World.add(world, [wallLeft, wallRight]);
  }

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  document.addEventListener('fullscreenchange', () => {
    setTimeout(resizeCanvas, 100);
  });
  document.addEventListener('webkitfullscreenchange', () => {
    setTimeout(resizeCanvas, 100);
  });

  const fsBtn = canvasWrap?.querySelector('.fullscreen-btn');
  if (fsBtn) {
    fsBtn.addEventListener('click', () => {
      const isCurrent = document.fullscreenElement === canvasWrap || document.webkitFullscreenElement === canvasWrap;
      if (!isCurrent) {
        const req = canvasWrap.requestFullscreen || canvasWrap.webkitRequestFullscreen || canvasWrap.msRequestFullscreen;
        req?.call(canvasWrap);
      } else {
        const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
        exit?.call(document);
      }
    });
  }

  let keys = {};
  window.addEventListener('keydown', e => {
    keys[e.key.toLowerCase()] = true;
    if(running && !paused) {
      if(e.key.toLowerCase() === 'a' || e.key === 'ArrowLeft') moveLane(-1);
      if(e.key.toLowerCase() === 'd' || e.key === 'ArrowRight') moveLane(1);
    }
  });
  window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

  // Control táctil: tocar directamente el carril de la calle manda el bus a
  // ESE carril (antes solo se movía un carril hacia el lado tocado, lo que
  // obligaba a tocar varias veces para cruzar la calle). Además, mientras
  // el dedo se mantiene abajo y se arrastra (touchmove), el carril se sigue
  // actualizando en tiempo real: antes solo el toque inicial contaba, así
  // que un arrastre continuo (lo más natural en celular) no respondía hasta
  // soltar y volver a tocar.
  function updateLaneFromTouch(e) {
    if (!running || paused) return;
    e.preventDefault();
    const r = canvas.getBoundingClientRect();
    const touchX = (e.touches[0].clientX - r.left) * (canvas.width / r.width);
    goToLane(laneFromX(touchX));
  }
  canvas.addEventListener('touchstart', updateLaneFromTouch, { passive: false });
  canvas.addEventListener('touchmove', updateLaneFromTouch, { passive: false });

  function laneFromX(x) {
    if (!laneWidth) return player.lane;
    const lane = Math.floor(x / laneWidth);
    return Math.min(lanesCount - 1, Math.max(0, lane));
  }

  function goToLane(lane) {
    if (lane >= 0 && lane < lanesCount) player.lane = lane;
    notifyTutorial('lane');
  }

  function moveLane(direction) {
    let nextLane = player.lane + direction;
    if(nextLane >= 0 && nextLane < lanesCount) {
      player.lane = nextLane;
    }
    notifyTutorial('lane');
  }

  function pushToFreeLane(currentLane) {
    if (currentLane === 0) return 1;
    if (currentLane === lanesCount - 1) return lanesCount - 2;
    return currentLane + (Math.random() > 0.5 ? 1 : -1);
  }

  if(hud) {
    hud.innerHTML = `
      <div class="hud-item">
        <span>${jt('jue.card3.routePlayer', '🚌 Ruta 44 (Tú)')}</span>
        <div class="coasters-progress-bar"><div id="p-prog" class="coasters-progress-fill"></div></div>
        <b id="p-dist">0m</b>
      </div>
      <div class="hud-item">
        <span>${jt('jue.card3.routeBot', '🚍 Ruta 101-D (Bot)')}</span>
        <div class="coasters-progress-bar"><div id="b-prog" class="coasters-progress-fill bot"></div></div>
        <b id="b-dist">0m</b>
      </div>
      <div class="hud-item">
        <span>${jt('jue.hud.passengers', 'Pasajeros')}</span>
        <b id="p-passengers">0</b>
      </div>`;
  }

  function updateHud(){
    const pProg = document.getElementById('p-prog');
    const bProg = document.getElementById('b-prog');
    const pDist = document.getElementById('p-dist');
    const bDist = document.getElementById('b-dist');
    const pPass = document.getElementById('p-passengers');

    if(pProg) pProg.style.width = tutorialMode ? '0%' : Math.min(100, (player.distance / targetDistance) * 100) + '%';
    if(bProg) bProg.style.width = tutorialMode ? '0%' : Math.min(100, (bot.distance / targetDistance) * 100) + '%';
    if(pDist) pDist.textContent = tutorialMode ? Math.round(player.distance) + 'm' : Math.round(player.distance) + 'm / ' + targetDistance + 'm';
    if(bDist) bDist.textContent = Math.round(bot.distance) + 'm';
    if(pPass) pPass.textContent = player.passengers;
  }

  const bgMusic = document.getElementById('bgMusic-coasters');
  const volumeSlider = document.getElementById('volumeSlider-coasters');
  const volumeIcon = document.getElementById('volumeIcon-coasters');
  const damageOverlay = document.getElementById('damageOverlay-coasters');
  let volume = Number(volumeSlider?.value || 0.25);
  let savedVolume = volume;

  if(bgMusic){
    bgMusic.volume = volume;
    bgMusic.muted = false;
  }

  volumeSlider?.addEventListener('input', (event)=>{
    volume = Number(event.target.value);
    if(bgMusic){
      bgMusic.volume = volume;
      bgMusic.muted = volume <= 0;
    }
    if(volumeIcon) volumeIcon.textContent = volume <= 0 ? '🔇' : volume < 0.35 ? '🔉' : '🔊';
  });

  function playMusic(){
    if(!bgMusic) return;
    bgMusic.muted = false;
    bgMusic.volume = volume;
    bgMusic.play().catch(()=>{});
  }
  function stopMusic(){ 
    if(bgMusic) {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    }
  }

  function flashDamage(){
    if(!damageOverlay) return;
    damageOverlay.style.opacity = '1';
    setTimeout(() => { damageOverlay.style.opacity = '0'; }, 150);
  }

  function showOverlay(html){
    overlayCard.innerHTML = html;
    overlay.classList.remove('hidden');
    overlay.style.backdropFilter = 'none';
    overlay.style.webkitBackdropFilter = 'none';
    if(window.gsap){
      gsap.fromTo(overlayCard, { autoAlpha: 0, y: 18, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.5)' });
      gsap.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: 'power1.out' });
    }
  }
  function hideOverlay(){
    if(window.gsap){
      overlay.style.pointerEvents = 'none';
      gsap.to(overlayCard, { autoAlpha: 0, y: -12, scale: 0.97, duration: 0.25, ease: 'power1.in' });
      gsap.to(overlay, { autoAlpha: 0, duration: 0.25, ease: 'power1.in', onComplete: () => { overlay.classList.add('hidden'); overlay.style.pointerEvents = ''; } });
    } else {
      overlay.classList.add('hidden');
    }
  }

  function resetGame() {
    resizeCanvas();
    player.lane = 1;
    player.x = lanePositions[1];
    player.targetX = lanePositions[1];
    player.speed = 0;
    player.distance = 0;
    player.passengers = 0;

    bot.lane = 2;
    bot.x = lanePositions[2];
    bot.targetX = lanePositions[2];
    bot.speed = 0;
    bot.distance = 0;

    if (botDifficulty === 'easy') {
      bot.maxSpeed = 5.2 * COASTERS_SPEED_MULT;
    } else if (botDifficulty === 'medium') {
      bot.maxSpeed = 6.3 * COASTERS_SPEED_MULT;
    } else {
      bot.maxSpeed = 7.2 * COASTERS_SPEED_MULT;
    }

    passengers = [];
    roadY = 0;

    arriving = false;
    arrivalTimer = 0;
    arrivalWinner = null;

    Composite.allBodies(world).forEach(b => {
      if(b.label === 'bache' || b.label === 'tumulo' || b.label === 'traffic') World.remove(world, b);
    });

    Body.setPosition(playerBody, { x: player.x, y: player.y });
    Body.setPosition(botBody, { x: bot.x, y: bot.y });
  }

  // Los obstáculos comparten este mismo grupo negativo para que Matter
  // nunca resuelva físicamente colisiones entre ellos (no se empujan ni se
  // salen de su carril al tocarse) — solo siguen colisionando con los buses,
  // que no pertenecen a este grupo.
  const OBSTACLE_GROUP = -1;

  function spawnBache(){
    const lane = Math.floor(Math.random() * lanesCount);
    const body = Bodies.circle(lanePositions[lane], -50, 16 * ENTITY_SCALE, {
      restitution: 0.3, friction: 0.5, frictionAir: 0.012, label: 'bache',
      collisionFilter: { group: OBSTACLE_GROUP }
    });
    World.add(world, body);
  }

  function spawnTumulo(){
    const lane = Math.floor(Math.random() * lanesCount);
    const body = Bodies.rectangle(lanePositions[lane], -50, 44 * ENTITY_SCALE, 10 * ENTITY_SCALE, {
      restitution: 0.3, friction: 0.5, frictionAir: 0.012, label: 'tumulo',
      collisionFilter: { group: OBSTACLE_GROUP }
    });
    World.add(world, body);
  }

  function spawnTraffic(){
    const lane = Math.floor(Math.random() * lanesCount);
    const color = ['#3a86c8', '#f89e1b', '#3ae080'][Math.floor(Math.random()*3)];
    const body = Bodies.rectangle(lanePositions[lane], -100, 24 * ENTITY_SCALE, 44 * ENTITY_SCALE, {
      restitution: 0.4, friction: 0.4, frictionAir: 0.01, label: 'traffic',
      collisionFilter: { group: OBSTACLE_GROUP }
    });
    body.trafficColor = color;
    body.trafficSpeed = 2 + Math.random() * 2;
    World.add(world, body);
  }

  function countBodies(label){
    return Composite.allBodies(world).filter(b => b.label === label).length;
  }

function spawnEntities() {
    if (tutorialMode && tutorialWaiting) return; // Congela obstáculos nuevos mientras se espera la acción del tutorial

    if(!tutorialMode && Math.random() < 0.005 && (countBodies('bache') + countBodies('tumulo')) < 5) {
      if(Math.random() > 0.5) spawnBache(); else spawnTumulo();
    }

    if(!tutorialMode && Math.random() < 0.015 && passengers.length < 4) {
      passengers.push({
        x: Math.random() > 0.5 ? 15 : canvas.width - 15,
        y: -50,
        collected: false
      });
    }

    if(!tutorialMode && Math.random() < 0.003 && countBodies('traffic') < 2) {
      spawnTraffic();
    }
  }

  const hitCooldown = new WeakMap();

  Events.on(engine, 'collisionStart', (evt) => {
    for(const pair of evt.pairs){
      const bodies = [pair.bodyA, pair.bodyB];
      const busHit = bodies.find(b => b.label === 'busPlayer' || b.label === 'busBot');
      const obstacle = bodies.find(b => b.label === 'bache' || b.label === 'tumulo' || b.label === 'traffic');
      if(!busHit || !obstacle) continue;

      const now = Date.now();
      if(hitCooldown.get(obstacle) && now - hitCooldown.get(obstacle) < 300) continue;
      hitCooldown.set(obstacle, now);

      // Antes esto era un Body.applyForce minúsculo, y cada frame el bucle
      // de scroll (más abajo) le volvía a fijar la velocidad al toque —
      // la fuerza nunca alcanzaba a separar al obstáculo del bus, así que
      // quedaba "pegado" viajando junto al bus o el bus lo atravesaba
      // visualmente. Ahora se le da una velocidad real de golpe (no una
      // fuerza) que lo empuja lejos del carril del bus, y se marca un
      // período de gracia (knockbackUntil) durante el cual el bucle de
      // scroll no le pisa la velocidad, para que el golpe se note.
      const hitBusX = (busHit === playerBody) ? player.x : bot.x;
      const pushDir = Math.sign(obstacle.position.x - hitBusX) || (Math.random() > 0.5 ? 1 : -1);
      const isTraffic = obstacle.label === 'traffic';
      const knockPower = isTraffic ? 1.4 : 1;
      Body.setVelocity(obstacle, {
        x: pushDir * (3.5 + Math.random() * 2.5) * knockPower,
        y: -(2 + Math.random() * 2) * knockPower
      });
      Body.setAngularVelocity(obstacle, (Math.random() - 0.5) * 0.5);
      obstacle.knockbackUntil = now + 400;

      const power = isTraffic ? 1.6 : 1;
      spawnImpact(obstacle.position.x, obstacle.position.y, power, isTraffic ? '#ff3b3b' : '#ffcc33');
      if(busHit === playerBody) {
        player.speed = isTraffic ? 1.5 : Math.max(1, player.speed - 3);
        flashDamage();
        triggerShake(power);
        playCrashSound(power);
      } else {
        bot.speed = isTraffic ? 1.5 : Math.max(1, bot.speed - 2.5);
      }
    }
  });

  // --- Choque entre buses: también dispara chispas/sacudida, para que se
  // sienta tan brusco como chocar contra un obstáculo del camino.
  let lastBusBumpAt = 0;

 let lastTime = null, physicsAccum = 0;
 const FIXED_STEP = 1000 / 60;

 function step(timestamp){
    if(!running || !isGameVisible) return;

    if (arriving) {
      stepArrival();
      if (running) rafId = requestAnimationFrame(step);
      return;
    }

    // Toda la simulación (velocidad del bus, distancia recorrida, spawns de
    // baches/pasajeros) está calibrada asumiendo 60 ticks por segundo. Antes
    // cada llamada de requestAnimationFrame corría exactamente un tick, así
    // que en pantallas de 90/120/144Hz (que llaman a RAF más seguido que
    // 60veces/s) el bus aceleraba y recorría la ruta mucho más rápido de lo
    // esperado. Ahora se desacopla la simulación del refresco de pantalla:
    // se acumula el tiempo real transcurrido y se corren tantos ticks fijos
    // de 16.667ms como corresponda (topado para no colgar el navegador tras
    // una pausa larga o una pestaña en segundo plano).
    if (lastTime === null) lastTime = timestamp;
    const frameTime = Math.min(Math.max(timestamp - lastTime, 0), 250);
    lastTime = timestamp;
    physicsAccum += frameTime;

    let ticks = 0;
    while (physicsAccum >= FIXED_STEP && ticks < 6 && !arriving) {
      simulateTick();
      physicsAccum -= FIXED_STEP;
      ticks++;
    }

    if (arriving) {
      rafId = requestAnimationFrame(step);
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    if (shakeMag > 0.1) {
      ctx.translate((Math.random() - 0.5) * shakeMag, (Math.random() - 0.5) * shakeMag);
    }
    drawRoad();

    Composite.allBodies(world).forEach(b => {
      if(b.label === 'bache') drawBache(b);
      else if(b.label === 'tumulo') drawTumulo(b);
      else if(b.label === 'traffic') drawTrafficCar(b);
    });
    passengers.forEach(drawPassenger);
    drawImpactParticles();

    drawBus(player.x, player.y, '#d62828', 'R-44');
    drawBus(bot.x, bot.y, '#003049', 'R-101D');
    drawPlayerArrow(player.x, player.y);
    drawSpeedometer(player.speed);
    ctx.restore();

    updateHud();
    rafId = requestAnimationFrame(step);
  }

  function simulateTick(){
    const speedMultiplier = player.speed;
    // El scroll visual va más rápido que antes (se "siente" más veloz) pero
    // la distancia recorrida (lo que decide cuándo se llega a la meta) usa
    // el mismo multiplicador de siempre, así que el tiempo real de llegada
    // no cambia — solo la sensación de velocidad.
    const visualSpeed = speedMultiplier * 0.8;

    roadY += visualSpeed;
    player.distance += speedMultiplier * 0.1;
    bot.distance += bot.speed * 0.1;

    spawnEntities();

    // En táctil no hay forma natural de "mantener presionada" una tecla de
    // acelerar, y el juego solo respondía al toque para cambiar de carril:
    // sin acelerador el bus nunca llegaba a la meta. En dispositivos
    // táctiles el bus acelera solo (como un endless-runner); el jugador
    // solo necesita tocar para esquivar cambiando de carril.
    if(keys['w'] || keys['arrowup'] || esTactilJuegos) {
      player.speed = Math.min(player.maxSpeed, player.speed + 0.08);
    } else if(keys['s'] || keys['arrowdown']) {
      player.speed = Math.max(0, player.speed - 0.15);
    } else {
      player.speed = Math.max(1, player.speed - 0.04);
    }

    player.targetX = lanePositions[player.lane];
    player.x += (player.targetX - player.x) * 0.22;

    if(bot.distance < targetDistance){
      bot.speed = Math.min(bot.maxSpeed, bot.speed + 0.06);
    }

    let botTargetLane = bot.lane;
    Composite.allBodies(world).forEach(item => {
      if((item.label === 'bache' || item.label === 'tumulo' || item.label === 'traffic')) {
        const itemLane = Math.round((item.position.x - laneWidth/2) / laneWidth);
        if(itemLane === bot.lane && Math.abs(item.position.y - bot.y) < 220) {
          if(bot.lane === 0) botTargetLane = 1;
          else if(bot.lane === lanesCount - 1) botTargetLane = lanesCount - 2;
          else botTargetLane = bot.lane + (Math.random() > 0.5 ? 1 : -1);
        }
      }
    });
    bot.lane = botTargetLane;
    bot.targetX = lanePositions[bot.lane];
    bot.x += (bot.targetX - bot.x) * 0.15;

    // --- Colisión entre buses: si ambos coinciden en el mismo carril y se acercan
    // demasiado, el que va más adelante (mayor distancia recorrida) empuja al otro
    // hacia un carril libre. El que es empujado no pierde velocidad, solo cambia de carril.
    const busMinGap = 30 * ENTITY_SCALE; // distancia horizontal mínima antes de considerarse "tocándose"
    if (player.lane === bot.lane && Math.abs(player.x - bot.x) < busMinGap) {
      const playerAhead = player.distance >= bot.distance;
      const now = Date.now();
      if (now - lastBusBumpAt > 350) {
        lastBusBumpAt = now;
        spawnImpact((player.x + bot.x) / 2, (player.y + bot.y) / 2, 1.3, '#ffcc33');
        triggerShake(1.1);
        playCrashSound(1.1);
      }
      if (playerAhead) {
        // El jugador va adelante: empuja al bot a un carril libre
        bot.lane = pushToFreeLane(bot.lane);
        bot.targetX = lanePositions[bot.lane];
      } else {
        // El bot va adelante: empuja al jugador a un carril libre
        player.lane = pushToFreeLane(player.lane);
        player.targetX = lanePositions[player.lane];
        player.speed = Math.max(1.5, player.speed - 1.2);
      }
    }

    Body.setPosition(playerBody, { x: player.x, y: player.y });
    Body.setPosition(botBody, { x: bot.x, y: bot.y });

    const nowTs = Date.now();
    Composite.allBodies(world).forEach(b => {
      // Mientras un obstáculo está en su ventana de golpe (recién chocado
      // contra un bus), se le deja conservar la velocidad del empujón en
      // vez de forzarlo de vuelta al ritmo del scroll — si no, nunca
      // alcanza a notarse el golpe y el bus lo atraviesa sin más.
      const inKnockback = b.knockbackUntil && nowTs < b.knockbackUntil;
      if(b.label === 'bache' || b.label === 'tumulo') {
        if(!inKnockback) Body.setVelocity(b, { x: b.velocity.x * 0.96, y: visualSpeed });
        if(b.position.y > canvas.height + 60) World.remove(world, b);
      } else if(b.label === 'traffic') {
        if(!inKnockback) Body.setVelocity(b, { x: b.velocity.x * 0.96, y: visualSpeed - (b.trafficSpeed * 0.5) });
        if(b.position.y > canvas.height + 60 || b.position.y < -250) World.remove(world, b);
      }
    });

    // Choque cosmético entre obstáculos: como comparten OBSTACLE_GROUP,
    // Matter nunca los empuja ni los descarrila al tocarse — si dos quedan
    // solapados solo se muestran chispas encima, sin tocar su velocidad ni
    // su carril, para no afectar al bus del jugador ni al del bot.
    const obstacleBodies = Composite.allBodies(world).filter(b => b.label === 'bache' || b.label === 'tumulo' || b.label === 'traffic');
    for (let i = 0; i < obstacleBodies.length; i++) {
      for (let j = i + 1; j < obstacleBodies.length; j++) {
        const oa = obstacleBodies[i], ob = obstacleBodies[j];
        const dx = oa.position.x - ob.position.x;
        const dy = oa.position.y - ob.position.y;
        const touchDist = 30 * ENTITY_SCALE;
        if ((dx * dx + dy * dy) < touchDist * touchDist) {
          if (!oa.obstacleCrashAt || nowTs - oa.obstacleCrashAt > 300) {
            oa.obstacleCrashAt = nowTs;
            ob.obstacleCrashAt = nowTs;
            spawnImpact((oa.position.x + ob.position.x) / 2, (oa.position.y + ob.position.y) / 2, 0.8, '#ffcc33');
          }
        }
      }
    }

    passengers.forEach((p, idx) => {
      p.y += visualSpeed;
      if(!p.collected && Math.abs(p.y - player.y) < 55) {
        if((p.x < 50 && player.lane === 0) || (p.x > canvas.width - 50 && player.lane === lanesCount - 1)) {
          p.collected = true;
          player.passengers++;
          player.speed = Math.min(player.maxSpeed + 2, player.speed + 1.8);
          spawnImpact(p.x, p.y, 0.6, '#ffe066');
          notifyTutorial('passenger');
          passengers.splice(idx, 1);
        }
      }
      if(p.y > canvas.height) passengers.splice(idx, 1);
    });

    stepImpactParticles();
    Engine.update(engine, FIXED_STEP);

    if(player.distance >= targetDistance || bot.distance >= targetDistance) {
      // En vez de cortar directo al resultado, entra a la escena de la
      // terminal mientras el bus ganador se parquea.
      arriving = true;
      arrivalTimer = 0;
      arrivalWinner = player.distance >= targetDistance ? 'player' : 'bot';
    }
  }

  // ── Escena de llegada a la terminal ──────────────────────────
  function stepArrival() {
    arrivalTimer += 16.667;

    // Los buses frenan y se acomodan uno junto al otro en la terminal.
    const parkY = canvas.height * 0.4;
    const parkXPlayer = lanePositions[1];
    const parkXBot = lanePositions[2];

    player.speed = Math.max(0, player.speed - 0.06);
    bot.speed = Math.max(0, bot.speed - 0.06);
    player.x += (parkXPlayer - player.x) * 0.05;
    player.y += (parkY - player.y) * 0.045;
    bot.x += (parkXBot - bot.x) * 0.05;
    bot.y += (parkY - bot.y) * 0.045;

    Body.setPosition(playerBody, { x: player.x, y: player.y });
    Body.setPosition(botBody, { x: bot.x, y: bot.y });

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTerminal(arrivalTimer);
    drawBus(player.x, player.y, '#d62828', 'R-44');
    drawBus(bot.x, bot.y, '#003049', 'R-101D');
    if (arrivalWinner === 'player') drawPlayerArrow(player.x, player.y);
    drawSpeedometer(player.speed);

    updateHud();

    if (arrivalTimer >= ARRIVAL_DURATION) {
      endRace(arrivalWinner);
    }
  }

  function drawTerminal(t) {
    // Piso de la terminal (concreto, no asfalto de calle)
    ctx.fillStyle = '#6b6f76';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#5a5e64';
    for (let y = -50 + (roadY % 60); y < canvas.height; y += 60) {
      ctx.fillRect(0, y, canvas.width, 3);
    }

    // Andenes / bahías de estacionamiento pintadas en el piso
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3;
    ctx.setLineDash([14, 10]);
    for (let i = 1; i < lanesCount; i++) {
      ctx.beginPath();
      ctx.moveTo(i * laneWidth, 0);
      ctx.lineTo(i * laneWidth, canvas.height);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Edificio / andén techado al fondo
    const roofH = Math.min(120, canvas.height * 0.16);
    ctx.fillStyle = '#8b6b3a';
    ctx.fillRect(0, 0, canvas.width, roofH);
    ctx.fillStyle = '#be8e56';
    ctx.fillRect(0, roofH - 8, canvas.width, 8);
    for (let i = 0; i < lanesCount; i++) {
      ctx.fillStyle = '#3a3a3a';
      ctx.fillRect(i * laneWidth + laneWidth * 0.15, 0, laneWidth * 0.7, roofH - 10);
    }

    // Letrero "TERMINAL"
    const fade = Math.min(1, t / 400);
    ctx.save();
    ctx.globalAlpha = fade;
    ctx.fillStyle = '#ffffff';
    ctx.font = `bold ${Math.max(14, canvas.width * 0.045)}px 'Fredoka', sans-serif`;
    ctx.textAlign = 'center';
    ctx.fillText(jt('jue.card3.terminalSign', '🚏 TERMINAL DE BUSES'), canvas.width / 2, roofH * 0.62);
    ctx.restore();
  }

  function drawRoad() {
    ctx.fillStyle = '#424242';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#8d8d8d';
    ctx.fillRect(0, 0, 15, canvas.height);
    ctx.fillRect(canvas.width - 15, 0, 15, canvas.height);

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 4;
    ctx.setLineDash([20, 30]);
    for(let i = 1; i < lanesCount; i++) {
      ctx.beginPath();
      ctx.moveTo(i * laneWidth, -100 + (roadY % 50));
      ctx.lineTo(i * laneWidth, canvas.height + 100);
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  function drawBus(x, y, color, label) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(ENTITY_SCALE, ENTITY_SCALE);
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(-17, -35, 34, 80);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(-15, -40, 30, 75, 4);
    ctx.fill();
    ctx.fillStyle = '#a5f3fc';
    ctx.fillRect(-12, -35, 24, 12);
    ctx.fillStyle = '#ffeb3b';
    ctx.beginPath();
    ctx.arc(-11, -39, 3, 0, Math.PI*2);
    ctx.arc(11, -39, 3, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.fillRect(-8, -21, 16, 5);
    ctx.fillStyle = '#00e676';
    ctx.font = 'bold 5px Courier New';
    ctx.textAlign = 'center';
    ctx.fillText(label, 0, -17);
    ctx.fillRect(-14, -6, 4, 35);
    ctx.fillRect(10, -6, 4, 35);
    ctx.restore();
  }

  // Flecha que señala cuál bus es el que maneja el jugador (Ruta 44),
  // para no perderlo de vista entre el tráfico y el bus rival.
  function drawPlayerArrow(x, y) {
    const bounce = Math.sin(Date.now() / 220) * 4;
    const arrowY = y - 40 * ENTITY_SCALE - 14 + bounce;
    ctx.save();
    ctx.translate(x, arrowY);
    ctx.fillStyle = '#ffd600';
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(-8, -4);
    ctx.lineTo(-3, -4);
    ctx.lineTo(-3, -13);
    ctx.lineTo(3, -13);
    ctx.lineTo(3, -4);
    ctx.lineTo(8, -4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  // Obstáculos = "malos": halo rojo de peligro pulsante para que se
  // distingan del camino de un vistazo, aunque estén quietos en el asfalto.
  function drawDangerHalo(radiusX, radiusY) {
    const pulse = 0.55 + Math.sin(Date.now() / 160) * 0.25;
    ctx.save();
    ctx.globalAlpha = pulse;
    ctx.strokeStyle = '#ff2d2d';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = '#ff2d2d';
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawBache(b) {
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(b.angle);
    ctx.scale(ENTITY_SCALE, ENTITY_SCALE);
    drawDangerHalo(22, 14);
    ctx.fillStyle = '#222222';
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 10, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,45,45,.65)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }

  function drawTumulo(b) {
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(b.angle);
    ctx.scale(ENTITY_SCALE, ENTITY_SCALE);
    drawDangerHalo(26, 10);
    ctx.fillStyle = '#ffb300';
    ctx.fillRect(-22, -4, 44, 8);
    ctx.fillStyle = '#000000';
    for(let i = -18; i <= 18; i += 10) {
      ctx.fillRect(i, -4, 4, 8);
    }
    ctx.restore();
  }

  // Pasajeros = "puntos buenos": brillo dorado pulsante bien visible contra
  // el asfalto, para que se noten a la distancia y no se confundan con nada.
  function drawPassenger(p) {
    const pulse = 0.7 + Math.sin(Date.now() / 140 + p.x) * 0.3;
    ctx.save();
    ctx.globalAlpha = pulse;
    ctx.fillStyle = 'rgba(255, 230, 102, .5)';
    ctx.shadowColor = '#ffe066';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(p.x, p.y, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.shadowColor = '#ffe066';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#ff5722';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 6, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#ffe066';
    ctx.beginPath();
    ctx.arc(p.x, p.y - 4, 4, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }

  function drawTrafficCar(b) {
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(b.angle);
    ctx.scale(ENTITY_SCALE, ENTITY_SCALE);
    drawDangerHalo(20, 26);
    ctx.fillStyle = b.trafficColor || '#3a86c8';
    ctx.beginPath();
    ctx.roundRect(-12, -22, 24, 44, 3);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,45,45,.7)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }

  // Velocímetro chico en la esquina inferior derecha: la velocidad en km/h
  // se calcula a partir de la velocidad interna del bus (no es un valor fijo),
  // con una leve vibración en la aguja para que se sienta como un instrumento
  // real y no un número estático.
  function drawSpeedometer(speedUnits) {
    const r = Math.max(24, Math.min(42, canvas.width * 0.05));
    const cx = canvas.width - r - 12;
    const cy = canvas.height - r - 12;

    const jitter = Math.sin(Date.now() / 90) * 1.2;
    const kmh = Math.max(0, Math.round(speedUnits * 11 + jitter));
    const maxKmh = Math.round(player.maxSpeed * 11 + 6);
    const pct = Math.min(1, kmh / maxKmh);

    const startAngle = Math.PI * 0.75;
    const endAngle = Math.PI * 2.25;
    const needleAngle = startAngle + (endAngle - startAngle) * pct;

    ctx.save();
    ctx.globalAlpha = 0.92;

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(10,10,15,0.65)';
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#ffd700';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, r - 6, startAngle, endAngle);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, r - 6, startAngle, needleAngle);
    ctx.strokeStyle = pct > 0.85 ? '#ff5252' : '#00e676';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(needleAngle) * (r - 10), cy + Math.sin(needleAngle) * (r - 10));
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.font = `bold ${Math.max(10, r * 0.32)}px 'Fredoka', sans-serif`;
    ctx.fillText(String(kmh), cx, cy + r * 0.05);
    ctx.font = `${Math.max(7, r * 0.18)}px 'Fredoka', sans-serif`;
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.fillText('km/h', cx, cy + r * 0.38);

    ctx.restore();
  }

  function endRace(winner) {
    running = false;
    cancelAnimationFrame(rafId);

    let title, msg;
    if(winner === 'player') {
      title = jt('jue.card3.end.winTitle', '🏆 ¡VICTORIA TOTAL!');
      msg = jt('jue.card3.end.winMsg', '¡La Ruta 44 llegó primero! Recogiste a <b>{n}</b> pasajeros en el camino.').replace('{n}', player.passengers);
    } else {
      title = jt('jue.card3.end.loseTitle', '🏁 Te ganaron el pasaje...');
      msg = jt('jue.card3.end.loseMsg', 'La 101-D llegó primero esta vez. ¡Cuidado con los baches en la próxima!');
    }

    const distanciaId = targetDistance <= 1000 ? 'express' : targetDistance <= 2500 ? 'normal' : 'costaacosta';
    const gameName = `coasters-${distanciaId}`;
    const gano = winner === 'player' ? 1 : 0;

    showOverlay(`
      <span class="overlay-tag">${jt('jue.card3.end.tag', 'Fin de la Carrera')}</span>
      <h3>${title}</h3>
      <p>${msg}</p>
      <p class="overlay-best-score" id="p-best-score-coasters"></p>
      <button class="btn-primary" id="btn-restart-coasters">${jt('jue.rematch', 'Revancha')}</button>
    `);
    document.getElementById('btn-restart-coasters').onclick = showModeSelector;

    guardarPuntajeJuego(gameName, gano).then(() => {
      obtenerMejorPuntajeJuego(gameName).then((best) => {
        const el = document.getElementById('p-best-score-coasters');
        if (el && best && best.score >= 1) el.textContent = jt('jue.bestScore.won', '¡Ya ganaste esta ruta antes!');
      });
    });
  }

  function showDistanceSelector() {
    showOverlay(`
      <span class="overlay-tag">${jt('jue.card2.configTag', 'Configuración')}</span>
      <h3>${jt('jue.card3.distance.title', '🏁 Elige la Distancia')}</h3>
      <p>${jt('jue.card3.distance.sub', '¿Qué tan largo será el trayecto?')}</p>
      <div class="difficulty-buttons" style="display: flex; flex-direction: column; gap: 10px;">
        <button class="btn-primary" id="dist-1">${jt('jue.card3.distExpress', 'Express (1000m)')}</button>
        <button class="btn-primary" id="dist-2">${jt('jue.card3.distNormal', 'Normal (2500m)')}</button>
        <button class="btn-primary" id="dist-3">${jt('jue.card3.distCoast', 'Costa a Costa (5000m)')}</button>
      </div>
    `);

    document.getElementById('dist-1').onclick = () => { selectDistance(1000); };
    document.getElementById('dist-2').onclick = () => { selectDistance(2500); };
    document.getElementById('dist-3').onclick = () => { selectDistance(5000); };
  }

  function selectDistance(dist) {
    targetDistance = dist;
    showDifficultySelector();
  }

  function showDifficultySelector() {
    showOverlay(`
      <button type="button" class="btn-back-selector" id="btn-back-diff-coasters">${jt('jue.back', '← Atrás')}</button>
      <span class="overlay-tag">${jt('jue.diff.tag', 'Dificultad')}</span>
      <h3>${jt('jue.card3.diff.title', '🚦 ¿Qué tan veloz es tu rival?')}</h3>
      <p>${jt('jue.card3.diff.sub', 'Ajusta el nivel del motorista oponente.')}</p>
      <div class="difficulty-buttons">
        <button class="difficulty-btn easy" id="btn-easy-coasters">
          ${jt('jue.card3.diff.easy', '🟢 Tranquilo')}
          <div class="difficulty-desc">${jt('jue.card3.diff.easyDesc', 'Va despacio')}</div>
        </button>
        <button class="difficulty-btn medium" id="btn-medium-coasters">
          ${jt('jue.card3.diff.medium', '🟡 Apurado')}
          <div class="difficulty-desc">${jt('jue.card3.diff.medDesc', 'Busca rebasarte')}</div>
        </button>
        <button class="difficulty-btn hard" id="btn-hard-coasters">
          ${jt('jue.card3.diff.hard', '🔴 Hora Pico')}
          <div class="difficulty-desc">${jt('jue.card3.diff.hardDesc', 'Maneja a lo loco')}</div>
        </button>
      </div>`);

    document.getElementById('btn-back-diff-coasters').onclick = showDistanceSelector;

    document.getElementById('btn-easy-coasters').onclick = () => { startGame('easy'); };
    document.getElementById('btn-medium-coasters').onclick = () => { startGame('medium'); };
    document.getElementById('btn-hard-coasters').onclick = () => { startGame('hard'); };
  }

  function startGame(difficulty) {
    botDifficulty = difficulty;
    resetGame();
    hideOverlay();

    // Si ya había un bucle de animación corriendo (p. ej. por un doble
    // toque en el botón, muy común en móvil/tablet), lo cancelamos antes
    // de arrancar uno nuevo. Si no, quedaban dos bucles avanzando el
    // reloj/física del juego a la vez y la partida se sentía mucho más
    // corta e irregular de lo esperado.
    cancelAnimationFrame(rafId);
    running = true;
    paused = false;
    playMusic();

    lastTime = null;
    physicsAccum = 0;
    rafId = requestAnimationFrame(step);
  }

  function showModeSelector() {
    showOverlay(`
      <span class="overlay-tag">${jt('jue.card3.prepareMotorTag', 'Preparar Motor')}</span>
      <h3>🚌 ${jt('jue.card3.titleModal2', 'Guerra de Coasters SV')}</h3>
      <p>${jt('jue.card3.intro', 'Manejá tu bus para llegar antes que la Ruta 101-D. Esquivá baches y recogé pasajeros en el camino.')}</p>
      <p class="rules-title">${jt('jue.controls.title', 'Controles')}</p>
      <ul class="rules-list">
        ${esTactilJuegos ? `
        <li class="rule-good"><span class="rule-icon">👆</span> ${jt('jue.card3.controlsTapLane', 'El bus acelera solo. Tocá directamente el <strong>carril</strong> al que querés moverte.')}</li>
        ` : `
        <li class="rule-good"><span class="rule-icon">🎮</span> ${jt('jue.card3.controlsAccel', '<strong>W</strong> o flecha arriba: acelerar. <strong>S</strong> o flecha abajo: frenar.')}</li>
        <li class="rule-good"><span class="rule-icon">🎮</span> ${jt('jue.card3.controlsLane', '<strong>A</strong>/<strong>D</strong> o flechas ⬅️➡️: cambiar de carril.')}</li>
        `}
      </ul>
      <button class="btn-primary" id="btn-start-coasters">${jt('jue.next', 'Siguiente')}</button>
      <button class="btn-tutorial" id="btn-tutorial-coasters">🎓 ${jt('jue.tutorial.start', 'Tutorial (practicar primero)')}</button>
    `);
    document.getElementById('btn-start-coasters').onclick = showDistanceSelector;
    document.getElementById('btn-tutorial-coasters').onclick = startTutorial;
  }

  const pauseBtn = document.getElementById('pauseBtn-coasters');
  const pauseIcon = document.getElementById('pauseIcon-coasters');
  const pauseOverlay = document.getElementById('pauseOverlay-coasters');
  const resumeBtn = document.getElementById('resumeBtn-coasters');
  const menuBtn = document.getElementById('menuBtn-coasters');

  function pauseGame() {
    if(!running) return;
    running = false;
    paused = true;
    cancelAnimationFrame(rafId);
    if (bgMusic) {
      savedVolume = bgMusic.volume;
      bgMusic.volume = 0.1;
    }
    canvasWrap?.classList.add('is-paused');
    pauseOverlay?.classList.remove('hidden');
    if(pauseIcon) pauseIcon.textContent = '▶️';
    if (tutorialMode) hideTutorialBubble();
  }

  function resumeGame() {
    if(!paused) return;
    paused = false;
    running = true;
    lastTime = null;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    if (bgMusic) {
      bgMusic.volume = savedVolume || volume;
      if (volume > 0) bgMusic.play().catch(()=>{});
    }
    if (tutorialMode && tutorialStep >= 0) showTutorialStep(tutorialStep);
    rafId = requestAnimationFrame(step);
  }

  function returnToMenu() {
    running = false;
    paused = false;
    tutorialMode = false;
    hideTutorialBubble();
    cancelAnimationFrame(rafId);
    // bgMusic?.pause();  // ELIMINADO
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    showModeSelector();
  }

  pauseBtn?.addEventListener('click', () => {
    if(paused) resumeGame();
    else pauseGame();
  });
  resumeBtn?.addEventListener('click', resumeGame);
  menuBtn?.addEventListener('click', returnToMenu);

  showModeSelector();

  gameContent?.addEventListener('gameVisible', (e) => {
    if(e.detail.gameId === 'coasters') {
      isGameVisible = true;
      resizeCanvas();
      playMusic();
      if(paused && running) resumeGame();
      else if(running) { lastTime = null; rafId = requestAnimationFrame(step); }
    }
  });

  window.switchGameState('coasters', {
    pause: pauseGame,
    resume: resumeGame,
    stop: stopMusic,
    running: () => running,
    paused: () => paused,
    setVisible: (visible) => { isGameVisible = visible; },
    reloadMenu: showModeSelector
  });
})();

/* ---------------------------------------------------------
   JUEGO 4: LA MICA (JUEGO TRADICIONAL SALVADOREÑO)
   - Campo abierto con árboles, bancas y arbustos.
   - Pasa la mica tocando a otros niños y escapa de quien la lleve.
   - Conos de visión y áreas de audición en tiempo real.
   - Modos de tiempo: 20s, 40s y 60s (1 minuto).
--------------------------------------------------------- */
(function initGameEncantados() {
  const canvas = document.getElementById('canvas-encantados');
  if (!canvas || typeof Matter === 'undefined') return;

  const ctx = canvas.getContext('2d');
  const hud = document.getElementById('hud-encantados');
  const overlay = document.getElementById('overlay-encantados');
  const overlayCard = document.getElementById('overlay-card-encantados');
  const gameContent = document.getElementById('modal-encantados');
  const canvasWrap = document.getElementById('encantados-canvas-wrap');
  const popupsLayer = document.getElementById('mica-popups');

    function showOverlay(html){
    overlayCard.innerHTML = html;
    overlay.classList.remove('hidden');
    overlay.style.backdropFilter = 'none';
    overlay.style.webkitBackdropFilter = 'none';

    if(window.gsap){
      gsap.fromTo(overlayCard,
        { autoAlpha: 0, y: 18, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.5)' }
      );
      gsap.fromTo(overlay,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: 'power1.out' }
      );
    } else {
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
    }
  }

  function hideOverlay(){
    if(window.gsap){
      gsap.to(overlayCard, { autoAlpha: 0, y: -12, scale: 0.97, duration: 0.25, ease: 'power1.in' });
      gsap.to(overlay, { autoAlpha: 0, duration: 0.25, ease: 'power1.in', onComplete: () => { overlay.classList.add('hidden'); overlay.style.pointerEvents = ''; } });
    } else {
      overlay.classList.add('hidden');
    }
  }

  const { Engine, World, Bodies, Body, Events, Composite } = Matter;

  let isGameVisible = false;
  let running = false;
  let paused = false;
  let rafId = null;
  let lastTime = null;

  // Selected time limit (20, 40, or 60 seconds)
  let selectedTimeLimit = 40;
  let timeLeft = 40;
  let score = 0;
  let timesPassedMica = 0;
  let timesCarriedMica = 0;
  let timeWithoutMica = 0;

  // Entities
  let player = null;
  let kids = [];
  let obstacles = [];
  let particles = [];

  // Who carries the Mica? (0 = player, 1..N = NPC kids)
  let micaBearerIndex = 1; // Start with an NPC holding the mica
  let immunityTimer = 0; // Grace period after passing mica

  // Antes, apenas alguien recibía la mica, lo más común es que la persona
  // que se la acababa de pasar siguiera siendo el objetivo más cercano/
  // visible, así que el nuevo "que la trae" la perseguía de inmediato y
  // se la devolvía enseguida: dos NPCs quedaban pasándosela en bucle sin
  // que nadie más entrara en juego. Guardamos quién la traía justo antes
  // y lo ignoramos como objetivo por un ratito para forzar a que el que
  // ahora la tiene busque a alguien más.
  let previousBearerIndex = -1;
  let avoidPrevBearerTimer = 0;

  // En celular el campo de juego es más chico en relación al tamaño de
  // los personajes, así que las mismas velocidades se sienten mucho más
  // frenéticas que en escritorio. Bajamos un poco el ritmo general del
  // juego (caminata, persecución y huida) solo quienes juegan táctil.
  const MICA_SPEED_MULT = esTactilJuegos ? 0.72 : 1;

  // Input tracking
  let keys = {};
  let touchJoystick = { x: 0, y: 0, active: false };

  // ================= MODO TUTORIAL =================
  let tutorialMode = false;
  let tutorialStep = -1;
  let tutorialWaiting = false;
  const tutorialSteps = [
    { action: 'move', text: () => esTactilJuegos
        ? jt('jue.tutorial.mica.move.tap', 'Arrastrá el dedo desde tu personaje para moverte hacia ahí. ¡Probalo!')
        : jt('jue.tutorial.mica.move.key', 'Usá WASD/flechas, o movete hacia donde apunta el mouse. ¡Probalo!') },
    { action: 'tag', text: () => jt('jue.tutorial.mica.tag', 'Vos tenés la mica. Acercate al amiguito y tocalo para pasársela.') }
  ];

  function tutorialBubble(html) {
    let el = canvasWrap?.querySelector('.tutorial-bubble');
    if (!el && canvasWrap) {
      el = document.createElement('div');
      el.className = 'tutorial-bubble';
      canvasWrap.appendChild(el);
    }
    if (el) el.innerHTML = html;
  }
  function hideTutorialBubble() { canvasWrap?.querySelector('.tutorial-bubble')?.remove(); }

  function showTutorialStep(i) {
    tutorialStep = i;
    if (i >= tutorialSteps.length) { finishTutorial(); return; }
    tutorialWaiting = true;
    const n = i + 1, total = tutorialSteps.length;
    tutorialBubble(`
      <span class="tutorial-bubble__tag">🎓 ${jt('jue.tutorial.tag', 'Tutorial')} ${n}/${total}</span>
      <p>${tutorialSteps[i].text()}<span class="tutorial-pulse"></span></p>
    `);
    if (tutorialSteps[i].action === 'tag' && player && kids[0]) {
      micaBearerIndex = 0; // te dan la mica a vos para practicar cómo pasarla
      immunityTimer = 0;
      previousBearerIndex = -1;
      avoidPrevBearerTimer = 0;
      Body.setPosition(kids[0], { x: player.position.x + 110, y: player.position.y });
      Body.setVelocity(kids[0], { x: 0, y: 0 });
    }
  }

  function notifyTutorial(action) {
    if (!tutorialMode || !tutorialWaiting) return;
    if (tutorialSteps[tutorialStep].action !== action) return;
    tutorialWaiting = false;
    tutorialBubble(`<span class="tutorial-bubble__tag good">✅ ${jt('jue.tutorial.good', '¡Bien hecho!')}</span>`);
    setTimeout(() => { if (tutorialMode) showTutorialStep(tutorialStep + 1); }, 1000);
  }

  function finishTutorial() {
    tutorialMode = false;
    hideTutorialBubble();
    running = false;
    cancelAnimationFrame(rafId);
    showOverlay(`
      <span class="overlay-tag">🎉 ${jt('jue.tutorial.doneTag', 'Tutorial completo')}</span>
      <h3>${jt('jue.tutorial.doneTitle', '¡Ya sabés jugar a la mica!')}</h3>
      <p>${jt('jue.tutorial.doneText', 'Ahora vamos a la ronda de verdad: elegí la duración.')}</p>
      <button class="btn-primary" id="btn-tutorial-done-mica">🏃 ${jt('jue.tutorial.playReal', 'Jugar de verdad')}</button>
    `);
    document.getElementById('btn-tutorial-done-mica').onclick = showTimeSelector;
  }

  function startTutorial() {
    startGame(999999);
    tutorialMode = true;
    showTutorialStep(0);
  }

  // Canvas resizing. Antes, al entrar en pantalla completa se reusaba la
  // resolución chica de la ventana normal y el navegador solo la estiraba
  // (se veía borrosa/pixelada). Ahora medimos siempre el tamaño real del
  // canvas; como el resize ya dispara setupArena(), el fullscreen queda nítido.
  function resizeCanvas() {
    const wrap = canvasWrap || canvas.closest('.canvas-wrap');
    const rect = wrap ? wrap.getBoundingClientRect() : canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  resizeCanvas();
  window.addEventListener('resize', () => { resizeCanvas(); setupArena(); });
  document.addEventListener('fullscreenchange', () => setTimeout(() => { resizeCanvas(); setupArena(); }, 100));
  document.addEventListener('webkitfullscreenchange', () => setTimeout(() => { resizeCanvas(); setupArena(); }, 100));

  const fsBtn = canvasWrap?.querySelector('.fullscreen-btn');
  if (fsBtn) {
    fsBtn.addEventListener('click', () => {
      const isCurrent = document.fullscreenElement === canvasWrap || document.webkitFullscreenElement === canvasWrap;
      if (!isCurrent) {
        const req = canvasWrap.requestFullscreen || canvasWrap.webkitRequestFullscreen || canvasWrap.msRequestFullscreen;
        req?.call(canvasWrap);
      } else {
        const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
        exit?.call(document);
      }
    });
  }

  // ================= SOUND ENGINE (WEB AUDIO) =================
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioCtx = new AudioCtx();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  function playSFX(type) {
    if (volume <= 0) return;
    try {
      const actx = getAudioContext();
      if (!actx) return;
      const t = actx.currentTime;

      if (type === 'tag') {
        // Tag whoosh & hit
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, t);
        osc.frequency.exponentialRampToValueAtTime(880, t + 0.12);
        gain.gain.setValueAtTime(0.35 * volume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start(t);
        osc.stop(t + 0.26);
      } else if (type === 'alert') {
        // Spotted / Heard alert chime
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(659.25, t); // E5
        osc.frequency.setValueAtTime(987.77, t + 0.08); // B5
        gain.gain.setValueAtTime(0.25 * volume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start(t);
        osc.stop(t + 0.32);
      } else if (type === 'win') {
        // Victory fanfare
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const osc = actx.createOscillator();
          const gain = actx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, t + idx * 0.12);
          gain.gain.setValueAtTime(0.3 * volume, t + idx * 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.12 + 0.4);
          osc.connect(gain);
          gain.connect(actx.destination);
          osc.start(t + idx * 0.12);
          osc.stop(t + idx * 0.12 + 0.45);
        });
      }
    } catch(e){}
  }

  // ================= GSAP POPUPS =================
  function showSlangCallout(text, x, y, color = '#ffd700') {
    const layer = popupsLayer || canvasWrap;
    if (!layer) return;

    const el = document.createElement('div');
    el.className = 'torito-slang-popup';
    el.innerText = text;
    el.style.left = `${x || canvas.width / 2}px`;
    el.style.top = `${y || canvas.height / 2}px`;
    el.style.color = color;
    layer.appendChild(el);

    if (window.gsap) {
      const rot = (Math.random() - 0.5) * 24;
      gsap.timeline({ onComplete: () => el.remove() })
        .fromTo(el, { scale: 0.3, opacity: 0, rotation: rot }, { scale: 1.2, opacity: 1, duration: 0.2, ease: 'back.out(2)' })
        .to(el, { y: -45 - Math.random() * 25, duration: 0.5, ease: 'power1.out' })
        .to(el, { opacity: 0, scale: 0.6, duration: 0.25, ease: 'power2.in' }, '-=0.15');
    } else {
      setTimeout(() => el.remove(), 700);
    }
  }

  // ================= HUD & MUSIC =================
  const bgMusic = document.getElementById('bgMusic-encantados');
  const volumeSlider = document.getElementById('volumeSlider-encantados');
  const volumeIcon = document.getElementById('volumeIcon-encantados');
  const damageOverlay = document.getElementById('damageOverlay-encantados');
  let volume = Number(volumeSlider?.value || 0.25);
  let savedVolume = volume;

  if (bgMusic) {
    bgMusic.volume = volume;
    bgMusic.muted = false;
  }

  volumeSlider?.addEventListener('input', (event) => {
    volume = Number(event.target.value);
    if (bgMusic) {
      bgMusic.volume = volume;
      bgMusic.muted = volume <= 0;
    }
    if (volumeIcon) volumeIcon.textContent = volume <= 0 ? '🔇' : volume < 0.35 ? '🔉' : '🔊';
  });

  function playMusic() {
    if (!bgMusic) return;
    bgMusic.muted = false;
    bgMusic.volume = volume;
    bgMusic.play().catch(() => {});
  }
  function stopMusic() { if (bgMusic) { bgMusic.pause(); bgMusic.currentTime = 0; } }

  function flashDamage() {
    if (!damageOverlay) return;
    damageOverlay.style.opacity = '1';
    setTimeout(() => { damageOverlay.style.opacity = '0'; }, 150);
  }

  function updateHud() {
    const isPlayerMica = (micaBearerIndex === 0);
    hud.innerHTML = `
      <div class="mica-hud-badge ${isPlayerMica ? 'has-mica' : 'safe'}">
        <span>${isPlayerMica ? jt('jue.card4.hudHasMica', '🔥 ¡LLEVÁS LA MICA!') : jt('jue.card4.hudSafe', '🛡️ ¡ESTÁS A SALVO!')}</span>
      </div>
      <div class="mica-time-box">
        <span>⏳ ${tutorialMode ? '∞' : Math.max(0, Math.ceil(timeLeft))}s</span>
      </div>
      <div class="torito-hud-bar-container">
        <span class="torito-hud-label">⭐ <b>${Math.round(score)} pts</b></span>
      </div>`;
  }

  // ================= MATTER.JS ENGINE & ARENA SETUP =================
  const engine = Engine.create();
  engine.gravity.y = 0;
  const world = engine.world;

  let boundaryWalls = [];

  function setupArena() {
    Composite.clear(world, false);
    boundaryWalls = [];
    obstacles = [];

    const wallThickness = 40;
    const w = canvas.width;
    const h = canvas.height;

    // Outer Field Boundaries
    const top = Bodies.rectangle(w / 2, -wallThickness / 2, w + 100, wallThickness, { isStatic: true });
    const bottom = Bodies.rectangle(w / 2, h + wallThickness / 2, w + 100, wallThickness, { isStatic: true });
    const left = Bodies.rectangle(-wallThickness / 2, h / 2, wallThickness, h + 100, { isStatic: true });
    const right = Bodies.rectangle(w + wallThickness / 2, h / 2, wallThickness, h + 100, { isStatic: true });

    boundaryWalls = [top, bottom, left, right];
    World.add(world, boundaryWalls);

    // Natural Obstacles in the Salvadoran Field (Trees & Benches)
    const treeCoords = [
      { x: w * 0.25, y: h * 0.3, r: 24, type: 'maquilishuat' },
      { x: w * 0.75, y: h * 0.3, r: 24, type: 'maquilishuat' },
      { x: w * 0.5,  y: h * 0.5, r: 28, type: 'conacaste' },
      { x: w * 0.25, y: h * 0.72, r: 22, type: 'bush' },
      { x: w * 0.75, y: h * 0.72, r: 22, type: 'bush' }
    ];

    treeCoords.forEach(t => {
      const body = Bodies.circle(t.x, t.y, t.r, { isStatic: true, label: 'tree' });
      body.treeType = t.type;
      body.radius = t.r;
      obstacles.push(body);
      World.add(world, body);
    });

    // Park benches
    const bench1 = Bodies.rectangle(w * 0.5, h * 0.22, 54, 18, { isStatic: true, label: 'bench' });
    const bench2 = Bodies.rectangle(w * 0.5, h * 0.78, 54, 18, { isStatic: true, label: 'bench' });
    obstacles.push(bench1, bench2);
    World.add(world, [bench1, bench2]);

    initCharacters();
  }

  function initCharacters() {
    const w = canvas.width;
    const h = canvas.height;

    // 1. Create Player (Entity 0)
    const pBody = Bodies.circle(w * 0.15, h * 0.5, 15, {
      frictionAir: 0.08,
      restitution: 0.5,
      label: 'player'
    });
    pBody.angleFacing = 0;
    pBody.speedCurrent = 0;
    pBody.name = jt('jue.card4.you', 'Vos');
    player = pBody;
    World.add(world, player);

    // 2. Create 4 NPC Kids (Entities 1..4)
    kids = [];
    const npcConfigs = [
      { name: 'Chepe', color: '#ff3d00', x: w * 0.85, y: h * 0.5, shirt: '#ff5722' },
      { name: 'Sofía', color: '#00e5ff', x: w * 0.65, y: h * 0.25, shirt: '#ff4081' },
      { name: 'Mateo', color: '#ffd600', x: w * 0.35, y: h * 0.75, shirt: '#00c853' },
      { name: 'Andrea', color: '#7c4dff', x: w * 0.8,  y: h * 0.8,  shirt: '#7c4dff' }
    ];

    npcConfigs.forEach((cfg, idx) => {
      const npcBody = Bodies.circle(cfg.x, cfg.y, 15, {
        frictionAir: 0.08,
        restitution: 0.5,
        label: `npc_${idx + 1}`
      });
      npcBody.index = idx + 1;
      npcBody.name = cfg.name;
      npcBody.color = cfg.color;
      npcBody.shirt = cfg.shirt;
      npcBody.angleFacing = Math.random() * Math.PI * 2;
      npcBody.state = 'WANDERING'; // 'WANDERING', 'CHASING', 'FLEEING'
      npcBody.alertTimer = 0;
      npcBody.wanderTimer = Math.random() * 60;
      npcBody.targetAngle = npcBody.angleFacing;
      kids.push(npcBody);
      World.add(world, npcBody);
    });
  }

  // ================= VELOCITY CLAMP (evita bugueos y velocidades irreales) =================
  function clampVelocity(body, maxSpeed) {
    const vx = body.velocity.x;
    const vy = body.velocity.y;
    const speed = Math.sqrt(vx * vx + vy * vy);
    if (speed > maxSpeed) {
      const scale = maxSpeed / speed;
      Body.setVelocity(body, { x: vx * scale, y: vy * scale });
    }
  }

  // Antes los NPCs solo cambiaban de rumbo cuando expiraba wanderTimer, sin
  // importar hacia dónde estuvieran caminando: si ese rumbo apuntaba a una
  // pared, se quedaban empujando contra ella (patinando pegados al borde)
  // hasta que el timer volviera a cero. Con esto, en cuanto detectan pared
  // cerca en la dirección en la que van, giran de inmediato hacia el centro
  // de la cancha (con algo de variación) a "buscar" en otro lado, en vez de
  // seguir de frente contra el muro.
  const WALL_LOOKAHEAD = 55;
  const WALL_MARGIN = 45;
  function isFacingWall(npc) {
    const nx = npc.position.x + Math.cos(npc.angleFacing) * WALL_LOOKAHEAD;
    const ny = npc.position.y + Math.sin(npc.angleFacing) * WALL_LOOKAHEAD;
    return nx < WALL_MARGIN || nx > canvas.width - WALL_MARGIN ||
           ny < WALL_MARGIN || ny > canvas.height - WALL_MARGIN;
  }

  // ================= VISION & HEARING SENSING =================

  // Check if target is inside the observer's 75° Vision Cone
  function canSeeTarget(observer, target, coneAngle = Math.PI * 0.42, maxDist = 180) {
    const dx = target.position.x - observer.position.x;
    const dy = target.position.y - observer.position.y;
    const distSq = dx * dx + dy * dy;

    if (distSq > maxDist * maxDist) return false;

    // Check angle difference
    const angleToTarget = Math.atan2(dy, dx);
    let diff = angleToTarget - (observer.angleFacing || 0);
    while (diff < -Math.PI) diff += Math.PI * 2;
    while (diff > Math.PI) diff -= Math.PI * 2;

    if (Math.abs(diff) > coneAngle / 2) return false;

    // Check line-of-sight raycast against solid trees/benches
    const dist = Math.sqrt(distSq);
    const steps = 6;
    for (let i = 1; i < steps; i++) {
      const testX = observer.position.x + (dx / dist) * (dist * (i / steps));
      const testY = observer.position.y + (dy / dist) * (dist * (i / steps));
      for (const obs of obstacles) {
        if (obs.circleRadius) {
          const odx = testX - obs.position.x;
          const ody = testY - obs.position.y;
          if (odx * odx + ody * ody < obs.circleRadius * obs.circleRadius) return false; // Blocked by tree!
        }
      }
    }

    return true;
  }

  // Check if observer hears target's footsteps/running
  function canHearTarget(observer, target, maxDist = 115) {
    const dx = target.position.x - observer.position.x;
    const dy = target.position.y - observer.position.y;
    const distSq = dx * dx + dy * dy;

    if (distSq > maxDist * maxDist) return false;

    // Target is heard if running or moving with speed > 1.0
    const targetSpeed = Math.sqrt(target.velocity.x * target.velocity.x + target.velocity.y * target.velocity.y);
    return targetSpeed > 0.8;
  }

  // ================= MICA TRANSFER LOGIC =================
  function transferMica(fromIndex, toIndex) {
    if (immunityTimer > 0 || fromIndex === toIndex) return;
    micaBearerIndex = toIndex;
    immunityTimer = 100; // ~1.6s grace period
    previousBearerIndex = fromIndex;
    avoidPrevBearerTimer = 220; // ~3.5s ignorando a quien se la acaba de pasar

    const allEntities = [player, ...kids];
    const newBearer = allEntities[toIndex];
    const prevBearer = allEntities[fromIndex];

    playSFX('tag');
    createParticles(newBearer.position.x, newBearer.position.y, 22);

    if (fromIndex === 0) notifyTutorial('tag');

    if (toIndex === 0) {
      // Player received the mica!
      timesCarriedMica++;
      flashDamage();
      showSlangCallout(jt('jue.card4.calloutReceived', '¡TE PASARON LA MICA! 🔥'), newBearer.position.x, newBearer.position.y, '#ff1744');
    } else {
      // An NPC received the mica!
      if (fromIndex === 0) {
        timesPassedMica++;
        score += 350;
        showSlangCallout(jt('jue.card4.calloutSaved', '¡TE SALVASTE! 🏃💨'), prevBearer.position.x, prevBearer.position.y, '#00e676');
      } else {
        const calloutTpl = jt('jue.card4.calloutNpcHasMica', '¡{name} lleva la mica!');
        showSlangCallout(calloutTpl.replace('{name}', newBearer.name), newBearer.position.x, newBearer.position.y, '#ffea00');
      }
    }
  }

  // ================= INPUT HANDLING =================
  window.addEventListener('keydown', e => {
    keys[e.key.toLowerCase()] = true;
    if (['w','a','s','d','arrowup','arrowdown','arrowleft','arrowright'].includes(e.key.toLowerCase())) {
      notifyTutorial('move');
    }
    if (e.code === 'Space' && running && !paused) {
      e.preventDefault();
      // Quick dash boost
      const pAngle = player.angleFacing || 0;
      Body.applyForce(player, player.position, {
        x: Math.cos(pAngle) * 0.012,
        y: Math.sin(pAngle) * 0.012
      });
      createParticles(player.position.x, player.position.y, 8);
    }
  });
  window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

  // ================= JOYSTICK VIRTUAL (táctil) =================
  // Antes el dedo arrastraba al jugador hacia el punto exacto tocado en la
  // pantalla, lo que obligaba a mirar dónde estaba el personaje para saber
  // hacia dónde tocar. El joystick aparece justo donde tocás y funciona
  // como un stick analógico: la dirección/distancia respecto al centro
  // controla hacia dónde y qué tan fuerte se mueve.
  const joystick = createVirtualJoystick(canvas, canvasWrap, { fixed: esTactilJuegos });

  function handleJoystickMovement() {
    if (!player) return false;
    const vec = joystick.getVector();
    const len = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    if (!joystick.isActive() || len < 0.15) return false;
    const force = 0.0035 * MICA_SPEED_MULT;
    Body.applyForce(player, player.position, {
      x: (vec.x / len) * force * Math.min(1, len),
      y: (vec.y / len) * force * Math.min(1, len)
    });
    player.angleFacing = Math.atan2(vec.y, vec.x);
    clampVelocity(player, 2.4 * MICA_SPEED_MULT * Math.min(1, len));
    notifyTutorial('move');
    return true;
  }

  // ================= MOUSE CONTROL =================
  let mousePos = null;
  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mousePos = { x: e.clientX - r.left, y: e.clientY - r.top };
  });
  canvas.addEventListener('mouseleave', () => { mousePos = null; });

  function handleMouseMovement() {
    if (!player || !mousePos) return false;
    const dx = mousePos.x - player.position.x;
    const dy = mousePos.y - player.position.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len > 12) {
      const force = (keys['shift'] || keys[' ']) ? 0.005 : 0.0035;
      Body.applyForce(player, player.position, {
        x: (dx / len) * force,
        y: (dy / len) * force
      });
      player.angleFacing = Math.atan2(dy, dx);
      clampVelocity(player, (keys['shift'] || keys[' ']) ? 3.4 : 2.4);
      notifyTutorial('move');
      return true;
    }
    return false;
  }

  function handlePlayerMovement() {
    if (!player) return;

    let moveX = 0, moveY = 0;
    if (keys['w'] || keys['a'] || keys['s'] || keys['d'] ||
        keys['arrowup'] || keys['arrowdown'] || keys['arrowleft'] || keys['arrowright']) {
      // teclado tiene prioridad
    } else if (handleJoystickMovement()) {
      return;
    } else if (handleMouseMovement()) {
      return;
    }
    if (keys['w'] || keys['arrowup']) moveY -= 1;
    if (keys['s'] || keys['arrowdown']) moveY += 1;
    if (keys['a'] || keys['arrowleft']) moveX -= 1;
    if (keys['d'] || keys['arrowright']) moveX += 1;

    const len = Math.sqrt(moveX * moveX + moveY * moveY);
    if (len > 0) {
      const normX = moveX / len;
      const normY = moveY / len;
      const force = (keys['shift'] || keys[' ']) ? 0.005 : 0.0035;

      Body.applyForce(player, player.position, {
        x: normX * force,
        y: normY * force
      });

      player.angleFacing = Math.atan2(normY, normX);
    }
    clampVelocity(player, (keys['shift'] || keys[' ']) ? 3.4 : 2.4);
  }

  // ================= AI UPDATE LOOP =================
  function updateNPCs() {
    const allEntities = [player, ...kids];
    const micaBearer = allEntities[micaBearerIndex];

    kids.forEach(npc => {
      const isMicaBearer = (micaBearerIndex === npc.index);

      if (isMicaBearer) {
        // NPC HAS THE MICA -> Chases anyone seen or heard!
        let target = null;
        let minTargetDist = 9999;

        // Scan all other kids and player. Mientras dure avoidPrevBearerTimer,
        // ignoramos a quien nos acaba de pasar la mica (salvo que sea el
        // único disponible) para que el bucle de "pasársela entre 2" se
        // rompa y el que la trae salga a buscar a alguien más.
        let fallbackTarget = null;
        let fallbackDist = 9999;
        allEntities.forEach((other, oIdx) => {
          if (oIdx === npc.index) return;
          const dist = Math.hypot(other.position.x - npc.position.x, other.position.y - npc.position.y);

          const seen = canSeeTarget(npc, other);
          const heard = canHearTarget(npc, other);
          if (!seen && !heard) return;

          if (avoidPrevBearerTimer > 0 && oIdx === previousBearerIndex) {
            if (dist < fallbackDist) { fallbackDist = dist; fallbackTarget = other; }
            return;
          }
          if (dist < minTargetDist) {
            minTargetDist = dist;
            target = other;
          }
        });
        // Si de verdad no hay nadie más a la vista/oído, mejor perseguir al
        // anterior portador que quedarse parado sin hacer nada.
        if (!target && fallbackTarget) target = fallbackTarget;

        if (target) {
          // Alerted! Sprint towards target
          npc.state = 'CHASING';
          npc.alertTimer = 40;
          const dx = target.position.x - npc.position.x;
          const dy = target.position.y - npc.position.y;
          npc.angleFacing = Math.atan2(dy, dx);

          const chaseForce = 0.0022 * MICA_SPEED_MULT;
          Body.applyForce(npc, npc.position, {
            x: Math.cos(npc.angleFacing) * chaseForce,
            y: Math.sin(npc.angleFacing) * chaseForce
          });
          clampVelocity(npc, 2.5 * MICA_SPEED_MULT);
        } else {
          // Not detected -> Wanders calmly looking around
          npc.state = 'WANDERING';
          npc.wanderTimer--;
          const nearWall = isFacingWall(npc);
          if (npc.wanderTimer <= 0 || nearWall) {
            npc.wanderTimer = 40 + Math.random() * 50;
            if (nearWall) {
              const toCenter = Math.atan2(canvas.height / 2 - npc.position.y, canvas.width / 2 - npc.position.x);
              npc.angleFacing = toCenter + (Math.random() - 0.5) * 1.2;
            } else {
              npc.angleFacing += (Math.random() - 0.5) * 1.5;
            }
          }

          const walkForce = 0.0012 * MICA_SPEED_MULT;
          Body.applyForce(npc, npc.position, {
            x: Math.cos(npc.angleFacing) * walkForce,
            y: Math.sin(npc.angleFacing) * walkForce
          });
          clampVelocity(npc, 1.8 * MICA_SPEED_MULT);
        }
      } else {
        // NPC DOES NOT HAVE MICA -> Wanders, or flees if Mica bearer comes close
        const distToMica = Math.hypot(micaBearer.position.x - npc.position.x, micaBearer.position.y - npc.position.y);
        const micaSeen = canSeeTarget(npc, micaBearer, Math.PI * 0.6, 160);
        const micaHeard = canHearTarget(npc, micaBearer, 110);

        if ((micaSeen || micaHeard || distToMica < 110) && distToMica < 200) {
          // Panicked! Flee away from Mica bearer, con amagues.
          npc.state = 'FLEEING';
          const fleeAngle = Math.atan2(npc.position.y - micaBearer.position.y, npc.position.x - micaBearer.position.x);

          // Antes huía siempre en línea recta (directo lejos del que trae
          // la mica), lo cual se ve robótico. Ahora, cada cierto tiempo
          // mete un quiebre lateral tipo amague -más marcado cuanto más
          // cerca la tiene encima-, y de vez en cuando amaga hacia el
          // lado contrario al que venía amagando para que no sea un
          // simple zigzag predecible.
          npc.feintTimer = (npc.feintTimer || 0) - 1;
          if (npc.feintTimer <= 0) {
            npc.feintTimer = 14 + Math.random() * 22;
            npc.feintSign = (Math.random() < 0.35 && npc.feintSign) ? -npc.feintSign : (Math.random() < 0.5 ? -1 : 1);
          }
          const closeness = Math.max(0, Math.min(1, (150 - distToMica) / 150));
          const feintOffset = npc.feintSign * closeness * (Math.PI / 3.4);
          npc.angleFacing = fleeAngle + feintOffset;

          const fleeForce = 0.0022 * MICA_SPEED_MULT;
          Body.applyForce(npc, npc.position, {
            x: Math.cos(npc.angleFacing) * fleeForce,
            y: Math.sin(npc.angleFacing) * fleeForce
          });
          clampVelocity(npc, 2.4 * MICA_SPEED_MULT);
        } else {
          // Wanders safely in the field
          npc.state = 'WANDERING';
          npc.wanderTimer--;
          const nearWall = isFacingWall(npc);
          if (npc.wanderTimer <= 0 || nearWall) {
            npc.wanderTimer = 50 + Math.random() * 60;
            if (nearWall) {
              const toCenter = Math.atan2(canvas.height / 2 - npc.position.y, canvas.width / 2 - npc.position.x);
              npc.angleFacing = toCenter + (Math.random() - 0.5) * 1.2;
            } else {
              npc.angleFacing += (Math.random() - 0.5) * 1.2;
            }
          }

          const walkForce = 0.0012 * MICA_SPEED_MULT;
          Body.applyForce(npc, npc.position, {
            x: Math.cos(npc.angleFacing) * walkForce,
            y: Math.sin(npc.angleFacing) * walkForce
          });
          clampVelocity(npc, 1.8 * MICA_SPEED_MULT);
        }
      }
    });

    // Check collisions for Mica tags
    if (immunityTimer > 0) immunityTimer--;
    if (avoidPrevBearerTimer > 0) avoidPrevBearerTimer--;

    const bearer = allEntities[micaBearerIndex];
    if (bearer && immunityTimer <= 0) {
      allEntities.forEach((other, idx) => {
        if (idx === micaBearerIndex) return;
        const dist = Math.hypot(other.position.x - bearer.position.x, other.position.y - bearer.position.y);
        // Los cuerpos miden 15px de radio cada uno (30px de un borde a otro),
        // así que un umbral de 28 exigía que ya estuvieran encimados antes de
        // pasar la mica; como Matter.js los empuja para separarlos apenas se
        // tocan (restitution), casi nunca llegaban a esa distancia y el toque
        // "no hacía nada". Con 34 el traspaso ocurre justo al tocarse.
        if (dist < 34) {
          transferMica(micaBearerIndex, idx);
        }
      });
    }
  }

  // ================= PARTICLES =================
  function createParticles(x, y, count = 15) {
    const colors = ['#ff1744', '#ffd600', '#00e676', '#00e5ff', '#ff007f'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1.0,
        decay: 0.03 + Math.random() * 0.03
      });
    }
  }

  function drawParticles() {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.95;
      p.vy *= 0.95;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // ================= MAIN STEP LOOP =================
  function step(timestamp) {
    if (!running || !isGameVisible) return;

    // El tiempo se descontaba una cantidad fija (0.0166) por cada frame,
    // asumiendo 60fps. En pantallas de 90/120Hz el bucle corre más
    // seguido y la ronda terminaba antes de los 20/40/60s elegidos; en
    // dispositivos con caídas de fps corría más lento de lo esperado.
    // Usamos el tiempo real transcurrido para que la duración de la
    // ronda sea siempre la misma sin importar el dispositivo.
    if (lastTime === null) lastTime = timestamp;
    const dt = Math.min(Math.max(timestamp - lastTime, 0), 100);
    lastTime = timestamp;
    const dtSec = dt / 1000;

    if (!tutorialMode) {
      timeLeft -= dtSec;
      if (micaBearerIndex !== 0) {
        timeWithoutMica += dtSec;
        score += 0.25 * (dtSec / 0.0166);
      }
    }

    if (timeLeft <= 0 && !tutorialMode) {
      endGame();
      return;
    }

    handlePlayerMovement();
    updateNPCs();
    Engine.update(engine, 16.667);

    // ================= DRAWING =================
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Field Background (Campo salvadoreño)
    drawFieldBackground();

    // 2. Draw Vision & Hearing Areas for Mica Bearer
    drawMicaSensoryAreas();

    // 3. Draw Obstacles (Trees & Benches)
    drawObstacles();

    // 4. Draw Characters (Player & Kids)
    drawCharacters();

    // 5. Draw Particles
    drawParticles();

    updateHud();
    rafId = requestAnimationFrame(step);
  }

  // ================= DRAWING FUNCTIONS =================

  function drawFieldBackground() {
    // Lush green park grass gradient
    const grad = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, 80,
      canvas.width / 2, canvas.height / 2, canvas.width * 0.7
    );
    grad.addColorStop(0, '#3e8e41');
    grad.addColorStop(0.7, '#2e7d32');
    grad.addColorStop(1, '#1b5e20');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Natural soil paths & wildflower specks
    ctx.fillStyle = 'rgba(255, 235, 59, 0.25)';
    for (let i = 0; i < 20; i++) {
      const fx = (i * 73) % canvas.width;
      const fy = (i * 59) % canvas.height;
      ctx.beginPath();
      ctx.arc(fx, fy, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Draw Vision Cone & Hearing Circle of whoever carries the Mica
  function drawMicaSensoryAreas() {
    const allEntities = [player, ...kids];
    const bearer = allEntities[micaBearerIndex];
    if (!bearer) return;

    const x = bearer.position.x;
    const y = bearer.position.y;
    const angle = bearer.angleFacing || 0;
    const coneAngle = Math.PI * 0.42;
    const maxDist = 180;
    const hearingDist = 115;

    ctx.save();

    // 1. Hearing Circle (Audición)
    const hearingGrad = ctx.createRadialGradient(x, y, 10, x, y, hearingDist);
    hearingGrad.addColorStop(0, 'rgba(255, 235, 59, 0.15)');
    hearingGrad.addColorStop(0.8, 'rgba(255, 235, 59, 0.06)');
    hearingGrad.addColorStop(1, 'rgba(255, 235, 59, 0)');
    ctx.fillStyle = hearingGrad;
    ctx.beginPath();
    ctx.arc(x, y, hearingDist, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 235, 59, 0.35)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.arc(x, y, hearingDist, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // 2. Vision Cone (Visión)
    const visionGrad = ctx.createRadialGradient(x, y, 10, x, y, maxDist);
    visionGrad.addColorStop(0, 'rgba(255, 23, 68, 0.35)');
    visionGrad.addColorStop(0.7, 'rgba(255, 82, 82, 0.18)');
    visionGrad.addColorStop(1, 'rgba(255, 82, 82, 0)');
    ctx.fillStyle = visionGrad;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, maxDist, angle - coneAngle / 2, angle + coneAngle / 2);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 23, 68, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, maxDist, angle - coneAngle / 2, angle + coneAngle / 2);
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  }

  function drawObstacles() {
    obstacles.forEach(obs => {
      ctx.save();
      ctx.translate(obs.position.x, obs.position.y);

      if (obs.label === 'tree') {
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.25)';
        ctx.beginPath();
        ctx.ellipse(0, 10, obs.radius * 1.1, obs.radius * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();

        if (obs.treeType === 'maquilishuat') {
          // National Maquilishuat Tree with Pink Blossoms
          ctx.fillStyle = '#ff80ab';
          ctx.beginPath();
          ctx.arc(0, 0, obs.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#ff4081';
          ctx.beginPath();
          ctx.arc(-4, -4, obs.radius * 0.7, 0, Math.PI * 2);
          ctx.fill();
        } else if (obs.treeType === 'conacaste') {
          // Giant Conacaste Tree (deep green foliage)
          ctx.fillStyle = '#1b5e20';
          ctx.beginPath();
          ctx.arc(0, 0, obs.radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#2e7d32';
          ctx.beginPath();
          ctx.arc(-5, -5, obs.radius * 0.75, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Bush
          ctx.fillStyle = '#33691e';
          ctx.beginPath();
          ctx.arc(0, 0, obs.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      } else if (obs.label === 'bench') {
        // Park Bench
        ctx.fillStyle = '#5d4037';
        ctx.fillRect(-27, -9, 54, 18);
        ctx.strokeStyle = '#3e2723';
        ctx.lineWidth = 2;
        ctx.strokeRect(-27, -9, 54, 18);
      }

      ctx.restore();
    });
  }

  function drawCharacters() {
    const allEntities = [player, ...kids];

    allEntities.forEach((ent, idx) => {
      const isMicaBearer = (micaBearerIndex === idx);
      const isPlayer = (idx === 0);
      const { x, y } = ent.position;
      const angle = ent.angleFacing || 0;

      ctx.save();
      ctx.translate(x, y);

      // Character Shadow
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.beginPath();
      ctx.ellipse(0, 14, 14, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Body (Shirt)
      ctx.fillStyle = isPlayer ? '#0056b3' : (ent.shirt || '#ff5722');
      ctx.beginPath();
      ctx.roundRect(-8, -6, 16, 18, 4);
      ctx.fill();

      // Head
      ctx.fillStyle = '#e8b385';
      ctx.beginPath();
      ctx.arc(0, -12, 7, 0, Math.PI * 2);
      ctx.fill();

      // Hair
      ctx.fillStyle = isPlayer ? '#3e2723' : '#212121';
      ctx.beginPath();
      ctx.arc(0, -15, 7.5, Math.PI, Math.PI * 2);
      ctx.fill();

      // Facing Nose/Direction pointer
      ctx.fillStyle = '#d7ccc8';
      ctx.beginPath();
      ctx.arc(Math.cos(angle) * 7, -12 + Math.sin(angle) * 7, 2, 0, Math.PI * 2);
      ctx.fill();

      // Status Badges (MICA / ALERT / FLEEING)
      if (isMicaBearer) {
        ctx.fillStyle = '#ffd600';
        ctx.font = 'bold 12px Fredoka, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('🔥 ' + jt('jue.card4.micaBadge', '¡LA MICA!'), 0, -26);
      } else if (ent.state === 'CHASING' || ent.alertTimer > 0) {
        ctx.fillStyle = '#ff1744';
        ctx.font = 'bold 12px Fredoka, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('👀❗', 0, -24);
      } else if (ent.state === 'FLEEING') {
        ctx.fillStyle = '#00e5ff';
        ctx.font = 'bold 12px Fredoka, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('😱💨', 0, -24);
      }

      // Name label
      ctx.fillStyle = '#ffffff';
      ctx.font = '10px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(ent.name || (isPlayer ? jt('jue.card4.you', 'Vos') : jt('jue.card4.friend', 'Amigo')), 0, 24);

      ctx.restore();

      // "You are here" arrow above the player, so they never lose track of themselves
      if (isPlayer) {
        const bounce = Math.sin(Date.now() / 220) * 4;
        const arrowY = y - 34 + bounce;
        ctx.save();
        ctx.translate(x, arrowY);
        ctx.fillStyle = '#ffd600';
        ctx.strokeStyle = '#3e2723';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, 10);
        ctx.lineTo(-7, -4);
        ctx.lineTo(-3, -4);
        ctx.lineTo(-3, -12);
        ctx.lineTo(3, -12);
        ctx.lineTo(3, -4);
        ctx.lineTo(7, -4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    });
  }

  // ================= END GAME & OVERLAYS =================
  function endGame() {
    running = false;
    paused = false;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if (pauseIcon) pauseIcon.textContent = '⏸️';

    const playerWon = (micaBearerIndex !== 0);
    const finalScore = Math.round(score + (playerWon ? 500 : 100));

    let title, msg;
    if (playerWon) {
      playSFX('win');
      title = jt('jue.card4.winTitle', '🏆 ¡TE SALVASTE DE LA MICA!');
      msg = jt('jue.card4.winMsg', '¡Sos un rayo! Terminó el tiempo y <b>no te quedaste con la mica</b>. Pasaste la mica <b>{n} veces</b> y lograste un récord.').replace('{n}', timesPassedMica);
    } else {
      title = jt('jue.card4.loseTitle', '🙈 ¡TE QUEDASTE CON LA MICA!');
      msg = jt('jue.card4.loseMsg', '¡Se acabó el tiempo y <b>te quedaste con la mica</b>! La próxima vez pasala más rápido a Chepe, Sofía o Mateo antes de que termine la ronda.');
    }

    // El id interno de este juego es "encantados" (mismo que sus elementos
    // del DOM: hud-encantados, pauseBtn-encantados, etc.) y así también
    // está en la lista blanca del backend (GAME_NAMES_VALIDOS espera
    // "encantados-20s"/"encantados-40s"/"encantados-60s", una entrada por
    // cada duración seleccionable). "Mica" es solo el nombre visible.
    // Antes esto mandaba "mica-40s", que no está en esa lista, así que el
    // guardado del puntaje fallaba en silencio (400) y nunca llegaba a
    // guardarse.
    const gameName = `encantados-${selectedTimeLimit}s`;

    showOverlay(`
      <span class="overlay-tag">${jt('jue.card4.roundEndTag', 'Fin de la Ronda')}</span>
      <h3 style="font-size: 1.35rem; color: #ffd700; margin-bottom: 8px;">${title}</h3>
      <div class="overlay-score" style="font-size: 2rem; font-weight: 800; color: #00e5ff;">${finalScore} pts</div>
      <p style="font-size: 0.95rem; margin-bottom: 12px;">${msg}</p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 12px 0; font-size: 0.8rem; background: rgba(0,0,0,0.3); padding: 8px; border-radius: 8px;">
        <div><b>${Math.round(timeWithoutMica)}s</b><br><span style="color:#aaa;">${jt('jue.card4.statNoMica', 'Sin Mica')}</span></div>
        <div><b>${timesPassedMica}</b><br><span style="color:#aaa;">${jt('jue.card4.statPassed', 'Pasadas')}</span></div>
        <div><b>${selectedTimeLimit}s</b><br><span style="color:#aaa;">${jt('jue.card4.statRound', 'Ronda')}</span></div>
      </div>
      <p class="overlay-best-score" id="m-best-score"></p>
      <button class="btn-primary" id="btn-restart-encantados">${jt('jue.rematch', 'Revancha')}</button>
    `);

    document.getElementById('btn-restart-encantados').onclick = showTimeSelector;

    guardarPuntajeJuego(gameName, finalScore).then(() => {
      obtenerMejorPuntajeJuego(gameName).then(best => {
        const el = document.getElementById('m-best-score');
        if (el && best) el.textContent = jt('jue.card4.bestScore', 'Tu récord en {s}s: {p} pts').replace('{s}', selectedTimeLimit).replace('{p}', best.score);
      });
    });
  }

  // Mode Selection: 20s, 40s, 60s
  function showTimeSelector() {
    showOverlay(`
      <span class="overlay-tag">${jt('jue.card4.timeTag', 'Tiempo de Juego')}</span>
      <h3 style="font-size: 1.3rem; color: #ffd700;">⏱️ ${jt('jue.card4.timeTitle', 'Elige la Duración')}</h3>
      <p style="font-size: 0.9rem;">${jt('jue.card4.timeDesc', '¿Cuánto tiempo querés que dure la ronda de la mica?')}</p>
      <div class="difficulty-buttons" style="display: flex; flex-direction: column; gap: 10px;">
        <button class="btn-primary" id="time-20s" style="font-size: 0.95rem;">
          ⚡ ${jt('jue.card4.time20', 'Ráfaga Rápida (20 Segundos)')}
          <div style="font-size: 0.75rem; font-weight: normal; opacity: 0.9;">${jt('jue.card4.time20Desc', 'Pasa la mica inmediatamente')}</div>
        </button>
        <button class="btn-primary" id="time-40s" style="font-size: 0.95rem;">
          ⏱️ ${jt('jue.card4.time40', 'Ronda Media (40 Segundos)')}
          <div style="font-size: 0.75rem; font-weight: normal; opacity: 0.9;">${jt('jue.card4.time40Desc', 'Equilibrada para escapar y perseguir')}</div>
        </button>
        <button class="btn-primary" id="time-60s" style="font-size: 0.95rem;">
          🏆 ${jt('jue.card4.time60', 'Partida Completa (1 Minuto / 60s)')}
          <div style="font-size: 0.75rem; font-weight: normal; opacity: 0.9;">${jt('jue.card4.time60Desc', 'Máxima adrenalina y sigilo')}</div>
        </button>
      </div>
    `);

    document.getElementById('time-20s').onclick = () => startGame(20);
    document.getElementById('time-40s').onclick = () => startGame(40);
    document.getElementById('time-60s').onclick = () => startGame(60);
  }

  function startGame(timeSeconds) {
    selectedTimeLimit = timeSeconds;
    timeLeft = timeSeconds;
    score = 0;
    timesPassedMica = 0;
    timesCarriedMica = 0;
    timeWithoutMica = 0;
    micaBearerIndex = 1; // Start with Chepe having the mica
    immunityTimer = 60;

    resizeCanvas();
    setupArena();
    hideOverlay();

    // Evita bucles de animación duplicados (p. ej. doble toque al elegir
    // la duración de la ronda), que hacían correr el reloj más rápido de
    // lo debido y la partida terminaba antes de tiempo de forma errática.
    cancelAnimationFrame(rafId);
    running = true;
    paused = false;
    lastTime = null;
    playMusic();

    rafId = requestAnimationFrame(step);
  }

  function showModeSelector() {
    showOverlay(`
      <span class="overlay-tag">${jt('jue.card4.overlayTag', 'Juego Tradicional')}</span>
      <h2>🏃 ${jt('jue.card4.title', 'Mica')}</h2>
      <p>${jt('jue.card4.intro', 'El clásico juego infantil de El Salvador. <b>Tocá a los demás niños para pasarles la mica</b> y escapá por el campo. Esquivá su <b>cono de visión</b> y su <b>área de audición</b> para que no te persigan corriendo.')}</p>
      <p class="rules-title">${jt('jue.controls.title', 'Controles')}</p>
      <ul class="rules-list">
        ${esTactilJuegos ? `
        <li class="rule-good"><span class="rule-icon">👆</span> ${jt('jue.card4.controlsTap', 'Arrastrá el dedo desde tu personaje para mover el joystick virtual.')}</li>
        ` : `
        <li class="rule-good"><span class="rule-icon">🎮</span> ${jt('jue.card4.controlsKeys', '<strong>WASD</strong> o <strong>flechas</strong> ⬅️⬆️➡️⬇️ para moverte.')}</li>
        `}
      </ul>
      <p class="rules-title">${jt('jue.card4.rulesTitle', 'Reglas del juego')}</p>
      <ul class="rules-list">
        <li class="rule-good"><span class="rule-icon">👀</span> ${jt('jue.card4.rule1', '<b>Visión y Sigilo:</b> Si no te ven ni te escuchan, caminan tranquilos; si te detectan, ¡corren a atraparte!')}</li>
        <li class="rule-good"><span class="rule-icon">🖐️</span> ${jt('jue.card4.rule2', '<b>Pasar la Mica:</b> Tocá a un amigo para pasarle la mica y alejate antes de que te persiga.')}</li>
        <li class="rule-bad"><span class="rule-icon">⏳</span> ${jt('jue.card4.rule3', '<b>Objetivo:</b> ¡No tengas la mica cuando el tiempo llegue a 0!')}</li>
      </ul>
      <button class="btn-primary" id="btn-start-mica">${jt('jue.card4.continueBtn', 'Continuar')}</button>
      <button class="btn-tutorial" id="btn-tutorial-mica">🎓 ${jt('jue.tutorial.start', 'Tutorial (practicar primero)')}</button>
    `);
    document.getElementById('btn-start-mica').onclick = showTimeSelector;
    document.getElementById('btn-tutorial-mica').onclick = startTutorial;
  }

  // ================= PAUSE / RESUME / MENU =================
  const pauseBtn = document.getElementById('pauseBtn-encantados');
  const pauseIcon = document.getElementById('pauseIcon-encantados');
  const pauseOverlay = document.getElementById('pauseOverlay-encantados');
  const resumeBtn = document.getElementById('resumeBtn-encantados');
  const menuBtn = document.getElementById('menuBtn-encantados');

  function pauseGame() {
    if (!running) return;
    running = false;
    paused = true;
    cancelAnimationFrame(rafId);
    if (bgMusic) {
      savedVolume = bgMusic.volume;
      bgMusic.volume = 0.1;
    }
    canvasWrap?.classList.add('is-paused');
    pauseOverlay?.classList.remove('hidden');
    if (pauseIcon) pauseIcon.textContent = '▶️';
    if (tutorialMode) hideTutorialBubble();
  }

  function resumeGame() {
    if (!paused) return;
    paused = false;
    running = true;
    lastTime = null;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if (pauseIcon) pauseIcon.textContent = '⏸️';
    if (bgMusic) {
      bgMusic.volume = savedVolume || volume;
      if (volume > 0) bgMusic.play().catch(() => {});
    }
    if (tutorialMode && tutorialStep >= 0) showTutorialStep(tutorialStep);
    rafId = requestAnimationFrame(step);
  }

  function returnToMenu() {
    running = false;
    paused = false;
    tutorialMode = false;
    hideTutorialBubble();
    cancelAnimationFrame(rafId);
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if (pauseIcon) pauseIcon.textContent = '⏸️';
    showModeSelector();
  }

  pauseBtn?.addEventListener('click', () => {
    if (paused) resumeGame();
    else pauseGame();
  });
  resumeBtn?.addEventListener('click', resumeGame);
  menuBtn?.addEventListener('click', returnToMenu);

  resizeCanvas();
  setupArena();
  showModeSelector();

  gameContent?.addEventListener('gameVisible', (e) => {
    if (e.detail.gameId === 'encantados') {
      isGameVisible = true;
      resizeCanvas();
      setupArena();
      playMusic();
      lastTime = null;
      if (paused && running) resumeGame();
      else if (running) rafId = requestAnimationFrame(step);
    }
  });

  window.switchGameState('encantados', {
    pause: pauseGame,
    resume: resumeGame,
    stop: stopMusic,
    running: () => running,
    paused: () => paused,
    setVisible: (visible) => { isGameVisible = visible; },
    reloadMenu: showModeSelector
  });
})();


/* ---------------------------------------------------------
   JUEGO 5: CANICAS
   - Juego tradicional salvadoreño de canicas / pista
   - Matter.js: física realista de colisiones entre esferas
   - GSAP: animaciones de entrada, impacto, partículas, HUD
   - Mecánica: disparar tirador → sacar canicas del círculo = puntos
--------------------------------------------------------- */
(function initGameElotes() {
  const canvas = document.getElementById('canvas-elotes');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const hud = document.getElementById('hud-elotes');
  const overlay = document.getElementById('overlay-elotes');
  const overlayCard = document.getElementById('overlay-card-elotes');
  const gameContent = document.getElementById('modal-elotes');
  const canvasWrap = document.getElementById('elotes-canvas-wrap');

  // ── Matter.js aliases ──────────────────────────────────────────
  const { Engine, Render: MRender, Runner, World, Bodies, Body, Events,
          Mouse, MouseConstraint, Composite, Vector } = Matter;

  // ── Estado global ─────────────────────────────────────────────
  let engine, world;
  let running = false, paused = false;
  let isGameVisible = false;
  let rafId = null;

  let score = 0, round = 1, shotsLeft = 0, totalRounds = 3;
  let difficulty = null;
  let gamePhase = 'idle'; // idle | aiming | shooting | watching | roundEnd | gameOver
  // Cantidad fija de canicas en las 3 rondas y en ambas dificultades — solo
  // cambian los tiros disponibles.
  const TOTAL_MARBLES = 20;
  let gameConfig = {
    // Mismo tamaño de juego (circleRadiusFactor) en ambos niveles: antes
    // fácil usaba un círculo más grande que difícil, así que no era un
    // cambio de dificultad limpio (también achicaba el área de juego).
    // La dificultad ahora solo la marca la cantidad de tiros.
    easy: { shots: 5, circleRadiusFactor: 0.33 },
    hard: { shots: 4, circleRadiusFactor: 0.33 }
  };

  // Tiempo que tarda el jugador en terminar el nivel (todas las rondas de
  // la dificultad elegida), reemplaza el marcador de puntos en el HUD.
  let playedMs = 0;
  function formatTime(ms) {
    return (ms / 1000).toFixed(1) + 's';
  }

  // ================= MODO TUTORIAL =================
  let tutorialMode = false;
  let tutorialStep = -1;
  let tutorialWaiting = false;
  const tutorialSteps = [
    { action: 'shoot', text: () => jt('jue.tutorial.canicas.shoot', 'Jalá el tirador dorado hacia atrás y soltá para disparar. ¡Probalo!') },
    { action: 'out', text: () => jt('jue.tutorial.canicas.out', '¡Bien! Seguí disparando hasta sacar una canica fuera del círculo.') }
  ];

  function tutorialBubble(html) {
    let el = canvasWrap?.querySelector('.tutorial-bubble');
    if (!el && canvasWrap) {
      el = document.createElement('div');
      el.className = 'tutorial-bubble';
      canvasWrap.appendChild(el);
    }
    if (el) el.innerHTML = html;
  }
  function hideTutorialBubble() { canvasWrap?.querySelector('.tutorial-bubble')?.remove(); }

  function showTutorialStep(i) {
    tutorialStep = i;
    if (i >= tutorialSteps.length) { finishTutorial(); return; }
    tutorialWaiting = true;
    const n = i + 1, total = tutorialSteps.length;
    tutorialBubble(`
      <span class="tutorial-bubble__tag">🎓 ${jt('jue.tutorial.tag', 'Tutorial')} ${n}/${total}</span>
      <p>${tutorialSteps[i].text()}<span class="tutorial-pulse"></span></p>
    `);
  }

  function notifyTutorial(action) {
    if (!tutorialMode || !tutorialWaiting) return;
    if (tutorialSteps[tutorialStep].action !== action) return;
    tutorialWaiting = false;
    tutorialBubble(`<span class="tutorial-bubble__tag good">✅ ${jt('jue.tutorial.good', '¡Bien hecho!')}</span>`);
    setTimeout(() => { if (tutorialMode) showTutorialStep(tutorialStep + 1); }, 1000);
  }

  function finishTutorial() {
    tutorialMode = false;
    hideTutorialBubble();
    running = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    overlayCard.innerHTML = `
      <span class="overlay-tag">🎉 ${jt('jue.tutorial.doneTag', 'Tutorial completo')}</span>
      <h3>${jt('jue.tutorial.doneTitle', '¡Ya sabés jugar canicas!')}</h3>
      <p>${jt('jue.tutorial.doneText', 'Ahora vamos a la partida de verdad: elegí la dificultad.')}</p>
      <button class="btn-primary" id="btn-tutorial-done-canicas">🔮 ${jt('jue.tutorial.playReal', 'Jugar de verdad')}</button>
    `;
    overlay.classList.remove('hidden');
    if (window.gsap) gsap.fromTo(overlayCard, { opacity: 0, y: 30, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.7)' });
    document.getElementById('btn-tutorial-done-canicas').onclick = showDifficultySelector;
  }

  function startTutorial() {
    startGame('easy');
    tutorialMode = true;
    setTimeout(() => {
      shotsLeft = 999;
      updateHUD();
      showTutorialStep(0);
    }, 350); // espera a que termine la transición GSAP de startGame()
  }

  // ── Canvas sizing ─────────────────────────────────────────────
  // Antes, al entrar en pantalla completa se reusaba la resolución chica de
  // la ventana normal y el navegador solo la estiraba (se veía borrosa/pixelada).
  // Ahora medimos siempre el tamaño real del canvas; como el resize ya
  // dispara resetRoundLayout(), el fullscreen queda nítido.
  function resizeCanvas() {
    const wrap = canvasWrap || canvas.closest('.canvas-wrap');
    const rect = wrap ? wrap.getBoundingClientRect() : canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  resizeCanvas();
  window.addEventListener('resize', () => { resizeCanvas(); if (running) resetRoundLayout(); });
  document.addEventListener('fullscreenchange', () => setTimeout(() => { resizeCanvas(); if (running) resetRoundLayout(); }, 100));

  // ── Fullscreen ────────────────────────────────────────────────
  const fsBtn = canvasWrap?.querySelector('.fullscreen-btn');
  if (fsBtn) {
    fsBtn.addEventListener('click', () => {
      const isCurrent = document.fullscreenElement === canvasWrap || document.webkitFullscreenElement === canvasWrap;
      if (!isCurrent) { (canvasWrap.requestFullscreen || canvasWrap.webkitRequestFullscreen)?.call(canvasWrap); }
      else { (document.exitFullscreen || document.webkitExitFullscreen)?.call(document); }
    });
  }

  // ── Música ────────────────────────────────────────────────────
  const bgMusic = document.getElementById('bgMusic-elotes');
  const volumeSlider = document.getElementById('volumeSlider-elotes');
  const volumeIcon = document.getElementById('volumeIcon-elotes');
  function playMusic() {
    if (!bgMusic) return;
    bgMusic.volume = volumeSlider ? +volumeSlider.value : 0.25;
    bgMusic.play().catch(() => {});
  }
  function stopMusic() { bgMusic?.pause(); }
  if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
      if (bgMusic) bgMusic.volume = +volumeSlider.value;
      if (volumeIcon) volumeIcon.textContent = +volumeSlider.value === 0 ? '🔇' : '🔊';
    });
  }

  // ── HUD ───────────────────────────────────────────────────────
  hud.innerHTML = `
    <div class="hud-item">
      <span>${jt('jue.hud.time','Tiempo')}</span>
      <b id="can-time">0.0s</b>
    </div>
    <div class="hud-item">
      <span>${jt('jue.hud.round','Ronda')}</span>
      <b id="can-round">1/${totalRounds}</b>
    </div>
    <div class="hud-item">
      <span>${jt('jue.card5.hud.shots','Tiros')}</span>
      <b id="can-shots">5</b>
    </div>`;

  function updateHUD() {
    const elTime = document.getElementById('can-time');
    const elRound = document.getElementById('can-round');
    const elShots = document.getElementById('can-shots');
    if (elTime) elTime.textContent = formatTime(playedMs);
    if (elRound) elRound.textContent = `${round}/${totalRounds}`;
    if (elShots) elShots.textContent = tutorialMode ? '∞' : shotsLeft;
  }

  // ── Física: variables ─────────────────────────────────────────
  let circleCenter = { x: 0, y: 0 };
  let circleRadius = 0;
  let marbleRadius = 0;
  let tirador = null; // cuerpo Matter.js del tirador
  let marbles = [];   // cuerpos Matter.js de canicas objetivo
  let walls = [];     // bordes del canvas
  let marblesTouched = new Set(); // IDs de canicas que ya salieron

  // ── Aiming / power ────────────────────────────────────────────
  let aimStart = null;   // {x,y} donde empieza el drag
  let aimCurrent = null; // {x,y} posición actual del mouse
  let tiradorSpawnPos = { x: 0, y: 0 }; // posición fuera del círculo donde se spawnea el tirador
  const MAX_POWER_PX = 180; // máx distancia de drag para potencia máxima
  const MAX_SPEED = 18;     // velocidad máxima del tirador

  // ── Partículas ────────────────────────────────────────────────
  let particles = [];

  function spawnParticles(x, y, color) {
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12;
      const speed = 2 + Math.random() * 3;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        color: color || `hsl(${Math.random() * 60 + 260}, 90%, 70%)`,
        r: 3 + Math.random() * 3
      });
    }
  }

  function updateParticles(dt) {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.15;
      p.life -= 0.025;
      if (p.life <= 0) particles.splice(i, 1);
    }
  }

  function drawParticles() {
    particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.restore();
    });
  }

  // ── Resetear layout de una ronda ──────────────────────────────
  function resetRoundLayout() {
    if (!engine) return;
    const W = canvas.width, H = canvas.height;

    // Limpiar mundo
    World.clear(world);
    Engine.clear(engine);
    marbles = [];
    marblesTouched.clear();
    tirador = null;
    particles = [];
    aimStart = null;
    aimCurrent = null;

    // Dimensiones del círculo (ronda). La cantidad de canicas ya no crece
    // por ronda (siempre son 20), así que el círculo tampoco necesita
    // crecer para darles espacio — se mantiene del mismo tamaño en las 3
    // rondas.
    const cfg = gameConfig[difficulty];
    circleCenter = { x: W / 2, y: H / 2 - H * 0.04 };
    // El tirador vive debajo del círculo, separado por 2.2 radios de canica
    // y sin quedar a menos de 5 radios del borde inferior real del canvas.
    // Si el círculo "ideal" (Math.min(W,H) * factor) no deja hueco vertical
    // suficiente para eso — pantallas bajitas/angostas, modal chico — antes
    // el tope de abajo terminaba empujando al tirador por ENCIMA del borde
    // del círculo, es decir, spawneando adentro. Por eso acá el radio se
    // limita también por el espacio vertical realmente disponible debajo
    // del centro, reservando sitio para el tirador antes de fijar el radio.
    const gapFactor = 2.2;
    const bottomMarginFactor = 5;
    const maxRadiusForTiradorGap = (H - circleCenter.y) / (1 + (gapFactor + bottomMarginFactor) / 5.5);
    circleRadius = Math.min(W, H) * cfg.circleRadiusFactor;
    circleRadius = Math.min(circleRadius, maxRadiusForTiradorGap);
    // Mismo radio relativo (círculo / 5.5) que ya se probó capaz de acomodar
    // 20 canicas sin solaparse dentro de los intentos aleatorios disponibles.
    marbleRadius = circleRadius / 5.5;

    tiradorSpawnPos = {
      x: circleCenter.x,
      y: Math.min(circleCenter.y + circleRadius + marbleRadius * gapFactor, H - marbleRadius * bottomMarginFactor)
    };

    // Muros invisibles del canvas
    const thick = 60;
    walls = [
      Bodies.rectangle(W / 2, -thick / 2, W + 120, thick, { isStatic: true, label: 'wall' }),
      Bodies.rectangle(W / 2, H + thick / 2, W + 120, thick, { isStatic: true, label: 'wall' }),
      Bodies.rectangle(-thick / 2, H / 2, thick, H + 120, { isStatic: true, label: 'wall' }),
      Bodies.rectangle(W + thick / 2, H / 2, thick, H + 120, { isStatic: true, label: 'wall' })
    ];
    World.add(world, walls);

    // Cantidad de canicas fija en las 3 rondas y en ambas dificultades
    // (antes crecía por ronda y variaba entre fácil/difícil, con lo cual
    // "20 canicas" nunca era un número real de referencia para el jugador).
    placeMarbles(TOTAL_MARBLES);

    // Spawn del tirador
    spawnTirador();

    gamePhase = 'aiming';
  }

  function placeMarbles(count) {
    const placed = [];
    let attempts = 0;
    while (placed.length < count && attempts < 6000) {
      attempts++;
      const angle = Math.random() * Math.PI * 2;
      // Raíz cuadrada de un random uniforme reparte los puntos por ÁREA
      // (no por radio): sortear la distancia de forma lineal amontonaba
      // las canicas cerca del centro, porque los anillos externos del
      // círculo tienen más área pero recibían la misma densidad de puntos
      // que los internos.
      const dist = Math.sqrt(Math.random()) * (circleRadius - marbleRadius * 2.5);
      const px = circleCenter.x + Math.cos(angle) * dist;
      const py = circleCenter.y + Math.sin(angle) * dist;
      // Verificar no solapamiento
      let ok = true;
      for (const p of placed) {
        const dx = p.x - px, dy = p.y - py;
        if (Math.sqrt(dx * dx + dy * dy) < marbleRadius * 3.2) { ok = false; break; }
      }
      if (!ok) continue;
      placed.push({ x: px, y: py });
      const hue = Math.floor(Math.random() * 360);
      const marble = Bodies.circle(px, py, marbleRadius, {
        restitution: 0.7,
        friction: 0.02,
        frictionAir: 0.015,
        density: 0.003,
        label: `marble_${placed.length}`,
        render: { fillStyle: `hsl(${hue},80%,55%)` },
        plugin: { hue, isOut: false }
      });
      marbles.push(marble);
    }
    World.add(world, marbles);

    // Antes había acá una "animación de entrada" que desplazaba cada canica
    // circleRadius píxeles fuera de su lugar y la regresaba recién tras un
    // setTimeout escalonado (hasta ~1.2s en rondas con muchas canicas) —
    // pero el tween de GSAP no movía nada de verdad (onUpdate vacío), así
    // que las canicas quedaban paradas fuera del círculo durante esa
    // ventana. El chequeo de "¿salió del círculo?" corre cada frame sin
    // importar la fase del juego, así que casi todas terminaban marcadas
    // isOut=true (y sumando puntos) apenas arrancaba la ronda, antes de
    // cualquier disparo. Las canicas ya quedan bien colocadas al crearlas
    // arriba, así que no hace falta nada de esto.
  }

  const TIRADOR_SCALE = 0.75; // Más chica que las canicas del círculo, para distinguirla como "la que se tira"

  function spawnTirador() {
    if (tirador) { try { World.remove(world, tirador); } catch(e){} }
    tirador = Bodies.circle(tiradorSpawnPos.x, tiradorSpawnPos.y, marbleRadius * TIRADOR_SCALE, {
      restitution: 0.65,
      friction: 0.01,
      frictionAir: 0.008,
      density: 0.012,
      label: 'tirador',
      isStatic: true // estático mientras apunta
    });
    World.add(world, tirador);
  }

  // ── Input: Apuntar y disparar ──────────────────────────────────
  function getCanvasPos(e) {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  function onPointerDown(e) {
    if (gamePhase !== 'aiming' || !tirador) return;
    const pos = getCanvasPos(e);
    // Solo iniciar drag cerca del tirador
    const tp = tirador.position;
    const dist = Math.hypot(pos.x - tp.x, pos.y - tp.y);
    if (dist < marbleRadius * 4) {
      aimStart = { x: tp.x, y: tp.y };
      aimCurrent = { x: pos.x, y: pos.y };
      e.preventDefault();
    }
  }

  function onPointerMove(e) {
    if (gamePhase !== 'aiming' || !aimStart) return;
    aimCurrent = getCanvasPos(e);
    e.preventDefault();
  }

  function onPointerUp(e) {
    if (gamePhase !== 'aiming' || !aimStart || !tirador) return;
    const dx = aimStart.x - aimCurrent.x;
    const dy = aimStart.y - aimCurrent.y;
    const dist = Math.min(Math.hypot(dx, dy), MAX_POWER_PX);
    if (dist < 8) { aimStart = null; aimCurrent = null; return; }

    const power = dist / MAX_POWER_PX;
    const vx = (dx / dist) * power * MAX_SPEED;
    const vy = (dy / dist) * power * MAX_SPEED;

    // Disparar: hacer dinámico y aplicar velocidad
    Body.setStatic(tirador, false);
    Body.setVelocity(tirador, { x: vx, y: vy });

    shotsLeft--;
    updateHUD();
    gamePhase = 'shooting';
    aimStart = null;
    aimCurrent = null;
    notifyTutorial('shoot');
    e.preventDefault();
  }

  canvas.addEventListener('mousedown', onPointerDown);
  canvas.addEventListener('mousemove', onPointerMove);
  canvas.addEventListener('mouseup', onPointerUp);
  canvas.addEventListener('touchstart', onPointerDown, { passive: false });
  canvas.addEventListener('touchmove', onPointerMove, { passive: false });
  canvas.addEventListener('touchend', onPointerUp, { passive: false });

  // ── Colisiones (sonido / efecto visual) ──────────────────────
  function setupCollisionEvents() {
    Events.on(engine, 'collisionStart', e => {
      e.pairs.forEach(pair => {
        const { bodyA, bodyB } = pair;
        const isTirador = bodyA.label === 'tirador' || bodyB.label === 'tirador';
        if (isTirador) {
          const other = bodyA.label === 'tirador' ? bodyB : bodyA;
          if (other.label.startsWith('marble_')) {
            const pos = other.position;
            spawnParticles(pos.x, pos.y, `hsl(${other.plugin?.hue || 260},80%,65%)`);
          }
        }
      });
    });
  }

  // ── Loop de juego ────────────────────────────────────────────
  let lastTs = null;
  let watchTimer = 0; // tiempo esperando que las canicas se detengan

  function step(ts) {
    if (!running || paused) return;
    rafId = requestAnimationFrame(step);

    const dt = lastTs ? Math.min(ts - lastTs, 50) : 16;
    lastTs = ts;

    // El tiempo del nivel solo avanza mientras se juega de verdad (no
    // durante la pausa, ya que step() no vuelve a llamarse a sí mismo
    // mientras paused === true).
    if (!tutorialMode) {
      playedMs += dt;
      updateHUD();
    }

    // Actualizar física
    Engine.update(engine, dt);
    updateParticles(dt);

    // Detectar canicas que salieron del círculo
    marbles.forEach(m => {
      if (m.plugin?.isOut) return;
      const dx = m.position.x - circleCenter.x;
      const dy = m.position.y - circleCenter.y;
      if (Math.sqrt(dx * dx + dy * dy) > circleRadius + marbleRadius) {
        m.plugin.isOut = true;
        score++;
        notifyTutorial('out');
        spawnParticles(m.position.x, m.position.y, '#C4B5FD');
      }
    });

    // Lógica de transición de fases
    if (gamePhase === 'shooting') {
      const tiradorSpeed = tirador ? Math.hypot(tirador.velocity.x, tirador.velocity.y) : 0;
      const marblesMoving = marbles.some(m => Math.hypot(m.velocity.x, m.velocity.y) > 0.15);
      if (tiradorSpeed < 0.2 && !marblesMoving) {
        watchTimer += dt;
        if (watchTimer > 600) {
          watchTimer = 0;
          // La ronda se da por terminada en cuanto todas las canicas ya
          // salieron del círculo, sin importar si quedaban tiros — antes
          // solo se avanzaba de ronda al agotar los tiros, así que si el
          // jugador limpiaba el círculo con tiros de sobra el juego lo
          // seguía obligando a disparar contra un círculo ya vacío.
          const todasAfuera = marbles.length > 0 && marbles.every(m => m.plugin?.isOut);
          if (todasAfuera || shotsLeft <= 0) {
            // gamePhase cambia ANTES del setTimeout: mientras se espera para
            // llamar a endRound(), este bloque seguía corriendo cada frame
            // y, como todo seguía quieto, volvía a cumplirse la condición
            // una y otra vez — cada disparo de watchTimer llamaba a
            // endRound() de nuevo, así que una sola ronda terminada
            // encadenaba varias llamadas (round++ varias veces) y el juego
            // "saltaba" directo a la ronda 2 y 3. Esta bandera evita que
            // el bloque se vuelva a ejecutar hasta que resetRoundLayout()
            // (o spawnNewTirador) devuelva la fase a 'aiming'.
            gamePhase = 'roundEnd';
            setTimeout(() => endRound(), 500);
          } else {
            // Recolocar tirador para el siguiente disparo
            spawnNewTirador();
          }
        }
      } else {
        watchTimer = 0;
      }
    }

    // Render
    draw();
  }

  function spawnNewTirador() {
    if (tirador) { try { World.remove(world, tirador); } catch(e){} tirador = null; }
    spawnTirador();
    gamePhase = 'aiming';
  }

  function endRound() {
    if (round >= totalRounds) {
      gamePhase = 'gameOver';
      showEndScreen();
    } else {
      round++;
      updateHUD();
      shotsLeft = gameConfig[difficulty].shots;
      showRoundTransition(() => resetRoundLayout());
    }
  }

  function showRoundTransition(cb) {
    const msg = document.createElement('div');
    msg.style.cssText = `
      position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;
      background:rgba(10,0,30,0.75);border-radius:12px;z-index:20;color:#fff;font-family:inherit;
    `;
    msg.innerHTML = `
      <div style="font-size:3rem;">🔮</div>
      <h3 style="font-size:1.8rem;margin:.5rem 0;color:#A78BFA;">${jt('jue.card5.roundComplete', 'Ronda {n} completada').replace('{n}', round - 1)}</h3>
      <p style="color:#C4B5FD;">${jt('jue.card5.roundPrepare', 'Preparate para la ronda {n}...').replace('{n}', round)}</p>
    `;
    canvasWrap.style.position = 'relative';
    canvasWrap.appendChild(msg);
    gsap.fromTo(msg, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' });
    setTimeout(() => {
      gsap.to(msg, { opacity: 0, scale: 0.9, duration: 0.35, ease: 'power2.in', onComplete: () => {
        msg.remove();
        cb?.();
      }});
    }, 1800);
  }

  // ── Render manual en canvas ───────────────────────────────────
  const MARBLE_COLORS = [
    '#7C3AED','#2563EB','#059669','#DC2626','#D97706',
    '#DB2777','#0891B2','#65A30D','#9333EA','#E11D48'
  ];

  function draw() {
    const W = canvas.width, H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Fondo degradado
    const bg = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W, H) * 0.7);
    bg.addColorStop(0, '#1E0A3C');
    bg.addColorStop(1, '#0A0020');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Dibujar círculo de la ronda (el hoyo)
    // Sombra exterior
    ctx.save();
    ctx.shadowColor = 'rgba(124,58,237,0.5)';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(circleCenter.x, circleCenter.y, circleRadius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(167,139,250,0.6)';
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.restore();

    // Relleno del círculo (tierra)
    const circFill = ctx.createRadialGradient(circleCenter.x, circleCenter.y - circleRadius * 0.2, 0, circleCenter.x, circleCenter.y, circleRadius);
    circFill.addColorStop(0, 'rgba(60,30,100,0.45)');
    circFill.addColorStop(1, 'rgba(30,10,60,0.2)');
    ctx.beginPath();
    ctx.arc(circleCenter.x, circleCenter.y, circleRadius, 0, Math.PI * 2);
    ctx.fillStyle = circFill;
    ctx.fill();

    // Líneas de textura en el círculo
    ctx.save();
    ctx.globalAlpha = 0.08;
    for (let i = -3; i <= 3; i++) {
      ctx.beginPath();
      ctx.moveTo(circleCenter.x - circleRadius, circleCenter.y + i * circleRadius * 0.3);
      ctx.lineTo(circleCenter.x + circleRadius, circleCenter.y + i * circleRadius * 0.3);
      ctx.strokeStyle = '#A78BFA';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    ctx.restore();

    // Dibujar canicas objetivo
    marbles.forEach((m, idx) => {
      const { x, y } = m.position;
      const hue = m.plugin?.hue ?? (idx * 37) % 360;
      const isOut = m.plugin?.isOut;

      if (isOut) {
        // Canica que salió: dibujada más pequeña y con brillo
        ctx.save();
        ctx.globalAlpha = 0.5;
        drawMarble(x, y, marbleRadius * 0.8, hue);
        ctx.restore();
      } else {
        drawMarble(x, y, marbleRadius, hue);
      }
    });

    // Dibujar tirador
    if (tirador) {
      const { x, y } = tirador.position;
      drawTirador(x, y, marbleRadius * TIRADOR_SCALE);
    }

    // Dibujar línea de aiming
    if (gamePhase === 'aiming' && aimStart && aimCurrent && tirador) {
      drawAimLine();
    }

    // Partículas
    drawParticles();

    // Label "FUERA" para canicas salidas
    marbles.forEach(m => {
      if (m.plugin?.isOut) {
        ctx.save();
        ctx.font = `bold ${marbleRadius * 0.7}px sans-serif`;
        ctx.fillStyle = '#FDE68A';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✓', m.position.x, m.position.y);
        ctx.restore();
      }
    });

    // Indicador "Apuntá y jalá" cuando está en aiming sin drag
    if (gamePhase === 'aiming' && !aimStart && tirador) {
      ctx.save();
      ctx.font = `${Math.max(12, canvas.width * 0.022)}px sans-serif`;
      ctx.fillStyle = 'rgba(196,181,253,0.85)';
      ctx.textAlign = 'center';
      ctx.fillText(jt('jue.card5.aimHint', '🖱️ Jalá desde el tirador para apuntar'), circleCenter.x, tiradorSpawnPos.y + marbleRadius * 3.5);
      ctx.restore();
    }
  }

  function drawMarble(x, y, r, hue) {
    // Sombra
    ctx.save();
    ctx.shadowColor = `hsla(${hue},70%,30%,0.6)`;
    ctx.shadowBlur = r * 0.8;
    ctx.shadowOffsetY = r * 0.3;

    // Cuerpo principal
    const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.35, r * 0.05, x, y, r);
    grad.addColorStop(0, `hsl(${hue},90%,75%)`);
    grad.addColorStop(0.5, `hsl(${hue},80%,55%)`);
    grad.addColorStop(1, `hsl(${hue},60%,30%)`);
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Brillo especular
    ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
    const shine = ctx.createRadialGradient(x - r * 0.3, y - r * 0.35, 0, x - r * 0.2, y - r * 0.25, r * 0.55);
    shine.addColorStop(0, 'rgba(255,255,255,0.75)');
    shine.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = shine;
    ctx.fill();
    ctx.restore();
  }

  function drawTirador(x, y, r) {
    ctx.save();
    ctx.shadowColor = 'rgba(250,204,21,0.7)';
    ctx.shadowBlur = r * 1.2;

    // Anillo exterior dorado
    ctx.beginPath();
    ctx.arc(x, y, r + 3, 0, Math.PI * 2);
    ctx.strokeStyle = '#FDE68A';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Cuerpo del tirador (plateado/dorado)
    const grad = ctx.createRadialGradient(x - r * 0.3, y - r * 0.35, r * 0.05, x, y, r);
    grad.addColorStop(0, '#FEF3C7');
    grad.addColorStop(0.4, '#F59E0B');
    grad.addColorStop(1, '#78350F');
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    // Brillo
    ctx.shadowBlur = 0;
    const shine = ctx.createRadialGradient(x - r * 0.3, y - r * 0.35, 0, x - r * 0.2, y - r * 0.2, r * 0.5);
    shine.addColorStop(0, 'rgba(255,255,255,0.8)');
    shine.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = shine;
    ctx.fill();

    // Etiqueta
    ctx.shadowBlur = 0;
    ctx.font = `bold ${r * 0.8}px sans-serif`;
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('T', x, y);
    ctx.restore();
  }

  function drawAimLine() {
    if (!tirador) return;
    const tp = tirador.position;
    const dx = aimStart.x - aimCurrent.x;
    const dy = aimStart.y - aimCurrent.y;
    const dist = Math.min(Math.hypot(dx, dy), MAX_POWER_PX);
    const power = dist / MAX_POWER_PX;

    // Línea de dirección (punteada)
    const dirX = dx / (Math.hypot(dx, dy) || 1);
    const dirY = dy / (Math.hypot(dx, dy) || 1);
    const lineLen = Math.min(dist * 1.5, 160);

    ctx.save();
    ctx.setLineDash([6, 5]);
    ctx.beginPath();
    ctx.moveTo(tp.x, tp.y);
    ctx.lineTo(tp.x + dirX * lineLen, tp.y + dirY * lineLen);
    const alpha = 0.4 + power * 0.5;
    ctx.strokeStyle = `rgba(253,230,138,${alpha})`;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.setLineDash([]);

    // Indicador de potencia (arco)
    ctx.beginPath();
    ctx.arc(tp.x, tp.y, marbleRadius * 1.4 + 6, 0, Math.PI * 2 * power);
    ctx.strokeStyle = power > 0.7 ? '#EF4444' : power > 0.4 ? '#F59E0B' : '#4ADE80';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Flecha en la punta
    const ex = tp.x + dirX * lineLen;
    const ey = tp.y + dirY * lineLen;
    const angle = Math.atan2(dirY, dirX);
    ctx.beginPath();
    ctx.moveTo(ex, ey);
    ctx.lineTo(ex - Math.cos(angle - 0.4) * 10, ey - Math.sin(angle - 0.4) * 10);
    ctx.lineTo(ex - Math.cos(angle + 0.4) * 10, ey - Math.sin(angle + 0.4) * 10);
    ctx.closePath();
    ctx.fillStyle = `rgba(253,230,138,${alpha})`;
    ctx.fill();
    ctx.restore();
  }

  // ── Pantalla de inicio / selector de dificultad ───────────────
  function showDifficultySelector() {
    running = false;
    paused = false;
    gamePhase = 'idle';
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    score = 0; round = 1; playedMs = 0;

    overlayCard.innerHTML = `
      <span class="overlay-tag">🔮 ${jt('jue.card5.title', 'Canicas')}</span>
      <h3 style="margin:.4rem 0 .15rem;">${jt('jue.card5.playIntroTitle', '¡El juego de patio!')}</h3>
      <p style="font-size:.85rem;opacity:.85;margin-bottom:.55rem;">
        ${jt('jue.card5.intro', 'Jalá el tirador dorado (T) y soltá para disparar. Sacá las 20 canicas del círculo lo más rápido que puedas.')}
      </p>
      <ul class="rules-list" style="text-align:left;font-size:.8rem;margin-bottom:.7rem;padding-left:0;list-style:none;">
        <li class="rule-good"><span class="rule-icon">✅</span> ${jt('jue.card5.ruleScore', '20 canicas · 3 rondas, cada vez más difícil · ¡ganá el nivel lo más rápido posible!')}</li>
        <li class="rule-bad"><span class="rule-icon">⚠️</span> ${jt('jue.card5.ruleShotsWarn', 'Tiros limitados — ¡que cada uno cuente!')}</li>
      </ul>
      <p style="font-weight:600;margin-bottom:.4rem;color:#A78BFA;">${jt('jue.card5.chooseDiff', 'Seleccioná dificultad:')}</p>
      <div class="difficulty-buttons">
        <button class="difficulty-btn easy" id="btn-easy-canicas">
          ${jt('jue.diff.easy', '🟢 Fácil')}<br><small>${jt('jue.card5.diff.easyDesc', '20 canicas · 5 tiros')}</small>
        </button>
        <button class="difficulty-btn hard" id="btn-hard-canicas">
          ${jt('jue.diff.hard', '🔴 Difícil')}<br><small>${jt('jue.card5.diff.hardDesc', '20 canicas · 4 tiros')}</small>
        </button>
      </div>
      <button class="btn-tutorial" id="btn-tutorial-canicas">🎓 ${jt('jue.tutorial.start', 'Tutorial (practicar primero)')}</button>`;
    overlay.classList.remove('hidden');
    gsap.fromTo(overlayCard, { opacity: 0, y: 30, scale: 0.92 }, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.7)' });

    document.getElementById('btn-easy-canicas').onclick = () => startGame('easy');
    document.getElementById('btn-hard-canicas').onclick = () => startGame('hard');
    document.getElementById('btn-tutorial-canicas').onclick = () => startTutorial();
  }

  function startGame(diff) {
    difficulty = diff;
    shotsLeft = gameConfig[diff].shots;
    score = 0; round = 1;
    playedMs = 0;
    particles = [];

    gsap.to(overlayCard, { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power2.in', onComplete: () => {
      overlay.classList.add('hidden');
      initEngine();
      resetRoundLayout();
      updateHUD();
      // Evita que un doble toque en el botón de dificultad deje dos
      // bucles de animación corriendo a la vez.
      cancelAnimationFrame(rafId);
      running = true;
      lastTs = null;
      rafId = requestAnimationFrame(step);
      playMusic();
    }});
  }

  function initEngine() {
    if (engine) { World.clear(world); Engine.clear(engine); }
    engine = Engine.create({ gravity: { x: 0, y: 0 } }); // vista cenital, sin gravedad
    world = engine.world;
    setupCollisionEvents();
  }

  // ── Fin del juego ─────────────────────────────────────────────
  function showEndScreen() {
    running = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    stopMusic();

    // Animación de victoria en canvas
    const confetti = [];
    for (let i = 0; i < 60; i++) {
      confetti.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        color: `hsl(${Math.random() * 360},80%,65%)`
      });
      spawnParticles(confetti[i].x, confetti[i].y, confetti[i].color);
    }

    // Guardar score en la base de datos (como el resto de los juegos,
    // en vez de solo localStorage: antes Canicas era el único que no
    // mandaba el puntaje al servidor, así que su récord no aparecía
    // junto con el de los demás juegos ni se guardaba en la cuenta).
    // El id interno de este juego es "elotes" (mismo que sus elementos del
    // DOM: hud-elotes, pauseBtn-elotes, etc.) y así también está en la
    // lista blanca del backend (GAME_NAMES_VALIDOS espera "elotes-easy" /
    // "elotes-hard"). "canicas" es solo el nombre visible para el jugador.
    const gameName = `elotes-${difficulty}`;

    setTimeout(() => {
      overlayCard.innerHTML = `
        <span class="overlay-tag">🔮 ${jt('jue.card5.title', 'Canicas')}</span>
        <h3 style="margin:.5rem 0;">${jt('jue.card5.end.finished', '¡Nivel completado!')}</h3>
        <p style="font-size:2rem;font-weight:800;color:#A78BFA;margin:.3rem 0;">${formatTime(playedMs)}</p>
        <p style="font-size:.85rem;opacity:.8;margin-bottom:.2rem;">${jt('jue.card5.end.roundsPlayed', 'en {n} rondas').replace('{n}', totalRounds)}</p>
        <div style="display:flex;gap:10px;justify-content:center;">
          <button class="btn-primary" id="can-replay">🔮 ${jt('jue.end.playAgain', 'Jugar de nuevo')}</button>
          <button class="btn-primary" id="can-menu" style="background:var(--navy,#113068);border:2px solid #fff;">${jt('jue.pause.menu', 'Menú')}</button>
        </div>`;
      overlay.classList.remove('hidden');
      gsap.fromTo(overlayCard, { opacity: 0, scale: 0.8, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'elastic.out(1,0.7)' });

      document.getElementById('can-replay').onclick = showDifficultySelector;
      document.getElementById('can-menu').onclick = showDifficultySelector;

      // El marcador que se guarda en el servidor sigue siendo la cantidad
      // de canicas sacadas (mismo formato que usa el resto del backend de
      // puntajes); ya no se muestra en pantalla porque la interfaz ahora
      // se enfoca en el tiempo, no en los puntos.
      guardarPuntajeJuego(gameName, score);
    }, 800);
  }

  // ── Pausa ─────────────────────────────────────────────────────
  const pauseBtn = document.getElementById('pauseBtn-elotes');
  const pauseIcon = document.getElementById('pauseIcon-elotes');
  const pauseOverlay = document.getElementById('pauseOverlay-elotes');
  const resumeBtn = document.getElementById('resumeBtn-elotes');
  const menuBtn = document.getElementById('menuBtn-elotes');

  function pauseGame() {
    if (!running || paused) return;
    paused = true;
    canvasWrap?.classList.add('is-paused');
    if (pauseIcon) pauseIcon.textContent = '▶️';
    pauseOverlay?.classList.remove('hidden');
    bgMusic?.pause();
    if (tutorialMode) hideTutorialBubble();
  }
  function resumeGame() {
    if (!running || !paused) return;
    paused = false;
    canvasWrap?.classList.remove('is-paused');
    if (pauseIcon) pauseIcon.textContent = '⏸️';
    pauseOverlay?.classList.add('hidden');
    bgMusic?.play().catch(() => {});
    lastTs = null;
    if (tutorialMode && tutorialStep >= 0) showTutorialStep(tutorialStep);
    rafId = requestAnimationFrame(step);
  }
  function returnToMenu() {
    running = false;
    paused = false;
    tutorialMode = false;
    hideTutorialBubble();
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if (pauseIcon) pauseIcon.textContent = '⏸️';
    showDifficultySelector();
  }

  if (pauseBtn) pauseBtn.addEventListener('click', () => paused ? resumeGame() : pauseGame());
  if (resumeBtn) resumeBtn.addEventListener('click', resumeGame);
  if (menuBtn) menuBtn.addEventListener('click', returnToMenu);

  // ── Visibilidad del modal ─────────────────────────────────────
  gameContent?.addEventListener('gameVisible', e => {
    if (e.detail.gameId === 'elotes') {
      isGameVisible = true;
      resizeCanvas();
      if (!running && gamePhase === 'idle') showDifficultySelector();
      else if (paused && running) resumeGame();
      else if (running) { lastTs = null; rafId = requestAnimationFrame(step); }
    }
  });

  window.switchGameState('elotes', {
    pause: pauseGame,
    resume: resumeGame,
    stop: stopMusic,
    running: () => running,
    paused: () => paused,
    setVisible: (visible) => { isGameVisible = visible; },
    reloadMenu: showDifficultySelector
  });
})();

/* ---------------------------------------------------------
   JUEGO 6: TORITO PINTO (FIESTAS PATRONALES DE EL SALVADOR)
   Jugabilidad mejorada con Matter.js, GSAP y Web Audio API.
   - Pasa entre la gente y anímala con chispas y bailes tradicionales.
   - Recoge silbadores y cuetillos para ganar energía y activar turbos.
   - Llega hasta el Atrio de la Iglesia / Plaza Mayor de las Fiestas Patronales.
--------------------------------------------------------- */
(function initGameTorito(){
  const canvas = document.getElementById('canvas-torito');
  if(!canvas || typeof Matter === 'undefined') return;

  const canvasWrap = document.getElementById('torito-canvas-wrap');
  const { Engine, World, Bodies, Body, Events, Composite } = Matter;
  const ctx = canvas.getContext('2d');

  const hud = document.getElementById('hud-torito');
  const overlay = document.getElementById('overlay-torito');
  const overlayCard = document.getElementById('overlay-card-torito');
  const gameContent = document.getElementById('modal-torito');
  const popupsLayer = document.getElementById('torito-popups');

  let isGameVisible = false;
  let running = false;
  let paused = false;
  let rafId = null;

  let gameDifficulty = 'easy';
  let targetDistance = 1200;
  let destinationName = 'Suchitoto — Parroquia Santa Lucía';

  const gameConfig = {
    easy: { baseSpeed: 3.6, energyDrainRate: 0.024, obstacleDrain: 14, turboSpeed: 6.2 },
    hard: { baseSpeed: 5.2, energyDrainRate: 0.038, obstacleDrain: 18, turboSpeed: 8.0 }
  };

  const lanesCount = 3;
  let laneWidth = 0;
  let streetLeft = 0, streetRight = 0;
  let stallLeftX = 0, stallRightX = 0;
  const lanePositions = [];

  let toritoLane = 1;
  let toritoY = 0;
  let distance = 0, energy = 100;
  let score = 0;
  let combo = 1;
  let comboTimer = 0;
  let maxCombo = 1;
  let genteAnimada = 0;
  let silbadoresRecogidos = 0;
  let cuetillosRecogidos = 0;

  let turboTimer = 0;
  let isTurboActive = false;
  let isArriving = false;
  let arrivalTimer = 0;

  let stalls = [];
  let particles = [];
  let spectators = [];
  let sparks = [];

  // ================= MODO TUTORIAL =================
  // Corrida súper fácil y guiada: el juego no genera obstáculos nuevos
  // (spawnEntities se congela) mientras se espera que el jugador haga la
  // acción pedida. Al lograrla, se muestra un "¡Bien!" y pasa al próximo
  // paso; al terminar todos los pasos, invita a jugar la partida real.
  let tutorialMode = false;
  let tutorialStep = -1;
  let tutorialWaiting = false;
  const tutorialSteps = [
    { action: 'lane', text: () => esTactilJuegos
        ? jt('jue.tutorial.torito.lane.tap', 'Tocá cualquier carril de la calle para que el torito salte hacia ahí. ¡Probá ahora!')
        : jt('jue.tutorial.torito.lane.key', 'Usá A/D o las flechas ⬅️➡️ para cambiar de carril. ¡Probá ahora!') },
    { action: 'lane', text: () => jt('jue.tutorial.torito.lane2', '¡Muy bien! Cambiá una vez más de carril para seguir practicando.') },
    { action: 'dash', text: () => esTactilJuegos
        ? jt('jue.tutorial.torito.dash.tap', 'Doble toque en la calle = ráfaga de chispas para animar a la gente cercana. ¡Probalo!')
        : jt('jue.tutorial.torito.dash.key', 'Presioná la barra espaciadora para lanzar una ráfaga de chispas. ¡Probalo!') }
  ];

  function tutorialBubble(html) {
    let el = canvasWrap?.querySelector('.tutorial-bubble');
    if (!el && canvasWrap) {
      el = document.createElement('div');
      el.className = 'tutorial-bubble';
      canvasWrap.appendChild(el);
    }
    if (el) el.innerHTML = html;
  }
  function hideTutorialBubble() {
    canvasWrap?.querySelector('.tutorial-bubble')?.remove();
  }

  function showTutorialStep(i) {
    tutorialStep = i;
    if (i >= tutorialSteps.length) { finishTutorial(); return; }
    tutorialWaiting = true;
    const n = i + 1, total = tutorialSteps.length;
    tutorialBubble(`
      <span class="tutorial-bubble__tag">🎓 ${jt('jue.tutorial.tag', 'Tutorial')} ${n}/${total}</span>
      <p>${tutorialSteps[i].text()}<span class="tutorial-pulse"></span></p>
    `);
  }

  function notifyTutorial(action) {
    if (!tutorialMode || !tutorialWaiting) return;
    if (tutorialSteps[tutorialStep].action !== action) return;
    tutorialWaiting = false;
    tutorialBubble(`<span class="tutorial-bubble__tag good">✅ ${jt('jue.tutorial.good', '¡Bien hecho!')}</span>`);
    setTimeout(() => { if (tutorialMode) showTutorialStep(tutorialStep + 1); }, 1000);
  }

  function finishTutorial() {
    tutorialMode = false;
    hideTutorialBubble();
    running = false;
    cancelAnimationFrame(rafId);
    showOverlay(`
      <span class="overlay-tag">🎉 ${jt('jue.tutorial.doneTag', 'Tutorial completo')}</span>
      <h3>${jt('jue.tutorial.doneTitle', '¡Ya sabés correr el Torito!')}</h3>
      <p>${jt('jue.tutorial.doneText', 'Ahora vamos a la corrida de verdad: elegí tu destino y la dificultad.')}</p>
      <button class="btn-primary" id="btn-tutorial-done-torito">${jt('jue.tutorial.playReal', '🐂 Jugar de verdad')}</button>
    `);
    document.getElementById('btn-tutorial-done-torito').onclick = showDistanceSelector;
  }

  function startTutorial() {
    gameDifficulty = 'easy';
    targetDistance = 999999; // nunca se llega mientras dura el tutorial
    destinationName = jt('jue.tutorial.destName', 'Práctica');
    resetGame();
    hideOverlay();
    cancelAnimationFrame(rafId);
    tutorialMode = true;
    running = true;
    paused = false;
    playMusic();
    lastTime = null;
    physicsAccum = 0;
    rafId = requestAnimationFrame(step);
    showTutorialStep(0);
  }

  // ================= WEB AUDIO SFX SYNTHESIZER =================
  let audioCtx = null;
  function getAudioContext() {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioCtx = new AudioCtx();
    }
    if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  function playSound(type) {
    if (volume <= 0) return;
    try {
      const actx = getAudioContext();
      if (!actx) return;
      const t = actx.currentTime;

      if (type === 'whistle') {
        // Silbador rocket whistle (rising frequency glide)
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(450, t);
        osc.frequency.exponentialRampToValueAtTime(1800, t + 0.3);
        osc.frequency.exponentialRampToValueAtTime(2600, t + 0.55);
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.25 * volume, t + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start(t);
        osc.stop(t + 0.56);
      } else if (type === 'pop') {
        // Cuetillo / Triquitraca pop
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(550 + Math.random() * 200, t);
        osc.frequency.exponentialRampToValueAtTime(60, t + 0.08);
        gain.gain.setValueAtTime(0.3 * volume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start(t);
        osc.stop(t + 0.09);
      } else if (type === 'cheer') {
        // Crowd cheer burst
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, t); // C5
        osc.frequency.setValueAtTime(659.25, t + 0.06); // E5
        osc.frequency.setValueAtTime(783.99, t + 0.12); // G5
        gain.gain.setValueAtTime(0.2 * volume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start(t);
        osc.stop(t + 0.32);
      } else if (type === 'spark') {
        // Sparkler crackle
        const bufferSize = Math.floor(actx.sampleRate * 0.12);
        const buffer = actx.createBuffer(1, bufferSize, actx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * (Math.random() > 0.5 ? 1 : 0);
        const noise = actx.createBufferSource();
        noise.buffer = buffer;
        const filter = actx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(3200, t);
        const gain = actx.createGain();
        gain.gain.setValueAtTime(0.2 * volume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(actx.destination);
        noise.start(t);
      } else if (type === 'dash') {
        // Embestida whoosh
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, t);
        osc.frequency.exponentialRampToValueAtTime(380, t + 0.15);
        osc.frequency.exponentialRampToValueAtTime(80, t + 0.35);
        gain.gain.setValueAtTime(0.25 * volume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start(t);
        osc.stop(t + 0.36);
      } else if (type === 'bell') {
        // Church arrival bells
        const osc = actx.createOscillator();
        const gain = actx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, t);
        gain.gain.setValueAtTime(0.4 * volume, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
        osc.connect(gain);
        gain.connect(actx.destination);
        osc.start(t);
        osc.stop(t + 1.25);
      }
    } catch(e){}
  }

  // ================= SALVADOREAN SLANG POPUPS (GSAP) =================
  const salvadoranPraise = [
    { text: jt('jue.card6.slang1', '¡QUÉ CHIVO!'), color: '#00e5ff' },
    { text: jt('jue.card6.slang2', '¡PUCHICA!'), color: '#ffea00' },
    { text: jt('jue.card6.slang3', '¡ÉCHALE TORITO!'), color: '#ff0055' },
    { text: jt('jue.card6.slang4', '¡CALIDÁ!'), color: '#00e676' },
    { text: jt('jue.card6.slang5', '¡BÁRBARO!'), color: '#ff9100' },
    { text: jt('jue.card6.slang6', '¡CHULADA!'), color: '#7c4dff' },
    { text: jt('jue.card6.slang7', '¡DE TOCHO MOROCHO!'), color: '#39ff14' },
    { text: jt('jue.card6.slang8', '¡VIVA LA FIESTA!'), color: '#ffd700' }
  ];

  function showSlangCallout(customText, screenX, screenY) {
    const layer = popupsLayer || canvasWrap;
    if (!layer) return;

    const item = salvadoranPraise[Math.floor(Math.random() * salvadoranPraise.length)];
    const text = customText || item.text;
    const color = item.color;

    const x = screenX !== undefined ? screenX : (canvas.width * 0.25 + Math.random() * canvas.width * 0.5);
    const y = screenY !== undefined ? screenY : (canvas.height * 0.35 + Math.random() * canvas.height * 0.3);

    const el = document.createElement('div');
    el.className = 'torito-slang-popup';
    el.innerText = text;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.color = color;

    layer.appendChild(el);

    if (window.gsap) {
      const rot = (Math.random() - 0.5) * 26;
      gsap.timeline({ onComplete: () => el.remove() })
        .fromTo(el, { scale: 0.3, opacity: 0, rotation: rot, y: 0 }, { scale: 1.25, opacity: 1, duration: 0.22, ease: 'back.out(2)' })
        .to(el, { y: -50 - Math.random() * 30, scale: 0.95, duration: 0.5, ease: 'power1.out' })
        .to(el, { opacity: 0, scale: 0.5, duration: 0.25, ease: 'power2.in' }, '-=0.15');
    } else {
      setTimeout(() => el.remove(), 700);
    }
  }

  // ================= CANVAS RESIZING & PHYSICS BOUNDS =================
  // Antes, al entrar en pantalla completa se reusaba la resolución chica de
  // la ventana normal y el navegador solo la estiraba (se veía borrosa/pixelada).
  // Ahora medimos siempre el tamaño real del canvas, y como esta función ya
  // reconstruye carriles y paredes, el fullscreen queda nítido automáticamente.
  function resizeCanvas() {
    const wrap = canvasWrap || canvas.closest('.canvas-wrap');
    const rect = wrap ? wrap.getBoundingClientRect() : canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const sideW = canvas.width * 0.16;
    streetLeft = sideW;
    streetRight = canvas.width - sideW;
    const streetWidth = streetRight - streetLeft;

    laneWidth = streetWidth / lanesCount;
    for(let i = 0; i < lanesCount; i++){
      lanePositions[i] = streetLeft + (i * laneWidth) + (laneWidth / 2);
    }

    stallLeftX = sideW * 0.52;
    stallRightX = canvas.width - sideW * 0.52;

    toritoY = canvas.height - 110;

    if(engine){
      Composite.remove(world, wallLeft);
      Composite.remove(world, wallRight);
      wallLeft = Bodies.rectangle(streetLeft - 10, canvas.height/2, 20, canvas.height * 2, { isStatic: true, label: 'wall' });
      wallRight = Bodies.rectangle(streetRight + 10, canvas.height/2, 20, canvas.height * 2, { isStatic: true, label: 'wall' });
      World.add(world, [wallLeft, wallRight]);

      if(toritoBody) Body.setPosition(toritoBody, { x: lanePositions[toritoLane], y: toritoY });
    }
  }

  const engine = Engine.create();
  engine.gravity.y = 0;
  const world = engine.world;

  let wallLeft = Bodies.rectangle(-10, 0, 20, 10, { isStatic: true, label: 'wall' });
  let wallRight = Bodies.rectangle(-10, 0, 20, 10, { isStatic: true, label: 'wall' });
  World.add(world, [wallLeft, wallRight]);

  const toritoBody = Bodies.rectangle(0, 0, 48, 32, { isStatic: true, label: 'torito' });
  World.add(world, toritoBody);

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  document.addEventListener('fullscreenchange', () => { setTimeout(resizeCanvas, 100); });
  document.addEventListener('webkitfullscreenchange', () => { setTimeout(resizeCanvas, 100); });

  const fsBtn = canvasWrap?.querySelector('.fullscreen-btn');
  if (fsBtn) {
    fsBtn.addEventListener('click', () => {
      const isCurrent = document.fullscreenElement === canvasWrap || document.webkitFullscreenElement === canvasWrap;
      if (!isCurrent) {
        const req = canvasWrap.requestFullscreen || canvasWrap.webkitRequestFullscreen || canvasWrap.msRequestFullscreen;
        req?.call(canvasWrap);
      } else {
        const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
        exit?.call(document);
      }
    });
  }

  // ================= INPUTS & CONTROLS =================
  let keys = {};
  window.addEventListener('keydown', e => {
    keys[e.key.toLowerCase()] = true;
    if(running && !paused) {
      if(e.key.toLowerCase() === 'a' || e.key === 'ArrowLeft') moveLane(-1);
      if(e.key.toLowerCase() === 'd' || e.key === 'ArrowRight') moveLane(1);
      if(e.code === 'Space') {
        e.preventDefault();
        performSparkDash();
      }
    }
  });
  window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

  let lastTapTime = 0;
  let toritoTouchDragging = false;
  canvas.addEventListener('touchstart', e => {
    if(!running || paused) return;
    const now = Date.now();
    if (now - lastTapTime < 300) {
      // Doble toque = ráfaga de chispas (equivalente táctil de la barra espaciadora)
      performSparkDash();
      toritoTouchDragging = false;
    } else {
      const r = canvas.getBoundingClientRect();
      const touchX = e.touches[0].clientX - r.left;
      // Tocar directamente el carril (izquierdo/centro/derecho de la calle):
      // el torito salta a ESE carril, en vez de solo moverse un carril hacia
      // el lado tocado. Si el toque cae fuera de la calle (aceras), se usa
      // el carril más cercano a ese borde.
      goToLane(laneFromX(touchX));
      toritoTouchDragging = true;
    }
    lastTapTime = now;
  }, { passive: true });
  // Mientras se arrastra el dedo (sin haber sido el segundo toque de un
  // doble-toque), el carril sigue al dedo en tiempo real, igual que en el
  // juego de los buses: antes solo el toque inicial movía el carril y había
  // que soltar y volver a tocar para seguir cambiando, lo que se sentía
  // poco responsivo en celular.
  canvas.addEventListener('touchmove', e => {
    if (!running || paused || !toritoTouchDragging) return;
    const r = canvas.getBoundingClientRect();
    const touchX = e.touches[0].clientX - r.left;
    goToLane(laneFromX(touchX));
  }, { passive: true });
  canvas.addEventListener('touchend', () => { toritoTouchDragging = false; }, { passive: true });

  function laneFromX(x) {
    if (!laneWidth) return toritoLane;
    const clampedX = Math.min(streetRight - 1, Math.max(streetLeft, x));
    const lane = Math.floor((clampedX - streetLeft) / laneWidth);
    return Math.min(lanesCount - 1, Math.max(0, lane));
  }

  function goToLane(lane) {
    if(lane !== toritoLane && lane >= 0 && lane < lanesCount) {
      toritoLane = lane;
      playSound('spark');
    }
    notifyTutorial('lane');
  }

  function moveLane(direction) {
    const nextLane = toritoLane + direction;
    if(nextLane >= 0 && nextLane < lanesCount) {
      toritoLane = nextLane;
      playSound('spark');
    }
    notifyTutorial('lane');
  }

  function performSparkDash() {
    if (energy < 10) return;
    notifyTutorial('dash');
    energy = Math.max(0, energy - 8);
    playSound('dash');
    createFireworkBurst(toritoBody.position.x, toritoY, 18);
    if (window.gsap) {
      gsap.fromTo(canvas, { x: -4 }, { x: 4, duration: 0.04, repeat: 4, yoyo: true, onComplete: () => gsap.set(canvas, { x: 0 }) });
    }
    // Animate all nearby spectators instantly
    animateNearbySpectators(toritoBody.position.x, toritoY, 160);
  }

  // ================= HUD & MUSIC =================
  function updateHud(){
    const prog = document.getElementById('t-prog-fill');
    const energyFill = document.getElementById('t-energy-fill');
    const hudScore = document.getElementById('t-hud-score');
    const hudCombo = document.getElementById('t-hud-combo');

    if(prog) prog.style.width = Math.min(100, (distance / targetDistance) * 100) + '%';
    if(energyFill) {
      energyFill.style.width = Math.max(0, energy) + '%';
      energyFill.style.background = energy > 50 
        ? 'linear-gradient(90deg, #00e676, #76ff03)' 
        : energy > 22 ? 'linear-gradient(90deg, #ffb300, #ffea00)' : 'linear-gradient(90deg, #ff1744, #ff5252)';
    }
    if(hudScore) hudScore.innerText = `${Math.round(score)} pts`;
    if(hudCombo) {
      hudCombo.innerText = `x${combo}`;
      hudCombo.parentElement.style.display = combo > 1 ? 'inline-flex' : 'none';
    }
  }

  if(hud) {
    hud.innerHTML = `
      <div class="torito-hud-bar-container">
        <span class="torito-hud-label">⛪ ${jt('jue.card6.hud.route', 'Ruta')}</span>
        <div class="torito-meter-track"><div id="t-prog-fill" class="torito-meter-fill"></div></div>
      </div>
      <div class="torito-hud-bar-container">
        <span class="torito-hud-label">🧨 ${jt('jue.card6.hud.gunpowder', 'Pólvora')}</span>
        <div class="torito-meter-track"><div id="t-energy-fill" class="torito-meter-fill"></div></div>
      </div>
      <div class="torito-hud-bar-container">
        <span class="torito-hud-label">🎉 <b id="t-hud-score">0 pts</b></span>
      </div>
      <div class="torito-combo-badge" style="display:none;">
        <span>🔥</span><span id="t-hud-combo">x1</span>
      </div>`;
  }

  const bgMusic = document.getElementById('bgMusic-torito');
  const volumeSlider = document.getElementById('volumeSlider-torito');
  const volumeIcon = document.getElementById('volumeIcon-torito');
  const damageOverlay = document.getElementById('damageOverlay-torito');
  let volume = Number(volumeSlider?.value || 0.25);
  let savedVolume = volume;

  if(bgMusic){
    bgMusic.volume = volume;
    bgMusic.muted = false;
  }

  volumeSlider?.addEventListener('input', (event)=>{
    volume = Number(event.target.value);
    if(bgMusic){
      bgMusic.volume = volume;
      bgMusic.muted = volume <= 0;
    }
    if(volumeIcon) volumeIcon.textContent = volume <= 0 ? '🔇' : volume < 0.35 ? '🔉' : '🔊';
  });

  function playMusic(){
    if(!bgMusic) return;
    bgMusic.muted = false;
    bgMusic.volume = volume;
    bgMusic.play().catch(()=>{});
  }
  function stopMusic(){ if(bgMusic) { bgMusic.pause(); bgMusic.currentTime = 0; } }

  function flashDamage(){
    if(!damageOverlay) return;
    damageOverlay.style.opacity = '1';
    setTimeout(() => { damageOverlay.style.opacity = '0'; }, 150);
  }

  function showOverlay(html){
    overlayCard.innerHTML = html;
    overlay.classList.remove('hidden');
    overlay.style.backdropFilter = 'none';
    overlay.style.webkitBackdropFilter = 'none';
    if(window.gsap){
      gsap.fromTo(overlayCard, { autoAlpha: 0, y: 18, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.5)' });
      gsap.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: 'power1.out' });
    }
  }
  function hideOverlay(){
    if(window.gsap){
      overlay.style.pointerEvents = 'none';
      gsap.to(overlayCard, { autoAlpha: 0, y: -12, scale: 0.97, duration: 0.25, ease: 'power1.in' });
      gsap.to(overlay, { autoAlpha: 0, duration: 0.25, ease: 'power1.in', onComplete: () => { overlay.classList.add('hidden'); overlay.style.pointerEvents = ''; } });
    } else {
      overlay.classList.add('hidden');
    }
  }

  // ================= RESET & ENTITY CREATION =================
  function resetGame() {
    resizeCanvas();
    toritoLane = 1;
    Body.setPosition(toritoBody, { x: lanePositions[1], y: toritoY });
    distance = 0;
    energy = 100;
    score = 0;
    combo = 1;
    comboTimer = 0;
    maxCombo = 1;
    genteAnimada = 0;
    silbadoresRecogidos = 0;
    cuetillosRecogidos = 0;
    turboTimer = 0;
    isTurboActive = false;
    isArriving = false;
    arrivalTimer = 0;
    stalls = [];
    particles = [];
    sparks = [];

    Composite.allBodies(world).forEach(b => {
      if(b.label === 'carreta' || b.label === 'persona' || b.label === 'silbador' || b.label === 'cuetillo' || b.label === 'pupusa' || b.label === 'agua') {
        World.remove(world, b);
      }
    });
  }

  function isLaneOccupied(lane) {
    const threshold = 180;
    const laneX = lanePositions[lane];
    const bodies = Composite.allBodies(world);
    for (const b of bodies) {
      if (['carreta', 'persona', 'silbador', 'cuetillo', 'pupusa', 'agua'].includes(b.label)) {
        if (Math.abs(b.position.x - laneX) < 32 && b.position.y < threshold) {
          return true;
        }
      }
    }
    return false;
  }

  // 1. Spawning Spectators / Dancers (Gente que se anima)
  function spawnPersona(lane){
    const body = Bodies.circle(lanePositions[lane], -40, 14, {
      restitution: 0.6, friction: 0.25, frictionAir: 0.015, label: 'persona'
    });
    body.isCheering = false;
    body.cheerTimer = 0;
    body.personType = Math.random() > 0.5 ? 'volcanena' : 'campesino';
    body.outfitColor = body.personType === 'volcanena'
      ? ['#e63946', '#ff007f', '#3a86c8', '#2fbf9f', '#7d3ac1'][Math.floor(Math.random() * 5)]
      : '#f8f4e6';
    World.add(world, body);
  }

  // 2. Spawning Silbadores (Whistling rockets that recharge big energy & give speed)
  function spawnSilbador(lane){
    const body = Bodies.circle(lanePositions[lane], -40, 12, {
      restitution: 0.7, friction: 0.1, isSensor: true, label: 'silbador'
    });
    World.add(world, body);
  }

  // 3. Spawning Cuetillos (Firecrackers that recharge energy & burst sparks)
  function spawnCuetillo(lane){
    const body = Bodies.circle(lanePositions[lane], -40, 10, {
      restitution: 0.6, friction: 0.2, isSensor: true, label: 'cuetillo'
    });
    World.add(world, body);
  }

  // 4. Spawning Pupusas (Bonus food pickup)
  function spawnPupusa(lane){
    const body = Bodies.circle(lanePositions[lane], -40, 11, {
      restitution: 0.5, friction: 0.2, isSensor: true, label: 'pupusa'
    });
    World.add(world, body);
  }

  // 5. Spawning Heavy Obstacles (Carretas) & Hazards (Baldes de agua)
  function spawnCarreta(lane){
    const body = Bodies.rectangle(lanePositions[lane], -40, 44, 24, {
      restitution: 0.35, friction: 0.4, frictionAir: 0.01, label: 'carreta'
    });
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.03);
    World.add(world, body);
  }

  function spawnAgua(lane){
    const body = Bodies.circle(lanePositions[lane], -40, 12, {
      restitution: 0.4, friction: 0.2, label: 'agua'
    });
    World.add(world, body);
  }

  function spawnStall(){
    const side = Math.random() > 0.5 ? 'left' : 'right';
    stalls.push({ x: side === 'left' ? stallLeftX : stallRightX, y: -50, side });
  }

  function countBodies(label){
    return Composite.allBodies(world).filter(b => b.label === label).length;
  }

  function spawnEntities() {
    if (isArriving) return; // Stop spawning obstacles when entering church plaza!
    if (tutorialMode && tutorialWaiting) return; // Congela obstáculos mientras se espera la acción del tutorial

    const config = gameConfig[gameDifficulty];
    let lane = Math.floor(Math.random() * lanesCount);

    // High spawn rate for people so you can pass between them and cheer them!
    if (!isLaneOccupied(lane) && Math.random() < 0.014 && countBodies('persona') < 5) {
      spawnPersona(lane);
    }

    lane = Math.floor(Math.random() * lanesCount);
    // Silbadores (Rocket power)
    if (!isLaneOccupied(lane) && Math.random() < 0.009 && countBodies('silbador') < 2) {
      spawnSilbador(lane);
    }

    lane = Math.floor(Math.random() * lanesCount);
    // Cuetillos (Firecrackers)
    if (!isLaneOccupied(lane) && Math.random() < 0.011 && countBodies('cuetillo') < 3) {
      spawnCuetillo(lane);
    }

    lane = Math.floor(Math.random() * lanesCount);
    // Pupusa food pickup
    if (!isLaneOccupied(lane) && Math.random() < 0.005 && countBodies('pupusa') < 2) {
      spawnPupusa(lane);
    }

    lane = Math.floor(Math.random() * lanesCount);
    // Carreta obstacle
    if (!isLaneOccupied(lane) && Math.random() < (gameDifficulty === 'hard' ? 0.008 : 0.005) && countBodies('carreta') < 2) {
      spawnCarreta(lane);
    }

    // Puestos along sidewalks
    if(Math.random() < 0.008 && stalls.length < 3) spawnStall();
  }

  // ================= ANIMATING PEOPLE & COLLISIONS =================
  const toRemove = new Set();

  function animateNearbySpectators(x, y, radius = 90) {
    Composite.allBodies(world).forEach(b => {
      if (b.label === 'persona' && !b.isCheering) {
        const dx = b.position.x - x;
        const dy = b.position.y - y;
        if (Math.sqrt(dx * dx + dy * dy) < radius) {
          b.isCheering = true;
          b.cheerTimer = 80;
          genteAnimada++;
          score += 100 * combo;
          combo = Math.min(15, combo + 1);
          comboTimer = 160;
          energy = Math.min(100, energy + 2.5); // Cheering people restores a little energy!
          playSound('cheer');
          createFireworkBurst(b.position.x, b.position.y, 10);
          if (combo % 3 === 0) showSlangCallout(null, b.position.x, b.position.y);
        }
      }
    });
  }

  Events.on(engine, 'collisionStart', (evt) => {
    const config = gameConfig[gameDifficulty];
    for(const pair of evt.pairs){
      const bodies = [pair.bodyA, pair.bodyB];
      const toritoHit = bodies.find(b => b.label === 'torito');
      const other = bodies.find(b => ['carreta', 'persona', 'silbador', 'cuetillo', 'pupusa', 'agua'].includes(b.label));
      if(!toritoHit || !other || other.hit) continue;

      other.hit = true;

      // 1. PERSONA: Animar a la gente alegremente
      if(other.label === 'persona') {
        other.isCheering = true;
        other.cheerTimer = 90;
        genteAnimada++;
        score += 120 * combo;
        combo = Math.min(15, combo + 1);
        comboTimer = 180;
        energy = Math.min(100, energy + 4);

        // Apply playful push force
        const angle = (other.position.x > toritoBody.position.x) ? 0.3 : -0.3;
        Body.applyForce(other, other.position, { x: angle * 0.02, y: -0.015 });
        Body.setAngularVelocity(other, angle * 0.2);

        playSound('cheer');
        createFireworkBurst(other.position.x, other.position.y, 14);
        showSlangCallout(jt('jue.card6.calloutOle', '¡Olé Torito! 🎉'), other.position.x, other.position.y);
        continue;
      }

      // 2. SILBADOR: Ganar energía y activar Turbo Silbador
      if(other.label === 'silbador') {
        energy = Math.min(100, energy + 24);
        score += 250 * combo;
        silbadoresRecogidos++;
        turboTimer = 180; // ~3 seconds of Turbo Rocket
        isTurboActive = true;

        playSound('whistle');
        createFireworkBurst(other.position.x, other.position.y, 25);
        showSlangCallout(jt('jue.card6.calloutTurbo', '🚀 ¡TURBO SILBADOR!'), other.position.x, other.position.y);
        toRemove.add(other);
        continue;
      }

      // 3. CUETILLO: Ganar energía y lluvia de chispas
      if(other.label === 'cuetillo') {
        energy = Math.min(100, energy + 16);
        score += 180 * combo;
        cuetillosRecogidos++;

        playSound('pop');
        createFireworkBurst(other.position.x, other.position.y, 20);
        showSlangCallout(jt('jue.card6.calloutCuetillo', '🧨 ¡CUETILLO!'), other.position.x, other.position.y);
        animateNearbySpectators(other.position.x, other.position.y, 130);
        toRemove.add(other);
        continue;
      }

      // 4. PUPUSA: Deliciosa recarga de energía
      if(other.label === 'pupusa') {
        energy = Math.min(100, energy + 28);
        score += 300 * combo;
        playSound('cheer');
        createFireworkBurst(other.position.x, other.position.y, 16);
        showSlangCallout(jt('jue.card6.calloutPupusa', '🫓 ¡Pupusa de Loroco!'), other.position.x, other.position.y);
        toRemove.add(other);
        continue;
      }

      // 5. CARRETA / OBSTACULO: Choque que drena energía
      if(other.label === 'carreta') {
        const kickX = (Math.random() - 0.5) * 0.045;
        Body.applyForce(other, other.position, { x: kickX, y: -0.02 });
        Body.setAngularVelocity(other, (Math.random() - 0.5) * 0.5);

        energy = Math.max(0, energy - config.obstacleDrain);
        combo = 1; // Reset combo on heavy crash
        flashDamage();
        playSound('pop');
        showSlangCallout(jt('jue.card6.calloutCarreta', '¡Cuidado con la carreta! ⚠️'), other.position.x, other.position.y);
        setTimeout(() => toRemove.add(other), 240);
        continue;
      }

      // 6. AGUA: Balde de agua que apaga cohetes
      if(other.label === 'agua') {
        energy = Math.max(0, energy - 18);
        combo = 1;
        flashDamage();
        showSlangCallout(jt('jue.card6.calloutAgua', '¡Agua fría! 💦'), other.position.x, other.position.y);
        setTimeout(() => toRemove.add(other), 180);
      }
    }
  });

  // ================= MAIN STEP LOOP =================
  let lastTime = null, physicsAccum = 0;
  const FIXED_STEP = 1000 / 60;

  function step(timestamp){
    if(!running || !isGameVisible) return;

    // Toda la simulación (velocidad del torito, distancia recorrida, spawns,
    // timers de combo/turbo) está calibrada asumiendo 60 ticks por segundo.
    // Antes cada llamada de requestAnimationFrame corría exactamente un
    // tick, así que en pantallas de 90/120/144Hz el torito corría mucho más
    // rápido de lo esperado. Se desacopla la simulación del refresco de
    // pantalla acumulando el tiempo real transcurrido y corriendo tantos
    // ticks fijos de 16.667ms como corresponda (topado para no colgar el
    // navegador tras una pausa larga o una pestaña en segundo plano).
    if (lastTime === null) lastTime = timestamp;
    const frameTime = Math.min(Math.max(timestamp - lastTime, 0), 250);
    lastTime = timestamp;
    physicsAccum += frameTime;

    let ticks = 0;
    while (physicsAccum >= FIXED_STEP && ticks < 6 && running) {
      simulateTick();
      physicsAccum -= FIXED_STEP;
      ticks++;
    }

    if (!running) return;

    // ================= DRAWING =================
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStreet();
    stalls.forEach(drawStall);

    Composite.allBodies(world).forEach(b => {
      if(b.label === 'carreta') drawCarreta(b);
      else if(b.label === 'persona') drawPersona(b);
      else if(b.label === 'silbador') drawSilbador(b);
      else if(b.label === 'cuetillo') drawCuetillo(b);
      else if(b.label === 'pupusa') drawPupusa(b);
      else if(b.label === 'agua') drawAgua(b);
    });

    drawTorito(toritoBody.position.x, toritoY);
    drawParticles();

    // Destination Church Atrium drawing when nearing the end
    if (distance >= targetDistance - 300) {
      drawChurchDestination(distance - (targetDistance - 300));
    }

    updateHud();
    rafId = requestAnimationFrame(step);
  }

  function simulateTick(){
    const config = gameConfig[gameDifficulty];
    const currentSpeed = (isTurboActive ? config.turboSpeed : config.baseSpeed);

    distance += tutorialMode ? 0 : currentSpeed * 0.16;
    energy = tutorialMode ? 100 : Math.max(0, energy - config.energyDrainRate);

    // Combo timer decay
    if (comboTimer > 0) {
      comboTimer--;
      if (comboTimer <= 0) combo = 1;
    }

    // Turbo timer decay
    if (turboTimer > 0) {
      turboTimer--;
      if (turboTimer % 8 === 0) {
        createSpark(toritoBody.position.x + (Math.random() - 0.5) * 20, toritoY + 20, (Math.random() - 0.5) * 3, 4 + Math.random() * 4);
      }
      if (turboTimer <= 0) isTurboActive = false;
    }

    // Auto-animate people if passing right next to them
    animateNearbySpectators(toritoBody.position.x, toritoY, isTurboActive ? 120 : 65);

    // Destination Arrival Check
    if (distance >= targetDistance && !isArriving) {
      isArriving = true;
      arrivalTimer = 180; // ~3 seconds triumphal sequence
      playSound('bell');
      showSlangCallout(jt('jue.card6.calloutArrived', '⛪ ¡LLEGASTE AL ATRIO!'), canvas.width / 2, canvas.height * 0.35);
    }

    if (isArriving) {
      arrivalTimer--;
      if (arrivalTimer % 12 === 0) {
        const rx = 60 + Math.random() * (canvas.width - 120);
        const ry = 60 + Math.random() * (canvas.height * 0.5);
        createFireworkBurst(rx, ry, 24);
        playSound('pop');
      }
      if (arrivalTimer <= 0) {
        endRun('completo');
        return;
      }
    }

    spawnEntities();

    // Smooth lateral movement towards target lane
    const targetX = lanePositions[toritoLane];
    const nextX = toritoBody.position.x + (targetX - toritoBody.position.x) * 0.24;
    Body.setPosition(toritoBody, { x: nextX, y: toritoY });

    // Update Matter bodies
    Composite.allBodies(world).forEach(b => {
      if(['carreta', 'persona', 'silbador', 'cuetillo', 'pupusa', 'agua'].includes(b.label)) {
        Body.setVelocity(b, { x: b.velocity.x * 0.95, y: currentSpeed });
        if(b.position.y > canvas.height + 70) World.remove(world, b);
      }
    });

    stalls.forEach((s, idx) => {
      s.y += currentSpeed;
      if(s.y > canvas.height + 60) stalls.splice(idx, 1);
    });

    Engine.update(engine, FIXED_STEP);

    if(toRemove.size){
      toRemove.forEach(b => World.remove(world, b));
      toRemove.clear();
    }

    if(energy <= 0 && !tutorialMode) { endRun('sinEnergia'); return; }
  }

  // ================= GRAPHICS & RENDERING =================

  function drawStreet(){
    ctx.fillStyle = '#8f8170';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Cobblestone paving pattern
    ctx.strokeStyle = 'rgba(0,0,0,.12)';
    ctx.lineWidth = 1.2;
    const stoneSize = 28;
    const offsetY = distance % stoneSize;
    for(let row = -1; row * stoneSize - offsetY < canvas.height; row++) {
      const rowY = row * stoneSize - offsetY;
      const shift = (row % 2 === 0) ? 0 : stoneSize / 2;
      for(let col = -1; col * stoneSize + shift < canvas.width; col++) {
        const sx = col * stoneSize + shift;
        ctx.strokeRect(sx, rowY, stoneSize, stoneSize);
      }
    }

    const facadeColors = ['#f2b134', '#3a7d6b', '#7d3ac1', '#e8622c', '#d32f2f', '#0097a7'];
    const colorIdx = Math.floor(distance / 240);
    const sideW = canvas.width * 0.16;

    drawHouse(0, sideW, facadeColors[colorIdx % facadeColors.length]);
    drawHouse(canvas.width - sideW, sideW, facadeColors[(colorIdx + 2) % facadeColors.length]);

    // Curb lines
    ctx.fillStyle = 'rgba(0,0,0,.18)';
    ctx.fillRect(sideW - 4, 0, 4, canvas.height);
    ctx.fillRect(canvas.width - sideW, 0, 4, canvas.height);

    // Animated Papel Picado hanging across the street
    drawPapelPicado();
  }

  function drawPapelPicado() {
    const garlandInterval = 180;
    const garlandY = (distance * 0.7) % garlandInterval;
    const colors = ['#ff007f', '#00e5ff', '#ffea00', '#00e676', '#ff9100'];

    for (let y = -garlandY; y < canvas.height; y += garlandInterval) {
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 1;
      ctx.moveTo(streetLeft, y);
      ctx.quadraticCurveTo(canvas.width / 2, y + 20, streetRight, y);
      ctx.stroke();

      const flags = 7;
      const step = (streetRight - streetLeft) / flags;
      for (let i = 0; i < flags; i++) {
        const fx = streetLeft + i * step + step * 0.15;
        const t = i / (flags - 1);
        const fy = y + 20 * (4 * t * (1 - t));
        ctx.fillStyle = colors[(i + Math.floor(distance / 100)) % colors.length];
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(fx + step * 0.7, fy);
        ctx.lineTo(fx + step * 0.7, fy + 16);
        ctx.lineTo(fx + step * 0.35, fy + 12);
        ctx.lineTo(fx, fy + 16);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function drawHouse(x, width, color) {
    const roofHeight = width * 0.5;
    ctx.fillStyle = color;
    ctx.fillRect(x, 0, width, canvas.height);

    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    const doorSpacing = 120;
    const offsetY = (distance * 0.4) % doorSpacing;
    for (let y = -offsetY; y < canvas.height; y += doorSpacing) {
      const cx = x + width / 2;
      ctx.beginPath();
      ctx.roundRect(cx - width * 0.22, y + 16, width * 0.44, width * 0.55, 3);
      ctx.fill();
    }

    // Tiled roof eaves
    ctx.fillStyle = '#b54b3a';
    ctx.fillRect(x - (x === 0 ? 0 : 4), 0, width + 4, 10);
  }

  function drawChurchDestination(progress) {
    // Grand Colonial Church facade descending when reaching the end of the run
    const churchH = Math.min(220, progress * 0.8);
    const churchY = -220 + churchH;

    ctx.save();
    ctx.translate(0, churchY);

    // Church main stone facade
    ctx.fillStyle = '#f5ede0';
    ctx.fillRect(streetLeft, 0, streetRight - streetLeft, 220);

    // Twin Bell Towers
    ctx.fillStyle = '#e8dcc8';
    ctx.fillRect(streetLeft, -40, 50, 260);
    ctx.fillRect(streetRight - 50, -40, 50, 260);

    // Bells
    ctx.fillStyle = '#d4af37';
    ctx.beginPath();
    ctx.arc(streetLeft + 25, 20, 10, 0, Math.PI * 2);
    ctx.arc(streetRight - 25, 20, 10, 0, Math.PI * 2);
    ctx.fill();

    // Golden Cross
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(canvas.width / 2 - 4, -30, 8, 35);
    ctx.fillRect(canvas.width / 2 - 14, -20, 28, 7);

    // Grand Portal
    ctx.fillStyle = '#5c3a21';
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 160, 45, Math.PI, 0);
    ctx.rect(canvas.width / 2 - 45, 160, 90, 60);
    ctx.fill();

    // Banner
    ctx.fillStyle = '#d32f2f';
    ctx.fillRect(canvas.width / 2 - 90, 80, 180, 26);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px Fredoka, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(jt('jue.card6.churchBanner', '¡FIESTAS PATRONALES!'), canvas.width / 2, 97);

    ctx.restore();
  }

  function drawTorito(x, y){
    ctx.save();
    ctx.translate(x, y);

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,.3)';
    ctx.beginPath();
    ctx.ellipse(0, 44, 26, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Turbo Flame aura
    if (isTurboActive) {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const turboGrad = ctx.createRadialGradient(0, 0, 8, 0, 0, 55);
      turboGrad.addColorStop(0, 'rgba(255, 61, 0, 0.8)');
      turboGrad.addColorStop(0.6, 'rgba(255, 234, 0, 0.4)');
      turboGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = turboGrad;
      ctx.beginPath();
      ctx.arc(0, 0, 55, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    const bob = Math.sin(Date.now() / 140) * 2.5;
    const legSwing = Math.sin(Date.now() / 90) * 8;

    // Dancing carrier legs in white manta pants
    ctx.fillStyle = '#f8f4e6';
    ctx.beginPath();
    ctx.roundRect(-8, 28 + bob, 6, 18 + legSwing * 0.3, 2);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(2, 28 + bob, 6, 18 - legSwing * 0.3, 2);
    ctx.fill();

    ctx.translate(0, bob);

    // Wooden Frame Structure
    ctx.strokeStyle = '#8a6238';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(-22, -18, 44, 38, 6);
    ctx.stroke();

    // Colorful folkloric handkerchiefs & ribbons
    const panos = [
      { x: -16, y: -14, w: 14, h: 14, color: '#e63946' },
      { x: 2,   y: -14, w: 14, h: 14, color: '#f2c744' },
      { x: -16, y: 2,   w: 14, h: 14, color: '#3a86c8' },
      { x: 2,   y: 2,   w: 14, h: 14, color: '#2fbf9f' }
    ];
    panos.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.roundRect(p.x, p.y, p.w, p.h, 3);
      ctx.fill();
    });

    // Bull Head Mask
    ctx.fillStyle = '#2b1a0f';
    ctx.beginPath();
    ctx.ellipse(0, -28, 12, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bull Horns with Flowers
    ctx.strokeStyle = '#e0dacb';
    ctx.lineWidth = 3.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-9, -32); ctx.quadraticCurveTo(-20, -38, -16, -46);
    ctx.moveTo(9, -32); ctx.quadraticCurveTo(20, -38, 16, -46);
    ctx.stroke();

    // Horn Flowers
    ctx.fillStyle = '#ff007f';
    ctx.beginPath();
    ctx.arc(-10, -32, 3, 0, Math.PI * 2);
    ctx.arc(10, -32, 3, 0, Math.PI * 2);
    ctx.fill();

    // Fiery Eyes
    ctx.fillStyle = '#ffd54f';
    ctx.beginPath();
    ctx.arc(-4, -29, 2, 0, Math.PI * 2);
    ctx.arc(4, -29, 2, 0, Math.PI * 2);
    ctx.fill();

    // Active Sparkler Tubes on flanks
    const tubes = [
      { x: -22, y: -10, a: -Math.PI / 4 },
      { x: 22, y: -10, a: Math.PI / 4 },
      { x: -22, y: 10, a: -3 * Math.PI / 4 },
      { x: 22, y: 10, a: 3 * Math.PI / 4 }
    ];
    tubes.forEach(t => {
      ctx.save();
      ctx.translate(t.x, t.y);
      ctx.rotate(t.a);
      ctx.fillStyle = '#ff9800';
      ctx.fillRect(-2, -3, 10, 6);
      ctx.fillStyle = '#ffff00';
      ctx.beginPath();
      ctx.arc(8, 0, 2 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    ctx.restore();

    // Emit live sparks
    if (Math.random() > 0.3) {
      createSpark(x + (Math.random() - 0.5) * 36, y + (Math.random() - 0.5) * 20);
    }
  }

  function drawPersona(b){
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(b.angle);

    ctx.fillStyle = 'rgba(0,0,0,.2)';
    ctx.beginPath();
    ctx.ellipse(0, 18, 12, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    const sway = b.isCheering ? Math.sin(Date.now() / 80) * 4 : 0;

    if (b.personType === 'volcanena') {
      // Traditional Volcaneña Dress (falda floreada)
      ctx.fillStyle = b.outfitColor;
      ctx.beginPath();
      ctx.ellipse(0, 2 + sway, 16, 12, 0, 0, Math.PI * 2);
      ctx.fill();

      // Blouse
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.roundRect(-7, -10 + sway, 14, 12, 3);
      ctx.fill();

      // Head & Flowers
      ctx.fillStyle = '#e8b385';
      ctx.beginPath();
      ctx.arc(0, -16 + sway, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ff007f';
      ctx.beginPath();
      ctx.arc(-4, -20 + sway, 2.5, 0, Math.PI * 2);
      ctx.arc(4, -20 + sway, 2.5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Traditional Campesino (Manta & Sombrero)
      ctx.fillStyle = '#f8f4e6';
      ctx.beginPath();
      ctx.roundRect(-8, -4 + sway, 16, 18, 4);
      ctx.fill();

      // Red sash
      ctx.fillStyle = '#d32f2f';
      ctx.fillRect(-8, 2 + sway, 16, 3);

      // Straw Hat
      ctx.fillStyle = '#e0c068';
      ctx.beginPath();
      ctx.ellipse(0, -14 + sway, 16, 8, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Reaction Balloon when cheered!
    if (b.isCheering) {
      ctx.fillStyle = '#ffd700';
      ctx.font = 'bold 13px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(jt('jue.card6.oleShort', '¡Olé! 🎉'), 0, -26);
    }

    ctx.restore();
  }

  function drawSilbador(b){
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    const pulse = Math.sin(Date.now() / 120) * 3;

    // Glowing aura
    ctx.fillStyle = 'rgba(0, 229, 255, 0.4)';
    ctx.beginPath();
    ctx.arc(0, 0, 18 + pulse, 0, Math.PI * 2);
    ctx.fill();

    // Silbador Rocket body
    ctx.fillStyle = '#ff3d00';
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(8, 6);
    ctx.lineTo(-8, 6);
    ctx.closePath();
    ctx.fill();

    // Stick
    ctx.strokeStyle = '#8d6e63';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 6);
    ctx.lineTo(0, 18);
    ctx.stroke();

    // Smoking Fuse Tip
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(0, -18, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawCuetillo(b){
    ctx.save();
    ctx.translate(b.position.x, b.position.y);

    // Glowing aura
    ctx.fillStyle = 'rgba(255, 85, 0, 0.35)';
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI * 2);
    ctx.fill();

    // Firecracker bundle
    ctx.fillStyle = '#d50000';
    ctx.fillRect(-7, -8, 14, 16);
    ctx.fillStyle = '#ffd700';
    ctx.fillRect(-7, -4, 14, 2);
    ctx.fillRect(-7, 4, 14, 2);

    // Spark fuse
    ctx.fillStyle = '#ffff00';
    ctx.beginPath();
    ctx.arc(0, -10, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawPupusa(b){
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.fillStyle = '#f4c542';
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#8d5524';
    ctx.beginPath();
    ctx.arc(-3, -2, 2, 0, Math.PI * 2);
    ctx.arc(4, 3, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#4caf50'; // Loroco
    ctx.beginPath();
    ctx.arc(1, -4, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawCarreta(b){
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(b.angle);
    ctx.fillStyle = '#5c3a21';
    ctx.fillRect(-20, -10, 40, 20);
    ctx.strokeStyle = '#2b1a0f';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(-12, 12, 6, 0, Math.PI * 2);
    ctx.arc(12, 12, 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  function drawAgua(b){
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.fillStyle = '#00bcd4';
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🪣', 0, 1);
    ctx.restore();
  }

  const stallColors = ['#e8622c', '#3a86c8', '#2fbf9f', '#f2c744'];
  function drawStall(s){
    ctx.save();
    ctx.translate(s.x, s.y);
    const facingRight = s.side === 'left';
    const dir = facingRight ? 1 : -1;
    const color = stallColors[Math.abs(Math.round(s.y / 90)) % stallColors.length];

    ctx.fillStyle = '#6b4226';
    ctx.fillRect(-22, -4, 44, 20);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(-24 * dir, -4);
    ctx.lineTo(24 * dir, -4);
    ctx.lineTo(36 * dir, -28);
    ctx.lineTo(-10 * dir, -28);
    ctx.closePath();
    ctx.fill();

    const wares = ['#e63946', '#ffd54f', '#3a86c8'];
    wares.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.roundRect(-14 + i * 12, -2, 8, 12, 2);
      ctx.fill();
    });
    ctx.restore();
  }

  // ================= PARTICLES & EXPLOSIONS =================
  function createSpark(x, y, vx, vy) {
    particles.push({
      x, y,
      vx: vx !== undefined ? vx : (Math.random() - 0.5) * 4,
      vy: vy !== undefined ? vy : 2 + Math.random() * 4,
      size: 2 + Math.random() * 2.5,
      color: ['#ffea00', '#ff3d00', '#ff007f', '#00e5ff', '#ffffff'][Math.floor(Math.random() * 5)],
      alpha: 1.0,
      decay: 0.04 + Math.random() * 0.03
    });
  }

  function createFireworkBurst(x, y, count = 20) {
    const colors = ['#ffea00', '#ff3d00', '#ff007f', '#00e5ff', '#39ff14', '#ffffff'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 2 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1.0,
        decay: 0.025 + Math.random() * 0.02
      });
    }
  }

  function drawParticles() {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.96;
      p.vy *= 0.96;
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // ================= END RUN & MODALS =================
  function endRun(motivo){
    running = false;
    paused = false;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';

    let distanciaId;
    if (targetDistance <= 1200) distanciaId = 'corta';
    else if (targetDistance <= 2400) distanciaId = 'media';
    else distanciaId = 'larga';

    const gameName = `torito-${gameDifficulty}-${distanciaId}`;
    const scoreFinal = Math.round(score + distance);

    let title, msg;
    if(motivo === 'completo') {
      title = jt('jue.card6.end.winTitle', '🏆 ¡LLEGASTE AL ATRIO DE LA IGLESIA!');
      msg = jt('jue.card6.end.winMsg', '¡Qué gran corrida! El Torito Pinto llegó triunfante a <b>{dest}</b> y alegró a todo el pueblo salvadoreño.').replace('{dest}', destinationName);
    } else {
      title = jt('jue.card6.end.tiredTitle', '🧨 ¡El torito se quedó sin cohetes!');
      msg = jt('jue.card6.end.tiredMsg', 'Recorriste <b>{dist}m</b> y animaste a <b>{n} personas</b>. ¡Recogé más silbadores y cuetillos para llegar al atrio la próxima vez!')
        .replace('{dist}', Math.round(distance)).replace('{n}', genteAnimada);
    }

    showOverlay(`
      <span class="overlay-tag">${jt('jue.card6.end.tag', 'Fiestas Patronales')}</span>
      <h3 style="font-size: 1.35rem; color: #ffd700; margin-bottom: 8px;">${title}</h3>
      <div class="overlay-score" style="font-size: 2rem; font-weight: 800; color: #00e5ff;">${scoreFinal} pts</div>
      <p style="font-size: 0.95rem; margin-bottom: 12px;">${msg}</p>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 12px 0; font-size: 0.8rem; background: rgba(0,0,0,0.3); padding: 8px; border-radius: 8px;">
        <div><b>${Math.round(distance)}m</b><br><span style="color:#aaa;">${jt('jue.card6.stat.distance', 'Distancia')}</span></div>
        <div><b>${genteAnimada}</b><br><span style="color:#aaa;">${jt('jue.card6.stat.animated', 'Animados')}</span></div>
        <div><b>x${maxCombo}</b><br><span style="color:#aaa;">${jt('jue.card6.stat.maxCombo', 'Max Combo')}</span></div>
      </div>
      <p class="overlay-best-score" id="t-best-score"></p>
      <button class="btn-primary" id="btn-restart-torito">${jt('jue.rematch', 'Revancha')}</button>
    `);
    document.getElementById('btn-restart-torito').onclick = showModeSelector;

    guardarPuntajeJuego(gameName, scoreFinal).then(() => {
      obtenerMejorPuntajeJuego(gameName).then((best) => {
        const el = document.getElementById('t-best-score');
        if (el && best) el.textContent = `${jt('jue.bestScore.distance', 'Tu récord')}: ${best.score} pts`;
      });
    });
  }

  function showDistanceSelector() {
    showOverlay(`
      <span class="overlay-tag">${jt('jue.card2.configTag', 'Configuración')}</span>
      <h3 style="font-size: 1.3rem; color: #ffd700;">🐂 ${jt('jue.card6.distance.title', 'Elige tu Destino')}</h3>
      <p style="font-size: 0.9rem;">${jt('jue.card6.distance.sub', '¿Hasta qué plaza colonial llevarás la fiesta del Torito?')}</p>
      <div class="difficulty-buttons" style="display: flex; flex-direction: column; gap: 10px;">
        <button class="btn-primary" id="dist-corta-torito" style="font-size: 0.95rem;">
          ⛪ Suchitoto (1200m)
          <div style="font-size: 0.75rem; font-weight: normal; opacity: 0.9;">Parroquia Santa Lucía</div>
        </button>
        <button class="btn-primary" id="dist-media-torito" style="font-size: 0.95rem;">
          🌺 Panchimalco (2400m)
          <div style="font-size: 0.75rem; font-weight: normal; opacity: 0.9;">Iglesia de la Santa Cruz</div>
        </button>
        <button class="btn-primary" id="dist-larga-torito" style="font-size: 0.95rem;">
          🏛️ San Salvador (3600m)
          <div style="font-size: 0.75rem; font-weight: normal; opacity: 0.9;">Atrio de la Catedral Metropolitana</div>
        </button>
      </div>
    `);

    document.getElementById('dist-corta-torito').onclick = () => { selectDistance(1200, 'Suchitoto — Parroquia Santa Lucía'); };
    document.getElementById('dist-media-torito').onclick = () => { selectDistance(2400, 'Panchimalco — Iglesia de la Santa Cruz'); };
    document.getElementById('dist-larga-torito').onclick = () => { selectDistance(3600, 'San Salvador — Catedral Metropolitana'); };
  }

  function selectDistance(dist, name) {
    targetDistance = dist;
    destinationName = name;
    showDifficultySelector();
  }

  function showDifficultySelector() {
    showOverlay(`
      <button type="button" class="btn-back-selector" id="btn-back-diff-torito">${jt('jue.back', '← Atrás')}</button>
      <span class="overlay-tag">${jt('jue.diff.tag', 'Dificultad')}</span>
      <h3>${jt('jue.card6.diff.title', '🎮 Selecciona Nivel')}</h3>
      <p>${jt('jue.card6.diff.sub', 'Elegí la intensidad de la fiesta por la calle.')}</p>
      <div class="difficulty-buttons">
        <button class="difficulty-btn easy" id="btn-easy-torito">
          ${jt('jue.diff.easy', '🟢 Tradicional')}
          <div class="difficulty-desc">${jt('jue.card6.diff.easyDesc', 'Calle alegre y más silbadores')}</div>
        </button>
        <button class="difficulty-btn hard" id="btn-hard-torito">
          ${jt('jue.diff.hard', '🔴 Torito Bravo')}
          <div class="difficulty-desc">${jt('jue.card6.diff.hardDesc', 'Mayor velocidad y obstáculos')}</div>
        </button>
      </div>`);

    document.getElementById('btn-back-diff-torito').onclick = showDistanceSelector;
    document.getElementById('btn-easy-torito').onclick = () => { startGame('easy'); };
    document.getElementById('btn-hard-torito').onclick = () => { startGame('hard'); };
  }

  function startGame(difficulty) {
    gameDifficulty = difficulty;
    resetGame();
    hideOverlay();

    // Evita bucles de animación duplicados por un doble toque al elegir
    // dificultad (frecuente en pantallas táctiles), que hacían avanzar el
    // juego más rápido de lo debido.
    cancelAnimationFrame(rafId);
    running = true;
    paused = false;
    playMusic();

    lastTime = null;
    physicsAccum = 0;
    rafId = requestAnimationFrame(step);
  }

  function showModeSelector() {
    showOverlay(`
      <span class="overlay-tag">${jt('jue.card6.prepareTag', 'Prepará el Torito')}</span>
      <h2>🐂 ${jt('jue.card6.titleModal', 'Torito Pinto')}</h2>
      <p>${jt('jue.card6.intro', 'Corré por las calles, animá a la gente y recogé cohetes para llegar a la iglesia.')}</p>
      <p class="rules-title">${jt('jue.controls.title', 'Instrucciones')}</p>
      <ul class="rules-list">
        ${esTactilJuegos ? `
        <li class="rule-good"><span class="rule-icon">👆</span> ${jt('jue.card6.controlsTap', 'Tocá directamente el carril al que querés saltar · doble toque = ráfaga')}</li>
        ` : `
        <li class="rule-good"><span class="rule-icon">🎮</span> ${jt('jue.card6.controlsKeys', 'A/D o ⬅️➡️: cambiar de carril · Espacio: ráfaga de chispas')}</li>
        `}
        <li class="rule-good"><span class="rule-icon">🚀</span> ${jt('jue.card6.ruleRockets', 'Animá gente y recogé silbadores/cuetillos → combo y energía')}</li>
        <li class="rule-bad"><span class="rule-icon">⚠️</span> ${jt('jue.card6.ruleObstacles', 'Esquivá carretas y baldes de agua')}</li>
      </ul>
      <button class="btn-primary" id="btn-start-torito">${jt('jue.next', 'Siguiente')}</button>
      <button class="btn-tutorial" id="btn-tutorial-torito">🎓 ${jt('jue.tutorial.start', 'Tutorial (practicar primero)')}</button>
    `);
    document.getElementById('btn-start-torito').onclick = showDistanceSelector;
    document.getElementById('btn-tutorial-torito').onclick = startTutorial;
  }

  const pauseBtn = document.getElementById('pauseBtn-torito');
  const pauseIcon = document.getElementById('pauseIcon-torito');
  const pauseOverlay = document.getElementById('pauseOverlay-torito');
  const resumeBtn = document.getElementById('resumeBtn-torito');
  const menuBtn = document.getElementById('menuBtn-torito');

  function pauseGame() {
    if(!running) return;
    running = false;
    paused = true;
    cancelAnimationFrame(rafId);
    if (bgMusic) {
      savedVolume = bgMusic.volume;
      bgMusic.volume = 0.1;
    }
    canvasWrap?.classList.add('is-paused');
    pauseOverlay?.classList.remove('hidden');
    if(pauseIcon) pauseIcon.textContent = '▶️';
    if (tutorialMode) hideTutorialBubble();
  }

  function resumeGame() {
    if(!paused) return;
    paused = false;
    running = true;
    lastTime = null;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    if (bgMusic) {
      bgMusic.volume = savedVolume || volume;
      if (volume > 0) bgMusic.play().catch(()=>{});
    }
    if (tutorialMode && tutorialStep >= 0) showTutorialStep(tutorialStep);
    rafId = requestAnimationFrame(step);
  }

  function returnToMenu() {
    running = false;
    paused = false;
    tutorialMode = false;
    hideTutorialBubble();
    cancelAnimationFrame(rafId);
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    showModeSelector();
  }

  pauseBtn?.addEventListener('click', () => {
    if(paused) resumeGame();
    else pauseGame();
  });
  resumeBtn?.addEventListener('click', resumeGame);
  menuBtn?.addEventListener('click', returnToMenu);

  showModeSelector();

  gameContent?.addEventListener('gameVisible', (e) => {
    if(e.detail.gameId === 'torito') {
      isGameVisible = true;
      resizeCanvas();
      playMusic();
      if(paused && running) resumeGame();
      else if(running) { lastTime = null; rafId = requestAnimationFrame(step); }
    }
  });

  window.switchGameState('torito', {
    pause: pauseGame,
    resume: resumeGame,
    stop: stopMusic,
    running: () => running,
    paused: () => paused,
    setVisible: (visible) => { isGameVisible = visible; },
    reloadMenu: () => { if(!running && !paused) showModeSelector(); }
  });
})();


/* ============================================================
  Salvadorean Roots — ANIMACIONES GSAP
   ============================================================ */
(function initStartAnimations(){
  const runAnim = () => {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(".hero-fade", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
    );

    tl.fromTo(".ambient-blob",
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 0.4, duration: 1.5, stagger: 0.3 },
      "-=0.6"
    );

    tl.fromTo(".reveal-grid .game-card",
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.2, ease: "back.out(1)" },
      "-=0.8"
    );

    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if(!isMobile) {
      const buttons = document.querySelectorAll('.btn-play-trigger, .btn-primary, .mode-btn, .difficulty-btn');
      buttons.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
          gsap.to(btn, { scale: 1.02, duration: 0.3 });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, { scale: 1, duration: 0.2 });
        });
      });
    }
  };

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', runAnim);
  } else {
    runAnim();
  }
})();