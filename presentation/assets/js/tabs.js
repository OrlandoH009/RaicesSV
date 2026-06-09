/* ============================================================
   RAÍCES SV — tabs.js
   Lógica de cambio de tabs para páginas informativas
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels  = document.querySelectorAll('.info-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      // Actualizar botones
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Mostrar panel correcto
      panels.forEach(p => {
        p.classList.remove('active');
        if (p.id === `tab-${target}`) {
          p.classList.add('active');
          // Re-trigger reveal para el panel nuevo
          p.querySelectorAll('.reveal').forEach(el => {
            el.classList.remove('visible');
            setTimeout(() => el.classList.add('visible'), 50);
          });
        }
      });

      // Scroll suave al panel
      const activePanel = document.getElementById(`tab-${target}`);
      if (activePanel) {
        const offset = activePanel.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  // Activar reveals del panel inicial
  document.querySelectorAll('.info-panel.active .reveal').forEach(el => {
    setTimeout(() => el.classList.add('visible'), 200);
  });
});
