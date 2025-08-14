/*! NEXA • Barba.js fade-only no main#content (header/footer contínuos)
   Ajuste: duração do fade ampliada para 360ms + easing suave.
   Para um crossfade (leave+enter ao mesmo tempo), troque `sync: false` por `sync: true`.
*/
(function () {
  // Respeita preferências do sistema
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DUR  = reduce ? 0 : 360;                              // antes: 180
  const EASE = 'cubic-bezier(.22,.61,.36,1)';                 // ease-out suave

  function setActiveNav() {
    const page = location.pathname.split('/').pop() || 'pagina-inicial.html';
    document.querySelectorAll('nav a').forEach(a => {
      const href = a.getAttribute('href') || '';
      const file = href.split('/').pop();
      if (file === page) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  if (!window.barba) return;
  barba.init({
    prevent: ({ el }) => (
      el?.hasAttribute('download') ||
      el?.target === '_blank' ||
      (el?.getAttribute('href') || '').startsWith('#') ||
      (el?.origin && el.origin !== location.origin)
    ),
    transitions: [{
      name: 'fade',
      sync: false, // deixe "true" para crossfade (sobreposição)
      leave({ current }) {
        return current.container
          .animate([{ opacity: 1 }, { opacity: 0 }], { duration: DUR, easing: EASE })
          .finished;
      },
      enter({ next }) {
        window.scrollTo({ top: 0, behavior: 'instant' });
        setActiveNav();
        return next.container
          .animate([{ opacity: 0 }, { opacity: 1 }], { duration: DUR, easing: EASE })
          .finished;
      }
    }]
  });

  setActiveNav();
})();
