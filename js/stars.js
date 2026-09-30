/* r9 stars: hero 6, closing 4, grade bands 3, steps path 2, tutor collage 2, Home 5 (1440). Pricing: hero 2 + closing 2 only. 390: hero 2, others 1. Base r5 — seeded (stable renders); 4–6 per section at 1440, 2–3 at 390.
   Only in section margins/padding bands (never on text). Min-distance spacing across the whole page to avoid clusters. */
(function(){let seed=7;const R=()=>(seed=(seed*16807)%2147483647)/2147483647;
const COLS=['var(--cyan)','var(--magenta)','var(--lime)','var(--orange)','#ffe659','var(--violet2)','var(--cyan2)'];
const narrow=innerWidth<700,MIN=narrow?90:170,placed=[];
document.querySelectorAll('body:not(.home-page) > main > section.hero, main > section.v24-close, main > section#grades, main > section#start, main > section#tutors, body.home-mock main > section, body.home-page main > section#programmes').forEach(sec=>{
 const r=sec.getBoundingClientRect(),H=r.height,W=r.width,T=r.top+scrollY;const sh=sec.querySelector('.shell');const L=sh?sh.getBoundingClientRect().left-r.left:24;
 const pr=document.body.classList.contains('pricing-mock');if(pr&&sec.id==='start')return;const id=sec.id,hero=sec.classList.contains('hero'),close=sec.classList.contains('v24-close');const n=narrow?(hero?2:1):pr?2:hero?6:close?4:id==='grades'?3:id==='start'||id==='tutors'?2:5;
 for(let k=0;k<n;k++){const size=narrow?10+R()*12:14+R()*34;const pad=narrow?40:96;let x,y,ok=false;
  for(let t=0;t<40&&!ok;t++){const zone=Math.floor(R()*4);
   if(zone<2&&!narrow){x=zone?W-L+8+R()*(L-size-16):8+R()*(L-size-16);y=R()*(H-size)}
   else{x=R()*(W-size);y=(R()>.5)?8+R()*(pad-size-8):H-pad+R()*(pad-size-8)}
   y=Math.max(4,y);ok=placed.every(p=>Math.hypot(p[0]-x,p[1]-(T+y))>=MIN)}
  if(!ok)continue;placed.push([x,T+y]);
  const s=document.createElement('span');s.className='oc-star'+(R()>.5?' b':'');s.setAttribute('aria-hidden','true');
  s.style.cssText=`left:${x}px;top:${y}px;font-size:${size}px;color:${COLS[Math.floor(R()*COLS.length)]}`;
  s.innerHTML=`<i style="animation-delay:-${(R()*6).toFixed(1)}s">★</i>`;
  if(getComputedStyle(sec).position==='static')sec.style.position='relative';sec.appendChild(s)}});
document.documentElement.dataset.stars=placed.length;
})();
