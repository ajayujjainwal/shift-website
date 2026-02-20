/**
 * SHIFT by Lumax — main.js
 * Handles: partial loading (nav/footer), active nav highlighting,
 *          mobile menu toggle, scroll animations.
 */

/* ─────────────────────────────────────────
   PARTIAL LOADER
   Usage: <div data-include="partials/nav.html"></div>
───────────────────────────────────────── */
async function loadPartials() {
  const elements = document.querySelectorAll('[data-include]');

  await Promise.all([...elements].map(async (el) => {
    const file = el.getAttribute('data-include');
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Failed to load ${file}`);
      el.outerHTML = await res.text();
    } catch (err) {
      console.warn('Partial load error:', err);
    }
  }));
}

/* ─────────────────────────────────────────
   ACTIVE NAV LINK
   Marks the current page's nav link as active
───────────────────────────────────────── */
function setActiveNav() {
  const path = window.location.pathname;
  const links = document.querySelectorAll('.nav-links a');

  links.forEach(link => {
    const href = link.getAttribute('href');
    // Exact match, or index.html / root
    const isHome = (href === 'index.html' || href === '/') &&
                   (path === '/' || path.endsWith('index.html') || path.endsWith('/'));
    const isMatch = !isHome && href && path.endsWith(href);

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
    // Animate hamburger → X
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

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
      links.classList.remove('open');
    }
  });
}

/* ─────────────────────────────────────────
   SCROLL ANIMATIONS
   Adds .visible class when elements enter viewport
───────────────────────────────────────── */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

/* ─────────────────────────────────────────
   SEARCH (basic keyboard shortcut)
───────────────────────────────────────── */
function initSearch() {
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      // TODO: wire up to a real search modal
      const searchEl = document.querySelector('.nav-search');
      if (searchEl) searchEl.focus();
      console.log('Search triggered — add your search modal here');
    }
  });
}

/* ─────────────────────────────────────────
   BOOT
───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', async () => {
  await loadPartials();   // Load nav + footer first
  setActiveNav();         // Then mark active link
  initMobileMenu();       // Wire up mobile toggle
  initScrollAnimations(); // Scroll-triggered fades
  initSearch();           // ⌘K shortcut
});
