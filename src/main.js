import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initCarousel } from './carousel.js';

gsap.registerPlugin(ScrollTrigger);

// ============================================
// LOADER
// ============================================

function initLoader() {
  return new Promise((resolve) => {
    const counter = document.querySelector('.loader-counter');
    const barFill = document.querySelector('.loader-bar-fill');
    const loader = document.getElementById('loader');

    const obj = { val: 0 };

    gsap.to(obj, {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate() {
        const v = Math.round(obj.val);
        counter.textContent = v;
        barFill.style.width = v + '%';
      },
      onComplete() {
        gsap.to(loader, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
          delay: 0.3,
          onComplete() {
            loader.style.display = 'none';
            resolve();
          },
        });
      },
    });
  });
}

// ============================================
// HERO ANIMATIONS
// ============================================

function initHero() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('.line-inner', {
    y: 0,
    duration: 1.2,
    stagger: 0.15,
  })
    .to(
      '.hero-tag',
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.6'
    )
    .to(
      '.hero-subtitle',
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    )
    .to(
      '.hero-actions',
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.5'
    )
    .to(
      '.hero-scroll',
      { opacity: 1, duration: 0.6 },
      '-=0.3'
    )
    .to(
      '#navbar',
      { opacity: 1, duration: 0.6 },
      '-=0.4'
    );
}

// ============================================
// HERO PARTICLES
// ============================================

function initParticles() {
  const container = document.getElementById('hero-particles');
  const count = 30;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('hero-particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = 40 + Math.random() * 50 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = 6 + Math.random() * 6 + 's';
    particle.style.width = 1 + Math.random() * 2 + 'px';
    particle.style.height = particle.style.width;

    const hue = Math.random() > 0.5 ? '217' : '190';
    particle.style.background = `hsl(${hue}, 80%, 60%)`;

    container.appendChild(particle);
  }
}

// ============================================
// PARALLAX ON MOUNTAINS
// ============================================

function initParallax() {
  const layers = document.querySelectorAll('.mountain-layer');

  layers.forEach((layer) => {
    const speed = parseFloat(layer.dataset.speed) || 0.02;

    gsap.to(layer, {
      y: -150 * speed * 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  });
}

// ============================================
// NAVBAR SCROLL
// ============================================

function initNavbar() {
  const navbar = document.getElementById('navbar');

  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: '80% top',
    onLeave: () => navbar.classList.add('scrolled'),
    onEnterBack: () => navbar.classList.remove('scrolled'),
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ============================================
// SECTION REVEAL ANIMATIONS
// ============================================

function initScrollAnimations() {
  // Section tags
  gsap.utils.toArray('.section-tag').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Section headings
  gsap.utils.toArray('.section-header h2').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.1,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Section descriptions
  gsap.utils.toArray('.section-desc').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Competence cards stagger
  const cards = gsap.utils.toArray('.competence-card');
  if (cards.length) {
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.competences-grid',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }

  // Contact section
  const contactInfo = document.querySelector('.contact-info');
  const contactForm = document.querySelector('.contact-form');

  if (contactInfo) {
    gsap.from(contactInfo, {
      opacity: 0,
      x: -30,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.contact-wrapper',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }

  if (contactForm) {
    gsap.from(contactForm, {
      opacity: 0,
      x: 30,
      duration: 0.8,
      delay: 0.2,
      scrollTrigger: {
        trigger: '.contact-wrapper',
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }
}

// ============================================
// CONTACT FORM
// ============================================

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>Message envoyé !</span>';
    btn.style.background = '#059669';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ============================================
// INIT
// ============================================

async function init() {
  // Set initial states for animated elements
  gsap.set('.hero-tag', { opacity: 0, y: 20 });
  gsap.set('.hero-subtitle', { opacity: 0, y: 20 });
  gsap.set('.hero-actions', { opacity: 0, y: 20 });
  gsap.set('.section-tag', { opacity: 0, y: 15 });
  gsap.set('.section-header h2', { opacity: 0, y: 20 });
  gsap.set('.section-desc', { opacity: 0, y: 15 });

  initParticles();

  await initLoader();

  initHero();
  initParallax();
  initNavbar();
  initScrollAnimations();
  initContactForm();

  // Init Three.js carousel
  const carouselContainer = document.getElementById('carousel-container');
  if (carouselContainer) {
    const carousel = initCarousel(carouselContainer);

    document.getElementById('carousel-prev')?.addEventListener('click', () => carousel.prev());
    document.getElementById('carousel-next')?.addEventListener('click', () => carousel.next());
  }
}

// Wait for DOM + fonts
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
