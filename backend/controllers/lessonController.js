'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Lesson Controller
 *  backend/controllers/lessonController.js
 * ============================================================
 */

const Lesson     = require('../models/Lesson');
const Course     = require('../models/Course');
const AppError   = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

// ── GET /api/v1/courses/:courseId/lessons ────────────────────
exports.getLessons = catchAsync(async (req, res) => {
  const lessons = await Lesson.find({ course: req.params.courseId }).sort('order');
  res.status(200).json({ status: 'success', results: lessons.length, data: { lessons } });
});

// ── GET /api/v1/lessons/:id ──────────────────────────────────
exports.getLesson = catchAsync(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id).populate('course', 'title slug instructor');
  if (!lesson) return next(new AppError('Lesson not found.', 404));
  res.status(200).json({ status: 'success', data: { lesson } });
});

// ── POST /api/v1/courses/:courseId/lessons ───────────────────
exports.createLesson = catchAsync(async (req, res, next) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) return next(new AppError('Course not found.', 404));

  req.body.course = req.params.courseId;
  const lesson = await Lesson.create(req.body);

  // Update course lesson count and duration
  await Course.findByIdAndUpdate(req.params.courseId, {
    $push: { lessons: lesson._id },
    $inc : { totalLessons: 1, totalDuration: lesson.videoDuration || 0 },
  });

  res.status(201).json({ status: 'success', data: { lesson } });
});

// ── PATCH /api/v1/lessons/:id ────────────────────────────────
exports.updateLesson = catchAsync(async (req, res, next) => {
  const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
    new: true, runValidators: true,
  });
  if (!lesson) return next(new AppError('Lesson not found.', 404));
  res.status(200).json({ status: 'success', data: { lesson } });
});

// ── DELETE /api/v1/lessons/:id ───────────────────────────────
exports.deleteLesson = catchAsync(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id);
  if (!lesson) return next(new AppError('Lesson not found.', 404));

  await Course.findByIdAndUpdate(lesson.course, {
    $pull: { lessons: lesson._id },
    $inc : { totalLessons: -1, totalDuration: -(lesson.videoDuration || 0) },
  });

  await lesson.deleteOne();
  res.status(204).json({ status: 'success', data: null });
});
