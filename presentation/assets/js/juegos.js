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

/* Drawer / burger (por si script.js no maneja esta página) */
(function initDrawer(){
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('navDrawer');
  const overlay = document.getElementById('navOverlay');
  if(!burger || !drawer || !overlay) return;
  function toggle(open){
    burger.classList.toggle('open', open);
    drawer.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
  }
  burger.addEventListener('click', ()=> toggle(!drawer.classList.contains('open')));
  overlay.addEventListener('click', ()=> toggle(false));
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
  engine.gravity.y = 0.9;
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

  let score = 0, lives = 3, timeLeft = 30, running = false, spawnTimer = 0, clockTimer = 0;

  function spawn(){
    const isBad = Math.random() < 0.28;
    const set = isBad ? BAD : GOOD;
    const item = set[Math.floor(Math.random()*set.length)];
    const x = 40 + Math.random()*(CW-80);
    const body = Bodies.circle(x, -20, 24, {
      restitution:0.15, friction:0.6, label: isBad ? 'bad' : 'good'
    });
    body.foodEmoji = item.emoji;
    body.points = item.pts;
    Body.setAngularVelocity(body, (Math.random()-0.5)*0.15);
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

  function step(){
    if(!running) return;
    Engine.update(engine, 1000/60);

    for(const b of [...world.bodies]){
      if(b.label==='good' || b.label==='bad'){
        if(b.position.y > CH+40){
          World.remove(world, b);
          if(b.label==='good'){ lives -= 1; }
        }
      }
    }

    spawnTimer++;
    if(spawnTimer > 55){ spawnTimer = 0; spawn(); }

    clockTimer++;
    if(clockTimer >= 60){
      clockTimer = 0;
      timeLeft -= 1;
      document.getElementById('p-time').textContent = timeLeft;
    }

    Body.setPosition(paddle, { x: Math.max(65, Math.min(CW-65, mouseX)), y: paddleY });

    document.getElementById('p-score').textContent = score;
    document.getElementById('p-lives').textContent = Math.max(0,lives);

    if(lives <= 0 || timeLeft <= 0){
      running = false;
      endGame();
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
    let text = score >= 80 ? '¡Sos toda una maestra pupusera!' :
               score >= 40 ? 'Nada mal, ya casi cocinás como abuela.' :
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
    score=0; lives=3; timeLeft=30; spawnTimer=0; clockTimer=0; running=true;
    document.getElementById('p-score').textContent = 0;
    document.getElementById('p-lives').textContent = 3;
    document.getElementById('p-time').textContent = 30;
    hideOverlay();
    cancelAnimationFrame(rafId);
    step();
  }

  showOverlay(`
    <span class="overlay-tag">Ruta 01</span>
    <h3>🫓 Atrapa la pupusa</h3>
    <p>Mové el comal con el mouse (o el dedo) y atrapá las pupusas antes de que se hagan añicos en el suelo. Ojo con lo que no se come.</p>
    <button class="btn-primary" id="p-start">Empezar</button>`);
  document.getElementById('p-start').onclick = start;

  clearCanvas();
  ctx.fillStyle = '#5a4634';
  ctx.fillRect(0, CH-20, CW, 20);
  drawEmoji('🫓', CW/2, CH/2-40, 60, 0);
})();
