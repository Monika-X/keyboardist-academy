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
const cloudinaryService = require('../services/cloudinaryService');

// Get all gallery items
exports.getAllGalleryItems = catchAsync(async (req, res, next) => {
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

  const features = new ApiFeatures(Gallery.find(filter), req.query)
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
  if (req.file) {
    const uploadResult = await cloudinaryService.uploadImage(req.file.buffer);
    req.body.imageUrl = uploadResult.imageUrl;
    req.body.publicId = uploadResult.publicId;
  }

  let galleryItem;
  try {
    galleryItem = await Gallery.create(req.body);
  } catch (err) {
    if (req.file && req.body.publicId) {
      await cloudinaryService.deleteImage(req.body.publicId);
    }
    return next(err);
  }

  res.status(201).json({
    status: 'success',
    data: { galleryItem }
  });
});

// Update gallery item
exports.updateGalleryItem = catchAsync(async (req, res, next) => {
  let galleryItem = await Gallery.findById(req.params.id);
  if (!galleryItem) {
    return next(new AppError('No gallery item found with that ID.', 404));
  }

  const oldPublicId = galleryItem.publicId;

  if (req.file) {
    const uploadResult = await cloudinaryService.uploadImage(req.file.buffer);
    req.body.imageUrl = uploadResult.imageUrl;
    req.body.publicId = uploadResult.publicId;
  }

  try {
    galleryItem = await Gallery.findByIdAndUpdate(req.params.id, req.body, {
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
    data: { galleryItem }
  });
});

// Delete gallery item
exports.deleteGalleryItem = catchAsync(async (req, res, next) => {
  const galleryItem = await Gallery.findById(req.params.id);
  if (!galleryItem) {
    return next(new AppError('No gallery item found with that ID.', 404));
  }

  const publicIdToDelete = galleryItem.publicId;
  await galleryItem.deleteOne();
  if (publicIdToDelete) {
    await cloudinaryService.deleteImage(publicIdToDelete);
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
