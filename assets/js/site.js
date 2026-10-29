(function(){
  var b=document.querySelector('.bw-menu-btn');
  if(b){b.addEventListener('click',function(){var o=document.body.classList.toggle('menu-open');b.setAttribute('aria-expanded',o?'true':'false');});}
  var c=document.getElementById('cookie-banner');
  if(c){
    var v=null;try{v=localStorage.getItem('bw-cookies');}catch(e){}
    if(!v){c.hidden=false;}
    c.querySelectorAll('[data-cookie]').forEach(function(btn){btn.addEventListener('click',function(){
      try{localStorage.setItem('bw-cookies',btn.getAttribute('data-cookie'));}catch(e){}
      c.hidden=true;
      /* Ovdje uključiti analitiku samo ako je btn.dataset.cookie === 'all' */
    });});
  }
  document.querySelectorAll('form[data-demo]').forEach(function(f){f.addEventListener('submit',function(e){
    e.preventDefault();
    var m=f.querySelector('.bw-form-msg');
    if(!m){m=document.createElement('p');m.className='bw-form-msg';m.setAttribute('role','status');m.style.cssText='grid-column:1/-1;margin:0;color:#C9A55C;font-size:.9rem';f.appendChild(m);}
    m.textContent=document.documentElement.lang==='en'?'Thank you! Your message has been received – we will be in touch soon.':'Hvala! Poruka je zaprimljena – javit ćemo vam se uskoro.';
    f.reset();
  });});
})();
