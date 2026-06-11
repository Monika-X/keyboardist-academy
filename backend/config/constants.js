'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — App-Wide Constants
 *  backend/config/constants.js
 * ============================================================
 */

module.exports = Object.freeze({
  // ── User Roles ───────────────────────────────────────────
  ROLES: {
    STUDENT: 'student',
    INSTRUCTOR: 'instructor',
    ADMIN: 'admin',
  },

  // ── Course Levels ────────────────────────────────────────
  COURSE_LEVELS: {
    BEGINNER: 'beginner',
    INTERMEDIATE: 'intermediate',
    ADVANCED: 'advanced',
    ALL: 'all levels',
  },

  // ── Course Categories ────────────────────────────────────
  COURSE_CATEGORIES: [
    'Classical Piano',
    'Jazz Keyboard',
    'Contemporary',
    'Music Theory',
    'Sight Reading',
    'Improvisation',
    'Ear Training',
    'Composition',
  ],

  // ── Enrollment Status ────────────────────────────────────
  ENROLLMENT_STATUS: {
    ACTIVE: 'active',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
    SUSPENDED: 'suspended',
  },

  // ── Payment Status ───────────────────────────────────────
  PAYMENT_STATUS: {
    PENDING: 'pending',
    PAID: 'paid',
    REFUNDED: 'refunded',
    FAILED: 'failed',
  },

  // ── Pagination Defaults ──────────────────────────────────
  PAGINATION: {
    DEFAULT_PAGE : 1,
    DEFAULT_LIMIT: 12,
    MAX_LIMIT    : 100,
  },

  // ── File Upload ──────────────────────────────────────────
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
  MAX_FILE_SIZE_BYTES : 5 * 1024 * 1024, // 5 MB

  // ── API Versioning ───────────────────────────────────────
  API_VERSION: 'v1',
  API_PREFIX : '/api/v1',

  // ── Brand ────────────────────────────────────────────────
  BRAND: {
    NAME  : 'Keyboardist Academy',
    DOMAIN: 'keyboardist-academy.com',
    COLORS: {
      MATTE_BLACK : '#121212',
      SOFT_WHITE  : '#F5F5F2',
      ROYAL_VIOLET: '#6C63FF',
    },
  },
});
