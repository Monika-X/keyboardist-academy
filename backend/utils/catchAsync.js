'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — catchAsync Utility
 *  backend/utils/catchAsync.js
 * ============================================================
 *  Eliminates try/catch boilerplate in async route handlers.
 *  Forwards any rejected promise to Express's next() error handler.
 * ============================================================
 */

/**
 * Wraps an async controller function.
 * @param {Function} fn  – async (req, res, next) => …
 * @returns {Function}  Express middleware
 */
const catchAsync = (fn) =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

module.exports = catchAsync;
