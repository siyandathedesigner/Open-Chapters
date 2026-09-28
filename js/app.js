(() => {
  'use strict';
  const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  const state={page:3,score:2450};

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
    const pageEl=$('[data-page]',lesson),scoreEl=$('[data-score]',lesson),progress=$('[data-progress-bar]',lesson);
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
    const storyAlts=[
      'A lantern flickering on a distant desk in a dark library hall, with a pale folded note beside it',
      'A long aisle of leaning bookshelves, with a warm glow leaking from behind the oldest books',
      'An open library door under a star, warm light and glowing shelves spilling into the hall',
      'A book tipping free of its shelf in mid-air, a glint of starlight on the cover',
      'An open book showing a hand-drawn map with one small point of light',
      'A bookcase standing ajar, with worn stairs curving down into the light',
      'A gothic cabinet of glowing books at the foot of a staircase, one volume lit',
      'A single blank book glowing on a shelf, with an empty space beside it'
    ];
    const storySrc=n=>`assets/story/page-${String(n).padStart(2,'0')}.webp`;
    const preloadStory=n=>{if(n<1||n>8)return;const i=new Image();i.src=storySrc(n);};
    let storyFade=0;
    const showStory=(page,animate)=>{
      const slot=$('.story-image',lesson);
      const img=slot.querySelector('img:not(.story-incoming)');
      const src=storySrc(page);
      const alt=storyAlts[page-1];
      slot.querySelectorAll('.story-incoming').forEach(n=>n.remove());
      preloadStory(page-1);
      preloadStory(page+1);
      const current=img.getAttribute('src')||'';
      if(current.endsWith(src)){img.alt=alt;return;}
      const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(!animate||reduce){img.src=src;img.alt=alt;return;}
      const incoming=document.createElement('img');
      incoming.className='story-incoming';
      incoming.alt='';
      incoming.setAttribute('aria-hidden','true');
      incoming.src=src;
      slot.appendChild(incoming);
      const token=++storyFade;
      const finish=()=>{if(token!==storyFade)return;img.src=src;img.alt=alt;incoming.remove();storyFade++;};
      incoming.addEventListener('transitionend',e=>{if(e.propertyName==='opacity')finish();});
      requestAnimationFrame(()=>requestAnimationFrame(()=>incoming.classList.add('is-shown')));
      setTimeout(finish,380);
    };
    const render=(animate=false)=>{pageEl.textContent=state.page;scoreEl.textContent=state.score.toLocaleString();progress.style.width=`${clamp(state.page/8*100,12,100)}%`;const box=$('[data-story-text]',lesson);box.innerHTML=pages[state.page-1].map(t=>`<p>${t}</p>`).join('');showStory(state.page,animate);};
    const bumpScore=()=>{scoreEl.classList.remove('pop');void scoreEl.offsetWidth;scoreEl.classList.add('pop')};
    const turn=(delta)=>{const before=state.page;state.page=clamp(state.page+delta,1,8);if(delta>0&&state.page!==before){state.score+=100;bumpScore()}render(true)};
    $('[data-prev]',lesson)?.addEventListener('click',()=>turn(-1));
    $('[data-next-small]',lesson)?.addEventListener('click',()=>turn(1));
    render();
  }

  document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu?.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}});
})();
