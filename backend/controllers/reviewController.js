'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Review Controller
 *  backend/controllers/reviewController.js
 * ============================================================
 */

const Review     = require('../models/Review');
const Enrollment = require('../models/Enrollment');
const AppError   = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

// ── GET /api/v1/courses/:courseId/reviews ────────────────────
exports.getCourseReviews = catchAsync(async (req, res) => {
  const reviews = await Review.find({ course: req.params.courseId, isPublished: true })
    .populate('student', 'firstName lastName avatar')
    .sort('-createdAt');
  res.status(200).json({ status: 'success', results: reviews.length, data: { reviews } });
});

// ── POST /api/v1/courses/:courseId/reviews ───────────────────
exports.createReview = catchAsync(async (req, res, next) => {
  // Must be enrolled
  const enrolled = await Enrollment.findOne({
    student: req.user.id,
    course : req.params.courseId,
    status : 'active',
  });
  if (!enrolled) return next(new AppError('You must be enrolled to leave a review.', 403));

  const review = await Review.create({
    course             : req.params.courseId,
    student            : req.user.id,
    rating             : req.body.rating,
    title              : req.body.title,
    body               : req.body.body,
    isVerifiedPurchase : enrolled.paymentStatus === 'paid',
  });

  res.status(201).json({ status: 'success', data: { review } });
});

// ── PATCH /api/v1/reviews/:id ────────────────────────────────
exports.updateReview = catchAsync(async (req, res, next) => {
  const review = await Review.findOneAndUpdate(
    { _id: req.params.id, student: req.user.id },
    { rating: req.body.rating, title: req.body.title, body: req.body.body },
    { new: true, runValidators: true }
  );
  if (!review) return next(new AppError('Review not found or you are not the author.', 404));
  res.status(200).json({ status: 'success', data: { review } });
});

// ── DELETE /api/v1/reviews/:id ───────────────────────────────
exports.deleteReview = catchAsync(async (req, res, next) => {
  const review = await Review.findOne({
    _id: req.params.id,
    ...(req.user.role !== 'admin' ? { student: req.user.id } : {}),
  });
  if (!review) return next(new AppError('Review not found.', 404));
  await review.deleteOne();
  res.status(204).json({ status: 'success', data: null });
});
