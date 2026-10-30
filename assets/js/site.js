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

(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var en = document.documentElement.lang === 'en';

  /* Zaglavlje koje ostaje gore */
  var header = document.querySelector('header');
  if (header) {
    var spacer = document.createElement('div');
    header.parentNode.insertBefore(spacer, header);
    var fixed = false, startY = 0;
    var measure = function(){ startY = header.getBoundingClientRect().top + window.scrollY + header.offsetHeight + 160; };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('scroll', function(){
      var y = window.scrollY;
      if (!fixed && y > startY) { spacer.style.height = header.offsetHeight + 'px'; header.classList.add('bw-fixed'); fixed = true; }
      else if (fixed && y < startY - 120) { header.classList.remove('bw-fixed'); spacer.style.height = '0'; fixed = false; }
    }, { passive: true });
  }

  /* Parallax na velikim pozadinskim fotografijama */
  if (!reduce) {
    var px = [].slice.call(document.querySelectorAll('[data-parallax], section > img[aria-hidden="true"]'));
    px.forEach(function(el){ el.style.transform = 'scale(1.12)'; });
    var tick = false;
    var run = function(){
      var vh = window.innerHeight;
      px.forEach(function(el){
        var r = el.parentNode.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var off = ((r.top + r.height / 2) - vh / 2) * -0.12;
        el.style.transform = 'translate3d(0,' + off.toFixed(1) + 'px,0) scale(1.12)';
      });
      tick = false;
    };
    window.addEventListener('scroll', function(){ if (!tick) { tick = true; requestAnimationFrame(run); } }, { passive: true });
    run();
  }

  /* Vodoravni klizač */
  document.querySelectorAll('.bw-slider').forEach(function(sl){
    var sec = sl.closest('section');
    sec && sec.querySelectorAll('.bw-slider-btn').forEach(function(b){
      b.addEventListener('click', function(){ sl.scrollBy({ left: (+b.dataset.dir) * sl.clientWidth * 0.8, behavior: 'smooth' }); });
    });
    var down = false, sx = 0, sl0 = 0, moved = false;
    sl.addEventListener('mousedown', function(e){ down = true; moved = false; sx = e.pageX; sl0 = sl.scrollLeft; sl.style.scrollSnapType = 'none'; sl.style.cursor = 'grabbing'; });
    window.addEventListener('mouseup', function(){ if (!down) return; down = false; sl.style.scrollSnapType = ''; sl.style.cursor = ''; });
    sl.addEventListener('mousemove', function(e){ if (!down) return; var dx = e.pageX - sx; if (Math.abs(dx) > 5) moved = true; sl.scrollLeft = sl0 - dx; });
    sl.addEventListener('click', function(e){ if (moved) { e.stopPropagation(); e.preventDefault(); } }, true);
    sl.addEventListener('keydown', function(e){ if (e.key === 'ArrowRight') sl.scrollBy({ left: 300 }); if (e.key === 'ArrowLeft') sl.scrollBy({ left: -300 }); });
  });

  /* Povećanje fotografija */
  var groups = document.querySelectorAll('[data-lightbox]');
  if (groups.length) {
    var lb, lbImg, lbCap, list = [], idx = 0, lastFocus;
    var build = function(){
      lb = document.createElement('div'); lb.className = 'bw-lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true');
      lb.innerHTML = '<img alt=""><p></p><button type="button" class="bw-lb-close" aria-label="' + (en ? 'Close' : 'Zatvori') + '">✕</button>' +
        '<button type="button" class="bw-lb-prev" aria-label="' + (en ? 'Previous' : 'Prethodna') + '">←</button>' +
        '<button type="button" class="bw-lb-next" aria-label="' + (en ? 'Next' : 'Sljedeća') + '">→</button>';
      document.body.appendChild(lb);
      lbImg = lb.querySelector('img'); lbCap = lb.querySelector('p');
      lb.querySelector('.bw-lb-close').onclick = close;
      lb.querySelector('.bw-lb-prev').onclick = function(){ show(idx - 1); };
      lb.querySelector('.bw-lb-next').onclick = function(){ show(idx + 1); };
      lb.addEventListener('click', function(e){ if (e.target === lb) close(); });
    };
    var show = function(i){
      idx = (i + list.length) % list.length;
      var im = list[idx];
      lbImg.src = (im.currentSrc || im.src).replace('-800.webp', '-1600.webp');
      lbImg.alt = im.alt; lbCap.textContent = im.alt + '  ·  ' + (idx + 1) + ' / ' + list.length;
    };
    var open = function(group, im){
      if (!lb) build();
      list = [].slice.call(group.querySelectorAll('img')); lastFocus = document.activeElement;
      show(list.indexOf(im)); lb.style.display = 'flex';
      requestAnimationFrame(function(){ lb.classList.add('open'); });
      document.body.style.overflow = 'hidden'; lb.querySelector('.bw-lb-close').focus();
    };
    function close(){ lb.classList.remove('open'); document.body.style.overflow = ''; setTimeout(function(){ lb.style.display = 'none'; }, 300); lastFocus && lastFocus.focus(); }
    document.addEventListener('keydown', function(e){
      if (!lb || lb.style.display !== 'flex') return;
      if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') show(idx + 1); if (e.key === 'ArrowLeft') show(idx - 1);
    });
    groups.forEach(function(g){
      g.querySelectorAll('img').forEach(function(im){
        im.setAttribute('tabindex', '0');
        im.addEventListener('click', function(){ open(g, im); });
        im.addEventListener('keydown', function(e){ if (e.key === 'Enter') open(g, im); });
      });
    });
  }

  /* Odbrojavanje do sljedeće večeri (datum u data-date) */
  var pad = function(n){ return (n < 10 ? '0' : '') + n; };
  var cds = document.querySelectorAll('.bw-countdown, .bw-countdown-inline');
  var upd = function(){
    cds.forEach(function(c){
      var t = new Date(c.getAttribute('data-date')).getTime() - Date.now();
      if (isNaN(t)) return;
      if (t <= 0) { if (c.classList.contains('bw-countdown')) c.style.display = 'none'; return; }
      var d = Math.floor(t / 864e5), h = Math.floor(t % 864e5 / 36e5), m = Math.floor(t % 36e5 / 6e4);
      if (c.classList.contains('bw-countdown-inline')) { c.textContent = c.getAttribute('data-tpl').replace('{d}', d); return; }
      var s = function(k, v){ var e = c.querySelector('[data-cd="' + k + '"]'); if (e) e.textContent = pad(v); };
      s('d', d); s('h', h); s('m', m);
    });
  };
  if (cds.length) { upd(); setInterval(upd, 30000); }
})();
