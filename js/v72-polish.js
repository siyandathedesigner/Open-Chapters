(() => {
  'use strict';
  const rail = document.querySelector('[data-chapter-rail]');
  if (!rail) return;
  const links = [...rail.querySelectorAll('[data-chapter-link]')];
  const sections = links.map(link => document.getElementById(link.dataset.chapterLink)).filter(Boolean);
  const activate = id => links.forEach(link => link.classList.toggle('is-active', link.dataset.chapterLink === id));
  activate('top');
  links.forEach(link => link.addEventListener('click', event => {
    const target = document.getElementById(link.dataset.chapterLink);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start'});
    history.replaceState(null, '', `#${target.id}`);
  }));
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
    if (visible) activate(visible.target.id);
  }, {rootMargin:'-28% 0px -58% 0px', threshold:[0,.05,.2,.5]});
  sections.forEach(section => observer.observe(section));
  const onScroll = () => rail.classList.toggle('is-scrolled', scrollY > 90);
  onScroll(); addEventListener('scroll', onScroll, {passive:true});
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.programme-art,.parent-picture,.mentor-feature').forEach((art, i) => {
      const base = i === 0 ? -1.1 : i === 1 ? 1.25 : -1.3;
      art.addEventListener('pointermove', e => {
        if (innerWidth < 901) return;
        const r=art.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
        art.style.rotate=`${base + x*.7}deg`;
        art.style.translate=`${x*4}px ${y*4}px`;
      });
      art.addEventListener('pointerleave', () => {art.style.rotate='';art.style.translate='';});
    });
  }
})();
