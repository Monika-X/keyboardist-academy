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

// Get all portfolios
exports.getAllPortfolios = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Portfolio.find(), req.query)
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
  const portfolio = await Portfolio.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { portfolio }
  });
});

// Update portfolio item
exports.updatePortfolio = catchAsync(async (req, res, next) => {
  const portfolio = await Portfolio.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!portfolio) {
    return next(new AppError('No portfolio found with that ID.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { portfolio }
  });
});

// Delete portfolio item
exports.deletePortfolio = catchAsync(async (req, res, next) => {
  const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
  if (!portfolio) {
    return next(new AppError('No portfolio found with that ID.', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
