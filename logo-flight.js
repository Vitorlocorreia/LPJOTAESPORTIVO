export function setupLogoFlight(phone) {
  const hero=document.querySelector('.hero'),placeholder=document.querySelector('.hero-object'),scene=document.querySelector('#logo-scene');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),compact=matchMedia('(max-width: 700px)');
  const flight=document.createElement('a');flight.className='logo-flight';flight.setAttribute('aria-label','Conversar com a JOTA pelo WhatsApp');flight.tabIndex=-1;
  flight.target='_blank';flight.rel='noopener noreferrer';
  flight.innerHTML='<span class="flight-label">Conversar pelo WhatsApp ↗</span>';
  flight.prepend(scene);document.body.append(flight);document.body.classList.add('has-logo-flight');
  let model=null,version=0,frame=0,p=0,target=0,px=0,py=0,lastTime=0,layout=null;
  const clamp=n=>Math.max(0,Math.min(1,n));
  function measure(){
    const hr=hero.getBoundingClientRect(),r=placeholder.getBoundingClientRect();
    const base=Math.max(r.width,r.height),edge=compact.matches?18:28,size=compact.matches?76:88;
    layout={base,x:r.left-(base-r.width)/2,y:r.top-hr.top-(base-r.height)/2,endX:innerWidth-edge-size,endY:innerHeight-edge-size,size};
    flight.style.width=base+'px';flight.style.height=base+'px';
    scene.style.width=r.width+'px';scene.style.height=r.height+'px';scene.style.left=(base-r.width)/2+'px';scene.style.top=(base-r.height)/2+'px';
    const pinned=hero.parentElement.classList.contains('pin-spacer');
    layout.distance=pinned?Math.max(1,hero.parentElement.offsetHeight-hero.offsetHeight):Math.min(hero.offsetHeight*.8,innerHeight*.85);
    request();
  }
  function paint(time){
    frame=0;if(!layout)measure();
    target=clamp(scrollY/layout.distance);
    const dt=Math.min(48,lastTime?time-lastTime:16);lastTime=time;
    p=reduced.matches?target:p+(target-p)*(1-Math.exp(-dt/95));
    if(Math.abs(target-p)<.0003)p=target;
    const t=reduced.matches?(p>=1?1:0):p*p*(3-2*p);
    const scale=1+(layout.size/layout.base-1)*t;
    const x=layout.x+(layout.endX-layout.x)*t,y=layout.y+(layout.endY-layout.y)*t;
    flight.style.transform=`translate3d(${x}px,${y}px,0) scale(${scale})`;
    const morph=clamp((p-.84)/.16);flight.style.setProperty('--morph',morph);
    const active=p>=.98;flight.classList.toggle('is-contact',active);flight.tabIndex=active?0:-1;
    if(active)flight.href='https://wa.me/'+phone.replace(/\D/g,'');else flight.removeAttribute('href');
    scene.style.opacity=1;
    // Mobile keeps the metallic face readable instead of flattening a raster in Y.
    scene.querySelector('.logo-fallback').style.transform=reduced.matches?'none':`rotate(${compact.matches?p*360-7:-7}deg)`;
    model?.update(reduced.matches?0:p,px*(1-p),py*(1-p));
    if(p!==target)request();else lastTime=0;
  }
  function request(){if(!frame)frame=requestAnimationFrame(paint);}
  async function mount(){const current=++version;model?.dispose();model=null;if(reduced.matches||compact.matches||navigator.connection?.saveData){request();return;}try{const {mountLogo}=await import('./logo-3d.js');if(current!==version)return;model=mountLogo(scene);request();}catch{request();}}
  window.addEventListener('scroll',request,{passive:true});window.addEventListener('resize',measure,{passive:true});window.addEventListener('jota:hero',request);
  hero.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;px=(e.clientX/innerWidth-.5)*2;py=(e.clientY/innerHeight-.5)*2;request();});
  hero.addEventListener('pointerleave',()=>{px=py=0;request();});
  reduced.addEventListener('change',mount);compact.addEventListener('change',mount);
  new ResizeObserver(measure).observe(placeholder);
  document.fonts.ready.then(measure);window.addEventListener('load',measure,{once:true});measure();mount();request();
}
