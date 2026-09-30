(() => {
  const paths={
    '↗':'M5 19 19 5M5 5h14v14',
    '→':'M3 12h18m-7-7 7 7-7 7',
    '←':'M21 12H3m7-7-7 7 7 7',
    '↓':'M12 3v18m-7-7 7 7 7-7',
    '↑':'M12 21V3m-7 7 7-7 7 7',
    '×':'M6 6l12 12M18 6 6 18',
    '✳':'M12 2v20M2 12h20M5 5l14 14M19 5 5 19'
  };
  function replace(root){
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),nodes=[];
    while(walker.nextNode()){
      const node=walker.currentNode;
      if(/[↗→←↓↑×✳]/.test(node.data)&&!node.parentElement?.closest('script,style,textarea,pre,svg,title'))nodes.push(node);
    }
    nodes.forEach(node=>{
      const fragment=document.createDocumentFragment();
      node.data.split(/([↗→←↓↑×✳])/).forEach(part=>{
        if(!paths[part]){fragment.append(document.createTextNode(part));return;}
        const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
        svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');svg.setAttribute('focusable','false');svg.setAttribute('class','ui-icon');
        const path=document.createElementNS(svg.namespaceURI,'path');
        path.setAttribute('d',paths[part]);path.setAttribute('fill','none');path.setAttribute('stroke','currentColor');path.setAttribute('stroke-width','1.8');path.setAttribute('stroke-linecap','square');path.setAttribute('stroke-linejoin','miter');svg.append(path);fragment.append(svg);
      });node.replaceWith(fragment);
    });
  }
  replace(document.body);
  // Case dialogs and form-step buttons also use vectors when their text changes.
  new MutationObserver(records=>{for(const record of records){if(record.type==='characterData')replace(record.target.parentNode);else for(const node of record.addedNodes){if(node.nodeType===1)replace(node);else if(node.nodeType===3&&node.parentNode)replace(node.parentNode);}}}).observe(document.body,{childList:true,subtree:true,characterData:true});
})();
