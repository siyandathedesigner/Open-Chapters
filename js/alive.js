(() => {
  'use strict';
  const root=document.documentElement;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header=document.querySelector('[data-header]');
  const setScroll=()=>{const y=scrollY||0;root.style.setProperty('--scroll-y',y.toFixed(1));header?.classList.toggle('is-scrolled',y>12)};
  setScroll(); addEventListener('scroll',setScroll,{passive:true});
  if(!reduce){
    addEventListener('pointermove',e=>{root.style.setProperty('--mx',((e.clientX/innerWidth)-.5).toFixed(3));root.style.setProperty('--my',((e.clientY/innerHeight)-.5).toFixed(3))},{passive:true});
    document.querySelectorAll('.v6-art.contain,.programme-image,.mentor-feature').forEach(el=>{
      el.dataset.tilt='';
      el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;el.style.transform=`perspective(900px) rotateX(${(-y*3.2).toFixed(2)}deg) rotateY(${(x*4).toFixed(2)}deg)`});
      el.addEventListener('pointerleave',()=>el.style.transform='');
    });
  }
  const score=document.querySelector('.lesson-score');
  if(score){new MutationObserver(()=>{score.classList.remove('is-popping');void score.offsetWidth;score.classList.add('is-popping')}).observe(score,{subtree:true,characterData:true,childList:true})}
  document.querySelectorAll('.v6-art.contain').forEach((el,i)=>{
    ['cyan','magenta','orange'].forEach((c,j)=>{const dot=document.createElement('i');dot.className=`motion-chip ${c}`;dot.style.left=`${10+j*37}%`;dot.style.top=`${18+((i+j)*23)%64}%`;dot.style.transform=`scale(${.65+j*.2})`;el.appendChild(dot)})
  });
})();
