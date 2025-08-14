
(function () {
  const contentSel = 'main#content';

  function setActiveNav() {
    const page = location.pathname.split('/').pop() || 'pagina-inicial.html';
    document.querySelectorAll('nav a').forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      const file = href.split('/').pop();
      if (file === page) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }

  function runInlineScripts(container) {
    const scripts = container.querySelectorAll('script');
    scripts.forEach(old => {
      const s = document.createElement('script');
      [...old.attributes].forEach(attr => s.setAttribute(attr.name, attr.value));
      if (old.src) s.src = old.src;
      else s.textContent = old.textContent;
      if (!s.type) s.type = 'text/javascript';
      old.replaceWith(s);
    });
  }

  function swapContent(newDoc, url, { replace = false } = {}) {
    const newMain = newDoc.querySelector(contentSel);
    if (!newMain) { location.href = url; return; }
    const current = document.querySelector(contentSel);
    if (!current) { location.href = url; return; }

    const doSwap = () => {
      if (replace) history.replaceState({}, '', url);
      else history.pushState({}, '', url);

      current.innerHTML = newMain.innerHTML;

      const newTitle = newDoc.querySelector('title');
      if (newTitle) document.title = newTitle.textContent;

      runInlineScripts(current);
      setActiveNav();
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    if (document.startViewTransition) {
      document.startViewTransition(doSwap);
    } else {
      current.classList.add('pjax-fade-out');
      current.addEventListener('animationend', function onEnd() {
        current.removeEventListener('animationend', onEnd);
        doSwap();
        current.classList.remove('pjax-fade-out');
        current.classList.add('pjax-fade-in');
        setTimeout(() => current.classList.remove('pjax-fade-in'), 220);
      });
    }
  }

  async function fetchPage(url) {
    const res = await fetch(url, { credentials: 'same-origin' });
    if (!res.ok) throw new Error('Falha ao carregar: ' + url);
    const text = await res.text();
    const parser = new DOMParser();
    return parser.parseFromString(text, 'text/html');
  }

  async function navigate(url, opts) {
    try {
      const doc = await fetchPage(url);
      swapContent(doc, url, opts);
    } catch (err) {
      console.error(err);
      location.href = url;
    }
  }

  document.addEventListener('click', function (e) {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const isHash = href.startsWith('#');
    const isExternal = a.origin && a.origin !== location.origin;
    const newTab = a.target === '_blank';
    const noPjax = a.hasAttribute('data-no-pjax');
    if (isHash || isExternal || newTab || noPjax) return;
    if (!/\.html($|\?)/i.test(href)) return;
    e.preventDefault();
    navigate(a.href);
  }, true);

  window.addEventListener('popstate', function () {
    navigate(location.href, { replace: true });
  });

  if (!document.getElementById('pjax-style')) {
    const style = document.createElement('style');
    style.id = 'pjax-style';
    style.textContent = `
      @keyframes pjaxFadeOut { from { opacity: 1 } to { opacity: 0 } }
      @keyframes pjaxFadeIn  { from { opacity: 0 } to { opacity: 1 } }
      main#content.pjax-fade-out { animation: pjaxFadeOut 180ms ease; }
      main#content.pjax-fade-in  { animation: pjaxFadeIn  180ms ease; }
    `;
    document.head.appendChild(style);
  }

  setActiveNav();
})();
