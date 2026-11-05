/* Affine Studio site */
(function(){
  // The preview form posts to Formspree, which emails the answers to affinewebstudio@gmail.com.
  var ENDPOINT = 'https://formspree.io/f/xqppnnzb';
  var MAIL = 'affinewebstudios@gmail.com';

  var form = document.getElementById('preview-form');
  var planSel = document.getElementById('f-plan');
  var err = document.getElementById('form-error');

  // plan buttons carry the choice into the form
  document.querySelectorAll('[data-plan]').forEach(function(b){
    b.addEventListener('click', function(){
      planSel.value = b.getAttribute('data-plan');
      document.getElementById('start').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
      setTimeout(function(){ document.getElementById('f-name').focus({preventScroll:true}); }, 500);
    });
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var v = function(id){ return (document.getElementById(id).value || '').trim(); };
    var missing = [];
    if(!v('f-name')) missing.push('your name');
    if(!v('f-biz')) missing.push('your business name');
    if(!v('f-contact')) missing.push('a phone or email');
    if(missing.length){
      err.textContent = 'Add ' + missing.join(', ').replace(/, ([^,]*)$/, ' and $1') + ' so we can reach you.';
      err.hidden = false;
      return;
    }
    err.hidden = true;
    var btn = form.querySelector('button[type="submit"]');
    var data = new FormData(form);
    data.set('plan', v('f-plan') || 'Not sure yet');
    data.set('_subject', 'Free preview: ' + v('f-biz'));
    if (/@/.test(v('f-contact'))) data.set('_replyto', v('f-contact'));
    btn.disabled = true; btn.textContent = 'Sending…';
    fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      .then(function(res){
        if (!res.ok) throw new Error('send failed');
        var done = document.createElement('div');
        done.className = 'form-done';
        done.setAttribute('role', 'status');
        var h = document.createElement('h3'); h.className = 'd'; h.textContent = 'Got it, thank you.';
        var p = document.createElement('p'); p.textContent = "We'll start on your preview and reply within one business day.";
        done.append(h, p);
        form.replaceWith(done);
        done.setAttribute('tabindex', '-1'); done.focus();
      })
      .catch(function(){
        btn.disabled = false; btn.textContent = 'Send my answers';
        err.textContent = "That didn't send. Please try again, or email " + MAIL + '.';
        err.hidden = false;
      });
  });
})();
