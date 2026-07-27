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
    const scrollAmount = () => list.clientWidth * 0.6;

    prevBtn.addEventListener('click', () => {
      list.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      list.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    });

    function updateArrows() {
      const maxScroll = list.scrollWidth - list.clientWidth - 2;
      prevBtn.disabled = list.scrollLeft <= 0;
      nextBtn.disabled = list.scrollLeft >= maxScroll;
    }
    list.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    updateArrows();
  }

  document.querySelectorAll('.info-panel.active .reveal').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 200);
  });
});