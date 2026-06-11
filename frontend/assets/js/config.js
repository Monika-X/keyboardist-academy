/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Frontend Configuration
 *  frontend/assets/js/config.js
 * ============================================================
 */

'use strict';

const CONFIG = Object.freeze({
  // ── API ────────────────────────────────────────────────────
  API_BASE_URL: 'http://localhost:5000/api/v1',
  API_TIMEOUT: 15000, // ms

  // ── App ────────────────────────────────────────────────────
  APP_NAME: 'Keyboardist Academy',
  APP_VERSION: '1.0.0',

  // ── Local Storage Keys ──────────────────────────────────────
  STORAGE_KEYS: {
    TOKEN: 'ka_token',
    USER: 'ka_user',
    THEME: 'ka_theme',
    CART: 'ka_cart',
  },

  // ── Pagination ──────────────────────────────────────────────
  DEFAULT_PAGE_SIZE: 12,

  // ── Toast duration ─────────────────────────────────────────
  TOAST_DURATION: 4000, // ms

  // ── Routes ─────────────────────────────────────────────────
  ROUTES: {
    HOME: '/',
    COURSES: '/courses',
    COURSE_DETAIL: '/courses/:slug',
    ABOUT: '/about',
    CONTACT: '/contact',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    PROFILE: '/profile',
    ENROLL: '/enroll/:courseId',
  },
});

// Make globally accessible
window.CONFIG = CONFIG;
