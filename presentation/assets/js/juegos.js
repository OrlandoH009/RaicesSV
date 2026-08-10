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
    return (val && val !== key) ? val : fallback;
  }
  return fallback;
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
  engine.gravity.y = 0.6;
  const world = engine.world;

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
  let volume = Number(volumeSlider?.value || 0.3);
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
    rafId = requestAnimationFrame(step);
  }

  function returnToMenu(){
    running = false;
    paused = false;
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
    const isBad = Math.random() < 0.32;
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

  document.addEventListener('fullscreenchange', () => setTimeout(resizeCanvas, 100));
  document.addEventListener('webkitfullscreenchange', () => setTimeout(resizeCanvas, 100));

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
    body: Bodies.circle(150, 240, 24, { restitution: 0.85, friction: 0.02, frictionAir: 0.008, label: 'trompo1' }),
    energy: 100,
    maxEnergy: 100,
    angle: 0,
    color: '#D4A373'
  };
  
  const bottom = {
    body: Bodies.circle(550, 240, 24, { restitution: 0.85, friction: 0.02, frictionAir: 0.008, label: 'trompo2' }),
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

  function step(timestamp){
    if(!running || !isGameVisible) return;

    Engine.update(engine, 1000/60);

    const moveX1 = (keys['d'] ? 1 : 0) - (keys['a'] ? 1 : 0);
    const moveY1 = (keys['s'] ? 1 : 0) - (keys['w'] ? 1 : 0);
    if(moveX1 !== 0 || moveY1 !== 0){
      Body.setVelocity(top.body, { x: moveX1 * 4, y: moveY1 * 4 });
    }
    
    if(gameMode === 'pvp'){
      const moveX2 = (keys['arrowright'] ? 1 : 0) - (keys['arrowleft'] ? 1 : 0);
      const moveY2 = (keys['arrowdown'] ? 1 : 0) - (keys['arrowup'] ? 1 : 0);
      if(moveX2 !== 0 || moveY2 !== 0){
        Body.setVelocity(bottom.body, { x: moveX2 * 4, y: moveY2 * 4 });
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
    rafId = requestAnimationFrame(step);
  }

  function returnToMenu(){
    running = false;
    paused = false;
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

  if(hasGsap){
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
    if (hasGsap && content) {
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

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const gameId = btn.dataset.openModal;
      const modal = document.getElementById(`modal-${gameId}`);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        const content = modal.querySelector('.game-modal__content');
        if(hasGsap && content){
          gsap.set(modal, { autoAlpha: 1 });
          gsap.fromTo(content,
            { scale: 0.85, y: 24, autoAlpha: 0 },
            { scale: 1, y: 0, autoAlpha: 1, duration: 0.5, ease: 'back.out(1.6)' }
          );
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
    btn.addEventListener('click', () => {
      const gameId = btn.dataset.closeModal;
      closeModal(gameId);
    });
  });

  document.querySelectorAll('.game-modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        const gameId = modal.id.replace('modal-', '');
        closeModal(gameId);
      }
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

  let botDifficulty = 'easy';
  let targetDistance = 2000;

  let player = { x: 0, y: 0, speed: 0, maxSpeed: 8, lane: 1, targetX: 0, distance: 0, passengers: 0 };
  let bot = { x: 0, y: 0, speed: 0, maxSpeed: 5.5, lane: 2, targetX: 0, distance: 0 };

  const lanesCount = 4;
  let laneWidth = 0;
  let roadY = 0;
  const lanePositions = [];

  let passengers = [];

  const engine = Engine.create();
  engine.gravity.y = 0;
  const world = engine.world;

  let wallLeft = Bodies.rectangle(-10, 0, 20, 10, { isStatic: true, label: 'wall' });
  let wallRight = Bodies.rectangle(-10, 0, 20, 10, { isStatic: true, label: 'wall' });
  World.add(world, [wallLeft, wallRight]);

  const playerBody = Bodies.rectangle(0, 0, 26, 60, { isStatic: true, label: 'busPlayer' });
  const botBody = Bodies.rectangle(0, 0, 26, 60, { isStatic: true, label: 'busBot' });
  World.add(world, [playerBody, botBody]);

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

  function moveLane(direction) {
    let nextLane = player.lane + direction;
    if(nextLane >= 0 && nextLane < lanesCount) {
      player.lane = nextLane;
    }
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

    if(pProg) pProg.style.width = Math.min(100, (player.distance / targetDistance) * 100) + '%';
    if(bProg) bProg.style.width = Math.min(100, (bot.distance / targetDistance) * 100) + '%';
    if(pDist) pDist.textContent = Math.round(player.distance) + 'm / ' + targetDistance + 'm';
    if(bDist) bDist.textContent = Math.round(bot.distance) + 'm';
    if(pPass) pPass.textContent = player.passengers;
  }

  const bgMusic = document.getElementById('bgMusic-coasters');
  const volumeSlider = document.getElementById('volumeSlider-coasters');
  const volumeIcon = document.getElementById('volumeIcon-coasters');
  const damageOverlay = document.getElementById('damageOverlay-coasters');
  let volume = Number(volumeSlider?.value || 0.45);
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
      bot.maxSpeed = 5.5;
    } else if (botDifficulty === 'medium') {
      bot.maxSpeed = 7.2;
    } else {
      bot.maxSpeed = 8.8;
    }

    passengers = [];
    roadY = 0;

    Composite.allBodies(world).forEach(b => {
      if(b.label === 'bache' || b.label === 'tumulo' || b.label === 'traffic') World.remove(world, b);
    });

    Body.setPosition(playerBody, { x: player.x, y: player.y });
    Body.setPosition(botBody, { x: bot.x, y: bot.y });
  }

  function spawnBache(){
    const lane = Math.floor(Math.random() * lanesCount);
    const body = Bodies.circle(lanePositions[lane], -50, 16, {
      restitution: 0.3, friction: 0.5, frictionAir: 0.012, label: 'bache'
    });
    World.add(world, body);
  }

  function spawnTumulo(){
    const lane = Math.floor(Math.random() * lanesCount);
    const body = Bodies.rectangle(lanePositions[lane], -50, 44, 10, {
      restitution: 0.3, friction: 0.5, frictionAir: 0.012, label: 'tumulo'
    });
    World.add(world, body);
  }

  function spawnTraffic(){
    const lane = Math.floor(Math.random() * lanesCount);
    const color = ['#3a86c8', '#f89e1b', '#3ae080'][Math.floor(Math.random()*3)];
    const body = Bodies.rectangle(lanePositions[lane], -100, 24, 44, {
      restitution: 0.4, friction: 0.4, frictionAir: 0.01, label: 'traffic'
    });
    body.trafficColor = color;
    body.trafficSpeed = 2 + Math.random() * 2;
    World.add(world, body);
  }

  function countBodies(label){
    return Composite.allBodies(world).filter(b => b.label === label).length;
  }

function spawnEntities() {
    if(Math.random() < 0.005 && (countBodies('bache') + countBodies('tumulo')) < 5) {
      if(Math.random() > 0.5) spawnBache(); else spawnTumulo();
    }

    if(Math.random() < 0.015 && passengers.length < 4) {
      passengers.push({
        x: Math.random() > 0.5 ? 15 : canvas.width - 15,
        y: -50,
        collected: false
      });
    }

    if(Math.random() < 0.003 && countBodies('traffic') < 2) {
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

      const kickX = (Math.random() - 0.5) * 0.05;
      Body.applyForce(obstacle, obstacle.position, { x: kickX, y: -0.015 });
      Body.setAngularVelocity(obstacle, (Math.random() - 0.5) * 0.45);

      const isTraffic = obstacle.label === 'traffic';
      if(busHit === playerBody) {
        player.speed = isTraffic ? 1.5 : Math.max(1, player.speed - 3);
        flashDamage();
      } else {
        bot.speed = isTraffic ? 1.5 : Math.max(1, bot.speed - 2.5);
      }
    }
  });

 function step(timestamp){
    if(!running || !isGameVisible) return;

    const speedMultiplier = player.speed;
    const visualSpeed = speedMultiplier * 0.5;

    roadY += visualSpeed;
    player.distance += speedMultiplier * 0.1;
    bot.distance += bot.speed * 0.1;

    spawnEntities();

    if(keys['w'] || keys['arrowup']) {
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

    Body.setPosition(playerBody, { x: player.x, y: player.y });
    Body.setPosition(botBody, { x: bot.x, y: bot.y });

    Composite.allBodies(world).forEach(b => {
      if(b.label === 'bache' || b.label === 'tumulo') {
        Body.setVelocity(b, { x: b.velocity.x * 0.96, y: visualSpeed });
        if(b.position.y > canvas.height + 60) World.remove(world, b);
      } else if(b.label === 'traffic') {
        Body.setVelocity(b, { x: b.velocity.x * 0.96, y: visualSpeed - (b.trafficSpeed * 0.5) });
        if(b.position.y > canvas.height + 60 || b.position.y < -250) World.remove(world, b);
      }
    });

    passengers.forEach((p, idx) => {
      p.y += visualSpeed;
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

    Engine.update(engine, 16.667);

    if(player.distance >= targetDistance) {
      endRace('player');
      return;
    } else if(bot.distance >= targetDistance) {
      endRace('bot');
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawRoad();

    Composite.allBodies(world).forEach(b => {
      if(b.label === 'bache') drawBache(b);
      else if(b.label === 'tumulo') drawTumulo(b);
      else if(b.label === 'traffic') drawTrafficCar(b);
    });
    passengers.forEach(drawPassenger);

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

  function drawBache(b) {
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(b.angle);
    ctx.fillStyle = '#222222';
    ctx.beginPath();
    ctx.ellipse(0, 0, 18, 10, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }

  function drawTumulo(b) {
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(b.angle);
    ctx.fillStyle = '#ffb300';
    ctx.fillRect(-22, -4, 44, 8);
    ctx.fillStyle = '#000000';
    for(let i = -18; i <= 18; i += 10) {
      ctx.fillRect(i, -4, 4, 8);
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

  function drawTrafficCar(b) {
    ctx.save();
    ctx.translate(b.position.x, b.position.y);
    ctx.rotate(b.angle);
    ctx.fillStyle = b.trafficColor || '#3a86c8';
    ctx.beginPath();
    ctx.roundRect(-12, -22, 24, 44, 3);
    ctx.fill();
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
  }

  function resumeGame() {
    if(!paused) return;
    paused = false;
    running = true;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    if (bgMusic) {
      bgMusic.volume = savedVolume || volume;
      if (volume > 0) bgMusic.play().catch(()=>{});
    }
    rafId = requestAnimationFrame(step);
  }

  function returnToMenu() {
    running = false;
    paused = false;
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
   JUEGO 4: ESCONDELERO (CON MATTER.JS, FONDO DE CIUDAD Y NIÑOS BONITOS)
--------------------------------------------------------- */
(function initGameEncantados() {
  const canvas = document.getElementById('canvas-encantados');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const hud = document.getElementById('hud-encantados');
  const overlay = document.getElementById('overlay-encantados');
  const overlayCard = document.getElementById('overlay-card-encantados');
  const gameContent = document.getElementById('modal-encantados');
  const canvasWrap = document.getElementById('encantados-canvas-wrap');

  const { Engine, World, Bodies, Body, Events } = Matter;

  let isGameVisible = false;
  let running = false;
  let paused = false;
  let rafId = null;
  let lastTime = null;

  let baseWidth = 0,
    baseHeight = 0;

  function resizeCanvas() {
    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
    if (isFS && baseWidth && baseHeight) {
      canvas.width = baseWidth;
      canvas.height = baseHeight;
      return;
    }
    const wrap = canvasWrap || canvas.closest('.canvas-wrap');
    const rect = wrap ? wrap.getBoundingClientRect() : canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    baseWidth = canvas.width;
    baseHeight = canvas.height;
  }
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

  let gameConfig = {
    easy: { kidsToWin: 6, escapeMin: 2200, escapeMax: 3600, fleeSpeed: 2.6, catcherSpeed: 4, maxEscapes: 5, timeLimit: 45 },
    medium: { kidsToWin: 8, escapeMin: 1700, escapeMax: 2800, fleeSpeed: 3.3, catcherSpeed: 5, maxEscapes: 4, timeLimit: 42 },
    hard: { kidsToWin: 10, escapeMin: 1200, escapeMax: 2200, fleeSpeed: 4.0, catcherSpeed: 6, maxEscapes: 3, timeLimit: 38 }
  };
  let difficulty = 'easy';

  let score = 0,
    caught = 0,
    escaped = 0,
    timeLeft = 0;
  let nextEscapeIn = 0,
    escapeAccum = 0;

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
      <b id="e-escaped">0/${gameConfig.easy.maxEscapes}</b>
    </div>
    <div class="hud-item">
      <span>${jt('jue.hud.time', 'Tiempo')}</span>
      <b id="e-time">-</b>
    </div>`;

  function renderDots() {
    const dotsEl = document.getElementById('e-dots');
    if (!dotsEl) return;
    const total = gameConfig[difficulty].kidsToWin;
    let html = '';
    for (let i = 0; i < total; i++) {
      html += `<span class="dot${i < caught ? ' found' : ''}"></span>`;
    }
    dotsEl.innerHTML = html;
  }

  function updateHud() {
    const scoreEl = document.getElementById('e-score');
    const escapedEl = document.getElementById('e-escaped');
    const timeEl = document.getElementById('e-time');
    if (scoreEl) scoreEl.textContent = score;
    if (escapedEl) escapedEl.textContent = `${escaped}/${gameConfig[difficulty].maxEscapes}`;
    if (timeEl) timeEl.textContent = Math.max(0, Math.ceil(timeLeft));
    renderDots();
  }

  const engine = Engine.create();
  engine.gravity.y = 0;
  const world = engine.world;

  const wallThickness = 40;
  let walls = [];

  function setupWalls() {
    if (walls.length) World.remove(world, walls);
    const w = canvas.width,
      h = canvas.height;
    walls = [
      Bodies.rectangle(w / 2, -wallThickness / 2, w + wallThickness * 2, wallThickness, { isStatic: true, label: 'wall' }),
      Bodies.rectangle(w / 2, h + wallThickness / 2, w + wallThickness * 2, wallThickness, { isStatic: true, label: 'wall' }),
      Bodies.rectangle(-wallThickness / 2, h / 2, wallThickness, h + wallThickness * 2, { isStatic: true, label: 'wall' }),
      Bodies.rectangle(w + wallThickness / 2, h / 2, wallThickness, h + wallThickness * 2, { isStatic: true, label: 'wall' })
    ];
    World.add(world, walls);
  }

  const catcherRadius = 24;
  const kidRadius = 18;
  const boteRadius = 38;

  const bote = Bodies.circle(canvas.width / 2, 70, boteRadius, { isStatic: true, label: 'bote', friction: 0.1 });
  World.add(world, bote);

  const catcher = Bodies.circle(canvas.width / 2, canvas.height - 100, catcherRadius, {
    label: 'catcher',
    friction: 0.05,
    frictionAir: 0.02,
    restitution: 0.5
  });
  World.add(world, catcher);

  let kids = [];
  let hideSpots = [];

  function createHideSpots() {
    const count = 10;
    const cols = 5;
    const rows = Math.ceil(count / cols);
    const marginX = canvas.width * 0.08;
    const marginY = canvas.height * 0.25;
    const usableW = canvas.width - marginX * 2;
    const usableH = canvas.height - marginY * 2 - 60;
    const cellW = usableW / cols;
    const cellH = usableH / rows;

    const spots = [];
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (i >= count) break;
        const jitterX = (Math.random() - 0.5) * cellW * 0.3;
        const jitterY = (Math.random() - 0.5) * cellH * 0.3;
        spots.push({
          x: marginX + c * cellW + cellW / 2 + jitterX,
          y: marginY + 40 + r * cellH + cellH / 2 + jitterY,
        });
        i++;
      }
    }
    return spots;
  }

  function initKids() {
    kids.forEach(k => World.remove(world, k.body));
    kids = [];
    hideSpots = createHideSpots();
    const colors = ['#e63946', '#3a86c8', '#2fbf9f', '#f2c744', '#7d3ac1', '#f4a261', '#e76f51', '#a8dadc', '#457b9d', '#1d3557'];
    hideSpots.forEach((spot, idx) => {
      const body = Bodies.circle(spot.x, spot.y, kidRadius, {
        label: 'kid',
        friction: 0.1,
        restitution: 0.3,
        frictionAir: 0.01,
        isSensor: false,
        state: 'hidden',
        color: colors[idx % colors.length],
        spotIndex: idx
      });
      World.add(world, body);
      kids.push({
        body: body,
        state: 'hidden',
        color: colors[idx % colors.length],
        spotIndex: idx
      });
    });
  }

  let keys = {};
  window.addEventListener('keydown', e => { keys[e.key.toLowerCase()] = true; });
  window.addEventListener('keyup', e => { keys[e.key.toLowerCase()] = false; });

  const bgMusic = document.getElementById('bgMusic-encantados');
  const volumeSlider = document.getElementById('volumeSlider-encantados');
  const volumeIcon = document.getElementById('volumeIcon-encantados');
  const damageOverlay = document.getElementById('damageOverlay-encantados');
  let volume = Number(volumeSlider?.value || 0.45);
  let savedVolume = volume;

  if (bgMusic) { bgMusic.volume = volume;
    bgMusic.muted = false; }
  volumeSlider?.addEventListener('input', (event) => {
    volume = Number(event.target.value);
    if (bgMusic) { bgMusic.volume = volume;
      bgMusic.muted = volume <= 0; }
    if (volumeIcon) volumeIcon.textContent = volume <= 0 ? '🔇' : volume < 0.35 ? '🔉' : '🔊';
  });

  function playMusic() { if (!bgMusic) return;
    bgMusic.muted = false;
    bgMusic.volume = volume;
    bgMusic.play().catch(() => {}); }

  function stopMusic() { if (bgMusic) { bgMusic.pause();
      bgMusic.currentTime = 0; } }

  function showOverlay(html) {
    overlayCard.innerHTML = html;
    overlay.classList.remove('hidden');
    overlay.style.backdropFilter = 'none';
    overlay.style.webkitBackdropFilter = 'none';
    if (window.gsap) {
      gsap.fromTo(overlayCard, { autoAlpha: 0, y: 18, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.5)' });
      gsap.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: 'power1.out' });
    }
  }

  function hideOverlay() {
    if (window.gsap) {
      overlay.style.pointerEvents = 'none';
      gsap.to(overlayCard, { autoAlpha: 0, y: -12, scale: 0.97, duration: 0.25, ease: 'power1.in' });
      gsap.to(overlay, { autoAlpha: 0, duration: 0.25, ease: 'power1.in', onComplete: () => { overlay.classList.add('hidden');
          overlay.style.pointerEvents = ''; } });
    } else {
      overlay.classList.add('hidden');
    }
  }

  function randomEscapeInterval() {
    const config = gameConfig[difficulty];
    return config.escapeMin + Math.random() * (config.escapeMax - config.escapeMin);
  }

  function triggerEscape() {
    const hiddenKids = kids.filter(k => k.state === 'hidden');
    if (!hiddenKids.length) return;
    const kid = hiddenKids[Math.floor(Math.random() * hiddenKids.length)];
    kid.state = 'fleeing';
    const angle = Math.random() * Math.PI * 2;
    Body.setVelocity(kid.body, {
      x: Math.cos(angle) * 0.5,
      y: -0.5
    });
  }

  Events.on(engine, 'collisionStart', (event) => {
    for (const pair of event.pairs) {
      const { bodyA, bodyB } = pair;
      if ((bodyA.label === 'catcher' && bodyB.label === 'kid') || (bodyA.label === 'kid' && bodyB.label === 'catcher')) {
        const kidBody = bodyA.label === 'kid' ? bodyA : bodyB;
        const kid = kids.find(k => k.body === kidBody);
        if (kid && kid.state === 'fleeing') {
          kid.state = 'caught';
          caught++;
          score += 25;
          flashEffect(kidBody.position.x, kidBody.position.y, '#ffd700');
          World.remove(world, kidBody);
          updateHud();
        }
      }
      if ((bodyA.label === 'bote' && bodyB.label === 'kid') || (bodyA.label === 'kid' && bodyB.label === 'bote')) {
        const kidBody = bodyA.label === 'kid' ? bodyA : bodyB;
        const kid = kids.find(k => k.body === kidBody);
        if (kid && kid.state === 'fleeing') {
          kid.state = 'escaped';
          escaped++;
          score = Math.max(0, score - 10);
          flashEffect(kidBody.position.x, kidBody.position.y, '#ff4444');
          World.remove(world, kidBody);
          updateHud();
        }
      }
    }
  });

  let particles = [];

  function flashEffect(x, y, color) {
    for (let i = 0; i < 12; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 4;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.5,
        radius: 3 + Math.random() * 6,
        life: 1,
        color: color
      });
    }
  }

  // --- FONDO DE CIUDAD ---
  let cityOffset = 0;
  let cars = [];

  function initCars() {
    cars = [];
    for (let i = 0; i < 6; i++) {
      cars.push({
        x: Math.random() * canvas.width,
        y: canvas.height * 0.55 + Math.random() * 30,
        speed: 0.5 + Math.random() * 1.5,
        color: ['#e63946', '#3a86c8', '#f4a261', '#2fbf9f', '#e9c46a', '#9b5de5'][Math.floor(Math.random() * 6)],
        size: 12 + Math.random() * 10,
        dir: Math.random() > 0.5 ? 1 : -1
      });
    }
  }
  initCars();

  function drawCityBackground() {
    const w = canvas.width,
      h = canvas.height;

    const skyGrad = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    skyGrad.addColorStop(0, '#1a237e');
    skyGrad.addColorStop(0.4, '#4a148c');
    skyGrad.addColorStop(0.7, '#e65100');
    skyGrad.addColorStop(1, '#ffb300');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h * 0.6);

    const buildings = [
      { x: 0, w: 60, h: 100, color: '#3e2723' },
      { x: 70, w: 45, h: 140, color: '#4e342e' },
      { x: 125, w: 70, h: 80, color: '#5d4037' },
      { x: 205, w: 50, h: 160, color: '#3e2723' },
      { x: 265, w: 80, h: 110, color: '#4e342e' },
      { x: 355, w: 55, h: 130, color: '#5d4037' },
      { x: 420, w: 65, h: 90, color: '#3e2723' },
      { x: 495, w: 50, h: 150, color: '#4e342e' },
      { x: 555, w: 70, h: 100, color: '#5d4037' },
      { x: 635, w: 60, h: 120, color: '#3e2723' },
      { x: 705, w: 45, h: 80, color: '#4e342e' },
      { x: 760, w: 80, h: 140, color: '#5d4037' },
    ];

    buildings.forEach(b => {
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x, h * 0.6 - b.h, b.w, b.h);
      ctx.fillStyle = '#ffd54f';
      for (let row = 0; row < Math.floor(b.h / 25); row++) {
        for (let col = 0; col < Math.floor(b.w / 20); col++) {
          if (Math.random() > 0.3) {
            ctx.fillRect(b.x + 5 + col * 20, h * 0.6 - b.h + 10 + row * 25, 8, 12);
          }
        }
      }
    });

    ctx.fillStyle = '#424242';
    ctx.fillRect(0, h * 0.6, w, h * 0.4);

    ctx.strokeStyle = '#ffeb3b';
    ctx.lineWidth = 4;
    ctx.setLineDash([30, 20]);
    cityOffset = (cityOffset + 1.5) % 50;
    ctx.lineDashOffset = -cityOffset;
    ctx.beginPath();
    ctx.moveTo(0, h * 0.7);
    ctx.lineTo(w, h * 0.7);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#9e9e9e';
    ctx.fillRect(0, h * 0.6 - 6, w, 8);
    ctx.fillRect(0, h * 0.85, w, 8);

    for (let x = 50; x < w; x += 120) {
      ctx.fillStyle = '#616161';
      ctx.fillRect(x, h * 0.6 - 60, 4, 60);
      ctx.fillStyle = '#ffd54f';
      ctx.beginPath();
      ctx.arc(x + 2, h * 0.6 - 62, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffecb3';
      ctx.beginPath();
      ctx.arc(x + 2, h * 0.6 - 62, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    for (let x = 30; x < w; x += 150) {
      ctx.fillStyle = '#5d4037';
      ctx.fillRect(x - 3, h * 0.6 - 30, 6, 30);
      ctx.fillStyle = '#2e7d32';
      ctx.beginPath();
      ctx.arc(x, h * 0.6 - 40, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#388e3c';
      ctx.beginPath();
      ctx.arc(x - 6, h * 0.6 - 44, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(x + 6, h * 0.6 - 44, 12, 0, Math.PI * 2);
      ctx.fill();
    }

    cars.forEach(car => {
      car.x += car.speed * car.dir;
      if (car.x > w + 20) car.x = -20;
      if (car.x < -20) car.x = w + 20;
      ctx.fillStyle = car.color;
      ctx.beginPath();
      ctx.roundRect(car.x, car.y - car.size / 2, car.size * 1.8, car.size, 4);
      ctx.fill();
      ctx.fillStyle = '#212121';
      ctx.beginPath();
      ctx.roundRect(car.x + car.size * 0.2, car.y - car.size / 2 - 3, car.size * 0.3, car.size * 0.3, 2);
      ctx.fill();
      ctx.beginPath();
      ctx.roundRect(car.x + car.size * 1.0, car.y - car.size / 2 - 3, car.size * 0.3, car.size * 0.3, 2);
      ctx.fill();
    });
  }

  function drawCatcher(body) {
    const x = body.position.x,
      y = body.position.y;
    ctx.save();
    ctx.translate(x, y);

    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;

    ctx.shadowBlur = 0;
    ctx.fillStyle = '#2196F3';
    ctx.beginPath();
    ctx.roundRect(-14, -20, 28, 30, 6);
    ctx.fill();

    ctx.fillStyle = '#FFCCBC';
    ctx.beginPath();
    ctx.arc(0, -26, 16, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(-6, -30, 5, 0, Math.PI * 2);
    ctx.arc(6, -30, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1a237e';
    ctx.beginPath();
    ctx.arc(-6, -30, 3, 0, Math.PI * 2);
    ctx.arc(6, -30, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(-4, -32, 1.5, 0, Math.PI * 2);
    ctx.arc(8, -32, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255,150,150,0.5)';
    ctx.beginPath();
    ctx.ellipse(-12, -22, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(12, -22, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#212121';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, -20, 6, 0.1, Math.PI - 0.1);
    ctx.stroke();

    ctx.fillStyle = '#5D4037';
    ctx.beginPath();
    ctx.arc(0, -34, 16, Math.PI, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#4E342E';
    ctx.beginPath();
    ctx.arc(-6, -38, 6, 0, Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(6, -38, 6, 0, Math.PI);
    ctx.fill();

    ctx.strokeStyle = '#FFCCBC';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-14, -8);
    ctx.lineTo(-24, 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(14, -8);
    ctx.lineTo(24, 2);
    ctx.stroke();

    ctx.strokeStyle = '#795548';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(24, 2, 12, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(18, 2);
    ctx.lineTo(30, 2);
    ctx.moveTo(24, -4);
    ctx.lineTo(24, 8);
    ctx.stroke();

    ctx.restore();
  }

  function drawKid(body, color, state) {
    const x = body.position.x,
      y = body.position.y;
    ctx.save();
    ctx.translate(x, y);

    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 0;

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(-12, -8, 24, 20, 4);
    ctx.fill();

    ctx.fillStyle = '#FFCCBC';
    ctx.beginPath();
    ctx.arc(0, -16, 12, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(-4, -18, 4, 0, Math.PI * 2);
    ctx.arc(4, -18, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#1a237e';
    ctx.beginPath();
    ctx.arc(-4, -18, 2.5, 0, Math.PI * 2);
    ctx.arc(4, -18, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(-3, -19, 1, 0, Math.PI * 2);
    ctx.arc(5, -19, 1, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255,150,150,0.5)';
    ctx.beginPath();
    ctx.ellipse(-8, -14, 3, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(8, -14, 3, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#212121';
    ctx.lineWidth = 1.5;
    if (state === 'fleeing') {
      ctx.beginPath();
      ctx.arc(0, -12, 5, 0.1, Math.PI - 0.1);
      ctx.stroke();
      ctx.fillStyle = 'white';
      ctx.fillRect(-3, -8, 2, 2);
      ctx.fillRect(1, -8, 2, 2);
    } else {
      ctx.beginPath();
      ctx.arc(0, -12, 3.5, 0.1, Math.PI - 0.1);
      ctx.stroke();
    }

    ctx.fillStyle = '#5D4037';
    ctx.beginPath();
    ctx.arc(0, -24, 12, Math.PI, 2 * Math.PI);
    ctx.fill();

    ctx.strokeStyle = '#FFCCBC';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-6, 12);
    ctx.lineTo(-8, 22);
    ctx.moveTo(6, 12);
    ctx.lineTo(8, 22);
    ctx.stroke();
    ctx.fillStyle = '#37474f';
    ctx.beginPath();
    ctx.ellipse(-8, 23, 5, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(8, 23, 5, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    if (state === 'fleeing') {
      ctx.strokeStyle = 'rgba(255,200,0,0.4)';
      ctx.lineWidth = 2;
      for (let i = 0; i < 4; i++) {
        const lx = -22 - i * 6;
        const ly = -4 + i * 4;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(lx - 10, ly - 5);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  function drawBote(body) {
    const x = body.position.x,
      y = body.position.y;
    ctx.save();
    ctx.translate(x, y);

    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 4;
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#8D6E63';
    ctx.beginPath();
    ctx.ellipse(0, 0, boteRadius, boteRadius * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#4E342E';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.strokeStyle = '#4E342E';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(0, -6, boteRadius * 0.85, boteRadius * 0.35, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, 6, boteRadius * 0.85, boteRadius * 0.35, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#A1887F';
    ctx.beginPath();
    ctx.ellipse(0, -boteRadius * 0.5, boteRadius * 0.5, boteRadius * 0.2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#4E342E';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#FFD54F';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('¡BOTE!', 0, 4);

    ctx.restore();
  }

  function step(timestamp) {
    if (!running || !isGameVisible) return;
    if (lastTime === null) lastTime = timestamp;
    const dt = Math.min(Math.max(timestamp - lastTime, 1), 100);
    lastTime = timestamp;
    const dtSec = dt / 1000;

    const config = gameConfig[difficulty];
    timeLeft -= dtSec;

    let moveX = (keys['d'] || keys['arrowright'] ? 1 : 0) - (keys['a'] || keys['arrowleft'] ? 1 : 0);
    let moveY = (keys['s'] || keys['arrowdown'] ? 1 : 0) - (keys['w'] || keys['arrowup'] ? 1 : 0);
    if (moveX !== 0 || moveY !== 0) {
      const len = Math.hypot(moveX, moveY) || 1;
      Body.setVelocity(catcher, {
        x: (moveX / len) * config.catcherSpeed,
        y: (moveY / len) * config.catcherSpeed
      });
    } else {
      Body.setVelocity(catcher, {
        x: catcher.velocity.x * 0.92,
        y: catcher.velocity.y * 0.92
      });
    }

    const maxSpeed = config.catcherSpeed * 1.2;
    const v = catcher.velocity;
    const speed = Math.hypot(v.x, v.y);
    if (speed > maxSpeed) {
      Body.setVelocity(catcher, {
        x: (v.x / speed) * maxSpeed,
        y: (v.y / speed) * maxSpeed
      });
    }

    escapeAccum += dt;
    if (escapeAccum >= nextEscapeIn) {
      escapeAccum = 0;
      nextEscapeIn = randomEscapeInterval();
      triggerEscape();
    }

    for (const kid of kids) {
      if (kid.state !== 'fleeing') continue;
      const dx = bote.position.x - kid.body.position.x;
      const dy = bote.position.y - kid.body.position.y;
      const dist = Math.hypot(dx, dy);
      if (dist > 5) {
        const speed = config.fleeSpeed * (0.8 + Math.random() * 0.4);
        Body.setVelocity(kid.body, {
          x: (dx / dist) * speed,
          y: (dy / dist) * speed
        });
      }
    }

    Engine.update(engine, dt);

    if (caught >= config.kidsToWin) { endGame(true); return; }
    if (escaped >= config.maxEscapes) { endGame(false); return; }
    if (timeLeft <= 0) { endGame(caught >= Math.ceil(config.kidsToWin * 0.6)); return; }

    updateHud();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawCityBackground();

    for (const spot of hideSpots) {
      ctx.save();
      ctx.translate(spot.x, spot.y);
      ctx.fillStyle = '#2e7d32';
      ctx.beginPath();
      ctx.arc(0, 10, 20, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#388e3c';
      ctx.beginPath();
      ctx.arc(-10, 14, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(10, 14, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    drawBote(bote);

    for (const kid of kids) {
      if (kid.state === 'hidden' || kid.state === 'caught' || kid.state === 'escaped') continue;
      drawKid(kid.body, kid.color, kid.state);
    }

    drawCatcher(catcher);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.life -= 0.015;
      p.radius *= 0.98;
      if (p.life <= 0 || p.radius < 0.5) {
        particles.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    rafId = requestAnimationFrame(step);
  }

  function endGame(win) {
    running = false;
    paused = false;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if (pauseIcon) pauseIcon.textContent = '⏸️';

    let title = win ? jt('jue.card4.end.win', '🏆 ¡Los atrapaste a todos antes del bote!') :
      (timeLeft <= 0 ? jt('jue.card4.end.timeUp', '⏰ ¡Se acabó el tiempo!') :
        jt('jue.card4.end.tooMany', '🏁 ¡Se te escaparon demasiados!'));
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
    if (bgMusic) { savedVolume = bgMusic.volume;
      bgMusic.volume = 0.1; }
    canvasWrap?.classList.add('is-paused');
    pauseOverlay?.classList.remove('hidden');
    if (pauseIcon) pauseIcon.textContent = '▶️';
  }

  function resumeGame() {
    if (!paused) return;
    paused = false;
    running = true;
    lastTime = null;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if (pauseIcon) pauseIcon.textContent = '⏸️';
    if (bgMusic) { bgMusic.volume = savedVolume || volume; if (volume > 0) bgMusic.play().catch(() => {}); }
    rafId = requestAnimationFrame(step);
  }

  function returnToMenu(){
    running = false;
    paused = false;
    cancelAnimationFrame(rafId);
    // stopMusic();  // ELIMINADO
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    showModeSelector();
  }

  pauseBtn?.addEventListener('click', () => {
    if (!running && !paused) return;
    if (paused) resumeGame();
    else pauseGame();
  });
  resumeBtn?.addEventListener('click', resumeGame);
  menuBtn?.addEventListener('click', returnToMenu);

  function setupGame() {
    kids.forEach(k => World.remove(world, k.body));
    kids = [];
    initKids();
    Body.setPosition(catcher, { x: canvas.width / 2, y: canvas.height - 100 });
    Body.setVelocity(catcher, { x: 0, y: 0 });
    const config = gameConfig[difficulty];
    score = 0;
    caught = 0;
    escaped = 0;
    timeLeft = config.timeLimit;
    escapeAccum = 0;
    nextEscapeIn = randomEscapeInterval();
    lastTime = null;
    particles = [];
    initCars();
    updateHud();
    hideOverlay();
    running = true;
    paused = false;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if (pauseIcon) pauseIcon.textContent = '⏸️';
    playMusic();
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(step);
  }

  function showDifficultySelector() {
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
    document.getElementById('btn-easy-encantados').onclick = () => { difficulty = 'easy';
      setTimeout(() => { resizeCanvas();
        setupWalls();
        setupGame(); }, 100); };
    document.getElementById('btn-medium-encantados').onclick = () => { difficulty = 'medium';
      setTimeout(() => { resizeCanvas();
        setupWalls();
        setupGame(); }, 100); };
    document.getElementById('btn-hard-encantados').onclick = () => { difficulty = 'hard';
      setTimeout(() => { resizeCanvas();
        setupWalls();
        setupGame(); }, 100); };
  }

  function showModeSelector() {
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
  setupWalls();
  initKids();
  showModeSelector();

  gameContent?.addEventListener('gameVisible', (e) => {
    if (e.detail.gameId === 'encantados') {
      isGameVisible = true;
      resizeCanvas();
      setupWalls();
      playMusic();
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
   JUEGO 5: EL RECREO (antes Elotes y Olé)
   - Con Matter.js, gráficos mejorados y nombre actualizado
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

  const { Engine, World, Bodies, Body, Events } = Matter;

  let isGameVisible = false;
  let running = false;
  let paused = false;
  let rafId = null;
  let lastTime = null;

  let baseWidth = 0, baseHeight = 0;

  function resizeCanvas() {
    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
    if (isFS && baseWidth && baseHeight) {
      canvas.width = baseWidth;
      canvas.height = baseHeight;
      return;
    }
    const wrap = canvasWrap || canvas.closest('.canvas-wrap');
    const rect = wrap ? wrap.getBoundingClientRect() : canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    baseWidth = canvas.width;
    baseHeight = canvas.height;
  }
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

  let gameConfig = {
    easy: { timeLimit: 40, itemMinGap: 900, itemMaxGap: 1400, obstacleMinGap: 1600, obstacleMaxGap: 2400, speed: 3.2, initialLives: 4 },
    hard: { timeLimit: 35, itemMinGap: 650, itemMaxGap: 1050, obstacleMinGap: 1100, obstacleMaxGap: 1700, speed: 4.4, initialLives: 3 }
  };
  let difficulty = null;
  let score = 0, lives = 3, totalLives = 3, combo = 0, timeLeft = 30;
  let clockAccum = 0;
  let itemSpawnAccum = 0, nextItemSpawnIn = 1000;
  let obstacleSpawnAccum = 0, nextObstacleSpawnIn = 1800;

  hud.innerHTML = `
    <div class="hud-item" style="grid-column: span 2; text-align:center; font-weight:bold; font-size:1.2rem; color:#4CAF50;">
      🌽 El Recreo
    </div>
    <div class="hud-item">
      <span>${jt('jue.hud.points', 'Puntos')}</span>
      <b id="el-score">0</b>
    </div>
    <div class="hud-item lives">
      <span>${jt('jue.hud.lives', 'Vidas')}</span>
      <b id="el-lives">❤️❤️❤️</b>
    </div>
    <div class="hud-item">
      <span>${jt('jue.hud.combo', 'Combo')}</span>
      <span class="elotes-combo" id="el-combo">x1</span>
    </div>
    <div class="hud-item">
      <span>${jt('jue.hud.time', 'Tiempo')}</span>
      <b id="el-time">30</b>
    </div>`;

  function renderLives(count) {
    const hearts = [];
    for (let i = 0; i < totalLives; i++) {
      const active = i < count;
      hearts.push(`<span class="heart${active ? '' : ' broken'}">${active ? '❤️' : '💔'}</span>`);
    }
    return hearts.join('');
  }

  function updateHud() {
    const scoreEl = document.getElementById('el-score');
    const livesEl = document.getElementById('el-lives');
    const comboEl = document.getElementById('el-combo');
    const timeEl = document.getElementById('el-time');
    if (scoreEl) scoreEl.textContent = score;
    if (livesEl) livesEl.innerHTML = renderLives(lives);
    if (comboEl) comboEl.textContent = 'x' + Math.max(1, 1 + Math.floor(combo / 5));
    if (timeEl) timeEl.textContent = Math.max(0, Math.ceil(timeLeft));
  }

  const engine = Engine.create();
  engine.gravity.y = 0.5;
  const world = engine.world;

  const wallThickness = 30;
  let walls = [];

  function setupWalls() {
    if (walls.length) World.remove(world, walls);
    const w = canvas.width, h = canvas.height;
    walls = [
      Bodies.rectangle(-wallThickness/2, h/2, wallThickness, h + wallThickness*2, { isStatic: true, label: 'wall' }),
      Bodies.rectangle(w + wallThickness/2, h/2, wallThickness, h + wallThickness*2, { isStatic: true, label: 'wall' }),
      Bodies.rectangle(w/2, h + wallThickness/2, w + wallThickness*2, wallThickness, { isStatic: true, label: 'floor' })
    ];
    World.add(world, walls);
  }

  const playerRadius = 22;
  const player = Bodies.circle(canvas.width/2, canvas.height - 90, playerRadius, {
    label: 'player',
    friction: 0.05,
    frictionAir: 0.01,
    restitution: 0.1,
    isStatic: false
  });
  World.add(world, player);

  let keys = {};
  window.addEventListener('keydown', e => {
    keys[e.key.toLowerCase()] = true;
    if (running && !paused) {
      if (e.key.toLowerCase() === 'a' || e.key === 'ArrowLeft') moveLane(-1);
      if (e.key.toLowerCase() === 'd' || e.key === 'ArrowRight') moveLane(1);
    }
  });
  window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

  let targetLane = 1;
  const lanesCount = 3;
  let lanePositions = [];

  function updateLanePositions() {
    const laneWidth = canvas.width / lanesCount;
    lanePositions = [];
    for (let i = 0; i < lanesCount; i++) {
      lanePositions.push((i * laneWidth) + (laneWidth / 2));
    }
  }
  updateLanePositions();

  function moveLane(dir) {
    const next = targetLane + dir;
    if (next >= 0 && next < lanesCount) targetLane = next;
  }

  canvas.addEventListener('touchstart', (e) => {
    if (!running || paused) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    if (x < rect.width / 2) moveLane(-1);
    else moveLane(1);
  }, { passive: true });

  let goodItems = [];
  let badItems = [];

  const GOOD_TYPES = [
    { emoji: '🌽', pts: 10, label: 'elote', color: '#f9a825', draw: drawElote },
    { emoji: '🥭', pts: 8, label: 'mango', color: '#ff8f00', draw: drawMango },
    { emoji: '🍧', pts: 12, label: 'minuta', color: '#b3e5fc', draw: drawMinuta },
    { emoji: '🍬', pts: 6, label: 'dulce', color: '#ffab00', draw: drawDulce }
  ];
  const BAD_TYPES = [
    { emoji: '🪑', label: 'pupitre', color: '#5d4037', draw: drawPupitre },
    { emoji: '⚽', label: 'pelota', color: '#212121', draw: drawPelota },
    { emoji: '🧹', label: 'escoba', color: '#8d6e63', draw: drawEscoba }
  ];

  function drawElote(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = '#f9a825';
    ctx.beginPath();
    ctx.ellipse(0, 0, 14, 20, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#f57f17';
    ctx.beginPath();
    ctx.ellipse(0, -4, 8, 12, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#2e7d32';
    ctx.beginPath();
    ctx.ellipse(-12, -2, 6, 14, -0.3, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(12, -2, 6, 14, 0.3, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }

  function drawMango(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = '#ff8f00';
    ctx.beginPath();
    ctx.ellipse(0, 0, 14, 18, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#e65100';
    ctx.beginPath();
    ctx.ellipse(0, -8, 4, 6, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#33691e';
    ctx.beginPath();
    ctx.ellipse(-8, -6, 4, 8, -0.5, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }

  function drawMinuta(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = '#b3e5fc';
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 20, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#81d4fa';
    ctx.beginPath();
    ctx.ellipse(0, -2, 10, 14, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = '#8d6e63';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(8, 8);
    ctx.lineTo(18, 18);
    ctx.stroke();
    ctx.restore();
  }

  function drawDulce(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = '#ffab00';
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#ff6f00';
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#e040fb';
    ctx.beginPath();
    ctx.ellipse(-14, -4, 6, 10, -0.5, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(14, -4, 6, 10, 0.5, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
  }

  function drawPupitre(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(-18, -12, 36, 24);
    ctx.fillStyle = '#3e2723';
    ctx.fillRect(-14, -4, 28, 8);
    ctx.fillStyle = '#795548';
    ctx.fillRect(-16, -16, 4, 32);
    ctx.fillRect(12, -16, 4, 32);
    ctx.restore();
  }

  function drawPelota(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = '#212121';
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI*2);
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI*2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-18, 0);
    ctx.lineTo(18, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -18);
    ctx.lineTo(0, 18);
    ctx.stroke();
    ctx.restore();
  }

  function drawEscoba(x, y) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = '#8d6e63';
    ctx.fillRect(-4, -20, 8, 40);
    ctx.fillStyle = '#6d4c41';
    ctx.beginPath();
    ctx.ellipse(0, -24, 16, 6, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#a1887f';
    for (let i = -12; i <= 12; i += 4) {
      ctx.fillRect(i, -22, 2, 8);
    }
    ctx.restore();
  }

  function spawnGoodItem() {
    const lane = Math.floor(Math.random() * lanesCount);
    const x = lanePositions[lane];
    const type = GOOD_TYPES[Math.floor(Math.random() * GOOD_TYPES.length)];
    const body = Bodies.circle(x, -30, 20, {
      label: 'good',
      isStatic: false,
      restitution: 0.3,
      friction: 0.2,
      frictionAir: 0.01,
      type: type
    });
    Body.setVelocity(body, { x: (Math.random() - 0.5) * 0.5, y: 1 });
    World.add(world, body);
    goodItems.push({ body: body, type: type });
  }

  function spawnBadItem() {
    const lane = Math.floor(Math.random() * lanesCount);
    const x = lanePositions[lane];
    const type = BAD_TYPES[Math.floor(Math.random() * BAD_TYPES.length)];
    const body = Bodies.rectangle(x, -30, 30, 30, {
      label: 'bad',
      isStatic: false,
      restitution: 0.2,
      friction: 0.3,
      frictionAir: 0.01,
      type: type
    });
    Body.setVelocity(body, { x: (Math.random() - 0.5) * 0.5, y: 1 });
    World.add(world, body);
    badItems.push({ body: body, type: type });
  }

  Events.on(engine, 'collisionStart', (event) => {
    for (const pair of event.pairs) {
      const { bodyA, bodyB } = pair;
      if ((bodyA.label === 'player' && bodyB.label === 'good') || (bodyA.label === 'good' && bodyB.label === 'player')) {
        const goodBody = bodyA.label === 'good' ? bodyA : bodyB;
        const item = goodItems.find(it => it.body === goodBody);
        if (item) {
          const multiplier = Math.max(1, 1 + Math.floor(combo / 5));
          score += item.type.pts * multiplier;
          combo++;
          flashEffect(goodBody.position.x, goodBody.position.y, '#ffd700');
          World.remove(world, goodBody);
          goodItems = goodItems.filter(it => it.body !== goodBody);
          updateHud();
        }
      }
      if ((bodyA.label === 'player' && bodyB.label === 'bad') || (bodyA.label === 'bad' && bodyB.label === 'player')) {
        const badBody = bodyA.label === 'bad' ? bodyA : bodyB;
        const item = badItems.find(it => it.body === badBody);
        if (item) {
          lives--;
          combo = 0;
          flashEffect(badBody.position.x, badBody.position.y, '#ff1744');
          World.remove(world, badBody);
          badItems = badItems.filter(it => it.body !== badBody);
          playerFlash = 1;
          updateHud();
        }
      }
    }
  });

  let playerFlash = 0;
  let particles = [];

  function flashEffect(x, y, color) {
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 4;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1,
        radius: 3 + Math.random() * 5,
        life: 1,
        color: color
      });
    }
  }

  function drawPlayer(body) {
    const x = body.position.x, y = body.position.y;
    ctx.save();
    ctx.translate(x, y);

    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 0;

    ctx.fillStyle = '#42a5f5';
    ctx.beginPath();
    ctx.roundRect(-16, -10, 32, 24, 6);
    ctx.fill();

    ctx.fillStyle = '#ffccbc';
    ctx.beginPath();
    ctx.arc(0, -18, 14, 0, Math.PI*2);
    ctx.fill();

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(-5, -21, 4.5, 0, Math.PI*2);
    ctx.arc(5, -21, 4.5, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = '#1a237e';
    ctx.beginPath();
    ctx.arc(-5, -21, 2.5, 0, Math.PI*2);
    ctx.arc(5, -21, 2.5, 0, Math.PI*2);
    ctx.fill();
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(-4, -22, 1, 0, Math.PI*2);
    ctx.arc(6, -22, 1, 0, Math.PI*2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255,150,150,0.5)';
    ctx.beginPath();
    ctx.ellipse(-9, -17, 3, 2.5, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(9, -17, 3, 2.5, 0, 0, Math.PI*2);
    ctx.fill();

    ctx.strokeStyle = '#212121';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, -14, 4.5, 0.1, Math.PI - 0.1);
    ctx.stroke();

    ctx.fillStyle = '#5d4037';
    ctx.beginPath();
    ctx.arc(0, -26, 14, Math.PI, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = '#ef6c00';
    ctx.fillRect(10, -4, 12, 16);

    ctx.strokeStyle = '#ffccbc';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-6, 14);
    ctx.lineTo(-8, 26);
    ctx.moveTo(6, 14);
    ctx.lineTo(8, 26);
    ctx.stroke();

    ctx.fillStyle = '#37474f';
    ctx.beginPath();
    ctx.ellipse(-8, 27, 6, 3, 0, 0, Math.PI*2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(8, 27, 6, 3, 0, 0, Math.PI*2);
    ctx.fill();

    if (playerFlash > 0) {
      ctx.fillStyle = 'rgba(255,0,0,0.2)';
      ctx.beginPath();
      ctx.arc(0, 0, playerRadius + 4, 0, Math.PI*2);
      ctx.fill();
      playerFlash -= 0.02;
    }

    ctx.restore();
  }

  function step(timestamp) {
    if (!running || !isGameVisible) return;
    if (lastTime === null) lastTime = timestamp;
    const dt = Math.min(Math.max(timestamp - lastTime, 1), 100);
    lastTime = timestamp;

    const targetX = lanePositions[targetLane];
    const diff = targetX - player.position.x;
    Body.setVelocity(player, {
      x: diff * 0.12,
      y: player.velocity.y * 0.95
    });
    if (Math.abs(player.velocity.x) > 6) {
      Body.setVelocity(player, {
        x: Math.sign(player.velocity.x) * 6,
        y: player.velocity.y
      });
    }

    const config = gameConfig[difficulty];

    itemSpawnAccum += dt;
    if (itemSpawnAccum >= nextItemSpawnIn) {
      itemSpawnAccum = 0;
      nextItemSpawnIn = config.itemMinGap + Math.random() * (config.itemMaxGap - config.itemMinGap);
      spawnGoodItem();
    }

    obstacleSpawnAccum += dt;
    if (obstacleSpawnAccum >= nextObstacleSpawnIn) {
      obstacleSpawnAccum = 0;
      nextObstacleSpawnIn = config.obstacleMinGap + Math.random() * (config.obstacleMaxGap - config.obstacleMinGap);
      spawnBadItem();
    }

    Engine.update(engine, dt);

    clockAccum += dt;
    while (clockAccum >= 1000 && timeLeft > 0) {
      clockAccum -= 1000;
      timeLeft--;
    }
    updateHud();

    goodItems = goodItems.filter(it => {
      if (it.body.position.y > canvas.height + 60) {
        World.remove(world, it.body);
        return false;
      }
      return true;
    });
    badItems = badItems.filter(it => {
      if (it.body.position.y > canvas.height + 60) {
        World.remove(world, it.body);
        return false;
      }
      return true;
    });

    if (lives <= 0 || timeLeft <= 0) {
      running = false;
      endGame();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, '#e8f5e9');
    grad.addColorStop(0.5, '#c8e6c9');
    grad.addColorStop(1, '#a5d6a7');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 3;
    ctx.setLineDash([12, 16]);
    for (let i = 1; i < lanesCount; i++) {
      const x = (i / lanesCount) * canvas.width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    for (const item of goodItems) {
      item.type.draw(item.body.position.x, item.body.position.y);
      ctx.save();
      ctx.translate(item.body.position.x, item.body.position.y - 20);
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI*2);
      ctx.fill();
      ctx.restore();
    }

    for (const item of badItems) {
      item.type.draw(item.body.position.x, item.body.position.y);
    }

    drawPlayer(player);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.05;
      p.life -= 0.015;
      p.radius *= 0.98;
      if (p.life <= 0 || p.radius < 0.5) {
        particles.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI*2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }

    rafId = requestAnimationFrame(step);
  }

  function endGame() {
    paused = false;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if (pauseIcon) pauseIcon.textContent = '⏸️';

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

  const pauseBtn = document.getElementById('pauseBtn-elotes');
  const pauseIcon = document.getElementById('pauseIcon-elotes');
  const pauseOverlay = document.getElementById('pauseOverlay-elotes');
  const resumeBtn = document.getElementById('resumeBtn-elotes');
  const menuBtn = document.getElementById('menuBtn-elotes');

  function pauseGame() {
    if (!running) return;
    running = false;
    paused = true;
    cancelAnimationFrame(rafId);
    if (bgMusic) { savedVolume = bgMusic.volume; bgMusic.volume = 0.1; }
    canvasWrap?.classList.add('is-paused');
    pauseOverlay?.classList.remove('hidden');
    if (pauseIcon) pauseIcon.textContent = '▶️';
  }

  function resumeGame() {
    if (!paused) return;
    paused = false;
    running = true;
    lastTime = null;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if (pauseIcon) pauseIcon.textContent = '⏸️';
    if (bgMusic) { bgMusic.volume = savedVolume || volume; if (volume > 0) bgMusic.play().catch(() => {}); }
    rafId = requestAnimationFrame(step);
  }

  function returnToMenu(){
    running = false;
    paused = false;
    cancelAnimationFrame(rafId);
    // stopMusic();  // ELIMINADO
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    goodItems.forEach(it => World.remove(world, it.body));
    badItems.forEach(it => World.remove(world, it.body));
    goodItems = [];
    badItems = [];
    showDifficultySelector();
  }

  pauseBtn?.addEventListener('click', () => {
    if (!running && !paused) return;
    if (paused) resumeGame();
    else pauseGame();
  });
  resumeBtn?.addEventListener('click', resumeGame);
  menuBtn?.addEventListener('click', returnToMenu);

  const bgMusic = document.getElementById('bgMusic-elotes');
  const volumeSlider = document.getElementById('volumeSlider-elotes');
  const volumeIcon = document.getElementById('volumeIcon-elotes');
  const damageOverlay = document.getElementById('damageOverlay-elotes');
  let volume = Number(volumeSlider?.value || 0.45);
  let savedVolume = volume;

  if (bgMusic) { bgMusic.volume = volume; bgMusic.muted = false; }
  volumeSlider?.addEventListener('input', (event) => {
    volume = Number(event.target.value);
    if (bgMusic) { bgMusic.volume = volume; bgMusic.muted = volume <= 0; }
    if (volumeIcon) volumeIcon.textContent = volume <= 0 ? '🔇' : volume < 0.35 ? '🔉' : '🔊';
  });

  function playMusic() { if (!bgMusic) return; bgMusic.muted = false; bgMusic.volume = volume; bgMusic.currentTime = 0; bgMusic.play().catch(() => {}); }
  function stopMusic() { if (bgMusic) { bgMusic.pause(); bgMusic.currentTime = 0; } }

  function showOverlay(html) {
    overlayCard.innerHTML = html;
    overlay.classList.remove('hidden');
    overlay.style.backdropFilter = 'none';
    overlay.style.webkitBackdropFilter = 'none';
    if (window.gsap) {
      gsap.fromTo(overlayCard, { autoAlpha: 0, y: 18, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'back.out(1.5)' });
      gsap.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: 'power1.out' });
    }
  }

  function hideOverlay() {
    if (window.gsap) {
      overlay.style.pointerEvents = 'none';
      gsap.to(overlayCard, { autoAlpha: 0, y: -12, scale: 0.97, duration: 0.25, ease: 'power1.in' });
      gsap.to(overlay, { autoAlpha: 0, duration: 0.25, ease: 'power1.in', onComplete: () => { overlay.classList.add('hidden'); overlay.style.pointerEvents = ''; } });
    } else {
      overlay.classList.add('hidden');
    }
  }

  function startGame() {
    goodItems.forEach(it => World.remove(world, it.body));
    badItems.forEach(it => World.remove(world, it.body));
    goodItems = [];
    badItems = [];
    score = 0;
    combo = 0;
    lives = totalLives;
    timeLeft = gameConfig[difficulty].timeLimit;
    clockAccum = 0;
    itemSpawnAccum = 0;
    nextItemSpawnIn = gameConfig[difficulty].itemMinGap + Math.random() * (gameConfig[difficulty].itemMaxGap - gameConfig[difficulty].itemMinGap);
    obstacleSpawnAccum = 0;
    nextObstacleSpawnIn = gameConfig[difficulty].obstacleMinGap + Math.random() * (gameConfig[difficulty].obstacleMaxGap - gameConfig[difficulty].obstacleMinGap);
    targetLane = 1;
    Body.setPosition(player, { x: lanePositions[1], y: canvas.height - 90 });
    Body.setVelocity(player, { x: 0, y: 0 });
    lastTime = null;
    particles = [];
    updateHud();
    hideOverlay();
    running = true;
    paused = false;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if (pauseIcon) pauseIcon.textContent = '⏸️';
    playMusic();
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(step);
  }

  function showDifficultySelector() {
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
      difficulty = 'easy';
      totalLives = gameConfig.easy.initialLives;
      setTimeout(() => { resizeCanvas(); setupWalls(); updateLanePositions(); startGame(); }, 100);
    };
    document.getElementById('btn-hard-elotes').onclick = () => {
      difficulty = 'hard';
      totalLives = gameConfig.hard.initialLives;
      setTimeout(() => { resizeCanvas(); setupWalls(); updateLanePositions(); startGame(); }, 100);
    };
  }

  resizeCanvas();
  setupWalls();
  updateLanePositions();
  showOverlay(`
    <span class="overlay-tag">${jt('jue.card5.tagModal', 'El Recreo')}</span>
    <h3>🌽 ${jt('jue.card5.title', 'El Recreo')}</h3>
    <p>${jt('jue.card5.intro', 'Movete entre los 3 carriles del patio con las teclas <strong>A</strong>/<strong>D</strong>, las flechas ⬅️➡️, o tocando a los lados de la pantalla en el celular. Recogé lo rico del recreo y esquivá lo que te estorba.')}</p>
    <p class="rules-title">${jt('jue.rules.title', 'Reglas del juego')}</p>
    <ul class="rules-list">
      <li class="rule-good"><span class="rule-icon">✅</span> ${jt('jue.card5.ruleGood', 'Recogé <strong>🌽 elotes locos</strong>, <strong>🥭 mangos</strong>, <strong>🍧 minutas</strong> y <strong>🍬 dulces</strong> — suman puntos y combo.')}</li>
      <li class="rule-bad"><span class="rule-icon">❌</span> ${jt('jue.card5.ruleBad', 'Evitá <strong>🪑 pupitres</strong>, <strong>⚽ pelotas perdidas</strong> y <strong>🧹 la escoba del conserje</strong> — te quitan una vida y el combo.')}</li>
    </ul>
    <button class="btn-primary" id="el-start">${jt('jue.continue', 'Continuar')}</button>`);
  document.getElementById('el-start').onclick = showDifficultySelector;

  gameContent?.addEventListener('gameVisible', (e) => {
    if (e.detail.gameId === 'elotes') {
      isGameVisible = true;
      resizeCanvas();
      setupWalls();
      updateLanePositions();
      playMusic();
      if (paused && running) resumeGame();
      else if (running) rafId = requestAnimationFrame(step);
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

  let gameDifficulty = 'easy';
  let targetDistance = 1200;

  const gameConfig = {
    easy: { fallSpeed: 1.2, energyDrainOnHit: 14, energyRegen: 10 },
    hard: { fallSpeed: 1.8, energyDrainOnHit: 22, energyRegen: 6 }
  };

  const lanesCount = 3;
  let laneWidth = 0;
  let streetLeft = 0, streetRight = 0;
  let stallLeftX = 0, stallRightX = 0;
  const lanePositions = [];

  let toritoLane = 1;
  let toritoY = 0;
  let distance = 0, energy = 100;
  let stalls = [];

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
    const energyFill = document.getElementById('t-energy-fill');

    if(prog) prog.style.width = Math.min(100, (distance / targetDistance) * 100) + '%';
    if(energyFill) {
      energyFill.style.width = Math.max(0, energy) + '%';
      energyFill.style.background = energy > 50 ? '#3ae080' : energy > 20 ? '#ffb300' : '#e53935';
    }
  }

  if(hud) {
    hud.innerHTML = `
      <div class="hud-item">
        <span>${jt('jue.card6.routeLabel', '🐂 Progreso')}</span>
        <div class="coasters-progress-bar"><div id="t-prog" class="coasters-progress-fill"></div></div>
      </div>
      <div class="hud-item">
        <span>${jt('jue.card6.energyLabel', '🧨 Energía')}</span>
        <div class="coasters-progress-bar"><div id="t-energy-fill" class="coasters-progress-fill" style="background:#3ae080;"></div></div>
      </div>`;
  }

  const bgMusic = document.getElementById('bgMusic-torito');
  const volumeSlider = document.getElementById('volumeSlider-torito');
  const volumeIcon = document.getElementById('volumeIcon-torito');
  const damageOverlay = document.getElementById('damageOverlay-torito');
  let volume = Number(volumeSlider?.value || 0.45);
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

  function resetGame() {
    resizeCanvas();
    toritoLane = 1;
    Body.setPosition(toritoBody, { x: lanePositions[1], y: toritoY });
    distance = 0;
    energy = 100;
    stalls = [];

    Composite.allBodies(world).forEach(b => {
      if(b.label === 'carreta' || b.label === 'persona' || b.label === 'cohetillo') {
        World.remove(world, b);
      }
    });
  }

  function isLaneOccupied(lane) {
    const threshold = 180;
    const laneX = lanePositions[lane];
    const bodies = Composite.allBodies(world);
    for (const b of bodies) {
      if (b.label === 'carreta' || b.label === 'persona' || b.label === 'cohetillo') {
        if (Math.abs(b.position.x - laneX) < 30 && b.position.y < threshold) {
          return true;
        }
      }
    }
    return false;
  }

  function spawnCarreta(lane){
    const body = Bodies.rectangle(lanePositions[lane], -40, 40, 20, {
      restitution: 0.35, friction: 0.4, frictionAir: 0.01, label: 'carreta'
    });
    Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.04);
    World.add(world, body);
  }

  function spawnPersona(lane){
    const body = Bodies.circle(lanePositions[lane], -40, 12, {
      restitution: 0.5, friction: 0.3, frictionAir: 0.015, label: 'persona'
    });
    body.outfitColor = ['#e63946', '#3a86c8', '#2fbf9f', '#f2c744', '#7d3ac1'][Math.floor(Math.random() * 5)];
    World.add(world, body);
  }

  function spawnCohetillo(lane){
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
    let lane = Math.floor(Math.random() * lanesCount);
    if (!isLaneOccupied(lane) && Math.random() < 0.006 && countBodies('carreta') < 2) spawnCarreta(lane);
    
    lane = Math.floor(Math.random() * lanesCount);
    if (!isLaneOccupied(lane) && Math.random() < 0.008 && countBodies('persona') < 4) spawnPersona(lane);
    
    lane = Math.floor(Math.random() * lanesCount);
    if (!isLaneOccupied(lane) && Math.random() < 0.006 && countBodies('cohetillo') < 2) spawnCohetillo(lane);

    if(Math.random() < 0.008 && stalls.length < 3) spawnStall();
  }

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

      const kickX = (Math.random() - 0.5) * 0.045;
      Body.applyForce(other, other.position, { x: kickX, y: -0.02 });
      Body.setAngularVelocity(other, (Math.random() - 0.5) * 0.5);

      const penalty = other.label === 'carreta' ? config.energyDrainOnHit : config.energyDrainOnHit * 0.5;
      energy = Math.max(0, energy - penalty);
      flashDamage();

      setTimeout(() => toRemove.add(other), 220);
    }
  });

  function step(){
    if(!running || !isGameVisible) return;

    const config = gameConfig[gameDifficulty];

    distance += config.fallSpeed * 0.15;
    energy = Math.max(0, energy - 0.02);

    spawnEntities();

    const targetX = lanePositions[toritoLane];
    const nextX = toritoBody.position.x + (targetX - toritoBody.position.x) * 0.22;
    Body.setPosition(toritoBody, { x: nextX, y: toritoY });

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

  // ---- Dibujado ----

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

    drawHouse(0, sideW, facadeColors[colorIdx % facadeColors.length]);
    drawHouse(canvas.width - sideW, sideW, facadeColors[(colorIdx + 2) % facadeColors.length]);

    ctx.fillStyle = 'rgba(0,0,0,.15)';
    ctx.fillRect(sideW - 4, 0, 4, canvas.height);
    ctx.fillRect(canvas.width - sideW, 0, 4, canvas.height);
  }

  function drawHouse(x, width, color) {
    const roofHeight = width * 0.5;
    ctx.fillStyle = color;
    ctx.fillRect(x, 0, width, canvas.height);

    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    const doorSpacing = 130;
    const offsetY = (distance * 0.4) % doorSpacing;
    for (let y = -offsetY; y < canvas.height; y += doorSpacing) {
      const cx = x + width / 2;
      ctx.beginPath();
      ctx.roundRect(cx - width * 0.2, y + 20, width * 0.4, width * 0.5, 3);
      ctx.fill();
    }

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x - width * 0.15, 0);
    ctx.lineTo(x + width / 2, -roofHeight);
    ctx.lineTo(x + width + width * 0.15, 0);
    ctx.closePath();
    ctx.fillStyle = '#b54b3a';
    ctx.fill();
    ctx.strokeStyle = '#7a3428';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.strokeStyle = '#8a3f2e';
    ctx.lineWidth = 1.5;
    const steps = 6;
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const yPos = -roofHeight * t;
      const xLeft = x + width * 0.15 * t;
      const xRight = x + width - width * 0.15 * t;
      ctx.beginPath();
      ctx.moveTo(xLeft, yPos);
      ctx.lineTo(xRight, yPos);
      ctx.stroke();
    }
    ctx.strokeStyle = '#7a3428';
    ctx.lineWidth = 1;
    for (let i = 1; i < steps * 2; i++) {
      const t = i / (steps * 2);
      const yPos = -roofHeight * t;
      const xPos = x + width * 0.15 + (width - width * 0.3) * t;
      ctx.beginPath();
      ctx.moveTo(xPos, yPos);
      ctx.lineTo(xPos + width * 0.08, yPos - roofHeight * 0.05);
      ctx.stroke();
    }
    ctx.restore();
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
    ctx.moveTo(0, -18);
    ctx.lineTo(9, 10);
    ctx.lineTo(-9, 10);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ff7043';
    ctx.beginPath();
    ctx.arc(0, -22, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

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
        <button class="btn-primary" id="dist-corta-torito">${jt('jue.card6.distCorta', 'Corta (1200m)')}</button>
        <button class="btn-primary" id="dist-media-torito">${jt('jue.card6.distMedia', 'Media (2400m)')}</button>
        <button class="btn-primary" id="dist-larga-torito">${jt('jue.card6.distLarga', 'Larga (3600m)')}</button>
      </div>
    `);

    document.getElementById('dist-corta-torito').onclick = () => { selectDistance(1200); };
    document.getElementById('dist-media-torito').onclick = () => { selectDistance(2400); };
    document.getElementById('dist-larga-torito').onclick = () => { selectDistance(3600); };
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
  }

  function resumeGame() {
    if(!paused) return;
    paused = false;
    running = true;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    if (bgMusic) {
      bgMusic.volume = savedVolume || volume;
      if (volume > 0) bgMusic.play().catch(()=>{});
    }
    rafId = requestAnimationFrame(step);
  }

  function returnToMenu() {
    running = false;
    paused = false;
    cancelAnimationFrame(rafId);
    // bgMusic?.pause();  // ELIMINADO
    // stopMusic();       // ELIMINADO
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
  });
})();