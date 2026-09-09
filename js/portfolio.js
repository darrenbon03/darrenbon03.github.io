'use strict';

// Match the announced start to the calendar day in New Jersey.
(function updateCareerCopy() {
  var today = new Date();
  var startsAt = new Date('2026-09-14T00:00:00-04:00');
  document.querySelectorAll('[data-year]').forEach(function (node) {
    node.textContent = String(today.getFullYear());
  });

  if (today < startsAt) return;

  var updates = {
    '[data-career-kicker]': 'Current chapter',
    '[data-career-headline]': 'Now at UVeye',
    '[data-career-detail]': 'Technical Customer Support · Tier 2',
    '[data-role-status]': 'September 2026 — present',
    '[data-role-description]': 'Technical customer support for vehicle inspection technology, with a focus on Linux, Docker, Kubernetes, and system troubleshooting.'
  };

  Object.keys(updates).forEach(function (selector) {
    document.querySelectorAll(selector).forEach(function (node) {
      node.textContent = updates[selector];
    });
  });
}());

// Astra-inspired motion layer: subtle, fast, and dependency-free.
(function initMotion() {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var style = document.createElement('style');
  style.textContent = [
    'body{overflow-x:hidden;}',
    'body::before{content:"";position:fixed;inset:-25vmax;z-index:-2;pointer-events:none;background:radial-gradient(circle at 25% 25%,rgba(213,250,71,.10),transparent 26%),radial-gradient(circle at 75% 35%,rgba(183,166,238,.10),transparent 24%),radial-gradient(circle at 55% 85%,rgba(213,250,71,.055),transparent 26%);filter:blur(18px);animation:dbAmbient 18s ease-in-out infinite alternate;transform:translate3d(0,0,0);}',
    'body::after{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;opacity:.22;background-image:linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px);background-size:64px 64px;mask-image:linear-gradient(to bottom,black,transparent 70%);}',
    '@keyframes dbAmbient{0%{transform:translate3d(-2%,0,0) scale(1)}50%{transform:translate3d(2%,-1%,0) scale(1.04)}100%{transform:translate3d(0,2%,0) scale(1.02)}}',
    '.motion-reveal{opacity:0;transform:translate3d(0,28px,0);filter:blur(6px);transition:opacity .85s cubic-bezier(.2,.75,.2,1),transform .85s cubic-bezier(.2,.75,.2,1),filter .85s ease;will-change:opacity,transform,filter;}',
    '.motion-reveal.is-visible{opacity:1;transform:none;filter:blur(0);}',
    '.hero-copy>*{opacity:0;transform:translateY(22px);animation:dbHeroIn .8s cubic-bezier(.2,.75,.2,1) forwards;}',
    '.hero-copy>*:nth-child(1){animation-delay:.06s}.hero-copy>*:nth-child(2){animation-delay:.14s}.hero-copy>*:nth-child(3){animation-delay:.24s}.hero-copy>*:nth-child(4){animation-delay:.34s}.hero-copy>*:nth-child(5){animation-delay:.44s}',
    '.hero-aside{opacity:0;transform:translate3d(22px,20px,0);animation:dbAsideIn 1s .28s cubic-bezier(.2,.75,.2,1) forwards;}',
    '@keyframes dbHeroIn{to{opacity:1;transform:none}}@keyframes dbAsideIn{to{opacity:1;transform:none}}',
    '.portrait{transition:transform .35s cubic-bezier(.2,.75,.2,1),box-shadow .35s ease;will-change:transform;}',
    '.portrait:hover{box-shadow:0 28px 80px rgba(0,0,0,.45);}',
    '.project-card,.toolkit,.career-item{position:relative;isolation:isolate;}',
    '.project-card::after,.toolkit::after{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:radial-gradient(420px circle at var(--mx,50%) var(--my,50%),rgba(255,255,255,.10),transparent 42%);opacity:0;transition:opacity .25s ease;z-index:3;}',
    '.project-card:hover::after,.toolkit:hover::after{opacity:1;}',
    '.project-card{transition:transform .32s cubic-bezier(.2,.75,.2,1),border-color .32s ease,box-shadow .32s ease;will-change:transform;}',
    '.project-card:hover{border-color:#596451;box-shadow:0 24px 70px rgba(0,0,0,.24);}',
    '.project-row{transition:transform .28s ease,padding-left .28s ease;}.project-row:hover{transform:translateX(6px);}',
    '.chapter-symbol,.row-arrow,.project-link>span[aria-hidden]{transition:transform .25s ease;}.chapter-note:hover .chapter-symbol,.project-row:hover .row-arrow,.project-link:hover>span[aria-hidden]{transform:translate(4px,-4px);}',
    '.focus-strip>div{position:relative;overflow:hidden;}.focus-strip>div::after{content:"";position:absolute;left:-25%;bottom:0;width:25%;height:1px;background:var(--accent);animation:dbScan 7s linear infinite;}@keyframes dbScan{to{left:110%}}',
    '@media (max-width:800px){body::after{background-size:44px 44px}.project-card:hover{transform:none!important}.project-row:hover{transform:none}}',
    '@media (prefers-reduced-motion:reduce){body::before,.focus-strip>div::after{animation:none!important}.motion-reveal,.hero-copy>*,.hero-aside{opacity:1!important;transform:none!important;filter:none!important;animation:none!important;transition:none!important}}'
  ].join('');
  document.head.appendChild(style);

  var revealSelectors = [
    '.section-heading',
    '.project-card',
    '.project-row',
    '.career-item',
    '.earlier-experience',
    '.about-main',
    '.toolkit',
    '.footer-heading',
    '.footer-links'
  ];

  var revealNodes = document.querySelectorAll(revealSelectors.join(','));
  revealNodes.forEach(function (node, index) {
    node.classList.add('motion-reveal');
    node.style.transitionDelay = String(Math.min((index % 4) * 70, 210)) + 'ms';
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealNodes.forEach(function (node) { observer.observe(node); });
  } else {
    revealNodes.forEach(function (node) { node.classList.add('is-visible'); });
  }

  var portrait = document.querySelector('.portrait');
  var hero = document.querySelector('.hero');
  if (portrait && hero) {
    hero.addEventListener('pointermove', function (event) {
      if (window.innerWidth < 900) return;
      var rect = hero.getBoundingClientRect();
      var x = (event.clientX - rect.left) / rect.width - 0.5;
      var y = (event.clientY - rect.top) / rect.height - 0.5;
      portrait.style.transform = 'rotate(' + (3 + x * 2.4) + 'deg) translate3d(' + (x * 10) + 'px,' + (y * 8) + 'px,0)';
    });
    hero.addEventListener('pointerleave', function () {
      portrait.style.transform = 'rotate(3deg)';
    });
  }

  document.querySelectorAll('.project-card,.toolkit').forEach(function (card) {
    card.addEventListener('pointermove', function (event) {
      var rect = card.getBoundingClientRect();
      var px = ((event.clientX - rect.left) / rect.width) * 100;
      var py = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', px + '%');
      card.style.setProperty('--my', py + '%');

      if (window.innerWidth < 900 || !card.classList.contains('project-card')) return;
      var rx = ((event.clientY - rect.top) / rect.height - 0.5) * -2.2;
      var ry = ((event.clientX - rect.left) / rect.width - 0.5) * 2.2;
      card.style.transform = 'perspective(900px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-3px)';
    });
    card.addEventListener('pointerleave', function () {
      if (card.classList.contains('project-card')) card.style.transform = '';
    });
  });

  var ticking = false;
  function updateParallax() {
    var y = window.scrollY;
    if (portrait && window.innerWidth >= 900) {
      portrait.style.setProperty('--scroll-y', String(Math.min(y * 0.035, 18)) + 'px');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateParallax);
  }, { passive: true });
}());
