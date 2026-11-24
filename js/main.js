/* ===================================================================
   KOTHOTYA CONSULTANCY SERVICES (KCS)
   Interactive Scripts: Smooth Animations, Canvas Mesh, 3D Tilt, Estimator
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initRoyalPreloader();
  initCustomCursor();
  initBackgroundCanvas();
  initNavbarScroll();
  initHomeReturnAnimation();
  initScrollSpy();
  initTiltEffect();
  initServicesFilter();
  initScopeEstimator();
  initContactForm();
  initCustomSelect();
  initAudioVibe();
  initCopyCredentials();
  initVCardDownload();
  initCertModal();
  initFaqAccordion();
});

/* -------------------------------------------------------------------
   0. ROYAL PRELOADER LOADING ANIMATION
   ------------------------------------------------------------------- */
function initRoyalPreloader() {
  const preloader = document.getElementById('preloader');
  const fill = document.getElementById('preloader-fill');
  const counter = document.getElementById('preloader-counter');
  const status = document.getElementById('preloader-status');
  const heroVisual = document.querySelector('.hero-visual');

  if (!preloader) return;

  let progress = 0;
  const startTime = Date.now();
  const duration = 1350; // smooth 1.35s intro

  function updateLoading() {
    const elapsed = Date.now() - startTime;
    progress = Math.min(100, Math.floor((elapsed / duration) * 100));

    if (fill) fill.style.width = `${progress}%`;
    if (counter) counter.textContent = `${progress < 10 ? '0' + progress : progress}%`;

    if (status) {
      if (progress < 25) {
        status.textContent = 'INITIALIZING PROTOCOLS...';
      } else if (progress < 60) {
        status.textContent = 'VERIFYING STATUTORY LICENSES...';
      } else if (progress < 90) {
        status.textContent = 'ENGAGING LUXURY INTERFACE...';
      } else {
        status.textContent = 'ACCESS GRANTED';
      }
    }

    if (progress < 100) {
      requestAnimationFrame(updateLoading);
    } else {
      setTimeout(() => {
        preloader.classList.add('loaded');

        // Play gentle introductory chime
        playIntroEntranceChime();

        // Reveal Hero Visual with royal gleam
        if (heroVisual) {
          heroVisual.classList.add('home-arrived');
        }

        setTimeout(() => {
          if (preloader.parentNode) {
            preloader.style.display = 'none';
          }
        }, 800);
      }, 250);
    }
  }

  requestAnimationFrame(updateLoading);

  // Fallback safety timeout: guarantee dismissal within 2 seconds
  setTimeout(() => {
    if (!preloader.classList.contains('loaded')) {
      preloader.classList.add('loaded');
      setTimeout(() => { preloader.style.display = 'none'; }, 800);
    }
  }, 2000);
}

function playIntroEntranceChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    // Subtle 2-note royal chime: G#5 -> B5
    [830.61, 987.77].forEach((freq, idx) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.25);
      }, idx * 100);
    });
  } catch (err) {
    // Ignore if autoplay audio policy is active
  }
}

/* -------------------------------------------------------------------
   1. CUSTOM MAGNETIC CURSOR
   ------------------------------------------------------------------- */
function initCustomCursor() {
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = -100, mouseY = -100;
  let followerX = -100, followerY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  function renderFollower() {
    followerX += (mouseX - followerX) * 0.18;
    followerY += (mouseY - followerY) * 0.18;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    requestAnimationFrame(renderFollower);
  }
  renderFollower();

  // Hover expansion on interactive elements
  const hoverables = document.querySelectorAll('a, button, input, select, textarea, .choice-chip, .service-card');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      follower.style.transform = 'translate(-50%, -50%) scale(1.6)';
      follower.style.borderColor = 'rgba(212, 175, 55, 0.9)';
      follower.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
    });
    el.addEventListener('mouseleave', () => {
      follower.style.transform = 'translate(-50%, -50%) scale(1)';
      follower.style.borderColor = 'rgba(212, 175, 55, 0.5)';
      follower.style.backgroundColor = 'transparent';
    });
  });
}

