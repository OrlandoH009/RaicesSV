/* ============================================================
   RAÍCES SV — juegos.js (SÚPER NÍTIDO, 85% ANCHO, DIFICULTAD EXTRA)
   Gestor de tabs, lógica de overlays y juego de alta respuesta
   ============================================================ */

/* Sistema de Tabs */
(function initGameTabs(){
  const tabs = document.querySelectorAll('.game-tab-btn');
  const tabIndicator = document.querySelector('.tab-indicator');
  const gameContents = document.querySelectorAll('.game-content');
  let gameStates = {};

  function switchGame(e) {
    const gameId = e.target.closest('.game-tab-btn').dataset.game;
    
    // Pausar juego anterior si está corriendo
    const currentActive = document.querySelector('.game-content.active');
    if(currentActive) {
      const currentGameId = currentActive.id.split('-')[1];
      if(gameStates[currentGameId] && gameStates[currentGameId].pause) {
        gameStates[currentGameId].pause();
      }
    }

    // Ocultar todos los juegos
    gameContents.forEach(content => {
      content.classList.remove('active');
      void content.offsetHeight;
    });

    // Mostrar el juego seleccionado
    const selectedGame = document.getElementById(`game-${gameId}`);
    if(selectedGame) {
      selectedGame.classList.add('active');
      void selectedGame.offsetHeight;
      
      // Disparar evento personalizado
      selectedGame.dispatchEvent(new CustomEvent('gameVisible', { detail: { gameId: gameId } }));
    }

    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    const clickedTab = e.target.closest('.game-tab-btn');
    clickedTab.classList.add('active');

    updateIndicator(clickedTab);
    localStorage.setItem('lastGame', gameId);
  }

  function updateIndicator(activeTab) {
    if(!tabIndicator || !activeTab) return;
    
    const tabWidth = activeTab.offsetWidth;
    const tabOffset = activeTab.offsetLeft;
    
    gsap.to(tabIndicator, {
      width: tabWidth,
      left: tabOffset,
      duration: 0.4,
      ease: 'power2.out'
    });
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', switchGame);
  });

  window.addEventListener('load', () => {
    const activeTab = document.querySelector('.game-tab-btn.active');
    if(activeTab) {
      updateIndicator(activeTab);
    }
  });

  window.addEventListener('resize', () => {
    const activeTab = document.querySelector('.game-tab-btn.active');
    if(activeTab) {
      updateIndicator(activeTab);
    }
  });

  window.gameStates = gameStates;
  window.switchGameState = function(gameId, state) {
    gameStates[gameId] = state;
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

/* Fullscreen buttons */
(function initFullscreenButtons(){
  const buttons = document.querySelectorAll('.fullscreen-btn');
  if(!buttons.length) return;

  buttons.forEach(btn=>{
    const wrap = btn.closest('.canvas-wrap');
    if(!wrap) return;
    btn.addEventListener('click', ()=>{
      const isCurrent = document.fullscreenElement === wrap || document.webkitFullscreenElement === wrap;
      if(!isCurrent){
        const req = wrap.requestFullscreen || wrap.webkitRequestFullscreen || wrap.msRequestFullscreen;
        req?.call(wrap);
      } else {
        const exit = document.exitFullscreen || document.webkitExitFullscreen || document.msExitFullscreen;
        exit?.call(document);
      }
    });
  });

  function syncFullscreenClass(){
    const fsEl = document.fullscreenElement || document.webkitFullscreenElement || null;
    document.querySelectorAll('.canvas-wrap').forEach(wrap=>{
      wrap.classList.toggle('is-fullscreen', wrap === fsEl);
    });
  }
  document.addEventListener('fullscreenchange', syncFullscreenClass);
  document.addEventListener('webkitfullscreenchange', syncFullscreenClass);
})();

/* ---------------------------------------------------------
   JUEGO 1: ATRAPA LA PUPUSA (OPTIMIZADO ANTI-BLUR)
--------------------------------------------------------- */
(function initGamePupusa(){
  const canvas = document.getElementById('canvas-pupusa');
  if(!canvas || typeof Matter === 'undefined') return;

  // AJUSTE CLAVE ANTI-BLUR: Inicializamos la resolución nativa interna para que coincida con el renderizado CSS
// Reemplaza esta función dentro de initGamePupusa()
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height; // Lee dinámicamente el tamaño calculado por el CSS (60vh)
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const { Engine, World, Bodies, Body, Events } = Matter;
  const ctx = canvas.getContext('2d');

  const hud = document.getElementById('hud-pupusa');
  const overlay = document.getElementById('overlay-pupusa');
  const overlayCard = document.getElementById('overlay-card-pupusa');
  const gameContent = document.getElementById('game-pupusa');

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
  function hideOverlay(){ overlay.classList.add('hidden'); }
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

  const canvasWrap = canvas.closest('.canvas-wrap');
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
    if(!running && !paused) start();
    else if(paused) resumeGame();
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
    setVisible: (visible) => { isGameVisible = visible; }
  });
})();

