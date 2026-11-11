(() => {
 const reduced = matchMedia('(prefers-reduced-motion: reduce)');
 const fine = matchMedia('(hover: hover) and (pointer: fine)');
 const svg = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="#2456a8" d="M28 36 3 52 22 48 32 41Z"/><path fill="#3987df" d="M23 31Q24 18 38 22L37 8 48 20Q57 20 56 31Q54 45 36 44Q24 43 23 31Z"/><path fill="#342532" d="M44 23Q55 21 55 30L47 35 42 29Z"/><path fill="#f2b647" d="m53 25 10 5-11 3Z"/><circle cx="50" cy="26" r="1.5" fill="#fff5df"/><path class="wing" fill="#204b91" d="M35 35Q10 29 12 7Q27 14 40 30Z"/><path fill="none" stroke="#83baf2" stroke-width="1.3" d="M27 38q8 5 15 1"/></svg>`;
 const style=document.createElement('style');
 style.textContent=`.cardinal-pointer,.cardinal-flock{position:fixed;pointer-events:none;z-index:99999;width:46px;height:46px;left:0;top:0}.cardinal-pointer{display:none;filter:drop-shadow(0 1px 1px #fff9)}.cardinal-pointer svg,.cardinal-flock svg{width:100%;height:100%;overflow:visible}.cardinal-pointer .wing{transform-origin:36px 33px;animation:cardinal-flap .65s ease-in-out infinite alternate}.cardinal-flock .wing{transform-origin:36px 33px;animation:cardinal-flap .18s ease-in-out infinite alternate}@keyframes cardinal-flap{to{transform:scaleY(.25) rotate(-18deg)}}@media(hover:hover) and (pointer:fine){nav a.cardinal-hover{cursor:none}}@media(prefers-reduced-motion:reduce){.cardinal-pointer .wing,.cardinal-flock .wing{animation:none}}`;
 document.head.append(style);
 const pointer=document.createElement('span');pointer.className='cardinal-pointer';pointer.setAttribute('aria-hidden','true');pointer.innerHTML=svg;document.body.append(pointer);
 function flock(x,y){if(reduced.matches)return;for(let i=0;i<3;i++){const bird=document.createElement('span');bird.className='cardinal-flock';bird.setAttribute('aria-hidden','true');bird.innerHTML=svg;document.body.append(bird);const endX=Math.min(innerWidth-45,x+100+i*65);const endY=Math.max(-60,y-150-i*35);const flight=bird.animate([{transform:`translate(${x-24-i*12}px,${y-22+i*12}px) scale(${.65+i*.12})`,opacity:0},{offset:.12,opacity:1},{transform:`translate(${endX}px,${endY}px) scale(.55)`,opacity:0}],{duration:900+i*120,easing:'cubic-bezier(.2,.6,.4,1)',delay:i*65});flight.onfinish=()=>bird.remove();}}
 document.querySelectorAll('nav a').forEach(a=>{
 a.addEventListener('pointerenter',()=>{if(fine.matches){a.classList.add('cardinal-hover');pointer.style.display='block';}});
 a.addEventListener('pointermove',e=>{pointer.style.transform=`translate(${e.clientX-38}px,${e.clientY-20}px)`;});
 a.addEventListener('pointerleave',()=>{a.classList.remove('cardinal-hover');pointer.style.display='none';});
 a.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||reduced.matches)return;pointer.style.display='none';flock(e.clientX||innerWidth/2,e.clientY||70);if(a.dataset.demo!==undefined){e.preventDefault();return;}try{sessionStorage.setItem('cardinal-arrival',JSON.stringify({x:(e.clientX||innerWidth/2)/innerWidth,y:(e.clientY||70)/innerHeight,time:Date.now()}));}catch{}});
 });
 try{const raw=sessionStorage.getItem('cardinal-arrival');sessionStorage.removeItem('cardinal-arrival');if(raw){const p=JSON.parse(raw);if(Date.now()-p.time<5000)flock(p.x*innerWidth,p.y*innerHeight);}}catch{}
})();
