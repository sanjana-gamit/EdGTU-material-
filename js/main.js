// main.js - handles slider, nav toggle, and loading materials.json

document.addEventListener('DOMContentLoaded', () => {
  // slider
  const slides = document.querySelectorAll('.slide');
  let idx = 0;
  const show = i => {
    slides.forEach(s => s.classList.remove('active'));
    slides[i].classList.add('active');
  };
  document.getElementById('prev')?.addEventListener('click', () => { idx = (idx-1+slides.length)%slides.length; show(idx); });
  document.getElementById('next')?.addEventListener('click', () => { idx = (idx+1)%slides.length; show(idx); });
  setInterval(()=>{ idx=(idx+1)%slides.length; show(idx); }, 6000);

  // nav toggle
  document.querySelectorAll('.nav-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelector('.nav-links').classList.toggle('open');
    });
  });

  // load materials if present
  if (window.loadMaterials) return; // admin page sets its own

  window.loadMaterials = function(type = null, targetId = null) {
    fetch('/materials.json')
      .then(r => r.json())
      .then(data => {
        const target = targetId ? document.getElementById(targetId) : document.getElementById('materials-list');
        if(!target) return;
        target.innerHTML = '';
        // data structured by code
        Object.keys(data).forEach(code => {
          const item = data[code];
          const materials = item.materials || [];
          const filtered = type ? materials.filter(m=>m.type===type) : materials;
          if(filtered.length===0) return;
          const section = document.createElement('div');
          section.className = 'card';
          section.innerHTML = `<h3>${item.title} (${code})</h3>` + filtered.map(m=>`<div class="mat"><div><strong>${m.name}</strong><div class="muted">${m.type}</div></div><div><a href="${m.link}" target="_blank" class="btn">Open</a></div></div>`).join('');
          target.appendChild(section);
        });
      })
      .catch(err=>{
        console.warn('materials.json not found or invalid.');
      });
  };

  // if page wants to auto-load without param
  if(document.getElementById('materials-list')) loadMaterials();
});
