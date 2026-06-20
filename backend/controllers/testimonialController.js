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
const cloudinaryService = require('../services/cloudinaryService');

// Get all testimonials
exports.getAllTestimonials = catchAsync(async (req, res, next) => {
  let filter = { isPublished: { $ne: false } };

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

  const features = new ApiFeatures(Testimonial.find(filter), req.query)
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
  if (req.file) {
    const uploadResult = await cloudinaryService.uploadImage(req.file.buffer);
    req.body.imageUrl = uploadResult.imageUrl;
    req.body.publicId = uploadResult.publicId;
  }

  let testimonial;
  try {
    testimonial = await Testimonial.create(req.body);
  } catch (err) {
    if (req.file && req.body.publicId) {
      await cloudinaryService.deleteImage(req.body.publicId);
    }
    return next(err);
  }

  res.status(201).json({
    status: 'success',
    data: { testimonial }
  });
});

// Update testimonial
exports.updateTestimonial = catchAsync(async (req, res, next) => {
  let testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    return next(new AppError('No testimonial found with that ID.', 404));
  }

  const oldPublicId = testimonial.publicId;

  if (req.file) {
    const uploadResult = await cloudinaryService.uploadImage(req.file.buffer);
    req.body.imageUrl = uploadResult.imageUrl;
    req.body.publicId = uploadResult.publicId;
  }

  try {
    testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (req.file && oldPublicId) {
      await cloudinaryService.deleteImage(oldPublicId);
    }
  } catch (err) {
    if (req.file && req.body.publicId) {
      await cloudinaryService.deleteImage(req.body.publicId);
    }
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: { testimonial }
  });
});

// Delete testimonial
exports.deleteTestimonial = catchAsync(async (req, res, next) => {
  const testimonial = await Testimonial.findById(req.params.id);
  if (!testimonial) {
    return next(new AppError('No testimonial found with that ID.', 404));
  }

  const publicIdToDelete = testimonial.publicId;
  await testimonial.deleteOne();
  if (publicIdToDelete) {
    await cloudinaryService.deleteImage(publicIdToDelete);
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
