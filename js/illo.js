// Mock-only flat illustration stand-ins (brand pigments, bright white). Not final art.
const P={ink:'#10131a',cyan:'#00a7c7',cyan2:'#00e7ff',mag:'#e0006c',vio:'#5426d9',org:'#ff8a00',ver:'#ff3d00',lime:'#b6ff00'};
function hair(style,c){switch(style){
 case 'puffs':return `<circle cx="62" cy="52" r="24" fill="${c}"/><circle cx="138" cy="52" r="24" fill="${c}"/><path d="M58 92c0-40 20-58 42-58s42 18 42 58c-10-18-26-26-42-26s-32 8-42 26z" fill="${c}"/>`;
 case 'curly':return `<g fill="${c}">${[...Array(11)].map((_,i)=>`<circle cx="${58+i*8.4}" cy="${46+Math.abs(5-i)*3.2}" r="15"/>`).join('')}</g>`;
 case 'long':return `<path d="M52 150c-8-70 8-118 48-118s56 48 48 118h-18c4-40-4-70-30-78-26 8-34 38-30 78z" fill="${c}"/>`;
 case 'bun':return `<circle cx="100" cy="26" r="18" fill="${c}"/><path d="M56 90c0-38 20-56 44-56s44 18 44 56c-12-20-28-28-44-28s-32 8-44 28z" fill="${c}"/>`;
 case 'wrap':return `<path d="M48 160c-6-80 14-126 52-126s58 46 52 126h-14c2-44-6-78-38-86-32 8-40 42-38 86z" fill="${c}"/><path d="M54 84c6-30 24-46 46-46s40 16 46 46c-14-10-30-14-46-14s-32 4-46 14z" fill="${c}" opacity=".85"/>`;
 default:return `<path d="M58 88c0-36 18-54 42-54s42 18 42 54c-8-14-22-22-42-22s-34 8-42 22z" fill="${c}"/>`;}}
function person({skin='#8d5a3b',hairC='#1b1210',style='short',shirt=P.cyan,headset=false,glasses=false,mouth='open',x=0,y=0,s=1}){
 return `<g transform="translate(${x} ${y}) scale(${s})">
 <path d="M30 230c4-44 34-64 70-64s66 20 70 64z" fill="${shirt}" stroke="${P.ink}" stroke-width="4"/>
 <rect x="88" y="138" width="24" height="34" rx="10" fill="${skin}"/>
 ${style==='wrap'?hair(style,hairC):''}
 <circle cx="58" cy="104" r="11" fill="${skin}"/><circle cx="142" cy="104" r="11" fill="${skin}"/>
 <ellipse cx="100" cy="98" rx="44" ry="50" fill="${skin}" stroke="${P.ink}" stroke-width="4"/>
 ${style!=='wrap'?hair(style,hairC):''}
 <ellipse cx="84" cy="100" rx="6" ry="7.5" fill="${P.ink}"/><ellipse cx="116" cy="100" rx="6" ry="7.5" fill="${P.ink}"/>
 <circle cx="86" cy="97" r="2.2" fill="#fff"/><circle cx="118" cy="97" r="2.2" fill="#fff"/>
 <circle cx="72" cy="118" r="7" fill="#ff7aa8" opacity=".55"/><circle cx="128" cy="118" r="7" fill="#ff7aa8" opacity=".55"/>
 ${mouth==='open'?`<path d="M86 122q14 16 28 0z" fill="${P.ink}"/><path d="M92 128q8 5 16 0" fill="#ff6b6b"/>`:`<path d="M86 122q14 12 28 0" fill="none" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>`}
 ${glasses?`<g fill="none" stroke="${P.ink}" stroke-width="3.5"><circle cx="84" cy="100" r="13"/><circle cx="116" cy="100" r="13"/><path d="M97 100h6"/></g>`:''}
 ${headset?`<path d="M52 104c0-44 22-66 48-66s48 22 48 66" fill="none" stroke="${P.ink}" stroke-width="7"/><rect x="42" y="94" width="16" height="28" rx="7" fill="${P.mag}" stroke="${P.ink}" stroke-width="3"/><rect x="142" y="94" width="16" height="28" rx="7" fill="${P.mag}" stroke="${P.ink}" stroke-width="3"/><path d="M50 120q6 22 30 22" fill="none" stroke="${P.ink}" stroke-width="3"/><circle cx="82" cy="142" r="4" fill="${P.ink}"/>`:''}
 </g>`;}
