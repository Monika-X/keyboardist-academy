'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Gallery Controller
 *  backend/controllers/galleryController.js
 * ============================================================
 */

const Gallery = require('../models/Gallery');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/ApiFeatures');

// Get all gallery items
exports.getAllGalleryItems = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Gallery.find(), req.query)
    .filter()
    .search(['title', 'category', 'description'])
    .sort()
    .limitFields()
    .paginate();

  const galleryItems = await features.query;

  res.status(200).json({
    status: 'success',
    results: galleryItems.length,
    data: { galleryItems }
  });
});

// Get single gallery item
exports.getGalleryItem = catchAsync(async (req, res, next) => {
  const galleryItem = await Gallery.findById(req.params.id);
  if (!galleryItem) {
    return next(new AppError('No gallery item found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { galleryItem }
  });
});

// Create gallery item
exports.createGalleryItem = catchAsync(async (req, res, next) => {
  const galleryItem = await Gallery.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { galleryItem }
  });
});

// Update gallery item
exports.updateGalleryItem = catchAsync(async (req, res, next) => {
  const galleryItem = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!galleryItem) {
    return next(new AppError('No gallery item found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { galleryItem }
  });
});

// Delete gallery item
exports.deleteGalleryItem = catchAsync(async (req, res, next) => {
  const galleryItem = await Gallery.findByIdAndDelete(req.params.id);
  if (!galleryItem) {
    return next(new AppError('No gallery item found with that ID.', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
