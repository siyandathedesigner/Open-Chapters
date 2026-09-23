(() => {
  'use strict';
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const form = $('[data-start-form]');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const message = $('.form-message', form);
      if (message) message.textContent = 'Thanks — this prototype has captured the enquiry locally.';
    });
  }
  const params = new URLSearchParams(location.search);
  const stage = params.get('stage');
  const programme = {
    early: ['Early Readers.', 'For younger readers building confidence, fluency and positive reading routines.'],
    bolder: ['Bolder Readers.', 'For readers ready for longer stories, deeper comprehension and more independent thinking.'],
    future: ['Future Thinkers.', 'For readers ready for richer texts, complex ideas and evidence-based discussion.']
  };
  if (stage && programme[stage]) {
    const title = $('[data-programme-title]');
    const lede = $('[data-programme-lede]');
    if (title) title.textContent = programme[stage][0];
    if (lede) lede.textContent = programme[stage][1];
  }
  const current = location.pathname.split('/').pop() || 'index.html';
  $$('.primary-nav a').forEach(link => {
    if (link.getAttribute('href') === current) link.setAttribute('aria-current', 'page');
  });
})();