/* -------------------------------------------------------------------
   2. INTERACTIVE GOLD & EMERALD STARFIELD CANVAS
   ------------------------------------------------------------------- */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(width > 768 ? 65 : 30, 80);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 0.6;
      this.speedX = (Math.random() - 0.5) * 0.45;
      this.speedY = (Math.random() - 0.5) * 0.45;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.isGold = Math.random() > 0.4;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.isGold 
        ? `rgba(212, 175, 55, ${this.alpha})` 
        : `rgba(16, 185, 129, ${this.alpha * 0.8})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting constellation lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(212, 175, 55, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* -------------------------------------------------------------------
   3. NAVBAR SCROLL & MOBILE DRAWER
   ------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('ph-list');
        icon.classList.toggle('ph-x');
      }
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.add('ph-list');
          icon.classList.remove('ph-x');
        }
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
        navLinks.classList.remove('active');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.add('ph-list');
          icon.classList.remove('ph-x');
        }
      }
    });

    // Reset drawer if screen is resized above tablet breakpoint
    window.addEventListener('resize', () => {
      if (window.innerWidth > 975 && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.add('ph-list');
          icon.classList.remove('ph-x');
        }
      }
    });
  }
}

/* -------------------------------------------------------------------
   3B. ROYAL HOME RETURN ANIMATION (HEADER & FOOTER LOGO/NAME CLICK)
   ------------------------------------------------------------------- */
function initHomeReturnAnimation() {
  const brandLinks = document.querySelectorAll('.nav-brand');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  const heroVisual = document.querySelector('.hero-visual');
  const isHomePage = !!document.getElementById('hero');

  brandLinks.forEach(brand => {
    brand.addEventListener('click', (e) => {
      // 1. Emblem spin & shine
      const emblem = brand.querySelector('.brand-emblem-wrap');
      if (emblem) {
        emblem.classList.remove('brand-clicked');
        void emblem.offsetWidth; // Force reflow
        emblem.classList.add('brand-clicked');
      }

      // 2. Spawn expanding Golden Aura Ripple from clicked position
      const rect = brand.getBoundingClientRect();
      const originX = rect.left + rect.width / 2;
      const originY = rect.top + rect.height / 2;

      createRoyalAuraWave(originX, originY);

      // 3. Luxurious crystal chime harp audio
      playRoyalHomeChime();

      if (isHomePage) {
        e.preventDefault();

        // 4. Clear any active highlight state in navbar
        navLinks.forEach(l => l.classList.remove('active'));

        // 5. Cinematic smooth scroll to top of home screen
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

        // 6. Close mobile navigation menu if open
        const mobileNav = document.querySelector('.nav-links');
        if (mobileNav && mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
          const toggleIcon = document.querySelector('.mobile-toggle i');
          if (toggleIcon) {
            toggleIcon.classList.add('ph-list');
            toggleIcon.classList.remove('ph-x');
          }
        }

        // 7. Hero visual arrival gleam highlight
        if (heroVisual) {
          setTimeout(() => {
            heroVisual.classList.remove('home-arrived');
            void heroVisual.offsetWidth;
            heroVisual.classList.add('home-arrived');
          }, 400);
        }
      } else {
        // On legal subpages (terms.html, privacy.html, refund.html)
        e.preventDefault();
        // Allow the luxury 3D emblem spin and chime to play, then smoothly navigate to home
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 250);
      }
    });
  });
}

function createRoyalAuraWave(x, y) {
  const ripple = document.createElement('div');
  ripple.className = 'royal-ripple-wave';
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  document.body.appendChild(ripple);

  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 950);
}

function playRoyalHomeChime() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    // Luxurious ascending harp chord: E4, B4, E5, G#5, B5, E6
    const harpNotes = [329.63, 493.88, 659.25, 830.61, 987.77, 1318.51];
    harpNotes.forEach((freq, idx) => {
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 1.85);
      }, idx * 60);
    });
  } catch (err) {
    // Graceful silence if browser audio policy blocks
  }
}

/* -------------------------------------------------------------------
   3C. SCROLLSPY ACTIVE PAGE / SECTION HIGHLIGHT
   ------------------------------------------------------------------- */
function initScrollSpy() {
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  if (!navLinks || navLinks.length === 0) return;

  const sectionItems = [];

  navLinks.forEach(link => {
    const hash = link.getAttribute('href');
    if (hash && hash.startsWith('#')) {
      const targetEl = document.querySelector(hash);
      if (targetEl) {
        sectionItems.push({
          id: hash,
          link: link,
          el: targetEl
        });
      }
    }
  });

  if (sectionItems.length === 0) return;

  let isClickScrolling = false;
  let clickTimeout = null;

  function updateActiveState() {
    if (isClickScrolling) return;

    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // 1. If user is at or very near bottom, activate Consultation (last section)
    if (scrollY + windowHeight >= documentHeight - 60) {
      navLinks.forEach(l => l.classList.remove('active'));
      sectionItems[sectionItems.length - 1].link.classList.add('active');
      return;
    }

    // 2. Focal reading line: 35% down the screen
    const focalY = scrollY + windowHeight * 0.35;

    let currentItem = null;

    for (let i = 0; i < sectionItems.length; i++) {
      const item = sectionItems[i];
      const top = item.el.offsetTop;
      const height = item.el.offsetHeight;
      const bottom = top + height;

      if (focalY >= top && focalY < bottom) {
        currentItem = item;
        break;
      }
    }

    // 3. Fallback: if user is between sections
    if (!currentItem) {
      for (let i = sectionItems.length - 1; i >= 0; i--) {
        if (focalY >= sectionItems[i].el.offsetTop) {
          currentItem = sectionItems[i];
          break;
        }
      }
    }

    navLinks.forEach(l => l.classList.remove('active'));
    if (currentItem) {
      currentItem.link.classList.add('active');
    }
  }

  // Smooth click interaction with precise navbar offset
  sectionItems.forEach(item => {
    item.link.addEventListener('click', (e) => {
      e.preventDefault();

      navLinks.forEach(l => l.classList.remove('active'));
      item.link.classList.add('active');

      isClickScrolling = true;
      if (clickTimeout) clearTimeout(clickTimeout);

      const navbar = document.querySelector('.navbar');
      const navHeight = navbar ? navbar.offsetHeight : 80;
      const targetTop = item.el.getBoundingClientRect().top + window.pageYOffset - navHeight - 15;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: 'smooth'
      });

      clickTimeout = setTimeout(() => {
        isClickScrolling = false;
        updateActiveState();
      }, 850);
    });
  });

  // Also enable smooth offset scroll for other in-page links (e.g. hero buttons, footer links)
  document.querySelectorAll('a[href^="#"]:not(.nav-link)').forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if (hash && hash !== '#') {
        const targetEl = document.querySelector(hash);
        if (targetEl) {
          e.preventDefault();
          const navbar = document.querySelector('.navbar');
          const navHeight = navbar ? navbar.offsetHeight : 80;
          const targetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - navHeight - 15;

          window.scrollTo({
            top: Math.max(0, targetTop),
            behavior: 'smooth'
          });

          // Update active link in navbar if matched
          navLinks.forEach(l => {
            if (l.getAttribute('href') === hash) {
              l.classList.add('active');
            } else {
              l.classList.remove('active');
            }
          });
        }
      }
    });
  });

  window.addEventListener('scroll', updateActiveState, { passive: true });
  window.addEventListener('resize', updateActiveState, { passive: true });

  // Initial calculation
  setTimeout(updateActiveState, 150);
}

/* -------------------------------------------------------------------
   4. 3D TILT EFFECT FOR LUXURY CARDS
   ------------------------------------------------------------------- */
function initTiltEffect() {
  // Only enable 3D tilt on devices with mouse pointer and wider than 975px to prevent mobile touch-scroll jitter
  if (window.innerWidth <= 975 || window.matchMedia('(pointer: coarse)').matches) return;
  const tiltCards = document.querySelectorAll('[data-tilt]');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

/* -------------------------------------------------------------------
   5. SERVICES FILTERING
   ------------------------------------------------------------------- */
function initServicesFilter() {
  const filterBtns = document.querySelectorAll('.tab-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category === 'all') {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* -------------------------------------------------------------------
   6. INTERACTIVE SCOPE & PRICE ESTIMATOR
   ------------------------------------------------------------------- */
function initScopeEstimator() {
  const domainInputs = document.querySelectorAll('input[name="est-domain"]');
  const scaleInputs = document.querySelectorAll('input[name="est-scale"]');
  const timelineSlider = document.getElementById('timeline-slider');
  const timelineVal = document.getElementById('timeline-val');
  const priceDisplay = document.getElementById('est-price-val');
  const currSymbol = document.getElementById('est-currency-symbol');
  const btnWhatsAppEst = document.getElementById('btn-whatsapp-estimate');
  const currBtns = document.querySelectorAll('#currency-switcher .curr-btn');

  if (!priceDisplay || !timelineSlider) return;

  let currentCurrency = 'INR';

  currBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCurrency = btn.getAttribute('data-curr') || 'INR';
      if (currSymbol) {
        currSymbol.textContent = currentCurrency === 'USD' ? '$' : '₹';
      }
      calculateEstimate();
    });
  });

  function calculateEstimate() {
    let domainVal = "software";
    domainInputs.forEach(i => { if (i.checked) domainVal = i.value; });

    let scaleVal = "standard";
    scaleInputs.forEach(i => { if (i.checked) scaleVal = i.value; });

    const weeks = parseInt(timelineSlider.value, 10);
    if (timelineVal) timelineVal.textContent = `${weeks} ${weeks === 1 ? 'Week' : 'Weeks'}`;

    // Base rates in INR
    let baseRate = 25000;
    if (domainVal === 'software') baseRate = 35000;
    else if (domainVal === 'tax-audit') baseRate = 18000;
    else if (domainVal === 'legal') baseRate = 22000;
    else if (domainVal === 'multi-vertical') baseRate = 65000;

    let multiplier = 1;
    if (scaleVal === 'startup') multiplier = 0.8;
    else if (scaleVal === 'standard') multiplier = 1.25;
    else if (scaleVal === 'enterprise') multiplier = 2.4;

    // Fast-track adjustments
    let urgencyBonus = weeks <= 2 ? 1.2 : (weeks >= 6 ? 0.95 : 1);

    let finalPriceINR = Math.round((baseRate * multiplier * urgencyBonus) / 1000) * 1000;
    let formattedPrice = '';
    let scopeFormattedText = '';

    if (currentCurrency === 'USD') {
      // Currency conversion: ~80 INR per USD
      let finalPriceUSD = Math.round((finalPriceINR / 80) / 10) * 10;
      formattedPrice = finalPriceUSD.toLocaleString('en-US');
      scopeFormattedText = `$${formattedPrice} USD`;
    } else {
      formattedPrice = finalPriceINR.toLocaleString('en-IN');
      scopeFormattedText = `₹${formattedPrice} INR`;
    }

    priceDisplay.textContent = formattedPrice;

    // Update WhatsApp Inquire link
    if (btnWhatsAppEst) {
      const domainTitles = {
        'software': 'IT & Custom Software Development',
        'tax-audit': 'Taxation, GST & Accounting Consultancy',
        'legal': 'Legal & Management Consulting',
        'multi-vertical': 'Comprehensive Multi-Vertical Advisory Suite'
      };
      const text = encodeURIComponent(
        `Hola KCS Team ^_^\n\nI configured an estimate on your website:\n• Service Vertical: ${domainTitles[domainVal] || domainVal}\n• Scale: ${scaleVal.toUpperCase()}\n• Targeted Timeline: ${weeks} Weeks\n• Estimated Scope: ${scopeFormattedText}\n\nI would like to discuss and initiate this engagement.`
      );
      btnWhatsAppEst.href = `https://wa.me/918764041596?text=${text}`;
    }
  }

  domainInputs.forEach(input => input.addEventListener('change', calculateEstimate));
  scaleInputs.forEach(input => input.addEventListener('change', calculateEstimate));
  timelineSlider.addEventListener('input', calculateEstimate);

  calculateEstimate();
}

