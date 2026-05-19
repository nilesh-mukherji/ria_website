// =============================================================
// RIA Advisory — interactions
// Works for both multi-page site and single-file SPA bundle
// =============================================================

(function () {
  'use strict';

  // ---------- Nav: scroll state (all navs, since each page has its own) ----------
  const navs = document.querySelectorAll('.nav');
  const onScroll = () => {
    const scrolled = window.scrollY > 12;
    navs.forEach(n => n.classList.toggle('is-scrolled', scrolled));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile menu (bind every toggle to its own page's drawer) ----------
  document.querySelectorAll('.menu-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const scope = toggle.closest('[data-page]') || document;
      const menu = scope.querySelector('.mobile-menu');
      if (!menu) return;
      const opening = !menu.classList.contains('is-open');
      // close any other open menus first
      document.querySelectorAll('.mobile-menu.is-open').forEach(m => m.classList.remove('is-open'));
      if (opening) menu.classList.add('is-open');
      document.body.style.overflow = opening ? 'hidden' : '';
    });
  });
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      document.querySelectorAll('.mobile-menu').forEach(m => m.classList.remove('is-open'));
      document.body.style.overflow = '';
    });
  });

  // ---------- Reveal on scroll (rebindable for SPA mode) ----------
  window.__rebindReveals = function () {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    // Only observe reveals inside currently visible page(s)
    const scope = document.querySelector('[data-page]:not([hidden])') || document;
    scope.querySelectorAll('[data-reveal]:not(.is-visible)').forEach(el => io.observe(el));
  };
  window.__rebindReveals();

  // ---------- Animated counters (rebindable) ----------
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const animateNumber = (el) => {
    const target = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const v = target * ease(p);
      el.textContent = prefix + v.toFixed(decimals) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + target.toFixed(decimals) + suffix;
    };
    requestAnimationFrame(tick);
  };
  window.__rebindCounters = function () {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('[data-count]').forEach(animateNumber);
      return;
    }
    const co = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateNumber(entry.target);
          co.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    const scope = document.querySelector('[data-page]:not([hidden])') || document;
    scope.querySelectorAll('[data-count]:not([data-counted])').forEach(el => {
      el.dataset.counted = '1';
      co.observe(el);
    });
  };
  window.__rebindCounters();

  // ---------- Year ----------
  document.querySelectorAll('#y').forEach(el => { el.textContent = new Date().getFullYear(); });

  // ---------- Forms (demo) ----------
  document.querySelectorAll('[data-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const orig = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending…';
      setTimeout(() => {
        btn.innerHTML = 'Message sent ✓';
        form.reset();
        setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; }, 2400);
      }, 900);
    });
  });
})();