function stars(list){return list.map(([x,y,r,c])=>`<path transform="translate(${x} ${y}) scale(${r})" d="M0-10l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="${c}" stroke="${P.ink}" stroke-width="1.2"/>`).join('');}
function sparks(cx,cy,dir=0){let o='';const cs=[P.cyan2,P.mag,P.vio,P.org,P.lime];for(let i=0;i<16;i++){const a=-Math.PI/2+dir*0.55+(Math.random()-.5)*0.9,d=20+Math.random()*150;o+=`<circle cx="${cx+Math.cos(a)*d}" cy="${cy+Math.sin(a)*d}" r="${2+Math.random()*4}" fill="${cs[i%5]}"/>`;}return o;}
Math.random=(()=>{let s=7;return()=>(s=(s*16807)%2147483647)/2147483647})();
const SCENES={
 childTablet:()=>`<svg viewBox="0 0 560 640" xmlns="http://www.w3.org/2000/svg"><rect width="560" height="640" fill="#fff"/>
 <ellipse cx="280" cy="640" rx="340" ry="120" fill="${P.cyan2}" opacity=".18"/><rect x="0" y="560" width="560" height="80" fill="#f7f9fc"/>
 <circle cx="470" cy="110" r="70" fill="${P.lime}" opacity=".35"/><circle cx="90" cy="170" r="50" fill="${P.cyan2}" opacity=".25"/>
 ${person({x:130,y:150,s:1.5,style:'puffs',skin:'#a8704a',shirt:P.org,mouth:'open'})}
 <radialGradient id="g1"><stop offset="0" stop-color="#ffd27a" stop-opacity=".85"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>
 <ellipse cx="280" cy="330" rx="160" ry="120" fill="url(#g1)"/>
 <rect x="190" y="400" width="180" height="120" rx="16" fill="${P.ink}" stroke="${P.ink}" stroke-width="4" transform="rotate(-8 280 460)"/><rect x="202" y="412" width="156" height="96" rx="10" fill="#fff6d6" transform="rotate(-8 280 460)"/><circle cx="190" cy="478" r="20" fill="#a8704a" stroke="${P.ink}" stroke-width="4"/><circle cx="368" cy="452" r="20" fill="#a8704a" stroke="${P.ink}" stroke-width="4"/>
 ${sparks(420,400,1)}${sparks(140,400,-1)}${stars([[70,80,2.2,'#ffe659'],[500,260,1.6,P.mag],[460,520,1.4,P.cyan2],[90,470,1.2,P.org]])}</svg>`,
 learner:()=>`<svg viewBox="0 0 560 520" xmlns="http://www.w3.org/2000/svg"><rect width="560" height="520" fill="#fff"/><circle cx="440" cy="120" r="90" fill="${P.cyan2}" opacity=".22"/><circle cx="110" cy="420" r="80" fill="${P.lime}" opacity=".3"/>
 ${person({x:120,y:120,s:1.6,style:'short',skin:'#6b4430',shirt:P.vio,headset:true,mouth:'open'})}<radialGradient id="g2"><stop offset="0" stop-color="#ffd27a" stop-opacity=".6"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient><ellipse cx="280" cy="300" rx="190" ry="150" fill="url(#g2)"/>${sparks(430,420)}${stars([[70,90,2,'#ffe659'],[500,300,1.5,P.mag]])}</svg>`,
 tutor:(o={})=>`<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg"><rect width="300" height="220" fill="${o.bg||'#fff'}"/><circle cx="${o.dx||250}" cy="${o.dy||40}" r="46" fill="${o.dot||P.cyan2}" opacity=".2"/>${person({x:50,y:6,s:.95,style:o.style||'long',skin:o.skin||'#c68a62',hairC:o.hair||'#2a1a12',shirt:o.shirt||P.cyan,headset:o.headset!==false,glasses:o.glasses,mouth:o.mouth||'smile'})}</svg>`,
};
document.querySelectorAll('[data-illo]').forEach(el=>{const [k,j]=el.dataset.illo.split('|');el.innerHTML=SCENES[k](j?JSON.parse(j):{});});
