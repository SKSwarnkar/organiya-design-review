export let products=[],site={},copy={},snackMoments=[],categories=[];
export let state={};
export const validPages=['home','catalog','product','about','distributors','contact'];
export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const lines=a=>a.map(esc).join('<br>');
export const heading=a=>a.map(x=>x.emphasis?`<em>${esc(x.text)}</em>`:esc(x.text)).join('<br>');
export const arrow='<span aria-hidden="true">↗</span>';
export const product=()=>products.find(p=>p.slug===state.product)||products[0];
export function setState(value){state=value;}
export function readState(){const q=new URLSearchParams(location.search);return {design:'o',page:validPages.includes(q.get('page'))?q.get('page'):'home',product:products.some(p=>p.slug===q.get('product'))?q.get('product'):products[0].slug,category:categories.includes(q.get('category'))?q.get('category'):'All snacks',audience:q.get('audience')==='business'?'business':'consumer'};}
export function url(page,extra={}){return 'site.html?'+new URLSearchParams({design:'o',page,product:state.product,...extra});}
export function notifyParent(){const app=document.getElementById('app');if(window.parent!==window)window.parent.postMessage({type:'organiya-preview',state,height:Math.ceil(Math.max(app.scrollHeight,app.getBoundingClientRect().height))},location.origin);}
export async function loadContent(){const response=await Promise.all(['products','site','pages'].map(async name=>{const r=await fetch('content/'+name+'.json');if(!r.ok)throw Error('Content unavailable');return r.json()}));[products,site,copy]=response;categories=site.categories;snackMoments=copy.moments;if(!products.length||products.some(p=>!p.slug||!p.name||!p.image))throw Error('Product content incomplete');}
