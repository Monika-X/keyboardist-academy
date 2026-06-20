'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Portfolio Controller
 *  backend/controllers/portfolioController.js
 * ============================================================
 */

const Portfolio = require('../models/Portfolio');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const ApiFeatures = require('../utils/ApiFeatures');
const cloudinaryService = require('../services/cloudinaryService');

// Get all portfolios
exports.getAllPortfolios = catchAsync(async (req, res, next) => {
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

  const features = new ApiFeatures(Portfolio.find(filter), req.query)
    .filter()
    .search(['title', 'studentName', 'courseName', 'description'])
    .sort()
    .limitFields()
    .paginate();

  const portfolios = await features.query;

  res.status(200).json({
    status: 'success',
    results: portfolios.length,
    data: { portfolios }
  });
});

// Get single portfolio
exports.getPortfolio = catchAsync(async (req, res, next) => {
  const portfolio = await Portfolio.findById(req.params.id);
  if (!portfolio) {
    return next(new AppError('No portfolio found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { portfolio }
  });
});

// Create portfolio item
exports.createPortfolio = catchAsync(async (req, res, next) => {
  if (req.files) {
    if (req.files.image && req.files.image[0]) {
      const uploadResult = await cloudinaryService.uploadImage(req.files.image[0].buffer);
      req.body.imageUrl = uploadResult.imageUrl;
      req.body.publicId = uploadResult.publicId;
    }
    if (req.files.mediaFile && req.files.mediaFile[0]) {
      const uploadResult = await cloudinaryService.uploadImage(req.files.mediaFile[0].buffer);
      req.body.mediaUrl = uploadResult.imageUrl;
      req.body.mediaPublicId = uploadResult.publicId;
    }
  }

  let portfolio;
  try {
    portfolio = await Portfolio.create(req.body);
  } catch (err) {
    if (req.files) {
      if (req.files.image && req.body.publicId) {
        await cloudinaryService.deleteImage(req.body.publicId);
      }
      if (req.files.mediaFile && req.body.mediaPublicId) {
        await cloudinaryService.deleteImage(req.body.mediaPublicId);
      }
    }
    return next(err);
  }

  res.status(201).json({
    status: 'success',
    data: { portfolio }
  });
});

// Update portfolio item
exports.updatePortfolio = catchAsync(async (req, res, next) => {
  let portfolio = await Portfolio.findById(req.params.id);
  if (!portfolio) {
    return next(new AppError('No portfolio found with that ID.', 404));
  }

  const oldPublicId = portfolio.publicId;
  const oldMediaPublicId = portfolio.mediaPublicId;

  if (req.files) {
    if (req.files.image && req.files.image[0]) {
      const uploadResult = await cloudinaryService.uploadImage(req.files.image[0].buffer);
      req.body.imageUrl = uploadResult.imageUrl;
      req.body.publicId = uploadResult.publicId;
    }
    if (req.files.mediaFile && req.files.mediaFile[0]) {
      const uploadResult = await cloudinaryService.uploadImage(req.files.mediaFile[0].buffer);
      req.body.mediaUrl = uploadResult.imageUrl;
      req.body.mediaPublicId = uploadResult.publicId;
    }
  }

  try {
    portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (req.files) {
      if (req.files.image && oldPublicId) {
        await cloudinaryService.deleteImage(oldPublicId);
      }
      if (req.files.mediaFile && oldMediaPublicId) {
        await cloudinaryService.deleteImage(oldMediaPublicId);
      }
    }
  } catch (err) {
    if (req.files) {
      if (req.files.image && req.body.publicId) {
        await cloudinaryService.deleteImage(req.body.publicId);
      }
      if (req.files.mediaFile && req.body.mediaPublicId) {
        await cloudinaryService.deleteImage(req.body.mediaPublicId);
      }
    }
    return next(err);
  }

  res.status(200).json({
    status: 'success',
    data: { portfolio }
  });
});

// Delete portfolio item
exports.deletePortfolio = catchAsync(async (req, res, next) => {
  const portfolio = await Portfolio.findById(req.params.id);
  if (!portfolio) {
    return next(new AppError('No portfolio found with that ID.', 404));
  }

  const publicIdToDelete = portfolio.publicId;
  const mediaPublicIdToDelete = portfolio.mediaPublicId;
  await portfolio.deleteOne();
  
  if (publicIdToDelete) {
    await cloudinaryService.deleteImage(publicIdToDelete);
  }
  if (mediaPublicIdToDelete) {
    await cloudinaryService.deleteImage(mediaPublicIdToDelete);
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
