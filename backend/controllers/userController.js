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
const cloudinaryService = require('../services/cloudinaryService');

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

  let oldPublicId;
  if (req.file) {
    const currentUser = await User.findById(req.user.id);
    oldPublicId = currentUser.publicId;
    const uploadResult = await cloudinaryService.uploadImage(req.file.buffer);
    filtered.imageUrl = uploadResult.imageUrl;
    filtered.publicId = uploadResult.publicId;
  }

  try {
    const user = await User.findByIdAndUpdate(req.user.id, filtered, {
      new           : true,
      runValidators : true,
    });
    if (req.file && oldPublicId) {
      await cloudinaryService.deleteImage(oldPublicId);
    }
    res.status(200).json({ status: 'success', data: { user } });
  } catch (err) {
    if (req.file && filtered.publicId) {
      await cloudinaryService.deleteImage(filtered.publicId);
    }
    return next(err);
  }
});

// ── DELETE /api/v1/users/delete-me  (Logged-in user) ────────
exports.deleteMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id);
  const publicIdToDelete = user ? user.publicId : null;
  await User.findByIdAndUpdate(req.user.id, { isActive: false, publicId: null, imageUrl: 'default-avatar.webp' });
  if (publicIdToDelete) {
    await cloudinaryService.deleteImage(publicIdToDelete);
  }
  res.status(204).json({ status: 'success', data: null });
});

// ── PATCH /api/v1/users/:id  (Admin) ────────────────────────
exports.updateUser = catchAsync(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) return next(new AppError('No user found with that ID.', 404));

  const oldPublicId = user.publicId;

  if (req.file) {
    const uploadResult = await cloudinaryService.uploadImage(req.file.buffer);
    req.body.imageUrl = uploadResult.imageUrl;
    req.body.publicId = uploadResult.publicId;
  }

  try {
    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new          : true,
      runValidators: true,
    });
    if (req.file && oldPublicId) {
      await cloudinaryService.deleteImage(oldPublicId);
    }
    res.status(200).json({ status: 'success', data: { user } });
  } catch (err) {
    if (req.file && req.body.publicId) {
      await cloudinaryService.deleteImage(req.body.publicId);
    }
    return next(err);
  }
});

// ── DELETE /api/v1/users/:id  (Admin) ───────────────────────
exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('No user found with that ID.', 404));

  const publicIdToDelete = user.publicId;
  await user.deleteOne();
  if (publicIdToDelete) {
    await cloudinaryService.deleteImage(publicIdToDelete);
  }
  res.status(204).json({ status: 'success', data: null });
});
