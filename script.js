const navToggle=document.querySelector('.nav-toggle');
const mainNav=document.querySelector('#main-nav');
navToggle?.addEventListener('click',()=>{const open=mainNav?.classList.toggle('open')??false;navToggle.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>{mainNav?.classList.remove('open');navToggle?.setAttribute('aria-expanded','false');}));
if('IntersectionObserver' in window){const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');revealObserver.unobserve(e.target);}}),{threshold:.12});document.querySelectorAll('.reveal:not(.is-visible)').forEach(el=>revealObserver.observe(el));}
const sections=[...document.querySelectorAll('main section[id]')];const links=[...document.querySelectorAll('.main-nav a')];
if('IntersectionObserver' in window){const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${e.target.id}`));}),{rootMargin:'-40% 0px -55% 0px'});sections.forEach(s=>navObserver.observe(s));}
document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;img.closest('figure')?.classList.add('image-fallback');}));