/* -------------------------------------------------------------------
   7. CONSULTATION FORM & WHATSAPP DIRECT SUBMISSION
   ------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('consultation-form');
  if (!form) return;

  const nameInput = document.getElementById('c-name');
  const phoneInput = document.getElementById('c-phone');
  const emailInput = document.getElementById('c-email');
  const errorName = document.getElementById('error-c-name');
  const errorPhone = document.getElementById('error-c-phone');
  const errorEmail = document.getElementById('error-c-email');

  // Real-time error dismissal when user interacts with inputs
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      nameInput.classList.remove('has-error');
      if (errorName) errorName.classList.remove('show');
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      phoneInput.classList.remove('has-error');
      if (errorPhone) errorPhone.classList.remove('show');
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      emailInput.classList.remove('has-error');
      if (errorEmail) errorEmail.classList.remove('show');
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = nameInput ? nameInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const service = document.getElementById('c-service') ? document.getElementById('c-service').value : '';
    const message = document.getElementById('c-message') ? document.getElementById('c-message').value.trim() : '';

    let hasError = false;
    let firstErrorField = null;

    // Validate Name
    if (!name) {
      if (nameInput) nameInput.classList.add('has-error');
      if (errorName) errorName.classList.add('show');
      hasError = true;
      if (!firstErrorField) firstErrorField = nameInput;
    } else {
      if (nameInput) nameInput.classList.remove('has-error');
      if (errorName) errorName.classList.remove('show');
    }

    // Validate Phone (must be provided and at least 7 digits)
    const phoneDigits = phone.replace(/\D/g, '');
    if (!phone || phoneDigits.length < 7) {
      if (phoneInput) phoneInput.classList.add('has-error');
      if (errorPhone) errorPhone.classList.add('show');
      hasError = true;
      if (!firstErrorField) firstErrorField = phoneInput;
    } else {
      if (phoneInput) phoneInput.classList.remove('has-error');
      if (errorPhone) errorPhone.classList.remove('show');
    }

    // Validate Email format if filled
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (emailInput) emailInput.classList.add('has-error');
      if (errorEmail) errorEmail.classList.add('show');
      hasError = true;
      if (!firstErrorField) firstErrorField = emailInput;
    } else {
      if (emailInput) emailInput.classList.remove('has-error');
      if (errorEmail) errorEmail.classList.remove('show');
    }

    if (hasError) {
      if (firstErrorField) firstErrorField.focus();
      showToast('Please complete all mandatory credentials before dispatching.', true);
      playVelvetWarningTone();
      return;
    }

    const waText = encodeURIComponent(
      `Hola KCS Team ^_^\n\nNew Consultation Request:\n• Name: ${name}\n• Phone: ${phone}\n• Email: ${email || 'Not specified'}\n• Selected Service: ${service}\n• Message / Requirements: ${message || 'Please schedule an introductory consultation.'}\n\nThank you!`
    );

    window.open(`https://wa.me/918764041596?text=${waText}`, '_blank');
    showToast('Consultation dispatching to WhatsApp...');
    form.reset();

    // Reset luxury custom select to default
    const defaultVal = 'IT & Custom Software Development';
    const trigText = document.getElementById('trigger-text');
    const trigIcon = document.getElementById('trigger-icon-wrap');
    if (trigText) trigText.textContent = defaultVal;
    if (trigIcon) trigIcon.innerHTML = '<i class="ph ph-code"></i>';
    document.querySelectorAll('.luxury-option').forEach((opt, idx) => {
      if (idx === 0) opt.classList.add('active');
      else opt.classList.remove('active');
    });
  });
}

/* -------------------------------------------------------------------
   7B. CUSTOM LUXURY PRACTICE VERTICAL SELECTOR
   ------------------------------------------------------------------- */
