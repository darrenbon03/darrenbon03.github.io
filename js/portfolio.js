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
