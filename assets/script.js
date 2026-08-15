(function () {
  // ---- LOADER (index only) ----
  const loader = document.getElementById('loader');
  if (loader) {
    let progress = 0;
    const bar = document.getElementById('loaderBar');
    const percent = document.getElementById('loaderPercent');
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 8) + 2;
      if (progress > 100) progress = 100;
      if (bar) bar.style.width = progress + '%';
      if (percent) percent.textContent = progress + '%';
      if (progress === 100) {
        clearInterval(interval);
        setTimeout(() => loader.classList.add('hide'), 400);
      }
    }, 150);
  }

  // ---- TYPING (index only) ----
  const typingEl = document.getElementById('typingText');
  if (typingEl) {
    const phrases = ['Crafting digital experiences', 'Code · Design · AI', 'Future builder', 'Perception'];
    let idx = 0, charIdx = 0, isDeleting = false;
    function type() {
      const current = phrases[idx];
      if (!isDeleting) {
        typingEl.textContent = current.substring(0, charIdx++);
        if (charIdx > current.length) { isDeleting = true; setTimeout(type, 1500); return; }
      } else {
        typingEl.textContent = current.substring(0, charIdx--);
        if (charIdx < 0) { isDeleting = false; idx = (idx + 1) % phrases.length; setTimeout(type, 400); return; }
      }
      setTimeout(type, isDeleting ? 40 : 100);
    }
    setTimeout(type, 500);
  }

  // ---- PARTICLES (index only) ----
  const canvas = document.getElementById('particles-canvas');
  if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const ctx = canvas.getContext('2d');
    let w, h, particles = [];
    function resize() {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    // fewer particles on small screens for performance
    const count = window.innerWidth < 600 ? 50 : 120;
    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > w) this.speedX *= -1;
        if (this.y < 0 || this.y > h) this.speedY *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.15)';
        ctx.fill();
      }
    }
    for (let i = 0; i < count; i++) particles.push(new Particle());
    function animateParticles() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // ---- SCROLL REVEAL ----
  const revealElements = document.querySelectorAll('.reveal, .timeline-item');
  if (revealElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.15 });
    revealElements.forEach(el => observer.observe(el));
  }

  // ---- STATS COUNTER ----
  const stats = document.querySelectorAll('.stat-number');
  if (stats.length) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const count = parseInt(el.dataset.count, 10);
          let current = 0;
          const inc = count / 60;
          const timer = setInterval(() => {
            current += inc;
            if (current >= count) { el.textContent = count; clearInterval(timer); }
            else el.textContent = Math.floor(current);
          }, 25);
        }
      });
    }, { threshold: 0.5 });
    stats.forEach(stat => statsObserver.observe(stat));
  }

  // ---- NAV SCROLL ----
  const nav = document.getElementById('navbar');
  if (nav) {
    const onScroll = () => { if (window.scrollY > 40) nav.classList.add('scrolled'); else nav.classList.remove('scrolled'); };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  // ---- HAMBURGER ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
    hamburger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navLinks.classList.toggle('open'); }
    });
    // close menu after choosing a link (page will navigate anyway, but keeps state clean)
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
  }
})();
