'use strict';

/**
 * ============================================================
 *  KEYBOARDIST ACADEMY — Setting Controller
 *  backend/controllers/settingController.js
 * ============================================================
 */

const Setting = require('../models/Setting');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

// Get all settings
exports.getAllSettings = catchAsync(async (req, res, next) => {
  const settings = await Setting.find();

  res.status(200).json({
    status: 'success',
    results: settings.length,
    data: { settings }
  });
});

// Get single setting by key
exports.getSettingByKey = catchAsync(async (req, res, next) => {
  const setting = await Setting.findOne({ key: req.params.key });
  if (!setting) {
    return next(new AppError('No setting found with that key.', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { setting }
  });
});

// Create or update setting
exports.upsertSetting = catchAsync(async (req, res, next) => {
  const { key, value, description } = req.body;

  const setting = await Setting.findOneAndUpdate(
    { key },
    { value, description },
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json({
    status: 'success',
    data: { setting }
  });
});

// Delete setting
exports.deleteSetting = catchAsync(async (req, res, next) => {
  const setting = await Setting.findOneAndDelete({ key: req.params.key });
  if (!setting) {
    return next(new AppError('No setting found with that key.', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
