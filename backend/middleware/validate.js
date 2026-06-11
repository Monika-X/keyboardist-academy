'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Request Validator Middleware
 *  backend/middleware/validate.js
 * ============================================================
 *  Wraps express-validator's validationResult and short-circuits
 *  with a 422 if any validation error is found.
 * ============================================================
 */

const { validationResult } = require('express-validator');
const AppError = require('../utils/AppError');

/**
 * Run after express-validator chains.
 * Collects errors and passes them to the global error handler.
 */
const validate = (req, _res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const messages = errors
    .array()
    .map((e) => `${e.path}: ${e.msg}`)
    .join('; ');

  return next(new AppError(`Validation error — ${messages}`, 422));
};

module.exports = validate;
