document.addEventListener('DOMContentLoaded', () => {
  const googleLinkBtn = document.querySelector('.auth-google-btn-full');
  if (googleLinkBtn) {
    const redirectParam = new URLSearchParams(window.location.search).get('redirect');
    if (redirectParam) {
      googleLinkBtn.href = '/auth/google?redirect=' + encodeURIComponent(redirectParam);
    }
  }
  const form = document.getElementById('register-form');
  const messageBox = document.getElementById('form-message');
  const passwordInput = document.querySelector('input[name="password"]');

  const EYE_ICON = '<svg viewBox="0 0 24 24" width="18" height="18"><ellipse cx="12" cy="12" rx="9" ry="5.4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2.6" fill="currentColor"/></svg>';
  const EYE_OFF_ICON = '<svg viewBox="0 0 24 24" width="18" height="18"><ellipse cx="12" cy="12" rx="9" ry="5.4" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="2.6" fill="currentColor"/><line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

  let toggleButtonRef = null;

  const getLang = () => (window.SRi18n ? window.SRi18n.getLang() : 'es');
  const tt = (key, fallback) => (window.SRi18n ? window.SRi18n.t(key, getLang()) : fallback);

  if (passwordInput) {
    const formGroup = passwordInput.closest('.form-group');
    if (formGroup) {
      const toggleButton = document.createElement('button');
      toggleButton.type = 'button';
      toggleButton.className = 'password-toggle';
      toggleButton.setAttribute('aria-label', tt('login.password_show', 'Mostrar contraseña'));
      toggleButton.innerHTML = EYE_ICON;
      formGroup.appendChild(toggleButton);
      toggleButtonRef = toggleButton;

      toggleButton.addEventListener('click', () => {
        const isHidden = passwordInput.type === 'password';
        const swap = () => {
          passwordInput.type = isHidden ? 'text' : 'password';
          toggleButton.innerHTML = isHidden ? EYE_OFF_ICON : EYE_ICON;
          toggleButton.setAttribute('aria-label', isHidden ? tt('login.password_hide', 'Ocultar contraseña') : tt('login.password_show', 'Mostrar contraseña'));
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
    }
  }

  // Mantener el aria-label del botón de mostrar/ocultar contraseña
  // sincronizado si el usuario cambia el idioma después de que el botón ya existe.
  document.addEventListener('langchange', () => {
    if (!toggleButtonRef || !passwordInput) return;
    const isPasswordHidden = passwordInput.type === 'password';
    toggleButtonRef.setAttribute(
      'aria-label',
      isPasswordHidden ? tt('login.password_show', 'Mostrar contraseña') : tt('login.password_hide', 'Ocultar contraseña')
    );
  });

  /* ── Animaciones GSAP ── */
  if (window.gsap) {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const card = document.querySelector('.auth-card');

    if (card) {
      card.classList.remove('reveal');

      const logoImg = card.querySelector('.auth-card__logo img');
      const rest = Array.from(card.querySelectorAll(
        'h1, .auth-card__sub, .form-group, .auth-submit, .auth-divider, .auth-google-btn, .auth-footer-link'
      ));

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: () => {
          // Red de seguridad: GSAP usa .from() para animar estos elementos,
          // lo que les deja opacity:0 inline como estado de partida. Si por
          // cualquier motivo la timeline no llega a completar del todo
          // (pestaña en segundo plano, timing de red, etc.), esa opacidad
          // inline se queda congelada y el contenido desaparece aunque su
          // color/tamaño/fuente estén perfectamente bien. Al terminar,
          // limpiamos cualquier opacity inline que GSAP haya dejado.
          gsap.set([card, logoImg, ...rest].filter(Boolean), { clearProps: 'opacity,transform' });
        }
      });

      tl.from(card, { opacity: 0, y: 55, scale: 0.92, duration: 0.85 });

      if (logoImg) {
        tl.from(logoImg, { scale: 0, rotate: -200, opacity: 0, duration: 0.65, ease: 'back.out(1.8)' }, '-=0.5');
      }

      tl.from(rest, { opacity: 0, y: 22, duration: 0.55, stagger: 0.08 }, '-=0.35');

      // Red de seguridad independiente de GSAP: si por cualquier motivo la
      // timeline de entrada no llega a disparar onComplete (pestaña en
      // segundo plano, timing de red al cargar, o cualquier otro corte),
      // este timeout garantiza que el título, subtítulo y demás contenido
      // de la tarjeta terminen visibles sí o sí, sin depender de GSAP.
      window.setTimeout(() => {
        [card, logoImg, ...rest].filter(Boolean).forEach((el) => {
          el.style.opacity = '';
          el.style.transform = '';
        });
      }, 2000);

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
          delay: 1.2
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
          boxShadow: '0 2px 8px rgba(0,0,0,.12)',
          duration: 0.25,
          ease: 'power2.out',
          onComplete: () => { if (glowTween) glowTween.resume(); }
        });
      });
      submitBtn.addEventListener('click', () => {
        gsap.fromTo(submitBtn, { scale: 0.9 }, { scale: 1.05, duration: 0.35, ease: 'back.out(3)' });
      });
    }

    const googleBtn = document.querySelector('.auth-google-btn');
    if (googleBtn) {
      googleBtn.addEventListener('click', () => {
        gsap.fromTo(googleBtn, { scale: 0.95 }, { scale: 1, duration: 0.4, ease: 'elastic.out(1, 0.6)' });
      });
    }

    const bg = document.querySelector('.auth-page__bg');
    if (bg) {
      if (!reduceMotion) {
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
    const params = new URLSearchParams(window.location.search);

    const targetRedirect = params.get('redirect') || '/';

    const nombre = (formData.get('nombre') || '').toString().trim();
    const apellido = (formData.get('apellido') || '').toString().trim();
    const password = formData.get('password');
    const password2 = formData.get('password2');

    if (password !== password2) {
      showMessage(tt('register.error_passwords_match', 'Las contraseñas no coinciden'));
      return;
    }

    const payload = {
      name: [nombre, apellido].filter(Boolean).join(' '),
      email: formData.get('email'),
      password: password,
      redirect: targetRedirect
    };

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const rawText = await response.text();
      let data = null;
      try {
        data = JSON.parse(rawText);
      } catch (_) {
        data = null;
      }

      if (response.ok) {
        showMessage((data && data.message) || tt('register.success', 'Cuenta creada correctamente'), false);
        window.setTimeout(() => {
          window.location.href = (data && data.redirect) || '/login.html';
        }, 900);
        return;
      }

      const text = (data && (data.message || data.error)) || rawText;
      showMessage(text || tt('register.error_generic', 'No se pudo crear la cuenta. Inténtalo de nuevo.'));

    } catch (error) {
      showMessage(tt('register.error_server', 'Ocurrió un error de conexión. Inténtalo de nuevo.'));
    }
  });

  // Pasada final de traducción: garantiza que el botón de mostrar/ocultar
  // contraseña y cualquier otro nodo creado dinámicamente en este handler
  // queden traducidos, sin depender del orden de carga de otros scripts.
  if (window.SRi18n) {
    window.SRi18n.applyTranslations(window.SRi18n.getLang());
  }
});