/* ---------------------------------------------------------
   JUEGO 2: BATALLA DE TROMPOS (SELECCIÓN DE RONDAS Y BALANCES)
--------------------------------------------------------- */

(function initGameTrompos(){
  const canvas = document.getElementById('canvas-trompos');
  if(!canvas || typeof Matter === 'undefined') return;

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  const { Engine, World, Bodies, Body, Events } = Matter;
  const ctx = canvas.getContext('2d');

  const hud = document.getElementById('hud-trompos');
  const overlay = document.getElementById('overlay-trompos');
  const overlayCard = document.getElementById('overlay-card-trompos');
  const gameContent = document.getElementById('game-trompos');

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
  function hideOverlay(){ overlay.classList.add('hidden'); }
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

  const canvasWrap = canvas.closest('.canvas-wrap');
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
    if(!running && !paused) start();
    else if(paused) resumeGame();
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
    setVisible: (visible) => { isGameVisible = visible; }
  });
})();

/* ============================================================
   SISTEMA DE MODALES Y COMPORTAMIENTO DE JUEGOS FLOTANTES
   ============================================================ */
(function initGameModals() {
  const triggers = document.querySelectorAll('[data-open-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const gameId = btn.dataset.openModal;
      const modal = document.getElementById(`modal-${gameId}`);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Evita scroll de fondo

        // Activa el estado visible para el motor del juego y ajusta canvas
        const selectedGame = document.getElementById(`game-${gameId}`) || modal;
        selectedGame.dispatchEvent(new CustomEvent('gameVisible', { detail: { gameId: gameId } }));
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const gameId = btn.dataset.closeModal;
      const modal = document.getElementById(`modal-${gameId}`);
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Devuelve el scroll normal

        // Pausa automática y detención de música al cerrar la ventana flotante
        if (window.gameStates && window.gameStates[gameId]) {
          if (window.gameStates[gameId].pause) window.gameStates[gameId].pause();
          if (window.gameStates[gameId].stop) window.gameStates[gameId].stop();
          if (window.gameStates[gameId].setVisible) window.gameStates[gameId].setVisible(false);
        }
      }
    });
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
  const gameContent = document.getElementById('modal-coasters'); // Vinculado a tu contenedor modal
  
  let isGameVisible = false;
  let running = false;
  let paused = false;
  let rafId = null;

  // Parámetros de Juego
  let botDifficulty = 'easy';
  let targetDistance = 2000; // Metros de carrera
  
  // Jugador y Bot
  let player = { x: 0, y: 0, speed: 0, maxSpeed: 8, lane: 1, targetX: 0, distance: 0, passengers: 0 };
  let bot = { x: 0, y: 0, speed: 0, maxSpeed: 5.5, lane: 2, targetX: 0, distance: 0 };
  
  // Configuración de la carretera
  const lanesCount = 4;
  let laneWidth = 0;
  let roadY = 0; // Desplazamiento del mapa

  // Obstáculos, Pasajeros y Tráfico
  let obstacles = [];
  let passengers = [];
  let trafficCars = [];
  const lanePositions = [];

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    laneWidth = canvas.width / lanesCount;
    for(let i=0; i<lanesCount; i++){
      lanePositions[i] = (i * laneWidth) + (laneWidth / 2);
    }
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

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
  }
  function hideOverlay(){ overlay.classList.add('hidden'); }

  // REINICIO DE ESTADOS (Corregido el orden de asignación de botDifficulty)
  function resetGame() {
    resizeCanvas();
    player.lane = 1;
    player.x = lanePositions[1];
    player.targetX = lanePositions[1];
    player.y = canvas.height - 120;
    player.speed = 0;
    player.distance = 0;
    player.passengers = 0;

    bot.lane = 2;
    bot.x = lanePositions[2];
    bot.targetX = lanePositions[2];
    bot.y = canvas.height - 120;
    bot.speed = 0;
    bot.distance = 0;

    // Se asigna la velocidad adecuada según la dificultad seleccionada
    if (botDifficulty === 'easy') {
      bot.maxSpeed = 5.5;
    } else if (botDifficulty === 'medium') {
      bot.maxSpeed = 7.2;
    } else {
      bot.maxSpeed = 8.8; // Hard
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
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
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
    botDifficulty = difficulty; // 1. Asignamos primero la dificultad seleccionada
    resetGame();                // 2. Reiniciamos parámetros (ahora leerá bien 'medium')
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
  const canvasWrap = document.getElementById('coasters-canvas-wrap');
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

  // Inicializar menú básico
  showModeSelector();

  // Integración perfecta con el selector global de visibilidad de Raíces SV
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
    setVisible: (visible) => { isGameVisible = visible; }
  });
})();
/* ============================================================
   RAÍCES SV — ANIMACIONES GSAP CORREGIDAS
   ============================================================ */
/* ============================================================
   RAÍCES SV — ENTRADA CON GSAP (HOVER EN CSS)
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