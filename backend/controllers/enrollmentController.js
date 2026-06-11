'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Enrollment Controller
 *  backend/controllers/enrollmentController.js
 * ============================================================
 */

const Enrollment = require('../models/Enrollment');
const Course     = require('../models/Course');
const User       = require('../models/User');
const AppError   = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

// ── POST /api/v1/enrollments/:courseId ───────────────────────
exports.enrollInCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);
  if (!course)            return next(new AppError('Course not found.', 404));
  if (!course.isPublished) return next(new AppError('This course is not available.', 400));

  const exists = await Enrollment.findOne({ student: req.user.id, course: req.params.courseId });
  if (exists) return next(new AppError('You are already enrolled in this course.', 400));

  const enrollment = await Enrollment.create({
    student      : req.user.id,
    course       : req.params.courseId,
    amountPaid   : course.isFree ? 0 : (course.discountPrice ?? course.price),
    paymentStatus: course.isFree ? 'paid' : 'pending',
  });

  // Keep course enrollment count in sync
  await Course.findByIdAndUpdate(req.params.courseId, { $inc: { enrollmentCount: 1 } });

  // Add to user's enrolled courses
  await User.findByIdAndUpdate(req.user.id, { $addToSet: { enrolledCourses: req.params.courseId } });

  res.status(201).json({ status: 'success', data: { enrollment } });
});

// ── GET /api/v1/enrollments/my ───────────────────────────────
exports.getMyEnrollments = catchAsync(async (req, res) => {
  const enrollments = await Enrollment.find({ student: req.user.id })
    .populate('course', 'title slug thumbnail level totalLessons totalDuration averageRating')
    .sort('-createdAt');

  res.status(200).json({ status: 'success', results: enrollments.length, data: { enrollments } });
});

// ── GET /api/v1/enrollments/:id ──────────────────────────────
exports.getEnrollment = catchAsync(async (req, res, next) => {
  const enrollment = await Enrollment.findById(req.params.id)
    .populate('course')
    .populate('student', 'firstName lastName email');

  if (!enrollment) return next(new AppError('Enrollment not found.', 404));

  // Only allow the student or admin to view
  if (
    enrollment.student._id.toString() !== req.user.id.toString() &&
    req.user.role !== 'admin'
  ) {
    return next(new AppError('Not authorised to access this enrollment.', 403));
  }

  res.status(200).json({ status: 'success', data: { enrollment } });
});

// ── PATCH /api/v1/enrollments/:id/progress ──────────────────
exports.updateProgress = catchAsync(async (req, res, next) => {
  const { lessonId } = req.body;
  const enrollment = await Enrollment.findOne({ _id: req.params.id, student: req.user.id });
  if (!enrollment) return next(new AppError('Enrollment not found.', 404));

  if (!enrollment.completedLessons.includes(lessonId)) {
    enrollment.completedLessons.push(lessonId);
  }

  const course = await Course.findById(enrollment.course).select('totalLessons');
  enrollment.progressPercent = Math.round(
    (enrollment.completedLessons.length / (course.totalLessons || 1)) * 100
  );
  enrollment.lastAccessedAt = Date.now();
  if (enrollment.progressPercent >= 100) enrollment.completedAt = Date.now();

  await enrollment.save();
  res.status(200).json({ status: 'success', data: { enrollment } });
});