function initCustomSelect() {
  const selectBox = document.getElementById('luxury-select-box');
  const trigger = document.getElementById('luxury-select-trigger');
  const dropdown = document.getElementById('luxury-select-dropdown');
  const hiddenSelect = document.getElementById('c-service');
  const triggerText = document.getElementById('trigger-text');
  const triggerIconWrap = document.getElementById('trigger-icon-wrap');
  const options = document.querySelectorAll('.luxury-option');

  if (!selectBox || !trigger || !dropdown) return;

  // Toggle dropdown on trigger click
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = selectBox.classList.contains('active');
    if (isOpen) {
      selectBox.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');
    } else {
      selectBox.classList.add('active');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });

  // Handle keyboard accessibility (Enter/Space to toggle, Escape to close)
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      selectBox.classList.toggle('active');
      trigger.setAttribute('aria-expanded', selectBox.classList.contains('active') ? 'true' : 'false');
    } else if (e.key === 'Escape') {
      selectBox.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });

  // Handle option selection
  options.forEach(opt => {
    opt.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = opt.getAttribute('data-val');
      const iconClass = opt.getAttribute('data-icon');

      // Update hidden native select
      if (hiddenSelect) {
        hiddenSelect.value = val;
        hiddenSelect.dispatchEvent(new Event('change'));
      }

      // Update trigger visual UI
      if (triggerText) triggerText.textContent = val;
      if (triggerIconWrap && iconClass) {
        triggerIconWrap.innerHTML = `<i class="ph ${iconClass}"></i>`;
      }

      // Update active highlight across options
      options.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');

      // Close dropdown
      selectBox.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');

      // Subtle audio shimmer if sound aura is active
      const soundBtn = document.getElementById('btn-sound-toggle');
      if (soundBtn && soundBtn.classList.contains('active')) {
        try {
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          if (AudioContext) {
            const ctx = new AudioContext();
            if (ctx.state === 'suspended') ctx.resume();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, ctx.currentTime);
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.02, ctx.currentTime + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.25);
          }
        } catch (_) {}
      }
    });
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (!selectBox.contains(e.target)) {
      selectBox.classList.remove('active');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
}

