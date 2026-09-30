(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const content = window.JOTA_CONTENT;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const compact = matchMedia('(max-width: 700px)');
  const track = $('#case-track');
  const header=$('.header');
  const updateHeader=()=>header.classList.toggle('is-scrolled',scrollY>8);
  window.addEventListener('scroll',updateHeader,{passive:true});updateHeader();
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const caseMarkup = item => `<article class="case-card"><div class="case-visual"><span class="case-index">${String(content.cases.indexOf(item)+1).padStart(2,'0')} / PROJETO</span><img src="${escape(item.image)}" width="640" height="800" loading="lazy" alt="${escape(item.name)} — material público do projeto"><span class="case-client">${escape(item.name)}</span></div><div class="case-info"><span class="eyebrow">${escape(item.category)}</span><h3>${escape(item.title)}</h3><div class="case-metric"><strong>${escape(item.metric)}</strong><p>${escape(item.metricLabel)}</p></div><button data-case="${escape(item.id)}" aria-label="Explorar projeto ${escape(item.name)}">Explorar projeto <span>↗</span></button></div></article>`;
  track.innerHTML = content.cases.map(caseMarkup).join('');
  $('#year').textContent = new Date().getFullYear();

  // Native dialogs preserve keyboard navigation, Escape and focus restoration.
  let dialogOpener;
  function showDialog(dialog, opener) { dialogOpener = opener || document.activeElement; dialog.showModal(); }
  $$('dialog').forEach(dialog => {
    $('.dialog-close',dialog)?.addEventListener('click',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
    dialog.addEventListener('close',()=>dialogOpener?.focus());
  });
  const menu=$('#mobile-menu'), menuButton=$('.menu-toggle');
  menuButton.addEventListener('click',()=>{showDialog(menu,menuButton);menuButton.setAttribute('aria-expanded','true');});
  $('.close-menu').addEventListener('click',()=>menu.close());
  menu.addEventListener('close',()=>menuButton.setAttribute('aria-expanded','false'));
  $$('a',menu).forEach(link=>link.addEventListener('click',()=>menu.close()));
  $('#privacy-open').addEventListener('click',e=>showDialog($('#privacy-dialog'),e.currentTarget));
  track.addEventListener('click',e=>{
    const button=e.target.closest('[data-case]');if(!button)return;
    const item=content.cases.find(item=>item.id===button.dataset.case);
    $('#case-dialog-content').innerHTML=`<span class="eyebrow">${escape(item.category)}</span><h2 id="case-dialog-title">${escape(item.name)}</h2><div class="dialog-case-grid"><img src="${escape(item.image)}" alt="${escape(item.name)}"><div><h3>O desafio</h3><p>${escape(item.objective)}</p><h3>A atuação</h3><p>${escape(item.work)}</p><h3>O resultado</h3><p>${escape(item.result)}</p><p class="case-note">${escape(item.note)}</p><a class="text-link" target="_blank" rel="noopener noreferrer" href="${escape(item.source)}">Ver publicação original ↗</a></div></div>`;
    showDialog($('#case-dialog'),button);
  });

  const windowEl=$('.case-window'),prev=$('#case-prev'),next=$('#case-next');
  let caseIndex=0,horizontalTrigger=null;
  function updateCaseControls(index){caseIndex=Math.max(0,Math.min(content.cases.length-1,index));prev.disabled=caseIndex===0;next.disabled=caseIndex===content.cases.length-1;$('.cases .section-label>span:last-child').textContent=`SELEÇÃO DE PROJETOS — ${String(caseIndex+1).padStart(2,'0')} / 03`;$('.case-progress i').style.transform=`translateX(${caseIndex*100}%)`;}
  function goCase(index){index=Math.max(0,Math.min(content.cases.length-1,index));const card=$$('.case-card')[index];const offset=card.offsetLeft-track.offsetLeft;if(horizontalTrigger){const distance=track.scrollWidth-windowEl.clientWidth;const fraction=Math.min(1,offset/distance);const target=horizontalTrigger.start+(horizontalTrigger.end-horizontalTrigger.start)*fraction;window.scrollTo({top:target,behavior:reduced.matches?'instant':'smooth'});}else{windowEl.scrollTo({left:offset,behavior:reduced.matches?'instant':'smooth'});}updateCaseControls(index);}
  prev.addEventListener('click',()=>goCase(caseIndex-1));next.addEventListener('click',()=>goCase(caseIndex+1));
  windowEl.addEventListener('keydown',e=>{if(e.target!==windowEl)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();goCase(caseIndex+(e.key==='ArrowRight'?1:-1));}});
  windowEl.addEventListener('scroll',()=>{if(horizontalTrigger)return;const step=$('.case-card').offsetWidth+22;updateCaseControls(Math.round(windowEl.scrollLeft/step));},{passive:true});
  // Focusing an off-screen project must also expose it visually.
  track.addEventListener('focusin',e=>{const card=e.target.closest('.case-card');if(!card)return;const index=$$('.case-card').indexOf(card);if(index!==caseIndex)goCase(index);});
  updateCaseControls(0);

  const photos=[['football.webp','Bola de futebol em um campo','PROTAGONISTAS DO JOGO'],['stadium.webp','Estádio de futebol','IDENTIDADE QUE MOBILIZA'],['case-escola.webp','Profissional da Escola 360 Pro','O FUTURO COMEÇA NA BASE'],['bastidores.webp','Produção de conteúdo esportivo','NEGÓCIOS EM MOVIMENTO'],['conteudo.webp','Conteúdo editorial sobre marcas no futebol','MARCAS DENTRO DA CULTURA'],['case-rc.webp','Publicação do evento Keeper Combat','MOMENTOS QUE FICAM'],['campo.webp','Bastidor da JOTA em campo','IDEIAS QUE MERECEM CRESCER']];
  $$('[data-audience]').forEach((button,index)=>button.addEventListener('click',()=>{
    $$('[data-audience]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    $('#audience-image').src='assets/'+photos[index][0];$('#audience-image').alt=photos[index][1];$('#audience-caption').textContent=`0${index+1} / ${photos[index][2]}`;
    $('#profile').value=button.dataset.audience;syncProfile();
  }));

  const form=$('#contact-form'), steps=$$('fieldset',form), error=$('#form-error'), back=$('#back-step'), nextStep=$('#next-step');
  let step=0;
  const labels=['01 / QUEM ENTRA EM CAMPO','02 / SEU UNIVERSO','03 / O PRÓXIMO DESAFIO'];
  function setStep(index){step=index;steps.forEach((fieldset,i)=>{fieldset.hidden=i!==step;fieldset.disabled=i!==step;});$('#step-caption').textContent=labels[step];$$('.step-dots i').forEach((dot,i)=>dot.classList.toggle('active',i<=step));back.hidden=step===0;nextStep.innerHTML=step===2?'Revisar meu projeto <span>↗</span>':'Próximo passo <span>→</span>';error.textContent='';$('input,select,textarea',steps[step])?.focus({preventScroll:true});if(form.getBoundingClientRect().top<0)form.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});}
  function syncProfile(){const athlete=$('#profile').value==='Atleta';$('#document-label').textContent=athlete?'CPF (opcional)':'CNPJ (opcional)';$('#document').maxLength=athlete?14:18;$('#document').value='';const names={Atleta:'Modalidade / nome esportivo',Clube:'Nome do clube',Escolinha:'Nome da escolinha',Empresa:'Nome da empresa',Marca:'Nome da marca',Evento:'Nome do evento',Outro:'Nome do projeto'};$('#project-name-label').textContent=names[$('#profile').value]||'Nome do projeto';$('#project-name').placeholder=athlete?'Ex.: futebol, futsal, jiu-jitsu':'Como seu projeto se chama?';}
  $('#profile').addEventListener('change',syncProfile);
  back.addEventListener('click',()=>setStep(step-1));
  form.addEventListener('input',e=>{e.target.removeAttribute('aria-invalid');e.target.setCustomValidity?.('');error.textContent='';});
  function validateStep(){
    $$('input[required]',steps[step]).filter(input=>input.type==='text').forEach(input=>input.setCustomValidity(input.value.trim()?'':'Preencha este campo.'));
    const phone=form.elements.whatsapp;
    if(step===0){const digits=phone.value.replace(/\D/g,'');phone.setCustomValidity(digits.length>=10&&digits.length<=15?'':'Informe um WhatsApp com DDD.');}
    if(step===2){const description=form.elements.descricao;description.setCustomValidity(description.value.trim().length>=10?'':'Conte um pouco mais sobre seu projeto (ao menos 10 caracteres).');}
    const invalid=$$('input,select,textarea',steps[step]).find(el=>!el.checkValidity());
    if(invalid){invalid.setAttribute('aria-invalid','true');error.textContent=invalid.validationMessage;invalid.focus();return false;}return true;
  }
  form.addEventListener('submit',event=>{
    event.preventDefault();if(!validateStep())return;
    if(step<2){setStep(step+1);return;}
    // Read only user-visible fields, including previous disabled steps. No storage.
    const v=name=>form.elements[name].value.trim();
    const parts=['Olá, JOTA! Quero conversar sobre meu projeto.',`Nome: ${v('nome')}`,`WhatsApp: ${v('whatsapp')}`,`E-mail: ${v('email')}`,`Perfil: ${v('perfil')}`,`Projeto/modalidade: ${v('projeto')}`,`Cidade/UF: ${v('cidade')}/${v('estado')}`];
    if(v('documento'))parts.push(`${v('perfil')==='Atleta'?'CPF':'CNPJ'}: ${v('documento')}`);
    if(v('instagram'))parts.push(`Instagram: ${v('instagram')}`);
    parts.push(`Interesse: ${v('servico')}`,`Descrição: ${v('descricao')}`,`Investimento: ${v('investimento')||'Prefiro conversar primeiro'}`);
    const message=parts.join('\n');$('#review-text').textContent=message;
    $('#whatsapp-send').href=`https://wa.me/${content.whatsapp.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`;
    showDialog($('#review-dialog'),nextStep);
  });

  import('./experience.js').then(({setupExperience})=>setupExperience({setHorizontal(trigger){horizontalTrigger=trigger;},updateCaseControls,count:content.cases.length})).catch(()=>{});

  import('./logo-flight.js').then(({setupLogoFlight})=>setupLogoFlight(content.whatsapp)).catch(()=>{});
})();
