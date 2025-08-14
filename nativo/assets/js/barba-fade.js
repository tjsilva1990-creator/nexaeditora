/*! NEXA • Barba.js fade-only no main#content (header/footer contínuos) */
(function () {
  // Respeita preferências de movimento do sistema
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const DUR = reduce ? 0 : 180;

  // Helper: marca link ativo no menu
  function setActiveNav() {
    const page = location.pathname.split('/').pop() || 'pagina-inicial.html';
    document.querySelectorAll('nav a').forEach(a => {
      const href = a.getAttribute('href') || '';
      const file = href.split('/').pop();
      if (file === page) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  // Inicializa Barba
  if (!window.barba) return;
  barba.init({
    // Não intercepta downloads, âncoras, _blank, externos
    prevent: ({ el }) => (
      el?.hasAttribute('download') ||
      el?.target === '_blank' ||
      (el?.getAttribute('href') || '').startsWith('#') ||
      (el?.origin && el.origin !== location.origin)
    ),

    transitions: [{
      name: 'fade',

      // Sai da página atual
      leave({ current }) {
        // Anima só o container (main#content)
        return current.container
          .animate([{ opacity: 1 }, { opacity: 0 }], { duration: DUR, easing: 'ease' })
          .finished;
      },

      // Entra na próxima página
      enter({ next }) {
        // Garante topo e link ativo
        window.scrollTo({ top: 0, behavior: 'instant' });
        setActiveNav();

        // Anima o container novo de 0 -> 1
        return next.container
          .animate([{ opacity: 0 }, { opacity: 1 }], { duration: DUR, easing: 'ease' })
          .finished;
      }
    }]
  });

  // Marca ativo no carregamento inicial
  setActiveNav();
})();
