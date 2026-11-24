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
  initStatCounters();
  initProposalPdfDownload();
  initNicDirectoryModal();
  initDiscoveryBookingModal();
  initWhatsAppQuickMenu();
  initPwaServiceWorker();
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
      playLuxeSound('select');
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
   6. INTERACTIVE SCOPE & PRICE ESTIMATOR (WITH ROLLING NUMBERS & SOUND)
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
  let lastEstimatedVal = 0;

  function animateEstimatePrice(targetVal, isUSD) {
    if (lastEstimatedVal === 0 || lastEstimatedVal === targetVal) {
      lastEstimatedVal = targetVal;
      priceDisplay.textContent = targetVal.toLocaleString(isUSD ? 'en-US' : 'en-IN');
      return;
    }

    const start = lastEstimatedVal;
    const diff = targetVal - start;
    const duration = 380;
    const startTime = performance.now();

    const resultCard = priceDisplay.closest('.estimator-result-card');
    if (resultCard) {
      resultCard.classList.remove('recalculated');
      void resultCard.offsetWidth; // Trigger reflow for animation
      resultCard.classList.add('recalculated');
    }

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + diff * ease);
      priceDisplay.textContent = current.toLocaleString(isUSD ? 'en-US' : 'en-IN');
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        lastEstimatedVal = targetVal;
      }
    }
    requestAnimationFrame(tick);
  }

  currBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playLuxeSound('toggle');
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
    let targetNum = finalPriceINR;
    let scopeFormattedText = '';

    if (currentCurrency === 'USD') {
      // Currency conversion: ~80 INR per USD
      let finalPriceUSD = Math.round((finalPriceINR / 80) / 10) * 10;
      targetNum = finalPriceUSD;
      scopeFormattedText = `$${finalPriceUSD.toLocaleString('en-US')} USD`;
      animateEstimatePrice(finalPriceUSD, true);
    } else {
      scopeFormattedText = `₹${finalPriceINR.toLocaleString('en-IN')} INR`;
      animateEstimatePrice(finalPriceINR, false);
    }

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

  domainInputs.forEach(input => input.addEventListener('change', () => {
    playLuxeSound('select');
    calculateEstimate();
  }));
  scaleInputs.forEach(input => input.addEventListener('change', () => {
    playLuxeSound('select');
    calculateEstimate();
  }));

  // Choice chips hover sound & tactile responsiveness
  const allChoiceChips = document.querySelectorAll('.choice-chip');
  allChoiceChips.forEach(chip => {
    chip.addEventListener('mouseenter', () => {
      playLuxeSound('micro');
    });
  });

  timelineSlider.addEventListener('input', () => {
    playLuxeSound('slider');
    calculateEstimate();
  });

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
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const text = btn.getAttribute('data-copy');
      if (text) {
        navigator.clipboard.writeText(text).then(() => {
          playLuxeSound('copy');
          btn.classList.add('copied-flash');
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '<i class="ph ph-check"></i>';
          setTimeout(() => {
            btn.classList.remove('copied-flash');
            btn.innerHTML = originalHTML;
          }, 1400);
          showToast(`Copied identifier: ${text}`, false, { name: 'ph ph-check-circle', color: '#10b981' });
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
   9. LUXURY AUDIO VIBE & MULTI-ACTION SOUNDBOARD (SYNTHESIS ENGINE)
   ------------------------------------------------------------------- */
let globalAudioCtx = null;
let isSoundActive = false;

function getAudioContext() {
  if (!globalAudioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      globalAudioCtx = new AudioContext();
    }
  }
  if (globalAudioCtx && globalAudioCtx.state === 'suspended') {
    globalAudioCtx.resume();
  }
  return globalAudioCtx;
}

function playLuxeSound(type) {
  if (!isSoundActive) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'micro') {
      // Delicate crystalline hover / small pill click
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, now); // E5
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.02, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);

    } else if (type === 'select') {
      // Upbeat ascending royal chime for filter tabs & options
      [587.33, 739.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0, now + i * 0.06);
        gain.gain.linearRampToValueAtTime(0.03, now + i * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.28);
      });

    } else if (type === 'toggle') {
      // Crisp metallic harmonic toggle note (Currency / switches)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880.00, now); // A5
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.035, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);

    } else if (type === 'accordion') {
      // Velvet harp disclosure tone
      [369.99, 554.37].forEach((freq, i) => { // F#4 -> C#5
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);
        gain.gain.setValueAtTime(0, now + i * 0.05);
        gain.gain.linearRampToValueAtTime(0.025, now + i * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.32);
      });

    } else if (type === 'copy') {
      // Dual-tone triumph chime: C#5 -> G#5
      [554.37, 830.61].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.04, now + i * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.45);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.48);
      });

    } else if (type === 'modal') {
      // Executive royal seal resonance: B3 -> F#4 -> B4
      [246.94, 369.99, 493.88].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.07);
        gain.gain.setValueAtTime(0, now + i * 0.07);
        gain.gain.linearRampToValueAtTime(0.04, now + i * 0.07 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.07 + 0.65);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.7);
      });

    } else if (type === 'slider') {
      // Subtle water-crystal droplet note
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.08); // G5
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.02, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    }
  } catch (_) {}
}

