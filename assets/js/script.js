/* ============================================================
   SMART HOME – script.js
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 0. LANGUAGE SWITCHER ───────────────────────────── */
  const currentLang = localStorage.getItem('language') || 'en';
  
  const switchLanguage = (lang) => {
    localStorage.setItem('language', lang);
    
    // Update elements with data-th attribute
    // English text is already in HTML, only Thai needs data-th
    document.querySelectorAll('[data-th]').forEach(el => {
      const thText = el.getAttribute('data-th');
      if (thText) {
        if (lang === 'th') {
          // Store current English text as data-en for restoration
          el.setAttribute('data-en', el.textContent);
          el.textContent = thText;
        } else {
          // Restore English text
          const enText = el.getAttribute('data-en');
          if (enText) {
            el.textContent = enText;
          }
        }
      }
    });
    
    // Update placeholder attributes
    document.querySelectorAll('[data-th-placeholder]').forEach(el => {
      if (lang === 'th') {
        el.setAttribute('data-en-placeholder', el.placeholder);
        el.placeholder = el.getAttribute('data-th-placeholder');
      } else {
        const enPlaceholder = el.getAttribute('data-en-placeholder');
        if (enPlaceholder) {
          el.placeholder = enPlaceholder;
        }
      }
    });
    
    // Update active language button
    document.querySelectorAll('.btn-lang').forEach(btn => {
      btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`)?.classList.add('active');
    
    // Update html lang attribute
    document.documentElement.lang = lang;
  };
  
  // Initialize with saved language
  switchLanguage(currentLang);
  
  // Add event listeners to language buttons
  document.querySelectorAll('.btn-lang').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      switchLanguage(lang);
    });
  });

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

  

  /* ── 5. SMOOTH SCROLL FOR ANCHOR LINKS ──────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close navbar if open on mobile
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
        }
        // close offcanvas if open
        const offcanvasElement = document.getElementById('mobileMenu');
        if (offcanvasElement) {
          const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
          offcanvas?.hide();
        }
      }
    });
  });

  /* ── 5a. MOBILE SUBMENU TOGGLE ──────────────────────── */
  document.querySelectorAll('.btn-submenu-toggle').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const targetId = btn.getAttribute('data-target');
      const submenu = document.getElementById(targetId);
      
      if (submenu) {
        submenu.classList.toggle('show');
        btn.classList.toggle('active');
      }
    });
  });

  /* ── 6. COUNTER ANIMATION ───────────────────────────── */
const counters = document.querySelectorAll('.counter');

const startCounter = (entry, observer) => {
    if (!entry.isIntersecting) return;

    counters.forEach(counter => {

        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            const increment = target / 200;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 10);
            } else {
                counter.innerText = target + (target >= 100 ? "+" : "");
            }
        };

        updateCount();
    });

    observer.disconnect();
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => startCounter(entry, observer));
});

observer.observe(document.querySelector('.counter'));


});



