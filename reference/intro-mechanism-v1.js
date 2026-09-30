(() => {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  if(reduced.matches)return;
  const overlay=document.createElement('div');overlay.className='portal-intro';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','Abertura JOTA Esportivo');
  overlay.innerHTML=`<div class="portal-curtain curtain-left"></div><div class="portal-curtain curtain-right"></div><div class="portal-stage" aria-hidden="true"><div class="portal-halo"></div><svg class="portal-ring" viewBox="0 0 400 400"><defs><linearGradient id="portal-metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#202023"/><stop offset=".24" stop-color="#d7d7db"/><stop offset=".4" stop-color="#505054"/><stop offset=".7" stop-color="#151517"/><stop offset="1" stop-color="#a4a4ab"/></linearGradient></defs><path class="ring-depth" d="M312 88a158 158 0 1 0 0 224"/><path class="ring-face" d="M312 88a158 158 0 1 0 0 224"/><path class="ring-line" d="M306 94a150 150 0 1 0 0 212"/></svg><svg class="portal-connector" viewBox="0 0 400 400"><circle class="connector-depth" cx="200" cy="200" r="118"/><circle class="connector-face" cx="200" cy="200" r="118"/><circle class="connector-line" cx="200" cy="200" r="110"/></svg><img class="portal-j" src="assets/jota-metal.svg" width="380" height="380" alt=""></div><div class="portal-caption"><span>JOTA ESPORTIVO</span><span>O ESPORTE É O NOSSO LUGAR.</span></div><button class="portal-skip" type="button">Pular abertura <span aria-hidden="true">→</span></button>`;
  document.body.append(overlay);document.documentElement.classList.add('portal-open');
  const main=document.querySelector('main'),header=document.querySelector('.header'),footer=document.querySelector('footer');
  const background=[main,header,footer].filter(Boolean);background.forEach(el=>el.inert=true);
  const previous=document.activeElement;let timer,finished=false;
  function close(){if(finished)return;finished=true;clearTimeout(timer);overlay.remove();document.documentElement.classList.remove('portal-open');background.forEach(el=>el.inert=false);if(previous&&previous!==document.body)previous.focus({preventScroll:true});}
  overlay.querySelector('button').addEventListener('click',close);
  overlay.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close();}if(e.key==='Tab'){e.preventDefault();overlay.querySelector('button').focus();}});
  overlay.addEventListener('animationend',e=>{if(e.animationName==='portal-curtain-right')close();});
  reduced.addEventListener('change',()=>{if(reduced.matches)close();},{once:true});
  overlay.querySelector('button').focus({preventScroll:true});
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    const mark=overlay.querySelector('.portal-j'),start=mark.getBoundingClientRect();
    const target=document.querySelector('#logo-scene .logo-fallback')?.getBoundingClientRect()||document.querySelector('.hero-object').getBoundingClientRect();
    const endWidth=Math.min(target.width,target.height),endHeight=endWidth;
    const endX=target.left+(target.width-endWidth)/2,endY=target.top+(target.height-endHeight)/2;
    // A single mark travels with the round connector, then lands in the hero.
    overlay.append(mark);mark.classList.add('portal-travelling');
    Object.assign(mark.style,{position:'fixed',left:start.left+'px',top:start.top+'px',width:start.width+'px',height:start.height+'px',margin:'0',transformOrigin:'center',animation:'none'});
    mark.animate([
      {opacity:0,transform:'translate(0,0) scale(1) rotate(-5deg)',offset:0},
      {opacity:1,transform:'translate(0,0) scale(1) rotate(-5deg)',offset:.15},
      {opacity:1,transform:'translate(0,0) scale(1) rotate(-5deg)',offset:.3},
      {opacity:1,transform:`translate(${innerWidth*.16}px,0) scale(1) rotate(5deg)`,offset:.55},
      {opacity:1,transform:`translate(${endX-start.left+(endWidth-start.width)/2}px,${endY-start.top+(endHeight-start.height)/2}px) scale(${endWidth/start.width}) rotate(-7deg)`,offset:1}
    ],{duration:2300,easing:'cubic-bezier(.4,0,.2,1)',fill:'both'});
    overlay.classList.add('is-playing');
  }));
  timer=setTimeout(close,3200);
})();
