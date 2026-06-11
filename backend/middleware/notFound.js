'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — 404 Not Found Middleware
 *  backend/middleware/notFound.js
 * ============================================================
 */

const AppError = require('../utils/AppError');

const notFound = (req, _res, next) =>
  next(new AppError(`Route not found: ${req.method} ${req.originalUrl}`, 404));

module.exports = notFound;
