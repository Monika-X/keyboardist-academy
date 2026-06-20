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
const cloudinaryService = require('../services/cloudinaryService');

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
  const { key, description } = req.body;
  let { value } = req.body;
  let publicId = undefined;

  const existingSetting = await Setting.findOne({ key });
  const oldPublicId = existingSetting ? existingSetting.publicId : null;

  if (req.file) {
    const uploadResult = await cloudinaryService.uploadImage(req.file.buffer);
    value = uploadResult.imageUrl;
    publicId = uploadResult.publicId;
  }

  const updateData = { value, description };
  if (publicId !== undefined) {
    updateData.publicId = publicId;
  }

  try {
    const setting = await Setting.findOneAndUpdate(
      { key },
      updateData,
      { new: true, upsert: true, runValidators: true }
    );
    if (req.file && oldPublicId) {
      await cloudinaryService.deleteImage(oldPublicId);
    }
    res.status(200).json({ status: 'success', data: { setting } });
  } catch (err) {
    if (req.file && publicId) {
      await cloudinaryService.deleteImage(publicId);
    }
    return next(err);
  }
});

// Delete setting
exports.deleteSetting = catchAsync(async (req, res, next) => {
  const setting = await Setting.findOne({ key: req.params.key });
  if (!setting) {
    return next(new AppError('No setting found with that key.', 404));
  }

  const publicIdToDelete = setting.publicId;
  await setting.deleteOne();
  if (publicIdToDelete) {
    await cloudinaryService.deleteImage(publicIdToDelete);
  }

  res.status(204).json({
    status: 'success',
    data: null
  });
});
