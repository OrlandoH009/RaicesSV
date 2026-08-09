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

/* Helper de traducción para los juegos: usa el sistema i18n del sitio si está
   cargado (window.SRi18n), con fallback seguro al texto en español si no lo está. */
function jt(key, fallback) {
  if (window.SRi18n && typeof window.SRi18n.t === 'function') {
    const lang = window.SRi18n.getLang ? window.SRi18n.getLang() : 'es';
    const val = window.SRi18n.t(key, lang);
    // Si la clave no existe, t() devuelve la clave tal cual: en ese caso usamos el fallback
    return (val && val !== key) ? val : fallback;
  }
  return fallback;
}

/* ══════════════════════════════════════════════════════════
   GUARDADO DE PUNTAJES EN LA BASE DE DATOS (tabla scores)
   ══════════════════════════════════════════════════════════
   Mismo patrón que quiz.js: game_name combina el identificador del juego
   con su dificultad/modo/distancia (ej. "pupusa-easy", "trompos-pvp"),
   ya que la tabla scores no tiene una columna separada para eso. juegos.html
   es una vista protegida, así que siempre debería haber un usuario logueado
   cuando se llama a esto. */
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

// Devuelve el mejor puntaje histórico del usuario para un game_name exacto
// (ej. "pupusa-hard"). Devuelve null si no hay registro previo o si falla.
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

  // AJUSTE CLAVE ANTI-BLUR: Inicializamos la resolución nativa interna para que coincida con el renderizado CSS
  // El tamaño LÓGICO del juego (resolución interna del canvas) se mantiene fijo siempre.
  // En pantalla completa, el CSS estira ese mismo contenido más grande (efecto zoom),
  // pero las coordenadas, distancias y velocidades del juego no cambian.
  let baseWidth = 0, baseHeight = 0;
  function resizeCanvas() {
    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
    if(isFS && baseWidth && baseHeight){
      // No recalculamos contra el tamaño de pantalla completa: conservamos la resolución lógica normal
      canvas.width = baseWidth;
      canvas.height = baseHeight;
      return;
    }
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    baseWidth = canvas.width;
    baseHeight = canvas.height;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Escuchar cambios de pantalla completa del contenedor
  document.addEventListener('fullscreenchange', () => setTimeout(resizeCanvas, 100));
  document.addEventListener('webkitfullscreenchange', () => setTimeout(resizeCanvas, 100));

  // Vincular botón de pantalla completa (funciona aunque el juego no haya iniciado)
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
  // DIFICULTAD INCREMENTADA: Se aumentó la gravedad y se acortaron los intervalos de aparición (más rápidos y difíciles)
  let gameConfig = {
    easy: { gravity: 0.55, spawnIntervalMin: 1200, spawnIntervalMax: 2000, timeLimit: 40, initialLives: 4 },
    hard: { gravity: 0.95, spawnIntervalMin: 700, spawnIntervalMax: 1300, timeLimit: 30, initialLives: 3 }
  };

  function showOverlay(html){
    overlayCard.innerHTML = html;
    overlay.classList.remove('hidden');
    overlay.style.backdropFilter = 'none'; // Quitar filtros de borrosidad para claridad máxima
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
    if(timeEl) timeEl.textContent = Math.max(0, timeLeft);
    if(levelEl) levelEl.textContent = gameDifficulty === 'easy' ? jt('jue.diff.easy', '🟢 Fácil') : jt('jue.diff.hard', '🔴 Difícil');
  }

  const engine = Engine.create();
  engine.gravity.y = 0.55;
  const world = engine.world;

  // El comal se autoubica y adapta a la altura exacta
  const paddleY = canvas.height - 60;
  const paddle = Bodies.rectangle(canvas.width/2, paddleY, 150, 22, { isStatic:true, label:'comal' });
  World.add(world, paddle);

  let mouseX = canvas.width/2;
  canvas.addEventListener('mousemove', e=>{
    const r = canvas.getBoundingClientRect();
    mouseX = (e.clientX - r.left) * (canvas.width/r.width);
  });
  canvas.addEventListener('touchmove', e=>{
    const r = canvas.getBoundingClientRect();
    mouseX = (e.touches[0].clientX - r.left) * (canvas.width/r.width);
    e.preventDefault();
  }, {passive:false});

  const GOOD = [
    {emoji:'🫓', pts:10},
    {emoji:'🧀', pts:15},
    {emoji:'🌽', pts:8}
  ];
  const BAD = [
    {emoji:'🩴', pts:-1},
    {emoji:'🪨', pts:-1},
    {emoji:'🦴', pts:-1}
  ];

  let score = 0, lives = 3, timeLeft = 30, running = false, paused = false;
  let lastTime = null, lastDelta = 1000/60, spawnAccum = 0, clockAccum = 0, nextSpawnIn = randomSpawnInterval();

  function randomSpawnInterval(){
    if(!gameDifficulty) return 1500;
    const config = gameConfig[gameDifficulty];
    return config.spawnIntervalMin + Math.random() * (config.spawnIntervalMax - config.spawnIntervalMin);
  }

  const bgMusic = document.getElementById('bgMusic');
  const volumeSlider = document.getElementById('volumeSlider');
  const volumeIcon = document.getElementById('volumeIcon');
  const damageOverlay = document.getElementById('damageOverlay-pupusa');
  let volume = Number(volumeSlider?.value || 0.45);

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
    bgMusic.currentTime = 0;
    bgMusic.play().catch(()=>{});
  }

  function stopMusic(){
    if(!bgMusic) return;
    bgMusic.pause();
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
    bgMusic?.pause();
    canvasWrap?.classList.add('is-paused');
    pauseOverlay?.classList.remove('hidden');
    if(pauseIcon) pauseIcon.textContent = '▶️';
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
    if(volume > 0) bgMusic?.play().catch(()=>{});
    rafId = requestAnimationFrame(step);
  }

  function returnToMenu(){
    running = false;
    paused = false;
    cancelAnimationFrame(rafId);
    stopMusic();
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
    const isBad = Math.random() < 0.32; // Un poco más de probabilidad de obstáculos
    const set = isBad ? BAD : GOOD;
    const item = set[Math.floor(Math.random()*set.length)];
    const x = 40 + Math.random()*(canvas.width-80);
    const body = Bodies.circle(x, -20, 24, {
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
        if(item.points < 0){
          lives -= 1;
          updateHud();
          flashDamage();
        }
        World.remove(world, item);
      }
    }
  });

  function step(timestamp){
    if(!running || !isGameVisible) return;
    if(lastTime === null) lastTime = timestamp;
    const dt = Math.min(Math.max(timestamp - lastTime, 1), 100);
    lastTime = timestamp;

    const correction = dt / lastDelta;
    Engine.update(engine, dt, correction);
    lastDelta = dt;

    for(const b of [...world.bodies]){
      if(b.label==='good' || b.label==='bad'){
        if(b.position.y > canvas.height+40){
          World.remove(world, b);
          if(b.label==='good'){
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
      spawn();
    }

    clockAccum += dt;
    while(clockAccum >= 1000 && timeLeft > 0){
      clockAccum -= 1000;
      timeLeft -= 1;
    }
    document.getElementById('p-time').textContent = Math.max(0, timeLeft);

    Body.setPosition(paddle, { x: Math.max(75, Math.min(canvas.width-75, mouseX)), y: canvas.height-60 });
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
        ctx.save();
        ctx.translate(b.position.x, b.position.y);
        ctx.fillStyle = '#3a3226';
        ctx.beginPath();
        ctx.ellipse(0,0,78,11,0,0,Math.PI*2);
        ctx.fill();
        ctx.strokeStyle='#000';ctx.lineWidth=2;ctx.stroke();
        ctx.restore();
      } else {
        drawEmoji(b.foodEmoji, b.position.x, b.position.y, 34, b.angle);
      }
    }
    rafId = requestAnimationFrame(step);
  }

  function endGame(){
    stopMusic();
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
    resizeCanvas(); // Nos aseguramos de que el lienzo se ajuste perfectamente antes de renderizar
    for(const b of [...world.bodies]) if(b.label==='good'||b.label==='bad') World.remove(world,b);
    score=0; lives=totalLives; timeLeft=gameConfig[gameDifficulty].timeLimit; running=true; paused=false;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    lastTime = null; lastDelta = 1000/60; spawnAccum = 0; clockAccum = 0; nextSpawnIn = randomSpawnInterval();
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
      </div>`);
    
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
      // La música arranca apenas se abre la ventana del juego (aunque el
      // jugador todavía esté en el menú de intro/dificultad), en loop, y
      // se corta al cerrar el modal (ver stop: stopMusic más abajo).
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
--------------------------------------------------------- */

(function initGameTrompos(){
  const canvas = document.getElementById('canvas-trompos');
  if(!canvas || typeof Matter === 'undefined') return;

  const canvasWrap = canvas.closest('.canvas-wrap');

  let baseWidth = 0, baseHeight = 0;
  function resizeCanvas() {
    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
    if(isFS && baseWidth && baseHeight){
      canvas.width = baseWidth;
      canvas.height = baseHeight;
      return;
    }
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    baseWidth = canvas.width;
    baseHeight = canvas.height;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Escuchar cambios de pantalla completa del contenedor
  document.addEventListener('fullscreenchange', () => setTimeout(resizeCanvas, 100));
  document.addEventListener('webkitfullscreenchange', () => setTimeout(resizeCanvas, 100));

  // Vincular botón de pantalla completa (funciona aunque el juego no haya iniciado)
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
  
  // Rondas del juego
  let maxRounds = 3;
  let currentRound = 1;
  let playerWins = 0;
  let rivalWins = 0;

  // DIFICULTAD REDUCIDA (Bot más amigable y lento)
  let gameConfig = {
    npc: {
      easy: { speed: 1.2, precision: 0.15, reaction: 850, moveChance: 0.3 },
      medium: { speed: 2.2, precision: 0.35, reaction: 550, moveChance: 0.5 },
      hard: { speed: 3.5, precision: 0.6, reaction: 350, moveChance: 0.75 }
    }
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

  // Animación del HUD al recibir daño
  function triggerHudDamageFlash(playerKey) {
    const elId = playerKey === 'top' ? 'p1-energy' : 'p2-energy';
    const element = document.getElementById(elId);
    if (element) {
      element.classList.remove('damage-flash');
      void element.offsetWidth; // Dispara reflow para reiniciar animación
      element.classList.add('damage-flash');
      setTimeout(() => element.classList.remove('damage-flash'), 500);
    }
  }

  const engine = Engine.create();
  engine.gravity.y = 0;
  engine.enableSleeping = false;
  const world = engine.world;

  // RING MÁS GRANDE (Se amplía al 85% de la pantalla)
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

  // TROMPOS MÁS GRANDES (Aumentado de 18 a 32 de radio)
  const top = {
    body: Bodies.circle(150, 240, 32, { restitution: 0.85, friction: 0.02, frictionAir: 0.008, label: 'trompo1' }),
    energy: 100,
    maxEnergy: 100,
    angle: 0,
    color: '#D4A373'
  };
  
  const bottom = {
    body: Bodies.circle(550, 240, 32, { restitution: 0.85, friction: 0.02, frictionAir: 0.008, label: 'trompo2' }),
    energy: 100,
    maxEnergy: 100,
    angle: 0,
    color: '#A26967'
  };

  World.add(world, [top.body, bottom.body]);

  let keys = {};
  window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
  window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

  let npcLastAction = 0;
  let lastCollisionTime = 0;
  const COLLISION_COOLDOWN = 180;

  const bgMusicTrompos = document.getElementById('bgMusic-trompos');
  const volumeSliderTrompos = document.getElementById('volumeSlider-trompos');
  const volumeIconTrompos = document.getElementById('volumeIcon-trompos');
  const damageOverlay = document.getElementById('damageOverlay-trompos');
  let volume = Number(volumeSliderTrompos?.value || 0.45);

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
    bgMusicTrompos.currentTime = 0;
    bgMusicTrompos.play().catch(()=>{});
  }

  function stopMusic(){
    if(!bgMusicTrompos) return;
    bgMusicTrompos.pause();
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

  // DETECCION DE COLISIONES Y ASIGNACIÓN DE DAÑOS CON ANIMACIÓN DE HUD
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

          if (speed1 > speed2 + 0.3) {
            bottom.energy = Math.max(0, bottom.energy - damage);
            triggerHudDamageFlash('bottom'); // Anima barra de vida oponente
          } else if (speed2 > speed1 + 0.3) {
            top.energy = Math.max(0, top.energy - damage);
            triggerHudDamageFlash('top');    // Anima tu barra de vida
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

  function step(timestamp){
    if(!running || !isGameVisible) return;

    Engine.update(engine, 1000/60);

    // Movimiento
    const moveX1 = (keys['d'] ? 1 : 0) - (keys['a'] ? 1 : 0);
    const moveY1 = (keys['s'] ? 1 : 0) - (keys['w'] ? 1 : 0);
    if(moveX1 !== 0 || moveY1 !== 0){
      Body.setVelocity(top.body, { x: moveX1 * 5, y: moveY1 * 5 });
    }
    
    if(gameMode === 'pvp'){
      const moveX2 = (keys['arrowright'] ? 1 : 0) - (keys['arrowleft'] ? 1 : 0);
      const moveY2 = (keys['arrowdown'] ? 1 : 0) - (keys['arrowup'] ? 1 : 0);
      if(moveX2 !== 0 || moveY2 !== 0){
        Body.setVelocity(bottom.body, { x: moveX2 * 5, y: moveY2 * 5 });
      }
    } else {
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

    if(top.energy <= 0 || top.body.position.y > canvas.height - offsetY + 40 || top.body.position.x > canvas.width - offsetX + 40 || top.body.position.x < offsetX - 40){
      running = false;
      handleRoundEnd('bottom');
      return;
    }
    if(bottom.energy <= 0 || bottom.body.position.y > canvas.height - offsetY + 40 || bottom.body.position.x > canvas.width - offsetX + 40 || bottom.body.position.x < offsetX - 40){
      running = false;
      handleRoundEnd('top');
      return;
    }

    updateHud();
    clearCanvas();
    
    // Dibujar el Ring Ampliado
    ctx.fillStyle = '#E4D5C3'; 
    ctx.fillRect(offsetX, offsetY, mapWidth, mapHeight);
    
    ctx.strokeStyle = '#8E7355';
    ctx.lineWidth = 6;
    ctx.strokeRect(offsetX, offsetY, mapWidth, mapHeight);
    
    ctx.strokeStyle = 'rgba(142, 115, 85, 0.2)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 8]);
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, offsetY);
    ctx.lineTo(canvas.width/2, canvas.height - offsetY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Trompos tradicionales realistas
    drawTrompo(top.body, top.angle, top.color, '#2D6A4F');
    drawTrompo(bottom.body, bottom.angle, bottom.color, '#9B2226');

    drawEnergyBar(top.body.position.x, top.body.position.y - 45, top.energy, '#2D6A4F');
    drawEnergyBar(bottom.body.position.x, bottom.body.position.y - 45, bottom.energy, '#9B2226');

    rafId = requestAnimationFrame(step);
  }

  function drawTrompo(body, angle, bodyColor, lineDecorColor){
    ctx.save();
    ctx.translate(body.position.x, body.position.y);
    ctx.rotate(angle);

    const radius = 32; // Ajustado a la física

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

  // MANEJO DE RONDAS Y FIN DE COMBATE
  function handleRoundEnd(winner) {
    stopMusic();
    if (winner === 'top') {
      playerWins++;
    } else {
      rivalWins++;
    }

    const neededToWin = Math.ceil(maxRounds / 2);

    if (playerWins >= neededToWin || rivalWins >= neededToWin || currentRound >= maxRounds) {
      // Fin del Juego Completo
      const finalWinner = playerWins > rivalWins ? 'top' : 'bottom';
      endGame(finalWinner);
    } else {
      // Siguiente ronda
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
    const mapWidth = canvas.width * 0.85;
    const offsetX = (canvas.width - mapWidth) / 2;
    
    Body.setPosition(top.body, { x: offsetX + 100, y: canvas.height/2 });
    Body.setPosition(bottom.body, { x: canvas.width - offsetX - 100, y: canvas.height/2 });
    Body.setVelocity(top.body, { x: 0, y: 0 });
    Body.setVelocity(bottom.body, { x: 0, y: 0 });
    
    top.energy = 100;
    bottom.energy = 100;
  }

  function endGame(winner){
    stopMusic();
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

    // Se guardan las rondas ganadas por el jugador como "score", ya que
    // trompos no tiene un puntaje numérico propio (es un duelo al mejor
    // de N rondas).
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
    bgMusicTrompos?.pause();
    canvasWrap?.classList.add('is-paused');
    pauseOverlay?.classList.remove('hidden');
    if(pauseIcon) pauseIcon.textContent = '▶️';
  }

  function resumeGame(){
    if(!paused) return;
    paused = false;
    running = true;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    if(volume > 0) bgMusicTrompos?.play().catch(()=>{});
    rafId = requestAnimationFrame(step);
  }

  function returnToMenu(){
    running = false;
    paused = false;
    cancelAnimationFrame(rafId);
    stopMusic();
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

  // NUEVO SELECTOR DE RONDAS
  function showRoundSelector(){
    showOverlay(`
      <span class="overlay-tag">${jt('jue.card2.configTag', 'Configuración')}</span>
      <h3>${jt('jue.card2.rounds.title', '🏁 ¿A cuántas rondas jugamos?')}</h3>
      <p>${jt('jue.card2.rounds.sub', 'El primero en ganar la mitad más uno de las rondas seleccionadas se lleva la victoria.')}</p>
      <div class="difficulty-buttons" style="display: flex; gap: 15px; margin-top: 15px;">
        <button class="btn-primary" id="rounds-1" style="flex: 1;">${jt('jue.card2.round1', '1 Ronda')}</button>
        <button class="btn-primary" id="rounds-3" style="flex: 1;">${jt('jue.card2.bestOf3', 'Best of 3')}</button>
        <button class="btn-primary" id="rounds-5" style="flex: 1;">${jt('jue.card2.bestOf5', 'Best of 5')}</button>
      </div>
    `);

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
      </div>`);
    
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
      // La música arranca apenas se abre la ventana del juego, en loop,
      // y se corta al cerrar el modal (ver stop: stopMusic más abajo).
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
  const hasGsap = !!window.gsap;

  // Si GSAP está disponible, dejamos que controle transform/opacity por completo
  // y desactivamos las transiciones CSS del modal para evitar animaciones dobles.
  if(hasGsap){
    document.querySelectorAll('.game-modal, .game-modal__content').forEach(el => {
      el.style.transition = 'none';
    });
  }

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const gameId = btn.dataset.openModal;
      const modal = document.getElementById(`modal-${gameId}`);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evita scroll de fondo

        // Animación de entrada más fluida con GSAP (con fallback a la transición CSS existente)
        const content = modal.querySelector('.game-modal__content');
        if(hasGsap && content){
          gsap.set(modal, { autoAlpha: 1 });
          gsap.fromTo(content,
            { scale: 0.85, y: 24, autoAlpha: 0 },
            { scale: 1, y: 0, autoAlpha: 1, duration: 0.5, ease: 'back.out(1.6)' }
          );
        }

        // Activa el estado visible para el motor del juego y ajusta canvas
        modal.dispatchEvent(new CustomEvent('gameVisible', { detail: { gameId: gameId } }));

        // Red de seguridad: en algunos navegadores el primer play() disparado
        // por gameVisible puede quedar bloqueado por la política de autoplay
        // aunque ya hubo un click de usuario (por timing de carga del audio).
        // Si el <audio> del juego sigue en pausa, reintentamos en el próximo
        // click dentro del modal (ya con gesto de usuario garantizado).
        const audioEl = modal.querySelector('audio');
        if (audioEl) {
          const retryPlay = () => {
            if (audioEl.paused && window.gameStates?.[gameId]?.running?.() === false && window.gameStates?.[gameId]?.paused?.() === false) {
              audioEl.play().catch(() => {});
            }
          };
          content?.addEventListener('click', retryPlay, { once: true });
        }

        // Red de seguridad: si el menú inicial del juego se generó antes de que
        // el idioma estuviera listo (por ejemplo, apenas cargó la página), lo
        // regeneramos ahora que el modal se abre, para asegurar el idioma correcto.
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
    btn.addEventListener('click', () => {
      const gameId = btn.dataset.closeModal;
      const modal = document.getElementById(`modal-${gameId}`);
      if (modal) {
        // Pausa automática y detención de música al cerrar la ventana flotante
        if (window.gameStates && window.gameStates[gameId]) {
          if (window.gameStates[gameId].pause) window.gameStates[gameId].pause();
          if (window.gameStates[gameId].stop) window.gameStates[gameId].stop();
          if (window.gameStates[gameId].setVisible) window.gameStates[gameId].setVisible(false);
        }

        const content = modal.querySelector('.game-modal__content');
        if(hasGsap && content){
          gsap.to(content, {
            scale: 0.9, y: 16, autoAlpha: 0, duration: 0.3, ease: 'power1.in',
            onComplete: () => {
              modal.classList.remove('active');
              document.body.style.overflow = '';
              gsap.set(modal, { clearProps: 'opacity,visibility' });
              gsap.set(content, { clearProps: 'all' });
            }
          });
        } else {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // Atajos de teclado globales para el modal de juego actualmente abierto:
  // "P" pausa/reanuda (solo si el juego ya inició) y "F" alterna pantalla completa
  window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if(key !== 'p' && key !== 'f') return;

    const activeModal = document.querySelector('.game-modal.active');
    if(!activeModal) return;
    const gameId = activeModal.id.replace('modal-', '');

    if(key === 'p'){
      const state = window.gameStates && window.gameStates[gameId];
      if(!state) return;
      const isRunning = state.running ? state.running() : false;
      const isPaused = state.paused ? state.paused() : false;
      if(!isRunning && !isPaused) return; // el juego todavía no ha iniciado
      if(isPaused){
        if(state.resume) state.resume();
      } else if(isRunning){
        if(state.pause) state.pause();
      }
    }

    if(key === 'f'){
      const canvasWrap = document.getElementById(`${gameId}-canvas-wrap`) || activeModal.querySelector('.canvas-wrap');
      if(!canvasWrap) return;
      const isCurrent = document.fullscreenElement === canvasWrap || document.webkitFullscreenElement === canvasWrap;
      if(!isCurrent){
        const req = canvasWrap.requestFullscreen || canvasWrap.webkitRequestFullscreen || canvasWrap.msRequestFullscreen;
        req?.call(canvasWrap);
      } else {
        const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
        exit?.call(document);
      }
    }
  });

  // Si el usuario cambia de idioma mientras un juego está abierto y todavía no ha
  // iniciado (está en un menú/selector), recargamos esa pantalla para que se
  // muestre en el idioma nuevo. Si el juego ya está corriendo, no lo interrumpimos:
  // el HUD y los textos ya visibles seguirán en el idioma con el que se inició esa partida.
  document.addEventListener('langchange', () => {
    const activeModal = document.querySelector('.game-modal.active');
    if(!activeModal) return;
    const gameId = activeModal.id.replace('modal-', '');
    const state = window.gameStates && window.gameStates[gameId];
    if(!state) return;
    const isRunning = state.running ? state.running() : false;
    const isPaused = state.paused ? state.paused() : false;
    if(isRunning || isPaused) return; // partida en curso: no la interrumpimos
    if(state.reloadMenu) state.reloadMenu();
  });
})();

/* ---------------------------------------------------------
   JUEGO 3: GUERRA DE COASTERS (CARRERA ARCADE) - CORREGIDO
--------------------------------------------------------- */
(function initGameCoasters(){
  const canvas = document.getElementById('canvas-coasters');
  if(!canvas) return;

  const ctx = canvas.getContext('2d');
  const hud = document.getElementById('hud-coasters');
  const overlay = document.getElementById('overlay-coasters');
  const overlayCard = document.getElementById('overlay-card-coasters');
  const gameContent = document.getElementById('modal-coasters'); 
  const canvasWrap = document.getElementById('coasters-canvas-wrap');
  
  let isGameVisible = false;
  let running = false;
  let paused = false;
  let rafId = null;

  // Parámetros de Juego
  let botDifficulty = 'easy';
  let targetDistance = 2000; 
  
  // Jugador y Bot
  let player = { x: 0, y: 0, speed: 0, maxSpeed: 8, lane: 1, targetX: 0, distance: 0, passengers: 0 };
  let bot = { x: 0, y: 0, speed: 0, maxSpeed: 5.5, lane: 2, targetX: 0, distance: 0 };
  
  // Configuración de la carretera
  const lanesCount = 4;
  let laneWidth = 0;
  let roadY = 0; 

  // Obstáculos, Pasajeros y Tráfico
  let obstacles = [];
  let passengers = [];
  let trafficCars = [];
  const lanePositions = [];

  // Redimensionamiento dinámico compatible con Pantalla Completa.
  // El tamaño LÓGICO del canvas se mantiene fijo siempre; en pantalla completa
  // el CSS estira ese mismo contenido (efecto zoom) sin cambiar posiciones ni velocidades.
  let baseWidth = 0, baseHeight = 0;
  function resizeCanvas() {
    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);

    if(isFS && baseWidth && baseHeight){
      canvas.width = baseWidth;
      canvas.height = baseHeight;
    } else {
      const wrap = canvasWrap || canvas.closest('.canvas-wrap');
      const rect = wrap ? wrap.getBoundingClientRect() : canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      baseWidth = canvas.width;
      baseHeight = canvas.height;
    }

    // Recalcular el ancho de los carriles con el tamaño lógico del canvas
    laneWidth = canvas.width / lanesCount;
    for(let i = 0; i < lanesCount; i++){
      lanePositions[i] = (i * laneWidth) + (laneWidth / 2);
    }

    // Ajusta la posición de los buses al nuevo fondo (para que no queden flotando o enterrados)
    player.y = canvas.height - 120;
    bot.y = canvas.height - 120;
    player.targetX = lanePositions[player.lane];
    bot.targetX = lanePositions[bot.lane];
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Escuchar cambios de pantalla completa del contenedor
  document.addEventListener('fullscreenchange', () => {
    setTimeout(resizeCanvas, 100); // Pequeño delay para esperar al layout del navegador
  });
  document.addEventListener('webkitfullscreenchange', () => {
    setTimeout(resizeCanvas, 100);
  });

  // Vincular botón de pantalla completa si existe en el envoltorio del juego
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

  // Controles
  let keys = {};
  window.addEventListener('keydown', e => {
    keys[e.key.toLowerCase()] = true;
    if(running && !paused) {
      if(e.key.toLowerCase() === 'a' || e.key === 'ArrowLeft') moveLane(-1);
      if(e.key.toLowerCase() === 'd' || e.key === 'ArrowRight') moveLane(1);
    }
  });
  window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

  function moveLane(direction) {
    let nextLane = player.lane + direction;
    if(nextLane >= 0 && nextLane < lanesCount) {
      player.lane = nextLane;
    }
  }

  // Generar HUD dinámicamente
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

    if(pProg) pProg.style.width = Math.min(100, (player.distance / targetDistance) * 100) + '%';
    if(bProg) bProg.style.width = Math.min(100, (bot.distance / targetDistance) * 100) + '%';
    if(pDist) pDist.textContent = Math.round(player.distance) + 'm / ' + targetDistance + 'm';
    if(bDist) bDist.textContent = Math.round(bot.distance) + 'm';
    if(pPass) pPass.textContent = player.passengers;
  }

  // Audio
  const bgMusic = document.getElementById('bgMusic-coasters');
  const volumeSlider = document.getElementById('volumeSlider-coasters');
  const volumeIcon = document.getElementById('volumeIcon-coasters');
  const damageOverlay = document.getElementById('damageOverlay-coasters');
  let volume = Number(volumeSlider?.value || 0.45);

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
    bgMusic.currentTime = 0;
    bgMusic.play().catch(()=>{});
  }
  function stopMusic(){ bgMusic?.pause(); }

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
      bot.maxSpeed = 5.5;
    } else if (botDifficulty === 'medium') {
      bot.maxSpeed = 7.2;
    } else {
      bot.maxSpeed = 8.8; 
    }

    obstacles = [];
    passengers = [];
    trafficCars = [];
    roadY = 0;
  }

  function spawnEntities() {
    if(Math.random() < 0.012 && obstacles.length < 5) {
      obstacles.push({
        x: lanePositions[Math.floor(Math.random() * lanesCount)],
        y: -50,
        type: Math.random() > 0.5 ? 'bache' : 'tumulo',
        lane: Math.floor(Math.random() * lanesCount)
      });
    }

    if(Math.random() < 0.015 && passengers.length < 4) {
      passengers.push({
        x: Math.random() > 0.5 ? 15 : canvas.width - 15,
        y: -50,
        collected: false
      });
    }

    if(Math.random() < 0.006 && trafficCars.length < 2) {
      const lane = Math.floor(Math.random() * lanesCount);
      trafficCars.push({
        x: lanePositions[lane],
        y: -100,
        lane: lane,
        speed: 2 + Math.random() * 2,
        color: ['#3a86c8', '#f89e1b', '#3ae080'][Math.floor(Math.random()*3)]
      });
    }
  }

  function step(timestamp){
    if(!running || !isGameVisible) return;

    const speedMultiplier = player.speed;
    roadY += speedMultiplier;
    player.distance += speedMultiplier * 0.1;
    bot.distance += bot.speed * 0.1;

    spawnEntities();

    // Movimiento jugador
    if(keys['w'] || keys['arrowup']) {
      player.speed = Math.min(player.maxSpeed, player.speed + 0.08);
    } else if(keys['s'] || keys['arrowdown']) {
      player.speed = Math.max(0, player.speed - 0.15);
    } else {
      player.speed = Math.max(1, player.speed - 0.04);
    }

    player.targetX = lanePositions[player.lane];
    player.x += (player.targetX - player.x) * 0.22;

    // Movimiento Bot (IA)
    if(bot.distance < targetDistance){
      bot.speed = Math.min(bot.maxSpeed, bot.speed + 0.06);
    }

    // Esquivar obstáculos automáticamente
    let botTargetLane = bot.lane;
    obstacles.concat(trafficCars).forEach(item => {
      if(item.lane === bot.lane && Math.abs(item.y - bot.y) < 220) {
        if(bot.lane === 0) botTargetLane = 1;
        else if(bot.lane === lanesCount - 1) botTargetLane = lanesCount - 2;
        else botTargetLane = bot.lane + (Math.random() > 0.5 ? 1 : -1);
      }
    });
    bot.lane = botTargetLane;
    bot.targetX = lanePositions[bot.lane];
    bot.x += (bot.targetX - bot.x) * 0.15;

    // Actualizar obstáculos
    obstacles.forEach((obs, idx) => {
      obs.y += speedMultiplier;
      if(Math.abs(obs.x - player.x) < 25 && Math.abs(obs.y - player.y) < 40) {
        player.speed = Math.max(1, player.speed - 3);
        flashDamage();
        obstacles.splice(idx, 1);
      }
      if(Math.abs(obs.x - bot.x) < 25 && Math.abs(obs.y - bot.y) < 40) {
        bot.speed = Math.max(1, bot.speed - 2.5);
        obstacles.splice(idx, 1);
      }
      if(obs.y > canvas.height) obstacles.splice(idx, 1);
    });

    // Actualizar particulares
    trafficCars.forEach((car, idx) => {
      car.y += (speedMultiplier - car.speed);
      if(Math.abs(car.x - player.x) < 32 && Math.abs(car.y - player.y) < 60) {
        player.speed = 1.5;
        flashDamage();
        trafficCars.splice(idx, 1);
      }
      if(Math.abs(car.x - bot.x) < 32 && Math.abs(car.y - bot.y) < 60) {
        bot.speed = 1.5;
        trafficCars.splice(idx, 1);
      }
      if(car.y > canvas.height || car.y < -200) trafficCars.splice(idx, 1);
    });

    // Recoger pasajeros
    passengers.forEach((p, idx) => {
      p.y += speedMultiplier;
      if(!p.collected && Math.abs(p.y - player.y) < 55) {
        if((p.x < 50 && player.lane === 0) || (p.x > canvas.width - 50 && player.lane === lanesCount - 1)) {
          p.collected = true;
          player.passengers++;
          player.speed = Math.min(player.maxSpeed + 2, player.speed + 1.8);
          passengers.splice(idx, 1);
        }
      }
      if(p.y > canvas.height) passengers.splice(idx, 1);
    });

    // Validar final
    if(player.distance >= targetDistance) {
      endRace('player');
      return;
    } else if(bot.distance >= targetDistance) {
      endRace('bot');
      return;
    }

    // Renderizar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRoad();
    
    obstacles.forEach(drawObstacle);
    passengers.forEach(drawPassenger);
    trafficCars.forEach(drawTrafficCar);

    drawBus(player.x, player.y, '#d62828', 'R-44'); 
    drawBus(bot.x, bot.y, '#003049', 'R-101D'); 

    updateHud();
    rafId = requestAnimationFrame(step);
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

  function drawObstacle(obs) {
    ctx.save();
    if(obs.type === 'bache') {
      ctx.fillStyle = '#222222';
      ctx.beginPath();
      ctx.ellipse(obs.x, obs.y, 18, 10, 0, 0, Math.PI*2);
      ctx.fill();
    } else {
      ctx.fillStyle = '#ffb300';
      ctx.fillRect(obs.x - 22, obs.y - 4, 44, 8);
      ctx.fillStyle = '#000000';
      for(let i = -18; i <= 18; i += 10) {
        ctx.fillRect(obs.x + i, obs.y - 4, 4, 8);
      }
    }
    ctx.restore();
  }

  function drawPassenger(p) {
    ctx.fillStyle = '#ff5722';
    ctx.beginPath();
    ctx.arc(p.x, p.y, 6, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#ffcc80';
    ctx.beginPath();
    ctx.arc(p.x, p.y - 4, 4, 0, Math.PI*2);
    ctx.fill();
  }

  function drawTrafficCar(car) {
    ctx.save();
    ctx.translate(car.x, car.y);
    ctx.fillStyle = car.color;
    ctx.beginPath();
    ctx.roundRect(-12, -22, 24, 44, 3);
    ctx.fill();
    ctx.restore();
  }

  function endRace(winner) {
    running = false;
    cancelAnimationFrame(rafId);
    bgMusic?.pause();

    let title, msg;
    if(winner === 'player') {
      title = jt('jue.card3.end.winTitle', '🏆 ¡VICTORIA TOTAL!');
      msg = jt('jue.card3.end.winMsg', '¡La Ruta 44 llegó primero! Recogiste a <b>{n}</b> pasajeros en el camino.').replace('{n}', player.passengers);
    } else {
      title = jt('jue.card3.end.loseTitle', '🏁 Te ganaron el pasaje...');
      msg = jt('jue.card3.end.loseMsg', 'La 101-D llegó primero esta vez. ¡Cuidado con los baches en la próxima!');
    }

    // Coasters no tiene puntaje ni dificultad easy/hard: se identifica por
    // la distancia elegida (Express/Normal/Costa a Costa), y se guarda 1
    // si el jugador ganó la carrera o 0 si perdió.
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

    document.getElementById('btn-easy-coasters').onclick = () => { startGame('easy'); };
    document.getElementById('btn-medium-coasters').onclick = () => { startGame('medium'); };
    document.getElementById('btn-hard-coasters').onclick = () => { startGame('hard'); };
  }

  function startGame(difficulty) {
    botDifficulty = difficulty; 
    resetGame();                
    hideOverlay();
    
    running = true;
    paused = false;
    playMusic();

    rafId = requestAnimationFrame(step);
  }

  function showModeSelector() {
    showOverlay(`
      <span class="overlay-tag">${jt('jue.card3.prepareMotorTag', 'Preparar Motor')}</span>
      <h3>🚌 ${jt('jue.card3.titleModal2', 'Guerra de Coasters SV')}</h3>
      <p>${jt('jue.card3.intro', 'Manejá tu bus para llegar antes que la Ruta 101-D. Esquivá baches y recogé pasajeros en el camino.')}</p>
      <p class="rules-title">${jt('jue.controls.title', 'Controles')}</p>
      <ul class="rules-list">
        <li class="rule-good"><span class="rule-icon">🎮</span> ${jt('jue.card3.controlsAccel', '<strong>W</strong> o flecha arriba: acelerar. <strong>S</strong> o flecha abajo: frenar.')}</li>
        <li class="rule-good"><span class="rule-icon">🎮</span> ${jt('jue.card3.controlsLane', '<strong>A</strong>/<strong>D</strong> o flechas ⬅️➡️: cambiar de carril.')}</li>
      </ul>
      <button class="btn-primary" id="btn-start-coasters">${jt('jue.next', 'Siguiente')}</button>
    `);
    document.getElementById('btn-start-coasters').onclick = showDistanceSelector;
  }

  // Eventos y Pausa
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
    bgMusic?.pause();
    canvasWrap?.classList.add('is-paused');
    pauseOverlay?.classList.remove('hidden');
    if(pauseIcon) pauseIcon.textContent = '▶️';
  }

  function resumeGame() {
    if(!paused) return;
    paused = false;
    running = true;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    bgMusic?.play().catch(()=>{});
    rafId = requestAnimationFrame(step);
  }

  function returnToMenu() {
    running = false;
    paused = false;
    cancelAnimationFrame(rafId);
    bgMusic?.pause();
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
      // La música arranca apenas se abre la ventana del juego, en loop,
      // y se corta al cerrar el modal (ver stop: stopMusic más abajo).
      playMusic();
      if(paused && running) resumeGame();
      else if(running) rafId = requestAnimationFrame(step);
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
   JUEGO 4: ESCONDELERO (PERSECUCIÓN — ATRAPÁ ANTES DEL BOTE)
--------------------------------------------------------- */
(function initGameEncantados(){
  const canvas = document.getElementById('canvas-encantados');
  if(!canvas) return;

  const ctx = canvas.getContext('2d');
  const hud = document.getElementById('hud-encantados');
  const overlay = document.getElementById('overlay-encantados');
  const overlayCard = document.getElementById('overlay-card-encantados');
  const gameContent = document.getElementById('modal-encantados');
  const canvasWrap = document.getElementById('encantados-canvas-wrap');

  let isGameVisible = false;
  let running = false;
  let paused = false;
  let rafId = null;

  let baseWidth = 0, baseHeight = 0;
  function resizeCanvas() {
    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
    const prevWidth = canvas.width, prevHeight = canvas.height;

    if(isFS && baseWidth && baseHeight){
      canvas.width = baseWidth;
      canvas.height = baseHeight;
    } else {
      const wrap = canvasWrap || canvas.closest('.canvas-wrap');
      const rect = wrap ? wrap.getBoundingClientRect() : canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      baseWidth = canvas.width;
      baseHeight = canvas.height;
    }

    bote.x = canvas.width / 2;
    bote.y = 62;

    // Solo recalcular los escondites si el tamaño lógico realmente cambió,
    // para no reposicionarlos de golpe al entrar/salir de pantalla completa.
    if(canvas.width !== prevWidth || canvas.height !== prevHeight){
      layoutHideSpots();
    }
  }
  window.addEventListener('resize', resizeCanvas);
  document.addEventListener('fullscreenchange', () => setTimeout(resizeCanvas, 100));
  document.addEventListener('webkitfullscreenchange', () => setTimeout(resizeCanvas, 100));

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

  // Dificultad: cuántos amigos hay que atrapar, qué tan seguido y rápido se escapan al bote
  let gameConfig = {
    easy:   { kidsToWin: 6, escapeMin: 2200, escapeMax: 3600, fleeSpeed: 2.6, catcherSpeed: 2.6, maxEscapes: 5, timeLimit: 45 },
    medium: { kidsToWin: 8, escapeMin: 1700, escapeMax: 2800, fleeSpeed: 3.3, catcherSpeed: 2.6, maxEscapes: 4, timeLimit: 42 },
    hard:   { kidsToWin: 10, escapeMin: 1200, escapeMax: 2200, fleeSpeed: 4.0, catcherSpeed: 2.6, maxEscapes: 3, timeLimit: 38 }
  };
  let difficulty = 'easy';

  const KID_EMOJIS = ['🧒','👧','👦','🧑'];
  const HIDE_SPOTS_EMOJI = ['🌳','🛢️','🧺','🪴','🧱','⛲','📦','🪵'];

  // El "bote" es el punto seguro al que corren los amigos escondidos
  const bote = { x: 0, y: 62, radius: 34 };

  // El catcher (jugador) — "el que la trae"
  const catcher = { x: 0, y: 0, radius: 22 };

  let hideSpots = []; // {x,y,emoji}
  let kids = []; // {x,y,spotIndex,state:'hidden'|'fleeing'|'caught'|'escaped', targetTimer}

  let score = 0, caught = 0, escaped = 0, timeLeft = 0;
  let nextEscapeIn = 0, escapeAccum = 0;
  let lastTime = null;
  let keys = {};

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

  if(hud){
    hud.innerHTML = `
      <div class="hud-item">
        <span>${jt('jue.hud.points', 'Puntos')}</span>
        <b id="e-score">0</b>
      </div>
      <div class="hud-item">
        <span>${jt('jue.card4.caught', 'Atrapados')}</span>
        <span class="encantados-round-dots" id="e-dots"></span>
      </div>
      <div class="hud-item">
        <span>${jt('jue.card4.escaped', 'Se salvaron')}</span>
        <b id="e-escaped">0</b>
      </div>
      <div class="hud-item">
        <span>${jt('jue.hud.time', 'Tiempo')}</span>
        <b id="e-time">-</b>
      </div>`;
  }

  function renderDots(){
    const dotsEl = document.getElementById('e-dots');
    if(!dotsEl) return;
    const total = gameConfig[difficulty].kidsToWin;
    let html = '';
    for(let i=0;i<total;i++){
      html += `<span class="dot${i < caught ? ' found' : ''}"></span>`;
    }
    dotsEl.innerHTML = html;
  }

  function updateHud(){
    const scoreEl = document.getElementById('e-score');
    const escapedEl = document.getElementById('e-escaped');
    const timeEl = document.getElementById('e-time');
    if(scoreEl) scoreEl.textContent = score;
    if(escapedEl) escapedEl.textContent = `${escaped}/${gameConfig[difficulty].maxEscapes}`;
    if(timeEl) timeEl.textContent = Math.max(0, Math.ceil(timeLeft));
    renderDots();
  }

  // Audio
  const bgMusic = document.getElementById('bgMusic-encantados');
  const volumeSlider = document.getElementById('volumeSlider-encantados');
  const volumeIcon = document.getElementById('volumeIcon-encantados');
  const damageOverlay = document.getElementById('damageOverlay-encantados');
  let volume = Number(volumeSlider?.value || 0.45);
  if(bgMusic){ bgMusic.volume = volume; bgMusic.muted = false; }
  volumeSlider?.addEventListener('input', (event)=>{
    volume = Number(event.target.value);
    if(bgMusic){ bgMusic.volume = volume; bgMusic.muted = volume <= 0; }
    if(volumeIcon) volumeIcon.textContent = volume <= 0 ? '🔇' : volume < 0.35 ? '🔉' : '🔊';
  });
  function playMusic(){ if(!bgMusic) return; bgMusic.muted = false; bgMusic.volume = volume; bgMusic.currentTime = 0; bgMusic.play().catch(()=>{}); }
  function stopMusic(){ bgMusic?.pause(); }
  function flashEscape(){
    if(!damageOverlay) return;
    damageOverlay.style.opacity = '1';
    setTimeout(() => { damageOverlay.style.opacity = '0'; }, 150);
  }

  function layoutHideSpots(){
    if(!canvas.width || !canvas.height) return;
    const count = 10;
    const cols = 5;
    const rows = Math.ceil(count / cols);
    const marginX = canvas.width * 0.08;
    const marginY = canvas.height * 0.28;
    const usableW = canvas.width - marginX*2;
    const usableH = canvas.height - marginY*2 - 40;
    const cellW = usableW / cols;
    const cellH = usableH / rows;

    const spots = [];
    let i = 0;
    for(let r=0;r<rows;r++){
      for(let c=0;c<cols;c++){
        if(i >= count) break;
        const jitterX = (Math.random()-0.5) * cellW * 0.25;
        const jitterY = (Math.random()-0.5) * cellH * 0.25;
        spots.push({
          x: marginX + c*cellW + cellW/2 + jitterX,
          y: marginY + 40 + r*cellH + cellH/2 + jitterY,
          emoji: HIDE_SPOTS_EMOJI[i % HIDE_SPOTS_EMOJI.length]
        });
        i++;
      }
    }
    hideSpots = spots;
  }

  function randomEscapeInterval(){
    const config = gameConfig[difficulty];
    return config.escapeMin + Math.random()*(config.escapeMax - config.escapeMin);
  }

  function setupGame(){
    const config = gameConfig[difficulty];
    layoutHideSpots();
    kids = hideSpots.map((spot, idx) => ({
      x: spot.x, y: spot.y,
      spotIndex: idx,
      emoji: KID_EMOJIS[idx % KID_EMOJIS.length],
      state: 'hidden',
      vx: 0, vy: 0
    }));

    catcher.x = canvas.width / 2;
    catcher.y = canvas.height - 70;

    score = 0; caught = 0; escaped = 0;
    timeLeft = config.timeLimit;
    escapeAccum = 0;
    nextEscapeIn = randomEscapeInterval();
    lastTime = null;

    hideOverlay();
    updateHud();
    cancelAnimationFrame(rafId);
    playMusic();
    running = true;
    paused = false;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    rafId = requestAnimationFrame(step);
  }

  // Controles de teclado (WASD / flechas) — único método de control
  window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
  window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

  function triggerEscape(){
    const hidden = kids.filter(k => k.state === 'hidden');
    if(!hidden.length) return;
    const kid = hidden[Math.floor(Math.random()*hidden.length)];
    kid.state = 'fleeing';
  }

  function endGame(win){
    running = false;
    stopMusic();
    paused = false;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';

    let title = win ? jt('jue.card4.end.win', '🏆 ¡Los atrapaste a todos antes del bote!') : (timeLeft <= 0 ? jt('jue.card4.end.timeUp', '⏰ ¡Se acabó el tiempo!') : jt('jue.card4.end.tooMany', '🏁 ¡Se te escaparon demasiados!'));
    let text = score >= 150 ? jt('jue.card4.end.high', '🌟 Sos el mejor "trayendola" del barrio, nadie se te escapa.') :
               score >= 80 ? jt('jue.card4.end.mid', '👍 Buena persecución, ¡ya casi los atrapás a todos!') :
               jt('jue.card4.end.low', 'Seguí practicando tus reflejos para la próxima ronda de encantados.');

    const gameName = `encantados-${difficulty}`;

    showOverlay(`
      <span class="overlay-tag">${jt('jue.card4.end.tag', 'Fin del Juego')}</span>
      <h3>${title}</h3>
      <div class="overlay-score">${score} pts</div>
      <p>${jt('jue.card4.end.caughtOf', 'Atrapaste {c} de {t} amigos.').replace('{c}', caught).replace('{t}', gameConfig[difficulty].kidsToWin)} ${text}</p>
      <p class="overlay-best-score" id="e-best-score"></p>
      <button class="btn-primary" id="e-restart">${jt('jue.end.playAgain', 'Jugar de nuevo')}</button>`);
    document.getElementById('e-restart').onclick = showDifficultySelector;

    guardarPuntajeJuego(gameName, score).then(() => {
      obtenerMejorPuntajeJuego(gameName).then((best) => {
        const el = document.getElementById('e-best-score');
        if (el && best) el.textContent = `${jt('jue.bestScore', 'Tu récord en este nivel')}: ${best.score} pts`;
      });
    });
  }

  function step(timestamp){
    if(!running || !isGameVisible) return;
    if(lastTime === null) lastTime = timestamp;
    const dt = Math.min(Math.max(timestamp - lastTime, 1), 100);
    lastTime = timestamp;
    const dtSec = dt / 1000;

    const config = gameConfig[difficulty];

    timeLeft -= dtSec;

    // Mover al catcher (jugador) con teclado o siguiendo el puntero
    let moveX = (keys['d'] || keys['arrowright'] ? 1 : 0) - (keys['a'] || keys['arrowleft'] ? 1 : 0);
    let moveY = (keys['s'] || keys['arrowdown'] ? 1 : 0) - (keys['w'] || keys['arrowup'] ? 1 : 0);
    if(moveX !== 0 || moveY !== 0){
      const len = Math.hypot(moveX, moveY) || 1;
      catcher.x += (moveX/len) * config.catcherSpeed;
      catcher.y += (moveY/len) * config.catcherSpeed;
    }
    catcher.x = Math.max(catcher.radius, Math.min(canvas.width - catcher.radius, catcher.x));
    catcher.y = Math.max(catcher.radius, Math.min(canvas.height - catcher.radius, catcher.y));

    // Disparar nuevas fugas periódicamente
    escapeAccum += dt;
    if(escapeAccum >= nextEscapeIn){
      escapeAccum = 0;
      nextEscapeIn = randomEscapeInterval();
      triggerEscape();
    }

    // Actualizar amigos que están huyendo hacia el bote
    for(const kid of kids){
      if(kid.state !== 'fleeing') continue;
      const dx = bote.x - kid.x;
      const dy = bote.y - kid.y;
      const dist = Math.hypot(dx, dy);
      if(dist > 2){
        kid.x += (dx/dist) * config.fleeSpeed * (dt/16.6);
        kid.y += (dy/dist) * config.fleeSpeed * (dt/16.6);
      }

      // ¿Lo atrapó el catcher?
      const catchDist = Math.hypot(kid.x - catcher.x, kid.y - catcher.y);
      if(catchDist < catcher.radius + 16){
        kid.state = 'caught';
        caught++;
        score += 25;
        updateHud();
        continue;
      }

      // ¿Llegó al bote?
      if(dist < bote.radius){
        kid.state = 'escaped';
        escaped++;
        score = Math.max(0, score - 10);
        flashEscape();
        updateHud();
      }
    }

    // Condiciones de fin
    if(caught >= config.kidsToWin){ endGame(true); return; }
    if(escaped >= config.maxEscapes){ endGame(false); return; }
    if(timeLeft <= 0){ endGame(caught >= Math.ceil(config.kidsToWin*0.6)); return; }

    updateHud();

    // ---- Render ----
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    const grad = ctx.createLinearGradient(0,0,0,canvas.height);
    grad.addColorStop(0, '#cdb98a');
    grad.addColorStop(1, '#b89b6a');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = '#bfe3ff';
    ctx.fillRect(0,0,canvas.width, canvas.height*0.12);

    // Bote (meta)
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.translate(bote.x, bote.y);
    ctx.fillStyle = '#5c4a30';
    ctx.beginPath();
    ctx.ellipse(0, bote.radius*0.8, bote.radius, bote.radius*0.35, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.font = (bote.radius*1.8)+'px sans-serif';
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('🛢️', 0, 0);
    ctx.font = 'bold 13px sans-serif';
    ctx.fillStyle = '#113068';
    ctx.fillText(jt('jue.card4.baseLabel', '¡BOTE!'), 0, bote.radius + 16);
    ctx.restore();

    // Escondites (objetos)
    for(const spot of hideSpots){
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.translate(spot.x, spot.y);
      ctx.fillStyle = '#5c4a30';
      ctx.beginPath();
      ctx.ellipse(0, 24, 26, 10, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.font = '46px sans-serif';
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.lineWidth = 4;
      ctx.strokeStyle = '#2c1f0e';
      ctx.lineJoin = 'round';
      ctx.strokeText(spot.emoji, 0, 0);
      ctx.fillText(spot.emoji, 0, 0);
      ctx.restore();
    }

    // Amigos huyendo
    for(const kid of kids){
      if(kid.state !== 'fleeing') continue;
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.translate(kid.x, kid.y);
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.beginPath();
      ctx.ellipse(0, 16, 14, 6, 0, 0, Math.PI*2);
      ctx.fill();
      ctx.font = '30px sans-serif';
      ctx.textAlign='center'; ctx.textBaseline='middle';
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#2c1f0e';
      ctx.lineJoin = 'round';
      ctx.strokeText(kid.emoji, 0, 0);
      ctx.fillText(kid.emoji, 0, 0);
      ctx.restore();
    }

    // Catcher (jugador)
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.translate(catcher.x, catcher.y);
    ctx.fillStyle = '#5c4a30';
    ctx.beginPath();
    ctx.ellipse(0, catcher.radius*0.9, catcher.radius*0.9, catcher.radius*0.3, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.font = (catcher.radius*1.7)+'px sans-serif';
    ctx.textAlign='center'; ctx.textBaseline='middle';
    ctx.fillText('🏃', 0, 1);
    ctx.restore();

    rafId = requestAnimationFrame(step);
  }

  const pauseBtn = document.getElementById('pauseBtn-encantados');
  const pauseIcon = document.getElementById('pauseIcon-encantados');
  const pauseOverlay = document.getElementById('pauseOverlay-encantados');
  const resumeBtn = document.getElementById('resumeBtn-encantados');
  const menuBtn = document.getElementById('menuBtn-encantados');

  function pauseGame(){
    if(!running) return;
    running = false;
    paused = true;
    cancelAnimationFrame(rafId);
    bgMusic?.pause();
    canvasWrap?.classList.add('is-paused');
    pauseOverlay?.classList.remove('hidden');
    if(pauseIcon) pauseIcon.textContent = '▶️';
  }
  function resumeGame(){
    if(!paused) return;
    paused = false;
    running = true;
    lastTime = null;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    if(volume > 0) bgMusic?.play().catch(()=>{});
    rafId = requestAnimationFrame(step);
  }
  function returnToMenu(){
    running = false;
    paused = false;
    cancelAnimationFrame(rafId);
    stopMusic();
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    showModeSelector();
  }
  pauseBtn?.addEventListener('click', ()=>{
    if(!running && !paused) return;
    if(paused) resumeGame();
    else pauseGame();
  });
  resumeBtn?.addEventListener('click', resumeGame);
  menuBtn?.addEventListener('click', returnToMenu);

  function showDifficultySelector(){
    showOverlay(`
      <span class="overlay-tag">${jt('jue.diff.chooseTag', 'Elegí tu dificultad')}</span>
      <h3>${jt('jue.card4.diff.title', '🏃 ¿Qué tan rápidos son tus amigos?')}</h3>
      <p>${jt('jue.card4.diff.sub', 'Más difícil significa que corren más rápido al bote y tenés menos escapes permitidos.')}</p>
      <div class="difficulty-buttons">
        <button class="difficulty-btn easy" id="btn-easy-encantados">
          ${jt('jue.diff.easy', '🟢 Fácil')}
          <div class="difficulty-desc">${jt('jue.card4.diff.easyDesc', 'Atrapá 6 amigos, corren despacio')}</div>
        </button>
        <button class="difficulty-btn medium" id="btn-medium-encantados">
          ${jt('jue.diff.medium', '🟡 Normal')}
          <div class="difficulty-desc">${jt('jue.card4.diff.medDesc', 'Atrapá 8 amigos, corren más seguido')}</div>
        </button>
        <button class="difficulty-btn hard" id="btn-hard-encantados">
          ${jt('jue.diff.hard', '🔴 Difícil')}
          <div class="difficulty-desc">${jt('jue.card4.diff.hardDesc', 'Atrapá 10 amigos, casi no hay respiro')}</div>
        </button>
      </div>`);
    document.getElementById('btn-easy-encantados').onclick = () => { difficulty='easy'; setTimeout(()=>{ resizeCanvas(); setupGame(); }, 100); };
    document.getElementById('btn-medium-encantados').onclick = () => { difficulty='medium'; setTimeout(()=>{ resizeCanvas(); setupGame(); }, 100); };
    document.getElementById('btn-hard-encantados').onclick = () => { difficulty='hard'; setTimeout(()=>{ resizeCanvas(); setupGame(); }, 100); };
  }

  function showModeSelector(){
    showOverlay(`
      <span class="overlay-tag">${jt('jue.card4.tagModal', 'Ruta 04')}</span>
      <h3>🏃 ${jt('jue.card4.title', 'Escondelero')}</h3>
      <p>${jt('jue.card4.intro', 'Vos sos "el que la trae". Tus amigos están escondidos por todo el patio y de repente van a salir corriendo hacia el bote para salvarse. Movete con las teclas <strong>WASD</strong> o las <strong>flechas</strong> del teclado e interceptalos antes de que lleguen.')}</p>
      <p class="rules-title">${jt('jue.rules.title', 'Reglas del juego')}</p>
      <ul class="rules-list">
        <li class="rule-good"><span class="rule-icon">✅</span> ${jt('jue.card4.ruleGood', 'Tocá a los amigos que van corriendo antes de que lleguen al bote — cada atrapada suma puntos.')}</li>
        <li class="rule-bad"><span class="rule-icon">❌</span> ${jt('jue.card4.ruleBad', 'Si un amigo llega al bote, se salva y perdés puntos. Si se te escapan demasiados, perdés la partida.')}</li>
      </ul>
      <button class="btn-primary" id="e-start">${jt('jue.continue', 'Continuar')}</button>`);
    document.getElementById('e-start').onclick = showDifficultySelector;
  }

  resizeCanvas();
  showModeSelector();

  gameContent?.addEventListener('gameVisible', (e) => {
    if(e.detail.gameId === 'encantados') {
      isGameVisible = true;
      resizeCanvas();
      // La música arranca apenas se abre la ventana del juego, en loop,
      // y se corta al cerrar el modal (ver stop: stopMusic más abajo).
      playMusic();
      if(paused && running) resumeGame();
      else if(running) rafId = requestAnimationFrame(step);
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
   JUEGO 5: ELOTES Y OLÉ (RECOLECCIÓN EN CARRILES DEL RECREO)
--------------------------------------------------------- */
(function initGameElotes(){
  const canvas = document.getElementById('canvas-elotes');
  if(!canvas) return;

  const ctx = canvas.getContext('2d');
  const hud = document.getElementById('hud-elotes');
  const overlay = document.getElementById('overlay-elotes');
  const overlayCard = document.getElementById('overlay-card-elotes');
  const gameContent = document.getElementById('modal-elotes');
  const canvasWrap = document.getElementById('elotes-canvas-wrap');

  let isGameVisible = false;
  let running = false;
  let paused = false;
  let rafId = null;

  let baseWidth = 0, baseHeight = 0;
  function resizeCanvas() {
    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);

    if(isFS && baseWidth && baseHeight){
      canvas.width = baseWidth;
      canvas.height = baseHeight;
    } else {
      const wrap = canvasWrap || canvas.closest('.canvas-wrap');
      const rect = wrap ? wrap.getBoundingClientRect() : canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      baseWidth = canvas.width;
      baseHeight = canvas.height;
    }
    laneWidth = canvas.width / lanesCount;
    for(let i=0;i<lanesCount;i++){ lanePositions[i] = (i*laneWidth) + (laneWidth/2); }
    player.y = canvas.height - 90;
    player.targetX = lanePositions[player.lane];
  }

  const lanesCount = 3;
  let laneWidth = 0;
  const lanePositions = [];

  let player = { x:0, y:0, lane:1, targetX:0 };
  let items = []; // {x,y,lane,type,emoji,points,speed}
  let obstacles = []; // {x,y,lane,emoji,speed}

  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  document.addEventListener('fullscreenchange', () => setTimeout(resizeCanvas, 100));
  document.addEventListener('webkitfullscreenchange', () => setTimeout(resizeCanvas, 100));

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
    if(running && !paused){
      if(e.key.toLowerCase()==='a' || e.key==='ArrowLeft') moveLane(-1);
      if(e.key.toLowerCase()==='d' || e.key==='ArrowRight') moveLane(1);
    }
  });
  window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);
  function moveLane(dir){
    const next = player.lane + dir;
    if(next >= 0 && next < lanesCount) player.lane = next;
  }
  // Soporte táctil: tap en mitad izquierda/derecha del canvas mueve de carril
  canvas.addEventListener('touchstart', (e)=>{
    if(!running || paused) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    if(x < rect.width/2) moveLane(-1); else moveLane(1);
  }, {passive:true});

  const GOOD_ITEMS = [
    {emoji:'🌽', pts:10, label:'elote loco'},
    {emoji:'🥭', pts:8, label:'mango'},
    {emoji:'🍧', pts:12, label:'minuta'},
    {emoji:'🍬', pts:6, label:'dulce'}
  ];
  const BAD_ITEMS = [
    {emoji:'🪑', label:'pupitre'},
    {emoji:'⚽', label:'pelota perdida'},
    {emoji:'🧹', label:'escoba del conserje'}
  ];

  let gameConfig = {
    easy:   { timeLimit: 40, itemMinGap: 900, itemMaxGap: 1400, obstacleMinGap: 1600, obstacleMaxGap: 2400, speed: 3.2, initialLives: 4 },
    hard:   { timeLimit: 35, itemMinGap: 650, itemMaxGap: 1050, obstacleMinGap: 1100, obstacleMaxGap: 1700, speed: 4.4, initialLives: 3 }
  };
  let difficulty = null;
  let score = 0, lives = 3, totalLives = 3, combo = 0, timeLeft = 30;
  let clockAccum = 0, lastTime = null;
  let itemSpawnAccum = 0, nextItemSpawnIn = 1000;
  let obstacleSpawnAccum = 0, nextObstacleSpawnIn = 1800;
  const MIN_LANE_GAP = 90; // separación mínima vertical entre entidades del mismo carril

  function randomItemGap(){
    const c = gameConfig[difficulty];
    return c.itemMinGap + Math.random()*(c.itemMaxGap - c.itemMinGap);
  }
  function randomObstacleGap(){
    const c = gameConfig[difficulty];
    return c.obstacleMinGap + Math.random()*(c.obstacleMaxGap - c.obstacleMinGap);
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

  function renderLives(count){
    const hearts = [];
    for(let i=0;i<totalLives;i++){
      const active = i < count;
      hearts.push(`<span class="heart${active?'':' broken'}">${active?'❤️':'💔'}</span>`);
    }
    return hearts.join('');
  }

  if(hud){
    hud.innerHTML = `
      <div class="hud-item">
        <span>${jt('jue.hud.points', 'Puntos')}</span>
        <b id="el-score">0</b>
      </div>
      <div class="hud-item lives">
        <span>${jt('jue.hud.lives', 'Vidas')}</span>
        <b id="el-lives">${renderLives(3)}</b>
      </div>
      <div class="hud-item">
        <span>${jt('jue.hud.combo', 'Combo')}</span>
        <span class="elotes-combo" id="el-combo">x1</span>
      </div>
      <div class="hud-item">
        <span>${jt('jue.hud.time', 'Tiempo')}</span>
        <b id="el-time">30</b>
      </div>`;
  }

  function updateHud(){
    const scoreEl = document.getElementById('el-score');
    const livesEl = document.getElementById('el-lives');
    const comboEl = document.getElementById('el-combo');
    const timeEl = document.getElementById('el-time');
    if(scoreEl) scoreEl.textContent = score;
    if(livesEl) livesEl.innerHTML = renderLives(lives);
    if(comboEl) comboEl.textContent = 'x' + Math.max(1, 1 + Math.floor(combo/5));
    if(timeEl) timeEl.textContent = Math.max(0, Math.ceil(timeLeft));
  }

  // Audio
  const bgMusic = document.getElementById('bgMusic-elotes');
  const volumeSlider = document.getElementById('volumeSlider-elotes');
  const volumeIcon = document.getElementById('volumeIcon-elotes');
  const damageOverlay = document.getElementById('damageOverlay-elotes');
  let volume = Number(volumeSlider?.value || 0.45);
  if(bgMusic){ bgMusic.volume = volume; bgMusic.muted = false; }
  volumeSlider?.addEventListener('input', (event)=>{
    volume = Number(event.target.value);
    if(bgMusic){ bgMusic.volume = volume; bgMusic.muted = volume <= 0; }
    if(volumeIcon) volumeIcon.textContent = volume <= 0 ? '🔇' : volume < 0.35 ? '🔉' : '🔊';
  });
  function playMusic(){ if(!bgMusic) return; bgMusic.muted = false; bgMusic.volume = volume; bgMusic.currentTime = 0; bgMusic.play().catch(()=>{}); }
  function stopMusic(){ bgMusic?.pause(); }
  function flashDamage(){
    if(!damageOverlay) return;
    damageOverlay.style.opacity = '1';
    setTimeout(() => { damageOverlay.style.opacity = '0'; }, 150);
  }

  const pauseBtn = document.getElementById('pauseBtn-elotes');
  const pauseIcon = document.getElementById('pauseIcon-elotes');
  const pauseOverlay = document.getElementById('pauseOverlay-elotes');
  const resumeBtn = document.getElementById('resumeBtn-elotes');
  const menuBtn = document.getElementById('menuBtn-elotes');

  function pauseGame(){
    if(!running) return;
    running = false;
    paused = true;
    cancelAnimationFrame(rafId);
    bgMusic?.pause();
    canvasWrap?.classList.add('is-paused');
    pauseOverlay?.classList.remove('hidden');
    if(pauseIcon) pauseIcon.textContent = '▶️';
  }
  function resumeGame(){
    if(!paused) return;
    paused = false;
    running = true;
    lastTime = null;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    if(volume > 0) bgMusic?.play().catch(()=>{});
    rafId = requestAnimationFrame(step);
  }
  function returnToMenu(){
    running = false;
    paused = false;
    cancelAnimationFrame(rafId);
    stopMusic();
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    items = [];
    obstacles = [];
    showDifficultySelector();
  }
  pauseBtn?.addEventListener('click', ()=>{
    if(!running && !paused) return;
    if(paused) resumeGame();
    else pauseGame();
  });
  resumeBtn?.addEventListener('click', resumeGame);
  menuBtn?.addEventListener('click', returnToMenu);

  function spawnEntities(dt){
    const config = gameConfig[difficulty];

    itemSpawnAccum += dt;
    if(itemSpawnAccum >= nextItemSpawnIn){
      const lane = Math.floor(Math.random()*lanesCount);
      const blocked = [...items, ...obstacles].some(e => e.lane === lane && e.y < MIN_LANE_GAP);
      if(!blocked){
        itemSpawnAccum = 0;
        nextItemSpawnIn = randomItemGap();
        const good = GOOD_ITEMS[Math.floor(Math.random()*GOOD_ITEMS.length)];
        items.push({ x: lanePositions[lane], y: -30, lane, emoji: good.emoji, pts: good.pts, speed: config.speed });
      }
    }

    obstacleSpawnAccum += dt;
    if(obstacleSpawnAccum >= nextObstacleSpawnIn){
      const lane = Math.floor(Math.random()*lanesCount);
      const blocked = [...items, ...obstacles].some(e => e.lane === lane && e.y < MIN_LANE_GAP);
      if(!blocked){
        obstacleSpawnAccum = 0;
        nextObstacleSpawnIn = randomObstacleGap();
        const bad = BAD_ITEMS[Math.floor(Math.random()*BAD_ITEMS.length)];
        obstacles.push({ x: lanePositions[lane], y: -30, lane, emoji: bad.emoji, speed: config.speed });
      }
    }
  }

  function step(timestamp){
    if(!running || !isGameVisible) return;
    if(lastTime === null) lastTime = timestamp;
    const dt = Math.min(Math.max(timestamp - lastTime, 1), 100);
    lastTime = timestamp;
    const timeScale = dt / 16.67; // normaliza el movimiento a ~60fps sin importar la tasa real de refresco

    spawnEntities(dt);

    player.targetX = lanePositions[player.lane];
    player.x += (player.targetX - player.x) * Math.min(1, 0.28 * timeScale);

    items.forEach((it, idx) => {
      it.y += it.speed * timeScale;
      if(Math.abs(it.x - player.x) < 34 && Math.abs(it.y - player.y) < 42 && it.lane === player.lane){
        const multiplier = Math.max(1, 1 + Math.floor(combo/5));
        score += it.pts * multiplier;
        combo++;
        items.splice(idx,1);
        updateHud();
        return;
      }
      if(it.y > canvas.height + 40) items.splice(idx,1);
    });

    obstacles.forEach((obs, idx) => {
      obs.y += obs.speed * timeScale;
      if(Math.abs(obs.x - player.x) < 30 && Math.abs(obs.y - player.y) < 40 && obs.lane === player.lane){
        lives -= 1;
        combo = 0;
        flashDamage();
        obstacles.splice(idx,1);
        updateHud();
        return;
      }
      if(obs.y > canvas.height + 40) obstacles.splice(idx,1);
    });

    clockAccum += dt;
    while(clockAccum >= 1000 && timeLeft > 0){
      clockAccum -= 1000;
      timeLeft -= 1;
    }
    updateHud();

    if(lives <= 0 || timeLeft <= 0){
      running = false;
      endGame();
      return;
    }

    // Render
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawYard();
    obstacles.forEach(drawEmojiEntity);
    items.forEach(drawEmojiEntity);
    drawPlayer();

    rafId = requestAnimationFrame(step);
  }

  function drawYard(){
    ctx.fillStyle = '#e8d9a8';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(120,90,40,0.35)';
    ctx.lineWidth = 3;
    ctx.setLineDash([16,20]);
    for(let i=1;i<lanesCount;i++){
      ctx.beginPath();
      ctx.moveTo(i*laneWidth, 0);
      ctx.lineTo(i*laneWidth, canvas.height);
      ctx.stroke();
    }
    ctx.setLineDash([]);
  }

  function drawEmojiEntity(entity){
    ctx.save();
    ctx.font = '32px sans-serif';
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    ctx.fillText(entity.emoji, entity.x, entity.y);
    ctx.restore();
  }

  function drawPlayer(){
    ctx.save();
    ctx.translate(player.x, player.y);
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(0, 22, 22, 8, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.font = '40px sans-serif';
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    ctx.fillText('🧒', 0, 0);
    ctx.restore();
  }

  function endGame(){
    stopMusic();
    paused = false;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';

    let text = score >= 150 ? jt('jue.card5.end.high', '🏆 ¡Sos el campeón del recreo, nadie te gana un elote!') :
               score >= 80 ? jt('jue.card5.end.mid', '🌟 ¡Buen ritmo! Ya casi te comés todo el recreo.') :
               jt('jue.card5.end.low', '👍 Buen intento, ¡seguí practicando para el próximo recreo!');

    const gameName = `elotes-${difficulty}`;

    showOverlay(`
      <span class="overlay-tag">${difficulty === 'easy' ? jt('jue.diff.easyTag', '🟢 Nivel Fácil') : jt('jue.diff.hardTag', '🔴 Nivel Difícil')}</span>
      <h3>${jt('jue.card5.end.title', '¡Sonó la campana!')}</h3>
      <div class="overlay-score">${score} pts</div>
      <p>${text}</p>
      <p class="overlay-best-score" id="el-best-score"></p>
      <button class="btn-primary" id="el-restart">${jt('jue.end.playAgain', 'Jugar de nuevo')}</button>`);
    document.getElementById('el-restart').onclick = showDifficultySelector;

    guardarPuntajeJuego(gameName, score).then(() => {
      obtenerMejorPuntajeJuego(gameName).then((best) => {
        const el = document.getElementById('el-best-score');
        if (el && best) el.textContent = `${jt('jue.bestScore', 'Tu récord en este nivel')}: ${best.score} pts`;
      });
    });
  }

  function start(){
    resizeCanvas();
    items = [];
    obstacles = [];
    player.lane = 1;
    player.x = lanePositions[1];
    player.targetX = lanePositions[1];
    score = 0;
    combo = 0;
    lives = totalLives;
    timeLeft = gameConfig[difficulty].timeLimit;
    clockAccum = 0;
    lastTime = null;
    itemSpawnAccum = 0;
    nextItemSpawnIn = randomItemGap();
    obstacleSpawnAccum = 0;
    nextObstacleSpawnIn = randomObstacleGap();
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
      <span class="overlay-tag">${jt('jue.diff.chooseTag', 'Elegí tu dificultad')}</span>
      <h3>🌽 ${jt('jue.card5.diff.title', 'Selecciona Nivel')}</h3>
      <p>${jt('jue.card5.diff.sub', '¿Qué tan movido va a estar el recreo hoy?')}</p>
      <div class="difficulty-buttons">
        <button class="difficulty-btn easy" id="btn-easy-elotes">
          ${jt('jue.diff.easy', '🟢 Fácil')}
          <div class="difficulty-desc">${jt('jue.card5.diff.easyDesc', 'Recreo tranquilo')}</div>
        </button>
        <button class="difficulty-btn hard" id="btn-hard-elotes">
          ${jt('jue.diff.hard', '🔴 Difícil')}
          <div class="difficulty-desc">${jt('jue.card5.diff.hardDesc', 'Recreo a toda velocidad')}</div>
        </button>
      </div>`);
    document.getElementById('btn-easy-elotes').onclick = () => {
      difficulty='easy'; totalLives = gameConfig.easy.initialLives;
      setTimeout(()=>{ start(); }, 100);
    };
    document.getElementById('btn-hard-elotes').onclick = () => {
      difficulty='hard'; totalLives = gameConfig.hard.initialLives;
      setTimeout(()=>{ start(); }, 100);
    };
  }

  showOverlay(`
    <span class="overlay-tag">${jt('jue.card5.tagModal', 'Ruta 05')}</span>
    <h3>🌽 ${jt('jue.card5.title', 'Elotes y Olé')}</h3>
    <p>${jt('jue.card5.intro', 'Movete entre los 3 carriles del patio con las teclas <strong>A</strong>/<strong>D</strong>, las flechas ⬅️➡️, o tocando a los lados de la pantalla en el celular. Recogé lo rico del recreo y esquivá lo que te estorba.')}</p>
    <p class="rules-title">${jt('jue.rules.title', 'Reglas del juego')}</p>
    <ul class="rules-list">
      <li class="rule-good"><span class="rule-icon">✅</span> ${jt('jue.card5.ruleGood', 'Recogé <strong>🌽 elotes locos</strong>, <strong>🥭 mangos</strong>, <strong>🍧 minutas</strong> y <strong>🍬 dulces</strong> — suman puntos y combo.')}</li>
      <li class="rule-bad"><span class="rule-icon">❌</span> ${jt('jue.card5.ruleBad', 'Evitá <strong>🪑 pupitres</strong>, <strong>⚽ pelotas perdidas</strong> y <strong>🧹 la escoba del conserje</strong> — te quitan una vida y el combo.')}</li>
    </ul>
    <button class="btn-primary" id="el-start">${jt('jue.continue', 'Continuar')}</button>`);
  document.getElementById('el-start').onclick = showDifficultySelector;

  gameContent?.addEventListener('gameVisible', (e) => {
    if(e.detail.gameId === 'elotes') {
      isGameVisible = true;
      resizeCanvas();
      // La música arranca apenas se abre la ventana del juego, en loop,
      // y se corta al cerrar el modal (ver stop: stopMusic más abajo).
      playMusic();
      if(paused && running) resumeGame();
      else if(running) rafId = requestAnimationFrame(step);
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
   JUEGO 6: TORITO PINTO (carrera de distancia por carriles,
   ambientado en una calle empedrada de pueblo mágico con gente
   comprando, puestos y obstáculos — mismo patrón que Coasters
   pero con barra de energía en vez de bus rival)
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

  let isGameVisible = false;
  let running = false;
  let paused = false;
  let rafId = null;

  // Parámetros de juego
  let gameDifficulty = 'easy';
  let targetDistance = 1000;

  const gameConfig = {
    easy: { fallSpeed: 2.6, obstacleChance: 0.008, peopleChance: 0.010, energyDrainOnHit: 14, energyRegen: 6 },
    hard: { fallSpeed: 3.6, obstacleChance: 0.014, peopleChance: 0.016, energyDrainOnHit: 22, energyRegen: 4 }
  };

  const lanesCount = 3;
  let laneWidth = 0;
  let streetLeft = 0, streetRight = 0; // límites de la calle libre (entre las fachadas)
  let stallLeftX = 0, stallRightX = 0; // posición fija de los puestos, sobre la acera
  const lanePositions = [];

  let toritoLane = 1;
  let toritoY = 0;
  let distance = 0, energy = 100;
  let stalls = []; // decorativos, sin física, pegados a la acera

  // AJUSTE ANTI-BLUR: resolución lógica del canvas fija, el CSS la estira en pantalla completa.
  let baseWidth = 0, baseHeight = 0;
  function resizeCanvas() {
    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);

    if(isFS && baseWidth && baseHeight){
      canvas.width = baseWidth;
      canvas.height = baseHeight;
    } else {
      const wrap = canvasWrap || canvas.closest('.canvas-wrap');
      const rect = wrap ? wrap.getBoundingClientRect() : canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      baseWidth = canvas.width;
      baseHeight = canvas.height;
    }

    // La calle libre es el área entre las dos franjas de fachada/acera
    // (14% del ancho a cada lado). Los 3 carriles del torito viven solo
    // dentro de esa franja central, dejando siempre espacio para pasar.
    const sideW = canvas.width * 0.14;
    streetLeft = sideW;
    streetRight = canvas.width - sideW;
    const streetWidth = streetRight - streetLeft;

    laneWidth = streetWidth / lanesCount;
    for(let i = 0; i < lanesCount; i++){
      lanePositions[i] = streetLeft + (i * laneWidth) + (laneWidth / 2);
    }

    stallLeftX = sideW * 0.55;
    stallRightX = canvas.width - sideW * 0.55;

    toritoY = canvas.height - 110;

    // Paredes invisibles a los lados de la calle (no de todo el canvas),
    // para que los objetos con física reboten dentro del área jugable
    // en vez de escaparse hacia los puestos decorativos.
    if(engine){
      Composite.remove(world, wallLeft);
      Composite.remove(world, wallRight);
      wallLeft = Bodies.rectangle(streetLeft - 10, canvas.height/2, 20, canvas.height * 2, { isStatic: true, label: 'wall' });
      wallRight = Bodies.rectangle(streetRight + 10, canvas.height/2, 20, canvas.height * 2, { isStatic: true, label: 'wall' });
      World.add(world, [wallLeft, wallRight]);

      if(toritoBody) Body.setPosition(toritoBody, { x: lanePositions[toritoLane], y: toritoY });
    }
  }

  // ── Motor de física ──
  const engine = Engine.create();
  engine.gravity.y = 0; // sin gravedad vertical: los objetos "caen" hacia el jugador por velocidad propia, no por gravedad de mundo
  const world = engine.world;

  let wallLeft = Bodies.rectangle(-10, 0, 20, 10, { isStatic: true, label: 'wall' });
  let wallRight = Bodies.rectangle(-10, 0, 20, 10, { isStatic: true, label: 'wall' });
  World.add(world, [wallLeft, wallRight]);

  // El torito: cuerpo estático que se reposiciona según el carril elegido,
  // igual que el comal de Atrapa la Pupusa. Al ser estático pero con
  // colisiones activas, los objetos dinámicos rebotan realmente contra él.
  const toritoBody = Bodies.rectangle(0, 0, 46, 30, { isStatic: true, label: 'torito' });
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

  // Controles: A/D o flechas para cambiar de carril
  let keys = {};
  window.addEventListener('keydown', e => {
    keys[e.key.toLowerCase()] = true;
    if(running && !paused) {
      if(e.key.toLowerCase() === 'a' || e.key === 'ArrowLeft') moveLane(-1);
      if(e.key.toLowerCase() === 'd' || e.key === 'ArrowRight') moveLane(1);
    }
  });
  window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

  canvas.addEventListener('touchstart', e => {
    if(!running || paused) return;
    const r = canvas.getBoundingClientRect();
    const touchX = e.touches[0].clientX - r.left;
    moveLane(touchX < r.width / 2 ? -1 : 1);
  }, { passive: true });

  function moveLane(direction) {
    const nextLane = toritoLane + direction;
    if(nextLane >= 0 && nextLane < lanesCount) toritoLane = nextLane;
  }

  function updateHud(){
    const prog = document.getElementById('t-prog');
    const dist = document.getElementById('t-dist');
    const energyFill = document.getElementById('t-energy-fill');

    if(prog) prog.style.width = Math.min(100, (distance / targetDistance) * 100) + '%';
    if(dist) dist.textContent = Math.round(distance) + 'm / ' + targetDistance + 'm';
    if(energyFill) {
      energyFill.style.width = Math.max(0, energy) + '%';
      energyFill.style.background = energy > 50 ? '#3ae080' : energy > 20 ? '#ffb300' : '#e53935';
    }
  }

  if(hud) {
    hud.innerHTML = `
      <div class="hud-item">
        <span>${jt('jue.card6.routeLabel', '🐂 Recorrido')}</span>
        <div class="coasters-progress-bar"><div id="t-prog" class="coasters-progress-fill"></div></div>
        <b id="t-dist">0m</b>
      </div>
      <div class="hud-item">
        <span>${jt('jue.card6.energyLabel', '🧨 Energía')}</span>
        <div class="coasters-progress-bar"><div id="t-energy-fill" class="coasters-progress-fill" style="background:#3ae080;"></div></div>
      </div>`;
  }

  // Audio
  const bgMusic = document.getElementById('bgMusic-torito');
  const volumeSlider = document.getElementById('volumeSlider-torito');
  const volumeIcon = document.getElementById('volumeIcon-torito');
  const damageOverlay = document.getElementById('damageOverlay-torito');
  let volume = Number(volumeSlider?.value || 0.45);

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
    bgMusic.currentTime = 0;
    bgMusic.play().catch(()=>{});
  }
  function stopMusic(){ bgMusic?.pause(); }

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
    toritoLane = 1;
    Body.setPosition(toritoBody, { x: lanePositions[1], y: toritoY });
    distance = 0;
    energy = 100;
    stalls = [];

    // Limpiar todos los cuerpos dinámicos (carretas, gente, cohetillos) que
    // hayan quedado de una partida anterior.
    Composite.allBodies(world).forEach(b => {
      if(b.label === 'carreta' || b.label === 'persona' || b.label === 'cohetillo') {
        World.remove(world, b);
      }
    });
  }

  // ── Spawns con física real ──
  function spawnCarreta(){
    const lane = Math.floor(Math.random() * lanesCount);
    const body = Bodies.rectangle(lanePositions[lane], -40, 40, 20, {
      restitution: 0.35, friction: 0.4, frictionAir: 0.01, label: 'carreta'
    });
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04);
    World.add(world, body);
  }

  function spawnPersona(){
    const lane = Math.floor(Math.random() * lanesCount);
    const body = Bodies.circle(lanePositions[lane], -40, 12, {
      restitution: 0.5, friction: 0.3, frictionAir: 0.015, label: 'persona'
    });
    body.outfitColor = ['#e63946', '#3a86c8', '#2fbf9f', '#f2c744', '#7d3ac1'][Math.floor(Math.random() * 5)];
    World.add(world, body);
  }

  function spawnCohetillo(){
    const lane = Math.floor(Math.random() * lanesCount);
    const body = Bodies.circle(lanePositions[lane], -40, 9, {
      restitution: 0.6, friction: 0.2, frictionAir: 0.012, isSensor: true, label: 'cohetillo'
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
    const config = gameConfig[gameDifficulty];
    if(Math.random() < config.obstacleChance && countBodies('carreta') < 3) spawnCarreta();
    if(Math.random() < 0.01 && stalls.length < 3) spawnStall();
    if(Math.random() < config.peopleChance && countBodies('persona') < 5) spawnPersona();
    if(Math.random() < 0.008 && countBodies('cohetillo') < 2) spawnCohetillo();
  }

  // ── Colisiones: al chocar con el torito, el objeto sale despedido con
  // física real (impulso + giro) en vez de simplemente desaparecer ──
  const toRemove = new Set();

  Events.on(engine, 'collisionStart', (evt) => {
    const config = gameConfig[gameDifficulty];
    for(const pair of evt.pairs){
      const bodies = [pair.bodyA, pair.bodyB];
      const toritoHit = bodies.find(b => b.label === 'torito');
      const other = bodies.find(b => b.label === 'carreta' || b.label === 'persona' || b.label === 'cohetillo');
      if(!toritoHit || !other || other.hit) continue;

      other.hit = true;

      if(other.label === 'cohetillo') {
        energy = Math.min(100, energy + config.energyRegen);
        toRemove.add(other);
        continue;
      }

      // Impulso realista: el objeto sale despedido hacia un lado al azar y
      // gira, en vez de desaparecer al instante.
      const kickX = (Math.random() - 0.5) * 0.045;
      Body.applyForce(other, other.position, { x: kickX, y: -0.02 });
      Body.setAngularVelocity(other, (Math.random() - 0.5) * 0.5);

      const penalty = other.label === 'carreta' ? config.energyDrainOnHit : config.energyDrainOnHit * 0.5;
      energy = Math.max(0, energy - penalty);
      flashDamage();

      // Se remueve un instante después para que se alcance a ver el
      // rebote/giro antes de desaparecer del carril.
      setTimeout(() => toRemove.add(other), 220);
    }
  });

  function step(){
    if(!running || !isGameVisible) return;

    const config = gameConfig[gameDifficulty];

    distance += config.fallSpeed * 0.4;
    energy = Math.max(0, energy - 0.045);

    spawnEntities();

    // Mover el torito al carril elegido (suavizado)
    const targetX = lanePositions[toritoLane];
    const nextX = toritoBody.position.x + (targetX - toritoBody.position.x) * 0.22;
    Body.setPosition(toritoBody, { x: nextX, y: toritoY });

    // Los objetos avanzan hacia el jugador empujándolos con velocidad propia
    // (no gravedad de mundo), así el "carril" se respeta salvo cuando la
    // física del rebote los saca de su trayectoria tras un choque.
    Composite.allBodies(world).forEach(b => {
      if(b.label === 'carreta' || b.label === 'persona' || b.label === 'cohetillo') {
        Body.setVelocity(b, { x: b.velocity.x * 0.96, y: config.fallSpeed });
        if(b.position.y > canvas.height + 60) World.remove(world, b);
      }
    });

    stalls.forEach((s, idx) => {
      s.y += config.fallSpeed;
      if(s.y > canvas.height) stalls.splice(idx, 1);
    });

    Engine.update(engine, 16.667);

    // Remover cuerpos marcados tras su animación de rebote
    if(toRemove.size){
      toRemove.forEach(b => World.remove(world, b));
      toRemove.clear();
    }

    if(energy <= 0) { endRun('sinEnergia'); return; }
    if(distance >= targetDistance) { endRun('completo'); return; }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStreet();
    stalls.forEach(drawStall);
    Composite.allBodies(world).forEach(b => {
      if(b.label === 'carreta') drawCarreta(b);
      else if(b.label === 'persona') drawPersona(b);
      else if(b.label === 'cohetillo') drawCohetillo(b);
    });
    drawTorito(toritoBody.position.x, toritoY);

    updateHud();
    rafId = requestAnimationFrame(step);
  }

  // ── Arte: calle empedrada de pueblo mágico (tipo Ataco) con casas de colores ──
  function drawStreet(){
    ctx.fillStyle = '#9c8f7e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(0,0,0,.10)';
    ctx.lineWidth = 1;
    const stoneSize = 26;
    const offsetY = distance % stoneSize;
    for(let row = -1; row * stoneSize - offsetY < canvas.height; row++) {
      const rowY = row * stoneSize - offsetY;
      const shift = (row % 2 === 0) ? 0 : stoneSize / 2;
      for(let col = -1; col * stoneSize + shift < canvas.width; col++) {
        const sx = col * stoneSize + shift;
        ctx.strokeRect(sx, rowY, stoneSize, stoneSize);
      }
    }

    const facadeColors = ['#f2b134', '#3a7d6b', '#7d3ac1', '#e8622c'];
    const colorIdx = Math.floor(distance / 260);
    const sideW = canvas.width * 0.14;

    drawFacade(0, sideW, facadeColors[colorIdx % facadeColors.length]);
    drawFacade(canvas.width - sideW, sideW, facadeColors[(colorIdx + 2) % facadeColors.length]);

    ctx.fillStyle = 'rgba(0,0,0,.15)';
    ctx.fillRect(sideW - 4, 0, 4, canvas.height);
    ctx.fillRect(canvas.width - sideW, 0, 4, canvas.height);
  }

  function drawFacade(startX, width, color) {
    ctx.fillStyle = color;
    ctx.fillRect(startX, 0, width, canvas.height);

    ctx.fillStyle = '#a8432f';
    const tejaX = startX < canvas.width / 2 ? startX + width - 6 : startX;
    ctx.fillRect(tejaX, 0, 6, canvas.height);

    const doorSpacing = 130;
    const offsetY = (distance * 0.4) % doorSpacing;
    ctx.fillStyle = 'rgba(255,255,255,.85)';
    for(let y = -offsetY; y < canvas.height; y += doorSpacing) {
      const cx = startX + width / 2;
      ctx.beginPath();
      ctx.roundRect(cx - width * 0.22, y + 20, width * 0.44, width * 0.6, 3);
      ctx.fill();
    }
  }

  function drawTorito(x, y){
    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = 'rgba(0,0,0,.28)';
    ctx.beginPath();
    ctx.ellipse(0, 46, 24, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    const bob = Math.sin(Date.now() / 160) * 2;
    const legSwing = Math.sin(Date.now() / 110) * 6;
    ctx.fillStyle = '#1c1c1c';
    ctx.beginPath();
    ctx.roundRect(-7, 30 + bob, 5, 16 + legSwing * 0.3, 2);
    ctx.fill();
    ctx.beginPath();
    ctx.roundRect(2, 30 + bob, 5, 16 - legSwing * 0.3, 2);
    ctx.fill();
    ctx.fillStyle = '#2b2b2b';
    ctx.beginPath();
    ctx.roundRect(-10, 8 + bob, 20, 26, 6);
    ctx.fill();

    ctx.translate(0, bob);

    ctx.strokeStyle = '#8a6238';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-20, 6); ctx.lineTo(-22, -22);
    ctx.moveTo(20, 6); ctx.lineTo(22, -22);
    ctx.moveTo(-22, -22); ctx.lineTo(22, -22);
    ctx.moveTo(-22, -6); ctx.lineTo(22, -6);
    ctx.moveTo(-20, 6); ctx.lineTo(20, 6);
    ctx.stroke();

    const panos = [
      { x: -14, y: -16, w: 12, h: 12, color: '#e63946' },
      { x: -1,  y: -18, w: 11, h: 11, color: '#f2c744' },
      { x: 10,  y: -15, w: 12, h: 12, color: '#3a86c8' },
      { x: -16, y: -3,  w: 11, h: 11, color: '#2fbf9f' },
      { x: -3,  y: -3,  w: 11, h: 12, color: '#7d3ac1' },
      { x: 10,  y: -2,  w: 11, h: 11, color: '#e63946' },
      { x: -14, y: 9,   w: 11, h: 10, color: '#3a86c8' },
      { x: 10,  y: 9,   w: 11, h: 10, color: '#f2c744' }
    ];
    panos.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.roundRect(p.x, p.y, p.w, p.h, 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,.18)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    ctx.fillStyle = '#3d2a1e';
    ctx.beginPath();
    ctx.ellipse(0, -30, 11, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(0, -38, 6, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#c9c2b0';
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-8, -34); ctx.quadraticCurveTo(-18, -40, -14, -48);
    ctx.moveTo(8, -34); ctx.quadraticCurveTo(18, -40, 14, -48);
    ctx.stroke();
    ctx.fillStyle = '#ffd54f';
    ctx.beginPath();
    ctx.arc(-4, -31, 1.6, 0, Math.PI * 2);
    ctx.arc(4, -31, 1.6, 0, Math.PI * 2);
    ctx.fill();

    if(Math.random() > 0.55){
      ctx.fillStyle = '#ffd54f';
      ctx.beginPath();
      ctx.arc(-20 + Math.random()*40, -20 + Math.random()*20, 1.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawCarreta(b){
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(b.angle);
    ctx.fillStyle = '#5c3a21';
    ctx.fillRect(-18, -8, 36, 16);
    ctx.strokeStyle = '#2b1a0f';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(-10, 10, 6, 0, Math.PI * 2);
    ctx.arc(10, 10, 6, 0, Math.PI * 2);
    ctx.stroke();
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
    ctx.fillRect(-14, -2, 28, 14);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(-16 * dir, -2);
    ctx.lineTo(16 * dir, -2);
    ctx.lineTo(26 * dir, -20);
    ctx.lineTo(-6 * dir, -20);
    ctx.closePath();
    ctx.fill();

    const wares = ['#e63946', '#ffd54f', '#3a86c8'];
    wares.forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.roundRect(-10 + i * 8, -1, 6, 8, 1);
      ctx.fill();
    });
    ctx.restore();
  }

  function drawPersona(b){
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(b.angle);

    ctx.fillStyle = 'rgba(0,0,0,.2)';
    ctx.beginPath();
    ctx.ellipse(0, 18, 10, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#3a352f';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-3, 10); ctx.lineTo(-3, 18);
    ctx.moveTo(3, 10); ctx.lineTo(3, 18);
    ctx.stroke();

    ctx.fillStyle = b.outfitColor || '#3a86c8';
    ctx.beginPath();
    ctx.roundRect(-8, -6, 16, 18, 5);
    ctx.fill();

    ctx.fillStyle = '#e8b385';
    ctx.beginPath();
    ctx.arc(0, -12, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#2b2018';
    ctx.beginPath();
    ctx.arc(0, -15, 7.2, Math.PI, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawCohetillo(b){
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(b.angle);
    ctx.fillStyle = '#ffd54f';
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(5, 6);
    ctx.lineTo(-5, 6);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ff7043';
    ctx.beginPath();
    ctx.arc(0, -12, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function endRun(motivo){
    running = false;
    stopMusic();
    paused = false;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';

    const distanciaId = targetDistance <= 800 ? 'corta' : targetDistance <= 1600 ? 'media' : 'larga';
    const gameName = `torito-${gameDifficulty}-${distanciaId}`;
    const scoreFinal = Math.round(distance);

    let title, msg;
    if(motivo === 'completo') {
      title = jt('jue.card6.end.winTitle', '🏆 ¡Recorriste toda la calle!');
      msg = jt('jue.card6.end.winMsg', 'El torito llegó completo hasta el final de las fiestas. ¡Buena corrida!');
    } else {
      title = jt('jue.card6.end.tiredTitle', '🧨 ¡El torito se quedó sin cohetes!');
      msg = jt('jue.card6.end.tiredMsg', 'Recorriste <b>{n}m</b> antes de quedarte sin energía. ¡Cuidado con los puestos y la gente la próxima vez!').replace('{n}', scoreFinal);
    }

    showOverlay(`
      <span class="overlay-tag">${jt('jue.card6.end.tag', 'Fin de la Corrida')}</span>
      <h3>${title}</h3>
      <div class="overlay-score">${scoreFinal}m</div>
      <p>${msg}</p>
      <p class="overlay-best-score" id="t-best-score"></p>
      <button class="btn-primary" id="btn-restart-torito">${jt('jue.rematch', 'Revancha')}</button>
    `);
    document.getElementById('btn-restart-torito').onclick = showModeSelector;

    guardarPuntajeJuego(gameName, scoreFinal).then(() => {
      obtenerMejorPuntajeJuego(gameName).then((best) => {
        const el = document.getElementById('t-best-score');
        if (el && best) el.textContent = `${jt('jue.bestScore.distance', 'Tu récord de distancia')}: ${best.score}m`;
      });
    });
  }

  function showDistanceSelector() {
    showOverlay(`
      <span class="overlay-tag">${jt('jue.card2.configTag', 'Configuración')}</span>
      <h3>${jt('jue.card6.distance.title', '🐂 Elige el Recorrido')}</h3>
      <p>${jt('jue.card6.distance.sub', '¿Qué tan larga será la corrida por el pueblo?')}</p>
      <div class="difficulty-buttons" style="display: flex; flex-direction: column; gap: 10px;">
        <button class="btn-primary" id="dist-corta-torito">${jt('jue.card6.distCorta', 'Corta (800m)')}</button>
        <button class="btn-primary" id="dist-media-torito">${jt('jue.card6.distMedia', 'Media (1600m)')}</button>
        <button class="btn-primary" id="dist-larga-torito">${jt('jue.card6.distLarga', 'Larga (3000m)')}</button>
      </div>
    `);

    document.getElementById('dist-corta-torito').onclick = () => { selectDistance(800); };
    document.getElementById('dist-media-torito').onclick = () => { selectDistance(1600); };
    document.getElementById('dist-larga-torito').onclick = () => { selectDistance(3000); };
  }

  function selectDistance(dist) {
    targetDistance = dist;
    showDifficultySelector();
  }

  function showDifficultySelector() {
    showOverlay(`
      <span class="overlay-tag">${jt('jue.diff.tag', 'Dificultad')}</span>
      <h3>${jt('jue.card6.diff.title', '🎮 Selecciona Nivel')}</h3>
      <p>${jt('jue.card6.diff.sub', 'Elegí qué tan seguido aparecen puestos y gente en la calle.')}</p>
      <div class="difficulty-buttons">
        <button class="difficulty-btn easy" id="btn-easy-torito">
          ${jt('jue.diff.easy', '🟢 Fácil')}
          <div class="difficulty-desc">${jt('jue.card6.diff.easyDesc', 'Calle más despejada')}</div>
        </button>
        <button class="difficulty-btn hard" id="btn-hard-torito">
          ${jt('jue.diff.hard', '🔴 Difícil')}
          <div class="difficulty-desc">${jt('jue.card6.diff.hardDesc', 'Calle llena de gente y puestos')}</div>
        </button>
      </div>`);

    document.getElementById('btn-easy-torito').onclick = () => { startGame('easy'); };
    document.getElementById('btn-hard-torito').onclick = () => { startGame('hard'); };
  }

  function startGame(difficulty) {
    gameDifficulty = difficulty;
    resetGame();
    hideOverlay();

    running = true;
    paused = false;
    playMusic();

    rafId = requestAnimationFrame(step);
  }

  function showModeSelector() {
    showOverlay(`
      <span class="overlay-tag">${jt('jue.card6.prepareTag', 'Prepará el Torito')}</span>
      <h2>🐂 ${jt('jue.card6.titleModal', 'Torito Pinto')}</h2>
      <p>${jt('jue.card6.intro', 'Corré con el torito de cohetes por la calle empedrada del pueblo. Esquivá puestos, carretas y gente comprando, y recogé cohetillos para no quedarte sin energía.')}</p>
      <p class="rules-title">${jt('jue.controls.title', 'Controles')}</p>
      <ul class="rules-list">
        <li class="rule-good"><span class="rule-icon">🎮</span> ${jt('jue.card6.controlsLane', '<strong>A</strong>/<strong>D</strong> o flechas ⬅️➡️ (o toca la pantalla): cambiar de carril.')}</li>
        <li class="rule-good"><span class="rule-icon">🧨</span> ${jt('jue.card6.controlsCohete', 'Recogé cohetillos para recuperar energía.')}</li>
        <li class="rule-bad"><span class="rule-icon">⚠️</span> ${jt('jue.card6.controlsObstacle', 'Chocar con puestos, carretas o gente te quita energía.')}</li>
      </ul>
      <button class="btn-primary" id="btn-start-torito">${jt('jue.next', 'Siguiente')}</button>
    `);
    document.getElementById('btn-start-torito').onclick = showDistanceSelector;
  }

  // Eventos y pausa
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
    bgMusic?.pause();
    canvasWrap?.classList.add('is-paused');
    pauseOverlay?.classList.remove('hidden');
    if(pauseIcon) pauseIcon.textContent = '▶️';
  }

  function resumeGame() {
    if(!paused) return;
    paused = false;
    running = true;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    bgMusic?.play().catch(()=>{});
    rafId = requestAnimationFrame(step);
  }

  function returnToMenu() {
    running = false;
    paused = false;
    cancelAnimationFrame(rafId);
    bgMusic?.pause();
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
      else if(running) rafId = requestAnimationFrame(step);
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
  window.addEventListener('DOMContentLoaded', () => {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 1. Entrada del Hero
    tl.fromTo(".hero-fade", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
    );

    // 2. Fondos ambientales
    tl.fromTo(".ambient-blob",
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 0.4, duration: 1.5, stagger: 0.3 },
      "-=0.6"
    );

    // 3. Entrada de las tarjetas (Animamos la tarjeta completa, no el emoji)
    tl.fromTo(".reveal-grid .game-card",
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.2, ease: "back.out(1)" },
      "-=0.8"
    );

    // 4. Animación de hover en boton (solo si no es móvil)
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
  });
})();