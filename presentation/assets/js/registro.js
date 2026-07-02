document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('register-form');
  const messageBox = document.getElementById('form-message');

  const EYE_ICON = '<svg viewBox="0 0 24 24" width="18" height="18"><ellipse cx="12" cy="12" rx="9" ry="5.4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2.6" fill="currentColor"/></svg>';
  const EYE_OFF_ICON = '<svg viewBox="0 0 24 24" width="18" height="18"><ellipse cx="12" cy="12" rx="9" ry="5.4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2.6" fill="currentColor"/><line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

  ['input[name="password"]', 'input[name="password2"]'].forEach((selector) => {
    const input = document.querySelector(selector);
    if (!input) return;

    const formGroup = input.closest('.form-group');
    if (!formGroup) return;

    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className = 'password-toggle';
    toggleButton.setAttribute('aria-label', 'Mostrar contraseña');
    toggleButton.innerHTML = EYE_ICON;
    formGroup.appendChild(toggleButton);

    toggleButton.addEventListener('click', () => {
      const isHidden = input.type === 'password';
      const swap = () => {
        input.type = isHidden ? 'text' : 'password';
        toggleButton.innerHTML = isHidden ? EYE_OFF_ICON : EYE_ICON;
        toggleButton.setAttribute('aria-label', isHidden ? 'Ocultar contraseña' : 'Mostrar contraseña');
      };

      if (window.gsap) {
        gsap.timeline()
          .to(toggleButton, { scale: 0, rotate: -90, duration: 0.15, ease: 'power1.in' })
          .call(swap)
          .to(toggleButton, { scale: 1, rotate: 0, duration: 0.3, ease: 'back.out(2.5)' });
      } else {
        swap();
      }
    });
  });

  /* ── Animaciones GSAP ── */
  if (window.gsap) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const card = document.querySelector('.auth-card');

    if (card) {
      card.classList.remove('reveal');

      const logoImg = card.querySelector('.auth-card__logo img');
      // .form-row (nombre/apellido) anima como una sola unidad; sus .form-group
      // internos se excluyen para no duplicar la animación de esos dos campos.
      const rest = Array.from(card.querySelectorAll(
        'h1, .auth-card__sub, .form-row, .form-group, .terms-check, .auth-submit, .auth-divider, .auth-footer-link'
      )).filter((el) => !(el.classList.contains('form-group') && el.closest('.form-row')));

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(card, { opacity: 0, y: 55, scale: 0.92, duration: 0.85 });

      if (logoImg) {
        tl.from(logoImg, { scale: 0, rotate: -200, opacity: 0, duration: 0.65, ease: 'back.out(1.8)' }, '-=0.5');
      }

      tl.from(rest, { opacity: 0, y: 22, duration: 0.5, stagger: 0.06 }, '-=0.35');

      if (logoImg && !reduceMotion) {
        tl.add(() => {
          gsap.to(logoImg, {
            y: -6,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        });
      }
    }

    const submitBtn = document.querySelector('.auth-submit');
    if (submitBtn) {
      let glowTween = null;

      if (!reduceMotion) {
        glowTween = gsap.to(submitBtn, {
          boxShadow: '0 0 26px 4px rgba(190,142,86,0.55)',
          duration: 1.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.4
        });
      }

      submitBtn.addEventListener('mouseenter', () => {
        if (glowTween) glowTween.pause();
        gsap.to(submitBtn, { scale: 1.05, y: -3, boxShadow: '0 10px 24px rgba(0,0,0,.3)', duration: 0.25, ease: 'power2.out' });
      });
      submitBtn.addEventListener('mouseleave', () => {
        gsap.to(submitBtn, {
          scale: 1,
          y: 0,
          boxShadow: 'none',
          duration: 0.25,
          ease: 'power2.out',
          onComplete: () => { if (glowTween) glowTween.resume(); }
        });
      });
      submitBtn.addEventListener('click', () => {
        gsap.fromTo(submitBtn, { scale: 0.9 }, { scale: 1.05, duration: 0.35, ease: 'back.out(3)' });
      });
    }

    const bg = document.querySelector('.auth-page__bg');
    if (bg && !reduceMotion) {
      gsap.to(bg, {
        scale: 1.16,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      const xTo = gsap.quickTo(bg, 'xPercent', { duration: 0.6, ease: 'power3.out' });
      const yTo = gsap.quickTo(bg, 'yPercent', { duration: 0.6, ease: 'power3.out' });
      window.addEventListener('mousemove', (event) => {
        const relX = (event.clientX / window.innerWidth - 0.5) * 2;
        const relY = (event.clientY / window.innerHeight - 0.5) * 2;
        xTo(relX * 1.8);
        yTo(relY * 1.8);
      });
    }
  }

  if (!form) return;

  const showMessage = (message, isError = true) => {
    if (!messageBox) return;
    messageBox.textContent = message;
    messageBox.style.color = isError ? '#d9534f' : '#2e7d32';
    messageBox.style.display = 'block';
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const password = formData.get('password');
    const password2 = formData.get('password2');

    if (password !== password2) {
      showMessage('Las contraseñas no coinciden.');
      return;
    }

    const name = [formData.get('nombre'), formData.get('apellido')]
      .filter(Boolean)
      .join(' ')
      .trim();

    if (!name) {
      showMessage('Debes indicar tu nombre.');
      return;
    }

    const payload = {
      name,
      email: formData.get('email'),
      password
    };

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const text = await response.text();

      if (response.ok || response.redirected) {
        window.location.href = response.url || '/login.html';
        return;
      }

      showMessage(text || 'No se pudo crear la cuenta.');
    } catch (error) {
      showMessage('No se pudo conectar con el servidor.');
    }
  });
});