function playVelvetWarningTone() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    // Subtle luxury warning chime: descending soft minor tone
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(329.63, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(220.00, ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.38);
  } catch (err) {
    // Ignore audio restrictions
  }
}

/* -------------------------------------------------------------------
   8. COPY TO CLIPBOARD FOR CREDENTIALS
   ------------------------------------------------------------------- */
function initCopyCredentials() {
  const copyButtons = document.querySelectorAll('.btn-copy');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          showToast(`Copied to clipboard: ${text}`);
        });
      }
    });
  });
}

let toastTimeoutId = null;
function showToast(msg, isError = false, customIcon = null) {
  const toast = document.getElementById('toast-notice');
  if (!toast) return;

  const icon = toast.querySelector('i');
  if (icon) {
    if (customIcon) {
      icon.className = customIcon.name;
      icon.style.color = customIcon.color || 'var(--gold-primary)';
      toast.classList.remove('toast-error');
    } else if (isError) {
      icon.className = 'ph ph-warning-circle';
      icon.style.color = '#f43f5e';
      toast.classList.add('toast-error');
    } else {
      icon.className = 'ph ph-check-circle';
      icon.style.color = '#10b981';
      toast.classList.remove('toast-error');
    }
  }

  const textEl = toast.querySelector('.toast-text');
  if (textEl) textEl.textContent = msg;

  toast.classList.add('show');

  if (toastTimeoutId) clearTimeout(toastTimeoutId);
  toastTimeoutId = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* -------------------------------------------------------------------
   9. LUXURY AUDIO VIBE (WEB AUDIO SYNTH CHORD)
   ------------------------------------------------------------------- */
function initAudioVibe() {
  const soundBtn = document.getElementById('btn-sound-toggle');
  if (!soundBtn) return;

  let audioCtx = null;
  let isSoundActive = false;

  soundBtn.addEventListener('click', () => {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    isSoundActive = !isSoundActive;
    const icon = soundBtn.querySelector('i');

    if (isSoundActive) {
      soundBtn.classList.add('active');
      if (icon) {
        icon.classList.remove('ph-speaker-slash');
        icon.classList.add('ph-speaker-high');
      }
      playLuxeChime(audioCtx);
      showToast('Ambient Acoustic Aura Enabled', false, { name: 'ph ph-speaker-high', color: '#ffd700' });
    } else {
      soundBtn.classList.remove('active');
      if (icon) {
        icon.classList.add('ph-speaker-slash');
        icon.classList.remove('ph-speaker-high');
      }
      showToast('Acoustic Feedback Muted', false, { name: 'ph ph-speaker-slash', color: '#9ca3af' });
    }
  });

  // Play subtle golden chime on button hovers if enabled
  const interactiveBtns = document.querySelectorAll('.btn-gold, .btn-outline-gold, .tab-btn');
  interactiveBtns.forEach(b => {
    b.addEventListener('mouseenter', () => {
      if (isSoundActive && audioCtx) {
        playMicroChime(audioCtx);
      }
    });
  });
}

function playLuxeChime(ctx) {
  const freqs = [329.63, 440, 523.25, 659.25]; // E major / luxurious harmony
  freqs.forEach((freq, idx) => {
    setTimeout(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.6);
    }, idx * 120);
  });
}

