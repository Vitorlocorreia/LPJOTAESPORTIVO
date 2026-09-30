export function setupExperience({setHorizontal,updateCaseControls,count}) {
  if(!window.gsap||!window.ScrollTrigger)return;
  const {gsap,ScrollTrigger}=window;gsap.registerPlugin(ScrollTrigger);
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const mm=gsap.matchMedia();
  mm.add('(prefers-reduced-motion: no-preference)',()=>{
    gsap.from('.hero h1>span',{yPercent:35,opacity:0,stagger:.12,duration:1.1,ease:'power3.out',clearProps:'all'});
    $$('.reveal').forEach(el=>gsap.from(el,{clipPath:'inset(30% 0 15% 0)',y:45,duration:1.2,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%'},clearProps:'clipPath'}));
    gsap.to('.sports-band>div',{xPercent:-20,ease:'none',scrollTrigger:{trigger:'.sports-band',start:'top bottom',end:'bottom top',scrub:1}});
    gsap.to('.asterisk',{rotation:135,ease:'none',scrollTrigger:{trigger:'.manifesto',start:'top bottom',end:'bottom top',scrub:1}});
    gsap.from('.proof strong',{yPercent:30,opacity:0,duration:1.2,scrollTrigger:{trigger:'.proof',start:'top 88%'}});
    gsap.to('.services-bg',{yPercent:15,scale:1.12,ease:'none',scrollTrigger:{trigger:'.services',start:'top bottom',end:'bottom top',scrub:1}});
    gsap.from('.contact-arrow',{x:-50,y:50,rotation:-35,opacity:0,duration:1.3,scrollTrigger:{trigger:'.contact',start:'top 70%'}});
    gsap.from('.footer-word',{yPercent:45,ease:'none',scrollTrigger:{trigger:'footer',start:'top bottom',end:'bottom bottom',scrub:1}});
    const image=$('#audience-image');$$('[data-audience]').forEach(button=>button.addEventListener('click',()=>gsap.fromTo(image,{clipPath:'inset(0 100% 0 0)',scale:1.1},{clipPath:'inset(0 0% 0 0)',scale:1,duration:.65,ease:'power3.out',overwrite:true})));
  });
  mm.add('(min-width: 1001px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)',()=>{
    const hero=$('.hero');
    const tl=gsap.timeline({scrollTrigger:{trigger:hero,start:'top top',end:'+=95%',pin:true,scrub:.8,onUpdate:self=>{window.JOTA_HERO_PROGRESS=self.progress;window.dispatchEvent(new Event("jota:hero"));},onLeave:()=>{window.JOTA_HERO_PROGRESS=1;},onLeaveBack:()=>{window.JOTA_HERO_PROGRESS=0;}}});
    tl.to('.hero-world>img',{scale:1.45,opacity:.65,duration:1.15,ease:'none'},0)
      .to('.hero-copy',{y:-110,opacity:0,ease:'power1.in'},0)
      .to('.film-one',{xPercent:85,yPercent:-70,rotation:18,opacity:0,ease:'none'},0)
      .to('.film-two',{xPercent:-180,yPercent:90,rotation:-18,opacity:0,ease:'none'},0)
      .to('.world-type',{xPercent:-18,scale:1.2,duration:1.15,ease:'none'},0)
      .to('.hero-bottom,.hero-top,.object-caption',{opacity:0,ease:'none'},0)
      ;
    const cases=$('.cases'),track=$('.case-track'),win=$('.case-window');cases.classList.add('pin-layout');win.classList.add('is-pinned');win.scrollLeft=0;
    const distance=()=>Math.max(0,track.scrollWidth-win.clientWidth);
    const tween=gsap.to(track,{x:()=>-distance(),ease:'none',scrollTrigger:{trigger:cases,start:'top top',end:()=>'+='+distance()*.8,pin:true,scrub:.65,invalidateOnRefresh:true,onUpdate:self=>updateCaseControls(Math.round(self.progress*(count-1)))}});setHorizontal(tween.scrollTrigger);
    gsap.to('.team-main',{y:-60,rotation:-1,ease:'none',scrollTrigger:{trigger:'.team',start:'top bottom',end:'bottom top',scrub:1}});
    gsap.to('.team-secondary',{y:-120,rotation:3,ease:'none',scrollTrigger:{trigger:'.team',start:'top bottom',end:'bottom top',scrub:1}});
    gsap.from('.service-photo',{rotation:4,y:60,scrollTrigger:{trigger:'.services',start:'top 80%',end:'bottom bottom',scrub:1}});
    return()=>{setHorizontal(null);window.JOTA_HERO_PROGRESS=undefined;cases.classList.remove('pin-layout');win.classList.remove('is-pinned');};
  });
  const manifesto=$('.manifesto-text'),original=manifesto.innerHTML;
  mm.add('(min-width: 701px) and (prefers-reduced-motion: no-preference)',()=>{
    const walk=node=>[...node.childNodes].forEach(child=>{if(child.nodeType===3){const frag=document.createDocumentFragment();child.textContent.split(/(\s+)/).forEach(word=>{if(!word.trim())frag.appendChild(document.createTextNode(word));else{const span=document.createElement('span');span.textContent=word;frag.appendChild(span);}});child.replaceWith(frag);}else if(child.nodeType===1)walk(child);});walk(manifesto);
    gsap.fromTo(manifesto.querySelectorAll('span'),{opacity:.2},{opacity:1,stagger:.08,ease:'none',scrollTrigger:{trigger:manifesto,start:'top 80%',end:'bottom 40%',scrub:.4}});
    return()=>manifesto.innerHTML=original;
  });
  const photos=['campo.webp','bastidores.webp','conteudo.webp','stadium.webp','football.webp'];
  $$('.service-list details').forEach((item,i)=>item.addEventListener('toggle',()=>{if(!item.open)return;$$('.service-list details').forEach(other=>{if(other!==item)other.open=false;});$('.service-photo img').src='assets/'+photos[i];}));
  document.fonts.ready.then(()=>ScrollTrigger.refresh());window.addEventListener('load',()=>ScrollTrigger.refresh(),{once:true});
}
