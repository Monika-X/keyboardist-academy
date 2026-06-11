'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Testimonial Controller
 *  backend/controllers/testimonialController.js
 * ============================================================
 */

const Testimonial = require('../models/Testimonial');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/ApiFeatures');

// Get all testimonials
exports.getAllTestimonials = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Testimonial.find(), req.query)
    .filter()
    .search(['name', 'role', 'text'])
    .sort()
    .limitFields()
    .paginate();

  const testimonials = await features.query;

  res.status(200).json({
    status: 'success',
    results: testimonials.length,
    data: { testimonials }
  });
});

// Get single testimonial
exports.getTestimonial = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    return next(new AppError('No testimonial found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { testimonial }
  });
});

// Create testimonial
exports.createTestimonial = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { testimonial }
  });
});

// Update testimonial
exports.updateTestimonial = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!testimonial) {
    return next(new AppError('No testimonial found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { testimonial }
  });
});

// Delete testimonial
exports.deleteTestimonial = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
  if (!testimonial) {
    return next(new AppError('No testimonial found with that ID.', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