function playMicroChime(ctx) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 shimmer

  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.55);
}

/* -------------------------------------------------------------------
   10. SMARTPHONE VCARD (CONTACT CARD) GENERATOR
   ------------------------------------------------------------------- */
function initVCardDownload() {
  const vcardBtn = document.getElementById('btn-download-vcard');
  if (!vcardBtn) return;

  vcardBtn.addEventListener('click', () => {
    const vcardContent = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Sharma;Abhishek;;;',
      'FN:Abhishek Sharma',
      'ORG:Kothotya Consultancy Services (KCS)',
      'TITLE:Proprietor & Principal Consultant',
      'TEL;TYPE=CELL,VOICE,PREF:+918764041596',
      'EMAIL;TYPE=INTERNET,PREF:kothotya.consultancy.services@gmail.com',
      'ADR;TYPE=WORK:;;Kothotya Market Building, Kunthada Road, Kanota;Jaipur;Rajasthan;303012;India',
      'NOTE:Government Registered Enterprise. GSTIN: 08PNQPS3095P1ZF | UDYAM-RJ-17-0625867',
      'URL:https://wa.me/918764041596',
      'END:VCARD'
    ].join('\r\n');

    const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Kothotya-Consultancy-Services.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Verified KCS Official Contact Card Downloaded');
  });
}

