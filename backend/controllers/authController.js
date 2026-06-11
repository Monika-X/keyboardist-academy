'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Auth Controller (Stubs)
 *  backend/controllers/authController.js
 * ============================================================
 *  Handlers: register, login, logout, verifyEmail,
 *            forgotPassword, resetPassword, updatePassword, getMe
 * ============================================================
 */

const crypto              = require('crypto');
const User                = require('../models/User');
const AppError            = require('../utils/AppError');
const catchAsync          = require('../utils/catchAsync');
const { sendTokenResponse } = require('../config/jwt');
const {
  sendVerificationEmail,
  sendPasswordResetEmail,
} = require('../utils/sendEmail');

// ── POST /api/v1/auth/register ───────────────────────────────
exports.register = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, password, role } = req.body;

  // Prevent self-elevating to admin
  const safeRole = role === 'admin' ? 'student' : role;

  const user = await User.create({ firstName, lastName, email, password, role: safeRole });

  // Send verification email
  const rawToken = user.createEmailVerifyToken();
  await user.save({ validateBeforeSave: false });
  const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${rawToken}`;
  await sendVerificationEmail(user.email, user.firstName, verifyUrl);

  sendTokenResponse(user, 201, res);
});

// ── POST /api/v1/auth/login ──────────────────────────────────
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please provide email and password.', 400));
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    return next(new AppError('Invalid email or password.', 401));
  }

  user.lastLoginAt = Date.now();
  await user.save({ validateBeforeSave: false });

  sendTokenResponse(user, 200, res);
});

// ── POST /api/v1/auth/logout ─────────────────────────────────
exports.logout = (_req, res) => {
  res.cookie('jwt', 'logged_out', {
    expires : new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success', message: 'Logged out successfully.' });
};

// ── GET /api/v1/auth/me ──────────────────────────────────────
exports.getMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id).populate('enrolledCourses', 'title slug thumbnail');
  res.status(200).json({ status: 'success', data: { user } });
});

// ── GET /api/v1/auth/verify-email?token=… ───────────────────
exports.verifyEmail = catchAsync(async (req, res, next) => {
  const hashed = crypto.createHash('sha256').update(req.query.token).digest('hex');
  const user   = await User.findOne({
    emailVerifyToken : hashed,
    emailVerifyExpire: { $gt: Date.now() },
  });

  if (!user) return next(new AppError('Token is invalid or has expired.', 400));

  user.isEmailVerified  = true;
  user.emailVerifyToken  = undefined;
  user.emailVerifyExpire = undefined;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({ status: 'success', message: 'Email verified successfully.' });
});

// ── POST /api/v1/auth/forgot-password ───────────────────────
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError('No account found with that email address.', 404));

  const rawToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${rawToken}`;
  await sendPasswordResetEmail(user.email, user.firstName, resetUrl);

  res.status(200).json({ status: 'success', message: 'Password reset link sent to your email.' });
});

// ── PATCH /api/v1/auth/reset-password?token=… ───────────────
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashed = crypto.createHash('sha256').update(req.query.token).digest('hex');
  const user   = await User.findOne({
    passwordResetToken : hashed,
    passwordResetExpire: { $gt: Date.now() },
  });

  if (!user) return next(new AppError('Token is invalid or has expired.', 400));

  user.password           = req.body.password;
  user.passwordResetToken  = undefined;
  user.passwordResetExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

// ── PATCH /api/v1/auth/update-password ──────────────────────
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.matchPassword(currentPassword))) {
    return next(new AppError('Current password is incorrect.', 401));
  }

  user.password = newPassword;
  await user.save();
  sendTokenResponse(user, 200, res);
});
