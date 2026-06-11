'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Authentication Middleware
 *  backend/middleware/auth.js
 * ============================================================
 *  protect   — verifies JWT and attaches req.user
 *  authorize — restricts access to specific roles
 * ============================================================
 */

const Admin = require('../models/Admin');
const User = require('../models/User');
const { verifyToken } = require('../config/jwt');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

/**
 * Middleware: protect routes (JWT verification).
 * Reads token from Authorization header (Bearer) or httpOnly cookie.
 */
const protect = catchAsync(async (req, _res, next) => {
  let token;

  // 1. Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // 2. Fallback to httpOnly cookie
  else if (req.cookies?.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in. Please log in to get access.', 401)
    );
  }

  // 3. Verify token
  let decoded;
  try {
    decoded = verifyToken(token);
  } catch {
    return next(new AppError('Invalid or expired token. Please log in again.', 401));
  }

  // 4. Check user still exists
  let currentUser = await Admin.findById(decoded.id).select('+password');

  if (!currentUser) {
    currentUser = await User.findById(decoded.id).select('+password');
  }

  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists.', 401)
    );
  }

  // 5. Check if user changed password after token was issued
  if (
    currentUser.changedPasswordAfter &&
    currentUser.changedPasswordAfter(decoded.iat)
  ) {
    return next(
      new AppError('Password was recently changed. Please log in again.', 401)
    );
  }

  // 6. Check account is active
  if (
    currentUser.isActive !== undefined &&
    !currentUser.isActive
  ) {
    return next(
      new AppError('Your account has been deactivated. Contact support.', 403)
    );
  }

  // Grant access
  req.user = currentUser;
  next();
});

/**
 * Middleware factory: restrict to specific roles.
 * @param {...string} roles  – e.g. 'admin', 'instructor'
 */
const authorize = (...roles) =>
  (req, _res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          `Access denied. Role '${req.user.role}' is not authorised for this resource.`,
          403
        )
      );
    }
    next();
  };

module.exports = { protect, authorize };
