'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — User Controller (Stubs)
 *  backend/controllers/userController.js
 * ============================================================
 *  Admin + profile management handlers.
 * ============================================================
 */

const User       = require('../models/User');
const AppError   = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/ApiFeatures');

// ── Helpers ───────────────────────────────────────────────────
const filterObj = (obj, ...allowed) => {
  const filtered = {};
  allowed.forEach((key) => { if (obj[key] !== undefined) filtered[key] = obj[key]; });
  return filtered;
};

// ── GET /api/v1/users  (Admin) ───────────────────────────────
exports.getAllUsers = catchAsync(async (req, res) => {
  const features = new ApiFeatures(User.find(), req.query)
    .filter()
    .search(['firstName', 'lastName', 'email'])
    .sort()
    .limitFields()
    .paginate();

  const [users, total] = await Promise.all([
    features.query,
    User.countDocuments(),
  ]);

  res.status(200).json({
    status : 'success',
    results: users.length,
    total,
    pagination: features.pagination,
    data   : { users },
  });
});

// ── GET /api/v1/users/:id  (Admin) ──────────────────────────
exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('enrolledCourses', 'title slug');
  if (!user) return next(new AppError('No user found with that ID.', 404));
  res.status(200).json({ status: 'success', data: { user } });
});

// ── PATCH /api/v1/users/update-me  (Logged-in user) ─────────
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for password updates. Use /auth/update-password.', 400));
  }

  const filtered = filterObj(req.body, 'firstName', 'lastName', 'phone', 'bio', 'socialLinks');

  const user = await User.findByIdAndUpdate(req.user.id, filtered, {
    new           : true,
    runValidators : true,
  });

  res.status(200).json({ status: 'success', data: { user } });
});

// ── DELETE /api/v1/users/delete-me  (Logged-in user) ────────
exports.deleteMe = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { isActive: false });
  res.status(204).json({ status: 'success', data: null });
});

// ── PATCH /api/v1/users/:id  (Admin) ────────────────────────
exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new          : true,
    runValidators: true,
  });
  if (!user) return next(new AppError('No user found with that ID.', 404));
  res.status(200).json({ status: 'success', data: { user } });
});

// ── DELETE /api/v1/users/:id  (Admin) ───────────────────────
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return next(new AppError('No user found with that ID.', 404));
  res.status(204).json({ status: 'success', data: null });
});
