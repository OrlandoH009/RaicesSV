/* ============================================================
   RAÍCES SV — juegos.js
   Lógica del minijuego "Atrapa la pupusa" (Matter.js)
   ============================================================ */

/* Reveal on scroll (por si script.js no maneja esta página) */
(function initReveal(){
  const items = document.querySelectorAll('.reveal');
  if(!items.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: .15 });
  items.forEach(el=> io.observe(el));
})();

/* Nota: el menú hamburguesa (drawer) ya lo maneja script.js en todas las
   páginas. Antes había aquí un segundo listener para el burger que chocaba
   con el de script.js: al hacer clic, uno abría el drawer y el otro lo
   cerraba en el mismo instante, por eso el menú "no abría". Se elimina
   para dejar que script.js sea la única fuente de verdad. */

/* Botón de pantalla completa (reutilizable para ambos juegos) */
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
   JUEGO: ATRAPA LA PUPUSA
--------------------------------------------------------- */
(function initGame(){
  const canvas = document.getElementById('canvas');
  if(!canvas || typeof Matter === 'undefined') return;

  const { Engine, World, Bodies, Body, Events } = Matter;
  const ctx = canvas.getContext('2d');
  const CW = canvas.width, CH = canvas.height;

  const hud = document.getElementById('hud');
  const overlay = document.getElementById('overlay');
  const overlayCard = document.getElementById('overlay-card');

  function showOverlay(html){ overlayCard.innerHTML = html; overlay.classList.remove('hidden'); }
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

  hud.innerHTML = `
    <div class="hud-item">Puntos<b id="p-score">0</b></div>
    <div class="hud-item">Vidas<b id="p-lives">3</b></div>
    <div class="hud-item">Tiempo<b id="p-time">30</b></div>`;

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
    return 1600 + Math.random()*250; // 1.6s – 2.5s entre objetos: más jugable
  }

  /* ── Música de fondo ── */
  const bgMusic = document.getElementById('bgMusic');
  const muteBtn = document.getElementById('muteBtn');
  const muteIcon = document.getElementById('muteIcon');
  let muted = false;

  muteBtn?.addEventListener('click', ()=>{
    muted = !muted;
    if(bgMusic) bgMusic.muted = muted;
    if(muteIcon) muteIcon.textContent = muted ? '🔇' : '🔊';
  });

  function playMusic(){
    if(!bgMusic) return;
    bgMusic.muted = muted;
    bgMusic.currentTime = 0;
    bgMusic.play().catch(()=>{ /* el navegador puede bloquear el autoplay; se ignora */ });
  }
  function stopMusic(){
    if(!bgMusic) return;
    bgMusic.pause();
  }

  /* ── Pausa ── */
  const canvasWrap = canvas.closest('.canvas-wrap');
  const pauseBtn = document.getElementById('pauseBtn');
  const pauseIcon = document.getElementById('pauseIcon');
  const pauseOverlay = document.getElementById('pauseOverlay');
  const resumeBtn = document.getElementById('resumeBtn');

  function pauseGame(){
    if(!running) return; // no hay partida activa para pausar
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
    lastTime = null; // evita un salto grande de tiempo tras la pausa
    lastDelta = 1000/60;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    if(!muted) bgMusic?.play().catch(()=>{});
    rafId = requestAnimationFrame(step);
  }

  pauseBtn?.addEventListener('click', ()=>{
    if(paused) resumeGame(); else pauseGame();
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
        if(item.points < 0){ lives -= 1; }
        World.remove(world, item);
      }
    }
  });

  function step(timestamp){
    if(!running) return;
    if(lastTime === null) lastTime = timestamp;
    // ms reales desde el último frame (con piso/techo para evitar saltos si
    // la pestaña estuvo inactiva o el navegador tuvo un frame raro)
    const dt = Math.min(Math.max(timestamp - lastTime, 1), 100);
    lastTime = timestamp;

    // Antes se llamaba Engine.update(engine, 1000/60) SIEMPRE, como si cada
    // cuadro durara exactamente 1/60s. En equipos con menos FPS (o pantallas
    // más lentas) cada cuadro real tarda MÁS que eso, así que la física
    // avanzaba menos tiempo simulado del que en verdad pasaba y todo se veía
    // en cámara lenta. Ahora se le pasa el tiempo real transcurrido (dt) más
    // un factor de corrección, que es lo que Matter.js recomienda para que
    // la simulación se vea igual de rápida sin importar los FPS del equipo.
    const correction = dt / lastDelta;
    Engine.update(engine, dt, correction);
    lastDelta = dt;

    for(const b of [...world.bodies]){
      if(b.label==='good' || b.label==='bad'){
        if(b.velocity.y > 3.1){ Body.setVelocity(b, { x: b.velocity.x, y: 3.1 }); }
        if(b.position.y > CH+40){
          World.remove(world, b);
          if(b.label==='good'){ lives -= 1; }
        }
      }
    }

    // Aparición de objetos basada en tiempo real (no en frames), para que
    // la cadencia sea igual en cualquier pantalla, sin importar los FPS.
    spawnAccum += dt;
    if(spawnAccum >= nextSpawnIn){
      spawnAccum = 0;
      nextSpawnIn = randomSpawnInterval();
      spawn();
    }

    // Temporizador basado en tiempo real: antes contaba frames (60 = 1s),
    // lo que hacía que en pantallas de alta frecuencia (120Hz, 144Hz) el
    // tiempo corriera más rápido de lo debido. Ahora usa milisegundos reales.
    clockAccum += dt;
    while(clockAccum >= 1000 && timeLeft > 0){
      clockAccum -= 1000;
      timeLeft -= 1;
    }
    document.getElementById('p-time').textContent = Math.max(0, timeLeft);

    Body.setPosition(paddle, { x: Math.max(65, Math.min(CW-65, mouseX)), y: paddleY });

    document.getElementById('p-score').textContent = score;
    document.getElementById('p-lives').textContent = Math.max(0,lives);

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
    let text = score >= 85 ? '¡Sos toda una maestra pupusera!' :
               score >= 45 ? 'Nada mal, ya casi cocinás como abuela.' :
               'Bueno, para reponer pupusas hay que practicar más.';
    showOverlay(`
      <span class="overlay-tag">Se acabó el comal</span>
      <h3>¡Fin del juego!</h3>
      <div class="overlay-score">${score} pts</div>
      <p>${text}</p>
      <button class="btn-primary" id="p-restart">Jugar de nuevo</button>`);
    document.getElementById('p-restart').onclick = start;
  }

  function start(){
    for(const b of [...world.bodies]) if(b.label==='good'||b.label==='bad') World.remove(world,b);
    score=0; lives=3; timeLeft=30; running=true; paused=false;
    canvasWrap?.classList.remove('is-paused');
    pauseOverlay?.classList.add('hidden');
    if(pauseIcon) pauseIcon.textContent = '⏸️';
    lastTime = null; lastDelta = 1000/60; spawnAccum = 0; clockAccum = 0; nextSpawnIn = randomSpawnInterval();
    document.getElementById('p-score').textContent = 0;
    document.getElementById('p-lives').textContent = 3;
    document.getElementById('p-time').textContent = 30;
    hideOverlay();
    cancelAnimationFrame(rafId);
    playMusic();
    rafId = requestAnimationFrame(step);
  }

  showOverlay(`
    <span class="overlay-tag">Ruta 01</span>
    <h3>🫓 Atrapa la pupusa</h3>
    <p>Mové el comal de un lado a otro con el mouse (o el dedo) para atrapar lo que cae del cielo.</p>
    <p class="rules-title">Reglas del juego</p>
    <ul class="rules-list">
      <li class="rule-good"><span class="rule-icon">✅</span> Atrapá <strong>🫓 pupusas</strong>, <strong>🧀 quesillo</strong> y <strong>🌽 elotes</strong> — suman puntos.</li>
      <li class="rule-bad"><span class="rule-icon">❌</span> Evitá <strong>🩴 chanclas</strong>, <strong>🪨 piedras</strong> y <strong>🦴 huesos</strong> — te quitan una vida.</li>
      <li>Si una pupusa, un quesillo o un elote toca el suelo sin que lo atrapés, también perdés una vida.</li>
      <li>Tenés 3 vidas y 30 segundos. ¡Sumá la mayor cantidad de puntos posible!</li>
    </ul>
    <button class="btn-primary" id="p-start">Empezar</button>`);
  document.getElementById('p-start').onclick = start;

  clearCanvas();
  ctx.fillStyle = '#5a4634';
  ctx.fillRect(0, CH-20, CW, 20);
  drawEmoji('🫓', CW/2, CH/2-40, 60, 0);
})();