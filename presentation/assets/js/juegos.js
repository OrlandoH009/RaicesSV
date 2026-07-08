/* ============================================================
   RAÍCES SV — juegos-unified.js (CORREGIDO)
   Gestor de tabs y lógica unificada para ambos juegos
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
      // Forzar reflow para asegurar que se oculta
      void content.offsetHeight;
    });

    // Mostrar el juego seleccionado
    const selectedGame = document.getElementById(`game-${gameId}`);
    if(selectedGame) {
      selectedGame.classList.add('active');
      // Forzar reflow
      void selectedGame.offsetHeight;
      
      // Disparar evento personalizado para que el canvas sepa que es visible
      selectedGame.dispatchEvent(new CustomEvent('gameVisible', { detail: { gameId: gameId } }));
    }

    // Actualizar tab activo
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    const clickedTab = e.target.closest('.game-tab-btn');
    clickedTab.classList.add('active');

    // Animar indicador
    updateIndicator(clickedTab);

    // Guardar en localStorage
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

  // Event listeners para tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', switchGame);
  });

  // Inicializar indicador
  window.addEventListener('load', () => {
    const activeTab = document.querySelector('.game-tab-btn.active');
    if(activeTab) {
      updateIndicator(activeTab);
    }
  });

  // Actualizar indicador en resize
  window.addEventListener('resize', () => {
    const activeTab = document.querySelector('.game-tab-btn.active');
    if(activeTab) {
      updateIndicator(activeTab);
    }
  });

  // Guardar referencia global
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
   JUEGO 1: ATRAPA LA PUPUSA
--------------------------------------------------------- */
(function initGamePupusa(){
  const canvas = document.getElementById('canvas-pupusa');
  if(!canvas || typeof Matter === 'undefined') return;

  const { Engine, World, Bodies, Body, Events } = Matter;
  const ctx = canvas.getContext('2d');
  const CW = canvas.width, CH = canvas.height;

  const hud = document.getElementById('hud-pupusa');
  const overlay = document.getElementById('overlay-pupusa');
  const overlayCard = document.getElementById('overlay-card-pupusa');
  const gameContent = document.getElementById('game-pupusa');

  let gameDifficulty = null;
  let gameConfig = {
    easy: { gravity: 0.35, spawnIntervalMin: 2000, spawnIntervalMax: 3000, timeLimit: 40, initialLives: 4 },
    hard: { gravity: 0.65, spawnIntervalMin: 1200, spawnIntervalMax: 2000, timeLimit: 30, initialLives: 3 }
  };

  function showOverlay(html){
    overlayCard.innerHTML = html;
    overlay.classList.remove('hidden');
    if(window.gsap){
      gsap.fromTo(overlayCard,
        { autoAlpha: 0, y: 18, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(2)' }
      );
      gsap.fromTo(overlay,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.45, ease: 'power1.out' }
      );
    }
  }
  function hideOverlay(){ overlay.classList.add('hidden'); }
  function clearCanvas(){ ctx.clearRect(0,0,CW,CH); }
  function drawEmoji(emoji, x, y, size, angle){
    ctx.save();
    ctx.translate(x,y);
    ctx.rotate(angle||0);
    ctx.font = size+'px serif';
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

  function animateHeartLoss(){
    if(!window.gsap) return;
    const hearts = Array.from(document.querySelectorAll('#hud-pupusa .heart'));
    const broken = hearts.filter(h=>h.classList.contains('broken'));
    const lastBroken = broken[broken.length - 1];
    if(lastBroken){
      gsap.fromTo(lastBroken,
        { scale: 1.6, rotate: -15, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.45, ease: 'back.out(2)' }
      );
    }
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

  const paddleY = CH - 60;
  const paddle = Bodies.rectangle(CW/2, paddleY, 130, 22, { isStatic:true, label:'comal' });
  World.add(world, paddle);

  let mouseX = CW/2;
  canvas.addEventListener('mousemove', e=>{
    const r = canvas.getBoundingClientRect();
    mouseX = (e.clientX - r.left) * (CW/r.width);
  });
  canvas.addEventListener('touchmove', e=>{
    const r = canvas.getBoundingClientRect();
    mouseX = (e.touches[0].clientX - r.left) * (CW/r.width);
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
    if(!gameDifficulty) return 1800;
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
      gsap.fromTo(canvas,
        { x: -4 },
        { x: 0, duration: 0.25, ease: 'power1.out' }
      );
    }
  }

  function animateScore(points){
    if(!window.gsap) return;
    const scoreEl = document.getElementById('p-score');
    if(!scoreEl) return;
    
    gsap.fromTo(scoreEl,
      { scale: 1, color: 'var(--gold-hover)' },
      { scale: 1.2, duration: 0.3, ease: 'back.out(2)' }
    );
    gsap.to(scoreEl,
      { scale: 1, color: 'var(--gold-hover)', duration: 0.25, ease: 'power2.out', delay: 0.1 }
    );
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
    const isBad = Math.random() < 0.28;
    const set = isBad ? BAD : GOOD;
    const item = set[Math.floor(Math.random()*set.length)];
    const x = 40 + Math.random()*(CW-80);
    const body = Bodies.circle(x, -20, 24, {
      restitution:0.1, friction:0.6, frictionAir: 0.012, label: isBad ? 'bad' : 'good'
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
        animateScore(item.points);
        if(item.points < 0){
          lives -= 1;
          updateHud();
          animateHeartLoss();
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
        if(b.velocity.y > 3.1){ Body.setVelocity(b, { x: b.velocity.x, y: 3.1 }); }
        if(b.position.y > CH+40){
          World.remove(world, b);
          if(b.label==='good'){
            lives -= 1;
            updateHud();
            animateHeartLoss();
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

    Body.setPosition(paddle, { x: Math.max(65, Math.min(CW-65, mouseX)), y: paddleY });
    updateHud();

    if(lives <= 0 || timeLeft <= 0){
      running = false;
      endGame();
      return;
    }

    clearCanvas();
    ctx.fillStyle = '#5a4634';
    ctx.fillRect(0, CH-20, CW, 20);
    for(const b of world.bodies){
      if(b.label==='comal'){
        ctx.save();
        ctx.translate(b.position.x,b.position.y);
        ctx.fillStyle = '#3a3226';
        ctx.beginPath();
        ctx.ellipse(0,0,68,11,0,0,Math.PI*2);
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
    
    let text = score >= 85 ? '🏆 ¡Sos toda una maestra pupusera!' :
               score >= 45 ? '🌟 Nada mal, ya casi cocinás como abuela.' :
               '👍 Buen intento, seguí practicando.';
    
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
    
    if(window.gsap){
      gsap.from(canvas, { scale: 0.95, opacity: 0, duration: 0.4, ease: 'back.out(2)' });
    }
    
    rafId = requestAnimationFrame(step);
  }

  function showDifficultySelector(){
    showOverlay(`
      <span class="overlay-tag">Elegí tu dificultad</span>
      <h3>🎮 Elige el Nivel</h3>
      <p>¿Listos para atrapar pupusas? Seleccioná la dificultad:</p>
      <div class="difficulty-buttons">
        <button class="difficulty-btn easy" id="btn-easy">
          🟢 Fácil
          <div class="difficulty-desc">Caída lenta, más tiempo</div>
        </button>
        <button class="difficulty-btn hard" id="btn-hard">
          🔴 Difícil
          <div class="difficulty-desc">Caída rápida, pocos segundos</div>
        </button>
      </div>`);
    
    document.getElementById('btn-easy').onclick = ()=>{
      gameDifficulty = 'easy';
      totalLives = gameConfig.easy.initialLives;
      engine.gravity.y = gameConfig.easy.gravity;
      if(window.gsap) gsap.to('#btn-easy', { scale: 1.05, duration: 0.2 });
      setTimeout(()=>{ start(); }, 100);
    };
    
    document.getElementById('btn-hard').onclick = ()=>{
      gameDifficulty = 'hard';
      totalLives = gameConfig.hard.initialLives;
      engine.gravity.y = gameConfig.hard.gravity;
      if(window.gsap) gsap.to('#btn-hard', { scale: 1.05, duration: 0.2 });
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
      <li>Si una pupusa, un quesillo o un elote toca el suelo sin que lo atrapés, también perdés una vida.</li>
      <li>Seleccioná tu nivel de dificultad al empezar.</li>
    </ul>
    <button class="btn-primary" id="p-start">Continuar</button>`);
  
  document.getElementById('p-start').onclick = showDifficultySelector;

  if(window.gsap){
    gsap.from('.hud--overlay', { y: -20, opacity: 0, duration: 0.8, ease: 'power3.out' });
    gsap.from('.canvas-controls', { y: -18, opacity: 0, duration: 0.8, delay: 0.1, ease: 'back.out(2)' });
  }

  clearCanvas();
  ctx.fillStyle = '#5a4634';
  ctx.fillRect(0, CH-20, CW, 20);
  drawEmoji('🫓', CW/2, CH/2-40, 60, 0);

  // Escuchar cuando el juego es visible/invisible
  gameContent?.addEventListener('gameVisible', (e) => {
    if(e.detail.gameId === 'pupusa') {
      isGameVisible = true;
      if(paused && running) {
        resumeGame();
      } else if(running) {
        rafId = requestAnimationFrame(step);
      }
    }
  });

  // Observar cuando el contenido se oculta
  const observer = new MutationObserver(() => {
    isGameVisible = gameContent?.classList.contains('active') || false;
  });

  if(gameContent) {
    observer.observe(gameContent, { attributes: true, attributeFilter: ['class'] });
  }

  // Guardar estado del juego para poder pausarlo
  window.switchGameState('pupusa', {
    pause: pauseGame,
    resume: resumeGame,
    stop: stopMusic,
    running: () => running,
    setVisible: (visible) => { isGameVisible = visible; }
  });
})();

/* ---------------------------------------------------------
   JUEGO 2: BATALLA DE TROMPOS
--------------------------------------------------------- */
(function initGameTrompos(){
  const canvas = document.getElementById('canvas-trompos');
  if(!canvas || typeof Matter === 'undefined') return;

  const { Engine, World, Bodies, Body, Events } = Matter;
  const ctx = canvas.getContext('2d');
  const CW = canvas.width, CH = canvas.height;

  const hud = document.getElementById('hud-trompos');
  const overlay = document.getElementById('overlay-trompos');
  const overlayCard = document.getElementById('overlay-card-trompos');
  const gameContent = document.getElementById('game-trompos');

  let gameMode = null;
  let npcDifficulty = null;
  let isGameVisible = true;
  
  let gameConfig = {
    npc: {
      easy: { speed: 1.2, precision: 0.2, reaction: 700, moveChance: 0.3 },
      medium: { speed: 2.5, precision: 0.45, reaction: 400, moveChance: 0.6 },
      hard: { speed: 4.2, precision: 0.75, reaction: 200, moveChance: 0.8 }
    }
  };

  function showOverlay(html){
    overlayCard.innerHTML = html;
    overlay.classList.remove('hidden');
    if(window.gsap){
      gsap.fromTo(overlayCard,
        { autoAlpha: 0, y: 18, scale: 0.96 },
        { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(2)' }
      );
      gsap.fromTo(overlay,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.45, ease: 'power1.out' }
      );
    }
  }
  function hideOverlay(){ overlay.classList.add('hidden'); }
  function clearCanvas(){ ctx.clearRect(0,0,CW,CH); }

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
  world.gravity.y = 0;

  const wallThickness = 15;
  const walls = [
    Bodies.rectangle(CW/2, -wallThickness/2, CW + 100, wallThickness, { isStatic: true, label: 'wall' }),
    Bodies.rectangle(CW/2, CH + wallThickness/2, CW + 100, wallThickness, { isStatic: true, label: 'wall' }),
    Bodies.rectangle(-wallThickness/2, CH/2, wallThickness, CH, { isStatic: true, label: 'wall' }),
    Bodies.rectangle(CW + wallThickness/2, CH/2, wallThickness, CH, { isStatic: true, label: 'wall' })
  ];
  World.add(world, walls);

  const top = {
    body: Bodies.circle(CW/3, CH/3, 16, { restitution: 0.8, friction: 0.05, frictionAir: 0.01, label: 'trompo1' }),
    energy: 100,
    maxEnergy: 100,
    angle: 0,
    color: '#3c8c5a'
  };
  
  const bottom = {
    body: Bodies.circle(2*CW/3, 2*CH/3, 16, { restitution: 0.8, friction: 0.05, frictionAir: 0.01, label: 'trompo2' }),
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
  const COLLISION_COOLDOWN = 300; // ms entre colisiones

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

  function animateImpact(x, y){
    if(!window.gsap) return;
    const impactEl = document.createElement('div');
    impactEl.style.position = 'absolute';
    impactEl.style.pointerEvents = 'none';
    impactEl.style.fontSize = '40px';
    impactEl.textContent = '⚡';
    document.getElementById('trompos-canvas-wrap').appendChild(impactEl);

    const rect = canvas.getBoundingClientRect();
    const screenX = rect.left + (x / CW) * rect.width;
    const screenY = rect.top + (y / CH) * rect.height;

    gsap.fromTo(impactEl,
      { x: screenX, y: screenY, opacity: 1, scale: 0 },
      { opacity: 0, scale: 2, y: screenY - 40, duration: 0.6, ease: 'power2.out', onComplete: () => {
        impactEl.remove();
      }}
    );
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
      
      // Decidir aleatoriamente si el NPC se mueve o no (según moveChance)
      if(Math.random() > config.moveChance){
        // No hacer nada, dejar que se ralentice
        return;
      }
      
      if(distance > 50){
        // Seguir al jugador con precisión variable
        const targetX = bottom.body.position.x + (distX * config.precision);
        const targetY = bottom.body.position.y + (distY * config.precision);
        
        const moveX = (targetX - bottom.body.position.x) * 0.06;
        const moveY = (targetY - bottom.body.position.y) * 0.06;
        
        Body.setVelocity(bottom.body, { x: moveX * config.speed, y: moveY * config.speed });
      } else {
        // Movimiento evasivo cuando está cerca
        const angle = Math.random() * Math.PI * 2;
        Body.setVelocity(bottom.body, {
          x: Math.cos(angle) * config.speed * 0.8,
          y: Math.sin(angle) * config.speed * 0.8
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
        
        // Solo aplicar daño si pasó el tiempo de cooldown
        if(now - lastCollisionTime > COLLISION_COOLDOWN){
          lastCollisionTime = now;
          
          // Calcular velocidad de impacto
          const relVelX = top.body.velocity.x - bottom.body.velocity.x;
          const relVelY = top.body.velocity.y - bottom.body.velocity.y;
          const impactForce = Math.sqrt(relVelX * relVelX + relVelY * relVelY);
          
          // Daño proporcional al impacto (mínimo 2, máximo 8)
          const damage = Math.min(8, Math.max(2, Math.round(impactForce / 2)));
          
          flashDamage();
          animateImpact(pair.activeContacts[0]?.x || CW/2, pair.activeContacts[0]?.y || CH/2);
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
      Body.setVelocity(top.body, { x: moveX1 * 4, y: moveY1 * 4 });
      top.energy = Math.max(0, top.energy - 0.2);
    }
    
    if(gameMode === 'pvp'){
      const moveX2 = (keys['arrowright'] ? 1 : 0) - (keys['arrowleft'] ? 1 : 0);
      const moveY2 = (keys['arrowdown'] ? 1 : 0) - (keys['arrowup'] ? 1 : 0);
      if(moveX2 !== 0 || moveY2 !== 0){
        Body.setVelocity(bottom.body, { x: moveX2 * 4, y: moveY2 * 4 });
        bottom.energy = Math.max(0, bottom.energy - 0.2);
      }
    } else {
      updateNPC(timestamp);
      bottom.energy = Math.max(0, bottom.energy - 0.15);
    }

    top.energy = Math.min(top.maxEnergy, top.energy + 0.08);
    bottom.energy = Math.min(bottom.maxEnergy, bottom.energy + 0.08);

    const p1Speed = Math.sqrt(top.body.velocity.x**2 + top.body.velocity.y**2);
    const p2Speed = Math.sqrt(bottom.body.velocity.x**2 + bottom.body.velocity.y**2);
    top.angle += p1Speed * 0.1;
    bottom.angle += p2Speed * 0.1;

    const maxV = 8;
    if(Math.abs(top.body.velocity.x) > maxV) 
      Body.setVelocity(top.body, { x: Math.sign(top.body.velocity.x) * maxV, y: top.body.velocity.y });
    if(Math.abs(top.body.velocity.y) > maxV) 
      Body.setVelocity(top.body, { x: top.body.velocity.x, y: Math.sign(top.body.velocity.y) * maxV });
    if(Math.abs(bottom.body.velocity.x) > maxV) 
      Body.setVelocity(bottom.body, { x: Math.sign(bottom.body.velocity.x) * maxV, y: bottom.body.velocity.y });
    if(Math.abs(bottom.body.velocity.y) > maxV) 
      Body.setVelocity(bottom.body, { x: bottom.body.velocity.x, y: Math.sign(bottom.body.velocity.y) * maxV });

    if(top.energy <= 0 || top.body.position.y > CH + 50 || top.body.position.x > CW + 50 || top.body.position.x < -50){
      running = false;
      endGame('bottom');
      return;
    }
    if(bottom.energy <= 0 || bottom.body.position.y > CH + 50 || bottom.body.position.x > CW + 50 || bottom.body.position.x < -50){
      running = false;
      endGame('top');
      return;
    }

    updateHud();

    clearCanvas();
    
    ctx.fillStyle = 'rgba(200, 180, 140, 0.15)';
    ctx.fillRect(0, 0, CW, CH);
    
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(CW/2, 0);
    ctx.lineTo(CW/2, CH);
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
    ctx.arc(0, 0, 16, 0, Math.PI*2);
    ctx.fill();

    const gradient = ctx.createLinearGradient(-10, -10, 10, 10);
    gradient.addColorStop(0, 'rgba(255,255,255,0.3)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, 16, 0, Math.PI*2);
    ctx.fill();

    const speed = Math.sqrt(body.velocity.x**2 + body.velocity.y**2);
    if(speed > 1){
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 1;
      for(let i = 0; i < 3; i++){
        ctx.beginPath();
        ctx.moveTo(-16 + i*4, 0);
        ctx.lineTo(-24 + i*4, 0);
        ctx.stroke();
      }
    }

    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.arc(0, 12, 4, 0, Math.PI*2);
    ctx.fill();

    ctx.restore();
  }

  function drawEnergyBar(x, y, energy, color){
    const barWidth = 40;
    const barHeight = 6;
    
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.fillRect(x - barWidth/2, y, barWidth, barHeight);
    
    ctx.fillStyle = color;
    ctx.fillRect(x - barWidth/2, y, (barWidth * energy) / 100, barHeight);
    
    ctx.strokeStyle = 'rgba(0,0,0,0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(x - barWidth/2, y, barWidth, barHeight);
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
        : '🔴 ¡El NPC ha ganado!';

    showOverlay(`
      <span class="overlay-tag">Fin de la Batalla</span>
      <h3>${message}</h3>
      <p>Tu trompo fue derrotado. Afiná tus habilidades y vuelve a intentar.</p>
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
    Body.setPosition(top.body, { x: CW/3, y: CH/3 });
    Body.setPosition(bottom.body, { x: 2*CW/3, y: 2*CH/3 });
    Body.setVelocity(top.body, { x: 0, y: 0 });
    Body.setVelocity(bottom.body, { x: 0, y: 0 });
    
    top.energy = 100;
    bottom.energy = 100;
    top.angle = 0;
    bottom.angle = 0;

    running = true;
    paused = false;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    
    updateHud();
    hideOverlay();
    cancelAnimationFrame(rafId);
    playMusic();

    if(window.gsap){
      gsap.from(canvas, { scale: 0.95, opacity: 0, duration: 0.4, ease: 'back.out(2)' });
    }

    rafId = requestAnimationFrame(step);
  }

  function showDifficultySelector(){
    showOverlay(`
      <span class="overlay-tag">Elige Dificultad</span>
      <h3>🎮 Selecciona tu Desafío</h3>
      <p>¿Cuán rápido es tu trompo?</p>
      <div class="difficulty-buttons">
        <button class="difficulty-btn easy" id="btn-easy-trompos">
          🟢 Fácil
          <div class="difficulty-desc">NPC lento y predecible</div>
        </button>
        <button class="difficulty-btn medium" id="btn-medium-trompos">
          🟡 Normal
          <div class="difficulty-desc">NPC equilibrado</div>
        </button>
        <button class="difficulty-btn hard" id="btn-hard-trompos">
          🔴 Difícil
          <div class="difficulty-desc">NPC muy rápido y preciso</div>
        </button>
      </div>`);
    
    document.getElementById('btn-easy-trompos').onclick = ()=>{
      npcDifficulty = 'easy';
      document.getElementById('p2-label').textContent = '🟢 NPC - Fácil';
      if(window.gsap) gsap.to('#btn-easy-trompos', { scale: 1.05, duration: 0.2 });
      setTimeout(()=>{ start(); }, 100);
    };
    
    document.getElementById('btn-medium-trompos').onclick = ()=>{
      npcDifficulty = 'medium';
      document.getElementById('p2-label').textContent = '🟡 NPC - Normal';
      if(window.gsap) gsap.to('#btn-medium-trompos', { scale: 1.05, duration: 0.2 });
      setTimeout(()=>{ start(); }, 100);
    };
    
    document.getElementById('btn-hard-trompos').onclick = ()=>{
      npcDifficulty = 'hard';
      document.getElementById('p2-label').textContent = '🔴 NPC - Difícil';
      if(window.gsap) gsap.to('#btn-hard-trompos', { scale: 1.05, duration: 0.2 });
      setTimeout(()=>{ start(); }, 100);
    };
  }

  function showModeSelector(){
    showOverlay(`
      <span class="overlay-tag">Selecciona Modo</span>
      <h3>⚡ Batalla de Trompos</h3>
      <p>¿Cómo quieres jugar?</p>
      <div class="mode-buttons">
        <button class="mode-btn pvp" id="btn-pvp-trompos">
          👥 2 Jugadores
          <div class="difficulty-desc">Compite contra un amigo</div>
        </button>
        <button class="mode-btn pve" id="btn-pve-trompos">
          🤖 vs NPC
          <div class="difficulty-desc">Enfrenta la IA</div>
        </button>
      </div>
      <div class="controls-info">
        <strong>Controles:</strong>
        <p><strong>Jugador 1:</strong> W/A/S/D para mover</p>
        <p><strong>Jugador 2:</strong> ↑↓←→ para mover</p>
      </div>`);
    
    document.getElementById('btn-pvp-trompos').onclick = ()=>{
      gameMode = 'pvp';
      document.getElementById('p2-label').textContent = '🔴 Jugador 2';
      if(window.gsap) gsap.to('#btn-pvp-trompos', { scale: 1.05, duration: 0.2 });
      setTimeout(()=>{ start(); }, 100);
    };
    
    document.getElementById('btn-pve-trompos').onclick = ()=>{
      gameMode = 'pve';
      if(window.gsap) gsap.to('#btn-pve-trompos', { scale: 1.05, duration: 0.2 });
      setTimeout(()=>{ showDifficultySelector(); }, 100);
    };
  }

  showOverlay(`
    <span class="overlay-tag">Ruta 02</span>
    <h3>⚡ Batalla de Trompos</h3>
    <p>Prepará tu trompo para la batalla. Controlá su movimiento y vencé a tu oponente.</p>
    <p class="rules-title">Reglas del juego</p>
    <ul class="rules-list">
      <li>El objetivo es derrotar el trompo del oponente.</li>
      <li>Tu trompo pierde energía cuando se mueve. ¡Descansa entre ataques!</li>
      <li>Si un trompo sale de la arena o pierde toda su energía, pierde la batalla.</li>
      <li>Choca contra el trompo rival para debilitarlo.</li>
      <li>Juega en modo 1 vs 1 o contra la IA en diferentes niveles.</li>
    </ul>
    <button class="btn-primary" id="p-start-trompos">Preparar Batalla</button>`);
  
  document.getElementById('p-start-trompos').onclick = showModeSelector;

  if(window.gsap){
    gsap.from('.hud--overlay', { y: -20, opacity: 0, duration: 0.8, ease: 'power3.out' });
    gsap.from('.canvas-controls', { y: -18, opacity: 0, duration: 0.8, delay: 0.1, ease: 'back.out(2)' });
  }

  clearCanvas();
  ctx.fillStyle = 'rgba(200, 180, 140, 0.15)';
  ctx.fillRect(0, 0, CW, CH);
  ctx.fillStyle = '#3c8c5a';
  ctx.font = 'bold 40px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('⚡', CW/3, CH/3);
  ctx.fillStyle = '#d63c3c';
  ctx.fillText('⚡', 2*CW/3, 2*CH/3);

  // Escuchar cuando el juego es visible/invisible
  gameContent?.addEventListener('gameVisible', (e) => {
    if(e.detail.gameId === 'trompos') {
      isGameVisible = true;
      if(paused && running) {
        resumeGame();
      } else if(running) {
        rafId = requestAnimationFrame(step);
      }
    }
  });

  // Observar cuando el contenido se oculta
  const observer = new MutationObserver(() => {
    isGameVisible = gameContent?.classList.contains('active') || false;
  });

  if(gameContent) {
    observer.observe(gameContent, { attributes: true, attributeFilter: ['class'] });
  }

  // Guardar estado del juego
  window.switchGameState('trompos', {
    pause: pauseGame,
    resume: resumeGame,
    stop: stopMusic,
    running: () => running,
    setVisible: (visible) => { isGameVisible = visible; }
  });
})();