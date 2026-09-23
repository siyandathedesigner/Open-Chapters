(() => {
  'use strict';
  const thread = document.querySelector('.narrative-thread');
  if (!thread) return;
  const links = [...thread.querySelectorAll('a[href^="#"]')];
  const targets = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const activate = id => links.forEach(a => a.classList.toggle('is-current', a.getAttribute('href') === `#${id}`));
  activate('top');
  links.forEach(a => a.addEventListener('click', event => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start'});
    history.replaceState(null, '', a.getAttribute('href'));
  }));
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
    if (visible) activate(visible.target.id);
  }, {rootMargin:'-30% 0px -55% 0px', threshold:[0,.08,.25,.5]});
  targets.forEach(target => observer.observe(target));
})();
