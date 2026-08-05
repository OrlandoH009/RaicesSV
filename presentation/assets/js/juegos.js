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
  function resizeCanvas() {
    const wrap = canvasWrap || canvas.closest('.canvas-wrap');
    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    // Si está en pantalla completa, toma el alto total del contenedor, si no, usa el CSS estándar
    canvas.height = (isFS && wrap) ? wrap.clientHeight : rect.height;
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
      <span>Puntos</span>
      <b id="p-score">0</b>
    </div>
    <div class="hud-item lives">
      <span>Vidas</span>
      <b id="p-lives">${renderLives(3)}</b>
    </div>
    <div class="hud-item">
      <span>Nivel</span>
      <b id="p-level">-</b>
    </div>
    <div class="hud-item">
      <span>Tiempo</span>
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
    if(levelEl) levelEl.textContent = gameDifficulty === 'easy' ? '🟢 Fácil' : '🔴 Difícil';
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

  pauseBtn?.addEventListener('click', ()=>{
    if(!running && !paused) return;
    if(paused) resumeGame();
    else pauseGame();
  });
  resumeBtn?.addEventListener('click', resumeGame);

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
    
    let text = score >= 120 ? '🏆 ¡Sos toda una maestra pupusera de El Salvador!' :
               score >= 60 ? '🌟 Excelente, ya casi cocinás como las expertas de Olocuilta.' :
               '👍 Buen intento, ¡seguí practicando para no quemar las pupusas!';
    
    const difficultyLabel = gameDifficulty === 'easy' ? '🟢 Nivel Fácil' : '🔴 Nivel Difícil';
    
    showOverlay(`
      <span class="overlay-tag">${difficultyLabel}</span>
      <h3>¡Fin del juego!</h3>
      <div class="overlay-score">${score} pts</div>
      <p>${text}</p>
      <button class="btn-primary" id="p-restart">Jugar de nuevo</button>`);
    document.getElementById('p-restart').onclick = showDifficultySelector;
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
      <span class="overlay-tag">Elegí tu dificultad</span>
      <h3>🎮 Selecciona Nivel</h3>
      <p>La velocidad de caída y aparición ahora es mayor. ¿Estás listo?</p>
      <div class="difficulty-buttons">
        <button class="difficulty-btn easy" id="btn-easy">
          🟢 Fácil
          <div class="difficulty-desc">Caída veloz, reflejos rápidos</div>
        </button>
        <button class="difficulty-btn hard" id="btn-hard">
          🔴 Difícil
          <div class="difficulty-desc">Velocidad extrema de comal</div>
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
    <span class="overlay-tag">Ruta 01</span>
    <h3>🫓 Atrapa la Pupusa</h3>
    <p>Mové el comal de un lado a otro con el mouse (o el dedo) para atrapar lo que cae del cielo.</p>
    <p class="rules-title">Reglas del juego</p>
    <ul class="rules-list">
      <li class="rule-good"><span class="rule-icon">✅</span> Atrapá <strong>🫓 pupusas</strong>, <strong>🧀 quesillo</strong> y <strong>🌽 elotes</strong> — suman puntos.</li>
      <li class="rule-bad"><span class="rule-icon">❌</span> Evitá <strong>🩴 chanclas</strong>, <strong>🪨 piedras</strong> y <strong>🦴 huesos</strong> — te quitan una vida.</li>
    </ul>
    <button class="btn-primary" id="p-start">Continuar</button>`);
  
  document.getElementById('p-start').onclick = showDifficultySelector;

  clearCanvas();
  ctx.fillStyle = '#5a4634';
  ctx.fillRect(0, canvas.height-20, canvas.width, 20);

  gameContent?.addEventListener('gameVisible', (e) => {
    if(e.detail.gameId === 'pupusa') {
      isGameVisible = true;
      resizeCanvas();
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
    setVisible: (visible) => { isGameVisible = visible; }
  });
})();

/* ---------------------------------------------------------
   JUEGO 2: BATALLA DE TROMPOS (SELECCIÓN DE RONDAS Y BALANCES)
--------------------------------------------------------- */

(function initGameTrompos(){
  const canvas = document.getElementById('canvas-trompos');
  if(!canvas || typeof Matter === 'undefined') return;

  const canvasWrap = canvas.closest('.canvas-wrap');

  function resizeCanvas() {
    const wrap = canvasWrap || canvas.closest('.canvas-wrap');
    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width;
    canvas.height = (isFS && wrap) ? wrap.clientHeight : rect.height;
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
      <span>🟢 Jugador 1</span>
      <b id="p1-energy">100%</b>
    </div>
    <div class="hud-item player2">
      <span id="p2-label">🔴 Jugador 2</span>
      <b id="p2-energy">100%</b>
    </div>
    <div class="hud-item">
      <span>Ronda</span>
      <b id="round-val">1/3</b>
    </div>`;

  function updateHud(){
    const p1El = document.getElementById('p1-energy');
    const p2El = document.getElementById('p2-energy');
    const roundEl = document.getElementById('round-val');
    if(p1El) p1El.textContent = Math.max(0, Math.round(top.energy)) + '%';
    if(p2El) p2El.textContent = Math.max(0, Math.round(bottom.energy)) + '%';
    if(roundEl) roundEl.textContent = `${currentRound}/${maxRounds} (J1: ${playerWins} - Riv: ${rivalWins})`;
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
        <span class="overlay-tag">Fin de Ronda</span>
        <h3>Ronda ${currentRound - 1} finalizada</h3>
        <p>Ganador: ${winner === 'top' ? '🟢 Jugador 1' : '🔴 Rival'}</p>
        <div style="font-size: 1.2rem; font-weight: bold; margin: 15px 0;">
          Marcador: J1 ${playerWins} - ${rivalWins} Rival
        </div>
        <button class="btn-primary" id="btn-next-round">Siguiente Ronda</button>
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
      ? `🟢 ¡Felicidades! Has ganado el duelo (${playerWins} - ${rivalWins})`
      : gameMode === 'pvp'
        ? `🔴 ¡Jugador 2 gana el duelo! (${rivalWins} - ${playerWins})`
        : `🔴 El NPC salvadoreño te ha ganado (${rivalWins} - ${playerWins})`;

    showOverlay(`
      <span class="overlay-tag">Fin de la Batalla</span>
      <h3>${message}</h3>
      <p>¿Listo para una revancha?</p>
      <button class="btn-primary" id="p-restart">Volver a Jugar</button>`);
    
    document.getElementById('p-restart').onclick = showModeSelector;
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
      <span class="overlay-tag">Elige Dificultad</span>
      <h3>🎮 Selecciona tu Desafío</h3>
      <p>Elige el nivel de agilidad que tendrá la IA.</p>
      <div class="difficulty-buttons">
        <button class="difficulty-btn easy" id="btn-easy-trompos">
          🟢 Fácil
          <div class="difficulty-desc">NPC ágil</div>
        </button>
        <button class="difficulty-btn medium" id="btn-medium-trompos">
          🟡 Normal
          <div class="difficulty-desc">NPC rápido y certero</div>
        </button>
        <button class="difficulty-btn hard" id="btn-hard-trompos">
          🔴 Difícil
          <div class="difficulty-desc">NPC experto (Modo Imposible)</div>
        </button>
      </div>`);
    
    document.getElementById('btn-easy-trompos').onclick = ()=>{
      npcDifficulty = 'easy';
      document.getElementById('p2-label').textContent = '🟢 NPC - Fácil';
      setTimeout(()=>{ start(); }, 100);
    };
    
    document.getElementById('btn-medium-trompos').onclick = ()=>{
      npcDifficulty = 'medium';
      document.getElementById('p2-label').textContent = '🟡 NPC - Normal';
      setTimeout(()=>{ start(); }, 100);
    };
    
    document.getElementById('btn-hard-trompos').onclick = ()=>{
      npcDifficulty = 'hard';
      document.getElementById('p2-label').textContent = '🔴 NPC - Experto';
      setTimeout(()=>{ start(); }, 100);
    };
  }

  // NUEVO SELECTOR DE RONDAS
  function showRoundSelector(){
    showOverlay(`
      <span class="overlay-tag">Configuración</span>
      <h3>🏁 ¿A cuántas rondas jugamos?</h3>
      <p>El primero en ganar la mitad más uno de las rondas seleccionadas se lleva la victoria.</p>
      <div class="difficulty-buttons" style="display: flex; gap: 15px; margin-top: 15px;">
        <button class="btn-primary" id="rounds-1" style="flex: 1;">1 Ronda</button>
        <button class="btn-primary" id="rounds-3" style="flex: 1;">Best of 3</button>
        <button class="btn-primary" id="rounds-5" style="flex: 1;">Best of 5</button>
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
      <span class="overlay-tag">Selecciona Modo</span>
      <h3>⚡ Batalla de Trompos SV</h3>
      <p>¿Cómo quieres jugar?</p>
      <div class="mode-buttons">
        <button class="mode-btn pvp" id="btn-pvp-trompos">
          👥 2 Jugadores
          <div class="difficulty-desc">Compite localmente</div>
        </button>
        <button class="mode-btn pve" id="btn-pve-trompos">
          🤖 vs NPC
          <div class="difficulty-desc">Enfrenta la IA de práctica</div>
        </button>
      </div>`);
    
    document.getElementById('btn-pvp-trompos').onclick = ()=>{
      gameMode = 'pvp';
      document.getElementById('p2-label').textContent = '🔴 Jugador 2';
      setTimeout(()=>{ showRoundSelector(); }, 100);
    };
    
    document.getElementById('btn-pve-trompos').onclick = ()=>{
      gameMode = 'pve';
      setTimeout(()=>{ showRoundSelector(); }, 100);
    };
  }

  showOverlay(`
    <span class="overlay-tag">Ruta 02</span>
    <h3>⚡ Batalla de Trompos</h3>
    <p>Prepará tu trompo para la batalla. Controlá su movimiento y vencé a tu oponente.</p>
    <button class="btn-primary" id="p-start-trompos">Preparar Batalla</button>`);
  
  document.getElementById('p-start-trompos').onclick = showModeSelector;

  gameContent?.addEventListener('gameVisible', (e) => {
    if(e.detail.gameId === 'trompos') {
      isGameVisible = true;
      resizeCanvas();
      setupWalls();
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
    setVisible: (visible) => { isGameVisible = visible; }
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

  // Redimensionamiento dinámico compatible con Pantalla Completa
  function resizeCanvas() {
  const wrap = canvasWrap || canvas.closest('.canvas-wrap');
  // Detecta si el navegador está en modo pantalla completa
  const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
  const rect = wrap ? wrap.getBoundingClientRect() : canvas.getBoundingClientRect();
  
  canvas.width = rect.width;
  // Si está en pantalla completa, toma el alto total real del contenedor, si no, usa el alto del rect
  canvas.height = (isFS && wrap) ? wrap.clientHeight : rect.height;
  
  // Recalcular el ancho de los carriles con el nuevo tamaño del canvas
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
        <span>🚌 Ruta 44 (Tú)</span>
        <div class="coasters-progress-bar"><div id="p-prog" class="coasters-progress-fill"></div></div>
        <b id="p-dist">0m</b>
      </div>
      <div class="hud-item">
        <span>🚍 Ruta 101-D (Bot)</span>
        <div class="coasters-progress-bar"><div id="b-prog" class="coasters-progress-fill bot"></div></div>
        <b id="b-dist">0m</b>
      </div>
      <div class="hud-item">
        <span>Pasajeros</span>
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
      title = "🏆 ¡VICTORIA TOTAL!";
      msg = `¡La Ruta 44 llegó primero! Recogiste a <b>${player.passengers}</b> pasajeros en el camino.`;
    } else {
      title = "🏁 Te ganaron el pasaje...";
      msg = "La 101-D llegó primero esta vez. ¡Cuidado con los baches en la próxima!";
    }

    showOverlay(`
      <span class="overlay-tag">Fin de la Carrera</span>
      <h3>${title}</h3>
      <p>${msg}</p>
      <button class="btn-primary" id="btn-restart-coasters">Revancha</button>
    `);
    document.getElementById('btn-restart-coasters').onclick = showModeSelector;
  }

  function showDistanceSelector() {
    showOverlay(`
      <span class="overlay-tag">Configuración</span>
      <h3>🏁 Elige la Distancia</h3>
      <p>¿Qué tan largo será el trayecto?</p>
      <div class="difficulty-buttons" style="display: flex; flex-direction: column; gap: 10px;">
        <button class="btn-primary" id="dist-1">Express (1000m)</button>
        <button class="btn-primary" id="dist-2">Normal (2500m)</button>
        <button class="btn-primary" id="dist-3">Costa a Costa (5000m)</button>
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
      <span class="overlay-tag">Dificultad</span>
      <h3>🚦 ¿Qué tan veloz es tu rival?</h3>
      <p>Ajusta el nivel del motorista oponente.</p>
      <div class="difficulty-buttons">
        <button class="difficulty-btn easy" id="btn-easy-coasters">
          🟢 Tranquilo
          <div class="difficulty-desc">Va despacio</div>
        </button>
        <button class="difficulty-btn medium" id="btn-medium-coasters">
          🟡 Apurado
          <div class="difficulty-desc">Busca rebasarte</div>
        </button>
        <button class="difficulty-btn hard" id="btn-hard-coasters">
          🔴 Hora Pico
          <div class="difficulty-desc">Maneja a lo loco</div>
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
    if(bgMusic) {
      bgMusic.currentTime = 0;
      bgMusic.play().catch(()=>{});
    }

    rafId = requestAnimationFrame(step);
  }

  function showModeSelector() {
    showOverlay(`
      <span class="overlay-tag">Preparar Motor</span>
      <h3>🚌 Guerra de Coasters SV</h3>
      <p>Esquiva baches y recoge pasajeros usando 'A' y 'D' (o flechas) para ganarle a la Ruta 101-D.</p>
      <button class="btn-primary" id="btn-start-coasters">Siguiente</button>
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
      if(paused && running) resumeGame();
      else if(running) rafId = requestAnimationFrame(step);
    }
  });

  window.switchGameState('coasters', {
    pause: pauseGame,
    resume: resumeGame,
    stop: () => bgMusic?.pause(),
    running: () => running,
    paused: () => paused,
    setVisible: (visible) => { isGameVisible = visible; }
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

  function resizeCanvas() {
    const wrap = canvasWrap || canvas.closest('.canvas-wrap');
    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
    const rect = wrap ? wrap.getBoundingClientRect() : canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = (isFS && wrap) ? wrap.clientHeight : rect.height;
    layoutHideSpots();
    bote.x = canvas.width / 2;
    bote.y = 62;
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
        <span>Puntos</span>
        <b id="e-score">0</b>
      </div>
      <div class="hud-item">
        <span>Atrapados</span>
        <span class="encantados-round-dots" id="e-dots"></span>
      </div>
      <div class="hud-item">
        <span>Se salvaron</span>
        <b id="e-escaped">0</b>
      </div>
      <div class="hud-item">
        <span>Tiempo</span>
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

    let title = win ? '🏆 ¡Los atrapaste a todos antes del bote!' : (timeLeft <= 0 ? '⏰ ¡Se acabó el tiempo!' : '🏁 ¡Se te escaparon demasiados!');
    let text = score >= 150 ? '🌟 Sos el mejor "trayendola" del barrio, nadie se te escapa.' :
               score >= 80 ? '👍 Buena persecución, ¡ya casi los atrapás a todos!' :
               'Seguí practicando tus reflejos para la próxima ronda de encantados.';

    showOverlay(`
      <span class="overlay-tag">Fin del Juego</span>
      <h3>${title}</h3>
      <div class="overlay-score">${score} pts</div>
      <p>Atrapaste ${caught} de ${gameConfig[difficulty].kidsToWin} amigos. ${text}</p>
      <button class="btn-primary" id="e-restart">Jugar de nuevo</button>`);
    document.getElementById('e-restart').onclick = showDifficultySelector;
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
    ctx.fillText('¡BOTE!', 0, bote.radius + 16);
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
      <span class="overlay-tag">Elegí tu dificultad</span>
      <h3>🏃 ¿Qué tan rápidos son tus amigos?</h3>
      <p>Más difícil significa que corren más rápido al bote y tenés menos escapes permitidos.</p>
      <div class="difficulty-buttons">
        <button class="difficulty-btn easy" id="btn-easy-encantados">
          🟢 Fácil
          <div class="difficulty-desc">Atrapá 6 amigos, corren despacio</div>
        </button>
        <button class="difficulty-btn medium" id="btn-medium-encantados">
          🟡 Normal
          <div class="difficulty-desc">Atrapá 8 amigos, corren más seguido</div>
        </button>
        <button class="difficulty-btn hard" id="btn-hard-encantados">
          🔴 Difícil
          <div class="difficulty-desc">Atrapá 10 amigos, casi no hay respiro</div>
        </button>
      </div>`);
    document.getElementById('btn-easy-encantados').onclick = () => { difficulty='easy'; setTimeout(()=>{ resizeCanvas(); setupGame(); }, 100); };
    document.getElementById('btn-medium-encantados').onclick = () => { difficulty='medium'; setTimeout(()=>{ resizeCanvas(); setupGame(); }, 100); };
    document.getElementById('btn-hard-encantados').onclick = () => { difficulty='hard'; setTimeout(()=>{ resizeCanvas(); setupGame(); }, 100); };
  }

  function showModeSelector(){
    showOverlay(`
      <span class="overlay-tag">Ruta 04</span>
      <h3>🏃 Escondelero</h3>
      <p>Vos sos "el que la trae". Tus amigos están escondidos por todo el patio y de repente van a salir corriendo hacia el bote para salvarse. Movete con las teclas <strong>WASD</strong> o las <strong>flechas</strong> del teclado e interceptalos antes de que lleguen.</p>
      <p class="rules-title">Reglas del juego</p>
      <ul class="rules-list">
        <li class="rule-good"><span class="rule-icon">✅</span> Tocá a los amigos que van corriendo antes de que lleguen al bote — cada atrapada suma puntos.</li>
        <li class="rule-bad"><span class="rule-icon">❌</span> Si un amigo llega al bote, se salva y perdés puntos. Si se te escapan demasiados, perdés la partida.</li>
      </ul>
      <button class="btn-primary" id="e-start">Continuar</button>`);
    document.getElementById('e-start').onclick = showDifficultySelector;
  }

  resizeCanvas();
  showModeSelector();

  gameContent?.addEventListener('gameVisible', (e) => {
    if(e.detail.gameId === 'encantados') {
      isGameVisible = true;
      resizeCanvas();
      if(paused && running) resumeGame();
      else if(running) rafId = requestAnimationFrame(step);
    }
  });

  window.switchGameState('encantados', {
    pause: pauseGame,
    resume: resumeGame,
    stop: () => bgMusic?.pause(),
    running: () => running,
    paused: () => paused,
    setVisible: (visible) => { isGameVisible = visible; }
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

  function resizeCanvas() {
    const wrap = canvasWrap || canvas.closest('.canvas-wrap');
    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement);
    const rect = wrap ? wrap.getBoundingClientRect() : canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = (isFS && wrap) ? wrap.clientHeight : rect.height;
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
        <span>Puntos</span>
        <b id="el-score">0</b>
      </div>
      <div class="hud-item lives">
        <span>Vidas</span>
        <b id="el-lives">${renderLives(3)}</b>
      </div>
      <div class="hud-item">
        <span>Combo</span>
        <span class="elotes-combo" id="el-combo">x1</span>
      </div>
      <div class="hud-item">
        <span>Tiempo</span>
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
  pauseBtn?.addEventListener('click', ()=>{
    if(!running && !paused) return;
    if(paused) resumeGame();
    else pauseGame();
  });
  resumeBtn?.addEventListener('click', resumeGame);

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

    let text = score >= 150 ? '🏆 ¡Sos el campeón del recreo, nadie te gana un elote!' :
               score >= 80 ? '🌟 ¡Buen ritmo! Ya casi te comés todo el recreo.' :
               '👍 Buen intento, ¡seguí practicando para el próximo recreo!';

    showOverlay(`
      <span class="overlay-tag">${difficulty === 'easy' ? '🟢 Nivel Fácil' : '🔴 Nivel Difícil'}</span>
      <h3>¡Sonó la campana!</h3>
      <div class="overlay-score">${score} pts</div>
      <p>${text}</p>
      <button class="btn-primary" id="el-restart">Jugar de nuevo</button>`);
    document.getElementById('el-restart').onclick = showDifficultySelector;
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
      <span class="overlay-tag">Elegí tu dificultad</span>
      <h3>🌽 Selecciona Nivel</h3>
      <p>¿Qué tan movido va a estar el recreo hoy?</p>
      <div class="difficulty-buttons">
        <button class="difficulty-btn easy" id="btn-easy-elotes">
          🟢 Fácil
          <div class="difficulty-desc">Recreo tranquilo</div>
        </button>
        <button class="difficulty-btn hard" id="btn-hard-elotes">
          🔴 Difícil
          <div class="difficulty-desc">Recreo a toda velocidad</div>
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
    <span class="overlay-tag">Ruta 05</span>
    <h3>🌽 Elotes y Olé</h3>
    <p>Movete entre los 3 carriles del patio con el mouse, las flechas (A/D) o tocando a los lados. Recogé lo rico del recreo y esquivá lo que te estorba.</p>
    <p class="rules-title">Reglas del juego</p>
    <ul class="rules-list">
      <li class="rule-good"><span class="rule-icon">✅</span> Recogé <strong>🌽 elotes locos</strong>, <strong>🥭 mangos</strong>, <strong>🍧 minutas</strong> y <strong>🍬 dulces</strong> — suman puntos y combo.</li>
      <li class="rule-bad"><span class="rule-icon">❌</span> Evitá <strong>🪑 pupitres</strong>, <strong>⚽ pelotas perdidas</strong> y <strong>🧹 la escoba del conserje</strong> — te quitan una vida y el combo.</li>
    </ul>
    <button class="btn-primary" id="el-start">Continuar</button>`);
  document.getElementById('el-start').onclick = showDifficultySelector;

  gameContent?.addEventListener('gameVisible', (e) => {
    if(e.detail.gameId === 'elotes') {
      isGameVisible = true;
      resizeCanvas();
      if(paused && running) resumeGame();
      else if(running) rafId = requestAnimationFrame(step);
    }
  });

  window.switchGameState('elotes', {
    pause: pauseGame,
    resume: resumeGame,
    stop: () => bgMusic?.pause(),
    running: () => running,
    paused: () => paused,
    setVisible: (visible) => { isGameVisible = visible; }
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