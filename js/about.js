// about.js - AOS init + counters + small reveal tweaks
document.addEventListener('DOMContentLoaded', function () {
  // init AOS
  if (window.AOS) AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true });

  // animated counter (hero stat)
  const counter = document.querySelector('.hero-stat .stat-value');
  if (counter) {
    const target = parseInt(counter.getAttribute('data-target')) || 120;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(interval);
      } else {
        counter.textContent = current;
      }
    }, 18);
  }

  // Optional: small sequential reveal for the 'new-features-list'
  const features = document.querySelectorAll('.new-features-list li');
  features.forEach((el, i) => {
    el.style.opacity = 0;
    setTimeout(() => {
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }, 300 + i * 160);
  });
});
