/**
 * SHIFT by Lumax — main.js
 * Premium interactions: nav, mobile menu, scroll animations, stat counters.
 */

/* ─────────────────────────────────────────
   ACTIVE NAV LINK
───────────────────────────────────────── */
function setActiveNav() {
  const path = window.location.pathname;
  const links = document.querySelectorAll('.nav-links a');

  links.forEach(link => {
    const href = link.getAttribute('href');
    const cleanHref = href ? href.replace(/^(\.\.\/)+/, '') : '';
    const isHome = (cleanHref === 'index.html' || href === '/') &&
                   (path === '/' || path.endsWith('index.html') || path.endsWith('/'));
    const isMatch = !isHome && cleanHref && path.endsWith(cleanHref);

    if (isHome || isMatch) {
      link.classList.add('active');
    }
  });
}

/* ─────────────────────────────────────────
   MOBILE MENU TOGGLE
───────────────────────────────────────── */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    links.classList.toggle('open');
    const spans = toggle.querySelectorAll('span');
    toggle.classList.toggle('open');
    if (toggle.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
      links.classList.remove('open');
    }
  });
}

/* ─────────────────────────────────────────
   SCROLL ANIMATIONS
   Reveals elements as they enter viewport
───────────────────────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  // Auto-add scroll animation to major sections
  document.querySelectorAll('section, .pillars, .stats-strip').forEach(el => {
    if (!el.classList.contains('animate-on-scroll')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';

      const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            sectionObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05 });

      sectionObserver.observe(el);
    }
  });
}

/* ─────────────────────────────────────────
   ANIMATED STAT COUNTERS
   Counts up numbers in the stats strip
───────────────────────────────────────── */
function initStatCounters() {
  const stats = document.querySelectorAll('.stat-num');
  if (!stats.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}

function animateCounter(el) {
  const text = el.textContent;
  // Extract numeric part
  const match = text.match(/(\d+\.?\d*)/);
  if (!match) return;

  const target = parseFloat(match[1]);
  const isDecimal = match[1].includes('.');
  const prefix = text.substring(0, text.indexOf(match[1]));
  const suffix = text.substring(text.indexOf(match[1]) + match[1].length);
  const duration = 1200;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;

    // Rebuild with HTML (preserving <span> tags in suffix/prefix)
    const numStr = isDecimal ? current.toFixed(1) : Math.round(current).toString();
    el.innerHTML = prefix + numStr + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      // Restore original HTML
      el.innerHTML = prefix + match[1] + suffix;
    }
  }

  requestAnimationFrame(update);
}

/* ─────────────────────────────────────────
   SEARCH (keyboard shortcut)
───────────────────────────────────────── */
function initSearch() {
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      const searchEl = document.querySelector('.nav-search');
      if (searchEl) searchEl.focus();
    }
  });
}

/* ─────────────────────────────────────────
   NAV SCROLL EFFECT
   Adds subtle background intensity on scroll
───────────────────────────────────────── */
function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 20) {
          nav.style.background = 'rgba(8,9,13,0.92)';
          nav.style.borderBottomColor = 'rgba(255,255,255,0.09)';
        } else {
          nav.style.background = 'rgba(8,9,13,0.80)';
          nav.style.borderBottomColor = '';
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ─────────────────────────────────────────
   BOOT
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  setActiveNav();
  initMobileMenu();
  initScrollAnimations();
  initStatCounters();
  initSearch();
  initNavScroll();
});
