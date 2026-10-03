const navToggle=document.querySelector('.nav-toggle');
const mainNav=document.querySelector('#main-nav');
navToggle?.addEventListener('click',()=>{const open=mainNav?.classList.toggle('open')??false;navToggle.setAttribute('aria-expanded',String(open));});
document.querySelectorAll('.main-nav a').forEach(a=>a.addEventListener('click',()=>{mainNav?.classList.remove('open');navToggle?.setAttribute('aria-expanded','false');}));
if('IntersectionObserver' in window){const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');revealObserver.unobserve(e.target);}}),{threshold:.12});document.querySelectorAll('.reveal:not(.is-visible)').forEach(el=>revealObserver.observe(el));}
const sections=[...document.querySelectorAll('main section[id]')];const links=[...document.querySelectorAll('.main-nav a')];
if('IntersectionObserver' in window){const navObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${e.target.id}`));}),{rootMargin:'-40% 0px -55% 0px'});sections.forEach(s=>navObserver.observe(s));}
document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;img.closest('figure')?.classList.add('image-fallback');}));

const quiz=document.querySelector('[data-quiz]');
if(quiz){
  const questions=[...quiz.querySelectorAll('.quiz-question')];
  const progress=quiz.querySelector('[data-quiz-progress]');
  const feedback=quiz.querySelector('[data-quiz-feedback]');
  const next=quiz.querySelector('[data-quiz-next]');
  const restart=quiz.querySelector('[data-quiz-restart]');
  const answers=[0,1,1,1,0];
  let current=0,score=0,answered=false;
  function render(){
    questions.forEach((q,i)=>q.hidden=i!==current);
    progress.textContent=`${Math.min(current+1,questions.length)} / ${questions.length}`;
    next.textContent=current===questions.length-1?'Xem kết quả →':'Tiếp theo →';
    next.disabled=true; answered=false; feedback.textContent=''; feedback.className='quiz-feedback';
    questions[current].querySelectorAll('button').forEach(b=>{b.disabled=false;b.classList.remove('correct','wrong');});
    restart.hidden=true;
  }
  quiz.addEventListener('click',e=>{
    const option=e.target.closest('.quiz-options button');
    if(option){
      const q=option.closest('.quiz-question');
      if(q!==questions[current] || answered)return;
      answered=true;
      const chosen=Number(option.dataset.answer),correct=answers[current];
      q.querySelectorAll('.quiz-options button').forEach(b=>b.disabled=true);
      q.querySelectorAll('.quiz-options button')[correct].classList.add('correct');
      if(chosen===correct){score++;feedback.textContent='Chính xác.';feedback.classList.add('correct');}
      else{option.classList.add('wrong');feedback.textContent='Chưa đúng. Đáp án đúng đã được đánh dấu.';feedback.classList.add('wrong');}
      next.disabled=false;
    }
    if(e.target.closest('[data-quiz-next]') && answered){
      if(current<questions.length-1){current++;render();window.scrollTo({top:quiz.getBoundingClientRect().top+window.scrollY-120,behavior:'smooth'});}
      else{
        questions.forEach(q=>q.hidden=true);
        progress.textContent='HOÀN THÀNH';
        feedback.className='quiz-feedback correct';
        feedback.textContent=`Bạn trả lời đúng ${score}/${questions.length} câu.`;
        next.hidden=true; restart.hidden=false;
      }
    }
    if(e.target.closest('[data-quiz-restart]')){current=0;score=0;render();}
  });
  render();
}
