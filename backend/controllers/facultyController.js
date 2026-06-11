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

// Get all faculty
exports.getAllFaculty = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Faculty.find(), req.query)
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
  const faculty = await Faculty.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { faculty }
  });
});

// Update faculty member
exports.updateFacultyMember = catchAsync(async (req, res, next) => {
  const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!faculty) {
    return next(new AppError('No faculty member found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { faculty }
  });
});

// Delete faculty member
exports.deleteFacultyMember = catchAsync(async (req, res, next) => {
  const faculty = await Faculty.findByIdAndDelete(req.params.id);
  if (!faculty) {
    return next(new AppError('No faculty member found with that ID.', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
