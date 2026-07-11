document.addEventListener('DOMContentLoaded', () => {

  // ===== GET URL PARAMETER (guest name) =====
  const params = new URLSearchParams(window.location.search);
  const guest = params.get('to') || 'Tamu Undangan';
  document.getElementById('guestName').textContent = `— ${guest} —`;

  // ===== COUNTDOWN TIMER =====
  const weddingDate = new Date('2026-12-25T08:00:00+07:00').getTime();
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = weddingDate - now;
    if (diff <= 0) {
      daysEl.textContent = '00'; hoursEl.textContent = '00';
      minutesEl.textContent = '00'; secondsEl.textContent = '00';
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== MOBILE NAV TOGGLE =====
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const icon = navToggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    });
  });

  // ===== MUSIC PLAYER =====
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  let isPlaying = false;
  musicToggle.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
    } else {
      bgMusic.play().catch(() => {});
      musicToggle.classList.add('playing');
    }
    isPlaying = !isPlaying;
  });

  // ===== WISHES FORM =====
  const wishForm = document.getElementById('wishForm');
  const wishesList = document.getElementById('wishesList');
  wishForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('wishName').value.trim();
    const message = document.getElementById('wishMessage').value.trim();
    if (!name || !message) return;
    const item = document.createElement('div');
    item.className = 'wish-item';
    item.style.animation = 'fadeUp 0.5s ease';
    item.innerHTML = `<h4>${escapeHtml(name)}</h4><p>${escapeHtml(message)}</p>`;
    wishesList.prepend(item);
    wishForm.reset();
  });

  // ===== RSVP FORM =====
  const rsvpForm = document.getElementById('rsvpForm');
  rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = rsvpForm.querySelector('.btn-submit');
    btn.textContent = '✓ Terkirim!';
    btn.style.background = '#6b8f66';
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check-circle"></i> Konfirmasi';
      btn.style.background = '';
      rsvpForm.reset();
    }, 3000);
  });

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.section, .hero');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.15 });
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });

  // ===== HELPER =====
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
});
