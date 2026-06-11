'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Course Controller
 *  backend/controllers/courseController.js
 * ============================================================
 */

const Course     = require('../models/Course');
const AppError   = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/ApiFeatures');

// ── GET /api/v1/courses ──────────────────────────────────────
exports.getAllCourses = catchAsync(async (req, res) => {
  let filter = { isPublished: true };
  
  // If authorization header has a valid token, check if user is admin
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = require('../config/jwt').verifyToken(token);
      const user = await require('../models/User').findById(decoded.id);
      if (user && user.role === 'admin') {
        filter = {};
      }
    } catch (err) {}
  }

  const features = new ApiFeatures(
    Course.find(filter).populate('instructor', 'firstName lastName avatar'),
    req.query
  )
    .filter()
    .search(['title', 'description', 'tags'])
    .sort()
    .limitFields()
    .paginate();

  const [courses, total] = await Promise.all([
    features.query,
    Course.countDocuments(filter),
  ]);

  res.status(200).json({
    status    : 'success',
    results   : courses.length,
    total,
    pagination: features.pagination,
    data      : { courses },
  });
});

// ── GET /api/v1/courses/:slug ────────────────────────────────
exports.getCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findOne({ slug: req.params.slug })
    .populate('instructor', 'firstName lastName avatar bio expertise yearsOfExp')
    .populate('lessons', 'title order isFree videoDuration section');

  if (!course) return next(new AppError('Course not found.', 404));
  res.status(200).json({ status: 'success', data: { course } });
});

// ── POST /api/v1/courses  (Instructor / Admin) ───────────────
exports.createCourse = catchAsync(async (req, res) => {
  req.body.instructor = req.user.id;
  const course = await Course.create(req.body);
  res.status(201).json({ status: 'success', data: { course } });
});

// ── PATCH /api/v1/courses/:id  (Instructor / Admin) ─────────
exports.updateCourse = catchAsync(async (req, res, next) => {
  const query = req.user.role === 'admin'
    ? { _id: req.params.id }
    : { _id: req.params.id, instructor: req.user.id };

  const course = await Course.findOneAndUpdate(
    query,
    req.body,
    { new: true, runValidators: true }
  );
  if (!course) return next(new AppError('Course not found or you are not authorized.', 404));
  res.status(200).json({ status: 'success', data: { course } });
});

// ── DELETE /api/v1/courses/:id  (Admin) ─────────────────────
exports.deleteCourse = catchAsync(async (req, res, next) => {
  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) return next(new AppError('Course not found.', 404));
  res.status(204).json({ status: 'success', data: null });
});

// ── GET /api/v1/courses/featured ────────────────────────────
exports.getFeaturedCourses = catchAsync(async (_req, res) => {
  const courses = await Course.find({ isFeatured: true, isPublished: true })
    .limit(6)
    .populate('instructor', 'firstName lastName avatar')
    .sort('-averageRating');
  res.status(200).json({ status: 'success', results: courses.length, data: { courses } });
});

// ── GET /api/v1/courses/stats  (Admin) ───────────────────────
exports.getCourseStats = catchAsync(async (_req, res) => {
  const stats = await Course.aggregate([
    { $match: { isPublished: true } },
    {
      $group: {
        _id             : '$level',
        totalCourses    : { $sum: 1 },
        totalEnrollments: { $sum: '$enrollmentCount' },
        avgRating       : { $avg: '$averageRating' },
        avgPrice        : { $avg: '$price' },
        minPrice        : { $min: '$price' },
        maxPrice        : { $max: '$price' },
      },
    },
    { $sort: { totalCourses: -1 } },
  ]);
  res.status(200).json({ status: 'success', data: { stats } });
});
