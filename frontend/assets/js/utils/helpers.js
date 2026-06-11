/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — DOM & General Helpers
 *  frontend/assets/js/utils/helpers.js
 * ============================================================
 */

'use strict';

const Helpers = (() => {
  /** Query selector shorthand */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /** Format price */
  const formatPrice = (amount, currency = 'INR') =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount);

  /** Format date */
  const formatDate = (dateStr, opts = { year: 'numeric', month: 'long', day: 'numeric' }) =>
    new Intl.DateTimeFormat('en-US', opts).format(new Date(dateStr));

  /** Format time to AM/PM */
  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    if (/[a-zA-Z]/.test(timeStr)) return timeStr.toUpperCase();
    const parts = timeStr.split(':');
    if (parts.length < 2) return timeStr;
    let hours = parseInt(parts[0], 10);
    const minutes = parts[1].substring(0, 2);
    if (isNaN(hours)) return timeStr;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const hoursStr = hours < 10 ? '0' + hours : hours;
    return `${hoursStr}:${minutes} ${ampm}`;
  };

  /** Convert time string to 24-hour format HH:MM */
  const convertTo24Hour = (timeStr) => {
    if (!timeStr) return '18:00';
    const cleanTime = timeStr.trim();
    if (!/[a-zA-Z]/.test(cleanTime)) {
      const parts = cleanTime.split(':');
      if (parts.length >= 2) {
        return `${parts[0].padStart(2, '0')}:${parts[1].substring(0, 2)}`;
      }
      return cleanTime;
    }
    const match = cleanTime.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
    if (!match) return '18:00';
    let hours = parseInt(match[1], 10);
    const minutes = match[2];
    const ampm = match[3].toUpperCase();
    if (ampm === 'PM' && hours < 12) hours += 12;
    if (ampm === 'AM' && hours === 12) hours = 0;
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  };

  /** Truncate text */
  const truncate = (str, len = 100) =>
    str.length > len ? str.slice(0, len).trimEnd() + '…' : str;

  /** Debounce */
  const debounce = (fn, delay = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  /** Throttle */
  const throttle = (fn, limit = 200) => {
    let last = 0;
    return (...args) => {
      const now = Date.now();
      if (now - last >= limit) { last = now; fn(...args); }
    };
  };

  /** Generate star rating HTML */
  const starsHTML = (rating, max = 5) => {
    let html = '';
    for (let i = 1; i <= max; i++) {
      html += i <= Math.round(rating) ? '★' : '☆';
    }
    return `<span class="stars" aria-label="${rating} out of ${max} stars">${html}</span>`;
  };

  /** Show toast notification */
  const toast = (message, type = 'success') => {
    const container = document.getElementById('toast-container') || document.body;
    const el = document.createElement('div');
    el.className = `toast toast--${type}`;
    el.setAttribute('role', 'alert');
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ';
    el.innerHTML = `
      <div class="toast__icon">${icon}</div>
      <div class="toast__body">
        <div class="toast__title">${message}</div>
      </div>
    `;
    container.appendChild(el);
    setTimeout(() => {
      el.classList.add('is-dismissing');
      setTimeout(() => el.remove(), 400);
    }, CONFIG.TOAST_DURATION || 3500);
  };

  /** Scroll reveal observer */
  const initReveal = () => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-revealed');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.10, rootMargin: '0px 0px -40px 0px' }
    );
    const selectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger-children';
    $$(selectors).forEach((el) => observer.observe(el));
  };

  /** Scroll-to-top button */
  const initScrollTop = () => {
    const btn = $('#scroll-top');
    if (!btn) return;
    window.addEventListener('scroll', throttle(() => {
      btn.classList.toggle('is-visible', window.scrollY > 400);
    }, 100));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  };

  return { $, $$, formatPrice, formatDate, formatTime, convertTo24Hour, truncate, debounce, throttle, starsHTML, toast, initReveal, initScrollTop };
})();

window.Helpers = Helpers;
