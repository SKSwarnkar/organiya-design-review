(() => {
 'use strict';
 const designs={
  a:{name:'Botanical Editorial',description:'Warm ivory, botanical green and spacious editorial storytelling.',folder:'a-c'},
  b:{name:'Contemporary Crunch',description:'Lime, bold typography and an energetic snack identity.',folder:'a-c'},
  c:{name:'Modern Pantry',description:'Quiet sage, precise grids and clear catalog browsing.',folder:'a-c'},
  d:{name:'The Indian Table',description:'Chai-time storytelling, terracotta and a snack-menu layout.',folder:'d-f'},
  e:{name:'Ingredient Atlas',description:'Cobalt blue, numbered layouts and ingredient discovery.',folder:'d-f'},
  f:{name:'Everyday Good',description:'Peach and plum, soft shapes and everyday snack occasions.',folder:'d-f'},
  g:{name:'Leaf & Cream',description:'From F · Organiya leaf green, warm cream and soft botanical tones.',folder:'g-i'},
  h:{name:'Fresh Lime',description:'From F · Bright lime accents, clear greens and an upbeat everyday feel.',folder:'g-i'},
  i:{name:'Forest & Sage',description:'From F · Spicenza forest green, pale sage and richer contrast.',folder:'g-i'},
  j:{name:'Vermilion & Cream',description:'From F · Organiya vermilion, warm ivory and a soft red glow.',folder:'j-l'},
  k:{name:'Chai & Cocoa',description:'From F · Deep cocoa, caramel and comforting chai tones from D.',folder:'j-l'},
  l:{name:'Red Chai',description:'From F · Chai warmth, cocoa type and rich red accents together.',folder:'j-l'},
  m:{name:'Turmeric & Cream',description:'From F · Golden turmeric, toasted spice and warm cream.',folder:'m-o'},
  n:{name:'Kokum & Rose',description:'From F · Rich kokum plum, rose and a touch of golden warmth.',folder:'m-o'},
  o:{name:'Mango & Pistachio',description:'From F · Ripe mango tones, pistachio green and a fresh, sunny feel.',folder:'m-o'}
 };
 const products=[['chia-crunch-sticks','Chia Crunch Sticks'],['flax-crunch-sticks','Flax Crunch Sticks'],['millet-crunch-crisps','Millet Crunch Crisps'],['veggie-crisps','Veggie Crisps'],['protein-crunch-mix','Protein Crunch Mix'],['smart-snacking-variety-pack','Smart Snacking Variety Pack']];
 const pages=['home','catalog','product','about','distributors','contact'];
 const categories=['All snacks','Sticks','Crisps','Mixes','Assortments'];
 const q=new URLSearchParams(location.search);
 const validState=s=>({design:designs[s.design]?s.design:'a',page:pages.includes(s.page)?s.page:'home',product:products.some(p=>p[0]===s.product)?s.product:products[0][0],category:categories.includes(s.category)?s.category:'All snacks',audience:s.audience==='business'?'business':'consumer'});
 let state=validState(Object.fromEntries(q));let width=['desktop','tablet','mobile'].includes(q.get('viewport'))?q.get('viewport'):'desktop';let loading=false,pendingUrl='';
 const frame=document.getElementById('preview-frame'),pageSelect=document.getElementById('page-select'),productSelect=document.getElementById('product-select');
 document.getElementById('option-grid').innerHTML=Object.entries(designs).map(([key,d])=>`<button id="option-${key}" class="option-card" data-design="${key}" aria-pressed="false"><img src="assets/option-${key}.webp" width="900" height="625" alt="Homepage preview of ${d.name}"><div class="option-card-copy"><span class="option-letter">${key.toUpperCase()}</span><div><h3>${d.name}</h3><p>${d.description}</p></div><span class="option-arrow" aria-hidden="true">↗</span></div></button>`).join('');
 productSelect.innerHTML=products.map(([slug,name])=>`<option value="${slug}">${name}</option>`).join('');
 document.getElementById('preference').insertAdjacentHTML('beforeend',Object.entries(designs).map(([key,d])=>`<option value="${key}">${key.toUpperCase()} — ${d.name}</option>`).join(''));
 function dimensions(){document.getElementById('viewport-label').textContent=`${Math.round(frame.getBoundingClientRect().width)}px · ${width==='desktop'?'Responsive desktop':width==='tablet'?'Tablet':'Mobile'} preview`;}
 function sync(load=true){
  const d=designs[state.design];document.querySelectorAll('[data-design]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.design===state.design)));document.querySelectorAll('[data-width]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.width===width)));
  pageSelect.value=state.page;productSelect.value=state.product;document.getElementById('product-field').hidden=!['product','contact'].includes(state.page);
  document.getElementById('current-letter').textContent=state.design.toUpperCase();document.getElementById('current-name').textContent=d.name;
  const path=d.folder+'/site.html?'+new URLSearchParams(state);document.getElementById('full-preview').href=path;frame.title=`Organiya — ${d.name} preview`;frame.className=width;
  if(load){loading=true;pendingUrl=new URL(path,location.href).href;frame.style.height='1000px';frame.src=path;document.getElementById('link-status').textContent='';}
  history.replaceState(null,'','?'+new URLSearchParams({...state,viewport:width}));dimensions();
 }
 document.querySelectorAll('[data-design]').forEach(b=>b.addEventListener('click',()=>{state.design=b.dataset.design;sync();document.getElementById('preview').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});}));
 document.querySelectorAll('[data-width]').forEach(b=>b.addEventListener('click',()=>{width=b.dataset.width;sync(false);}));
 pageSelect.addEventListener('change',()=>{state.page=pageSelect.value;sync();});productSelect.addEventListener('change',()=>{state.product=productSelect.value;sync();});
 frame.addEventListener('load',()=>{
  if(!loading||frame.contentWindow.location.href!==pendingUrl)return;
  loading=false;const app=frame.contentDocument.getElementById('app');
  if(app)frame.style.height=Math.max(500,Math.ceil(Math.max(app.scrollHeight,app.getBoundingClientRect().height)))+'px';
  dimensions();
 });
 window.addEventListener('message',e=>{
  if(loading||e.source!==frame.contentWindow||e.origin!==location.origin||e.data?.type!=='organiya-preview'||e.data.state?.design!==state.design)return;
  const actual=validState(Object.fromEntries(new URL(frame.contentWindow.location.href).searchParams));
  if(Object.keys(actual).some(key=>actual[key]!==e.data.state[key]))return;
  state=actual;sync(false);
  if(Number.isFinite(e.data.height)&&e.data.height>0&&e.data.height<100000)frame.style.height=Math.max(500,e.data.height)+'px';
 });
 new ResizeObserver(dimensions).observe(frame);
 document.getElementById('copy-link').addEventListener('click',async()=>{const status=document.getElementById('link-status');try{await navigator.clipboard.writeText(location.href);status.textContent='Link copied. It opens this design, page and product.';}catch{status.textContent='Copy the URL from your browser address bar to share this view.';}});
 document.getElementById('feedback-form').addEventListener('submit',async e=>{
  e.preventDefault();const choice=document.getElementById('preference').value;const likes=document.getElementById('likes').value.trim(),changes=document.getElementById('changes').value.trim();
  const text=`Organiya website design feedback\n\nPreferred direction: ${choice?choice.toUpperCase()+' — '+designs[choice].name:'Not decided yet'}\n\nWhat works well:\n${likes||'(Add your thoughts)'}\n\nWhat I would change:\n${changes||'(Add your thoughts)'}\n\nReview link: ${location.origin==='null'?location.href:location.origin+location.pathname}`;
  const status=document.getElementById('feedback-status'),fallback=document.getElementById('copy-fallback');
  try{await navigator.clipboard.writeText(text);fallback.hidden=true;status.textContent='Copied. Paste it into your reply to the person who shared this review. Nothing was sent by this page.';}catch{fallback.value=text;fallback.hidden=false;fallback.focus();fallback.select();status.textContent='Your feedback is ready below. Copy it and paste it into your reply. Nothing was sent by this page.';}
 });
 sync();
})();
