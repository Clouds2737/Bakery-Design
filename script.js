/* =========================================
   MAPLE ST BAKERY — script.js
   ========================================= */

'use strict';

// ─── NAV SCROLL ─────────────────────────────────────
const nav = document.getElementById('nav');

function updateNav() {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', updateNav, { passive: true });
updateNav();

// ─── HAMBURGER MENU ─────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
  // Animate bars
  const bars = hamburger.querySelectorAll('span');
  if (menuOpen) {
    bars[0].style.transform = 'translateY(6.5px) rotate(45deg)';
    bars[1].style.opacity = '0';
    bars[2].style.transform = 'translateY(-6.5px) rotate(-45deg)';
  } else {
    bars[0].style.transform = '';
    bars[1].style.opacity = '';
    bars[2].style.transform = '';
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    const bars = hamburger.querySelectorAll('span');
    bars[0].style.transform = '';
    bars[1].style.opacity = '';
    bars[2].style.transform = '';
  });
});

// ─── INTERSECTION OBSERVER — FADE IN ────────────────
const fadeEls = document.querySelectorAll('.fade-in, .reveal-up');

const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // fire once
    }
  });
}, observerOptions);

fadeEls.forEach(el => observer.observe(el));

// ─── HERO REVEAL ON LOAD ─────────────────────────────
window.addEventListener('load', () => {
  const heroEls = document.querySelectorAll('.hero .reveal-up');
  heroEls.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, 200 + i * 180);
  });
});

// ─── PARALLAX BANNER ────────────────────────────────
const parallaxBg = document.getElementById('parallaxBg');

function handleParallax() {
  if (!parallaxBg) return;
  const banner = parallaxBg.closest('.banner');
  if (!banner) return;

  const rect = banner.getBoundingClientRect();
  const viewH = window.innerHeight;

  if (rect.bottom < 0 || rect.top > viewH) return;

  const progress = (viewH - rect.top) / (viewH + rect.height);
  const offset = (progress - 0.5) * 80; // px shift
  parallaxBg.style.transform = `translateY(${offset}px)`;
}

window.addEventListener('scroll', handleParallax, { passive: true });
handleParallax();

// ─── SMOOTH ANCHOR SCROLL ───────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const navH = nav.offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - navH;

    window.scrollTo({
      top: targetTop,
      behavior: 'smooth'
    });
  });
});

// ─── PRODUCT GRID HOVER LABEL ──────────────────────
// Already handled in CSS, but ensure touch devices get tap-to-reveal
const productItems = document.querySelectorAll('.product-item');

if ('ontouchstart' in window) {
  productItems.forEach(item => {
    item.addEventListener('click', () => {
      const isActive = item.classList.contains('touch-active');
      productItems.forEach(i => i.classList.remove('touch-active'));
      if (!isActive) item.classList.add('touch-active');
    });
  });

  // Add CSS for touch active state
  const style = document.createElement('style');
  style.textContent = `
    .product-item.touch-active .product-item__img-wrap img { transform: scale(1.06); }
    .product-item.touch-active .product-item__overlay { opacity: 1; }
  `;
  document.head.appendChild(style);
}

// ─── MARQUEE PAUSE ON HOVER ─────────────────────────
const marqueeTrack = document.querySelector('.marquee-track');
const marqueeStrip = document.querySelector('.marquee-strip');

if (marqueeStrip && marqueeTrack) {
  marqueeStrip.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeStrip.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

// ─── LAZY LOAD IMAGES ───────────────────────────────
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[src]');
  const imgObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.transition = 'opacity 0.5s ease';
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '200px 0px' });

  lazyImages.forEach(img => imgObserver.observe(img));
}

// ─── GALLERY CAPTION HOVER ──────────────────────────
// Light touch: reveal a subtle overlay on hover (pure CSS covers this,
// but we add a data-caption fallback for accessibility)
document.querySelectorAll('.gallery-item').forEach(item => {
  const img = item.querySelector('img');
  if (img && img.alt) {
    item.setAttribute('title', img.alt);
  }
});

// ─── SCROLL PROGRESS BAR ────────────────────────────
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  background: #c9a96e;
  z-index: 200;
  width: 0%;
  transition: width 0.1s linear;
  pointer-events: none;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}, { passive: true });
