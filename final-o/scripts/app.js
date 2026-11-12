import {products,site,copy,state,setState,readState,product,notifyParent,loadContent} from './runtime.js?v=10';
import {header,footer,photo,link} from './components.js?v=10';
import {home,momentPanel} from './pages/home.js?v=10';
import {catalog,renderProducts} from './pages/catalog.js?v=10';
import {productPage} from './pages/product.js?v=10';
import {about} from './pages/story.js?v=10';
import {distributors} from './pages/distributors.js?v=10';
import {contact} from './pages/contact.js?v=10';
import {galleryClick,galleryDialog,bindGallery} from './gallery.js?v=10';
const app=document.getElementById('app');let searchTerm='';
function render(scroll=false){
    document.body.className='design-f design-'+state.design;
    document.title=`${state.page==='product'?product().name:({home:'Discover Spicenza',catalog:'Spicenza snacks',about:'Our story',distributors:'For retailers',contact:'Contact'})[state.page]} · Organiya`;
    const body=state.page==='home'?home():({catalog,product:productPage,about,distributors,contact}[state.page])();
    app.innerHTML=header()+`<main id="main">${body}</main>`+footer()+(state.page==='product'?galleryDialog():'');
    if(state.page==='catalog') renderProducts(searchTerm);
    bind();bindGallery();
    if(scroll){window.scrollTo({top:0,behavior:'instant'});const heading=document.querySelector('h1');heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});}
    notifyParent();
  }
function bind(){
    const menu=document.querySelector('.menu-toggle');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu');document.body.classList.toggle('menu-open',open);notifyParent();});
    app.onclick=e=>{
      if(galleryClick(e))return;
      if(e.target.closest("[data-clear-search],[data-reset-search]")){searchTerm="";if(e.target.closest("[data-reset-search]")){state.category="All snacks";history.replaceState(null,"","?"+new URLSearchParams(state));render(false);}document.getElementById("product-search").value="";renderProducts(searchTerm);document.getElementById("product-search").focus();return;}
      const moment=e.target.closest('[data-moment]');
      if(moment){document.querySelectorAll('[data-moment]').forEach(b=>b.setAttribute('aria-pressed',String(b===moment)));document.getElementById('moment-panel').innerHTML=momentPanel(moment.dataset.moment);notifyParent();return;}

      const a=e.target.closest('a[data-nav]');if(a&&!e.metaKey&&!e.ctrlKey&&!e.shiftKey){e.preventDefault();history.pushState(null,'',a.href);setState(readState());searchTerm="";render(true);return;}
      const filter=e.target.closest('[data-filter]');if(filter){state.category=filter.dataset.filter;history.replaceState(null,'','?'+new URLSearchParams(state));document.querySelectorAll('[data-filter]').forEach(el=>{el.setAttribute('aria-pressed',String(el===filter));el.classList.toggle('selected',el===filter);});renderProducts(searchTerm);notifyParent();}
      const audience=e.target.closest('[data-audience]');if(audience){state.audience=audience.dataset.audience;history.replaceState(null,'','?'+new URLSearchParams(state));render(false);document.querySelector(`[data-audience="${state.audience}"]`).focus();}
      if(e.target.closest('[data-reset-form]')){const panel=e.target.closest('.form-panel');panel.querySelector('.form-success').hidden=true;panel.querySelector('form').hidden=false;panel.querySelector('input').focus();notifyParent();}
    };
    const search=document.getElementById('product-search');if(search){search.value=searchTerm;search.addEventListener('input',()=>{searchTerm=search.value;renderProducts(searchTerm)})}
    document.querySelectorAll('[data-demo-form]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();if(!f.reportValidity())return;f.reset();f.hidden=true;const success=f.nextElementSibling;success.hidden=false;success.setAttribute('tabindex','-1');success.focus({preventScroll:true});notifyParent();}));
    document.querySelectorAll('select[name="product"]').forEach(el=>el.addEventListener('change',()=>{if(products.some(p=>p.slug===el.value)){state.product=el.value;history.replaceState(null,'','?'+new URLSearchParams(state));const aside=document.querySelector('.contact-product');if(aside){const p=product();aside.innerHTML=photo(p)+`<div><p class="eyebrow">YOUR PRODUCT INTEREST</p><h2>${p.name}</h2>${link('catalog','Explore other snacks ↗','quiet-link')}</div>`;}notifyParent();}}));
    document.querySelectorAll('details').forEach(el=>el.addEventListener('toggle',notifyParent));
    document.querySelectorAll('img').forEach(img=>img.addEventListener('load',notifyParent,{once:true}));
  }
window.addEventListener('popstate',()=>{setState(readState());searchTerm='';render(true)});
window.addEventListener('resize',notifyParent);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.body.classList.contains('menu-open')){document.querySelector('.menu-toggle').click();document.querySelector('.menu-toggle').focus()}});
try{await loadContent();setState(readState());render();new ResizeObserver(()=>requestAnimationFrame(notifyParent)).observe(app)}catch(error){app.innerHTML='<main class="container content-error"><h1>The catalog could not load.</h1><p>Please refresh the page to try again.</p><button onclick="location.reload()">Try again</button></main>';console.error(error)}
