
(function(){
  const els = document.querySelectorAll('section, .spotlight, .features');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('reveal-in');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => {
    el.classList.add('reveal-base');
    obs.observe(el);
  });
})();
