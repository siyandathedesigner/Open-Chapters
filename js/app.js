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
    let storyToken=0;
    const settleStory=(token,front,back,alt)=>{
      if(token!==storyToken)return;
      front.style.transition='none';
      back.style.transition='none';
      front.classList.remove('is-leaving','is-shown','is-entering');
      front.alt='';
      front.setAttribute('aria-hidden','true');
      back.classList.remove('is-entering');
      back.classList.add('is-shown');
      back.alt=alt;
      back.removeAttribute('aria-hidden');
      void back.offsetWidth;
      front.style.transition='';
      back.style.transition='';
    };
    const showStory=async(page,animate,delta=1)=>{
      const slot=$('.story-image',lesson);
      const layers=[...slot.querySelectorAll('.story-layer')];
      const src=storySrc(page);
      const alt=storyAlts[page-1];
      preloadStory(page-1);
      preloadStory(page+1);
      const front=layers.find(l=>l.classList.contains('is-shown'))||layers[0];
      const back=layers.find(l=>l!==front)||layers[1];
      const same=(front.getAttribute('src')||'').endsWith(src);
      const reduce=!animate||matchMedia('(prefers-reduced-motion: reduce)').matches;
      if(same&&!front.classList.contains('is-leaving')&&!front.classList.contains('is-entering')){front.alt=alt;return;}
      if(reduce){
        layers.forEach(l=>{l.style.transition='none';l.classList.remove('is-leaving','is-entering','is-shown');});
        front.src=src;front.alt=alt;front.classList.add('is-shown');front.removeAttribute('aria-hidden');
        back.setAttribute('aria-hidden','true');back.alt='';
        void front.offsetWidth;
        layers.forEach(l=>{l.style.transition='';});
        return;
      }
      const token=++storyToken;
      const travel=delta>0?-8:8;
      slot.style.setProperty('--story-to',travel+'px');
      slot.style.setProperty('--story-from',(-travel)+'px');
      back.style.transition='none';
      back.classList.remove('is-shown','is-leaving','is-entering');
      back.alt='';
      back.setAttribute('aria-hidden','true');
      if(!(back.getAttribute('src')||'').endsWith(src))back.src=src;
      back.classList.add('is-entering');
      void back.offsetWidth;
      back.style.transition='';
      try{await back.decode();}catch(e){}
      if(token!==storyToken)return;
      front.style.transition='none';
      front.classList.remove('is-entering','is-leaving');
      front.classList.add('is-shown');
      void front.offsetWidth;
      front.style.transition='';
      front.classList.remove('is-shown');
      front.classList.add('is-leaving');
      front.setAttribute('aria-hidden','true');
      void back.offsetWidth;
      back.classList.add('is-shown');
      let settled=false;
      const done=e=>{
        if(e&&e.propertyName&&e.propertyName!=='opacity')return;
        if(settled||token!==storyToken)return;
        settled=true;
        back.removeEventListener('transitionend',done);
        settleStory(token,front,back,alt);
      };
      back.addEventListener('transitionend',done);
      setTimeout(done,2600);
    };
    const render=(animate=false,delta=1)=>{
      pageEl.textContent=state.page;
      scoreEl.textContent=state.score.toLocaleString();
      progress.style.width=`${clamp(state.page/8*100,12,100)}%`;
      $('[data-story-text]',lesson).innerHTML=pages[state.page-1].map(t=>`<p>${t}</p>`).join('');
      showStory(state.page,animate,delta);
    };
    const bumpScore=()=>{scoreEl.classList.remove('pop');void scoreEl.offsetWidth;scoreEl.classList.add('pop')};
    const turn=(delta)=>{const before=state.page;state.page=clamp(state.page+delta,1,8);if(state.page===before)return;if(delta>0){state.score+=100;bumpScore()}render(true,delta)};
    $('[data-prev]',lesson)?.addEventListener('click',()=>turn(-1));
    $('[data-next-small]',lesson)?.addEventListener('click',()=>turn(1));
    render();
  }

  document.addEventListener('keydown',e=>{if(e.key==='Escape'){menu?.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}});
})();
