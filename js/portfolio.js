'use strict';

(function initTheme() {
  var root = document.documentElement;
  var storageKey = 'darren-portfolio-theme';
  var savedTheme = null;

  try {
    savedTheme = window.localStorage.getItem(storageKey);
  } catch (error) {
    savedTheme = null;
  }

  var theme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
  root.dataset.theme = theme;

  function updateThemeColor(nextTheme) {
    var themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', nextTheme === 'light' ? '#f5f5f2' : '#0b0d0c');
  }

  function updateButton(button, nextTheme) {
    if (!button) return;
    var isLight = nextTheme === 'light';
    button.setAttribute('aria-pressed', String(isLight));
    button.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
    button.setAttribute('title', isLight ? 'Switch to dark mode' : 'Switch to light mode');
  }

  function applyTheme(nextTheme, persist) {
    root.dataset.theme = nextTheme;
    updateThemeColor(nextTheme);
    updateButton(document.querySelector('.theme-toggle'), nextTheme);
    if (persist) {
      try {
        window.localStorage.setItem(storageKey, nextTheme);
      } catch (error) {
        // Theme still works when storage is unavailable.
      }
    }
  }

  updateThemeColor(theme);

  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.querySelector('.header-inner nav');
    if (!nav || nav.querySelector('.theme-toggle')) return;

    var button = document.createElement('button');
    button.className = 'theme-toggle';
    button.type = 'button';
    button.innerHTML = '<span class="theme-toggle__track" aria-hidden="true"><span class="theme-toggle__sun">☀</span><span class="theme-toggle__moon">☾</span><span class="theme-toggle__thumb"></span></span>';

    var contactLink = nav.querySelector('.nav-contact');
    if (contactLink) nav.insertBefore(button, contactLink);
    else nav.appendChild(button);

    updateButton(button, root.dataset.theme || 'dark');
    button.addEventListener('click', function () {
      applyTheme(root.dataset.theme === 'light' ? 'dark' : 'light', true);
    });
  });
}());

(function loadPremiumLayer() {
  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'css/premium.css?v=4';
  document.head.appendChild(css);

  document.querySelectorAll('link[rel~="icon"], link[rel="shortcut icon"]').forEach(function (node) {
    node.href = 'favicon.svg?v=4';
    node.type = 'image/svg+xml';
  });
  if (!document.querySelector('link[href*="favicon.svg"]')) {
    var icon = document.createElement('link');
    icon.rel = 'icon';
    icon.type = 'image/svg+xml';
    icon.href = 'favicon.svg?v=4';
    document.head.appendChild(icon);
  }
}());

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

(function addPremiumMotion() {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  var revealNodes = document.querySelectorAll('.section-heading, .project-card, .project-row, .career-item, .earlier-experience, .about-main, .toolkit, .footer-heading, .footer-links');
  revealNodes.forEach(function (node) { node.classList.add('reveal'); });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
  revealNodes.forEach(function (node) { observer.observe(node); });

  document.querySelectorAll('.project-card, .toolkit').forEach(function (card) {
    card.addEventListener('pointermove', function (event) {
      var rect = card.getBoundingClientRect();
      var x = ((event.clientX - rect.left) / rect.width) * 100;
      var y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');

      if (card.classList.contains('project-card') && event.pointerType !== 'touch') {
        var rx = ((event.clientY - rect.top) / rect.height - 0.5) * -2.4;
        var ry = ((event.clientX - rect.left) / rect.width - 0.5) * 2.4;
        card.style.transform = 'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-2px)';
      }
    });
    card.addEventListener('pointerleave', function () {
      card.style.transform = '';
    });
  });

  var portrait = document.querySelector('.portrait');
  if (portrait) {
    window.addEventListener('scroll', function () {
      var y = Math.min(window.scrollY * 0.025, 12);
      portrait.style.translate = '0 ' + y + 'px';
    }, { passive: true });
  }
}());