function initAudioVibe() {
  const soundBtn = document.getElementById('btn-sound-toggle');
  if (!soundBtn) return;

  soundBtn.addEventListener('click', () => {
    const ctx = getAudioContext();
    isSoundActive = !isSoundActive;
    const icon = soundBtn.querySelector('i');

    if (isSoundActive) {
      soundBtn.classList.add('active');
      if (icon) {
        icon.classList.remove('ph-speaker-slash');
        icon.classList.add('ph-speaker-high');
      }
      playLuxeChime(ctx);
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

  // Interactive hovers across cards, buttons, badges
  const interactiveBtns = document.querySelectorAll(
    '.btn-gold, .btn-outline-gold, .tab-btn, .service-card, .roadmap-step, .stat-item, .choice-chip, .curr-btn, .btn-copy, .faq-question-btn, .btn-vcard, .nav-brand'
  );
  interactiveBtns.forEach(b => {
    b.addEventListener('mouseenter', () => {
      playLuxeSound('micro');
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
    playLuxeSound('select');
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

    showToast('Verified KCS Contact Card Downloaded', false, { name: 'ph ph-address-book', color: '#ffd700' });
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

    playLuxeSound('modal');
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
    playLuxeSound('micro');
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
          playLuxeSound('copy');
          modalCopyBtn.classList.add('copied-flash');
          setTimeout(() => {
            modalCopyBtn.classList.remove('copied-flash');
          }, 1400);
          showToast(`Copied identifier: ${currentCopyVal}`, false, { name: 'ph ph-check-circle', color: '#10b981' });
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

      playLuxeSound('accordion');

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

/* -------------------------------------------------------------------
   13. LUXURY STAT COUNTERS ANIMATION (OBSERVER & INTERACTIVE TRIGGERED)
   ------------------------------------------------------------------- */
function initStatCounters() {
  const statsGrid = document.querySelector('.stats-grid');
  if (!statsGrid) return;

  const statItems = statsGrid.querySelectorAll('.stat-item');
  if (!statItems.length) return;

  let animated = false;

  function runCounters() {
    if (animated) return;
    animated = true;

    statItems.forEach((item, index) => {
      const numEl = item.querySelector('.stat-number');
      if (!numEl) return;

      const rawTarget = numEl.getAttribute('data-target') || numEl.textContent.replace(/[^0-9]/g, '');
      const target = parseInt(rawTarget, 10);
      const suffix = numEl.getAttribute('data-suffix') || 
        (numEl.textContent.includes('%') ? '%' : 
        (numEl.textContent.includes('+') ? '+' : 
        (numEl.textContent.includes('/7') ? '/7' : '')));

      if (!isNaN(target)) {
        const duration = 1400 + index * 200;
        animateCount(numEl, 0, target, duration, suffix);
      }
    });

    playLuxeSound('select');
  }

  // Check if stats grid is already inside viewport on load
  const rect = statsGrid.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom >= 0) {
    runCounters();
  }

  // IntersectionObserver triggers reliably as soon as stats enter screen
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  observer.observe(statsGrid);

  // Interactive Re-count on Click/Tap with Royal Sound & Pulse
  statItems.forEach(item => {
    item.addEventListener('click', () => {
      const numEl = item.querySelector('.stat-number');
      if (!numEl) return;
      const rawTarget = numEl.getAttribute('data-target') || numEl.textContent.replace(/[^0-9]/g, '');
      const target = parseInt(rawTarget, 10);
      const suffix = numEl.getAttribute('data-suffix') || 
        (numEl.textContent.includes('%') ? '%' : 
        (numEl.textContent.includes('+') ? '+' : 
        (numEl.textContent.includes('/7') ? '/7' : '')));

      if (!isNaN(target)) {
        playLuxeSound('select');
        animateCount(numEl, 0, target, 900, suffix);
      }
    });
  });

  function animateCount(el, start, end, duration, suffix = '') {
    const startTime = performance.now();
    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Quintic ease-out curve for luxurious deceleration
      const ease = 1 - Math.pow(1 - progress, 4);
      const val = Math.round(start + (end - start) * ease);
      el.textContent = `${val}${suffix}`;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = `${end}${suffix}`;
      }
    }
    requestAnimationFrame(tick);
  }
}

/* -------------------------------------------------------------------
   14. INSTANT PROPOSAL PDF GENERATOR (ESTIMATOR)
   ------------------------------------------------------------------- */
function initProposalPdfDownload() {
  const btn = document.getElementById('btn-download-proposal');
  if (!btn) return;

  btn.addEventListener('click', () => {
    playLuxeSound('select');

    const domainInput = document.querySelector('input[name="est-domain"]:checked');
    const scaleInput = document.querySelector('input[name="est-scale"]:checked');
    const timelineVal = document.getElementById('timeline-val')?.textContent || '4 Weeks';
    const priceVal = document.getElementById('est-price-val')?.textContent || '44,000';
    const currSym = document.getElementById('est-currency-symbol')?.textContent || '₹';

    const domainNames = {
      'software': 'IT & Custom Software Engineering Architecture',
      'tax-audit': 'Taxation, GST & Statutory Accounting Advisory',
      'legal': 'Legal & Corporate Management Governance',
      'multi-vertical': 'Full Turnkey Multi-Vertical Enterprise Suite'
    };

    const scaleNames = {
      'startup': 'Startup Firm Tier (Agile Scope)',
      'standard': 'Established Business Tier (Standard Growth Framework)',
      'enterprise': 'Corporate Enterprise Tier (High-Concurrency & Governance)'
    };

    const domainTitle = domainNames[domainInput?.value] || 'Strategic Professional Advisory';
    const scaleTitle = scaleNames[scaleInput?.value] || 'Standard Corporate Engagement';
    const quotationRef = `KCS/PROP/2026/${Math.floor(1000 + Math.random() * 9000)}`;
    const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    const printContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>KCS Official Scope Proposal - ${quotationRef}</title>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
          body { padding: 40px; color: #1a202c; background: #fff; line-height: 1.5; font-size: 13px; }
          .proposal-header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #d4af37; padding-bottom: 20px; margin-bottom: 25px; }
          .firm-brand { font-size: 20px; font-weight: 800; color: #040807; letter-spacing: 0.05em; text-transform: uppercase; font-family: Georgia, serif; }
          .firm-tag { font-size: 11px; color: #b8972e; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; margin-top: 3px; }
          .firm-address { font-size: 10px; color: #718096; margin-top: 6px; max-width: 320px; line-height: 1.4; }
          .quote-meta { text-align: right; }
          .quote-title { font-size: 14px; font-weight: 700; color: #064e3b; text-transform: uppercase; }
          .quote-ref { font-family: monospace; font-size: 12px; color: #d4af37; font-weight: 700; margin: 4px 0; }
          .quote-date { font-size: 11px; color: #718096; }
          .summary-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px; margin-bottom: 25px; }
          .summary-card h4 { font-size: 12px; text-transform: uppercase; color: #b8972e; margin-bottom: 8px; letter-spacing: 0.05em; }
          .scope-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
          .scope-table th { background: #064e3b; color: #fff; text-align: left; padding: 10px 14px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; }
          .scope-table td { padding: 12px 14px; border-bottom: 1px solid #e2e8f0; font-size: 12px; }
          .total-box { background: #ecfdf5; border: 1.5px solid #10b981; border-radius: 6px; padding: 16px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
          .total-val { font-size: 22px; font-weight: 800; color: #064e3b; font-family: Georgia, serif; }
          .credentials-bar { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; padding: 15px 0; margin-bottom: 30px; font-size: 11px; }
          .sign-area { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 40px; }
          .seal-box { border: 1.5px dashed #d4af37; border-radius: 50%; width: 90px; height: 90px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; font-size: 9px; color: #b8972e; font-weight: 700; text-transform: uppercase; line-height: 1.2; }
          .sign-line { text-align: right; }
          .sign-name { font-weight: 700; font-size: 13px; color: #1a202c; }
          .sign-role { font-size: 11px; color: #718096; }
          @media print {
            body { padding: 20px; }
            @page { margin: 15mm; }
          }
        </style>
      </head>
      <body>
        <div class="proposal-header">
          <div>
            <div class="firm-brand">Kothotya Consultancy Services</div>
            <div class="firm-tag">Technology • Statutory Taxation • Corporate Law • Advisory</div>
            <div class="firm-address">
              Building No. 38, Floor 1, Kothotya Market, Kunthada Road, Nayla Kanota Road, Kanota, Jaipur, Rajasthan - 303012<br>
              Proprietor: Abhishek Sharma | Email: kothotya.consultancy.services@gmail.com | Phone: +91 87640 41596
            </div>
          </div>
          <div class="quote-meta">
            <div class="quote-title">Formal Scope Quotation</div>
            <div class="quote-ref">${quotationRef}</div>
            <div class="quote-date">Date: ${today}</div>
          </div>
        </div>

        <div class="summary-card">
          <h4>Engagement Overview</h4>
          <p>This document details the preliminary scope specification, milestone investment schedule, and statutory execution parameters formulated for the engagement configuration selected below.</p>
        </div>

        <table class="scope-table">
          <thead>
            <tr>
              <th>Engagement Dimension</th>
              <th>Specification Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Primary Practice Vertical</strong></td>
              <td>${domainTitle}</td>
            </tr>
            <tr>
              <td><strong>Enterprise Operational Scale</strong></td>
              <td>${scaleTitle}</td>
            </tr>
            <tr>
              <td><strong>Targeted Completion Horizon</strong></td>
              <td>${timelineVal} (Structured in 4 Milestone Sprints)</td>
            </tr>
            <tr>
              <td><strong>Methodology & Delivery</strong></td>
              <td>Executive 4-Stage Framework: Discovery $\\rightarrow$ Architecture $\\rightarrow$ Synthesis $\\rightarrow$ Governance</td>
            </tr>
            <tr>
              <td><strong>Statutory Governance SLA</strong></td>
              <td>100% Compliance guarantee with zero third-party data exposure</td>
            </tr>
          </tbody>
        </table>

        <div class="total-box">
          <div>
            <div style="font-size: 11px; text-transform: uppercase; color: #064e3b; font-weight: 700; letter-spacing: 0.05em;">Estimated Ballpark Investment</div>
            <div style="font-size: 11px; color: #718096; margin-top: 2px;">Subject to definitive milestone charter execution</div>
          </div>
          <div class="total-val">${currSym}${priceVal}</div>
        </div>

        <div class="credentials-bar">
          <div><strong>UDYAM Registration:</strong><br>UDYAM-RJ-17-0402246</div>
          <div><strong>Government Portal Status:</strong><br>Verified Active Micro (Services)</div>
          <div><strong>Direct Advisory Hotline:</strong><br>+91 87640 41596 (WhatsApp/Call)</div>
        </div>

        <div class="sign-area">
          <div class="seal-box">
            <span>KCS</span>
            <span>VERIFIED</span>
            <span>2026</span>
          </div>
          <div class="sign-line">
            <div class="sign-name">Abhishek Sharma</div>
            <div class="sign-role">Proprietor & Principal Consultant<br>Kothotya Consultancy Services</div>
          </div>
        </div>

        <script>
          window.onload = function() {
            window.print();
          };
        <\/script>
      </body>
      </html>
    `;

    const printWin = window.open('', '_blank', 'width=880,height=900');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(printContent);
      printWin.document.close();
      showToast('Proposal quotation generated for printing/saving as PDF');
    } else {
      const frame = document.createElement('iframe');
      frame.style.position = 'fixed';
      frame.style.right = '0';
      frame.style.bottom = '0';
      frame.style.width = '0';
      frame.style.height = '0';
      frame.style.border = 'none';
      document.body.appendChild(frame);
      frame.contentWindow.document.open();
      frame.contentWindow.document.write(printContent);
      frame.contentWindow.document.close();
      setTimeout(() => {
        frame.contentWindow.print();
        setTimeout(() => document.body.removeChild(frame), 3000);
      }, 500);
      showToast('Proposal quotation prepared for print/PDF');
    }
  });
}

/* -------------------------------------------------------------------
   15. 32+ NIC GOVERNMENT INDUSTRY DIRECTORY MODAL
   ------------------------------------------------------------------- */
function initNicDirectoryModal() {
  const modalBackdrop = document.getElementById('nic-modal-backdrop');
  const triggerBtn = document.getElementById('btn-explore-nic');
  const statTrigger = document.getElementById('stat-nic-trigger');
  const closeBtn = document.getElementById('nic-modal-close');
  const listContainer = document.getElementById('nic-sectors-list');
  const searchInput = document.getElementById('nic-search-input');
  const catBtns = document.querySelectorAll('.nic-cat-btn');
  const toEstBtn = document.getElementById('btn-nic-to-estimator');

  if (!modalBackdrop || !listContainer) return;

  const NIC_SECTORS = [
    { code: '62011', classCode: '6201', cat: 'tech', catLabel: 'IT & Cloud', title: 'Writing, modifying, testing of custom computer programming', desc: 'Custom enterprise software, API backends, web applications, and database engines tailored to client architecture.' },
    { code: '62012', classCode: '6201', cat: 'tech', catLabel: 'IT & Cloud', title: 'Web-page designing and website hosting activities', desc: 'Modern responsive web applications, progressive web portals, cloud CDN deployment, and UI/UX engineering.' },
    { code: '62020', classCode: '6202', cat: 'tech', catLabel: 'IT & Cloud', title: 'Computer consultancy and facilities management', desc: 'Cloud infrastructure topology, system redundancy, cybersecurity audit, and IT governance consulting.' },
    { code: '62099', classCode: '6209', cat: 'tech', catLabel: 'IT & Cloud', title: 'Other information technology service activities n.e.c.', desc: 'Disaster recovery automation, server scripting, network load-balancing, and software maintenance.' },
    { code: '63111', classCode: '6311', cat: 'tech', catLabel: 'IT & Cloud', title: 'Data processing activities & specialized report generation', desc: 'Big data processing, automated data pipelines, statutory reconciliation algorithms, and ETL workloads.' },
    { code: '63112', classCode: '6311', cat: 'tech', catLabel: 'IT & Cloud', title: 'Web hosting and cloud server activities', desc: 'Cloud hosting, VPS administration, high-availability clusters, SSL management, and uptime engineering.' },
    { code: '63120', classCode: '6312', cat: 'tech', catLabel: 'IT & Cloud', title: 'Web portals and enterprise search operations', desc: 'Enterprise knowledge bases, directory engines, search portals, and corporate intranets.' },
    { code: '63999', classCode: '6399', cat: 'tech', catLabel: 'IT & Cloud', title: 'Other information service activities n.e.c.', desc: 'Information aggregation, automated compliance monitoring feeds, and digital document distribution.' },
    { code: '69201', classCode: '6920', cat: 'tax', catLabel: 'Tax & Accounting', title: 'Accounting, bookkeeping and statutory auditing activities', desc: 'Corporate bookkeeping, financial statement auditing, statutory accounts preparation, and ROC filing.' },
    { code: '69202', classCode: '6920', cat: 'tax', catLabel: 'Tax & Accounting', title: 'Tax consultancy and statutory tax return preparation', desc: 'GST filing, Input Tax Credit (ITC) reconciliation, Income Tax filings, TDS management, and tax optimization.' },
    { code: '69203', classCode: '6920', cat: 'tax', catLabel: 'Tax & Accounting', title: 'Insolvency, restructuring and receivership advisory', desc: 'Debt settlement advisory, financial reconstruction, turnaround strategy, and liquidator compliance.' },
    { code: '69100', classCode: '6910', cat: 'legal', catLabel: 'Legal & Governance', title: 'Legal advisory, documentation and statutory representation', desc: 'Drafting commercial contracts, SLAs, terms of service, NDAs, and corporate statutory documentation.' },
    { code: '70200', classCode: '7020', cat: 'mgmt', catLabel: 'Management', title: 'Management consultancy and strategic business advisory', desc: 'End-to-end enterprise structuring, financial advisory, organizational restructuring, and operational excellence.' },
    { code: '71100', classCode: '7110', cat: 'tech', catLabel: 'IT & Engineering', title: 'Engineering and technical consultancy activities', desc: 'Systems engineering, technology topology review, software lifecycle architecture, and technical audits.' },
    { code: '71200', classCode: '7120', cat: 'tech', catLabel: 'IT & Engineering', title: 'Technical testing, code analysis and verification', desc: 'Software QA automation, load testing, penetration testing, and code quality verification.' },
    { code: '72200', classCode: '7220', cat: 'mgmt', catLabel: 'Management', title: 'Research & experimental development on social sciences', desc: 'Market economics research, behavioral compliance modeling, and policy impact analysis.' },
    { code: '73100', classCode: '7310', cat: 'mgmt', catLabel: 'Management', title: 'Advertising, digital branding and media communication', desc: 'Corporate brand positioning, digital acquisition funnel design, and enterprise communications.' },
    { code: '73200', classCode: '7320', cat: 'mgmt', catLabel: 'Management', title: 'Market research and commercial opinion polling', desc: 'Customer segmentation, competitor benchmarking, feasibility studies, and regulatory sentiment surveys.' },
    { code: '74100', classCode: '7410', cat: 'tech', catLabel: 'Design & UI/UX', title: 'Specialized design activities (UI/UX, visual identity)', desc: 'Enterprise design systems, interactive prototypes, design systems, and digital asset production.' },
    { code: '74909', classCode: '7490', cat: 'mgmt', catLabel: 'Technical Advisory', title: 'Other professional, scientific and technical activities n.e.c.', desc: 'Single-window technical liaison, multi-disciplinary statutory audit, and specialized technical appraisals.' },
    { code: '77400', classCode: '7740', cat: 'legal', catLabel: 'Legal & IP', title: 'Licensing of intellectual property and proprietary products', desc: 'Software licensing agreements, patent/trademark exploitation advisory, and IP commercialization.' },
    { code: '78100', classCode: '7810', cat: 'mgmt', catLabel: 'Human Capital', title: 'Activities of employment placement agencies', desc: 'Executive talent acquisition, specialized engineering recruitment, and leadership staffing advisory.' },
    { code: '78200', classCode: '7820', cat: 'mgmt', catLabel: 'Human Capital', title: 'Temporary employment and engineering staffing activities', desc: 'Interim CTO/CFO support, project-based engineering augmentation, and contract compliance staff.' },
    { code: '78300', classCode: '7830', cat: 'mgmt', catLabel: 'Human Capital', title: 'Other human resources provision & corporate HR compliance', desc: 'HR policy drafting, POSH compliance, labor statutory filings, and payroll governance.' },
    { code: '82110', classCode: '8211', cat: 'mgmt', catLabel: 'Office Support', title: 'Combined office administrative service activities', desc: 'Virtual registered office administration, corporate secretarial coordination, and statutory mail handling.' },
    { code: '82191', classCode: '8219', cat: 'mgmt', catLabel: 'Office Support', title: 'Document preparation and specialized secretarial support', desc: 'Tender dossier preparation, board resolution drafting, compliance dossier collation, and affidavit drafting.' },
    { code: '82200', classCode: '8220', cat: 'mgmt', catLabel: 'Client Ops', title: 'Activities of call centres and client advisory desks', desc: 'Dedicated client support desks, tier-1 technical support, and inbound statutory helpdesks.' },
    { code: '82300', classCode: '8230', cat: 'mgmt', catLabel: 'Corporate Events', title: 'Organization of conventions and trade shows', desc: 'Corporate seminars, investor roadshows, industry symposiums, and statutory compliance workshops.' },
    { code: '82990', classCode: '8299', cat: 'mgmt', catLabel: 'Enterprise Support', title: 'Other business support service activities n.e.c.', desc: 'Government portal liaisons, statutory certification processing, and enterprise vendor verification.' },
    { code: '85499', classCode: '8549', cat: 'mgmt', catLabel: 'Education', title: 'Other education n.e.c. (Executive training & workshops)', desc: 'Executive training in tax governance, corporate law amendments, and cloud engineering best practices.' },
    { code: '95111', classCode: '9511', cat: 'tech', catLabel: 'Hardware & IT', title: 'Repair and maintenance of computers and peripheral equipment', desc: 'Hardware diagnostics, workstation maintenance, server rack setup, and office IT support.' },
    { code: '96099', classCode: '9609', cat: 'mgmt', catLabel: 'Concierge', title: 'Other personal and business service activities n.e.c.', desc: 'High-touch strategic concierge, proprietor executive liaison, and specialized turnkey advisory.' }
  ];

  let currentCategory = 'all';
  let searchQuery = '';

  function renderSectors() {
    listContainer.innerHTML = '';
    const filtered = NIC_SECTORS.filter(s => {
      const matchCat = currentCategory === 'all' || s.cat === currentCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch = !q || s.code.includes(q) || s.classCode.includes(q) || s.title.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q) || s.catLabel.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      listContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 20px; color: var(--text-dim);">
          <i class="ph ph-magnifying-glass" style="font-size: 2rem; color: var(--gold-primary); margin-bottom: 10px;"></i>
          <p>No matching NIC sectors found for "<strong>${searchQuery}</strong>".</p>
        </div>
      `;
      return;
    }

    filtered.forEach(s => {
      const card = document.createElement('div');
      card.className = 'nic-sector-card';
      card.innerHTML = `
        <div class="nic-sector-top">
          <span class="nic-code-badge">NIC ${s.code}</span>
          <span class="nic-cat-pill">${s.catLabel}</span>
        </div>
        <div class="nic-sector-title">${s.title}</div>
        <div class="nic-sector-desc">${s.desc}</div>
      `;
      listContainer.appendChild(card);
    });
  }

  function openModal() {
    playLuxeSound('modal');
    modalBackdrop.classList.add('active');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    renderSectors();
  }

  function closeModal() {
    playLuxeSound('micro');
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (triggerBtn) triggerBtn.addEventListener('click', openModal);
  if (statTrigger) statTrigger.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderSectors();
    });
  }

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playLuxeSound('select');
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-cat') || 'all';
      renderSectors();
    });
  });

  if (toEstBtn) {
    toEstBtn.addEventListener('click', () => {
      closeModal();
    });
  }
}

/* -------------------------------------------------------------------
   16. STRATEGIC DISCOVERY CALL BOOKING MODAL
   ------------------------------------------------------------------- */
function initDiscoveryBookingModal() {
  const modalBackdrop = document.getElementById('booking-modal-backdrop');
  const triggerBtn = document.getElementById('btn-open-booking-modal');
  const closeBtn = document.getElementById('booking-modal-close');
  const confirmBtn = document.getElementById('btn-confirm-booking');

  if (!modalBackdrop || !triggerBtn) return;

  function bindPillGroup(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const pills = container.querySelectorAll('.booking-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        playLuxeSound('select');
        pills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
      });
    });
  }

  bindPillGroup('booking-practice-pills');
  bindPillGroup('booking-day-pills');
  bindPillGroup('booking-channel-pills');

  function openModal() {
    playLuxeSound('modal');
    modalBackdrop.classList.add('active');
    modalBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    playLuxeSound('micro');
    modalBackdrop.classList.remove('active');
    modalBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  triggerBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
      closeModal();
    }
  });

  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      playLuxeSound('select');
      const practice = document.querySelector('#booking-practice-pills .booking-pill.active')?.getAttribute('data-val') || 'Multi-Discipline Advisory';
      const timeSlot = document.querySelector('#booking-day-pills .booking-pill.active')?.getAttribute('data-val') || 'Tomorrow Morning';
      const channel = document.querySelector('#booking-channel-pills .booking-pill.active')?.getAttribute('data-val') || 'Google Meet';
      const clientName = document.getElementById('booking-client-name')?.value.trim() || 'Client / Organization';

      const msg = encodeURIComponent(
        `Hola Abhishek Sharma ^_^\n\nI would like to schedule a 15-Minute Strategic Discovery Session:\n• Client: ${clientName}\n• Practice Vertical: ${practice}\n• Preferred Slot: ${timeSlot}\n• Communication Mode: ${channel}\n\nPlease confirm availability and meeting link.`
      );

      closeModal();
      window.open(`https://wa.me/918764041596?text=${msg}`, '_blank');
      showToast('Redirecting to WhatsApp to schedule your session...');
    });
  }
}

/* -------------------------------------------------------------------
   17. WHATSAPP QUICK-MENU FLOATING CARD
   ------------------------------------------------------------------- */
function initWhatsAppQuickMenu() {
  const container = document.getElementById('whatsapp-container');
  const toggleBtn = document.getElementById('btn-toggle-wa-menu');
  const card = document.getElementById('whatsapp-quick-card');
  const closeBtn = document.getElementById('wa-card-close');

  if (!container || !toggleBtn || !card) return;

  function toggleMenu(e) {
    e.stopPropagation();
    const isActive = card.classList.contains('active');
    if (isActive) {
      card.classList.remove('active');
      card.setAttribute('aria-hidden', 'true');
      playLuxeSound('micro');
    } else {
      card.classList.add('active');
      card.setAttribute('aria-hidden', 'false');
      playLuxeSound('select');
    }
  }

  toggleBtn.addEventListener('click', toggleMenu);

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      card.classList.remove('active');
      card.setAttribute('aria-hidden', 'true');
      playLuxeSound('micro');
    });
  }

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) {
      if (card.classList.contains('active')) {
        card.classList.remove('active');
        card.setAttribute('aria-hidden', 'true');
      }
    }
  });
}

/* -------------------------------------------------------------------
   18. PROGRESSIVE WEB APP (PWA) SERVICE WORKER
   ------------------------------------------------------------------- */
function initPwaServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => {
          console.log('KCS PWA ServiceWorker active:', reg.scope);
        })
        .catch(err => {
          console.warn('KCS PWA ServiceWorker error:', err);
        });
    });
  }
}
