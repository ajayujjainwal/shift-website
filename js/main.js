/**
 * SHIFT by Lumax — main.js
 * Handles: active nav, mobile menu, scroll animations, stat counters, nav scroll.
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

  // Auto-reveal major sections on scroll
  document.querySelectorAll('section, .pillars, .stats-strip').forEach(el => {
    if (!el.classList.contains('animate-on-scroll')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
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
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    const numStr = isDecimal ? current.toFixed(1) : Math.round(current).toString();
    el.innerHTML = prefix + numStr + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
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
───────────────────────────────────────── */
function initNavScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 10) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
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
