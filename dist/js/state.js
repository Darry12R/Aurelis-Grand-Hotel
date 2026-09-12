const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
export const state={cart:read('aur-cart',[]),favorites:read('aur-favorites',[]),orders:read('aur-orders',[]),reservations:read('aur-reservations',[]),lang:read('aur-lang','es'),category:'Todos',filter:'Todos',search:'',favoritesOnly:false};
export function save(){for(const key of ['cart','favorites','orders','reservations','lang'])localStorage.setItem('aur-'+key,JSON.stringify(state[key]));}
export const money=n=>'S/ '+n.toFixed(2);
export const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const t=(es,en)=>state.lang==='es'?es:en;
export function toast(message){const el=document.createElement('div');el.className='toast';el.textContent=message;document.querySelector('#toasts').append(el);setTimeout(()=>el.remove(),3500);}
export function icon(name){const paths={bag:'M6 7h12l2 14H4L6 7Zm3 0V5a3 3 0 0 1 6 0v2',search:'m21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',user:'M20 21a8 8 0 0 0-16 0M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',heart:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',menu:'M3 7h18M3 16h18',close:'m5 5 14 14M5 19 19 5',arrow:'M3 12h18m-6-6 6 6-6 6',chat:'M21 11a9 9 0 0 1-9 9H3l1-5a9 9 0 1 1 17-4Z',check:'m5 12 4 4L19 6'};return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">${(paths[name]||paths.arrow).split('~').map(d=>`<path d="${d}"/>`).join('')}</svg>`}
