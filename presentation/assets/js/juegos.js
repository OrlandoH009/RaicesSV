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
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 480; // Altura panorámica cómoda para que no estorbe verticalmente
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
   JUEGO 2: BATALLA DE TROMPOS (OPTIMIZADO ANTI-BLUR)
--------------------------------------------------------- */
(function initGameTrompos(){
  const canvas = document.getElementById('canvas-trompos');
  if(!canvas || typeof Matter === 'undefined') return;

  // AJUSTE CLAVE ANTI-BLUR: Resolución interna dinámica
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = 480; // Panorámica uniforme
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
  
  // DIFICULTAD INCREMENTADA: Se aumentó considerablemente la velocidad y precisión de la IA
  let gameConfig = {
    npc: {
      easy: { speed: 2.2, precision: 0.4, reaction: 500, moveChance: 0.5 },
      medium: { speed: 3.8, precision: 0.65, reaction: 300, moveChance: 0.75 },
      hard: { speed: 5.5, precision: 0.9, reaction: 120, moveChance: 0.95 }
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
      <b id="round">1</b>
    </div>`;

  function updateHud(){
    const p1El = document.getElementById('p1-energy');
    const p2El = document.getElementById('p2-energy');
    if(p1El) p1El.textContent = Math.max(0, Math.round(top.energy)) + '%';
    if(p2El) p2El.textContent = Math.max(0, Math.round(bottom.energy)) + '%';
  }

  const engine = Engine.create();
  engine.gravity.y = 0;
  engine.enableSleeping = false;
  const world = engine.world;

  // Paredes dinámicas recalculadas al tamaño real del lienzo 85% ancho
  let walls = [];
  function setupWalls() {
    if(walls.length) World.remove(world, walls);
    const wallThickness = 40;
    walls = [
      Bodies.rectangle(canvas.width/2, -wallThickness/2, canvas.width + 100, wallThickness, { isStatic: true, label: 'wall' }),
      Bodies.rectangle(canvas.width/2, canvas.height + wallThickness/2, canvas.width + 100, wallThickness, { isStatic: true, label: 'wall' }),
      Bodies.rectangle(-wallThickness/2, canvas.height/2, wallThickness, canvas.height, { isStatic: true, label: 'wall' }),
      Bodies.rectangle(canvas.width + wallThickness/2, canvas.height/2, wallThickness, canvas.height, { isStatic: true, label: 'wall' })
    ];
    World.add(world, walls);
  }

  const top = {
    body: Bodies.circle(150, 240, 18, { restitution: 0.85, friction: 0.02, frictionAir: 0.008, label: 'trompo1' }),
    energy: 100,
    maxEnergy: 100,
    angle: 0,
    color: '#3c8c5a'
  };
  
  const bottom = {
    body: Bodies.circle(550, 240, 18, { restitution: 0.85, friction: 0.02, frictionAir: 0.008, label: 'trompo2' }),
    energy: 100,
    maxEnergy: 100,
    angle: 0,
    color: '#d63c3c'
  };

  World.add(world, [top.body, bottom.body]);

  let keys = {};
  window.addEventListener('keydown', e => keys[e.key.toLowerCase()] = true);
  window.addEventListener('keyup', e => keys[e.key.toLowerCase()] = false);

  let npcLastAction = 0;
  let lastCollisionTime = 0;
  const COLLISION_COOLDOWN = 250;

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
        { opacity: 0.4 },
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
      
      if(distance > 40){
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
          const relVelX = top.body.velocity.x - bottom.body.velocity.x;
          const relVelY = top.body.velocity.y - bottom.body.velocity.y;
          const impactForce = Math.sqrt(relVelX * relVelX + relVelY * relVelY);
          
          const damage = Math.min(15, Math.max(4, Math.round(impactForce * 1.5)));
          
          flashDamage();
          top.energy -= damage;
          bottom.energy -= damage;
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
      Body.setVelocity(top.body, { x: moveX1 * 5, y: moveY1 * 5 });
      top.energy = Math.max(0, top.energy - 0.25);
    }
    
    if(gameMode === 'pvp'){
      const moveX2 = (keys['arrowright'] ? 1 : 0) - (keys['arrowleft'] ? 1 : 0);
      const moveY2 = (keys['arrowdown'] ? 1 : 0) - (keys['arrowup'] ? 1 : 0);
      if(moveX2 !== 0 || moveY2 !== 0){
        Body.setVelocity(bottom.body, { x: moveX2 * 5, y: moveY2 * 5 });
        bottom.energy = Math.max(0, bottom.energy - 0.25);
      }
    } else {
      updateNPC(timestamp);
      bottom.energy = Math.max(0, bottom.energy - 0.2);
    }

    top.energy = Math.min(top.maxEnergy, top.energy + 0.1);
    bottom.energy = Math.min(bottom.maxEnergy, bottom.energy + 0.1);

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

    if(top.energy <= 0 || top.body.position.y > canvas.height + 60 || top.body.position.x > canvas.width + 60 || top.body.position.x < -60){
      running = false;
      endGame('bottom');
      return;
    }
    if(bottom.energy <= 0 || bottom.body.position.y > canvas.height + 60 || bottom.body.position.x > canvas.width + 60 || bottom.body.position.x < -60){
      running = false;
      endGame('top');
      return;
    }

    updateHud();
    clearCanvas();
    
    ctx.fillStyle = 'rgba(200, 180, 140, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    drawTrompo(top.body, top.angle, top.color, top.energy);
    drawTrompo(bottom.body, bottom.angle, bottom.color, bottom.energy);

    drawEnergyBar(top.body.position.x, top.body.position.y - 40, top.energy, '#3c8c5a');
    drawEnergyBar(bottom.body.position.x, bottom.body.position.y - 40, bottom.energy, '#d63c3c');

    rafId = requestAnimationFrame(step);
  }

  function drawTrompo(body, angle, color, energy){
    ctx.save();
    ctx.translate(body.position.x, body.position.y);
    ctx.rotate(angle);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI*2);
    ctx.fill();

    const gradient = ctx.createLinearGradient(-10, -10, 10, 10);
    gradient.addColorStop(0, 'rgba(255,255,255,0.45)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI*2);
    ctx.fill();

    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath();
    ctx.arc(0, 14, 4, 0, Math.PI*2);
    ctx.fill();

    ctx.restore();
  }

  function drawEnergyBar(x, y, energy, color){
    const barWidth = 45;
    const barHeight = 6;
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(x - barWidth/2, y, barWidth, barHeight);
    ctx.fillStyle = color;
    ctx.fillRect(x - barWidth/2, y, (barWidth * energy) / 100, barHeight);
  }

  function endGame(winner){
    stopMusic();
    paused = false;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';

    let message = winner === 'top' 
      ? '🟢 ¡Jugador 1 gana la batalla!' 
      : gameMode === 'pvp' 
        ? '🔴 ¡Jugador 2 gana la batalla!' 
        : '🔴 ¡El NPC salvadoreño te ha derrotado!';

    showOverlay(`
      <span class="overlay-tag">Fin de la Batalla</span>
      <h3>${message}</h3>
      <p>Tu trompo fue derrotado. ¡Afiná tus movimientos para la revancha!</p>
      <button class="btn-primary" id="p-restart">Otra Batalla</button>`);
    
    document.getElementById('p-restart').onclick = showModeSelector;
  }

  const canvasWrap = canvas.closest('.canvas-wrap');
  const pauseBtn = document.getElementById('pauseBtn-trompos');
  const pauseIcon = document.getElementById('pauseIcon-trompos');
  const pauseOverlay = document.getElementById('pauseOverlay-trompos');
  const resumeBtn = document.getElementById('resumeBtn-trompos');

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

  pauseBtn?.addEventListener('click', ()=>{
    if(!running && !paused) start();
    else if(paused) resumeGame();
    else pauseGame();
  });
  resumeBtn?.addEventListener('click', resumeGame);

  function start(){
    resizeCanvas();
    setupWalls();
    Body.setPosition(top.body, { x: 150, y: canvas.height/2 });
    Body.setPosition(bottom.body, { x: canvas.width - 150, y: canvas.height/2 });
    Body.setVelocity(top.body, { x: 0, y: 0 });
    Body.setVelocity(bottom.body, { x: 0, y: 0 });
    
    top.energy = 100;
    bottom.energy = 100;

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
      <p>El NPC ahora es mucho más veloz y preciso. ¿Podrás ganarle?</p>
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
          <div class="difficulty-desc">Enfrenta la IA mejorada</div>
        </button>
      </div>`);
    
    document.getElementById('btn-pvp-trompos').onclick = ()=>{
      gameMode = 'pvp';
      document.getElementById('p2-label').textContent = '🔴 Jugador 2';
      setTimeout(()=>{ start(); }, 100);
    };
    
    document.getElementById('btn-pve-trompos').onclick = ()=>{
      gameMode = 'pve';
      setTimeout(()=>{ showDifficultySelector(); }, 100);
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