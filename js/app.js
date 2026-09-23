(() => {
  'use strict';
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  const state={page:3,score:2450,stage:'Read'};

  const header=$('[data-header]');
  const updateHeader=()=>header?.classList.toggle('scrolled',window.scrollY>12);
  updateHeader(); window.addEventListener('scroll',updateHeader,{passive:true});

  const toggle=$('[data-menu-toggle]'), menu=$('[data-menu]');
  toggle?.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});
  $$('#primary-nav a').forEach(a=>a.addEventListener('click',()=>{menu?.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}));

  $$('[data-scroll]').forEach(btn=>btn.addEventListener('click',()=>$(btn.dataset.scroll)?.scrollIntoView({behavior:'smooth',block:'start'})));

  const revealObserver='IntersectionObserver' in window?new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');revealObserver.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -4% 0px'}):null;
  $$('.reveal').forEach(el=>revealObserver?revealObserver.observe(el):el.classList.add('in-view'));

  const parallax=$('[data-parallax-root]');
  if(parallax && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    parallax.addEventListener('pointermove',e=>{const r=parallax.getBoundingClientRect();const x=((e.clientX-r.left)/r.width-.5)*2;const y=((e.clientY-r.top)/r.height-.5)*2;parallax.style.setProperty('--px',x.toFixed(3));parallax.style.setProperty('--py',y.toFixed(3));});
    parallax.addEventListener('pointerleave',()=>{parallax.style.setProperty('--px',0);parallax.style.setProperty('--py',0)});
  }

  const lesson=$('[data-lesson]');
  if(lesson){
    const pageEl=$('[data-page]',lesson),scoreEl=$('[data-score]',lesson),progress=$('[data-progress-bar]',lesson),mentorCopy=$('[data-mentor-copy]',lesson);
    const pages=[
      ['The lantern on the desk flickered as Maya stepped closer.','A folded note waited beneath a silver key.'],
      ['The shelves seemed to lean toward her, listening.','She could hear a quiet ticking behind the oldest books.'],
      ['Maya pushed open the old library door. A warm light spilled out, and dust danced in the air like tiny stars.','Rows of books stretched higher than she could see. Each spine seemed to glow with a secret.','Somewhere in this library, a story was waiting — a story that might change everything.'],
      ['A blue book slipped from the shelf without anyone touching it.','On its cover was the same star Maya had seen above the doorway.'],
      ['She opened it carefully. The first page held only a map.','A tiny mark blinked where she was standing.'],
      ['“Look at what changed,” her mentor said.','Maya traced the route with one finger and noticed a hidden staircase.'],
      ['At the bottom of the stairs stood a cabinet full of unfinished stories.','Each one carried a name — except the final book.'],
      ['Maya smiled when she saw the blank cover.','There was room for one more story.']
    ];
    const mentor={Read:'Follow the clues in the story.',Think:'What changed when Maya entered?',Create:'Imagine what the next page might reveal.',Mentor:'I’m here when you want a hint.',Rewards:'Your reading streak is growing!'};
    const render=()=>{pageEl.textContent=state.page;scoreEl.textContent=state.score.toLocaleString();progress.style.width=`${clamp(state.page/8*100,12,100)}%`;const box=$('[data-story-text]',lesson);box.innerHTML=pages[state.page-1].map(t=>`<p>${t}</p>`).join('');};
    const bumpScore=()=>{scoreEl.classList.remove('pop');void scoreEl.offsetWidth;scoreEl.classList.add('pop')};
    $('[data-prev]',lesson)?.addEventListener('click',()=>{state.page=clamp(state.page-1,1,8);render()});
    $('[data-next-small]',lesson)?.addEventListener('click',()=>{state.page=clamp(state.page+1,1,8);render()});
    $('[data-next]',lesson)?.addEventListener('click',()=>{const before=state.page;state.page=clamp(state.page+1,1,8);if(state.page!==before){state.score+=100;bumpScore()}render()});
    $$('[data-stage]',lesson).forEach(btn=>btn.addEventListener('click',()=>{$$('[data-stage]',lesson).forEach(b=>b.classList.remove('active'));btn.classList.add('active');state.stage=btn.dataset.stage;mentorCopy.textContent=mentor[state.stage]}));
    render();
  }

  document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu?.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}});
})();
