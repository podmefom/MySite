document.addEventListener('DOMContentLoaded', () => {
  setupMenu();
  setupSmoothScroll();
  setupFAQ();
  setupModal();
  setupEmailForm();
  setupScrollAnimations();
});

function setupMenu(){
  const btn=document.querySelector('.mobile-menu-btn');
  const nav=document.querySelector('.nav');
  if(!btn||!nav)return;
  btn.addEventListener('click',()=>nav.classList.toggle('open'));
}

function setupSmoothScroll(){
  const links=document.querySelectorAll('a[href^="#"]');
  links.forEach(link=>{
    link.addEventListener('click',e=>{
      const id=link.getAttribute('href');
      if(id.length>1){
        e.preventDefault();
        const el=document.querySelector(id);
        if(el){
          const y=el.getBoundingClientRect().top+window.scrollY-80;
          window.scrollTo({top:y,behavior:'smooth'});
        }
      }
    });
  });
}

function setupFAQ(){
  const items=document.querySelectorAll('.faq-item');
  items.forEach(item=>{
    const question=item.querySelector('.faq-question');
    question.addEventListener('click',()=>{
      items.forEach(i=>i.classList.remove('active'));
      item.classList.toggle('active');
    });
  });
}

function setupModal(){
  const modal=document.getElementById('emailModal');
  const openBtns=document.querySelectorAll('[data-action="open-form"]');
  const closeBtn=document.querySelector('.modal-close');
  const overlay=document.querySelector('.modal-overlay');
  const close=()=>{modal.classList.remove('active');document.body.style.overflow='';};
  openBtns.forEach(btn=>btn.addEventListener('click',()=>{modal.classList.add('active');document.body.style.overflow='hidden';}));
  if(closeBtn)closeBtn.addEventListener('click',close);
  if(overlay)overlay.addEventListener('click',close);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('active'))close();});
}

function setupEmailForm(){
  const form=document.getElementById('emailForm');
  const success=document.getElementById('formSuccess');
  if(!form)return;
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const emailInput=form.querySelector('#email');
    const btn=form.querySelector('.form-button');
    const text=btn.textContent;
    btn.textContent='отправка...';
    btn.disabled=true;
    await new Promise(r=>setTimeout(r,1500));
    console.log('email:',emailInput.value);
    form.style.display='none';
    success.classList.add('active');
    setTimeout(()=>{
      document.getElementById('emailModal').classList.remove('active');
      document.body.style.overflow='';
      setTimeout(()=>{
        form.style.display='flex';
        success.classList.remove('active');
        form.reset();
        btn.textContent=text;
        btn.disabled=false;
      },300);
    },3000);
  });
}

function setupScrollAnimations(){
  const items=document.querySelectorAll('.about-card, .benefit-card, .pricing-card, .faq-item');
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.opacity='1';
        e.target.style.transform='translateY(0)';
      }
    });
  },{threshold:.1,rootMargin:'0px 0px -100px 0px'});
  items.forEach((el,i)=>{
    el.style.opacity='0';
    el.style.transform='translateY(30px)';
    el.style.transition=`opacity 0.6s ease-out ${i*0.1}s, transform 0.6s ease-out ${i*0.1}s`;
    observer.observe(el);
  });
}

const header=document.querySelector('.header');
window.addEventListener('scroll',()=>{
  const y=window.scrollY;
  if(y>100){header.style.background='rgba(10, 10, 15, 0.95)';header.style.boxShadow='0 4px 12px rgba(0,0,0,.3)';}
  else{header.style.background='rgba(10, 10, 15, 0.8)';header.style.boxShadow='none';}
});
