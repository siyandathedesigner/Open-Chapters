/* Gate 2 — one hot control per viewport. Header yields while a page heat is in view. */
(() => {
  'use strict';
  const headerHeat = document.querySelector('.header-actions .btn-hot');
  const heats = [...document.querySelectorAll('main .btn-hot, .lesson-frame .next-button')];
  if (!headerHeat && heats.length === 0) return;

  const headerOffset = () => {
    const header = document.querySelector('[data-header]');
    return header ? header.getBoundingClientRect().height : 78;
  };

  const shown = (el) => {
    const rect = el.getBoundingClientRect();
    const topLimit = headerOffset() + 6;
    const viewHeight = window.innerHeight || document.documentElement.clientHeight;
    const visibleTop = Math.max(rect.top, topLimit);
    const visibleBottom = Math.min(rect.bottom, viewHeight - 6);
    return visibleBottom - visibleTop > 18;
  };

  const sync = () => {
    const visible = heats.filter(shown).sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top);
    const owner = visible[0] || null;
    heats.forEach((el) => {
      if (!el.classList.contains('btn-hot')) return;
      el.classList.toggle('is-demoted', Boolean(owner) && el !== owner);
    });
    if (headerHeat) headerHeat.classList.toggle('is-demoted', Boolean(owner));
  };

  let frame = 0;
  const requestSync = () => {
    if (frame) return;
    frame = window.requestAnimationFrame(() => {
      frame = 0;
      sync();
    });
  };

  sync();
  window.addEventListener('scroll', requestSync, { passive: true });
  window.addEventListener('resize', requestSync);
})();