/* -------------------------------------------------------------------
   11. INTERACTIVE CERTIFICATE VIEWER MODAL
   ------------------------------------------------------------------- */
function initCertModal() {
  const modalBackdrop = document.getElementById('cert-modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalIcon = document.getElementById('modal-gov-icon');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalTable = document.getElementById('modal-data-table');
  const modalCopyBtn = document.getElementById('modal-copy-btn');
  const triggerBtns = document.querySelectorAll('.btn-open-cert');

  if (!modalBackdrop || !modalTable) return;

  const certData = {
    'gst': {
      title: 'Form GST REG-06 Certificate',
      subtitle: 'Government of India • Central Board of Indirect Taxes and Customs',
      iconClass: 'ph ph-shield-check',
      copyValue: '08PNQPS3095P1ZF',
      rows: [
        { label: 'Registration Number (GSTIN)', val: '08PNQPS3095P1ZF' },
        { label: 'Legal / Trade Name', val: 'Kothotya Consultancy Services' },
        { label: 'Constitution of Business', val: 'Proprietorship Firm' },
        { label: 'Proprietor / Signatory', val: 'Abhishek Sharma' },
        { label: 'Principal Place of Business', val: 'Kothotya Market Building, Kanota, Jaipur 303012' },
        { label: 'Tax Jurisdiction', val: 'Ward-1, Circle-G, Jaipur, Rajasthan' },
        { label: 'Registration Status', val: 'Active • Regular Taxpayer' }
      ]
    },
    'udyam': {
      title: 'Udyam Registration Certificate',
      subtitle: 'Ministry of Micro, Small and Medium Enterprises • Govt. of India',
      iconClass: 'ph ph-buildings',
      copyValue: 'UDYAM-RJ-17-0625867',
      rows: [
        { label: 'Udyam Registration Number', val: 'UDYAM-RJ-17-0625867' },
        { label: 'Enterprise Name', val: 'Kothotya Consultancy Services' },
        { label: 'Enterprise Classification', val: 'Micro Enterprise (Services)' },
        { label: 'Major Activity', val: 'SERVICES' },
        { label: 'Approved NIC Classifications', val: '32 Comprehensive Industry Classifications' },
        { label: 'Key Domains', val: 'Custom Software, Web Platforms, GST & Legal Strategy' },
        { label: 'Verification Status', val: 'Government Ministry Verified & Active' }
      ]
    },
    'premises': {
      title: 'Principal Commercial Place of Business',
      subtitle: 'Registered Office Verification & Statutory Premises',
      iconClass: 'ph ph-map-pin',
      copyValue: 'Kothotya Market Building, Kunthada Road, Kanota, Jaipur 303012',
      rows: [
        { label: 'Commercial Premises / Building', val: 'Kothotya Market Building' },
        { label: 'Road & Locality', val: 'Kunthada Road, Kanota' },
        { label: 'City & District', val: 'Jaipur' },
        { label: 'State & Postal Code', val: 'Rajasthan 303012, India' },
        { label: 'Prominent Nearby Landmark', val: 'Pooja Public School' },
        { label: 'Direct Telephony Line', val: '+91 87640 41596' },
        { label: 'Official Correspondence Email', val: 'kothotya.consultancy.services@gmail.com' }
      ]
    }
  };

  let currentCopyVal = '';

  function openModal(certKey) {
    const data = certData[certKey];
    if (!data) return;

    currentCopyVal = data.copyValue;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
    if (modalIcon) modalIcon.innerHTML = `<i class="${data.iconClass}"></i>`;

    modalTable.innerHTML = '';
    data.rows.forEach(r => {
      const rowEl = document.createElement('div');
      rowEl.className = 'modal-data-row';
      rowEl.innerHTML = `
        <span class="modal-data-label">${r.label}</span>
        <span class="modal-data-val">${r.val}</span>
      `;
      modalTable.appendChild(rowEl);
    });

    modalBackdrop.classList.add('active');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const certKey = btn.getAttribute('data-cert');
      if (certKey) openModal(certKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  if (modalCopyBtn) {
    modalCopyBtn.addEventListener('click', () => {
      if (currentCopyVal) {
        navigator.clipboard.writeText(currentCopyVal).then(() => {
          showToast(`Copied identifier: ${currentCopyVal}`);
        });
      }
    });
  }
}

/* -------------------------------------------------------------------
   12. LUXURY FAQ ACCORDION INTERACTION
   ------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqCards = document.querySelectorAll('.faq-card');

  faqCards.forEach(card => {
    const btn = card.querySelector('.faq-question-btn');
    const answer = card.querySelector('.faq-answer');

    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = card.classList.contains('active');

      // Close all other FAQ cards for accordion elegance
      faqCards.forEach(c => {
        c.classList.remove('active');
        const ans = c.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });

      if (!isOpen) {
        card.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}
