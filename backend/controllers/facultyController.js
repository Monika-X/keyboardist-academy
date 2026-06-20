'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Faculty Controller
 *  backend/controllers/facultyController.js
 * ============================================================
 */

const Faculty = require('../models/Faculty');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/ApiFeatures');
const cloudinaryService = require('../services/cloudinaryService');

// Get all faculty
exports.getAllFaculty = catchAsync(async (req, res, next) => {
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

  const features = new ApiFeatures(Faculty.find(filter), req.query)
    .filter()
    .search(['name', 'role', 'bio'])
    .sort()
    .limitFields()
    .paginate();

  const faculty = await features.query;

  res.status(200).json({
    status: 'success',
    results: faculty.length,
    data: { faculty }
  });
});

// Get single faculty member
exports.getFacultyMember = catchAsync(async (req, res, next) => {
  const faculty = await Faculty.findById(req.params.id);
  if (!faculty) {
    return next(new AppError('No faculty member found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { faculty }
  });
});

// Create faculty member
exports.createFacultyMember = catchAsync(async (req, res, next) => {
  if (req.file) {
    const uploadResult = await cloudinaryService.uploadImage(req.file.buffer);
    req.body.imageUrl = uploadResult.imageUrl;
    req.body.publicId = uploadResult.publicId;
  }

  let faculty;
  try {
    faculty = await Faculty.create(req.body);
  } catch (err) {
    if (req.file && req.body.publicId) {
      await cloudinaryService.deleteImage(req.body.publicId);
    }
    return next(err);
  }

  res.status(201).json({
    status: 'success',
    data: { faculty }
  });
});

// Update faculty member
exports.updateFacultyMember = catchAsync(async (req, res, next) => {
  let faculty = await Faculty.findById(req.params.id);
  if (!faculty) {
    return next(new AppError('No faculty member found with that ID.', 404));
  }

  const oldPublicId = faculty.publicId;

  if (req.file) {
    const uploadResult = await cloudinaryService.uploadImage(req.file.buffer);
    req.body.imageUrl = uploadResult.imageUrl;
    req.body.publicId = uploadResult.publicId;
  }

  try {
    faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
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
    data: { faculty }
  });
});

// Delete faculty member
exports.deleteFacultyMember = catchAsync(async (req, res, next) => {
  const faculty = await Faculty.findById(req.params.id);
  if (!faculty) {
    return next(new AppError('No faculty member found with that ID.', 404));
  }

  const publicIdToDelete = faculty.publicId;
  await faculty.deleteOne();
  if (publicIdToDelete) {
    await cloudinaryService.deleteImage(publicIdToDelete);
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
