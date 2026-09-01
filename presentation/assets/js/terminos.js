document.addEventListener('DOMContentLoaded', () => {
  const getLang = () => (window.SRi18n ? window.SRi18n.getLang() : 'es');
  const tt = (key, fallback) => (window.SRi18n ? window.SRi18n.t(key, getLang()) : fallback);

  /* ── Detecta desde dónde se abrió la página (solo login o registro) ──
     Esta vista únicamente se enlaza desde login.html y registro.html,
     así que usamos document.referrer para saber a cuál de las dos
     debe volver el usuario, preservando su query string (por ejemplo
     ?redirect=...) para no perder el destino original. */
  const floatingBackBtn = document.getElementById('termsBackBtn');
  const floatingBackLabel = document.getElementById('termsBackBtnLabel');
  const ctaBackBtn = document.getElementById('termsCtaBackBtn');

  const resolveBackTarget = () => {
    try {
      if (!document.referrer) return null;
      const referrerUrl = new URL(document.referrer);
      if (referrerUrl.origin !== window.location.origin) return null;

      const path = referrerUrl.pathname;
      if (/\/(views\/)?login(\.html)?$/i.test(path)) {
        return { href: referrerUrl.pathname + referrerUrl.search, key: 'terms.backToLogin', fallback: 'Volver al inicio de sesión' };
      }
      if (/\/(views\/)?registro(\.html)?$/i.test(path)) {
        return { href: referrerUrl.pathname + referrerUrl.search, key: 'terms.backToRegistro', fallback: 'Volver al registro' };
      }
      return null;
    } catch (_) {
      return null;
    }
  };

  const backTarget = resolveBackTarget();

  const applyBackLabels = () => {
    if (backTarget) {
      const label = tt(backTarget.key, backTarget.fallback);
      if (floatingBackLabel) floatingBackLabel.textContent = label;
      if (ctaBackBtn) ctaBackBtn.textContent = label;
    } else {
      const label = tt('terms.back', 'Volver');
      if (floatingBackLabel) floatingBackLabel.textContent = label;
      if (ctaBackBtn) ctaBackBtn.textContent = label;
    }
  };

  const backHref = backTarget ? backTarget.href : '/';

  if (floatingBackBtn) {
    floatingBackBtn.href = backHref;
    // Siempre visible: si no se detecta login/registro como origen
    // (referrer ausente o de otra página), cae a "/" por seguridad.
    floatingBackBtn.hidden = false;
  }
  if (ctaBackBtn) {
    ctaBackBtn.href = backHref;
  }

  applyBackLabels();
  document.addEventListener('langchange', applyBackLabels);

  /* ── Sirve el PDF en el idioma activo (ES/EN) ── */
  const pdfLink = document.getElementById('termsPdfLink');
  const applyPdfLink = () => {
    if (!pdfLink) return;
    const lang = getLang();
    const href = lang === 'en' ? pdfLink.dataset.pdfEn : pdfLink.dataset.pdfEs;
    if (href) pdfLink.href = href;
  };
  applyPdfLink();
  document.addEventListener('langchange', applyPdfLink);

  /* ── Botón "Ir arriba" ── */
  const scrollTopBtn = document.getElementById('termsScrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ── Resaltar el apartado activo en la tabla de contenido al hacer scroll ── */
  const tocLinks = Array.from(document.querySelectorAll('#termsToc a'));
  const sections = tocLinks
    .map((link) => document.getElementById(link.getAttribute('href').slice(1)))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const setActive = (id) => {
      tocLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }

  tocLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', '#' + targetId);
    });
  });

  /* ── Animaciones GSAP ── */
  if (window.gsap) {
    const revealEls = Array.from(document.querySelectorAll('[data-reveal]'));

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        // Red de seguridad: si la timeline no llega a completar (pestaña en
        // segundo plano, timing de red), limpiamos cualquier opacity/transform
        // inline que GSAP haya dejado para que el contenido no se quede oculto.
        gsap.set(revealEls, { clearProps: 'opacity,transform' });
      }
    });

    tl.from(revealEls, { opacity: 0, y: 30, duration: 0.7, stagger: 0.1 });

    window.setTimeout(() => {
      revealEls.forEach((el) => {
        el.style.opacity = '';
        el.style.transform = '';
      });
    }, 1800);

    if (window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      // Aparece / desaparece: cada sección hace fade-in al entrar por abajo
      // y fade-out al salir por arriba, atado directamente al scroll (scrub)
      // en ambos sentidos — no es un fade-in de una sola vez, se repite cada
      // vez que la sección entra o sale de pantalla, subiendo o bajando.
      gsap.utils.toArray('.terms-section').forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top 92%',
              end: 'top 65%',
              scrub: 0.4
            }
          }
        );
        gsap.fromTo(
          section,
          { opacity: 1 },
          {
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              // El destino de un salto del índice aterriza justo debajo del
              // navbar (scroll-margin-top), o sea muy cerca del borde
              // superior del viewport. Esta zona debe empezar recién cuando
              // la sección está a punto de meterse bajo el navbar, no antes,
              // o el texto llega ya semi-invisible al hacer clic en el índice.
              trigger: section,
              start: 'bottom 12%',
              end: 'bottom -10%',
              scrub: 0.4
            }
          }
        );
      });

      // Parallax: cada sección sube y baja siguiendo el scroll (scrub la
      // ata directamente a la posición de scroll, así que revierte suavemente
      // si el usuario sube en vez de bajar).
      gsap.utils.toArray('.terms-section').forEach((section) => {
        gsap.fromTo(
          section,
          { y: 70 },
          {
            y: -70,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.6,
              invalidateOnRefresh: true
            }
          }
        );
      });

      // Recalcula las posiciones de los triggers una vez que todo (fuentes,
      // imágenes, la animación de entrada) terminó de asentar el layout —
      // si no, ScrollTrigger puede quedarse con medidas desactualizadas y
      // el parallax no se nota o se ve "congelado".
      window.addEventListener('load', () => ScrollTrigger.refresh());
      window.setTimeout(() => ScrollTrigger.refresh(), 1900);
    }

    if (floatingBackBtn && !floatingBackBtn.hidden) {
      gsap.fromTo(floatingBackBtn, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.5, delay: 0.3, ease: 'power2.out' });
    }
  }
});
