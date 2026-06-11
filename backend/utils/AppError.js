'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — AppError Utility
 *  backend/utils/AppError.js
 * ============================================================
 *  Operational (user-facing) errors extend this class.
 *  The global error handler checks err.isOperational to decide
 *  whether to expose error details in production.
 * ============================================================
 */

class AppError extends Error {
  /**
   * @param {string} message   – Human-readable error description
   * @param {number} statusCode – HTTP status code (4xx / 5xx)
   */
  constructor(message, statusCode) {
    super(message);

    this.statusCode    = statusCode;
    this.status        = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    // Capture stack trace (excludes this constructor call)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
