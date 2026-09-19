// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 2800);
});

// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  glowX += (mouseX - glowX) * 0.08;
  glowY += (mouseY - glowY) * 0.08;
  cursorGlow.style.left = glowX + 'px';
  cursorGlow.style.top = glowY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 80) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = navToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translateY(5.5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translateY(-5.5px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// ===== HERO PARTICLES =====
const heroParticles = document.getElementById('heroParticles');
function createParticles() {
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = 50 + Math.random() * 50 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = 6 + Math.random() * 6 + 's';
    particle.style.width = 1 + Math.random() * 2 + 'px';
    particle.style.height = particle.style.width;
    heroParticles.appendChild(particle);
  }
}
createParticles();

// ===== HERO PARALLAX =====
const heroImage = document.getElementById('hero-image');
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroHeight = document.getElementById('hero').offsetHeight;
  if (scrolled < heroHeight) {
    const parallax = scrolled * 0.4;
    heroImage.style.transform = `scale(1.1) translateY(${parallax}px)`;
  }
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.about-stat-number');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const isFixed = el.dataset.fixed === 'true';
      animateCount(el, target, suffix, isFixed);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

function animateCount(el, target, suffix, isFixed) {
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 4);
    const current = Math.round(eased * target);
    
    if (isFixed) {
      el.textContent = target + suffix;
      return;
    }
    
    el.textContent = current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

// ===== TESTIMONIAL CAROUSEL =====
const testimonials = [
  {
    quote: '"Live the Height of Privacy in the Heart of Jubilee Hills. Strike a perfect balance between social connectivity & personal privacy. Fuji\'s strategic location lets you enjoy the best of both worlds."',
    author: 'The FUJI Vision',
    role: 'Privacy & Connectivity'
  },
  {
    quote: '"Soak in the stunning panoramic views and breathe fresh air as you unwind in your personal haven at 610 meters of altitude. Our luxury hilltop homes offer a serene and peaceful retreat from the chaos of the city – every day is a vacation at FUJI."',
    author: 'Modern Elegance',
    role: 'Tranquil Serenity'
  },
  {
    quote: '"Private lifts & terraces, expansive spaces & stunning views – our residences perfectly blend beauty, privacy and freedom. Each luxury home is a sanctuary for the soul and a personal space for your family to create a lifetime of memories."',
    author: 'An Apex of Beauty',
    role: 'Privacy & Freedom'
  }
];

const quoteEl = document.getElementById('testimonial-quote');
const authorEl = document.getElementById('testimonial-author');
const roleEl = document.getElementById('testimonial-role');
const dots = document.querySelectorAll('.testimonial-dot');
let currentTestimonial = 0;

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    const index = parseInt(dot.dataset.index);
    if (index === currentTestimonial) return;
    switchTestimonial(index);
  });
});

function switchTestimonial(index) {
  quoteEl.style.opacity = '0';
  quoteEl.style.transform = 'translateY(10px)';
  authorEl.style.opacity = '0';
  roleEl.style.opacity = '0';

  setTimeout(() => {
    quoteEl.textContent = testimonials[index].quote;
    authorEl.textContent = testimonials[index].author;
    roleEl.textContent = testimonials[index].role;

    quoteEl.style.opacity = '1';
    quoteEl.style.transform = 'translateY(0)';
    authorEl.style.opacity = '1';
    roleEl.style.opacity = '1';

    dots.forEach(d => d.classList.remove('active'));
    dots[index].classList.add('active');
    currentTestimonial = index;
  }, 400);
}

[quoteEl, authorEl, roleEl].forEach(el => {
  el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
});

setInterval(() => {
  const next = (currentTestimonial + 1) % testimonials.length;
  switchTestimonial(next);
}, 6000);

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSubmit = document.getElementById('form-submit');
const consentCheck = document.getElementById('form-consent-check');

consentCheck.addEventListener('change', () => {
  formSubmit.disabled = !consentCheck.checked;
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('form-name').value;
  const email = document.getElementById('form-email').value;
  const phone = document.getElementById('form-phone').value;
  const time = document.getElementById('form-time').value;

  if (!name || !email || !phone || !time) {
    alert('Please fill all required fields.');
    return;
  }

  if (phone.length !== 10) {
    alert('Please enter a valid 10-digit phone number.');
    return;
  }

  formSubmit.innerHTML = '<span>✓ Request Sent!</span>';
  formSubmit.style.background = '#4ade80';

  setTimeout(() => {
    formSubmit.innerHTML = '<span>Schedule a Visit</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    formSubmit.style.background = '';
    contactForm.reset();
    consentCheck.checked = false;
    formSubmit.disabled = true;
  }, 3000);
});

// Phone number validation - only numbers
const phoneInput = document.getElementById('form-phone');
phoneInput.addEventListener('input', function() {
  this.value = this.value.replace(/[^0-9]/g, '');
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== PROPERTY CARD TILT EFFECT =====
document.querySelectorAll('.property-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'none';
  });
});
