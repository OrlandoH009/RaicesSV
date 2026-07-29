/* ============================================================
  Salvadorean Roots — tabs.js
   Lógica de cambio de tabs + carrusel deslizable
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels  = document.querySelectorAll('.info-panel');
  const list    = document.getElementById('tabsList');
  const prevBtn = document.getElementById('tabsPrev');
  const nextBtn = document.getElementById('tabsNext');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach(p => {
        p.classList.remove('active');
        if (p.id === `tab-${target}`) {
          p.classList.add('active');
          p.querySelectorAll('.reveal').forEach(el => {
            el.classList.remove('visible');
            setTimeout(() => el.classList.add('visible'), 50);
          });
        }
      });

      // Centrar el tab activo dentro del carrusel
      if (list) {
        const listRect = list.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        const offset = (btnRect.left + btnRect.width / 2) - (listRect.left + listRect.width / 2);
        list.scrollBy({ left: offset, behavior: 'smooth' });
      }

      const activePanel = document.getElementById(`tab-${target}`);
      if (activePanel) {
        const offset = activePanel.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  // Flechas de navegación del carrusel
  if (list && prevBtn && nextBtn) {
    // Forzar posición inicial: la barra siempre debe arrancar mostrando el primer tab.
    list.scrollLeft = 0;
    requestAnimationFrame(() => { list.scrollLeft = 0; });
    window.addEventListener('load', () => { list.scrollLeft = 0; });

    const btns = Array.from(list.querySelectorAll('.tab-btn'));

    function currentIndex() {
      const listRect = list.getBoundingClientRect();
      const center = listRect.left + listRect.width / 2;
      let closest = 0;
      let closestDist = Infinity;
      btns.forEach((b, i) => {
        const r = b.getBoundingClientRect();
        const bCenter = r.left + r.width / 2;
        const dist = Math.abs(bCenter - center);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      return closest;
    }

    function scrollToIndex(i) {
      const clamped = Math.max(0, Math.min(btns.length - 1, i));
      const btn = btns[clamped];
      if (!btn) return;
      const listRect = list.getBoundingClientRect();
      const btnRect = btn.getBoundingClientRect();
      const offset = (btnRect.left + btnRect.width / 2) - (listRect.left + listRect.width / 2);
      list.scrollBy({ left: offset, behavior: 'smooth' });
    }

    prevBtn.addEventListener('click', () => {
      scrollToIndex(currentIndex() - 1);
    });
    nextBtn.addEventListener('click', () => {
      scrollToIndex(currentIndex() + 1);
    });

    function updateArrows() {
      const maxScroll = list.scrollWidth - list.clientWidth - 2;
      prevBtn.disabled = list.scrollLeft <= 0;
      nextBtn.disabled = list.scrollLeft >= maxScroll;
    }
    list.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    updateArrows();

    // Recalcular después de que corran animaciones de entrada (GSAP .reveal, etc.)
    // que pueden dejar el carrusel con un ancho incorrecto en el primer render
    // y bloquear las flechas / el scroll hacia las últimas tabs.
    setTimeout(updateArrows, 300);
    setTimeout(updateArrows, 1000);
    window.addEventListener('load', updateArrows);
  }

  document.querySelectorAll('.info-panel.active .reveal').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 200);
  });
});