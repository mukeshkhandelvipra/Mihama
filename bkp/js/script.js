/* ============================================================
   SMART HOME – script.js
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. AOS INIT ────────────────────────────────────── */
  AOS.init({
    duration: 750,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
  });

  /* ── 2. STICKY NAVBAR SCROLL EFFECT ────────────────── */
  const navbar = document.getElementById('mainNav');
  const onScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── 3. SEARCH OVERLAY TOGGLE ───────────────────────── */
  const searchToggle = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose   = document.getElementById('searchClose');
  const searchInput   = searchOverlay?.querySelector('.search-input');

  searchToggle?.addEventListener('click', () => {
    searchOverlay.classList.add('active');
    setTimeout(() => searchInput?.focus(), 100);
  });

  searchClose?.addEventListener('click', () => {
    searchOverlay.classList.remove('active');
  });

  searchOverlay?.addEventListener('click', (e) => {
    if (e.target === searchOverlay) searchOverlay.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') searchOverlay?.classList.remove('active');
  });

  /* ── 4. ACTIVE NAV LINK ON SCROLL ───────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-navbar .nav-link');

  const activateLink = () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  };
  window.addEventListener('scroll', activateLink, { passive: true });

  /* ── 5. SMOOTH SCROLL FOR ANCHOR LINKS ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close offcanvas if open
        const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('mobileMenu'));
        offcanvas?.hide();
      }
    });
  });

  /* ── 6. COUNTER ANIMATION ───────────────────────────── */
  const counters = document.querySelectorAll('.stat-number');
  const speed = 1800; // ms

  const runCounter = (el) => {
    const text = el.innerText;
    const suffix = text.replace(/[0-9]/g, '');
    const target = parseInt(text.replace(/\D/g, ''), 10);
    let start = 0;
    const step = target / (speed / 16);

    const update = () => {
      start += step;
      if (start < target) {
        el.innerText = Math.ceil(start) + suffix;
        requestAnimationFrame(update);
      } else {
        el.innerText = target + suffix;
      }
    };
    update();
  };

  // Intersection Observer for counters
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  /* ── 7. CONTACT FORM SUBMIT (demo) ──────────────────── */
  const contactForm = document.querySelector('.contact-form');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-check me-2"></i>Message Sent!';
    btn.style.background = '#10b981';
    btn.style.borderColor = '#10b981';
    setTimeout(() => {
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane ms-2"></i>';
      btn.style.background = '';
      btn.style.borderColor = '';
      contactForm.reset();
    }, 3000);
  });

  /* ── 8. NEWSLETTER FORM (demo) ──────────────────────── */
  const nlForm = document.querySelector('.footer-newsletter');
  nlForm?.querySelector('button')?.addEventListener('click', () => {
    const input = nlForm.querySelector('input');
    if (input.value) {
      input.value = '✓ Subscribed!';
      input.style.color = '#4ade80';
      setTimeout(() => { input.value = ''; input.style.color = ''; }, 2500);
    }
  });

  /* ── 9. PARALLAX MOUSE TILT (hero only) ─────────────── */
  const hero = document.querySelector('.hero-section');
  hero?.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 8;
    hero.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
  });

});
