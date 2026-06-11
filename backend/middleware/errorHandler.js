'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Global Error Handler Middleware
 *  backend/middleware/errorHandler.js
 * ============================================================
 */

const AppError = require('../utils/AppError');

// ── Handle Mongoose CastError (bad ObjectId) ─────────────────
const handleCastErrorDB = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}.`, 400);

// ── Handle Mongoose duplicate key error ───────────────────────
const handleDuplicateFieldsDB = (err) => {
  const field = Object.keys(err.keyValue)[0];
  const value = err.keyValue[field];
  return new AppError(
    `Duplicate field value '${value}' for '${field}'. Please use a different value.`,
    400
  );
};

// ── Handle Mongoose validation errors ─────────────────────────
const handleValidationErrorDB = (err) => {
  const messages = Object.values(err.errors).map((e) => e.message);
  return new AppError(`Validation failed: ${messages.join('. ')}`, 400);
};

// ── Handle JWT errors ─────────────────────────────────────────
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again.', 401);

const handleJWTExpiredError = () =>
  new AppError('Your session has expired. Please log in again.', 401);

// ── Send detailed error in development ───────────────────────
const sendErrorDev = (err, res) =>
  res.status(err.statusCode).json({
    status     : err.status,
    error      : err,
    message    : err.message,
    stack      : err.stack,
  });

// ── Send safe error in production ────────────────────────────
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    // Trusted, operational error — safe to expose details
    return res.status(err.statusCode).json({
      status : err.status,
      message: err.message,
    });
  }
  // Unknown / programming error — don't leak details
  console.error('💥 UNHANDLED ERROR:', err);
  return res.status(500).json({
    status : 'error',
    message: 'Something went wrong. Please try again later.',
  });
};

// ── Global error-handling middleware ─────────────────────────
const errorHandler = (err, req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.status     = err.status     || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = Object.assign(Object.create(Object.getPrototypeOf(err)), err);
    error.message = err.message;

    if (error.name  === 'CastError')              error = handleCastErrorDB(error);
    if (error.code  === 11000)                    error = handleDuplicateFieldsDB(error);
    if (error.name  === 'ValidationError')        error = handleValidationErrorDB(error);
    if (error.name  === 'JsonWebTokenError')      error = handleJWTError();
    if (error.name  === 'TokenExpiredError')      error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

module.exports = errorHandler;
